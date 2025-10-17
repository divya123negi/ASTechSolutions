import { Briefcase, Layers, LogOut, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* Title */}
      <h1
        onClick={() => navigate("/admin")}
        className="text-2xl md:text-3xl font-extrabold text-gray-900 cursor-pointer hover:text-blue-600 transition"
      >
        Dashboard
      </h1>

      {/* Navigation buttons */}
      <nav className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4">
  


        <button
          className="flex items-center px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition text-sm md:text-base"
          onClick={() => navigate("/admin/projects")}
        >
          <Briefcase className="w-5 h-5 mr-2 text-blue-600" /> Projects
        </button>
              <button
          className="flex items-center px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition text-sm md:text-base"
          onClick={() => navigate("/admin/services")}
        >
          <Layers className="w-5 h-5 mr-2 text-blue-600" /> Services
        </button>

        <button
          className="flex items-center px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition text-sm md:text-base"
          onClick={() => navigate("/admin/contacts")}
        >
          <Mail className="w-5 h-5 mr-2 text-blue-600" /> Contacts
        </button>
        {/* Logout */}
        <button
          className="flex items-center px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition text-sm md:text-base shadow-sm"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </button>
        
      </nav>
    </header>
  );
}
