import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { useUserStore } from '../zustand/userStore';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const updateUser = useUserStore((state) => state.updateUser);

  const navigate = useNavigate();

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();

    axios
      .post(
        'http://localhost:4000/api/auth/login',
        {
          user: {
            email,
            password
          }
        },
        // Must apply withCredentials to allow response cookies
        // to be set to the browser - this will contain the refresh token generate
        // upon logging in
        {
          withCredentials: true
        }
      )
      .then(({ data }) => {
        // Update user state slice
        updateUser({
          id: data.user_id,
          email: data.user_email,
          accessToken: data.access_token
        });
        navigate('/dashboard');
      });
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <FormLabelInputSpacer>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            autoComplete="off"
            id="email"
            type="text"
            onChange={(evt) => setEmail(evt.target.value)}
            value={email}
          />
        </FormLabelInputSpacer>

        <FormLabelInputSpacer>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            autoComplete="off"
            id="password"
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
            value={password}
          />
        </FormLabelInputSpacer>

        <FormButton type="submit" value="Sign In" />

        <FormLink to="/register">Don't have an account?</FormLink>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const FormLabelInputSpacer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #a1a1aa;
  padding: 0px 16px;
  font-size: 16px;
  transition: outline 200ms;

  &:focus {
    border: 1px solid #2563eb;
    outline: 2px solid #3b82f6;
  }
`;

const FormLabel = styled.label`
  width: 100%;
  color: #52525b;
  font-size: 14px;
`;

const FormButton = styled.input`
  width: 100%;
  color: #ffffff;
  background-color: #18181b;
  border: 1px solid #18181b;
  border-radius: 4px;
  font-weight: bold;
  height: 40px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 200ms;

  &:hover {
    background-color: #27272a;
    border-color: #27272a;
  }
`;

const FormLink = styled(Link)`
  text-decoration: none;
  color: #2563eb;
  font-size: 14px;
  font-weight: bold;
`;
