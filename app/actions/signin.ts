"use server";

import { authRelay } from "@/better-auth/auth-client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Cossette_Texte } from "next/font/google";

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


async function setCookie(response: Response): Promise<void>{
  // gets set-cookie header from response obj sent from better-auth
  const setCookieHeader = response.headers.get("set-cookie");
  console.log(`set-cookie header: ${setCookieHeader}`)
  console.log(`set-cookie header type: ${typeof(typeof(setCookieHeader))}`)

  // storage to set returned cookie from auth server
  const cookieStore = await cookies();

  // checking if the set cookie header exists
  if (setCookieHeader) {

    // if there are multiple cookies, we split them here
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


export async function signInAction(prevState: any, formData: FormData) {
  
   
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullEmail = email.includes("@") ? email : `${email}@solomons.gov.sb`;

  try {
    const {data , error} = await authRelay.signIn.email({
      email: fullEmail,
      password,
      fetchOptions: {
        headers: {
          // set a real origin for server-side requests
          origin: process.env.BASE_URL!,
        },
        onResponse: async ({ response }) => { 
          setCookie(response)
        },
      }
    });

  

    if (error) {
      console.error('[SIGNIN ACTION] Authentication Error:', error);
      return { error: getErrorMessage(error) };
    }

  } catch (err: any) {
    console.error('[SIGNIN ACTION] Network Error: Could not contact auth server', err.message);
    return { error: "Authentication server is currently unreachable. Please try again later." };
  }


  const cookieStore = await cookies();
  cookieStore.set("fms.last_user", "true", {
    maxAge: 60 * 60 * 24 * 30, // 30 Days
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });


 

  // 2. Success Redirect (Keep outside try/catch)
  // redirect internals throws a NEXT_REDIRECT error, putting
  // it in a try-catch will cause the catch block to handle it
  redirect("/");

}