import { z } from 'zod';

const createAuthValidation = z.object({
  email: z.string(),
  password: z.string(),
});

export const AuthValidation = {
  createAuthValidation,
};
