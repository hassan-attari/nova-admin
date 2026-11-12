import en from './en.json';
import fa from './fa.json';
import { useAppSelector } from '../Redux/hooks';

export type DictionaryKey = keyof typeof en;
export type Translate = (key: DictionaryKey) => string;

export function isDictionaryKey(value: string): value is DictionaryKey {
  return Object.hasOwn(en, value);
}

export function useDictionary() {
  const locale = useAppSelector((state) => state.preferences.locale);
  const dictionary = locale === 'fa' ? fa : en;
  const t: Translate = (key) => dictionary[key];
  return { t, locale };
}
