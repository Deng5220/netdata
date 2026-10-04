# Audit conclusion — Netdata zh-CN UI overlay

**Verdict: conditional pass for chrome menus; do not mirror-package yet.**

## What was tested

- Repo: https://github.com/Deng5220/netdata branch `i18n/zh-CN`
- Overlay path: `i18n/zh-CN/` (`strings.zh-CN.json`, `overlay.js`, `apply-overlay.sh`)
- Runtime: temporary Docker Agent on shared host **Deng** (`netdata-zh-test`, port 19999), overlay copied into `/usr/share/netdata/web/i18n/zh-CN/` and injected into `index.html` / `v3/index.html` / `v3/agent.html`
- Method: Playwright screenshots + body text dump of `/v3/` (menus, metrics chrome). Evidence under `i18n/zh-CN/audit/`.

## Findings

1. Top nav menus (节点/指标/实时/日志/仪表板/告警/事件/异常/AI 洞察) render in 简体中文.
2. Primary actions 播放中 / 登录 / 重置 / 展开 - 对比时段 work via exact string overlay.
3. Right metrics tree category labels largely Chinese after dictionary expansion.
4. Gaps remain in chart chrome phrases and search placeholder; metric/chart titles intentionally untouched.
5. `#/settings` hash alone did not open a dedicated settings sheet in this build; gear/settings deep links need another pass with explicit UI clicks.
6. Overlay approach is fragile for concatenated English phrases (`the AVG()`, `9 of 10 dimensions`) because replacements are exact full-token matches.

## Recommendation

- **Do not package a mirror image yet.**
- Next: finish dedicated Settings panels screenshots, expand phrase-level map for chart toolbar, then re-audit.
- Keep production untouched; current Docker test container is disposable verification only.

## Artifacts

- `audit-home.png`, `audit-settings.png` (metrics view; settings route did not change page)
- `audit-page-text.txt`
- `UNTRANSLATED.md`
