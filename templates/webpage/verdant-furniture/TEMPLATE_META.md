# Verdant 家居

自然风格家具电商展示页面

---

## 项目结构

```
verdant-furniture/
├── index.html              # 主入口文件
├── assets/                 # 静态资源目录
├── scripts/                # Vite 构建插件
│   ├── vite-plugin-asset-check.js       # 资源引用检查
│   ├── vite-plugin-basename-check.js    # Basename 注入检查
│   ├── vite-plugin-lint-internal-links.js # 内部链接检查
│   └── vite-plugin-static-copy-safe.js  # 静态文件复制
├── package.json            # 项目依赖配置
├── vite.config.js          # Vite 构建配置
├── .eslintrc.cjs           # ESLint 代码检查配置
├── .gitignore              # Git 忽略配置
├── TEMPLATE_META.md        # 模板说明文档
├── TODO.md                 # 开发备忘录
└── metadata.json           # 模板元数据
```

---

## 区域说明

| 区域 | ID | 说明 |
|------|------|------|
| 导航栏 | `#navbar` | 固定顶部导航 |
| 移动菜单 | `#mobile-menu` | 移动端全屏导航 |
| 产品分类 | `#categories` | 产品分类展示 |
| 系列展示 | `#collections` | 家具系列展示 |
| 可持续发展 | `#sustainability` | 环保理念介绍 |
| 品牌故事 | `#story` | 品牌故事叙述 |
| 杂志/博客 | `#journal` | 设计杂志文章 |

### 修改方式

- **修改产品**：编辑 `#categories` 和 `#collections` 中的产品数据
- **修改品牌信息**：编辑 `#story` 和 `#sustainability` 的文本
- **修改文章**：编辑 `#journal` 中的博客卡片

---

## 工程脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建（含 lint 检查） |
| `npm run preview` | 预览构建产物 |
| `npm run lint` | ESLint 代码检查 |

---

## scripts/ 目录说明

| 文件 | 说明 |
|------|------|
| `vite-plugin-asset-check.js` | 检查资源引用是否正确 |
| `vite-plugin-basename-check.js` | 检查 basename 注入是否正确 |
| `vite-plugin-lint-internal-links.js` | 检查内部链接格式 |
| `vite-plugin-static-copy-safe.js` | 安全复制静态资源 |

> ⚠️ **请勿修改** scripts/ 目录下的文件

---

## 技术栈

| 类别 | 技术 |
|------|------|
| **运行时** | Static HTML |
| **样式** | Tailwind CSS |
| **图标** | Lucide Icons |
