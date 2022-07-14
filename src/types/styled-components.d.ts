import 'styled-components';
import { theme } from '../constants/constants';

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
