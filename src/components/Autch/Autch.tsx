"use client";

import ButtonGreen from "@/components/Button/ButtonGreen";
import ButtonWhite from "@/components/Button/ButtonWhite";
import Image from "next/image";
import { useCallback, useState } from "react";
import { signIn, signUp } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { closeModal, setIsAuth } from "@/Store/features/autchSlice";

type AuthMode = "signin" | "signup";

export default function AuthModal() {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.auth);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
    setError("");
    setFormData({ email: "", password: "", confirmPassword: "" });
    setAuthMode("signin");
  }, [dispatch]);

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      try {
        const response = await signIn({
          email: formData.email,
          password: formData.password,
        });

        if (response && response.token) {
          // Сохраняем данные в localStorage
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("user.email", formData.email);

          // Устанавливаем статус авторизации в Redux
          dispatch(setIsAuth(true));
          handleCloseModal();
          router.push("/fitness/main");
        } else {
          setError("Неверные учетные данные");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка входа");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, router, handleCloseModal, dispatch],
  );

  const handleSignUp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (formData.password !== formData.confirmPassword) {
        setError("Пароли не совпадают");
        return;
      }

      setIsLoading(true);
      try {
        const response = await signUp({
          email: formData.email,
          password: formData.password,
        });

        if (response) {
          setAuthMode("signin");
          setError("Регистрация успешна! Теперь войдите в систему.");
          setFormData((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка регистрации");
      } finally {
        setIsLoading(false);
      }
    },
    [formData],
  );

  const switchToSignUp = useCallback(() => {
    setAuthMode("signup");
    setError("");
    setFormData((prev) => ({ ...prev, confirmPassword: "" }));
  }, []);

  const switchToSignIn = useCallback(() => {
    setAuthMode("signin");
    setError("");
    setFormData((prev) => ({ ...prev, confirmPassword: "" }));
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white rounded-[30px] p-10 w-[360px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[35px] mb-8 flex justify-center gap-2.5">
          <Image
            src="/logo.svg"
            width={220}
            height={35}
            alt="Logo"
            className="h-6 w-auto"
          />
        </div>

        {authMode === "signin" ? (
          <form onSubmit={handleSignIn}>
            <div className="flex flex-col gap-2.5 pb-8">
              <input
                placeholder="Логин"
                autoComplete="username"
                type="text"
                name="email"
                value={formData.email}
                required
                className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full"
                onChange={handleChange}
              />
              <input
                placeholder="Пароль"
                autoComplete="current-password"
                type="password"
                className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full"
                onChange={handleChange}
                name="password"
                value={formData.password}
                required
                minLength={6}
              />
              {error && (
                <div className="w-70 h-[30px] text-[#db0030] text-[14px] font-normal flex leading-4 text-center px-[35px]">
                  {error}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2.5">
              <ButtonGreen text="Войти" disabled={isLoading} type="submit" />
              <ButtonWhite
                text="Зарегистрироваться"
                onClick={switchToSignUp}
                type="button"
              />
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-2.5 pb-8">
              <input
                placeholder="Эл. почта"
                className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full"
                type="email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
              <input
                placeholder="Пароль"
                autoComplete="new-password"
                type="password"
                className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <input
                placeholder="Подтвердите пароль"
                type="password"
                className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
              {error && (
                <div className="w-70 h-[30px] text-[#db0030] text-[14px] font-normal flex leading-4 text-center px-[35px]">
                  {error}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2.5">
              <ButtonGreen
                type="submit"
                text="Зарегистрироваться"
                disabled={isLoading}
              />
              <ButtonWhite
                text="Войти"
                onClick={switchToSignIn}
                type="button"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
