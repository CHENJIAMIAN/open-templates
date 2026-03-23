# Bold Capsule · 胶囊潮流 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 大圆角胶囊形态 + 高饱和撞色 + 超粗字重排版，欧式品牌海报 x 现代 SaaS 仪表盘
- **Design Style**: Rounded 圆润几何 x Soft Blocks 柔色块
- **Visual Signature**:
  1. 2.5rem 超大圆角卡片（`rounded-card` 40px）、荧光绿强调色、胶囊导航栏
  2. 斜体粗黑标题尾缀句号，`font-black` + `italic` 签名式排版
  3. 紫/橙/荧光绿三色交替撞色卡片 + 大面积留白呼吸感
  4. 毛玻璃浮动导航 + AI 浮窗面板
- **Emotional Tone**: 自信、活力、潮流感

---

## 配色方案

**方案**: Capsule Vibrant（紫 + 橙 + 荧光绿）
**色彩关系**: 浅灰暖底 + 白色表面 + 紫色品牌 + 荧光绿 CTA
**主题**: 浅色

> **配色设计理由**：浅灰底提供中性画布，紫色品牌色建立专业感，荧光绿作为高对比 CTA 色制造视觉冲击，三色交替撞色卡片打破单调。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(210 17% 98%) | 全局页面背景 |
| surface | hsl(0 0% 100%) | 卡片、表格、弹窗面板 |
| header | hsl(254 74% 55%) | 导航激活态、标题强调、主按钮、紫色卡片 |
| text | hsl(0 0% 10%) | 主要正文、大标题 |
| textMuted | hsl(215 16% 62%) | 次要说明文字、表头标签 |
| primary | hsl(254 74% 55%) | 主交互色：品牌标识、导航激活、主按钮 |
| accent | hsl(88 100% 50%) | 弱强调色（此风格为荧光绿）：CTA 按钮、成功状态、数据高亮 |
| border | hsl(210 34% 96%) | 卡片描边、分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(254 74% 55%)`：导航激活态、品牌标识、紫色卡片背景、AI 浮窗主色，视觉权重最高
**Accent（强调色）** — `hsl(88 100% 50%)`：CTA 按钮、进度条填充、成功高亮、提交按钮，视觉权重次于 primary 但对比度极高

### 衍生规则

- **primary 浅底**：primary H=254 不变、S 降至 15%、L 升至 97% → 标签底色 `hsl(254 15% 97%)`
- **accent 前景色**：荧光绿上使用纯黑 `hsl(0 0% 0%)` 确保对比度 > 7:1
- **辅助橙色** `hsl(28 88% 54%)`：次级品牌色，功能区块背景、日期标签
- **深色底**：text 色 `hsl(0 0% 10%)` 用于页脚背景，内文字翻转为白色

### 辅助色板

| 名称 | HSL | 用途 |
|------|-----|------|
| 橙色 | hsl(28 88% 54%) | 次级品牌色，功能区块 |
| 粉色 | hsl(340 100% 65%) | 图表数据色 |
| 青色 | hsl(192 100% 50%) | 图表数据色 |
| 渐变紫 | `linear-gradient(135deg, primary 0%, hsl(254 100% 69%) 100%)` | 文字渐变 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(254,74%,55%)', 'hsl(28,88%,54%)', 'hsl(88,100%,50%)', 'hsl(340,100%,65%)', 'hsl(192,100%,50%)'];
//               紫(主色)             橙                荧光绿              粉红                 青
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Plus Jakarta Sans, PingFang SC, sans-serif', color: 'hsl(215,16%,62%)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,62%)', fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,62%)', fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans' },
    splitLine: { lineStyle: { color: 'hsl(210,34%,96%)', type: 'dashed' } }
  },
  tooltip: {
    backgroundColor: 'hsl(0,0%,100%)', borderColor: 'transparent', borderWidth: 0, borderRadius: 24,
    padding: 16, shadowBlur: 20, shadowOffsetY: 10, shadowColor: 'rgba(0,0,0,0.1)',
    textStyle: { fontFamily: 'Plus Jakarta Sans', color: 'hsl(0,0%,10%)', fontSize: 12, fontWeight: 700 },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'hsl(210,33%,98%)' } }
  },
  legend: {
    textStyle: { fontFamily: 'Plus Jakarta Sans', color: 'hsl(215,16%,62%)', fontSize: 12, fontWeight: 700 },
    itemGap: 16, icon: 'circle', itemWidth: 10, itemHeight: 10
  }
};
```

