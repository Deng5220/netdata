# Local image (do not push, do not deploy)

Image: `netdata-zh-cn:stable-local`  
Base: `netdata/netdata:stable`  
Overlay: inject `/i18n/zh-CN/overlay.js` immediately before `</body>`.

## Build (on this machine)

```bash
cd /path/to/i18n/zh-CN   # or /workspace/netdata-zh-image
docker build -t netdata-zh-cn:stable-local .
```

Context files: `Dockerfile`, `apply-overlay.sh`, `overlay.js`, `strings.zh-CN.json`, `README.md`, `PATCH_LANDING.md`.

## Run (test only)

```bash
docker run -d --name netdata-zh-test \
  --restart=no \
  -p 127.0.0.1:19999:19999 \
  --cap-add SYS_PTRACE \
  --security-opt apparmor=unconfined \
  -v /proc:/host/proc:ro \
  -v /sys:/host/sys:ro \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  netdata-zh-cn:stable-local
```

Open `http://127.0.0.1:19999/v3/`. If the UI sticks on Loading after an older broken inject, clear site data for that origin once.
