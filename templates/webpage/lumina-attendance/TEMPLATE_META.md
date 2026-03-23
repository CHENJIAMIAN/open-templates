# 荧光 Lumina 出勤看板

以人为本的企业出勤数据看板

---

## 项目结构

```
lumina-attendance/
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
| 加载屏幕 | `#loading` | 页面加载动画 |
| 主内容 | `#main-content` | 主内容容器 |
| 时间周期 | `#period-label` | 显示当前统计周期 |
| 总览柱状图 | `#main-bar-chart` | 整体出勤率柱状图 |
| 部门网格 | `#department-grid` | 各部门出勤数据卡片 |
| 洞察网格 | `#insight-grid` | 智能分析洞察卡片 |

### 修改方式

- **修改数据**：在 `<script type="module">` 中修改 `MOCK_DATA` 对象
- **修改部门**：编辑 `MOCK_DATA.departments` 数组
- **修改洞察**：编辑 `MOCK_DATA.insights` 数组

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
