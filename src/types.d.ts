export * from 'next-auth';
export * from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user?: User & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string | null;
    firstName: string;
    lastName: string;
    role: string;
    refreshToken: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      email: string | null;
      firstName: string;
      lastName: string;
      role: string;
      refreshToken: string;
      accessToken: string;
    } & DefaultSession['user'];
  }
}
