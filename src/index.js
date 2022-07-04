import React from 'react';
import ReactDOM from 'react-dom';
import { css, Global, ThemeProvider } from '@emotion/react';
import emotionReset from 'emotion-reset';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { RequireAuth } from './components/RequireAuth';

import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';

// TODO: Rethink reset css and fonts

const Home = () => <div>This is the home page</div>;
const Fallback = () => <div>This is the fallback page</div>;

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
    {/* Router - Can be moved later? */}
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* Fallback Routes */}
          <Route path="/*" element={<Fallback />} />
        </Routes>
      </div>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
