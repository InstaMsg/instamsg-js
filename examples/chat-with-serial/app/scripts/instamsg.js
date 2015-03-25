/* SockJS client, version 0.3.4, http://sockjs.org, MIT License

 Copyright (c) 2011-2012 VMware, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

// JSON2 by Douglas Crockford (minified).
var JSON;
JSON || (JSON = {}), function () {
    function str(a, b) {
        var c, d, e, f, g = gap, h, i = b[a];
        i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)), typeof rep == "function" && (i = rep.call(b, a, i));
        switch (typeof i) {
            case"string":
                return quote(i);
            case"number":
                return isFinite(i) ? String(i) : "null";
            case"boolean":
            case"null":
                return String(i);
            case"object":
                if (!i)return"null";
                gap += indent, h = [];
                if (Object.prototype.toString.apply(i) === "[object Array]") {
                    f = i.length;
                    for (c = 0; c < f; c += 1)h[c] = str(c, i) || "null";
                    e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g;
                    return e
                }
                if (rep && typeof rep == "object") {
                    f = rep.length;
                    for (c = 0; c < f; c += 1)typeof rep[c] == "string" && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e))
                } else for (d in i)Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g;
                return e
        }
    }

    function quote(a) {
        escapable.lastIndex = 0;
        return escapable.test(a) ? '"' + a.replace(escapable, function (a) {
            var b = meta[a];
            return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function f(a) {
        return a < 10 ? "0" + a : a
    }

    "use strict", typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (a) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function (a, b, c) {
        var d;
        gap = "", indent = "";
        if (typeof c == "number")for (d = 0; d < c; d += 1)indent += " "; else typeof c == "string" && (indent = c);
        rep = b;
        if (!b || typeof b == "function" || typeof b == "object" && typeof b.length == "number")return str("", {"": a});
        throw new Error("JSON.stringify")
    }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && typeof e == "object")for (c in e)Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }

        var j;
        text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
            return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            j = eval("(" + text + ")");
            return typeof reviver == "function" ? walk({"": j}, "") : j
        }
        throw new SyntaxError("JSON.parse")
    })
}()

SockJS = function () {
    var a = document, b = window, c = {}, d = function () {
    };
    d.prototype.addEventListener = function (a, b) {
        this._listeners || (this._listeners = {}), a in this._listeners || (this._listeners[a] = []);
        var d = this._listeners[a];
        c.arrIndexOf(d, b) === -1 && d.push(b);
        return
    }, d.prototype.removeEventListener = function (a, b) {
        if (!(this._listeners && a in this._listeners))return;
        var d = this._listeners[a], e = c.arrIndexOf(d, b);
        if (e !== -1) {
            d.length > 1 ? this._listeners[a] = d.slice(0, e).concat(d.slice(e + 1)) : delete this._listeners[a];
            return
        }
        return
    }, d.prototype.dispatchEvent = function (a) {
        var b = a.type, c = Array.prototype.slice.call(arguments, 0);
        this["on" + b] && this["on" + b].apply(this, c);
        if (this._listeners && b in this._listeners)for (var d = 0; d < this._listeners[b].length; d++)this._listeners[b][d].apply(this, c)
    };
    var e = function (a, b) {
        this.type = a;
        if (typeof b != "undefined")for (var c in b) {
            if (!b.hasOwnProperty(c))continue;
            this[c] = b[c]
        }
    };
    e.prototype.toString = function () {
        var a = [];
        for (var b in this) {
            if (!this.hasOwnProperty(b))continue;
            var c = this[b];
            typeof c == "function" && (c = "[function]"), a.push(b + "=" + c)
        }
        return"SimpleEvent(" + a.join(", ") + ")"
    };
    var f = function (a) {
        var b = this;
        b._events = a || [], b._listeners = {}
    };
    f.prototype.emit = function (a) {
        var b = this;
        b._verifyType(a);
        if (b._nuked)return;
        var c = Array.prototype.slice.call(arguments, 1);
        b["on" + a] && b["on" + a].apply(b, c);
        if (a in b._listeners)for (var d = 0; d < b._listeners[a].length; d++)b._listeners[a][d].apply(b, c)
    }, f.prototype.on = function (a, b) {
        var c = this;
        c._verifyType(a);
        if (c._nuked)return;
        a in c._listeners || (c._listeners[a] = []), c._listeners[a].push(b)
    }, f.prototype._verifyType = function (a) {
        var b = this;
        c.arrIndexOf(b._events, a) === -1 && c.log("Event " + JSON.stringify(a) + " not listed " + JSON.stringify(b._events) + " in " + b)
    }, f.prototype.nuke = function () {
        var a = this;
        a._nuked = !0;
        for (var b = 0; b < a._events.length; b++)delete a[a._events[b]];
        a._listeners = {}
    };
    var g = "abcdefghijklmnopqrstuvwxyz0123456789_";
    c.random_string = function (a, b) {
        b = b || g.length;
        var c, d = [];
        for (c = 0; c < a; c++)d.push(g.substr(Math.floor(Math.random() * b), 1));
        return d.join("")
    }, c.random_number = function (a) {
        return Math.floor(Math.random() * a)
    }, c.random_number_string = function (a) {
        var b = ("" + (a - 1)).length, d = Array(b + 1).join("0");
        return(d + c.random_number(a)).slice(-b)
    }, c.getOrigin = function (a) {
        a += "/";
        var b = a.split("/").slice(0, 3);
        return b.join("/")
    }, c.isSameOriginUrl = function (a, c) {
        return c || (c = b.location.href), a.split("/").slice(0, 3).join("/") === c.split("/").slice(0, 3).join("/")
    }, c.getParentDomain = function (a) {
        if (/^[0-9.]*$/.test(a))return a;
        if (/^\[/.test(a))return a;
        if (!/[.]/.test(a))return a;
        var b = a.split(".").slice(1);
        return b.join(".")
    }, c.objectExtend = function (a, b) {
        for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    };
    var h = "_jp";
    c.polluteGlobalNamespace = function () {
        h in b || (b[h] = {})
    }, c.closeFrame = function (a, b) {
        return"c" + JSON.stringify([a, b])
    }, c.userSetCode = function (a) {
        return a === 1e3 || a >= 3e3 && a <= 4999
    }, c.countRTO = function (a) {
        var b;
        return a > 100 ? b = 3 * a : b = a + 200, b
    }, c.log = function () {
        b.console && console.log && console.log.apply && console.log.apply(console, arguments)
    }, c.bind = function (a, b) {
        return a.bind ? a.bind(b) : function () {
            return a.apply(b, arguments)
        }
    }, c.flatUrl = function (a) {
        return a.indexOf("?") === -1 && a.indexOf("#") === -1
    }, c.amendUrl = function (b) {
        var d = a.location;
        if (!b)throw new Error("Wrong url for SockJS");
        if (!c.flatUrl(b))throw new Error("Only basic urls are supported in SockJS");
        return b.indexOf("//") === 0 && (b = d.protocol + b), b.indexOf("/") === 0 && (b = d.protocol + "//" + d.host + b), b = b.replace(/[/]+$/, ""), b
    }, c.arrIndexOf = function (a, b) {
        for (var c = 0; c < a.length; c++)if (a[c] === b)return c;
        return-1
    }, c.arrSkip = function (a, b) {
        var d = c.arrIndexOf(a, b);
        if (d === -1)return a.slice();
        var e = a.slice(0, d);
        return e.concat(a.slice(d + 1))
    }, c.isArray = Array.isArray || function (a) {
        return{}.toString.call(a).indexOf("Array") >= 0
    }, c.delay = function (a, b) {
        return typeof a == "function" && (b = a, a = 0), setTimeout(b, a)
    };
    var i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, j = {"\0": "\\u0000", "\x01": "\\u0001", "\x02": "\\u0002", "\x03": "\\u0003", "\x04": "\\u0004", "\x05": "\\u0005", "\x06": "\\u0006", "\x07": "\\u0007", "\b": "\\b", "\t": "\\t", "\n": "\\n", "\x0b": "\\u000b", "\f": "\\f", "\r": "\\r", "\x0e": "\\u000e", "\x0f": "\\u000f", "\x10": "\\u0010", "\x11": "\\u0011", "\x12": "\\u0012", "\x13": "\\u0013", "\x14": "\\u0014", "\x15": "\\u0015", "\x16": "\\u0016", "\x17": "\\u0017", "\x18": "\\u0018", "\x19": "\\u0019", "\x1a": "\\u001a", "\x1b": "\\u001b", "\x1c": "\\u001c", "\x1d": "\\u001d", "\x1e": "\\u001e", "\x1f": "\\u001f", '"': '\\"', "\\": "\\\\", "\x7f": "\\u007f", "\x80": "\\u0080", "\x81": "\\u0081", "\x82": "\\u0082", "\x83": "\\u0083", "\x84": "\\u0084", "\x85": "\\u0085", "\x86": "\\u0086", "\x87": "\\u0087", "\x88": "\\u0088", "\x89": "\\u0089", "\x8a": "\\u008a", "\x8b": "\\u008b", "\x8c": "\\u008c", "\x8d": "\\u008d", "\x8e": "\\u008e", "\x8f": "\\u008f", "\x90": "\\u0090", "\x91": "\\u0091", "\x92": "\\u0092", "\x93": "\\u0093", "\x94": "\\u0094", "\x95": "\\u0095", "\x96": "\\u0096", "\x97": "\\u0097", "\x98": "\\u0098", "\x99": "\\u0099", "\x9a": "\\u009a", "\x9b": "\\u009b", "\x9c": "\\u009c", "\x9d": "\\u009d", "\x9e": "\\u009e", "\x9f": "\\u009f", "\xad": "\\u00ad", "\u0600": "\\u0600", "\u0601": "\\u0601", "\u0602": "\\u0602", "\u0603": "\\u0603", "\u0604": "\\u0604", "\u070f": "\\u070f", "\u17b4": "\\u17b4", "\u17b5": "\\u17b5", "\u200c": "\\u200c", "\u200d": "\\u200d", "\u200e": "\\u200e", "\u200f": "\\u200f", "\u2028": "\\u2028", "\u2029": "\\u2029", "\u202a": "\\u202a", "\u202b": "\\u202b", "\u202c": "\\u202c", "\u202d": "\\u202d", "\u202e": "\\u202e", "\u202f": "\\u202f", "\u2060": "\\u2060", "\u2061": "\\u2061", "\u2062": "\\u2062", "\u2063": "\\u2063", "\u2064": "\\u2064", "\u2065": "\\u2065", "\u2066": "\\u2066", "\u2067": "\\u2067", "\u2068": "\\u2068", "\u2069": "\\u2069", "\u206a": "\\u206a", "\u206b": "\\u206b", "\u206c": "\\u206c", "\u206d": "\\u206d", "\u206e": "\\u206e", "\u206f": "\\u206f", "\ufeff": "\\ufeff", "\ufff0": "\\ufff0", "\ufff1": "\\ufff1", "\ufff2": "\\ufff2", "\ufff3": "\\ufff3", "\ufff4": "\\ufff4", "\ufff5": "\\ufff5", "\ufff6": "\\ufff6", "\ufff7": "\\ufff7", "\ufff8": "\\ufff8", "\ufff9": "\\ufff9", "\ufffa": "\\ufffa", "\ufffb": "\\ufffb", "\ufffc": "\\ufffc", "\ufffd": "\\ufffd", "\ufffe": "\\ufffe", "\uffff": "\\uffff"}, k = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g, l, m = JSON && JSON.stringify || function (a) {
        return i.lastIndex = 0, i.test(a) && (a = a.replace(i, function (a) {
            return j[a]
        })), '"' + a + '"'
    }, n = function (a) {
        var b, c = {}, d = [];
        for (b = 0; b < 65536; b++)d.push(String.fromCharCode(b));
        return a.lastIndex = 0, d.join("").replace(a, function (a) {
            return c[a] = "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4), ""
        }), a.lastIndex = 0, c
    };
    c.quote = function (a) {
        var b = m(a);
        return k.lastIndex = 0, k.test(b) ? (l || (l = n(k)), b.replace(k, function (a) {
            return l[a]
        })) : b
    };
    var o = ["websocket", "xdr-streaming", "xhr-streaming", "iframe-eventsource", "iframe-htmlfile", "xdr-polling", "xhr-polling", "iframe-xhr-polling", "jsonp-polling"];
    c.probeProtocols = function () {
        var a = {};
        for (var b = 0; b < o.length; b++) {
            var c = o[b];
            a[c] = y[c] && y[c].enabled()
        }
        return a
    }, c.detectProtocols = function (a, b, c) {
        var d = {}, e = [];
        b || (b = o);
        for (var f = 0; f < b.length; f++) {
            var g = b[f];
            d[g] = a[g]
        }
        var h = function (a) {
            var b = a.shift();
            d[b] ? e.push(b) : a.length > 0 && h(a)
        };
        return c.websocket !== !1 && h(["websocket"]), d["xhr-streaming"] && !c.null_origin ? e.push("xhr-streaming") : d["xdr-streaming"] && !c.cookie_needed && !c.null_origin ? e.push("xdr-streaming") : h(["iframe-eventsource", "iframe-htmlfile"]), d["xhr-polling"] && !c.null_origin ? e.push("xhr-polling") : d["xdr-polling"] && !c.cookie_needed && !c.null_origin ? e.push("xdr-polling") : h(["iframe-xhr-polling", "jsonp-polling"]), e
    };
    var p = "_sockjs_global";
    c.createHook = function () {
        var a = "a" + c.random_string(8);
        if (!(p in b)) {
            var d = {};
            b[p] = function (a) {
                return a in d || (d[a] = {id: a, del: function () {
                    delete d[a]
                }}), d[a]
            }
        }
        return b[p](a)
    }, c.attachMessage = function (a) {
        c.attachEvent("message", a)
    }, c.attachEvent = function (c, d) {
        typeof b.addEventListener != "undefined" ? b.addEventListener(c, d, !1) : (a.attachEvent("on" + c, d), b.attachEvent("on" + c, d))
    }, c.detachMessage = function (a) {
        c.detachEvent("message", a)
    }, c.detachEvent = function (c, d) {
        typeof b.addEventListener != "undefined" ? b.removeEventListener(c, d, !1) : (a.detachEvent("on" + c, d), b.detachEvent("on" + c, d))
    };
    var q = {}, r = !1, s = function () {
        for (var a in q)q[a](), delete q[a]
    }, t = function () {
        if (r)return;
        r = !0, s()
    };
    c.attachEvent("unload", t), c.unload_add = function (a) {
        var b = c.random_string(8);
        return q[b] = a, r && c.delay(s), b
    }, c.unload_del = function (a) {
        a in q && delete q[a]
    }, c.createIframe = function (b, d) {
        var e = a.createElement("iframe"), f, g, h = function () {
            clearTimeout(f);
            try {
                e.onload = null
            } catch (a) {
            }
            e.onerror = null
        }, i = function () {
            e && (h(), setTimeout(function () {
                e && e.parentNode.removeChild(e), e = null
            }, 0), c.unload_del(g))
        }, j = function (a) {
            e && (i(), d(a))
        }, k = function (a, b) {
            try {
                e && e.contentWindow && e.contentWindow.postMessage(a, b)
            } catch (c) {
            }
        };
        return e.src = b, e.style.display = "none", e.style.position = "absolute", e.onerror = function () {
            j("onerror")
        }, e.onload = function () {
            clearTimeout(f), f = setTimeout(function () {
                j("onload timeout")
            }, 2e3)
        }, a.body.appendChild(e), f = setTimeout(function () {
            j("timeout")
        }, 15e3), g = c.unload_add(i), {post: k, cleanup: i, loaded: h}
    }, c.createHtmlfile = function (a, d) {
        var e = new ActiveXObject("htmlfile"), f, g, i, j = function () {
            clearTimeout(f)
        }, k = function () {
            e && (j(), c.unload_del(g), i.parentNode.removeChild(i), i = e = null, CollectGarbage())
        }, l = function (a) {
            e && (k(), d(a))
        }, m = function (a, b) {
            try {
                i && i.contentWindow && i.contentWindow.postMessage(a, b)
            } catch (c) {
            }
        };
        e.open(), e.write('<html><script>document.domain="' + document.domain + '";' + "</s" + "cript></html>"), e.close(), e.parentWindow[h] = b[h];
        var n = e.createElement("div");
        return e.body.appendChild(n), i = e.createElement("iframe"), n.appendChild(i), i.src = a, f = setTimeout(function () {
            l("timeout")
        }, 15e3), g = c.unload_add(k), {post: m, cleanup: k, loaded: j}
    };
    var u = function () {
    };
    u.prototype = new f(["chunk", "finish"]), u.prototype._start = function (a, d, e, f) {
        var g = this;
        try {
            g.xhr = new XMLHttpRequest
        } catch (h) {
        }
        if (!g.xhr)try {
            g.xhr = new b.ActiveXObject("Microsoft.XMLHTTP")
        } catch (h) {
        }
        if (b.ActiveXObject || b.XDomainRequest)d += (d.indexOf("?") === -1 ? "?" : "&") + "t=" + +(new Date);
        g.unload_ref = c.unload_add(function () {
            g._cleanup(!0)
        });
        try {
            g.xhr.open(a, d, !0)
        } catch (i) {
            g.emit("finish", 0, ""), g._cleanup();
            return
        }
        if (!f || !f.no_credentials)g.xhr.withCredentials = "true";
        if (f && f.headers)for (var j in f.headers)g.xhr.setRequestHeader(j, f.headers[j]);
        g.xhr.onreadystatechange = function () {
            if (g.xhr) {
                var a = g.xhr;
                switch (a.readyState) {
                    case 3:
                        try {
                            var b = a.status, c = a.responseText
                        } catch (a) {
                        }
                        b === 1223 && (b = 204), c && c.length > 0 && g.emit("chunk", b, c);
                        break;
                    case 4:
                        var b = a.status;
                        b === 1223 && (b = 204), g.emit("finish", b, a.responseText), g._cleanup(!1)
                }
            }
        }, g.xhr.send(e)
    }, u.prototype._cleanup = function (a) {
        var b = this;
        if (!b.xhr)return;
        c.unload_del(b.unload_ref), b.xhr.onreadystatechange = function () {
        };
        if (a)try {
            b.xhr.abort()
        } catch (d) {
        }
        b.unload_ref = b.xhr = null
    }, u.prototype.close = function () {
        var a = this;
        a.nuke(), a._cleanup(!0)
    };
    var v = c.XHRCorsObject = function () {
        var a = this, b = arguments;
        c.delay(function () {
            a._start.apply(a, b)
        })
    };
    v.prototype = new u;
    var w = c.XHRLocalObject = function (a, b, d) {
        var e = this;
        c.delay(function () {
            e._start(a, b, d, {no_credentials: !0})
        })
    };
    w.prototype = new u;
    var x = c.XDRObject = function (a, b, d) {
        var e = this;
        c.delay(function () {
            e._start(a, b, d)
        })
    };
    x.prototype = new f(["chunk", "finish"]), x.prototype._start = function (a, b, d) {
        var e = this, f = new XDomainRequest;
        b += (b.indexOf("?") === -1 ? "?" : "&") + "t=" + +(new Date);
        var g = f.ontimeout = f.onerror = function () {
            e.emit("finish", 0, ""), e._cleanup(!1)
        };
        f.onprogress = function () {
            e.emit("chunk", 200, f.responseText)
        }, f.onload = function () {
            e.emit("finish", 200, f.responseText), e._cleanup(!1)
        }, e.xdr = f, e.unload_ref = c.unload_add(function () {
            e._cleanup(!0)
        });
        try {
            e.xdr.open(a, b), e.xdr.send(d)
        } catch (h) {
            g()
        }
    }, x.prototype._cleanup = function (a) {
        var b = this;
        if (!b.xdr)return;
        c.unload_del(b.unload_ref), b.xdr.ontimeout = b.xdr.onerror = b.xdr.onprogress = b.xdr.onload = null;
        if (a)try {
            b.xdr.abort()
        } catch (d) {
        }
        b.unload_ref = b.xdr = null
    }, x.prototype.close = function () {
        var a = this;
        a.nuke(), a._cleanup(!0)
    }, c.isXHRCorsCapable = function () {
        return b.XMLHttpRequest && "withCredentials"in new XMLHttpRequest ? 1 : b.XDomainRequest && a.domain ? 2 : L.enabled() ? 3 : 4
    };
    var y = function (a, d, e) {
        if (this === b)return new y(a, d, e);
        var f = this, g;
        f._options = {devel: !1, debug: !1, protocols_whitelist: [], info: undefined, rtt: undefined}, e && c.objectExtend(f._options, e), f._base_url = c.amendUrl(a), f._server = f._options.server || c.random_number_string(1e3), f._options.protocols_whitelist && f._options.protocols_whitelist.length ? g = f._options.protocols_whitelist : (typeof d == "string" && d.length > 0 ? g = [d] : c.isArray(d) ? g = d : g = null, g && f._debug('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.')), f._protocols = [], f.protocol = null, f.readyState = y.CONNECTING, f._ir = S(f._base_url), f._ir.onfinish = function (a, b) {
            f._ir = null, a ? (f._options.info && (a = c.objectExtend(a, f._options.info)), f._options.rtt && (b = f._options.rtt), f._applyInfo(a, b, g), f._didClose()) : f._didClose(1002, "Can't connect to server", !0)
        }
    };
    y.prototype = new d, y.version = "0.3.4", y.CONNECTING = 0, y.OPEN = 1, y.CLOSING = 2, y.CLOSED = 3, y.prototype._debug = function () {
        this._options.debug && c.log.apply(c, arguments)
    }, y.prototype._dispatchOpen = function () {
        var a = this;
        a.readyState === y.CONNECTING ? (a._transport_tref && (clearTimeout(a._transport_tref), a._transport_tref = null), a.readyState = y.OPEN, a.dispatchEvent(new e("open"))) : a._didClose(1006, "Server lost session")
    }, y.prototype._dispatchMessage = function (a) {
        var b = this;
        if (b.readyState !== y.OPEN)return;
        b.dispatchEvent(new e("message", {data: a}))
    }, y.prototype._dispatchHeartbeat = function (a) {
        var b = this;
        if (b.readyState !== y.OPEN)return;
        b.dispatchEvent(new e("heartbeat", {}))
    }, y.prototype._didClose = function (a, b, d) {
        var f = this;
        if (f.readyState !== y.CONNECTING && f.readyState !== y.OPEN && f.readyState !== y.CLOSING)throw new Error("INVALID_STATE_ERR");
        f._ir && (f._ir.nuke(), f._ir = null), f._transport && (f._transport.doCleanup(), f._transport = null);
        var g = new e("close", {code: a, reason: b, wasClean: c.userSetCode(a)});
        if (!c.userSetCode(a) && f.readyState === y.CONNECTING && !d) {
            if (f._try_next_protocol(g))return;
            g = new e("close", {code: 2e3, reason: "All transports failed", wasClean: !1, last_event: g})
        }
        f.readyState = y.CLOSED, c.delay(function () {
            f.dispatchEvent(g)
        })
    }, y.prototype._didMessage = function (a) {
        var b = this, c = a.slice(0, 1);
        switch (c) {
            case"o":
                b._dispatchOpen();
                break;
            case"a":
                var d = JSON.parse(a.slice(1) || "[]");
                for (var e = 0; e < d.length; e++)b._dispatchMessage(d[e]);
                break;
            case"m":
                var d = JSON.parse(a.slice(1) || "null");
                b._dispatchMessage(d);
                break;
            case"c":
                var d = JSON.parse(a.slice(1) || "[]");
                b._didClose(d[0], d[1]);
                break;
            case"h":
                b._dispatchHeartbeat()
        }
    }, y.prototype._try_next_protocol = function (b) {
        var d = this;
        d.protocol && (d._debug("Closed transport:", d.protocol, "" + b), d.protocol = null), d._transport_tref && (clearTimeout(d._transport_tref), d._transport_tref = null);
        for (; ;) {
            var e = d.protocol = d._protocols.shift();
            if (!e)return!1;
            if (y[e] && y[e].need_body === !0 && (!a.body || typeof a.readyState != "undefined" && a.readyState !== "complete"))return d._protocols.unshift(e), d.protocol = "waiting-for-load", c.attachEvent("load", function () {
                d._try_next_protocol()
            }), !0;
            if (!!y[e] && !!y[e].enabled(d._options)) {
                var f = y[e].roundTrips || 1, g = (d._options.rto || 0) * f || 5e3;
                d._transport_tref = c.delay(g, function () {
                    d.readyState === y.CONNECTING && d._didClose(2007, "Transport timeouted")
                });
                var h = c.random_string(8), i = d._base_url + "/" + d._server + "/" + h;
                return d._debug("Opening transport:", e, " url:" + i, " RTO:" + d._options.rto), d._transport = new y[e](d, i, d._base_url), !0
            }
            d._debug("Skipping transport:", e)
        }
    }, y.prototype.close = function (a, b) {
        var d = this;
        if (a && !c.userSetCode(a))throw new Error("INVALID_ACCESS_ERR");
        return d.readyState !== y.CONNECTING && d.readyState !== y.OPEN ? !1 : (d.readyState = y.CLOSING, d._didClose(a || 1e3, b || "Normal closure"), !0)
    }, y.prototype.send = function (a) {
        var b = this;
        if (b.readyState === y.CONNECTING)throw new Error("INVALID_STATE_ERR");
        return b.readyState === y.OPEN && b._transport.doSend(c.quote("" + a)), !0
    }, y.prototype._applyInfo = function (b, d, e) {
        var f = this;
        f._options.info = b, f._options.rtt = d, f._options.rto = c.countRTO(d), f._options.info.null_origin = !a.domain;
        var g = c.probeProtocols();
        f._protocols = c.detectProtocols(g, e, b)
    };
    var z = y.websocket = function (a, d) {
        var e = this, f = d + "/websocket";
        f.slice(0, 5) === "https" ? f = "wss" + f.slice(5) : f = "ws" + f.slice(4), e.ri = a, e.url = f;
        var g = b.WebSocket || b.MozWebSocket;
        e.ws = new g(e.url), e.ws.onmessage = function (a) {
            e.ri._didMessage(a.data)
        }, e.unload_ref = c.unload_add(function () {
            e.ws.close()
        }), e.ws.onclose = function () {
            e.ri._didMessage(c.closeFrame(1006, "WebSocket connection broken"))
        }
    };
    z.prototype.doSend = function (a) {
        this.ws.send("[" + a + "]")
    }, z.prototype.doCleanup = function () {
        var a = this, b = a.ws;
        b && (b.onmessage = b.onclose = null, b.close(), c.unload_del(a.unload_ref), a.unload_ref = a.ri = a.ws = null)
    }, z.enabled = function () {
        return!!b.WebSocket || !!b.MozWebSocket
    }, z.roundTrips = 2;
    var A = function () {
    };
    A.prototype.send_constructor = function (a) {
        var b = this;
        b.send_buffer = [], b.sender = a
    }, A.prototype.doSend = function (a) {
        var b = this;
        b.send_buffer.push(a), b.send_stop || b.send_schedule()
    }, A.prototype.send_schedule_wait = function () {
        var a = this, b;
        a.send_stop = function () {
            a.send_stop = null, clearTimeout(b)
        }, b = c.delay(25, function () {
            a.send_stop = null, a.send_schedule()
        })
    }, A.prototype.send_schedule = function () {
        var a = this;
        if (a.send_buffer.length > 0) {
            var b = "[" + a.send_buffer.join(",") + "]";
            a.send_stop = a.sender(a.trans_url, b, function (b, c) {
                a.send_stop = null, b === !1 ? a.ri._didClose(1006, "Sending error " + c) : a.send_schedule_wait()
            }), a.send_buffer = []
        }
    }, A.prototype.send_destructor = function () {
        var a = this;
        a._send_stop && a._send_stop(), a._send_stop = null
    };
    var B = function (b, d, e) {
        var f = this;
        if (!("_send_form"in f)) {
            var g = f._send_form = a.createElement("form"), h = f._send_area = a.createElement("textarea");
            h.name = "d", g.style.display = "none", g.style.position = "absolute", g.method = "POST", g.enctype = "application/x-www-form-urlencoded", g.acceptCharset = "UTF-8", g.appendChild(h), a.body.appendChild(g)
        }
        var g = f._send_form, h = f._send_area, i = "a" + c.random_string(8);
        g.target = i, g.action = b + "/jsonp_send?i=" + i;
        var j;
        try {
            j = a.createElement('<iframe name="' + i + '">')
        } catch (k) {
            j = a.createElement("iframe"), j.name = i
        }
        j.id = i, g.appendChild(j), j.style.display = "none";
        try {
            h.value = d
        } catch (l) {
            c.log("Your browser is seriously broken. Go home! " + l.message)
        }
        g.submit();
        var m = function (a) {
            if (!j.onerror)return;
            j.onreadystatechange = j.onerror = j.onload = null, c.delay(500, function () {
                j.parentNode.removeChild(j), j = null
            }), h.value = "", e(!0)
        };
        return j.onerror = j.onload = m, j.onreadystatechange = function (a) {
            j.readyState == "complete" && m()
        }, m
    }, C = function (a) {
        return function (b, c, d) {
            var e = new a("POST", b + "/xhr_send", c);
            return e.onfinish = function (a, b) {
                d(a === 200 || a === 204, "http status " + a)
            }, function (a) {
                d(!1, a)
            }
        }
    }, D = function (b, d) {
        var e, f = a.createElement("script"), g, h = function (a) {
            g && (g.parentNode.removeChild(g), g = null), f && (clearTimeout(e), f.parentNode.removeChild(f), f.onreadystatechange = f.onerror = f.onload = f.onclick = null, f = null, d(a), d = null)
        }, i = !1, j = null;
        f.id = "a" + c.random_string(8), f.src = b, f.type = "text/javascript", f.charset = "UTF-8", f.onerror = function (a) {
            j || (j = setTimeout(function () {
                i || h(c.closeFrame(1006, "JSONP script loaded abnormally (onerror)"))
            }, 1e3))
        }, f.onload = function (a) {
            h(c.closeFrame(1006, "JSONP script loaded abnormally (onload)"))
        }, f.onreadystatechange = function (a) {
            if (/loaded|closed/.test(f.readyState)) {
                if (f && f.htmlFor && f.onclick) {
                    i = !0;
                    try {
                        f.onclick()
                    } catch (b) {
                    }
                }
                f && h(c.closeFrame(1006, "JSONP script loaded abnormally (onreadystatechange)"))
            }
        };
        if (typeof f.async == "undefined" && a.attachEvent)if (!/opera/i.test(navigator.userAgent)) {
            try {
                f.htmlFor = f.id, f.event = "onclick"
            } catch (k) {
            }
            f.async = !0
        } else g = a.createElement("script"), g.text = "try{var a = document.getElementById('" + f.id + "'); if(a)a.onerror();}catch(x){};", f.async = g.async = !1;
        typeof f.async != "undefined" && (f.async = !0), e = setTimeout(function () {
            h(c.closeFrame(1006, "JSONP script loaded abnormally (timeout)"))
        }, 35e3);
        var l = a.getElementsByTagName("head")[0];
        return l.insertBefore(f, l.firstChild), g && l.insertBefore(g, l.firstChild), h
    }, E = y["jsonp-polling"] = function (a, b) {
        c.polluteGlobalNamespace();
        var d = this;
        d.ri = a, d.trans_url = b, d.send_constructor(B), d._schedule_recv()
    };
    E.prototype = new A, E.prototype._schedule_recv = function () {
        var a = this, b = function (b) {
            a._recv_stop = null, b && (a._is_closing || a.ri._didMessage(b)), a._is_closing || a._schedule_recv()
        };
        a._recv_stop = F(a.trans_url + "/jsonp", D, b)
    }, E.enabled = function () {
        return!0
    }, E.need_body = !0, E.prototype.doCleanup = function () {
        var a = this;
        a._is_closing = !0, a._recv_stop && a._recv_stop(), a.ri = a._recv_stop = null, a.send_destructor()
    };
    var F = function (a, d, e) {
        var f = "a" + c.random_string(6), g = a + "?c=" + escape(h + "." + f), i = 0, j = function (a) {
            switch (i) {
                case 0:
                    delete b[h][f], e(a);
                    break;
                case 1:
                    e(a), i = 2;
                    break;
                case 2:
                    delete b[h][f]
            }
        }, k = d(g, j);
        b[h][f] = k;
        var l = function () {
            b[h][f] && (i = 1, b[h][f](c.closeFrame(1e3, "JSONP user aborted read")))
        };
        return l
    }, G = function () {
    };
    G.prototype = new A, G.prototype.run = function (a, b, c, d, e) {
        var f = this;
        f.ri = a, f.trans_url = b, f.send_constructor(C(e)), f.poll = new $(a, d, b + c, e)
    }, G.prototype.doCleanup = function () {
        var a = this;
        a.poll && (a.poll.abort(), a.poll = null)
    };
    var H = y["xhr-streaming"] = function (a, b) {
        this.run(a, b, "/xhr_streaming", bd, c.XHRCorsObject)
    };
    H.prototype = new G, H.enabled = function () {
        return b.XMLHttpRequest && "withCredentials"in new XMLHttpRequest && !/opera/i.test(navigator.userAgent)
    }, H.roundTrips = 2, H.need_body = !0;
    var I = y["xdr-streaming"] = function (a, b) {
        this.run(a, b, "/xhr_streaming", bd, c.XDRObject)
    };
    I.prototype = new G, I.enabled = function () {
        return!!b.XDomainRequest
    }, I.roundTrips = 2;
    var J = y["xhr-polling"] = function (a, b) {
        this.run(a, b, "/xhr", bd, c.XHRCorsObject)
    };
    J.prototype = new G, J.enabled = H.enabled, J.roundTrips = 2;
    var K = y["xdr-polling"] = function (a, b) {
        this.run(a, b, "/xhr", bd, c.XDRObject)
    };
    K.prototype = new G, K.enabled = I.enabled, K.roundTrips = 2;
    var L = function () {
    };
    L.prototype.i_constructor = function (a, b, d) {
        var e = this;
        e.ri = a, e.origin = c.getOrigin(d), e.base_url = d, e.trans_url = b;
        var f = d + "/iframe.html";
        e.ri._options.devel && (f += "?t=" + +(new Date)), e.window_id = c.random_string(8), f += "#" + e.window_id, e.iframeObj = c.createIframe(f, function (a) {
            e.ri._didClose(1006, "Unable to load an iframe (" + a + ")")
        }), e.onmessage_cb = c.bind(e.onmessage, e), c.attachMessage(e.onmessage_cb)
    }, L.prototype.doCleanup = function () {
        var a = this;
        if (a.iframeObj) {
            c.detachMessage(a.onmessage_cb);
            try {
                a.iframeObj.iframe.contentWindow && a.postMessage("c")
            } catch (b) {
            }
            a.iframeObj.cleanup(), a.iframeObj = null, a.onmessage_cb = a.iframeObj = null
        }
    }, L.prototype.onmessage = function (a) {
        var b = this;
        if (a.origin !== b.origin)return;
        var c = a.data.slice(0, 8), d = a.data.slice(8, 9), e = a.data.slice(9);
        if (c !== b.window_id)return;
        switch (d) {
            case"s":
                b.iframeObj.loaded(), b.postMessage("s", JSON.stringify([y.version, b.protocol, b.trans_url, b.base_url]));
                break;
            case"t":
                b.ri._didMessage(e)
        }
    }, L.prototype.postMessage = function (a, b) {
        var c = this;
        c.iframeObj.post(c.window_id + a + (b || ""), c.origin)
    }, L.prototype.doSend = function (a) {
        this.postMessage("m", a)
    }, L.enabled = function () {
        var a = navigator && navigator.userAgent && navigator.userAgent.indexOf("Konqueror") !== -1;
        return(typeof b.postMessage == "function" || typeof b.postMessage == "object") && !a
    };
    var M, N = function (a, d) {
        parent !== b ? parent.postMessage(M + a + (d || ""), "*") : c.log("Can't postMessage, no parent window.", a, d)
    }, O = function () {
    };
    O.prototype._didClose = function (a, b) {
        N("t", c.closeFrame(a, b))
    }, O.prototype._didMessage = function (a) {
        N("t", a)
    }, O.prototype._doSend = function (a) {
        this._transport.doSend(a)
    }, O.prototype._doCleanup = function () {
        this._transport.doCleanup()
    }, c.parent_origin = undefined, y.bootstrap_iframe = function () {
        var d;
        M = a.location.hash.slice(1);
        var e = function (a) {
            if (a.source !== parent)return;
            typeof c.parent_origin == "undefined" && (c.parent_origin = a.origin);
            if (a.origin !== c.parent_origin)return;
            var e = a.data.slice(0, 8), f = a.data.slice(8, 9), g = a.data.slice(9);
            if (e !== M)return;
            switch (f) {
                case"s":
                    var h = JSON.parse(g), i = h[0], j = h[1], k = h[2], l = h[3];
                    i !== y.version && c.log('Incompatibile SockJS! Main site uses: "' + i + '", the iframe:' + ' "' + y.version + '".');
                    if (!c.flatUrl(k) || !c.flatUrl(l)) {
                        c.log("Only basic urls are supported in SockJS");
                        return
                    }
                    if (!c.isSameOriginUrl(k) || !c.isSameOriginUrl(l)) {
                        c.log("Can't connect to different domain from within an iframe. (" + JSON.stringify([b.location.href, k, l]) + ")");
                        return
                    }
                    d = new O, d._transport = new O[j](d, k, l);
                    break;
                case"m":
                    d._doSend(g);
                    break;
                case"c":
                    d && d._doCleanup(), d = null
            }
        };
        c.attachMessage(e), N("s")
    };
    var P = function (a, b) {
        var d = this;
        c.delay(function () {
            d.doXhr(a, b)
        })
    };
    P.prototype = new f(["finish"]), P.prototype.doXhr = function (a, b) {
        var d = this, e = (new Date).getTime(), f = new b("GET", a + "/info"), g = c.delay(8e3, function () {
            f.ontimeout()
        });
        f.onfinish = function (a, b) {
            clearTimeout(g), g = null;
            if (a === 200) {
                var c = (new Date).getTime() - e, f = JSON.parse(b);
                typeof f != "object" && (f = {}), d.emit("finish", f, c)
            } else d.emit("finish")
        }, f.ontimeout = function () {
            f.close(), d.emit("finish")
        }
    };
    var Q = function (b) {
        var d = this, e = function () {
            var a = new L;
            a.protocol = "w-iframe-info-receiver";
            var c = function (b) {
                if (typeof b == "string" && b.substr(0, 1) === "m") {
                    var c = JSON.parse(b.substr(1)), e = c[0], f = c[1];
                    d.emit("finish", e, f)
                } else d.emit("finish");
                a.doCleanup(), a = null
            }, e = {_options: {}, _didClose: c, _didMessage: c};
            a.i_constructor(e, b, b)
        };
        a.body ? e() : c.attachEvent("load", e)
    };
    Q.prototype = new f(["finish"]);
    var R = function () {
        var a = this;
        c.delay(function () {
            a.emit("finish", {}, 2e3)
        })
    };
    R.prototype = new f(["finish"]);
    var S = function (a) {
        if (c.isSameOriginUrl(a))return new P(a, c.XHRLocalObject);
        switch (c.isXHRCorsCapable()) {
            case 1:
                return new P(a, c.XHRLocalObject);
            case 2:
                return new P(a, c.XDRObject);
            case 3:
                return new Q(a);
            default:
                return new R
        }
    }, T = O["w-iframe-info-receiver"] = function (a, b, d) {
        var e = new P(d, c.XHRLocalObject);
        e.onfinish = function (b, c) {
            a._didMessage("m" + JSON.stringify([b, c])), a._didClose()
        }
    };
    T.prototype.doCleanup = function () {
    };
    var U = y["iframe-eventsource"] = function () {
        var a = this;
        a.protocol = "w-iframe-eventsource", a.i_constructor.apply(a, arguments)
    };
    U.prototype = new L, U.enabled = function () {
        return"EventSource"in b && L.enabled()
    }, U.need_body = !0, U.roundTrips = 3;
    var V = O["w-iframe-eventsource"] = function (a, b) {
        this.run(a, b, "/eventsource", _, c.XHRLocalObject)
    };
    V.prototype = new G;
    var W = y["iframe-xhr-polling"] = function () {
        var a = this;
        a.protocol = "w-iframe-xhr-polling", a.i_constructor.apply(a, arguments)
    };
    W.prototype = new L, W.enabled = function () {
        return b.XMLHttpRequest && L.enabled()
    }, W.need_body = !0, W.roundTrips = 3;
    var X = O["w-iframe-xhr-polling"] = function (a, b) {
        this.run(a, b, "/xhr", bd, c.XHRLocalObject)
    };
    X.prototype = new G;
    var Y = y["iframe-htmlfile"] = function () {
        var a = this;
        a.protocol = "w-iframe-htmlfile", a.i_constructor.apply(a, arguments)
    };
    Y.prototype = new L, Y.enabled = function () {
        return L.enabled()
    }, Y.need_body = !0, Y.roundTrips = 3;
    var Z = O["w-iframe-htmlfile"] = function (a, b) {
        this.run(a, b, "/htmlfile", bc, c.XHRLocalObject)
    };
    Z.prototype = new G;
    var $ = function (a, b, c, d) {
        var e = this;
        e.ri = a, e.Receiver = b, e.recv_url = c, e.AjaxObject = d, e._scheduleRecv()
    };
    $.prototype._scheduleRecv = function () {
        var a = this, b = a.poll = new a.Receiver(a.recv_url, a.AjaxObject), c = 0;
        b.onmessage = function (b) {
            c += 1, a.ri._didMessage(b.data)
        }, b.onclose = function (c) {
            a.poll = b = b.onmessage = b.onclose = null, a.poll_is_closing || (c.reason === "permanent" ? a.ri._didClose(1006, "Polling error (" + c.reason + ")") : a._scheduleRecv())
        }
    }, $.prototype.abort = function () {
        var a = this;
        a.poll_is_closing = !0, a.poll && a.poll.abort()
    };
    var _ = function (a) {
        var b = this, d = new EventSource(a);
        d.onmessage = function (a) {
            b.dispatchEvent(new e("message", {data: unescape(a.data)}))
        }, b.es_close = d.onerror = function (a, f) {
            var g = f ? "user" : d.readyState !== 2 ? "network" : "permanent";
            b.es_close = d.onmessage = d.onerror = null, d.close(), d = null, c.delay(200, function () {
                b.dispatchEvent(new e("close", {reason: g}))
            })
        }
    };
    _.prototype = new d, _.prototype.abort = function () {
        var a = this;
        a.es_close && a.es_close({}, !0)
    };
    var ba, bb = function () {
        if (ba === undefined)if ("ActiveXObject"in b)try {
            ba = !!(new ActiveXObject("htmlfile"))
        } catch (a) {
        } else ba = !1;
        return ba
    }, bc = function (a) {
        var d = this;
        c.polluteGlobalNamespace(), d.id = "a" + c.random_string(6, 26), a += (a.indexOf("?") === -1 ? "?" : "&") + "c=" + escape(h + "." + d.id);
        var f = bb() ? c.createHtmlfile : c.createIframe, g;
        b[h][d.id] = {start: function () {
            g.loaded()
        }, message: function (a) {
            d.dispatchEvent(new e("message", {data: a}))
        }, stop: function () {
            d.iframe_close({}, "network")
        }}, d.iframe_close = function (a, c) {
            g.cleanup(), d.iframe_close = g = null, delete b[h][d.id], d.dispatchEvent(new e("close", {reason: c}))
        }, g = f(a, function (a) {
            d.iframe_close({}, "permanent")
        })
    };
    bc.prototype = new d, bc.prototype.abort = function () {
        var a = this;
        a.iframe_close && a.iframe_close({}, "user")
    };
    var bd = function (a, b) {
        var c = this, d = 0;
        c.xo = new b("POST", a, null), c.xo.onchunk = function (a, b) {
            if (a !== 200)return;
            for (; ;) {
                var f = b.slice(d), g = f.indexOf("\n");
                if (g === -1)break;
                d += g + 1;
                var h = f.slice(0, g);
                c.dispatchEvent(new e("message", {data: h}))
            }
        }, c.xo.onfinish = function (a, b) {
            c.xo.onchunk(a, b), c.xo = null;
            var d = a === 200 ? "network" : "permanent";
            c.dispatchEvent(new e("close", {reason: d}))
        }
    };
    return bd.prototype = new d, bd.prototype.abort = function () {
        var a = this;
        a.xo && (a.xo.close(), a.dispatchEvent(new e("close", {reason: "user"})), a.xo = null)
    }, y.getUtils = function () {
        return c
    }, y.getIframeTransport = function () {
        return L
    }, y
}(), "_sockjs_onload"in window && setTimeout(_sockjs_onload, 1), typeof define == "function" && define.amd && define("sockjs", [], function () {
    return SockJS
})

;
/*
 * UUID-js: A js library to generate and parse UUIDs, TimeUUIDs and generate
 * TimeUUID based on dates for range selections.
 * @see http://www.ietf.org/rfc/rfc4122.txt
 **/

