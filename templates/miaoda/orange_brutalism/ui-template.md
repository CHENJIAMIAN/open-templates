# Orange Brutalism · 橙色野性 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 野性主义设计，极简主义与强对比结合，杂志编辑风
- **Design Style**: Bauhaus 包豪斯 x Double Border 双层边框
- **Visual Signature**:
  1. 粗黑边框（2-4px）+ 硬偏移阴影（4px 4px 0px black）
  2. 纯黑白橙三色配色、几何装饰圆形、椭圆徽章
  3. 衬线斜体点缀（Playfair Display italic）+ 粗体大写标题
  4. 零圆角方形卡片（除完全圆形徽章/头像外）
- **Emotional Tone**: 自信、大胆、现代

---

## 配色方案

**方案**: Brutalist Orange
**色彩关系**: 黑白基底 + 橙色强调
**主题**: 浅色

> **配色设计理由**：纯白底提供最大对比画布，黑色粗线构建视觉骨架，橙色作为唯一暖色形成强烈视觉锚点，三色极简保持野性主义纯粹性。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(0 0% 100%) | 页面背景（纯白） |
| surface | hsl(0 0% 100%) | 卡片背景（纯白） |
| header | hsl(24 100% 50%) | Header 橙色横幅背景 |
| text | hsl(0 0% 0%) | 正文（纯黑） |
| textMuted | hsl(0 0% 40%) | 次要文字（深灰） |
| primary | hsl(24 100% 50%) | 主交互色：橙色强调、CTA、状态激活 |
| accent | hsl(24 100% 85%) | 弱强调色：浅橙背景、头像底色、hover 轻底 |
| border | hsl(0 0% 0%) | 边框（纯黑粗线） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(24 100% 50%)`：Header 横幅、橙色三角标记、状态激活态、图表主色，视觉权重最高
**Accent（弱强调色）** — `hsl(24 100% 85%)`：浅橙背景、头像底色、次级装饰，权重低于 primary

### 衍生规则

- **三色原则**：仅使用黑 `hsl(0 0% 0%)`、白 `hsl(0 0% 100%)`、橙 `hsl(24 100% 50%)` 三色
- **accent 推导**：primary H=24 不变、S 不变、L 从 50% 升至 85% 得到浅橙
- **border = text**：边框与正文均为纯黑，border 以粗线（2-4px）承担结构角色
- **深灰辅助**：textMuted `hsl(0 0% 40%)` 和 `hsl(0 0% 60%)` 仅用于次要文字和图表次级色

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 成功/激活 | hsl(24 100% 50%) | 同 primary |
| 灰色状态 | hsl(0 0% 60%) | 中灰 |
| 浅橙背景 | hsl(24 100% 85%) | 同 accent |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(24,100%,50%)', 'hsl(0,0%,0%)', 'hsl(0,0%,40%)', 'hsl(24,100%,85%)', 'hsl(0,0%,60%)'];
//               橙色主色             黑色             深灰              浅橙              中灰
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Space Grotesk, sans-serif', color: 'hsl(0,0%,0%)', fontWeight: 500 },
  grid: { top: 48, right: 24, bottom: 48, left: 24, containLabel: true, borderWidth: 2, borderColor: 'hsl(0,0%,0%)' },
  xAxis: {
    axisLine: { lineStyle: { color: 'hsl(0,0%,0%)', width: 2 } },
    axisTick: { show: true, lineStyle: { color: 'hsl(0,0%,0%)', width: 2 }, length: 6 },
    axisLabel: { color: 'hsl(0,0%,0%)', fontSize: 11, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: true, lineStyle: { color: 'hsl(0,0%,0%)', width: 2 } },
    axisTick: { show: true, lineStyle: { color: 'hsl(0,0%,0%)', width: 2 }, length: 6 },
    axisLabel: { color: 'hsl(0,0%,0%)', fontSize: 11, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' },
    splitLine: { lineStyle: { color: 'hsl(0,0%,0%)', type: 'solid', width: 1, opacity: 0.2 } }
  },
  tooltip: {
    backgroundColor: 'hsl(0,0%,100%)', borderColor: 'hsl(0,0%,0%)', borderWidth: 2, borderRadius: 0,
    padding: [12, 16], textStyle: { color: 'hsl(0,0%,0%)', fontFamily: 'Space Grotesk, sans-serif', fontSize: 12 },
    extraCssText: 'box-shadow: 4px 4px 0px 0px #000000;'
  },
  legend: {
    icon: 'rect', itemWidth: 16, itemHeight: 16, itemGap: 16,
    textStyle: { color: 'hsl(0,0%,0%)', fontSize: 12, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }
  }
};
```

### 各图表类型默认 series 样式

- **line/area**: `smooth: false`（硬朗折线），`lineStyle: { width: 3, color: primary }`, `symbol: 'rect'`（方形标记）, `symbolSize: 8`, `itemStyle: { borderColor: black, borderWidth: 2 }`, 面积渐变 `opacity: 0.15`
- **bar**: `barWidth: '50%'`, `itemStyle: { borderRadius: 0, borderColor: black, borderWidth: 2, shadowColor: black, shadowBlur: 0, shadowOffsetX: 3, shadowOffsetY: 3 }`, `emphasis: shadowOffset 6px`
- **pie 环形**: `radius: ['50%','75%']`, `padAngle: 0`, `itemStyle: { borderRadius: 0, borderColor: black, borderWidth: 2, shadowOffset: 4px }`, 外部 label 粗体 Space Grotesk

### 图表容器

