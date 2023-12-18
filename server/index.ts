// server.ts
import {
  createGitHubOAuthConfig,
  getSessionId,
  handleCallback,
  signIn,
  signOut,
} from "deno_kv_oauth/mod";

const oauthConfig = createGitHubOAuthConfig();

async function handler(request: Request) {
  const { pathname } = new URL(request.url);
  switch (pathname) {
    case "/oauth/signin": {
      return await signIn(request, oauthConfig);
    }
    case "/oauth/callback": {
      const { response } = await handleCallback(request, oauthConfig);
      return response;
    }
    case "/oauth/signout": {
      return await signOut(request);
    }
    case "/protected-route": {
      return await getSessionId(request) === undefined
        ? new Response("Unauthorized", { status: 401 })
        : new Response("You are allowed");
    }
    default: {
      return new Response(null, { status: 404 });
    }
  }
}

Deno.serve(handler);
