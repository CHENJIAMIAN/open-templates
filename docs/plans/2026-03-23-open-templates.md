# Open Templates Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a public `open-templates` repository that open-sources all four template families, adds a lightweight CLI, and includes real public examples that increase project appeal.

**Architecture:** The repository is organized around a single `templates/` source tree, a unified metadata layer, a small filesystem-based CLI, and an `examples/` plus `showcase/` area for public artifacts. Work proceeds in release-safe phases: inventory, normalize, showcase, CLI, docs, and verification.

**Tech Stack:** Markdown, JSON, Node.js CLI, filesystem copy utilities, static assets, existing webpage templates, exported previews

---

### Task 1: Create Public Repository Skeleton

**Files:**
- Create: `README.md`
- Create: `LICENSE`
- Create: `docs/guides/README.md`
- Create: `templates/.gitkeep`
- Create: `examples/.gitkeep`
- Create: `showcase/assets/.gitkeep`
- Create: `packages/cli/package.json`

**Step 1: Write the failing test**

Define the acceptance check as a directory and file existence check:

```powershell
$paths = @(
  'README.md',
  'LICENSE',
  'docs/guides/README.md',
  'templates/.gitkeep',
  'examples/.gitkeep',
  'showcase/assets/.gitkeep',
  'packages/cli/package.json'
)
$paths | ForEach-Object {
  if (-not (Test-Path $_)) { throw "Missing $_" }
}
```

**Step 2: Run test to verify it fails**

Run:

```powershell
pwsh -NoProfile -Command "<acceptance-check>"
```

Expected: FAIL with one or more missing paths.

**Step 3: Write minimal implementation**

Create the repository scaffold files and directories with placeholder content sufficient to establish structure.

**Step 4: Run test to verify it passes**

Run the same acceptance check.

Expected: PASS with no missing paths.

**Step 5: Commit**

```bash
git add README.md LICENSE docs/guides/README.md templates/.gitkeep examples/.gitkeep showcase/assets/.gitkeep packages/cli/package.json
git commit -m "chore: scaffold open templates repository"
```

### Task 2: Inventory and Classify Existing Templates

**Files:**
- Create: `docs/guides/template-inventory.md`
- Create: `docs/guides/release-checklist.md`
- Modify: `README.md`

**Step 1: Write the failing test**

Define acceptance as an inventory document that lists all four families and a release checklist that includes public-safety review:

```powershell
Select-String -Path 'docs/guides/template-inventory.md' -Pattern 'lark_doc|miaoda|slides|webpage'
Select-String -Path 'docs/guides/release-checklist.md' -Pattern 'internal|license|screenshot|public'
```

**Step 2: Run test to verify it fails**

Run:

```powershell
pwsh -NoProfile -Command "<acceptance-check>"
```

Expected: FAIL because the files do not yet exist.

**Step 3: Write minimal implementation**

Document:

- each template family
- current estimated template counts
- known cleanup concerns
- release blockers for open sourcing

**Step 4: Run test to verify it passes**

Run the same `Select-String` checks.

Expected: PASS with matches for all four families and release-safety terms.

**Step 5: Commit**

```bash
git add docs/guides/template-inventory.md docs/guides/release-checklist.md README.md
git commit -m "docs: add template inventory and release checklist"
```

### Task 3: Normalize Metadata for All Template Families

**Files:**
- Create: `docs/guides/metadata-schema.md`
- Create: `templates/<family>/<template>/metadata.json` where missing
- Modify: existing metadata files under `templates/webpage`

**Step 1: Write the failing test**

Add a metadata validation script target and define checks for required fields:

```javascript
const required = ['name', 'displayName', 'family', 'description', 'tags'];
```

Acceptance command:

```bash
node packages/cli/scripts/validate-metadata.mjs
```

Expected initial failure: missing files or missing fields.

**Step 2: Run test to verify it fails**

Run the validation command before adding schema coverage.

Expected: FAIL with missing metadata or schema mismatch.

**Step 3: Write minimal implementation**

- document the schema
- add missing metadata files
- normalize family naming and required fields

**Step 4: Run test to verify it passes**

Run:

```bash
node packages/cli/scripts/validate-metadata.mjs
```

Expected: PASS with all public templates validated.

**Step 5: Commit**

```bash
git add docs/guides/metadata-schema.md templates
git commit -m "feat: normalize template metadata"
```

### Task 4: Curate Public Example Outputs

