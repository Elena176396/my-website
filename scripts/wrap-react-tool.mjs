import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const [sourcePath, outputPath, title] = process.argv.slice(2);

if (!sourcePath || !outputPath || !title) {
  throw new Error('Usage: node wrap-react-tool.mjs <source.jsx> <output.html> <title>');
}

let source = await readFile(sourcePath, 'utf8');
const importMatch = source.match(
  /^\s*import\s*\{([^}]+)\}\s*from\s*["']react["'];?\s*/m,
);

if (!importMatch) {
  throw new Error(`React hook import not found in ${sourcePath}`);
}

const hooks = importMatch[1]
  .split(',')
  .map((hook) => hook.trim())
  .filter(Boolean)
  .join(', ');

source = source
  .replace(importMatch[0], `const { ${hooks} } = React;\n\n`)
  .replace(/export\s+default\s+function\s+App\s*\(/, 'function App(')
  .replaceAll('</script', '<\\/script');

if (!/function\s+App\s*\(/.test(source)) {
  throw new Error(`App component not found in ${sourcePath}`);
}

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#faf9f5" />
  <title>${title} · Song Chaoyang</title>
  <style>
    html,body,#root{min-height:100%;margin:0}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;background:#faf9f5}
    .site-back{position:fixed;z-index:9999;left:14px;top:14px;padding:8px 12px;border-radius:999px;background:rgba(20,20,20,.82);color:#fff;text-decoration:none;font-size:13px;backdrop-filter:blur(8px)}
  </style>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <a class="site-back" href="/tools/">← 工具中心</a>
  <div id="root"></div>
  <script>
    window.storage = {
      async get(key){ const value=localStorage.getItem(key); return value==null?null:{value}; },
      async set(key,value){ localStorage.setItem(key,value); return true; },
      async delete(key){ localStorage.removeItem(key); return true; }
    };
  </script>
  <script type="text/plain" id="app-source">
${source}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
  <script>
    const { code } = Babel.transform(document.getElementById('app-source').textContent, {
      presets: [['env'], ['react', { runtime: 'classic' }]]
    });
    new Function(code)();
  </script>
</body>
</html>
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, html, 'utf8');
