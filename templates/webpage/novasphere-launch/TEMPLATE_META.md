# NovaSphere 产品发布会

科技产品发布会活动页面，深色沉浸式设计风格

---

## 项目结构

```
novasphere-launch/
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
| 首屏标题 | `#hero-title-main` | 主标题 |
| 首屏副标题 | `#hero-title-sub` | 副标题（渐变色） |
| 功能特性 | `#features` | Bento Grid 功能展示 |
| 演讲嘉宾 | `#speakers` | 嘉宾卡片网格 |
| 合作伙伴 | `#partners` | 合作伙伴 Logo 网格 |
| 报名表单 | `#desktop-form` | 活动报名表单 |

### 修改方式

- **修改标题**：编辑 `#hero-title-main` 和 `#hero-title-sub` 的文本
- **修改功能**：编辑 `#bento-grid` 中的功能卡片
- **修改嘉宾**：编辑 `#speakers-grid` 中的嘉宾数据

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
