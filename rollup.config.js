'use strict';

import alias from './rollup-plugin-exact-alias';
import babel from 'rollup-plugin-babel';

const moduleMap = require('./module-map.json');

export default {
  format: 'umd',
  moduleName: 'React',
  plugins: [
    alias(moduleMap),
    babel({
      plugins: [
        'external-helpers',
      ],
    }),
  ],
};
