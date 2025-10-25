import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cog, Zap, Shield, TrendingUp, Play, CheckCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {Helmet} from "react-helmet";

function HomePage() {
  const features = [
    {
      icon: <Cog className="h-7 w-7 text-[#1976D2]" />,
      title: "Process Automation",
      description:
        "Streamline your manufacturing processes with smart automation solutions",
      color: "bg-[#E3F2FD]",
    },
    {
      icon: <Zap className="h-7 w-7 text-[#E53935]" />,
      title: "PLC Programming",
      description:
        "Custom control systems designed for your specific operational needs",
      color: "bg-red-50",
    },
    {
      icon: <Shield className="h-7 w-7 text-[#43A047]" />,
      title: "System Integration",
      description:
        "Seamlessly integrate new automation with your existing infrastructure",
      color: "bg-green-50",
    },
    {
      icon: <TrendingUp className="h-7 w-7 text-[#1976D2]" />,
      title: "Performance Optimization",
      description:
        "Maximize efficiency and reduce downtime with intelligent monitoring",
      color: "bg-[#E3F2FD]",
    },
  ];
 

  return (
    <div className="min-h-screen flex flex-col">
 <Helmet>
  <title>ASTECH SOLUTIONS | Home - Industrial Automation</title>
  <meta
    name="description"
    content="ASTECH SOLUTIONS delivers cutting-edge industrial automation, PLC programming, system integration, and smart manufacturing solutions to optimize your operations and boost efficiency."
  />
  <meta
    name="keywords"
    content="Industrial Automation, PLC Programming, System Integration, Smart Manufacturing, Process Automation, Performance Optimization"
  />
</Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white  flex justify-center items-center px-5 sm:px-10 lg:px-16 xl:px-20 pt-24 sm:pt-28 lg:pt-36 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 max-w-7xl mx-auto">
          {/* Left Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-black">
              Empowering the World{" "}
              <span className="text-[#E53935]">to Automation</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg  text-gray-600 max-w-2xl mx-auto lg:mx-0">
              We design and implement cutting-edge automation solutions that
              transform traditional manufacturing into smart, efficient, and
              profitable operations.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#E53935] text-white hover:shadow-lg hover:shadow-red-300 active:scale-95 transition flex items-center justify-center font-medium text-base duration-200 ease-in-out">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link to="/projects" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#E53935] bg-white text-[#E53935] hover:bg-[#E53935] hover:text-white active:scale-95 transition flex items-center justify-center font-medium text-base duration-200 ease-in-out">
                  <Play className="mr-2 h-5 w-5" /> View Our Work
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/home.jpeg"
              alt="Industrial Automation"
              className=" w-full  sm:max-w-xl lg:max-w-2xl h-auto object-contain rounded-2xl shadow-lg shadow-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-white to-gray-300 py-16 sm:py-20 lg:py-24 px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            Complete Automation Solutions
          </h2>
          <p className="text-sm sm:text-base md:text-lg  text-gray-600 max-w-2xl mx-auto mb-10 sm:mb-12">
            From concept to implementation, we provide end-to-end automation
            services that drive efficiency and innovation in your operations.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="shadow-md hover:shadow-lg transition-all rounded-xl bg-white transform hover:-translate-y-1 hover:scale-105 duration-200"
              >
                <div className="p-4 sm:p-6 text-center">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg  font-semibold text-black mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 

      {/* CTA Section */}



{/* CTA Section */}
<section className="bg-gray-100 py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
      Ready to Transform Your Operations?
    </h2>
    <p className="text-sm sm:text-base md:text-lg  text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10">
      Let's discuss how our automation solutions can drive efficiency,
      reduce costs, and position your business for future growth.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-3">
      <Link to="/contact" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#E53935] text-white hover:shadow-lg hover:shadow-red-300 active:scale-95 flex items-center justify-center font-medium text-base  duration-150">
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

export default HomePage;
