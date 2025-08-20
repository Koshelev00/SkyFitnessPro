"use client";

import Image from "next/image";

import { useDispatch } from 'react-redux';
import {
  setUser,
  setUserName,
  setIsAuth,
} from '@/Store/features/autchSlice';
// import Link from 'next/link';
import {signIn } from '@/services/auth';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonGreen from "@/components/Button/ButtonGreen";
import ButtonWihte from "../Button/ButtonWhite";


export default function SignIn() {
  const [error, setError] = useState<string | null >(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
    const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
      try {
        const user = await signIn(formData);

        if (user) {
         
          dispatch(setUser(user));
          dispatch(setUserName(user.username));
          dispatch(setIsAuth(true));
          router.push('/fitness/main');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Что-то пошло не так');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [formData, dispatch, router],
  );
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-black/40 bg-opacity-10">
      <div className="bg-white rounded-[30px] p-10 w-[360px] top-1/2">
        <div className="pb-12 flex justify-center gap-2.5">
          <Image
            src="/logo.svg"
            width={220}
            height={35}
            alt="Logo"
            className="h-6 w-auto"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2.5 pb-8.5">
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
              className="border h-[52px] rounded-[10px] px-4.5 py-4  w-full"
              onChange={handleChange}
              name="password"
              value={formData.password}
              
              required
              minLength={6}
            />
           {error && (
            <div className="w-70 h-[30px] text-[#db0030] text-[14px] font-normal flex  leading-4 text-center  px-[35px] ">
                {error}
                
            </div>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <ButtonGreen
            text="Войти" 
            disabled={isLoading}
            type="submit"
            
            />
            <ButtonWihte
              text="Зарегистрироваться"
              
            />
          </div>
        </form>
      </div>
    </div>
  );
}
