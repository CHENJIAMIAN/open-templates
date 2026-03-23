# Washi Ink Elegance · 和纸墨韵 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Washi Ink Elegance — 日本传统"和纸"与"墨书"灵感，居酒屋质朴温度与高级料亭克制优雅融合
- **Design Style**: Warm Natural 自然暖调 x Editorial 经典排版 — 和纸纹理 + 竖排书法 + 朱砂/烫金点睛 + 大面积留白
- **Visual Signature**:
  1. 和纸纹理背景（natural-paper 纹理叠加，opacity 0.03），纸质温度感
  2. 竖排大字标题 writing-mode: vertical-rl，书法仪式感
  3. 朱红左边框（8px/4px/2px），仿印章/朱批标记
  4. 旋转菱形图标（rotate-45），家纹 kamon 现代演绎
  5. 照片倾斜陈列（rotate-1/2/-3），拍立得/明信片随意美感
  6. 几乎全方角（sharp corners），模拟纸张与木质硬朗边缘
- **Emotional Tone**: 克制、优雅、温度感、传统现代融合
- **关键词**: 和纸质感 / 墨色留白 / 朱砂点缀 / 竖排书法 / 极简奢华

---

## 配色方案

**方案**: 自定义 — Washi Ink（浅色 → 深色渐变叙事）
**色彩关系**: 和纸白底 + 朱砂红/烫金点缀 + 浓墨深区过渡
**主题**: 混合（浅色 Hero → 深色 Menu → 漆黑 Footer）

> **配色设计理由**：和纸白营造温暖留白空间，朱砂红和烫金作为仅有的两种彩色保持"点睛"稀缺性，页面色调从白天到夜晚渐次加深形成叙事感。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(37 47% 95%) | 页面主背景 — 和纸白 |
| surface | hsl(0 0% 100%) | 卡片底色、模态弹窗背景 |
| header | hsl(0 0% 7%) | Menu 深色区域背景 — 浓墨 |
| text | hsl(0 0% 10%) | 标题、正文、导航 — 墨色 |
| textMuted | hsl(0 0% 62%) | 副标题、描述文本（gray-500） |
| primary | hsl(0 50% 47%) | 主交互色：朱砂红 — 品牌标识、边框高亮、CTA hover |
| accent | hsl(41 49% 56%) | 弱强调色：烫金 — 价格数字、分类标题、hover 状态 |
| border | hsl(0 0% 93%) | 极淡分割线（gray-100） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(0 50% 47%)`：品牌菱形图标、粗左边框、标签、CTA hover 填充，视觉权重最高
**Accent（弱强调色）** — `hsl(41 49% 56%)`：价格数字、分类标题、菜名 hover、滚动条、AI 模块边框，权重低于 primary

### 衍生规则

- **和纸底色**：hsl(37 47% 95%) 带微黄暖调，区别于纯白的冷感
- **深色区域**：header hsl(0 0% 7%) → Footer hsl(0 0% 6%)，渐次加深
- **深色区内层级**：通过 white/5, white/10, white/20 透明度递进，非不同颜色
- **朱红/金色仅用于点缀**：保持稀缺性，不大面积平铺
- **灰阶辅助**：gray-400/500/600 系列用于副标题、描述、Footer 正文

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 品牌朱红 | hsl(0 50% 47%) | 同 primary |
| 烫金高亮 | hsl(41 49% 56%) | 同 accent |
| 休息日标红 | hsl(0 50% 47%) | Footer 休息日 |
| 深色区 hover | hsla(0 0% 100% / 0.1) | 菜单项 hover |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;700&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 衬线 / 标题 | `Noto Serif SC, serif` (.font-serif) |
| 无衬线 / 正文 | `Noto Sans SC, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| Hero 主标题 | `text-7xl md:text-9xl font-bold writing-mode:vertical-rl tracking-[0.35em]` | text |
| 大区块标题 | `text-4xl md:text-5xl font-serif` | text |
| 次级标题 | `text-3xl font-serif` | text |
| 正文标题（菜名） | `text-lg font-serif` | text |
| 正文 | `text-sm` | text / textMuted |
| 辅助文字 | `text-xs tracking-widest` | accent / textMuted |
| 微标注 | `text-[10px] / text-[9px] / text-[8px] tracking-[0.4em] uppercase` | textMuted |
| 价格 | `text-xl font-serif` | accent 金色 |

### 特殊排版

竖排书写 `writing-mode: vertical-rl` | 等宽数字 `tabular-nums` | 文本截断 `line-clamp-2` | 字距从 `tracking-tighter` 到 `tracking-[0.8em]` 分级使用

---

## 页面结构

> 和纸白 → 浓墨黑渐次加深的叙事式单页，竖排标题是灵魂。

```
Header (Fixed, 透明 → 白磨砂 bg-white/90 backdrop-blur-md)
  → Hero Section (100vh, 和纸底色)
      竖排标题 + 白磨砂底板 + 朱红左边框 + 拍立得卡片组 + 营业时间
  → Featured Section (和纸纹理背景)
      居中标题 + 朱红分割线 + 3列 aspect-[3/4] 卡片
  → Menu Section (深色 #111 背景)
      sticky 分类侧边栏 + 菜品网格 2列
  → Footer (漆黑 #0f0f0f 背景, 4列网格)
  → Scroll-to-top FAB (固定右下角)
```

| 元素 | 样式 |
|-----|-----|
| 容器 | `container mx-auto px-6` |
| Hero 高度 | `h-screen` |
| 区块纵向间距 | `py-24` |
| 侧边栏/内容 | `lg:w-1/5` / `lg:w-4/5` |
| Footer 列 | `grid-cols-1 md:grid-cols-4` |

