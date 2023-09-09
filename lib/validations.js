import * as z from 'zod';

export const userAuthSchema = z.object({
  email: z.string().email(),
});

export const userRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().min(1),
  phone_number: z.string().optional(),
  address: z.string(),
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
