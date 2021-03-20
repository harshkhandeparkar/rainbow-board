/**
 *
 * @param {string} key
 * @returns boolean
 */
export function hasCookie(key) {
  return document.cookie.includes(`${key}=`);
}

/**
 *
 * @param {string} key
 * @returns string
 */
export function getCookie(key) {
  if (hasCookie(key)) {
    return document.cookie.split(';').find((keyValuePair) => {
      return keyValuePair.includes(key);
    }).split('=')[1];
  }
  else return new Error(`Cookie doesn't exist.`);
}

/**
 *
 * @param {string} key
 * @param {string} value
 */
export function setCookie(key, value) {
  document.cookie = `${key}=${value}`;
}
