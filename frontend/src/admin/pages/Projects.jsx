import { useEffect, useState } from "react";
import { Trash2, Edit2, User, MapPin, Calendar } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import useProjectStore from "../../store/useProjectStore";
import DashboardHeader from "../../components/DashboardHeader";
import AddProject from "../../components/AddProject";

export default function ProjectsPage() {
  const {
    projects,
    filteredProjects,
    fetchProjects,
    loadingProjects,
    deleteProject,
    filterProjectsByCategory,
  } = useProjectStore();

  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects()
      .then(() => {
        filterProjectsByCategory("all"); // show all projects by default
        toast.success("Projects loaded successfully 🚀");
      })
      .catch(() => toast.error("Failed to load projects ❌"));
  }, [fetchProjects, filterProjectsByCategory]);

  // Dynamic categories
  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    filterProjectsByCategory(category);
  };

  const handleDelete = (id) => {
    toast.dismiss();
    toast(
      (t) => (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl text-center max-w-md mx-auto">
          <span className="text-2xl font-bold text-gray-900">
            Are you sure you want to delete this project? 🗑️
          </span>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition"
              onClick={async () => {
                try {
                  await deleteProject(id);
                  toast.dismiss(t.id);
                  toast.success("Project deleted successfully ✅");
                } catch {
                  toast.dismiss(t.id);
                  toast.error("Failed to delete project ❌");
                }
              }}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl text-lg transition"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { position: "top-center", style: { width: "100%", maxWidth: "500px" } }
    );
  };

  const handleFormSuccess = () => {
    toast.success("Project saved successfully 🎉");
    setShowForm(false);
    setSelectedProject(null);
    fetchProjects().then(() => filterProjectsByCategory(categoryFilter));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        {/* Header + Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Project List</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            onClick={() => {
              setSelectedProject(null);
              setShowForm(true);
            }}
          >
            + Add Project
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                categoryFilter === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          {loadingProjects ? (
            <p className="text-lg font-medium text-gray-700 col-span-full text-center">
              Loading projects...
            </p>
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              <p className="text-lg font-medium mb-4">
                No Projects found for this category.
              </p>
              <p className="text-sm">
                Try changing the category filter or adding a new service.
              </p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition transform hover:-translate-y-1 w-full "
              >
                {/* Fixed image height */}
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-contain"
                  />
                ) : (
                  <div className="w-full h-48 text-gray-700 bg-gray-200 flex items-center justify-center">
                    No image available
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {project.title}
                  </h3>

                  {/* Category as plain text */}
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-medium text-gray-900">Category:</span>{" "}
                    {project.category || "N/A"}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Project details with red icons */}
                  <div className="flex flex-col gap-2 mb-4 text-gray-500 text-sm">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4 text-red-600" />{" "}
                      {project.clientName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-red-600" />{" "}
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-red-600" />{" "}
                      {project.year}
                    </span>
                  </div>

                  {/* Technologies Used */}
                  <div className="mb-4 overflow-hidden max-h-16">
                    <span className="text-gray-500 text-sm font-medium">
                      Technologies Used:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.technologiesUsed.length > 0 ? (
                        project.technologiesUsed.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-red-500 text-xs">
                          ⚠ No technologies added
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-end gap-2 mt-auto">
                    <button
                      className="border border-gray-400 text-gray-700 hover:bg-gray-100 text-sm font-medium py-1 px-3 rounded-full flex items-center transition"
                      onClick={() => {
                        setSelectedProject(project);
                        setShowForm(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded-full flex items-center transition"
                      onClick={() => handleDelete(project._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {showForm && (
        <AddProject
          project={selectedProject}
          onClose={() => {
            setShowForm(false);
            setSelectedProject(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
