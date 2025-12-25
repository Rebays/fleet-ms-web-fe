import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server"; // Import NextRequest

export async function GET(request: NextRequest) {
  // 1. Extract the "reason" from the URL (?reason=...)
  const { searchParams } = new URL(request.url);
  const reason = searchParams.get("reason") || "expired"; // Fallback to 'expired'

  const c = await cookies();

  // 2. Clear the browser cookie to break the Proxy loophole
  c.delete("fms.session_token"); 
  
  // Optional: Clear the generic better-auth cookie too if you use it
  c.delete("better-auth.session_token");

  console.log(`[API AUTH] - Cookie cleared. Reason: ${reason}`);

  // 3. Redirect to login, carrying over the specific reason
  // This allows your login page to say "Session Missing" vs "Session Expired"
  redirect(`/login?session=${reason}`);
}