
# Laptop Galaxy - Backend Reference Logic

To maintain production readiness, here is the core logic for the backend. In a real deployment, move these to a separate Node/Express/TS repository.

## Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_cosmic_secret_key
MAIL_USER=notifications@laptopgalaxy.com
MAIL_PASS=securepassword
SMS_API_KEY=mock_key
```

## Security Middleware Example (TypeScript)
```typescript
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token failed' });
  }
};
```

## Product Model (Mongoose)
```typescript
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Laptop', 'Part'], required: true },
  condition: { type: String, enum: ['Like New', 'Excellent', 'Good', 'Fair'], required: true },
  batteryHealth: { type: Number },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  // ... more fields as per Laptop Galaxy specs
}, { timestamps: true });
```

## Notification Controller
```typescript
import nodemailer from 'nodemailer';

export const sendOrderStatusUpdate = async (userEmail: string, orderId: string, status: string) => {
  const transporter = nodemailer.createTransport({...});
  await transporter.sendMail({
    from: '"Laptop Galaxy" <notifications@laptopgalaxy.com>',
    to: userEmail,
    subject: `Order Update: ${orderId}`,
    html: `<b>Your order is now ${status}!</b> View it in your galaxy dashboard.`
  });
};
```
