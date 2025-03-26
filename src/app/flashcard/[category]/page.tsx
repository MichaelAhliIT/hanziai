"use client";

import { Container } from "@/app/components/ContainerComponent";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Flashcard {
  category: string;
  phrase: string;
  translation: string;
  pinyin: string;
}

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array: Flashcard[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FlashcardCategory = () => {
  const params = useParams();
  const category = params.category as string;

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  // Fetch and shuffle flashcards
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch(`/flashcard.json`); // Ensure file exists in /public
        const data: Flashcard[] = await response.json();
        const filteredData = data.filter(
          (card) =>
            card.category.toLowerCase() === category.toLowerCase().trim()
        );
        setFlashcards(shuffleArray(filteredData)); // Shuffle before setting state
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [category, isFinished]);

  // Handle next flashcard
  const handleKnow = () => {
    if (currentIndex === flashcards.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePractice = () => {
    if (currentIndex === flashcards.length - 1) {
      // Put the last flashcard back at the end and restart the cycle
      const cardToRepeat = flashcards[currentIndex];
      const newDeck = [...flashcards.slice(0, currentIndex), cardToRepeat];
      setFlashcards(newDeck);
    } else {
      // Move the current card to the end of the array
      const cardToRepeat = flashcards[currentIndex];
      const newDeck = [
        ...flashcards.slice(0, currentIndex),
        ...flashcards.slice(currentIndex + 1),
        cardToRepeat,
      ];
      setFlashcards(newDeck);
      setCurrentIndex((prevIndex) => prevIndex); // Stay on the same index, since we removed the current
    }
  };

  return (
    <Container>
      {isFinished ? (
        <div className="text-center py-20">
          <h2 className="text-4xl font-bold mb-4">
            🎉 You’ve finished all flashcards!
          </h2>
          <p className="text-lg text-gray-600">
            Great job! You can restart the session if you'd like to review them
            again.
          </p>
          <button
            className="btn btn-accent mt-6"
            onClick={() => {
              setCurrentIndex(0);
              setIsFinished(false);
            }}
          >
            Restart
          </button>
        </div>
      ) : flashcards.length > 0 ? (
        <div className="w-full flex justify-center">
          <div className="card bg-base-200 w-full md:w-3/5 h-72 shadow-sm items-center">
            <div className="card-body">
              <h2 className="card-title text-6xl text-center">
                {flashcards[currentIndex].translation}
              </h2>

              {showPinyin && (
                <p className="text-2xl text-gray-600 text-center">
                  {flashcards[currentIndex].pinyin}
                </p>
              )}
              {showMeaning && (
                <p className="text-2xl text-gray-600 text-center">
                  {flashcards[currentIndex].phrase}
                </p>
              )}
            </div>
            <div className="card-actions p-5">
              <button className="btn btn-accent" onClick={handlePractice}>
                Need Practice
              </button>
              <button className="btn btn-accent" onClick={handleKnow}>
                Know This
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading flashcards...</p>
      )}

      {/* Flashcard Settings */}
      <div className="flex flex-col gap-3 pt-20">
        <legend className="fieldset-legend">Flashcard Settings</legend>
        <label className="fieldset-label flex items-center gap-2">
          <input
            type="checkbox"
            checked={showPinyin}
            onChange={() => setShowPinyin(!showPinyin)}
            className="checkbox"
          />
          Pinyin
        </label>
        <label className="fieldset-label flex items-center gap-2">
          <input
            type="checkbox"
            checked={showMeaning}
            onChange={() => setShowMeaning(!showMeaning)}
            className="checkbox"
          />
          Meaning
        </label>
      </div>
    </Container>
  );
};

export default FlashcardCategory;
