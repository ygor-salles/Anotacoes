import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }
  body {
    font-size: 100%;
  }

  button {
    border: none;
    cursor: pointer;
  }
`;
