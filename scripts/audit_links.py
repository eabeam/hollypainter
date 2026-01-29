#!/usr/bin/env python3
import csv
import html
import os
import re
import sys
import urllib.error
import urllib.request

CONTENT_DIRS = [
    os.path.join("site-kross", "content"),
    os.path.join("site-educenter", "content"),
]

IMG_MD_RE = re.compile(r"!\[[^\]]*\]\((https?://[^)\s]+)")
IMG_HTML_RE = re.compile(r"<img[^>]+src=[\"'](https?://[^\"'>\s]+)", re.IGNORECASE)
LINK_MD_RE = re.compile(r"(?<!!)\[[^\]]+\]\((https?://[^)\s]+)")
LINK_HTML_RE = re.compile(r"<a[^>]+href=[\"'](https?://[^\"'>\s]+)", re.IGNORECASE)
RAW_RE = re.compile(r"https?://[^\s)\"']+")

USER_AGENT = "LinkAudit/1.0"
TIMEOUT = 12


def iter_markdown_files():
    for base in CONTENT_DIRS:
        if not os.path.isdir(base):
            continue
        for root, _, files in os.walk(base):
            for filename in files:
                if filename.endswith(".md"):
                    yield os.path.join(root, filename)


def add_entry(entries, path, url, context):
    cleaned = html.unescape(url)
    key = (path, cleaned)
    existing = entries.get(key)
    if existing is None:
        entries[key] = context
        return
    if existing != "image" and context == "image":
        entries[key] = "image"


def collect_links(path):
    with open(path, "r", encoding="utf-8") as handle:
        text = handle.read()

    entries = {}
    for match in IMG_MD_RE.findall(text):
        add_entry(entries, path, match, "image")
    for match in IMG_HTML_RE.findall(text):
        add_entry(entries, path, match, "image")
    for match in LINK_MD_RE.findall(text):
        add_entry(entries, path, match, "link")
    for match in LINK_HTML_RE.findall(text):
        add_entry(entries, path, match, "link")

    for match in RAW_RE.findall(text):
        add_entry(entries, path, match, "raw")

    return entries


def check_url(url):
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as response:
            return response.getcode(), response.geturl(), ""
    except urllib.error.HTTPError as err:
        if err.code in (405, 403):
            return check_url_get(url)
        return err.code, getattr(err, "url", url), str(err)
    except urllib.error.URLError as err:
        return None, url, str(err)
    except Exception as err:  # noqa: BLE001
        return None, url, str(err)


def check_url_get(url):
    req = urllib.request.Request(url, method="GET", headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as response:
            return response.getcode(), response.geturl(), ""
    except urllib.error.HTTPError as err:
        return err.code, getattr(err, "url", url), str(err)
    except urllib.error.URLError as err:
        return None, url, str(err)
    except Exception as err:  # noqa: BLE001
        return None, url, str(err)


def main():
    all_entries = {}
    for path in iter_markdown_files():
        for key, context in collect_links(path).items():
            all_entries[key] = context

    if not all_entries:
        print("No external links found.")
        return 0

    urls = sorted({url for _, url in all_entries.keys()})
    status_map = {}
    for url in urls:
        status_map[url] = check_url(url)

    all_rows = []
    broken_rows = []
    for (path, url), context in sorted(all_entries.items()):
        status, final_url, error = status_map.get(url, (None, url, ""))
        row = {
            "file": path,
            "context": context,
            "url": url,
            "status": "" if status is None else status,
            "final_url": final_url,
            "error": error,
        }
        all_rows.append(row)
        if status is None or status >= 400:
            broken_rows.append(row)

    with open("link-audit.csv", "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=all_rows[0].keys())
        writer.writeheader()
        writer.writerows(all_rows)

    with open("link-audit-broken.csv", "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=all_rows[0].keys())
        writer.writeheader()
        writer.writerows(broken_rows)

    print(f"Scanned {len(all_entries)} links across content.")
    print(f"Broken links: {len(broken_rows)}")
    print("Reports written: link-audit.csv, link-audit-broken.csv")
    return 0


if __name__ == "__main__":
    sys.exit(main())
