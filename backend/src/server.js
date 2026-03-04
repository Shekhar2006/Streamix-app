import express from 'express';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';

const app = express();

// configuration 
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth" , authRoutes);
app.use("/api/users", userRoutes);

// server 
app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
    connectDB();
});
