import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { readPreferences, type Locale } from '../Storage/preferences';
import { ThemeMode } from '../types/Enums/ThemeMode';

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: readPreferences(),
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
  },
});
export const { setLocale, setTheme } = preferencesSlice.actions;
export default preferencesSlice.reducer;
