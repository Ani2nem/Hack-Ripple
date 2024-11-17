// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { UsageRing } from '../components/dashboard/UsageRing';
import { PeriodToggle } from '../components/dashboard/PeriodToggle';
import { MaintenanceReminders } from '../components/dashboard/MaintenanceReminders';
import { ComponentCard } from '../components/dashboard/ComponentCard';
import { TimelineCalendar } from '../components/dashboard/TimelineCalendar';
import ElectricityView from './ElectricityView';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [period, setPeriod] = useState('weekly');
  
  const handleCardClick = (view) => {
    setCurrentView(view);
  };

  const handleComponentClick = (component) => {
    console.log(`Clicked ${component.name}`);
  };

  // Return ElectricityView when electricity view is selected
  if (currentView === 'electricity') {
    return <ElectricityView onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'water') {
    return <div>Water Detail View</div>;
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
              <UsageRing type="Electricity" usage={150} threshold={200} savings={-25} />
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
              <UsageRing type="Water" usage={80} threshold={100} savings={15} />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4">
          <MaintenanceReminders
            reminders={[
              { id: 1, item: 'AC Filter Change', status: 'critical' },
              { id: 2, item: 'Light Bulb Replace', status: 'warning' },
              { id: 3, item: 'Water Filter', status: 'normal' },
            ]}
          />
        </div>
      </div>

      {/* Critical Components */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Critical Components</h2>
        <div className="grid grid-cols-3 gap-6">
          <ComponentCard 
            component={{
              name: 'HVAC System',
              usage: 250,
              status: 'warning'
            }}
            onClick={handleComponentClick}
          />
          <ComponentCard 
            component={{
              name: 'Lighting',
              usage: 180,
              status: 'normal'
            }}
            onClick={handleComponentClick}
          />
          <ComponentCard 
            component={{
              name: 'Water System',
              usage: 320,
              status: 'critical'
            }}
            onClick={handleComponentClick}
          />
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