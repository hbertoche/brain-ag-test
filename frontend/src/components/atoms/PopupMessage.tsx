import React from 'react';
import styled from 'styled-components';

export type PopupType = 'success' | 'error';

const PopupContainer = styled.div<{ type: PopupType }>`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  background: ${({ type }) => (type === 'success' ? '#28a745' : '#dc3545')};
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`;

interface PopupMessageProps {
  type: PopupType;
  message: string;
}

export const PopupMessage: React.FC<PopupMessageProps> = ({ type, message }) => (
  <PopupContainer type={type}>
    {message}
  </PopupContainer>
);
