import { useEffect, useState } from "react";
import { Trash2, Edit2, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import useServiceStore from "../../store/useServiceStore";
import DashboardHeader from "../../components/DashboardHeader";
import AddService from "../../components/AddService";

export default function ServicesPage() {
  const { services, fetchServices, loadingServices, deleteService } =
    useServiceStore();

  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices()
      .then(() => toast.success("Services loaded successfully 🚀"))
      .catch(() => toast.error("Failed to load services ❌"));
  }, [fetchServices]);

  const handleDelete = (id) => {
    toast.dismiss();
    toast(
      (t) => (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl text-center max-w-md mx-auto">
          <span className="text-2xl font-bold text-gray-900">
            Are you sure you want to delete this service? 🗑️
          </span>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition"
              onClick={async () => {
                try {
                  await deleteService(id);
                  toast.dismiss(t.id);
                  toast.success("Service deleted successfully ✅");
                } catch {
                  toast.dismiss(t.id);
                  toast.error("Failed to delete service ❌");
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
    toast.success("Service saved successfully 🎉");
    setShowForm(false);
    setSelectedService(null);
    fetchServices();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Dashboard Header */}
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        {/* Header + Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Service List</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            onClick={() => {
              setSelectedService(null);
              setShowForm(true);
            }}
          >
            + Add Service
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loadingServices ? (
            <p className="text-lg font-medium text-gray-700 col-span-full text-center">
              Loading services...
            </p>
          ) : services.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              <p className="text-lg font-medium mb-4">No services found.</p>
              <p className="text-sm">Try adding a new service.</p>
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col w-full"
              >
                <div className="p-6 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                    {service.description || "No description available."}
                  </p>

                  {/* Services List */}
                  {service.services?.length > 0 ? (
                    <div className="flex flex-col gap-2 mb-4">
                      {service.services.slice(0, 5).map((b, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                      {service.services.length > 5 && (
                        <span className="text-gray-500 text-xs italic">
                          + more services
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-red-500 text-xs mb-4">
                      ⚠ No sub-services added
                    </span>
                  )}

                  {/* Action buttons */}
                  <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-gray-200">
                    <button
                      className="border border-gray-400 text-gray-700 hover:bg-gray-100 text-sm font-medium py-1 px-3 rounded-full flex items-center transition"
                      onClick={() => {
                        setSelectedService(service);
                        setShowForm(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded-full flex items-center transition"
                      onClick={() => handleDelete(service._id)}
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
        <AddService
          service={selectedService}
          onClose={() => {
            setShowForm(false);
            setSelectedService(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
