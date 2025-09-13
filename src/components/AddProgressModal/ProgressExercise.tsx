import clsx from 'clsx';
import { InputHTMLAttributes, useState, useEffect } from 'react';

interface ProgressExerciseProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  className?: string;
  value?: number | string;
}

export default function ProgressExercise({ name, className, type, value, ...props }: ProgressExerciseProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(String(value ?? ''));

  
  useEffect(() => {
    setInputValue(String(value ?? ''));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
  
    if (/^\d*$/.test(val)) {
      setInputValue(val);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  
    if (inputValue === '') {
      setInputValue('');
    }
  };

  return (
    <input
      name={name}
      type={type}
      className={clsx(
        'border border-[#D0CECE] w-[237px] h-[47px] md:h-[52px] md:w-[320px] rounded-[8px] px-4.5 py-4 text-black font-normal transition-colors duration-200 placeholder:text-[#D0CECE]',
        'bg-[#FFFFFF] disabled:opacity-50 text-lg',
        type === 'number' && 'appearance-none [MozAppearance:textfield]',
        className
      )}
      value={isFocused ? inputValue : inputValue || ''}
      placeholder={isFocused ? '' : inputValue || '0'}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      onChange={handleChange}
      {...props}
    />
  );
}
