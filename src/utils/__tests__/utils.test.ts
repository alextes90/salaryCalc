import { FormState } from 'types';
import { calculateInDolars, calculateNetSalary } from '../index';

const salaryData: FormState = {
  gross: '10000',
  myMultisport: 'PLUS',
  partnerMultisport: 'PLUS',
  luxmed: 'FAMILY',
  ppk: 'YES',
  tax: '12',
};

const salaryExpectedResult = {
  healthInsurance: 829.89,
  net: 6768.26,
  ppkContribution: 160.29,
  taxation: 776.51,
  zus: 1465.05,
};

describe('utils.ts', () => {
  it('calculateNetSalary should return correct values', () => {
    const salary = calculateNetSalary(salaryData);
    expect(salary).toEqual(salaryExpectedResult);
  });
  it('calculateInDolars shoudl return correct values', () => {
    const salaryInUsd = calculateInDolars(200, 5);
    expect(salaryInUsd).toBe('40.00');
  });
});
