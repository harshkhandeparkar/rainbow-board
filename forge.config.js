const { join } = require('path');

module.exports = {
  packagerConfig: {
    ignore: function (path) {
      if (
          path.startsWith(join('/', 'node_modules', 'electron-is-dev')) ||
          path.startsWith(join('/', 'node_modules', 'electron-squirrel-startup')) ||
          path.startsWith(join('/', 'public', 'electron.js')) ||
          path.startsWith(join('/', 'package.json')) ||
          path.startsWith(join('/', 'LICENSE')) ||
          path.startsWith(join('/', 'build'))
      ) {
        console.log(path);
        return false;
      }
      else return true;

      // return (
      //   !path.startsWith(join('/', 'node_modules', 'electron-is-dev')) &&
      //   !path.startsWith(join('/', 'public')) &&
      //   !path.startsWith(join('/', 'package.json')) &&
      //   !path.startsWith(join('/', 'LICENSE')) &&
      //   !path.startsWith(join('/', 'dist')) &&
      //   !path.startsWith(join('/', '.git'))
      // )
    }
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'rainbow_board'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin',
        'linux'
      ]
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Harsh Khandeparkar',
          homepage: 'https://harshkhandeparkar.github.io/rainbow-board'
        }
      }
    }
  ]
}
