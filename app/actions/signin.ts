"use server";

import { authRelay } from "@/better-auth/auth-server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
  console.log('[SIGNIN ACTION] --')
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Domain logic
  const fullEmail = email.includes("@") ? email : `${email}@solomons.gov.sb`;

  let authResponse: any = null;
  let isSuccessful = false;

  // 1. Attempt Sign-In with Offline Protection
  try {
    authResponse = await authRelay.signIn.email({
      email: fullEmail,
      password,
      fetchOptions: {
        onResponse: async ({ response }) => {
          console.log('[SIGNIN ACTION] Auth Server Successfully responds.')
          const setCookieHeader = response.headers.get("set-cookie");
          const cookieStore = await cookies();
          if (setCookieHeader) {
            const cookiesToSet = setCookieHeader.split(/,(?=[^;]+;)/);

            cookiesToSet.forEach((cookieString) => {
              const parts = cookieString.split(";").map(p => p.trim());
              const [nameValue, ...attributes] = parts;
              const [name, value] = nameValue.split("=");
                      
              const options: any = {};

              attributes.forEach(attr => {
                const [key, val] = attr.split("=");
                const lowerKey = key.toLowerCase();
                
                if (lowerKey === "httponly") options.httpOnly = true;
                if (lowerKey === "secure") {
                  options.secure = process.env.NODE_ENV === "production";
                }
                if (lowerKey === "path") options.path = val || "/";
                if (lowerKey === "samesite") options.sameSite = val.toLowerCase();
                if (lowerKey === "max-age") options.maxAge = parseInt(val);
                if (lowerKey === "expires") {
                  const d = new Date(val);
                  if (!isNaN(d.getTime())) options.expires = d;
                }
                if (lowerKey === "domain") options.domain = val;
              });

              if (process.env.NODE_ENV === "development") {
                options.secure = false;
              }
                      
              cookieStore.set(name, value, options);
            });
          }
        }
      }
    });

    // Check for logical auth errors returned by the relay
    if (authResponse.error) {
      const finalMessage = getErrorMessage(authResponse.error);
      console.error(`[Auth Debug] Status: ${authResponse.error.status} | Msg: ${finalMessage}`);
      return { error: finalMessage };
    }

    isSuccessful = true;

  } catch (err: any) {
    // This catches network failures (e.g., Auth Server is offline)
    console.error('[SIGNIN ACTION] Network Error:', err.message);
    return { error: "Authentication server is currently unreachable. Please try again later." };
  }

  // 2. Success Redirect (Keep outside try/catch)
  if (isSuccessful) {
    console.log(authResponse.data);
    console.log(`User ${authResponse.data.user.name} successfully authenticated.`);
    console.log('we are redirecting user to /assets');
    redirect("/");
  }
}