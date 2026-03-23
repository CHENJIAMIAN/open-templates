# Fresh Mint · 清新薄荷 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Organic Fresh — 薄荷绿主色调，大圆角卡片与磨砂玻璃效果，轻量通透友好
- **Visual Signature**:
  1. 通透感：`backdrop-blur` + 半透明白底 + 渐变背景层叠玻璃质感
  2. 有机形态：超大圆角（24-32px）、圆形装饰、脉冲动画指示器
  3. 字重梯度层级：font-black 900 → font-extrabold 800 → font-bold 700
  4. 充裕留白：section 间距 32px，卡片内边距 24-32px
  5. 深色胶囊标题锚点 + 薄荷主色 CTA
- **Emotional Tone**: 清新、友好、通透、专业
- **Design Style**: Rounded 圆润几何 x Frosted Glass 毛玻璃

---

## 配色方案

**方案**: Fresh Mint（薄荷绿主调）
**色彩关系**: 浅薄荷底 + 白色卡片 + 翠绿主色 + 橙色警示
**主题**: 浅色

> **配色设计理由**：薄荷绿传递清新健康感，白色卡片在渐变背景上通过阴影悬浮，橙色仅用于警示场景形成对比。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(150 33% 97%) | 页面背景，极浅薄荷 |
| surface | hsl(0 0% 100%) | 所有内容卡片底色 |
| header | hsl(210 11% 15%) | 深色胶囊标题、图表标注气泡 |
| text | hsl(222 47% 11%) | 标题、核心数字 |
| textMuted | hsl(215 16% 65%) | 标签、说明、次要信息 |
| primary | hsl(168 100% 40%) | 主交互色：CTA 按钮、进度环、图表主线 |
| accent | hsl(152 26% 94%) | 弱强调色：薄荷功能卡底、hover 背景 |
| border | hsl(152 26% 94%) | 边框、分割线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(168 100% 40%)`：CTA 按钮、进度环、图表主色，视觉权重最高
**Accent（弱强调色）** — `hsl(152 26% 94%)`：功能卡底色、hover 背景、次级信息区，权重低于 primary

### 衍生规则

- **bg → surface**：bg 极浅薄荷 → surface 纯白，通过阴影悬浮分层
- **primary 色阶**：primary `hsl(168 100% 40%)` → hover `hsl(168 100% 36%)` → 浅底 `hsl(152 26% 94%)`
- **header**：从 text 推导的极深色，用于深色锚点组件
- **渐变背景**：顶部 45vh 从 `hsl(163 52% 72%)` via `hsl(156 57% 84%)` 到 bg 色
- **accent**：primary 同色相降饱和升明度，保持色调一致

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/上升 | hsl(160 84% 39%) | emerald-500 |
| 告警/下降 | hsl(25 95% 53%) | orange-600 |
| 高风险 | hsl(0 84% 60%) | red-500 |
| 告警背景 | hsl(33 100% 96%) | orange-50 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(168,100%,40%)', 'hsl(163,52%,72%)', 'hsl(38,92%,50%)', 'hsl(215,16%,65%)', 'hsl(210,11%,15%)'];
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 800, color: 'hsl(215,16%,65%)', fontSize: 10 },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,65%)', fontSize: 10, fontWeight: 800 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false },
    splitLine: { lineStyle: { type: 'dashed', dashOffset: 6, color: 'hsl(210,40%,96%)' } }
  },
  tooltip: {
    backgroundColor: 'hsl(0,0%,100%)', borderColor: 'transparent', borderWidth: 0, borderRadius: 16, padding: 12,
    textStyle: { color: 'hsl(222,47%,11%)', fontWeight: 800, fontSize: 12 },
    extraCssText: 'box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);'
  },
  legend: { textStyle: { color: 'hsl(215,16%,65%)', fontSize: 10 }, icon: 'circle', itemWidth: 8, itemHeight: 8 }
};
```

### 各图表类型默认 series 样式

- **line**: `smooth: false`, `lineStyle.width: 4`, `symbolSize: 10`, `symbol: 'circle'`, itemStyle `borderWidth: 3, borderColor: white`
- **area**: 同 line 基础上加 `areaStyle` 渐变
- **bar**: `barWidth: auto`, `itemStyle.borderRadius: [4,4,0,0]`

### 图表容器

容器 `bg-white rounded-[32px] p-6 shadow-xl`
图表高度 `220px`，标题间距 `mb-8`
注释区: `rounded-[24px]` 底色 accent + border

### 数据标注

极值标注: `hsl(210 11% 15%)` 深色气泡 + 白色文字，圆角 6px
常规标注: textMuted, 9px, fontWeight 800

---

## 字体排版

