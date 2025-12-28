export interface UserData {
  name: string;
  hasCar: boolean;
  carKm: number;
  hasBike: boolean;
  bikeKm: number;
  electricityBill: number;
  diet: 'vegan' | 'vegetarian' | 'nonveg';
  hasAC: boolean;
  plasticCount: number;
}

export interface EmissionBreakdown {
  transport: number;
  energy: number;
  diet: number;
  habits: number;
}

export interface CalculationResult {
  annualCO2: number;
  treesOwed: number;
  creditScore: number;
  breakdown: EmissionBreakdown;
  topCategory: 'transport' | 'energy' | 'diet' | 'habits';
}
