import * as yup from 'yup';
import { emailSchema, nameSchema, passwordSchema } from './common.schema';
import type { TUserInfoRequest } from '@/entities/user/profile/models/types';

export const profileSchema: yup.ObjectSchema<TUserInfoRequest> = yup.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
});
