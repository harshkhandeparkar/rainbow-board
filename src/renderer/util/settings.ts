import { SettingManager } from '../../common/code/settings';
import {
  THEME_SETTING,
  THEME_SETTING_KEY,
  THEME_SETTING_DEFAULT,
  CHANGELOG_SETTING,
  CHANGELOG_SETTING_KEY,
  CHANGELOG_SETTING_DEFAULT
} from '../../common/constants/settings';

export const themeSetting = new SettingManager<THEME_SETTING>(THEME_SETTING_KEY, THEME_SETTING_DEFAULT);
export const changelogSetting = new SettingManager<CHANGELOG_SETTING>(CHANGELOG_SETTING_KEY, CHANGELOG_SETTING_DEFAULT);
