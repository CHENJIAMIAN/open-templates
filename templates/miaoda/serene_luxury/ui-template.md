# Serene Luxury · 静谧奢雅 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 新亚洲极简奢华 — 大面积留白 + 衬线字体，克制设计语言传递高端住宅从容气质
- **Visual Signature**:
  1. 超大圆角卡片 (3rem-4rem) + 旋转错位叠放图片卡片组
  2. 装饰性巨型序号 + pill 形状标签
  3. 玻璃拟态（backdrop-blur + 半透明边框）
  4. 衬线字体 Noto Serif SC 标题 + Inter 无衬线正文
  5. 柔和阴影 + hover 上浮动效 (`hover:-translate-y-2`)
- **Emotional Tone**: 宁静、从容、精英感 — 如湖面般平静而深邃
- **Design Style**: Rounded 圆润几何 x Muji 极简

---

## 配色方案

**方案**: 自定义（Serene Luxury — Slate + Blue + Lime）
**色彩关系**: 浅灰蓝底 + 深色 slate 标题 + 蓝色交互 + 青柠点睛
**主题**: 浅色

> **配色设计理由**：大面积留白 slate-50 营造宁静氛围，深 slate-900 提供文字锚点，蓝色 blue-600 作为交互色保持克制专业感，lime-400 作为点睛色打破沉稳基调。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(210 40% 98%) | 页面全局背景（slate-50） |
| surface | hsl(0 0% 100%) | 卡片、面板、弹窗底色 |
| header | hsl(222 47% 11%) | 暗色区块背景、主按钮、Footer（slate-900） |
| text | hsl(222 47% 11%) | 主标题、正文主色 |
| textMuted | hsl(215 16% 47%) | 副标题、描述性文字（slate-500） |
| primary | hsl(220 83% 53%) | 主交互色：区块标签、hover 高亮、功能圆点（blue-600） |
| accent | hsl(84 81% 44%) | 弱强调色：状态标签、Icon hover、CTA 次要强调（lime-400） |
| border | hsl(210 40% 96%) | 卡片边框、分隔线（slate-100） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(220 83% 53%)`：区块英文标签、导航 hover、交互高亮、装饰圆点，视觉权重最高
**Accent（弱强调色）** — `hsl(84 81% 44%)`：状态标签、Icon hover 高亮、暗底区提示卡片，权重低于 primary

### 衍生规则

- **浅色区块交替**：bg hsl(210 40% 98%) 与 surface hsl(0 0% 100%) 交替，创造微妙节奏
- **暗色区块**：header hsl(222 47% 11%) 用于配套设施区、主按钮，与浅色形成对比
- **玻璃拟态**：`bg-white/15` ~ `bg-white/90` + `backdrop-blur` + `border-white/50` 半透明层级
- **Hero 灰蓝底**：hsl(210 15% 71%) (#A8B5C1) 湖水灵感背景
- **accent 多级用法**：lime-400 实色用于强调标签，lime-400/10 用于暗底提示卡片背景

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 交互高亮 | hsl(220 83% 53%) | 同 primary (blue-600) |
| 状态强调 | hsl(84 81% 44%) | 同 accent (lime-400) |
| Hero 背景 | hsl(210 15% 71%) | 灰蓝底色 (#A8B5C1) |
| 标签底色 | hsl(219 93% 97%) | blue-50 |
| 浅交替底 | hsl(210 40% 96%) | slate-100 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;700&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 正文 / UI | `Inter, -apple-system, sans-serif` |
| 标题 / 装饰 | `Noto Serif SC, serif` (.serif-font) |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| Display | `text-6xl md:text-8xl font-light .serif-font leading-[1.1]` | text (白底) / white (暗底) |
| H1 | `text-4xl md:text-5xl font-light .serif-font tracking-tight opacity-90` | text |
| H2 | `text-4xl md:text-5xl md:text-6xl .serif-font` | text |
| H3 | `text-2xl md:text-3xl md:text-5xl font-bold .serif-font text-slate-800` | text |
| Label | `text-xs font-bold uppercase tracking-widest` | primary (蓝) / accent (暗底青柠) |
| Micro Label | `text-[10px] font-bold uppercase tracking-[0.2em] ~ tracking-[0.4em]` | 多种 |
| Body | `text-lg font-light leading-relaxed` | textMuted |
| 装饰数字 | `text-5xl ~ text-[40rem] font-light .serif-font` | slate-200 / white/10 |

---

## 页面结构

> 新亚洲极简布局 — 大面积留白 + 超大圆角容器 + 浅深交替区块。

```
Fixed Header（透明→滚动后 bg-white/90 backdrop-blur-md shadow-sm）
  → Hero Section（min-h-screen 灰蓝底，左标题+搜索 | 右三张旋转叠放卡片）
  → Highlights Section（py-20 bg-slate-100，4 列数据卡片）
  → Units Section（py-32 bg-white，Tab 切换 + 左图右详情双栏）
  → Amenities Section（py-32 bg-slate-900 白字，图标网格 + 暗色面板）
  → Location Section（py-32 bg-white，序号列表 + 地图图片 + 浮层）
  → Contact Section（py-32 bg-slate-100，超大圆角白色卡片双栏）
  → Footer（bg-white border-t py-16）
