import { spawn } from 'node:child_process';
import { readdir, rm, stat, writeFile } from 'node:fs/promises';

const GENERATED_MSG = '///// GENERATED FILE /////\n\n'

const argv = Object.fromEntries(process.argv.map(a => [a, true]));

/** @returns {Promise<ChildProcess>} */
function cmd(command) {
  console.debug('cmd', command);
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
}

if (argv.generate) {
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

if (argv.clean || argv.build || argv.test || argv.release) {
  await rm('build', { recursive: true }).catch(() => { });
  await rm('lib', { recursive: true }).catch(() => { });
}

if (argv.prettify) {
  await cmd('prettier --write \"./src/**/*.{js,jsx,ts,tsx,json}\"');
  await cmd('prettier --write \"./test/**/*.{js,jsx,ts,tsx,json}\"');
}

if (argv.build || argv.release) {
  await generate();
  await cmd('tsc -p tsconfig.json');
  await cmd('tsc -p tsconfig-cjs.json');
}

if (argv.test || argv.release) {
  await cmd('tsc -p tsconfig-test.json');
  await cmd('jest ./build/test/all.spec.js --verbose');
}

if (argv.release) {
  await cmd('npm publish --access public');
}