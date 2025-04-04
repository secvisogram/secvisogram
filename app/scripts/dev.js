import { spawn } from 'child_process'
import * as os from 'os'

const command = /^win/.test(os.platform())
  ? `webpack serve --mode development --port=%npm_config_port%`
  : `webpack serve --mode development --port=$npm_config_port`

spawn(command, {
  stdio: 'inherit',
  shell: true,
}).on('exit', (code) => {
  process.exit(code ?? 0)
})
