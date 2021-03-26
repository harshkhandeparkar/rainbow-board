import { ipcRenderer } from 'electron';

/**
 * @typedef {Object} ThemeCSS
 * @property {string} bgColor Background color
 * @property {string} bg1 Level 1 surface color
 * @property {string} bg2 Level 2 surface color
 * @property {string} highlight Highlight color
 * @property {string} textColor
 */

/**
 * @typedef {Object} ThemeManagerOptions
 * @property {ThemeCSS} customLightThemeCSS?
 * @property {ThemeCSS} customDarkThemeCSS?
 */

/**
 * @typedef {Object} PluginInfo
 * @property {string} name
 * @property {('CUSTOM_THEME')[]} modifiers
 */

/**
 * @typedef {Object} PluginCode
 * @property {ThemeManagerOptions} customThemeCSS?
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
}) || {};

