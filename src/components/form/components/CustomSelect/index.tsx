import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

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
          <MenuItem value={item.value} key={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
