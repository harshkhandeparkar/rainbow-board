import packageFile from '../../../package.json';

export const PLUGINS_SETTING_KEY = 'plugins';
export type PLUGINS_SETTING = string[];
export const PLUGINS_SETTING_DEFAULT: PLUGINS_SETTING = [];

export const CHANGELOG_SETTING_KEY = 'lastVersionChangelogShown';
export type CHANGELOG_SETTING = string;
export const CHANGELOG_SETTING_DEFAULT: CHANGELOG_SETTING = packageFile.version;

export const THEME_SETTING_KEY = 'theme';
export type THEME_SETTING = string;
export const THEME_SETTING_DEFAULT: THEME_SETTING = 'light';

export const START_FULLSCREEN_SETTING_KEY = 'startFullscreen';
export type START_FULLSCREEN_SETTING = boolean;
export const START_FULLSCREEN_SETTING_DEFAULT = false;

export const START_MAXIMIZED_SETTING_KEY = 'startMaximized';
export type START_MAXIMIZED_SETTING = boolean;
export const START_MAXIMIZED_SETTING_DEFAULT = true;

export const SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_KEY = 'showMenuBarWhenFullscreen';
export type SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING = boolean;
export const SHOW_MENU_BAR_WHEN_FULLSCREEN_SETTING_DEFAULT = true;

