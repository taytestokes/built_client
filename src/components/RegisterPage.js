import React, { useState } from 'react';
import styled from '@emotion/styled';
import validator from 'validator';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useUserStore } from '../zustand/userStore';

export const RegisterPage = () => {
  // TODO: Handle errors that occur due to restrictions in database
  // TODO: Better UI/UX for displaying validation errrors on form
  const [submissionError, setSubmissionError] = useState('');
  const updateUser = useUserStore((state) => state.updateUser);
  const navigate = useNavigate();

  const { formData, errors, handleFormInputChange, handleFormSubmission } = useForm(
    {
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    async (formData) => {
      try {
        const response = await axios.post('http://localhost:4000/api/auth/register', {
          user: formData
        });
        updateUser({
          id: response.data.user_id,
          email: response.data.user_email,
          accessToken: response.data.access_token
        });
        navigate('/dashboard');
      } catch (error) {
        // DO SOMETHING WITH THE NETWORK REQUEST ERRORS
      }
    },
    (formData) => {
      const formErrors = {};

      if (!validator.isEmail(formData.email)) {
        formErrors.email = 'Invalid email address.';
      }
      if (validator.isEmpty(formData.email)) {
        formErrors.email = 'Email address is required';
      }
      if (formData.password !== formData.passwordConfirmation) {
        formErrors.password = 'Must match confirmation.';
        formErrors.passwordConfirmation = 'Must match password.';
      }
      if (!validator.isLength(formData.password, { min: 8 })) {
        formErrors.password = 'Password must be atleast 8 characters.';
      }
      if (validator.isEmpty(formData.password)) {
        formErrors.password = 'Password is required.';
      }
      if (validator.isEmpty(formData.passwordConfirmation)) {
        formErrors.passwordConfirmation = 'Password confirmation is required.';
      }

      return formErrors;
    }
  );

  return (
    <Container>
      <Form onSubmit={handleFormSubmission}>
        <FormLabelInputSpacer>
          <FormLabel htmlFor="email">
            <LabelMessage>Email</LabelMessage>
            {errors.email && <LabelError>{errors.email}</LabelError>}
          </FormLabel>
          <FormInput
            autoComplete="off"
            id="email"
            name="email"
            type="text"
            onChange={handleFormInputChange}
            value={formData.email}
            error={errors.email}
          />
        </FormLabelInputSpacer>

        <FormLabelInputSpacer>
          <FormLabel htmlFor="password">
            <LabelMessage>Password</LabelMessage>
            {errors.password && <LabelError>{errors.password}</LabelError>}
          </FormLabel>
          <FormInput
            autoComplete="off"
            id="password"
            name="password"
            type="password"
            onChange={handleFormInputChange}
            value={formData.password}
            error={errors.password}
          />
        </FormLabelInputSpacer>

        <FormLabelInputSpacer>
          <FormLabel htmlFor="passwordConfirmation">
            <LabelMessage>Confirm Password</LabelMessage>
            {errors.passwordConfirmation && <LabelError>{errors.passwordConfirmation}</LabelError>}
          </FormLabel>
          <FormInput
            autoComplete="off"
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            onChange={handleFormInputChange}
            value={formData.passwordConfirmation}
            error={errors.passwordConfirmation}
          />
        </FormLabelInputSpacer>

        <FormButton type="submit">Register</FormButton>

        <FormLink to="/login">Already have an account?</FormLink>
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
  ${({ error }) => {
    return `
      width: 100%;
      height: 40px;
      border-radius: 4px;
      border: 1px solid ${error ? '#dc2626' : '#a1a1aa'};
      background-color: ${error ? '#fef2f2' : '#ffffff'};
      padding: 0px 16px;
      font-size: 16px;
      transition: outline 200ms;

      &:focus {
        border: 1px solid #2563eb;
        outline: 2px solid #3b82f6;
      }
  `;
  }}
`;

const FormLabel = styled.label`
  width: 100%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LabelMessage = styled.span`
  ${({ error }) => `
  color: ${error ? '#dc2626' : '#52525b'}
    ;
  `}
`;

const LabelError = styled.span`
  color: #dc2626;
`;

const FormButton = styled.button`
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
  display: flex;
  align-items: center;
  justify-content: center;

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
