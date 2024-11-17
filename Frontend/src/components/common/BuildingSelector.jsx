// src/components/common/BuildingSelector.jsx
import React from 'react';

const buildings = [
  { id: 1, name: 'Building A' },
  { id: 2, name: 'Building B' },
  { id: 3, name: 'Building C' },
  { id: 4, name: 'Building D' }
  // Add more buildings as needed
];

const BuildingSelector = ({ selectedBuilding, onBuildingChange, disabled = false }) => {
    return (
      <div className="flex items-center space-x-2">
        <select
          id="building-select"
          value={selectedBuilding}
          onChange={(e) => onBuildingChange(Number(e.target.value))}
          disabled={disabled}
          className={`mr-5 px-5 py-3 
        text-sm font-medium 
        rounded-lg
        bg-green-900/20
        border-none
        focus:outline-none
        focus:ring-2
        focus:ring-green-500
        cursor-pointer
        ${disabled ? 'bg-gray-100' : ''}`}
        >
          {buildings.map(building => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

export default BuildingSelector;