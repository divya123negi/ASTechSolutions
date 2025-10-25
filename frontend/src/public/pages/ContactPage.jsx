import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,

  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import useContactStore from "../../store/useContactStore";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";


export default function ContactPage() {
  const { createContact, error, loadingContacts } = useContactStore();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const success = await createContact(formData);
    if (success) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const contactInfo = [
    { icon: <Phone className="h-6 w-6 text-[#E53935]" />, title: "Phone", details: "+91 8700831220" },
    { icon: <Mail className="h-6 w-6 text-[#E53935]" />, title: "Email", details: "info@astechsolutions.org.in" },
    { icon: <MapPin className="h-6 w-6 text-[#E53935]" />, title: "Address", details: "1ST FLOOR, 11/11, Kamal Vihar, Burari, New Delhi, 110084" },
    { icon: <Clock className="h-6 w-6 text-[#E53935]" />, title: "Working Hours", details: "Mon – Sat: 9:00 AM – 6:00 PM" },
  ];

  const faqs = [
    { question: "Do you provide ongoing support?", answer: "Yes, we offer support packages including maintenance, troubleshooting, and future upgrades." },
    { question: "How soon will I get a response?", answer: "We typically respond within 24 hours to all inquiries." },
    { question: "Can you customize solutions?", answer: "Absolutely! Our services are tailored to meet your specific business needs." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
  <Helmet>
        <title>ASTECH SOLUTIONS | Contact Us - Industrial Automation Experts</title>
        <meta
          name="description"
          content="Get in touch with ASTECH SOLUTIONS for industrial automation, IoT, and smart manufacturing solutions. Contact our team via phone, email, or visit our office to discuss your automation project."
        />
        <meta
          name="keywords"
          content="Contact ASTECH SOLUTIONS, Industrial Automation, IoT, Smart Manufacturing, Automation Solutions, Get in Touch"
        />
      </Helmet>

      <Navbar />


    {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-32 px-6 sm:px-10 lg:px-16 xl:px-20"
        style={{ backgroundImage: "url('/discussion.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl  font-extrabold leading-tight mb-4">
         Let&apos;s Build Your <span className="text-[#E53935]">Future Together</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-6">
            Whether it&apos;s automation, industrial solutions, or digital transformation — 
      our experts are ready to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
        href="#contact"
        className="px-5 py-2.5 rounded-lg bg-[#E53935] text-white hover:shadow-lg hover:shadow-red-400 active:scale-95 transition flex items-center justify-center font-medium text-sm "
      >
        Contact Us
      </a>
      <a
        href="#faq"
        className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-lg font-medium text-sm   hover:bg-gray-200 transition "
      >
        Learn More
      </a>
          </div>
        </div>
      </section>




      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-br from-white to-gray-200 py-16 sm:py-20 lg:py-24 px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">
          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl  font-bold text-black mb-2">Get in Touch</h2>
            <p className="text-sm sm:text-base md:text-lg  text-gray-600 mb-6">
              Fill out the form below and our team will respond quickly.
            </p>

            {isSubmitted ? (
              <div className="text-center py-10">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black">Thank you for contacting us!</h3>
                <p className="text-sm sm:text-base md:text-lg  text-gray-600">We&apos;ve received your message and will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-base sm:text-lg font-medium text-black">Name *</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    placeholder="Enter your name"
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full mt-1  bg-white px-4 py-2 rounded-lg border text-black placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#E53935] focus:ring-[#E53935]"
                    }`}
                  />
                  {errors.name && <p className="text-xs sm:text-sm  text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-base sm:text-lg font-medium text-black">Email *</label>
                  <input
                    id="email"
                    type="text"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full bg-white mt-1 px-4 py-2 rounded-lg border text-black placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#E53935] focus:ring-[#E53935]"
                    }`}
                  />
                  {errors.email && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-base sm:text-lg font-medium text-black">Message *</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    placeholder="Write your message here..."
                    onChange={(e) => handleChange("message", e.target.value)}
                    className={`w-full bg-white mt-1 px-4 py-2 rounded-lg border text-black placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-[#E53935] focus:ring-[#E53935]"
                    }`}
                  />
                  {errors.message && <p className="text-xs sm:text-sm  text-red-600 mt-1">{errors.message}</p>}
                </div>

                {error && <p className="text-xs sm:text-sm  font-medium text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loadingContacts}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#E53935] text-white hover:shadow-lg hover:shadow-red-300 active:scale-95 transition font-medium text-base duration-200 ease-in-out"
                >
                  {loadingContacts ? "Sending..." : "Send Message"}
                  <Send className="h-5 w-5" />
                </button>
              </form>
            )}
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg sm:text-xl md:text-2xl  font-bold text-black mb-4">Company Details</h3>
            <p className="text-sm sm:text-base md:text-lg  text-gray-600 mb-6">
              You can reach us directly via phone, email, or visit our office during working hours.
            </p>
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 p-3  bg-red-50 rounded-xl flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-black">{info.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg  text-gray-600">{info.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-10 lg:px-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition hover:shadow-lg" onClick={() => toggleFAQ(i)}>
                <div className="flex justify-between items-center">
                  <h3 className="text-base sm:text-lg  font-semibold text-black">{faq.question}</h3>
                  {openIndex === i ? <ChevronUp className="h-5 w-5 text-gray-700" /> : <ChevronDown className="h-5 w-5 text-gray-700" />}
                </div>
                {openIndex === i && <p className="mt-3 text-sm sm:text-base md:text-lg  text-gray-600">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
