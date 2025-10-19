import { create } from "zustand";
import API from "../lib/api.js";

const storage = (import.meta.env.VITE_USE_SESSION_STORAGE === "true")
  ? sessionStorage
  : localStorage;

const useAuthStore = create((set) => ({
  isAuthenticated: !!storage.getItem("token"),
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post("/api/auth/login", { username, password });
      const token = res.data.token;
      storage.setItem("token", token);
      set({ isAuthenticated: true, loading: false });
      return true;
    } catch (e) {
      set({ error: e.response?.data?.message || e.message, loading: false });
      return false;
    }
  },

  checkMe: async () => {
    try {
      await API.get("/api/auth/validate"); 
      set({ isAuthenticated: true });
      return true;
    } catch {
      storage.removeItem("token");
      set({ isAuthenticated: false });
      return false;
    }
  },

  logout: () => {
    storage.removeItem("token");
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
