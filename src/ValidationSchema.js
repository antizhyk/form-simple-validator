
import * as validationFunctions from './validators/builtInValidators';
/**
 * Class representing a validation schema for form fields.
 */
class ValidationSchema {
  /**
   * Create a validation schema.
   * @param {Object} [rules={}] - An object containing field names as keys and arrays of validation rules as values.
   */
  constructor(rules = {}) {
    this.rules = rules;
    this.validationFunctions = validationFunctions;
  }

  /**
   * Add a validation rule to a field.
   * @param {string} fieldName - The name of the field.
   * @param {string} rule - The name of the validation rule.
   * @param {string} message - The error message for the validation rule.
   */
  addFieldRule(fieldName, rule, message) {
    if (!this.rules[fieldName]) {
      this.rules[fieldName] = [];
    }

    this.rules[fieldName].push({rule, message});
  }

  /**
   * Modify a validation rule of a field.
   * @param {string} fieldName - The name of the field.
   * @param {string} rule - The name of the validation rule to modify.
   * @param {string} newRule - The new name of the validation rule.
   * @param {string} newMessage - The new error message for the validation rule.
   */
  modifyFieldRule(fieldName, rule, newRule, newMessage) {
    const fieldRules = this.rules[fieldName];
    if (!fieldRules) return;

    const ruleIndex = fieldRules.findIndex((r) => r.rule === rule);
    if (ruleIndex !== -1) {
      fieldRules[ruleIndex] = {rule: newRule, message: newMessage};
    }
  }

  /**
   * Remove a validation rule from a field.
   * @param {string} fieldName - The name of the field.
   * @param {string} rule - The name of the validation rule to remove from the field.
   */
  removeFieldRule(fieldName, rule) {
    const fieldRules = this.rules[fieldName];
    if (!fieldRules) return;

    this.rules[fieldName] = fieldRules.filter((r) => r.rule !== rule);
  }

  /**
   Get the validation rules for a field.
   @param {string} fieldName - The name of the field.
   @returns {Array} An array of validation rules for the field.
   */
  getFieldRules(fieldName) {
    return this.rules[fieldName] || [];
  }

  /**
   Validate a single field using its validation rules.
   @param {string} fieldName - The name of the field.
   @param {*} value - The value of the field.
   @returns {Promise<Array>} A promise that resolves to an array of error messages if any, otherwise an empty array.
   */
  async validateField(fieldName, value) {
    const fieldRules = this.getFieldRules(fieldName);
    const errors = [];

    for (const {rule, message, value: ruleValue} of fieldRules) {
      const validationFn = this.validationFunctions[rule];

      try {
        if (validationFn) {
          const isValid = await Promise.resolve(validationFn(ruleValue)(value));

          if (!isValid) {
            errors.push(message);
          }
        } else {
          console.warn(`Validation function not found for rule: ${rule}`);
        }
      } catch (error) {
        console.error(`Error occurred while validating field '${fieldName}' with rule '${rule}':`, error);
        errors.push(`Validation error: ${error.message}`);
      }
    }

    return errors;
  }

  /**
   Validate form data using the schema's validation rules.
   @param {Object} formData - An object containing form data with field names as keys and field values as values.
   @returns {Promise<Object>} A promise that resolves to an object containing error messages for invalid fields.
   */
  async validate(formData) {
    const errors = {};

    for (const fieldName in this.rules) {
      const value = formData[fieldName];

      try {
        const fieldErrors = await this.validateField(fieldName, value);

        if (fieldErrors.length > 0) {
          errors[fieldName] = fieldErrors;
        }
      } catch (error) {
        console.error(`Error occurred while validating field '${fieldName}':`, error);
        errors[fieldName] = [`Validation error: ${error.message}`];
      }
    }

    return errors;
  }
}

export default ValidationSchema;
