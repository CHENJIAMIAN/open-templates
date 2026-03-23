# Timeless Editorial · 典雅编辑风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 复古典雅、杂志编辑风、温润质感
- **Visual Signature**: 米色温暖背景、衬线字体标题、手写体装饰、纹理叠加、半透明卡片、极简侧边导航、大数字指标、渐变进度条
- **Emotional Tone**: 专业、优雅、温暖

---

## 配色方案

**方案**: 自定义 - 米色基底 + 深蓝主调
**色彩关系**: 温暖米色背景 + 深蓝文字 + 绿色点睛

| 角色 | HSL 值 | 用途 |
|-----|--------|-----|
| bg | hsl(40 33% 95%) | 页面背景 (#F5F2EB) |
| surface | hsla(0 0% 100% / 0.4) | 卡片/容器 (半透明白) |
| header | hsl(204 83% 29%) | 标题/强调区域 (#0A4E85) |
| text | hsl(204 83% 29%) | 主要文字 (#0A4E85) |
| textMuted | hsl(204 35% 45%) | 次要文字 (#4A7A9F) |
| accent | hsl(152 56% 25%) | 强调/成功状态 (#1D6338) |
| border | hsla(204 83% 29% / 0.15) | 边框/分割线 |

语义色:
- 中性/平均: hsl(0 0% 82%) (#D0D0D0)
- 成功/提升: hsl(152 56% 25%) (#1D6338)

图表配色序列:
```
hsl(204 83% 29%)   // 深蓝 #0A4E85
hsl(152 56% 25%)   // 深绿 #1D6338
hsl(204 35% 45%)   // 浅蓝 #4A7A9F
hsl(25 80% 55%)    // 暖橙 (补充)
hsl(45 85% 60%)    // 金黄 (补充)
```

---

## ECharts 主题样式

> 定义图表的视觉主题，确保图表与编辑典雅风格一致。
> 所有图表使用衬线字体数字、低饱和度配色、轻量网格线。

### 配色序列

```js
const COLORS = [
  'hsl(204, 83%, 29%)',   // 深蓝 - 主色
  'hsl(152, 56%, 25%)',   // 深绿 - 强调
  'hsl(204, 35%, 45%)',   // 浅蓝 - 辅助
  'hsl(25, 80%, 55%)',    // 暖橙 - 补充
  'hsl(45, 85%, 60%)',    // 金黄 - 补充
  'hsl(0, 0%, 82%)',      // 中性灰 - 基准
];
```

### ECharts 全局 BASE_OPTION

```js
// 所有图表实例共享的基础样式，通过 merge 使用
{
  color: COLORS,
  
  // 字体设置 - 使用衬线字体匹配编辑风格
  textStyle: {
    fontFamily: "'Playfair Display', serif",
    color: 'hsl(204, 35%, 45%)',  // textMuted
    fontSize: 12
  },
  
  backgroundColor: 'transparent',
  
  // 网格布局
  grid: {
    top: 48,
    right: 24,
    bottom: 48,
    left: 24,
    containLabel: true
  },
  
  // Tooltip 样式
  tooltip: {
    backgroundColor: 'hsla(0, 0%, 100%, 0.95)',
    borderColor: 'hsla(204, 83%, 29%, 0.15)',
    borderWidth: 1,
    borderRadius: 0,  // 保持方正，匹配编辑风格
    padding: [12, 16],
    textStyle: {
      color: 'hsl(204, 83%, 29%)',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 13
    },
    shadowBlur: 0,
    shadowColor: 'transparent'
  },
  
  // Legend 样式
  legend: {
    textStyle: {
      color: 'hsl(204, 35%, 45%)',
      fontSize: 11,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500
    },
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 16
  },
  
  // X 轴样式
  xAxis: {
    axisLine: {
      lineStyle: {
        color: 'hsla(204, 83%, 29%, 0.15)',
        width: 1
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'hsl(204, 35%, 45%)',
      fontSize: 11,
      fontFamily: "'DM Sans', sans-serif",
      margin: 12
    },
    splitLine: {
      show: false
    }
  },
  
  // Y 轴样式
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'hsl(204, 35%, 45%)',
      fontSize: 11,
      fontFamily: "'Playfair Display', serif",  // 数字用衬线字体
      margin: 12
    },
    splitLine: {
      lineStyle: {
        color: 'hsla(204, 83%, 29%, 0.08)',
        width: 1,
        type: 'solid'  // 实线，保持简洁
      }
    }
  }
}
```

### 各图表类型默认 series 样式

> 只描述视觉默认值，不包含具体图表实例、名称或数据。

**折线/面积图**:
```js
{
  type: 'line',
  smooth: false,  // 直线，保持理性
  lineStyle: {
    width: 2
  },
  symbol: 'circle',
  symbolSize: 6,
  showSymbol: false,  // 默认隐藏数据点
  emphasis: {
    focus: 'series',
    symbolSize: 8
  },
  areaStyle: {  // 面积图填充
    opacity: 0.12
  }
}
```

**柱状图**:
```js
{
  type: 'bar',
  barWidth: '50%',
  barMaxWidth: 40,
  itemStyle: {
    borderRadius: 0  // 方正柱体，匹配编辑风格
  },
  emphasis: {
    itemStyle: {
      shadowBlur: 0,
      shadowColor: 'transparent'
    }
  }
}
```

**环形/饼图**:
```js
{
  type: 'pie',
  radius: ['50%', '70%'],  // 环形图
  avoidLabelOverlap: true,
  padAngle: 2,  // 间隙
  itemStyle: {
    borderRadius: 0,  // 无圆角
    borderColor: 'hsl(40, 33%, 95%)',  // bg 色
    borderWidth: 2
  },
  label: {
    show: true,
    position: 'outside',
    formatter: '{b}: {d}%',
    fontSize: 12,
    fontFamily: "'DM Sans', sans-serif",
    color: 'hsl(204, 83%, 29%)'
  },
  labelLine: {
    length: 12,
    length2: 8,
    lineStyle: {
      color: 'hsla(204, 83%, 29%, 0.3)'
    }
  },
  emphasis: {
    scale: false,  // 无缩放动画
    scaleSize: 0
  }
}
```

**仪表盘**:
```js
{
  type: 'gauge',
  radius: '75%',
  startAngle: 200,
  endAngle: -20,
  axisLine: {
    lineStyle: {
      width: 12,
      color: [
        [0.3, 'hsl(0, 72%, 51%)'],      // 低: 红色
        [0.7, 'hsl(45, 85%, 60%)'],     // 中: 黄色
        [1, 'hsl(152, 56%, 25%)']       // 高: 绿色
      ]
    }
  },
  pointer: {
    width: 3,
    length: '60%',
    itemStyle: {
      color: 'hsl(204, 83%, 29%)'
    }
  },
  axisTick: {
    distance: -12,
    length: 4,
    lineStyle: {
      color: 'hsla(204, 83%, 29%, 0.3)'
    }
  },
  splitLine: {
    distance: -12,
    length: 8,
    lineStyle: {
      color: 'hsla(204, 83%, 29%, 0.3)'
    }
  },
  axisLabel: {
    distance: 16,
    color: 'hsl(204, 35%, 45%)',
    fontSize: 11,
    fontFamily: "'Playfair Display', serif"
  },
  detail: {
    valueAnimation: true,
    formatter: '{value}%',
    color: 'hsl(204, 83%, 29%)',
    fontSize: 32,
    fontFamily: "'Playfair Display', serif",
    fontWeight: 'normal',
    offsetCenter: [0, '70%']
  }
}
```

### 图表容器

- **容器卡片**: 半透明白色背景 `hsla(0, 0%, 100%, 0.4)` 或透明背景，1px 边框 `border-[hsla(204,83%,29%,0.15)]`
- **图表高度**: `h-80` (320px) 或 `h-72` (288px)
- **图表网格**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- **内边距**: `p-6` 或 `p-8`
- **标题样式**: 
  - 图表标题: `text-sm uppercase tracking-[0.15em] font-bold mb-4`
  - 数值标注: `text-3xl font-normal font-serif` (Playfair Display)

### 特殊图表类型

**漏斗图** (Funnel):
```js
{
  type: 'funnel',
  left: '10%',
  right: '10%',
  top: 60,
  bottom: 60,
  min: 0,
  max: 100,
  minSize: '20%',
  maxSize: '100%',
  sort: 'descending',
  gap: 2,
  label: {
    show: true,
    position: 'inside',
    formatter: '{b}: {c}',
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    color: '#fff'
  },
  labelLine: {
    show: false
  },
  itemStyle: {
    borderColor: 'hsl(40, 33%, 95%)',
    borderWidth: 2
  },
  emphasis: {
    label: {
      fontSize: 14
    }
  }
}
```

---

## 字体排版

Heading: 'Playfair Display', serif
Script/装饰: 'Mrs Saint Delafield', cursive  
Body: 'DM Sans', sans-serif
数字专用: 'Playfair Display', serif

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| 品牌标题 | text-4xl (2.5rem), font-normal, letter-spacing: -0.02em, line-height: 0.9 | text 色 |
| Script 装饰 | text-2xl ~ 2.5rem, font-normal, cursive | text 色 |
| Section 标题 | text-3xl (2rem), font-normal, serif, letter-spacing: -0.01em | text 色 |
| 大数字指标 | text-[3.5rem], font-normal, serif, line-height: 1 | text 色 |
| 标签文字 | text-[0.65rem], uppercase, letter-spacing: 0.15em, font-bold | text 色 |
| 正文 | text-sm (0.75rem), font-medium | text 色 |
| 斜体注释 | text-sm (0.75rem), font-normal, italic, serif | text 色, opacity-80 |

---

## 页面结构

**布局模式**: 侧边栏导航 + 主内容区

```
┌──────────────────────────────────────────┐
│ ┌────────┐  ┌────────────────────────┐  │
│ │        │  │                        │  │
│ │ 侧边栏  │  │      主内容区           │  │
│ │ 导航    │  │                        │  │
│ │        │  │                        │  │
│ └────────┘  └────────────────────────┘  │
└──────────────────────────────────────────┘
```

**桌面端结构**:
- 全局容器: max-w-[1400px] mx-auto px-16 py-12
- 网格布局: grid grid-cols-[240px_1fr] gap-16

**侧边栏**:
- 宽度: 240px
- 定位: sticky top-12
- 品牌区 + 导航列表 + 信息卡片

**主内容区**:
- 流式布局: flex flex-col gap-16

---

## 视觉风格

### 间距系统
- 区块间距: 64px (4rem)
- 组件间距: 32px (2rem)
- 卡片内边距: 16px
- 页面边距: 64px (桌面), 16px (移动)

### 文字规范
- 行高: body 1.5 ~ 1.6, heading 0.9 ~ 1.1
- 字重对比: 标题 400, 标签 700, 正文 500~400
- 字距: 标签 0.15em, 标题 -0.01em ~ -0.02em

### 圆角与阴影
- 容器圆角: 无圆角或 rounded-sm
- 卡片圆角: 无圆角或 rounded
- 容器阴影: 无
- 卡片阴影: 无 (依靠半透明背景和边框)

### 特效
- **纹理叠加**: 
  - 固定定位覆盖层
  - SVG fractal noise 纹理
  - opacity: 0.05
  - pointer-events: none
  - z-index: 9999

---

## 组件规范

### 导航样式

**导航模式**: 侧边栏垂直导航

**导航栏视觉参数**:
- 背景: 透明
- 间距: gap-6 (1.5rem)
- 字体: text-xs (0.75rem), uppercase, letter-spacing: 0.15em, font-bold
- 默认状态: opacity-60
- 激活/Hover: opacity-100
- 激活指示器: 4px 圆点 (border-radius: 50%)

### 品牌标识区

**组成**: Script 装饰文字 + Serif 标题 + 标签

**样式**:
```
Script: text-2xl, margin-bottom: 0.5rem
标题: text-4xl, serif, line-height: 0.9, letter-spacing: -0.02em
标签: text-[0.65rem], uppercase, letter-spacing: 0.15em, margin-top: 1rem
```

### 指标卡片

**布局**: 
- 网格: grid grid-cols-4 gap-8
- 底部边框: border-b border-color pb-12

**单卡结构**:
```
标签 (label)
↓
大数字 (metric-value)
↓
趋势文字 (metric-trend)
```

**样式参数**:
- 标签: text-[0.65rem], uppercase, tracking-[0.15em], font-bold, mb-2
- 数值: text-[3.5rem], serif, line-height: 1, mt-2
- 趋势: text-xs (0.75rem), serif, italic, mt-2, opacity-80

### 进度条/漏斗条

**容器**: flex gap-4

**单条结构**:
```
标签
↓
进度条 (高度可变)
↓
数值 + 百分比
```

**进度条样式**:
- 容器: w-full h-[200px], bg surface 色, border border-color
- 填充: bg accent 色或渐变, 高度百分比可变
- 数值: text-xl, font-bold, serif
- 百分比: text-sm, textMuted 色

### 表格

**结构**: 
- 表头: grid 布局, 5 列
- 行: grid 布局, 对齐表头

**样式参数**:
- 表头: 标签文字样式
- 行间距: gap-y-4
- 行内边距: py-4
- 分割线: border-b border-color
- 用户头像: 圆形, 40px, 首字母缩写
- 状态徽章: 
  - 圆角: rounded-full
  - 内边距: px-3 py-1
  - 字体: text-[0.65rem], uppercase, tracking-[0.15em]
  - 高状态: bg accent 色, 白色文字
  - 中状态: bg textMuted 色, 白色文字

### 按钮/过滤器

**样式**:
- 字体: text-xs (0.75rem), uppercase, letter-spacing: 0.1em
- 边框: 1px solid border 色
- 背景: 透明
- 内边距: px-4 py-2
- Hover: 背景 surface 色

---

## 响应式断点

**桌面端**: >= 1024px
- 双列布局: 侧边栏 240px + 主内容区
- 指标网格: 4 列
- 全部间距正常

**平板端**: 768px - 1023px
- 单列布局: 导航顶置或折叠
- 指标网格: 2 列
- 间距缩小至 2/3

**移动端**: < 768px
- 单列堆叠
- 指标网格: 1 列
- 侧边导航: 汉堡菜单或底部标签栏
- 页面边距: 16px
- 字号适当缩小 (大数字 text-5xl → text-4xl)

---

## 风格建议

1. **纹理叠加是核心特征**  
   建议在所有页面保持 SVG noise 纹理叠加,营造纸质/印刷质感

2. **字体混搭策略**  
   - 标题和数字用衬线字体 (Playfair Display)
   - 正文和标签用无衬线字体 (DM Sans)  
   - 装饰性文字用手写体 (Mrs Saint Delafield)  
   - 避免过度使用手写体,仅用于品牌标识和区块装饰

3. **留白与分组**  
   通过大间距 (64px) 和边框分割线建立内容层级,避免使用卡片阴影

4. **半透明卡片使用场景**  
   仅在需要与背景纹理产生层次关系时使用半透明卡片,大部分组件直接置于背景上

5. **色彩克制**  
   主要依靠米色 + 深蓝建立基调,绿色仅用于成功/提升状态,保持克制

6. **响应式优先级**  
   移动端优先折叠导航和简化指标展示,确保核心数据可读性
