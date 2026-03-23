# Examples And Showcase Assets

The public repository is intentionally split into two kinds of example content:

- `examples/` holds the filled or curated example packages
- `showcase/assets/` holds the preview images linked from metadata and used in the docs

This keeps the source templates clean while still giving readers something concrete to inspect.

## Layout Pattern

Each family follows the same broad structure:

- `templates/<family>/<template>/` contains the source template
- `examples/<family>/<template>/` contains the public example or example pack
- `showcase/assets/<family>/<template>/` contains the preview cover and gallery images

## Example Families

### `lark_doc`

The document examples are filled markdown files.

- `examples/lark_doc/weekly_report/weekly_report.md`
- `examples/lark_doc/industry_research/industry_research.md`
- `examples/lark_doc/group_chat_summary/group_chat_summary.md`

Preview assets:

- `showcase/assets/lark_doc/weekly_report/cover.svg`
- `showcase/assets/lark_doc/industry_research/cover.svg`
- `showcase/assets/lark_doc/group_chat_summary/cover.svg`

### `miaoda`

The `miaoda` examples are prompt packs and rendered style boards.

- `examples/miaoda/cyberpunk_hud/prompt-pack.md`
- `examples/miaoda/cyberpunk_hud/style-board.html`
- `examples/miaoda/editorial_brutalism/prompt-pack.md`
- `examples/miaoda/editorial_brutalism/component-sheet.html`
- `examples/miaoda/minimal-jade/prompt-pack.md`
- `examples/miaoda/minimal-jade/dashboard-mock.html`

Preview assets:

- `showcase/assets/miaoda/cyberpunk_hud/cover.png`
- `showcase/assets/miaoda/cyberpunk_hud/gallery-1.png`
- `showcase/assets/miaoda/editorial_brutalism/cover.png`
- `showcase/assets/miaoda/editorial_brutalism/gallery-1.png`
- `showcase/assets/miaoda/minimal-jade/cover.png`
- `showcase/assets/miaoda/minimal-jade/gallery-1.png`

### `slides`

The slide examples are companion packages that describe what the theme is for and what the public preview includes.

- `examples/slides/charcoal_gold/README.md`
- `examples/slides/professional_blue_white/README.md`
- `examples/slides/silver/README.md`
- `examples/slides/tech_blue_orange/README.md`

For the `charcoal_gold` export workflow, see [Slides export guide](slides-export.md).

Preview assets:

- `showcase/assets/slides/charcoal_gold/cover.png`
- `showcase/assets/slides/charcoal_gold/gallery-1.png`
- `showcase/assets/slides/professional_blue_white/cover.png`
- `showcase/assets/slides/professional_blue_white/gallery-1.png`
- `showcase/assets/slides/silver/cover.png`
- `showcase/assets/slides/silver/gallery-1.png`
- `showcase/assets/slides/tech_blue_orange/cover.png`
- `showcase/assets/slides/tech_blue_orange/gallery-1.png`

### `webpage`

The webpage examples are companion packages for runnable or previewable site templates.

- `examples/webpage/industrial-design-portfolio/README.md`
- `examples/webpage/novasphere-launch/README.md`
- `examples/webpage/verdant-furniture/README.md`

Preview assets:

- `showcase/assets/webpage/industrial-design-portfolio/cover.png`
- `showcase/assets/webpage/industrial-design-portfolio/gallery-1.png`
- `showcase/assets/webpage/novasphere-launch/cover.png`
- `showcase/assets/webpage/novasphere-launch/gallery-1.png`
- `showcase/assets/webpage/verdant-furniture/cover.png`
- `showcase/assets/webpage/verdant-furniture/gallery-1.png`

## Why These Examples Matter

The examples are the public proof that the repository is more than a directory of templates.

- They show the filled output shape.
- They make the preview metadata real.
- They help readers understand the family boundaries before they run the CLI.

If you want the source template inventory that backs these examples, see [Template inventory](template-inventory.md).
