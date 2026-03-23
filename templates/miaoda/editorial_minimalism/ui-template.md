# Editorial Minimalism · 编辑式极简 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 编辑式极简主义 — 高端时尚杂志排版美学，超大字号标题 x 大面积留白 x 超大圆角容器(Pill-shaped)
- **Design Style**: Editorial 经典排版 x Rounded 圆润几何 — 粗细字重对比 + 疏密交替叙事 + Sunburst 装饰光芒
- **Visual Signature**:
  1. 超大圆角卡片体系 (32px ~ 48px)，胶囊感容器
  2. 粗体层级鲜明：font-extrabold(800) 为标题，font-bold(700) 为正文，几乎不使用 regular
  3. 全大写 Badge 标签 + tracking-widest，模拟杂志版式
  4. 装饰性 Sunburst SVG 光芒图案 + 模糊背景蓝色圆
  5. 缓慢优雅 hover（duration-500），投影浮起为主
- **Emotional Tone**: 沉稳、权威、洗练、高级感
- **Keywords**: 杂志排版 / 超大圆角 / 极简留白 / 粗体层级 / 高级灰调 / 装饰光芒 / 叙事节奏

---

## 配色方案

**方案**: 自定义（Editorial Slate + Blue Accent）
**色彩关系**: 柔和灰调底 + 单一蓝色主色锚点 + 中性灰阶层次
**主题**: 浅色

> **配色设计理由**：slate 灰阶体系构建高级纸质感，blue-600 作为唯一色相点缀关键交互节点，通过极简的色彩克制强化编辑式高级感。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(210 40% 98%) | 页面全局底色，柔和纸质感 |
| surface | hsl(0 0% 100%) | 卡片、图表容器、列表背景 |
| header | hsl(222 47% 11%) | 反色区块背景（深色面板） |
| text | hsl(222 47% 11%) | 标题与主文本 |
| textMuted | hsl(215 16% 47%) | 正文二级描述 |
| primary | hsl(217 91% 53%) | 主交互色：品牌圆点、图表主线、链接、交互高亮 |
| accent | hsl(210 40% 96%) | 弱强调色：分割线、边框、图表网格线 |
| border | hsl(210 40% 96%) | 卡片边框、分割线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(217 91% 53%)`：品牌圆点、图表主色、链接文字、hover 高亮，视觉权重最高
**Accent（弱强调色）** — `hsl(210 40% 96%)`：边框、分割线、图表网格线，提供层次区分

### 衍生规则

- **文字灰阶四级**：slate-900(标题) -> slate-500(正文) -> slate-400(弱标签) -> slate-300(最弱提示)
- **Primary 渐变**：primary 0.1 -> 0 线性渐变，用于图表面积填充
- **装饰模糊圆**：blue-50 opacity-50，600px 直径，blur-3xl 高斯模糊
- **选中态**：`selection:bg-blue-100 selection:text-blue-900`

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 成功/正向 | hsl(160 84% 39%) / hsl(152 81% 96%) | emerald-600 / emerald-50 |
| 危险/警告 | hsl(0 84% 60%) / hsl(347 77% 50%) | 事件警告 / 负向指标 |
| 警示 | hsl(38 92% 50%) / hsl(55 92% 95%) | yellow-600 / yellow-50 |
| 深色面板 | hsl(222 47% 11%) | slate-900 反色区块 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(217,91%,53%)', 'hsl(160,84%,39%)', 'hsl(38,92%,50%)', 'hsl(347,77%,50%)', 'hsl(258,90%,66%)', 'hsl(199,89%,48%)'];
//               蓝(主色)            翠绿(成功)          琥珀(警示)          玫红(危险)          紫                  天蓝
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, PingFang SC, Microsoft YaHei, sans-serif', color: 'hsl(215,16%,47%)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,20%,65%)', fontSize: 12, fontFamily: 'Inter' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,20%,65%)', fontSize: 12, fontFamily: 'Inter' },
    splitLine: { lineStyle: { color: 'hsl(210,40%,96%)', type: 'dashed' } }
  },
  tooltip: {
    backgroundColor: 'hsl(0,0%,100%)', borderColor: 'transparent', borderWidth: 0,
    borderRadius: 16, padding: 16, shadowBlur: 40, shadowOffsetY: 20, shadowColor: 'rgba(0,0,0,0.1)',
    textStyle: { fontFamily: 'Inter', color: 'hsl(222,47%,11%)', fontSize: 12 },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(37,99,235,0.04)' } }
  },
  legend: {
    textStyle: { fontFamily: 'Inter', color: 'hsl(215,16%,47%)', fontSize: 12, fontWeight: 'bold' },
    itemGap: 16, icon: 'circle', itemWidth: 10, itemHeight: 10
  }
};
```

