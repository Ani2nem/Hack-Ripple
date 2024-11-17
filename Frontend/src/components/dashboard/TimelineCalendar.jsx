// src/components/dashboard/TimelineCalendar.jsx
import React from 'react';

export const TimelineCalendar = ({ data }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Hour</th>
            {days.map(day => (
              <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td className="border p-2">{hour}:00</td>
              {days.map(day => (
                <td key={`${day}-${hour}`} className="border p-2 h-8">
                  <div className="w-full h-6">
                    {data[day]?.[hour]?.electricity === 1 && (
                      <div className="w-full h-full bg-green-600" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};