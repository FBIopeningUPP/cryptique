import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(js|jsx)$/.test(name) && !name.includes('.test.') ? [path] : [];
  });
}

describe('asset references', () => {
  it('point at files that exist in public/assets', () => {
    const missing = [];
    for (const file of sourceFiles('src')) {
      for (const [, name] of readFileSync(file, 'utf8').matchAll(/asset\('([^']+)'\)/g)) {
        if (!existsSync(join('public/assets', `${name}.webp`))) missing.push(`${file}: ${name}`);
      }
    }
    expect(missing).toEqual([]);
  });
});
