let session;

if (navigator.userAgent.includes('electron')) session = require('electron').session;

/**
 *
 * @param {string} key
 * @returns boolean
 */
export async function hasCookie(key) {
  if (navigator.userAgent.includes('electron')) {
    const cookies = await session.defaultSession.cookies.get({});

    return cookies.find((cookie) => cookie.name === key) !== undefined;
  }
  else return document.cookie.includes(`${key}=`);
}

/**
 *
 * @param {string} key
 * @returns string
 */
export async function getCookie(key) {
  if (await hasCookie(key)) {
    if (navigator.userAgent.includes('electron')) {
      const cookies = await session.defaultSession.cookies.get({});

      return cookies.find((cookie) => cookie.name === key).value;
    }
    else return document.cookie.split(';').find((keyValuePair) => {
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
  if (navigator.userAgent.includes('electron')) {
    session.defaultSession.cookies.set({
      name: key,
      value: value
    })
  }
  else document.cookie = `${key}=${value}`;
}
