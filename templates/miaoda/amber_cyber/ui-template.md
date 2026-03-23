# Amber Cyber · 琥珀科技 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 深空科技控制台 — 近乎纯黑背景搭配橙色高亮，航天器仪表盘般的精密感
- **Design Style**: Frosted Glass 毛玻璃 x Dot Matrix 点阵 — 玻璃质感暗色卡片 + 橙色发光点缀 + 全大写微型标签
- **Visual Signature**:
  1. Glass-card 暗色玻璃卡片体系，单一深色底色 + 1px 边框
  2. 橙色辉光(glow-orange)点缀：发光阴影、状态指示灯
  3. Orbitron 科技字体数值 + Inter 正文，强烈大小对比
  4. 全大写 tracking-widest 微型标签 (10px/9px)
  5. 碳纤维纹理 + 侧边装饰线
- **Emotional Tone**: 冷静、专业、高度可控 — 数据驱动"指挥中心"

---

## 配色方案

**方案**: 自定义（Deep Space + Amber Glow）
**色彩关系**: 四级暗度背景 + 橙色单一高亮
**主题**: 深色

> **配色设计理由**：极深暗底色营造太空控制台沉浸感，橙色作为唯一高饱和色通过辉光效果(glow)传递能量感，四级深度递进确保空间层次。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(240 19% 6%) | 全局页面底色 |
| surface | hsl(240 13% 10%) | glass-card 容器背景 |
| header | hsl(240 15% 14%) | 内嵌面板、输入框背景 |
| text | hsl(210 40% 90%) | 标题、数值、主体文字 |
| textMuted | hsl(215 16% 47%) | 标签、说明、次要信息 |
| primary | hsl(25 95% 53%) | 主交互色：高亮、活跃指示器、核心数据强调 |
| accent | hsl(240 10% 17%) | 弱强调色：按钮底色、仪表盘空白扇区 |
| border | hsl(240 10% 18%) | 卡片边框、分割线、网格线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(25 95% 53%)`：核心数据高亮、活跃指示灯、图表主色、辉光效果，视觉权重最高
**Accent（弱强调色）** — `hsl(240 10% 17%)`：按钮底色、hover 态、仪表盘空白区，权重低于 primary

### 衍生规则

- **四级暗度递进**：bg(6%) -> surface(10%) -> header(14%) -> accent/button(17%)，每级仅微增亮度
- **辉光系统**：`box-shadow: 0 0 15px rgba(249,115,22,0.2)` 卡片 / `0 0 8px` 指示灯
- **文字辉光**：`filter: drop-shadow(0 0 10px rgba(255,255,255,0.2))` 大数字
- **次要色**：blue-500 hsl(217 91% 60%) 次要指标；emerald-500 hsl(160 84% 39%) 正常状态

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 次要指标 | hsl(217 91% 60%) | blue-500 第二数据系列 |
| 正常状态 | hsl(160 84% 39%) | emerald-500 状态灯 |
| 按钮底色 | hsl(240 10% 17%) | 同 accent |
| 按钮 hover | hsl(240 10% 22%) | 微亮按钮悬停 |

### 发光效果 CSS

```css
.glow-orange { box-shadow: 0 0 15px rgba(249,115,22,0.2); }
```

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(25,95%,53%)', 'hsl(217,91%,60%)', 'hsl(160,84%,39%)', 'hsl(271,81%,56%)', 'hsl(48,96%,53%)', 'hsl(0,84%,60%)', 'hsl(187,92%,35%)', 'hsl(330,81%,60%)'];
//               橙(主)              蓝                  翠绿                紫                  黄                  红                  青                  粉
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, PingFang SC, sans-serif', color: 'hsl(210,40%,90%)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { lineStyle: { color: 'hsl(240,10%,18%)' } }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,47%)', fontSize: 10, fontFamily: 'Inter' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,47%)', fontSize: 10, fontFamily: 'Inter' },
    splitLine: { lineStyle: { color: 'hsl(240,10%,18%)', type: 'solid' } }
  },
  tooltip: {
    backgroundColor: 'hsl(240,13%,14%)', borderColor: 'hsl(215,20%,30%)', borderWidth: 1,
    borderRadius: 8, padding: 12, textStyle: { fontFamily: 'Inter', color: 'hsl(0,0%,100%)', fontSize: 12 },
    axisPointer: { type: 'line', lineStyle: { color: 'hsl(0,0%,100%)', width: 1 } }
  },
  legend: {
    textStyle: { fontFamily: 'Inter', color: 'hsl(215,16%,47%)', fontSize: 10 },
    itemGap: 16, icon: 'circle', itemWidth: 8, itemHeight: 8
  }
};
```

### 各图表类型默认 series 样式

- **line/area**: `smooth: true`, `lineStyle: { width: 4, color: primary }`, `symbolSize: 10`, `borderWidth: 2 borderColor: white`; 面积渐变 primary 0.5 -> 0.05
- **radar**: areaStyle primary 0.6，splitArea 交替 surface/header，splitLine/axisLine border 色
- **pie 半环仪表盘**: `radius: ['65%','85%']`, `startAngle: 180, endAngle: 0`, 数据 primary + accent
- **pie 环形**: `radius: ['45%','60%']`, `padAngle: 2`
- **scatter**: `symbolSize: 10`, `borderWidth: 2`, `borderColor: white`

