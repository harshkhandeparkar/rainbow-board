const { author, name, description, productName, website, version } = require('./package.json');

module.exports = {
  packagerConfig: {
    ignore: [
      // Thanks to https://regex101.com
      '^[\/]?node_modules\/(?!electron-is-dev|ms|electron-settings)[a-zA-Z\/\.\\\-]*',
      '^[\/]?src/[a-zA-Z\/\.\\\-]*',
      '^[\/]?src',
      '^[\/]?img/[a-zA-Z\/\.\\\-]*',
      '^[\/]?img',
      '^[\/]?.github/[a-zA-Z\/\.\\\-]*',
      '^[\/]?.github',
      '^[\/]?forge.config.js'
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
