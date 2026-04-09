# GitHub Pages Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish `showcase/index.html` to GitHub Pages as the site's homepage without moving existing repository files.

**Architecture:** A GitHub Actions workflow uploads `showcase/` as the Pages artifact and deploys it through the official Pages actions. This keeps asset paths stable because the published artifact root is the existing showcase directory content.

**Tech Stack:** GitHub Actions, GitHub Pages, static HTML assets, git

---

### Task 1: Add GitHub Pages Deployment Workflow

**Files:**
- Create: `.github/workflows/deploy-showcase-pages.yml`
- Test: local YAML inspection and git diff

- [ ] **Step 1: Write the failing test**

Configuration-only change. No automated test is added; validation is performed by inspecting the workflow and then pushing it so GitHub can execute the deployment.

- [ ] **Step 2: Run test to verify it fails**

Not applicable for this configuration-only task.

- [ ] **Step 3: Write minimal implementation**

Create a workflow that:
- grants `pages` and `id-token` permissions
- uploads `./showcase` as the Pages artifact
- deploys on pushes to `master` and on manual dispatch

- [ ] **Step 4: Run test to verify it passes**

Run: `Get-Content .github/workflows/deploy-showcase-pages.yml`
Expected: workflow exists and `path: ./showcase` is present.

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/deploy-showcase-pages.yml docs/superpowers/specs/2026-04-09-github-pages-showcase-design.md docs/superpowers/plans/2026-04-09-github-pages-showcase.md
git commit -m "ci: deploy showcase to github pages"
```

### Task 2: Push and Verify Remote Update

**Files:**
- Modify: git history on `master`
- Test: remote push result

- [ ] **Step 1: Write the failing test**

Configuration-only remote delivery task. No local automated test applies.

- [ ] **Step 2: Run test to verify it fails**

Not applicable for this configuration-only task.

- [ ] **Step 3: Write minimal implementation**

Push the new commit to `origin/master`.

- [ ] **Step 4: Run test to verify it passes**

Run: `git push origin master`
Expected: push succeeds and remote branch updates.

- [ ] **Step 5: Commit**

No additional commit required after the push unless follow-up fixes are needed.
