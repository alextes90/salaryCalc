import { Salary } from 'types';

import {
  DISABILITY_CONTRIBUTION_RATE,
  SICKNESS_CONTRIBUTION_RATE,
  PENSION_CONTRIBUTION_RATE,
  HEALTH_CONTRIBUTION_RATE,
  INCOME_COSTS,
  MULTISPORT,
  MY_BENEFIT,
  LUXMED,
  TAX_RELIEF,
  PPK,
} from 'appConstants';

import { FormState } from 'types';

const roundToDoubleDigits = (n: number) => +n.toFixed(2);

export const calculateNetSalary = ({
  gross,
  myMultisport,
  partnerMultisport,
  luxmed,
  ppk,
  tax,
}: FormState): Salary => {
  const grossWithBonuses =
    +gross + MULTISPORT[myMultisport] + MULTISPORT[partnerMultisport] + LUXMED[luxmed] + MY_BENEFIT;

  const sicknessContribution = grossWithBonuses * SICKNESS_CONTRIBUTION_RATE;
  const pensionContribution = grossWithBonuses * PENSION_CONTRIBUTION_RATE;
  const disabilityContribution = grossWithBonuses * DISABILITY_CONTRIBUTION_RATE;

  const zus = roundToDoubleDigits(
    sicknessContribution + pensionContribution + disabilityContribution
  );

  const basisForHealthInsurance = grossWithBonuses - zus;
  const healthInsurance = roundToDoubleDigits(basisForHealthInsurance * HEALTH_CONTRIBUTION_RATE);

  const basisForTaxation = basisForHealthInsurance - INCOME_COSTS;
  const taxation = roundToDoubleDigits((basisForTaxation * +tax) / 100 - TAX_RELIEF);

  const ppkContribution = roundToDoubleDigits(grossWithBonuses * PPK[ppk]);
  const net = roundToDoubleDigits(+gross - zus - healthInsurance - taxation - ppkContribution);

  return { net, zus, healthInsurance, taxation, ppkContribution };
};

export const calculateInDolars = (net?: number, usdCourse?: number) => {
  if (!usdCourse || !net) return '';
  return (net / usdCourse).toFixed(2);
};
