
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
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://israilsara786_db_user:IuVBDUnfmS5Gl3Z9@cluster0.uraur2q.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🚀 Laptop Galaxy Core: Database Connection Established'))
  .catch(err => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  });

// --- Schemas & Models ---

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'ADMIN' },
  createdAt: { type: Date, default: Date.now }
});

const InventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Laptop', 'Part'], required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  condition: { type: String, required: true },
  images: [String],
  averageRating: { type: Number, default: 5 },
  warrantyType: { type: String, default: '6 Months Store Warranty' },
  description: String,
  batteryHealth: Number,
  usedDuration: String,
  damageNotes: String
}, { timestamps: true });

const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  type: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', AdminSchema);
const Inventory = mongoose.model('Inventory', InventorySchema);
const Inquiry = mongoose.model('Inquiry', InquirySchema);

// --- Routes ---

app.get('/api/products', async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin && await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ token, user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Error adding product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(400).json({ message: 'Error saving inquiry' });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ date: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries' });
  }
});

app.get('/', (req, res) => {
  res.send('🌌 Laptop Galaxy API is online.');
});

app.listen(PORT, () => console.log(`🛰️  Laptop Galaxy Core: Online on Port ${PORT}`));
