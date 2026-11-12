import { api, ApiError } from '../api/client';
import type { User, UserInput } from '../../types/user';
import type { SessionRecord } from '../../types/record';
import { ApiErrorCode } from '../../types/Enums/ApiErrorCode';

export async function getUsers(): Promise<SessionRecord<User>[]> {
  const { data } = await api.get<User[]>('/users');
  if (!Array.isArray(data)) throw new ApiError(ApiErrorCode.InvalidResponse);
  return data.map(({ id, name, username, email, phone }) => ({
    id,
    name,
    username,
    email,
    phone,
    clientKey: `api-${id}`,
  }));
}

export async function createUser(input: UserInput): Promise<SessionRecord<User>> {
  const { firstName, lastName, username, email, phone, password } = input;
  const name = { firstname: firstName, lastname: lastName };
  const { data } = await api.post<{ id: number }>('/users', {
    name,
    firstname: firstName,
    lastname: lastName,
    username,
    email,
    phone,
    password,
    address: { city: '', street: '', number: 0, zipcode: '', geolocation: { lat: '0', long: '0' } },
  });
  if (!data || !Number.isFinite(data.id)) throw new ApiError(ApiErrorCode.InvalidResponse);
  return {
    id: data.id,
    name,
    username,
    email,
    phone,
    clientKey: crypto.randomUUID(),
    isLocal: true,
  };
}
