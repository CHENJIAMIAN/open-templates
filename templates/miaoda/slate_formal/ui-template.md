# Slate Formal · 石板正式 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 专业商务 — 深色 Hero 区 + 浅色内容区双层对比布局，大量留白与圆润卡片构成高端商务气质
- **Design Style**: Soft Blocks 柔色块 x Rounded 圆润几何 — pill 胶囊导航 + 多级圆角递进(12px~40px) + 深浅交替节奏
- **Visual Signature**:
  1. slate-900 深底 Hero 搭配 blue-600 单一主色锚点
  2. Pill 胶囊式导航按钮，激活态 blue-600
  3. 暗色特写区块 `rounded-[40px]` 打断浅色卡片流
  4. 碳纤维纹理 + 蓝色模糊光晕背景
  5. 时间线布局：左侧竖线 + 圆点 + 右侧卡片
- **Emotional Tone**: 专业稳重、数据驱动、自信简洁

---

## 配色方案

**方案**: 自定义（Slate Formal + Blue Accent）
**色彩关系**: 浅灰白底 + 单一 blue-600 主色 + 深色区块穿插
**主题**: 浅色为主，深色 Hero 与穿插区块

> **配色设计理由**：slate 灰阶体系建立专业稳重基调，blue-600 收敛为唯一主操作色锚点，语义色仅在状态标记中出现，避免多色竞争焦点。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(210 40% 98%) | 页面全局背景 |
| surface | hsl(0 0% 100%) | 卡片、内容容器 |
| header | hsl(222 47% 11%) | Hero 区、固定导航、暗色强调区块 |
| text | hsl(217 33% 17%) | 标题与主文本 |
| textMuted | hsl(215 16% 47%) | 副文本 / 辅助描述 |
| primary | hsl(217 91% 53%) | 主交互色：导航激活态、进度条、图表主色 |
| accent | hsl(210 40% 96%) | 弱强调色：边框、分割线、浅底背景 |
| border | hsl(210 40% 96%) | 卡片边框、分割线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(217 91% 53%)`：导航激活态、进度条、图表主色、时间线节点，视觉权重最高
**Accent（弱强调色）** — `hsl(210 40% 96%)`：卡片边框、分割线、浅底背景，权重低于 primary

### 衍生规则

- **深色区块**：header hsl(222 47% 11%) 用于 Hero / 暗色特写，内含 blue-600/10~20 模糊光晕
- **渐变特色卡**：`bg-gradient-to-br from-blue-600 to-indigo-700`，shadow-xl shadow-blue-200
- **左侧色条**：`border-l-4 border-l-{color}-500` 用于痛点/状态卡片
- **进度条**：轨道 slate-100，填充 blue-600 rounded-full shadow-sm

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 成功/达标 | hsl(160 84% 39%) / hsl(152 81% 96%) | emerald-600 / emerald-50 |
| 警示/改进 | hsl(38 92% 50%) / hsl(48 96% 89%) | amber-600 / amber-50 |
| 危险/痛点 | hsl(0 72% 51%) / hsl(0 86% 97%) | red-600 / red-50 |
| 辅助蓝 | hsl(217 91% 73%) / hsl(214 95% 93%) | blue-400 / blue-50 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(217,91%,53%)', 'hsl(217,91%,73%)', 'hsl(215,20%,65%)', 'hsl(210,40%,90%)'];
//               蓝(主色)            浅蓝               灰蓝(基准)          灰白(对比)
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
    axisLabel: { color: 'hsl(215,16%,47%)', fontSize: 12, fontFamily: 'Inter' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,47%)', fontSize: 12, fontFamily: 'Inter' },
    splitLine: { lineStyle: { color: 'hsl(210,40%,96%)', type: 'dashed' } }
  },
  tooltip: {
    backgroundColor: 'hsl(0,0%,100%)', borderColor: 'transparent', borderWidth: 0,
    borderRadius: 16, padding: 16, shadowBlur: 20, shadowOffsetY: 10, shadowColor: 'rgba(0,0,0,0.1)',
    textStyle: { fontFamily: 'Inter', color: 'hsl(217,33%,17%)', fontSize: 12 },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'hsl(210,40%,98%)' } }
  },
  legend: {
    top: 0, textStyle: { fontFamily: 'Inter', color: 'hsl(215,16%,47%)', fontSize: 12 },
    itemGap: 16, icon: 'circle', itemWidth: 10, itemHeight: 10
  }
};
```

### 各图表类型默认 series 样式

- **bar**: `barWidth: 28`, `itemStyle.borderRadius: [6,6,0,0]`; 基准系列 `color: hsl(210,40%,90%)`
- **line 主线**: `smooth: true`, `lineStyle.width: 3`, `symbolSize: 6`; 面积渐变 blue 0.1 -> 0
- **line 基准线**: `lineStyle: { width: 2, type: 'dashed', color: 'hsl(215,20%,65%)' }`, 无面积
- **pie 环形**: `radius: ['45%','60%']`, `padAngle: 2`, `borderRadius: 4`
- **radar**: splitArea `slate-100/50 + transparent`，splitLine `hsl(210,40%,96%)`
- **scatter**: `symbolSize: 10`, `borderWidth: 2`, `borderColor: white`

### 图表容器

容器 `bg-white rounded-xl border border-slate-100 shadow-sm p-6`
标题 `text-lg font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4`
高度 `h-[320px]`(柱状图) / `h-[380px]`(面积图)

---

