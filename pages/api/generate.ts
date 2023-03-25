import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const text = req.body.text || "";
  if (text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid text",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text),
      temperature: 0.4, // Slightly more creative
      top_p: 0.9, // Focus on more likely tokens
      max_tokens: 500, // Shorter output
      frequency_penalty: 0.5, // Slight preference for less frequent words
      presence_penalty: 0.5, // Slight preference for not repeating words from the prompt
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error: unknown) {
    // Consider adjusting the error handling logic for your use case
    if (error instanceof Error) {
      if (isAxiosError(error) && error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: "An error occurred during your request.",
          },
        });
      }
    } else {
      console.error(`Unknown error: ${error}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(text: string) {
  return `Korrigieren Sie nur die grammar Fehler: "${text}"`;
}

function isAxiosError(error: unknown): error is import("axios").AxiosError {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}
