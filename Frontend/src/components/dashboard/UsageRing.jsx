// src/components/dashboard/UsageRing.jsx
import React from 'react';

export const UsageRing = ({ type, usage, threshold, savings }) => {
  const percentage = (usage / threshold) * 100;
  const getColor = () => {
    if (percentage > 90) return '#FA114F'; // CBRE red
    if (percentage > 75) return '#FA114F'; // CBRE red
    return '#10B981'; // Keep the success green
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getColor()}
            strokeWidth="10"
            strokeDasharray={`${percentage * 2.827}, 282.7`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold">
            {savings > 0 ? '+' : '-'}${Math.abs(savings)}
          </span>
          <span className="text-sm text-gray-500">{type}</span>
        </div>
      </div>
    </div>
  );
};