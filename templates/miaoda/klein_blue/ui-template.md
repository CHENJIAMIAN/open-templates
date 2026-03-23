# Klein Blue · 克莱因蓝 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 瑞士国际主义排版 x 新粗野主义 — 国际克莱因蓝 (IKB) 为绝对主色，纯白为唯一对比色，高对比度双色宇宙
- **Visual Signature**:
  1. 双色绝对主义：仅克莱因蓝与纯白，视觉层次通过透明度与反转实现
  2. 全大写工业排版：超紧缩字距 + 黑体 + 工程文档权威感
  3. 无圆角硬边框 `border-white/80` + 蓝白 hover 反转交互
  4. 网格底纹层叠 + 45 度警告条纹 + 硬偏移阴影 `shadow-[4px_4px_0px_white]`
- **Emotional Tone**: 权威、秩序、工业精密、技术仪表盘信息密度
- **Design Style**: Grid 网格 x Bauhaus 包豪斯

---

## 配色方案

**方案**: 自定义（Klein Blue + Pure White Dualism）
**色彩关系**: 克莱因蓝与纯白双色绝对主义，语义色仅用于状态标记
**主题**: 深色（蓝底）

> **配色设计理由**：克莱因蓝作为绝对底色提供沉浸式视觉场域，纯白作为唯一对比色承载所有文字、边框和交互反转，通过白色透明度层级实现微妙深度关系。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(222 100% 33%) | 页面背景、所有容器默认底色（克莱因蓝） |
| surface | hsl(222 100% 33%) | 卡片底色（与 bg 同色，靠 border 区分） |
| header | hsl(222 100% 33%) | Header 横幅背景（同色系 + 网格底纹叠加） |
| text | hsl(0 0% 100%) | 主文字、hover 反转后底色 |
| textMuted | hsla(0 0% 100% / 0.6) | 字段名称前缀、元数据标签 |
| primary | hsl(0 0% 100%) | 主交互色：边框、文字、hover 反转底色（白色即交互色） |
| accent | hsla(0 0% 100% / 0.1) | 弱强调：网格底纹线、极弱分割线 |
| border | hsla(0 0% 100% / 0.8) | 容器外框、内部分割线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(0 0% 100%)`：边框勾勒、hover 反转底色、文字主色，视觉权重最高
**Accent（弱强调色）** — `hsla(0 0% 100% / 0.1)`：网格底纹、极弱背景填充，权重低于 primary

### 衍生规则

- **双色纪律**：除语义色（红/绿/黄/蓝状态标记）外，所有元素限制在克莱因蓝与白色之间
- **透明度层级**：white/100（标题）→ white/90（正文）→ white/80（边框）→ white/70（标签）→ white/60（前缀）→ white/50（划除旧值）
- **hover 反转**：蓝底白字 ↔ 白底蓝字，统一 `duration-300`
- **硬偏移阴影**：`shadow-[4px_4px_0px_white]`，hover 后 `shadow-[4px_4px_0px_hsl(222,100%,33%)]`

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 危险/P0 | hsl(0 84% 60%) | 关键警告条、FREEZE 标记 |
| 成功/正向 | hsl(145 63% 72%) | 改善指标、进度条填充 |
| 警告/P1 | hsl(48 97% 53%) | P1 优先级文字 |
| 信息/P2 | hsl(217 91% 68%) | P2 优先级文字 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 正文/标题 | `Inter, sans-serif` |
| 等宽/数据 | `JetBrains Mono, monospace` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 超大标题 H1 | `text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none` | text |
| 大标题 H2 | `text-4xl font-bold tracking-tighter uppercase` | text |
| 中标题 H3 | `text-3xl font-bold tracking-tighter uppercase` | text |
| 卡片标题 | `text-2xl font-bold` | text |
| 大数值 | `text-5xl font-bold tracking-tighter` | text |
| 元数据标签 | `text-xs font-mono uppercase` | textMuted |
| 微标签 | `text-[10px] font-bold` | text |
| 内联高亮 | `bg-white text-[bg色] px-2 font-black` | 反色块 |

---

## 页面结构

> 新粗野主义仪表盘 — 紧凑内边距，硬边框勾勒空间关系，信息密度优先。

```
Header（全宽蓝底白边，主标题 + 元数据网格，hover 蓝白反转）
  → Metrics Dashboard（4 列网格，关键指标卡片，顶部红线标记）
  → Core Decisions + Architecture（3 栏 1+2 分割，左决策卡片 / 右架构图+行动清单）
  → Risk & Roadmap（横向 flex 时间轴 + 底部风险标签）
