# Scrapbook Journal · 手账拼贴风 UI 风格模板

## 设计语言

- **Aesthetic Direction**: 手账杂志拼贴风 — 模拟纸张、大头针、便签条、手写体装饰，营造"手工感"创意工作台
- **Visual Signature**:
  1. 卡片微旋转（rotate -2deg~2deg）+ 硬边阴影（box-shadow Npx Npx 0px）
  2. 大头针圆形装饰 + 手写体注释文字
  3. 圆角便签与直角卡片混搭（rounded-3xl vs rounded-none）
  4. 网点图案纸张底纹（radial-gradient 24px 间距）
  5. Serif 标题(Lora) + 手写体装饰(Caveat) + 无衬线正文(Inter)
- **Emotional Tone**: 活泼、温暖、俏皮、手工感
- **Design Style**: Warm Natural 自然暖调 x Soft Blocks 柔色块

---

## 配色方案

**方案**: Scrapbook Pastel（手账粉蓝暖调）
**色彩关系**: 暖米纸张底 + 白色卡片 + 蓝紫品牌 + 粉色强调
**主题**: 浅色

> **配色设计理由**：暖米底纹模拟手账纸张，蓝紫色传递创意品牌感，粉色作为高能量强调色唤起创作热情，直角+圆角混搭形成手工拼贴张力。

### 8 色角色系统

| 角色 | HSL | 用途 |
|-----|-----|-----|
| bg | hsl(30 33% 96%) | 暖米色纸张底色，叠加网点图案 |
| surface | hsl(0 0% 100%) | 卡片、侧栏、顶栏白色表面 |
| header | hsl(224 55% 60%) | 品牌蓝紫：激活导航背景、标题文字 |
| text | hsl(220 26% 14%) | 正文、标题、强调文字 |
| textMuted | hsl(220 9% 65%) | 描述、占位符、次要信息 |
| primary | hsl(330 100% 65%) | 主交互色：CTA 按钮、选中指示、高亮装饰 |
| accent | hsl(220 9% 96%) | 弱强调色：卡片边框、分隔线、hover 底 |
| border | hsl(220 9% 96%) | 卡片边框、分隔线 |

### Primary / Accent 语义规则

**Primary（主交互色）** — `hsl(330 100% 65%)`：CTA 按钮、选中态粉色边框、头像高亮，视觉权重最高
**Accent（弱强调色）** — `hsl(220 9% 96%)`：卡片边框、分隔线、hover 背景，权重低于 primary

### 衍生规则

- **bg**：暖米 hsl(30 33% 96%) + 网点纹理 `radial-gradient(#e5e7eb 1px, transparent 1px) 24px`
- **header**：品牌蓝紫，用于激活导航项背景和页面标题
- **primary 色阶**：primary → `hsl(330 100% 65%)` CTA → `hsl(350 100% 92%)` 粉色阴影 → `hsl(340 100% 96%)` 浅粉 hover
- **accent = border**：统一极浅灰，减少视觉噪音
- **便签色板**：粉 `hsl(350 100% 96%)` / 蓝 `hsl(214 95% 97%)` / 黄 `hsl(48 100% 96%)` — 提示辅助信息

### 语义色

| 用途 | HSL | 说明 |
|-----|-----|-----|
| 收集中 Active | hsl(142 77% 73%) bg / hsl(142 64% 24%) text | green-100/700 |
| 已结束 Ended | hsl(220 14% 96%) bg / hsl(220 9% 46%) text | gray-100/500 |
| 草稿 Draft | hsl(214 95% 93%) bg / hsl(224 76% 48%) text | blue-100/700 |
| 危险 Danger | hsl(0 86% 97%) bg / hsl(0 84% 60%) text | red-50/500 |

### 便签色板

| 色系 | 背景 HSL | 边框 HSL | 文字 HSL |
|------|---------|---------|---------|
| 粉色便签 | hsl(350 100% 96%) | hsl(340 96% 90%) | hsl(339 82% 41%) |
| 蓝色便签 | hsl(214 95% 97%) | hsl(214 95% 90%) | hsl(224 76% 48%) |
| 黄色便签 | hsl(48 100% 96%) | hsl(48 96% 89%) | hsl(32 81% 29%) |

### 统计卡片色板

| 色系 | 背景 HSL | 文字 HSL |
|------|---------|---------|
| 蓝 | hsl(214 95% 93%) | hsl(224 76% 48%) |
| 粉 | hsl(340 96% 93%) | hsl(339 82% 41%) |
| 紫 | hsl(270 95% 93%) | hsl(263 70% 50%) |
| 黄 | hsl(48 96% 89%) | hsl(32 81% 29%) |

---

## ECharts 主题样式

### 配色序列

