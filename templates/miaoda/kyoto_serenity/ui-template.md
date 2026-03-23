# Kyoto Serenity · 日式美学 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 传统日式美学融合现代排版，东方禅意与西方网格系统的平衡
- **Design Style**: Grid 网格 x Editorial 经典排版
- **Visual Signature**:
  1. 大型汉字标题（8rem, font-weight 900）、竖写元数据（writing-mode: vertical-rl）
  2. 5 列网格 + 竖向分隔线系统，几何装饰图形（太阳圆形 mix-blend-mode: multiply）
  3. 和纸色暖底纹理，零圆角零阴影，纯线条层次
  4. 悬停巨型汉字水印（opacity 0.03），列表项上移 4px 缓动
- **Emotional Tone**: 沉静、精致、仪式感

---

## 配色方案

**方案**: 自定义 - 和纸色系
**色彩关系**: 暖中性纸色基底 + 朱红点睛 + 低饱和冷调辅助
**主题**: 浅色（暖调）

> **配色设计理由**：和纸色暖底营造传统质感，朱红作为唯一高饱和色形成视觉焦点，褪色靛蓝辅助文字提供克制的信息层级。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(50 15% 93%) | 页面背景（和纸色） |
| surface | hsl(45 12% 91%) | 卡片/容器背景 |
| header | hsl(0 0% 10%) | 标题/重点区域（墨黑） |
| text | hsl(0 0% 10%) | 正文（墨黑） |
| textMuted | hsl(210 23% 37%) | 次要文字（褪色靛蓝） |
| primary | hsl(5 61% 50%) | 主交互色：朱红强调、元数据标签、装饰圆形 |
| accent | hsl(45 56% 61%) | 弱强调色：装饰金色、实心条、芥末金辅助 |
| border | hsl(30 5% 61%) | 边框/分隔线/网格线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(5 61% 50%)`：朱红色，用于装饰圆形、元数据标签、图表主色、几何填充，视觉权重最高
**Accent（弱强调色）** — `hsl(45 56% 61%)`：芥末金，用于装饰实心条、辅助图表色、微装饰，权重低于 primary

### 衍生规则

- **bg → surface**：H 值从 50→45 微偏暖，L 从 93%→91% 微降，靠色温微差区分
- **primary 半透明**：朱红 opacity 0.8 用于几何形状填充，保持 mix-blend-mode: multiply 融合感
- **border 色**：取 bg 与 text 中间明度 hsl(30 5% 61%)，低饱和暖灰
- **深色反转面**：页脚使用 header 色 `hsl(0 0% 10%)` 作背景，文字翻转为 bg 色

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 主色/图表首色 | hsl(5 61% 50%) | 朱红 |
| 辅助/图表次色 | hsl(210 23% 37%) | 褪色靛蓝 |
| 装饰金 | hsl(45 56% 61%) | 芥末金 |
| 暖灰棕 | hsl(30 35% 65%) | 图表补充色 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(5,61%,50%)', 'hsl(210,23%,37%)', 'hsl(45,56%,61%)', 'hsl(0,0%,10%)', 'hsl(30,35%,65%)'];
//               朱红              褪色靛蓝             芥末金             墨黑              暖灰棕
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Noto Serif JP, Georgia, serif', color: 'hsl(210,23%,37%)', fontSize: 12 },
  grid: { top: 60, right: 40, bottom: 60, left: 60, containLabel: true },
  xAxis: {
    axisLine: { lineStyle: { color: 'hsl(30,5%,61%)', width: 1 } }, axisTick: { show: false },
    axisLabel: { color: 'hsl(210,23%,37%)', fontSize: 12, fontFamily: 'Noto Serif JP, Georgia, serif', margin: 12 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(210,23%,37%)', fontSize: 12, fontFamily: 'Noto Serif JP, Georgia, serif', margin: 16 },
    splitLine: { lineStyle: { color: 'hsl(30,5%,61%)', type: 'solid', width: 0.5, opacity: 0.3 } }
  },
  tooltip: {
    backgroundColor: 'hsl(0,0%,100%)', borderColor: 'hsl(30,5%,61%)', borderWidth: 1, borderRadius: 0,
    padding: [12, 16], shadowBlur: 0, shadowColor: 'transparent',
    textStyle: { color: 'hsl(0,0%,10%)', fontSize: 13 }
  },
  legend: {
    top: 16, left: 'center', icon: 'rect', itemWidth: 16, itemHeight: 12, itemGap: 24,
    textStyle: { color: 'hsl(210,23%,37%)', fontSize: 13, fontFamily: 'Noto Serif JP, Georgia, serif' }
  }
};
```

### 各图表类型默认 series 样式

