# Handwritten Sketch · 手绘草稿风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Handwritten Sketch — 手绘白板笔记 x 便利贴质感 x 有机不规则形态
- **Visual Signature**:
  1. 有机不规则圆角（wobbly border-radius），每张卡片形态各异
  2. 粗黑墨线边框（3px）+ 硬阴影（hard shadow, 无模糊纯偏移）
  3. 手写体排版（Patrick Hand 正文 + Kalam 标题）
  4. 纸张纹理背景（米黄底 + 圆点网格 24px 间距）
  5. 物理装饰：透明胶带、图钉、便利贴 + 微旋转（+/-1~2deg）
- **Emotional Tone**: 亲和、创意、手工感、轻松自由
- **Design Style**: Warm Natural 自然暖调 x Double Border 双层边框

---

## 配色方案

**方案**: Paper & Ink 纸笔手绘色系
**色彩关系**: 暖白纸张底 + 深墨黑主调 + 标记笔红蓝点缀 + 便利贴黄
**主题**: 浅色

> **配色设计理由**：米黄纸张底色营造手工质感，墨黑粗线边框模拟笔迹，标记笔红作为视觉焦点色，钢笔蓝作为信息辅助色。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(40 60% 98%) | 页面纸张背景，米黄 |
| surface | hsl(0 0% 100%) | 卡片白色底 |
| header | hsl(0 0% 18%) | 黑板反色区块背景 |
| text | hsl(0 0% 18%) | 墨水黑，主要文字与边框 |
| textMuted | hsl(0 0% 18% / 0.6) | 次要文字、描述文本 |
| primary | hsl(0 100% 65%) | 主交互色：标记笔红，强调数值、图钉 |
| accent | hsl(216 56% 40%) | 弱强调色：钢笔蓝，链接、标签 |
| border | hsl(0 0% 18%) | 墨黑粗线边框（3px） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(0 100% 65%)`：标记笔红，KPI 数值、图钉、重点标记，视觉权重最高
**Accent（弱强调色）** — `hsl(216 56% 40%)`：钢笔蓝，链接、工时数值、辅助标签，权重低于 primary

### 衍生规则

- **bg**：hsl(40 60% 98%) 米黄，搭配圆点网格纹理模拟纸张
- **surface → bg**：白色卡片悬浮于米黄底上，通过 3px 墨线 + 硬阴影区分
- **header**：与 text 同色 hsl(0 0% 18%)，用于黑板反色区块
- **便利贴黄**：`hsl(60 100% 84%)` — Tooltip 背景、高亮卡片
- **muted 灰**：`hsl(30 16% 87%)` — 网格点、分隔线、灰底标签

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 便利贴 | hsl(60 100% 84%) | postit-yellow 高亮卡片/Tooltip |
| 正向/成功 | hsl(142 72% 29%) | green-600 |
| 高亮文本底 | hsl(55 97% 88%) | yellow-100 行内标记 |
| 粉笔白 | hsl(0 0% 100%) | 黑板区块文字 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(0,100%,65%)', 'hsl(30,16%,87%)', 'hsl(216,56%,40%)', 'hsl(60,100%,84%)'];
//               标记笔红             墨水灰               钢笔蓝               便利贴黄
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Patrick Hand, Kalam, cursive', color: 'hsla(0,0%,18%,0.6)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { lineStyle: { color: 'hsl(30,16%,87%)' } }, axisTick: { show: false },
    axisLabel: { color: 'hsla(0,0%,18%,0.6)', fontSize: 14, fontFamily: 'Patrick Hand', margin: 10 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsla(0,0%,18%,0.6)', fontSize: 14, fontFamily: 'Patrick Hand' },
    splitLine: { lineStyle: { color: 'hsl(30,16%,87%)', type: 'dashed' } }
  },
  tooltip: {
    trigger: 'axis', backgroundColor: 'hsl(60,100%,84%)', borderColor: 'hsl(0,0%,18%)',
    borderWidth: 2, borderRadius: 10, padding: 12, shadowBlur: 0,
    shadowOffsetX: 4, shadowOffsetY: 4, shadowColor: 'hsl(0,0%,18%)',
    textStyle: { fontFamily: 'Patrick Hand', color: 'hsl(0,0%,18%)', fontSize: 14 }
  },
  legend: {
    textStyle: { fontFamily: 'Patrick Hand', color: 'hsl(0,0%,18%)', fontSize: 14 },
    itemGap: 16, icon: 'roundRect', itemWidth: 14, itemHeight: 10
  }
};
```

