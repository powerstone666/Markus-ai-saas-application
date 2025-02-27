import { Music } from '../AI-Models/musicgen.js';
import passport from '../Service/passport-jwt.js';
import Log from '../logger/log.js';
export const Musicgeneration= 
[
    passport.authenticate('jwt', { session: false }),
async (req, res) => {

    const userMessage = req.body.message; 
  
    try {
        const response = await Music({"inputs": userMessage});
        const blob = response; 
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        res.set('Content-Type', 'audio/mpeg'); 
        res.send(buffer);
         try {
                await Log(req, res, req.user.email, "Musicgeneration");
              } catch (logError) {
                console.error("Error logging user action:", logError);
              
              }
        
    } catch (error) {
        console.error('Error in /music endpoint:', error);
        res.status(410).json({ error: "Something went wrong" });
    }
}
]
