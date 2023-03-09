import { c as dt, i as At } from "./b1893f4d.js";
import kt from "react";
import wt from "react-dom";
function Nt(ot, X) {
  for (var L = 0; L < X.length; L++) {
    const h = X[L];
    if (typeof h != "string" && !Array.isArray(h)) {
      for (const d in h)
        if (d !== "default" && !(d in ot)) {
          const T = Object.getOwnPropertyDescriptor(h, d);
          T && Object.defineProperty(ot, d, T.get ? T : {
            enumerable: !0,
            get: () => h[d]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(ot, Symbol.toStringTag, { value: "Module" }));
}
var Ot = { exports: {} };
/*!
 * Quill Editor v1.3.7
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function(ot, X) {
  (function(h, d) {
    ot.exports = d();
  })(typeof self < "u" ? self : dt, function() {
    return function(L) {
      var h = {};
      function d(T) {
        if (h[T])
          return h[T].exports;
        var w = h[T] = {
          i: T,
          l: !1,
          exports: {}
        };
        return L[T].call(w.exports, w, w.exports, d), w.l = !0, w.exports;
      }
      return d.m = L, d.c = h, d.d = function(T, w, O) {
        d.o(T, w) || Object.defineProperty(T, w, {
          configurable: !1,
          enumerable: !0,
          get: O
        });
      }, d.n = function(T) {
        var w = T && T.__esModule ? function() {
          return T.default;
        } : function() {
          return T;
        };
        return d.d(w, "a", w), w;
      }, d.o = function(T, w) {
        return Object.prototype.hasOwnProperty.call(T, w);
      }, d.p = "", d(d.s = 109);
    }([
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", { value: !0 });
        var T = d(17), w = d(18), O = d(19), p = d(45), y = d(46), c = d(47), o = d(48), t = d(49), e = d(12), u = d(32), l = d(33), a = d(31), r = d(1), i = {
          Scope: r.Scope,
          create: r.create,
          find: r.find,
          query: r.query,
          register: r.register,
          Container: T.default,
          Format: w.default,
          Leaf: O.default,
          Embed: o.default,
          Scroll: p.default,
          Block: c.default,
          Inline: y.default,
          Text: t.default,
          Attributor: {
            Attribute: e.default,
            Class: u.default,
            Style: l.default,
            Store: a.default
          }
        };
        h.default = i;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
            r.__proto__ = i;
          } || function(r, i) {
            for (var f in i)
              i.hasOwnProperty(f) && (r[f] = i[f]);
          };
          return function(r, i) {
            a(r, i);
            function f() {
              this.constructor = r;
            }
            r.prototype = i === null ? Object.create(i) : (f.prototype = i.prototype, new f());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = function(a) {
          T(r, a);
          function r(i) {
            var f = this;
            return i = "[Parchment] " + i, f = a.call(this, i) || this, f.message = i, f.name = f.constructor.name, f;
          }
          return r;
        }(Error);
        h.ParchmentError = w;
        var O = {}, p = {}, y = {}, c = {};
        h.DATA_KEY = "__blot";
        var o;
        (function(a) {
          a[a.TYPE = 3] = "TYPE", a[a.LEVEL = 12] = "LEVEL", a[a.ATTRIBUTE = 13] = "ATTRIBUTE", a[a.BLOT = 14] = "BLOT", a[a.INLINE = 7] = "INLINE", a[a.BLOCK = 11] = "BLOCK", a[a.BLOCK_BLOT = 10] = "BLOCK_BLOT", a[a.INLINE_BLOT = 6] = "INLINE_BLOT", a[a.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", a[a.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", a[a.ANY = 15] = "ANY";
        })(o = h.Scope || (h.Scope = {}));
        function t(a, r) {
          var i = u(a);
          if (i == null)
            throw new w("Unable to create " + a + " blot");
          var f = i, n = a instanceof Node || a.nodeType === Node.TEXT_NODE ? a : f.create(r);
          return new f(n, r);
        }
        h.create = t;
        function e(a, r) {
          return r === void 0 && (r = !1), a == null ? null : a[h.DATA_KEY] != null ? a[h.DATA_KEY].blot : r ? e(a.parentNode, r) : null;
        }
        h.find = e;
        function u(a, r) {
          r === void 0 && (r = o.ANY);
          var i;
          if (typeof a == "string")
            i = c[a] || O[a];
          else if (a instanceof Text || a.nodeType === Node.TEXT_NODE)
            i = c.text;
          else if (typeof a == "number")
            a & o.LEVEL & o.BLOCK ? i = c.block : a & o.LEVEL & o.INLINE && (i = c.inline);
          else if (a instanceof HTMLElement) {
            var f = (a.getAttribute("class") || "").split(/\s+/);
            for (var n in f)
              if (i = p[f[n]], i)
                break;
            i = i || y[a.tagName];
          }
          return i == null ? null : r & o.LEVEL & i.scope && r & o.TYPE & i.scope ? i : null;
        }
        h.query = u;
        function l() {
          for (var a = [], r = 0; r < arguments.length; r++)
            a[r] = arguments[r];
          if (a.length > 1)
            return a.map(function(n) {
              return l(n);
            });
          var i = a[0];
          if (typeof i.blotName != "string" && typeof i.attrName != "string")
            throw new w("Invalid definition");
          if (i.blotName === "abstract")
            throw new w("Cannot register abstract class");
          if (c[i.blotName || i.attrName] = i, typeof i.keyName == "string")
            O[i.keyName] = i;
          else if (i.className != null && (p[i.className] = i), i.tagName != null) {
            Array.isArray(i.tagName) ? i.tagName = i.tagName.map(function(n) {
              return n.toUpperCase();
            }) : i.tagName = i.tagName.toUpperCase();
            var f = Array.isArray(i.tagName) ? i.tagName : [i.tagName];
            f.forEach(function(n) {
              (y[n] == null || i.className == null) && (y[n] = i);
            });
          }
          return i;
        }
        h.register = l;
      },
      function(L, h, d) {
        var T = d(51), w = d(11), O = d(3), p = d(20), y = String.fromCharCode(0), c = function(o) {
          Array.isArray(o) ? this.ops = o : o != null && Array.isArray(o.ops) ? this.ops = o.ops : this.ops = [];
        };
        c.prototype.insert = function(o, t) {
          var e = {};
          return o.length === 0 ? this : (e.insert = o, t != null && typeof t == "object" && Object.keys(t).length > 0 && (e.attributes = t), this.push(e));
        }, c.prototype.delete = function(o) {
          return o <= 0 ? this : this.push({ delete: o });
        }, c.prototype.retain = function(o, t) {
          if (o <= 0)
            return this;
          var e = { retain: o };
          return t != null && typeof t == "object" && Object.keys(t).length > 0 && (e.attributes = t), this.push(e);
        }, c.prototype.push = function(o) {
          var t = this.ops.length, e = this.ops[t - 1];
          if (o = O(!0, {}, o), typeof e == "object") {
            if (typeof o.delete == "number" && typeof e.delete == "number")
              return this.ops[t - 1] = { delete: e.delete + o.delete }, this;
            if (typeof e.delete == "number" && o.insert != null && (t -= 1, e = this.ops[t - 1], typeof e != "object"))
              return this.ops.unshift(o), this;
            if (w(o.attributes, e.attributes)) {
              if (typeof o.insert == "string" && typeof e.insert == "string")
                return this.ops[t - 1] = { insert: e.insert + o.insert }, typeof o.attributes == "object" && (this.ops[t - 1].attributes = o.attributes), this;
              if (typeof o.retain == "number" && typeof e.retain == "number")
                return this.ops[t - 1] = { retain: e.retain + o.retain }, typeof o.attributes == "object" && (this.ops[t - 1].attributes = o.attributes), this;
            }
          }
          return t === this.ops.length ? this.ops.push(o) : this.ops.splice(t, 0, o), this;
        }, c.prototype.chop = function() {
          var o = this.ops[this.ops.length - 1];
          return o && o.retain && !o.attributes && this.ops.pop(), this;
        }, c.prototype.filter = function(o) {
          return this.ops.filter(o);
        }, c.prototype.forEach = function(o) {
          this.ops.forEach(o);
        }, c.prototype.map = function(o) {
          return this.ops.map(o);
        }, c.prototype.partition = function(o) {
          var t = [], e = [];
          return this.forEach(function(u) {
            var l = o(u) ? t : e;
            l.push(u);
          }), [t, e];
        }, c.prototype.reduce = function(o, t) {
          return this.ops.reduce(o, t);
        }, c.prototype.changeLength = function() {
          return this.reduce(function(o, t) {
            return t.insert ? o + p.length(t) : t.delete ? o - t.delete : o;
          }, 0);
        }, c.prototype.length = function() {
          return this.reduce(function(o, t) {
            return o + p.length(t);
          }, 0);
        }, c.prototype.slice = function(o, t) {
          o = o || 0, typeof t != "number" && (t = 1 / 0);
          for (var e = [], u = p.iterator(this.ops), l = 0; l < t && u.hasNext(); ) {
            var a;
            l < o ? a = u.next(o - l) : (a = u.next(t - l), e.push(a)), l += p.length(a);
          }
          return new c(e);
        }, c.prototype.compose = function(o) {
          var t = p.iterator(this.ops), e = p.iterator(o.ops), u = [], l = e.peek();
          if (l != null && typeof l.retain == "number" && l.attributes == null) {
            for (var a = l.retain; t.peekType() === "insert" && t.peekLength() <= a; )
              a -= t.peekLength(), u.push(t.next());
            l.retain - a > 0 && e.next(l.retain - a);
          }
          for (var r = new c(u); t.hasNext() || e.hasNext(); )
            if (e.peekType() === "insert")
              r.push(e.next());
            else if (t.peekType() === "delete")
              r.push(t.next());
            else {
              var i = Math.min(t.peekLength(), e.peekLength()), f = t.next(i), n = e.next(i);
              if (typeof n.retain == "number") {
                var s = {};
                typeof f.retain == "number" ? s.retain = i : s.insert = f.insert;
                var k = p.attributes.compose(f.attributes, n.attributes, typeof f.retain == "number");
                if (k && (s.attributes = k), r.push(s), !e.hasNext() && w(r.ops[r.ops.length - 1], s)) {
                  var b = new c(t.rest());
                  return r.concat(b).chop();
                }
              } else
                typeof n.delete == "number" && typeof f.retain == "number" && r.push(n);
            }
          return r.chop();
        }, c.prototype.concat = function(o) {
          var t = new c(this.ops.slice());
          return o.ops.length > 0 && (t.push(o.ops[0]), t.ops = t.ops.concat(o.ops.slice(1))), t;
        }, c.prototype.diff = function(o, t) {
          if (this.ops === o.ops)
            return new c();
          var e = [this, o].map(function(i) {
            return i.map(function(f) {
              if (f.insert != null)
                return typeof f.insert == "string" ? f.insert : y;
              var n = i === o ? "on" : "with";
              throw new Error("diff() called " + n + " non-document");
            }).join("");
          }), u = new c(), l = T(e[0], e[1], t), a = p.iterator(this.ops), r = p.iterator(o.ops);
          return l.forEach(function(i) {
            for (var f = i[1].length; f > 0; ) {
              var n = 0;
              switch (i[0]) {
                case T.INSERT:
                  n = Math.min(r.peekLength(), f), u.push(r.next(n));
                  break;
                case T.DELETE:
                  n = Math.min(f, a.peekLength()), a.next(n), u.delete(n);
                  break;
                case T.EQUAL:
                  n = Math.min(a.peekLength(), r.peekLength(), f);
                  var s = a.next(n), k = r.next(n);
                  w(s.insert, k.insert) ? u.retain(n, p.attributes.diff(s.attributes, k.attributes)) : u.push(k).delete(n);
                  break;
              }
              f -= n;
            }
          }), u.chop();
        }, c.prototype.eachLine = function(o, t) {
          t = t || `
`;
          for (var e = p.iterator(this.ops), u = new c(), l = 0; e.hasNext(); ) {
            if (e.peekType() !== "insert")
              return;
            var a = e.peek(), r = p.length(a) - e.peekLength(), i = typeof a.insert == "string" ? a.insert.indexOf(t, r) - r : -1;
            if (i < 0)
              u.push(e.next());
            else if (i > 0)
              u.push(e.next(i));
            else {
              if (o(u, e.next(1).attributes || {}, l) === !1)
                return;
              l += 1, u = new c();
            }
          }
          u.length() > 0 && o(u, {}, l);
        }, c.prototype.transform = function(o, t) {
          if (t = !!t, typeof o == "number")
            return this.transformPosition(o, t);
          for (var e = p.iterator(this.ops), u = p.iterator(o.ops), l = new c(); e.hasNext() || u.hasNext(); )
            if (e.peekType() === "insert" && (t || u.peekType() !== "insert"))
              l.retain(p.length(e.next()));
            else if (u.peekType() === "insert")
              l.push(u.next());
            else {
              var a = Math.min(e.peekLength(), u.peekLength()), r = e.next(a), i = u.next(a);
              if (r.delete)
                continue;
              i.delete ? l.push(i) : l.retain(a, p.attributes.transform(r.attributes, i.attributes, t));
            }
          return l.chop();
        }, c.prototype.transformPosition = function(o, t) {
          t = !!t;
          for (var e = p.iterator(this.ops), u = 0; e.hasNext() && u <= o; ) {
            var l = e.peekLength(), a = e.peekType();
            if (e.next(), a === "delete") {
              o -= Math.min(l, o - u);
              continue;
            } else
              a === "insert" && (u < o || !t) && (o += l);
            u += l;
          }
          return o;
        }, L.exports = c;
      },
      function(L, h) {
        var d = Object.prototype.hasOwnProperty, T = Object.prototype.toString, w = Object.defineProperty, O = Object.getOwnPropertyDescriptor, p = function(e) {
          return typeof Array.isArray == "function" ? Array.isArray(e) : T.call(e) === "[object Array]";
        }, y = function(e) {
          if (!e || T.call(e) !== "[object Object]")
            return !1;
          var u = d.call(e, "constructor"), l = e.constructor && e.constructor.prototype && d.call(e.constructor.prototype, "isPrototypeOf");
          if (e.constructor && !u && !l)
            return !1;
          var a;
          for (a in e)
            ;
          return typeof a > "u" || d.call(e, a);
        }, c = function(e, u) {
          w && u.name === "__proto__" ? w(e, u.name, {
            enumerable: !0,
            configurable: !0,
            value: u.newValue,
            writable: !0
          }) : e[u.name] = u.newValue;
        }, o = function(e, u) {
          if (u === "__proto__")
            if (d.call(e, u)) {
              if (O)
                return O(e, u).value;
            } else
              return;
          return e[u];
        };
        L.exports = function t() {
          var e, u, l, a, r, i, f = arguments[0], n = 1, s = arguments.length, k = !1;
          for (typeof f == "boolean" && (k = f, f = arguments[1] || {}, n = 2), (f == null || typeof f != "object" && typeof f != "function") && (f = {}); n < s; ++n)
            if (e = arguments[n], e != null)
              for (u in e)
                l = o(f, u), a = o(e, u), f !== a && (k && a && (y(a) || (r = p(a))) ? (r ? (r = !1, i = l && p(l) ? l : []) : i = l && y(l) ? l : {}, c(f, { name: u, newValue: t(k, i, a) })) : typeof a < "u" && c(f, { name: u, newValue: a }));
          return f;
        };
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.default = h.BlockEmbed = h.bubbleFormats = void 0;
        var T = function() {
          function v(g, A) {
            for (var x = 0; x < A.length; x++) {
              var R = A[x];
              R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(g, R.key, R);
            }
          }
          return function(g, A, x) {
            return A && v(g.prototype, A), x && v(g, x), g;
          };
        }(), w = function v(g, A, x) {
          g === null && (g = Function.prototype);
          var R = Object.getOwnPropertyDescriptor(g, A);
          if (R === void 0) {
            var B = Object.getPrototypeOf(g);
            return B === null ? void 0 : v(B, A, x);
          } else {
            if ("value" in R)
              return R.value;
            var C = R.get;
            return C === void 0 ? void 0 : C.call(x);
          }
        }, O = d(3), p = f(O), y = d(2), c = f(y), o = d(0), t = f(o), e = d(16), u = f(e), l = d(6), a = f(l), r = d(7), i = f(r);
        function f(v) {
          return v && v.__esModule ? v : { default: v };
        }
        function n(v, g) {
          if (!(v instanceof g))
            throw new TypeError("Cannot call a class as a function");
        }
        function s(v, g) {
          if (!v)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return g && (typeof g == "object" || typeof g == "function") ? g : v;
        }
        function k(v, g) {
          if (typeof g != "function" && g !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof g);
          v.prototype = Object.create(g && g.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(v, g) : v.__proto__ = g);
        }
        var b = 1, _ = function(v) {
          k(g, v);
          function g() {
            return n(this, g), s(this, (g.__proto__ || Object.getPrototypeOf(g)).apply(this, arguments));
          }
          return T(g, [{
            key: "attach",
            value: function() {
              w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "attach", this).call(this), this.attributes = new t.default.Attributor.Store(this.domNode);
            }
          }, {
            key: "delta",
            value: function() {
              return new c.default().insert(this.value(), (0, p.default)(this.formats(), this.attributes.values()));
            }
          }, {
            key: "format",
            value: function(x, R) {
              var B = t.default.query(x, t.default.Scope.BLOCK_ATTRIBUTE);
              B != null && this.attributes.attribute(B, R);
            }
          }, {
            key: "formatAt",
            value: function(x, R, B, C) {
              this.format(B, C);
            }
          }, {
            key: "insertAt",
            value: function(x, R, B) {
              if (typeof R == "string" && R.endsWith(`
`)) {
                var C = t.default.create(N.blotName);
                this.parent.insertBefore(C, x === 0 ? this : this.next), C.insertAt(0, R.slice(0, -1));
              } else
                w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "insertAt", this).call(this, x, R, B);
            }
          }]), g;
        }(t.default.Embed);
        _.scope = t.default.Scope.BLOCK_BLOT;
        var N = function(v) {
          k(g, v);
          function g(A) {
            n(this, g);
            var x = s(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this, A));
            return x.cache = {}, x;
          }
          return T(g, [{
            key: "delta",
            value: function() {
              return this.cache.delta == null && (this.cache.delta = this.descendants(t.default.Leaf).reduce(function(x, R) {
                return R.length() === 0 ? x : x.insert(R.value(), m(R));
              }, new c.default()).insert(`
`, m(this))), this.cache.delta;
            }
          }, {
            key: "deleteAt",
            value: function(x, R) {
              w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "deleteAt", this).call(this, x, R), this.cache = {};
            }
          }, {
            key: "formatAt",
            value: function(x, R, B, C) {
              R <= 0 || (t.default.query(B, t.default.Scope.BLOCK) ? x + R === this.length() && this.format(B, C) : w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "formatAt", this).call(this, x, Math.min(R, this.length() - x - 1), B, C), this.cache = {});
            }
          }, {
            key: "insertAt",
            value: function(x, R, B) {
              if (B != null)
                return w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "insertAt", this).call(this, x, R, B);
              if (R.length !== 0) {
                var C = R.split(`
`), Z = C.shift();
                Z.length > 0 && (x < this.length() - 1 || this.children.tail == null ? w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "insertAt", this).call(this, Math.min(x, this.length() - 1), Z) : this.children.tail.insertAt(this.children.tail.length(), Z), this.cache = {});
                var M = this;
                C.reduce(function(j, E) {
                  return M = M.split(j, !0), M.insertAt(0, E), E.length;
                }, x + Z.length);
              }
            }
          }, {
            key: "insertBefore",
            value: function(x, R) {
              var B = this.children.head;
              w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "insertBefore", this).call(this, x, R), B instanceof u.default && B.remove(), this.cache = {};
            }
          }, {
            key: "length",
            value: function() {
              return this.cache.length == null && (this.cache.length = w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "length", this).call(this) + b), this.cache.length;
            }
          }, {
            key: "moveChildren",
            value: function(x, R) {
              w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "moveChildren", this).call(this, x, R), this.cache = {};
            }
          }, {
            key: "optimize",
            value: function(x) {
              w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "optimize", this).call(this, x), this.cache = {};
            }
          }, {
            key: "path",
            value: function(x) {
              return w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "path", this).call(this, x, !0);
            }
          }, {
            key: "removeChild",
            value: function(x) {
              w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "removeChild", this).call(this, x), this.cache = {};
            }
          }, {
            key: "split",
            value: function(x) {
              var R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
              if (R && (x === 0 || x >= this.length() - b)) {
                var B = this.clone();
                return x === 0 ? (this.parent.insertBefore(B, this), this) : (this.parent.insertBefore(B, this.next), B);
              } else {
                var C = w(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "split", this).call(this, x, R);
                return this.cache = {}, C;
              }
            }
          }]), g;
        }(t.default.Block);
        N.blotName = "block", N.tagName = "P", N.defaultChild = "break", N.allowedChildren = [a.default, t.default.Embed, i.default];
        function m(v) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return v == null || (typeof v.formats == "function" && (g = (0, p.default)(g, v.formats())), v.parent == null || v.parent.blotName == "scroll" || v.parent.statics.scope !== v.statics.scope) ? g : m(v.parent, g);
        }
        h.bubbleFormats = m, h.BlockEmbed = _, h.default = N;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.default = h.overload = h.expandConfig = void 0;
        var T = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(M) {
          return typeof M;
        } : function(M) {
          return M && typeof Symbol == "function" && M.constructor === Symbol && M !== Symbol.prototype ? "symbol" : typeof M;
        }, w = function() {
          function M(j, E) {
            var P = [], q = !0, F = !1, D = void 0;
            try {
              for (var S = j[Symbol.iterator](), I; !(q = (I = S.next()).done) && (P.push(I.value), !(E && P.length === E)); q = !0)
                ;
            } catch (U) {
              F = !0, D = U;
            } finally {
              try {
                !q && S.return && S.return();
              } finally {
                if (F)
                  throw D;
              }
            }
            return P;
          }
          return function(j, E) {
            if (Array.isArray(j))
              return j;
            if (Symbol.iterator in Object(j))
              return M(j, E);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), O = function() {
          function M(j, E) {
            for (var P = 0; P < E.length; P++) {
              var q = E[P];
              q.enumerable = q.enumerable || !1, q.configurable = !0, "value" in q && (q.writable = !0), Object.defineProperty(j, q.key, q);
            }
          }
          return function(j, E, P) {
            return E && M(j.prototype, E), P && M(j, P), j;
          };
        }();
        d(50);
        var p = d(2), y = m(p), c = d(14), o = m(c), t = d(8), e = m(t), u = d(9), l = m(u), a = d(0), r = m(a), i = d(15), f = m(i), n = d(3), s = m(n), k = d(10), b = m(k), _ = d(34), N = m(_);
        function m(M) {
          return M && M.__esModule ? M : { default: M };
        }
        function v(M, j, E) {
          return j in M ? Object.defineProperty(M, j, { value: E, enumerable: !0, configurable: !0, writable: !0 }) : M[j] = E, M;
        }
        function g(M, j) {
          if (!(M instanceof j))
            throw new TypeError("Cannot call a class as a function");
        }
        var A = (0, b.default)("quill"), x = function() {
          O(M, null, [{
            key: "debug",
            value: function(E) {
              E === !0 && (E = "log"), b.default.level(E);
            }
          }, {
            key: "find",
            value: function(E) {
              return E.__quill || r.default.find(E);
            }
          }, {
            key: "import",
            value: function(E) {
              return this.imports[E] == null && A.error("Cannot import " + E + ". Are you sure it was registered?"), this.imports[E];
            }
          }, {
            key: "register",
            value: function(E, P) {
              var q = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
              if (typeof E != "string") {
                var D = E.attrName || E.blotName;
                typeof D == "string" ? this.register("formats/" + D, E, P) : Object.keys(E).forEach(function(S) {
                  q.register(S, E[S], P);
                });
              } else
                this.imports[E] != null && !F && A.warn("Overwriting " + E + " with", P), this.imports[E] = P, (E.startsWith("blots/") || E.startsWith("formats/")) && P.blotName !== "abstract" ? r.default.register(P) : E.startsWith("modules") && typeof P.register == "function" && P.register();
            }
          }]);
          function M(j) {
            var E = this, P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            if (g(this, M), this.options = R(j, P), this.container = this.options.container, this.container == null)
              return A.error("Invalid Quill container", j);
            this.options.debug && M.debug(this.options.debug);
            var q = this.container.innerHTML.trim();
            this.container.classList.add("ql-container"), this.container.innerHTML = "", this.container.__quill = this, this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.root.setAttribute("data-gramm", !1), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new e.default(), this.scroll = r.default.create(this.root, {
              emitter: this.emitter,
              whitelist: this.options.formats
            }), this.editor = new o.default(this.scroll), this.selection = new f.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.theme.init(), this.emitter.on(e.default.events.EDITOR_CHANGE, function(D) {
              D === e.default.events.TEXT_CHANGE && E.root.classList.toggle("ql-blank", E.editor.isBlank());
            }), this.emitter.on(e.default.events.SCROLL_UPDATE, function(D, S) {
              var I = E.selection.lastRange, U = I && I.length === 0 ? I.index : void 0;
              B.call(E, function() {
                return E.editor.update(null, S, U);
              }, D);
            });
            var F = this.clipboard.convert(`<div class='ql-editor' style="white-space: normal;">` + q + "<p><br></p></div>");
            this.setContents(F), this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable();
          }
          return O(M, [{
            key: "addContainer",
            value: function(E) {
              var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
              if (typeof E == "string") {
                var q = E;
                E = document.createElement("div"), E.classList.add(q);
              }
              return this.container.insertBefore(E, P), E;
            }
          }, {
            key: "blur",
            value: function() {
              this.selection.setRange(null);
            }
          }, {
            key: "deleteText",
            value: function(E, P, q) {
              var F = this, D = C(E, P, q), S = w(D, 4);
              return E = S[0], P = S[1], q = S[3], B.call(this, function() {
                return F.editor.deleteText(E, P);
              }, q, E, -1 * P);
            }
          }, {
            key: "disable",
            value: function() {
              this.enable(!1);
            }
          }, {
            key: "enable",
            value: function() {
              var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
              this.scroll.enable(E), this.container.classList.toggle("ql-disabled", !E);
            }
          }, {
            key: "focus",
            value: function() {
              var E = this.scrollingContainer.scrollTop;
              this.selection.focus(), this.scrollingContainer.scrollTop = E, this.scrollIntoView();
            }
          }, {
            key: "format",
            value: function(E, P) {
              var q = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.default.sources.API;
              return B.call(this, function() {
                var D = q.getSelection(!0), S = new y.default();
                if (D == null)
                  return S;
                if (r.default.query(E, r.default.Scope.BLOCK))
                  S = q.editor.formatLine(D.index, D.length, v({}, E, P));
                else {
                  if (D.length === 0)
                    return q.selection.format(E, P), S;
                  S = q.editor.formatText(D.index, D.length, v({}, E, P));
                }
                return q.setSelection(D, e.default.sources.SILENT), S;
              }, F);
            }
          }, {
            key: "formatLine",
            value: function(E, P, q, F, D) {
              var S = this, I = void 0, U = C(E, P, q, F, D), H = w(U, 4);
              return E = H[0], P = H[1], I = H[2], D = H[3], B.call(this, function() {
                return S.editor.formatLine(E, P, I);
              }, D, E, 0);
            }
          }, {
            key: "formatText",
            value: function(E, P, q, F, D) {
              var S = this, I = void 0, U = C(E, P, q, F, D), H = w(U, 4);
              return E = H[0], P = H[1], I = H[2], D = H[3], B.call(this, function() {
                return S.editor.formatText(E, P, I);
              }, D, E, 0);
            }
          }, {
            key: "getBounds",
            value: function(E) {
              var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, q = void 0;
              typeof E == "number" ? q = this.selection.getBounds(E, P) : q = this.selection.getBounds(E.index, E.length);
              var F = this.container.getBoundingClientRect();
              return {
                bottom: q.bottom - F.top,
                height: q.height,
                left: q.left - F.left,
                right: q.right - F.left,
                top: q.top - F.top,
                width: q.width
              };
            }
          }, {
            key: "getContents",
            value: function() {
              var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - E, q = C(E, P), F = w(q, 2);
              return E = F[0], P = F[1], this.editor.getContents(E, P);
            }
          }, {
            key: "getFormat",
            value: function() {
              var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
              return typeof E == "number" ? this.editor.getFormat(E, P) : this.editor.getFormat(E.index, E.length);
            }
          }, {
            key: "getIndex",
            value: function(E) {
              return E.offset(this.scroll);
            }
          }, {
            key: "getLength",
            value: function() {
              return this.scroll.length();
            }
          }, {
            key: "getLeaf",
            value: function(E) {
              return this.scroll.leaf(E);
            }
          }, {
            key: "getLine",
            value: function(E) {
              return this.scroll.line(E);
            }
          }, {
            key: "getLines",
            value: function() {
              var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
              return typeof E != "number" ? this.scroll.lines(E.index, E.length) : this.scroll.lines(E, P);
            }
          }, {
            key: "getModule",
            value: function(E) {
              return this.theme.modules[E];
            }
          }, {
            key: "getSelection",
            value: function() {
              var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
              return E && this.focus(), this.update(), this.selection.getRange()[0];
            }
          }, {
            key: "getText",
            value: function() {
              var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - E, q = C(E, P), F = w(q, 2);
              return E = F[0], P = F[1], this.editor.getText(E, P);
            }
          }, {
            key: "hasFocus",
            value: function() {
              return this.selection.hasFocus();
            }
          }, {
            key: "insertEmbed",
            value: function(E, P, q) {
              var F = this, D = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : M.sources.API;
              return B.call(this, function() {
                return F.editor.insertEmbed(E, P, q);
              }, D, E);
            }
          }, {
            key: "insertText",
            value: function(E, P, q, F, D) {
              var S = this, I = void 0, U = C(E, 0, q, F, D), H = w(U, 4);
              return E = H[0], I = H[2], D = H[3], B.call(this, function() {
                return S.editor.insertText(E, P, I);
              }, D, E, P.length);
            }
          }, {
            key: "isEnabled",
            value: function() {
              return !this.container.classList.contains("ql-disabled");
            }
          }, {
            key: "off",
            value: function() {
              return this.emitter.off.apply(this.emitter, arguments);
            }
          }, {
            key: "on",
            value: function() {
              return this.emitter.on.apply(this.emitter, arguments);
            }
          }, {
            key: "once",
            value: function() {
              return this.emitter.once.apply(this.emitter, arguments);
            }
          }, {
            key: "pasteHTML",
            value: function(E, P, q) {
              this.clipboard.dangerouslyPasteHTML(E, P, q);
            }
          }, {
            key: "removeFormat",
            value: function(E, P, q) {
              var F = this, D = C(E, P, q), S = w(D, 4);
              return E = S[0], P = S[1], q = S[3], B.call(this, function() {
                return F.editor.removeFormat(E, P);
              }, q, E);
            }
          }, {
            key: "scrollIntoView",
            value: function() {
              this.selection.scrollIntoView(this.scrollingContainer);
            }
          }, {
            key: "setContents",
            value: function(E) {
              var P = this, q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.default.sources.API;
              return B.call(this, function() {
                E = new y.default(E);
                var F = P.getLength(), D = P.editor.deleteText(0, F), S = P.editor.applyDelta(E), I = S.ops[S.ops.length - 1];
                I != null && typeof I.insert == "string" && I.insert[I.insert.length - 1] === `
` && (P.editor.deleteText(P.getLength() - 1, 1), S.delete(1));
                var U = D.compose(S);
                return U;
              }, q);
            }
          }, {
            key: "setSelection",
            value: function(E, P, q) {
              if (E == null)
                this.selection.setRange(null, P || M.sources.API);
              else {
                var F = C(E, P, q), D = w(F, 4);
                E = D[0], P = D[1], q = D[3], this.selection.setRange(new i.Range(E, P), q), q !== e.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer);
              }
            }
          }, {
            key: "setText",
            value: function(E) {
              var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.default.sources.API, q = new y.default().insert(E);
              return this.setContents(q, P);
            }
          }, {
            key: "update",
            value: function() {
              var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.default.sources.USER, P = this.scroll.update(E);
              return this.selection.update(E), P;
            }
          }, {
            key: "updateContents",
            value: function(E) {
              var P = this, q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.default.sources.API;
              return B.call(this, function() {
                return E = new y.default(E), P.editor.applyDelta(E, q);
              }, q, !0);
            }
          }]), M;
        }();
        x.DEFAULTS = {
          bounds: null,
          formats: null,
          modules: {},
          placeholder: "",
          readOnly: !1,
          scrollingContainer: null,
          strict: !0,
          theme: "default"
        }, x.events = e.default.events, x.sources = e.default.sources, x.version = "1.3.7", x.imports = {
          delta: y.default,
          parchment: r.default,
          "core/module": l.default,
          "core/theme": N.default
        };
        function R(M, j) {
          if (j = (0, s.default)(!0, {
            container: M,
            modules: {
              clipboard: !0,
              keyboard: !0,
              history: !0
            }
          }, j), !j.theme || j.theme === x.DEFAULTS.theme)
            j.theme = N.default;
          else if (j.theme = x.import("themes/" + j.theme), j.theme == null)
            throw new Error("Invalid theme " + j.theme + ". Did you register it?");
          var E = (0, s.default)(!0, {}, j.theme.DEFAULTS);
          [E, j].forEach(function(F) {
            F.modules = F.modules || {}, Object.keys(F.modules).forEach(function(D) {
              F.modules[D] === !0 && (F.modules[D] = {});
            });
          });
          var P = Object.keys(E.modules).concat(Object.keys(j.modules)), q = P.reduce(function(F, D) {
            var S = x.import("modules/" + D);
            return S == null ? A.error("Cannot load " + D + " module. Are you sure you registered it?") : F[D] = S.DEFAULTS || {}, F;
          }, {});
          return j.modules != null && j.modules.toolbar && j.modules.toolbar.constructor !== Object && (j.modules.toolbar = {
            container: j.modules.toolbar
          }), j = (0, s.default)(!0, {}, x.DEFAULTS, { modules: q }, E, j), ["bounds", "container", "scrollingContainer"].forEach(function(F) {
            typeof j[F] == "string" && (j[F] = document.querySelector(j[F]));
          }), j.modules = Object.keys(j.modules).reduce(function(F, D) {
            return j.modules[D] && (F[D] = j.modules[D]), F;
          }, {}), j;
        }
        function B(M, j, E, P) {
          if (this.options.strict && !this.isEnabled() && j === e.default.sources.USER)
            return new y.default();
          var q = E == null ? null : this.getSelection(), F = this.editor.delta, D = M();
          if (q != null && (E === !0 && (E = q.index), P == null ? q = Z(q, D, j) : P !== 0 && (q = Z(q, E, P, j)), this.setSelection(q, e.default.sources.SILENT)), D.length() > 0) {
            var S, I = [e.default.events.TEXT_CHANGE, D, F, j];
            if ((S = this.emitter).emit.apply(S, [e.default.events.EDITOR_CHANGE].concat(I)), j !== e.default.sources.SILENT) {
              var U;
              (U = this.emitter).emit.apply(U, I);
            }
          }
          return D;
        }
        function C(M, j, E, P, q) {
          var F = {};
          return typeof M.index == "number" && typeof M.length == "number" ? typeof j != "number" ? (q = P, P = E, E = j, j = M.length, M = M.index) : (j = M.length, M = M.index) : typeof j != "number" && (q = P, P = E, E = j, j = 0), (typeof E > "u" ? "undefined" : T(E)) === "object" ? (F = E, q = P) : typeof E == "string" && (P != null ? F[E] = P : q = E), q = q || e.default.sources.API, [M, j, F, q];
        }
        function Z(M, j, E, P) {
          if (M == null)
            return null;
          var q = void 0, F = void 0;
          if (j instanceof y.default) {
            var D = [M.index, M.index + M.length].map(function(H) {
              return j.transformPosition(H, P !== e.default.sources.USER);
            }), S = w(D, 2);
            q = S[0], F = S[1];
          } else {
            var I = [M.index, M.index + M.length].map(function(H) {
              return H < j || H === j && P === e.default.sources.USER ? H : E >= 0 ? H + E : Math.max(j, H + E);
            }), U = w(I, 2);
            q = U[0], F = U[1];
          }
          return new i.Range(q, F - q);
        }
        h.expandConfig = R, h.overload = C, h.default = x;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function a(r, i) {
            for (var f = 0; f < i.length; f++) {
              var n = i[f];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, f) {
            return i && a(r.prototype, i), f && a(r, f), r;
          };
        }(), w = function a(r, i, f) {
          r === null && (r = Function.prototype);
          var n = Object.getOwnPropertyDescriptor(r, i);
          if (n === void 0) {
            var s = Object.getPrototypeOf(r);
            return s === null ? void 0 : a(s, i, f);
          } else {
            if ("value" in n)
              return n.value;
            var k = n.get;
            return k === void 0 ? void 0 : k.call(f);
          }
        }, O = d(7), p = o(O), y = d(0), c = o(y);
        function o(a) {
          return a && a.__esModule ? a : { default: a };
        }
        function t(a, r) {
          if (!(a instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        function e(a, r) {
          if (!a)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r && (typeof r == "object" || typeof r == "function") ? r : a;
        }
        function u(a, r) {
          if (typeof r != "function" && r !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof r);
          a.prototype = Object.create(r && r.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(a, r) : a.__proto__ = r);
        }
        var l = function(a) {
          u(r, a);
          function r() {
            return t(this, r), e(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
          }
          return T(r, [{
            key: "formatAt",
            value: function(f, n, s, k) {
              if (r.compare(this.statics.blotName, s) < 0 && c.default.query(s, c.default.Scope.BLOT)) {
                var b = this.isolate(f, n);
                k && b.wrap(s, k);
              } else
                w(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "formatAt", this).call(this, f, n, s, k);
            }
          }, {
            key: "optimize",
            value: function(f) {
              if (w(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "optimize", this).call(this, f), this.parent instanceof r && r.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                var n = this.parent.isolate(this.offset(), this.length());
                this.moveChildren(n), n.wrap(this);
              }
            }
          }], [{
            key: "compare",
            value: function(f, n) {
              var s = r.order.indexOf(f), k = r.order.indexOf(n);
              return s >= 0 || k >= 0 ? s - k : f === n ? 0 : f < n ? -1 : 1;
            }
          }]), r;
        }(c.default.Inline);
        l.allowedChildren = [l, c.default.Embed, p.default], l.order = [
          "cursor",
          "inline",
          "underline",
          "strike",
          "italic",
          "bold",
          "script",
          "link",
          "code"
        ], h.default = l;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = d(0), w = O(T);
        function O(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function p(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function c(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          c(e, t);
          function e() {
            return p(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(w.default.Text);
        h.default = o;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function i(f, n) {
            for (var s = 0; s < n.length; s++) {
              var k = n[s];
              k.enumerable = k.enumerable || !1, k.configurable = !0, "value" in k && (k.writable = !0), Object.defineProperty(f, k.key, k);
            }
          }
          return function(f, n, s) {
            return n && i(f.prototype, n), s && i(f, s), f;
          };
        }(), w = function i(f, n, s) {
          f === null && (f = Function.prototype);
          var k = Object.getOwnPropertyDescriptor(f, n);
          if (k === void 0) {
            var b = Object.getPrototypeOf(f);
            return b === null ? void 0 : i(b, n, s);
          } else {
            if ("value" in k)
              return k.value;
            var _ = k.get;
            return _ === void 0 ? void 0 : _.call(s);
          }
        }, O = d(54), p = o(O), y = d(10), c = o(y);
        function o(i) {
          return i && i.__esModule ? i : { default: i };
        }
        function t(i, f) {
          if (!(i instanceof f))
            throw new TypeError("Cannot call a class as a function");
        }
        function e(i, f) {
          if (!i)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return f && (typeof f == "object" || typeof f == "function") ? f : i;
        }
        function u(i, f) {
          if (typeof f != "function" && f !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof f);
          i.prototype = Object.create(f && f.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), f && (Object.setPrototypeOf ? Object.setPrototypeOf(i, f) : i.__proto__ = f);
        }
        var l = (0, c.default)("quill:events"), a = ["selectionchange", "mousedown", "mouseup", "click"];
        a.forEach(function(i) {
          document.addEventListener(i, function() {
            for (var f = arguments.length, n = Array(f), s = 0; s < f; s++)
              n[s] = arguments[s];
            [].slice.call(document.querySelectorAll(".ql-container")).forEach(function(k) {
              if (k.__quill && k.__quill.emitter) {
                var b;
                (b = k.__quill.emitter).handleDOM.apply(b, n);
              }
            });
          });
        });
        var r = function(i) {
          u(f, i);
          function f() {
            t(this, f);
            var n = e(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this));
            return n.listeners = {}, n.on("error", l.error), n;
          }
          return T(f, [{
            key: "emit",
            value: function() {
              l.log.apply(l, arguments), w(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "emit", this).apply(this, arguments);
            }
          }, {
            key: "handleDOM",
            value: function(s) {
              for (var k = arguments.length, b = Array(k > 1 ? k - 1 : 0), _ = 1; _ < k; _++)
                b[_ - 1] = arguments[_];
              (this.listeners[s.type] || []).forEach(function(N) {
                var m = N.node, v = N.handler;
                (s.target === m || m.contains(s.target)) && v.apply(void 0, [s].concat(b));
              });
            }
          }, {
            key: "listenDOM",
            value: function(s, k, b) {
              this.listeners[s] || (this.listeners[s] = []), this.listeners[s].push({ node: k, handler: b });
            }
          }]), f;
        }(p.default);
        r.events = {
          EDITOR_CHANGE: "editor-change",
          SCROLL_BEFORE_UPDATE: "scroll-before-update",
          SCROLL_OPTIMIZE: "scroll-optimize",
          SCROLL_UPDATE: "scroll-update",
          SELECTION_CHANGE: "selection-change",
          TEXT_CHANGE: "text-change"
        }, r.sources = {
          API: "api",
          SILENT: "silent",
          USER: "user"
        }, h.default = r;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        function T(O, p) {
          if (!(O instanceof p))
            throw new TypeError("Cannot call a class as a function");
        }
        var w = function O(p) {
          var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          T(this, O), this.quill = p, this.options = y;
        };
        w.DEFAULTS = {}, h.default = w;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = ["error", "warn", "log", "info"], w = "warn";
        function O(y) {
          if (T.indexOf(y) <= T.indexOf(w)) {
            for (var c, o = arguments.length, t = Array(o > 1 ? o - 1 : 0), e = 1; e < o; e++)
              t[e - 1] = arguments[e];
            (c = console)[y].apply(c, t);
          }
        }
        function p(y) {
          return T.reduce(function(c, o) {
            return c[o] = O.bind(console, o, y), c;
          }, {});
        }
        O.level = p.level = function(y) {
          w = y;
        }, h.default = p;
      },
      function(L, h, d) {
        var T = Array.prototype.slice, w = d(52), O = d(53), p = L.exports = function(t, e, u) {
          return u || (u = {}), t === e ? !0 : t instanceof Date && e instanceof Date ? t.getTime() === e.getTime() : !t || !e || typeof t != "object" && typeof e != "object" ? u.strict ? t === e : t == e : o(t, e, u);
        };
        function y(t) {
          return t == null;
        }
        function c(t) {
          return !(!t || typeof t != "object" || typeof t.length != "number" || typeof t.copy != "function" || typeof t.slice != "function" || t.length > 0 && typeof t[0] != "number");
        }
        function o(t, e, u) {
          var l, a;
          if (y(t) || y(e) || t.prototype !== e.prototype)
            return !1;
          if (O(t))
            return O(e) ? (t = T.call(t), e = T.call(e), p(t, e, u)) : !1;
          if (c(t)) {
            if (!c(e) || t.length !== e.length)
              return !1;
            for (l = 0; l < t.length; l++)
              if (t[l] !== e[l])
                return !1;
            return !0;
          }
          try {
            var r = w(t), i = w(e);
          } catch {
            return !1;
          }
          if (r.length != i.length)
            return !1;
          for (r.sort(), i.sort(), l = r.length - 1; l >= 0; l--)
            if (r[l] != i[l])
              return !1;
          for (l = r.length - 1; l >= 0; l--)
            if (a = r[l], !p(t[a], e[a], u))
              return !1;
          return typeof t == typeof e;
        }
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", { value: !0 });
        var T = d(1), w = function() {
          function O(p, y, c) {
            c === void 0 && (c = {}), this.attrName = p, this.keyName = y;
            var o = T.Scope.TYPE & T.Scope.ATTRIBUTE;
            c.scope != null ? this.scope = c.scope & T.Scope.LEVEL | o : this.scope = T.Scope.ATTRIBUTE, c.whitelist != null && (this.whitelist = c.whitelist);
          }
          return O.keys = function(p) {
            return [].map.call(p.attributes, function(y) {
              return y.name;
            });
          }, O.prototype.add = function(p, y) {
            return this.canAdd(p, y) ? (p.setAttribute(this.keyName, y), !0) : !1;
          }, O.prototype.canAdd = function(p, y) {
            var c = T.query(p, T.Scope.BLOT & (this.scope | T.Scope.TYPE));
            return c == null ? !1 : this.whitelist == null ? !0 : typeof y == "string" ? this.whitelist.indexOf(y.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(y) > -1;
          }, O.prototype.remove = function(p) {
            p.removeAttribute(this.keyName);
          }, O.prototype.value = function(p) {
            var y = p.getAttribute(this.keyName);
            return this.canAdd(p, y) && y ? y : "";
          }, O;
        }();
        h.default = w;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.default = h.Code = void 0;
        var T = function() {
          function _(N, m) {
            var v = [], g = !0, A = !1, x = void 0;
            try {
              for (var R = N[Symbol.iterator](), B; !(g = (B = R.next()).done) && (v.push(B.value), !(m && v.length === m)); g = !0)
                ;
            } catch (C) {
              A = !0, x = C;
            } finally {
              try {
                !g && R.return && R.return();
              } finally {
                if (A)
                  throw x;
              }
            }
            return v;
          }
          return function(N, m) {
            if (Array.isArray(N))
              return N;
            if (Symbol.iterator in Object(N))
              return _(N, m);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), w = function() {
          function _(N, m) {
            for (var v = 0; v < m.length; v++) {
              var g = m[v];
              g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(N, g.key, g);
            }
          }
          return function(N, m, v) {
            return m && _(N.prototype, m), v && _(N, v), N;
          };
        }(), O = function _(N, m, v) {
          N === null && (N = Function.prototype);
          var g = Object.getOwnPropertyDescriptor(N, m);
          if (g === void 0) {
            var A = Object.getPrototypeOf(N);
            return A === null ? void 0 : _(A, m, v);
          } else {
            if ("value" in g)
              return g.value;
            var x = g.get;
            return x === void 0 ? void 0 : x.call(v);
          }
        }, p = d(2), y = i(p), c = d(0), o = i(c), t = d(4), e = i(t), u = d(6), l = i(u), a = d(7), r = i(a);
        function i(_) {
          return _ && _.__esModule ? _ : { default: _ };
        }
        function f(_, N) {
          if (!(_ instanceof N))
            throw new TypeError("Cannot call a class as a function");
        }
        function n(_, N) {
          if (!_)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return N && (typeof N == "object" || typeof N == "function") ? N : _;
        }
        function s(_, N) {
          if (typeof N != "function" && N !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof N);
          _.prototype = Object.create(N && N.prototype, { constructor: { value: _, enumerable: !1, writable: !0, configurable: !0 } }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(_, N) : _.__proto__ = N);
        }
        var k = function(_) {
          s(N, _);
          function N() {
            return f(this, N), n(this, (N.__proto__ || Object.getPrototypeOf(N)).apply(this, arguments));
          }
          return N;
        }(l.default);
        k.blotName = "code", k.tagName = "CODE";
        var b = function(_) {
          s(N, _);
          function N() {
            return f(this, N), n(this, (N.__proto__ || Object.getPrototypeOf(N)).apply(this, arguments));
          }
          return w(N, [{
            key: "delta",
            value: function() {
              var v = this, g = this.domNode.textContent;
              return g.endsWith(`
`) && (g = g.slice(0, -1)), g.split(`
`).reduce(function(A, x) {
                return A.insert(x).insert(`
`, v.formats());
              }, new y.default());
            }
          }, {
            key: "format",
            value: function(v, g) {
              if (!(v === this.statics.blotName && g)) {
                var A = this.descendant(r.default, this.length() - 1), x = T(A, 1), R = x[0];
                R != null && R.deleteAt(R.length() - 1, 1), O(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "format", this).call(this, v, g);
              }
            }
          }, {
            key: "formatAt",
            value: function(v, g, A, x) {
              if (g !== 0 && !(o.default.query(A, o.default.Scope.BLOCK) == null || A === this.statics.blotName && x === this.statics.formats(this.domNode))) {
                var R = this.newlineIndex(v);
                if (!(R < 0 || R >= v + g)) {
                  var B = this.newlineIndex(v, !0) + 1, C = R - B + 1, Z = this.isolate(B, C), M = Z.next;
                  Z.format(A, x), M instanceof N && M.formatAt(0, v - B + g - C, A, x);
                }
              }
            }
          }, {
            key: "insertAt",
            value: function(v, g, A) {
              if (A == null) {
                var x = this.descendant(r.default, v), R = T(x, 2), B = R[0], C = R[1];
                B.insertAt(C, g);
              }
            }
          }, {
            key: "length",
            value: function() {
              var v = this.domNode.textContent.length;
              return this.domNode.textContent.endsWith(`
`) ? v : v + 1;
            }
          }, {
            key: "newlineIndex",
            value: function(v) {
              var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
              if (g)
                return this.domNode.textContent.slice(0, v).lastIndexOf(`
`);
              var A = this.domNode.textContent.slice(v).indexOf(`
`);
              return A > -1 ? v + A : -1;
            }
          }, {
            key: "optimize",
            value: function(v) {
              this.domNode.textContent.endsWith(`
`) || this.appendChild(o.default.create("text", `
`)), O(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "optimize", this).call(this, v);
              var g = this.next;
              g != null && g.prev === this && g.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === g.statics.formats(g.domNode) && (g.optimize(v), g.moveChildren(this), g.remove());
            }
          }, {
            key: "replace",
            value: function(v) {
              O(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "replace", this).call(this, v), [].slice.call(this.domNode.querySelectorAll("*")).forEach(function(g) {
                var A = o.default.find(g);
                A == null ? g.parentNode.removeChild(g) : A instanceof o.default.Embed ? A.remove() : A.unwrap();
              });
            }
          }], [{
            key: "create",
            value: function(v) {
              var g = O(N.__proto__ || Object.getPrototypeOf(N), "create", this).call(this, v);
              return g.setAttribute("spellcheck", !1), g;
            }
          }, {
            key: "formats",
            value: function() {
              return !0;
            }
          }]), N;
        }(e.default);
        b.blotName = "code-block", b.tagName = "PRE", b.TAB = "  ", h.Code = k, h.default = b;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(M) {
          return typeof M;
        } : function(M) {
          return M && typeof Symbol == "function" && M.constructor === Symbol && M !== Symbol.prototype ? "symbol" : typeof M;
        }, w = function() {
          function M(j, E) {
            var P = [], q = !0, F = !1, D = void 0;
            try {
              for (var S = j[Symbol.iterator](), I; !(q = (I = S.next()).done) && (P.push(I.value), !(E && P.length === E)); q = !0)
                ;
            } catch (U) {
              F = !0, D = U;
            } finally {
              try {
                !q && S.return && S.return();
              } finally {
                if (F)
                  throw D;
              }
            }
            return P;
          }
          return function(j, E) {
            if (Array.isArray(j))
              return j;
            if (Symbol.iterator in Object(j))
              return M(j, E);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), O = function() {
          function M(j, E) {
            for (var P = 0; P < E.length; P++) {
              var q = E[P];
              q.enumerable = q.enumerable || !1, q.configurable = !0, "value" in q && (q.writable = !0), Object.defineProperty(j, q.key, q);
            }
          }
          return function(j, E, P) {
            return E && M(j.prototype, E), P && M(j, P), j;
          };
        }(), p = d(2), y = g(p), c = d(20), o = g(c), t = d(0), e = g(t), u = d(13), l = g(u), a = d(24), r = g(a), i = d(4), f = g(i), n = d(16), s = g(n), k = d(21), b = g(k), _ = d(11), N = g(_), m = d(3), v = g(m);
        function g(M) {
          return M && M.__esModule ? M : { default: M };
        }
        function A(M, j, E) {
          return j in M ? Object.defineProperty(M, j, { value: E, enumerable: !0, configurable: !0, writable: !0 }) : M[j] = E, M;
        }
        function x(M, j) {
          if (!(M instanceof j))
            throw new TypeError("Cannot call a class as a function");
        }
        var R = /^[ -~]*$/, B = function() {
          function M(j) {
            x(this, M), this.scroll = j, this.delta = this.getDelta();
          }
          return O(M, [{
            key: "applyDelta",
            value: function(E) {
              var P = this, q = !1;
              this.scroll.update();
              var F = this.scroll.length();
              return this.scroll.batchStart(), E = Z(E), E.reduce(function(D, S) {
                var I = S.retain || S.delete || S.insert.length || 1, U = S.attributes || {};
                if (S.insert != null) {
                  if (typeof S.insert == "string") {
                    var H = S.insert;
                    H.endsWith(`
`) && q && (q = !1, H = H.slice(0, -1)), D >= F && !H.endsWith(`
`) && (q = !0), P.scroll.insertAt(D, H);
                    var V = P.scroll.line(D), Y = w(V, 2), Q = Y[0], J = Y[1], rt = (0, v.default)({}, (0, i.bubbleFormats)(Q));
                    if (Q instanceof f.default) {
                      var it = Q.descendant(e.default.Leaf, J), ft = w(it, 1), ut = ft[0];
                      rt = (0, v.default)(rt, (0, i.bubbleFormats)(ut));
                    }
                    U = o.default.attributes.diff(rt, U) || {};
                  } else if (T(S.insert) === "object") {
                    var z = Object.keys(S.insert)[0];
                    if (z == null)
                      return D;
                    P.scroll.insertAt(D, z, S.insert[z]);
                  }
                  F += I;
                }
                return Object.keys(U).forEach(function(K) {
                  P.scroll.formatAt(D, I, K, U[K]);
                }), D + I;
              }, 0), E.reduce(function(D, S) {
                return typeof S.delete == "number" ? (P.scroll.deleteAt(D, S.delete), D) : D + (S.retain || S.insert.length || 1);
              }, 0), this.scroll.batchEnd(), this.update(E);
            }
          }, {
            key: "deleteText",
            value: function(E, P) {
              return this.scroll.deleteAt(E, P), this.update(new y.default().retain(E).delete(P));
            }
          }, {
            key: "formatLine",
            value: function(E, P) {
              var q = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
              return this.scroll.update(), Object.keys(F).forEach(function(D) {
                if (!(q.scroll.whitelist != null && !q.scroll.whitelist[D])) {
                  var S = q.scroll.lines(E, Math.max(P, 1)), I = P;
                  S.forEach(function(U) {
                    var H = U.length();
                    if (!(U instanceof l.default))
                      U.format(D, F[D]);
                    else {
                      var V = E - U.offset(q.scroll), Y = U.newlineIndex(V + I) - V + 1;
                      U.formatAt(V, Y, D, F[D]);
                    }
                    I -= H;
                  });
                }
              }), this.scroll.optimize(), this.update(new y.default().retain(E).retain(P, (0, b.default)(F)));
            }
          }, {
            key: "formatText",
            value: function(E, P) {
              var q = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
              return Object.keys(F).forEach(function(D) {
                q.scroll.formatAt(E, P, D, F[D]);
              }), this.update(new y.default().retain(E).retain(P, (0, b.default)(F)));
            }
          }, {
            key: "getContents",
            value: function(E, P) {
              return this.delta.slice(E, E + P);
            }
          }, {
            key: "getDelta",
            value: function() {
              return this.scroll.lines().reduce(function(E, P) {
                return E.concat(P.delta());
              }, new y.default());
            }
          }, {
            key: "getFormat",
            value: function(E) {
              var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, q = [], F = [];
              P === 0 ? this.scroll.path(E).forEach(function(S) {
                var I = w(S, 1), U = I[0];
                U instanceof f.default ? q.push(U) : U instanceof e.default.Leaf && F.push(U);
              }) : (q = this.scroll.lines(E, P), F = this.scroll.descendants(e.default.Leaf, E, P));
              var D = [q, F].map(function(S) {
                if (S.length === 0)
                  return {};
                for (var I = (0, i.bubbleFormats)(S.shift()); Object.keys(I).length > 0; ) {
                  var U = S.shift();
                  if (U == null)
                    return I;
                  I = C((0, i.bubbleFormats)(U), I);
                }
                return I;
              });
              return v.default.apply(v.default, D);
            }
          }, {
            key: "getText",
            value: function(E, P) {
              return this.getContents(E, P).filter(function(q) {
                return typeof q.insert == "string";
              }).map(function(q) {
                return q.insert;
              }).join("");
            }
          }, {
            key: "insertEmbed",
            value: function(E, P, q) {
              return this.scroll.insertAt(E, P, q), this.update(new y.default().retain(E).insert(A({}, P, q)));
            }
          }, {
            key: "insertText",
            value: function(E, P) {
              var q = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
              return P = P.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(E, P), Object.keys(F).forEach(function(D) {
                q.scroll.formatAt(E, P.length, D, F[D]);
              }), this.update(new y.default().retain(E).insert(P, (0, b.default)(F)));
            }
          }, {
            key: "isBlank",
            value: function() {
              if (this.scroll.children.length == 0)
                return !0;
              if (this.scroll.children.length > 1)
                return !1;
              var E = this.scroll.children.head;
              return E.statics.blotName !== f.default.blotName || E.children.length > 1 ? !1 : E.children.head instanceof s.default;
            }
          }, {
            key: "removeFormat",
            value: function(E, P) {
              var q = this.getText(E, P), F = this.scroll.line(E + P), D = w(F, 2), S = D[0], I = D[1], U = 0, H = new y.default();
              S != null && (S instanceof l.default ? U = S.newlineIndex(I) - I + 1 : U = S.length() - I, H = S.delta().slice(I, I + U - 1).insert(`
`));
              var V = this.getContents(E, P + U), Y = V.diff(new y.default().insert(q).concat(H)), Q = new y.default().retain(E).concat(Y);
              return this.applyDelta(Q);
            }
          }, {
            key: "update",
            value: function(E) {
              var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0, F = this.delta;
              if (P.length === 1 && P[0].type === "characterData" && P[0].target.data.match(R) && e.default.find(P[0].target)) {
                var D = e.default.find(P[0].target), S = (0, i.bubbleFormats)(D), I = D.offset(this.scroll), U = P[0].oldValue.replace(r.default.CONTENTS, ""), H = new y.default().insert(U), V = new y.default().insert(D.value()), Y = new y.default().retain(I).concat(H.diff(V, q));
                E = Y.reduce(function(Q, J) {
                  return J.insert ? Q.insert(J.insert, S) : Q.push(J);
                }, new y.default()), this.delta = F.compose(E);
              } else
                this.delta = this.getDelta(), (!E || !(0, N.default)(F.compose(E), this.delta)) && (E = F.diff(this.delta, q));
              return E;
            }
          }]), M;
        }();
        function C(M, j) {
          return Object.keys(j).reduce(function(E, P) {
            return M[P] == null || (j[P] === M[P] ? E[P] = j[P] : Array.isArray(j[P]) ? j[P].indexOf(M[P]) < 0 && (E[P] = j[P].concat([M[P]])) : E[P] = [j[P], M[P]]), E;
          }, {});
        }
        function Z(M) {
          return M.reduce(function(j, E) {
            if (E.insert === 1) {
              var P = (0, b.default)(E.attributes);
              return delete P.image, j.insert({ image: E.attributes.image }, P);
            }
            if (E.attributes != null && (E.attributes.list === !0 || E.attributes.bullet === !0) && (E = (0, b.default)(E), E.attributes.list ? E.attributes.list = "ordered" : (E.attributes.list = "bullet", delete E.attributes.bullet)), typeof E.insert == "string") {
              var q = E.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
              return j.insert(q, E.attributes);
            }
            return j.push(E);
          }, new y.default());
        }
        h.default = B;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.default = h.Range = void 0;
        var T = function() {
          function _(N, m) {
            var v = [], g = !0, A = !1, x = void 0;
            try {
              for (var R = N[Symbol.iterator](), B; !(g = (B = R.next()).done) && (v.push(B.value), !(m && v.length === m)); g = !0)
                ;
            } catch (C) {
              A = !0, x = C;
            } finally {
              try {
                !g && R.return && R.return();
              } finally {
                if (A)
                  throw x;
              }
            }
            return v;
          }
          return function(N, m) {
            if (Array.isArray(N))
              return N;
            if (Symbol.iterator in Object(N))
              return _(N, m);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), w = function() {
          function _(N, m) {
            for (var v = 0; v < m.length; v++) {
              var g = m[v];
              g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(N, g.key, g);
            }
          }
          return function(N, m, v) {
            return m && _(N.prototype, m), v && _(N, v), N;
          };
        }(), O = d(0), p = r(O), y = d(21), c = r(y), o = d(11), t = r(o), e = d(8), u = r(e), l = d(10), a = r(l);
        function r(_) {
          return _ && _.__esModule ? _ : { default: _ };
        }
        function i(_) {
          if (Array.isArray(_)) {
            for (var N = 0, m = Array(_.length); N < _.length; N++)
              m[N] = _[N];
            return m;
          } else
            return Array.from(_);
        }
        function f(_, N) {
          if (!(_ instanceof N))
            throw new TypeError("Cannot call a class as a function");
        }
        var n = (0, a.default)("quill:selection"), s = function _(N) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          f(this, _), this.index = N, this.length = m;
        }, k = function() {
          function _(N, m) {
            var v = this;
            f(this, _), this.emitter = m, this.scroll = N, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = p.default.create("cursor", this), this.lastRange = this.savedRange = new s(0, 0), this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, function() {
              v.mouseDown || setTimeout(v.update.bind(v, u.default.sources.USER), 1);
            }), this.emitter.on(u.default.events.EDITOR_CHANGE, function(g, A) {
              g === u.default.events.TEXT_CHANGE && A.length() > 0 && v.update(u.default.sources.SILENT);
            }), this.emitter.on(u.default.events.SCROLL_BEFORE_UPDATE, function() {
              if (!!v.hasFocus()) {
                var g = v.getNativeRange();
                g != null && g.start.node !== v.cursor.textNode && v.emitter.once(u.default.events.SCROLL_UPDATE, function() {
                  try {
                    v.setNativeRange(g.start.node, g.start.offset, g.end.node, g.end.offset);
                  } catch {
                  }
                });
              }
            }), this.emitter.on(u.default.events.SCROLL_OPTIMIZE, function(g, A) {
              if (A.range) {
                var x = A.range, R = x.startNode, B = x.startOffset, C = x.endNode, Z = x.endOffset;
                v.setNativeRange(R, B, C, Z);
              }
            }), this.update(u.default.sources.SILENT);
          }
          return w(_, [{
            key: "handleComposition",
            value: function() {
              var m = this;
              this.root.addEventListener("compositionstart", function() {
                m.composing = !0;
              }), this.root.addEventListener("compositionend", function() {
                if (m.composing = !1, m.cursor.parent) {
                  var v = m.cursor.restore();
                  if (!v)
                    return;
                  setTimeout(function() {
                    m.setNativeRange(v.startNode, v.startOffset, v.endNode, v.endOffset);
                  }, 1);
                }
              });
            }
          }, {
            key: "handleDragging",
            value: function() {
              var m = this;
              this.emitter.listenDOM("mousedown", document.body, function() {
                m.mouseDown = !0;
              }), this.emitter.listenDOM("mouseup", document.body, function() {
                m.mouseDown = !1, m.update(u.default.sources.USER);
              });
            }
          }, {
            key: "focus",
            value: function() {
              this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange));
            }
          }, {
            key: "format",
            value: function(m, v) {
              if (!(this.scroll.whitelist != null && !this.scroll.whitelist[m])) {
                this.scroll.update();
                var g = this.getNativeRange();
                if (!(g == null || !g.native.collapsed || p.default.query(m, p.default.Scope.BLOCK))) {
                  if (g.start.node !== this.cursor.textNode) {
                    var A = p.default.find(g.start.node, !1);
                    if (A == null)
                      return;
                    if (A instanceof p.default.Leaf) {
                      var x = A.split(g.start.offset);
                      A.parent.insertBefore(this.cursor, x);
                    } else
                      A.insertBefore(this.cursor, g.start.node);
                    this.cursor.attach();
                  }
                  this.cursor.format(m, v), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
                }
              }
            }
          }, {
            key: "getBounds",
            value: function(m) {
              var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, g = this.scroll.length();
              m = Math.min(m, g - 1), v = Math.min(m + v, g - 1) - m;
              var A = void 0, x = this.scroll.leaf(m), R = T(x, 2), B = R[0], C = R[1];
              if (B == null)
                return null;
              var Z = B.position(C, !0), M = T(Z, 2);
              A = M[0], C = M[1];
              var j = document.createRange();
              if (v > 0) {
                j.setStart(A, C);
                var E = this.scroll.leaf(m + v), P = T(E, 2);
                if (B = P[0], C = P[1], B == null)
                  return null;
                var q = B.position(C, !0), F = T(q, 2);
                return A = F[0], C = F[1], j.setEnd(A, C), j.getBoundingClientRect();
              } else {
                var D = "left", S = void 0;
                return A instanceof Text ? (C < A.data.length ? (j.setStart(A, C), j.setEnd(A, C + 1)) : (j.setStart(A, C - 1), j.setEnd(A, C), D = "right"), S = j.getBoundingClientRect()) : (S = B.domNode.getBoundingClientRect(), C > 0 && (D = "right")), {
                  bottom: S.top + S.height,
                  height: S.height,
                  left: S[D],
                  right: S[D],
                  top: S.top,
                  width: 0
                };
              }
            }
          }, {
            key: "getNativeRange",
            value: function() {
              var m = document.getSelection();
              if (m == null || m.rangeCount <= 0)
                return null;
              var v = m.getRangeAt(0);
              if (v == null)
                return null;
              var g = this.normalizeNative(v);
              return n.info("getNativeRange", g), g;
            }
          }, {
            key: "getRange",
            value: function() {
              var m = this.getNativeRange();
              if (m == null)
                return [null, null];
              var v = this.normalizedToRange(m);
              return [v, m];
            }
          }, {
            key: "hasFocus",
            value: function() {
              return document.activeElement === this.root;
            }
          }, {
            key: "normalizedToRange",
            value: function(m) {
              var v = this, g = [[m.start.node, m.start.offset]];
              m.native.collapsed || g.push([m.end.node, m.end.offset]);
              var A = g.map(function(B) {
                var C = T(B, 2), Z = C[0], M = C[1], j = p.default.find(Z, !0), E = j.offset(v.scroll);
                return M === 0 ? E : j instanceof p.default.Container ? E + j.length() : E + j.index(Z, M);
              }), x = Math.min(Math.max.apply(Math, i(A)), this.scroll.length() - 1), R = Math.min.apply(Math, [x].concat(i(A)));
              return new s(R, x - R);
            }
          }, {
            key: "normalizeNative",
            value: function(m) {
              if (!b(this.root, m.startContainer) || !m.collapsed && !b(this.root, m.endContainer))
                return null;
              var v = {
                start: { node: m.startContainer, offset: m.startOffset },
                end: { node: m.endContainer, offset: m.endOffset },
                native: m
              };
              return [v.start, v.end].forEach(function(g) {
                for (var A = g.node, x = g.offset; !(A instanceof Text) && A.childNodes.length > 0; )
                  if (A.childNodes.length > x)
                    A = A.childNodes[x], x = 0;
                  else if (A.childNodes.length === x)
                    A = A.lastChild, x = A instanceof Text ? A.data.length : A.childNodes.length + 1;
                  else
                    break;
                g.node = A, g.offset = x;
              }), v;
            }
          }, {
            key: "rangeToNative",
            value: function(m) {
              var v = this, g = m.collapsed ? [m.index] : [m.index, m.index + m.length], A = [], x = this.scroll.length();
              return g.forEach(function(R, B) {
                R = Math.min(x - 1, R);
                var C = void 0, Z = v.scroll.leaf(R), M = T(Z, 2), j = M[0], E = M[1], P = j.position(E, B !== 0), q = T(P, 2);
                C = q[0], E = q[1], A.push(C, E);
              }), A.length < 2 && (A = A.concat(A)), A;
            }
          }, {
            key: "scrollIntoView",
            value: function(m) {
              var v = this.lastRange;
              if (v != null) {
                var g = this.getBounds(v.index, v.length);
                if (g != null) {
                  var A = this.scroll.length() - 1, x = this.scroll.line(Math.min(v.index, A)), R = T(x, 1), B = R[0], C = B;
                  if (v.length > 0) {
                    var Z = this.scroll.line(Math.min(v.index + v.length, A)), M = T(Z, 1);
                    C = M[0];
                  }
                  if (!(B == null || C == null)) {
                    var j = m.getBoundingClientRect();
                    g.top < j.top ? m.scrollTop -= j.top - g.top : g.bottom > j.bottom && (m.scrollTop += g.bottom - j.bottom);
                  }
                }
              }
            }
          }, {
            key: "setNativeRange",
            value: function(m, v) {
              var g = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : m, A = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : v, x = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
              if (n.info("setNativeRange", m, v, g, A), !(m != null && (this.root.parentNode == null || m.parentNode == null || g.parentNode == null))) {
                var R = document.getSelection();
                if (R != null)
                  if (m != null) {
                    this.hasFocus() || this.root.focus();
                    var B = (this.getNativeRange() || {}).native;
                    if (B == null || x || m !== B.startContainer || v !== B.startOffset || g !== B.endContainer || A !== B.endOffset) {
                      m.tagName == "BR" && (v = [].indexOf.call(m.parentNode.childNodes, m), m = m.parentNode), g.tagName == "BR" && (A = [].indexOf.call(g.parentNode.childNodes, g), g = g.parentNode);
                      var C = document.createRange();
                      C.setStart(m, v), C.setEnd(g, A), R.removeAllRanges(), R.addRange(C);
                    }
                  } else
                    R.removeAllRanges(), this.root.blur(), document.body.focus();
              }
            }
          }, {
            key: "setRange",
            value: function(m) {
              var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, g = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : u.default.sources.API;
              if (typeof v == "string" && (g = v, v = !1), n.info("setRange", m), m != null) {
                var A = this.rangeToNative(m);
                this.setNativeRange.apply(this, i(A).concat([v]));
              } else
                this.setNativeRange(null);
              this.update(g);
            }
          }, {
            key: "update",
            value: function() {
              var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : u.default.sources.USER, v = this.lastRange, g = this.getRange(), A = T(g, 2), x = A[0], R = A[1];
              if (this.lastRange = x, this.lastRange != null && (this.savedRange = this.lastRange), !(0, t.default)(v, this.lastRange)) {
                var B;
                !this.composing && R != null && R.native.collapsed && R.start.node !== this.cursor.textNode && this.cursor.restore();
                var C = [u.default.events.SELECTION_CHANGE, (0, c.default)(this.lastRange), (0, c.default)(v), m];
                if ((B = this.emitter).emit.apply(B, [u.default.events.EDITOR_CHANGE].concat(C)), m !== u.default.sources.SILENT) {
                  var Z;
                  (Z = this.emitter).emit.apply(Z, C);
                }
              }
            }
          }]), _;
        }();
        function b(_, N) {
          try {
            N.parentNode;
          } catch {
            return !1;
          }
          return N instanceof Text && (N = N.parentNode), _.contains(N);
        }
        h.Range = s, h.default = k;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function u(l, a) {
            for (var r = 0; r < a.length; r++) {
              var i = a[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, a, r) {
            return a && u(l.prototype, a), r && u(l, r), l;
          };
        }(), w = function u(l, a, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, a);
          if (i === void 0) {
            var f = Object.getPrototypeOf(l);
            return f === null ? void 0 : u(f, a, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, O = d(0), p = y(O);
        function y(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function c(u, l) {
          if (!(u instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(u, l) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : u;
        }
        function t(u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          u.prototype = Object.create(l && l.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(u, l) : u.__proto__ = l);
        }
        var e = function(u) {
          t(l, u);
          function l() {
            return c(this, l), o(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
          }
          return T(l, [{
            key: "insertInto",
            value: function(r, i) {
              r.children.length === 0 ? w(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "insertInto", this).call(this, r, i) : this.remove();
            }
          }, {
            key: "length",
            value: function() {
              return 0;
            }
          }, {
            key: "value",
            value: function() {
              return "";
            }
          }], [{
            key: "value",
            value: function() {
            }
          }]), l;
        }(p.default.Embed);
        e.blotName = "break", e.tagName = "BR", h.default = e;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
            t.__proto__ = e;
          } || function(t, e) {
            for (var u in e)
              e.hasOwnProperty(u) && (t[u] = e[u]);
          };
          return function(t, e) {
            o(t, e);
            function u() {
              this.constructor = t;
            }
            t.prototype = e === null ? Object.create(e) : (u.prototype = e.prototype, new u());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(44), O = d(30), p = d(1), y = function(o) {
          T(t, o);
          function t(e) {
            var u = o.call(this, e) || this;
            return u.build(), u;
          }
          return t.prototype.appendChild = function(e) {
            this.insertBefore(e);
          }, t.prototype.attach = function() {
            o.prototype.attach.call(this), this.children.forEach(function(e) {
              e.attach();
            });
          }, t.prototype.build = function() {
            var e = this;
            this.children = new w.default(), [].slice.call(this.domNode.childNodes).reverse().forEach(function(u) {
              try {
                var l = c(u);
                e.insertBefore(l, e.children.head || void 0);
              } catch (a) {
                if (a instanceof p.ParchmentError)
                  return;
                throw a;
              }
            });
          }, t.prototype.deleteAt = function(e, u) {
            if (e === 0 && u === this.length())
              return this.remove();
            this.children.forEachAt(e, u, function(l, a, r) {
              l.deleteAt(a, r);
            });
          }, t.prototype.descendant = function(e, u) {
            var l = this.children.find(u), a = l[0], r = l[1];
            return e.blotName == null && e(a) || e.blotName != null && a instanceof e ? [a, r] : a instanceof t ? a.descendant(e, r) : [null, -1];
          }, t.prototype.descendants = function(e, u, l) {
            u === void 0 && (u = 0), l === void 0 && (l = Number.MAX_VALUE);
            var a = [], r = l;
            return this.children.forEachAt(u, l, function(i, f, n) {
              (e.blotName == null && e(i) || e.blotName != null && i instanceof e) && a.push(i), i instanceof t && (a = a.concat(i.descendants(e, f, r))), r -= n;
            }), a;
          }, t.prototype.detach = function() {
            this.children.forEach(function(e) {
              e.detach();
            }), o.prototype.detach.call(this);
          }, t.prototype.formatAt = function(e, u, l, a) {
            this.children.forEachAt(e, u, function(r, i, f) {
              r.formatAt(i, f, l, a);
            });
          }, t.prototype.insertAt = function(e, u, l) {
            var a = this.children.find(e), r = a[0], i = a[1];
            if (r)
              r.insertAt(i, u, l);
            else {
              var f = l == null ? p.create("text", u) : p.create(u, l);
              this.appendChild(f);
            }
          }, t.prototype.insertBefore = function(e, u) {
            if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(l) {
              return e instanceof l;
            }))
              throw new p.ParchmentError("Cannot insert " + e.statics.blotName + " into " + this.statics.blotName);
            e.insertInto(this, u);
          }, t.prototype.length = function() {
            return this.children.reduce(function(e, u) {
              return e + u.length();
            }, 0);
          }, t.prototype.moveChildren = function(e, u) {
            this.children.forEach(function(l) {
              e.insertBefore(l, u);
            });
          }, t.prototype.optimize = function(e) {
            if (o.prototype.optimize.call(this, e), this.children.length === 0)
              if (this.statics.defaultChild != null) {
                var u = p.create(this.statics.defaultChild);
                this.appendChild(u), u.optimize(e);
              } else
                this.remove();
          }, t.prototype.path = function(e, u) {
            u === void 0 && (u = !1);
            var l = this.children.find(e, u), a = l[0], r = l[1], i = [[this, e]];
            return a instanceof t ? i.concat(a.path(r, u)) : (a != null && i.push([a, r]), i);
          }, t.prototype.removeChild = function(e) {
            this.children.remove(e);
          }, t.prototype.replace = function(e) {
            e instanceof t && e.moveChildren(this), o.prototype.replace.call(this, e);
          }, t.prototype.split = function(e, u) {
            if (u === void 0 && (u = !1), !u) {
              if (e === 0)
                return this;
              if (e === this.length())
                return this.next;
            }
            var l = this.clone();
            return this.parent.insertBefore(l, this.next), this.children.forEachAt(e, this.length(), function(a, r, i) {
              a = a.split(r, u), l.appendChild(a);
            }), l;
          }, t.prototype.unwrap = function() {
            this.moveChildren(this.parent, this.next), this.remove();
          }, t.prototype.update = function(e, u) {
            var l = this, a = [], r = [];
            e.forEach(function(i) {
              i.target === l.domNode && i.type === "childList" && (a.push.apply(a, i.addedNodes), r.push.apply(r, i.removedNodes));
            }), r.forEach(function(i) {
              if (!(i.parentNode != null && i.tagName !== "IFRAME" && document.body.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                var f = p.find(i);
                f != null && (f.domNode.parentNode == null || f.domNode.parentNode === l.domNode) && f.detach();
              }
            }), a.filter(function(i) {
              return i.parentNode == l.domNode;
            }).sort(function(i, f) {
              return i === f ? 0 : i.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
            }).forEach(function(i) {
              var f = null;
              i.nextSibling != null && (f = p.find(i.nextSibling));
              var n = c(i);
              (n.next != f || n.next == null) && (n.parent != null && n.parent.removeChild(l), l.insertBefore(n, f || void 0));
            });
          }, t;
        }(O.default);
        function c(o) {
          var t = p.find(o);
          if (t == null)
            try {
              t = p.create(o);
            } catch {
              t = p.create(p.Scope.INLINE), [].slice.call(o.childNodes).forEach(function(u) {
                t.domNode.appendChild(u);
              }), o.parentNode && o.parentNode.replaceChild(t.domNode, o), t.attach();
            }
          return t;
        }
        h.default = y;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
            t.__proto__ = e;
          } || function(t, e) {
            for (var u in e)
              e.hasOwnProperty(u) && (t[u] = e[u]);
          };
          return function(t, e) {
            o(t, e);
            function u() {
              this.constructor = t;
            }
            t.prototype = e === null ? Object.create(e) : (u.prototype = e.prototype, new u());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(12), O = d(31), p = d(17), y = d(1), c = function(o) {
          T(t, o);
          function t(e) {
            var u = o.call(this, e) || this;
            return u.attributes = new O.default(u.domNode), u;
          }
          return t.formats = function(e) {
            if (typeof this.tagName == "string")
              return !0;
            if (Array.isArray(this.tagName))
              return e.tagName.toLowerCase();
          }, t.prototype.format = function(e, u) {
            var l = y.query(e);
            l instanceof w.default ? this.attributes.attribute(l, u) : u && l != null && (e !== this.statics.blotName || this.formats()[e] !== u) && this.replaceWith(e, u);
          }, t.prototype.formats = function() {
            var e = this.attributes.values(), u = this.statics.formats(this.domNode);
            return u != null && (e[this.statics.blotName] = u), e;
          }, t.prototype.replaceWith = function(e, u) {
            var l = o.prototype.replaceWith.call(this, e, u);
            return this.attributes.copy(l), l;
          }, t.prototype.update = function(e, u) {
            var l = this;
            o.prototype.update.call(this, e, u), e.some(function(a) {
              return a.target === l.domNode && a.type === "attributes";
            }) && this.attributes.build();
          }, t.prototype.wrap = function(e, u) {
            var l = o.prototype.wrap.call(this, e, u);
            return l instanceof t && l.statics.scope === this.statics.scope && this.attributes.move(l), l;
          }, t;
        }(p.default);
        h.default = c;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(c, o) {
            c.__proto__ = o;
          } || function(c, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (c[t] = o[t]);
          };
          return function(c, o) {
            y(c, o);
            function t() {
              this.constructor = c;
            }
            c.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(30), O = d(1), p = function(y) {
          T(c, y);
          function c() {
            return y !== null && y.apply(this, arguments) || this;
          }
          return c.value = function(o) {
            return !0;
          }, c.prototype.index = function(o, t) {
            return this.domNode === o || this.domNode.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(t, 1) : -1;
          }, c.prototype.position = function(o, t) {
            var e = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
            return o > 0 && (e += 1), [this.parent.domNode, e];
          }, c.prototype.value = function() {
            var o;
            return o = {}, o[this.statics.blotName] = this.statics.value(this.domNode) || !0, o;
          }, c.scope = O.Scope.INLINE_BLOT, c;
        }(w.default);
        h.default = p;
      },
      function(L, h, d) {
        var T = d(11), w = d(3), O = {
          attributes: {
            compose: function(y, c, o) {
              typeof y != "object" && (y = {}), typeof c != "object" && (c = {});
              var t = w(!0, {}, c);
              o || (t = Object.keys(t).reduce(function(u, l) {
                return t[l] != null && (u[l] = t[l]), u;
              }, {}));
              for (var e in y)
                y[e] !== void 0 && c[e] === void 0 && (t[e] = y[e]);
              return Object.keys(t).length > 0 ? t : void 0;
            },
            diff: function(y, c) {
              typeof y != "object" && (y = {}), typeof c != "object" && (c = {});
              var o = Object.keys(y).concat(Object.keys(c)).reduce(function(t, e) {
                return T(y[e], c[e]) || (t[e] = c[e] === void 0 ? null : c[e]), t;
              }, {});
              return Object.keys(o).length > 0 ? o : void 0;
            },
            transform: function(y, c, o) {
              if (typeof y != "object")
                return c;
              if (typeof c == "object") {
                if (!o)
                  return c;
                var t = Object.keys(c).reduce(function(e, u) {
                  return y[u] === void 0 && (e[u] = c[u]), e;
                }, {});
                return Object.keys(t).length > 0 ? t : void 0;
              }
            }
          },
          iterator: function(y) {
            return new p(y);
          },
          length: function(y) {
            return typeof y.delete == "number" ? y.delete : typeof y.retain == "number" ? y.retain : typeof y.insert == "string" ? y.insert.length : 1;
          }
        };
        function p(y) {
          this.ops = y, this.index = 0, this.offset = 0;
        }
        p.prototype.hasNext = function() {
          return this.peekLength() < 1 / 0;
        }, p.prototype.next = function(y) {
          y || (y = 1 / 0);
          var c = this.ops[this.index];
          if (c) {
            var o = this.offset, t = O.length(c);
            if (y >= t - o ? (y = t - o, this.index += 1, this.offset = 0) : this.offset += y, typeof c.delete == "number")
              return { delete: y };
            var e = {};
            return c.attributes && (e.attributes = c.attributes), typeof c.retain == "number" ? e.retain = y : typeof c.insert == "string" ? e.insert = c.insert.substr(o, y) : e.insert = c.insert, e;
          } else
            return { retain: 1 / 0 };
        }, p.prototype.peek = function() {
          return this.ops[this.index];
        }, p.prototype.peekLength = function() {
          return this.ops[this.index] ? O.length(this.ops[this.index]) - this.offset : 1 / 0;
        }, p.prototype.peekType = function() {
          return this.ops[this.index] ? typeof this.ops[this.index].delete == "number" ? "delete" : typeof this.ops[this.index].retain == "number" ? "retain" : "insert" : "retain";
        }, p.prototype.rest = function() {
          if (this.hasNext()) {
            if (this.offset === 0)
              return this.ops.slice(this.index);
            var y = this.offset, c = this.index, o = this.next(), t = this.ops.slice(this.index);
            return this.offset = y, this.index = c, [o].concat(t);
          } else
            return [];
        }, L.exports = O;
      },
      function(L, h) {
        var d = function() {
          function T(l, a) {
            return a != null && l instanceof a;
          }
          var w;
          try {
            w = Map;
          } catch {
            w = function() {
            };
          }
          var O;
          try {
            O = Set;
          } catch {
            O = function() {
            };
          }
          var p;
          try {
            p = Promise;
          } catch {
            p = function() {
            };
          }
          function y(l, a, r, i, f) {
            typeof a == "object" && (r = a.depth, i = a.prototype, f = a.includeNonEnumerable, a = a.circular);
            var n = [], s = [], k = typeof Buffer < "u";
            typeof a > "u" && (a = !0), typeof r > "u" && (r = 1 / 0);
            function b(_, N) {
              if (_ === null)
                return null;
              if (N === 0)
                return _;
              var m, v;
              if (typeof _ != "object")
                return _;
              if (T(_, w))
                m = new w();
              else if (T(_, O))
                m = new O();
              else if (T(_, p))
                m = new p(function(j, E) {
                  _.then(function(P) {
                    j(b(P, N - 1));
                  }, function(P) {
                    E(b(P, N - 1));
                  });
                });
              else if (y.__isArray(_))
                m = [];
              else if (y.__isRegExp(_))
                m = new RegExp(_.source, u(_)), _.lastIndex && (m.lastIndex = _.lastIndex);
              else if (y.__isDate(_))
                m = new Date(_.getTime());
              else {
                if (k && Buffer.isBuffer(_))
                  return Buffer.allocUnsafe ? m = Buffer.allocUnsafe(_.length) : m = new Buffer(_.length), _.copy(m), m;
                T(_, Error) ? m = Object.create(_) : typeof i > "u" ? (v = Object.getPrototypeOf(_), m = Object.create(v)) : (m = Object.create(i), v = i);
              }
              if (a) {
                var g = n.indexOf(_);
                if (g != -1)
                  return s[g];
                n.push(_), s.push(m);
              }
              T(_, w) && _.forEach(function(j, E) {
                var P = b(E, N - 1), q = b(j, N - 1);
                m.set(P, q);
              }), T(_, O) && _.forEach(function(j) {
                var E = b(j, N - 1);
                m.add(E);
              });
              for (var A in _) {
                var x;
                v && (x = Object.getOwnPropertyDescriptor(v, A)), !(x && x.set == null) && (m[A] = b(_[A], N - 1));
              }
              if (Object.getOwnPropertySymbols)
                for (var R = Object.getOwnPropertySymbols(_), A = 0; A < R.length; A++) {
                  var B = R[A], C = Object.getOwnPropertyDescriptor(_, B);
                  C && !C.enumerable && !f || (m[B] = b(_[B], N - 1), C.enumerable || Object.defineProperty(m, B, {
                    enumerable: !1
                  }));
                }
              if (f)
                for (var Z = Object.getOwnPropertyNames(_), A = 0; A < Z.length; A++) {
                  var M = Z[A], C = Object.getOwnPropertyDescriptor(_, M);
                  C && C.enumerable || (m[M] = b(_[M], N - 1), Object.defineProperty(m, M, {
                    enumerable: !1
                  }));
                }
              return m;
            }
            return b(l, r);
          }
          y.clonePrototype = function(a) {
            if (a === null)
              return null;
            var r = function() {
            };
            return r.prototype = a, new r();
          };
          function c(l) {
            return Object.prototype.toString.call(l);
          }
          y.__objToStr = c;
          function o(l) {
            return typeof l == "object" && c(l) === "[object Date]";
          }
          y.__isDate = o;
          function t(l) {
            return typeof l == "object" && c(l) === "[object Array]";
          }
          y.__isArray = t;
          function e(l) {
            return typeof l == "object" && c(l) === "[object RegExp]";
          }
          y.__isRegExp = e;
          function u(l) {
            var a = "";
            return l.global && (a += "g"), l.ignoreCase && (a += "i"), l.multiline && (a += "m"), a;
          }
          return y.__getRegExpFlags = u, y;
        }();
        typeof L == "object" && L.exports && (L.exports = d);
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function m(v, g) {
            var A = [], x = !0, R = !1, B = void 0;
            try {
              for (var C = v[Symbol.iterator](), Z; !(x = (Z = C.next()).done) && (A.push(Z.value), !(g && A.length === g)); x = !0)
                ;
            } catch (M) {
              R = !0, B = M;
            } finally {
              try {
                !x && C.return && C.return();
              } finally {
                if (R)
                  throw B;
              }
            }
            return A;
          }
          return function(v, g) {
            if (Array.isArray(v))
              return v;
            if (Symbol.iterator in Object(v))
              return m(v, g);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), w = function() {
          function m(v, g) {
            for (var A = 0; A < g.length; A++) {
              var x = g[A];
              x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(v, x.key, x);
            }
          }
          return function(v, g, A) {
            return g && m(v.prototype, g), A && m(v, A), v;
          };
        }(), O = function m(v, g, A) {
          v === null && (v = Function.prototype);
          var x = Object.getOwnPropertyDescriptor(v, g);
          if (x === void 0) {
            var R = Object.getPrototypeOf(v);
            return R === null ? void 0 : m(R, g, A);
          } else {
            if ("value" in x)
              return x.value;
            var B = x.get;
            return B === void 0 ? void 0 : B.call(A);
          }
        }, p = d(0), y = n(p), c = d(8), o = n(c), t = d(4), e = n(t), u = d(16), l = n(u), a = d(13), r = n(a), i = d(25), f = n(i);
        function n(m) {
          return m && m.__esModule ? m : { default: m };
        }
        function s(m, v) {
          if (!(m instanceof v))
            throw new TypeError("Cannot call a class as a function");
        }
        function k(m, v) {
          if (!m)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return v && (typeof v == "object" || typeof v == "function") ? v : m;
        }
        function b(m, v) {
          if (typeof v != "function" && v !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof v);
          m.prototype = Object.create(v && v.prototype, { constructor: { value: m, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(m, v) : m.__proto__ = v);
        }
        function _(m) {
          return m instanceof e.default || m instanceof t.BlockEmbed;
        }
        var N = function(m) {
          b(v, m);
          function v(g, A) {
            s(this, v);
            var x = k(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this, g));
            return x.emitter = A.emitter, Array.isArray(A.whitelist) && (x.whitelist = A.whitelist.reduce(function(R, B) {
              return R[B] = !0, R;
            }, {})), x.domNode.addEventListener("DOMNodeInserted", function() {
            }), x.optimize(), x.enable(), x;
          }
          return w(v, [{
            key: "batchStart",
            value: function() {
              this.batch = !0;
            }
          }, {
            key: "batchEnd",
            value: function() {
              this.batch = !1, this.optimize();
            }
          }, {
            key: "deleteAt",
            value: function(A, x) {
              var R = this.line(A), B = T(R, 2), C = B[0], Z = B[1], M = this.line(A + x), j = T(M, 1), E = j[0];
              if (O(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "deleteAt", this).call(this, A, x), E != null && C !== E && Z > 0) {
                if (C instanceof t.BlockEmbed || E instanceof t.BlockEmbed) {
                  this.optimize();
                  return;
                }
                if (C instanceof r.default) {
                  var P = C.newlineIndex(C.length(), !0);
                  if (P > -1 && (C = C.split(P + 1), C === E)) {
                    this.optimize();
                    return;
                  }
                } else if (E instanceof r.default) {
                  var q = E.newlineIndex(0);
                  q > -1 && E.split(q + 1);
                }
                var F = E.children.head instanceof l.default ? null : E.children.head;
                C.moveChildren(E, F), C.remove();
              }
              this.optimize();
            }
          }, {
            key: "enable",
            value: function() {
              var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
              this.domNode.setAttribute("contenteditable", A);
            }
          }, {
            key: "formatAt",
            value: function(A, x, R, B) {
              this.whitelist != null && !this.whitelist[R] || (O(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "formatAt", this).call(this, A, x, R, B), this.optimize());
            }
          }, {
            key: "insertAt",
            value: function(A, x, R) {
              if (!(R != null && this.whitelist != null && !this.whitelist[x])) {
                if (A >= this.length())
                  if (R == null || y.default.query(x, y.default.Scope.BLOCK) == null) {
                    var B = y.default.create(this.statics.defaultChild);
                    this.appendChild(B), R == null && x.endsWith(`
`) && (x = x.slice(0, -1)), B.insertAt(0, x, R);
                  } else {
                    var C = y.default.create(x, R);
                    this.appendChild(C);
                  }
                else
                  O(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "insertAt", this).call(this, A, x, R);
                this.optimize();
              }
            }
          }, {
            key: "insertBefore",
            value: function(A, x) {
              if (A.statics.scope === y.default.Scope.INLINE_BLOT) {
                var R = y.default.create(this.statics.defaultChild);
                R.appendChild(A), A = R;
              }
              O(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "insertBefore", this).call(this, A, x);
            }
          }, {
            key: "leaf",
            value: function(A) {
              return this.path(A).pop() || [null, -1];
            }
          }, {
            key: "line",
            value: function(A) {
              return A === this.length() ? this.line(A - 1) : this.descendant(_, A);
            }
          }, {
            key: "lines",
            value: function() {
              var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE, R = function B(C, Z, M) {
                var j = [], E = M;
                return C.children.forEachAt(Z, M, function(P, q, F) {
                  _(P) ? j.push(P) : P instanceof y.default.Container && (j = j.concat(B(P, q, E))), E -= F;
                }), j;
              };
              return R(this, A, x);
            }
          }, {
            key: "optimize",
            value: function() {
              var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              this.batch !== !0 && (O(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "optimize", this).call(this, A, x), A.length > 0 && this.emitter.emit(o.default.events.SCROLL_OPTIMIZE, A, x));
            }
          }, {
            key: "path",
            value: function(A) {
              return O(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "path", this).call(this, A).slice(1);
            }
          }, {
            key: "update",
            value: function(A) {
              if (this.batch !== !0) {
                var x = o.default.sources.USER;
                typeof A == "string" && (x = A), Array.isArray(A) || (A = this.observer.takeRecords()), A.length > 0 && this.emitter.emit(o.default.events.SCROLL_BEFORE_UPDATE, x, A), O(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "update", this).call(this, A.concat([])), A.length > 0 && this.emitter.emit(o.default.events.SCROLL_UPDATE, x, A);
              }
            }
          }]), v;
        }(y.default.Scroll);
        N.blotName = "scroll", N.className = "ql-editor", N.tagName = "DIV", N.defaultChild = "block", N.allowedChildren = [e.default, t.BlockEmbed, f.default], h.default = N;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.SHORTKEY = h.default = void 0;
        var T = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(S) {
          return typeof S;
        } : function(S) {
          return S && typeof Symbol == "function" && S.constructor === Symbol && S !== Symbol.prototype ? "symbol" : typeof S;
        }, w = function() {
          function S(I, U) {
            var H = [], V = !0, Y = !1, Q = void 0;
            try {
              for (var J = I[Symbol.iterator](), rt; !(V = (rt = J.next()).done) && (H.push(rt.value), !(U && H.length === U)); V = !0)
                ;
            } catch (it) {
              Y = !0, Q = it;
            } finally {
              try {
                !V && J.return && J.return();
              } finally {
                if (Y)
                  throw Q;
              }
            }
            return H;
          }
          return function(I, U) {
            if (Array.isArray(I))
              return I;
            if (Symbol.iterator in Object(I))
              return S(I, U);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), O = function() {
          function S(I, U) {
            for (var H = 0; H < U.length; H++) {
              var V = U[H];
              V.enumerable = V.enumerable || !1, V.configurable = !0, "value" in V && (V.writable = !0), Object.defineProperty(I, V.key, V);
            }
          }
          return function(I, U, H) {
            return U && S(I.prototype, U), H && S(I, H), I;
          };
        }(), p = d(21), y = m(p), c = d(11), o = m(c), t = d(3), e = m(t), u = d(2), l = m(u), a = d(20), r = m(a), i = d(0), f = m(i), n = d(5), s = m(n), k = d(10), b = m(k), _ = d(9), N = m(_);
        function m(S) {
          return S && S.__esModule ? S : { default: S };
        }
        function v(S, I, U) {
          return I in S ? Object.defineProperty(S, I, { value: U, enumerable: !0, configurable: !0, writable: !0 }) : S[I] = U, S;
        }
        function g(S, I) {
          if (!(S instanceof I))
            throw new TypeError("Cannot call a class as a function");
        }
        function A(S, I) {
          if (!S)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return I && (typeof I == "object" || typeof I == "function") ? I : S;
        }
        function x(S, I) {
          if (typeof I != "function" && I !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof I);
          S.prototype = Object.create(I && I.prototype, { constructor: { value: S, enumerable: !1, writable: !0, configurable: !0 } }), I && (Object.setPrototypeOf ? Object.setPrototypeOf(S, I) : S.__proto__ = I);
        }
        var R = (0, b.default)("quill:keyboard"), B = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey", C = function(S) {
          x(I, S), O(I, null, [{
            key: "match",
            value: function(H, V) {
              return V = D(V), ["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function(Y) {
                return !!V[Y] !== H[Y] && V[Y] !== null;
              }) ? !1 : V.key === (H.which || H.keyCode);
            }
          }]);
          function I(U, H) {
            g(this, I);
            var V = A(this, (I.__proto__ || Object.getPrototypeOf(I)).call(this, U, H));
            return V.bindings = {}, Object.keys(V.options.bindings).forEach(function(Y) {
              Y === "list autofill" && U.scroll.whitelist != null && !U.scroll.whitelist.list || V.options.bindings[Y] && V.addBinding(V.options.bindings[Y]);
            }), V.addBinding({ key: I.keys.ENTER, shiftKey: null }, P), V.addBinding({ key: I.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function() {
            }), /Firefox/i.test(navigator.userAgent) ? (V.addBinding({ key: I.keys.BACKSPACE }, { collapsed: !0 }, M), V.addBinding({ key: I.keys.DELETE }, { collapsed: !0 }, j)) : (V.addBinding({ key: I.keys.BACKSPACE }, { collapsed: !0, prefix: /^.?$/ }, M), V.addBinding({ key: I.keys.DELETE }, { collapsed: !0, suffix: /^.?$/ }, j)), V.addBinding({ key: I.keys.BACKSPACE }, { collapsed: !1 }, E), V.addBinding({ key: I.keys.DELETE }, { collapsed: !1 }, E), V.addBinding({ key: I.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: !0, offset: 0 }, M), V.listen(), V;
          }
          return O(I, [{
            key: "addBinding",
            value: function(H) {
              var V = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, Y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, Q = D(H);
              if (Q == null || Q.key == null)
                return R.warn("Attempted to add invalid keyboard binding", Q);
              typeof V == "function" && (V = { handler: V }), typeof Y == "function" && (Y = { handler: Y }), Q = (0, e.default)(Q, V, Y), this.bindings[Q.key] = this.bindings[Q.key] || [], this.bindings[Q.key].push(Q);
            }
          }, {
            key: "listen",
            value: function() {
              var H = this;
              this.quill.root.addEventListener("keydown", function(V) {
                if (!V.defaultPrevented) {
                  var Y = V.which || V.keyCode, Q = (H.bindings[Y] || []).filter(function(at) {
                    return I.match(V, at);
                  });
                  if (Q.length !== 0) {
                    var J = H.quill.getSelection();
                    if (!(J == null || !H.quill.hasFocus())) {
                      var rt = H.quill.getLine(J.index), it = w(rt, 2), ft = it[0], ut = it[1], z = H.quill.getLeaf(J.index), K = w(z, 2), $ = K[0], G = K[1], W = J.length === 0 ? [$, G] : H.quill.getLeaf(J.index + J.length), tt = w(W, 2), et = tt[0], nt = tt[1], st = $ instanceof f.default.Text ? $.value().slice(0, G) : "", ht = et instanceof f.default.Text ? et.value().slice(nt) : "", lt = {
                        collapsed: J.length === 0,
                        empty: J.length === 0 && ft.length() <= 1,
                        format: H.quill.getFormat(J),
                        offset: ut,
                        prefix: st,
                        suffix: ht
                      }, Et = Q.some(function(at) {
                        if (at.collapsed != null && at.collapsed !== lt.collapsed || at.empty != null && at.empty !== lt.empty || at.offset != null && at.offset !== lt.offset)
                          return !1;
                        if (Array.isArray(at.format)) {
                          if (at.format.every(function(vt) {
                            return lt.format[vt] == null;
                          }))
                            return !1;
                        } else if (T(at.format) === "object" && !Object.keys(at.format).every(function(vt) {
                          return at.format[vt] === !0 ? lt.format[vt] != null : at.format[vt] === !1 ? lt.format[vt] == null : (0, o.default)(at.format[vt], lt.format[vt]);
                        }))
                          return !1;
                        return at.prefix != null && !at.prefix.test(lt.prefix) || at.suffix != null && !at.suffix.test(lt.suffix) ? !1 : at.handler.call(H, J, lt) !== !0;
                      });
                      Et && V.preventDefault();
                    }
                  }
                }
              });
            }
          }]), I;
        }(N.default);
        C.keys = {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          ESCAPE: 27,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          DELETE: 46
        }, C.DEFAULTS = {
          bindings: {
            bold: F("bold"),
            italic: F("italic"),
            underline: F("underline"),
            indent: {
              key: C.keys.TAB,
              format: ["blockquote", "indent", "list"],
              handler: function(I, U) {
                if (U.collapsed && U.offset !== 0)
                  return !0;
                this.quill.format("indent", "+1", s.default.sources.USER);
              }
            },
            outdent: {
              key: C.keys.TAB,
              shiftKey: !0,
              format: ["blockquote", "indent", "list"],
              handler: function(I, U) {
                if (U.collapsed && U.offset !== 0)
                  return !0;
                this.quill.format("indent", "-1", s.default.sources.USER);
              }
            },
            "outdent backspace": {
              key: C.keys.BACKSPACE,
              collapsed: !0,
              shiftKey: null,
              metaKey: null,
              ctrlKey: null,
              altKey: null,
              format: ["indent", "list"],
              offset: 0,
              handler: function(I, U) {
                U.format.indent != null ? this.quill.format("indent", "-1", s.default.sources.USER) : U.format.list != null && this.quill.format("list", !1, s.default.sources.USER);
              }
            },
            "indent code-block": q(!0),
            "outdent code-block": q(!1),
            "remove tab": {
              key: C.keys.TAB,
              shiftKey: !0,
              collapsed: !0,
              prefix: /\t$/,
              handler: function(I) {
                this.quill.deleteText(I.index - 1, 1, s.default.sources.USER);
              }
            },
            tab: {
              key: C.keys.TAB,
              handler: function(I) {
                this.quill.history.cutoff();
                var U = new l.default().retain(I.index).delete(I.length).insert("	");
                this.quill.updateContents(U, s.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(I.index + 1, s.default.sources.SILENT);
              }
            },
            "list empty enter": {
              key: C.keys.ENTER,
              collapsed: !0,
              format: ["list"],
              empty: !0,
              handler: function(I, U) {
                this.quill.format("list", !1, s.default.sources.USER), U.format.indent && this.quill.format("indent", !1, s.default.sources.USER);
              }
            },
            "checklist enter": {
              key: C.keys.ENTER,
              collapsed: !0,
              format: { list: "checked" },
              handler: function(I) {
                var U = this.quill.getLine(I.index), H = w(U, 2), V = H[0], Y = H[1], Q = (0, e.default)({}, V.formats(), { list: "checked" }), J = new l.default().retain(I.index).insert(`
`, Q).retain(V.length() - Y - 1).retain(1, { list: "unchecked" });
                this.quill.updateContents(J, s.default.sources.USER), this.quill.setSelection(I.index + 1, s.default.sources.SILENT), this.quill.scrollIntoView();
              }
            },
            "header enter": {
              key: C.keys.ENTER,
              collapsed: !0,
              format: ["header"],
              suffix: /^$/,
              handler: function(I, U) {
                var H = this.quill.getLine(I.index), V = w(H, 2), Y = V[0], Q = V[1], J = new l.default().retain(I.index).insert(`
`, U.format).retain(Y.length() - Q - 1).retain(1, { header: null });
                this.quill.updateContents(J, s.default.sources.USER), this.quill.setSelection(I.index + 1, s.default.sources.SILENT), this.quill.scrollIntoView();
              }
            },
            "list autofill": {
              key: " ",
              collapsed: !0,
              format: { list: !1 },
              prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
              handler: function(I, U) {
                var H = U.prefix.length, V = this.quill.getLine(I.index), Y = w(V, 2), Q = Y[0], J = Y[1];
                if (J > H)
                  return !0;
                var rt = void 0;
                switch (U.prefix.trim()) {
                  case "[]":
                  case "[ ]":
                    rt = "unchecked";
                    break;
                  case "[x]":
                    rt = "checked";
                    break;
                  case "-":
                  case "*":
                    rt = "bullet";
                    break;
                  default:
                    rt = "ordered";
                }
                this.quill.insertText(I.index, " ", s.default.sources.USER), this.quill.history.cutoff();
                var it = new l.default().retain(I.index - J).delete(H + 1).retain(Q.length() - 2 - J).retain(1, { list: rt });
                this.quill.updateContents(it, s.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(I.index - H, s.default.sources.SILENT);
              }
            },
            "code exit": {
              key: C.keys.ENTER,
              collapsed: !0,
              format: ["code-block"],
              prefix: /\n\n$/,
              suffix: /^\s+$/,
              handler: function(I) {
                var U = this.quill.getLine(I.index), H = w(U, 2), V = H[0], Y = H[1], Q = new l.default().retain(I.index + V.length() - Y - 2).retain(1, { "code-block": null }).delete(1);
                this.quill.updateContents(Q, s.default.sources.USER);
              }
            },
            "embed left": Z(C.keys.LEFT, !1),
            "embed left shift": Z(C.keys.LEFT, !0),
            "embed right": Z(C.keys.RIGHT, !1),
            "embed right shift": Z(C.keys.RIGHT, !0)
          }
        };
        function Z(S, I) {
          var U, H = S === C.keys.LEFT ? "prefix" : "suffix";
          return U = {
            key: S,
            shiftKey: I,
            altKey: null
          }, v(U, H, /^$/), v(U, "handler", function(Y) {
            var Q = Y.index;
            S === C.keys.RIGHT && (Q += Y.length + 1);
            var J = this.quill.getLeaf(Q), rt = w(J, 1), it = rt[0];
            return it instanceof f.default.Embed ? (S === C.keys.LEFT ? I ? this.quill.setSelection(Y.index - 1, Y.length + 1, s.default.sources.USER) : this.quill.setSelection(Y.index - 1, s.default.sources.USER) : I ? this.quill.setSelection(Y.index, Y.length + 1, s.default.sources.USER) : this.quill.setSelection(Y.index + Y.length + 1, s.default.sources.USER), !1) : !0;
          }), U;
        }
        function M(S, I) {
          if (!(S.index === 0 || this.quill.getLength() <= 1)) {
            var U = this.quill.getLine(S.index), H = w(U, 1), V = H[0], Y = {};
            if (I.offset === 0) {
              var Q = this.quill.getLine(S.index - 1), J = w(Q, 1), rt = J[0];
              if (rt != null && rt.length() > 1) {
                var it = V.formats(), ft = this.quill.getFormat(S.index - 1, 1);
                Y = r.default.attributes.diff(it, ft) || {};
              }
            }
            var ut = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(I.prefix) ? 2 : 1;
            this.quill.deleteText(S.index - ut, ut, s.default.sources.USER), Object.keys(Y).length > 0 && this.quill.formatLine(S.index - ut, ut, Y, s.default.sources.USER), this.quill.focus();
          }
        }
        function j(S, I) {
          var U = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(I.suffix) ? 2 : 1;
          if (!(S.index >= this.quill.getLength() - U)) {
            var H = {}, V = 0, Y = this.quill.getLine(S.index), Q = w(Y, 1), J = Q[0];
            if (I.offset >= J.length() - 1) {
              var rt = this.quill.getLine(S.index + 1), it = w(rt, 1), ft = it[0];
              if (ft) {
                var ut = J.formats(), z = this.quill.getFormat(S.index, 1);
                H = r.default.attributes.diff(ut, z) || {}, V = ft.length();
              }
            }
            this.quill.deleteText(S.index, U, s.default.sources.USER), Object.keys(H).length > 0 && this.quill.formatLine(S.index + V - 1, U, H, s.default.sources.USER);
          }
        }
        function E(S) {
          var I = this.quill.getLines(S), U = {};
          if (I.length > 1) {
            var H = I[0].formats(), V = I[I.length - 1].formats();
            U = r.default.attributes.diff(V, H) || {};
          }
          this.quill.deleteText(S, s.default.sources.USER), Object.keys(U).length > 0 && this.quill.formatLine(S.index, 1, U, s.default.sources.USER), this.quill.setSelection(S.index, s.default.sources.SILENT), this.quill.focus();
        }
        function P(S, I) {
          var U = this;
          S.length > 0 && this.quill.scroll.deleteAt(S.index, S.length);
          var H = Object.keys(I.format).reduce(function(V, Y) {
            return f.default.query(Y, f.default.Scope.BLOCK) && !Array.isArray(I.format[Y]) && (V[Y] = I.format[Y]), V;
          }, {});
          this.quill.insertText(S.index, `
`, H, s.default.sources.USER), this.quill.setSelection(S.index + 1, s.default.sources.SILENT), this.quill.focus(), Object.keys(I.format).forEach(function(V) {
            H[V] == null && (Array.isArray(I.format[V]) || V !== "link" && U.quill.format(V, I.format[V], s.default.sources.USER));
          });
        }
        function q(S) {
          return {
            key: C.keys.TAB,
            shiftKey: !S,
            format: { "code-block": !0 },
            handler: function(U) {
              var H = f.default.query("code-block"), V = U.index, Y = U.length, Q = this.quill.scroll.descendant(H, V), J = w(Q, 2), rt = J[0], it = J[1];
              if (rt != null) {
                var ft = this.quill.getIndex(rt), ut = rt.newlineIndex(it, !0) + 1, z = rt.newlineIndex(ft + it + Y), K = rt.domNode.textContent.slice(ut, z).split(`
`);
                it = 0, K.forEach(function($, G) {
                  S ? (rt.insertAt(ut + it, H.TAB), it += H.TAB.length, G === 0 ? V += H.TAB.length : Y += H.TAB.length) : $.startsWith(H.TAB) && (rt.deleteAt(ut + it, H.TAB.length), it -= H.TAB.length, G === 0 ? V -= H.TAB.length : Y -= H.TAB.length), it += $.length + 1;
                }), this.quill.update(s.default.sources.USER), this.quill.setSelection(V, Y, s.default.sources.SILENT);
              }
            }
          };
        }
        function F(S) {
          return {
            key: S[0].toUpperCase(),
            shortKey: !0,
            handler: function(U, H) {
              this.quill.format(S, !H.format[S], s.default.sources.USER);
            }
          };
        }
        function D(S) {
          if (typeof S == "string" || typeof S == "number")
            return D({ key: S });
          if ((typeof S > "u" ? "undefined" : T(S)) === "object" && (S = (0, y.default)(S, !1)), typeof S.key == "string")
            if (C.keys[S.key.toUpperCase()] != null)
              S.key = C.keys[S.key.toUpperCase()];
            else if (S.key.length === 1)
              S.key = S.key.toUpperCase().charCodeAt(0);
            else
              return null;
          return S.shortKey && (S[B] = S.shortKey, delete S.shortKey), S;
        }
        h.default = C, h.SHORTKEY = B;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function r(i, f) {
            var n = [], s = !0, k = !1, b = void 0;
            try {
              for (var _ = i[Symbol.iterator](), N; !(s = (N = _.next()).done) && (n.push(N.value), !(f && n.length === f)); s = !0)
                ;
            } catch (m) {
              k = !0, b = m;
            } finally {
              try {
                !s && _.return && _.return();
              } finally {
                if (k)
                  throw b;
              }
            }
            return n;
          }
          return function(i, f) {
            if (Array.isArray(i))
              return i;
            if (Symbol.iterator in Object(i))
              return r(i, f);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), w = function r(i, f, n) {
          i === null && (i = Function.prototype);
          var s = Object.getOwnPropertyDescriptor(i, f);
          if (s === void 0) {
            var k = Object.getPrototypeOf(i);
            return k === null ? void 0 : r(k, f, n);
          } else {
            if ("value" in s)
              return s.value;
            var b = s.get;
            return b === void 0 ? void 0 : b.call(n);
          }
        }, O = function() {
          function r(i, f) {
            for (var n = 0; n < f.length; n++) {
              var s = f[n];
              s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(i, s.key, s);
            }
          }
          return function(i, f, n) {
            return f && r(i.prototype, f), n && r(i, n), i;
          };
        }(), p = d(0), y = t(p), c = d(7), o = t(c);
        function t(r) {
          return r && r.__esModule ? r : { default: r };
        }
        function e(r, i) {
          if (!(r instanceof i))
            throw new TypeError("Cannot call a class as a function");
        }
        function u(r, i) {
          if (!r)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return i && (typeof i == "object" || typeof i == "function") ? i : r;
        }
        function l(r, i) {
          if (typeof i != "function" && i !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof i);
          r.prototype = Object.create(i && i.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(r, i) : r.__proto__ = i);
        }
        var a = function(r) {
          l(i, r), O(i, null, [{
            key: "value",
            value: function() {
            }
          }]);
          function i(f, n) {
            e(this, i);
            var s = u(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, f));
            return s.selection = n, s.textNode = document.createTextNode(i.CONTENTS), s.domNode.appendChild(s.textNode), s._length = 0, s;
          }
          return O(i, [{
            key: "detach",
            value: function() {
              this.parent != null && this.parent.removeChild(this);
            }
          }, {
            key: "format",
            value: function(n, s) {
              if (this._length !== 0)
                return w(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "format", this).call(this, n, s);
              for (var k = this, b = 0; k != null && k.statics.scope !== y.default.Scope.BLOCK_BLOT; )
                b += k.offset(k.parent), k = k.parent;
              k != null && (this._length = i.CONTENTS.length, k.optimize(), k.formatAt(b, i.CONTENTS.length, n, s), this._length = 0);
            }
          }, {
            key: "index",
            value: function(n, s) {
              return n === this.textNode ? 0 : w(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "index", this).call(this, n, s);
            }
          }, {
            key: "length",
            value: function() {
              return this._length;
            }
          }, {
            key: "position",
            value: function() {
              return [this.textNode, this.textNode.data.length];
            }
          }, {
            key: "remove",
            value: function() {
              w(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "remove", this).call(this), this.parent = null;
            }
          }, {
            key: "restore",
            value: function() {
              if (!(this.selection.composing || this.parent == null)) {
                var n = this.textNode, s = this.selection.getNativeRange(), k = void 0, b = void 0, _ = void 0;
                if (s != null && s.start.node === n && s.end.node === n) {
                  var N = [n, s.start.offset, s.end.offset];
                  k = N[0], b = N[1], _ = N[2];
                }
                for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
                  this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                if (this.textNode.data !== i.CONTENTS) {
                  var m = this.textNode.data.split(i.CONTENTS).join("");
                  this.next instanceof o.default ? (k = this.next.domNode, this.next.insertAt(0, m), this.textNode.data = i.CONTENTS) : (this.textNode.data = m, this.parent.insertBefore(y.default.create(this.textNode), this), this.textNode = document.createTextNode(i.CONTENTS), this.domNode.appendChild(this.textNode));
                }
                if (this.remove(), b != null) {
                  var v = [b, _].map(function(A) {
                    return Math.max(0, Math.min(k.data.length, A - 1));
                  }), g = T(v, 2);
                  return b = g[0], _ = g[1], {
                    startNode: k,
                    startOffset: b,
                    endNode: k,
                    endOffset: _
                  };
                }
              }
            }
          }, {
            key: "update",
            value: function(n, s) {
              var k = this;
              if (n.some(function(_) {
                return _.type === "characterData" && _.target === k.textNode;
              })) {
                var b = this.restore();
                b && (s.range = b);
              }
            }
          }, {
            key: "value",
            value: function() {
              return "";
            }
          }]), i;
        }(y.default.Embed);
        a.blotName = "cursor", a.className = "ql-cursor", a.tagName = "span", a.CONTENTS = "\uFEFF", h.default = a;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = d(0), w = y(T), O = d(4), p = y(O);
        function y(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function c(u, l) {
          if (!(u instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(u, l) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : u;
        }
        function t(u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          u.prototype = Object.create(l && l.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(u, l) : u.__proto__ = l);
        }
        var e = function(u) {
          t(l, u);
          function l() {
            return c(this, l), o(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
          }
          return l;
        }(w.default.Container);
        e.allowedChildren = [p.default, O.BlockEmbed, e], h.default = e;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.ColorStyle = h.ColorClass = h.ColorAttributor = void 0;
        var T = function() {
          function a(r, i) {
            for (var f = 0; f < i.length; f++) {
              var n = i[f];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, f) {
            return i && a(r.prototype, i), f && a(r, f), r;
          };
        }(), w = function a(r, i, f) {
          r === null && (r = Function.prototype);
          var n = Object.getOwnPropertyDescriptor(r, i);
          if (n === void 0) {
            var s = Object.getPrototypeOf(r);
            return s === null ? void 0 : a(s, i, f);
          } else {
            if ("value" in n)
              return n.value;
            var k = n.get;
            return k === void 0 ? void 0 : k.call(f);
          }
        }, O = d(0), p = y(O);
        function y(a) {
          return a && a.__esModule ? a : { default: a };
        }
        function c(a, r) {
          if (!(a instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(a, r) {
          if (!a)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r && (typeof r == "object" || typeof r == "function") ? r : a;
        }
        function t(a, r) {
          if (typeof r != "function" && r !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof r);
          a.prototype = Object.create(r && r.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(a, r) : a.__proto__ = r);
        }
        var e = function(a) {
          t(r, a);
          function r() {
            return c(this, r), o(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
          }
          return T(r, [{
            key: "value",
            value: function(f) {
              var n = w(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "value", this).call(this, f);
              return n.startsWith("rgb(") ? (n = n.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), "#" + n.split(",").map(function(s) {
                return ("00" + parseInt(s).toString(16)).slice(-2);
              }).join("")) : n;
            }
          }]), r;
        }(p.default.Attributor.Style), u = new p.default.Attributor.Class("color", "ql-color", {
          scope: p.default.Scope.INLINE
        }), l = new e("color", "color", {
          scope: p.default.Scope.INLINE
        });
        h.ColorAttributor = e, h.ColorClass = u, h.ColorStyle = l;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.sanitize = h.default = void 0;
        var T = function() {
          function l(a, r) {
            for (var i = 0; i < r.length; i++) {
              var f = r[i];
              f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(a, f.key, f);
            }
          }
          return function(a, r, i) {
            return r && l(a.prototype, r), i && l(a, i), a;
          };
        }(), w = function l(a, r, i) {
          a === null && (a = Function.prototype);
          var f = Object.getOwnPropertyDescriptor(a, r);
          if (f === void 0) {
            var n = Object.getPrototypeOf(a);
            return n === null ? void 0 : l(n, r, i);
          } else {
            if ("value" in f)
              return f.value;
            var s = f.get;
            return s === void 0 ? void 0 : s.call(i);
          }
        }, O = d(6), p = y(O);
        function y(l) {
          return l && l.__esModule ? l : { default: l };
        }
        function c(l, a) {
          if (!(l instanceof a))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(l, a) {
          if (!l)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return a && (typeof a == "object" || typeof a == "function") ? a : l;
        }
        function t(l, a) {
          if (typeof a != "function" && a !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof a);
          l.prototype = Object.create(a && a.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(l, a) : l.__proto__ = a);
        }
        var e = function(l) {
          t(a, l);
          function a() {
            return c(this, a), o(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
          }
          return T(a, [{
            key: "format",
            value: function(i, f) {
              if (i !== this.statics.blotName || !f)
                return w(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "format", this).call(this, i, f);
              f = this.constructor.sanitize(f), this.domNode.setAttribute("href", f);
            }
          }], [{
            key: "create",
            value: function(i) {
              var f = w(a.__proto__ || Object.getPrototypeOf(a), "create", this).call(this, i);
              return i = this.sanitize(i), f.setAttribute("href", i), f.setAttribute("rel", "noopener noreferrer"), f.setAttribute("target", "_blank"), f;
            }
          }, {
            key: "formats",
            value: function(i) {
              return i.getAttribute("href");
            }
          }, {
            key: "sanitize",
            value: function(i) {
              return u(i, this.PROTOCOL_WHITELIST) ? i : this.SANITIZED_URL;
            }
          }]), a;
        }(p.default);
        e.blotName = "link", e.tagName = "A", e.SANITIZED_URL = "about:blank", e.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];
        function u(l, a) {
          var r = document.createElement("a");
          r.href = l;
          var i = r.href.slice(0, r.href.indexOf(":"));
          return a.indexOf(i) > -1;
        }
        h.default = e, h.sanitize = u;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
          return typeof a;
        } : function(a) {
          return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
        }, w = function() {
          function a(r, i) {
            for (var f = 0; f < i.length; f++) {
              var n = i[f];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, f) {
            return i && a(r.prototype, i), f && a(r, f), r;
          };
        }(), O = d(23), p = o(O), y = d(107), c = o(y);
        function o(a) {
          return a && a.__esModule ? a : { default: a };
        }
        function t(a, r) {
          if (!(a instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        var e = 0;
        function u(a, r) {
          a.setAttribute(r, a.getAttribute(r) !== "true");
        }
        var l = function() {
          function a(r) {
            var i = this;
            t(this, a), this.select = r, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", function() {
              i.togglePicker();
            }), this.label.addEventListener("keydown", function(f) {
              switch (f.keyCode) {
                case p.default.keys.ENTER:
                  i.togglePicker();
                  break;
                case p.default.keys.ESCAPE:
                  i.escape(), f.preventDefault();
                  break;
              }
            }), this.select.addEventListener("change", this.update.bind(this));
          }
          return w(a, [{
            key: "togglePicker",
            value: function() {
              this.container.classList.toggle("ql-expanded"), u(this.label, "aria-expanded"), u(this.options, "aria-hidden");
            }
          }, {
            key: "buildItem",
            value: function(i) {
              var f = this, n = document.createElement("span");
              return n.tabIndex = "0", n.setAttribute("role", "button"), n.classList.add("ql-picker-item"), i.hasAttribute("value") && n.setAttribute("data-value", i.getAttribute("value")), i.textContent && n.setAttribute("data-label", i.textContent), n.addEventListener("click", function() {
                f.selectItem(n, !0);
              }), n.addEventListener("keydown", function(s) {
                switch (s.keyCode) {
                  case p.default.keys.ENTER:
                    f.selectItem(n, !0), s.preventDefault();
                    break;
                  case p.default.keys.ESCAPE:
                    f.escape(), s.preventDefault();
                    break;
                }
              }), n;
            }
          }, {
            key: "buildLabel",
            value: function() {
              var i = document.createElement("span");
              return i.classList.add("ql-picker-label"), i.innerHTML = c.default, i.tabIndex = "0", i.setAttribute("role", "button"), i.setAttribute("aria-expanded", "false"), this.container.appendChild(i), i;
            }
          }, {
            key: "buildOptions",
            value: function() {
              var i = this, f = document.createElement("span");
              f.classList.add("ql-picker-options"), f.setAttribute("aria-hidden", "true"), f.tabIndex = "-1", f.id = "ql-picker-options-" + e, e += 1, this.label.setAttribute("aria-controls", f.id), this.options = f, [].slice.call(this.select.options).forEach(function(n) {
                var s = i.buildItem(n);
                f.appendChild(s), n.selected === !0 && i.selectItem(s);
              }), this.container.appendChild(f);
            }
          }, {
            key: "buildPicker",
            value: function() {
              var i = this;
              [].slice.call(this.select.attributes).forEach(function(f) {
                i.container.setAttribute(f.name, f.value);
              }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
            }
          }, {
            key: "escape",
            value: function() {
              var i = this;
              this.close(), setTimeout(function() {
                return i.label.focus();
              }, 1);
            }
          }, {
            key: "close",
            value: function() {
              this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
            }
          }, {
            key: "selectItem",
            value: function(i) {
              var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = this.container.querySelector(".ql-selected");
              if (i !== n && (n != null && n.classList.remove("ql-selected"), i != null && (i.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(i.parentNode.children, i), i.hasAttribute("data-value") ? this.label.setAttribute("data-value", i.getAttribute("data-value")) : this.label.removeAttribute("data-value"), i.hasAttribute("data-label") ? this.label.setAttribute("data-label", i.getAttribute("data-label")) : this.label.removeAttribute("data-label"), f))) {
                if (typeof Event == "function")
                  this.select.dispatchEvent(new Event("change"));
                else if ((typeof Event > "u" ? "undefined" : T(Event)) === "object") {
                  var s = document.createEvent("Event");
                  s.initEvent("change", !0, !0), this.select.dispatchEvent(s);
                }
                this.close();
              }
            }
          }, {
            key: "update",
            value: function() {
              var i = void 0;
              if (this.select.selectedIndex > -1) {
                var f = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                i = this.select.options[this.select.selectedIndex], this.selectItem(f);
              } else
                this.selectItem(null);
              var n = i != null && i !== this.select.querySelector("option[selected]");
              this.label.classList.toggle("ql-active", n);
            }
          }]), a;
        }();
        h.default = l;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = d(0), w = R(T), O = d(5), p = R(O), y = d(4), c = R(y), o = d(16), t = R(o), e = d(25), u = R(e), l = d(24), a = R(l), r = d(35), i = R(r), f = d(6), n = R(f), s = d(22), k = R(s), b = d(7), _ = R(b), N = d(55), m = R(N), v = d(42), g = R(v), A = d(23), x = R(A);
        function R(B) {
          return B && B.__esModule ? B : { default: B };
        }
        p.default.register({
          "blots/block": c.default,
          "blots/block/embed": y.BlockEmbed,
          "blots/break": t.default,
          "blots/container": u.default,
          "blots/cursor": a.default,
          "blots/embed": i.default,
          "blots/inline": n.default,
          "blots/scroll": k.default,
          "blots/text": _.default,
          "modules/clipboard": m.default,
          "modules/history": g.default,
          "modules/keyboard": x.default
        }), w.default.register(c.default, t.default, a.default, n.default, k.default, _.default), h.default = p.default;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", { value: !0 });
        var T = d(1), w = function() {
          function O(p) {
            this.domNode = p, this.domNode[T.DATA_KEY] = { blot: this };
          }
          return Object.defineProperty(O.prototype, "statics", {
            get: function() {
              return this.constructor;
            },
            enumerable: !0,
            configurable: !0
          }), O.create = function(p) {
            if (this.tagName == null)
              throw new T.ParchmentError("Blot definition missing tagName");
            var y;
            return Array.isArray(this.tagName) ? (typeof p == "string" && (p = p.toUpperCase(), parseInt(p).toString() === p && (p = parseInt(p))), typeof p == "number" ? y = document.createElement(this.tagName[p - 1]) : this.tagName.indexOf(p) > -1 ? y = document.createElement(p) : y = document.createElement(this.tagName[0])) : y = document.createElement(this.tagName), this.className && y.classList.add(this.className), y;
          }, O.prototype.attach = function() {
            this.parent != null && (this.scroll = this.parent.scroll);
          }, O.prototype.clone = function() {
            var p = this.domNode.cloneNode(!1);
            return T.create(p);
          }, O.prototype.detach = function() {
            this.parent != null && this.parent.removeChild(this), delete this.domNode[T.DATA_KEY];
          }, O.prototype.deleteAt = function(p, y) {
            var c = this.isolate(p, y);
            c.remove();
          }, O.prototype.formatAt = function(p, y, c, o) {
            var t = this.isolate(p, y);
            if (T.query(c, T.Scope.BLOT) != null && o)
              t.wrap(c, o);
            else if (T.query(c, T.Scope.ATTRIBUTE) != null) {
              var e = T.create(this.statics.scope);
              t.wrap(e), e.format(c, o);
            }
          }, O.prototype.insertAt = function(p, y, c) {
            var o = c == null ? T.create("text", y) : T.create(y, c), t = this.split(p);
            this.parent.insertBefore(o, t);
          }, O.prototype.insertInto = function(p, y) {
            y === void 0 && (y = null), this.parent != null && this.parent.children.remove(this);
            var c = null;
            p.children.insertBefore(this, y), y != null && (c = y.domNode), (this.domNode.parentNode != p.domNode || this.domNode.nextSibling != c) && p.domNode.insertBefore(this.domNode, c), this.parent = p, this.attach();
          }, O.prototype.isolate = function(p, y) {
            var c = this.split(p);
            return c.split(y), c;
          }, O.prototype.length = function() {
            return 1;
          }, O.prototype.offset = function(p) {
            return p === void 0 && (p = this.parent), this.parent == null || this == p ? 0 : this.parent.children.offset(this) + this.parent.offset(p);
          }, O.prototype.optimize = function(p) {
            this.domNode[T.DATA_KEY] != null && delete this.domNode[T.DATA_KEY].mutations;
          }, O.prototype.remove = function() {
            this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
          }, O.prototype.replace = function(p) {
            p.parent != null && (p.parent.insertBefore(this, p.next), p.remove());
          }, O.prototype.replaceWith = function(p, y) {
            var c = typeof p == "string" ? T.create(p, y) : p;
            return c.replace(this), c;
          }, O.prototype.split = function(p, y) {
            return p === 0 ? this : this.next;
          }, O.prototype.update = function(p, y) {
          }, O.prototype.wrap = function(p, y) {
            var c = typeof p == "string" ? T.create(p, y) : p;
            return this.parent != null && this.parent.insertBefore(c, this.next), c.appendChild(this), c;
          }, O.blotName = "abstract", O;
        }();
        h.default = w;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", { value: !0 });
        var T = d(12), w = d(32), O = d(33), p = d(1), y = function() {
          function c(o) {
            this.attributes = {}, this.domNode = o, this.build();
          }
          return c.prototype.attribute = function(o, t) {
            t ? o.add(this.domNode, t) && (o.value(this.domNode) != null ? this.attributes[o.attrName] = o : delete this.attributes[o.attrName]) : (o.remove(this.domNode), delete this.attributes[o.attrName]);
          }, c.prototype.build = function() {
            var o = this;
            this.attributes = {};
            var t = T.default.keys(this.domNode), e = w.default.keys(this.domNode), u = O.default.keys(this.domNode);
            t.concat(e).concat(u).forEach(function(l) {
              var a = p.query(l, p.Scope.ATTRIBUTE);
              a instanceof T.default && (o.attributes[a.attrName] = a);
            });
          }, c.prototype.copy = function(o) {
            var t = this;
            Object.keys(this.attributes).forEach(function(e) {
              var u = t.attributes[e].value(t.domNode);
              o.format(e, u);
            });
          }, c.prototype.move = function(o) {
            var t = this;
            this.copy(o), Object.keys(this.attributes).forEach(function(e) {
              t.attributes[e].remove(t.domNode);
            }), this.attributes = {};
          }, c.prototype.values = function() {
            var o = this;
            return Object.keys(this.attributes).reduce(function(t, e) {
              return t[e] = o.attributes[e].value(o.domNode), t;
            }, {});
          }, c;
        }();
        h.default = y;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(c, o) {
            c.__proto__ = o;
          } || function(c, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (c[t] = o[t]);
          };
          return function(c, o) {
            y(c, o);
            function t() {
              this.constructor = c;
            }
            c.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(12);
        function O(y, c) {
          var o = y.getAttribute("class") || "";
          return o.split(/\s+/).filter(function(t) {
            return t.indexOf(c + "-") === 0;
          });
        }
        var p = function(y) {
          T(c, y);
          function c() {
            return y !== null && y.apply(this, arguments) || this;
          }
          return c.keys = function(o) {
            return (o.getAttribute("class") || "").split(/\s+/).map(function(t) {
              return t.split("-").slice(0, -1).join("-");
            });
          }, c.prototype.add = function(o, t) {
            return this.canAdd(o, t) ? (this.remove(o), o.classList.add(this.keyName + "-" + t), !0) : !1;
          }, c.prototype.remove = function(o) {
            var t = O(o, this.keyName);
            t.forEach(function(e) {
              o.classList.remove(e);
            }), o.classList.length === 0 && o.removeAttribute("class");
          }, c.prototype.value = function(o) {
            var t = O(o, this.keyName)[0] || "", e = t.slice(this.keyName.length + 1);
            return this.canAdd(o, e) ? e : "";
          }, c;
        }(w.default);
        h.default = p;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(c, o) {
            c.__proto__ = o;
          } || function(c, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (c[t] = o[t]);
          };
          return function(c, o) {
            y(c, o);
            function t() {
              this.constructor = c;
            }
            c.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(12);
        function O(y) {
          var c = y.split("-"), o = c.slice(1).map(function(t) {
            return t[0].toUpperCase() + t.slice(1);
          }).join("");
          return c[0] + o;
        }
        var p = function(y) {
          T(c, y);
          function c() {
            return y !== null && y.apply(this, arguments) || this;
          }
          return c.keys = function(o) {
            return (o.getAttribute("style") || "").split(";").map(function(t) {
              var e = t.split(":");
              return e[0].trim();
            });
          }, c.prototype.add = function(o, t) {
            return this.canAdd(o, t) ? (o.style[O(this.keyName)] = t, !0) : !1;
          }, c.prototype.remove = function(o) {
            o.style[O(this.keyName)] = "", o.getAttribute("style") || o.removeAttribute("style");
          }, c.prototype.value = function(o) {
            var t = o.style[O(this.keyName)];
            return this.canAdd(o, t) ? t : "";
          }, c;
        }(w.default);
        h.default = p;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function p(y, c) {
            for (var o = 0; o < c.length; o++) {
              var t = c[o];
              t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(y, t.key, t);
            }
          }
          return function(y, c, o) {
            return c && p(y.prototype, c), o && p(y, o), y;
          };
        }();
        function w(p, y) {
          if (!(p instanceof y))
            throw new TypeError("Cannot call a class as a function");
        }
        var O = function() {
          function p(y, c) {
            w(this, p), this.quill = y, this.options = c, this.modules = {};
          }
          return T(p, [{
            key: "init",
            value: function() {
              var c = this;
              Object.keys(this.options.modules).forEach(function(o) {
                c.modules[o] == null && c.addModule(o);
              });
            }
          }, {
            key: "addModule",
            value: function(c) {
              var o = this.quill.constructor.import("modules/" + c);
              return this.modules[c] = new o(this.quill, this.options.modules[c] || {}), this.modules[c];
            }
          }]), p;
        }();
        O.DEFAULTS = {
          modules: {}
        }, O.themes = {
          default: O
        }, h.default = O;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function r(i, f) {
            for (var n = 0; n < f.length; n++) {
              var s = f[n];
              s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(i, s.key, s);
            }
          }
          return function(i, f, n) {
            return f && r(i.prototype, f), n && r(i, n), i;
          };
        }(), w = function r(i, f, n) {
          i === null && (i = Function.prototype);
          var s = Object.getOwnPropertyDescriptor(i, f);
          if (s === void 0) {
            var k = Object.getPrototypeOf(i);
            return k === null ? void 0 : r(k, f, n);
          } else {
            if ("value" in s)
              return s.value;
            var b = s.get;
            return b === void 0 ? void 0 : b.call(n);
          }
        }, O = d(0), p = o(O), y = d(7), c = o(y);
        function o(r) {
          return r && r.__esModule ? r : { default: r };
        }
        function t(r, i) {
          if (!(r instanceof i))
            throw new TypeError("Cannot call a class as a function");
        }
        function e(r, i) {
          if (!r)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return i && (typeof i == "object" || typeof i == "function") ? i : r;
        }
        function u(r, i) {
          if (typeof i != "function" && i !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof i);
          r.prototype = Object.create(i && i.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(r, i) : r.__proto__ = i);
        }
        var l = "\uFEFF", a = function(r) {
          u(i, r);
          function i(f) {
            t(this, i);
            var n = e(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, f));
            return n.contentNode = document.createElement("span"), n.contentNode.setAttribute("contenteditable", !1), [].slice.call(n.domNode.childNodes).forEach(function(s) {
              n.contentNode.appendChild(s);
            }), n.leftGuard = document.createTextNode(l), n.rightGuard = document.createTextNode(l), n.domNode.appendChild(n.leftGuard), n.domNode.appendChild(n.contentNode), n.domNode.appendChild(n.rightGuard), n;
          }
          return T(i, [{
            key: "index",
            value: function(n, s) {
              return n === this.leftGuard ? 0 : n === this.rightGuard ? 1 : w(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "index", this).call(this, n, s);
            }
          }, {
            key: "restore",
            value: function(n) {
              var s = void 0, k = void 0, b = n.data.split(l).join("");
              if (n === this.leftGuard)
                if (this.prev instanceof c.default) {
                  var _ = this.prev.length();
                  this.prev.insertAt(_, b), s = {
                    startNode: this.prev.domNode,
                    startOffset: _ + b.length
                  };
                } else
                  k = document.createTextNode(b), this.parent.insertBefore(p.default.create(k), this), s = {
                    startNode: k,
                    startOffset: b.length
                  };
              else
                n === this.rightGuard && (this.next instanceof c.default ? (this.next.insertAt(0, b), s = {
                  startNode: this.next.domNode,
                  startOffset: b.length
                }) : (k = document.createTextNode(b), this.parent.insertBefore(p.default.create(k), this.next), s = {
                  startNode: k,
                  startOffset: b.length
                }));
              return n.data = l, s;
            }
          }, {
            key: "update",
            value: function(n, s) {
              var k = this;
              n.forEach(function(b) {
                if (b.type === "characterData" && (b.target === k.leftGuard || b.target === k.rightGuard)) {
                  var _ = k.restore(b.target);
                  _ && (s.range = _);
                }
              });
            }
          }]), i;
        }(p.default.Embed);
        h.default = a;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.AlignStyle = h.AlignClass = h.AlignAttribute = void 0;
        var T = d(0), w = O(T);
        function O(t) {
          return t && t.__esModule ? t : { default: t };
        }
        var p = {
          scope: w.default.Scope.BLOCK,
          whitelist: ["right", "center", "justify"]
        }, y = new w.default.Attributor.Attribute("align", "align", p), c = new w.default.Attributor.Class("align", "ql-align", p), o = new w.default.Attributor.Style("align", "text-align", p);
        h.AlignAttribute = y, h.AlignClass = c, h.AlignStyle = o;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.BackgroundStyle = h.BackgroundClass = void 0;
        var T = d(0), w = p(T), O = d(26);
        function p(o) {
          return o && o.__esModule ? o : { default: o };
        }
        var y = new w.default.Attributor.Class("background", "ql-bg", {
          scope: w.default.Scope.INLINE
        }), c = new O.ColorAttributor("background", "background-color", {
          scope: w.default.Scope.INLINE
        });
        h.BackgroundClass = y, h.BackgroundStyle = c;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.DirectionStyle = h.DirectionClass = h.DirectionAttribute = void 0;
        var T = d(0), w = O(T);
        function O(t) {
          return t && t.__esModule ? t : { default: t };
        }
        var p = {
          scope: w.default.Scope.BLOCK,
          whitelist: ["rtl"]
        }, y = new w.default.Attributor.Attribute("direction", "dir", p), c = new w.default.Attributor.Class("direction", "ql-direction", p), o = new w.default.Attributor.Style("direction", "direction", p);
        h.DirectionAttribute = y, h.DirectionClass = c, h.DirectionStyle = o;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.FontClass = h.FontStyle = void 0;
        var T = function() {
          function r(i, f) {
            for (var n = 0; n < f.length; n++) {
              var s = f[n];
              s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(i, s.key, s);
            }
          }
          return function(i, f, n) {
            return f && r(i.prototype, f), n && r(i, n), i;
          };
        }(), w = function r(i, f, n) {
          i === null && (i = Function.prototype);
          var s = Object.getOwnPropertyDescriptor(i, f);
          if (s === void 0) {
            var k = Object.getPrototypeOf(i);
            return k === null ? void 0 : r(k, f, n);
          } else {
            if ("value" in s)
              return s.value;
            var b = s.get;
            return b === void 0 ? void 0 : b.call(n);
          }
        }, O = d(0), p = y(O);
        function y(r) {
          return r && r.__esModule ? r : { default: r };
        }
        function c(r, i) {
          if (!(r instanceof i))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(r, i) {
          if (!r)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return i && (typeof i == "object" || typeof i == "function") ? i : r;
        }
        function t(r, i) {
          if (typeof i != "function" && i !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof i);
          r.prototype = Object.create(i && i.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(r, i) : r.__proto__ = i);
        }
        var e = {
          scope: p.default.Scope.INLINE,
          whitelist: ["serif", "monospace"]
        }, u = new p.default.Attributor.Class("font", "ql-font", e), l = function(r) {
          t(i, r);
          function i() {
            return c(this, i), o(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
          }
          return T(i, [{
            key: "value",
            value: function(n) {
              return w(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "value", this).call(this, n).replace(/["']/g, "");
            }
          }]), i;
        }(p.default.Attributor.Style), a = new l("font", "font-family", e);
        h.FontStyle = a, h.FontClass = u;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.SizeStyle = h.SizeClass = void 0;
        var T = d(0), w = O(T);
        function O(c) {
          return c && c.__esModule ? c : { default: c };
        }
        var p = new w.default.Attributor.Class("size", "ql-size", {
          scope: w.default.Scope.INLINE,
          whitelist: ["small", "large", "huge"]
        }), y = new w.default.Attributor.Style("size", "font-size", {
          scope: w.default.Scope.INLINE,
          whitelist: ["10px", "18px", "32px"]
        });
        h.SizeClass = p, h.SizeStyle = y;
      },
      function(L, h, d) {
        L.exports = {
          align: {
            "": d(76),
            center: d(77),
            right: d(78),
            justify: d(79)
          },
          background: d(80),
          blockquote: d(81),
          bold: d(82),
          clean: d(83),
          code: d(58),
          "code-block": d(58),
          color: d(84),
          direction: {
            "": d(85),
            rtl: d(86)
          },
          float: {
            center: d(87),
            full: d(88),
            left: d(89),
            right: d(90)
          },
          formula: d(91),
          header: {
            1: d(92),
            2: d(93)
          },
          italic: d(94),
          image: d(95),
          indent: {
            "+1": d(96),
            "-1": d(97)
          },
          link: d(98),
          list: {
            ordered: d(99),
            bullet: d(100),
            check: d(101)
          },
          script: {
            sub: d(102),
            super: d(103)
          },
          strike: d(104),
          underline: d(105),
          video: d(106)
        };
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.getLastChangeIndex = h.default = void 0;
        var T = function() {
          function f(n, s) {
            for (var k = 0; k < s.length; k++) {
              var b = s[k];
              b.enumerable = b.enumerable || !1, b.configurable = !0, "value" in b && (b.writable = !0), Object.defineProperty(n, b.key, b);
            }
          }
          return function(n, s, k) {
            return s && f(n.prototype, s), k && f(n, k), n;
          };
        }(), w = d(0), O = t(w), p = d(5), y = t(p), c = d(9), o = t(c);
        function t(f) {
          return f && f.__esModule ? f : { default: f };
        }
        function e(f, n) {
          if (!(f instanceof n))
            throw new TypeError("Cannot call a class as a function");
        }
        function u(f, n) {
          if (!f)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return n && (typeof n == "object" || typeof n == "function") ? n : f;
        }
        function l(f, n) {
          if (typeof n != "function" && n !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof n);
          f.prototype = Object.create(n && n.prototype, { constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 } }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(f, n) : f.__proto__ = n);
        }
        var a = function(f) {
          l(n, f);
          function n(s, k) {
            e(this, n);
            var b = u(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, s, k));
            return b.lastRecorded = 0, b.ignoreChange = !1, b.clear(), b.quill.on(y.default.events.EDITOR_CHANGE, function(_, N, m, v) {
              _ !== y.default.events.TEXT_CHANGE || b.ignoreChange || (!b.options.userOnly || v === y.default.sources.USER ? b.record(N, m) : b.transform(N));
            }), b.quill.keyboard.addBinding({ key: "Z", shortKey: !0 }, b.undo.bind(b)), b.quill.keyboard.addBinding({ key: "Z", shortKey: !0, shiftKey: !0 }, b.redo.bind(b)), /Win/i.test(navigator.platform) && b.quill.keyboard.addBinding({ key: "Y", shortKey: !0 }, b.redo.bind(b)), b;
          }
          return T(n, [{
            key: "change",
            value: function(k, b) {
              if (this.stack[k].length !== 0) {
                var _ = this.stack[k].pop();
                this.stack[b].push(_), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(_[k], y.default.sources.USER), this.ignoreChange = !1;
                var N = i(_[k]);
                this.quill.setSelection(N);
              }
            }
          }, {
            key: "clear",
            value: function() {
              this.stack = { undo: [], redo: [] };
            }
          }, {
            key: "cutoff",
            value: function() {
              this.lastRecorded = 0;
            }
          }, {
            key: "record",
            value: function(k, b) {
              if (k.ops.length !== 0) {
                this.stack.redo = [];
                var _ = this.quill.getContents().diff(b), N = Date.now();
                if (this.lastRecorded + this.options.delay > N && this.stack.undo.length > 0) {
                  var m = this.stack.undo.pop();
                  _ = _.compose(m.undo), k = m.redo.compose(k);
                } else
                  this.lastRecorded = N;
                this.stack.undo.push({
                  redo: k,
                  undo: _
                }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift();
              }
            }
          }, {
            key: "redo",
            value: function() {
              this.change("redo", "undo");
            }
          }, {
            key: "transform",
            value: function(k) {
              this.stack.undo.forEach(function(b) {
                b.undo = k.transform(b.undo, !0), b.redo = k.transform(b.redo, !0);
              }), this.stack.redo.forEach(function(b) {
                b.undo = k.transform(b.undo, !0), b.redo = k.transform(b.redo, !0);
              });
            }
          }, {
            key: "undo",
            value: function() {
              this.change("undo", "redo");
            }
          }]), n;
        }(o.default);
        a.DEFAULTS = {
          delay: 1e3,
          maxStack: 100,
          userOnly: !1
        };
        function r(f) {
          var n = f.ops[f.ops.length - 1];
          return n == null ? !1 : n.insert != null ? typeof n.insert == "string" && n.insert.endsWith(`
`) : n.attributes != null ? Object.keys(n.attributes).some(function(s) {
            return O.default.query(s, O.default.Scope.BLOCK) != null;
          }) : !1;
        }
        function i(f) {
          var n = f.reduce(function(k, b) {
            return k += b.delete || 0, k;
          }, 0), s = f.length() - n;
          return r(f) && (s -= 1), s;
        }
        h.default = a, h.getLastChangeIndex = i;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.default = h.BaseTooltip = void 0;
        var T = function() {
          function P(q, F) {
            for (var D = 0; D < F.length; D++) {
              var S = F[D];
              S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(q, S.key, S);
            }
          }
          return function(q, F, D) {
            return F && P(q.prototype, F), D && P(q, D), q;
          };
        }(), w = function P(q, F, D) {
          q === null && (q = Function.prototype);
          var S = Object.getOwnPropertyDescriptor(q, F);
          if (S === void 0) {
            var I = Object.getPrototypeOf(q);
            return I === null ? void 0 : P(I, F, D);
          } else {
            if ("value" in S)
              return S.value;
            var U = S.get;
            return U === void 0 ? void 0 : U.call(D);
          }
        }, O = d(3), p = N(O), y = d(2), c = N(y), o = d(8), t = N(o), e = d(23), u = N(e), l = d(34), a = N(l), r = d(59), i = N(r), f = d(60), n = N(f), s = d(28), k = N(s), b = d(61), _ = N(b);
        function N(P) {
          return P && P.__esModule ? P : { default: P };
        }
        function m(P, q) {
          if (!(P instanceof q))
            throw new TypeError("Cannot call a class as a function");
        }
        function v(P, q) {
          if (!P)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return q && (typeof q == "object" || typeof q == "function") ? q : P;
        }
        function g(P, q) {
          if (typeof q != "function" && q !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof q);
          P.prototype = Object.create(q && q.prototype, { constructor: { value: P, enumerable: !1, writable: !0, configurable: !0 } }), q && (Object.setPrototypeOf ? Object.setPrototypeOf(P, q) : P.__proto__ = q);
        }
        var A = [!1, "center", "right", "justify"], x = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], R = [!1, "serif", "monospace"], B = ["1", "2", "3", !1], C = ["small", !1, "large", "huge"], Z = function(P) {
          g(q, P);
          function q(F, D) {
            m(this, q);
            var S = v(this, (q.__proto__ || Object.getPrototypeOf(q)).call(this, F, D)), I = function U(H) {
              if (!document.body.contains(F.root))
                return document.body.removeEventListener("click", U);
              S.tooltip != null && !S.tooltip.root.contains(H.target) && document.activeElement !== S.tooltip.textbox && !S.quill.hasFocus() && S.tooltip.hide(), S.pickers != null && S.pickers.forEach(function(V) {
                V.container.contains(H.target) || V.close();
              });
            };
            return F.emitter.listenDOM("click", document.body, I), S;
          }
          return T(q, [{
            key: "addModule",
            value: function(D) {
              var S = w(q.prototype.__proto__ || Object.getPrototypeOf(q.prototype), "addModule", this).call(this, D);
              return D === "toolbar" && this.extendToolbar(S), S;
            }
          }, {
            key: "buildButtons",
            value: function(D, S) {
              D.forEach(function(I) {
                var U = I.getAttribute("class") || "";
                U.split(/\s+/).forEach(function(H) {
                  if (!!H.startsWith("ql-") && (H = H.slice(3), S[H] != null))
                    if (H === "direction")
                      I.innerHTML = S[H][""] + S[H].rtl;
                    else if (typeof S[H] == "string")
                      I.innerHTML = S[H];
                    else {
                      var V = I.value || "";
                      V != null && S[H][V] && (I.innerHTML = S[H][V]);
                    }
                });
              });
            }
          }, {
            key: "buildPickers",
            value: function(D, S) {
              var I = this;
              this.pickers = D.map(function(H) {
                if (H.classList.contains("ql-align"))
                  return H.querySelector("option") == null && E(H, A), new n.default(H, S.align);
                if (H.classList.contains("ql-background") || H.classList.contains("ql-color")) {
                  var V = H.classList.contains("ql-background") ? "background" : "color";
                  return H.querySelector("option") == null && E(H, x, V === "background" ? "#ffffff" : "#000000"), new i.default(H, S[V]);
                } else
                  return H.querySelector("option") == null && (H.classList.contains("ql-font") ? E(H, R) : H.classList.contains("ql-header") ? E(H, B) : H.classList.contains("ql-size") && E(H, C)), new k.default(H);
              });
              var U = function() {
                I.pickers.forEach(function(V) {
                  V.update();
                });
              };
              this.quill.on(t.default.events.EDITOR_CHANGE, U);
            }
          }]), q;
        }(a.default);
        Z.DEFAULTS = (0, p.default)(!0, {}, a.default.DEFAULTS, {
          modules: {
            toolbar: {
              handlers: {
                formula: function() {
                  this.quill.theme.tooltip.edit("formula");
                },
                image: function() {
                  var q = this, F = this.container.querySelector("input.ql-image[type=file]");
                  F == null && (F = document.createElement("input"), F.setAttribute("type", "file"), F.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"), F.classList.add("ql-image"), F.addEventListener("change", function() {
                    if (F.files != null && F.files[0] != null) {
                      var D = new FileReader();
                      D.onload = function(S) {
                        var I = q.quill.getSelection(!0);
                        q.quill.updateContents(new c.default().retain(I.index).delete(I.length).insert({ image: S.target.result }), t.default.sources.USER), q.quill.setSelection(I.index + 1, t.default.sources.SILENT), F.value = "";
                      }, D.readAsDataURL(F.files[0]);
                    }
                  }), this.container.appendChild(F)), F.click();
                },
                video: function() {
                  this.quill.theme.tooltip.edit("video");
                }
              }
            }
          }
        });
        var M = function(P) {
          g(q, P);
          function q(F, D) {
            m(this, q);
            var S = v(this, (q.__proto__ || Object.getPrototypeOf(q)).call(this, F, D));
            return S.textbox = S.root.querySelector('input[type="text"]'), S.listen(), S;
          }
          return T(q, [{
            key: "listen",
            value: function() {
              var D = this;
              this.textbox.addEventListener("keydown", function(S) {
                u.default.match(S, "enter") ? (D.save(), S.preventDefault()) : u.default.match(S, "escape") && (D.cancel(), S.preventDefault());
              });
            }
          }, {
            key: "cancel",
            value: function() {
              this.hide();
            }
          }, {
            key: "edit",
            value: function() {
              var D = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
              this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), S != null ? this.textbox.value = S : D !== this.root.getAttribute("data-mode") && (this.textbox.value = ""), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + D) || ""), this.root.setAttribute("data-mode", D);
            }
          }, {
            key: "restoreFocus",
            value: function() {
              var D = this.quill.scrollingContainer.scrollTop;
              this.quill.focus(), this.quill.scrollingContainer.scrollTop = D;
            }
          }, {
            key: "save",
            value: function() {
              var D = this.textbox.value;
              switch (this.root.getAttribute("data-mode")) {
                case "link": {
                  var S = this.quill.root.scrollTop;
                  this.linkRange ? (this.quill.formatText(this.linkRange, "link", D, t.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", D, t.default.sources.USER)), this.quill.root.scrollTop = S;
                  break;
                }
                case "video":
                  D = j(D);
                case "formula": {
                  if (!D)
                    break;
                  var I = this.quill.getSelection(!0);
                  if (I != null) {
                    var U = I.index + I.length;
                    this.quill.insertEmbed(U, this.root.getAttribute("data-mode"), D, t.default.sources.USER), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(U + 1, " ", t.default.sources.USER), this.quill.setSelection(U + 2, t.default.sources.USER);
                  }
                  break;
                }
              }
              this.textbox.value = "", this.hide();
            }
          }]), q;
        }(_.default);
        function j(P) {
          var q = P.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || P.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
          return q ? (q[1] || "https") + "://www.youtube.com/embed/" + q[2] + "?showinfo=0" : (q = P.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (q[1] || "https") + "://player.vimeo.com/video/" + q[2] + "/" : P;
        }
        function E(P, q) {
          var F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          q.forEach(function(D) {
            var S = document.createElement("option");
            D === F ? S.setAttribute("selected", "selected") : S.setAttribute("value", D), P.appendChild(S);
          });
        }
        h.BaseTooltip = M, h.default = Z;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", { value: !0 });
        var T = function() {
          function w() {
            this.head = this.tail = null, this.length = 0;
          }
          return w.prototype.append = function() {
            for (var O = [], p = 0; p < arguments.length; p++)
              O[p] = arguments[p];
            this.insertBefore(O[0], null), O.length > 1 && this.append.apply(this, O.slice(1));
          }, w.prototype.contains = function(O) {
            for (var p, y = this.iterator(); p = y(); )
              if (p === O)
                return !0;
            return !1;
          }, w.prototype.insertBefore = function(O, p) {
            !O || (O.next = p, p != null ? (O.prev = p.prev, p.prev != null && (p.prev.next = O), p.prev = O, p === this.head && (this.head = O)) : this.tail != null ? (this.tail.next = O, O.prev = this.tail, this.tail = O) : (O.prev = null, this.head = this.tail = O), this.length += 1);
          }, w.prototype.offset = function(O) {
            for (var p = 0, y = this.head; y != null; ) {
              if (y === O)
                return p;
              p += y.length(), y = y.next;
            }
            return -1;
          }, w.prototype.remove = function(O) {
            !this.contains(O) || (O.prev != null && (O.prev.next = O.next), O.next != null && (O.next.prev = O.prev), O === this.head && (this.head = O.next), O === this.tail && (this.tail = O.prev), this.length -= 1);
          }, w.prototype.iterator = function(O) {
            return O === void 0 && (O = this.head), function() {
              var p = O;
              return O != null && (O = O.next), p;
            };
          }, w.prototype.find = function(O, p) {
            p === void 0 && (p = !1);
            for (var y, c = this.iterator(); y = c(); ) {
              var o = y.length();
              if (O < o || p && O === o && (y.next == null || y.next.length() !== 0))
                return [y, O];
              O -= o;
            }
            return [null, 0];
          }, w.prototype.forEach = function(O) {
            for (var p, y = this.iterator(); p = y(); )
              O(p);
          }, w.prototype.forEachAt = function(O, p, y) {
            if (!(p <= 0))
              for (var c = this.find(O), o = c[0], t = c[1], e, u = O - t, l = this.iterator(o); (e = l()) && u < O + p; ) {
                var a = e.length();
                O > u ? y(e, O - u, Math.min(p, u + a - O)) : y(e, 0, Math.min(a, O + p - u)), u += a;
              }
          }, w.prototype.map = function(O) {
            return this.reduce(function(p, y) {
              return p.push(O(y)), p;
            }, []);
          }, w.prototype.reduce = function(O, p) {
            for (var y, c = this.iterator(); y = c(); )
              p = O(p, y);
            return p;
          }, w;
        }();
        h.default = T;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
            t.__proto__ = e;
          } || function(t, e) {
            for (var u in e)
              e.hasOwnProperty(u) && (t[u] = e[u]);
          };
          return function(t, e) {
            o(t, e);
            function u() {
              this.constructor = t;
            }
            t.prototype = e === null ? Object.create(e) : (u.prototype = e.prototype, new u());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(17), O = d(1), p = {
          attributes: !0,
          characterData: !0,
          characterDataOldValue: !0,
          childList: !0,
          subtree: !0
        }, y = 100, c = function(o) {
          T(t, o);
          function t(e) {
            var u = o.call(this, e) || this;
            return u.scroll = u, u.observer = new MutationObserver(function(l) {
              u.update(l);
            }), u.observer.observe(u.domNode, p), u.attach(), u;
          }
          return t.prototype.detach = function() {
            o.prototype.detach.call(this), this.observer.disconnect();
          }, t.prototype.deleteAt = function(e, u) {
            this.update(), e === 0 && u === this.length() ? this.children.forEach(function(l) {
              l.remove();
            }) : o.prototype.deleteAt.call(this, e, u);
          }, t.prototype.formatAt = function(e, u, l, a) {
            this.update(), o.prototype.formatAt.call(this, e, u, l, a);
          }, t.prototype.insertAt = function(e, u, l) {
            this.update(), o.prototype.insertAt.call(this, e, u, l);
          }, t.prototype.optimize = function(e, u) {
            var l = this;
            e === void 0 && (e = []), u === void 0 && (u = {}), o.prototype.optimize.call(this, u);
            for (var a = [].slice.call(this.observer.takeRecords()); a.length > 0; )
              e.push(a.pop());
            for (var r = function(s, k) {
              k === void 0 && (k = !0), !(s == null || s === l) && s.domNode.parentNode != null && (s.domNode[O.DATA_KEY].mutations == null && (s.domNode[O.DATA_KEY].mutations = []), k && r(s.parent));
            }, i = function(s) {
              s.domNode[O.DATA_KEY] == null || s.domNode[O.DATA_KEY].mutations == null || (s instanceof w.default && s.children.forEach(i), s.optimize(u));
            }, f = e, n = 0; f.length > 0; n += 1) {
              if (n >= y)
                throw new Error("[Parchment] Maximum optimize iterations reached");
              for (f.forEach(function(s) {
                var k = O.find(s.target, !0);
                k != null && (k.domNode === s.target && (s.type === "childList" ? (r(O.find(s.previousSibling, !1)), [].forEach.call(s.addedNodes, function(b) {
                  var _ = O.find(b, !1);
                  r(_, !1), _ instanceof w.default && _.children.forEach(function(N) {
                    r(N, !1);
                  });
                })) : s.type === "attributes" && r(k.prev)), r(k));
              }), this.children.forEach(i), f = [].slice.call(this.observer.takeRecords()), a = f.slice(); a.length > 0; )
                e.push(a.pop());
            }
          }, t.prototype.update = function(e, u) {
            var l = this;
            u === void 0 && (u = {}), e = e || this.observer.takeRecords(), e.map(function(a) {
              var r = O.find(a.target, !0);
              return r == null ? null : r.domNode[O.DATA_KEY].mutations == null ? (r.domNode[O.DATA_KEY].mutations = [a], r) : (r.domNode[O.DATA_KEY].mutations.push(a), null);
            }).forEach(function(a) {
              a == null || a === l || a.domNode[O.DATA_KEY] == null || a.update(a.domNode[O.DATA_KEY].mutations || [], u);
            }), this.domNode[O.DATA_KEY].mutations != null && o.prototype.update.call(this, this.domNode[O.DATA_KEY].mutations, u), this.optimize(e, u);
          }, t.blotName = "scroll", t.defaultChild = "block", t.scope = O.Scope.BLOCK_BLOT, t.tagName = "DIV", t;
        }(w.default);
        h.default = c;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, t) {
            o.__proto__ = t;
          } || function(o, t) {
            for (var e in t)
              t.hasOwnProperty(e) && (o[e] = t[e]);
          };
          return function(o, t) {
            c(o, t);
            function e() {
              this.constructor = o;
            }
            o.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(18), O = d(1);
        function p(c, o) {
          if (Object.keys(c).length !== Object.keys(o).length)
            return !1;
          for (var t in c)
            if (c[t] !== o[t])
              return !1;
          return !0;
        }
        var y = function(c) {
          T(o, c);
          function o() {
            return c !== null && c.apply(this, arguments) || this;
          }
          return o.formats = function(t) {
            if (t.tagName !== o.tagName)
              return c.formats.call(this, t);
          }, o.prototype.format = function(t, e) {
            var u = this;
            t === this.statics.blotName && !e ? (this.children.forEach(function(l) {
              l instanceof w.default || (l = l.wrap(o.blotName, !0)), u.attributes.copy(l);
            }), this.unwrap()) : c.prototype.format.call(this, t, e);
          }, o.prototype.formatAt = function(t, e, u, l) {
            if (this.formats()[u] != null || O.query(u, O.Scope.ATTRIBUTE)) {
              var a = this.isolate(t, e);
              a.format(u, l);
            } else
              c.prototype.formatAt.call(this, t, e, u, l);
          }, o.prototype.optimize = function(t) {
            c.prototype.optimize.call(this, t);
            var e = this.formats();
            if (Object.keys(e).length === 0)
              return this.unwrap();
            var u = this.next;
            u instanceof o && u.prev === this && p(e, u.formats()) && (u.moveChildren(this), u.remove());
          }, o.blotName = "inline", o.scope = O.Scope.INLINE_BLOT, o.tagName = "SPAN", o;
        }(w.default);
        h.default = y;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(c, o) {
            c.__proto__ = o;
          } || function(c, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (c[t] = o[t]);
          };
          return function(c, o) {
            y(c, o);
            function t() {
              this.constructor = c;
            }
            c.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(18), O = d(1), p = function(y) {
          T(c, y);
          function c() {
            return y !== null && y.apply(this, arguments) || this;
          }
          return c.formats = function(o) {
            var t = O.query(c.blotName).tagName;
            if (o.tagName !== t)
              return y.formats.call(this, o);
          }, c.prototype.format = function(o, t) {
            O.query(o, O.Scope.BLOCK) != null && (o === this.statics.blotName && !t ? this.replaceWith(c.blotName) : y.prototype.format.call(this, o, t));
          }, c.prototype.formatAt = function(o, t, e, u) {
            O.query(e, O.Scope.BLOCK) != null ? this.format(e, u) : y.prototype.formatAt.call(this, o, t, e, u);
          }, c.prototype.insertAt = function(o, t, e) {
            if (e == null || O.query(t, O.Scope.INLINE) != null)
              y.prototype.insertAt.call(this, o, t, e);
            else {
              var u = this.split(o), l = O.create(t, e);
              u.parent.insertBefore(l, u);
            }
          }, c.prototype.update = function(o, t) {
            navigator.userAgent.match(/Trident/) ? this.build() : y.prototype.update.call(this, o, t);
          }, c.blotName = "block", c.scope = O.Scope.BLOCK_BLOT, c.tagName = "P", c;
        }(w.default);
        h.default = p;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var p = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(y, c) {
            y.__proto__ = c;
          } || function(y, c) {
            for (var o in c)
              c.hasOwnProperty(o) && (y[o] = c[o]);
          };
          return function(y, c) {
            p(y, c);
            function o() {
              this.constructor = y;
            }
            y.prototype = c === null ? Object.create(c) : (o.prototype = c.prototype, new o());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(19), O = function(p) {
          T(y, p);
          function y() {
            return p !== null && p.apply(this, arguments) || this;
          }
          return y.formats = function(c) {
          }, y.prototype.format = function(c, o) {
            p.prototype.formatAt.call(this, 0, this.length(), c, o);
          }, y.prototype.formatAt = function(c, o, t, e) {
            c === 0 && o === this.length() ? this.format(t, e) : p.prototype.formatAt.call(this, c, o, t, e);
          }, y.prototype.formats = function() {
            return this.statics.formats(this.domNode);
          }, y;
        }(w.default);
        h.default = O;
      },
      function(L, h, d) {
        var T = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(c, o) {
            c.__proto__ = o;
          } || function(c, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (c[t] = o[t]);
          };
          return function(c, o) {
            y(c, o);
            function t() {
              this.constructor = c;
            }
            c.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(h, "__esModule", { value: !0 });
        var w = d(19), O = d(1), p = function(y) {
          T(c, y);
          function c(o) {
            var t = y.call(this, o) || this;
            return t.text = t.statics.value(t.domNode), t;
          }
          return c.create = function(o) {
            return document.createTextNode(o);
          }, c.value = function(o) {
            var t = o.data;
            return t.normalize && (t = t.normalize()), t;
          }, c.prototype.deleteAt = function(o, t) {
            this.domNode.data = this.text = this.text.slice(0, o) + this.text.slice(o + t);
          }, c.prototype.index = function(o, t) {
            return this.domNode === o ? t : -1;
          }, c.prototype.insertAt = function(o, t, e) {
            e == null ? (this.text = this.text.slice(0, o) + t + this.text.slice(o), this.domNode.data = this.text) : y.prototype.insertAt.call(this, o, t, e);
          }, c.prototype.length = function() {
            return this.text.length;
          }, c.prototype.optimize = function(o) {
            y.prototype.optimize.call(this, o), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof c && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
          }, c.prototype.position = function(o, t) {
            return [this.domNode, o];
          }, c.prototype.split = function(o, t) {
            if (t === void 0 && (t = !1), !t) {
              if (o === 0)
                return this;
              if (o === this.length())
                return this.next;
            }
            var e = O.create(this.domNode.splitText(o));
            return this.parent.insertBefore(e, this.next), this.text = this.statics.value(this.domNode), e;
          }, c.prototype.update = function(o, t) {
            var e = this;
            o.some(function(u) {
              return u.type === "characterData" && u.target === e.domNode;
            }) && (this.text = this.statics.value(this.domNode));
          }, c.prototype.value = function() {
            return this.text;
          }, c.blotName = "text", c.scope = O.Scope.INLINE_BLOT, c;
        }(w.default);
        h.default = p;
      },
      function(L, h, d) {
        var T = document.createElement("div");
        if (T.classList.toggle("test-class", !1), T.classList.contains("test-class")) {
          var w = DOMTokenList.prototype.toggle;
          DOMTokenList.prototype.toggle = function(O, p) {
            return arguments.length > 1 && !this.contains(O) == !p ? p : w.call(this, O);
          };
        }
        String.prototype.startsWith || (String.prototype.startsWith = function(O, p) {
          return p = p || 0, this.substr(p, O.length) === O;
        }), String.prototype.endsWith || (String.prototype.endsWith = function(O, p) {
          var y = this.toString();
          (typeof p != "number" || !isFinite(p) || Math.floor(p) !== p || p > y.length) && (p = y.length), p -= O.length;
          var c = y.indexOf(O, p);
          return c !== -1 && c === p;
        }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
          value: function(p) {
            if (this === null)
              throw new TypeError("Array.prototype.find called on null or undefined");
            if (typeof p != "function")
              throw new TypeError("predicate must be a function");
            for (var y = Object(this), c = y.length >>> 0, o = arguments[1], t, e = 0; e < c; e++)
              if (t = y[e], p.call(o, t, e, y))
                return t;
          }
        }), document.addEventListener("DOMContentLoaded", function() {
          document.execCommand("enableObjectResizing", !1, !1), document.execCommand("autoUrlDetect", !1, !1);
        });
      },
      function(L, h) {
        var d = -1, T = 1, w = 0;
        function O(n, s, k) {
          if (n == s)
            return n ? [[w, n]] : [];
          (k < 0 || n.length < k) && (k = null);
          var b = o(n, s), _ = n.substring(0, b);
          n = n.substring(b), s = s.substring(b), b = t(n, s);
          var N = n.substring(n.length - b);
          n = n.substring(0, n.length - b), s = s.substring(0, s.length - b);
          var m = p(n, s);
          return _ && m.unshift([w, _]), N && m.push([w, N]), u(m), k != null && (m = r(m, k)), m = i(m), m;
        }
        function p(n, s) {
          var k;
          if (!n)
            return [[T, s]];
          if (!s)
            return [[d, n]];
          var b = n.length > s.length ? n : s, _ = n.length > s.length ? s : n, N = b.indexOf(_);
          if (N != -1)
            return k = [
              [T, b.substring(0, N)],
              [w, _],
              [T, b.substring(N + _.length)]
            ], n.length > s.length && (k[0][0] = k[2][0] = d), k;
          if (_.length == 1)
            return [[d, n], [T, s]];
          var m = e(n, s);
          if (m) {
            var v = m[0], g = m[1], A = m[2], x = m[3], R = m[4], B = O(v, A), C = O(g, x);
            return B.concat([[w, R]], C);
          }
          return y(n, s);
        }
        function y(n, s) {
          for (var k = n.length, b = s.length, _ = Math.ceil((k + b) / 2), N = _, m = 2 * _, v = new Array(m), g = new Array(m), A = 0; A < m; A++)
            v[A] = -1, g[A] = -1;
          v[N + 1] = 0, g[N + 1] = 0;
          for (var x = k - b, R = x % 2 != 0, B = 0, C = 0, Z = 0, M = 0, j = 0; j < _; j++) {
            for (var E = -j + B; E <= j - C; E += 2) {
              var P = N + E, q;
              E == -j || E != j && v[P - 1] < v[P + 1] ? q = v[P + 1] : q = v[P - 1] + 1;
              for (var F = q - E; q < k && F < b && n.charAt(q) == s.charAt(F); )
                q++, F++;
              if (v[P] = q, q > k)
                C += 2;
              else if (F > b)
                B += 2;
              else if (R) {
                var D = N + x - E;
                if (D >= 0 && D < m && g[D] != -1) {
                  var S = k - g[D];
                  if (q >= S)
                    return c(n, s, q, F);
                }
              }
            }
            for (var I = -j + Z; I <= j - M; I += 2) {
              var D = N + I, S;
              I == -j || I != j && g[D - 1] < g[D + 1] ? S = g[D + 1] : S = g[D - 1] + 1;
              for (var U = S - I; S < k && U < b && n.charAt(k - S - 1) == s.charAt(b - U - 1); )
                S++, U++;
              if (g[D] = S, S > k)
                M += 2;
              else if (U > b)
                Z += 2;
              else if (!R) {
                var P = N + x - I;
                if (P >= 0 && P < m && v[P] != -1) {
                  var q = v[P], F = N + q - P;
                  if (S = k - S, q >= S)
                    return c(n, s, q, F);
                }
              }
            }
          }
          return [[d, n], [T, s]];
        }
        function c(n, s, k, b) {
          var _ = n.substring(0, k), N = s.substring(0, b), m = n.substring(k), v = s.substring(b), g = O(_, N), A = O(m, v);
          return g.concat(A);
        }
        function o(n, s) {
          if (!n || !s || n.charAt(0) != s.charAt(0))
            return 0;
          for (var k = 0, b = Math.min(n.length, s.length), _ = b, N = 0; k < _; )
            n.substring(N, _) == s.substring(N, _) ? (k = _, N = k) : b = _, _ = Math.floor((b - k) / 2 + k);
          return _;
        }
        function t(n, s) {
          if (!n || !s || n.charAt(n.length - 1) != s.charAt(s.length - 1))
            return 0;
          for (var k = 0, b = Math.min(n.length, s.length), _ = b, N = 0; k < _; )
            n.substring(n.length - _, n.length - N) == s.substring(s.length - _, s.length - N) ? (k = _, N = k) : b = _, _ = Math.floor((b - k) / 2 + k);
          return _;
        }
        function e(n, s) {
          var k = n.length > s.length ? n : s, b = n.length > s.length ? s : n;
          if (k.length < 4 || b.length * 2 < k.length)
            return null;
          function _(C, Z, M) {
            for (var j = C.substring(M, M + Math.floor(C.length / 4)), E = -1, P = "", q, F, D, S; (E = Z.indexOf(j, E + 1)) != -1; ) {
              var I = o(
                C.substring(M),
                Z.substring(E)
              ), U = t(
                C.substring(0, M),
                Z.substring(0, E)
              );
              P.length < U + I && (P = Z.substring(E - U, E) + Z.substring(E, E + I), q = C.substring(0, M - U), F = C.substring(M + I), D = Z.substring(0, E - U), S = Z.substring(E + I));
            }
            return P.length * 2 >= C.length ? [
              q,
              F,
              D,
              S,
              P
            ] : null;
          }
          var N = _(
            k,
            b,
            Math.ceil(k.length / 4)
          ), m = _(
            k,
            b,
            Math.ceil(k.length / 2)
          ), v;
          if (!N && !m)
            return null;
          m ? N ? v = N[4].length > m[4].length ? N : m : v = m : v = N;
          var g, A, x, R;
          n.length > s.length ? (g = v[0], A = v[1], x = v[2], R = v[3]) : (x = v[0], R = v[1], g = v[2], A = v[3]);
          var B = v[4];
          return [g, A, x, R, B];
        }
        function u(n) {
          n.push([w, ""]);
          for (var s = 0, k = 0, b = 0, _ = "", N = "", m; s < n.length; )
            switch (n[s][0]) {
              case T:
                b++, N += n[s][1], s++;
                break;
              case d:
                k++, _ += n[s][1], s++;
                break;
              case w:
                k + b > 1 ? (k !== 0 && b !== 0 && (m = o(N, _), m !== 0 && (s - k - b > 0 && n[s - k - b - 1][0] == w ? n[s - k - b - 1][1] += N.substring(0, m) : (n.splice(0, 0, [
                  w,
                  N.substring(0, m)
                ]), s++), N = N.substring(m), _ = _.substring(m)), m = t(N, _), m !== 0 && (n[s][1] = N.substring(N.length - m) + n[s][1], N = N.substring(0, N.length - m), _ = _.substring(0, _.length - m))), k === 0 ? n.splice(
                  s - b,
                  k + b,
                  [T, N]
                ) : b === 0 ? n.splice(
                  s - k,
                  k + b,
                  [d, _]
                ) : n.splice(
                  s - k - b,
                  k + b,
                  [d, _],
                  [T, N]
                ), s = s - k - b + (k ? 1 : 0) + (b ? 1 : 0) + 1) : s !== 0 && n[s - 1][0] == w ? (n[s - 1][1] += n[s][1], n.splice(s, 1)) : s++, b = 0, k = 0, _ = "", N = "";
                break;
            }
          n[n.length - 1][1] === "" && n.pop();
          var v = !1;
          for (s = 1; s < n.length - 1; )
            n[s - 1][0] == w && n[s + 1][0] == w && (n[s][1].substring(n[s][1].length - n[s - 1][1].length) == n[s - 1][1] ? (n[s][1] = n[s - 1][1] + n[s][1].substring(0, n[s][1].length - n[s - 1][1].length), n[s + 1][1] = n[s - 1][1] + n[s + 1][1], n.splice(s - 1, 1), v = !0) : n[s][1].substring(0, n[s + 1][1].length) == n[s + 1][1] && (n[s - 1][1] += n[s + 1][1], n[s][1] = n[s][1].substring(n[s + 1][1].length) + n[s + 1][1], n.splice(s + 1, 1), v = !0)), s++;
          v && u(n);
        }
        var l = O;
        l.INSERT = T, l.DELETE = d, l.EQUAL = w, L.exports = l;
        function a(n, s) {
          if (s === 0)
            return [w, n];
          for (var k = 0, b = 0; b < n.length; b++) {
            var _ = n[b];
            if (_[0] === d || _[0] === w) {
              var N = k + _[1].length;
              if (s === N)
                return [b + 1, n];
              if (s < N) {
                n = n.slice();
                var m = s - k, v = [_[0], _[1].slice(0, m)], g = [_[0], _[1].slice(m)];
                return n.splice(b, 1, v, g), [b + 1, n];
              } else
                k = N;
            }
          }
          throw new Error("cursor_pos is out of bounds!");
        }
        function r(n, s) {
          var k = a(n, s), b = k[1], _ = k[0], N = b[_], m = b[_ + 1];
          if (N == null)
            return n;
          if (N[0] !== w)
            return n;
          if (m != null && N[1] + m[1] === m[1] + N[1])
            return b.splice(_, 2, m, N), f(b, _, 2);
          if (m != null && m[1].indexOf(N[1]) === 0) {
            b.splice(_, 2, [m[0], N[1]], [0, N[1]]);
            var v = m[1].slice(N[1].length);
            return v.length > 0 && b.splice(_ + 2, 0, [m[0], v]), f(b, _, 3);
          } else
            return n;
        }
        function i(n) {
          for (var s = !1, k = function(m) {
            return m.charCodeAt(0) >= 56320 && m.charCodeAt(0) <= 57343;
          }, b = function(m) {
            return m.charCodeAt(m.length - 1) >= 55296 && m.charCodeAt(m.length - 1) <= 56319;
          }, _ = 2; _ < n.length; _ += 1)
            n[_ - 2][0] === w && b(n[_ - 2][1]) && n[_ - 1][0] === d && k(n[_ - 1][1]) && n[_][0] === T && k(n[_][1]) && (s = !0, n[_ - 1][1] = n[_ - 2][1].slice(-1) + n[_ - 1][1], n[_][1] = n[_ - 2][1].slice(-1) + n[_][1], n[_ - 2][1] = n[_ - 2][1].slice(0, -1));
          if (!s)
            return n;
          for (var N = [], _ = 0; _ < n.length; _ += 1)
            n[_][1].length > 0 && N.push(n[_]);
          return N;
        }
        function f(n, s, k) {
          for (var b = s + k - 1; b >= 0 && b >= s - 1; b--)
            if (b + 1 < n.length) {
              var _ = n[b], N = n[b + 1];
              _[0] === N[1] && n.splice(b, 2, [_[0], _[1] + N[1]]);
            }
          return n;
        }
      },
      function(L, h) {
        h = L.exports = typeof Object.keys == "function" ? Object.keys : d, h.shim = d;
        function d(T) {
          var w = [];
          for (var O in T)
            w.push(O);
          return w;
        }
      },
      function(L, h) {
        var d = function() {
          return Object.prototype.toString.call(arguments);
        }() == "[object Arguments]";
        h = L.exports = d ? T : w, h.supported = T;
        function T(O) {
          return Object.prototype.toString.call(O) == "[object Arguments]";
        }
        h.unsupported = w;
        function w(O) {
          return O && typeof O == "object" && typeof O.length == "number" && Object.prototype.hasOwnProperty.call(O, "callee") && !Object.prototype.propertyIsEnumerable.call(O, "callee") || !1;
        }
      },
      function(L, h) {
        var d = Object.prototype.hasOwnProperty, T = "~";
        function w() {
        }
        Object.create && (w.prototype = /* @__PURE__ */ Object.create(null), new w().__proto__ || (T = !1));
        function O(y, c, o) {
          this.fn = y, this.context = c, this.once = o || !1;
        }
        function p() {
          this._events = new w(), this._eventsCount = 0;
        }
        p.prototype.eventNames = function() {
          var c = [], o, t;
          if (this._eventsCount === 0)
            return c;
          for (t in o = this._events)
            d.call(o, t) && c.push(T ? t.slice(1) : t);
          return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(o)) : c;
        }, p.prototype.listeners = function(c, o) {
          var t = T ? T + c : c, e = this._events[t];
          if (o)
            return !!e;
          if (!e)
            return [];
          if (e.fn)
            return [e.fn];
          for (var u = 0, l = e.length, a = new Array(l); u < l; u++)
            a[u] = e[u].fn;
          return a;
        }, p.prototype.emit = function(c, o, t, e, u, l) {
          var a = T ? T + c : c;
          if (!this._events[a])
            return !1;
          var r = this._events[a], i = arguments.length, f, n;
          if (r.fn) {
            switch (r.once && this.removeListener(c, r.fn, void 0, !0), i) {
              case 1:
                return r.fn.call(r.context), !0;
              case 2:
                return r.fn.call(r.context, o), !0;
              case 3:
                return r.fn.call(r.context, o, t), !0;
              case 4:
                return r.fn.call(r.context, o, t, e), !0;
              case 5:
                return r.fn.call(r.context, o, t, e, u), !0;
              case 6:
                return r.fn.call(r.context, o, t, e, u, l), !0;
            }
            for (n = 1, f = new Array(i - 1); n < i; n++)
              f[n - 1] = arguments[n];
            r.fn.apply(r.context, f);
          } else {
            var s = r.length, k;
            for (n = 0; n < s; n++)
              switch (r[n].once && this.removeListener(c, r[n].fn, void 0, !0), i) {
                case 1:
                  r[n].fn.call(r[n].context);
                  break;
                case 2:
                  r[n].fn.call(r[n].context, o);
                  break;
                case 3:
                  r[n].fn.call(r[n].context, o, t);
                  break;
                case 4:
                  r[n].fn.call(r[n].context, o, t, e);
                  break;
                default:
                  if (!f)
                    for (k = 1, f = new Array(i - 1); k < i; k++)
                      f[k - 1] = arguments[k];
                  r[n].fn.apply(r[n].context, f);
              }
          }
          return !0;
        }, p.prototype.on = function(c, o, t) {
          var e = new O(o, t || this), u = T ? T + c : c;
          return this._events[u] ? this._events[u].fn ? this._events[u] = [this._events[u], e] : this._events[u].push(e) : (this._events[u] = e, this._eventsCount++), this;
        }, p.prototype.once = function(c, o, t) {
          var e = new O(o, t || this, !0), u = T ? T + c : c;
          return this._events[u] ? this._events[u].fn ? this._events[u] = [this._events[u], e] : this._events[u].push(e) : (this._events[u] = e, this._eventsCount++), this;
        }, p.prototype.removeListener = function(c, o, t, e) {
          var u = T ? T + c : c;
          if (!this._events[u])
            return this;
          if (!o)
            return --this._eventsCount === 0 ? this._events = new w() : delete this._events[u], this;
          var l = this._events[u];
          if (l.fn)
            l.fn === o && (!e || l.once) && (!t || l.context === t) && (--this._eventsCount === 0 ? this._events = new w() : delete this._events[u]);
          else {
            for (var a = 0, r = [], i = l.length; a < i; a++)
              (l[a].fn !== o || e && !l[a].once || t && l[a].context !== t) && r.push(l[a]);
            r.length ? this._events[u] = r.length === 1 ? r[0] : r : --this._eventsCount === 0 ? this._events = new w() : delete this._events[u];
          }
          return this;
        }, p.prototype.removeAllListeners = function(c) {
          var o;
          return c ? (o = T ? T + c : c, this._events[o] && (--this._eventsCount === 0 ? this._events = new w() : delete this._events[o])) : (this._events = new w(), this._eventsCount = 0), this;
        }, p.prototype.off = p.prototype.removeListener, p.prototype.addListener = p.prototype.on, p.prototype.setMaxListeners = function() {
          return this;
        }, p.prefixed = T, p.EventEmitter = p, typeof L < "u" && (L.exports = p);
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.matchText = h.matchSpacing = h.matchNewline = h.matchBlot = h.matchAttributor = h.default = void 0;
        var T = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(z) {
          return typeof z;
        } : function(z) {
          return z && typeof Symbol == "function" && z.constructor === Symbol && z !== Symbol.prototype ? "symbol" : typeof z;
        }, w = function() {
          function z(K, $) {
            var G = [], W = !0, tt = !1, et = void 0;
            try {
              for (var nt = K[Symbol.iterator](), st; !(W = (st = nt.next()).done) && (G.push(st.value), !($ && G.length === $)); W = !0)
                ;
            } catch (ht) {
              tt = !0, et = ht;
            } finally {
              try {
                !W && nt.return && nt.return();
              } finally {
                if (tt)
                  throw et;
              }
            }
            return G;
          }
          return function(K, $) {
            if (Array.isArray(K))
              return K;
            if (Symbol.iterator in Object(K))
              return z(K, $);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), O = function() {
          function z(K, $) {
            for (var G = 0; G < $.length; G++) {
              var W = $[G];
              W.enumerable = W.enumerable || !1, W.configurable = !0, "value" in W && (W.writable = !0), Object.defineProperty(K, W.key, W);
            }
          }
          return function(K, $, G) {
            return $ && z(K.prototype, $), G && z(K, G), K;
          };
        }(), p = d(3), y = g(p), c = d(2), o = g(c), t = d(0), e = g(t), u = d(5), l = g(u), a = d(10), r = g(a), i = d(9), f = g(i), n = d(36), s = d(37), k = d(13), b = g(k), _ = d(26), N = d(38), m = d(39), v = d(40);
        function g(z) {
          return z && z.__esModule ? z : { default: z };
        }
        function A(z, K, $) {
          return K in z ? Object.defineProperty(z, K, { value: $, enumerable: !0, configurable: !0, writable: !0 }) : z[K] = $, z;
        }
        function x(z, K) {
          if (!(z instanceof K))
            throw new TypeError("Cannot call a class as a function");
        }
        function R(z, K) {
          if (!z)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return K && (typeof K == "object" || typeof K == "function") ? K : z;
        }
        function B(z, K) {
          if (typeof K != "function" && K !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof K);
          z.prototype = Object.create(K && K.prototype, { constructor: { value: z, enumerable: !1, writable: !0, configurable: !0 } }), K && (Object.setPrototypeOf ? Object.setPrototypeOf(z, K) : z.__proto__ = K);
        }
        var C = (0, r.default)("quill:clipboard"), Z = "__ql-matcher", M = [[Node.TEXT_NODE, ut], [Node.TEXT_NODE, rt], ["br", Y], [Node.ELEMENT_NODE, rt], [Node.ELEMENT_NODE, V], [Node.ELEMENT_NODE, it], [Node.ELEMENT_NODE, H], [Node.ELEMENT_NODE, ft], ["li", J], ["b", U.bind(U, "bold")], ["i", U.bind(U, "italic")], ["style", Q]], j = [n.AlignAttribute, N.DirectionAttribute].reduce(function(z, K) {
          return z[K.keyName] = K, z;
        }, {}), E = [n.AlignStyle, s.BackgroundStyle, _.ColorStyle, N.DirectionStyle, m.FontStyle, v.SizeStyle].reduce(function(z, K) {
          return z[K.keyName] = K, z;
        }, {}), P = function(z) {
          B(K, z);
          function K($, G) {
            x(this, K);
            var W = R(this, (K.__proto__ || Object.getPrototypeOf(K)).call(this, $, G));
            return W.quill.root.addEventListener("paste", W.onPaste.bind(W)), W.container = W.quill.addContainer("ql-clipboard"), W.container.setAttribute("contenteditable", !0), W.container.setAttribute("tabindex", -1), W.matchers = [], M.concat(W.options.matchers).forEach(function(tt) {
              var et = w(tt, 2), nt = et[0], st = et[1];
              !G.matchVisual && st === it || W.addMatcher(nt, st);
            }), W;
          }
          return O(K, [{
            key: "addMatcher",
            value: function(G, W) {
              this.matchers.push([G, W]);
            }
          }, {
            key: "convert",
            value: function(G) {
              if (typeof G == "string")
                return this.container.innerHTML = G.replace(/\>\r?\n +\</g, "><"), this.convert();
              var W = this.quill.getFormat(this.quill.selection.savedRange.index);
              if (W[b.default.blotName]) {
                var tt = this.container.innerText;
                return this.container.innerHTML = "", new o.default().insert(tt, A({}, b.default.blotName, W[b.default.blotName]));
              }
              var et = this.prepareMatching(), nt = w(et, 2), st = nt[0], ht = nt[1], lt = I(this.container, st, ht);
              return D(lt, `
`) && lt.ops[lt.ops.length - 1].attributes == null && (lt = lt.compose(new o.default().retain(lt.length() - 1).delete(1))), C.log("convert", this.container.innerHTML, lt), this.container.innerHTML = "", lt;
            }
          }, {
            key: "dangerouslyPasteHTML",
            value: function(G, W) {
              var tt = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : l.default.sources.API;
              if (typeof G == "string")
                this.quill.setContents(this.convert(G), W), this.quill.setSelection(0, l.default.sources.SILENT);
              else {
                var et = this.convert(W);
                this.quill.updateContents(new o.default().retain(G).concat(et), tt), this.quill.setSelection(G + et.length(), l.default.sources.SILENT);
              }
            }
          }, {
            key: "onPaste",
            value: function(G) {
              var W = this;
              if (!(G.defaultPrevented || !this.quill.isEnabled())) {
                var tt = this.quill.getSelection(), et = new o.default().retain(tt.index), nt = this.quill.scrollingContainer.scrollTop;
                this.container.focus(), this.quill.selection.update(l.default.sources.SILENT), setTimeout(function() {
                  et = et.concat(W.convert()).delete(tt.length), W.quill.updateContents(et, l.default.sources.USER), W.quill.setSelection(et.length() - tt.length, l.default.sources.SILENT), W.quill.scrollingContainer.scrollTop = nt, W.quill.focus();
                }, 1);
              }
            }
          }, {
            key: "prepareMatching",
            value: function() {
              var G = this, W = [], tt = [];
              return this.matchers.forEach(function(et) {
                var nt = w(et, 2), st = nt[0], ht = nt[1];
                switch (st) {
                  case Node.TEXT_NODE:
                    tt.push(ht);
                    break;
                  case Node.ELEMENT_NODE:
                    W.push(ht);
                    break;
                  default:
                    [].forEach.call(G.container.querySelectorAll(st), function(lt) {
                      lt[Z] = lt[Z] || [], lt[Z].push(ht);
                    });
                    break;
                }
              }), [W, tt];
            }
          }]), K;
        }(f.default);
        P.DEFAULTS = {
          matchers: [],
          matchVisual: !0
        };
        function q(z, K, $) {
          return (typeof K > "u" ? "undefined" : T(K)) === "object" ? Object.keys(K).reduce(function(G, W) {
            return q(G, W, K[W]);
          }, z) : z.reduce(function(G, W) {
            return W.attributes && W.attributes[K] ? G.push(W) : G.insert(W.insert, (0, y.default)({}, A({}, K, $), W.attributes));
          }, new o.default());
        }
        function F(z) {
          if (z.nodeType !== Node.ELEMENT_NODE)
            return {};
          var K = "__ql-computed-style";
          return z[K] || (z[K] = window.getComputedStyle(z));
        }
        function D(z, K) {
          for (var $ = "", G = z.ops.length - 1; G >= 0 && $.length < K.length; --G) {
            var W = z.ops[G];
            if (typeof W.insert != "string")
              break;
            $ = W.insert + $;
          }
          return $.slice(-1 * K.length) === K;
        }
        function S(z) {
          if (z.childNodes.length === 0)
            return !1;
          var K = F(z);
          return ["block", "list-item"].indexOf(K.display) > -1;
        }
        function I(z, K, $) {
          return z.nodeType === z.TEXT_NODE ? $.reduce(function(G, W) {
            return W(z, G);
          }, new o.default()) : z.nodeType === z.ELEMENT_NODE ? [].reduce.call(z.childNodes || [], function(G, W) {
            var tt = I(W, K, $);
            return W.nodeType === z.ELEMENT_NODE && (tt = K.reduce(function(et, nt) {
              return nt(W, et);
            }, tt), tt = (W[Z] || []).reduce(function(et, nt) {
              return nt(W, et);
            }, tt)), G.concat(tt);
          }, new o.default()) : new o.default();
        }
        function U(z, K, $) {
          return q($, z, !0);
        }
        function H(z, K) {
          var $ = e.default.Attributor.Attribute.keys(z), G = e.default.Attributor.Class.keys(z), W = e.default.Attributor.Style.keys(z), tt = {};
          return $.concat(G).concat(W).forEach(function(et) {
            var nt = e.default.query(et, e.default.Scope.ATTRIBUTE);
            nt != null && (tt[nt.attrName] = nt.value(z), tt[nt.attrName]) || (nt = j[et], nt != null && (nt.attrName === et || nt.keyName === et) && (tt[nt.attrName] = nt.value(z) || void 0), nt = E[et], nt != null && (nt.attrName === et || nt.keyName === et) && (nt = E[et], tt[nt.attrName] = nt.value(z) || void 0));
          }), Object.keys(tt).length > 0 && (K = q(K, tt)), K;
        }
        function V(z, K) {
          var $ = e.default.query(z);
          if ($ == null)
            return K;
          if ($.prototype instanceof e.default.Embed) {
            var G = {}, W = $.value(z);
            W != null && (G[$.blotName] = W, K = new o.default().insert(G, $.formats(z)));
          } else
            typeof $.formats == "function" && (K = q(K, $.blotName, $.formats(z)));
          return K;
        }
        function Y(z, K) {
          return D(K, `
`) || K.insert(`
`), K;
        }
        function Q() {
          return new o.default();
        }
        function J(z, K) {
          var $ = e.default.query(z);
          if ($ == null || $.blotName !== "list-item" || !D(K, `
`))
            return K;
          for (var G = -1, W = z.parentNode; !W.classList.contains("ql-clipboard"); )
            (e.default.query(W) || {}).blotName === "list" && (G += 1), W = W.parentNode;
          return G <= 0 ? K : K.compose(new o.default().retain(K.length() - 1).retain(1, { indent: G }));
        }
        function rt(z, K) {
          return D(K, `
`) || (S(z) || K.length() > 0 && z.nextSibling && S(z.nextSibling)) && K.insert(`
`), K;
        }
        function it(z, K) {
          if (S(z) && z.nextElementSibling != null && !D(K, `

`)) {
            var $ = z.offsetHeight + parseFloat(F(z).marginTop) + parseFloat(F(z).marginBottom);
            z.nextElementSibling.offsetTop > z.offsetTop + $ * 1.5 && K.insert(`
`);
          }
          return K;
        }
        function ft(z, K) {
          var $ = {}, G = z.style || {};
          return G.fontStyle && F(z).fontStyle === "italic" && ($.italic = !0), G.fontWeight && (F(z).fontWeight.startsWith("bold") || parseInt(F(z).fontWeight) >= 700) && ($.bold = !0), Object.keys($).length > 0 && (K = q(K, $)), parseFloat(G.textIndent || 0) > 0 && (K = new o.default().insert("	").concat(K)), K;
        }
        function ut(z, K) {
          var $ = z.data;
          if (z.parentNode.tagName === "O:P")
            return K.insert($.trim());
          if ($.trim().length === 0 && z.parentNode.classList.contains("ql-clipboard"))
            return K;
          if (!F(z.parentNode).whiteSpace.startsWith("pre")) {
            var G = function(tt, et) {
              return et = et.replace(/[^\u00a0]/g, ""), et.length < 1 && tt ? " " : et;
            };
            $ = $.replace(/\r\n/g, " ").replace(/\n/g, " "), $ = $.replace(/\s\s+/g, G.bind(G, !0)), (z.previousSibling == null && S(z.parentNode) || z.previousSibling != null && S(z.previousSibling)) && ($ = $.replace(/^\s+/, G.bind(G, !1))), (z.nextSibling == null && S(z.parentNode) || z.nextSibling != null && S(z.nextSibling)) && ($ = $.replace(/\s+$/, G.bind(G, !1)));
          }
          return K.insert($);
        }
        h.default = P, h.matchAttributor = H, h.matchBlot = V, h.matchNewline = rt, h.matchSpacing = it, h.matchText = ut;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function u(l, a) {
            for (var r = 0; r < a.length; r++) {
              var i = a[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, a, r) {
            return a && u(l.prototype, a), r && u(l, r), l;
          };
        }(), w = function u(l, a, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, a);
          if (i === void 0) {
            var f = Object.getPrototypeOf(l);
            return f === null ? void 0 : u(f, a, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, O = d(6), p = y(O);
        function y(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function c(u, l) {
          if (!(u instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(u, l) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : u;
        }
        function t(u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          u.prototype = Object.create(l && l.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(u, l) : u.__proto__ = l);
        }
        var e = function(u) {
          t(l, u);
          function l() {
            return c(this, l), o(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
          }
          return T(l, [{
            key: "optimize",
            value: function(r) {
              w(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "optimize", this).call(this, r), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
            }
          }], [{
            key: "create",
            value: function() {
              return w(l.__proto__ || Object.getPrototypeOf(l), "create", this).call(this);
            }
          }, {
            key: "formats",
            value: function() {
              return !0;
            }
          }]), l;
        }(p.default);
        e.blotName = "bold", e.tagName = ["STRONG", "B"], h.default = e;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.addControls = h.default = void 0;
        var T = function() {
          function v(g, A) {
            var x = [], R = !0, B = !1, C = void 0;
            try {
              for (var Z = g[Symbol.iterator](), M; !(R = (M = Z.next()).done) && (x.push(M.value), !(A && x.length === A)); R = !0)
                ;
            } catch (j) {
              B = !0, C = j;
            } finally {
              try {
                !R && Z.return && Z.return();
              } finally {
                if (B)
                  throw C;
              }
            }
            return x;
          }
          return function(g, A) {
            if (Array.isArray(g))
              return g;
            if (Symbol.iterator in Object(g))
              return v(g, A);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), w = function() {
          function v(g, A) {
            for (var x = 0; x < A.length; x++) {
              var R = A[x];
              R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(g, R.key, R);
            }
          }
          return function(g, A, x) {
            return A && v(g.prototype, A), x && v(g, x), g;
          };
        }(), O = d(2), p = r(O), y = d(0), c = r(y), o = d(5), t = r(o), e = d(10), u = r(e), l = d(9), a = r(l);
        function r(v) {
          return v && v.__esModule ? v : { default: v };
        }
        function i(v, g, A) {
          return g in v ? Object.defineProperty(v, g, { value: A, enumerable: !0, configurable: !0, writable: !0 }) : v[g] = A, v;
        }
        function f(v, g) {
          if (!(v instanceof g))
            throw new TypeError("Cannot call a class as a function");
        }
        function n(v, g) {
          if (!v)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return g && (typeof g == "object" || typeof g == "function") ? g : v;
        }
        function s(v, g) {
          if (typeof g != "function" && g !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof g);
          v.prototype = Object.create(g && g.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(v, g) : v.__proto__ = g);
        }
        var k = (0, u.default)("quill:toolbar"), b = function(v) {
          s(g, v);
          function g(A, x) {
            f(this, g);
            var R = n(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this, A, x));
            if (Array.isArray(R.options.container)) {
              var B = document.createElement("div");
              N(B, R.options.container), A.container.parentNode.insertBefore(B, A.container), R.container = B;
            } else
              typeof R.options.container == "string" ? R.container = document.querySelector(R.options.container) : R.container = R.options.container;
            if (!(R.container instanceof HTMLElement)) {
              var C;
              return C = k.error("Container required for toolbar", R.options), n(R, C);
            }
            return R.container.classList.add("ql-toolbar"), R.controls = [], R.handlers = {}, Object.keys(R.options.handlers).forEach(function(Z) {
              R.addHandler(Z, R.options.handlers[Z]);
            }), [].forEach.call(R.container.querySelectorAll("button, select"), function(Z) {
              R.attach(Z);
            }), R.quill.on(t.default.events.EDITOR_CHANGE, function(Z, M) {
              Z === t.default.events.SELECTION_CHANGE && R.update(M);
            }), R.quill.on(t.default.events.SCROLL_OPTIMIZE, function() {
              var Z = R.quill.selection.getRange(), M = T(Z, 1), j = M[0];
              R.update(j);
            }), R;
          }
          return w(g, [{
            key: "addHandler",
            value: function(x, R) {
              this.handlers[x] = R;
            }
          }, {
            key: "attach",
            value: function(x) {
              var R = this, B = [].find.call(x.classList, function(Z) {
                return Z.indexOf("ql-") === 0;
              });
              if (!!B) {
                if (B = B.slice(3), x.tagName === "BUTTON" && x.setAttribute("type", "button"), this.handlers[B] == null) {
                  if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[B] == null) {
                    k.warn("ignoring attaching to disabled format", B, x);
                    return;
                  }
                  if (c.default.query(B) == null) {
                    k.warn("ignoring attaching to nonexistent format", B, x);
                    return;
                  }
                }
                var C = x.tagName === "SELECT" ? "change" : "click";
                x.addEventListener(C, function(Z) {
                  var M = void 0;
                  if (x.tagName === "SELECT") {
                    if (x.selectedIndex < 0)
                      return;
                    var j = x.options[x.selectedIndex];
                    j.hasAttribute("selected") ? M = !1 : M = j.value || !1;
                  } else
                    x.classList.contains("ql-active") ? M = !1 : M = x.value || !x.hasAttribute("value"), Z.preventDefault();
                  R.quill.focus();
                  var E = R.quill.selection.getRange(), P = T(E, 1), q = P[0];
                  if (R.handlers[B] != null)
                    R.handlers[B].call(R, M);
                  else if (c.default.query(B).prototype instanceof c.default.Embed) {
                    if (M = prompt("Enter " + B), !M)
                      return;
                    R.quill.updateContents(new p.default().retain(q.index).delete(q.length).insert(i({}, B, M)), t.default.sources.USER);
                  } else
                    R.quill.format(B, M, t.default.sources.USER);
                  R.update(q);
                }), this.controls.push([B, x]);
              }
            }
          }, {
            key: "update",
            value: function(x) {
              var R = x == null ? {} : this.quill.getFormat(x);
              this.controls.forEach(function(B) {
                var C = T(B, 2), Z = C[0], M = C[1];
                if (M.tagName === "SELECT") {
                  var j = void 0;
                  if (x == null)
                    j = null;
                  else if (R[Z] == null)
                    j = M.querySelector("option[selected]");
                  else if (!Array.isArray(R[Z])) {
                    var E = R[Z];
                    typeof E == "string" && (E = E.replace(/\"/g, '\\"')), j = M.querySelector('option[value="' + E + '"]');
                  }
                  j == null ? (M.value = "", M.selectedIndex = -1) : j.selected = !0;
                } else if (x == null)
                  M.classList.remove("ql-active");
                else if (M.hasAttribute("value")) {
                  var P = R[Z] === M.getAttribute("value") || R[Z] != null && R[Z].toString() === M.getAttribute("value") || R[Z] == null && !M.getAttribute("value");
                  M.classList.toggle("ql-active", P);
                } else
                  M.classList.toggle("ql-active", R[Z] != null);
              });
            }
          }]), g;
        }(a.default);
        b.DEFAULTS = {};
        function _(v, g, A) {
          var x = document.createElement("button");
          x.setAttribute("type", "button"), x.classList.add("ql-" + g), A != null && (x.value = A), v.appendChild(x);
        }
        function N(v, g) {
          Array.isArray(g[0]) || (g = [g]), g.forEach(function(A) {
            var x = document.createElement("span");
            x.classList.add("ql-formats"), A.forEach(function(R) {
              if (typeof R == "string")
                _(x, R);
              else {
                var B = Object.keys(R)[0], C = R[B];
                Array.isArray(C) ? m(x, B, C) : _(x, B, C);
              }
            }), v.appendChild(x);
          });
        }
        function m(v, g, A) {
          var x = document.createElement("select");
          x.classList.add("ql-" + g), A.forEach(function(R) {
            var B = document.createElement("option");
            R !== !1 ? B.setAttribute("value", R) : B.setAttribute("selected", "selected"), x.appendChild(B);
          }), v.appendChild(x);
        }
        b.DEFAULTS = {
          container: null,
          handlers: {
            clean: function() {
              var g = this, A = this.quill.getSelection();
              if (A != null)
                if (A.length == 0) {
                  var x = this.quill.getFormat();
                  Object.keys(x).forEach(function(R) {
                    c.default.query(R, c.default.Scope.INLINE) != null && g.quill.format(R, !1);
                  });
                } else
                  this.quill.removeFormat(A, t.default.sources.USER);
            },
            direction: function(g) {
              var A = this.quill.getFormat().align;
              g === "rtl" && A == null ? this.quill.format("align", "right", t.default.sources.USER) : !g && A === "right" && this.quill.format("align", !1, t.default.sources.USER), this.quill.format("direction", g, t.default.sources.USER);
            },
            indent: function(g) {
              var A = this.quill.getSelection(), x = this.quill.getFormat(A), R = parseInt(x.indent || 0);
              if (g === "+1" || g === "-1") {
                var B = g === "+1" ? 1 : -1;
                x.direction === "rtl" && (B *= -1), this.quill.format("indent", R + B, t.default.sources.USER);
              }
            },
            link: function(g) {
              g === !0 && (g = prompt("Enter link URL:")), this.quill.format("link", g, t.default.sources.USER);
            },
            list: function(g) {
              var A = this.quill.getSelection(), x = this.quill.getFormat(A);
              g === "check" ? x.list === "checked" || x.list === "unchecked" ? this.quill.format("list", !1, t.default.sources.USER) : this.quill.format("list", "unchecked", t.default.sources.USER) : this.quill.format("list", g, t.default.sources.USER);
            }
          }
        }, h.default = b, h.addControls = N;
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>';
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function u(l, a) {
            for (var r = 0; r < a.length; r++) {
              var i = a[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, a, r) {
            return a && u(l.prototype, a), r && u(l, r), l;
          };
        }(), w = function u(l, a, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, a);
          if (i === void 0) {
            var f = Object.getPrototypeOf(l);
            return f === null ? void 0 : u(f, a, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, O = d(28), p = y(O);
        function y(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function c(u, l) {
          if (!(u instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(u, l) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : u;
        }
        function t(u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          u.prototype = Object.create(l && l.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(u, l) : u.__proto__ = l);
        }
        var e = function(u) {
          t(l, u);
          function l(a, r) {
            c(this, l);
            var i = o(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, a));
            return i.label.innerHTML = r, i.container.classList.add("ql-color-picker"), [].slice.call(i.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function(f) {
              f.classList.add("ql-primary");
            }), i;
          }
          return T(l, [{
            key: "buildItem",
            value: function(r) {
              var i = w(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "buildItem", this).call(this, r);
              return i.style.backgroundColor = r.getAttribute("value") || "", i;
            }
          }, {
            key: "selectItem",
            value: function(r, i) {
              w(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "selectItem", this).call(this, r, i);
              var f = this.label.querySelector(".ql-color-label"), n = r && r.getAttribute("data-value") || "";
              f && (f.tagName === "line" ? f.style.stroke = n : f.style.fill = n);
            }
          }]), l;
        }(p.default);
        h.default = e;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function u(l, a) {
            for (var r = 0; r < a.length; r++) {
              var i = a[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, a, r) {
            return a && u(l.prototype, a), r && u(l, r), l;
          };
        }(), w = function u(l, a, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, a);
          if (i === void 0) {
            var f = Object.getPrototypeOf(l);
            return f === null ? void 0 : u(f, a, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, O = d(28), p = y(O);
        function y(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function c(u, l) {
          if (!(u instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(u, l) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : u;
        }
        function t(u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          u.prototype = Object.create(l && l.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(u, l) : u.__proto__ = l);
        }
        var e = function(u) {
          t(l, u);
          function l(a, r) {
            c(this, l);
            var i = o(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, a));
            return i.container.classList.add("ql-icon-picker"), [].forEach.call(i.container.querySelectorAll(".ql-picker-item"), function(f) {
              f.innerHTML = r[f.getAttribute("data-value") || ""];
            }), i.defaultItem = i.container.querySelector(".ql-selected"), i.selectItem(i.defaultItem), i;
          }
          return T(l, [{
            key: "selectItem",
            value: function(r, i) {
              w(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "selectItem", this).call(this, r, i), r = r || this.defaultItem, this.label.innerHTML = r.innerHTML;
            }
          }]), l;
        }(p.default);
        h.default = e;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function p(y, c) {
            for (var o = 0; o < c.length; o++) {
              var t = c[o];
              t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(y, t.key, t);
            }
          }
          return function(y, c, o) {
            return c && p(y.prototype, c), o && p(y, o), y;
          };
        }();
        function w(p, y) {
          if (!(p instanceof y))
            throw new TypeError("Cannot call a class as a function");
        }
        var O = function() {
          function p(y, c) {
            var o = this;
            w(this, p), this.quill = y, this.boundsContainer = c || document.body, this.root = y.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", function() {
              o.root.style.marginTop = -1 * o.quill.root.scrollTop + "px";
            }), this.hide();
          }
          return T(p, [{
            key: "hide",
            value: function() {
              this.root.classList.add("ql-hidden");
            }
          }, {
            key: "position",
            value: function(c) {
              var o = c.left + c.width / 2 - this.root.offsetWidth / 2, t = c.bottom + this.quill.root.scrollTop;
              this.root.style.left = o + "px", this.root.style.top = t + "px", this.root.classList.remove("ql-flip");
              var e = this.boundsContainer.getBoundingClientRect(), u = this.root.getBoundingClientRect(), l = 0;
              if (u.right > e.right && (l = e.right - u.right, this.root.style.left = o + l + "px"), u.left < e.left && (l = e.left - u.left, this.root.style.left = o + l + "px"), u.bottom > e.bottom) {
                var a = u.bottom - u.top, r = c.bottom - c.top + a;
                this.root.style.top = t - r + "px", this.root.classList.add("ql-flip");
              }
              return l;
            }
          }, {
            key: "show",
            value: function() {
              this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
            }
          }]), p;
        }();
        h.default = O;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function m(v, g) {
            var A = [], x = !0, R = !1, B = void 0;
            try {
              for (var C = v[Symbol.iterator](), Z; !(x = (Z = C.next()).done) && (A.push(Z.value), !(g && A.length === g)); x = !0)
                ;
            } catch (M) {
              R = !0, B = M;
            } finally {
              try {
                !x && C.return && C.return();
              } finally {
                if (R)
                  throw B;
              }
            }
            return A;
          }
          return function(v, g) {
            if (Array.isArray(v))
              return v;
            if (Symbol.iterator in Object(v))
              return m(v, g);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), w = function m(v, g, A) {
          v === null && (v = Function.prototype);
          var x = Object.getOwnPropertyDescriptor(v, g);
          if (x === void 0) {
            var R = Object.getPrototypeOf(v);
            return R === null ? void 0 : m(R, g, A);
          } else {
            if ("value" in x)
              return x.value;
            var B = x.get;
            return B === void 0 ? void 0 : B.call(A);
          }
        }, O = function() {
          function m(v, g) {
            for (var A = 0; A < g.length; A++) {
              var x = g[A];
              x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(v, x.key, x);
            }
          }
          return function(v, g, A) {
            return g && m(v.prototype, g), A && m(v, A), v;
          };
        }(), p = d(3), y = f(p), c = d(8), o = f(c), t = d(43), e = f(t), u = d(27), l = f(u), a = d(15), r = d(41), i = f(r);
        function f(m) {
          return m && m.__esModule ? m : { default: m };
        }
        function n(m, v) {
          if (!(m instanceof v))
            throw new TypeError("Cannot call a class as a function");
        }
        function s(m, v) {
          if (!m)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return v && (typeof v == "object" || typeof v == "function") ? v : m;
        }
        function k(m, v) {
          if (typeof v != "function" && v !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof v);
          m.prototype = Object.create(v && v.prototype, { constructor: { value: m, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(m, v) : m.__proto__ = v);
        }
        var b = [[{ header: ["1", "2", "3", !1] }], ["bold", "italic", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]], _ = function(m) {
          k(v, m);
          function v(g, A) {
            n(this, v), A.modules.toolbar != null && A.modules.toolbar.container == null && (A.modules.toolbar.container = b);
            var x = s(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this, g, A));
            return x.quill.container.classList.add("ql-snow"), x;
          }
          return O(v, [{
            key: "extendToolbar",
            value: function(A) {
              A.container.classList.add("ql-snow"), this.buildButtons([].slice.call(A.container.querySelectorAll("button")), i.default), this.buildPickers([].slice.call(A.container.querySelectorAll("select")), i.default), this.tooltip = new N(this.quill, this.options.bounds), A.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({ key: "K", shortKey: !0 }, function(x, R) {
                A.handlers.link.call(A, !R.format.link);
              });
            }
          }]), v;
        }(e.default);
        _.DEFAULTS = (0, y.default)(!0, {}, e.default.DEFAULTS, {
          modules: {
            toolbar: {
              handlers: {
                link: function(v) {
                  if (v) {
                    var g = this.quill.getSelection();
                    if (g == null || g.length == 0)
                      return;
                    var A = this.quill.getText(g);
                    /^\S+@\S+\.\S+$/.test(A) && A.indexOf("mailto:") !== 0 && (A = "mailto:" + A);
                    var x = this.quill.theme.tooltip;
                    x.edit("link", A);
                  } else
                    this.quill.format("link", !1);
                }
              }
            }
          }
        });
        var N = function(m) {
          k(v, m);
          function v(g, A) {
            n(this, v);
            var x = s(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this, g, A));
            return x.preview = x.root.querySelector("a.ql-preview"), x;
          }
          return O(v, [{
            key: "listen",
            value: function() {
              var A = this;
              w(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "listen", this).call(this), this.root.querySelector("a.ql-action").addEventListener("click", function(x) {
                A.root.classList.contains("ql-editing") ? A.save() : A.edit("link", A.preview.textContent), x.preventDefault();
              }), this.root.querySelector("a.ql-remove").addEventListener("click", function(x) {
                if (A.linkRange != null) {
                  var R = A.linkRange;
                  A.restoreFocus(), A.quill.formatText(R, "link", !1, o.default.sources.USER), delete A.linkRange;
                }
                x.preventDefault(), A.hide();
              }), this.quill.on(o.default.events.SELECTION_CHANGE, function(x, R, B) {
                if (x != null) {
                  if (x.length === 0 && B === o.default.sources.USER) {
                    var C = A.quill.scroll.descendant(l.default, x.index), Z = T(C, 2), M = Z[0], j = Z[1];
                    if (M != null) {
                      A.linkRange = new a.Range(x.index - j, M.length());
                      var E = l.default.formats(M.domNode);
                      A.preview.textContent = E, A.preview.setAttribute("href", E), A.show(), A.position(A.quill.getBounds(A.linkRange));
                      return;
                    }
                  } else
                    delete A.linkRange;
                  A.hide();
                }
              });
            }
          }, {
            key: "show",
            value: function() {
              w(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "show", this).call(this), this.root.removeAttribute("data-mode");
            }
          }]), v;
        }(t.BaseTooltip);
        N.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""), h.default = _;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = d(29), w = W(T), O = d(36), p = d(38), y = d(64), c = d(65), o = W(c), t = d(66), e = W(t), u = d(67), l = W(u), a = d(37), r = d(26), i = d(39), f = d(40), n = d(56), s = W(n), k = d(68), b = W(k), _ = d(27), N = W(_), m = d(69), v = W(m), g = d(70), A = W(g), x = d(71), R = W(x), B = d(72), C = W(B), Z = d(73), M = W(Z), j = d(13), E = W(j), P = d(74), q = W(P), F = d(75), D = W(F), S = d(57), I = W(S), U = d(41), H = W(U), V = d(28), Y = W(V), Q = d(59), J = W(Q), rt = d(60), it = W(rt), ft = d(61), ut = W(ft), z = d(108), K = W(z), $ = d(62), G = W($);
        function W(tt) {
          return tt && tt.__esModule ? tt : { default: tt };
        }
        w.default.register({
          "attributors/attribute/direction": p.DirectionAttribute,
          "attributors/class/align": O.AlignClass,
          "attributors/class/background": a.BackgroundClass,
          "attributors/class/color": r.ColorClass,
          "attributors/class/direction": p.DirectionClass,
          "attributors/class/font": i.FontClass,
          "attributors/class/size": f.SizeClass,
          "attributors/style/align": O.AlignStyle,
          "attributors/style/background": a.BackgroundStyle,
          "attributors/style/color": r.ColorStyle,
          "attributors/style/direction": p.DirectionStyle,
          "attributors/style/font": i.FontStyle,
          "attributors/style/size": f.SizeStyle
        }, !0), w.default.register({
          "formats/align": O.AlignClass,
          "formats/direction": p.DirectionClass,
          "formats/indent": y.IndentClass,
          "formats/background": a.BackgroundStyle,
          "formats/color": r.ColorStyle,
          "formats/font": i.FontClass,
          "formats/size": f.SizeClass,
          "formats/blockquote": o.default,
          "formats/code-block": E.default,
          "formats/header": e.default,
          "formats/list": l.default,
          "formats/bold": s.default,
          "formats/code": j.Code,
          "formats/italic": b.default,
          "formats/link": N.default,
          "formats/script": v.default,
          "formats/strike": A.default,
          "formats/underline": R.default,
          "formats/image": C.default,
          "formats/video": M.default,
          "formats/list/item": u.ListItem,
          "modules/formula": q.default,
          "modules/syntax": D.default,
          "modules/toolbar": I.default,
          "themes/bubble": K.default,
          "themes/snow": G.default,
          "ui/icons": H.default,
          "ui/picker": Y.default,
          "ui/icon-picker": it.default,
          "ui/color-picker": J.default,
          "ui/tooltip": ut.default
        }, !0), h.default = w.default;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.IndentClass = void 0;
        var T = function() {
          function l(a, r) {
            for (var i = 0; i < r.length; i++) {
              var f = r[i];
              f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(a, f.key, f);
            }
          }
          return function(a, r, i) {
            return r && l(a.prototype, r), i && l(a, i), a;
          };
        }(), w = function l(a, r, i) {
          a === null && (a = Function.prototype);
          var f = Object.getOwnPropertyDescriptor(a, r);
          if (f === void 0) {
            var n = Object.getPrototypeOf(a);
            return n === null ? void 0 : l(n, r, i);
          } else {
            if ("value" in f)
              return f.value;
            var s = f.get;
            return s === void 0 ? void 0 : s.call(i);
          }
        }, O = d(0), p = y(O);
        function y(l) {
          return l && l.__esModule ? l : { default: l };
        }
        function c(l, a) {
          if (!(l instanceof a))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(l, a) {
          if (!l)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return a && (typeof a == "object" || typeof a == "function") ? a : l;
        }
        function t(l, a) {
          if (typeof a != "function" && a !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof a);
          l.prototype = Object.create(a && a.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(l, a) : l.__proto__ = a);
        }
        var e = function(l) {
          t(a, l);
          function a() {
            return c(this, a), o(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
          }
          return T(a, [{
            key: "add",
            value: function(i, f) {
              if (f === "+1" || f === "-1") {
                var n = this.value(i) || 0;
                f = f === "+1" ? n + 1 : n - 1;
              }
              return f === 0 ? (this.remove(i), !0) : w(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "add", this).call(this, i, f);
            }
          }, {
            key: "canAdd",
            value: function(i, f) {
              return w(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "canAdd", this).call(this, i, f) || w(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "canAdd", this).call(this, i, parseInt(f));
            }
          }, {
            key: "value",
            value: function(i) {
              return parseInt(w(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "value", this).call(this, i)) || void 0;
            }
          }]), a;
        }(p.default.Attributor.Class), u = new e("indent", "ql-indent", {
          scope: p.default.Scope.BLOCK,
          whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
        });
        h.IndentClass = u;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = d(4), w = O(T);
        function O(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function p(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function c(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          c(e, t);
          function e() {
            return p(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(w.default);
        o.blotName = "blockquote", o.tagName = "blockquote", h.default = o;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function e(u, l) {
            for (var a = 0; a < l.length; a++) {
              var r = l[a];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(u, r.key, r);
            }
          }
          return function(u, l, a) {
            return l && e(u.prototype, l), a && e(u, a), u;
          };
        }(), w = d(4), O = p(w);
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function y(e, u) {
          if (!(e instanceof u))
            throw new TypeError("Cannot call a class as a function");
        }
        function c(e, u) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return u && (typeof u == "object" || typeof u == "function") ? u : e;
        }
        function o(e, u) {
          if (typeof u != "function" && u !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof u);
          e.prototype = Object.create(u && u.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), u && (Object.setPrototypeOf ? Object.setPrototypeOf(e, u) : e.__proto__ = u);
        }
        var t = function(e) {
          o(u, e);
          function u() {
            return y(this, u), c(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
          }
          return T(u, null, [{
            key: "formats",
            value: function(a) {
              return this.tagName.indexOf(a.tagName) + 1;
            }
          }]), u;
        }(O.default);
        t.blotName = "header", t.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"], h.default = t;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.default = h.ListItem = void 0;
        var T = function() {
          function n(s, k) {
            for (var b = 0; b < k.length; b++) {
              var _ = k[b];
              _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(s, _.key, _);
            }
          }
          return function(s, k, b) {
            return k && n(s.prototype, k), b && n(s, b), s;
          };
        }(), w = function n(s, k, b) {
          s === null && (s = Function.prototype);
          var _ = Object.getOwnPropertyDescriptor(s, k);
          if (_ === void 0) {
            var N = Object.getPrototypeOf(s);
            return N === null ? void 0 : n(N, k, b);
          } else {
            if ("value" in _)
              return _.value;
            var m = _.get;
            return m === void 0 ? void 0 : m.call(b);
          }
        }, O = d(0), p = e(O), y = d(4), c = e(y), o = d(25), t = e(o);
        function e(n) {
          return n && n.__esModule ? n : { default: n };
        }
        function u(n, s, k) {
          return s in n ? Object.defineProperty(n, s, { value: k, enumerable: !0, configurable: !0, writable: !0 }) : n[s] = k, n;
        }
        function l(n, s) {
          if (!(n instanceof s))
            throw new TypeError("Cannot call a class as a function");
        }
        function a(n, s) {
          if (!n)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return s && (typeof s == "object" || typeof s == "function") ? s : n;
        }
        function r(n, s) {
          if (typeof s != "function" && s !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof s);
          n.prototype = Object.create(s && s.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), s && (Object.setPrototypeOf ? Object.setPrototypeOf(n, s) : n.__proto__ = s);
        }
        var i = function(n) {
          r(s, n);
          function s() {
            return l(this, s), a(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments));
          }
          return T(s, [{
            key: "format",
            value: function(b, _) {
              b === f.blotName && !_ ? this.replaceWith(p.default.create(this.statics.scope)) : w(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "format", this).call(this, b, _);
            }
          }, {
            key: "remove",
            value: function() {
              this.prev == null && this.next == null ? this.parent.remove() : w(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "remove", this).call(this);
            }
          }, {
            key: "replaceWith",
            value: function(b, _) {
              return this.parent.isolate(this.offset(this.parent), this.length()), b === this.parent.statics.blotName ? (this.parent.replaceWith(b, _), this) : (this.parent.unwrap(), w(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "replaceWith", this).call(this, b, _));
            }
          }], [{
            key: "formats",
            value: function(b) {
              return b.tagName === this.tagName ? void 0 : w(s.__proto__ || Object.getPrototypeOf(s), "formats", this).call(this, b);
            }
          }]), s;
        }(c.default);
        i.blotName = "list-item", i.tagName = "LI";
        var f = function(n) {
          r(s, n), T(s, null, [{
            key: "create",
            value: function(b) {
              var _ = b === "ordered" ? "OL" : "UL", N = w(s.__proto__ || Object.getPrototypeOf(s), "create", this).call(this, _);
              return (b === "checked" || b === "unchecked") && N.setAttribute("data-checked", b === "checked"), N;
            }
          }, {
            key: "formats",
            value: function(b) {
              if (b.tagName === "OL")
                return "ordered";
              if (b.tagName === "UL")
                return b.hasAttribute("data-checked") ? b.getAttribute("data-checked") === "true" ? "checked" : "unchecked" : "bullet";
            }
          }]);
          function s(k) {
            l(this, s);
            var b = a(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, k)), _ = function(m) {
              if (m.target.parentNode === k) {
                var v = b.statics.formats(k), g = p.default.find(m.target);
                v === "checked" ? g.format("list", "unchecked") : v === "unchecked" && g.format("list", "checked");
              }
            };
            return k.addEventListener("touchstart", _), k.addEventListener("mousedown", _), b;
          }
          return T(s, [{
            key: "format",
            value: function(b, _) {
              this.children.length > 0 && this.children.tail.format(b, _);
            }
          }, {
            key: "formats",
            value: function() {
              return u({}, this.statics.blotName, this.statics.formats(this.domNode));
            }
          }, {
            key: "insertBefore",
            value: function(b, _) {
              if (b instanceof i)
                w(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "insertBefore", this).call(this, b, _);
              else {
                var N = _ == null ? this.length() : _.offset(this), m = this.split(N);
                m.parent.insertBefore(b, m);
              }
            }
          }, {
            key: "optimize",
            value: function(b) {
              w(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "optimize", this).call(this, b);
              var _ = this.next;
              _ != null && _.prev === this && _.statics.blotName === this.statics.blotName && _.domNode.tagName === this.domNode.tagName && _.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (_.moveChildren(this), _.remove());
            }
          }, {
            key: "replace",
            value: function(b) {
              if (b.statics.blotName !== this.statics.blotName) {
                var _ = p.default.create(this.statics.defaultChild);
                b.moveChildren(_), this.appendChild(_);
              }
              w(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "replace", this).call(this, b);
            }
          }]), s;
        }(t.default);
        f.blotName = "list", f.scope = p.default.Scope.BLOCK_BLOT, f.tagName = ["OL", "UL"], f.defaultChild = "list-item", f.allowedChildren = [i], h.ListItem = i, h.default = f;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = d(56), w = O(T);
        function O(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function p(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function c(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          c(e, t);
          function e() {
            return p(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(w.default);
        o.blotName = "italic", o.tagName = ["EM", "I"], h.default = o;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function u(l, a) {
            for (var r = 0; r < a.length; r++) {
              var i = a[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, a, r) {
            return a && u(l.prototype, a), r && u(l, r), l;
          };
        }(), w = function u(l, a, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, a);
          if (i === void 0) {
            var f = Object.getPrototypeOf(l);
            return f === null ? void 0 : u(f, a, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, O = d(6), p = y(O);
        function y(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function c(u, l) {
          if (!(u instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(u, l) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : u;
        }
        function t(u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          u.prototype = Object.create(l && l.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(u, l) : u.__proto__ = l);
        }
        var e = function(u) {
          t(l, u);
          function l() {
            return c(this, l), o(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
          }
          return T(l, null, [{
            key: "create",
            value: function(r) {
              return r === "super" ? document.createElement("sup") : r === "sub" ? document.createElement("sub") : w(l.__proto__ || Object.getPrototypeOf(l), "create", this).call(this, r);
            }
          }, {
            key: "formats",
            value: function(r) {
              if (r.tagName === "SUB")
                return "sub";
              if (r.tagName === "SUP")
                return "super";
            }
          }]), l;
        }(p.default);
        e.blotName = "script", e.tagName = ["SUB", "SUP"], h.default = e;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = d(6), w = O(T);
        function O(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function p(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function c(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          c(e, t);
          function e() {
            return p(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(w.default);
        o.blotName = "strike", o.tagName = "S", h.default = o;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = d(6), w = O(T);
        function O(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function p(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function c(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          c(e, t);
          function e() {
            return p(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(w.default);
        o.blotName = "underline", o.tagName = "U", h.default = o;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function a(r, i) {
            for (var f = 0; f < i.length; f++) {
              var n = i[f];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, f) {
            return i && a(r.prototype, i), f && a(r, f), r;
          };
        }(), w = function a(r, i, f) {
          r === null && (r = Function.prototype);
          var n = Object.getOwnPropertyDescriptor(r, i);
          if (n === void 0) {
            var s = Object.getPrototypeOf(r);
            return s === null ? void 0 : a(s, i, f);
          } else {
            if ("value" in n)
              return n.value;
            var k = n.get;
            return k === void 0 ? void 0 : k.call(f);
          }
        }, O = d(0), p = c(O), y = d(27);
        function c(a) {
          return a && a.__esModule ? a : { default: a };
        }
        function o(a, r) {
          if (!(a instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        function t(a, r) {
          if (!a)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r && (typeof r == "object" || typeof r == "function") ? r : a;
        }
        function e(a, r) {
          if (typeof r != "function" && r !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof r);
          a.prototype = Object.create(r && r.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(a, r) : a.__proto__ = r);
        }
        var u = ["alt", "height", "width"], l = function(a) {
          e(r, a);
          function r() {
            return o(this, r), t(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
          }
          return T(r, [{
            key: "format",
            value: function(f, n) {
              u.indexOf(f) > -1 ? n ? this.domNode.setAttribute(f, n) : this.domNode.removeAttribute(f) : w(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "format", this).call(this, f, n);
            }
          }], [{
            key: "create",
            value: function(f) {
              var n = w(r.__proto__ || Object.getPrototypeOf(r), "create", this).call(this, f);
              return typeof f == "string" && n.setAttribute("src", this.sanitize(f)), n;
            }
          }, {
            key: "formats",
            value: function(f) {
              return u.reduce(function(n, s) {
                return f.hasAttribute(s) && (n[s] = f.getAttribute(s)), n;
              }, {});
            }
          }, {
            key: "match",
            value: function(f) {
              return /\.(jpe?g|gif|png)$/.test(f) || /^data:image\/.+;base64/.test(f);
            }
          }, {
            key: "sanitize",
            value: function(f) {
              return (0, y.sanitize)(f, ["http", "https", "data"]) ? f : "//:0";
            }
          }, {
            key: "value",
            value: function(f) {
              return f.getAttribute("src");
            }
          }]), r;
        }(p.default.Embed);
        l.blotName = "image", l.tagName = "IMG", h.default = l;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        });
        var T = function() {
          function a(r, i) {
            for (var f = 0; f < i.length; f++) {
              var n = i[f];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, f) {
            return i && a(r.prototype, i), f && a(r, f), r;
          };
        }(), w = function a(r, i, f) {
          r === null && (r = Function.prototype);
          var n = Object.getOwnPropertyDescriptor(r, i);
          if (n === void 0) {
            var s = Object.getPrototypeOf(r);
            return s === null ? void 0 : a(s, i, f);
          } else {
            if ("value" in n)
              return n.value;
            var k = n.get;
            return k === void 0 ? void 0 : k.call(f);
          }
        }, O = d(4), p = d(27), y = c(p);
        function c(a) {
          return a && a.__esModule ? a : { default: a };
        }
        function o(a, r) {
          if (!(a instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        function t(a, r) {
          if (!a)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r && (typeof r == "object" || typeof r == "function") ? r : a;
        }
        function e(a, r) {
          if (typeof r != "function" && r !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof r);
          a.prototype = Object.create(r && r.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(a, r) : a.__proto__ = r);
        }
        var u = ["height", "width"], l = function(a) {
          e(r, a);
          function r() {
            return o(this, r), t(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
          }
          return T(r, [{
            key: "format",
            value: function(f, n) {
              u.indexOf(f) > -1 ? n ? this.domNode.setAttribute(f, n) : this.domNode.removeAttribute(f) : w(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "format", this).call(this, f, n);
            }
          }], [{
            key: "create",
            value: function(f) {
              var n = w(r.__proto__ || Object.getPrototypeOf(r), "create", this).call(this, f);
              return n.setAttribute("frameborder", "0"), n.setAttribute("allowfullscreen", !0), n.setAttribute("src", this.sanitize(f)), n;
            }
          }, {
            key: "formats",
            value: function(f) {
              return u.reduce(function(n, s) {
                return f.hasAttribute(s) && (n[s] = f.getAttribute(s)), n;
              }, {});
            }
          }, {
            key: "sanitize",
            value: function(f) {
              return y.default.sanitize(f);
            }
          }, {
            key: "value",
            value: function(f) {
              return f.getAttribute("src");
            }
          }]), r;
        }(O.BlockEmbed);
        l.blotName = "video", l.className = "ql-video", l.tagName = "IFRAME", h.default = l;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.default = h.FormulaBlot = void 0;
        var T = function() {
          function f(n, s) {
            for (var k = 0; k < s.length; k++) {
              var b = s[k];
              b.enumerable = b.enumerable || !1, b.configurable = !0, "value" in b && (b.writable = !0), Object.defineProperty(n, b.key, b);
            }
          }
          return function(n, s, k) {
            return s && f(n.prototype, s), k && f(n, k), n;
          };
        }(), w = function f(n, s, k) {
          n === null && (n = Function.prototype);
          var b = Object.getOwnPropertyDescriptor(n, s);
          if (b === void 0) {
            var _ = Object.getPrototypeOf(n);
            return _ === null ? void 0 : f(_, s, k);
          } else {
            if ("value" in b)
              return b.value;
            var N = b.get;
            return N === void 0 ? void 0 : N.call(k);
          }
        }, O = d(35), p = e(O), y = d(5), c = e(y), o = d(9), t = e(o);
        function e(f) {
          return f && f.__esModule ? f : { default: f };
        }
        function u(f, n) {
          if (!(f instanceof n))
            throw new TypeError("Cannot call a class as a function");
        }
        function l(f, n) {
          if (!f)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return n && (typeof n == "object" || typeof n == "function") ? n : f;
        }
        function a(f, n) {
          if (typeof n != "function" && n !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof n);
          f.prototype = Object.create(n && n.prototype, { constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 } }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(f, n) : f.__proto__ = n);
        }
        var r = function(f) {
          a(n, f);
          function n() {
            return u(this, n), l(this, (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments));
          }
          return T(n, null, [{
            key: "create",
            value: function(k) {
              var b = w(n.__proto__ || Object.getPrototypeOf(n), "create", this).call(this, k);
              return typeof k == "string" && (window.katex.render(k, b, {
                throwOnError: !1,
                errorColor: "#f00"
              }), b.setAttribute("data-value", k)), b;
            }
          }, {
            key: "value",
            value: function(k) {
              return k.getAttribute("data-value");
            }
          }]), n;
        }(p.default);
        r.blotName = "formula", r.className = "ql-formula", r.tagName = "SPAN";
        var i = function(f) {
          a(n, f), T(n, null, [{
            key: "register",
            value: function() {
              c.default.register(r, !0);
            }
          }]);
          function n() {
            u(this, n);
            var s = l(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this));
            if (window.katex == null)
              throw new Error("Formula module requires KaTeX.");
            return s;
          }
          return n;
        }(t.default);
        h.FormulaBlot = r, h.default = i;
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.default = h.CodeToken = h.CodeBlock = void 0;
        var T = function() {
          function k(b, _) {
            for (var N = 0; N < _.length; N++) {
              var m = _[N];
              m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(b, m.key, m);
            }
          }
          return function(b, _, N) {
            return _ && k(b.prototype, _), N && k(b, N), b;
          };
        }(), w = function k(b, _, N) {
          b === null && (b = Function.prototype);
          var m = Object.getOwnPropertyDescriptor(b, _);
          if (m === void 0) {
            var v = Object.getPrototypeOf(b);
            return v === null ? void 0 : k(v, _, N);
          } else {
            if ("value" in m)
              return m.value;
            var g = m.get;
            return g === void 0 ? void 0 : g.call(N);
          }
        }, O = d(0), p = l(O), y = d(5), c = l(y), o = d(9), t = l(o), e = d(13), u = l(e);
        function l(k) {
          return k && k.__esModule ? k : { default: k };
        }
        function a(k, b) {
          if (!(k instanceof b))
            throw new TypeError("Cannot call a class as a function");
        }
        function r(k, b) {
          if (!k)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return b && (typeof b == "object" || typeof b == "function") ? b : k;
        }
        function i(k, b) {
          if (typeof b != "function" && b !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof b);
          k.prototype = Object.create(b && b.prototype, { constructor: { value: k, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(k, b) : k.__proto__ = b);
        }
        var f = function(k) {
          i(b, k);
          function b() {
            return a(this, b), r(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments));
          }
          return T(b, [{
            key: "replaceWith",
            value: function(N) {
              this.domNode.textContent = this.domNode.textContent, this.attach(), w(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "replaceWith", this).call(this, N);
            }
          }, {
            key: "highlight",
            value: function(N) {
              var m = this.domNode.textContent;
              this.cachedText !== m && ((m.trim().length > 0 || this.cachedText == null) && (this.domNode.innerHTML = N(m), this.domNode.normalize(), this.attach()), this.cachedText = m);
            }
          }]), b;
        }(u.default);
        f.className = "ql-syntax";
        var n = new p.default.Attributor.Class("token", "hljs", {
          scope: p.default.Scope.INLINE
        }), s = function(k) {
          i(b, k), T(b, null, [{
            key: "register",
            value: function() {
              c.default.register(n, !0), c.default.register(f, !0);
            }
          }]);
          function b(_, N) {
            a(this, b);
            var m = r(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this, _, N));
            if (typeof m.options.highlight != "function")
              throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
            var v = null;
            return m.quill.on(c.default.events.SCROLL_OPTIMIZE, function() {
              clearTimeout(v), v = setTimeout(function() {
                m.highlight(), v = null;
              }, m.options.interval);
            }), m.highlight(), m;
          }
          return T(b, [{
            key: "highlight",
            value: function() {
              var N = this;
              if (!this.quill.selection.composing) {
                this.quill.update(c.default.sources.USER);
                var m = this.quill.getSelection();
                this.quill.scroll.descendants(f).forEach(function(v) {
                  v.highlight(N.options.highlight);
                }), this.quill.update(c.default.sources.SILENT), m != null && this.quill.setSelection(m, c.default.sources.SILENT);
              }
            }
          }]), b;
        }(t.default);
        s.DEFAULTS = {
          highlight: function() {
            return window.hljs == null ? null : function(k) {
              var b = window.hljs.highlightAuto(k);
              return b.value;
            };
          }(),
          interval: 1e3
        }, h.CodeBlock = f, h.CodeToken = n, h.default = s;
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>';
      },
      function(L, h) {
        L.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>';
      },
      function(L, h) {
        L.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>';
      },
      function(L, h) {
        L.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>';
      },
      function(L, h, d) {
        Object.defineProperty(h, "__esModule", {
          value: !0
        }), h.default = h.BubbleTooltip = void 0;
        var T = function b(_, N, m) {
          _ === null && (_ = Function.prototype);
          var v = Object.getOwnPropertyDescriptor(_, N);
          if (v === void 0) {
            var g = Object.getPrototypeOf(_);
            return g === null ? void 0 : b(g, N, m);
          } else {
            if ("value" in v)
              return v.value;
            var A = v.get;
            return A === void 0 ? void 0 : A.call(m);
          }
        }, w = function() {
          function b(_, N) {
            for (var m = 0; m < N.length; m++) {
              var v = N[m];
              v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(_, v.key, v);
            }
          }
          return function(_, N, m) {
            return N && b(_.prototype, N), m && b(_, m), _;
          };
        }(), O = d(3), p = a(O), y = d(8), c = a(y), o = d(43), t = a(o), e = d(15), u = d(41), l = a(u);
        function a(b) {
          return b && b.__esModule ? b : { default: b };
        }
        function r(b, _) {
          if (!(b instanceof _))
            throw new TypeError("Cannot call a class as a function");
        }
        function i(b, _) {
          if (!b)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return _ && (typeof _ == "object" || typeof _ == "function") ? _ : b;
        }
        function f(b, _) {
          if (typeof _ != "function" && _ !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof _);
          b.prototype = Object.create(_ && _.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), _ && (Object.setPrototypeOf ? Object.setPrototypeOf(b, _) : b.__proto__ = _);
        }
        var n = [["bold", "italic", "link"], [{ header: 1 }, { header: 2 }, "blockquote"]], s = function(b) {
          f(_, b);
          function _(N, m) {
            r(this, _), m.modules.toolbar != null && m.modules.toolbar.container == null && (m.modules.toolbar.container = n);
            var v = i(this, (_.__proto__ || Object.getPrototypeOf(_)).call(this, N, m));
            return v.quill.container.classList.add("ql-bubble"), v;
          }
          return w(_, [{
            key: "extendToolbar",
            value: function(m) {
              this.tooltip = new k(this.quill, this.options.bounds), this.tooltip.root.appendChild(m.container), this.buildButtons([].slice.call(m.container.querySelectorAll("button")), l.default), this.buildPickers([].slice.call(m.container.querySelectorAll("select")), l.default);
            }
          }]), _;
        }(t.default);
        s.DEFAULTS = (0, p.default)(!0, {}, t.default.DEFAULTS, {
          modules: {
            toolbar: {
              handlers: {
                link: function(_) {
                  _ ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1);
                }
              }
            }
          }
        });
        var k = function(b) {
          f(_, b);
          function _(N, m) {
            r(this, _);
            var v = i(this, (_.__proto__ || Object.getPrototypeOf(_)).call(this, N, m));
            return v.quill.on(c.default.events.EDITOR_CHANGE, function(g, A, x, R) {
              if (g === c.default.events.SELECTION_CHANGE)
                if (A != null && A.length > 0 && R === c.default.sources.USER) {
                  v.show(), v.root.style.left = "0px", v.root.style.width = "", v.root.style.width = v.root.offsetWidth + "px";
                  var B = v.quill.getLines(A.index, A.length);
                  if (B.length === 1)
                    v.position(v.quill.getBounds(A));
                  else {
                    var C = B[B.length - 1], Z = v.quill.getIndex(C), M = Math.min(C.length() - 1, A.index + A.length - Z), j = v.quill.getBounds(new e.Range(Z, M));
                    v.position(j);
                  }
                } else
                  document.activeElement !== v.textbox && v.quill.hasFocus() && v.hide();
            }), v;
          }
          return w(_, [{
            key: "listen",
            value: function() {
              var m = this;
              T(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "listen", this).call(this), this.root.querySelector(".ql-close").addEventListener("click", function() {
                m.root.classList.remove("ql-editing");
              }), this.quill.on(c.default.events.SCROLL_OPTIMIZE, function() {
                setTimeout(function() {
                  if (!m.root.classList.contains("ql-hidden")) {
                    var v = m.quill.getSelection();
                    v != null && m.position(m.quill.getBounds(v));
                  }
                }, 1);
              });
            }
          }, {
            key: "cancel",
            value: function() {
              this.show();
            }
          }, {
            key: "position",
            value: function(m) {
              var v = T(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "position", this).call(this, m), g = this.root.querySelector(".ql-tooltip-arrow");
              if (g.style.marginLeft = "", v === 0)
                return v;
              g.style.marginLeft = -1 * v - g.offsetWidth / 2 + "px";
            }
          }]), _;
        }(o.BaseTooltip);
        k.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""), h.BubbleTooltip = k, h.default = s;
      },
      function(L, h, d) {
        L.exports = d(63);
      }
    ]).default;
  });
})(Ot);
var Tt = dt && dt.__extends || function() {
  var ot = function(X, L) {
    return ot = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, d) {
      h.__proto__ = d;
    } || function(h, d) {
      for (var T in d)
        d.hasOwnProperty(T) && (h[T] = d[T]);
    }, ot(X, L);
  };
  return function(X, L) {
    ot(X, L);
    function h() {
      this.constructor = X;
    }
    X.prototype = L === null ? Object.create(L) : (h.prototype = L.prototype, new h());
  };
}(), yt = dt && dt.__assign || function() {
  return yt = Object.assign || function(ot) {
    for (var X, L = 1, h = arguments.length; L < h; L++) {
      X = arguments[L];
      for (var d in X)
        Object.prototype.hasOwnProperty.call(X, d) && (ot[d] = X[d]);
    }
    return ot;
  }, yt.apply(this, arguments);
}, xt = dt && dt.__spreadArrays || function() {
  for (var ot = 0, X = 0, L = arguments.length; X < L; X++)
    ot += arguments[X].length;
  for (var h = Array(ot), d = 0, X = 0; X < L; X++)
    for (var T = arguments[X], w = 0, O = T.length; w < O; w++, d++)
      h[d] = T[w];
  return h;
}, gt = dt && dt.__importDefault || function(ot) {
  return ot && ot.__esModule ? ot : { default: ot };
}, ct = gt(kt), St = gt(wt), pt = gt(At), mt = gt(Ot.exports), Pt = function(ot) {
  Tt(X, ot);
  function X(L) {
    var h = ot.call(this, L) || this;
    h.dirtyProps = [
      "modules",
      "formats",
      "bounds",
      "theme",
      "children"
    ], h.cleanProps = [
      "id",
      "className",
      "style",
      "placeholder",
      "tabIndex",
      "onChange",
      "onChangeSelection",
      "onFocus",
      "onBlur",
      "onKeyPress",
      "onKeyDown",
      "onKeyUp"
    ], h.state = {
      generation: 0
    }, h.selection = null, h.onEditorChange = function(T, w, O, p) {
      var y, c, o, t;
      T === "text-change" ? (c = (y = h).onEditorChangeText) === null || c === void 0 || c.call(y, h.editor.root.innerHTML, w, p, h.unprivilegedEditor) : T === "selection-change" && ((t = (o = h).onEditorChangeSelection) === null || t === void 0 || t.call(o, w, p, h.unprivilegedEditor));
    };
    var d = h.isControlled() ? L.value : L.defaultValue;
    return h.value = d != null ? d : "", h;
  }
  return X.prototype.validateProps = function(L) {
    var h;
    if (ct.default.Children.count(L.children) > 1)
      throw new Error("The Quill editing area can only be composed of a single React element.");
    if (ct.default.Children.count(L.children)) {
      var d = ct.default.Children.only(L.children);
      if (((h = d) === null || h === void 0 ? void 0 : h.type) === "textarea")
        throw new Error("Quill does not support editing on a <textarea>. Use a <div> instead.");
    }
    if (this.lastDeltaChangeSet && L.value === this.lastDeltaChangeSet)
      throw new Error("You are passing the `delta` object from the `onChange` event back as `value`. You most probably want `editor.getContents()` instead. See: https://github.com/zenoamaro/react-quill#using-deltas");
  }, X.prototype.shouldComponentUpdate = function(L, h) {
    var d = this, T;
    if (this.validateProps(L), !this.editor || this.state.generation !== h.generation)
      return !0;
    if ("value" in L) {
      var w = this.getEditorContents(), O = (T = L.value, T != null ? T : "");
      this.isEqualValue(O, w) || this.setEditorContents(this.editor, O);
    }
    return L.readOnly !== this.props.readOnly && this.setEditorReadOnly(this.editor, L.readOnly), xt(this.cleanProps, this.dirtyProps).some(function(p) {
      return !pt.default(L[p], d.props[p]);
    });
  }, X.prototype.shouldComponentRegenerate = function(L) {
    var h = this;
    return this.dirtyProps.some(function(d) {
      return !pt.default(L[d], h.props[d]);
    });
  }, X.prototype.componentDidMount = function() {
    this.instantiateEditor(), this.setEditorContents(this.editor, this.getEditorContents());
  }, X.prototype.componentWillUnmount = function() {
    this.destroyEditor();
  }, X.prototype.componentDidUpdate = function(L, h) {
    var d = this;
    if (this.editor && this.shouldComponentRegenerate(L)) {
      var T = this.editor.getContents(), w = this.editor.getSelection();
      this.regenerationSnapshot = { delta: T, selection: w }, this.setState({ generation: this.state.generation + 1 }), this.destroyEditor();
    }
    if (this.state.generation !== h.generation) {
      var O = this.regenerationSnapshot, T = O.delta, p = O.selection;
      delete this.regenerationSnapshot, this.instantiateEditor();
      var y = this.editor;
      y.setContents(T), bt(function() {
        return d.setEditorSelection(y, p);
      });
    }
  }, X.prototype.instantiateEditor = function() {
    this.editor ? this.hookEditor(this.editor) : this.editor = this.createEditor(this.getEditingArea(), this.getEditorConfig());
  }, X.prototype.destroyEditor = function() {
    !this.editor || this.unhookEditor(this.editor);
  }, X.prototype.isControlled = function() {
    return "value" in this.props;
  }, X.prototype.getEditorConfig = function() {
    return {
      bounds: this.props.bounds,
      formats: this.props.formats,
      modules: this.props.modules,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      scrollingContainer: this.props.scrollingContainer,
      tabIndex: this.props.tabIndex,
      theme: this.props.theme
    };
  }, X.prototype.getEditor = function() {
    if (!this.editor)
      throw new Error("Accessing non-instantiated editor");
    return this.editor;
  }, X.prototype.createEditor = function(L, h) {
    var d = new mt.default(L, h);
    return h.tabIndex != null && this.setEditorTabIndex(d, h.tabIndex), this.hookEditor(d), d;
  }, X.prototype.hookEditor = function(L) {
    this.unprivilegedEditor = this.makeUnprivilegedEditor(L), L.on("editor-change", this.onEditorChange);
  }, X.prototype.unhookEditor = function(L) {
    L.off("editor-change", this.onEditorChange);
  }, X.prototype.getEditorContents = function() {
    return this.value;
  }, X.prototype.getEditorSelection = function() {
    return this.selection;
  }, X.prototype.isDelta = function(L) {
    return L && L.ops;
  }, X.prototype.isEqualValue = function(L, h) {
    return this.isDelta(L) && this.isDelta(h) ? pt.default(L.ops, h.ops) : pt.default(L, h);
  }, X.prototype.setEditorContents = function(L, h) {
    var d = this;
    this.value = h;
    var T = this.getEditorSelection();
    typeof h == "string" ? L.setContents(L.clipboard.convert(h)) : L.setContents(h), bt(function() {
      return d.setEditorSelection(L, T);
    });
  }, X.prototype.setEditorSelection = function(L, h) {
    if (this.selection = h, h) {
      var d = L.getLength();
      h.index = Math.max(0, Math.min(h.index, d - 1)), h.length = Math.max(0, Math.min(h.length, d - 1 - h.index)), L.setSelection(h);
    }
  }, X.prototype.setEditorTabIndex = function(L, h) {
    var d, T;
    !((T = (d = L) === null || d === void 0 ? void 0 : d.scroll) === null || T === void 0) && T.domNode && (L.scroll.domNode.tabIndex = h);
  }, X.prototype.setEditorReadOnly = function(L, h) {
    h ? L.disable() : L.enable();
  }, X.prototype.makeUnprivilegedEditor = function(L) {
    var h = L;
    return {
      getHTML: function() {
        return h.root.innerHTML;
      },
      getLength: h.getLength.bind(h),
      getText: h.getText.bind(h),
      getContents: h.getContents.bind(h),
      getSelection: h.getSelection.bind(h),
      getBounds: h.getBounds.bind(h)
    };
  }, X.prototype.getEditingArea = function() {
    if (!this.editingArea)
      throw new Error("Instantiating on missing editing area");
    var L = St.default.findDOMNode(this.editingArea);
    if (!L)
      throw new Error("Cannot find element for editing area");
    if (L.nodeType === 3)
      throw new Error("Editing area cannot be a text node");
    return L;
  }, X.prototype.renderEditingArea = function() {
    var L = this, h = this.props, d = h.children, T = h.preserveWhitespace, w = this.state.generation, O = {
      key: w,
      ref: function(p) {
        L.editingArea = p;
      }
    };
    return ct.default.Children.count(d) ? ct.default.cloneElement(ct.default.Children.only(d), O) : T ? ct.default.createElement("pre", yt({}, O)) : ct.default.createElement("div", yt({}, O));
  }, X.prototype.render = function() {
    var L;
    return ct.default.createElement("div", { id: this.props.id, style: this.props.style, key: this.state.generation, className: "quill " + (L = this.props.className, L != null ? L : ""), onKeyPress: this.props.onKeyPress, onKeyDown: this.props.onKeyDown, onKeyUp: this.props.onKeyUp }, this.renderEditingArea());
  }, X.prototype.onEditorChangeText = function(L, h, d, T) {
    var w, O;
    if (!!this.editor) {
      var p = this.isDelta(this.value) ? T.getContents() : T.getHTML();
      p !== this.getEditorContents() && (this.lastDeltaChangeSet = h, this.value = p, (O = (w = this.props).onChange) === null || O === void 0 || O.call(w, L, h, d, T));
    }
  }, X.prototype.onEditorChangeSelection = function(L, h, d) {
    var T, w, O, p, y, c;
    if (!!this.editor) {
      var o = this.getEditorSelection(), t = !o && L, e = o && !L;
      pt.default(L, o) || (this.selection = L, (w = (T = this.props).onChangeSelection) === null || w === void 0 || w.call(T, L, h, d), t ? (p = (O = this.props).onFocus) === null || p === void 0 || p.call(O, L, h, d) : e && ((c = (y = this.props).onBlur) === null || c === void 0 || c.call(y, o, h, d)));
    }
  }, X.prototype.focus = function() {
    !this.editor || this.editor.focus();
  }, X.prototype.blur = function() {
    !this.editor || (this.selection = null, this.editor.blur());
  }, X.displayName = "React Quill", X.Quill = mt.default, X.defaultProps = {
    theme: "snow",
    modules: {},
    readOnly: !1
  }, X;
}(ct.default.Component);
function bt(ot) {
  Promise.resolve().then(ot);
}
var _t = Pt;
const jt = /* @__PURE__ */ Nt({
  __proto__: null,
  default: _t
}, [_t]);
export {
  jt as i
};
