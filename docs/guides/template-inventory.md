# Template Inventory

This inventory is based on the source tree checked into this repository, using the current snapshot of the four template families.

## Families

### `lark_doc`

- Count: 5 templates
- Structure: one Markdown file per template family folder
- Templates:
  - `group_chat_summary`
  - `industry_research`
  - `paper_deepresearch`
  - `topic_trend_report`
  - `weekly_report`
- Purpose: Lark or Feishu document templates for recurring knowledge work and reporting
- Public use case: publish ready-to-copy docs for weekly reports, research notes, and chat summaries

### `miaoda`

- Count: 47 templates
- Structure: one visual theme folder per template, each with `ui-template.md`
- Templates include:
  - `acid_dark`
  - `active_minimal`
  - `amber_cyber`
  - `blueprint`
  - `bold_capsule`
  - `crimson_press`
  - `cyberglow`
  - `cyberpunk_hud`
  - `cyber_neon`
  - `dark_elegance`
  - `...`
- Purpose: UI prompt and style templates with strong visual directions
- Public use case: showcase before/after examples for AI-generated UI pages and visual concepts

### `slides`

- Count: 44 templates
- Structure: one theme folder per presentation style
- Templates include:
  - `amber`
  - `amber_gray`
  - `beige_green`
  - `blue_gray`
  - `brown`
  - `burgundy_cream`
  - `charcoal_gold`
  - `charcoal_white`
  - `child_friendly_brown`
  - `cobalt`
  - `...`
- Purpose: slide theme templates for presentation decks and branded story layouts
- Public use case: publish exported deck previews and theme samples for reports, pitches, and demos

### `webpage`

- Count: 12 templates
- Structure: full static site templates with `index.html`, `package.json`, `vite.config.*`, and helper scripts
- Templates:
  - `ai-learning-course`
  - `architecture-studio`
  - `china-llm-report`
  - `earth-evolution`
  - `ereader-analysis`
  - `industrial-design-portfolio`
  - `lumina-attendance`
  - `mars-horizon`
  - `novasphere-launch`
  - `stock-analysis`
  - `transformer-tutorial`
  - `verdant-furniture`
- Purpose: runnable webpage templates for static or Vite-based demos
- Public use case: provide immediately usable starters for landing pages, dashboards, portfolios, and product demos

## Release Notes for Inventory

- `lark_doc`, `miaoda`, and `slides` are template family collections with consistent naming but different content models.
- `webpage` is the most code-heavy family and will need extra attention for runnable examples and dependency review.
- The counts above reflect top-level folders under each family directory.
