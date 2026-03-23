# Dark Ethereal Glow · 暗夜灼光 UI 风格模板

## 设计语言

- **Aesthetic Direction**: Dark Glassmorphism — 纯黑画布上叠加多层半透明毛玻璃卡片、橙色辐射光晕与噪点纹理
- **Visual Signature**:
  1. 玻璃拟态卡片（glass-ethereal）：渐变半透明白 + blur(40px) + 三层阴影
  2. 橙色灼光穿透暗面：发光点、渐变条、文字辉光、bracket 装饰线
  3. 极端字重对比：Black(900) vs Extralight(200)/Light(300)
  4. 超大圆角（45-60px）+ 夸张留白
  5. 噪点纹理全屏覆盖 + 环境光晕
- **Emotional Tone**: 深邃、高端、科技仪式感、暗中有光
- **Design Style**: Frosted Glass 毛玻璃 x Gradient Ribbons 渐变飘带

---

## 配色方案

**方案**: Dark Ethereal（纯黑 + 橙色灼光）
**色彩关系**: 纯黑画布 + 玻璃拟态容器 + 橙色单色相强调
**主题**: 深色

> **配色设计理由**：纯黑背景作为画布使所有发光效果和玻璃拟态获得最大对比度，橙色作为唯一高饱和色以光点、渐变、阴影形式穿透暗面。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(0 0% 0%) | 页面整体底色，纯黑 |
| surface | hsl(0 0% 100% / 0.03) | 玻璃拟态卡片（渐变半透明白） |
| header | hsl(240 6% 10%) | 深层容器背景，zinc-900 |
| text | hsl(0 0% 100%) | 标题、核心数值、主体文字 |
| textMuted | hsl(240 4% 66%) | 段落正文、次要标签 |
| primary | hsl(18 100% 50%) | 主交互色：装饰线、发光点、高亮文字 |
| accent | hsl(240 4% 16%) | 弱强调色：非激活进度条、P2 级别、低优先级底 |
| border | hsl(0 0% 100% / 0.08) | 玻璃卡片描边、分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(18 100% 50%)`：装饰线、发光点、渐变色、品牌视觉焦点，权重最高
**Accent（弱强调色）** — `hsl(240 4% 16%)`：非激活区域、P2 级底、低优先级进度条，权重低于 primary

### 衍生规则

- **bg 纯黑**：所有发光效果的前提，不可替换为深灰
- **surface**：白色 3-5% 透明度 + blur(40px)，在纯黑上形成玻璃层
- **primary 光谱**：`rgba(255,77,0,0.05)` 环境光 → `rgba(255,77,0,0.4)` 文字发光 → `hsl(18 100% 50%)` 实色
- **次强调 yellow**：`hsl(48 97% 53%)` 仅用于 P1 优先级标识，不作为独立强调色
- **zinc 灰阶**：从 zinc-900 到 zinc-100 提供 8 级文字与辅助元素灰度

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 高亮柱/正向 | hsl(24 100% 50%) | #ff6b00 图表主色 |
| 次强调 P1 | hsl(48 97% 53%) | yellow-500 |
| 低优先级 P2 | hsl(240 4% 16%) | zinc-800 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(24,100%,50%)', 'hsl(48,97%,53%)', 'hsl(240,4%,16%)', 'hsl(0,0%,100%,0.04)'];
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, sans-serif', color: 'hsl(240,4%,46%)', fontSize: 12, fontWeight: 900 },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(240,4%,24%)', fontSize: 16, fontWeight: 900 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false },
    splitLine: { show: false }
  },
  tooltip: {
    backgroundColor: 'rgba(5,5,5,0.95)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
    textStyle: { color: 'hsl(0,0%,100%)', fontSize: 14, fontWeight: 700 },
    extraCssText: 'border-radius:35px; box-shadow:0 25px 50px rgba(0,0,0,0.8); backdrop-filter:blur(30px); padding:16px 24px;'
  },
  legend: { textStyle: { color: 'hsl(240,4%,36%)', fontSize: 10, fontWeight: 700 } }
};
```

