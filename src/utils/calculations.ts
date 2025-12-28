export const calculateEcoKarma = (data: UserData): CalculationResult => {
  // 1. Calculate Gross Emissions (kg CO2)
  const car = data.carKm * 0.19 * 365;
  const bike = data.bikeKm * 0.08 * 365;
  const elec = (data.elecBill / 8) * 0.82 * 12; // Assuming ₹8/unit
  
  // Diet Factors (Scientific but fair)
  let diet = 0;
  if (data.diet === 'nonveg') diet = 1205;
  else if (data.diet === 'veg') diet = 620;
  else if (data.diet === 'vegan') diet = 365;

  const plastic = data.plastic * 0.06 * 365;
  const ac = data.ac ? 1460 : 0; // 4 hours/day approx

  const totalCO2 = car + bike + elec + diet + plastic + ac;

  // 2. THE FIX: "Human Survival Allowance"
  // The Planet can handle ~1500kg per person safely. We only punish excess.
  const SAFE_LIMIT = 1500; 
  
  // Net Excess Emissions (Cannot be negative)
  const excessCO2 = Math.max(0, totalCO2 - SAFE_LIMIT);

  // 3. Realistic Tree Math
  // A mature tree absorbs ~22kg/year. 
  // We use 50 as a "Gamified Divisor" to make the number achievable for students.
  const treesOwed = Math.ceil(excessCO2 / 50); 

  // 4. Calculate Score (Start at 850, drop by 10 per tree)
  // Cap the minimum score at 300
  const score = Math.max(300, 850 - (treesOwed * 10));

  // 5. Assign Rank based on score (not raw CO2)
  let rank: 'S' | 'A' | 'B' | 'C' | 'D' | 'F' = 'B';
  
  if (score >= 800) rank = 'S';       // Vegan/Walker (0-5 trees)
  else if (score >= 700) rank = 'A';  // Good
  else if (score >= 600) rank = 'B';  // Average
  else if (score >= 500) rank = 'C';  // Warning
  else if (score >= 400) rank = 'D';  // Bad
  else rank = 'F';                    // Earth Villain

  return {
    totalCO2,      // We still show their total impact
    treesOwed,     // But trees are lower
    score,
    rank,
    breakdown: { transport: car + bike, energy: elec + ac, diet, habits: plastic }
  };
};