### 各图表类型默认 series 样式

- **line**: `smooth: true`, `lineStyle.width: 2`, `symbol: 'circle'`, `symbolSize: 6`, `areaStyle.opacity: 0.08`
- **bar**: `barWidth: 32`, `itemStyle.borderRadius: [4,10,10,4]`（手绘不对称圆角）, `borderColor: text`, `borderWidth: 2`
- **pie 环形**: `radius: ['40%','65%']`, `borderColor: text`, `borderWidth: 2`, `borderRadius: 4`
- **radar**: splitArea 交替透明 muted, axisLine/splitLine muted 虚线
- **scatter**: `symbolSize: 10`, `borderColor: text`, `borderWidth: 2`, `opacity: 0.85`

### 图表容器

`border-t-2 border-dashed border-ink/20`，透明背景继承卡片底色
迷你内嵌图表高度 `h-24`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 标题 / 强调 | `Kalam, cursive` (font-marker) |
| 正文 / 描述 | `Patrick Hand, cursive` (font-hand) |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面主标题 | `text-3xl font-marker font-bold tracking-wide` | text |
| Section 标题 | `text-4xl font-marker font-bold underline decoration-wavy` | text，波浪线交替用 primary/accent |
| 卡片标题 | `text-2xl font-marker font-bold` | text |
| KPI 数值 | `text-5xl font-marker font-bold` | primary |
| KPI 旧值 | `text-lg font-hand line-through decoration-2` | text/40 |
| 正文描述 | `text-lg font-hand leading-relaxed` | text/70 |
| 标签/分类 | `text-sm font-bold uppercase tracking-widest` | text/50 |

---

## 页面结构

> 手绘白板风格 — 单页纵向滚动，模拟白板/牛皮纸上自由排列的笔记卡片。

```
Sticky Header（胶带装饰, wobbly 卡片, logo + 标题 + 状态标签）
  → Section 1: 背景与目标（痛点草稿卡 + KPI 指标行 grid 4 列）
  → Section 2: 功能规格（功能卡片 grid 3 列）
  → Section 3: 交付路线图（阶段卡片纵向堆叠 + 垂直连接线）
  → Section 4: 会议讨论（黑板反色区块）
  → Footer（引言 + 保密声明）
```

Header: `sticky top-4 z-50`，白色 WobblyCard + 胶带装饰，`rotate(-1deg)`
容器 `max-w-5xl`，Section 间距 `space-y-20`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| Section 间距 | `space-y-20` |
| 组件间距 | `gap-6~gap-8` / 大 `gap-12` |
| 容器最大宽 | `max-w-5xl` |
| 容器内边距 | `px-6` |
| 卡片内边距 | `p-6` / `p-8 md:p-12` |

### 圆角（Wobbly 系统）

| 元素 | 值 |
|-----|---|
| WobblyCard | 有机不规则 border-radius，4 组预设轮换 |
| 预设 1 | `255px 15px 225px 15px / 15px 225px 15px 255px` |
| 预设 2 | `20px 225px 15px 255px / 255px 15px 225px 15px` |
| 预设 3 | `15px 225px 15px 255px / 255px 15px 225px 15px` |
| 预设 4 | `225px 15px 225px 15px / 15px 225px 15px 255px` |
| 圆形徽章 | `rounded-full` |
| 便签 | `rounded-lg` |

### 硬阴影系统

| 级别 | 值 |
|------|---|
| 标准 | `4px 4px 0px 0px hsl(0,0%,18%)` |
| 小 | `2px 2px 0px 0px hsl(0,0%,18%)` |
| 超大 | `8px 8px 0px 0px hsl(0,0%,18%)` |

### 边框

