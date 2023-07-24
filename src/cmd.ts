import { spawn } from 'node:child_process';

export async function cmd(command: string) {
    console.debug('cmd', command);
    const [name, ...args] = command.split(' ');
    await new Promise((resolve) => {
        const cp = spawn(name, args, {
            stdio: 'inherit',
            cwd: process.cwd(),
            env: process.env,
            shell: true,
        });
        cp.on('exit', () => resolve(cp));
    });
}