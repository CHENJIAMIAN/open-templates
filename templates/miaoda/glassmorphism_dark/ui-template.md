# Glassmorphism Dark · 暗黑毛玻璃 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Glassmorphism Dark — 纯黑底 + 毛玻璃卡片 + 背景模糊图 + 红色强调色
- **Design Style**: Frosted Glass 毛玻璃 x Rounded 圆润几何
- **Visual Signature**:
  1. 超大粗体标题（text-5xl ~ text-7xl），font-extrabold，tracking-tighter
  2. 毛玻璃卡片：rgba(255,255,255,0.05) 背景 + backdrop-blur-12px + 1px 白色 10% 边框 + 24px 圆角
  3. 红色强调色用于主数据系列、图标、趋势标记
  4. 固定背景模糊图 + 渐变遮罩叠加层
  5. 左侧图标导航 Sidebar（桌面端）+ 底部浮动操作按钮（移动端）
- **Emotional Tone**: 高端、沉浸、数据自信

---

## 配色方案

**方案**: Glassmorphism Dark + Crimson Red Accent
**色彩关系**: 纯黑底 + 毛玻璃白透明 + 红色强调
**主题**: 深色

> **配色设计理由**：纯黑背景配合毛玻璃卡片营造沉浸式科技感，红色强调色作为唯一高饱和色彩聚焦数据焦点与交互反馈。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(0 0% 0%) | 页面背景 |
| surface | hsla(0 0% 100% / 0.05) | 毛玻璃卡片背景 |
| header | hsla(0 0% 0% / 0.60) → hsla(0 0% 0% / 0.80) → hsl(0 0% 0%) | 背景渐变遮罩（三段式） |
| text | hsl(0 0% 100%) | 主要文字 |
| textMuted | hsla(0 0% 100% / 0.60) | 次要文字（60%/50%/40%/30% 四档） |
| primary | hsl(0 100% 65%) | 主交互色：主数据系列、图标、面积图填充 |
| accent | hsla(0 0% 100% / 0.10) | 弱强调色：hover 背景、非强调条形、次级区分 |
| border | hsla(0 0% 100% / 0.10) | 卡片边框、Sidebar 分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(0 100% 65%)`：主数据系列、面积图填充、激活态图标，视觉权重最高
**Accent（弱强调色）** — `hsla(0 0% 100% / 0.10)`：hover 背景微亮、非强调条形色、次级区域区分，权重低于 primary

### 衍生规则

- **背景色**：纯黑 hsl(0 0% 0%)，与 primary 红形成高对比
- **毛玻璃层**：白色 5% 透明度 + backdrop-blur-12px，在黑底上创造深度
- **文字层级**：白色 100%/60%/50%/40%/30% 四档渐进式透明度
- **边框色**：白色 10% 透明度，与 surface 一致保持低调
- **Primary 渐变填充**：从 rgba(255,77,77,0.30) 到 rgba(255,77,77,0)，用于面积图

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/上升 | hsl(142 69% 58%) | green-400 |
| 正向标签背景 | hsla(142 71% 45% / 0.20) | green-500 @ 20% |
| 负向/下降 | hsl(0 84% 60%) | red-500 |

### 扩展色

| 角色 | 值 | 用途 |
|-----|---|------|
| sidebar-bg | hsla(0 0% 100% / 0.05) | Sidebar 背景 |
| button-active-bg | hsl(0 0% 100%) | 激活态按钮背景 |
| button-active-text | hsl(0 0% 0%) | 激活态按钮文字 |
| accent-area-top | hsla(0 100% 65% / 0.30) | 面积图渐变填充起点 |
| accent-area-bottom | hsla(0 100% 65% / 0) | 面积图渐变填充终点 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(0,100%,65%)', 'hsl(0,0%,100%)', 'hsl(27,100%,67%)', 'hsl(145,100%,65%)'];
//               红色               白色               橙色               绿色
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.40)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.20)' } }, axisTick: { show: false },
    axisLabel: { color: 'rgba(255,255,255,0.20)', fontSize: 10, fontFamily: 'Inter' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'solid' } }
  },
  tooltip: {
    trigger: 'axis', backgroundColor: 'rgba(0,0,0,0.80)', borderColor: 'transparent',
    borderWidth: 0, borderRadius: 12, padding: 12, shadowBlur: 0,
    textStyle: { fontFamily: 'Inter', color: '#FFFFFF', fontSize: 12 },
    extraCssText: 'backdrop-filter: blur(8px);', axisPointer: { type: 'none' }
  },
  legend: {
    textStyle: { fontFamily: 'Inter', color: 'rgba(255,255,255,0.40)', fontSize: 12, fontWeight: 'bold' },
    icon: 'circle', itemWidth: 8, itemHeight: 8, itemGap: 16
  }
};
```

