import { execSync } from 'child_process';
import esbuild from 'esbuild';
import { statSync, readFileSync, writeFileSync } from 'fs';

function build(outfile, options) {
  esbuild.build({
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
    .then(() => {
      const size = statSync(outfile).size / 1000;
      console.debug('result', outfile, size);
    })
    .catch((error) => {
      console.error('error', outfile, error);
      process.exit(1);
    });
}

build('./dist/index.js', {
  target: ['node12', 'chrome58', 'firefox57', 'safari11', 'edge16'],
  format: 'cjs'
});

build('./build/all.spec.js', {
  minify: false,
  sourcemap: true,
  entryPoints: ['test/all.spec.ts']
});

execSync('npx tsc');

let typeTs = readFileSync('./dist/index.d.ts').toString();
typeTs = typeTs.replace(/(}\r?\n)?declare module \"(.+)\" \{/g, '');
typeTs = 'declare module "msg-utils" {\n' + typeTs;
writeFileSync('./dist/index.d.ts', typeTs);

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
