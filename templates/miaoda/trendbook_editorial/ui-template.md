# Trendbook Editorial · 潮流杂志风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Trendbook Editorial — 杂志封面排版风格，深色基底，荧光对比双色系
- **Design Style**: Rounded 圆润几何 x Editorial 经典排版 — 超圆角容器 + 全大写 font-black 标题 + 荧光撞色
- **Visual Signature**:
  1. 超大标题（text-6xl ~ text-8xl, font-black, tracking-tighter），杂志封面式排版
  2. 超圆角卡片（rounded-[40px]），半透明白色背景（bg-white/5）+ 极淡白色边框
  3. 荧光绿 + 紫双强调色系
  4. 纯色指标卡 — 荧光绿底黑字 / 白底黑字两种变体，rounded-3xl
  5. 旋转装饰元素（-rotate-6 标签）、星爆图形（clip-path starburst + animate-pulse）
  6. Tab 式多视图切换导航（非路由）
- **Emotional Tone**: 潮流、活力、数据驱动

---

## 配色方案

**方案**: Dark Trendbook + Lime/Purple 双强调色
**色彩关系**: 极深黑底 + 荧光绿/紫双高对比
**主题**: 深色

> **配色设计理由**：极深黑背景营造沉浸式环境，荧光绿作为主交互色提供最高视觉权重，紫色作为弱强调色用于次级数据与装饰，双色系制造潮流张力。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(0 0% 7%) | 页面背景 |
| surface | hsla(0 0% 100% / 0.05) | 卡片/图表容器背景（bg-white/5） |
| header | hsl(70 100% 50%) | Header 首要指标卡背景、品牌色区域 |
| text | hsl(0 0% 100%) | 主要文字 |
| textMuted | hsl(215 16% 62%) | 次要文字、描述（slate-400） |
| primary | hsl(70 100% 50%) | 主交互色：主按钮、激活态、正向趋势 |
| accent | hsl(271 91% 65%) | 弱强调色：次级数据系列、装饰元素 |
| border | hsla(0 0% 100% / 0.1) | 卡片边框（border-white/10） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(70 100% 50%)`：主按钮、激活态指标卡背景、正向数据系列，视觉权重最高
**Accent（弱强调色）** — `hsl(271 91% 65%)`：次级数据系列、装饰元素、虚线折线，权重低于 primary

### 衍生规则

- **背景色**：极深黑 hsl(0 0% 7%)，与 primary 荧光绿形成极端对比
- **文字色**：纯白 hsl(0 0% 100%)，确保深色底可读性
- **次要文字**：slate-400 hsl(215 16% 62%)，提供层级区分
- **边框色**：白色 10% 透明度，极淡分割不抢焦
- **扩展语义**：danger hsl(0 84% 60%) 用于紧急/负向状态，blue hsl(217 91% 60%) 用于扩展数据系列

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/上升 | hsl(70 100% 50%) | 同 primary |
| 负向/下降 | hsl(0 84% 60%) | 红色 |
| 扩展蓝 | hsl(217 91% 60%) | 扩展数据系列 |
| 表头暗灰 | hsl(215 16% 47%) | 表头标签、footer |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(70,100%,50%)', 'hsl(271,91%,65%)', 'hsl(0,0%,100%)', 'hsl(217,91%,60%)', 'hsl(0,84%,60%)'];
//               荧光绿              紫                  白                 蓝                  红
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS, backgroundColor: 'transparent',
  tooltip: { backgroundColor: 'hsl(0,0%,10%)', borderColor: 'hsl(0,0%,20%)', borderWidth: 1, borderRadius: 12, textStyle: { color: '#fff', fontSize: 12 }, trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { top: 0, textStyle: { color: 'hsl(215,16%,62%)', fontSize: 12 }, icon: 'circle', itemWidth: 8, itemHeight: 8, itemGap: 16 },
  grid: { top: 40, right: 16, bottom: 24, left: 16, containLabel: true },
  xAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: 'hsl(0,0%,40%)', fontSize: 10 }, splitLine: { show: false } },
  yAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: 'hsl(0,0%,40%)', fontSize: 10 }, splitLine: { lineStyle: { color: 'hsl(0,0%,20%)', type: 'dashed' } } },
  animationDuration: 800, animationEasing: 'cubicOut'
};
```

### 各图表类型默认 series 样式

- **line 主系列**: `smooth: true`, `lineStyle.width: 4`, `symbol: 'circle'`, `symbolSize: 12`, primary 色
- **line 次系列**: `smooth: true`, `lineStyle: { width: 2, type: 'dashed' }`, accent 紫色
- **line 警告**: `smooth: true`, `lineStyle.width: 5`, danger 红色
- **bar**: `barWidth: '40%'`, `itemStyle.borderRadius: [4,4,0,0]`, primary 色
- **bar 次要**: accent 紫色，同圆角
- **pie 环形**: `radius: ['45%','70%']`, `padAngle: 8`, `label: { show: false }`
- **scatter**: `symbolSize` 按数值动态，primary 色，`opacity: 0.8`

### 图表容器

