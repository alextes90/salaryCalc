import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { InfoTooltip } from '../InfoTooltip';
import { TAX_THRESHOLD_UNDER_26 } from 'appConstants';

export type CustomSelectProps = {
  onChange(e: SelectChangeEvent<string>): void;
  items: { name: string; value: string }[];
  value: string;
  label: string;
  id: string;
  required?: boolean;
};

export const CustomSelect = (props: CustomSelectProps) => {
  return (
    <FormControl required={props.required}>
      <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.id}-label`}
        id={props.id}
        value={props.value}
        label={props.label}
        name={props.id}
        onChange={props.onChange}
      >
        {props.items.map((item) => (
          <MenuItem value={item.value} key={item.value} style={{ display: 'flex' }}>
            {item.name}{' '}
            {item.name === '0%' && (
              <InfoTooltip
                title={`up to ${TAX_THRESHOLD_UNDER_26}zl theshold for employees under 26 `}
              />
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
