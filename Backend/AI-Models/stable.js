import dotenv from "dotenv";
dotenv.config();
export async function query(data) {
	try{
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
		{
			headers: {
				Authorization: `Bearer ${process.env.HUGGINGFACE}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const result = await response.blob();
	return result;
}
catch(err){
	return "An error occurred while processing the request";
}
}

