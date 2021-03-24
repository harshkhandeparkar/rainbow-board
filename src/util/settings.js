import settings from 'electron-settings';

/**
 *
 * @param {string} key
 * @returns boolean
 */
export function hasSetting(key) {
  return settings.hasSync(key);
}

/**
 *
 * @param {string} key
 * @returns string
 */
export function getSetting(key) {
  if (hasSetting(key)) {
    return settings.getSync(key);
  }
  else return new Error(`Setting doesn't exist.`);
}

/**
 *
 * @param {string} key
 * @param {string} value
 */
export function setSetting(key, value) {
  settings.setSync(key, value);
}
