// src/components/dashboard/PeriodToggle.jsx
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs';

export const PeriodToggle = ({ value, onValueChange }) => {
  return (
    <Tabs defaultValue={value}>
      <TabsList>
        <TabsTrigger 
          value="weekly" 
          active={value === 'weekly'}
          onClick={() => onValueChange('weekly')}
        >
          Weekly
        </TabsTrigger>
        <TabsTrigger 
          value="monthly"
          active={value === 'monthly'}
          onClick={() => onValueChange('monthly')}
        >
          Monthly
        </TabsTrigger>
        <TabsTrigger 
          value="yearly"
          active={value === 'yearly'}
          onClick={() => onValueChange('yearly')}
        >
          Yearly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};