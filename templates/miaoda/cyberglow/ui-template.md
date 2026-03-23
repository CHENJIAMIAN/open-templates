# CyberGlow · 赛博荧光 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 深空赛博朋克 (Deep-Space Cyberpunk) — 极深蓝黑底色，高饱和度青色荧光 (Cyan Neon) 作为唯一主色调，强烈明暗对比与科技未来感
- **Visual Signature**:
  1. 毛玻璃卡片 (Glassmorphism) + 径向辉光 (Radial Glow) + 40px 网格背景 (Grid Overlay)
  2. 大面积留黑，局部以 `cyber-cyan` 荧光色点亮关键数据
  3. Orbitron 几何等宽字体 + 超大核心指标数字
  4. 递增高度柱状展示卡片 + 径向装饰圆环
- **Emotional Tone**: 冷静、精密、高科技感；信息密度高但通过大量留白与层级分明的排版保持可读性
- **Design Style**: Frosted Glass 毛玻璃 x Grid 网格

---

## 配色方案

**方案**: 自定义（Deep-Space Cyberpunk + Cyan Neon）
**色彩关系**: 极深蓝黑底 + 青色霓虹高对比单色辉光
**主题**: 深色

> **配色设计理由**：极深海军蓝背景营造太空深邃感，青色荧光作为唯一高饱和色形成精密科技氛围，所有装饰光效围绕此单色展开，确保视觉统一。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(213 60% 6%) | 页面底色（极深海军蓝） |
| surface | hsla(0 0% 100% / 0.03) | 卡片/面板背景（毛玻璃半透明） |
| header | hsl(213 60% 6%) | Header 区域背景（同底色 + 径向渐变辉光叠加） |
| text | hsl(0 0% 100%) | 主文字颜色 |
| textMuted | hsl(220 16% 62%) | 次级文字、标签、说明文字 |
| primary | hsl(186 100% 50%) | 主交互色：数据高亮、进度条、按钮主色、边框装饰 |
| accent | hsl(214 100% 40%) | 弱强调色：背景辉光点缀（径向渐变 8% 不透明度） |
| border | hsla(0 0% 100% / 0.08) | 卡片默认边框 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(186 100% 50%)`：数据高亮、进度条填充、按钮主色、装饰竖条辉光，视觉权重最高
**Accent（弱强调色）** — `hsl(214 100% 40%)`：背景径向渐变辉光、次级装饰，权重低于 primary

### 衍生规则

- **背景色**：极低明度蓝黑 hsl(213 60% 6%)，与 primary 荧光形成极端对比
- **文字色**：纯白 hsl(0 0% 100%)，深色底高可读性
- **次要文字**：灰蓝 hsl(220 16% 62%)，介于白与黑之间提供层级
- **辉光阴影**：基于 primary 的不同透明度 (0.3~0.4) 构建发光层级
- **毛玻璃层级**：通过白色透明度差异 (0.03~0.05) 区分面板深度

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 主交互/高亮 | hsl(186 100% 50%) | 同 primary（cyber-cyan） |
| 风险/阻塞 | hsl(0 100% 65%) | 红色告警 |
| P0 优先级 | hsl(0 74% 62%) | Tailwind red-400 |
| P1 优先级 | hsl(48 97% 63%) | Tailwind yellow-400 |

### 特殊光效阴影

| Token | 值 | 用途 |
|-------|---|------|
| shadow-cyan-glow | `0 0 20px hsla(186 100% 50% / 0.4)` | 按钮/进度条/装饰线青色辉光 |
| shadow-red-glow | `0 0 20px hsla(0 100% 65% / 0.3)` | 告警区域红色辉光 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| Display / 标题 / KPI | `Orbitron, monospace` |
| Body / 正文 | `Inter, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面主标题 | `text-3xl sm:text-4xl font-orbitron font-bold text-white` | text |
| 区块标题 | `text-xl font-orbitron font-bold` ~ `text-2xl font-orbitron font-bold` | text |
| 核心数据数字 | `text-5xl font-orbitron font-bold` | primary / 动态色 |
| 状态子标题 | `text-lg font-semibold text-white/90 uppercase tracking-widest` | text |
| 次级标签 | `text-sm text-cyber-muted` | textMuted |
| 正文 | `text-sm text-gray-300` | textMuted 变体 |
| 脚注/微标签 | `text-[10px] uppercase tracking-widest` ~ `tracking-[0.25em]` | primary / textMuted |
| 优先级标签 | `text-[10px] font-bold px-2 py-1 rounded` | 按优先级变色 |

---

## 页面结构

> 毛玻璃深空布局 — 大面积留黑 + 径向辉光 + 网格底纹分层。

```
Header（左侧周次标签 · 右侧英文标题，border-b 分隔）
  → Hero Card（glass-card rounded-[2rem]，主标题 + 副标题 + 3-col 状态网格）
  → 2-col Split View（lg:grid-cols-2 gap-8，表格卡片 + 风险里程碑卡片）
  → AI 摘要卡片（全宽 glass-card）
  → Bottom Summary（3-col 递增高度柱状卡片 h-40/h-56/h-72）
  → Footer（居中微标签）
```

