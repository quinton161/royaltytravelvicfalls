"""One-time import of the saved Wix pages. Requires beautifulsoup4.

Original HTML stays untouched. The Next.js app only reads content/site.json.
"""
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote
from urllib.request import urlopen, Request
from concurrent.futures import ThreadPoolExecutor
import json
import re
from bs4 import BeautifulSoup, NavigableString

ROOT = Path(__file__).resolve().parent.parent
SOURCES = sorted(ROOT.glob("*.html")) + sorted((ROOT / "post").glob("*.html"))
if not SOURCES:
    raise SystemExit("No original HTML files found. Restore the source HTML before re-importing; migrated content has not been changed.")
DOMAIN = "https://www.royaltytravelvicfalls.com/"
ASSETS = ROOT / "public" / "images"
ASSETS.mkdir(parents=True, exist_ok=True)
media = {}


def link(value, source):
    parsed = urlparse(urljoin(DOMAIN + source, value))
    if parsed.netloc in ("www.royaltytravelvicfalls.com", "royaltytravelvicfalls.com"):
        path = parsed.path.removesuffix(".html")
        if path == "/index":
            path = "/"
        return path + ("#" + parsed.fragment if parsed.fragment else "")
    return value if parsed.scheme in ("https", "http", "mailto", "tel") else ""


def image(src):
    if not src.startswith("https://static.wixstatic.com/media/"):
        return None
    original = src.split("/v1/")[0]
    name = unquote(original.rsplit("/", 1)[-1])
    media[original] = name
    return "/images/" + name


def node(el, source):
    if isinstance(el, NavigableString):
        return str(el).replace("\u200b", "")
    if el.name == "br":
        return {"tag": "br", "children": []}
    children = [node(c, source) for c in el.children]
    tag = el.name
    if tag == "span":
        style = el.get("style", "")
        tag = "strong" if "font-weight:bold" in style.replace(" ", "") else "span"
    if tag in ("h1", "h2"):
        tag = "h2"
    elif tag in ("h3", "h4", "h5", "h6"):
        tag = "h3"
    if tag not in ("p", "h2", "h3", "ul", "ol", "li", "strong", "em", "b", "i", "u", "a", "span"):
        tag = "span"
    result = {"tag": tag, "children": children}
    if tag == "a":
        result["href"] = link(el.get("href", ""), source)
    return result


pages = []
for file in SOURCES:
    source = file.relative_to(ROOT).as_posix()
    soup = BeautifulSoup(file.read_text(encoding="utf-8"), "html.parser")
    main = soup.find("main")
    if not main:
        continue
    slug = source.removesuffix(".html")
    if slug == "index":
        slug = ""
    title = soup.title.get_text(strip=True).split(" | ")[0]
    desc = soup.find("meta", attrs={"name": "description"})
    blocks = []
    for el in main.select("h1,h2,h3,h4,h5,h6,p,ul,ol"):
        if el.find_parent(["p", "ul", "ol", "h1", "h2", "h3", "h4", "h5", "h6"]):
            continue
        text = el.get_text(" ", strip=True).replace("\u200b", "").strip()
        if not text or text in (".", "All Posts", "Recent Posts", "See All"):
            continue
        blocks.append(node(el, source))
    images = []
    seen = set()
    for el in main.select("img[src]"):
        src = image(el["src"])
        if src and src not in seen:
            seen.add(src)
            images.append({"src": src, "alt": el.get("alt", "")})
    pages.append({
        "slug": slug,
        "title": title,
        "description": desc.get("content", "") if desc else "",
        "blocks": blocks,
        "images": images,
    })

logo = image("https://static.wixstatic.com/media/090a0b_f7ded51f07984432bb04339caed46df1~mv2.jpg")


def download(item):
    url, name = item
    path = ASSETS / name
    if not path.exists():
        with urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=40) as response:
            path.write_bytes(response.read())
    return name


with ThreadPoolExecutor(max_workers=6) as pool:
    downloaded = list(pool.map(download, media.items()))

(ROOT / "src" / "content").mkdir(parents=True, exist_ok=True)
(ROOT / "src" / "content" / "site.json").write_text(
    json.dumps({"logo": logo, "pages": pages}, ensure_ascii=False, indent=2), encoding="utf-8"
)
print(f"Imported {len(pages)} pages and {len(downloaded)} local images.")
