import settings from 'electron-settings';

export function hasSetting(key: string) {
  return settings.hasSync(key);
}

export function getSetting(key: string) {
  if (hasSetting(key)) {
    return settings.getSync(key);
  }
  else return new Error(`Setting doesn't exist.`);
}

export function setSetting(key: string, value: any) {
  settings.set(key, value);
}
