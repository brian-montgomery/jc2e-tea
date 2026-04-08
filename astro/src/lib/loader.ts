import type { Loader } from "astro/loaders";

import { file } from 'astro/loaders';

interface CSVLoaderOpts {
  filename: string;
}

export function csvLoader({
  filename,
}: CSVLoaderOpts): Loader {
  return file(filename, {
    parser: (fileContent) => {
      return parse(fileContent.trim(), {
        columns: true,
        group_columns_by_name: true,
        skip_empty_lines: true,
      });
    }
  })
}
