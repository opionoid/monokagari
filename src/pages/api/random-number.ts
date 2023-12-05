import type { APIRoute } from "npm:astro@latest";

// deno-lint-ignore require-await
export const get: APIRoute = async () => {
  const number = Math.random();
  return new Response(
    JSON.stringify({ number, message: `Here's a random number: ${number}` }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
};
