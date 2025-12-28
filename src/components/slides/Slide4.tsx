import { RotateCcw, AlertTriangle } from 'lucide-react';
import { CalculationResult } from '../../types';
import CreditScoreGauge from '../CreditScoreGauge';

interface Slide4Props {
  results: CalculationResult;
  onRestart: () => void;
}

export default function Slide4({ results, onRestart }: Slide4Props) {
  const isDefaulter = results.creditScore < 500;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-fade-in p-6">
      <div className="space-y-8 w-full max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-400">
          Your Nature Credit Score
        </h2>

        <CreditScoreGauge score={results.creditScore} />

        {isDefaulter && (
          <div className="flex items-center justify-center gap-3 bg-red-900/30 border-2 border-red-500 rounded-xl p-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-xl font-bold text-red-400">ECOLOGICAL DEFAULTER</span>
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-700 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-2xl text-white">To neutralize your Karma,</p>
            <p className="text-xl text-gray-400">your duty is to plant</p>
            <p className="text-6xl md:text-7xl font-bold text-green-400">
              {results.treesOwed}
            </p>
            <p className="text-3xl text-white font-semibold">Trees</p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
              <p className="text-sm text-gray-400 text-center">
                Annual CO₂ Footprint: <span className="text-white font-semibold">{results.annualCO2.toLocaleString()} kg</span>
              </p>
              <p className="text-xs text-gray-500 text-center italic">
                Calculations based on IPCC & CEA (Govt of India) Guidelines
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold py-4 rounded-xl transform transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          Audit Another Person
        </button>
      </div>
    </div>
  );
}
