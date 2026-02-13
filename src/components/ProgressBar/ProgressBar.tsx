"use client";
import { useEffect, useState, useRef } from "react";

type Props = {
  progress: number;
};

export default function ProgressBar({ progress }: Props) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const progressRef = useRef(displayProgress);

  useEffect(() => {
    let current = progressRef.current;
    const end = progress;
    const increment = end > current ? 1 : -1;

    if (current === end) return;

    const interval = setInterval(() => {
      current += increment;
      progressRef.current = current;
      setDisplayProgress(current);
      if (current === end) clearInterval(interval);
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
