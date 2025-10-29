import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app component', () => {
    render(<App />);
    expect(screen.getByRole('img', { name: /vite logo/i })).toBeInTheDocument();
  });

  it('displays Vite and React heading', () => {
    render(<App />);
    const heading = screen.getByText(/Vite \+ React/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the count button', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is/i });
    expect(button).toBeInTheDocument();
  });
});
