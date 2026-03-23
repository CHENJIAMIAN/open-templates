# Soft Geometric · 柔和几何风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Soft Geometric Dashboard — 现代圆角几何 x 浅色底 x 翡翠绿点缀色
- **Design Style**: Rounded 圆润几何 x Soft Blocks 柔色块 — 超大圆角(32px~48px) + 浅灰白底 + 翡翠绿单色强调
- **Visual Signature**:
  1. 超大圆角卡片（rounded-[32px] ~ rounded-[48px]），柔和几何感
  2. 轻量 border + shadow-sm 组合，层次分明但不厚重
  3. 翡翠绿 accent 贯穿品牌色与交互反馈
  4. 深色海军蓝作为辅助强调色，用于暗色区块与数据对比
  5. font-[900] 超粗字重 + italic 斜体组合，运动感品牌标题
  6. uppercase + tracking-widest 标签系统，精致微缩感
- **Emotional Tone**: 清爽、现代、精致、数据自信

---

## 配色方案

**方案**: 自定义 — Soft Light + Emerald Teal
**色彩关系**: 浅灰白底 + 翡翠绿强调 + 深海军蓝辅助
**主题**: 浅色

> **配色设计理由**：浅灰白背景营造清爽通透感，翡翠绿作为唯一高饱和色聚焦交互与数据正向指标，深海军蓝提供对比层次。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(210 20% 98%) | 页面背景 |
| surface | hsl(0 0% 100%) | 卡片背景 |
| header | hsl(215 28% 17%) | 深色卡片背景（surfaceDark） |
| text | hsl(215 28% 17%) | 主要文字（gray-900） |
| textMuted | hsl(218 11% 65%) | 次要文字、标签、坐标轴（gray-400） |
| primary | hsl(160 100% 36%) | 主交互色：品牌色、交互反馈、正向指标 |
| accent | hsl(215 28% 17%) | 弱强调色：暗色区块、对比辅助、hover 翻转 |
| border | hsl(220 14% 96%) | 卡片边框（gray-100，极淡） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(160 100% 36%)`：CTA 按钮、品牌图标、正向指标、hover 变色目标，视觉权重最高
**Accent（弱强调色）** — `hsl(215 28% 17%)`：暗色迷你图表区块、图例行 hover 翻转、More 按钮 hover，权重低于 primary

### 衍生规则

- **背景色**：极浅灰 hsl(210 20% 98%)，与白色卡片仅有微弱区分，整体通透
- **文字色**：深灰 gray-900 hsl(215 28% 17%)，在浅底上保持高可读性
- **次要文字**：gray-400 hsl(218 11% 65%)，层级区分；gray-300 hsl(214 12% 84%) 更次级
- **Primary 阴影**：品牌图标 `shadow-xl shadow-emerald-100`，CTA `shadow-xl shadow-emerald-200`

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/上升 | hsl(160 84% 39%) | emerald-500 |
| 负向/下降 | hsl(347 77% 61%) | rose-500 |
| 待定/警告 | hsl(25 95% 53%) | orange-500 |
| 选区高亮 | primary bg + white text | selection |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(160,100%,36%)', 'hsl(215,28%,17%)', 'hsl(160,84%,39%)', 'hsl(239,84%,67%)', 'hsl(25,95%,53%)', 'hsl(330,81%,60%)'];
//               翡翠绿               海军蓝               祖母绿               靛蓝紫               橙色               粉红
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS, backgroundColor: 'transparent',
  textStyle: { fontFamily: "'Plus Jakarta Sans', 'Noto Sans SC', sans-serif", color: 'hsl(218,11%,65%)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: 'hsl(218,11%,65%)', fontSize: 10, fontWeight: 700 }, splitLine: { show: false } },
  yAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: 'hsl(218,11%,65%)', fontSize: 10, fontWeight: 700 }, splitLine: { lineStyle: { color: 'hsl(220,14%,96%)', type: 'dashed' } } },
  tooltip: { trigger: 'axis', backgroundColor: '#fff', borderColor: 'transparent', borderWidth: 0, borderRadius: 24, padding: 16, shadowBlur: 50, shadowColor: 'rgba(0,0,0,0.1)', shadowOffsetY: 25, textStyle: { color: 'hsl(215,28%,17%)', fontSize: 12, fontWeight: 900 }, axisPointer: { type: 'line', lineStyle: { color: 'hsl(160,100%,36%)', width: 1 } } },
  legend: { textStyle: { color: 'hsl(218,11%,65%)', fontSize: 9, fontWeight: 900 }, formatter: '(name)=>name.toUpperCase()', itemGap: 16, icon: 'circle', itemWidth: 8, itemHeight: 8 }
};
```

