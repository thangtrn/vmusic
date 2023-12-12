export const secondToPercent = (currentTime: number, duration: number): number =>
   Number.isNaN((currentTime / duration) * 100) ? 0 : (currentTime / duration) * 100;

export const percentToSecond = (currentTime: number, duration: number): number => {
   return (currentTime * duration) / 100;
};

export default function pad2(number: number): string {
   return (number < 10 ? '0' : '') + number.toString();
}

export const durationTime = (seconds: number): string => {
   const minutes: number = Math.floor(seconds / 60);
   const remainingSeconds: number = Math.floor(seconds % 60);

   const formattedMinutes: string = pad2(minutes);
   const formattedSeconds: string = pad2(remainingSeconds);

   return `${formattedMinutes}:${formattedSeconds}`;
};

export function durationLongTime(seconds: number): string {
   const hours: number = Math.floor(seconds / 3600);
   const minutes: number = Math.floor((seconds % 3600) / 60);
   return `${hours > 0 ? hours + ' giờ ' : ''}${minutes} phút`;
}
