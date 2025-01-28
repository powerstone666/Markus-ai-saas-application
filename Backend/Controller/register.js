import User from "../Schema/user.model.js";
import CryptoJS from 'crypto-js';
export const Register = async (req, res) => {
  const { username, email, password } = req.body;
  
  const name = username;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  } else {
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ 
          error: "User already exists" });
      } else {
        const secretKey =process.env.AES_KEY;
   
        const passwordHash= CryptoJS.AES.encrypt(password, secretKey).toString();
     
        await User.create({
          name,
          email,
          passwordHash,
        });
      }
    } catch (err) {
      return res.status(400).json({ error: "User already exists" });
    }
    res.json({ message: "Successfully signed up" });
  }
};