### 各图表类型默认 series 样式

- **line (面积)**: `smooth: true`, `symbol: 'none'`, `lineStyle.width: 5`, areaStyle 线性渐变 primary 色 15%→0% 透明度
- **bar**: `barWidth: 10`, `itemStyle.borderRadius: [4,4,0,0]`, `barGap: '20%'`；暗色容器内用 `rgba(255,255,255,0.4)` 半透明白
- **pie 环形**: `radius: ['67%','92%']`, `padAngle: 12`, `label: { show: false }`；中心数值通过 graphic 叠加
- **迷你图表（暗色容器）**: `grid: { left:0, right:0, top:0, bottom:0 }`, xAxis/yAxis `show: false`

### 图表容器

| 属性 | 值 |
|-----|---|
| 大图表卡片 | `bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm` |
| 小卡片 | `bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm` |
| 暗色区块 | `bg-[hsl(215,28%,17%)] rounded-[32px] p-6 shadow-xl` |
| 图表高度 | `h-[320px]`（主） / `h-20`（迷你） / `h-52`（饼图） |
| hover | `hover:shadow-md transition-all` |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 / 标题 / 数字 | `Plus Jakarta Sans, Noto Sans SC, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 品牌标题 | `text-4xl font-[900] tracking-tighter italic` | text，primary 色用于品牌高亮字 |
| Hero 标题 | `text-5xl font-[900] leading-[1.1]` | text |
| Section 标题 | `text-xl ~ text-2xl font-[900] italic` | text |
| Section 副标题 | `text-[11px] font-bold uppercase tracking-[0.2em]` | textMuted |
| KPI 数值 | `text-2xl font-black` | text，hover primary |
| KPI 标签 | `text-[10px] font-black uppercase tracking-widest` | textMuted |
| 表格表头 | `text-[11px] font-[900] uppercase tracking-[0.15em]` | gray-300 |
| 表格正文 | `text-base font-black`（名称）/ `text-sm font-[900] italic`（数值） | text |
| 背景装饰大字 | `text-[200px] font-[900] italic tracking-tighter` | gray-50，opacity-80 |

---

## 页面结构

> Soft Geometric Dashboard — 12 列网格系统，大圆角卡片，垂直 Section 浏览。

```
Header（品牌 Logo 图标 + 标题 + 描述 | 右侧日期时间卡片）
  → Section 1: Hero + 核心指标（左 7/12 大展示卡片 | 右 5/12 四宫格 KPI + 暗色迷你图表）
  → Section 2: 趋势 + 分布（左 8/12 主趋势图表 | 右 4/12 环形分布图）
  → Section 3: 数据表格（全宽表格卡片 + 搜索 + 导出）