- **line/area**: `smooth: false`（直线，日式简洁），`lineStyle.width: 2`, `symbol: 'circle'`, `symbolSize: 6`, `areaStyle.opacity: 0.12`
- **bar**: `barWidth: '50%'`, `itemStyle.borderRadius: 0`（无圆角），`barGap: '20%'`, `emphasis.itemStyle.opacity: 0.8`
- **pie 环形**: `radius: ['45%','70%']`, `padAngle: 2`, `itemStyle: { borderRadius: 0, borderColor: bg色, borderWidth: 2 }`, 外部 label 衬线字体

### 图表容器

容器 `bg-surface border border-border rounded-none p-8`，无阴影（平面感）
高度 `h-80`（320px）/ 大型 `h-100`（400px），网格 `grid-cols-2 gap-[60px_40px]`，移动端 `grid-cols-1 gap-10`

---

## 字体排版

```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Noto+Serif+JP:wght@200;300;400;600;900&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

| 用途 | 字体栈 |
|-----|-------|
| Heading / Body | `Noto Serif JP, Georgia, serif`（明朝体） |
| Display / 技术文字 | `Playfair Display, Cinzel, serif`（西文专用） |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 品牌大标题 | `8rem, font-weight: 900, letter-spacing: -0.05em` | text |
| 分类标题(竖写) | `2.5rem, font-weight: 300, letter-spacing: 0.2em, writing-mode: vertical-rl` | text |
| 项目名称 | `1.4rem, font-weight: 600` | text |
| 英文技术标签 | `0.7rem, uppercase, letter-spacing: 0.15em` | textMuted |
| 描述文字 | `0.95rem, italic, line-height: 1.6` | 浅灰 |
| 元数据小字 | `0.7rem, uppercase, letter-spacing: 0.05em` | primary |

---

## 页面结构

### 布局系统: 5 列网格 + 竖向分隔线

```
┌────┬────────┬────────┬────────┬────┐
│ 80 │  1fr   │  1fr   │  1fr   │ 80 │
│ px │        │        │        │ px │
└────┴────────┴────────┴────────┴────┘
```

网格: `grid-template-columns: 80px 1fr 1fr 1fr 80px`, `max-width: 1440px`
竖向网格线: border 色 opacity 0.3, z-index 0（背景层）
左右边框: `border-left/right: 1px solid border色`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区块间距 | 80px (桌面) / 40px (移动) |
| 组件间距 | 60px |
| 内部间距 | 16px - 24px |
| 页面边距 | 80px (左右) |
| 基础单元 | 8px |

### 圆角与阴影

> Design DNA: Grid 网格 — 零圆角 + 无阴影

所有元素: `border-radius: 0`（传统日式直角），不使用 box-shadow，依靠线条和层次

### Hover 与动画

| 模式 | 效果 |
|-----|-----|
| 列表项 | `translateY(-4px), transition 300ms cubic-bezier(0.2,0.8,0.2,1)` |
| 巨型汉字水印 | `opacity 0→1, 0.3s`，`font-size: 4rem, font-weight: 900, writing-mode: vertical-rl, color: rgba(0,0,0,0.03)` |
| 混合模式 | 太阳装饰/品牌汉字 `mix-blend-mode: multiply` |

---

## 组件规范

### Header 区域
高度自适应，`padding: 120px 80px 80px`，底部 `1px solid border色`
品牌汉字 `8rem font-weight-900 line-height-1 mix-blend-mode-multiply`
竖写元数据 `writing-mode: vertical-rl, height: 200px, border-left: 1px solid text色, padding-left: 1rem`

### 几何装饰 - 太阳图形
`absolute, w-140px h-140px, bg-primary, rounded-full, mix-blend-mode: multiply, opacity: 0.8`

### 内容分类区块
左栏(120px): 竖写分类标题 + 装饰，`border-right: 1px solid border色, bg: rgba(240,238,233,0.5)`
右栏(1fr): 双栏内容网格 `grid-cols-2 gap-[60px_80px] p-[60px]`

### 列表项
底部分隔线 `1px solid rgba(0,0,0,0.1)`，hover 上移 4px
巨型汉字水印: `absolute right-0 top-[-20px], 4rem font-weight-900, writing-mode: vertical-rl`

### 页脚
`bg-header text-bg`（深色反转），`border-top: 4px double header色`，`padding: 60px 80px`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px | 5 列网格完整，内容双栏，边距 80px |
| 768px~1023px | 内容单栏，边距 40px，字号缩小 |
| < 768px | 单栏简化，竖写改横写，左侧栏改顶部横向，边距 16px，品牌汉字 4rem |

---

## 风格建议

- **东西方平衡**：汉字与西文搭配，竖写与网格结合，传统美学与现代排版共存
- **克制装饰**：几何形状不超过 3 个，颜色点缀不超过 20% 面积，留白即设计
- **Primary / Accent 分工**：primary（朱红）用于核心视觉焦点与装饰，accent（芥末金）用于微装饰与辅助层次
- **混合模式营造层次**：`mix-blend-mode: multiply` 让装饰与背景融合，避免生硬叠加
- **网格线为背景**：低透明度竖向分隔线构建空间感，不过于突兀
