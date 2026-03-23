# Pop Art · 波普艺术 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Pop Art — Roy Lichtenstein / Andy Warhol 美式漫画印刷美学
- **Design Style**: Double Border 双层边框 x Rounded 圆润几何 — 粗黑描边 + 硬偏移阴影 + 超圆角贴纸感 + 半色调圆点纹理
- **Visual Signature**:
  1. 粗重黑色描边 4-8px，漫画分镜轮廓感
  2. 硬阴影偏移（零模糊纯色块），模拟丝网印刷错版
  3. 半色调圆点纹理 Ben-Day dots（radial-gradient 2px/20px）
  4. 超大粗体字 Bangers + 全大写 + 宽字距
  5. 高饱和纯色系（红黄绿蓝 + 纯黑纯白），无渐变
  6. 微倾斜布局 rotate-[-2deg] / rotate-[1deg]，手工拼贴感
  7. 超圆角容器 2rem-4rem，配合粗描边形成"贴纸"质感
- **Emotional Tone**: 活力、趣味、冲击力

---

## 配色方案

**方案**: Pop Art 四原色系
**色彩关系**: 高饱和纯色 + 纯黑描边 + 纯白底
**主题**: 浅色（黄色主底）

> **配色设计理由**：波普艺术核心在于高饱和、零渐变的纯色块碰撞，黄色作为主底色营造活力感，红绿蓝作为功能色各司其职，纯黑描边统一所有元素。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(51 100% 50%) | 页面主背景（黄色） |
| surface | hsl(0 0% 100%) | 卡片基底、内容面板 |
| header | hsl(0 0% 0%) | 头部导航栏、标题块背景、描边 |
| text | hsl(0 0% 0%) | 主要文字、描边、阴影 |
| textMuted | hsl(0 0% 100%) | 深色背景上的文字 |
| primary | hsl(2 100% 59%) | 主交互色：番茄主体、暂停按钮、成就标题背景 |
| accent | hsl(135 58% 63%) | 弱强调色：开始按钮、进度条填充、侧边栏标题阴影 |
| border | hsl(0 0% 0%) | 4-8px 粗黑描边 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(2 100% 59%)`：停止/暂停按钮、成就标题、危险操作，视觉权重最高
**Accent（弱强调色）** — `hsl(135 58% 63%)`：开始按钮、进度条填充、侧边栏装饰阴影，权重低于 primary

### 衍生规则

- **背景色**：黄色 hsl(51 100% 50%) 作为主底色，暖色调提供活力基底
- **辅助暖底**：hsl(60 100% 88%) / hsl(60 100% 97%) 侧边栏和计时器内底色，降低纯白刺眼感
- **信息蓝**：hsl(211 100% 50%) 商店选中态、社区 CTA、连续记录高亮
- **按钮黄**：hsl(48 100% 50%) 重置按钮、成就导航激活态、统计数值高亮
- **所有阴影**：零模糊纯色偏移，4-24px 不等

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 停止/危险 | hsl(2 100% 59%) | 同 primary |
| 开始/安全 | hsl(135 58% 63%) | 同 accent |
| 信息/选中 | hsl(211 100% 50%) | 蓝色 |
| 重置/高亮 | hsl(48 100% 50%) | 黄色变体 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 装饰标题 | `Bangers, cursive` (.pop-font) |
| 正文 / 中文 | `Noto Sans SC, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 超大数字（计时器） | `text-[6.5rem] md:text-[8.5rem] font-black tracking-[0.1em] leading-none` | text |
| 弹窗标题 | `text-6xl font-black italic uppercase tracking-widest` | text |
| 区块大标题 | `text-5xl font-black pop-font uppercase tracking-tighter` + 背景色块 | textMuted |
| 侧边栏标题 | `text-3xl font-black uppercase leading-none tracking-tighter text-center` | text |
| 卡片标题 | `text-2xl ~ text-3xl font-black uppercase italic tracking-tight` | text |
| 标签文字 | `text-xs ~ text-sm font-black uppercase tracking-widest` | text |
| 微型标签 | `text-[10px] font-black uppercase tracking-[0.2em]` | text |

> 所有标题一律 uppercase + font-black，装饰标题用 Bangers，强调数值用 `drop-shadow-[2px_2px_0_#000]`

---

## 页面结构

> 侧边栏 + 主内容区双栏布局，三视图通过 AnimatePresence 切换。

```
Sidebar（w-80 lg, bg-暖底, border-r-8 black, rounded-r-[3rem]）
  品牌标题 + 导航按钮 + 钱包（底部）
Main Content（flex-1, bg-黄色 + halftone-bg, max-w-7xl）
  左内容列 flex-[1.5] + 右信息列 flex-1（lg only）
  视图: Timer / Shop / Achievements
```

| 元素 | 样式 |
|-----|-----|
| 侧边栏 | `w-full lg:w-80`, `p-8`, `border-b-8 lg:border-r-8 border-black`, `rounded-r-[3rem]` (lg) |
| 主内容 | `flex-1`, `p-6 md:p-10 lg:p-12`, `overflow-y-auto` |
| 左列 | `flex-[1.5]`, `gap-10` |
| 右列 | `flex-1`, `hidden lg:flex`, `gap-10` |
| 内容容器 | `max-w-7xl mx-auto w-full` |

---

## 视觉风格

### 阴影系统（零模糊纯色偏移）

