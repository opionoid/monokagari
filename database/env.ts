import "https://deno.land/std@0.208.0/dotenv/load.ts";

import { parseEnv } from 'npm:znv';
import { z } from 'npm:zod';

export const { DB_URL, DB_AUTH_TOKEN } = parseEnv({
  DB_URL: Deno.env.get("DB_URL") || "1",
  DB_AUTH_TOKEN: Deno.env.get("DB_AUTH_TOKEN"),
}, {
	DB_URL: z.string().min(1),
	DB_AUTH_TOKEN: z.string().min(1).optional(),
});
