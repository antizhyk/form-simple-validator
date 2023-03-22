import { useState, useCallback } from 'react';

const useFormValidator = (validationSchema, onSubmit, config = {}) => {
  const { showErrorsOnSubmit = false } = config;
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = useCallback(async (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (!showErrorsOnSubmit || submitAttempted) {
      const fieldErrors = await validationSchema.validateField(name, value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldErrors.length > 0 ? fieldErrors : undefined,
      }));
    }

    setIsValid(Object.values(errors).every((error) => !error));
  }, [validationSchema, errors, showErrorsOnSubmit, submitAttempted]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    setSubmitAttempted(true);

    const formErrors = await validationSchema.validate(values);

    setErrors(formErrors);
    setIsValid(Object.values(formErrors).every((error) => !error));

    if (isValid) {
      onSubmit(values);
    }
  }, [validationSchema, values, onSubmit, isValid]);

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleSubmit,
  };
};

export default useFormValidator;
