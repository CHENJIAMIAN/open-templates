# 2025 中国大模型报告

中国大模型市场分析报告，包含 ECharts 数据可视化

---

## 项目结构

```
china-llm-report/
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

本模板采用**数据与渲染分离**架构，主要区域：

| 区域 | ID | 说明 |
|------|------|------|
| 首屏 | `#hero-root` | 报告标题和副标题展示区 |
| 报告容器 | `#report-container` | 主内容容器，包含所有章节 |
| 内容渲染区 | `#content-root` | 动态渲染的章节内容 |
| 数据块 | `#report-data` | JSON 数据源（`<script type="application/json">`） |

### 修改方式

- **修改内容**：编辑 `#report-data` 中的 JSON 数据
- **禁止修改**：`<script>` 中的渲染逻辑

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
| **图表** | ECharts |
