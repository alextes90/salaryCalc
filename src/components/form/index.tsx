import React, { useState, useEffect, FormEvent, Dispatch } from 'react';
import { formContainerStyle } from 'styled';
import { FormState, LuxmedType, MultiSportType, PpkType } from 'types';
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  useMediaQuery,
  Switch,
  Collapse,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CustomSelect } from 'components/form/Select';
import { luxmedItems, multisportItems, taxRateItems } from 'appConstants';

type Props = {
  values: FormState;
  dispatch: Dispatch<Partial<FormState>>;
  onSubmit(e: FormEvent<HTMLFormElement>): void;
};

export const Form = ({ values, dispatch, onSubmit }: Props) => {
  const theme = useTheme();
  const mqMatches = useMediaQuery(theme.breakpoints.down('sm'));
  const [isAdvanced, setIsAdvanced] = useState(true);
  const [isFormBlocked, setIsFormBlocked] = useState(false);

  useEffect(() => {
    setIsAdvanced(!mqMatches);
  }, [mqMatches]);

  const handleTogglerChange = () => {
    setIsAdvanced((prev) => !prev);
  };
  const handleSubmitEnhanced = (e: FormEvent<HTMLFormElement>) => {
    setIsFormBlocked(true);
    onSubmit(e);
  };

  const changeCallbacks = {
    ['salary-gross']: (value: string) => dispatch({ gross: value }),
    ['tax-rate']: (value: string) => dispatch({ tax: value }),
    ['my-multisport']: (value: string) => dispatch({ myMultisport: value as MultiSportType }),
    ['parther-multisport']: (value: string) =>
      dispatch({ partnerMultisport: value as MultiSportType }),
    ['luxmed']: (value: string) => dispatch({ luxmed: value as LuxmedType }),
    ['ppk']: (value: string) => dispatch({ ppk: value as PpkType }),
  };

  const handleChangeEnhanced = (value: string, name: keyof typeof changeCallbacks) => {
    if (isFormBlocked) setIsFormBlocked(false);
    changeCallbacks[name](value);
  };

  return (
    <form onSubmit={handleSubmitEnhanced} data-testid="salary-form">
      <Box sx={formContainerStyle}>
        <FormControlLabel
          label="Show advanced options"
          control={<Switch checked={isAdvanced} onChange={handleTogglerChange} />}
        />
        <TextField
          required
          id="salary-gross"
          label="Salary gross"
          type="number"
          defaultValue={values.gross}
          onChange={(e) => handleChangeEnhanced(e.target.value, 'salary-gross')}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: { min: 1000, step: '.01' },
          }}
        />
        <CustomSelect
          required
          id="tax-rate"
          value={values.tax}
          onChange={(e) => handleChangeEnhanced(e.target.value, 'tax-rate')}
          items={taxRateItems}
          label="Tax rate"
        />
        <Collapse in={isAdvanced} data-testid="collapse-field">
          <Box sx={formContainerStyle}>
            <CustomSelect
              id="my-multisport"
              value={values.myMultisport}
              onChange={(e) => handleChangeEnhanced(e.target.value, 'my-multisport')}
              items={multisportItems}
              label="My Multisport"
            />
            <CustomSelect
              id="parther-multisport"
              value={values.partnerMultisport}
              onChange={(e) => handleChangeEnhanced(e.target.value, 'parther-multisport')}
              items={multisportItems}
              label="Partner Multisport"
            />
            <CustomSelect
              id="luxmed"
              value={values.luxmed}
              onChange={(e) => handleChangeEnhanced(e.target.value, 'luxmed')}
              items={luxmedItems}
              label="Luxmed Medical Package"
            />
            <FormControl required>
              <FormLabel id="ppk-label">Do you use PPK?</FormLabel>
              <RadioGroup
                row
                id="ppk"
                aria-labelledby="ppk-label"
                name="ppk"
                value={values.ppk}
                onChange={(e) => handleChangeEnhanced(e.target.value, 'ppk')}
              >
                <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                <FormControlLabel value="NO" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Collapse>
        <Button type="submit" variant="outlined" disabled={isFormBlocked}>
          {isFormBlocked ? 'Change form to unblock' : 'Submit'}
        </Button>
      </Box>
    </form>
  );
};
