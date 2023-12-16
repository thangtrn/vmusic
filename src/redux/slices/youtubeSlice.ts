import {
   createSlice,
   createAsyncThunk,
   ActionReducerMapBuilder,
   PayloadAction,
} from '@reduxjs/toolkit';
import { musicApi } from '~/axios';
import { RootState } from '../store';

export interface IYoutubeSlide {
   loading: boolean;
   value: string;
   result: ISong | null;
   history: ISong[];
}

const initialState: IYoutubeSlide = {
   loading: false,
   value: '',
   result: null,
   history: [],
};

const youtubeSlice = createSlice({
   name: 'searchYoutube',
   initialState,
   reducers: {
      setValueYtb: (state, action) => {
         state.value = action.payload;
      },
      clearSearchYtb: (state) => {
         state.loading = false;
         state.value = '';
         state.result = null;
      },
      clearHistoryYtb: (state) => {
         state.history = [];
      },
   },
   extraReducers: (builder: ActionReducerMapBuilder<IYoutubeSlide>) => {
      builder
         .addCase(fetchSearchYtb.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchSearchYtb.rejected, (state) => {
            state.loading = false;
         })
         .addCase(fetchSearchYtb.fulfilled, (state, action: PayloadAction<ISong>) => {
            state.result = action.payload;
            state.loading = false;
            state.history.push(action.payload);
         });
   },
});

export const fetchSearchYtb = createAsyncThunk(
   'searchYoutube/fetchSearchYtb',
   async (_, { getState }) => {
      const state = getState() as RootState;
      const res = await musicApi.fetchAudioFromYtb(state?.youtube?.value);
      return res.data?.metadata;
   },
);

export const { setValueYtb, clearSearchYtb, clearHistoryYtb } = youtubeSlice.actions;

export default youtubeSlice.reducer;
