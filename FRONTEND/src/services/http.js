import axios from 'axios';

// Prefer env var, otherwise fall back to your EC2 Public DNS
// If your API runs on a non-HTTPS port, include it (e.g., http://ec2-..:3000)
const DEFAULT_BASE_URL = 'http://ec2-43-205-113-39.ap-south-1.compute.amazonaws.com';

const baseURL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  DEFAULT_BASE_URL;

export const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;


