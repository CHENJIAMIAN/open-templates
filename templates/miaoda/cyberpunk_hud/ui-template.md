# Cyberpunk HUD · 赛博光幕 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 赛博朋克 x 军事级 HUD（抬头显示器） — 冷峻高科技终端操作系统氛围
- **Visual Signature**:
  1. 纯黑底色 + 高饱和度霓虹绿唯一色相，模拟 CRT 显示器
  2. CRT 扫描线纹理 + 胶片噪点叠加层
  3. 等宽字体全大写排版 + 方括号装饰语法 `[ 标签 ]`
  4. L 型转角方括号 HUD 边框取代传统圆角
  5. 图片统一 grayscale 灰度去色
- **Emotional Tone**: 工业化、机械感、矩阵终端压迫感
- **Design Style**: Double Border 双层边框 x Dot Matrix 点阵

---

## 配色方案

**方案**: 自定义（Cyberpunk Terminal + Neon Green）
**色彩关系**: 纯黑底 + 霓虹绿单色透明度层级系统
**主题**: 深色

> **配色设计理由**：纯黑背景模拟终端环境，霓虹绿作为唯一色相通过 10 级透明度建立严格视觉层次，拒绝第二色相，所有信息层级仅靠透明度和字号区分。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(0 0% 4%) | 页面主背景（近纯黑 #0a0a0a） |
| surface | hsl(0 0% 7%) | 卡片/面板底色（#111 或 bg-black/50） |
| header | hsl(0 0% 0%) | 导航栏滚动后背景（bg-black/90） |
| text | hsl(0 0% 100%) | 标题、姓名等高层级白色文字 |
| textMuted | hsla(137 100% 50% / 0.4) | 低透明度绿，标签、辅助说明、脚注 |
| primary | hsl(137 100% 50%) | 霓虹绿：主交互、主按钮、激活边框、品牌标识 |
| accent | hsla(137 100% 50% / 0.1) | 极弱绿色着色：hover 底色、区段微着色 |
| border | hsla(137 100% 50% / 0.3) | 卡片边框（HUD 边框线） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(137 100% 50%)`：主按钮填充、激活边框、品牌标识、CTA 反转区段底色，视觉权重最高
**Accent（弱强调色）** — `hsla(137 100% 50% / 0.1)`：hover 微光底色、区段极弱背景着色，权重低于 primary

### 衍生规则

- **透明度层级**：primary 通过 10 级透明度 (5%~100%) 建立完整视觉层次
- **正文描述**：primary/80 透明度，保持绿色基调同时降低亮度
- **边框默认**：primary/30，卡片描边；primary/50，标签/Badge 边框
- **反转色**：纯黑 hsl(0 0% 0%) 用于 primary 填充区域上的文字
- **发光效果**：`text-shadow: 0 0 8px hsla(137 100% 50% / 0.6)` 模拟 CRT 自发光

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 主交互 | hsl(137 100% 50%) | 同 primary（霓虹绿） |
| 反转前景 | hsl(0 0% 0%) | primary 底色上的文字 |
| CRT 发光 | hsla(137 100% 50% / 0.6) | text-shadow 发光 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 主字体 / 正文 / 代码 | `Space Mono, monospace` |
| 标题（黑体） | `Inter, Space Mono, monospace` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 品牌名 | `text-xl font-black tracking-widest` + scanline 发光 | primary |
| 页面主标题 H1 | `text-6xl ~ text-8xl font-black tracking-tighter uppercase leading-none` + scanline | text |
| 区段标题 H2 | `text-5xl ~ text-6xl font-black tracking-tighter uppercase` + scanline | text |
| 卡片标题 H3 | `text-xl ~ text-2xl font-black tracking-[0.2em] uppercase` | text |
| 区段小标签 | `text-[10px] font-bold tracking-[0.3em] ~ tracking-[0.5em] uppercase` | primary |
| 导航链接 | `text-[10px] font-bold tracking-[0.2em] uppercase` 方括号包裹 | primary/70 |
| 正文段落 | `text-lg ~ text-xl font-mono tracking-tight leading-relaxed` 前缀 `[系统信息]:` | primary/80 |
| 统计数字 | `text-3xl ~ text-5xl font-black` | primary |

---

## 页面结构

> HUD 终端布局 — 全大写等宽排版，方括号语法，扫描线叠加。

```
Navbar（fixed 顶部，max-w-[1400px] px-8）
  → Hero（全屏高度，max-w-7xl 居中）
  → Stats 横条（grid 2→4 列）
  → Features 功能区（grid 1→2→3 列）
  → AI Demo 交互区（grid 1→2 列）
  → Testimonials 用户证言（grid 1→3 列）
  → Pricing 定价（grid 1→3 列）
  → CTA 全宽反转区（绿底黑字，max-w-4xl）
  → Footer（grid 1→4 列）
