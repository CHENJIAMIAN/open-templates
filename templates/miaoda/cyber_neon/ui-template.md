# Cyber Neon · 赛博霓虹 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 赛博朋克深色沉浸式界面 — 纯黑底色 + 青色霓虹高亮，科技与未来感
- **Visual Signature**:
  1. 青色 (#00d1ff) 霓虹发光 (glow) 效果 + 大圆角毛玻璃卡片 (glass-card)
  2. 3D 弹出元素与倒影 (reflection)
  3. 灰度→彩色交互过渡 + 播放按钮浮现动效
  4. 左侧固定导航栏 + 底部播放控制台 + 全屏播放器弹出层
  5. 极端字重对比：font-black (900) 标题 vs font-bold (700) 正文
- **Emotional Tone**: 沉浸、高端、夜间驾驶座舱氛围；安静而富有律动感
- **Design Style**: Frosted Glass 毛玻璃 x Rounded 圆润几何

---

## 配色方案

**方案**: 自定义（Cyber Neon — Cyan Glow on Deep Dark）
**色彩关系**: 极深黑底 + 青色霓虹单色发光系统
**主题**: 深色

> **配色设计理由**：极深蓝黑底色构建沉浸式座舱环境，青色霓虹作为唯一强调色通过不同透明度和发光阴影创造层次，配合大圆角毛玻璃卡片营造夜间高端氛围。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(222 27% 6%) | 全局页面底色（#0b0e14） |
| surface | hsl(230 19% 13%) | 卡片背景 glass-card、面板底色（#1a1c26） |
| header | hsl(225 22% 10%) | 底部控制台、固定栏背景（#13161f） |
| text | hsl(0 0% 100%) | 主文字、标题 |
| textMuted | hsla(0 0% 100% / 0.3) | 次级文字、辅助信息、时间戳 |
| primary | hsl(189 100% 50%) | 品牌高亮色：选中态、播放按钮、进度条（#00d1ff） |
| accent | hsl(214 100% 50%) | 弱强调色：渐变终止色，与 primary 组合（#007aff） |
| border | hsla(0 0% 100% / 0.05) | 卡片描边、分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(189 100% 50%)`：播放按钮、进度条、选中指示器、标签激活态，视觉权重最高
**Accent（弱强调色）** — `hsl(214 100% 50%)`：渐变终止色（与 primary 135deg 渐变）、次级装饰，权重低于 primary

### 衍生规则

- **暗色三级**：bg hsl(222 27% 6%) → surface hsl(230 19% 13%) → header hsl(225 22% 10%) 构建深度层次
- **透明度层级**：white/5（边框）→ white/10（搜索栏/按钮底）→ white/30（图标默认）→ white/60（图标 hover）
- **发光阴影层级**：`0 0 10px primary`（选中指示器）→ `0 0 20px primary/0.3`（卡片发光）→ `0 0 25px primary/0.4`（播放按钮）
- **青色渐变**：`linear-gradient(135deg, primary 0%, accent 100%)` 用于 Hero Banner 背景
- **灰度交互**：卡片图片默认 `grayscale brightness-50`，hover `grayscale-0 brightness-100`

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 主交互/播放 | hsl(189 100% 50%) | 同 primary |
| 渐变终点 | hsl(214 100% 50%) | 同 accent |
| 图标未选中 | hsla(0 0% 100% / 0.3) | 同 textMuted |
| 侧边栏背景 | hsla(0 0% 0% / 0.4) | bg-black/40 |
| 遮罩层 | hsla(0 0% 0% / 0.5) | 底部阴影 |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Inter, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| Display | `text-7xl font-black tracking-tighter leading-tight` | text |
| H1 | `text-5xl font-light tracking-tight` | text |
| H2 | `text-2xl font-black tracking-tight` | text |
| H3 | `text-xl font-black tracking-tight` | text |
| Body | `text-sm font-bold leading-relaxed` | text / white/80 |
| Caption | `text-[11px] font-bold tracking-wider` | textMuted 变体 |
| Micro | `text-[10px] font-black uppercase tracking-[0.2em]` | 多种 |

---

## 页面结构

> 赛博座舱布局 — 左侧固定导航 + 三栏工作区 + 底部控制台。

```
+--[左侧导航 w-20]--+--[主工作区 flex-1 flex-col]--+
|  图标垂直排列       |  [顶部状态栏 h-20]           |
|  py-8 space-y-10   |  [内容区 flex-1 p-8 gap-8]   |
|  border-r white/5  |    [中间栏 flex-2] [右栏 flex-1 min-w-340px] |
|                    |  [底部控制台 h-28]            |
+--------------------+-------------------------------+
```

| 区域 | 尺寸 | 背景 |
|-----|-----|-----|
| 左侧导航 | w-20 | bg-black/40 + border-r white/5 |
| 顶部状态栏 | h-20 | bg-black/20 + border-b white/5 |
| 内容区域 | flex-1 | 透明（继承 bg） |
| 底部控制台 | h-28 | bg-[header色] + border-t white/5 |
| 全屏播放器 | fixed inset-0 z-[100] | 全屏图片 + 渐变遮罩 |

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 页面内边距 | `p-8` (32px) |
| 卡片内边距 | `p-10` (40px) |
| Hero 内边距 | `p-12` (48px) |
| 区域间距 | `gap-8` (32px) |
| 图标间距 | `space-y-10` (40px) |

### 圆角系统

> Design DNA: Cyber Rounded — 大圆角 (24px-48px) + pill 按钮

| 元素 | 圆角 |
|-----|-----|
| 大卡片 / Hero | `rounded-[3rem]` (48px) |
| 排行榜卡片 | `rounded-[2rem]` (32px) |
| 卡片内图片 | `rounded-[1.5rem]` (24px) |
| 缩略图 | `rounded-[1.2rem]` (19.2px) |
| 按钮/搜索栏/进度条 | `rounded-full` |
| 播放器封面 | `rounded-2xl` (16px) |
| 功能图标按钮 | `rounded-xl` (12px) |

### 阴影与发光

| 场景 | 值 |
|-----|---|
| 大卡片 | `shadow-2xl` |
| 青色发光 | `0 0 20px hsla(189 100% 50% / 0.3)` (cyan-glow) |
| 播放按钮 | `shadow-[0_0_25px_hsla(189,100%,50%,0.4)]` |
| 选中指示器 | `shadow-[0_0_10px_hsl(189,100%,50%)]` |
| 控制台上阴影 | `shadow-[0_-10px_40px_rgba(0,0,0,0.5)]` |
| 全屏封面 | `shadow-[0_50px_100px_rgba(0,0,0,0.8)]` |

### 毛玻璃效果

glass-card: `background: surface色; border: 1px solid hsla(0 0% 100% / 0.05)`
搜索栏: `bg-white/10 backdrop-blur-xl border border-white/10`
按钮玻璃: `backdrop-blur-sm`

### Hover 交互

| 模式 | 应用 | 效果 |
|-----|-----|-----|
| 灰度恢复 | 卡片图片 | `grayscale-0 brightness-100 scale-100 transition-all duration-500` |
| 播放浮现 | 卡片 | `opacity-0→100 translate-y-4→0 transition-transform` |
| 放大 | 按钮 | `hover:scale-105 active:scale-95` |
| 填充变色 | 状态标签 | `hover:bg-[primary色] hover:text-black hover:shadow-[0_0_15px_primary]` |
| 背景浮现 | 卡片容器 | `hover:bg-white/5 transition-all` |

### 动画

- 唱片旋转: `animation: rotate-disc 20s linear infinite`
- 全屏滑入: `transition-all duration-700 ease-in-out translate-y-0/translate-y-full`
- 倒影: `-webkit-box-reflect: below 2px linear-gradient(transparent, hsla(0 0% 100% / 0.1))`
- 颜色过渡: `transition-colors`
- 图片过渡: `transition-all duration-500`

---

## 组件规范

### 按钮

主要: `bg-white text-black font-bold px-10 py-3.5 rounded-full text-xs uppercase tracking-widest`
次要: `border border-white/30 font-bold px-10 py-3.5 rounded-full backdrop-blur-sm text-xs uppercase tracking-widest`
播放 CTA: `w-14 h-14 rounded-full bg-[primary色] shadow-[0_0_25px_primary/0.4]`
状态标签 Active: `bg-[primary色]/10 text-[primary色] border border-[primary色]/20 rounded-full px-6 py-2 text-[10px] font-black uppercase`
状态标签 Inactive: `bg-white/10 text-white/80 border border-white/10 rounded-full px-6 py-2`

### 卡片

容器: `glass-card rounded-[2rem] p-3 group cursor-pointer hover:bg-white/5 transition-all`
图片: `grayscale brightness-50 scale-110 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-100 transition-all duration-500`
播放按钮浮现: `w-14 h-14 rounded-full bg-[primary色] shadow-[0_0_20px_primary] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0`

### 导航图标

默认 `text-white/30`，hover `hover:text-white`，选中 `text-[primary色]`
选中指示条: `w-1 h-6 bg-[primary色] rounded-r-full shadow-[0_0_10px_primary]`

### 进度条

轨道: `flex-1 h-1.5 bg-white/5 rounded-full`
已播: `bg-[primary色] shadow-[0_0_10px_primary] rounded-full`
滑块: `w-3.5 h-3.5 bg-white rounded-full border-2 border-[primary色]`（hover 显现）

### 列表项

缩略图: `w-14 h-14 rounded-[1.2rem] shadow-lg border border-white/5`
标题: `text-sm font-bold truncate`
副标题: `text-[11px] text-white/40 font-bold tracking-wide uppercase mt-1`

### 搜索栏

`bg-white/10 backdrop-blur-xl rounded-full px-5 py-2 border border-white/10 shadow-lg`
文字: `text-[11px] font-bold tracking-wider opacity-60`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1280px (Desktop/HMI) | 三栏：左导航 w-20 + 中间 flex-2 + 右侧 flex-1 min-w-340px |
| 768-1279px (Tablet) | 隐藏右侧栏，中间栏占满；卡片 4 列降为 2-3 列 |
| < 768px (Mobile) | 底部 Tab 替代左侧栏，单列卡片，底部播放器缩为 MiniPlayer h-16 |

---

## 风格建议

- **青色霓虹统一性**：所有交互高亮、选中态、进度指示使用 primary 青色，通过透明度 (/10, /20, /40) 和发光阴影创造层次
- **大圆角 + 毛玻璃层级**：`rounded-[2rem]` ~ `rounded-[3rem]` + glass-card 半透明背景 + shadow-2xl 构建前后层关系
- **Primary / Accent 分工明确**：primary（青色）用于所有交互焦点，accent（深蓝）仅用于渐变终止色
- **文字层级靠字重与透明度区分**：font-black 纯白标题、font-bold white/80 正文、white/30~40 辅助信息，避免额外色彩
- **灰度→彩色交互暗示**：卡片图片默认灰度暗化，hover 恢复彩色 + 播放按钮浮现，暗示可操作性
