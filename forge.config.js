module.exports = {
  packagerConfig: {
    ignore: [
      // Thanks to https://regex101.com
      '^[\/]?node_modules\/(?!electron-is-dev|electron-squirrel-startup|ms)[a-zA-Z\/\.\\\-]*',
      '^[\/]?src/[a-zA-Z\/\.\\\-]*',
      '^[\/]?forge.config.js',
      '^[\/]?public\/(?!electron.js)[a-zA-Z\/\.\\\-]*'
    ],
    executableName: 'rainbow-board'
  },
  makers: [
    {
      name: '@electron-forge/maker-wix'
    },
    {
      name: '@electron-forge/maker-zip'
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Harsh Khandeparkar',
          homepage: 'https://harshkhandeparkar.github.io/rainbow-board',
          icon: 'public/logo512.png',
          name: 'rainbow-board',
          productName: 'Rainbow Board',
          genericName: 'Whiteboard',
          categories: ['Education', 'Utility']
        }
      }
    }
  ]
}