### 各图表类型默认 series 样式

- **bar**: `barWidth: 50`, `itemStyle.borderRadius: [12,12,12,12]`（全圆角胶囊柱）
- **line**: `smooth: true`, `lineStyle.width: 3`, `symbol: 'circle'`, `symbolSize: 6`
- **pie 环形**: `radius: ['45%','60%']`, `padAngle: 2`, `itemStyle: { borderWidth: 0, borderRadius: 8 }`, `label: { show: false }`
- **radar**: `splitArea.areaStyle.color: ['rgba(241,245,249,0.5)','transparent']`, 轴线/分割线同 border 色
- **scatter**: `symbolSize: 10`, `itemStyle: { borderWidth: 2, borderColor: surface }`

### 图表容器

容器 `bg-surface rounded-card border border-border shadow-sm p-10`，标题 `text-xl font-black mb-8 italic`
高度 `h-72`（288px），网格 `grid-cols-1 md:grid-cols-2 gap-6`

---

## 字体排版

```css
font-family: 'Plus Jakarta Sans', 'PingFang SC', sans-serif;
```

### 文字规范

| 层级 | 样式 | 用途 |
|-----|-----|------|
| Display | `text-[5rem] font-extrabold leading-[0.9] tracking-tighter` | 首屏主标题 |
| H1 | `text-[4rem] font-black leading-[0.9] italic tracking-tighter` | 表单区大标题 |
| H2 | `text-[3.5rem] font-black italic tracking-tighter text-primary` | 板块标题 |
| H3 | `text-[3rem] font-black tracking-tighter italic text-primary` | 管理面板标题 |
| Section | `text-xl font-black italic` | 卡片内标题 |
| Body | `text-sm font-bold leading-relaxed` | 正文 |
| Caption | `text-xs font-black uppercase tracking-widest` | 标签、表头 |
| Micro | `text-[10px] font-black uppercase tracking-widest` | 极小标注 |

排版特征: 标题常用 `italic` + 英文句号结尾，标签 `uppercase tracking-widest font-black`，数字 `font-mono`

---

## 页面结构

```
胶囊浮动导航 (fixed top-6 居中, bg-white/70 backdrop-blur-xl rounded-full)
  → 主内容区 max-w-7xl mx-auto px-6 pt-28
    → 12 列网格 Hero（文字 5 列 + 图片 7 列）
    → 4 列功能网格（橙色卡 + icon 卡 + 数据卡）
    → 4 列等宽高亮卡片（紫/灰浅/灰深/荧光绿轮换）
  → 页脚 bg-text py-20（Logo + 3 列链接 + 版权）
  → AI 浮窗 (fixed bottom-10 right-10, 折叠圆形按钮/展开白底面板)
```

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| 页面外边距 | `px-6` |
| 区块间距 | `space-y-10` (40px) |
| 卡片内边距 | `p-10` (40px) / `p-8` (32px) |
| 网格间隙 | `gap-6` / `gap-4` |
| 导航项间距 | `space-x-6` |

### 圆角与阴影

> Design DNA: Rounded 圆润几何 — 超大圆角 + 胶囊形态

| 元素 | 圆角 | 阴影 |
|-----|------|-----|
| 超大卡片 | `rounded-card` (40px) | `shadow-sm` / `hover:shadow-lg` |
| 统计块/AI面板 | `rounded-[2rem]` (32px) | `shadow-2xl` |
| 输入框/气泡 | `rounded-[1.5rem]` (24px) | `shadow-sm` |
| 导航/按钮/pill | `rounded-full` | 导航 `shadow-lg shadow-purple-500/5` |
| 图表 bar | `borderRadius: [12,12,12,12]` | — |

