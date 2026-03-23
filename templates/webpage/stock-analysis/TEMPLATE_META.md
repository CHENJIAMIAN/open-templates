# Stock Analysis Template

股票深度分析仪表盘模板，采用 ECharts 展示价格走势图，包含模拟 AI 市场分析功能。适用于金融数据可视化、投资分析报告等场景。

---

## 项目结构

```
stock-analysis/
├── index.html              # 主入口文件（单页应用）
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
├── TEMPLATE_META.md        # 模板说明文档（本文件）
├── TODO.md                 # 开发备忘录
└── metadata.json           # 模板元数据
```

---

## 区域说明

| 区域 | ID | 说明 |
|------|------|------|
| 当前价格 | `#current-price` | 股票实时价格展示 |
| 时间控制 | `#time-range-controls` | 1D/1W/1M/3M/1Y 时间范围切换 |
| 图表容器 | `#echarts-container` | ECharts 价格走势图 |
| AI 刷新按钮 | `#refresh-ai-btn` | 刷新 AI 分析按钮 |
| AI 加载状态 | `#ai-loading` | AI 分析加载动画 |
| AI 内容 | `#ai-content` | AI 市场分析文本 |
| 要点列表 | `#takeaways-list` | 关键摘要要点 |

### 页面功能

1. **股价头部信息** - 股票代码、名称、实时价格和涨跌幅
2. **价格走势图** - 基于 ECharts 的交互式折线图，支持时间范围切换
3. **关键指标卡片** - 总市值、市盈率、成交量、平均成交量
4. **AI 市场分析** - 模拟 AI 分析内容，支持刷新

### 修改方式

在 `<script type="module">` 中修改：

```javascript
const TICKER = "NVDA";        // 股票代码
let currentPrice = 926.45;    // 当前价格
```

修改 `MOCK_ANALYSIS` 和 `MOCK_TAKEAWAYS` 变量自定义分析文本。

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
