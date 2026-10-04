Netdata v3 i18n audit (audit=7c7777a)

Cache/load
- Cleared the origin in DevTools Application > Storage with Cache storage, IndexedDB, local/session storage, service-worker unregister, and cookies selected.
- Confirmed Application > Cache storage reported “No cache storage detected” for http://127.0.0.1:19999/.
- Fresh exact URL loaded and redirected into the local room dashboard; top navigation was visible.

Chinese chrome that worked
- Main navigation: 本地, 节点, 指标, 实时, 日志, 仪表板, 告警, 事件, 异常, AI 洞察, 登录.
- Metrics chrome: 搜索图表 (Search charts), 最新: (Latest:), 分组依据, 维度, 平均值, 1 节点, 9 / 10 维度, 2 标签, 各自为, 每 4 秒, 重置.
- Configuration route: 配置 (Configurations), 采集器 (Collectors), 健康 (Health), 任务 (Jobs), 节点, 搜索.

Still-English in-scope chrome
- Alerts page: Raised, Running, Misconfigured tabs and New Alert button remain English.
- Configuration subtabs remain English: SecretStores, ServiceDiscovery, Vnodes.
- AVG()/N of M dimensions: no literal English AVG() or “N of M dimensions” was observed in the tested chart chrome; the corresponding visible labels were localized as 平均值 and 9 / 10 维度.
- Chart titles, metric names, and log text were not inventoried (out of scope).
