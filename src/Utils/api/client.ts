import axios from 'axios';
import { ApiErrorCode } from '../../types/Enums/ApiErrorCode';

const TOKEN_KEY = 'auth_token';

let token: string | null = localStorage.getItem(TOKEN_KEY);

export function setAuthToken(value: string | null) {
  token = value;

  if (value) {
    localStorage.setItem(TOKEN_KEY, value);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export class ApiError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    public readonly status?: number,
  ) {
    super(code);
    this.name = 'ApiError';
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 12000,
  headers: { Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  if (token && config.method !== 'get') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const code = !error.response
        ? ApiErrorCode.Network
        : status === 401
          ? ApiErrorCode.Auth
          : ApiErrorCode.Server;

      return Promise.reject(new ApiError(code, status));
    }

    return Promise.reject(new ApiError(ApiErrorCode.Server));
  },
);

export function errorCode(error: unknown): ApiErrorCode {
  return error instanceof ApiError ? error.code : ApiErrorCode.Server;
}
