# Dark Gold Premium · 暗金奢华 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 暗金奢华 — 极深暗底 + 贵金属琥珀金高光，机构级视觉质感
- **Design Style**: Frosted Glass 毛玻璃 x Editorial 经典排版 — 渐变光晕深度感 + Serif/Sans-Serif 混排 + 超大留白
- **Visual Signature**:
  1. 金色渐变边框伪元素(gold-border-gradient)，对角线金色镂空
  2. Shimmer 微光文字动画 + metallic-glow 文字阴影
  3. 衬线(Playfair Display) + 无衬线(Inter)混排，古典与现代交融
  4. 模糊光斑背景(amber + blue)营造空间深度
  5. 中英双语章节标题体系，全大写 + 超宽字距标签
- **Emotional Tone**: 奢华、精密、从容、高端金融感

---

## 配色方案

**方案**: 自定义（Dark Slate + Amber Gold）
**色彩关系**: 四级暗度底色 + 琥珀金点缀
**主题**: 深色

> **配色设计理由**：接近纯黑的深蓝-黑画布搭配琥珀金作为唯一高饱和色彩，金色仅用于标题光效、装饰线和图表主色，通过极低密度使用维持高端感。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(225 78% 4%) | 页面主背景，接近纯黑 |
| surface | hsl(222 47% 11%) | 卡片半透明底、Tooltip 背景 |
| header | hsl(226 58% 6%) | Hero 渐变起点、特殊区块 |
| text | hsl(210 40% 90%) | 正文内容，slate-200 |
| textMuted | hsl(215 16% 47%) | 标签、注释、辅助说明 |
| primary | hsl(44 67% 51%) | 主交互色：金色光效、图标、图表主色、边框渐变 |
| accent | hsl(215 25% 27%) | 弱强调色：分割线、网格线（带透明度） |
| border | hsl(215 25% 27%) | 网格线、分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(44 67% 51%)`：shimmer 金色微光、装饰线、图表主色、CTA 光晕，视觉权重最高
**Accent（弱强调色）** — `hsl(215 25% 27%)`：分割线、网格线、卡片分隔，通常带 /50~/80 透明度

### 衍生规则

- **四级暗度**：bg hsl(225 78% 4%) -> surface hsl(222 47% 11%) -> header hsl(226 58% 6%) -> Footer hsl(228 78% 2%)
- **金色光效**：shimmer 渐变 `primary -> hsl(58 97% 63%) -> primary`，5s 线性循环
- **metallic-glow**：`text-shadow: 0 0 15px rgba(212,175,55,0.4)`
- **光斑系统**：amber-500/10 blur-[150px] 左上 + blue-600/10 blur-[150px] 右下

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 主金色 | hsl(44 67% 51%) | 主数据系列 |
| 暗金色 | hsl(36 90% 38%) | 次要数据 |
| 深棕金 | hsl(33 90% 21%) | 第三级 |
| 亮琥珀 | hsl(38 95% 53%) | 第四级 |
| 冷灰 | hsl(220 9% 34%) | 对比/兜底 |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(44,67%,51%)', 'hsl(36,90%,38%)', 'hsl(33,90%,21%)', 'hsl(38,95%,53%)', 'hsl(220,9%,34%)'];
//               主金色              暗金色              深棕金              亮琥珀              冷灰
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, -apple-system, sans-serif', color: 'hsl(215,25%,35%)', fontSize: 11, fontWeight: 700 },
  grid: { containLabel: true, left: 20, right: 30, top: 20, bottom: 5 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,25%,35%)', fontSize: 11, fontWeight: 700 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,25%,35%)', fontSize: 11, fontWeight: 700 },
    splitLine: { lineStyle: { color: 'hsl(215,25%,27%)', type: 'dashed' } }
  },
  tooltip: {
    backgroundColor: 'hsl(222,47%,11%)', borderColor: 'rgba(212,175,55,0.2)', borderWidth: 1,
    borderRadius: 12, textStyle: { color: 'hsl(0,0%,100%)' },
    axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(30,41,59,0.27)' } }
  },
  legend: {
    textStyle: { color: 'hsl(215,25%,35%)', fontSize: 11, fontWeight: 700 },
    top: 0, right: 0, icon: 'rect'
  }
};
```

### 各图表类型默认 series 样式

- **bar**: `barWidth: 60`, `itemStyle.borderRadius: [4,4,0,0]`
- **line**: `smooth: true`, `lineStyle.width: 4`, `showSymbol: false`; 面积渐变 primary 0.3 -> 0
- **pie 环形**: `radius: ['55%','80%']`, `padAngle: 8`, `label: { show: false }`

### 图表容器

容器高度 `h-72`(288px) ~ `h-96`(384px)，饼图 `min-h-[250px]`
过渡 `transition: all 0.3s ease`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Playfair+Display:ital,wght@1,700&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 正文/UI | `Inter, -apple-system, sans-serif` |
| 装饰/Hero | `Playfair Display, serif` (italic 700) |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| Hero 主标题 | `text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]` | white |
| Hero 衬线副标题 | `shimmer-text italic font-serif font-light` | primary 渐变 |
| 章节编号 | `text-5xl font-light italic font-serif text-amber-500/40` | primary/40 |
| 章节主标题 | `text-3xl font-bold tracking-tight uppercase` + metallic-glow | white |
| 章节副标题 | `text-sm font-medium tracking-[0.3em] uppercase` | primary/60 |
| 卡片标题 | `text-[10px] font-bold uppercase tracking-[0.3em]` + shimmer | primary/80 |
| 指标数值 | `text-3xl font-black tracking-tighter` + metallic-glow | white |
| 正文 | `text-sm text-slate-400 leading-relaxed font-light` | textMuted |
| Badge | `text-[9px] font-black uppercase tracking-widest` | primary |

