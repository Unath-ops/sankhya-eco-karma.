import { UserData, CalculationResult } from '../types';

export const calculateEcoKarma = (data: UserData): CalculationResult => {
  // --- 1. SAFELY Get Inputs (Fixes NaN) ---
  // We use "|| 0" to force empty values to be zero.
  const carKm = data.carKm || 0;
  const bikeKm = data.bikeKm || 0;
  const elecBill = data.elecBill || 0;
  const plasticItems = data.plastic || 0; // Fixes the common crash here
  
  // --- 2. Calculate Gross Emissions (kg CO2) ---
  const car = carKm * 0.19 * 365;
  const bike = bikeKm * 0.08 * 365;
  
  // Energy (Assuming ₹8/unit -> kWh * 0.82kg * 12 months)
  const elec = (elecBill / 8) * 0.82 * 12; 

  // Diet Factors
  let diet = 0;
  if (data.diet === 'nonveg') diet = 1205;
  else if (data.diet === 'veg') diet = 620;
  else if (data.diet === 'vegan') diet = 365;

  // Habits
  const plastic = plasticItems * 0.06 * 365;
  const ac = data.ac ? 1460 : 0; 

  const totalCO2 = car + bike + elec + diet + plastic + ac;

  // --- 3. THE FAIRNESS FIX ---
  // Humans are allowed ~1500kg survival limit. We only count what is ABOVE that.
  const SAFE_LIMIT = 1500; 
  
  // If total is less than limit, Excess is 0 (No negative numbers)
  const excessCO2 = Math.max(0, totalCO2 - SAFE_LIMIT);

  // --- 4. Tree Math ---
  // Divide excess by 50 for a realistic goal
  const treesOwed = Math.ceil(excessCO2 / 50); 

  // --- 5. Score & Rank ---
  // Start at 850, subtract points for debt. Min score 300.
  const score = Math.max(300, 850 - (treesOwed * 10));

  let rank: 'S' | 'A' | 'B' | 'C' | 'D' | 'F' = 'B';
  let roast = "You're basically an NPC. Not saving the world, not destroying it.";

  if (score >= 850) {
    rank = 'S';
    roast = "GOD MODE UNLOCKED. You breathe cleaner air than a Himalayan monk.";
  } else if (score >= 750) {
    rank = 'A';
    roast = "Respect. You're actually trying. Keep it up.";
  } else if (score >= 600) {
    rank = 'B';
    roast = "You're average. The planet is 'meh' about you.";
  } else if (score >= 500) {
    rank = 'C';
    roast = "You're on thin ice. Maybe walk more and eat less chicken?";
  } else if (score >= 400) {
    rank = 'D';
    roast = "Bro, your carbon footprint is bigger than your future.";
  } else {
    rank = 'F';
    // Savage specific roasts
    if (data.ac) roast = "You sleep at 18°C while the world burns. Disgraceful.";
    else if (carKm > 20) roast = "You drive everywhere? The ozone layer hates you personally.";
    else if (data.diet === 'nonveg') roast = "Eating that much meat? You're basically chewing on the Amazon rainforest.";
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
