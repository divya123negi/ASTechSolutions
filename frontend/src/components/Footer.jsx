import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 pt-16  pb-8">
      <div className="container mx-auto px-6 grid md:grid-cols-3 md:px-16 gap-12">
        {/* Company Info */}
        <div>
          <div className="mb-4">
            <div className="flex items-center space-x-3">
              {/* Logo with white circular background */}
              <div className="bg-white rounded-full p-2">
                <img
                  src="/logo.png"
                  alt="ASTech Solutions Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="text-white text-2xl font-bold">
                A<span className="text-[#fe353e]">S</span>TECH SOLUTIONS
              </span>
            </div>
            <p className="text-gray-400 text-sm italic mt-2">
              "Empowering the World to Automation"
            </p>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Delivering innovative automation solutions that drive productivity,
            efficiency, and sustainable growth for industries worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/services" className="hover:text-[#fe353e] transition"
                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Services
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-[#fe353e] transition"
                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                 >
                Projects
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#fe353e] transition"
                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#fe353e] transition"
               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-[#E53935]" />
              <span>info@astechsolutions.org.in</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-[#E53935]" />
              <span>+91 8700831220</span>  
            </li>
         
            <li className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-[#E53935]" />
              <span>1ST FLOOR, 11/11, Kamal Vihar, Burari, New Delhi, 110084</span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/astechsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#0A66C2] text-white px-3 py-2 rounded-lg hover:bg-[#004182] transition"
            >
              <FaLinkedin className="h-5 w-5" />
              
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918700831220?text=Hi%20ASTECH%20SOLUTIONS%2C%20I%20am%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#25D366] text-white px-3 py-2 rounded-lg hover:bg-[#128C7E] transition"
            >
              <FaWhatsapp className="h-5 w-5" />
            
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ASTECH SOLUTIONS. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
