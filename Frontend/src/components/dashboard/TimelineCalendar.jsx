import React from 'react';

export const TimelineCalendar = ({ data }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper function to determine cell background color
  const getCellColor = (dayData, hour) => {
    if (dayData?.[hour]?.water > 0) return 'bg-blue-500';
    if (dayData?.[hour]?.electricity > 0) return 'bg-green-500';
    return '';
  };

  // Helper function to get cell text
  const getCellText = (dayData, hour) => {
    if (dayData?.[hour]?.water !== undefined) {
      return `${dayData[hour].water}L`;
    }
    if (dayData?.[hour]?.electricity !== undefined) {
      return `${dayData[hour].electricity}kW`;
    }
    return '';
  };

  // Helper function to get text color
  const getTextColor = (dayData, hour) => {
    if (dayData?.[hour]?.water > 0 || dayData?.[hour]?.electricity > 0) {
      return 'text-white';
    }
    return 'text-gray-600';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-50">Hour</th>
            {days.map(day => (
              <th key={day} className="border p-2 bg-gray-50">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td className="border p-2 font-medium bg-gray-50">
                {hour.toString().padStart(2, '0')}:00
              </td>
              {days.map(day => (
                <td 
                  key={`${day}-${hour}`} 
                  className={`border p-2 text-center transition-colors duration-200
                    ${getCellColor(data[day], hour)}
                    ${getTextColor(data[day], hour)}`}
                >
                  {getCellText(data[day], hour)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};