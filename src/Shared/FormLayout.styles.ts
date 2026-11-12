import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Panel, buttonStyle } from './ui';
export const FormPanel = styled(Panel)`
  max-width: 850px;
  padding: 30px;
  form {
    display: grid;
    gap: 24px;
  }
`;
export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;
export const FormFields = styled.fieldset`
  display: grid;
  gap: 24px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;
export const CancelLink = styled(Link)`
  ${buttonStyle};
  background: transparent;
  border-color: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  &:hover {
    background: ${({ theme }) => theme.subtle};
  }
`;
