import { NextResponse } from "next/server";
import axios from "axios";
import { z } from "zod";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Store in .env.local

// Define Zod schema for a list of translations
const TranslationSchema = z.object({
  translations: z.array(
    z.object({
      translation: z.string(),
      pinyin: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const { phrase, context } = await req.json(); // Extract input from request body

    if (!phrase) {
      return NextResponse.json(
        { error: "Phrase is required" },
        { status: 400 }
      );
    }

    // Improved prompt with stricter translation rules
    const prompt = `You are a professional Taiwanese Mandarin translator. Your task is to accurately translate the given English phrase into **spoken Taiwanese Mandarin** (繁體中文). 

    - **Phrase to translate:** "${phrase}"
    - **Context (for additional clarification only, do NOT replace phrase meaning):** "${
      context || "None provided"
    }"
    - **Always prioritize translating the phrase directly**. Context is only used to refine meaning, not override the main translation.
    - **If the phrase is commonly spoken in Taiwan, use the most natural translation.**
    - **If context provides additional details, modify or add an alternative translation, but do NOT replace the core translation.**
    - **Do NOT give dictionary-style or textbook translations. Use real, commonly spoken Taiwanese Mandarin expressions.**
    - **Do NOT translate the context itself, only the phrase.**
    - **Do NOT add explanations, only return the translation in JSON format.**

    Your response must be strictly formatted as JSON:
    {
      "translations": [
        {
          "translation": "<Most natural Taiwanese-style translation>",
          "pinyin": "<Pinyin pronunciation>"
        },
        {
          "translation": "<Alternative translation (if context changes meaning)>",
          "pinyin": "<Pinyin pronunciation>"
        }
      ]
    }`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      },
      { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
    );

    // Ensure OpenAI returns valid JSON
    let rawData = response.data.choices[0].message.content.trim();

    if (!rawData.startsWith("{") || !rawData.endsWith("}")) {
      console.error("Invalid JSON format received:", rawData);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 }
      );
    }

    // Attempt JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(rawData);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    // Validate parsed JSON using Zod
    try {
      const validatedData = TranslationSchema.parse(parsedData);
      return NextResponse.json(validatedData); // Return structured JSON
    } catch (zodError) {
      console.error("Validation Error:", zodError);
      return NextResponse.json(
        { error: "AI response did not match expected format" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error fetching AI response" },
      { status: 500 }
    );
  }
}
