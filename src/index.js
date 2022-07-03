import React from 'react';
import ReactDOM from 'react-dom';
import { css, Global, ThemeProvider } from '@emotion/react';
import emotionReset from 'emotion-reset';

import { LoginPage } from './components/LoginPage';

// TODO: Rethink reset css and fonts

ReactDOM.render(
  <ThemeProvider theme={{}}>
    <Global
      styles={css`
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
      `}
    />
    <LoginPage />
  </ThemeProvider>,
  document.getElementById('root')
);
