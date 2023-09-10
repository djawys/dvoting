import * as z from 'zod';

export const userAuthSchema = z.object({
  cnic: z.string(),
});

export const userRegisterSchema = z.object({
  cnic: z.string(),
  password: z.string().min(6, 'Password Must be 6 characters'),
  name: z.string().min(1),
  phone_number: z.string(),
});

export const ogImageSchema = z.object({
  heading: z.string(),
  type: z.string(),
  mode: z.enum(['light', 'dark']).default('dark'),
});

export const productPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
});

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
});
