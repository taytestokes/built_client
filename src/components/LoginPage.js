import React from 'react';
import styled from '@emotion/styled';

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

export const LoginPage = () => {
  return (
    <Container>
      <Form onSubmit={(evt) => evt.preventDefault()}>
        <FormLabelInputSpacer>
          <FormLabel for="username">Username</FormLabel>
          <FormInput id="username" type="text" />
        </FormLabelInputSpacer>

        <FormLabelInputSpacer>
          <FormLabel for="password">Password</FormLabel>
          <FormInput id="password" type="password" />
        </FormLabelInputSpacer>

        <FormButton type="submit" />

        <FormLink href="#">Don't have an account?</FormLink>
      </Form>
    </Container>
  );
};