function UUIDjs() {
}

UUIDjs.maxFromBits = function (bits) {
    return Math.pow(2, bits);
};

UUIDjs.limitUI04 = UUIDjs.maxFromBits(4);
UUIDjs.limitUI06 = UUIDjs.maxFromBits(6);
UUIDjs.limitUI08 = UUIDjs.maxFromBits(8);
UUIDjs.limitUI12 = UUIDjs.maxFromBits(12);
UUIDjs.limitUI14 = UUIDjs.maxFromBits(14);
UUIDjs.limitUI16 = UUIDjs.maxFromBits(16);
UUIDjs.limitUI32 = UUIDjs.maxFromBits(32);
UUIDjs.limitUI40 = UUIDjs.maxFromBits(40);
UUIDjs.limitUI48 = UUIDjs.maxFromBits(48);

UUIDjs.randomUI04 = function () {
    return Math.round(Math.random() * UUIDjs.limitUI04);
};
UUIDjs.randomUI06 = function () {
    return Math.round(Math.random() * UUIDjs.limitUI06);
};
UUIDjs.randomUI08 = function () {
    return Math.round(Math.random() * UUIDjs.limitUI08);
};
UUIDjs.randomUI12 = function () {
    return Math.round(Math.random() * UUIDjs.limitUI12);
};
UUIDjs.randomUI14 = function () {
    return Math.round(Math.random() * UUIDjs.limitUI14);
};
UUIDjs.randomUI16 = function () {
    return Math.round(Math.random() * UUIDjs.limitUI16);
};
UUIDjs.randomUI32 = function () {
    return Math.round(Math.random() * UUIDjs.limitUI32);
};
UUIDjs.randomUI40 = function () {
    return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 40 - 30)) * (1 << 30);
};
UUIDjs.randomUI48 = function () {
    return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 48 - 30)) * (1 << 30);
};

