import React from 'react';
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
} from '@mui/material';
import { CustomSelect } from 'components/form/Select';
import { luxmedItems, multisportItems, taxRateItems } from 'appConstants';

type Props = {
  values: FormState;
  dispatch: React.Dispatch<Partial<FormState>>;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
};

export const Form = ({ values, dispatch, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <Box sx={formContainerStyle}>
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
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </Box>
    </form>
  );
};
