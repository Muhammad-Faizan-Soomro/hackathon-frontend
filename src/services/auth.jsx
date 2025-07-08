// src/services/auth.js
import axios from "axios";

const BASE_URL = "https://lemon-ai.tech/auth"; // adjust if hosted

export const signup = (data) => axios.post(`${BASE_URL}/signup`, data);
export const login = (data) => axios.post(`${BASE_URL}/login`, data);
