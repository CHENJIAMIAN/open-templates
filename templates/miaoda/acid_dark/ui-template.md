# Acid Dark · 酸性暗黑 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Brutalist Editorial — 瑞士国际主义排版 x 深色底 x 酸性点缀色
- **Visual Signature**:
  1. 超大 clamp 字体标题（3rem ~ 14rem），全大写，tracking-tighter，leading 极紧
  2. 硬边 2px 边框卡片，零圆角，零阴影
  3. 酸性黄绿 primary 色 hover 翻转（容器整体变 primary 底 + 黑字）
  4. 噪声纹理叠加层（SVG feTurbulence, opacity 0.04）
  5. 无限滚动 marquee 数据跑马灯
- **Emotional Tone**: 硬核、冲击力、掌控感
- **Design Style**: Bauhaus 包豪斯 x Editorial 经典排版 — 零圆角 + 几何无衬线 black + 高对比色块碰撞 + 大字重对比排版

---

## 配色方案

**方案**: 自定义（Brutalist Dark + Acid Yellow）
**色彩关系**: 极深黑底 + 酸性黄绿高对比强调
**主题**: 深色

> **配色设计理由**：极黑背景营造沉浸式数据阅读环境，酸性黄绿作为唯一高饱和度色彩形成极端对比，用单一强调色制造视觉冲击力。

### 7 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(240 6% 3%) | 页面背景 |
| surface | hsl(240 6% 3%) | 卡片背景（与页面同色，靠 border 区分） |
| header | hsl(240 4% 16%) | Header 区域背景、次级背景、网格线 |
| text | hsl(0 0% 98%) | 主要文字 |
| textMuted | hsl(240 4% 66%) | 次要文字、标签、坐标轴文字 |
| primary | hsl(61 97% 45%) | 主交互色：主按钮、hover 翻转底色、正向趋势 |
| accent | hsl(240 4% 16%) | 弱强调色：次级背景、muted 区域 |
| border | hsl(240 5% 26%) | 卡片边框（2px 粗线） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(61 97% 45%)`：主按钮、激活态、hover 翻转底色，视觉权重最高
**Accent（弱强调色）** — `hsl(240 4% 16%)`：次级背景、网格线、分隔区域，视觉权重低于 primary

### 衍生规则

- **背景色**：极低明度黑 hsl(240 6% 3%)，与 primary 形成极端对比
- **文字色**：高明度白 hsl(0 0% 98%)，确保深色底可读性
- **次要文字**：中灰 hsl(240 4% 66%)，提供层级区分
- **边框色**：低饱和深灰 hsl(240 5% 26%)，介于 bg 和 textMuted 之间
- **Primary 前景色**：纯黑 hsl(0 0% 0%)，在 primary 底色上确保对比度 > 4.5:1

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/上升 | hsl(61 97% 45%) | 同 primary 色 |
| 负向/下降 | hsl(0 84% 60%) | 红色 |
| primary 前景 | hsl(0 0% 0%) | primary 底色上的文字为纯黑 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(61,97%,45%)', 'hsl(0,0%,98%)', 'hsl(189,94%,43%)', 'hsl(330,81%,60%)', 'hsl(262,83%,66%)', 'hsl(25,95%,53%)'];
//               酸性黄绿            白色              青蓝                粉红                紫                  橙
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Space Grotesk, Noto Sans SC, sans-serif', color: 'hsl(240,4%,66%)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { lineStyle: { color: 'hsl(240,4%,16%)' } }, axisTick: { show: false },
    axisLabel: { color: 'hsl(240,4%,66%)', fontSize: 12, fontFamily: 'Space Grotesk' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(240,4%,66%)', fontSize: 12, fontFamily: 'Space Grotesk' },
    splitLine: { lineStyle: { color: 'hsl(240,4%,16%)', type: 'solid' } }
  },
  tooltip: {
    backgroundColor: 'hsl(240,6%,3%)', borderColor: 'hsl(240,5%,26%)', borderWidth: 2,
    borderRadius: 0, padding: 16, shadowBlur: 0,
    textStyle: { fontFamily: 'Space Grotesk', color: 'hsl(0,0%,98%)', fontSize: 12 }
  },
  legend: {
    textStyle: { fontFamily: 'Space Grotesk', color: 'hsl(240,4%,66%)', fontSize: 12 },
    icon: 'rect', itemWidth: 12, itemHeight: 8, itemGap: 16
  }
};
```

