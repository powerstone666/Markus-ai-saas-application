import fetch from 'node-fetch';
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.GOOGLE; // Replace with your Google API key
const SEARCH_ENGINE_ID = process.env.ENGINE; // Replace with your Search Engine ID
const token = process.env.GITHUB; // Replace with your Azure token
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

async function searchGoogle(query) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
      return data.items.map(item => {
        const images = item.pagemap?.cse_image || []; // Extract images if available
        return {
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          images: images.map(image => image.src) // Map image sources to an array
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

export async function webSearch(query) {
  const results = await searchGoogle(query);
  const client = new ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system",
          content: `Summarize the following search results concisely, including relevant links without duplicating sources and prefacing only show results dont say these words like heres the summary etc: ${JSON.stringify(results)}`
        }
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    }
  });

  if (response.status !== "200") {
    throw response.body.error;
  }

  // Format the response properly
  const summaryContent = response.body.choices[0].message.content;

  // Create a unique list of sources formatted as markdown links
  const uniqueSources = [...new Set(results.map(item => `- [${item.title}](${item.link})`))].join('\n');

  // Create the final summary without duplicating sources
  const finalSummary = `
**From The Web**:
${summaryContent}

**Sources**:
${uniqueSources}
  `.trim(); // Trim any extra whitespace from the start or end

  // Collect image URLs separately
  const images = results.flatMap(item => item.images); 

  return {
    summary: finalSummary,
    images
  };
}
