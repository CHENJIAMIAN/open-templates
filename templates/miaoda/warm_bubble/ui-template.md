# Warm Bubble · 暖调气泡 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Brutalist Editorial — 大字报排版 + 宝丽来卡片 + 网格底纹 + 黄色亮点色
- **Design Style**: Grid 网格 x Double Border 双层边框
- **Visual Signature**:
  1. 超大号粗黑标题（text-6xl ~ text-8xl font-black），全大写 + tracking-tighter
  2. 宝丽来卡片（底部留白 40px + hover 微缩放微旋转）+ 夹子装饰
  3. 网格底纹（40px 间距十字线，opacity-5%）覆盖全局
  4. 主色蓝 + 黄色亮点 + 深色对比面板，三色系统
  5. 厚边框语言（border-4 / border-b-8 / border-b-[16px]）
- **Emotional Tone**: 专业严肃但不沉闷，通过黄色亮点与倾斜动画注入活力

---

## 配色方案

**方案**: Brutalist Editorial + Warm Accent
**色彩关系**: 温暖米白底 + 主色蓝强调 + 黄色亮点标记 + 深色对比
**主题**: 浅色

> **配色设计理由**：米白网格底色营造编辑台隐喻，主色蓝贯穿全局导航与交互，黄色仅用于标签徽章和进度指示形成视觉记忆点。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(42 36% 92%) | 页面背景（温暖米白色 #F2F0E4） |
| surface | hsl(0 0% 100%) | 宝丽来卡片、内容面板 |
| header | hsl(227 90% 60%) | Header 背景、主按钮、活跃导航（#3B66F5） |
| text | hsl(0 0% 0%) | 主要文字 |
| textMuted | hsl(215 17% 63%) | 辅助说明文字（slate-400/500） |
| primary | hsl(227 90% 60%) | 主交互色：Header、主按钮、选中态边框（#3B66F5） |
| accent | hsl(51 91% 60%) | 弱强调色：标签徽章、进度填充、CTA 按钮（#F6DE3F） |
| border | hsl(210 14% 83%) | 卡片/选项默认边框（slate-200） |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(227 90% 60%)`：Header 背景、主按钮底色、活跃导航、选中卡片边框，视觉权重最高
**Accent（弱强调色）** — `hsl(51 91% 60%)`：标签徽章、进度条填充、CTA 按钮、装饰贴纸，权重低于 primary

### 衍生规则

- **页面底色**：hsl(42 36% 92%) 温暖米白，搭配网格底纹营造编辑台质感
- **深色面板**：hsl(0 0% 18%) 用于侧边栏头部、统计暗板、形成明暗对比
- **primary 反白**：在 primary 蓝底上使用纯白文字，激活导航 bg-white text-primary
- **border 层级**：border-2 (默认) → border-4 (强调) → border-b-8/border-b-16 (超粗分隔)

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 成功/完成 | hsl(142 71% 45%) | green-500 |
| 错误/危险 | hsl(0 84% 60%) | red-500 |
| 信息 | hsl(217 91% 60%) | blue-500 |
| 警告 | hsl(48 96% 53%) | amber-400 |

---

## 字体排版

```css
font-family: 'Inter', -apple-system, sans-serif;
```

| 用途 | 字体栈 | 字重 |
|-----|-------|------|
| 全局 | Inter, -apple-system, sans-serif | 400/700/900 |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|------|
| Display Hero | `text-6xl md:text-8xl font-black leading-none uppercase` | text |
| Page Title | `text-5xl / text-6xl font-black` | text |
| Section Title | `text-3xl font-black` | text |
| Card Title | `text-2xl font-black` | text |
| Body Large | `text-lg font-bold / font-medium` | text |
| Body | `text-sm / text-base font-black / font-bold` | text |
| Caption | `text-[10px] / text-xs font-black uppercase tracking-widest` | textMuted |
| Watermark | `text-7xl / text-[12rem] font-black opacity-5` | text |

### 文本修饰

全大写 `uppercase` + 紧缩字距 `tracking-tighter` / 加宽字距 `tracking-widest`
无行距 `leading-none`（Display 级）/ 宽松行距 `leading-relaxed`（正文）

---

## 页面结构

> 多视图切换：Dashboard / Learning / Exam / Result，Header 固定顶部。

```
Header (sticky top-0 z-50, bg-primary, shadow-lg)
  [Logo+SubTitle] [Nav Pills] ... [Progress] [CTA]
Main (flex-1, flex-col)
  ├── Dashboard: 全宽 max-w-7xl, 五列卡片网格
  ├── Learning: 左侧边栏 lg:w-80 + 右内容面板 rounded-[40px]
  ├── Exam: 居中单列 max-w-4xl
  └── Result: 垂直居中 max-w-md
