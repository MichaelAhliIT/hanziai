"use client";

import { useState } from "react";
import axios from "axios";
import { Container } from "../../ContainerComponent";

interface AnswerData {
  translations: { translation: string; pinyin: string }[];
}

export const TranslationPages = () => {
  const [phrase, setPhrase] = useState("");
  const [context, setContext] = useState("");
  const [answerResponse, setAnswerResponse] = useState<AnswerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e: any) => {
    e.preventDefault();

    // ✅ Validation: Ensure required fields have values
    if (!phrase.trim()) {
      setError("Phrase is required.");
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous errors

    const formData = {
      phrase,
      context,
    };

    try {
      const response = await axios.post("/api/translates", formData);
      setAnswerResponse(response.data);
      setPhrase("");
      setContext("");
    } catch (error: any) {
      console.error("Error fetching translation:", error);
      setError("Failed to fetch translation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl pb-5">Context Translation</h1>

      <legend className="fieldset-legend">Input English Text</legend>
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Ex: Take it easy"
          className="input w-full border border-gray-300 rounded-lg p-2"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <legend className="fieldset-legend">Context</legend>
        <input
          type="text"
          placeholder="Ex: Telling a friend to relax"
          className="input w-full border border-gray-300 rounded-lg p-2"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <p className="fieldset-label text-sm">Optional</p>

        <button
          className="btn btn-active btn-secondary my-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>

      <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg">Result</legend>
        <textarea
          className="textarea w-full min-h-24 border border-gray-300 rounded-lg p-2 resize-none"
          value={
            answerResponse
              ? answerResponse.translations
                  .map((t) => `${t.translation} (${t.pinyin})`)
                  .join("\n")
              : ""
          }
          readOnly
        />
      </fieldset>
      <legend className="fieldset-legend">What is context translation?</legend>
      <p>
        Context Translation is an AI-powered translation tool that ensures words
        and phrases are translated accurately based on their intended meaning.
        Unlike traditional translation tools that provide literal or
        dictionary-based translations, Context Translation understands the
        context of a phrase and adjusts the output accordingly to match
        real-world usage in Taiwanese Mandarin (繁體中文). <br />
        <br />
        <span className="font-bold">With Context Translation, users can:</span>
        <br />✅ Enter a phrase or sentence they want to translate. <br />✅
        Optionally provide context (e.g., "ordering food" or "giving advice") to
        refine the meaning. <br />✅ Receive the most natural and commonly
        spoken translation used by Taiwanese speakers. <br />
        <br />
        <span className="font-bold">Key Features:</span> <br />
        🔹 Context-Aware Translations: AI dynamically adjusts translations based
        on the provided context. <br />
        🔹 Natural Taiwanese Mandarin Expressions: Ensures translations sound
        fluent and natural, not robotic or textbook-like. <br />
        🔹 Multiple Meaning Support: If a word has multiple meanings, the app
        prioritizes the most frequently spoken version. <br />
        🔹 Pinyin Pronunciation: Helps users learn the correct pronunciation of
        translated words. <br />
        🔹 Optional Context Input: Users can provide context for better accuracy
        but can also leave it blank for general translations.
      </p>
    </>
  );
};
