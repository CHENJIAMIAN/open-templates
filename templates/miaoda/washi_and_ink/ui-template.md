# Washi & Ink · 和纸墨韵 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 传统日式美学融合现代排版,东方禅意与西方网格系统的平衡
- **Visual Signature**: 大型汉字标题、竖写元数据、几何装饰图形、纸质纹理背景、网格线条系统、悬停显示巨型汉字水印
- **Emotional Tone**: 沉静、精致、仪式感

---

## 配色方案

**方案**: 自定义 - 和纸色系
**色彩关系**: 暖中性纸色基底 + 朱红点睛 + 低饱和度冷调辅助

| 角色 | HSL 值 | 用途 |
|-----|--------|-----|
| bg | hsl(50, 15%, 93%) | 页面背景(和纸色) |
| surface | hsl(45, 12%, 91%) | 卡片/容器背景 |
| header | hsl(0, 0%, 10%) | 标题/重点区域 |
| text | hsl(0, 0%, 10%) | 正文(墨黑) |
| textMuted | hsl(210, 23%, 37%) | 次要文字(褪色靛蓝) |
| accent | hsl(5, 61%, 50%) | 强调色(朱红) |
| border | hsl(30, 5%, 61%) | 边框/分隔线 |

**辅助色**:
- 装饰金色: hsl(45, 56%, 61%)
- 几何形状填充: hsl(5, 61%, 50%) opacity 0.8

**图表配色序列**:
```
hsl(5, 61%, 50%)     // 朱红 - 主色
hsl(210, 23%, 37%)   // 褪色靛蓝
hsl(45, 56%, 61%)    // 芥末金
hsl(0, 0%, 10%)      // 墨黑
hsl(30, 35%, 65%)    // 暖灰棕
```

---

## ECharts 主题样式

> 基于传统日式美学的图表视觉主题，强调克制、留白和细节质感。

### 配色序列
```js
const COLORS = [
  'hsl(5, 61%, 50%)',    // 朱红
  'hsl(210, 23%, 37%)',  // 褪色靛蓝
  'hsl(45, 56%, 61%)',   // 芥末金
  'hsl(0, 0%, 10%)',     // 墨黑
  'hsl(30, 35%, 65%)'    // 暖灰棕
];
```

### ECharts 全局 BASE_OPTION
```js
{
  color: COLORS,
  textStyle: { 
    fontFamily: 'Noto Serif JP, Georgia, serif', 
    color: 'hsl(210, 23%, 37%)',
    fontSize: 12
  },
  backgroundColor: 'transparent',
  
  // 网格配置
  grid: { 
    top: 60, 
    right: 40, 
    bottom: 60, 
    left: 60, 
    containLabel: true 
  },
  
  // Tooltip 样式
  tooltip: { 
    backgroundColor: 'hsl(0, 0%, 100%)', 
    borderColor: 'hsl(30, 5%, 61%)', 
    borderWidth: 1,
    borderRadius: 0,  // 日式直角
    padding: [12, 16],
    textStyle: { 
      color: 'hsl(0, 0%, 10%)',
      fontSize: 13
    },
    shadowBlur: 0,  // 无阴影，保持平面感
    shadowColor: 'transparent'
  },
  
  // Legend 样式
  legend: { 
    top: 16,
    left: 'center',
    textStyle: { 
      color: 'hsl(210, 23%, 37%)', 
      fontSize: 13,
      fontFamily: 'Noto Serif JP, Georgia, serif'
    },
    icon: 'rect',  // 矩形图标符合日式几何美学
    itemWidth: 16,
    itemHeight: 12,
    itemGap: 24
  },
  
  // X 轴样式
  xAxis: { 
    axisLine: { 
      lineStyle: { 
        color: 'hsl(30, 5%, 61%)',
        width: 1
      } 
    },
    axisTick: { 
      show: false 
    },
    axisLabel: { 
      color: 'hsl(210, 23%, 37%)', 
      fontSize: 12,
      fontFamily: 'Noto Serif JP, Georgia, serif',
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
      color: 'hsl(210, 23%, 37%)', 
      fontSize: 12,
      fontFamily: 'Noto Serif JP, Georgia, serif',
      margin: 16
    },
    splitLine: { 
      lineStyle: { 
        color: 'hsl(30, 5%, 61%)', 
        type: 'solid',
        width: 0.5,
        opacity: 0.3
      } 
    }
  }
}
```

