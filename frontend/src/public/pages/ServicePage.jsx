import React, { useEffect } from "react";
import { CheckCircle, ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useServiceStore from "../../store/useServiceStore";
import Skeleton from "../../components/Skeleton";
import { Helmet } from "react-helmet";


export default function ServicesPage() {
  const { services, fetchServices, loadingServices } = useServiceStore();

  // Fetch services on mount
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div className="min-h-screen flex flex-col bg-white">

       <Helmet>
        <title>ASTECH SOLUTIONS | Services - Industrial Automation & Smart Manufacturing</title>
        <meta
          name="description"
          content="Discover ASTECH SOLUTIONS' comprehensive industrial automation services. From PLC programming to process optimization, we deliver tailored solutions that improve efficiency, reduce costs, and drive growth."
        />
        <meta
          name="keywords"
          content="Industrial Automation, PLC Programming, Smart Manufacturing, Process Optimization, Automation Services, ASTECH SOLUTIONS"
        />
      </Helmet>
      <Navbar />
{/* Hero Section */}
<section
  className="relative flex justify-center items-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-24 sm:pt-28 lg:pt-36 pb-14 sm:pb-20"
  style={{
    backgroundImage: "url('/service.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* Content */}
  <div className="relative text-center max-w-4xl mx-auto text-white">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6 drop-shadow-lg">
      Delivering{" "}
      <span className="text-[#E53935] drop-shadow-lg">Industrial Automation Solutions</span>
    </h1>

    <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow">
      Explore our wide range of services designed to help businesses optimize processes,
      reduce costs, and achieve sustainable growth.
    </p>
  </div>
</section>


{/* Industries We Serve Section */}
<section className="w-full bg-gradient-to-br from-white to-gray-300 py-12 sm:py-16 lg:py-24 px-6 sm:px-10 lg:px-16 xl:px-20">
  <div className="max-w-7xl mx-auto text-center">
    {/* Section Heading */}
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
      Industries We Serve
    </h2>
    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-12">
      Our automation and engineering solutions are trusted across multiple industries, helping businesses 
      improve efficiency, safety, and productivity.
    </p>

    {/* Industries Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {[
        "Automotive",
        "Pharmaceuticals",
        "Food & Beverages",
        "Oil & Gas",
        "Textiles",
        "Nonwovens",
        "Electronics",
        "Power",
        "Logistics",
        "Chemicals",
        "Water Treatment",
        "SPM"
      ].map((industry, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-2xl 
                     shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 
                     p-6 flex items-center justify-center"
        >
          <span className="text-sm sm:text-base font-semibold text-gray-900">
            {industry}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Services Section */}
      <section className="w-full bg-gradient-to-br from-white to-gray-100 py-12 sm:py-16 lg:py-24 px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4">
              Explore Our Services
            </h2>
            <p className="text-sm sm:text-base md:text-lg  text-gray-600">
              Browse our tailored automation services that drive efficiency, improve performance,
              and transform operations across industries.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingServices ? (
              <div className="col-span-full flex justify-center py-10">
                <Skeleton />
              </div>
            ) : services.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10">
                <p className="text-base  font-medium">No services available at the moment.</p>
              </div>
            ) : (
              services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col w-full max-w-lg mx-auto border border-gray-100"
                >
                  {/* Card Header */}
                  <div className="h-32 bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
                    <Layers className="text-white w-14 h-14" />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg  font-semibold text-black mb-3 line-clamp-2">
                      {service.title}
                    </h3>

                    <p className="text-sm  text-gray-600 mb-4 line-clamp-4">
                      {service.description}
                    </p>

                    {service.services?.length > 0 && (
                      <div className="mt-2">
                        <div className="grid grid-cols-1  gap-2">
                          {service.services.slice(0, 4).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-xs text-gray-700"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                          {service.services.length > 4 && (
                            <span className="text-gray-500 text-xs col-span-full italic">
                              + more services
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

 
   {/* CTA Section */}
<section className="bg-gray-100 py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4">
      Transform Your Business with Our Expertise
    </h2>
    <p className="text-sm sm:text-base md:text-lg  text-gray-600 max-w-2xl mx-auto mb-8">
      Partner with us to leverage cutting-edge automation services that deliver real value
      and measurable impact.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-3">
      <Link to="/contact" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#E53935] text-white hover:shadow-lg hover:shadow-red-300 active:scale-95 flex items-center justify-center font-medium text-base  duration-150">
          Let's Connect <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </Link>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
}
