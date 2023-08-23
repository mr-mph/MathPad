import copy from "rollup-plugin-copy-watch";
import typescript from "rollup-plugin-typescript2";

const devMode = process.env.DEV === "true";

export default {
  input: "src/script.ts",
  output: {
    file: "public/bundle.js",
    format: "iife", // Immediately Invoked Function Expression
    name: "bundle",
    sourcemap: devMode,
  },
  plugins: [
    typescript(),
    copy({
      targets: [
        { src: "src/index.html", dest: "public" },
        { src: "src/style.css", dest: "public" },
      ],
      watch: devMode && "src",
    }),
  ],
};