### 各图表类型默认 series 样式

**折线/面积图**:
```js
{
  type: 'line',
  smooth: false,  // 直线连接，符合日式简洁美学
  lineStyle: { 
    width: 2 
  },
  symbol: 'circle',
  symbolSize: 6,
  itemStyle: {
    borderWidth: 0
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
  itemStyle: { 
    borderRadius: 0,  // 无圆角
    borderColor: 'transparent',
    borderWidth: 0
  },
  barGap: '20%',
  emphasis: {
    itemStyle: {
      opacity: 0.8
    }
  }
}
```

**环形/饼图**:
```js
{
  type: 'pie',
  radius: ['45%', '70%'],  // 环形
  center: ['50%', '50%'],
  avoidLabelOverlap: true,
  padAngle: 2,  // 间隙角度
  itemStyle: {
    borderRadius: 0,  // 无圆角
    borderColor: 'hsl(50, 15%, 93%)',  // 用背景色做分隔
    borderWidth: 2
  },
  label: {
    show: true,
    position: 'outside',
    formatter: '{b}: {d}%',
    fontSize: 12,
    color: 'hsl(0, 0%, 10%)',
    fontFamily: 'Noto Serif JP, Georgia, serif'
  },
  labelLine: {
    show: true,
    length: 16,
    length2: 8,
    lineStyle: {
      color: 'hsl(30, 5%, 61%)',
      width: 1
    }
  }
}
```

### 图表容器样式

**容器卡片**:
```css
background: hsl(45, 12%, 91%);  /* surface 色 */
border: 1px solid hsl(30, 5%, 61%);
border-radius: 0;  /* 日式直角 */
padding: 32px 24px;
box-shadow: none;  /* 无阴影，保持平面感 */
```

**图表高度**: 
- 标准图表: `height: 320px` (h-80)
- 大型图表: `height: 400px` (h-100)

**图表网格**:
```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 60px 40px;
```

**移动端适配**:
```css
@media (max-width: 768px) {
  grid-template-columns: 1fr;
  gap: 40px;
}
```

---

## 字体排版

**Heading**: Noto Serif JP, Georgia, serif (明朝体)
**Body**: Noto Serif JP, Georgia, serif
**Display/技术文字**: Playfair Display, Cinzel, serif (西文专用)
**数字专用**: 无特殊指定,沿用 Noto Serif JP

**字体加载**:
```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Noto+Serif+JP:wght@200;300;400;600;900&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

---

## 页面结构

### 布局系统: 5 列网格 + 竖向分隔线

```
┌────┬────────────┬────────────┬────────────┬────┐
│ 80 │    1fr     │    1fr     │    1fr     │ 80 │
│ px │            │            │            │ px │
└────┴────────────┴────────────┴────────────┴────┘
     ▲            ▲            ▲            ▲
   line-1       line-2       line-3       line-4
