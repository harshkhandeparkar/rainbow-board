module.exports = {
  packagerConfig: {
    ignore: [
      // Thanks to https://regex101.com
      'node_modules\/(?!electron-is-dev|electron-squirrel-startup)[a-zA-Z\/\.\\\-]*'
    ]
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
