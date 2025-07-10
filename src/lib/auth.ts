import GitHubProvider from "next-auth/providers/github";
import { AuthOptions, getServerSession } from "next-auth"

const authOptions: AuthOptions = {
    // Configure one or more authentication providers
  providers: [
        GitHubProvider({
      clientId: process.env.NEXT_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }