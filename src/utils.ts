import { RefObject } from "react";

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

export const parseInputValue = (val: string, currVal: string) => {
  if (val === "") return "0";
  if (/^\d+$/.test(val)) return Number(val).toString();
  return currVal;
};

export const recursion = (a: RefObject<HTMLSpanElement>, b: number) => {
  const aValue = +a.current!.innerText;
  if (aValue < b) {
    if (b - aValue <= 0.1 && b - aValue > 0) {
      a.current!.innerText = (aValue + 0.01).toFixed(2);
    } else if (b - aValue <= 1 && b - aValue >= 0.1) {
      a.current!.innerText = (aValue + 0.1).toFixed(2);
    } else if (b - aValue <= 10 && b - aValue >= 1) {
      a.current!.innerText = (aValue + 1).toFixed(2);
    } else if (b - aValue <= 100 && b - aValue >= 10) {
      a.current!.innerText = (aValue + 10).toFixed(2);
    } else if (b - aValue <= 1000 && b - aValue >= 100) {
      a.current!.innerText = (aValue + 100).toFixed(2);
    } else if (b - aValue > 1000) {
      a.current!.innerText = (aValue + 1000).toFixed(2);
    }
    if (aValue >= b) return;
  } else {
    if (aValue - b <= 0.1 && aValue - b > 0) {
      a.current!.innerText = (aValue - 0.01).toFixed(2);
    } else if (aValue - b <= 1 && aValue - b >= 0.1) {
      a.current!.innerText = (aValue - 0.1).toFixed(2);
    } else if (aValue - b <= 10 && aValue - b >= 1) {
      a.current!.innerText = (aValue - 1).toFixed(2);
    } else if (aValue - b <= 100 && aValue - b >= 10) {
      a.current!.innerText = (aValue - 10).toFixed(2);
    } else if (aValue - b <= 1000 && aValue - b >= 100) {
      a.current!.innerText = (aValue - 100).toFixed(2);
    } else if (aValue - b > 1000) {
      a.current!.innerText = (aValue - 1000).toFixed(2);
    }
    if (aValue <= b) return;
  }
  setTimeout(() => recursion(a, b), 25);
};