### 各图表类型默认 series 样式

- **line**: `smooth: true`, `lineStyle.width: 4`, `symbol: 'circle'`, `symbolSize: 6`; 面积渐变 primary 0.1 -> 0
- **bar**: `barWidth: 32`, `itemStyle.borderRadius: [6,6,0,0]`
- **pie 环形**: `radius: ['45%','60%']`, `padAngle: 2`, `borderRadius: 4`, `label: { show: false }`
- **pie 实心**: `radius: '60%'`, 内部 label >10% 显示百分比
- **radar**: splitArea `slate-100/50 + transparent` 交替，splitLine/axisLine 色 `hsl(210,40%,96%)`
- **scatter**: `symbolSize: 10`, `borderWidth: 2`, `borderColor: white`

### 图表容器

容器 `bg-white rounded-[2.5rem] border border-slate-100 p-8`
Hover `hover:shadow-xl transition-all duration-500`
高度 `h-[450px]`(大图) / `h-80`(中) / `h-64`(小)，网格 `grid-cols-1 md:grid-cols-2 gap-6`

---

## 字体排版

```css
font-family: 'Inter', "PingFang SC", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif;
```

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| Display 主标题 | `text-5xl md:text-7xl font-extrabold tracking-tighter` | text |
| H1 指标大数字 | `text-4xl font-extrabold tracking-tight` | text |
| H2 区块标题 | `text-3xl font-bold tracking-tight` | text |
| H3 反色卡片副标题 | `text-2xl font-bold` | white |
| H4 百分比 | `text-xl font-bold` | text |
| Body | `text-[15px] font-bold` | text |
| Body-sm | `text-sm font-bold / font-medium` | textMuted |
| Caption | `text-xs font-bold tracking-widest` | textMuted |
| Badge | `text-[10px] font-bold tracking-widest uppercase` | white on slate-900 |

### 排版特征

- **字重偏好**：极大量使用 font-bold(700) 和 font-extrabold(800)，几乎不使用 regular(400)
- **全大写标签**：所有 Badge 与辅助说明 `uppercase + tracking-widest`
- **引述样式**：`font-medium italic leading-relaxed` + 60px 引号图标 blue-100

---

## 页面结构

> 杂志式编辑布局 — 超大圆角容器 + 大面积留白

```
Header（bg-white pt-12 pb-16，Logo圆点 + 主标题 + 报告人信息）
  -> 4列指标卡网格（mb-12）
  -> 12列网格 8+4（面积图 + 反色卡片，mb-20）
  -> 2列等高网格（功能列表 + 警示区块，mb-20）
  -> 全宽引述卡片（mb-20）
  -> Footer（pt-12 border-t）
```

容器 `max-w-7xl mx-auto px-8`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区块间距 | `mb-12` ~ `mb-20` |
| 卡片内边距 | `p-8` (标准) / `p-12` (引述) |
| 网格间隙 | `gap-6` ~ `gap-12` |

### 圆角体系

> Design DNA: Rounded — 超大圆角胶囊感

