import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './Routes/routes.js';
import mongoose from 'mongoose';
import passport from './Service/passport-jwt.js';

dotenv.config();
const server = express();

server.use(express.json());
const corsOptions = {
    origin: "https://markus-ai.vercel.app", // Remove trailing slash
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Array format
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
    ],
    exposedHeaders: [
      "Content-Length",
      "Content-Type",
      "Authorization",
      "Content-Disposition",
      "Access-Control-Allow-Credentials"
    ],
    credentials: true,
    optionsSuccessStatus: 204,
    preflightContinue: false,
    maxAge: 86400 // 24-hour preflight cache
  };
  
  // Apply CORS middleware
  server.use(cors(corsOptions));
  
  // Explicitly handle OPTIONS requests
  server.options("*", cors(corsOptions));
  
server.use(passport.initialize());

server.use("/api/v1",router);

await mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
