# Untranslated inventory (Agent v3 chrome audit)

Host: Deng shared desktop, Docker `netdata/netdata:stable` test container `netdata-zh-test` on `:19999` with `i18n/zh-CN` overlay injected (not production, not deployed permanently as a mirror package).

Scope for this pass: menus / settings / buttons / labels. **Metric names, chart series, and log lines are deferred.**

## Still English (in-scope UI chrome)

- Configurations / Collectors / Health / Jobs (node config panes) — mapped in follow-up
- 0 selected
- Search charts (placeholder) — added in follow-up string map
- Latest: (chart footer label) — added in follow-up string map
- Chart toolbar fragments: `the AVG()`, `9 of 10 dimensions`, `2 labels`, `each as`, `every 4s`, `dimension` as a free token in sentences
- Left-rail icon-only controls (no visible text to map)
- Time tokens kept English by choice: `GMT+8`, `15min`, clock stamps

## Deferred (out of scope this pass — metric / chart titles)

- Total Disk Reads / Writes
- Avg CPU per Node / Avg Used RAM per Node
- Total Network Inbound / Outbound
- Average Disk I/O Pressure…
- Avg CPU / Memory Pressure…
- Top Nodes by CPU / Used RAM
- Avg System Load (1 min)
- Total CPU utilization • system.cpu • [percent]
- Pressure Stall Information (PSI) section headers
- Legend series: softirq / user / system / iowait / some 10 / some 60 / some 300
- Context ids like `1b2ddd9312cb`
- Product subtree label `Netdata`, acronym `IPC`, `CPU` as category (often kept)

## Already translated (spot-check)

本地, 播放中, 最近, 实时, 登录, 节点, 指标, 日志, 仪表板, 告警, 事件, 异常, AI 洞察, 系统, 计算, 内存, 存储, 网络, 硬件, 进程, 概览, 应用, 交换分区, 磁盘, 任务, 文件描述符, 运行时间, 用户, 组, 合成, 维度, 值, 分组依据, 重置, 展开 - 对比时段, 指标关联, 显示 … 共 … 图表, 添加更多图表, 异常率 %

## Follow-up mapped, box retest pending

Exact map plus counted phrases in `overlay.js` (not yet re-screenshotted on this machine):

- Search charts (also placeholder / aria-label / title)
- Latest:
- AVG() → 平均值
- each as → 各自为
- N of M dimensions, N dimension(s), N label(s), N node(s), N system(s), every Ns, N selected
- Configurations / Collectors / Health / Jobs

Left as English on purpose: bare token `the` (split beside AVG()), chart titles, series names, log body, GMT+8 / 15min.