### 各图表类型默认 series 样式

- **bar**: `barWidth: 60`, `itemStyle.borderRadius: [0,0,0,0]`（零圆角），可按需调 12/32/60
- **line**: `smooth: false`, `lineStyle.width: 2`, `symbol: 'circle'`, `symbolSize: 8`；阶梯变体 `step: 'middle'`
- **area**: `smooth: true`, `symbol: 'none'`, `lineStyle: { color: 'hsl(240,4%,34%)', width: 1 }`, `areaStyle: { color: 'hsl(240,4%,16%)', opacity: 0.5 }`
- **pie 环形**: `radius: ['45%','60%']`, `padAngle: 2`, `label: { show: false }`
- **pie 实心**: `radius: '60%'`, 内部 label 显示百分比（>10%），label 色 `hsl(240,6%,3%)`
- **水平 bar**: yAxis type category，axisLabel 白色 fontWeight 700，`barWidth: 12`

### 图表容器

容器 `border-2 border-border bg-background rounded-none p-8 md:p-12`，hover `hover:border-[primary色]`
高度 `h-96`/`h-80`/`h-64` 按密度选用，网格 `grid-cols-1 md:grid-cols-2 gap-8`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| Heading / 数字 / KPI | `Space Grotesk, Noto Sans SC, sans-serif` |
| Body（中文） | `Noto Sans SC, Inter, sans-serif` |
| Body（西文） | `Inter, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面主标题 | `text-[clamp(3rem,12vw,14rem)] font-bold leading-[0.8] tracking-tighter uppercase font-space` | text，品牌字用 primary |
| Section 大标题 | `text-[clamp(2.5rem,8vw,6rem)] font-bold font-space uppercase leading-none` | text |
| Section 标题 | `text-5xl md:text-7xl font-bold font-space uppercase leading-none` | text |
| 子 Section 标题 | `text-4xl md:text-5xl font-bold font-space uppercase` | text |
| 卡片内标题 | `text-2xl font-bold uppercase` | text |
| KPI 数值 | `text-4xl md:text-5xl lg:text-6xl font-bold font-space tracking-tighter leading-none` | text |
| 标签/分类 | `text-xs font-bold uppercase tracking-widest` | textMuted |
| 报告期副标题 | `text-sm md:text-base uppercase tracking-widest font-space` | primary |
| 正文描述 | `text-lg md:text-xl leading-tight` | textMuted |

---

## 页面结构

> Brutalist 编辑式布局 — 杂志式排版，以 Section 分隔线划分内容区块。

```
Kinetic Header（超大品牌标题 + 报告期标签 + 日期标签）
  → Infinite Marquee（primary 底色跑马灯数据带）
  → KPI 指标卡片行（grid 4 列）
  → 左右 Section（左 1/3 标题+描述 | 右 2/3 图表）
  → 双列 Section（grid 2 列并排图表，hover 边框效果）
  → Sticky 标题 + 叠加卡片 Section（左 sticky 标题 | 右堆叠卡片）
  → 全宽表格 Section
  → Footer（品牌名 + 链接）
