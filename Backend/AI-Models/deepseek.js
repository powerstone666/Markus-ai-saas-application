import { HfInference } from "@huggingface/inference";

export async function DeepSeek(data) {
  const hf = new HfInference(process.env.HUGGINGFACE);

  const response = await hf.textGeneration({
    model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
    inputs: data,
    parameters: {
      max_new_tokens: 5000,
    },
  });

  // Remove <think> tags and their content
  const trimmedResponse = response.generated_text.replace(/<think>.*?<\/think>/g, "").trim();

  return trimmedResponse;
}
