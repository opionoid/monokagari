import "https://deno.land/std@0.182.0/dotenv/load.ts";

import { drizzle, LibSQLDatabase } from "https://esm.sh/drizzle-orm/libsql";
import {
  integer,
  sqliteTable,
} from "https://esm.sh/drizzle-orm/sqlite-core";
import { createClient } from "https://esm.sh/@libsql/client";
import { desc } from 'https://esm.sh/drizzle-orm/expressions';

const client = createClient({
  url: Deno.env.get("DB_URL"),
  authToken: Deno.env.get("DB_AUTH_TOKEN"),
});

const db:LibSQLDatabase = drizzle(client);

const saveData = sqliteTable("save-data", {
  id: integer("id").primaryKey(),
});

const user = await db.insert(saveData).values().returning().get();
console.log(user);

const selectResult = await db.select().from(saveData).orderBy(desc(saveData.id)).limit(3).all();

console.log(selectResult);

client.close();
