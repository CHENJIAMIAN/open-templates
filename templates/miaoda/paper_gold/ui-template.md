# Paper Gold · 纸金暖调 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Swiss Brutalist — 瑞士国际主义排版 x 暖白纸张底 x 金色交互反馈
- **Design Style**: Muji 极简 x Editorial 经典排版
- **Visual Signature**:
  1. 零圆角全直角系统（所有卡片、按钮、输入框、头像 border-radius: 0）
  2. 纤细分割线 + 超大号标题（10px 微标签到 8xl/9xl 巨型数字）构建层级
  3. 三色克制用色：近黑 / 暖灰 / 金色，留白和线条组织信息
  4. SVG 杂点纹理 3% 透明度全局覆盖，模拟纸张物理质感
  5. 缓慢优雅过渡（300-500ms），图片灰度→彩色（1000-2000ms）
- **Emotional Tone**: 从容、高端、建筑图纸般严谨

---

## 配色方案

**方案**: Swiss Warm + Gold Accent（浅色主题）
**色彩关系**: 暖白纸张底 + 近黑文字 + 金色交互反馈
**主题**: 浅色

> **配色设计理由**：暖白底色模拟高端纸张质感，近黑色（非纯黑）提供柔和高对比，金色严格限制为交互反馈色——仅在 hover/active/focus 时出现，克制中传递惊喜。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(40 20% 97%) | 页面背景（暖白米纸 #F9F8F6） |
| surface | hsla(0 0% 100% / 0.50) | 卡片悬浮层（半透明白 + backdrop-blur） |
| header | hsla(40 20% 97% / 0.90) | 头部（同 bg + 毛玻璃效果） |
| text | hsl(0 0% 10%) | 主要文字（近黑 #1A1A1A） |
| textMuted | hsl(25 5% 40%) | 次要文字、描述、时间戳（暖灰 #6C6863） |
| primary | hsl(45 63% 52%) | 主交互色：金色（#D4AF37），hover/active/focus 反馈 |
| accent | hsl(33 22% 90%) | 弱强调色：进度条轨道、头像底色（暖米灰 #EBE5DE） |
| border | hsla(0 0% 10% / 0.10) | 卡片边框、分割线（近黑色低透明度） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(45 63% 52%)`：激活指示条、hover 填充、focus 底线、选区高亮、滚动条 hover，视觉权重最高
**Accent（弱强调色）** — `hsl(33 22% 90%)`：进度条轨道底色、头像默认底色、空态背景，权重低于 primary

### 衍生规则

- **背景色**：hsl(40 20% 97%) 暖白底，模拟高端纸张
- **文字色**：hsl(0 0% 10%) 近黑而非纯黑，柔和高对比
- **金色严格限制**：仅出现在 hover/active/focus/选区高亮等用户触发瞬间
- **边框色**：近黑 10%-20% 透明度纤细线，hover 变金色
- **图表配色**：三色 — text 色(健康) / primary 色(警告) / textMuted 色(风险)

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 图表健康态 | hsl(0 0% 10%) | 同 text |
| 图表警告态 | hsl(45 63% 52%) | 同 primary |
| 图表风险态 | hsl(25 5% 40%) | 同 textMuted |
| 选区高亮 | `selection:bg-[primary] selection:text-white` | 金底白字 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(0,0%,10%)', 'hsl(45,63%,52%)', 'hsl(25,5%,40%)', 'hsl(33,22%,90%)'];
//               近黑(健康)        金色(警告)          暖灰(风险)          米灰(空态)
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: "'Inter', system-ui, 'PingFang SC', sans-serif", color: '#1A1A1A', fontSize: 12 },
  grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: true },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { fontFamily: "'Inter'", fontSize: 12, color: '#1A1A1A' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { fontFamily: "'Inter'", fontSize: 12, color: '#1A1A1A' },
    splitLine: { lineStyle: { color: 'rgba(26,26,26,0.05)', type: 'solid' } }
  },
  tooltip: {
    backgroundColor: '#F9F8F6', borderColor: '#1A1A1A', borderWidth: 1, borderRadius: 0,
    textStyle: { fontFamily: "'Inter'", fontSize: 12, color: '#1A1A1A' },
    extraCssText: 'box-shadow: none;'
  },
  legend: {
    textStyle: { fontFamily: "'Inter'", fontSize: 10, color: '#6C6863' },
    icon: 'rect', itemWidth: 12, itemHeight: 12
  }
};
```

