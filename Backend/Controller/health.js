import useragent from 'useragent';
import { DeepSeek } from '../AI-Models/deepseek.js';
export const Health= async (req, res) => {
    await DeepSeek("hii")
    res.json({
        "status":"ok all services are up"
    })
}