```

容器: `max-w-7xl mx-auto p-4 md:p-8 space-y-8`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 主区块间距 | `space-y-8` (32px) |
| 指标卡片内边距 | `px-5 pt-5 pb-4` |
| Header 内边距 | `px-6 pt-6 pb-5 md:px-12 pt-12 pb-11` |
| 元数据区顶部 | `border-t border-white/80 pt-4 mt-8` |

### 圆角与阴影

> Design DNA: Neo-Brutalist — `sharp (0px)` + 硬偏移阴影

所有元素: `rounded-none`（全局无圆角）
边框: `border border-white/80`（1px 白色 80% 不透明）
硬阴影: `shadow-[4px_4px_0px_white]`（服务节点），hover 后 `shadow-[4px_4px_0px_hsl(222,100%,33%)]`

### 背景系统

| 效果 | 实现 |
|-----|-----|
| 页面底色 | `hsl(222 100% 33%)` |
| 全屏网格底纹 | 40px 网格，`hsla(0 0% 100% / 0.07)` 线条 + 径向遮罩 |
| 组件级网格 | 20px 网格，`hsla(0 0% 100% / 0.1)` 线条 |
| 警告条纹 | 45 度重复渐变，蓝色/白色交替 10px 条纹 |
| 选中态 | `selection:bg-white selection:text-[bg色]` |

### Hover 交互

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 蓝白反转 | 所有可交互容器 | `hover:bg-white hover:text-[bg色] transition-colors duration-300` |
| 行反转 | 表格行 | `hover:bg-white cursor-pointer` + 子元素 `group-hover:text-[bg色]` |
| 阴影反转 | 架构节点 | hover 时阴影色从白变蓝 |

---

## 组件规范

### Header

`bg-[bg色] border border-white/80`，主标题 `text-5xl md:text-8xl font-black tracking-tighter uppercase`
右上角浮动标签 `absolute top-0 right-0 font-mono text-xs opacity-50`
状态标签 `font-bold border border-[bg色] bg-white text-[bg色] px-2 py-0.5`
Hover: 整体蓝白反转

### MetricCard

`border border-white/80 px-5 pt-5 pb-4 relative overflow-hidden`
关键指标顶部红线 `absolute w-full h-1 bg-red-500`
数值 `text-5xl font-bold tracking-tighter mt-10`，旧值 `opacity-50 line-through`，改善值 `text-green-400 font-bold`
Hover: `hover:bg-white hover:text-[bg色] transition-colors duration-300`

### DecisionCard

`px-5 pt-6 pb-5`，父容器 `divide-y divide-white/80` 分割
分类标签 `font-mono text-xs opacity-60` 格式 `DECISION {id} / {category}`
行动标签 `px-2 py-0.5 border border-white/80 text-xs font-bold`
Hover: 整体蓝白反转

### ActionItems

容器 `border border-white/80`，表头 `bg-white text-[bg色] px-5 font-bold uppercase text-sm`
数据行 `grid grid-cols-12 gap-2`
P0: `bg-red-500 text-white px-1.5 py-0.5 text-xs font-bold`

### Roadmap 时间轴

`border border-white/80 flex overflow-x-auto`，事件 `flex-1 px-4 pt-4 pb-3 min-w-[160px]`
Risk 类型叠加 45 度条纹背景 + `bg-red-500 text-white px-1 py-px text-[10px] font-bold` 角标

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 指标 4 列，决策+架构 3 栏（1:2）|
| >= 768px (md) | 指标 2 列，标题 text-8xl，Header p-12，元数据双栏 |
| < 768px | 单列堆叠，标题 text-5xl，p-4，ActionItems 隐藏 owner/日期列 |

---

## 风格建议

- **双色纪律**：除语义色标记外，严格限制在克莱因蓝与白色之间，中间灰色通过白色透明度实现
- **Hover 一致性**：统一蓝白反转模式，过渡 `duration-300`，不引入其他 hover 效果
- **排版张力**：极端字号跨度（text-8xl vs text-xs）+ 字距压缩 + 全大写创造视觉冲击
- **Primary / Accent 分工明确**：primary（白色）专用于边框、文字和反转交互，accent（极弱白色）仅用于网格底纹
- **硬阴影 + 条纹警告**：禁止高斯模糊阴影，使用像素级硬偏移；风险区域用 45 度条纹而非纯色
- **信息密度优先**：紧凑内边距，数据密集呈现，边框即结构
