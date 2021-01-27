const { author, name, description, productName, website, version } = require('./package.json');

module.exports = {
  packagerConfig: {
    ignore: [
      // Thanks to https://regex101.com
      '^[\/]?node_modules\/(?!electron-is-dev|ms)[a-zA-Z\/\.\\\-]*',
      '^[\/]?src/[a-zA-Z\/\.\\\-]*',
      '^[\/]?forge.config.js',
      '^[\/]?public\/(?!electron.js)[a-zA-Z\/\.\\\-]*'
    ],
    executableName: name
  },
  makers: [
    {
      name: '@electron-forge/maker-zip'
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: author.name,
          homepage: website,
          icon: 'public/logo512.png',
          name,
          productName,
          version,
          description,
          genericName: 'Whiteboard',
          categories: ['Utility']
        }
      }
    }
  ]
}
