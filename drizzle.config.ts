/**
 * @attention drizzle-kitはDeno未対応のため0.20.6時点ではまだ動かない
 * @ref https://github.com/denoland/deno/issues/19826
 */
import { type Config } from 'npm:drizzle-kit';

export default {
	out: './migrations',
	schema: './src/schema.ts',
	breakpoints: true,
} satisfies Config;