```

Header: 报告期标签 primary 色 + 品牌标题 clamp + 底部 `border-b-2 border-border`，内边距 `pt-24 pb-12 px-4 md:px-8`
导航: 全页纵向滚动，Section 间以 `border-t-2 border-border` 分隔

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| Section 间距 | `mb-32` (128px) |
| Section 分隔线 | `border-t-2 border-border mb-8` |
| 组件间距 | `gap-8` (32px) / 大组件 `gap-12` (48px) |
| 容器最大宽 | `max-w-[95vw]` |
| 容器内边距 | `px-4 md:px-8` |
| 卡片内边距 | `p-6 md:p-8` 或 `p-8 md:p-12` |

### 圆角与阴影

> Design DNA: Bauhaus — `sharp (0px)` + `none`

所有卡片/按钮/进度条: `rounded-none`，阴影: 无（全局扁平 + 粗边框）
边框: 全局 `border-2 border-border`（2px hsl(240 5% 26%)），Section 分隔 `border-t-2`

### Hover 交互

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 翻转 | 指标卡片、表格行 | 整容器变 primary 底 + 黑字 |
| 边框 | 图表容器 | `hover:border-[primary色] transition-colors duration-300` |
| 按钮 | CTA | `bg-[primary色] text-black hover:bg-white` |

### 动画

- 卡片 hover: `transition-all duration-300`
- 表格行: `transition-colors duration-0`（瞬时切换）
- Marquee: `25s linear infinite`，translateX，内容复制 3 份
- 选中色: `selection:bg-[primary色] selection:text-black`
- 噪声纹理: `fixed inset-0 pointer-events-none z-50 opacity-0.04`
- 滚动条: track bg色 / thumb border色 / thumb:hover primary色

---

## 组件规范

### KPI 指标卡片

容器 `border-2 border-border bg-background p-6 md:p-8 flex flex-col justify-between h-full`
Hover: 整卡翻转 `bg-[primary色] border-[primary色]` + 所有文字变黑
布局: 顶部标签(左)+图标(右) `mb-6`，底部大数值+副值+趋势
数值: `text-4xl md:text-5xl lg:text-6xl font-bold font-space tracking-tighter`
趋势: 正向 primary + ArrowUpRight / 负向 hsl(0 84% 60%) + ArrowDownRight

### 图表容器卡片

容器 `border-2 border-border bg-background p-8 md:p-12`
Hover: `hover:border-[primary色]`
标题: `text-2xl font-bold uppercase` + 左侧 primary 方块 `w-4 h-4`

### 数据表格

容器 `border-2 border-border bg-background overflow-x-auto`
表头: `bg-accent/50 border-b-2` + `text-xs uppercase tracking-widest font-bold`
行 hover: `bg-[primary色]` 整行翻转 + `duration-0`
序号: `font-space font-bold` 两位补零，数值右对齐
进度条: `h-2 rounded-none w-24`，>=100% primary / >=80% white / <80% hsl(240 4% 34%)

### 洞察卡片（primary 反转版）

`border-2 border-[primary色] bg-[primary色] text-black p-8`，可选 `rotate-1`
编号式列表 (01, 02, 03)，`border-b border-black/20` 分隔

### Marquee 跑马灯

`w-full bg-[primary色] text-black border-y-2 py-3 overflow-hidden`
`text-2xl md:text-4xl font-bold font-space uppercase`，diamond 分隔，3 份循环

### 按钮

主: `bg-[primary色] text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white rounded-none`
边框: `border-2 border-border text-foreground hover:bg-[primary色] hover:text-black`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | KPI 4 列, 图表 2~3 列, Section 左标题右图表分栏 |
| 768px ~ 1023px (md) | KPI 2 列, 图表 1~2 列, Header 字号缩小, 卡片内边距增大 |
| < 768px | KPI 单列, 图表单列, Section 垂直堆叠, marquee text-2xl, 按钮全宽 |

---

## 风格建议

- **单页纵向滚动**：Brutalist 编辑式风格以 Section 分隔线串联，保持沉浸感和冲击力
- **配色序列一致**：6 色序列覆盖多数可视化场景，统一使用强化整体性
- **零圆角 + 粗边框是核心签名**：`rounded-none` + `border-2` 贯穿所有 UI 元素
- **Primary / Accent 分工明确**：primary（酸性黄绿）专用于主交互和视觉焦点，accent（深灰）用于次级背景和层次区分
