# Newsprint · 新闻印刷 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Editorial Agency — 报刊排版 x 暖米底 x 全黑线框网格
- **Design Style**: Editorial 经典排版 x Grid 网格
- **Visual Signature**:
  1. 暖米色底 + 全黑 1px 线框网格分割，零圆角方角系统
  2. Archivo Black 全大写标题 + Space Grotesk 正文，强几何感
  3. 纯灰度图表配色（#000 -> #ddd），无彩色数据系列
  4. 黑色滚动 Marquee 跑马灯（opacity-20）作为区块分隔
  5. 黑白反转交互（hover:bg-black hover:text-white）
  6. 噪声纹理叠加（grain, opacity 0.05）+ 几何装饰（圆形+旋转方形）
- **Emotional Tone**: 权威、克制、报刊阅读感

---

## 配色方案

**方案**: Editorial Warm Beige（浅色主题）
**色彩关系**: 暖米色底 + 纯黑强调 + 全灰度数据
**主题**: 浅色

> **配色设计理由**：暖米色底色营造报刊纸张质感，纯黑作为唯一强调色贯穿边框、标题和数据系列，全灰度图表配色传递权威克制的编辑态度。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(36 17% 87%) | 页面背景（暖米色 #E5E1DA） |
| surface | hsl(30 6% 82%) | 次级面板背景（侧栏、marquee #D6D3D1） |
| header | hsl(40 8% 78%) | Header 右栏背景（#D1CFC7） |
| text | hsl(0 0% 0%) | 主文字、标题、边框 |
| textMuted | hsl(215 16% 47%) | 次要文字、元信息标签（slate-500） |
| primary | hsl(0 0% 0%) | 主交互色：纯黑（数据系列、强调色、反转区） |
| accent | hsl(30 6% 82%) | 弱强调色：次级面板背景、marquee 底色 |
| border | hsl(0 0% 0%) | 全局边框，1px solid black |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(0 0% 0%)`：数据系列首色、反转区背景、hover 填充色，视觉权重最高
**Accent（弱强调色）** — `hsl(30 6% 82%)`：侧栏背景、marquee 底色、次级面板区分，权重低于 primary

### 衍生规则

- **背景色**：hsl(36 17% 87%) 暖米色，模拟报刊新闻纸质感
- **灰度数据序列**：hsl(0 0% 0%) → hsl(0 0% 27%) → hsl(0 0% 53%) → hsl(0 0% 73%) → hsl(0 0% 87%)
- **反转区**：纯黑底 + bg 色标题 hsl(36 17% 87%) + 白色正文，营造杂志深色版块
- **边框统一**：全局 1px solid black，水平/垂直分隔一致

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/增长 | hsl(160 84% 39%) | emerald-600 |
| 中性提示 | hsl(215 16% 47%) | slate-500 |
| 反转区标题 | hsl(36 17% 87%) | 在黑底上使用 bg 色 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(0,0%,0%)', 'hsl(0,0%,27%)', 'hsl(0,0%,53%)', 'hsl(0,0%,73%)', 'hsl(0,0%,87%)'];
//               纯黑             深灰             中灰             浅灰             极浅灰
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { color: '#000000' },
  grid: { containLabel: true, top: 32, right: 16, bottom: 32, left: 16 },
  xAxis: {
    axisLine: { lineStyle: { color: '#000000' } }, axisTick: { show: false },
    axisLabel: { color: '#000000', fontSize: 10, fontWeight: 'bold' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { lineStyle: { color: '#000000' } }, axisTick: { show: false },
    axisLabel: { color: '#000000', fontSize: 10, fontWeight: 'bold' },
    splitLine: { lineStyle: { color: '#cccccc', type: 'dashed' } }
  },
  tooltip: {
    backgroundColor: '#000000', borderWidth: 0,
    textStyle: { color: '#ffffff', fontSize: 12 }, trigger: 'axis'
  },
  legend: {
    bottom: 0, textStyle: { color: '#64748b', fontSize: 12 },
    icon: 'rect', itemWidth: 10, itemHeight: 10
  },
  animationDuration: 800, animationEasing: 'cubicOut'
};
```

### 各图表类型默认 series 样式

- **line（阶梯面积）**: `step: 'end'`, `lineStyle: { width: 3, color: '#000' }`, `areaStyle: { color: '#000', opacity: 0.1 }`, `symbol: 'none'`, emphasis disabled
- **bar**: `barMaxWidth: 32`, `itemStyle.color: '#000'`, emphasis `color: '#444'`
- **pie**: `radius: ['40%','70%']`, `itemStyle: { borderColor: bg色, borderWidth: 2 }`, `label.fontSize: 10`, emphasis `scale: false`

### 图表容器

无独立卡片，用 `border-b border-black` 分割；零圆角，无阴影
内边距 `p-8`，图表高度 `h-[300px]`，背景 transparent
Tooltip: 纯黑底白字，无边框，无圆角

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

