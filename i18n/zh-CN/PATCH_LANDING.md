# Netdata zh-CN UI locale overlay — patch landing

## Upstream facts
- Official `netdata/netdata` no longer vendors dashboard source under `web/gui`.
- Local Agent UI (v3) is fetched at build/install from `https://app.netdata.cloud/agent.tar.gz`
  via `packaging/cmake/Modules/NetdataDashboard.cmake` and installed under `${WEB_DEST}`
  (typically `/usr/share/netdata/web`), with paths like `v3/` (and root copies of index/html).
- Bundled assets are minified webpack chunks; **no separate locale JSON / i18n resource files**.
- Official `netdata/localization` is **docs only** (Markdown), not the Agent Web UI.
- UI strings such as menus/settings appear as English string literals inside `dist/agent/v3/*.js` chunks.
- Entry HTML: `dist/agent/index.html`, `dist/agent/v3/index.html`, `dist/agent/v3/agent.html` (`lang="en"`).

## Recommended locale overlay (minimal upstream churn)
Place under the fork, branch `i18n/zh-CN`:

```
i18n/zh-CN/
  README.md                 # how to apply / test
  strings.zh-CN.json        # map of visible UI English → 简体中文 (menus/settings/buttons/labels)
  overlay.js                # runtime overlay: load map, replace text nodes / known selectors
  apply-overlay.sh          # optional: patch installed web root or post-fetch dashboard tree
  patches/
    inject-overlay.patch    # tiny HTML patch: inject <script src="/i18n/zh-CN/overlay.js"> into index/agent.html
```

Install/runtime target (on a test host, not production):
- Overlay files → `${WEB_DEST}/i18n/zh-CN/`
- Inject script tag into `${WEB_DEST}/index.html` and `${WEB_DEST}/v3/index.html` (and agent.html if used)
- Prefer `/v3/` local bundle for deterministic testing (Cloudflare live UI would ignore local overlay)

Do **not** translate metric names or log lines in this pass.
