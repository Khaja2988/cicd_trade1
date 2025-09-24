import tradingAPI from '../api/client';

export async function login(credentials) {
  const { data } = await tradingAPI.login(credentials);
  return data;
}

export async function register(userData) {
  const { data } = await tradingAPI.register(userData);
  return data;
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem('token') || null;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export default {
  login,
  register,
  getCurrentUser,
  getToken,
  logout
};

import axios from "axios";

const API_URL = "http://ec2-43-205-113-39.ap-south-1.compute.amazonaws.com:8081/auth";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem("token", response.data);
  return response.data;
};

export const signup = async (username, email, password) => {
  return axios.post(`${API_URL}/signup`, { username, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
};
