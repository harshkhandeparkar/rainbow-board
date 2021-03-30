import { setSetting, hasSetting, getSetting } from './settings';
import { themePlugins, boardPlugins } from './plugins';

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
 * @property {{[themeName: string]: {options: Object}} customBoardOptions?
 */

/**
 * @typedef {Object} Theme
 * @property {string} theme The theme name
 * @property {string} name The theme display name
 * @property {ThemeCSS} css The theme CSS
 * @property {Object} boardOptions The theme custom board options
 */

class ThemeManager {
  /**
   * @type {{[themeName: string]: string}}
   */
  themes = {
    light: 'Default Light',
    dark: 'Default Dark',
    'dark-whiteboard': 'Dark Whiteboard',
    'light-blackboard': 'Light Blackboard'
  }

  theme = 'light';

  /**
   * @type {ThemeCSS}
   */
  static lightThemeCSS = {
    bgColor: 'white',
    bg1: 'white',
    bg2: 'white',
    highlight: '#e6e6e6',
    textColor: 'black',
    highlightTextColor: 'rgb(250, 129, 29)',
    globalCSS: ''
  }

  /**
   * @type {ThemeCSS}
   */
  static darkThemeCSS = {
    bgColor: '#121212',
    bg1: '#202020',
    bg2: '#303030',
    highlight: '#303030',
    textColor: '#f1f1f1',
    highlightTextColor: 'rgb(250, 129, 29)',
    globalCSS: ''
  }

  /**
   * @type {{light: ThemeCSS, dark: ThemeCSS}}
   */
  themeCSS = {
    light: ThemeManager.lightThemeCSS,
    dark: ThemeManager.darkThemeCSS,
    'dark-whiteboard': ThemeManager.darkThemeCSS,
    'light-blackboard': ThemeManager.lightThemeCSS
  }

  static lightThemeBoardOptions = {
    bgColor: [1, 1, 1],
    toolSettings: {
      brushColor: [0, 0, 0],
      lineColor: [0, 0, 0]
    }
  }

  static darkThemeBoardOptions = {
    bgColor: [0, 0, 0],
    toolSettings: {
      brushColor: [1, 1, 1],
      lineColor: [1, 1, 1]
    }
  }

  themeCustomBoardOptions = {
    light: ThemeManager.lightThemeBoardOptions,
    dark: ThemeManager.darkThemeBoardOptions,
    'dark-whiteboard': ThemeManager.lightThemeBoardOptions,
    'light-blackboard': ThemeManager.darkThemeBoardOptions
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

    if (options.customBoardOptions) {
      for (let theme in options.customBoardOptions) {
        this.themeCustomBoardOptions[theme] = options.customBoardOptions[theme];
      }
    }

    if (hasSetting('theme')) {
      const themeSetting = getSetting('theme');

      if (Object.keys(this.themes).includes(themeSetting)) this.theme = themeSetting;
      else setSetting('theme', this.theme);
    }
  }

  themeChanged() {
    const currentTheme = this.getTheme();

    for (let handlerName in this.themeChangeEventListeners) {
      this.themeChangeEventListeners[handlerName](currentTheme);
    }
  }

  /**
   *
   * @returns {Theme}
   */
  getTheme() {
    return {
      theme: this.theme,
      name: this.themes[this.theme],
      css: this.themeCSS[this.theme],
      boardOptions: this.themeCustomBoardOptions[this.theme] || {}
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
   * @param {(newTheme: Theme) => void} handler
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
const options = {
  customThemes: {},
  customBoardOptions: {}
}

themePlugins.forEach((plugin) => {
  for (let theme in plugin.plugin.customThemeCSS) {
    options.customThemes[theme] = plugin.plugin.customThemeCSS[theme];
  }
})

boardPlugins.forEach((plugin) => {
  for (let theme in plugin.plugin.customBoardOptions) {
    options.customBoardOptions[theme] = plugin.plugin.customBoardOptions[theme];
  }
})

export default new ThemeManager(options);
