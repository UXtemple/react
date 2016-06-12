'use strict';

const fs = require('fs');
const glob = require('glob');
const PROVIDES_MODULE = /\*\s*@providesModule\s*(.+)/;

glob(process.argv[2] || './**/*.js', (error, files) => {
  if (error) {
    return console.error(error);
  }

  const aliases = {};

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const providesModule = content.match(PROVIDES_MODULE);

    if (providesModule) {
      aliases[providesModule[1]] = file;
    }
  });

  console.log(JSON.stringify(aliases));
});
