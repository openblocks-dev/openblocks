import { a as $r, c as eu } from "./b1893f4d.js";
function Mr(je, Ke) {
  for (var k = 0; k < Ke.length; k++) {
    const re = Ke[k];
    if (typeof re != "string" && !Array.isArray(re)) {
      for (const Ee in re)
        if (Ee !== "default" && !(Ee in je)) {
          const xe = Object.getOwnPropertyDescriptor(re, Ee);
          xe && Object.defineProperty(je, Ee, xe.get ? xe : {
            enumerable: !0,
            get: () => re[Ee]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(je, Symbol.toStringTag, { value: "Module" }));
}
var Et = { exports: {} };
(function(je, Ke) {
  (function(k) {
    je.exports = k();
  })(function() {
    var k = (N, p) => () => (p || N((p = { exports: {} }).exports, p), p.exports), re = k((N, p) => {
      var c = function(C) {
        return C && C.Math == Math && C;
      };
      p.exports = c(typeof globalThis == "object" && globalThis) || c(typeof window == "object" && window) || c(typeof self == "object" && self) || c(typeof eu == "object" && eu) || function() {
        return this;
      }() || Function("return this")();
    }), Ee = k((N, p) => {
      p.exports = function(c) {
        try {
          return !!c();
        } catch {
          return !0;
        }
      };
    }), xe = k((N, p) => {
      var c = Ee();
      p.exports = !c(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] != 7;
      });
    }), et = k((N, p) => {
      var c = Ee();
      p.exports = !c(function() {
        var C = function() {
        }.bind();
        return typeof C != "function" || C.hasOwnProperty("prototype");
      });
    }), Ie = k((N, p) => {
      var c = et(), C = Function.prototype.call;
      p.exports = c ? C.bind(C) : function() {
        return C.apply(C, arguments);
      };
    }), tu = k((N) => {
      var p = {}.propertyIsEnumerable, c = Object.getOwnPropertyDescriptor, C = c && !p.call({ 1: 2 }, 1);
      N.f = C ? function(f) {
        var g = c(this, f);
        return !!g && g.enumerable;
      } : p;
    }), tt = k((N, p) => {
      p.exports = function(c, C) {
        return { enumerable: !(c & 1), configurable: !(c & 2), writable: !(c & 4), value: C };
      };
    }), _e = k((N, p) => {
      var c = et(), C = Function.prototype, f = C.bind, g = C.call, _ = c && f.bind(g, g);
      p.exports = c ? function(S) {
        return S && _(S);
      } : function(S) {
        return S && function() {
          return g.apply(S, arguments);
        };
      };
    }), ut = k((N, p) => {
      var c = _e(), C = c({}.toString), f = c("".slice);
      p.exports = function(g) {
        return f(C(g), 8, -1);
      };
    }), uu = k((N, p) => {
      var c = re(), C = _e(), f = Ee(), g = ut(), _ = c.Object, S = C("".split);
      p.exports = f(function() {
        return !_("z").propertyIsEnumerable(0);
      }) ? function(w) {
        return g(w) == "String" ? S(w, "") : _(w);
      } : _;
    }), mt = k((N, p) => {
      var c = re(), C = c.TypeError;
      p.exports = function(f) {
        if (f == null)
          throw C("Can't call method on " + f);
        return f;
      };
    }), rt = k((N, p) => {
      var c = uu(), C = mt();
      p.exports = function(f) {
        return c(C(f));
      };
    }), ye = k((N, p) => {
      p.exports = function(c) {
        return typeof c == "function";
      };
    }), Le = k((N, p) => {
      var c = ye();
      p.exports = function(C) {
        return typeof C == "object" ? C !== null : c(C);
      };
    }), Ue = k((N, p) => {
      var c = re(), C = ye(), f = function(g) {
        return C(g) ? g : void 0;
      };
      p.exports = function(g, _) {
        return arguments.length < 2 ? f(c[g]) : c[g] && c[g][_];
      };
    }), gt = k((N, p) => {
      var c = _e();
      p.exports = c({}.isPrototypeOf);
    }), ru = k((N, p) => {
      var c = Ue();
      p.exports = c("navigator", "userAgent") || "";
    }), nu = k((N, p) => {
      var c = re(), C = ru(), f = c.process, g = c.Deno, _ = f && f.versions || g && g.version, S = _ && _.v8, w, R;
      S && (w = S.split("."), R = w[0] > 0 && w[0] < 4 ? 1 : +(w[0] + w[1])), !R && C && (w = C.match(/Edge\/(\d+)/), (!w || w[1] >= 74) && (w = C.match(/Chrome\/(\d+)/), w && (R = +w[1]))), p.exports = R;
    }), ft = k((N, p) => {
      var c = nu(), C = Ee();
      p.exports = !!Object.getOwnPropertySymbols && !C(function() {
        var f = Symbol();
        return !String(f) || !(Object(f) instanceof Symbol) || !Symbol.sham && c && c < 41;
      });
    }), Ft = k((N, p) => {
      var c = ft();
      p.exports = c && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }), At = k((N, p) => {
      var c = re(), C = Ue(), f = ye(), g = gt(), _ = Ft(), S = c.Object;
      p.exports = _ ? function(w) {
        return typeof w == "symbol";
      } : function(w) {
        var R = C("Symbol");
        return f(R) && g(R.prototype, S(w));
      };
    }), nt = k((N, p) => {
      var c = re(), C = c.String;
      p.exports = function(f) {
        try {
          return C(f);
        } catch {
          return "Object";
        }
      };
    }), Ve = k((N, p) => {
      var c = re(), C = ye(), f = nt(), g = c.TypeError;
      p.exports = function(_) {
        if (C(_))
          return _;
        throw g(f(_) + " is not a function");
      };
    }), st = k((N, p) => {
      var c = Ve();
      p.exports = function(C, f) {
        var g = C[f];
        return g == null ? void 0 : c(g);
      };
    }), su = k((N, p) => {
      var c = re(), C = Ie(), f = ye(), g = Le(), _ = c.TypeError;
      p.exports = function(S, w) {
        var R, L;
        if (w === "string" && f(R = S.toString) && !g(L = C(R, S)) || f(R = S.valueOf) && !g(L = C(R, S)) || w !== "string" && f(R = S.toString) && !g(L = C(R, S)))
          return L;
        throw _("Can't convert object to primitive value");
      };
    }), iu = k((N, p) => {
      p.exports = !1;
    }), it = k((N, p) => {
      var c = re(), C = Object.defineProperty;
      p.exports = function(f, g) {
        try {
          C(c, f, { value: g, configurable: !0, writable: !0 });
        } catch {
          c[f] = g;
        }
        return g;
      };
    }), at = k((N, p) => {
      var c = re(), C = it(), f = "__core-js_shared__", g = c[f] || C(f, {});
      p.exports = g;
    }), vt = k((N, p) => {
      var c = iu(), C = at();
      (p.exports = function(f, g) {
        return C[f] || (C[f] = g !== void 0 ? g : {});
      })("versions", []).push({ version: "3.22.2", mode: c ? "pure" : "global", copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.22.2/LICENSE", source: "https://github.com/zloirock/core-js" });
    }), Tt = k((N, p) => {
      var c = re(), C = mt(), f = c.Object;
      p.exports = function(g) {
        return f(C(g));
      };
    }), Pe = k((N, p) => {
      var c = _e(), C = Tt(), f = c({}.hasOwnProperty);
      p.exports = Object.hasOwn || function(g, _) {
        return f(C(g), _);
      };
    }), _t = k((N, p) => {
      var c = _e(), C = 0, f = Math.random(), g = c(1 .toString);
      p.exports = function(_) {
        return "Symbol(" + (_ === void 0 ? "" : _) + ")_" + g(++C + f, 36);
      };
    }), qe = k((N, p) => {
      var c = re(), C = vt(), f = Pe(), g = _t(), _ = ft(), S = Ft(), w = C("wks"), R = c.Symbol, L = R && R.for, j = S ? R : R && R.withoutSetter || g;
      p.exports = function($) {
        if (!f(w, $) || !(_ || typeof w[$] == "string")) {
          var U = "Symbol." + $;
          _ && f(R, $) ? w[$] = R[$] : S && L ? w[$] = L(U) : w[$] = j(U);
        }
        return w[$];
      };
    }), au = k((N, p) => {
      var c = re(), C = Ie(), f = Le(), g = At(), _ = st(), S = su(), w = qe(), R = c.TypeError, L = w("toPrimitive");
      p.exports = function(j, $) {
        if (!f(j) || g(j))
          return j;
        var U = _(j, L), Y;
        if (U) {
          if ($ === void 0 && ($ = "default"), Y = C(U, j, $), !f(Y) || g(Y))
            return Y;
          throw R("Can't convert object to primitive value");
        }
        return $ === void 0 && ($ = "number"), S(j, $);
      };
    }), ot = k((N, p) => {
      var c = au(), C = At();
      p.exports = function(f) {
        var g = c(f, "string");
        return C(g) ? g : g + "";
      };
    }), ou = k((N, p) => {
      var c = re(), C = Le(), f = c.document, g = C(f) && C(f.createElement);
      p.exports = function(_) {
        return g ? f.createElement(_) : {};
      };
    }), yt = k((N, p) => {
      var c = xe(), C = Ee(), f = ou();
      p.exports = !c && !C(function() {
        return Object.defineProperty(f("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }), Bt = k((N) => {
      var p = xe(), c = Ie(), C = tu(), f = tt(), g = rt(), _ = ot(), S = Pe(), w = yt(), R = Object.getOwnPropertyDescriptor;
      N.f = p ? R : function(L, j) {
        if (L = g(L), j = _(j), w)
          try {
            return R(L, j);
          } catch {
          }
        if (S(L, j))
          return f(!c(C.f, L, j), L[j]);
      };
    }), Du = k((N, p) => {
      var c = xe(), C = Ee();
      p.exports = c && C(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype != 42;
      });
    }), $e = k((N, p) => {
      var c = re(), C = Le(), f = c.String, g = c.TypeError;
      p.exports = function(_) {
        if (C(_))
          return _;
        throw g(f(_) + " is not an object");
      };
    }), Dt = k((N) => {
      var p = re(), c = xe(), C = yt(), f = Du(), g = $e(), _ = ot(), S = p.TypeError, w = Object.defineProperty, R = Object.getOwnPropertyDescriptor, L = "enumerable", j = "configurable", $ = "writable";
      N.f = c ? f ? function(U, Y, z) {
        if (g(U), Y = _(Y), g(z), typeof U == "function" && Y === "prototype" && "value" in z && $ in z && !z[$]) {
          var H = R(U, Y);
          H && H[$] && (U[Y] = z.value, z = { configurable: j in z ? z[j] : H[j], enumerable: L in z ? z[L] : H[L], writable: !1 });
        }
        return w(U, Y, z);
      } : w : function(U, Y, z) {
        if (g(U), Y = _(Y), g(z), C)
          try {
            return w(U, Y, z);
          } catch {
          }
        if ("get" in z || "set" in z)
          throw S("Accessors not supported");
        return "value" in z && (U[Y] = z.value), U;
      };
    }), lt = k((N, p) => {
      var c = xe(), C = Dt(), f = tt();
      p.exports = c ? function(g, _, S) {
        return C.f(g, _, f(1, S));
      } : function(g, _, S) {
        return g[_] = S, g;
      };
    }), ct = k((N, p) => {
      var c = _e(), C = ye(), f = at(), g = c(Function.toString);
      C(f.inspectSource) || (f.inspectSource = function(_) {
        return g(_);
      }), p.exports = f.inspectSource;
    }), lu = k((N, p) => {
      var c = re(), C = ye(), f = ct(), g = c.WeakMap;
      p.exports = C(g) && /native code/.test(f(g));
    }), cu = k((N, p) => {
      var c = vt(), C = _t(), f = c("keys");
      p.exports = function(g) {
        return f[g] || (f[g] = C(g));
      };
    }), St = k((N, p) => {
      p.exports = {};
    }), pu = k((N, p) => {
      var c = lu(), C = re(), f = _e(), g = Le(), _ = lt(), S = Pe(), w = at(), R = cu(), L = St(), j = "Object already initialized", $ = C.TypeError, U = C.WeakMap, Y, z, H, De = function(te) {
        return H(te) ? z(te) : Y(te, {});
      }, ie = function(te) {
        return function(he) {
          var Ae;
          if (!g(he) || (Ae = z(he)).type !== te)
            throw $("Incompatible receiver, " + te + " required");
          return Ae;
        };
      };
      c || w.state ? (q = w.state || (w.state = new U()), pe = f(q.get), ve = f(q.has), Re = f(q.set), Y = function(te, he) {
        if (ve(q, te))
          throw new $(j);
        return he.facade = te, Re(q, te, he), he;
      }, z = function(te) {
        return pe(q, te) || {};
      }, H = function(te) {
        return ve(q, te);
      }) : (Ce = R("state"), L[Ce] = !0, Y = function(te, he) {
        if (S(te, Ce))
          throw new $(j);
        return he.facade = te, _(te, Ce, he), he;
      }, z = function(te) {
        return S(te, Ce) ? te[Ce] : {};
      }, H = function(te) {
        return S(te, Ce);
      });
      var q, pe, ve, Re, Ce;
      p.exports = { set: Y, get: z, has: H, enforce: De, getterFor: ie };
    }), hu = k((N, p) => {
      var c = xe(), C = Pe(), f = Function.prototype, g = c && Object.getOwnPropertyDescriptor, _ = C(f, "name"), S = _ && function() {
      }.name === "something", w = _ && (!c || c && g(f, "name").configurable);
      p.exports = { EXISTS: _, PROPER: S, CONFIGURABLE: w };
    }), du = k((N, p) => {
      var c = re(), C = ye(), f = Pe(), g = lt(), _ = it(), S = ct(), w = pu(), R = hu().CONFIGURABLE, L = w.get, j = w.enforce, $ = String(String).split("String");
      (p.exports = function(U, Y, z, H) {
        var De = H ? !!H.unsafe : !1, ie = H ? !!H.enumerable : !1, q = H ? !!H.noTargetGet : !1, pe = H && H.name !== void 0 ? H.name : Y, ve;
        if (C(z) && (String(pe).slice(0, 7) === "Symbol(" && (pe = "[" + String(pe).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), (!f(z, "name") || R && z.name !== pe) && g(z, "name", pe), ve = j(z), ve.source || (ve.source = $.join(typeof pe == "string" ? pe : ""))), U === c) {
          ie ? U[Y] = z : _(Y, z);
          return;
        } else
          De ? !q && U[Y] && (ie = !0) : delete U[Y];
        ie ? U[Y] = z : g(U, Y, z);
      })(Function.prototype, "toString", function() {
        return C(this) && L(this).source || S(this);
      });
    }), bt = k((N, p) => {
      var c = Math.ceil, C = Math.floor;
      p.exports = function(f) {
        var g = +f;
        return g !== g || g === 0 ? 0 : (g > 0 ? C : c)(g);
      };
    }), Cu = k((N, p) => {
      var c = bt(), C = Math.max, f = Math.min;
      p.exports = function(g, _) {
        var S = c(g);
        return S < 0 ? C(S + _, 0) : f(S, _);
      };
    }), Eu = k((N, p) => {
      var c = bt(), C = Math.min;
      p.exports = function(f) {
        return f > 0 ? C(c(f), 9007199254740991) : 0;
      };
    }), Ge = k((N, p) => {
      var c = Eu();
      p.exports = function(C) {
        return c(C.length);
      };
    }), mu = k((N, p) => {
      var c = rt(), C = Cu(), f = Ge(), g = function(_) {
        return function(S, w, R) {
          var L = c(S), j = f(L), $ = C(R, j), U;
          if (_ && w != w) {
            for (; j > $; )
              if (U = L[$++], U != U)
                return !0;
          } else
            for (; j > $; $++)
              if ((_ || $ in L) && L[$] === w)
                return _ || $ || 0;
          return !_ && -1;
        };
      };
      p.exports = { includes: g(!0), indexOf: g(!1) };
    }), gu = k((N, p) => {
      var c = _e(), C = Pe(), f = rt(), g = mu().indexOf, _ = St(), S = c([].push);
      p.exports = function(w, R) {
        var L = f(w), j = 0, $ = [], U;
        for (U in L)
          !C(_, U) && C(L, U) && S($, U);
        for (; R.length > j; )
          C(L, U = R[j++]) && (~g($, U) || S($, U));
        return $;
      };
    }), fu = k((N, p) => {
      p.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }), Fu = k((N) => {
      var p = gu(), c = fu(), C = c.concat("length", "prototype");
      N.f = Object.getOwnPropertyNames || function(f) {
        return p(f, C);
      };
    }), Au = k((N) => {
      N.f = Object.getOwnPropertySymbols;
    }), vu = k((N, p) => {
      var c = Ue(), C = _e(), f = Fu(), g = Au(), _ = $e(), S = C([].concat);
      p.exports = c("Reflect", "ownKeys") || function(w) {
        var R = f.f(_(w)), L = g.f;
        return L ? S(R, L(w)) : R;
      };
    }), Tu = k((N, p) => {
      var c = Pe(), C = vu(), f = Bt(), g = Dt();
      p.exports = function(_, S, w) {
        for (var R = C(S), L = g.f, j = f.f, $ = 0; $ < R.length; $++) {
          var U = R[$];
          !c(_, U) && !(w && c(w, U)) && L(_, U, j(S, U));
        }
      };
    }), _u = k((N, p) => {
      var c = Ee(), C = ye(), f = /#|\.prototype\./, g = function(L, j) {
        var $ = S[_(L)];
        return $ == R ? !0 : $ == w ? !1 : C(j) ? c(j) : !!j;
      }, _ = g.normalize = function(L) {
        return String(L).replace(f, ".").toLowerCase();
      }, S = g.data = {}, w = g.NATIVE = "N", R = g.POLYFILL = "P";
      p.exports = g;
    }), pt = k((N, p) => {
      var c = re(), C = Bt().f, f = lt(), g = du(), _ = it(), S = Tu(), w = _u();
      p.exports = function(R, L) {
        var j = R.target, $ = R.global, U = R.stat, Y, z, H, De, ie, q;
        if ($ ? z = c : U ? z = c[j] || _(j, {}) : z = (c[j] || {}).prototype, z)
          for (H in L) {
            if (ie = L[H], R.noTargetGet ? (q = C(z, H), De = q && q.value) : De = z[H], Y = w($ ? H : j + (U ? "." : "#") + H, R.forced), !Y && De !== void 0) {
              if (typeof ie == typeof De)
                continue;
              S(ie, De);
            }
            (R.sham || De && De.sham) && f(ie, "sham", !0), g(z, H, ie, R);
          }
      };
    }), yu = k(() => {
      var N = pt(), p = re();
      N({ global: !0 }, { globalThis: p });
    }), Bu = k(() => {
      yu();
    }), wt = k((N, p) => {
      var c = ut();
      p.exports = Array.isArray || function(C) {
        return c(C) == "Array";
      };
    }), xt = k((N, p) => {
      var c = _e(), C = Ve(), f = et(), g = c(c.bind);
      p.exports = function(_, S) {
        return C(_), S === void 0 ? _ : f ? g(_, S) : function() {
          return _.apply(S, arguments);
        };
      };
    }), Su = k((N, p) => {
      var c = re(), C = wt(), f = Ge(), g = xt(), _ = c.TypeError, S = function(w, R, L, j, $, U, Y, z) {
        for (var H = $, De = 0, ie = Y ? g(Y, z) : !1, q, pe; De < j; ) {
          if (De in L) {
            if (q = ie ? ie(L[De], De, R) : L[De], U > 0 && C(q))
              pe = f(q), H = S(w, R, q, pe, H, U - 1) - 1;
            else {
              if (H >= 9007199254740991)
                throw _("Exceed the acceptable array length");
              w[H] = q;
            }
            H++;
          }
          De++;
        }
        return H;
      };
      p.exports = S;
    }), bu = k((N, p) => {
      var c = qe(), C = c("toStringTag"), f = {};
      f[C] = "z", p.exports = String(f) === "[object z]";
    }), Nt = k((N, p) => {
      var c = re(), C = bu(), f = ye(), g = ut(), _ = qe(), S = _("toStringTag"), w = c.Object, R = g(function() {
        return arguments;
      }()) == "Arguments", L = function(j, $) {
        try {
          return j[$];
        } catch {
        }
      };
      p.exports = C ? g : function(j) {
        var $, U, Y;
        return j === void 0 ? "Undefined" : j === null ? "Null" : typeof (U = L($ = w(j), S)) == "string" ? U : R ? g($) : (Y = g($)) == "Object" && f($.callee) ? "Arguments" : Y;
      };
    }), wu = k((N, p) => {
      var c = _e(), C = Ee(), f = ye(), g = Nt(), _ = Ue(), S = ct(), w = function() {
      }, R = [], L = _("Reflect", "construct"), j = /^\s*(?:class|function)\b/, $ = c(j.exec), U = !j.exec(w), Y = function(H) {
        if (!f(H))
          return !1;
        try {
          return L(w, R, H), !0;
        } catch {
          return !1;
        }
      }, z = function(H) {
        if (!f(H))
          return !1;
        switch (g(H)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return U || !!$(j, S(H));
        } catch {
          return !0;
        }
      };
      z.sham = !0, p.exports = !L || C(function() {
        var H;
        return Y(Y.call) || !Y(Object) || !Y(function() {
          H = !0;
        }) || H;
      }) ? z : Y;
    }), xu = k((N, p) => {
      var c = re(), C = wt(), f = wu(), g = Le(), _ = qe(), S = _("species"), w = c.Array;
      p.exports = function(R) {
        var L;
        return C(R) && (L = R.constructor, f(L) && (L === w || C(L.prototype)) ? L = void 0 : g(L) && (L = L[S], L === null && (L = void 0))), L === void 0 ? w : L;
      };
    }), Nu = k((N, p) => {
      var c = xu();
      p.exports = function(C, f) {
        return new (c(C))(f === 0 ? 0 : f);
      };
    }), ku = k(() => {
      var N = pt(), p = Su(), c = Ve(), C = Tt(), f = Ge(), g = Nu();
      N({ target: "Array", proto: !0 }, { flatMap: function(_) {
        var S = C(this), w = f(S), R;
        return c(_), R = g(S, 0), R.length = p(R, S, S, w, 0, 1, _, arguments.length > 1 ? arguments[1] : void 0), R;
      } });
    }), kt = k((N, p) => {
      p.exports = {};
    }), Ou = k((N, p) => {
      var c = qe(), C = kt(), f = c("iterator"), g = Array.prototype;
      p.exports = function(_) {
        return _ !== void 0 && (C.Array === _ || g[f] === _);
      };
    }), Ot = k((N, p) => {
      var c = Nt(), C = st(), f = kt(), g = qe(), _ = g("iterator");
      p.exports = function(S) {
        if (S != null)
          return C(S, _) || C(S, "@@iterator") || f[c(S)];
      };
    }), Pu = k((N, p) => {
      var c = re(), C = Ie(), f = Ve(), g = $e(), _ = nt(), S = Ot(), w = c.TypeError;
      p.exports = function(R, L) {
        var j = arguments.length < 2 ? S(R) : L;
        if (f(j))
          return g(C(j, R));
        throw w(_(R) + " is not iterable");
      };
    }), Ru = k((N, p) => {
      var c = Ie(), C = $e(), f = st();
      p.exports = function(g, _, S) {
        var w, R;
        C(g);
        try {
          if (w = f(g, "return"), !w) {
            if (_ === "throw")
              throw S;
            return S;
          }
          w = c(w, g);
        } catch (L) {
          R = !0, w = L;
        }
        if (_ === "throw")
          throw S;
        if (R)
          throw w;
        return C(w), S;
      };
    }), Iu = k((N, p) => {
      var c = re(), C = xt(), f = Ie(), g = $e(), _ = nt(), S = Ou(), w = Ge(), R = gt(), L = Pu(), j = Ot(), $ = Ru(), U = c.TypeError, Y = function(H, De) {
        this.stopped = H, this.result = De;
      }, z = Y.prototype;
      p.exports = function(H, De, ie) {
        var q = ie && ie.that, pe = !!(ie && ie.AS_ENTRIES), ve = !!(ie && ie.IS_ITERATOR), Re = !!(ie && ie.INTERRUPTED), Ce = C(De, q), te, he, Ae, G, Te, Xe, He, ze = function(me) {
          return te && $(te, "normal", me), new Y(!0, me);
        }, Oe = function(me) {
          return pe ? (g(me), Re ? Ce(me[0], me[1], ze) : Ce(me[0], me[1])) : Re ? Ce(me, ze) : Ce(me);
        };
        if (ve)
          te = H;
        else {
          if (he = j(H), !he)
            throw U(_(H) + " is not iterable");
          if (S(he)) {
            for (Ae = 0, G = w(H); G > Ae; Ae++)
              if (Te = Oe(H[Ae]), Te && R(z, Te))
                return Te;
            return new Y(!1);
          }
          te = L(H, he);
        }
        for (Xe = te.next; !(He = f(Xe, te)).done; ) {
          try {
            Te = Oe(He.value);
          } catch (me) {
            $(te, "throw", me);
          }
          if (typeof Te == "object" && Te && R(z, Te))
            return Te;
        }
        return new Y(!1);
      };
    }), Lu = k((N, p) => {
      var c = ot(), C = Dt(), f = tt();
      p.exports = function(g, _, S) {
        var w = c(_);
        w in g ? C.f(g, w, f(0, S)) : g[w] = S;
      };
    }), qu = k(() => {
      var N = pt(), p = Iu(), c = Lu();
      N({ target: "Object", stat: !0 }, { fromEntries: function(C) {
        var f = {};
        return p(C, function(g, _) {
          c(f, g, _);
        }, { AS_ENTRIES: !0 }), f;
      } });
    }), ju = k((N, p) => {
      var c = ["cliName", "cliCategory", "cliDescription"], C, f, g, _, S, w;
      function R(e, u) {
        if (e == null)
          return {};
        var a = L(e, u), o, l;
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          for (l = 0; l < r.length; l++)
            o = r[l], !(u.indexOf(o) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, o) || (a[o] = e[o]));
        }
        return a;
      }
      function L(e, u) {
        if (e == null)
          return {};
        var a = {}, o = Object.keys(e), l, r;
        for (r = 0; r < o.length; r++)
          l = o[r], !(u.indexOf(l) >= 0) && (a[l] = e[l]);
        return a;
      }
      function j(e, u) {
        return u || (u = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(u) } }));
      }
      Bu(), ku(), qu();
      var $ = Object.create, U = Object.defineProperty, Y = Object.getOwnPropertyDescriptor, z = Object.getOwnPropertyNames, H = Object.getPrototypeOf, De = Object.prototype.hasOwnProperty, ie = (e, u) => function() {
        return e && (u = (0, e[z(e)[0]])(e = 0)), u;
      }, q = (e, u) => function() {
        return u || (0, e[z(e)[0]])((u = { exports: {} }).exports, u), u.exports;
      }, pe = (e, u) => {
        for (var a in u)
          U(e, a, { get: u[a], enumerable: !0 });
      }, ve = (e, u, a, o) => {
        if (u && typeof u == "object" || typeof u == "function")
          for (let l of z(u))
            !De.call(e, l) && l !== a && U(e, l, { get: () => u[l], enumerable: !(o = Y(u, l)) || o.enumerable });
        return e;
      }, Re = (e, u, a) => (a = e != null ? $(H(e)) : {}, ve(u || !e || !e.__esModule ? U(a, "default", { value: e, enumerable: !0 }) : a, e)), Ce = (e) => ve(U({}, "__esModule", { value: !0 }), e), te, he, Ae, G = ie({ "<define:process>"() {
        te = {}, he = [], Ae = { env: te, argv: he };
      } }), Te = q({ "node_modules/angular-html-parser/lib/compiler/src/chars.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 }), e.$EOF = 0, e.$BSPACE = 8, e.$TAB = 9, e.$LF = 10, e.$VTAB = 11, e.$FF = 12, e.$CR = 13, e.$SPACE = 32, e.$BANG = 33, e.$DQ = 34, e.$HASH = 35, e.$$ = 36, e.$PERCENT = 37, e.$AMPERSAND = 38, e.$SQ = 39, e.$LPAREN = 40, e.$RPAREN = 41, e.$STAR = 42, e.$PLUS = 43, e.$COMMA = 44, e.$MINUS = 45, e.$PERIOD = 46, e.$SLASH = 47, e.$COLON = 58, e.$SEMICOLON = 59, e.$LT = 60, e.$EQ = 61, e.$GT = 62, e.$QUESTION = 63, e.$0 = 48, e.$7 = 55, e.$9 = 57, e.$A = 65, e.$E = 69, e.$F = 70, e.$X = 88, e.$Z = 90, e.$LBRACKET = 91, e.$BACKSLASH = 92, e.$RBRACKET = 93, e.$CARET = 94, e.$_ = 95, e.$a = 97, e.$b = 98, e.$e = 101, e.$f = 102, e.$n = 110, e.$r = 114, e.$t = 116, e.$u = 117, e.$v = 118, e.$x = 120, e.$z = 122, e.$LBRACE = 123, e.$BAR = 124, e.$RBRACE = 125, e.$NBSP = 160, e.$PIPE = 124, e.$TILDA = 126, e.$AT = 64, e.$BT = 96;
        function u(E) {
          return E >= e.$TAB && E <= e.$SPACE || E == e.$NBSP;
        }
        e.isWhitespace = u;
        function a(E) {
          return e.$0 <= E && E <= e.$9;
        }
        e.isDigit = a;
        function o(E) {
          return E >= e.$a && E <= e.$z || E >= e.$A && E <= e.$Z;
        }
        e.isAsciiLetter = o;
        function l(E) {
          return E >= e.$a && E <= e.$f || E >= e.$A && E <= e.$F || a(E);
        }
        e.isAsciiHexDigit = l;
        function r(E) {
          return E === e.$LF || E === e.$CR;
        }
        e.isNewLine = r;
        function i(E) {
          return e.$0 <= E && E <= e.$7;
        }
        e.isOctalDigit = i;
      } }), Xe = q({ "node_modules/angular-html-parser/lib/compiler/src/aot/static_symbol.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = class {
          constructor(o, l, r) {
            this.filePath = o, this.name = l, this.members = r;
          }
          assertNoMembers() {
            if (this.members.length)
              throw new Error("Illegal state: symbol without members expected, but got ".concat(JSON.stringify(this), "."));
          }
        };
        e.StaticSymbol = u;
        var a = class {
          constructor() {
            this.cache = /* @__PURE__ */ new Map();
          }
          get(o, l, r) {
            r = r || [];
            let i = r.length ? ".".concat(r.join(".")) : "", E = '"'.concat(o, '".').concat(l).concat(i), m = this.cache.get(E);
            return m || (m = new u(o, l, r), this.cache.set(E, m)), m;
          }
        };
        e.StaticSymbolCache = a;
      } }), He = q({ "node_modules/angular-html-parser/lib/compiler/src/util.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = /-+([a-z0-9])/g;
        function a(n) {
          return n.replace(u, function() {
            for (var A = arguments.length, h = new Array(A), B = 0; B < A; B++)
              h[B] = arguments[B];
            return h[1].toUpperCase();
          });
        }
        e.dashCaseToCamelCase = a;
        function o(n, A) {
          return r(n, ":", A);
        }
        e.splitAtColon = o;
        function l(n, A) {
          return r(n, ".", A);
        }
        e.splitAtPeriod = l;
        function r(n, A, h) {
          let B = n.indexOf(A);
          return B == -1 ? h : [n.slice(0, B).trim(), n.slice(B + 1).trim()];
        }
        function i(n, A, h) {
          return Array.isArray(n) ? A.visitArray(n, h) : x(n) ? A.visitStringMap(n, h) : n == null || typeof n == "string" || typeof n == "number" || typeof n == "boolean" ? A.visitPrimitive(n, h) : A.visitOther(n, h);
        }
        e.visitValue = i;
        function E(n) {
          return n != null;
        }
        e.isDefined = E;
        function m(n) {
          return n === void 0 ? null : n;
        }
        e.noUndefined = m;
        var P = class {
          visitArray(n, A) {
            return n.map((h) => i(h, this, A));
          }
          visitStringMap(n, A) {
            let h = {};
            return Object.keys(n).forEach((B) => {
              h[B] = i(n[B], this, A);
            }), h;
          }
          visitPrimitive(n, A) {
            return n;
          }
          visitOther(n, A) {
            return n;
          }
        };
        e.ValueTransformer = P, e.SyncAsync = { assertSync: (n) => {
          if (y(n))
            throw new Error("Illegal state: value cannot be a promise");
          return n;
        }, then: (n, A) => y(n) ? n.then(A) : A(n), all: (n) => n.some(y) ? Promise.all(n) : n };
        function s(n) {
          throw new Error("Internal Error: ".concat(n));
        }
        e.error = s;
        function D(n, A) {
          let h = Error(n);
          return h[d] = !0, A && (h[v] = A), h;
        }
        e.syntaxError = D;
        var d = "ngSyntaxError", v = "ngParseErrors";
        function F(n) {
          return n[d];
        }
        e.isSyntaxError = F;
        function T(n) {
          return n[v] || [];
        }
        e.getParseErrors = T;
        function I(n) {
          return n.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
        }
        e.escapeRegExp = I;
        var W = Object.getPrototypeOf({});
        function x(n) {
          return typeof n == "object" && n !== null && Object.getPrototypeOf(n) === W;
        }
        function X(n) {
          let A = "";
          for (let h = 0; h < n.length; h++) {
            let B = n.charCodeAt(h);
            if (B >= 55296 && B <= 56319 && n.length > h + 1) {
              let K = n.charCodeAt(h + 1);
              K >= 56320 && K <= 57343 && (h++, B = (B - 55296 << 10) + K - 56320 + 65536);
            }
            B <= 127 ? A += String.fromCharCode(B) : B <= 2047 ? A += String.fromCharCode(B >> 6 & 31 | 192, B & 63 | 128) : B <= 65535 ? A += String.fromCharCode(B >> 12 | 224, B >> 6 & 63 | 128, B & 63 | 128) : B <= 2097151 && (A += String.fromCharCode(B >> 18 & 7 | 240, B >> 12 & 63 | 128, B >> 6 & 63 | 128, B & 63 | 128));
          }
          return A;
        }
        e.utf8Encode = X;
        function J(n) {
          if (typeof n == "string")
            return n;
          if (n instanceof Array)
            return "[" + n.map(J).join(", ") + "]";
          if (n == null)
            return "" + n;
          if (n.overriddenName)
            return "".concat(n.overriddenName);
          if (n.name)
            return "".concat(n.name);
          if (!n.toString)
            return "object";
          let A = n.toString();
          if (A == null)
            return "" + A;
          let h = A.indexOf(`
`);
          return h === -1 ? A : A.substring(0, h);
        }
        e.stringify = J;
        function ae(n) {
          return typeof n == "function" && n.hasOwnProperty("__forward_ref__") ? n() : n;
        }
        e.resolveForwardRef = ae;
        function y(n) {
          return !!n && typeof n.then == "function";
        }
        e.isPromise = y;
        var Q = class {
          constructor(n) {
            this.full = n;
            let A = n.split(".");
            this.major = A[0], this.minor = A[1], this.patch = A.slice(2).join(".");
          }
        };
        e.Version = Q;
        var Z = typeof window < "u" && window, ee = typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self, se = typeof globalThis < "u" && globalThis, t = se || Z || ee;
        e.global = t;
      } }), ze = q({ "node_modules/angular-html-parser/lib/compiler/src/compile_metadata.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = Xe(), a = He(), o = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/;
        function l(h) {
          return h.replace(/\W/g, "_");
        }
        e.sanitizeIdentifier = l;
        var r = 0;
        function i(h) {
          if (!h || !h.reference)
            return null;
          let B = h.reference;
          if (B instanceof u.StaticSymbol)
            return B.name;
          if (B.__anonymousType)
            return B.__anonymousType;
          let K = a.stringify(B);
          return K.indexOf("(") >= 0 ? (K = "anonymous_".concat(r++), B.__anonymousType = K) : K = l(K), K;
        }
        e.identifierName = i;
        function E(h) {
          let B = h.reference;
          return B instanceof u.StaticSymbol ? B.filePath : "./".concat(a.stringify(B));
        }
        e.identifierModuleUrl = E;
        function m(h, B) {
          return "View_".concat(i({ reference: h }), "_").concat(B);
        }
        e.viewClassName = m;
        function P(h) {
          return "RenderType_".concat(i({ reference: h }));
        }
        e.rendererTypeName = P;
        function s(h) {
          return "HostView_".concat(i({ reference: h }));
        }
        e.hostViewClassName = s;
        function D(h) {
          return "".concat(i({ reference: h }), "NgFactory");
        }
        e.componentFactoryName = D;
        var d;
        (function(h) {
          h[h.Pipe = 0] = "Pipe", h[h.Directive = 1] = "Directive", h[h.NgModule = 2] = "NgModule", h[h.Injectable = 3] = "Injectable";
        })(d = e.CompileSummaryKind || (e.CompileSummaryKind = {}));
        function v(h) {
          return h.value != null ? l(h.value) : i(h.identifier);
        }
        e.tokenName = v;
        function F(h) {
          return h.identifier != null ? h.identifier.reference : h.value;
        }
        e.tokenReference = F;
        var T = class {
          constructor() {
            let { moduleUrl: h, styles: B, styleUrls: K } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            this.moduleUrl = h || null, this.styles = y(B), this.styleUrls = y(K);
          }
        };
        e.CompileStylesheetMetadata = T;
        var I = class {
          constructor(h) {
            let { encapsulation: B, template: K, templateUrl: ne, htmlAst: de, styles: ce, styleUrls: ge, externalStylesheets: fe, animations: Be, ngContentSelectors: Se, interpolation: be, isInline: b, preserveWhitespaces: O } = h;
            if (this.encapsulation = B, this.template = K, this.templateUrl = ne, this.htmlAst = de, this.styles = y(ce), this.styleUrls = y(ge), this.externalStylesheets = y(fe), this.animations = Be ? Z(Be) : [], this.ngContentSelectors = Se || [], be && be.length != 2)
              throw new Error("'interpolation' should have a start and an end symbol.");
            this.interpolation = be, this.isInline = b, this.preserveWhitespaces = O;
          }
          toSummary() {
            return { ngContentSelectors: this.ngContentSelectors, encapsulation: this.encapsulation, styles: this.styles, animations: this.animations };
          }
        };
        e.CompileTemplateMetadata = I;
        var W = class {
          static create(h) {
            let { isHost: B, type: K, isComponent: ne, selector: de, exportAs: ce, changeDetection: ge, inputs: fe, outputs: Be, host: Se, providers: be, viewProviders: b, queries: O, guards: M, viewQueries: V, entryComponents: ue, template: oe, componentViewType: le, rendererType: Fe, componentFactory: Ne } = h, Je = {}, Ze = {}, Jt = {};
            Se != null && Object.keys(Se).forEach((we) => {
              let ke = Se[we], Me = we.match(o);
              Me === null ? Jt[we] = ke : Me[1] != null ? Ze[Me[1]] = ke : Me[2] != null && (Je[Me[2]] = ke);
            });
            let Zt = {};
            fe != null && fe.forEach((we) => {
              let ke = a.splitAtColon(we, [we, we]);
              Zt[ke[0]] = ke[1];
            });
            let Kt = {};
            return Be != null && Be.forEach((we) => {
              let ke = a.splitAtColon(we, [we, we]);
              Kt[ke[0]] = ke[1];
            }), new W({ isHost: B, type: K, isComponent: !!ne, selector: de, exportAs: ce, changeDetection: ge, inputs: Zt, outputs: Kt, hostListeners: Je, hostProperties: Ze, hostAttributes: Jt, providers: be, viewProviders: b, queries: O, guards: M, viewQueries: V, entryComponents: ue, template: oe, componentViewType: le, rendererType: Fe, componentFactory: Ne });
          }
          constructor(h) {
            let { isHost: B, type: K, isComponent: ne, selector: de, exportAs: ce, changeDetection: ge, inputs: fe, outputs: Be, hostListeners: Se, hostProperties: be, hostAttributes: b, providers: O, viewProviders: M, queries: V, guards: ue, viewQueries: oe, entryComponents: le, template: Fe, componentViewType: Ne, rendererType: Je, componentFactory: Ze } = h;
            this.isHost = !!B, this.type = K, this.isComponent = ne, this.selector = de, this.exportAs = ce, this.changeDetection = ge, this.inputs = fe, this.outputs = Be, this.hostListeners = Se, this.hostProperties = be, this.hostAttributes = b, this.providers = y(O), this.viewProviders = y(M), this.queries = y(V), this.guards = ue, this.viewQueries = y(oe), this.entryComponents = y(le), this.template = Fe, this.componentViewType = Ne, this.rendererType = Je, this.componentFactory = Ze;
          }
          toSummary() {
            return { summaryKind: d.Directive, type: this.type, isComponent: this.isComponent, selector: this.selector, exportAs: this.exportAs, inputs: this.inputs, outputs: this.outputs, hostListeners: this.hostListeners, hostProperties: this.hostProperties, hostAttributes: this.hostAttributes, providers: this.providers, viewProviders: this.viewProviders, queries: this.queries, guards: this.guards, viewQueries: this.viewQueries, entryComponents: this.entryComponents, changeDetection: this.changeDetection, template: this.template && this.template.toSummary(), componentViewType: this.componentViewType, rendererType: this.rendererType, componentFactory: this.componentFactory };
          }
        };
        e.CompileDirectiveMetadata = W;
        var x = class {
          constructor(h) {
            let { type: B, name: K, pure: ne } = h;
            this.type = B, this.name = K, this.pure = !!ne;
          }
          toSummary() {
            return { summaryKind: d.Pipe, type: this.type, name: this.name, pure: this.pure };
          }
        };
        e.CompilePipeMetadata = x;
        var X = class {
        };
        e.CompileShallowModuleMetadata = X;
        var J = class {
          constructor(h) {
            let { type: B, providers: K, declaredDirectives: ne, exportedDirectives: de, declaredPipes: ce, exportedPipes: ge, entryComponents: fe, bootstrapComponents: Be, importedModules: Se, exportedModules: be, schemas: b, transitiveModule: O, id: M } = h;
            this.type = B || null, this.declaredDirectives = y(ne), this.exportedDirectives = y(de), this.declaredPipes = y(ce), this.exportedPipes = y(ge), this.providers = y(K), this.entryComponents = y(fe), this.bootstrapComponents = y(Be), this.importedModules = y(Se), this.exportedModules = y(be), this.schemas = y(b), this.id = M || null, this.transitiveModule = O || null;
          }
          toSummary() {
            let h = this.transitiveModule;
            return { summaryKind: d.NgModule, type: this.type, entryComponents: h.entryComponents, providers: h.providers, modules: h.modules, exportedDirectives: h.exportedDirectives, exportedPipes: h.exportedPipes };
          }
        };
        e.CompileNgModuleMetadata = J;
        var ae = class {
          constructor() {
            this.directivesSet = /* @__PURE__ */ new Set(), this.directives = [], this.exportedDirectivesSet = /* @__PURE__ */ new Set(), this.exportedDirectives = [], this.pipesSet = /* @__PURE__ */ new Set(), this.pipes = [], this.exportedPipesSet = /* @__PURE__ */ new Set(), this.exportedPipes = [], this.modulesSet = /* @__PURE__ */ new Set(), this.modules = [], this.entryComponentsSet = /* @__PURE__ */ new Set(), this.entryComponents = [], this.providers = [];
          }
          addProvider(h, B) {
            this.providers.push({ provider: h, module: B });
          }
          addDirective(h) {
            this.directivesSet.has(h.reference) || (this.directivesSet.add(h.reference), this.directives.push(h));
          }
          addExportedDirective(h) {
            this.exportedDirectivesSet.has(h.reference) || (this.exportedDirectivesSet.add(h.reference), this.exportedDirectives.push(h));
          }
          addPipe(h) {
            this.pipesSet.has(h.reference) || (this.pipesSet.add(h.reference), this.pipes.push(h));
          }
          addExportedPipe(h) {
            this.exportedPipesSet.has(h.reference) || (this.exportedPipesSet.add(h.reference), this.exportedPipes.push(h));
          }
          addModule(h) {
            this.modulesSet.has(h.reference) || (this.modulesSet.add(h.reference), this.modules.push(h));
          }
          addEntryComponent(h) {
            this.entryComponentsSet.has(h.componentType) || (this.entryComponentsSet.add(h.componentType), this.entryComponents.push(h));
          }
        };
        e.TransitiveCompileNgModuleMetadata = ae;
        function y(h) {
          return h || [];
        }
        var Q = class {
          constructor(h, B) {
            let { useClass: K, useValue: ne, useExisting: de, useFactory: ce, deps: ge, multi: fe } = B;
            this.token = h, this.useClass = K || null, this.useValue = ne, this.useExisting = de, this.useFactory = ce || null, this.dependencies = ge || null, this.multi = !!fe;
          }
        };
        e.ProviderMeta = Q;
        function Z(h) {
          return h.reduce((B, K) => {
            let ne = Array.isArray(K) ? Z(K) : K;
            return B.concat(ne);
          }, []);
        }
        e.flatten = Z;
        function ee(h) {
          return h.replace(/(\w+:\/\/[\w:-]+)?(\/+)?/, "ng:///");
        }
        function se(h, B, K) {
          let ne;
          return K.isInline ? B.type.reference instanceof u.StaticSymbol ? ne = "".concat(B.type.reference.filePath, ".").concat(B.type.reference.name, ".html") : ne = "".concat(i(h), "/").concat(i(B.type), ".html") : ne = K.templateUrl, B.type.reference instanceof u.StaticSymbol ? ne : ee(ne);
        }
        e.templateSourceUrl = se;
        function t(h, B) {
          let K = h.moduleUrl.split(/\/\\/g), ne = K[K.length - 1];
          return ee("css/".concat(B).concat(ne, ".ngstyle.js"));
        }
        e.sharedStylesheetJitUrl = t;
        function n(h) {
          return ee("".concat(i(h.type), "/module.ngfactory.js"));
        }
        e.ngModuleJitUrl = n;
        function A(h, B) {
          return ee("".concat(i(h), "/").concat(i(B.type), ".ngfactory.js"));
        }
        e.templateJitUrl = A;
      } }), Oe = q({ "node_modules/angular-html-parser/lib/compiler/src/parse_util.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = Te(), a = ze(), o = class {
          constructor(s, D, d, v) {
            this.file = s, this.offset = D, this.line = d, this.col = v;
          }
          toString() {
            return this.offset != null ? "".concat(this.file.url, "@").concat(this.line, ":").concat(this.col) : this.file.url;
          }
          moveBy(s) {
            let D = this.file.content, d = D.length, v = this.offset, F = this.line, T = this.col;
            for (; v > 0 && s < 0; )
              if (v--, s++, D.charCodeAt(v) == u.$LF) {
                F--;
                let I = D.substr(0, v - 1).lastIndexOf(String.fromCharCode(u.$LF));
                T = I > 0 ? v - I : v;
              } else
                T--;
            for (; v < d && s > 0; ) {
              let I = D.charCodeAt(v);
              v++, s--, I == u.$LF ? (F++, T = 0) : T++;
            }
            return new o(this.file, v, F, T);
          }
          getContext(s, D) {
            let d = this.file.content, v = this.offset;
            if (v != null) {
              v > d.length - 1 && (v = d.length - 1);
              let F = v, T = 0, I = 0;
              for (; T < s && v > 0 && (v--, T++, !(d[v] == `
` && ++I == D)); )
                ;
              for (T = 0, I = 0; T < s && F < d.length - 1 && (F++, T++, !(d[F] == `
` && ++I == D)); )
                ;
              return { before: d.substring(v, this.offset), after: d.substring(this.offset, F + 1) };
            }
            return null;
          }
        };
        e.ParseLocation = o;
        var l = class {
          constructor(s, D) {
            this.content = s, this.url = D;
          }
        };
        e.ParseSourceFile = l;
        var r = class {
          constructor(s, D) {
            let d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
            this.start = s, this.end = D, this.details = d;
          }
          toString() {
            return this.start.file.content.substring(this.start.offset, this.end.offset);
          }
        };
        e.ParseSourceSpan = r, e.EMPTY_PARSE_LOCATION = new o(new l("", ""), 0, 0, 0), e.EMPTY_SOURCE_SPAN = new r(e.EMPTY_PARSE_LOCATION, e.EMPTY_PARSE_LOCATION);
        var i;
        (function(s) {
          s[s.WARNING = 0] = "WARNING", s[s.ERROR = 1] = "ERROR";
        })(i = e.ParseErrorLevel || (e.ParseErrorLevel = {}));
        var E = class {
          constructor(s, D) {
            let d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : i.ERROR;
            this.span = s, this.msg = D, this.level = d;
          }
          contextualMessage() {
            let s = this.span.start.getContext(100, 3);
            return s ? "".concat(this.msg, ' ("').concat(s.before, "[").concat(i[this.level], " ->]").concat(s.after, '")') : this.msg;
          }
          toString() {
            let s = this.span.details ? ", ".concat(this.span.details) : "";
            return "".concat(this.contextualMessage(), ": ").concat(this.span.start).concat(s);
          }
        };
        e.ParseError = E;
        function m(s, D) {
          let d = a.identifierModuleUrl(D), v = d != null ? "in ".concat(s, " ").concat(a.identifierName(D), " in ").concat(d) : "in ".concat(s, " ").concat(a.identifierName(D)), F = new l("", v);
          return new r(new o(F, -1, -1, -1), new o(F, -1, -1, -1));
        }
        e.typeSourceSpan = m;
        function P(s, D, d) {
          let v = "in ".concat(s, " ").concat(D, " in ").concat(d), F = new l("", v);
          return new r(new o(F, -1, -1, -1), new o(F, -1, -1, -1));
        }
        e.r3JitTypeSourceSpan = P;
      } }), me = q({ "src/utils/front-matter/parse.js"(e, u) {
        G();
        var a = new RegExp("^(?<startDelimiter>-{3}|\\+{3})(?<language>[^\\n]*)\\n(?:|(?<value>.*?)\\n)(?<endDelimiter>\\k<startDelimiter>|\\.{3})[^\\S\\n]*(?:\\n|$)", "s");
        function o(l) {
          let r = l.match(a);
          if (!r)
            return { content: l };
          let { startDelimiter: i, language: E, value: m = "", endDelimiter: P } = r.groups, s = E.trim() || "yaml";
          if (i === "+++" && (s = "toml"), s !== "yaml" && i !== P)
            return { content: l };
          let [D] = r;
          return { frontMatter: { type: "front-matter", lang: s, value: m, startDelimiter: i, endDelimiter: P, raw: D.replace(/\n$/, "") }, content: D.replace(/[^\n]/g, " ") + l.slice(D.length) };
        }
        u.exports = o;
      } }), Pt = q({ "src/utils/get-last.js"(e, u) {
        G();
        var a = (o) => o[o.length - 1];
        u.exports = a;
      } }), $u = q({ "src/common/parser-create-error.js"(e, u) {
        G();
        function a(o, l) {
          let r = new SyntaxError(o + " (" + l.start.line + ":" + l.start.column + ")");
          return r.loc = l, r;
        }
        u.exports = a;
      } }), Rt = {};
      pe(Rt, { default: () => Mu });
      function Mu(e) {
        if (typeof e != "string")
          throw new TypeError("Expected a string");
        return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
      }
      var Uu = ie({ "node_modules/escape-string-regexp/index.js"() {
        G();
      } }), It = q({ "node_modules/semver/internal/debug.js"(e, u) {
        G();
        var a = typeof Ae == "object" && Ae.env && Ae.env.NODE_DEBUG && /\bsemver\b/i.test(Ae.env.NODE_DEBUG) ? function() {
          for (var o = arguments.length, l = new Array(o), r = 0; r < o; r++)
            l[r] = arguments[r];
          return console.error("SEMVER", ...l);
        } : () => {
        };
        u.exports = a;
      } }), Lt = q({ "node_modules/semver/internal/constants.js"(e, u) {
        G();
        var a = "2.0.0", o = 256, l = Number.MAX_SAFE_INTEGER || 9007199254740991, r = 16;
        u.exports = { SEMVER_SPEC_VERSION: a, MAX_LENGTH: o, MAX_SAFE_INTEGER: l, MAX_SAFE_COMPONENT_LENGTH: r };
      } }), Vu = q({ "node_modules/semver/internal/re.js"(e, u) {
        G();
        var { MAX_SAFE_COMPONENT_LENGTH: a } = Lt(), o = It();
        e = u.exports = {};
        var l = e.re = [], r = e.src = [], i = e.t = {}, E = 0, m = (P, s, D) => {
          let d = E++;
          o(P, d, s), i[P] = d, r[d] = s, l[d] = new RegExp(s, D ? "g" : void 0);
        };
        m("NUMERICIDENTIFIER", "0|[1-9]\\d*"), m("NUMERICIDENTIFIERLOOSE", "[0-9]+"), m("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"), m("MAINVERSION", "(".concat(r[i.NUMERICIDENTIFIER], ")\\.(").concat(r[i.NUMERICIDENTIFIER], ")\\.(").concat(r[i.NUMERICIDENTIFIER], ")")), m("MAINVERSIONLOOSE", "(".concat(r[i.NUMERICIDENTIFIERLOOSE], ")\\.(").concat(r[i.NUMERICIDENTIFIERLOOSE], ")\\.(").concat(r[i.NUMERICIDENTIFIERLOOSE], ")")), m("PRERELEASEIDENTIFIER", "(?:".concat(r[i.NUMERICIDENTIFIER], "|").concat(r[i.NONNUMERICIDENTIFIER], ")")), m("PRERELEASEIDENTIFIERLOOSE", "(?:".concat(r[i.NUMERICIDENTIFIERLOOSE], "|").concat(r[i.NONNUMERICIDENTIFIER], ")")), m("PRERELEASE", "(?:-(".concat(r[i.PRERELEASEIDENTIFIER], "(?:\\.").concat(r[i.PRERELEASEIDENTIFIER], ")*))")), m("PRERELEASELOOSE", "(?:-?(".concat(r[i.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(r[i.PRERELEASEIDENTIFIERLOOSE], ")*))")), m("BUILDIDENTIFIER", "[0-9A-Za-z-]+"), m("BUILD", "(?:\\+(".concat(r[i.BUILDIDENTIFIER], "(?:\\.").concat(r[i.BUILDIDENTIFIER], ")*))")), m("FULLPLAIN", "v?".concat(r[i.MAINVERSION]).concat(r[i.PRERELEASE], "?").concat(r[i.BUILD], "?")), m("FULL", "^".concat(r[i.FULLPLAIN], "$")), m("LOOSEPLAIN", "[v=\\s]*".concat(r[i.MAINVERSIONLOOSE]).concat(r[i.PRERELEASELOOSE], "?").concat(r[i.BUILD], "?")), m("LOOSE", "^".concat(r[i.LOOSEPLAIN], "$")), m("GTLT", "((?:<|>)?=?)"), m("XRANGEIDENTIFIERLOOSE", "".concat(r[i.NUMERICIDENTIFIERLOOSE], "|x|X|\\*")), m("XRANGEIDENTIFIER", "".concat(r[i.NUMERICIDENTIFIER], "|x|X|\\*")), m("XRANGEPLAIN", "[v=\\s]*(".concat(r[i.XRANGEIDENTIFIER], ")(?:\\.(").concat(r[i.XRANGEIDENTIFIER], ")(?:\\.(").concat(r[i.XRANGEIDENTIFIER], ")(?:").concat(r[i.PRERELEASE], ")?").concat(r[i.BUILD], "?)?)?")), m("XRANGEPLAINLOOSE", "[v=\\s]*(".concat(r[i.XRANGEIDENTIFIERLOOSE], ")(?:\\.(").concat(r[i.XRANGEIDENTIFIERLOOSE], ")(?:\\.(").concat(r[i.XRANGEIDENTIFIERLOOSE], ")(?:").concat(r[i.PRERELEASELOOSE], ")?").concat(r[i.BUILD], "?)?)?")), m("XRANGE", "^".concat(r[i.GTLT], "\\s*").concat(r[i.XRANGEPLAIN], "$")), m("XRANGELOOSE", "^".concat(r[i.GTLT], "\\s*").concat(r[i.XRANGEPLAINLOOSE], "$")), m("COERCE", "(^|[^\\d])(\\d{1,".concat(a, "})(?:\\.(\\d{1,").concat(a, "}))?(?:\\.(\\d{1,").concat(a, "}))?(?:$|[^\\d])")), m("COERCERTL", r[i.COERCE], !0), m("LONETILDE", "(?:~>?)"), m("TILDETRIM", "(\\s*)".concat(r[i.LONETILDE], "\\s+"), !0), e.tildeTrimReplace = "$1~", m("TILDE", "^".concat(r[i.LONETILDE]).concat(r[i.XRANGEPLAIN], "$")), m("TILDELOOSE", "^".concat(r[i.LONETILDE]).concat(r[i.XRANGEPLAINLOOSE], "$")), m("LONECARET", "(?:\\^)"), m("CARETTRIM", "(\\s*)".concat(r[i.LONECARET], "\\s+"), !0), e.caretTrimReplace = "$1^", m("CARET", "^".concat(r[i.LONECARET]).concat(r[i.XRANGEPLAIN], "$")), m("CARETLOOSE", "^".concat(r[i.LONECARET]).concat(r[i.XRANGEPLAINLOOSE], "$")), m("COMPARATORLOOSE", "^".concat(r[i.GTLT], "\\s*(").concat(r[i.LOOSEPLAIN], ")$|^$")), m("COMPARATOR", "^".concat(r[i.GTLT], "\\s*(").concat(r[i.FULLPLAIN], ")$|^$")), m("COMPARATORTRIM", "(\\s*)".concat(r[i.GTLT], "\\s*(").concat(r[i.LOOSEPLAIN], "|").concat(r[i.XRANGEPLAIN], ")"), !0), e.comparatorTrimReplace = "$1$2$3", m("HYPHENRANGE", "^\\s*(".concat(r[i.XRANGEPLAIN], ")\\s+-\\s+(").concat(r[i.XRANGEPLAIN], ")\\s*$")), m("HYPHENRANGELOOSE", "^\\s*(".concat(r[i.XRANGEPLAINLOOSE], ")\\s+-\\s+(").concat(r[i.XRANGEPLAINLOOSE], ")\\s*$")), m("STAR", "(<|>)?=?\\s*\\*"), m("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), m("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
      } }), Gu = q({ "node_modules/semver/internal/parse-options.js"(e, u) {
        G();
        var a = ["includePrerelease", "loose", "rtl"], o = (l) => l ? typeof l != "object" ? { loose: !0 } : a.filter((r) => l[r]).reduce((r, i) => (r[i] = !0, r), {}) : {};
        u.exports = o;
      } }), Xu = q({ "node_modules/semver/internal/identifiers.js"(e, u) {
        G();
        var a = /^[0-9]+$/, o = (r, i) => {
          let E = a.test(r), m = a.test(i);
          return E && m && (r = +r, i = +i), r === i ? 0 : E && !m ? -1 : m && !E ? 1 : r < i ? -1 : 1;
        }, l = (r, i) => o(i, r);
        u.exports = { compareIdentifiers: o, rcompareIdentifiers: l };
      } }), Hu = q({ "node_modules/semver/classes/semver.js"(e, u) {
        G();
        var a = It(), { MAX_LENGTH: o, MAX_SAFE_INTEGER: l } = Lt(), { re: r, t: i } = Vu(), E = Gu(), { compareIdentifiers: m } = Xu(), P = class {
          constructor(s, D) {
            if (D = E(D), s instanceof P) {
              if (s.loose === !!D.loose && s.includePrerelease === !!D.includePrerelease)
                return s;
              s = s.version;
            } else if (typeof s != "string")
              throw new TypeError("Invalid Version: ".concat(s));
            if (s.length > o)
              throw new TypeError("version is longer than ".concat(o, " characters"));
            a("SemVer", s, D), this.options = D, this.loose = !!D.loose, this.includePrerelease = !!D.includePrerelease;
            let d = s.trim().match(D.loose ? r[i.LOOSE] : r[i.FULL]);
            if (!d)
              throw new TypeError("Invalid Version: ".concat(s));
            if (this.raw = s, this.major = +d[1], this.minor = +d[2], this.patch = +d[3], this.major > l || this.major < 0)
              throw new TypeError("Invalid major version");
            if (this.minor > l || this.minor < 0)
              throw new TypeError("Invalid minor version");
            if (this.patch > l || this.patch < 0)
              throw new TypeError("Invalid patch version");
            d[4] ? this.prerelease = d[4].split(".").map((v) => {
              if (/^[0-9]+$/.test(v)) {
                let F = +v;
                if (F >= 0 && F < l)
                  return F;
              }
              return v;
            }) : this.prerelease = [], this.build = d[5] ? d[5].split(".") : [], this.format();
          }
          format() {
            return this.version = "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch), this.prerelease.length && (this.version += "-".concat(this.prerelease.join("."))), this.version;
          }
          toString() {
            return this.version;
          }
          compare(s) {
            if (a("SemVer.compare", this.version, this.options, s), !(s instanceof P)) {
              if (typeof s == "string" && s === this.version)
                return 0;
              s = new P(s, this.options);
            }
            return s.version === this.version ? 0 : this.compareMain(s) || this.comparePre(s);
          }
          compareMain(s) {
            return s instanceof P || (s = new P(s, this.options)), m(this.major, s.major) || m(this.minor, s.minor) || m(this.patch, s.patch);
          }
          comparePre(s) {
            if (s instanceof P || (s = new P(s, this.options)), this.prerelease.length && !s.prerelease.length)
              return -1;
            if (!this.prerelease.length && s.prerelease.length)
              return 1;
            if (!this.prerelease.length && !s.prerelease.length)
              return 0;
            let D = 0;
            do {
              let d = this.prerelease[D], v = s.prerelease[D];
              if (a("prerelease compare", D, d, v), d === void 0 && v === void 0)
                return 0;
              if (v === void 0)
                return 1;
              if (d === void 0)
                return -1;
              if (d !== v)
                return m(d, v);
            } while (++D);
          }
          compareBuild(s) {
            s instanceof P || (s = new P(s, this.options));
            let D = 0;
            do {
              let d = this.build[D], v = s.build[D];
              if (a("prerelease compare", D, d, v), d === void 0 && v === void 0)
                return 0;
              if (v === void 0)
                return 1;
              if (d === void 0)
                return -1;
              if (d !== v)
                return m(d, v);
            } while (++D);
          }
          inc(s, D) {
            switch (s) {
              case "premajor":
                this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", D);
                break;
              case "preminor":
                this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", D);
                break;
              case "prepatch":
                this.prerelease.length = 0, this.inc("patch", D), this.inc("pre", D);
                break;
              case "prerelease":
                this.prerelease.length === 0 && this.inc("patch", D), this.inc("pre", D);
                break;
              case "major":
                (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
                break;
              case "minor":
                (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
                break;
              case "patch":
                this.prerelease.length === 0 && this.patch++, this.prerelease = [];
                break;
              case "pre":
                if (this.prerelease.length === 0)
                  this.prerelease = [0];
                else {
                  let d = this.prerelease.length;
                  for (; --d >= 0; )
                    typeof this.prerelease[d] == "number" && (this.prerelease[d]++, d = -2);
                  d === -1 && this.prerelease.push(0);
                }
                D && (m(this.prerelease[0], D) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = [D, 0]) : this.prerelease = [D, 0]);
                break;
              default:
                throw new Error("invalid increment argument: ".concat(s));
            }
            return this.format(), this.raw = this.version, this;
          }
        };
        u.exports = P;
      } }), ht = q({ "node_modules/semver/functions/compare.js"(e, u) {
        G();
        var a = Hu(), o = (l, r, i) => new a(l, i).compare(new a(r, i));
        u.exports = o;
      } }), zu = q({ "node_modules/semver/functions/lt.js"(e, u) {
        G();
        var a = ht(), o = (l, r, i) => a(l, r, i) < 0;
        u.exports = o;
      } }), Wu = q({ "node_modules/semver/functions/gte.js"(e, u) {
        G();
        var a = ht(), o = (l, r, i) => a(l, r, i) >= 0;
        u.exports = o;
      } }), Qu = q({ "src/utils/arrayify.js"(e, u) {
        G(), u.exports = (a, o) => Object.entries(a).map((l) => {
          let [r, i] = l;
          return Object.assign({ [o]: r }, i);
        });
      } }), Yu = q({ "package.json"(e, u) {
        u.exports = { version: "2.7.0" };
      } }), Ju = q({ "node_modules/outdent/lib/index.js"(e, u) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 }), e.outdent = void 0;
        function a() {
          for (var x = [], X = 0; X < arguments.length; X++)
            x[X] = arguments[X];
        }
        function o() {
          return typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : l();
        }
        function l() {
          return { add: a, delete: a, get: a, set: a, has: function(x) {
            return !1;
          } };
        }
        var r = Object.prototype.hasOwnProperty, i = function(x, X) {
          return r.call(x, X);
        };
        function E(x, X) {
          for (var J in X)
            i(X, J) && (x[J] = X[J]);
          return x;
        }
        var m = /^[ \t]*(?:\r\n|\r|\n)/, P = /(?:\r\n|\r|\n)[ \t]*$/, s = /^(?:[\r\n]|$)/, D = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/, d = /^[ \t]*[\r\n][ \t\r\n]*$/;
        function v(x, X, J) {
          var ae = 0, y = x[0].match(D);
          y && (ae = y[1].length);
          var Q = "(\\r\\n|\\r|\\n).{0," + ae + "}", Z = new RegExp(Q, "g");
          X && (x = x.slice(1));
          var ee = J.newline, se = J.trimLeadingNewline, t = J.trimTrailingNewline, n = typeof ee == "string", A = x.length, h = x.map(function(B, K) {
            return B = B.replace(Z, "$1"), K === 0 && se && (B = B.replace(m, "")), K === A - 1 && t && (B = B.replace(P, "")), n && (B = B.replace(/\r\n|\n|\r/g, function(ne) {
              return ee;
            })), B;
          });
          return h;
        }
        function F(x, X) {
          for (var J = "", ae = 0, y = x.length; ae < y; ae++)
            J += x[ae], ae < y - 1 && (J += X[ae]);
          return J;
        }
        function T(x) {
          return i(x, "raw") && i(x, "length");
        }
        function I(x) {
          var X = o(), J = o();
          function ae(Q) {
            for (var Z = [], ee = 1; ee < arguments.length; ee++)
              Z[ee - 1] = arguments[ee];
            if (T(Q)) {
              var se = Q, t = (Z[0] === ae || Z[0] === W) && d.test(se[0]) && s.test(se[1]), n = t ? J : X, A = n.get(se);
              if (A || (A = v(se, t, x), n.set(se, A)), Z.length === 0)
                return A[0];
              var h = F(A, t ? Z.slice(1) : Z);
              return h;
            } else
              return I(E(E({}, x), Q || {}));
          }
          var y = E(ae, { string: function(Q) {
            return v([Q], !1, x)[0];
          } });
          return y;
        }
        var W = I({ trimLeadingNewline: !0, trimTrailingNewline: !0 });
        if (e.outdent = W, e.default = W, typeof u < "u")
          try {
            u.exports = W, Object.defineProperty(W, "__esModule", { value: !0 }), W.default = W, W.outdent = W;
          } catch {
          }
      } }), Zu = q({ "src/main/core-options.js"(e, u) {
        G();
        var { outdent: a } = Ju(), o = "Config", l = "Editor", r = "Format", i = "Other", E = "Output", m = "Global", P = "Special", s = { cursorOffset: { since: "1.4.0", category: P, type: "int", default: -1, range: { start: -1, end: Number.POSITIVE_INFINITY, step: 1 }, description: a(C || (C = j([`
      Print (to stderr) where a cursor at the given position would move to after formatting.
      This option cannot be used with --range-start and --range-end.
    `]))), cliCategory: l }, endOfLine: { since: "1.15.0", category: m, type: "choice", default: [{ since: "1.15.0", value: "auto" }, { since: "2.0.0", value: "lf" }], description: "Which end of line characters to apply.", choices: [{ value: "lf", description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos" }, { value: "crlf", description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows" }, { value: "cr", description: "Carriage Return character only (\\r), used very rarely" }, { value: "auto", description: a(f || (f = j([`
          Maintain existing
          (mixed values within one file are normalised by looking at what's used after the first line)
        `]))) }] }, filepath: { since: "1.4.0", category: P, type: "path", description: "Specify the input filepath. This will be used to do parser inference.", cliName: "stdin-filepath", cliCategory: i, cliDescription: "Path to the file to pretend that stdin comes from." }, insertPragma: { since: "1.8.0", category: P, type: "boolean", default: !1, description: "Insert @format pragma into file's first docblock comment.", cliCategory: i }, parser: { since: "0.0.10", category: m, type: "choice", default: [{ since: "0.0.10", value: "babylon" }, { since: "1.13.0", value: void 0 }], description: "Which parser to use.", exception: (D) => typeof D == "string" || typeof D == "function", choices: [{ value: "flow", description: "Flow" }, { value: "babel", since: "1.16.0", description: "JavaScript" }, { value: "babel-flow", since: "1.16.0", description: "Flow" }, { value: "babel-ts", since: "2.0.0", description: "TypeScript" }, { value: "typescript", since: "1.4.0", description: "TypeScript" }, { value: "acorn", since: "2.6.0", description: "JavaScript" }, { value: "espree", since: "2.2.0", description: "JavaScript" }, { value: "meriyah", since: "2.2.0", description: "JavaScript" }, { value: "css", since: "1.7.1", description: "CSS" }, { value: "less", since: "1.7.1", description: "Less" }, { value: "scss", since: "1.7.1", description: "SCSS" }, { value: "json", since: "1.5.0", description: "JSON" }, { value: "json5", since: "1.13.0", description: "JSON5" }, { value: "json-stringify", since: "1.13.0", description: "JSON.stringify" }, { value: "graphql", since: "1.5.0", description: "GraphQL" }, { value: "markdown", since: "1.8.0", description: "Markdown" }, { value: "mdx", since: "1.15.0", description: "MDX" }, { value: "vue", since: "1.10.0", description: "Vue" }, { value: "yaml", since: "1.14.0", description: "YAML" }, { value: "glimmer", since: "2.3.0", description: "Ember / Handlebars" }, { value: "html", since: "1.15.0", description: "HTML" }, { value: "angular", since: "1.15.0", description: "Angular" }, { value: "lwc", since: "1.17.0", description: "Lightning Web Components" }] }, plugins: { since: "1.10.0", type: "path", array: !0, default: [{ value: [] }], category: m, description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.", exception: (D) => typeof D == "string" || typeof D == "object", cliName: "plugin", cliCategory: o }, pluginSearchDirs: { since: "1.13.0", type: "path", array: !0, default: [{ value: [] }], category: m, description: a(g || (g = j([`
      Custom directory that contains prettier plugins in node_modules subdirectory.
      Overrides default behavior when plugins are searched relatively to the location of Prettier.
      Multiple values are accepted.
    `]))), exception: (D) => typeof D == "string" || typeof D == "object", cliName: "plugin-search-dir", cliCategory: o }, printWidth: { since: "0.0.0", category: m, type: "int", default: 80, description: "The line length where Prettier will try wrap.", range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 } }, rangeEnd: { since: "1.4.0", category: P, type: "int", default: Number.POSITIVE_INFINITY, range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 }, description: a(_ || (_ = j([`
      Format code ending at a given character offset (exclusive).
      The range will extend forwards to the end of the selected statement.
      This option cannot be used with --cursor-offset.
    `]))), cliCategory: l }, rangeStart: { since: "1.4.0", category: P, type: "int", default: 0, range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 }, description: a(S || (S = j([`
      Format code starting at a given character offset.
      The range will extend backwards to the start of the first line containing the selected statement.
      This option cannot be used with --cursor-offset.
    `]))), cliCategory: l }, requirePragma: { since: "1.7.0", category: P, type: "boolean", default: !1, description: a(w || (w = j([`
      Require either '@prettier' or '@format' to be present in the file's first docblock comment
      in order for it to be formatted.
    `]))), cliCategory: i }, tabWidth: { type: "int", category: m, default: 2, description: "Number of spaces per indentation level.", range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 } }, useTabs: { since: "1.0.0", category: m, type: "boolean", default: !1, description: "Indent with tabs instead of spaces." }, embeddedLanguageFormatting: { since: "2.1.0", category: m, type: "choice", default: [{ since: "2.1.0", value: "auto" }], description: "Control how Prettier formats quoted code embedded in the file.", choices: [{ value: "auto", description: "Format embedded code if Prettier can automatically identify it." }, { value: "off", description: "Never automatically format embedded code." }] } };
        u.exports = { CATEGORY_CONFIG: o, CATEGORY_EDITOR: l, CATEGORY_FORMAT: r, CATEGORY_OTHER: i, CATEGORY_OUTPUT: E, CATEGORY_GLOBAL: m, CATEGORY_SPECIAL: P, options: s };
      } }), Ku = q({ "src/main/support.js"(e, u) {
        G();
        var a = { compare: ht(), lt: zu(), gte: Wu() }, o = Qu(), l = Yu().version, r = Zu().options;
        function i() {
          let { plugins: m = [], showUnreleased: P = !1, showDeprecated: s = !1, showInternal: D = !1 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, d = l.split("-", 1)[0], v = m.flatMap((x) => x.languages || []).filter(T), F = o(Object.assign({}, ...m.map((x) => {
            let { options: X } = x;
            return X;
          }), r), "name").filter((x) => T(x) && I(x)).sort((x, X) => x.name === X.name ? 0 : x.name < X.name ? -1 : 1).map(W).map((x) => {
            x = Object.assign({}, x), Array.isArray(x.default) && (x.default = x.default.length === 1 ? x.default[0].value : x.default.filter(T).sort((J, ae) => a.compare(ae.since, J.since))[0].value), Array.isArray(x.choices) && (x.choices = x.choices.filter((J) => T(J) && I(J)), x.name === "parser" && E(x, v, m));
            let X = Object.fromEntries(m.filter((J) => J.defaultOptions && J.defaultOptions[x.name] !== void 0).map((J) => [J.name, J.defaultOptions[x.name]]));
            return Object.assign(Object.assign({}, x), {}, { pluginDefaults: X });
          });
          return { languages: v, options: F };
          function T(x) {
            return P || !("since" in x) || x.since && a.gte(d, x.since);
          }
          function I(x) {
            return s || !("deprecated" in x) || x.deprecated && a.lt(d, x.deprecated);
          }
          function W(x) {
            return D ? x : R(x, c);
          }
        }
        function E(m, P, s) {
          let D = new Set(m.choices.map((d) => d.value));
          for (let d of P)
            if (d.parsers) {
              for (let v of d.parsers)
                if (!D.has(v)) {
                  D.add(v);
                  let F = s.find((I) => I.parsers && I.parsers[v]), T = d.name;
                  F && F.name && (T += " (plugin: ".concat(F.name, ")")), m.choices.push({ value: v, description: T });
                }
            }
        }
        u.exports = { getSupportInfo: i };
      } }), er = q({ "src/utils/is-non-empty-array.js"(e, u) {
        G();
        function a(o) {
          return Array.isArray(o) && o.length > 0;
        }
        u.exports = a;
      } });
      function tr() {
        let { onlyFirst: e = !1 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(u, e ? void 0 : "g");
      }
      var ur = ie({ "node_modules/strip-ansi/node_modules/ansi-regex/index.js"() {
        G();
      } });
      function rr(e) {
        if (typeof e != "string")
          throw new TypeError("Expected a `string`, got `".concat(typeof e, "`"));
        return e.replace(tr(), "");
      }
      var nr = ie({ "node_modules/strip-ansi/index.js"() {
        G(), ur();
      } });
      function sr(e) {
        return Number.isInteger(e) ? e >= 4352 && (e <= 4447 || e === 9001 || e === 9002 || 11904 <= e && e <= 12871 && e !== 12351 || 12880 <= e && e <= 19903 || 19968 <= e && e <= 42182 || 43360 <= e && e <= 43388 || 44032 <= e && e <= 55203 || 63744 <= e && e <= 64255 || 65040 <= e && e <= 65049 || 65072 <= e && e <= 65131 || 65281 <= e && e <= 65376 || 65504 <= e && e <= 65510 || 110592 <= e && e <= 110593 || 127488 <= e && e <= 127569 || 131072 <= e && e <= 262141) : !1;
      }
      var ir = ie({ "node_modules/is-fullwidth-code-point/index.js"() {
        G();
      } }), ar = q({ "node_modules/emoji-regex/index.js"(e, u) {
        G(), u.exports = function() {
          return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
        };
      } }), qt = {};
      pe(qt, { default: () => or });
      function or(e) {
        if (typeof e != "string" || e.length === 0 || (e = rr(e), e.length === 0))
          return 0;
        e = e.replace((0, jt.default)(), "  ");
        let u = 0;
        for (let a = 0; a < e.length; a++) {
          let o = e.codePointAt(a);
          o <= 31 || o >= 127 && o <= 159 || o >= 768 && o <= 879 || (o > 65535 && a++, u += sr(o) ? 2 : 1);
        }
        return u;
      }
      var jt, Dr = ie({ "node_modules/string-width/index.js"() {
        G(), nr(), ir(), jt = Re(ar());
      } }), lr = q({ "src/utils/get-string-width.js"(e, u) {
        G();
        var a = (Dr(), Ce(qt)).default, o = /[^\x20-\x7F]/;
        function l(r) {
          return r ? o.test(r) ? a(r) : r.length : 0;
        }
        u.exports = l;
      } }), dt = q({ "src/utils/text/skip.js"(e, u) {
        G();
        function a(E) {
          return (m, P, s) => {
            let D = s && s.backwards;
            if (P === !1)
              return !1;
            let { length: d } = m, v = P;
            for (; v >= 0 && v < d; ) {
              let F = m.charAt(v);
              if (E instanceof RegExp) {
                if (!E.test(F))
                  return v;
              } else if (!E.includes(F))
                return v;
              D ? v-- : v++;
            }
            return v === -1 || v === d ? v : !1;
          };
        }
        var o = a(/\s/), l = a(" 	"), r = a(",; 	"), i = a(/[^\n\r]/);
        u.exports = { skipWhitespace: o, skipSpaces: l, skipToLineEnd: r, skipEverythingButNewLine: i };
      } }), $t = q({ "src/utils/text/skip-inline-comment.js"(e, u) {
        G();
        function a(o, l) {
          if (l === !1)
            return !1;
          if (o.charAt(l) === "/" && o.charAt(l + 1) === "*") {
            for (let r = l + 2; r < o.length; ++r)
              if (o.charAt(r) === "*" && o.charAt(r + 1) === "/")
                return r + 2;
          }
          return l;
        }
        u.exports = a;
      } }), Mt = q({ "src/utils/text/skip-trailing-comment.js"(e, u) {
        G();
        var { skipEverythingButNewLine: a } = dt();
        function o(l, r) {
          return r === !1 ? !1 : l.charAt(r) === "/" && l.charAt(r + 1) === "/" ? a(l, r) : r;
        }
        u.exports = o;
      } }), Ut = q({ "src/utils/text/skip-newline.js"(e, u) {
        G();
        function a(o, l, r) {
          let i = r && r.backwards;
          if (l === !1)
            return !1;
          let E = o.charAt(l);
          if (i) {
            if (o.charAt(l - 1) === "\r" && E === `
`)
              return l - 2;
            if (E === `
` || E === "\r" || E === "\u2028" || E === "\u2029")
              return l - 1;
          } else {
            if (E === "\r" && o.charAt(l + 1) === `
`)
              return l + 2;
            if (E === `
` || E === "\r" || E === "\u2028" || E === "\u2029")
              return l + 1;
          }
          return l;
        }
        u.exports = a;
      } }), cr = q({ "src/utils/text/get-next-non-space-non-comment-character-index-with-start-index.js"(e, u) {
        G();
        var a = $t(), o = Ut(), l = Mt(), { skipSpaces: r } = dt();
        function i(E, m) {
          let P = null, s = m;
          for (; s !== P; )
            P = s, s = r(E, s), s = a(E, s), s = l(E, s), s = o(E, s);
          return s;
        }
        u.exports = i;
      } }), pr = q({ "src/common/util.js"(e, u) {
        G();
        var { default: a } = (Uu(), Ce(Rt)), o = Pt(), { getSupportInfo: l } = Ku(), r = er(), i = lr(), { skipWhitespace: E, skipSpaces: m, skipToLineEnd: P, skipEverythingButNewLine: s } = dt(), D = $t(), d = Mt(), v = Ut(), F = cr(), T = (b) => b[b.length - 2];
        function I(b) {
          return (O, M, V) => {
            let ue = V && V.backwards;
            if (M === !1)
              return !1;
            let { length: oe } = O, le = M;
            for (; le >= 0 && le < oe; ) {
              let Fe = O.charAt(le);
              if (b instanceof RegExp) {
                if (!b.test(Fe))
                  return le;
              } else if (!b.includes(Fe))
                return le;
              ue ? le-- : le++;
            }
            return le === -1 || le === oe ? le : !1;
          };
        }
        function W(b, O) {
          let M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, V = m(b, M.backwards ? O - 1 : O, M), ue = v(b, V, M);
          return V !== ue;
        }
        function x(b, O, M) {
          for (let V = O; V < M; ++V)
            if (b.charAt(V) === `
`)
              return !0;
          return !1;
        }
        function X(b, O, M) {
          let V = M(O) - 1;
          V = m(b, V, { backwards: !0 }), V = v(b, V, { backwards: !0 }), V = m(b, V, { backwards: !0 });
          let ue = v(b, V, { backwards: !0 });
          return V !== ue;
        }
        function J(b, O) {
          let M = null, V = O;
          for (; V !== M; )
            M = V, V = P(b, V), V = D(b, V), V = m(b, V);
          return V = d(b, V), V = v(b, V), V !== !1 && W(b, V);
        }
        function ae(b, O, M) {
          return J(b, M(O));
        }
        function y(b, O, M) {
          return F(b, M(O));
        }
        function Q(b, O, M) {
          return b.charAt(y(b, O, M));
        }
        function Z(b, O) {
          let M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return m(b, M.backwards ? O - 1 : O, M) !== O;
        }
        function ee(b, O) {
          let M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, V = 0;
          for (let ue = M; ue < b.length; ++ue)
            b[ue] === "	" ? V = V + O - V % O : V++;
          return V;
        }
        function se(b, O) {
          let M = b.lastIndexOf(`
`);
          return M === -1 ? 0 : ee(b.slice(M + 1).match(/^[\t ]*/)[0], O);
        }
        function t(b, O) {
          let M = { quote: '"', regex: /"/g, escaped: "&quot;" }, V = { quote: "'", regex: /'/g, escaped: "&apos;" }, ue = O === "'" ? V : M, oe = ue === V ? M : V, le = ue;
          if (b.includes(ue.quote) || b.includes(oe.quote)) {
            let Fe = (b.match(ue.regex) || []).length, Ne = (b.match(oe.regex) || []).length;
            le = Fe > Ne ? oe : ue;
          }
          return le;
        }
        function n(b, O) {
          let M = b.slice(1, -1), V = O.parser === "json" || O.parser === "json5" && O.quoteProps === "preserve" && !O.singleQuote ? '"' : O.__isInHtmlAttribute ? "'" : t(M, O.singleQuote ? "'" : '"').quote;
          return A(M, V, !(O.parser === "css" || O.parser === "less" || O.parser === "scss" || O.__embeddedInHtml));
        }
        function A(b, O, M) {
          let V = O === '"' ? "'" : '"', ue = /\\(.)|(["'])/gs, oe = b.replace(ue, (le, Fe, Ne) => Fe === V ? Fe : Ne === O ? "\\" + Ne : Ne || (M && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(Fe) ? Fe : "\\" + Fe));
          return O + oe + O;
        }
        function h(b) {
          return b.toLowerCase().replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3").replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1").replace(/^([+-])?\./, "$10.").replace(/(\.\d+?)0+(?=e|$)/, "$1").replace(/\.(?=e|$)/, "");
        }
        function B(b, O) {
          let M = b.match(new RegExp("(".concat(a(O), ")+"), "g"));
          return M === null ? 0 : M.reduce((V, ue) => Math.max(V, ue.length / O.length), 0);
        }
        function K(b, O) {
          let M = b.match(new RegExp("(".concat(a(O), ")+"), "g"));
          if (M === null)
            return 0;
          let V = /* @__PURE__ */ new Map(), ue = 0;
          for (let oe of M) {
            let le = oe.length / O.length;
            V.set(le, !0), le > ue && (ue = le);
          }
          for (let oe = 1; oe < ue; oe++)
            if (!V.get(oe))
              return oe;
          return ue + 1;
        }
        function ne(b, O) {
          (b.comments || (b.comments = [])).push(O), O.printed = !1, O.nodeDescription = be(b);
        }
        function de(b, O) {
          O.leading = !0, O.trailing = !1, ne(b, O);
        }
        function ce(b, O, M) {
          O.leading = !1, O.trailing = !1, M && (O.marker = M), ne(b, O);
        }
        function ge(b, O) {
          O.leading = !1, O.trailing = !0, ne(b, O);
        }
        function fe(b, O) {
          let { languages: M } = l({ plugins: O.plugins }), V = M.find((ue) => {
            let { name: oe } = ue;
            return oe.toLowerCase() === b;
          }) || M.find((ue) => {
            let { aliases: oe } = ue;
            return Array.isArray(oe) && oe.includes(b);
          }) || M.find((ue) => {
            let { extensions: oe } = ue;
            return Array.isArray(oe) && oe.includes(".".concat(b));
          });
          return V && V.parsers[0];
        }
        function Be(b) {
          return b && b.type === "front-matter";
        }
        function Se(b) {
          let O = /* @__PURE__ */ new WeakMap();
          return function(M) {
            return O.has(M) || O.set(M, Symbol(b)), O.get(M);
          };
        }
        function be(b) {
          let O = b.type || b.kind || "(unknown type)", M = String(b.name || b.id && (typeof b.id == "object" ? b.id.name : b.id) || b.key && (typeof b.key == "object" ? b.key.name : b.key) || b.value && (typeof b.value == "object" ? "" : String(b.value)) || b.operator || "");
          return M.length > 20 && (M = M.slice(0, 19) + "\u2026"), O + (M ? " " + M : "");
        }
        u.exports = { inferParserByLanguage: fe, getStringWidth: i, getMaxContinuousCount: B, getMinNotPresentContinuousCount: K, getPenultimate: T, getLast: o, getNextNonSpaceNonCommentCharacterIndexWithStartIndex: F, getNextNonSpaceNonCommentCharacterIndex: y, getNextNonSpaceNonCommentCharacter: Q, skip: I, skipWhitespace: E, skipSpaces: m, skipToLineEnd: P, skipEverythingButNewLine: s, skipInlineComment: D, skipTrailingComment: d, skipNewline: v, isNextLineEmptyAfterIndex: J, isNextLineEmpty: ae, isPreviousLineEmpty: X, hasNewline: W, hasNewlineInRange: x, hasSpaces: Z, getAlignmentSize: ee, getIndentSize: se, getPreferredQuote: t, printString: n, printNumber: h, makeString: A, addLeadingComment: de, addDanglingComment: ce, addTrailingComment: ge, isFrontMatterNode: Be, isNonEmptyArray: r, createGroupIdMapper: Se };
      } }), hr = q({ "vendors/html-tag-names.json"(e, u) {
        u.exports = { htmlTagNames: ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "math", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "pre", "progress", "q", "rb", "rbc", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"] };
      } }), Vt = q({ "src/language-html/utils/array-to-map.js"(e, u) {
        G();
        function a(o) {
          let l = /* @__PURE__ */ Object.create(null);
          for (let r of o)
            l[r] = !0;
          return l;
        }
        u.exports = a;
      } }), dr = q({ "src/language-html/utils/html-tag-names.js"(e, u) {
        G();
        var { htmlTagNames: a } = hr(), o = Vt(), l = o(a);
        u.exports = l;
      } }), Cr = q({ "vendors/html-element-attributes.json"(e, u) {
        u.exports = { htmlElementAttributes: { "*": ["accesskey", "autocapitalize", "autofocus", "class", "contenteditable", "dir", "draggable", "enterkeyhint", "hidden", "id", "inputmode", "is", "itemid", "itemprop", "itemref", "itemscope", "itemtype", "lang", "nonce", "slot", "spellcheck", "style", "tabindex", "title", "translate"], a: ["charset", "coords", "download", "href", "hreflang", "name", "ping", "referrerpolicy", "rel", "rev", "shape", "target", "type"], applet: ["align", "alt", "archive", "code", "codebase", "height", "hspace", "name", "object", "vspace", "width"], area: ["alt", "coords", "download", "href", "hreflang", "nohref", "ping", "referrerpolicy", "rel", "shape", "target", "type"], audio: ["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"], base: ["href", "target"], basefont: ["color", "face", "size"], blockquote: ["cite"], body: ["alink", "background", "bgcolor", "link", "text", "vlink"], br: ["clear"], button: ["disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "name", "type", "value"], canvas: ["height", "width"], caption: ["align"], col: ["align", "char", "charoff", "span", "valign", "width"], colgroup: ["align", "char", "charoff", "span", "valign", "width"], data: ["value"], del: ["cite", "datetime"], details: ["open"], dialog: ["open"], dir: ["compact"], div: ["align"], dl: ["compact"], embed: ["height", "src", "type", "width"], fieldset: ["disabled", "form", "name"], font: ["color", "face", "size"], form: ["accept", "accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "target"], frame: ["frameborder", "longdesc", "marginheight", "marginwidth", "name", "noresize", "scrolling", "src"], frameset: ["cols", "rows"], h1: ["align"], h2: ["align"], h3: ["align"], h4: ["align"], h5: ["align"], h6: ["align"], head: ["profile"], hr: ["align", "noshade", "size", "width"], html: ["manifest", "version"], iframe: ["align", "allow", "allowfullscreen", "allowpaymentrequest", "allowusermedia", "frameborder", "height", "loading", "longdesc", "marginheight", "marginwidth", "name", "referrerpolicy", "sandbox", "scrolling", "src", "srcdoc", "width"], img: ["align", "alt", "border", "crossorigin", "decoding", "height", "hspace", "ismap", "loading", "longdesc", "name", "referrerpolicy", "sizes", "src", "srcset", "usemap", "vspace", "width"], input: ["accept", "align", "alt", "autocomplete", "checked", "dirname", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "height", "ismap", "list", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "src", "step", "type", "usemap", "value", "width"], ins: ["cite", "datetime"], isindex: ["prompt"], label: ["for", "form"], legend: ["align"], li: ["type", "value"], link: ["as", "charset", "color", "crossorigin", "disabled", "href", "hreflang", "imagesizes", "imagesrcset", "integrity", "media", "referrerpolicy", "rel", "rev", "sizes", "target", "type"], map: ["name"], menu: ["compact"], meta: ["charset", "content", "http-equiv", "media", "name", "scheme"], meter: ["high", "low", "max", "min", "optimum", "value"], object: ["align", "archive", "border", "classid", "codebase", "codetype", "data", "declare", "form", "height", "hspace", "name", "standby", "type", "typemustmatch", "usemap", "vspace", "width"], ol: ["compact", "reversed", "start", "type"], optgroup: ["disabled", "label"], option: ["disabled", "label", "selected", "value"], output: ["for", "form", "name"], p: ["align"], param: ["name", "type", "value", "valuetype"], pre: ["width"], progress: ["max", "value"], q: ["cite"], script: ["async", "charset", "crossorigin", "defer", "integrity", "language", "nomodule", "referrerpolicy", "src", "type"], select: ["autocomplete", "disabled", "form", "multiple", "name", "required", "size"], slot: ["name"], source: ["height", "media", "sizes", "src", "srcset", "type", "width"], style: ["media", "type"], table: ["align", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "rules", "summary", "width"], tbody: ["align", "char", "charoff", "valign"], td: ["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"], textarea: ["autocomplete", "cols", "dirname", "disabled", "form", "maxlength", "minlength", "name", "placeholder", "readonly", "required", "rows", "wrap"], tfoot: ["align", "char", "charoff", "valign"], th: ["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"], thead: ["align", "char", "charoff", "valign"], time: ["datetime"], tr: ["align", "bgcolor", "char", "charoff", "valign"], track: ["default", "kind", "label", "src", "srclang"], ul: ["compact", "type"], video: ["autoplay", "controls", "crossorigin", "height", "loop", "muted", "playsinline", "poster", "preload", "src", "width"] } };
      } }), Er = q({ "src/language-html/utils/map-object.js"(e, u) {
        G();
        function a(o, l) {
          let r = /* @__PURE__ */ Object.create(null);
          for (let [i, E] of Object.entries(o))
            r[i] = l(E, i);
          return r;
        }
        u.exports = a;
      } }), mr = q({ "src/language-html/utils/html-elements-attributes.js"(e, u) {
        G();
        var { htmlElementAttributes: a } = Cr(), o = Er(), l = Vt(), r = o(a, l);
        u.exports = r;
      } }), gr = q({ "src/language-html/utils/is-unknown-namespace.js"(e, u) {
        G();
        function a(o) {
          return o.type === "element" && !o.hasExplicitNamespace && !["html", "svg"].includes(o.namespace);
        }
        u.exports = a;
      } }), fr = q({ "src/language-html/pragma.js"(e, u) {
        G();
        function a(l) {
          return /^\s*<!--\s*@(?:format|prettier)\s*-->/.test(l);
        }
        function o(l) {
          return `<!-- @format -->

` + l.replace(/^\s*\n/, "");
        }
        u.exports = { hasPragma: a, insertPragma: o };
      } }), Fr = q({ "src/language-html/ast.js"(e, u) {
        G();
        var a = { attrs: !0, children: !0 }, o = /* @__PURE__ */ new Set(["parent"]), l = class {
          constructor() {
            let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            for (let E of /* @__PURE__ */ new Set([...o, ...Object.keys(i)]))
              this.setProperty(E, i[E]);
          }
          setProperty(i, E) {
            if (this[i] !== E) {
              if (i in a && (E = E.map((m) => this.createChild(m))), !o.has(i)) {
                this[i] = E;
                return;
              }
              Object.defineProperty(this, i, { value: E, enumerable: !1, configurable: !0 });
            }
          }
          map(i) {
            let E;
            for (let m in a) {
              let P = this[m];
              if (P) {
                let s = r(P, (D) => D.map(i));
                E !== P && (E || (E = new l({ parent: this.parent })), E.setProperty(m, s));
              }
            }
            if (E)
              for (let m in this)
                m in a || (E[m] = this[m]);
            return i(E || this);
          }
          walk(i) {
            for (let E in a) {
              let m = this[E];
              if (m)
                for (let P = 0; P < m.length; P++)
                  m[P].walk(i);
            }
            i(this);
          }
          createChild(i) {
            let E = i instanceof l ? i.clone() : new l(i);
            return E.setProperty("parent", this), E;
          }
          insertChildBefore(i, E) {
            this.children.splice(this.children.indexOf(i), 0, this.createChild(E));
          }
          removeChild(i) {
            this.children.splice(this.children.indexOf(i), 1);
          }
          replaceChild(i, E) {
            this.children[this.children.indexOf(i)] = this.createChild(E);
          }
          clone() {
            return new l(this);
          }
          get firstChild() {
            var i;
            return (i = this.children) === null || i === void 0 ? void 0 : i[0];
          }
          get lastChild() {
            var i;
            return (i = this.children) === null || i === void 0 ? void 0 : i[this.children.length - 1];
          }
          get prev() {
            var i;
            return (i = this.parent) === null || i === void 0 ? void 0 : i.children[this.parent.children.indexOf(this) - 1];
          }
          get next() {
            var i;
            return (i = this.parent) === null || i === void 0 ? void 0 : i.children[this.parent.children.indexOf(this) + 1];
          }
          get rawName() {
            return this.hasExplicitNamespace ? this.fullName : this.name;
          }
          get fullName() {
            return this.namespace ? this.namespace + ":" + this.name : this.name;
          }
          get attrMap() {
            return Object.fromEntries(this.attrs.map((i) => [i.fullName, i.value]));
          }
        };
        function r(i, E) {
          let m = i.map(E);
          return m.some((P, s) => P !== i[s]) ? m : i;
        }
        u.exports = { Node: l };
      } }), Ar = q({ "src/language-html/conditional-comment.js"(e, u) {
        G();
        var { ParseSourceSpan: a } = Oe(), o = [{ regex: /^(\[if([^\]]*)]>)(.*?)<!\s*\[endif]$/s, parse: r }, { regex: /^\[if([^\]]*)]><!$/, parse: i }, { regex: /^<!\s*\[endif]$/, parse: E }];
        function l(m, P) {
          if (m.value)
            for (let { regex: s, parse: D } of o) {
              let d = m.value.match(s);
              if (d)
                return D(m, P, d);
            }
          return null;
        }
        function r(m, P, s) {
          let [, D, d, v] = s, F = 4 + D.length, T = m.sourceSpan.start.moveBy(F), I = T.moveBy(v.length), [W, x] = (() => {
            try {
              return [!0, P(v, T).children];
            } catch {
              return [!1, [{ type: "text", value: v, sourceSpan: new a(T, I) }]];
            }
          })();
          return { type: "ieConditionalComment", complete: W, children: x, condition: d.trim().replace(/\s+/g, " "), sourceSpan: m.sourceSpan, startSourceSpan: new a(m.sourceSpan.start, T), endSourceSpan: new a(I, m.sourceSpan.end) };
        }
        function i(m, P, s) {
          let [, D] = s;
          return { type: "ieConditionalStartComment", condition: D.trim().replace(/\s+/g, " "), sourceSpan: m.sourceSpan };
        }
        function E(m) {
          return { type: "ieConditionalEndComment", sourceSpan: m.sourceSpan };
        }
        u.exports = { parseIeConditionalComment: l };
      } }), vr = q({ "src/language-html/loc.js"(e, u) {
        G();
        function a(l) {
          return l.sourceSpan.start.offset;
        }
        function o(l) {
          return l.sourceSpan.end.offset;
        }
        u.exports = { locStart: a, locEnd: o };
      } }), We = q({ "node_modules/angular-html-parser/lib/compiler/src/ml_parser/tags.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 }), function(E) {
          E[E.RAW_TEXT = 0] = "RAW_TEXT", E[E.ESCAPABLE_RAW_TEXT = 1] = "ESCAPABLE_RAW_TEXT", E[E.PARSABLE_DATA = 2] = "PARSABLE_DATA";
        }(e.TagContentType || (e.TagContentType = {}));
        function u(E) {
          if (E[0] != ":")
            return [null, E];
          let m = E.indexOf(":", 1);
          if (m == -1)
            throw new Error('Unsupported format "'.concat(E, '" expecting ":namespace:name"'));
          return [E.slice(1, m), E.slice(m + 1)];
        }
        e.splitNsName = u;
        function a(E) {
          return u(E)[1] === "ng-container";
        }
        e.isNgContainer = a;
        function o(E) {
          return u(E)[1] === "ng-content";
        }
        e.isNgContent = o;
        function l(E) {
          return u(E)[1] === "ng-template";
        }
        e.isNgTemplate = l;
        function r(E) {
          return E === null ? null : u(E)[0];
        }
        e.getNsPrefix = r;
        function i(E, m) {
          return E ? ":".concat(E, ":").concat(m) : m;
        }
        e.mergeNsAndName = i, e.NAMED_ENTITIES = { Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", Acy: "\u0410", acy: "\u0430", AElig: "\xC6", aelig: "\xE6", af: "\u2061", Afr: "\u{1D504}", afr: "\u{1D51E}", Agrave: "\xC0", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\u2A3F", AMP: "&", amp: "&", And: "\u2A53", and: "\u2227", andand: "\u2A55", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsd: "\u2221", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xC5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\u{1D538}", aopf: "\u{1D552}", ap: "\u2248", apacir: "\u2A6F", apE: "\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xC5", aring: "\xE5", Ascr: "\u{1D49C}", ascr: "\u{1D4B6}", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", Barwed: "\u2306", barwed: "\u2305", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", Because: "\u2235", because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\u226C", Bfr: "\u{1D505}", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\u{1D539}", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\u29C9", boxDL: "\u2557", boxDl: "\u2556", boxdL: "\u2555", boxdl: "\u2510", boxDR: "\u2554", boxDr: "\u2553", boxdR: "\u2552", boxdr: "\u250C", boxH: "\u2550", boxh: "\u2500", boxHD: "\u2566", boxHd: "\u2564", boxhD: "\u2565", boxhd: "\u252C", boxHU: "\u2569", boxHu: "\u2567", boxhU: "\u2568", boxhu: "\u2534", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxUL: "\u255D", boxUl: "\u255C", boxuL: "\u255B", boxul: "\u2518", boxUR: "\u255A", boxUr: "\u2559", boxuR: "\u2558", boxur: "\u2514", boxV: "\u2551", boxv: "\u2502", boxVH: "\u256C", boxVh: "\u256B", boxvH: "\u256A", boxvh: "\u253C", boxVL: "\u2563", boxVl: "\u2562", boxvL: "\u2561", boxvl: "\u2524", boxVR: "\u2560", boxVr: "\u255F", boxvR: "\u255E", boxvr: "\u251C", bprime: "\u2035", Breve: "\u02D8", breve: "\u02D8", brvbar: "\xA6", Bscr: "\u212C", bscr: "\u{1D4B7}", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsol: "\\", bsolb: "\u29C5", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", Cap: "\u22D2", cap: "\u2229", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xC7", ccedil: "\xE7", Ccirc: "\u0108", ccirc: "\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2", cent: "\xA2", CenterDot: "\xB7", centerdot: "\xB7", Cfr: "\u212D", cfr: "\u{1D520}", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", Chi: "\u03A7", chi: "\u03C7", cir: "\u25CB", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", Colon: "\u2237", colon: ":", Colone: "\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", Conint: "\u222F", conint: "\u222E", ContourIntegral: "\u222E", Copf: "\u2102", copf: "\u{1D554}", coprod: "\u2210", Coproduct: "\u2210", COPY: "\xA9", copy: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\u21B5", Cross: "\u2A2F", cross: "\u2717", Cscr: "\u{1D49E}", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", Cup: "\u22D3", cup: "\u222A", cupbrcap: "\u2A48", CupCap: "\u224D", cupcap: "\u2A46", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", Dagger: "\u2021", dagger: "\u2020", daleth: "\u2138", Darr: "\u21A1", dArr: "\u21D3", darr: "\u2193", dash: "\u2010", Dashv: "\u2AE4", dashv: "\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", DD: "\u2145", dd: "\u2146", ddagger: "\u2021", ddarr: "\u21CA", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", Dfr: "\u{1D507}", dfr: "\u{1D521}", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", Diamond: "\u22C4", diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\u{1D53B}", dopf: "\u{1D555}", Dot: "\xA8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", DownArrow: "\u2193", Downarrow: "\u21D3", downarrow: "\u2193", DownArrowBar: "\u2913", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVector: "\u21BD", DownLeftVectorBar: "\u2956", DownRightTeeVector: "\u295F", DownRightVector: "\u21C1", DownRightVectorBar: "\u2957", DownTee: "\u22A4", DownTeeArrow: "\u21A7", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\u{1D49F}", dscr: "\u{1D4B9}", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xC9", eacute: "\xE9", easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", ecir: "\u2256", Ecirc: "\xCA", ecirc: "\xEA", ecolon: "\u2255", Ecy: "\u042D", ecy: "\u044D", eDDot: "\u2A77", Edot: "\u0116", eDot: "\u2251", edot: "\u0117", ee: "\u2147", efDot: "\u2252", Efr: "\u{1D508}", efr: "\u{1D522}", eg: "\u2A9A", Egrave: "\xC8", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB", emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp: "\u2003", emsp13: "\u2004", emsp14: "\u2005", ENG: "\u014A", eng: "\u014B", ensp: "\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\u{1D53C}", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erarr: "\u2971", erDot: "\u2253", Escr: "\u2130", escr: "\u212F", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\u03B7", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130", ExponentialE: "\u2147", exponentiale: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\u{1D509}", ffr: "\u{1D523}", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\u{1D53D}", fopf: "\u{1D557}", ForAll: "\u2200", forall: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", Fscr: "\u2131", fscr: "\u{1D4BB}", gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F", Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", gE: "\u2267", ge: "\u2265", gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", ges: "\u2A7E", gescc: "\u2AA9", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\u{1D50A}", gfr: "\u{1D524}", Gg: "\u22D9", gg: "\u226B", ggg: "\u22D9", gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gl: "\u2277", gla: "\u2AA5", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A", gnE: "\u2269", gne: "\u2A88", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\u{1D53E}", gopf: "\u{1D558}", grave: "`", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", GT: ">", Gt: "\u226B", gt: ">", gtcc: "\u2AA7", gtcir: "\u2A7A", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7", hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", hArr: "\u21D4", harr: "\u2194", harrcir: "\u2948", harrw: "\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", Hfr: "\u210C", hfr: "\u{1D525}", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", Hopf: "\u210D", hopf: "\u{1D559}", horbar: "\u2015", HorizontalLine: "\u2500", Hscr: "\u210B", hscr: "\u{1D4BD}", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010", Iacute: "\xCD", iacute: "\xED", ic: "\u2063", Icirc: "\xCE", icirc: "\xEE", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\u0435", iexcl: "\xA1", iff: "\u21D4", Ifr: "\u2111", ifr: "\u{1D526}", Igrave: "\xCC", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Im: "\u2111", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", in: "\u2208", incare: "\u2105", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", Int: "\u222C", int: "\u222B", intcal: "\u22BA", integers: "\u2124", Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\u{1D540}", iopf: "\u{1D55A}", Iota: "\u0399", iota: "\u03B9", iprod: "\u2A3C", iquest: "\xBF", Iscr: "\u2110", iscr: "\u{1D4BE}", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xCF", iuml: "\xEF", Jcirc: "\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\u{1D50D}", jfr: "\u{1D527}", jmath: "\u0237", Jopf: "\u{1D541}", jopf: "\u{1D55B}", Jscr: "\u{1D4A5}", jscr: "\u{1D4BF}", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA", kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\u{1D50E}", kfr: "\u{1D528}", kgreen: "\u0138", KHcy: "\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\u{1D542}", kopf: "\u{1D55C}", Kscr: "\u{1D4A6}", kscr: "\u{1D4C0}", lAarr: "\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", Lang: "\u27EA", lang: "\u27E8", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", Larr: "\u219E", lArr: "\u21D0", larr: "\u2190", larrb: "\u21E4", larrbfs: "\u291F", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", lat: "\u2AAB", lAtail: "\u291B", latail: "\u2919", late: "\u2AAD", lates: "\u2AAD\uFE00", lBarr: "\u290E", lbarr: "\u290C", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", lE: "\u2266", le: "\u2264", LeftAngleBracket: "\u27E8", LeftArrow: "\u2190", Leftarrow: "\u21D0", leftarrow: "\u2190", LeftArrowBar: "\u21E4", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVector: "\u21C3", LeftDownVectorBar: "\u2959", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrow: "\u2194", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTee: "\u22A3", LeftTeeArrow: "\u21A4", LeftTeeVector: "\u295A", leftthreetimes: "\u22CB", LeftTriangle: "\u22B2", LeftTriangleBar: "\u29CF", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVector: "\u21BF", LeftUpVectorBar: "\u2958", LeftVector: "\u21BC", LeftVectorBar: "\u2952", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", les: "\u2A7D", lescc: "\u2AA8", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\u297C", lfloor: "\u230A", Lfr: "\u{1D50F}", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", Ll: "\u22D8", ll: "\u226A", llarr: "\u21C7", llcorner: "\u231E", Lleftarrow: "\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoust: "\u23B0", lmoustache: "\u23B0", lnap: "\u2A89", lnapprox: "\u2A89", lnE: "\u2268", lne: "\u2A87", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftarrow: "\u27F5", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\u27FA", longleftrightarrow: "\u27F7", longmapsto: "\u27FC", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", longrightarrow: "\u27F6", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", Lopf: "\u{1D543}", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", Lscr: "\u2112", lscr: "\u{1D4C1}", Lsh: "\u21B0", lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\u0142", LT: "<", Lt: "\u226A", lt: "<", ltcc: "\u2AA6", ltcir: "\u2A79", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", mid: "\u2223", midast: "*", midcir: "\u2AF0", middot: "\xB7", minus: "\u2212", minusb: "\u229F", minusd: "\u2238", minusdu: "\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\u{1D544}", mopf: "\u{1D55E}", mp: "\u2213", Mscr: "\u2133", mscr: "\u{1D4C2}", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207", Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natur: "\u266E", natural: "\u266E", naturals: "\u2115", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D", ncy: "\u043D", ndash: "\u2013", ne: "\u2260", nearhk: "\u2924", neArr: "\u21D7", nearr: "\u2197", nearrow: "\u2197", nedot: "\u2250\u0338", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: `
`, nexist: "\u2204", nexists: "\u2204", Nfr: "\u{1D511}", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F", nGtv: "\u226B\u0338", nhArr: "\u21CE", nharr: "\u21AE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\u040A", njcy: "\u045A", nlArr: "\u21CD", nlarr: "\u219A", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nLeftarrow: "\u21CD", nleftarrow: "\u219A", nLeftrightarrow: "\u21CE", nleftrightarrow: "\u21AE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338", nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", Nopf: "\u2115", nopf: "\u{1D55F}", Not: "\u2AEC", not: "\xAC", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangle: "\u22EA", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangle: "\u22EB", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", npar: "\u2226", nparallel: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", npre: "\u2AAF\u0338", nprec: "\u2280", npreceq: "\u2AAF\u0338", nrArr: "\u21CF", nrarr: "\u219B", nrarrc: "\u2933\u0338", nrarrw: "\u219D\u0338", nRightarrow: "\u21CF", nrightarrow: "\u219B", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", Nscr: "\u{1D4A9}", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xD1", ntilde: "\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nVDash: "\u22AF", nVdash: "\u22AE", nvDash: "\u22AD", nvdash: "\u22AC", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwArr: "\u21D6", nwarr: "\u2196", nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xD3", oacute: "\xF3", oast: "\u229B", ocir: "\u229A", Ocirc: "\xD4", ocirc: "\xF4", Ocy: "\u041E", ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\u0153", ofcir: "\u29BF", Ofr: "\u{1D512}", ofr: "\u{1D52C}", ogon: "\u02DB", Ograve: "\xD2", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\u{1D546}", oopf: "\u{1D560}", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", Or: "\u2A54", or: "\u2228", orarr: "\u21BB", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\u{1D4AA}", oscr: "\u2134", Oslash: "\xD8", oslash: "\xF8", osol: "\u2298", Otilde: "\xD5", otilde: "\xF5", Otimes: "\u2A37", otimes: "\u2297", otimesas: "\u2A36", Ouml: "\xD6", ouml: "\xF6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", par: "\u2225", para: "\xB6", parallel: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\u{1D513}", pfr: "\u{1D52D}", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plus: "+", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1", Poincareplane: "\u210C", pointint: "\u2A15", Popf: "\u2119", popf: "\u{1D561}", pound: "\xA3", Pr: "\u2ABB", pr: "\u227A", prap: "\u2AB7", prcue: "\u227C", prE: "\u2AB3", pre: "\u2AAF", prec: "\u227A", precapprox: "\u2AB7", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", precsim: "\u227E", Prime: "\u2033", prime: "\u2032", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportion: "\u2237", Proportional: "\u221D", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\u{1D4AB}", pscr: "\u{1D4C5}", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\u{1D514}", qfr: "\u{1D52E}", qint: "\u2A0C", Qopf: "\u211A", qopf: "\u{1D562}", qprime: "\u2057", Qscr: "\u{1D4AC}", qscr: "\u{1D4C6}", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", QUOT: '"', quot: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\u0155", radic: "\u221A", raemptyv: "\u29B3", Rang: "\u27EB", rang: "\u27E9", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB", Rarr: "\u21A0", rArr: "\u21D2", rarr: "\u2192", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", rAtail: "\u291C", ratail: "\u291A", ratio: "\u2236", rationals: "\u211A", RBarr: "\u2910", rBarr: "\u290F", rbarr: "\u290D", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309", rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", Re: "\u211C", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", rect: "\u25AD", REG: "\xAE", reg: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", Rfr: "\u211C", rfr: "\u{1D52F}", rHar: "\u2964", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrow: "\u2192", Rightarrow: "\u21D2", rightarrow: "\u2192", RightArrowBar: "\u21E5", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVector: "\u21C2", RightDownVectorBar: "\u2955", RightFloor: "\u230B", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTee: "\u22A2", RightTeeArrow: "\u21A6", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangle: "\u22B3", RightTriangleBar: "\u29D0", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVector: "\u21BE", RightUpVectorBar: "\u2954", RightVector: "\u21C0", RightVectorBar: "\u2953", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoust: "\u23B1", rmoustache: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", Ropf: "\u211D", ropf: "\u{1D563}", roplus: "\u2A2E", rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\u203A", Rscr: "\u211B", rscr: "\u{1D4C7}", Rsh: "\u21B1", rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\u015A", sacute: "\u015B", sbquo: "\u201A", Sc: "\u2ABC", sc: "\u227B", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", sccue: "\u227D", scE: "\u2AB4", sce: "\u2AB0", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdot: "\u22C5", sdotb: "\u22A1", sdote: "\u2A66", searhk: "\u2925", seArr: "\u21D8", searr: "\u2198", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", Sfr: "\u{1D516}", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", shy: "\xAD", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", sol: "/", solb: "\u29C4", solbar: "\u233F", Sopf: "\u{1D54A}", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", squ: "\u25A1", Square: "\u25A1", square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squf: "\u25AA", srarr: "\u2192", Sscr: "\u{1D4AE}", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", Sub: "\u22D0", sub: "\u2282", subdot: "\u2ABD", subE: "\u2AC5", sube: "\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", Subset: "\u22D0", subset: "\u2282", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succ: "\u227B", succapprox: "\u2AB8", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\u220B", Sum: "\u2211", sum: "\u2211", sung: "\u266A", Sup: "\u22D1", sup: "\u2283", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", supdot: "\u2ABE", supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", Supset: "\u22D1", supset: "\u2283", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926", swArr: "\u21D9", swarr: "\u2199", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "	", target: "\u2316", Tau: "\u03A4", tau: "\u03C4", tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\u2315", Tfr: "\u{1D517}", tfr: "\u{1D531}", there4: "\u2234", Therefore: "\u2234", therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", thinsp: "\u2009", ThinSpace: "\u2009", thkap: "\u2248", thksim: "\u223C", THORN: "\xDE", thorn: "\xFE", Tilde: "\u223C", tilde: "\u02DC", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", times: "\xD7", timesb: "\u22A0", timesbar: "\u2A31", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", top: "\u22A4", topbot: "\u2336", topcir: "\u2AF1", Topf: "\u{1D54B}", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", TRADE: "\u2122", trade: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", Tscr: "\u{1D4AF}", tscr: "\u{1D4C9}", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xDA", uacute: "\xFA", Uarr: "\u219F", uArr: "\u21D1", uarr: "\u2191", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xDB", ucirc: "\xFB", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\u{1D518}", ufr: "\u{1D532}", Ugrave: "\xD9", ugrave: "\xF9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\u{1D54C}", uopf: "\u{1D566}", UpArrow: "\u2191", Uparrow: "\u21D1", uparrow: "\u2191", UpArrowBar: "\u2912", UpArrowDownArrow: "\u21C5", UpDownArrow: "\u2195", Updownarrow: "\u21D5", updownarrow: "\u2195", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", Upsi: "\u03D2", upsi: "\u03C5", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5", UpTee: "\u22A5", UpTeeArrow: "\u21A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\u016F", urtri: "\u25F9", Uscr: "\u{1D4B0}", uscr: "\u{1D4CA}", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", Uuml: "\xDC", uuml: "\xFC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", vArr: "\u21D5", varr: "\u2195", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", Vbar: "\u2AEB", vBar: "\u2AE8", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", VDash: "\u22AB", Vdash: "\u22A9", vDash: "\u22A8", vdash: "\u22A2", Vdashl: "\u2AE6", Vee: "\u22C1", vee: "\u2228", veebar: "\u22BB", veeeq: "\u225A", vellip: "\u22EE", Verbar: "\u2016", verbar: "|", Vert: "\u2016", vert: "|", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\u{1D54D}", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\u{1D4B1}", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00", vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", Wedge: "\u22C0", wedge: "\u2227", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\u{1D51A}", wfr: "\u{1D534}", Wopf: "\u{1D54E}", wopf: "\u{1D568}", wp: "\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\u{1D4B2}", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", Xfr: "\u{1D51B}", xfr: "\u{1D535}", xhArr: "\u27FA", xharr: "\u27F7", Xi: "\u039E", xi: "\u03BE", xlArr: "\u27F8", xlarr: "\u27F5", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\u{1D54F}", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrArr: "\u27F9", xrarr: "\u27F6", Xscr: "\u{1D4B3}", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\xDD", yacute: "\xFD", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xA5", Yfr: "\u{1D51C}", yfr: "\u{1D536}", YIcy: "\u0407", yicy: "\u0457", Yopf: "\u{1D550}", yopf: "\u{1D56A}", Yscr: "\u{1D4B4}", yscr: "\u{1D4CE}", YUcy: "\u042E", yucy: "\u044E", Yuml: "\u0178", yuml: "\xFF", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", Zfr: "\u2128", zfr: "\u{1D537}", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", Zopf: "\u2124", zopf: "\u{1D56B}", Zscr: "\u{1D4B5}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" }, e.NGSP_UNICODE = "\uE500", e.NAMED_ENTITIES.ngsp = e.NGSP_UNICODE;
      } }), Gt = q({ "node_modules/angular-html-parser/lib/compiler/src/ml_parser/html_tags.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = We(), a = class {
          constructor() {
            let { closedByChildren: i, implicitNamespacePrefix: E, contentType: m = u.TagContentType.PARSABLE_DATA, closedByParent: P = !1, isVoid: s = !1, ignoreFirstLf: D = !1 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            this.closedByChildren = {}, this.closedByParent = !1, this.canSelfClose = !1, i && i.length > 0 && i.forEach((d) => this.closedByChildren[d] = !0), this.isVoid = s, this.closedByParent = P || s, this.implicitNamespacePrefix = E || null, this.contentType = m, this.ignoreFirstLf = D;
          }
          isClosedByChild(i) {
            return this.isVoid || i.toLowerCase() in this.closedByChildren;
          }
        };
        e.HtmlTagDefinition = a;
        var o, l;
        function r(i) {
          return l || (o = new a(), l = { base: new a({ isVoid: !0 }), meta: new a({ isVoid: !0 }), area: new a({ isVoid: !0 }), embed: new a({ isVoid: !0 }), link: new a({ isVoid: !0 }), img: new a({ isVoid: !0 }), input: new a({ isVoid: !0 }), param: new a({ isVoid: !0 }), hr: new a({ isVoid: !0 }), br: new a({ isVoid: !0 }), source: new a({ isVoid: !0 }), track: new a({ isVoid: !0 }), wbr: new a({ isVoid: !0 }), p: new a({ closedByChildren: ["address", "article", "aside", "blockquote", "div", "dl", "fieldset", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "main", "nav", "ol", "p", "pre", "section", "table", "ul"], closedByParent: !0 }), thead: new a({ closedByChildren: ["tbody", "tfoot"] }), tbody: new a({ closedByChildren: ["tbody", "tfoot"], closedByParent: !0 }), tfoot: new a({ closedByChildren: ["tbody"], closedByParent: !0 }), tr: new a({ closedByChildren: ["tr"], closedByParent: !0 }), td: new a({ closedByChildren: ["td", "th"], closedByParent: !0 }), th: new a({ closedByChildren: ["td", "th"], closedByParent: !0 }), col: new a({ isVoid: !0 }), svg: new a({ implicitNamespacePrefix: "svg" }), math: new a({ implicitNamespacePrefix: "math" }), li: new a({ closedByChildren: ["li"], closedByParent: !0 }), dt: new a({ closedByChildren: ["dt", "dd"] }), dd: new a({ closedByChildren: ["dt", "dd"], closedByParent: !0 }), rb: new a({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: !0 }), rt: new a({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: !0 }), rtc: new a({ closedByChildren: ["rb", "rtc", "rp"], closedByParent: !0 }), rp: new a({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: !0 }), optgroup: new a({ closedByChildren: ["optgroup"], closedByParent: !0 }), option: new a({ closedByChildren: ["option", "optgroup"], closedByParent: !0 }), pre: new a({ ignoreFirstLf: !0 }), listing: new a({ ignoreFirstLf: !0 }), style: new a({ contentType: u.TagContentType.RAW_TEXT }), script: new a({ contentType: u.TagContentType.RAW_TEXT }), title: new a({ contentType: u.TagContentType.ESCAPABLE_RAW_TEXT }), textarea: new a({ contentType: u.TagContentType.ESCAPABLE_RAW_TEXT, ignoreFirstLf: !0 }) }), l[i] || o;
        }
        e.getHtmlTagDefinition = r;
      } }), Tr = q({ "node_modules/angular-html-parser/lib/compiler/src/ast_path.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = class {
          constructor(a) {
            let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
            this.path = a, this.position = o;
          }
          get empty() {
            return !this.path || !this.path.length;
          }
          get head() {
            return this.path[0];
          }
          get tail() {
            return this.path[this.path.length - 1];
          }
          parentOf(a) {
            return a && this.path[this.path.indexOf(a) - 1];
          }
          childOf(a) {
            return this.path[this.path.indexOf(a) + 1];
          }
          first(a) {
            for (let o = this.path.length - 1; o >= 0; o--) {
              let l = this.path[o];
              if (l instanceof a)
                return l;
            }
          }
          push(a) {
            this.path.push(a);
          }
          pop() {
            return this.path.pop();
          }
        };
        e.AstPath = u;
      } }), Xt = q({ "node_modules/angular-html-parser/lib/compiler/src/ml_parser/ast.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = Tr(), a = class {
          constructor(F, T, I) {
            this.value = F, this.sourceSpan = T, this.i18n = I, this.type = "text";
          }
          visit(F, T) {
            return F.visitText(this, T);
          }
        };
        e.Text = a;
        var o = class {
          constructor(F, T) {
            this.value = F, this.sourceSpan = T, this.type = "cdata";
          }
          visit(F, T) {
            return F.visitCdata(this, T);
          }
        };
        e.CDATA = o;
        var l = class {
          constructor(F, T, I, W, x, X) {
            this.switchValue = F, this.type = T, this.cases = I, this.sourceSpan = W, this.switchValueSourceSpan = x, this.i18n = X;
          }
          visit(F, T) {
            return F.visitExpansion(this, T);
          }
        };
        e.Expansion = l;
        var r = class {
          constructor(F, T, I, W, x) {
            this.value = F, this.expression = T, this.sourceSpan = I, this.valueSourceSpan = W, this.expSourceSpan = x;
          }
          visit(F, T) {
            return F.visitExpansionCase(this, T);
          }
        };
        e.ExpansionCase = r;
        var i = class {
          constructor(F, T, I) {
            let W = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, x = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null, X = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
            this.name = F, this.value = T, this.sourceSpan = I, this.valueSpan = W, this.nameSpan = x, this.i18n = X, this.type = "attribute";
          }
          visit(F, T) {
            return F.visitAttribute(this, T);
          }
        };
        e.Attribute = i;
        var E = class {
          constructor(F, T, I, W) {
            let x = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null, X = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null, J = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : null, ae = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : null;
            this.name = F, this.attrs = T, this.children = I, this.sourceSpan = W, this.startSourceSpan = x, this.endSourceSpan = X, this.nameSpan = J, this.i18n = ae, this.type = "element";
          }
          visit(F, T) {
            return F.visitElement(this, T);
          }
        };
        e.Element = E;
        var m = class {
          constructor(F, T) {
            this.value = F, this.sourceSpan = T, this.type = "comment";
          }
          visit(F, T) {
            return F.visitComment(this, T);
          }
        };
        e.Comment = m;
        var P = class {
          constructor(F, T) {
            this.value = F, this.sourceSpan = T, this.type = "docType";
          }
          visit(F, T) {
            return F.visitDocType(this, T);
          }
        };
        e.DocType = P;
        function s(F, T) {
          let I = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, W = [], x = F.visit ? (X) => F.visit(X, I) || X.visit(F, I) : (X) => X.visit(F, I);
          return T.forEach((X) => {
            let J = x(X);
            J && W.push(J);
          }), W;
        }
        e.visitAll = s;
        var D = class {
          constructor() {
          }
          visitElement(F, T) {
            this.visitChildren(T, (I) => {
              I(F.attrs), I(F.children);
            });
          }
          visitAttribute(F, T) {
          }
          visitText(F, T) {
          }
          visitCdata(F, T) {
          }
          visitComment(F, T) {
          }
          visitDocType(F, T) {
          }
          visitExpansion(F, T) {
            return this.visitChildren(T, (I) => {
              I(F.cases);
            });
          }
          visitExpansionCase(F, T) {
          }
          visitChildren(F, T) {
            let I = [], W = this;
            function x(X) {
              X && I.push(s(W, X, F));
            }
            return T(x), Array.prototype.concat.apply([], I);
          }
        };
        e.RecursiveVisitor = D;
        function d(F) {
          let T = F.sourceSpan.start.offset, I = F.sourceSpan.end.offset;
          return F instanceof E && (F.endSourceSpan ? I = F.endSourceSpan.end.offset : F.children && F.children.length && (I = d(F.children[F.children.length - 1]).end)), { start: T, end: I };
        }
        function v(F, T) {
          let I = [], W = new class extends D {
            visit(x, X) {
              let J = d(x);
              if (J.start <= T && T < J.end)
                I.push(x);
              else
                return !0;
            }
          }();
          return s(W, F), new u.AstPath(I, T);
        }
        e.findNode = v;
      } }), _r = q({ "node_modules/angular-html-parser/lib/compiler/src/assertions.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        function u(l, r) {
          if (r != null) {
            if (!Array.isArray(r))
              throw new Error("Expected '".concat(l, "' to be an array of strings."));
            for (let i = 0; i < r.length; i += 1)
              if (typeof r[i] != "string")
                throw new Error("Expected '".concat(l, "' to be an array of strings."));
          }
        }
        e.assertArrayOfStrings = u;
        var a = [/^\s*$/, /[<>]/, /^[{}]$/, /&(#|[a-z])/i, /^\/\//];
        function o(l, r) {
          if (r != null && !(Array.isArray(r) && r.length == 2))
            throw new Error("Expected '".concat(l, "' to be an array, [start, end]."));
          if (r != null) {
            let i = r[0], E = r[1];
            a.forEach((m) => {
              if (m.test(i) || m.test(E))
                throw new Error("['".concat(i, "', '").concat(E, "'] contains unusable interpolation symbol."));
            });
          }
        }
        e.assertInterpolationSymbols = o;
      } }), yr = q({ "node_modules/angular-html-parser/lib/compiler/src/ml_parser/interpolation_config.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = _r(), a = class {
          constructor(o, l) {
            this.start = o, this.end = l;
          }
          static fromArray(o) {
            return o ? (u.assertInterpolationSymbols("interpolation", o), new a(o[0], o[1])) : e.DEFAULT_INTERPOLATION_CONFIG;
          }
        };
        e.InterpolationConfig = a, e.DEFAULT_INTERPOLATION_CONFIG = new a("{{", "}}");
      } }), Br = q({ "node_modules/angular-html-parser/lib/compiler/src/ml_parser/lexer.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = Te(), a = Oe(), o = yr(), l = We(), r;
        (function(t) {
          t[t.TAG_OPEN_START = 0] = "TAG_OPEN_START", t[t.TAG_OPEN_END = 1] = "TAG_OPEN_END", t[t.TAG_OPEN_END_VOID = 2] = "TAG_OPEN_END_VOID", t[t.TAG_CLOSE = 3] = "TAG_CLOSE", t[t.TEXT = 4] = "TEXT", t[t.ESCAPABLE_RAW_TEXT = 5] = "ESCAPABLE_RAW_TEXT", t[t.RAW_TEXT = 6] = "RAW_TEXT", t[t.COMMENT_START = 7] = "COMMENT_START", t[t.COMMENT_END = 8] = "COMMENT_END", t[t.CDATA_START = 9] = "CDATA_START", t[t.CDATA_END = 10] = "CDATA_END", t[t.ATTR_NAME = 11] = "ATTR_NAME", t[t.ATTR_QUOTE = 12] = "ATTR_QUOTE", t[t.ATTR_VALUE = 13] = "ATTR_VALUE", t[t.DOC_TYPE_START = 14] = "DOC_TYPE_START", t[t.DOC_TYPE_END = 15] = "DOC_TYPE_END", t[t.EXPANSION_FORM_START = 16] = "EXPANSION_FORM_START", t[t.EXPANSION_CASE_VALUE = 17] = "EXPANSION_CASE_VALUE", t[t.EXPANSION_CASE_EXP_START = 18] = "EXPANSION_CASE_EXP_START", t[t.EXPANSION_CASE_EXP_END = 19] = "EXPANSION_CASE_EXP_END", t[t.EXPANSION_FORM_END = 20] = "EXPANSION_FORM_END", t[t.EOF = 21] = "EOF";
        })(r = e.TokenType || (e.TokenType = {}));
        var i = class {
          constructor(t, n, A) {
            this.type = t, this.parts = n, this.sourceSpan = A;
          }
        };
        e.Token = i;
        var E = class extends a.ParseError {
          constructor(t, n, A) {
            super(A, t), this.tokenType = n;
          }
        };
        e.TokenError = E;
        var m = class {
          constructor(t, n) {
            this.tokens = t, this.errors = n;
          }
        };
        e.TokenizeResult = m;
        function P(t, n, A) {
          let h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          return new F(new a.ParseSourceFile(t, n), A, h).tokenize();
        }
        e.tokenize = P;
        var s = /\r\n?/g;
        function D(t) {
          let n = t === u.$EOF ? "EOF" : String.fromCharCode(t);
          return 'Unexpected character "'.concat(n, '"');
        }
        function d(t) {
          return 'Unknown entity "'.concat(t, '" - use the "&#<decimal>;" or  "&#x<hex>;" syntax');
        }
        var v = class {
          constructor(t) {
            this.error = t;
          }
        }, F = class {
          constructor(t, n, A) {
            this._getTagContentType = n, this._currentTokenStart = null, this._currentTokenType = null, this._expansionCaseStack = [], this._inInterpolation = !1, this._fullNameStack = [], this.tokens = [], this.errors = [], this._tokenizeIcu = A.tokenizeExpansionForms || !1, this._interpolationConfig = A.interpolationConfig || o.DEFAULT_INTERPOLATION_CONFIG, this._leadingTriviaCodePoints = A.leadingTriviaChars && A.leadingTriviaChars.map((B) => B.codePointAt(0) || 0), this._canSelfClose = A.canSelfClose || !1, this._allowHtmComponentClosingTags = A.allowHtmComponentClosingTags || !1;
            let h = A.range || { endPos: t.content.length, startPos: 0, startLine: 0, startCol: 0 };
            this._cursor = A.escapedString ? new ee(t, h) : new Z(t, h);
            try {
              this._cursor.init();
            } catch (B) {
              this.handleError(B);
            }
          }
          _processCarriageReturns(t) {
            return t.replace(s, `
`);
          }
          tokenize() {
            for (; this._cursor.peek() !== u.$EOF; ) {
              let t = this._cursor.clone();
              try {
                if (this._attemptCharCode(u.$LT))
                  if (this._attemptCharCode(u.$BANG))
                    this._attemptStr("[CDATA[") ? this._consumeCdata(t) : this._attemptStr("--") ? this._consumeComment(t) : this._attemptStrCaseInsensitive("doctype") ? this._consumeDocType(t) : this._consumeBogusComment(t);
                  else if (this._attemptCharCode(u.$SLASH))
                    this._consumeTagClose(t);
                  else {
                    let n = this._cursor.clone();
                    this._attemptCharCode(u.$QUESTION) ? (this._cursor = n, this._consumeBogusComment(t)) : this._consumeTagOpen(t);
                  }
                else
                  this._tokenizeIcu && this._tokenizeExpansionForm() || this._consumeText();
              } catch (n) {
                this.handleError(n);
              }
            }
            return this._beginToken(r.EOF), this._endToken([]), new m(Q(this.tokens), this.errors);
          }
          _tokenizeExpansionForm() {
            if (this.isExpansionFormStart())
              return this._consumeExpansionFormStart(), !0;
            if (J(this._cursor.peek()) && this._isInExpansionForm())
              return this._consumeExpansionCaseStart(), !0;
            if (this._cursor.peek() === u.$RBRACE) {
              if (this._isInExpansionCase())
                return this._consumeExpansionCaseEnd(), !0;
              if (this._isInExpansionForm())
                return this._consumeExpansionFormEnd(), !0;
            }
            return !1;
          }
          _beginToken(t) {
            let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._cursor.clone();
            this._currentTokenStart = n, this._currentTokenType = t;
          }
          _endToken(t) {
            let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._cursor.clone();
            if (this._currentTokenStart === null)
              throw new E("Programming error - attempted to end a token when there was no start to the token", this._currentTokenType, this._cursor.getSpan(n));
            if (this._currentTokenType === null)
              throw new E("Programming error - attempted to end a token which has no token type", null, this._cursor.getSpan(this._currentTokenStart));
            let A = new i(this._currentTokenType, t, this._cursor.getSpan(this._currentTokenStart, this._leadingTriviaCodePoints));
            return this.tokens.push(A), this._currentTokenStart = null, this._currentTokenType = null, A;
          }
          _createError(t, n) {
            this._isInExpansionForm() && (t += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`);
            let A = new E(t, this._currentTokenType, n);
            return this._currentTokenStart = null, this._currentTokenType = null, new v(A);
          }
          handleError(t) {
            if (t instanceof se && (t = this._createError(t.msg, this._cursor.getSpan(t.cursor))), t instanceof v)
              this.errors.push(t.error);
            else
              throw t;
          }
          _attemptCharCode(t) {
            return this._cursor.peek() === t ? (this._cursor.advance(), !0) : !1;
          }
          _attemptCharCodeCaseInsensitive(t) {
            return ae(this._cursor.peek(), t) ? (this._cursor.advance(), !0) : !1;
          }
          _requireCharCode(t) {
            let n = this._cursor.clone();
            if (!this._attemptCharCode(t))
              throw this._createError(D(this._cursor.peek()), this._cursor.getSpan(n));
          }
          _attemptStr(t) {
            let n = t.length;
            if (this._cursor.charsLeft() < n)
              return !1;
            let A = this._cursor.clone();
            for (let h = 0; h < n; h++)
              if (!this._attemptCharCode(t.charCodeAt(h)))
                return this._cursor = A, !1;
            return !0;
          }
          _attemptStrCaseInsensitive(t) {
            for (let n = 0; n < t.length; n++)
              if (!this._attemptCharCodeCaseInsensitive(t.charCodeAt(n)))
                return !1;
            return !0;
          }
          _requireStr(t) {
            let n = this._cursor.clone();
            if (!this._attemptStr(t))
              throw this._createError(D(this._cursor.peek()), this._cursor.getSpan(n));
          }
          _requireStrCaseInsensitive(t) {
            let n = this._cursor.clone();
            if (!this._attemptStrCaseInsensitive(t))
              throw this._createError(D(this._cursor.peek()), this._cursor.getSpan(n));
          }
          _attemptCharCodeUntilFn(t) {
            for (; !t(this._cursor.peek()); )
              this._cursor.advance();
          }
          _requireCharCodeUntilFn(t, n) {
            let A = this._cursor.clone();
            if (this._attemptCharCodeUntilFn(t), this._cursor.clone().diff(A) < n)
              throw this._createError(D(this._cursor.peek()), this._cursor.getSpan(A));
          }
          _attemptUntilChar(t) {
            for (; this._cursor.peek() !== t; )
              this._cursor.advance();
          }
          _readChar(t) {
            if (t && this._cursor.peek() === u.$AMPERSAND)
              return this._decodeEntity();
            {
              let n = String.fromCodePoint(this._cursor.peek());
              return this._cursor.advance(), n;
            }
          }
          _decodeEntity() {
            let t = this._cursor.clone();
            if (this._cursor.advance(), this._attemptCharCode(u.$HASH)) {
              let n = this._attemptCharCode(u.$x) || this._attemptCharCode(u.$X), A = this._cursor.clone();
              if (this._attemptCharCodeUntilFn(x), this._cursor.peek() != u.$SEMICOLON)
                throw this._createError(D(this._cursor.peek()), this._cursor.getSpan());
              let h = this._cursor.getChars(A);
              this._cursor.advance();
              try {
                let B = parseInt(h, n ? 16 : 10);
                return String.fromCharCode(B);
              } catch {
                throw this._createError(d(this._cursor.getChars(t)), this._cursor.getSpan());
              }
            } else {
              let n = this._cursor.clone();
              if (this._attemptCharCodeUntilFn(X), this._cursor.peek() != u.$SEMICOLON)
                return this._cursor = n, "&";
              let A = this._cursor.getChars(n);
              this._cursor.advance();
              let h = l.NAMED_ENTITIES[A];
              if (!h)
                throw this._createError(d(A), this._cursor.getSpan(t));
              return h;
            }
          }
          _consumeRawText(t, n) {
            this._beginToken(t ? r.ESCAPABLE_RAW_TEXT : r.RAW_TEXT);
            let A = [];
            for (; ; ) {
              let h = this._cursor.clone(), B = n();
              if (this._cursor = h, B)
                break;
              A.push(this._readChar(t));
            }
            return this._endToken([this._processCarriageReturns(A.join(""))]);
          }
          _consumeComment(t) {
            this._beginToken(r.COMMENT_START, t), this._endToken([]), this._consumeRawText(!1, () => this._attemptStr("-->")), this._beginToken(r.COMMENT_END), this._requireStr("-->"), this._endToken([]);
          }
          _consumeBogusComment(t) {
            this._beginToken(r.COMMENT_START, t), this._endToken([]), this._consumeRawText(!1, () => this._cursor.peek() === u.$GT), this._beginToken(r.COMMENT_END), this._cursor.advance(), this._endToken([]);
          }
          _consumeCdata(t) {
            this._beginToken(r.CDATA_START, t), this._endToken([]), this._consumeRawText(!1, () => this._attemptStr("]]>")), this._beginToken(r.CDATA_END), this._requireStr("]]>"), this._endToken([]);
          }
          _consumeDocType(t) {
            this._beginToken(r.DOC_TYPE_START, t), this._endToken([]), this._consumeRawText(!1, () => this._cursor.peek() === u.$GT), this._beginToken(r.DOC_TYPE_END), this._cursor.advance(), this._endToken([]);
          }
          _consumePrefixAndName() {
            let t = this._cursor.clone(), n = "";
            for (; this._cursor.peek() !== u.$COLON && !W(this._cursor.peek()); )
              this._cursor.advance();
            let A;
            this._cursor.peek() === u.$COLON ? (n = this._cursor.getChars(t), this._cursor.advance(), A = this._cursor.clone()) : A = t, this._requireCharCodeUntilFn(I, n === "" ? 0 : 1);
            let h = this._cursor.getChars(A);
            return [n, h];
          }
          _consumeTagOpen(t) {
            let n, A, h, B = this.tokens.length, K = this._cursor.clone(), ne = [];
            try {
              if (!u.isAsciiLetter(this._cursor.peek()))
                throw this._createError(D(this._cursor.peek()), this._cursor.getSpan(t));
              for (h = this._consumeTagOpenStart(t), A = h.parts[0], n = h.parts[1], this._attemptCharCodeUntilFn(T); this._cursor.peek() !== u.$SLASH && this._cursor.peek() !== u.$GT; ) {
                let [ce, ge] = this._consumeAttributeName();
                if (this._attemptCharCodeUntilFn(T), this._attemptCharCode(u.$EQ)) {
                  this._attemptCharCodeUntilFn(T);
                  let fe = this._consumeAttributeValue();
                  ne.push({ prefix: ce, name: ge, value: fe });
                } else
                  ne.push({ prefix: ce, name: ge });
                this._attemptCharCodeUntilFn(T);
              }
              this._consumeTagOpenEnd();
            } catch (ce) {
              if (ce instanceof v) {
                this._cursor = K, h && (this.tokens.length = B), this._beginToken(r.TEXT, t), this._endToken(["<"]);
                return;
              }
              throw ce;
            }
            if (this._canSelfClose && this.tokens[this.tokens.length - 1].type === r.TAG_OPEN_END_VOID)
              return;
            let de = this._getTagContentType(n, A, this._fullNameStack.length > 0, ne);
            this._handleFullNameStackForTagOpen(A, n), de === l.TagContentType.RAW_TEXT ? this._consumeRawTextWithTagClose(A, n, !1) : de === l.TagContentType.ESCAPABLE_RAW_TEXT && this._consumeRawTextWithTagClose(A, n, !0);
          }
          _consumeRawTextWithTagClose(t, n, A) {
            this._consumeRawText(A, () => !this._attemptCharCode(u.$LT) || !this._attemptCharCode(u.$SLASH) || (this._attemptCharCodeUntilFn(T), !this._attemptStrCaseInsensitive(t ? "".concat(t, ":").concat(n) : n)) ? !1 : (this._attemptCharCodeUntilFn(T), this._attemptCharCode(u.$GT))), this._beginToken(r.TAG_CLOSE), this._requireCharCodeUntilFn((h) => h === u.$GT, 3), this._cursor.advance(), this._endToken([t, n]), this._handleFullNameStackForTagClose(t, n);
          }
          _consumeTagOpenStart(t) {
            this._beginToken(r.TAG_OPEN_START, t);
            let n = this._consumePrefixAndName();
            return this._endToken(n);
          }
          _consumeAttributeName() {
            let t = this._cursor.peek();
            if (t === u.$SQ || t === u.$DQ)
              throw this._createError(D(t), this._cursor.getSpan());
            this._beginToken(r.ATTR_NAME);
            let n = this._consumePrefixAndName();
            return this._endToken(n), n;
          }
          _consumeAttributeValue() {
            let t;
            if (this._cursor.peek() === u.$SQ || this._cursor.peek() === u.$DQ) {
              this._beginToken(r.ATTR_QUOTE);
              let n = this._cursor.peek();
              this._cursor.advance(), this._endToken([String.fromCodePoint(n)]), this._beginToken(r.ATTR_VALUE);
              let A = [];
              for (; this._cursor.peek() !== n; )
                A.push(this._readChar(!0));
              t = this._processCarriageReturns(A.join("")), this._endToken([t]), this._beginToken(r.ATTR_QUOTE), this._cursor.advance(), this._endToken([String.fromCodePoint(n)]);
            } else {
              this._beginToken(r.ATTR_VALUE);
              let n = this._cursor.clone();
              this._requireCharCodeUntilFn(I, 1), t = this._processCarriageReturns(this._cursor.getChars(n)), this._endToken([t]);
            }
            return t;
          }
          _consumeTagOpenEnd() {
            let t = this._attemptCharCode(u.$SLASH) ? r.TAG_OPEN_END_VOID : r.TAG_OPEN_END;
            this._beginToken(t), this._requireCharCode(u.$GT), this._endToken([]);
          }
          _consumeTagClose(t) {
            if (this._beginToken(r.TAG_CLOSE, t), this._attemptCharCodeUntilFn(T), this._allowHtmComponentClosingTags && this._attemptCharCode(u.$SLASH))
              this._attemptCharCodeUntilFn(T), this._requireCharCode(u.$GT), this._endToken([]);
            else {
              let [n, A] = this._consumePrefixAndName();
              this._attemptCharCodeUntilFn(T), this._requireCharCode(u.$GT), this._endToken([n, A]), this._handleFullNameStackForTagClose(n, A);
            }
          }
          _consumeExpansionFormStart() {
            this._beginToken(r.EXPANSION_FORM_START), this._requireCharCode(u.$LBRACE), this._endToken([]), this._expansionCaseStack.push(r.EXPANSION_FORM_START), this._beginToken(r.RAW_TEXT);
            let t = this._readUntil(u.$COMMA);
            this._endToken([t]), this._requireCharCode(u.$COMMA), this._attemptCharCodeUntilFn(T), this._beginToken(r.RAW_TEXT);
            let n = this._readUntil(u.$COMMA);
            this._endToken([n]), this._requireCharCode(u.$COMMA), this._attemptCharCodeUntilFn(T);
          }
          _consumeExpansionCaseStart() {
            this._beginToken(r.EXPANSION_CASE_VALUE);
            let t = this._readUntil(u.$LBRACE).trim();
            this._endToken([t]), this._attemptCharCodeUntilFn(T), this._beginToken(r.EXPANSION_CASE_EXP_START), this._requireCharCode(u.$LBRACE), this._endToken([]), this._attemptCharCodeUntilFn(T), this._expansionCaseStack.push(r.EXPANSION_CASE_EXP_START);
          }
          _consumeExpansionCaseEnd() {
            this._beginToken(r.EXPANSION_CASE_EXP_END), this._requireCharCode(u.$RBRACE), this._endToken([]), this._attemptCharCodeUntilFn(T), this._expansionCaseStack.pop();
          }
          _consumeExpansionFormEnd() {
            this._beginToken(r.EXPANSION_FORM_END), this._requireCharCode(u.$RBRACE), this._endToken([]), this._expansionCaseStack.pop();
          }
          _consumeText() {
            let t = this._cursor.clone();
            this._beginToken(r.TEXT, t);
            let n = [];
            do
              this._interpolationConfig && this._attemptStr(this._interpolationConfig.start) ? (n.push(this._interpolationConfig.start), this._inInterpolation = !0) : this._interpolationConfig && this._inInterpolation && this._attemptStr(this._interpolationConfig.end) ? (n.push(this._interpolationConfig.end), this._inInterpolation = !1) : n.push(this._readChar(!0));
            while (!this._isTextEnd());
            this._endToken([this._processCarriageReturns(n.join(""))]);
          }
          _isTextEnd() {
            return !!(this._cursor.peek() === u.$LT || this._cursor.peek() === u.$EOF || this._tokenizeIcu && !this._inInterpolation && (this.isExpansionFormStart() || this._cursor.peek() === u.$RBRACE && this._isInExpansionCase()));
          }
          _readUntil(t) {
            let n = this._cursor.clone();
            return this._attemptUntilChar(t), this._cursor.getChars(n);
          }
          _isInExpansionCase() {
            return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === r.EXPANSION_CASE_EXP_START;
          }
          _isInExpansionForm() {
            return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === r.EXPANSION_FORM_START;
          }
          isExpansionFormStart() {
            if (this._cursor.peek() !== u.$LBRACE)
              return !1;
            if (this._interpolationConfig) {
              let t = this._cursor.clone(), n = this._attemptStr(this._interpolationConfig.start);
              return this._cursor = t, !n;
            }
            return !0;
          }
          _handleFullNameStackForTagOpen(t, n) {
            let A = l.mergeNsAndName(t, n);
            (this._fullNameStack.length === 0 || this._fullNameStack[this._fullNameStack.length - 1] === A) && this._fullNameStack.push(A);
          }
          _handleFullNameStackForTagClose(t, n) {
            let A = l.mergeNsAndName(t, n);
            this._fullNameStack.length !== 0 && this._fullNameStack[this._fullNameStack.length - 1] === A && this._fullNameStack.pop();
          }
        };
        function T(t) {
          return !u.isWhitespace(t) || t === u.$EOF;
        }
        function I(t) {
          return u.isWhitespace(t) || t === u.$GT || t === u.$SLASH || t === u.$SQ || t === u.$DQ || t === u.$EQ;
        }
        function W(t) {
          return (t < u.$a || u.$z < t) && (t < u.$A || u.$Z < t) && (t < u.$0 || t > u.$9);
        }
        function x(t) {
          return t == u.$SEMICOLON || t == u.$EOF || !u.isAsciiHexDigit(t);
        }
        function X(t) {
          return t == u.$SEMICOLON || t == u.$EOF || !u.isAsciiLetter(t);
        }
        function J(t) {
          return t === u.$EQ || u.isAsciiLetter(t) || u.isDigit(t);
        }
        function ae(t, n) {
          return y(t) == y(n);
        }
        function y(t) {
          return t >= u.$a && t <= u.$z ? t - u.$a + u.$A : t;
        }
        function Q(t) {
          let n = [], A;
          for (let h = 0; h < t.length; h++) {
            let B = t[h];
            A && A.type == r.TEXT && B.type == r.TEXT ? (A.parts[0] += B.parts[0], A.sourceSpan.end = B.sourceSpan.end) : (A = B, n.push(A));
          }
          return n;
        }
        var Z = class {
          constructor(t, n) {
            if (t instanceof Z)
              this.file = t.file, this.input = t.input, this.end = t.end, this.state = Object.assign({}, t.state);
            else {
              if (!n)
                throw new Error("Programming error: the range argument must be provided with a file argument.");
              this.file = t, this.input = t.content, this.end = n.endPos, this.state = { peek: -1, offset: n.startPos, line: n.startLine, column: n.startCol };
            }
          }
          clone() {
            return new Z(this);
          }
          peek() {
            return this.state.peek;
          }
          charsLeft() {
            return this.end - this.state.offset;
          }
          diff(t) {
            return this.state.offset - t.state.offset;
          }
          advance() {
            this.advanceState(this.state);
          }
          init() {
            this.updatePeek(this.state);
          }
          getSpan(t, n) {
            if (t = t || this, n)
              for (t = t.clone(); this.diff(t) > 0 && n.indexOf(t.peek()) !== -1; )
                t.advance();
            return new a.ParseSourceSpan(new a.ParseLocation(t.file, t.state.offset, t.state.line, t.state.column), new a.ParseLocation(this.file, this.state.offset, this.state.line, this.state.column));
          }
          getChars(t) {
            return this.input.substring(t.state.offset, this.state.offset);
          }
          charAt(t) {
            return this.input.charCodeAt(t);
          }
          advanceState(t) {
            if (t.offset >= this.end)
              throw this.state = t, new se('Unexpected character "EOF"', this);
            let n = this.charAt(t.offset);
            n === u.$LF ? (t.line++, t.column = 0) : u.isNewLine(n) || t.column++, t.offset++, this.updatePeek(t);
          }
          updatePeek(t) {
            t.peek = t.offset >= this.end ? u.$EOF : this.charAt(t.offset);
          }
        }, ee = class extends Z {
          constructor(t, n) {
            t instanceof ee ? (super(t), this.internalState = Object.assign({}, t.internalState)) : (super(t, n), this.internalState = this.state);
          }
          advance() {
            this.state = this.internalState, super.advance(), this.processEscapeSequence();
          }
          init() {
            super.init(), this.processEscapeSequence();
          }
          clone() {
            return new ee(this);
          }
          getChars(t) {
            let n = t.clone(), A = "";
            for (; n.internalState.offset < this.internalState.offset; )
              A += String.fromCodePoint(n.peek()), n.advance();
            return A;
          }
          processEscapeSequence() {
            let t = () => this.internalState.peek;
            if (t() === u.$BACKSLASH)
              if (this.internalState = Object.assign({}, this.state), this.advanceState(this.internalState), t() === u.$n)
                this.state.peek = u.$LF;
              else if (t() === u.$r)
                this.state.peek = u.$CR;
              else if (t() === u.$v)
                this.state.peek = u.$VTAB;
              else if (t() === u.$t)
                this.state.peek = u.$TAB;
              else if (t() === u.$b)
                this.state.peek = u.$BSPACE;
              else if (t() === u.$f)
                this.state.peek = u.$FF;
              else if (t() === u.$u)
                if (this.advanceState(this.internalState), t() === u.$LBRACE) {
                  this.advanceState(this.internalState);
                  let n = this.clone(), A = 0;
                  for (; t() !== u.$RBRACE; )
                    this.advanceState(this.internalState), A++;
                  this.state.peek = this.decodeHexDigits(n, A);
                } else {
                  let n = this.clone();
                  this.advanceState(this.internalState), this.advanceState(this.internalState), this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(n, 4);
                }
              else if (t() === u.$x) {
                this.advanceState(this.internalState);
                let n = this.clone();
                this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(n, 2);
              } else if (u.isOctalDigit(t())) {
                let n = "", A = 0, h = this.clone();
                for (; u.isOctalDigit(t()) && A < 3; )
                  h = this.clone(), n += String.fromCodePoint(t()), this.advanceState(this.internalState), A++;
                this.state.peek = parseInt(n, 8), this.internalState = h.internalState;
              } else
                u.isNewLine(this.internalState.peek) ? (this.advanceState(this.internalState), this.state = this.internalState) : this.state.peek = this.internalState.peek;
          }
          decodeHexDigits(t, n) {
            let A = this.input.substr(t.internalState.offset, n), h = parseInt(A, 16);
            if (isNaN(h))
              throw t.state = t.internalState, new se("Invalid hexadecimal escape sequence", t);
            return h;
          }
        }, se = class {
          constructor(t, n) {
            this.msg = t, this.cursor = n;
          }
        };
        e.CursorError = se;
      } }), Ht = q({ "node_modules/angular-html-parser/lib/compiler/src/ml_parser/parser.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = Oe(), a = Xt(), o = Br(), l = We(), r = class extends u.ParseError {
          constructor(s, D, d) {
            super(D, d), this.elementName = s;
          }
          static create(s, D, d) {
            return new r(s, D, d);
          }
        };
        e.TreeError = r;
        var i = class {
          constructor(s, D) {
            this.rootNodes = s, this.errors = D;
          }
        };
        e.ParseTreeResult = i;
        var E = class {
          constructor(s) {
            this.getTagDefinition = s;
          }
          parse(s, D, d) {
            let v = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, F = arguments.length > 4 ? arguments[4] : void 0, T = (Z) => function(ee) {
              for (var se = arguments.length, t = new Array(se > 1 ? se - 1 : 0), n = 1; n < se; n++)
                t[n - 1] = arguments[n];
              return Z(ee.toLowerCase(), ...t);
            }, I = v ? this.getTagDefinition : T(this.getTagDefinition), W = (Z) => I(Z).contentType, x = v ? F : T(F), X = F ? (Z, ee, se, t) => {
              let n = x(Z, ee, se, t);
              return n !== void 0 ? n : W(Z);
            } : W, J = o.tokenize(s, D, X, d), ae = d && d.canSelfClose || !1, y = d && d.allowHtmComponentClosingTags || !1, Q = new m(J.tokens, I, ae, y, v).build();
            return new i(Q.rootNodes, J.errors.concat(Q.errors));
          }
        };
        e.Parser = E;
        var m = class {
          constructor(s, D, d, v, F) {
            this.tokens = s, this.getTagDefinition = D, this.canSelfClose = d, this.allowHtmComponentClosingTags = v, this.isTagNameCaseSensitive = F, this._index = -1, this._rootNodes = [], this._errors = [], this._elementStack = [], this._advance();
          }
          build() {
            for (; this._peek.type !== o.TokenType.EOF; )
              this._peek.type === o.TokenType.TAG_OPEN_START ? this._consumeStartTag(this._advance()) : this._peek.type === o.TokenType.TAG_CLOSE ? (this._closeVoidElement(), this._consumeEndTag(this._advance())) : this._peek.type === o.TokenType.CDATA_START ? (this._closeVoidElement(), this._consumeCdata(this._advance())) : this._peek.type === o.TokenType.COMMENT_START ? (this._closeVoidElement(), this._consumeComment(this._advance())) : this._peek.type === o.TokenType.TEXT || this._peek.type === o.TokenType.RAW_TEXT || this._peek.type === o.TokenType.ESCAPABLE_RAW_TEXT ? (this._closeVoidElement(), this._consumeText(this._advance())) : this._peek.type === o.TokenType.EXPANSION_FORM_START ? this._consumeExpansion(this._advance()) : this._peek.type === o.TokenType.DOC_TYPE_START ? this._consumeDocType(this._advance()) : this._advance();
            return new i(this._rootNodes, this._errors);
          }
          _advance() {
            let s = this._peek;
            return this._index < this.tokens.length - 1 && this._index++, this._peek = this.tokens[this._index], s;
          }
          _advanceIf(s) {
            return this._peek.type === s ? this._advance() : null;
          }
          _consumeCdata(s) {
            let D = this._advance(), d = this._getText(D), v = this._advanceIf(o.TokenType.CDATA_END);
            this._addToParent(new a.CDATA(d, new u.ParseSourceSpan(s.sourceSpan.start, (v || D).sourceSpan.end)));
          }
          _consumeComment(s) {
            let D = this._advanceIf(o.TokenType.RAW_TEXT), d = this._advanceIf(o.TokenType.COMMENT_END), v = D != null ? D.parts[0].trim() : null, F = new u.ParseSourceSpan(s.sourceSpan.start, (d || D || s).sourceSpan.end);
            this._addToParent(new a.Comment(v, F));
          }
          _consumeDocType(s) {
            let D = this._advanceIf(o.TokenType.RAW_TEXT), d = this._advanceIf(o.TokenType.DOC_TYPE_END), v = D != null ? D.parts[0].trim() : null, F = new u.ParseSourceSpan(s.sourceSpan.start, (d || D || s).sourceSpan.end);
            this._addToParent(new a.DocType(v, F));
          }
          _consumeExpansion(s) {
            let D = this._advance(), d = this._advance(), v = [];
            for (; this._peek.type === o.TokenType.EXPANSION_CASE_VALUE; ) {
              let T = this._parseExpansionCase();
              if (!T)
                return;
              v.push(T);
            }
            if (this._peek.type !== o.TokenType.EXPANSION_FORM_END) {
              this._errors.push(r.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '}'."));
              return;
            }
            let F = new u.ParseSourceSpan(s.sourceSpan.start, this._peek.sourceSpan.end);
            this._addToParent(new a.Expansion(D.parts[0], d.parts[0], v, F, D.sourceSpan)), this._advance();
          }
          _parseExpansionCase() {
            let s = this._advance();
            if (this._peek.type !== o.TokenType.EXPANSION_CASE_EXP_START)
              return this._errors.push(r.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '{'.")), null;
            let D = this._advance(), d = this._collectExpansionExpTokens(D);
            if (!d)
              return null;
            let v = this._advance();
            d.push(new o.Token(o.TokenType.EOF, [], v.sourceSpan));
            let F = new m(d, this.getTagDefinition, this.canSelfClose, this.allowHtmComponentClosingTags, this.isTagNameCaseSensitive).build();
            if (F.errors.length > 0)
              return this._errors = this._errors.concat(F.errors), null;
            let T = new u.ParseSourceSpan(s.sourceSpan.start, v.sourceSpan.end), I = new u.ParseSourceSpan(D.sourceSpan.start, v.sourceSpan.end);
            return new a.ExpansionCase(s.parts[0], F.rootNodes, T, s.sourceSpan, I);
          }
          _collectExpansionExpTokens(s) {
            let D = [], d = [o.TokenType.EXPANSION_CASE_EXP_START];
            for (; ; ) {
              if ((this._peek.type === o.TokenType.EXPANSION_FORM_START || this._peek.type === o.TokenType.EXPANSION_CASE_EXP_START) && d.push(this._peek.type), this._peek.type === o.TokenType.EXPANSION_CASE_EXP_END)
                if (P(d, o.TokenType.EXPANSION_CASE_EXP_START)) {
                  if (d.pop(), d.length == 0)
                    return D;
                } else
                  return this._errors.push(r.create(null, s.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
              if (this._peek.type === o.TokenType.EXPANSION_FORM_END)
                if (P(d, o.TokenType.EXPANSION_FORM_START))
                  d.pop();
                else
                  return this._errors.push(r.create(null, s.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
              if (this._peek.type === o.TokenType.EOF)
                return this._errors.push(r.create(null, s.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
              D.push(this._advance());
            }
          }
          _getText(s) {
            let D = s.parts[0];
            if (D.length > 0 && D[0] == `
`) {
              let d = this._getParentElement();
              d != null && d.children.length == 0 && this.getTagDefinition(d.name).ignoreFirstLf && (D = D.substring(1));
            }
            return D;
          }
          _consumeText(s) {
            let D = this._getText(s);
            D.length > 0 && this._addToParent(new a.Text(D, s.sourceSpan));
          }
          _closeVoidElement() {
            let s = this._getParentElement();
            s && this.getTagDefinition(s.name).isVoid && this._elementStack.pop();
          }
          _consumeStartTag(s) {
            let D = s.parts[0], d = s.parts[1], v = [];
            for (; this._peek.type === o.TokenType.ATTR_NAME; )
              v.push(this._consumeAttr(this._advance()));
            let F = this._getElementFullName(D, d, this._getParentElement()), T = !1;
            if (this._peek.type === o.TokenType.TAG_OPEN_END_VOID) {
              this._advance(), T = !0;
              let J = this.getTagDefinition(F);
              this.canSelfClose || J.canSelfClose || l.getNsPrefix(F) !== null || J.isVoid || this._errors.push(r.create(F, s.sourceSpan, 'Only void and foreign elements can be self closed "'.concat(s.parts[1], '"')));
            } else
              this._peek.type === o.TokenType.TAG_OPEN_END && (this._advance(), T = !1);
            let I = this._peek.sourceSpan.start, W = new u.ParseSourceSpan(s.sourceSpan.start, I), x = new u.ParseSourceSpan(s.sourceSpan.start.moveBy(1), s.sourceSpan.end), X = new a.Element(F, v, [], W, W, void 0, x);
            this._pushElement(X), T && (this._popElement(F), X.endSourceSpan = W);
          }
          _pushElement(s) {
            let D = this._getParentElement();
            D && this.getTagDefinition(D.name).isClosedByChild(s.name) && this._elementStack.pop(), this._addToParent(s), this._elementStack.push(s);
          }
          _consumeEndTag(s) {
            let D = this.allowHtmComponentClosingTags && s.parts.length === 0 ? null : this._getElementFullName(s.parts[0], s.parts[1], this._getParentElement());
            if (this._getParentElement() && (this._getParentElement().endSourceSpan = s.sourceSpan), D && this.getTagDefinition(D).isVoid)
              this._errors.push(r.create(D, s.sourceSpan, 'Void elements do not have end tags "'.concat(s.parts[1], '"')));
            else if (!this._popElement(D)) {
              let d = 'Unexpected closing tag "'.concat(D, '". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags');
              this._errors.push(r.create(D, s.sourceSpan, d));
            }
          }
          _popElement(s) {
            for (let D = this._elementStack.length - 1; D >= 0; D--) {
              let d = this._elementStack[D];
              if (!s || (l.getNsPrefix(d.name) ? d.name == s : d.name.toLowerCase() == s.toLowerCase()))
                return this._elementStack.splice(D, this._elementStack.length - D), !0;
              if (!this.getTagDefinition(d.name).closedByParent)
                return !1;
            }
            return !1;
          }
          _consumeAttr(s) {
            let D = l.mergeNsAndName(s.parts[0], s.parts[1]), d = s.sourceSpan.end, v = "", F, T;
            if (this._peek.type === o.TokenType.ATTR_QUOTE && (T = this._advance().sourceSpan.start), this._peek.type === o.TokenType.ATTR_VALUE) {
              let I = this._advance();
              v = I.parts[0], d = I.sourceSpan.end, F = I.sourceSpan;
            }
            return this._peek.type === o.TokenType.ATTR_QUOTE && (d = this._advance().sourceSpan.end, F = new u.ParseSourceSpan(T, d)), new a.Attribute(D, v, new u.ParseSourceSpan(s.sourceSpan.start, d), F, s.sourceSpan);
          }
          _getParentElement() {
            return this._elementStack.length > 0 ? this._elementStack[this._elementStack.length - 1] : null;
          }
          _getParentElementSkippingContainers() {
            let s = null;
            for (let D = this._elementStack.length - 1; D >= 0; D--) {
              if (!l.isNgContainer(this._elementStack[D].name))
                return { parent: this._elementStack[D], container: s };
              s = this._elementStack[D];
            }
            return { parent: null, container: s };
          }
          _addToParent(s) {
            let D = this._getParentElement();
            D != null ? D.children.push(s) : this._rootNodes.push(s);
          }
          _insertBeforeContainer(s, D, d) {
            if (!D)
              this._addToParent(d), this._elementStack.push(d);
            else {
              if (s) {
                let v = s.children.indexOf(D);
                s.children[v] = d;
              } else
                this._rootNodes.push(d);
              d.children.push(D), this._elementStack.splice(this._elementStack.indexOf(D), 0, d);
            }
          }
          _getElementFullName(s, D, d) {
            return s === "" && (s = this.getTagDefinition(D).implicitNamespacePrefix || "", s === "" && d != null && (s = l.getNsPrefix(d.name))), l.mergeNsAndName(s, D);
          }
        };
        function P(s, D) {
          return s.length > 0 && s[s.length - 1] === D;
        }
      } }), Sr = q({ "node_modules/angular-html-parser/lib/compiler/src/ml_parser/html_parser.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = Gt(), a = Ht(), o = Ht();
        e.ParseTreeResult = o.ParseTreeResult, e.TreeError = o.TreeError;
        var l = class extends a.Parser {
          constructor() {
            super(u.getHtmlTagDefinition);
          }
          parse(r, i, E) {
            let m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, P = arguments.length > 4 ? arguments[4] : void 0;
            return super.parse(r, i, E, m, P);
          }
        };
        e.HtmlParser = l;
      } }), zt = q({ "node_modules/angular-html-parser/lib/angular-html-parser/src/index.js"(e) {
        G(), Object.defineProperty(e, "__esModule", { value: !0 });
        var u = Sr(), a = We();
        e.TagContentType = a.TagContentType;
        var o = null, l = () => (o || (o = new u.HtmlParser()), o);
        function r(i) {
          let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, { canSelfClose: m = !1, allowHtmComponentClosingTags: P = !1, isTagNameCaseSensitive: s = !1, getTagContentType: D } = E;
          return l().parse(i, "angular-html-parser", { tokenizeExpansionForms: !1, interpolationConfig: void 0, canSelfClose: m, allowHtmComponentClosingTags: P }, s, D);
        }
        e.parse = r;
      } });
      G();
      var { ParseSourceSpan: Qe, ParseLocation: Wt, ParseSourceFile: br } = Oe(), wr = me(), xr = Pt(), Nr = $u(), { inferParserByLanguage: kr } = pr(), Or = dr(), Ct = mr(), Qt = gr(), { hasPragma: Pr } = fr(), { Node: Rr } = Fr(), { parseIeConditionalComment: Ir } = Ar(), { locStart: Lr, locEnd: qr } = vr();
      function jr(e, u, a) {
        let { recognizeSelfClosing: o, normalizeTagName: l, normalizeAttributeName: r, allowHtmComponentClosingTags: i, isTagNameCaseSensitive: E, getTagContentType: m } = u, P = zt(), { RecursiveVisitor: s, visitAll: D } = Xt(), { ParseSourceSpan: d } = Oe(), { getHtmlTagDefinition: v } = Gt(), { rootNodes: F, errors: T } = P.parse(e, { canSelfClose: o, allowHtmComponentClosingTags: i, isTagNameCaseSensitive: E, getTagContentType: m });
        if (a.parser === "vue")
          if (F.some((y) => y.type === "docType" && y.value === "html" || y.type === "element" && y.name.toLowerCase() === "html")) {
            o = !0, l = !0, r = !0, i = !0, E = !1;
            let y = P.parse(e, { canSelfClose: o, allowHtmComponentClosingTags: i, isTagNameCaseSensitive: E });
            F = y.rootNodes, T = y.errors;
          } else {
            let y = (Q) => {
              if (!Q || Q.type !== "element" || Q.name !== "template")
                return !1;
              let Z = Q.attrs.find((se) => se.name === "lang"), ee = Z && Z.value;
              return !ee || kr(ee, a) === "html";
            };
            if (F.some(y)) {
              let Q, Z = () => P.parse(e, { canSelfClose: o, allowHtmComponentClosingTags: i, isTagNameCaseSensitive: E }), ee = () => Q || (Q = Z()), se = (t) => ee().rootNodes.find((n) => {
                let { startSourceSpan: A } = n;
                return A && A.start.offset === t.startSourceSpan.start.offset;
              });
              for (let t = 0; t < F.length; t++) {
                let n = F[t], { endSourceSpan: A, startSourceSpan: h } = n;
                if (A === null)
                  T = ee().errors, F[t] = se(n) || n;
                else if (y(n)) {
                  let B = ee(), K = h.end.offset, ne = A.start.offset;
                  for (let de of B.errors) {
                    let { offset: ce } = de.span.start;
                    if (K < ce && ce < ne) {
                      T = [de];
                      break;
                    }
                  }
                  F[t] = se(n) || n;
                }
              }
            }
          }
        if (T.length > 0) {
          let { msg: y, span: { start: Q, end: Z } } = T[0];
          throw Nr(y, { start: { line: Q.line + 1, column: Q.col + 1 }, end: { line: Z.line + 1, column: Z.col + 1 } });
        }
        let I = (y) => {
          let Q = y.name.startsWith(":") ? y.name.slice(1).split(":")[0] : null, Z = y.nameSpan.toString(), ee = Q !== null && Z.startsWith("".concat(Q, ":")), se = ee ? Z.slice(Q.length + 1) : Z;
          y.name = se, y.namespace = Q, y.hasExplicitNamespace = ee;
        }, W = (y) => {
          switch (y.type) {
            case "element":
              I(y);
              for (let Q of y.attrs)
                I(Q), Q.valueSpan ? (Q.value = Q.valueSpan.toString(), /["']/.test(Q.value[0]) && (Q.value = Q.value.slice(1, -1))) : Q.value = null;
              break;
            case "comment":
              y.value = y.sourceSpan.toString().slice(4, -3);
              break;
            case "text":
              y.value = y.sourceSpan.toString();
              break;
          }
        }, x = (y, Q) => {
          let Z = y.toLowerCase();
          return Q(Z) ? Z : y;
        }, X = (y) => {
          if (y.type === "element" && (l && (!y.namespace || y.namespace === y.tagDefinition.implicitNamespacePrefix || Qt(y)) && (y.name = x(y.name, (Q) => Q in Or)), r)) {
            let Q = Ct[y.name] || /* @__PURE__ */ Object.create(null);
            for (let Z of y.attrs)
              Z.namespace || (Z.name = x(Z.name, (ee) => y.name in Ct && (ee in Ct["*"] || ee in Q)));
          }
        }, J = (y) => {
          y.sourceSpan && y.endSourceSpan && (y.sourceSpan = new d(y.sourceSpan.start, y.endSourceSpan.end));
        }, ae = (y) => {
          if (y.type === "element") {
            let Q = v(E ? y.name : y.name.toLowerCase());
            !y.namespace || y.namespace === Q.implicitNamespacePrefix || Qt(y) ? y.tagDefinition = Q : y.tagDefinition = v("");
          }
        };
        return D(new class extends s {
          visit(y) {
            W(y), ae(y), X(y), J(y);
          }
        }(), F), F;
      }
      function Yt(e, u, a) {
        let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, { frontMatter: l, content: r } = o ? wr(e) : { frontMatter: null, content: e }, i = new br(e, u.filepath), E = new Wt(i, 0, 0, 0), m = E.moveBy(e.length), P = { type: "root", sourceSpan: new Qe(E, m), children: jr(r, a, u) };
        if (l) {
          let d = new Wt(i, 0, 0, 0), v = d.moveBy(l.raw.length);
          l.sourceSpan = new Qe(d, v), P.children.unshift(l);
        }
        let s = new Rr(P), D = (d, v) => {
          let { offset: F } = v, T = e.slice(0, F).replace(/[^\n\r]/g, " "), I = Yt(T + d, u, a, !1);
          I.sourceSpan = new Qe(v, xr(I.children).sourceSpan.end);
          let W = I.children[0];
          return W.length === F ? I.children.shift() : (W.sourceSpan = new Qe(W.sourceSpan.start.moveBy(F), W.sourceSpan.end), W.value = W.value.slice(F)), I;
        };
        return s.walk((d) => {
          if (d.type === "comment") {
            let v = Ir(d, D);
            v && d.parent.replaceChild(d, v);
          }
        }), s;
      }
      function Ye() {
        let { name: e, recognizeSelfClosing: u = !1, normalizeTagName: a = !1, normalizeAttributeName: o = !1, allowHtmComponentClosingTags: l = !1, isTagNameCaseSensitive: r = !1, getTagContentType: i } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return { parse: (E, m, P) => Yt(E, Object.assign({ parser: e }, P), { recognizeSelfClosing: u, normalizeTagName: a, normalizeAttributeName: o, allowHtmComponentClosingTags: l, isTagNameCaseSensitive: r, getTagContentType: i }), hasPragma: Pr, astFormat: "html", locStart: Lr, locEnd: qr };
      }
      p.exports = { parsers: { html: Ye({ name: "html", recognizeSelfClosing: !0, normalizeTagName: !0, normalizeAttributeName: !0, allowHtmComponentClosingTags: !0 }), angular: Ye({ name: "angular" }), vue: Ye({ name: "vue", recognizeSelfClosing: !0, isTagNameCaseSensitive: !0, getTagContentType: (e, u, a, o) => {
        if (e.toLowerCase() !== "html" && !a && (e !== "template" || o.some((l) => {
          let { name: r, value: i } = l;
          return r === "lang" && i !== "html" && i !== "" && i !== void 0;
        })))
          return zt().TagContentType.RAW_TEXT;
      } }), lwc: Ye({ name: "lwc" }) } };
    });
    return ju();
  });
})(Et);
const Ur = /* @__PURE__ */ $r(Et.exports), Gr = /* @__PURE__ */ Mr({
  __proto__: null,
  default: Ur
}, [Et.exports]);
export {
  Gr as p
};