容器 `bg-white/5 border border-white/10 rounded-[40px] p-8`
高度 `h-80`（标准）/ `h-96`（大图）/ `h-64`（饼图），网格 `grid-cols-1 lg:grid-cols-3 gap-6`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Inter, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 品牌主标题 | `text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase` | text |
| 引言标题 | `text-3xl md:text-4xl font-black tracking-tight uppercase` | text |
| Section 标题 | `text-2xl font-black uppercase` | text |
| 指标卡标签 | `text-lg font-bold uppercase tracking-tight` | 黑色（卡片内） |
| 指标卡数值 | `text-4xl font-black` | 黑色（卡片内） |
| 装饰标签 | `text-xs font-bold uppercase tracking-widest` | text |
| 描述正文 | `text-base font-medium` | textMuted |
| 表头 | `text-xs font-black uppercase tracking-widest` | hsl(215 16% 47%) |
| 表格主列 | `text-lg font-black` | text |

---

## 页面结构

> Trendbook 杂志式布局 — Tab 导航多视图切换，每个视图含指标卡网格 + 图表网格。

```
Brand Header（超大标题 + 装饰徽章 + 装饰标签组 + CTA 按钮条）p-8 pb-4
  → Tab 导航栏（图标 + 文字，多视图切换）px-8 mb-8
  → 装饰引言区（accent 色图标 + 全大写引言，border-y 分隔）px-8 mb-12
  → Main Content（Tab 切换视图，每视图：指标卡网格 + 图表网格）px-8 pb-12
  → Footer（品牌标识 + 行动按钮）px-8 py-6, border-t border-white/5
```

| 元素 | 样式 |
|-----|-----|
| 页面背景 | `bg-[hsl(0,0%,7%)]` |
| 内容宽度 | 全宽，`px-8` |
| 指标卡网格 | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` |
| 图表网格 | `grid-cols-1 lg:grid-cols-3 gap-6`（大图 col-span-2） |

### Tab 导航

容器 `flex gap-2 p-2 bg-white/5 rounded-2xl w-fit`
按钮 `px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider`
Active `bg-white text-black` / Inactive `text-white hover:bg-white/10`

---

## 视觉风格

### 间距系统

| 场景 | 值 |
|-----|---|
| 视图内 Section 间距 | `space-y-8` |
| 网格 gap | `gap-6` |
| 页面水平内边距 | `px-8` |
| 卡片内边距 | `p-8` |
| 图表标题底部间距 | `mb-8` |

### 圆角与阴影

> Design DNA: Rounded 超圆角 — 所有标题 uppercase + font-black

| 元素 | 圆角 | 阴影 |
|-----|-----|-----|
| 图表容器 | `rounded-[40px]` | 无 |
| 指标卡 | `rounded-3xl` | 无 |
| Tab 容器/按钮 | `rounded-2xl` / `rounded-xl` | 无 |
| 柱状图顶部 | `[4,4,0,0]` | -- |

### 边框

| 元素 | 样式 |
|-----|-----|
| 图表容器 | `border border-white/10` |
| 引言区 | `border-y border-white/10` |
| 表格分隔 | `divide-y divide-white/5` |
| Footer 顶线 | `border-t border-white/5` |
| 装饰标签 | `border border-white/20` |

### Hover 交互

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 缩放 | 指标卡 | `hover:scale-[1.02] transition-transform duration-300` |
| 背景高亮 | 表格行 | `hover:bg-white/5 transition-colors` |
| 旋转还原 | 装饰标签 | `-rotate-6 hover:rotate-0 transition-transform` |
| 颜色切换 | Footer 按钮 | `hover:text-[primary色]` |

### 动画

指标卡 hover `transition-transform duration-300`，进度条 `transition-all duration-1000`，星爆 `animate-pulse`，ECharts `animationDuration: 800`

---

## 组件规范

### 指标卡 (StatCard)

**Lime 变体**: `bg-[primary色] text-black p-8 rounded-3xl min-h-[180px] hover:scale-[1.02]`
**White 变体**: `bg-white text-black p-8 rounded-3xl min-h-[180px] hover:scale-[1.02]`
布局: 顶部序号(text-4xl font-black opacity-30) + 图标 | 底部标签 + 数值(text-4xl font-black)

### 数据表格

外容器 `bg-white/5 p-8 rounded-[40px] border border-white/10`
表头 `text-xs font-black uppercase tracking-widest text-slate-500 pb-4 border-b border-white/10`
行 `hover:bg-white/5 transition-colors divide-y divide-white/5`
状态标签 `px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest`

### 进度条 / 漏斗条

标签 `text-sm font-black uppercase tracking-widest text-slate-400`
进度条容器 `w-full bg-white/10 h-12 rounded-lg border border-white/5`
填充色依次使用配色序列颜色

### 装饰标签组

`px-6 py-2 border border-white/20 bg-white/5 backdrop-blur-sm -rotate-6 hover:rotate-0 transition-transform`

### CTA 按钮条

容器 `bg-[primary色] p-4 rounded-xl text-black`
图标按钮 `w-8 h-8 rounded-full bg-black text-white`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|---------|
| >= 1024px (lg) | 指标卡 4 列；图表 3 列（大图 2/3）或 2 列；Header 右侧装饰标签组可见 |
| 768px ~ 1023px (md) | 指标卡 2 列；图表单列；主标题 text-6xl |
| < 768px | 指标卡单列；图表单列；装饰标签组隐藏；Tab 可横滚 |

---

## 风格建议

- **超圆角风格**（图表容器 rounded-[40px]，指标卡 rounded-3xl）是核心签名
- **Primary / Accent 分工明确**：primary（荧光绿）专用于主交互和视觉焦点，accent（紫）用于次级数据与装饰
- 图表配色优先从 5 色序列中取色，确保全局色彩语言一致
- Tab 式多视图切换（非 Sidebar 或固定导航）必须保持
