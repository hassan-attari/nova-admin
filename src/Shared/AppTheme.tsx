import { useEffect, type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '../Redux/hooks';
import { ThemeMode } from '../types/Enums/ThemeMode';
import { darkTheme, lightTheme } from './theme';
import { GlobalStyle } from './GlobalStyle.styles';

export function AppTheme({ children }: { children: ReactNode }) {
  const { locale, theme } = useAppSelector((state) => state.preferences);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  }, [locale]);

  return (
    <ThemeProvider theme={theme === ThemeMode.Light ? lightTheme : darkTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
