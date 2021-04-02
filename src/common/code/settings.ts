import { hasSync, getSync, setSync } from 'electron-settings';

export class SettingManager<SettingType> {
  key: string;

  constructor(
    key: string,
    defaultValue: SettingType
  ) {
    this.key = key;

    if (!hasSync(key)) this.set(defaultValue as any);
  }

  get(): SettingType {
    return <unknown>getSync(this.key) as SettingType;
  }

  set(value: SettingType) {
    setSync(this.key, value as any);
  }
}
