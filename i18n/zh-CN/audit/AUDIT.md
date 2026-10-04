# Box UI audit (2026-10-04 15:29 CST)

Host: this shared Linux machine, disposable Docker `netdata-zh-box` (`netdata/netdata:stable`), `127.0.0.1:19999`, overlay injected before `</body>`. Not a mirror image. Not deployed.

Browser cache: a broken earlier inject had been cached by the v3 service worker. After clearing site data, `http://127.0.0.1:19999/v3/index.html?audit=7c7777a` loaded the dashboard.

## Verdict

Requested chrome is translated on this host. Do **not** package a mirror yet: the alerts page body and three configuration subtabs were still English in the screenshots. Those labels are now in `strings.zh-CN.json` and were not re-screenshotted.

## Verified translated

- Nav: 本地, 节点, 指标, 实时, 日志, 仪表板, 告警, 事件, 异常, AI 洞察, 登录, 播放中/已暂停
- Metrics chrome: 搜索图表, 分组依据, 维度, 平均值, 1 节点, 9 / 10 维度, 2 标签, 各自为, 每 4 秒, 重置
- Config: 配置, 采集器, 健康, 任务, 搜索, 0 已选

## Still English in the screenshots (in scope)

- Alerts: Raised, Running, New Alert, Alerts & Notifications, empty-state sentences
- Config subtabs: SecretStores, ServiceDiscovery, Vnodes
- Split toolbar token `the` next to 平均值, and chip `1 system` (pattern exists; node may be split)
- Chart titles, series names, and log body: unchanged on purpose

## Evidence

- `home.png`, `metrics.png`, `alerts.png`, `configs.png`, `notes.md`
