import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer component', () => {
  it('should render the Pupmatch footer', () => {
    render(<Footer />);
    const footerText = screen.getByText(/Pupmatch - Connecting dogs and their humans./i);
    expect(footerText).toBeInTheDocument();
  });

  it('should render the current year in the footer', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const yearText = screen.getByText(new RegExp(currentYear));
    expect(yearText).toBeInTheDocument();
  });

  it('should render a link to the Pupmatch website', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link', { name: /www.pupmatch.net/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://mui.com/');
  });
});
