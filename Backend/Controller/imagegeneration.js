import { query } from '../AI-Models/stable.js';
import passport from '../Service/passport-jwt.js';
import Log from '../logger/log.js';
export const Imagegeneration=
[
    passport.authenticate('jwt', { session: false }),
async (req, res) => {
    const userMessage = req.body.message; 

    try {
        const response = await query({"inputs": userMessage});
        const blob = response; 
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        res.set('Content-Type', 'image/png'); 
        res.send(buffer);
         try {
                await Log(req, res, req.user.email, "Imagegeneration");
              } catch (logError) {
                console.error("Error logging user action:", logError);
                // Optionally, you can still continue even if logging fails
              }
        
    } catch (error) {
        console.error('Error in /image endpoint:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}
]