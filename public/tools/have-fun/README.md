# 拾光读书会 · 展示网站

一个纯静态的读书会宣传网站：500 本书的书库、每期活动记录（参会人员 + 图片 / 视频 / 链接 / 文档 / PPT / 表格），
无需服务器、无需数据库，可免费部署到 GitHub Pages / Netlify / Vercel。

## 本地预览

```bash
cd have-fun
python3 -m http.server 8788
# 浏览器打开 http://localhost:8788
```

书籍封面和电影海报已缓存在 `files/covers/`，直接双击 `index.html` 也能显示。以后重新抓取并生成数据后，运行下面的命令即可重新下载图片并切换回本地路径：

```bash
python3 tools/cache_book_covers.py
python3 tools/cache_movie_covers.py
```

## 目录结构

```
index.html        页面骨架（一般不用改）
css/style.css     设计系统（改颜色/字体在这里）
js/data.js        ★ 你唯一需要日常编辑的文件：书籍 + 活动数据
js/app.js         渲染逻辑（一般不用改）
files/            放你的 PDF、PPT、照片、视频等文件
```

## 日常维护：只改 `js/data.js`

文件顶部有完整的格式说明。简单来说：

### 加一本书

往 `BOOKS` 数组末尾加一条：

```js
{ id: 41, title: "书名", author: "作者", category: "文学",
  session: 41, date: "2026-07-18", intro: "一两句简介。", cover: "" }
```

- `cover` 留空会自动生成一张优雅的"书脊风"纯色封面（500 本书不用找 500 张图）；
  也可以填图片地址（如 `files/covers/xxx.jpg` 或豆瓣图片链接）。
- `category` 随便写，筛选栏会自动出现新分类。

### 加一期活动

往 `SESSIONS` 数组开头加一条，`blocks` 里自由组合内容块：

| 块类型 | 用途 |
|--------|------|
| `text` | 正文段落（`\n\n` 分段） |
| `heading` | 小标题 |
| `quote` | 金句引用 |
| `image` / `gallery` | 单图 / 照片墙（点击放大） |
| `video` | B 站 / YouTube / 本地 mp4 |
| `link` | 链接卡片 |
| `file` | PDF / PPT / Word / Excel（查看 + 下载，PDF 可页内预览） |
| `table` | 表格 |

### 关于 PPT / Word 文档

浏览器不能直接预览 `.pptx` / `.docx`，两种做法：

1. **推荐**：导出一份 PDF 放进 `files/`，用 `kind: "ppt", preview: true` 即可页内翻阅，
   同时把原始 PPT 也放进去供下载；
2. 网站部署到公网后，也可以用微软 Office 在线预览：
   `https://view.officeapps.live.com/op/embed.aspx?src=你的文件公网地址`，
   把它填到 `video` 块的 `src` 里即可嵌入。

## 部署上线（免费）

以 GitHub Pages 为例：

```bash
git init && git add -A && git commit -m "读书会网站"
# 在 GitHub 新建仓库后：
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
# 仓库 Settings → Pages → Source 选 main 分支根目录即可
```

## 常用微调

- **换主题色**：`css/style.css` 顶部 `:root` 里的 `--accent`（赭红）、`--bg`（纸色）
- **改读书会名字**：搜索替换 `拾光读书会`
- **改成员数 / 成立年份**：`js/data.js` 底部的 `SITE_STATS`
- **每页显示书数**：`js/app.js` 里的 `PAGE_SIZE`（默认 12）
