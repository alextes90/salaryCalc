import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IndexPage from 'pages/index';
import { useAsync } from 'hooks/useAsync';

jest.mock('components/SEO/index', () => ({
  SEO: () => <div>SEO</div>,
}));
jest.mock('hooks/useAnimation', () => ({
  useAnimation: jest
    .fn()
    .mockImplementation(() => ({ animation: null, AnimationContainer: <div>Piggy</div> })),
}));
jest.mock('hooks/useAsync', () => ({
  useAsync: jest.fn(),
}));
jest.mock('utils/apiClient');
const mockUseAsync = jest.mocked(useAsync);

describe('IndexPage', () => {
  const useAsyncStatus = {
    run: jest.fn(),
    data: null,
    error: null,
    isPending: false,
    isSuccess: false,
    isError: false,
  };
  it('Should correct load main page', () => {
    mockUseAsync.mockReturnValue({ ...useAsyncStatus, data: { value: '3.20' }, isSuccess: true });
    render(<IndexPage />);
    const title = screen.getByText(/Submit form to calculate salary/i);
    expect(title).toBeInTheDocument();
    const usdFetchValue = screen.getByText(/3.20zł/i);
    expect(usdFetchValue).toBeInTheDocument();
  });
  it('Should correct load main page if USD is not loaded yet', () => {
    mockUseAsync.mockReturnValue({ ...useAsyncStatus, isPending: true });
    render(<IndexPage />);
    const usdFetchValue = screen.getByText(/Loading../i);
    expect(usdFetchValue).toBeInTheDocument();
  });
  it('Should correct load main page if USD return error', () => {
    mockUseAsync.mockReturnValue({ ...useAsyncStatus, isError: true });
    render(<IndexPage />);
    const usdFetchValue = screen.getByText(/No data to show/i);
    expect(usdFetchValue).toBeInTheDocument();
  });
});
