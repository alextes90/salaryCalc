import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Salary } from 'types';
import { Results } from '..';

const MockedPiggy = <div>here is piggy</div>;
const salary: Salary = {
  net: 200,
  zus: 100,
  healthInsurance: 100,
  taxation: 100,
  ppkContribution: 20,
};

jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: React.PropsWithChildren) => (
      <div style={{ width: '800px', height: '800px' }}>{children}</div>
    ),
  };
});

describe('Results.tsx', () => {
  it('Results should render salary chart', () => {
    render(<Results salary={salary} PiggyAnim={MockedPiggy} />);
    const piggy = screen.queryByText('here is piggy');
    const hiText = screen.getByText('Health insurance');
    expect(piggy).toBeFalsy();
    expect(hiText).toBeInTheDocument();
  });
  it('Results should render piggy animation', () => {
    render(<Results PiggyAnim={MockedPiggy} />);
    const piggy = screen.queryByText('here is piggy');
    expect(piggy).toBeInTheDocument();
  });
});
