# Minimal Jade · 简约翡翠 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 简洁商务、清爽专业、数据驱动
- **Visual Signature**: 浅灰蓝背景、绿色单主色、等宽数字、排名渐变色系、卡片浮动效果
- **Emotional Tone**: 专业、可信赖

---

## 配色方案

**方案**: 自定义浅色
**色彩关系**: 浅灰蓝基底 + 绿色主调

| 角色 | HSL 值 | 用途 |
|-----|--------|-----|
| bg | hsl(215 25% 97%) | 页面背景 (#F5F7FA) |
| surface | hsl(0 0% 100%) | 卡片背景 |
| header | hsl(220 13% 13%) | 标题文字 (gray-900) |
| text | hsl(220 13% 13%) | 主要文字 (gray-900) |
| textMuted | hsl(220 9% 46%) | 次要文字 (gray-500) |
| accent | hsl(95 69% 71%) | 主色调 (#A0E870) |
| accentDark | hsl(95 46% 53%) | 深绿强调 (#7bc44c) |
| border | hsl(220 13% 91%) | 边框 (gray-200) |

语义色: 上升 #7bc44c / 下降 red-500

图表配色序列: #A0E870 (第一名), rgba(0,0,0,0.9~0.1) (排名渐变)

---

## ECharts 主题样式

> 原项目使用 Recharts，以下为转换后的 ECharts 等效配置。

### 配色序列
```js
const PRIMARY_GREEN = '#A0E870';
// 排名渐变色系统 (用于饼图/柱状图等有排名概念的图表)
const getRankedColor = (index) => {
  if (index === 0) return PRIMARY_GREEN;
  const opacity = Math.max(0.1, 0.9 - (index - 1) * 0.15);
  return `rgba(0, 0, 0, ${opacity})`;
};
```

### BASE_OPTION
```js
{
  color: [PRIMARY_GREEN],
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'JetBrains Mono, monospace', color: '#9CA3AF', fontSize: 11 },
  grid: { top: 10, right: 10, bottom: 0, left: 0, containLabel: true },
  tooltip: {
    backgroundColor: '#fff',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    textStyle: { color: '#000', fontSize: 12, fontFamily: 'JetBrains Mono' }
  },
  legend: {
    textStyle: { color: '#6B7280', fontSize: 12, fontFamily: 'JetBrains Mono' },
    icon: 'circle',
    iconSize: 8
  },
  xAxis: {
    axisLine: false,
    axisTick: false,
    axisLabel: { color: '#9CA3AF', fontSize: 11, fontFamily: 'JetBrains Mono' },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: false,
    axisTick: false,
    axisLabel: { color: '#9CA3AF', fontSize: 11, fontFamily: 'JetBrains Mono' },
    splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } }
  }
}
```

### 各类型默认 series 样式
**面积图**: `smooth: true, lineStyle.width: 3, symbol.size: 4, areaStyle: 渐变填充 (5% opacity 0.3 → 95% opacity 0)`
**饼图**: `radius: ['60%','80%'], padAngle: 2, label: false, itemStyle.borderWidth: 0`
**雷达图**: `lineStyle.width: 2, areaStyle.opacity: 0.4`
**柱状图 (横向)**: `barSize: 20, itemStyle.borderRadius: [0,4,4,0]` (右侧圆角)

### 图表容器
- 卡片: bg-white, rounded-xl, shadow-sm, border border-transparent, p-6
- 高度: h-[420px] 或 h-[450px]
- 网格: grid-cols-1 lg:grid-cols-2 或 lg:grid-cols-3 gap-6

---

## 字体排版

Heading/Body: Inter, system-ui, sans-serif
数字专用: JetBrains Mono, monospace

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 页面标题 | text-5xl md:text-6xl font-bold tracking-tight | gray-900 |
| 页面副标题 | text-base text-gray-500 tracking-wide | gray-500 |
| 卡片标题 | font-semibold | gray-900 |
| KPI 标题 | text-sm uppercase tracking-wide | gray-500 |
| KPI 数值 | text-3xl font-bold font-mono tracking-tighter tabular-nums | gray-900 |
| 趋势数字 | text-xs font-medium font-mono | #7bc44c 或 red-500 |

---

## 页面结构

标题区 → KPI 卡片行 → 图表网格 (2/3 + 1/3 或 1/3 三等分)

| 元素 | 样式 |
|-----|-----|
| 页面背景 | bg-[#F5F7FA] text-gray-900 |
| 全局容器 | max-w-[1300px] mx-auto px-6 space-y-10 pb-12 pt-12 |
| 标题区边框 | border-b border-gray-200/60 pb-6 |
| 页面标题 | text-5xl md:text-6xl font-bold tracking-tight mb-3 |
| 元数据标签 | text-[10px] uppercase tracking-widest text-gray-400 font-semibold |

---

## 视觉风格

### 间距系统
区块间距: 40px (space-y-10)
卡片间距: 24px (gap-6)
卡片内边距: 24px (p-6)
页面边距: 24px (px-6), 上下 48px (pt-12 pb-12)

### 圆角与阴影
卡片圆角: rounded-xl
按钮/小元素圆角: rounded-lg, rounded
卡片阴影: shadow-sm
Hover 效果: hover:border-gray-100, y: -2 (向上浮动)

---

## 组件规范

### KPI 卡片
- 背景: bg-white
- 圆角: rounded-xl
- 阴影: shadow-sm
- 边框: border border-transparent hover:border-gray-100
- Hover: 向上浮动 2px (motion)
- 图标背景: bg-[#A0E870]/10, 图标色 #A0E870
- 标题: text-gray-500 text-sm uppercase tracking-wide
- 数值: text-3xl font-mono font-bold tracking-tighter tabular-nums
- 趋势: flex gap-0.5 text-xs font-mono, 带上下箭头图标

### 图表卡片
- 背景: bg-white
- 圆角: rounded-xl
- 阴影: shadow-sm
- 边框: border border-transparent
- 标题: font-semibold text-gray-900
- 副标题/标签: text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded

### AI 洞察卡片
- 左侧装饰: w-1 h-4 bg-[#A0E870] rounded-full
- 标题: 与卡片标题一致

---

## 响应式断点

桌面端: >= 1024px, 4列 KPI, 3列图表或 2/3 + 1/3 分栏
平板端: 768px - 1023px, 2列 KPI, 单列图表
移动端: < 768px, 单列堆叠

---

## 风格建议

- 数字和数据使用 JetBrains Mono + tabular-nums 确保对齐
- 使用排名渐变色系统 (getRankedColor) 可视化数据优先级
- 卡片 hover 时添加微动效 (y: -2) 增强交互感
- 标题区使用极大字号 (text-5xl/6xl) 建立视觉层级
- 图表颜色避免过度丰富，优先使用单主色 + 黑色渐变
