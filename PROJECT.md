# PROJECT.md — songchaoyang.com 项目说明

> 给 AI 和未来的自己看的项目全貌。修改工具或调整结构时先读这份。

## 定位

好奇心驱动的个人互动工具实验场。

- 网站：https://songchaoyang.com/
- 仓库：https://github.com/Elena176396/my-website

## 技术架构

- 框架：Astro 7（静态输出）+ React 19
- 部署：GitHub `master` push → Vercel 自动构建
- 域名：`songchaoyang.com`

## 工具的两种实现方式

### 独立 HTML

大多数工具放在 `public/tools/<tool-name>/index.html`。Astro 构建时会原样复制，Vercel 直接作为静态文件提供。

特殊情况：

- `public/tools/clarity/` 是完整的静态导出，AI 分析由 `api/clarity-analyze.js` 提供。
- `public/tools/have-fun/` 包含本地书籍和影视封面资源。
- `public/tools/pinyin-input-trainer/` 使用拆分的 HTML、CSS 和 JavaScript 文件。

### Astro 页面 + React 组件

页面位于 `src/pages/tools/`，从 `src/components/` 引入 React 组件并通过 `client:load` 渲染。音频与视频播放器组件位于 `src/components/media-preview/`。

## 四个分类

| ID | 名称 | 定位 |
|---|---|---|
| `mirror` | 镜像引擎 | 测自己、测关系 |
| `shore` | 上岸外挂 | 学习、备考、效率 |
| `play` | 游乐结界 | 游戏与互动体验 |
| `think` | 思维探索 | 决策、认知与阅读 |

分类、首页卡片和数量在 `src/components/ToolsHome.astro` 中维护；完整工具索引页在 `public/tools/index.html` 中维护。

## 关键文件

| 修改目标 | 文件位置 |
|---|---|
| 首页内容、分类、卡片和样式 | `src/components/ToolsHome.astro` |
| 工具索引页 | `public/tools/index.html` |
| 独立 HTML 工具 | `public/tools/<name>/` |
| Astro 工具页面 | `src/pages/tools/<name>.astro` |
| React 工具组件 | `src/components/<Name>.jsx` |
| Astro 构建配置 | `astro.config.mjs` |
| Vercel 路由和函数配置 | `vercel.json` |
| Clarity AI 接口 | `api/clarity-analyze.js` |

## 环境变量

`api/clarity-analyze.js` 在服务端读取 `DEEPSEEK_API_KEY`。本地使用 `.env.local`；Production 和 Preview 通过 Vercel Environment Variables 配置。密钥不得提交到 Git。

## 添加新工具

### 独立 HTML 工具

1. 创建 `public/tools/<tool-name>/index.html`。
2. 在 `public/tools/index.html` 的对应分类添加卡片。
3. 如需首页推荐，更新 `src/components/ToolsHome.astro`。
4. 执行 `pnpm build` 并检查页面路径。

### Astro + React 工具

1. 在 `src/components/` 添加 React 组件。
2. 在 `src/pages/tools/` 添加 Astro 页面并使用 `client:load`。
3. 在工具索引页和首页分类中添加入口。
4. 执行生产构建。

`scripts/wrap-react-tool.mjs` 可将 JSX 组件包装成独立 HTML 页面。

## 发布流程

1. 检查 `git diff`，确认 `.env.local` 未进入版本控制。
2. 执行 `pnpm build`。
3. 提交并推送至 GitHub `master`。
4. 等待 Vercel 部署完成，验证首页、工具路径和服务端 API。
