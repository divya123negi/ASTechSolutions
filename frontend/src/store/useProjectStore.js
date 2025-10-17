import { create } from "zustand";
import API from "../lib/api"; // axios instance with baseURL

const useProjectStore = create((set) => ({
  projects: [],
  selectedProject: null,
  filteredProjects: [],
  loadingProjects: false,
  error: null,

  // Get all projects
  fetchProjects: async () => {
    set({ loadingProjects: true, error: null });
    try {
      const res = await API.get("/api/projects");
      set({ projects: res.data.projects || [], loadingProjects: false });
    } catch (e) {
      set({
        error: e.response?.data?.message || e.message,
        loadingProjects: false,
      });
    }
  },

  // Filter projects by category
  filterProjectsByCategory: (category) =>
    set((state) => ({
      filteredProjects:
        category === "all"
          ? state.projects
          : state.projects.filter((p) => p.category === category),
    })),

  // Get project by id
fetchProjectById: async (id) => {
  set({ loadingProjects: true });
  try {
    const res = await API.get(`/api/projects/${id}`);
    const project = res.data.project || res.data;
    set({ selectedProject: project, loadingProjects: false });
    return project; // return so component can await
  } catch (err) {
    set({ error: err.response?.data?.message || err.message, loadingProjects: false });
    throw err;
  }
},

  // Create project
  createProject: async (payload) => {
    set({ loadingProjects: true, error: null });
    try {
      // payload.image should be base64 or URL
      const res = await API.post("/api/projects", payload);
      const saved = res.data.savedProject || res.data.project;
      set((s) => ({
        projects: [saved, ...s.projects],
        loadingProjects: false,
      }));
    } catch (e) {
      set({
        error: e.response?.data?.message || e.message,
        loadingProjects: false,
      });
    }
  },

  // Update project
// Update project
updateProject: async (id, payload) => {
  set({ loadingProjects: true, error: null });
  try {
    const res = await API.put(`/api/projects/${id}`, payload);
    const updated = res.data.updatedProject || res.data.project;

    set((s) => ({
      projects: s.projects.map((p) => (p._id === id ? updated : p)),
      selectedProject:
        s.selectedProject && s.selectedProject._id === id
          ? updated
          : s.selectedProject,
      loadingProjects: false,
    }));

    return updated; // ✅ return updated project
  } catch (e) {
    set({
      error: e.response?.data?.message || e.message,
      loadingProjects: false,
    });
    throw e; // ✅ throw error so the component catch block works
  }
},


  // Delete project
  deleteProject: async (id) => {
    set({ loadingProjects: true, error: null });
    try {
      await API.delete(`/api/projects/${id}`);
      set((s) => ({
        projects: s.projects.filter((p) => p._id !== id),
          filteredProjects: s.filteredProjects.filter((p) => p._id !== id),
        selectedProject:
          s.selectedProject && s.selectedProject._id === id
            ? null
            : s.selectedProject,
        loadingProjects: false,
      }));
    } catch (e) {
      set({
        error: e.response?.data?.message || e.message,
        loadingProjects: false,
      });
    }
  },
    setSelectedProject: (project) => set({ selectedProject: project }),
}));

export default useProjectStore;
