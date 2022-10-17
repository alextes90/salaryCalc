import React, { useEffect, useState, useReducer } from 'react';
import { SEO, Form, Results } from 'components';
import { EXCHANGE_RATE_API } from 'appConstants';
import { calculateNetSalary, calculateInDolars } from 'utils';
import { Box, Typography, Grid } from '@mui/material';
import { FormState, Salary } from 'types';
import { appContainerStyle, headerStyle } from 'styled';

type ExchangeResponse = {
  status: number;
  amount: number;
  value: string;
};

const initialFormValues: FormState = {
  gross: '10000',
  tax: '',
  myMultisport: 'NOT_APPLICABLE',
  partnerMultisport: 'NOT_APPLICABLE',
  luxmed: 'NOT_APPLICABLE',
  ppk: 'NO',
};

const IndexPage = () => {
  const [formState, dispatchForm] = useReducer(
    (formState: FormState, actionPayload: Partial<FormState>) => {
      return { ...formState, ...actionPayload };
    },
    initialFormValues
  );

  const [usdCourse, setUsdCourse] = useState<number>();
  const [calculatedSalary, setCalculatedSalary] = useState<Salary>();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const params = 'currency=USD&value=1';
        const response = await fetch(`${EXCHANGE_RATE_API}?${params}`);
        const data: ExchangeResponse = await response.json();
        setUsdCourse(Number(data.value));
      } catch (e) {
        console.log(e);
      }
    };
    fetchCourse();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const salary = calculateNetSalary(formState);
    setCalculatedSalary(salary);
  };

  return (
    <Box sx={appContainerStyle}>
      <SEO title="SalaryCalc" />
      <Box sx={headerStyle}>
        <Typography variant="h5" align="center">
          {calculatedSalary
            ? `Your net salary: ${calculatedSalary?.net}zł ($${calculateInDolars(
                calculatedSalary?.net,
                usdCourse
              )})`
            : 'Submit form to calculate salary'}
        </Typography>
        <Typography variant="subtitle2" align="center">
          Current USD Course: $1.00 = {usdCourse?.toFixed(2)}zł
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10} sm={6}>
          <Form values={formState} dispatch={dispatchForm} onSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={10} sm={6}>
          <Results salary={calculatedSalary} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndexPage;
