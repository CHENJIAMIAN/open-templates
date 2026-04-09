# GitHub Pages Showcase Design

**Date:** 2026-04-09

**Goal**

Publish the repository's `showcase/` directory to GitHub Pages so the deployed site serves `showcase/index.html` as the homepage.

**Context**

The repository already contains a static showcase entry point at `showcase/index.html` and its supporting assets under `showcase/assets/`. The working tree also contains unrelated uncommitted user changes, so the implementation must avoid restructuring existing files or overwriting in-progress work.

**Approach**

Use GitHub Pages via GitHub Actions. The workflow will:

1. Run on pushes to `master` and on manual dispatch.
2. Upload the repository root as the Pages artifact so `showcase/index.html` can still access `docs/aily-preview-map.json` and `templates/**/metadata.json`.
3. Add a root `index.html` redirect that sends the homepage to `showcase/index.html`.

This keeps the existing showcase page intact while preserving its relative paths to data files elsewhere in the repository.

**Files**

- Create `.github/workflows/deploy-showcase-pages.yml` for GitHub Pages deployment.
- Create `index.html` as a redirect entry point.
- Create `docs/superpowers/plans/2026-04-09-github-pages-showcase.md` for the execution plan.

**Verification**

- Validate the workflow file exists and points `upload-pages-artifact` at `.`.
- Validate the root `index.html` redirects to `showcase/index.html`.
- Commit only the new Pages-related files.
- Push to `origin/master`.
- Confirm the remote branch updates successfully.
- Provide the expected Pages URL: `https://chenjiamian.github.io/open-templates/`.

**Risks**

- GitHub repository Pages settings may not yet be configured to use GitHub Actions. If so, the workflow will exist and push successfully, but the user may still need to enable Pages source in repository settings.
- First deployment depends on GitHub Actions finishing successfully on GitHub's side, which cannot be fully verified from the local shell alone.
