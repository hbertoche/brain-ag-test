import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders with label and value', () => {
    render(<Input label="Test Label" value="test" onChange={() => {}} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<Input label="Test Label" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Test Label'), { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledWith('abc');
  });

  it('shows error message if error prop is set', () => {
    render(<Input label="Test Label" value="" onChange={() => {}} error="Error!" />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });
});
