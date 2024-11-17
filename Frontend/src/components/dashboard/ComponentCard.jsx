import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Fan, Lightbulb, Droplet, GlassWater, Tv, Waves} from 'lucide-react';

const getIcon = (name) => {
  switch (name?.toLowerCase()) {
    case 'hvac system':
    case 'hvac':
      return <Fan className="w-16 h-16 mx-auto" />;
    case 'lighting':
    case 'lights':
      return <Lightbulb className="w-16 h-16 mx-auto" />;
    case 'water system':
    case 'water':
    case 'faucet':
      return <Droplet className="w-16 h-16 mx-auto" />;
    case 'fountain':
      return <GlassWater className="w-16 h-16 mx-auto" />;
    case 'flush':
      return <Droplet className="w-16 h-16 mx-auto" />;
    case 'appliances':
      return <Tv className="w-16 h-16 mx-auto" />;
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
          icon: 'text-red-600'
        };
      case 'warning':
        return {
          icon: 'text-yellow-600'
        };
      default:
        return {
          icon: 'text-green-600'
        };
    }
  };

  const statusColors = getStatusColor(component.status);

  // Safely handle the resource ID formatting
  const formatResourceName = (resourceId) => {
    if (!resourceId) return 'Unknown Resource';
    return resourceId
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getUnit = (categoryName) => {
    const waterCategories = ['faucet', 'fountain', 'flush', 'water'];
    return waterCategories.includes(categoryName?.toLowerCase()) ? 'liters' : 'kWh';
  };

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
          {getIcon(component.category_name)}
        </div>
        <h3 className="text-center font-semibold">
          {formatResourceName(component.resource_id)}
        </h3>
        <p className="text-center text-sm text-gray-600">
          {component.usage} {getUnit(component.category_name)}
        </p>
        <p className="text-center text-sm mt-1">
          {component.building_name}
        </p>
      </CardContent>
    </Card>
  );
};