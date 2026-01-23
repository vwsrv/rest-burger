import * as yup from 'yup';
import { emailSchema, nameSchema, passwordSchema } from './common.schema';
import type { TRegisterRequest } from '@/entities/user/auth/models/types/register-request.type';

export const registerSchema: yup.ObjectSchema<TRegisterRequest> = yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
