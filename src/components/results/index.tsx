import React from 'react';
import { Salary } from 'types';
import { Box } from '@mui/material';
import { SalaryChart } from './SalaryChart';

type Props = {
  salary?: Salary;
};

export const Results = ({ salary }: Props) => {
  return (
    <Box width="100%" height="100%" minHeight="20em">
      {salary ? <SalaryChart salary={salary} /> : 'Count salary...'}
    </Box>
  );
};
