# Blueprint · 蓝图风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Corporate Blueprint — 瑞士国际主义排版 x 浅灰底 x 深蓝主色企业报告风
- **Visual Signature**:
  1. 深蓝渐变 Header（#001d4a → #0033a0 → #004b93），斜切装饰几何块
  2. 白色卡片 + 3px 蓝色顶边线，零圆角
  3. 超小号全大写加粗标签（9-11px, tracking-[0.15em], uppercase）
  4. 极细边框 0.5px，精密仪表感
  5. 蓝色滚动条 + 整体金融企业气质
- **Emotional Tone**: 专业、权威、精密、可信赖
- **Design Style**: Grid 网格 x Editorial 经典排版

---

## 配色方案

**方案**: Corporate Navy Blue on Light Grey
**色彩关系**: 浅灰页面底 + 白色卡片 + 深蓝主色强调
**主题**: 浅色

> **配色设计理由**：浅灰底模拟企业报告纸张质感，深蓝主色传递权威可信，3px 蓝色顶边线贯穿所有卡片形成统一识别。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(207 26% 96%) | 页面背景，浅灰 |
| surface | hsl(0 0% 100%) | 卡片背景，白色 |
| header | hsl(220 100% 31%) | Header 渐变中间色、卡片顶边线 |
| text | hsl(0 0% 10%) | 主要文字 |
| textMuted | hsl(215 16% 65%) | 次要文字、标签、坐标轴文字 |
| primary | hsl(220 100% 31%) | 主交互色：标题色、顶边线、图表主色 |
| accent | hsl(210 40% 98%) | 弱强调色：次级背景、侧栏、tooltip axisPointer |
| border | hsl(214 32% 91%) | 极细边框 0.5px、分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(220 100% 31%)`：卡片顶边线、标题色、图表主色，视觉权重最高
**Accent（弱强调色）** — `hsl(210 40% 98%)`：次级背景面板、hover 状态底色，权重低于 primary

### 衍生规则

- **bg → surface**：bg 浅灰 96% → surface 纯白，卡片通过 shadow-md + 顶边线区分
- **primary 色阶**：深蓝 `hsl(220 100% 31%)` → 亮蓝 `hsl(220 100% 50%)` → 中蓝 `hsl(220 100% 65%)` → 浅蓝 `hsl(220 100% 80%)` → 极浅蓝 `hsl(220 100% 90%)`
- **Header 渐变**：从 `hsl(220 100% 15%)` via primary 到 `hsl(210 100% 29%)`
- **border 极细**：0.5px 精密线，介于 bg 和 textMuted 之间

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/成功 | hsl(160 84% 39%) | emerald-500 |
| 正向背景 | hsl(152 81% 96%) | emerald-50 |
| 负向/高危 | hsl(0 84% 60%) | red-500 |
| 负向背景 | hsl(0 86% 97%) | red-50 |
| 警告/中危 | hsl(38 92% 50%) | amber-500 |
| 警告背景 | hsl(48 100% 96%) | amber-50 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(220,100%,31%)', 'hsl(220,100%,50%)', 'hsl(220,100%,65%)', 'hsl(220,100%,80%)', 'hsl(220,100%,90%)'];
//               深蓝                  亮蓝                  中蓝                  浅蓝                  极浅蓝
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, -apple-system, sans-serif', color: 'hsl(215,16%,65%)' },
  grid: { containLabel: true, left: 0, right: 0, top: 20, bottom: 16 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,65%)', fontSize: 9, fontWeight: 700, fontFamily: 'Inter', margin: 10 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false },
    splitLine: { lineStyle: { color: 'hsl(214,32%,91%)', type: 'solid' } }
  },
  tooltip: {
    trigger: 'axis', backgroundColor: 'hsl(0,0%,100%)', borderColor: 'hsl(214,32%,91%)',
    borderWidth: 1, borderRadius: 0, padding: 12,
    textStyle: { fontFamily: 'Inter', color: 'hsl(0,0%,10%)', fontSize: 11, fontWeight: 700 },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'hsl(210,40%,98%)' } }
  },
  legend: {
    textStyle: { fontFamily: 'Inter', color: 'hsl(215,16%,65%)', fontSize: 9, fontWeight: 700 },
    icon: 'rect', itemWidth: 10, itemHeight: 6, itemGap: 12
  }
};
```

### 各图表类型默认 series 样式

- **bar**: `barWidth: 30`, `itemStyle.borderRadius: [2,2,0,0]`（顶部微圆角）
- **line**: `smooth: false`, `lineStyle.width: 2`, `symbol: 'circle'`, `symbolSize: 6`
- **pie 实心**: `radius: '60%'`, 内部 label 白色 fontWeight bold
- **pie 环形**: `radius: ['40%','60%']`, `padAngle: 2`, `label: { show: false }`
- **radar**: splitArea 交替 `[surface, accent]`, axisLine/splitLine 用 border 色
- **scatter**: `symbolSize: 8`, borderWidth 1 borderColor surface

### 图表容器

