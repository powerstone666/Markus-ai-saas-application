import express from 'express';
import { query } from './stable.js';
import { GithubModels } from './githubModels.js';
import cors from 'cors';
import { Music } from './musicgen.js';
import { CodeGeneration } from './codegeneration.js';
import { webSearch } from './search.js';
import dotenv from 'dotenv';

dotenv.config();
const server = express();
const url=["https://markus-ai.vercel.app", "http://localhost:5173"];
server.use(express.json());
const corsOptions = {
    origin: url,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
    optionsSuccessStatus: 204, 
};

server.use(cors(corsOptions));

server.post("/image", async (req, res) => {
    const userMessage = req.body.message; 

    try {
        const response = await query({"inputs": userMessage});
        const blob = response; 
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        res.set('Content-Type', 'audio/mpeg'); 
        res.send(buffer);
    } catch (error) {
        console.error('Error in /image endpoint:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

server.post("/models", async (req, res) => {
    try {
        const userMessage = req.body.message; 

        if (!userMessage || !Array.isArray(userMessage)) {
            return res.status(400).json({ error: "Invalid message format" });
        }

        const latestMessage = userMessage[userMessage.length - 1]?.content;
        if (!latestMessage) {
            return res.status(400).json({ error: "No user message content" });
        }

        let aiResponse = await GithubModels(latestMessage);
        return res.json({ message: aiResponse });

    } catch (err) {
        console.error("Error in /models endpoint:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

server.post("/codegeneration", async (req, res) => {
    try {
        const userMessage = req.body.message; 

        if (!userMessage || !Array.isArray(userMessage)) {
            return res.status(400).json({ error: "Invalid message format" });
        }

        const latestMessage = userMessage[userMessage.length - 1]?.content;
        if (!latestMessage) {
            return res.status(400).json({ error: "No user message content" });
        }

        let aiResponse = await CodeGeneration(latestMessage);
        return res.json({ message: aiResponse });

    } catch (err) {
        console.error("Error in /codegeneration endpoint:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

server.post("/music", async (req, res) => {
    try {
        const userMessage = req.body.message; 
        const response = await Music({"inputs": userMessage});
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        res.set('Content-Type', 'audio/mpeg');
        res.send(buffer);
    } catch (error) {
        console.error('Error in /music endpoint:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});


server.post("/search", async (req, res) => {
    try {
        const userQuery = req.body.message;
        const response = await webSearch(userQuery);
        
        const results = response;
        res.json({ results });
    } catch (error) {
        console.error('Error in /search endpoint:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

server.get("/chck", (req, res) => {
    res.json({ message: "Hello" });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  
});
