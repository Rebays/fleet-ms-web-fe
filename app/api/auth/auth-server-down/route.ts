import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server"; 

export async function GET(request: NextRequest) {
  console.log('[AUTH-SERVER-DOWN ROUTE] - Route called.')

  const { searchParams } = new URL(request.url);
  const reason = searchParams.get("error"); 

  const c = await cookies();
  c.delete("fms.session_token"); 

  redirect(`/login?error=${reason}`);
}