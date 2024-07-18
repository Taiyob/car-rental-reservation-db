import { z } from 'zod';

const createAuthValidation = z.object({
  password: z.string(),
});

export const AuthValidation = {
  createAuthValidation,
};
