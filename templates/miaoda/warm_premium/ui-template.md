# Warm Premium · 暖调精致风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Warm Premium — 暖色渐变底 x 白色超圆角卡片 x 黄色点缀
- **Design Style**: Soft Blocks 柔色块 x Rounded 圆润几何 — 暖色渐变 + 超圆角白色卡片 + 深色反转区域对比
- **Visual Signature**:
  1. 暖色线性渐变页面背景（beige / cream / warm gray 三色混合）
  2. 白色超圆角卡片（rounded-[2rem] / 32px）+ 极轻阴影 + 极细边框
  3. 黄色全局点缀色 — 活跃态、CTA、装饰元素
  4. 深色反转区域（surfaceDark + surfaceEmbed）形成视觉对比层
  5. 纤细圆柱 pill 型 CSS 柱图、环形进度指示器、线性进度条
  6. 灰度高对比人物头像 + 渐变遮罩 + 磨砂玻璃标签
- **Emotional Tone**: 温暖、安心、掌控感

---

## 配色方案

**方案**: 自定义 — Warm Premium（浅色主题）
**色彩关系**: 暖米渐变底 + 白色卡片 + 黄色点缀 + 深色反转区
**主题**: 浅色

> **配色设计理由**：暖色渐变背景营造温暖质感，白色卡片提供清爽阅读面，黄色 primary 在两种底色上均可醒目突出，深色反转区制造视觉节奏。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | linear-gradient(to bottom right, hsla(216 4% 90% / 0.6), hsla(48 88% 85% / 0.6), hsla(40 56% 87% / 0.6)) | 页面渐变背景 |
| surface | hsl(0 0% 100%) | 卡片背景 |
| header | hsl(0 0% 18%) | 深色侧边区背景（surfaceDark） |
| text | hsl(215 25% 17%) | 主要文字 |
| textMuted | hsl(218 11% 65%) | 次要文字 / 标签 |
| primary | hsl(48 96% 53%) | 主交互色：黄色强调、CTA、活跃态 |
| accent | hsl(0 0% 10%) | 弱强调色：嵌入式深色卡片（surfaceEmbed） |
| border | hsl(220 14% 96%) | 卡片边框 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(48 96% 53%)`：CTA 按钮、活跃态、柱体高亮、装饰元素，视觉权重最高
**Accent（弱强调色）** — `hsl(0 0% 10%)`：嵌入式深色卡片背景、深色区内层，权重低于 primary

### 衍生规则

- **页面背景**：三色暖调渐变（各 0.6 透明度），营造纸质温暖感
- **卡片面**：纯白 + shadow-sm + 极淡 border，悬浮于渐变背景上
- **深色区域**：surfaceDark hsl(0 0% 18%) 作为侧边区，accent hsl(0 0% 10%) 作为内嵌卡片
- **primary 前景色**：黑色，确保黄色底上对比度 > 4.5:1
- **语义绿**: hsl(136 31% 52%) 正向/安全状态，danger hsl(0 84% 60%) 紧急/告警

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/安全 | hsl(136 31% 52%) | 绿色 |
| 负向/告警 | hsl(0 84% 60%) | 红色 |
| 辅助暗灰 | hsl(215 16% 47%) | 辅助标签 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(48,96%,53%)', 'hsl(215,25%,17%)', 'hsl(216,12%,72%)', 'hsl(136,31%,52%)', 'hsl(0,84%,60%)'];
//               黄色                深灰                浅灰                绿色                红色
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS, backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, sans-serif', color: 'hsl(218,11%,65%)' },
  tooltip: { backgroundColor: '#fff', borderColor: 'hsl(220,14%,96%)', borderWidth: 1, borderRadius: 16, textStyle: { color: 'hsl(215,25%,17%)', fontSize: 12 }, trigger: 'axis', extraCssText: 'box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);' },
  legend: { bottom: 0, textStyle: { color: 'hsl(218,11%,65%)', fontSize: 11 }, icon: 'circle', itemWidth: 8, itemHeight: 8 },
  grid: { top: 24, right: 16, bottom: 32, left: 16, containLabel: true },
  xAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: 'hsl(218,11%,65%)', fontSize: 9, fontWeight: 'bold' }, splitLine: { show: false } },
  yAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: 'hsl(218,11%,65%)', fontSize: 9 }, splitLine: { lineStyle: { color: 'hsl(220,14%,96%)', type: 'dashed' } } },
  animationDuration: 500, animationEasing: 'cubicOut'
};
```

### 各图表类型默认 series 样式

- **bar (pill 型)**: `barWidth: 12`, `itemStyle.borderRadius: [6,6,6,6]`（全圆角 pill），默认 slate-200，emphasis primary 色 + 黄色光晕
- **pie 环形**: `radius: ['60%','75%']`, `padAngle: 3`, `itemStyle.borderRadius: 4`, `label: { show: false }`

### 图表容器

容器 `bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6` / `p-8`
Hover `hover:shadow-md transition-all`，高度 `h-32`（紧凑）/ 自适应

### 非图表可视化（保留 CSS）

- **环形指示器**: `border-[10px] border-yellow-400 border-r-transparent rotate-45`
- **进度条（浅色区）**: `h-1 bg-slate-50 rounded-full`，填充 yellow-400 / slate-800 / slate-300
- **进度条（深色区）**: `h-1.5 bg-white/10 rounded-full`，填充 yellow-400 / white/40 / 绿色

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

