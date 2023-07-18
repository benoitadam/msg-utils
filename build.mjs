import { exec as _exec } from 'node:child_process';
import esbuild from 'esbuild';
import path from 'node:path';
import { promisify } from 'node:util';
import { readdir, rm, stat, readFile, writeFile } from 'node:fs/promises';

const GENERATED_MSG = '///// GENERATED FILE /////\n\n'

const exec = promisify(_exec);

async function esbuildBuild(outfile, options) {
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: outfile,
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'node',
    format: 'cjs',
    external: [
      'xmlhttprequest',
      'node:crypto',
    ],
    ...options,
  })
    .then(async () => {
      const size = await stat(outfile).then(s => s.size / 1000).catch(String);
      console.debug('result', outfile, size);
    })
    .catch((error) => {
      console.error('error', outfile, error);
      process.exit(1);
    });
}

export async function createIndex() {
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

  await writeFile(`src/index.ts`, GENERATED_MSG + allFiles.map(f => `export * from './${f}';\n`).join(''));
}

export async function clean() {
  await rm('build', { recursive: true }).catch(() => { });
  await rm('dist', { recursive: true }).catch(() => { });
}

export async function build() {
  console.debug('build');

  await exec('npx tsc');

  let typeTs = (await readFile('./dist/index.d.ts')).toString();
  typeTs = typeTs.replace(/(}\r?\n)?declare module \"(.+)\" \{/g, '');
  typeTs = 'declare module "msg-utils" {\n' + typeTs;
  await writeFile('./dist/index.d.ts', typeTs);

  await esbuildBuild('./dist/index.js', {
    target: ['node12', 'chrome58', 'firefox57', 'safari11', 'edge16'],
    format: 'cjs'
  });
}

export async function test() {
  await esbuildBuild('./build/all.spec.js', {
    minify: false,
    sourcemap: true,
    entryPoints: ['test/all.spec.ts']
  });
}

Promise.all(process.argv.map(async (arg) => {
  const fun = { createIndex, clean, build, test }[arg];
  if (fun) {
    const start = Date.now();
    console.debug(arg, 'start');
    await fun();
    console.debug(arg, Date.now() - start, 'ms');
  }
}));


// build('build/all.spec.js', {
//   ...nodeConfig,
//   minify: false,
//   sourcemap: true,
//   entryPoints: ['test/all.spec.ts']
// });










// const nodeJs = ['node12'];
// const newBrowsers = ['chrome61', 'firefox60', 'safari11', 'edge16'];
// const oldBrowsers = ['chrome58', 'firefox57', 'safari11', 'edge16'];

// build('dist/node.js', {
//   ...nodeConfig
// });

// build('./dist/node-cjs.js', { target: nodeJs, format: 'cjs' });
// build('./dist/browser-esm.js', { target: newBrowsers, format: 'esm' });
// build('./dist/browser-cjs.js', { target: oldBrowsers, format: 'cjs' });

// build('dist/index.js', {
//   target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
// });

// build('lib/index.esm.js', { format: 'esm', target: ['esnext'] });
// build('lib/index.node.js', { platform: 'node', target: ['node12'] });
// build('lib/index.node18.js', { platform: 'node', target: ['node18'] });
