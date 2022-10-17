import React from 'react';
import { Salary } from 'types';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';

type Props = {
  salary?: Salary;
};

const COLORS = ['#CB3F43', '#00C49F', '#FFBB28', '#0088FE', '#FF8042'];
const CUSTOM_STYLE = { fontFamily: 'Roboto, sans-serif' };

export const SalaryChart = ({ salary }: Props) => {
  const data = [
    { name: 'Health insurance', value: salary?.healthInsurance },
    { name: 'ZUS', value: salary?.zus },
    { name: 'TAX', value: salary?.taxation },
    { name: 'Net Salary', value: salary?.net },
    { name: 'PPK', value: salary?.ppkContribution },
  ].filter((e) => e.value && e.value !== 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={600} height={600}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label
          fill="#8884d8"
          dataKey="value"
          style={CUSTOM_STYLE}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend wrapperStyle={CUSTOM_STYLE} />
      </PieChart>
    </ResponsiveContainer>
  );
};
