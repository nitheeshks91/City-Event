import axios from 'axios';

const BASE_URL = 'https://app.ticketmaster.com';
const API_KEY = 'apiKey';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        if (!config.params) {
            config.params = {};
        }
        config.params['apikey'] = API_KEY;
        return config;
    },
    (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response ? error.response.data : error.message)
);

export const get = async (url, params = {}) => {
    return apiClient.get(url, { params });
};

export default apiClient;
