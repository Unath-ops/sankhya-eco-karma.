import React, { useState, useEffect } from 'react';
import { UserData, CalculationResult } from '../types';
import { TreeDeciduous, Share2, RefreshCw, AlertTriangle, TrendingUp } from 'lucide-react';

interface Props {
  data: UserData;
  results: CalculationResult;
  onRestart: () => void;
}

// 1. DYNAMIC GITA QUOTES COLLECTION
const GITA_VERSES = [
  {
    text: "He who enjoys nature's gifts without giving back is certainly a thief.",
    source: "Bhagavad Gita 3.12"
  },
  {
    text: "The spiritually minded eat food first offered in sacrifice; others, who cook for themselves, eat sin.",
    source: "Bhagavad Gita 3.13"
  },
  {
    text: "I am the taste in water, the light of the sun and the moon.",
    source: "Bhagavad Gita 7.8 (You are polluting His energy)"
  },
  {
    text: "Time I am, the great destroyer of the worlds.",
    source: "Bhagavad Gita 11.32 (Don't hasten the destruction)"
  },
  {
    text: "Prakriti (Nature) is the cause of all material activities.",
    source: "Bhagavad Gita 13.21"
  }
];

export default function StorySlides({ data, results, onRestart }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [verse, setVerse] = useState(GITA_VERSES[0]);

  // Select random verse on load
  useEffect(() => {
    const random = GITA_VERSES[Math.floor(Math.random() * GITA_VERSES.length)];
    setVerse(random);
  }, []);

  const nextSlide = () => {
    if (slideIndex < 3) setSlideIndex(slideIndex + 1);
  };

  // Compare Logic
  const avgEmission = 1500; // Average student
  const multiplier = (results.totalCO2 / avgEmission).toFixed(1);
  const isWorse = results.totalCO2 > avgEmission;

  return (
    <div className="h-screen w-full flex flex-col items-center justify-between p-6 bg-black relative overflow-hidden" onClick={nextSlide}>
      
      {/* Progress Bar at Top */}
      <div className="absolute top-2 left-0 w-full flex gap-1 px-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= slideIndex ? 'bg-green-500' : 'bg-gray-800'}`} />
        ))}
      </div>

      {/* --- SLIDE 1: THE REALITY CHECK --- */}
      {slideIndex === 0 && (
        <div className="flex-1 flex flex-col justify-center items-center text-center animate-in fade-in slide-in-from-bottom duration-700">
          <h1 className="text-4xl font-bold text-white mb-2">Hi {data.name || 'Stranger'}</h1>
          <p className="text-xl text-gray-400">We audited your karma.</p>
          <div className="mt-8 p-6 border border-red-900 bg-red-900/20 rounded-xl">
             <h2 className="text-2xl font-mono text-red-500 mb-2">FATAL ERROR</h2>
             <p className="text-red-300">Ecological Balance Sheet Mismatch.</p>
          </div>
          <p className="mt-auto text-sm text-gray-500 animate-pulse">Tap to continue...</p>
        </div>
      )}

      {/* --- SLIDE 2: THE DESTRUCTION (Trees) --- */}
      {slideIndex === 1 && (
        <div className="flex-1 flex flex-col justify-center items-center text-center animate-in zoom-in duration-500">
          <h2 className="text-3xl font-bold text-red-500 mb-8 glitch-effect">THE DAMAGE</h2>
          
          <div className="grid grid-cols-5 gap-4 mb-8">
            {/* Show up to 15 trees, fade them out visually */}
            {Array.from({ length: Math.min(15, results.treesOwed) }).map((_, i) => (
              <TreeDeciduous key={i} className="w-8 h-8 text-red-600 animate-pulse" />
            ))}
          </div>

          <div className="text-6xl font-black text-white mb-2">{results.treesOwed}</div>
          <p className="text-gray-400 uppercase tracking-widest">Trees Owed</p>
          
          <div className="mt-8 bg-gray-900 p-4 rounded text-sm text-gray-300 italic">
            "{results.roast}"
          </div>
        </div>
      )}

      {/* --- SLIDE 3: GITA VERDICT & COMPARISON --- */}
      {slideIndex === 2 && (
        <div className="flex-1 flex flex-col justify-center items-center text-center animate-in slide-in-from-right duration-500">
          
          {/* THE NEW COMPARISON VISUAL */}
          <div className="w-full bg-gray-900 p-6 rounded-xl mb-8 border border-gray-800">
            <h3 className="text-gray-400 text-sm mb-4 uppercase">You vs Average Student</h3>
            <div className="flex items-end justify-center gap-6 h-32">
              {/* Average Bar */}
              <div className="w-12 bg-gray-600 rounded-t relative group h-1/4">
                 <span className="absolute -top-6 left-0 w-full text-xs text-gray-500">Avg</span>
              </div>
              {/* User Bar */}
              <div 
                className={`w-12 rounded-t relative transition-all duration-1000 ${isWorse ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ height: `${Math.min(100, (results.totalCO2 / avgEmission) * 25)}%` }} 
              >
                <span className={`absolute -top-8 left-1/2 -translate-x-1/2 font-bold ${isWorse ? 'text-red-400' : 'text-green-400'}`}>
                  {multiplier}x
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold text-white">
              {isWorse ? `You pollute ${multiplier}x more than your peers.` : "You are cleaner than average!"}
            </p>
          </div>

          {/* DYNAMIC GITA QUOTE */}
          <div className="border-l-4 border-yellow-500 pl-4 text-left">
            <p className="text-yellow-400 font-serif text-lg leading-relaxed">"{verse.text}"</p>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-wider">— {verse.source}</p>
          </div>
        </div>
      )}

      {/* --- SLIDE 4: FINAL RANK --- */}
      {slideIndex === 3 && (
        <div className="flex-1 flex flex-col justify-center items-center text-center animate-in fade-in duration-700 w-full">
          <div className={`text-6xl font-black mb-2 ${results.rank === 'S' || results.rank === 'A' ? 'text-green-500' : 'text-red-600'}`}>
            RANK {results.rank}
          </div>
          
          <div className="w-full max-w-xs bg-gray-900 rounded-full h-4 mb-8 overflow-hidden">
            <div 
              className={`h-full ${results.score > 500 ? 'bg-green-500' : 'bg-red-600'}`} 
              style={{ width: `${(results.score / 850) * 100}%` }}
            />
          </div>

          <h3 className="text-2xl font-bold text-white mb-8">
            DUTY: PLANT <span className="text-green-400">{results.treesOwed} TREES</span>
          </h3>

          <button onClick={() => alert("Screenshot this and post on Instagram!")} className="w-full bg-white text-black font-bold py-3 rounded-full mb-3 flex items-center justify-center gap-2">
            <Share2 size={18} /> Share My Shame
          </button>
          
          <button onClick={onRestart} className="w-full bg-gray-800 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2">
            <RefreshCw size={18} /> Audit Someone Else
          </button>
        </div>
      )}
    </div>
  );
}


