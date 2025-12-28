interface CreditScoreGaugeProps {
  score: number;
}

export default function CreditScoreGauge({ score }: CreditScoreGaugeProps) {
  const percentage = ((score - 300) / (850 - 300)) * 100;

  const getColor = () => {
    if (score < 500) return '#ef4444';
    if (score < 650) return '#f59e0b';
    return '#22c55e';
  };

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <svg className="w-full h-auto transform -rotate-90" viewBox="0 0 300 300">
        <circle
          cx="150"
          cy="150"
          r="120"
          stroke="#1f2937"
          strokeWidth="20"
          fill="none"
        />

        <circle
          cx="150"
          cy="150"
          r="120"
          stroke={getColor()}
          strokeWidth="20"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 10px ${getColor()})`
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-6xl md:text-7xl font-bold" style={{ color: getColor() }}>
          {score}
        </div>
        <div className="text-sm text-gray-400 mt-2">out of 850</div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-4 px-4">
        <span>300</span>
        <span className="text-gray-400">Poor</span>
        <span className="text-gray-400">Fair</span>
        <span className="text-gray-400">Good</span>
        <span>850</span>
      </div>
    </div>
  );
}
