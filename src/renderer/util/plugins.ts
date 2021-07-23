// import { ipcRenderer } from 'electron';
import { IPlugin } from '../../common/types/plugins';

// const plugins: IPlugin[] = ipcRenderer.sendSync('get-plugins');
const plugins: IPlugin[] = [];

export const themePlugins = plugins.filter((plugin) => {
  return plugin.info.modifiers.includes('CUSTOM_THEME') && plugin.usable && plugin.use;
})

export const boardPlugins = plugins.filter((plugin) => {
  return plugin.info.modifiers.includes('CUSTOM_BOARD_OPTIONS') && plugin.usable && plugin.use;
})
