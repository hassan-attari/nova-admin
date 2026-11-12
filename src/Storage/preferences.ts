import { ThemeMode } from '../types/Enums/ThemeMode';

export type Locale = 'fa' | 'en';

export function readPreferences(): { locale: Locale; theme: ThemeMode } {
  try {
    return {
      locale: localStorage.getItem('nova-admin-locale') === 'en' ? 'en' : 'fa',
      theme:
        localStorage.getItem('nova-admin-theme') === ThemeMode.Dark
          ? ThemeMode.Dark
          : ThemeMode.Light,
    };
  } catch {
    return { locale: 'fa', theme: ThemeMode.Light };
  }
}

export function savePreference(key: 'locale' | 'theme', value: string) {
  try {
    localStorage.setItem(`nova-admin-${key}`, value);
  } catch {
    return;
  }
}
