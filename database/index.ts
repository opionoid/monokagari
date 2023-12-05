/**
 * ExampleをDenoに移植したもの
 * @ref https://github.com/drizzle-team/drizzle-orm/tree/main/examples/libsql
 * 
 * まだimportMapの対応が不十分なため、これが進んだ後に `npm:` を削除していく
 * @ref https://deno.land/x/drizzle@v0.23.85#supported-mappings
 */

import { serve } from 'npm:@hono/node-server';
import { migrate } from 'npm:drizzle-orm/libsql/migrator';
import { app, db } from './server.ts';

async function main() {
	await migrate(db, {
		migrationsFolder: './migrations',
	});

	serve(app).listen(3000).once('listening', () => {
		console.log('🚀 Server started on port 3000');
	});
}

main().catch((err) => {
	console.error(err);
	Deno.exit();
});
