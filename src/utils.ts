export type Res = {
  gross: number;
  tax_rate: number;
  zus: number;
  healthInsurance: number;
  tax: number;
  net: number;
};

export const net = (gross: number, tax_rate = 17) => {
  const res: Res = {
    gross,
    tax_rate,
    zus: 0,
    healthInsurance: 0,
    tax: 0,
    net: 0,
  };
  const bonus = 105 + 100; // lux med + 100zt my benefits
  const actual_gross = gross + bonus;
  // ZUS
  const old_age_pension_contribution_rate = 0.0976;
  const disability_contribution_rate = 0.015;
  const sickness_insurance_rate = 0.0245;
  const zus =
    actual_gross *
    (old_age_pension_contribution_rate +
      disability_contribution_rate +
      sickness_insurance_rate);
  res.zus = zus;
  console.log(`ZUS: ${zus}`);
  // Health insurance
  const basis_for_health_insurance = actual_gross - zus;
  const health_insurance_rate = 0.09;
  const health_insurance = basis_for_health_insurance * health_insurance_rate;
  console.log(`Health insurance: ${health_insurance}`);
  res.healthInsurance = health_insurance;
  // Taxation
  const income_costs = 250;
  const tax_relief = 425;
  const basis_for_taxation = basis_for_health_insurance - income_costs;
  const taxation = (basis_for_taxation * tax_rate) / 100 - tax_relief;
  console.log(`Tax: ${taxation}`);
  res.tax = taxation;

  // Net income
  res.net = actual_gross - zus - health_insurance - taxation - bonus;
  return res; // bonus comes indirectly
};
