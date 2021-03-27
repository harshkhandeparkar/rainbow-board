const { existsSync, mkdirSync } = require('fs');
const { hasSync, getSync, set } = require('electron-settings');
const { version } = require('../package.json');
const { gte } = require('semver');
const path = require('path');

module.exports = function loadPlugins(plugins, pluginsDir) {
  if (hasSync('plugins')) {
    const pluginNames = getSync('plugins');

    if (!existsSync(pluginsDir)) {
      mkdirSync(pluginsDir);
    }

    pluginNames.forEach((name) => {
      if (existsSync(path.join(pluginsDir, name))) {
        const info = eval(`require('${path.join(pluginsDir, name, 'plugin.json')}')`);
        const plugin = eval(`require('${path.join(pluginsDir, name, 'plugin.js')}')`);

        plugins.push({
          name,
          info,
          plugin,
          usable: gte(version, info.minRBVersion)
        })
      }
    })
  }
  else set('plugins', []);
}