```

| 层级 | 最大宽度 | 用途 |
|-----|---------|-----|
| 宽幅 | max-w-[1400px] | Navbar/Footer/Features/Stats |
| 标准 | max-w-7xl (1280px) | Hero/AI Demo/Testimonials/Pricing |
| 窄幅 | max-w-4xl (896px) | CTA 强调区段 |
| 文字窄幅 | max-w-2xl (672px) | 副标题描述段 |

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区段纵向间距 | `py-24` (96px) |
| Hero | `pt-40 pb-20` |
| CTA | `py-32` (128px) |
| 区段标题与内容 | `mb-20` (80px) |
| 卡片内间距 | `p-8` ~ `p-12` (32-48px) |

### 圆角与阴影

> Design DNA: HUD Terminal — `sharp (0px)` + L 型转角方括号装饰

所有卡片/按钮: **零圆角**（唯一例外：滚动条 thumb 3px）
HUD 转角: `position: absolute; width: 10px; height: 10px; border: 2px solid primary`，四角 L 型方括号

阴影: 关键元素 `shadow-[0_0_50px_hsla(137,100%,50%,0.1)]` 霓虹绿发光；`text-shadow: 0 0 8px hsla(137,100%,50%,0.6)` 文字发光

### CRT 特效

| 效果 | 实现 |
|-----|-----|
| 扫描线叠加 | `fixed inset-0 z-100 pointer-events-none`，4px 横线 + 3px RGB 竖线 |
| 噪点纹理 | `fixed inset-0 z-99 opacity-0.05 pointer-events-none` stardust 图案 |
| 扫描动画 | `2px h-full` 绿色线条，`animation: scan 4s linear infinite` |
| 图片去色 | 所有图片 `grayscale` + `contrast-125` |
| 选中态 | `selection:bg-[primary色] selection:text-black` |

### Hover 交互

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 微光 | HUD 卡片 | `hover:bg-[primary色]/5` |
| 放大 | 按钮 | `hover:scale-105 active:scale-95` |
| 反转 | CTA 区段 | `bg-[primary色] text-black`，按钮 `bg-black text-[primary色]` |

---

## 组件规范

### HUD 边框卡片

`border border-[primary色]/30 bg-[#111] relative p-8 ~ p-12`，四角 L 型方括号（corner-tl/tr/bl/br `10px x 10px border-2 solid primary`）
Hover: `hover:bg-[primary色]/5`；高亮卡片: `border-[primary色] shadow-[0_0_50px_hsla(137,100%,50%,0.1)] bg-[primary色]/5`

### 按钮

主: `bg-[primary色] text-black font-black uppercase tracking-[0.2em] px-10 py-5` 零圆角
次: `border border-[primary色]/50 text-[primary色] hover:bg-[primary色]/10` 零圆角
全宽: `w-full py-5 tracking-[0.3em] ~ tracking-[0.4em]`
禁用: `bg-[primary色]/20 text-[primary色]/40`

### 导航栏

`fixed top-0 z-[110]`，未滚动 `py-6 bg-transparent`，滚动后 `py-4 bg-black/90 border-b border-[primary色]/30 transition-all duration-300`

### 标签 / Badge

`inline-block px-4 py-1 border border-[primary色]/50 bg-[primary色]/10 text-[primary色] text-[10px] font-bold tracking-[0.3em] uppercase`

### 图标容器

`w-16 h-16 border border-[primary色]/30 flex items-center justify-center text-[primary色]`
Hover: `group-hover:bg-[primary色] group-hover:text-black transition-all`

### 分隔线

水平: `h-px w-full bg-[primary色]/20 shadow-[0_0_15px_hsla(137,100%,50%,0.2)]`
左侧强调: `border-l-2 border-[primary色]`
列表方形圆点: `w-1.5 h-1.5 bg-[primary色] mr-3`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 三列网格、双栏对称、HUD 转角装饰显示 (hidden lg:block) |
| >= 768px (md) | 双列/三列网格启用，导航链接显示 (hidden md:flex) |
| >= 640px (sm) | 按钮横向排列 (sm:flex-row sm:space-x-6) |
| < 768px | 单列布局，导航隐藏，按钮全宽堆叠 |

---

## 风格建议

- **全大写 + 宽字距**：所有标签、导航、按钮统一 `uppercase` + `tracking-widest`/`tracking-[0.3em]` 强化机械工业感
- **方括号语法**：导航链接与区段标签使用 `[ 文字 ]` 包裹，模拟终端命令行界面
- **零圆角 + HUD 转角**：全局不使用 border-radius，以 L 型方括号装饰替代圆角
- **Primary / Accent 分工明确**：primary（霓虹绿）用于所有交互和视觉焦点，accent（极弱绿色）仅用于 hover 微光底色
- **单色透明度层次**：通过 primary 的 10 级透明度建立严格视觉层级，不引入第二色相
- **CTA 反转区段**：页面末尾使用完整色彩反转（绿底黑字），形成强烈视觉对比
