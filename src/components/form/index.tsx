import React, { useState, useEffect } from 'react';
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
  dispatch: React.Dispatch<Partial<FormState>>;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  isFormBlocked: boolean;
};

export const Form = ({ values, dispatch, onSubmit, isFormBlocked }: Props) => {
  const theme = useTheme();
  const mqMatches = useMediaQuery(theme.breakpoints.down('sm'));
  const [isAdvanced, setIsAdvanced] = useState(true);

  useEffect(() => {
    setIsAdvanced(!mqMatches);
  }, [mqMatches]);

  const handleChange = () => {
    setIsAdvanced((prev) => !prev);
  };

  return (
    <form onSubmit={onSubmit} data-testid="salary-form">
      <Box sx={formContainerStyle}>
        <FormControlLabel
          label="Show advanced options"
          control={<Switch checked={isAdvanced} onChange={handleChange} />}
        />
        <TextField
          required
          id="salary-gross"
          label="Salary gross"
          type="number"
          defaultValue={values.gross}
          onChange={(e) => dispatch({ gross: e.target.value })}
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
          onChange={(e) => dispatch({ tax: e.target.value })}
          items={taxRateItems}
          label="Tax rate"
        />
        <Collapse in={isAdvanced} data-testid="collapse-field">
          <Box sx={formContainerStyle}>
            <CustomSelect
              id="my-multisport"
              value={values.myMultisport}
              onChange={(e) => dispatch({ myMultisport: e.target.value as MultiSportType })}
              items={multisportItems}
              label="My Multisport"
            />
            <CustomSelect
              id="parent-multisport"
              value={values.partnerMultisport}
              onChange={(e) => dispatch({ partnerMultisport: e.target.value as MultiSportType })}
              items={multisportItems}
              label="Partner Multisport"
            />
            <CustomSelect
              id="luxmed"
              value={values.luxmed}
              onChange={(e) => dispatch({ luxmed: e.target.value as LuxmedType })}
              items={luxmedItems}
              label="Luxmed Medical Package"
            />
            <FormControl required>
              <FormLabel id="ppk-label">Do you use PPK?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="ppk-label"
                name="ppk"
                value={values.ppk}
                onChange={(e) => dispatch({ ppk: e.target.value as PpkType })}
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
