import type { DictionaryKey } from '../Dictionary/useDictionary';
export function formatMoney(amount: number, locale: string) {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
export const categoryKeys: Record<string, DictionaryKey> = {
  electronics: 'electronics',
  jewelery: 'jewelery',
  "men's clothing": 'mens',
  "women's clothing": 'womens',
};