| 元素 | 圆角 |
|-----|------|
| 指标卡片 | `rounded-[2rem]` (32px) |
| 图表/反色/警示 | `rounded-[2.5rem]` (40px) |
| 引述区块 | `rounded-[3rem]` (48px) |
| 列表条目 | `rounded-[1.5rem]` (24px) |
| 事件子卡片 | `rounded-2xl` (16px) |
| Badge/头像 | `rounded-full` |

### 投影与边框

投影: 默认无，hover `shadow-xl` duration-500; 头像 `shadow-2xl`; Logo `shadow-lg`
边框: 卡片 `border border-slate-100`, hover `border-blue-200`; 反色内 `border-b border-slate-800`

### 装饰元素

- **Sunburst SVG**: 8条放射线，指标卡 `w-24 h-24` text-slate-50, 反色卡 `w-48 h-48` white/5, 警示 `w-40` 黄色 hover rotate-45
- **模糊背景圆**: Header `w-[600px] h-[600px]` blue-50 blur-3xl opacity-50
- **引述角落装饰**: blue-50/50 + indigo-50/50 半圆形色块
- **毛玻璃**: 事件子卡片 `bg-white/70 backdrop-blur-md`

---

## 组件规范

### MetricSlide（指标卡片）

容器 `bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl duration-500`
图标 `w-12 h-12 rounded-full bg-{color}-500 text-white shadow-lg shadow-{color}-100`
大数字 `text-4xl font-extrabold text-slate-900 tracking-tight`
变化胶囊 `text-xs font-bold px-2 py-1 rounded-full` 正向 emerald / 负向 rose
装饰 Sunburst SVG，absolute -right-6 -bottom-6

### Badge（黑色胶囊标签）

`bg-slate-900 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4`

### 功能列表条目

容器 `p-4 bg-white rounded-[1.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-sm`
序号圆 `w-9 h-9 bg-slate-50 rounded-full`，hover `bg-blue-600 text-white`
功能名 `font-bold text-[15px]`，变化指标 `text-blue-600 font-bold text-sm`

### 反色卡片（深色面板）

`bg-slate-900 p-8 rounded-[2.5rem] text-white h-[450px]`
标签 `text-xs font-bold text-slate-400 uppercase tracking-widest`
底部图标 `w-12 h-12 rounded-full border border-slate-700`

### 警示区块

`bg-yellow-50 p-8 rounded-[2.5rem]`
事件子卡片 `bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border-white/50`
警告图标 `w-10 h-10 rounded-full bg-[hsl(0,100%,60%)] shadow-lg shadow-rose-100`

### 引述区块

`bg-white p-12 rounded-[3rem] border border-slate-100 text-center`
引述文字 `text-3xl font-medium italic leading-relaxed`
角落装饰 blue-50/50 + indigo-50/50 半圆形

### Header / Footer

Header: `bg-white pt-12 pb-16`，品牌圆点 `w-10 h-10 bg-blue-600 rounded-full shadow-lg`
主标题 `text-5xl md:text-7xl font-extrabold tracking-tighter`
Footer: `pt-12 border-t border-slate-200`，Logo `w-8 h-8 bg-slate-900 rounded-lg`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 指标卡 4 列，图表 8:4 分栏，功能+稳定性 2 列 |
| >= 768px (md) | 指标卡 2 列，Header 横向，标题 text-7xl |
| < 768px | 单列堆叠，标题 text-5xl |

---

## 风格建议

- **超大圆角一致性**：任何新增卡片圆角不低于 1.5rem(24px)，核心容器 2rem~3rem，避免直角
- **字重纪律**：最低 font-medium(500) 仅用于最次要文字，默认 font-bold(700)，标题 font-extrabold(800)
- **色彩克制**：主色仅 blue-600 一种，功能色(emerald/rose/yellow)仅语义场景
- **装饰元素低透**：Sunburst opacity-5~40，模糊背景圆 400-600px blur-3xl
- **大写标签系统**：辅助标签 `uppercase + tracking-widest + text-xs + font-bold` 为核心视觉签名
- **交互缓慢优雅**：hover duration-500，以 shadow-xl 和 border-blue-200 过渡为主
