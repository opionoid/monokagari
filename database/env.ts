import { parseEnv } from 'znv';
import { z } from 'zod';

export const { DB_URL, DB_AUTH_TOKEN } = parseEnv(process.env, {
	DB_URL: z.string().min(1),
	DB_AUTH_TOKEN: z.string().min(1).optional(),
});

/* Deno用
import "https://deno.land/std@0.208.0/dotenv/load.ts";
import { parseEnv } from 'znv';
import { z } from 'zod';

export const { DB_URL, DB_AUTH_TOKEN } = parseEnv({
  DB_URL: Deno.env.get("DB_URL") || "1",
  DB_AUTH_TOKEN: Deno.env.get("DB_AUTH_TOKEN"),
}, {
	DB_URL: z.string().min(1),
	DB_AUTH_TOKEN: z.string().min(1).optional(),
});
*/
