import passport from '../Service/passport-jwt.js';
import { CodeGeneration } from '../AI-Models/codegeneration.js';
import Log from '../logger/log.js';

export const Codeassist = [
  // JWT Authentication Middleware
  passport.authenticate('jwt', { session: false }),

  async (req, res) => {
    try {
      // Validate the message body
      const userMessage = req.body.message;
      if (!userMessage || !Array.isArray(userMessage)) {
        return res.status(400).json({ error: "Message should be an array of user messages" });
      }

      const latestMessage = userMessage[userMessage.length - 1]?.content;
      if (!latestMessage) {
        return res.status(400).json({ error: "The latest message content is missing" });
      }

      // Log the action
      try {
        await Log(req, res, req.user.email, "Codeassist");
      } catch (logError) {
        console.error("Error logging user action:", logError);
        // Optionally, you can still continue even if logging fails
      }

      // Generate code response
      let aiResponse;
      try {
        aiResponse = await CodeGeneration(latestMessage, "Codestral-2501");
      } catch (aiError) {
        console.error("Error in CodeGeneration:", aiError);
        return res.status(500).json({ error: "Failed to generate code" });
      }

      // Send back the AI-generated response
      return res.json({ message: aiResponse });
    } catch (err) {
      console.error("Error in /codegeneration endpoint:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
];
