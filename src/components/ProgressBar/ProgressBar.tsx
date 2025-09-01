"use client";

type Props = {
  progress: number; // от 0 до 100
  height?: number; // кастомная высота (по умолчанию 12px)
  showLabel?: boolean; // показывать % текстом
};

export default function ProgressBar({ progress, height = 12, showLabel = true }: Props) {
  return (
    <div className="w-full">
      <div
        className="bg-gray-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="bg-green-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {showLabel && (
        <span className="text-sm text-gray-600 block mt-1">
          {progress}% завершено
        </span>
      )}
    </div>
  );
}
