import React from 'react';
import styled from '@emotion/styled';
import validator from 'validator';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useUserStore } from '../zustand/userStore';

const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Invalid email address.',
  EMAIL_REQUIRED: 'Email address is required',
  PASSWORD_REQUIRED: 'Password is required.',
  INVALID_PASSWORD_LENGTH: 'Password must be atleast 8 characters.',
  PASSWORD_CONFIRMATION_REQUIRED: 'Password confirmation is required.',
  PASSWORD_MUST_MATCH: 'Must match confirmation.',
  PASSWORD_CONFIRMATION_MUST_MATCH: 'Must match password.'
};

export const RegisterPage = () => {
  // TODO: Handle formErrors that occur due to restrictions in database
  // TODO: Better UI/UX for displaying validation errors when modifying
  // a single input.
  const updateUser = useUserStore((state) => state.updateUser);
  const navigate = useNavigate();

  const { formData, formErrors, handleFormInputChange, handleFormSubmission } = useForm(
    {
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    async (formData) => {
      try {
        const response = await axios.post(
          'http://localhost:4000/api/auth/register',
          {
            user: {
              email: formData.email,
              password: formData.password
            }
          },
          {
            withCredentials: true
          }
        );
        updateUser({
          id: response.data.user_id,
          email: response.data.user_email,
          accessToken: response.data.access_token
        });
        navigate('/dashboard');
      } catch (error) {
        // DO SOMETHING WITH THE NETWORK REQUEST formErrors
      }
    },
    // TODO: Revist this to not be so WET?
    (formData) => {
      const formErrors = { ...formData };
      // Email
      if (!validator.isEmail(formData.email)) {
        formErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
      }
      if (validator.isEmpty(formData.email)) {
        formErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
      }
      if (validator.isEmail(formData.email) && !validator.isEmpty(formData.email)) {
        formErrors.email = '';
      }

      // Password and Password Confirmation
      if (formData.password !== formData.passwordConfirmation) {
        formErrors.password = ERROR_MESSAGES.PASSWORD_MUST_MATCH;
        formErrors.passwordConfirmation = ERROR_MESSAGES.PASSWORD_CONFIRMATION_MUST_MATCH;
      }

      // Password
      if (!validator.isLength(formData.password, { min: 8 })) {
        formErrors.password = ERROR_MESSAGES.INVALID_PASSWORD_LENGTH;
      }
      if (validator.isEmpty(formData.password)) {
        formErrors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
      }

      // Password Confirmation
      if (validator.isEmpty(formData.passwordConfirmation)) {
        formErrors.passwordConfirmation = ERROR_MESSAGES.PASSWORD_CONFIRMATION_REQUIRED;
      }

      if (
        formData.password === formData.passwordConfirmation &&
        !validator.isEmpty(formData.password) &&
        !validator.isEmpty(formData.passwordConfirmation)
      ) {
        formErrors.password = '';
        formErrors.passwordConfirmation = '';
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
            {formErrors.email && <LabelError>{formErrors.email}</LabelError>}
          </FormLabel>
          <FormInput
            autoFocus={true}
            autoComplete="off"
            id="email"
            name="email"
            type="text"
            onChange={handleFormInputChange}
            value={formData.email}
            error={formErrors.email}
          />
        </FormLabelInputSpacer>

        <FormLabelInputSpacer>
          <FormLabel htmlFor="password">
            <LabelMessage>Password</LabelMessage>
            {formErrors.password && <LabelError>{formErrors.password}</LabelError>}
          </FormLabel>
          <FormInput
            autoComplete="off"
            id="password"
            name="password"
            type="password"
            onChange={handleFormInputChange}
            value={formData.password}
            error={formErrors.password}
          />
        </FormLabelInputSpacer>

        <FormLabelInputSpacer>
          <FormLabel htmlFor="passwordConfirmation">
            <LabelMessage>Confirm Password</LabelMessage>
            {formErrors.passwordConfirmation && (
              <LabelError>{formErrors.passwordConfirmation}</LabelError>
            )}
          </FormLabel>
          <FormInput
            autoComplete="off"
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            onChange={handleFormInputChange}
            value={formData.passwordConfirmation}
            error={formErrors.passwordConfirmation}
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
