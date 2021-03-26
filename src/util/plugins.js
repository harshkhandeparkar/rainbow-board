import { ipcRenderer } from 'electron';

/**
 * @typedef {Object} ThemeCSS
 * @property {string} bgColor Background color
 * @property {string} bg1 Level 1 surface color
 * @property {string} bg2 Level 2 surface color
 * @property {string} highlight Highlight color
 * @property {string} textColor
 * @property {string} globalCSS
 */

/**
 * @typedef {Object} ThemeManagerOptions
 * @property {ThemeCSS} customLightThemeCSS?
 * @property {ThemeCSS} customDarkThemeCSS?
 */

/**
 * @typedef {'CUSTOM_THEME' | 'CUSTOM_BOARD_OPTIONS'} PluginModifier
 */

/**
 * @typedef {Object} PluginInfo
 * @property {string} name
 * @property {PluginModifier[]} modifiers
 */

/**
 * @typedef {Object} PluginCode
 * @property {ThemeManagerOptions} customThemeCSS?
 * @property {string} customGlobalCSS?
 * @property {Object} customBoardOptions?
 */

/**
 * @typedef {Object} Plugin
 * @property {PluginInfo} info
 * @property {PluginCode} plugin
 */

/**
 * @type {Plugin[]}
 */
const plugins = ipcRenderer.sendSync('get-plugins');

export const themePlugin = plugins.find((plugin) => {
  return plugin.info.modifiers.includes('CUSTOM_THEME');
})
export const themePluginExists = themePlugin !== undefined;

export const boardPlugin = plugins.find((plugin) => {
  return plugin.info.modifiers.includes('CUSTOM_BOARD_OPTIONS');
})

export const boardPluginExists = boardPlugin !== undefined;
