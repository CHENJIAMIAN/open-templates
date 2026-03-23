# Emerald Glow · 翡翠光晕 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Dark Tech — 纯黑底色 x 翡翠绿强调 x 超圆角卡片体系
- **Design Style**: Rounded 圆润几何 x Frosted Glass 毛玻璃
- **Visual Signature**:
  1. 超圆角卡片（32px / 40px），全局无阴影
  2. Sticky 磨砂玻璃头部 `bg-black/80 backdrop-blur-md`
  3. 翡翠绿 accent 色渐变光晕装饰
  4. 翡翠绿实色翻转区块（bg-emerald-500 text-black）
  5. 细线边框 `border border-zinc-800`
- **Emotional Tone**: 科技、高效、掌控

---

## 配色方案

**方案**: Dark Tech + Emerald
**色彩关系**: 纯黑底 + zinc 灰层次 + 翡翠绿强调
**主题**: 深色

> **配色设计理由**：纯黑底色搭配 zinc 灰阶创建深邃层次感，翡翠绿作为唯一高饱和色彩引导视线焦点，光晕装饰赋予科技感温度。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(0 0% 0%) | 页面背景 |
| surface | hsl(240 6% 10%) | 卡片背景（zinc-900 #18181B） |
| header | hsla(0 0% 0% / 0.80) | sticky 头部（80% 黑 + backdrop-blur） |
| text | hsl(0 0% 100%) | 主要文字 |
| textMuted | hsl(240 4% 66%) | 次要文字、图表标签（#A1A1AA） |
| primary | hsl(160 84% 39%) | 主交互色：翡翠绿（#10B981） |
| accent | hsl(240 4% 16%) | 弱强调色：zinc-800 边框、分割线、网格线（#27272A） |
| border | hsl(240 4% 16%) | 卡片边框、分割线（#27272A） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(160 84% 39%)`：主按钮、数据高亮 span、hover 边框、光晕底色、CTA 按钮，视觉权重最高
**Accent（弱强调色）** — `hsl(240 4% 16%)`：卡片边框、分隔线、网格虚线、hover 背景深色层，权重低于 primary

### 衍生规则

- **背景色**：纯黑 → zinc-900 surface → zinc-950 表头，三级深度递进
- **文字色**：白色 → textMuted 灰 → zinc-500 标签 → zinc-600 坐标轴，四级灰度递降
- **Primary 光晕**：`bg-emerald-500/10 blur-[100px]`，绝对定位于卡片右上角
- **Primary 渐变填充**：从 rgba(16,185,129,0.3) 到 rgba(16,185,129,0)，用于面积图
- **边框 hover 提亮**：border-zinc-800 → hover:border-zinc-700 / hover:border-emerald-500/50

### 补充色阶

| Token | HSL | 用途 |
|-------|-----|------|
| surfaceAlt | hsl(240 6% 3%) | 表头背景（zinc-950） |
| textDim | hsl(240 4% 46%) | 标签文字（zinc-500） |
| axisColor | hsl(240 4% 36%) | 坐标轴标签（zinc-600） |
| tooltipBorder | hsl(240 4% 26%) | Tooltip 边框（zinc-700） |

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/上升 | hsl(160 84% 39%) | 同 primary |
| 次要强调 | hsl(187 92% 43%) | cyan-500 |
| 负向/下降 | hsl(0 84% 60%) | red-500 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(160,84%,39%)', 'hsl(187,92%,43%)', 'hsl(217,91%,60%)', 'hsl(258,90%,66%)', 'hsl(347,77%,50%)'];
//               翡翠绿              青蓝                蓝                  紫                  玫红
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, -apple-system, sans-serif', color: '#a1a1aa' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 48 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: '#52525b', fontSize: 12 },
    splitLine: { show: true, lineStyle: { color: '#27272a', type: 'dashed' } }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: '#52525b', fontSize: 12 },
    splitLine: { show: true, lineStyle: { color: '#27272a', type: 'dashed' } }
  },
  tooltip: {
    trigger: 'axis', backgroundColor: '#18181b', borderColor: '#3f3f46', borderWidth: 1,
    borderRadius: 12, textStyle: { color: '#10b981' },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(39,39,42,0.4)' } }
  },
  legend: {
    bottom: 0, icon: 'circle', itemWidth: 8, itemHeight: 8,
    textStyle: { color: '#a1a1aa', fontSize: 10, fontWeight: 'bold' }
  }
};
```

### 各图表类型默认 series 样式

- **line（面积渐变）**: `smooth: true`, `symbol: 'none'`, `lineStyle.width: 3`, `areaStyle` 线性渐变 emerald 30%→0%
- **bar（水平条形）**: `barWidth: 24`, `borderRadius: [0,4,4,0]`, 按 COLORS 循环着色
- **pie 环形**: `radius: [60,80]`, `padAngle: 5`, `borderWidth: 0`, COLORS 循环，`label: { show: false }`

### 图表容器

容器 `bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6/p-8`，无阴影
高度 `h-[300px]`（标准）/ `h-[240px]`（紧凑），网格 `grid-cols-1 lg:grid-cols-2 gap-8`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
```

