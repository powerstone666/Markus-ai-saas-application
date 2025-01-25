import User from '../Schema/user.model.js';
import passport from '../Service/passport-jwt.js';
export const Profile=[
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const email=req.user.email;
        const detail=await User.findOne({email:email}).select('-password');
        if(detail){
            res.status(200).json(detail);
        }
    }
]