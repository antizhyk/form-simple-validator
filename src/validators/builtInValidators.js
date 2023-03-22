/**
 * @fileoverview
 * This file contains a collection of validation functions to be used in form validation.
 * These functions are designed to be easily composable and customizable for various validation scenarios.
 */

/**
 * Validation function for checking if a value is not empty.
 * @returns {function(*): boolean} A function that accepts a value and returns true if the value is not empty, otherwise false.
 */
export const required = () => (value) => {
  return value !== undefined && value !== null && value !== '';
};

/**
 * Validation function for checking if a string has a minimum length.
 * @param {number} min - The minimum length of the string.
 * @returns {function(*): boolean} A function that accepts a value and returns true if the value is a string and its length is greater than or equal to the minimum length, otherwise false.
 */
export const minLength = (min) => (value) => {
  return typeof value === 'string' && value.length >= min;
};

/**
 * Validation function for checking if a string has a maximum length.
 * @param {number} max - The maximum length of the string.
 * @returns {function(*): boolean} A function that accepts a value and returns true if the value is a string and its length is less than or equal to the maximum length, otherwise false.
 */
export const maxLength = (max) => (value) => {
  return typeof value === 'string' && value.length <= max;
};

/**
 * Validation function for checking if a value matches a regular expression pattern.
 * @param {RegExp} regex - The regular expression pattern to match.
 * @returns {function(*): boolean} A function that accepts a value and returns true if the value matches the pattern, otherwise false.
 */
export const pattern = (regex) => (value) => {
  return regex.test(value);
};

/**
 * Validation function for checking if a numeric value is greater than or equal to a minimum value.
 * @param {number} min - The minimum value.
 * @returns {function(*): boolean} A function that accepts a value and returns true if the value is a number and greater than or equal to the minimum value, otherwise false.
 */
export const minValue = (min) => (value) => {
  return !isNaN(value) && parseFloat(value) >= min;
};

/**
 * Validation function for checking if a numeric value is less than or equal to a maximum value.
 * @param {number} max - The maximum value.
 * @returns {function(*): boolean} A function that accepts a value and returns true if the value is a number and less than or equal to the maximum value, otherwise false.
 */
export const maxValue = (max) => (value) => {
  return typeof value === 'number' && value <= max;
};

/**
 * Validation function for checking if a value is a valid email address.
 * @returns {function(*): *}
 */
export const password = () => (value) => {
  return value.length >= 8 && value.length <= 20;
}


/**
 * Validation function for checking if a value is a valid email address.
 * @returns {function(*): boolean}
 */
export const leastOneUpperCase = () => (value) => {
  return /[A-Z]/.test(value);
}

/**
 * Validation function for checking if a value is a valid email address.
 * @returns {function(*): boolean}
 */
export const leastOneSpecialCharacter = () => (value) => {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
}