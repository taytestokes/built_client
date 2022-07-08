import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useUserStore } from '../zustand/userStore';

export const RedirectToDashboardRoute = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const navigate = useNavigate();

  useEffect(() => {
    // Check for refresh token stored in HTTP cookie on the browser.
    // If refresh token exists, then refresh the access token, log the user in,
    // and redirect to dashboard.
    const refreshAccessToken = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/refresh', {
          withCredentials: true
        });

        updateUser({
          accessToken: response.data.access_token,
          id: response.data.user_id,
          email: response.data.user_email
        });

        navigate('/dashboard');
      } catch (error) {
        setIsLoading(false);
      }
    };

    !Object.prototype.hasOwnProperty.call(user, 'accessToken')
      ? refreshAccessToken()
      : setIsLoading(false);
  }, []);

  return isLoading ? null : <Outlet />;
};
