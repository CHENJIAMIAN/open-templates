# Verdant Cream · 翠绿奶油 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 有机极简（Organic Minimal）— 深墨绿 + 奶油米色双色调，超大圆角 + 大胆字重对比 + 充裕留白
- **Design Style**: Muji 极简 x Warm Natural 自然暖调 — 温润双色调叙事 + 胶囊按钮 + 幽灵文字装饰 + 50/50 分屏
- **Visual Signature**:
  1. 深墨绿作为唯一强调色贯穿全局，奶油色铺底
  2. font-black(900) 超大字重标题 + tracking-tighter 极紧字距
  3. 全大写 tracking-widest 按钮与标签，高端调性
  4. 15vw 超大半透明幽灵文字背景装饰
  5. 50/50 左右分屏：大幅图片 + 文字各占半屏
  6. 胶囊按钮(rounded-full) + 超大圆角图片容器(rounded-3xl)
- **Emotional Tone**: 温暖、克制、精致、高端有机感
- **Keywords**: 墨绿强调 / 奶油底色 / 超大圆角 / 杂志式分屏 / 幽灵文字 / 胶囊按钮 / 温暖克制

---

## 配色方案

**方案**: 自定义（Verdant Green + Cream）
**色彩关系**: 奶油米色底 + 深墨绿唯一强调色
**主题**: 浅色（暖调）

> **配色设计理由**：奶油色底赋予页面温暖感（不可替换为纯白），深墨绿作为唯一色相通过透明度变体（5%装饰 / 100%按钮）实现色彩纯粹性，白色仅用于卡片和导航栏形成底色与容器的微妙层次。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(36 14% 93%) | 页面整体奶油米色底色 |
| surface | hsl(0 0% 100%) | 白色卡片、导航栏底色 |
| header | hsl(153 100% 19%) | 深墨绿主色，CTA 按钮、进度条 |
| text | hsl(163 30% 16%) | 标题、核心文案、大数值 |
| textMuted | hsl(215 14% 62%) | 描述文字、次要标签 |
| primary | hsl(153 100% 19%) | 主交互色：CTA、进度条、导航 Logo |
| accent | hsl(156 33% 87%) | 弱强调色：浅绿面板、页脚、hover 底色 |
| border | hsl(210 20% 96%) | 极浅边框线、导航底线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(153 100% 19%)`：深墨绿，CTA 按钮、进度条、导航 Logo、选中态，视觉权重最高
**Accent（弱强调色）** — `hsl(156 33% 87%)`：浅绿面板底色、页脚背景、选项卡 hover 底色

### 衍生规则

- **奶油底色不可替换**：bg hsl(36 14% 93%) 是风格灵魂，白色仅用于卡片容器
- **Primary 透明度变体**：5% 用于幽灵文字装饰 / 5% 用于 outline 按钮 hover / 100% 用于 CTA
- **深色 hover**：text hsl(163 30% 16%) 作为 primary 按钮 hover 深色态
- **字重即层级**：font-black(900) 标题 -> font-bold(700) 按钮标签 -> 不使用 regular(400)

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 评分星标 | hsl(48 96% 53%) | yellow-500 |
| 标签边框 | hsl(220 13% 87%) | gray-200 |
| 退出 hover | hsl(220 9% 34%) | gray-600 |

### CSS 自定义属性

```css
:root {
  --green: hsl(153 100% 19%);
  --dark: hsl(163 30% 16%);
  --light-green: hsl(156 33% 87%);
  --cream: hsl(36 14% 93%);
}
```

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Noto+Sans+SC:wght@400;700;900&display=swap');
font-family: 'Inter', 'Noto Sans SC', sans-serif;
```

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 超大标题 | `text-6xl md:text-8xl font-black leading-none tracking-tighter` | text |
| 价格突出 | `text-4xl font-black` | text |
| 问题标题 | `text-3xl font-black` | text |
| Logo | `text-xl font-black tracking-tighter` | primary |
| 结果描述 | `text-lg font-bold` | text |
| 按钮文字 | `text-sm font-bold uppercase tracking-widest` | white / primary |
| 标签 | `text-xs font-bold uppercase tracking-widest` | — |
| 微文字 | `text-[10px] font-bold uppercase tracking-[0.3em]` | primary / textMuted |

### 排版特征

- **字间距极端化**：标题 tracking-tighter(-0.05em) / 按钮 tracking-widest(0.1em) / 页脚 tracking-[0.3em]
- **全大写策略**：导航链接、按钮、微标签、页脚标语均 uppercase
- **行高控制**：大标题 leading-none(1.0) / 段落 leading-relaxed(1.625)
- **字重落差即层级**：font-black(900) -> font-bold(700)，不使用 regular(400) 或 medium(500)

---

## 页面结构

> 有机极简 — 多视图单页应用，50/50 分屏 + 幽灵文字装饰

### 首屏（Hero）视图

```
[幽灵文字装饰层] absolute inset-0，15vw primary/5 超大装饰文字
Nav: Logo 左 + 导航链接 | CTA 按钮 右（bg-white shadow-sm px-8 py-6）
左右分屏 flex-col md:flex-row
  左 md:w-1/2: 主视觉图片（max-w-md aspect-square rounded-3xl shadow-2xl）
  右 md:w-1/2: 超大标题 + 描述 + CTA 按钮
Footer: bg-accent py-8 text-center 超宽字距标语
```

