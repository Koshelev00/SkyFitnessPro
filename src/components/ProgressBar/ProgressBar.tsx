"use client";
import { useEffect, useState } from "react";

type Props = {
  progress: number; 
};

export default function ProgressBar({ progress }: Props) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let start = displayProgress;
    const end = progress;
    const increment = end > start ? 1 : -1;

    if (start === end) return;

    const interval = setInterval(() => {
      start += increment;
      setDisplayProgress(start);
      if (start === end) clearInterval(interval);
    }, 5); 

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="w-[283px] md:w-[320px]">
      <div className="bg-gray-200 h-[6px] rounded-full overflow-hidden">
        <div
          className="bg-[#00C1FF] h-[6px] rounded-full"
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>
    </div>
  );
}
