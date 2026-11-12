import styled from 'styled-components';

export const Page = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;
export const Intro = styled.div`
  background: #172b46;
  color: #fff;
  padding: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  h1 {
    font-size: 46px;
    margin: 50px 0 18px;
  }
  p {
    color: #bfcde0;
    max-width: 320px;
    font-size: 16px;
  }
  &::after {
    content: '';
    position: absolute;
    width: 210px;
    height: 210px;
    border-radius: 40px;
    background: #f56922;
    bottom: -100px;
    inset-inline-end: -50px;
    transform: rotate(25deg);
  }
  @media (max-width: 760px) {
    display: none;
  }
`;
export const FormSide = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  > div:first-child {
    align-self: flex-end;
  }
`;
export const Card = styled.div`
  width: 100%;
  max-width: 390px;
  margin: auto;
  padding: 50px 0;
  h2 {
    font-size: 28px;
    margin-top: 30px;
  }
  > p {
    font-size: 14px;
    margin: 8px 0 30px;
  }
  form {
    display: grid;
    gap: 20px;
  }
  a {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    margin-top: 5px;
  }
`;
export const Password = styled.div`
  position: relative;
  input {
    padding-inline-end: 54px;
  }
  button {
    position: absolute;
    right: 2px;
    top: 30px;
    border: 0;
    background: transparent;
  }
`;
