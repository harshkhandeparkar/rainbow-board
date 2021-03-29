import { ipcRenderer } from 'electron';
import { ThemeCSS, ThemeManagerOptions } from './theme';

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
 * @property {string} name
 * @property {PluginInfo} info
 * @property {PluginCode} plugin
 * @property {boolean} usable
 * @property {boolean} use
 */

/**
 * @type {Plugin[]}
 */
const plugins = ipcRenderer.sendSync('get-plugins');

export const themePlugins = plugins.filter((plugin) => {
  return plugin.info.modifiers.includes('CUSTOM_THEME') && plugin.usable && plugin.use;
})

export const boardPlugins = plugins.filter((plugin) => {
  return plugin.info.modifiers.includes('CUSTOM_BOARD_OPTIONS') && plugin.usable && plugin.use;
})

console.log(themePlugins);
