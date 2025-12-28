import { UserData, CalculationResult } from '../types';

export const calculateEcoKarma = (data: UserData): CalculationResult => {
  // 1. SAFELY Get Inputs
  const carKm = data.carKm || 0;
  const bikeKm = data.bikeKm || 0;
  const elecBill = data.elecBill || 0;
  const plasticItems = data.plastic || 0;

  // 2. Calculate Gross Emissions (kg CO2)
  const car = carKm * 0.19 * 365;
  const bike = bikeKm * 0.08 * 365;
  const elec = (elecBill / 8) * 0.82 * 12; 

  let diet = 0;
  if (data.diet === 'nonveg') diet = 1205;
  else if (data.diet === 'veg') diet = 620;
  else if (data.diet === 'vegan') diet = 365;

  const plastic = plasticItems * 0.06 * 365;
  const ac = data.ac ? 1460 : 0; 

  const totalCO2 = car + bike + elec + diet + plastic + ac;

  // 3. THE "SAVAGE" FORMULA
  const SAFE_LIMIT = 1500; // Survival allowance
  const excessCO2 = Math.max(0, totalCO2 - SAFE_LIMIT);

  // CHANGED: Divisor lowered to 20. 
  // This makes the penalty much harsher for high emitters.
  const treesOwed = Math.ceil(excessCO2 / 20); 

  // 4. Score Logic (Min 0, Max 850)
  const score = Math.max(0, 850 - (treesOwed * 5));

  let rank: 'S' | 'A' | 'B' | 'C' | 'D' | 'F' = 'B';
  let roast = "";

  if (score >= 800) { rank = 'S'; roast = "GOD MODE. You are basically a forest spirit."; }
  else if (score >= 700) { rank = 'A'; roast = "Respect. You are actually trying."; }
  else if (score >= 600) { rank = 'B'; roast = "You are painfully average."; }
  else if (score >= 400) { rank = 'D'; roast = "Bro, stop. You are hurting the planet."; }
  else { 
    rank = 'F'; 
    // Savage Roasts for F Tier
    if (data.ac) roast = "Sleeping at 18°C? You are personally melting the Antarctica.";
    else if (carKm > 30) roast = "You drive so much the oil companies want to sponsor you.";
    else roast = "You are single-handedly speed-running the apocalypse.";
  }

  return {
    totalCO2,
    treesOwed,
    score,
    rank,
    roast,
    breakdown: { transport: car + bike, energy: elec + ac, diet, habits: plastic }
  };
};

