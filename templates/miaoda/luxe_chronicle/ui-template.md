# Luxe Chronicle · 雅致纪事 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 复古典雅、杂志编辑风、温润质感
- **Design Style**: Editorial 经典排版 x Warm Natural 自然暖调
- **Visual Signature**:
  1. 米色温暖背景、衬线字体标题（Playfair Display）、手写体装饰（Mrs Saint Delafield）
  2. 半透明卡片 + SVG noise 纹理叠加层（opacity 0.05）
  3. 极简侧边导航、大数字指标、渐变进度条
  4. 零圆角或极小圆角，无阴影，依靠半透明与边框建立层次
- **Emotional Tone**: 专业、优雅、温暖

---

## 配色方案

**方案**: 自定义 - 米色基底 + 深蓝主调
**色彩关系**: 温暖米色背景 + 深蓝文字 + 绿色点睛
**主题**: 浅色（暖调）

> **配色设计理由**：米色底营造纸质印刷质感，深蓝文字传递权威与沉稳，绿色仅用于成功/提升状态保持色彩克制。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(40 33% 95%) | 页面背景（米色） |
| surface | hsla(0 0% 100% / 0.4) | 卡片/容器（半透明白） |
| header | hsl(204 83% 29%) | 标题/强调区域 |
| text | hsl(204 83% 29%) | 主要文字（深蓝） |
| textMuted | hsl(204 35% 45%) | 次要文字 |
| primary | hsl(204 83% 29%) | 主交互色：品牌标识、导航激活、图表主色 |
| accent | hsl(152 56% 25%) | 弱强调色：成功状态、提升指标、进度条填充 |
| border | hsla(204 83% 29% / 0.15) | 边框/分割线（深蓝 15% 透明度） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(204 83% 29%)`：品牌标识、导航激活、大数字指标、图表首色，视觉权重最高
**Accent（弱强调色）** — `hsl(152 56% 25%)`：成功/提升状态、进度条填充色、高状态徽章，权重低于 primary

### 衍生规则

- **surface 半透明**：纯白 40% 透明度叠于 bg 米色上，营造纸质通透感，仅需层次时使用
- **border 色**：primary 色降至 15% opacity，形成极淡边框，不喧宾夺主
- **accent 用途限定**：绿色仅用于正向/成功语义，避免大面积铺开
- **中性灰**：`hsl(0 0% 82%)` 用于基准/平均指标，与深蓝形成冷暖对比
- **暖色补充**：`hsl(25 80% 55%)` 暖橙 + `hsl(45 85% 60%)` 金黄，用于图表扩展色

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 成功/提升 | hsl(152 56% 25%) | 同 accent |
| 中性/平均 | hsl(0 0% 82%) | 灰色基准 |
| 暖橙补充 | hsl(25 80% 55%) | 图表扩展 |
| 金黄补充 | hsl(45 85% 60%) | 图表扩展 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(204,83%,29%)', 'hsl(152,56%,25%)', 'hsl(204,35%,45%)', 'hsl(25,80%,55%)', 'hsl(45,85%,60%)', 'hsl(0,0%,82%)'];
//               深蓝(主)            深绿(强调)          浅蓝              暖橙              金黄              中性灰
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: "'Playfair Display', serif", color: 'hsl(204,35%,45%)', fontSize: 12 },
  grid: { top: 48, right: 24, bottom: 48, left: 24, containLabel: true },
  xAxis: {
    axisLine: { lineStyle: { color: 'hsla(204,83%,29%,0.15)', width: 1 } }, axisTick: { show: false },
    axisLabel: { color: 'hsl(204,35%,45%)', fontSize: 11, fontFamily: "'DM Sans', sans-serif", margin: 12 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(204,35%,45%)', fontSize: 11, fontFamily: "'Playfair Display', serif", margin: 12 },
    splitLine: { lineStyle: { color: 'hsla(204,83%,29%,0.08)', width: 1, type: 'solid' } }
  },
  tooltip: {
    backgroundColor: 'hsla(0,0%,100%,0.95)', borderColor: 'hsla(204,83%,29%,0.15)', borderWidth: 1, borderRadius: 0,
    padding: [12, 16], shadowBlur: 0, shadowColor: 'transparent',
    textStyle: { color: 'hsl(204,83%,29%)', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }
  },
  legend: {
    icon: 'circle', itemWidth: 8, itemHeight: 8, itemGap: 16,
    textStyle: { color: 'hsl(204,35%,45%)', fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }
  }
};
```

### 各图表类型默认 series 样式