**Files:**
- Create: `examples/lark_doc/*`
- Create: `examples/miaoda/*`
- Create: `examples/slides/*`
- Create: `examples/webpage/*`
- Create: `showcase/assets/*`

**Step 1: Write the failing test**

Define acceptance as at least one publishable example directory per family plus at least one preview asset per family:

```powershell
$required = @(
  'examples/lark_doc',
  'examples/miaoda',
  'examples/slides',
  'examples/webpage',
  'showcase/assets'
)
```

Add concrete count checks after deciding exact filenames.

**Step 2: Run test to verify it fails**

Run a path existence check and preview count check.

Expected: FAIL because examples are not present yet.

**Step 3: Write minimal implementation**

Add real example outputs:

- filled Markdown docs for `lark_doc`
- screenshot sets for `miaoda`
- exported preview images and PDFs for `slides`
- selected runnable demos and screenshots for `webpage`

**Step 4: Run test to verify it passes**

Run the existence and count check.

Expected: PASS with every family represented.

**Step 5: Commit**

```bash
git add examples showcase/assets
git commit -m "feat: add public showcase examples"
```

### Task 5: Build Lightweight CLI

**Files:**
- Create: `packages/cli/package.json`
- Create: `packages/cli/bin/open-templates.js`
- Create: `packages/cli/src/list.mjs`
- Create: `packages/cli/src/show.mjs`
- Create: `packages/cli/src/init.mjs`
- Create: `packages/cli/src/fs-utils.mjs`
- Create: `packages/cli/scripts/validate-metadata.mjs`
- Create: `packages/cli/tests/cli.test.mjs`

**Step 1: Write the failing test**

Write a simple Node test for:

- `list` prints grouped templates
- `show <id>` prints template details
- `init <id> <dir>` copies template files

Example:

```javascript
import { strict as assert } from 'node:assert';
assert.match(output, /webpage/);
```

**Step 2: Run test to verify it fails**

Run:

```bash
node --test packages/cli/tests/cli.test.mjs
```

Expected: FAIL because the CLI does not exist yet.

**Step 3: Write minimal implementation**

Implement:

- metadata loading
- family filtering
- template copy logic
- readable terminal output

**Step 4: Run test to verify it passes**

Run:

```bash
node --test packages/cli/tests/cli.test.mjs
node packages/cli/bin/open-templates.js list
```

Expected: PASS and usable output.

**Step 5: Commit**

```bash
git add packages/cli
git commit -m "feat: add open templates cli"
```

### Task 6: Write Public Documentation and Quick Starts

**Files:**
- Modify: `README.md`
- Create: `docs/guides/getting-started.md`
- Create: `docs/guides/template-families.md`
- Create: `docs/guides/cli.md`
- Create: `docs/guides/examples.md`

**Step 1: Write the failing test**

Define acceptance as documentation containing:

- install command
- quick start
- four family descriptions
- examples links

Use checks like:

```powershell
Select-String -Path 'README.md' -Pattern 'Quick Start|lark_doc|miaoda|slides|webpage|open-templates list'
```

**Step 2: Run test to verify it fails**

Run the `Select-String` checks before writing docs.

Expected: FAIL on missing sections.

**Step 3: Write minimal implementation**

Document:

- what the repository is
- how to install and use the CLI
- how each family is meant to be consumed
- where to find real outputs

**Step 4: Run test to verify it passes**

Run the same checks.

Expected: PASS with all required sections present.

**Step 5: Commit**

```bash
git add README.md docs/guides
git commit -m "docs: add public usage guides"
```

### Task 7: Verify Public Readiness

**Files:**
- Modify: `docs/guides/release-checklist.md`
- Create: `docs/guides/public-release-notes.md`

**Step 1: Write the failing test**

Define acceptance as a completed verification pass:

- metadata validation passes
- CLI tests pass
- docs checks pass
- example presence checks pass

Represent this with a release verification script or documented command sequence.

**Step 2: Run test to verify it fails**

Run all checks before the last fixes.

Expected: at least one failure until all prior tasks are complete.

**Step 3: Write minimal implementation**

Add:

- final release notes
- final release checklist results
- exact release commands

**Step 4: Run test to verify it passes**

Run:

```bash
node packages/cli/scripts/validate-metadata.mjs
node --test packages/cli/tests/cli.test.mjs
```

And the documented docs/example checks.

Expected: PASS across all verification steps.

**Step 5: Commit**

```bash
git add docs/guides/release-checklist.md docs/guides/public-release-notes.md
git commit -m "docs: prepare public release verification"
```
