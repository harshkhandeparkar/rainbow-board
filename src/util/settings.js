/**
 *
 * @param {string} key
 * @returns boolean
 */
export function hasSetting(key) {
  return document.cookie.includes(`${key}=`);
}

/**
 *
 * @param {string} key
 * @returns string
 */
export function getSetting(key) {
  return document.cookie.split(';').find((keyValuePair) => {
    return keyValuePair.includes(key);
  }).split('=')[1]
}

/**
 *
 * @param {string} key
 * @param {string} value
 */
export function setSetting(key, value) {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000); // expires in 1 month

  document.cookie = `${key}=${value};expires=${expiryDate.toUTCString()}`;
}
