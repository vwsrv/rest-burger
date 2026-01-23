import * as yup from 'yup';
import { emailSchema, passwordSchema } from './common.schema';
import type { TLoginRequest } from '@/entities/user/auth/models/types/login-request.type';

export const loginSchema: yup.ObjectSchema<TLoginRequest> = yup.object({
  email: emailSchema,
  password: passwordSchema,
});
