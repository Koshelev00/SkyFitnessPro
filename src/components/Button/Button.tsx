"use client";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

export default function Button({ text }: ButtonProps) {
  return (
    <button
      type="button"
      className="bg-[#BCEC30] justify-center gap-2 py-4 px-6.5 rounded-[46px] cursor-pointer text-[18px] font-normal leading-5  hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF] w-full"
    >
      {text}
    </button>
  );
}
