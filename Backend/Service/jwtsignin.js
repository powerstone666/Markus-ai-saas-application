import jwt from 'jsonwebtoken';
import User from '../Schema/user.model.js';
export const JwtSignin = async (email, res) => {
    const payload = {
        email: email
    }
    const accessToken=jwt.sign(payload, process.env.SECRET_KEY);
    const profile=await User.findOne({email:email}).select('-password');
    res.json({accessToken:accessToken,profile:profile});
}