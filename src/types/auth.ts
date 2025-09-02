import { DefaultSession } from 'next-auth';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  username?: string;
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    username: string;
  }
}
