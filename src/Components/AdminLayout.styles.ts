import styled from 'styled-components';

export const Shell = styled.div`
  min-width: 1280px;
  min-height: 100vh;
  background: ${({ theme }) => theme.subtle};
`;
export const Sidebar = styled.aside`
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  width: 224px;
  padding: 30px 20px;
  background: #172b46;
  color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 5;
  > p {
    font-size: 12px;
    color: #b6c6dc;
    margin: 12px 0 36px;
  }
`;
export const Navigation = styled.nav`
  display: grid;
  gap: 10px;
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 9px;
    border-inline-start: 3px solid transparent;
    color: #d9e2ef;
    font-size: 14px;
  }
  a.active {
    background: #304967;
    color: #fff;
    border-inline-start-color: #f56922;
  }
  a:hover {
    background: #304967;
  }
`;
export const Content = styled.div`
  margin-inline-start: 224px;
`;
export const Header = styled.header`
  height: 90px;
  padding: 18px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  h2 {
    font-size: 15px;
  }
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.muted};
  }
`;
export const Main = styled.main`
  padding: 36px;
  max-width: 1500px;
  margin: auto;
`;
export const Skip = styled.a`
  position: fixed;
  inset-inline-start: 250px;
  top: -100px;
  padding: 10px;
  z-index: 30;
  background: ${({ theme }) => theme.surface};
  &:focus {
    top: 10px;
  }
`;

export const Account = styled.div`
  margin-top: auto;
  border-top: 1px solid #344b66;
  padding-top: 22px;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
  }
  button {
    margin-top: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 0;
    padding: 10px;
    border-radius: 7px;
    background: transparent;
    color: #d7e1ef;
    font-size: 13px;
  }
  button:hover {
    background: #304967;
  }
`;
