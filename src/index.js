import React from 'react';
import ReactDOM from 'react-dom';
import { Global, ThemeProvider } from '@emotion/react';

// Styles and Theme
import { globalStyles } from './styles/global';
import { theme } from './styles/theme';

// Router
import { Router } from './routes/Router';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <Router />
  </ThemeProvider>,
  document.getElementById('root')
);
