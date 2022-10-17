import { MULTISPORT, LUXMED, PPK } from 'appConstants';

export type MultiSportType = keyof typeof MULTISPORT;
export type LuxmedType = keyof typeof LUXMED;
export type PpkType = keyof typeof PPK;

export type FormState = {
  gross: string;
  tax: string;
  myMultisport: MultiSportType;
  partnerMultisport: MultiSportType;
  luxmed: LuxmedType;
  ppk: PpkType;
};

export type Salary = {
  net: number;
  zus: number;
  healthInsurance: number;
  taxation: number;
  ppkContribution: number;
};
