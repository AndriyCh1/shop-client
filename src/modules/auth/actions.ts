'use server';

import { isAxiosError } from 'axios';
import { AuthError } from 'next-auth';

import * as auth from './services/auth-service';
import { SignInData, SignUpData } from './types';

export async function signOut() {
  await auth.signOut();
}

export async function signIn(credentials: SignInData) {
  try {
    await auth.signIn('credentials', credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.message };
    }

    throw error;
  }
}

export async function signUp(credentials: SignUpData) {
  try {
    await auth.signUp(credentials);
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: error.response?.data.message };
    }

    return { error: (error as Error).message };
  }
}
