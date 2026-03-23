# Crimson Press · 绯红印记 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 传统编辑美学、经典印刷风格、强烈的视觉层级
- **Design Style**: Editorial 经典排版 x Double Border 双层边框
- **Visual Signature**:
  1. 超大衬线标题（5rem，Noto Serif SC）、细线分隔、标签式小标题
  2. 单色系配色（全红），通过透明度和字重营造层次
  3. 数字带下划线、箭头增量指示、简洁柱状图
  4. 零圆角、零阴影，1-2px 细线结构化内容
- **Emotional Tone**: 专业、沉稳、权威

---

## 配色方案

**方案**: 自定义 Editorial Red
**色彩关系**: 暖米色基底 + 朱红色全要素（单色系）
**主题**: 浅色（暖调）

> **配色设计理由**：单色系配色极致克制，所有文字/边框/图形均使用同一红色，仅靠透明度与字重区分层级，营造印刷品般的纯粹权威感。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(40 33% 88%) | 页面背景（米色） |
| surface | hsl(40 33% 88%) | 内容容器（与 bg 同色，靠 border 区分） |
| header | hsl(5 66% 47%) | 标题/强调元素 |
| text | hsl(5 66% 47%) | 正文（与 header 同色，全红） |
| textMuted | hsl(5 66% 47% / 0.9) | 次要文字（红色 90% 透明度） |
| primary | hsl(5 66% 47%) | 主交互色：所有交互元素、边框、装饰线 |
| accent | hsl(5 66% 37%) | 弱强调色：深红变体，hover 态、次级强调 |
| border | hsl(5 66% 47%) | 边框/分隔线（与 primary 同色） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(5 66% 47%)`：全局唯一主色，文字、边框、图表、交互，视觉权重最高
**Accent（弱强调色）** — `hsl(5 66% 37%)`：primary 降低 10% 明度的深红，用于 hover 态和图表次级色，权重低于 primary

### 衍生规则

- **单色系原则**：所有前景元素共用 `hsl(5 66% 47%)`，靠 opacity（0.9/0.15/0.03）区分层级
- **border = primary**：边框与文字同色，1-2px 细线是核心结构手段
- **accent 推导**：primary L 值从 47% 降至 37% 得到深红变体，用于图表次级色序列
- **图表色序**：同色相(H=5)不同明度 `47%/37%/57%/42%/52%` 五阶梯度

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 全局主色 | hsl(5 66% 47%) | 朱红 |
| hover/次级 | hsl(5 66% 37%) | 深红 |
| 行 hover 背景 | hsl(5 66% 47% / 0.03) | 极浅红透明 |
| 分割线/网格线 | hsl(5 66% 47% / 0.15) | 红色 15% 透明 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(5,66%,47%)', 'hsl(5,66%,37%)', 'hsl(5,66%,57%)', 'hsl(5,66%,42%)', 'hsl(5,66%,52%)'];
//               朱红(主)           深红              浅红              暗红              中红
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: "'Noto Sans SC', sans-serif", color: 'hsl(5,66%,47%,0.9)' },
  grid: { top: 40, right: 16, bottom: 40, left: 16, containLabel: true },
  xAxis: {
    axisLine: { lineStyle: { color: 'hsl(5,66%,47%)', width: 1 } }, axisTick: { show: false },
    axisLabel: { color: 'hsl(5,66%,47%,0.9)', fontSize: 12, fontFamily: "'Noto Sans SC', sans-serif" },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(5,66%,47%,0.9)', fontSize: 12, fontFamily: "'Noto Sans SC', sans-serif" },
    splitLine: { lineStyle: { color: 'hsl(5,66%,47%,0.15)', type: 'solid', width: 1 } }
  },
  tooltip: {
    backgroundColor: 'hsl(40,33%,88%)', borderColor: 'hsl(5,66%,47%)', borderWidth: 1, borderRadius: 4,
    padding: [8, 12], textStyle: { color: 'hsl(5,66%,47%)', fontSize: 12 }
  },
  legend: {
    icon: 'rect', itemWidth: 14, itemHeight: 14,
    textStyle: { color: 'hsl(5,66%,47%,0.9)', fontSize: 12, fontFamily: "'Noto Sans SC', sans-serif" }
  }
};
```

### 各图表类型默认 series 样式

- **line/area**: `smooth: false`, `lineStyle.width: 2`, `symbol: 'circle'`, `symbolSize: 6`, `areaStyle.opacity: 0.12`
- **bar**: `barWidth: '100%'`（充满容器），`itemStyle.borderRadius: 0`（直角），`barGap: '20%'`
- **pie 环形**: `radius: ['50%','70%']`, `padAngle: 0`, `itemStyle: { borderRadius: 0, borderWidth: 0 }`, 外部 label primary 色

### 图表容器

容器 `border border-primary p-6 bg-transparent rounded-none`
高度 `h-[300px]`，常配合 `grid-template-columns: 2fr 1fr` 文图布局

