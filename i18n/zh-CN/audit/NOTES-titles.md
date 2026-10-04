# Netdata i18n display audit

Date/view: 2026-10-04, local agent, after clearing site data for `http://127.0.0.1:19999` and opening `v3/index.html?audit=titles1`. No cloud sign-in was used.

## Home / metrics overview

All requested formerly-English chart titles were localized; none of the requested chart titles remains English:

- Total Disk Reads -> **磁盘读取总量**
- Avg CPU per Node -> **每节点平均 CPU**
- Avg Used RAM per Node -> **每节点平均已用内存**
- Total Network Inbound -> **网络入站总量**
- Total Network Outbound -> **网络出站总量**
- Average Disk I/O Pressure -> **平均磁盘 I/O 压力（10 秒，部分）**
- Top Nodes by CPU -> **按 CPU 排名的节点**
- Top Nodes by Used RAM -> **按已用内存排名的节点**
- Avg System Load -> **平均系统负载（1 分钟）**

Additional overview chart titles visible and localized were **平均 CPU 压力（10 秒，全部）** and **平均内存压力（10 秒，部分）**. English metric-series labels such as `softirq`, `user`, and `system` are not chart titles and are intentionally not counted. Non-title navigation/category labels still visible in English include `O/S Services`, `Containers & VMs`, and `Cgroups`; these are not chart-title failures.

## Configurations > Collectors

Chinese/bilingual labels observed (the former bare IDs are no longer bare):

`ActiveMQ 消息队列`, `无线接入点`, `Apache 网页服务器`, `APC UPS 电源`, `Beanstalk 队列`, `Cassandra 数据库`, `Ceph 存储`, `Chrony 时间同步`, `ClickHouse 数据库`, `DNS 查询`, `Envoy 代理`, `Fail2ban 防爆破`, `文件检查`, `Fluentd 日志`, `硬盘温度`, `HTTP 检查`, `Lighttpd 网页服务器`, `Memcached 缓存`, `MongoDB 数据库`, `MySQL 数据库`, `Nginx 网页服务器`, `NTP 时间同步`, `OpenVPN 状态日志`, `Oracle 数据库`, `Ping 探测`, `端口检查`, `Postfix 邮件`, `PostgreSQL 数据库`, `RabbitMQ 消息队列`, `Redis 缓存`, `S3 检查`, `Samba 文件共享`, `SMART 硬盘健康`, `SNMP 拓扑`, `Squid 代理`, `Squid 日志`, `systemd 单元`, `Traefik 网关`, `Varnish 缓存`, `1-Wire 传感器`, `Web 日志`, `Whois 查询`, `WireGuard VPN`, `X.509 证书检查`, `ZFS 存储池`. The Docker child instance is shown as **本地**.

Still-English/bare labels observed in the same list:

`Adaptec RAID`, `BIND DNS`, `BOINC`, `Azure Monitor`, `AWS CloudWatch`, `cato_networks`, `CockroachDB`, `Consul`, `CoreDNS`, `Couchbase`, `CouchDB`, `dcgm`, `dmcache`, `dnsdist`, `dnsmasq`, `dnsmasq_dhcp`, `Docker`, `Docker Engine`, `Docker Hub`, `dovecot`, `Elasticsearch`, `ethtool`, `exim`, `freeradius`, `gearman`, `geth`, `hdfs`, `hpssa`, `icecast`, `intelgpu`, `ipfs`, `isc_dhcpd`, `Kubernetes API Server`, `Kubernetes Kubelet`, `Kubernetes kube-proxy`, `litespeed`, `logind`, `logstash`, `lvm`, `maxscale`, `megacli`, `monit`, `mssql`, `nats`, `Nginx Plus`, `nginxunit`, `nginxvts`, `nsd`, `nvidia_smi`, `nvme`, `openldap`, `OpenVPN`, `panos`, `pgbouncer`, `phpdaemon`, `pihole`, `pika`, `powerdns`, `powerdns_recursor`, `powerstore`, `powervault`, `Prometheus`, `proxysql`, `pulsar`, `puppet`, `redfish`, `rethinkdb`, `riakkv`, `rspamd`, `scaleio`, `SNMP`, `SNMP Trap`, `spigotmc`, `sql`, `storcli`, `supervisord`, `tengine`, `Tomcat`, `tor`, `typesense`, `unbound`, `upsd`, `uwsgi`, `vcsa`, `vernemq`, `vsphere`, `yugabytedb`, `ZooKeeper`.

These remaining English entries are technical/product names or IDs; they were not changed to Chinese in this view.
