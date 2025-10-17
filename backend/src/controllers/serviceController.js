import Service from "../models/service.model.js";
import mongoose from "mongoose";

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    if (services.length === 0) {
      return res.status(404).json({ message: "Services not found" });
    }
    return res
      .status(200)
      .json({ services, message: "Services fetched successfully" });
  } catch (error) {
    console.error("error occured in the getAllServices", error);
    res
      .status(500)
      .json({ message: "Failed to fetch the services", error: error.message });
  }
};
export const getServicesById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Services not found" });
    }
    return res
      .status(200)
      .json({ service, message: "Service fetched successfully" });
  } catch (error) {
    console.error("error occurred in the getServiceById", error);
    res
      .status(500)
      .json({ message: "Failed to fetch the Service", error: error.message });
  }
};
export const createService = async (req, res) => {
  try {
    const { title, description,  services } = req.body;
    const newService = new Service({
      title,
      description,

      services,
    });
    const savedService = await newService.save();
    return res
      .status(201)
      .json({ savedService, message: "Service saved successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (e) => e.message
      );
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    console.error("error occurred in the createService", error);
    res
      .status(500)
      .json({ message: "Failed to save the service", error: error.message });
  }
};
export const deleteService = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res
      .status(200)
      .json({ deletedService, message: "Service deleted successfully" });
  } catch (error) {
    console.error("error occurred in the deleteService", error);
    res
      .status(500)
      .json({ message: "Failed to delete the service", error: error.message });
  }
};
export const updateService = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const { title, description,  services } = req.body;

    const updatedData = {
      title,
      description,

      services,
    };

    const updatedService = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res
      .status(200)
      .json({ updatedService, message: "Service updated successfully" });
  } catch (error) {
    console.error("Error in updateService:", error);
    res.status(500).json({
      message: "Failed to update the service",
      error: error.message,
    });
  }
};