---

## 页面结构

> 暗金奢华 — 极低信息密度 + Section 间 160px 超大间距

```
Fixed Background Layer（模糊光斑 + 垂直装饰线）
  -> Hero Section（渐变背景 from-header to-bg，机密标签 + 超大标题 + 元数据行）
  -> Main Content（max-w-5xl mx-auto py-24 space-y-40）
     -> Section 01（4列指标卡 + 2:1 网格）
     -> Section 02（3:2 网格）
     -> Section 03（全宽卡片）
     -> Section 04（2列网格）
     -> Section 05（3列网格 + 附录卡）
  -> Footer（bg-[hsl(228,78%,2%)] py-32 border-t）
```

容器 `max-w-5xl mx-auto px-4`，Section 间距 `space-y-40`(160px)

---

## 视觉风格

### 间距系统

| 元素 | 值 |
|-----|---|
| Section 间距 | `space-y-40` (160px) |
| Section 内部 | `space-y-12` (48px) |
| 卡片内边距 | `p-8` ~ `p-10` |
| 容器最大宽 | `max-w-5xl` (1024px) |

### 圆角与阴影

> Design DNA: 圆润 + 金色光晕

| 元素 | 圆角 | 阴影 |
|-----|------|------|
| 卡片 | `rounded-2xl` (16px) | `shadow-[0_0_40px_rgba(212,175,55,0.05)]` |
| 金边伪元素 | ~17px | — |
| CTA 按钮 | `rounded-full` | `shadow-[0_0_20px_rgba(212,175,55,0.15)]` |
| Badge | `rounded` (4px) | — |
| 柱状图顶部 | [4,4,0,0] | — |

### 背景系统

- 底色 `hsl(225 78% 4%)` + Hero 渐变 from-header to-bg
- 左上光斑: amber-500/10 blur-[150px] opacity-40 animate-pulse
- 右下光斑: blue-600/10 blur-[150px] opacity-30
- 垂直装饰线: 1px amber-500/20 渐变

### 边框系统

金色渐变伪元素 `linear-gradient(135deg, rgba(212,175,55,0.5) 0%, transparent 40%, transparent 60%, rgba(212,175,55,0.5) 100%)`
分割线 `border-slate-800/50`~`/80`，Hero 底线 `border-amber-500/10`
风险卡左边框 `border-l-4 border-l-amber-600/40`

### 动效

- Shimmer: `animation: shimmer 5s linear infinite`，background-position 200%
- 卡片悬停: `group-hover:-translate-y-2 transition-transform duration-500`
- 光晕过渡: `opacity-0 group-hover:opacity-100 transition-all duration-700`
- CTA: `transition-all duration-700`

---

## 组件规范

### SectionTitle 章节标题

序号(font-serif 5xl italic) + 标题组(英文 3xl bold + 中文 sm amber) + 装饰线(金色20px + 灰色flex-1)
间距 mb-16

### Card 通用卡片

外层 gold-border-gradient 伪元素渐变边框，可选 glow shadow
内层 `p-8 rounded-2xl`，标题区 `w-1 h-3 amber 圆点 + 10px 全大写金色标签 mb-8`

### Metric 指标组件

标签 `10px bold slate-500 uppercase tracking-widest`，hover 变 amber-500/50
数值 `3xl font-black white tracking-tighter` + metallic-glow

### 风险卡片

`!p-10 border-l-4 border-l-amber-600/40`
右上角超大序号 `text-8xl opacity-[0.03] italic`

### 人物卡片

group hover 上浮 -translate-y-2 + 外层渐变光晕
头像 `w-20 h-20 rounded-2xl border border-amber-500/20`
角色 `10px tracking-[0.4em] shimmer-text`

### CTA 按钮

`px-8 py-3 bg-amber-500/10 border border-amber-500/40 rounded-full`
文字 `xs font-black amber-400 tracking-[0.2em] uppercase` + metallic-glow
hover shadow 20px -> 30px，`transition-all duration-700`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 主内容 5列(3:2) / 3列(2:1) 分栏 |
| >= 768px (md) | 指标卡 4 列，风险/人物 2~3 列，Hero text-8xl |
| < 768px | 全部单列，Hero text-6xl |

---

## 风格建议

- **极低信息密度**：每卡片一个核心信息点，p-8~p-10 大留白，Section 间 160px
- **金色点到为止**：琥珀金仅用于标题光效、装饰线、图表主色、Badge，切勿大面积填充
- **暗色四级层次**：bg(底) -> surface(卡片) -> header(Hero) -> Footer 四级暗度分明
- **动效克制高雅**：shimmer 5s 缓慢，hover 500-700ms 从容
- **衬线体仅装饰**：Playfair Display 只在 Hero 和章节编号使用，正文一律 Inter
- **Primary / Accent 分工**：primary（琥珀金）专用视觉焦点和主交互，accent（暗色分割线）用于层次区分
