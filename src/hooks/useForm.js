import { useState, useEffect, useRef } from 'react';
import { isFunction } from '../utils/isFunction';

// Checks all properties on the form errors object
// for an error message and determines if an error
// is present. It returns a boolean indiciating if there
// is an error or not.
const hasFormErrors = (formErrors) => {
  const formFields = Object.keys(formErrors);

  return formFields.reduce((accum, field) => {
    if (formErrors[field].length) {
      accum = true;
    }
    return accum;
  }, false);
};

// TODO: Revisit logic to update UI field validation
export const useForm = (initialState = {}, sumbitHandler = () => {}, validateFormData) => {
  let initialRender = useRef(true);

  const [formErrors, setFormErrors] = useState(initialState);
  const [formData, setFormData] = useState(initialState);

  const handleFormInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleFormSubmission = (evt) => {
    evt.preventDefault();
    if (validateFormData && isFunction(validateFormData)) {
      setFormErrors(validateFormData(formData));
    }
    if (!hasFormErrors(formErrors)) {
      sumbitHandler(formData);
    }
  };

  // This effect will be called after changing the value of an
  // input field and will update the errors for that specific input.
  // This helps keep the error messaging in the UI in sync with the current
  // value of the input so we display the correct error message upon input change.
  useEffect(() => {
    if (!initialRender.current) {
      if (validateFormData && isFunction(validateFormData)) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ...validateFormData(formData) }));
      }
    }
  }, [formData]);

  // Allows the hook to know if it's the initial render or not.
  // This will be used to update the error messages when an input value changes
  // to allow us to set the proper error messaging without setting the error messages
  // on initial render.
  useEffect(() => {
    initialRender.current = false;
  }, []);

  return {
    formData,
    formErrors,
    handleFormInputChange,
    handleFormSubmission
  };
};
