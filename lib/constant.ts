import * as z from 'zod';

export const SignUpFormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    metaAddress: z.string().min(1, 'ox address'),
    username: z.string().min(1, 'username'),
    image: z.any()
  });



export const SignInFormSchema = z.object({
    metaAddress: z.string().min(1, 'edd required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  });



export const BlogFormSchema = z.object({
    title: z.string(),
    message: z.string(),
    category: z.string(),
    image: z.any()
  });