import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../zustand/userStore';

export const RequireAuthRoute = () => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  // Checks for the accessToken on the user to determine if logged in or not
  const isSignedIn = Object.prototype.hasOwnProperty.call(user, 'accessToken');

  // If a user is signed in, act as an outlet to render
  // the routes that this component wraps
  if (isSignedIn) {
    return <Outlet />;
  }

  // If user is not signed in, redirect to login page when
  // they try to access the protected routed. It will also redirect
  // them to the page they were trying to access after logging in
  return <Navigate to="/login" state={{ from: location }} replace={true} />;
};
