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

// Force NODE_ENV to production if not set (Windows-safe)
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';

console.log('Environment:', process.env.NODE_ENV);

// -------------------------
// Create Express app
// -------------------------
const app = express();

// -------------------------
// Middleware
// -------------------------
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Enable CORS only in development
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

// -------------------------
// API Routes
// -------------------------
app.use('/api/projects', projectsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// -------------------------
// Serve Vite frontend in production
// -------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../frontend/dist');
  console.log('Serving frontend from:', frontendPath);

  // Serve static files
  app.use(express.static(frontendPath));

  // Serve index.html for all non-API routes
  app.get(/^\/(?!api).*$/, (req, res) => {
    // Only send index.html if the request is NOT for API
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendPath, 'index.html'));
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
