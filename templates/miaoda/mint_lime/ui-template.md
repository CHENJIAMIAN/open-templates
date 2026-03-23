# Mint Lime · 薄荷荧光 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 杂志编辑式排版 — 超大圆角卡片 + 荧光色点缀，留白充裕的印刷感布局
- **Design Style**: Editorial 经典排版 x Rounded 圆润几何 — 米灰底色 + 薄荷青主卡片 + 荧光黄绿徽章
- **Visual Signature**:
  1. 2rem(32px) 超大圆角主卡片(rounded-report)，16px 标准子卡片
  2. 荧光黄绿(neon-lime)徽章作为画龙点睛，每屏不超过 2-3 处
  3. 薄荷青(card-teal)主数据卡片，米灰(#f0f2f1)页面底色
  4. 编辑式留白节奏：页面级 p-10 -> 区块级 gap-6 -> 卡片 p-8/p-10
  5. 分段进度条（多色横向比例条）
- **Emotional Tone**: 沉稳专业又不失活力，高端商业报告质感

---

## 配色方案

**方案**: 自定义（Mint Teal + Neon Lime）
**色彩关系**: 米灰底 + 薄荷青主卡 + 荧光黄绿强调
**主题**: 浅色

> **配色设计理由**：米灰底色营造高端印刷质感，薄荷青主卡片提供品牌识别度，荧光黄绿作为稀缺亮点色标注增长数值，三色体系清晰而克制。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(150 6% 94%) | 全局页面米灰底色 |
| surface | hsl(0 0% 100%) | 白色内容卡片 |
| header | hsl(180 19% 87%) | 薄荷青主卡片(card-teal)，数据总览等重点区块 |
| text | hsl(0 0% 10%) | 标题与关键数值 |
| textMuted | hsl(215 20% 65%) | 描述文案、次要标签 |
| primary | hsl(69 83% 67%) | 主交互色：荧光黄绿徽章、增长标记、峰值标签 |
| accent | hsl(210 40% 96%) | 弱强调色：卡片边框、内部分割线 |
| border | hsl(210 40% 96%) | 卡片描边 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(69 83% 67%)`：荧光黄绿(neon-lime)，增长徽章、峰值标签、画龙点睛，视觉权重最高
**Accent（弱强调色）** — `hsl(210 40% 96%)`：卡片边框、分割线、hover 态底色，权重低于 primary

### 衍生规则

- **主卡片底色**：header hsl(180 19% 87%) 薄荷青，用于数据总览等重点区块
- **深色 CTA 卡片**：indigo-600 hsl(239 84% 67%)，shadow-xl，内含 white/10 子项
- **分段进度条色序**：emerald-400 -> indigo-400 -> cyan-400 -> rose-400 -> slate-200
- **荧光色稀缺使用**：neon-lime 每屏出现不超 2-3 处

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/高 | hsl(152 69% 54%) / hsl(160 84% 39%) | emerald 正向指标 |
| 图表主色 | hsl(239 84% 67%) | indigo 靛蓝 |
| 警示/趋势 | hsl(38 95% 53%) | amber 趋势线 |
| 警示/负向 | hsl(330 81% 60%) / hsl(350 89% 60%) | rose 粉红 |

### 自定义 CSS 类

```css
.card-teal { background-color: hsl(180 19% 87%); }
.bg-neon-lime { background-color: hsl(69 83% 67%); }
.text-neon-lime { color: hsl(69 83% 67%); }
.rounded-report { border-radius: 2rem; }
```

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(239,84%,67%)', 'hsl(160,84%,39%)', 'hsl(38,95%,53%)', 'hsl(217,91%,60%)', 'hsl(330,81%,60%)', 'hsl(258,90%,66%)'];
//               靛蓝(主)             翠绿                琥珀                蓝                  粉红                紫
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, sans-serif', color: 'hsl(215,16%,47%)' },
  grid: { containLabel: true, left: 24, right: 24, top: 40, bottom: 40 },
  xAxis: {
    axisLine: { lineStyle: { color: 'hsl(210,40%,90%)' } }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,20%,65%)', fontSize: 12, fontFamily: 'Inter' },
    splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)', type: 'dashed' } }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,20%,65%)', fontSize: 12, fontFamily: 'Inter' },
    splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)', type: 'dashed' } }
  },
  tooltip: {
    backgroundColor: 'hsl(0,0%,100%)', borderColor: 'transparent', borderWidth: 0,
    borderRadius: 8, padding: 12, shadowBlur: 6, shadowOffsetY: 4, shadowColor: 'rgba(0,0,0,0.1)',
    textStyle: { fontFamily: 'Inter', color: 'hsl(0,0%,10%)', fontSize: 12 },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(0,0,0,0.02)' } }
  },
  legend: {
    textStyle: { fontFamily: 'Inter', color: 'hsl(215,16%,47%)', fontSize: 12 },
    itemGap: 16, icon: 'circle', itemWidth: 10, itemHeight: 10
  }
};
```

### 各图表类型默认 series 样式

- **bar 竖向**: `barWidth: 40`, `borderRadius: [4,4,0,0]`
- **bar 横向**: `barWidth: 20`, `borderRadius: [0,4,4,0]`
- **line**: `smooth: true`, `lineStyle.width: 2`, `symbolSize: 6`; 面积渐变 indigo 0.1 -> 0
- **pie 环形**: `radius: ['45%','60%']`, `padAngle: 2`, `borderRadius: 4`
- **radar**: splitArea `slate-100/50 + transparent`，axisLine/splitLine `hsl(210,40%,90%)`
- **scatter**: `symbolSize: 10`, `borderWidth: 2`, `borderColor: white`

### 图表容器

容器 `bg-white rounded-2xl border border-slate-100 shadow-sm p-6`
标题 `text-lg font-semibold text-slate-800 mb-6`
高度 `h-80`(320px) / `h-64`(256px)

### 分段进度条

`flex h-1.5 w-full rounded-full overflow-hidden`
段色序: emerald-400 -> indigo-400 -> cyan-400 -> rose-400 -> slate-200

---

## 字体排版

```css
font-family: 'Inter', sans-serif; /* wght 300-700 */
```

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| H1 超大标题 | `text-6xl font-bold tracking-tight leading-tight` | text |
| H2 区块标题 | `text-2xl font-bold` | text |
| H3 小标题 | `text-xl font-bold` | text |
| 巨型数值 | `text-6xl font-bold tracking-tighter` | text |
| 中数值 | `text-2xl font-bold` | text |
| 正文粗体 | `text-sm font-bold text-slate-700` | slate-700 |
| 正文 | `text-sm font-medium` | slate-800 |
| 辅助说明 | `text-sm text-slate-500 leading-relaxed` | textMuted |
| 标签 | `text-xs text-slate-500 uppercase tracking-wider` | textMuted |
| 荧光徽章文字 | `text-[10px] font-black` | text (on neon-lime bg) |

---

## 页面结构

> 编辑式杂志布局 — 超大圆角 + 12列栅格 + 充裕留白

```
min-h-screen bg-[hsl(150,6%,94%)]
  -> 顶部标题区（flex justify-between mb-12）
  -> 核心数据栅格（grid-cols-12 gap-6）
     -> 左 col-span-7: 主总览卡片(card-teal rounded-report p-10 min-h-[500px])
     -> 右 col-span-5: 2x2 小卡片 + 横跨渠道分布卡片
  -> 底部月份趋势条（mt-6 bg-white rounded-report p-8 grid-cols-6）
```

容器 `max-w-[1400px] mx-auto p-10`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 页面内边距 | `p-10` (40px) |
| 区块间距 | `mb-12` (48px) |
| 卡片间距 | `gap-6` (24px) |
| 大卡片内边距 | `p-10` (40px) |
| 标准卡片内边距 | `p-8` (32px) |
| 容器最大宽 | `max-w-[1400px]` |

### 圆角体系

> Design DNA: Rounded — 三级圆角层次

| 元素 | 圆角 |
|-----|------|
| 主卡片 | `rounded-report` (32px) |
| 标准卡片 | `rounded-2xl` (16px) |
| 按钮 | `rounded-2xl` (16px) |
| 徽章/标签 | `rounded-full` |

### 阴影与边框

标准卡片 `shadow-sm` + `border border-slate-100`，hover `shadow-md hover:border-slate-300`
荧光徽章 `shadow-sm`，深色 CTA `shadow-xl`
内部分割线 `border-t border-black/5`，表格行 `divide-y divide-slate-100`

---

## 组件规范

### KPI 卡片

容器 `bg-white rounded-report p-8 border border-slate-100 group hover:border-slate-300`
数值 `text-6xl font-bold tracking-tighter mt-12`
徽章 `bg-neon-lime px-2 py-0.5 rounded-full text-[10px] font-black`
角标图标 `absolute top-8 right-8 text-slate-300`

### 主总览卡片

容器 `card-teal rounded-report p-10 flex flex-col min-h-[500px]`
标题行 `flex justify-between items-start mb-8`
荧光徽章 `bg-neon-lime px-3 py-1 rounded-full text-sm font-bold shadow-sm`
底部指标 `grid grid-cols-3 mt-10 border-t border-black/5 pt-8`
标签 `text-slate-500 text-sm uppercase tracking-tighter`

### 按钮

主按钮 `w-12 h-12 bg-black text-white rounded-2xl hover:scale-105 transition-transform`
次按钮 `w-12 h-12 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50`

### 深色 CTA 卡片

`bg-indigo-600 p-6 rounded-2xl shadow-xl border border-indigo-700 text-white`
子项 `bg-white/10 p-4 rounded-xl border border-white/10`

### 数据表格

容器 `bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden`
表头 `bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider`
行 hover `hover:bg-slate-50`

### 状态徽章

正向 `bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold`
中性 `bg-blue-100 text-blue-700`
荧光 `bg-neon-lime px-3 py-1 rounded-full text-sm font-bold shadow-sm`

### 渠道分布行

`flex items-center text-sm font-medium`
色点 `w-2 h-2 rounded-full` + 渠道名 `w-40` + 主数值 `flex-1 font-bold` + 辅助 `w-20 text-slate-300`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 主栅格 7/5 分割，概览 6 列 |
| >= 768px (md) | 概览卡 3 列，洞察 2 列 |
| < 768px | 单列堆叠，col-span-12 |

---

## 风格建议

- **编辑式留白节奏**：页面 p-10 / 区块 gap-6 / 卡片 p-8~p-10 三级间距，保持呼吸感
- **荧光色极度稀缺**：neon-lime 每屏 2-3 处，保持冲击力
- **三级圆角分层**：主卡片 32px / 子卡片 16px / 徽章 rounded-full
- **Primary / Accent 分工**：primary（荧光黄绿）仅标注增长亮点，accent（浅灰）用于边框和层次背景