```

Header: `bg-[primary] shadow-lg sticky top-0 z-50`，左侧品牌 + 导航胶囊，右侧进度条 + accent CTA
内容区模式: Dashboard `p-6 lg:p-12` / Learning `p-4 lg:p-8` / Exam `p-6 lg:p-12` / Result `p-6`

---

## 视觉风格

### 网格底纹 (Grid Background)

```css
.grid-bg {
  background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### 宝丽来卡片 (Polaroid Card)

`bg-white p-3 pb-10 shadow-xl`，hover `scale(1.02) rotate(1deg) transition-300ms`
图片默认 `grayscale opacity-60`，hover `grayscale-0 transition-700ms`

### 圆角体系

| 圆角值 | 使用场景 |
|--------|---------|
| 40px (`rounded-[40px]`) | 大面板容器（内容面板、考题面板、结果卡片） |
| 24px (`rounded-3xl`) | 侧边栏按钮、课程目录头部、测验区块 |
| 16px (`rounded-2xl`) | 测验选项按钮、成功反馈标签 |
| 12px (`rounded-xl`) | 题号网格按钮、装饰贴纸 |
| `rounded-full` | 所有主按钮、导航胶囊、进度条、头像 |
| 4px (`rounded`) | 内容卡片、夹子装饰 |

### 阴影体系

| 阴影 | 场景 |
|------|------|
| `shadow-lg` | Header |
| `shadow-xl` | 活跃侧边栏按钮、深色统计板 |
| `shadow-2xl` | 主内容面板、考题面板、结果卡片 |
| `shadow-xl shadow-blue-100` | 主色按钮蓝色光晕 |

### 边框装饰

| 样式 | 场景 |
|------|------|
| `border-b-8 border-r-8 border-[primary]` | 行动区域白色面板 |
| `border-b-[16px] border-[primary]` | 考题面板底部厚边框 |
| `border-4 border-black` | 考试进度条轨道、装饰贴纸 |
| `border-2 border-slate-200` | 普通卡片默认态 |
| `border-2 border-[primary]` | 选中态卡片 |

### Hover & 动画

卡片: `transition-all duration-300`，hover 微缩放 + 旋转偏移
按钮: `hover:scale-105 transition-all`
图片: 灰度 → 彩色 `transition-all duration-700`
选中态: 可加 `rotate-6` / `rotate-12` 微偏移
仅关键节点用 `animate-pulse`（活跃指示）和 `animate-bounce`（成功反馈）

---

## 组件规范

### 主按钮

`bg-[primary] text-white px-10 py-5 rounded-full font-black uppercase hover:scale-105 shadow-xl`

### 次要按钮

`bg-white border-4 border-black text-black py-4 rounded-full font-black uppercase hover:bg-black hover:text-white`

### 强调标签按钮

`bg-[accent] text-black px-5 py-2 rounded-full font-black uppercase text-sm hover:brightness-105`

### 导航胶囊

`px-4 py-1.5 rounded-full text-sm font-bold`，激活 `bg-white text-[primary]`，非激活 `hover:bg-white/10`

### 选项卡片

`p-5 rounded-2xl border-2`，默认 `bg-white border-slate-200 hover:border-black`
选中 `bg-[primary] border-[primary] text-white` / 正确 `bg-green-500` / 错误 `bg-red-500`

### 进度条

Header: `bg-white/20 rounded-full w-32 h-2.5`，填充 `bg-white`
考试: `bg-white rounded-full border-4 border-black h-4`，填充 `bg-[accent]`

### 环形分数指示器

SVG 双层圆环: 底圈 `text-slate-100`，前圈 green-500（通过）/ red-500（未通过）
`strokeWidth="12"`, 中心 `text-4xl font-black`

---

## 响应式断点

| 断点 | 适配策略 |
|------|---------|
| < 768px | 单列堆叠；侧边栏占满；标题 text-6xl；导航隐藏；卡片 1 列 |
| >= 768px (md) | 标题 text-8xl；卡片 2-3 列；选项 2 列 |
| >= 1024px (lg) | 双栏布局；导航显示；侧边栏 lg:w-80；内边距 lg:p-12 |
| >= 1280px (xl) | 卡片 5 列；装饰贴纸显示 |

---

## 风格建议

- **排版优先**：超大号粗黑体排版为核心视觉锚点，uppercase + tracking-tighter 是风格标志
- **色彩克制**：primary 蓝贯穿全局，accent 黄仅用于高亮标签和进度，深色用于对比面板
- **卡片质感**：宝丽来卡片底部加宽 padding 和悬停微旋转是关键视觉特征
- **网格肌理**：40px 十字线网格底纹赋予"编辑台"隐喻，始终保持最底层低透明度
- **边框语言**：厚边框（border-4/border-b-8/border-b-16）配合 border-black 或 primary 是粗犷主义核心表达
- **Primary / Accent 分工**：primary 蓝专用于导航与主交互，accent 黄专用于标签徽章与进度高亮
