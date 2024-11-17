import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Fan, Lightbulb, Power, Cpu, ArrowLeft } from 'lucide-react';
import { TimelineCalendar } from '../components/dashboard/TimelineCalendar';

// Helper functions remain the same
const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'lights':
      return <Lightbulb className="w-12 h-12" />;
    case 'hvac':
      return <Fan className="w-12 h-12" />;
    case 'appliances':
      return <Power className="w-12 h-12" />;
    default:
      return <Cpu className="w-12 h-12" />;
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
          <p className="text-sm">Usage: {usage} kWh</p>
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
          <p className="text-sm">Usage: {component.usage} kWh</p>
          <p className="text-sm">Threshold: {(component.thresholdScore * 100).toFixed(1)}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ElectricityView = ({ onBack }) => {
    const [selectedComponent, setSelectedComponent] = useState(null);
  
    // Sample data definitions
    const sampleCategories = [
      { id: 1, category: 'Lights', usage: 1200, thresholdScore: 0.85 },
      { id: 2, category: 'HVAC', usage: 2500, thresholdScore: 0.65 },
      { id: 3, category: 'Appliances', usage: 800, thresholdScore: 0.45 }
    ];
  
    const sampleComponents = [
      { id: 1, name: 'Light Section A', category: 'Lights', usage: 500, thresholdScore: 0.9 },
      { id: 2, name: 'HVAC Zone 1', category: 'HVAC', usage: 1200, thresholdScore: 0.8 }
    ];
  
    // Sample timeline data
    const timelineData = selectedComponent ? {
      'Sun': {
        0: { electricity: 0 },
        1: { electricity: 0 },
        2: { electricity: 0 },
        3: { electricity: 0 },
        4: { electricity: 0 },
        5: { electricity: 0 },
        6: { electricity: 1 },
        7: { electricity: 1 },
        8: { electricity: 1 },
        9: { electricity: 1 },
        10: { electricity: 1 },
        11: { electricity: 1 },
        12: { electricity: 1 },
        13: { electricity: 1 },
        14: { electricity: 1 },
        15: { electricity: 1 },
        16: { electricity: 1 },
        17: { electricity: 1 },
        18: { electricity: 1 },
        19: { electricity: 0 },
        20: { electricity: 0 },
        21: { electricity: 0 },
        22: { electricity: 0 },
        23: { electricity: 0 }
      },
      'Mon': {
        0: { electricity: 0 },
        1: { electricity: 0 },
        2: { electricity: 0 },
        3: { electricity: 0 },
        4: { electricity: 0 },
        5: { electricity: 1 },
        6: { electricity: 1 },
        7: { electricity: 1 },
        8: { electricity: 1 },
        9: { electricity: 1 },
        10: { electricity: 1 },
        11: { electricity: 1 },
        12: { electricity: 0 },
        13: { electricity: 1 },
        14: { electricity: 1 },
        15: { electricity: 1 },
        16: { electricity: 1 },
        17: { electricity: 1 },
        18: { electricity: 1 },
        19: { electricity: 1 },
        20: { electricity: 0 },
        21: { electricity: 0 },
        22: { electricity: 0 },
        23: { electricity: 0 }
      },
      'Tue': {
        0: { electricity: 0 },
        1: { electricity: 0 },
        2: { electricity: 0 },
        3: { electricity: 0 },
        4: { electricity: 0 },
        5: { electricity: 1 },
        6: { electricity: 1 },
        7: { electricity: 1 },
        8: { electricity: 1 },
        9: { electricity: 1 },
        10: { electricity: 1 },
        11: { electricity: 1 },
        12: { electricity: 1 },
        13: { electricity: 1 },
        14: { electricity: 1 },
        15: { electricity: 1 },
        16: { electricity: 1 },
        17: { electricity: 1 },
        18: { electricity: 0 },
        19: { electricity: 0 },
        20: { electricity: 0 },
        21: { electricity: 0 },
        22: { electricity: 0 },
        23: { electricity: 0 }
      },
      'Wed': {
        0: { electricity: 0 },
        1: { electricity: 0 },
        2: { electricity: 0 },
        3: { electricity: 0 },
        4: { electricity: 0 },
        5: { electricity: 1 },
        6: { electricity: 1 },
        7: { electricity: 1 },
        8: { electricity: 1 },
        9: { electricity: 1 },
        10: { electricity: 1 },
        11: { electricity: 1 },
        12: { electricity: 1 },
        13: { electricity: 1 },
        14: { electricity: 1 },
        15: { electricity: 1 },
        16: { electricity: 1 },
        17: { electricity: 1 },
        18: { electricity: 1 },
        19: { electricity: 0 },
        20: { electricity: 0 },
        21: { electricity: 0 },
        22: { electricity: 0 },
        23: { electricity: 0 }
      },
      'Thu': {
        0: { electricity: 0 },
        1: { electricity: 0 },
        2: { electricity: 0 },
        3: { electricity: 0 },
        4: { electricity: 0 },
        5: { electricity: 1 },
        6: { electricity: 1 },
        7: { electricity: 1 },
        8: { electricity: 1 },
        9: { electricity: 1 },
        10: { electricity: 1 },
        11: { electricity: 1 },
        12: { electricity: 1 },
        13: { electricity: 1 },
        14: { electricity: 1 },
        15: { electricity: 1 },
        16: { electricity: 1 },
        17: { electricity: 1 },
        18: { electricity: 1 },
        19: { electricity: 0 },
        20: { electricity: 0 },
        21: { electricity: 0 },
        22: { electricity: 0 },
        23: { electricity: 0 }
      },
      'Fri': {
        0: { electricity: 0 },
        1: { electricity: 0 },
        2: { electricity: 0 },
        3: { electricity: 0 },
        4: { electricity: 0 },
        5: { electricity: 1 },
        6: { electricity: 1 },
        7: { electricity: 1 },
        8: { electricity: 1 },
        9: { electricity: 1 },
        10: { electricity: 1 },
        11: { electricity: 1 },
        12: { electricity: 0 },
        13: { electricity: 1 },
        14: { electricity: 1 },
        15: { electricity: 1 },
        16: { electricity: 1 },
        17: { electricity: 1 },
        18: { electricity: 0 },
        19: { electricity: 0 },
        20: { electricity: 0 },
        21: { electricity: 0 },
        22: { electricity: 0 },
        23: { electricity: 0 }
      },
      'Sat': {
        0: { electricity: 0 },
        1: { electricity: 0 },
        2: { electricity: 0 },
        3: { electricity: 0 },
        4: { electricity: 0 },
        5: { electricity: 0 },
        6: { electricity: 1 },
        7: { electricity: 1 },
        8: { electricity: 1 },
        9: { electricity: 1 },
        10: { electricity: 1 },
        11: { electricity: 1 },
        12: { electricity: 1 },
        13: { electricity: 0 },
        14: { electricity: 0 },
        15: { electricity: 0 },
        16: { electricity: 0 },
        17: { electricity: 0 },
        18: { electricity: 0 },
        19: { electricity: 0 },
        20: { electricity: 0 },
        21: { electricity: 0 },
        22: { electricity: 0 },
        23: { electricity: 0 }
      }
    } : {};
  
    const handleComponentSelect = (component) => {
      setSelectedComponent(component);
      // Here you would typically fetch the component's timeline data
      // fetchComponentTimeline(component.id);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sampleCategories.map(category => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
  
        {/* Critical Components Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Critical Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  
  export default ElectricityView;