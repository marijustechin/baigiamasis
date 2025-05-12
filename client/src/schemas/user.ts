import * as z from 'zod';

export const userRegisterSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(30, { message: 'Username must not exceed 30 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Only letters, numbers, and underscores are allowed',
    }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email format' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(64, { message: 'Password must not exceed 64 characters' })
    .regex(/[A-Z]/, { message: 'At least 1 uppercase letter required' })
    .regex(/[a-z]/, { message: 'At least 1 lowercase letter required' })
    .regex(/[0-9]/, { message: 'At least 1 number required' })
    .regex(/[^a-zA-Z0-9]/, { message: 'At least 1 special symbol required' }),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email format' }),
  password: z.string().trim().min(1, { message: 'Slaptažodis privalomas' }),
});
