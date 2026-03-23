# Slate Minimal · 石板极简 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Ultra-Minimal — 极简主义美学，大圆角卡片、克制 slate 灰阶与 indigo 强调色
- **Visual Signature**:
  1. 超大圆角卡片（32-48px），零多余装饰，大量留白
  2. Inter 字体 Black(900)/Bold(700) 字重锚点，纤细辅助文字形成强字重对比
  3. 极浅边框（1px slate-100）+ 柔和分层阴影
  4. slate 灰阶漏斗渐变 + indigo 单色强调
  5. 杂志式排版，呼吸感留白
- **Emotional Tone**: 冷静克制、高级简约、专业现代
- **Design Style**: Muji 极简 x Rounded 圆润几何

---

## 配色方案

**方案**: Slate Grey + Indigo Accent
**色彩关系**: 极浅灰蓝底 + 白色卡片 + indigo 单一强调色
**主题**: 浅色

> **配色设计理由**：slate 灰阶提供冷静中性阅读环境，indigo 作为唯一高饱和色相构建焦点与品牌识别，白色卡片在浅灰底上通过微阴影悬浮分层。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(210 40% 98%) | 页面整体底色，极浅灰蓝 |
| surface | hsl(0 0% 100%) | 白色卡片底色 |
| header | hsl(222 47% 11%) | 深色强调卡片背景（视觉锚点） |
| text | hsl(222 47% 11%) | 标题、核心数值等主要文字 |
| textMuted | hsl(215 16% 65%) | 描述文字、次要标签、副标题 |
| primary | hsl(243 75% 59%) | 主交互色：CTA 按钮、趋势线、高亮标题 |
| accent | hsl(210 40% 96%) | 弱强调色：hover 背景、图标浅底、分隔线 |
| border | hsl(210 40% 96%) | 极浅边框线、分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(243 75% 59%)`：CTA 按钮、趋势线、品牌高亮，视觉权重最高
**Accent（弱强调色）** — `hsl(210 40% 96%)`：hover 背景、图标浅底色、列表 hover，权重低于 primary

### 衍生规则

- **bg → surface**：明度从 98% 到 100%，通过 `shadow-sm` 区分层级
- **primary 色阶**：indigo-50 `hsl(226 100% 97%)` 图标底 → indigo-600 主色 → indigo-700 `hsl(243 75% 52%)` hover
- **header 前景**：白色 hsl(0 0% 100%)，在深色卡片上确保对比度 > 7:1
- **textMuted**：介于 bg 与 text 之间的 slate-400，提供三级文字层次
- **accent 与 border 同色**：极浅灰 hsl(210 40% 96%)，边框与 hover 背景统一

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/上升 | hsl(160 84% 39%) | emerald-500 |
| 负向/下降 | hsl(0 84% 60%) | red-500 |
| primary hover | hsl(243 75% 52%) | indigo-700 |
| 选区背景 | hsl(226 100% 94%) | indigo-100 |

### 扩展色阶（漏斗梯度）

| 层级 | HSL | 语义 |
|------|-----|------|
| Level 1 | hsl(210 40% 96%) | 起始层 |
| Level 2 | hsl(214 32% 91%) | 次浅 |
| Level 3 | hsl(213 27% 84%) | 中间 |
| Level 4 | hsl(215 20% 65%) | 转折 |
| Level 5 | hsl(244 47% 20%) | 深紫 |
| Level 6 | hsl(0 0% 0%) | 纯黑 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(243,75%,59%)', 'hsl(215,20%,65%)', 'hsl(213,27%,84%)', 'hsl(244,47%,20%)', 'hsl(215,16%,65%)', 'hsl(222,47%,11%)'];
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, -apple-system, sans-serif', color: 'hsl(215,16%,65%)', fontSize: 11, fontWeight: 500 },
  grid: { containLabel: true, left: 0, right: 0, top: 20, bottom: 16 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,65%)', fontSize: 11, fontWeight: 500 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false },
    splitLine: { lineStyle: { color: 'hsl(210,40%,96%)', width: 1 } }
  },
  tooltip: {
    backgroundColor: 'hsl(0,0%,100%)', borderColor: 'transparent', borderWidth: 0,
    textStyle: { color: 'hsl(222,47%,11%)', fontSize: 13, fontWeight: 600 },
    extraCssText: 'border-radius:16px; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); padding:12px 16px;'
  },
  legend: { textStyle: { color: 'hsl(215,16%,65%)', fontSize: 11 }, icon: 'circle', itemWidth: 8, itemHeight: 8 }
};
```

### 各图表类型默认 series 样式

- **line**: `smooth: true`, `lineStyle.width: 3`, `symbolSize: 0`, `symbol: 'circle'`
- **area**: `smooth: true`, `symbol: 'none'`, 线性渐变 `rgba(indigo,0.2) → rgba(indigo,0)`
- **bar**: `barWidth: auto`, `itemStyle.borderRadius: [4,4,0,0]`
- **pie 环形**: `radius: ['45%','65%']`, `label: { show: false }`, 白色 borderWidth 2
- **pie 实心**: `radius: '60%'`, 外部 label, fontSize 12