### 各图表类型默认 series 样式

- **pie 环形**: `radius: ['60%','75%']`, `padAngle: 2`, `borderWidth: 0`, `borderRadius: 0`, `label: { show: false }`, emphasis `scale: false`
- **bar 水平**: `barWidth: 32`, `borderRadius: [0,0,0,0]`（完全直角），`itemStyle.color: '#1A1A1A'`
- **暗底 tooltip 变体**: `backgroundColor: '#1A1A1A'`, `textStyle.color: '#FFFFFF'`, `borderWidth: 0`

### 图表容器

无独立卡片背景，融入页面布局；零圆角，无阴影
内边距随页面布局，图表高度按数据量调整

---

## 字体排版

```css
font-family: 'Inter', system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
```

| 用途 | 字体栈 | 字重 |
|-----|-------|------|
| 全局（西文） | Inter | 300/400/500/600/700 |
| 回退（中文） | PingFang SC / Microsoft YaHei | 系统默认 |

### 文字规范

| 层级 | 样式 | 颜色 |
|------|------|------|
| 巨型数字 | `text-9xl font-bold` | text |
| 页面主标题 | `text-6xl / text-8xl font-bold leading-[0.9] tracking-tight` | text |
| 分区标题 | `text-3xl font-bold` | text |
| 内容标题 | `text-xl / text-2xl font-bold` | text |
| 正文大 | `text-lg` | textMuted |
| 正文 | `text-sm` | textMuted |
| 微标签 | `text-xs uppercase tracking-[0.2em]` | textMuted |
| 超微标签 | `text-[10px] uppercase tracking-[0.25em]` | textMuted |
| Drop Cap | `float-left text-7xl font-bold leading-[0.8] mr-4` | text |

### 排版特征

标题 `tracking-tight leading-[0.9]`（极紧密），微标签 `uppercase tracking-[0.2em]`（小字大间距）
数据值局部 `font-mono`，Drop Cap 杂志风首字母效果

---

## 页面结构

> Sidebar + 主内容区，编辑式留白排版。

```
Sidebar (fixed, w-20 mobile / w-64 desktop, border-r 10% opacity)
  Logo (h-24) + Nav items (左侧 2px 金色指示条) + Logout
Main Content (pl-20/pl-64)
  Sticky Header (h-24, backdrop-blur-sm, border-b 5%)
  Content Scroll Area (p-8/p-16, max-w-[1600px])
    Hero (grid-cols-12: 左8标题+描述, 右4核心数字)
    KPI 卡片行 (grid-cols-1 md:grid-cols-4 gap-12)
    图表区 (不对称 col-span-4 + col-span-7, 留1列呼吸)
    详情页 (flex-col lg:flex-row gap-12, 右侧 w-80)
```

---

## 视觉风格

### 圆角与阴影

| 元素 | 圆角 | 阴影 |
|------|------|------|
| 所有卡片/按钮/输入框/头像 | 0（完全直角） | — |
| 进度条/滚动条 | 0 | — |
| 通知圆点 | `rounded-full`（唯一例外） | — |
| 头像默认 | — | `shadow-[0_4px_16px_rgba(0,0,0,0.05)]` |
| CTA 按钮 | — | `shadow-[0_4px_16px_rgba(0,0,0,0.1)]` hover加深 |

### 边框

