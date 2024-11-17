// src/components/dashboard/MaintenanceReminders.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export const MaintenanceReminders = ({ reminders }) => (
  <Card>
    <CardHeader>
      <CardTitle>Reminders</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center space-x-4 p-2 border-b">
            <div
              className={`w-3 h-3 rounded-full ${
                reminder.status === 'critical' ? 'bg-red-500' :
                reminder.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
              }`}
            />
            <span>{reminder.item}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);