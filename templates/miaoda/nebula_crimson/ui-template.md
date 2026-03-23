# Nebula Crimson · 深红星云 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 高端商务年报风格 — 深红色(Dark Crimson)品牌主色调，大量留白 x 超大字重排版，权威感与仪式感
- **Design Style**: Editorial 经典排版 x Soft Blocks 柔色块 — 超黑字重标题 + 宽松圆角容器 + 明暗交替全幅区块
- **Visual Signature**:
  1. 超黑字重标题 (font-black / 900)，tracking-tighter，全大写英文注释标签
  2. 深红渐变区块交替：白底 -> 深红 -> 浅灰 -> 极深黑
  3. 大圆角卡片体系 (12px ~ 32px)，柔和阴影
  4. 复合背景纹理：径向渐变 + 网格线 + 碳纤维 + 点阵
  5. 底部进度动画线 + 卡片上浮 hover
- **Emotional Tone**: 权威、庄重、自信、高端科技感

---

## 配色方案

**方案**: 自定义（Dark Crimson Premium）
**色彩关系**: 浅灰/白底 + 深红强调 + 明暗区块交替
**主题**: 浅色为主，深色区块穿插

> **配色设计理由**：浅灰白底营造高端年报的纸质质感，深红仅用于品牌区块与强调数值，通过大面积留白衬托深红的点睛效果，形成庄重而克制的视觉节奏。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(210 20% 98%) | 页面主内容区浅灰底色 |
| surface | hsl(0 0% 100%) | 卡片、面板、内容容器底色 |
| header | hsl(0 100% 27%) | 深红主色，Hero / 全幅强调区块背景 |
| text | hsl(220 39% 11%) | 标题与正文主色 |
| textMuted | hsl(215 14% 62%) | 辅助标签、注释、副标题 |
| primary | hsl(0 100% 27%) | 主交互色：关键数值、图标高亮、进度条 |
| accent | hsl(210 17% 95%) | 弱强调色：图表面板浅底、hover 态背景 |
| border | hsl(210 20% 96%) | 卡片、面板轻量边框 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(0 100% 27%)`：深红品牌色，主按钮、进度条、装饰线、图标高亮，视觉权重最高
**Accent（弱强调色）** — `hsl(210 17% 95%)`：图表面板浅底、团队区块底色、hover 背景，权重低于 primary

### 衍生规则

- **背景色**：极浅灰 hsl(210 20% 98%) 营造纸质感，与深红形成温和对比
- **深色区块**：Hero hsl(0 100% 5%)、Outlook hsl(222 47% 3%)、Footer hsl(0 0% 2%) 三级暗度
- **正向色**：hsl(142 72% 29%) 绿色，正增长标识
- **图表渐变序列**：primary 向浅橙红渐变，5 级色阶覆盖数据可视化
- **暗色区容器**：白色 5%~20% 透明度，配合 backdrop-blur 形成玻璃态

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/增长 | hsl(142 72% 29%) | 绿色正增长标识 |
| 负向/下降 | hsl(0 100% 27%) | 同 primary |
| 深色 Hero 背景 | hsl(0 100% 5%) | 极深红黑 |
| Outlook 背景 | hsl(222 47% 3%) | 近纯黑 |
| Footer 背景 | hsl(0 0% 2%) | 极深黑 |

### 自定义 CSS 类

```css
.bg-nebula-crimson { background-color: hsl(0 100% 27%); }
.text-nebula-crimson { color: hsl(0 100% 27%); }
.border-nebula-crimson { border-color: hsl(0 100% 27%); }
```

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(0,100%,27%)', 'hsl(0,59%,40%)', 'hsl(0,44%,58%)', 'hsl(15,62%,69%)', 'hsl(16,100%,70%)'];
//               深红                棕红               印度红             深鲑红               浅鲑红
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, PingFang SC, Microsoft YaHei, sans-serif', color: 'hsl(215,14%,62%)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,14%,62%)', fontSize: 12, fontWeight: 'bold', fontFamily: 'Inter' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,14%,62%)', fontSize: 12, fontWeight: 'bold', fontFamily: 'Inter' },
    splitLine: { lineStyle: { color: 'hsl(0,0%,93%)', type: 'dashed' } }
  },
  tooltip: {
    backgroundColor: 'hsl(0,0%,100%)', borderColor: 'transparent', borderWidth: 0,
    borderRadius: 12, padding: 16, shadowBlur: 30, shadowColor: 'rgba(0,0,0,0.1)', shadowOffsetY: 10,
    textStyle: { fontFamily: 'Inter', color: 'hsl(220,39%,11%)', fontSize: 12 },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(139,0,0,0.05)' } }
  },
  legend: {
    textStyle: { fontFamily: 'Inter', color: 'hsl(215,14%,62%)', fontSize: 12 },
    itemGap: 16, icon: 'roundRect', itemWidth: 12, itemHeight: 8
  }
};
```

