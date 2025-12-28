import { ChevronRight } from 'lucide-react';
import { CalculationResult } from '../../types';

interface Slide5AverageProps {
  results: CalculationResult;
  onNext: () => void;
}

const AVERAGE_INDIAN_STUDENT = 1500;

export default function Slide5Average({ results, onNext }: Slide5AverageProps) {
  const userEmissions = results.annualCO2;
  const ratio = userEmissions / AVERAGE_INDIAN_STUDENT;
  const isAboveAverage = userEmissions > AVERAGE_INDIAN_STUDENT;

  const maxValue = Math.max(userEmissions, AVERAGE_INDIAN_STUDENT) * 1.1;
  const avgHeight = (AVERAGE_INDIAN_STUDENT / maxValue) * 100;
  const userHeight = (userEmissions / maxValue) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-fade-in p-6">
      <div className="space-y-8 w-full max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-400">
          You vs. The Average
        </h2>

        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-700">
          <p className="text-center text-gray-400 mb-8">Average Indian Student per year</p>

          <div className="flex items-end justify-center gap-12 mb-12 h-64">
            <div className="text-center">
              <div className="flex items-end justify-center mb-4 gap-4">
                <div className="text-center">
                  <div className="relative w-32 h-64 bg-gray-700/50 rounded-lg overflow-hidden border-2 border-gray-600 flex items-end justify-center">
                    <div
                      className="w-full bg-gradient-to-t from-gray-400 to-gray-300 transition-all duration-1000 ease-out flex items-center justify-center text-white font-bold"
                      style={{ height: `${avgHeight}%` }}
                    >
                      {avgHeight > 20 && (
                        <span className="text-2xl">{AVERAGE_INDIAN_STUDENT.toLocaleString()}</span>
                      )}
                    </div>
                    {avgHeight <= 20 && (
                      <span className="absolute -bottom-8 text-2xl font-bold text-gray-300">
                        {AVERAGE_INDIAN_STUDENT.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mt-6 font-semibold">Average</p>
                </div>

                <div className="text-center">
                  <div className="relative w-32 h-64 bg-gray-700/50 rounded-lg overflow-hidden border-2 flex items-end justify-center transition-all" style={{ borderColor: isAboveAverage ? '#ef4444' : '#22c55e' }}>
                    <div
                      className={`w-full transition-all duration-1000 ease-out flex items-center justify-center text-white font-bold ${
                        isAboveAverage
                          ? 'bg-gradient-to-t from-red-500 to-red-400'
                          : 'bg-gradient-to-t from-green-500 to-green-400'
                      }`}
                      style={{ height: `${userHeight}%` }}
                    >
                      {userHeight > 20 && (
                        <span className="text-2xl">{userEmissions.toLocaleString()}</span>
                      )}
                    </div>
                    {userHeight <= 20 && (
                      <span className={`absolute -bottom-8 text-2xl font-bold ${isAboveAverage ? 'text-red-400' : 'text-green-400'}`}>
                        {userEmissions.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className={`text-gray-400 mt-6 font-semibold ${isAboveAverage ? 'text-red-400' : 'text-green-400'}`}>
                    You
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className={`text-center p-4 rounded-xl ${
              isAboveAverage
                ? 'bg-red-900/30 border border-red-600'
                : 'bg-green-900/30 border border-green-600'
            }`}>
              {isAboveAverage ? (
                <p className="text-xl font-semibold text-red-300">
                  You emit <span className="text-red-400 font-bold">{ratio.toFixed(1)}x</span> more than your peers.
                </p>
              ) : (
                <p className="text-xl font-semibold text-green-300">
                  You are <span className="text-green-400 font-bold">{(1 / ratio).toFixed(1)}x</span> cleaner than average!
                </p>
              )}
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
