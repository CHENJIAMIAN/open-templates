# Organic Minimalism · 有机极简 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 有机极简主义 — 大面积留白搭配柔和自然绿调，清新通透
- **Design Style**: Muji 极简 x Rounded 圆润几何 — 超大圆角(40px-48px) + 高留白比例 + 单一石灰绿强调色 + 无装饰主义
- **Visual Signature**:
  1. 超大圆角卡片（40px-48px），有机柔和几何
  2. 石灰绿高亮色，唯一强调色聚焦交互
  3. 极简线性图标，无装饰主义排版
  4. 极轻阴影 shadow-sm + 极淡边框 border-gray-100/50
  5. 大量留白 p-10 ~ p-16，内容在呼吸空间中自然呈现
- **Emotional Tone**: 自然、轻盈、精确、值得信赖

---

## 配色方案

**方案**: 自定义 — Organic Minimal
**色彩关系**: 白色主底 + 暖灰 surface + 石灰绿唯一强调
**主题**: 浅色

> **配色设计理由**：白色和暖灰作为基底保持最大通透感，石灰绿作为唯一高饱和色精准引导注意力至核心交互区域，实现色彩克制下的功能聚焦。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(0 0% 100%) | 页面主背景 |
| surface | hsl(60 14% 95%) | 卡片/区块底色（微黄暖灰） |
| header | hsl(0 0% 10%) | 主标题文字 |
| text | hsl(0 0% 10%) | 正文主色 |
| textMuted | hsl(218 11% 65%) | 辅助说明、副标题、标签 |
| primary | hsl(76 56% 70%) | 主交互色：石灰绿背景态 — 激活卡片、CTA |
| accent | hsl(74 45% 52%) | 弱强调色：石灰绿文字态 — 结果数值、文字高亮 |
| border | hsla(220 14% 96% / 0.5) | 极淡分割线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(76 56% 70%)`：激活态卡片背景、CTA 圆形按钮、来源单位选择器背景，视觉权重最高
**Accent（弱强调色）** — `hsl(74 45% 52%)`：转换结果数值文字色、页脚关键词高亮，权重低于 primary

### 衍生规则

- **背景色**：纯白 hsl(0 0% 100%)，最大化留白通透感
- **Surface 色**：hsl(60 14% 95%) 带微黄暖调，区别于冷白
- **primary 背景版**：hsl(76 56% 70%) 用于卡片激活态和按钮填充
- **primary 文字版**：hsl(74 45% 52%) 饱和度略高，用于文字高亮确保可读性
- **hover 灰**：hsl(220 14% 96%) 悬停态底色
- **深色选择器**：hsl(215 28% 17%) 目标单位选择器

### 自定义 CSS 变量

```css
.text-lime-primary { color: hsl(74 45% 52%); }
.bg-lime-primary   { background-color: hsl(76 56% 70%); }
.bg-gray-soft      { background-color: hsl(60 14% 95%); }
```

---

## 字体排版

| 用途 | 字体栈 |
|-----|-------|
| 主字体 | `Noto Sans SC, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| Hero Title | `text-5xl font-bold leading-tight` | text |
| Section Title | `text-4xl font-bold` | text |
| Card Title | `text-2xl font-bold` | text |
| Body | `text-lg font-normal leading-relaxed` | text |
| Small Label | `text-sm font-medium` | textMuted |
| Micro Label | `text-[11px] font-bold uppercase tracking-widest` | textMuted |
| Breadcrumb | `text-[12px] font-medium` | textMuted |
| Pill / Select | `text-xs font-bold` | 按语境 |
| 结果数值 | `text-4xl font-bold` | accent（石灰绿文字色） |

---

## 页面结构

> 有机极简 — 超大圆角卡片 + 高留白 + 单页垂直浏览。

```
Header（面包屑 + 主标题 | 右侧"了解更多"按钮）max-w-7xl px-6 pt-12
  → Hero Section（浅灰底超大圆角卡片 rounded-[48px]）
      左侧: 标题 + 描述 + CTA | 右侧: 白色转换器面板 rounded-[40px]
  → Category Grid（3列网格卡片 gap-6）mt-24 mb-32
  → Footer（左侧版权 + 右侧关键词标签）border-t border-gray-100 py-12
```

