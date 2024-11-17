// src/components/dashboard/ComponentCard.jsx
import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Fan, Lightbulb, Droplets } from 'lucide-react';

const getIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'hvac system':
      return <Fan className="w-16 h-16 mx-auto" />;
    case 'lighting':
      return <Lightbulb className="w-16 h-16 mx-auto" />;
    case 'water system':
      return <Droplets className="w-16 h-16 mx-auto" />;
    default:
      return null;
  }
};

export const ComponentCard = ({ component, onClick }) => {
  // Get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return {
          background: 'bg-red-100',
          icon: 'text-red-600'
        };
      case 'warning':
        return {
          background: 'bg-yellow-100',
          icon: 'text-yellow-600'
        };
      default:
        return {
          background: 'bg-green-100',
          icon: 'text-green-600'
        };
    }
  };

  const statusColors = getStatusColor(component.status);

  return (
    <Card 
      className={`
        ${statusColors.background}
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-xl
        hover:scale-105
      `}
      onClick={() => onClick(component)}
    >
      <CardContent className="p-4">
        <div className={`${statusColors.icon} mb-2`}>
          {getIcon(component.name)}
        </div>
        <h3 className="text-center font-semibold">{component.name}</h3>
        <p className="text-center text-sm text-gray-600">{component.usage} units</p>
      </CardContent>
    </Card>
  );
};