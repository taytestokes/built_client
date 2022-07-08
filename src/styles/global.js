import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');

  ${emotionReset}

  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }

  html {
    font-family: Roboto, sans-serif;
  }
`;