### 各图表类型默认 series 样式

- **line**: `smooth: false`, `lineStyle.width: 4`, `symbol: 'circle'`, `symbolSize: 8`; 面积渐变 primary 0.15 -> 0
- **bar**: `barWidth: 32`, `itemStyle.borderRadius: [10,10,0,0]`
- **pie 环形**: `radius: ['40%','65%']`, `padAngle: 8`, `label: { show: false }`
- **pie 实心**: `radius: '60%'`, 内部 label >10% 显示百分比，白色粗体
- **radar**: splitArea 交替 primary 2%/4%，splitLine/axisLine 色 `hsl(0,0%,93%)`
- **scatter**: `symbolSize: 12`, `borderWidth: 2`, `borderColor: white`, shadow
- **水平 bar**: yAxis category，`barWidth: 32`，`borderRadius: [0,10,10,0]`

### 暗色区 Tooltip 变体

背景 primary 色，边框 white/20，圆角 8px，文字白色

### 图表容器

容器 `bg-gray-50/50 border border-gray-100 shadow-sm rounded-2xl p-10`
高度 `h-[400px]` / `h-[380px]` / `h-[450px]`，网格 `grid-cols-1 md:grid-cols-2 gap-6`

---

## 字体排版

```css
font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Inter, PingFang SC, Microsoft YaHei, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| H1 Hero | `text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter` | text (白色 on 深底) |
| H1 大数字 | `text-8xl font-black tracking-tighter text-nebula-crimson` | primary |
| H2 章节标题 | `text-5xl font-black tracking-tight` | text |
| H3 卡片标题 | `text-2xl font-black tracking-tight` | text |
| H4 数据值 | `text-5xl font-black tracking-tight` / `text-4xl` | text / primary |
| 章节英文标签 | `text-xs font-black tracking-widest uppercase text-nebula-crimson` | primary |
| 指标标签 | `text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400` | textMuted |
| 正文描述 | `text-lg leading-relaxed text-gray-400` | textMuted |
| 脚注 | `text-[10px] uppercase font-black tracking-widest` | textMuted |

---

## 页面结构

> 明暗交替全幅区块节奏 — 浅色/白底 -> 深红 -> 浅色 -> 极深黑

```
Hero Section（h-screen bg-[hsl(0,100%,5%)]，居中超大标题 + 引言）
  -> Overview Section（bg-white py-32，章节标题 + 4列指标卡 + 图表侧栏3列）
  -> Business Section（bg-nebula-crimson py-32，饼图 + 数据卡 + 白色面板）
  -> Innovation Section（bg-gray-50 py-32，章节标题 + 3列产品卡片）
  -> Team Section（bg-white py-32，左右2列布局）
  -> Outlook Section（bg-gray-950 py-32，居中标题 + 4列目标卡 + 战略布局）
  -> Footer（bg-[hsl(0,0%,2%)] py-20，Logo + 发布信息）
