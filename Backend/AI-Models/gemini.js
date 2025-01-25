import { GoogleGenerativeAI } from "@google/generative-ai";

export async function Gemini (data,modelName) {
    try {
      
        const genAI = new GoogleGenerativeAI(process.env.GEMINI);
        const model = genAI.getGenerativeModel({ 
            model:modelName, // Use official model name
            generationConfig: {
                maxOutputTokens: data.max_tokens || 1000 // Default to 1000 tokens
            }
        });

        // Build proper prompt structure
        const prompt = {
            contents: [{
                role: "user",
                parts: [{ text: data }]
            }]
        };

        // Get full response in one call
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        return response.text();

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error(`Gemini API failed: ${error.message}`);
    }
}