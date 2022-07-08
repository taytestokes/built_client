import React from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from '../zustand/userStore';

export const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const navigate = useNavigate();

  const signOut = async () => {
    // Hit API to clear the cookie storing the refresh token
    await axios.delete('http://localhost:4000/api/auth/signout', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    });
    // Clear data form the user store in zustand state
    updateUser({});
    // redirect to login page
    navigate('/login');
  };

  return (
    <NavbarContainer>
      <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  widht: 100%;
  height: 50px;
  background-color: #18181b;
`;

const SignOutButton = styled.button``;