```

容器: `container mx-auto px-6 md:px-12`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区块纵向间距 | `py-20`（轻量）/ `py-32`（标准） |
| 区块标题与内容 | `mb-16` ~ `mb-24` |
| 卡片内边距 | `p-8`（小）/ `p-10 ~ p-12`（大）/ `p-12 md:p-24`（重要面板） |
| Grid 间距 | `gap-8`（紧凑）/ `gap-12 ~ gap-16`（标准）/ `gap-20`（宽松） |

### 圆角系统

> Design DNA: Rounded Luxury — 超大圆角 (24px-4rem) + pill 标签

| 元素 | 圆角 |
|-----|-----|
| Pill 按钮/标签 | `rounded-full` |
| 小型卡片/按钮 | `rounded-xl` ~ `rounded-2xl` |
| 标准卡片 | `rounded-3xl` |
| 主面板/图片容器 | `rounded-[3rem]` ~ `rounded-[3.5rem]` |
| 超大容器 | `rounded-[4rem]` |

### 阴影系统

| 场景 | 值 |
|-----|---|
| 卡片默认 | `shadow-sm` |
| 卡片 hover | `shadow-xl` / `shadow-2xl` |
| 浮动主卡片 | `shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)]` |
| 超大容器 | `shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)]` |
| 主按钮 | `shadow-xl` / `shadow-2xl` |

### Hover 交互

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 上浮 | 数据卡片 | `hover:-translate-y-2 hover:shadow-xl transition-all duration-300` |
| 底线变色 | 数据卡片 | `w-8 h-1 bg-slate-200 group-hover:bg-blue-500` |
| 图标变色 | 功能图标 | `group-hover:bg-lime-400 group-hover:text-slate-900 transition-all` |
| 旋转回正 | 叠放卡片 | `hover:rotate-0 transition-all duration-1000` |
| 按钮弹起 | CTA | `hover:-translate-y-1 transition-all` |

---

## 组件规范

### 按钮

| 类型 | 样式 |
|-----|-----|
| 主 CTA | `bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-xl hover:-translate-y-1 transition-all` |
| 大型 CTA | `bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-bold shadow-2xl` |
| 幽灵按钮 | `bg-white text-slate-900 border border-slate-200 px-12 py-5 rounded-[2rem] font-bold hover:bg-slate-50` |
| Tab Active | `px-6 py-3 rounded-full bg-slate-900 text-white shadow-lg text-sm font-medium` |
| Tab Inactive | `px-6 py-3 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 text-sm font-medium` |
| Header 按钮 | `px-6 py-2 rounded-full border border-slate-800 hover:bg-slate-800 hover:text-white text-sm` |

### 卡片

| 类型 | 样式 |
|-----|-----|
| 数据卡片 | `p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 hover:-translate-y-2 transition-all duration-300` |
| 图片展示卡片 | `bg-white p-5 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)]` 内含 `rounded-[2.2rem]` 图片 |
| 暗色嵌套面板 | `bg-slate-800/50 rounded-[3rem] p-12 border border-slate-800` |
| 超大联系面板 | `bg-white rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-50` |
| 玻璃拟态容器 | `bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[3.5rem]` |

### 标签

Pill 标签: `px-5 py-2 rounded-full border border-white/40 text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm`
属性标签 (蓝): `bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold`
状态标签 (强调): `bg-lime-400 text-slate-900 px-6 py-3 rounded-2xl font-bold shadow-lg`

### 导航栏

默认透明 `bg-transparent py-8`，滚动后 `bg-white/90 backdrop-blur-md shadow-sm py-4`
导航链接 `text-sm uppercase tracking-widest font-medium text-slate-600 hover:text-blue-600`
固定定位 `fixed top-0 left-0 w-full z-50 transition-all duration-500`

### 装饰元素

背景巨型数字: `text-[40rem] font-bold text-white/10 .serif-font absolute`
序号编号: `text-5xl ~ text-6xl font-light text-slate-200 .serif-font`
地图热点脉冲: `w-12 h-12 bg-white rounded-full animate-pulse shadow-2xl` 内含 `w-3 h-3 bg-blue-600 rounded-full`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 双栏 Grid（grid-cols-2 / lg:grid-cols-4），Hero 右侧卡片精确定位，lg:w-[460px] |
| >= 768px (md) | 导航显示 hidden md:flex，px-12，text-8xl Hero 标题，md:p-24 大面板 |
| < 768px | 单列布局，导航隐藏，px-6，text-6xl 标题，卡片堆叠 |

---

## 风格建议

- **克制的奢华感**：大面积留白 + 衬线字体 + 超大圆角（3-4rem）+ 柔和阴影，所有动效 `duration-300` 以上缓动
- **双色调层次**：浅色区块（slate-50/white）与深色区块（slate-900）交替，lime-400 点睛强调
- **Primary / Accent 分工明确**：primary（蓝色）用于交互高亮和功能标记，accent（青柠）用于状态强调和 Icon hover
- **玻璃拟态与错位构图**：关键视觉区域 `backdrop-blur` + 半透明白色边框，图片卡片 `rotate` + `z-index` 叠放
- **微文字统一格式**：装饰性微标签保持 `uppercase tracking-widest text-[10px]` 营造国际化高端感
