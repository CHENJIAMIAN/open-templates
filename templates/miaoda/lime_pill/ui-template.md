# Lime Pill · 荧光胶囊 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Neo-Brutalist Dashboard — 超大圆角容器 x 明暗分区 x 荧光黄绿强调 x 粗体层级
- **Design Style**: Rounded 圆润几何 x Soft Blocks 柔色块
- **Visual Signature**:
  1. 超大圆角容器（Pill-shaped Cards，32px / 40px），CTA/标签全圆角
  2. 明暗节奏交替：浅色信息面板 + 深色任务面板
  3. 荧光黄绿 `#DFFF1B` 作为唯一强调色贯穿进度条、标签、按钮
  4. 全大写微标签系统（text-[10px] font-black uppercase tracking-widest）
  5. 毛玻璃导航按钮组 + 头像堆叠
- **Emotional Tone**: 精密仪器感、科技专业、掌控力

---

## 配色方案

**方案**: Neo-Brutalist Light/Dark + Lime Accent
**色彩关系**: 冷调蓝灰底 + 纯白卡片 + 深色面板 + 荧光黄绿强调
**主题**: 浅色（含深色区块）

> **配色设计理由**：冷调蓝灰底色营造精密仪器的纸面质感，纯白卡片承载信息，深色面板制造明暗叙事张力，荧光黄绿作为唯一高饱和色形成视觉记忆锚点。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(216 33% 96%) | 页面全局底色（冷调蓝灰 #F1F4F9） |
| surface | hsl(0 0% 100%) | 卡片容器、输入区域、详情面板 |
| header | hsl(215 25% 27%) | 品牌图标背景、深色面板（slate-900 #0F172A） |
| text | hsl(215 25% 27%) | 主要文字（slate-900） |
| textMuted | hsl(215 16% 62%) | 二级描述（slate-500 #64748B） |
| primary | hsl(215 25% 27%) | 主交互色：品牌标识、深色面板背景、主按钮底色（slate-900） |
| accent | hsl(72 100% 55%) | 弱强调色：荧光黄绿，进度条、活跃标签、CTA（#DFFF1B） |
| border | hsl(210 40% 96%) | 卡片边框（slate-100 #F1F5F9） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(215 25% 27%)`：品牌图标、深色面板背景、主 CTA 按钮底色、标题文字，视觉权重最高
**Accent（弱强调色）** — `hsl(72 100% 55%)`：进度条填充、活跃标签、闪电图标、CTA 按钮（荧光态），每视区不超过 3 处

### 衍生规则

- **背景色**：hsl(216 33% 96%) 冷调蓝灰，与纯白卡片形成微妙层次
- **深色面板**：hsl(0 0% 10%) 近黑 #1A1A1A，内部使用 slate-300/400/white 三级文字
- **accent 克制原则**：荧光黄绿仅用于进度条、活跃标签、CTA、闪电图标，避免大面积铺设
- **边框层级**：slate-100 默认 → slate-200 嵌套 → slate-800 深色面板内
- **毛玻璃导航**：`bg-slate-200/50 backdrop-blur-sm border-white`

### 辅助色阶

