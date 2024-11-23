import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/src/**/post_domain.test.ts'], // テストファイルのパターン
    exclude: ['**/node_modules'], // 除外するディレクトリ
    coverage: {
      exclude: [
        '**/set.test.ts',
        'node_modules/**',
        '**/*.d.ts',
        '!**/*.test.ts',
        '**__tests__*',
        '**/*tests.ts',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
        '**/*.{ts,js,mts,mjs,cjs,astro,vue,tsx,svelte}',
      ],
    },
  },
})