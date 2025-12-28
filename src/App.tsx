import { useState } from 'react';
import InputForm from './components/InputForm';
import StorySlides from './components/StorySlides';
import { UserData, CalculationResult } from './types';
import { calculateEcoKarma } from './utils/calculations';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'results'>('form');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleCalculate = (data: UserData) => {
    const calculationResults = calculateEcoKarma(data);
    setUserData(data);
    setResults(calculationResults);
    setCurrentView('results');
  };

  const handleRestart = () => {
    setCurrentView('form');
    setUserData(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {currentView === 'form' ? (
        <InputForm onCalculate={handleCalculate} />
      ) : (
        <StorySlides
          userName={userData!.name}
          results={results!}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
