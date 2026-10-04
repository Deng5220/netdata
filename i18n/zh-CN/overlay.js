/*
 * Netdata Agent Web UI — zh-CN runtime string overlay.
 * Dependency-free. Exact text-node and label-attribute matches, plus a few counted toolbar phrases.
 */
(function () {
  "use strict";

  var SKIP_TAGS = {
    SCRIPT: true,
    STYLE: true,
    TEXTAREA: true,
    INPUT: true,
    NOSCRIPT: true
  };

  var map = null;
  var applying = false;

  function warn(msg) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn("[i18n zh-CN] " + msg);
    }
  }

  function candidateUrls() {
    var urls = [];
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (src.indexOf("overlay.js") !== -1) {
        try {
          urls.push(new URL("strings.zh-CN.json", src).href);
        } catch (e) {}
        break;
      }
    }
    urls.push("/i18n/zh-CN/strings.zh-CN.json");
    urls.push("i18n/zh-CN/strings.zh-CN.json");
    return urls;
  }

  function loadMap() {
    var urls = candidateUrls();
    function tryNext(i) {
      if (i >= urls.length) {
        return Promise.reject(new Error("strings map not found"));
      }
      return fetch(urls[i], { credentials: "same-origin", cache: "no-cache" }).then(function (res) {
        if (!res.ok) throw new Error(res.status + " " + urls[i]);
        return res.json();
      }).catch(function () {
        return tryNext(i + 1);
      });
    }
    return tryNext(0);
  }

  function skippedElement(el) {
    while (el && el !== document.documentElement) {
      if (el.nodeType === 1) {
        if (SKIP_TAGS[el.tagName]) return true;
        if (el.hasAttribute && el.hasAttribute("data-i18n-skip")) return true;
      }
      el = el.parentNode;
    }
    return false;
  }

  // Chart ticks and similar: digits plus optional unit tokens only.
  function looksLikeNumberOrUnit(text) {
    if (!text) return true;
    if (text.length > 48) return false;
    if (/^(?:n\/a|nan|inf|null|undefined|—|–|-|\.{2,}|…)$/i.test(text)) return true;
    if (/^[-+]?\d[\d\s.,:%/+eE]*$/.test(text)) return true;
    if (/^[-+]?\d[\d.,]*\s*(?:%|°[CF]?|B|KB|MB|GB|TB|PB|EB|KiB|MiB|GiB|TiB|PiB|bps|kbps|Mbps|Gbps|B\/s|KB\/s|MB\/s|GB\/s|KiB\/s|MiB\/s|GiB\/s|Hz|kHz|MHz|GHz|ms|µs|μs|us|ns|s|m|h|d|rpm|ops|req\/s|r\/s|W|kW|mW|V|mV|A|mA|C|°|pps|iops)?$/i.test(text)) {
      return true;
    }
    return false;
  }

  var ATTRS = ["placeholder", "aria-label", "title", "aria-placeholder"];

  function phraseTranslate(trimmed) {
    if (Object.prototype.hasOwnProperty.call(map, trimmed)) {
      var hit = map[trimmed];
      if (typeof hit === "string" && hit !== trimmed) return hit;
    }
    var m;
    // Chart toolbar counts. Numbers vary; the surrounding chrome does not.
    m = /^(\d+)\s+of\s+(\d+)\s+dimensions$/i.exec(trimmed);
    if (m) return m[1] + " / " + m[2] + " 个维度";
    m = /^(\d+)\s+dimensions?$/i.exec(trimmed);
    if (m) return m[1] + " 个维度";
    m = /^(\d+)\s+labels?$/i.exec(trimmed);
    if (m) return m[1] + " 个标签";
    m = /^(\d+)\s+nodes?$/i.exec(trimmed);
    if (m) return m[1] + " 个节点";
    m = /^(\d+)\s+systems?$/i.exec(trimmed);
    if (m) return m[1] + " 个系统";
    m = /^every\s+(\d+)\s*s$/i.exec(trimmed);
    if (m) return "每 " + m[1] + " 秒";
    m = /^(\d+)\s+selected$/i.exec(trimmed);
    if (m) return "已选 " + m[1] + " 项";
    return null;
  }

  function applyTranslation(raw, translated) {
    var lead = /^\s*/.exec(raw)[0];
    var trail = /\s*$/.exec(raw)[0];
    return lead + translated + trail;
  }

  function translateTextNode(node) {
    var raw = node.nodeValue;
    if (!raw) return;
    var trimmed = raw.trim();
    if (!trimmed || looksLikeNumberOrUnit(trimmed)) return;
    var translated = phraseTranslate(trimmed);
    if (translated == null) return;
    var next = applyTranslation(raw, translated);
    if (next !== raw) node.nodeValue = next;
  }

  function translateAttrs(el) {
    if (!el || el.nodeType !== 1 || !el.getAttribute) return;
    if (el.hasAttribute && el.hasAttribute("data-i18n-skip")) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var name = ATTRS[i];
      if (!el.hasAttribute(name)) continue;
      var raw = el.getAttribute(name);
      if (!raw) continue;
      var trimmed = raw.trim();
      if (!trimmed || looksLikeNumberOrUnit(trimmed)) continue;
      var translated = phraseTranslate(trimmed);
      if (translated == null) continue;
      var next = applyTranslation(raw, translated);
      if (next !== raw) el.setAttribute(name, next);
    }
  }

  function walk(root) {
    if (!map || !root) return;
    if (root.nodeType === 3) {
      if (!skippedElement(root.parentNode)) translateTextNode(root);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) translateAttrs(root);
    if (root.querySelectorAll) {
      var labeled = root.querySelectorAll("[placeholder], [aria-label], [title], [aria-placeholder]");
      for (var a = 0; a < labeled.length; a++) translateAttrs(labeled[a]);
    }
    if (root.nodeType === 1 && skippedElement(root)) return;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (skippedElement(node.parentNode)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var batch = [];
    var current;
    while ((current = walker.nextNode())) batch.push(current);
    for (var i = 0; i < batch.length; i++) translateTextNode(batch[i]);
  }

  function applyRoot(root) {
    if (!map || applying || !root) return;
    applying = true;
    try {
      walk(root);
    } finally {
      applying = false;
    }
  }

  function observe() {
    var target = document.body;
    if (!target || typeof MutationObserver === "undefined") return;
    var observer = new MutationObserver(function (mutations) {
      if (applying || !map) return;
      applying = true;
      try {
        for (var i = 0; i < mutations.length; i++) {
          var m = mutations[i];
          if (m.type === "characterData") {
            if (m.target && m.target.nodeType === 3 && !skippedElement(m.target.parentNode)) {
              translateTextNode(m.target);
            }
          } else if (m.type === "attributes" && m.target && m.target.nodeType === 1) {
            translateAttrs(m.target);
          } else if (m.addedNodes && m.addedNodes.length) {
            for (var j = 0; j < m.addedNodes.length; j++) {
              walk(m.addedNodes[j]);
            }
          }
        }
      } finally {
        applying = false;
      }
    });
    observer.observe(target, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS
    });
  }

  function start(dict) {
    if (!dict || typeof dict !== "object") {
      warn("string map is not an object");
      return;
    }
    map = dict;
    applyRoot(document.body);
    observe();
  }

  function boot() {
    if (!document.body) return;
    loadMap().then(start).catch(function (err) {
      warn("overlay inactive: " + (err && err.message ? err.message : err));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
