"use client";

type Props = {
  progress: number; 
};

export default function ProgressBar({ progress}: Props) {
  return (
    <div className="w-[283px] md:w-[320px]">
      <div
        className="bg-gray-200 h-[6px] rounded-full overflow-hidden"
        
      >
        <div
          className="bg-[#00C1FF] h-[6px] transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
     
    </div>
  );
}
