import { DeepSeek } from '../AI-Models/deepseek.js';
import { Gemini } from '../AI-Models/gemini.js';
import { GithubModels } from '../AI-Models/githubModels.js';
import passport from '../Service/passport-jwt.js';
import Log from '../logger/log.js';
const models = {
    "AI21 Jamba 1.5 Large": "AI21-Jamba-1.5-Large",
    "AI21 Jamba 1.5 Mini": "AI21-Jamba-1.5-Mini",
    "Cohere Command R": "Cohere-command-r",
    "Cohere Command R 08-2024": "Cohere-command-r-08-2024",
    "Cohere Command R+": "Cohere-command-r-plus",
    "Cohere Command R+ 08-2024": "Cohere-command-r-plus-08-2024",
    "Codestral 25.01": "codestral_2501",
    "JAIS-30B-Chat-Arabic": "jais-30b-chat",
    "Llama-3.3-70B-Instruct": "Llama-3.3-70B-Instruct",
    "Meta-Llama-3-70B-Instruct": "Meta-Llama-3-70B-Instruct",
    "Meta-Llama-3-8B-Instruct": "Meta-Llama-3-8B-Instruct",
    "Meta-Llama-3.1-405B-Instruct": "Meta-Llama-3.1-405B-Instruct",
    "Meta-Llama-3.1-70B-Instruct": "Meta-Llama-3.1-70B-Instruct",
    "Meta-Llama-3.1-8B-Instruct": "Meta-Llama-3.1-8B-Instruct",
    "Ministral 3B": "Ministral-3B",
    "Mistral Large": "Mistral-large",
    "Mistral Large (2407)": "Mistral-large-2407",
    "Mistral Large 2 4.11": "Mistral-large-2411",
    "Mistral Nemo": "Mistral-Nemo",
    "Mistral Small": "Mistral-small",
    "OpenAI GPT-4o": "gpt-4o",
    "OpenAI GPT-4o mini": "gpt-4o-mini",
    "OpenAI o1": "o1",
    "OpenAI o1-mini": "o1-mini",
    "OpenAI o1-preview": "o1-preview",
    "Phi-3-mini instruct (128k)": "Phi-3-MoE-instruct",
    "Phi-3-mini instruct (4k)": "Phi-3-mini-instruct",
    "Phi-3-medium instruct (128k)": "Phi-3-medium-128k-instruct",
    "Phi-3-medium instruct (4k)": "Phi-3-medium-4k-instruct",
    "Phi-3-small instruct (128k)": "Phi-3-small-128k-instruct",
    "Phi-3-small instruct (8k)": "Phi-3-small-8k-instruct",
    "Phi-3.5-MoE instruct (128k)": "Phi-3.5-MoE-instruct",
    "Phi-3.5-mini instruct (128k)": "Phi-3.5-mini-instruct",
    "Phi-4": "phi-4",
  };
  
  

export const Conversation=
[
    passport.authenticate('jwt', { session: false }),
async (req, res) => {
    try {
        const userMessage = req.body.message; 
        const model=req.body.model;
   
        if (!userMessage || !Array.isArray(userMessage)) {
            return res.status(400).json({ error: "Invalid message format" });
        }

        const latestMessage = userMessage[userMessage.length - 1]?.content;
        if (!latestMessage) {
            return res.status(400).json({ error: "No user message content" });
        }

        if(model==="Gemini-2.0-flash-thinking (Default)")
        {
           try {
                  await Log(req, res, req.user.email,model);
                } catch (logError) {
                  console.error("Error logging user action:", logError);
                  // Optionally, you can still continue even if logging fails
                }
          
            const aiResponse=await Gemini(latestMessage,"gemini-2.0-flash-thinking-exp");
            return res.json({ message: aiResponse });
        }
        else if(model==="Gemini-2.0-Flash")
        {
           try {
                  await Log(req, res, req.user.email,model);
                } catch (logError) {
                  console.error("Error logging user action:", logError);
                  // Optionally, you can still continue even if logging fails
                }
          
            const aiResponse=await Gemini(latestMessage,"gemini-2.0-flash-exp");
            return res.json({ message: aiResponse });
        }
      else if(model==="DeepSeek R1")
      {
         try {
                await Log(req, res, req.user.email,model);
              } catch (logError) {
                console.error("Error logging user action:", logError);
                // Optionally, you can still continue even if logging fails
              }
        
        const aiResponse=await DeepSeek(latestMessage);
        return res.json({ message: aiResponse });
      }
      else{
        const modelName=models[model];
        if(modelName===undefined)
        {
          return res.status(400).json({ error: "Invalid model" });
        }
        else{
           try {
                  await Log(req, res, req.user.email,model);
                } catch (logError) {
                  console.error("Error logging user action:", logError);
                  // Optionally, you can still continue even if logging fails
                }
          
        const aiResponse = await GithubModels(latestMessage, modelName);
        return res.json({ message: aiResponse });
        }
      }
       

    } catch (err) {
        console.error("Error in /models endpoint:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
]