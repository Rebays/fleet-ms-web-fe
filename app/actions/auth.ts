"use server";

import { authRelay } from "@/better-auth/auth-server";
import { redirect } from "next/navigation";

/**
 * Maps complex auth errors to user-friendly strings.
 * Easy to update as you discover new error codes/statuses.
 */
function getErrorMessage(error: any): string {
  // Priority 1: Specific Database/Server issues
  const isDatabaseError = 
    error.status === 500 || 
    error.code === "DATABASE_CONNECTION_ERROR" || 
    error.statusText === "Internal Server Error";

  if (isDatabaseError) return "Auth Database connection failed. Please contact ICTSU.";

  // Priority 2: Specific Auth issues
  if (error.status === 401) return "Invalid username or password.";

  // Priority 3: Fallbacks
  return error.message ?? error.statusText ?? "An unexpected error occurred.";
}

export async function signInAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Domain logic
  const fullEmail = email.includes("@") ? email : `${email}@solomons.gov.sb`;

  // 1. Attempt Sign-In
  const { data, error } = await authRelay.signIn.email({
    email: fullEmail,
    password,
  });

  // 2. Error Handling
  if (error) {
    const finalMessage = getErrorMessage(error);
    
    // Log details for the admin in the terminal
    console.error(`[Auth Debug] Status: ${error.status} | Code: ${error.code} | Msg: ${finalMessage}`);
    
    return { error: finalMessage };
  }

  // 3. Success Redirect
  // Kept outside try/catch to avoid the NEXT_REDIRECT issue
  console.log(data)
  redirect("/assets");
}