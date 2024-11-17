// src/components/ui/Card.jsx
import React from 'react';

export const Card = ({ className = '', children, onClick }) => (
  <div 
    className={`bg-white rounded-lg shadow-lg ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export const CardHeader = ({ className = '', children }) => (
  <div className={`p-4 border-b ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children }) => (
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ className = '', children }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);
