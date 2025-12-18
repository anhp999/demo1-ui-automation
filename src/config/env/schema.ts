import { z } from 'zod';

export const envSchema = z.object({
  BASE_URL: z.string().url(),
});
