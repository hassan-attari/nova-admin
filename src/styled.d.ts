import 'styled-components';
import type { lightTheme } from './Shared/theme';
type AppTheme = typeof lightTheme;
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
