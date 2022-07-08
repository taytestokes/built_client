import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RequireAuthRoute } from './RequireAuthRoute';
import { PersistLoginRoute } from './PersistLoginRoute';
import { RedirectToDashboardRoute } from './RedirectToDashboardRoute';

import { RegisterPage } from '../components/RegisterPage';
import { LoginPage } from '../components/LoginPage';
import { DashboardPage } from '../components/DashboardPage';

const Home = () => <div>This is the home page</div>;
const Fallback = () => <div>This is the fallback page</div>;

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Prevent Authed Users */}
        <Route element={<RedirectToDashboardRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PersistLoginRoute />}>
          <Route element={<RequireAuthRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        {/* Fallback Routes */}
        <Route path="/*" element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
};
