import { registers } from '..';

export const cmd = async (command: string) => {
  const { spawn } = registers.child_process!;
  const [name, ...args] = command.split(' ');
  return await new Promise((resolve) => {
    const cp = spawn(name, args, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: process.env,
      shell: true,
    });
    cp.on('exit', () => resolve(cp));
  });
};
