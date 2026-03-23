# SKILL: paper_deepresearch

面向学术论文的**原文级调研（Deep Research）**能力模块。适用于：用户指定某篇论文要求“读透 + 追踪背景 + 扩展最新相关工作”，或用户给出某个学术 topic 要求系统性深度调研与写作综述。

---

## 1) Overview

### 目标
- **原文驱动**：必须定位到论文**原文 PDF**（arXiv/出版社/作者主页等）并通读，基于原文进行理解、复述、推导与批判性分析。
- **topic 拉通**：从 topic 的问题定义与主流范式切入，连接到用户指定论文（primary paper），再扩展到**近期相关论文（recent related works）**，形成“背景 → 主文献 → 近作 → 关系论证 → 结论与空白”的闭环。
- **技术深度**：写作中要善于使用公式、符号、命题/定理结构，而不是浅层“摘要式总结”。

### 触发方式（Triggers）
当用户出现以下意图时触发本 skill：
- “帮我调研/精读这篇论文：<标题/DOI/arXiv/链接>”
- “给我对 <topic> 做 deep research / 系统性调研 / 最新进展梳理”
- “把这篇论文放到该领域脉络里，找最近相关论文并对比”
- “我需要推导/理解论文里的公式、定理、对偶、复杂度、实验设计”

### 输入（Inputs）
- 必选其一：`paper_identifier`（标题/DOI/arXivID/URL/PDF）或 `topic`（关键词 + 子方向约束）
- 可选：时间窗口（例如近 2 年/3 年）、目标会议/期刊、方法偏好（理论/实验/应用）、关注点（例如“对偶推导”“泛化界”“算法复杂度”“实现细节”）

### 输出（Outputs）
- 一份可引用的研究报告（建议 Markdown / LaTeX 友好），包含：
  - Topic 背景与问题定义（含统一符号与公式）
  - Primary paper 深度解构（模型/定理/算法/实验）
  - Recent papers（原文级阅读后的归类、对比与关系论证）
  - 关键公式与推导路线（必要时给出 proof sketch）
  - 局限性、开放问题、可复现建议、下一步研究线索
- 可选附录：`BibTeX` 条目集合、对比表、术语表、符号表

---

## 2) Module A — SEARCH（原文检索与证据构建）

> 核心原则：**只要是“调研论文”，就必须拿到原文并阅读**；只要是“找相关论文”，就必须对每篇候选至少拿到原文并做结构化阅读记录。

### A1. Primary paper：定位原文 + 版本确认
1. **定位权威原文来源（按优先级）**
   - arXiv（preprint PDF）
   - 出版社页面（最终版本 / camera-ready）
   - 作者主页 / institutional repository
   - 语义学术索引（如 Semantic Scholar）用于交叉验证元数据与引用链
2. **版本一致性检查**
   - 核对：标题、作者、年份、会议/期刊、版本号（arXiv v1/v2…）、DOI
   - 若存在多个版本：明确“以哪一版为主”，并记录差异（新增定理/实验/修订假设）
3. **原文获取失败的降级策略**
   - 若出版社付费墙：尝试 arXiv / 作者公开稿 / accepted version
   - 仍不可得：请求用户上传 PDF（此时停止“深度推导”，改做“可得信息范围内”的有限分析）

### A2. Primary paper：通读与结构化笔记（必须）
对整篇原文做**结构化拆解**，每一项都要能回指到章节/公式编号（证据化）：
- **Problem Setup & Notation**
  - 随机变量/数据分布/样本：\(\xi \sim \mathbb{P}\)，\(\{\xi_i\}_{i=1}^n\)
  - 决策变量：\(x \in \mathcal{X}\)
  - 目标与风险/约束：\(\min_{x \in \mathcal{X}} \mathbb{E}_{\mathbb{P}}[\ell(x;\xi)]\)，或 \(\min f(x)\ \text{s.t.}\ g(x)\le 0\)
- **核心方法/算法**
  - 写出关键优化形式（primal/dual/regularized）
  - 给出算法迭代（如 SGD/PDHG/ADMM/镜像下降）的一般式
