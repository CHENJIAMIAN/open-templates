# Toss Impact Minimal · 极简冲击风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Toss Impact Minimal -- Apple 式极简留白 x 超大排版 x 柔和曲面卡片
- **Design Style**: Soft Blocks 柔色块 x Rounded 圆润几何
- **Visual Signature**:
  1. 超大字重标题（text-5xl ~ text-7xl），font-extrabold，tracking-tight
  2. 大圆角卡片（rounded-3xl / rounded-[2rem] / rounded-[3rem]），低阴影，细边框
  3. 纯白表面与极浅灰底层次对比，背景毛玻璃导航栏
  4. 滚动触发淡入上移动画（IntersectionObserver + cubic-bezier 缓动）
  5. 高对比 accent pill 标签 + 大量留白呼吸空间
- **Emotional Tone**: 专业、克制、清晰、有掌控力

---

## 配色方案

**方案**: Light Minimal + Blue Accent
**色彩关系**: 浅灰暖底 + 白色表面 + 蓝色主强调
**主题**: 浅色

> **配色设计理由**：极浅灰底营造柔和阅读环境，白色卡片浮于其上形成微层次，蓝色作为唯一高饱和色精准锚定交互焦点。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(210 20% 98%) | 页面背景 |
| surface | hsl(0 0% 100%) | 卡片背景、导航栏、表格 |
| header | hsl(220 83% 53%) | Header 品牌区域、深色总结卡片内强调 |
| text | hsl(221 39% 11%) | 主要文字、标题、数据值 |
| textMuted | hsl(220 9% 46%) | 次要文字、描述、标签 |
| primary | hsl(220 83% 53%) | 主交互色：品牌标识、CTA 背景、进度条、链接 hover |
| accent | hsl(210 40% 96%) | 弱强调色：pill 标签底色、表头背景、次级背景 |
| border | hsl(210 40% 96%) | 卡片边框、分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(220 83% 53%)`：主按钮、CTA 横幅、进度条填充、hover 文字变色，视觉权重最高
**Accent（弱强调色）** — `hsl(210 40% 96%)`：pill 底色、表头背景、hover 行微变色，权重低于 primary

### 衍生规则

- **bg → surface**：明度从 98% 提升到 100%（纯白），靠微差 + 阴影区分层级
- **primary 浅底**：primary 色 H 不变、S 降至 80%、L 升至 96% 得到 `hsl(220 80% 96%)` 用于 pill 底色
- **深色反转面**：text 色 `hsl(221 39% 11%)` 作为深色卡片背景，内文字翻转为白色
- **语义色**：正向 `hsl(142 71% 29%)`，负向 `hsl(0 84% 60%)`，警告 `hsl(25 90% 48%)`，均为高饱和中明度

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/完成 | hsl(142 71% 29%) | 已完成事项、正向指标 |
| 负向/阻塞 | hsl(0 84% 60%) | 阻塞标签、P0 标记 |
| 警告/高优先 | hsl(25 90% 48%) | 延期提示、P1 标签 |
| 紫色语义 | hsl(271 81% 56%) | 性能指标强调 |
| accent 浅底 | hsl(213 100% 97%) | pill 标签底色 |
| 深色表面 | hsl(221 39% 11%) | 总结区块深色卡片背景 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Inter, Noto Sans SC, -apple-system, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面主标题 | `text-5xl md:text-7xl font-extrabold tracking-tight leading-tight` | text，关键词 primary |
| Section 大标题 | `text-4xl font-extrabold tracking-tight` | text |
| Section 标题 | `text-3xl font-bold tracking-tight` | text |
| 卡片内标题 | `text-lg font-bold` | text |
| KPI 数值 | `text-3xl font-bold` | text |
| 深色区 KPI | `text-4xl font-extrabold` | 语义色 |
| pill 标签 | `text-sm font-semibold rounded-full` | primary 或语义色 |
| 描述文字 | `text-xl` 或 `text-lg` | textMuted |
| 正文 | `text-sm` 或 `text-base` | textMuted 偏深 |
| 辅助小字 | `text-xs font-medium uppercase tracking-wider` | 中灰 |

---

## 页面结构

> Toss Impact 式单页纵向滚动 -- 大量留白 + 背景色切换划分区域。

```
Sticky Nav（毛玻璃导航栏 + 品牌标识 + 锚点链接 + 状态 pill）
  → Hero Section（居中大标题 + pill + 描述 + KPI 4 列网格）
  → 白底 Section（左标题 + 双列内容网格）
  → 浅红底警示 Section（阻塞事项双列卡片）
  → 白底 Section（大标题 + 全宽表格 + accent CTA 横幅）
  → 浅灰底 Section（双列：风险 / 支持）
  → 白底 Section（深色总结卡片 + 底部统计三列）
  → Footer（品牌 + 版权 + 链接）
