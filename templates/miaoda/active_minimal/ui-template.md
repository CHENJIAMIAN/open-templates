# Active Minimal · 活力极简 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Modern Sport Minimal — 圆润几何卡片 x 浅灰底 x 荧光黄绿点缀色
- **Design Style**: Rounded 圆润几何 x Frosted Glass 毛玻璃 — 超大圆角(32px) + 浅灰底 + 荧光黄绿 + sticky 毛玻璃导航
- **Visual Signature**:
  1. 超大粗体标题（text-5xl ~ text-6xl），font-[900]，tracking-tight
  2. 超大圆角卡片（rounded-[32px]），轻阴影
  3. 荧光黄绿 accent 用于强调卡片、按钮、hover 翻转
  4. 深色卡片与浅色卡片交替使用形成层次
  5. 头部毛玻璃 sticky 导航（backdrop-blur-md）
- **Emotional Tone**: 活力、现代、专业

---

## 配色方案

**方案**: 自定义 — Sport Light + Neon Lime
**色彩关系**: 浅灰底 + 荧光黄绿强调 + 深色卡片点缀
**主题**: 浅色

> **配色设计理由**：浅灰背景营造开阔透气感，荧光黄绿作为唯一高饱和色制造运动感冲击力，深色卡片穿插提供对比节奏。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(210 17% 98%) | 页面背景 |
| surface | hsl(0 0% 100%) | 浅色卡片背景 |
| header | hsl(0 0% 7%) | 深色卡片背景 |
| text | hsl(221 39% 11%) | 主要文字（浅色卡片内） |
| textMuted | hsl(220 9% 65%) | 次要文字、标签、坐标轴 |
| primary | hsl(72 100% 50%) | 主交互色：强调按钮、hover 翻转、正向指标 |
| accent | hsl(0 0% 10%) | 弱强调色：深色卡片内嵌区域 |
| border | hsl(220 14% 96%) | 浅色卡片边框/分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(72 100% 50%)`：CTA 按钮、指标卡 hover 翻转底色、强调词背景、评分卡片，视觉权重最高
**Accent（弱强调色）** — `hsl(0 0% 10%)`：深色卡片内嵌区域、内嵌提示卡背景，权重低于 primary

### 衍生规则

- **背景色**：极浅灰 hsl(210 17% 98%)，与白色卡片微弱区分
- **深色卡片**：header hsl(0 0% 7%) 与 accent hsl(0 0% 10%) 构成两级深色
- **primary hover**：hsl(72 100% 45%) 略深用于按钮 hover 态
- **语义绿**：hsl(142 72% 29%) green-600 正向变化，hsl(142 77% 73%) green-100 正向背景
- **语义红**：hsl(0 73% 41%) red-600 负向变化，hsl(0 86% 97%) red-50 高优先级背景
- **深色卡片上文字**：纯白 hsl(0 0% 100%)

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 正向/上升 | hsl(142 72% 29%) | green-600 |
| 负向/下降 | hsl(0 84% 60%) | red-500 |
| 高优先背景 | hsl(0 86% 97%) | red-50 |
| 低优先背景 | hsl(214 100% 97%) | blue-50 |
| 选区高亮 | primary bg + black text | selection |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(72,100%,50%)', 'hsl(0,0%,7%)', 'hsl(0,0%,20%)', 'hsl(0,0%,40%)', 'hsl(220,9%,65%)', 'hsl(220,14%,96%)'];
//               荧光黄绿             深黑               深灰               中灰               浅灰               极浅灰
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS, backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'hsl(220,9%,65%)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: 'hsl(220,9%,65%)', fontSize: 12, fontWeight: 600 }, splitLine: { show: false } },
  yAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false }, splitLine: { show: false } },
  legend: { textStyle: { color: 'hsl(220,9%,65%)', fontSize: 12, fontWeight: 700 }, itemGap: 16, icon: 'circle', itemWidth: 8, itemHeight: 8 }
};
```

### Tooltip 配置

