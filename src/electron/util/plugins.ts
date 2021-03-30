import { existsSync, mkdirSync } from 'fs';
import { hasSync, getSync, set } from 'electron-settings';
import packageFile from '../../../package.json';
import { gte } from 'semver';
import * as path from 'path';
import { pluginsDir } from '../constants/paths';
import { Plugin } from '../../renderer/util/plugins';


// Thanks to: https://hackernoon.com/building-isomorphic-javascript-packages-1ba1c7e558c5
const dynamicRequire = __non_webpack_require__;
const { version } = packageFile;

export function loadPlugins(plugins: Plugin[]) {
  if (hasSync('plugins')) {
    const pluginNames: string[] = <string[]>getSync('plugins');

    if (!existsSync(pluginsDir)) {
      mkdirSync(pluginsDir);
    }

    pluginNames.forEach((name) => {
      if (existsSync(path.join(pluginsDir, name))) {
        const info = dynamicRequire(path.join(pluginsDir, name, 'plugin.json'));
        const plugin = dynamicRequire(path.join(pluginsDir, name, 'plugin.js'));

        plugins.push({
          name,
          info,
          plugin,
          usable: gte(version, info.minRBVersion),
          use: true
        })
      }
    })
  }
  else set('plugins', []);
}