### 各图表类型默认 series 样式

- **bar**: `barWidth: 50`, `itemStyle.borderRadius: [0,20,20,0]`, emphasis 发光 `shadowBlur: 20, shadowColor: rgba(255,77,0,0.4)`
- **高亮柱**: 主色 `hsl(24 100% 50%)`，非高亮柱 `rgba(255,255,255,0.04)` + 1px `rgba(255,255,255,0.1)` 描边

### 图表容器

容器 `glass-ethereal rounded-[60px] p-16 border-white/10`
图表高度 `h-[550px]`，脚注 `mt-12 text-[10px] tracking-[0.5em] uppercase`

### 进度条（CSS）

容器 `h-5 rounded-full bg-white/5 border border-white/10 p-[3px]`
填充 `rounded-full shadow-[0_0_20px_rgba(255,77,0,0.4)]`，`transition-all duration-[2s]`

---

## 字体排版

```css
font-family: 'Inter', -apple-system, sans-serif;
letter-spacing: -0.01em;
```

| 用途 | 字体栈 |
|-----|-------|
| 全局 | `Inter, -apple-system, sans-serif` |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 超级标题 | `text-[10rem] font-black tracking-tighter leading-[0.8]` | text (渐变 白→橙) |
| 巨型标题 | `text-8xl font-black` | text |
| 区块标题 | `text-6xl font-black tracking-tighter uppercase` | text |
| 大数值 | `text-5xl font-black tracking-tighter` | text |
| 卡片标题 | `text-3xl font-black` | text |
| 描述正文 | `text-xl font-light italic` | textMuted |
| 列表正文 | `text-base font-bold` | hsl(240 4% 83%) |
| 辅助标签 | `text-xs font-black` | textMuted |
| 微标签 | `text-[10px] font-black uppercase tracking-[0.6em]` | hsl(240 4% 36%) |

### 排版特征

- 字间距分化：标题 `tracking-tighter` vs 微标签 `tracking-[0.4em]~[0.6em]`
- 全大写英文副标题/标签 `uppercase`
- 斜体引言 `italic font-light`
- 文字选区: `selection:bg-orange-600/40`

---

## 页面结构

> 暗夜灼光布局 — 纯黑画布 + 玻璃卡片 + 橙色光效穿透。

```
[背景层: light-leak 光晕 + grain-overlay 噪点]
Hero Header（bracket 装饰 + 超级标题 + 浮动玻璃装饰）
  → MetricCard x4（grid 2→4 列）
  → Section 1: 核心观察（InsightCard x3, lg:grid-cols-3）
  → Section 2: 画像解构（PersonaCard x4, lg:grid-cols-4）
  → Section 3: 数据可视化（左 3 右 2, lg:grid-cols-5）
  → Section 4: 进化路径（RoadmapCard x3, md:grid-cols-3）
  → Footer
```

容器 `max-w-[1080px]`，Section 间距 `space-y-48`，标题下间距 `mb-20`
Hero `py-48`，主内容 `py-32`，卡片内边距 `p-10~p-16`

---

## 视觉风格

### 圆角体系

| 元素 | 圆角 |
|------|------|
| 数据可视化大卡片 | `rounded-[60px]` |
| 人物 / 洞察卡片 | `rounded-[50px]~[56px]` |
| 统计卡片 | `rounded-[45px]` |
| 内嵌列表项 / 图标容器 | `rounded-[35px]~[40px]` |
| 玻璃装饰 / 浮动芯片 | `rounded-[25px]~[50px]` |
| 进度条 / 标签胶囊 / 指示点 | `rounded-full` |

### 玻璃拟态（glass-ethereal）

```css
background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
backdrop-filter: blur(40px) saturate(180%);
border: 1px solid rgba(255,255,255,0.08);
box-shadow: 0 4px 24px -1px rgba(0,0,0,0.2), 0 20px 48px -10px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.02);
```

