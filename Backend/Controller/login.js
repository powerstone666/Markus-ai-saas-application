import User from "../Schema/user.model.js";
import { JwtSignin } from "../Service/jwtsignin.js";
import CryptoJS from "crypto-js";
export const Login=async(req,res)=>{
          const user=req.body;
          try{
            const email=user.email;
            const password=user.password;
            if(!email || !password){
                return res.status(400).json({error:"Invalid credentials"});
            }
            const userExists=await User.findOne({email:email})
            if(!userExists){
                return res.status(400).json({error:"User does not exist"});
            }
            var bytes  = CryptoJS.AES.decrypt(userExists.passwordHash,process.env.AES_KEY);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            
            if(originalText!==password){
                return res.status(400).json({error:"Invalid credentials"});
            }
               JwtSignin(email,res);
          }
            catch(err){
                return res.status(400).json({error:"Invalid credentials"});
            }
}