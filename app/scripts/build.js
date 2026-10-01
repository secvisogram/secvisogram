import { spawn } from 'child_process'

spawn('webpack', ['--mode', 'production', ...process.argv.slice(2)], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
  stdio: 'inherit',
}).on('exit', (code) => {
  process.exit(code ?? 0)
})
