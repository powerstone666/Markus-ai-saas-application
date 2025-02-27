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
  origin: [
    "https://markus-ai.vercel.app",
    "https://markus-ai.vercel.app/musicgeneration",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


server.use(cors(corsOptions));
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
