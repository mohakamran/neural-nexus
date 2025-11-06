import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Use default import

test('renders neural nexus header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Neural Nexus/i);
  expect(headerElement).toBeInTheDocument();
});