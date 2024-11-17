import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api/apiConfig'; // Import centralized API config
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { UsageRing } from '../components/dashboard/UsageRing';
import { PeriodToggle } from '../components/dashboard/PeriodToggle';
import { MaintenanceReminders } from '../components/dashboard/MaintenanceReminders';
import { ComponentCard } from '../components/dashboard/ComponentCard';
import { TimelineCalendar } from '../components/dashboard/TimelineCalendar';
import ElectricityView from './ElectricityView';
import WaterView from './WaterView';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [period, setPeriod] = useState('weekly');
  const [usageSummary, setUsageSummary] = useState({ electricity: {}, water: {} });
  const [reminders, setReminders] = useState([]);
  const [criticalComponents, setCriticalComponents] = useState([]);

  useEffect(() => {
    // Fetch usage summary for electricity and water
    axios.get(`${API_BASE_URL}/categories/summary?type=electrical`)
      .then((response) => {
        const electricityData = response.data.reduce((acc, item) => {
          acc.usage = (acc.usage || 0) + item.total_usage;
          acc.goal = (acc.goal || 0) + item.total_goal;
          acc.savings = ((acc.goal - acc.usage) / acc.goal) * 100; // Calculate percentage savings
          return acc;
        }, {});
        setUsageSummary((prev) => ({ ...prev, electricity: electricityData }));
      })
      .catch((error) => console.error("Error fetching electricity summary:", error));

    axios.get(`${API_BASE_URL}/categories/summary?type=water`)
      .then((response) => {
        const waterData = response.data.reduce((acc, item) => {
          acc.usage = (acc.usage || 0) + item.total_usage;
          acc.goal = (acc.goal || 0) + item.total_goal;
          acc.savings = ((acc.goal - acc.usage) / acc.goal) * 100; // Calculate percentage savings
          return acc;
        }, {});
        setUsageSummary((prev) => ({ ...prev, water: waterData }));
      })
      .catch((error) => console.error("Error fetching water summary:", error));

    // Fetch maintenance reminders
    axios.get(`${API_BASE_URL}/reminders/sorted/1`) // Replace "1" with dynamic building_id if needed
      .then((response) => {
        setReminders(response.data);
      })
      .catch((error) => console.error("Error fetching reminders:", error));

    // Fetch critical components
    axios.get(`${API_BASE_URL}/resources/electrical/over-limit`)
      .then((response) => {
        setCriticalComponents(response.data.slice(0, 3)); // Limit to top 3 overused resources
      })
      .catch((error) => console.error("Error fetching critical components:", error));
  }, []);

  const handleCardClick = (view) => {
    setCurrentView(view);
  };

  const handleComponentClick = (component) => {
    console.log(`Clicked ${component.name}`);
  };

  if (currentView === 'electricity') {
    return <ElectricityView onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'water') {
    return <WaterView onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <>
      <PeriodToggle value={period} onValueChange={setPeriod} />

      {/* Usage Cards and Reminders */}
      <div className="grid grid-cols-12 gap-6">
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
                usage={usageSummary.electricity.usage || 0} 
                threshold={usageSummary.electricity.goal || 0} 
                savings={usageSummary.electricity.savings || 0} 
              />
            </CardContent>
          </Card>
        </div>
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
                usage={usageSummary.water.usage || 0} 
                threshold={usageSummary.water.goal || 0} 
                savings={usageSummary.water.savings || 0} 
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4">
          <MaintenanceReminders reminders={reminders.map(reminder => ({
            id: reminder.id,
            item: reminder.title,
            status: reminder.status
          }))} />
        </div>
      </div>

      {/* Critical Components */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Critical Components</h2>
        <div className="grid grid-cols-3 gap-6">
          {criticalComponents.map(component => (
            <ComponentCard 
              key={component.resource_id}
              component={{
                name: component.category_name,
                usage: component.usage,
                status: component.percent_over > 0 ? 'critical' : 'normal'
              }}
              onClick={handleComponentClick}
            />
          ))}
        </div>
      </section>

      {/* Critical Times */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Critical Times</h2>
        <TimelineCalendar data={{}} />
      </section>
    </>
  );
};

export default Dashboard;
