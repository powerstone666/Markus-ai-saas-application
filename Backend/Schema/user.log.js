import mongoose from "mongoose";

const userLogSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    log:[
        {
            ip: {
                type: String,
                required: true
            },
            os: {
                type: String,
                required: true
            },
            device: {
                type: String,
                required: true
            },
            browser: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                required: true
            }
        }
    ]
},
{
    timestamps: true
});

const Logger= mongoose.model('UserLog', userLogSchema);
export default Logger;