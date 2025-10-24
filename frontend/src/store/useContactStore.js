import { create } from "zustand";
import API from "../lib/api"; // axios instance

const useContactStore = create((set) => ({
  contacts: [],
  selectedContact: null,
  loadingContacts: false,
  error: null,

  // Get all contacts
  fetchContacts: async () => {
    set({ loadingContacts: true, error: null });
    try {
      const res = await API.get("/api/contact");
      set({ contacts: res.data.contacts || [], loadingContacts: false });
      return true;
    } catch (e) {
      set({
        error: e.response?.data?.message || e.message,
        loadingContacts: false,
      });
      return false;
    }
  },

  // Create contact (user submits form)
  createContact: async (payload) => {
    set({ loadingContacts: true, error: null });
    try {
      const res = await API.post("/api/contact", payload);
      const saved = res.data.contact || res.data;
      set((s) => ({
        contacts: [saved, ...s.contacts],
        loadingContacts: false,
      }));
      return true;
    } catch (e) {
      let errorMessage =
        e.response?.data?.message || e.message || "Something went wrong";

      // ✅ Handle rate limit specifically
      if (e.response?.status === 429) {
        errorMessage =
          e.response?.data?.message ||
          "You have reached your daily message limit. Please try again tomorrow.";
      }

      set({
        error: errorMessage,
        loadingContacts: false,
      });
      return false;
    }
  },

  // Delete contact
  deleteContact: async (id) => {
    set({ loadingContacts: true, error: null });
    try {
      await API.delete(`/api/contact/${id}`);
      set((s) => ({
        contacts: s.contacts.filter((c) => c._id !== id),
        selectedContact:
          s.selectedContact && s.selectedContact._id === id
            ? null
            : s.selectedContact,
        loadingContacts: false,
      }));
      return true;
    } catch (e) {
      set({
        error: e.response?.data?.message || e.message,
        loadingContacts: false,
      });
      return false;
    }
  },
}));

export default useContactStore;
