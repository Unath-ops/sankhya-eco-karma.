import { useState } from 'react';
import InputForm from './components/InputForm';
import StorySlides from './components/StorySlides';
import { UserData, CalculationResult } from './types';
import { calculateEcoKarma } from './utils/calculations';

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleCalculate = (data: UserData) => {
    const calculationResults = calculateEcoKarma(data);
    setUserData(data);
    setResults(calculationResults);
  };

  const handleRestart = () => {
    setUserData(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* SHOW FORM WHEN NO RESULTS */}
      {!results && (
        <InputForm onCalculate={handleCalculate} />
      )}

      {/* SHOW STORY ONLY WHEN RESULTS EXIST */}
      {results && userData && (
        <StorySlides
          data={userData}
          results={results}
          onRestart={handleRestart}
        />
      )}

    </div>
  );
}

export default App;
