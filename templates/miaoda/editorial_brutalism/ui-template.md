# Editorial Brutalism · 粗野主义 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Editorial Typography x Brutalism — 高对比度、大字号、强结构感的平面设计风格
- **Visual Signature**:
  1. 黑白极简配色 + 超大 display 字体（Titan One 最大达 14rem）
  2. 纸质纹理噪点覆盖层（feTurbulence, opacity 0.08）
  3. 硬边框阴影（hard-edge shadow, 纯色无模糊固定偏移）
  4. 几何放射线 SVG 装饰元素
  5. 全大写等宽标签 + 极端留白
- **Emotional Tone**: 专业自信、先锋前卫、克制有力
- **Design Style**: Bauhaus 包豪斯 x Editorial 经典排版

---

## 配色方案

**方案**: Paper & Ink（极简黑白体系）
**色彩关系**: 纸张色基底 + 墨色主调 + 零彩色
**主题**: 浅色

> **配色设计理由**：极简黑白体系以纸张色为基底、墨色为主色调，通过零彩色设计制造版式印刷般的张力。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(40 19% 95%) | 页面主背景，纸张色 |
| surface | hsl(0 0% 90%) | 图片占位、卡片内容区域 |
| header | hsl(0 0% 9%) | 页脚背景、强调区块背景 |
| text | hsl(0 0% 10%) | 正文标题、主要文字 |
| textMuted | hsl(0 0% 45%) | 分类标签、辅助信息、时间戳 |
| primary | hsl(0 0% 0%) | 主交互色：按钮填充、图标、边框 |
| accent | hsl(0 0% 64%) | 弱强调色：弱辅助文字、Section 编号 |
| border | hsl(0 0% 9%) | 分割线、卡片边框、Marquee 边框 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(0 0% 0%)`：按钮填充、硬边阴影、粗边框，视觉权重最高
**Accent（弱强调色）** — `hsl(0 0% 64%)`：弱辅助文字、Section 编号、装饰线，权重低于 primary

### 衍生规则

- **bg（纸张色）**：hsl(40 19% 95%) 暖米色，叠加噪点纹理形成物理纸感
- **surface**：neutral-200，用于占位和非核心内容区
- **header**：neutral-900，深色反转区块（页脚），内文字用 bg 色
- **primary vs text**：primary 纯黑用于交互/阴影/边框，text 墨黑用于文字内容
- **无彩色体系**：全局不引入任何色相，通过明度差异建立层级

### 补充色阶

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 次要正文 | hsl(0 0% 25%) | neutral-700 |
| 深色区域边框 | hsl(0 0% 15%) | neutral-800 |
| 选区高亮背景 | hsl(0 0% 9%) | neutral-900 |
| 选区高亮文字 | hsl(0 0% 100%) | white |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(0,0%,10%)', 'hsl(0,0%,25%)', 'hsl(0,0%,45%)', 'hsl(0,0%,64%)', 'hsl(0,0%,83%)'];
//               墨黑              深灰              中灰              浅灰              亮灰
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Space Mono, Inter, monospace', color: 'hsl(0,0%,45%)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { lineStyle: { color: 'hsl(0,0%,9%)' } }, axisTick: { show: false },
    axisLabel: { color: 'hsl(0,0%,10%)', fontSize: 14, fontFamily: 'Space Mono', margin: 10 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(0,0%,10%)', fontSize: 14, fontFamily: 'Space Mono' },
    splitLine: { lineStyle: { color: 'hsl(0,0%,90%)', type: 'solid' } }
  },
  tooltip: {
    trigger: 'axis', backgroundColor: 'hsl(40,19%,95%)', borderColor: 'hsl(0,0%,9%)',
    borderWidth: 2, borderRadius: 0, padding: 16, shadowBlur: 0,
    textStyle: { fontFamily: 'Space Mono', color: 'hsl(0,0%,10%)', fontSize: 12 },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(23,23,23,0.08)' } }
  },
  legend: {
    textStyle: { fontFamily: 'Space Mono', color: 'hsl(0,0%,45%)', fontSize: 12 },
    icon: 'rect', itemWidth: 12, itemHeight: 8, itemGap: 16
  }
};
```

### 各图表类型默认 series 样式

- **line**: `smooth: false`, `lineStyle.width: 2`, `symbol: 'circle'`, `symbolSize: 8`
- **bar**: `barWidth: 24`, `itemStyle.borderRadius: [0,4,4,0]`（右端微圆角）
- **pie 环形**: `radius: ['45%','60%']`, `padAngle: 2`, `label: { show: false }`
- **pie 实心**: `radius: '60%'`, 内部 label, color bg, fontWeight bold
- **水平 bar**: yAxis category, `barWidth: 24`, `borderRadius: [0,4,4,0]`

### 图表容器

容器 `border border-black bg-paper shadow-[4px_4px_0px_0px_#000000]`
零圆角，`p-6` / `p-8`
高度 `h-[400px]` 大 / `h-80` 中 / `h-64` 小，`font-mono`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 展示/标题 | `Titan One, cursive` (font-display) |
| 正文/UI | `Inter, sans-serif` (font-sans) |
| 等宽/标签/数据 | `Space Mono, monospace` (font-mono) |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| Hero 巨型标题 | `text-[23vw] md:text-[14rem] font-display tracking-tight leading-[0.8]` | text |
| 背景水印 | `text-[25vw]~[40vw] font-display opacity-[0.03]~opacity-10` | text |
| Section 大标题 | `text-5xl md:text-8xl font-display uppercase tracking-tight leading-none` | text |
| 统计数值 | `text-3xl font-display font-bold` | text |
| 等宽标签 | `text-[10px]~text-sm font-mono uppercase tracking-widest` | textMuted |
| 等宽正文 | `text-sm md:text-base font-mono leading-relaxed` | text |
| Marquee | `text-lg md:text-xl font-mono font-bold tracking-widest` | text |