- **理论结果**
  - 定理/命题：条件（assumptions）→ 结论（rates/bounds/consistency）
  - 必须明确：依赖常数、光滑性/Lipschitz、强凸性、维度依赖、样本量依赖
- **实验与评估**
  - 数据集、指标、baselines、消融、统计显著性、复杂度与 wall-clock
- **局限性与讨论**
  - 论文自述限制 + 你识别到的隐含限制（假设过强、不可扩展、证据不足等）

> 输出一个“Primary paper evidence table”：Claim → Location（Section/Equation/Theorem）→ Notes（你对其含义/边界的解释）。

### A3. Topic background：从“定义 → 范式 → 经典工作”建立脉络
当用户调研的是“论文”也要做 topic 背景（因为需要解释它解决的是什么问题）：
1. 统一定义：写出该 topic 的标准数学表述（至少 1–2 个 canonical forms）
2. 识别主流范式：优化/统计/学习/因果/控制等
3. 定位 3–8 篇奠基/综述/教材级引用，作为“背景锚点”
4. 提取该领域的常见难点与评价标准（例如：泛化、稳健性、可扩展性、可解释性、可复现性）

### A4. Recent related works：搜索“同 topic 最新论文”并原文阅读（必须）
> 用户要求：对**原文同个 topic 最近的相关论文**进行搜索原文并阅读整篇原文。

1. **检索范围建议**
   - 默认：近 24–36 个月（可按用户指定）
   - 目标：5–15 篇“强相关 + 有代表性”论文（宁缺毋滥）
2. **检索策略（组合拳）**
   - 关键词扩展：同义词、缩写、核心术语 + 方法名
   - 会议/期刊定向：该领域顶会顶刊（按 topic 确定）
   - 引用追踪：
     - backward：primary paper 引用的关键前置工作
     - forward：引用 primary paper 的近期论文（尤其最新）
   - 相关性判别：是否共享同一核心建模对象/理论命题/实验设置
3. **对每篇 recent paper 的“最小原文阅读”标准**
   - 必须下载 PDF 并读：Abstract + Intro + Method + Main Theorem/Key Lemma + Experiments + Limitations/Discussion
   - 输出结构化卡片：
     - Problem / Method / Key result（公式级）/ Empirical setup / Relation to primary paper（替代、改进、互补、否定）

### A5. 质量控制（Search QA）
- 不允许只读二手解读（博客/短评）就下结论
- 对关键结论必须双重核对：原文公式/定理 + 实验设置
- 若出现矛盾（不同论文结论冲突）：记录冲突点（假设不同？数据不同？指标不同？实现差异？）

---

## 3) Module B — WRITE（分层写作与公式化论证）

> 写作总路线（用户要求）：**从 topic 入手 → 介绍 primary paper → 引到 recent papers → 论证关系**。

### B1. 推荐报告结构（强制层次）
#### 0. TL;DR（不超过 10 行）
- 1–2 句 topic 定义 + 1 句 primary paper 的核心贡献 + 1–3 句近期进展与差异 + 1 句开放问题

#### 1. Topic：问题定义与统一符号（公式优先）
- 给出 canonical objective（示例）：
  \[
  \min_{x\in\mathcal X}\ \mathbb{E}_{\mathbb P}\big[\ell(x;\xi)\big]
  \quad\text{或}\quad
  \min_{x\in\mathcal X}\ f(x)\ \text{s.t.}\ g(x)\le 0
  \]
- 若为稳健/分布鲁棒/正则等主题，写出标准形式（示例）：
  \[
  \min_{x\in\mathcal X}\ \sup_{\mathbb Q\in\mathcal U}\ \mathbb E_{\mathbb Q}[\ell(x;\xi)]
  \]
- 明确：
  - \(\xi\) 的含义、样本如何来、\(\mathcal X\) 的结构
  - 常用假设（Lipschitz/convex/smooth/bounded support…）与其作用

#### 2. Primary paper 深度解构（以“模型—方法—定理—算法—实验”组织）
- **2.1 模型与关键构件**：把论文最核心的 1–3 个公式抄成统一符号体系，并解释每一项的作用
- **2.2 方法与推导主线**：给出从原问题到可解形式的“推导路线图”
  - 例如：primal → dual → regularization → tractable reformulation
