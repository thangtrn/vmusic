export function shuffleArray(array: ISong[], songId: string): ISong[] {
   const arr = [...array];
   for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   const song: ISong = arr.find((item) => item.id === songId)!;

   return [song, ...arr.filter((item) => item.id !== songId)];
}
