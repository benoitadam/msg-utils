import esbuild, { BuildOptions } from 'esbuild';
import { rm, stat, readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { valueBy } from './record/groupBy';
import { cmd } from './cmd';

export interface BuildConfig extends BuildOptions {
  entryPoints: Record<string, string>;
  babelEs5?: boolean;
  host?: string;
  port?: number;
}

export interface BuilderConfig {
  version: string;
  prefix: string;
  time: number;
  clean: string[];
  alias: Record<string, string>;
  build: BuildConfig;
  serve: BuildConfig;
  commands: Record<string, (...args: any[]) => void | Promise<void>>;
  title: string;
}

export const DEFAULT_INDEX_HTML = `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>{{__BUILD_TITLE}}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="/{{__BUILD_PREFIX}}index.css">
    <script type="module" src="/{{__BUILD_PREFIX}}index.mjs"></script>
    <script nomodule src="/{{__BUILD_PREFIX}}index.js"></script>
  </head>
  <body>Loading (v{{__BUILD_VERSION}})...</body>
</html>
`;

export const NOW = new Date();

export const DEFAULT_DEFINE: Record<string, string> = {
  __BUILD_SERVE: 'false',
  __BUILD_TIME: String(NOW.getTime()),
};

export const DEFAULT_BUILD: BuildConfig = {
  outdir: 'dist',
  bundle: true,
  minify: true,
  sourcemap: false,
  treeShaking: true,
  platform: 'node',
  format: 'esm',
  splitting: true,
  target: ['node18'],
  define: DEFAULT_DEFINE,
  entryPoints: {
    index: 'src/index.ts',
  },
  outExtension: {
    '.js': '.mjs',
  },
};

export const DEFAULT_CONFIG: BuilderConfig = {
  version: `${NOW.getFullYear() - 2000}.${(NOW.getMonth() + 1) * 100 + NOW.getDate()}.${
    NOW.getHours() * 100 + NOW.getMinutes()
  }`,
  prefix: `${NOW.getTime().toString(16).substring(0, 8)}_`,
  time: NOW.getTime(),
  clean: ['dist'],
  alias: {},
  build: {
    ...DEFAULT_BUILD,
    babelEs5: true,
  },
  serve: {
    ...DEFAULT_BUILD,
    minify: false,
    sourcemap: true,
    treeShaking: false,
  },
  commands: {
    clean,
    build,
    serve,
  } as Record<string, (...args: any[]) => void | Promise<void>>,
  title: '',
};

export const BROWSER_CONFIG: BuilderConfig = {
  ...DEFAULT_CONFIG,
};

export const NODE_CONFIG: BuilderConfig = {
  ...DEFAULT_CONFIG,
};

let globalConfig = DEFAULT_CONFIG;

export async function getConfig(config: BuildConfig): Promise<BuildConfig> {
  const { version, prefix, title } = globalConfig;
  return {
    ...config,
    entryPoints: valueBy(config.entryPoints, (key) => prefix + key),
    define: {
      ...DEFAULT_DEFINE,
      __BUILD_TITLE: `"${title}"`,
      __BUILD_VERSION: `"${version}"`,
      __BUILD_PREFIX: `"${prefix}"`,
      ...config.define,
    },
  };
}

export async function buildIndexHtml({ define, outdir }: BuildConfig) {
  let html = DEFAULT_INDEX_HTML;
  await readFile(`src/index.html`)
    .then((buff) => (html = String(buff)))
    .catch(() => 0);
  html = html.replace(/\{\{(.+)\}\}/g, (_, key) => JSON.parse((define || {})[key]));
  await mkdir(`${outdir}`, { recursive: true }).catch(() => 0);
  await writeFile(`${outdir}/index.html`, html);
}

export async function clean(paths: string | string[] = globalConfig.clean) {
  if (!Array.isArray(paths)) paths = [paths];
  console.debug('clean', paths);
  for (const p of paths) {
    try {
      if (p) await rm(p, { recursive: true });
    } catch (error) {}
  }
}

export async function build(config: BuildConfig = globalConfig.build) {
  const buildConfig = await getConfig({
    ...globalConfig.build,
    ...config,
  });
  console.debug('build', buildConfig);

  const { babelEs5, host, port, ...options } = buildConfig;
  const { outdir } = options;
  if (!outdir) throw new Error('no build.outdir');

  await clean(outdir);
  const result = await esbuild.build(options);
  console.debug('build result', result);

  const files = await readdir(outdir);
  for (const file of files) {
    const size = await stat(`${outdir}/${file}`)
      .then((s) => Math.round(s.size / 80) / 100)
      .catch(() => 0);
    console.debug('build', file, size, 'ko');
  }

  await buildIndexHtml(buildConfig);

  if (babelEs5) {
    await cmd(`npx babel ${outdir} --out-dir ${outdir} --presets=minify,@babel/preset-env`);
  }
}

export async function serve(config: BuildConfig = globalConfig.serve) {
  const buildConfig = await getConfig({
    ...globalConfig.serve,
    ...config,
    define: {
      ...globalConfig.serve.define,
      ...config.define,
      __BUILD_SERVE: 'true',
    },
  });
  console.debug('serve', buildConfig);
  const { babelEs5, host, port, ...options } = buildConfig;
  const { define, outdir } = options;
  await clean(outdir);
  await buildIndexHtml(buildConfig);
  const ctx = await esbuild.context(options);
  await ctx.watch();
  const serveResult = await ctx.serve({
    host: host || 'localhost',
    port: port || 1234,
    servedir: outdir,
    fallback: outdir + '/index.html',
    onRequest: (e) => {
      console.debug(e.method, e.path, e.status);
    },
  });
  console.debug('serve url', `http://${serveResult.host}:${serveResult.port}`);
}

export async function builder(config: BuilderConfig = BROWSER_CONFIG) {
  console.debug(process.argv);
  const packageInfo = JSON.parse((await readFile('package.json')).toString());
  config.title = packageInfo.title || packageInfo.name;
  globalConfig = config;
  for (const arg of process.argv) {
    let [key, val] = arg.split(/:(.*)/);
    try {
      val = eval(`(${val})`);
    } catch {}
    if (globalConfig.commands[key]) {
      const start = Date.now();
      console.log(arg, key, val);
      await globalConfig.commands[key](val);
      console.log(arg, Date.now() - start, 'ms');
    }
  }
}

(async () => {
  const argv = valueBy(process.argv, (k) => k);
  if (argv['browser']) await builder(BROWSER_CONFIG);
  if (argv['node']) await builder(NODE_CONFIG);
})();

export default builder;
