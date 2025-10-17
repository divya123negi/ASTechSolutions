import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
        { to: "/projects", label: "Projects" },
    { to: "/services", label: "Services" },

    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 px-5 sm:px-8 md:px-10 lg:px-14 xl:px-22 py-4.5 md:py-5
        transition-shadow duration-300 will-change-transform antialiased
        ${scrolled ? "bg-white shadow-lg border-b border-[#ECECEC]" : "bg-white border-b border-transparent"}`}
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 md:space-x-3"
        >
          <img src="/logo.png" alt="Logo" className="h-6 sm:h-8 md:h-10 lg:h-12" />
          <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold tracking-wide text-[#121212] antialiased">
            A<span className="text-[#fe353e]">S</span>TECH SOLUTIONS
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-4 xl:space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={({ isActive }) =>
                `relative font-medium transition-colors duration-200 
                text-sm md:text-base lg:text-base xl:text-lg antialiased 
                ${isActive ? "text-[#E53935] font-semibold" : "text-[#444444] hover:text-[#E53935]"}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-[#E53935] rounded shadow-[0_0_6px_rgba(229,57,53,0.4)]"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#121212] focus:outline-none antialiased"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 py-3 sm:py-4" : "max-h-0 py-0"
        } bg-[#F7F7F7] shadow-md`}
      >
        <div className="flex flex-col px-4 sm:px-6 space-y-1.5 sm:space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-1.5 font-medium transition-colors duration-200 text-sm sm:text-base md:text-base antialiased ${
                  isActive ? "text-[#E53935] font-semibold" : "text-[#444444] hover:text-[#E53935]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
