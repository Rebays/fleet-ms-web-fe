"use server";

// todo: When a session expires, attempt to sign-out crashes. fix this.

import { authRelay } from "@/better-auth/auth-server";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";


export async function signOutAction(prevState: any) {
  console.log('[SIGNOUT ACTION] --');

  try {
    // 1. Get headers safely
    const h = await headers();
    
    // 2. Extract ONLY the cookie header (this is all the Auth Server needs)
    const cookieHeader = h.get("cookie");
    console.log(`This is the cookie: ${cookieHeader}`)

    const decodedCookie = decodeURIComponent(cookieHeader!);
    // 3. Call the remote Auth Server
    await authRelay.signOut({
      fetchOptions: {
        headers: {
          // Manually pass the cookie string so the server knows who is signing out
          "cookie": decodedCookie, 
          "Accept": "application/json",
          "x-better-auth-sdk": "web",
          "x-better-auth-session-token": cookieHeader?.split('fms.session_token=')[1]?.split(';')[0] || "",
        },
        onResponse: async ({ response }) => {
           console.log('[SIGNOUT ACTION] Server Response Status:', response.status);
        }
      }
    });
    
    console.log('[SIGNOUT ACTION] Auth Server hit successfully');
  } catch (err: any) {
    // This will no longer throw the "private member" error
    console.error('[SIGNOUT ACTION] API Error:', err.message);
  }

  // 4. Clear local cookies
  const cookieStore = await cookies();
  cookieStore.delete("fms.session_token");
  cookieStore.delete("better-auth.session_token");

  // 5. Redirect
  console.log('[SIGNOUT ACTION] Redirecting to /login');
  redirect("/login?session=logout");
}