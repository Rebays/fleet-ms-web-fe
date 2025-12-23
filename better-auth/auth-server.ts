import { createAuthClient } from "better-auth/client"

export const authRelay = createAuthClient({
    baseURL: process.env.AUTH_SERVER_URL,
})