import {useState, useCallback} from 'react';

/**
 * useFormValidator is a custom React hook that simplifies form handling and validation.
 *
 * @param {Object} initialValues - An object containing the initial form field values.
 * @param {ValidationSchema} validationSchema - A ValidationSchema instance defining the validation rules for the form.
 * @param {Function} onSubmit - A callback function that will be called when the form is submitted successfully.
 * @returns {Object} - An object containing the form state, handling functions, and validation functions.
 */
const useFormValidator = (initialValues, validationSchema, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * resetForm resets the form state to its initial values and clears the errors state.
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  /**
   * validateField validates a single form field and updates the errors state.
   *
   * @param {string} name - The name of the form field.
   * @param {any} value - The current value of the form field.
   */
  const validateField = useCallback(async (name, value) => {
    const fieldErrors = await validationSchema.validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors,
    }));
  }, [validationSchema])

  /**
   * handleChange updates the form field values and triggers field validation.
   *
   * @param {string} name - The name of the form field.
   * @param {any} value - The current value of the form field.
   */
  const handleChange = useCallback(async (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

   await validateField(name, value);
  }, [validateField]);

  /**
   * handleSubmit handles form submission, validates the form, and calls the onSubmit callback if validation is successful.
   *
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    await validateForm();

    // If validation is successful, call onSubmit callback with form data
    if (Object.keys(errors).length === 0) {
      onSubmit(values);
    }

    setIsSubmitting(false);
  }, [values, onSubmit, validateForm, errors]);


  /**
   * validateForm validates the entire form and updates the errors state.
   */
  const validateForm = useCallback(async () => {
    const formErrors = await validationSchema.validate(values);
    setErrors(formErrors);
  }, [validationSchema, values]);


  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validateField,
    validateForm,
    resetForm,
    // Other functions like reset, custom validation, etc.
  };
};

export default useFormValidator;
