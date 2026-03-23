# Vintage Sleeve · 复古唱片 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 复古唱片封套 (Vintage Record Sleeve) — 1950-70 年代黑胶唱片内页、手绘海报与活字印刷排版
- **Visual Signature**:
  1. 高饱和色块碰撞（红 x 黄 x 深棕 x 米白）+ 硬边投影（0 blur）
  2. 半色调网点纹理 (halftone dot texture) 叠加
  3. 大字号衬线/无衬线混排 + 手写体装饰引语
  4. 全局无圆角直角矩形（圆形封面/FAB 例外）+ 灰度图片 hover 恢复彩色
  5. 超大水印编号 (opacity 40%) + 微旋转倾斜标签
- **Emotional Tone**: 温暖、质朴、戏剧感怀旧；纸质印刷品数字化复刻的手工感
- **Design Style**: Editorial 经典排版 x Warm Natural 自然暖调

---

## 配色方案

**方案**: 自定义（Vintage Record Sleeve — 丝网印刷四色碰撞）
**色彩关系**: 泛黄老纸底 + 红黄双强调色块撞色 + 深棕边框
**主题**: 浅色

> **配色设计理由**：泛黄老纸色模拟实体唱片封套触感，红色与黄色作为两大强调色交替碰撞形成复古印刷张力，深棕色统一所有边框和文字营造年代感。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(43 39% 86%) | 页面底色（泛黄老纸 #E7E2D0） |
| surface | hsl(0 0% 100%) | 卡片底色、输入框背景 |
| header | hsl(14 34% 13%) | 巨幕页头深色背景（#2D1B14） |
| text | hsl(14 34% 13%) | 正文文字、边框、投影色 |
| textMuted | hsla(14 34% 13% / 0.5) | 分隔线、列表边框低对比变体 |
| primary | hsl(6 66% 53%) | 主交互色：重点区块背景、悬停态、强调文字（红 #D94333） |
| accent | hsl(44 95% 48%) | 弱强调色：高亮区块背景、装饰编号、CTA 按钮底（黄 #F2B705） |
| border | hsl(14 34% 13%) | 全局 2px 实线深色边框 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(6 66% 53%)`：红色区块背景、hover 变色、强调文字、FAB 按钮底色，视觉权重最高
**Accent（弱强调色）** — `hsl(44 95% 48%)`：黄色高亮区块背景、装饰编号、CTA 按钮、步骤 hover 竖线，权重低于 primary

### 衍生规则

- **色块碰撞**：红 primary 与黄 accent 交替出现，互不相邻时由 header 深色边框隔开
- **文字反转**：深色/红色背景上文字反转为 bg 色 hsl(43 39% 86%)
- **无渐变原则**：所有色彩纯色填充，保持丝网印刷感
- **灰度图片**：默认 `grayscale` + halftone 叠加，hover 恢复彩色 `duration-500`
- **硬边投影**：4/6/8/12px 四档，X=Y、blur=0、spread=0，颜色为 text 色

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 主强调/红色块 | hsl(6 66% 53%) | 同 primary |
| 高亮/黄色块 | hsl(44 95% 48%) | 同 accent |
| 深色文字/边框 | hsl(14 34% 13%) | 同 text/border |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 标题/大号装饰 | `Anton, Bebas Neue, sans-serif` (.retro-header) |
| 正文/段落 | `Noto Serif SC, serif` |
| 手写装饰/引语 | `Zhi Mang Xing, cursive` (.handwriting) |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 超大标题 | `text-8xl md:text-9xl .retro-header` | text（深色底反转为 bg） |
| 装饰编号 | `text-8xl .retro-header opacity-40` | text（水印） |
| 板块标题 | `text-6xl .retro-header` | text |
| 区块标题 | `text-3xl ~ text-4xl` | text |
| 子标题 | `text-2xl` | text |
| 正文描述 | `text-xl leading-relaxed font-serif` | text |
| 副标题 | `text-sm tracking-[0.5em] uppercase` | text |
| 辅助文字 | `text-sm / text-xs` | text |
| 手写引语 | `text-2xl .handwriting italic` | text |

---

## 页面结构

> 复古唱片封套布局 — 色块碰撞 + 硬投影卡片 + 活字印刷排版。

```
巨幕页头（bg-[header色] border-y-4 border-[bg色]，超大标题居中）
  → 精选列表区（黄底色块 max-w-3xl，左圆形封面 + 右列表）
  → 推荐卡片网格（max-w-4xl 2 列，红底卡 + 米底卡交替）
  → 页脚（顶部粗边线 + 大号水印 + 手写体短句）
  → 浮动助手按钮（右下角 FAB → 展开聊天面板）