```js
const COLORS = ['hsl(217,91%,60%)', 'hsl(160,84%,39%)', 'hsl(38,92%,50%)', 'hsl(0,84%,60%)', 'hsl(263,70%,50%)', 'hsl(330,81%,60%)'];
//               蓝                  绿                  琥珀                红                  紫                  粉
```

### ECharts 全局 BASE_OPTION

```js
const BASE_OPTION = {
  color: COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, sans-serif', color: 'hsl(215,16%,65%)' },
  grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 24 },
  xAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,65%)', fontSize: 12, fontFamily: 'Inter', margin: 10 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: 'hsl(215,16%,65%)', fontSize: 12, fontFamily: 'Inter' },
    splitLine: { lineStyle: { color: 'hsl(210,40%,96%)', type: 'dashed' } }
  },
  tooltip: {
    trigger: 'axis', backgroundColor: 'hsl(0,0%,100%)', borderColor: 'transparent',
    borderWidth: 0, borderRadius: 12, padding: 12,
    shadowBlur: 15, shadowColor: 'rgba(0,0,0,0.1)', shadowOffsetY: 10,
    textStyle: { fontFamily: 'Inter', color: 'hsl(220,26%,14%)', fontSize: 12 },
    axisPointer: { type: 'line', lineStyle: { color: 'hsl(217,91%,60%)', width: 2 } }
  },
  legend: {
    textStyle: { fontFamily: 'Inter', color: 'hsl(215,16%,65%)', fontSize: 12 },
    icon: 'circle', itemWidth: 10, itemHeight: 10, itemGap: 16
  }
};
```

### 各图表类型默认 series 样式

- **line**: `smooth: true`, `lineStyle.width: 3`, `symbol: 'circle'`, `symbolSize: 8`, itemStyle `borderColor: white, borderWidth: 2`
- **bar**: `barWidth: auto`, `itemStyle.borderRadius: [4,4,0,0]`
- **pie 环形**: `radius: ['45%','65%']`, `borderColor: white, borderWidth: 2, borderRadius: 6`
- **pie 实心**: `radius: '60%'`, outside label
- **scatter**: `symbolSize: 10`, `opacity: 0.8`, `borderColor: white, borderWidth: 1`

### 图表容器

容器 `bg-white border border-gray-100 shadow-sm rounded-2xl p-6`
高度 `h-[300px]` 大 / `h-[250px]` 中 / `h-[200px]` 小

### 进度条

容器 `bg-gray-100 rounded-full h-3/h-2/h-1.5`
填充 `bg-green-500 / bg-blue-600 / bg-yellow-400 rounded-full`

---

