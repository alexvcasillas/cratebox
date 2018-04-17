import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: './core/index.js',
    output: {
      file: './dist/cratebox.js',
      format: 'cjs',
    },
    plugins: [resolve(), babel(), uglify(), filesize()],
  },
  {
    input: './core/index.js',
    output: {
      file: './dist/cratebox.umd.js',
      format: 'umd',
      name: 'cratebox',
    },
    plugins: [resolve(), babel(), uglify(), filesize()],
  },
  {
    input: './core/index.js',
    output: {
      file: './dist/cratebox.module.js',
      format: 'es',
    },
    plugins: [resolve(), babel(), uglify(), filesize()],
  },
];