### 图表容器

容器 `bg-white border border-slate-100 shadow-sm rounded-[32px] p-6`
高度 `h-48` / `h-64`，网格 `grid-cols-1 lg:grid-cols-2 gap-6`

---

## 字体排版

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Inter, -apple-system, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面主标题 | `text-4xl font-black tracking-tight` | text |
| 大数值 | `text-4xl font-bold tracking-tight` | text |
| 区块标题 | `text-2xl font-black` | text |
| 子标题 | `text-lg font-bold` | text |
| 正文 | `text-sm font-bold` | text |
| 标签 | `text-xs font-medium` | textMuted |
| 微文字 | `text-[11px] font-medium` | textMuted |
| 排名数值 | `font-black italic` | text |
| 页脚 legend | `uppercase tracking-widest` | textMuted |

---

## 页面结构

> 极简杂志式布局 — 居中内容 + 超大圆角 + 呼吸感留白。

```
Hero Section（标题居中 + 横向筛选条, max-w-4xl）
  → StatCard 行（grid 4 列, 暗色锚点 1 张 + 3 浅色）
  → 主内容区（左 7 col | 右 5 col, 超大圆角白卡片）
  → 页脚 Legend 居中
```

容器约束: 页面 `max-w-7xl`，Hero `max-w-4xl`，筛选 `max-w-2xl`，漏斗标签 `max-w-[500px]`
栅格: `grid grid-cols-12 gap-6`，左 `lg:col-span-7`，右 `lg:col-span-5`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| Hero 上 / 下内边距 | `pt-20` / `pb-12` |
| 主内容底部 | `pb-24` |
| 组件间距 | `gap-6` |

### 圆角体系

| 元素 | 圆角 |
|------|------|
| 主内容大卡片 | `rounded-[48px]` |
| 强调色 / 趋势卡片 | `rounded-[40px]` |
| 统计卡片 | `rounded-[32px]` |
| 筛选栏 / 列表 hover | `rounded-2xl` |
| Tooltip | 16px |
| 图标按钮 / 头像 | `rounded-full` |
| 图标小底色 | `rounded-lg` |
| 页脚色块 | `rounded-sm` |

### 阴影体系

| 元素 | 阴影 |
|------|------|
| 普通白色卡片 | `shadow-sm` |
| 暗色统计卡片 | `shadow-2xl` |
| 强调色卡片 | `shadow-xl shadow-indigo-100` |
| CTA 圆形按钮 | `shadow-lg shadow-indigo-200` |

### 边框与交互

- 卡片: `border border-slate-100`，暗色/强调色卡片无边框
- 筛选竖线: `w-px h-6 bg-slate-100`
- 统计卡片 hover: `hover:scale-[1.02] transition-all duration-300`
- CTA hover: `hover:bg-indigo-700 transition-colors`
- 装饰线: `bg-gradient-to-b from-transparent to-slate-200`

---

## 组件规范

### StatCard（统计卡片）

容器 `p-8 rounded-[32px]`，标签 `mb-6`，数值 `text-4xl font-bold tracking-tight`
暗色变体: `bg-slate-900 text-white shadow-2xl`，图标底 `bg-indigo-500`
浅色变体: `bg-white border border-slate-100 shadow-sm`，图标底 `bg-slate-50`
Hover: `hover:scale-[1.02] transition-all duration-300`

### FilterDropdown（筛选下拉）

横向 `flex items-center space-x-2`，容器 `rounded-2xl shadow-sm border p-1`

### FunnelSegment（漏斗段）

高度 `60px`，CSS clipPath 梯形切割，宽度 90% → 5%
颜色 `hsl(210 40% 96%)` → `hsl(0 0% 0%)`，`transition-all duration-500 ease-out`

### RecruiterItem（排名列表项）

`p-4 rounded-2xl`，排名 `w-8 h-8 rounded-full bg-white/20`
成就数值 `text-sm font-black italic`

### 趋势图卡片

容器高度 `h-48`，面积渐变从 `rgba(79,70,229,0.2)` → `rgba(79,70,229,0)`
底部脚注 `border-t border-slate-50 mt-6 pt-6`

### CTA 圆形按钮

`p-3 bg-indigo-600 rounded-full text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 主内容左 7 右 5 分栏 |
| >= 768px (md) | 统计卡片 4 列 |
| < 768px | 单列堆叠，筛选条 flex-wrap，分隔竖线 hidden |

---

## 风格建议

- **留白优先**：Hero `pt-20 pb-12`，底部 `pb-24`，大量呼吸空间是核心气质
- **圆角递进**：外层 40-48px → 内层 16-8px，形成视觉包裹感
- **色彩克制**：全局仅 slate 灰阶 + indigo 单一强调色，扩展在 indigo 色阶内
- **Primary / Accent 分工**：primary（indigo）主交互焦点，accent（极浅灰）hover 与层次区分
- **暗色卡片**：每组仅保留一张 `bg-slate-900` 作为视觉锚点，不宜多用
