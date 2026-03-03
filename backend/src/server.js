import express from 'express';
import authRoutes from './routes/auth.route.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const app = express();

// configuration 
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth" , authRoutes);

// server 
app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});