```

| 元素 | 样式 |
|-----|-----|
| 页面背景 | `bg-[hsl(210,20%,98%)]` |
| 页面内边距 | `p-8 lg:p-12` |
| 内容容器 | `max-w-[1600px] mx-auto` |
| Section 间距 | `space-y-10` |
| 网格系统 | `grid grid-cols-12 gap-8` |

### Header

左侧：品牌图标 `w-12 h-12 bg-[primary] rounded-2xl shadow-xl shadow-emerald-100` + 标题 `text-4xl font-[900] italic tracking-tighter`
右侧：日期时间卡片 `bg-white px-6 py-4 rounded-[24px] border border-gray-100 shadow-sm`

---

## 视觉风格

### 圆角与阴影

> Design DNA: Rounded 圆润几何 — `48px / 32px / 24px / 16px` 四级圆角

| 元素 | 圆角 | 阴影 |
|-----|-----|-----|
| 大卡片 | `rounded-[48px]` | `shadow-sm` |
| 中卡片 | `rounded-[32px]` | `shadow-sm` / `shadow-xl` |
| 日期时间 | `rounded-[24px]` | `shadow-sm` |
| 图标容器 | `rounded-2xl` | 无 / `shadow-inner` |
| 按钮 | `rounded-2xl` | `shadow-sm` ~ `shadow-xl` |
| 进度条/标签 | `rounded-full` | 无 |

### 边框

卡片 `border border-gray-100`（1px 极淡灰） | 状态标签 `border border-emerald-100` | 表头 `border-b border-gray-50` | 表体 `divide-y divide-gray-50/50`

### Hover 交互

| 模式 | 效果 |
|-----|-----|
| 阴影加深 | 指标卡片 shadow-sm → shadow-md |
| 文字变色 | KPI 数值 / 表格名称 → primary 色 |
| 深色翻转 | 图例行 / More 按钮 → bg-accent + text-white |
| 表格行图标 | bg-gray-50 → bg-primary + text-white（duration-500） |
| 缩放 | CTA 按钮 `hover:scale-105` |

### 动画

卡片 hover `transition-all` | 表格行图标 `transition-all duration-500` | 暗色装饰缩放 `transition-transform duration-700` | 选中色 `selection:bg-primary selection:text-white`

---

## 组件规范

### KPI 指标卡片

容器 `bg-white border border-gray-100 p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all group`
图标容器 `w-12 h-12 rounded-2xl`（正向 bg-emerald-50 / 负向 bg-rose-50）
标签 `text-[10px] font-black uppercase tracking-widest text-gray-400`
数值 `text-2xl font-black group-hover:text-primary transition-colors`

### Hero 展示卡片

容器 `col-span-7 bg-white rounded-[48px] p-12 relative overflow-hidden min-h-[480px]`
背景装饰 `text-[200px] font-[900] text-gray-50 italic opacity-80 absolute`
标签 `bg-emerald-50 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase`

### 按钮系统

主CTA `bg-primary text-white px-8 py-4 rounded-2xl text-xs font-black shadow-xl shadow-emerald-200 hover:scale-105`
次按钮 `bg-white border border-gray-100 px-8 py-4 rounded-2xl text-xs font-black shadow-sm hover:bg-gray-50`
操作按钮 `bg-gray-900 text-white px-6 py-4 rounded-2xl text-xs font-black hover:bg-primary`

### 数据表格

容器 `bg-white rounded-[48px] p-12 border border-gray-100 shadow-sm`
搜索框 `bg-gray-50 pl-11 pr-6 py-4 rounded-2xl text-xs font-bold focus:ring-2 ring-emerald-100`
表头 `text-[11px] font-[900] text-gray-300 uppercase tracking-[0.15em] border-b border-gray-50`
名称列图标 `w-16 h-16 bg-gray-50 rounded-3xl group-hover:bg-primary group-hover:text-white duration-500`
状态标签 Active `bg-emerald-50 text-primary border border-emerald-100` | Idle `bg-gray-50 text-gray-400` | Pending `bg-orange-50 text-orange-500`

### 分布图卡片

容器 `bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm flex flex-col items-center`
中心数值 `text-4xl font-[900] italic tracking-tighter` + 单位 `text-sm font-black text-primary`
图例行 `p-4 bg-gray-50 rounded-2xl hover:bg-accent hover:text-white transition-all`

---

## 响应式断点

| 断点 | 布局 |
|-----|-----|
| >= 1024px (lg) | p-12；Hero 7/12 + KPI 5/12；趋势 8/12 + 分布 4/12；Header 水平 |
| 768px ~ 1023px (md) | Header flex-row；搜索与导出水平排列 |
| < 768px | p-8；全部 col-span-12 堆叠；Header 垂直；搜索栏堆叠 |

---

## 风格建议

- **大圆角（32px~48px）+ 浅色底 + 翡翠绿 accent**是核心三大标识
- **Primary / Accent 分工明确**：primary（翡翠绿）专用于主交互和正向指标，accent（深海军蓝）用于暗色区块和对比层次
- font-[900] italic 超粗斜体标题 + uppercase tracking-widest 标签系统保持运动感与精致感
- 轻量阴影 shadow-sm 搭配极淡边框 border-gray-100 维持清爽透气感
