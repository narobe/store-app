var go = "2.1.10",
    wt = "[data-trix-attachment]",
    gi = {
        preview: { presentation: "gallery", caption: { name: !0, size: !0 } },
        file: { caption: { size: !0 } },
    },
    W = {
        default: { tagName: "div", parse: !1 },
        quote: { tagName: "blockquote", nestable: !0 },
        heading1: { tagName: "h1", terminal: !0, breakOnReturn: !0, group: !1 },
        code: {
            tagName: "pre",
            terminal: !0,
            htmlAttributes: ["language"],
            text: { plaintext: !0 },
        },
        bulletList: { tagName: "ul", parse: !1 },
        bullet: {
            tagName: "li",
            listAttribute: "bulletList",
            group: !1,
            nestable: !0,
            test(i) {
                return Ki(i.parentNode) === W[this.listAttribute].tagName;
            },
        },
        numberList: { tagName: "ol", parse: !1 },
        number: {
            tagName: "li",
            listAttribute: "numberList",
            group: !1,
            nestable: !0,
            test(i) {
                return Ki(i.parentNode) === W[this.listAttribute].tagName;
            },
        },
        attachmentGallery: {
            tagName: "div",
            exclusive: !0,
            terminal: !0,
            parse: !1,
            group: !1,
        },
    },
    Ki = (i) => {
        var t;
        return i == null || (t = i.tagName) === null || t === void 0
            ? void 0
            : t.toLowerCase();
    },
    Gi = navigator.userAgent.match(/android\s([0-9]+.*Chrome)/i),
    En = Gi && parseInt(Gi[1]),
    xe = {
        composesExistingText: /Android.*Chrome/.test(navigator.userAgent),
        recentAndroid: En && En > 12,
        samsungAndroid: En && navigator.userAgent.match(/Android.*SM-/),
        forcesObjectResizing: /Trident.*rv:11/.test(navigator.userAgent),
        supportsInputEvents:
            typeof InputEvent < "u" &&
            ["data", "getTargetRanges", "inputType"].every(
                (i) => i in InputEvent.prototype
            ),
    },
    m = {
        attachFiles: "Attach Files",
        bold: "Bold",
        bullets: "Bullets",
        byte: "Byte",
        bytes: "Bytes",
        captionPlaceholder: "Add a caption\u2026",
        code: "Code",
        heading1: "Heading",
        indent: "Increase Level",
        italic: "Italic",
        link: "Link",
        numbers: "Numbers",
        outdent: "Decrease Level",
        quote: "Quote",
        redo: "Redo",
        remove: "Remove",
        strike: "Strikethrough",
        undo: "Undo",
        unlink: "Unlink",
        url: "URL",
        urlPlaceholder: "Enter a URL\u2026",
        GB: "GB",
        KB: "KB",
        MB: "MB",
        PB: "PB",
        TB: "TB",
    },
    mo = [m.bytes, m.KB, m.MB, m.GB, m.TB, m.PB],
    wr = {
        prefix: "IEC",
        precision: 2,
        formatter(i) {
            switch (i) {
                case 0:
                    return "0 ".concat(m.bytes);
                case 1:
                    return "1 ".concat(m.byte);
                default:
                    let t;
                    this.prefix === "SI"
                        ? (t = 1e3)
                        : this.prefix === "IEC" && (t = 1024);
                    let e = Math.floor(Math.log(i) / Math.log(t)),
                        n = (i / Math.pow(t, e))
                            .toFixed(this.precision)
                            .replace(/0*$/, "")
                            .replace(/\.$/, "");
                    return "".concat(n, " ").concat(mo[e]);
            }
        },
    },
    an = "\uFEFF",
    bt = "\xA0",
    Lr = function (i) {
        for (let t in i) {
            let e = i[t];
            this[t] = e;
        }
        return this;
    },
    mi = document.documentElement,
    po = mi.matches,
    S = function (i) {
        let {
                onElement: t,
                matchingSelector: e,
                withCallback: n,
                inPhase: r,
                preventDefault: o,
                times: s,
            } = arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            l = t || mi,
            c = e,
            u = r === "capturing",
            d = function (C) {
                s != null && --s == 0 && d.destroy();
                let T = vt(C.target, { matchingSelector: c });
                T != null && (n?.call(T, C, T), o && C.preventDefault());
            };
        return (
            (d.destroy = () => l.removeEventListener(i, d, u)),
            l.addEventListener(i, d, u),
            d
        );
    },
    he = function (i) {
        let {
                onElement: t,
                bubbles: e,
                cancelable: n,
                attributes: r,
            } = arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            o = t ?? mi;
        (e = e !== !1), (n = n !== !1);
        let s = document.createEvent("Events");
        return (
            s.initEvent(i, e, n), r != null && Lr.call(s, r), o.dispatchEvent(s)
        );
    },
    Dr = function (i, t) {
        if (i?.nodeType === 1) return po.call(i, t);
    },
    vt = function (i) {
        let { matchingSelector: t, untilNode: e } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        for (; i && i.nodeType !== Node.ELEMENT_NODE; ) i = i.parentNode;
        if (i != null) {
            if (t == null) return i;
            if (i.closest && e == null) return i.closest(t);
            for (; i && i !== e; ) {
                if (Dr(i, t)) return i;
                i = i.parentNode;
            }
        }
    },
    pi = (i) => document.activeElement !== i && Tt(i, document.activeElement),
    Tt = function (i, t) {
        if (i && t)
            for (; t; ) {
                if (t === i) return !0;
                t = t.parentNode;
            }
    },
    Sn = function (i) {
        var t;
        if ((t = i) === null || t === void 0 || !t.parentNode) return;
        let e = 0;
        for (i = i.previousSibling; i; ) e++, (i = i.previousSibling);
        return e;
    },
    At = (i) => {
        var t;
        return i == null || (t = i.parentNode) === null || t === void 0
            ? void 0
            : t.removeChild(i);
    },
    je = function (i) {
        let {
                onlyNodesOfType: t,
                usingFilter: e,
                expandEntityReferences: n,
            } = arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            r = (() => {
                switch (t) {
                    case "element":
                        return NodeFilter.SHOW_ELEMENT;
                    case "text":
                        return NodeFilter.SHOW_TEXT;
                    case "comment":
                        return NodeFilter.SHOW_COMMENT;
                    default:
                        return NodeFilter.SHOW_ALL;
                }
            })();
        return document.createTreeWalker(i, r, e ?? null, n === !0);
    },
    j = (i) => {
        var t;
        return i == null || (t = i.tagName) === null || t === void 0
            ? void 0
            : t.toLowerCase();
    },
    p = function (i) {
        let t,
            e,
            n =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {};
        typeof i == "object"
            ? ((n = i), (i = n.tagName))
            : (n = { attributes: n });
        let r = document.createElement(i);
        if (
            (n.editable != null &&
                (n.attributes == null && (n.attributes = {}),
                (n.attributes.contenteditable = n.editable)),
            n.attributes)
        )
            for (t in n.attributes) (e = n.attributes[t]), r.setAttribute(t, e);
        if (n.style) for (t in n.style) (e = n.style[t]), (r.style[t] = e);
        if (n.data) for (t in n.data) (e = n.data[t]), (r.dataset[t] = e);
        return (
            n.className &&
                n.className.split(" ").forEach((o) => {
                    r.classList.add(o);
                }),
            n.textContent && (r.textContent = n.textContent),
            n.childNodes &&
                [].concat(n.childNodes).forEach((o) => {
                    r.appendChild(o);
                }),
            r
        );
    },
    ie,
    de = function () {
        if (ie != null) return ie;
        ie = [];
        for (let i in W) {
            let t = W[i];
            t.tagName && ie.push(t.tagName);
        }
        return ie;
    },
    kn = (i) => Ht(i?.firstChild),
    Yi = function (i) {
        let { strict: t } =
            arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : { strict: !0 };
        return t
            ? Ht(i)
            : Ht(i) ||
                  (!Ht(i.firstChild) &&
                      (function (e) {
                          return (
                              de().includes(j(e)) &&
                              !de().includes(j(e.firstChild))
                          );
                      })(i));
    },
    Ht = (i) => fo(i) && i?.data === "block",
    fo = (i) => i?.nodeType === Node.COMMENT_NODE,
    qt = function (i) {
        let { name: t } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if (i)
            return ge(i)
                ? i.data === an
                    ? !t || i.parentNode.dataset.trixCursorTarget === t
                    : void 0
                : qt(i.firstChild);
    },
    Lt = (i) => Dr(i, wt),
    Nr = (i) => ge(i) && i?.data === "",
    ge = (i) => i?.nodeType === Node.TEXT_NODE,
    fi = {
        level2Enabled: !0,
        getLevel() {
            return this.level2Enabled && xe.supportsInputEvents ? 2 : 0;
        },
        pickFiles(i) {
            let t = p("input", {
                type: "file",
                multiple: !0,
                hidden: !0,
                id: this.fileInputId,
            });
            t.addEventListener("change", () => {
                i(t.files), At(t);
            }),
                At(document.getElementById(this.fileInputId)),
                document.body.appendChild(t),
                t.click();
        },
    },
    Me = {
        removeBlankTableCells: !1,
        tableCellSeparator: " | ",
        tableRowSeparator: `
`,
    },
    It = {
        bold: {
            tagName: "strong",
            inheritable: !0,
            parser(i) {
                let t = window.getComputedStyle(i);
                return t.fontWeight === "bold" || t.fontWeight >= 600;
            },
        },
        italic: {
            tagName: "em",
            inheritable: !0,
            parser: (i) => window.getComputedStyle(i).fontStyle === "italic",
        },
        href: {
            groupTagName: "a",
            parser(i) {
                let t = "a:not(".concat(wt, ")"),
                    e = i.closest(t);
                if (e) return e.getAttribute("href");
            },
        },
        strike: { tagName: "del", inheritable: !0 },
        frozen: { style: { backgroundColor: "highlight" } },
    },
    Ir = {
        getDefaultHTML: () =>
            `<div class="trix-button-row">
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" data-trix-key="b" title="`
                .concat(m.bold, '" tabindex="-1">')
                .concat(
                    m.bold,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" data-trix-key="i" title="`
                )
                .concat(m.italic, '" tabindex="-1">')
                .concat(
                    m.italic,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="`
                )
                .concat(m.strike, '" tabindex="-1">')
                .concat(
                    m.strike,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="`
                )
                .concat(m.link, '" tabindex="-1">')
                .concat(
                    m.link,
                    `</button>
      </span>

      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" data-trix-attribute="heading1" title="`
                )
                .concat(m.heading1, '" tabindex="-1">')
                .concat(
                    m.heading1,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" title="`
                )
                .concat(m.quote, '" tabindex="-1">')
                .concat(
                    m.quote,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" title="`
                )
                .concat(m.code, '" tabindex="-1">')
                .concat(
                    m.code,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" title="`
                )
                .concat(m.bullets, '" tabindex="-1">')
                .concat(
                    m.bullets,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" title="`
                )
                .concat(m.numbers, '" tabindex="-1">')
                .concat(
                    m.numbers,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" title="`
                )
                .concat(m.outdent, '" tabindex="-1">')
                .concat(
                    m.outdent,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" title="`
                )
                .concat(m.indent, '" tabindex="-1">')
                .concat(
                    m.indent,
                    `</button>
      </span>

      <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles" title="`
                )
                .concat(m.attachFiles, '" tabindex="-1">')
                .concat(
                    m.attachFiles,
                    `</button>
      </span>

      <span class="trix-button-group-spacer"></span>

      <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" title="`
                )
                .concat(m.undo, '" tabindex="-1">')
                .concat(
                    m.undo,
                    `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" title="`
                )
                .concat(m.redo, '" tabindex="-1">')
                .concat(
                    m.redo,
                    `</button>
      </span>
    </div>

    <div class="trix-dialogs" data-trix-dialogs>
      <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">
        <div class="trix-dialog__link-fields">
          <input class="mb-4" type="url" name="href" class="trix-input trix-input--dialog" placeholder="`
                )
                .concat(m.urlPlaceholder, '" aria-label="')
                .concat(
                    m.url,
                    `" required data-trix-input>
          <div class="trix-button-group">
            <input class="mb-4" type="button" class="trix-button trix-button--dialog" value="`
                )
                .concat(
                    m.link,
                    `" data-trix-method="setAttribute">
            <input class="mb-4" type="button" class="trix-button trix-button--dialog" value="`
                )
                .concat(
                    m.unlink,
                    `" data-trix-method="removeAttribute">
          </div>
        </div>
      </div>
    </div>`
                ),
    },
    Yn = { interval: 5e3 },
    Ce = Object.freeze({
        __proto__: null,
        attachments: gi,
        blockAttributes: W,
        browser: xe,
        css: {
            attachment: "attachment",
            attachmentCaption: "attachment__caption",
            attachmentCaptionEditor: "attachment__caption-editor",
            attachmentMetadata: "attachment__metadata",
            attachmentMetadataContainer: "attachment__metadata-container",
            attachmentName: "attachment__name",
            attachmentProgress: "attachment__progress",
            attachmentSize: "attachment__size",
            attachmentToolbar: "attachment__toolbar",
            attachmentGallery: "attachment-gallery",
        },
        fileSize: wr,
        input: fi,
        keyNames: {
            8: "backspace",
            9: "tab",
            13: "return",
            27: "escape",
            37: "left",
            39: "right",
            46: "delete",
            68: "d",
            72: "h",
            79: "o",
        },
        lang: m,
        parser: Me,
        textAttributes: It,
        toolbar: Ir,
        undo: Yn,
    }),
    R = class {
        static proxyMethod(t) {
            let { name: e, toMethod: n, toProperty: r, optional: o } = bo(t);
            this.prototype[e] = function () {
                let s, l;
                var c, u;
                return (
                    n
                        ? (l = o
                              ? (c = this[n]) === null || c === void 0
                                  ? void 0
                                  : c.call(this)
                              : this[n]())
                        : r && (l = this[r]),
                    o
                        ? ((s =
                              (u = l) === null || u === void 0 ? void 0 : u[e]),
                          s ? $i.call(s, l, arguments) : void 0)
                        : ((s = l[e]), $i.call(s, l, arguments))
                );
            };
        }
    },
    bo = function (i) {
        let t = i.match(vo);
        if (!t)
            throw new Error("can't parse @proxyMethod expression: ".concat(i));
        let e = { name: t[4] };
        return (
            t[2] != null ? (e.toMethod = t[1]) : (e.toProperty = t[1]),
            t[3] != null && (e.optional = !0),
            e
        );
    },
    { apply: $i } = Function.prototype,
    vo = new RegExp("^(.+?)(\\(\\))?(\\?)?\\.(.+?)$"),
    Rn,
    Tn,
    wn,
    Ot = class extends R {
        static box() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : "";
            return t instanceof this ? t : this.fromUCS2String(t?.toString());
        }
        static fromUCS2String(t) {
            return new this(t, $n(t));
        }
        static fromCodepoints(t) {
            return new this(Xn(t), t);
        }
        constructor(t, e) {
            super(...arguments),
                (this.ucs2String = t),
                (this.codepoints = e),
                (this.length = this.codepoints.length),
                (this.ucs2Length = this.ucs2String.length);
        }
        offsetToUCS2Offset(t) {
            return Xn(this.codepoints.slice(0, Math.max(0, t))).length;
        }
        offsetFromUCS2Offset(t) {
            return $n(this.ucs2String.slice(0, Math.max(0, t))).length;
        }
        slice() {
            return this.constructor.fromCodepoints(
                this.codepoints.slice(...arguments)
            );
        }
        charAt(t) {
            return this.slice(t, t + 1);
        }
        isEqualTo(t) {
            return this.constructor.box(t).ucs2String === this.ucs2String;
        }
        toJSON() {
            return this.ucs2String;
        }
        getCacheKey() {
            return this.ucs2String;
        }
        toString() {
            return this.ucs2String;
        }
    },
    Ao =
        ((Rn = Array.from) === null || Rn === void 0
            ? void 0
            : Rn.call(Array, "\u{1F47C}").length) === 1,
    yo =
        ((Tn = " ".codePointAt) === null || Tn === void 0
            ? void 0
            : Tn.call(" ", 0)) != null,
    xo =
        ((wn = String.fromCodePoint) === null || wn === void 0
            ? void 0
            : wn.call(String, 32, 128124)) === " \u{1F47C}",
    $n,
    Xn;
($n =
    Ao && yo
        ? (i) => Array.from(i).map((t) => t.codePointAt(0))
        : function (i) {
              let t = [],
                  e = 0,
                  { length: n } = i;
              for (; e < n; ) {
                  let r = i.charCodeAt(e++);
                  if (55296 <= r && r <= 56319 && e < n) {
                      let o = i.charCodeAt(e++);
                      (64512 & o) == 56320
                          ? (r = ((1023 & r) << 10) + (1023 & o) + 65536)
                          : e--;
                  }
                  t.push(r);
              }
              return t;
          }),
    (Xn = xo
        ? (i) => String.fromCodePoint(...Array.from(i || []))
        : function (i) {
              return (() => {
                  let t = [];
                  return (
                      Array.from(i).forEach((e) => {
                          let n = "";
                          e > 65535 &&
                              ((e -= 65536),
                              (n += String.fromCharCode(
                                  ((e >>> 10) & 1023) | 55296
                              )),
                              (e = 56320 | (1023 & e))),
                              t.push(n + String.fromCharCode(e));
                      }),
                      t
                  );
              })().join("");
          });
var Co = 0,
    dt = class extends R {
        static fromJSONString(t) {
            return this.fromJSON(JSON.parse(t));
        }
        constructor() {
            super(...arguments), (this.id = ++Co);
        }
        hasSameConstructorAs(t) {
            return this.constructor === t?.constructor;
        }
        isEqualTo(t) {
            return this === t;
        }
        inspect() {
            let t = [],
                e = this.contentsForInspection() || {};
            for (let n in e) {
                let r = e[n];
                t.push("".concat(n, "=").concat(r));
            }
            return "#<"
                .concat(this.constructor.name, ":")
                .concat(this.id)
                .concat(t.length ? " ".concat(t.join(", ")) : "", ">");
        }
        contentsForInspection() {}
        toJSONString() {
            return JSON.stringify(this);
        }
        toUTF16String() {
            return Ot.box(this);
        }
        getCacheKey() {
            return this.id.toString();
        }
    },
    Ft = function () {
        let i =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : [],
            t =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : [];
        if (i.length !== t.length) return !1;
        for (let e = 0; e < i.length; e++) if (i[e] !== t[e]) return !1;
        return !0;
    },
    bi = function (i) {
        let t = i.slice(0);
        for (
            var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
            r < e;
            r++
        )
            n[r - 1] = arguments[r];
        return t.splice(...n), t;
    },
    Eo =
        /[\u05BE\u05C0\u05C3\u05D0-\u05EA\u05F0-\u05F4\u061B\u061F\u0621-\u063A\u0640-\u064A\u066D\u0671-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D5\u06E5\u06E6\u200F\u202B\u202E\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE72\uFE74\uFE76-\uFEFC]/,
    So = (function () {
        let i = p("input", { dir: "auto", name: "x", dirName: "x.dir" }),
            t = p("textarea", { dir: "auto", name: "y", dirName: "y.dir" }),
            e = p("form");
        e.appendChild(i), e.appendChild(t);
        let n = (function () {
                try {
                    return new FormData(e).has(t.dirName);
                } catch {
                    return !1;
                }
            })(),
            r = (function () {
                try {
                    return i.matches(":dir(ltr),:dir(rtl)");
                } catch {
                    return !1;
                }
            })();
        return n
            ? function (o) {
                  return (t.value = o), new FormData(e).get(t.dirName);
              }
            : r
            ? function (o) {
                  return (i.value = o), i.matches(":dir(rtl)") ? "rtl" : "ltr";
              }
            : function (o) {
                  let s = o.trim().charAt(0);
                  return Eo.test(s) ? "rtl" : "ltr";
              };
    })(),
    Ln = null,
    Dn = null,
    Nn = null,
    De = null,
    Qn = () => (Ln || (Ln = Ro().concat(ko())), Ln),
    L = (i) => W[i],
    ko = () => (Dn || (Dn = Object.keys(W)), Dn),
    Zn = (i) => It[i],
    Ro = () => (Nn || (Nn = Object.keys(It)), Nn),
    Or = function (i, t) {
        To(i).textContent = t.replace(/%t/g, i);
    },
    To = function (i) {
        let t = document.createElement("style");
        t.setAttribute("type", "text/css"),
            t.setAttribute("data-tag-name", i.toLowerCase());
        let e = wo();
        return (
            e && t.setAttribute("nonce", e),
            document.head.insertBefore(t, document.head.firstChild),
            t
        );
    },
    wo = function () {
        let i = Xi("trix-csp-nonce") || Xi("csp-nonce");
        if (i) {
            let { nonce: t, content: e } = i;
            return t == "" ? e : t;
        }
    },
    Xi = (i) => document.head.querySelector("meta[name=".concat(i, "]")),
    Qi = { "application/x-trix-feature-detection": "test" },
    Fr = function (i) {
        let t = i.getData("text/plain"),
            e = i.getData("text/html");
        if (!t || !e) return t?.length;
        {
            let { body: n } = new DOMParser().parseFromString(e, "text/html");
            if (n.textContent === t) return !n.querySelector("*");
        }
    },
    Pr = /Mac|^iP/.test(navigator.platform)
        ? (i) => i.metaKey
        : (i) => i.ctrlKey,
    vi = (i) => setTimeout(i, 1),
    Mr = function () {
        let i =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {},
            t = {};
        for (let e in i) {
            let n = i[e];
            t[e] = n;
        }
        return t;
    },
    Xt = function () {
        let i =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {},
            t =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {};
        if (Object.keys(i).length !== Object.keys(t).length) return !1;
        for (let e in i) if (i[e] !== t[e]) return !1;
        return !0;
    },
    y = function (i) {
        if (i != null)
            return (
                Array.isArray(i) || (i = [i, i]),
                [Zi(i[0]), Zi(i[1] != null ? i[1] : i[0])]
            );
    },
    ht = function (i) {
        if (i == null) return;
        let [t, e] = y(i);
        return ti(t, e);
    },
    We = function (i, t) {
        if (i == null || t == null) return;
        let [e, n] = y(i),
            [r, o] = y(t);
        return ti(e, r) && ti(n, o);
    },
    Zi = function (i) {
        return typeof i == "number" ? i : Mr(i);
    },
    ti = function (i, t) {
        return typeof i == "number" ? i === t : Xt(i, t);
    },
    Ue = class extends R {
        constructor() {
            super(...arguments),
                (this.update = this.update.bind(this)),
                (this.selectionManagers = []);
        }
        start() {
            this.started ||
                ((this.started = !0),
                document.addEventListener("selectionchange", this.update, !0));
        }
        stop() {
            if (this.started)
                return (
                    (this.started = !1),
                    document.removeEventListener(
                        "selectionchange",
                        this.update,
                        !0
                    )
                );
        }
        registerSelectionManager(t) {
            if (!this.selectionManagers.includes(t))
                return this.selectionManagers.push(t), this.start();
        }
        unregisterSelectionManager(t) {
            if (
                ((this.selectionManagers = this.selectionManagers.filter(
                    (e) => e !== t
                )),
                this.selectionManagers.length === 0)
            )
                return this.stop();
        }
        notifySelectionManagersOfSelectionChange() {
            return this.selectionManagers.map((t) => t.selectionDidChange());
        }
        update() {
            this.notifySelectionManagersOfSelectionChange();
        }
        reset() {
            this.update();
        }
    },
    Pt = new Ue(),
    Br = function () {
        let i = window.getSelection();
        if (i.rangeCount > 0) return i;
    },
    me = function () {
        var i;
        let t = (i = Br()) === null || i === void 0 ? void 0 : i.getRangeAt(0);
        if (t && !Lo(t)) return t;
    },
    _r = function (i) {
        let t = window.getSelection();
        return t.removeAllRanges(), t.addRange(i), Pt.update();
    },
    Lo = (i) => tr(i.startContainer) || tr(i.endContainer),
    tr = (i) => !Object.getPrototypeOf(i),
    ue = (i) =>
        i
            .replace(new RegExp("".concat(an), "g"), "")
            .replace(new RegExp("".concat(bt), "g"), " "),
    Ai = new RegExp("[^\\S".concat(bt, "]")),
    yi = (i) =>
        i
            .replace(new RegExp("".concat(Ai.source), "g"), " ")
            .replace(/\ {2,}/g, " "),
    er = function (i, t) {
        if (i.isEqualTo(t)) return ["", ""];
        let e = In(i, t),
            { length: n } = e.utf16String,
            r;
        if (n) {
            let { offset: o } = e,
                s = i.codepoints.slice(0, o).concat(i.codepoints.slice(o + n));
            r = In(t, Ot.fromCodepoints(s));
        } else r = In(t, i);
        return [e.utf16String.toString(), r.utf16String.toString()];
    },
    In = function (i, t) {
        let e = 0,
            n = i.length,
            r = t.length;
        for (; e < n && i.charAt(e).isEqualTo(t.charAt(e)); ) e++;
        for (; n > e + 1 && i.charAt(n - 1).isEqualTo(t.charAt(r - 1)); )
            n--, r--;
        return { utf16String: i.slice(e, n), offset: e };
    },
    U = class extends dt {
        static fromCommonAttributesOfObjects() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : [];
            if (!t.length) return new this();
            let e = re(t[0]),
                n = e.getKeys();
            return (
                t.slice(1).forEach((r) => {
                    (n = e.getKeysCommonToHash(re(r))), (e = e.slice(n));
                }),
                e
            );
        }
        static box(t) {
            return re(t);
        }
        constructor() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
            super(...arguments), (this.values = Be(t));
        }
        add(t, e) {
            return this.merge(Do(t, e));
        }
        remove(t) {
            return new U(Be(this.values, t));
        }
        get(t) {
            return this.values[t];
        }
        has(t) {
            return t in this.values;
        }
        merge(t) {
            return new U(No(this.values, Io(t)));
        }
        slice(t) {
            let e = {};
            return (
                Array.from(t).forEach((n) => {
                    this.has(n) && (e[n] = this.values[n]);
                }),
                new U(e)
            );
        }
        getKeys() {
            return Object.keys(this.values);
        }
        getKeysCommonToHash(t) {
            return (
                (t = re(t)),
                this.getKeys().filter((e) => this.values[e] === t.values[e])
            );
        }
        isEqualTo(t) {
            return Ft(this.toArray(), re(t).toArray());
        }
        isEmpty() {
            return this.getKeys().length === 0;
        }
        toArray() {
            if (!this.array) {
                let t = [];
                for (let e in this.values) {
                    let n = this.values[e];
                    t.push(t.push(e, n));
                }
                this.array = t.slice(0);
            }
            return this.array;
        }
        toObject() {
            return Be(this.values);
        }
        toJSON() {
            return this.toObject();
        }
        contentsForInspection() {
            return { values: JSON.stringify(this.values) };
        }
    },
    Do = function (i, t) {
        let e = {};
        return (e[i] = t), e;
    },
    No = function (i, t) {
        let e = Be(i);
        for (let n in t) {
            let r = t[n];
            e[n] = r;
        }
        return e;
    },
    Be = function (i, t) {
        let e = {};
        return (
            Object.keys(i)
                .sort()
                .forEach((n) => {
                    n !== t && (e[n] = i[n]);
                }),
            e
        );
    },
    re = function (i) {
        return i instanceof U ? i : new U(i);
    },
    Io = function (i) {
        return i instanceof U ? i.values : i;
    },
    fe = class {
        static groupObjects() {
            let t,
                e =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : [],
                { depth: n, asTree: r } =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : {};
            r && n == null && (n = 0);
            let o = [];
            return (
                Array.from(e).forEach((s) => {
                    var l;
                    if (t) {
                        var c, u, d;
                        if (
                            (c = s.canBeGrouped) !== null &&
                            c !== void 0 &&
                            c.call(s, n) &&
                            (u = (d = t[t.length - 1]).canBeGroupedWith) !==
                                null &&
                            u !== void 0 &&
                            u.call(d, s, n)
                        )
                            return void t.push(s);
                        o.push(new this(t, { depth: n, asTree: r })),
                            (t = null);
                    }
                    (l = s.canBeGrouped) !== null &&
                    l !== void 0 &&
                    l.call(s, n)
                        ? (t = [s])
                        : o.push(s);
                }),
                t && o.push(new this(t, { depth: n, asTree: r })),
                o
            );
        }
        constructor() {
            let t =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : [],
                { depth: e, asTree: n } =
                    arguments.length > 1 ? arguments[1] : void 0;
            (this.objects = t),
                n &&
                    ((this.depth = e),
                    (this.objects = this.constructor.groupObjects(
                        this.objects,
                        { asTree: n, depth: this.depth + 1 }
                    )));
        }
        getObjects() {
            return this.objects;
        }
        getDepth() {
            return this.depth;
        }
        getCacheKey() {
            let t = ["objectGroup"];
            return (
                Array.from(this.getObjects()).forEach((e) => {
                    t.push(e.getCacheKey());
                }),
                t.join("/")
            );
        }
    },
    ei = class extends R {
        constructor() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : [];
            super(...arguments),
                (this.objects = {}),
                Array.from(t).forEach((e) => {
                    let n = JSON.stringify(e);
                    this.objects[n] == null && (this.objects[n] = e);
                });
        }
        find(t) {
            let e = JSON.stringify(t);
            return this.objects[e];
        }
    },
    ni = class {
        constructor(t) {
            this.reset(t);
        }
        add(t) {
            let e = nr(t);
            this.elements[e] = t;
        }
        remove(t) {
            let e = nr(t),
                n = this.elements[e];
            if (n) return delete this.elements[e], n;
        }
        reset() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : [];
            return (
                (this.elements = {}),
                Array.from(t).forEach((e) => {
                    this.add(e);
                }),
                t
            );
        }
    },
    nr = (i) => i.dataset.trixStoreKey,
    Jt = class extends R {
        isPerforming() {
            return this.performing === !0;
        }
        hasPerformed() {
            return this.performed === !0;
        }
        hasSucceeded() {
            return this.performed && this.succeeded;
        }
        hasFailed() {
            return this.performed && !this.succeeded;
        }
        getPromise() {
            return (
                this.promise ||
                    (this.promise = new Promise(
                        (t, e) => (
                            (this.performing = !0),
                            this.perform((n, r) => {
                                (this.succeeded = n),
                                    (this.performing = !1),
                                    (this.performed = !0),
                                    this.succeeded ? t(r) : e(r);
                            })
                        )
                    )),
                this.promise
            );
        }
        perform(t) {
            return t(!1);
        }
        release() {
            var t, e;
            (t = this.promise) === null ||
                t === void 0 ||
                (e = t.cancel) === null ||
                e === void 0 ||
                e.call(t),
                (this.promise = null),
                (this.performing = null),
                (this.performed = null),
                (this.succeeded = null);
        }
    };
Jt.proxyMethod("getPromise().then"), Jt.proxyMethod("getPromise().catch");
var gt = class extends R {
        constructor(t) {
            let e =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {};
            super(...arguments),
                (this.object = t),
                (this.options = e),
                (this.childViews = []),
                (this.rootView = this);
        }
        getNodes() {
            return (
                this.nodes || (this.nodes = this.createNodes()),
                this.nodes.map((t) => t.cloneNode(!0))
            );
        }
        invalidate() {
            var t;
            return (
                (this.nodes = null),
                (this.childViews = []),
                (t = this.parentView) === null || t === void 0
                    ? void 0
                    : t.invalidate()
            );
        }
        invalidateViewForObject(t) {
            var e;
            return (e = this.findViewForObject(t)) === null || e === void 0
                ? void 0
                : e.invalidate();
        }
        findOrCreateCachedChildView(t, e, n) {
            let r = this.getCachedViewForObject(e);
            return (
                r
                    ? this.recordChildView(r)
                    : ((r = this.createChildView(...arguments)),
                      this.cacheViewForObject(r, e)),
                r
            );
        }
        createChildView(t, e) {
            let n =
                arguments.length > 2 && arguments[2] !== void 0
                    ? arguments[2]
                    : {};
            e instanceof fe && ((n.viewClass = t), (t = ii));
            let r = new t(e, n);
            return this.recordChildView(r);
        }
        recordChildView(t) {
            return (
                (t.parentView = this),
                (t.rootView = this.rootView),
                this.childViews.push(t),
                t
            );
        }
        getAllChildViews() {
            let t = [];
            return (
                this.childViews.forEach((e) => {
                    t.push(e), (t = t.concat(e.getAllChildViews()));
                }),
                t
            );
        }
        findElement() {
            return this.findElementForObject(this.object);
        }
        findElementForObject(t) {
            let e = t?.id;
            if (e)
                return this.rootView.element.querySelector(
                    "[data-trix-id='".concat(e, "']")
                );
        }
        findViewForObject(t) {
            for (let e of this.getAllChildViews()) if (e.object === t) return e;
        }
        getViewCache() {
            return this.rootView !== this
                ? this.rootView.getViewCache()
                : this.isViewCachingEnabled()
                ? (this.viewCache || (this.viewCache = {}), this.viewCache)
                : void 0;
        }
        isViewCachingEnabled() {
            return this.shouldCacheViews !== !1;
        }
        enableViewCaching() {
            this.shouldCacheViews = !0;
        }
        disableViewCaching() {
            this.shouldCacheViews = !1;
        }
        getCachedViewForObject(t) {
            var e;
            return (e = this.getViewCache()) === null || e === void 0
                ? void 0
                : e[t.getCacheKey()];
        }
        cacheViewForObject(t, e) {
            let n = this.getViewCache();
            n && (n[e.getCacheKey()] = t);
        }
        garbageCollectCachedViews() {
            let t = this.getViewCache();
            if (t) {
                let e = this.getAllChildViews()
                    .concat(this)
                    .map((n) => n.object.getCacheKey());
                for (let n in t) e.includes(n) || delete t[n];
            }
        }
    },
    ii = class extends gt {
        constructor() {
            super(...arguments),
                (this.objectGroup = this.object),
                (this.viewClass = this.options.viewClass),
                delete this.options.viewClass;
        }
        getChildViews() {
            return (
                this.childViews.length ||
                    Array.from(this.objectGroup.getObjects()).forEach((t) => {
                        this.findOrCreateCachedChildView(
                            this.viewClass,
                            t,
                            this.options
                        );
                    }),
                this.childViews
            );
        }
        createNodes() {
            let t = this.createContainerElement();
            return (
                this.getChildViews().forEach((e) => {
                    Array.from(e.getNodes()).forEach((n) => {
                        t.appendChild(n);
                    });
                }),
                [t]
            );
        }
        createContainerElement() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : this.objectGroup.getDepth();
            return this.getChildViews()[0].createContainerElement(t);
        }
    };
var {
        entries: jr,
        setPrototypeOf: ir,
        isFrozen: Oo,
        getPrototypeOf: Fo,
        getOwnPropertyDescriptor: Po,
    } = Object,
    { freeze: V, seal: $, create: Wr } = Object,
    { apply: ri, construct: oi } = typeof Reflect < "u" && Reflect;
V ||
    (V = function (i) {
        return i;
    }),
    $ ||
        ($ = function (i) {
            return i;
        }),
    ri ||
        (ri = function (i, t, e) {
            return i.apply(t, e);
        }),
    oi ||
        (oi = function (i, t) {
            return new i(...t);
        });
var Ne = G(Array.prototype.forEach),
    rr = G(Array.prototype.pop),
    oe = G(Array.prototype.push),
    _e = G(String.prototype.toLowerCase),
    On = G(String.prototype.toString),
    or = G(String.prototype.match),
    se = G(String.prototype.replace),
    Mo = G(String.prototype.indexOf),
    Bo = G(String.prototype.trim),
    X = G(Object.prototype.hasOwnProperty),
    _ = G(RegExp.prototype.test),
    ae =
        ((sr = TypeError),
        function () {
            for (var i = arguments.length, t = new Array(i), e = 0; e < i; e++)
                t[e] = arguments[e];
            return oi(sr, t);
        }),
    sr;
