import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product';
import type { SessionRecord } from '../types/record';
import { RequestStatus } from '../types/Enums/RequestStatus';
import { ApiErrorCode } from '../types/Enums/ApiErrorCode';
import { getProducts } from '../Utils/services/products';
import { errorCode } from '../Utils/api/client';
import { signedOut } from './authSlice';

interface ProductsState {
  items: SessionRecord<Product>[];
  status: RequestStatus;
  error: ApiErrorCode | null;
  requestId?: string;
}
const initialState: ProductsState = { items: [], status: RequestStatus.Idle, error: null };

export const fetchProducts = createAsyncThunk<
  SessionRecord<Product>[],
  void,
  { state: { products: ProductsState }; rejectValue: ApiErrorCode }
>(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (error) {
      return rejectWithValue(errorCode(error));
    }
  },
  { condition: (_, { getState }) => getState().products.status !== RequestStatus.Loading },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productAdded(state, action: PayloadAction<SessionRecord<Product>>) {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.requestId = action.meta.requestId;
      state.status = RequestStatus.Loading;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (state.requestId !== action.meta.requestId) return;
      state.requestId = undefined;
      state.status = RequestStatus.Success;
      state.items = [...state.items.filter((item) => item.isLocal), ...action.payload];
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      if (state.requestId !== action.meta.requestId) return;
      state.requestId = undefined;
      state.status = RequestStatus.Error;
      state.error = action.payload || ApiErrorCode.Server;
    });
    builder.addCase(signedOut, () => initialState);
  },
});
export const { productAdded } = productsSlice.actions;
export default productsSlice.reducer;
