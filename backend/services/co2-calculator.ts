// EPA WARM Emission Factors (kg CO2 abated per kg of material recycled)
export const EMISSION_FACTORS: Record<string, number> = {
  aluminum: 9.13,
  steel: 1.80,
  plastic_pet: 1.50,
  plastic_hdpe: 1.40,
  paper: 0.90,
  cardboard: 0.90,
  glass: 0.30,
  electronic: 3.50,
  textile: 2.10,
  mixed: 0.80,
};

export function calculateCO2Saved(category: string, weightKg: number): number {
  if (!weightKg || weightKg <= 0) return 0;
  
  const normalizedCategory = category.toLowerCase().trim();
  
  // Find closest matching category key
  const matchedKey = Object.keys(EMISSION_FACTORS).find(key => 
    normalizedCategory.includes(key) || key.includes(normalizedCategory)
  );

  const factor = matchedKey ? EMISSION_FACTORS[matchedKey] : EMISSION_FACTORS["mixed"];
  return parseFloat((weightKg * factor).toFixed(2));
}