```

**网格定义**:
```css
display: grid;
grid-template-columns: 80px 1fr 1fr 1fr 80px;
max-width: 1440px;
margin: 0 auto;
border-left: 1px solid var(--border);
border-right: 1px solid var(--border);
```

**竖向网格线**:
- 位置: 80px / 33% / 66% / right 80px
- 样式: 1px solid border 色,opacity 0.3
- z-index: 0 (背景层)

---

## 视觉风格

### 间距系统
- **区块间距**: 80px (桌面), 40px (移动)
- **组件间距**: 60px
- **内部间距**: 16px - 24px
- **页面边距**: 80px (左右)
- **基础单元**: 8px

### 文字规范
| 层级 | 样式 | 颜色 | 用途 |
|-----|-----|-----|-----|
| 品牌大标题 | 8rem (128px), font-weight: 900, letter-spacing: -0.05em | hsl(0, 0%, 10%) | 页面主标识 |
| 分类标题(竖写) | 2.5rem (40px), font-weight: 300, letter-spacing: 0.2em | hsl(0, 0%, 10%) | 左侧栏分类 |
| 项目名称 | 1.4rem (22px), font-weight: 600 | hsl(0, 0%, 10%) | 列表项主标题 |
| 英文技术标签 | 0.7rem (11px), uppercase, letter-spacing: 0.15em | hsl(210, 23%, 37%) | 分类副标题 |
| 描述文字 | 0.95rem (15px), italic, line-height: 1.6 | hsl(0, 0%, 33%) | 正文描述 |
| 元数据小字 | 0.7rem (11px), uppercase, letter-spacing: 0.05em | hsl(5, 61%, 50%) | 标签/额外信息 |

**竖写样式**:
```css
writing-mode: vertical-rl;
```

### 圆角与阴影
- **无圆角**: border-radius: 0 (传统日式直角)
- **阴影**: 不使用 box-shadow,依靠线条和层次

---

## 组件规范

### Header 区域
- **高度**: 自适应内容,padding 120px 80px 80px
- **布局**: flex, justify-between
- **边框**: 底部 1px solid border 色
- **背景**: 半透明渐变叠加 `linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 100%)`

**品牌区块**:
- 大型汉字: font-size 8rem, font-weight 900, line-height 1
- 副标题: 上方 1px 黑色边框,padding-top 1rem, font-family Cinzel, letter-spacing 0.2em

**几何装饰 - 太阳图形**:
```css
position: absolute;
top: 100px; left: 250px;
width: 140px; height: 140px;
background: var(--accent);
border-radius: 50%;
mix-blend-mode: multiply;
opacity: 0.8;
```

**竖写元数据区**:
```css
writing-mode: vertical-rl;
height: 200px;
border-left: 1px solid text 色;
padding-left: 1rem;
color: var(--textMuted);
```

### 内容分类区块
**结构**: 2 列布局
- 左栏(120px): 竖写分类标题 + 几何装饰
- 右栏(1fr): 双栏内容网格

**左侧分类栏**:
```css
width: 120px;
border-right: 1px solid border 色;
padding: 40px 20px;
background: rgba(240, 238, 233, 0.5);
```

**右侧内容网格**:
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 60px 80px;
padding: 60px;
```

### 列表项
**基础样式**:
- 悬停: 上移 4px, transition 300ms cubic-bezier(0.2, 0.8, 0.2, 1)
- 底部分隔线: 1px solid rgba(0,0,0,0.1)

**巨型汉字水印**(悬停显示):
```css
position: absolute;
right: 0; top: -20px;
font-size: 4rem;
font-weight: 900;
color: rgba(0, 0, 0, 0.03);
writing-mode: vertical-rl;
opacity: 0 → 1 on hover;
transition: 300ms;
```

### 几何装饰元素
**矩形轮廓**:
```css
position: absolute;
width: 200px; height: 300px;
border: 1px solid textMuted 色;
transform: rotate(5deg);
```

**实心条**:
```css
width: 12px; height: 120px;
background: hsl(45, 56%, 61%);
position: absolute;
bottom: 40px; left: -6px;
```

### 页脚
- **背景**: hsl(0, 0%, 10%) (反转为深色)
- **文字**: bg 色(浅色)
- **边框**: 顶部 4px double header 色
- **布局**: flex, justify-between, padding 60px 80px

---

## 动画与交互

### 悬停效果
**列表项**:
```css
transform: translateY(-4px);
transition: 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
```

**巨型背景汉字**:
```css
opacity: 0 → 1;
transition: 0.3s;
```

### 混合模式
**太阳装饰图形**:
```css
mix-blend-mode: multiply;
```

**品牌汉字**:
```css
mix-blend-mode: multiply;
```

---

## 响应式断点

**桌面端**: >= 1024px
- 5 列网格完整展示
- 内容双栏布局
- 边距 80px

**平板端**: 768px - 1023px
- 内容改为单栏
- 边距 40px
- 字号适当缩小

**移动端**: < 768px
- 网格系统简化为单栏
- 竖写改为横写
- 左侧分类栏改为顶部横向
- 边距 16px
- 品牌汉字缩小至 4rem

---

## 风格建议

1. **保持东西方平衡**: 汉字与西文字体搭配使用,竖写与网格系统结合,传统美学与现代排版共存

2. **克制使用装饰**: 几何形状不超过 3 个,颜色点缀不超过 20% 面积,留白是设计的一部分

3. **混合模式营造层次**: 使用 `mix-blend-mode: multiply` 让装饰元素与背景融合,避免生硬叠加

4. **竖写排版注意事项**: 
   - 用于短文本(标题、标签、元数据)
   - 移动端需转为横写
   - 英文在竖写中需特殊处理或避免

5. **网格线作为背景元素**: 低透明度的竖向分隔线构建空间感,不要过于突兀

6. **悬停水印增强互动**: 巨型汉字水印既是装饰也是反馈,但要控制透明度(建议 0.03)避免干扰阅读
