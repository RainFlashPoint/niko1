# 部署指南

## 方式一：Cloudflare Pages（推荐）

### 1. 获取 Cloudflare 凭据
1. 登录 Cloudflare Dashboard
2. 进入 "Overview" → "Account ID" 
3. 进入 "Profile" → "API Tokens" → "Create Token"
4. 使用 "Edit Cloudflare Workers" 模板
5. 复制生成的 Token

### 2. 配置 GitHub Secrets
在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加：
- `CLOUDFLARE_API_TOKEN` - 你的 API Token
- `CLOUDFLARE_ACCOUNT_ID` - 你的 Account ID

### 3. 部署
以后每次 push 代码到 main 分支，会自动部署到：
`https://traffic-platform.pages.dev`

---

## 方式二：Vercel（更简单）

1. 登录 https://vercel.com
2. Import GitHub Repository "niko1"
3. Framework Preset: Vite
4. Deploy!

---

## 本地运行

```bash
cd traffic-platform
npm install
npm run dev
```

访问 http://localhost:5173
