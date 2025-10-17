import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Target, ArrowRight,Award } from "lucide-react";
import { FaAward, FaHandshake, FaUsers, FaLightbulb, FaShieldAlt, FaUserCircle } from "react-icons/fa";

const team = [
  {
    name: "Amit Sharma",
    role: "Founder & CEO",
    experience: "15+ years in industrial automation and control systems.",
    image: "",
  },
  {
    name: "Neha Verma",
    role: "CTO",
    experience: "Expert in IoT and smart manufacturing solutions.",
    image: "",
  },
  {
    name: "Ravi Kumar",
    role: "Lead Engineer",
    experience: "Specialist in robotics and embedded systems.",
    image: "", 
  },
  {
    name: "Priya Singh",
    role: "Project Manager",
    experience: "10+ years managing large-scale automation projects.",
    image: "",
  },
];

const values = [
  { title: "Excellence", description: "Delivering the highest quality in every solution we provide.", icon: <FaAward className="text-white w-10 h-10" /> },
  { title: "Integrity", description: "Building trust through honesty, transparency, and ethical practices.", icon: <FaHandshake className="text-white w-10 h-10" /> },
  { title: "Collaboration", description: "Achieving collective success through teamwork and partnership.", icon: <FaUsers className="text-white w-10 h-10" /> },
  { title: "Innovation", description: "Embracing technology and creativity to solve complex challenges.", icon: <FaLightbulb className="text-white w-10 h-10" /> },
  { title: "Reliability", description: "Delivering consistent, dependable, and trustworthy solutions.", icon: <FaShieldAlt className="text-white w-10 h-10" /> },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
            <Helmet>
        <title>ASTECH SOLUTIONS | About Us  Industrial Automation Experts</title>
        <meta
          name="description"
          content="Learn about ASTECH SOLUTIONS, a leading provider of industrial automation, IoT, and smart manufacturing solutions. Meet our experienced team and discover our mission, vision, and core values."
        />
        <meta
          name="keywords"
          content="About ASTECH SOLUTIONS, Industrial Automation, IoT, Smart Manufacturing, Team, Mission, Vision, Core Values"
        />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-32 px-6 sm:px-10 lg:px-16 xl:px-20"
        style={{ backgroundImage: "url('/about-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Helping Businesses <span className="text-[#E53935]">Succeed</span> with <span className="text-[#E53935]">Automation</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
            We believe automation should be accessible to every manufacturer.
            Our solutions empower businesses of all sizes to streamline
            operations, reduce costs, and unlock growth with intelligent
            automation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
           <Link to="/contact" >
            <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#E53935] text-white hover:shadow-lg hover:shadow-red-300 active:scale-95 transition flex items-center justify-center font-medium text-base duration-200 ease-in-out">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </button>
           </Link>
           <Link to="/services" > <button className="px-5 py-2.5 rounded-lg border border-white bg-transparent text-white font-medium text-base hover:bg-white hover:text-[#E53935] active:scale-95 transition flex items-center justify-center duration-200 ease-in-out">
              Explore Services
            </button></Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gradient-to-br from-white to-gray-100 py-8 sm:py-10 lg:py-14 xl:py-16 px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-10xl mx-auto text-center mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-5">
            About Us
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/home.jpeg"
              alt="About ASTECH SOLUTIONS"
              className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl h-80 object-cover rounded-2xl shadow-lg border border-gray-200"
            />
          </div>
          <div className="space-y-3 text-left ">
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
              With years of experience in manufacturing, robotics, and process optimization, our mission is to make advanced automation accessible for businesses of all sizes.
            </p>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
              From smart factories to IoT-enabled production lines, we deliver solutions tailored to your unique needs, ensuring efficiency, innovation, and measurable growth.
            </p>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
              Our commitment to quality and innovation drives every project we take on, making us a trusted partner for businesses looking to transform their operations through technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E53935] to-red-500 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <div className="w-14 h-1 bg-gradient-to-r from-[#E53935] to-red-500 rounded-full"></div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
               Our mission is to make advanced automation accessible to mid-size manufacturers by bringing them innovative, reliable, and cost-effective solutions-once reserved for large enterprises-delivered with the dedication and agility of a passionate growing team.
              </p>
            </div>
            {/* Vision */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <div className="w-14 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                To become the premier automation partner for growth-oriented manufacturers, known for innovative solutions, exceptional service, and the ability to transform operations through intelligent automation that drives real business results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white py-10 sm:py-12 lg:py-16 px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            Our Core Values
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-10 sm:mb-12">
            The principles that guide ASTech Solutions and drive us to deliver excellence, innovation, and trust in every project.
          </p>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-3">
          {values.map((value, index) => (
            <div key={index} className="min-w-[200px] bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center my-6 ${index % 2 === 0 ? 'bg-[#E53935]' : 'bg-[#2e3846]'}`}>
                {value.icon}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black mb-1">{value.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-br from-white to-gray-300 py-8 sm:py-10 lg:py-14 xl:py-16 px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-8xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            Meet Our Team
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-10 sm:mb-12">
            A passionate team of experts driving innovation and excellence in industrial automation.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 p-4">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto mb-4 object-cover rounded-full border-2 border-gray-100 shadow-md" />
                ) : (
                  <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200 text-gray-400 text-5xl">
                    <FaUserCircle />
                  </div>
                )}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black mb-1">{member.name}</h3>
                <p className="text-xs sm:text-sm md:text-base text-[#E53935] mb-1">{member.role}</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
