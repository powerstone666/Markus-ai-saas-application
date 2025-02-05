import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import  dotenv  from "dotenv";
dotenv.config();
const token =process.env.GITHUB;
const endpoint = "https://models.inference.ai.azure.com";



let messages = [
  { role: "system", content: "You are a programmer answer questions related to technology tech stacks and coding questions and the related query remaining question just say i cant answers questions other than coding" },
];

let timeoutId = null; 
const TIMEOUT_DURATION = 10 * 60 * 1000; 

function resetMessages() {
  messages = [{ role: "system", content: "You are a programmer answer questions related to technology tech stacks and coding questions and the related query remaining question just say i cant answers questions other than coding" }];
  console.log("Messages reset due to inactivity.");
}

function restartTimeout() {

  if (timeoutId) {
    clearTimeout(timeoutId);
  }
 
  timeoutId = setTimeout(resetMessages, TIMEOUT_DURATION);
}

export async function CodeGeneration(newMessage,modelName) {
try{
  messages.push({ role: "user", content: newMessage });


  restartTimeout();

  const client = new ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: messages, 
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 4000,
      model: modelName,
    },
  });

  if (response.status !== "200") {
    throw response.body.error;
  }

  let assistantResponse = "";
  for (const choice of response.body.choices) {
    const assistantMessage = choice.message.content;
  

    
    messages.push({ role: "assistant", content: assistantMessage });

    assistantResponse += assistantMessage;
  }

 
  return assistantResponse;
}
catch(error){
  console.error("Error in CodeGeneration:", error);
  return "Failed to generate code";
}
}

