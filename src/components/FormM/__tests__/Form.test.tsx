import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form } from '../index';
import { FormState } from 'types';
import mediaQuery from 'css-mediaquery';

describe('Form.tsx', () => {
  const dispatch = jest.fn();
  const submit = jest.fn();
  const values: FormState = {
    gross: '1000',
    luxmed: 'FAMILY',
    myMultisport: 'CLASSIC',
    partnerMultisport: 'CLASSIC',
    ppk: 'NO',
    tax: '12',
  };

  const mockMatchMedia = (width: number) =>
    jest.fn().mockImplementation((query) => ({
      matches: mediaQuery.match(query, {
        width,
      }),
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

  describe('form function', () => {
    it('Should render form', () => {
      render(<Form values={values} dispatch={dispatch} onSubmit={submit} />);
      const form = screen.getByTestId('salary-form');
      expect(form).toBeInTheDocument();
    });
    it('should submit form', () => {
      submit.mockImplementation((e) => e.preventDefault());
      render(<Form values={values} dispatch={dispatch} onSubmit={submit} />);
      const sbmBtn = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(sbmBtn);
      expect(submit).toHaveBeenCalled();
    });
    it('should dispatch new form state', () => {
      render(<Form values={values} dispatch={dispatch} onSubmit={submit} />);
      const ppkBtn = screen.getByRole('radio', { name: 'Yes' });
      fireEvent.click(ppkBtn);
      expect(dispatch).toHaveBeenCalledWith({ ppk: 'YES' });
    });
  });

  describe('form responsivnes', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('Should displayed full form on big screen', () => {
      window.matchMedia = mockMatchMedia(2000);
      render(<Form values={values} dispatch={dispatch} onSubmit={submit} />);
      const collapseComponent = screen.getByTestId('collapse-field');
      expect(collapseComponent).toHaveStyle({ height: 'auto' });
    });
    it('Should display collapsed form on small screen', async () => {
      window.matchMedia = mockMatchMedia(200);
      render(<Form values={values} dispatch={dispatch} onSubmit={submit} />);
      const collapseComponent = screen.getByTestId('collapse-field');
      expect(collapseComponent).toHaveStyle({ height: '0px' });
    });
  });
});
