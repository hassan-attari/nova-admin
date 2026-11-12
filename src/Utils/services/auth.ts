
import { api, ApiError, setAuthToken } from '../api/client';
import { ApiErrorCode } from '../../types/Enums/ApiErrorCode';
import type { LoginInput } from '../../types/user';

const USERNAME_KEY = 'auth_username';

export async function login(input: LoginInput) {
  const { data } = await api.post<{ token: string }>('/auth/login', input);

  if (!data || typeof data.token !== 'string' || !data.token.trim()) {
    throw new ApiError(ApiErrorCode.InvalidResponse);
  }

  setAuthToken(data.token);
  localStorage.setItem(USERNAME_KEY, input.username.trim());
}

export function logout() {
  setAuthToken(null);
  localStorage.removeItem(USERNAME_KEY);
}