## 字体排版

```css
font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
```

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面大标题 | `text-5xl md:text-6xl font-black tracking-tight` | white (Hero) |
| 后续规划标题 | `text-3xl font-black` | white |
| 区块标题 | `text-2xl font-bold` | text |
| 卡片标题 | `text-xl font-bold` | text |
| 图表标题 | `text-lg font-bold` | text |
| 统计数字 | `text-2xl font-black` | header |
| 正文描述 | `text-sm text-slate-500 leading-relaxed` | textMuted |
| 辅助标签 | `text-[10px] font-bold uppercase tracking-widest` | slate-400 |

---

## 页面结构

> 深浅交替 — Hero 深底 + 浅色内容 + 暗色穿插区块

```
固定导航栏（fixed top-0 z-50，bg-slate-900/95 backdrop-blur-md，pill 导航）
  -> Hero 区（bg-slate-900 pt-32 pb-48，碳纤维纹理 + 蓝色光晕）
  -> 统计卡片组（grid 4列 -mt-32 上浮）
  -> 内容区块（max-w-6xl mx-auto px-6）
     -> 双栏/三栏网格 sections
     -> 时间线布局
  -> 暗色特写区块（bg-slate-900 rounded-[40px] p-12）
  -> 页脚 + 回到顶部按钮
```

容器 `max-w-6xl mx-auto px-6`，区块间距 `mb-24`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区块间距 | `mb-24` (96px) |
| 卡片网格间距 | `gap-8` (32px) |
| 统计卡片间距 | `gap-6` (24px) |
| 卡片内边距 | `p-6` (24px) / 暗色 `p-12` (48px) |
| 容器最大宽 | `max-w-6xl` (1152px) |

### 圆角体系

> Design DNA: Rounded 圆润几何 — 多级圆角递进

| 元素 | 圆角 |
|-----|------|
| 标准卡片 | `rounded-xl` (12px) |
| 痛点卡/标签 | `rounded-2xl` (16px) |
| 交付卡/暗色框 | `rounded-3xl` (24px) |
| 规划大区块 | `rounded-[40px]` (40px) |
| 导航按钮 | `rounded-full` |
| 图标容器 | `rounded-lg` (8px) |

### 阴影与边框

| 层级 | 阴影 | 边框 |
|------|------|------|
| 标准卡片 | `shadow-sm` | `border border-slate-100` |
| Hover 态 | `shadow-md` / `shadow-lg` | `hover:border-blue-200` |
| 渐变特色卡 | `shadow-xl shadow-blue-200` | 无 border |
| 暗色大区块 | `shadow-2xl` | 无 |

### 背景特效

- Hero 纹理: 碳纤维 opacity-20
- 蓝色光晕: `bg-blue-600/20 rounded-full blur-3xl`
- 暗色区光效: `bg-blue-600/10 blur-[100px]`
- 导航模糊: `backdrop-blur-md`

### Hover 交互

卡片 `hover:shadow-lg hover:border-blue-200 transition-all`
时间线圆点 `group-hover:bg-blue-600`
痛点编号 `group-hover:bg-red-600 group-hover:text-white`
图标容器 `group-hover:bg-blue-600 group-hover:text-white`

---

## 组件规范

### Card 卡片

基础 `bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-lg hover:border-blue-200`
渐变变体 `bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-200`
左侧色条变体 `border-l-4 border-l-{color}-500`
暗色变体 `bg-slate-900 text-white shadow-2xl rounded-3xl / rounded-[40px]`

### 导航按钮 (Pill)

默认 `px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:bg-white/10`
激活 `bg-blue-600 text-white shadow-md shadow-blue-900/20`

### SectionTitle

图标容器 `p-2 bg-blue-100 rounded-lg text-blue-600` + 标题 `text-2xl font-bold`
副标题 `text-slate-500`，底部 `mb-8`

### 标签/Tag

标准 `px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-100`
成功 `bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest`
高优先级 `bg-red-500 text-white rounded-full text-[10px] font-black`

### 时间线

竖线 `absolute left-8 w-0.5 bg-slate-200`
圆点 `w-4 h-4 rounded-full bg-white border-4 border-blue-600 shadow-md`

### 进度条

轨道 `w-full bg-slate-100 h-2.5 rounded-full`
填充 `bg-blue-600 h-full rounded-full shadow-sm transition-all duration-1000`

### 暗色区圆形装饰

外圈 `w-56 h-56 bg-white/5 rounded-full backdrop-blur-md border border-white/10`
hover 光效 `bg-blue-600/20 scale-0 group-hover:scale-100 duration-500`
数字 `text-5xl font-black text-blue-500`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 导航显示，内容双栏(lg:grid-cols-2) |
| >= 768px (md) | 统计卡 4 列，交付卡 3 列，集成信息 4 列 |
| < 768px | 单列堆叠，导航隐藏，Hero text-5xl |

---

## 风格建议

- **深浅双层对比节奏**：每 2-3 个浅色 Section 后插入一个 `bg-slate-900 rounded-[40px]` 暗色区块，形成视觉呼吸
- **圆角递进体系**：rounded-lg(8px) -> rounded-xl(12px) -> rounded-3xl(24px) -> rounded-[40px]，随容器尺寸递增
- **blue-600 唯一主操作色**：所有可交互元素收敛至 blue-600，语义色仅用于状态标记
- **Primary / Accent 分工**：primary（蓝）专用于交互焦点，accent（浅灰）用于边框和层次背景
