import { spawn } from 'node:child_process';

export const cmd = (command: string) => {
  const [name, ...args] = command.split(' ');
  return new Promise((resolve) => {
    const cp = spawn(name, args, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: process.env,
      shell: true,
    });
    cp.on('exit', () => resolve(cp));
  });
};
