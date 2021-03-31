import { RealDrawBoardTypes } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/RealDrawBoard';

export type ThemeCSS = {
  /** Background color following https://material.io guidelines */
  bgColor: string,
  /** Level 1 surface background color following https://material.io guidelines */
  bg1: string,
  /** Level 2 surface background color following https://material.io guidelines */
  bg2: string,
  /** Highlight background color */
  highlight: string,
  /** Text color / Foreground color following https://material.io guidelines */
  textColor: string,
  /** Highlight/accent text color */
  highlightTextColor: string,
  /** Extra CSS globally */
  globalCSS: string
}

export interface IThemeStylingOptions {
  /** The theme name.id */
  theme: string,
  /** The theme display name */
  name: string,
  /** CSS associated with the theme */
  css: ThemeCSS
}

export interface ITheme extends IThemeStylingOptions {
  /** Custom whiteboard options */
  boardOptions: RealDrawBoardTypes.RealDrawBoardOptions
}
