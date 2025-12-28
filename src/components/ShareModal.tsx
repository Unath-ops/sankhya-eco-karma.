import { X, Download, Copy } from 'lucide-react';
import { useState } from 'react';
import { CalculationResult } from '../types';

interface ShareModalProps {
  userName: string;
  results: CalculationResult;
  onClose: () => void;
}

export default function ShareModal({ userName, results, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `I took the SANKHYA Eco-Karma test! My Nature Credit Score: ${results.creditScore}/850. I owe ${results.treesOwed} trees. Calculate your ecological impact at sankhya.eco`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScreenshot = () => {
    const element = document.getElementById('share-card');
    if (element) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1200;
      canvas.height = 630;

      if (ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SANKHYA', canvas.width / 2, 100);

        ctx.fillStyle = '#fff';
        ctx.font = '32px Arial';
        ctx.fillText(`${userName}'s Eco-Karma`, canvas.width / 2, 160);

        ctx.fillStyle = results.creditScore < 500 ? '#ef4444' : '#22c55e';
        ctx.font = 'bold 64px Arial';
        ctx.fillText(results.creditScore.toString(), canvas.width / 2, 280);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '20px Arial';
        ctx.fillText('Nature Credit Score / 850', canvas.width / 2, 330);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 40px Arial';
        ctx.fillText(`${results.treesOwed} Trees Owed`, canvas.width / 2, 420);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '16px Arial';
        ctx.fillText('Based on IPCC & CEA Guidelines', canvas.width / 2, 500);

        ctx.fillStyle = '#6b7280';
        ctx.font = '14px Arial';
        ctx.fillText('Take the test: sankhya.eco', canvas.width / 2, 570);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `sankhya-${userName}-${Date.now()}.png`;
        link.click();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-green-400">Share Your Impact</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          id="share-card"
          className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-8 border border-gray-700 text-center space-y-4 mb-6"
        >
          <h4 className="text-3xl font-bold text-green-400">SANKHYA</h4>
          <p className="text-white text-lg">{userName}'s Eco-Karma</p>

          <div className="space-y-2">
            <div
              className={`text-5xl font-bold ${
                results.creditScore < 500 ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {results.creditScore}
            </div>
            <p className="text-gray-400 text-sm">Nature Credit Score / 850</p>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-yellow-400 font-semibold text-lg">
              {results.treesOwed} Trees Owed
            </p>
          </div>

          <p className="text-xs text-gray-500">
            Based on IPCC & CEA Guidelines
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleScreenshot}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download Card
          </button>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all transform hover:scale-105"
          >
            <Copy className="w-5 h-5" />
            {copied ? 'Copied!' : 'Copy Text'}
          </button>

          <p className="text-xs text-gray-500 text-center italic">
            Share your Eco-Karma score and inspire others to calculate theirs!
          </p>
        </div>
      </div>
    </div>
  );
}
