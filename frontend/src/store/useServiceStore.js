import { create } from "zustand";
import API from "../lib/api";

const useServiceStore = create((set) => ({
  services: [],
  filteredServices: [],
  selectedService: null,
  loadingServices: false,
  error: null,

  // Fetch all services
  fetchServices: async () => {
    set({ loadingServices: true, error: null });
    try {
      const res = await API.get("/api/services");
      const data = res.data.services || [];
      set({ services: data, filteredServices: data, loadingServices: false });
    } catch (e) {
      set({ error: e.response?.data?.message || e.message, loadingServices: false });
    }
  },

  // Fetch single service
  fetchServiceById: async (id) => {
    set({ loadingServices: true, error: null });
    try {
      const res = await API.get(`/api/services/${id}`);
      set({ selectedService: res.data.service, loadingServices: false });
    } catch (e) {
      set({ error: e.response?.data?.message || e.message, loadingServices: false });
    }
  },

  // Create new service
  createService: async (payload) => {
    set({ loadingServices: true, error: null });
    try {
      const res = await API.post("/api/services", payload);
      const saved = res.data.savedService || res.data.service || res.data;
      set((s) => ({
        services: [saved, ...s.services],
        filteredServices: [saved, ...s.filteredServices],
        loadingServices: false,
      }));
    } catch (e) {
      set({ error: e.response?.data?.message || e.message, loadingServices: false });
    }
  },

  // Update service
  updateService: async (id, payload) => {
    set({ loadingServices: true, error: null });
    try {
      const res = await API.put(`/api/services/${id}`, payload);
      const updated = res.data.updatedService || res.data.service || res.data;
      set((s) => ({
        services: s.services.map((srv) => (srv._id === id ? updated : srv)),
        filteredServices: s.filteredServices.map((srv) =>
          srv._id === id ? updated : srv
        ),
        selectedService: updated,
        loadingServices: false,
      }));
    } catch (e) {
      set({ error: e.response?.data?.message || e.message, loadingServices: false });
    }
  },

  // Delete service
  deleteService: async (id) => {
    set({ loadingServices: true, error: null });
    try {
      await API.delete(`/api/services/${id}`);
      set((s) => ({
        services: s.services.filter((srv) => srv._id !== id),
        filteredServices: s.filteredServices.filter((srv) => srv._id !== id),
        loadingServices: false,
      }));
    } catch (e) {
      set({ error: e.response?.data?.message || e.message, loadingServices: false });
    }
  },

  // Filter by category
  filterServicesByCategory: (category) =>
    set((state) => ({
      filteredServices:
        category === "all"
          ? state.services
          : state.services.filter((s) => s.category === category),
    })),
        setSelectedProject: (project) => set({ selectedProject: project }),
}));

export default useServiceStore;
