import { useState } from 'react';
import { CalculationResult } from '../types';
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide3Culprit from './slides/Slide3Culprit';
import Slide5Average from './slides/Slide5Average';
import Slide6Final from './slides/Slide6Final';

interface StorySlidesProps {
  userName: string;
  results: CalculationResult;
  onRestart: () => void;
}

export default function StorySlides({ userName, results, onRestart }: StorySlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <Slide1 key="slide1" userName={userName} onNext={() => setCurrentSlide(1)} />,
    <Slide2 key="slide2" treesOwed={results.treesOwed} onNext={() => setCurrentSlide(2)} />,
    <Slide3Culprit key="slide3culprit" results={results} onNext={() => setCurrentSlide(3)} />,
    <Slide3 key="slide3" onNext={() => setCurrentSlide(4)} />,
    <Slide5Average key="slide5average" results={results} onNext={() => setCurrentSlide(5)} />,
    <Slide6Final key="slide6final" userName={userName} results={results} onRestart={onRestart} />
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {slides[currentSlide]}
      </div>
    </div>
  );
}
