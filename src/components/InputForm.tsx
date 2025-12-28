import { useState } from 'react';
import { Car, Bike, Zap, Leaf, Wind, Recycle } from 'lucide-react';
import { UserData } from '../types';

interface InputFormProps {
  onCalculate: (data: UserData) => void;
}

export default function InputForm({ onCalculate }: InputFormProps) {
  const [name, setName] = useState('');
  const [hasCar, setHasCar] = useState(false);
  const [carKm, setCarKm] = useState(0);
  const [hasBike, setHasBike] = useState(false);
  const [bikeKm, setBikeKm] = useState(0);
  const [electricityBill, setElectricityBill] = useState(0);
  const [diet, setDiet] = useState<'vegan' | 'vegetarian' | 'nonveg'>('vegetarian');
  const [hasAC, setHasAC] = useState(false);
  const [plasticCount, setPlasticCount] = useState(0);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    onCalculate({
      name: name.trim(),
      hasCar,
      carKm,
      hasBike,
      bikeKm,
      electricityBill,
      diet,
      hasAC,
      plasticCount
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-8 px-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            SANKHYA
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-red-400 mb-2">
            Let's Audit Your Karma.
          </h2>
          <p className="text-gray-400">Your ecological truth awaits...</p>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 transform transition-all hover:scale-[1.02]">
            <label className="block text-lg font-medium mb-3 text-green-400">What is your Name?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
              placeholder="Enter your name..."
            />
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Car className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-green-400">Transport</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white">Do you own a Car?</label>
                  <button
                    onClick={() => setHasCar(!hasCar)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      hasCar ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        hasCar ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {hasCar && (
                  <div className="animate-slide-down">
                    <label className="block text-sm text-gray-400 mb-2">Daily km driven: {carKm}</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={carKm}
                      onChange={(e) => setCarKm(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-green"
                    />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white flex items-center">
                    <Bike className="w-5 h-5 mr-2" />
                    Do you own a Bike?
                  </label>
                  <button
                    onClick={() => setHasBike(!hasBike)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      hasBike ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        hasBike ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {hasBike && (
                  <div className="animate-slide-down">
                    <label className="block text-sm text-gray-400 mb-2">Daily km ridden: {bikeKm}</label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={bikeKm}
                      onChange={(e) => setBikeKm(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-green"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-green-400">Energy</h3>
            </div>

            <label className="block text-sm text-gray-400 mb-2">
              Monthly Electricity Bill: ₹{electricityBill}
            </label>
            <input
              type="range"
              min="0"
              max="15000"
              step="100"
              value={electricityBill}
              onChange={(e) => setElectricityBill(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-green"
            />
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Leaf className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-green-400">Diet</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setDiet('vegan')}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  diet === 'vegan'
                    ? 'border-green-400 bg-green-400/20'
                    : 'border-gray-600 bg-gray-900/50'
                }`}
              >
                <div className="text-3xl mb-2">🌱</div>
                <div className="font-semibold">Vegan</div>
                <div className="text-xs text-gray-400">Low Impact</div>
              </button>

              <button
                onClick={() => setDiet('vegetarian')}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  diet === 'vegetarian'
                    ? 'border-yellow-400 bg-yellow-400/20'
                    : 'border-gray-600 bg-gray-900/50'
                }`}
              >
                <div className="text-3xl mb-2">🥗</div>
                <div className="font-semibold">Vegetarian</div>
                <div className="text-xs text-gray-400">Medium Impact</div>
              </button>

              <button
                onClick={() => setDiet('nonveg')}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  diet === 'nonveg'
                    ? 'border-red-400 bg-red-400/20'
                    : 'border-gray-600 bg-gray-900/50'
                }`}
              >
                <div className="text-3xl mb-2">🍖</div>
                <div className="font-semibold">Non-Veg</div>
                <div className="text-xs text-gray-400">High Impact</div>
              </button>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Wind className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-green-400">Habits</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-white">AC used daily?</label>
                <button
                  onClick={() => setHasAC(!hasAC)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    hasAC ? 'bg-red-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      hasAC ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Recycle className="w-5 h-5 text-green-400 mr-2" />
                  <label className="text-sm text-gray-400">
                    Plastic items used daily: {plasticCount}
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={plasticCount}
                  onChange={(e) => setPlasticCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-green"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold py-4 rounded-xl transform transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] active:scale-95"
          >
            CALCULATE MY DEBT
          </button>
        </div>
      </div>
    </div>
  );
}