---

## 页面结构

> 粗野主义杂志布局 — 超大 display 字体 + 硬边框阴影 + 纸质纹理。

```
Fixed Header（右上角等宽标识, mix-blend-difference, z-40）
  → Hero Section（90vh, 居中超大字, 放射线 SVG, 左上名字+右下年份）
  → Marquee（全宽 border-y-2, 水平无限循环）
  → Info Grid Section（2 列: 教育/经历/工具/技能 四象限）
  → Marquee（rotate-1 微旋转变体）
  → Selected Works（12 列: 左 5 sticky 信息栏 | 右 7 图片画廊）
  → Footer（深色反转 bg-neutral-900）
```

主内容 `max-w-7xl`，页脚 `max-w-4xl`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 页面内边距 | `px-4 md:px-12` |
| Section 上下 | `py-24` / `py-32` |
| Section 标题下 | `mb-24` |
| 作品间距 | `gap-32 md:gap-48` |
| Marquee 间隔 | `my-20` |

### 圆角与阴影

> Design DNA: Bauhaus — `sharp (0px)` + hard-edge shadow

| 元素 | 阴影 |
|------|------|
| 统计卡片 | `shadow-[4px_4px_0px_0px_#000000]` |
| 图片容器 | `shadow-[8px_8px_0px_0px_#000000]` |
| 页脚按钮 | `shadow-[4px_4px_0px_0px_#ffffff]` |
| 软件图标 | `rounded-3xl`（唯一圆角例外） |
| 技能子弹点 | `rounded-sm rotate-45` |

零圆角贯穿卡片/图表/Tooltip，硬边框阴影无模糊。

### 边框系统

| 场景 | 样式 |
|-----|-----|
| Section 标题底线 | `border-b-4 border-neutral-900` |
| 图片容器 | `border-2 border-black` |
| 统计卡片 | `border border-black` |
| Marquee | `border-y-2 border-neutral-900` |
| 分割虚线 | `border-t-4 border-black border-dashed` |

### 纹理叠加（噪点）

全屏 `fixed z-50 pointer-events-none opacity-0.08`
`feTurbulence baseFrequency: 0.8, numOctaves: 3`

### 图片效果

`filter grayscale contrast-125`，hover `grayscale-0 scale-105`
Hover 叠加标签 `bg-black text-white font-mono text-xs uppercase`

---

## 组件规范

### 按钮

主按钮(深色底用): `px-8 py-4 bg-paper text-ink font-bold font-mono shadow-[4px_4px_0px_0px_#ffffff] hover:scale-105`
次按钮: `px-8 py-4 border-2 border-paper text-paper font-mono hover:bg-paper hover:text-ink`
文字 CTA: `font-mono font-bold uppercase tracking-wider hover:underline`

### 统计卡片

`bg-paper border border-black p-4 shadow-[4px_4px_0px_0px_#000000]`
数值 `font-display text-3xl font-bold`
标签 `font-mono text-[10px] text-neutral-500 uppercase tracking-wider`

### 图片画廊卡片

`border-2 border-black bg-neutral-200 shadow-[8px_8px_0px_0px_#000000] overflow-hidden`
首图 `aspect-video`，后续 `aspect-square`

### 工具图标

`w-20 h-20 md:w-24 md:h-24 bg-black rounded-3xl flex items-center justify-center`
Hover `hover:-rotate-6 hover:scale-110 transition-transform duration-300`

### Section 标题

`flex items-baseline gap-4 mb-24 border-b-4 border-neutral-900 pb-6`
编号 `font-display text-4xl text-neutral-400`
标题 `font-display text-5xl md:text-8xl uppercase tracking-tight leading-none`

### Marquee

`w-full bg-paper overflow-hidden py-3 md:py-4 border-y-2 border-neutral-900 select-none`
动画 `translateX(-100%) 20s linear infinite`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 12 列作品网格(5+7), 列间距 gap-x-48, sticky 侧栏 |
| >= 768px (md) | 双列网格, Hero text-[14rem], 放射线显示 |
| < 768px | 单列, Hero text-[23vw], 放射线隐藏, 页脚按钮 flex-col |

---

## 风格建议

- **硬边框阴影是核心标识**：`shadow-[Npx_Npx_0px_0px_#000]` 贯穿所有组件
- **字体层级张力**：display(Titan One) 超大尺寸 vs mono(Space Mono) 小尺寸形成强对比
- **以留白和结构线引导视觉**：`gap-32~48` 大留白 + `border-b-4` 粗实线 + `border-dashed` 虚线
- **Primary / Accent 分工**：primary（纯黑）交互与阴影，accent（neutral-400）弱辅助与编号
- **纸质纹理不可移除**：噪点叠加层赋予数字界面以胶片/印刷触感
- **零彩色原则**：不引入任何色相，通过明度差异建立所有层级
