export function getListSongId(songs: ISong[]) {
   const arr: ISong[] = [...songs];
   return arr.map((song) => song?.id);
}
