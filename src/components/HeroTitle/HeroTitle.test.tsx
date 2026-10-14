import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroTitle from './index';

describe('<HeroTitle />', () => {
  test('shows the plain h1 and no canvas when WebGL is unavailable', () => {
    const { container } = render(<HeroTitle />);

    const heading = screen.getByRole('heading', { level: 1, name: 'The WordAnalyzer' });
    expect(heading).toBeVisible();
    expect(heading.style.opacity).toBe('');
    expect(container.querySelector('canvas')).toBeNull();
  });
});
