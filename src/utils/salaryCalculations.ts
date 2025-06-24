export const UIT = 5350; // Unidad Impositiva Tributaria
export const ANNUAL_UIT_DEDUCTION_LIMIT = 7 * UIT;
export const DEFAULT_AFP_PERCENTAGE = 10.23; // Default AFP percentage

export interface NetSalaryResult {
  grossSalary: number;
  pensionDeduction: number;
  incomeTax: number;
  netSalary: number;
  descuentoAFP?: number;
  descuentoONP?: number;
}

export const calculateNetSalary = (
  grossSalary: number,
  pensionSystemType: "afp" | "onp",
  afpRatePercent: number = DEFAULT_AFP_PERCENTAGE, // Use the constant for default
): NetSalaryResult => {
  if (grossSalary <= 0) {
    return {
      grossSalary,
      pensionDeduction: 0,
      incomeTax: 0,
      netSalary: grossSalary,
      descuentoAFP: 0,
      descuentoONP: 0,
    };
  }

  let descuentoAFP = 0;
  let descuentoONP = 0;
  let incomeTax = 0;
  const afpRate = afpRatePercent / 100;

  // Pension system deductions
  if (pensionSystemType === "afp") {
    descuentoAFP = grossSalary * afpRate;
  } else {
    descuentoONP = grossSalary * 0.13; // 13% ONP
  }
  const grossSalaryAnnual = grossSalary * 12 + 2 * (grossSalary * 1.09);
  const pensionDeduction = descuentoAFP + descuentoONP;

  // Income Tax (5th category) - Based on NetSalaryCalculator.tsx logic
  if (grossSalaryAnnual > ANNUAL_UIT_DEDUCTION_LIMIT) {
    const baseImponible = grossSalaryAnnual - ANNUAL_UIT_DEDUCTION_LIMIT;
    // Using the structure from NetSalaryCalculator.tsx which is correct for tiered tax
    if (baseImponible <= 5 * UIT) {
      incomeTax = (baseImponible * 0.08) / 12;
    } else if (baseImponible <= 20 * UIT) {
      incomeTax = (5 * UIT * 0.08 + (baseImponible - 5 * UIT) * 0.14) / 12;
    } else if (baseImponible <= 35 * UIT) {
      incomeTax =
        (5 * UIT * 0.08 +
          (20 - 5) * UIT * 0.14 + // Corrected accumulation for the 14% bracket
          (baseImponible - 20 * UIT) * 0.17) /
        12;
    } else if (baseImponible <= 45 * UIT) {
      incomeTax =
        (5 * UIT * 0.08 +
          (20 - 5) * UIT * 0.14 +
          (35 - 20) * UIT * 0.17 + // Corrected accumulation for the 17% bracket
          (baseImponible - 35 * UIT) * 0.2) /
        12;
    } else {
      incomeTax =
        (5 * UIT * 0.08 +
          (20 - 5) * UIT * 0.14 +
          (35 - 20) * UIT * 0.17 +
          (45 - 35) * UIT * 0.2 + // Corrected accumulation for the 20% bracket
          (baseImponible - 45 * UIT) * 0.3) /
        12;
    }
  }

  const netSalary = grossSalary - pensionDeduction - incomeTax;

  return {
    grossSalary,
    pensionDeduction,
    incomeTax,
    netSalary,
    descuentoAFP,
    descuentoONP,
  };
};