### 各图表类型默认 series 样式

- **line（平滑面积）**: `smooth: true`, `symbol: 'none'`, `lineStyle.width: 4`, `areaStyle` 线性渐变 rgba(255,77,77,0.30) -> rgba(255,77,77,0)
- **line（阶梯折线）**: `step: 'end'`, `lineStyle.width: 2`, `symbol: 'none'`, emphasis 白色描边圆点
- **line（辅助虚线）**: `smooth: true`, `lineStyle: { color: 'rgba(255,255,255,0.10)', width: 1, type: 'dashed' }`
- **pie 环形**: `radius: ['55%','73%']`, `padAngle: 5`, `label: { show: false }`
- **bar 水平**: 首项 primary 色，其余 rgba(255,255,255,0.10)，`borderRadius: [0,10,10,0]`

### 图表容器

容器 `glass-card p-6`（标准）/ `p-8`（大型图表），圆角 24px，hover `hover:bg-white/10 transition-all duration-300`
高度 `min-h-[400px]`（hero）/ `h-[250px]`（标准）/ `h-[300px]`（全宽）
网格 `grid-cols-1 lg:grid-cols-4 gap-6`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

| 用途 | 字体栈 | 字重 |
|-----|-------|------|
| 全局默认 | `Inter, sans-serif` | 400 |
| Heading / 数字 | `Inter, sans-serif` | 800 (extrabold) / 900 (black) |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|------|
| 页面主标题 | `text-5xl md:text-7xl font-extrabold tracking-tighter leading-none` | text，弱化部分 text-white/40 italic font-light |
| Hero KPI 数值 | `text-6xl font-black` | text |
| Section 标题 | `text-2xl font-black italic` | text |
| 卡片内标题 | `text-xl font-bold` | text |
| KPI 数值（卡片） | `text-3xl font-extrabold` | text |
| 标签/分类 | `text-sm font-medium tracking-wider uppercase` | textMuted (60%) |
| 小标签 | `text-sm font-bold uppercase tracking-widest` | textMuted (40%) |
| 趋势标签 | `text-xs font-bold` | hsl(142 69% 58%) + bg green-500/20 rounded-lg |
| 描述文字 | `text-lg leading-relaxed` | textMuted (50%) |

---

## 页面结构

> Sidebar + 主内容区，杂志式编辑排版。

```
固定背景层（模糊图片 opacity-40 + 三段渐变遮罩 from-black/60 via-black/80 to-black）
Sidebar（左侧固定图标导航，桌面端 w-24，移动端隐藏）
Main Content（flex-grow, p-4 md:p-12）
  +-- Header（左标题+描述 / 右切换按钮组）
  +-- Hero 数据行（左 3/4 大卡含面积图背景 + 右 1/4 StatCard x2）
  +-- 中间洞察网格（4 列布局）
  +-- 全宽图表卡
Mobile FAB（fixed bottom-6 right-6, md 以下显示）
```

Header: `flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8`
主内容: `flex-grow z-10 p-4 md:p-12 overflow-y-auto w-full`

---

## 视觉风格

