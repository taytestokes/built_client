import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../zustand/userStore';

export const RequireAuth = () => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  // A user will be signed in if the user object
  // is not empty and has key value pairs
  const isSignedIn = Object.keys(user).length > 0;

  // If a user is signed in, act as an outlet to render
  // the routes that this component wraps
  if (isSignedIn) {
    return <Outlet />;
  }

  // If user is not signed in, redirect to login page when
  // they try to access the protected routed. It will also redirect
  // them to the page they were trying to access after logging in
  return <Navigate to="/register" state={{ from: location }} replace={true} />;
};
