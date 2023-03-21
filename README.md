
# Form-Validator

Form-Validator is a flexible and powerful validation library for JavaScript that can be used with any form library or even plain HTML forms.

## Key Features

- Schema-based approach
- Asynchronous validation
- Custom error messages
- Real-time validation feedback
- Library-independent

## Installation

```
npm install form-validator-lib
```

## Getting Started

Here's a simple example of using Form-Validator:

```js
import { ValidationSchema } from 'form-validator-lib';
import { required, minLength } from 'form-validator-lib/validators';

const schema = new ValidationSchema({
  username: [
    { rule: 'required', message: 'Username is required' },
    { rule: 'minLength', value: 3, message: 'Username must be at least 3 characters long' },
  ],
});

const validationResult = schema.validate({ username: 'example' }, { required, minLength });

if (Object.keys(validationResult).length === 0) {
  console.log('Validation passed');
} else {
  console.log('Validation failed', validationResult);
}
```

# API Reference

## `ValidationSchema`

Represents a validation schema that defines rules for validating form data.

### `constructor(rules)`

Creates a new `ValidationSchema` object with the given validation `rules`.

- `rules` (object): An object that maps field names to validation rules. Each validation rule is an array of functions that accept a value and return an error message if the value is invalid.

### `addFieldRules(fieldName, rules)`

Adds or replaces validation rules for the specified field.

- `fieldName` (string): The name of the field to add or replace validation rules for.
- `rules` (array of functions): An array of functions that accept a value and return an error message if the value is invalid.

### `removeFieldRules(fieldName)`

Removes validation rules for the specified field.

- `fieldName` (string): The name of the field to remove validation rules for.

### `getFieldRules(fieldName)`

Returns the validation rules for the specified field.

- `fieldName` (string): The name of the field to get validation rules for.

### `validateField(fieldName, value, validationFunctions)`

Validates the specified field value against its validation rules.

- `fieldName` (string): The name of the field to validate.
- `value` (any): The value of the field to validate.
- `validationFunctions` (array of functions, optional): An array of additional validation functions to apply to the field value.

Returns an error message if the value is invalid, or `null` if the value is valid.

### `validate(formData, validationFunctions)`

Validates the entire form data object against the validation schema.

- `formData` (object): An object that maps field names to values.
- `validationFunctions` (array of functions, optional): An array of additional validation functions to apply to the field values.

Returns an object that maps field names to error messages for invalid fields, or an empty object if all fields are valid.

## Built-in Validators

### `required(value)`

Validates that a value is present.

- `value` (any): The value to validate.

Returns an error message if the value is not present, or `null` if the value is present.

### `minLength(min)(value)`

Validates that a string value has a minimum length.

- `min` (number): The minimum length of the string.
- `value` (string): The string to validate.

Returns an error message if the string is too short, or `null` if the string is long enough.

### `maxLength(max)(value)`

Validates that a string value has a maximum length.

- `max` (number): The maximum length of the string.
- `value` (string): The string to validate.

Returns an error message if the string is too long, or `null` if the string is short enough.

### `pattern(regex)(value)`

Validates that a string value matches a regular expression pattern.

- `regex` (RegExp): The regular expression pattern to match.
- `value` (string): The string to validate.

Returns an error message if the string does not match the pattern, or `null` if the string matches the pattern.

### `minValue(min)(value)`

Validates that a numeric value is greater than or equal to a minimum value.

- `min` (number): The minimum value.
- `value` (number): The value to validate.

Returns an error message if the value is too small, or `null` if the value is large enough.

### `maxValue(max)(value)`

Validates that a numeric value is less than or equal to a maximum value.

- `max` (number): The maximum value
- `value` (number): The value to validate.

Returns an error message if the value is too large, or `null` if the value is small enough.
# form-simple-validator