```css
font-family: 'Noto Sans SC', system-ui, -apple-system, sans-serif;
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Noto Sans SC, system-ui, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 超大数字 | `text-6xl font-[900]` | text |
| 大数字 | `text-4xl font-extrabold tracking-tight` | text |
| 数据强调 | `text-3xl font-black` | primary |
| 页面标题 | `text-3xl font-[900]` | text |
| 区块标题 | `text-2xl font-black` | text |
| 内容标题 | `text-lg font-black` | text |
| CTA 按钮 | `text-lg font-black` | surface |
| 副标题 | `text-sm font-bold` | textMuted |
| 注释 | `text-xs font-black` | text |
| 微标签 | `text-[11px] font-black uppercase tracking-wider` | textMuted |
| 极小标注 | `text-[10px] font-bold` | textMuted |

### 文字装饰

- 大写微标签: `uppercase tracking-wider` / `tracking-[0.2em]`
- 数字紧凑: `tracking-tight` / `tracking-tighter`
- 文字选区: `selection:bg-emerald-100`

---

## 页面结构

> 清新有机布局 — 渐变背景 + 浮动白色卡片 + 固定底栏 CTA。

```
[全屏背景层]
  ├─ 顶部渐变色块（45vh, gradient-to-br 薄荷 → bg）
  ├─ 装饰模糊圆（右上 w-64 h-64 white/20 blur-3xl）
  └─ [内容层 max-w-1080px mx-auto]
       ├─ Header（徽标 + 标题 + 装饰图标卡片 + 周期标签胶囊）
       ├─ Main（space-y-8）
       │    ├─ 摘要卡片（全宽 grid-cols-3）
       │    ├─ 双列区域（lg:grid-cols-2 gap-8）
       │    └─ 图表区域（深色胶囊标题 + 折线图卡片）
       └─ Fixed 底栏（渐变遮罩 + CTA 按钮）
```

内容最大宽度 `max-w-[1080px]`，水平内边距 `px-6`
底部固定栏: `fixed bottom-0 z-50 backdrop-blur-[2px]`，页面预留 `pb-32`

---

## 视觉风格

### 圆角体系

| 元素 | 圆角 |
|------|------|
| 主卡片 | `rounded-[32px]` |
| CTA 按钮 | `rounded-[28px]` |
| 子功能卡 / 注释区 | `rounded-[24px]` |
| 统计格子 / 趋势徽章 | `rounded-3xl` |
| 胶囊标签 | `rounded-full` |
| Tooltip | 16px |
| 头像 / 图标框 | `rounded-3xl` |

### 阴影体系

| 元素 | 阴影 |
|------|------|
| 主内容卡片 | `shadow-xl shadow-slate-200/50` |
| CTA 按钮 | `shadow-2xl shadow-emerald-500/40` |
| 装饰图标框 | `shadow-xl shadow-emerald-900/10` |
| 头像 | `shadow-md` |
| 胶囊 / 小按钮 | `shadow-sm` |
| 深色胶囊标题 | `shadow-lg shadow-slate-900/10` |

### 磨砂玻璃 / 半透明

| 元素 | 效果 |
|------|------|
| 顶部徽标标签 | `bg-white/30 backdrop-blur-sm border-white/40` |
| 统计周期标签 | `bg-white/80 backdrop-blur-md border-white` |
| 装饰光晕 | `gradient emerald → teal, blur, opacity-25` |
| 底栏遮罩 | `via-white/95 backdrop-blur-[2px]` |
| CTA 按钮内图标框 | `bg-white/20` |

### 交互效果

- 按钮: `active:scale-[0.98] transition-all`
- 光晕: `group-hover:opacity-50 duration-1000`
- 图标: `group-hover:rotate-12 transition-transform`
- 列表行: `hover:bg-emerald-50 / hover:bg-orange-50 transition-all`
- 脉冲点: `animate-pulse`
- SVG 进度环: `transition-all duration-1000 ease-out`

---

## 组件规范

### 主卡片（Section Card）

容器 `bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-white overflow-hidden`
等高: grid 内使用 `h-full flex flex-col`

### 统计格子（Stat Grid Cell）

`rounded-3xl p-5 text-center border`，默认 `bg-slate-50/50`，强调 `bg-emerald-50`
标签 `text-[11px] font-bold uppercase tracking-wider`，数值 `text-3xl font-black`
布局 `grid-cols-3 gap-6`

### StatCard

`bg-white p-5 rounded-2xl shadow-sm border border-slate-50 min-h-[140px]`
标签 `text-sm font-bold mb-4`，数值 `text-4xl font-extrabold tracking-tight`
趋势徽章 `text-xs font-bold px-3 py-1 rounded-full`

### 状态扫描行（Status Row）

`rounded-3xl p-5 flex items-center justify-between border transition-all`
正向: `bg-emerald-50/40 hover:bg-emerald-50`
告警: `bg-orange-50/40 hover:bg-orange-50`

### NPS 环形仪表

SVG `viewBox 0 0 200 200`，背景环 stroke accent，进度环 stroke primary
中心数值 `text-6xl font-[900] tracking-tighter`

### CTA 按钮

`w-full bg-primary text-white rounded-[28px] font-black h-18 shadow-2xl shadow-emerald-500/40`
Hover: `bg-primary-hover`，Active: `scale-[0.98]`
左侧图标框 `bg-white/20 p-2.5 rounded-2xl hover:rotate-12`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 双列 `lg:grid-cols-2 gap-8` |
| < 1024px | 单列堆叠 |

内容最大宽度 `1080px`，水平内边距 `24px`。

---

## 风格建议

- **通透呼吸感**：卡片间距 32px，内边距不低于 24px
- **圆角梯度**：外层 32px → 内嵌 24px → 小元素 16px → 胶囊 full
- **字重即层级**：900 → 800 → 700 区分信息层级，避免 Regular(400) 作主体
- **主色克制**：primary 仅用于核心交互，大面积用极浅变体 accent
- **Primary / Accent 分工**：primary（薄荷绿）专用交互焦点，accent（极浅薄荷）用于次级背景
- **深色锚点**：`header` 色深色胶囊标题防止页面"飘"感
- **动效轻柔**：脉冲仅 1-2 个关键点，悬停过渡 150ms 默认
