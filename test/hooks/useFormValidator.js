// import {renderHook, act} from '@testing-library/react-hooks';
// import useFormValidator from '../../src/hooks/useFormValidator';
// import {ValidationSchema, required, minLength, maxValue} from '../../src';
//
// const validationFunctions = {
//   required,
//   minLength,
//   maxValue,
// };
//
// const validationSchema = new ValidationSchema(
//   {
//     fieldName: [
//       { rule: 'required', message: 'This field is required' },
//       { rule: 'minLength', value: 3, message: 'Minimum length is 3' },
//       { rule: 'maxValue', value: 10, message: 'Maximum value is 10' },
//     ],
//   },
//   validationFunctions // Add this as the second argument
// );
//
//
// describe('useFormValidator', () => {
//   it('should have the correct initial state', () => {
//     const { result } = renderHook(() =>
//       useFormValidator(
//         { fieldName: "" }, // Add the initial values
//         validationSchema
//       )
//     );
//
//     expect(result.current.errors).toEqual({});
//     expect(result.current.isValid).toBe(true);
//   });
//
//   it('should handle field changes and trigger validation', async () => {
//     const {result, waitForNextUpdate} = renderHook(() => useFormValidator({}, validationSchema, validationFunctions)); // Add {} as the first argument
//
//     act(() => {
//       result.current.handleChange('fieldName', 'ab');
//     });
//
//     await waitForNextUpdate().catch((error) => {
//       console.error('Error during field change and validation:', error);
//     });
//
//     expect(result.current.values).toEqual({fieldName: 'ab'});
//     expect(result.current.errors).toEqual({fieldName: ['Minimum length is 3']});
//   });
//
//
// });
//
// //
// // it('should validate a single field and update errors', async () => {
// //   const {result} = renderHook(() => useFormValidator(validationSchema, validationFunctions));
// //
// //   act(() => {
// //     result.current.handleChange({target: {name: 'fieldName', value: 'abc'}});
// //   });
// //
// //   await act(async () => {
// //     await result.current.validateField('fieldName').catch((error) => {
// //       console.error('Error during single field validation:', error);
// //     });
// //   });
// //
// //   expect(result.current.errors).toEqual({});
// // });
// //
// // it('should validate the entire form and update errors', async () => {
// //   const {result} = renderHook(() => useFormValidator(validationSchema, validationFunctions));
// //
// //   act(() => {
// //     result.current.handleChange({target: {name: 'fieldName', value: 'ab'}});
// //   });
// //
// //   await act(async () => {
// //     await result.current.validateForm().catch((error) => {
// //       console.error('Error during form validation:', error);
// //     });
// //   });
// //
// //   expect(result.current.errors).toEqual({fieldName: ['Minimum length is 3']});
// // });
// //
// // it('should handle form submission and call onSubmit if validation is successful', async () => {
// //   const onSubmit = jest.fn();
// //   const {result} = renderHook(() => useFormValidator(validationSchema, validationFunctions, onSubmit));
// //
// //   act(() => {
// //     result.current.handleChange({target: {name: 'fieldName', value: 'abc'}});
// //   });
// //
// //   await result.current.handleSubmit({
// //     preventDefault: () => {
// //     }
// //   }).catch((error) => {
// //     console.error('Error during form submission:', error);
// //   });
// //
// //   expect(onSubmit).toHaveBeenCalledTimes(1);
// //   expect(onSubmit).toHaveBeenCalledWith({fieldName: 'abc'});
// // });
// //
// // it('should reset the form state and clear errors', () => {
// //   const {result} = renderHook(() => useFormValidator(validationSchema, validationFunctions));
// //
// //   act(() => {
// //     result.current.handleChange({target: {name: 'fieldName', value: 'abc'}})
// //     result.current.setErrors({fieldName: ['Minimum length is 3']});
// //   });
// //
// //   act(() => {
// //     result.current.resetForm();
// //   });
// //
// //   expect(result.current.values).toEqual({});
// //   expect(result.current.errors).toEqual({});
// // });