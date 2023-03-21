import {minLength, required, ValidationSchema} from "../src";


describe('ValidationSchema', () => {
  it('should validate a simple schema', async () => {
    const schema = new ValidationSchema({
      username: [
        { rule: 'required', message: 'Username is required' },
        { rule: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
      ],
    });

    const validationResult = await schema.validate({ username: 'example' }, { required, minLength });

    expect(validationResult).toEqual({});
  });

  it('should return an error for an invalid input', async () => {
    const schema = new ValidationSchema({
      username: [
        { rule: 'required', message: 'Username is required' },
        { rule: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
      ],
    });

    const validationResult = await schema.validate({ username: '' }, { required, minLength });

    expect(validationResult).toEqual({
      username: ['Username is required', 'Username must be at least 3 characters'],
    });
  });

});