### 图表容器

外层 `glass-card p-6`（bg-surface border-border rounded-xl）
主图 `h-[460px]`，辅图 `h-[230px]` / `min-h-[300px]`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Orbitron:wght@400..700&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 正文/UI | `Inter, PingFang SC, sans-serif` |
| 数据/编号 | `Orbitron, sans-serif` (.tech-font) |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| Hero 数值 | `text-5xl font-bold tech-font tracking-tighter` | text |
| 仪表盘大字 | `text-4xl font-bold tech-font` + drop-shadow | white |
| 卡片标题 | `text-xl font-bold tech-font tracking-tight` | text |
| 指标数值 | `text-lg font-bold tech-font tracking-tight` | text |
| Section 标题 | `text-xs font-bold tracking-wide uppercase` | slate-300 |
| 标签 | `text-[10px] text-slate-500 uppercase tracking-widest` | textMuted |
| 微标签 | `text-[9px] uppercase tracking-wider font-medium` | textMuted |
| Footer | `text-[10px] uppercase tracking-widest` | textMuted |

---

## 页面结构

> 科技控制台 — 12列网格仪表盘布局

```
12-column grid, max-w-[1600px] mx-auto p-6 gap-6
  +-- col-span-8 (lg): 主图表卡片(460px) + 底部双卡(指标详情 + 雷达图)
  +-- col-span-4 (lg): 特征卡片(标题+标签+展示面板+仪表盘+统计条)
                      + 日志/操作列表卡片
  +-- col-span-12: Footer 状态栏
```

主栅格 `grid grid-cols-12 gap-6`
左栏 `col-span-12 lg:col-span-8`，右栏 `col-span-12 lg:col-span-4`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 页面/卡片内边距 | `p-6` (24px) |
| 卡片间距 | `gap-6` (24px) |
| Section 标题下方 | `mb-4` (16px) |
| 网格指标间距 | `gap-x-8 gap-y-6` |
| 容器最大宽 | `max-w-[1600px]` |

### 圆角与阴影

> Design DNA: Frosted Glass — 统一 12px 圆角 + 辉光阴影

| 元素 | 圆角 | 阴影 |
|-----|------|------|
| Glass-card | `rounded-xl` (12px) | — |
| 内嵌面板 | `rounded-xl` (12px) | — |
| 按钮 (pill) | `rounded-full` | — |
| 橙色辉光卡片 | `rounded-xl` | `0 0 15px rgba(249,115,22,0.2)` |
| 电源按钮 | `rounded-full` | `shadow-lg` + hover `shadow-orange-500/30` |
| 状态灯 | `rounded-full` | `0 0 8px` glow |

### Glass Card CSS

```css
.glass-card { background: hsl(240 13% 10%); border: 1px solid hsl(240 10% 18%); border-radius: 12px; }
```

### 自定义滚动条

track `bg-bg`，thumb `bg-border`，border-radius 10px，width 4px

---

## 组件规范

### Glass Card

`bg-[hsl(240,13%,10%)] border border-[hsl(240,10%,18%)] rounded-xl p-6`

### Metric Row

布局 `flex items-center gap-4 mb-5`
图标容器 `w-10 h-10 rounded-lg` accent色 bg-opacity-10
数值 `text-lg font-bold tracking-tight tech-font`

### 标签徽章

`text-[10px] px-2 py-0.5 border border-orange-500/50 text-orange-500 rounded uppercase tracking-widest font-bold`

### 按钮 Pill

`text-[10px] bg-accent px-3 py-1.5 rounded-full text-slate-300 hover:bg-[hsl(240,10%,22%)] border border-transparent hover:border-[hsl(240,10%,23%)]`

### 圆形电源按钮

`w-12 h-12 rounded-full bg-accent border border-[hsl(240,10%,22%)] text-orange-500 shadow-lg hover:shadow-orange-500/30`
内嵌脉冲光环 `animate-ping bg-orange-500/5`

### 列表项

`flex justify-between p-3 rounded-lg hover:bg-header border border-transparent hover:border-border`

### 内嵌展示面板

`bg-header rounded-xl border border-border` + 可选碳纤维纹理 opacity-10 + 侧边装饰线 `w-0.5 bg-orange-500/20`

### 状态指示灯

`w-2 h-2 rounded-full` emerald-500(正常) / orange-500(活跃) + glow shadow

### Footer 状态栏

`col-span-12 flex justify-between px-4 py-5 border-t border-border bg-bg/50 backdrop-blur-sm rounded-lg`
左侧状态灯+文本，右侧 tech-font uppercase tracking-widest

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 左栏 col-span-8，右栏 col-span-4 |
| >= 768px (md) | 底部双卡 grid-cols-2 |
| < 768px | 全部 col-span-12，底部 grid-cols-1 |

---

## 风格建议

- **橙色克制点缀**：primary 仅用于核心数据、活跃指示器和交互焦点，通过 glow 传递能量感而非铺满色块
- **全大写微型标签节奏**：`uppercase tracking-widest text-[10px]` + Orbitron 大数值形成强烈大小对比
- **四级深色递进**：bg(6%) -> surface(10%) -> header(14%) -> accent(17%)，每级微增亮度，不破坏沉浸感
- **Primary / Accent 分工**：primary（橙）专用高亮焦点，accent（深灰）用于按钮底色和空间层次