毛玻璃: 导航 `bg-white/70 backdrop-blur-xl`，图片标签 `bg-white/20 backdrop-blur`

### Hover 与动画

| 模式 | 效果 |
|-----|-----|
| 翻色卡片 | `hover:bg-primary hover:text-white transition-all` |
| 缩放卡片 | `hover:scale-[1.02] transition-all` |
| CTA 按钮 | `hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-900/10` |
| 阴影提升 | `hover:shadow-lg transition-shadow` |

---

## 组件规范

### 按钮

| 类型 | 样式 |
|------|------|
| CTA（主） | `bg-accent text-black py-6 rounded-full font-black text-xl hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-900/10` |
| 导航激活 | `bg-primary text-white shadow-md px-4 py-1.5 rounded-full text-sm font-bold` |
| 次要 | `bg-white border-2 border-border rounded-full py-4 px-6 font-bold hover:bg-accent/10` |
| 功能 | `bg-accent/10 hover:bg-accent/20 text-black text-xs font-black px-6 py-3 rounded-full uppercase tracking-widest` |

### 卡片

| 类型 | 样式 |
|------|------|
| 白底 | `bg-surface rounded-card p-10 shadow-sm border border-border` |
| 紫色 | `bg-primary text-white rounded-card p-10 shadow-lg` |
| 橙色 | `bg-[hsl(28,88%,54%)] text-white rounded-card p-10` |
| 荧光绿 | `bg-accent rounded-card p-8` |
| 悬停翻色 | `bg-accent/5 rounded-[2rem] hover:bg-primary hover:text-white transition-all` |

### 表格
容器 `bg-surface rounded-card shadow-sm border border-border overflow-hidden`
表头 `bg-accent/5 text-textMuted text-[10px] uppercase tracking-[0.2em] font-black px-10 py-6`
行 `hover:bg-accent/5 transition-colors`，标签 `bg-primary/5 text-primary px-4 py-1.5 rounded-full text-xs font-black`

### 表单输入
暗底: `bg-white/10 border-2 border-white/20 rounded-[1.5rem] px-6 py-4 focus:border-accent`
浅底: 嵌套在 `bg-accent/10 p-2 rounded-full` 容器内

### AI 浮窗
FAB `bg-primary text-white w-16 h-16 rounded-full shadow-2xl border-4 border-white hover:scale-110`
面板 `bg-surface rounded-[2rem] shadow-2xl w-80 md:w-96 border border-border`
用户消息 `bg-primary text-white rounded-[1.5rem] rounded-tr-none`
Bot 消息 `bg-surface border border-border rounded-[1.5rem] rounded-tl-none`

### 进度条
轨道 `h-3 bg-white/10 rounded-full`，填充 `bg-accent rounded-full transition-all duration-1000`

---

## 响应式断点

| 断点 | 布局变化 |
|------|----------|
| < 640px | 单列 `grid-cols-1` |
| >= 640px (sm) | 高亮 `sm:grid-cols-2`，页脚链接 `sm:grid-cols-3` |
| >= 768px (md) | 功能区 `md:grid-cols-4`，表单 `md:grid-cols-2`，AI 浮窗 w-96 |
| >= 1024px (lg) | 主布局 `lg:grid-cols-12`，高亮 `lg:grid-cols-4` |
| 最大宽度 | `max-w-7xl` (1280px) |

---

## 风格建议

- **超大圆角统一性**：容器级 `rounded-card` (40px) / `rounded-[2rem]` (32px)，按钮 `rounded-full`，胶囊形态贯穿全局
- **撞色三色节奏**：紫 primary、橙、荧光绿 accent 交替出现于卡片背景，搭配 bg 浅灰底和 surface 白卡保持呼吸感
- **字重与大小写力量感**：标题 `font-black` + `italic` + 句号签名，标签 `uppercase tracking-widest font-black text-xs` 工业感
- **Primary / Accent 分工**：primary（紫）用于品牌与导航，accent（荧光绿）用于 CTA 与成功状态
