import { required, minLength, maxLength, pattern } from '../../src';

describe('builtInValidators', () => {
  it('should validate required fields', () => {
    expect(required()('')).toBe(false);
    expect(required()('test')).toBe(true);
  });


  it('should validate minLength', () => {
    const min3 = minLength(3);
    expect(min3('')).toBe(false);
    expect(min3('ab')).toBe(false);
    expect(min3('abc')).toBe(true);
    expect(min3('abcd')).toBe(true);
  });

  it('should validate maxLength', () => {
    const max3 = maxLength(3);
    expect(max3('')).toBe(true);
    expect(max3('ab')).toBe(true);
    expect(max3('abc')).toBe(true);
    expect(max3('abcd')).toBe(false);
  });

  it('should validate pattern', () => {
    const onlyLetters = pattern(/^[a-zA-Z]+$/);
    expect(onlyLetters('')).toBe(false);
    expect(onlyLetters('abc')).toBe(true);
    expect(onlyLetters('123')).toBe(false);
    expect(onlyLetters('abc123')).toBe(false);
  });
});
