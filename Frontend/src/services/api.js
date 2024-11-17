// src/services/api.js
const BASE_URL = 'https://hack-ripple.onrender.com'; // Production backend URL

// Helper function for API calls with error handling
const apiCall = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error);
    throw error;
  }
};

// API functions
export const fetchBuildingSummary = (buildingId) => 
    apiCall(`/buildings/${buildingId}/summary`);
  
  export const fetchCriticalResources = (type, buildingId) => {
    const endpoint = type ? 
      `/resources/${type}/over-limit` : 
      '/resources/over-limit';
    const query = buildingId ? `?building_id=${buildingId}` : '';
    return apiCall(`${endpoint}${query}`);
  };
  
  export const fetchCategorySummary = (type, buildingId) => {
    const query = [
      type ? `type=${type}` : '',
      buildingId ? `building_id=${buildingId}` : ''
    ].filter(Boolean).join('&');
    
    return apiCall(`/categories/summary${query ? `?${query}` : ''}`);
  };
  
  export const fetchResourceUsage = (resourceId) => 
    apiCall(`/usage_sessions/${resourceId}`);
  
  export const fetchReminders = (buildingId) => 
    apiCall(`/reminders/sorted/${buildingId}`);
  
// Helper function to determine resource status based on percentage
export const getResourceStatus = (percentOver) => {
    if (percentOver <= 0) return {
      status: 'normal',
      background: 'bg-green-100',
      text: 'text-green-600'
    };
    
    if (percentOver <= 10) return {
      status: 'warning',
      background: 'bg-white',  // Changed to white background for warning state
      text: 'text-yellow-600'
    };
    
    return {
      status: 'critical',
      background: 'bg-white',  // Changed to white background for critical state
      text: 'text-red-600'
    };
  };
  

// Helper function to format usage data for Timeline
export const formatUsageData = (usageData, resourceType = 'electricity') => {
  const formattedData = {};
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Initialize empty data structure
  daysOfWeek.forEach(day => {
    formattedData[day] = {};
    for (let hour = 0; hour < 24; hour++) {
      formattedData[day][hour] = {
        [resourceType]: 0
      };
    }
  });

  // Fill in the usage data
  usageData.forEach(session => {
    const day = daysOfWeek[session.day_of_week];
    for (let hour = session.start_hour; hour <= session.end_hour; hour++) {
      if (formattedData[day] && formattedData[day][hour]) {
        formattedData[day][hour][resourceType] = 1;
      }
    }
  });

  return formattedData;
};