import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const buttonStyle = css`
  min-height: 44px;
  padding: 9px 20px;
  border: 1px solid transparent;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  line-height: 1.5;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  transition: background 0.15s;
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primaryHover};
  }
`;
export const Button = styled.button`
  ${buttonStyle}
`;
export const ButtonLink = styled(Link)`
  ${buttonStyle}
`;
export const SecondaryButton = styled(Button)`
  border-color: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.subtle};
  }
`;
export const IconButton = styled(SecondaryButton)`
  padding: 9px;
  min-width: 44px;
  flex-shrink: 0;
`;
export const Input = styled.input`
  width: 100%;
  min-height: 46px;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  &::placeholder {
    color: ${({ theme }) => theme.muted};
  }
  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.danger};
  }
`;
export const Select = styled.select`
  min-height: 46px;
  max-width: 100%;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.danger};
  }
`;
export const Muted = styled.p`
  color: ${({ theme }) => theme.muted};
`;
export const Panel = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
`;
export const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;
export const StateBox = styled.div`
  padding: 56px 24px;
  text-align: center;
  display: grid;
  justify-items: center;
  gap: 14px;
  color: ${({ theme }) => theme.muted};
`;
export const ErrorText = styled.p`
  color: ${({ theme }) => theme.danger};
  font-size: 13px;
`;
export const Notice = styled.div`
  padding: 12px 16px;
  border-inline-start: 3px solid ${({ theme }) => theme.success};
  background: ${({ theme }) => theme.subtle};
  border-radius: 6px;
  margin-bottom: 20px;
`;
