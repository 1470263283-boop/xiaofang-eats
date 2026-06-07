# 小昉今天吃什么

一个手机端优先的静态网页应用，用来给王小昉随机生成每天早餐、午餐、晚餐吃什么。无需登录、无需后端，所有菜单、今日结果和历史记录都保存在浏览器 `localStorage`。

## 功能

- 早餐、午餐、晚餐三个转盘区域
- 一键生成今天三餐
- 支持单餐重新转一次
- 支持锁定某一餐，只重抽未锁定餐次
- 尽量避免最近 3 次抽到同一个食物
- 今日菜单汇总和复制
- 最近 7 天历史记录
- 本地编辑候选菜单：新增、删除、修改

## 本地运行

```bash
npm install
npm run dev
```

打开终端输出的本地地址，通常是 `http://localhost:5173`。

如果你在 Windows PowerShell 遇到 `npm.ps1` 执行策略限制，可以改用：

```bash
npm.cmd install
npm.cmd run dev
```

## 打包

```bash
npm run build
```

打包结果会生成在 `dist/` 目录。

## 部署到 GitHub Pages

1. 把项目推送到 GitHub 仓库。
2. 在仓库页面进入 `Settings` -> `Pages`。
3. 如果使用 GitHub Actions，创建部署 workflow；如果使用静态目录部署，先运行 `npm run build`，再把 `dist/` 发布到 Pages。
4. 本项目 `vite.config.ts` 已设置 `base: './'`，适合部署到 GitHub Pages 子路径。

一个简单的 GitHub Actions workflow 可放在 `.github/workflows/deploy.yml`：

```yaml
name: Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## 部署到 Vercel

1. 登录 Vercel，导入 GitHub 仓库。
2. Framework Preset 选择 `Vite`。
3. Build Command 使用 `npm run build`。
4. Output Directory 使用 `dist`。
5. 部署完成后，把 Vercel 生成的链接发给王小昉即可。

## 部署到 Netlify

1. 登录 Netlify，选择 `Add new site` -> `Import an existing project`。
2. 连接 GitHub 仓库。
3. Build command 填 `npm run build`。
4. Publish directory 填 `dist`。
5. 部署完成后使用 Netlify 站点链接。
