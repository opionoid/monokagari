import { defineConfig } from "npm:astro@latest/config";
import deno from "npm:@astrojs/deno@5.0.1";

export default defineConfig({
  output: "server",
  adapter: deno(),
});
