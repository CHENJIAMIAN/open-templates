# Redline Journal · 赤线纪要 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 传统编辑美学、经典印刷风格、强烈的视觉层级
- **Visual Signature**: 超大衬线标题、细线分隔、标签式小标题、数字带下划线、带箭头的增量指示、简洁柱状图
- **Emotional Tone**: 专业、沉稳、权威

---

## 配色方案

**方案**: 自定义 Editorial Red
**色彩关系**: 暖米色基底 + 朱红色全要素

| 角色 | HSL 值 | 用途 |
|-----|--------|-----|
| bg | hsl(40 33% 88%) | 页面背景 (#EAE4D8) |
| surface | hsl(40 33% 88%) | 内容容器（与 bg 同色） |
| header | hsl(5 66% 47%) | 标题/强调元素 (#CD3324) |
| text | hsl(5 66% 47%) | 正文（与 header 同色，全红） |
| textMuted | hsl(5 66% 47% / 0.9) | 次要文字（红色 90% 透明度） |
| accent | hsl(5 66% 47%) | 交互元素（与 header 同色） |
| border | hsl(5 66% 47%) | 边框/分隔线（与 header 同色） |

**设计特点**: 单色系配色，所有文字、边框、图形元素均使用同一红色，通过透明度和字重营造层次。

---

## ECharts 主题样式

> 定义图表的视觉主题，确保图表与项目整体风格一致。
> 所有图表样式必须以 ECharts option 格式输出。

### 配色序列
```js
const COLORS = ['hsl(5 66% 47%)', 'hsl(5 66% 37%)', 'hsl(5 66% 57%)', 'hsl(5 66% 42%)', 'hsl(5 66% 52%)'];
```

### ECharts 全局 BASE_OPTION
```js
// 所有图表实例共享的基础样式，通过 merge 使用
{
  color: COLORS,
  textStyle: { 
    fontFamily: "'Noto Sans SC', sans-serif", 
    color: 'hsl(5 66% 47% / 0.9)' 
  },
  backgroundColor: 'transparent',
  grid: { 
    top: 40, 
    right: 16, 
    bottom: 40, 
    left: 16, 
    containLabel: true 
  },
  tooltip: { 
    backgroundColor: 'hsl(40 33% 88%)', 
    borderColor: 'hsl(5 66% 47%)', 
    borderWidth: 1,
    borderRadius: 4, 
    textStyle: { 
      color: 'hsl(5 66% 47%)',
      fontSize: 12
    },
    padding: [8, 12]
  },
  legend: { 
    textStyle: { 
      color: 'hsl(5 66% 47% / 0.9)', 
      fontSize: 12,
      fontFamily: "'Noto Sans SC', sans-serif"
    }, 
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 14
  },
  xAxis: { 
    axisLine: { 
      lineStyle: { 
        color: 'hsl(5 66% 47%)',
        width: 1
      } 
    }, 
    axisTick: { 
      show: false 
    }, 
    axisLabel: { 
      color: 'hsl(5 66% 47% / 0.9)', 
      fontSize: 12,
      fontFamily: "'Noto Sans SC', sans-serif"
    },
    splitLine: {
      show: false
    }
  },
  yAxis: { 
    axisLine: { 
      show: false 
    }, 
    axisTick: {
      show: false
    },
    axisLabel: { 
      color: 'hsl(5 66% 47% / 0.9)', 
      fontSize: 12,
      fontFamily: "'Noto Sans SC', sans-serif"
    },
    splitLine: { 
      lineStyle: { 
        color: 'hsl(5 66% 47% / 0.15)', 
        type: 'solid',
        width: 1
      } 
    }
  }
}
```

### 各图表类型默认 series 样式

**折线/面积图**: 
- `smooth: false` (直线段)
- `lineStyle.width: 2`
- `symbol: 'circle'`
- `symbolSize: 6`
- `areaStyle.opacity: 0.12`（如需面积填充）

**柱状图**: 
- `barWidth: '100%'`（在 bar-group 容器内充满）
- `itemStyle.borderRadius: 0`（直角）
- `barGap: '20%'`
- `itemStyle.color: 'hsl(5 66% 47%)'`

**环形/饼图**: 
- `radius: ['50%', '70%']`
- `padAngle: 0`
- `itemStyle.borderRadius: 0`
- `itemStyle.borderWidth: 0`
- `label.position: 'outside'`
- `label.color: 'hsl(5 66% 47%)'`

### 图表容器
- 容器: 边框 1px solid border 色, padding 24px, background transparent
- 高度: h-[300px]（参考原设计 300px 固定高度）
- 布局: 通常配合文字内容使用 2fr 1fr 的栅格布局

---

## 字体排版

**Heading**: 'Noto Serif SC', serif（宋体风格衬线字体）
**Body**: 'Noto Sans SC', sans-serif（黑体风格无衬线字体）
**数字专用**: 'Noto Serif SC', serif（保持衬线风格）

Google Fonts 引入：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600&family=Noto+Sans+SC:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 页面结构

整体采用单栏容器布局，从上至下：

1. **Header 区域**: 元数据行 + 超大标题 + 副标题
2. **指标卡片行**: 4 列等宽网格
3. **内容网格**: 2fr + 1fr 双列布局（左侧摘要文字，右侧图表）
4. **状态列表**: 优先项目列表
5. **Footer 网格**: 3 列等宽

响应式：移动端 < 768px 时，指标卡片改为 2x2 网格，内容网格变为单列堆叠。

---

## 视觉风格

### 间距系统
- **区块间距**: 48px (--spacing-lg)
- **组件间距**: 24px (--spacing-md)
- **内部间距**: 16px (--spacing-sm)
- **小间距**: 8px (--spacing-xs)
- **超大间距**: 80px (--spacing-xl，用于 Footer 顶部间距)
- **页面边距**: 桌面 48px + 24px，移动端 24px

### 文字规范
| 层级 | 样式 | 颜色 | 字体 |
|-----|-----|-----|-----|
| H1 (报告主标题) | 5rem (80px), line-height: 0.9, letter-spacing: -0.02em, font-weight: 400 | hsl(5 66% 47%) | Noto Serif SC |
| H2 (章节标题) | 1.5rem (24px), line-height: 1.2, font-weight: 400 | hsl(5 66% 47%) | Noto Serif SC |
| 小标题标签 (LABEL) | 0.7rem (11.2px), uppercase, letter-spacing: 0.15em, font-weight: 600 | hsl(5 66% 47% / 0.9) | Noto Sans SC |
| 指标数值 | 3.5rem (56px), line-height: 1, font-weight: 400 | hsl(5 66% 47%) | Noto Serif SC |
| 指标编号 | 0.75rem (12px), font-weight: 600, text-decoration: underline | hsl(5 66% 47%) | Noto Sans SC |
| 正文 Body | 1rem (16px), line-height: 1.6, max-width: 65ch | hsl(5 66% 47%) | Noto Sans SC |
| 次要文字 | 0.9rem (14.4px), line-height: 1.6 | hsl(5 66% 47%) | Noto Sans SC |
| 图表标签 | 0.7rem (11.2px) | hsl(5 66% 47% / 0.9) | Noto Sans SC |

### 圆角与阴影
- **容器圆角**: 0（无圆角，保持方正印刷感）
- **卡片圆角**: 0
- **阴影**: 不使用阴影效果

---

## 组件规范

### Header 区域
```html
<header>
  <div class="header-meta">
    <span class="label">标签1</span>
    <span class="label">标签2</span>
    <span class="label">标签3</span>
  </div>
  <h1 class="report-title">超大标题</h1>
  <p class="report-subtitle">副标题说明文字，最大宽度 600px</p>
</header>
```
样式要点：
- 底部 2px 实线边框
- 元数据行：flex, space-between
- 标题尺寸：5rem，行高 0.9
- 副标题：1.5rem，行高 1.2，最大宽度 600px

### 指标卡片
```html
<div class="metric-card">
  <span class="metric-num">01</span>
  <span class="label">指标名称</span>
  <span class="metric-value serif-num">数值</span>
  <div class="metric-delta arrow-up">变化描述</div>
</div>
```
样式要点：
- 垂直方向 flex 布局，gap: 8px
- 右侧 1px 边框（最后一个不显示）
- padding: 24px 24px 24px 0（第一个左内边距为 0）
- 数字编号带下划线
- 箭头图标使用伪元素实现（`::before { content: "↑"; transform: rotate(45deg); }`）

### 章节标题
```html
<div class="section-header">
  <h2 class="serif-num">标题</h2>
  <span class="label">辅助信息</span>
</div>
```
样式要点：
- flex, space-between, align-items: baseline
- 底部 1px 边框，padding-bottom: 8px

### 状态列表行
```html
<div class="status-row">
  <span class="row-index">01</span>
  <span class="row-title">标题</span>
  <span class="row-meta">元信息</span>
  <span class="status-pill">状态</span>
</div>
```
样式要点：
- grid 布局：auto 3fr 1fr auto
- 底部 1px 边框
- padding: 24px 0
- 状态胶囊：1px 边框，圆角 9999px，padding: 4px 12px，字号 0.7rem

### 文字块
```html
<div class="text-block">
  <p>段落文字...</p>
</div>
```
样式要点：
- font-size: 1rem
- line-height: 1.6
- max-width: 65ch（控制行长）
- 段落间距 1em

### 列表（无装饰）
```html
<ul style="list-style: none;">
  <li style="margin-bottom: 12px; display: flex; gap: 12px;">
    <span style="color: var(--primary-color);">→</span>
    <span>列表项内容</span>
  </li>
</ul>
```
样式要点：
- list-style: none
- 使用箭头符号 "→" 作为前缀
- flex 布局，gap: 12px

---

## 边框与分隔线

**核心原则**: 使用细线（1-2px）结构化内容，营造印刷品的精确感。

| 位置 | 样式 |
|-----|-----|
| Header 底部 | 2px solid hsl(5 66% 47%) |
| 指标卡片间 | 1px solid hsl(5 66% 47%) 垂直分隔 |
| 章节标题底部 | 1px solid hsl(5 66% 47%) |
| 内容区块顶部 | 1px solid hsl(5 66% 47%) |
| 图表容器 | 1px solid hsl(5 66% 47%) 全边框 |
| 状态列表行间 | 1px solid hsl(5 66% 47%) |
| Footer 顶部 | 1px solid hsl(5 66% 47%) |

---

## 布局细节

### 全局容器
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px; /* var(--spacing-lg) var(--spacing-md) */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 48px; /* var(--spacing-lg) */
}
```

### 指标网格
```css
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid hsl(5 66% 47%);
}
```

### 内容网格
```css
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px; /* var(--spacing-lg) */
  border-top: 1px solid hsl(5 66% 47%);
  padding-top: 24px; /* var(--spacing-md) */
}
```

### 图表容器
```css
.chart-container {
  border: 1px solid hsl(5 66% 47%);
  padding: 24px; /* var(--spacing-md) */
  height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  position: relative;
}
```

---

## 响应式断点

**桌面端**: >= 769px
- 指标卡片：4 列网格
- 内容网格：2fr + 1fr 双列
- 状态列表：grid-template-columns: auto 3fr 1fr auto

**移动端**: < 768px
- 指标卡片：2x2 网格，偶数列左侧加边框
- 内容网格：单列堆叠
- 报告主标题：3.5rem（从 5rem 缩小）
- 状态列表：重新布局为两行（索引 + 标题第一行，元信息 + 状态第二行）

移动端关键调整：
```css
@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid hsl(5 66% 47%);
  }
  .metric-card:nth-child(even) {
    padding-left: 16px; /* var(--spacing-sm) */
    border-left: 1px solid hsl(5 66% 47%);
  }
  .content-grid {
    grid-template-columns: 1fr;
  }
  .report-title {
    font-size: 3.5rem;
  }
}
```

---

## CSS 变量定义

```css
:root {
  --bg-color: hsl(40 33% 88%);           /* #EAE4D8 */
  --primary-color: hsl(5 66% 47%);       /* #CD3324 */
  --line-color: hsl(5 66% 47%);          /* #CD3324 */
  --text-body: hsl(5 66% 47%);           /* #CD3324 */
  
  --font-display: 'Noto Serif SC', serif;
  --font-sans: 'Noto Sans SC', sans-serif;
  
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 48px;
  --spacing-xl: 80px;
}
```

---

## 交互效果

### 图表柱状图 hover
```css
.bar:hover {
  opacity: 0.8;
  cursor: pointer;
}
```

### 状态列表行 hover
```css
.status-row:hover {
  background-color: hsl(5 66% 47% / 0.03);
}
```

**原则**: 交互反馈克制、轻量，不使用变形、阴影等效果，仅通过透明度变化。

---

## 风格建议

1. **印刷品美学优先**: 保持方正、对齐、精确的视觉节奏，避免过度圆润或装饰。

2. **单色系统的力量**: 利用同一红色的不同透明度和字重营造层次，而非依赖多种颜色。

3. **衬线与无衬线的对比**: 标题使用衬线字体（Noto Serif SC）营造权威感，正文使用无衬线字体（Noto Sans SC）确保易读性。

4. **留白的精确性**: 间距系统严格，8px 的倍数递增（8、16、24、48、80），保持数学上的和谐。

5. **线条结构化**: 使用 1-2px 的细线分隔区块，形成清晰的视觉网格，替代卡片和阴影。

6. **图表简洁性**: 图表应保持极简，避免过多装饰，颜色单一，聚焦数据本身。

7. **响应式降级**: 移动端优先保留核心信息层级，适当缩小尺寸，调整布局为单列或 2x2 网格。

---

## 适用场景

此风格模板适用于：
- 周报、月报等定期报告
- 项目状态汇报
- 数据展示页面
- 需要权威、专业视觉感的内容呈现
- 强调阅读性和信息层级的文档

不适用于：
- 需要丰富色彩的营销页面
- 游戏化或娱乐性产品
- 需要大量交互动效的应用界面