容器 `brutal-card p-6`（白底 + 2px 黑边 + 4px 偏移阴影）
标题 `text-lg font-bold uppercase mb-4 pb-2 border-b-2 border-black`
高度 `h-[300px] ~ h-[400px]`，网格 `grid-cols-1 md:grid-cols-2 gap-6`

---

## 字体排版

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400;1,600&display=swap" rel="stylesheet">
```

| 用途 | 字体栈 |
|-----|-------|
| Heading / Body | `Space Grotesk, sans-serif` |
| 斜体装饰 | `Playfair Display, serif, italic` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| H1 超大标题 | `text-5xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9]` | text |
| H2 章节标题 | `text-3xl font-bold uppercase` | text |
| 装饰性文字 | `font-serif italic text-lg` (Playfair Display) | text |
| 正文 | `text-sm font-normal` | text |
| 次要文字 | `text-xs` | textMuted |
| 标签文字 | `text-xs font-bold uppercase tracking-wider` | text |

---

## 页面结构

```
Sticky 导航栏 (bg-white border-b-2 border-black h-16)
  → Header Banner (bg-primary border-4 border-black brutal-shadow-lg + 几何装饰圆)
  → 主内容区 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12
    → 章节标题 (编号圆形 + 标题 + 斜体描述)
    → 内容卡片 (brutal-card)
  → Footer
```

导航: Logo(黑方块白字) + 粗体大写标题 + 橙色版本徽章(rounded-full)
Header Banner: `bg-primary border-4 border-black p-8 lg:p-16 overflow-hidden`，含几何装饰圆 + 黑底状态卡片

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 页面边距 | `px-4 sm:px-6 lg:px-8` |
| 区块间距 | `space-y-12` (48px) |
| 卡片内边距 | `p-6` (24px) |
| Header 内边距 | `p-8 lg:p-16` |
| 组件间距 | `gap-4` / `gap-8` |

### 边框与阴影

> Design DNA: Bauhaus 包豪斯 x Double Border — 粗黑线 + 硬偏移阴影

| 类型 | 样式 |
|-----|-----|
| brutal-border | `border: 2px solid black` |
| brutal-shadow | `box-shadow: 4px 4px 0px 0px black` |
| brutal-shadow-lg | `box-shadow: 8px 8px 0px 0px black` |
| brutal-card | 白底 + 2px 黑边 + 4px 偏移阴影 |
| brutal-card:hover | `translate(2px,2px)` + 阴影缩减至 `2px 2px 0px 0px black` |

圆角: 方形卡片 0px，椭圆徽章/圆形头像 `rounded-full`

### Hover 与动画

| 模式 | 效果 |
|-----|-----|
| 卡片 hover | `transform: translate(2px,2px), shadow: 2px 2px, transition: all 0.2s ease` |
| 选区样式 | `::selection { bg: primary, color: white }` |

---

## 组件规范

### 导航栏
`sticky top-0 z-50 bg-white border-b-2 border-black h-16`
Logo `bg-black w-8 h-8 text-white font-bold text-sm`，版本徽章 `rounded-full bg-primary border border-black text-xs font-bold`

### Header Banner
`bg-primary border-4 border-black p-8 lg:p-16 brutal-shadow-lg relative overflow-hidden`
几何装饰: `absolute rounded-full border-2 border-black opacity-20` (w-64/w-32)
标签 `rounded-full border border-black bg-white px-4 py-1 text-sm font-bold`
描述 `border-l-4 border-black pl-4 text-lg font-medium`

### 章节标题
编号圆 `w-10 h-10 border-2 border-black bg-primary rounded-full text-lg font-bold`
标题 `text-3xl font-bold uppercase`，副标题 `font-serif italic text-lg`

### 野性主义卡片
`brutal-card p-6`，头部 `border-b-2 border-black pb-4 mb-6`
头像 `w-12 h-12 rounded-full border-2 border-black bg-accent`
橙色三角标记 `text-primary -> #` / 灰色圆点 `w-2 h-2 rounded-full border border-black bg-gray-200`

### 徽章
椭圆 `rounded-full border border-black bg-white px-4 py-1 text-sm font-bold`
版本 `rounded-full border border-black bg-primary text-black px-3 py-1 text-xs font-bold`

### 信息卡片(小)
`bg-white border-2 border-black p-3`，标签 `text-xs uppercase font-bold`，值 `font-serif italic text-lg`

### 滚动条
track `bg-[#f1f1f1]`，thumb `bg-black`，宽 8px

---

## 装饰元素

几何装饰圆: `absolute rounded-full border-2 border-black opacity-20`（大圆 w-64 / 小圆 w-32）
SVG 装饰: `absolute top-0 right-0 p-12 opacity-10 text-black stroke-width-1.5`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 导航 px-8，Header p-16，双列 grid-cols-2 |
| 768px~1023px (md) | 导航 px-6，Header p-8，混合布局 |
| < 768px | 导航 px-4，Header p-8 flex-col，全单列，状态卡片移至底部 |

---

## 风格建议

- **极简强对比**：仅黑/白/橙三色，避免引入其他颜色干扰纯粹性
- **硬边界拥抱**：2-4px 实线边框，禁用圆角（完全圆形除外）
- **偏移阴影是核心签名**：brutal-shadow (4px) / brutal-shadow-lg (8px) 是品牌标识
- **Primary / Accent 分工**：primary（橙）用于核心强调与交互，accent（浅橙）用于次级装饰与底色
- **大胆字重对比**：标题 font-bold (700) + 装饰 Playfair italic，避免常规字重独立展示
- **Grid 优先布局**：卡片网格严格对齐，ECharts 粗黑边框 + 方形标记 + 硬阴影与整体统一
