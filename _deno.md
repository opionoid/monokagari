// deno.jsonの残骸
// Astro4.0.3もdrizzle-kitも動かないからDenoは諦めました
{
  "tasks": {
    "dev": "deno run -A --unstable npm:astro@4.0.3 dev",
    "start": "deno run -A npm:astro@4.0.3 dev",
    "build": "deno run -A npm:astro@4.0.3 build",
    "preview": "deno run -A npm:astro@4.0.3 preview",
    "astro": "deno run -A npm:astro@4.0.3",
    "gen-db": "deno run -A npm:drizzle-kit@latest generate:pg",
    "push-db": "deno run -A npm:drizzle-kit@latest push:pg"
  },
  // 慣習的にdeps.tsとかに置くらしいけどDeno2.0でもそうだったらそうしてね（丸投げ）
  "imports": {
    "astro": "npm:astro@4.0.3",
    "drizzle-orm": "https://deno.land/x/drizzle/mod.ts",
    "drizzle-orm/pg-core": "https://deno.land/x/drizzle/pg-core.ts",
    "drizzle-kit": "npm:drizzle-kit@latest"
  }
}
