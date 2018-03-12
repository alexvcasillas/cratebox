import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';

export default [
  {
    input: './lib/index.js',
    output: {
      file: './dist/typestore.js',
      format: 'cjs'
    },
    plugins: [resolve(), filesize()]
  },
  {
    input: './lib/index.js',
    output: {
      file: './dist/typestore.umd.js',
      format: 'umd',
      name: 'typeStore'
    },
    plugins: [resolve(), uglify(), filesize()]
  },
  {
    input: './lib/index.js',
    output: {
      file: './dist/typestore.module.js',
      format: 'es'
    },
    plugins: [resolve(), filesize()]
  }
];
