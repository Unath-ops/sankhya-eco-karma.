import { ChevronRight } from 'lucide-react';

interface Slide1Props {
  userName: string;
  onNext: () => void;
}

export default function Slide1({ userName, onNext }: Slide1Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center animate-fade-in p-6">
      <div className="space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Hi {userName}...
        </h1>

        <div className="space-y-4">
          <p className="text-2xl md:text-3xl text-gray-400">
            We analyzed your year.
          </p>
          <p className="text-2xl md:text-3xl text-red-400 font-semibold">
            It's time to see the cost.
          </p>
        </div>

        <div className="pt-8">
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
