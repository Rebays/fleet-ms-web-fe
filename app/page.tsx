import { redirect } from "next/navigation";
import { headers } from "next/headers";

const authServer = "http://localhost:8000";

export default async function Home() {

  // 1. Get the cookies from the incoming request to the Next.js server
  const headerList = await headers();
  const cookie = headerList.get("cookie");

  // 2. Fetch the session from your external Auth Server
  // Note: Replace with your actual Auth Server URL
  const response = await fetch(`${authServer}/api/auth/get-session`, {
    headers: {
      // Forward the cookies so the Auth server knows who the user is
      cookie: cookie || "",
    },
    cache: 'no-store' // Ensure we don't cache the session check at build time
  });

  console.log('hello')
  const session = await response.json();

  // 3. Logic based on external session response
  if (!session || response.status !== 200) {
    console.log('Session is null on external server');
    redirect('/login');
  }

  // If session exists, go to assets
  redirect('/assets');
}
