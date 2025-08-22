"use client";
interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";

  disabled?: boolean;
}

export default function ButtonWihte({
  text,
  type = "button",
  disabled: boolean,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-5 py-2 w-full h-[52px] bg-[#FFFFFF] rounded-full border text-black font-normal duration-200  hover:bg-[#F7F7F7] active:bg-[#E9ECED]  cursor-pointer  in-active:text-[#999999] in-active:border-[#999999]"
    >
      {text}
    </button>
  );
}