| 用途 | HSL | Token |
|------|-----|-------|
| 正文描述 | hsl(215 22% 44%) | slate-700 |
| 弱辅助标签 | hsl(215 17% 62%) | slate-400 |
| 最弱提示 | hsl(213 27% 84%) | slate-300 |
| 深色面板内文字 | hsl(213 27% 84%) | slate-300 |
| 危险色 | hsl(347 77% 50%) | rose-500 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(160,84%,39%)', 'hsl(217,91%,60%)', 'hsl(0,84%,60%)', 'hsl(38,92%,50%)', 'hsl(239,84%,67%)'];
//               emerald-500        blue-500            red-500            amber-500          indigo-500
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: "'Plus Jakarta Sans', 'Noto Sans SC', sans-serif", color: '#64748B' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: { show: false },
  yAxis: {
    type: 'category', axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { width: 100, fontSize: 12, color: '#64748B' },
    splitLine: { show: false }
  },
  tooltip: {
    backgroundColor: '#FFFFFF', borderWidth: 0, borderRadius: 16,
    textStyle: { color: '#0F172A' },
    extraCssText: 'box-shadow: 0 10px 30px rgba(0,0,0,0.08);'
  },
  legend: {
    bottom: 0, textStyle: { fontSize: 12, color: '#64748B' }
  }
};
```

### 各图表类型默认 series 样式

- **pie 环形**: `radius: [60,80]`, `padAngle: 5`, `label: { show: false }`，依赖 legend
- **bar 水平**: `barWidth: 20`, `borderRadius: [0,4,4,0]`，color indigo-500

### 图表容器

`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm`，高度 `h-64`（256px）

---

## 字体排版

```css
font-family: 'Plus Jakarta Sans', 'Noto Sans SC', sans-serif;
```

| 用途 | 字体栈 | 字重 |
|-----|-------|------|
| 西文主字体 | Plus Jakarta Sans | 300-800 |
| 中文主字体 | Noto Sans SC | 300-900 |

### 文字规范

| 层级 | 样式 | 颜色 |
|------|------|------|
| Display | `text-4xl font-black tracking-tight` | text |
| H1 | `text-4xl font-extrabold` | text（指标大数字） |
| H2 | `text-2xl font-black tracking-tight` | text |
| H3 | `text-xl font-extrabold / font-bold` | text / white |
| Body | `text-lg leading-relaxed` | textMuted slate-700 |
| Body-sm | `text-sm font-bold` | text |
| Micro | `text-[10px] font-black uppercase tracking-widest` | slate-400/500 |

### 排版特征

极大量使用 `font-black`(900) 与 `font-extrabold`(800)，几乎不出现 `font-normal`(400)
全大写标签系统: `uppercase tracking-widest text-[10px] font-black`
文字选中态: `selection:bg-lime-200`

---

## 页面结构

> 单页纵向滚动，max-w-7xl 居中，明暗区块交替。

```
Header (mb-12)
  ├── 左: 品牌图标(slate-900 rounded-2xl) + 标题
  └── 右: 导航按钮组(毛玻璃胶囊) + 用户头像