UUIDjs.paddedString = function (string, length, z) {
    string = String(string);
    z = (!z) ? '0' : z;
    var i = length - string.length;
    for (i; i > 0; i >>>= 1, z += z) {
        if (i & 1) {
            string = z + string;
        }
    }
    return string;
};

UUIDjs.prototype.fromParts = function (timeLow, timeMid, timeHiAndVersion, clockSeqHiAndReserved, clockSeqLow, node) {
    this.version = (timeHiAndVersion >> 12) & 0xF;
    this.hex = UUIDjs.paddedString(timeLow.toString(16), 8)
        + '-'
        + UUIDjs.paddedString(timeMid.toString(16), 4)
        + '-'
        + UUIDjs.paddedString(timeHiAndVersion.toString(16), 4)
        + '-'
        + UUIDjs.paddedString(clockSeqHiAndReserved.toString(16), 2)
        + UUIDjs.paddedString(clockSeqLow.toString(16), 2)
        + '-'
        + UUIDjs.paddedString(node.toString(16), 12);
    return this;
};

UUIDjs.prototype.toString = function () {
    return this.hex;
};
UUIDjs.prototype.toURN = function () {
    return 'urn:uuid:' + this.hex;
};

UUIDjs.prototype.toBytes = function () {
    var parts = this.hex.split('-');
    var ints = [];
    var intPos = 0;
    var i = 0;
    for (i; i < parts.length; i++) {
        var j = 0;
        for (j; j < parts[i].length; j += 2) {
            ints[intPos++] = parseInt(parts[i].substr(j, 2), 16);
        }
    }
    return ints;
};

UUIDjs.prototype.equals = function (uuid) {
    if (!(uuid instanceof UUID)) {
        return false;
    }
    if (this.hex !== uuid.hex) {
        return false;
    }
    return true;
};

UUIDjs.getTimeFieldValues = function (time) {
    var ts = time - Date.UTC(1582, 9, 15);
    var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
    return { low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
        mid: hm & 0xFFFF, hi: hm >>> 16, timestamp: ts };
};

UUIDjs._create4 = function () {
    return new UUIDjs().fromParts(
        UUIDjs.randomUI32(),
        UUIDjs.randomUI16(),
            0x4000 | UUIDjs.randomUI12(),
            0x80 | UUIDjs.randomUI06(),
        UUIDjs.randomUI08(),
        UUIDjs.randomUI48()
    );
};

UUIDjs._create1 = function () {
    var now = new Date().getTime();
    var sequence = UUIDjs.randomUI14();
    var node = (UUIDjs.randomUI08() | 1) * 0x10000000000 + UUIDjs.randomUI40();
    var tick = UUIDjs.randomUI04();
    var timestamp = 0;
    var timestampRatio = 1 / 4;

    if (now !== timestamp) {
        if (now < timestamp) {
            sequence++;
        }
        timestamp = now;
        tick = UUIDjs.randomUI04();
    } else if (Math.random() < timestampRatio && tick < 9984) {
        tick += 1 + UUIDjs.randomUI04();
    } else {
        sequence++;
    }

    var tf = UUIDjs.getTimeFieldValues(timestamp);
    var tl = tf.low + tick;
    var thav = (tf.hi & 0xFFF) | 0x1000;

    sequence &= 0x3FFF;
    var cshar = (sequence >>> 8) | 0x80;
    var csl = sequence & 0xFF;

    return new UUIDjs().fromParts(tl, tf.mid, thav, cshar, csl, node);
};

UUIDjs.create = function (version) {
    version = version || 4;
    return this['_create' + version]();
};

UUIDjs.fromTime = function (time, last) {
    last = (!last) ? false : last;
    var tf = UUIDjs.getTimeFieldValues(time);
    var tl = tf.low;
    var thav = (tf.hi & 0xFFF) | 0x1000;  // set version '0001'
    if (last === false) {
        return new UUIDjs().fromParts(tl, tf.mid, thav, 0, 0, 0);
    }
    return new UUIDjs().fromParts(tl, tf.mid, thav, 0x80 | UUIDjs.limitUI06, UUIDjs.limitUI08 - 1, UUIDjs.limitUI48 - 1);

};

UUIDjs.firstFromTime = function (time) {
    return UUIDjs.fromTime(time, false);
};
UUIDjs.lastFromTime = function (time) {
    return UUIDjs.fromTime(time, true);
};

UUIDjs.fromURN = function (strId) {
    var r, p = /^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i;
    if ((r === p.exec(strId))) {
        return new UUIDjs().fromParts(parseInt(r[1], 16), parseInt(r[2], 16),
            parseInt(r[3], 16), parseInt(r[4], 16),
            parseInt(r[5], 16), parseInt(r[6], 16));
    }
    return null;
};

