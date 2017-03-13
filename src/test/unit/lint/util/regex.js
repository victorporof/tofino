// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import fs from 'fs-promise';

export async function regexFile(path, regexps) {
  const contents = await fs.readFile(path, 'utf8');
  let out = [];

  for (const regex of regexps) {
    let match = regex.exec(contents);

    while (match) {
      const [, ...captures] = match;
      const modules = captures.map(e => e.split('/')[0]);
      out = out.concat(modules);
      match = regex.exec(contents);
    }
  }
  return out;
}

export async function regexFiles(paths, ...regexps) {
  const matched = await Promise.all(paths.map(f => regexFile(f, regexps)));
  let out = [];
  for (const matches of matched) {
    out = out.concat(matches);
  }
  return Array.from(new Set(out));
}
