import styled from 'styled-components';

export const Wrap = styled.div`
  display: grid;
  align-content: start;
  gap: 6px;
  label {
    font-weight: 600;
    font-size: 13px;
  }
`;
export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  resize: vertical;
  min-height: 130px;
  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.danger};
  }
`;
