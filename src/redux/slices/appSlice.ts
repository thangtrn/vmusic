import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { musicApi } from '~/axios';

export interface IAppSlide {
   loading: boolean;
   error: boolean;
   home: ISection[];
}

const initialState: IAppSlide = {
   loading: false,
   error: false,
   home: [],
};

const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setStartLoading: (state) => {
         state.loading = true;
         state.error = false;
      },
      setEndLoading: (state) => {
         state.loading = false;
         state.error = false;
      },
      setError: (state) => {
         state.loading = false;
         state.error = true;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchHome.pending, (state) => {
            state.loading = true;
            state.error = true;
         })
         .addCase(fetchHome.rejected, (state) => {
            state.loading = false;
            state.error = true;
         })
         .addCase(fetchHome.fulfilled, (state, action: PayloadAction<ISection[]>) => {
            state.loading = false;
            state.error = false;
            state.home = action.payload;
         });
   },
});

export const fetchHome = createAsyncThunk('music/fetchHome', async () => {
   const res = await musicApi.fetchHome();
   return res.data?.metadata;
});

export const { setStartLoading, setEndLoading, setError } = appSlice.actions;

export default appSlice.reducer;
