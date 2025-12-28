import { UserData, CalculationResult } from '../types';

export function calculateEcoKarma(data: UserData): CalculationResult {
  const carEmissions = data.hasCar ? data.carKm * 0.19 * 365 : 0;
  const bikeEmissions = data.hasBike ? data.bikeKm * 0.08 * 365 : 0;
  const transportEmissions = carEmissions + bikeEmissions;

  const electricityUnits = data.electricityBill / 8;
  const electricityEmissions = electricityUnits * 0.82 * 12;

  const dietFactors = {
    vegan: 1.0,
    vegetarian: 1.7,
    nonveg: 3.3
  };
  const dietEmissions = dietFactors[data.diet] * 365;

  const plasticEmissions = data.plasticCount * 0.06 * 365;
  const acEmissions = data.hasAC ? 4.0 * 365 : 0;
  const habitsEmissions = plasticEmissions + acEmissions;

  const energyEmissions = electricityEmissions;

  const annualCO2 = transportEmissions + energyEmissions + dietEmissions + habitsEmissions;

  const treesOwed = Math.round(annualCO2 / 22);
  const creditScore = Math.max(300, 850 - (treesOwed * 10));

  const breakdown = {
    transport: Math.round(transportEmissions),
    energy: Math.round(energyEmissions),
    diet: Math.round(dietEmissions),
    habits: Math.round(habitsEmissions)
  };

  const categories = [
    { name: 'transport' as const, value: breakdown.transport },
    { name: 'energy' as const, value: breakdown.energy },
    { name: 'diet' as const, value: breakdown.diet },
    { name: 'habits' as const, value: breakdown.habits }
  ];

  const topCategory = categories.reduce((max, curr) =>
    curr.value > max.value ? curr : max
  ).name;

  return {
    annualCO2: Math.round(annualCO2),
    treesOwed,
    creditScore,
    breakdown,
    topCategory
  };
}
