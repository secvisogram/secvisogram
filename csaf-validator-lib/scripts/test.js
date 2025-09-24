#!/usr/bin/env node

import { spawn } from 'child_process'
import { fileURLToPath } from 'url'

spawn('mocha', ['tests', 'tests/csaf_2_1', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    DICPATH: fileURLToPath(new URL('../tests/dicts', import.meta.url)),
    WORDLIST: fileURLToPath(
      new URL('../tests/dicts/csaf_words.txt', import.meta.url)
    ),
  },
})
