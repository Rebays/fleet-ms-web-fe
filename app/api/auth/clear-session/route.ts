import { authRelay } from "@/better-auth/auth-client";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server"; 

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reason = searchParams.get("session"); 

  console.log('[CLEAR SESSION ROUTE] - Route called.')


  const h = await headers();
      
  // 2. Extract ONLY the cookie header (this is all the Auth Server needs)
  const cookieHeader = h.get("cookie");
  console.log(`[CLEAR SESSION ROUTE] - cookieHeader: ${cookieHeader}`)

  const decodedCookie = cookieHeader ? decodeURIComponent(cookieHeader!) : "";

  // 1. Ping the Auth Server to kill the session in the database
  // We use the 'fms.session_token' from the request to tell the server WHICH session to kill
  try {
    await authRelay.signOut({
      fetchOptions: {
        headers: {
          // Manually pass the cookie string so the server knows who is signing out
          "cookie": decodedCookie, 
          "Accept": "application/json",
          "x-better-auth-sdk": "web",
          "x-better-auth-session-token": cookieHeader?.split('fms.session_token=')[1]?.split(';')[0] || "",
        }
      }
    })
  } catch (error) {
    console.error("Failed to invalidate session on server:", error);
  }

  // 2. Clear the session in the browser
  const c = await cookies();
  c.delete("fms.session_token"); 

  // 3. Redirect with the reason
  redirect(`/login?session=${reason}`);
}