```

Header/Nav: `sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-accent h-16`
导航: 全页纵向滚动，背景色切换（白/浅灰/浅红/深色）+ `py-20 ~ py-32` 大间距划分层级

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| Hero 区 | `pt-24 pb-32` |
| Section 纵向 | `py-20` 或 `py-32` |
| Section 标题与内容 | `mb-16` |
| 容器最大宽 | `max-w-5xl` |
| 容器水平内边距 | `px-6` |
| 卡片内边距 | `p-6` 或 `p-8` |
| 深色总结卡片 | `p-12 md:p-20` |
| 组件间距 | `gap-4` / `gap-6` / `gap-12` |

### 圆角与阴影

> Design DNA: Soft Blocks + Rounded — 大圆角 + 轻阴影

| 元素 | 圆角 | 阴影 |
|-----|------|-----|
| KPI 卡片 | `rounded-3xl` (24px) | `shadow-sm` / `hover:shadow-md` |
| 表格/阻塞卡片 | `rounded-[2rem]` (32px) | `shadow-sm` |
| 深色总结卡片 | `rounded-[3rem]` (48px) | 无 |
| CTA 横幅 | `rounded-[2rem]` | 无 |
| pill / badge | `rounded-full` | 无 |
| 进度条 | `rounded-full` | 无 |

边框: `border border-accent`（1px 极细浅灰），阻塞卡片 `border border-red-100`

### Hover 与动画

| 模式 | 效果 |
|-----|-----|
| 阴影提升 | KPI 卡片 `hover:shadow-md transition-shadow` |
| 文字变色 | 表格行 `group-hover:text-primary transition-colors` |
| 背景微变 | 表格行 `hover:bg-accent/50 transition-colors` |
| 缩放 | CTA 按钮 `hover:scale-105 transition-transform` |
| 淡入上移 | Section `opacity 0→1, translateY(20px)→0, 0.8s cubic-bezier(0.16,1,0.3,1)`，IntersectionObserver 触发一次 |

### 背景色分区

| Section 类型 | 背景 |
|-------------|------|
| 默认页面 | bg 色 |
| 内容 Section | surface 色 |
| 风险/支持 Section | 偏蓝浅灰 |
| 阻塞警示 | 极浅红底 30% 透明 |
| 深色总结卡片 | text 色（近黑） |

---

## 组件规范

### KPI 指标卡片
容器 `bg-surface p-6 rounded-3xl border border-accent shadow-sm hover:shadow-md transition-shadow`
布局: 图标(顶左 mb-4) → 数值 `text-3xl font-bold` → 标签 `text-xs uppercase tracking-wider`
网格: `grid grid-cols-2 md:grid-cols-4 gap-4`

### 阻塞/警示卡片
容器 `bg-surface p-8 rounded-[2rem] border border-red-100 shadow-sm`
顶部 badge `px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase`
措施框 `p-4 bg-accent rounded-2xl text-sm`

### 数据表格
外容器 `overflow-hidden bg-surface border border-accent rounded-[2rem] shadow-sm`
表头 `bg-accent border-b border-accent text-sm font-bold uppercase tracking-wider`
行 `hover:bg-accent/50 transition-colors`，任务名 `group-hover:text-primary`
优先级 pill: P0 `bg-red-50 text-red-600` / P1 `bg-orange-50 text-orange-600`

### CTA 横幅卡片
容器 `p-8 bg-primary rounded-[2rem] text-white flex items-center justify-between gap-8`
按钮 `px-6 py-3 bg-white text-primary font-bold rounded-2xl hover:scale-105`

### 深色总结卡片
容器 `bg-text rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden`
数值 `font-extrabold text-4xl` 语义色，标签 `text-xs font-bold uppercase tracking-widest`
底部统计水平排列，`border-t border-gray-800 pt-12`

### 页脚
`py-12 border-t border-accent`，品牌 + 版权 + 链接 `hover:text-primary transition-colors`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 768px (md) | KPI 4 列，双列网格，导航锚点显示，Hero text-7xl，CTA 水平排列，总结卡片 p-20 |
| < 768px | KPI 2 列，单列堆叠，锚点隐藏，Hero text-5xl，CTA 垂直，总结 p-12 |

---

## 风格建议

- **大圆角 + 极细边框是核心签名**：`rounded-3xl` / `rounded-[2rem]` / `rounded-[3rem]` 配合 `border border-accent` + `shadow-sm`，新增组件延续柔和曲面风格
- **背景色分区建立节奏**：白底、浅灰底、浅红底、深色底交替 + py-20~py-32 大间距营造呼吸感
- **排版克制留白充分**：标题 font-extrabold + tracking-tight 冲击感，正文 textMuted 降低存在感
- **Primary / Accent 分工明确**：primary（蓝色）聚焦品牌标识与关键交互，accent（浅灰）用于次级背景与层次区分
