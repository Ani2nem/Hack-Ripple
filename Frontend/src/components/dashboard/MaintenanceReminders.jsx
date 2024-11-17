// src/components/dashboard/MaintenanceReminders.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export const MaintenanceReminders = ({ reminders }) => {
  console.log('Reminders received:', reminders); // Debug log

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {reminders.map((reminder) => {
            console.log('Individual reminder:', reminder); // Debug log
            return (
              <div key={reminder.id} className="flex items-center space-x-4 p-2 border-b">
                <div
                  className={`w-3 h-3 rounded-full ${
                    reminder.priority?.toLowerCase() === 'high' ? 'bg-red-500' :
                    reminder.priority?.toLowerCase() === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                />
                <span>{reminder.title || reminder.item}</span>
              
                <span className="text-sm text-gray-600">
                  Due: {reminder.dueDate || 'N/A'}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};