function G(i) {
    return function (t) {
        for (
            var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
            r < e;
            r++
        )
            n[r - 1] = arguments[r];
        return ri(i, t, n);
    };
}
function b(i, t) {
    let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _e;
    ir && ir(i, null);
    let n = t.length;
    for (; n--; ) {
        let r = t[n];
        if (typeof r == "string") {
            let o = e(r);
            o !== r && (Oo(t) || (t[n] = o), (r = o));
        }
        i[r] = !0;
    }
    return i;
}
function _o(i) {
    for (let t = 0; t < i.length; t++) X(i, t) || (i[t] = null);
    return i;
}
function Rt(i) {
    let t = Wr(null);
    for (let [e, n] of jr(i))
        X(i, e) &&
            (Array.isArray(n)
                ? (t[e] = _o(n))
                : n && typeof n == "object" && n.constructor === Object
                ? (t[e] = Rt(n))
                : (t[e] = n));
    return t;
}
function le(i, t) {
    for (; i !== null; ) {
        let e = Po(i, t);
        if (e) {
            if (e.get) return G(e.get);
            if (typeof e.value == "function") return G(e.value);
        }
        i = Fo(i);
    }
    return function () {
        return null;
    };
}
var ar = V([
        "a",
        "abbr",
        "acronym",
        "address",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "bdi",
        "bdo",
        "big",
        "blink",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "center",
        "cite",
        "code",
        "col",
        "colgroup",
        "content",
        "data",
        "datalist",
        "dd",
        "decorator",
        "del",
        "details",
        "dfn",
        "dialog",
        "dir",
        "div",
        "dl",
        "dt",
        "element",
        "em",
        "fieldset",
        "figcaption",
        "figure",
        "font",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hgroup",
        "hr",
        "html",
        "i",
        "img",
        "input",
        "ins",
        "kbd",
        "label",
        "legend",
        "li",
        "main",
        "map",
        "mark",
        "marquee",
        "menu",
        "menuitem",
        "meter",
        "nav",
        "nobr",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "picture",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "section",
        "select",
        "shadow",
        "small",
        "source",
        "spacer",
        "span",
        "strike",
        "strong",
        "style",
        "sub",
        "summary",
        "sup",
        "table",
        "tbody",
        "td",
        "template",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "tr",
        "track",
        "tt",
        "u",
        "ul",
        "var",
        "video",
        "wbr",
    ]),
    Fn = V([
        "svg",
        "a",
        "altglyph",
        "altglyphdef",
        "altglyphitem",
        "animatecolor",
        "animatemotion",
        "animatetransform",
        "circle",
        "clippath",
        "defs",
        "desc",
        "ellipse",
        "filter",
        "font",
        "g",
        "glyph",
        "glyphref",
        "hkern",
        "image",
        "line",
        "lineargradient",
        "marker",
        "mask",
        "metadata",
        "mpath",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialgradient",
        "rect",
        "stop",
        "style",
        "switch",
        "symbol",
        "text",
        "textpath",
        "title",
        "tref",
        "tspan",
        "view",
        "vkern",
    ]),
    Pn = V([
        "feBlend",
        "feColorMatrix",
        "feComponentTransfer",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feDropShadow",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMerge",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
    ]),
    jo = V([
        "animate",
        "color-profile",
        "cursor",
        "discard",
        "font-face",
        "font-face-format",
        "font-face-name",
        "font-face-src",
        "font-face-uri",
        "foreignobject",
        "hatch",
        "hatchpath",
        "mesh",
        "meshgradient",
        "meshpatch",
        "meshrow",
        "missing-glyph",
        "script",
        "set",
        "solidcolor",
        "unknown",
        "use",
    ]),
    Mn = V([
        "math",
        "menclose",
        "merror",
        "mfenced",
        "mfrac",
        "mglyph",
        "mi",
        "mlabeledtr",
        "mmultiscripts",
        "mn",
        "mo",
        "mover",
        "mpadded",
        "mphantom",
        "mroot",
        "mrow",
        "ms",
        "mspace",
        "msqrt",
        "mstyle",
        "msub",
        "msup",
        "msubsup",
        "mtable",
        "mtd",
        "mtext",
        "mtr",
        "munder",
        "munderover",
        "mprescripts",
    ]),
    Wo = V([
        "maction",
        "maligngroup",
        "malignmark",
        "mlongdiv",
        "mscarries",
        "mscarry",
        "msgroup",
        "mstack",
        "msline",
        "msrow",
        "semantics",
        "annotation",
        "annotation-xml",
        "mprescripts",
        "none",
    ]),
    lr = V(["#text"]),
    cr = V([
        "accept",
        "action",
        "align",
        "alt",
        "autocapitalize",
        "autocomplete",
        "autopictureinpicture",
        "autoplay",
        "background",
        "bgcolor",
        "border",
        "capture",
        "cellpadding",
        "cellspacing",
        "checked",
        "cite",
        "class",
        "clear",
        "color",
        "cols",
        "colspan",
        "controls",
        "controlslist",
        "coords",
        "crossorigin",
        "datetime",
        "decoding",
        "default",
        "dir",
        "disabled",
        "disablepictureinpicture",
        "disableremoteplayback",
        "download",
        "draggable",
        "enctype",
        "enterkeyhint",
        "face",
        "for",
        "headers",
        "height",
        "hidden",
        "high",
        "href",
        "hreflang",
        "id",
        "inputmode",
        "integrity",
        "ismap",
        "kind",
        "label",
        "lang",
        "list",
        "loading",
        "loop",
        "low",
        "max",
        "maxlength",
        "media",
        "method",
        "min",
        "minlength",
        "multiple",
        "muted",
        "name",
        "nonce",
        "noshade",
        "novalidate",
        "nowrap",
        "open",
        "optimum",
        "pattern",
        "placeholder",
        "playsinline",
        "popover",
        "popovertarget",
        "popovertargetaction",
        "poster",
        "preload",
        "pubdate",
        "radiogroup",
        "readonly",
        "rel",
        "required",
        "rev",
        "reversed",
        "role",
        "rows",
        "rowspan",
        "spellcheck",
        "scope",
        "selected",
        "shape",
        "size",
        "sizes",
        "span",
        "srclang",
        "start",
        "src",
        "srcset",
        "step",
        "style",
        "summary",
        "tabindex",
        "title",
        "translate",
        "type",
        "usemap",
        "valign",
        "value",
        "width",
        "wrap",
        "xmlns",
        "slot",
    ]),
    Bn = V([
        "accent-height",
        "accumulate",
        "additive",
        "alignment-baseline",
        "amplitude",
        "ascent",
        "attributename",
        "attributetype",
        "azimuth",
        "basefrequency",
        "baseline-shift",
        "begin",
        "bias",
        "by",
        "class",
        "clip",
        "clippathunits",
        "clip-path",
        "clip-rule",
        "color",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "cx",
        "cy",
        "d",
        "dx",
        "dy",
        "diffuseconstant",
        "direction",
        "display",
        "divisor",
        "dur",
        "edgemode",
        "elevation",
        "end",
        "exponent",
        "fill",
        "fill-opacity",
        "fill-rule",
        "filter",
        "filterunits",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "fx",
        "fy",
        "g1",
        "g2",
        "glyph-name",
        "glyphref",
        "gradientunits",
        "gradienttransform",
        "height",
        "href",
        "id",
        "image-rendering",
        "in",
        "in2",
        "intercept",
        "k",
        "k1",
        "k2",
        "k3",
        "k4",
        "kerning",
        "keypoints",
        "keysplines",
        "keytimes",
        "lang",
        "lengthadjust",
        "letter-spacing",
        "kernelmatrix",
        "kernelunitlength",
        "lighting-color",
        "local",
        "marker-end",
        "marker-mid",
        "marker-start",
        "markerheight",
        "markerunits",
        "markerwidth",
        "maskcontentunits",
        "maskunits",
        "max",
        "mask",
        "media",
        "method",
        "mode",
        "min",
        "name",
        "numoctaves",
        "offset",
        "operator",
        "opacity",
        "order",
        "orient",
        "orientation",
        "origin",
        "overflow",
        "paint-order",
        "path",
        "pathlength",
        "patterncontentunits",
        "patterntransform",
        "patternunits",
        "points",
        "preservealpha",
        "preserveaspectratio",
        "primitiveunits",
        "r",
        "rx",
        "ry",
        "radius",
        "refx",
        "refy",
        "repeatcount",
        "repeatdur",
        "restart",
        "result",
        "rotate",
        "scale",
        "seed",
        "shape-rendering",
        "slope",
        "specularconstant",
        "specularexponent",
        "spreadmethod",
        "startoffset",
        "stddeviation",
        "stitchtiles",
        "stop-color",
        "stop-opacity",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke",
        "stroke-width",
        "style",
        "surfacescale",
        "systemlanguage",
        "tabindex",
        "tablevalues",
        "targetx",
        "targety",
        "transform",
        "transform-origin",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "textlength",
        "type",
        "u1",
        "u2",
        "unicode",
        "values",
        "viewbox",
        "visibility",
        "version",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "width",
        "word-spacing",
        "wrap",
        "writing-mode",
        "xchannelselector",
        "ychannelselector",
        "x",
        "x1",
        "x2",
        "xmlns",
        "y",
        "y1",
        "y2",
        "z",
        "zoomandpan",
    ]),
    ur = V([
        "accent",
        "accentunder",
        "align",
        "bevelled",
        "close",
        "columnsalign",
        "columnlines",
        "columnspan",
        "denomalign",
        "depth",
        "dir",
        "display",
        "displaystyle",
        "encoding",
        "fence",
        "frame",
        "height",
        "href",
        "id",
        "largeop",
        "length",
        "linethickness",
        "lspace",
        "lquote",
        "mathbackground",
        "mathcolor",
        "mathsize",
        "mathvariant",
        "maxsize",
        "minsize",
        "movablelimits",
        "notation",
        "numalign",
        "open",
        "rowalign",
        "rowlines",
        "rowspacing",
        "rowspan",
        "rspace",
        "rquote",
        "scriptlevel",
        "scriptminsize",
        "scriptsizemultiplier",
        "selection",
        "separator",
        "separators",
        "stretchy",
        "subscriptshift",
        "supscriptshift",
        "symmetric",
        "voffset",
        "width",
        "xmlns",
    ]),
    Ie = V(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
    Uo = $(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
    Vo = $(/<%[\w\W]*|[\w\W]*%>/gm),
    zo = $(/\$\{[\w\W]*}/gm),
    Ho = $(/^data-[\-\w.\u00B7-\uFFFF]+$/),
    qo = $(/^aria-[\-\w]+$/),
    Ur = $(
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    ),
    Jo = $(/^(?:\w+script|data):/i),
    Ko = $(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    Vr = $(/^html$/i),
    Go = $(/^[a-z][.\w]*(-[.\w]+)+$/i),
    hr = Object.freeze({
        __proto__: null,
        ARIA_ATTR: qo,
        ATTR_WHITESPACE: Ko,
        CUSTOM_ELEMENT: Go,
        DATA_ATTR: Ho,
        DOCTYPE_NAME: Vr,
        ERB_EXPR: Vo,
        IS_ALLOWED_URI: Ur,
        IS_SCRIPT_OR_DATA: Jo,
        MUSTACHE_EXPR: Uo,
        TMPLIT_EXPR: zo,
    }),
    Yo = 1,
    $o = 3,
    Xo = 7,
    Qo = 8,
    Zo = 9,
    ts = function () {
        return typeof window > "u" ? null : window;
    },
    es = (function i() {
        let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : ts(),
            e = (a) => i(a);
        if (
            ((e.version = "3.2.3"),
            (e.removed = []),
            !t || !t.document || t.document.nodeType !== Zo)
        )
            return (e.isSupported = !1), e;
        let { document: n } = t,
            r = n,
            o = r.currentScript,
            {
                DocumentFragment: s,
                HTMLTemplateElement: l,
                Node: c,
                Element: u,
                NodeFilter: d,
                NamedNodeMap: C = t.NamedNodeMap || t.MozNamedAttrMap,
                HTMLFormElement: T,
                DOMParser: q,
                trustedTypes: tt,
            } = t,
            M = u.prototype,
            pt = le(M, "cloneNode"),
            Ct = le(M, "remove"),
            Qt = le(M, "nextSibling"),
            Zt = le(M, "childNodes"),
            F = le(M, "parentNode");
        if (typeof l == "function") {
            let a = n.createElement("template");
            a.content &&
                a.content.ownerDocument &&
                (n = a.content.ownerDocument);
        }
        let k,
            ot = "",
            {
                implementation: Et,
                createNodeIterator: Zr,
                createDocumentFragment: to,
                getElementsByTagName: eo,
            } = n,
            { importNode: no } = r,
            J = {
                afterSanitizeAttributes: [],
                afterSanitizeElements: [],
                afterSanitizeShadowDOM: [],
                beforeSanitizeAttributes: [],
                beforeSanitizeElements: [],
                beforeSanitizeShadowDOM: [],
                uponSanitizeAttribute: [],
                uponSanitizeElement: [],
                uponSanitizeShadowNode: [],
            };
        e.isSupported =
            typeof jr == "function" &&
            typeof F == "function" &&
            Et &&
            Et.createHTMLDocument !== void 0;
        let {
                MUSTACHE_EXPR: cn,
                ERB_EXPR: un,
                TMPLIT_EXPR: hn,
                DATA_ATTR: io,
                ARIA_ATTR: ro,
                IS_SCRIPT_OR_DATA: oo,
                ATTR_WHITESPACE: Ci,
                CUSTOM_ELEMENT: so,
            } = hr,
            { IS_ALLOWED_URI: Ei } = hr,
            N = null,
            Si = b({}, [...ar, ...Fn, ...Pn, ...Mn, ...lr]),
            O = null,
            ki = b({}, [...cr, ...Bn, ...ur, ...Ie]),
            w = Object.seal(
                Wr(null, {
                    tagNameCheck: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: null,
                    },
                    attributeNameCheck: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: null,
                    },
                    allowCustomizedBuiltInElements: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: !1,
                    },
                })
            ),
            te = null,
            dn = null,
            Ri = !0,
            gn = !0,
            Ti = !1,
            wi = !0,
            Bt = !1,
            mn = !0,
            St = !1,
            pn = !1,
            fn = !1,
            _t = !1,
            Ee = !1,
            Se = !1,
            Li = !0,
            Di = !1,
            bn = !0,
            ee = !1,
            jt = {},
            Wt = null,
            Ni = b({}, [
                "annotation-xml",
                "audio",
                "colgroup",
                "desc",
                "foreignobject",
                "head",
                "iframe",
                "math",
                "mi",
                "mn",
                "mo",
                "ms",
                "mtext",
                "noembed",
                "noframes",
                "noscript",
                "plaintext",
                "script",
                "style",
                "svg",
                "template",
                "thead",
                "title",
                "video",
                "xmp",
            ]),
            Ii = null,
            Oi = b({}, ["audio", "video", "img", "source", "image", "track"]),
            vn = null,
            Fi = b({}, [
                "alt",
                "class",
                "for",
                "id",
                "label",
                "name",
                "pattern",
                "placeholder",
                "role",
                "summary",
                "title",
                "value",
                "style",
                "xmlns",
            ]),
            ke = "http://www.w3.org/1998/Math/MathML",
            Re = "http://www.w3.org/2000/svg",
            st = "http://www.w3.org/1999/xhtml",
            Ut = st,
            An = !1,
            yn = null,
            ao = b({}, [ke, Re, st], On),
            Te = b({}, ["mi", "mo", "mn", "ms", "mtext"]),
            we = b({}, ["annotation-xml"]),
            lo = b({}, ["title", "style", "font", "a", "script"]),
            ne = null,
            co = ["application/xhtml+xml", "text/html"],
            I = null,
            Vt = null,
            uo = n.createElement("form"),
            Pi = function (a) {
                return a instanceof RegExp || a instanceof Function;
            },
            xn = function () {
                let a =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : {};
                if (!Vt || Vt !== a) {
                    if (
                        ((a && typeof a == "object") || (a = {}),
                        (a = Rt(a)),
                        (ne =
                            co.indexOf(a.PARSER_MEDIA_TYPE) === -1
                                ? "text/html"
                                : a.PARSER_MEDIA_TYPE),
                        (I = ne === "application/xhtml+xml" ? On : _e),
                        (N = X(a, "ALLOWED_TAGS")
                            ? b({}, a.ALLOWED_TAGS, I)
                            : Si),
                        (O = X(a, "ALLOWED_ATTR")
                            ? b({}, a.ALLOWED_ATTR, I)
                            : ki),
                        (yn = X(a, "ALLOWED_NAMESPACES")
                            ? b({}, a.ALLOWED_NAMESPACES, On)
                            : ao),
                        (vn = X(a, "ADD_URI_SAFE_ATTR")
                            ? b(Rt(Fi), a.ADD_URI_SAFE_ATTR, I)
                            : Fi),
                        (Ii = X(a, "ADD_DATA_URI_TAGS")
                            ? b(Rt(Oi), a.ADD_DATA_URI_TAGS, I)
                            : Oi),
                        (Wt = X(a, "FORBID_CONTENTS")
                            ? b({}, a.FORBID_CONTENTS, I)
                            : Ni),
                        (te = X(a, "FORBID_TAGS")
                            ? b({}, a.FORBID_TAGS, I)
                            : {}),
                        (dn = X(a, "FORBID_ATTR")
                            ? b({}, a.FORBID_ATTR, I)
                            : {}),
                        (jt = !!X(a, "USE_PROFILES") && a.USE_PROFILES),
                        (Ri = a.ALLOW_ARIA_ATTR !== !1),
                        (gn = a.ALLOW_DATA_ATTR !== !1),
                        (Ti = a.ALLOW_UNKNOWN_PROTOCOLS || !1),
                        (wi = a.ALLOW_SELF_CLOSE_IN_ATTR !== !1),
                        (Bt = a.SAFE_FOR_TEMPLATES || !1),
                        (mn = a.SAFE_FOR_XML !== !1),
                        (St = a.WHOLE_DOCUMENT || !1),
                        (_t = a.RETURN_DOM || !1),
                        (Ee = a.RETURN_DOM_FRAGMENT || !1),
                        (Se = a.RETURN_TRUSTED_TYPE || !1),
                        (fn = a.FORCE_BODY || !1),
                        (Li = a.SANITIZE_DOM !== !1),
                        (Di = a.SANITIZE_NAMED_PROPS || !1),
                        (bn = a.KEEP_CONTENT !== !1),
                        (ee = a.IN_PLACE || !1),
                        (Ei = a.ALLOWED_URI_REGEXP || Ur),
                        (Ut = a.NAMESPACE || st),
                        (Te = a.MATHML_TEXT_INTEGRATION_POINTS || Te),
                        (we = a.HTML_INTEGRATION_POINTS || we),
                        (w = a.CUSTOM_ELEMENT_HANDLING || {}),
                        a.CUSTOM_ELEMENT_HANDLING &&
                            Pi(a.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
                            (w.tagNameCheck =
                                a.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
                        a.CUSTOM_ELEMENT_HANDLING &&
                            Pi(a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
                            (w.attributeNameCheck =
                                a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
                        a.CUSTOM_ELEMENT_HANDLING &&
                            typeof a.CUSTOM_ELEMENT_HANDLING
                                .allowCustomizedBuiltInElements == "boolean" &&
                            (w.allowCustomizedBuiltInElements =
                                a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
                        Bt && (gn = !1),
                        Ee && (_t = !0),
                        jt &&
                            ((N = b({}, lr)),
                            (O = []),
                            jt.html === !0 && (b(N, ar), b(O, cr)),
                            jt.svg === !0 && (b(N, Fn), b(O, Bn), b(O, Ie)),
                            jt.svgFilters === !0 &&
                                (b(N, Pn), b(O, Bn), b(O, Ie)),
                            jt.mathMl === !0 && (b(N, Mn), b(O, ur), b(O, Ie))),
                        a.ADD_TAGS &&
                            (N === Si && (N = Rt(N)), b(N, a.ADD_TAGS, I)),
                        a.ADD_ATTR &&
                            (O === ki && (O = Rt(O)), b(O, a.ADD_ATTR, I)),
                        a.ADD_URI_SAFE_ATTR && b(vn, a.ADD_URI_SAFE_ATTR, I),
                        a.FORBID_CONTENTS &&
                            (Wt === Ni && (Wt = Rt(Wt)),
                            b(Wt, a.FORBID_CONTENTS, I)),
                        bn && (N["#text"] = !0),
                        St && b(N, ["html", "head", "body"]),
                        N.table && (b(N, ["tbody"]), delete te.tbody),
                        a.TRUSTED_TYPES_POLICY)
                    ) {
                        if (
                            typeof a.TRUSTED_TYPES_POLICY.createHTML !=
                            "function"
                        )
                            throw ae(
                                'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'
                            );
                        if (
                            typeof a.TRUSTED_TYPES_POLICY.createScriptURL !=
                            "function"
                        )
                            throw ae(
                                'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'
                            );
                        (k = a.TRUSTED_TYPES_POLICY), (ot = k.createHTML(""));
                    } else
                        k === void 0 &&
                            (k = (function (g, h) {
                                if (
                                    typeof g != "object" ||
                                    typeof g.createPolicy != "function"
                                )
                                    return null;
                                let v = null,
                                    A = "data-tt-policy-suffix";
                                h &&
                                    h.hasAttribute(A) &&
                                    (v = h.getAttribute(A));
                                let f = "dompurify" + (v ? "#" + v : "");
                                try {
                                    return g.createPolicy(f, {
                                        createHTML: (D) => D,
                                        createScriptURL: (D) => D,
                                    });
                                } catch {
                                    return (
                                        console.warn(
                                            "TrustedTypes policy " +
                                                f +
                                                " could not be created."
                                        ),
                                        null
                                    );
                                }
                            })(tt, o)),
                            k !== null &&
                                typeof ot == "string" &&
                                (ot = k.createHTML(""));
                    V && V(a), (Vt = a);
                }
            },
            Mi = b({}, [...Fn, ...Pn, ...jo]),
            Bi = b({}, [...Mn, ...Wo]),
            et = function (a) {
                oe(e.removed, { element: a });
                try {
                    F(a).removeChild(a);
                } catch {
                    Ct(a);
                }
            },
            Le = function (a, g) {
                try {
                    oe(e.removed, {
                        attribute: g.getAttributeNode(a),
                        from: g,
                    });
                } catch {
                    oe(e.removed, { attribute: null, from: g });
                }
                if ((g.removeAttribute(a), a === "is"))
                    if (_t || Ee)
                        try {
                            et(g);
                        } catch {}
                    else
                        try {
                            g.setAttribute(a, "");
                        } catch {}
            },
            _i = function (a) {
                let g = null,
                    h = null;
                if (fn) a = "<remove></remove>" + a;
                else {
                    let f = or(a, /^[\r\n\t ]+/);
                    h = f && f[0];
                }
                ne === "application/xhtml+xml" &&
                    Ut === st &&
                    (a =
                        '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
                        a +
                        "</body></html>");
                let v = k ? k.createHTML(a) : a;
                if (Ut === st)
                    try {
                        g = new q().parseFromString(v, ne);
                    } catch {}
                if (!g || !g.documentElement) {
                    g = Et.createDocument(Ut, "template", null);
                    try {
                        g.documentElement.innerHTML = An ? ot : v;
                    } catch {}
                }
                let A = g.body || g.documentElement;
                return (
                    a &&
                        h &&
                        A.insertBefore(
                            n.createTextNode(h),
                            A.childNodes[0] || null
                        ),
                    Ut === st
                        ? eo.call(g, St ? "html" : "body")[0]
                        : St
                        ? g.documentElement
                        : A
                );
            },
            ji = function (a) {
                return Zr.call(
                    a.ownerDocument || a,
                    a,
                    d.SHOW_ELEMENT |
                        d.SHOW_COMMENT |
                        d.SHOW_TEXT |
                        d.SHOW_PROCESSING_INSTRUCTION |
                        d.SHOW_CDATA_SECTION,
                    null
                );
            },
            Cn = function (a) {
                return (
                    a instanceof T &&
                    (typeof a.nodeName != "string" ||
                        typeof a.textContent != "string" ||
                        typeof a.removeChild != "function" ||
                        !(a.attributes instanceof C) ||
                        typeof a.removeAttribute != "function" ||
                        typeof a.setAttribute != "function" ||
                        typeof a.namespaceURI != "string" ||
                        typeof a.insertBefore != "function" ||
                        typeof a.hasChildNodes != "function")
                );
            },
            Wi = function (a) {
                return typeof c == "function" && a instanceof c;
            };
        function at(a, g, h) {
            Ne(a, (v) => {
                v.call(e, g, h, Vt);
            });
        }
        let Ui = function (a) {
                let g = null;
                if ((at(J.beforeSanitizeElements, a, null), Cn(a)))
                    return et(a), !0;
                let h = I(a.nodeName);
                if (
                    (at(J.uponSanitizeElement, a, {
                        tagName: h,
                        allowedTags: N,
                    }),
                    (a.hasChildNodes() &&
                        !Wi(a.firstElementChild) &&
                        _(/<[/\w]/g, a.innerHTML) &&
                        _(/<[/\w]/g, a.textContent)) ||
                        a.nodeType === Xo ||
                        (mn && a.nodeType === Qo && _(/<[/\w]/g, a.data)))
                )
                    return et(a), !0;
                if (!N[h] || te[h]) {
                    if (
                        !te[h] &&
                        zi(h) &&
                        ((w.tagNameCheck instanceof RegExp &&
                            _(w.tagNameCheck, h)) ||
                            (w.tagNameCheck instanceof Function &&
                                w.tagNameCheck(h)))
                    )
                        return !1;
                    if (bn && !Wt[h]) {
                        let v = F(a) || a.parentNode,
                            A = Zt(a) || a.childNodes;
                        if (A && v)
                            for (let f = A.length - 1; f >= 0; --f) {
                                let D = pt(A[f], !0);
                                (D.__removalCount =
                                    (a.__removalCount || 0) + 1),
                                    v.insertBefore(D, Qt(a));
                            }
                    }
                    return et(a), !0;
                }
                return a instanceof u &&
                    !(function (v) {
                        let A = F(v);
                        (A && A.tagName) ||
                            (A = { namespaceURI: Ut, tagName: "template" });
                        let f = _e(v.tagName),
                            D = _e(A.tagName);
                        return (
                            !!yn[v.namespaceURI] &&
                            (v.namespaceURI === Re
                                ? A.namespaceURI === st
                                    ? f === "svg"
                                    : A.namespaceURI === ke
                                    ? f === "svg" &&
                                      (D === "annotation-xml" || Te[D])
                                    : !!Mi[f]
                                : v.namespaceURI === ke
                                ? A.namespaceURI === st
                                    ? f === "math"
                                    : A.namespaceURI === Re
                                    ? f === "math" && we[D]
                                    : !!Bi[f]
                                : v.namespaceURI === st
                                ? !(A.namespaceURI === Re && !we[D]) &&
                                  !(A.namespaceURI === ke && !Te[D]) &&
                                  !Bi[f] &&
                                  (lo[f] || !Mi[f])
                                : !(
                                      ne !== "application/xhtml+xml" ||
                                      !yn[v.namespaceURI]
                                  ))
                        );
                    })(a)
                    ? (et(a), !0)
                    : (h !== "noscript" &&
                          h !== "noembed" &&
                          h !== "noframes") ||
                      !_(/<\/no(script|embed|frames)/i, a.innerHTML)
                    ? (Bt &&
                          a.nodeType === $o &&
                          ((g = a.textContent),
                          Ne([cn, un, hn], (v) => {
                              g = se(g, v, " ");
                          }),
                          a.textContent !== g &&
                              (oe(e.removed, { element: a.cloneNode() }),
                              (a.textContent = g))),
                      at(J.afterSanitizeElements, a, null),
                      !1)
                    : (et(a), !0);
            },
            Vi = function (a, g, h) {
                if (Li && (g === "id" || g === "name") && (h in n || h in uo))
                    return !1;
                if (!(gn && !dn[g] && _(io, g))) {
                    if (!(Ri && _(ro, g))) {
                        if (!O[g] || dn[g]) {
                            if (
                                !(
                                    (zi(a) &&
                                        ((w.tagNameCheck instanceof RegExp &&
                                            _(w.tagNameCheck, a)) ||
                                            (w.tagNameCheck instanceof
                                                Function &&
                                                w.tagNameCheck(a))) &&
                                        ((w.attributeNameCheck instanceof
                                            RegExp &&
                                            _(w.attributeNameCheck, g)) ||
                                            (w.attributeNameCheck instanceof
                                                Function &&
                                                w.attributeNameCheck(g)))) ||
                                    (g === "is" &&
                                        w.allowCustomizedBuiltInElements &&
                                        ((w.tagNameCheck instanceof RegExp &&
                                            _(w.tagNameCheck, h)) ||
                                            (w.tagNameCheck instanceof
                                                Function &&
                                                w.tagNameCheck(h))))
                                )
                            )
                                return !1;
                        } else if (!vn[g]) {
                            if (!_(Ei, se(h, Ci, ""))) {
                                if (
                                    ((g !== "src" &&
                                        g !== "xlink:href" &&
                                        g !== "href") ||
                                        a === "script" ||
                                        Mo(h, "data:") !== 0 ||
                                        !Ii[a]) &&
                                    !(Ti && !_(oo, se(h, Ci, "")))
                                ) {
                                    if (h) return !1;
                                }
                            }
                        }
                    }
                }
                return !0;
            },
            zi = function (a) {
                return a !== "annotation-xml" && or(a, so);
            },
            Hi = function (a) {
                at(J.beforeSanitizeAttributes, a, null);
                let { attributes: g } = a;
                if (!g || Cn(a)) return;
                let h = {
                        attrName: "",
                        attrValue: "",
                        keepAttr: !0,
                        allowedAttributes: O,
                        forceKeepAttr: void 0,
                    },
                    v = g.length;
                for (; v--; ) {
                    let A = g[v],
                        { name: f, namespaceURI: D, value: lt } = A,
                        nt = I(f),
                        B = f === "value" ? lt : Bo(lt);
                    if (
                        ((h.attrName = nt),
                        (h.attrValue = B),
                        (h.keepAttr = !0),
                        (h.forceKeepAttr = void 0),
                        at(J.uponSanitizeAttribute, a, h),
                        (B = h.attrValue),
                        !Di ||
                            (nt !== "id" && nt !== "name") ||
                            (Le(f, a), (B = "user-content-" + B)),
                        mn && _(/((--!?|])>)|<\/(style|title)/i, B))
                    ) {
                        Le(f, a);
                        continue;
                    }
                    if (h.forceKeepAttr || (Le(f, a), !h.keepAttr)) continue;
                    if (!wi && _(/\/>/i, B)) {
                        Le(f, a);
                        continue;
                    }
                    Bt &&
                        Ne([cn, un, hn], (Ji) => {
                            B = se(B, Ji, " ");
                        });
                    let qi = I(a.nodeName);
                    if (Vi(qi, nt, B)) {
                        if (
                            k &&
                            typeof tt == "object" &&
                            typeof tt.getAttributeType == "function" &&
                            !D
                        )
                            switch (tt.getAttributeType(qi, nt)) {
                                case "TrustedHTML":
                                    B = k.createHTML(B);
                                    break;
                                case "TrustedScriptURL":
                                    B = k.createScriptURL(B);
                            }
                        try {
                            D
                                ? a.setAttributeNS(D, f, B)
                                : a.setAttribute(f, B),
                                Cn(a) ? et(a) : rr(e.removed);
                        } catch {}
                    }
                }
                at(J.afterSanitizeAttributes, a, null);
            },
            ho = function a(g) {
                let h = null,
                    v = ji(g);
                for (
                    at(J.beforeSanitizeShadowDOM, g, null);
                    (h = v.nextNode());

                )
                    at(J.uponSanitizeShadowNode, h, null),
                        Ui(h),
                        Hi(h),
                        h.content instanceof s && a(h.content);
                at(J.afterSanitizeShadowDOM, g, null);
            };
        return (
            (e.sanitize = function (a) {
                let g =
                        arguments.length > 1 && arguments[1] !== void 0
                            ? arguments[1]
                            : {},
                    h = null,
                    v = null,
                    A = null,
                    f = null;
                if (
                    ((An = !a),
                    An && (a = "<!-->"),
                    typeof a != "string" && !Wi(a))
                ) {
                    if (typeof a.toString != "function")
                        throw ae("toString is not a function");
                    if (typeof (a = a.toString()) != "string")
                        throw ae("dirty is not a string, aborting");
                }
                if (!e.isSupported) return a;
                if (
                    (pn || xn(g),
                    (e.removed = []),
                    typeof a == "string" && (ee = !1),
                    ee)
                ) {
                    if (a.nodeName) {
                        let nt = I(a.nodeName);
                        if (!N[nt] || te[nt])
                            throw ae(
                                "root node is forbidden and cannot be sanitized in-place"
                            );
                    }
                } else if (a instanceof c)
                    (h = _i("<!---->")),
                        (v = h.ownerDocument.importNode(a, !0)),
                        (v.nodeType === Yo && v.nodeName === "BODY") ||
                        v.nodeName === "HTML"
                            ? (h = v)
                            : h.appendChild(v);
                else {
                    if (!_t && !Bt && !St && a.indexOf("<") === -1)
                        return k && Se ? k.createHTML(a) : a;
                    if (((h = _i(a)), !h)) return _t ? null : Se ? ot : "";
                }
                h && fn && et(h.firstChild);
                let D = ji(ee ? a : h);
                for (; (A = D.nextNode()); )
                    Ui(A), Hi(A), A.content instanceof s && ho(A.content);
                if (ee) return a;
                if (_t) {
                    if (Ee)
                        for (f = to.call(h.ownerDocument); h.firstChild; )
                            f.appendChild(h.firstChild);
                    else f = h;
                    return (
                        (O.shadowroot || O.shadowrootmode) &&
                            (f = no.call(r, f, !0)),
                        f
                    );
                }
                let lt = St ? h.outerHTML : h.innerHTML;
                return (
                    St &&
                        N["!doctype"] &&
                        h.ownerDocument &&
                        h.ownerDocument.doctype &&
                        h.ownerDocument.doctype.name &&
                        _(Vr, h.ownerDocument.doctype.name) &&
                        (lt =
                            "<!DOCTYPE " +
                            h.ownerDocument.doctype.name +
                            `>
` +
                            lt),
                    Bt &&
                        Ne([cn, un, hn], (nt) => {
                            lt = se(lt, nt, " ");
                        }),
                    k && Se ? k.createHTML(lt) : lt
                );
            }),
            (e.setConfig = function () {
                xn(
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : {}
                ),
                    (pn = !0);
            }),
            (e.clearConfig = function () {
                (Vt = null), (pn = !1);
            }),
            (e.isValidAttribute = function (a, g, h) {
                Vt || xn({});
                let v = I(a),
                    A = I(g);
                return Vi(v, A, h);
            }),
            (e.addHook = function (a, g) {
                typeof g == "function" && oe(J[a], g);
            }),
            (e.removeHook = function (a) {
                return rr(J[a]);
            }),
            (e.removeHooks = function (a) {
                J[a] = [];
            }),
            (e.removeAllHooks = function () {
                J = {
                    afterSanitizeAttributes: [],
                    afterSanitizeElements: [],
                    afterSanitizeShadowDOM: [],
                    beforeSanitizeAttributes: [],
                    beforeSanitizeElements: [],
                    beforeSanitizeShadowDOM: [],
                    uponSanitizeAttribute: [],
                    uponSanitizeElement: [],
                    uponSanitizeShadowNode: [],
                };
            }),
            e
        );
    })(),
    ns = "style href src width height language class".split(" "),
    is = "javascript:".split(" "),
    rs = "script iframe form noscript".split(" "),
    Kt = class extends R {
        static setHTML(t, e) {
            let n = new this(e).sanitize(),
                r = n.getHTML ? n.getHTML() : n.outerHTML;
            t.innerHTML = r;
        }
        static sanitize(t, e) {
            let n = new this(t, e);
            return n.sanitize(), n;
        }
        constructor(t) {
            let {
                allowedAttributes: e,
                forbiddenProtocols: n,
                forbiddenElements: r,
            } = arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {};
            super(...arguments),
                (this.allowedAttributes = e || ns),
                (this.forbiddenProtocols = n || is),
                (this.forbiddenElements = r || rs),
                (this.body = os(t));
        }
        sanitize() {
            return (
                this.sanitizeElements(),
                this.normalizeListElementNesting(),
                es.sanitize(this.body, {
                    ADD_ATTR: ["language"],
                    RETURN_DOM: !0,
                })
            );
        }
        getHTML() {
            return this.body.innerHTML;
        }
        getBody() {
            return this.body;
        }
        sanitizeElements() {
            let t = je(this.body),
                e = [];
            for (; t.nextNode(); ) {
                let n = t.currentNode;
                switch (n.nodeType) {
                    case Node.ELEMENT_NODE:
                        this.elementIsRemovable(n)
                            ? e.push(n)
                            : this.sanitizeElement(n);
                        break;
                    case Node.COMMENT_NODE:
                        e.push(n);
                }
            }
            return e.forEach((n) => At(n)), this.body;
        }
        sanitizeElement(t) {
            return (
                t.hasAttribute("href") &&
                    this.forbiddenProtocols.includes(t.protocol) &&
                    t.removeAttribute("href"),
                Array.from(t.attributes).forEach((e) => {
                    let { name: n } = e;
                    this.allowedAttributes.includes(n) ||
                        n.indexOf("data-trix") === 0 ||
                        t.removeAttribute(n);
                }),
                t
            );
        }
        normalizeListElementNesting() {
            return (
                Array.from(this.body.querySelectorAll("ul,ol")).forEach((t) => {
                    let e = t.previousElementSibling;
                    e && j(e) === "li" && e.appendChild(t);
                }),
                this.body
            );
        }
        elementIsRemovable(t) {
            if (t?.nodeType === Node.ELEMENT_NODE)
                return (
                    this.elementIsForbidden(t) ||
                    this.elementIsntSerializable(t)
                );
        }
        elementIsForbidden(t) {
            return this.forbiddenElements.includes(j(t));
        }
        elementIsntSerializable(t) {
            return t.getAttribute("data-trix-serialize") === "false" && !Lt(t);
        }
    },
    os = function () {
        let i =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        i = i.replace(/<\/html[^>]*>[^]*$/i, "</html>");
        let t = document.implementation.createHTMLDocument("");
        return (
            (t.documentElement.innerHTML = i),
            Array.from(t.head.querySelectorAll("style")).forEach((e) => {
                t.body.appendChild(e);
            }),
            t.body
        );
    },
    { css: ft } = Ce,
    be = class extends gt {
        constructor() {
            super(...arguments),
                (this.attachment = this.object),
                (this.attachment.uploadProgressDelegate = this),
                (this.attachmentPiece = this.options.piece);
        }
        createContentNodes() {
            return [];
        }
        createNodes() {
            let t,
                e = (t = p({
                    tagName: "figure",
                    className: this.getClassName(),
                    data: this.getData(),
                    editable: !1,
                })),
                n = this.getHref();
            return (
                n &&
                    ((t = p({
                        tagName: "a",
                        editable: !1,
                        attributes: { href: n, tabindex: -1 },
                    })),
                    e.appendChild(t)),
                this.attachment.hasContent()
                    ? Kt.setHTML(t, this.attachment.getContent())
                    : this.createContentNodes().forEach((r) => {
                          t.appendChild(r);
                      }),
                t.appendChild(this.createCaptionElement()),
                this.attachment.isPending() &&
                    ((this.progressElement = p({
                        tagName: "progress",
                        attributes: {
                            class: ft.attachmentProgress,
                            value: this.attachment.getUploadProgress(),
                            max: 100,
                        },
                        data: {
                            trixMutable: !0,
                            trixStoreKey: [
                                "progressElement",
                                this.attachment.id,
                            ].join("/"),
                        },
                    })),
                    e.appendChild(this.progressElement)),
                [dr("left"), e, dr("right")]
            );
        }
        createCaptionElement() {
            let t = p({
                    tagName: "figcaption",
                    className: ft.attachmentCaption,
                }),
                e = this.attachmentPiece.getCaption();
            if (e)
                t.classList.add("".concat(ft.attachmentCaption, "--edited")),
                    (t.textContent = e);
            else {
                let n,
                    r,
                    o = this.getCaptionConfig();
                if (
                    (o.name && (n = this.attachment.getFilename()),
                    o.size && (r = this.attachment.getFormattedFilesize()),
                    n)
                ) {
                    let s = p({
                        tagName: "span",
                        className: ft.attachmentName,
                        textContent: n,
                    });
                    t.appendChild(s);
                }
                if (r) {
                    n && t.appendChild(document.createTextNode(" "));
                    let s = p({
                        tagName: "span",
                        className: ft.attachmentSize,
                        textContent: r,
                    });
                    t.appendChild(s);
                }
            }
            return t;
        }
        getClassName() {
            let t = [
                    ft.attachment,
                    ""
                        .concat(ft.attachment, "--")
                        .concat(this.attachment.getType()),
                ],
                e = this.attachment.getExtension();
            return (
                e && t.push("".concat(ft.attachment, "--").concat(e)),
                t.join(" ")
            );
        }
        getData() {
            let t = {
                    trixAttachment: JSON.stringify(this.attachment),
                    trixContentType: this.attachment.getContentType(),
                    trixId: this.attachment.id,
                },
                { attributes: e } = this.attachmentPiece;
            return (
                e.isEmpty() || (t.trixAttributes = JSON.stringify(e)),
                this.attachment.isPending() && (t.trixSerialize = !1),
                t
            );
        }
        getHref() {
            if (!ss(this.attachment.getContent(), "a"))
                return this.attachment.getHref();
        }
        getCaptionConfig() {
            var t;
            let e = this.attachment.getType(),
                n = Mr(
                    (t = gi[e]) === null || t === void 0 ? void 0 : t.caption
                );
            return e === "file" && (n.name = !0), n;
        }
        findProgressElement() {
            var t;
            return (t = this.findElement()) === null || t === void 0
                ? void 0
                : t.querySelector("progress");
        }
        attachmentDidChangeUploadProgress() {
            let t = this.attachment.getUploadProgress(),
                e = this.findProgressElement();
            e && (e.value = t);
        }
    },
    dr = (i) =>
        p({
            tagName: "span",
            textContent: an,
            data: { trixCursorTarget: i, trixSerialize: !1 },
        }),
    ss = function (i, t) {
        let e = p("div");
        return Kt.setHTML(e, i || ""), e.querySelector(t);
    },
    Ve = class extends be {
        constructor() {
            super(...arguments), (this.attachment.previewDelegate = this);
        }
        createContentNodes() {
            return (
                (this.image = p({
                    tagName: "img",
                    attributes: { src: "" },
                    data: { trixMutable: !0 },
                })),
                this.refresh(this.image),
                [this.image]
            );
        }
        createCaptionElement() {
            let t = super.createCaptionElement(...arguments);
            return (
                t.textContent ||
                    t.setAttribute(
                        "data-trix-placeholder",
                        m.captionPlaceholder
                    ),
                t
            );
        }
        refresh(t) {
            var e;
            if (
                (t ||
                    (t =
                        (e = this.findElement()) === null || e === void 0
                            ? void 0
                            : e.querySelector("img")),
                t)
            )
                return this.updateAttributesForImage(t);
        }
        updateAttributesForImage(t) {
            let e = this.attachment.getURL(),
                n = this.attachment.getPreviewURL();
            if (((t.src = n || e), n === e))
                t.removeAttribute("data-trix-serialized-attributes");
            else {
                let l = JSON.stringify({ src: e });
                t.setAttribute("data-trix-serialized-attributes", l);
            }
            let r = this.attachment.getWidth(),
                o = this.attachment.getHeight();
            r != null && (t.width = r), o != null && (t.height = o);
            let s = [
                "imageElement",
                this.attachment.id,
                t.src,
                t.width,
                t.height,
            ].join("/");
            t.dataset.trixStoreKey = s;
        }
        attachmentDidChangeAttributes() {
            return this.refresh(this.image), this.refresh();
        }
    },
    ze = class extends gt {
        constructor() {
            super(...arguments),
                (this.piece = this.object),
                (this.attributes = this.piece.getAttributes()),
                (this.textConfig = this.options.textConfig),
                (this.context = this.options.context),
                this.piece.attachment
                    ? (this.attachment = this.piece.attachment)
                    : (this.string = this.piece.toString());
        }
        createNodes() {
            let t = this.attachment
                    ? this.createAttachmentNodes()
                    : this.createStringNodes(),
                e = this.createElement();
            if (e) {
                let n = (function (r) {
                    for (
                        ;
                        (o = r) !== null && o !== void 0 && o.firstElementChild;

                    ) {
                        var o;
                        r = r.firstElementChild;
                    }
                    return r;
                })(e);
                Array.from(t).forEach((r) => {
                    n.appendChild(r);
                }),
                    (t = [e]);
            }
            return t;
        }
        createAttachmentNodes() {
            let t = this.attachment.isPreviewable() ? Ve : be;
            return this.createChildView(t, this.piece.attachment, {
                piece: this.piece,
            }).getNodes();
        }
        createStringNodes() {
            var t;
            if ((t = this.textConfig) !== null && t !== void 0 && t.plaintext)
                return [document.createTextNode(this.string)];
            {
                let e = [],
                    n = this.string.split(`
`);
                for (let r = 0; r < n.length; r++) {
                    let o = n[r];
                    if (r > 0) {
                        let s = p("br");
                        e.push(s);
                    }
                    if (o.length) {
                        let s = document.createTextNode(this.preserveSpaces(o));
                        e.push(s);
                    }
                }
                return e;
            }
        }
        createElement() {
            let t,
                e,
                n,
                r = {};
            for (e in this.attributes) {
                n = this.attributes[e];
                let s = Zn(e);
                if (s) {
                    if (s.tagName) {
                        var o;
                        let l = p(s.tagName);
                        o ? (o.appendChild(l), (o = l)) : (t = o = l);
                    }
                    if ((s.styleProperty && (r[s.styleProperty] = n), s.style))
                        for (e in s.style) (n = s.style[e]), (r[e] = n);
                }
            }
            if (Object.keys(r).length)
                for (e in (t || (t = p("span")), r))
                    (n = r[e]), (t.style[e] = n);
            return t;
        }
        createContainerElement() {
            for (let t in this.attributes) {
                let e = this.attributes[t],
                    n = Zn(t);
                if (n && n.groupTagName) {
                    let r = {};
                    return (r[t] = e), p(n.groupTagName, r);
                }
            }
        }
        preserveSpaces(t) {
            return (
                this.context.isLast && (t = t.replace(/\ $/, bt)),
                (t = t
                    .replace(/(\S)\ {3}(\S)/g, "$1 ".concat(bt, " $2"))
                    .replace(/\ {2}/g, "".concat(bt, " "))
                    .replace(/\ {2}/g, " ".concat(bt))),
                (this.context.isFirst || this.context.followsWhitespace) &&
                    (t = t.replace(/^\ /, bt)),
                t
            );
        }
    },
    He = class extends gt {
        constructor() {
            super(...arguments),
                (this.text = this.object),
                (this.textConfig = this.options.textConfig);
        }
        createNodes() {
            let t = [],
                e = fe.groupObjects(this.getPieces()),
                n = e.length - 1;
            for (let o = 0; o < e.length; o++) {
                let s = e[o],
                    l = {};
                o === 0 && (l.isFirst = !0),
                    o === n && (l.isLast = !0),
                    as(r) && (l.followsWhitespace = !0);
                let c = this.findOrCreateCachedChildView(ze, s, {
                    textConfig: this.textConfig,
                    context: l,
                });
                t.push(...Array.from(c.getNodes() || []));
                var r = s;
            }
            return t;
        }
        getPieces() {
            return Array.from(this.text.getPieces()).filter(
                (t) => !t.hasAttribute("blockBreak")
            );
        }
    },
    as = (i) => /\s$/.test(i?.toString()),
    { css: gr } = Ce,
    qe = class extends gt {
        constructor() {
            super(...arguments),
                (this.block = this.object),
                (this.attributes = this.block.getAttributes());
        }
        createNodes() {
            let t = [document.createComment("block")];
            if (this.block.isEmpty()) t.push(p("br"));
            else {
                var e;
                let n =
                        (e = L(this.block.getLastAttribute())) === null ||
                        e === void 0
                            ? void 0
                            : e.text,
                    r = this.findOrCreateCachedChildView(He, this.block.text, {
                        textConfig: n,
                    });
                t.push(...Array.from(r.getNodes() || [])),
                    this.shouldAddExtraNewlineElement() && t.push(p("br"));
            }
            if (this.attributes.length) return t;
            {
                let n,
                    { tagName: r } = W.default;
                this.block.isRTL() && (n = { dir: "rtl" });
                let o = p({ tagName: r, attributes: n });
                return t.forEach((s) => o.appendChild(s)), [o];
            }
        }
        createContainerElement(t) {
            let e = {},
                n,
                r = this.attributes[t],
                { tagName: o, htmlAttributes: s = [] } = L(r);
            if (
                (t === 0 &&
                    this.block.isRTL() &&
                    Object.assign(e, { dir: "rtl" }),
                r === "attachmentGallery")
            ) {
                let l = this.block.getBlockBreakPosition();
                n = ""
                    .concat(gr.attachmentGallery, " ")
                    .concat(gr.attachmentGallery, "--")
                    .concat(l);
            }
            return (
                Object.entries(this.block.htmlAttributes).forEach((l) => {
                    let [c, u] = l;
                    s.includes(c) && (e[c] = u);
                }),
                p({ tagName: o, className: n, attributes: e })
            );
        }
        shouldAddExtraNewlineElement() {
            return /\n\n$/.test(this.block.toString());
        }
    },
    Gt = class extends gt {
        static render(t) {
            let e = p("div"),
                n = new this(t, { element: e });
            return n.render(), n.sync(), e;
        }
        constructor() {
            super(...arguments),
                (this.element = this.options.element),
                (this.elementStore = new ni()),
                this.setDocument(this.object);
        }
        setDocument(t) {
            t.isEqualTo(this.document) || (this.document = this.object = t);
        }
        render() {
            if (
                ((this.childViews = []),
                (this.shadowElement = p("div")),
                !this.document.isEmpty())
            ) {
                let t = fe.groupObjects(this.document.getBlocks(), {
                    asTree: !0,
                });
                Array.from(t).forEach((e) => {
                    let n = this.findOrCreateCachedChildView(qe, e);
                    Array.from(n.getNodes()).map((r) =>
                        this.shadowElement.appendChild(r)
                    );
                });
            }
        }
        isSynced() {
            return ls(this.shadowElement, this.element);
        }
        sync() {
            let t = this.createDocumentFragmentForSync();
            for (; this.element.lastChild; )
                this.element.removeChild(this.element.lastChild);
            return this.element.appendChild(t), this.didSync();
        }
        didSync() {
            return (
                this.elementStore.reset(mr(this.element)),
                vi(() => this.garbageCollectCachedViews())
            );
        }
        createDocumentFragmentForSync() {
            let t = document.createDocumentFragment();
            return (
                Array.from(this.shadowElement.childNodes).forEach((e) => {
                    t.appendChild(e.cloneNode(!0));
                }),
                Array.from(mr(t)).forEach((e) => {
                    let n = this.elementStore.remove(e);
                    n && e.parentNode.replaceChild(n, e);
                }),
                t
            );
        }
    },
    mr = (i) => i.querySelectorAll("[data-trix-store-key]"),
    ls = (i, t) => pr(i.innerHTML) === pr(t.innerHTML),
    pr = (i) => i.replace(/&nbsp;/g, " ");
function Oe(i) {
    var t, e;
    function n(o, s) {
        try {
            var l = i[o](s),
                c = l.value,
                u = c instanceof cs;
            Promise.resolve(u ? c.v : c).then(
                function (d) {
                    if (u) {
                        var C = o === "return" ? "return" : "next";
                        if (!c.k || d.done) return n(C, d);
                        d = i[C](d).value;
                    }
                    r(l.done ? "return" : "normal", d);
                },
                function (d) {
                    n("throw", d);
                }
            );
        } catch (d) {
            r("throw", d);
        }
    }
    function r(o, s) {
        switch (o) {
            case "return":
                t.resolve({ value: s, done: !0 });
                break;
            case "throw":
                t.reject(s);
                break;
            default:
                t.resolve({ value: s, done: !1 });
        }
        (t = t.next) ? n(t.key, t.arg) : (e = null);
    }
    (this._invoke = function (o, s) {
        return new Promise(function (l, c) {
            var u = { key: o, arg: s, resolve: l, reject: c, next: null };
            e ? (e = e.next = u) : ((t = e = u), n(o, s));
        });
    }),
        typeof i.return != "function" && (this.return = void 0);
}
function cs(i, t) {
    (this.v = i), (this.k = t);
}
function H(i, t, e) {
    return (
        (t = us(t)) in i
            ? Object.defineProperty(i, t, {
                  value: e,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
              })
            : (i[t] = e),
        i
    );
}
function us(i) {
    var t = (function (e, n) {
        if (typeof e != "object" || e === null) return e;
        var r = e[Symbol.toPrimitive];
        if (r !== void 0) {
            var o = r.call(e, n || "default");
            if (typeof o != "object") return o;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (n === "string" ? String : Number)(e);
    })(i, "string");
    return typeof t == "symbol" ? t : String(t);
}
(Oe.prototype[
    (typeof Symbol == "function" && Symbol.asyncIterator) || "@@asyncIterator"
] = function () {
    return this;
}),
    (Oe.prototype.next = function (i) {
        return this._invoke("next", i);
    }),
    (Oe.prototype.throw = function (i) {
        return this._invoke("throw", i);
    }),
    (Oe.prototype.return = function (i) {
        return this._invoke("return", i);
    });
function x(i, t) {
    return hs(i, zr(i, t, "get"));
}
function xi(i, t, e) {
    return ds(i, zr(i, t, "set"), e), e;
}
function zr(i, t, e) {
    if (!t.has(i))
        throw new TypeError(
            "attempted to " + e + " private field on non-instance"
        );
    return t.get(i);
}
function hs(i, t) {
    return t.get ? t.get.call(i) : t.value;
}
function ds(i, t, e) {
    if (t.set) t.set.call(i, e);
    else {
        if (!t.writable)
            throw new TypeError("attempted to set read only private field");
        t.value = e;
    }
}
function Fe(i, t, e) {
    if (!t.has(i))
        throw new TypeError("attempted to get private field on non-instance");
    return e;
}
function Hr(i, t) {
    if (t.has(i))
        throw new TypeError(
            "Cannot initialize the same private elements twice on an object"
        );
}
function pe(i, t, e) {
    Hr(i, t), t.set(i, e);
}
var mt = class extends dt {
    static registerType(t, e) {
        (e.type = t), (this.types[t] = e);
    }
    static fromJSON(t) {
        let e = this.types[t.type];
        if (e) return e.fromJSON(t);
    }
    constructor(t) {
        let e =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        super(...arguments), (this.attributes = U.box(e));
    }
    copyWithAttributes(t) {
        return new this.constructor(this.getValue(), t);
    }
    copyWithAdditionalAttributes(t) {
        return this.copyWithAttributes(this.attributes.merge(t));
    }
    copyWithoutAttribute(t) {
        return this.copyWithAttributes(this.attributes.remove(t));
    }
    copy() {
        return this.copyWithAttributes(this.attributes);
    }
    getAttribute(t) {
        return this.attributes.get(t);
    }
    getAttributesHash() {
        return this.attributes;
    }
    getAttributes() {
        return this.attributes.toObject();
    }
    hasAttribute(t) {
        return this.attributes.has(t);
    }
    hasSameStringValueAsPiece(t) {
        return t && this.toString() === t.toString();
    }
    hasSameAttributesAsPiece(t) {
        return (
            t &&
            (this.attributes === t.attributes ||
                this.attributes.isEqualTo(t.attributes))
        );
    }
    isBlockBreak() {
        return !1;
    }
    isEqualTo(t) {
        return (
            super.isEqualTo(...arguments) ||
            (this.hasSameConstructorAs(t) &&
                this.hasSameStringValueAsPiece(t) &&
                this.hasSameAttributesAsPiece(t))
        );
    }
    isEmpty() {
        return this.length === 0;
    }
    isSerializable() {
        return !0;
    }
    toJSON() {
        return {
            type: this.constructor.type,
            attributes: this.getAttributes(),
        };
    }
    contentsForInspection() {
        return {
            type: this.constructor.type,
            attributes: this.attributes.inspect(),
        };
    }
    canBeGrouped() {
        return this.hasAttribute("href");
    }
    canBeGroupedWith(t) {
        return this.getAttribute("href") === t.getAttribute("href");
    }
    getLength() {
        return this.length;
    }
    canBeConsolidatedWith(t) {
        return !1;
    }
};
H(mt, "types", {});
var Je = class extends Jt {
        constructor(t) {
            super(...arguments), (this.url = t);
        }
        perform(t) {
            let e = new Image();
            (e.onload = () => (
                (e.width = this.width = e.naturalWidth),
                (e.height = this.height = e.naturalHeight),
                t(!0, e)
            )),
                (e.onerror = () => t(!1)),
                (e.src = this.url);
        }
    },
    yt = class extends dt {
        static attachmentForFile(t) {
            let e = new this(this.attributesForFile(t));
            return e.setFile(t), e;
        }
        static attributesForFile(t) {
            return new U({
                filename: t.name,
                filesize: t.size,
                contentType: t.type,
            });
        }
        static fromJSON(t) {
            return new this(t);
        }
        constructor() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
            super(t),
                (this.releaseFile = this.releaseFile.bind(this)),
                (this.attributes = U.box(t)),
                this.didChangeAttributes();
        }
        getAttribute(t) {
            return this.attributes.get(t);
        }
        hasAttribute(t) {
            return this.attributes.has(t);
        }
        getAttributes() {
            return this.attributes.toObject();
        }
        setAttributes() {
            let t =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : {},
                e = this.attributes.merge(t);
            var n, r, o, s;
            if (!this.attributes.isEqualTo(e))
                return (
                    (this.attributes = e),
                    this.didChangeAttributes(),
                    (n = this.previewDelegate) === null ||
                        n === void 0 ||
                        (r = n.attachmentDidChangeAttributes) === null ||
                        r === void 0 ||
                        r.call(n, this),
                    (o = this.delegate) === null ||
                    o === void 0 ||
                    (s = o.attachmentDidChangeAttributes) === null ||
                    s === void 0
                        ? void 0
                        : s.call(o, this)
                );
        }
        didChangeAttributes() {
            if (this.isPreviewable()) return this.preloadURL();
        }
        isPending() {
            return this.file != null && !(this.getURL() || this.getHref());
        }
        isPreviewable() {
            return this.attributes.has("previewable")
                ? this.attributes.get("previewable")
                : yt.previewablePattern.test(this.getContentType());
        }
        getType() {
            return this.hasContent()
                ? "content"
                : this.isPreviewable()
                ? "preview"
                : "file";
        }
        getURL() {
            return this.attributes.get("url");
        }
        getHref() {
            return this.attributes.get("href");
        }
        getFilename() {
            return this.attributes.get("filename") || "";
        }
        getFilesize() {
            return this.attributes.get("filesize");
        }
        getFormattedFilesize() {
            let t = this.attributes.get("filesize");
            return typeof t == "number" ? wr.formatter(t) : "";
        }
        getExtension() {
            var t;
            return (t = this.getFilename().match(/\.(\w+)$/)) === null ||
                t === void 0
                ? void 0
                : t[1].toLowerCase();
        }
        getContentType() {
            return this.attributes.get("contentType");
        }
        hasContent() {
            return this.attributes.has("content");
        }
        getContent() {
            return this.attributes.get("content");
        }
        getWidth() {
            return this.attributes.get("width");
        }
        getHeight() {
            return this.attributes.get("height");
        }
        getFile() {
            return this.file;
        }
        setFile(t) {
            if (((this.file = t), this.isPreviewable()))
                return this.preloadFile();
        }
        releaseFile() {
            this.releasePreloadedFile(), (this.file = null);
        }
        getUploadProgress() {
            return this.uploadProgress != null ? this.uploadProgress : 0;
        }
        setUploadProgress(t) {
            var e, n;
            if (this.uploadProgress !== t)
                return (
                    (this.uploadProgress = t),
                    (e = this.uploadProgressDelegate) === null ||
                    e === void 0 ||
                    (n = e.attachmentDidChangeUploadProgress) === null ||
                    n === void 0
                        ? void 0
                        : n.call(e, this)
                );
        }
        toJSON() {
            return this.getAttributes();
        }
        getCacheKey() {
            return [
                super.getCacheKey(...arguments),
                this.attributes.getCacheKey(),
                this.getPreviewURL(),
            ].join("/");
        }
        getPreviewURL() {
            return this.previewURL || this.preloadingURL;
        }
        setPreviewURL(t) {
            var e, n, r, o;
            if (t !== this.getPreviewURL())
                return (
                    (this.previewURL = t),
                    (e = this.previewDelegate) === null ||
                        e === void 0 ||
                        (n = e.attachmentDidChangeAttributes) === null ||
                        n === void 0 ||
                        n.call(e, this),
                    (r = this.delegate) === null ||
                    r === void 0 ||
                    (o = r.attachmentDidChangePreviewURL) === null ||
                    o === void 0
                        ? void 0
                        : o.call(r, this)
                );
        }
        preloadURL() {
            return this.preload(this.getURL(), this.releaseFile);
        }
        preloadFile() {
            if (this.file)
                return (
                    (this.fileObjectURL = URL.createObjectURL(this.file)),
                    this.preload(this.fileObjectURL)
                );
        }
        releasePreloadedFile() {
            this.fileObjectURL &&
                (URL.revokeObjectURL(this.fileObjectURL),
                (this.fileObjectURL = null));
        }
        preload(t, e) {
            if (t && t !== this.getPreviewURL())
                return (
                    (this.preloadingURL = t),
                    new Je(t)
                        .then((n) => {
                            let { width: r, height: o } = n;
                            return (
                                (this.getWidth() && this.getHeight()) ||
                                    this.setAttributes({ width: r, height: o }),
                                (this.preloadingURL = null),
                                this.setPreviewURL(t),
                                e?.()
                            );
                        })
                        .catch(() => ((this.preloadingURL = null), e?.()))
                );
        }
    };
H(yt, "previewablePattern", /^image(\/(gif|png|webp|jpe?g)|$)/);
var xt = class extends mt {
    static fromJSON(t) {
        return new this(yt.fromJSON(t.attachment), t.attributes);
    }
    constructor(t) {
        super(...arguments),
            (this.attachment = t),
            (this.length = 1),
            this.ensureAttachmentExclusivelyHasAttribute("href"),
            this.attachment.hasContent() || this.removeProhibitedAttributes();
    }
    ensureAttachmentExclusivelyHasAttribute(t) {
        this.hasAttribute(t) &&
            (this.attachment.hasAttribute(t) ||
                this.attachment.setAttributes(this.attributes.slice([t])),
            (this.attributes = this.attributes.remove(t)));
    }
    removeProhibitedAttributes() {
        let t = this.attributes.slice(xt.permittedAttributes);
        t.isEqualTo(this.attributes) || (this.attributes = t);
    }
    getValue() {
        return this.attachment;
    }
    isSerializable() {
        return !this.attachment.isPending();
    }
    getCaption() {
        return this.attributes.get("caption") || "";
    }
    isEqualTo(t) {
        var e;
        return (
            super.isEqualTo(t) &&
            this.attachment.id ===
                (t == null || (e = t.attachment) === null || e === void 0
                    ? void 0
                    : e.id)
        );
    }
    toString() {
        return "\uFFFC";
    }
    toJSON() {
        let t = super.toJSON(...arguments);
        return (t.attachment = this.attachment), t;
    }
    getCacheKey() {
        return [
            super.getCacheKey(...arguments),
            this.attachment.getCacheKey(),
        ].join("/");
    }
    toConsole() {
        return JSON.stringify(this.toString());
    }
};
H(xt, "permittedAttributes", ["caption", "presentation"]),
    mt.registerType("attachment", xt);
var ve = class extends mt {
    static fromJSON(t) {
        return new this(t.string, t.attributes);
    }
    constructor(t) {
        super(...arguments),
            (this.string = ((e) =>
                e.replace(
                    /\r\n?/g,
                    `
`
                ))(t)),
            (this.length = this.string.length);
    }
    getValue() {
        return this.string;
    }
    toString() {
        return this.string.toString();
    }
    isBlockBreak() {
        return (
            this.toString() ===
                `
` && this.getAttribute("blockBreak") === !0
        );
    }
    toJSON() {
        let t = super.toJSON(...arguments);
        return (t.string = this.string), t;
    }
    canBeConsolidatedWith(t) {
        return (
            t &&
            this.hasSameConstructorAs(t) &&
            this.hasSameAttributesAsPiece(t)
        );
    }
    consolidateWith(t) {
        return new this.constructor(
            this.toString() + t.toString(),
            this.attributes
        );
    }
    splitAtOffset(t) {
        let e, n;
        return (
            t === 0
                ? ((e = null), (n = this))
                : t === this.length
                ? ((e = this), (n = null))
                : ((e = new this.constructor(
                      this.string.slice(0, t),
                      this.attributes
                  )),
                  (n = new this.constructor(
                      this.string.slice(t),
                      this.attributes
                  ))),
            [e, n]
        );
    }
    toConsole() {
        let { string: t } = this;
        return (
            t.length > 15 && (t = t.slice(0, 14) + "\u2026"),
            JSON.stringify(t.toString())
        );
    }
};
mt.registerType("string", ve);
var Yt = class extends dt {
        static box(t) {
            return t instanceof this ? t : new this(t);
        }
        constructor() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : [];
            super(...arguments),
                (this.objects = t.slice(0)),
                (this.length = this.objects.length);
        }
        indexOf(t) {
            return this.objects.indexOf(t);
        }
        splice() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            return new this.constructor(bi(this.objects, ...e));
        }
        eachObject(t) {
            return this.objects.map((e, n) => t(e, n));
        }
        insertObjectAtIndex(t, e) {
            return this.splice(e, 0, t);
        }
        insertSplittableListAtIndex(t, e) {
            return this.splice(e, 0, ...t.objects);
        }
        insertSplittableListAtPosition(t, e) {
            let [n, r] = this.splitObjectAtPosition(e);
            return new this.constructor(n).insertSplittableListAtIndex(t, r);
        }
        editObjectAtIndex(t, e) {
            return this.replaceObjectAtIndex(e(this.objects[t]), t);
        }
        replaceObjectAtIndex(t, e) {
            return this.splice(e, 1, t);
        }
        removeObjectAtIndex(t) {
            return this.splice(t, 1);
        }
        getObjectAtIndex(t) {
            return this.objects[t];
        }
        getSplittableListInRange(t) {
            let [e, n, r] = this.splitObjectsAtRange(t);
            return new this.constructor(e.slice(n, r + 1));
        }
        selectSplittableList(t) {
            let e = this.objects.filter((n) => t(n));
            return new this.constructor(e);
        }
        removeObjectsInRange(t) {
            let [e, n, r] = this.splitObjectsAtRange(t);
            return new this.constructor(e).splice(n, r - n + 1);
        }
        transformObjectsInRange(t, e) {
            let [n, r, o] = this.splitObjectsAtRange(t),
                s = n.map((l, c) => (r <= c && c <= o ? e(l) : l));
            return new this.constructor(s);
        }
        splitObjectsAtRange(t) {
            let e,
                [n, r, o] = this.splitObjectAtPosition(ms(t));
            return (
                ([n, e] = new this.constructor(n).splitObjectAtPosition(
                    ps(t) + o
                )),
                [n, r, e - 1]
            );
        }
        getObjectAtPosition(t) {
            let { index: e } = this.findIndexAndOffsetAtPosition(t);
            return this.objects[e];
        }
        splitObjectAtPosition(t) {
            let e,
                n,
                { index: r, offset: o } = this.findIndexAndOffsetAtPosition(t),
                s = this.objects.slice(0);
            if (r != null)
                if (o === 0) (e = r), (n = 0);
                else {
                    let l = this.getObjectAtIndex(r),
                        [c, u] = l.splitAtOffset(o);
                    s.splice(r, 1, c, u), (e = r + 1), (n = c.getLength() - o);
                }
            else (e = s.length), (n = 0);
            return [s, e, n];
        }
        consolidate() {
            let t = [],
                e = this.objects[0];
            return (
                this.objects.slice(1).forEach((n) => {
                    var r, o;
                    (r = (o = e).canBeConsolidatedWith) !== null &&
                    r !== void 0 &&
                    r.call(o, n)
                        ? (e = e.consolidateWith(n))
                        : (t.push(e), (e = n));
                }),
                e && t.push(e),
                new this.constructor(t)
            );
        }
        consolidateFromIndexToIndex(t, e) {
            let n = this.objects.slice(0).slice(t, e + 1),
                r = new this.constructor(n).consolidate().toArray();
            return this.splice(t, n.length, ...r);
        }
        findIndexAndOffsetAtPosition(t) {
            let e,
                n = 0;
            for (e = 0; e < this.objects.length; e++) {
                let r = n + this.objects[e].getLength();
                if (n <= t && t < r) return { index: e, offset: t - n };
                n = r;
            }
            return { index: null, offset: null };
        }
        findPositionAtIndexAndOffset(t, e) {
            let n = 0;
            for (let r = 0; r < this.objects.length; r++) {
                let o = this.objects[r];
                if (r < t) n += o.getLength();
                else if (r === t) {
                    n += e;
                    break;
                }
            }
            return n;
        }
        getEndPosition() {
            return (
                this.endPosition == null &&
                    ((this.endPosition = 0),
                    this.objects.forEach(
                        (t) => (this.endPosition += t.getLength())
                    )),
                this.endPosition
            );
        }
        toString() {
            return this.objects.join("");
        }
        toArray() {
            return this.objects.slice(0);
        }
        toJSON() {
            return this.toArray();
        }
        isEqualTo(t) {
            return (
                super.isEqualTo(...arguments) || gs(this.objects, t?.objects)
            );
        }
        contentsForInspection() {
            return {
                objects: "[".concat(
                    this.objects.map((t) => t.inspect()).join(", "),
                    "]"
                ),
            };
        }
    },
    gs = function (i) {
        let t =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        if (i.length !== t.length) return !1;
        let e = !0;
        for (let n = 0; n < i.length; n++) {
            let r = i[n];
            e && !r.isEqualTo(t[n]) && (e = !1);
        }
        return e;
    },
    ms = (i) => i[0],
    ps = (i) => i[1],
    K = class extends dt {
        static textForAttachmentWithAttributes(t, e) {
            return new this([new xt(t, e)]);
        }
        static textForStringWithAttributes(t, e) {
            return new this([new ve(t, e)]);
        }
        static fromJSON(t) {
            return new this(Array.from(t).map((e) => mt.fromJSON(e)));
        }
        constructor() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : [];
            super(...arguments);
            let e = t.filter((n) => !n.isEmpty());
            this.pieceList = new Yt(e);
        }
        copy() {
            return this.copyWithPieceList(this.pieceList);
        }
        copyWithPieceList(t) {
            return new this.constructor(t.consolidate().toArray());
        }
        copyUsingObjectMap(t) {
            let e = this.getPieces().map((n) => t.find(n) || n);
            return new this.constructor(e);
        }
        appendText(t) {
            return this.insertTextAtPosition(t, this.getLength());
        }
        insertTextAtPosition(t, e) {
            return this.copyWithPieceList(
                this.pieceList.insertSplittableListAtPosition(t.pieceList, e)
            );
        }
        removeTextAtRange(t) {
            return this.copyWithPieceList(
                this.pieceList.removeObjectsInRange(t)
            );
        }
        replaceTextAtRange(t, e) {
            return this.removeTextAtRange(e).insertTextAtPosition(t, e[0]);
        }
        moveTextFromRangeToPosition(t, e) {
            if (t[0] <= e && e <= t[1]) return;
            let n = this.getTextAtRange(t),
                r = n.getLength();
            return (
                t[0] < e && (e -= r),
                this.removeTextAtRange(t).insertTextAtPosition(n, e)
            );
        }
        addAttributeAtRange(t, e, n) {
            let r = {};
            return (r[t] = e), this.addAttributesAtRange(r, n);
        }
        addAttributesAtRange(t, e) {
            return this.copyWithPieceList(
                this.pieceList.transformObjectsInRange(e, (n) =>
                    n.copyWithAdditionalAttributes(t)
                )
            );
        }
        removeAttributeAtRange(t, e) {
            return this.copyWithPieceList(
                this.pieceList.transformObjectsInRange(e, (n) =>
                    n.copyWithoutAttribute(t)
                )
            );
        }
        setAttributesAtRange(t, e) {
            return this.copyWithPieceList(
                this.pieceList.transformObjectsInRange(e, (n) =>
                    n.copyWithAttributes(t)
                )
            );
        }
        getAttributesAtPosition(t) {
            var e;
            return (
                ((e = this.pieceList.getObjectAtPosition(t)) === null ||
                e === void 0
                    ? void 0
                    : e.getAttributes()) || {}
            );
        }
        getCommonAttributes() {
            let t = Array.from(this.pieceList.toArray()).map((e) =>
                e.getAttributes()
            );
            return U.fromCommonAttributesOfObjects(t).toObject();
        }
        getCommonAttributesAtRange(t) {
            return this.getTextAtRange(t).getCommonAttributes() || {};
        }
        getExpandedRangeForAttributeAtOffset(t, e) {
            let n,
                r = (n = e),
                o = this.getLength();
            for (; r > 0 && this.getCommonAttributesAtRange([r - 1, n])[t]; )
                r--;
            for (; n < o && this.getCommonAttributesAtRange([e, n + 1])[t]; )
                n++;
            return [r, n];
        }
        getTextAtRange(t) {
            return this.copyWithPieceList(
                this.pieceList.getSplittableListInRange(t)
            );
        }
        getStringAtRange(t) {
            return this.pieceList.getSplittableListInRange(t).toString();
        }
        getStringAtPosition(t) {
            return this.getStringAtRange([t, t + 1]);
        }
        startsWithString(t) {
            return this.getStringAtRange([0, t.length]) === t;
        }
        endsWithString(t) {
            let e = this.getLength();
            return this.getStringAtRange([e - t.length, e]) === t;
        }
        getAttachmentPieces() {
            return this.pieceList.toArray().filter((t) => !!t.attachment);
        }
        getAttachments() {
            return this.getAttachmentPieces().map((t) => t.attachment);
        }
        getAttachmentAndPositionById(t) {
            let e = 0;
            for (let r of this.pieceList.toArray()) {
                var n;
                if (
                    ((n = r.attachment) === null || n === void 0
                        ? void 0
                        : n.id) === t
                )
                    return { attachment: r.attachment, position: e };
                e += r.length;
            }
            return { attachment: null, position: null };
        }
        getAttachmentById(t) {
            let { attachment: e } = this.getAttachmentAndPositionById(t);
            return e;
        }
        getRangeOfAttachment(t) {
            let e = this.getAttachmentAndPositionById(t.id),
                n = e.position;
            if ((t = e.attachment)) return [n, n + 1];
        }
        updateAttributesForAttachment(t, e) {
            let n = this.getRangeOfAttachment(e);
            return n ? this.addAttributesAtRange(t, n) : this;
        }
        getLength() {
            return this.pieceList.getEndPosition();
        }
        isEmpty() {
            return this.getLength() === 0;
        }
        isEqualTo(t) {
            var e;
            return (
                super.isEqualTo(t) ||
                (t == null || (e = t.pieceList) === null || e === void 0
                    ? void 0
                    : e.isEqualTo(this.pieceList))
            );
        }
        isBlockBreak() {
            return (
                this.getLength() === 1 &&
                this.pieceList.getObjectAtIndex(0).isBlockBreak()
            );
        }
        eachPiece(t) {
            return this.pieceList.eachObject(t);
        }
        getPieces() {
            return this.pieceList.toArray();
        }
        getPieceAtPosition(t) {
            return this.pieceList.getObjectAtPosition(t);
        }
        contentsForInspection() {
            return { pieceList: this.pieceList.inspect() };
        }
        toSerializableText() {
            let t = this.pieceList.selectSplittableList((e) =>
                e.isSerializable()
            );
            return this.copyWithPieceList(t);
        }
        toString() {
            return this.pieceList.toString();
        }
        toJSON() {
            return this.pieceList.toJSON();
        }
        toConsole() {
            return JSON.stringify(
                this.pieceList.toArray().map((t) => JSON.parse(t.toConsole()))
            );
        }
        getDirection() {
            return So(this.toString());
        }
        isRTL() {
            return this.getDirection() === "rtl";
        }
    },
    Y = class extends dt {
        static fromJSON(t) {
            return new this(K.fromJSON(t.text), t.attributes, t.htmlAttributes);
        }
        constructor(t, e, n) {
            super(...arguments),
                (this.text = fs(t || new K())),
                (this.attributes = e || []),
                (this.htmlAttributes = n || {});
        }
        isEmpty() {
            return this.text.isBlockBreak();
        }
        isEqualTo(t) {
            return (
                !!super.isEqualTo(t) ||
                (this.text.isEqualTo(t?.text) &&
                    Ft(this.attributes, t?.attributes) &&
                    Xt(this.htmlAttributes, t?.htmlAttributes))
            );
        }
        copyWithText(t) {
            return new Y(t, this.attributes, this.htmlAttributes);
        }
        copyWithoutText() {
            return this.copyWithText(null);
        }
        copyWithAttributes(t) {
            return new Y(this.text, t, this.htmlAttributes);
        }
        copyWithoutAttributes() {
            return this.copyWithAttributes(null);
        }
        copyUsingObjectMap(t) {
            let e = t.find(this.text);
            return e
                ? this.copyWithText(e)
                : this.copyWithText(this.text.copyUsingObjectMap(t));
        }
        addAttribute(t) {
            let e = this.attributes.concat(fr(t));
            return this.copyWithAttributes(e);
        }
        addHTMLAttribute(t, e) {
            let n = Object.assign({}, this.htmlAttributes, { [t]: e });
            return new Y(this.text, this.attributes, n);
        }
        removeAttribute(t) {
            let { listAttribute: e } = L(t),
                n = vr(vr(this.attributes, t), e);
            return this.copyWithAttributes(n);
        }
        removeLastAttribute() {
            return this.removeAttribute(this.getLastAttribute());
        }
        getLastAttribute() {
            return br(this.attributes);
        }
        getAttributes() {
            return this.attributes.slice(0);
        }
        getAttributeLevel() {
            return this.attributes.length;
        }
        getAttributeAtLevel(t) {
            return this.attributes[t - 1];
        }
        hasAttribute(t) {
            return this.attributes.includes(t);
        }
        hasAttributes() {
            return this.getAttributeLevel() > 0;
        }
        getLastNestableAttribute() {
            return br(this.getNestableAttributes());
        }
        getNestableAttributes() {
            return this.attributes.filter((t) => L(t).nestable);
        }
        getNestingLevel() {
            return this.getNestableAttributes().length;
        }
        decreaseNestingLevel() {
            let t = this.getLastNestableAttribute();
            return t ? this.removeAttribute(t) : this;
        }
        increaseNestingLevel() {
            let t = this.getLastNestableAttribute();
            if (t) {
                let e = this.attributes.lastIndexOf(t),
                    n = bi(this.attributes, e + 1, 0, ...fr(t));
                return this.copyWithAttributes(n);
            }
            return this;
        }
        getListItemAttributes() {
            return this.attributes.filter((t) => L(t).listAttribute);
        }
        isListItem() {
            var t;
            return (t = L(this.getLastAttribute())) === null || t === void 0
                ? void 0
                : t.listAttribute;
        }
        isTerminalBlock() {
            var t;
            return (t = L(this.getLastAttribute())) === null || t === void 0
                ? void 0
                : t.terminal;
        }
        breaksOnReturn() {
            var t;
            return (t = L(this.getLastAttribute())) === null || t === void 0
                ? void 0
                : t.breakOnReturn;
        }
        findLineBreakInDirectionFromPosition(t, e) {
            let n = this.toString(),
                r;
            switch (t) {
                case "forward":
                    r = n.indexOf(
                        `
`,
                        e
                    );
                    break;
                case "backward":
                    r = n.slice(0, e).lastIndexOf(`
`);
            }
            if (r !== -1) return r;
        }
        contentsForInspection() {
            return { text: this.text.inspect(), attributes: this.attributes };
        }
        toString() {
            return this.text.toString();
        }
        toJSON() {
            return {
                text: this.text,
                attributes: this.attributes,
                htmlAttributes: this.htmlAttributes,
            };
        }
        getDirection() {
            return this.text.getDirection();
        }
        isRTL() {
            return this.text.isRTL();
        }
        getLength() {
            return this.text.getLength();
        }
        canBeConsolidatedWith(t) {
            return (
                !this.hasAttributes() &&
                !t.hasAttributes() &&
                this.getDirection() === t.getDirection()
            );
        }
        consolidateWith(t) {
            let e = K.textForStringWithAttributes(`
`),
                n = this.getTextWithoutBlockBreak().appendText(e);
            return this.copyWithText(n.appendText(t.text));
        }
        splitAtOffset(t) {
            let e, n;
            return (
                t === 0
                    ? ((e = null), (n = this))
                    : t === this.getLength()
                    ? ((e = this), (n = null))
                    : ((e = this.copyWithText(
                          this.text.getTextAtRange([0, t])
                      )),
                      (n = this.copyWithText(
                          this.text.getTextAtRange([t, this.getLength()])
                      ))),
                [e, n]
            );
        }
        getBlockBreakPosition() {
            return this.text.getLength() - 1;
        }
        getTextWithoutBlockBreak() {
            return qr(this.text)
                ? this.text.getTextAtRange([0, this.getBlockBreakPosition()])
                : this.text.copy();
        }
        canBeGrouped(t) {
            return this.attributes[t];
        }
        canBeGroupedWith(t, e) {
            let n = t.getAttributes(),
                r = n[e],
                o = this.attributes[e];
            return (
                o === r &&
                !(
                    L(o).group === !1 &&
                    !(() => {
                        if (!De) {
                            De = [];
                            for (let s in W) {
                                let { listAttribute: l } = W[s];
                                l != null && De.push(l);
                            }
                        }
                        return De;
                    })().includes(n[e + 1])
                ) &&
                (this.getDirection() === t.getDirection() || t.isEmpty())
            );
        }
    },
    fs = function (i) {
        return (i = bs(i)), (i = As(i));
    },
    bs = function (i) {
        let t = !1,
            e = i.getPieces(),
            n = e.slice(0, e.length - 1),
            r = e[e.length - 1];
        return r
            ? ((n = n.map((o) => (o.isBlockBreak() ? ((t = !0), ys(o)) : o))),
              t ? new K([...n, r]) : i)
            : i;
    },
    vs = K.textForStringWithAttributes(
        `
`,
        { blockBreak: !0 }
    ),
    As = function (i) {
        return qr(i) ? i : i.appendText(vs);
    },
    qr = function (i) {
        let t = i.getLength();
        return t === 0 ? !1 : i.getTextAtRange([t - 1, t]).isBlockBreak();
    },
    ys = (i) => i.copyWithoutAttribute("blockBreak"),
    fr = function (i) {
        let { listAttribute: t } = L(i);
        return t ? [t, i] : [i];
    },
    br = (i) => i.slice(-1)[0],
    vr = function (i, t) {
        let e = i.lastIndexOf(t);
        return e === -1 ? i : bi(i, e, 1);
    },
    z = class extends dt {
        static fromJSON(t) {
            return new this(Array.from(t).map((e) => Y.fromJSON(e)));
        }
        static fromString(t, e) {
            let n = K.textForStringWithAttributes(t, e);
            return new this([new Y(n)]);
        }
        constructor() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : [];
            super(...arguments),
                t.length === 0 && (t = [new Y()]),
                (this.blockList = Yt.box(t));
        }
        isEmpty() {
            let t = this.getBlockAtIndex(0);
            return (
                this.blockList.length === 1 && t.isEmpty() && !t.hasAttributes()
            );
        }
        copy() {
            let t = (arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : {}
            ).consolidateBlocks
                ? this.blockList.consolidate().toArray()
                : this.blockList.toArray();
            return new this.constructor(t);
        }
        copyUsingObjectsFromDocument(t) {
            let e = new ei(t.getObjects());
            return this.copyUsingObjectMap(e);
        }
        copyUsingObjectMap(t) {
            let e = this.getBlocks().map(
                (n) => t.find(n) || n.copyUsingObjectMap(t)
            );
            return new this.constructor(e);
        }
        copyWithBaseBlockAttributes() {
            let t =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : [],
                e = this.getBlocks().map((n) => {
                    let r = t.concat(n.getAttributes());
                    return n.copyWithAttributes(r);
                });
            return new this.constructor(e);
        }
        replaceBlock(t, e) {
            let n = this.blockList.indexOf(t);
            return n === -1
                ? this
                : new this.constructor(
                      this.blockList.replaceObjectAtIndex(e, n)
                  );
        }
        insertDocumentAtRange(t, e) {
            let { blockList: n } = t;
            e = y(e);
            let [r] = e,
                { index: o, offset: s } = this.locationFromPosition(r),
                l = this,
                c = this.getBlockAtPosition(r);
            return (
                ht(e) && c.isEmpty() && !c.hasAttributes()
                    ? (l = new this.constructor(
                          l.blockList.removeObjectAtIndex(o)
                      ))
                    : c.getBlockBreakPosition() === s && r++,
                (l = l.removeTextAtRange(e)),
                new this.constructor(
                    l.blockList.insertSplittableListAtPosition(n, r)
                )
            );
        }
        mergeDocumentAtRange(t, e) {
            let n, r;
            e = y(e);
            let [o] = e,
                s = this.locationFromPosition(o),
                l = this.getBlockAtIndex(s.index).getAttributes(),
                c = t.getBaseBlockAttributes(),
                u = l.slice(-c.length);
            if (Ft(c, u)) {
                let T = l.slice(0, -c.length);
                n = t.copyWithBaseBlockAttributes(T);
            } else
                n = t
                    .copy({ consolidateBlocks: !0 })
                    .copyWithBaseBlockAttributes(l);
            let d = n.getBlockCount(),
                C = n.getBlockAtIndex(0);
            if (Ft(l, C.getAttributes())) {
                let T = C.getTextWithoutBlockBreak();
                if (((r = this.insertTextAtRange(T, e)), d > 1)) {
                    n = new this.constructor(n.getBlocks().slice(1));
                    let q = o + T.getLength();
                    r = r.insertDocumentAtRange(n, q);
                }
            } else r = this.insertDocumentAtRange(n, e);
            return r;
        }
        insertTextAtRange(t, e) {
            e = y(e);
            let [n] = e,
                { index: r, offset: o } = this.locationFromPosition(n),
                s = this.removeTextAtRange(e);
            return new this.constructor(
                s.blockList.editObjectAtIndex(r, (l) =>
                    l.copyWithText(l.text.insertTextAtPosition(t, o))
                )
            );
        }
        removeTextAtRange(t) {
            let e;
            t = y(t);
            let [n, r] = t;
            if (ht(t)) return this;
            let [o, s] = Array.from(this.locationRangeFromRange(t)),
                l = o.index,
                c = o.offset,
                u = this.getBlockAtIndex(l),
                d = s.index,
                C = s.offset,
                T = this.getBlockAtIndex(d);
            if (
                r - n == 1 &&
                u.getBlockBreakPosition() === c &&
                T.getBlockBreakPosition() !== C &&
                T.text.getStringAtPosition(C) ===
                    `
`
            )
                e = this.blockList.editObjectAtIndex(d, (q) =>
                    q.copyWithText(q.text.removeTextAtRange([C, C + 1]))
                );
            else {
                let q,
                    tt = u.text.getTextAtRange([0, c]),
                    M = T.text.getTextAtRange([C, T.getLength()]),
                    pt = tt.appendText(M);
                q =
                    l !== d &&
                    c === 0 &&
                    u.getAttributeLevel() >= T.getAttributeLevel()
                        ? T.copyWithText(pt)
                        : u.copyWithText(pt);
                let Ct = d + 1 - l;
                e = this.blockList.splice(l, Ct, q);
            }
            return new this.constructor(e);
        }
        moveTextFromRangeToPosition(t, e) {
            let n;
            t = y(t);
            let [r, o] = t;
            if (r <= e && e <= o) return this;
            let s = this.getDocumentAtRange(t),
                l = this.removeTextAtRange(t),
                c = r < e;
            c && (e -= s.getLength());
            let [u, ...d] = s.getBlocks();
            return (
                d.length === 0
                    ? ((n = u.getTextWithoutBlockBreak()), c && (e += 1))
                    : (n = u.text),
                (l = l.insertTextAtRange(n, e)),
                d.length === 0
                    ? l
                    : ((s = new this.constructor(d)),
                      (e += n.getLength()),
                      l.insertDocumentAtRange(s, e))
            );
        }
        addAttributeAtRange(t, e, n) {
            let { blockList: r } = this;
            return (
                this.eachBlockAtRange(
                    n,
                    (o, s, l) =>
                        (r = r.editObjectAtIndex(l, function () {
                            return L(t)
                                ? o.addAttribute(t, e)
                                : s[0] === s[1]
                                ? o
                                : o.copyWithText(
                                      o.text.addAttributeAtRange(t, e, s)
                                  );
                        }))
                ),
                new this.constructor(r)
            );
        }
        addAttribute(t, e) {
            let { blockList: n } = this;
            return (
                this.eachBlock(
                    (r, o) =>
                        (n = n.editObjectAtIndex(o, () => r.addAttribute(t, e)))
                ),
                new this.constructor(n)
            );
        }
        removeAttributeAtRange(t, e) {
            let { blockList: n } = this;
            return (
                this.eachBlockAtRange(e, function (r, o, s) {
                    L(t)
                        ? (n = n.editObjectAtIndex(s, () =>
                              r.removeAttribute(t)
                          ))
                        : o[0] !== o[1] &&
                          (n = n.editObjectAtIndex(s, () =>
                              r.copyWithText(
                                  r.text.removeAttributeAtRange(t, o)
                              )
                          ));
                }),
                new this.constructor(n)
            );
        }
        updateAttributesForAttachment(t, e) {
            let n = this.getRangeOfAttachment(e),
                [r] = Array.from(n),
                { index: o } = this.locationFromPosition(r),
                s = this.getTextAtIndex(o);
            return new this.constructor(
                this.blockList.editObjectAtIndex(o, (l) =>
                    l.copyWithText(s.updateAttributesForAttachment(t, e))
                )
            );
        }
        removeAttributeForAttachment(t, e) {
            let n = this.getRangeOfAttachment(e);
            return this.removeAttributeAtRange(t, n);
        }
        setHTMLAttributeAtPosition(t, e, n) {
            let r = this.getBlockAtPosition(t),
                o = r.addHTMLAttribute(e, n);
            return this.replaceBlock(r, o);
        }
        insertBlockBreakAtRange(t) {
            let e;
            t = y(t);
            let [n] = t,
                { offset: r } = this.locationFromPosition(n),
                o = this.removeTextAtRange(t);
            return (
                r === 0 && (e = [new Y()]),
                new this.constructor(
                    o.blockList.insertSplittableListAtPosition(new Yt(e), n)
                )
            );
        }
        applyBlockAttributeAtRange(t, e, n) {
            let r = this.expandRangeToLineBreaksAndSplitBlocks(n),
                o = r.document;
            n = r.range;
            let s = L(t);
            if (s.listAttribute) {
                o = o.removeLastListAttributeAtRange(n, {
                    exceptAttributeName: t,
                });
                let l = o.convertLineBreaksToBlockBreaksInRange(n);
                (o = l.document), (n = l.range);
            } else
                o = s.exclusive
                    ? o.removeBlockAttributesAtRange(n)
                    : s.terminal
                    ? o.removeLastTerminalAttributeAtRange(n)
                    : o.consolidateBlocksAtRange(n);
            return o.addAttributeAtRange(t, e, n);
        }
        removeLastListAttributeAtRange(t) {
            let e =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : {},
                { blockList: n } = this;
            return (
                this.eachBlockAtRange(t, function (r, o, s) {
                    let l = r.getLastAttribute();
                    l &&
                        L(l).listAttribute &&
                        l !== e.exceptAttributeName &&
                        (n = n.editObjectAtIndex(s, () =>
                            r.removeAttribute(l)
                        ));
                }),
                new this.constructor(n)
            );
        }
        removeLastTerminalAttributeAtRange(t) {
            let { blockList: e } = this;
            return (
                this.eachBlockAtRange(t, function (n, r, o) {
                    let s = n.getLastAttribute();
                    s &&
                        L(s).terminal &&
                        (e = e.editObjectAtIndex(o, () =>
                            n.removeAttribute(s)
                        ));
                }),
                new this.constructor(e)
            );
        }
        removeBlockAttributesAtRange(t) {
            let { blockList: e } = this;
            return (
                this.eachBlockAtRange(t, function (n, r, o) {
                    n.hasAttributes() &&
                        (e = e.editObjectAtIndex(o, () =>
                            n.copyWithoutAttributes()
                        ));
                }),
                new this.constructor(e)
            );
        }
        expandRangeToLineBreaksAndSplitBlocks(t) {
            let e;
            t = y(t);
            let [n, r] = t,
                o = this.locationFromPosition(n),
                s = this.locationFromPosition(r),
                l = this,
                c = l.getBlockAtIndex(o.index);
            if (
                ((o.offset = c.findLineBreakInDirectionFromPosition(
                    "backward",
                    o.offset
                )),
                o.offset != null &&
                    ((e = l.positionFromLocation(o)),
                    (l = l.insertBlockBreakAtRange([e, e + 1])),
                    (s.index += 1),
                    (s.offset -= l.getBlockAtIndex(o.index).getLength()),
                    (o.index += 1)),
                (o.offset = 0),
                s.offset === 0 && s.index > o.index)
            )
                (s.index -= 1),
                    (s.offset = l
                        .getBlockAtIndex(s.index)
                        .getBlockBreakPosition());
            else {
                let u = l.getBlockAtIndex(s.index);
                u.text.getStringAtRange([s.offset - 1, s.offset]) ===
                `
`
                    ? (s.offset -= 1)
                    : (s.offset = u.findLineBreakInDirectionFromPosition(
                          "forward",
                          s.offset
                      )),
                    s.offset !== u.getBlockBreakPosition() &&
                        ((e = l.positionFromLocation(s)),
                        (l = l.insertBlockBreakAtRange([e, e + 1])));
            }
            return (
                (n = l.positionFromLocation(o)),
                (r = l.positionFromLocation(s)),
                { document: l, range: (t = y([n, r])) }
            );
        }
        convertLineBreaksToBlockBreaksInRange(t) {
            t = y(t);
            let [e] = t,
                n = this.getStringAtRange(t).slice(0, -1),
                r = this;
            return (
                n.replace(/.*?\n/g, function (o) {
                    (e += o.length),
                        (r = r.insertBlockBreakAtRange([e - 1, e]));
                }),
                { document: r, range: t }
            );
        }
        consolidateBlocksAtRange(t) {
            t = y(t);
            let [e, n] = t,
                r = this.locationFromPosition(e).index,
                o = this.locationFromPosition(n).index;
            return new this.constructor(
                this.blockList.consolidateFromIndexToIndex(r, o)
            );
        }
        getDocumentAtRange(t) {
            t = y(t);
            let e = this.blockList.getSplittableListInRange(t).toArray();
            return new this.constructor(e);
        }
        getStringAtRange(t) {
            let e,
                n = (t = y(t));
            return (
                n[n.length - 1] !== this.getLength() && (e = -1),
                this.getDocumentAtRange(t).toString().slice(0, e)
            );
        }
        getBlockAtIndex(t) {
            return this.blockList.getObjectAtIndex(t);
        }
        getBlockAtPosition(t) {
            let { index: e } = this.locationFromPosition(t);
            return this.getBlockAtIndex(e);
        }
        getTextAtIndex(t) {
            var e;
            return (e = this.getBlockAtIndex(t)) === null || e === void 0
                ? void 0
                : e.text;
        }
        getTextAtPosition(t) {
            let { index: e } = this.locationFromPosition(t);
            return this.getTextAtIndex(e);
        }
        getPieceAtPosition(t) {
            let { index: e, offset: n } = this.locationFromPosition(t);
            return this.getTextAtIndex(e).getPieceAtPosition(n);
        }
        getCharacterAtPosition(t) {
            let { index: e, offset: n } = this.locationFromPosition(t);
            return this.getTextAtIndex(e).getStringAtRange([n, n + 1]);
        }
        getLength() {
            return this.blockList.getEndPosition();
        }
        getBlocks() {
            return this.blockList.toArray();
        }
        getBlockCount() {
            return this.blockList.length;
        }
        getEditCount() {
            return this.editCount;
        }
        eachBlock(t) {
            return this.blockList.eachObject(t);
        }
        eachBlockAtRange(t, e) {
            let n, r;
            t = y(t);
            let [o, s] = t,
                l = this.locationFromPosition(o),
                c = this.locationFromPosition(s);
            if (l.index === c.index)
                return (
                    (n = this.getBlockAtIndex(l.index)),
                    (r = [l.offset, c.offset]),
                    e(n, r, l.index)
                );
            for (let u = l.index; u <= c.index; u++)
                if (((n = this.getBlockAtIndex(u)), n)) {
                    switch (u) {
                        case l.index:
                            r = [l.offset, n.text.getLength()];
                            break;
                        case c.index:
                            r = [0, c.offset];
                            break;
                        default:
                            r = [0, n.text.getLength()];
                    }
                    e(n, r, u);
                }
        }
        getCommonAttributesAtRange(t) {
            t = y(t);
            let [e] = t;
            if (ht(t)) return this.getCommonAttributesAtPosition(e);
            {
                let n = [],
                    r = [];
                return (
                    this.eachBlockAtRange(t, function (o, s) {
                        if (s[0] !== s[1])
                            return (
                                n.push(o.text.getCommonAttributesAtRange(s)),
                                r.push(Ar(o))
                            );
                    }),
                    U.fromCommonAttributesOfObjects(n)
                        .merge(U.fromCommonAttributesOfObjects(r))
                        .toObject()
                );
            }
        }
        getCommonAttributesAtPosition(t) {
            let e,
                n,
                { index: r, offset: o } = this.locationFromPosition(t),
                s = this.getBlockAtIndex(r);
            if (!s) return {};
            let l = Ar(s),
                c = s.text.getAttributesAtPosition(o),
                u = s.text.getAttributesAtPosition(o - 1),
                d = Object.keys(It).filter((C) => It[C].inheritable);
            for (e in u)
                (n = u[e]), (n === c[e] || d.includes(e)) && (l[e] = n);
            return l;
        }
        getRangeOfCommonAttributeAtPosition(t, e) {
            let { index: n, offset: r } = this.locationFromPosition(e),
                o = this.getTextAtIndex(n),
                [s, l] = Array.from(
                    o.getExpandedRangeForAttributeAtOffset(t, r)
                ),
                c = this.positionFromLocation({ index: n, offset: s }),
                u = this.positionFromLocation({ index: n, offset: l });
            return y([c, u]);
        }
        getBaseBlockAttributes() {
            let t = this.getBlockAtIndex(0).getAttributes();
            for (let e = 1; e < this.getBlockCount(); e++) {
                let n = this.getBlockAtIndex(e).getAttributes(),
                    r = Math.min(t.length, n.length);
                t = (() => {
                    let o = [];
                    for (let s = 0; s < r && n[s] === t[s]; s++) o.push(n[s]);
                    return o;
                })();
            }
            return t;
        }
        getAttachmentById(t) {
            for (let e of this.getAttachments()) if (e.id === t) return e;
        }
        getAttachmentPieces() {
            let t = [];
            return (
                this.blockList.eachObject((e) => {
                    let { text: n } = e;
                    return (t = t.concat(n.getAttachmentPieces()));
                }),
                t
            );
        }
        getAttachments() {
            return this.getAttachmentPieces().map((t) => t.attachment);
        }
        getRangeOfAttachment(t) {
            let e = 0,
                n = this.blockList.toArray();
            for (let r = 0; r < n.length; r++) {
                let { text: o } = n[r],
                    s = o.getRangeOfAttachment(t);
                if (s) return y([e + s[0], e + s[1]]);
                e += o.getLength();
            }
        }
        getLocationRangeOfAttachment(t) {
            let e = this.getRangeOfAttachment(t);
            return this.locationRangeFromRange(e);
        }
        getAttachmentPieceForAttachment(t) {
            for (let e of this.getAttachmentPieces())
                if (e.attachment === t) return e;
        }
        findRangesForBlockAttribute(t) {
            let e = 0,
                n = [];
            return (
                this.getBlocks().forEach((r) => {
                    let o = r.getLength();
                    r.hasAttribute(t) && n.push([e, e + o]), (e += o);
                }),
                n
            );
        }
        findRangesForTextAttribute(t) {
            let { withValue: e } =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : {},
                n = 0,
                r = [],
                o = [];
            return (
                this.getPieces().forEach((s) => {
                    let l = s.getLength();
                    (function (c) {
                        return e ? c.getAttribute(t) === e : c.hasAttribute(t);
                    })(s) &&
                        (r[1] === n
                            ? (r[1] = n + l)
                            : o.push((r = [n, n + l]))),
                        (n += l);
                }),
                o
            );
        }
        locationFromPosition(t) {
            let e = this.blockList.findIndexAndOffsetAtPosition(Math.max(0, t));
            if (e.index != null) return e;
            {
                let n = this.getBlocks();
                return {
                    index: n.length - 1,
                    offset: n[n.length - 1].getLength(),
                };
            }
        }
        positionFromLocation(t) {
            return this.blockList.findPositionAtIndexAndOffset(
                t.index,
                t.offset
            );
        }
        locationRangeFromPosition(t) {
            return y(this.locationFromPosition(t));
        }
        locationRangeFromRange(t) {
            if (!(t = y(t))) return;
            let [e, n] = Array.from(t),
                r = this.locationFromPosition(e),
                o = this.locationFromPosition(n);
            return y([r, o]);
        }
        rangeFromLocationRange(t) {
            let e;
            t = y(t);
            let n = this.positionFromLocation(t[0]);
            return ht(t) || (e = this.positionFromLocation(t[1])), y([n, e]);
        }
        isEqualTo(t) {
            return this.blockList.isEqualTo(t?.blockList);
        }
        getTexts() {
            return this.getBlocks().map((t) => t.text);
        }
        getPieces() {
            let t = [];
            return (
                Array.from(this.getTexts()).forEach((e) => {
                    t.push(...Array.from(e.getPieces() || []));
                }),
                t
            );
        }
        getObjects() {
            return this.getBlocks()
                .concat(this.getTexts())
                .concat(this.getPieces());
        }
        toSerializableDocument() {
            let t = [];
            return (
                this.blockList.eachObject((e) =>
                    t.push(e.copyWithText(e.text.toSerializableText()))
                ),
                new this.constructor(t)
            );
        }
        toString() {
            return this.blockList.toString();
        }
        toJSON() {
            return this.blockList.toJSON();
        }
        toConsole() {
            return JSON.stringify(
                this.blockList
                    .toArray()
                    .map((t) => JSON.parse(t.text.toConsole()))
            );
        }
    },
    Ar = function (i) {
        let t = {},
            e = i.getLastAttribute();
        return e && (t[e] = !0), t;
    },
    _n = function (i) {
        let t =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return { string: (i = ue(i)), attributes: t, type: "string" };
    },
    yr = (i, t) => {
        try {
            return JSON.parse(i.getAttribute("data-trix-".concat(t)));
        } catch {
            return {};
        }
    },
    Mt = class extends R {
        static parse(t, e) {
            let n = new this(t, e);
            return n.parse(), n;
        }
        constructor(t) {
            let { referenceElement: e } =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {};
            super(...arguments),
                (this.html = t),
                (this.referenceElement = e),
                (this.blocks = []),
                (this.blockElements = []),
                (this.processedElements = []);
        }
        getDocument() {
            return z.fromJSON(this.blocks);
        }
        parse() {
            try {
                this.createHiddenContainer(),
                    Kt.setHTML(this.containerElement, this.html);
                let t = je(this.containerElement, { usingFilter: Cs });
                for (; t.nextNode(); ) this.processNode(t.currentNode);
                return this.translateBlockElementMarginsToNewlines();
            } finally {
                this.removeHiddenContainer();
            }
        }
        createHiddenContainer() {
            return this.referenceElement
                ? ((this.containerElement = this.referenceElement.cloneNode(
                      !1
                  )),
                  this.containerElement.removeAttribute("id"),
                  this.containerElement.setAttribute("data-trix-internal", ""),
                  (this.containerElement.style.display = "none"),
                  this.referenceElement.parentNode.insertBefore(
                      this.containerElement,
                      this.referenceElement.nextSibling
                  ))
                : ((this.containerElement = p({
                      tagName: "div",
                      style: { display: "none" },
                  })),
                  document.body.appendChild(this.containerElement));
        }
        removeHiddenContainer() {
            return At(this.containerElement);
        }
        processNode(t) {
            switch (t.nodeType) {
                case Node.TEXT_NODE:
                    if (!this.isInsignificantTextNode(t))
                        return (
                            this.appendBlockForTextNode(t),
                            this.processTextNode(t)
                        );
                    break;
                case Node.ELEMENT_NODE:
                    return (
                        this.appendBlockForElement(t), this.processElement(t)
                    );
            }
        }
        appendBlockForTextNode(t) {
            let e = t.parentNode;
            if (
                e === this.currentBlockElement &&
                this.isBlockElement(t.previousSibling)
            )
                return this.appendStringWithAttributes(`
`);
            if (e === this.containerElement || this.isBlockElement(e)) {
                var n;
                let r = this.getBlockAttributes(e),
                    o = this.getBlockHTMLAttributes(e);
                Ft(
                    r,
                    (n = this.currentBlock) === null || n === void 0
                        ? void 0
                        : n.attributes
                ) ||
                    ((this.currentBlock =
                        this.appendBlockForAttributesWithElement(r, e, o)),
                    (this.currentBlockElement = e));
            }
        }
        appendBlockForElement(t) {
            let e = this.isBlockElement(t),
                n = Tt(this.currentBlockElement, t);
            if (e && !this.isBlockElement(t.firstChild)) {
                if (
                    !this.isInsignificantTextNode(t.firstChild) ||
                    !this.isBlockElement(t.firstElementChild)
                ) {
                    let r = this.getBlockAttributes(t),
                        o = this.getBlockHTMLAttributes(t);
                    if (t.firstChild) {
                        if (n && Ft(r, this.currentBlock.attributes))
                            return this.appendStringWithAttributes(`
`);
                        (this.currentBlock =
                            this.appendBlockForAttributesWithElement(r, t, o)),
                            (this.currentBlockElement = t);
                    }
                }
            } else if (this.currentBlockElement && !n && !e) {
                let r = this.findParentBlockElement(t);
                if (r) return this.appendBlockForElement(r);
                (this.currentBlock = this.appendEmptyBlock()),
                    (this.currentBlockElement = null);
            }
        }
        findParentBlockElement(t) {
            let { parentElement: e } = t;
            for (; e && e !== this.containerElement; ) {
                if (this.isBlockElement(e) && this.blockElements.includes(e))
                    return e;
                e = e.parentElement;
            }
            return null;
        }
        processTextNode(t) {
            let e = t.data;
            var n;
            return (
                xr(t.parentNode) ||
                    ((e = yi(e)),
                    Jr(
                        (n = t.previousSibling) === null || n === void 0
                            ? void 0
                            : n.textContent
                    ) && (e = Es(e))),
                this.appendStringWithAttributes(
                    e,
                    this.getTextAttributes(t.parentNode)
                )
            );
        }
        processElement(t) {
            let e;
            if (Lt(t)) {
                if (((e = yr(t, "attachment")), Object.keys(e).length)) {
                    let n = this.getTextAttributes(t);
                    this.appendAttachmentWithAttributes(e, n),
                        (t.innerHTML = "");
                }
                return this.processedElements.push(t);
            }
            switch (j(t)) {
                case "br":
                    return (
                        this.isExtraBR(t) ||
                            this.isBlockElement(t.nextSibling) ||
                            this.appendStringWithAttributes(
                                `
`,
                                this.getTextAttributes(t)
                            ),
                        this.processedElements.push(t)
                    );
                case "img":
                    e = { url: t.getAttribute("src"), contentType: "image" };
                    let n = ((r) => {
                        let o = r.getAttribute("width"),
                            s = r.getAttribute("height"),
                            l = {};
                        return (
                            o && (l.width = parseInt(o, 10)),
                            s && (l.height = parseInt(s, 10)),
                            l
                        );
                    })(t);
                    for (let r in n) {
                        let o = n[r];
                        e[r] = o;
                    }
                    return (
                        this.appendAttachmentWithAttributes(
                            e,
                            this.getTextAttributes(t)
                        ),
                        this.processedElements.push(t)
                    );
                case "tr":
                    if (this.needsTableSeparator(t))
                        return this.appendStringWithAttributes(
                            Me.tableRowSeparator
                        );
                    break;
                case "td":
                    if (this.needsTableSeparator(t))
                        return this.appendStringWithAttributes(
                            Me.tableCellSeparator
                        );
            }
        }
        appendBlockForAttributesWithElement(t, e) {
            let n =
                arguments.length > 2 && arguments[2] !== void 0
                    ? arguments[2]
                    : {};
            this.blockElements.push(e);
            let r = (function () {
                return {
                    text: [],
                    attributes:
                        arguments.length > 0 && arguments[0] !== void 0
                            ? arguments[0]
                            : {},
                    htmlAttributes:
                        arguments.length > 1 && arguments[1] !== void 0
                            ? arguments[1]
                            : {},
                };
            })(t, n);
            return this.blocks.push(r), r;
        }
        appendEmptyBlock() {
            return this.appendBlockForAttributesWithElement([], null);
        }
        appendStringWithAttributes(t, e) {
            return this.appendPiece(_n(t, e));
        }
        appendAttachmentWithAttributes(t, e) {
            return this.appendPiece(
                (function (n) {
                    return {
                        attachment: n,
                        attributes:
                            arguments.length > 1 && arguments[1] !== void 0
                                ? arguments[1]
                                : {},
                        type: "attachment",
                    };
                })(t, e)
            );
        }
        appendPiece(t) {
            return (
                this.blocks.length === 0 && this.appendEmptyBlock(),
                this.blocks[this.blocks.length - 1].text.push(t)
            );
        }
        appendStringToTextAtIndex(t, e) {
            let { text: n } = this.blocks[e],
                r = n[n.length - 1];
            if (r?.type !== "string") return n.push(_n(t));
            r.string += t;
        }
        prependStringToTextAtIndex(t, e) {
            let { text: n } = this.blocks[e],
                r = n[0];
            if (r?.type !== "string") return n.unshift(_n(t));
            r.string = t + r.string;
        }
        getTextAttributes(t) {
            let e,
                n = {};
            for (let r in It) {
                let o = It[r];
                if (
                    o.tagName &&
                    vt(t, {
                        matchingSelector: o.tagName,
                        untilNode: this.containerElement,
                    })
                )
                    n[r] = !0;
                else if (o.parser) {
                    if (((e = o.parser(t)), e)) {
                        let s = !1;
                        for (let l of this.findBlockElementAncestors(t))
                            if (o.parser(l) === e) {
                                s = !0;
                                break;
                            }
                        s || (n[r] = e);
                    }
                } else
                    o.styleProperty &&
                        ((e = t.style[o.styleProperty]), e && (n[r] = e));
            }
            if (Lt(t)) {
                let r = yr(t, "attributes");
                for (let o in r) (e = r[o]), (n[o] = e);
            }
            return n;
        }
        getBlockAttributes(t) {
            let e = [];
            for (; t && t !== this.containerElement; ) {
                for (let r in W) {
                    let o = W[r];
                    var n;
                    o.parse !== !1 &&
                        j(t) === o.tagName &&
                        (((n = o.test) !== null &&
                            n !== void 0 &&
                            n.call(o, t)) ||
                            !o.test) &&
                        (e.push(r), o.listAttribute && e.push(o.listAttribute));
                }
                t = t.parentNode;
            }
            return e.reverse();
        }
        getBlockHTMLAttributes(t) {
            let e = {},
                n = Object.values(W).find((r) => r.tagName === j(t));
            return (
                (n?.htmlAttributes || []).forEach((r) => {
                    t.hasAttribute(r) && (e[r] = t.getAttribute(r));
                }),
                e
            );
        }
        findBlockElementAncestors(t) {
            let e = [];
            for (; t && t !== this.containerElement; ) {
                let n = j(t);
                de().includes(n) && e.push(t), (t = t.parentNode);
            }
            return e;
        }
        isBlockElement(t) {
            if (
                t?.nodeType === Node.ELEMENT_NODE &&
                !Lt(t) &&
                !vt(t, {
                    matchingSelector: "td",
                    untilNode: this.containerElement,
                })
            )
                return (
                    de().includes(j(t)) ||
                    window.getComputedStyle(t).display === "block"
                );
        }
        isInsignificantTextNode(t) {
            if (t?.nodeType !== Node.TEXT_NODE || !Ss(t.data)) return;
            let { parentNode: e, previousSibling: n, nextSibling: r } = t;
            return (xs(e.previousSibling) &&
                !this.isBlockElement(e.previousSibling)) ||
                xr(e)
                ? void 0
                : !n || this.isBlockElement(n) || !r || this.isBlockElement(r);
        }
        isExtraBR(t) {
            return (
                j(t) === "br" &&
                this.isBlockElement(t.parentNode) &&
                t.parentNode.lastChild === t
            );
        }
        needsTableSeparator(t) {
            if (Me.removeBlankTableCells) {
                var e;
                let n =
                    (e = t.previousSibling) === null || e === void 0
                        ? void 0
                        : e.textContent;
                return n && /\S/.test(n);
            }
            return t.previousSibling;
        }
        translateBlockElementMarginsToNewlines() {
            let t = this.getMarginOfDefaultBlockElement();
            for (let e = 0; e < this.blocks.length; e++) {
                let n = this.getMarginOfBlockElementAtIndex(e);
                n &&
                    (n.top > 2 * t.top &&
                        this.prependStringToTextAtIndex(
                            `
`,
                            e
                        ),
                    n.bottom > 2 * t.bottom &&
                        this.appendStringToTextAtIndex(
                            `
`,
                            e
                        ));
            }
        }
        getMarginOfBlockElementAtIndex(t) {
            let e = this.blockElements[t];
            if (
                e &&
                e.textContent &&
                !de().includes(j(e)) &&
                !this.processedElements.includes(e)
            )
                return Cr(e);
        }
        getMarginOfDefaultBlockElement() {
            let t = p(W.default.tagName);
            return this.containerElement.appendChild(t), Cr(t);
        }
    },
    xr = function (i) {
        let { whiteSpace: t } = window.getComputedStyle(i);
        return ["pre", "pre-wrap", "pre-line"].includes(t);
    },
    xs = (i) => i && !Jr(i.textContent),
    Cr = function (i) {
        let t = window.getComputedStyle(i);
        if (t.display === "block")
            return {
                top: parseInt(t.marginTop),
                bottom: parseInt(t.marginBottom),
            };
    },
    Cs = function (i) {
        return j(i) === "style"
            ? NodeFilter.FILTER_REJECT
            : NodeFilter.FILTER_ACCEPT;
    },
    Es = (i) => i.replace(new RegExp("^".concat(Ai.source, "+")), ""),
    Ss = (i) => new RegExp("^".concat(Ai.source, "*$")).test(i),
    Jr = (i) => /\s$/.test(i),
    ks = [
        "contenteditable",
        "data-trix-id",
        "data-trix-store-key",
        "data-trix-mutable",
        "data-trix-placeholder",
        "tabindex",
    ],
    si = "data-trix-serialized-attributes",
    Rs = "[".concat(si, "]"),
    Ts = new RegExp("<!--block-->", "g"),
    ws = {
        "application/json": function (i) {
            let t;
            if (i instanceof z) t = i;
            else {
                if (!(i instanceof HTMLElement))
                    throw new Error("unserializable object");
                t = Mt.parse(i.innerHTML).getDocument();
            }
            return t.toSerializableDocument().toJSONString();
        },
        "text/html": function (i) {
            let t;
            if (i instanceof z) t = Gt.render(i);
            else {
                if (!(i instanceof HTMLElement))
                    throw new Error("unserializable object");
                t = i.cloneNode(!0);
            }
            return (
                Array.from(
                    t.querySelectorAll("[data-trix-serialize=false]")
                ).forEach((e) => {
                    At(e);
                }),
                ks.forEach((e) => {
                    Array.from(t.querySelectorAll("[".concat(e, "]"))).forEach(
                        (n) => {
                            n.removeAttribute(e);
                        }
                    );
                }),
                Array.from(t.querySelectorAll(Rs)).forEach((e) => {
                    try {
                        let n = JSON.parse(e.getAttribute(si));
                        e.removeAttribute(si);
                        for (let r in n) {
                            let o = n[r];
                            e.setAttribute(r, o);
                        }
                    } catch {}
                }),
                t.innerHTML.replace(Ts, "")
            );
        },
    },
    Ls = Object.freeze({ __proto__: null }),
    E = class extends R {
        constructor(t, e) {
            super(...arguments),
                (this.attachmentManager = t),
                (this.attachment = e),
                (this.id = this.attachment.id),
                (this.file = this.attachment.file);
        }
        remove() {
            return this.attachmentManager.requestRemovalOfAttachment(
                this.attachment
            );
        }
    };
