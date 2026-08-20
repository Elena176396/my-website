# 项目说明

## 技术结构

- `src/components/ToolsHome.astro`：主站工具首页与分类入口。
- `src/pages/`：Astro 页面及服务端 API。
- `src/layouts/`：页面布局、SEO 和公共元信息。
- `src/components/`：Astro UI 组件。
- `src/scripts/`：浏览器端交互逻辑。
- `api/clarity-analyze.js`：Clarity 决策助手的 DeepSeek 分析接口。
- `public/tools/`：可直接通过 `/tools/<slug>/` 访问的独立工具。
- `public/`：favicon、PWA 图标、分享图及静态资源。

## 开发与校验

```bash
pnpm install
pnpm dev
pnpm build
```

站点根地址由 `astro.config.mjs` 的 `site` 配置控制。`public/robots.txt` 中的 Sitemap 地址应与生产域名保持一致。

## 新增独立工具

1. 将构建完成的静态文件放入 `public/tools/<slug>/`。
2. 确保入口文件为 `index.html`，资源引用使用相对路径或正确的 `/tools/<slug>/` 前缀。
3. 在 `src/components/ToolsHome.astro` 对应分类添加卡片数据。
4. 本地执行 `pnpm build`，并检查工具入口与首页链接。

## 环境变量

`api/clarity-analyze.js` 在服务端读取 `DEEPSEEK_API_KEY`。本地使用 `.env.local`；生产、预览和开发环境通过 Vercel Environment Variables 配置。任何真实密钥都不得提交到仓库。

## 发布流程

1. 检查 `git diff`，避免提交 `.env.local` 或无关文件。
2. 执行生产构建。
3. 提交并推送至 GitHub `master`。
4. 等待 Vercel 自动部署并验证线上首页、工具路径和 API。
