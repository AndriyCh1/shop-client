import axios, { isAxiosError } from 'axios';
import NextAuth, { AuthError, type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { AuthResponse, SignUpData } from '@modules/auth/types';
import { GetUserResponse } from '@modules/users/types';

// NOTE: Workaround for handling Auth.js errors
class InvalidLoginError extends AuthError {
  code = 'invalid_login';
  message: string;

  constructor(message?: string, errorOptions = {}) {
    super(message, errorOptions);
    this.message = message || 'Failed to authenticate';
  }
}

export const {
  handlers,
  auth: getSession,
  signIn,
  signOut,
  unstable_update: updateSession
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          // NOTE: Cannot use custom http client due to unexpected behavior
          const { data: tokens } = await axios.post<AuthResponse>(
            `${process.env.SERVER_URL}/auth/login`,
            { email: credentials.email, password: credentials.password }
          );

          const { data: user } = await axios.get<GetUserResponse>(
            `${process.env.SERVER_URL}/users/me`,
            { headers: { Authorization: `Bearer ${tokens.data.accessToken}` } }
          );

          const response: User = {
            id: user.data.id,
            email: user.data.email,
            firstName: user.data.firstName,
            lastName: user.data.lastName,
            role: user.data.role,
            accessToken: tokens.data.accessToken,
            refreshToken: tokens.data.refreshToken
          };

          return response;
        } catch (error) {
          console.error('Error logging in: ', error);
          if (isAxiosError(error)) {
            throw new InvalidLoginError(error.response?.data.message);
          }

          throw new InvalidLoginError();
        }
      }
    })
  ],
  basePath: '/api/auth',
  session: {
    strategy: 'jwt',
    // NOTE: The value is that long, because we handle tokens expiration ourselves in our 3rd-party API.
    // Would be better to sync this expiration with token expiration from the API
    maxAge: 60 * 60 * 24 * 30 * 6
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }

      if (trigger === 'update') {
        token.user = session.user;
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        return { ...session, user: token.user as User };
      }

      return session;
    }
  },

  experimental: { enableWebAuthn: true }
});

export async function signUp(credentials: SignUpData) {
  const response = await axios.post<AuthResponse>(
    `${process.env.SERVER_URL}/auth/signup`,
    credentials
  );

  return response.data;
}

declare module 'next-auth' {
  interface Session {
    user: User;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id?: string;
    email?: string | null;
    firstName?: string;
    lastName?: string;
    role?: string;
    refreshToken?: string;
    accessToken?: string;
  }
}
