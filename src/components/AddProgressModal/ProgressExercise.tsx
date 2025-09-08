import clsx from 'clsx';
import { InputHTMLAttributes, useState } from 'react';

interface ProgressExerciseProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  className?: string;
  value?: number | string;
}

export default function ProgressExercise({ name, className,type, value, ...props }: ProgressExerciseProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      name={name}
      className={clsx(
        'border border-[#D0CECE] h-[52px] w-[320px] rounded-[8px] px-4.5 py-4  text-black font-normal transition-colors duration-200 placeholder:text-[#D0CECE]',
        'bg-[#FFFFFF] disabled:opacity-50 text-lg',
        type === 'number' && 'appearance-none [MozAppearance:textfield]',
        className
      )}
      value={isFocused ? value : value ?? ''}
      placeholder={isFocused ? '' : String(value ?? 0)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}