| 用途 | 字体 |
|------|------|
| 标题 | `'Archivo Black', sans-serif`（全大写，极粗几何无衬线） |
| 正文/数字 | `'Space Grotesk', system-ui, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|------|------|------|
| 页面主标题 | `heading-bold text-6xl leading-[0.9] tracking-tighter` | text |
| Section 标题 | `heading-bold text-3xl` | text |
| KPI 数值 | `heading-bold text-4xl` | text |
| SectionLabel | `heading-bold text-xl` + ArrowUpRight 图标, `border-b border-black p-4` | text |
| 正文描述 | `text-sm leading-relaxed font-medium` | text / textMuted |
| 标签/元信息 | `text-[10px] uppercase font-bold tracking-widest` | textMuted |
| 增长标识 | `text-xs uppercase font-bold` | hsl(160 84% 39%) |
| 反转区标题 | `heading-bold text-3xl` | bg 色（在黑底上） |
| 反转区正文 | `text-xs font-medium leading-relaxed` | white |

---

## 页面结构

> Editorial Agency Dashboard — 报刊网格布局 x 黑线分割 x 杂志式非等分栏。

```
全局容器: max-w-[1400px] mx-auto border-x border-black bg-[bg]
Header（双栏 grid-cols-2）
  ├── 左栏 (p-8 border-r): 主标题 + 副信息 + 按钮组
  └── 右栏 (p-8 bg-[header]): 描述 + 元信息 + 几何装饰
KPI 网格 (grid-cols-4, border-b, 每格 border-r)
Marquee 跑马灯 (border-y, bg-[surface], heading-bold text-3xl opacity-20)
Main Grid (grid-cols-12):
  ├── 左 col-span-8 (border-r): 图表区 + 下半区 grid-cols-2
  └── 右 col-span-4 (bg-[surface]): 信息列表 + 反转深色区块
Marquee
Footer (grid-cols-3, border-t)
```

导航: Header 品牌区 + Section 黑线分隔的纵向浏览，单页长滚动
全局容器 `max-w-[1400px] mx-auto border-x border-black`
噪声纹理: `.grain` fixed inset-0 z-50, SVG feTurbulence, opacity 0.05

---

## 视觉风格

### 圆角与阴影

所有容器/按钮: 零圆角，无阴影

### 边框

全局规则: 1px solid black
水平 `border-b border-black`，垂直 `border-r border-black`
页面两侧 `border-x border-black`，区块上下 `border-y border-black`

### Hover 交互

| 模式 | 样式 | 场景 |
|------|------|------|
| 黑白反转 | `hover:bg-black hover:text-white transition-colors` | 按钮、图标方块 |
| 下划线 | `group-hover:underline` | 卡片标题、Footer 链接 |
| 透明度 | `opacity-30 → group-hover:opacity-100` | 列表序号 |

### 动画

Hover 反转 `transition-colors`，进度条填充 `transition-all duration-1000`
Marquee `20s linear infinite translateX(-100%)`，内容复制 10 份

### Marquee 跑马灯

`border-y border-black py-2 bg-[surface] overflow-hidden`
`heading-bold text-3xl mx-8 opacity-20 whitespace-nowrap`
动画 `animate-[marquee_20s_linear_infinite]`

---

## 组件规范

### KPI 指标网格

`grid grid-cols-1 md:grid-cols-4 border-b border-black`，每格 `p-8 border-r`
SectionLabel `heading-bold text-xl` + ArrowUpRight，数值 `heading-bold text-4xl`

### CSS 进度条

轨道 `w-full bg-black/10 h-6 border border-black overflow-hidden`
填充 `bg-black h-full transition-all duration-1000`

### 内容卡片

`pb-4 border-b border-black group`，标题 `heading-bold text-lg group-hover:underline`
描述 `text-xs font-medium text-slate-600`，标签 `text-xs font-bold uppercase border border-black px-2 py-1`

### 深色反转区块

`p-8 bg-black text-white min-h-[400px] flex flex-col justify-between`
标题 `heading-bold text-3xl text-[bg色]`，序号 `opacity-30 group-hover:opacity-100`
底部数值 `heading-bold text-4xl`

### 方角按钮

`flex items-center gap-2 px-6 py-2 border border-black text-sm font-bold hover:bg-black hover:text-white transition-colors`

---

## 响应式断点

| 断点 | 布局变化 |
|------|----------|
| >= 768px (md) | Header 2 列, KPI 4 列, 主区域 8+4 列, Footer 3 列 |
| < 768px | 全部单列堆叠, border-r 取消, 所有 grid 变 1 列 |

---

## 风格建议

- **暖米色背景是核心基调**：hsl(36 17% 87%) 报刊纸质感不可替换
- **全局方角零圆角零阴影**：1px 黑色实线网格分割系统是编辑风格核心
- **纯灰度图表配色**：保持 5 级灰度序列，不引入彩色数据系列
- **Archivo Black 全大写标题字体**：heading-bold 类贯穿所有标题层级
- **Primary / Accent 分工**：primary 纯黑用于数据系列与反转区，accent 用于次级面板区分
