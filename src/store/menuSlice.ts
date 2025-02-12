import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { menuService } from '../services/menuService';
import type { MenuItem, MenuResponse } from '../types/menu';

interface MenuState {
  items: MenuItem[];
  branch: MenuResponse['branch'] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  branch: null,
  status: 'idle',
  error: null,
};

export const fetchBranchMenu = createAsyncThunk<
  MenuResponse,
  string,
  { rejectValue: string }
>('menu/fetchBranchMenu', async (restaurantId, { rejectWithValue }) => {
  try {
    return await menuService.getBranchMenu(restaurantId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Error desconocido'
    );
  }
});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBranchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.branch = action.payload.branch;
      })
      .addCase(fetchBranchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Error desconocido';
      });
  },
});

export default menuSlice.reducer;
