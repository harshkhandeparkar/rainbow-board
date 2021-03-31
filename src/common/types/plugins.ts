import { RealDrawBoardTypes } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/RealDrawBoard';
import { IThemeStylingOptions } from './theme';

/** Types of change the plugin can make */
export type PluginModifer = 'CUSTOM_THEME' | 'CUSTOM_BOARD_OPTIONS';

export interface IPluginInfo {
  /** Display name of the plugin */
  name: string,
  description: string,
  /** List of changes the plugin makes */
  modifiers: PluginModifer[]
}

export interface IPluginCode {
  /** Custom theme CSS */
  customThemeCSS?: {[themeName: string]: IThemeStylingOptions},
  /** Custom whiteboard options */
  customBoardOptions?: {[themeName: string]: RealDrawBoardTypes.RealDrawBoardOptions}
}

export interface IPlugin {
  name: string,
  info: IPluginInfo,
  code: IPluginCode,
  /** Whether the plugin is usable based on minimum version required */
  usable: boolean,
  /** Whether the plugin should be used or is disabled by the user */
  use: boolean
}