- **line/area**: `smooth: false`, `lineStyle.width: 2`, `symbol: 'circle'`, `symbolSize: 6`, `showSymbol: false`, `areaStyle.opacity: 0.12`
- **bar**: `barWidth: '50%'`, `barMaxWidth: 40`, `itemStyle.borderRadius: 0`（方正匹配编辑风格）
- **pie 环形**: `radius: ['50%','70%']`, `padAngle: 2`, `itemStyle: { borderRadius: 0, borderColor: bg色, borderWidth: 2 }`, 外部 label DM Sans
- **gauge**: `radius: '75%'`, 轴线宽 12，三段色（红/黄/绿），指针宽 3 长 60%，数值 Playfair 32px
- **funnel**: `minSize: '20%'`, `maxSize: '100%'`, `gap: 2`, inside label 白色 DM Sans

### 图表容器

容器 `bg-surface border border-border rounded-none p-6`（或透明背景），无阴影
高度 `h-80` (320px) / `h-72` (288px)，网格 `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
标题 `text-sm uppercase tracking-[0.15em] font-bold mb-4`，数值标注 `text-3xl font-normal font-serif`

---

## 字体排版

| 用途 | 字体栈 |
|-----|-------|
| Heading / 数字 | `Playfair Display, serif` |
| Script / 装饰 | `Mrs Saint Delafield, cursive` |
| Body / 标签 | `DM Sans, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 品牌标题 | `text-4xl, font-normal, serif, letter-spacing: -0.02em, line-height: 0.9` | text |
| Script 装饰 | `text-2xl ~ 2.5rem, cursive` | text |
| Section 标题 | `text-3xl, font-normal, serif, letter-spacing: -0.01em` | text |
| 大数字指标 | `text-[3.5rem], font-normal, serif, line-height: 1` | text |
| 标签文字 | `text-[0.65rem], uppercase, tracking-[0.15em], font-bold` | text |
| 正文 | `text-sm, font-medium, DM Sans` | text |
| 斜体注释 | `text-sm, font-normal, italic, serif` | text opacity-80 |

---

## 页面结构

**布局模式**: 侧边栏导航 + 主内容区

```
侧边栏 (240px sticky) + 主内容区 (1fr)
  侧边栏: 品牌区(Script+Serif标题) + 导航列表 + 信息卡片
  主内容: 指标卡片行(4列) → 进度条/漏斗 → 表格 → 内容区块
```

桌面: `max-w-[1400px] mx-auto px-16 py-12`, `grid grid-cols-[240px_1fr] gap-16`
侧边栏导航: `text-xs uppercase tracking-[0.15em] font-bold`，激活态 opacity-100 + 4px 圆点指示器

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区块间距 | 64px (4rem) |
| 组件间距 | 32px (2rem) |
| 卡片内边距 | 16px |
| 页面边距 | 64px (桌面) / 16px (移动) |

### 圆角与阴影

> Design DNA: Editorial 经典排版 — 无圆角 + 无阴影

所有容器/卡片: 无圆角或 `rounded-sm`，无阴影（依靠半透明背景和边框）

### 特效
纹理叠加: `fixed inset-0 pointer-events-none z-[9999] opacity-0.05`，SVG fractal noise 纹理

---

## 组件规范

### 指标卡片
网格 `grid grid-cols-4 gap-8`，底部 `border-b border-border pb-12`
标签 `text-[0.65rem] uppercase tracking-[0.15em] font-bold mb-2`
数值 `text-[3.5rem] serif line-height-1 mt-2`
趋势 `text-xs serif italic mt-2 opacity-80`

### 进度条/漏斗条
容器 `flex gap-4`，条高可变（h-[200px]），`bg-surface border border-border`
填充 `bg-accent` 或渐变，数值 `text-xl font-bold serif`

### 表格
表头: 标签文字样式，行间距 `gap-y-4`，行 `py-4 border-b border-border`
用户头像: 圆形 40px 首字母缩写
状态徽章: `rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em]`，高状态 `bg-accent text-white`，中状态 `bg-textMuted text-white`

### 按钮/过滤器
`text-xs uppercase letter-spacing-0.1em border border-border bg-transparent px-4 py-2`，hover `bg-surface`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px | 双列（侧边栏 240px + 主区），指标 4 列 |
| 768px~1023px | 单列，导航顶置或折叠，指标 2 列 |
| < 768px | 单列堆叠，指标 1 列，侧边导航折叠，边距 16px，大数字 text-4xl |

---

## 风格建议

- **纹理叠加是核心**：SVG noise 纹理叠加营造纸质/印刷质感，所有页面保持
- **字体混搭策略**：标题/数字用衬线 Playfair Display，正文/标签用无衬线 DM Sans，装饰用手写体 Mrs Saint Delafield（克制使用）
- **半透明卡片**：仅在需要与背景纹理产生层次时使用，大部分组件直接置于背景上
- **Primary / Accent 分工**：primary（深蓝）建立基调与权威感，accent（深绿）仅用于正向/成功状态
- **留白与分组**：大间距 (64px) + 边框分割线建立层级，不使用卡片阴影