## 字体排版

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@700&family=Caveat:wght@400;700&display=swap');
```

| 用途 | 字体栈 |
|-----|-------|
| 正文 (Sans) | `Inter, sans-serif` |
| 标题 (Serif) | `Lora, serif` (font-serif) |
| 手写 (Handwriting) | `Caveat, cursive` (font-handwriting) |

### 文字规范

| 层级 | 样式 | 颜色 |
|-----|-----|-----|
| H1 | `text-5xl font-serif font-bold` | header |
| H2 | `text-4xl font-serif` | text |
| H3 | `text-2xl font-serif` | header |
| H4 | `text-lg font-bold` | text |
| Body | `text-sm font-bold` | text |
| Caption | `text-xs font-bold` | textMuted |
| Micro Label | `text-[10px] font-black uppercase tracking-widest` | 各色 |
| 手写装饰 | `text-2xl font-handwriting` | hsl(340 100% 65%) |
| 手写提示 | `text-xl font-handwriting` | 各色 |

---

## 页面结构

> 手账拼贴布局 — 侧栏+主区三栏体系，编辑器/仪表盘/分析多视图。

```
┌─────────────────────────────────────────┐
│ [Sidebar w-20/lg:w-64] │ [Main Content] │
│  Logo(粉圆+心)          │  Top Header    │
│  Brand Name             │  Search|CTA    │
│  Nav Items(rounded-2xl) │  Scrollable    │
│  Quote Card             │  Content Area  │
│  Sign Out               │  max-w-7xl     │
└─────────────────────────────────────────┘
```

Sidebar: `w-20 lg:w-64` 响应式折叠，白底 + 右边框
Main: `flex-1 flex flex-col overflow-hidden`
Header: `h-20 px-10` 非固定顶栏
Content: `flex-1 overflow-y-auto`，内部 `max-w-7xl mx-auto`

### 编辑器三栏布局

左工具栏 `w-72` | 中画布 `flex-1 p-12 max-w-2xl` | 右属性面板 `w-80 p-8`

---

## 视觉风格

### 间距系统

| 级别 | 值 | 用途 |
|------|---|------|
| xs | `p-2` | 图标按钮 |
| sm | `p-4 gap-4` | 便签 |
| md | `p-6 gap-6` | 分析卡片 |
| lg | `p-8 gap-8` | 侧栏、栅格 |
| xl | `p-10 space-y-12` | 内容区 |
| 2xl | `p-12` | 编辑器画布 |

### 特色装饰

| 效果 | 实现 | 场景 |
|------|-----|------|
| 纸张阴影 | `5px 5px 0px rgba(0,0,0,0.05)` | 编辑器卡片 |
| 硬边阴影黑 | `shadow-[4px_4px_0px_#000]` | CTA 按钮 |
| 硬边阴影粉 | `shadow-[8px_8px_0px_#FDE2E4]` | 表格大卡片 |
| 微旋转左/右 | `-rotate-1` / `rotate-1` | 卡片装饰 |
| 选中放大 | `scale-105 rotate-0 z-10` | 编辑器选中卡 |
| 大头针 | `w-8 h-8 bg-gray-300/30 rounded-full -mt-4` | 统计卡片顶部 |
| 胶带 | `w-12 h-6 bg-pink-200 rounded-sm opacity-50` | 标题卡片左上 |
| 粉色高亮边框 | `border-3 solid primary` | 用户头像 |
| 网点背景 | `radial-gradient(#e5e7eb 1px, transparent 1px) 24px` | body 底纹 |

### 圆角系统

| 元素 | 圆角 |
|------|------|
| 导航按钮 | `rounded-2xl` |
| 便签卡片 | `rounded-3xl` |
| 分析卡片 | `rounded-2xl` |
| CTA 按钮 | `rounded-none`（直角 + 硬边阴影） |
| 搜索框 / 状态标签 | `rounded-full` |
| 编辑器卡片 | `rounded-none`（纸张感） |

### 阴影系统

| 层级 | 值 | 场景 |
|------|---|------|
| sm | `shadow-sm` | 分析卡片 |
| md | `shadow-md` | 统计卡 |
| lg | `shadow-lg` | Logo、激活导航 |
| 硬边 | `shadow-[4px_4px_0px_#000]` | CTA（active 移位消除） |
| 粉硬边 | `shadow-[8px_8px_0px_#FDE2E4]` | 大卡片装饰 |
| paper | `5px 5px 0px rgba(0,0,0,0.05)` | 编辑器内卡 |

---

## 组件规范

### 按钮

| 类型 | 样式 |
|------|------|
| Primary CTA | `bg-primary text-white px-8 py-3 rounded-none font-bold uppercase tracking-widest shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none` |
| Secondary | `px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50` |
| Text Link | `text-xs font-black uppercase tracking-widest text-header border-b-2 border-header hover:text-primary hover:border-primary` |
| Ghost Nav 默认 | `text-gray-500 hover:bg-pink-50 hover:text-primary px-4 py-3 rounded-2xl` |
| Ghost Nav 激活 | `bg-header text-white shadow-lg -rotate-2 px-4 py-3 rounded-2xl` |

### 卡片

| 类型 | 样式 |
|------|------|
| 统计便签 | 彩色 `bg-{color}-100` + 微旋转 + `shadow-md` + `hover:rotate-0 hover:scale-105` |
| 内容表格卡 | `bg-white p-10 shadow-[8px_8px_0px_#FDE2E4] border border-gray-100` |
| 分析 KPI | `bg-white p-6 rounded-2xl shadow-sm border border-gray-100` |
| 编辑器问题卡 | `bg-white p-10 paper-shadow border-2 border-gray-50 rotate-1` |
| 编辑器选中 | `border-primary rotate-0 scale-105 z-10` + 粉色拖拽手柄 |

### 输入框

搜索框 `rounded-full border-2 border-gray-100 paper-shadow focus:border-header`
内容可编辑 `contentEditable` 直接应用于标题元素

### 状态标签

`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-{color}-100 text-{color}-700`

### Logo

`w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg`
图标 Heart fill-white，品牌名 `font-serif text-2xl font-bold text-header`

---

## 响应式断点

| 断点 | 布局变化 |
|-----|--------|
| >= 1024px (lg) | 侧栏 w-64 展开, 统计 4 列, 分析 col-span-2+1 |
| >= 768px (md) | 显示用户信息, 分析 grid-cols-2 |
| >= 640px (sm) | 统计 grid-cols-2 |
| < 640px | 侧栏 w-20 仅图标, 统计单列, 隐藏用户信息 |

---

## 风格建议

- **手工感装饰节奏**：每区域 1-2 个微旋转 + 手写体装饰 + 便签色块
- **CTA 坚持直角 + 硬边阴影**：`rounded-none + shadow-[4px_4px_0px_#000]` "贴纸"质感
- **Primary / Accent 分工**：primary（粉色）强调交互，accent（极浅灰）边框与分隔
- **色彩角色层级**：primary(粉)仅交互，header(蓝紫)品牌标题，中性灰正文，便签底仅提示
- **三字体混搭**：Lora(标题) + Inter(正文) + Caveat(装饰)，各有专属角色不混用
