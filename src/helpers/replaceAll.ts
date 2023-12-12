export const replaceAll = (str: string, pattern: string = ' ', replacement: string = '-') => {
   return str.replace(new RegExp(pattern, 'g'), replacement);
};

export const replaceBio = (chuoi: string) => {
   // Loại bỏ dấu \n
   chuoi = chuoi.replace(/\\n/g, ' ');

   // Loại bỏ dấu \
   chuoi = chuoi.replace(/\\/g, '');

   // Loại bỏ dấu <br>
   chuoi = chuoi.replace(/<br>/g, ' ');

   return chuoi;
};
