import { Container } from "../components/ContainerComponent";

export default function AboutPage() {
  return (
    <Container>
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
    </Container>
  );
}
