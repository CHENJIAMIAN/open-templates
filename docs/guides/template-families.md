# Template Families

The repository is organized around four public template families. Each family has a different artifact shape, a different `initMode`, and different example assets.

## Family Overview

| Family | Count | What it is | Typical init mode |
|---|---:|---|---|
| `lark_doc` | 5 | Shareable document templates for reports and summaries | `copy-file` |
| `miaoda` | 47 | UI style prompt templates for visual generation workflows | `copy-file` |
| `slides` | 44 | Presentation theme bundles and deck scaffolds | `copy-dir` |
| `webpage` | 12 | Runnable website and dashboard templates | `copy-dir` |

## `lark_doc`

`lark_doc` is for markdown-first documents that are meant to be filled, shared, and revised quickly.

Representative templates:

- `weekly_report`
- `industry_research`
- `group_chat_summary`
- `paper_deepresearch`
- `topic_trend_report`

Expected shape:

- one primary markdown file in `templates/lark_doc/<name>/`
- filled examples in `examples/lark_doc/<name>/`
- a preview cover in `showcase/assets/lark_doc/<name>/`

Best fit:

- weekly reports
- research summaries
- meeting digests
- topic analysis notes

## `miaoda`

`miaoda` is for prompt-driven UI generation. The templates describe style direction, composition, and constraints instead of a runnable application.

Representative templates:

- `cyberpunk_hud`
- `editorial_brutalism`
- `minimal-jade`
- `handwritten_sketch`
- `warm_premium`

Expected shape:

- one `ui-template.md` source file in `templates/miaoda/<name>/`
- a prompt pack or style board in `examples/miaoda/<name>/`
- cover and gallery images in `showcase/assets/miaoda/<name>/`

Best fit:

- landing page styling prompts
- dashboard style directions
- UI mood boards
- image generation briefs

## `slides`

`slides` is for presentation themes and deck-style bundles. The source tree usually contains multiple files that work together.

Representative templates:

- `charcoal_gold`
- `professional_blue_white`
- `silver`
- `tech_blue_orange`
- `workplace`

Expected shape:

- a theme bundle in `templates/slides/<name>/`
- example documentation in `examples/slides/<name>/`
- preview images in `showcase/assets/slides/<name>/`

Best fit:

- executive decks
- investor updates
- project reviews
- workshop presentations

## `webpage`

`webpage` is for runnable front-end templates. These are copied as full directories and then opened in a local dev workflow.

Representative templates:

- `stock-analysis`
- `industrial-design-portfolio`
- `novasphere-launch`
- `verdant-furniture`
- `transformer-tutorial`

Expected shape:

- a full site directory in `templates/webpage/<name>/`
- a companion example README in `examples/webpage/<name>/`
- preview assets in `showcase/assets/webpage/<name>/`

Best fit:

- landing pages
- dashboards
- editorial portfolio sites
- launch pages
- educational demos

## How The Families Relate

The families share the same public metadata model, but they are not interchangeable.

- `lark_doc` and `miaoda` usually initialize as single files.
- `slides` and `webpage` usually initialize as whole directories.
- `examples/` shows filled or curated public-facing outputs.
- `showcase/assets/` supplies the preview images linked from metadata.

If you want the exact metadata field contract, see [Metadata schema](metadata-schema.md).
