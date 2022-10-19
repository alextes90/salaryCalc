import React from 'react';
import { Salary } from 'types';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';
import { SalaryChartColors, SALARY_CHART_CUSTOM_STYLE } from 'appConstants';

type Props = {
  salary?: Salary;
};

export const SalaryChart = ({ salary }: Props) => {
  const data = [
    { name: 'Health insurance', value: salary?.healthInsurance, color: SalaryChartColors.hi },
    { name: 'ZUS', value: salary?.zus, color: SalaryChartColors.zus },
    { name: 'Net Salary', value: salary?.net, color: SalaryChartColors.net },
    { name: 'TAX', value: salary?.taxation, color: SalaryChartColors.tax },
    { name: 'PPK', value: salary?.ppkContribution, color: SalaryChartColors.ppk },
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
          style={SALARY_CHART_CUSTOM_STYLE}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend wrapperStyle={SALARY_CHART_CUSTOM_STYLE} />
      </PieChart>
    </ResponsiveContainer>
  );
};
