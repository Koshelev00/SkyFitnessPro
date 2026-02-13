"use client";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

export default function ButtonGreen({
  text,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-5 py-2 h-[52px] w-full rounded-full text-black text-[16px] font-normal duration-200 bg-[#BCEC30] hover:bg-[#C6FF00]  cursor-pointer active:bg-[#000000] active:text-[#FFFFFF]"
    >
      {text}
    </button>
  );
}
