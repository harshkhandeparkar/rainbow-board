import { ipcRenderer } from 'electron';
import { GET_PLUGINS } from '../../common/constants/events';
import { IPlugin } from '../../common/types/plugins';

const plugins: IPlugin[] = ipcRenderer.sendSync(GET_PLUGINS);

export const themePlugins = plugins.filter((plugin) => {
  return plugin.info.modifiers.includes('CUSTOM_THEME') && plugin.usable && plugin.use;
})

export const boardPlugins = plugins.filter((plugin) => {
  return plugin.info.modifiers.includes('CUSTOM_BOARD_OPTIONS') && plugin.usable && plugin.use;
})
