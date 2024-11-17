// src/pages/WaterView.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Droplet, ArrowLeft } from 'lucide-react';
import { TimelineCalendar } from '../components/dashboard/TimelineCalendar';
import BuildingSelector from '../components/common/BuildingSelector';
import { 
  fetchCategorySummary, 
  fetchCriticalResources, 
  fetchResourceUsage,
  formatUsageData,
  getResourceStatus 
} from '../services/api';

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'faucet':
      return <Droplet className="w-12 h-12" />;
    case 'fountain':
      return <Droplet className="w-12 h-12 rotate-45" />;
    case 'flush':
      return <Droplet className="w-12 h-12 rotate-180" />;
    default:
      return <Droplet className="w-12 h-12" />;
  }
};

const CategoryCard = ({ category, usage, thresholdScore }) => {
  const { background, text } = getResourceStatus(thresholdScore);
  
  return (
    <Card className={`${background} transition-all duration-200 border`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className={text}>
            {getCategoryIcon(category)}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
          <p className="text-sm text-gray-600">
            Usage: {usage} Liters
          </p>
          <p className={text}>
            {thresholdScore <= 0 
              ? `${Math.abs(thresholdScore).toFixed(1)}% Below Threshold`
              : `${thresholdScore.toFixed(1)}% Over Threshold`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const CriticalComponentCard = ({ component, onClick }) => {
  const { background, text } = getResourceStatus(component.percent_over);
  
  return (
    <Card 
      className={`${background} cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border`}
      onClick={() => onClick(component)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-2">
          <div className={text}>
            {getCategoryIcon(component.category_name)}
          </div>
          <h4 className="font-semibold text-gray-900">{component.category_name}</h4>
          <p className="text-sm text-gray-600">
            Usage: {component.usage} Liters
          </p>
          <p className={text}>
            {component.percent_over <= 0 
              ? `${Math.abs(component.percent_over).toFixed(1)}% Below Threshold`
              : `${component.percent_over.toFixed(1)}% Over Threshold`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const WaterView = ({ onBack, selectedBuilding }) => {
  const [categories, setCategories] = useState([]);
  const [criticalResources, setCriticalResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [resourceUsage, setResourceUsage] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesData, resourcesData] = await Promise.all([
          fetchCategorySummary('electrical', selectedBuilding), // or 'water' for WaterView
          fetchCriticalResources('electrical', selectedBuilding)  // or 'water' for WaterView
        ]);
  
        setCategories(categoriesData); // Store all categories
        setCriticalResources(resourcesData.filter(resource => 
          resource.building_id === selectedBuilding
        ));
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedResource) {
      const fetchUsageData = async () => {
        try {
          const usageData = await fetchResourceUsage(selectedResource.resource_id);
          setResourceUsage(formatUsageData(usageData, 'water'));
        } catch (err) {
          console.error('Error fetching resource usage:', err);
        }
      };

      fetchUsageData();
    }
  }, [selectedResource]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        <BuildingSelector 
          selectedBuilding={selectedBuilding}
          onBuildingChange={() => {}}
          disabled={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {categories
            .filter(category => category.building_id === selectedBuilding)
            .map(category => (
            <CategoryCard
                key={`${category.building_id}-${category.category_name}`}
                category={category.category_name}
                usage={category.total_usage}
                thresholdScore={category.percent_difference / 100}
            />
            ))}
        </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Critical Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {criticalResources.map(resource => (
            <CriticalComponentCard
              key={resource.resource_id}
              component={resource}
              onClick={setSelectedResource}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">
          Critical Times
          {selectedResource && (
            <span className="text-lg font-normal ml-2">
              - {selectedResource.building_name} {selectedResource.category_name}
            </span>
          )}
        </h2>
        {selectedResource ? (
          <TimelineCalendar data={resourceUsage} />
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