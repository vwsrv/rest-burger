import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .required()
  .email('Введите корректный email адрес');

export const passwordSchema = yup
  .string()
  .required()
  .min(6, 'Пароль должен содержать минимум 6 символов');

export const nameSchema = yup
  .string()
  .required()
  .min(2, 'Имя должно содержать минимум 2 символа');
