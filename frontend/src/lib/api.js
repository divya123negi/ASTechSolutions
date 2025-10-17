import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Get/Set token from storage
const getToken = () => {
  const useSession = import.meta.env.VITE_USE_SESSION_STORAGE === "true";
  return useSession
    ? sessionStorage.getItem("token")
    : localStorage.getItem("token");
};

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
