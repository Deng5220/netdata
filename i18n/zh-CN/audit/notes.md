# zh-CN overlay retest (audit=1db772e)

Site data for `http://127.0.0.1:19999/` was cleared in Chrome DevTools Storage with cache storage, IndexedDB, local/session storage, cookies, and service-worker unregister selected. No welcome/sign-in splash appeared.

## Metrics (`metrics.png`)

The in-scope navigation and metrics-panel chrome is Chinese. The chart toolbar now shows `的` next to `平均值` (the old English token is fixed). The count still renders as `1 system` rather than `1 个系统`; `system` is the remaining English in the toolbar. The visible timestamp/date strings still use English month/day formatting (for example, `Sun, Oct 04, 2026`), and the global time UI retains technical `GMT+8`/`15min` formatting. Chart titles, metric names, units, and data values are intentionally not inventoried.

## Alerts (`alerts.png`)

The Raised/Running/Configuration Errors/New Alert area is translated as `已触发`, `运行中`, `配置错误`, and `新建告警`. The empty state is Chinese: `此空间没有活动告警。` and `稍后再看，或检查通知`. The remaining English visible in this view is the date portion of the last-updated timestamp, `Sun, Oct 04, 2026 15:33:18` (plus the technical `GMT+8`/`15min` global time formatting).

## Configurations (`configs.png`)

The configuration chrome is Chinese, including `配置`, `采集器`, `健康`, `日志`, and the requested subtabs: `密钥存储`, `服务发现`, `虚拟节点`. Collector/module identifiers such as `go.d`, `scripts.d`, `activemq`, and `apache` remain identifier names rather than UI strings and are not counted as untranslated chrome.
