import styled from 'styled-components';
export const TableScroll = styled.div`
  overflow-x: auto;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: start;
  font-size: 13px;
  th {
    text-align: start;
    background: ${({ theme }) => theme.subtle};
    padding: 15px 20px;
    font-weight: 600;
    white-space: nowrap;
    color: ${({ theme }) => theme.muted};
  }
  td {
    padding: 17px 20px;
    border-top: 1px solid ${({ theme }) => theme.border};
    vertical-align: middle;
  }
  tbody tr:hover {
    background: ${({ theme }) => theme.subtle};
  }
`;
export const Toolbar = styled.div`
  padding: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  input {
    max-width: 350px;
  }
  span {
    font-size: 13px;
    color: ${({ theme }) => theme.muted};
  }
`;
export const Tag = styled.span`
  font-size: 11px;
  display: inline-block;
  padding: 3px 9px;
  background: ${({ theme }) => theme.subtle};
  color: ${({ theme }) => theme.muted};
  border-radius: 16px;
  white-space: nowrap;
`;
export const RecordName = styled.div`
  max-width: 400px;
  display: grid;
  justify-items: start;
  gap: 6px;
  p {
    line-height: 1.7;
  }
`;
