# Box UI audit follow-up (2026-10-04 15:33 CST)

Host: shared Linux, disposable Docker `netdata-zh-box` (`netdata/netdata:stable`), `127.0.0.1:19999`. Site data cleared, then `?audit=1db772e`. Not a mirror image. Not deployed.

## Verdict

The English chrome called out on the previous screenshots is translated. Do **not** package until this conclusion is accepted.

## Verified this pass

- Toolbar token `the` → `的` (next to 平均值)
- Alerts: 已触发, 运行中, 配置错误, 新建告警, 此空间没有活动告警。, 稍后再看，或检查通知, 上次更新：
- Config subtabs: 密钥存储, 服务发现, 虚拟节点 (plus 配置 / 采集器 / 健康 / 任务)

## Left in English on purpose

- Toolbar chip still shows `system`. The exact phrase `1 system` did not match (the word is its own text node). Mapping bare `system` would also rename the CPU series `system`, which stays English with other metric names.
- Dates stay in English (`Sun, Oct 04, 2026`). `GMT+8` and `15min` stay as time tokens.
- Chart titles, series names, collector ids (`go.d`, `activemq`, …), and log body.

## Evidence

`metrics.png`, `alerts.png`, `configs.png`, `notes.md`