E.proxyMethod("attachment.getAttribute"),
    E.proxyMethod("attachment.hasAttribute"),
    E.proxyMethod("attachment.setAttribute"),
    E.proxyMethod("attachment.getAttributes"),
    E.proxyMethod("attachment.setAttributes"),
    E.proxyMethod("attachment.isPending"),
    E.proxyMethod("attachment.isPreviewable"),
    E.proxyMethod("attachment.getURL"),
    E.proxyMethod("attachment.getHref"),
    E.proxyMethod("attachment.getFilename"),
    E.proxyMethod("attachment.getFilesize"),
    E.proxyMethod("attachment.getFormattedFilesize"),
    E.proxyMethod("attachment.getExtension"),
    E.proxyMethod("attachment.getContentType"),
    E.proxyMethod("attachment.getFile"),
    E.proxyMethod("attachment.setFile"),
    E.proxyMethod("attachment.releaseFile"),
    E.proxyMethod("attachment.getUploadProgress"),
    E.proxyMethod("attachment.setUploadProgress");
var Ke = class extends R {
        constructor() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : [];
            super(...arguments),
                (this.managedAttachments = {}),
                Array.from(t).forEach((e) => {
                    this.manageAttachment(e);
                });
        }
        getAttachments() {
            let t = [];
            for (let e in this.managedAttachments) {
                let n = this.managedAttachments[e];
                t.push(n);
            }
            return t;
        }
        manageAttachment(t) {
            return (
                this.managedAttachments[t.id] ||
                    (this.managedAttachments[t.id] = new E(this, t)),
                this.managedAttachments[t.id]
            );
        }
        attachmentIsManaged(t) {
            return t.id in this.managedAttachments;
        }
        requestRemovalOfAttachment(t) {
            var e, n;
            if (this.attachmentIsManaged(t))
                return (e = this.delegate) === null ||
                    e === void 0 ||
                    (n = e.attachmentManagerDidRequestRemovalOfAttachment) ===
                        null ||
                    n === void 0
                    ? void 0
                    : n.call(e, t);
        }
        unmanageAttachment(t) {
            let e = this.managedAttachments[t.id];
            return delete this.managedAttachments[t.id], e;
        }
    },
    Ge = class {
        constructor(t) {
            (this.composition = t), (this.document = this.composition.document);
            let e = this.composition.getSelectedRange();
            (this.startPosition = e[0]),
                (this.endPosition = e[1]),
                (this.startLocation = this.document.locationFromPosition(
                    this.startPosition
                )),
                (this.endLocation = this.document.locationFromPosition(
                    this.endPosition
                )),
                (this.block = this.document.getBlockAtIndex(
                    this.endLocation.index
                )),
                (this.breaksOnReturn = this.block.breaksOnReturn()),
                (this.previousCharacter = this.block.text.getStringAtPosition(
                    this.endLocation.offset - 1
                )),
                (this.nextCharacter = this.block.text.getStringAtPosition(
                    this.endLocation.offset
                ));
        }
        shouldInsertBlockBreak() {
            return this.block.hasAttributes() &&
                this.block.isListItem() &&
                !this.block.isEmpty()
                ? this.startLocation.offset !== 0
                : this.breaksOnReturn &&
                      this.nextCharacter !==
                          `
`;
        }
        shouldBreakFormattedBlock() {
            return (
                this.block.hasAttributes() &&
                !this.block.isListItem() &&
                ((this.breaksOnReturn &&
                    this.nextCharacter ===
                        `
`) ||
                    this.previousCharacter ===
                        `
`)
            );
        }
        shouldDecreaseListLevel() {
            return (
                this.block.hasAttributes() &&
                this.block.isListItem() &&
                this.block.isEmpty()
            );
        }
        shouldPrependListItem() {
            return (
                this.block.isListItem() &&
                this.startLocation.offset === 0 &&
                !this.block.isEmpty()
            );
        }
        shouldRemoveLastBlockAttribute() {
            return (
                this.block.hasAttributes() &&
                !this.block.isListItem() &&
                this.block.isEmpty()
            );
        }
    },
    rt = class extends R {
        constructor() {
            super(...arguments),
                (this.document = new z()),
                (this.attachments = []),
                (this.currentAttributes = {}),
                (this.revision = 0);
        }
        setDocument(t) {
            var e, n;
            if (!t.isEqualTo(this.document))
                return (
                    (this.document = t),
                    this.refreshAttachments(),
                    this.revision++,
                    (e = this.delegate) === null ||
                    e === void 0 ||
                    (n = e.compositionDidChangeDocument) === null ||
                    n === void 0
                        ? void 0
                        : n.call(e, t)
                );
        }
        getSnapshot() {
            return {
                document: this.document,
                selectedRange: this.getSelectedRange(),
            };
        }
        loadSnapshot(t) {
            var e, n, r, o;
            let { document: s, selectedRange: l } = t;
            return (
                (e = this.delegate) === null ||
                    e === void 0 ||
                    (n = e.compositionWillLoadSnapshot) === null ||
                    n === void 0 ||
                    n.call(e),
                this.setDocument(s ?? new z()),
                this.setSelection(l ?? [0, 0]),
                (r = this.delegate) === null ||
                r === void 0 ||
                (o = r.compositionDidLoadSnapshot) === null ||
                o === void 0
                    ? void 0
                    : o.call(r)
            );
        }
        insertText(t) {
            let { updatePosition: e } =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : { updatePosition: !0 },
                n = this.getSelectedRange();
            this.setDocument(this.document.insertTextAtRange(t, n));
            let r = n[0],
                o = r + t.getLength();
            return (
                e && this.setSelection(o),
                this.notifyDelegateOfInsertionAtRange([r, o])
            );
        }
        insertBlock() {
            let t =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : new Y(),
                e = new z([t]);
            return this.insertDocument(e);
        }
        insertDocument() {
            let t =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : new z(),
                e = this.getSelectedRange();
            this.setDocument(this.document.insertDocumentAtRange(t, e));
            let n = e[0],
                r = n + t.getLength();
            return (
                this.setSelection(r),
                this.notifyDelegateOfInsertionAtRange([n, r])
            );
        }
        insertString(t, e) {
            let n = this.getCurrentTextAttributes(),
                r = K.textForStringWithAttributes(t, n);
            return this.insertText(r, e);
        }
        insertBlockBreak() {
            let t = this.getSelectedRange();
            this.setDocument(this.document.insertBlockBreakAtRange(t));
            let e = t[0],
                n = e + 1;
            return (
                this.setSelection(n),
                this.notifyDelegateOfInsertionAtRange([e, n])
            );
        }
        insertLineBreak() {
            let t = new Ge(this);
            if (t.shouldDecreaseListLevel())
                return (
                    this.decreaseListLevel(), this.setSelection(t.startPosition)
                );
            if (t.shouldPrependListItem()) {
                let e = new z([t.block.copyWithoutText()]);
                return this.insertDocument(e);
            }
            return t.shouldInsertBlockBreak()
                ? this.insertBlockBreak()
                : t.shouldRemoveLastBlockAttribute()
                ? this.removeLastBlockAttribute()
                : t.shouldBreakFormattedBlock()
                ? this.breakFormattedBlock(t)
                : this.insertString(`
`);
        }
        insertHTML(t) {
            let e = Mt.parse(t).getDocument(),
                n = this.getSelectedRange();
            this.setDocument(this.document.mergeDocumentAtRange(e, n));
            let r = n[0],
                o = r + e.getLength() - 1;
            return (
                this.setSelection(o),
                this.notifyDelegateOfInsertionAtRange([r, o])
            );
        }
        replaceHTML(t) {
            let e = Mt.parse(t)
                    .getDocument()
                    .copyUsingObjectsFromDocument(this.document),
                n = this.getLocationRange({ strict: !1 }),
                r = this.document.rangeFromLocationRange(n);
            return this.setDocument(e), this.setSelection(r);
        }
        insertFile(t) {
            return this.insertFiles([t]);
        }
        insertFiles(t) {
            let e = [];
            return (
                Array.from(t).forEach((n) => {
                    var r;
                    if (
                        (r = this.delegate) !== null &&
                        r !== void 0 &&
                        r.compositionShouldAcceptFile(n)
                    ) {
                        let o = yt.attachmentForFile(n);
                        e.push(o);
                    }
                }),
                this.insertAttachments(e)
            );
        }
        insertAttachment(t) {
            return this.insertAttachments([t]);
        }
        insertAttachments(t) {
            let e = new K();
            return (
                Array.from(t).forEach((n) => {
                    var r;
                    let o = n.getType(),
                        s =
                            (r = gi[o]) === null || r === void 0
                                ? void 0
                                : r.presentation,
                        l = this.getCurrentTextAttributes();
                    s && (l.presentation = s);
                    let c = K.textForAttachmentWithAttributes(n, l);
                    e = e.appendText(c);
                }),
                this.insertText(e)
            );
        }
        shouldManageDeletingInDirection(t) {
            let e = this.getLocationRange();
            if (ht(e)) {
                if (
                    (t === "backward" && e[0].offset === 0) ||
                    this.shouldManageMovingCursorInDirection(t)
                )
                    return !0;
            } else if (e[0].index !== e[1].index) return !0;
            return !1;
        }
        deleteInDirection(t) {
            let e,
                n,
                r,
                { length: o } =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : {},
                s = this.getLocationRange(),
                l = this.getSelectedRange(),
                c = ht(l);
            if (
                (c
                    ? (n = t === "backward" && s[0].offset === 0)
                    : (r = s[0].index !== s[1].index),
                n && this.canDecreaseBlockAttributeLevel())
            ) {
                let u = this.getBlock();
                if (
                    (u.isListItem()
                        ? this.decreaseListLevel()
                        : this.decreaseBlockAttributeLevel(),
                    this.setSelection(l[0]),
                    u.isEmpty())
                )
                    return !1;
            }
            return (
                c &&
                    ((l = this.getExpandedRangeInDirection(t, { length: o })),
                    t === "backward" && (e = this.getAttachmentAtRange(l))),
                e
                    ? (this.editAttachment(e), !1)
                    : (this.setDocument(this.document.removeTextAtRange(l)),
                      this.setSelection(l[0]),
                      !n && !r && void 0)
            );
        }
        moveTextFromRange(t) {
            let [e] = Array.from(this.getSelectedRange());
            return (
                this.setDocument(
                    this.document.moveTextFromRangeToPosition(t, e)
                ),
                this.setSelection(e)
            );
        }
        removeAttachment(t) {
            let e = this.document.getRangeOfAttachment(t);
            if (e)
                return (
                    this.stopEditingAttachment(),
                    this.setDocument(this.document.removeTextAtRange(e)),
                    this.setSelection(e[0])
                );
        }
        removeLastBlockAttribute() {
            let [t, e] = Array.from(this.getSelectedRange()),
                n = this.document.getBlockAtPosition(e);
            return (
                this.removeCurrentAttribute(n.getLastAttribute()),
                this.setSelection(t)
            );
        }
        insertPlaceholder() {
            return (
                (this.placeholderPosition = this.getPosition()),
                this.insertString(" ")
            );
        }
        selectPlaceholder() {
            if (this.placeholderPosition != null)
                return (
                    this.setSelectedRange([
                        this.placeholderPosition,
                        this.placeholderPosition + 1,
                    ]),
                    this.getSelectedRange()
                );
        }
        forgetPlaceholder() {
            this.placeholderPosition = null;
        }
        hasCurrentAttribute(t) {
            let e = this.currentAttributes[t];
            return e != null && e !== !1;
        }
        toggleCurrentAttribute(t) {
            let e = !this.currentAttributes[t];
            return e
                ? this.setCurrentAttribute(t, e)
                : this.removeCurrentAttribute(t);
        }
        canSetCurrentAttribute(t) {
            return L(t)
                ? this.canSetCurrentBlockAttribute(t)
                : this.canSetCurrentTextAttribute(t);
        }
        canSetCurrentTextAttribute(t) {
            let e = this.getSelectedDocument();
            if (e) {
                for (let n of Array.from(e.getAttachments()))
                    if (!n.hasContent()) return !1;
                return !0;
            }
        }
        canSetCurrentBlockAttribute(t) {
            let e = this.getBlock();
            if (e) return !e.isTerminalBlock();
        }
        setCurrentAttribute(t, e) {
            return L(t)
                ? this.setBlockAttribute(t, e)
                : (this.setTextAttribute(t, e),
                  (this.currentAttributes[t] = e),
                  this.notifyDelegateOfCurrentAttributesChange());
        }
        setHTMLAtributeAtPosition(t, e, n) {
            var r;
            let o = this.document.getBlockAtPosition(t),
                s =
                    (r = L(o.getLastAttribute())) === null || r === void 0
                        ? void 0
                        : r.htmlAttributes;
            if (o && s != null && s.includes(e)) {
                let l = this.document.setHTMLAttributeAtPosition(t, e, n);
                this.setDocument(l);
            }
        }
        setTextAttribute(t, e) {
            let n = this.getSelectedRange();
            if (!n) return;
            let [r, o] = Array.from(n);
            if (r !== o)
                return this.setDocument(
                    this.document.addAttributeAtRange(t, e, n)
                );
            if (t === "href") {
                let s = K.textForStringWithAttributes(e, { href: e });
                return this.insertText(s);
            }
        }
        setBlockAttribute(t, e) {
            let n = this.getSelectedRange();
            if (this.canSetCurrentAttribute(t))
                return (
                    this.setDocument(
                        this.document.applyBlockAttributeAtRange(t, e, n)
                    ),
                    this.setSelection(n)
                );
        }
        removeCurrentAttribute(t) {
            return L(t)
                ? (this.removeBlockAttribute(t), this.updateCurrentAttributes())
                : (this.removeTextAttribute(t),
                  delete this.currentAttributes[t],
                  this.notifyDelegateOfCurrentAttributesChange());
        }
        removeTextAttribute(t) {
            let e = this.getSelectedRange();
            if (e)
                return this.setDocument(
                    this.document.removeAttributeAtRange(t, e)
                );
        }
        removeBlockAttribute(t) {
            let e = this.getSelectedRange();
            if (e)
                return this.setDocument(
                    this.document.removeAttributeAtRange(t, e)
                );
        }
        canDecreaseNestingLevel() {
            var t;
            return (
                ((t = this.getBlock()) === null || t === void 0
                    ? void 0
                    : t.getNestingLevel()) > 0
            );
        }
        canIncreaseNestingLevel() {
            var t;
            let e = this.getBlock();
            if (e) {
                if (
                    (t = L(e.getLastNestableAttribute())) === null ||
                    t === void 0 ||
                    !t.listAttribute
                )
                    return e.getNestingLevel() > 0;
                {
                    let n = this.getPreviousBlock();
                    if (n)
                        return (function () {
                            let r =
                                arguments.length > 1 && arguments[1] !== void 0
                                    ? arguments[1]
                                    : [];
                            return Ft(
                                (arguments.length > 0 && arguments[0] !== void 0
                                    ? arguments[0]
                                    : []
                                ).slice(0, r.length),
                                r
                            );
                        })(
                            n.getListItemAttributes(),
                            e.getListItemAttributes()
                        );
                }
            }
        }
        decreaseNestingLevel() {
            let t = this.getBlock();
            if (t)
                return this.setDocument(
                    this.document.replaceBlock(t, t.decreaseNestingLevel())
                );
        }
        increaseNestingLevel() {
            let t = this.getBlock();
            if (t)
                return this.setDocument(
                    this.document.replaceBlock(t, t.increaseNestingLevel())
                );
        }
        canDecreaseBlockAttributeLevel() {
            var t;
            return (
                ((t = this.getBlock()) === null || t === void 0
                    ? void 0
                    : t.getAttributeLevel()) > 0
            );
        }
        decreaseBlockAttributeLevel() {
            var t;
            let e =
                (t = this.getBlock()) === null || t === void 0
                    ? void 0
                    : t.getLastAttribute();
            if (e) return this.removeCurrentAttribute(e);
        }
        decreaseListLevel() {
            let [t] = Array.from(this.getSelectedRange()),
                { index: e } = this.document.locationFromPosition(t),
                n = e,
                r = this.getBlock().getAttributeLevel(),
                o = this.document.getBlockAtIndex(n + 1);
            for (; o && o.isListItem() && !(o.getAttributeLevel() <= r); )
                n++, (o = this.document.getBlockAtIndex(n + 1));
            t = this.document.positionFromLocation({ index: e, offset: 0 });
            let s = this.document.positionFromLocation({ index: n, offset: 0 });
            return this.setDocument(
                this.document.removeLastListAttributeAtRange([t, s])
            );
        }
        updateCurrentAttributes() {
            let t = this.getSelectedRange({ ignoreLock: !0 });
            if (t) {
                let e = this.document.getCommonAttributesAtRange(t);
                if (
                    (Array.from(Qn()).forEach((n) => {
                        e[n] || this.canSetCurrentAttribute(n) || (e[n] = !1);
                    }),
                    !Xt(e, this.currentAttributes))
                )
                    return (
                        (this.currentAttributes = e),
                        this.notifyDelegateOfCurrentAttributesChange()
                    );
            }
        }
        getCurrentAttributes() {
            return Lr.call({}, this.currentAttributes);
        }
        getCurrentTextAttributes() {
            let t = {};
            for (let e in this.currentAttributes) {
                let n = this.currentAttributes[e];
                n !== !1 && Zn(e) && (t[e] = n);
            }
            return t;
        }
        freezeSelection() {
            return this.setCurrentAttribute("frozen", !0);
        }
        thawSelection() {
            return this.removeCurrentAttribute("frozen");
        }
        hasFrozenSelection() {
            return this.hasCurrentAttribute("frozen");
        }
        setSelection(t) {
            var e;
            let n = this.document.locationRangeFromRange(t);
            return (e = this.delegate) === null || e === void 0
                ? void 0
                : e.compositionDidRequestChangingSelectionToLocationRange(n);
        }
        getSelectedRange() {
            let t = this.getLocationRange();
            if (t) return this.document.rangeFromLocationRange(t);
        }
        setSelectedRange(t) {
            let e = this.document.locationRangeFromRange(t);
            return this.getSelectionManager().setLocationRange(e);
        }
        getPosition() {
            let t = this.getLocationRange();
            if (t) return this.document.positionFromLocation(t[0]);
        }
        getLocationRange(t) {
            return this.targetLocationRange
                ? this.targetLocationRange
                : this.getSelectionManager().getLocationRange(t) ||
                      y({ index: 0, offset: 0 });
        }
        withTargetLocationRange(t, e) {
            let n;
            this.targetLocationRange = t;
            try {
                n = e();
            } finally {
                this.targetLocationRange = null;
            }
            return n;
        }
        withTargetRange(t, e) {
            let n = this.document.locationRangeFromRange(t);
            return this.withTargetLocationRange(n, e);
        }
        withTargetDOMRange(t, e) {
            let n = this.createLocationRangeFromDOMRange(t, { strict: !1 });
            return this.withTargetLocationRange(n, e);
        }
        getExpandedRangeInDirection(t) {
            let { length: e } =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : {},
                [n, r] = Array.from(this.getSelectedRange());
            return (
                t === "backward"
                    ? e
                        ? (n -= e)
                        : (n = this.translateUTF16PositionFromOffset(n, -1))
                    : e
                    ? (r += e)
                    : (r = this.translateUTF16PositionFromOffset(r, 1)),
                y([n, r])
            );
        }
        shouldManageMovingCursorInDirection(t) {
            if (this.editingAttachment) return !0;
            let e = this.getExpandedRangeInDirection(t);
            return this.getAttachmentAtRange(e) != null;
        }
        moveCursorInDirection(t) {
            let e, n;
            if (this.editingAttachment)
                n = this.document.getRangeOfAttachment(this.editingAttachment);
            else {
                let r = this.getSelectedRange();
                (n = this.getExpandedRangeInDirection(t)), (e = !We(r, n));
            }
            if (
                (t === "backward"
                    ? this.setSelectedRange(n[0])
                    : this.setSelectedRange(n[1]),
                e)
            ) {
                let r = this.getAttachmentAtRange(n);
                if (r) return this.editAttachment(r);
            }
        }
        expandSelectionInDirection(t) {
            let { length: e } =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : {},
                n = this.getExpandedRangeInDirection(t, { length: e });
            return this.setSelectedRange(n);
        }
        expandSelectionForEditing() {
            if (this.hasCurrentAttribute("href"))
                return this.expandSelectionAroundCommonAttribute("href");
        }
        expandSelectionAroundCommonAttribute(t) {
            let e = this.getPosition(),
                n = this.document.getRangeOfCommonAttributeAtPosition(t, e);
            return this.setSelectedRange(n);
        }
        selectionContainsAttachments() {
            var t;
            return (
                ((t = this.getSelectedAttachments()) === null || t === void 0
                    ? void 0
                    : t.length) > 0
            );
        }
        selectionIsInCursorTarget() {
            return (
                this.editingAttachment ||
                this.positionIsCursorTarget(this.getPosition())
            );
        }
        positionIsCursorTarget(t) {
            let e = this.document.locationFromPosition(t);
            if (e) return this.locationIsCursorTarget(e);
        }
        positionIsBlockBreak(t) {
            var e;
            return (e = this.document.getPieceAtPosition(t)) === null ||
                e === void 0
                ? void 0
                : e.isBlockBreak();
        }
        getSelectedDocument() {
            let t = this.getSelectedRange();
            if (t) return this.document.getDocumentAtRange(t);
        }
        getSelectedAttachments() {
            var t;
            return (t = this.getSelectedDocument()) === null || t === void 0
                ? void 0
                : t.getAttachments();
        }
        getAttachments() {
            return this.attachments.slice(0);
        }
        refreshAttachments() {
            let t = this.document.getAttachments(),
                { added: e, removed: n } = (function () {
                    let r =
                            arguments.length > 0 && arguments[0] !== void 0
                                ? arguments[0]
                                : [],
                        o =
                            arguments.length > 1 && arguments[1] !== void 0
                                ? arguments[1]
                                : [],
                        s = [],
                        l = [],
                        c = new Set();
                    r.forEach((d) => {
                        c.add(d);
                    });
                    let u = new Set();
                    return (
                        o.forEach((d) => {
                            u.add(d), c.has(d) || s.push(d);
                        }),
                        r.forEach((d) => {
                            u.has(d) || l.push(d);
                        }),
                        { added: s, removed: l }
                    );
                })(this.attachments, t);
            return (
                (this.attachments = t),
                Array.from(n).forEach((r) => {
                    var o, s;
                    (r.delegate = null),
                        (o = this.delegate) === null ||
                            o === void 0 ||
                            (s = o.compositionDidRemoveAttachment) === null ||
                            s === void 0 ||
                            s.call(o, r);
                }),
                (() => {
                    let r = [];
                    return (
                        Array.from(e).forEach((o) => {
                            var s, l;
                            (o.delegate = this),
                                r.push(
                                    (s = this.delegate) === null ||
                                        s === void 0 ||
                                        (l = s.compositionDidAddAttachment) ===
                                            null ||
                                        l === void 0
                                        ? void 0
                                        : l.call(s, o)
                                );
                        }),
                        r
                    );
                })()
            );
        }
        attachmentDidChangeAttributes(t) {
            var e, n;
            return (
                this.revision++,
                (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.compositionDidEditAttachment) === null ||
                n === void 0
                    ? void 0
                    : n.call(e, t)
            );
        }
        attachmentDidChangePreviewURL(t) {
            var e, n;
            return (
                this.revision++,
                (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.compositionDidChangeAttachmentPreviewURL) === null ||
                n === void 0
                    ? void 0
                    : n.call(e, t)
            );
        }
        editAttachment(t, e) {
            var n, r;
            if (t !== this.editingAttachment)
                return (
                    this.stopEditingAttachment(),
                    (this.editingAttachment = t),
                    (n = this.delegate) === null ||
                    n === void 0 ||
                    (r = n.compositionDidStartEditingAttachment) === null ||
                    r === void 0
                        ? void 0
                        : r.call(n, this.editingAttachment, e)
                );
        }
        stopEditingAttachment() {
            var t, e;
            this.editingAttachment &&
                ((t = this.delegate) === null ||
                    t === void 0 ||
                    (e = t.compositionDidStopEditingAttachment) === null ||
                    e === void 0 ||
                    e.call(t, this.editingAttachment),
                (this.editingAttachment = null));
        }
        updateAttributesForAttachment(t, e) {
            return this.setDocument(
                this.document.updateAttributesForAttachment(t, e)
            );
        }
        removeAttributeForAttachment(t, e) {
            return this.setDocument(
                this.document.removeAttributeForAttachment(t, e)
            );
        }
        breakFormattedBlock(t) {
            let { document: e } = t,
                { block: n } = t,
                r = t.startPosition,
                o = [r - 1, r];
            n.getBlockBreakPosition() === t.startLocation.offset
                ? (n.breaksOnReturn() &&
                  t.nextCharacter ===
                      `
`
                      ? (r += 1)
                      : (e = e.removeTextAtRange(o)),
                  (o = [r, r]))
                : t.nextCharacter ===
                  `
`
                ? t.previousCharacter ===
                  `
`
                    ? (o = [r - 1, r + 1])
                    : ((o = [r, r + 1]), (r += 1))
                : t.startLocation.offset - 1 != 0 && (r += 1);
            let s = new z([n.removeLastAttribute().copyWithoutText()]);
            return (
                this.setDocument(e.insertDocumentAtRange(s, o)),
                this.setSelection(r)
            );
        }
        getPreviousBlock() {
            let t = this.getLocationRange();
            if (t) {
                let { index: e } = t[0];
                if (e > 0) return this.document.getBlockAtIndex(e - 1);
            }
        }
        getBlock() {
            let t = this.getLocationRange();
            if (t) return this.document.getBlockAtIndex(t[0].index);
        }
        getAttachmentAtRange(t) {
            let e = this.document.getDocumentAtRange(t);
            if (
                e.toString() ===
                "".concat(
                    "\uFFFC",
                    `
`
                )
            )
                return e.getAttachments()[0];
        }
        notifyDelegateOfCurrentAttributesChange() {
            var t, e;
            return (t = this.delegate) === null ||
                t === void 0 ||
                (e = t.compositionDidChangeCurrentAttributes) === null ||
                e === void 0
                ? void 0
                : e.call(t, this.currentAttributes);
        }
        notifyDelegateOfInsertionAtRange(t) {
            var e, n;
            return (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.compositionDidPerformInsertionAtRange) === null ||
                n === void 0
                ? void 0
                : n.call(e, t);
        }
        translateUTF16PositionFromOffset(t, e) {
            let n = this.document.toUTF16String(),
                r = n.offsetFromUCS2Offset(t);
            return n.offsetToUCS2Offset(r + e);
        }
    };
