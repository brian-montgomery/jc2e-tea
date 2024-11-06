import { readFileSync } from 'node:fs';
// import fg from "fast-glob";

export function i18nRemarkPlugin() {
  const data = readFileSync('./src/content/i18n/en.json');
  const translations = JSON.parse(data);

  return function (tree, file) {
      file.data.astro.frontmatter._ = translations;
  };
}