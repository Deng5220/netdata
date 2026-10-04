#!/usr/bin/env bash
# Copy the zh-CN UI overlay into a Netdata web root and inject overlay.js.
# Usage: apply-overlay.sh [WEB_DEST]
# Default WEB_DEST: /usr/share/netdata/web
set -euo pipefail

WEB_DEST="${1:-${WEB_DEST:-/usr/share/netdata/web}}"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${WEB_DEST%/}/i18n/zh-CN"
TAG='  <script src="/i18n/zh-CN/overlay.js"></script>'

if [[ ! -d "$WEB_DEST" ]]; then
  echo "WEB_DEST does not exist: $WEB_DEST" >&2
  exit 1
fi

mkdir -p "$DEST"
cp -a "$SRC/README.md" "$SRC/strings.zh-CN.json" "$SRC/overlay.js" "$DEST/"
if [[ -f "$SRC/PATCH_LANDING.md" ]]; then
  cp -a "$SRC/PATCH_LANDING.md" "$DEST/"
fi
echo "installed overlay files -> $DEST"

# Netdata splash HTML packs </head><body>…</body> on one huge line. Line-oriented
# awk would insert BEFORE that whole line (inside an earlier <script>), breaking JS.
# Always splice the tag immediately before the first literal </body>.
inject_html() {
  local html="$1"
  if [[ ! -f "$html" ]]; then
    echo "skip missing: $html"
    return 0
  fi
  if grep -q '/i18n/zh-CN/overlay.js' "$html"; then
    echo "already injected: $html"
    return 0
  fi

  OVERLAY_TAG="$TAG" python3 - "$html" <<'PY'
import os, sys
from pathlib import Path
path = Path(sys.argv[1])
tag = os.environ["OVERLAY_TAG"]
text = path.read_text(encoding="utf-8", errors="surrogateescape")
lower = text.lower()
idx = lower.find("</body>")
if idx == -1:
    idx = lower.rfind("</html>")
    if idx == -1:
        path.write_text(text + "\n" + tag + "\n", encoding="utf-8", errors="surrogateescape")
    else:
        path.write_text(text[:idx] + tag + "\n" + text[idx:], encoding="utf-8", errors="surrogateescape")
else:
    path.write_text(text[:idx] + tag + "\n" + text[idx:], encoding="utf-8", errors="surrogateescape")
print("injected:", path)
PY
}

inject_html "${WEB_DEST%/}/index.html"
inject_html "${WEB_DEST%/}/v3/index.html"
inject_html "${WEB_DEST%/}/v3/agent.html"
