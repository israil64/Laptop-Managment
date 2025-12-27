import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'galaxy_super_secret_key_99';

// Middleware
app.use(express.json());
// In production, you might want to restrict CORS to your frontend URL
app.use(cors({
  origin: '*', // Allows all origins for initial deployment; change to frontend URL later
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());

// MongoDB Connection
// Fallback to the provided URI if environment variable is missing
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://israilsara786_db_user:IuVBDUnfmS5Gl3Z9@cluster0.uraur2q.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🚀 Laptop Galaxy Core: Database Connection