import { LuxmedType, MultiSportType } from 'types';

export const EXCHANGE_RATE_API = 'https://basic-exchanger.herokuapp.com';

export const LUXMED = {
  INDIVIDUAL: 105,
  PARTNER: 157.5,
  FAMILY: 287.5,
  NOT_APPLICABLE: 0,
};

export const MULTISPORT = {
  PLUS: 149.25,
  CLASSIC: 124.02,
  LIGHT: 68.32,
  NOT_APPLICABLE: 0,
};

export const PPK = {
  YES: 0.015,
  NO: 0,
};

export const MY_BENEFIT = 100;

export const TAX_RELIEF = 300;
export const INCOME_COSTS = 250;
export const TAX_THRESHOLD = 120000;
export const TAX_FREE_ALLOWANCE = 30000;
export const TAX_THRESHOLD_UNDER_26 = 85528;

export const HEALTH_CONTRIBUTION_RATE = 0.09;

export const DISABILITY_CONTRIBUTION_RATE = 0.015;
export const SICKNESS_CONTRIBUTION_RATE = 0.0245;
export const PENSION_CONTRIBUTION_RATE = 0.0976;

export const taxRateItems = [
  { name: '0%', value: '0' },
  { name: '12%', value: '12' },
  { name: '32%', value: '32' },
];

export const multisportItems: { name: string; value: MultiSportType }[] = [
  { name: 'Not applicable', value: 'NOT_APPLICABLE' },
  { name: 'Plus', value: 'PLUS' },
  { name: 'Classic', value: 'CLASSIC' },
  { name: 'Light', value: 'LIGHT' },
];

export const luxmedItems: { name: string; value: LuxmedType }[] = [
  { name: 'Not applicable', value: 'NOT_APPLICABLE' },
  { name: 'Individual', value: 'INDIVIDUAL' },
  { name: 'Me and partner', value: 'PARTNER' },
  { name: 'Family', value: 'FAMILY' },
];

export const SALARY_CHART_COLORS = ['#CB3F43', '#00C49F', '#FFBB28', '#0088FE', '#FF8042'];
export const SALARY_CHART_CUSTOM_STYLE = { fontFamily: 'Roboto, sans-serif' };