### 发光体系

| 元素 | 效果 |
|------|------|
| 装饰竖条 | `shadow-[0_0_35px_rgba(255,77,0,0.5)]` |
| 数据指示点 | `shadow-[0_0_12px_rgba(255,77,0,1)]` |
| 进度条填充 | `shadow-[0_0_20px_rgba(255,77,0,0.4)]` |
| 核心光球 | `radial-gradient(#ff4d00, transparent 70%) + blur(50-80px) pulse` |

### 背景装饰层

- 噪点纹理: `fixed, opacity 0.2, mix-blend-mode: overlay`
- 环境光晕: 60vw `radial-gradient(rgba(255,77,0,0.08~0.12), transparent 70%) blur(100px)`
- 文字渐变: `linear-gradient(180deg, #fff 45%, #ff4d00 100%) -webkit-background-clip: text`
- Bracket 装饰: 4px 橙色 L 形角标

### 动效

- 浮动装饰: `float-ethereal 12s ease-in-out infinite` translateY(0~-20px)
- 光球脉冲: `pulse-core 8s ease-in-out infinite` opacity(0.3~0.6) scale(1~1.3)
- 进度条: `transition-all duration-[2s]`
- 滚动条: 宽度 6px, 轨道 #000, 滑块 #222

---

## 组件规范

### MetricCard（统计卡片）

`glass-ethereal p-10 rounded-[45px] border-white/5`
标签 `text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500`
数值 `text-5xl font-black tracking-tighter` + 单位 `text-lg text-zinc-700`
网格 `grid-cols-2 md:grid-cols-4 gap-6`

### InsightCard（洞察卡片）

`glass-ethereal p-10 rounded-[50px] border-white/5 flex flex-col`
装饰竖条 `w-2.5 h-20 bg-orange-600 rounded-full` + 发光阴影
引言 `text-zinc-400 italic text-xl font-light pl-6`
结论子卡片 `p-8 rounded-[35px] bg-white/[0.03] border border-white/5`

### PersonaCard（人物画像卡片）

`glass-ethereal rounded-[56px] p-10 border-white/10`
图标容器 `w-20 h-20 bg-orange-600/10 rounded-[35px]`
标签胶囊 `rounded-full bg-white/5 border border-white/10`

### RoadmapCard（路线图卡片）

`glass-ethereal p-12 rounded-[60px] border-t-[12px]`
P0 `border-orange-600` / P1 `border-yellow-500` / P2 `border-zinc-800`
内嵌项目卡片 `p-10 rounded-[40px] bg-white/[0.02] border border-white/5 shadow-2xl`

### SectionHeader（区块标题）

装饰竖条 `w-3 h-16 bg-orange-600 rounded-full` + 发光
标题 `text-6xl font-black tracking-tighter uppercase`
副标题 `text-zinc-600 font-bold uppercase tracking-[0.6em] text-[10px]`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 洞察 3 列, 人物 4 列, 数据可视化左 3 右 2, 浮动装饰显示 |
| >= 768px (md) | 统计 4 列, 人物 2 列, 路线图 3 列, Hero 放大 |
| < 768px | 统计 2 列, 其余单列, Hero 缩至 text-8xl, 浮动装饰隐藏 |

---

## 风格建议

- **纯黑背景不可替换**：`#000000` 是发光效果和玻璃拟态的前提
- **发光克制**：橙色发光仅用于装饰竖条、指示点、进度条三类
- **玻璃拟态一致**：所有卡片统一 `glass-ethereal`，不混用实色
- **Primary / Accent 分工**：primary（橙色）视觉焦点与交互，accent（zinc-800）低优先级区域
- **留白即奢侈**：Section 192px、卡片 40-64px、Hero 192px 不可压缩
- **单一色相**：全局仅 orange 高饱和，yellow 仅作优先级次级变体