rt.proxyMethod("getSelectionManager().getPointRange"),
    rt.proxyMethod("getSelectionManager().setLocationRangeFromPointRange"),
    rt.proxyMethod("getSelectionManager().createLocationRangeFromDOMRange"),
    rt.proxyMethod("getSelectionManager().locationIsCursorTarget"),
    rt.proxyMethod("getSelectionManager().selectionIsExpanded"),
    rt.proxyMethod("delegate?.getSelectionManager");
var Ae = class extends R {
        constructor(t) {
            super(...arguments),
                (this.composition = t),
                (this.undoEntries = []),
                (this.redoEntries = []);
        }
        recordUndoEntry(t) {
            let { context: e, consolidatable: n } =
                    arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : {},
                r = this.undoEntries.slice(-1)[0];
            if (!n || !Ds(r, t, e)) {
                let o = this.createEntry({ description: t, context: e });
                this.undoEntries.push(o), (this.redoEntries = []);
            }
        }
        undo() {
            let t = this.undoEntries.pop();
            if (t) {
                let e = this.createEntry(t);
                return (
                    this.redoEntries.push(e),
                    this.composition.loadSnapshot(t.snapshot)
                );
            }
        }
        redo() {
            let t = this.redoEntries.pop();
            if (t) {
                let e = this.createEntry(t);
                return (
                    this.undoEntries.push(e),
                    this.composition.loadSnapshot(t.snapshot)
                );
            }
        }
        canUndo() {
            return this.undoEntries.length > 0;
        }
        canRedo() {
            return this.redoEntries.length > 0;
        }
        createEntry() {
            let { description: t, context: e } =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
            return {
                description: t?.toString(),
                context: JSON.stringify(e),
                snapshot: this.composition.getSnapshot(),
            };
        }
    },
    Ds = (i, t, e) =>
        i?.description === t?.toString() && i?.context === JSON.stringify(e),
    jn = "attachmentGallery",
    Ye = class {
        constructor(t) {
            (this.document = t.document),
                (this.selectedRange = t.selectedRange);
        }
        perform() {
            return this.removeBlockAttribute(), this.applyBlockAttribute();
        }
        getSnapshot() {
            return {
                document: this.document,
                selectedRange: this.selectedRange,
            };
        }
        removeBlockAttribute() {
            return this.findRangesOfBlocks().map(
                (t) =>
                    (this.document = this.document.removeAttributeAtRange(
                        jn,
                        t
                    ))
            );
        }
        applyBlockAttribute() {
            let t = 0;
            this.findRangesOfPieces().forEach((e) => {
                e[1] - e[0] > 1 &&
                    ((e[0] += t),
                    (e[1] += t),
                    this.document.getCharacterAtPosition(e[1]) !==
                        `
` &&
                        ((this.document = this.document.insertBlockBreakAtRange(
                            e[1]
                        )),
                        e[1] < this.selectedRange[1] &&
                            this.moveSelectedRangeForward(),
                        e[1]++,
                        t++),
                    e[0] !== 0 &&
                        this.document.getCharacterAtPosition(e[0] - 1) !==
                            `
` &&
                        ((this.document = this.document.insertBlockBreakAtRange(
                            e[0]
                        )),
                        e[0] < this.selectedRange[0] &&
                            this.moveSelectedRangeForward(),
                        e[0]++,
                        t++),
                    (this.document = this.document.applyBlockAttributeAtRange(
                        jn,
                        !0,
                        e
                    )));
            });
        }
        findRangesOfBlocks() {
            return this.document.findRangesForBlockAttribute(jn);
        }
        findRangesOfPieces() {
            return this.document.findRangesForTextAttribute("presentation", {
                withValue: "gallery",
            });
        }
        moveSelectedRangeForward() {
            (this.selectedRange[0] += 1), (this.selectedRange[1] += 1);
        }
    },
    Kr = function (i) {
        let t = new Ye(i);
        return t.perform(), t.getSnapshot();
    },
    Ns = [Kr],
    $e = class {
        constructor(t, e, n) {
            (this.insertFiles = this.insertFiles.bind(this)),
                (this.composition = t),
                (this.selectionManager = e),
                (this.element = n),
                (this.undoManager = new Ae(this.composition)),
                (this.filters = Ns.slice(0));
        }
        loadDocument(t) {
            return this.loadSnapshot({ document: t, selectedRange: [0, 0] });
        }
        loadHTML() {
            let t =
                    arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : "",
                e = Mt.parse(t, {
                    referenceElement: this.element,
                }).getDocument();
            return this.loadDocument(e);
        }
        loadJSON(t) {
            let { document: e, selectedRange: n } = t;
            return (
                (e = z.fromJSON(e)),
                this.loadSnapshot({ document: e, selectedRange: n })
            );
        }
        loadSnapshot(t) {
            return (
                (this.undoManager = new Ae(this.composition)),
                this.composition.loadSnapshot(t)
            );
        }
        getDocument() {
            return this.composition.document;
        }
        getSelectedDocument() {
            return this.composition.getSelectedDocument();
        }
        getSnapshot() {
            return this.composition.getSnapshot();
        }
        toJSON() {
            return this.getSnapshot();
        }
        deleteInDirection(t) {
            return this.composition.deleteInDirection(t);
        }
        insertAttachment(t) {
            return this.composition.insertAttachment(t);
        }
        insertAttachments(t) {
            return this.composition.insertAttachments(t);
        }
        insertDocument(t) {
            return this.composition.insertDocument(t);
        }
        insertFile(t) {
            return this.composition.insertFile(t);
        }
        insertFiles(t) {
            return this.composition.insertFiles(t);
        }
        insertHTML(t) {
            return this.composition.insertHTML(t);
        }
        insertString(t) {
            return this.composition.insertString(t);
        }
        insertText(t) {
            return this.composition.insertText(t);
        }
        insertLineBreak() {
            return this.composition.insertLineBreak();
        }
        getSelectedRange() {
            return this.composition.getSelectedRange();
        }
        getPosition() {
            return this.composition.getPosition();
        }
        getClientRectAtPosition(t) {
            let e = this.getDocument().locationRangeFromRange([t, t + 1]);
            return this.selectionManager.getClientRectAtLocationRange(e);
        }
        expandSelectionInDirection(t) {
            return this.composition.expandSelectionInDirection(t);
        }
        moveCursorInDirection(t) {
            return this.composition.moveCursorInDirection(t);
        }
        setSelectedRange(t) {
            return this.composition.setSelectedRange(t);
        }
        activateAttribute(t) {
            let e =
                !(arguments.length > 1 && arguments[1] !== void 0) ||
                arguments[1];
            return this.composition.setCurrentAttribute(t, e);
        }
        attributeIsActive(t) {
            return this.composition.hasCurrentAttribute(t);
        }
        canActivateAttribute(t) {
            return this.composition.canSetCurrentAttribute(t);
        }
        deactivateAttribute(t) {
            return this.composition.removeCurrentAttribute(t);
        }
        setHTMLAtributeAtPosition(t, e, n) {
            this.composition.setHTMLAtributeAtPosition(t, e, n);
        }
        canDecreaseNestingLevel() {
            return this.composition.canDecreaseNestingLevel();
        }
        canIncreaseNestingLevel() {
            return this.composition.canIncreaseNestingLevel();
        }
        decreaseNestingLevel() {
            if (this.canDecreaseNestingLevel())
                return this.composition.decreaseNestingLevel();
        }
        increaseNestingLevel() {
            if (this.canIncreaseNestingLevel())
                return this.composition.increaseNestingLevel();
        }
        canRedo() {
            return this.undoManager.canRedo();
        }
        canUndo() {
            return this.undoManager.canUndo();
        }
        recordUndoEntry(t) {
            let { context: e, consolidatable: n } =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {};
            return this.undoManager.recordUndoEntry(t, {
                context: e,
                consolidatable: n,
            });
        }
        redo() {
            if (this.canRedo()) return this.undoManager.redo();
        }
        undo() {
            if (this.canUndo()) return this.undoManager.undo();
        }
    },
    Xe = class {
        constructor(t) {
            this.element = t;
        }
        findLocationFromContainerAndOffset(t, e) {
            let { strict: n } =
                    arguments.length > 2 && arguments[2] !== void 0
                        ? arguments[2]
                        : { strict: !0 },
                r = 0,
                o = !1,
                s = { index: 0, offset: 0 },
                l = this.findAttachmentElementParentForNode(t);
            l && ((t = l.parentNode), (e = Sn(l)));
            let c = je(this.element, { usingFilter: Gr });
            for (; c.nextNode(); ) {
                let u = c.currentNode;
                if (u === t && ge(t)) {
                    qt(u) || (s.offset += e);
                    break;
                }
                if (u.parentNode === t) {
                    if (r++ === e) break;
                } else if (!Tt(t, u) && r > 0) break;
                Yi(u, { strict: n })
                    ? (o && s.index++, (s.offset = 0), (o = !0))
                    : (s.offset += Wn(u));
            }
            return s;
        }
        findContainerAndOffsetFromLocation(t) {
            let e, n;
            if (t.index === 0 && t.offset === 0) {
                for (e = this.element, n = 0; e.firstChild; )
                    if (((e = e.firstChild), kn(e))) {
                        n = 1;
                        break;
                    }
                return [e, n];
            }
            let [r, o] = this.findNodeAndOffsetFromLocation(t);
            if (r) {
                if (ge(r))
                    Wn(r) === 0
                        ? ((e = r.parentNode.parentNode),
                          (n = Sn(r.parentNode)),
                          qt(r, { name: "right" }) && n++)
                        : ((e = r), (n = t.offset - o));
                else {
                    if (((e = r.parentNode), !Yi(r.previousSibling) && !kn(e)))
                        for (
                            ;
                            r === e.lastChild &&
                            ((r = e), (e = e.parentNode), !kn(e));

                        );
                    (n = Sn(r)), t.offset !== 0 && n++;
                }
                return [e, n];
            }
        }
        findNodeAndOffsetFromLocation(t) {
            let e,
                n,
                r = 0;
            for (let o of this.getSignificantNodesForIndex(t.index)) {
                let s = Wn(o);
                if (t.offset <= r + s)
                    if (ge(o)) {
                        if (((e = o), (n = r), t.offset === n && qt(e))) break;
                    } else e || ((e = o), (n = r));
                if (((r += s), r > t.offset)) break;
            }
            return [e, n];
        }
        findAttachmentElementParentForNode(t) {
            for (; t && t !== this.element; ) {
                if (Lt(t)) return t;
                t = t.parentNode;
            }
        }
        getSignificantNodesForIndex(t) {
            let e = [],
                n = je(this.element, { usingFilter: Is }),
                r = !1;
            for (; n.nextNode(); ) {
                let s = n.currentNode;
                var o;
                if (Ht(s)) {
                    if ((o != null ? o++ : (o = 0), o === t)) r = !0;
                    else if (r) break;
                } else r && e.push(s);
            }
            return e;
        }
    },
    Wn = function (i) {
        return i.nodeType === Node.TEXT_NODE
            ? qt(i)
                ? 0
                : i.textContent.length
            : j(i) === "br" || Lt(i)
            ? 1
            : 0;
    },
    Is = function (i) {
        return Os(i) === NodeFilter.FILTER_ACCEPT
            ? Gr(i)
            : NodeFilter.FILTER_REJECT;
    },
    Os = function (i) {
        return Nr(i) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
    Gr = function (i) {
        return Lt(i.parentNode)
            ? NodeFilter.FILTER_REJECT
            : NodeFilter.FILTER_ACCEPT;
    },
    Qe = class {
        createDOMRangeFromPoint(t) {
            let e,
                { x: n, y: r } = t;
            if (document.caretPositionFromPoint) {
                let { offsetNode: o, offset: s } =
                    document.caretPositionFromPoint(n, r);
                return (e = document.createRange()), e.setStart(o, s), e;
            }
            if (document.caretRangeFromPoint)
                return document.caretRangeFromPoint(n, r);
            if (document.body.createTextRange) {
                let o = me();
                try {
                    let s = document.body.createTextRange();
                    s.moveToPoint(n, r), s.select();
                } catch {}
                return (e = me()), _r(o), e;
            }
        }
        getClientRectsForDOMRange(t) {
            let e = Array.from(t.getClientRects());
            return [e[0], e[e.length - 1]];
        }
    },
    ut = class extends R {
        constructor(t) {
            super(...arguments),
                (this.didMouseDown = this.didMouseDown.bind(this)),
                (this.selectionDidChange = this.selectionDidChange.bind(this)),
                (this.element = t),
                (this.locationMapper = new Xe(this.element)),
                (this.pointMapper = new Qe()),
                (this.lockCount = 0),
                S("mousedown", {
                    onElement: this.element,
                    withCallback: this.didMouseDown,
                });
        }
        getLocationRange() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
            return t.strict === !1
                ? this.createLocationRangeFromDOMRange(me())
                : t.ignoreLock
                ? this.currentLocationRange
                : this.lockedLocationRange
                ? this.lockedLocationRange
                : this.currentLocationRange;
        }
        setLocationRange(t) {
            if (this.lockedLocationRange) return;
            t = y(t);
            let e = this.createDOMRangeFromLocationRange(t);
            e && (_r(e), this.updateCurrentLocationRange(t));
        }
        setLocationRangeFromPointRange(t) {
            t = y(t);
            let e = this.getLocationAtPoint(t[0]),
                n = this.getLocationAtPoint(t[1]);
            this.setLocationRange([e, n]);
        }
        getClientRectAtLocationRange(t) {
            let e = this.createDOMRangeFromLocationRange(t);
            if (e) return this.getClientRectsForDOMRange(e)[1];
        }
        locationIsCursorTarget(t) {
            let e = Array.from(this.findNodeAndOffsetFromLocation(t))[0];
            return qt(e);
        }
        lock() {
            this.lockCount++ == 0 &&
                (this.updateCurrentLocationRange(),
                (this.lockedLocationRange = this.getLocationRange()));
        }
        unlock() {
            if (--this.lockCount == 0) {
                let { lockedLocationRange: t } = this;
                if (((this.lockedLocationRange = null), t != null))
                    return this.setLocationRange(t);
            }
        }
        clearSelection() {
            var t;
            return (t = Br()) === null || t === void 0
                ? void 0
                : t.removeAllRanges();
        }
        selectionIsCollapsed() {
            var t;
            return (
                ((t = me()) === null || t === void 0 ? void 0 : t.collapsed) ===
                !0
            );
        }
        selectionIsExpanded() {
            return !this.selectionIsCollapsed();
        }
        createLocationRangeFromDOMRange(t, e) {
            if (t == null || !this.domRangeWithinElement(t)) return;
            let n = this.findLocationFromContainerAndOffset(
                t.startContainer,
                t.startOffset,
                e
            );
            if (!n) return;
            let r = t.collapsed
                ? void 0
                : this.findLocationFromContainerAndOffset(
                      t.endContainer,
                      t.endOffset,
                      e
                  );
            return y([n, r]);
        }
        didMouseDown() {
            return this.pauseTemporarily();
        }
        pauseTemporarily() {
            let t;
            this.paused = !0;
            let e = () => {
                    if (
                        ((this.paused = !1),
                        clearTimeout(n),
                        Array.from(t).forEach((r) => {
                            r.destroy();
                        }),
                        Tt(document, this.element))
                    )
                        return this.selectionDidChange();
                },
                n = setTimeout(e, 200);
            t = ["mousemove", "keydown"].map((r) =>
                S(r, { onElement: document, withCallback: e })
            );
        }
        selectionDidChange() {
            if (!this.paused && !pi(this.element))
                return this.updateCurrentLocationRange();
        }
        updateCurrentLocationRange(t) {
            var e, n;
            if (
                (t ?? (t = this.createLocationRangeFromDOMRange(me()))) &&
                !We(t, this.currentLocationRange)
            )
                return (
                    (this.currentLocationRange = t),
                    (e = this.delegate) === null ||
                    e === void 0 ||
                    (n = e.locationRangeDidChange) === null ||
                    n === void 0
                        ? void 0
                        : n.call(e, this.currentLocationRange.slice(0))
                );
        }
        createDOMRangeFromLocationRange(t) {
            let e = this.findContainerAndOffsetFromLocation(t[0]),
                n = ht(t)
                    ? e
                    : this.findContainerAndOffsetFromLocation(t[1]) || e;
            if (e != null && n != null) {
                let r = document.createRange();
                return (
                    r.setStart(...Array.from(e || [])),
                    r.setEnd(...Array.from(n || [])),
                    r
                );
            }
        }
        getLocationAtPoint(t) {
            let e = this.createDOMRangeFromPoint(t);
            var n;
            if (e)
                return (n = this.createLocationRangeFromDOMRange(e)) === null ||
                    n === void 0
                    ? void 0
                    : n[0];
        }
        domRangeWithinElement(t) {
            return t.collapsed
                ? Tt(this.element, t.startContainer)
                : Tt(this.element, t.startContainer) &&
                      Tt(this.element, t.endContainer);
        }
    };
