import React from 'react';
import { Salary } from 'types';
import { Box } from '@mui/material';
import { SalaryChart } from './SalaryChart';

type Props = {
  salary?: Salary;
  PiggyAnim: JSX.Element;
};

export const Results = ({ salary, PiggyAnim }: Props) => {
  return (
    <Box width="100%" height="100%" minHeight="20em">
      {salary ? <SalaryChart salary={salary} /> : PiggyAnim}
    </Box>
  );
};
