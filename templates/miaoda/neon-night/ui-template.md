# Neon Night · 暗夜霓虹 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 现代深色、科技感、数据密集
- **Visual Signature**: 深色背景、绿色与琥珀色双色系、等宽数字、轻微透明边框、紧凑布局
- **Emotional Tone**: 专业、高效

---

## 配色方案

**方案**: 自定义深色
**色彩关系**: 深灰黑基底 + 绿色与琥珀色双强调

| 角色 | HSL 值 | 用途 |
|-----|--------|-----|
| bg | hsl(240 6% 6%) | 页面背景 (#0f0f11) |
| surface | hsl(0 0% 10%) | 卡片背景 (#1a1a1a) |
| header | hsl(0 0% 100%) | 标题文字 |
| text | hsl(0 0% 100%) | 主要文字 |
| textMuted | hsl(0 0% 55%) | 次要文字 (#9ca3af, #6b7280) |
| accent | hsl(141 77% 58%) | 绿色强调 (#4ade80) |
| accentAlt | hsl(43 96% 56%) | 琥珀色强调 (#fbbf24) |
| border | hsla(0 0% 100% / 0.05) | 卡片边框 |

图表配色序列: #4ade80 (绿), #fbbf24 (琥珀), #6b7280 (灰)

---

## ECharts 主题样式

> 原项目使用 Recharts，以下为转换后的 ECharts 等效配置。

### 配色序列
```js
const COLORS = ['#4ade80', '#fbbf24', '#6b7280', '#9ca3af'];
```

### BASE_OPTION
```js
{
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, system-ui, sans-serif', color: '#9ca3af', fontSize: 10 },
  grid: { top: 40, right: 16, bottom: 40, left: 16, containLabel: true },
  tooltip: {
    backgroundColor: '#fff',
    borderColor: 'transparent',
    borderRadius: 8,
    padding: 12,
    textStyle: { color: '#000', fontSize: 12 }
  },
  legend: {
    textStyle: { color: '#9ca3af', fontSize: 12 },
    icon: 'circle',
    iconSize: 8,
    bottom: 0
  },
  xAxis: {
    axisLine: false,
    axisTick: false,
    axisLabel: { color: '#6b7280', fontSize: 10 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: false,
    axisTick: false,
    axisLabel: { color: '#6b7280', fontSize: 10 },
    splitLine: { lineStyle: { color: '#333', type: 'dashed' } }
  }
}
```

### 各类型默认 series 样式
**折线图**: `smooth: true, lineStyle.width: 2, symbol: 'none'`
**面积图**: `smooth: true, lineStyle.width: 2, symbol: 'none', areaStyle.opacity: 0.1`
**柱状图**: `barSize: 16, itemStyle.borderRadius: [2,2,0,0]` 或 `[4,4,0,0]`（堆叠顶部）
**饼图**: `radius: ['50%','80%'], padAngle: 0, label: false, itemStyle.borderWidth: 0`
**环形图**: `radius: ['62%','100%'], padAngle: 0`

### 图表容器
- 卡片: bg-[#1a1a1a], rounded-2xl, border border-white/5, p-6, shadow-sm
- 高度: h-[400px] 或 h-[80px] (迷你图表)
- 网格: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

---

## 字体排版

Heading/Body: Inter, system-ui, sans-serif
数字专用: JetBrains Mono (或 monospace)

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面标题 | text-3xl font-bold | 白色 |
| 卡片标题 | text-lg font-medium | 白色 |
| 数字/KPI | text-3xl font-bold (mono) | 白色 |
| 正文 | text-sm | #6b7280 |
| 次要文字 | text-xs | #9ca3af, #6b7280 |

---

## 页面结构

Header → KPI 卡片网格 → 图表网格

| 元素 | 样式 |
|-----|-----|
| 页面背景 | bg-[#0f0f11] text-white |
| 全局容器 | max-w-7xl mx-auto p-8 |
| Header 标题 | text-3xl font-bold mb-1 |
| Header 副标题 | text-gray-400 text-sm |
| 按钮 (主要) | bg-[#fbbf24] text-black px-4 py-2 rounded-lg hover:bg-[#f59e0b] |
| 按钮 (次要) | bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 |

---

## 视觉风格

### 间距系统
区块间距: 24px (gap-6)
卡片内边距: 24px (p-6)
组件间距: 12-16px (gap-3, gap-4)
页面边距: 32px (p-8)

### 圆角与阴影
卡片圆角: rounded-2xl
按钮圆角: rounded-lg
小元素圆角: rounded (标签), rounded-full (圆点)
卡片阴影: shadow-sm

---

## 组件规范

### 卡片
- 背景: bg-[#1a1a1a]
- 边框: border border-white/5
- 圆角: rounded-2xl
- 内边距: p-6
- 阴影: shadow-sm

### 按钮
- 主按钮: bg-[#fbbf24] text-black, hover:bg-[#f59e0b]
- 次按钮: bg-white text-black, hover:bg-gray-100
- 下拉按钮: bg-[#27272a] text-gray-400, hover:bg-[#3f3f46]

### KPI 卡片
- 标题: text-gray-400 text-sm
- 数值: text-3xl font-bold
- 趋势标签: bg-green-500/10 text-green-500 px-1 py-0.5 rounded
- 小图表: 绝对定位右上角, h-[60px] w-[100px]

### Legend/图例
- 圆点: w-1.5 h-1.5 rounded-full
- 文字: text-[10px] text-gray-400

---

## 响应式断点

桌面端: >= 1024px, 3列布局
平板端: 768px - 1023px, 2列布局
移动端: < 768px, 单列堆叠, flex-col

---

## 风格建议

- 使用等宽字体 (mono) 展示数字，确保对齐整齐
- 深色背景下优先使用绿色和琥珀色作为视觉焦点
- 边框使用低透明度白色 (white/5) 保持轻盈感
- 图表避免过多装饰，保持数据密度
