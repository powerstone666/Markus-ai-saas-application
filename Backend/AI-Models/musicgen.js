import  dotenv  from "dotenv";
dotenv.config();
const token =process.env.HUGGINGFACE;

export async function Music(data) {
    try{
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/musicgen-small",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
        const result = await response.blob();
        return result;
    }
    catch(err){
        return "An error occurred while processing the request";
    }
}
   