| 元素 | 样式 |
|-----|-----|
| 整体容器 | `max-w-7xl mx-auto px-6` |
| Hero 卡片 | `rounded-[48px] p-12 lg:p-16 mt-16 bg-gray-soft` |
| 转换器面板 | `rounded-[40px] p-8 lg:p-12 bg-white shadow-sm border border-gray-100/50` |
| 网格卡片 | `rounded-[40px] p-10 h-[320px]` |
| 网格 | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |

---

## 视觉风格

### 间距系统

| 场景 | 值 |
|-----|---|
| 页面顶部 | `pt-12` |
| Hero 与顶部 | `mt-16` |
| Hero 内部 | `p-12 lg:p-16` |
| 网格区上下 | `mt-24` / `mb-32` |
| 卡片内 | `p-10` |
| 转换器面板 | `p-8 lg:p-12` |
| 表单分组 | `space-y-12` |

### 圆角与阴影

> Design DNA: Muji 极简 + Rounded — 有机大圆角 + 极轻阴影

| 元素 | 圆角 | 阴影 |
|-----|-----|-----|
| Hero 外层 | `rounded-[48px]` | 无 |
| 转换器面板 | `rounded-[40px]` | `shadow-sm` |
| 网格卡片 | `rounded-[40px]` | 无 |
| 图标容器 | `rounded-2xl` | 无 |
| 按钮/图标按钮 | `rounded-full` | `shadow-sm` |
| 选择器 Pill | `rounded-full` | 无 |

### 边框

转换器面板 `border border-gray-100/50` | 输入/输出下划线 `border-b border-gray-100` | 互换按钮 `border border-gray-100` | 页脚顶部 `border-t border-gray-100`

### Hover 交互

| 模式 | 效果 |
|-----|-----|
| CTA 箭头位移 | `group-hover:translate-x-1` |
| 了解更多图标旋转 | `group-hover:rotate-45` |
| 互换按钮 | `hover:bg-gray-50 hover:scale-110` |
| 卡片状态切换 | `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 组件规范

### CTA 按钮（文字 + 圆形箭头）

`flex items-center gap-3 group` | 文字 `font-bold text-gray-900` | 圆形 `w-10 h-10 rounded-full bg-lime-primary shadow-sm` | hover 箭头 `translate-x-1`

### 互换按钮

`w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm hover:bg-gray-50 hover:scale-110`

### 卡片 (Category Card)

容器 `rounded-[40px] p-10 h-[320px] flex flex-col justify-between`
默认 `bg-gray-soft hover:bg-gray-100/50` | 激活 `bg-lime-primary`
图标容器默认 `w-12 h-12 rounded-2xl bg-transparent` | 激活 `bg-white`
底部箭头 `w-10 h-10 rounded-full bg-white shadow-sm`
过渡 `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### 数值输入框

`text-4xl font-bold text-gray-900 bg-transparent focus:outline-none w-full`
仅允许数字和小数点

### 下拉选择器

来源 `bg-lime-primary/30 text-lime-800 text-xs font-bold px-4 py-2 rounded-full hover:bg-lime-primary/50`
目标 `bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-800`

### 结果显示

`text-4xl font-bold text-lime-primary truncate w-full`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|---------|
| >= 1024px (lg) | 网格 3列；Hero 横向 flex-row 左2/5 右3/5；内部 p-16 / p-12 |
| 768px ~ 1023px (md) | 网格 2列；页脚横向 |
| < 768px | 单列；Hero 纵向堆叠；转换器 p-8 |

最大内容宽度 `max-w-7xl` (1280px)

---

## 风格建议

- **大圆角与高留白比例**是核心：rounded-[40px]+ 配合 p-10 ~ p-16 宽裕内边距
- **Primary / Accent 分工明确**：primary（石灰绿背景态）用于激活卡片和 CTA，accent（石灰绿文字态）用于数值结果和文字高亮
- 色彩克制，仅在激活态、结果和 CTA 使用石灰绿，确保注意力精准引导
- 微妙动效 cubic-bezier(0.4, 0, 0.2, 1) 300ms 过渡增强触感