| 用途 | 字体栈 |
|------|--------|
| 全局 | `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|------|------|------|
| 页面标题 | `text-xl font-bold tracking-tight` | text |
| 大标题 | `text-4xl font-black tracking-tighter leading-none uppercase` | text |
| 区块标题 | `text-xl / text-2xl font-bold uppercase` | text |
| 图表标题 | `text-lg font-bold` + lucide 图标 | text |
| KPI 数值 | `text-2xl font-bold tracking-tight` | text |
| 正文 | `text-lg leading-relaxed` | textMuted |
| 标签 | `text-xs font-medium` | hsl(240 4% 46%) |
| 微标签 | `text-[10px] font-bold uppercase tracking-widest` | hsl(240 4% 46%) |
| 数据高亮 | `font-bold` 内联 span | primary / cyan |

---

## 页面结构

> 单页纵向滚动，Sticky Header + 全局 space-y-8 间距。

```
Sticky Header（磨砂玻璃 — 左标题 + 右元信息）
Executive Summary（lg:grid-cols-3，左 2/3 大卡 + 右 1/3 信息卡）
KPI 指标行（grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8）
图表区（lg:grid-cols-2 gap-8）
数据表格（全宽，横向可滚动）
内容区（lg:grid-cols-3，左 2/3 + 右 1/3）
底部洞察区（md:grid-cols-2，翡翠绿实色卡 + 暗色摘要卡）
Footer（极简信息栏）
```

页面 `min-h-screen bg-black text-white`，内容 `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
选中态 `selection:bg-emerald-500/30`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 模块间距 | `space-y-8` / `gap-8` (32px) |
| 组件间距 | `gap-4` (16px) |
| 卡片内边距 | `p-6` (24px) / `p-8` (32px) |
| 表格单元格 | `p-4` (16px) |

### 圆角与阴影

| 元素 | 圆角 | 阴影 |
|------|------|------|
| 大卡片 | 32px (`rounded-[2rem]`) | 无 |
| 洞察卡片 | 40px (`rounded-[2.5rem]`) | 无 |
| 小卡片 / KPI | 16px (`rounded-2xl`) | 无 |
| 图标容器 | 12px (`rounded-xl`) | 无 |
| 标签 / badge | `rounded-full` | 无 |
| Select 控件 | 8px (`rounded-lg`) | 无 |

### 边框

卡片 `border border-zinc-800`，表格行 `divide-y divide-zinc-800/50`
Header 底部 `border-b border-zinc-800`，分隔线 `h-px bg-zinc-800`

### 特殊效果

磨砂玻璃 Header: `bg-black/80 backdrop-blur-md`
光晕: `bg-emerald-500/10 blur-[100px]`，absolute 右上角
选中高亮: `selection:bg-emerald-500/30`

### Hover 交互

| 模式 | 效果 |
|------|------|
| 卡片边框变亮 | `hover:border-zinc-700 transition-all duration-300` |
| 边框变 primary | `hover:border-emerald-500/50 transition-all` |
| 文字变色 | `group-hover:text-emerald-400 transition-colors` |
| 图标缩放 | `group-hover:scale-110 transition-transform` |
| 表格行 | `hover:bg-zinc-800/30 transition-colors` |
| 按钮 | `hover:bg-emerald-400` |

动画: 卡片 `transition-all duration-300`，文字/表格行 `transition-colors 150ms`，图标 `transition-transform`

---

## 组件规范

### KPI 指标卡片

`bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl group hover:border-zinc-700`
顶行: 左图标 `p-3 rounded-xl bg-{color}-500/10` + 右变化标签 `px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400`
底行: 标题 `text-zinc-400 text-sm` + 数值 `text-2xl font-bold tracking-tight`

### 大卡片（带光晕）

`bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] relative overflow-hidden`
光晕 `absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]`
标题 `text-4xl font-black tracking-tighter uppercase`，正文 `text-zinc-400 text-lg max-w-xl`

### 数据表格

外容器 `bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden`
表头 `p-4 text-[10px] uppercase tracking-widest font-black text-zinc-500 bg-zinc-950/50`
行 `hover:bg-zinc-800/30 transition-colors divide-y divide-zinc-800/50`
关键指标 `font-black text-white group-hover:text-emerald-400`
汇总行 `bg-emerald-500/5 font-black text-emerald-400`

### 翡翠绿实色卡片

`bg-emerald-500 p-8 rounded-[2.5rem] text-black`
子卡片 `bg-white/10 p-4 rounded-2xl backdrop-blur-sm`

### 暗色摘要卡片

`bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem]`
列表标记 `w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150`
CTA `bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-2xl font-black`

---

## 响应式断点

| 断点 | 布局变化 |
|------|----------|
| >= 1024px (lg) | KPI 4 列, 图表 2 列, 内容区 2/3+1/3, Header 单行 |
| >= 768px (md) | KPI 2 列 gap-8, 洞察区 2 列, Header 部分折行 |
| < 768px | KPI 2 列 gap-4, 全部单列, 表格横向滚动 |

---

## 风格建议

- **超圆角体系是核心识别**：rounded-[2rem] / rounded-[2.5rem] 贯穿所有卡片，不可降级
- **纯黑底 + 翡翠绿 primary**：翡翠绿仅用于数据高亮、按钮、光晕与 hover 反馈
- **磨砂玻璃 sticky Header**：保持 `bg-black/80 backdrop-blur-md` 的科技质感
- **全局无阴影设计**：层次感完全依靠边框色阶和背景深度区分
- **Primary / Accent 分工**：primary 翡翠绿专用于视觉焦点与交互反馈，accent zinc-800 用于结构边框与分割线
