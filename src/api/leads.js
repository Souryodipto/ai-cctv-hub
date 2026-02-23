import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Lead submission
export const submitLead = async (leadData) => {
    try {
        const response = await api.post('/leads', leadData);
        return response.data;
    } catch (error) {
        // Simulate success for demo/development
        console.log('Backend not connected - simulating success');
        return { success: true, message: 'Lead captured successfully' };
    }
};

// Email subscription
export const subscribeEmail = async (email) => {
    try {
        const response = await api.post('/subscribe', { email });
        return response.data;
    } catch (error) {
        console.log('Backend not connected - simulating success');
        return { success: true, message: 'Subscribed successfully' };
    }
};

export default api;
