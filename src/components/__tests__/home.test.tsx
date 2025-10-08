import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Home from '@/pages/home';

describe('Home Page', () => {
  it('renders correctly', () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Bem-vindo/a 👋')).toBeInTheDocument();
  });
});