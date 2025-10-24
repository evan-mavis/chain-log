import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const signInWithGoogle = async () => {
  const { error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
    errorCallbackURL: "/",
  });

  if (error) console.error(error);
};

export const signInWithGithub = async () => {
  const { error } = await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
    errorCallbackURL: "/",
  });

  if (error) console.error(error);
};
