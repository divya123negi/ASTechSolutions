import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useProjectStore from "../store/useProjectStore";

export default function AddProject({ onClose, project, onSuccess }) {
  const { createProject, updateProject } = useProjectStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    clientName: "",
    location: "",
    year: "",
    technologiesUsed: "",
    image: "", // optional base64
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Prefill form if editing
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        category: project.category || "",
        clientName: project.clientName || "",
        location: project.location || "",
        year: project.year || "",
        technologiesUsed: project.technologiesUsed?.join(", ") || "",
        image: project.imageUrl || "",
      });
      setPreview(project.imageUrl || null);
    }
  }, [project]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
  

    if (
      !formData.technologiesUsed ||
      formData.technologiesUsed
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean).length === 0
    ) {
      newErrors.technologiesUsed = "At least one technology is required";
    }

    return newErrors;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setUploading(true);

      const payload = {
        ...formData,
        technologiesUsed: formData.technologiesUsed
          ? formData.technologiesUsed.split(",").map((t) => t.trim())
          : [],
      };

      if (project) {
        // Update existing project
        await updateProject(project._id, payload);
        toast.success("Project updated successfully ✅");
      } else {
        // Create new project
        await createProject(payload);
        toast.success("Project added successfully 🎉");
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        clientName: "",
        location: "",
        year: "",
        technologiesUsed: "",
        image: "",
      });
      setPreview(null);

      if (onSuccess) onSuccess(); // refresh project list
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project ❌");
    } finally {
      setUploading(false);
    }
  };

  const inputClasses =
    "border border-gray-300 w-full p-3 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 p-4 overflow-y-auto bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200 mt-10">
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-2 sticky top-0 bg-white pb-2 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              {project ? "Edit Project" : "Add Project"}
            </h2>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
              ✕
            </button>
          </div>

          {/* Form Fields */}
          {["title", "description", "category", "clientName", "location", "year", "technologiesUsed"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-1">
                {field === "technologiesUsed" ? "Technologies Used" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "description" ? (
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className={inputClasses}
                  rows="3"
                  placeholder="Enter project description"
                />
              ) : (
                <input
                  type={field === "year" ? "number" : "text"}
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className={inputClasses}
                  placeholder={`Enter ${field}`}
                />
              )}
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Project Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                         file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-3 h-32 w-full object-cover rounded-lg border" />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
            >
              {uploading ? (project ? "Updating..." : "Uploading...") : project ? "Update Project" : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
