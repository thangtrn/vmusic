import { YTB_TAG } from '~/utils';

export const renderSongUrl = (song: ISong) => {
   if (song?.tag === YTB_TAG) return song.songUrl;
   else if (song?.tag === null || song?.tag?.toString().length <= 0) {
      return song?.songUrl;
   }
   return `http://api.mp3.zing.vn/api/streaming/audio/${song?.tag}/320`;
};
