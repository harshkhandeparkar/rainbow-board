import packageFile from '../../../package.json';
import { SettingManager } from '../../common/code/settings';
import { THEME_SETTING, THEME_SETTING_KEY, CHANGELOG_SETTING, CHANGELOG_SETTING_KEY } from '../../common/constants/settings';
import { defaultTheme } from './theme';

export const themeSetting = new SettingManager<THEME_SETTING>(THEME_SETTING_KEY, defaultTheme);
export const changelogSetting = new SettingManager<CHANGELOG_SETTING>(CHANGELOG_SETTING_KEY, packageFile.version);
