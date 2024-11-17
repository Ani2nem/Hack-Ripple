import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Droplet, ArrowLeft } from 'lucide-react';
import { TimelineCalendar } from '../components/dashboard/TimelineCalendar';

// Helper function to get icon based on category
const getCategoryIcon = (category) => {
  // Using the same icon for all categories but with different rotations for visual distinction
  switch (category.toLowerCase()) {
    case 'faucets':
      return <Droplet className="w-12 h-12" />;
    case 'water fountains':
      return <Droplet className="w-12 h-12 rotate-45" />;
    case 'flushes':
      return <Droplet className="w-12 h-12 rotate-180" />;
    default:
      return <Droplet className="w-12 h-12" />;
  }
};

const getStatusColor = (thresholdScore) => {
  if (thresholdScore >= 0.8) return 'bg-red-100 text-red-600';
  if (thresholdScore >= 0.6) return 'bg-yellow-100 text-yellow-600';
  return 'bg-green-100 text-green-600';
};

// CategoryCard component
const CategoryCard = ({ category, usage, thresholdScore }) => {
  const statusColor = getStatusColor(thresholdScore);
  
  return (
    <Card className={`${statusColor} transition-all duration-200`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {getCategoryIcon(category)}
          <h3 className="text-xl font-semibold">{category}</h3>
          <p className="text-sm">Usage: {usage} Liters</p>
          <p className="text-sm">Threshold Score: {(thresholdScore * 100).toFixed(1)}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

// CriticalComponentCard component
const CriticalComponentCard = ({ component, onClick }) => {
  const statusColor = getStatusColor(component.thresholdScore);
  
  return (
    <Card 
      className={`${statusColor} cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg`}
      onClick={() => onClick(component)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-2">
          {getCategoryIcon(component.category)}
          <h4 className="font-semibold">{component.name}</h4>
          <p className="text-sm">Usage: {component.usage} Liters</p>
          <p className="text-sm">Threshold: {(component.thresholdScore * 100).toFixed(1)}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

const WaterView = ({ onBack }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Sample data for water components
  const sampleCategories = [
    { id: 1, category: 'Faucets', usage: 500, thresholdScore: 0.85 },
    { id: 2, category: 'Water Fountains', usage: 800, thresholdScore: 0.65 },
    { id: 3, category: 'Flushes', usage: 1200, thresholdScore: 0.75 }
  ];

  const sampleComponents = [
    { id: 1, name: 'Faucet 1', category: 'Faucets', usage: 150, thresholdScore: 0.9 },
    { id: 2, name: 'Flush 1', category: 'Flushes', usage: 300, thresholdScore: 0.85 },
    { id: 3, name: 'Water Fountain 1', category: 'Water Fountains', usage: 200, thresholdScore: 0.7 },
    { id: 4, name: 'Faucet 2', category: 'Faucets', usage: 180, thresholdScore: 0.8 }
  ];

  // Sample timeline data for water usage patterns
  // Inside your WaterView component, update the timelineData:
const timelineData = selectedComponent ? {
    'Mon': {
      0: { water: 0 },
      1: { water: 0 },
      2: { water: 0 },
      3: { water: 0 },
      4: { water: 0 },
      5: { water: 0 },
      6: { water: 1 },  // Usage starts - 1 indicates "on"
      7: { water: 1 },
      8: { water: 1 },
      9: { water: 1 },
      10: { water: 1 },
      11: { water: 1 },
      12: { water: 1 },
      13: { water: 1 },
      14: { water: 1 },
      15: { water: 1 },
      16: { water: 1 },
      17: { water: 1 },
      18: { water: 1 },
      19: { water: 0 },
      20: { water: 0 },
      21: { water: 0 },
      22: { water: 0 },
      23: { water: 0 }
    },
    'Tue': {
      0: { water: 0 },
      6: { water: 1 },
      7: { water: 1 },
      8: { water: 1 },
      9: { water: 1 },
      10: { water: 1 },
      11: { water: 1 },
      12: { water: 1 },
      13: { water: 1 },
      14: { water: 1 },
      15: { water: 1 },
      16: { water: 1 },
      17: { water: 1 },
      18: { water: 1 },
      19: { water: 0 }
    },
    'Wed': {
      0: { water: 0 },
      6: { water: 1 },
      7: { water: 1 },
      8: { water: 1 },
      9: { water: 1 },
      10: { water: 1 },
      11: { water: 1 },
      12: { water: 1 },
      13: { water: 1 },
      14: { water: 1 },
      15: { water: 1 },
      16: { water: 1 },
      17: { water: 1 },
      18: { water: 1 },
      19: { water: 0 }
    },
    'Thu': {
      0: { water: 0 },
      6: { water: 1 },
      7: { water: 1 },
      8: { water: 1 },
      9: { water: 1 },
      10: { water: 1 },
      11: { water: 1 },
      12: { water: 1 },
      13: { water: 1 },
      14: { water: 1 },
      15: { water: 1 },
      16: { water: 1 },
      17: { water: 1 },
      18: { water: 1 },
      19: { water: 0 }
    },
    'Fri': {
      0: { water: 0 },
      6: { water: 1 },
      7: { water: 1 },
      8: { water: 1 },
      9: { water: 1 },
      10: { water: 1 },
      11: { water: 1 },
      12: { water: 1 },
      13: { water: 1 },
      14: { water: 1 },
      15: { water: 1 },
      16: { water: 1 },
      17: { water: 1 },
      18: { water: 1 },
      19: { water: 0 }
    },
    'Sat': {
      0: { water: 0 },
      8: { water: 1 },
      9: { water: 1 },
      10: { water: 1 },
      11: { water: 1 },
      12: { water: 1 },
      13: { water: 1 },
      14: { water: 1 },
      15: { water: 0 }
    },
    'Sun': {
      0: { water: 0 },
      12: { water: 1 },
      13: { water: 1 },
      14: { water: 0 }
    }
  } : {};

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>

      {/* Category Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {sampleCategories.map(category => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>

      {/* Critical Components Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Critical Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleComponents.map(component => (
            <CriticalComponentCard
              key={component.id}
              component={component}
              onClick={handleComponentSelect}
            />
          ))}
        </div>
      </section>

      {/* Critical Times Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Critical Times
          {selectedComponent && <span className="text-lg font-normal ml-2">- {selectedComponent.name}</span>}
        </h2>
        {selectedComponent ? (
          <TimelineCalendar data={timelineData} />
        ) : (
          <div className="text-center py-8 text-gray-500">
            Select a component to view its active times
          </div>
        )}
      </section>
    </div>
  );
};

export default WaterView;