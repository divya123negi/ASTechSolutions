import { useEffect } from "react";
import { Layers, Mail, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useServiceStore from "../../store/useServiceStore";
import useProjectStore from "../../store/useProjectStore";
import useContactStore from "../../store/useContactStore";
import DashboardHeader from "../../components/DashboardHeader";

export default function Dashboard() {
  const navigate = useNavigate();
  const { services, fetchServices, loadingServices } = useServiceStore();
  const { projects, fetchProjects, loadingProjects } = useProjectStore();
  const { contacts, fetchContacts, loadingContacts } = useContactStore();

  useEffect(() => {
    fetchServices();
    fetchProjects();
    fetchContacts();
  }, [fetchServices, fetchProjects, fetchContacts]);

  const cardClasses =
    "bg-white rounded-lg shadow-md p-6 flex flex-col justify-between min-h-[300px] transition hover:shadow-lg";
  const iconClasses = "w-7 h-7 text-blue-600";
  const buttonBase =
    "mt-4 w-full py-2 md:py-3 px-4 md:px-6 rounded-md font-medium transition text-center";

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Services Card */}
        <div className={cardClasses}>
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Layers className={iconClasses} />
              <span className="font-semibold text-xl md:text-2xl text-gray-800">
                Services
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-base md:text-lg">
              Manage your service offerings and capabilities
            </p>
            <div className="text-4xl md:text-5xl font-bold text-gray-900">
              {loadingServices ? (
                <span className="text-xl md:text-2xl font-normal text-gray-700">
                  Loading...
                </span>
              ) : (
                services.length
              )}
            </div>
            <p className="text-gray-500 text-lg md:text-xl">
              {!loadingServices && `${services.length} services`}
            </p>
          </div>
          <button
            className={`${buttonBase} ${
              services.length > 0
                ? "border border-gray-400 text-gray-800 hover:bg-gray-100"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={() => navigate("/admin/services")}
          >
            {services.length > 0 ? "More" : "+ Add Service"}
          </button>
        </div>

        {/* Contacts Card */}
        <div className={cardClasses}>
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Mail className={iconClasses} />
              <span className="font-semibold text-xl md:text-2xl text-gray-800">
                Contacts
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-base md:text-lg">
              View and manage your client and business contacts
            </p>
            <div className="text-4xl md:text-5xl font-bold text-gray-900">
              {loadingContacts ? (
                <span className="text-xl md:text-2xl font-normal text-gray-700">
                  Loading...
                </span>
              ) : (
                contacts.length
              )}
            </div>
            <p className="text-gray-500 text-lg md:text-xl">
              {!loadingContacts && `${contacts.length} contacts`}
            </p>
          </div>
          <button
            className={`${buttonBase} ${
              contacts.length > 0
                ? "border border-gray-400 text-gray-800 hover:bg-gray-100"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={() => navigate("/admin/contacts")}
          >
            {contacts.length > 0 ? "More" : "+ Add Contact"}
          </button>
        </div>

        {/* Projects Card */}
        <div className={cardClasses}>
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Briefcase className={iconClasses} />
              <span className="font-semibold text-xl md:text-2xl text-gray-800">
                Projects
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-base md:text-lg">
              Organize your ongoing and completed projects
            </p>
            <div className="text-4xl md:text-5xl font-bold text-gray-900">
              {loadingProjects ? (
                <span className="text-xl md:text-2xl font-normal text-gray-700">
                  Loading...
                </span>
              ) : (
                projects.length
              )}
            </div>
            <p className="text-gray-500 text-lg md:text-xl">
              {!loadingProjects && `${projects.length} projects`}
            </p>
          </div>
          <button
            className={`${buttonBase} ${
              projects.length > 0
                ? "border border-gray-400 text-gray-800 hover:bg-gray-100"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={() => navigate("/admin/projects")}
          >
            {projects.length > 0 ? "More" : "+ Add Project"}
          </button>
        </div>
      </main>
    </div>
  );
}