Section 1: 4 列指标卡网格 (lg:grid-cols-4, gap-6)
Section 2: 深色任务面板 (bg-[#1a1a1a], rounded-[2rem], shadow-2xl)
  ├── 左: 任务列表 (可滚动)
  └── 右: 任务详情 (lg:w-3/5)
Section 3: 浅色任务面板 (bg-white, 同结构)
```

页面 `bg-[bg] px-4 md:px-10 py-10`，内容 `max-w-7xl mx-auto`

---

## 视觉风格

### 圆角体系

| 元素 | 圆角 |
|------|------|
| 输入面板 / 主容器 | 40px (`rounded-[2.5rem]`) |
| 指标卡 / 任务面板 | 32px (`rounded-[2rem]`) |
| 任务列表条目 / 详情面板 | 24px (`rounded-[1.5rem]`) |
| 详情嵌套属性卡 / 品牌图标 | 16px (`rounded-2xl`) |
| CTA 按钮 / 标签 / 导航 / 头像 / 进度条 | `rounded-full` |
| 输入框 textarea | 32px (`rounded-[2rem]`) |

### 投影体系

| 场景 | 投影 |
|------|------|
| 品牌图标 | `shadow-lg shadow-slate-200` |
| 输入面板 | `shadow-2xl shadow-slate-200` |
| CTA 主按钮 | `shadow-2xl shadow-slate-300`，hover `-translate-y-1` |
| accent 按钮 | `shadow-lg shadow-lime-200/20` |
| 指标卡片 | `shadow-sm` |
| 深色面板 | `shadow-2xl` |

### 边框

指标卡/浅色面板: `border border-slate-100`
深色详情: `border border-slate-800`
导航毛玻璃: `border border-white`
头像: `border-2 border-white`

### 毛玻璃效果

导航按钮组: `bg-slate-200/50 backdrop-blur-sm border border-white`
深色面板: `bg-rgba(26,26,26,0.95) backdrop-filter: blur(10px)`

### Hover & 动画

CTA hover: `hover:-translate-y-1`，active `active:scale-95`
accent 按钮: `hover:scale-105 active:scale-95 transition-transform`
头像叠层: `hover:scale-110 transition-transform`
入场: `animate-in slide-in-from-bottom duration-500`（输入面板）
结果: `animate-in fade-in zoom-in-95 duration-700`

### 自定义滚动条

`width: 4px`, thumb `slate-300`, `border-radius: 10px`, track 透明

---

## 组件规范

### Header

品牌图标 `w-12 h-12 bg-slate-900 rounded-2xl text-white shadow-lg shadow-slate-200`
品牌标题 `text-4xl font-black text-slate-900 tracking-tight`
导航按钮组 `bg-slate-200/50 p-1.5 rounded-full border border-white backdrop-blur-sm`
单个按钮 `w-10 h-10 rounded-full text-slate-600 hover:bg-white`

### SummaryCard（指标卡片）

`bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between`
标签 `text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4`
大数字 `text-4xl font-extrabold text-slate-900`
头像叠层 `mt-8 flex -space-x-3`，溢出 `+N` 指示器
进度条 `mt-8 h-2 bg-slate-100 rounded-full`，填充 accent-lime

### TaskList（任务面板）

深色: `bg-[#1a1a1a] p-2 rounded-[2rem] shadow-2xl`
浅色: `bg-white p-6 rounded-[2rem] border border-slate-200`
布局 `flex flex-col lg:flex-row gap-4 h-[600px]`
筛选标签: 活跃 `accent-lime text-slate-900`，默认 `bg-slate-800 text-slate-300`

### TaskItem（任务条目）

`p-4 rounded-[1.5rem] flex items-center justify-between cursor-pointer transition-all`
深色选中 `bg-slate-500/20`，浅色选中 `bg-slate-100 shadow-sm`
状态标签 `px-3 py-1 rounded-full text-[10px] font-bold uppercase`

### TaskDetail（任务详情）

深色: `bg-[#506680]/10 border border-slate-800 rounded-[1.5rem] p-8`
浅色: `bg-slate-50 border border-slate-100 rounded-[1.5rem] p-8`
CTA `accent-lime text-slate-900 px-8 py-3 rounded-full font-bold hover:scale-105`

### Badge / Label

深色标签: `px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase`
荧光标签: `px-3 py-1 bg-[accent] text-slate-900 text-[10px] font-bold rounded-full uppercase`

---

## 响应式断点

| 断点 | 适配策略 |
|------|----------|
| < 768px | 单列堆叠；Header 纵向；px-4；任务面板纵向堆叠 |
| >= 768px (md) | Header 横向；px-10；指标卡 2 列 |
| >= 1024px (lg) | 指标卡 4 列；任务面板横向分栏；详情区 lg:w-3/5 |

---

## 风格建议

- **圆角一致性**：新增卡片圆角不低于 1.5rem，外层 2rem-2.5rem，交互元素 rounded-full
- **荧光黄绿克制使用**：accent-lime 每视区不超 3 处，仅用于进度条、活跃标签、CTA、闪电图标
- **明暗节奏交替**：每页至少一个 bg-[#1a1a1a] 深色区块，制造视觉张力
- **全大写标签系统**：所有辅助标签遵循 `uppercase tracking-widest text-[10px] font-black`
- **字重纪律**：最低 font-medium(500)，标题 font-black(900)/font-extrabold(800)，正文 font-bold(700)
- **Primary / Accent 分工**：primary slate-900 用于品牌标识与深色面板，accent lime 用于进度与活跃态
