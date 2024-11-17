import axios from 'axios';
import API_BASE_URL from './apiConfig';

// Fetch category summary
export const fetchCategorySummary = (type) => {
    return axios.get(`${API_BASE_URL}/categories/summary?type=${type}`);
};

// Fetch reminders for a building
export const fetchReminders = (buildingId) => {
    return axios.get(`${API_BASE_URL}/reminders/sorted/${buildingId}`);
};

// Fetch overused resources
export const fetchOverusedResources = (type) => {
    return axios.get(`${API_BASE_URL}/resources/${type}/over-limit`);
};
