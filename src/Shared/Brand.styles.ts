import styled from 'styled-components';

export const Wordmark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  direction: ltr;
  font-size: 29px;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1;

  svg {
    width: 25px;
    height: 25px;
    flex-shrink: 0;
    color: #f56922;
    fill: none;
    stroke: #f56922;
    stroke-width: 2;
  }
`;