ut.proxyMethod("locationMapper.findLocationFromContainerAndOffset"),
    ut.proxyMethod("locationMapper.findContainerAndOffsetFromLocation"),
    ut.proxyMethod("locationMapper.findNodeAndOffsetFromLocation"),
    ut.proxyMethod("pointMapper.createDOMRangeFromPoint"),
    ut.proxyMethod("pointMapper.getClientRectsForDOMRange");
var Yr = Object.freeze({
        __proto__: null,
        Attachment: yt,
        AttachmentManager: Ke,
        AttachmentPiece: xt,
        Block: Y,
        Composition: rt,
        Document: z,
        Editor: $e,
        HTMLParser: Mt,
        HTMLSanitizer: Kt,
        LineBreakInsertion: Ge,
        LocationMapper: Xe,
        ManagedAttachment: E,
        Piece: mt,
        PointMapper: Qe,
        SelectionManager: ut,
        SplittableList: Yt,
        StringPiece: ve,
        Text: K,
        UndoManager: Ae,
    }),
    Fs = Object.freeze({
        __proto__: null,
        ObjectView: gt,
        AttachmentView: be,
        BlockView: qe,
        DocumentView: Gt,
        PieceView: ze,
        PreviewableAttachmentView: Ve,
        TextView: He,
    }),
    { lang: Un, css: kt, keyNames: Ps } = Ce,
    Vn = function (i) {
        return function () {
            let t = i.apply(this, arguments);
            t.do(), this.undos || (this.undos = []), this.undos.push(t.undo);
        };
    },
    Ze = class extends R {
        constructor(t, e, n) {
            let r =
                arguments.length > 3 && arguments[3] !== void 0
                    ? arguments[3]
                    : {};
            super(...arguments),
                H(
                    this,
                    "makeElementMutable",
                    Vn(() => ({
                        do: () => {
                            this.element.dataset.trixMutable = !0;
                        },
                        undo: () => delete this.element.dataset.trixMutable,
                    }))
                ),
                H(
                    this,
                    "addToolbar",
                    Vn(() => {
                        let o = p({
                            tagName: "div",
                            className: kt.attachmentToolbar,
                            data: { trixMutable: !0 },
                            childNodes: p({
                                tagName: "div",
                                className: "trix-button-row",
                                childNodes: p({
                                    tagName: "span",
                                    className:
                                        "trix-button-group trix-button-group--actions",
                                    childNodes: p({
                                        tagName: "button",
                                        className:
                                            "trix-button trix-button--remove",
                                        textContent: Un.remove,
                                        attributes: { title: Un.remove },
                                        data: { trixAction: "remove" },
                                    }),
                                }),
                            }),
                        });
                        return (
                            this.attachment.isPreviewable() &&
                                o.appendChild(
                                    p({
                                        tagName: "div",
                                        className:
                                            kt.attachmentMetadataContainer,
                                        childNodes: p({
                                            tagName: "span",
                                            className: kt.attachmentMetadata,
                                            childNodes: [
                                                p({
                                                    tagName: "span",
                                                    className:
                                                        kt.attachmentName,
                                                    textContent:
                                                        this.attachment.getFilename(),
                                                    attributes: {
                                                        title: this.attachment.getFilename(),
                                                    },
                                                }),
                                                p({
                                                    tagName: "span",
                                                    className:
                                                        kt.attachmentSize,
                                                    textContent:
                                                        this.attachment.getFormattedFilesize(),
                                                }),
                                            ],
                                        }),
                                    })
                                ),
                            S("click", {
                                onElement: o,
                                withCallback: this.didClickToolbar,
                            }),
                            S("click", {
                                onElement: o,
                                matchingSelector: "[data-trix-action]",
                                withCallback: this.didClickActionButton,
                            }),
                            he("trix-attachment-before-toolbar", {
                                onElement: this.element,
                                attributes: {
                                    toolbar: o,
                                    attachment: this.attachment,
                                },
                            }),
                            {
                                do: () => this.element.appendChild(o),
                                undo: () => At(o),
                            }
                        );
                    })
                ),
                H(
                    this,
                    "installCaptionEditor",
                    Vn(() => {
                        let o = p({
                            tagName: "textarea",
                            className: kt.attachmentCaptionEditor,
                            attributes: { placeholder: Un.captionPlaceholder },
                            data: { trixMutable: !0 },
                        });
                        o.value = this.attachmentPiece.getCaption();
                        let s = o.cloneNode();
                        s.classList.add("trix-autoresize-clone"),
                            (s.tabIndex = -1);
                        let l = function () {
                            (s.value = o.value),
                                (o.style.height = s.scrollHeight + "px");
                        };
                        S("input", { onElement: o, withCallback: l }),
                            S("input", {
                                onElement: o,
                                withCallback: this.didInputCaption,
                            }),
                            S("keydown", {
                                onElement: o,
                                withCallback: this.didKeyDownCaption,
                            }),
                            S("change", {
                                onElement: o,
                                withCallback: this.didChangeCaption,
                            }),
                            S("blur", {
                                onElement: o,
                                withCallback: this.didBlurCaption,
                            });
                        let c = this.element.querySelector("figcaption"),
                            u = c.cloneNode();
                        return {
                            do: () => {
                                if (
                                    ((c.style.display = "none"),
                                    u.appendChild(o),
                                    u.appendChild(s),
                                    u.classList.add(
                                        "".concat(
                                            kt.attachmentCaption,
                                            "--editing"
                                        )
                                    ),
                                    c.parentElement.insertBefore(u, c),
                                    l(),
                                    this.options.editCaption)
                                )
                                    return vi(() => o.focus());
                            },
                            undo() {
                                At(u), (c.style.display = null);
                            },
                        };
                    })
                ),
                (this.didClickToolbar = this.didClickToolbar.bind(this)),
                (this.didClickActionButton =
                    this.didClickActionButton.bind(this)),
                (this.didKeyDownCaption = this.didKeyDownCaption.bind(this)),
                (this.didInputCaption = this.didInputCaption.bind(this)),
                (this.didChangeCaption = this.didChangeCaption.bind(this)),
                (this.didBlurCaption = this.didBlurCaption.bind(this)),
                (this.attachmentPiece = t),
                (this.element = e),
                (this.container = n),
                (this.options = r),
                (this.attachment = this.attachmentPiece.attachment),
                j(this.element) === "a" &&
                    (this.element = this.element.firstChild),
                this.install();
        }
        install() {
            this.makeElementMutable(),
                this.addToolbar(),
                this.attachment.isPreviewable() && this.installCaptionEditor();
        }
        uninstall() {
            var t;
            let e = this.undos.pop();
            for (this.savePendingCaption(); e; ) e(), (e = this.undos.pop());
            (t = this.delegate) === null ||
                t === void 0 ||
                t.didUninstallAttachmentEditor(this);
        }
        savePendingCaption() {
            if (this.pendingCaption != null) {
                let o = this.pendingCaption;
                var t, e, n, r;
                (this.pendingCaption = null),
                    o
                        ? (t = this.delegate) === null ||
                          t === void 0 ||
                          (e =
                              t.attachmentEditorDidRequestUpdatingAttributesForAttachment) ===
                              null ||
                          e === void 0 ||
                          e.call(t, { caption: o }, this.attachment)
                        : (n = this.delegate) === null ||
                          n === void 0 ||
                          (r =
                              n.attachmentEditorDidRequestRemovingAttributeForAttachment) ===
                              null ||
                          r === void 0 ||
                          r.call(n, "caption", this.attachment);
            }
        }
        didClickToolbar(t) {
            return t.preventDefault(), t.stopPropagation();
        }
        didClickActionButton(t) {
            var e;
            if (t.target.getAttribute("data-trix-action") === "remove")
                return (e = this.delegate) === null || e === void 0
                    ? void 0
                    : e.attachmentEditorDidRequestRemovalOfAttachment(
                          this.attachment
                      );
        }
        didKeyDownCaption(t) {
            var e, n;
            if (Ps[t.keyCode] === "return")
                return (
                    t.preventDefault(),
                    this.savePendingCaption(),
                    (e = this.delegate) === null ||
                    e === void 0 ||
                    (n = e.attachmentEditorDidRequestDeselectingAttachment) ===
                        null ||
                    n === void 0
                        ? void 0
                        : n.call(e, this.attachment)
                );
        }
        didInputCaption(t) {
            this.pendingCaption = t.target.value.replace(/\s/g, " ").trim();
        }
        didChangeCaption(t) {
            return this.savePendingCaption();
        }
        didBlurCaption(t) {
            return this.savePendingCaption();
        }
    },
    tn = class extends R {
        constructor(t, e) {
            super(...arguments),
                (this.didFocus = this.didFocus.bind(this)),
                (this.didBlur = this.didBlur.bind(this)),
                (this.didClickAttachment = this.didClickAttachment.bind(this)),
                (this.element = t),
                (this.composition = e),
                (this.documentView = new Gt(this.composition.document, {
                    element: this.element,
                })),
                S("focus", {
                    onElement: this.element,
                    withCallback: this.didFocus,
                }),
                S("blur", {
                    onElement: this.element,
                    withCallback: this.didBlur,
                }),
                S("click", {
                    onElement: this.element,
                    matchingSelector: "a[contenteditable=false]",
                    preventDefault: !0,
                }),
                S("mousedown", {
                    onElement: this.element,
                    matchingSelector: wt,
                    withCallback: this.didClickAttachment,
                }),
                S("click", {
                    onElement: this.element,
                    matchingSelector: "a".concat(wt),
                    preventDefault: !0,
                });
        }
        didFocus(t) {
            var e;
            let n = () => {
                var r, o;
                if (!this.focused)
                    return (
                        (this.focused = !0),
                        (r = this.delegate) === null ||
                        r === void 0 ||
                        (o = r.compositionControllerDidFocus) === null ||
                        o === void 0
                            ? void 0
                            : o.call(r)
                    );
            };
            return (
                ((e = this.blurPromise) === null || e === void 0
                    ? void 0
                    : e.then(n)) || n()
            );
        }
        didBlur(t) {
            this.blurPromise = new Promise((e) =>
                vi(() => {
                    var n, r;
                    return (
                        pi(this.element) ||
                            ((this.focused = null),
                            (n = this.delegate) === null ||
                                n === void 0 ||
                                (r = n.compositionControllerDidBlur) === null ||
                                r === void 0 ||
                                r.call(n)),
                        (this.blurPromise = null),
                        e()
                    );
                })
            );
        }
        didClickAttachment(t, e) {
            var n, r;
            let o = this.findAttachmentForElement(e),
                s = !!vt(t.target, { matchingSelector: "figcaption" });
            return (n = this.delegate) === null ||
                n === void 0 ||
                (r = n.compositionControllerDidSelectAttachment) === null ||
                r === void 0
                ? void 0
                : r.call(n, o, { editCaption: s });
        }
        getSerializableElement() {
            return this.isEditingAttachment()
                ? this.documentView.shadowElement
                : this.element;
        }
        render() {
            var t, e, n, r, o, s;
            return (
                this.revision !== this.composition.revision &&
                    (this.documentView.setDocument(this.composition.document),
                    this.documentView.render(),
                    (this.revision = this.composition.revision)),
                this.canSyncDocumentView() &&
                    !this.documentView.isSynced() &&
                    ((n = this.delegate) === null ||
                        n === void 0 ||
                        (r = n.compositionControllerWillSyncDocumentView) ===
                            null ||
                        r === void 0 ||
                        r.call(n),
                    this.documentView.sync(),
                    (o = this.delegate) === null ||
                        o === void 0 ||
                        (s = o.compositionControllerDidSyncDocumentView) ===
                            null ||
                        s === void 0 ||
                        s.call(o)),
                (t = this.delegate) === null ||
                t === void 0 ||
                (e = t.compositionControllerDidRender) === null ||
                e === void 0
                    ? void 0
                    : e.call(t)
            );
        }
        rerenderViewForObject(t) {
            return this.invalidateViewForObject(t), this.render();
        }
        invalidateViewForObject(t) {
            return this.documentView.invalidateViewForObject(t);
        }
        isViewCachingEnabled() {
            return this.documentView.isViewCachingEnabled();
        }
        enableViewCaching() {
            return this.documentView.enableViewCaching();
        }
        disableViewCaching() {
            return this.documentView.disableViewCaching();
        }
        refreshViewCache() {
            return this.documentView.garbageCollectCachedViews();
        }
        isEditingAttachment() {
            return !!this.attachmentEditor;
        }
        installAttachmentEditorForAttachment(t, e) {
            var n;
            if (
                ((n = this.attachmentEditor) === null || n === void 0
                    ? void 0
                    : n.attachment) === t
            )
                return;
            let r = this.documentView.findElementForObject(t);
            if (!r) return;
            this.uninstallAttachmentEditor();
            let o =
                this.composition.document.getAttachmentPieceForAttachment(t);
            (this.attachmentEditor = new Ze(o, r, this.element, e)),
                (this.attachmentEditor.delegate = this);
        }
        uninstallAttachmentEditor() {
            var t;
            return (t = this.attachmentEditor) === null || t === void 0
                ? void 0
                : t.uninstall();
        }
        didUninstallAttachmentEditor() {
            return (this.attachmentEditor = null), this.render();
        }
        attachmentEditorDidRequestUpdatingAttributesForAttachment(t, e) {
            var n, r;
            return (
                (n = this.delegate) === null ||
                    n === void 0 ||
                    (r = n.compositionControllerWillUpdateAttachment) ===
                        null ||
                    r === void 0 ||
                    r.call(n, e),
                this.composition.updateAttributesForAttachment(t, e)
            );
        }
        attachmentEditorDidRequestRemovingAttributeForAttachment(t, e) {
            var n, r;
            return (
                (n = this.delegate) === null ||
                    n === void 0 ||
                    (r = n.compositionControllerWillUpdateAttachment) ===
                        null ||
                    r === void 0 ||
                    r.call(n, e),
                this.composition.removeAttributeForAttachment(t, e)
            );
        }
        attachmentEditorDidRequestRemovalOfAttachment(t) {
            var e, n;
            return (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.compositionControllerDidRequestRemovalOfAttachment) ===
                    null ||
                n === void 0
                ? void 0
                : n.call(e, t);
        }
        attachmentEditorDidRequestDeselectingAttachment(t) {
            var e, n;
            return (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.compositionControllerDidRequestDeselectingAttachment) ===
                    null ||
                n === void 0
                ? void 0
                : n.call(e, t);
        }
        canSyncDocumentView() {
            return !this.isEditingAttachment();
        }
        findAttachmentForElement(t) {
            return this.composition.document.getAttachmentById(
                parseInt(t.dataset.trixId, 10)
            );
        }
    },
    en = class extends R {},
    $r = "data-trix-mutable",
    Ms = "[".concat($r, "]"),
    Bs = {
        attributes: !0,
        childList: !0,
        characterData: !0,
        characterDataOldValue: !0,
        subtree: !0,
    },
    nn = class extends R {
        constructor(t) {
            super(t),
                (this.didMutate = this.didMutate.bind(this)),
                (this.element = t),
                (this.observer = new window.MutationObserver(this.didMutate)),
                this.start();
        }
        start() {
            return this.reset(), this.observer.observe(this.element, Bs);
        }
        stop() {
            return this.observer.disconnect();
        }
        didMutate(t) {
            var e, n;
            if (
                (this.mutations.push(
                    ...Array.from(this.findSignificantMutations(t) || [])
                ),
                this.mutations.length)
            )
                return (
                    (e = this.delegate) === null ||
                        e === void 0 ||
                        (n = e.elementDidMutate) === null ||
                        n === void 0 ||
                        n.call(e, this.getMutationSummary()),
                    this.reset()
                );
        }
        reset() {
            this.mutations = [];
        }
        findSignificantMutations(t) {
            return t.filter((e) => this.mutationIsSignificant(e));
        }
        mutationIsSignificant(t) {
            if (this.nodeIsMutable(t.target)) return !1;
            for (let e of Array.from(this.nodesModifiedByMutation(t)))
                if (this.nodeIsSignificant(e)) return !0;
            return !1;
        }
        nodeIsSignificant(t) {
            return t !== this.element && !this.nodeIsMutable(t) && !Nr(t);
        }
        nodeIsMutable(t) {
            return vt(t, { matchingSelector: Ms });
        }
        nodesModifiedByMutation(t) {
            let e = [];
            switch (t.type) {
                case "attributes":
                    t.attributeName !== $r && e.push(t.target);
                    break;
                case "characterData":
                    e.push(t.target.parentNode), e.push(t.target);
                    break;
                case "childList":
                    e.push(...Array.from(t.addedNodes || [])),
                        e.push(...Array.from(t.removedNodes || []));
            }
            return e;
        }
        getMutationSummary() {
            return this.getTextMutationSummary();
        }
        getTextMutationSummary() {
            let { additions: t, deletions: e } =
                    this.getTextChangesFromCharacterData(),
                n = this.getTextChangesFromChildList();
            Array.from(n.additions).forEach((l) => {
                Array.from(t).includes(l) || t.push(l);
            }),
                e.push(...Array.from(n.deletions || []));
            let r = {},
                o = t.join("");
            o && (r.textAdded = o);
            let s = e.join("");
            return s && (r.textDeleted = s), r;
        }
        getMutationsByType(t) {
            return Array.from(this.mutations).filter((e) => e.type === t);
        }
        getTextChangesFromChildList() {
            let t,
                e,
                n = [],
                r = [];
            Array.from(this.getMutationsByType("childList")).forEach((l) => {
                n.push(...Array.from(l.addedNodes || [])),
                    r.push(...Array.from(l.removedNodes || []));
            }),
                n.length === 0 && r.length === 1 && Ht(r[0])
                    ? ((t = []),
                      (e = [
                          `
`,
                      ]))
                    : ((t = ai(n)), (e = ai(r)));
            let o = t.filter((l, c) => l !== e[c]).map(ue),
                s = e.filter((l, c) => l !== t[c]).map(ue);
            return { additions: o, deletions: s };
        }
        getTextChangesFromCharacterData() {
            let t,
                e,
                n = this.getMutationsByType("characterData");
            if (n.length) {
                let r = n[0],
                    o = n[n.length - 1],
                    s = (function (l, c) {
                        let u, d;
                        return (
                            (l = Ot.box(l)),
                            (c = Ot.box(c)).length < l.length
                                ? ([d, u] = er(l, c))
                                : ([u, d] = er(c, l)),
                            { added: u, removed: d }
                        );
                    })(ue(r.oldValue), ue(o.target.data));
                (t = s.added), (e = s.removed);
            }
            return { additions: t ? [t] : [], deletions: e ? [e] : [] };
        }
    },
    ai = function () {
        let i =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : [],
            t = [];
        for (let e of Array.from(i))
            switch (e.nodeType) {
                case Node.TEXT_NODE:
                    t.push(e.data);
                    break;
                case Node.ELEMENT_NODE:
                    j(e) === "br"
                        ? t.push(`
`)
                        : t.push(...Array.from(ai(e.childNodes) || []));
            }
        return t;
    },
    rn = class extends Jt {
        constructor(t) {
            super(...arguments), (this.file = t);
        }
        perform(t) {
            let e = new FileReader();
            return (
                (e.onerror = () => t(!1)),
                (e.onload = () => {
                    e.onerror = null;
                    try {
                        e.abort();
                    } catch {}
                    return t(!0, this.file);
                }),
                e.readAsArrayBuffer(this.file)
            );
        }
    },
    li = class {
        constructor(t) {
            this.element = t;
        }
        shouldIgnore(t) {
            return (
                !!xe.samsungAndroid &&
                ((this.previousEvent = this.event),
                (this.event = t),
                this.checkSamsungKeyboardBuggyModeStart(),
                this.checkSamsungKeyboardBuggyModeEnd(),
                this.buggyMode)
            );
        }
        checkSamsungKeyboardBuggyModeStart() {
            this.insertingLongTextAfterUnidentifiedChar() &&
                _s(this.element.innerText, this.event.data) &&
                ((this.buggyMode = !0), this.event.preventDefault());
        }
        checkSamsungKeyboardBuggyModeEnd() {
            this.buggyMode &&
                this.event.inputType !== "insertText" &&
                (this.buggyMode = !1);
        }
        insertingLongTextAfterUnidentifiedChar() {
            var t;
            return (
                this.isBeforeInputInsertText() &&
                this.previousEventWasUnidentifiedKeydown() &&
                ((t = this.event.data) === null || t === void 0
                    ? void 0
                    : t.length) > 50
            );
        }
        isBeforeInputInsertText() {
            return (
                this.event.type === "beforeinput" &&
                this.event.inputType === "insertText"
            );
        }
        previousEventWasUnidentifiedKeydown() {
            var t, e;
            return (
                ((t = this.previousEvent) === null || t === void 0
                    ? void 0
                    : t.type) === "keydown" &&
                ((e = this.previousEvent) === null || e === void 0
                    ? void 0
                    : e.key) === "Unidentified"
            );
        }
    },
    _s = (i, t) => Er(i) === Er(t),
    js = new RegExp(
        "(".concat("\uFFFC", "|").concat(an, "|").concat(bt, "|\\s)+"),
        "g"
    ),
    Er = (i) => i.replace(js, " ").trim(),
    $t = class extends R {
        constructor(t) {
            super(...arguments),
                (this.element = t),
                (this.mutationObserver = new nn(this.element)),
                (this.mutationObserver.delegate = this),
                (this.flakyKeyboardDetector = new li(this.element));
            for (let e in this.constructor.events)
                S(e, {
                    onElement: this.element,
                    withCallback: this.handlerFor(e),
                });
        }
        elementDidMutate(t) {}
        editorWillSyncDocumentView() {
            return this.mutationObserver.stop();
        }
        editorDidSyncDocumentView() {
            return this.mutationObserver.start();
        }
        requestRender() {
            var t, e;
            return (t = this.delegate) === null ||
                t === void 0 ||
                (e = t.inputControllerDidRequestRender) === null ||
                e === void 0
                ? void 0
                : e.call(t);
        }
        requestReparse() {
            var t, e;
            return (
                (t = this.delegate) === null ||
                    t === void 0 ||
                    (e = t.inputControllerDidRequestReparse) === null ||
                    e === void 0 ||
                    e.call(t),
                this.requestRender()
            );
        }
        attachFiles(t) {
            let e = Array.from(t).map((n) => new rn(n));
            return Promise.all(e).then((n) => {
                this.handleInput(function () {
                    var r, o;
                    return (
                        (r = this.delegate) === null ||
                            r === void 0 ||
                            r.inputControllerWillAttachFiles(),
                        (o = this.responder) === null ||
                            o === void 0 ||
                            o.insertFiles(n),
                        this.requestRender()
                    );
                });
            });
        }
        handlerFor(t) {
            return (e) => {
                e.defaultPrevented ||
                    this.handleInput(() => {
                        if (!pi(this.element)) {
                            if (this.flakyKeyboardDetector.shouldIgnore(e))
                                return;
                            (this.eventName = t),
                                this.constructor.events[t].call(this, e);
                        }
                    });
            };
        }
        handleInput(t) {
            try {
                var e;
                (e = this.delegate) === null ||
                    e === void 0 ||
                    e.inputControllerWillHandleInput(),
                    t.call(this);
            } finally {
                var n;
                (n = this.delegate) === null ||
                    n === void 0 ||
                    n.inputControllerDidHandleInput();
            }
        }
        createLinkHTML(t, e) {
            let n = document.createElement("a");
            return (n.href = t), (n.textContent = e || t), n.outerHTML;
        }
    },
    zn;