### 毛玻璃效果（核心视觉）

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
}
```

### 间距系统

| 元素 | 值 |
|-----|---|
| Section 间距 | `mb-8` / `mb-12`（大 Section） |
| 卡片间距 | `gap-6` (24px) |
| 卡片内边距 | `p-6`（标准）/ `p-8`（大型） |

### 圆角与阴影

| 元素 | 圆角 | 阴影 |
|-----|------|-----|
| 毛玻璃卡片 | 24px (`rounded-3xl`) | 无 |
| 按钮组容器 | 16px (`rounded-2xl`) | — |
| 按钮 / 图标容器 | 12px (`rounded-xl`) | — |
| 导航项 | 16px (`rounded-2xl`) | 激活态 `shadow-lg shadow-white/20` |
| 趋势标签 | 8px (`rounded-lg`) | — |
| 头像 / 条形图右端 | `rounded-full` / `[0,10,10,0]` | — |
| 浮动按钮 | `rounded-full` | `shadow-2xl` |

### Hover 交互

| 模式 | 效果 |
|-----|------|
| 卡片微亮 | white/5 → white/10，`transition-all duration-300` |
| 图标放大 | `group-hover:scale-110 transition-transform` |
| 按钮色变 | bg-white → bg-white/90 或 text-white/60 → text-white |
| 导航变色 | text-white/40 → text-white + bg-white/5 |
| 浮动按钮 | `hover:rotate-45 transition-transform` |

### 动画 & 滚动条

卡片/按钮/导航 Hover: `transition-all duration-300`
滚动条: `width: 6px`, track `#000`, thumb `#333 rounded-[10px]`

---

## 组件规范

### KPI 指标卡片 (StatCard)

容器 `glass-card p-6 flex flex-col justify-between h-full group hover:bg-white/10`
顶部: 标签(左, `text-sm font-medium text-white/60 tracking-wider uppercase`) + 图标容器(右, `p-2 bg-white/5 rounded-xl group-hover:scale-110`)
底部: 数值 `text-3xl font-extrabold mb-1` + 副标题 `text-sm text-white/40`

### Hero 数据卡

容器 `lg:col-span-3 glass-card overflow-hidden relative min-h-[400px]`
顶部信息层(z-10, p-8): 小标签 + 大数值 `text-6xl font-black` + 趋势标签 + 头像堆叠
图表层: absolute inset-0 top-32（面积图铺满剩余空间）

### Sidebar（桌面端）

容器 `hidden md:flex flex-col w-24 bg-white/5 border-r border-white/10 backdrop-blur-xl sticky top-0 h-screen py-8`
Logo `w-12 h-12 rounded-full border-2 border-white/20 hover:border-white`
导航项: 激活 `bg-white text-black shadow-lg shadow-white/20` / 非激活 `text-white/40 hover:text-white hover:bg-white/5`

### 时间段切换按钮组

容器 `flex items-center space-x-4 bg-white/10 p-2 rounded-2xl backdrop-blur-md`
激活 `px-6 py-2 rounded-xl bg-white text-black font-bold text-sm`
非激活 `px-6 py-2 rounded-xl text-white/60 font-bold text-sm hover:text-white`

### 移动端浮动按钮

`md:hidden fixed bottom-6 right-6 z-50 w-16 h-16 bg-white text-black rounded-full shadow-2xl hover:rotate-45`

---

## 响应式断点

| 断点 | 布局 |
|-----|------|
| >= 1024px (lg) | Sidebar w-24 可见；Hero 4 列（3+1）；洞察 4 列；p-12 |
| 768px-1023px (md) | Sidebar 可见；Hero 自适应；洞察 2 列；p-12；标题 text-7xl |
| < 768px | Sidebar 隐藏；FAB 可见；全部单列；p-4；标题 text-5xl |

---

## 风格建议

- **坚持 Glassmorphism 暗色基调**：纯黑背景 + glass-card 毛玻璃卡片 + 背景模糊图层与渐变遮罩，保持沉浸氛围
- **保留 Sidebar 图标导航模式**：桌面端左侧图标 Sidebar，移动端底部浮动按钮
- **维护视觉签名色与大圆角**：primary hsl(0 100% 65%) 和 24px 大圆角是核心识别特征
- **Primary / Accent 分工明确**：primary 红专用于主数据与视觉焦点，accent 白透明用于次级区分与 hover 反馈
