import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '../zustand/userStore';
import axios from 'axios';

export const PersistLoginRoute = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const navigate = useNavigate();

  // 1. Check for a current accessToken on the user in state
  // 2. Use the refreshToken in the cookies to create a new accessToken to store on the user
  // 3. If there isn't a refreshToken cookie in the browser, navigate to login page

  // NOTE: need to restore the entire user in state - how do we get that data?

  useEffect(() => {
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

        setIsLoading(false);
      } catch (error) {
        console.log({ error });
        setIsLoading(false);
        navigate('/login');
      }
    };

    !Object.prototype.hasOwnProperty.call(user, 'accessToken')
      ? refreshAccessToken()
      : setIsLoading(false);
  }, []);

  return isLoading ? <div>Loading...</div> : <Outlet />;
};
