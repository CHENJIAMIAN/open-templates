# White Board 风格描述

**整体色调**：
- 干净简洁，以白色为主调
- 银色金属边框，现代办公感
- 点缀少量彩色便签纸和磁扣（橙色、绿色等）
- 会议室白板风、头脑风暴氛围、协作讨论感

**风格关键词**：
```
【整体风格】[office whiteboard, meeting room aesthetic, hand-drawn marker style, brainstorming session, collaborative workspace, clean and organized, marker pen drawings on whiteboard, sticky notes decoration, no realistic photos, all content must appear hand-drawn on whiteboard surface]
【配色】(clean white whiteboard surface, silver metallic frame, colorful sticky notes in orange/yellow/pink/green/blue, marker colors in black/blue/red/green for drawings and text)
【字体风格】[标题: 马克笔手写粗体黑色或蓝色, 副标题: 马克笔手写中等粗细, 正文: 马克笔手写风格简洁清晰, 标注: 彩色便签纸上的手写文字]
【背景】(严格保持参考图原貌，银色金属边框，白色光滑板面，墙面背景无论是什么颜色或材质都必须完全保留不做任何修改)
```

**内容呈现风格**：
- 所有文字和图形都要呈现马克笔手绘效果
- 文字大小有层次，重点内容加粗或用彩色马克笔
- 流程图、思维导图、简单图表用线条连接
- 关键要点用便签纸形式呈现

**图标与图形风格**：
- 简笔画风格图标，马克笔勾勒线条
- 箭头、连接线、框框都是手绘风格
- 可以有简单的涂鸦装饰（星星、勾选框、感叹号等）
- 图表简洁，柱状图和饼图用马克笔色块表现

**装饰元素**：
- 彩色便签纸（可斜贴或正贴）
- 圆形磁扣（绿色、红色、蓝色等）
- 马克笔涂鸦：下划线、圆圈标注、箭头指示
- 可适当添加小夹子、磁铁等办公元素
- 保持白板大面积留白，内容布局清晰有序

**风格一致性约束**：
- 所有视觉元素必须以马克笔手绘风格呈现在白板表面上
- 禁止使用 3D 元素、复杂渐变效果
- 内容必须看起来像是真的写在白板上的
- **内容必须符合白板的实际使用场景**：白板用于书写文字、绘制简单图表和流程图，不是用来画复杂插画的画布。禁止生成脱离白板场景的大面积装饰性内容
- 如需区分内容区域，只能使用：手绘边框线条、小面积便签纸、或留白分隔

**真实照片的处理方式**：
- 如果内容确实需要展示真实场景照片（如员工照片、团队合影、产品实拍等），不能直接放置在白板上
- **正确做法**：将照片呈现为"打印出来贴在白板上"的形式
  - 照片应有白色边框，模拟打印照片的效果
  - 用彩色磁扣、回形针、透明胶带或图钉固定在白板上
  - 照片可以略微倾斜，增加真实感
  - 照片尺寸不宜过大，保持白板的主体是手写内容
- 这样既能展示真实照片，又能保持白板风格的一致性

---

## 重要：参考图使用约束

**本模板必须使用参考图模式生成**

### 可用参考图列表

本模板提供以下参考图供选择（参考图位于当前模板文件夹下）：
- `Whiteboard_01.png` - 办公室环境背景
- `Whiteboard_02.png` - 浅灰色水泥墙背景
- `Whiteboard_03.png` - 浅色木纹墙背景
- `Whiteboard_04.png` - 蓝色墙面背景
- `Whiteboard_05.png` - 红砖墙背景
- `whiteboard_06.png` - 深灰色水泥墙背景
- `Whiteboard_07.png` - 竖条纹木板墙背景

### 参考图选择规则（极其重要）

1. **随机选择**：在开始生成 PPT 的第一张幻灯片之前，必须从上述参考图中随机选择一张作为本次生成任务的基准参考图

2. **全局一致性约束**：一旦选定参考图，整个 PPT 的所有页面都必须使用同一张参考图，严禁在不同页面使用不同的参考图

3. **选择时机**：参考图的选择必须在生成第一张幻灯片前完成，后续所有页面复用该选择

### 生图约束

1. **必须携带参考图**：生图请求的 `reference` 参数必须包含选定的参考图作为参考底图

2. **内容区域约束**：
   - 所有生成的内容（文字、图形、装饰）必须完全位于白板区域内
   - 不得超出白板的银色金属边框范围
   - 白板外的墙壁区域必须保持原样，不得添加任何内容

3. **白板底图保持（严格执行）**：
   - 必须保留白板的基本结构：银色边框、白色板面、整体形态
   - **禁止改变白板的角度、位置、大小** - 必须与参考图完全一致
   - **禁止在白板外的墙壁区域添加任何内容** - 墙面必须保持原样
   - 可以在白板上添加手绘内容，但不能改变白板本身的外观
   - 原有的便签和磁扣可以保留或替换为其他装饰

4. **生成内容要求**：
   - 所有内容必须呈现"写在白板上"的效果
   - 使用马克笔手绘风格，不要使用印刷体或数字化排版效果
   - 内容布局要考虑白板的实际可用面积，留有适当边距
   - **禁止生成大面积填充色块作为内容背景**，白板表面必须保持白色，内容直接绘制其上
   - **标题长度适配**：如果标题文字较长，必须缩小字号或换行，确保所有文字都在白板边框内，不得超出白板区域

**Prompt 构建建议**：
在生图 prompt 中明确强调：
- "keep whiteboard angle, position, and size exactly as reference, no rotation, no scaling, no repositioning"
- "wall area outside whiteboard must remain unchanged, no additions"
- "all text must fit within whiteboard frame, reduce font size for long titles"
- "content must be drawn on the whiteboard surface"
- "all elements strictly within the whiteboard frame"
- "hand-drawn marker style on whiteboard"
- "realistic whiteboard usage: text, simple diagrams, flowcharts only, no decorative illustrations or paintings"