UUIDjs.fromBytes = function (ints) {
    var str = '';
    var pos = 0;
    var parts = [4, 2, 2, 2, 6];
    var i = 0;

    if (ints.length < 5) {
        return null;
    }
    for (i; i < parts.length; i++) {
        var j = 0;
        for (j; j < parts[i]; j++) {
            var octet = ints[pos++].toString(16);
            if (octet.length === 1) {
                octet = '0' + octet;
            }
            str += octet;
        }
        if (parts[i] !== 6) {
            str += '-';
        }
    }
    return UUIDjs.fromURN(str);
};

UUIDjs.fromBinary = function (binary) {
    var ints = [];
    var i = 0;
    for (i; i < binary.length; i++) {
        ints[i] = binary.charCodeAt(i);
        if (ints[i] > 255 || ints[i] < 0) {
            throw new Error('Unexpected byte in binary data.');
        }
    }
    return UUIDjs.fromBytes(ints);
};

;
/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/


// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Paho.MQTT module
// only has a single public function, client, which returns
// a Paho.MQTT client object given connection details.

/**
 * Send and receive messages using web browsers.
 * <p>
 * This programming interface lets a JavaScript client application use the MQTT V3.1 or
 * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
 *
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
 * <li>Specifying options that relate to the communications link with the server,
 * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * The API consists of two main objects:
 * <dl>
 * <dt><b>{@link Paho.MQTT.Client}</b></dt>
 * <dd>This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application when a message
 * arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 * <dt><b>{@link Paho.MQTT.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent.</dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use, if it detects
 * an error with any parameter.
 * <p>
 * Example:
 *
 * <code><pre>
 client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
 client.onConnectionLost = onConnectionLost;
 client.onMessageArrived = onMessageArrived;
 client.connect({onSuccess:onConnect});

 function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message); 
};
 function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
	console.log("onConnectionLost:"+responseObject.errorMessage);
};
 function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect(); 
};
 * </pre></code>
 * @namespace Paho.MQTT
 */

if (typeof Paho === "undefined") {
    Paho = {};
}

