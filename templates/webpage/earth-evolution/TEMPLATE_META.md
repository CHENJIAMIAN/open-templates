# Aeon 地球演化史

地球 45 亿年演化历史可视化展示

---

## 项目结构

```
earth-evolution/
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
| 进度条 | `#progress-bar` | 滚动进度指示器 |

### 页面特点

- 全屏滚动式展示
- 时间线叙事结构
- 沉浸式视觉体验

### 修改方式

- **修改内容**：直接编辑各时代区块的 HTML 文本
- **修改图片**：替换 assets/ 目录中的图片资源

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
