#!/usr/bin/env bash
# Copy the zh-CN UI overlay into a Netdata web root and inject overlay.js.
# Usage: apply-overlay.sh [WEB_DEST]
# Default WEB_DEST: /usr/share/netdata/web
set -euo pipefail

WEB_DEST="${1:-${WEB_DEST:-/usr/share/netdata/web}}"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${WEB_DEST%/}/i18n/zh-CN"
TAG='<script src="/i18n/zh-CN/overlay.js"></script>'

if [[ ! -d "$WEB_DEST" ]]; then
  echo "WEB_DEST does not exist: $WEB_DEST" >&2
  exit 1
fi

mkdir -p "$DEST"
# Copy overlay assets. Skip this script so a re-run from DEST does not nest copies of itself
# in a confusing way — the script stays with the source tree. All locale files are copied.
cp -a "$SRC/README.md" "$SRC/strings.zh-CN.json" "$SRC/overlay.js" "$DEST/"
if [[ -f "$SRC/PATCH_LANDING.md" ]]; then
  cp -a "$SRC/PATCH_LANDING.md" "$DEST/"
fi
echo "installed overlay files -> $DEST"

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

  local tmp
  tmp="$(mktemp)"
  if grep -q '</body>' "$html"; then
    awk -v tag="  $TAG" '
      !done && /<\/body>/ { print tag; done = 1 }
      { print }
    ' "$html" > "$tmp"
  elif grep -q '</head>' "$html"; then
    awk -v tag="  $TAG" '
      !done && /<\/head>/ { print tag; done = 1 }
      { print }
    ' "$html" > "$tmp"
  else
    cp "$html" "$tmp"
    printf '\n%s\n' "  $TAG" >> "$tmp"
  fi

  cat "$tmp" > "$html"
  rm -f "$tmp"
  echo "injected: $html"
}

inject_html "${WEB_DEST%/}/index.html"
inject_html "${WEB_DEST%/}/v3/index.html"
inject_html "${WEB_DEST%/}/v3/agent.html"
