"use client";

import ButtonGreen from "@/components/Button/ButtonGreen";
import ButtonWhite from "@/components/Button/ButtonWhite";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/Store/store";
import { SignInThunk, SignUpThunk } from "@/Store/features/Autch/thunk";
import {
  setEmail,
  closeModal,
  clearError,
} from "@/Store/features/Autch/autchSlice";

type AuthMode = "signin" | "signup";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function AuthModal() {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isOpen) {
      setAuthMode("signin");
      setFormData({ email: "", password: "", confirmPassword: "" });
      setShowPassword(false);
      setShowConfirmPassword(false);
      setSuccessMessage("");
    }
  }, [isOpen]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const safeValue = escapeHtml(value);

    setFormData((prev) => ({ ...prev, [name]: safeValue }));
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
    dispatch(clearError());
    setFormData({ email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSuccessMessage("");
  }, [dispatch]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        SignInThunk({ email: formData.email, password: formData.password }),
      ).unwrap();
      dispatch(setEmail(formData.email));
      localStorage.setItem("user.email", formData.email);
      handleCloseModal();
    } catch (err: any) {}
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;

    try {
      await dispatch(
        SignUpThunk({ email: formData.email, password: formData.password }),
      ).unwrap();
      setSuccessMessage("Регистрация успешна! Теперь войдите в систему.");
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      setShowPassword(false);
      setShowConfirmPassword(false);
      setAuthMode("signin");
    } catch (err: any) {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-[30px] p-10 w-[360px] relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl cursor-pointer"
        >
          ×
        </button>

        <div className="h-[35px] mb-8 flex justify-center">
          <Image
            src="/logo.svg"
            width={220}
            height={35}
            alt="Logo"
            className="h-6 w-auto"
          />
        </div>

        {authMode === "signin" ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-2.5">
            <input
              name="email"
              type="text"
              placeholder="Логин"
              value={formData.email}
              onChange={handleChange}
              className="border h-[52px] rounded-[10px] px-4 w-full"
              required
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                className="border h-[52px] rounded-[10px] px-4 w-full pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            {error && <div className="text-[#db0030] text-center">{error}</div>}
            {successMessage && (
              <div className="text-[#00a859] text-center">{successMessage}</div>
            )}
            <ButtonGreen text="Войти" type="submit" />
            <ButtonWhite
              text="Зарегистрироваться"
              type="button"
              onClick={() => setAuthMode("signup")}
            />
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="flex flex-col gap-2.5">
            <input
              name="email"
              type="email"
              placeholder="Эл. почта"
              value={formData.email}
              onChange={handleChange}
              className="border h-[52px] rounded-[10px] px-4 w-full"
              required
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                className="border h-[52px] rounded-[10px] px-4 w-full pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border h-[52px] rounded-[10px] px-4 w-full pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            {error && <div className="text-[#db0030] text-center">{error}</div>}
            {successMessage && (
              <div className="text-[#00a859] text-center">{successMessage}</div>
            )}
            <ButtonGreen text="Зарегистрироваться" type="submit" />
            <ButtonWhite
              text="Войти"
              type="button"
              onClick={() => setAuthMode("signin")}
            />
          </form>
        )}
      </div>
    </div>
  );
}
