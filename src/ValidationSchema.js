class ValidationSchema {
  constructor(rules = {}) {
    this.rules = rules;
  }

  addFieldRule(fieldName, rule, message) {
    if (!this.rules[fieldName]) {
      this.rules[fieldName] = [];
    }

    this.rules[fieldName].push({ rule, message });
  }

  modifyFieldRule(fieldName, rule, newRule, newMessage) {
    const fieldRules = this.rules[fieldName];
    if (!fieldRules) return;

    const ruleIndex = fieldRules.findIndex((r) => r.rule === rule);
    if (ruleIndex !== -1) {
      fieldRules[ruleIndex] = { rule: newRule, message: newMessage };
    }
  }

  removeFieldRule(fieldName, rule) {
    const fieldRules = this.rules[fieldName];
    if (!fieldRules) return;

    this.rules[fieldName] = fieldRules.filter((r) => r.rule !== rule);
  }

  getFieldRules(fieldName) {
    return this.rules[fieldName] || [];
  }

  async validateField(fieldName, value, validationFunctions) {
    const fieldRules = this.getFieldRules(fieldName);
    const errors = [];

    for (const { rule, message, value: ruleValue } of fieldRules) {
      const validationFn = validationFunctions[rule];

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

  async validate(formData, validationFunctions) {
    const errors = {};

    for (const fieldName in this.rules) {
      const value = formData[fieldName];

      try {
        const fieldErrors = await this.validateField(fieldName, value, validationFunctions);

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
