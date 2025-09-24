/** @type {import('prettier').Config} */
module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  semi: false,
  endOfLine: process.platform === 'win32' ? 'auto' : 'lf',
}
