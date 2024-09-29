import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import  dotenv  from "dotenv";
dotenv.config();
const token =process.env.GITHUB;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "Phi-3.5-mini-instruct";

// Initialize messages array to store conversation history
let messages = [
  { role: "system", content: "You are a helpful assistant." },
];

let timeoutId = null;  // Timer to reset messages
const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 minutes

// Function to reset messages after a timeout
function resetMessages() {
  messages = [{ role: "system", content: "You are a helpful assistant." }];
  console.log("Messages reset due to inactivity.");
}

// Function to restart the timer on every new message
function restartTimeout() {
  // Clear previous timeout if it exists
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  // Start a new timeout
  timeoutId = setTimeout(resetMessages, TIMEOUT_DURATION);
}

export async function GithubModels(newMessage) {
  // Add the new message to the conversation history
  messages.push({ role: "user", content: newMessage });

  // Restart the timeout to prevent reset on new activity
  restartTimeout();

  const client = new ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: messages, // Send all accumulated messages
      model: modelName,
    },
  });

  if (response.status !== "200") {
    throw response.body.error;
  }

  let assistantResponse = "";
  for (const choice of response.body.choices) {
    const assistantMessage = choice.message.content;
    console.log(assistantMessage);

    // Append the assistant's message to the conversation history
    messages.push({ role: "assistant", content: assistantMessage });

    assistantResponse += assistantMessage;
  }

  // Return the assistant's response
  return assistantResponse;
}
