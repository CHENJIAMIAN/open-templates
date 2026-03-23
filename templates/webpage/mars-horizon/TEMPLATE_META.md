# 火星地平线沉浸式展览

火星探索主题沉浸式展览页面，使用 ECharts 数据可视化

---

## 项目结构

```
mars-horizon/
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
| 首屏图片 | `#img-hero` | 火星地平线主图 |
| 峡谷图片 | `#img-canyon` | 水手号峡谷图片 |
| 冰盖图片 | `#img-ice` | 火星极冠图片 |
| 探测器图片 | `#img-rover` | 祝融号探测器图片 |
| 时间线 | `#timeline-container` | 火星探索时间线 |
| 数据图表 | `#chart-container` | ECharts 数据可视化 |
| 地图 | `#img-map` | 火星全球地图 |
| 地图标记 | `#markers-layer` | 地图标记点图层 |
| 地点信息 | `#map-info` | 地点详情面板 |

### 修改方式

- **修改图片**：更新 `data-prompt` 属性或替换 `src` 地址
- **修改时间线**：编辑 `#timeline-container` 中的事件条目
- **修改地图标记**：编辑 JavaScript 中的地点数据

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
