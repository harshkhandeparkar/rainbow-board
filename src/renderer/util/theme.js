import { setSetting, hasSetting, getSetting } from './settings';
import { themePlugins } from './plugins';

/**
 * @typedef {Object} ThemeCSS
 * @property {string} bgColor Background color
 * @property {string} bg1 Level 1 surface color
 * @property {string} bg2 Level 2 surface color
 * @property {string} highlight Highlight color
 * @property {string} textColor
 * @property {string} highlightTextColor
 * @property {string} globalCSS
 */

/**
 * @typedef {Object} ThemeManagerOptions
 * @property {{[themeName: string]: {name: string, css: ThemeCSS}} customThemes?
 */

class ThemeManager {
  themes = {
    light: 'Default Light',
    dark: 'Default Dark'
  }

  theme = 'light';

  /**
   * @type {{light: ThemeCSS, dark: ThemeCSS}}
   */
  themeCSS = {
    light: {
      bgColor: 'white',
      bg1: 'white',
      bg2: 'white',
      highlight: '#e6e6e6',
      textColor: 'black',
      highlightTextColor: 'rgb(250, 129, 29)',
      globalCSS: ''
    },
    dark: {
      bgColor: '#121212',
      bg1: '#202020',
      bg2: '#303030',
      highlight: '#303030',
      textColor: '#f1f1f1',
      highlightTextColor: 'rgb(250, 129, 29)',
      globalCSS: ''
    }
  }

  themeChangeEventListeners = {};

  /**
   *
   * @param {ThemeManagerOptions} options
   */
  constructor(options) {
    if (options.customThemes) {
      for (let theme in options.customThemes) {
        this.themes[theme] = options.customThemes[theme].name;
        this.themeCSS[theme] = options.customThemes[theme].css;
      }
    }

    if (hasSetting('theme')) {
      const themeSetting = getSetting('theme');

      if (Object.keys(this.themes).includes(themeSetting)) this.theme = themeSetting;
      else setSetting('theme', this.theme);
    }
  }

  themeChanged() {
    const {theme, name, css} = this.getTheme();

    for (let handlerName in this.themeChangeEventListeners) {
      this.themeChangeEventListeners[handlerName](theme, css, name);
    }
  }

  getTheme() {
    return {
      theme: this.theme,
      name: this.themes[this.theme],
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
    if (Object.keys(this.themes).includes(theme)) this._setTheme(theme);
  }

  /**
   * @param {string} handlerName
   * @param {(theme: Theme, css: ThemeCSS, name: string) => void} handler
   */
  onThemeChange(handlerName, handler) {
    if (!Object.keys(this.themeChangeEventListeners).includes(handlerName)) {
      this.themeChangeEventListeners[handlerName] = handler;
    }
  }

  /**
   *
   * @param {string} handlerName
   */
  offThemeChange(handlerName) {
    if (Object.keys(this.themeChangeEventListeners).includes(handlerName)) {
      delete this.themeChangeEventListeners[handlerName];
    }
  }
}

/**
 * @type {ThemeManagerOptions}
 */
const options = {};

themePlugins.forEach((plugin) => {
  for (let theme in plugin.plugin.customThemeCSS) {
    options.customThemes[theme] = plugin.plugin.customThemeCSS[theme];
  }
})

export default new ThemeManager(options);
