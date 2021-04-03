import { hasSync, getSync, setSync } from 'electron-settings';
import {
  START_FULLSCREEN_SETTING,
  START_FULLSCREEN_SETTING_KEY,
  START_FULLSCREEN_SETTING_DEFAULT,
  START_MAXIMIZED_SETTING,
  START_MAXIMIZED_SETTING_KEY,
  START_MAXIMIZED_SETTING_DEFAULT,
  SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING,
  SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_KEY,
  SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_DEFAULT
} from '../constants/settings';

export class SettingManager<SettingType> {
  key: string;
  value: SettingType;

  constructor(
    key: string,
    defaultValue: SettingType
  ) {
    this.key = key;

    if (!hasSync(key)) this.set(defaultValue as any);
    this.value = <unknown>getSync(this.key) as SettingType;
  }

  get(): SettingType {
    return this.value;
  }

  set(value: SettingType) {
    this.value = value;
    setSync(this.key, value as any);
  }
}

export const startFullscreenSetting = new SettingManager<START_FULLSCREEN_SETTING>(START_FULLSCREEN_SETTING_KEY, START_FULLSCREEN_SETTING_DEFAULT);
export const startMaximizedSetting = new SettingManager<START_MAXIMIZED_SETTING>(START_MAXIMIZED_SETTING_KEY, START_MAXIMIZED_SETTING_DEFAULT);
export const showMenuBarWhenFullscreenSetting = new SettingManager<SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING>(SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_KEY, SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_DEFAULT);
