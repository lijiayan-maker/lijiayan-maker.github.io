# lijiayan-maker.github.io

个人主页与技术博客，记录客户端开发、学习笔记、项目实践和难题排查。使用 Astro 与 Fuwari 构建，通过 GitHub Actions 发布到 GitHub Pages。

## 当前能力

- 中文站点信息、本地头像和 About 页面。
- Markdown / MDX 文章，支持代码高亮、目录、阅读时长、标签和归档。
- Pagefind 中文搜索、RSS 和 Sitemap。
- 响应式布局、明暗主题和自托管字体。
- 依赖 registry 白名单检查和 GitHub Pages 自动部署工作流。

## 环境要求

- Node.js 24
- pnpm 9.14.4（以 `package.json` 的 `packageManager` 字段为准）

## 常用命令

```bash
pnpm install
pnpm dev
pnpm check
pnpm check:lockfile
pnpm build
pnpm preview
```

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动本地开发服务，默认端口 4321 |
| `pnpm check` | 运行 Astro 类型与内容检查 |
| `pnpm check:lockfile` | 检查依赖来源，拒绝未允许的 registry 和 Git 依赖 |
| `pnpm build` | 构建静态站点并生成 Pagefind 搜索索引 |
| `pnpm preview` | 本地预览生产构建 |
| `pnpm new-post <filename>` | 创建一篇基础 Markdown 文章 |

## 写作方式

文章放在 `src/content/posts/`。需要封面或多张配图时，推荐使用文章目录，让 Markdown 和资源保持在一起：

```text
src/content/posts/
└── my-post/
    ├── index.md
    └── cover.png
```

基础 frontmatter：

```yaml
---
title: 文章标题
published: 2026-11-22
description: 一句话说明文章内容
image: ./cover.png
tags: [Android, 学习笔记]
category: 客户端开发
draft: false
---
```

日常记录可以围绕三个问题展开：学到了什么、做了什么、解决了什么难题。`draft: true` 的文章不会发布。

## 目录

```text
.github/workflows/          GitHub Actions 工作流
scripts/                    项目维护脚本
src/assets/images/          本地头像等站点资源
src/content/posts/          Markdown / MDX 文章及同目录配图
src/content/spec/about.md   About 页面
src/config.ts               站点标题、导航和个人资料
astro.config.mjs            Astro、站点 URL 和 Markdown 集成
public/                     原样发布的静态资源
```

## 部署

站点地址：`https://lijiayan-maker.github.io/`

仓库使用 GitHub Actions 构建和发布 `dist/`。首次部署前，需要在仓库的 **Settings → Pages** 中将 **Source** 设置为 **GitHub Actions**。推送到 `main` 后，工作流会自动执行依赖检查、Astro 检查、构建和发布。

## 主题与许可

- 基于 [Fuwari](https://github.com/saicaca/fuwari)，主题基准提交：`6d39b0dec41282e7852e23e032998a5789abee28`。
- 主题原 `LICENSE` 保留，原主题为 MIT License。
- 博客文章按站点显示的 CC BY-NC-SA 4.0 许可发布。