- **2.3 理论结果（定理化呈现）**
  - 用“Assumption → Theorem → Interpretation”写法
  - 给出 proof sketch（只抓关键不等式/关键技巧），必要时写：
    \[
    \text{(key inequality)}\quad A \le B + C
    \]
- **2.4 算法细节**
  - 写出迭代更新式与复杂度（示例）：
    \[
    x^{t+1} = \Pi_{\mathcal X}\Big(x^t - \eta_t \nabla \hat f(x^t)\Big)
    \]
- **2.5 实验与结论可信度**
  - baseline 是否合理？指标是否匹配主张？是否有消融与统计检验？

#### 3. Recent related works：归类—对比—关系论证（必须体现“最近”）
- **3.1 归类框架（先给 taxonomy）**
  - 例：A 类（理论强化）、B 类（算法加速/可扩展）、C 类（放松假设/更一般场景）、D 类（应用/系统化）
- **3.2 对比表（强制）**
  - 维度建议：目标/假设/关键公式或界/算法复杂度/实验设置/相对 primary paper 的关系
- **3.3 关系论证（不是罗列）**
  - 用明确语义连接：
    - “该工作在 primary 的 Assumption X 上做了放松…”
    - “该工作把 primary 的目标 \(\ell\) 替换为 \(\tilde \ell\)，得到更强/更弱的界…”
    - “该工作在同一 benchmark 上显示…，但其优势来自…（更强的模型容量/更大的算力预算/不同预处理）”

#### 4. 综合结论与开放问题（研究导向）
- 你认为“已解决/基本共识”的部分是什么？
- 哪些是“理论空白/实验不足/工程不可落地”的部分？
- 给出 3–6 条明确可执行的后续研究问题（尽量写成数学问题或可验证命题）

#### 5. 附录（可选但推荐）
- 符号表（Notation table）
- BibTeX 列表
- 复现清单（数据、代码、超参、随机种子、算力、环境）

### B2. 公式化写作规范（必须遵守）
- 每次引入符号必须定义（第一次出现就定义）
- 每个“关键结论”尽量落到可检查的对象：公式编号/定理编号/实验表格
- 避免空泛形容词（“很有效”“很先进”），改为可验证表述（“在设置 S 下，相比 baseline 提升 X%/界从 \(O(1/\sqrt n)\) 改为 \(O(1/n)\)”）

### B3. 深度标准（反浅层检查）
若报告缺少以下任一项，则视为“浅层”，需要补齐：
- 至少 3 个关键公式（topic/primary/method 或 theorem）
- 至少 1 个推导路线（哪怕是 proof sketch）
- 至少 1 张系统对比表（primary vs recent）
- 至少 3 条“关系论证句”（说明为什么相关、改进在哪里、代价是什么）

---

## 4) 执行清单（Checklist）

### Search Checklist
- [ ] Primary paper 原文 PDF 已获取并通读（含 method + main results + experiments）
- [ ] Primary paper 结构化卡片 + evidence table 已完成
- [ ] Topic 的 canonical form 与关键术语已统一
- [ ] 近 2–3 年 strong-related 论文已找到并逐篇原文阅读（至少核心章节）
- [ ] 引用链（forward/backward）完成，矛盾点已记录

### Write Checklist
- [ ] 结构符合：Topic → Primary → Recent → Relation → Conclusion
- [ ] 关键公式/定理/迭代式齐全且符号一致
- [ ] 对比表与关系论证充分
- [ ] 局限性与开放问题具体可执行

---

## 5) 常见失败模式与修复策略

- **只看摘要/博客**：立即回到原文，补齐 method/assumption/theorem/experiment 的证据链
- **相关工作堆砌**：必须先给 taxonomy，再用对比表与关系论证串起来
- **公式堆砌无解释**：每个公式都要解释“每一项是什么、为什么这样建、它带来什么性质”
- **忽略假设边界**：把所有定理的关键假设列出来，并讨论能否放松/代价是什么