import packageFile from '../../../package.json';
import { SettingManager } from '../../common/code/settings';
import { THEME_SETTING, THEME_SETTING_KEY, CHANGELOG_SETTING, CHANGELOG_SETTING_KEY } from '../../common/constants/settings';

export const themeSetting = new SettingManager<THEME_SETTING>(THEME_SETTING_KEY, 'light');
export const changelogSetting = new SettingManager<CHANGELOG_SETTING>(CHANGELOG_SETTING_KEY, packageFile.version);
