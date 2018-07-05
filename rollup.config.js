import resolve from "rollup-plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "./lib/index.js",
    output: {
      file: "./dist/cratebox.js",
      format: "cjs",
    },
    plugins: [resolve(), filesize()],
  },
  {
    input: "./lib/index.js",
    output: {
      file: "./dist/cratebox.umd.js",
      format: "umd",
      name: "cratebox",
    },
    plugins: [resolve(), uglify(), filesize()],
  },
  {
    input: "./lib/index.js",
    output: {
      file: "./dist/cratebox.module.js",
      format: "es",
    },
    plugins: [resolve(), filesize()],
  },
];