浅色图表 `backgroundColor: '#fff', borderRadius: 16, shadowBlur: 15, shadowColor: 'rgba(0,0,0,0.1)', axisPointer: { type: 'shadow', shadowStyle: { color: 'hsl(220,14%,96%)' } }`
深色图表 `backgroundColor: 'hsl(0,0%,7%)', borderRadius: 16, textStyle: { color: '#fff' }`

### 各图表类型默认 series 样式

- **bar**: `barWidth: 40`, `itemStyle.borderRadius: [8,8,8,8]`（pill 风格四角圆角），primary / dark 条件着色
- **line + area**: `smooth: true`, `symbol: 'none'`, `lineStyle.width: 4` primary 色，areaStyle 线性渐变 80%→0% 透明度
- **pie / donut**: `radius: ['60%','80%']`, `padAngle: 5`, `label: { show: false }`；中心文字通过 graphic 叠加

### 图表容器

| 属性 | 值 |
|-----|---|
| 浅色容器 | `bg-white rounded-[32px] p-6 shadow-sm` |
| 深色容器 | `bg-[hsl(0,0%,7%)] rounded-[32px] p-6 shadow-sm text-white` |
| accent 容器 | `bg-[primary色] rounded-[32px] p-6` |
| 标准图表高度 | `h-[300px]` / 紧凑 `h-[200px]` |

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Plus Jakarta Sans, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面主标题 | `text-5xl lg:text-6xl font-[900] tracking-tight leading-[1.1]` | text，primary 用于强调词背景 |
| 超大数值 | `text-[120px] font-[950] leading-none` | black（accent 卡片上） |
| Section 标题 | `text-2xl font-extrabold tracking-tight` | text / white |
| KPI 大数字 | `text-5xl / text-4xl / text-3xl font-black` | text / white |
| 标签/分类 | `text-[10px] font-black uppercase tracking-widest` | textMuted |
| 按钮文字 | `font-bold` | black（primary 按钮上） |
| 品牌名 | `text-xl font-bold tracking-tighter` | text |

---

## 页面结构

> 12 列网格系统，浅色底 + 卡片分区，顶部 sticky 毛玻璃导航。

```
Sticky Header（毛玻璃：Logo + 搜索栏 + 通知 + 用户头像）
  → Hero 区域（lg: 8:4 布局）
      左 8列: 主标题 + CTA + 深色卡 2/3 + accent 卡 1/3
      右 4列: 大数字评分卡 + 统计卡片
  → 数据分析 Section（lg: 8:4）
      左 8列: 图表区 | 右 4列: 列表 + 状态提示卡
  → 监测 Section（lg: 7:5）
      左 7列: 面积图 + 底部统计栏 | 右 5列: 环形图 + 提示卡
  → 指标卡片行（md: 2列 / lg: 4列，hover 翻转）
  → 建议 & 成就 Section（lg: 8:4）
```

| 元素 | 样式 |
|-----|-----|
| 页面背景 | `bg-[hsl(210,17%,98%)]` |
| 内容容器 | `max-w-[1440px] mx-auto` |
| 选中色 | `selection:bg-primary selection:text-black` |
| Section 内边距 | `px-8 py-6` |
| 网格间隔 | `gap-6` |

### Header

`flex items-center justify-between px-8 py-6 sticky top-0 bg-white/80 backdrop-blur-md z-50`
Logo `w-8 h-8 bg-primary rounded-lg` | 搜索 `bg-gray-100 rounded-full px-4 py-2 focus:w-48 transition-all` | 头像 `w-10 h-10 rounded-xl border-2 border-primary`

---

## 视觉风格

### 圆角与阴影

> Design DNA: Rounded 圆润几何 — 32px 主卡片 + 全圆角胶囊按钮

| 元素 | 圆角 | 阴影 |
|-----|-----|-----|
| 通用卡片 | `rounded-[32px]` | `shadow-sm`，hover `shadow-lg` |
| 次级卡片 | `rounded-3xl` (24px) | `shadow-sm` |
| 内嵌子卡片 | `rounded-2xl` (16px) | 无 |
| 按钮 | `rounded-full` | 无 |
| Badge | `rounded-full` | 无 |
| 用户头像 | `rounded-xl` (12px) | 无 |

### 边框

