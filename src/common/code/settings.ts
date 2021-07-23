// import { hasSync, getSync, setSync } from 'electron-settings';
import {
  START_FULLSCREEN_SETTING,
  START_FULLSCREEN_SETTING_KEY,
  START_FULLSCREEN_SETTING_DEFAULT,

  START_MAXIMIZED_SETTING,
  START_MAXIMIZED_SETTING_KEY,
  START_MAXIMIZED_SETTING_DEFAULT,

  SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING,
  SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_KEY,
  SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_DEFAULT,

  USE_GNOME_STYLE_HEADERBAR_SETTING,
  USE_GNOME_STYLE_HEADERBAR_SETTING_KEY,
  USE_GNOME_STYLE_HEADERBAR_SETTING_DEFAULT
} from '../constants/settings';

export class SettingManager<SettingType> {
  key: string;
  cache: boolean;
  value: SettingType;

  constructor(
    key: string,
    defaultValue: SettingType,
    cache: boolean = true
  ) {
    this.key = key;
    this.cache = cache;

    // if (!hasSync(key)) this.set(defaultValue as any);
    // if (this.cache) this.value = <unknown>getSync(this.key) as SettingType;
    this.set(defaultValue as SettingType);
  }

  get(): SettingType {
    // if (this.cache) return this.value;
    // else return <unknown>getSync(this.key) as SettingType;
    return this.value;
  }

  set(value: SettingType) {
    // if (this.cache) this.value = value;
    // setSync(this.key, value as any);
    this.value = value;
  }
}

/** SETTING: Whether to start in fullscreen */
export const startFullscreenSetting = new SettingManager<START_FULLSCREEN_SETTING>(START_FULLSCREEN_SETTING_KEY, START_FULLSCREEN_SETTING_DEFAULT, false);
/** SETTING: Whether to start maximized */
export const startMaximizedSetting = new SettingManager<START_MAXIMIZED_SETTING>(START_MAXIMIZED_SETTING_KEY, START_MAXIMIZED_SETTING_DEFAULT, false);
/** SETTING: Whether to show menubar in fullscreen mode */
export const showMenuBarWhenFullscreenSetting = new SettingManager<SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING>(SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_KEY, SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_DEFAULT, false);
/** SETTING: GNOME style headerbar */
export const useGnomeStyleHeaderbarSetting = new SettingManager<USE_GNOME_STYLE_HEADERBAR_SETTING>(USE_GNOME_STYLE_HEADERBAR_SETTING_KEY, USE_GNOME_STYLE_HEADERBAR_SETTING_DEFAULT, true);