| 层级 | 值 | 用途 |
|-----|---|-----|
| 超大 | `shadow-[24px_24px_0_0_#FFCC00]` | 弹窗卡片 |
| 大 | `shadow-[16px_16px_0_0_#000]` | 计时器主卡片 |
| 标准 | `shadow-[12px_12px_0_0_rgba(0,0,0,1)]` | 普通内容卡片 |
| 中 | `shadow-[8px_8px_0_0_#4CD964]` / `#000` | 区块标题色块 |
| 按钮 | `shadow-[4px_4px_0_0_rgba(0,0,0,1)]` | 所有按钮默认 |
| 按钮按下 | `shadow-[2px_2px_0_0_rgba(0,0,0,1)]` | `:active` |
| 文字 | `drop-shadow-[2px_2px_0_#000]` | 统计数字高亮 |

### 圆角系统

| 层级 | 值 | 用途 |
|-----|---|-----|
| 超大 | `rounded-[4rem]` | 弹窗卡片 |
| 大 | `rounded-[3rem]` / `rounded-[2.5rem]` | 主卡片、侧边栏 |
| 中 | `rounded-3xl` / `rounded-[2rem]` | 按钮、信息面板 |
| 小 | `rounded-2xl` | 标题色块、标签 |
| 圆形 | `rounded-full` | 进度条、状态灯、pill |

### 边框系统

超粗 `border-[8px] border-black`（弹窗） | 主描边 `border-[6px] border-black`（PopCard） | 标准 `border-4 border-black`（按钮、CTA） | 虚线 `border-4 border-dashed border-black/20` | 结构 `border-b-8` / `border-r-8 border-black`

### 背景纹理

```css
.halftone-bg {
  background-image: radial-gradient(rgba(0,0,0,0.1) 2px, transparent 2px);
  background-size: 20px 20px;
}
```

### 动画与交互

| 效果 | 实现 |
|-----|-----|
| 按钮按下 | `translate(2px,2px)` + 阴影缩小 |
| 激活缩放 | `scale-105` + `ring-4 ring-black ring-offset-2` |
| 卡片选中 | `ring-8 ring-black ring-offset-4 scale-[1.02]` |
| CTA 悬停 | `rotate(0) scale(1.05) translateY(-5px)` |
| 番茄呼吸 | `rotate:[0,2,-2,0] scale:[1,1.08,1]` 2s infinite |
| 收获弹跳 | `animate-bounce` |
| 状态脉冲 | `animate-pulse` |
| 弹窗进入 | `scale:0.8→1 rotate:-10→0` |

---

## 组件规范

### PopCard（核心卡片）

容器 `bg-white border-[6px] border-black rounded-[2.5rem] p-6 shadow-[12px_12px_0_0_rgba(0,0,0,1)]`
变体：bg-white / bg-暖底 / bg-black

### PopButton（核心按钮）

`border-4 border-black rounded-2xl px-6 py-3 font-black uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)]`
变体：red bg-primary text-white | green bg-accent text-black | blue bg-信息蓝 text-white | yellow bg-按钮黄 text-black | black bg-black text-white
Active: `translate-x-[2px] translate-y-[2px]` 阴影缩至 2px

### 标题色块（Section Header）

`bg-black text-white px-8 py-3 rounded-2xl rotate-[-1deg] shadow-[8px_8px_0_0_#4CD964] text-5xl font-black pop-font uppercase tracking-tighter inline-block`

### 进度条

外框 `bg-black border-4 border-black rounded-full p-1`
内轨 `bg-gray-900 h-8 rounded-full`
填充 `bg-accent rounded-full`
标签 `text-white text-[10px] font-black uppercase tracking-widest` 覆盖居中

### 统计项

布局 `flex justify-between items-center border-b-4 border-black/5 pb-5`
标签 `font-black text-lg opacity-60 uppercase tracking-widest`
数值 `font-black text-5xl + 主题色 + drop-shadow-[2px_2px_0_#000]`

### Pill 标签

`bg-{color}-50 text-{color}-500 px-4 py-2 text-xs font-black uppercase rounded-full border-2 border-{color}-100 shadow-[2px_2px_0_0_rgba(R,G,B,0.2)]`

### 弹窗叠层

遮罩 `bg-black/60 backdrop-blur-md fixed inset-0 z-[100]`
卡片 `bg-white border-[8px] border-black p-12 rounded-[4rem] shadow-[24px_24px_0_0_#FFCC00]`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|---------|
| >= 1024px (lg) | 侧边栏 + 主内容横向 flex-row；侧边栏 w-80 border-r-8 rounded-r-[3rem]；右列可见；p-12 |
| 768px ~ 1023px (md) | 计时器横向两栏；商店/成就 grid-cols-2；p-10；数字 text-[8.5rem] |
| < 768px | 单列垂直；侧边栏变顶部水平条 border-b-8；导航仅图标；右列隐藏；p-6 |

---

## 风格建议

- **阴影必须硬边**：零模糊纯色偏移是核心标识，禁用 blur 阴影
- **描边不可省略**：每个容器至少 `border-2 border-black` 以上
- **字体权重极端化**：优先 font-black(900)，避免 regular/light
- **大写与字距是语法**：标题标签一律 uppercase + 宽 tracking
- **Primary / Accent 分工明确**：primary（红色）用于停止/危险/焦点，accent（绿色）用于开始/进度/正向
- 善用微旋转 1-3 度 rotate 模拟拼贴效果
- 半色调纹理 2px/20px 是风格关键细节
