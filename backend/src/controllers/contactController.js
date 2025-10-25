import nodemailer from 'nodemailer'
import Contact from "../models/contact.model.js";
import mongoose from 'mongoose';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    return res
      .status(200)
      .json({ contacts, message: "Contacts fetched successfully" });
  } catch (error) {
    console.error("Error occurred in getAllContacts:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch contacts", error: error.message });
  }
};


export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

  let newContact;

  newContact = await Contact.create({ name, email, message });

  res.status(201).json({ contact: newContact, message: "Message received!" });


    //  Configure Nodemailer (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

//  Email to site owner
    const clientMailOptions = {
      from: `"${process.env.SENDER_NAME}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    //  Auto-reply to user
    const userMailOptions = {
      from: `"${process.env.SENDER_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message!",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting us. We have received your message and will get back to you soon.</p>
        <p><em>- ${process.env.SENDER_NAME}</em></p>
      `
    };



 await Promise.all([
      transporter.sendMail(clientMailOptions),
      transporter.sendMail(userMailOptions),
    ])
    .then(() => console.log("Emails sent"))
    .catch((err) => console.error("Email send failed:", err));

    

  } catch (error) {
    console.error("Error in createContact:", error);
    res
      .status(500)
      .json({ message: "Failed to send message", error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    // Find and delete the contact
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res
      .status(200)
      .json({ deletedContact, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error occurred in deleteContact:", error);
    res
      .status(500)
      .json({ message: "Failed to delete the contact", error: error.message });
  }
};