Paho.MQTT = (function (global) {

    // Private variables below, these are only visible inside the function closure
    // which is used to define the module.

    var version = "@VERSION@";
    var buildLevel = "@BUILDLEVEL@";

    /**
     * Unique message type identifiers, with associated
     * associated integer values.
     * @private
     */
    var MESSAGE_TYPE = {
        CONNECT: 1,
        CONNACK: 2,
        PUBLISH: 3,
        PUBACK: 4,
        PUBREC: 5,
        PUBREL: 6,
        PUBCOMP: 7,
        SUBSCRIBE: 8,
        SUBACK: 9,
        UNSUBSCRIBE: 10,
        UNSUBACK: 11,
        PINGREQ: 12,
        PINGRESP: 13,
        DISCONNECT: 14
    };

    // Collection of utility methods used to simplify module code
    // and promote the DRY pattern.

    /**
     * Validate an object's parameter names to ensure they
     * match a list of expected variables name for this option
     * type. Used to ensure option object passed into the API don't
     * contain erroneous parameters.
     * @param {Object} obj - User options object
     * @param {Object} keys - valid keys and types that may exist in obj.
     * @throws {Error} Invalid option parameter found.
     * @private
     */
    var validate = function (obj, keys) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (keys.hasOwnProperty(key)) {
                    if (typeof obj[key] !== keys[key])
                        throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
                } else {
                    var errorStr = "Unknown property, " + key + ". Valid properties are:";
                    for (var key in keys)
                        if (keys.hasOwnProperty(key))
                            errorStr = errorStr + " " + key;
                    throw new Error(errorStr);
                }
            }
        }
    };

    /**
     * Return a new function which runs the user function bound
     * to a fixed scope.
     * @param {function} User function
     * @param {object} Function scope
     * @return {function} User function bound to another scope
     * @private
     */
    var scope = function (f, scope) {
        return function () {
            return f.apply(scope, arguments);
        };
    };

    /**
     * Unique message type identifiers, with associated
     * associated integer values.
     * @private
     */
    var ERROR = {
        OK: {code: 0, text: "AMQJSC0000I OK."},
        CONNECT_TIMEOUT: {code: 1, text: "AMQJSC0001E Connect timed out."},
        SUBSCRIBE_TIMEOUT: {code: 2, text: "AMQJS0002E Subscribe timed out."},
        UNSUBSCRIBE_TIMEOUT: {code: 3, text: "AMQJS0003E Unsubscribe timed out."},
        PING_TIMEOUT: {code: 4, text: "AMQJS0004E Ping timed out."},
        INTERNAL_ERROR: {code: 5, text: "AMQJS0005E Internal error."},
        CONNACK_RETURNCODE: {code: 6, text: "AMQJS0006E Bad Connack return code:{0} {1}."},
        SOCKET_ERROR: {code: 7, text: "AMQJS0007E Socket error:{0}."},
        SOCKET_CLOSE: {code: 8, text: "AMQJS0008I Socket closed."},
        MALFORMED_UTF: {code: 9, text: "AMQJS0009E Malformed UTF data:{0} {1} {2}."},
        UNSUPPORTED: {code: 10, text: "AMQJS0010E {0} is not supported by this browser."},
        INVALID_STATE: {code: 11, text: "AMQJS0011E Invalid state {0}."},
        INVALID_TYPE: {code: 12, text: "AMQJS0012E Invalid type {0} for {1}."},
        INVALID_ARGUMENT: {code: 13, text: "AMQJS0013E Invalid argument {0} for {1}."},
        UNSUPPORTED_OPERATION: {code: 14, text: "AMQJS0014E Unsupported operation."},
        INVALID_STORED_DATA: {code: 15, text: "AMQJS0015E Invalid data in local storage key={0} value={1}."},
        INVALID_MQTT_MESSAGE_TYPE: {code: 16, text: "AMQJS0016E Invalid MQTT message type {0}."},
        MALFORMED_UNICODE: {code: 17, text: "AMQJS0017E Malformed Unicode string:{0} {1}."}
    };

    /** CONNACK RC Meaning. */
    var CONNACK_RC = {
        0: "Connection Accepted",
        1: "Connection Refused: unacceptable protocol version",
        2: "Connection Refused: identifier rejected",
        3: "Connection Refused: server unavailable",
        4: "Connection Refused: bad user name or password",
        5: "Connection Refused: not authorized"
    };

    /**
     * Format an error message text.
     * @private
     * @param {error} ERROR.KEY value above.
     * @param {substitutions} [array] substituted into the text.
     * @return the text with the substitutions made.
     */
    var format = function (error, substitutions) {
        var text = error.text;
        if (substitutions) {
            for (var i = 0; i < substitutions.length; i++) {
                field = "{" + i + "}";
                start = text.indexOf(field);
                if (start > 0) {
                    var part1 = text.substring(0, start);
                    var part2 = text.substring(start + field.length);
                    text = part1 + substitutions[i] + part2;
                }
            }
        }
        return text;
    };

    //MQTT protocol and version          6    M    Q    I    s    d    p    3
    var MqttProtoIdentifierv3 = [0x00, 0x06, 0x4d, 0x51, 0x49, 0x73, 0x64, 0x70, 0x03];
    //MQTT proto/version for 311         4    M    Q    T    T    4
    var MqttProtoIdentifierv4 = [0x00, 0x04, 0x4d, 0x51, 0x54, 0x54, 0x04];

    /**
     * Construct an MQTT wire protocol message.
     * @param type MQTT packet type.
     * @param options optional wire message attributes.
     *
     * Optional properties
     *
     * messageIdentifier: message ID in the range [0..65535]
     * payloadMessage:    Application Message - PUBLISH only
     * connectStrings:    array of 0 or more Strings to be put into the CONNECT payload
     * topics:            array of strings (SUBSCRIBE, UNSUBSCRIBE)
     * requestQoS:        array of QoS values [0..2]
     *
     * "Flag" properties
     * cleanSession:    true if present / false if absent (CONNECT)
     * willMessage:    true if present / false if absent (CONNECT)
     * isRetained:        true if present / false if absent (CONNECT)
     * userName:        true if present / false if absent (CONNECT)
     * password:        true if present / false if absent (CONNECT)
     * keepAliveInterval:    integer [0..65535]  (CONNECT)
     *
     * @private
     * @ignore
     */
    var WireMessage = function (type, options) {
        this.type = type;
        for (var name in options) {
            if (options.hasOwnProperty(name)) {
                this[name] = options[name];
            }
        }
    };

    WireMessage.prototype.encode = function () {
        // Compute the first byte of the fixed header
        var first = ((this.type & 0x0f) << 4);

        /*
         * Now calculate the length of the variable header + payload by adding up the lengths
         * of all the component parts
         */

        remLength = 0;
        topicStrLength = new Array();

        // if the message contains a messageIdentifier then we need two bytes for that
        if (this.messageIdentifier != undefined)
            remLength += 2;

        switch (this.type) {
            // If this a Connect then we need to include 12 bytes for its header
            case MESSAGE_TYPE.CONNECT:
                switch (this.mqttVersion) {
                    case 3:
                        remLength += MqttProtoIdentifierv3.length + 3;
                        break;
                    case 4:
                        remLength += MqttProtoIdentifierv4.length + 3;
                        break;
                }

                remLength += UTF8Length(this.clientId) + 2;
                if (this.willMessage != undefined) {
                    remLength += UTF8Length(this.willMessage.destinationName) + 2;
                    // Will message is always a string, sent as UTF-8 characters with a preceding length.
                    var willMessagePayloadBytes = this.willMessage.payloadBytes;
                    if (!(willMessagePayloadBytes instanceof Uint8Array))
                        willMessagePayloadBytes = new Uint8Array(payloadBytes);
                    remLength += willMessagePayloadBytes.byteLength + 2;
                }
                if (this.userName != undefined)
                    remLength += UTF8Length(this.userName) + 2;
                if (this.password != undefined)
                    remLength += UTF8Length(this.password) + 2;
                break;

            // Subscribe, Unsubscribe can both contain topic strings
            case MESSAGE_TYPE.SUBSCRIBE:
                first |= 0x02; // Qos = 1;
                for (var i = 0; i < this.topics.length; i++) {
                    topicStrLength[i] = UTF8Length(this.topics[i]);
                    remLength += topicStrLength[i] + 2;
                }
                remLength += this.requestedQos.length; // 1 byte for each topic's Qos
                // QoS on Subscribe only
                break;

            case MESSAGE_TYPE.UNSUBSCRIBE:
                first |= 0x02; // Qos = 1;
                for (var i = 0; i < this.topics.length; i++) {
                    topicStrLength[i] = UTF8Length(this.topics[i]);
                    remLength += topicStrLength[i] + 2;
                }
                break;

            case MESSAGE_TYPE.PUBREL:
                first |= 0x02; // Qos = 1;
                break;

            case MESSAGE_TYPE.PUBLISH:
                if (this.payloadMessage.duplicate) first |= 0x08;
                first = first |= (this.payloadMessage.qos << 1);
                if (this.payloadMessage.retained) first |= 0x01;
                destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
                remLength += destinationNameLength + 2;
                var payloadBytes = this.payloadMessage.payloadBytes;
                remLength += payloadBytes.byteLength;
                if (payloadBytes instanceof ArrayBuffer)
                    payloadBytes = new Uint8Array(payloadBytes);
                else if (!(payloadBytes instanceof Uint8Array))
                    payloadBytes = new Uint8Array(payloadBytes.buffer);
                break;

            case MESSAGE_TYPE.DISCONNECT:
                break;

            default:
                ;
        }

        // Now we can allocate a buffer for the message

        var mbi = encodeMBI(remLength);  // Convert the length to MQTT MBI format
        var pos = mbi.length + 1;        // Offset of start of variable header
        var buffer = new ArrayBuffer(remLength + pos);
        var byteStream = new Uint8Array(buffer);    // view it as a sequence of bytes

        //Write the fixed header into the buffer
        byteStream[0] = first;
        byteStream.set(mbi, 1);

        // If this is a PUBLISH then the variable header starts with a topic
        if (this.type == MESSAGE_TYPE.PUBLISH)
            pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
        // If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time

        else if (this.type == MESSAGE_TYPE.CONNECT) {
            switch (this.mqttVersion) {
                case 3:
                    byteStream.set(MqttProtoIdentifierv3, pos);
                    pos += MqttProtoIdentifierv3.length;
                    break;
                case 4:
                    byteStream.set(MqttProtoIdentifierv4, pos);
                    pos += MqttProtoIdentifierv4.length;
                    break;
            }
            var connectFlags = 0;
            if (this.cleanSession)
                connectFlags = 0x02;
            if (this.willMessage != undefined) {
                connectFlags |= 0x04;
                connectFlags |= (this.willMessage.qos << 3);
                if (this.willMessage.retained) {
                    connectFlags |= 0x20;
                }
            }
            if (this.userName != undefined)
                connectFlags |= 0x80;
            if (this.password != undefined)
                connectFlags |= 0x40;
            byteStream[pos++] = connectFlags;
            pos = writeUint16(this.keepAliveInterval, byteStream, pos);
        }

        // Output the messageIdentifier - if there is one
        if (this.messageIdentifier != undefined)
            pos = writeUint16(this.messageIdentifier, byteStream, pos);

        switch (this.type) {
            case MESSAGE_TYPE.CONNECT:
                pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
                if (this.willMessage != undefined) {
                    pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
                    pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
                    byteStream.set(willMessagePayloadBytes, pos);
                    pos += willMessagePayloadBytes.byteLength;

                }
                if (this.userName != undefined)
                    pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
                if (this.password != undefined)
                    pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
                break;

            case MESSAGE_TYPE.PUBLISH:
                // PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
                byteStream.set(payloadBytes, pos);

                break;

//    	    case MESSAGE_TYPE.PUBREC:	
//    	    case MESSAGE_TYPE.PUBREL:	
//    	    case MESSAGE_TYPE.PUBCOMP:	
//    	    	break;

            case MESSAGE_TYPE.SUBSCRIBE:
                // SUBSCRIBE has a list of topic strings and request QoS
                for (var i = 0; i < this.topics.length; i++) {
                    pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
                    byteStream[pos++] = this.requestedQos[i];
                }
                break;

            case MESSAGE_TYPE.UNSUBSCRIBE:
                // UNSUBSCRIBE has a list of topic strings
                for (var i = 0; i < this.topics.length; i++)
                    pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
                break;

            default:
            // Do nothing.
        }

        return buffer;
    }

    function decodeMessage(input, pos) {
        var startingPos = pos;
        var first = input[pos];
        var type = first >> 4;
        var messageInfo = first &= 0x0f;
        pos += 1;


        // Decode the remaining length (MBI format)

        var digit;
        var remLength = 0;
        var multiplier = 1;
        do {
            if (pos == input.length) {
                return [null, startingPos];
            }
            digit = input[pos++];
            remLength += ((digit & 0x7F) * multiplier);
            multiplier *= 128;
        } while ((digit & 0x80) != 0);

        var endPos = pos + remLength;
        if (endPos > input.length) {
            return [null, startingPos];
        }

        var wireMessage = new WireMessage(type);
        switch (type) {
            case MESSAGE_TYPE.CONNACK:
                var connectAcknowledgeFlags = input[pos++];
                if (connectAcknowledgeFlags & 0x01)
                    wireMessage.sessionPresent = true;
                wireMessage.returnCode = input[pos++];
                break;

            case MESSAGE_TYPE.PUBLISH:
                var qos = (messageInfo >> 1) & 0x03;

                var len = readUint16(input, pos);
                pos += 2;
                var topicName = parseUTF8(input, pos, len);
                pos += len;
                // If QoS 1 or 2 there will be a messageIdentifier
                if (qos > 0) {
                    wireMessage.messageIdentifier = readUint16(input, pos);
                    pos += 2;
                }

                var message = new Paho.MQTT.Message(input.subarray(pos, endPos));
                if ((messageInfo & 0x01) == 0x01)
                    message.retained = true;
                if ((messageInfo & 0x08) == 0x08)
                    message.duplicate = true;
                message.qos = qos;
                message.destinationName = topicName;
                wireMessage.payloadMessage = message;
                break;

            case  MESSAGE_TYPE.PUBACK:
            case  MESSAGE_TYPE.PUBREC:
            case  MESSAGE_TYPE.PUBREL:
            case  MESSAGE_TYPE.PUBCOMP:
            case  MESSAGE_TYPE.UNSUBACK:
                wireMessage.messageIdentifier = readUint16(input, pos);
                break;

            case  MESSAGE_TYPE.SUBACK:
                wireMessage.messageIdentifier = readUint16(input, pos);
                pos += 2;
                wireMessage.returnCode = input.subarray(pos, endPos);
                break;

            default:
                ;
        }

        return [wireMessage, endPos];
    }

    function writeUint16(input, buffer, offset) {
        buffer[offset++] = input >> 8;      //MSB
        buffer[offset++] = input % 256;     //LSB
        return offset;
    }

    function writeString(input, utf8Length, buffer, offset) {
        offset = writeUint16(utf8Length, buffer, offset);
        stringToUTF8(input, buffer, offset);
        return offset + utf8Length;
    }

    function readUint16(buffer, offset) {
        return 256 * buffer[offset] + buffer[offset + 1];
    }

    /**
     * Encodes an MQTT Multi-Byte Integer
     * @private
     */
    function encodeMBI(number) {
        var output = new Array(1);
        var numBytes = 0;

        do {
            var digit = number % 128;
            number = number >> 7;
            if (number > 0) {
                digit |= 0x80;
            }
            output[numBytes++] = digit;
        } while ((number > 0) && (numBytes < 4));

        return output;
    }

    /**
     * Takes a String and calculates its length in bytes when encoded in UTF8.
     * @private
     */
    function UTF8Length(input) {
        var output = 0;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode > 0x7FF) {
                // Surrogate pair means its a 4 byte character
                if (0xD800 <= charCode && charCode <= 0xDBFF) {
                    i++;
                    output++;
                }
                output += 3;
            }
            else if (charCode > 0x7F)
                output += 2;
            else
                output++;
        }
        return output;
    }

    /**
     * Takes a String and writes it into an array as UTF8 encoded bytes.
     * @private
     */
    function stringToUTF8(input, output, start) {
        var pos = start;
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);

            // Check for a surrogate pair.
            if (0xD800 <= charCode && charCode <= 0xDBFF) {
                lowCharCode = input.charCodeAt(++i);
                if (isNaN(lowCharCode)) {
                    throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
                }
                charCode = ((charCode - 0xD800) << 10) + (lowCharCode - 0xDC00) + 0x10000;

            }

            if (charCode <= 0x7F) {
                output[pos++] = charCode;
            } else if (charCode <= 0x7FF) {
                output[pos++] = charCode >> 6 & 0x1F | 0xC0;
                output[pos++] = charCode & 0x3F | 0x80;
            } else if (charCode <= 0xFFFF) {
                output[pos++] = charCode >> 12 & 0x0F | 0xE0;
                output[pos++] = charCode >> 6 & 0x3F | 0x80;
                output[pos++] = charCode & 0x3F | 0x80;
            } else {
                output[pos++] = charCode >> 18 & 0x07 | 0xF0;
                output[pos++] = charCode >> 12 & 0x3F | 0x80;
                output[pos++] = charCode >> 6 & 0x3F | 0x80;
                output[pos++] = charCode & 0x3F | 0x80;
            }
            ;
        }
        return output;
    }

    function parseUTF8(input, offset, length) {
        var output = "";
        var utf16;
        var pos = offset;

        while (pos < offset + length) {
            var byte1 = input[pos++];
            if (byte1 < 128)
                utf16 = byte1;
            else {
                var byte2 = input[pos++] - 128;
                if (byte2 < 0)
                    throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), ""]));
                if (byte1 < 0xE0)             // 2 byte character
                    utf16 = 64 * (byte1 - 0xC0) + byte2;
                else {
                    var byte3 = input[pos++] - 128;
                    if (byte3 < 0)
                        throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
                    if (byte1 < 0xF0)        // 3 byte character
                        utf16 = 4096 * (byte1 - 0xE0) + 64 * byte2 + byte3;
                    else {
                        var byte4 = input[pos++] - 128;
                        if (byte4 < 0)
                            throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                        if (byte1 < 0xF8)        // 4 byte character
                            utf16 = 262144 * (byte1 - 0xF0) + 4096 * byte2 + 64 * byte3 + byte4;
                        else                     // longer encodings are not supported
                            throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                    }
                }
            }

            if (utf16 > 0xFFFF)   // 4 byte character - express as a surrogate pair
            {
                utf16 -= 0x10000;
                output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
                utf16 = 0xDC00 + (utf16 & 0x3FF);  // trail character
            }
            output += String.fromCharCode(utf16);
        }
        return output;
    }

    /**
     * Repeat keepalive requests, monitor responses.
     * @ignore
     */
    var Pinger = function (client, window, keepAliveInterval) {
        this._client = client;
        this._window = window;
        this._keepAliveInterval = keepAliveInterval * 1000;
        this.isReset = false;

        var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();

        var doTimeout = function (pinger) {
            return function () {
                return doPing.apply(pinger);
            };
        };

        /** @ignore */
        var doPing = function () {
            if (!this.isReset) {
                this._client._trace("Pinger.doPing", "Timed out");
                this._client._disconnected(ERROR.PING_TIMEOUT.code, format(ERROR.PING_TIMEOUT));
            } else {
                this.isReset = false;
                this._client._trace("Pinger.doPing", "send PINGREQ");
                this._client.socket.send(pingReq);
                this.timeout = this._window.setTimeout(doTimeout(this), this._keepAliveInterval);
            }
        }

        this.reset = function () {
            this.isReset = true;
            this._window.clearTimeout(this.timeout);
            if (this._keepAliveInterval > 0)
                this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
        }

        this.cancel = function () {
            this._window.clearTimeout(this.timeout);
        }
    };

    /**
     * Monitor request completion.
     * @ignore
     */
    var Timeout = function (client, window, timeoutSeconds, action, args) {
        this._window = window;
        if (!timeoutSeconds)
            timeoutSeconds = 30;

        var doTimeout = function (action, client, args) {
            return function () {
                return action.apply(client, args);
            };
        };
        this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

        this.cancel = function () {
            this._window.clearTimeout(this.timeout);
        }
    };

    /*
     * Internal implementation of the Websockets MQTT V3.1 client.
     *
     * @name Paho.MQTT.ClientImpl @constructor
     * @param {String} host the DNS nameof the webSocket host.
     * @param {Number} port the port number for that host.
     * @param {String} clientId the MQ client identifier.
     */
    var ClientImpl = function (uri, host, port, path, clientId) {
        // Check dependencies are satisfied in this browser.
        if (!("WebSocket" in global && global["WebSocket"] !== null)) {
            throw new Error(format(ERROR.UNSUPPORTED, ["WebSocket"]));
        }
        if (!("localStorage" in global && global["localStorage"] !== null)) {
            throw new Error(format(ERROR.UNSUPPORTED, ["localStorage"]));
        }
        if (!("ArrayBuffer" in global && global["ArrayBuffer"] !== null)) {
            throw new Error(format(ERROR.UNSUPPORTED, ["ArrayBuffer"]));
        }
        this._trace("Paho.MQTT.Client", uri, host, port, path, clientId);

        this.host = host;
        this.port = port;
        this.path = path;
        this.uri = uri;
        this.clientId = clientId;

        // Local storagekeys are qualified with the following string.
        // The conditional inclusion of path in the key is for backward
        // compatibility to when the path was not configurable and assumed to
        // be /mqtt
        this._localKey = host + ":" + port + (path != "/mqtt" ? ":" + path : "") + ":" + clientId + ":";

        // Create private instance-only message queue
        // Internal queue of messages to be sent, in sending order.
        this._msg_queue = [];

        // Messages we have sent and are expecting a response for, indexed by their respective message ids.
        this._sentMessages = {};

        // Messages we have received and acknowleged and are expecting a confirm message for
        // indexed by their respective message ids.
        this._receivedMessages = {};

        // Internal list of callbacks to be executed when messages
        // have been successfully sent over web socket, e.g. disconnect
        // when it doesn't have to wait for ACK, just message is dispatched.
        this._notify_msg_sent = {};

        // Unique identifier for SEND messages, incrementing
        // counter as messages are sent.
        this._message_identifier = 1;

        // Used to determine the transmission sequence of stored sent messages.
        this._sequence = 0;


        // Load the local state, if any, from the saved version, only restore state relevant to this client.
        for (var key in localStorage)
            if (key.indexOf("Sent:" + this._localKey) == 0
                || key.indexOf("Received:" + this._localKey) == 0)
                this.restore(key);
    };

    // Messaging Client public instance members.
    ClientImpl.prototype.host;
    ClientImpl.prototype.port;
    ClientImpl.prototype.path;
    ClientImpl.prototype.uri;
    ClientImpl.prototype.clientId;

    // Messaging Client private instance members.
    ClientImpl.prototype.socket;
    /* true once we have received an acknowledgement to a CONNECT packet. */
    ClientImpl.prototype.connected = false;
    /* The largest message identifier allowed, may not be larger than 2**16 but
     * if set smaller reduces the maximum number of outbound messages allowed.
     */
    ClientImpl.prototype.maxMessageIdentifier = 65536;
    ClientImpl.prototype.connectOptions;
    ClientImpl.prototype.hostIndex;
    ClientImpl.prototype.onConnectionLost;
    ClientImpl.prototype.onMessageDelivered;
    ClientImpl.prototype.onMessageArrived;
    ClientImpl.prototype._msg_queue = null;
    ClientImpl.prototype._connectTimeout;
    /* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
    ClientImpl.prototype.sendPinger = null;
    /* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
    ClientImpl.prototype.receivePinger = null;

    ClientImpl.prototype.receiveBuffer = null;

    ClientImpl.prototype._traceBuffer = null;
    ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

    ClientImpl.prototype.connect = function (connectOptions) {
        var connectOptionsMasked = this._traceMask(connectOptions, "password");
        this._trace("Client.connect", connectOptionsMasked, this.socket, this.connected);

        if (this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
        if (this.socket)
            throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));

        this.connectOptions = connectOptions;

        if (connectOptions.uris) {
            this.hostIndex = 0;
            this._doConnect(connectOptions.uris[0]);
        } else {
            this._doConnect(this.uri);
        }

    };

    ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
        this._trace("Client.subscribe", filter, subscribeOptions);

        if (!this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

        var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
        wireMessage.topics = [filter];
        if (subscribeOptions.qos != undefined)
            wireMessage.requestedQos = [subscribeOptions.qos];
        else
            wireMessage.requestedQos = [0];

        if (subscribeOptions.onSuccess) {
            wireMessage.onSuccess = function (grantedQos) {
                subscribeOptions.onSuccess({invocationContext: subscribeOptions.invocationContext, grantedQos: grantedQos});
            };
        }

        if (subscribeOptions.onFailure) {
            wireMessage.onFailure = function (errorCode) {
                subscribeOptions.onFailure({invocationContext: subscribeOptions.invocationContext, errorCode: errorCode});
            };
        }

        if (subscribeOptions.timeout) {
            wireMessage.timeOut = new Timeout(this, window, subscribeOptions.timeout, subscribeOptions.onFailure
                , [
                    {invocationContext: subscribeOptions.invocationContext,
                        errorCode: ERROR.SUBSCRIBE_TIMEOUT.code,
                        errorMessage: format(ERROR.SUBSCRIBE_TIMEOUT)}
                ]);
        }

        // All subscriptions return a SUBACK.
        this._requires_ack(wireMessage);
        this._schedule_message(wireMessage);
    };

    /** @ignore */
    ClientImpl.prototype.unsubscribe = function (filter, unsubscribeOptions) {
        this._trace("Client.unsubscribe", filter, unsubscribeOptions);

        if (!this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

        var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
        wireMessage.topics = [filter];

        if (unsubscribeOptions.onSuccess) {
            wireMessage.callback = function () {
                unsubscribeOptions.onSuccess({invocationContext: unsubscribeOptions.invocationContext});
            };
        }
        if (unsubscribeOptions.timeout) {
            wireMessage.timeOut = new Timeout(this, window, unsubscribeOptions.timeout, unsubscribeOptions.onFailure
                , [
                    {invocationContext: unsubscribeOptions.invocationContext,
                        errorCode: ERROR.UNSUBSCRIBE_TIMEOUT.code,
                        errorMessage: format(ERROR.UNSUBSCRIBE_TIMEOUT)}
                ]);
        }

        // All unsubscribes return a SUBACK.
        this._requires_ack(wireMessage);
        this._schedule_message(wireMessage);
    };

    ClientImpl.prototype.send = function (message) {
        this._trace("Client.send", message);

        if (!this.connected)
            throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

        wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
        wireMessage.payloadMessage = message;

        if (message.qos > 0)
            this._requires_ack(wireMessage);
        else if (this.onMessageDelivered)
            this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
        this._schedule_message(wireMessage);
    };

    ClientImpl.prototype.disconnect = function () {
        this._trace("Client.disconnect");

        if (!this.socket)
            throw new Error(format(ERROR.INVALID_STATE, ["not connecting or connected"]));

        wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

        // Run the disconnected call back as soon as the message has been sent,
        // in case of a failure later on in the disconnect processing.
        // as a consequence, the _disconected call back may be run several times.
        this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);

        this._schedule_message(wireMessage);
    };

    ClientImpl.prototype.getTraceLog = function () {
        if (this._traceBuffer !== null) {
            this._trace("Client.getTraceLog", new Date());
            this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
            for (var key in this._sentMessages)
                this._trace("_sentMessages ", key, this._sentMessages[key]);
            for (var key in this._receivedMessages)
                this._trace("_receivedMessages ", key, this._receivedMessages[key]);

            return this._traceBuffer;
        }
    };

    ClientImpl.prototype.startTrace = function () {
        if (this._traceBuffer === null) {
            this._traceBuffer = [];
        }
        this._trace("Client.startTrace", new Date(), version);
    };

    ClientImpl.prototype.stopTrace = function () {
        delete this._traceBuffer;
    };

    ClientImpl.prototype._doConnect = function (wsurl) {
        // When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
        if (this.connectOptions.useSSL) {
            var uriParts = wsurl.split(":");
            uriParts[0] = "wss";
            wsurl = uriParts.join(":");
        }
        this.connected = false;
        this.socket = new WebSocket(wsurl, ["mqtt", "mqttv3.1"]);
        this.socket.binaryType = 'arraybuffer';

        this.socket.onopen = scope(this._on_socket_open, this);
        this.socket.onmessage = scope(this._on_socket_message, this);
        this.socket.onerror = scope(this._on_socket_error, this);
        this.socket.onclose = scope(this._on_socket_close, this);

        this.sendPinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);
        this.receivePinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);

        this._connectTimeout = new Timeout(this, window, this.connectOptions.timeout, this._disconnected, [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
    };


    // Schedule a new message to be sent over the WebSockets
    // connection. CONNECT messages cause WebSocket connection
    // to be started. All other messages are queued internally
    // until this has happened. When WS connection starts, process
    // all outstanding messages.
    ClientImpl.prototype._schedule_message = function (message) {
        this._msg_queue.push(message);
        // Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
        if (this.connected) {
            this._process_queue();
        }
    };

    ClientImpl.prototype.store = function (prefix, wireMessage) {
        storedMessage = {type: wireMessage.type, messageIdentifier: wireMessage.messageIdentifier, version: 1};

        switch (wireMessage.type) {
            case MESSAGE_TYPE.PUBLISH:
                if (wireMessage.pubRecReceived)
                    storedMessage.pubRecReceived = true;

                // Convert the payload to a hex string.
                storedMessage.payloadMessage = {};
                var hex = "";
                var messageBytes = wireMessage.payloadMessage.payloadBytes;
                for (var i = 0; i < messageBytes.length; i++) {
                    if (messageBytes[i] <= 0xF)
                        hex = hex + "0" + messageBytes[i].toString(16);
                    else
                        hex = hex + messageBytes[i].toString(16);
                }
                storedMessage.payloadMessage.payloadHex = hex;

                storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
                storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
                if (wireMessage.payloadMessage.duplicate)
                    storedMessage.payloadMessage.duplicate = true;
                if (wireMessage.payloadMessage.retained)
                    storedMessage.payloadMessage.retained = true;

                // Add a sequence number to sent messages.
                if (prefix.indexOf("Sent:") == 0) {
                    if (wireMessage.sequence === undefined)
                        wireMessage.sequence = ++this._sequence;
                    storedMessage.sequence = wireMessage.sequence;
                }
                break;

            default:
                throw Error(format(ERROR.INVALID_STORED_DATA, [key, storedMessage]));
        }
        localStorage.setItem(prefix + this._localKey + wireMessage.messageIdentifier, JSON.stringify(storedMessage));
    };

    ClientImpl.prototype.restore = function (key) {
        var value = localStorage.getItem(key);
        var storedMessage = JSON.parse(value);

        var wireMessage = new WireMessage(storedMessage.type, storedMessage);

        switch (storedMessage.type) {
            case MESSAGE_TYPE.PUBLISH:
                // Replace the payload message with a Message object.
                var hex = storedMessage.payloadMessage.payloadHex;
                var buffer = new ArrayBuffer((hex.length) / 2);
                var byteStream = new Uint8Array(buffer);
                var i = 0;
                while (hex.length >= 2) {
                    var x = parseInt(hex.substring(0, 2), 16);
                    hex = hex.substring(2, hex.length);
                    byteStream[i++] = x;
                }
                var payloadMessage = new Paho.MQTT.Message(byteStream);

                payloadMessage.qos = storedMessage.payloadMessage.qos;
                payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
                if (storedMessage.payloadMessage.duplicate)
                    payloadMessage.duplicate = true;
                if (storedMessage.payloadMessage.retained)
                    payloadMessage.retained = true;
                wireMessage.payloadMessage = payloadMessage;

                break;

            default:
                throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
        }

        if (key.indexOf("Sent:" + this._localKey) == 0) {
            wireMessage.payloadMessage.duplicate = true;
            this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
        } else if (key.indexOf("Received:" + this._localKey) == 0) {
            this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
        }
    };

    ClientImpl.prototype._process_queue = function () {
        var message = null;
        // Process messages in order they were added
        var fifo = this._msg_queue.reverse();

        // Send all queued messages down socket connection
        while ((message = fifo.pop())) {
            this._socket_send(message);
            // Notify listeners that message was successfully sent
            if (this._notify_msg_sent[message]) {
                this._notify_msg_sent[message]();
                delete this._notify_msg_sent[message];
            }
        }
    };

    /**
     * Expect an ACK response for this message. Add message to the set of in progress
     * messages and set an unused identifier in this message.
     * @ignore
     */
    ClientImpl.prototype._requires_ack = function (wireMessage) {
        var messageCount = Object.keys(this._sentMessages).length;
        if (messageCount > this.maxMessageIdentifier)
            throw Error("Too many messages:" + messageCount);

        while (this._sentMessages[this._message_identifier] !== undefined) {
            this._message_identifier++;
        }
        wireMessage.messageIdentifier = this._message_identifier;
        this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
        if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
            this.store("Sent:", wireMessage);
        }
        if (this._message_identifier === this.maxMessageIdentifier) {
            this._message_identifier = 1;
        }
    };

    /**
     * Called when the underlying websocket has been opened.
     * @ignore
     */
    ClientImpl.prototype._on_socket_open = function () {
        // Create the CONNECT message object.
        var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
        wireMessage.clientId = this.clientId;
        this._socket_send(wireMessage);
    };

    /**
     * Called when the underlying websocket has received a complete packet.
     * @ignore
     */
    ClientImpl.prototype._on_socket_message = function (event) {
        this._trace("Client._on_socket_message", event.data);
        // Reset the receive ping timer, we now have evidence the server is alive.
        this.receivePinger.reset();
        var messages = this._deframeMessages(event.data);
        for (var i = 0; i < messages.length; i += 1) {
            this._handleMessage(messages[i]);
        }
    }

    ClientImpl.prototype._deframeMessages = function (data) {
        var byteArray = new Uint8Array(data);
        if (this.receiveBuffer) {
            var newData = new Uint8Array(this.receiveBuffer.length + byteArray.length);
            newData.set(this.receiveBuffer);
            newData.set(byteArray, this.receiveBuffer.length);
            byteArray = newData;
            delete this.receiveBuffer;
        }
        try {
            var offset = 0;
            var messages = [];
            while (offset < byteArray.length) {
                var result = decodeMessage(byteArray, offset);
                var wireMessage = result[0];
                offset = result[1];
                if (wireMessage !== null) {
                    messages.push(wireMessage);
                } else {
                    break;
                }
            }
            if (offset < byteArray.length) {
                this.receiveBuffer = byteArray.subarray(offset);
            }
        } catch (error) {
            this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message]));
            return;
        }
        return messages;
    }

    ClientImpl.prototype._handleMessage = function (wireMessage) {

        this._trace("Client._handleMessage", wireMessage);

        try {
            switch (wireMessage.type) {
                case MESSAGE_TYPE.CONNACK:
                    this._connectTimeout.cancel();

                    // If we have started using clean session then clear up the local state.
                    if (this.connectOptions.cleanSession) {
                        for (var key in this._sentMessages) {
                            var sentMessage = this._sentMessages[key];
                            localStorage.removeItem("Sent:" + this._localKey + sentMessage.messageIdentifier);
                        }
                        this._sentMessages = {};

                        for (var key in this._receivedMessages) {
                            var receivedMessage = this._receivedMessages[key];
                            localStorage.removeItem("Received:" + this._localKey + receivedMessage.messageIdentifier);
                        }
                        this._receivedMessages = {};
                    }
                    // Client connected and ready for business.
                    if (wireMessage.returnCode === 0) {
                        this.connected = true;
                        // Jump to the end of the list of uris and stop looking for a good host.
                        if (this.connectOptions.uris)
                            this.hostIndex = this.connectOptions.uris.length;
                    } else {
                        this._disconnected(ERROR.CONNACK_RETURNCODE.code, format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
                        break;
                    }

                    // Resend messages.
                    var sequencedMessages = new Array();
                    for (var msgId in this._sentMessages) {
                        if (this._sentMessages.hasOwnProperty(msgId))
                            sequencedMessages.push(this._sentMessages[msgId]);
                    }

                    // Sort sentMessages into the original sent order.
                    var sequencedMessages = sequencedMessages.sort(function (a, b) {
                        return a.sequence - b.sequence;
                    });
                    for (var i = 0, len = sequencedMessages.length; i < len; i++) {
                        var sentMessage = sequencedMessages[i];
                        if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
                            var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier: sentMessage.messageIdentifier});
                            this._schedule_message(pubRelMessage);
                        } else {
                            this._schedule_message(sentMessage);
                        }
                        ;
                    }

                    // Execute the connectOptions.onSuccess callback if there is one.
                    if (this.connectOptions.onSuccess) {
                        this.connectOptions.onSuccess({invocationContext: this.connectOptions.invocationContext});
                    }

                    // Process all queued messages now that the connection is established.
                    this._process_queue();
                    break;

                case MESSAGE_TYPE.PUBLISH:
                    this._receivePublish(wireMessage);
                    break;

                case MESSAGE_TYPE.PUBACK:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    // If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
                    if (sentMessage) {
                        delete this._sentMessages[wireMessage.messageIdentifier];
                        localStorage.removeItem("Sent:" + this._localKey + wireMessage.messageIdentifier);
                        if (this.onMessageDelivered)
                            this.onMessageDelivered(sentMessage.payloadMessage);
                    }
                    break;

                case MESSAGE_TYPE.PUBREC:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    // If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
                    if (sentMessage) {
                        sentMessage.pubRecReceived = true;
                        var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier: wireMessage.messageIdentifier});
                        this.store("Sent:", sentMessage);
                        this._schedule_message(pubRelMessage);
                    }
                    break;

                case MESSAGE_TYPE.PUBREL:
                    var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
                    localStorage.removeItem("Received:" + this._localKey + wireMessage.messageIdentifier);
                    // If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
                    if (receivedMessage) {
                        this._receiveMessage(receivedMessage);
                        delete this._receivedMessages[wireMessage.messageIdentifier];
                    }
                    // Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
                    pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, {messageIdentifier: wireMessage.messageIdentifier});
                    this._schedule_message(pubCompMessage);


                    break;

                case MESSAGE_TYPE.PUBCOMP:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    delete this._sentMessages[wireMessage.messageIdentifier];
                    localStorage.removeItem("Sent:" + this._localKey + wireMessage.messageIdentifier);
                    if (this.onMessageDelivered)
                        this.onMessageDelivered(sentMessage.payloadMessage);
                    break;

                case MESSAGE_TYPE.SUBACK:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    if (sentMessage) {
                        if (sentMessage.timeOut)
                            sentMessage.timeOut.cancel();
                        wireMessage.returnCode.indexOf = Array.prototype.indexOf;
                        if (wireMessage.returnCode.indexOf(0x80) !== -1) {
                            if (sentMessage.onFailure) {
                                sentMessage.onFailure(wireMessage.returnCode);
                            }
                        } else if (sentMessage.onSuccess) {
                            sentMessage.onSuccess(wireMessage.returnCode);
                        }
                        delete this._sentMessages[wireMessage.messageIdentifier];
                    }
                    break;

                case MESSAGE_TYPE.UNSUBACK:
                    var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                    if (sentMessage) {
                        if (sentMessage.timeOut)
                            sentMessage.timeOut.cancel();
                        if (sentMessage.callback) {
                            sentMessage.callback();
                        }
                        delete this._sentMessages[wireMessage.messageIdentifier];
                    }

                    break;

                case MESSAGE_TYPE.PINGRESP:
                    /* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
                    this.sendPinger.reset();
                    break;

                case MESSAGE_TYPE.DISCONNECT:
                    // Clients do not expect to receive disconnect packets.
                    this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
                    break;

                default:
                    this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
            }
            ;
        } catch (error) {
            this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message]));
            return;
        }
    };

    /** @ignore */
    ClientImpl.prototype._on_socket_error = function (error) {
        this._disconnected(ERROR.SOCKET_ERROR.code, format(ERROR.SOCKET_ERROR, [error.data]));
    };

    /** @ignore */
    ClientImpl.prototype._on_socket_close = function () {
        this._disconnected(ERROR.SOCKET_CLOSE.code, format(ERROR.SOCKET_CLOSE));
    };

    /** @ignore */
    ClientImpl.prototype._socket_send = function (wireMessage) {

        if (wireMessage.type == 1) {
            var wireMessageMasked = this._traceMask(wireMessage, "password");
            this._trace("Client._socket_send", wireMessageMasked);
        }
        else this._trace("Client._socket_send", wireMessage);

        this.socket.send(wireMessage.encode());
        /* We have proved to the server we are alive. */
        this.sendPinger.reset();
    };

    /** @ignore */
    ClientImpl.prototype._receivePublish = function (wireMessage) {
        switch (wireMessage.payloadMessage.qos) {
            case "undefined":
            case 0:
                this._receiveMessage(wireMessage);
                break;

            case 1:
                var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, {messageIdentifier: wireMessage.messageIdentifier});
                this._schedule_message(pubAckMessage);
                this._receiveMessage(wireMessage);
                break;

            case 2:
                this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
                this.store("Received:", wireMessage);
                var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, {messageIdentifier: wireMessage.messageIdentifier});
                this._schedule_message(pubRecMessage);

                break;

            default:
                throw Error("Invaild qos=" + wireMmessage.payloadMessage.qos);
        }
        ;
    };

    /** @ignore */
    ClientImpl.prototype._receiveMessage = function (wireMessage) {
        if (this.onMessageArrived) {
            this.onMessageArrived(wireMessage.payloadMessage);
        }
    };

    /**
     * Client has disconnected either at its own request or because the server
     * or network disconnected it. Remove all non-durable state.
     * @param {errorCode} [number] the error number.
     * @param {errorText} [string] the error text.
     * @ignore
     */
    ClientImpl.prototype._disconnected = function (errorCode, errorText) {
        this._trace("Client._disconnected", errorCode, errorText);

        this.sendPinger.cancel();
        this.receivePinger.cancel();
        if (this._connectTimeout)
            this._connectTimeout.cancel();
        // Clear message buffers.
        this._msg_queue = [];
        this._notify_msg_sent = {};

        if (this.socket) {
            // Cancel all socket callbacks so that they cannot be driven again by this socket.
            this.socket.onopen = null;
            this.socket.onmessage = null;
            this.socket.onerror = null;
            this.socket.onclose = null;
            if (this.socket.readyState === 1)
                this.socket.close();
            delete this.socket;
        }

        if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1) {
            // Try the next host.
            this.hostIndex++;
            this._doConnect(this.connectOptions.uris[this.hostIndex]);

        } else {

            if (errorCode === undefined) {
                errorCode = ERROR.OK.code;
                errorText = format(ERROR.OK);
            }

            // Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
            if (this.connected) {
                this.connected = false;
                // Execute the connectionLostCallback if there is one, and we were connected.
                if (this.onConnectionLost)
                    this.onConnectionLost({errorCode: errorCode, errorMessage: errorText});
            } else {
                // Otherwise we never had a connection, so indicate that the connect has failed.
                if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
                    this._trace("Failed to connect V4, dropping back to V3")
                    this.connectOptions.mqttVersion = 3;
                    if (this.connectOptions.uris) {
                        this.hostIndex = 0;
                        this._doConnect(this.connectOptions.uris[0]);
                    } else {
                        this._doConnect(this.uri);
                    }
                } else if (this.connectOptions.onFailure) {
                    this.connectOptions.onFailure({invocationContext: this.connectOptions.invocationContext, errorCode: errorCode, errorMessage: errorText});
                }
            }
        }
    };

    /** @ignore */
    ClientImpl.prototype._trace = function () {
        if (this._traceBuffer !== null) {
            for (var i = 0, max = arguments.length; i < max; i++) {
                if (this._traceBuffer.length == this._MAX_TRACE_ENTRIES) {
                    this._traceBuffer.shift();
                }
                if (i === 0) this._traceBuffer.push(arguments[i]);
                else if (typeof arguments[i] === "undefined") this._traceBuffer.push(arguments[i]);
                else this._traceBuffer.push("  " + JSON.stringify(arguments[i]));
            }
            ;
        }
        ;
    };

    /** @ignore */
    ClientImpl.prototype._traceMask = function (traceObject, masked) {
        var traceObjectMasked = {};
        for (var attr in traceObject) {
            if (traceObject.hasOwnProperty(attr)) {
                if (attr == masked)
                    traceObjectMasked[attr] = "******";
                else
                    traceObjectMasked[attr] = traceObject[attr];
            }
        }
        return traceObjectMasked;
    };

    // ------------------------------------------------------------------------
    // Public Programming interface.
    // ------------------------------------------------------------------------

    /**
     * The JavaScript application communicates to the server using a {@link Paho.MQTT.Client} object.
     * <p>
     * Most applications will create just one Client object and then call its connect() method,
     * however applications can create more than one Client object if they wish.
     * In this case the combination of host, port and clientId attributes must be different for each Client object.
     * <p>
     * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
     * (even though the underlying protocol exchange might be synchronous in nature).
     * This means they signal their completion by calling back to the application,
     * via Success or Failure callback functions provided by the application on the method in question.
     * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
     * of the script that made the invocation.
     * <p>
     * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
     * that are defined on the {@link Paho.MQTT.Client} object.
     * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
     *
     * @name Paho.MQTT.Client
     *
     * @constructor
     *
     * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
     * @param {number} port - the port number to connect to - only required if host is not a URI
     * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
     * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
     *
     * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
     * @property {number} port - <i>read only</i> the server's port.
     * @property {string} path - <i>read only</i> the server's path.
     * @property {string} clientId - <i>read only</i> used when connecting to the server.
     * @property {function} onConnectionLost - called when a connection has been lost.
     *                            after a connect() method has succeeded.
     *                            Establish the call back used when a connection has been lost. The connection may be
     *                            lost because the client initiates a disconnect or because the server or network
     *                            cause the client to be disconnected. The disconnect call back may be called without
     *                            the connectionComplete call back being invoked if, for example the client fails to
     *                            connect.
     *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
     *                            <ol>
     *                            <li>errorCode
     *                            <li>errorMessage
     *                            </ol>
     * @property {function} onMessageDelivered called when a message has been delivered.
     *                            All processing that this Client will ever do has been completed. So, for example,
     *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
     *                            and the message has been removed from persistent storage before this callback is invoked.
     *                            Parameters passed to the onMessageDelivered callback are:
     *                            <ol>
     *                            <li>{@link Paho.MQTT.Message} that was delivered.
     *                            </ol>
     * @property {function} onMessageArrived called when a message has arrived in this Paho.MQTT.client.
     *                            Parameters passed to the onMessageArrived callback are:
     *                            <ol>
     *                            <li>{@link Paho.MQTT.Message} that has arrived.
     *                            </ol>
     */
    var Client = function (host, port, path, clientId) {

        var uri;

        if (typeof host !== "string")
            throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));

        if (arguments.length == 2) {
            // host: must be full ws:// uri
            // port: clientId
            clientId = port;
            uri = host;
            var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
            if (match) {
                host = match[4] || match[2];
                port = parseInt(match[7]);
                path = match[8];
            } else {
                throw new Error(format(ERROR.INVALID_ARGUMENT, [host, "host"]));
            }
        } else {
            if (arguments.length == 3) {
                clientId = path;
                path = "/mqtt";
            }
            if (typeof port !== "number" || port < 0)
                throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
            if (typeof path !== "string")
                throw new Error(format(ERROR.INVALID_TYPE, [typeof path, "path"]));

            var ipv6AddSBracket = (host.indexOf(":") != -1 && host.slice(0, 1) != "[" && host.slice(-1) != "]");
            uri = "ws://" + (ipv6AddSBracket ? "[" + host + "]" : host) + ":" + port + path;
        }

        var clientIdLength = 0;
        for (var i = 0; i < clientId.length; i++) {
            var charCode = clientId.charCodeAt(i);
            if (0xD800 <= charCode && charCode <= 0xDBFF) {
                i++; // Surrogate pair.
            }
            clientIdLength++;
        }
        if (typeof clientId !== "string" || clientIdLength > 65535)
            throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));

        var client = new ClientImpl(uri, host, port, path, clientId);
        this._getHost = function () {
            return host;
        };
        this._setHost = function () {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getPort = function () {
            return port;
        };
        this._setPort = function () {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getPath = function () {
            return path;
        };
        this._setPath = function () {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getURI = function () {
            return uri;
        };
        this._setURI = function () {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getClientId = function () {
            return client.clientId;
        };
        this._setClientId = function () {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
        };

        this._getOnConnectionLost = function () {
            return client.onConnectionLost;
        };
        this._setOnConnectionLost = function (newOnConnectionLost) {
            if (typeof newOnConnectionLost === "function")
                client.onConnectionLost = newOnConnectionLost;
            else
                throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
        };

        this._getOnMessageDelivered = function () {
            return client.onMessageDelivered;
        };
        this._setOnMessageDelivered = function (newOnMessageDelivered) {
            if (typeof newOnMessageDelivered === "function")
                client.onMessageDelivered = newOnMessageDelivered;
            else
                throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
        };

        this._getOnMessageArrived = function () {
            return client.onMessageArrived;
        };
        this._setOnMessageArrived = function (newOnMessageArrived) {
            if (typeof newOnMessageArrived === "function")
                client.onMessageArrived = newOnMessageArrived;
            else
                throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
        };

        /**
         * Connect this Messaging client to its server.
         *
         * @name Paho.MQTT.Client#connect
         * @function
         * @param {Object} connectOptions - attributes used with the connection.
         * @param {number} connectOptions.timeout - If the connect has not succeeded within this
         *                    number of seconds, it is deemed to have failed.
         *                    The default is 30 seconds.
         * @param {string} connectOptions.userName - Authentication username for this connection.
         * @param {string} connectOptions.password - Authentication password for this connection.
         * @param {Paho.MQTT.Message} connectOptions.willMessage - sent by the server when the client
         *                    disconnects abnormally.
         * @param {Number} connectOptions.keepAliveInterval - the server disconnects this client if
         *                    there is no activity for this number of seconds.
         *                    The default value of 60 seconds is assumed if not set.
         * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
         *                    persistent state is deleted on successful connect.
         * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
         * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
         * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
         *                    has been received from the server.
         * A single response object parameter is passed to the onSuccess callback containing the following fields:
         * <ol>
         * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
         * </ol>
         * @config {function} [onFailure] called when the connect request has failed or timed out.
         * A single response object parameter is passed to the onFailure callback containing the following fields:
         * <ol>
         * <li>invocationContext as passed in to the onFailure method in the connectOptions.
         * <li>errorCode a number indicating the nature of the error.
         * <li>errorMessage text describing the error.
         * </ol>
         * @config {Array} [hosts] If present this contains either a set of hostnames or fully qualified
         * WebSocket URIs (ws://example.com:1883/mqtt), that are tried in order in place
         * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
         * one of then succeeds.
         * @config {Array} [ports] If present the set of ports matching the hosts. If hosts contains URIs, this property
         * is not used.
         * @throws {InvalidState} if the client is not in disconnected state. The client must have received connectionLost
         * or disconnected before calling connect for a second or subsequent time.
         */
        this.connect = function (connectOptions) {
            connectOptions = connectOptions || {};
            validate(connectOptions, {timeout: "number",
                userName: "string",
                password: "string",
                willMessage: "object",
                keepAliveInterval: "number",
                cleanSession: "boolean",
                useSSL: "boolean",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                hosts: "object",
                ports: "object",
                mqttVersion: "number"});

            // If no keep alive interval is set, assume 60 seconds.
            if (connectOptions.keepAliveInterval === undefined)
                connectOptions.keepAliveInterval = 60;

            if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
                throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
            }

            if (connectOptions.mqttVersion === undefined) {
                connectOptions.mqttVersionExplicit = false;
                connectOptions.mqttVersion = 4;
            } else {
                connectOptions.mqttVersionExplicit = true;
            }

            //Check that if password is set, so is username
            if (connectOptions.password === undefined && connectOptions.userName !== undefined)
                throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]))

            if (connectOptions.willMessage) {
                if (!(connectOptions.willMessage instanceof Message))
                    throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
                // The will message must have a payload that can be represented as a string.
                // Cause the willMessage to throw an exception if this is not the case.
                connectOptions.willMessage.stringPayload;

                if (typeof connectOptions.willMessage.destinationName === "undefined")
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
            }
            if (typeof connectOptions.cleanSession === "undefined")
                connectOptions.cleanSession = true;
            if (connectOptions.hosts) {

                if (!(connectOptions.hosts instanceof Array))
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
                if (connectOptions.hosts.length < 1)
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));

                var usingURIs = false;
                for (var i = 0; i < connectOptions.hosts.length; i++) {
                    if (typeof connectOptions.hosts[i] !== "string")
                        throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts[" + i + "]"]));
                    if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
                        if (i == 0) {
                            usingURIs = true;
                        } else if (!usingURIs) {
                            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts[" + i + "]"]));
                        }
                    } else if (usingURIs) {
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts[" + i + "]"]));
                    }
                }

                if (!usingURIs) {
                    if (!connectOptions.ports)
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
                    if (!(connectOptions.ports instanceof Array))
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
                    if (connectOptions.hosts.length != connectOptions.ports.length)
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));

                    connectOptions.uris = [];

                    for (var i = 0; i < connectOptions.hosts.length; i++) {
                        if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
                            throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports[" + i + "]"]));
                        var host = connectOptions.hosts[i];
                        var port = connectOptions.ports[i];

                        var ipv6 = (host.indexOf(":") != -1);
                        uri = "ws://" + (ipv6 ? "[" + host + "]" : host) + ":" + port + path;
                        connectOptions.uris.push(uri);
                    }
                } else {
                    connectOptions.uris = connectOptions.hosts;
                }
            }

            client.connect(connectOptions);
        };

        /**
         * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
         *
         * @name Paho.MQTT.Client#subscribe
         * @function
         * @param {string} filter describing the destinations to receive messages from.
         * <br>
         * @param {object} subscribeOptions - used to control the subscription
         *
         * @param {number} subscribeOptions.qos - the maiximum qos of any publications sent
         *                                  as a result of making this subscription.
         * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
         *                                  or onFailure callback.
         * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
         *                                  has been received from the server.
         *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
         *                                  <ol>
         *                                  <li>invocationContext if set in the subscribeOptions.
         *                                  </ol>
         * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
         *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
         *                                  <ol>
         *                                  <li>invocationContext - if set in the subscribeOptions.
         *                                  <li>errorCode - a number indicating the nature of the error.
         *                                  <li>errorMessage - text describing the error.
         *                                  </ol>
         * @param {number} subscribeOptions.timeout - which, if present, determines the number of
         *                                  seconds after which the onFailure calback is called.
         *                                  The presence of a timeout does not prevent the onSuccess
         *                                  callback from being called when the subscribe completes.
         * @throws {InvalidState} if the client is not in connected state.
         */
        this.subscribe = function (filter, subscribeOptions) {
            if (typeof filter !== "string")
                throw new Error("Invalid argument:" + filter);
            subscribeOptions = subscribeOptions || {};
            validate(subscribeOptions, {qos: "number",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            });
            if (subscribeOptions.timeout && !subscribeOptions.onFailure)
                throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
            if (typeof subscribeOptions.qos !== "undefined"
                && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2 ))
                throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
            client.subscribe(filter, subscribeOptions);
        };

        /**
         * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
         *
         * @name Paho.MQTT.Client#unsubscribe
         * @function
         * @param {string} filter - describing the destinations to receive messages from.
         * @param {object} unsubscribeOptions - used to control the subscription
         * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
         or onFailure callback.
         * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
         *                                    A single response object parameter is passed to the
         *                                    onSuccess callback containing the following fields:
         *                                    <ol>
         *                                    <li>invocationContext - if set in the unsubscribeOptions.
         *                                    </ol>
         * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
         *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
         *                                    <ol>
         *                                    <li>invocationContext - if set in the unsubscribeOptions.
         *                                    <li>errorCode - a number indicating the nature of the error.
         *                                    <li>errorMessage - text describing the error.
         *                                    </ol>
         * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
         *                                    after which the onFailure callback is called. The presence of
         *                                    a timeout does not prevent the onSuccess callback from being
         *                                    called when the unsubscribe completes
         * @throws {InvalidState} if the client is not in connected state.
         */
        this.unsubscribe = function (filter, unsubscribeOptions) {
            if (typeof filter !== "string")
                throw new Error("Invalid argument:" + filter);
            unsubscribeOptions = unsubscribeOptions || {};
            validate(unsubscribeOptions, {invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            });
            if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
                throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
            client.unsubscribe(filter, unsubscribeOptions);
        };

        /**
         * Send a message to the consumers of the destination in the Message.
         *
         * @name Paho.MQTT.Client#send
         * @function
         * @param {Paho.MQTT.Message} message to send.

         * @throws {InvalidState} if the client is not connected.
         */
        this.send = function (message) {
            if (!(message instanceof Message))
                throw new Error("Invalid argument:" + typeof message);
            if (typeof message.destinationName === "undefined")
                throw new Error("Invalid parameter Message.destinationName:" + message.destinationName);

            client.send(message);
        };

        /**
         * Normal disconnect of this Messaging client from its server.
         *
         * @name Paho.MQTT.Client#disconnect
         * @function
         * @throws {InvalidState} if the client is already disconnected.
         */
        this.disconnect = function () {
            client.disconnect();
        };

        /**
         * Get the contents of the trace log.
         *
         * @name Paho.MQTT.Client#getTraceLog
         * @function
         * @return {Object[]} tracebuffer containing the time ordered trace records.
         */
        this.getTraceLog = function () {
            return client.getTraceLog();
        }

        /**
         * Start tracing.
         *
         * @name Paho.MQTT.Client#startTrace
         * @function
         */
        this.startTrace = function () {
            client.startTrace();
        };

        /**
         * Stop tracing.
         *
         * @name Paho.MQTT.Client#stopTrace
         * @function
         */
        this.stopTrace = function () {
            client.stopTrace();
        };

        this.isConnected = function () {
            return client.connected;
        };
    };

    Client.prototype = {
        get host() {
            return this._getHost();
        },
        set host(newHost) {
            this._setHost(newHost);
        },

        get port() {
            return this._getPort();
        },
        set port(newPort) {
            this._setPort(newPort);
        },

        get path() {
            return this._getPath();
        },
        set path(newPath) {
            this._setPath(newPath);
        },

        get clientId() {
            return this._getClientId();
        },
        set clientId(newClientId) {
            this._setClientId(newClientId);
        },

        get onConnectionLost() {
            return this._getOnConnectionLost();
        },
        set onConnectionLost(newOnConnectionLost) {
            this._setOnConnectionLost(newOnConnectionLost);
        },

        get onMessageDelivered() {
            return this._getOnMessageDelivered();
        },
        set onMessageDelivered(newOnMessageDelivered) {
            this._setOnMessageDelivered(newOnMessageDelivered);
        },

        get onMessageArrived() {
            return this._getOnMessageArrived();
        },
        set onMessageArrived(newOnMessageArrived) {
            this._setOnMessageArrived(newOnMessageArrived);
        }
    };

    /**
     * An application message, sent or received.
     * <p>
     * All attributes may be null, which implies the default values.
     *
     * @name Paho.MQTT.Message
     * @constructor
     * @param {String|ArrayBuffer} payload The message data to be sent.
     * <p>
     * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
     * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
     * <p>
     * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
     *                    (for messages about to be sent) or the name of the destination from which the message has been received.
     *                    (for messages received by the onMessage function).
     * <p>
     * @property {number} qos The Quality of Service used to deliver the message.
     * <dl>
     *     <dt>0 Best effort (default).
     *     <dt>1 At least once.
     *     <dt>2 Exactly once.
     * </dl>
     * <p>
     * @property {Boolean} retained If true, the message is to be retained by the server and delivered
     *                     to both current and future subscriptions.
     *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
     *                     A received message has the retained boolean set to true if the message was published
     *                     with the retained boolean set to true
     *                     and the subscrption was made after the message has been published.
     * <p>
     * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
     *                     This is only set on messages received from the server.
     *
     */
    var Message = function (newPayload) {
        var payload;
        if (typeof newPayload === "string"
            || newPayload instanceof ArrayBuffer
            || newPayload instanceof Int8Array
            || newPayload instanceof Uint8Array
            || newPayload instanceof Int16Array
            || newPayload instanceof Uint16Array
            || newPayload instanceof Int32Array
            || newPayload instanceof Uint32Array
            || newPayload instanceof Float32Array
            || newPayload instanceof Float64Array
            ) {
            payload = newPayload;
        } else {
            throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
        }

        this._getPayloadString = function () {
            if (typeof payload === "string")
                return payload;
            else
                return parseUTF8(payload, 0, payload.length);
        };

        this._getPayloadBytes = function () {
            if (typeof payload === "string") {
                var buffer = new ArrayBuffer(UTF8Length(payload));
                var byteStream = new Uint8Array(buffer);
                stringToUTF8(payload, byteStream, 0);

                return byteStream;
            } else {
                return payload;
            }
            ;
        };

        var destinationName = undefined;
        this._getDestinationName = function () {
            return destinationName;
        };
        this._setDestinationName = function (newDestinationName) {
            if (typeof newDestinationName === "string")
                destinationName = newDestinationName;
            else
                throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
        };

        var qos = 0;
        this._getQos = function () {
            return qos;
        };
        this._setQos = function (newQos) {
            if (newQos === 0 || newQos === 1 || newQos === 2)
                qos = newQos;
            else
                throw new Error("Invalid argument:" + newQos);
        };

        var retained = false;
        this._getRetained = function () {
            return retained;
        };
        this._setRetained = function (newRetained) {
            if (typeof newRetained === "boolean")
                retained = newRetained;
            else
                throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
        };

        var duplicate = false;
        this._getDuplicate = function () {
            return duplicate;
        };
        this._setDuplicate = function (newDuplicate) {
            duplicate = newDuplicate;
        };
    };

    Message.prototype = {
        get payloadString() {
            return this._getPayloadString();
        },
        get payloadBytes() {
            return this._getPayloadBytes();
        },

        get destinationName() {
            return this._getDestinationName();
        },
        set destinationName(newDestinationName) {
            this._setDestinationName(newDestinationName);
        },

        get qos() {
            return this._getQos();
        },
        set qos(newQos) {
            this._setQos(newQos);
        },

        get retained() {
            return this._getRetained();
        },
        set retained(newRetained) {
            this._setRetained(newRetained);
        },

        get duplicate() {
            return this._getDuplicate();
        },
        set duplicate(newDuplicate) {
            this._setDuplicate(newDuplicate);
        }
    };

    // Module contents.
    return {
        Client: Client,
        Message: Message
    };
})(window);
;
(function () {
    function t(t, e) {
        return function (o) {
            o.keyCode === e && (t.toggle(), o.preventDefault())
        }
    }

    function e(t) {
        var e = 0;
        return function (o) {
            switch (o.keyCode) {
                case 13:
                    var n = o.target.value;
                    t.history[0] = n, o.target.value = "", n && t.log("command", n), t.history.unshift(""), t.history.length > t.cfg.historySize && (t.history = t.history.splice(0, t.cfg.historySize)), t.dispatch(n);
                    break;
                case 38:
                    void 0 !== t.history[e + 1] && (o.target.value = t.history[++e]), e >= t.history.length && (e = t.history.length - 1), o.preventDefault();
                    break;
                case 40:
                    "" !== t.history[e] && (o.target.value = t.history[--e]), 0 > e && (e = 0);
                    break;
                default:
                    e = 0, t.history[0] = o.target.value
            }
        }
    }

    function o(t) {
        t && (document.head.appendChild(a.toElement("<style>" + t + "</style>")), s = !1)
    }

    var n = this, i = {hotkey: 192, welcome: "", onShow: null, onHide: null, defaultHandler: null, caseSensitive: !1, historySize: 256}, s = ".console-panel{z-index:99999;display:block;visibility:hidden;height:50%;position:fixed;top:0;left:0;width:100%;background-color:rgba(0,0,0,.8);margin-top:-50%;transition:margin-top 100ms ease-out 1ms}.console-panel.shown{visibility:visible;margin-top:0}.console-history,.console-input{margin:0;padding:2px 5px;box-sizing:border-box;position:absolute;width:100%;font:14px/20px Menlo,monospace;color:#DDD;letter-spacing:.05em}.console-history{bottom:18px}.console-history dd,.console-history dt{white-space:pre;margin:0}.console-history dt{color:#7E0}.console-input{outline:0;background-color:transparent;border:0;bottom:0;line-height:16px;padding:4px 5px}", l = '<label class="console-panel"><dl class="console-history"></dl><input class="console-input"/></label>', r = null;
    n.Console = function (n, r) {
        var h = a.defaults(r || {}, i);
        h.historySize++, this.history = [], this.cfg = h, this.commands = {};
        for (var c in n)n.hasOwnProperty(c) && this.register(c, n[c]);
        this.panelEl = a.toElement(l), this.logEl = this.panelEl.firstChild, this.inputEl = this.logEl.nextSibling, h.hotkey && (this.hotkeyListener = t(this, h.hotkey), window.addEventListener("keydown", this.hotkeyListener)), this.inputEl.addEventListener("keydown", e(this)), h.welcome && this.log("message", h.welcome), document.body.appendChild(this.panelEl), o(s)
    }, Console.prototype.log = function (t) {
        var e, o = Array.prototype.slice.call(arguments, 1);
        switch (t) {
            case"command":
                e = a.toElement("<dt></dt>"), e.appendChild(document.createTextNode(o[0]));
                break;
            case"message":
                e = a.toElement("<dd>" + o.join(" ") + "</dd>");
                break;
            default:
                o.unshift(t), e = a.toElement("<dd>" + o.join(" ") + "</dd>")
        }
        this.logEl.appendChild(e)
    }, Console.prototype.dispatch = function (t) {
        var e, o = t.split(" "), n = this.cfg.caseSensitive === !1 ? o[0].toLowerCase() : o[0], i = this.commands[n];
        if (i) {
            for (; a.isString(i.__fn);)if (i = this.commands[i.__fn], i === n)throw new Error("Alias loop.");
            e = i && i.__fn.apply(i, o.splice(1))
        } else a.isFunction(this.cfg.defaultHandler) && (e = this.cfg.defaultHandler.apply(this, o));
        e && this.log("message", e)
    }, Console.prototype.toggle = function (t) {
        "off" === t || this.isShown ? (r = !1, a.removeClass(this.panelEl, "shown"), this.inputEl.blur(), this.isShown = !1, a.isFunction(this.cfg.onHide) && this.cfg.onHide(this)) : "on" !== t && this.isShown || (r && r.toggle("off"), r = this, a.addClass(this.panelEl, "shown"), this.inputEl.focus(), this.isShown = !0, a.isFunction(this.cfg.onShow) && this.cfg.onShow(this))
    }, Console.prototype.register = function (t, e, o) {
        return this.cfg.caseSensitive === !1 && (t = t.toLowerCase()), this.commands[t] = a.defaults({__fn: e}, o), this
    }, Console.prototype.destroy = function () {
        this.hotkeyListener && window.removeEventListener("keydown", this.hotkeyListener), document.body.removeChild(this.panelEl)
    };
    var a = {defaults: function (t) {
        return Array.prototype.slice.call(arguments, 1).forEach(function (e) {
            for (var o in e)void 0 === t[o] && (t[o] = e[o])
        }), t
    }, toElement: function (t) {
        var e = document.createElement("div");
        return e.innerHTML = t, e.firstChild
    }, preventDefault: function (t) {
        t.preventDefault()
    }, hasClass: function (t, e) {
        new RegExp("\\b" + e + "\\b").test(t.className)
    }, removeClass: function (t, e) {
        t.className = t.className.replace(new RegExp("\\b ?" + e + "\\b", "g"), "")
    }, addClass: function (t, e) {
        t.className = t.className.replace(new RegExp("\\b" + e + "\\b|$"), " " + e)
    }, isFunction: function (t) {
        return"function" == typeof t
    }, isNumber: function (t) {
        return"[object Number]" === toString.call(t)
    }, isString: function (t) {
        return"[object String]" === toString.call(t)
    }};
    "function" == typeof define && define.amd && define([], function () {
        return Console
    })
}).call(this);
;
/**
 * Created by gsachan on 29/12/14.
 */