---

## 字体排版

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600&family=Noto+Sans+SC:wght@400;500;600&display=swap" rel="stylesheet">
```

| 用途 | 字体栈 |
|-----|-------|
| Heading / 数字 | `Noto Serif SC, serif`（宋体衬线） |
| Body / 标签 | `Noto Sans SC, sans-serif`（黑体无衬线） |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| H1 报告主标题 | `5rem, line-height: 0.9, letter-spacing: -0.02em, font-weight: 400, serif` | primary |
| H2 章节标题 | `1.5rem, line-height: 1.2, serif` | primary |
| 小标题标签 | `0.7rem, uppercase, tracking-[0.15em], font-weight: 600, sans-serif` | textMuted |
| 指标数值 | `3.5rem, line-height: 1, font-weight: 400, serif` | primary |
| 指标编号 | `0.75rem, font-weight: 600, underline, sans-serif` | primary |
| 正文 Body | `1rem, line-height: 1.6, max-width: 65ch, sans-serif` | primary |

---

## 页面结构

整体单栏容器布局，`max-width: 1200px`, `margin: 0 auto`, `padding: 48px 24px`, `gap: 48px`

```
Header（元数据行 + 超大标题 + 副标题，底部 2px border）
  → 指标卡片行（4 列等宽，右侧 1px 分隔）
  → 内容网格（2fr+1fr 双列: 左摘要 | 右图表）
  → 状态列表（grid: auto 3fr 1fr auto）
  → Footer 网格（3 列等宽）
```

移动端: 指标 2x2 网格，内容单列，标题 3.5rem

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区块间距 | 48px |
| 组件间距 | 24px |
| 内部间距 | 16px |
| 小间距 | 8px |
| 超大间距 | 80px（Footer 顶部） |
| 页面边距 | 48px+24px (桌面) / 24px (移动) |

### 圆角与阴影

> Design DNA: Editorial 经典排版 — 零圆角 + 零阴影

所有容器/卡片: `border-radius: 0`，不使用阴影，仅 1-2px 细线结构化

### 边框与分隔线

| 位置 | 样式 |
|-----|-----|
| Header 底部 | 2px solid primary |
| 指标卡片间 | 1px solid primary 垂直分隔 |
| 章节标题底部 | 1px solid primary |
| 图表容器 | 1px solid primary 全边框 |
| 状态列表行间 | 1px solid primary |
| Footer 顶部 | 1px solid primary |

### Hover 与交互

图表柱 `hover: opacity 0.8`，状态行 `hover: bg-primary/3%`
交互克制轻量，仅透明度变化，不使用变形/阴影

---

## 组件规范

### Header 区域
底部 `2px solid primary`，元数据行 `flex space-between`
标题 `5rem serif line-height-0.9`，副标题 `1.5rem line-height-1.2 max-w-[600px]`

### 指标卡片
`flex flex-col gap-2`，右侧 `1px border`（最后一个无），`padding: 24px 24px 24px 0`
编号 `0.75rem underline font-bold`，数值 `3.5rem serif`
箭头 `::before { content: "->"; transform: rotate(45deg) }`

### 章节标题
`flex space-between items-baseline`，底部 `1px border pb-2`

### 状态列表行
`grid: auto 3fr 1fr auto`，底部 `1px border`，`padding: 24px 0`
状态胶囊 `border rounded-full px-3 py-1 text-[0.7rem]`

### 文字块
`font-size: 1rem, line-height: 1.6, max-width: 65ch`，段落间距 `1em`
无装饰列表: `list-style: none`，箭头前缀 `->`，`flex gap-3`

---

## CSS 变量

```css
:root {
  --bg-color: hsl(40 33% 88%);
  --primary-color: hsl(5 66% 47%);
  --font-display: 'Noto Serif SC', serif;
  --font-sans: 'Noto Sans SC', sans-serif;
  --spacing-xs: 8px; --spacing-sm: 16px; --spacing-md: 24px; --spacing-lg: 48px; --spacing-xl: 80px;
}
```

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 769px | 指标 4 列，内容 2fr+1fr 双列，状态列表 `auto 3fr 1fr auto` |
| < 768px | 指标 2x2 网格，内容单列，标题 3.5rem，状态列表重排两行 |

---

## 风格建议

- **印刷品美学优先**：方正、对齐、精确节奏，避免圆润或装饰
- **单色系统力量**：同一红色不同透明度 + 字重营造层次，不依赖多色
- **Primary / Accent 分工**：primary（朱红 47%）覆盖全局，accent（深红 37%）仅用于 hover 和图表次级
- **衬线与无衬线对比**：标题衬线（Noto Serif SC）权威感，正文无衬线（Noto Sans SC）易读性
- **线条结构化**：1-2px 细线替代卡片和阴影，形成清晰视觉网格
- **留白精确**：8px 倍数递增（8/16/24/48/80），数学和谐
