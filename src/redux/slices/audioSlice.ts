import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IAudioSlice {
   isSeek: boolean;
   duration: number;
   currentTime: number;
   volume: number;
   volumeBefore: number;
}

const initialState: IAudioSlice = {
   isSeek: false,
   duration: 0,
   currentTime: 0,
   volume: 50,
   volumeBefore: 0,
};

const audioSlice = createSlice({
   name: 'audio',
   initialState,
   reducers: {
      toggleVolume: (state) => {
         if (state.volume > 0) {
            state.volumeBefore = state.volume;
            state.volume = 0;
         } else if (state.volume !== state.volumeBefore) {
            state.volume = state.volumeBefore;
            state.volumeBefore = 0;
         } else {
            state.volume = 50;
            state.volumeBefore = 0;
         }
      },
      setVolume: (state, actions: PayloadAction<number>) => {
         state.volume = actions.payload;
      },
      setDuration: (state, actions: PayloadAction<number>) => {
         state.duration = actions.payload;
      },
      setCurrentTime: (state, actions: PayloadAction<number>) => {
         state.currentTime = actions.payload;
      },
      setSeek: (state, actions: PayloadAction<boolean>) => {
         state.isSeek = actions.payload;
      },
      resetAudio: (state) => {
         state.isSeek = false;
         state.duration = 0;
         state.currentTime = 0;
      },
   },
});

export const { setDuration, setCurrentTime, setSeek, resetAudio, setVolume, toggleVolume } =
   audioSlice.actions;

export default audioSlice.reducer;
