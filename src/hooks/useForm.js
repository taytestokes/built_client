import { useState } from 'react';

export const useForm = (initialState = {}, sumbitHandler = () => {}, validateFormData) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialState);

  const handleFormInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmission = (evt) => {
    evt.preventDefault();
    // Validates the form data if the callback is present
    // and if it's a function. This allows us to not be forced
    // to validating form fields if we don't want to
    if (
      validateFormData &&
      Object.prototype.toString.call(validateFormData) == '[object Function]'
    ) {
      setErrors(validateFormData(formData));
    }

    // We will only execute the submitHandler callback if
    // there aren't any errors present. This will help ensure
    // that we prevent sending bad data
    if (!Object.keys(errors).length) {
      sumbitHandler(formData);
    }
  };

  return {
    formData,
    errors,
    handleFormInputChange,
    handleFormSubmission
  };
};