```

容器 `max-w-7xl mx-auto`，水平内边距 `px-8 md:px-24`，垂直 `py-32`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区块纵向 | `py-32` (128px) |
| 章节标题到内容 | `mb-20` (80px) |
| 网格间隙 | `gap-6` (24px) / `gap-10`~`gap-24` (大区块) |
| 卡片内边距 | `p-8` ~ `p-12` |
| 容器最大宽 | `max-w-7xl` |

### 圆角与阴影

> Design DNA: Soft Blocks — 多级圆角递进 + 柔和阴影层级

| 元素 | 圆角 | 阴影 |
|-----|------|------|
| Badge/图标容器 | `rounded-lg` (8px) | — |
| 标准卡片 | `rounded-xl` (12px) | `shadow-sm` ~ `shadow-lg` |
| 中型面板 | `rounded-2xl` (16px) | `shadow-sm` |
| 大型面板 | `rounded-3xl` (24px) | `shadow-lg` |
| 超大容器 | `rounded-[2rem]` (32px) | `shadow-2xl` |
| 进度条 | `rounded-full` | — |

### 阴影体系

| 层级 | 值 | 用途 |
|------|-----|------|
| 默认态 | `shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]` | 指标卡片 |
| Hover 态 | `shadow-[0_20px_60px_-15px_rgba(139,0,0,0.2)]` | 悬停(带品牌色) |
| 暗色区面板 | `shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]` | 暗色区白色面板 |

### 边框

标准 `border border-gray-100`（浅色区），暗色区 `border border-white/10`
左侧强调线 `border-l-4 border-nebula-crimson`，底部 `border-b-[12px]` hover 变 primary

### Hover 交互

| 模式 | 效果 |
|-----|-----|
| 卡片上浮 | `hover:-translate-y-4 transition-all duration-500` |
| 底部线展开 | `w-0 -> w-full transition-all duration-500` |
| 图标放大 | `hover:scale-110 transition-transform duration-500` |
| 图标颜色翻转 | `bg-red-50 text-crimson -> bg-crimson text-white` |
| 边框变色 | `border-gray-100 -> border-nebula-crimson duration-500` |
| 玻璃态亮度 | `bg-white/5 -> bg-white/10 duration-300` |

### 背景装饰

- Hero: `bg-[hsl(0,100%,5%)]` + 径向渐变(primary 40%/30%) + 网格线(white/5) + 碳纤维纹理(3%)
- 暗色区: 倾斜色块 primary skew-x-12 opacity-10 blur-3xl + 冷蓝对角色块
- 深红区: 点阵纹理 `radial-gradient(circle at 2px 2px, white 1px, transparent 0)` 40px间距
- 浅色区: `w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50` 光斑

---

## 组件规范

### 指标卡片 (MetricCard)

容器 `bg-white p-8 rounded-xl border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]`
Hover: `shadow-[0_20px_60px_-15px_rgba(139,0,0,0.2)]` + 底部 primary 线 w-0->w-full
图标容器 `p-2.5 bg-red-50 text-nebula-crimson rounded-lg`，hover 翻转
标签 `text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400`
数值 `text-4xl font-black text-gray-900 tracking-tight`
背景装饰图标 opacity-[0.03]，hover 变 0.07 + scale-110

### 章节标题组件

装饰线 `h-0.5 w-8 bg-nebula-crimson` + 英文标签 primary 色 font-black tracking-widest uppercase
中文标题 `text-5xl font-black tracking-tight mb-4`
描述文字 `text-gray-400 text-lg leading-relaxed max-w-2xl`

### 暗色区目标卡片

容器 `bg-white/5 border border-white/10 p-10 rounded-2xl backdrop-blur-md hover:bg-white/10`
数值 `text-5xl font-black tracking-tighter text-white`
增长标签 `bg-red-900/40 text-red-200 rounded-full border border-red-800/30`

### 产品卡片

容器 `bg-white p-12 rounded-3xl shadow-lg border-b-[12px] border-gray-100 hover:border-nebula-crimson hover:-translate-y-4 duration-500`
图标框 `w-16 h-16 rounded-2xl shadow-lg hover:scale-110`

### 左侧强调数据条

`border-l-4 border-nebula-crimson pl-8 py-2 hover:bg-red-50/30`
数值 `text-5xl font-black text-nebula-crimson tracking-tight`

### 进度条

轨道 `w-full bg-gray-100 h-2.5 rounded-full p-0.5`
填充 `bg-gradient-to-r from-red-900 to-nebula-crimson rounded-full duration-[1.5s]`

### Footer

`py-20 px-8 bg-[hsl(0,0%,2%)] border-t border-white/5`
Logo `w-12 h-12 bg-white text-black font-black rounded-xl`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 指标卡 4 列，图表+侧栏 3 列(2:1)，产品卡 3 列 |
| >= 768px (md) | 指标卡 2 列，Hero 标题 text-9xl，px-24 |
| < 768px | 单列堆叠，Hero 标题 text-6xl，px-8 |

---

## 风格建议

- **超大字重 + 紧凑字距排版**：标题 `font-black`(900) + `tracking-tighter`，搭配全大写英文辅助标签形成中英双语层次分明的权威感排版
- **Primary / Accent 分工明确**：primary（深红）仅用于品牌区块、强调数值、进度条和 hover 态；accent（浅灰）用于图表面板底色和层次区分
- **明暗交替全幅区块节奏**：浅色 -> 深红 -> 浅色 -> 极深黑交替，每个区块 py-32，通过色彩对比和背景纹理创造视觉呼吸感
