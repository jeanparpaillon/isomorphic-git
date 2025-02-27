import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        ".history",
        "dist/",
        "**/*.mjs",
        "__tests__/__fixtures__",
        "docs",
        "node_modules",
        "website",
        "__tests__/__examples__",
        "coverage",
        "http",
        "index.js",
        "internal-apis.js",
        "index.umd.min.js",
        "internal-apis.umd.min.js",
        "junit",
    ],
}];