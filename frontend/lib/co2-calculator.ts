/**
 * EPA WARM (Waste Reduction Model) Carbon Emission Factors
 * Values represent Metric Tons CO2e saved per short ton of material recycled vs landfilled/virgin production.
 * Converted strictly to: kg CO2e saved per kg of material recycled.
 */
export const EPA_WARM_FACTORS: Record<string, number> = {
  // Metals
  aluminum: 9.13, // 1 kg recycled aluminum saves ~9.13 kg CO2e (highest abatement)
  steel: 1.81,    // 1 kg recycled steel scrap saves ~1.81 kg CO2e
  copper: 4.35,   // 1 kg copper recovery saves ~4.35 kg CO2e
  
  // Plastics
  plastic_pet: 1.50,  // PET bottles / industrial flake
  plastic_hdpe: 1.35, // HDPE containers / drums / piping
  plastic_ldpe: 1.20, // Film packaging / wrap
  plastic_pp: 1.25,   // Polypropylene crates / parts
  
  // Fibers & Organics
  paper: 3.42,        // Corrugated containers (OCC) & industrial cardboard
  textile: 3.20,      // Secondary cotton / polyester fabric blends
  
  // Minerals & Electronics
  glass: 0.28,        // Cullet glass recycling
  electronic: 5.50,   // Mixed e-waste precious metals & plastics recovery
  
  // Fallback
  mixed: 1.10
};

/**
 * Deterministic CO2 Abatement Calculation
 * Formula: CO2e (kg) = Weight (kg) * EPA Emission Factor (kg CO2e / kg material)
 */
export function calculateCO2Saved(category: string, weightKg: number): number {
  if (!category || weightKg <= 0) return 0;
  
  const normalizedCategory = category.toLowerCase().trim().replace(/[\s-]/g, '_');
  
  let factor = EPA_WARM_FACTORS[normalizedCategory];
  
  if (!factor) {
    // Fuzzy matching for common labels
    if (normalizedCategory.includes('aluminum') || normalizedCategory.includes('metal')) {
      factor = EPA_WARM_FACTORS.aluminum;
    } else if (normalizedCategory.includes('pet')) {
      factor = EPA_WARM_FACTORS.plastic_pet;
    } else if (normalizedCategory.includes('hdpe') || normalizedCategory.includes('plastic')) {
      factor = EPA_WARM_FACTORS.plastic_hdpe;
    } else if (normalizedCategory.includes('paper') || normalizedCategory.includes('cardboard')) {
      factor = EPA_WARM_FACTORS.paper;
    } else if (normalizedCategory.includes('glass')) {
      factor = EPA_WARM_FACTORS.glass;
    } else if (normalizedCategory.includes('electronic') || normalizedCategory.includes('e-waste')) {
      factor = EPA_WARM_FACTORS.electronic;
    } else {
      factor = EPA_WARM_FACTORS.mixed;
    }
  }
  
  const co2Saved = weightKg * factor;
  return Math.round(co2Saved * 10) / 10; // Round to 1 decimal place
}
