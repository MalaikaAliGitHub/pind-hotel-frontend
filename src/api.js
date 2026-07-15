import axios from 'axios';

// Central API instance - picks base URL dynamically from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://pind-hotel-backend-l9qb.vercel.app',
});

export default API;