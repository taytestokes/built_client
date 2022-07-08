import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '../zustand/userStore';
import styled from '@emotion/styled';
import axios from 'axios';

import { LoadingSpinner } from './LoadingSpinner';

export const PersistLoginRoute = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const navigate = useNavigate();

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

  return isLoading ? (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  ) : (
    <Outlet />
  );
};

const LoadingContainer = styled.div`
  background: white;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
