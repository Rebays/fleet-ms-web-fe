import { createAuthClient } from "better-auth/client"
import { jwtClient } from "better-auth/client/plugins"

export const authRelay = createAuthClient({
    baseURL: 'http://localhost:4444',
    plugins: [
        jwtClient()
    ]  
})