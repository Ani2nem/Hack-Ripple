// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { UsageRing } from '../components/dashboard/UsageRing';
import { PeriodToggle } from '../components/dashboard/PeriodToggle';
import { MaintenanceReminders } from '../components/dashboard/MaintenanceReminders';
import { ComponentCard } from '../components/dashboard/ComponentCard';
import { TimelineCalendar } from '../components/dashboard/TimelineCalendar';
import ElectricityView from './ElectricityView';
import WaterView from './WaterView';
import BuildingSelector from '../components/common/BuildingSelector';
import { 
  fetchBuildingSummary, 
  fetchCriticalResources, 
  fetchResourceUsage,
  fetchReminders,
  getResourceStatus,
  formatUsageData
} from '../services/api';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [period, setPeriod] = useState('weekly');
  const [buildingSummary, setBuildingSummary] = useState(null);
  const [criticalResources, setCriticalResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [resourceUsage, setResourceUsage] = useState({});
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(1); // Default to first building
  

  // Fetch initial data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [summaryData, resourcesData, remindersData] = await Promise.all([
          fetchBuildingSummary(selectedBuilding),
          fetchCriticalResources(),
          fetchReminders(selectedBuilding)
        ]);

        setBuildingSummary(summaryData);
        setCriticalResources(resourcesData);
        setReminders(remindersData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedBuilding]); // Re-fetch when building changes

  const handleBuildingChange = (buildingId) => {
    setSelectedBuilding(buildingId);
    setSelectedResource(null); // Reset selected resource when building changes
  };

  // Fetch usage data when a resource is selected
  useEffect(() => {
    if (selectedResource) {
      const fetchUsageData = async () => {
        try {
          const usageData = await fetchResourceUsage(selectedResource.resource_id);
          const formattedData = formatUsageData(
            usageData, 
            selectedResource.category_name.toLowerCase().includes('water') ? 'water' : 'electricity'
          );
          setResourceUsage(formattedData);
        } catch (err) {
          console.error('Error fetching resource usage:', err);
          setError(err.message);
        }
      };
  
      fetchUsageData();
    }
  }, [selectedResource]);

  const handleCardClick = (view) => {
    setCurrentView(view);
  };

  const handleComponentClick = (component) => {
    setSelectedResource(component);
  };

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

  // Return appropriate view based on current state
  if (currentView === 'electricity') {
    return <ElectricityView 
      onBack={() => setCurrentView('dashboard')} 
      selectedBuilding={selectedBuilding}
    />;
  }

  if (currentView === 'water') {
    return <WaterView 
      onBack={() => setCurrentView('dashboard')} 
      selectedBuilding={selectedBuilding}
    />;
  }

  return (
    <>
      {/* Header with Building Selector */}
      <div className="flex justify-between items-center">
        <PeriodToggle value={period} onValueChange={setPeriod} />
        <BuildingSelector 
          selectedBuilding={selectedBuilding}
          onBuildingChange={handleBuildingChange}
        />
      </div>

      {/* Usage Cards and Reminders */}
      <div className="grid grid-cols-12 gap-6">
        {/* Electricity Card */}
        <div className="col-span-4">
          <Card 
            className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-103"
            onClick={() => handleCardClick('electricity')}
          >
            <CardHeader>
              <CardTitle>Electricity</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageRing 
                type="Electricity"
                usage={buildingSummary?.electricity?.usage || 0}
                threshold={buildingSummary?.electricity?.goal || 100}
                savings={buildingSummary?.electricity?.cost_difference || 0}
              />
            </CardContent>
          </Card>
        </div>

        {/* Water Card */}
        <div className="col-span-4">
          <Card 
            className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-103"
            onClick={() => handleCardClick('water')}
          >
            <CardHeader>
              <CardTitle>Water</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageRing 
                type="Water"
                usage={buildingSummary?.water?.usage || 0}
                threshold={buildingSummary?.water?.goal || 100}
                savings={buildingSummary?.water?.cost_difference || 0}
              />
            </CardContent>
          </Card>
        </div>

        {/* Reminders */}
        <div className="col-span-4">
          <MaintenanceReminders
            reminders={reminders.map(reminder => ({
              id: reminder.id,
              item: reminder.title,
              status: reminder.status.toLowerCase(),
              priority: reminder.priority.toLowerCase(),
              dueDate: new Date(reminder.due_date).toLocaleDateString(),// Include priority here
            }))}
          />
        </div>
      </div>

      {/* Critical Components */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Critical Resources</h2>
        <div className="grid grid-cols-3 gap-6">
          {criticalResources
            .filter(resource => resource.building_id === selectedBuilding)
            .map(resource => (
              <ComponentCard 
                key={resource.resource_id}
                component={{
                  id: resource.resource_id,
                  name: `${resource.category_name}`,  // Update this to just use category_name
                  usage: resource.usage,
                  category_name: resource.category_name,  // Add this line
                  building_id: resource.building_id,
                  building_name: resource.building_name,
                  resource_id: resource.resource_id,
                  percent_over: resource.percent_over,
                  status: getResourceStatus(resource.percent_over).status
                }}
                onClick={handleComponentClick}
              />
            ))}
        </div>
      </section>



      {/* Critical Times */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Critical Times
          {selectedResource && (
            <span className="text-lg font-normal ml-2">
              - {selectedResource.category_name} ({selectedResource.building_name})
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
    </>
  );
};

export default Dashboard;
