import type { ValidationError } from 'yup';

export const getErrorMessage = (err: ValidationError, separator = ', '): string => {
  return err.inner.map((error: ValidationError) => error.message).join(separator);
};