容器: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10`

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 区块间距 | `mb-8` (32px) |
| 卡片内边距 | `p-8 sm:p-12` (32/48px) |
| 标题与内容间距 | `mb-6` (24px) |
| Grid 列间距 | `gap-8` / `gap-12` (32/48px) |
| Header 底部间距 | `mb-10` (40px) |

### 圆角与阴影

> Design DNA: Frosted Glass — 大圆角 + 辉光阴影

| 元素 | 圆角 |
|-----|-----|
| Hero / 大卡片 | `rounded-[2rem]` (32px) |
| 标准卡片 | `rounded-3xl` (24px) |
| 子卡片/内嵌块 | `rounded-2xl` (16px) |
| 按钮 | `rounded-xl` (12px) |
| 进度条/装饰线 | `rounded-full` |

阴影: 按钮/标题装饰竖条/进度条 `shadow-cyan-glow`，卡片 hover `hover:shadow-cyan-glow/5`

### 背景与特效

| 效果 | 实现 |
|-----|-----|
| 页面辉光 | `radial-gradient(circle at 10% 20%, hsla(186 100% 50% / 0.1), transparent 40%)` + `radial-gradient(circle at 90% 80%, hsla(214 100% 40% / 0.08), transparent 40%)` |
| 网格纹理 | 40px x 40px 网格线，`hsla(0 0% 100% / 0.01)` |
| 毛玻璃卡片 | `background: hsla(0 0% 100% / 0.03); backdrop-filter: blur(12px); border: 1px solid hsla(0 0% 100% / 0.08)` |
| 装饰圆环 | 绝对定位，`border: 1px solid hsla(186 100% 50% / 0.1)`，border-radius: 50%，400-600px |

### Hover 交互

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 辉光 | 卡片、按钮 | `hover:shadow-cyan-glow/5 transition-all` |
| 放大 | 按钮、数据数字 | `hover:scale-105 transition-all duration-300` |
| 背景色 | 表格行 | `hover:bg-white/5 transition-colors` |
| 柱状卡片 | 底部展示区 | `group-hover:bg-cyber-cyan/10 transition-all` |

### 动画

- 按钮 hover: `hover:scale-105`，active: `active:scale-95`
- 进度条: `transition-all duration-1000 ease-out`
- 装饰圆环: `group-hover:scale-110 transition-transform duration-700`
- AI 结果: `animate-in fade-in slide-in-from-top-4 duration-500`
- 选中色: `selection:bg-[primary色] selection:text-black`

---

## 组件规范

### Glass Card（毛玻璃卡片）

`bg-white/3 backdrop-blur-[12px] border border-white/8 rounded-3xl p-8` 或 `rounded-[2rem] p-8 sm:p-12`

### 按钮

| 状态 | 样式 |
|-----|-----|
| Default | `bg-[primary色] text-black px-8 py-3 rounded-xl font-bold font-orbitron tracking-wider shadow-cyan-glow` |
| Hover | `hover:bg-white hover:scale-105` |
| Disabled | `bg-gray-700 cursor-not-allowed`（无阴影） |

### 区块标题装饰

竖条 `w-1.5 h-8 bg-[primary色] mr-4 rounded-full shadow-cyan-glow` + `text-xl font-orbitron font-bold`

### 数据表格

表头: `text-cyber-muted border-b border-white/5 font-normal pb-4 text-sm`
行: `divide-y divide-white/5`，hover `hover:bg-white/5 transition-colors`

### 优先级 Badge

P0: `bg-red-500/20 text-red-400 px-2 py-1 rounded text-[10px] font-bold`
P1: `bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-[10px] font-bold`

### 告警/阻塞卡片

`border border-[danger色]/30 bg-[danger色]/5 p-6 rounded-2xl`，内部条目 `border-l-2 border-[danger色]/20 pl-4 py-1`

### 进度条

轨道: `h-2 w-full bg-white/10 rounded-full`
填充: `h-full bg-[primary色] shadow-cyan-glow rounded-full transition-all duration-1000 ease-out`

### 递增柱状卡片

3 列网格，高度递增 `h-40`/`h-56`/`h-72`，`glass-card rounded-t-2xl border-t-2 border-t-[primary色] shadow-cyan-glow/20`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 主区域 3 列 lg:grid-cols-3，分栏 2 列 lg:grid-cols-2 |
| >= 640px (sm) | Header 水平排列，大卡片 sm:p-12，底部柱状 sm:grid-cols-3 |
| < 640px | 单列布局 grid-cols-1，标题 text-3xl，内边距 px-4 p-8 |

---

## 风格建议

- **单色辉光体系**：仅以 primary 青色驱动所有视觉焦点，装饰光效（辉光阴影、径向渐变、装饰圆环）围绕此色展开
- **毛玻璃分层**：信息层级通过透明度差异和 backdrop-filter blur 区分，避免不透明实色背景
- **Primary / Accent 分工明确**：primary（青色荧光）专用于主交互和数据高亮，accent（深蓝）仅用于背景辉光点缀
- **Orbitron 字体强化数据层级**：数字和关键标题用 Orbitron 突出科技感，正文用 Inter 保持可读性
