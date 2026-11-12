import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { setLocale, setTheme } from '../Redux/preferencesSlice';
import { savePreference } from '../Storage/preferences';
import { ThemeMode } from '../types/Enums/ThemeMode';
import { useDictionary } from '../Dictionary/useDictionary';
import { Actions, IconButton } from './ui';

export function Preferences() {
  const { t, locale } = useDictionary();
  const theme = useAppSelector((state) => state.preferences.theme);
  const dispatch = useAppDispatch();

  function changeLanguage() {
    const next = locale === 'fa' ? 'en' : 'fa';
    dispatch(setLocale(next));
    savePreference('locale', next);
  }

  function changeTheme() {
    const next = theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    dispatch(setTheme(next));
    savePreference('theme', next);
  }

  return (
    <Actions>
      <IconButton type="button" aria-label={t('language')} onClick={changeLanguage}>
        {t('languageCode')}
      </IconButton>
      <IconButton
        type="button"
        aria-label={t('theme')}
        aria-pressed={theme === ThemeMode.Dark}
        onClick={changeTheme}
      >
        {theme === ThemeMode.Light ? (
          <Moon size={19} aria-hidden="true" />
        ) : (
          <Sun size={19} aria-hidden="true" />
        )}
      </IconButton>
    </Actions>
  );
}
