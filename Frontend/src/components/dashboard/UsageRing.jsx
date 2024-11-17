import React from 'react';

export const UsageRing = ({ type, usage, threshold }) => {
  // Constants for cost calculation
  const COST_PER_UNIT = type.toLowerCase() === 'electricity' ? 0.12 : 0.004;
  
  // Calculate the circumference of the circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate percentage relative to threshold
  const percentage = (usage / threshold) * 100;
  
  // Scale the fill to ensure gap at high percentages
  // At 100% usage, the ring will be 95% filled (adjust scaleFactor to change this)
  const scaleFactor = 0.97;
  //const fillAmount = Math.min(percentage, 100) / 100 * circumference * scaleFactor;
  const fillAmount = Math.min(percentage, 100) / 100 * circumference;

  const dashArray = `${fillAmount} ${circumference}`;
  
  // Get color based on how close we are to threshold
  const getColor = () => {
    if (percentage >= 100) {
      return '#FA114F';  // Red when at or over threshold (losing money)
    }
    if (percentage >= 80) {
      return '#FCD34D';  // Yellow when getting close to threshold (warning)
    }
    return '#10B981';    // Green when well under threshold (saving money)
  };

  // Calculate the actual savings amount
  const usageDifference = threshold - usage;
  const costDifference = usageDifference * COST_PER_UNIT;
  const savingsDisplay = Math.abs(costDifference).toFixed(2);
  
  // Determine if we're saving or losing money
  const isSaving = usage < threshold;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="#E5E7EB" 
            strokeWidth="15" 
            className="opacity-25"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getColor()}
            strokeWidth="10"
            strokeDasharray={dashArray}
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className={`text-2xl font-bold ${isSaving ? 'text-green-600' : 'text-red-600'}`}>
          {costDifference === 0 ? 
  'At threshold' : 
  `${isSaving ? '+' : '-'}$${savingsDisplay}`
}

          </span>
          <span className="text-sm text-gray-500">{type}</span>
          <span className="text-xs text-gray-400 mt-1">
            {percentage > 100 ? 
              `${(percentage - 100,0).toFixed(1)}% over` : 
              `${(100 - percentage,0).toFixed(1)}% under`
            }
          </span>
          <span className="text-xs text-gray-400">
            {usage.toFixed(1)} / {threshold.toFixed(1)} units
          </span>
        </div>
      </div>
    </div>
  );
};

export default UsageRing;