H($t, "events", {});
var { browser: Ws, keyNames: Xr } = Ce,
    Us = 0,
    Q = class extends $t {
        constructor() {
            super(...arguments), this.resetInputSummary();
        }
        setInputSummary() {
            let t =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : {};
            this.inputSummary.eventName = this.eventName;
            for (let e in t) {
                let n = t[e];
                this.inputSummary[e] = n;
            }
            return this.inputSummary;
        }
        resetInputSummary() {
            this.inputSummary = {};
        }
        reset() {
            return this.resetInputSummary(), Pt.reset();
        }
        elementDidMutate(t) {
            var e, n;
            return this.isComposing()
                ? (e = this.delegate) === null ||
                  e === void 0 ||
                  (n = e.inputControllerDidAllowUnhandledInput) === null ||
                  n === void 0
                    ? void 0
                    : n.call(e)
                : this.handleInput(function () {
                      return (
                          this.mutationIsSignificant(t) &&
                              (this.mutationIsExpected(t)
                                  ? this.requestRender()
                                  : this.requestReparse()),
                          this.reset()
                      );
                  });
        }
        mutationIsExpected(t) {
            let { textAdded: e, textDeleted: n } = t;
            if (this.inputSummary.preferDocument) return !0;
            let r =
                    e != null
                        ? e === this.inputSummary.textAdded
                        : !this.inputSummary.textAdded,
                o =
                    n != null
                        ? this.inputSummary.didDelete
                        : !this.inputSummary.didDelete,
                s =
                    [
                        `
`,
                        ` 
`,
                    ].includes(e) && !r,
                l =
                    n ===
                        `
` && !o;
            if ((s && !l) || (l && !s)) {
                let u = this.getSelectedRange();
                if (u) {
                    var c;
                    let d = s
                        ? e.replace(/\n$/, "").length || -1
                        : e?.length || 1;
                    if (
                        (c = this.responder) !== null &&
                        c !== void 0 &&
                        c.positionIsBlockBreak(u[1] + d)
                    )
                        return !0;
                }
            }
            return r && o;
        }
        mutationIsSignificant(t) {
            var e;
            let n = Object.keys(t).length > 0,
                r =
                    ((e = this.compositionInput) === null || e === void 0
                        ? void 0
                        : e.getEndData()) === "";
            return n || !r;
        }
        getCompositionInput() {
            if (this.isComposing()) return this.compositionInput;
            this.compositionInput = new it(this);
        }
        isComposing() {
            return this.compositionInput && !this.compositionInput.isEnded();
        }
        deleteInDirection(t, e) {
            var n;
            return ((n = this.responder) === null || n === void 0
                ? void 0
                : n.deleteInDirection(t)) !== !1
                ? this.setInputSummary({ didDelete: !0 })
                : e
                ? (e.preventDefault(), this.requestRender())
                : void 0;
        }
        serializeSelectionToDataTransfer(t) {
            var e;
            if (
                !(function (r) {
                    if (r == null || !r.setData) return !1;
                    for (let o in Qi) {
                        let s = Qi[o];
                        try {
                            if ((r.setData(o, s), !r.getData(o) === s))
                                return !1;
                        } catch {
                            return !1;
                        }
                    }
                    return !0;
                })(t)
            )
                return;
            let n =
                (e = this.responder) === null || e === void 0
                    ? void 0
                    : e.getSelectedDocument().toSerializableDocument();
            return (
                t.setData("application/x-trix-document", JSON.stringify(n)),
                t.setData("text/html", Gt.render(n).innerHTML),
                t.setData("text/plain", n.toString().replace(/\n$/, "")),
                !0
            );
        }
        canAcceptDataTransfer(t) {
            let e = {};
            return (
                Array.from(t?.types || []).forEach((n) => {
                    e[n] = !0;
                }),
                e.Files ||
                    e["application/x-trix-document"] ||
                    e["text/html"] ||
                    e["text/plain"]
            );
        }
        getPastedHTMLUsingHiddenElement(t) {
            let e = this.getSelectedRange(),
                n = {
                    position: "absolute",
                    left: "".concat(window.pageXOffset, "px"),
                    top: "".concat(window.pageYOffset, "px"),
                    opacity: 0,
                },
                r = p({ style: n, tagName: "div", editable: !0 });
            return (
                document.body.appendChild(r),
                r.focus(),
                requestAnimationFrame(() => {
                    let o = r.innerHTML;
                    return At(r), this.setSelectedRange(e), t(o);
                })
            );
        }
    };
