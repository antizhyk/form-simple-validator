import {ValidationSchema} from "../index";

describe('validate', () => {
  let validationSchema;

  beforeEach(() => {

    validationSchema = new ValidationSchema(
      {
        fieldName1: [
          {rule: 'required', message: 'This field is required'},
          {rule: 'minLength', value: 3, message: 'Minimum length is 3'},
        ],
        fieldName2: [
          {rule: 'required', message: 'This field is required'},
          {rule: 'maxValue', value: 5, message: 'Maximum value is 5'},
        ],
      },
    );
  });

  test('returns an empty object if all fields are valid', async () => {
    const formData = {
      fieldName1: 'ab',
      fieldName2: 8,
    };

    const errors = await validationSchema.validate(formData);

    expect(errors).toEqual({
      fieldName1: ['Minimum length is 3'],
      fieldName2: ['Maximum value is 5'],
    });
  });

  test('returns an object with one field name and one error message for one invalid field', async () => {
    const formData = {
      fieldName1: 'abd',
      fieldName2: 4,
    };

    const errors = await validationSchema.validate(formData);

    expect(errors).toEqual({});
  });


  test('returns an object with field names that are not in the schema and one error message for each', async () => {
    const formData = {
      fieldName1: 'abc',
      fieldName3: '',
    };

    const errors = await validationSchema.validate(formData);

    expect(errors).toEqual({ fieldName2: [ 'This field is required', 'Maximum value is 5' ] }
    );
  });
});