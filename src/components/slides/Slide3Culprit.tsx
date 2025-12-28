import { ChevronRight } from 'lucide-react';
import { CalculationResult } from '../../types';

interface Slide3CulpritProps {
  results: CalculationResult;
  onNext: () => void;
}

export default function Slide3Culprit({ results, onNext }: Slide3CulpritProps) {
  const { breakdown, topCategory } = results;
  const total = breakdown.transport + breakdown.energy + breakdown.diet + breakdown.habits;

  const categories = [
    { name: 'Transport', key: 'transport' as const, value: breakdown.transport, color: 'bg-blue-500', emoji: '🚗' },
    { name: 'Energy', key: 'energy' as const, value: breakdown.energy, color: 'bg-yellow-500', emoji: '⚡' },
    { name: 'Diet', key: 'diet' as const, value: breakdown.diet, color: 'bg-orange-500', emoji: '🍽️' },
    { name: 'Habits', key: 'habits' as const, value: breakdown.habits, color: 'bg-red-500', emoji: '♻️' }
  ];

  const getCulpritMessage = () => {
    const messages = {
      transport: "Your travel habits are your biggest enemy.",
      energy: "Your electricity consumption is off the charts.",
      diet: "Your food choices are eating up the planet.",
      habits: "Your daily habits are silently destroying nature."
    };
    return messages[topCategory];
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-fade-in p-6">
      <div className="space-y-8 w-full max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-400">
          The Culprit Analysis
        </h2>

        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-700 space-y-6">
          <div className="space-y-4">
            {categories.map((category) => {
              const percentage = total > 0 ? (category.value / total) * 100 : 0;
              const isTop = category.key === topCategory;

              return (
                <div key={category.key} className={`transform transition-all ${isTop ? 'scale-105' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{category.emoji}</span>
                      <span className="text-white font-semibold">{category.name}</span>
                    </div>
                    <span className="text-gray-300">{category.value} kg</span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${category.color} transition-all duration-1000 ease-out shadow-lg`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{Math.round(percentage)}% of total</div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className={`text-center p-4 rounded-xl ${
              topCategory === 'transport' ? 'bg-blue-900/30 border border-blue-600' :
              topCategory === 'energy' ? 'bg-yellow-900/30 border border-yellow-600' :
              topCategory === 'diet' ? 'bg-orange-900/30 border border-orange-600' :
              'bg-red-900/30 border border-red-600'
            }`}>
              <p className="text-xl font-semibold text-white">
                {getCulpritMessage()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-400">Total</p>
              <p className="text-2xl font-bold text-green-400">{total} kg</p>
            </div>
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
