import {ValidationSchema} from "../../index";


describe('ValidationSchema with password confirmation', () => {
  let validationSchema;

  beforeEach(() => {
    validationSchema = new ValidationSchema({
      password: [
        {rule: 'minLength', value: 6, message: 'Password must be at least 6 characters'},
        {rule: 'required', message: 'Password is required'},
      ],
      passwordConfirmation: [{rule: 'passwordConfirmation', value: 'password', message: 'Passwords must match'}],
    });
  });

  it('should pass when password and password confirmation match', async () => {
    const formData = {
      password: 'pass123',
      passwordConfirmation: 'pass123',
    };

    const errors = await validationSchema.validate(formData);
    expect(errors).toEqual({});
  });

  it('should fail when password and password confirmation do not match', async () => {
    const formData = {
      password: 'test123',
      passwordConfirmation: 'test456',
    };

    const errors = await validationSchema.validate(formData);

    expect(errors).toEqual({
      passwordConfirmation: ['Passwords must match'],
    });
  });

  it('should fail when password is missing', async () => {
    const formData = {
      passwordConfirmation: 'test123',
    };

    const errors = await validationSchema.validate(formData);

    expect(errors).toEqual({
        password: ['Password must be at least 6 characters', 'Password is required'],
        passwordConfirmation: ['Passwords must match']
      }
    );
  });
});