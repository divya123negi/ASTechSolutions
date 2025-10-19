// src/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/dbConnection.js';
import projectsRoutes from '../src/routes/projectsRoute.js';
import servicesRoutes from '../src/routes/servicesRoute.js';
import contactRoutes from '../src/routes/contactRoute.js';
import authRoutes from '../src/routes/authRoute.js';

// -------------------------
// Load environment variables
// -------------------------
dotenv.config({ override: true, quiet: true });



// -------------------------
// Create Express app
// -------------------------
const app = express();

// -------------------------
// Middleware
// -------------------------
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));



const allowedOrigins = [
  "https://www.astechsolutions.org.in",
  "https://astechsolutions.org.in",
  "http://localhost:5173", // for local development
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use('/api/projects', projectsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);


const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));


  // Serve index.html for all non-API routes
  app.get(/^\/(?!api).*$/, (req, res) => {

    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    }
  });
} else {
  // Development root route
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// -------------------------
// Start server and connect DB
// -------------------------
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
  });
