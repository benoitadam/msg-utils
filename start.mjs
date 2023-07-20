import { spawn } from 'node:child_process';
import { readdir, rm, stat, writeFile } from 'node:fs/promises';

const GENERATED_MSG = '///// GENERATED FILE /////\n\n'

async function shell(command) {
  console.debug('shell', command);
  const start = Date.now();
  const [name, ...args] = command.split(' ');
  await new Promise((resolve) => {
    spawn(name, args, {
      stdio: 'inherit',
      cwd: undefined,
      env: process.env,
      shell: true
    }).on('exit', resolve);
  });
  console.debug('shell time', Date.now() - start, 'ms');
}

async function registers(funs) {
  const commands = [...process.argv].splice(2);
  if (commands.length === 0) commands.push('start');
  console.debug('commands', commands);
  for (const arg of commands) {
    if (funs[arg]) {
      const start = Date.now();
      console.debug(arg, 'start');
      await funs[arg]();
      console.debug(arg, Date.now() - start, 'ms');
    }
  }
}

export async function generate() {
  let allFiles = [];
  const dirs = await readdir('src');

  for (const dir of dirs) {
    const dirPath = `src/${dir}`;

    const isDir = await stat(dirPath).then(s => s.isDirectory()).catch(() => false);
    if (!isDir) continue;

    const files = (await readdir(dirPath)).filter(f => f !== 'index.ts').map(f => f.replace('.ts', ''));
    console.debug('dir', dirPath, files.length);
    await writeFile(`${dirPath}/index.ts`, GENERATED_MSG + files.map(f => `export * from './${f}';\n`).join(''));

    allFiles = [...allFiles, ...files.map(name => `${dir}/${name}`)];

    // await writeFile(`${dir}.ts`, `${GENERATED_MSG}export * from './src/${dir}';\n`);
  }

  // await writeFile(`src/index.ts`, GENERATED_MSG + allFiles.map(f => `export * from './${f}';\n`).join(''));
}

export async function clean() {
  await rm('build', { recursive: true }).catch(() => { });
  await rm('lib', { recursive: true }).catch(() => { });
}

export async function build() {
  await clean();
  await shell('tsc -p tsconfig.json');
  await shell('tsc -p tsconfig-cjs.json');
}

export async function test() {
  await clean();
  await shell('tsc -p tsconfig-test.json');
  await shell('jest ./build/test/all.spec.js --verbose');
}

export async function prettify() {
  await shell('prettier --write \"./src/**/*.{js,jsx,ts,tsx,json}\"');
  await shell('prettier --write \"./test/**/*.{js,jsx,ts,tsx,json}\"');
}

export async function publish() {
  await build();
  await shell('npm publish --access public');
}

registers({ generate, clean, build, test, prettify, publish });
