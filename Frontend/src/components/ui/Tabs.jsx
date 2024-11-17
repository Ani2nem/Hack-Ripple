// src/components/ui/Tabs.jsx
import React from 'react';

export const Tabs = ({ defaultValue, onValueChange, children }) => {
  return (
    <div className="w-fit">
      {children}
    </div>
  );
};

export const TabsList = ({ children }) => (
  <div className="flex space-x-1 rounded-xl bg-green-900/20 p-1">
    {children}
  </div>
);

export const TabsTrigger = ({ value, children, onClick, active }) => (
  <button
    className={`px-4 py-2 rounded-lg text-sm font-medium leading-5
      ${active ? 'bg-white shadow' : 'text-gray-600 hover:bg-white/[0.12]'}`}
    onClick={() => onClick(value)}
  >
    {children}
  </button>
);