---

## 视觉风格

### 圆角与阴影

> Design DNA: Sharp Corners 方角为主 — 模拟纸张与木质硬朗边缘

| 元素 | 圆角 | 阴影 |
|-----|-----|-----|
| 大部分卡片/模态 | `rounded-sm` (2px) | `shadow-xl` → hover `shadow-2xl` |
| Hero 海报底板 | 无 | `shadow-[40px_40px_100px_rgba(0,0,0,0.1)]` |
| 拍立得卡片 | 无 | `shadow-2xl` |
| 模态框 | `rounded-sm` | `shadow-[0_0_100px_rgba(0,0,0,0.5)]` |
| Scroll-to-top | `rounded-full` | `shadow-lg` |

### 边框（核心视觉符号）

| 元素 | 样式 |
|-----|-----|
| Hero 海报板左侧 | `border-l-[8px] border-primary` — 粗朱红左边框 |
| 菜单标题左侧 | `border-l-4 border-primary` |
| 分类按钮左侧 | `border-l-2`，活跃 primary / 默认 transparent |
| AI 面板上边 | `border-t-4 border-accent` — 金色顶部线 |
| CTA 按钮 | `border border-primary` — 镂空描边 |
| 装饰文字框 | `border border-accent/40` |
| 菜品底线 | `border-b border-white/10` |

### 纹理与材质

```css
.washi-texture { background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png'); }
/* 叠加层 opacity: 0.03 — 几乎不可见但增加触感 */
/* 图片 filter: brightness(0.98) — 略微压暗 */
```

### 透明度规范

导航栏滚动后 `bg-white/90 backdrop-blur-md` | Hero 海报底板 `bg-white/90 backdrop-blur-md` | 右上装饰框 `bg-white/20 backdrop-blur-xl` | 菜单项 hover `bg-white/10` | AI 面板 `bg-white/80`

### Hover 交互

Featured 卡片图片 `scale-110 duration-700` + 底部信息上移 `translate-y-4→0`
菜品列表图片 `scale-110 duration-700` + 菜名→accent 金色
分类侧边栏 活跃 `border-l-2 border-primary bg-white/10 translate-x-1`
模态 CTA `bg-[#1a1a1a] hover:bg-primary` | Scroll-top `bg-accent hover:bg-primary scale-110`

### 动画

所有过渡 500ms-700ms 长时长 | 图片缩放 `duration-700` | 入场动画 `fadeInLeft / fadeInRight / fadeInUp / scaleIn` 带级联延迟

---

## 组件规范

### 导航栏（Header）

`fixed top-0 z-50 transition-all duration-300`
初始 `bg-transparent py-6` → 滚动后 `bg-white/90 backdrop-blur-md py-3 shadow-sm`
品牌菱形 `w-8 h-8 bg-primary rotate-45` 内嵌反向旋转白色衬线文字
导航链接衬线体 `tracking-tighter` hover 变金色 | CTA 朱红描边 hover 填充

### Featured 特色卡片

`aspect-[3/4] bg-white shadow-xl hover:shadow-2xl`
标签 左上角 primary 底色 `text-[10px] font-serif tracking-widest`
日文名 accent 金色 `text-xs tracking-widest` | 价格 白色衬线 `text-xl`

### Menu 菜品列表项

Flex 横向 `w-28 h-28 rounded-sm` 图片 + 右侧信息
`hover:bg-white/5 hover:border-white/10` | Chef Choice 徽章 primary 底色 `text-[8px]`
菜名 hover→accent 金色 | 价格 accent 衬线 | 描述 `text-xs gray-400 italic line-clamp-2`

### 分类侧边栏

`sticky top-32` | 按钮 `py-4 px-8 font-serif text-sm tracking-widest`
活跃 `border-l-2 border-primary bg-white/10 text-white translate-x-1`
移动端水平滚动隐藏滚动条

### 模态弹窗

遮罩 `bg-black/95 backdrop-blur-md` | 容器 `bg-[hsl(37,47%,95%)] max-w-4xl rounded-sm`
左右分栏（md）| 标签 primary 描边 `tracking-[0.4em]` | AI 模块 `bg-white/80 border-t-4 border-accent`
底部 CTA `bg-[#1a1a1a] hover:bg-primary tracking-widest uppercase`

### Footer

`bg-[hsl(0,0%,6%)]` | 4列网格 品牌区占2列 | 标题 `uppercase tracking-widest text-sm font-serif`
社交按钮 `w-10 h-10 rounded-full border border-gray-700 hover:bg-white hover:text-black`
版权 `text-xs tracking-widest text-gray-600 border-t border-gray-800`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|---------|
| >= 1024px (lg) | 侧边栏纵向 sticky；右上装饰框显示 |
| 768px ~ 1023px (md) | Featured 3列；Menu 2列；Footer 4列；拍立得显示；模态左右分栏 |
| < 768px | 单列；导航隐藏；拍立得隐藏；侧边栏横向滚动 |

---

## 风格建议

- **方角为核心辨识度**：除圆形按钮外不引入大圆角，保持和纸/木质材质隐喻
- **Primary / Accent 分工明确**：primary（朱砂红）用于品牌标识和左边框高亮，accent（烫金）用于价格和 hover 变色
- 朱红与金色克制使用，保持"点睛"的稀缺性
- 竖排文字 `writing-mode: vertical-rl` 搭配超宽 tracking 是最具辨识度的排版手法
- 纹理 `.washi-texture` 虽几乎不可见但赋予"可触摸"温度感
- 动画要慢而优雅：500ms-700ms，ease-out 缓动，级联延迟
- 分割线代替边框：单边细线（1-2px）优先于完整四边框