| 场景 | 样式 |
|------|------|
| 侧边栏 | `border-r border-[text]/10` |
| KPI 卡片 | `border-t border-[text]`，hover 变 primary 金色 |
| 列表行 | `border-b border-[text]/10`，hover 变 primary |
| 输入框 | `border-b border-[text]`，focus 变 primary |
| 表单卡片 | `border border-[text]/10`，hover 变 `border-[text]` |

### 杂点纹理 (Noise Overlay)

`fixed inset-0 pointer-events-none z-50 opacity-0.03`，SVG fractalNoise 纹理，模拟纸张颗粒感

### Hover & 动画

| 效果 | 时长 |
|------|------|
| 颜色过渡 | `duration-300 / duration-500` |
| 图片灰度恢复 | `grayscale → grayscale-0 duration-[1000ms] ~ duration-[2000ms]` |
| 按钮填充滑入 | `-translate-x-full → translate-x-0 duration-500 cubic-bezier` |
| 进度条展开 | `duration-1000 ease-out` |
| 返回箭头 | `group-hover:-translate-x-1` |

### 滚动条

`width: 4px`, track transparent, thumb `#1A1A1A`, thumb:hover `primary 金色`

---

## 组件规范

### 主按钮 (Primary CTA)

`h-12 px-8 bg-[text] text-white text-xs uppercase tracking-[0.2em] rounded-none`
Hover: `bg-[primary]` 或滑入金色覆盖层，`shadow-[0_8px_24px_rgba(0,0,0,0.2)]`

### 次要按钮 (Outline)

`h-10 px-6 border border-[text] text-[text] text-xs uppercase tracking-[0.2em] rounded-none`
Hover: `bg-[text] text-white`

### KPI 卡片

`border-t border-[text] pt-6`，hover `border-[primary]`
数字 `text-5xl font-bold`，标签 `text-xs uppercase tracking-[0.2em] text-[textMuted]`

### 进度条

轨道 `h-[2px] bg-[accent]`，填充 `bg-[text]`（健康）/ `bg-[primary]`（风险），`transition-all duration-1000`

### 状态标签 (Badge)

`px-2 py-1 text-[10px] uppercase tracking-[0.2em] border rounded-none`
默认 `border-[text]/20 text-[textMuted]`，活跃 `border-[text] text-[text]`，风险 `border-[primary] text-[primary]`

### 列表行

`py-6 border-b border-[text]/10 flex`，hover `border-[primary]`
头像 `w-10 h-10 方形 grayscale → group-hover:grayscale-0 duration-[1500ms]`
右侧箭头 `opacity-0 → group-hover:opacity-100 text-[primary]`

### 侧边栏导航项

`flex items-center gap-4 px-4 md:px-8 py-4`
激活态: 左侧 `2px bg-[primary]` 金色指示条，图标 `text-[primary]`
文字 `text-xs uppercase tracking-[0.2em] hidden md:block`

---

## 响应式断点

| 断点 | 关键变化 |
|------|---------|
| < 768px | 侧边栏 w-20 仅图标；内容 pl-20 p-8；栅格单列；标题 text-5xl/text-6xl |
| >= 768px (md) | 侧边栏 w-64 含文字；内容 pl-64 p-16；栅格多列；标题 text-7xl/text-8xl |
| >= 1024px (lg) | 详情页侧边栏水平并排 lg:flex-row；右侧 lg:w-80 |

内容最大宽度 `max-w-[1600px] mx-auto`

---

## 风格建议

- **善用留白与线条的节奏感**："大面积空白 + 纤细分割线 + 超大标题"三者对比是核心张力，避免引入色块填充
- **金色严格限制为交互反馈色**：只在 hover/active/focus/选区高亮等用户触发瞬间出现，克制中传递惊喜
- **灰度-彩色图片过渡强化叙事感**：头像/图片默认 grayscale，hover 缓慢恢复彩色，营造"从档案走向鲜活"
- **零圆角是核心签名**：`rounded-none` 贯穿所有元素，通知圆点是唯一例外
- **Primary / Accent 分工**：primary 金色专用于交互反馈，accent 暖米灰用于进度条轨道和空态底色