var instamsg = instamsg || {};

instamsg.InstaMsg = function (clientId, authKey, connectHandler, disConnectHandler, oneToOneMessageHandler, options) {

    options = options || {};
//    var self = this;
    if (clientId === null || clientId === undefined) {
        console.log('You must pass your client id when you instantiate InstaMsg.');
        throw new Error("You must pass your client id when you instantiate InstaMsg.");
        return false;
    }

    if (authKey === null || authKey === undefined) {
        console.log('You must pass your auth key when you instantiate InstaMsg.');
        throw new Error("You must pass your auth key when you instantiate InstaMsg.");
        return false;
    }
    options.clientId = clientId.substring(0, 23);
    options.userName = clientId.substring(24, 36);
    options.password = authKey;
    instamsg.version = 'beta';
    instamsg.handlersMap = {}
    instamsg.replyHandlerMap = {}
    var filesTopic = "instamsg/clients/" + clientId + "/files";
    var sendMsgReplyTopic = clientId;

    instamsg.fileHandlers = [];
    instamsg.sendMsgHandlers = [];
    instamsg.resultHandler = [];
    var onMessageArrived = function (msg) {
        var topic = msg._getDestinationName()
        if (topic === null || topic === undefined) {
            throw new Error("Invalid topic");
        }
        console.log("message Arrived : "+msg.payloadString);
        console.log(topic)
        switch (topic) {
            case filesTopic:
                try {
                    var json = JSON.parse(msg.payloadString);
                    if (instamsg.fileHandlers[topic]) {
                        var message = new instamsg.Message(json.body, {id: json.message_id, topic: topic, replyTopic: json.reply_to})
                        instamsg.fileHandlers[topic](message)
                    } else {
                        throw new Error("No Handler is register for " + topic);
                    }
                }
                catch (e) {
                }
                break;
            case sendMsgReplyTopic:
                try {
                    var json = JSON.parse(msg.payloadString);
                    var responseId = json.response_id;
                    if (responseId) {
                        if (instamsg.replyHandlerMap[responseId]) {
                            var message = new instamsg.Message(json.body, {id: json.message_id, topic: topic, replyTopic: json.reply_to})
                            instamsg.replyHandlerMap[responseId](message)
                        }
                    } else {
                        if (oneToOneMessageHandler) {
                            var message = new instamsg.Message(json.body, {id: json.message_id, topic: topic, replyTopic: json.reply_to})
                            oneToOneMessageHandler(message)
                        }
                    }
                }
                catch (e) {
                    if (instamsg.handlersMap[topic]) {
                        instamsg.handlersMap[topic](new instamsg.Message(msg.payloadString))
                    }
                }

                break;
            default:
                try {
                    if (instamsg.handlersMap[topic]) {
                        instamsg.handlersMap[topic](new instamsg.Message(msg.payloadString))
                    } else {
                        throw new Error("No Handler is register for " + topic);
                    }
                }
                catch (e) {
                }
                break;
        }
    };

    var connection = instamsg.ConnectionFactory(connectHandler, onMessageArrived, disConnectHandler, options);

    instamsg.close = function () {
        connection.close();
    };

    var onPublish = function (msg) {
        if (instamsg.resultHandler[msg.id]) {
            instamsg.resultHandler[msg.id](instamsg.Result.init(msg, true))
        }
    }

    instamsg.publish = function (topic, message, qos, dup, resultHandler, timeout) {
        var id = UUIDjs.create(4).toString()
        instamsg.resultHandler[id] = resultHandler;
        connection.publish(id, topic, message, qos, dup, onPublish, timeout);
    };

    instamsg.subscribe = function (topic, qos, msgHandler, resultHandler, timeout) {
        if (topic.length < 1) {
            console.log("Topic cannot be empty");
            throw new Error("Topic cannot be empty ");
        }
        if (instamsg.handlersMap[topic] !== undefined) {
            console.log('You are already subscribed to ' + topic);
            throw new Error('You are already subscribed to ' + topic);
        }
        var subscriptionobj = {};
        subscriptionobj.topic = topic;
        subscriptionobj.msgHandler = msgHandler;
        subscriptionobj.resultHandler = resultHandler;
        connection.subscribe(topic, subscriptionobj, qos, onSubscribeSuccess, onSubscribeFailure);
    };

    var onSubscribeSuccess = function (subscriptionobj) {
        instamsg.handlersMap[subscriptionobj.invocationContext.topic] = subscriptionobj.invocationContext.msgHandler;
        console.log(instamsg.handlersMap)
        var result = "Client Subscribe to " + subscriptionobj.invocationContext.topic
        subscriptionobj.invocationContext.resultHandler(instamsg.Result.init(result, true))
    }

    var onSubscribeFailure = function (subscriptionobj) {
        console.log("unable to suscribe to " + subscriptionobj.invocationContext.topic)
        var result = "Client unable to Subscribe to " + subscriptionobj.invocationContext.topic
        subscriptionobj.invocationContext.resultHandler(instamsg.Result.init(subscriptionobj, false))
    }

    instamsg.unsubscribe = function (topic, msgHandler) {
        if (instamsg.handlersMap[topic] === undefined) {
            console.log('You are not subscribed to this topic');
            throw new Error('You are not subscribed to this topic');
        }
        connection.unsubscribe(topic, {topic: topic, resultHandler: msgHandler}, onUnsubscribeSuccess, onUnsubscribeFailure)
    };

    var onUnsubscribeSuccess = function (object) {
        console.log("unsubscribed to " + object.invocationContext.topic)
        delete instamsg.handlersMap[object.invocationContext.topic];
        var result = "Client unsubscribe from " + object.invocationContext.topic
        object.invocationContext.resultHandler(instamsg.Result.init(result, true))
    }

    var onUnsubscribeFailure = function (object) {
        console.log("Not able to unsubscribe to " + object.invocationContext.topic)
        object.invocationContext.resultHandler(instamsg.Result.init(object, false))
    }

    instamsg.send = function (clientId, msg, qos, replyHandler, timeout) {
        var messageId = UUIDjs.create(4).toString()
        instamsg.replyHandlerMap[messageId] = replyHandler;
        var message = {
            message_id: messageId,
            topic: clientId,
            reply_to: sendMsgReplyTopic,
            body: msg,
            status: 1
        }
        connection.send(clientId, message, qos, timeout);
    };

    instamsg.setFileReceiveHander = function (resultHandler, timeout) {

    };

    instamsg.deleteFile = function (clientId, fileName, resultHandler, timeout) {
        var messageId = UUIDjs.create(4).toString()
        instamsg.fileHandlers[messageId] = resultHandler;
        var message = {
            messageId: messageId,
            replyTo: filesTopic,
            method: "DELETE",
            filename: fileName
        }
        connection.send("instamsg/clients/" + clientId + "/files", message, 1, timeout);

    };

    instamsg.reply = function (content, msg,qos, replyHandler, resulthandler,timeout) {
        if (!instamsg.replyHandlerMap[msg.id()]) {
            instamsg.replyHandlerMap[msg.id()] = replyHandler;
        }
        var message = {
            message_id: msg.id(),
            response_id: msg.id(),
            topic: msg.replyTopic(),
            reply_to: msg.topic(),
            body: content,
            status: 1
        }
        connection.send(msg.replyTopic(), message, qos, resulthandler, timeout);
    };
    return instamsg;
}


