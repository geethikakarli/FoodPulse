import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const createDonation = (donationData) => api.post('/donations', donationData);

// The ML service could be called directly or via Spring Boot.
// Usually, Spring Boot calls the ML service. 
export const getRecommendations = (data) => axios.post('http://localhost:8000/api/recommend', data);

export default api;
