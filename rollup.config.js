'use strict';

import babel from 'rollup-plugin-babel';

export default {
  format: 'umd',
  moduleName: 'React',
  plugins: [
    babel({
      plugins: [
        'external-helpers',
      ],
    }),
  ],
};
