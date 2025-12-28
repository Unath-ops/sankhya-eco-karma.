import { RotateCcw, AlertTriangle, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CalculationResult } from '../../types';
import CreditScoreGauge from '../CreditScoreGauge';
import ShareModal from '../ShareModal';

interface Slide6FinalProps {
  userName: string;
  results: CalculationResult;
  onRestart: () => void;
}

export default function Slide6Final({ userName, results, onRestart }: Slide6FinalProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const isDefaulter = results.creditScore < 500;

  const handlePledge = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-fade-in p-6 relative overflow-hidden">
      {showConfetti && <Confetti />}

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

        <div className="space-y-3">
          <button
            onClick={handlePledge}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold py-4 rounded-xl transform transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] active:scale-95"
          >
            <Heart className="w-5 h-5" />
            I PLEDGE TO FIX THIS
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="w-full flex items-center justify-center gap-3 bg-yellow-500 text-black text-lg font-bold py-4 rounded-xl transform transition-all hover:scale-105 hover:bg-yellow-400 active:scale-95"
          >
            📸 SHARE MY SHAME
          </button>

          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center gap-3 bg-gray-700 text-white text-lg font-bold py-4 rounded-xl transform transition-all hover:scale-105 hover:bg-gray-600 active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            Audit Another Person
          </button>
        </div>
      </div>

      {showShareModal && (
        <ShareModal
          userName={userName}
          results={results}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}

function Confetti() {
  const confetti = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute w-2 h-2 animate-pulse"
          style={{
            left: `${item.left}%`,
            top: '-10px',
            animation: `fall ${item.duration}s linear ${item.delay}s forwards`,
            backgroundColor: ['#22c55e', '#10b981', '#fbbf24', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
            borderRadius: Math.random() > 0.5 ? '50%' : '0%'
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