### 交互视图

`max-w-2xl mx-auto`，进度条 + `grid-cols-1 md:grid-cols-2 gap-4` 选项卡片

### 结果视图

左右分屏：左 bg-accent + 幽灵文字 + 图片 / 右 标签 + 标题 + 描述 + 标签胶囊组 + CTA

容器 `min-h-screen`，移动端 `order-1`/`order-2` 控制堆叠顺序

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 导航内边距 | `px-8 py-6` |
| 主内容内边距 | `px-8 md:px-24` / `p-12 md:p-24` |
| 选项网格间隙 | `gap-4` |
| Quiz 最大宽度 | `max-w-2xl` (672px) |

### 圆角体系

> Design DNA: Muji 极简 + 有机圆润

| 元素 | 圆角 |
|-----|------|
| CTA / 标签胶囊 / 进度条 | `rounded-full` |
| 图片容器 | `rounded-3xl` (24px) |
| 选项卡片 | `rounded-2xl` (16px) |

### 阴影体系

| 元素 | 阴影 |
|-----|------|
| 导航 / 选项卡片 | `shadow-sm` |
| 图片容器 | `shadow-2xl` |
| CTA 按钮(结果页) | `shadow-xl` |

### 边框

导航底线(非首屏) `border-b border-gray-100`
选项卡默认 `border: 1px solid transparent`，hover `border-color: var(--green)`
标签胶囊 `border border-gray-200`

### 动效与交互

| 交互 | 效果 |
|-----|------|
| 视图切换 | `fadeIn 0.8s ease-out` |
| CTA hover | `bg-[var(--dark)] scale(1.02) transition 0.2s` |
| 选项 hover | `border-color: var(--green) bg-accent` |
| 进度条填充 | `transition-all duration-500` |
| AI 加载 | `border-4 border-primary border-t-transparent animate-spin` |

### 装饰元素

- **幽灵文字**：`font-size: 15vw`，`font-weight: 900`，`color: rgba(var(--green), 0.05)`，`pointer-events: none`，`user-select: none`，`uppercase`
- **图片风格**：以奶油色 bg 为背景，保持与页面底色视觉统一

---

## 组件规范

### 导航栏

`px-8 py-6 bg-white shadow-sm`（首屏）/ `border-b border-gray-100`（其他）
Logo `font-black text-xl text-primary tracking-tighter`
链接 `text-xs font-bold uppercase tracking-widest opacity-60`，`hidden md:flex`

### CTA 主按钮

`bg-primary text-white rounded-full text-sm font-bold uppercase tracking-widest`
大号 `px-10 py-4`，小号 `px-6 py-2`
Hover `bg-[var(--dark)] scale(1.02)`，禁用 `opacity-50`

### Outline 按钮

`border 1px solid var(--green) text-primary rounded-full font-bold uppercase tracking-widest text-sm px-8 py-4`
Hover `bg-[rgba(var(--green),0.05)]`

### 选项卡片

`bg-white rounded-2xl shadow-sm p-6 border: 1px solid transparent`
Hover `border-color: var(--green) bg-accent`
文字 hover `group-hover:text-primary`
布局 `grid grid-cols-1 md:grid-cols-2 gap-4`

### 进度条

轨道 `h-1 w-full bg-gray-200 rounded-full overflow-hidden`
填充 `h-full bg-primary transition-all duration-500`

### 标签胶囊

`px-4 py-2 bg-[var(--cream)] rounded-full border border-gray-200 text-xs font-bold text-[var(--dark)]`
布局 `flex flex-wrap gap-2`

### 图片容器

`w-full max-w-md aspect-square rounded-3xl shadow-2xl overflow-hidden`
结果页 `aspect-[3/4]`

### 页脚

`bg-accent py-8 text-center`
`text-[10px] font-bold uppercase tracking-[0.3em] text-primary`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 768px (md) | 左右分屏 flex-row，图左文右；选项双列；导航链接显示；标题 text-8xl；px-24 |
| >= 640px (sm) | 底部按钮横向 flex-row |
| < 768px | 单列堆叠 flex-col，文字 order-1 在上图片 order-2；标题 text-6xl；p-12 |

---

## 风格建议

- **强调色极度克制**：仅 primary 深墨绿作为唯一色相，需要层次时用透明度变体(5%装饰 / 100%按钮)或 accent 浅绿面板
- **奶油底色不可替换**：hsl(36 14% 93%) 是风格灵魂，赋予页面温暖感，白色仅用于卡片
- **字重落差即层级**：font-black(900) 标题 -> font-bold(700) 按钮，不使用 regular/medium
- **大写 + 宽字距 = 高级感**：所有导航、按钮、微标签、页脚均 `uppercase tracking-widest`
- **50/50 分屏留白**：图文严格 1:1，文字侧 p-12 md:p-24 充裕内边距
- **幽灵文字装饰**：15vw + primary 5% 超大字为视觉签名，必须 pointer-events:none + user-select:none
- **Primary / Accent 分工**：primary（墨绿）专用于 CTA 和视觉焦点，accent（浅绿）用于面板底色和 hover 态
