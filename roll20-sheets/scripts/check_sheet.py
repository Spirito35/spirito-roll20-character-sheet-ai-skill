#!/usr/bin/env python3
"""Read-only, dependency-free static checks for Roll20 HTML/CSS sheets (Python 3.10+)."""

import argparse
import json
import re
import sys
from collections import Counter
from html import unescape
from html.parser import HTMLParser
from pathlib import Path


class Report:
    def __init__(self):
        self.findings = []
        self.files = []

    def add(self, level, code, path, message, line=None):
        item = dict(level=level, code=code, path=str(path), message=message)
        if line is not None:
            item["line"] = line
        self.findings.append(item)

    def read(self, path):
        path = Path(path).resolve()
        try:
            content = path.read_text(encoding="utf-8-sig")
        except (OSError, UnicodeError) as exc:
            self.add("error", "read", path, str(exc))
            return None
        if str(path) not in self.files:
            self.files.append(str(path))
        return content


def unique_keys(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError("Duplicate JSON key: " + key)
        result[key] = value
    return result


def reject_constant(value):
    raise ValueError("Not a strict JSON value: " + value)


def read_json(report, path):
    content = report.read(path)
    if content is None:
        return None
    try:
        value = json.loads(content, object_pairs_hook=unique_keys, parse_constant=reject_constant)
        if not isinstance(value, dict):
            raise ValueError("Expected a JSON object")
        return value
    except ValueError as exc:
        report.add("error", "json", path, str(exc))
        return None


def declared_file(report, manifest_path, key, value, required):
    if not isinstance(value, str) or not value.strip():
        report.add("error" if required else "warning", "manifest-file", manifest_path,
                   "Missing or invalid file name: " + key)
        return None
    target = Path(manifest_path).resolve().parent / value
    if not target.is_file():
        report.add("error", "missing-file", target, "Declared by sheet.json: " + key)
        return target
    # Check exact case even on case-insensitive filesystems.
    cursor = Path(target.anchor)
    for part in target.parts[1:]:
        if part in (".", ".."):
            cursor = cursor / part
            continue
        try:
            if part not in {entry.name for entry in cursor.iterdir()}:
                report.add("warning", "filename-case", target,
                           "File name case differs from the filesystem; check publication paths")
                break
        except OSError:
            break
        cursor = cursor / part
    return target


class SheetParser(HTMLParser):
    def __init__(self, report, path, translation):
        super().__init__(convert_charrefs=True)
        self.report, self.path, self.translation = report, path, translation
        self.workers = 0
        self.scripts = 0
        self.ids = set()
        self.templates = Counter()
        self.fieldsets = []
        self.missing_keys = set()

    def issue(self, level, code, message):
        self.report.add(level, code, self.path, message, self.getpos()[0])

    def handle_decl(self, decl):
        if decl.lower().startswith("doctype"):
            self.issue("error", "document-wrapper", "Deliver an HTML fragment, without DOCTYPE")

    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        classes = (attr.get("class") or "").split()
        if tag in ("html", "head", "body", "form"):
            self.issue("error", "document-wrapper", "Unexpected enclosing element: " + tag)
        if tag == "fieldset":
            sections = [c for c in classes if c.startswith("repeating_")]
            self.fieldsets.append(bool(sections))
            for section in sections:
                if "_" in section[len("repeating_") :]:
                    self.issue("warning", "repeating-name", "Review historical section name: " + section)
        if tag == "script":
            self.scripts += 1
            if (attr.get("type") or "").lower() == "text/worker":
                self.workers += 1
            else:
                self.issue("error", "script-type", "Sheet JavaScript must be in text/worker")
            if "src" in attr:
                self.issue("error", "script-src", "An external script is not a delivered Sheet Worker")
        if any(name.lower().startswith("on") for name, _ in attrs):
            self.issue("warning", "inline-handler", "Review inline event handler; use a Sheet Worker binding")
        identity = attr.get("id")
        if identity:
            if identity in self.ids:
                self.issue("warning", "duplicate-id", "Repeated HTML id: " + identity)
            self.ids.add(identity)
            if any(self.fieldsets):
                self.issue("warning", "repeating-id", "Static id in a repeating row: " + identity)
        name = attr.get("name") or ""
        if tag in ("input", "select", "textarea") and not name.startswith("attr_"):
            self.issue("warning", "unbound-control", "Control without attr_ binding; confirm it is transient")
        if tag == "button" and attr.get("type") in ("roll", "action"):
            prefix = "roll_" if attr["type"] == "roll" else "act_"
            if not name.startswith(prefix):
                self.issue("warning", "button-name", "Expected named button prefix: " + prefix)
        if tag == "rolltemplate":
            names = [c[len("sheet-rolltemplate-") :] for c in classes if c.startswith("sheet-rolltemplate-")]
            if not names:
                self.issue("error", "template-name", "Missing sheet-rolltemplate-NAME class")
            self.templates.update(names)
        for key, value in attrs:
            if key in ("data-i18n", "data-i18n-title", "data-i18n-placeholder", "data-i18n-alt", "data-i18n-aria-label"):
                if self.translation is not None and value and value not in self.translation:
                    if value not in self.missing_keys:
                        self.issue("warning", "i18n-key", "Static translation key absent: " + value)
                        self.missing_keys.add(value)

    def handle_endtag(self, tag):
        if tag == "fieldset" and self.fieldsets:
            self.fieldsets.pop()
        if tag == "script":
            self.scripts -= 1

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)


