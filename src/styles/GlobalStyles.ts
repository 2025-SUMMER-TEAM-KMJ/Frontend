import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: ${theme.fonts.main};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
