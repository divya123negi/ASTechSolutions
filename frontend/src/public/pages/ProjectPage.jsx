import  { useEffect, useState } from "react";
import {
  Folder,
  User,
  MapPin,
  Calendar,
  ArrowRight,

} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useProjectStore from "../../store/useProjectStore";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton";
import { Helmet } from "react-helmet";


export default function ProjectPage() {
  const { projects, fetchProjects, loadingProjects } = useProjectStore();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects
  useEffect(() => {
    if (categoryFilter === "all") setFilteredProjects(projects);
    else
      setFilteredProjects(
        projects.filter((p) => p.category === categoryFilter)
      );
  }, [categoryFilter, projects]);




  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
  <title>ASTECH SOLUTIONS | Project Portfolio - Industrial Automation</title>
  <meta
    name="description"
    content="Explore ASTECH SOLUTIONS' industrial automation projects showcasing efficiency, cost reduction, and operational excellence across industries."
  />
  <meta
    name="keywords"
    content="Industrial Automation Projects, Automation Portfolio, PLC Projects, Smart Manufacturing Projects"
  />
</Helmet>
      <Navbar />


      {/* Projects Section */}
      <section className="bg-gradient-to-br from-white to-gray-300 mt-7 py-12 sm:py-16 lg:py-24 px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Discover Our <span className="text-[#E53935]">Project Portfolio</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Browse our industrial automation projects showcasing cost reduction, efficiency, and operational excellence.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition ${
                  categoryFilter === cat
                    ? "bg-[#E53935]/90 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingProjects ? (
              <div className="col-span-full text-center text-gray-700 font-medium text-lg">
                <Skeleton />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                <p className="text-base sm:text-lg font-medium mb-4">
                  No projects found for this category.
                </p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105 active:scale-100 duration-200 overflow-hidden flex flex-col cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image & Badge */}
                  <div className="relative">
                    {project.category && (
                      <span className="absolute top-4 left-4 text-xs sm:text-sm font-medium text-white bg-[#E53935]/90 px-3 py-1 rounded-full z-10 shadow">
                        {project.category}
                      </span>
                    )}
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-xl"
                      />
                    ) : (
                      <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-100 flex flex-col items-center justify-center rounded-t-xl">
                        <Folder className="text-gray-400 w-10 h-10 mb-2" />
                        <span className="text-gray-500 text-sm">No Image Available</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-semibold text-black mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Client, Location, Year */}
                    <div className="flex flex-col gap-1.5 mb-4 text-gray-500 text-xs sm:text-sm">
                      {project.clientName && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4 text-[#E53935]" /> {project.clientName}
                        </span>
                      )}
                      {project.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-[#E53935]" /> {project.location}
                        </span>
                      )}
                      {project.year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-[#E53935]" /> {project.year}
                        </span>
                      )}
                    </div>

                    {/* Technologies */}
                    <div className="mt-auto">
                      <span className="text-gray-500 text-xs sm:text-sm font-medium">Technologies Used:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.technologiesUsed?.length > 0 ? (
                          project.technologiesUsed.map((tech, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span className="text-red-500 text-xs">No technologies added</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
          aria-label="Close project modal"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[70vh] sm:max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#E53935] text-white text-2xl font-bold shadow-lg hover:bg-red-600 transition"
            >
              ✕
            </button>
            {selectedProject.imageUrl ? (
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                loading="lazy"
                className="w-full h-auto object-contain rounded-2xl"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex flex-col items-center justify-center rounded-2xl">
                <Folder className="text-gray-400 w-16 h-16 mb-2" />
                <span className="text-gray-500 text-lg">No Image Available</span>
              </div>
            )}
          </div>
        </div>
      )}


      
{/* CTA Section */}
<section className="bg-gray-100 py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
      Bring Your Automation Vision to Life
    </h2>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10">
      Partner with us to transform your processes, enhance efficiency, and achieve measurable results with our proven automation solutions.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-3">
      <Link to="/contact" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#E53935] text-white hover:shadow-lg hover:shadow-red-300 active:scale-95 flex items-center justify-center font-medium text-base sm:text-lg duration-150">
          Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </Link>
      <Link to="/services" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#E53935] bg-white text-[#E53935] hover:bg-[#E53935] hover:text-white active:scale-95 transition flex items-center justify-center font-medium text-base duration-200 ease-in-out">
          Explore Services
        </button>
      </Link>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
}
