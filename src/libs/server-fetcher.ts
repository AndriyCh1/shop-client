import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

import { getSession, updateSession } from '@modules/auth/services';
import { AuthResponse } from '@modules/auth/types';

import { HttpClient } from '@libs/types/http';

const BASE_SERVER_URL = process.env.SERVER_URL;

async function handleRetryRequest(request: AxiosRequestConfig) {
  const session = await getSession();

  if (!session?.user?.id) {
    return redirect('/sign-in');
  }

  try {
    const { data: tokens } = await axios.post<AuthResponse>(
      `${BASE_SERVER_URL}/auth/refresh-tokens`,
      { refreshToken: session?.user.refreshToken }
    );

    await updateSession({
      ...session,
      user: {
        ...session?.user,
        accessToken: tokens.data.accessToken,
        refreshToken: tokens.data.refreshToken
      }
    });

    return axios.request({
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${tokens.data.accessToken}`
      }
    });
  } catch (error) {
    console.error('Error refreshing token', error);
    return redirect('/sign-out');
  }
}

function initInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(async (config) => {
    const session = await getSession();

    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const shouldRetry =
        error.response?.status == 401 &&
        error.config &&
        !error.config?._isRetry;

      if (shouldRetry) {
        originalRequest._isRetry = true;
        return handleRetryRequest(originalRequest);
      }

      throw error;
    }
  );

  return axiosInstance;
}

export const serverFetcher: HttpClient = initInterceptors(
  axios.create({ baseURL: BASE_SERVER_URL })
);
