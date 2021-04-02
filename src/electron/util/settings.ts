import { SettingManager } from '../../common/code/settings';
import {
  PLUGINS_SETTING,
  PLUGINS_SETTING_KEY,
  PLUGINS_SETTING_DEFAULT
} from '../../common/constants/settings';

export const pluginsSetting = new SettingManager<PLUGINS_SETTING>(PLUGINS_SETTING_KEY, PLUGINS_SETTING_DEFAULT);
