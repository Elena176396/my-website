# Song Chaoyang Tools

好奇心驱动的互动工具实验场，线上地址：[songchaoyang.com](https://songchaoyang.com)。

项目使用 Astro 构建，工具按四个方向组织：镜像引擎、上岸外挂、游乐结界与思维探索。多数工具以独立静态页面存放在 `public/tools/`，主站负责入口、分类与展示。

## 本地开发

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
```

## 环境变量

Clarity 决策助手的 AI 分析接口需要：

```text
DEEPSEEK_API_KEY=
```

密钥只应保存在本地 `.env.local` 和 Vercel Environment Variables 中，不要提交到 Git。

## 部署

仓库 `master` 分支连接 Vercel；推送后自动构建并部署到 `songchaoyang.com`。

详细结构和维护说明见 [PROJECT.md](PROJECT.md)。

## License

[MIT](LICENSE)
