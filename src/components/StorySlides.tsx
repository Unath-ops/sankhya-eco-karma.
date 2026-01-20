import React, { useState, useEffect } from 'react';
import { UserData, CalculationResult } from '../types';
import { TreeDeciduous, Share2, RefreshCw } from 'lucide-react';

interface Props {
  data: UserData;
  results: CalculationResult | null;
  onRestart: () => void;
}

// GITA VERSES
const GITA_VERSES = [
  {
    text: "He who enjoys nature's gifts without giving back is certainly a thief.",
    source: "Bhagavad Gita 3.12",
  },
  {
    text: "The spiritually minded eat food first offered in sacrifice; others eat sin.",
    source: "Bhagavad Gita 3.13",
  },
  {
    text: "I am the taste in water, the light of the sun and the moon.",
    source: "Bhagavad Gita 7.8",
  },
  {
    text: "Time I am, the great destroyer of the worlds.",
    source: "Bhagavad Gita 11.32",
  },
  {
    text: "Prakriti (Nature) is the cause of all material activities.",
    source: "Bhagavad Gita 13.21",
  },
];

export default function StorySlides({ data, results, onRestart }: Props) {
  // SAFETY GUARD
  if (!results) return null;

  const [slideIndex, setSlideIndex] = useState(0);
  const [verse, setVerse] = useState(GITA_VERSES[0]);

  useEffect(() => {
    const random =
      GITA_VERSES[Math.floor(Math.random() * GITA_VERSES.length)];
    setVerse(random);
  }, []);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const avgEmission = 1500;
  const multiplier = (results.totalCO2 / avgEmission).toFixed(1);
  const isWorse = results.totalCO2 > avgEmission;

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      
      {/* CONTENT CONTAINER — TAP ANYWHERE */}
      <div
        className="h-full w-full flex flex-col items-center justify-between p-6"
        onClick={nextSlide}
        onTouchStart={nextSlide}
      >

        {/* PROGRESS BAR */}
        <div className="absolute top-2 left-0 w-full flex gap-1 px-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= slideIndex ? 'bg-green-500' : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        {/* SLIDE 1 */}
        {slideIndex === 0 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold mb-2">
              Hi {data.name || 'Stranger'}
            </h1>
            <p className="text-gray-400">We audited your karma.</p>

            <div className="mt-8 p-6 border border-red-700 bg-red-900/30 rounded-xl">
              <h2 className="text-2xl font-mono text-red-500 mb-2">
                ECOLOGICAL DEFICIT
              </h2>
              <p className="text-red-300">
                Nature’s balance sheet does not match.
              </p>
            </div>

            <p className="mt-auto text-sm text-gray-500 animate-pulse">
              Tap to continue…
            </p>
          </div>
        )}

        {/* SLIDE 2 */}
        {slideIndex === 1 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl font-bold text-red-500 mb-6">
              THE DAMAGE
            </h2>

            <div className="grid grid-cols-5 gap-3 mb-6">
              {Array.from({ length: Math.min(15, results.treesOwed) }).map(
                (_, i) => (
                  <TreeDeciduous
                    key={i}
                    className="w-8 h-8 text-red-600"
                  />
                )
              )}
            </div>

            <div className="text-6xl font-black mb-2">
              {results.treesOwed}
            </div>
            <p className="text-gray-400 uppercase tracking-widest">
              Trees Owed
            </p>

            <p className="mt-6 italic text-gray-300">
              "{results.roast}"
            </p>
          </div>
        )}

        {/* SLIDE 3 */}
        {slideIndex === 2 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="w-full bg-gray-900 p-6 rounded-xl mb-8">
              <h3 className="text-gray-400 text-sm mb-4 uppercase">
                You vs Average Student
              </h3>

              <div className="flex items-end justify-center gap-6 h-32">
                <div className="w-12 bg-gray-600 rounded-t h-1/4" />
                <div
                  className={`w-12 rounded-t ${
                    isWorse ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{
                    height: `${Math.min(
                      100,
                      (results.totalCO2 / avgEmission) * 25
                    )}%`,
                  }}
                />
              </div>

              <p className="mt-4 font-bold">
                {isWorse
                  ? `You pollute ${multiplier}× more than average.`
                  : 'You are cleaner than average.'}
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 text-left">
              <p className="text-yellow-400 font-serif text-lg">
                "{verse.text}"
              </p>
              <p className="text-gray-500 text-xs mt-2">
                — {verse.source}
              </p>
            </div>
          </div>
        )}

        {/* SLIDE 4 */}
        {slideIndex === 3 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center w-full">
            <div
              className={`text-6xl font-black mb-4 ${
                results.score > 500
                  ? 'text-green-500'
                  : 'text-red-600'
              }`}
            >
              RANK {results.rank}
            </div>

            <div className="w-full max-w-xs bg-gray-800 rounded-full h-4 mb-6">
              <div
                className={`h-full ${
                  results.score > 500
                    ? 'bg-green-500'
                    : 'bg-red-600'
                }`}
                style={{
                  width: `${(results.score / 850) * 100}%`,
                }}
              />
            </div>

            <h3 className="text-2xl font-bold mb-8">
              DUTY: PLANT{' '}
              <span className="text-green-400">
                {results.treesOwed} TREES
              </span>
            </h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                alert('Take a screenshot and share responsibly 🌱');
              }}
              className="w-full bg-white text-black font-bold py-3 rounded-full mb-3 flex items-center justify-center gap-2"
            >
              <Share2 size={18} /> Share My Result
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onRestart();
              }}
              className="w-full bg-gray-800 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Audit Another Person
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
