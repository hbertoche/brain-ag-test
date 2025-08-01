import React from 'react';
import styled from 'styled-components';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'password';
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #333;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  padding: 12px;
  border: 1px solid ${props => props.$hasError ? '#dc3545' : '#ddd'};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#dc3545' : '#007bff'};
    box-shadow: 0 0 0 2px ${props => props.$hasError ? 'rgba(220, 53, 69, 0.25)' : 'rgba(0, 123, 255, 0.25)'};
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

import { useId } from 'react';

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  required = false,
  disabled = false,
}) => {
  const id = useId();
  return (
    <InputContainer>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span style={{ color: '#dc3545' }}> *</span>}
        </Label>
      )}
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        $hasError={!!error}
        required={required}
        disabled={disabled}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};