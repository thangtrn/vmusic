import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getListSongId } from '~/helpers';

export const appSelector = (state: RootState) => state.app;
export const audioSelector = (state: RootState) => state.audio;
export const musicSelector = (state: RootState) => state.music;
export const searchSelector = (state: RootState) => state.search;
export const userSelector = (state: RootState) => state.user;

export const currentSongSelector = createSelector(
   (state: RootState) => state.music.currentIndex,
   (state: RootState) => state.music.playlistSongs,
   (currentIndex, playlistSongs) => {
      return playlistSongs[currentIndex];
   },
);

export const isLoginSelector = createSelector(
   (state: RootState) => state.user.id,
   (id) => id?.trim()?.length > 0,
);

export const favoritesSelector = createSelector(
   (state: RootState) => state.user.favorites,
   (favorites) => getListSongId(favorites),
);
