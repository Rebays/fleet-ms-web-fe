"use server";
import { authRelay } from "@/better-auth/auth-client";

export interface IdProvider {
    provider: "google" | "github" | "facebook" | "twitter";
}

const callbackURL = "http://localhost:3000/api/auth/callback/";

export async function socialSignInAction({ provider }: IdProvider) {
  await authRelay.signIn.social({
      provider: provider,
      callbackURL: `${callbackURL}${provider}`,
      fetchOptions: {
        onResponse: (data)=> {
            console.log(data)
        }
      }
    });

}