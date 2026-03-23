# Kraft Pastel · 牛皮粉彩 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Neo-Brutalist Editorial — 复古数字终端风 x 暖色牛皮纸底 x 高饱和马卡龙色块
- **Design Style**: Bauhaus 包豪斯 x Soft Blocks 柔色块
- **Visual Signature**:
  1. OS 窗口风格卡片（顶部黑色标题栏 + 红黄绿三色圆点 + 大写标题）
  2. 硬边 2px 黑色边框，零圆角，offset box-shadow（4px 4px 纯黑色）
  3. 高饱和马卡龙色块交替（粉、绿、青、黄）
  4. 超粗黑体 font-black + 全大写 + 字间距紧缩 + 斜体
  5. 杂志式编辑排版，Section Header 带底部粗线分隔
- **Emotional Tone**: 潮流、数据驱动、年轻化

---

## 配色方案

**方案**: Neo-Brutalist Warm + Pastel Accents
**色彩关系**: 暖白牛皮纸底 + 纯黑边框/标题栏 + 多色马卡龙强调色
**主题**: 浅色

> **配色设计理由**：暖白牛皮纸底色赋予温暖复古质感，纯黑边框与标题栏构建硬朗结构框架，马卡龙粉作为主交互色注入活力，其余色块交替丰富视觉层次。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(40 30% 93%) | 页面背景（暖白牛皮纸色） |
| surface | hsl(0 0% 100%) | 卡片默认背景 |
| header | hsl(0 0% 10%) | 窗口标题栏、图标方块背景 |
| text | hsl(0 0% 10%) | 主要文字、边框 |
| textMuted | hsl(220 9% 63%) | 次要文字、标签（gray-400） |
| primary | hsl(344 100% 78%) | 主交互色：马卡龙粉强调（#FF91AF） |
| accent | hsl(120 73% 75%) | 弱强调色：马卡龙绿，交替色底（#90EE90） |
| border | hsl(0 0% 10%) | 卡片边框、分隔线（2px 纯黑） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(344 100% 78%)`：主强调色块、条件高亮柱体、关键数据标记，视觉权重最高
**Accent（弱强调色）** — `hsl(120 73% 75%)`：交替色底卡片、次级强调区域，权重低于 primary

### 衍生规则

- **背景色**：hsl(40 30% 93%) 暖白牛皮纸，营造复古数字终端质感
- **边框系统**：统一 2px 纯黑 hsl(0 0% 10%)，所有卡片/组件零圆角
- **硬阴影**：4px 4px 0px 纯黑 offset，无模糊，强化 Neo-Brutalist 风格
- **强调色序列**：primary 粉 → accent 绿 → hsl(183 38% 72%) 青 → hsl(46 88% 66%) 黄 → hsl(27 83% 61%) 橙
- **窗口标题栏前景**：纯白文字 hsl(0 0% 100%) 在 header 黑底上

### 强调色序列

| 名称 | HSL |
|------|-----|
| accent-pink | hsl(344 100% 78%) |
| accent-green | hsl(120 73% 75%) |
| accent-cyan | hsl(183 38% 72%) |
| accent-yellow | hsl(46 88% 66%) |
| accent-orange | hsl(27 83% 61%) |
| accent-dark | hsl(200 30% 26%) |

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/上升 | hsl(142 76% 36%) | green-600 |
| 负向/下降 | hsl(0 72% 51%) | red-600 |
| 中性 | hsl(220 9% 63%) | gray-400 |
| 窗口圆点 | hsl(0 84% 60%) / hsl(48 96% 53%) / hsl(142 71% 45%) | 红/黄/绿 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(344,100%,78%)', 'hsl(120,73%,75%)', 'hsl(183,38%,72%)', 'hsl(46,88%,66%)', 'hsl(27,83%,61%)', 'hsl(200,30%,26%)'];
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Space Grotesk, Noto Sans SC, sans-serif', color: '#1A1A1A' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: '#1A1A1A', fontSize: 10, fontWeight: 'bold', fontFamily: 'Space Grotesk', margin: 16 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { lineStyle: { color: '#EEEEEE', type: 'dashed' } }
  },
  tooltip: {
    trigger: 'axis', backgroundColor: '#FFFFFF', borderColor: '#1A1A1A', borderWidth: 2,
    borderRadius: 0, padding: 12, shadowBlur: 0,
    textStyle: { fontFamily: 'Space Grotesk', color: '#1A1A1A', fontWeight: 'bold', fontSize: 12 },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(26,26,26,0.08)' } }
  },
  legend: {
    textStyle: { fontFamily: 'Space Grotesk', color: '#1A1A1A', fontSize: 10, fontWeight: 'bold' },
    icon: 'rect', itemWidth: 10, itemHeight: 8, itemGap: 12, padding: [20, 0, 0, 0]
  }
};
```

### 各图表类型默认 series 样式

- **line（面积图）**: `smooth: true`, `symbol: 'none'`, `lineStyle: { color: '#1A1A1A', width: 3 }`, `areaStyle: { color: accent-cyan, opacity: 0.4 }`
- **bar**: `barWidth: 20`, `borderRadius: [0,0,0,0]`（零圆角），默认纯黑填充；空心变体 `color: '#FFF'`, `borderColor: '#1A1A1A'`, `borderWidth: 2`
- **pie 环形**: `radius: ['36%','60%']`, `padAngle: 5`, `itemStyle: { borderColor: '#1A1A1A', borderWidth: 2 }`, `label: { show: false }`
- **条件着色**: 高于阈值 → primary 粉，低于阈值 → 纯黑

### 图表容器

