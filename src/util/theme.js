import { setSetting, hasSetting, getSetting } from './settings';
import { themePlugin, themePluginExists } from './plugins';

/**
 * @typedef {Object} ThemeCSS
 * @property {string} bgColor Background color
 * @property {string} bg1 Level 1 surface color
 * @property {string} bg2 Level 2 surface color
 * @property {string} highlight Highlight color
 * @property {string} textColor
 */

/**
 * @typedef {'light' | 'dark'} Theme
 */

/**
 * @typedef {Object} ThemeManagerOptions
 * @property {ThemeCSS} customLightThemeCSS?
 * @property {ThemeCSS} customDarkThemeCSS?
 */

class ThemeManager {
  /** @type {Theme} */
  theme = 'light'

  /**
   * @type {{light: ThemeCSS, dark: ThemeCSS}}
   */
  themeCSS = {
    light: {
      bgColor: 'white',
      bg1: 'white',
      bg2: 'white',
      highlight: '#e6e6e6',
      textColor: 'black'
    },
    dark: {
      bgColor: '#121212',
      bg1: '#202020',
      bg2: '#303030',
      highlight: '#303030',
      textColor: '#f1f1f1'
    }
  }

  themeChangeEventListeners = {};

  /**
   *
   * @param {ThemeManagerOptions} options
   */
  constructor(options) {
    if (options.customLightThemeCSS) this.themeCSS.light = options.customLightThemeCSS
    if (options.customDarkThemeCSS) this.themeCSS.dark = options.customDarkThemeCSS;

    if (hasSetting('theme')) {
      const themeSetting = getSetting('theme');

      if (themeSetting === 'light') this.theme = themeSetting;
      else if (themeSetting === 'dark') this.theme = themeSetting;
      else setSetting('theme', this.theme);
    }
  }

  themeChanged() {
    const {theme, css} = this.getTheme();

    for (let handlerName in this.themeChangeEventListeners) {
      this.themeChangeEventListeners[handlerName](theme, css);
    }
  }

  getTheme() {
    return {
      theme: this.theme,
      css: this.themeCSS[this.theme]
    }
  }

  /**
   *
   * @param {Theme} theme
   */
  _setTheme(theme) {
    this.theme = theme;
    setSetting('theme', theme);
    this.themeChanged();
  }

  /**
   *
   * @param {Theme} theme
   */
  setTheme(theme) {
    if (theme === 'light') this._setTheme('light');
    else if (theme === 'dark') this._setTheme('dark');
  }

  toggleTheme() {
    if (this.theme === 'light') this._setTheme('dark');
    else if (this.theme === 'dark') this._setTheme('light');
  }

  /**
   * @param {string} handlerName
   * @param {(theme: Theme, css: ThemeCSS) => void} handler
   */
  onThemeChange(handlerName, handler) {
    if (!Object.keys(this.themeChangeEventListeners).includes(handlerName)) {
      this.themeChangeEventListeners[handlerName] = handler;
    }
  }

  offThemeChange(handlerName) {
    if (Object.keys(this.themeChangeEventListeners).includes(handlerName)) {
      delete this.themeChangeEventListeners[handlerName]
    }
  }
}

/**
 * @type {ThemeManagerOptions}
 */
const options = {};
if (themePluginExists) {
  if (Object.keys(themePlugin.plugin.customThemeCSS).includes('dark')) options.customDarkThemeCSS = themePlugin.plugin.customThemeCSS.dark;
  if (Object.keys(themePlugin.plugin.customThemeCSS).includes('light')) options.customLightThemeCSS = themePlugin.plugin.customThemeCSS.light;
}

export default new ThemeManager(options);
