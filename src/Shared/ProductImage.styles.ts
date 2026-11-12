import styled from 'styled-components';

export const Frame = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #627086;
`;

export const Image = styled.img<{ $loaded: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
`;
