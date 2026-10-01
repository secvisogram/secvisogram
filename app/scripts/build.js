import { spawn } from 'child_process'

const webpackCommand = [
  'webpack',
  '--mode',
  'production',
  ...process.argv.slice(2),
].join(' ')

spawn(webpackCommand, {
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
  stdio: 'inherit',
  shell: true,
}).on('exit', (code) => {
  process.exit(code ?? 0)
})