次级卡片 `border border-gray-100` | 内嵌卡片 `border border-white/20` | 头像 `border-2 border-primary` | 统计栏 `border-t border-gray-100` / `border-x border-gray-100`

### Hover 交互

| 模式 | 效果 |
|-----|-----|
| 翻转 | 指标卡片 hover→primary 底 + 黑字 `transition-colors` |
| 阴影增强 | `hover:shadow-lg` |
| 背景变色 | 列表图标 `group-hover:bg-primary` |
| 透明度 | 背景装饰图标 `opacity-10→20` |
| 按钮位移 | 箭头 `group-hover:translate-x-1 -translate-y-1` |
| 搜索展开 | `focus:w-48 transition-all` |

### 毛玻璃效果

Header `bg-white/80 backdrop-blur-md` | 内嵌评分卡 `bg-white/40 backdrop-blur`

### 动画

卡片翻转/按钮/图标位移/搜索展开/背景淡入 均 `transition-all` / `transition-colors` / `transition-transform` / `transition-opacity` 默认 150ms

---

## 组件规范

### 通用卡片

浅色 `rounded-[32px] p-6 bg-white shadow-sm` | 深色 `rounded-[32px] p-6 bg-[hsl(0,0%,7%)] text-white shadow-sm` | Accent `rounded-[32px] p-6 bg-primary text-black`

### Badge

`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-primary`

### Hero 标题

`text-5xl lg:text-6xl font-[900] tracking-tight leading-[1.1]`
强调词 `inline-block px-2 bg-primary rounded-xl -rotate-1`

### CTA 按钮

`bg-primary hover:bg-[hsl(72,100%,45%)] text-black font-bold py-4 px-8 rounded-full flex items-center gap-2 group transition-all`

### 大数值评分卡

容器 `bg-primary rounded-[32px] py-10 relative` | Badge `absolute top-4 left-4 bg-white`
数字 `text-[120px] font-[950] leading-none` | 维度小卡 `bg-white/40 backdrop-blur rounded-2xl p-3 border border-white/20`

### 指标对比卡片（hover 翻转）

`rounded-[32px] p-6 bg-white shadow-sm group hover:bg-primary transition-colors`
标签 `text-[10px] font-black uppercase text-gray-400 group-hover:text-black`
主数值 `text-3xl font-black group-hover:text-black`
变化标签正向 `bg-green-100 text-green-600` / 负向 `bg-red-100 text-red-600`

### 列表项

图标容器 `w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-primary transition-colors`
名称 `text-sm font-bold` | 数值 `text-sm font-black`

### 建议卡片

`bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-lg transition-shadow`
图标容器 `w-12 h-12 rounded-2xl`（高优先 bg-red-50 text-red-500 | 中低优先 bg-blue-50 text-blue-500）

### 成就卡片

`bg-black rounded-3xl p-4 flex items-center gap-4 text-white`
图标 `w-12 h-12 rounded-full bg-primary text-black`

### 推广深色卡片

`bg-[hsl(0,0%,7%)] rounded-[32px] p-6 relative overflow-hidden group`
背景装饰 `absolute -bottom-8 -right-8 w-48 h-48 text-primary opacity-10 group-hover:opacity-20 transition-opacity`

---

## 响应式断点

| 断点 | 布局 |
|-----|-----|
| >= 1024px (lg) | 12列网格：8:4 / 7:5 布局，指标 4列，主标题 text-6xl |
| 768px ~ 1023px (md) | 推广卡片 2:1，建议卡片 2列，指标 2列 |
| < 768px | 全部堆叠单列，主标题 text-5xl |

搜索栏 `hidden sm:flex` | 用户名/等级 `hidden sm:block`

---

## 风格建议

- **浅色底 + 顶部毛玻璃导航**是核心结构：hsl(210 17% 98%) 背景 + sticky backdrop-blur Header
- **Primary / Accent 分工明确**：primary（荧光黄绿）用于主交互和 hover 翻转，accent（深色）用于深色卡片层次
- 保留超大圆角 `rounded-[32px]` + 胶囊按钮 `rounded-full` 的圆润几何感
- 图表统一使用 ECharts 配合 primary 色 + Plus Jakarta Sans 字体
