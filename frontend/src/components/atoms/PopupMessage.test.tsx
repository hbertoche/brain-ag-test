import React from 'react';
import { render, screen } from '@testing-library/react';
import { PopupMessage } from './PopupMessage';

describe('PopupMessage', () => {
  it('renders success message', () => {
    render(<PopupMessage type="success" message="Success!" />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('success');
  });

  it('renders error message', () => {
    render(<PopupMessage type="error" message="Error!" />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('error');
  });
});
