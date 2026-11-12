import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/user';
import type { SessionRecord } from '../types/record';
import { RequestStatus } from '../types/Enums/RequestStatus';
import { ApiErrorCode } from '../types/Enums/ApiErrorCode';
import { getUsers } from '../Utils/services/users';
import { errorCode } from '../Utils/api/client';
import { signedOut } from './authSlice';

interface UsersState {
  items: SessionRecord<User>[];
  status: RequestStatus;
  error: ApiErrorCode | null;
  requestId?: string;
}
const initialState: UsersState = { items: [], status: RequestStatus.Idle, error: null };

export const fetchUsers = createAsyncThunk<
  SessionRecord<User>[],
  void,
  { state: { users: UsersState }; rejectValue: ApiErrorCode }
>(
  'users/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getUsers();
    } catch (error) {
      return rejectWithValue(errorCode(error));
    }
  },
  { condition: (_, { getState }) => getState().users.status !== RequestStatus.Loading },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action: PayloadAction<SessionRecord<User>>) {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.requestId = action.meta.requestId;
      state.status = RequestStatus.Loading;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (state.requestId !== action.meta.requestId) return;
      state.requestId = undefined;
      state.status = RequestStatus.Success;
      state.items = [...state.items.filter((item) => item.isLocal), ...action.payload];
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      if (state.requestId !== action.meta.requestId) return;
      state.requestId = undefined;
      state.status = RequestStatus.Error;
      state.error = action.payload || ApiErrorCode.Server;
    });
    builder.addCase(signedOut, () => initialState);
  },
});
export const { userAdded } = usersSlice.actions;
export default usersSlice.reducer;