;
/**
 * Created by gsachan on 29/12/14.
 */

var instamsg = instamsg || {};

instamsg.Message = function (content, options) {

    var self = this;
    var retained = options.retain || false;
    var Qos = options.qos;
    var body = content || "";
    var isDup = options.dup || false;
    var Topic = options.topic;
    var replyTopic = options.replyTopic;
    var id = options.id;


    self.qos = function () {
        return Qos;
    };

    self.retained = function () {
        return retained;
    };

    self.id = function () {
        return id;
    };

    self.topic = function () {
        return Topic;
    };

    self.replyTopic = function () {
        return replyTopic;
    };

    self.isDublicate = function () {

        return isDup;
    };

    self.body = function () {
        return body;

    };

    self.reply = function (msg, dup, replyHandler, timeout) {

        instamsg.reply(msg, self, replyHandler, timeout)
    };

    self.error = function (errorCode, errorMsg) {

    };

    self.toString = function () {
        return '{ id=' + id + ', topic=' + Topic + ', body=' + body + ', qos=' + Qos + ', dup=' + isDup + ', replyTopic=' + replyTopic + '}';

    }

}


;
/**
 * Created by gsachan on 29/12/14.
 */
function Handler() {

}

Handler.prototype.Handler = function (result) {

};

;
/**
 * Created by gsachan on 30/12/14.
 */


