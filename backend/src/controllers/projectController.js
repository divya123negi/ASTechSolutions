import Project from "../models/project.model.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js"; // ✅ Import Cloudinary

// ✅ Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    return res
      .status(200)
      .json({ projects, message: "Projects fetched successfully" });
  } catch (error) {
    console.error("error occurred in getAllProjects:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};

// ✅ Create new project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      clientName,
      year,
      technologiesUsed,
      image, // <-- frontend should send base64 or URL here
    } = req.body;

    let imageUrl = "";

    // ✅ Upload image to Cloudinary if provided
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newProject = new Project({
      title,
      description,
      category,
      location,
      clientName,
      year,
      technologiesUsed,
      imageUrl,
    });

    const savedProject = await newProject.save();

    return res
      .status(201)
      .json({ savedProject, message: "Project saved successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    console.error("error occurred in createProject:", error);
    res
      .status(500)
      .json({ message: "Failed to save project", error: error.message });
  }
};

// ✅ Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res
      .status(200)
      .json({ project, message: "Project fetched successfully" });
  } catch (error) {
    console.error("error occurred in getProjectById:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch project", error: error.message });
  }
};

// ✅ Update project
export const updateProject = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const {
      title,
      description,
      category,
      location,
      clientName,
      year,
      technologiesUsed,
      image, // optional new image
    } = req.body;

    let updatedData = {
      title,
      description,
      category,
      location,
      clientName,
      year,
      technologiesUsed,
    };

    // ✅ If new image is sent, upload to Cloudinary
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      updatedData.imageUrl = uploadResponse.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res
      .status(200)
      .json({ updatedProject, message: "Project updated successfully" });
  } catch (error) {
    console.error("error occurred in updateProject:", error);
    res
      .status(500)
      .json({ message: "Failed to update project", error: error.message });
  }
};

// ✅ Delete project
export const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res
      .status(200)
      .json({ deletedProject, message: "Project deleted successfully" });
  } catch (error) {
    console.error("error occurred in deleteProject:", error);
    res
      .status(500)
      .json({ message: "Failed to delete project", error: error.message });
  }
};
