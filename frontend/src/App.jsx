import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./public/pages/HomePage";

import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import Projects from "./admin/pages/Projects"; // import your Projects page

import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Services from "./admin/pages/Services";
import Contacts from "./admin/pages/Contacts";
import AboutPage from "./public/pages/AboutPage";

import ProjectPage from "../src/public/pages/ProjectPage";
import ServicesPage from "./public/pages/ServicePage";
import ContactPage from "./public/pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  return (
   <>
    <Router>
      <ScrollToTop />
        <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
     
      </Routes>
      

    </Router>
        <Toaster position="top-right" reverseOrder={false} />
    </>

  );
}

export default App;