容器 `report-card p-6 shadow-md`（白卡 + 蓝顶边线），零圆角
高度 `h-[180px]` 紧凑 / `h-[240px]` 标准

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Inter, -apple-system, sans-serif` |
| 等宽数值 | `font-mono`（表格对齐列） |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面主标题 | `text-4xl md:text-5xl font-extrabold tracking-tight` | white |
| 页面副标题 | `text-sm font-medium tracking-wide` | blue-200/70 |
| Section 编号 | `text-[11px] font-black uppercase tracking-[0.15em]` | primary |
| Section 副标题 | `text-[10px] font-medium` | textMuted |
| KPI 数值 | `text-xl font-bold` | hsl(216 13% 33%) |
| KPI 标签 | `text-[9px] font-black uppercase tracking-tight` | textMuted |
| 表头 | `text-[9px] font-black uppercase` | textMuted |
| 表格数据 | `text-xs font-bold` / `text-[11px] font-medium` | text / hsl(215 14% 34%) |
| 正文描述 | `text-[11px] font-medium leading-relaxed` | hsl(215 14% 34%) |
| Footer | `text-[10px] font-bold uppercase tracking-widest` | hsl(215 14% 78%) |

---

## 页面结构

> 企业报告式布局 — 深蓝渐变 Header + 白卡片网格 + 编号 Section。

```
Gradient Header（深蓝渐变 + 品牌标识 + 主标题 + 元信息标签）
  → Overview Row（12 列: 4 列背景卡 | 8 列 KPI + 柱状图）
  → Full-width Section（8 列表格 | 4 列辅助面板）
  → 双列 Section（讨论列表 | 风险评估）
  → Bottom Row（4 列结论卡 | 8 列里程碑时间线）
  → Footer
```

Header: `bg-gradient-to-br from-[hsl(220,100%,15%)] via-[hsl(220,100%,31%)] to-[hsl(210,100%,29%)]`
斜切装饰 `absolute bg-white/5 skew-x-[-20deg]`
内容区 `max-w-7xl mx-auto`，首行 `-mt-10` 重叠 Header

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| Section 间距 | `space-y-8` |
| 容器最大宽 | `max-w-7xl` |
| 容器内边距 | `px-8` |
| 卡片内边距 | `p-6` |
| 网格间距 | `gap-8` / `gap-10` |
| Header 首行重叠 | `-mt-10` |
| 底部留白 | `pb-20` |

### 圆角与阴影

> Design DNA: Grid — `sharp (0px)` + `shadow-md`

所有卡片零圆角，`shadow-md`
柱状图顶部 `radius [2,2,0,0]`，状态标签 `rounded-sm`
时间线节点 `rounded-full`，Tooltip `borderRadius: 0`

### 边框

- 卡片顶边线: `border-top: 3px solid primary`（`.report-card`）
- 极细分隔线: `.thin-border` = `border: 0.5px solid border色`
- Header 底边: `border-b border-blue-900`
- 列表左侧指示: `border-l-2 border-slate-100`
- 色条指示器: `w-1 h-3` 色块条

### Hover 交互

| 模式 | 效果 |
|-----|-----|
| 行高亮 | `hover:bg-slate-50 transition-colors` |
| 时间线节点 | `group-hover:border-primary transition-colors` |

### 滚动条

轨道 `#f1f1f1`，滑块 primary 色，宽 6px，`border-radius: 3px`

---

## 组件规范

### 报告卡片 (ReportCard)

`.report-card` → `bg-white border-top: 3px solid primary shadow-md p-6`
顶部 SectionHeader（编号 + 副标题），内容自由排列

### Section Header

标题 `text-[11px] font-black text-primary uppercase tracking-[0.15em] mb-1`
副标题 `text-[10px] text-textMuted font-medium`，格式 `01. SECTION NAME`

### KPI 指标块

`p-4 border-r thin-border last:border-r-0`
标签 `text-[9px] font-black uppercase mb-2`，数值 `text-xl font-bold`
网格 `grid-cols-2 md:grid-cols-5 border-y thin-border`

### 数据表格

表头 `border-b thin-border text-[9px] font-black uppercase`
行 `divide-y thin-border hover:bg-slate-50`
主列 `text-xs font-bold text-primary`，数值列 `text-right font-bold`

### 结论高亮卡 (Verdict Card)

`report-card p-6 shadow-md bg-primary text-white`
主结论 `text-3xl font-black`，待办项 `CheckCircle2 text-emerald-400`

### 里程碑时间线

轴线 `h-[1px] bg-slate-100`，节点 `w-10 h-10 rounded-full border thin-border`
内圆 `w-2 h-2 rounded-full bg-primary`
Hover: `group-hover:border-primary transition-colors`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 12 列网格: 4+8 分栏, 双列并排, Header 左右分栏 |
| >= 768px (md) | KPI 5 列保持, Header 缩小 text-4xl, 表格横向滚动 |
| < 768px | 全部垂直堆叠, KPI 2 列, Header 纵向排列 |

---

## 风格建议

- **卡片顶边线是核心签名**：3px primary 色贯穿所有白卡片，扩展新组件延续此模式
- **文字层级通过极端对比**：9px 全大写标签 vs 3xl-5xl 主标题
- **蓝色单色系图表**：仅使用深蓝到极浅蓝 5 级渐变序列，不引入其他色相
- **极细边框 + 轻阴影**：0.5px + shadow-md 传达精密感
- **Primary / Accent 分工**：primary（深蓝）标题与交互焦点，accent（极浅灰）次级背景面板