```

| 容器 | 最大宽度 | 用途 |
|-----|---------|-----|
| max-w-3xl | 768px | 列表区块 |
| max-w-4xl | 896px | 推荐网格、页头内容 |
| max-w-5xl | 1024px | 详情页整体 |

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 板块间距 | `mb-20` (80px) |
| 卡片内边距 | `p-6` ~ `p-12` (24-48px) |
| 网格间距 | `gap-8` (32px) |
| 步骤间距 | `space-y-16` (64px) |
| 页面底部留白 | `pb-20` (80px，为浮动按钮) |

### 圆角与阴影

> Design DNA: Print-inspired — `sharp (0px)` + 硬边偏移投影

全局无圆角: 卡片/按钮/输入框/气泡均直角
唯一圆形例外: 封面图 `rounded-full`、FAB 按钮 `rounded-full`、标签胶囊 `rounded-full`

硬投影（0 blur）:

| 场景 | 投影值 |
|-----|-------|
| 普通卡片 | `shadow-[8px_8px_0_0_hsl(14,34%,13%)]` |
| 大面板 | `shadow-[12px_12px_0_0_hsl(14,34%,13%)]` |
| 返回按钮 | `shadow-[4px_4px_0_0_hsl(44,95%,48%)]` |
| 小型卡片/气泡 | `shadow-[4px_4px_0_0_hsl(14,34%,13%)]` |
| 浮动按钮 | `shadow-[6px_6px_0_0_hsl(14,34%,13%)]` |

### 纹理与特效

半色调网点: `radial-gradient(hsl(14,34%,13%) 0.5px, transparent 0.5px); background-size: 4px 4px; opacity: 0.1` 以 `absolute inset-0 pointer-events-none` 叠加
图片处理: `grayscale brightness-110` 默认，`hover:grayscale-0 transition-all duration-500`
旋转倾斜: 封面图 `rotate-[-10deg]`，标签 `rotate-[-5deg]`/`rotate-[5deg]`

### Hover 交互

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 背景叠加 | 列表项 | `hover:bg-white/20 transition-colors` |
| 灰度恢复 | 图片 | `hover:grayscale-0 transition-all duration-500` |
| 颜色填充 | 播放按钮 | `group-hover:bg-[primary色] transition-colors` |
| 竖线显现 | 步骤 | `opacity-0 group-hover:opacity-100 transition-opacity` |
| 按钮变色 | CTA/发送 | `hover:bg-white` / `hover:bg-[primary色] transition-colors` |

---

## 组件规范

### 巨幕页头

`bg-[header色] border-y-4 border-[bg色] py-10 px-4`，内部 max-w-4xl 居中
标题 `text-8xl md:text-9xl .retro-header`，副标题 `tracking-[0.5em] text-sm`

### 列表卡片

`bg-[accent色] border-2 border-[text色] shadow-[8px_8px_0_0_text色]`
左右 flex（移动端上下），列表项 `border-b border-[text色]/30`
CTA: `bg-[text色] text-[accent色] .retro-header`

### 推荐卡片

2 列网格，两种变体: 红底 `bg-[primary色]` / 米底 `bg-[bg色]` 交替
椭圆名牌 `rounded-full .handwriting text-2xl rotate-[-5deg]`
图片 `h-64 grayscale` + halftone 叠加

### 信息卡片

三色变体: 白底 `bg-white` / 黄底 `bg-[accent色]` / 红底 `bg-[primary色]`（红底文字反转为 bg 色）
统一 `border-2 border-[text色] shadow-[8px_8px_0_0_text色] p-6`

### 步骤条目

编号 `text-8xl opacity-40 .retro-header`（水印），标签 `bg-[text色] text-white px-3 py-1 text-sm`
描述 `font-serif border-l-2 pl-6`，步骤间 `border-dashed border-[text色]/20`

### 浮动聊天面板

FAB: `w-20 h-20 rounded-full bg-[primary色] border-4 border-[text色] shadow-[6px_6px]`
面板: `w-80 md:w-96 border-4 border-[text色] shadow-[12px_12px]`
消息气泡: `border-2 border-[text色] shadow-[4px_4px]` 直角

### 按钮系统

主: `bg-[text色] text-[accent色] .retro-header text-xs` 无圆角
返回: `bg-[text色] text-[bg色] shadow-[4px_4px_0_0_accent色] hover:bg-[primary色]`
发送: `bg-[accent色] border-2 border-white hover:bg-white`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 详情页 12 列网格（4+8 分栏），左侧栏 sticky top-8，推荐卡片 2 列 |
| >= 768px (md) | 列表卡片左右排列 flex-row，步骤编号与内容左右排列，页头 text-9xl，聊天面板 w-96 |
| < 768px | 单列布局，列表卡片上下排列，详情页单列堆叠，聊天面板 w-80 |

---

## 风格建议

- **直角美学**：除圆形封面和 FAB 外，所有元素严格直角，这是视觉锚点
- **硬投影层级**：4px 小元素、8px 标准卡片、12px 主面板，方向统一右下，0 blur
- **色块碰撞大胆**：红黄深棕米白四色碰撞是核心张力，避免引入灰色或低饱和色
- **Primary / Accent 分工明确**：primary（红色）用于主交互和视觉焦点，accent（黄色）用于高亮区块和次级强调
- **排版即装饰**：超大水印编号、极宽字距副标题、手写体引语本身就是装饰元素
- **图片统一灰度**：默认 grayscale + halftone 叠加保持复古基调，hover 恢复彩色
