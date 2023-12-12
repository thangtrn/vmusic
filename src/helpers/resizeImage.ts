export const resizeImage = (
   url: string,
   pattern: string = 'w165_r1x1_jpeg',
   replacement: string = 'w600_r1x1_jpeg',
): string => {
   return url.replace(pattern, replacement);
};
