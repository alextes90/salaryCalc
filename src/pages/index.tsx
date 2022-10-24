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
import { useAsync } from 'hooks/useAsync';
import { client } from 'utils/apiClient';

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

  const [calculatedSalary, setCalculatedSalary] = useState<Salary>();
  const [isFormBlocked, setIsFormBlocked] = useState(false);

  const { animation, AnimationContainer, destroyAnimation } = useAnimation({ animJson: piggy });
  const unsubscribeLoopPiggyAnimation = useRef<(() => void | undefined) | null>(null);

  const { run, isPending, isIdle, isError, data: usdCourse } = useAsync<ExchangeResponse>();

  useEffect(() => {
    const params = 'currency=USD&value=1';
    run(client<ExchangeResponse>(`${EXCHANGE_RATE_API}?${params}`));
  }, [run]);

  useEffect(() => {
    if (!animation) return;
    unsubscribeLoopPiggyAnimation.current = bootstrapPiggyAnimation(animation);
  }, [animation]);

  useEffect(() => {
    if (isFormBlocked) {
      setIsFormBlocked(false);
    }
  }, [formState]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const salary = calculateNetSalary(formState);
    if (animation) {
      unsubscribeLoopPiggyAnimation.current && unsubscribeLoopPiggyAnimation.current();

      continuePiggyAnimation(animation, () => {
        setCalculatedSalary(salary);
        destroyAnimation();
      });
    } else {
      setCalculatedSalary(salary);
    }

    setIsFormBlocked(true);
  };

  const usdSalaryStringFormat = !!usdCourse
    ? ` ($${calculateInDolars(calculatedSalary?.net, +usdCourse?.value)})`
    : '';

  const usdStringFormat =
    isPending || isIdle
      ? 'Loading...'
      : isError
      ? 'No data to show'
      : `${Number(usdCourse?.value).toFixed(2)}zł`;

  return (
    <Box sx={appContainerStyle}>
      <SEO title="SalaryCalc" />
      <Box sx={headerStyle}>
        {calculatedSalary ? (
          <Typography sx={tiltAnimationStyle} variant="h5" align="center">
            Your net salary: {calculatedSalary?.net}zł {usdSalaryStringFormat}
          </Typography>
        ) : (
          <Typography variant="h5" align="center">
            Submit form to calculate salary
          </Typography>
        )}
        <Typography variant="subtitle2" align="center">
          Current USD Course: $1.00 = {usdStringFormat}
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10} sm={6}>
          <Form
            values={formState}
            dispatch={dispatchForm}
            onSubmit={handleSubmit}
            isFormBlocked={isFormBlocked}
          />
        </Grid>
        <Grid item xs={10} sm={6}>
          <Results salary={calculatedSalary} PiggyAnim={AnimationContainer} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndexPage;
