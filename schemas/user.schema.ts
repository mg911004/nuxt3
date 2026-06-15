import { z } from 'zod';

import { MESSAGES } from '~/constants/messages';

export const userLoginSchema = z.object({
  username: z.string().min(1, MESSAGES.VALIDATION.REQUIRED('아이디')),
  password: z.string().min(1, MESSAGES.VALIDATION.REQUIRED('비밀번호')),
});

export const userCreateSchema = z.object({
  username: z.string().min(1, MESSAGES.VALIDATION.REQUIRED('아이디')),
  email: z.email(MESSAGES.VALIDATION.INVALID_EMAIL),
  name: z.string().min(1, MESSAGES.VALIDATION.REQUIRED('이름')),
  password: z.string().min(1, MESSAGES.VALIDATION.REQUIRED('비밀번호')),
});

export const userUpdateSchema = z.object({
  email: z.email(MESSAGES.VALIDATION.INVALID_EMAIL),
  name: z.string().min(1, MESSAGES.VALIDATION.REQUIRED('이름')),
});

export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