def check_html(report, path, translation):
    content = report.read(path)
    if content is None:
        return
    parser = SheetParser(report, path, translation)
    parser.feed(content)
    parser.close()
    if parser.workers > 1:
        report.add("error", "worker-count", path, "Multiple worker blocks: " + str(parser.workers))
    if parser.scripts:
        report.add("error", "script-close", path, "Unbalanced script tags")
    for name, count in parser.templates.items():
        if count > 1:
            report.add("error", "duplicate-template", path, "Template defined more than once: " + name)
    # Literal references only. Dynamic construction and template rendering require runtime tests.
    for name in sorted(set(re.findall(r"&\{template:([a-zA-Z0-9_-]+)\}", unescape(content)))):
        if name != "default" and name not in parser.templates:
            report.add("warning", "template-reference", path, "Literal template reference has no local definition: " + name)


def check_css(report, path, ascii_only, no_comments):
    content = report.read(path)
    if content is None:
        return
    for number, line in enumerate(content.splitlines(), 1):
        if ascii_only and re.search(r"[^\x09\x20-\x7e]", line):
            report.add("warning", "css-ascii", path, "Non-ASCII/control character under optional project policy", number)
        if no_comments and ("/*" in line or "*/" in line):
            report.add("warning", "css-comment", path, "Comment delimiter candidate; inspect strings/URLs before changing", number)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--html", type=Path)
    parser.add_argument("--css", type=Path)
    parser.add_argument("--sheet-json", type=Path)
    parser.add_argument("--translation", type=Path)
    parser.add_argument("--css-ascii", action="store_true", help="Optional project policy, warning only")
    parser.add_argument("--css-no-comments", action="store_true", help="Optional textual check, warning only")
    parser.add_argument("--json", action="store_true", dest="json_output")
    args = parser.parse_args(argv)
    if not any((args.html, args.css, args.sheet_json, args.translation)):
        parser.error("Pass at least one file explicitly")
    report = Report()
    if args.sheet_json:
        manifest = read_json(report, args.sheet_json)
        if manifest is not None:
            if "legacy" in manifest and not isinstance(manifest["legacy"], bool):
                report.add("error", "legacy-type", args.sheet_json, "legacy must be a JSON boolean")
            for key in ("html", "css", "preview"):
                target = declared_file(report, args.sheet_json, key, manifest.get(key), key != "preview")
                if key in ("html", "css") and target is not None:
                    explicit = getattr(args, key)
                    if explicit is not None and explicit.resolve() != target.resolve():
                        report.add("warning", "file-override", explicit, "Explicit file differs from sheet.json: " + key)
                    if explicit is None:
                        setattr(args, key, target)
    translation = read_json(report, args.translation) if args.translation else None
    if translation is not None:
        for key, value in translation.items():
            if not isinstance(value, str):
                report.add("warning", "translation-value", args.translation, "Expected string for key: " + key)
    if args.html:
        check_html(report, args.html, translation)
    if args.css:
        check_css(report, args.css, args.css_ascii, args.css_no_comments)
    counts = Counter(item["level"] for item in report.findings)
    result = dict(files=report.files, errors=counts["error"], warnings=counts["warning"],
                  findings=report.findings, runtime_tested=False)
    if args.json_output:
        print(json.dumps(result, ensure_ascii=True, indent=2))
    else:
        for item in report.findings:
            location = item["path"] + (":" + str(item["line"]) if "line" in item else "")
            print(f'{item["level"].upper()} [{item["code"]}] {location}: {item["message"]}')
        print(f'{counts["error"]} error(s), {counts["warning"]} warning(s). Roll20 runtime not tested.')
    return 1 if counts["error"] else 0


if __name__ == "__main__":
    sys.exit(main())
