import { SuccessResponse } from '@libs/types/http';

export type GetUserResponse = SuccessResponse<{
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  name: string;
  email: string;
}>;
