import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: ${({ theme }) => theme.background}; color: ${({ theme }) => theme.text}; font-family: 'Vazirmatn', sans-serif; font-size: 15px; line-height: 1.8; }
  button, input, select, textarea { font: inherit; }
  button, a, input, select, textarea { -webkit-tap-highlight-color: transparent; }
  button { cursor: pointer; }
  button:disabled { cursor: not-allowed; opacity: .5; }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; }
  h1, h2, h3, p { margin: 0; }
  h1 { font-size: clamp(26px, 3vw, 38px); line-height: 1.55; }
  h2 { font-size: 23px; line-height: 1.5; }
  h3 { font-size: 17px; }
  :focus-visible { outline: 3px solid ${({ theme }) => theme.accent}; outline-offset: 3px; }
  ::selection { background: #ffdbbf; color: #172b46; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
`;
