// src/utils/axiosConfig.js
import axios from 'axios';
// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_API_URL_DEV || 'https://localhost:44352/api' , // local
    baseURL: process.env.REACT_APP_BASE_API_URL || 'https://scope-api.azurewebsites.net/api' , //Prod
  timeout: 300000, // Set a timeout limit
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token
axiosInstance.interceptors.request.use(
  config => {
    // Retrieve the token from local storage or any other storage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle specific error cases
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized error, e.g., redirect to login
        console.log('Unauthorized, redirecting to login...');
        // Add your redirect logic here
        localStorage.removeItem('token')
        localStorage.removeItem('userData');
        window.location.href = '/';
      }
      // Handle other status codes
      console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
    } else {
      console.error('Network or server error');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
