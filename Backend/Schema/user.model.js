import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String
    },
},
{
    timestamps: true
});

const User = mongoose.model('users', userSchema);

export default User;