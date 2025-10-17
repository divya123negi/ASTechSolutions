import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useServiceStore from "../store/useServiceStore";

export default function AddService({ service = null, onClose, onSuccess }) {
  const { createService, updateService } = useServiceStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    services: [""],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        description: service.description || "",
        services: service.services?.length > 0 ? service.services : [""],
      });
    }
  }, [service]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...formData.services];
    newServices[index] = value;
    setFormData((prev) => ({ ...prev, services: newServices }));
  };

  const addServiceField = () =>
    setFormData((prev) => ({ ...prev, services: [...prev.services, ""] }));

  const removeServiceField = (index) =>
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (
      !formData.services.length ||
      formData.services.some((b) => !b.trim())
    )
      newErrors.services = "Add at least one service";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      if (service) {
        await updateService(service._id, formData);
        toast.success("Service updated successfully ✅");
      } else {
        await createService(formData);
        toast.success("Service added successfully 🎉");
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save service ❌");
    }
  };

  const inputClasses =
    "border border-gray-300 w-full p-3 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 p-4 overflow-y-auto bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200 mt-10">
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-2 sticky top-0 bg-white pb-2 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              {service ? "Edit Service" : "Add Service"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter service title"
              className={inputClasses}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter service description"
              rows={4}
              className={inputClasses}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>


          {/* Services */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Services</label>
            {formData.services.map((b, index) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={b}
                  onChange={(e) => handleServiceChange(index, e.target.value)}
                  placeholder={`Service ${index + 1}`}
                  className={inputClasses}
                />
                {formData.services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeServiceField(index)}
                    className="text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold"
                  >
                    −
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addServiceField}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              + Add
            </button>
            {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services}</p>}
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
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition"
            >
              {service ? "Update Service" : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
