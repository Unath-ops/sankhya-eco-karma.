import { ChevronRight } from 'lucide-react';

interface Slide3Props {
  onNext: () => void;
}

export default function Slide3({ onNext }: Slide3Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center animate-fade-in p-6">
      <div className="space-y-12 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-500">
          The Verdict from SANKHYA
        </h2>

        <div className="bg-gradient-to-br from-yellow-900/30 via-gray-900 to-black rounded-3xl p-8 md:p-12 border-2 border-yellow-600/50 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
          <blockquote className="space-y-6">
            <p className="text-2xl md:text-3xl font-serif text-yellow-400 leading-relaxed italic">
              "He who enjoys nature's gifts without giving back is certainly a thief."
            </p>
            <cite className="block text-xl md:text-2xl text-yellow-500 font-semibold not-italic">
              — Bhagavad Gita 3.12
            </cite>
          </blockquote>
        </div>

        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            You are currently running an
          </p>
          <p className="text-2xl md:text-3xl font-bold text-red-400">
            Ecological Deficit.
          </p>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            You are taking more from Prakriti than you are returning.
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={onNext}
            className="group flex items-center gap-2 mx-auto px-8 py-4 bg-yellow-500 text-black text-lg font-semibold rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105"
          >
            Continue
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