H(Q, "events", {
    keydown(i) {
        this.isComposing() || this.resetInputSummary(),
            (this.inputSummary.didInput = !0);
        let t = Xr[i.keyCode];
        if (t) {
            var e;
            let r = this.keys;
            ["ctrl", "alt", "shift", "meta"].forEach((o) => {
                var s;
                i["".concat(o, "Key")] &&
                    (o === "ctrl" && (o = "control"),
                    (r = (s = r) === null || s === void 0 ? void 0 : s[o]));
            }),
                ((e = r) === null || e === void 0 ? void 0 : e[t]) != null &&
                    (this.setInputSummary({ keyName: t }),
                    Pt.reset(),
                    r[t].call(this, i));
        }
        if (Pr(i)) {
            let r = String.fromCharCode(i.keyCode).toLowerCase();
            if (r) {
                var n;
                let o = ["alt", "shift"]
                    .map((s) => {
                        if (i["".concat(s, "Key")]) return s;
                    })
                    .filter((s) => s);
                o.push(r),
                    (n = this.delegate) !== null &&
                        n !== void 0 &&
                        n.inputControllerDidReceiveKeyboardCommand(o) &&
                        i.preventDefault();
            }
        }
    },
    keypress(i) {
        if (
            this.inputSummary.eventName != null ||
            i.metaKey ||
            (i.ctrlKey && !i.altKey)
        )
            return;
        let t = Hs(i);
        var e, n;
        return t
            ? ((e = this.delegate) === null ||
                  e === void 0 ||
                  e.inputControllerWillPerformTyping(),
              (n = this.responder) === null ||
                  n === void 0 ||
                  n.insertString(t),
              this.setInputSummary({
                  textAdded: t,
                  didDelete: this.selectionIsExpanded(),
              }))
            : void 0;
    },
    textInput(i) {
        let { data: t } = i,
            { textAdded: e } = this.inputSummary;
        if (e && e !== t && e.toUpperCase() === t) {
            var n;
            let r = this.getSelectedRange();
            return (
                this.setSelectedRange([r[0], r[1] + e.length]),
                (n = this.responder) === null ||
                    n === void 0 ||
                    n.insertString(t),
                this.setInputSummary({ textAdded: t }),
                this.setSelectedRange(r)
            );
        }
    },
    dragenter(i) {
        i.preventDefault();
    },
    dragstart(i) {
        var t, e;
        return (
            this.serializeSelectionToDataTransfer(i.dataTransfer),
            (this.draggedRange = this.getSelectedRange()),
            (t = this.delegate) === null ||
            t === void 0 ||
            (e = t.inputControllerDidStartDrag) === null ||
            e === void 0
                ? void 0
                : e.call(t)
        );
    },
    dragover(i) {
        if (this.draggedRange || this.canAcceptDataTransfer(i.dataTransfer)) {
            i.preventDefault();
            let n = { x: i.clientX, y: i.clientY };
            var t, e;
            if (!Xt(n, this.draggingPoint))
                return (
                    (this.draggingPoint = n),
                    (t = this.delegate) === null ||
                    t === void 0 ||
                    (e = t.inputControllerDidReceiveDragOverPoint) === null ||
                    e === void 0
                        ? void 0
                        : e.call(t, this.draggingPoint)
                );
        }
    },
    dragend(i) {
        var t, e;
        (t = this.delegate) === null ||
            t === void 0 ||
            (e = t.inputControllerDidCancelDrag) === null ||
            e === void 0 ||
            e.call(t),
            (this.draggedRange = null),
            (this.draggingPoint = null);
    },
    drop(i) {
        var t, e;
        i.preventDefault();
        let n =
                (t = i.dataTransfer) === null || t === void 0
                    ? void 0
                    : t.files,
            r = i.dataTransfer.getData("application/x-trix-document"),
            o = { x: i.clientX, y: i.clientY };
        if (
            ((e = this.responder) === null ||
                e === void 0 ||
                e.setLocationRangeFromPointRange(o),
            n != null && n.length)
        )
            this.attachFiles(n);
        else if (this.draggedRange) {
            var s, l;
            (s = this.delegate) === null ||
                s === void 0 ||
                s.inputControllerWillMoveText(),
                (l = this.responder) === null ||
                    l === void 0 ||
                    l.moveTextFromRange(this.draggedRange),
                (this.draggedRange = null),
                this.requestRender();
        } else if (r) {
            var c;
            let u = z.fromJSONString(r);
            (c = this.responder) === null ||
                c === void 0 ||
                c.insertDocument(u),
                this.requestRender();
        }
        (this.draggedRange = null), (this.draggingPoint = null);
    },
    cut(i) {
        var t, e;
        if (
            (t = this.responder) !== null &&
            t !== void 0 &&
            t.selectionIsExpanded() &&
            (this.serializeSelectionToDataTransfer(i.clipboardData) &&
                i.preventDefault(),
            (e = this.delegate) === null ||
                e === void 0 ||
                e.inputControllerWillCutText(),
            this.deleteInDirection("backward"),
            i.defaultPrevented)
        )
            return this.requestRender();
    },
    copy(i) {
        var t;
        (t = this.responder) !== null &&
            t !== void 0 &&
            t.selectionIsExpanded() &&
            this.serializeSelectionToDataTransfer(i.clipboardData) &&
            i.preventDefault();
    },
    paste(i) {
        let t = i.clipboardData || i.testClipboardData,
            e = { clipboard: t };
        if (!t || qs(i))
            return void this.getPastedHTMLUsingHiddenElement((F) => {
                var k, ot, Et;
                return (
                    (e.type = "text/html"),
                    (e.html = F),
                    (k = this.delegate) === null ||
                        k === void 0 ||
                        k.inputControllerWillPaste(e),
                    (ot = this.responder) === null ||
                        ot === void 0 ||
                        ot.insertHTML(e.html),
                    this.requestRender(),
                    (Et = this.delegate) === null || Et === void 0
                        ? void 0
                        : Et.inputControllerDidPaste(e)
                );
            });
        let n = t.getData("URL"),
            r = t.getData("text/html"),
            o = t.getData("public.url-name");
        if (n) {
            var s, l, c;
            let F;
            (e.type = "text/html"),
                (F = o ? yi(o).trim() : n),
                (e.html = this.createLinkHTML(n, F)),
                (s = this.delegate) === null ||
                    s === void 0 ||
                    s.inputControllerWillPaste(e),
                this.setInputSummary({
                    textAdded: F,
                    didDelete: this.selectionIsExpanded(),
                }),
                (l = this.responder) === null ||
                    l === void 0 ||
                    l.insertHTML(e.html),
                this.requestRender(),
                (c = this.delegate) === null ||
                    c === void 0 ||
                    c.inputControllerDidPaste(e);
        } else if (Fr(t)) {
            var u, d, C;
            (e.type = "text/plain"),
                (e.string = t.getData("text/plain")),
                (u = this.delegate) === null ||
                    u === void 0 ||
                    u.inputControllerWillPaste(e),
                this.setInputSummary({
                    textAdded: e.string,
                    didDelete: this.selectionIsExpanded(),
                }),
                (d = this.responder) === null ||
                    d === void 0 ||
                    d.insertString(e.string),
                this.requestRender(),
                (C = this.delegate) === null ||
                    C === void 0 ||
                    C.inputControllerDidPaste(e);
        } else if (r) {
            var T, q, tt;
            (e.type = "text/html"),
                (e.html = r),
                (T = this.delegate) === null ||
                    T === void 0 ||
                    T.inputControllerWillPaste(e),
                (q = this.responder) === null ||
                    q === void 0 ||
                    q.insertHTML(e.html),
                this.requestRender(),
                (tt = this.delegate) === null ||
                    tt === void 0 ||
                    tt.inputControllerDidPaste(e);
        } else if (Array.from(t.types).includes("Files")) {
            var M, pt;
            let F =
                (M = t.items) === null ||
                M === void 0 ||
                (M = M[0]) === null ||
                M === void 0 ||
                (pt = M.getAsFile) === null ||
                pt === void 0
                    ? void 0
                    : pt.call(M);
            if (F) {
                var Ct, Qt, Zt;
                let k = Vs(F);
                !F.name &&
                    k &&
                    (F.name = "pasted-file-".concat(++Us, ".").concat(k)),
                    (e.type = "File"),
                    (e.file = F),
                    (Ct = this.delegate) === null ||
                        Ct === void 0 ||
                        Ct.inputControllerWillAttachFiles(),
                    (Qt = this.responder) === null ||
                        Qt === void 0 ||
                        Qt.insertFile(e.file),
                    this.requestRender(),
                    (Zt = this.delegate) === null ||
                        Zt === void 0 ||
                        Zt.inputControllerDidPaste(e);
            }
        }
        i.preventDefault();
    },
    compositionstart(i) {
        return this.getCompositionInput().start(i.data);
    },
    compositionupdate(i) {
        return this.getCompositionInput().update(i.data);
    },
    compositionend(i) {
        return this.getCompositionInput().end(i.data);
    },
    beforeinput(i) {
        this.inputSummary.didInput = !0;
    },
    input(i) {
        return (this.inputSummary.didInput = !0), i.stopPropagation();
    },
}),
    H(Q, "keys", {
        backspace(i) {
            var t;
            return (
                (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillPerformTyping(),
                this.deleteInDirection("backward", i)
            );
        },
        delete(i) {
            var t;
            return (
                (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillPerformTyping(),
                this.deleteInDirection("forward", i)
            );
        },
        return(i) {
            var t, e;
            return (
                this.setInputSummary({ preferDocument: !0 }),
                (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillPerformTyping(),
                (e = this.responder) === null || e === void 0
                    ? void 0
                    : e.insertLineBreak()
            );
        },
        tab(i) {
            var t, e;
            (t = this.responder) !== null &&
                t !== void 0 &&
                t.canIncreaseNestingLevel() &&
                ((e = this.responder) === null ||
                    e === void 0 ||
                    e.increaseNestingLevel(),
                this.requestRender(),
                i.preventDefault());
        },
        left(i) {
            var t;
            if (this.selectionIsInCursorTarget())
                return (
                    i.preventDefault(),
                    (t = this.responder) === null || t === void 0
                        ? void 0
                        : t.moveCursorInDirection("backward")
                );
        },
        right(i) {
            var t;
            if (this.selectionIsInCursorTarget())
                return (
                    i.preventDefault(),
                    (t = this.responder) === null || t === void 0
                        ? void 0
                        : t.moveCursorInDirection("forward")
                );
        },
        control: {
            d(i) {
                var t;
                return (
                    (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillPerformTyping(),
                    this.deleteInDirection("forward", i)
                );
            },
            h(i) {
                var t;
                return (
                    (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillPerformTyping(),
                    this.deleteInDirection("backward", i)
                );
            },
            o(i) {
                var t, e;
                return (
                    i.preventDefault(),
                    (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillPerformTyping(),
                    (e = this.responder) === null ||
                        e === void 0 ||
                        e.insertString(
                            `
`,
                            { updatePosition: !1 }
                        ),
                    this.requestRender()
                );
            },
        },
        shift: {
            return(i) {
                var t, e;
                (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillPerformTyping(),
                    (e = this.responder) === null ||
                        e === void 0 ||
                        e.insertString(`
`),
                    this.requestRender(),
                    i.preventDefault();
            },
            tab(i) {
                var t, e;
                (t = this.responder) !== null &&
                    t !== void 0 &&
                    t.canDecreaseNestingLevel() &&
                    ((e = this.responder) === null ||
                        e === void 0 ||
                        e.decreaseNestingLevel(),
                    this.requestRender(),
                    i.preventDefault());
            },
            left(i) {
                if (this.selectionIsInCursorTarget())
                    return (
                        i.preventDefault(),
                        this.expandSelectionInDirection("backward")
                    );
            },
            right(i) {
                if (this.selectionIsInCursorTarget())
                    return (
                        i.preventDefault(),
                        this.expandSelectionInDirection("forward")
                    );
            },
        },
        alt: {
            backspace(i) {
                var t;
                return (
                    this.setInputSummary({ preferDocument: !1 }),
                    (t = this.delegate) === null || t === void 0
                        ? void 0
                        : t.inputControllerWillPerformTyping()
                );
            },
        },
        meta: {
            backspace(i) {
                var t;
                return (
                    this.setInputSummary({ preferDocument: !1 }),
                    (t = this.delegate) === null || t === void 0
                        ? void 0
                        : t.inputControllerWillPerformTyping()
                );
            },
        },
    }),
    Q.proxyMethod("responder?.getSelectedRange"),
    Q.proxyMethod("responder?.setSelectedRange"),
    Q.proxyMethod("responder?.expandSelectionInDirection"),
    Q.proxyMethod("responder?.selectionIsInCursorTarget"),
    Q.proxyMethod("responder?.selectionIsExpanded");
var Vs = (i) => {
        var t;
        return (t = i.type) === null ||
            t === void 0 ||
            (t = t.match(/\/(\w+)$/)) === null ||
            t === void 0
            ? void 0
            : t[1];
    },
    zs = !(
        (zn = " ".codePointAt) === null ||
        zn === void 0 ||
        !zn.call(" ", 0)
    ),
    Hs = function (i) {
        if (i.key && zs && i.key.codePointAt(0) === i.keyCode) return i.key;
        {
            let t;
            if (
                (i.which === null
                    ? (t = i.keyCode)
                    : i.which !== 0 && i.charCode !== 0 && (t = i.charCode),
                t != null && Xr[t] !== "escape")
            )
                return Ot.fromCodepoints([t]).toString();
        }
    },
    qs = function (i) {
        let t = i.clipboardData;
        if (t) {
            if (t.types.includes("text/html")) {
                for (let e of t.types) {
                    let n = /^CorePasteboardFlavorType/.test(e),
                        r = /^dyn\./.test(e) && t.getData(e);
                    if (n || r) return !0;
                }
                return !1;
            }
            {
                let e = t.types.includes("com.apple.webarchive"),
                    n = t.types.includes("com.apple.flat-rtfd");
                return e || n;
            }
        }
    },
    it = class extends R {
        constructor(t) {
            super(...arguments),
                (this.inputController = t),
                (this.responder = this.inputController.responder),
                (this.delegate = this.inputController.delegate),
                (this.inputSummary = this.inputController.inputSummary),
                (this.data = {});
        }
        start(t) {
            if (((this.data.start = t), this.isSignificant())) {
                var e, n;
                this.inputSummary.eventName === "keypress" &&
                    this.inputSummary.textAdded &&
                    ((n = this.responder) === null ||
                        n === void 0 ||
                        n.deleteInDirection("left")),
                    this.selectionIsExpanded() ||
                        (this.insertPlaceholder(), this.requestRender()),
                    (this.range =
                        (e = this.responder) === null || e === void 0
                            ? void 0
                            : e.getSelectedRange());
            }
        }
        update(t) {
            if (((this.data.update = t), this.isSignificant())) {
                let e = this.selectPlaceholder();
                e && (this.forgetPlaceholder(), (this.range = e));
            }
        }
        end(t) {
            return (
                (this.data.end = t),
                this.isSignificant()
                    ? (this.forgetPlaceholder(),
                      this.canApplyToDocument()
                          ? (this.setInputSummary({
                                preferDocument: !0,
                                didInput: !1,
                            }),
                            (e = this.delegate) === null ||
                                e === void 0 ||
                                e.inputControllerWillPerformTyping(),
                            (n = this.responder) === null ||
                                n === void 0 ||
                                n.setSelectedRange(this.range),
                            (r = this.responder) === null ||
                                r === void 0 ||
                                r.insertString(this.data.end),
                            (o = this.responder) === null || o === void 0
                                ? void 0
                                : o.setSelectedRange(
                                      this.range[0] + this.data.end.length
                                  ))
                          : this.data.start != null || this.data.update != null
                          ? (this.requestReparse(),
                            this.inputController.reset())
                          : void 0)
                    : this.inputController.reset()
            );
            var e, n, r, o;
        }
        getEndData() {
            return this.data.end;
        }
        isEnded() {
            return this.getEndData() != null;
        }
        isSignificant() {
            return !Ws.composesExistingText || this.inputSummary.didInput;
        }
        canApplyToDocument() {
            var t, e;
            return (
                ((t = this.data.start) === null || t === void 0
                    ? void 0
                    : t.length) === 0 &&
                ((e = this.data.end) === null || e === void 0
                    ? void 0
                    : e.length) > 0 &&
                this.range
            );
        }
    };
it.proxyMethod("inputController.setInputSummary"),
    it.proxyMethod("inputController.requestRender"),
    it.proxyMethod("inputController.requestReparse"),
    it.proxyMethod("responder?.selectionIsExpanded"),
    it.proxyMethod("responder?.insertPlaceholder"),
    it.proxyMethod("responder?.selectPlaceholder"),
    it.proxyMethod("responder?.forgetPlaceholder");
var Dt = class extends $t {
    constructor() {
        super(...arguments), (this.render = this.render.bind(this));
    }
    elementDidMutate() {
        return this.scheduledRender
            ? this.composing
                ? (t = this.delegate) === null ||
                  t === void 0 ||
                  (e = t.inputControllerDidAllowUnhandledInput) === null ||
                  e === void 0
                    ? void 0
                    : e.call(t)
                : void 0
            : this.reparse();
        var t, e;
    }
    scheduleRender() {
        return this.scheduledRender
            ? this.scheduledRender
            : (this.scheduledRender = requestAnimationFrame(this.render));
    }
    render() {
        var t, e;
        cancelAnimationFrame(this.scheduledRender),
            (this.scheduledRender = null),
            this.composing ||
                (e = this.delegate) === null ||
                e === void 0 ||
                e.render(),
            (t = this.afterRender) === null || t === void 0 || t.call(this),
            (this.afterRender = null);
    }
    reparse() {
        var t;
        return (t = this.delegate) === null || t === void 0
            ? void 0
            : t.reparse();
    }
    insertString() {
        var t;
        let e =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : "",
            n = arguments.length > 1 ? arguments[1] : void 0;
        return (
            (t = this.delegate) === null ||
                t === void 0 ||
                t.inputControllerWillPerformTyping(),
            this.withTargetDOMRange(function () {
                var r;
                return (r = this.responder) === null || r === void 0
                    ? void 0
                    : r.insertString(e, n);
            })
        );
    }
    toggleAttributeIfSupported(t) {
        var e;
        if (Qn().includes(t))
            return (
                (e = this.delegate) === null ||
                    e === void 0 ||
                    e.inputControllerWillPerformFormatting(t),
                this.withTargetDOMRange(function () {
                    var n;
                    return (n = this.responder) === null || n === void 0
                        ? void 0
                        : n.toggleCurrentAttribute(t);
                })
            );
    }
    activateAttributeIfSupported(t, e) {
        var n;
        if (Qn().includes(t))
            return (
                (n = this.delegate) === null ||
                    n === void 0 ||
                    n.inputControllerWillPerformFormatting(t),
                this.withTargetDOMRange(function () {
                    var r;
                    return (r = this.responder) === null || r === void 0
                        ? void 0
                        : r.setCurrentAttribute(t, e);
                })
            );
    }
    deleteInDirection(t) {
        let { recordUndoEntry: e } =
            arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : { recordUndoEntry: !0 };
        var n;
        e &&
            ((n = this.delegate) === null ||
                n === void 0 ||
                n.inputControllerWillPerformTyping());
        let r = () => {
                var s;
                return (s = this.responder) === null || s === void 0
                    ? void 0
                    : s.deleteInDirection(t);
            },
            o = this.getTargetDOMRange({ minLength: this.composing ? 1 : 2 });
        return o ? this.withTargetDOMRange(o, r) : r();
    }
    withTargetDOMRange(t, e) {
        var n;
        return (
            typeof t == "function" && ((e = t), (t = this.getTargetDOMRange())),
            t
                ? (n = this.responder) === null || n === void 0
                    ? void 0
                    : n.withTargetDOMRange(t, e.bind(this))
                : (Pt.reset(), e.call(this))
        );
    }
    getTargetDOMRange() {
        var t, e;
        let { minLength: n } =
                arguments.length > 0 && arguments[0] !== void 0
                    ? arguments[0]
                    : { minLength: 0 },
            r =
                (t = (e = this.event).getTargetRanges) === null || t === void 0
                    ? void 0
                    : t.call(e);
        if (r && r.length) {
            let o = Js(r[0]);
            if (n === 0 || o.toString().length >= n) return o;
        }
    }
    withEvent(t, e) {
        let n;
        this.event = t;
        try {
            n = e.call(this);
        } finally {
            this.event = null;
        }
        return n;
    }
};
H(Dt, "events", {
    keydown(i) {
        if (Pr(i)) {
            var t;
            let e = Ys(i);
            (t = this.delegate) !== null &&
                t !== void 0 &&
                t.inputControllerDidReceiveKeyboardCommand(e) &&
                i.preventDefault();
        } else {
            let e = i.key;
            i.altKey && (e += "+Alt"), i.shiftKey && (e += "+Shift");
            let n = this.constructor.keys[e];
            if (n) return this.withEvent(i, n);
        }
    },
    paste(i) {
        var t;
        let e,
            n =
                (t = i.clipboardData) === null || t === void 0
                    ? void 0
                    : t.getData("URL");
        return Qr(i)
            ? (i.preventDefault(), this.attachFiles(i.clipboardData.files))
            : Gs(i)
            ? (i.preventDefault(),
              (e = {
                  type: "text/plain",
                  string: i.clipboardData.getData("text/plain"),
              }),
              (r = this.delegate) === null ||
                  r === void 0 ||
                  r.inputControllerWillPaste(e),
              (o = this.responder) === null ||
                  o === void 0 ||
                  o.insertString(e.string),
              this.render(),
              (s = this.delegate) === null || s === void 0
                  ? void 0
                  : s.inputControllerDidPaste(e))
            : n
            ? (i.preventDefault(),
              (e = { type: "text/html", html: this.createLinkHTML(n) }),
              (l = this.delegate) === null ||
                  l === void 0 ||
                  l.inputControllerWillPaste(e),
              (c = this.responder) === null ||
                  c === void 0 ||
                  c.insertHTML(e.html),
              this.render(),
              (u = this.delegate) === null || u === void 0
                  ? void 0
                  : u.inputControllerDidPaste(e))
            : void 0;
        var r, o, s, l, c, u;
    },
    beforeinput(i) {
        let t = this.constructor.inputTypes[i.inputType],
            e =
                ((n = i),
                !(
                    !/iPhone|iPad/.test(navigator.userAgent) ||
                    (n.inputType && n.inputType !== "insertParagraph")
                ));
        var n;
        t && (this.withEvent(i, t), e || this.scheduleRender()),
            e && this.render();
    },
    input(i) {
        Pt.reset();
    },
    dragstart(i) {
        var t, e;
        (t = this.responder) !== null &&
            t !== void 0 &&
            t.selectionContainsAttachments() &&
            (i.dataTransfer.setData("application/x-trix-dragging", !0),
            (this.dragging = {
                range:
                    (e = this.responder) === null || e === void 0
                        ? void 0
                        : e.getSelectedRange(),
                point: qn(i),
            }));
    },
    dragenter(i) {
        Hn(i) && i.preventDefault();
    },
    dragover(i) {
        if (this.dragging) {
            i.preventDefault();
            let e = qn(i);
            var t;
            if (!Xt(e, this.dragging.point))
                return (
                    (this.dragging.point = e),
                    (t = this.responder) === null || t === void 0
                        ? void 0
                        : t.setLocationRangeFromPointRange(e)
                );
        } else Hn(i) && i.preventDefault();
    },
    drop(i) {
        var t, e;
        if (this.dragging)
            return (
                i.preventDefault(),
                (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillMoveText(),
                (e = this.responder) === null ||
                    e === void 0 ||
                    e.moveTextFromRange(this.dragging.range),
                (this.dragging = null),
                this.scheduleRender()
            );
        if (Hn(i)) {
            var n;
            i.preventDefault();
            let r = qn(i);
            return (
                (n = this.responder) === null ||
                    n === void 0 ||
                    n.setLocationRangeFromPointRange(r),
                this.attachFiles(i.dataTransfer.files)
            );
        }
    },
    dragend() {
        var i;
        this.dragging &&
            ((i = this.responder) === null ||
                i === void 0 ||
                i.setSelectedRange(this.dragging.range),
            (this.dragging = null));
    },
    compositionend(i) {
        this.composing &&
            ((this.composing = !1), xe.recentAndroid || this.scheduleRender());
    },
}),
    H(Dt, "keys", {
        ArrowLeft() {
            var i, t;
            if (
                (i = this.responder) !== null &&
                i !== void 0 &&
                i.shouldManageMovingCursorInDirection("backward")
            )
                return (
                    this.event.preventDefault(),
                    (t = this.responder) === null || t === void 0
                        ? void 0
                        : t.moveCursorInDirection("backward")
                );
        },
        ArrowRight() {
            var i, t;
            if (
                (i = this.responder) !== null &&
                i !== void 0 &&
                i.shouldManageMovingCursorInDirection("forward")
            )
                return (
                    this.event.preventDefault(),
                    (t = this.responder) === null || t === void 0
                        ? void 0
                        : t.moveCursorInDirection("forward")
                );
        },
        Backspace() {
            var i, t, e;
            if (
                (i = this.responder) !== null &&
                i !== void 0 &&
                i.shouldManageDeletingInDirection("backward")
            )
                return (
                    this.event.preventDefault(),
                    (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillPerformTyping(),
                    (e = this.responder) === null ||
                        e === void 0 ||
                        e.deleteInDirection("backward"),
                    this.render()
                );
        },
        Tab() {
            var i, t;
            if (
                (i = this.responder) !== null &&
                i !== void 0 &&
                i.canIncreaseNestingLevel()
            )
                return (
                    this.event.preventDefault(),
                    (t = this.responder) === null ||
                        t === void 0 ||
                        t.increaseNestingLevel(),
                    this.render()
                );
        },
        "Tab+Shift"() {
            var i, t;
            if (
                (i = this.responder) !== null &&
                i !== void 0 &&
                i.canDecreaseNestingLevel()
            )
                return (
                    this.event.preventDefault(),
                    (t = this.responder) === null ||
                        t === void 0 ||
                        t.decreaseNestingLevel(),
                    this.render()
                );
        },
    }),
    H(Dt, "inputTypes", {
        deleteByComposition() {
            return this.deleteInDirection("backward", { recordUndoEntry: !1 });
        },
        deleteByCut() {
            return this.deleteInDirection("backward");
        },
        deleteByDrag() {
            return (
                this.event.preventDefault(),
                this.withTargetDOMRange(function () {
                    var i;
                    this.deleteByDragRange =
                        (i = this.responder) === null || i === void 0
                            ? void 0
                            : i.getSelectedRange();
                })
            );
        },
        deleteCompositionText() {
            return this.deleteInDirection("backward", { recordUndoEntry: !1 });
        },
        deleteContent() {
            return this.deleteInDirection("backward");
        },
        deleteContentBackward() {
            return this.deleteInDirection("backward");
        },
        deleteContentForward() {
            return this.deleteInDirection("forward");
        },
        deleteEntireSoftLine() {
            return this.deleteInDirection("forward");
        },
        deleteHardLineBackward() {
            return this.deleteInDirection("backward");
        },
        deleteHardLineForward() {
            return this.deleteInDirection("forward");
        },
        deleteSoftLineBackward() {
            return this.deleteInDirection("backward");
        },
        deleteSoftLineForward() {
            return this.deleteInDirection("forward");
        },
        deleteWordBackward() {
            return this.deleteInDirection("backward");
        },
        deleteWordForward() {
            return this.deleteInDirection("forward");
        },
        formatBackColor() {
            return this.activateAttributeIfSupported(
                "backgroundColor",
                this.event.data
            );
        },
        formatBold() {
            return this.toggleAttributeIfSupported("bold");
        },
        formatFontColor() {
            return this.activateAttributeIfSupported("color", this.event.data);
        },
        formatFontName() {
            return this.activateAttributeIfSupported("font", this.event.data);
        },
        formatIndent() {
            var i;
            if (
                (i = this.responder) !== null &&
                i !== void 0 &&
                i.canIncreaseNestingLevel()
            )
                return this.withTargetDOMRange(function () {
                    var t;
                    return (t = this.responder) === null || t === void 0
                        ? void 0
                        : t.increaseNestingLevel();
                });
        },
        formatItalic() {
            return this.toggleAttributeIfSupported("italic");
        },
        formatJustifyCenter() {
            return this.toggleAttributeIfSupported("justifyCenter");
        },
        formatJustifyFull() {
            return this.toggleAttributeIfSupported("justifyFull");
        },
        formatJustifyLeft() {
            return this.toggleAttributeIfSupported("justifyLeft");
        },
        formatJustifyRight() {
            return this.toggleAttributeIfSupported("justifyRight");
        },
        formatOutdent() {
            var i;
            if (
                (i = this.responder) !== null &&
                i !== void 0 &&
                i.canDecreaseNestingLevel()
            )
                return this.withTargetDOMRange(function () {
                    var t;
                    return (t = this.responder) === null || t === void 0
                        ? void 0
                        : t.decreaseNestingLevel();
                });
        },
        formatRemove() {
            this.withTargetDOMRange(function () {
                for (let e in (i = this.responder) === null || i === void 0
                    ? void 0
                    : i.getCurrentAttributes()) {
                    var i, t;
                    (t = this.responder) === null ||
                        t === void 0 ||
                        t.removeCurrentAttribute(e);
                }
            });
        },
        formatSetBlockTextDirection() {
            return this.activateAttributeIfSupported(
                "blockDir",
                this.event.data
            );
        },
        formatSetInlineTextDirection() {
            return this.activateAttributeIfSupported(
                "textDir",
                this.event.data
            );
        },
        formatStrikeThrough() {
            return this.toggleAttributeIfSupported("strike");
        },
        formatSubscript() {
            return this.toggleAttributeIfSupported("sub");
        },
        formatSuperscript() {
            return this.toggleAttributeIfSupported("sup");
        },
        formatUnderline() {
            return this.toggleAttributeIfSupported("underline");
        },
        historyRedo() {
            var i;
            return (i = this.delegate) === null || i === void 0
                ? void 0
                : i.inputControllerWillPerformRedo();
        },
        historyUndo() {
            var i;
            return (i = this.delegate) === null || i === void 0
                ? void 0
                : i.inputControllerWillPerformUndo();
        },
        insertCompositionText() {
            return (this.composing = !0), this.insertString(this.event.data);
        },
        insertFromComposition() {
            return (this.composing = !1), this.insertString(this.event.data);
        },
        insertFromDrop() {
            let i = this.deleteByDragRange;
            var t;
            if (i)
                return (
                    (this.deleteByDragRange = null),
                    (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillMoveText(),
                    this.withTargetDOMRange(function () {
                        var e;
                        return (e = this.responder) === null || e === void 0
                            ? void 0
                            : e.moveTextFromRange(i);
                    })
                );
        },
        insertFromPaste() {
            let { dataTransfer: i } = this.event,
                t = { dataTransfer: i },
                e = i.getData("URL"),
                n = i.getData("text/html");
            if (e) {
                var r;
                let c;
                this.event.preventDefault(), (t.type = "text/html");
                let u = i.getData("public.url-name");
                (c = u ? yi(u).trim() : e),
                    (t.html = this.createLinkHTML(e, c)),
                    (r = this.delegate) === null ||
                        r === void 0 ||
                        r.inputControllerWillPaste(t),
                    this.withTargetDOMRange(function () {
                        var d;
                        return (d = this.responder) === null || d === void 0
                            ? void 0
                            : d.insertHTML(t.html);
                    }),
                    (this.afterRender = () => {
                        var d;
                        return (d = this.delegate) === null || d === void 0
                            ? void 0
                            : d.inputControllerDidPaste(t);
                    });
            } else if (Fr(i)) {
                var o;
                (t.type = "text/plain"),
                    (t.string = i.getData("text/plain")),
                    (o = this.delegate) === null ||
                        o === void 0 ||
                        o.inputControllerWillPaste(t),
                    this.withTargetDOMRange(function () {
                        var c;
                        return (c = this.responder) === null || c === void 0
                            ? void 0
                            : c.insertString(t.string);
                    }),
                    (this.afterRender = () => {
                        var c;
                        return (c = this.delegate) === null || c === void 0
                            ? void 0
                            : c.inputControllerDidPaste(t);
                    });
            } else if (Ks(this.event)) {
                var s;
                (t.type = "File"),
                    (t.file = i.files[0]),
                    (s = this.delegate) === null ||
                        s === void 0 ||
                        s.inputControllerWillPaste(t),
                    this.withTargetDOMRange(function () {
                        var c;
                        return (c = this.responder) === null || c === void 0
                            ? void 0
                            : c.insertFile(t.file);
                    }),
                    (this.afterRender = () => {
                        var c;
                        return (c = this.delegate) === null || c === void 0
                            ? void 0
                            : c.inputControllerDidPaste(t);
                    });
            } else if (n) {
                var l;
                this.event.preventDefault(),
                    (t.type = "text/html"),
                    (t.html = n),
                    (l = this.delegate) === null ||
                        l === void 0 ||
                        l.inputControllerWillPaste(t),
                    this.withTargetDOMRange(function () {
                        var c;
                        return (c = this.responder) === null || c === void 0
                            ? void 0
                            : c.insertHTML(t.html);
                    }),
                    (this.afterRender = () => {
                        var c;
                        return (c = this.delegate) === null || c === void 0
                            ? void 0
                            : c.inputControllerDidPaste(t);
                    });
            }
        },
        insertFromYank() {
            return this.insertString(this.event.data);
        },
        insertLineBreak() {
            return this.insertString(`
`);
        },
        insertLink() {
            return this.activateAttributeIfSupported("href", this.event.data);
        },
        insertOrderedList() {
            return this.toggleAttributeIfSupported("number");
        },
        insertParagraph() {
            var i;
            return (
                (i = this.delegate) === null ||
                    i === void 0 ||
                    i.inputControllerWillPerformTyping(),
                this.withTargetDOMRange(function () {
                    var t;
                    return (t = this.responder) === null || t === void 0
                        ? void 0
                        : t.insertLineBreak();
                })
            );
        },
        insertReplacementText() {
            let i = this.event.dataTransfer.getData("text/plain"),
                t = this.event.getTargetRanges()[0];
            this.withTargetDOMRange(t, () => {
                this.insertString(i, { updatePosition: !1 });
            });
        },
        insertText() {
            var i;
            return this.insertString(
                this.event.data ||
                    ((i = this.event.dataTransfer) === null || i === void 0
                        ? void 0
                        : i.getData("text/plain"))
            );
        },
        insertTranspose() {
            return this.insertString(this.event.data);
        },
        insertUnorderedList() {
            return this.toggleAttributeIfSupported("bullet");
        },
    });
var Js = function (i) {
        let t = document.createRange();
        return (
            t.setStart(i.startContainer, i.startOffset),
            t.setEnd(i.endContainer, i.endOffset),
            t
        );
    },
    Hn = (i) => {
        var t;
        return Array.from(
            ((t = i.dataTransfer) === null || t === void 0
                ? void 0
                : t.types) || []
        ).includes("Files");
    },
    Ks = (i) => {
        var t;
        return (
            ((t = i.dataTransfer.files) === null || t === void 0
                ? void 0
                : t[0]) &&
            !Qr(i) &&
            !((e) => {
                let { dataTransfer: n } = e;
                return (
                    n.types.includes("Files") &&
                    n.types.includes("text/html") &&
                    n
                        .getData("text/html")
                        .includes("urn:schemas-microsoft-com:office:office")
                );
            })(i)
        );
    },
    Qr = function (i) {
        let t = i.clipboardData;
        if (t)
            return (
                Array.from(t.types).filter((e) => e.match(/file/i)).length ===
                    t.types.length && t.files.length >= 1
            );
    },
    Gs = function (i) {
        let t = i.clipboardData;
        if (t) return t.types.includes("text/plain") && t.types.length === 1;
    },
    Ys = function (i) {
        let t = [];
        return (
            i.altKey && t.push("alt"),
            i.shiftKey && t.push("shift"),
            t.push(i.key),
            t
        );
    },
    qn = (i) => ({ x: i.clientX, y: i.clientY }),
    ci = "[data-trix-attribute]",
    ui = "[data-trix-action]",
    $s = "".concat(ci, ", ").concat(ui),
    ln = "[data-trix-dialog]",
    Xs = "".concat(ln, "[data-trix-active]"),
    Qs = "".concat(ln, " [data-trix-method]"),
    Sr = "".concat(ln, " [data-trix-input]"),
    kr = (i, t) => (
        t || (t = zt(i)),
        i.querySelector("[data-trix-input][name='".concat(t, "']"))
    ),
    Rr = (i) => i.getAttribute("data-trix-action"),
    zt = (i) =>
        i.getAttribute("data-trix-attribute") ||
        i.getAttribute("data-trix-dialog-attribute"),
    on = class extends R {
        constructor(t) {
            super(t),
                (this.didClickActionButton =
                    this.didClickActionButton.bind(this)),
                (this.didClickAttributeButton =
                    this.didClickAttributeButton.bind(this)),
                (this.didClickDialogButton =
                    this.didClickDialogButton.bind(this)),
                (this.didKeyDownDialogInput =
                    this.didKeyDownDialogInput.bind(this)),
                (this.element = t),
                (this.attributes = {}),
                (this.actions = {}),
                this.resetDialogInputs(),
                S("mousedown", {
                    onElement: this.element,
                    matchingSelector: ui,
                    withCallback: this.didClickActionButton,
                }),
                S("mousedown", {
                    onElement: this.element,
                    matchingSelector: ci,
                    withCallback: this.didClickAttributeButton,
                }),
                S("click", {
                    onElement: this.element,
                    matchingSelector: $s,
                    preventDefault: !0,
                }),
                S("click", {
                    onElement: this.element,
                    matchingSelector: Qs,
                    withCallback: this.didClickDialogButton,
                }),
                S("keydown", {
                    onElement: this.element,
                    matchingSelector: Sr,
                    withCallback: this.didKeyDownDialogInput,
                });
        }
        didClickActionButton(t, e) {
            var n;
            (n = this.delegate) === null ||
                n === void 0 ||
                n.toolbarDidClickButton(),
                t.preventDefault();
            let r = Rr(e);
            return this.getDialog(r)
                ? this.toggleDialog(r)
                : (o = this.delegate) === null || o === void 0
                ? void 0
                : o.toolbarDidInvokeAction(r, e);
            var o;
        }
        didClickAttributeButton(t, e) {
            var n;
            (n = this.delegate) === null ||
                n === void 0 ||
                n.toolbarDidClickButton(),
                t.preventDefault();
            let r = zt(e);
            var o;
            return (
                this.getDialog(r)
                    ? this.toggleDialog(r)
                    : (o = this.delegate) === null ||
                      o === void 0 ||
                      o.toolbarDidToggleAttribute(r),
                this.refreshAttributeButtons()
            );
        }
        didClickDialogButton(t, e) {
            let n = vt(e, { matchingSelector: ln });
            return this[e.getAttribute("data-trix-method")].call(this, n);
        }
        didKeyDownDialogInput(t, e) {
            if (t.keyCode === 13) {
                t.preventDefault();
                let n = e.getAttribute("name"),
                    r = this.getDialog(n);
                this.setAttribute(r);
            }
            if (t.keyCode === 27) return t.preventDefault(), this.hideDialog();
        }
        updateActions(t) {
            return (this.actions = t), this.refreshActionButtons();
        }
        refreshActionButtons() {
            return this.eachActionButton((t, e) => {
                t.disabled = this.actions[e] === !1;
            });
        }
        eachActionButton(t) {
            return Array.from(this.element.querySelectorAll(ui)).map((e) =>
                t(e, Rr(e))
            );
        }
        updateAttributes(t) {
            return (this.attributes = t), this.refreshAttributeButtons();
        }
        refreshAttributeButtons() {
            return this.eachAttributeButton(
                (t, e) => (
                    (t.disabled = this.attributes[e] === !1),
                    this.attributes[e] || this.dialogIsVisible(e)
                        ? (t.setAttribute("data-trix-active", ""),
                          t.classList.add("trix-active"))
                        : (t.removeAttribute("data-trix-active"),
                          t.classList.remove("trix-active"))
                )
            );
        }
        eachAttributeButton(t) {
            return Array.from(this.element.querySelectorAll(ci)).map((e) =>
                t(e, zt(e))
            );
        }
        applyKeyboardCommand(t) {
            let e = JSON.stringify(t.sort());
            for (let n of Array.from(
                this.element.querySelectorAll("[data-trix-key]")
            )) {
                let r = n.getAttribute("data-trix-key").split("+");
                if (JSON.stringify(r.sort()) === e)
                    return he("mousedown", { onElement: n }), !0;
            }
            return !1;
        }
        dialogIsVisible(t) {
            let e = this.getDialog(t);
            if (e) return e.hasAttribute("data-trix-active");
        }
        toggleDialog(t) {
            return this.dialogIsVisible(t)
                ? this.hideDialog()
                : this.showDialog(t);
        }
        showDialog(t) {
            var e, n;
            this.hideDialog(),
                (e = this.delegate) === null ||
                    e === void 0 ||
                    e.toolbarWillShowDialog();
            let r = this.getDialog(t);
            r.setAttribute("data-trix-active", ""),
                r.classList.add("trix-active"),
                Array.from(r.querySelectorAll("input[disabled]")).forEach(
                    (s) => {
                        s.removeAttribute("disabled");
                    }
                );
            let o = zt(r);
            if (o) {
                let s = kr(r, t);
                s && ((s.value = this.attributes[o] || ""), s.select());
            }
            return (n = this.delegate) === null || n === void 0
                ? void 0
                : n.toolbarDidShowDialog(t);
        }
        setAttribute(t) {
            let e = zt(t),
                n = kr(t, e);
            return n.willValidate && !n.checkValidity()
                ? (n.setAttribute("data-trix-validate", ""),
                  n.classList.add("trix-validate"),
                  n.focus())
                : ((r = this.delegate) === null ||
                      r === void 0 ||
                      r.toolbarDidUpdateAttribute(e, n.value),
                  this.hideDialog());
            var r;
        }
        removeAttribute(t) {
            var e;
            let n = zt(t);
            return (
                (e = this.delegate) === null ||
                    e === void 0 ||
                    e.toolbarDidRemoveAttribute(n),
                this.hideDialog()
            );
        }
        hideDialog() {
            let t = this.element.querySelector(Xs);
            var e;
            if (t)
                return (
                    t.removeAttribute("data-trix-active"),
                    t.classList.remove("trix-active"),
                    this.resetDialogInputs(),
                    (e = this.delegate) === null || e === void 0
                        ? void 0
                        : e.toolbarDidHideDialog(
                              ((n) => n.getAttribute("data-trix-dialog"))(t)
                          )
                );
        }
        resetDialogInputs() {
            Array.from(this.element.querySelectorAll(Sr)).forEach((t) => {
                t.setAttribute("disabled", "disabled"),
                    t.removeAttribute("data-trix-validate"),
                    t.classList.remove("trix-validate");
            });
        }
        getDialog(t) {
            return this.element.querySelector(
                "[data-trix-dialog=".concat(t, "]")
            );
        }
    },
    Nt = class extends en {
        constructor(t) {
            let { editorElement: e, document: n, html: r } = t;
            super(...arguments),
                (this.editorElement = e),
                (this.selectionManager = new ut(this.editorElement)),
                (this.selectionManager.delegate = this),
                (this.composition = new rt()),
                (this.composition.delegate = this),
                (this.attachmentManager = new Ke(
                    this.composition.getAttachments()
                )),
                (this.attachmentManager.delegate = this),
                (this.inputController =
                    fi.getLevel() === 2
                        ? new Dt(this.editorElement)
                        : new Q(this.editorElement)),
                (this.inputController.delegate = this),
                (this.inputController.responder = this.composition),
                (this.compositionController = new tn(
                    this.editorElement,
                    this.composition
                )),
                (this.compositionController.delegate = this),
                (this.toolbarController = new on(
                    this.editorElement.toolbarElement
                )),
                (this.toolbarController.delegate = this),
                (this.editor = new $e(
                    this.composition,
                    this.selectionManager,
                    this.editorElement
                )),
                n ? this.editor.loadDocument(n) : this.editor.loadHTML(r);
        }
        registerSelectionManager() {
            return Pt.registerSelectionManager(this.selectionManager);
        }
        unregisterSelectionManager() {
            return Pt.unregisterSelectionManager(this.selectionManager);
        }
        render() {
            return this.compositionController.render();
        }
        reparse() {
            return this.composition.replaceHTML(this.editorElement.innerHTML);
        }
        compositionDidChangeDocument(t) {
            if (
                (this.notifyEditorElement("document-change"),
                !this.handlingInput)
            )
                return this.render();
        }
        compositionDidChangeCurrentAttributes(t) {
            return (
                (this.currentAttributes = t),
                this.toolbarController.updateAttributes(this.currentAttributes),
                this.updateCurrentActions(),
                this.notifyEditorElement("attributes-change", {
                    attributes: this.currentAttributes,
                })
            );
        }
        compositionDidPerformInsertionAtRange(t) {
            this.pasting && (this.pastedRange = t);
        }
        compositionShouldAcceptFile(t) {
            return this.notifyEditorElement("file-accept", { file: t });
        }
        compositionDidAddAttachment(t) {
            let e = this.attachmentManager.manageAttachment(t);
            return this.notifyEditorElement("attachment-add", {
                attachment: e,
            });
        }
        compositionDidEditAttachment(t) {
            this.compositionController.rerenderViewForObject(t);
            let e = this.attachmentManager.manageAttachment(t);
            return (
                this.notifyEditorElement("attachment-edit", { attachment: e }),
                this.notifyEditorElement("change")
            );
        }
        compositionDidChangeAttachmentPreviewURL(t) {
            return (
                this.compositionController.invalidateViewForObject(t),
                this.notifyEditorElement("change")
            );
        }
        compositionDidRemoveAttachment(t) {
            let e = this.attachmentManager.unmanageAttachment(t);
            return this.notifyEditorElement("attachment-remove", {
                attachment: e,
            });
        }
        compositionDidStartEditingAttachment(t, e) {
            return (
                (this.attachmentLocationRange =
                    this.composition.document.getLocationRangeOfAttachment(t)),
                this.compositionController.installAttachmentEditorForAttachment(
                    t,
                    e
                ),
                this.selectionManager.setLocationRange(
                    this.attachmentLocationRange
                )
            );
        }
        compositionDidStopEditingAttachment(t) {
            this.compositionController.uninstallAttachmentEditor(),
                (this.attachmentLocationRange = null);
        }
        compositionDidRequestChangingSelectionToLocationRange(t) {
            if (!this.loadingSnapshot || this.isFocused())
                return (
                    (this.requestedLocationRange = t),
                    (this.compositionRevisionWhenLocationRangeRequested =
                        this.composition.revision),
                    this.handlingInput ? void 0 : this.render()
                );
        }
        compositionWillLoadSnapshot() {
            this.loadingSnapshot = !0;
        }
        compositionDidLoadSnapshot() {
            this.compositionController.refreshViewCache(),
                this.render(),
                (this.loadingSnapshot = !1);
        }
        getSelectionManager() {
            return this.selectionManager;
        }
        attachmentManagerDidRequestRemovalOfAttachment(t) {
            return this.removeAttachment(t);
        }
        compositionControllerWillSyncDocumentView() {
            return (
                this.inputController.editorWillSyncDocumentView(),
                this.selectionManager.lock(),
                this.selectionManager.clearSelection()
            );
        }
        compositionControllerDidSyncDocumentView() {
            return (
                this.inputController.editorDidSyncDocumentView(),
                this.selectionManager.unlock(),
                this.updateCurrentActions(),
                this.notifyEditorElement("sync")
            );
        }
        compositionControllerDidRender() {
            this.requestedLocationRange &&
                (this.compositionRevisionWhenLocationRangeRequested ===
                    this.composition.revision &&
                    this.selectionManager.setLocationRange(
                        this.requestedLocationRange
                    ),
                (this.requestedLocationRange = null),
                (this.compositionRevisionWhenLocationRangeRequested = null)),
                this.renderedCompositionRevision !==
                    this.composition.revision &&
                    (this.runEditorFilters(),
                    this.composition.updateCurrentAttributes(),
                    this.notifyEditorElement("render")),
                (this.renderedCompositionRevision = this.composition.revision);
        }
        compositionControllerDidFocus() {
            return (
                this.isFocusedInvisibly() &&
                    this.setLocationRange({ index: 0, offset: 0 }),
                this.toolbarController.hideDialog(),
                this.notifyEditorElement("focus")
            );
        }
        compositionControllerDidBlur() {
            return this.notifyEditorElement("blur");
        }
        compositionControllerDidSelectAttachment(t, e) {
            return (
                this.toolbarController.hideDialog(),
                this.composition.editAttachment(t, e)
            );
        }
        compositionControllerDidRequestDeselectingAttachment(t) {
            let e =
                this.attachmentLocationRange ||
                this.composition.document.getLocationRangeOfAttachment(t);
            return this.selectionManager.setLocationRange(e[1]);
        }
        compositionControllerWillUpdateAttachment(t) {
            return this.editor.recordUndoEntry("Edit Attachment", {
                context: t.id,
                consolidatable: !0,
            });
        }
        compositionControllerDidRequestRemovalOfAttachment(t) {
            return this.removeAttachment(t);
        }
        inputControllerWillHandleInput() {
            (this.handlingInput = !0), (this.requestedRender = !1);
        }
        inputControllerDidRequestRender() {
            this.requestedRender = !0;
        }
        inputControllerDidHandleInput() {
            if (((this.handlingInput = !1), this.requestedRender))
                return (this.requestedRender = !1), this.render();
        }
        inputControllerDidAllowUnhandledInput() {
            return this.notifyEditorElement("change");
        }
        inputControllerDidRequestReparse() {
            return this.reparse();
        }
        inputControllerWillPerformTyping() {
            return this.recordTypingUndoEntry();
        }
        inputControllerWillPerformFormatting(t) {
            return this.recordFormattingUndoEntry(t);
        }
        inputControllerWillCutText() {
            return this.editor.recordUndoEntry("Cut");
        }
        inputControllerWillPaste(t) {
            return (
                this.editor.recordUndoEntry("Paste"),
                (this.pasting = !0),
                this.notifyEditorElement("before-paste", { paste: t })
            );
        }
        inputControllerDidPaste(t) {
            return (
                (t.range = this.pastedRange),
                (this.pastedRange = null),
                (this.pasting = null),
                this.notifyEditorElement("paste", { paste: t })
            );
        }
        inputControllerWillMoveText() {
            return this.editor.recordUndoEntry("Move");
        }
        inputControllerWillAttachFiles() {
            return this.editor.recordUndoEntry("Drop Files");
        }
        inputControllerWillPerformUndo() {
            return this.editor.undo();
        }
        inputControllerWillPerformRedo() {
            return this.editor.redo();
        }
        inputControllerDidReceiveKeyboardCommand(t) {
            return this.toolbarController.applyKeyboardCommand(t);
        }
        inputControllerDidStartDrag() {
            this.locationRangeBeforeDrag =
                this.selectionManager.getLocationRange();
        }
        inputControllerDidReceiveDragOverPoint(t) {
            return this.selectionManager.setLocationRangeFromPointRange(t);
        }
        inputControllerDidCancelDrag() {
            this.selectionManager.setLocationRange(
                this.locationRangeBeforeDrag
            ),
                (this.locationRangeBeforeDrag = null);
        }
        locationRangeDidChange(t) {
            return (
                this.composition.updateCurrentAttributes(),
                this.updateCurrentActions(),
                this.attachmentLocationRange &&
                    !We(this.attachmentLocationRange, t) &&
                    this.composition.stopEditingAttachment(),
                this.notifyEditorElement("selection-change")
            );
        }
        toolbarDidClickButton() {
            if (!this.getLocationRange())
                return this.setLocationRange({ index: 0, offset: 0 });
        }
        toolbarDidInvokeAction(t, e) {
            return this.invokeAction(t, e);
        }
        toolbarDidToggleAttribute(t) {
            if (
                (this.recordFormattingUndoEntry(t),
                this.composition.toggleCurrentAttribute(t),
                this.render(),
                !this.selectionFrozen)
            )
                return this.editorElement.focus();
        }
        toolbarDidUpdateAttribute(t, e) {
            if (
                (this.recordFormattingUndoEntry(t),
                this.composition.setCurrentAttribute(t, e),
                this.render(),
                !this.selectionFrozen)
            )
                return this.editorElement.focus();
        }
        toolbarDidRemoveAttribute(t) {
            if (
                (this.recordFormattingUndoEntry(t),
                this.composition.removeCurrentAttribute(t),
                this.render(),
                !this.selectionFrozen)
            )
                return this.editorElement.focus();
        }
        toolbarWillShowDialog(t) {
            return (
                this.composition.expandSelectionForEditing(),
                this.freezeSelection()
            );
        }
        toolbarDidShowDialog(t) {
            return this.notifyEditorElement("toolbar-dialog-show", {
                dialogName: t,
            });
        }
        toolbarDidHideDialog(t) {
            return (
                this.thawSelection(),
                this.editorElement.focus(),
                this.notifyEditorElement("toolbar-dialog-hide", {
                    dialogName: t,
                })
            );
        }
        freezeSelection() {
            if (!this.selectionFrozen)
                return (
                    this.selectionManager.lock(),
                    this.composition.freezeSelection(),
                    (this.selectionFrozen = !0),
                    this.render()
                );
        }
        thawSelection() {
            if (this.selectionFrozen)
                return (
                    this.composition.thawSelection(),
                    this.selectionManager.unlock(),
                    (this.selectionFrozen = !1),
                    this.render()
                );
        }
        canInvokeAction(t) {
            return (
                !!this.actionIsExternal(t) ||
                !(
                    (e = this.actions[t]) === null ||
                    e === void 0 ||
                    (e = e.test) === null ||
                    e === void 0 ||
                    !e.call(this)
                )
            );
            var e;
        }
        invokeAction(t, e) {
            return this.actionIsExternal(t)
                ? this.notifyEditorElement("action-invoke", {
                      actionName: t,
                      invokingElement: e,
                  })
                : (n = this.actions[t]) === null ||
                  n === void 0 ||
                  (n = n.perform) === null ||
                  n === void 0
                ? void 0
                : n.call(this);
            var n;
        }
        actionIsExternal(t) {
            return /^x-./.test(t);
        }
        getCurrentActions() {
            let t = {};
            for (let e in this.actions) t[e] = this.canInvokeAction(e);
            return t;
        }
        updateCurrentActions() {
            let t = this.getCurrentActions();
            if (!Xt(t, this.currentActions))
                return (
                    (this.currentActions = t),
                    this.toolbarController.updateActions(this.currentActions),
                    this.notifyEditorElement("actions-change", {
                        actions: this.currentActions,
                    })
                );
        }
        runEditorFilters() {
            let t = this.composition.getSnapshot();
            if (
                (Array.from(this.editor.filters).forEach((r) => {
                    let { document: o, selectedRange: s } = t;
                    (t = r.call(this.editor, t) || {}),
                        t.document || (t.document = o),
                        t.selectedRange || (t.selectedRange = s);
                }),
                (e = t),
                (n = this.composition.getSnapshot()),
                !We(e.selectedRange, n.selectedRange) ||
                    !e.document.isEqualTo(n.document))
            )
                return this.composition.loadSnapshot(t);
            var e, n;
        }
        updateInputElement() {
            let t = (function (e, n) {
                let r = ws[n];
                if (r) return r(e);
                throw new Error("unknown content type: ".concat(n));
            })(
                this.compositionController.getSerializableElement(),
                "text/html"
            );
            return this.editorElement.setFormValue(t);
        }
        notifyEditorElement(t, e) {
            switch (t) {
                case "document-change":
                    this.documentChangedSinceLastRender = !0;
                    break;
                case "render":
                    this.documentChangedSinceLastRender &&
                        ((this.documentChangedSinceLastRender = !1),
                        this.notifyEditorElement("change"));
                    break;
                case "change":
                case "attachment-add":
                case "attachment-edit":
                case "attachment-remove":
                    this.updateInputElement();
            }
            return this.editorElement.notify(t, e);
        }
        removeAttachment(t) {
            return (
                this.editor.recordUndoEntry("Delete Attachment"),
                this.composition.removeAttachment(t),
                this.render()
            );
        }
        recordFormattingUndoEntry(t) {
            let e = L(t),
                n = this.selectionManager.getLocationRange();
            if (e || !ht(n))
                return this.editor.recordUndoEntry("Formatting", {
                    context: this.getUndoContext(),
                    consolidatable: !0,
                });
        }
        recordTypingUndoEntry() {
            return this.editor.recordUndoEntry("Typing", {
                context: this.getUndoContext(this.currentAttributes),
                consolidatable: !0,
            });
        }
        getUndoContext() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            return [
                this.getLocationContext(),
                this.getTimeContext(),
                ...Array.from(e),
            ];
        }
        getLocationContext() {
            let t = this.selectionManager.getLocationRange();
            return ht(t) ? t[0].index : t;
        }
        getTimeContext() {
            return Yn.interval > 0
                ? Math.floor(new Date().getTime() / Yn.interval)
                : 0;
        }
        isFocused() {
            var t;
            return (
                this.editorElement ===
                ((t = this.editorElement.ownerDocument) === null || t === void 0
                    ? void 0
                    : t.activeElement)
            );
        }
        isFocusedInvisibly() {
            return this.isFocused() && !this.getLocationRange();
        }
        get actions() {
            return this.constructor.actions;
        }
    };
H(Nt, "actions", {
    undo: {
        test() {
            return this.editor.canUndo();
        },
        perform() {
            return this.editor.undo();
        },
    },
    redo: {
        test() {
            return this.editor.canRedo();
        },
        perform() {
            return this.editor.redo();
        },
    },
    link: {
        test() {
            return this.editor.canActivateAttribute("href");
        },
    },
    increaseNestingLevel: {
        test() {
            return this.editor.canIncreaseNestingLevel();
        },
        perform() {
            return this.editor.increaseNestingLevel() && this.render();
        },
    },
    decreaseNestingLevel: {
        test() {
            return this.editor.canDecreaseNestingLevel();
        },
        perform() {
            return this.editor.decreaseNestingLevel() && this.render();
        },
    },
    attachFiles: {
        test: () => !0,
        perform() {
            return fi.pickFiles(this.editor.insertFiles);
        },
    },
}),
    Nt.proxyMethod("getSelectionManager().setLocationRange"),
    Nt.proxyMethod("getSelectionManager().getLocationRange");
var Zs = Object.freeze({
        __proto__: null,
        AttachmentEditorController: Ze,
        CompositionController: tn,
        Controller: en,
        EditorController: Nt,
        InputController: $t,
        Level0InputController: Q,
        Level2InputController: Dt,
        ToolbarController: on,
    }),
    ta = Object.freeze({
        __proto__: null,
        MutationObserver: nn,
        SelectionChangeObserver: Ue,
    }),
    ea = Object.freeze({
        __proto__: null,
        FileVerificationOperation: rn,
        ImagePreloadOperation: Je,
    });
Or(
    "trix-toolbar",
    `%t {
  display: block;
}

%t {
  white-space: nowrap;
}

%t [data-trix-dialog] {
  display: none;
}

%t [data-trix-dialog][data-trix-active] {
  display: block;
}

%t [data-trix-dialog] [data-trix-validate]:invalid {
  background-color: #ffdddd;
}`
);
var sn = class extends HTMLElement {
        connectedCallback() {
            this.innerHTML === "" && (this.innerHTML = Ir.getDefaultHTML());
        }
    },
    na = 0,
    ia = function (i) {
        if (!i.hasAttribute("contenteditable"))
            return (
                i.setAttribute("contenteditable", ""),
                (function (t) {
                    let e =
                        arguments.length > 1 && arguments[1] !== void 0
                            ? arguments[1]
                            : {};
                    return (e.times = 1), S(t, e);
                })("focus", { onElement: i, withCallback: () => ra(i) })
            );
    },
    ra = function (i) {
        return oa(i), sa(i);
    },
    oa = function (i) {
        var t, e;
        if (
            (t = (e = document).queryCommandSupported) !== null &&
            t !== void 0 &&
            t.call(e, "enableObjectResizing")
        )
            return (
                document.execCommand("enableObjectResizing", !1, !1),
                S("mscontrolselect", { onElement: i, preventDefault: !0 })
            );
    },
    sa = function (i) {
        var t, e;
        if (
            (t = (e = document).queryCommandSupported) !== null &&
            t !== void 0 &&
            t.call(e, "DefaultParagraphSeparator")
        ) {
            let { tagName: n } = W.default;
            if (["div", "p"].includes(n))
                return document.execCommand("DefaultParagraphSeparator", !1, n);
        }
    },
    Tr = xe.forcesObjectResizing
        ? { display: "inline", width: "auto" }
        : { display: "inline-block", width: "1px" };
Or(
    "trix-editor",
    `%t {
    display: block;
}

%t:empty::before {
    content: attr(placeholder);
    color: graytext;
    cursor: text;
    pointer-events: none;
    white-space: pre-line;
}

%t a[contenteditable=false] {
    cursor: text;
}

%t img {
    max-width: 100%;
    height: auto;
}

%t `
        .concat(
            wt,
            ` figcaption textarea {
    resize: none;
}

%t `
        )
        .concat(
            wt,
            ` figcaption textarea.trix-autoresize-clone {
    position: absolute;
    left: -9999px;
    max-height: 0px;
}

%t `
        )
        .concat(
            wt,
            ` figcaption[data-trix-placeholder]:empty::before {
    content: attr(data-trix-placeholder);
    color: graytext;
}

%t [data-trix-cursor-target] {
    display: `
        )
        .concat(
            Tr.display,
            ` !important;
    width: `
        )
        .concat(
            Tr.width,
            ` !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
}

%t [data-trix-cursor-target=left] {
    vertical-align: top !important;
    margin-left: -1px !important;
}

%t [data-trix-cursor-target=right] {
    vertical-align: bottom !important;
    margin-right: -1px !important;
}`
        )
);
var ct = new WeakMap(),
    ce = new WeakSet(),
    hi = class {
        constructor(t) {
            var e, n;
            Hr((e = this), (n = ce)),
                n.add(e),
                pe(this, ct, { writable: !0, value: void 0 }),
                (this.element = t),
                xi(this, ct, t.attachInternals());
        }
        connectedCallback() {
            Fe(this, ce, Pe).call(this);
        }
        disconnectedCallback() {}
        get labels() {
            return x(this, ct).labels;
        }
        get disabled() {
            var t;
            return (t = this.element.inputElement) === null || t === void 0
                ? void 0
                : t.disabled;
        }
        set disabled(t) {
            this.element.toggleAttribute("disabled", t);
        }
        get required() {
            return this.element.hasAttribute("required");
        }
        set required(t) {
            this.element.toggleAttribute("required", t),
                Fe(this, ce, Pe).call(this);
        }
        get validity() {
            return x(this, ct).validity;
        }
        get validationMessage() {
            return x(this, ct).validationMessage;
        }
        get willValidate() {
            return x(this, ct).willValidate;
        }
        setFormValue(t) {
            Fe(this, ce, Pe).call(this);
        }
        checkValidity() {
            return x(this, ct).checkValidity();
        }
        reportValidity() {
            return x(this, ct).reportValidity();
        }
        setCustomValidity(t) {
            Fe(this, ce, Pe).call(this, t);
        }
    };
function Pe() {
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "",
        { required: t, value: e } = this.element,
        n = t && !e,
        r = !!i,
        o = p("input", { required: t }),
        s = i || o.validationMessage;
    x(this, ct).setValidity({ valueMissing: n, customError: r }, s);
}
var Jn = new WeakMap(),
    Kn = new WeakMap(),
    Gn = new WeakMap(),
    di = class {
        constructor(t) {
            pe(this, Jn, { writable: !0, value: void 0 }),
                pe(this, Kn, {
                    writable: !0,
                    value: (e) => {
                        e.defaultPrevented ||
                            (e.target === this.element.form &&
                                this.element.reset());
                    },
                }),
                pe(this, Gn, {
                    writable: !0,
                    value: (e) => {
                        if (
                            e.defaultPrevented ||
                            this.element.contains(e.target)
                        )
                            return;
                        let n = vt(e.target, { matchingSelector: "label" });
                        n &&
                            Array.from(this.labels).includes(n) &&
                            this.element.focus();
                    },
                }),
                (this.element = t);
        }
        connectedCallback() {
            xi(
                this,
                Jn,
                (function (t) {
                    if (
                        t.hasAttribute("aria-label") ||
                        t.hasAttribute("aria-labelledby")
                    )
                        return;
                    let e = function () {
                        let n = Array.from(t.labels)
                                .map((o) => {
                                    if (!o.contains(t)) return o.textContent;
                                })
                                .filter((o) => o),
                            r = n.join(" ");
                        return r
                            ? t.setAttribute("aria-label", r)
                            : t.removeAttribute("aria-label");
                    };
                    return e(), S("focus", { onElement: t, withCallback: e });
                })(this.element)
            ),
                window.addEventListener("reset", x(this, Kn), !1),
                window.addEventListener("click", x(this, Gn), !1);
        }
        disconnectedCallback() {
            var t;
            (t = x(this, Jn)) === null || t === void 0 || t.destroy(),
                window.removeEventListener("reset", x(this, Kn), !1),
                window.removeEventListener("click", x(this, Gn), !1);
        }
        get labels() {
            let t = [];
            this.element.id &&
                this.element.ownerDocument &&
                t.push(
                    ...Array.from(
                        this.element.ownerDocument.querySelectorAll(
                            "label[for='".concat(this.element.id, "']")
                        ) || []
                    )
                );
            let e = vt(this.element, { matchingSelector: "label" });
            return (
                e && [this.element, null].includes(e.control) && t.push(e), t
            );
        }
        get disabled() {
            return (
                console.warn(
                    "This browser does not support the [disabled] attribute for trix-editor elements."
                ),
                !1
            );
        }
        set disabled(t) {
            console.warn(
                "This browser does not support the [disabled] attribute for trix-editor elements."
            );
        }
        get required() {
            return (
                console.warn(
                    "This browser does not support the [required] attribute for trix-editor elements."
                ),
                !1
            );
        }
        set required(t) {
            console.warn(
                "This browser does not support the [required] attribute for trix-editor elements."
            );
        }
        get validity() {
            return (
                console.warn(
                    "This browser does not support the validity property for trix-editor elements."
                ),
                null
            );
        }
        get validationMessage() {
            return (
                console.warn(
                    "This browser does not support the validationMessage property for trix-editor elements."
                ),
                ""
            );
        }
        get willValidate() {
            return (
                console.warn(
                    "This browser does not support the willValidate property for trix-editor elements."
                ),
                !1
            );
        }
        setFormValue(t) {}
        checkValidity() {
            return (
                console.warn(
                    "This browser does not support checkValidity() for trix-editor elements."
                ),
                !0
            );
        }
        reportValidity() {
            return (
                console.warn(
                    "This browser does not support reportValidity() for trix-editor elements."
                ),
                !0
            );
        }
        setCustomValidity(t) {
            console.warn(
                "This browser does not support setCustomValidity(validationMessage) for trix-editor elements."
            );
        }
    },
    P = new WeakMap(),
    ye = class extends HTMLElement {
        constructor() {
            super(),
                pe(this, P, { writable: !0, value: void 0 }),
                xi(
                    this,
                    P,
                    this.constructor.formAssociated
                        ? new hi(this)
                        : new di(this)
                );
        }
        get trixId() {
            return this.hasAttribute("trix-id")
                ? this.getAttribute("trix-id")
                : (this.setAttribute("trix-id", ++na), this.trixId);
        }
        get labels() {
            return x(this, P).labels;
        }
        get disabled() {
            return x(this, P).disabled;
        }
        set disabled(t) {
            x(this, P).disabled = t;
        }
        get required() {
            return x(this, P).required;
        }
        set required(t) {
            x(this, P).required = t;
        }
        get validity() {
            return x(this, P).validity;
        }
        get validationMessage() {
            return x(this, P).validationMessage;
        }
        get willValidate() {
            return x(this, P).willValidate;
        }
        get type() {
            return this.localName;
        }
        get toolbarElement() {
            var t;
            if (this.hasAttribute("toolbar"))
                return (t = this.ownerDocument) === null || t === void 0
                    ? void 0
                    : t.getElementById(this.getAttribute("toolbar"));
            if (this.parentNode) {
                let e = "trix-toolbar-".concat(this.trixId);
                this.setAttribute("toolbar", e);
                let n = p("trix-toolbar", { id: e });
                return this.parentNode.insertBefore(n, this), n;
            }
        }
        get form() {
            var t;
            return (t = this.inputElement) === null || t === void 0
                ? void 0
                : t.form;
        }
        get inputElement() {
            var t;
            if (this.hasAttribute("input"))
                return (t = this.ownerDocument) === null || t === void 0
                    ? void 0
                    : t.getElementById(this.getAttribute("input"));
            if (this.parentNode) {
                let e = "trix-input-".concat(this.trixId);
                this.setAttribute("input", e);
                let n = p("input", { type: "hidden", id: e });
                return (
                    this.parentNode.insertBefore(n, this.nextElementSibling), n
                );
            }
        }
        get editor() {
            var t;
            return (t = this.editorController) === null || t === void 0
                ? void 0
                : t.editor;
        }
        get name() {
            var t;
            return (t = this.inputElement) === null || t === void 0
                ? void 0
                : t.name;
        }
        get value() {
            var t;
            return (t = this.inputElement) === null || t === void 0
                ? void 0
                : t.value;
        }
        set value(t) {
            var e;
            (this.defaultValue = t),
                (e = this.editor) === null ||
                    e === void 0 ||
                    e.loadHTML(this.defaultValue);
        }
        notify(t, e) {
            if (this.editorController)
                return he("trix-".concat(t), {
                    onElement: this,
                    attributes: e,
                });
        }
        setFormValue(t) {
            this.inputElement &&
                ((this.inputElement.value = t), x(this, P).setFormValue(t));
        }
        connectedCallback() {
            this.hasAttribute("data-trix-internal") ||
                (ia(this),
                (function (t) {
                    t.hasAttribute("role") || t.setAttribute("role", "textbox");
                })(this),
                this.editorController ||
                    (he("trix-before-initialize", { onElement: this }),
                    (this.editorController = new Nt({
                        editorElement: this,
                        html: (this.defaultValue = this.value),
                    })),
                    requestAnimationFrame(() =>
                        he("trix-initialize", { onElement: this })
                    )),
                this.editorController.registerSelectionManager(),
                x(this, P).connectedCallback(),
                (function (t) {
                    !document.querySelector(":focus") &&
                        t.hasAttribute("autofocus") &&
                        document.querySelector("[autofocus]") === t &&
                        t.focus();
                })(this));
        }
        disconnectedCallback() {
            var t;
            (t = this.editorController) === null ||
                t === void 0 ||
                t.unregisterSelectionManager(),
                x(this, P).disconnectedCallback();
        }
        checkValidity() {
            return x(this, P).checkValidity();
        }
        reportValidity() {
            return x(this, P).reportValidity();
        }
        setCustomValidity(t) {
            x(this, P).setCustomValidity(t);
        }
        formDisabledCallback(t) {
            this.inputElement && (this.inputElement.disabled = t),
                this.toggleAttribute("contenteditable", !t);
        }
        formResetCallback() {
            this.reset();
        }
        reset() {
            this.value = this.defaultValue;
        }
    };
H(ye, "formAssociated", "ElementInternals" in window);
var Z = {
    VERSION: go,
    config: Ce,
    core: Ls,
    models: Yr,
    views: Fs,
    controllers: Zs,
    observers: ta,
    operations: ea,
    elements: Object.freeze({
        __proto__: null,
        TrixEditorElement: ye,
        TrixToolbarElement: sn,
    }),
    filters: Object.freeze({
        __proto__: null,
        Filter: Ye,
        attachmentGalleryFilter: Kr,
    }),
};
Object.assign(Z, Yr),
    (window.Trix = Z),
    setTimeout(function () {
        customElements.get("trix-toolbar") ||
            customElements.define("trix-toolbar", sn),
            customElements.get("trix-editor") ||
                customElements.define("trix-editor", ye);
    }, 0);
Z.config.blockAttributes.default.tagName = "p";
Z.config.blockAttributes.default.breakOnReturn = !0;
Z.config.blockAttributes.heading = {
    tagName: "h2",
    terminal: !0,
    breakOnReturn: !0,
    group: !1,
};
Z.config.blockAttributes.subHeading = {
    tagName: "h3",
    terminal: !0,
    breakOnReturn: !0,
    group: !1,
};
Z.config.textAttributes.underline = {
    style: { textDecoration: "underline" },
    inheritable: !0,
    parser: (i) =>
        window.getComputedStyle(i).textDecoration.includes("underline"),
};
Z.Block.prototype.breaksOnReturn = function () {
    let i = this.getLastAttribute();
    return Z.config.blockAttributes[i || "default"]?.breakOnReturn ?? !1;
};
Z.LineBreakInsertion.prototype.shouldInsertBlockBreak = function () {
    return this.block.hasAttributes() &&
        this.block.isListItem() &&
        !this.block.isEmpty()
        ? this.startLocation.offset > 0
        : this.shouldBreakFormattedBlock()
        ? !1
        : this.breaksOnReturn;
};
function aa({ state: i }) {
    return {
        state: i,
        init: function () {
            (this.$refs.trixValue.value = this.state),
                this.$refs.trix.editor?.loadHTML(this.state ?? ""),
                this.$watch("state", () => {
                    document.activeElement !== this.$refs.trix &&
                        ((this.$refs.trixValue.value = this.state),
                        this.$refs.trix.editor?.loadHTML(this.state ?? ""));
                });
        },
    };
}
export { aa as default };
/*! Bundled license information:

trix/dist/trix.esm.min.js:
  (*! @license DOMPurify 3.2.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.3/LICENSE *)
*/
