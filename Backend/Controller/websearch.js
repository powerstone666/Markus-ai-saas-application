import { webSearch } from '../AI-Models/search.js';
import passport from '../Service/passport-jwt.js';
import Log from '../logger/log.js';
export const Websearch= 
[
    passport.authenticate('jwt', { session: false }),
async (req, res) => {
    try {
        const userQuery = req.body.message;
        const response = await webSearch(userQuery);
        
        const results = response;
        res.json({ results });
         try {
                await Log(req, res, req.user.email, "Websearch");
              } catch (logError) {
                console.error("Error logging user action:", logError);
                // Optionally, you can still continue even if logging fails
              }
        
    } catch (error) {
        console.error('Error in /search endpoint:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}
]