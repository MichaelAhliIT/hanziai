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
      
    </>
  );
};