var instamsg = instamsg || {};

instamsg.ConnectionFactory = function (onOpenHandler, onMessageArrived, onCloseHandler, options) {

    if (options === null || options === undefined || options.sockjs === undefined || options.sockjsEnabled !== true) {
        return instamsg.SocketConnection.connection(onOpenHandler, onMessageArrived, onCloseHandler, options)

    } else {
        return instamsg.SockjsConnection(onOpenHandler, onMessageArrived, onCloseHandler, options)
    }
}
;
/**
 * Created by gsachan on 30/12/14.
 */

var instamsg = instamsg || {};
instamsg.SocketConnection = instamsg.SocketConnection || {}
instamsg.SocketConnection.connection = function (onOpenHandler, onMsgHandler, onCloseHandler, options) {

    options = options || {};
    var self = this;

    instamsg.SocketConnection.host = 'device.instamsg.io';
    instamsg.SocketConnection.httpPort = 11883;
    instamsg.SocketConnection.httpsPort = 18883;
    instamsg.SocketConnection.port = options.enableSsl ? self.httpsPort : self.httpPort;
    instamsg.SocketConnection.client = new Paho.MQTT.Client(instamsg.SocketConnection.host, Number(instamsg.SocketConnection.port), options.clientId);

    instamsg.SocketConnection.client.onMessageArrived = onMsgHandler;

    instamsg.SocketConnection.client.onConnectionLost = onCloseHandler;

    instamsg.SocketConnection.client.onMessageDelivered;

    instamsg.SocketConnection.publish = function (id, topic, msg, qos, dup, resultHandler, timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log('InstaMsg socket is not connected.');
            return false;
        }
        var message = new Paho.MQTT.Message(msg)
        message.id = id
        message.qos = qos;
        message.dup = dup;
        message.retained = false;
        message.destinationName = topic;
        instamsg.SocketConnection.client.onMessageDelivered = resultHandler;
        instamsg.SocketConnection.client.send(message);
    }

    instamsg.SocketConnection.send = function (clientId, msg, qos, resultHandler,timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log('InstaMsg socket is not connected.');
            return false;
        }
        var payload = JSON.stringify(msg)
        var message = new Paho.MQTT.Message(payload)
        message.qos = qos;
        message.retained = true;
        message.destinationName = clientId;
        console.log("sending " + payload)
        instamsg.SocketConnection.client.onMessageDelivered = resultHandler;
        instamsg.SocketConnection.client.send(message);
    }

    instamsg.SocketConnection.close = function () {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log("InstaMsg socket is already disconnected.");
            throw new Error("InstaMsg socket is already disconnected.");
            return false;
        }
        instamsg.SocketConnection.client.disconnect();
    }

    instamsg.SocketConnection.onFail = function (message) {
        console.log("error: " + message.errorMessage);
    }

    var onConnect = function (result) {
        onOpenHandler(instamsg.Result.init("Connect to InstaMsg socket.", true))
    }
    var onFailure = function (result) {
        onOpenHandler(instamsg.Result.init(result.errorMessage, false))
    }


    instamsg.SocketConnection.subscribe = function (topic, invocationContext, qos, onSubscribeSuccess, onSubscribeFailure, timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log("InstaMsg socket is not connected.");
            throw new Error("InstaMsg socket is not connected.");
            return false;
        }
        if (topic.length < 1) {
            console.log("Topic cannot be empty.");
            throw new Error("Topic cannot be empty.");
            return false;
        }
        instamsg.SocketConnection.client.subscribe(topic, {invocationContext: invocationContext,
            qos: qos,
            onSuccess: onSubscribeSuccess,
            onFailure: onSubscribeFailure,
            timeout: timeout ? timeout : 100
        });
    };

    instamsg.SocketConnection.unsubscribe = function (topic, invocationContext, onUnsubscribeSuccess, onUnsubscribeFailure, timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log("InstaMsg socket is not connected.");
            throw new Error("InstaMsg socket is not connected.");
            return false;
        }
        instamsg.SocketConnection.client.unsubscribe(topic, {invocationContext: invocationContext,
            onSuccess: onUnsubscribeSuccess,
            onFailure: onUnsubscribeFailure,
            timeout: timeout ? timeout : 100
        })
    };

    var Options = {
        timeout: 100,
        userName: options.userName,
        password: options.password,
        keepAliveInterval: options.keepAliveTimer || 100,
        cleanSession: true,
        useSSL: options.enableSsl ? true : false,
        invocationContext: instamsg,
        onSuccess: onConnect,
        onFailure: onFailure,
        mqttVersion: 3
    }
    instamsg.SocketConnection.client.connect(Options);
    return instamsg.SocketConnection;
}

;
/**
 * Created by gsachan on 30/12/14.
 */

var instamsg = instamsg || {};

instamsg.SockjsConnection = instamsg.SockjsConnection || {}
instamsg.SockjsConnection.connection = function (onOpenHandler, onMsgHandler, onCloseHandler, options) {

    var self = this;
    var options = options || {};
    instamsg.SockjsConnection.host = 'sockjs.instamsg.com';
    instamsg.SockjsConnection.httpPort = 80;
    instamsg.SockjsConnection.httpsPort = 443;
    instamsg.SockjsConnection.path = "/instamsg";
    instamsg.SockjsConnection.port = options.enabledSsl ? self.httpsPort : self.httpPort;
    var sock = new SockJS(self.host + ":" + self.port + "/" + self.path);

    instamsg.SockjsConnection.onopen = onOpenHandler;
    instamsg.SockjsConnection.onmessage = onMsgHandler;
    instamsg.SockjsConnection.onclose = onCloseHandler;

    instamsg.SockjsConnection.publish = function (topic, msg, qos) {
        if (state != vertx.EventBus.OPEN) {
            throw new Error('INVALID_STATE_ERR');
        }
        var message = new Paho.MQTT.Message(msg);
        message.qos = qos;
        message.retained = true;
        message.destinationName = topic;
        sock.send(message);
    }

    instamsg.SockjsConnection.send = function (clientId, msg, qos, replyHandler, timeout) {
        if (state != vertx.EventBus.OPEN) {
            throw new Error('INVALID_STATE_ERR');
        }
        var payload = JSON.stringify(msg)
        var message = new Paho.MQTT.Message(payload);
        message.qos = qos;
        message.retained = true;
        message.destinationName = topic;
        sock.send(message);
    }

    instamsg.SockjsConnection.close = function () {
        sock.close();
        onCloseHandler()
    }

}
;
/**
 * Created by gsachan on 29/12/14.
 */

var instamsg = instamsg || {};
instamsg.Result = instamsg.Result || {}
instamsg.Result.init = function (result, succeeded) {

    var self = this;
    var Result = result;
    var Succeeded = succeeded;

    instamsg.Result.cause = function () {
        return !succeeded ? result : null;
    };

    instamsg.Result.failed = function () {
        return !succeeded ? true : false;
    };

    instamsg.Result.succeeded = function () {
        return succeeded ? true : false;
    };

    instamsg.Result.result = function () {
        return succeeded ? result : null;
    };
    return instamsg.Result;
}