外层 WindowCard `border-2 border-black brutal-shadow overflow-hidden`，零圆角
标题栏 `h-8 bg-[header] text-white px-2` + 红黄绿三色圆点
内容区 `p-4`，高度 `h-[300px]` ~ `h-[400px]`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap');
```

| 用途 | 字体栈 |
|------|--------|
| 标题 / 数字 / 标签 | `Space Grotesk, Noto Sans SC, sans-serif` |
| 正文（中文） | `Noto Sans SC, Space Grotesk, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|------|------|------|
| 页面主标题 | `text-6xl md:text-8xl font-black tracking-tighter uppercase` | text；反转版 bg-black text-white |
| 副标题 | `text-2xl font-black tracking-tighter uppercase italic` | text |
| Section 标题 | `text-4xl font-black uppercase tracking-tighter italic` | text |
| 窗口卡片标题 | `text-[10px] font-bold uppercase tracking-widest` | white |
| KPI 数值 | `text-3xl font-black tracking-tight` | text |
| 标签/分类 | `text-[10px] font-bold uppercase tracking-widest` | textMuted |
| 正文描述 | `text-sm font-bold opacity-80` | text |

---

## 页面结构

> 杂志式编辑排版 + OS 窗口卡片系统，纯内容流式布局。

```
Header（品牌标题 + 标签 + 日期 | border-b-8 分隔）
  → [Section Header（图标方块 + 大写标题 + border-b-4）]
  → KPI 卡片行（grid 4 列，交替色底 WindowCard）
  → 主内容区（左 8/12 + 右 4/12）
  → [Section Header] → 图表区
  → [Section Header] → 多列卡片网格
  → Footer（品牌信息 + 操作按钮 | border-t-8 分隔）
```

页面背景 `bg-[bg]`，内容容器 `max-w-7xl mx-auto px-4 py-8 lg:py-12`
主网格 `grid grid-cols-1 md:grid-cols-12 gap-6`
Section 间距 `mt-16 mb-8`，分隔 `border-b-4 border-black pb-4`

---

## 视觉风格

### 圆角与阴影

所有卡片/按钮/进度条: 零圆角（0px）；窗口三色圆点 `rounded-full`（唯一例外）
brutal-shadow: `box-shadow: 4px 4px 0px 0px rgba(0,0,0,1)`

### 边框体系

| 用途 | 样式 |
|------|------|
| 卡片/组件 | `border-2 border-black` |
| Section 分隔 | `border-b-4 border-black` |
| Header/Footer | `border-b-8 / border-t-8 border-black` |
| 列表项 | `border-b-2 border-black border-dotted` |

### Hover 交互

| 模式 | 效果 | 适用 |
|------|------|------|
| 翻转 | bg-black text-white，子元素反色 | 排名列表项 |
| 浮起 | shadow 4px→6px, translate(-2px,-2px) | 卡片 |
| 下沉 | translate(1px,1px)，阴影消融 | 按钮 |

动画统一 `transition-all`（默认 150ms），进度条 `transition-all`

### 自定义 CSS 类

```css
.brutal-shadow { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
.brutal-shadow-hover:hover { box-shadow: 6px 6px 0px 0px rgba(0,0,0,1); transform: translate(-2px,-2px); }
.window-header { background: #1A1A1A; color: white; padding: 4px 12px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #1A1A1A; }
```

---

## 组件规范

### WindowCard（OS 窗口风格卡片）

外层 `border-2 border-black brutal-shadow overflow-hidden flex flex-col`
标题栏: `window-header h-8`，左侧三色圆点 `w-2 h-2 rounded-full`（red-500/yellow-400/green-500），标题 `text-[10px] font-bold uppercase tracking-widest`
内容区 `p-4 flex-1`，背景可切换任意强调色

### Section Header

`col-span-12 mt-16 mb-8 border-b-4 border-black pb-4 flex items-center gap-3`
图标方块 `p-2 bg-black text-white brutal-shadow`，标题 `text-4xl font-black uppercase tracking-tighter italic`

### KPI 卡片

WindowCard 交替强调色底，数值 `text-3xl font-black`，分隔线 `h-px bg-black`，说明 `text-sm font-bold opacity-80 uppercase`

### 排名列表项

`flex items-center gap-4 p-3 border-2 border-black bg-white`
Hover: `bg-black text-white`（整项翻转），序号方块 `w-10 h-10 bg-black text-white`
趋势: ArrowUpRight green-500 / ArrowDownRight red-500

### 操作按钮

`px-8 py-3 bg-black text-white font-black uppercase brutal-shadow`
Hover: `translate-x-1 translate-y-1 transition-all`（阴影消融）

---

## 响应式断点

| 断点 | 布局变化 |
|------|----------|
| >= 1024px (lg) | KPI 4 列，画像 4 列，产品小卡 6 列，py-12 |
| 768px-1023px (md) | 主网格 12 列生效，Header 左右分栏，产品小卡 3 列 |
| 640px-767px (sm) | KPI 2 列，画像 2 列 |
| < 640px | 全部单列堆叠，Header 右侧隐藏，Footer 垂直堆叠 |

---

## 风格建议

- **坚持硬边几何语言**：零圆角 + `border-2 border-black` 粗边框 + brutal-shadow offset 硬阴影
- **色彩取用设计系统**：图表优先从强调色序列取色，页面保持暖白底色
- **以内容流驱动浏览**：Section Header 粗线分隔 + 杂志编辑排版引导阅读节奏
- **Primary / Accent 分工**：primary 粉用于主视觉焦点和数据高亮，accent 绿及其余色块用于交替装饰
