import axios from "axios";

// REST API instance with credentials
export const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json'
    }
})

api.interceptors.request.use((config) => {
  const authData = localStorage.getItem('authToken');
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      const token = parsed.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to parse authToken');
    }
  }
  return config;
});

// GraphQL instance without credentials for public queries
export const graphqlApi = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    withCredentials: false, // Disable for public queries
    headers: {
        "Content-Type": 'application/json'
    }
})

graphqlApi.interceptors.request.use((config) => {
  const authData = localStorage.getItem('authToken');
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      const token = parsed.token;
      if (token) {
        const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        config.headers.Authorization = bearerToken;
      }
    } catch (error) {
      console.error('Failed to parse authToken');
    }
  }
  return config;
});

export default api;