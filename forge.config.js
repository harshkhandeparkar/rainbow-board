const { author, name, description, productName, website, version, dependencies } = require('./package.json');

let deps = '';

for (let dep in dependencies) deps += dep + '|';
deps = deps.slice(0, deps.length - 1);

module.exports = {
  packagerConfig: {
    ignore: [
      // Thanks to https://regex101.com
      `^[\/]?node_modules\/(?!${deps})[a-zA-Z\/\.\\\-]*`,
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
