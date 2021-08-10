import { themeSetting, customAccentColorSetting } from './settings';
import { themePlugins, boardPlugins } from './plugins';
import { ITheme, IThemeStylingOptions, ThemeCSS } from '../../common/types/theme';
import { RealDrawBoardTypes } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/RealDrawBoard';

export interface IThemeManagerOptions {
  customThemes?: {[themeName: string]: IThemeStylingOptions},
  customBoardOptions?: {[themeName: string]: RealDrawBoardTypes.RealDrawBoardOptions}
}

export type ThemeChangeEventListener = (newTheme: ITheme) => void;

class ThemeManager {
  themes: {
    [themeName: string]: string
  } = {
    light: 'Default Light',
    dark: 'Default Dark',
    'dark-whiteboard': 'Dark Whiteboard',
    'light-blackboard': 'Light Blackboard'
  }

  theme = 'light';

  static lightThemeCSS: ThemeCSS = {
    bgColor: 'white',
    bg1: 'white',
    bg2: 'white',
    highlight: '#e6e6e6',
    textColor: 'black',
    highlightTextColor: 'rgb(250, 129, 29)',
    borderColor: '#a6a6a6',
    globalCSS: '',
    customizableAccentColor: true
  }

  static darkThemeCSS: ThemeCSS = {
    bgColor: '#121212',
    bg1: '#202020',
    bg2: '#303030',
    highlight: '#303030',
    textColor: '#f1f1f1',
    highlightTextColor: 'rgb(250, 129, 29)',
    borderColor: '#404040',
    globalCSS: '',
    customizableAccentColor: true
  }


  themeCSS: {
    [themeName: string]: ThemeCSS
  } = {
    light: ThemeManager.lightThemeCSS,
    dark: ThemeManager.darkThemeCSS,
    'dark-whiteboard': ThemeManager.darkThemeCSS,
    'light-blackboard': ThemeManager.lightThemeCSS
  }

  static lightThemeBoardOptions: RealDrawBoardTypes.RealDrawBoardParameters = {
    bgColor: [1, 1, 1],
    toolSettings: {
      brushColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      fontColor: [0, 0, 0]
    }
  }

  static darkThemeBoardOptions: RealDrawBoardTypes.RealDrawBoardParameters = {
    bgColor: [0, 0, 0],
    toolSettings: {
      brushColor: [1, 1, 1],
      lineColor: [1, 1, 1],
      fontColor: [1, 1, 1]
    }
  }

  themeCustomBoardOptions: {
    [themeName: string]:  RealDrawBoardTypes.RealDrawBoardParameters
  } = {
    light: ThemeManager.lightThemeBoardOptions,
    dark: ThemeManager.darkThemeBoardOptions,
    'dark-whiteboard': ThemeManager.lightThemeBoardOptions,
    'light-blackboard': ThemeManager.darkThemeBoardOptions
  }

  themeChangeEventListeners: {[handlerName: string]: ThemeChangeEventListener} = {};

  constructor(options: IThemeManagerOptions) {
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

    this.theme = themeSetting.get();
  }

  _themeChanged() {
    const currentTheme = this.getTheme();

    for (let handlerName in this.themeChangeEventListeners) {
      this.themeChangeEventListeners[handlerName](currentTheme);
    }
  }

  getTheme(): ITheme {
    if (this.themeCSS[this.theme].customizableAccentColor) {
      this.themeCSS[this.theme].highlightTextColor = customAccentColorSetting.get();
    }

    return {
      theme: this.theme,
      name: this.themes[this.theme],
      css: this.themeCSS[this.theme],
      boardOptions: this.themeCustomBoardOptions[this.theme] || {}
    }
  }

  private _setTheme(theme: string) {
    this.theme = theme;
    themeSetting.set(this.theme);
    this._themeChanged();
  }

  setTheme(theme: string) {
    if (Object.keys(this.themes).includes(theme)) this._setTheme(theme);
  }

  onThemeChange(handlerName: string, handler: ThemeChangeEventListener) {
    if (!Object.keys(this.themeChangeEventListeners).includes(handlerName)) {
      this.themeChangeEventListeners[handlerName] = handler;
    }
  }

  offThemeChange(handlerName: string) {
    if (Object.keys(this.themeChangeEventListeners).includes(handlerName)) {
      delete this.themeChangeEventListeners[handlerName];
    }
  }
}

const options: IThemeManagerOptions = {
  customThemes: {},
  customBoardOptions: {}
}

themePlugins.forEach((plugin) => {
  for (let theme in plugin.code.customThemeCSS) {
    options.customThemes[theme] = plugin.code.customThemeCSS[theme];
  }
})

boardPlugins.forEach((plugin) => {
  for (let theme in plugin.code.customBoardOptions) {
    options.customBoardOptions[theme] = plugin.code.customBoardOptions[theme];
  }
})

export default new ThemeManager(options);
