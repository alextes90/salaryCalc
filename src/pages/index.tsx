import React, { useEffect, useState, useReducer, useRef } from 'react';
import { SEO, Form, Results, ContactUs } from 'components';
import { EXCHANGE_RATE_API } from 'appConstants';
import { calculateNetSalary, calculateInDolars } from 'utils';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { FormState, Salary } from 'types';
import { headerStyle, tiltAnimationStyle } from 'styles/styled';
import piggy from 'features/animation/anim.json';
import { useAnimation } from 'hooks/useAnimation';
import { bootstrapPiggyAnimation, continuePiggyAnimation } from 'features/animation/animationUtils';
import { useAsync } from 'hooks/useAsync';
import { client } from 'utils/apiClient';
import '../styles/index.css';

type ExchangeResponse = {
  status: number;
  amount: number;
  usdRate: string;
  euroRate: string;
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

  const { animation, AnimationContainer, destroyAnimation } = useAnimation({ animJson: piggy });
  const unsubscribeLoopPiggyAnimation = useRef<(() => void | undefined) | null>(null);

  const { run, isPending, isIdle, isError, data: rates } = useAsync<ExchangeResponse>();

  useEffect(() => {
    run(client<ExchangeResponse>(`${EXCHANGE_RATE_API}`));
  }, [run]);

  useEffect(() => {
    if (!animation) return;
    unsubscribeLoopPiggyAnimation.current = bootstrapPiggyAnimation(animation);
  }, [animation]);

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
  };

  const usdSalaryStringFormat = !!rates
    ? `${calculateInDolars(calculatedSalary?.net, +rates?.usdRate)}$`
    : '';
  const euroSalaryStringFormat = !!rates
    ? `${calculateInDolars(calculatedSalary?.net, +rates?.euroRate)}€`
    : '';

  const currenciesStringFormat =
    isPending || isIdle
      ? [
          <>
            {' '}
            <CircularProgress size="16px" key="1" color="inherit" /> zl
          </>,
          <>
            {' '}
            <CircularProgress size="16px" key="0" color="inherit" /> zl
          </>,
        ]
      : isError
      ? ['No data to show', 'No data to show']
      : [`${Number(rates?.usdRate).toFixed(2)}zł`, `${Number(rates?.euroRate).toFixed(2)}zł`];

  return (
    <Box my="0" mx="auto">
      <SEO title="SalaryCalc" />
      <ContactUs />
      <Box sx={headerStyle}>
        <Box display="flex" justifyContent="center" mb="8px">
          <Typography variant="subtitle1" align="center" mr="1rem" minWidth="150px">
            $1.00 = {currenciesStringFormat[0]}
          </Typography>
          <Typography variant="subtitle1" align="center" minWidth="150px">
            €1.00 = {currenciesStringFormat[1]}
          </Typography>
        </Box>
        {calculatedSalary ? (
          <Box>
            <Typography sx={tiltAnimationStyle} variant="h6" align="center">
              Your net salary: {calculatedSalary?.net}zł
            </Typography>
            <Typography sx={tiltAnimationStyle} variant="h6" align="center">
              Converted to USD: {usdSalaryStringFormat}
            </Typography>
            <Typography sx={tiltAnimationStyle} variant="h6" align="center">
              Converted to EUR: {euroSalaryStringFormat}
            </Typography>
          </Box>
        ) : (
          <Typography variant="h5" align="center">
            Submit form to calculate salary
          </Typography>
        )}
      </Box>
      <Grid container px="1rem" maxWidth="1200px" mx="auto" justifyContent="center">
        <Grid item xs={10} sm={6}>
          <Form values={formState} dispatch={dispatchForm} handleSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={10} sm={6}>
          <Results salary={calculatedSalary} PiggyAnim={AnimationContainer} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndexPage;
