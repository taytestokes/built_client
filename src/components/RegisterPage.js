import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useUserStore } from '../zustand/userStore';

// TODO: Move POC into well architected structure

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  console.log({ user });

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();

    axios
      .post('http://localhost:4000/api/auth/register', {
        user: {
          email,
          password
        }
      })
      .then(({ data }) => {
        console.log(data);
        updateUser({
          id: data.user_id,
          email: data.user_email,
          accessToken: data.access_token
        });

        // NICE THIS WORKS - Now restructure it in a better arhcitecture
      });
  };

  const refresh = () => {
    axios
      .get('http://localhost:4000/api/auth/refresh', {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.accessToken}` }
      })
      .then(({ data }) => console.log(data));
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

        <FormLabelInputSpacer>
          <FormLabel htmlFor="password-confirmation">Confirm Password</FormLabel>
          <FormInput
            autoComplete="off"
            id="password-confirmation"
            type="password"
            onChange={(evt) => setPasswordConfirmation(evt.target.value)}
            value={passwordConfirmation}
          />
        </FormLabelInputSpacer>

        <FormButton type="submit" value="Register" />

        <FormLink href="#">Already have an account?</FormLink>
      </Form>

      <button onClick={refresh}>Refresh</button>
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

const FormLink = styled.a`
  text-decoration: none;
  color: #2563eb;
  font-size: 14px;
  font-weight: bold;
`;
