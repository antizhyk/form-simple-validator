export const required = () => (value) => {
  return value !== undefined && value !== null && value !== '';
};


export const minLength = (min) => (value) => {
  return typeof value === 'string' && value.length >= min;
};

export const maxLength = (max) => (value) => {
  return typeof value === 'string' && value.length <= max;
};

export const pattern = (regex) => (value) => {
  return regex.test(value);
};

export const minValue = (min) => (value) => {
  return !isNaN(value) && parseFloat(value) >= min;
};

export const maxValue = (max) => (value) => {
  return !isNaN(value) && parseFloat(value) <= max;
};
