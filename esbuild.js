const package = require('./package.json');
const esbuild = require('esbuild');
const fs = require('fs');

function build(outfile, options) {
  esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: outfile,
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'node',
    format: 'cjs',
    ...options,
    define: {
      __VERSION: JSON.stringify(package.version),
    },
    external: [
      'xmlhttprequest',
      'node:crypto',
    ],
  })
    .then(() => {
      const size = fs.statSync(outfile).size / 1000;
      console.debug('result', outfile, size);
    })
    .catch((error) => {
      console.error('error', outfile, error);
      process.exit(1);
    });
}

const nodeConfig = {
  platform: 'node',
  target: ['node12'],
}

build('dist/node.js', {
  ...nodeConfig
});

build('dist/index.js', {
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
});

build('build/all.spec.js', {
  ...nodeConfig,
  minify: false,
  sourcemap: true,
  entryPoints: ['test/all.spec.ts']
});

// build('lib/index.esm.js', { format: 'esm', target: ['esnext'] });
// build('lib/index.node.js', { platform: 'node', target: ['node12'] });
// build('lib/index.node18.js', { platform: 'node', target: ['node18'] });
