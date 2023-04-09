import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders the app name', () => {
  render(<Header />);
  const appNameLink = screen.getByText(/pupmatch/i);
  expect(appNameLink).toBeInTheDocument();
  expect(appNameLink).toHaveAttribute('href', '/');
});