唯一字体：**Inter**

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面大标题 | `text-4xl font-semibold tracking-tight` | text |
| 大数值 KPI | `text-4xl font-light tracking-tight` | text / 绿色 / orange-500 |
| 卡片标题 | `font-bold tracking-tight` | text |
| 全大写标签 | `text-[10px] font-bold uppercase tracking-widest` | textMuted |
| 斜体标签 | `text-[10px] italic uppercase tracking-[0.2em]` | textMuted |
| 数据值 | `text-sm font-mono font-bold tracking-tight` | text |
| 深色区标题 | `text-2xl font-bold italic tracking-tighter` | white |
| 深色区进度 | `text-3xl font-light font-mono opacity-50` | white |

---

## 页面结构

> 顶部操作栏 + Hero 信息行 + 三栏主内容网格（3+6+3 / 12 列）。

```
Topbar（Logo pill + 操作图标 + 头像）
  → Hero Section（左: 大标题 | 右: 3 个大数值 KPI）
  → Main Grid（12 列）:
      左 3 列: 卡片 A + 卡片 B（垂直堆叠）
      中 6 列: 上 两个并排卡片 + 下 大卡片
      右 3 列: 深色侧边卡片（h-full 通高）
```

| 元素 | 样式 |
|-----|-----|
| 页面背景 | 暖色 linear-gradient |
| 内容容器 | `p-4 md:p-8`，全宽响应式 |
| 主网格 | `grid-cols-1 lg:grid-cols-12 gap-6` |
| 卡片间距 | `gap-6` |

### Topbar

Logo `bg-black text-white px-5 py-2 rounded-full font-bold text-xl tracking-tighter` + 图标 text-yellow-400
操作按钮 `p-2 border border-gray-200 rounded-full hover:bg-white`
头像 `w-10 h-10 rounded-full border border-gray-300 hover:ring-2 ring-yellow-400`

---

## 视觉风格

### 间距系统

| 场景 | 值 |
|-----|---|
| 页面内边距 | `p-4 md:p-8` |
| 卡片间距 | `gap-6` |
| Section 间距 | `mb-8` / `mb-10` |
| Hero KPI 间距 | `gap-8 md:gap-12` |

### 圆角与阴影

> Design DNA: Soft Blocks + Rounded — 超圆角 + 极轻阴影

| 元素 | 圆角 | 阴影 |
|-----|-----|-----|
| 主卡片 | `rounded-[2rem]` (32px) | `shadow-sm` → hover `shadow-md` |
| 嵌入卡片 | `rounded-[1.5rem]` (24px) | `shadow-lg` |
| Logo / CTA | `rounded-full` | `shadow-lg shadow-black/10` |
| 图标容器 | `rounded-xl` / `rounded-2xl` | 无 |
| 深色侧边区 | `rounded-[2rem]` | `shadow-2xl` |

### 边框

白色卡片 `border border-gray-100` | 深色区域 `border border-white/10` 或 `border-dashed border-white/20` | 列表分隔 `border-dashed border-gray-200`

### Hover 交互

| 模式 | 效果 |
|-----|-----|
| 阴影增强 | 卡片 `hover:shadow-md` |
| 上移 | 嵌入卡片 `hover:-translate-y-1` |
| 图片缩放 | `group-hover:scale-110 transition-transform duration-1000` |
| 颜色切换 | 图标 `group-hover:bg-yellow-400 group-hover:text-black duration-500` |
| tracking 展开 | `group-hover:tracking-[0.25em]` |

### 特殊视觉效果

暖色渐变背景（三色 linear-gradient）| 磨砂玻璃标签 `backdrop-blur-md border border-white/20 bg-white/10` | 装饰光晕 `blur-[80px]` | 黄色发光 `shadow-[0_0_15px_rgba(250,204,21,0.4)]` | 灰度头像 `grayscale contrast-125` | 脉冲 `animate-pulse`

---

## 组件规范

### 通用卡片

`bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all`

### 人物头像卡片

图片区 `rounded-2xl aspect-[4/5] grayscale contrast-125`，hover `scale-110 duration-1000`
遮罩 `bg-gradient-to-t from-black/80 via-transparent`
磨砂标签 `bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg`

### 列表卡片

标题 `text-xs font-bold italic underline uppercase decoration-yellow-400`
列表项图标 `p-2 bg-slate-50 rounded-xl group-hover:bg-yellow-50`
数值 `text-sm font-mono font-bold tracking-tight`
分隔 `border-dashed border-gray-200`

### 柱状图卡片（CSS 实现）

柱体 `w-full max-w-[12px] rounded-full`，活跃 `bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]`

### 深色侧边栏

容器 `bg-[hsl(0,0%,18%)] text-white p-8 rounded-[2rem] h-full shadow-2xl`
装饰光晕：左上 `bg-white/5 blur-[80px]`，右下 `bg-yellow-400/10 blur-[60px]`
目标进度 `h-1.5 bg-white/10 rounded-full`，填充 `bg-yellow-400` / `bg-white/40` / 绿色
新增按钮 `border border-dashed border-white/20 rounded-2xl hover:bg-white/5`
CTA `bg-white/5 border border-white/10 py-5 rounded-2xl hover:tracking-[0.25em]`

---

## 响应式断点

| 断点 | 布局 |
|-----|-----|
| >= 1024px (lg) | 12 列网格（3+6+3），Hero 12 列分栏（4+8） |
| 768px ~ 1023px (md) | 中间区域卡片 2 列并排，Hero KPI flex-wrap |
| < 768px | 全部单列堆叠，p-4 |

---

## 风格建议

- **暖色渐变背景 + 超圆角卡片 rounded-[2rem]**是核心视觉签名
- **Primary / Accent 分工明确**：primary（黄色）专用于主交互和视觉焦点，accent（深色嵌入）用于对比层次
- 保持浅色暖底与深色反转区的对比节奏，利用极轻阴影营造柔和精致感
- 三栏 12 列网格布局（3+6+3）和 Inter 字体必须保持
