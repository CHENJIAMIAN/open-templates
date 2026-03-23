# Dark Elegance · 暗影优雅 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 高端暗黑极简主义 — 纯黑背景 + 高对比亮橙强调色，影院级视觉氛围
- **Visual Signature**:
  1. 大面积留白与超大字重标题形成视觉张力
  2. 超大圆角（32px-80px）+ 柔和辉光效果为暗色注入温度
  3. 灰度头像 + 图片 hover 恢复 + 光泽扫过动效
  4. 背景大光晕 (blur-150px) 营造氛围感
  5. `font-black` (900) 标题 vs `font-light` 正文极端字重对比
- **Emotional Tone**: 现代、克制、高级感，适用于创意作品集与品牌展示
- **Design Style**: Rounded 圆润几何 x Soft Blocks 柔色块

---

## 配色方案

**方案**: 自定义（Dark Elegance — Warm Orange on Black）
**色彩关系**: 纯黑/深灰底 + 亮橙色单点强调
**主题**: 深色

> **配色设计理由**：大面积纯黑与深灰建立沉浸式暗色基底，亮橙色 (#FF5C28) 作为唯一暖色调点亮关键交互点，通过色彩克制维持高端感。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(0 0% 4%) | 页面主背景（#0a0a0a）、交替分区背景 |
| surface | hsl(0 0% 0%) | 导航栏背景、对比分区、卡片底色（纯黑） |
| header | hsl(0 0% 7%) | 推荐卡片、状态胶囊（gray-900/40 半透明） |
| text | hsl(0 0% 100%) | 标题、关键数字、正文高亮 |
| textMuted | hsl(0 0% 64%) | 副标题、描述段落、导航链接（gray-400） |
| primary | hsl(14 100% 58%) | 主交互色：CTA 按钮、品牌标识、hover 边框（#FF5C28） |
| accent | hsl(0 0% 42%) | 弱强调色：辅助标签、时间线日期、页脚文字（gray-500） |
| border | hsl(217 19% 14%) | 卡片边框、分隔线、导航分割（gray-800） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(14 100% 58%)`：CTA 按钮、品牌标识、星标评分、hover 边框高亮，视觉权重最高
**Accent（弱强调色）** — `hsl(0 0% 42%)`：辅助标签、时间线日期、页脚文字，权重低于 primary

### 衍生规则

- **暗色层次**：surface hsl(0 0% 0%) → bg hsl(0 0% 4%) → header hsl(0 0% 7%) → border hsl(217 19% 14%) 四级暗色建立微妙深度
- **辉光效果**：primary 10% 透明度大光晕 (blur-150px)，primary 40% hover 投影
- **primary 深色变体**：hsl(11 81% 51%) 用于按钮 hover 态和渐变终点色
- **蓝色辉光**：hsl(217 91% 60% / 0.1) 次要装饰光晕，与橙色形成冷暖对比
- **文字渐变**：`linear-gradient(to right, white, gray-400)` 标题装饰

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 主交互/CTA | hsl(14 100% 58%) | 同 primary |
| 主色深/hover | hsl(11 81% 51%) | 按钮 hover/渐变终点 |
| 状态在线 | hsl(142 71% 45%) | 绿色脉冲圆点 |
| 蓝色辉光 | hsl(217 91% 60%) | 次要装饰 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Inter, sans-serif` |
| 等宽 | `font-mono`（系统默认，时间线日期/技术标签） |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| Display | `text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter` | text |
| H1 | `text-5xl font-bold leading-tight` | text |
| H2 | `text-4xl lg:text-7xl font-black leading-tight` | text |
| H3 | `text-2xl font-bold` | text |
| Body Large | `text-xl leading-relaxed` | textMuted |
| Label | `text-sm font-bold tracking-widest uppercase` | primary / textMuted |
| Caption | `text-xs font-medium tracking-widest` | accent |
| 技能文字 | `text-2xl md:text-4xl font-black text-gray-800 hover:text-white` | 动态 |

---

## 页面结构

> 暗黑影院式布局 — 大面积留黑 + 超大圆角容器 + 辉光装饰。

```
Fixed Navbar（固定顶部，滚动后毛玻璃 bg-black/80 backdrop-blur-md）
  → Hero Section（双栏 lg:grid-cols-2，文字 | 头像视觉，min-h-screen）
  → Skills Marquee（全宽技能标签横排，border-y 分隔）
  → Projects Grid（2 列卡片 md:grid-cols-2 gap-10）
  → Experience（12 栏网格 5:7，文字 | 时间线）
  → Testimonials（2 列推荐卡片 md:grid-cols-2）
  → Contact CTA（居中渐变大卡片 rounded-[60px]）
  → Footer（三栏 flex，border-t）
```

容器: `max-w-7xl mx-auto px-6`，Contact: `max-w-5xl`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区块纵向间距 | `py-32` (128px) / `py-20` (80px) |
| 导航内边距 | `px-6 py-4`（滚动后）/ `py-8`（初始） |
| 推荐卡片内边距 | `p-10` (40px) |
| Contact 卡片 | `p-12 lg:p-24` |

### 圆角系统

> Design DNA: Rounded Geometry — 超大圆角 (32px-80px) 建立柔和感

| 元素 | 圆角 |
|-----|-----|
| 品牌标识/导航按钮/CTA 按钮 | `rounded-full` |
| 项目卡片 | `rounded-[32px]` |
| 推荐卡片 | `rounded-[40px]` |
| Contact 卡片 | `rounded-[60px]` |
| Hero 图像 | `rounded-[80px]` |
| 浮层徽章 | `rounded-3xl` (24px) |

### 阴影与辉光

| 效果 | 实现 |
|-----|-----|
| 背景大光晕 | `w-[600px] h-[600px] blur-[150px]` + primary 10% 透明度 |
| 按钮 hover 辉光 | `box-shadow: 0 0 20px hsla(14 100% 58% / 0.4)` |
| 底部冷暖光晕 | `w-64 h-64 blur-[100px]` primary 20% / 蓝色 10% |
| 毛玻璃导航 | `backdrop-blur-md bg-black/80` |
| 毛玻璃浮层 | `backdrop-blur-xl bg-black/80` |

### Hover 交互

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 图片放大 | 项目卡片 | `group-hover:scale-110 transition-transform duration-700` |
| 边框高亮 | 推荐卡片 | `hover:border-[primary色]/30 transition-all duration-300` |
| 光泽扫过 | Contact 卡片 | `group-hover:translate-x-full transition-transform duration-1000` |
| 缩放弹性 | CTA 按钮 | `hover:scale-105 transition-transform` |

### 动画

- 导航状态: `transition-all duration-300`
- 按钮: `hover:scale-105 active:scale-95`
- 状态圆点: `animate-pulse`（绿色脉冲）
- 装饰环: `animate-[spin_20s_linear_infinite]`
- 移动菜单: `animate-in slide-in-from-top duration-300`
- 图片透明度: `transition-opacity duration-1000 ease-in-out`

---

## 组件规范

### Navbar

`fixed top-0 w-full z-50`，透明态 `bg-transparent py-8` / 毛玻璃态 `bg-black/80 backdrop-blur-md py-4`
品牌标识 `w-8 h-8 rounded-full bg-[primary色]`
导航链接 `text-sm font-medium text-gray-400 hover:text-white`
语言切换 `px-3 py-1 rounded-full border border-gray-700 hover:border-[primary色]`

### Hero

双栏 `lg:grid-cols-2 gap-16 items-center`
状态胶囊 `bg-gray-900/50 border border-gray-800 rounded-full px-4 py-1` + 绿色脉冲点
主标题 `text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]`
CTA `bg-[primary色] text-white px-8 py-4 rounded-full font-bold`
头像容器 `aspect-[4/5] rounded-[80px]`

### Project Card

图片区域 `rounded-[32px] aspect-[4/3]`，hover 图片放大 110%
分类标签 `text-[primary色] text-sm font-bold uppercase tracking-widest`
箭头按钮 `rounded-full border border-gray-800 hover:bg-white hover:text-black`

### Testimonial Card

`bg-gray-900/40 border border-gray-800 rounded-[40px] p-10`
Hover: `hover:border-[primary色]/30`
星标 `fill="primary色" color="primary色"` size 18
引文 `text-xl italic text-gray-300 leading-relaxed`
头像 `w-14 h-14 rounded-full grayscale`

### Contact CTA

`rounded-[60px]` 渐变（primary → primary-dark）
标题 `text-4xl lg:text-7xl font-black`
邮件按钮 `bg-white text-[primary色] rounded-full px-10 py-5 font-bold text-xl`
光泽动效 hover 白色半透明条 translate-x-full

### Skills Bar

全宽 `flex-wrap gap-4 items-center justify-center`
文字 `text-2xl md:text-4xl font-black text-gray-800 hover:text-white transition-colors`
分隔点 `w-2 h-2 rounded-full bg-gray-800`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | Hero 双栏，经历 12 栏 5:7，text-8xl 超大标题，lg:p-24 宽松内边距 |
| >= 768px (md) | 双栏项目/推荐网格，页脚水平排列，导航链接展示，md:text-4xl 技能文字 |
| < 768px | 单栏堆叠，汉堡菜单，text-6xl 标题，全宽卡片 |

---

## 风格建议

- **色彩克制**：大面积纯黑深灰，仅关键交互点使用 primary 橙色，避免主色泛滥
- **圆角一致性**：超大圆角（32-80px）是柔和感核心，新组件从 rounded-3xl 起步
- **辉光氛围**：背景光晕 blur-100px 以上，透明度 10%-20%，营造高端感
- **Primary / Accent 分工明确**：primary（亮橙）专用于 CTA 和视觉焦点，accent（灰色）用于辅助信息层级
- **字重对比**：标题 font-black (900) vs 正文 400 vs 标签 font-bold (700) + uppercase + tracking-widest
- **暗色层次**：通过 surface/bg/header/border 四级暗色建立微妙深度
