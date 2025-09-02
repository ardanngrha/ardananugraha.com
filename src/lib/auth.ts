import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { AuthOptions, getServerSession } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GitHubProvider from 'next-auth/providers/github';
import { User } from '@/types/auth';

export const authOptions: AuthOptions = {
  adapter: {
    ...DrizzleAdapter(db),
    async createUser(user: User) {
      const { name, email, emailVerified, image, username } = user;

      const newUser = await db
        .insert(users)
        .values({
          name,
          email: email!,
          emailVerified,
          image,
          username: username || 'user', // Fallback username
        })
        .returning();

      return newUser[0];
    },
  } as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET!,
      async profile(profile) {
        // Extract user ID from avatar URL
        const avatarUrl = profile.avatar_url;
        const userIdMatch = avatarUrl.match(/\/u\/(\d+)/);

        let username = profile.login; // fallback to profile.login

        if (userIdMatch) {
          const userId = userIdMatch[1];
          try {
            // Fetch username from GitHub API
            const response = await fetch(
              `https://api.github.com/user/${userId}`,
              {
                headers: {
                  'User-Agent': 'ardananugraha.com',
                },
              },
            );

            if (response.ok) {
              const userData = await response.json();
              username = userData.login;
            }
          } catch (error) {
            console.error('Failed to fetch GitHub username:', error);
            // Keep the fallback username
          }
        }

        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: username,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.id, user.id),
        });
        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.username = dbUser.username;
        }
      }
      return session;
    },
  },
};

/**
 * Helper function to get the session on the server without having to import
 * the authOptions object every single time.
 * @returns The session object or null
 */
export const getSession = () => getServerSession(authOptions);
