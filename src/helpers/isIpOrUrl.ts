/*
    Some random RegExp from first Google result.
*/
const URL_REGEXP =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

export const isIpOrUrl = (v: string): boolean => {
  URL_REGEXP.lastIndex = 0; // Fix for regex test working every other time

  return URL_REGEXP.test(v);
};
