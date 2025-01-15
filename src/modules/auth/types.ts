import { SuccessResponse } from '@libs/types/http';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AuthResponse = SuccessResponse<{
  accessToken: string;
  refreshToken: string;
}>;
