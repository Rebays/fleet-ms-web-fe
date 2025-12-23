import { createAuthClient } from "better-auth/react"
const url = "http://localhost:8000";

export const authClient = createAuthClient({
    baseURL: url,
})