- 全局卡片: `border-[3px] border-ink`
- 卡片内分区: `border-b-2 border-dashed border-ink`
- 列表项: `border-2 border-ink`
- 页脚: `border-t-4 border-ink border-dashed`
- 便签: `border-2 border-primary border-dashed` / `border-2 border-ink border-dashed`

### Hover 交互

| 模式 | 效果 |
|-----|-----|
| KPI 上浮 | `hover:-translate-y-1 hover:shadow-hard-xl transition-all duration-300` |
| 列表右移 | `hover:translate-x-1 hover:shadow-none hover:border-primary` |
| 标签旋转 | `hover:-rotate-2 transition-transform` |
| 图标缩放 | `group-hover:rotate-12 / scale-110 transition-transform` |

### 装饰元素

| 装饰 | 实现 | 场景 |
|-----|-----|-----|
| 透明胶带 | `absolute -top-3 w-24 h-6 bg-gray-400/30 rotate-1 backdrop-blur-sm` | Header, 痛点卡片 |
| 图钉 | `absolute -top-3 w-4 h-4 rounded-full bg-primary border-2 border-ink` | KPI 卡片 |
| 别针 | `lucide Pin fill-primary rotate-12` | 便签角落 |
| 微旋转 | `rotate(+/-0.5~2deg)` index 奇偶交替 | 所有卡片 |
| 圆点背景 | `radial-gradient(hsl(30,16%,87%) 1px, transparent 1px) 24px 24px` | body |
| 波浪下划线 | `underline decoration-wavy decoration-2 underline-offset-4` | Section 标题 |

### 动画

- 选中色: `selection:bg-primary selection:text-white`
- 滚动条: track bg, thumb text, 3px border bg, `border-radius: 20px`

---

## 组件规范

### WobblyCard（核心卡片）

`relative border-[3px] border-ink transition-transform`，wobbly 圆角按 index 轮换
阴影 `shadow-hard`，旋转 `rotate(Ndeg)` 通过 prop 控制
变体: white(默认) / yellow(便利贴) / black(黑板) / blue(蓝色强调)
装饰: tape(胶带) / tack(图钉) / none

### KPI 指标卡片

WobblyCard `p-6 h-full flex flex-col justify-between`
Hover `hover:-translate-y-1 hover:shadow-hard-xl duration-300`
数值 `text-5xl font-marker font-bold text-primary`
迷你条形图 `border-t-2 border-dashed` 分隔

### 功能卡片

WobblyCard `overflow-hidden`，头部 `bg-muted/30 p-4 border-b-2 border-ink border-dashed`
关键词高亮 `bg-yellow-100 px-1`
标签 `px-3 py-1 bg-white border-2 border-ink wobbly hover:-rotate-2`

### 路线图阶段卡片

WobblyCard，垂直连接线 `absolute left-8 top-full h-8 w-1 bg-ink`
优先级标签 `rounded-full border-2 border-ink shadow-hard-sm`
P0: `bg-primary text-white` / P1: `bg-postit-yellow text-ink`

### 黑板反色区块

WobblyCard variant=black `p-8 md:p-12 rotate(1deg)`
圆点 SVG pattern 叠加 opacity 0.10
标题 `text-3xl font-marker text-white border-b-2 border-white/30`
关键词 `text-postit-yellow decoration-wavy underline`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | KPI 4 列, 功能卡 3 列 |
| >= 768px (md) | KPI 2 列, 功能卡 3 列, Header 水平, 黑板双列, 路线图头水平 |
| < 768px | 全部单列, Header 垂直, 黑板单列, 卡片内边距缩小 |

---

## 风格建议

- **Wobbly 圆角是核心签名**：4 组预设按 index 轮换，避免使用常规 `rounded-*`
- **手写字体是氛围基石**：所有文字用 Patrick Hand + Kalam，不混入无衬线体
- **装饰克制**：胶带/图钉/别针每 Section 1-2 处即可
- **微旋转制造生命力**：+/-0.5~2deg 按 index 奇偶交替
- **硬阴影替代模糊阴影**：纯偏移无 blur + 粗墨线 = 平面插画深度感
- **Primary / Accent 分工**：primary（标记笔红）数值与重点，accent（钢笔蓝）链接与辅助
- **黑板区块**：深色反色锚点，每页最多一处
