import { renderHook, act } from '@testing-library/react-hooks';
import useFormValidator from '../../src/hooks/useFormValidator';
import ValidationSchema from '../../src/ValidationSchema';
import {required} from "../../src";

const validationFunctions = { required };
const validationSchema = new ValidationSchema({
  name: [{ rule: 'required', message: 'Name is required' }],
  email: [{ rule: 'required', message: 'Email is required' }],
});


describe('useFormValidator', () => {
  it('should have the correct initial state', () => {
    // Test initial state
  });

  it('should handle field changes and trigger validation', () => {
    // Test handleChange function
  });

  it('should validate a single field and update errors', () => {
    // Test validateField function
  });

  it('should validate the entire form and update errors', () => {
    // Test validateForm function
  });

  it('should handle form submission and call onSubmit if validation is successful', () => {
    // Test handleSubmit function
  });

  it('should reset the form state and clear errors', () => {
    // Test resetForm function
  });
});
