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
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-5 py-2 h-[52px] rounded-full text-black font-normal duration-200 bg-[#BCEC30] hover:bg-[#C6FF00]  cursor-pointer active:bg-[#000000] active:text-[#FFFFFF] in-active:bg-[#F7F7F7] in-active:text-[#999999]"
    >
      {text}
    </button>
  );
}


