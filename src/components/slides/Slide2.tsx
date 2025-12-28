import { useState, useEffect } from 'react';
import { ChevronRight, TreeDeciduous } from 'lucide-react';

interface Slide2Props {
  treesOwed: number;
  onNext: () => void;
}

export default function Slide2({ treesOwed, onNext }: Slide2Props) {
  const [animatedTrees, setAnimatedTrees] = useState(0);
  const totalTrees = Math.max(20, treesOwed + 8);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedTrees(treesOwed);
    }, 500);
    return () => clearTimeout(timer);
  }, [treesOwed]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center animate-fade-in p-6">
      <div className="space-y-8 w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-red-400">
          The Destruction You Caused
        </h2>

        <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 border border-gray-800">
          <div className="grid grid-cols-5 gap-4 mb-8">
            {Array.from({ length: totalTrees }).map((_, index) => {
              const isDead = index < animatedTrees;
              const delayMs = Math.min(index * 60, 3000);
              return (
                <div
                  key={index}
                  className={`transition-all duration-[800ms] transform origin-center ${
                    isDead ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'
                  }`}
                  style={{ transitionDelay: `${delayMs}ms` }}
                >
                  <TreeDeciduous
                    className={`w-8 h-8 md:w-12 md:h-12 mx-auto transition-all duration-500 ${
                      isDead ? 'text-red-900' : 'text-green-400'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-white">
              Your lifestyle indirectly chopped down
            </p>
            <p className="text-5xl md:text-7xl font-bold text-red-500">
              {treesOwed} trees
            </p>
            <p className="text-xl md:text-2xl text-gray-400">
              this year.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onNext}
            className="group flex items-center gap-2 mx-auto px-8 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            Continue
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
