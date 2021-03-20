import { isElectron } from './isElectron';

let settings;
if (isElectron) {
  settings = window.electronSettingsModule;
}

/**
 *
 * @param {string} key
 * @returns boolean
 */
export function hasSetting(key) {
  if (isElectron) {
    return settings.hasSync(key);
  }
  else return document.cookie.includes(`${key}=`);
}

/**
 *
 * @param {string} key
 * @returns string
 */
export function getSetting(key) {
  if (hasSetting(key)) {
    if (isElectron) {
      return settings.getSync(key);
    }
    else {
      return document.cookie.split(';').find((keyValuePair) => {
        return keyValuePair.includes(key);
      }).split('=')[1]
    }
  }
  else return new Error(`Setting doesn't exist.`);
}

/**
 *
 * @param {string} key
 * @param {string} value
 */
export function setSetting(key, value) {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000); // expires in 1 month

  if (isElectron) {
    settings.setSync(key, value)
  }
  else document.cookie = `${key}=${value};expires=${expiryDate.toUTCString()}`;
}
