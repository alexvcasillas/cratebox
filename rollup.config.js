import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'lib/index.js',
    output: {
      name: 'store',
      file: `dist/store.${pkg.version}.umd.js`,
      format: 'umd'
    },
    plugins: [
      resolve(), // so Rollup can find `store`
      commonjs(), // so Rollup can convert `store` to an ES module
      uglify(),
      filesize()
    ]
  },
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'lib/index.js',
    external: ['ms'],
    output: [
      { file: `dist/store.${pkg.version}.cjs.js`, format: 'cjs' },
      { file: `dist/store.${pkg.version}.esm.js`, format: 'es' }
    ],
    plugins: [uglify(), filesize()]
  }
];
