# Local-only zh-CN UI overlay. Do not push this image.
# Build from this directory:
#   docker build -t netdata-zh-cn:stable-local .
FROM netdata/netdata:stable

COPY apply-overlay.sh overlay.js strings.zh-CN.json README.md PATCH_LANDING.md /opt/netdata-i18n/zh-CN/

RUN chmod +x /opt/netdata-i18n/zh-CN/apply-overlay.sh \
 && bash /opt/netdata-i18n/zh-CN/apply-overlay.sh /usr/share/netdata/web \
 && python3 -c 'from pathlib import Path; p=Path("/usr/share/netdata/web/v3/index.html"); t=p.read_text(encoding="utf-8", errors="replace"); i=t.find("/i18n/zh-CN/overlay.js"); h=t.lower().find("</head>"); b=t.lower().find("</body>"); assert i>h and b>i and t[i:b+7].endswith("</body>"), (i,h,b); print("overlay-before-body", i, b)'
