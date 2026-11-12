import { api, ApiError } from '../api/client';
import type { Product, ProductInput } from '../../types/product';
import type { SessionRecord } from '../../types/record';
import { ApiErrorCode } from '../../types/Enums/ApiErrorCode';

export async function getProducts(): Promise<SessionRecord<Product>[]> {
  const { data } = await api.get<Product[]>('/products');
  if (!Array.isArray(data)) throw new ApiError(ApiErrorCode.InvalidResponse);
  return data.map((product) => ({ ...product, clientKey: `api-${product.id}` }));
}

export async function createProduct(input: ProductInput): Promise<SessionRecord<Product>> {
  const { data } = await api.post<{ id: number }>('/products', input);
  if (!data || !Number.isFinite(data.id)) throw new ApiError(ApiErrorCode.InvalidResponse);
  return { ...input, id: data.id, clientKey: crypto.randomUUID(), isLocal: true };
}
