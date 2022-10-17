import React, { useEffect, useState, useReducer, useRef } from 'react';
import { SEO, Form, Results } from 'components';
import { EXCHANGE_RATE_API } from 'appConstants';
import { calculateNetSalary, calculateInDolars } from 'utils';
import { Box, Typography, Grid } from '@mui/material';
import { FormState, Salary } from 'types';
import { appContainerStyle, headerStyle, tiltAnimationStyle } from 'styled';
import piggy from 'components/animation/anim.json';
import { useAnimation } from 'hooks/useAnimation';
import {
  bootstrapPiggyAnimation,
  continuePiggyAnimation,
} from 'components/animation/animationUtils';

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

  const { animation, AnimationContainer } = useAnimation({ animJson: piggy });
  const unsubscribeLoopPiggyAnimation = useRef<(() => void | undefined) | null>(null);

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

  useEffect(() => {
    unsubscribeLoopPiggyAnimation.current = bootstrapPiggyAnimation(animation);
  }, [animation]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    unsubscribeLoopPiggyAnimation.current && unsubscribeLoopPiggyAnimation.current();
    const salary = calculateNetSalary(formState);
    continuePiggyAnimation(animation, () => {
      setCalculatedSalary(salary);
    });
  };

  const usdSalaryString = !!usdCourse
    ? ` ($${calculateInDolars(calculatedSalary?.net, usdCourse)})`
    : '';

  return (
    <Box sx={appContainerStyle}>
      <SEO title="SalaryCalc" />
      <Box sx={headerStyle}>
        {calculatedSalary ? (
          <Typography sx={tiltAnimationStyle} variant="h5" align="center">
            Your net salary: ${calculatedSalary?.net}zł {usdSalaryString}
          </Typography>
        ) : (
          <Typography variant="h5" align="center">
            Submit form to calculate salary
          </Typography>
        )}
        <Typography variant="subtitle2" align="center">
          Current USD Course: $1.00 = {usdCourse?.toFixed(2)}zł
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10} sm={6}>
          <Form values={formState} dispatch={dispatchForm} onSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={10} sm={6}>
          <Results salary={calculatedSalary} PiggyAnim={AnimationContainer} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndexPage;
