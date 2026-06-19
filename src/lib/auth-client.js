import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,
});

export const { signIn, signUp, signOut, useSession } = createAuthClient();

const GoogleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};