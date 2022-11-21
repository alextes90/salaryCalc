import React, { useEffect } from 'react';
import { Salary } from 'types';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';
import { SalaryChartColors, SALARY_CHART_CUSTOM_STYLE } from 'appConstants';
import { useCssAnimation } from 'hooks/useCssAnimation';
import './chartAnimation.css';

type Props = {
  salary?: Salary;
};

type RenderLabelProps = {
  cx: number;
  cy: number;
  color: string;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  payload: { value: number };
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: RenderLabelProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, payload, percent, color } = props;
  const radius = innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.1;
  const x2 = cx + radius * Math.cos(-midAngle * RADIAN) * 0.45;
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.1;
  const y2 = cy + radius * Math.sin(-midAngle * RADIAN) * 0.6;

  return (
    <>
      <text
        x={x}
        y={y}
        fill={color}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {payload.value}zl
      </text>
      <text
        x={x2}
        y={y2}
        fill="#ffffff"
        fontSize="14px"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </>
  );
};

export const SalaryChart = ({ salary }: Props) => {
  const data = [
    { name: 'Health insurance', value: salary?.healthInsurance, color: SalaryChartColors.hi },
    { name: 'ZUS', value: salary?.zus, color: SalaryChartColors.zus },
    { name: 'Net Salary', value: salary?.net, color: SalaryChartColors.net },
    { name: 'TAX', value: salary?.taxation, color: SalaryChartColors.tax },
    { name: 'PPK', value: salary?.ppkContribution, color: SalaryChartColors.ppk },
  ].filter((e) => e.value && e.value !== 0);

  const { runAnimation: runChartAnimation } = useCssAnimation('chart-animate', 'chart');

  useEffect(() => {
    runChartAnimation();
  }, [salary?.net, runChartAnimation]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={600} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          labelLine={false}
          fill="#8884d8"
          outerRadius="60%"
          dataKey="value"
          style={SALARY_CHART_CUSTOM_STYLE}
          className="chart"
        >
          {data.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend wrapperStyle={SALARY_CHART_CUSTOM_STYLE} />
      </PieChart>
    </ResponsiveContainer>
  );
};
