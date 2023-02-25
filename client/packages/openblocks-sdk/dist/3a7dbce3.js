import { a as po, c as ni } from "./b1893f4d.js";
function uo(ht, Ut) {
  for (var w = 0; w < Ut.length; w++) {
    const he = Ut[w];
    if (typeof he != "string" && !Array.isArray(he)) {
      for (const be in he)
        if (be !== "default" && !(be in ht)) {
          const Ie = Object.getOwnPropertyDescriptor(he, be);
          Ie && Object.defineProperty(ht, be, Ie.get ? Ie : {
            enumerable: !0,
            get: () => he[be]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(ht, Symbol.toStringTag, { value: "Module" }));
}
var ks = { exports: {} };
(function(ht, Ut) {
  (function(w) {
    ht.exports = w();
  })(function() {
    var w = (E, c) => () => (c || E((c = { exports: {} }).exports, c), c.exports), he = w((E, c) => {
      var u = function(d) {
        return d && d.Math == Math && d;
      };
      c.exports = u(typeof globalThis == "object" && globalThis) || u(typeof window == "object" && window) || u(typeof self == "object" && self) || u(typeof ni == "object" && ni) || function() {
        return this;
      }() || Function("return this")();
    }), be = w((E, c) => {
      c.exports = function(u) {
        try {
          return !!u();
        } catch {
          return !0;
        }
      };
    }), Ie = w((E, c) => {
      var u = be();
      c.exports = !u(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] != 7;
      });
    }), _t = w((E, c) => {
      var u = be();
      c.exports = !u(function() {
        var d = function() {
        }.bind();
        return typeof d != "function" || d.hasOwnProperty("prototype");
      });
    }), zt = w((E, c) => {
      var u = _t(), d = Function.prototype.call;
      c.exports = u ? d.bind(d) : function() {
        return d.apply(d, arguments);
      };
    }), oi = w((E) => {
      var c = {}.propertyIsEnumerable, u = Object.getOwnPropertyDescriptor, d = u && !c.call({ 1: 2 }, 1);
      E.f = d ? function(m) {
        var f = u(this, m);
        return !!f && f.enumerable;
      } : c;
    }), Ds = w((E, c) => {
      c.exports = function(u, d) {
        return { enumerable: !(u & 1), configurable: !(u & 2), writable: !(u & 4), value: d };
      };
    }), ve = w((E, c) => {
      var u = _t(), d = Function.prototype, m = d.bind, f = d.call, b = u && m.bind(f, f);
      c.exports = u ? function(T) {
        return T && b(T);
      } : function(T) {
        return T && function() {
          return f.apply(T, arguments);
        };
      };
    }), Ht = w((E, c) => {
      var u = ve(), d = u({}.toString), m = u("".slice);
      c.exports = function(f) {
        return m(d(f), 8, -1);
      };
    }), hi = w((E, c) => {
      var u = he(), d = ve(), m = be(), f = Ht(), b = u.Object, T = d("".split);
      c.exports = m(function() {
        return !b("z").propertyIsEnumerable(0);
      }) ? function(v) {
        return f(v) == "String" ? T(v, "") : b(v);
      } : b;
    }), Fs = w((E, c) => {
      var u = he(), d = u.TypeError;
      c.exports = function(m) {
        if (m == null)
          throw d("Can't call method on " + m);
        return m;
      };
    }), Vt = w((E, c) => {
      var u = hi(), d = Fs();
      c.exports = function(m) {
        return u(d(m));
      };
    }), Se = w((E, c) => {
      c.exports = function(u) {
        return typeof u == "function";
      };
    }), $e = w((E, c) => {
      var u = Se();
      c.exports = function(d) {
        return typeof d == "object" ? d !== null : u(d);
      };
    }), At = w((E, c) => {
      var u = he(), d = Se(), m = function(f) {
        return d(f) ? f : void 0;
      };
      c.exports = function(f, b) {
        return arguments.length < 2 ? m(u[f]) : u[f] && u[f][b];
      };
    }), li = w((E, c) => {
      var u = ve();
      c.exports = u({}.isPrototypeOf);
    }), pi = w((E, c) => {
      var u = At();
      c.exports = u("navigator", "userAgent") || "";
    }), ui = w((E, c) => {
      var u = he(), d = pi(), m = u.process, f = u.Deno, b = m && m.versions || f && f.version, T = b && b.v8, v, D;
      T && (v = T.split("."), D = v[0] > 0 && v[0] < 4 ? 1 : +(v[0] + v[1])), !D && d && (v = d.match(/Edge\/(\d+)/), (!v || v[1] >= 74) && (v = d.match(/Chrome\/(\d+)/), v && (D = +v[1]))), c.exports = D;
    }), Ls = w((E, c) => {
      var u = ui(), d = be();
      c.exports = !!Object.getOwnPropertySymbols && !d(function() {
        var m = Symbol();
        return !String(m) || !(Object(m) instanceof Symbol) || !Symbol.sham && u && u < 41;
      });
    }), Bs = w((E, c) => {
      var u = Ls();
      c.exports = u && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }), Ms = w((E, c) => {
      var u = he(), d = At(), m = Se(), f = li(), b = Bs(), T = u.Object;
      c.exports = b ? function(v) {
        return typeof v == "symbol";
      } : function(v) {
        var D = d("Symbol");
        return m(D) && f(D.prototype, T(v));
      };
    }), ci = w((E, c) => {
      var u = he(), d = u.String;
      c.exports = function(m) {
        try {
          return d(m);
        } catch {
          return "Object";
        }
      };
    }), qt = w((E, c) => {
      var u = he(), d = Se(), m = ci(), f = u.TypeError;
      c.exports = function(b) {
        if (d(b))
          return b;
        throw f(m(b) + " is not a function");
      };
    }), di = w((E, c) => {
      var u = qt();
      c.exports = function(d, m) {
        var f = d[m];
        return f == null ? void 0 : u(f);
      };
    }), mi = w((E, c) => {
      var u = he(), d = zt(), m = Se(), f = $e(), b = u.TypeError;
      c.exports = function(T, v) {
        var D, F;
        if (v === "string" && m(D = T.toString) && !f(F = d(D, T)) || m(D = T.valueOf) && !f(F = d(D, T)) || v !== "string" && m(D = T.toString) && !f(F = d(D, T)))
          return F;
        throw b("Can't convert object to primitive value");
      };
    }), fi = w((E, c) => {
      c.exports = !1;
    }), Kt = w((E, c) => {
      var u = he(), d = Object.defineProperty;
      c.exports = function(m, f) {
        try {
          d(u, m, { value: f, configurable: !0, writable: !0 });
        } catch {
          u[m] = f;
        }
        return f;
      };
    }), Wt = w((E, c) => {
      var u = he(), d = Kt(), m = "__core-js_shared__", f = u[m] || d(m, {});
      c.exports = f;
    }), Os = w((E, c) => {
      var u = fi(), d = Wt();
      (c.exports = function(m, f) {
        return d[m] || (d[m] = f !== void 0 ? f : {});
      })("versions", []).push({ version: "3.22.2", mode: u ? "pure" : "global", copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.22.2/LICENSE", source: "https://github.com/zloirock/core-js" });
    }), js = w((E, c) => {
      var u = he(), d = Fs(), m = u.Object;
      c.exports = function(f) {
        return m(d(f));
      };
    }), Je = w((E, c) => {
      var u = ve(), d = js(), m = u({}.hasOwnProperty);
      c.exports = Object.hasOwn || function(f, b) {
        return m(d(f), b);
      };
    }), Rs = w((E, c) => {
      var u = ve(), d = 0, m = Math.random(), f = u(1 .toString);
      c.exports = function(b) {
        return "Symbol(" + (b === void 0 ? "" : b) + ")_" + f(++d + m, 36);
      };
    }), Pt = w((E, c) => {
      var u = he(), d = Os(), m = Je(), f = Rs(), b = Ls(), T = Bs(), v = d("wks"), D = u.Symbol, F = D && D.for, H = T ? D : D && D.withoutSetter || f;
      c.exports = function(j) {
        if (!m(v, j) || !(b || typeof v[j] == "string")) {
          var C = "Symbol." + j;
          b && m(D, j) ? v[j] = D[j] : T && F ? v[j] = F(C) : v[j] = H(C);
        }
        return v[j];
      };
    }), yi = w((E, c) => {
      var u = he(), d = zt(), m = $e(), f = Ms(), b = di(), T = mi(), v = Pt(), D = u.TypeError, F = v("toPrimitive");
      c.exports = function(H, j) {
        if (!m(H) || f(H))
          return H;
        var C = b(H, F), X;
        if (C) {
          if (j === void 0 && (j = "default"), X = d(C, H, j), !m(X) || f(X))
            return X;
          throw D("Can't convert object to primitive value");
        }
        return j === void 0 && (j = "number"), T(H, j);
      };
    }), Us = w((E, c) => {
      var u = yi(), d = Ms();
      c.exports = function(m) {
        var f = u(m, "string");
        return d(f) ? f : f + "";
      };
    }), xi = w((E, c) => {
      var u = he(), d = $e(), m = u.document, f = d(m) && d(m.createElement);
      c.exports = function(b) {
        return f ? m.createElement(b) : {};
      };
    }), _s = w((E, c) => {
      var u = Ie(), d = be(), m = xi();
      c.exports = !u && !d(function() {
        return Object.defineProperty(m("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }), zs = w((E) => {
      var c = Ie(), u = zt(), d = oi(), m = Ds(), f = Vt(), b = Us(), T = Je(), v = _s(), D = Object.getOwnPropertyDescriptor;
      E.f = c ? D : function(F, H) {
        if (F = f(F), H = b(H), v)
          try {
            return D(F, H);
          } catch {
          }
        if (T(F, H))
          return m(!u(d.f, F, H), F[H]);
      };
    }), gi = w((E, c) => {
      var u = Ie(), d = be();
      c.exports = u && d(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype != 42;
      });
    }), Hs = w((E, c) => {
      var u = he(), d = $e(), m = u.String, f = u.TypeError;
      c.exports = function(b) {
        if (d(b))
          return b;
        throw f(m(b) + " is not an object");
      };
    }), Vs = w((E) => {
      var c = he(), u = Ie(), d = _s(), m = gi(), f = Hs(), b = Us(), T = c.TypeError, v = Object.defineProperty, D = Object.getOwnPropertyDescriptor, F = "enumerable", H = "configurable", j = "writable";
      E.f = u ? m ? function(C, X, K) {
        if (f(C), X = b(X), f(K), typeof C == "function" && X === "prototype" && "value" in K && j in K && !K[j]) {
          var G = D(C, X);
          G && G[j] && (C[X] = K.value, K = { configurable: H in K ? K[H] : G[H], enumerable: F in K ? K[F] : G[F], writable: !1 });
        }
        return v(C, X, K);
      } : v : function(C, X, K) {
        if (f(C), X = b(X), f(K), d)
          try {
            return v(C, X, K);
          } catch {
          }
        if ("get" in K || "set" in K)
          throw T("Accessors not supported");
        return "value" in K && (C[X] = K.value), C;
      };
    }), Jt = w((E, c) => {
      var u = Ie(), d = Vs(), m = Ds();
      c.exports = u ? function(f, b, T) {
        return d.f(f, b, m(1, T));
      } : function(f, b, T) {
        return f[b] = T, f;
      };
    }), Xt = w((E, c) => {
      var u = ve(), d = Se(), m = Wt(), f = u(Function.toString);
      d(m.inspectSource) || (m.inspectSource = function(b) {
        return f(b);
      }), c.exports = m.inspectSource;
    }), Ai = w((E, c) => {
      var u = he(), d = Se(), m = Xt(), f = u.WeakMap;
      c.exports = d(f) && /native code/.test(m(f));
    }), Pi = w((E, c) => {
      var u = Os(), d = Rs(), m = u("keys");
      c.exports = function(f) {
        return m[f] || (m[f] = d(f));
      };
    }), qs = w((E, c) => {
      c.exports = {};
    }), bi = w((E, c) => {
      var u = Ai(), d = he(), m = ve(), f = $e(), b = Jt(), T = Je(), v = Wt(), D = Pi(), F = qs(), H = "Object already initialized", j = d.TypeError, C = d.WeakMap, X, K, G, W = function(pe) {
        return G(pe) ? K(pe) : X(pe, {});
      }, ye = function(pe) {
        return function(Te) {
          var pt;
          if (!f(Te) || (pt = K(Te)).type !== pe)
            throw j("Incompatible receiver, " + pe + " required");
          return pt;
        };
      };
      u || v.state ? (ue = v.state || (v.state = new C()), Ae = m(ue.get), Le = m(ue.has), lt = m(ue.set), X = function(pe, Te) {
        if (Le(ue, pe))
          throw new j(H);
        return Te.facade = pe, lt(ue, pe, Te), Te;
      }, K = function(pe) {
        return Ae(ue, pe) || {};
      }, G = function(pe) {
        return Le(ue, pe);
      }) : (Be = D("state"), F[Be] = !0, X = function(pe, Te) {
        if (T(pe, Be))
          throw new j(H);
        return Te.facade = pe, b(pe, Be, Te), Te;
      }, K = function(pe) {
        return T(pe, Be) ? pe[Be] : {};
      }, G = function(pe) {
        return T(pe, Be);
      });
      var ue, Ae, Le, lt, Be;
      c.exports = { set: X, get: K, has: G, enforce: W, getterFor: ye };
    }), Ti = w((E, c) => {
      var u = Ie(), d = Je(), m = Function.prototype, f = u && Object.getOwnPropertyDescriptor, b = d(m, "name"), T = b && function() {
      }.name === "something", v = b && (!u || u && f(m, "name").configurable);
      c.exports = { EXISTS: b, PROPER: T, CONFIGURABLE: v };
    }), Ei = w((E, c) => {
      var u = he(), d = Se(), m = Je(), f = Jt(), b = Kt(), T = Xt(), v = bi(), D = Ti().CONFIGURABLE, F = v.get, H = v.enforce, j = String(String).split("String");
      (c.exports = function(C, X, K, G) {
        var W = G ? !!G.unsafe : !1, ye = G ? !!G.enumerable : !1, ue = G ? !!G.noTargetGet : !1, Ae = G && G.name !== void 0 ? G.name : X, Le;
        if (d(K) && (String(Ae).slice(0, 7) === "Symbol(" && (Ae = "[" + String(Ae).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), (!m(K, "name") || D && K.name !== Ae) && f(K, "name", Ae), Le = H(K), Le.source || (Le.source = j.join(typeof Ae == "string" ? Ae : ""))), C === u) {
          ye ? C[X] = K : b(X, K);
          return;
        } else
          W ? !ue && C[X] && (ye = !0) : delete C[X];
        ye ? C[X] = K : f(C, X, K);
      })(Function.prototype, "toString", function() {
        return d(this) && F(this).source || T(this);
      });
    }), Ks = w((E, c) => {
      var u = Math.ceil, d = Math.floor;
      c.exports = function(m) {
        var f = +m;
        return f !== f || f === 0 ? 0 : (f > 0 ? d : u)(f);
      };
    }), Ci = w((E, c) => {
      var u = Ks(), d = Math.max, m = Math.min;
      c.exports = function(f, b) {
        var T = u(f);
        return T < 0 ? d(T + b, 0) : m(T, b);
      };
    }), wi = w((E, c) => {
      var u = Ks(), d = Math.min;
      c.exports = function(m) {
        return m > 0 ? d(u(m), 9007199254740991) : 0;
      };
    }), Gt = w((E, c) => {
      var u = wi();
      c.exports = function(d) {
        return u(d.length);
      };
    }), vi = w((E, c) => {
      var u = Vt(), d = Ci(), m = Gt(), f = function(b) {
        return function(T, v, D) {
          var F = u(T), H = m(F), j = d(D, H), C;
          if (b && v != v) {
            for (; H > j; )
              if (C = F[j++], C != C)
                return !0;
          } else
            for (; H > j; j++)
              if ((b || j in F) && F[j] === v)
                return b || j || 0;
          return !b && -1;
        };
      };
      c.exports = { includes: f(!0), indexOf: f(!1) };
    }), Si = w((E, c) => {
      var u = ve(), d = Je(), m = Vt(), f = vi().indexOf, b = qs(), T = u([].push);
      c.exports = function(v, D) {
        var F = m(v), H = 0, j = [], C;
        for (C in F)
          !d(b, C) && d(F, C) && T(j, C);
        for (; D.length > H; )
          d(F, C = D[H++]) && (~f(j, C) || T(j, C));
        return j;
      };
    }), Ni = w((E, c) => {
      c.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }), Ii = w((E) => {
      var c = Si(), u = Ni(), d = u.concat("length", "prototype");
      E.f = Object.getOwnPropertyNames || function(m) {
        return c(m, d);
      };
    }), ki = w((E) => {
      E.f = Object.getOwnPropertySymbols;
    }), Di = w((E, c) => {
      var u = At(), d = ve(), m = Ii(), f = ki(), b = Hs(), T = d([].concat);
      c.exports = u("Reflect", "ownKeys") || function(v) {
        var D = m.f(b(v)), F = f.f;
        return F ? T(D, F(v)) : D;
      };
    }), Fi = w((E, c) => {
      var u = Je(), d = Di(), m = zs(), f = Vs();
      c.exports = function(b, T, v) {
        for (var D = d(T), F = f.f, H = m.f, j = 0; j < D.length; j++) {
          var C = D[j];
          !u(b, C) && !(v && u(v, C)) && F(b, C, H(T, C));
        }
      };
    }), Li = w((E, c) => {
      var u = be(), d = Se(), m = /#|\.prototype\./, f = function(F, H) {
        var j = T[b(F)];
        return j == D ? !0 : j == v ? !1 : d(H) ? u(H) : !!H;
      }, b = f.normalize = function(F) {
        return String(F).replace(m, ".").toLowerCase();
      }, T = f.data = {}, v = f.NATIVE = "N", D = f.POLYFILL = "P";
      c.exports = f;
    }), Ws = w((E, c) => {
      var u = he(), d = zs().f, m = Jt(), f = Ei(), b = Kt(), T = Fi(), v = Li();
      c.exports = function(D, F) {
        var H = D.target, j = D.global, C = D.stat, X, K, G, W, ye, ue;
        if (j ? K = u : C ? K = u[H] || b(H, {}) : K = (u[H] || {}).prototype, K)
          for (G in F) {
            if (ye = F[G], D.noTargetGet ? (ue = d(K, G), W = ue && ue.value) : W = K[G], X = v(j ? G : H + (C ? "." : "#") + G, D.forced), !X && W !== void 0) {
              if (typeof ye == typeof W)
                continue;
              T(ye, W);
            }
            (D.sham || W && W.sham) && m(ye, "sham", !0), f(K, G, ye, D);
          }
      };
    }), Bi = w(() => {
      var E = Ws(), c = he();
      E({ global: !0 }, { globalThis: c });
    }), Mi = w(() => {
      Bi();
    }), Js = w((E, c) => {
      var u = Ht();
      c.exports = Array.isArray || function(d) {
        return u(d) == "Array";
      };
    }), Oi = w((E, c) => {
      var u = ve(), d = qt(), m = _t(), f = u(u.bind);
      c.exports = function(b, T) {
        return d(b), T === void 0 ? b : m ? f(b, T) : function() {
          return b.apply(T, arguments);
        };
      };
    }), ji = w((E, c) => {
      var u = he(), d = Js(), m = Gt(), f = Oi(), b = u.TypeError, T = function(v, D, F, H, j, C, X, K) {
        for (var G = j, W = 0, ye = X ? f(X, K) : !1, ue, Ae; W < H; ) {
          if (W in F) {
            if (ue = ye ? ye(F[W], W, D) : F[W], C > 0 && d(ue))
              Ae = m(ue), G = T(v, D, ue, Ae, G, C - 1) - 1;
            else {
              if (G >= 9007199254740991)
                throw b("Exceed the acceptable array length");
              v[G] = ue;
            }
            G++;
          }
          W++;
        }
        return G;
      };
      c.exports = T;
    }), Ri = w((E, c) => {
      var u = Pt(), d = u("toStringTag"), m = {};
      m[d] = "z", c.exports = String(m) === "[object z]";
    }), Ui = w((E, c) => {
      var u = he(), d = Ri(), m = Se(), f = Ht(), b = Pt(), T = b("toStringTag"), v = u.Object, D = f(function() {
        return arguments;
      }()) == "Arguments", F = function(H, j) {
        try {
          return H[j];
        } catch {
        }
      };
      c.exports = d ? f : function(H) {
        var j, C, X;
        return H === void 0 ? "Undefined" : H === null ? "Null" : typeof (C = F(j = v(H), T)) == "string" ? C : D ? f(j) : (X = f(j)) == "Object" && m(j.callee) ? "Arguments" : X;
      };
    }), _i = w((E, c) => {
      var u = ve(), d = be(), m = Se(), f = Ui(), b = At(), T = Xt(), v = function() {
      }, D = [], F = b("Reflect", "construct"), H = /^\s*(?:class|function)\b/, j = u(H.exec), C = !H.exec(v), X = function(G) {
        if (!m(G))
          return !1;
        try {
          return F(v, D, G), !0;
        } catch {
          return !1;
        }
      }, K = function(G) {
        if (!m(G))
          return !1;
        switch (f(G)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return C || !!j(H, T(G));
        } catch {
          return !0;
        }
      };
      K.sham = !0, c.exports = !F || d(function() {
        var G;
        return X(X.call) || !X(Object) || !X(function() {
          G = !0;
        }) || G;
      }) ? K : X;
    }), zi = w((E, c) => {
      var u = he(), d = Js(), m = _i(), f = $e(), b = Pt(), T = b("species"), v = u.Array;
      c.exports = function(D) {
        var F;
        return d(D) && (F = D.constructor, m(F) && (F === v || d(F.prototype)) ? F = void 0 : f(F) && (F = F[T], F === null && (F = void 0))), F === void 0 ? v : F;
      };
    }), Hi = w((E, c) => {
      var u = zi();
      c.exports = function(d, m) {
        return new (u(d))(m === 0 ? 0 : m);
      };
    }), Vi = w(() => {
      var E = Ws(), c = ji(), u = qt(), d = js(), m = Gt(), f = Hi();
      E({ target: "Array", proto: !0 }, { flatMap: function(b) {
        var T = d(this), v = m(T), D;
        return u(b), D = f(T, 0), D.length = c(D, T, T, v, 0, 1, b, arguments.length > 1 ? arguments[1] : void 0), D;
      } });
    }), qi = w((E, c) => {
      var u, d, m, f, b;
      function T(I, P) {
        return P || (P = I.slice(0)), Object.freeze(Object.defineProperties(I, { raw: { value: Object.freeze(P) } }));
      }
      Mi(), Vi();
      var v = Object.defineProperty, D = Object.getOwnPropertyDescriptor, F = Object.getOwnPropertyNames, H = Object.prototype.hasOwnProperty, j = (I, P) => function() {
        return I && (P = (0, I[F(I)[0]])(I = 0)), P;
      }, C = (I, P) => function() {
        return P || (0, I[F(I)[0]])((P = { exports: {} }).exports, P), P.exports;
      }, X = (I, P) => {
        for (var A in P)
          v(I, A, { get: P[A], enumerable: !0 });
      }, K = (I, P, A, x) => {
        if (P && typeof P == "object" || typeof P == "function")
          for (let g of F(P))
            !H.call(I, g) && g !== A && v(I, g, { get: () => P[g], enumerable: !(x = D(P, g)) || x.enumerable });
        return I;
      }, G = (I) => K(v({}, "__esModule", { value: !0 }), I), W = j({ "<define:process>"() {
      } }), ye = C({ "src/utils/try-combinations.js"(I, P) {
        W();
        function A() {
          let x;
          for (var g = arguments.length, O = new Array(g), M = 0; M < g; M++)
            O[M] = arguments[M];
          for (let [k, _] of O.entries())
            try {
              return { result: _() };
            } catch (ee) {
              k === 0 && (x = ee);
            }
          return { error: x };
        }
        P.exports = A;
      } }), ue = C({ "src/language-js/utils/get-shebang.js"(I, P) {
        W();
        function A(x) {
          if (!x.startsWith("#!"))
            return "";
          let g = x.indexOf(`
`);
          return g === -1 ? x : x.slice(0, g);
        }
        P.exports = A;
      } }), Ae = C({ "src/utils/text/skip-inline-comment.js"(I, P) {
        W();
        function A(x, g) {
          if (g === !1)
            return !1;
          if (x.charAt(g) === "/" && x.charAt(g + 1) === "*") {
            for (let O = g + 2; O < x.length; ++O)
              if (x.charAt(O) === "*" && x.charAt(O + 1) === "/")
                return O + 2;
          }
          return g;
        }
        P.exports = A;
      } }), Le = C({ "src/utils/text/skip-newline.js"(I, P) {
        W();
        function A(x, g, O) {
          let M = O && O.backwards;
          if (g === !1)
            return !1;
          let k = x.charAt(g);
          if (M) {
            if (x.charAt(g - 1) === "\r" && k === `
`)
              return g - 2;
            if (k === `
` || k === "\r" || k === "\u2028" || k === "\u2029")
              return g - 1;
          } else {
            if (k === "\r" && x.charAt(g + 1) === `
`)
              return g + 2;
            if (k === `
` || k === "\r" || k === "\u2028" || k === "\u2029")
              return g + 1;
          }
          return g;
        }
        P.exports = A;
      } }), lt = C({ "src/utils/text/skip.js"(I, P) {
        W();
        function A(k) {
          return (_, ee, Y) => {
            let L = Y && Y.backwards;
            if (ee === !1)
              return !1;
            let { length: Q } = _, te = ee;
            for (; te >= 0 && te < Q; ) {
              let q = _.charAt(te);
              if (k instanceof RegExp) {
                if (!k.test(q))
                  return te;
              } else if (!k.includes(q))
                return te;
              L ? te-- : te++;
            }
            return te === -1 || te === Q ? te : !1;
          };
        }
        var x = A(/\s/), g = A(" 	"), O = A(",; 	"), M = A(/[^\n\r]/);
        P.exports = { skipWhitespace: x, skipSpaces: g, skipToLineEnd: O, skipEverythingButNewLine: M };
      } }), Be = C({ "src/utils/text/skip-trailing-comment.js"(I, P) {
        W();
        var { skipEverythingButNewLine: A } = lt();
        function x(g, O) {
          return O === !1 ? !1 : g.charAt(O) === "/" && g.charAt(O + 1) === "/" ? A(g, O) : O;
        }
        P.exports = x;
      } }), pe = C({ "src/utils/text/get-next-non-space-non-comment-character-index-with-start-index.js"(I, P) {
        W();
        var A = Ae(), x = Le(), g = Be(), { skipSpaces: O } = lt();
        function M(k, _) {
          let ee = null, Y = _;
          for (; Y !== ee; )
            ee = Y, Y = O(k, Y), Y = A(k, Y), Y = g(k, Y), Y = x(k, Y);
          return Y;
        }
        P.exports = M;
      } }), Te = {};
      X(Te, { EOL: () => $t, arch: () => Ki, cpus: () => Zs, default: () => ir, endianness: () => pt, freemem: () => Qs, getNetworkInterfaces: () => rr, hostname: () => Xs, loadavg: () => Gs, networkInterfaces: () => sr, platform: () => Wi, release: () => tr, tmpDir: () => Yt, tmpdir: () => Qt, totalmem: () => $s, type: () => er, uptime: () => Ys });
      function pt() {
        if (typeof bt > "u") {
          var I = new ArrayBuffer(2), P = new Uint8Array(I), A = new Uint16Array(I);
          if (P[0] = 1, P[1] = 2, A[0] === 258)
            bt = "BE";
          else if (A[0] === 513)
            bt = "LE";
          else
            throw new Error("unable to figure out endianess");
        }
        return bt;
      }
      function Xs() {
        return typeof globalThis.location < "u" ? globalThis.location.hostname : "";
      }
      function Gs() {
        return [];
      }
      function Ys() {
        return 0;
      }
      function Qs() {
        return Number.MAX_VALUE;
      }
      function $s() {
        return Number.MAX_VALUE;
      }
      function Zs() {
        return [];
      }
      function er() {
        return "Browser";
      }
      function tr() {
        return typeof globalThis.navigator < "u" ? globalThis.navigator.appVersion : "";
      }
      function sr() {
      }
      function rr() {
      }
      function Ki() {
        return "javascript";
      }
      function Wi() {
        return "browser";
      }
      function Yt() {
        return "/tmp";
      }
      var bt, Qt, $t, ir, Ji = j({ "node-modules-polyfills:os"() {
        W(), Qt = Yt, $t = `
`, ir = { EOL: $t, tmpdir: Qt, tmpDir: Yt, networkInterfaces: sr, getNetworkInterfaces: rr, release: tr, type: er, cpus: Zs, totalmem: $s, freemem: Qs, uptime: Ys, loadavg: Gs, hostname: Xs, endianness: pt };
      } }), Xi = C({ "node-modules-polyfills-commonjs:os"(I, P) {
        W();
        var A = (Ji(), G(Te));
        if (A && A.default) {
          P.exports = A.default;
          for (let x in A)
            P.exports[x] = A[x];
        } else
          A && (P.exports = A);
      } }), Gi = C({ "node_modules/detect-newline/index.js"(I, P) {
        W();
        var A = (x) => {
          if (typeof x != "string")
            throw new TypeError("Expected a string");
          let g = x.match(/(?:\r?\n)/g) || [];
          if (g.length === 0)
            return;
          let O = g.filter((k) => k === `\r
`).length, M = g.length - O;
          return O > M ? `\r
` : `
`;
        };
        P.exports = A, P.exports.graceful = (x) => typeof x == "string" && A(x) || `
`;
      } }), Yi = C({ "node_modules/jest-docblock/build/index.js"(I) {
        W(), Object.defineProperty(I, "__esModule", { value: !0 }), I.extract = te, I.parse = le, I.parseWithComments = Ee, I.print = se, I.strip = q;
        function P() {
          let h = Xi();
          return P = function() {
            return h;
          }, h;
        }
        function A() {
          let h = x(Gi());
          return A = function() {
            return h;
          }, h;
        }
        function x(h) {
          return h && h.__esModule ? h : { default: h };
        }
        var g = /\*\/$/, O = /^\/\*\*/, M = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/, k = /(^|\s+)\/\/([^\r\n]*)/g, _ = /^(\r?\n)+/, ee = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g, Y = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g, L = /(\r?\n|^) *\* ?/g, Q = [];
        function te(h) {
          let ce = h.match(M);
          return ce ? ce[0].trimLeft() : "";
        }
        function q(h) {
          let ce = h.match(M);
          return ce && ce[0] ? h.substring(ce[0].length) : h;
        }
        function le(h) {
          return Ee(h).pragmas;
        }
        function Ee(h) {
          let ce = (0, A().default)(h) || P().EOL;
          h = h.replace(O, "").replace(g, "").replace(L, "$1");
          let Ce = "";
          for (; Ce !== h; )
            Ce = h, h = h.replace(ee, "".concat(ce, "$1 $2").concat(ce));
          h = h.replace(_, "").trimRight();
          let de = /* @__PURE__ */ Object.create(null), tt = h.replace(Y, "").replace(_, "").trimRight(), me;
          for (; me = Y.exec(h); ) {
            let ne = me[2].replace(k, "");
            typeof de[me[1]] == "string" || Array.isArray(de[me[1]]) ? de[me[1]] = Q.concat(de[me[1]], ne) : de[me[1]] = ne;
          }
          return { comments: tt, pragmas: de };
        }
        function se(h) {
          let { comments: ce = "", pragmas: Ce = {} } = h, de = (0, A().default)(ce) || P().EOL, tt = "/**", me = " *", ne = " */", J = Object.keys(Ce), N = J.map((xe) => Z(xe, Ce[xe])).reduce((xe, De) => xe.concat(De), []).map((xe) => me + " " + xe + de).join("");
          if (!ce) {
            if (J.length === 0)
              return "";
            if (J.length === 1 && !Array.isArray(Ce[J[0]])) {
              let xe = Ce[J[0]];
              return "".concat(tt, " ").concat(Z(J[0], xe)[0]).concat(ne);
            }
          }
          let ut = ce.split(de).map((xe) => "".concat(me, " ").concat(xe)).join(de) + de;
          return tt + de + (ce ? ut : "") + (ce && J.length ? me + de : "") + N + ne;
        }
        function Z(h, ce) {
          return Q.concat(ce).map((Ce) => "@".concat(h, " ").concat(Ce).trim());
        }
      } }), Qi = C({ "src/common/end-of-line.js"(I, P) {
        W();
        function A(M) {
          let k = M.indexOf("\r");
          return k >= 0 ? M.charAt(k + 1) === `
` ? "crlf" : "cr" : "lf";
        }
        function x(M) {
          switch (M) {
            case "cr":
              return "\r";
            case "crlf":
              return `\r
`;
            default:
              return `
`;
          }
        }
        function g(M, k) {
          let _;
          switch (k) {
            case `
`:
              _ = /\n/g;
              break;
            case "\r":
              _ = /\r/g;
              break;
            case `\r
`:
              _ = /\r\n/g;
              break;
            default:
              throw new Error('Unexpected "eol" '.concat(JSON.stringify(k), "."));
          }
          let ee = M.match(_);
          return ee ? ee.length : 0;
        }
        function O(M) {
          return M.replace(/\r\n?/g, `
`);
        }
        P.exports = { guessEndOfLine: A, convertEndOfLineToChars: x, countEndOfLineChars: g, normalizeEndOfLine: O };
      } }), $i = C({ "src/language-js/pragma.js"(I, P) {
        W();
        var { parseWithComments: A, strip: x, extract: g, print: O } = Yi(), { normalizeEndOfLine: M } = Qi(), k = ue();
        function _(L) {
          let Q = k(L);
          Q && (L = L.slice(Q.length + 1));
          let te = g(L), { pragmas: q, comments: le } = A(te);
          return { shebang: Q, text: L, pragmas: q, comments: le };
        }
        function ee(L) {
          let Q = Object.keys(_(L).pragmas);
          return Q.includes("prettier") || Q.includes("format");
        }
        function Y(L) {
          let { shebang: Q, text: te, pragmas: q, comments: le } = _(L), Ee = x(te), se = O({ pragmas: Object.assign({ format: "" }, q), comments: le.trimStart() });
          return (Q ? "".concat(Q, `
`) : "") + M(se) + (Ee.startsWith(`
`) ? `
` : `

`) + Ee;
        }
        P.exports = { hasPragma: ee, insertPragma: Y };
      } }), ar = C({ "src/utils/is-non-empty-array.js"(I, P) {
        W();
        function A(x) {
          return Array.isArray(x) && x.length > 0;
        }
        P.exports = A;
      } }), nr = C({ "src/language-js/loc.js"(I, P) {
        W();
        var A = ar();
        function x(_, ee) {
          let { ignoreDecorators: Y } = ee || {};
          if (!Y) {
            let L = _.declaration && _.declaration.decorators || _.decorators;
            if (A(L))
              return x(L[0]);
          }
          return _.range ? _.range[0] : _.start;
        }
        function g(_) {
          return _.range ? _.range[1] : _.end;
        }
        function O(_, ee) {
          let Y = x(_);
          return Number.isInteger(Y) && Y === x(ee);
        }
        function M(_, ee) {
          let Y = g(_);
          return Number.isInteger(Y) && Y === g(ee);
        }
        function k(_, ee) {
          return O(_, ee) && M(_, ee);
        }
        P.exports = { locStart: x, locEnd: g, hasSameLocStart: O, hasSameLoc: k };
      } }), or = C({ "src/language-js/parse/utils/create-parser.js"(I, P) {
        W();
        var { hasPragma: A } = $i(), { locStart: x, locEnd: g } = nr();
        function O(M) {
          return M = typeof M == "function" ? { parse: M } : M, Object.assign({ astFormat: "estree", hasPragma: A, locStart: x, locEnd: g }, M);
        }
        P.exports = O;
      } }), Zt = C({ "src/common/parser-create-error.js"(I, P) {
        W();
        function A(x, g) {
          let O = new SyntaxError(x + " (" + g.start.line + ":" + g.start.column + ")");
          return O.loc = g, O;
        }
        P.exports = A;
      } }), hr = C({ "src/language-js/parse/utils/create-babel-parse-error.js"(I, P) {
        W();
        var A = Zt();
        function x(g) {
          let { message: O, loc: M } = g;
          return A(O.replace(/ \(.*\)/, ""), { start: { line: M ? M.line : 0, column: M ? M.column + 1 : 0 } });
        }
        P.exports = x;
      } }), Zi = C({ "src/language-js/utils/is-ts-keyword-type.js"(I, P) {
        W();
        function A(x) {
          let { type: g } = x;
          return g.startsWith("TS") && g.endsWith("Keyword");
        }
        P.exports = A;
      } }), ea = C({ "src/language-js/utils/is-block-comment.js"(I, P) {
        W();
        var A = /* @__PURE__ */ new Set(["Block", "CommentBlock", "MultiLine"]), x = (g) => A.has(g == null ? void 0 : g.type);
        P.exports = x;
      } }), ta = C({ "src/language-js/utils/is-type-cast-comment.js"(I, P) {
        W();
        var A = ea();
        function x(g) {
          return A(g) && g.value[0] === "*" && /@type\b/.test(g.value);
        }
        P.exports = x;
      } }), sa = C({ "src/utils/get-last.js"(I, P) {
        W();
        var A = (x) => x[x.length - 1];
        P.exports = A;
      } }), lr = C({ "src/language-js/parse/postprocess/visit-node.js"(I, P) {
        W();
        function A(x, g) {
          if (Array.isArray(x)) {
            for (let O = 0; O < x.length; O++)
              x[O] = A(x[O], g);
            return x;
          }
          if (x && typeof x == "object" && typeof x.type == "string") {
            let O = Object.keys(x);
            for (let M = 0; M < O.length; M++)
              x[O[M]] = A(x[O[M]], g);
            return g(x) || x;
          }
          return x;
        }
        P.exports = A;
      } }), pr = C({ "src/language-js/parse/postprocess/throw-syntax-error.js"(I, P) {
        W();
        var A = Zt();
        function x(g, O) {
          let { start: M, end: k } = g.loc;
          throw A(O, { start: { line: M.line, column: M.column + 1 }, end: { line: k.line, column: k.column + 1 } });
        }
        P.exports = x;
      } }), ra = C({ "src/language-js/parse/postprocess/typescript.js"(I, P) {
        W();
        var A = lr(), x = pr();
        function g(k, _, ee) {
          let Y = k.decorators;
          if (!Array.isArray(Y))
            return;
          let L = _.decorators;
          (!Array.isArray(L) || L.length !== Y.length || Y.some((Q) => {
            let te = ee.get(Q);
            return !te || !L.includes(te);
          })) && x(_, "Leading decorators must be attached to a class declaration");
        }
        function O(k, _) {
          k.kind !== 167 || k.modifiers && !k.modifiers.some((ee) => ee.kind === 126) || k.initializer && _.value === null && x(_, "Abstract property cannot have an initializer");
        }
        function M(k, _) {
          let { esTreeNodeToTSNodeMap: ee, tsNodeToESTreeNodeMap: Y } = _.tsParseResult;
          A(k, (L) => {
            let Q = ee.get(L);
            if (!Q)
              return;
            let te = Y.get(Q);
            te === L && (g(Q, te, Y), O(Q, te));
          });
        }
        P.exports = { throwErrorForInvalidNodes: M };
      } }), ia = C({ "src/language-js/parse/postprocess/index.js"(I, P) {
        W();
        var { locStart: A, locEnd: x } = nr(), g = Zi(), O = ta(), M = sa(), k = lr(), { throwErrorForInvalidNodes: _ } = ra(), ee = pr();
        function Y(q, le) {
          if (le.parser === "typescript" && /@|abstract/.test(le.originalText) && _(q, le), le.parser !== "typescript" && le.parser !== "flow" && le.parser !== "acorn" && le.parser !== "espree" && le.parser !== "meriyah") {
            let se = /* @__PURE__ */ new Set();
            q = k(q, (Z) => {
              Z.leadingComments && Z.leadingComments.some(O) && se.add(A(Z));
            }), q = k(q, (Z) => {
              if (Z.type === "ParenthesizedExpression") {
                let { expression: h } = Z;
                if (h.type === "TypeCastExpression")
                  return h.range = Z.range, h;
                let ce = A(Z);
                if (!se.has(ce))
                  return h.extra = Object.assign(Object.assign({}, h.extra), {}, { parenthesized: !0 }), h;
              }
            });
          }
          return q = k(q, (se) => {
            switch (se.type) {
              case "ChainExpression":
                return L(se.expression);
              case "LogicalExpression": {
                if (Q(se))
                  return te(se);
                break;
              }
              case "VariableDeclaration": {
                let Z = M(se.declarations);
                Z && Z.init && Ee(se, Z);
                break;
              }
              case "TSParenthesizedType":
                return g(se.typeAnnotation) || se.typeAnnotation.type === "TSThisType" || (se.typeAnnotation.range = [A(se), x(se)]), se.typeAnnotation;
              case "TSTypeParameter":
                if (typeof se.name == "string") {
                  let Z = A(se);
                  se.name = { type: "Identifier", name: se.name, range: [Z, Z + se.name.length] };
                }
                break;
              case "ObjectExpression":
                if (le.parser === "typescript") {
                  let Z = se.properties.find((h) => h.type === "Property" && h.value.type === "TSEmptyBodyFunctionExpression");
                  Z && ee(Z.value, "Unexpected token.");
                }
                break;
              case "SequenceExpression": {
                let Z = M(se.expressions);
                se.range = [A(se), Math.min(x(Z), x(se))];
                break;
              }
              case "TopicReference":
                le.__isUsingHackPipeline = !0;
                break;
              case "ExportAllDeclaration": {
                let { exported: Z } = se;
                if (le.parser === "meriyah" && Z && Z.type === "Identifier") {
                  let h = le.originalText.slice(A(Z), x(Z));
                  (h.startsWith('"') || h.startsWith("'")) && (se.exported = Object.assign(Object.assign({}, se.exported), {}, { type: "Literal", value: se.exported.name, raw: h }));
                }
                break;
              }
            }
          }), q;
          function Ee(se, Z) {
            le.originalText[x(Z)] !== ";" && (se.range = [A(se), x(Z)]);
          }
        }
        function L(q) {
          switch (q.type) {
            case "CallExpression":
              q.type = "OptionalCallExpression", q.callee = L(q.callee);
              break;
            case "MemberExpression":
              q.type = "OptionalMemberExpression", q.object = L(q.object);
              break;
            case "TSNonNullExpression":
              q.expression = L(q.expression);
              break;
          }
          return q;
        }
        function Q(q) {
          return q.type === "LogicalExpression" && q.right.type === "LogicalExpression" && q.operator === q.right.operator;
        }
        function te(q) {
          return Q(q) ? te({ type: "LogicalExpression", operator: q.operator, left: te({ type: "LogicalExpression", operator: q.operator, left: q.left, right: q.right.left, range: [A(q.left), x(q.right.left)] }), right: q.right.right, range: [A(q), x(q)] }) : q;
        }
        P.exports = Y;
      } }), ur = C({ "node_modules/@babel/parser/lib/index.js"(I) {
        W(), Object.defineProperty(I, "__esModule", { value: !0 });
        function P(t, e) {
          if (t == null)
            return {};
          var s = {}, r = Object.keys(t), i, a;
          for (a = 0; a < r.length; a++)
            i = r[a], !(e.indexOf(i) >= 0) && (s[i] = t[i]);
          return s;
        }
        var A = class {
          constructor(t, e, s) {
            this.line = void 0, this.column = void 0, this.index = void 0, this.line = t, this.column = e, this.index = s;
          }
        }, x = class {
          constructor(t, e) {
            this.start = void 0, this.end = void 0, this.filename = void 0, this.identifierName = void 0, this.start = t, this.end = e;
          }
        };
        function g(t, e) {
          let { line: s, column: r, index: i } = t;
          return new A(s, r + e, i + e);
        }
        var O = Object.freeze({ SyntaxError: "BABEL_PARSER_SYNTAX_ERROR", SourceTypeModuleError: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED" }), M = function(t) {
          let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t.length - 1;
          return { get() {
            return t.reduce((s, r) => s[r], this);
          }, set(s) {
            t.reduce((r, i, a) => a === e ? r[i] = s : r[i], this);
          } };
        }, k = (t, e, s) => Object.keys(s).map((r) => [r, s[r]]).filter((r) => {
          let [, i] = r;
          return !!i;
        }).map((r) => {
          let [i, a] = r;
          return [i, typeof a == "function" ? { value: a, enumerable: !1 } : typeof a.reflect == "string" ? Object.assign({}, a, M(a.reflect.split("."))) : a];
        }).reduce((r, i) => {
          let [a, n] = i;
          return Object.defineProperty(r, a, Object.assign({ configurable: !0 }, n));
        }, Object.assign(new t(), e)), _ = (t) => ({ ImportMetaOutsideModule: t(`import.meta may appear only with 'sourceType: "module"'`, { code: O.SourceTypeModuleError }), ImportOutsideModule: t(`'import' and 'export' may appear only with 'sourceType: "module"'`, { code: O.SourceTypeModuleError }) }), ee = { ArrayPattern: "array destructuring pattern", AssignmentExpression: "assignment expression", AssignmentPattern: "assignment expression", ArrowFunctionExpression: "arrow function expression", ConditionalExpression: "conditional expression", ForOfStatement: "for-of statement", ForInStatement: "for-in statement", ForStatement: "for-loop", FormalParameters: "function parameter list", Identifier: "identifier", ObjectPattern: "object destructuring pattern", ParenthesizedExpression: "parenthesized expression", RestElement: "rest element", UpdateExpression: { true: "prefix operation", false: "postfix operation" }, VariableDeclarator: "variable declaration", YieldExpression: "yield expression" }, Y = (t) => {
          let { type: e, prefix: s } = t;
          return e === "UpdateExpression" ? ee.UpdateExpression[String(s)] : ee[e];
        }, L = (t) => ({ AccessorIsGenerator: t((e) => {
          let { kind: s } = e;
          return "A ".concat(s, "ter cannot be a generator.");
        }), ArgumentsInClass: t("'arguments' is only allowed in functions and class methods."), AsyncFunctionInSingleStatementContext: t("Async functions can only be declared at the top level or inside a block."), AwaitBindingIdentifier: t("Can not use 'await' as identifier inside an async function."), AwaitBindingIdentifierInStaticBlock: t("Can not use 'await' as identifier inside a static block."), AwaitExpressionFormalParameter: t("'await' is not allowed in async function parameters."), AwaitNotInAsyncContext: t("'await' is only allowed within async functions and at the top levels of modules."), AwaitNotInAsyncFunction: t("'await' is only allowed within async functions."), BadGetterArity: t("A 'get' accesor must not have any formal parameters."), BadSetterArity: t("A 'set' accesor must have exactly one formal parameter."), BadSetterRestParameter: t("A 'set' accesor function argument must not be a rest parameter."), ConstructorClassField: t("Classes may not have a field named 'constructor'."), ConstructorClassPrivateField: t("Classes may not have a private field named '#constructor'."), ConstructorIsAccessor: t("Class constructor may not be an accessor."), ConstructorIsAsync: t("Constructor can't be an async function."), ConstructorIsGenerator: t("Constructor can't be a generator."), DeclarationMissingInitializer: t((e) => {
          let { kind: s } = e;
          return "Missing initializer in ".concat(s, " declaration.");
        }), DecoratorBeforeExport: t("Decorators must be placed *before* the 'export' keyword. You can set the 'decoratorsBeforeExport' option to false to use the 'export @decorator class {}' syntax."), DecoratorConstructor: t("Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?"), DecoratorExportClass: t("Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead."), DecoratorSemicolon: t("Decorators must not be followed by a semicolon."), DecoratorStaticBlock: t("Decorators can't be used with a static block."), DeletePrivateField: t("Deleting a private field is not allowed."), DestructureNamedImport: t("ES2015 named imports do not destructure. Use another statement for destructuring after the import."), DuplicateConstructor: t("Duplicate constructor in the same class."), DuplicateDefaultExport: t("Only one default export allowed per module."), DuplicateExport: t((e) => {
          let { exportName: s } = e;
          return "`".concat(s, "` has already been exported. Exported identifiers must be unique.");
        }), DuplicateProto: t("Redefinition of __proto__ property."), DuplicateRegExpFlags: t("Duplicate regular expression flag."), ElementAfterRest: t("Rest element must be last element."), EscapedCharNotAnIdentifier: t("Invalid Unicode escape."), ExportBindingIsString: t((e) => {
          let { localName: s, exportName: r } = e;
          return "A string literal cannot be used as an exported binding without `from`.\n- Did you mean `export { '".concat(s, "' as '").concat(r, "' } from 'some-module'`?");
        }), ExportDefaultFromAsIdentifier: t("'from' is not allowed as an identifier after 'export default'."), ForInOfLoopInitializer: t((e) => {
          let { type: s } = e;
          return "'".concat(s === "ForInStatement" ? "for-in" : "for-of", "' loop variable declaration may not have an initializer.");
        }), ForOfAsync: t("The left-hand side of a for-of loop may not be 'async'."), ForOfLet: t("The left-hand side of a for-of loop may not start with 'let'."), GeneratorInSingleStatementContext: t("Generators can only be declared at the top level or inside a block."), IllegalBreakContinue: t((e) => {
          let { type: s } = e;
          return "Unsyntactic ".concat(s === "BreakStatement" ? "break" : "continue", ".");
        }), IllegalLanguageModeDirective: t("Illegal 'use strict' directive in function with non-simple parameter list."), IllegalReturn: t("'return' outside of function."), ImportBindingIsString: t((e) => {
          let { importName: s } = e;
          return 'A string literal cannot be used as an imported binding.\n- Did you mean `import { "'.concat(s, '" as foo }`?');
        }), ImportCallArgumentTrailingComma: t("Trailing comma is disallowed inside import(...) arguments."), ImportCallArity: t((e) => {
          let { maxArgumentCount: s } = e;
          return "`import()` requires exactly ".concat(s === 1 ? "one argument" : "one or two arguments", ".");
        }), ImportCallNotNewExpression: t("Cannot use new with import(...)."), ImportCallSpreadArgument: t("`...` is not allowed in `import()`."), IncompatibleRegExpUVFlags: t("The 'u' and 'v' regular expression flags cannot be enabled at the same time."), InvalidBigIntLiteral: t("Invalid BigIntLiteral."), InvalidCodePoint: t("Code point out of bounds."), InvalidCoverInitializedName: t("Invalid shorthand property initializer."), InvalidDecimal: t("Invalid decimal."), InvalidDigit: t((e) => {
          let { radix: s } = e;
          return "Expected number in radix ".concat(s, ".");
        }), InvalidEscapeSequence: t("Bad character escape sequence."), InvalidEscapeSequenceTemplate: t("Invalid escape sequence in template."), InvalidEscapedReservedWord: t((e) => {
          let { reservedWord: s } = e;
          return "Escape sequence in keyword ".concat(s, ".");
        }), InvalidIdentifier: t((e) => {
          let { identifierName: s } = e;
          return "Invalid identifier ".concat(s, ".");
        }), InvalidLhs: t((e) => {
          let { ancestor: s } = e;
          return "Invalid left-hand side in ".concat(Y(s), ".");
        }), InvalidLhsBinding: t((e) => {
          let { ancestor: s } = e;
          return "Binding invalid left-hand side in ".concat(Y(s), ".");
        }), InvalidNumber: t("Invalid number."), InvalidOrMissingExponent: t("Floating-point numbers require a valid exponent after the 'e'."), InvalidOrUnexpectedToken: t((e) => {
          let { unexpected: s } = e;
          return "Unexpected character '".concat(s, "'.");
        }), InvalidParenthesizedAssignment: t("Invalid parenthesized assignment pattern."), InvalidPrivateFieldResolution: t((e) => {
          let { identifierName: s } = e;
          return "Private name #".concat(s, " is not defined.");
        }), InvalidPropertyBindingPattern: t("Binding member expression."), InvalidRecordProperty: t("Only properties and spread elements are allowed in record definitions."), InvalidRestAssignmentPattern: t("Invalid rest operator's argument."), LabelRedeclaration: t((e) => {
          let { labelName: s } = e;
          return "Label '".concat(s, "' is already declared.");
        }), LetInLexicalBinding: t("'let' is not allowed to be used as a name in 'let' or 'const' declarations."), LineTerminatorBeforeArrow: t("No line break is allowed before '=>'."), MalformedRegExpFlags: t("Invalid regular expression flag."), MissingClassName: t("A class name is required."), MissingEqInAssignment: t("Only '=' operator can be used for specifying default value."), MissingSemicolon: t("Missing semicolon."), MissingPlugin: t((e) => {
          let { missingPlugin: s } = e;
          return "This experimental syntax requires enabling the parser plugin: ".concat(s.map((r) => JSON.stringify(r)).join(", "), ".");
        }), MissingOneOfPlugins: t((e) => {
          let { missingPlugin: s } = e;
          return "This experimental syntax requires enabling one of the following parser plugin(s): ".concat(s.map((r) => JSON.stringify(r)).join(", "), ".");
        }), MissingUnicodeEscape: t("Expecting Unicode escape sequence \\uXXXX."), MixingCoalesceWithLogical: t("Nullish coalescing operator(??) requires parens when mixing with logical operators."), ModuleAttributeDifferentFromType: t("The only accepted module attribute is `type`."), ModuleAttributeInvalidValue: t("Only string literals are allowed as module attribute values."), ModuleAttributesWithDuplicateKeys: t((e) => {
          let { key: s } = e;
          return 'Duplicate key "'.concat(s, '" is not allowed in module attributes.');
        }), ModuleExportNameHasLoneSurrogate: t((e) => {
          let { surrogateCharCode: s } = e;
          return "An export name cannot include a lone surrogate, found '\\u".concat(s.toString(16), "'.");
        }), ModuleExportUndefined: t((e) => {
          let { localName: s } = e;
          return "Export '".concat(s, "' is not defined.");
        }), MultipleDefaultsInSwitch: t("Multiple default clauses."), NewlineAfterThrow: t("Illegal newline after throw."), NoCatchOrFinally: t("Missing catch or finally clause."), NumberIdentifier: t("Identifier directly after number."), NumericSeparatorInEscapeSequence: t("Numeric separators are not allowed inside unicode escape sequences or hex escape sequences."), ObsoleteAwaitStar: t("'await*' has been removed from the async functions proposal. Use Promise.all() instead."), OptionalChainingNoNew: t("Constructors in/after an Optional Chain are not allowed."), OptionalChainingNoTemplate: t("Tagged Template Literals are not allowed in optionalChain."), OverrideOnConstructor: t("'override' modifier cannot appear on a constructor declaration."), ParamDupe: t("Argument name clash."), PatternHasAccessor: t("Object pattern can't contain getter or setter."), PatternHasMethod: t("Object pattern can't contain methods."), PrivateInExpectedIn: t((e) => {
          let { identifierName: s } = e;
          return "Private names are only allowed in property accesses (`obj.#".concat(s, "`) or in `in` expressions (`#").concat(s, " in obj`).");
        }), PrivateNameRedeclaration: t((e) => {
          let { identifierName: s } = e;
          return "Duplicate private name #".concat(s, ".");
        }), RecordExpressionBarIncorrectEndSyntaxType: t("Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'."), RecordExpressionBarIncorrectStartSyntaxType: t("Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'."), RecordExpressionHashIncorrectStartSyntaxType: t("Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'."), RecordNoProto: t("'__proto__' is not allowed in Record expressions."), RestTrailingComma: t("Unexpected trailing comma after rest element."), SloppyFunction: t("In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement."), StaticPrototype: t("Classes may not have static property named prototype."), SuperNotAllowed: t("`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?"), SuperPrivateField: t("Private fields can't be accessed on super."), TrailingDecorator: t("Decorators must be attached to a class element."), TupleExpressionBarIncorrectEndSyntaxType: t("Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'."), TupleExpressionBarIncorrectStartSyntaxType: t("Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'."), TupleExpressionHashIncorrectStartSyntaxType: t("Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'."), UnexpectedArgumentPlaceholder: t("Unexpected argument placeholder."), UnexpectedAwaitAfterPipelineBody: t('Unexpected "await" after pipeline body; await must have parentheses in minimal proposal.'), UnexpectedDigitAfterHash: t("Unexpected digit after hash token."), UnexpectedImportExport: t("'import' and 'export' may only appear at the top level."), UnexpectedKeyword: t((e) => {
          let { keyword: s } = e;
          return "Unexpected keyword '".concat(s, "'.");
        }), UnexpectedLeadingDecorator: t("Leading decorators must be attached to a class declaration."), UnexpectedLexicalDeclaration: t("Lexical declaration cannot appear in a single-statement context."), UnexpectedNewTarget: t("`new.target` can only be used in functions or class properties."), UnexpectedNumericSeparator: t("A numeric separator is only allowed between two digits."), UnexpectedPrivateField: t("Unexpected private name."), UnexpectedReservedWord: t((e) => {
          let { reservedWord: s } = e;
          return "Unexpected reserved word '".concat(s, "'.");
        }), UnexpectedSuper: t("'super' is only allowed in object methods and classes."), UnexpectedToken: t((e) => {
          let { expected: s, unexpected: r } = e;
          return "Unexpected token".concat(r ? " '".concat(r, "'.") : "").concat(s ? ', expected "'.concat(s, '"') : "");
        }), UnexpectedTokenUnaryExponentiation: t("Illegal expression. Wrap left hand side or entire exponentiation in parentheses."), UnsupportedBind: t("Binding should be performed on object property."), UnsupportedDecoratorExport: t("A decorated export must export a class declaration."), UnsupportedDefaultExport: t("Only expressions, functions or classes are allowed as the `default` export."), UnsupportedImport: t("`import` can only be used in `import()` or `import.meta`."), UnsupportedMetaProperty: t((e) => {
          let { target: s, onlyValidPropertyName: r } = e;
          return "The only valid meta property for ".concat(s, " is ").concat(s, ".").concat(r, ".");
        }), UnsupportedParameterDecorator: t("Decorators cannot be used to decorate parameters."), UnsupportedPropertyDecorator: t("Decorators cannot be used to decorate object literal properties."), UnsupportedSuper: t("'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop])."), UnterminatedComment: t("Unterminated comment."), UnterminatedRegExp: t("Unterminated regular expression."), UnterminatedString: t("Unterminated string constant."), UnterminatedTemplate: t("Unterminated template."), VarRedeclaration: t((e) => {
          let { identifierName: s } = e;
          return "Identifier '".concat(s, "' has already been declared.");
        }), YieldBindingIdentifier: t("Can not use 'yield' as identifier inside a generator."), YieldInParameter: t("Yield expression is not allowed in formal parameters."), ZeroDigitNumericSeparator: t("Numeric separator can not be used after leading 0.") }), Q = (t) => ({ StrictDelete: t("Deleting local variable in strict mode."), StrictEvalArguments: t((e) => {
          let { referenceName: s } = e;
          return "Assigning to '".concat(s, "' in strict mode.");
        }), StrictEvalArgumentsBinding: t((e) => {
          let { bindingName: s } = e;
          return "Binding '".concat(s, "' in strict mode.");
        }), StrictFunction: t("In strict mode code, functions can only be declared at top level or inside a block."), StrictNumericEscape: t("The only valid numeric escape in strict mode is '\\0'."), StrictOctalLiteral: t("Legacy octal literals are not allowed in strict mode."), StrictWith: t("'with' in strict mode.") }), te = /* @__PURE__ */ new Set(["ArrowFunctionExpression", "AssignmentExpression", "ConditionalExpression", "YieldExpression"]), q = (t) => ({ PipeBodyIsTighter: t("Unexpected yield after pipeline body; any yield expression acting as Hack-style pipe body must be parenthesized due to its loose operator precedence."), PipeTopicRequiresHackPipes: t('Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.'), PipeTopicUnbound: t("Topic reference is unbound; it must be inside a pipe body."), PipeTopicUnconfiguredToken: t((e) => {
          let { token: s } = e;
          return "Invalid topic token ".concat(s, ". In order to use ").concat(s, ' as a topic reference, the pipelineOperator plugin must be configured with { "proposal": "hack", "topicToken": "').concat(s, '" }.');
        }), PipeTopicUnused: t("Hack-style pipe body does not contain a topic reference; Hack-style pipes must use topic at least once."), PipeUnparenthesizedBody: t((e) => {
          let { type: s } = e;
          return "Hack-style pipe body cannot be an unparenthesized ".concat(Y({ type: s }), "; please wrap it in parentheses.");
        }), PipelineBodyNoArrow: t('Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized.'), PipelineBodySequenceExpression: t("Pipeline body may not be a comma-separated sequence expression."), PipelineHeadSequenceExpression: t("Pipeline head should not be a comma-separated sequence expression."), PipelineTopicUnused: t("Pipeline is in topic style but does not use topic reference."), PrimaryTopicNotAllowed: t("Topic reference was used in a lexical context without topic binding."), PrimaryTopicRequiresSmartPipeline: t('Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.') }), le = ["toMessage"];
        function Ee(t) {
          let { toMessage: e } = t, s = P(t, le);
          return function r(i) {
            let { loc: a, details: n } = i;
            return k(SyntaxError, Object.assign({}, s, { loc: a }), { clone() {
              let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, l = o.loc || {};
              return r({ loc: new A("line" in l ? l.line : this.loc.line, "column" in l ? l.column : this.loc.column, "index" in l ? l.index : this.loc.index), details: Object.assign({}, this.details, o.details) });
            }, details: { value: n, enumerable: !1 }, message: { get() {
              return "".concat(e(this.details), " (").concat(this.loc.line, ":").concat(this.loc.column, ")");
            }, set(o) {
              Object.defineProperty(this, "message", { value: o });
            } }, pos: { reflect: "loc.index", enumerable: !0 }, missingPlugin: "missingPlugin" in n && { reflect: "details.missingPlugin", enumerable: !0 } });
          };
        }
        function se(t, e) {
          return Object.assign({ toMessage: typeof t == "string" ? () => t : t }, e);
        }
        function Z(t, e) {
          if (Array.isArray(t))
            return (i) => Z(i, t[0]);
          let s = t(se), r = {};
          for (let i of Object.keys(s))
            r[i] = Ee(Object.assign({ code: O.SyntaxError, reasonCode: i }, e ? { syntaxPlugin: e } : {}, s[i]));
          return r;
        }
        var h = Object.assign({}, Z(_), Z(L), Z(Q), Z(u || (u = T(["pipelineOperator"])))(q)), { defineProperty: ce } = Object, Ce = (t, e) => ce(t, e, { enumerable: !1, value: t[e] });
        function de(t) {
          return Ce(t.loc.start, "index"), Ce(t.loc.end, "index"), t;
        }
        var tt = (t) => class extends t {
          parse() {
            let e = de(super.parse());
            return this.options.tokens && (e.tokens = e.tokens.map(de)), e;
          }
          parseRegExpLiteral(e) {
            let { pattern: s, flags: r } = e, i = null;
            try {
              i = new RegExp(s, r);
            } catch {
            }
            let a = this.estreeParseLiteral(i);
            return a.regex = { pattern: s, flags: r }, a;
          }
          parseBigIntLiteral(e) {
            let s;
            try {
              s = BigInt(e);
            } catch {
              s = null;
            }
            let r = this.estreeParseLiteral(s);
            return r.bigint = String(r.value || e), r;
          }
          parseDecimalLiteral(e) {
            let s = this.estreeParseLiteral(null);
            return s.decimal = String(s.value || e), s;
          }
          estreeParseLiteral(e) {
            return this.parseLiteral(e, "Literal");
          }
          parseStringLiteral(e) {
            return this.estreeParseLiteral(e);
          }
          parseNumericLiteral(e) {
            return this.estreeParseLiteral(e);
          }
          parseNullLiteral() {
            return this.estreeParseLiteral(null);
          }
          parseBooleanLiteral(e) {
            return this.estreeParseLiteral(e);
          }
          directiveToStmt(e) {
            let s = e.value, r = this.startNodeAt(e.start, e.loc.start), i = this.startNodeAt(s.start, s.loc.start);
            return i.value = s.extra.expressionValue, i.raw = s.extra.raw, r.expression = this.finishNodeAt(i, "Literal", s.loc.end), r.directive = s.extra.raw.slice(1, -1), this.finishNodeAt(r, "ExpressionStatement", e.loc.end);
          }
          initFunction(e, s) {
            super.initFunction(e, s), e.expression = !1;
          }
          checkDeclaration(e) {
            e != null && this.isObjectProperty(e) ? this.checkDeclaration(e.value) : super.checkDeclaration(e);
          }
          getObjectOrClassMethodParams(e) {
            return e.value.params;
          }
          isValidDirective(e) {
            var s;
            return e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && !((s = e.expression.extra) != null && s.parenthesized);
          }
          parseBlockBody(e) {
            for (var s = arguments.length, r = new Array(s > 1 ? s - 1 : 0), i = 1; i < s; i++)
              r[i - 1] = arguments[i];
            super.parseBlockBody(e, ...r);
            let a = e.directives.map((n) => this.directiveToStmt(n));
            e.body = a.concat(e.body), delete e.directives;
          }
          pushClassMethod(e, s, r, i, a, n) {
            this.parseMethod(s, r, i, a, n, "ClassMethod", !0), s.typeParameters && (s.value.typeParameters = s.typeParameters, delete s.typeParameters), e.body.push(s);
          }
          parsePrivateName() {
            let e = super.parsePrivateName();
            return this.getPluginOption("estree", "classFeatures") ? this.convertPrivateNameToPrivateIdentifier(e) : e;
          }
          convertPrivateNameToPrivateIdentifier(e) {
            let s = super.getPrivateNameSV(e);
            return e = e, delete e.id, e.name = s, e.type = "PrivateIdentifier", e;
          }
          isPrivateName(e) {
            return this.getPluginOption("estree", "classFeatures") ? e.type === "PrivateIdentifier" : super.isPrivateName(e);
          }
          getPrivateNameSV(e) {
            return this.getPluginOption("estree", "classFeatures") ? e.name : super.getPrivateNameSV(e);
          }
          parseLiteral(e, s) {
            let r = super.parseLiteral(e, s);
            return r.raw = r.extra.raw, delete r.extra, r;
          }
          parseFunctionBody(e, s) {
            let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            super.parseFunctionBody(e, s, r), e.expression = e.body.type !== "BlockStatement";
          }
          parseMethod(e, s, r, i, a, n) {
            let o = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : !1, l = this.startNode();
            return l.kind = e.kind, l = super.parseMethod(l, s, r, i, a, n, o), l.type = "FunctionExpression", delete l.kind, e.value = l, n === "ClassPrivateMethod" && (e.computed = !1), n = "MethodDefinition", this.finishNode(e, n);
          }
          parseClassProperty() {
            let e = super.parseClassProperty(...arguments);
            return this.getPluginOption("estree", "classFeatures") && (e.type = "PropertyDefinition"), e;
          }
          parseClassPrivateProperty() {
            let e = super.parseClassPrivateProperty(...arguments);
            return this.getPluginOption("estree", "classFeatures") && (e.type = "PropertyDefinition", e.computed = !1), e;
          }
          parseObjectMethod(e, s, r, i, a) {
            let n = super.parseObjectMethod(e, s, r, i, a);
            return n && (n.type = "Property", n.kind === "method" && (n.kind = "init"), n.shorthand = !1), n;
          }
          parseObjectProperty(e, s, r, i, a) {
            let n = super.parseObjectProperty(e, s, r, i, a);
            return n && (n.kind = "init", n.type = "Property"), n;
          }
          isValidLVal(e) {
            for (var s = arguments.length, r = new Array(s > 1 ? s - 1 : 0), i = 1; i < s; i++)
              r[i - 1] = arguments[i];
            return e === "Property" ? "value" : super.isValidLVal(e, ...r);
          }
          isAssignable(e, s) {
            return e != null && this.isObjectProperty(e) ? this.isAssignable(e.value, s) : super.isAssignable(e, s);
          }
          toAssignable(e) {
            let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
            if (e != null && this.isObjectProperty(e)) {
              let { key: r, value: i } = e;
              this.isPrivateName(r) && this.classScope.usePrivateName(this.getPrivateNameSV(r), r.loc.start), this.toAssignable(i, s);
            } else
              super.toAssignable(e, s);
          }
          toAssignableObjectExpressionProp(e) {
            e.kind === "get" || e.kind === "set" ? this.raise(h.PatternHasAccessor, { at: e.key }) : e.method ? this.raise(h.PatternHasMethod, { at: e.key }) : super.toAssignableObjectExpressionProp(...arguments);
          }
          finishCallExpression(e, s) {
            if (super.finishCallExpression(e, s), e.callee.type === "Import") {
              if (e.type = "ImportExpression", e.source = e.arguments[0], this.hasPlugin("importAssertions")) {
                var r;
                e.attributes = (r = e.arguments[1]) != null ? r : null;
              }
              delete e.arguments, delete e.callee;
            }
            return e;
          }
          toReferencedArguments(e) {
            e.type !== "ImportExpression" && super.toReferencedArguments(e);
          }
          parseExport(e) {
            switch (super.parseExport(e), e.type) {
              case "ExportAllDeclaration":
                e.exported = null;
                break;
              case "ExportNamedDeclaration":
                e.specifiers.length === 1 && e.specifiers[0].type === "ExportNamespaceSpecifier" && (e.type = "ExportAllDeclaration", e.exported = e.specifiers[0].exported, delete e.specifiers);
                break;
            }
            return e;
          }
          parseSubscript(e, s, r, i, a) {
            let n = super.parseSubscript(e, s, r, i, a);
            if (a.optionalChainMember) {
              if ((n.type === "OptionalMemberExpression" || n.type === "OptionalCallExpression") && (n.type = n.type.substring(8)), a.stop) {
                let o = this.startNodeAtNode(n);
                return o.expression = n, this.finishNode(o, "ChainExpression");
              }
            } else
              (n.type === "MemberExpression" || n.type === "CallExpression") && (n.optional = !1);
            return n;
          }
          hasPropertyAsPrivateName(e) {
            return e.type === "ChainExpression" && (e = e.expression), super.hasPropertyAsPrivateName(e);
          }
          isOptionalChain(e) {
            return e.type === "ChainExpression";
          }
          isObjectProperty(e) {
            return e.type === "Property" && e.kind === "init" && !e.method;
          }
          isObjectMethod(e) {
            return e.method || e.kind === "get" || e.kind === "set";
          }
          finishNodeAt(e, s, r) {
            return de(super.finishNodeAt(e, s, r));
          }
          resetEndLocation(e) {
            let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.state.lastTokEndLoc;
            super.resetEndLocation(e, s), de(e);
          }
        }, me = class {
          constructor(t, e) {
            this.token = void 0, this.preserveSpace = void 0, this.token = t, this.preserveSpace = !!e;
          }
        }, ne = { brace: new me("{"), j_oTag: new me("<tag"), j_cTag: new me("</tag"), j_expr: new me("<tag>...</tag>", !0) };
        ne.template = new me("`", !0);
        var J = !0, N = !0, ut = !0, xe = !0, De = !0, Ca = !0, gr = class {
          constructor(t) {
            let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            this.label = void 0, this.keyword = void 0, this.beforeExpr = void 0, this.startsExpr = void 0, this.rightAssociative = void 0, this.isLoop = void 0, this.isAssign = void 0, this.prefix = void 0, this.postfix = void 0, this.binop = void 0, this.label = t, this.keyword = e.keyword, this.beforeExpr = !!e.beforeExpr, this.startsExpr = !!e.startsExpr, this.rightAssociative = !!e.rightAssociative, this.isLoop = !!e.isLoop, this.isAssign = !!e.isAssign, this.prefix = !!e.prefix, this.postfix = !!e.postfix, this.binop = e.binop != null ? e.binop : null, this.updateContext = null;
          }
        }, es = /* @__PURE__ */ new Map();
        function re(t) {
          let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          e.keyword = t;
          let s = U(t, e);
          return es.set(t, s), s;
        }
        function Pe(t, e) {
          return U(t, { beforeExpr: J, binop: e });
        }
        var ct = -1, Me = [], ts = [], Tt = [], ss = [], rs = [], is = [];
        function U(t) {
          let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var s, r, i, a;
          return ++ct, ts.push(t), Tt.push((s = e.binop) != null ? s : -1), ss.push((r = e.beforeExpr) != null ? r : !1), rs.push((i = e.startsExpr) != null ? i : !1), is.push((a = e.prefix) != null ? a : !1), Me.push(new gr(t, e)), ct;
        }
        function ie(t) {
          let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var s, r, i, a;
          return ++ct, es.set(t, ct), ts.push(t), Tt.push((s = e.binop) != null ? s : -1), ss.push((r = e.beforeExpr) != null ? r : !1), rs.push((i = e.startsExpr) != null ? i : !1), is.push((a = e.prefix) != null ? a : !1), Me.push(new gr("name", e)), ct;
        }
        var wa = { bracketL: U("[", { beforeExpr: J, startsExpr: N }), bracketHashL: U("#[", { beforeExpr: J, startsExpr: N }), bracketBarL: U("[|", { beforeExpr: J, startsExpr: N }), bracketR: U("]"), bracketBarR: U("|]"), braceL: U("{", { beforeExpr: J, startsExpr: N }), braceBarL: U("{|", { beforeExpr: J, startsExpr: N }), braceHashL: U("#{", { beforeExpr: J, startsExpr: N }), braceR: U("}"), braceBarR: U("|}"), parenL: U("(", { beforeExpr: J, startsExpr: N }), parenR: U(")"), comma: U(",", { beforeExpr: J }), semi: U(";", { beforeExpr: J }), colon: U(":", { beforeExpr: J }), doubleColon: U("::", { beforeExpr: J }), dot: U("."), question: U("?", { beforeExpr: J }), questionDot: U("?."), arrow: U("=>", { beforeExpr: J }), template: U("template"), ellipsis: U("...", { beforeExpr: J }), backQuote: U("`", { startsExpr: N }), dollarBraceL: U("${", { beforeExpr: J, startsExpr: N }), templateTail: U("...`", { startsExpr: N }), templateNonTail: U("...${", { beforeExpr: J, startsExpr: N }), at: U("@"), hash: U("#", { startsExpr: N }), interpreterDirective: U("#!..."), eq: U("=", { beforeExpr: J, isAssign: xe }), assign: U("_=", { beforeExpr: J, isAssign: xe }), slashAssign: U("_=", { beforeExpr: J, isAssign: xe }), xorAssign: U("_=", { beforeExpr: J, isAssign: xe }), moduloAssign: U("_=", { beforeExpr: J, isAssign: xe }), incDec: U("++/--", { prefix: De, postfix: Ca, startsExpr: N }), bang: U("!", { beforeExpr: J, prefix: De, startsExpr: N }), tilde: U("~", { beforeExpr: J, prefix: De, startsExpr: N }), doubleCaret: U("^^", { startsExpr: N }), doubleAt: U("@@", { startsExpr: N }), pipeline: Pe("|>", 0), nullishCoalescing: Pe("??", 1), logicalOR: Pe("||", 1), logicalAND: Pe("&&", 2), bitwiseOR: Pe("|", 3), bitwiseXOR: Pe("^", 4), bitwiseAND: Pe("&", 5), equality: Pe("==/!=/===/!==", 6), lt: Pe("</>/<=/>=", 7), gt: Pe("</>/<=/>=", 7), relational: Pe("</>/<=/>=", 7), bitShift: Pe("<</>>/>>>", 8), bitShiftL: Pe("<</>>/>>>", 8), bitShiftR: Pe("<</>>/>>>", 8), plusMin: U("+/-", { beforeExpr: J, binop: 9, prefix: De, startsExpr: N }), modulo: U("%", { binop: 10, startsExpr: N }), star: U("*", { binop: 10 }), slash: Pe("/", 10), exponent: U("**", { beforeExpr: J, binop: 11, rightAssociative: !0 }), _in: re("in", { beforeExpr: J, binop: 7 }), _instanceof: re("instanceof", { beforeExpr: J, binop: 7 }), _break: re("break"), _case: re("case", { beforeExpr: J }), _catch: re("catch"), _continue: re("continue"), _debugger: re("debugger"), _default: re("default", { beforeExpr: J }), _else: re("else", { beforeExpr: J }), _finally: re("finally"), _function: re("function", { startsExpr: N }), _if: re("if"), _return: re("return", { beforeExpr: J }), _switch: re("switch"), _throw: re("throw", { beforeExpr: J, prefix: De, startsExpr: N }), _try: re("try"), _var: re("var"), _const: re("const"), _with: re("with"), _new: re("new", { beforeExpr: J, startsExpr: N }), _this: re("this", { startsExpr: N }), _super: re("super", { startsExpr: N }), _class: re("class", { startsExpr: N }), _extends: re("extends", { beforeExpr: J }), _export: re("export"), _import: re("import", { startsExpr: N }), _null: re("null", { startsExpr: N }), _true: re("true", { startsExpr: N }), _false: re("false", { startsExpr: N }), _typeof: re("typeof", { beforeExpr: J, prefix: De, startsExpr: N }), _void: re("void", { beforeExpr: J, prefix: De, startsExpr: N }), _delete: re("delete", { beforeExpr: J, prefix: De, startsExpr: N }), _do: re("do", { isLoop: ut, beforeExpr: J }), _for: re("for", { isLoop: ut }), _while: re("while", { isLoop: ut }), _as: ie("as", { startsExpr: N }), _assert: ie("assert", { startsExpr: N }), _async: ie("async", { startsExpr: N }), _await: ie("await", { startsExpr: N }), _from: ie("from", { startsExpr: N }), _get: ie("get", { startsExpr: N }), _let: ie("let", { startsExpr: N }), _meta: ie("meta", { startsExpr: N }), _of: ie("of", { startsExpr: N }), _sent: ie("sent", { startsExpr: N }), _set: ie("set", { startsExpr: N }), _static: ie("static", { startsExpr: N }), _yield: ie("yield", { startsExpr: N }), _asserts: ie("asserts", { startsExpr: N }), _checks: ie("checks", { startsExpr: N }), _exports: ie("exports", { startsExpr: N }), _global: ie("global", { startsExpr: N }), _implements: ie("implements", { startsExpr: N }), _intrinsic: ie("intrinsic", { startsExpr: N }), _infer: ie("infer", { startsExpr: N }), _is: ie("is", { startsExpr: N }), _mixins: ie("mixins", { startsExpr: N }), _proto: ie("proto", { startsExpr: N }), _require: ie("require", { startsExpr: N }), _keyof: ie("keyof", { startsExpr: N }), _readonly: ie("readonly", { startsExpr: N }), _unique: ie("unique", { startsExpr: N }), _abstract: ie("abstract", { startsExpr: N }), _declare: ie("declare", { startsExpr: N }), _enum: ie("enum", { startsExpr: N }), _module: ie("module", { startsExpr: N }), _namespace: ie("namespace", { startsExpr: N }), _interface: ie("interface", { startsExpr: N }), _type: ie("type", { startsExpr: N }), _opaque: ie("opaque", { startsExpr: N }), name: U("name", { startsExpr: N }), string: U("string", { startsExpr: N }), num: U("num", { startsExpr: N }), bigint: U("bigint", { startsExpr: N }), decimal: U("decimal", { startsExpr: N }), regexp: U("regexp", { startsExpr: N }), privateName: U("#name", { startsExpr: N }), eof: U("eof"), jsxName: U("jsxName"), jsxText: U("jsxText", { beforeExpr: !0 }), jsxTagStart: U("jsxTagStart", { startsExpr: !0 }), jsxTagEnd: U("jsxTagEnd"), placeholder: U("%%", { startsExpr: !0 }) };
        function oe(t) {
          return t >= 93 && t <= 128;
        }
        function va(t) {
          return t <= 92;
        }
        function Oe(t) {
          return t >= 58 && t <= 128;
        }
        function Ar(t) {
          return t >= 58 && t <= 132;
        }
        function Sa(t) {
          return ss[t];
        }
        function as(t) {
          return rs[t];
        }
        function Na(t) {
          return t >= 29 && t <= 33;
        }
        function Pr(t) {
          return t >= 125 && t <= 127;
        }
        function Ia(t) {
          return t >= 90 && t <= 92;
        }
        function ns(t) {
          return t >= 58 && t <= 92;
        }
        function ka(t) {
          return t >= 39 && t <= 59;
        }
        function Da(t) {
          return t === 34;
        }
        function Fa(t) {
          return is[t];
        }
        function La(t) {
          return t >= 117 && t <= 119;
        }
        function Ba(t) {
          return t >= 120 && t <= 126;
        }
        function Ve(t) {
          return ts[t];
        }
        function Et(t) {
          return Tt[t];
        }
        function Ma(t) {
          return Tt[t] !== -1;
        }
        function Oa(t) {
          return t === 57;
        }
        function Ct(t) {
          return t >= 24 && t <= 25;
        }
        function je(t) {
          return Me[t];
        }
        Me[8].updateContext = (t) => {
          t.pop();
        }, Me[5].updateContext = Me[7].updateContext = Me[23].updateContext = (t) => {
          t.push(ne.brace);
        }, Me[22].updateContext = (t) => {
          t[t.length - 1] === ne.template ? t.pop() : t.push(ne.template);
        }, Me[138].updateContext = (t) => {
          t.push(ne.j_expr, ne.j_oTag);
        };
        var os = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC", br = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F", ja = new RegExp("[" + os + "]"), Ra = new RegExp("[" + os + br + "]");
        os = br = null;
        var Tr = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938], Ua = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
        function hs(t, e) {
          let s = 65536;
          for (let r = 0, i = e.length; r < i; r += 2) {
            if (s += e[r], s > t)
              return !1;
            if (s += e[r + 1], s >= t)
              return !0;
          }
          return !1;
        }
        function Re(t) {
          return t < 65 ? t === 36 : t <= 90 ? !0 : t < 97 ? t === 95 : t <= 122 ? !0 : t <= 65535 ? t >= 170 && ja.test(String.fromCharCode(t)) : hs(t, Tr);
        }
        function st(t) {
          return t < 48 ? t === 36 : t < 58 ? !0 : t < 65 ? !1 : t <= 90 ? !0 : t < 97 ? t === 95 : t <= 122 ? !0 : t <= 65535 ? t >= 170 && Ra.test(String.fromCharCode(t)) : hs(t, Tr) || hs(t, Ua);
        }
        var ls = { keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"], strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"], strictBind: ["eval", "arguments"] }, _a = new Set(ls.keyword), za = new Set(ls.strict), Ha = new Set(ls.strictBind);
        function Er(t, e) {
          return e && t === "await" || t === "enum";
        }
        function Cr(t, e) {
          return Er(t, e) || za.has(t);
        }
        function wr(t) {
          return Ha.has(t);
        }
        function vr(t, e) {
          return Cr(t, e) || wr(t);
        }
        function Va(t) {
          return _a.has(t);
        }
        function qa(t, e, s) {
          return t === 64 && e === 64 && Re(s);
        }
        var Ka = /* @__PURE__ */ new Set(["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "eval", "arguments", "enum", "await"]);
        function Wa(t) {
          return Ka.has(t);
        }
        var rt = 0, dt = 1, Ue = 2, ps = 4, Sr = 8, wt = 16, Nr = 32, Xe = 64, us = 128, vt = 256, St = dt | Ue | vt, _e = 1, it = 2, Ir = 4, qe = 8, Nt = 16, kr = 64, It = 128, cs = 256, ds = 512, ms = 1024, fs = 2048, Dr = _e | it | qe | It, ze = _e | 0 | qe | 0, kt = _e | 0 | Ir | 0, Fr = _e | 0 | Nt | 0, Ja = 0 | it | 0 | It, Xa = 0 | it | 0 | 0, Lr = _e | it | qe | cs, Br = 0 | ms, Ge = 0 | kr, Ga = _e | 0 | 0 | kr, Ya = Lr | ds, Qa = 0 | ms, $a = fs, Dt = 4, ys = 2, xs = 1, gs = ys | xs, Za = ys | Dt, en = xs | Dt, tn = ys, sn = xs, As = 0, rn = class {
          constructor() {
            this.sawUnambiguousESM = !1, this.ambiguousScriptDifferentAst = !1;
          }
          hasPlugin(t) {
            if (typeof t == "string")
              return this.plugins.has(t);
            {
              let [e, s] = t;
              if (!this.hasPlugin(e))
                return !1;
              let r = this.plugins.get(e);
              for (let i of Object.keys(s))
                if ((r == null ? void 0 : r[i]) !== s[i])
                  return !1;
              return !0;
            }
          }
          getPluginOption(t, e) {
            var s;
            return (s = this.plugins.get(t)) == null ? void 0 : s[e];
          }
        };
        function Mr(t, e) {
          t.trailingComments === void 0 ? t.trailingComments = e : t.trailingComments.unshift(...e);
        }
        function an(t, e) {
          t.leadingComments === void 0 ? t.leadingComments = e : t.leadingComments.unshift(...e);
        }
        function mt(t, e) {
          t.innerComments === void 0 ? t.innerComments = e : t.innerComments.unshift(...e);
        }
        function ft(t, e, s) {
          let r = null, i = e.length;
          for (; r === null && i > 0; )
            r = e[--i];
          r === null || r.start > s.start ? mt(t, s.comments) : Mr(r, s.comments);
        }
        var nn = class extends rn {
          addComment(t) {
            this.filename && (t.loc.filename = this.filename), this.state.comments.push(t);
          }
          processComment(t) {
            let { commentStack: e } = this.state, s = e.length;
            if (s === 0)
              return;
            let r = s - 1, i = e[r];
            i.start === t.end && (i.leadingNode = t, r--);
            let { start: a } = t;
            for (; r >= 0; r--) {
              let n = e[r], o = n.end;
              if (o > a)
                n.containingNode = t, this.finalizeComment(n), e.splice(r, 1);
              else {
                o === a && (n.trailingNode = t);
                break;
              }
            }
          }
          finalizeComment(t) {
            let { comments: e } = t;
            if (t.leadingNode !== null || t.trailingNode !== null)
              t.leadingNode !== null && Mr(t.leadingNode, e), t.trailingNode !== null && an(t.trailingNode, e);
            else {
              let { containingNode: s, start: r } = t;
              if (this.input.charCodeAt(r - 1) === 44)
                switch (s.type) {
                  case "ObjectExpression":
                  case "ObjectPattern":
                  case "RecordExpression":
                    ft(s, s.properties, t);
                    break;
                  case "CallExpression":
                  case "OptionalCallExpression":
                    ft(s, s.arguments, t);
                    break;
                  case "FunctionDeclaration":
                  case "FunctionExpression":
                  case "ArrowFunctionExpression":
                  case "ObjectMethod":
                  case "ClassMethod":
                  case "ClassPrivateMethod":
                    ft(s, s.params, t);
                    break;
                  case "ArrayExpression":
                  case "ArrayPattern":
                  case "TupleExpression":
                    ft(s, s.elements, t);
                    break;
                  case "ExportNamedDeclaration":
                  case "ImportDeclaration":
                    ft(s, s.specifiers, t);
                    break;
                  default:
                    mt(s, e);
                }
              else
                mt(s, e);
            }
          }
          finalizeRemainingComments() {
            let { commentStack: t } = this.state;
            for (let e = t.length - 1; e >= 0; e--)
              this.finalizeComment(t[e]);
            this.state.commentStack = [];
          }
          resetPreviousNodeTrailingComments(t) {
            let { commentStack: e } = this.state, { length: s } = e;
            if (s === 0)
              return;
            let r = e[s - 1];
            r.leadingNode === t && (r.leadingNode = null);
          }
          takeSurroundingComments(t, e, s) {
            let { commentStack: r } = this.state, i = r.length;
            if (i === 0)
              return;
            let a = i - 1;
            for (; a >= 0; a--) {
              let n = r[a], o = n.end;
              if (n.start === s)
                n.leadingNode = t;
              else if (o === e)
                n.trailingNode = t;
              else if (o < e)
                break;
            }
          }
        }, Ps = /\r\n?|[\n\u2028\u2029]/, Ft = new RegExp(Ps.source, "g");
        function Ye(t) {
          switch (t) {
            case 10:
            case 13:
            case 8232:
            case 8233:
              return !0;
            default:
              return !1;
          }
        }
        var bs = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, on = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/y, Or = new RegExp("(?=(" + on.source + "))\\1" + /(?=[\n\r\u2028\u2029]|\/\*(?!.*?\*\/)|$)/.source, "y");
        function hn(t) {
          switch (t) {
            case 9:
            case 11:
            case 12:
            case 32:
            case 160:
            case 5760:
            case 8192:
            case 8193:
            case 8194:
            case 8195:
            case 8196:
            case 8197:
            case 8198:
            case 8199:
            case 8200:
            case 8201:
            case 8202:
            case 8239:
            case 8287:
            case 12288:
            case 65279:
              return !0;
            default:
              return !1;
          }
        }
        var jr = class {
          constructor() {
            this.strict = void 0, this.curLine = void 0, this.lineStart = void 0, this.startLoc = void 0, this.endLoc = void 0, this.errors = [], this.potentialArrowAt = -1, this.noArrowAt = [], this.noArrowParamsConversionAt = [], this.maybeInArrowParameters = !1, this.inType = !1, this.noAnonFunctionType = !1, this.hasFlowComment = !1, this.isAmbientContext = !1, this.inAbstractClass = !1, this.inDisallowConditionalTypesContext = !1, this.topicContext = { maxNumOfResolvableTopics: 0, maxTopicIndex: null }, this.soloAwait = !1, this.inFSharpPipelineDirectBody = !1, this.labels = [], this.decoratorStack = [[]], this.comments = [], this.commentStack = [], this.pos = 0, this.type = 135, this.value = null, this.start = 0, this.end = 0, this.lastTokEndLoc = null, this.lastTokStartLoc = null, this.lastTokStart = 0, this.context = [ne.brace], this.canStartJSXElement = !0, this.containsEsc = !1, this.strictErrors = /* @__PURE__ */ new Map(), this.tokensLength = 0;
          }
          init(t) {
            let { strictMode: e, sourceType: s, startLine: r, startColumn: i } = t;
            this.strict = e === !1 ? !1 : e === !0 ? !0 : s === "module", this.curLine = r, this.lineStart = -i, this.startLoc = this.endLoc = new A(r, i, 0);
          }
          curPosition() {
            return new A(this.curLine, this.pos - this.lineStart, this.pos);
          }
          clone(t) {
            let e = new jr(), s = Object.keys(this);
            for (let r = 0, i = s.length; r < i; r++) {
              let a = s[r], n = this[a];
              !t && Array.isArray(n) && (n = n.slice()), e[a] = n;
            }
            return e;
          }
        }, ln = ["at"], pn = ["at"], un = function(t) {
          return t >= 48 && t <= 57;
        }, cn = /* @__PURE__ */ new Set([103, 109, 115, 105, 121, 117, 100, 118]), Rr = { decBinOct: /* @__PURE__ */ new Set([46, 66, 69, 79, 95, 98, 101, 111]), hex: /* @__PURE__ */ new Set([46, 88, 95, 120]) }, Lt = { bin: (t) => t === 48 || t === 49, oct: (t) => t >= 48 && t <= 55, dec: (t) => t >= 48 && t <= 57, hex: (t) => t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102 }, Ke = class {
          constructor(t) {
            this.type = t.type, this.value = t.value, this.start = t.start, this.end = t.end, this.loc = new x(t.startLoc, t.endLoc);
          }
        }, dn = class extends nn {
          constructor(t, e) {
            super(), this.isLookahead = void 0, this.tokens = [], this.state = new jr(), this.state.init(t), this.input = e, this.length = e.length, this.isLookahead = !1;
          }
          pushToken(t) {
            this.tokens.length = this.state.tokensLength, this.tokens.push(t), ++this.state.tokensLength;
          }
          next() {
            this.checkKeywordEscapes(), this.options.tokens && this.pushToken(new Ke(this.state)), this.state.lastTokStart = this.state.start, this.state.lastTokEndLoc = this.state.endLoc, this.state.lastTokStartLoc = this.state.startLoc, this.nextToken();
          }
          eat(t) {
            return this.match(t) ? (this.next(), !0) : !1;
          }
          match(t) {
            return this.state.type === t;
          }
          createLookaheadState(t) {
            return { pos: t.pos, value: null, type: t.type, start: t.start, end: t.end, context: [this.curContext()], inType: t.inType, startLoc: t.startLoc, lastTokEndLoc: t.lastTokEndLoc, curLine: t.curLine, lineStart: t.lineStart, curPosition: t.curPosition };
          }
          lookahead() {
            let t = this.state;
            this.state = this.createLookaheadState(t), this.isLookahead = !0, this.nextToken(), this.isLookahead = !1;
            let e = this.state;
            return this.state = t, e;
          }
          nextTokenStart() {
            return this.nextTokenStartSince(this.state.pos);
          }
          nextTokenStartSince(t) {
            return bs.lastIndex = t, bs.test(this.input) ? bs.lastIndex : t;
          }
          lookaheadCharCode() {
            return this.input.charCodeAt(this.nextTokenStart());
          }
          codePointAtPos(t) {
            let e = this.input.charCodeAt(t);
            if ((e & 64512) === 55296 && ++t < this.input.length) {
              let s = this.input.charCodeAt(t);
              (s & 64512) === 56320 && (e = 65536 + ((e & 1023) << 10) + (s & 1023));
            }
            return e;
          }
          setStrict(t) {
            this.state.strict = t, t && (this.state.strictErrors.forEach((e) => {
              let [s, r] = e;
              return this.raise(s, { at: r });
            }), this.state.strictErrors.clear());
          }
          curContext() {
            return this.state.context[this.state.context.length - 1];
          }
          nextToken() {
            if (this.skipSpace(), this.state.start = this.state.pos, this.isLookahead || (this.state.startLoc = this.state.curPosition()), this.state.pos >= this.length) {
              this.finishToken(135);
              return;
            }
            this.getTokenFromCode(this.codePointAtPos(this.state.pos));
          }
          skipBlockComment() {
            let t;
            this.isLookahead || (t = this.state.curPosition());
            let e = this.state.pos, s = this.input.indexOf("*/", e + 2);
            if (s === -1)
              throw this.raise(h.UnterminatedComment, { at: this.state.curPosition() });
            for (this.state.pos = s + 2, Ft.lastIndex = e + 2; Ft.test(this.input) && Ft.lastIndex <= s; )
              ++this.state.curLine, this.state.lineStart = Ft.lastIndex;
            if (this.isLookahead)
              return;
            let r = { type: "CommentBlock", value: this.input.slice(e + 2, s), start: e, end: s + 2, loc: new x(t, this.state.curPosition()) };
            return this.options.tokens && this.pushToken(r), r;
          }
          skipLineComment(t) {
            let e = this.state.pos, s;
            this.isLookahead || (s = this.state.curPosition());
            let r = this.input.charCodeAt(this.state.pos += t);
            if (this.state.pos < this.length)
              for (; !Ye(r) && ++this.state.pos < this.length; )
                r = this.input.charCodeAt(this.state.pos);
            if (this.isLookahead)
              return;
            let i = this.state.pos, a = this.input.slice(e + t, i), n = { type: "CommentLine", value: a, start: e, end: i, loc: new x(s, this.state.curPosition()) };
            return this.options.tokens && this.pushToken(n), n;
          }
          skipSpace() {
            let t = this.state.pos, e = [];
            e:
              for (; this.state.pos < this.length; ) {
                let s = this.input.charCodeAt(this.state.pos);
                switch (s) {
                  case 32:
                  case 160:
                  case 9:
                    ++this.state.pos;
                    break;
                  case 13:
                    this.input.charCodeAt(this.state.pos + 1) === 10 && ++this.state.pos;
                  case 10:
                  case 8232:
                  case 8233:
                    ++this.state.pos, ++this.state.curLine, this.state.lineStart = this.state.pos;
                    break;
                  case 47:
                    switch (this.input.charCodeAt(this.state.pos + 1)) {
                      case 42: {
                        let r = this.skipBlockComment();
                        r !== void 0 && (this.addComment(r), this.options.attachComment && e.push(r));
                        break;
                      }
                      case 47: {
                        let r = this.skipLineComment(2);
                        r !== void 0 && (this.addComment(r), this.options.attachComment && e.push(r));
                        break;
                      }
                      default:
                        break e;
                    }
                    break;
                  default:
                    if (hn(s))
                      ++this.state.pos;
                    else if (s === 45 && !this.inModule) {
                      let r = this.state.pos;
                      if (this.input.charCodeAt(r + 1) === 45 && this.input.charCodeAt(r + 2) === 62 && (t === 0 || this.state.lineStart > t)) {
                        let i = this.skipLineComment(3);
                        i !== void 0 && (this.addComment(i), this.options.attachComment && e.push(i));
                      } else
                        break e;
                    } else if (s === 60 && !this.inModule) {
                      let r = this.state.pos;
                      if (this.input.charCodeAt(r + 1) === 33 && this.input.charCodeAt(r + 2) === 45 && this.input.charCodeAt(r + 3) === 45) {
                        let i = this.skipLineComment(4);
                        i !== void 0 && (this.addComment(i), this.options.attachComment && e.push(i));
                      } else
                        break e;
                    } else
                      break e;
                }
              }
            if (e.length > 0) {
              let s = this.state.pos, r = { start: t, end: s, comments: e, leadingNode: null, trailingNode: null, containingNode: null };
              this.state.commentStack.push(r);
            }
          }
          finishToken(t, e) {
            this.state.end = this.state.pos, this.state.endLoc = this.state.curPosition();
            let s = this.state.type;
            this.state.type = t, this.state.value = e, this.isLookahead || this.updateContext(s);
          }
          replaceToken(t) {
            this.state.type = t, this.updateContext();
          }
          readToken_numberSign() {
            if (this.state.pos === 0 && this.readToken_interpreter())
              return;
            let t = this.state.pos + 1, e = this.codePointAtPos(t);
            if (e >= 48 && e <= 57)
              throw this.raise(h.UnexpectedDigitAfterHash, { at: this.state.curPosition() });
            if (e === 123 || e === 91 && this.hasPlugin("recordAndTuple")) {
              if (this.expectPlugin("recordAndTuple"), this.getPluginOption("recordAndTuple", "syntaxType") !== "hash")
                throw this.raise(e === 123 ? h.RecordExpressionHashIncorrectStartSyntaxType : h.TupleExpressionHashIncorrectStartSyntaxType, { at: this.state.curPosition() });
              this.state.pos += 2, e === 123 ? this.finishToken(7) : this.finishToken(1);
            } else
              Re(e) ? (++this.state.pos, this.finishToken(134, this.readWord1(e))) : e === 92 ? (++this.state.pos, this.finishToken(134, this.readWord1())) : this.finishOp(27, 1);
          }
          readToken_dot() {
            let t = this.input.charCodeAt(this.state.pos + 1);
            if (t >= 48 && t <= 57) {
              this.readNumber(!0);
              return;
            }
            t === 46 && this.input.charCodeAt(this.state.pos + 2) === 46 ? (this.state.pos += 3, this.finishToken(21)) : (++this.state.pos, this.finishToken(16));
          }
          readToken_slash() {
            this.input.charCodeAt(this.state.pos + 1) === 61 ? this.finishOp(31, 2) : this.finishOp(56, 1);
          }
          readToken_interpreter() {
            if (this.state.pos !== 0 || this.length < 2)
              return !1;
            let t = this.input.charCodeAt(this.state.pos + 1);
            if (t !== 33)
              return !1;
            let e = this.state.pos;
            for (this.state.pos += 1; !Ye(t) && ++this.state.pos < this.length; )
              t = this.input.charCodeAt(this.state.pos);
            let s = this.input.slice(e + 2, this.state.pos);
            return this.finishToken(28, s), !0;
          }
          readToken_mult_modulo(t) {
            let e = t === 42 ? 55 : 54, s = 1, r = this.input.charCodeAt(this.state.pos + 1);
            t === 42 && r === 42 && (s++, r = this.input.charCodeAt(this.state.pos + 2), e = 57), r === 61 && !this.state.inType && (s++, e = t === 37 ? 33 : 30), this.finishOp(e, s);
          }
          readToken_pipe_amp(t) {
            let e = this.input.charCodeAt(this.state.pos + 1);
            if (e === t) {
              this.input.charCodeAt(this.state.pos + 2) === 61 ? this.finishOp(30, 3) : this.finishOp(t === 124 ? 41 : 42, 2);
              return;
            }
            if (t === 124) {
              if (e === 62) {
                this.finishOp(39, 2);
                return;
              }
              if (this.hasPlugin("recordAndTuple") && e === 125) {
                if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar")
                  throw this.raise(h.RecordExpressionBarIncorrectEndSyntaxType, { at: this.state.curPosition() });
                this.state.pos += 2, this.finishToken(9);
                return;
              }
              if (this.hasPlugin("recordAndTuple") && e === 93) {
                if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar")
                  throw this.raise(h.TupleExpressionBarIncorrectEndSyntaxType, { at: this.state.curPosition() });
                this.state.pos += 2, this.finishToken(4);
                return;
              }
            }
            if (e === 61) {
              this.finishOp(30, 2);
              return;
            }
            this.finishOp(t === 124 ? 43 : 45, 1);
          }
          readToken_caret() {
            let t = this.input.charCodeAt(this.state.pos + 1);
            if (t === 61 && !this.state.inType)
              this.finishOp(32, 2);
            else if (t === 94 && this.hasPlugin(["pipelineOperator", { proposal: "hack", topicToken: "^^" }])) {
              if (this.finishOp(37, 2), this.input.codePointAt(this.state.pos) === 94)
                throw this.unexpected();
            } else
              this.finishOp(44, 1);
          }
          readToken_atSign() {
            this.input.charCodeAt(this.state.pos + 1) === 64 && this.hasPlugin(["pipelineOperator", { proposal: "hack", topicToken: "@@" }]) ? this.finishOp(38, 2) : this.finishOp(26, 1);
          }
          readToken_plus_min(t) {
            let e = this.input.charCodeAt(this.state.pos + 1);
            if (e === t) {
              this.finishOp(34, 2);
              return;
            }
            e === 61 ? this.finishOp(30, 2) : this.finishOp(53, 1);
          }
          readToken_lt() {
            let { pos: t } = this.state, e = this.input.charCodeAt(t + 1);
            if (e === 60) {
              if (this.input.charCodeAt(t + 2) === 61) {
                this.finishOp(30, 3);
                return;
              }
              this.finishOp(51, 2);
              return;
            }
            if (e === 61) {
              this.finishOp(49, 2);
              return;
            }
            this.finishOp(47, 1);
          }
          readToken_gt() {
            let { pos: t } = this.state, e = this.input.charCodeAt(t + 1);
            if (e === 62) {
              let s = this.input.charCodeAt(t + 2) === 62 ? 3 : 2;
              if (this.input.charCodeAt(t + s) === 61) {
                this.finishOp(30, s + 1);
                return;
              }
              this.finishOp(52, s);
              return;
            }
            if (e === 61) {
              this.finishOp(49, 2);
              return;
            }
            this.finishOp(48, 1);
          }
          readToken_eq_excl(t) {
            let e = this.input.charCodeAt(this.state.pos + 1);
            if (e === 61) {
              this.finishOp(46, this.input.charCodeAt(this.state.pos + 2) === 61 ? 3 : 2);
              return;
            }
            if (t === 61 && e === 62) {
              this.state.pos += 2, this.finishToken(19);
              return;
            }
            this.finishOp(t === 61 ? 29 : 35, 1);
          }
          readToken_question() {
            let t = this.input.charCodeAt(this.state.pos + 1), e = this.input.charCodeAt(this.state.pos + 2);
            t === 63 ? e === 61 ? this.finishOp(30, 3) : this.finishOp(40, 2) : t === 46 && !(e >= 48 && e <= 57) ? (this.state.pos += 2, this.finishToken(18)) : (++this.state.pos, this.finishToken(17));
          }
          getTokenFromCode(t) {
            switch (t) {
              case 46:
                this.readToken_dot();
                return;
              case 40:
                ++this.state.pos, this.finishToken(10);
                return;
              case 41:
                ++this.state.pos, this.finishToken(11);
                return;
              case 59:
                ++this.state.pos, this.finishToken(13);
                return;
              case 44:
                ++this.state.pos, this.finishToken(12);
                return;
              case 91:
                if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
                  if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar")
                    throw this.raise(h.TupleExpressionBarIncorrectStartSyntaxType, { at: this.state.curPosition() });
                  this.state.pos += 2, this.finishToken(2);
                } else
                  ++this.state.pos, this.finishToken(0);
                return;
              case 93:
                ++this.state.pos, this.finishToken(3);
                return;
              case 123:
                if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
                  if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar")
                    throw this.raise(h.RecordExpressionBarIncorrectStartSyntaxType, { at: this.state.curPosition() });
                  this.state.pos += 2, this.finishToken(6);
                } else
                  ++this.state.pos, this.finishToken(5);
                return;
              case 125:
                ++this.state.pos, this.finishToken(8);
                return;
              case 58:
                this.hasPlugin("functionBind") && this.input.charCodeAt(this.state.pos + 1) === 58 ? this.finishOp(15, 2) : (++this.state.pos, this.finishToken(14));
                return;
              case 63:
                this.readToken_question();
                return;
              case 96:
                this.readTemplateToken();
                return;
              case 48: {
                let e = this.input.charCodeAt(this.state.pos + 1);
                if (e === 120 || e === 88) {
                  this.readRadixNumber(16);
                  return;
                }
                if (e === 111 || e === 79) {
                  this.readRadixNumber(8);
                  return;
                }
                if (e === 98 || e === 66) {
                  this.readRadixNumber(2);
                  return;
                }
              }
              case 49:
              case 50:
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
              case 56:
              case 57:
                this.readNumber(!1);
                return;
              case 34:
              case 39:
                this.readString(t);
                return;
              case 47:
                this.readToken_slash();
                return;
              case 37:
              case 42:
                this.readToken_mult_modulo(t);
                return;
              case 124:
              case 38:
                this.readToken_pipe_amp(t);
                return;
              case 94:
                this.readToken_caret();
                return;
              case 43:
              case 45:
                this.readToken_plus_min(t);
                return;
              case 60:
                this.readToken_lt();
                return;
              case 62:
                this.readToken_gt();
                return;
              case 61:
              case 33:
                this.readToken_eq_excl(t);
                return;
              case 126:
                this.finishOp(36, 1);
                return;
              case 64:
                this.readToken_atSign();
                return;
              case 35:
                this.readToken_numberSign();
                return;
              case 92:
                this.readWord();
                return;
              default:
                if (Re(t)) {
                  this.readWord(t);
                  return;
                }
            }
            throw this.raise(h.InvalidOrUnexpectedToken, { at: this.state.curPosition(), unexpected: String.fromCodePoint(t) });
          }
          finishOp(t, e) {
            let s = this.input.slice(this.state.pos, this.state.pos + e);
            this.state.pos += e, this.finishToken(t, s);
          }
          readRegexp() {
            let t = this.state.startLoc, e = this.state.start + 1, s, r, { pos: i } = this.state;
            for (; ; ++i) {
              if (i >= this.length)
                throw this.raise(h.UnterminatedRegExp, { at: g(t, 1) });
              let l = this.input.charCodeAt(i);
              if (Ye(l))
                throw this.raise(h.UnterminatedRegExp, { at: g(t, 1) });
              if (s)
                s = !1;
              else {
                if (l === 91)
                  r = !0;
                else if (l === 93 && r)
                  r = !1;
                else if (l === 47 && !r)
                  break;
                s = l === 92;
              }
            }
            let a = this.input.slice(e, i);
            ++i;
            let n = "", o = () => g(t, i + 2 - e);
            for (; i < this.length; ) {
              let l = this.codePointAtPos(i), p = String.fromCharCode(l);
              if (cn.has(l))
                l === 118 ? (this.expectPlugin("regexpUnicodeSets", o()), n.includes("u") && this.raise(h.IncompatibleRegExpUVFlags, { at: o() })) : l === 117 && n.includes("v") && this.raise(h.IncompatibleRegExpUVFlags, { at: o() }), n.includes(p) && this.raise(h.DuplicateRegExpFlags, { at: o() });
              else if (st(l) || l === 92)
                this.raise(h.MalformedRegExpFlags, { at: o() });
              else
                break;
              ++i, n += p;
            }
            this.state.pos = i, this.finishToken(133, { pattern: a, flags: n });
          }
          readInt(t, e, s) {
            let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, i = this.state.pos, a = t === 16 ? Rr.hex : Rr.decBinOct, n = t === 16 ? Lt.hex : t === 10 ? Lt.dec : t === 8 ? Lt.oct : Lt.bin, o = !1, l = 0;
            for (let p = 0, y = e == null ? 1 / 0 : e; p < y; ++p) {
              let S = this.input.charCodeAt(this.state.pos), B;
              if (S === 95 && r !== "bail") {
                let z = this.input.charCodeAt(this.state.pos - 1), $ = this.input.charCodeAt(this.state.pos + 1);
                r ? (Number.isNaN($) || !n($) || a.has(z) || a.has($)) && this.raise(h.UnexpectedNumericSeparator, { at: this.state.curPosition() }) : this.raise(h.NumericSeparatorInEscapeSequence, { at: this.state.curPosition() }), ++this.state.pos;
                continue;
              }
              if (S >= 97 ? B = S - 97 + 10 : S >= 65 ? B = S - 65 + 10 : un(S) ? B = S - 48 : B = 1 / 0, B >= t)
                if (this.options.errorRecovery && B <= 9)
                  B = 0, this.raise(h.InvalidDigit, { at: this.state.curPosition(), radix: t });
                else if (s)
                  B = 0, o = !0;
                else
                  break;
              ++this.state.pos, l = l * t + B;
            }
            return this.state.pos === i || e != null && this.state.pos - i !== e || o ? null : l;
          }
          readRadixNumber(t) {
            let e = this.state.curPosition(), s = !1;
            this.state.pos += 2;
            let r = this.readInt(t);
            r == null && this.raise(h.InvalidDigit, { at: g(e, 2), radix: t });
            let i = this.input.charCodeAt(this.state.pos);
            if (i === 110)
              ++this.state.pos, s = !0;
            else if (i === 109)
              throw this.raise(h.InvalidDecimal, { at: e });
            if (Re(this.codePointAtPos(this.state.pos)))
              throw this.raise(h.NumberIdentifier, { at: this.state.curPosition() });
            if (s) {
              let a = this.input.slice(e.index, this.state.pos).replace(/[_n]/g, "");
              this.finishToken(131, a);
              return;
            }
            this.finishToken(130, r);
          }
          readNumber(t) {
            let e = this.state.pos, s = this.state.curPosition(), r = !1, i = !1, a = !1, n = !1, o = !1;
            !t && this.readInt(10) === null && this.raise(h.InvalidNumber, { at: this.state.curPosition() });
            let l = this.state.pos - e >= 2 && this.input.charCodeAt(e) === 48;
            if (l) {
              let B = this.input.slice(e, this.state.pos);
              if (this.recordStrictModeErrors(h.StrictOctalLiteral, { at: s }), !this.state.strict) {
                let z = B.indexOf("_");
                z > 0 && this.raise(h.ZeroDigitNumericSeparator, { at: g(s, z) });
              }
              o = l && !/[89]/.test(B);
            }
            let p = this.input.charCodeAt(this.state.pos);
            if (p === 46 && !o && (++this.state.pos, this.readInt(10), r = !0, p = this.input.charCodeAt(this.state.pos)), (p === 69 || p === 101) && !o && (p = this.input.charCodeAt(++this.state.pos), (p === 43 || p === 45) && ++this.state.pos, this.readInt(10) === null && this.raise(h.InvalidOrMissingExponent, { at: s }), r = !0, n = !0, p = this.input.charCodeAt(this.state.pos)), p === 110 && ((r || l) && this.raise(h.InvalidBigIntLiteral, { at: s }), ++this.state.pos, i = !0), p === 109 && (this.expectPlugin("decimal", this.state.curPosition()), (n || l) && this.raise(h.InvalidDecimal, { at: s }), ++this.state.pos, a = !0), Re(this.codePointAtPos(this.state.pos)))
              throw this.raise(h.NumberIdentifier, { at: this.state.curPosition() });
            let y = this.input.slice(e, this.state.pos).replace(/[_mn]/g, "");
            if (i) {
              this.finishToken(131, y);
              return;
            }
            if (a) {
              this.finishToken(132, y);
              return;
            }
            let S = o ? parseInt(y, 8) : parseFloat(y);
            this.finishToken(130, S);
          }
          readCodePoint(t) {
            let e = this.input.charCodeAt(this.state.pos), s;
            if (e === 123) {
              if (++this.state.pos, s = this.readHexChar(this.input.indexOf("}", this.state.pos) - this.state.pos, !0, t), ++this.state.pos, s !== null && s > 1114111)
                if (t)
                  this.raise(h.InvalidCodePoint, { at: this.state.curPosition() });
                else
                  return null;
            } else
              s = this.readHexChar(4, !1, t);
            return s;
          }
          readString(t) {
            let e = "", s = ++this.state.pos;
            for (; ; ) {
              if (this.state.pos >= this.length)
                throw this.raise(h.UnterminatedString, { at: this.state.startLoc });
              let r = this.input.charCodeAt(this.state.pos);
              if (r === t)
                break;
              if (r === 92)
                e += this.input.slice(s, this.state.pos), e += this.readEscapedChar(!1), s = this.state.pos;
              else if (r === 8232 || r === 8233)
                ++this.state.pos, ++this.state.curLine, this.state.lineStart = this.state.pos;
              else {
                if (Ye(r))
                  throw this.raise(h.UnterminatedString, { at: this.state.startLoc });
                ++this.state.pos;
              }
            }
            e += this.input.slice(s, this.state.pos++), this.finishToken(129, e);
          }
          readTemplateContinuation() {
            this.match(8) || this.unexpected(null, 8), this.state.pos--, this.readTemplateToken();
          }
          readTemplateToken() {
            let t = "", e = this.state.pos, s = !1;
            for (++this.state.pos; ; ) {
              if (this.state.pos >= this.length)
                throw this.raise(h.UnterminatedTemplate, { at: g(this.state.startLoc, 1) });
              let r = this.input.charCodeAt(this.state.pos);
              if (r === 96) {
                ++this.state.pos, t += this.input.slice(e, this.state.pos), this.finishToken(24, s ? null : t);
                return;
              }
              if (r === 36 && this.input.charCodeAt(this.state.pos + 1) === 123) {
                this.state.pos += 2, t += this.input.slice(e, this.state.pos), this.finishToken(25, s ? null : t);
                return;
              }
              if (r === 92) {
                t += this.input.slice(e, this.state.pos);
                let i = this.readEscapedChar(!0);
                i === null ? s = !0 : t += i, e = this.state.pos;
              } else if (Ye(r)) {
                switch (t += this.input.slice(e, this.state.pos), ++this.state.pos, r) {
                  case 13:
                    this.input.charCodeAt(this.state.pos) === 10 && ++this.state.pos;
                  case 10:
                    t += `
`;
                    break;
                  default:
                    t += String.fromCharCode(r);
                    break;
                }
                ++this.state.curLine, this.state.lineStart = this.state.pos, e = this.state.pos;
              } else
                ++this.state.pos;
            }
          }
          recordStrictModeErrors(t, e) {
            let { at: s } = e, r = s.index;
            this.state.strict && !this.state.strictErrors.has(r) ? this.raise(t, { at: s }) : this.state.strictErrors.set(r, [t, s]);
          }
          readEscapedChar(t) {
            let e = !t, s = this.input.charCodeAt(++this.state.pos);
            switch (++this.state.pos, s) {
              case 110:
                return `
`;
              case 114:
                return "\r";
              case 120: {
                let r = this.readHexChar(2, !1, e);
                return r === null ? null : String.fromCharCode(r);
              }
              case 117: {
                let r = this.readCodePoint(e);
                return r === null ? null : String.fromCodePoint(r);
              }
              case 116:
                return "	";
              case 98:
                return "\b";
              case 118:
                return "\v";
              case 102:
                return "\f";
              case 13:
                this.input.charCodeAt(this.state.pos) === 10 && ++this.state.pos;
              case 10:
                this.state.lineStart = this.state.pos, ++this.state.curLine;
              case 8232:
              case 8233:
                return "";
              case 56:
              case 57:
                if (t)
                  return null;
                this.recordStrictModeErrors(h.StrictNumericEscape, { at: g(this.state.curPosition(), -1) });
              default:
                if (s >= 48 && s <= 55) {
                  let r = g(this.state.curPosition(), -1), i = this.input.slice(this.state.pos - 1, this.state.pos + 2).match(/^[0-7]+/)[0], a = parseInt(i, 8);
                  a > 255 && (i = i.slice(0, -1), a = parseInt(i, 8)), this.state.pos += i.length - 1;
                  let n = this.input.charCodeAt(this.state.pos);
                  if (i !== "0" || n === 56 || n === 57) {
                    if (t)
                      return null;
                    this.recordStrictModeErrors(h.StrictNumericEscape, { at: r });
                  }
                  return String.fromCharCode(a);
                }
                return String.fromCharCode(s);
            }
          }
          readHexChar(t, e, s) {
            let r = this.state.curPosition(), i = this.readInt(16, t, e, !1);
            return i === null && (s ? this.raise(h.InvalidEscapeSequence, { at: r }) : this.state.pos = r.index - 1), i;
          }
          readWord1(t) {
            this.state.containsEsc = !1;
            let e = "", s = this.state.pos, r = this.state.pos;
            for (t !== void 0 && (this.state.pos += t <= 65535 ? 1 : 2); this.state.pos < this.length; ) {
              let i = this.codePointAtPos(this.state.pos);
              if (st(i))
                this.state.pos += i <= 65535 ? 1 : 2;
              else if (i === 92) {
                this.state.containsEsc = !0, e += this.input.slice(r, this.state.pos);
                let a = this.state.curPosition(), n = this.state.pos === s ? Re : st;
                if (this.input.charCodeAt(++this.state.pos) !== 117) {
                  this.raise(h.MissingUnicodeEscape, { at: this.state.curPosition() }), r = this.state.pos - 1;
                  continue;
                }
                ++this.state.pos;
                let o = this.readCodePoint(!0);
                o !== null && (n(o) || this.raise(h.EscapedCharNotAnIdentifier, { at: a }), e += String.fromCodePoint(o)), r = this.state.pos;
              } else
                break;
            }
            return e + this.input.slice(r, this.state.pos);
          }
          readWord(t) {
            let e = this.readWord1(t), s = es.get(e);
            s !== void 0 ? this.finishToken(s, Ve(s)) : this.finishToken(128, e);
          }
          checkKeywordEscapes() {
            let { type: t } = this.state;
            ns(t) && this.state.containsEsc && this.raise(h.InvalidEscapedReservedWord, { at: this.state.startLoc, reservedWord: Ve(t) });
          }
          raise(t, e) {
            let { at: s } = e, r = P(e, ln), i = s instanceof A ? s : s.loc.start, a = t({ loc: i, details: r });
            if (!this.options.errorRecovery)
              throw a;
            return this.isLookahead || this.state.errors.push(a), a;
          }
          raiseOverwrite(t, e) {
            let { at: s } = e, r = P(e, pn), i = s instanceof A ? s : s.loc.start, a = i.index, n = this.state.errors;
            for (let o = n.length - 1; o >= 0; o--) {
              let l = n[o];
              if (l.loc.index === a)
                return n[o] = t({ loc: i, details: r });
              if (l.loc.index < a)
                break;
            }
            return this.raise(t, e);
          }
          updateContext(t) {
          }
          unexpected(t, e) {
            throw this.raise(h.UnexpectedToken, { expected: e ? Ve(e) : null, at: t != null ? t : this.state.startLoc });
          }
          expectPlugin(t, e) {
            if (this.hasPlugin(t))
              return !0;
            throw this.raise(h.MissingPlugin, { at: e != null ? e : this.state.startLoc, missingPlugin: [t] });
          }
          expectOnePlugin(t) {
            if (!t.some((e) => this.hasPlugin(e)))
              throw this.raise(h.MissingOneOfPlugins, { at: this.state.startLoc, missingPlugin: t });
          }
        }, Ts = class {
          constructor(t) {
            this.var = /* @__PURE__ */ new Set(), this.lexical = /* @__PURE__ */ new Set(), this.functions = /* @__PURE__ */ new Set(), this.flags = t;
          }
        }, Es = class {
          constructor(t, e) {
            this.parser = void 0, this.scopeStack = [], this.inModule = void 0, this.undefinedExports = /* @__PURE__ */ new Map(), this.parser = t, this.inModule = e;
          }
          get inFunction() {
            return (this.currentVarScopeFlags() & Ue) > 0;
          }
          get allowSuper() {
            return (this.currentThisScopeFlags() & wt) > 0;
          }
          get allowDirectSuper() {
            return (this.currentThisScopeFlags() & Nr) > 0;
          }
          get inClass() {
            return (this.currentThisScopeFlags() & Xe) > 0;
          }
          get inClassAndNotInNonArrowFunction() {
            let t = this.currentThisScopeFlags();
            return (t & Xe) > 0 && (t & Ue) === 0;
          }
          get inStaticBlock() {
            for (let t = this.scopeStack.length - 1; ; t--) {
              let { flags: e } = this.scopeStack[t];
              if (e & us)
                return !0;
              if (e & (St | Xe))
                return !1;
            }
          }
          get inNonArrowFunction() {
            return (this.currentThisScopeFlags() & Ue) > 0;
          }
          get treatFunctionsAsVar() {
            return this.treatFunctionsAsVarInScope(this.currentScope());
          }
          createScope(t) {
            return new Ts(t);
          }
          enter(t) {
            this.scopeStack.push(this.createScope(t));
          }
          exit() {
            this.scopeStack.pop();
          }
          treatFunctionsAsVarInScope(t) {
            return !!(t.flags & (Ue | us) || !this.parser.inModule && t.flags & dt);
          }
          declareName(t, e, s) {
            let r = this.currentScope();
            if (e & qe || e & Nt)
              this.checkRedeclarationInScope(r, t, e, s), e & Nt ? r.functions.add(t) : r.lexical.add(t), e & qe && this.maybeExportDefined(r, t);
            else if (e & Ir)
              for (let i = this.scopeStack.length - 1; i >= 0 && (r = this.scopeStack[i], this.checkRedeclarationInScope(r, t, e, s), r.var.add(t), this.maybeExportDefined(r, t), !(r.flags & St)); --i)
                ;
            this.parser.inModule && r.flags & dt && this.undefinedExports.delete(t);
          }
          maybeExportDefined(t, e) {
            this.parser.inModule && t.flags & dt && this.undefinedExports.delete(e);
          }
          checkRedeclarationInScope(t, e, s, r) {
            this.isRedeclaredInScope(t, e, s) && this.parser.raise(h.VarRedeclaration, { at: r, identifierName: e });
          }
          isRedeclaredInScope(t, e, s) {
            return s & _e ? s & qe ? t.lexical.has(e) || t.functions.has(e) || t.var.has(e) : s & Nt ? t.lexical.has(e) || !this.treatFunctionsAsVarInScope(t) && t.var.has(e) : t.lexical.has(e) && !(t.flags & Sr && t.lexical.values().next().value === e) || !this.treatFunctionsAsVarInScope(t) && t.functions.has(e) : !1;
          }
          checkLocalExport(t) {
            let { name: e } = t, s = this.scopeStack[0];
            !s.lexical.has(e) && !s.var.has(e) && !s.functions.has(e) && this.undefinedExports.set(e, t.loc.start);
          }
          currentScope() {
            return this.scopeStack[this.scopeStack.length - 1];
          }
          currentVarScopeFlags() {
            for (let t = this.scopeStack.length - 1; ; t--) {
              let { flags: e } = this.scopeStack[t];
              if (e & St)
                return e;
            }
          }
          currentThisScopeFlags() {
            for (let t = this.scopeStack.length - 1; ; t--) {
              let { flags: e } = this.scopeStack[t];
              if (e & (St | Xe) && !(e & ps))
                return e;
            }
          }
        }, mn = class extends Ts {
          constructor() {
            super(...arguments), this.declareFunctions = /* @__PURE__ */ new Set();
          }
        }, fn = class extends Es {
          createScope(t) {
            return new mn(t);
          }
          declareName(t, e, s) {
            let r = this.currentScope();
            if (e & fs) {
              this.checkRedeclarationInScope(r, t, e, s), this.maybeExportDefined(r, t), r.declareFunctions.add(t);
              return;
            }
            super.declareName(...arguments);
          }
          isRedeclaredInScope(t, e, s) {
            return super.isRedeclaredInScope(...arguments) ? !0 : s & fs ? !t.declareFunctions.has(e) && (t.lexical.has(e) || t.functions.has(e)) : !1;
          }
          checkLocalExport(t) {
            this.scopeStack[0].declareFunctions.has(t.name) || super.checkLocalExport(t);
          }
        }, yn = class {
          constructor() {
            this.privateNames = /* @__PURE__ */ new Set(), this.loneAccessors = /* @__PURE__ */ new Map(), this.undefinedPrivateNames = /* @__PURE__ */ new Map();
          }
        }, xn = class {
          constructor(t) {
            this.parser = void 0, this.stack = [], this.undefinedPrivateNames = /* @__PURE__ */ new Map(), this.parser = t;
          }
          current() {
            return this.stack[this.stack.length - 1];
          }
          enter() {
            this.stack.push(new yn());
          }
          exit() {
            let t = this.stack.pop(), e = this.current();
            for (let [s, r] of Array.from(t.undefinedPrivateNames))
              e ? e.undefinedPrivateNames.has(s) || e.undefinedPrivateNames.set(s, r) : this.parser.raise(h.InvalidPrivateFieldResolution, { at: r, identifierName: s });
          }
          declarePrivateName(t, e, s) {
            let { privateNames: r, loneAccessors: i, undefinedPrivateNames: a } = this.current(), n = r.has(t);
            if (e & gs) {
              let o = n && i.get(t);
              if (o) {
                let l = o & Dt, p = e & Dt, y = o & gs, S = e & gs;
                n = y === S || l !== p, n || i.delete(t);
              } else
                n || i.set(t, e);
            }
            n && this.parser.raise(h.PrivateNameRedeclaration, { at: s, identifierName: t }), r.add(t), a.delete(t);
          }
          usePrivateName(t, e) {
            let s;
            for (s of this.stack)
              if (s.privateNames.has(t))
                return;
            s ? s.undefinedPrivateNames.set(t, e) : this.parser.raise(h.InvalidPrivateFieldResolution, { at: e, identifierName: t });
          }
        }, gn = 0, Ur = 1, Cs = 2, _r = 3, Bt = class {
          constructor() {
            let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : gn;
            this.type = void 0, this.type = t;
          }
          canBeArrowParameterDeclaration() {
            return this.type === Cs || this.type === Ur;
          }
          isCertainlyParameterDeclaration() {
            return this.type === _r;
          }
        }, zr = class extends Bt {
          constructor(t) {
            super(t), this.declarationErrors = /* @__PURE__ */ new Map();
          }
          recordDeclarationError(t, e) {
            let { at: s } = e, r = s.index;
            this.declarationErrors.set(r, [t, s]);
          }
          clearDeclarationError(t) {
            this.declarationErrors.delete(t);
          }
          iterateErrors(t) {
            this.declarationErrors.forEach(t);
          }
        }, An = class {
          constructor(t) {
            this.parser = void 0, this.stack = [new Bt()], this.parser = t;
          }
          enter(t) {
            this.stack.push(t);
          }
          exit() {
            this.stack.pop();
          }
          recordParameterInitializerError(t, e) {
            let { at: s } = e, r = { at: s.loc.start }, { stack: i } = this, a = i.length - 1, n = i[a];
            for (; !n.isCertainlyParameterDeclaration(); ) {
              if (n.canBeArrowParameterDeclaration())
                n.recordDeclarationError(t, r);
              else
                return;
              n = i[--a];
            }
            this.parser.raise(t, r);
          }
          recordArrowParemeterBindingError(t, e) {
            let { at: s } = e, { stack: r } = this, i = r[r.length - 1], a = { at: s.loc.start };
            if (i.isCertainlyParameterDeclaration())
              this.parser.raise(t, a);
            else if (i.canBeArrowParameterDeclaration())
              i.recordDeclarationError(t, a);
            else
              return;
          }
          recordAsyncArrowParametersError(t) {
            let { at: e } = t, { stack: s } = this, r = s.length - 1, i = s[r];
            for (; i.canBeArrowParameterDeclaration(); )
              i.type === Cs && i.recordDeclarationError(h.AwaitBindingIdentifier, { at: e }), i = s[--r];
          }
          validateAsPattern() {
            let { stack: t } = this, e = t[t.length - 1];
            !e.canBeArrowParameterDeclaration() || e.iterateErrors((s) => {
              let [r, i] = s;
              this.parser.raise(r, { at: i });
              let a = t.length - 2, n = t[a];
              for (; n.canBeArrowParameterDeclaration(); )
                n.clearDeclarationError(i.index), n = t[--a];
            });
          }
        };
        function Pn() {
          return new Bt(_r);
        }
        function bn() {
          return new zr(Ur);
        }
        function Tn() {
          return new zr(Cs);
        }
        function Hr() {
          return new Bt();
        }
        var at = 0, Vr = 1, Mt = 2, qr = 4, nt = 8, En = class {
          constructor() {
            this.stacks = [];
          }
          enter(t) {
            this.stacks.push(t);
          }
          exit() {
            this.stacks.pop();
          }
          currentFlags() {
            return this.stacks[this.stacks.length - 1];
          }
          get hasAwait() {
            return (this.currentFlags() & Mt) > 0;
          }
          get hasYield() {
            return (this.currentFlags() & Vr) > 0;
          }
          get hasReturn() {
            return (this.currentFlags() & qr) > 0;
          }
          get hasIn() {
            return (this.currentFlags() & nt) > 0;
          }
        };
        function Ot(t, e) {
          return (t ? Mt : 0) | (e ? Vr : 0);
        }
        var Cn = class extends dn {
          addExtra(t, e, s) {
            let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0;
            if (!t)
              return;
            let i = t.extra = t.extra || {};
            r ? i[e] = s : Object.defineProperty(i, e, { enumerable: r, value: s });
          }
          isContextual(t) {
            return this.state.type === t && !this.state.containsEsc;
          }
          isUnparsedContextual(t, e) {
            let s = t + e.length;
            if (this.input.slice(t, s) === e) {
              let r = this.input.charCodeAt(s);
              return !(st(r) || (r & 64512) === 55296);
            }
            return !1;
          }
          isLookaheadContextual(t) {
            let e = this.nextTokenStart();
            return this.isUnparsedContextual(e, t);
          }
          eatContextual(t) {
            return this.isContextual(t) ? (this.next(), !0) : !1;
          }
          expectContextual(t, e) {
            if (!this.eatContextual(t))
              throw e != null ? this.raise(e, { at: this.state.startLoc }) : this.unexpected(null, t);
          }
          canInsertSemicolon() {
            return this.match(135) || this.match(8) || this.hasPrecedingLineBreak();
          }
          hasPrecedingLineBreak() {
            return Ps.test(this.input.slice(this.state.lastTokEndLoc.index, this.state.start));
          }
          hasFollowingLineBreak() {
            return Or.lastIndex = this.state.end, Or.test(this.input);
          }
          isLineTerminator() {
            return this.eat(13) || this.canInsertSemicolon();
          }
          semicolon() {
            (!(arguments.length > 0 && arguments[0] !== void 0) || arguments[0] ? this.isLineTerminator() : this.eat(13)) || this.raise(h.MissingSemicolon, { at: this.state.lastTokEndLoc });
          }
          expect(t, e) {
            this.eat(t) || this.unexpected(e, t);
          }
          tryParse(t) {
            let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.state.clone(), s = { node: null };
            try {
              let r = t(function() {
                let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
                throw s.node = i, s;
              });
              if (this.state.errors.length > e.errors.length) {
                let i = this.state;
                return this.state = e, this.state.tokensLength = i.tokensLength, { node: r, error: i.errors[e.errors.length], thrown: !1, aborted: !1, failState: i };
              }
              return { node: r, error: null, thrown: !1, aborted: !1, failState: null };
            } catch (r) {
              let i = this.state;
              if (this.state = e, r instanceof SyntaxError)
                return { node: null, error: r, thrown: !0, aborted: !1, failState: i };
              if (r === s)
                return { node: s.node, error: null, thrown: !1, aborted: !0, failState: i };
              throw r;
            }
          }
          checkExpressionErrors(t, e) {
            if (!t)
              return !1;
            let { shorthandAssignLoc: s, doubleProtoLoc: r, privateKeyLoc: i, optionalParametersLoc: a } = t, n = !!s || !!r || !!a || !!i;
            if (!e)
              return n;
            s != null && this.raise(h.InvalidCoverInitializedName, { at: s }), r != null && this.raise(h.DuplicateProto, { at: r }), i != null && this.raise(h.UnexpectedPrivateField, { at: i }), a != null && this.unexpected(a);
          }
          isLiteralPropertyName() {
            return Ar(this.state.type);
          }
          isPrivateName(t) {
            return t.type === "PrivateName";
          }
          getPrivateNameSV(t) {
            return t.id.name;
          }
          hasPropertyAsPrivateName(t) {
            return (t.type === "MemberExpression" || t.type === "OptionalMemberExpression") && this.isPrivateName(t.property);
          }
          isOptionalChain(t) {
            return t.type === "OptionalMemberExpression" || t.type === "OptionalCallExpression";
          }
          isObjectProperty(t) {
            return t.type === "ObjectProperty";
          }
          isObjectMethod(t) {
            return t.type === "ObjectMethod";
          }
          initializeScopes() {
            let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.sourceType === "module", e = this.state.labels;
            this.state.labels = [];
            let s = this.exportedIdentifiers;
            this.exportedIdentifiers = /* @__PURE__ */ new Set();
            let r = this.inModule;
            this.inModule = t;
            let i = this.scope, a = this.getScopeHandler();
            this.scope = new a(this, t);
            let n = this.prodParam;
            this.prodParam = new En();
            let o = this.classScope;
            this.classScope = new xn(this);
            let l = this.expressionScope;
            return this.expressionScope = new An(this), () => {
              this.state.labels = e, this.exportedIdentifiers = s, this.inModule = r, this.scope = i, this.prodParam = n, this.classScope = o, this.expressionScope = l;
            };
          }
          enterInitialScopes() {
            let t = at;
            this.inModule && (t |= Mt), this.scope.enter(dt), this.prodParam.enter(t);
          }
          checkDestructuringPrivate(t) {
            let { privateKeyLoc: e } = t;
            e !== null && this.expectPlugin("destructuringPrivate", e);
          }
        }, jt = class {
          constructor() {
            this.shorthandAssignLoc = null, this.doubleProtoLoc = null, this.privateKeyLoc = null, this.optionalParametersLoc = null;
          }
        }, Rt = class {
          constructor(t, e, s) {
            this.type = "", this.start = e, this.end = 0, this.loc = new x(s), t != null && t.options.ranges && (this.range = [e, 0]), t != null && t.filename && (this.loc.filename = t.filename);
          }
        }, ws = Rt.prototype;
        ws.__clone = function() {
          let t = new Rt(), e = Object.keys(this);
          for (let s = 0, r = e.length; s < r; s++) {
            let i = e[s];
            i !== "leadingComments" && i !== "trailingComments" && i !== "innerComments" && (t[i] = this[i]);
          }
          return t;
        };
        function wn(t) {
          return He(t);
        }
        function He(t) {
          let { type: e, start: s, end: r, loc: i, range: a, extra: n, name: o } = t, l = Object.create(ws);
          return l.type = e, l.start = s, l.end = r, l.loc = i, l.range = a, l.extra = n, l.name = o, e === "Placeholder" && (l.expectedNode = t.expectedNode), l;
        }
        function vn(t) {
          let { type: e, start: s, end: r, loc: i, range: a, extra: n } = t;
          if (e === "Placeholder")
            return wn(t);
          let o = Object.create(ws);
          return o.type = e, o.start = s, o.end = r, o.loc = i, o.range = a, t.raw !== void 0 ? o.raw = t.raw : o.extra = n, o.value = t.value, o;
        }
        var Sn = class extends Cn {
          startNode() {
            return new Rt(this, this.state.start, this.state.startLoc);
          }
          startNodeAt(t, e) {
            return new Rt(this, t, e);
          }
          startNodeAtNode(t) {
            return this.startNodeAt(t.start, t.loc.start);
          }
          finishNode(t, e) {
            return this.finishNodeAt(t, e, this.state.lastTokEndLoc);
          }
          finishNodeAt(t, e, s) {
            return t.type = e, t.end = s.index, t.loc.end = s, this.options.ranges && (t.range[1] = s.index), this.options.attachComment && this.processComment(t), t;
          }
          resetStartLocation(t, e, s) {
            t.start = e, t.loc.start = s, this.options.ranges && (t.range[0] = e);
          }
          resetEndLocation(t) {
            let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.state.lastTokEndLoc;
            t.end = e.index, t.loc.end = e, this.options.ranges && (t.range[1] = e.index);
          }
          resetStartLocationFromNode(t, e) {
            this.resetStartLocation(t, e.start, e.loc.start);
          }
        }, Nn = /* @__PURE__ */ new Set(["_", "any", "bool", "boolean", "empty", "extends", "false", "interface", "mixed", "null", "number", "static", "string", "true", "typeof", "void"]), V = Z(d || (d = T(["flow"])))((t) => ({ AmbiguousConditionalArrow: t("Ambiguous expression: wrap the arrow functions in parentheses to disambiguate."), AmbiguousDeclareModuleKind: t("Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module."), AssignReservedType: t((e) => {
          let { reservedType: s } = e;
          return "Cannot overwrite reserved type ".concat(s, ".");
        }), DeclareClassElement: t("The `declare` modifier can only appear on class fields."), DeclareClassFieldInitializer: t("Initializers are not allowed in fields with the `declare` modifier."), DuplicateDeclareModuleExports: t("Duplicate `declare module.exports` statement."), EnumBooleanMemberNotInitialized: t((e) => {
          let { memberName: s, enumName: r } = e;
          return "Boolean enum members need to be initialized. Use either `".concat(s, " = true,` or `").concat(s, " = false,` in enum `").concat(r, "`.");
        }), EnumDuplicateMemberName: t((e) => {
          let { memberName: s, enumName: r } = e;
          return "Enum member names need to be unique, but the name `".concat(s, "` has already been used before in enum `").concat(r, "`.");
        }), EnumInconsistentMemberValues: t((e) => {
          let { enumName: s } = e;
          return "Enum `".concat(s, "` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.");
        }), EnumInvalidExplicitType: t((e) => {
          let { invalidEnumType: s, enumName: r } = e;
          return "Enum type `".concat(s, "` is not valid. Use one of `boolean`, `number`, `string`, or `symbol` in enum `").concat(r, "`.");
        }), EnumInvalidExplicitTypeUnknownSupplied: t((e) => {
          let { enumName: s } = e;
          return "Supplied enum type is not valid. Use one of `boolean`, `number`, `string`, or `symbol` in enum `".concat(s, "`.");
        }), EnumInvalidMemberInitializerPrimaryType: t((e) => {
          let { enumName: s, memberName: r, explicitType: i } = e;
          return "Enum `".concat(s, "` has type `").concat(i, "`, so the initializer of `").concat(r, "` needs to be a ").concat(i, " literal.");
        }), EnumInvalidMemberInitializerSymbolType: t((e) => {
          let { enumName: s, memberName: r } = e;
          return "Symbol enum members cannot be initialized. Use `".concat(r, ",` in enum `").concat(s, "`.");
        }), EnumInvalidMemberInitializerUnknownType: t((e) => {
          let { enumName: s, memberName: r } = e;
          return "The enum member initializer for `".concat(r, "` needs to be a literal (either a boolean, number, or string) in enum `").concat(s, "`.");
        }), EnumInvalidMemberName: t((e) => {
          let { enumName: s, memberName: r, suggestion: i } = e;
          return "Enum member names cannot start with lowercase 'a' through 'z'. Instead of using `".concat(r, "`, consider using `").concat(i, "`, in enum `").concat(s, "`.");
        }), EnumNumberMemberNotInitialized: t((e) => {
          let { enumName: s, memberName: r } = e;
          return "Number enum members need to be initialized, e.g. `".concat(r, " = 1` in enum `").concat(s, "`.");
        }), EnumStringMemberInconsistentlyInitailized: t((e) => {
          let { enumName: s } = e;
          return "String enum members need to consistently either all use initializers, or use no initializers, in enum `".concat(s, "`.");
        }), GetterMayNotHaveThisParam: t("A getter cannot have a `this` parameter."), ImportTypeShorthandOnlyInPureImport: t("The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements."), InexactInsideExact: t("Explicit inexact syntax cannot appear inside an explicit exact object type."), InexactInsideNonObject: t("Explicit inexact syntax cannot appear in class or interface definitions."), InexactVariance: t("Explicit inexact syntax cannot have variance."), InvalidNonTypeImportInDeclareModule: t("Imports within a `declare module` body must always be `import type` or `import typeof`."), MissingTypeParamDefault: t("Type parameter declaration needs a default, since a preceding type parameter declaration has a default."), NestedDeclareModule: t("`declare module` cannot be used inside another `declare module`."), NestedFlowComment: t("Cannot have a flow comment inside another flow comment."), PatternIsOptional: t("A binding pattern parameter cannot be optional in an implementation signature.", { reasonCode: "OptionalBindingPattern" }), SetterMayNotHaveThisParam: t("A setter cannot have a `this` parameter."), SpreadVariance: t("Spread properties cannot have variance."), ThisParamAnnotationRequired: t("A type annotation is required for the `this` parameter."), ThisParamBannedInConstructor: t("Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions."), ThisParamMayNotBeOptional: t("The `this` parameter cannot be optional."), ThisParamMustBeFirst: t("The `this` parameter must be the first function parameter."), ThisParamNoDefault: t("The `this` parameter may not have a default value."), TypeBeforeInitializer: t("Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`."), TypeCastInPattern: t("The type cast expression is expected to be wrapped with parenthesis."), UnexpectedExplicitInexactInObject: t("Explicit inexact syntax must appear at the end of an inexact object."), UnexpectedReservedType: t((e) => {
          let { reservedType: s } = e;
          return "Unexpected reserved type ".concat(s, ".");
        }), UnexpectedReservedUnderscore: t("`_` is only allowed as a type argument to call or new."), UnexpectedSpaceBetweenModuloChecks: t("Spaces between `%` and `checks` are not allowed here."), UnexpectedSpreadType: t("Spread operator cannot appear in class or interface definitions."), UnexpectedSubtractionOperand: t('Unexpected token, expected "number" or "bigint".'), UnexpectedTokenAfterTypeParameter: t("Expected an arrow function after this type parameter declaration."), UnexpectedTypeParameterBeforeAsyncArrowFunction: t("Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`."), UnsupportedDeclareExportKind: t((e) => {
          let { unsupportedExportKind: s, suggestion: r } = e;
          return "`declare export ".concat(s, "` is not supported. Use `").concat(r, "` instead.");
        }), UnsupportedStatementInDeclareModule: t("Only declares and type imports are allowed inside declare module."), UnterminatedFlowComment: t("Unterminated flow-comment.") }));
        function In(t) {
          return t.type === "DeclareExportAllDeclaration" || t.type === "DeclareExportDeclaration" && (!t.declaration || t.declaration.type !== "TypeAlias" && t.declaration.type !== "InterfaceDeclaration");
        }
        function vs(t) {
          return t.importKind === "type" || t.importKind === "typeof";
        }
        function Kr(t) {
          return Oe(t) && t !== 97;
        }
        var kn = { const: "declare export var", let: "declare export var", type: "export type", interface: "export interface" };
        function Dn(t, e) {
          let s = [], r = [];
          for (let i = 0; i < t.length; i++)
            (e(t[i], i, t) ? s : r).push(t[i]);
          return [s, r];
        }
        var Fn = /\*?\s*@((?:no)?flow)\b/, Ln = (t) => class extends t {
          constructor() {
            super(...arguments), this.flowPragma = void 0;
          }
          getScopeHandler() {
            return fn;
          }
          shouldParseTypes() {
            return this.getPluginOption("flow", "all") || this.flowPragma === "flow";
          }
          shouldParseEnums() {
            return !!this.getPluginOption("flow", "enums");
          }
          finishToken(e, s) {
            return e !== 129 && e !== 13 && e !== 28 && this.flowPragma === void 0 && (this.flowPragma = null), super.finishToken(e, s);
          }
          addComment(e) {
            if (this.flowPragma === void 0) {
              let s = Fn.exec(e.value);
              if (s)
                if (s[1] === "flow")
                  this.flowPragma = "flow";
                else if (s[1] === "noflow")
                  this.flowPragma = "noflow";
                else
                  throw new Error("Unexpected flow pragma");
            }
            return super.addComment(e);
          }
          flowParseTypeInitialiser(e) {
            let s = this.state.inType;
            this.state.inType = !0, this.expect(e || 14);
            let r = this.flowParseType();
            return this.state.inType = s, r;
          }
          flowParsePredicate() {
            let e = this.startNode(), s = this.state.startLoc;
            return this.next(), this.expectContextual(107), this.state.lastTokStart > s.index + 1 && this.raise(V.UnexpectedSpaceBetweenModuloChecks, { at: s }), this.eat(10) ? (e.value = this.parseExpression(), this.expect(11), this.finishNode(e, "DeclaredPredicate")) : this.finishNode(e, "InferredPredicate");
          }
          flowParseTypeAndPredicateInitialiser() {
            let e = this.state.inType;
            this.state.inType = !0, this.expect(14);
            let s = null, r = null;
            return this.match(54) ? (this.state.inType = e, r = this.flowParsePredicate()) : (s = this.flowParseType(), this.state.inType = e, this.match(54) && (r = this.flowParsePredicate())), [s, r];
          }
          flowParseDeclareClass(e) {
            return this.next(), this.flowParseInterfaceish(e, !0), this.finishNode(e, "DeclareClass");
          }
          flowParseDeclareFunction(e) {
            this.next();
            let s = e.id = this.parseIdentifier(), r = this.startNode(), i = this.startNode();
            this.match(47) ? r.typeParameters = this.flowParseTypeParameterDeclaration() : r.typeParameters = null, this.expect(10);
            let a = this.flowParseFunctionTypeParams();
            return r.params = a.params, r.rest = a.rest, r.this = a._this, this.expect(11), [r.returnType, e.predicate] = this.flowParseTypeAndPredicateInitialiser(), i.typeAnnotation = this.finishNode(r, "FunctionTypeAnnotation"), s.typeAnnotation = this.finishNode(i, "TypeAnnotation"), this.resetEndLocation(s), this.semicolon(), this.scope.declareName(e.id.name, $a, e.id.loc.start), this.finishNode(e, "DeclareFunction");
          }
          flowParseDeclare(e, s) {
            if (this.match(80))
              return this.flowParseDeclareClass(e);
            if (this.match(68))
              return this.flowParseDeclareFunction(e);
            if (this.match(74))
              return this.flowParseDeclareVariable(e);
            if (this.eatContextual(123))
              return this.match(16) ? this.flowParseDeclareModuleExports(e) : (s && this.raise(V.NestedDeclareModule, { at: this.state.lastTokStartLoc }), this.flowParseDeclareModule(e));
            if (this.isContextual(126))
              return this.flowParseDeclareTypeAlias(e);
            if (this.isContextual(127))
              return this.flowParseDeclareOpaqueType(e);
            if (this.isContextual(125))
              return this.flowParseDeclareInterface(e);
            if (this.match(82))
              return this.flowParseDeclareExportDeclaration(e, s);
            throw this.unexpected();
          }
          flowParseDeclareVariable(e) {
            return this.next(), e.id = this.flowParseTypeAnnotatableIdentifier(!0), this.scope.declareName(e.id.name, kt, e.id.loc.start), this.semicolon(), this.finishNode(e, "DeclareVariable");
          }
          flowParseDeclareModule(e) {
            this.scope.enter(rt), this.match(129) ? e.id = this.parseExprAtom() : e.id = this.parseIdentifier();
            let s = e.body = this.startNode(), r = s.body = [];
            for (this.expect(5); !this.match(8); ) {
              let n = this.startNode();
              this.match(83) ? (this.next(), !this.isContextual(126) && !this.match(87) && this.raise(V.InvalidNonTypeImportInDeclareModule, { at: this.state.lastTokStartLoc }), this.parseImport(n)) : (this.expectContextual(121, V.UnsupportedStatementInDeclareModule), n = this.flowParseDeclare(n, !0)), r.push(n);
            }
            this.scope.exit(), this.expect(8), this.finishNode(s, "BlockStatement");
            let i = null, a = !1;
            return r.forEach((n) => {
              In(n) ? (i === "CommonJS" && this.raise(V.AmbiguousDeclareModuleKind, { at: n }), i = "ES") : n.type === "DeclareModuleExports" && (a && this.raise(V.DuplicateDeclareModuleExports, { at: n }), i === "ES" && this.raise(V.AmbiguousDeclareModuleKind, { at: n }), i = "CommonJS", a = !0);
            }), e.kind = i || "CommonJS", this.finishNode(e, "DeclareModule");
          }
          flowParseDeclareExportDeclaration(e, s) {
            if (this.expect(82), this.eat(65))
              return this.match(68) || this.match(80) ? e.declaration = this.flowParseDeclare(this.startNode()) : (e.declaration = this.flowParseType(), this.semicolon()), e.default = !0, this.finishNode(e, "DeclareExportDeclaration");
            if (this.match(75) || this.isLet() || (this.isContextual(126) || this.isContextual(125)) && !s) {
              let r = this.state.value;
              throw this.raise(V.UnsupportedDeclareExportKind, { at: this.state.startLoc, unsupportedExportKind: r, suggestion: kn[r] });
            }
            if (this.match(74) || this.match(68) || this.match(80) || this.isContextual(127))
              return e.declaration = this.flowParseDeclare(this.startNode()), e.default = !1, this.finishNode(e, "DeclareExportDeclaration");
            if (this.match(55) || this.match(5) || this.isContextual(125) || this.isContextual(126) || this.isContextual(127))
              return e = this.parseExport(e), e.type === "ExportNamedDeclaration" && (e.type = "ExportDeclaration", e.default = !1, delete e.exportKind), e.type = "Declare" + e.type, e;
            throw this.unexpected();
          }
          flowParseDeclareModuleExports(e) {
            return this.next(), this.expectContextual(108), e.typeAnnotation = this.flowParseTypeAnnotation(), this.semicolon(), this.finishNode(e, "DeclareModuleExports");
          }
          flowParseDeclareTypeAlias(e) {
            return this.next(), this.flowParseTypeAlias(e), e.type = "DeclareTypeAlias", e;
          }
          flowParseDeclareOpaqueType(e) {
            return this.next(), this.flowParseOpaqueType(e, !0), e.type = "DeclareOpaqueType", e;
          }
          flowParseDeclareInterface(e) {
            return this.next(), this.flowParseInterfaceish(e), this.finishNode(e, "DeclareInterface");
          }
          flowParseInterfaceish(e) {
            let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
            if (e.id = this.flowParseRestrictedIdentifier(!s, !0), this.scope.declareName(e.id.name, s ? Fr : ze, e.id.loc.start), this.match(47) ? e.typeParameters = this.flowParseTypeParameterDeclaration() : e.typeParameters = null, e.extends = [], e.implements = [], e.mixins = [], this.eat(81))
              do
                e.extends.push(this.flowParseInterfaceExtends());
              while (!s && this.eat(12));
            if (this.isContextual(114)) {
              this.next();
              do
                e.mixins.push(this.flowParseInterfaceExtends());
              while (this.eat(12));
            }
            if (this.isContextual(110)) {
              this.next();
              do
                e.implements.push(this.flowParseInterfaceExtends());
              while (this.eat(12));
            }
            e.body = this.flowParseObjectType({ allowStatic: s, allowExact: !1, allowSpread: !1, allowProto: s, allowInexact: !1 });
          }
          flowParseInterfaceExtends() {
            let e = this.startNode();
            return e.id = this.flowParseQualifiedTypeIdentifier(), this.match(47) ? e.typeParameters = this.flowParseTypeParameterInstantiation() : e.typeParameters = null, this.finishNode(e, "InterfaceExtends");
          }
          flowParseInterface(e) {
            return this.flowParseInterfaceish(e), this.finishNode(e, "InterfaceDeclaration");
          }
          checkNotUnderscore(e) {
            e === "_" && this.raise(V.UnexpectedReservedUnderscore, { at: this.state.startLoc });
          }
          checkReservedType(e, s, r) {
            !Nn.has(e) || this.raise(r ? V.AssignReservedType : V.UnexpectedReservedType, { at: s, reservedType: e });
          }
          flowParseRestrictedIdentifier(e, s) {
            return this.checkReservedType(this.state.value, this.state.startLoc, s), this.parseIdentifier(e);
          }
          flowParseTypeAlias(e) {
            return e.id = this.flowParseRestrictedIdentifier(!1, !0), this.scope.declareName(e.id.name, ze, e.id.loc.start), this.match(47) ? e.typeParameters = this.flowParseTypeParameterDeclaration() : e.typeParameters = null, e.right = this.flowParseTypeInitialiser(29), this.semicolon(), this.finishNode(e, "TypeAlias");
          }
          flowParseOpaqueType(e, s) {
            return this.expectContextual(126), e.id = this.flowParseRestrictedIdentifier(!0, !0), this.scope.declareName(e.id.name, ze, e.id.loc.start), this.match(47) ? e.typeParameters = this.flowParseTypeParameterDeclaration() : e.typeParameters = null, e.supertype = null, this.match(14) && (e.supertype = this.flowParseTypeInitialiser(14)), e.impltype = null, s || (e.impltype = this.flowParseTypeInitialiser(29)), this.semicolon(), this.finishNode(e, "OpaqueType");
          }
          flowParseTypeParameter() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, s = this.state.startLoc, r = this.startNode(), i = this.flowParseVariance(), a = this.flowParseTypeAnnotatableIdentifier();
            return r.name = a.name, r.variance = i, r.bound = a.typeAnnotation, this.match(29) ? (this.eat(29), r.default = this.flowParseType()) : e && this.raise(V.MissingTypeParamDefault, { at: s }), this.finishNode(r, "TypeParameter");
          }
          flowParseTypeParameterDeclaration() {
            let e = this.state.inType, s = this.startNode();
            s.params = [], this.state.inType = !0, this.match(47) || this.match(138) ? this.next() : this.unexpected();
            let r = !1;
            do {
              let i = this.flowParseTypeParameter(r);
              s.params.push(i), i.default && (r = !0), this.match(48) || this.expect(12);
            } while (!this.match(48));
            return this.expect(48), this.state.inType = e, this.finishNode(s, "TypeParameterDeclaration");
          }
          flowParseTypeParameterInstantiation() {
            let e = this.startNode(), s = this.state.inType;
            e.params = [], this.state.inType = !0, this.expect(47);
            let r = this.state.noAnonFunctionType;
            for (this.state.noAnonFunctionType = !1; !this.match(48); )
              e.params.push(this.flowParseType()), this.match(48) || this.expect(12);
            return this.state.noAnonFunctionType = r, this.expect(48), this.state.inType = s, this.finishNode(e, "TypeParameterInstantiation");
          }
          flowParseTypeParameterInstantiationCallOrNew() {
            let e = this.startNode(), s = this.state.inType;
            for (e.params = [], this.state.inType = !0, this.expect(47); !this.match(48); )
              e.params.push(this.flowParseTypeOrImplicitInstantiation()), this.match(48) || this.expect(12);
            return this.expect(48), this.state.inType = s, this.finishNode(e, "TypeParameterInstantiation");
          }
          flowParseInterfaceType() {
            let e = this.startNode();
            if (this.expectContextual(125), e.extends = [], this.eat(81))
              do
                e.extends.push(this.flowParseInterfaceExtends());
              while (this.eat(12));
            return e.body = this.flowParseObjectType({ allowStatic: !1, allowExact: !1, allowSpread: !1, allowProto: !1, allowInexact: !1 }), this.finishNode(e, "InterfaceTypeAnnotation");
          }
          flowParseObjectPropertyKey() {
            return this.match(130) || this.match(129) ? this.parseExprAtom() : this.parseIdentifier(!0);
          }
          flowParseObjectTypeIndexer(e, s, r) {
            return e.static = s, this.lookahead().type === 14 ? (e.id = this.flowParseObjectPropertyKey(), e.key = this.flowParseTypeInitialiser()) : (e.id = null, e.key = this.flowParseType()), this.expect(3), e.value = this.flowParseTypeInitialiser(), e.variance = r, this.finishNode(e, "ObjectTypeIndexer");
          }
          flowParseObjectTypeInternalSlot(e, s) {
            return e.static = s, e.id = this.flowParseObjectPropertyKey(), this.expect(3), this.expect(3), this.match(47) || this.match(10) ? (e.method = !0, e.optional = !1, e.value = this.flowParseObjectTypeMethodish(this.startNodeAt(e.start, e.loc.start))) : (e.method = !1, this.eat(17) && (e.optional = !0), e.value = this.flowParseTypeInitialiser()), this.finishNode(e, "ObjectTypeInternalSlot");
          }
          flowParseObjectTypeMethodish(e) {
            for (e.params = [], e.rest = null, e.typeParameters = null, e.this = null, this.match(47) && (e.typeParameters = this.flowParseTypeParameterDeclaration()), this.expect(10), this.match(78) && (e.this = this.flowParseFunctionTypeParam(!0), e.this.name = null, this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); )
              e.params.push(this.flowParseFunctionTypeParam(!1)), this.match(11) || this.expect(12);
            return this.eat(21) && (e.rest = this.flowParseFunctionTypeParam(!1)), this.expect(11), e.returnType = this.flowParseTypeInitialiser(), this.finishNode(e, "FunctionTypeAnnotation");
          }
          flowParseObjectTypeCallProperty(e, s) {
            let r = this.startNode();
            return e.static = s, e.value = this.flowParseObjectTypeMethodish(r), this.finishNode(e, "ObjectTypeCallProperty");
          }
          flowParseObjectType(e) {
            let { allowStatic: s, allowExact: r, allowSpread: i, allowProto: a, allowInexact: n } = e, o = this.state.inType;
            this.state.inType = !0;
            let l = this.startNode();
            l.callProperties = [], l.properties = [], l.indexers = [], l.internalSlots = [];
            let p, y, S = !1;
            for (r && this.match(6) ? (this.expect(6), p = 9, y = !0) : (this.expect(5), p = 8, y = !1), l.exact = y; !this.match(p); ) {
              let z = !1, $ = null, ae = null, fe = this.startNode();
              if (a && this.isContextual(115)) {
                let Ne = this.lookahead();
                Ne.type !== 14 && Ne.type !== 17 && (this.next(), $ = this.state.startLoc, s = !1);
              }
              if (s && this.isContextual(104)) {
                let Ne = this.lookahead();
                Ne.type !== 14 && Ne.type !== 17 && (this.next(), z = !0);
              }
              let we = this.flowParseVariance();
              if (this.eat(0))
                $ != null && this.unexpected($), this.eat(0) ? (we && this.unexpected(we.loc.start), l.internalSlots.push(this.flowParseObjectTypeInternalSlot(fe, z))) : l.indexers.push(this.flowParseObjectTypeIndexer(fe, z, we));
              else if (this.match(10) || this.match(47))
                $ != null && this.unexpected($), we && this.unexpected(we.loc.start), l.callProperties.push(this.flowParseObjectTypeCallProperty(fe, z));
              else {
                let Ne = "init";
                if (this.isContextual(98) || this.isContextual(103)) {
                  let Fe = this.lookahead();
                  Ar(Fe.type) && (Ne = this.state.value, this.next());
                }
                let gt = this.flowParseObjectTypeProperty(fe, z, $, we, Ne, i, n != null ? n : !y);
                gt === null ? (S = !0, ae = this.state.lastTokStartLoc) : l.properties.push(gt);
              }
              this.flowObjectTypeSemicolon(), ae && !this.match(8) && !this.match(9) && this.raise(V.UnexpectedExplicitInexactInObject, { at: ae });
            }
            this.expect(p), i && (l.inexact = S);
            let B = this.finishNode(l, "ObjectTypeAnnotation");
            return this.state.inType = o, B;
          }
          flowParseObjectTypeProperty(e, s, r, i, a, n, o) {
            if (this.eat(21))
              return this.match(12) || this.match(13) || this.match(8) || this.match(9) ? (n ? o || this.raise(V.InexactInsideExact, { at: this.state.lastTokStartLoc }) : this.raise(V.InexactInsideNonObject, { at: this.state.lastTokStartLoc }), i && this.raise(V.InexactVariance, { at: i }), null) : (n || this.raise(V.UnexpectedSpreadType, { at: this.state.lastTokStartLoc }), r != null && this.unexpected(r), i && this.raise(V.SpreadVariance, { at: i }), e.argument = this.flowParseType(), this.finishNode(e, "ObjectTypeSpreadProperty"));
            {
              e.key = this.flowParseObjectPropertyKey(), e.static = s, e.proto = r != null, e.kind = a;
              let l = !1;
              return this.match(47) || this.match(10) ? (e.method = !0, r != null && this.unexpected(r), i && this.unexpected(i.loc.start), e.value = this.flowParseObjectTypeMethodish(this.startNodeAt(e.start, e.loc.start)), (a === "get" || a === "set") && this.flowCheckGetterSetterParams(e), !n && e.key.name === "constructor" && e.value.this && this.raise(V.ThisParamBannedInConstructor, { at: e.value.this })) : (a !== "init" && this.unexpected(), e.method = !1, this.eat(17) && (l = !0), e.value = this.flowParseTypeInitialiser(), e.variance = i), e.optional = l, this.finishNode(e, "ObjectTypeProperty");
            }
          }
          flowCheckGetterSetterParams(e) {
            let s = e.kind === "get" ? 0 : 1, r = e.value.params.length + (e.value.rest ? 1 : 0);
            e.value.this && this.raise(e.kind === "get" ? V.GetterMayNotHaveThisParam : V.SetterMayNotHaveThisParam, { at: e.value.this }), r !== s && this.raise(e.kind === "get" ? h.BadGetterArity : h.BadSetterArity, { at: e }), e.kind === "set" && e.value.rest && this.raise(h.BadSetterRestParameter, { at: e });
          }
          flowObjectTypeSemicolon() {
            !this.eat(13) && !this.eat(12) && !this.match(8) && !this.match(9) && this.unexpected();
          }
          flowParseQualifiedTypeIdentifier(e, s, r) {
            e = e || this.state.start, s = s || this.state.startLoc;
            let i = r || this.flowParseRestrictedIdentifier(!0);
            for (; this.eat(16); ) {
              let a = this.startNodeAt(e, s);
              a.qualification = i, a.id = this.flowParseRestrictedIdentifier(!0), i = this.finishNode(a, "QualifiedTypeIdentifier");
            }
            return i;
          }
          flowParseGenericType(e, s, r) {
            let i = this.startNodeAt(e, s);
            return i.typeParameters = null, i.id = this.flowParseQualifiedTypeIdentifier(e, s, r), this.match(47) && (i.typeParameters = this.flowParseTypeParameterInstantiation()), this.finishNode(i, "GenericTypeAnnotation");
          }
          flowParseTypeofType() {
            let e = this.startNode();
            return this.expect(87), e.argument = this.flowParsePrimaryType(), this.finishNode(e, "TypeofTypeAnnotation");
          }
          flowParseTupleType() {
            let e = this.startNode();
            for (e.types = [], this.expect(0); this.state.pos < this.length && !this.match(3) && (e.types.push(this.flowParseType()), !this.match(3)); )
              this.expect(12);
            return this.expect(3), this.finishNode(e, "TupleTypeAnnotation");
          }
          flowParseFunctionTypeParam(e) {
            let s = null, r = !1, i = null, a = this.startNode(), n = this.lookahead(), o = this.state.type === 78;
            return n.type === 14 || n.type === 17 ? (o && !e && this.raise(V.ThisParamMustBeFirst, { at: a }), s = this.parseIdentifier(o), this.eat(17) && (r = !0, o && this.raise(V.ThisParamMayNotBeOptional, { at: a })), i = this.flowParseTypeInitialiser()) : i = this.flowParseType(), a.name = s, a.optional = r, a.typeAnnotation = i, this.finishNode(a, "FunctionTypeParam");
          }
          reinterpretTypeAsFunctionTypeParam(e) {
            let s = this.startNodeAt(e.start, e.loc.start);
            return s.name = null, s.optional = !1, s.typeAnnotation = e, this.finishNode(s, "FunctionTypeParam");
          }
          flowParseFunctionTypeParams() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = null, r = null;
            for (this.match(78) && (r = this.flowParseFunctionTypeParam(!0), r.name = null, this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); )
              e.push(this.flowParseFunctionTypeParam(!1)), this.match(11) || this.expect(12);
            return this.eat(21) && (s = this.flowParseFunctionTypeParam(!1)), { params: e, rest: s, _this: r };
          }
          flowIdentToTypeAnnotation(e, s, r, i) {
            switch (i.name) {
              case "any":
                return this.finishNode(r, "AnyTypeAnnotation");
              case "bool":
              case "boolean":
                return this.finishNode(r, "BooleanTypeAnnotation");
              case "mixed":
                return this.finishNode(r, "MixedTypeAnnotation");
              case "empty":
                return this.finishNode(r, "EmptyTypeAnnotation");
              case "number":
                return this.finishNode(r, "NumberTypeAnnotation");
              case "string":
                return this.finishNode(r, "StringTypeAnnotation");
              case "symbol":
                return this.finishNode(r, "SymbolTypeAnnotation");
              default:
                return this.checkNotUnderscore(i.name), this.flowParseGenericType(e, s, i);
            }
          }
          flowParsePrimaryType() {
            let e = this.state.start, s = this.state.startLoc, r = this.startNode(), i, a, n = !1, o = this.state.noAnonFunctionType;
            switch (this.state.type) {
              case 5:
                return this.flowParseObjectType({ allowStatic: !1, allowExact: !1, allowSpread: !0, allowProto: !1, allowInexact: !0 });
              case 6:
                return this.flowParseObjectType({ allowStatic: !1, allowExact: !0, allowSpread: !0, allowProto: !1, allowInexact: !1 });
              case 0:
                return this.state.noAnonFunctionType = !1, a = this.flowParseTupleType(), this.state.noAnonFunctionType = o, a;
              case 47:
                return r.typeParameters = this.flowParseTypeParameterDeclaration(), this.expect(10), i = this.flowParseFunctionTypeParams(), r.params = i.params, r.rest = i.rest, r.this = i._this, this.expect(11), this.expect(19), r.returnType = this.flowParseType(), this.finishNode(r, "FunctionTypeAnnotation");
              case 10:
                if (this.next(), !this.match(11) && !this.match(21))
                  if (oe(this.state.type) || this.match(78)) {
                    let l = this.lookahead().type;
                    n = l !== 17 && l !== 14;
                  } else
                    n = !0;
                if (n) {
                  if (this.state.noAnonFunctionType = !1, a = this.flowParseType(), this.state.noAnonFunctionType = o, this.state.noAnonFunctionType || !(this.match(12) || this.match(11) && this.lookahead().type === 19))
                    return this.expect(11), a;
                  this.eat(12);
                }
                return a ? i = this.flowParseFunctionTypeParams([this.reinterpretTypeAsFunctionTypeParam(a)]) : i = this.flowParseFunctionTypeParams(), r.params = i.params, r.rest = i.rest, r.this = i._this, this.expect(11), this.expect(19), r.returnType = this.flowParseType(), r.typeParameters = null, this.finishNode(r, "FunctionTypeAnnotation");
              case 129:
                return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");
              case 85:
              case 86:
                return r.value = this.match(85), this.next(), this.finishNode(r, "BooleanLiteralTypeAnnotation");
              case 53:
                if (this.state.value === "-") {
                  if (this.next(), this.match(130))
                    return this.parseLiteralAtNode(-this.state.value, "NumberLiteralTypeAnnotation", r);
                  if (this.match(131))
                    return this.parseLiteralAtNode(-this.state.value, "BigIntLiteralTypeAnnotation", r);
                  throw this.raise(V.UnexpectedSubtractionOperand, { at: this.state.startLoc });
                }
                throw this.unexpected();
              case 130:
                return this.parseLiteral(this.state.value, "NumberLiteralTypeAnnotation");
              case 131:
                return this.parseLiteral(this.state.value, "BigIntLiteralTypeAnnotation");
              case 88:
                return this.next(), this.finishNode(r, "VoidTypeAnnotation");
              case 84:
                return this.next(), this.finishNode(r, "NullLiteralTypeAnnotation");
              case 78:
                return this.next(), this.finishNode(r, "ThisTypeAnnotation");
              case 55:
                return this.next(), this.finishNode(r, "ExistsTypeAnnotation");
              case 87:
                return this.flowParseTypeofType();
              default:
                if (ns(this.state.type)) {
                  let l = Ve(this.state.type);
                  return this.next(), super.createIdentifier(r, l);
                } else if (oe(this.state.type))
                  return this.isContextual(125) ? this.flowParseInterfaceType() : this.flowIdentToTypeAnnotation(e, s, r, this.parseIdentifier());
            }
            throw this.unexpected();
          }
          flowParsePostfixType() {
            let e = this.state.start, s = this.state.startLoc, r = this.flowParsePrimaryType(), i = !1;
            for (; (this.match(0) || this.match(18)) && !this.canInsertSemicolon(); ) {
              let a = this.startNodeAt(e, s), n = this.eat(18);
              i = i || n, this.expect(0), !n && this.match(3) ? (a.elementType = r, this.next(), r = this.finishNode(a, "ArrayTypeAnnotation")) : (a.objectType = r, a.indexType = this.flowParseType(), this.expect(3), i ? (a.optional = n, r = this.finishNode(a, "OptionalIndexedAccessType")) : r = this.finishNode(a, "IndexedAccessType"));
            }
            return r;
          }
          flowParsePrefixType() {
            let e = this.startNode();
            return this.eat(17) ? (e.typeAnnotation = this.flowParsePrefixType(), this.finishNode(e, "NullableTypeAnnotation")) : this.flowParsePostfixType();
          }
          flowParseAnonFunctionWithoutParens() {
            let e = this.flowParsePrefixType();
            if (!this.state.noAnonFunctionType && this.eat(19)) {
              let s = this.startNodeAt(e.start, e.loc.start);
              return s.params = [this.reinterpretTypeAsFunctionTypeParam(e)], s.rest = null, s.this = null, s.returnType = this.flowParseType(), s.typeParameters = null, this.finishNode(s, "FunctionTypeAnnotation");
            }
            return e;
          }
          flowParseIntersectionType() {
            let e = this.startNode();
            this.eat(45);
            let s = this.flowParseAnonFunctionWithoutParens();
            for (e.types = [s]; this.eat(45); )
              e.types.push(this.flowParseAnonFunctionWithoutParens());
            return e.types.length === 1 ? s : this.finishNode(e, "IntersectionTypeAnnotation");
          }
          flowParseUnionType() {
            let e = this.startNode();
            this.eat(43);
            let s = this.flowParseIntersectionType();
            for (e.types = [s]; this.eat(43); )
              e.types.push(this.flowParseIntersectionType());
            return e.types.length === 1 ? s : this.finishNode(e, "UnionTypeAnnotation");
          }
          flowParseType() {
            let e = this.state.inType;
            this.state.inType = !0;
            let s = this.flowParseUnionType();
            return this.state.inType = e, s;
          }
          flowParseTypeOrImplicitInstantiation() {
            if (this.state.type === 128 && this.state.value === "_") {
              let e = this.state.start, s = this.state.startLoc, r = this.parseIdentifier();
              return this.flowParseGenericType(e, s, r);
            } else
              return this.flowParseType();
          }
          flowParseTypeAnnotation() {
            let e = this.startNode();
            return e.typeAnnotation = this.flowParseTypeInitialiser(), this.finishNode(e, "TypeAnnotation");
          }
          flowParseTypeAnnotatableIdentifier(e) {
            let s = e ? this.parseIdentifier() : this.flowParseRestrictedIdentifier();
            return this.match(14) && (s.typeAnnotation = this.flowParseTypeAnnotation(), this.resetEndLocation(s)), s;
          }
          typeCastToParameter(e) {
            return e.expression.typeAnnotation = e.typeAnnotation, this.resetEndLocation(e.expression, e.typeAnnotation.loc.end), e.expression;
          }
          flowParseVariance() {
            let e = null;
            return this.match(53) && (e = this.startNode(), this.state.value === "+" ? e.kind = "plus" : e.kind = "minus", this.next(), this.finishNode(e, "Variance")), e;
          }
          parseFunctionBody(e, s) {
            let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            return s ? this.forwardNoArrowParamsConversionAt(e, () => super.parseFunctionBody(e, !0, r)) : super.parseFunctionBody(e, !1, r);
          }
          parseFunctionBodyAndFinish(e, s) {
            let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            if (this.match(14)) {
              let i = this.startNode();
              [i.typeAnnotation, e.predicate] = this.flowParseTypeAndPredicateInitialiser(), e.returnType = i.typeAnnotation ? this.finishNode(i, "TypeAnnotation") : null;
            }
            super.parseFunctionBodyAndFinish(e, s, r);
          }
          parseStatement(e, s) {
            if (this.state.strict && this.isContextual(125)) {
              let i = this.lookahead();
              if (Oe(i.type)) {
                let a = this.startNode();
                return this.next(), this.flowParseInterface(a);
              }
            } else if (this.shouldParseEnums() && this.isContextual(122)) {
              let i = this.startNode();
              return this.next(), this.flowParseEnumDeclaration(i);
            }
            let r = super.parseStatement(e, s);
            return this.flowPragma === void 0 && !this.isValidDirective(r) && (this.flowPragma = null), r;
          }
          parseExpressionStatement(e, s) {
            if (s.type === "Identifier") {
              if (s.name === "declare") {
                if (this.match(80) || oe(this.state.type) || this.match(68) || this.match(74) || this.match(82))
                  return this.flowParseDeclare(e);
              } else if (oe(this.state.type)) {
                if (s.name === "interface")
                  return this.flowParseInterface(e);
                if (s.name === "type")
                  return this.flowParseTypeAlias(e);
                if (s.name === "opaque")
                  return this.flowParseOpaqueType(e, !1);
              }
            }
            return super.parseExpressionStatement(e, s);
          }
          shouldParseExportDeclaration() {
            let { type: e } = this.state;
            return Pr(e) || this.shouldParseEnums() && e === 122 ? !this.state.containsEsc : super.shouldParseExportDeclaration();
          }
          isExportDefaultSpecifier() {
            let { type: e } = this.state;
            return Pr(e) || this.shouldParseEnums() && e === 122 ? this.state.containsEsc : super.isExportDefaultSpecifier();
          }
          parseExportDefaultExpression() {
            if (this.shouldParseEnums() && this.isContextual(122)) {
              let e = this.startNode();
              return this.next(), this.flowParseEnumDeclaration(e);
            }
            return super.parseExportDefaultExpression();
          }
          parseConditional(e, s, r, i) {
            if (!this.match(17))
              return e;
            if (this.state.maybeInArrowParameters) {
              let B = this.lookaheadCharCode();
              if (B === 44 || B === 61 || B === 58 || B === 41)
                return this.setOptionalParametersError(i), e;
            }
            this.expect(17);
            let a = this.state.clone(), n = this.state.noArrowAt, o = this.startNodeAt(s, r), { consequent: l, failed: p } = this.tryParseConditionalConsequent(), [y, S] = this.getArrowLikeExpressions(l);
            if (p || S.length > 0) {
              let B = [...n];
              if (S.length > 0) {
                this.state = a, this.state.noArrowAt = B;
                for (let z = 0; z < S.length; z++)
                  B.push(S[z].start);
                ({ consequent: l, failed: p } = this.tryParseConditionalConsequent()), [y, S] = this.getArrowLikeExpressions(l);
              }
              p && y.length > 1 && this.raise(V.AmbiguousConditionalArrow, { at: a.startLoc }), p && y.length === 1 && (this.state = a, B.push(y[0].start), this.state.noArrowAt = B, { consequent: l, failed: p } = this.tryParseConditionalConsequent());
            }
            return this.getArrowLikeExpressions(l, !0), this.state.noArrowAt = n, this.expect(14), o.test = e, o.consequent = l, o.alternate = this.forwardNoArrowParamsConversionAt(o, () => this.parseMaybeAssign(void 0, void 0)), this.finishNode(o, "ConditionalExpression");
          }
          tryParseConditionalConsequent() {
            this.state.noArrowParamsConversionAt.push(this.state.start);
            let e = this.parseMaybeAssignAllowIn(), s = !this.match(14);
            return this.state.noArrowParamsConversionAt.pop(), { consequent: e, failed: s };
          }
          getArrowLikeExpressions(e, s) {
            let r = [e], i = [];
            for (; r.length !== 0; ) {
              let a = r.pop();
              a.type === "ArrowFunctionExpression" ? (a.typeParameters || !a.returnType ? this.finishArrowValidation(a) : i.push(a), r.push(a.body)) : a.type === "ConditionalExpression" && (r.push(a.consequent), r.push(a.alternate));
            }
            return s ? (i.forEach((a) => this.finishArrowValidation(a)), [i, []]) : Dn(i, (a) => a.params.every((n) => this.isAssignable(n, !0)));
          }
          finishArrowValidation(e) {
            var s;
            this.toAssignableList(e.params, (s = e.extra) == null ? void 0 : s.trailingCommaLoc, !1), this.scope.enter(Ue | ps), super.checkParams(e, !1, !0), this.scope.exit();
          }
          forwardNoArrowParamsConversionAt(e, s) {
            let r;
            return this.state.noArrowParamsConversionAt.indexOf(e.start) !== -1 ? (this.state.noArrowParamsConversionAt.push(this.state.start), r = s(), this.state.noArrowParamsConversionAt.pop()) : r = s(), r;
          }
          parseParenItem(e, s, r) {
            if (e = super.parseParenItem(e, s, r), this.eat(17) && (e.optional = !0, this.resetEndLocation(e)), this.match(14)) {
              let i = this.startNodeAt(s, r);
              return i.expression = e, i.typeAnnotation = this.flowParseTypeAnnotation(), this.finishNode(i, "TypeCastExpression");
            }
            return e;
          }
          assertModuleNodeAllowed(e) {
            e.type === "ImportDeclaration" && (e.importKind === "type" || e.importKind === "typeof") || e.type === "ExportNamedDeclaration" && e.exportKind === "type" || e.type === "ExportAllDeclaration" && e.exportKind === "type" || super.assertModuleNodeAllowed(e);
          }
          parseExport(e) {
            let s = super.parseExport(e);
            return (s.type === "ExportNamedDeclaration" || s.type === "ExportAllDeclaration") && (s.exportKind = s.exportKind || "value"), s;
          }
          parseExportDeclaration(e) {
            if (this.isContextual(126)) {
              e.exportKind = "type";
              let s = this.startNode();
              return this.next(), this.match(5) ? (e.specifiers = this.parseExportSpecifiers(!0), this.parseExportFrom(e), null) : this.flowParseTypeAlias(s);
            } else if (this.isContextual(127)) {
              e.exportKind = "type";
              let s = this.startNode();
              return this.next(), this.flowParseOpaqueType(s, !1);
            } else if (this.isContextual(125)) {
              e.exportKind = "type";
              let s = this.startNode();
              return this.next(), this.flowParseInterface(s);
            } else if (this.shouldParseEnums() && this.isContextual(122)) {
              e.exportKind = "value";
              let s = this.startNode();
              return this.next(), this.flowParseEnumDeclaration(s);
            } else
              return super.parseExportDeclaration(e);
          }
          eatExportStar(e) {
            return super.eatExportStar(...arguments) ? !0 : this.isContextual(126) && this.lookahead().type === 55 ? (e.exportKind = "type", this.next(), this.next(), !0) : !1;
          }
          maybeParseExportNamespaceSpecifier(e) {
            let { startLoc: s } = this.state, r = super.maybeParseExportNamespaceSpecifier(e);
            return r && e.exportKind === "type" && this.unexpected(s), r;
          }
          parseClassId(e, s, r) {
            super.parseClassId(e, s, r), this.match(47) && (e.typeParameters = this.flowParseTypeParameterDeclaration());
          }
          parseClassMember(e, s, r) {
            let { startLoc: i } = this.state;
            if (this.isContextual(121)) {
              if (this.parseClassMemberFromModifier(e, s))
                return;
              s.declare = !0;
            }
            super.parseClassMember(e, s, r), s.declare && (s.type !== "ClassProperty" && s.type !== "ClassPrivateProperty" && s.type !== "PropertyDefinition" ? this.raise(V.DeclareClassElement, { at: i }) : s.value && this.raise(V.DeclareClassFieldInitializer, { at: s.value }));
          }
          isIterator(e) {
            return e === "iterator" || e === "asyncIterator";
          }
          readIterator() {
            let e = super.readWord1(), s = "@@" + e;
            (!this.isIterator(e) || !this.state.inType) && this.raise(h.InvalidIdentifier, { at: this.state.curPosition(), identifierName: s }), this.finishToken(128, s);
          }
          getTokenFromCode(e) {
            let s = this.input.charCodeAt(this.state.pos + 1);
            return e === 123 && s === 124 ? this.finishOp(6, 2) : this.state.inType && (e === 62 || e === 60) ? this.finishOp(e === 62 ? 48 : 47, 1) : this.state.inType && e === 63 ? s === 46 ? this.finishOp(18, 2) : this.finishOp(17, 1) : qa(e, s, this.input.charCodeAt(this.state.pos + 2)) ? (this.state.pos += 2, this.readIterator()) : super.getTokenFromCode(e);
          }
          isAssignable(e, s) {
            return e.type === "TypeCastExpression" ? this.isAssignable(e.expression, s) : super.isAssignable(e, s);
          }
          toAssignable(e) {
            !(arguments.length > 1 && arguments[1] !== void 0 && arguments[1]) && e.type === "AssignmentExpression" && e.left.type === "TypeCastExpression" && (e.left = this.typeCastToParameter(e.left)), super.toAssignable(...arguments);
          }
          toAssignableList(e, s, r) {
            for (let i = 0; i < e.length; i++) {
              let a = e[i];
              (a == null ? void 0 : a.type) === "TypeCastExpression" && (e[i] = this.typeCastToParameter(a));
            }
            super.toAssignableList(e, s, r);
          }
          toReferencedList(e, s) {
            for (let i = 0; i < e.length; i++) {
              var r;
              let a = e[i];
              a && a.type === "TypeCastExpression" && !((r = a.extra) != null && r.parenthesized) && (e.length > 1 || !s) && this.raise(V.TypeCastInPattern, { at: a.typeAnnotation });
            }
            return e;
          }
          parseArrayLike(e, s, r, i) {
            let a = super.parseArrayLike(e, s, r, i);
            return s && !this.state.maybeInArrowParameters && this.toReferencedList(a.elements), a;
          }
          isValidLVal(e) {
            for (var s = arguments.length, r = new Array(s > 1 ? s - 1 : 0), i = 1; i < s; i++)
              r[i - 1] = arguments[i];
            return e === "TypeCastExpression" || super.isValidLVal(e, ...r);
          }
          parseClassProperty(e) {
            return this.match(14) && (e.typeAnnotation = this.flowParseTypeAnnotation()), super.parseClassProperty(e);
          }
          parseClassPrivateProperty(e) {
            return this.match(14) && (e.typeAnnotation = this.flowParseTypeAnnotation()), super.parseClassPrivateProperty(e);
          }
          isClassMethod() {
            return this.match(47) || super.isClassMethod();
          }
          isClassProperty() {
            return this.match(14) || super.isClassProperty();
          }
          isNonstaticConstructor(e) {
            return !this.match(14) && super.isNonstaticConstructor(e);
          }
          pushClassMethod(e, s, r, i, a, n) {
            if (s.variance && this.unexpected(s.variance.loc.start), delete s.variance, this.match(47) && (s.typeParameters = this.flowParseTypeParameterDeclaration()), super.pushClassMethod(e, s, r, i, a, n), s.params && a) {
              let o = s.params;
              o.length > 0 && this.isThisParam(o[0]) && this.raise(V.ThisParamBannedInConstructor, { at: s });
            } else if (s.type === "MethodDefinition" && a && s.value.params) {
              let o = s.value.params;
              o.length > 0 && this.isThisParam(o[0]) && this.raise(V.ThisParamBannedInConstructor, { at: s });
            }
          }
          pushClassPrivateMethod(e, s, r, i) {
            s.variance && this.unexpected(s.variance.loc.start), delete s.variance, this.match(47) && (s.typeParameters = this.flowParseTypeParameterDeclaration()), super.pushClassPrivateMethod(e, s, r, i);
          }
          parseClassSuper(e) {
            if (super.parseClassSuper(e), e.superClass && this.match(47) && (e.superTypeParameters = this.flowParseTypeParameterInstantiation()), this.isContextual(110)) {
              this.next();
              let s = e.implements = [];
              do {
                let r = this.startNode();
                r.id = this.flowParseRestrictedIdentifier(!0), this.match(47) ? r.typeParameters = this.flowParseTypeParameterInstantiation() : r.typeParameters = null, s.push(this.finishNode(r, "ClassImplements"));
              } while (this.eat(12));
            }
          }
          checkGetterSetterParams(e) {
            super.checkGetterSetterParams(e);
            let s = this.getObjectOrClassMethodParams(e);
            if (s.length > 0) {
              let r = s[0];
              this.isThisParam(r) && e.kind === "get" ? this.raise(V.GetterMayNotHaveThisParam, { at: r }) : this.isThisParam(r) && this.raise(V.SetterMayNotHaveThisParam, { at: r });
            }
          }
          parsePropertyNamePrefixOperator(e) {
            e.variance = this.flowParseVariance();
          }
          parseObjPropValue(e, s, r, i, a, n, o, l) {
            e.variance && this.unexpected(e.variance.loc.start), delete e.variance;
            let p;
            this.match(47) && !o && (p = this.flowParseTypeParameterDeclaration(), this.match(10) || this.unexpected()), super.parseObjPropValue(e, s, r, i, a, n, o, l), p && ((e.value || e).typeParameters = p);
          }
          parseAssignableListItemTypes(e) {
            return this.eat(17) && (e.type !== "Identifier" && this.raise(V.PatternIsOptional, { at: e }), this.isThisParam(e) && this.raise(V.ThisParamMayNotBeOptional, { at: e }), e.optional = !0), this.match(14) ? e.typeAnnotation = this.flowParseTypeAnnotation() : this.isThisParam(e) && this.raise(V.ThisParamAnnotationRequired, { at: e }), this.match(29) && this.isThisParam(e) && this.raise(V.ThisParamNoDefault, { at: e }), this.resetEndLocation(e), e;
          }
          parseMaybeDefault(e, s, r) {
            let i = super.parseMaybeDefault(e, s, r);
            return i.type === "AssignmentPattern" && i.typeAnnotation && i.right.start < i.typeAnnotation.start && this.raise(V.TypeBeforeInitializer, { at: i.typeAnnotation }), i;
          }
          shouldParseDefaultImport(e) {
            return vs(e) ? Kr(this.state.type) : super.shouldParseDefaultImport(e);
          }
          parseImportSpecifierLocal(e, s, r) {
            s.local = vs(e) ? this.flowParseRestrictedIdentifier(!0, !0) : this.parseIdentifier(), e.specifiers.push(this.finishImportSpecifier(s, r));
          }
          maybeParseDefaultImportSpecifier(e) {
            e.importKind = "value";
            let s = null;
            if (this.match(87) ? s = "typeof" : this.isContextual(126) && (s = "type"), s) {
              let r = this.lookahead(), { type: i } = r;
              s === "type" && i === 55 && this.unexpected(null, r.type), (Kr(i) || i === 5 || i === 55) && (this.next(), e.importKind = s);
            }
            return super.maybeParseDefaultImportSpecifier(e);
          }
          parseImportSpecifier(e, s, r, i) {
            let a = e.imported, n = null;
            a.type === "Identifier" && (a.name === "type" ? n = "type" : a.name === "typeof" && (n = "typeof"));
            let o = !1;
            if (this.isContextual(93) && !this.isLookaheadContextual("as")) {
              let p = this.parseIdentifier(!0);
              n !== null && !Oe(this.state.type) ? (e.imported = p, e.importKind = n, e.local = He(p)) : (e.imported = a, e.importKind = null, e.local = this.parseIdentifier());
            } else {
              if (n !== null && Oe(this.state.type))
                e.imported = this.parseIdentifier(!0), e.importKind = n;
              else {
                if (s)
                  throw this.raise(h.ImportBindingIsString, { at: e, importName: a.value });
                e.imported = a, e.importKind = null;
              }
              this.eatContextual(93) ? e.local = this.parseIdentifier() : (o = !0, e.local = He(e.imported));
            }
            let l = vs(e);
            return r && l && this.raise(V.ImportTypeShorthandOnlyInPureImport, { at: e }), (r || l) && this.checkReservedType(e.local.name, e.local.loc.start, !0), o && !r && !l && this.checkReservedWord(e.local.name, e.loc.start, !0, !0), this.finishImportSpecifier(e, "ImportSpecifier");
          }
          parseBindingAtom() {
            switch (this.state.type) {
              case 78:
                return this.parseIdentifier(!0);
              default:
                return super.parseBindingAtom();
            }
          }
          parseFunctionParams(e, s) {
            let r = e.kind;
            r !== "get" && r !== "set" && this.match(47) && (e.typeParameters = this.flowParseTypeParameterDeclaration()), super.parseFunctionParams(e, s);
          }
          parseVarId(e, s) {
            super.parseVarId(e, s), this.match(14) && (e.id.typeAnnotation = this.flowParseTypeAnnotation(), this.resetEndLocation(e.id));
          }
          parseAsyncArrowFromCallExpression(e, s) {
            if (this.match(14)) {
              let r = this.state.noAnonFunctionType;
              this.state.noAnonFunctionType = !0, e.returnType = this.flowParseTypeAnnotation(), this.state.noAnonFunctionType = r;
            }
            return super.parseAsyncArrowFromCallExpression(e, s);
          }
          shouldParseAsyncArrow() {
            return this.match(14) || super.shouldParseAsyncArrow();
          }
          parseMaybeAssign(e, s) {
            var r;
            let i = null, a;
            if (this.hasPlugin("jsx") && (this.match(138) || this.match(47))) {
              if (i = this.state.clone(), a = this.tryParse(() => super.parseMaybeAssign(e, s), i), !a.error)
                return a.node;
              let { context: l } = this.state, p = l[l.length - 1];
              (p === ne.j_oTag || p === ne.j_expr) && l.pop();
            }
            if ((r = a) != null && r.error || this.match(47)) {
              var n, o;
              i = i || this.state.clone();
              let l, p = this.tryParse((S) => {
                var B;
                l = this.flowParseTypeParameterDeclaration();
                let z = this.forwardNoArrowParamsConversionAt(l, () => {
                  let ae = super.parseMaybeAssign(e, s);
                  return this.resetStartLocationFromNode(ae, l), ae;
                });
                (B = z.extra) != null && B.parenthesized && S();
                let $ = this.maybeUnwrapTypeCastExpression(z);
                return $.type !== "ArrowFunctionExpression" && S(), $.typeParameters = l, this.resetStartLocationFromNode($, l), z;
              }, i), y = null;
              if (p.node && this.maybeUnwrapTypeCastExpression(p.node).type === "ArrowFunctionExpression") {
                if (!p.error && !p.aborted)
                  return p.node.async && this.raise(V.UnexpectedTypeParameterBeforeAsyncArrowFunction, { at: l }), p.node;
                y = p.node;
              }
              if ((n = a) != null && n.node)
                return this.state = a.failState, a.node;
              if (y)
                return this.state = p.failState, y;
              throw (o = a) != null && o.thrown ? a.error : p.thrown ? p.error : this.raise(V.UnexpectedTokenAfterTypeParameter, { at: l });
            }
            return super.parseMaybeAssign(e, s);
          }
          parseArrow(e) {
            if (this.match(14)) {
              let s = this.tryParse(() => {
                let r = this.state.noAnonFunctionType;
                this.state.noAnonFunctionType = !0;
                let i = this.startNode();
                return [i.typeAnnotation, e.predicate] = this.flowParseTypeAndPredicateInitialiser(), this.state.noAnonFunctionType = r, this.canInsertSemicolon() && this.unexpected(), this.match(19) || this.unexpected(), i;
              });
              if (s.thrown)
                return null;
              s.error && (this.state = s.failState), e.returnType = s.node.typeAnnotation ? this.finishNode(s.node, "TypeAnnotation") : null;
            }
            return super.parseArrow(e);
          }
          shouldParseArrow(e) {
            return this.match(14) || super.shouldParseArrow(e);
          }
          setArrowFunctionParameters(e, s) {
            this.state.noArrowParamsConversionAt.indexOf(e.start) !== -1 ? e.params = s : super.setArrowFunctionParameters(e, s);
          }
          checkParams(e, s, r) {
            if (!(r && this.state.noArrowParamsConversionAt.indexOf(e.start) !== -1)) {
              for (let i = 0; i < e.params.length; i++)
                this.isThisParam(e.params[i]) && i > 0 && this.raise(V.ThisParamMustBeFirst, { at: e.params[i] });
              return super.checkParams(...arguments);
            }
          }
          parseParenAndDistinguishExpression(e) {
            return super.parseParenAndDistinguishExpression(e && this.state.noArrowAt.indexOf(this.state.start) === -1);
          }
          parseSubscripts(e, s, r, i) {
            if (e.type === "Identifier" && e.name === "async" && this.state.noArrowAt.indexOf(s) !== -1) {
              this.next();
              let a = this.startNodeAt(s, r);
              a.callee = e, a.arguments = this.parseCallExpressionArguments(11, !1), e = this.finishNode(a, "CallExpression");
            } else if (e.type === "Identifier" && e.name === "async" && this.match(47)) {
              let a = this.state.clone(), n = this.tryParse((l) => this.parseAsyncArrowWithTypeParameters(s, r) || l(), a);
              if (!n.error && !n.aborted)
                return n.node;
              let o = this.tryParse(() => super.parseSubscripts(e, s, r, i), a);
              if (o.node && !o.error)
                return o.node;
              if (n.node)
                return this.state = n.failState, n.node;
              if (o.node)
                return this.state = o.failState, o.node;
              throw n.error || o.error;
            }
            return super.parseSubscripts(e, s, r, i);
          }
          parseSubscript(e, s, r, i, a) {
            if (this.match(18) && this.isLookaheadToken_lt()) {
              if (a.optionalChainMember = !0, i)
                return a.stop = !0, e;
              this.next();
              let n = this.startNodeAt(s, r);
              return n.callee = e, n.typeArguments = this.flowParseTypeParameterInstantiation(), this.expect(10), n.arguments = this.parseCallExpressionArguments(11, !1), n.optional = !0, this.finishCallExpression(n, !0);
            } else if (!i && this.shouldParseTypes() && this.match(47)) {
              let n = this.startNodeAt(s, r);
              n.callee = e;
              let o = this.tryParse(() => (n.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew(), this.expect(10), n.arguments = this.parseCallExpressionArguments(11, !1), a.optionalChainMember && (n.optional = !1), this.finishCallExpression(n, a.optionalChainMember)));
              if (o.node)
                return o.error && (this.state = o.failState), o.node;
            }
            return super.parseSubscript(e, s, r, i, a);
          }
          parseNewCallee(e) {
            super.parseNewCallee(e);
            let s = null;
            this.shouldParseTypes() && this.match(47) && (s = this.tryParse(() => this.flowParseTypeParameterInstantiationCallOrNew()).node), e.typeArguments = s;
          }
          parseAsyncArrowWithTypeParameters(e, s) {
            let r = this.startNodeAt(e, s);
            if (this.parseFunctionParams(r), !!this.parseArrow(r))
              return this.parseArrowExpression(r, void 0, !0);
          }
          readToken_mult_modulo(e) {
            let s = this.input.charCodeAt(this.state.pos + 1);
            if (e === 42 && s === 47 && this.state.hasFlowComment) {
              this.state.hasFlowComment = !1, this.state.pos += 2, this.nextToken();
              return;
            }
            super.readToken_mult_modulo(e);
          }
          readToken_pipe_amp(e) {
            let s = this.input.charCodeAt(this.state.pos + 1);
            if (e === 124 && s === 125) {
              this.finishOp(9, 2);
              return;
            }
            super.readToken_pipe_amp(e);
          }
          parseTopLevel(e, s) {
            let r = super.parseTopLevel(e, s);
            return this.state.hasFlowComment && this.raise(V.UnterminatedFlowComment, { at: this.state.curPosition() }), r;
          }
          skipBlockComment() {
            if (this.hasPlugin("flowComments") && this.skipFlowComment()) {
              if (this.state.hasFlowComment)
                throw this.raise(V.NestedFlowComment, { at: this.state.startLoc });
              this.hasFlowCommentCompletion(), this.state.pos += this.skipFlowComment(), this.state.hasFlowComment = !0;
              return;
            }
            if (this.state.hasFlowComment) {
              let e = this.input.indexOf("*-/", this.state.pos + 2);
              if (e === -1)
                throw this.raise(h.UnterminatedComment, { at: this.state.curPosition() });
              this.state.pos = e + 2 + 3;
              return;
            }
            return super.skipBlockComment();
          }
          skipFlowComment() {
            let { pos: e } = this.state, s = 2;
            for (; [32, 9].includes(this.input.charCodeAt(e + s)); )
              s++;
            let r = this.input.charCodeAt(s + e), i = this.input.charCodeAt(s + e + 1);
            return r === 58 && i === 58 ? s + 2 : this.input.slice(s + e, s + e + 12) === "flow-include" ? s + 12 : r === 58 && i !== 58 ? s : !1;
          }
          hasFlowCommentCompletion() {
            if (this.input.indexOf("*/", this.state.pos) === -1)
              throw this.raise(h.UnterminatedComment, { at: this.state.curPosition() });
          }
          flowEnumErrorBooleanMemberNotInitialized(e, s) {
            let { enumName: r, memberName: i } = s;
            this.raise(V.EnumBooleanMemberNotInitialized, { at: e, memberName: i, enumName: r });
          }
          flowEnumErrorInvalidMemberInitializer(e, s) {
            return this.raise(s.explicitType ? s.explicitType === "symbol" ? V.EnumInvalidMemberInitializerSymbolType : V.EnumInvalidMemberInitializerPrimaryType : V.EnumInvalidMemberInitializerUnknownType, Object.assign({ at: e }, s));
          }
          flowEnumErrorNumberMemberNotInitialized(e, s) {
            let { enumName: r, memberName: i } = s;
            this.raise(V.EnumNumberMemberNotInitialized, { at: e, enumName: r, memberName: i });
          }
          flowEnumErrorStringMemberInconsistentlyInitailized(e, s) {
            let { enumName: r } = s;
            this.raise(V.EnumStringMemberInconsistentlyInitailized, { at: e, enumName: r });
          }
          flowEnumMemberInit() {
            let e = this.state.startLoc, s = () => this.match(12) || this.match(8);
            switch (this.state.type) {
              case 130: {
                let r = this.parseNumericLiteral(this.state.value);
                return s() ? { type: "number", loc: r.loc.start, value: r } : { type: "invalid", loc: e };
              }
              case 129: {
                let r = this.parseStringLiteral(this.state.value);
                return s() ? { type: "string", loc: r.loc.start, value: r } : { type: "invalid", loc: e };
              }
              case 85:
              case 86: {
                let r = this.parseBooleanLiteral(this.match(85));
                return s() ? { type: "boolean", loc: r.loc.start, value: r } : { type: "invalid", loc: e };
              }
              default:
                return { type: "invalid", loc: e };
            }
          }
          flowEnumMemberRaw() {
            let e = this.state.startLoc, s = this.parseIdentifier(!0), r = this.eat(29) ? this.flowEnumMemberInit() : { type: "none", loc: e };
            return { id: s, init: r };
          }
          flowEnumCheckExplicitTypeMismatch(e, s, r) {
            let { explicitType: i } = s;
            i !== null && i !== r && this.flowEnumErrorInvalidMemberInitializer(e, s);
          }
          flowEnumMembers(e) {
            let { enumName: s, explicitType: r } = e, i = /* @__PURE__ */ new Set(), a = { booleanMembers: [], numberMembers: [], stringMembers: [], defaultedMembers: [] }, n = !1;
            for (; !this.match(8); ) {
              if (this.eat(21)) {
                n = !0;
                break;
              }
              let o = this.startNode(), { id: l, init: p } = this.flowEnumMemberRaw(), y = l.name;
              if (y === "")
                continue;
              /^[a-z]/.test(y) && this.raise(V.EnumInvalidMemberName, { at: l, memberName: y, suggestion: y[0].toUpperCase() + y.slice(1), enumName: s }), i.has(y) && this.raise(V.EnumDuplicateMemberName, { at: l, memberName: y, enumName: s }), i.add(y);
              let S = { enumName: s, explicitType: r, memberName: y };
              switch (o.id = l, p.type) {
                case "boolean": {
                  this.flowEnumCheckExplicitTypeMismatch(p.loc, S, "boolean"), o.init = p.value, a.booleanMembers.push(this.finishNode(o, "EnumBooleanMember"));
                  break;
                }
                case "number": {
                  this.flowEnumCheckExplicitTypeMismatch(p.loc, S, "number"), o.init = p.value, a.numberMembers.push(this.finishNode(o, "EnumNumberMember"));
                  break;
                }
                case "string": {
                  this.flowEnumCheckExplicitTypeMismatch(p.loc, S, "string"), o.init = p.value, a.stringMembers.push(this.finishNode(o, "EnumStringMember"));
                  break;
                }
                case "invalid":
                  throw this.flowEnumErrorInvalidMemberInitializer(p.loc, S);
                case "none":
                  switch (r) {
                    case "boolean":
                      this.flowEnumErrorBooleanMemberNotInitialized(p.loc, S);
                      break;
                    case "number":
                      this.flowEnumErrorNumberMemberNotInitialized(p.loc, S);
                      break;
                    default:
                      a.defaultedMembers.push(this.finishNode(o, "EnumDefaultedMember"));
                  }
              }
              this.match(8) || this.expect(12);
            }
            return { members: a, hasUnknownMembers: n };
          }
          flowEnumStringMembers(e, s, r) {
            let { enumName: i } = r;
            if (e.length === 0)
              return s;
            if (s.length === 0)
              return e;
            if (s.length > e.length) {
              for (let a of e)
                this.flowEnumErrorStringMemberInconsistentlyInitailized(a, { enumName: i });
              return s;
            } else {
              for (let a of s)
                this.flowEnumErrorStringMemberInconsistentlyInitailized(a, { enumName: i });
              return e;
            }
          }
          flowEnumParseExplicitType(e) {
            let { enumName: s } = e;
            if (!this.eatContextual(101))
              return null;
            if (!oe(this.state.type))
              throw this.raise(V.EnumInvalidExplicitTypeUnknownSupplied, { at: this.state.startLoc, enumName: s });
            let { value: r } = this.state;
            return this.next(), r !== "boolean" && r !== "number" && r !== "string" && r !== "symbol" && this.raise(V.EnumInvalidExplicitType, { at: this.state.startLoc, enumName: s, invalidEnumType: r }), r;
          }
          flowEnumBody(e, s) {
            let r = s.name, i = s.loc.start, a = this.flowEnumParseExplicitType({ enumName: r });
            this.expect(5);
            let { members: n, hasUnknownMembers: o } = this.flowEnumMembers({ enumName: r, explicitType: a });
            switch (e.hasUnknownMembers = o, a) {
              case "boolean":
                return e.explicitType = !0, e.members = n.booleanMembers, this.expect(8), this.finishNode(e, "EnumBooleanBody");
              case "number":
                return e.explicitType = !0, e.members = n.numberMembers, this.expect(8), this.finishNode(e, "EnumNumberBody");
              case "string":
                return e.explicitType = !0, e.members = this.flowEnumStringMembers(n.stringMembers, n.defaultedMembers, { enumName: r }), this.expect(8), this.finishNode(e, "EnumStringBody");
              case "symbol":
                return e.members = n.defaultedMembers, this.expect(8), this.finishNode(e, "EnumSymbolBody");
              default: {
                let l = () => (e.members = [], this.expect(8), this.finishNode(e, "EnumStringBody"));
                e.explicitType = !1;
                let p = n.booleanMembers.length, y = n.numberMembers.length, S = n.stringMembers.length, B = n.defaultedMembers.length;
                if (!p && !y && !S && !B)
                  return l();
                if (!p && !y)
                  return e.members = this.flowEnumStringMembers(n.stringMembers, n.defaultedMembers, { enumName: r }), this.expect(8), this.finishNode(e, "EnumStringBody");
                if (!y && !S && p >= B) {
                  for (let z of n.defaultedMembers)
                    this.flowEnumErrorBooleanMemberNotInitialized(z.loc.start, { enumName: r, memberName: z.id.name });
                  return e.members = n.booleanMembers, this.expect(8), this.finishNode(e, "EnumBooleanBody");
                } else if (!p && !S && y >= B) {
                  for (let z of n.defaultedMembers)
                    this.flowEnumErrorNumberMemberNotInitialized(z.loc.start, { enumName: r, memberName: z.id.name });
                  return e.members = n.numberMembers, this.expect(8), this.finishNode(e, "EnumNumberBody");
                } else
                  return this.raise(V.EnumInconsistentMemberValues, { at: i, enumName: r }), l();
              }
            }
          }
          flowParseEnumDeclaration(e) {
            let s = this.parseIdentifier();
            return e.id = s, e.body = this.flowEnumBody(this.startNode(), s), this.finishNode(e, "EnumDeclaration");
          }
          isLookaheadToken_lt() {
            let e = this.nextTokenStart();
            if (this.input.charCodeAt(e) === 60) {
              let s = this.input.charCodeAt(e + 1);
              return s !== 60 && s !== 61;
            }
            return !1;
          }
          maybeUnwrapTypeCastExpression(e) {
            return e.type === "TypeCastExpression" ? e.expression : e;
          }
        }, Bn = { __proto__: null, quot: '"', amp: "&", apos: "'", lt: "<", gt: ">", nbsp: "\xA0", iexcl: "\xA1", cent: "\xA2", pound: "\xA3", curren: "\xA4", yen: "\xA5", brvbar: "\xA6", sect: "\xA7", uml: "\xA8", copy: "\xA9", ordf: "\xAA", laquo: "\xAB", not: "\xAC", shy: "\xAD", reg: "\xAE", macr: "\xAF", deg: "\xB0", plusmn: "\xB1", sup2: "\xB2", sup3: "\xB3", acute: "\xB4", micro: "\xB5", para: "\xB6", middot: "\xB7", cedil: "\xB8", sup1: "\xB9", ordm: "\xBA", raquo: "\xBB", frac14: "\xBC", frac12: "\xBD", frac34: "\xBE", iquest: "\xBF", Agrave: "\xC0", Aacute: "\xC1", Acirc: "\xC2", Atilde: "\xC3", Auml: "\xC4", Aring: "\xC5", AElig: "\xC6", Ccedil: "\xC7", Egrave: "\xC8", Eacute: "\xC9", Ecirc: "\xCA", Euml: "\xCB", Igrave: "\xCC", Iacute: "\xCD", Icirc: "\xCE", Iuml: "\xCF", ETH: "\xD0", Ntilde: "\xD1", Ograve: "\xD2", Oacute: "\xD3", Ocirc: "\xD4", Otilde: "\xD5", Ouml: "\xD6", times: "\xD7", Oslash: "\xD8", Ugrave: "\xD9", Uacute: "\xDA", Ucirc: "\xDB", Uuml: "\xDC", Yacute: "\xDD", THORN: "\xDE", szlig: "\xDF", agrave: "\xE0", aacute: "\xE1", acirc: "\xE2", atilde: "\xE3", auml: "\xE4", aring: "\xE5", aelig: "\xE6", ccedil: "\xE7", egrave: "\xE8", eacute: "\xE9", ecirc: "\xEA", euml: "\xEB", igrave: "\xEC", iacute: "\xED", icirc: "\xEE", iuml: "\xEF", eth: "\xF0", ntilde: "\xF1", ograve: "\xF2", oacute: "\xF3", ocirc: "\xF4", otilde: "\xF5", ouml: "\xF6", divide: "\xF7", oslash: "\xF8", ugrave: "\xF9", uacute: "\xFA", ucirc: "\xFB", uuml: "\xFC", yacute: "\xFD", thorn: "\xFE", yuml: "\xFF", OElig: "\u0152", oelig: "\u0153", Scaron: "\u0160", scaron: "\u0161", Yuml: "\u0178", fnof: "\u0192", circ: "\u02C6", tilde: "\u02DC", Alpha: "\u0391", Beta: "\u0392", Gamma: "\u0393", Delta: "\u0394", Epsilon: "\u0395", Zeta: "\u0396", Eta: "\u0397", Theta: "\u0398", Iota: "\u0399", Kappa: "\u039A", Lambda: "\u039B", Mu: "\u039C", Nu: "\u039D", Xi: "\u039E", Omicron: "\u039F", Pi: "\u03A0", Rho: "\u03A1", Sigma: "\u03A3", Tau: "\u03A4", Upsilon: "\u03A5", Phi: "\u03A6", Chi: "\u03A7", Psi: "\u03A8", Omega: "\u03A9", alpha: "\u03B1", beta: "\u03B2", gamma: "\u03B3", delta: "\u03B4", epsilon: "\u03B5", zeta: "\u03B6", eta: "\u03B7", theta: "\u03B8", iota: "\u03B9", kappa: "\u03BA", lambda: "\u03BB", mu: "\u03BC", nu: "\u03BD", xi: "\u03BE", omicron: "\u03BF", pi: "\u03C0", rho: "\u03C1", sigmaf: "\u03C2", sigma: "\u03C3", tau: "\u03C4", upsilon: "\u03C5", phi: "\u03C6", chi: "\u03C7", psi: "\u03C8", omega: "\u03C9", thetasym: "\u03D1", upsih: "\u03D2", piv: "\u03D6", ensp: "\u2002", emsp: "\u2003", thinsp: "\u2009", zwnj: "\u200C", zwj: "\u200D", lrm: "\u200E", rlm: "\u200F", ndash: "\u2013", mdash: "\u2014", lsquo: "\u2018", rsquo: "\u2019", sbquo: "\u201A", ldquo: "\u201C", rdquo: "\u201D", bdquo: "\u201E", dagger: "\u2020", Dagger: "\u2021", bull: "\u2022", hellip: "\u2026", permil: "\u2030", prime: "\u2032", Prime: "\u2033", lsaquo: "\u2039", rsaquo: "\u203A", oline: "\u203E", frasl: "\u2044", euro: "\u20AC", image: "\u2111", weierp: "\u2118", real: "\u211C", trade: "\u2122", alefsym: "\u2135", larr: "\u2190", uarr: "\u2191", rarr: "\u2192", darr: "\u2193", harr: "\u2194", crarr: "\u21B5", lArr: "\u21D0", uArr: "\u21D1", rArr: "\u21D2", dArr: "\u21D3", hArr: "\u21D4", forall: "\u2200", part: "\u2202", exist: "\u2203", empty: "\u2205", nabla: "\u2207", isin: "\u2208", notin: "\u2209", ni: "\u220B", prod: "\u220F", sum: "\u2211", minus: "\u2212", lowast: "\u2217", radic: "\u221A", prop: "\u221D", infin: "\u221E", ang: "\u2220", and: "\u2227", or: "\u2228", cap: "\u2229", cup: "\u222A", int: "\u222B", there4: "\u2234", sim: "\u223C", cong: "\u2245", asymp: "\u2248", ne: "\u2260", equiv: "\u2261", le: "\u2264", ge: "\u2265", sub: "\u2282", sup: "\u2283", nsub: "\u2284", sube: "\u2286", supe: "\u2287", oplus: "\u2295", otimes: "\u2297", perp: "\u22A5", sdot: "\u22C5", lceil: "\u2308", rceil: "\u2309", lfloor: "\u230A", rfloor: "\u230B", lang: "\u2329", rang: "\u232A", loz: "\u25CA", spades: "\u2660", clubs: "\u2663", hearts: "\u2665", diams: "\u2666" }, Qe = Z(m || (m = T(["jsx"])))((t) => ({ AttributeIsEmpty: t("JSX attributes must only be assigned a non-empty expression."), MissingClosingTagElement: t((e) => {
          let { openingTagName: s } = e;
          return "Expected corresponding JSX closing tag for <".concat(s, ">.");
        }), MissingClosingTagFragment: t("Expected corresponding JSX closing tag for <>."), UnexpectedSequenceExpression: t("Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?"), UnexpectedToken: t((e) => {
          let { unexpected: s, HTMLEntity: r } = e;
          return "Unexpected token `".concat(s, "`. Did you mean `").concat(r, "` or `{'").concat(s, "'}`?");
        }), UnsupportedJsxValue: t("JSX value should be either an expression or a quoted JSX text."), UnterminatedJsxContent: t("Unterminated JSX contents."), UnwrappedAdjacentJSXElements: t("Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?") }));
        function We(t) {
          return t ? t.type === "JSXOpeningFragment" || t.type === "JSXClosingFragment" : !1;
        }
        function ot(t) {
          if (t.type === "JSXIdentifier")
            return t.name;
          if (t.type === "JSXNamespacedName")
            return t.namespace.name + ":" + t.name.name;
          if (t.type === "JSXMemberExpression")
            return ot(t.object) + "." + ot(t.property);
          throw new Error("Node had unexpected type: " + t.type);
        }
        var Mn = (t) => class extends t {
          jsxReadToken() {
            let e = "", s = this.state.pos;
            for (; ; ) {
              if (this.state.pos >= this.length)
                throw this.raise(Qe.UnterminatedJsxContent, { at: this.state.startLoc });
              let r = this.input.charCodeAt(this.state.pos);
              switch (r) {
                case 60:
                case 123:
                  return this.state.pos === this.state.start ? r === 60 && this.state.canStartJSXElement ? (++this.state.pos, this.finishToken(138)) : super.getTokenFromCode(r) : (e += this.input.slice(s, this.state.pos), this.finishToken(137, e));
                case 38:
                  e += this.input.slice(s, this.state.pos), e += this.jsxReadEntity(), s = this.state.pos;
                  break;
                case 62:
                case 125:
                default:
                  Ye(r) ? (e += this.input.slice(s, this.state.pos), e += this.jsxReadNewLine(!0), s = this.state.pos) : ++this.state.pos;
              }
            }
          }
          jsxReadNewLine(e) {
            let s = this.input.charCodeAt(this.state.pos), r;
            return ++this.state.pos, s === 13 && this.input.charCodeAt(this.state.pos) === 10 ? (++this.state.pos, r = e ? `
` : `\r
`) : r = String.fromCharCode(s), ++this.state.curLine, this.state.lineStart = this.state.pos, r;
          }
          jsxReadString(e) {
            let s = "", r = ++this.state.pos;
            for (; ; ) {
              if (this.state.pos >= this.length)
                throw this.raise(h.UnterminatedString, { at: this.state.startLoc });
              let i = this.input.charCodeAt(this.state.pos);
              if (i === e)
                break;
              i === 38 ? (s += this.input.slice(r, this.state.pos), s += this.jsxReadEntity(), r = this.state.pos) : Ye(i) ? (s += this.input.slice(r, this.state.pos), s += this.jsxReadNewLine(!1), r = this.state.pos) : ++this.state.pos;
            }
            return s += this.input.slice(r, this.state.pos++), this.finishToken(129, s);
          }
          jsxReadEntity() {
            let e = ++this.state.pos;
            if (this.codePointAtPos(this.state.pos) === 35) {
              ++this.state.pos;
              let s = 10;
              this.codePointAtPos(this.state.pos) === 120 && (s = 16, ++this.state.pos);
              let r = this.readInt(s, void 0, !1, "bail");
              if (r !== null && this.codePointAtPos(this.state.pos) === 59)
                return ++this.state.pos, String.fromCodePoint(r);
            } else {
              let s = 0, r = !1;
              for (; s++ < 10 && this.state.pos < this.length && !(r = this.codePointAtPos(this.state.pos) == 59); )
                ++this.state.pos;
              if (r) {
                let i = this.input.slice(e, this.state.pos), a = Bn[i];
                if (++this.state.pos, a)
                  return a;
              }
            }
            return this.state.pos = e, "&";
          }
          jsxReadWord() {
            let e, s = this.state.pos;
            do
              e = this.input.charCodeAt(++this.state.pos);
            while (st(e) || e === 45);
            return this.finishToken(136, this.input.slice(s, this.state.pos));
          }
          jsxParseIdentifier() {
            let e = this.startNode();
            return this.match(136) ? e.name = this.state.value : ns(this.state.type) ? e.name = Ve(this.state.type) : this.unexpected(), this.next(), this.finishNode(e, "JSXIdentifier");
          }
          jsxParseNamespacedName() {
            let e = this.state.start, s = this.state.startLoc, r = this.jsxParseIdentifier();
            if (!this.eat(14))
              return r;
            let i = this.startNodeAt(e, s);
            return i.namespace = r, i.name = this.jsxParseIdentifier(), this.finishNode(i, "JSXNamespacedName");
          }
          jsxParseElementName() {
            let e = this.state.start, s = this.state.startLoc, r = this.jsxParseNamespacedName();
            if (r.type === "JSXNamespacedName")
              return r;
            for (; this.eat(16); ) {
              let i = this.startNodeAt(e, s);
              i.object = r, i.property = this.jsxParseIdentifier(), r = this.finishNode(i, "JSXMemberExpression");
            }
            return r;
          }
          jsxParseAttributeValue() {
            let e;
            switch (this.state.type) {
              case 5:
                return e = this.startNode(), this.setContext(ne.brace), this.next(), e = this.jsxParseExpressionContainer(e, ne.j_oTag), e.expression.type === "JSXEmptyExpression" && this.raise(Qe.AttributeIsEmpty, { at: e }), e;
              case 138:
              case 129:
                return this.parseExprAtom();
              default:
                throw this.raise(Qe.UnsupportedJsxValue, { at: this.state.startLoc });
            }
          }
          jsxParseEmptyExpression() {
            let e = this.startNodeAt(this.state.lastTokEndLoc.index, this.state.lastTokEndLoc);
            return this.finishNodeAt(e, "JSXEmptyExpression", this.state.startLoc);
          }
          jsxParseSpreadChild(e) {
            return this.next(), e.expression = this.parseExpression(), this.setContext(ne.j_oTag), this.state.canStartJSXElement = !0, this.expect(8), this.finishNode(e, "JSXSpreadChild");
          }
          jsxParseExpressionContainer(e, s) {
            if (this.match(8))
              e.expression = this.jsxParseEmptyExpression();
            else {
              let r = this.parseExpression();
              e.expression = r;
            }
            return this.setContext(s), this.state.canStartJSXElement = !0, this.expect(8), this.finishNode(e, "JSXExpressionContainer");
          }
          jsxParseAttribute() {
            let e = this.startNode();
            return this.match(5) ? (this.setContext(ne.brace), this.next(), this.expect(21), e.argument = this.parseMaybeAssignAllowIn(), this.setContext(ne.j_oTag), this.state.canStartJSXElement = !0, this.expect(8), this.finishNode(e, "JSXSpreadAttribute")) : (e.name = this.jsxParseNamespacedName(), e.value = this.eat(29) ? this.jsxParseAttributeValue() : null, this.finishNode(e, "JSXAttribute"));
          }
          jsxParseOpeningElementAt(e, s) {
            let r = this.startNodeAt(e, s);
            return this.eat(139) ? this.finishNode(r, "JSXOpeningFragment") : (r.name = this.jsxParseElementName(), this.jsxParseOpeningElementAfterName(r));
          }
          jsxParseOpeningElementAfterName(e) {
            let s = [];
            for (; !this.match(56) && !this.match(139); )
              s.push(this.jsxParseAttribute());
            return e.attributes = s, e.selfClosing = this.eat(56), this.expect(139), this.finishNode(e, "JSXOpeningElement");
          }
          jsxParseClosingElementAt(e, s) {
            let r = this.startNodeAt(e, s);
            return this.eat(139) ? this.finishNode(r, "JSXClosingFragment") : (r.name = this.jsxParseElementName(), this.expect(139), this.finishNode(r, "JSXClosingElement"));
          }
          jsxParseElementAt(e, s) {
            let r = this.startNodeAt(e, s), i = [], a = this.jsxParseOpeningElementAt(e, s), n = null;
            if (!a.selfClosing) {
              e:
                for (; ; )
                  switch (this.state.type) {
                    case 138:
                      if (e = this.state.start, s = this.state.startLoc, this.next(), this.eat(56)) {
                        n = this.jsxParseClosingElementAt(e, s);
                        break e;
                      }
                      i.push(this.jsxParseElementAt(e, s));
                      break;
                    case 137:
                      i.push(this.parseExprAtom());
                      break;
                    case 5: {
                      let o = this.startNode();
                      this.setContext(ne.brace), this.next(), this.match(21) ? i.push(this.jsxParseSpreadChild(o)) : i.push(this.jsxParseExpressionContainer(o, ne.j_expr));
                      break;
                    }
                    default:
                      throw this.unexpected();
                  }
              We(a) && !We(n) && n !== null ? this.raise(Qe.MissingClosingTagFragment, { at: n }) : !We(a) && We(n) ? this.raise(Qe.MissingClosingTagElement, { at: n, openingTagName: ot(a.name) }) : !We(a) && !We(n) && ot(n.name) !== ot(a.name) && this.raise(Qe.MissingClosingTagElement, { at: n, openingTagName: ot(a.name) });
            }
            if (We(a) ? (r.openingFragment = a, r.closingFragment = n) : (r.openingElement = a, r.closingElement = n), r.children = i, this.match(47))
              throw this.raise(Qe.UnwrappedAdjacentJSXElements, { at: this.state.startLoc });
            return We(a) ? this.finishNode(r, "JSXFragment") : this.finishNode(r, "JSXElement");
          }
          jsxParseElement() {
            let e = this.state.start, s = this.state.startLoc;
            return this.next(), this.jsxParseElementAt(e, s);
          }
          setContext(e) {
            let { context: s } = this.state;
            s[s.length - 1] = e;
          }
          parseExprAtom(e) {
            return this.match(137) ? this.parseLiteral(this.state.value, "JSXText") : this.match(138) ? this.jsxParseElement() : this.match(47) && this.input.charCodeAt(this.state.pos) !== 33 ? (this.replaceToken(138), this.jsxParseElement()) : super.parseExprAtom(e);
          }
          skipSpace() {
            this.curContext().preserveSpace || super.skipSpace();
          }
          getTokenFromCode(e) {
            let s = this.curContext();
            if (s === ne.j_expr)
              return this.jsxReadToken();
            if (s === ne.j_oTag || s === ne.j_cTag) {
              if (Re(e))
                return this.jsxReadWord();
              if (e === 62)
                return ++this.state.pos, this.finishToken(139);
              if ((e === 34 || e === 39) && s === ne.j_oTag)
                return this.jsxReadString(e);
            }
            return e === 60 && this.state.canStartJSXElement && this.input.charCodeAt(this.state.pos + 1) !== 33 ? (++this.state.pos, this.finishToken(138)) : super.getTokenFromCode(e);
          }
          updateContext(e) {
            let { context: s, type: r } = this.state;
            if (r === 56 && e === 138)
              s.splice(-2, 2, ne.j_cTag), this.state.canStartJSXElement = !1;
            else if (r === 138)
              s.push(ne.j_oTag);
            else if (r === 139) {
              let i = s[s.length - 1];
              i === ne.j_oTag && e === 56 || i === ne.j_cTag ? (s.pop(), this.state.canStartJSXElement = s[s.length - 1] === ne.j_expr) : (this.setContext(ne.j_expr), this.state.canStartJSXElement = !0);
            } else
              this.state.canStartJSXElement = Sa(r);
          }
        }, On = class extends Ts {
          constructor() {
            super(...arguments), this.types = /* @__PURE__ */ new Set(), this.enums = /* @__PURE__ */ new Set(), this.constEnums = /* @__PURE__ */ new Set(), this.classes = /* @__PURE__ */ new Set(), this.exportOnlyBindings = /* @__PURE__ */ new Set();
          }
        }, jn = class extends Es {
          createScope(t) {
            return new On(t);
          }
          declareName(t, e, s) {
            let r = this.currentScope();
            if (e & ms) {
              this.maybeExportDefined(r, t), r.exportOnlyBindings.add(t);
              return;
            }
            super.declareName(...arguments), e & it && (e & _e || (this.checkRedeclarationInScope(r, t, e, s), this.maybeExportDefined(r, t)), r.types.add(t)), e & cs && r.enums.add(t), e & ds && r.constEnums.add(t), e & It && r.classes.add(t);
          }
          isRedeclaredInScope(t, e, s) {
            if (t.enums.has(e)) {
              if (s & cs) {
                let r = !!(s & ds), i = t.constEnums.has(e);
                return r !== i;
              }
              return !0;
            }
            return s & It && t.classes.has(e) ? t.lexical.has(e) ? !!(s & _e) : !1 : s & it && t.types.has(e) ? !0 : super.isRedeclaredInScope(...arguments);
          }
          checkLocalExport(t) {
            let e = this.scopeStack[0], { name: s } = t;
            !e.types.has(s) && !e.exportOnlyBindings.has(s) && super.checkLocalExport(t);
          }
        }, Rn = (t, e) => Object.hasOwnProperty.call(t, e) && t[e];
        function Un(t) {
          if (t == null)
            throw new Error("Unexpected ".concat(t, " value."));
          return t;
        }
        function Wr(t) {
          if (!t)
            throw new Error("Assert fail");
        }
        function _n(t) {
          return as(t) || Ma(t);
        }
        var R = Z(f || (f = T(["typescript"])))((t) => ({ AbstractMethodHasImplementation: t((e) => {
          let { methodName: s } = e;
          return "Method '".concat(s, "' cannot have an implementation because it is marked abstract.");
        }), AbstractPropertyHasInitializer: t((e) => {
          let { propertyName: s } = e;
          return "Property '".concat(s, "' cannot have an initializer because it is marked abstract.");
        }), AccesorCannotDeclareThisParameter: t("'get' and 'set' accessors cannot declare 'this' parameters."), AccesorCannotHaveTypeParameters: t("An accessor cannot have type parameters."), CannotFindName: t((e) => {
          let { name: s } = e;
          return "Cannot find name '".concat(s, "'.");
        }), ClassMethodHasDeclare: t("Class methods cannot have the 'declare' modifier."), ClassMethodHasReadonly: t("Class methods cannot have the 'readonly' modifier."), ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference: t("A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference."), ConstructorHasTypeParameters: t("Type parameters cannot appear on a constructor declaration."), DeclareAccessor: t((e) => {
          let { kind: s } = e;
          return "'declare' is not allowed in ".concat(s, "ters.");
        }), DeclareClassFieldHasInitializer: t("Initializers are not allowed in ambient contexts."), DeclareFunctionHasImplementation: t("An implementation cannot be declared in ambient contexts."), DuplicateAccessibilityModifier: t((e) => "Accessibility modifier already seen."), DuplicateModifier: t((e) => {
          let { modifier: s } = e;
          return "Duplicate modifier: '".concat(s, "'.");
        }), EmptyHeritageClauseType: t((e) => {
          let { token: s } = e;
          return "'".concat(s, "' list cannot be empty.");
        }), EmptyTypeArguments: t("Type argument list cannot be empty."), EmptyTypeParameters: t("Type parameter list cannot be empty."), ExpectedAmbientAfterExportDeclare: t("'export declare' must be followed by an ambient declaration."), ImportAliasHasImportType: t("An import alias can not use 'import type'."), IncompatibleModifiers: t((e) => {
          let { modifiers: s } = e;
          return "'".concat(s[0], "' modifier cannot be used with '").concat(s[1], "' modifier.");
        }), IndexSignatureHasAbstract: t("Index signatures cannot have the 'abstract' modifier."), IndexSignatureHasAccessibility: t((e) => {
          let { modifier: s } = e;
          return "Index signatures cannot have an accessibility modifier ('".concat(s, "').");
        }), IndexSignatureHasDeclare: t("Index signatures cannot have the 'declare' modifier."), IndexSignatureHasOverride: t("'override' modifier cannot appear on an index signature."), IndexSignatureHasStatic: t("Index signatures cannot have the 'static' modifier."), InitializerNotAllowedInAmbientContext: t("Initializers are not allowed in ambient contexts."), InvalidModifierOnTypeMember: t((e) => {
          let { modifier: s } = e;
          return "'".concat(s, "' modifier cannot appear on a type member.");
        }), InvalidModifierOnTypeParameter: t((e) => {
          let { modifier: s } = e;
          return "'".concat(s, "' modifier cannot appear on a type parameter.");
        }), InvalidModifierOnTypeParameterPositions: t((e) => {
          let { modifier: s } = e;
          return "'".concat(s, "' modifier can only appear on a type parameter of a class, interface or type alias.");
        }), InvalidModifiersOrder: t((e) => {
          let { orderedModifiers: s } = e;
          return "'".concat(s[0], "' modifier must precede '").concat(s[1], "' modifier.");
        }), InvalidTupleMemberLabel: t("Tuple members must be labeled with a simple identifier."), MissingInterfaceName: t("'interface' declarations must be followed by an identifier."), MixedLabeledAndUnlabeledElements: t("Tuple members must all have names or all not have names."), NonAbstractClassHasAbstractMethod: t("Abstract methods can only appear within an abstract class."), NonClassMethodPropertyHasAbstractModifer: t("'abstract' modifier can only appear on a class, method, or property declaration."), OptionalTypeBeforeRequired: t("A required element cannot follow an optional element."), OverrideNotInSubClass: t("This member cannot have an 'override' modifier because its containing class does not extend another class."), PatternIsOptional: t("A binding pattern parameter cannot be optional in an implementation signature."), PrivateElementHasAbstract: t("Private elements cannot have the 'abstract' modifier."), PrivateElementHasAccessibility: t((e) => {
          let { modifier: s } = e;
          return "Private elements cannot have an accessibility modifier ('".concat(s, "').");
        }), ReadonlyForMethodSignature: t("'readonly' modifier can only appear on a property declaration or index signature."), ReservedArrowTypeParam: t("This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`."), ReservedTypeAssertion: t("This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead."), SetAccesorCannotHaveOptionalParameter: t("A 'set' accessor cannot have an optional parameter."), SetAccesorCannotHaveRestParameter: t("A 'set' accessor cannot have rest parameter."), SetAccesorCannotHaveReturnType: t("A 'set' accessor cannot have a return type annotation."), SingleTypeParameterWithoutTrailingComma: t((e) => {
          let { typeParameterName: s } = e;
          return "Single type parameter ".concat(s, " should have a trailing comma. Example usage: <").concat(s, ",>.");
        }), StaticBlockCannotHaveModifier: t("Static class blocks cannot have any modifier."), TypeAnnotationAfterAssign: t("Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`."), TypeImportCannotSpecifyDefaultAndNamed: t("A type-only import can specify a default import or named bindings, but not both."), TypeModifierIsUsedInTypeExports: t("The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement."), TypeModifierIsUsedInTypeImports: t("The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement."), UnexpectedParameterModifier: t("A parameter property is only allowed in a constructor implementation."), UnexpectedReadonly: t("'readonly' type modifier is only permitted on array and tuple literal types."), UnexpectedTypeAnnotation: t("Did not expect a type annotation here."), UnexpectedTypeCastInParameter: t("Unexpected type cast in parameter position."), UnsupportedImportTypeArgument: t("Argument in a type import must be a string literal."), UnsupportedParameterPropertyKind: t("A parameter property may not be declared using a binding pattern."), UnsupportedSignatureParameterKind: t((e) => {
          let { type: s } = e;
          return "Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ".concat(s, ".");
        }) }));
        function zn(t) {
          switch (t) {
            case "any":
              return "TSAnyKeyword";
            case "boolean":
              return "TSBooleanKeyword";
            case "bigint":
              return "TSBigIntKeyword";
            case "never":
              return "TSNeverKeyword";
            case "number":
              return "TSNumberKeyword";
            case "object":
              return "TSObjectKeyword";
            case "string":
              return "TSStringKeyword";
            case "symbol":
              return "TSSymbolKeyword";
            case "undefined":
              return "TSUndefinedKeyword";
            case "unknown":
              return "TSUnknownKeyword";
            default:
              return;
          }
        }
        function Jr(t) {
          return t === "private" || t === "public" || t === "protected";
        }
        function Hn(t) {
          return t === "in" || t === "out";
        }
        var Vn = (t) => class extends t {
          getScopeHandler() {
            return jn;
          }
          tsIsIdentifier() {
            return oe(this.state.type);
          }
          tsTokenCanFollowModifier() {
            return (this.match(0) || this.match(5) || this.match(55) || this.match(21) || this.match(134) || this.isLiteralPropertyName()) && !this.hasPrecedingLineBreak();
          }
          tsNextTokenCanFollowModifier() {
            return this.next(), this.tsTokenCanFollowModifier();
          }
          tsParseModifier(e, s) {
            if (!oe(this.state.type) && this.state.type !== 58)
              return;
            let r = this.state.value;
            if (e.indexOf(r) !== -1) {
              if (s && this.tsIsStartOfStaticBlocks())
                return;
              if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this)))
                return r;
            }
          }
          tsParseModifiers(e) {
            let { modified: s, allowedModifiers: r, disallowedModifiers: i, stopOnStartOfClassStaticBlock: a, errorTemplate: n = R.InvalidModifierOnTypeMember } = e, o = (p, y, S, B) => {
              y === S && s[B] && this.raise(R.InvalidModifiersOrder, { at: p, orderedModifiers: [S, B] });
            }, l = (p, y, S, B) => {
              (s[S] && y === B || s[B] && y === S) && this.raise(R.IncompatibleModifiers, { at: p, modifiers: [S, B] });
            };
            for (; ; ) {
              let { startLoc: p } = this.state, y = this.tsParseModifier(r.concat(i != null ? i : []), a);
              if (!y)
                break;
              Jr(y) ? s.accessibility ? this.raise(R.DuplicateAccessibilityModifier, { at: p, modifier: y }) : (o(p, y, y, "override"), o(p, y, y, "static"), o(p, y, y, "readonly"), s.accessibility = y) : Hn(y) ? (s[y] && this.raise(R.DuplicateModifier, { at: p, modifier: y }), s[y] = !0, o(p, y, "in", "out")) : (Object.hasOwnProperty.call(s, y) ? this.raise(R.DuplicateModifier, { at: p, modifier: y }) : (o(p, y, "static", "readonly"), o(p, y, "static", "override"), o(p, y, "override", "readonly"), o(p, y, "abstract", "override"), l(p, y, "declare", "override"), l(p, y, "static", "abstract")), s[y] = !0), i != null && i.includes(y) && this.raise(n, { at: p, modifier: y });
            }
          }
          tsIsListTerminator(e) {
            switch (e) {
              case "EnumMembers":
              case "TypeMembers":
                return this.match(8);
              case "HeritageClauseElement":
                return this.match(5);
              case "TupleElementTypes":
                return this.match(3);
              case "TypeParametersOrArguments":
                return this.match(48);
            }
            throw new Error("Unreachable");
          }
          tsParseList(e, s) {
            let r = [];
            for (; !this.tsIsListTerminator(e); )
              r.push(s());
            return r;
          }
          tsParseDelimitedList(e, s, r) {
            return Un(this.tsParseDelimitedListWorker(e, s, !0, r));
          }
          tsParseDelimitedListWorker(e, s, r, i) {
            let a = [], n = -1;
            for (; !this.tsIsListTerminator(e); ) {
              n = -1;
              let o = s();
              if (o == null)
                return;
              if (a.push(o), this.eat(12)) {
                n = this.state.lastTokStart;
                continue;
              }
              if (this.tsIsListTerminator(e))
                break;
              r && this.expect(12);
              return;
            }
            return i && (i.value = n), a;
          }
          tsParseBracketedList(e, s, r, i, a) {
            i || (r ? this.expect(0) : this.expect(47));
            let n = this.tsParseDelimitedList(e, s, a);
            return r ? this.expect(3) : this.expect(48), n;
          }
          tsParseImportType() {
            let e = this.startNode();
            return this.expect(83), this.expect(10), this.match(129) || this.raise(R.UnsupportedImportTypeArgument, { at: this.state.startLoc }), e.argument = this.parseExprAtom(), this.expect(11), this.eat(16) && (e.qualifier = this.tsParseEntityName()), this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, "TSImportType");
          }
          tsParseEntityName() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, s = this.parseIdentifier(e);
            for (; this.eat(16); ) {
              let r = this.startNodeAtNode(s);
              r.left = s, r.right = this.parseIdentifier(e), s = this.finishNode(r, "TSQualifiedName");
            }
            return s;
          }
          tsParseTypeReference() {
            let e = this.startNode();
            return e.typeName = this.tsParseEntityName(), !this.hasPrecedingLineBreak() && this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, "TSTypeReference");
          }
          tsParseThisTypePredicate(e) {
            this.next();
            let s = this.startNodeAtNode(e);
            return s.parameterName = e, s.typeAnnotation = this.tsParseTypeAnnotation(!1), s.asserts = !1, this.finishNode(s, "TSTypePredicate");
          }
          tsParseThisTypeNode() {
            let e = this.startNode();
            return this.next(), this.finishNode(e, "TSThisType");
          }
          tsParseTypeQuery() {
            let e = this.startNode();
            return this.expect(87), this.match(83) ? e.exprName = this.tsParseImportType() : e.exprName = this.tsParseEntityName(), !this.hasPrecedingLineBreak() && this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, "TSTypeQuery");
          }
          tsParseInOutModifiers(e) {
            this.tsParseModifiers({ modified: e, allowedModifiers: ["in", "out"], disallowedModifiers: ["public", "private", "protected", "readonly", "declare", "abstract", "override"], errorTemplate: R.InvalidModifierOnTypeParameter });
          }
          tsParseNoneModifiers(e) {
            this.tsParseModifiers({ modified: e, allowedModifiers: [], disallowedModifiers: ["in", "out"], errorTemplate: R.InvalidModifierOnTypeParameterPositions });
          }
          tsParseTypeParameter() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.tsParseNoneModifiers.bind(this), s = this.startNode();
            return e(s), s.name = this.tsParseTypeParameterName(), s.constraint = this.tsEatThenParseType(81), s.default = this.tsEatThenParseType(29), this.finishNode(s, "TSTypeParameter");
          }
          tsTryParseTypeParameters(e) {
            if (this.match(47))
              return this.tsParseTypeParameters(e);
          }
          tsParseTypeParameters(e) {
            let s = this.startNode();
            this.match(47) || this.match(138) ? this.next() : this.unexpected();
            let r = { value: -1 };
            return s.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this, e), !1, !0, r), s.params.length === 0 && this.raise(R.EmptyTypeParameters, { at: s }), r.value !== -1 && this.addExtra(s, "trailingComma", r.value), this.finishNode(s, "TSTypeParameterDeclaration");
          }
          tsTryNextParseConstantContext() {
            if (this.lookahead().type !== 75)
              return null;
            this.next();
            let e = this.tsParseTypeReference();
            return e.typeParameters && this.raise(R.CannotFindName, { at: e.typeName, name: "const" }), e;
          }
          tsFillSignature(e, s) {
            let r = e === 19, i = "parameters", a = "typeAnnotation";
            s.typeParameters = this.tsTryParseTypeParameters(), this.expect(10), s[i] = this.tsParseBindingListForSignature(), r ? s[a] = this.tsParseTypeOrTypePredicateAnnotation(e) : this.match(e) && (s[a] = this.tsParseTypeOrTypePredicateAnnotation(e));
          }
          tsParseBindingListForSignature() {
            return this.parseBindingList(11, 41).map((e) => (e.type !== "Identifier" && e.type !== "RestElement" && e.type !== "ObjectPattern" && e.type !== "ArrayPattern" && this.raise(R.UnsupportedSignatureParameterKind, { at: e, type: e.type }), e));
          }
          tsParseTypeMemberSemicolon() {
            !this.eat(12) && !this.isLineTerminator() && this.expect(13);
          }
          tsParseSignatureMember(e, s) {
            return this.tsFillSignature(14, s), this.tsParseTypeMemberSemicolon(), this.finishNode(s, e);
          }
          tsIsUnambiguouslyIndexSignature() {
            return this.next(), oe(this.state.type) ? (this.next(), this.match(14)) : !1;
          }
          tsTryParseIndexSignature(e) {
            if (!(this.match(0) && this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this))))
              return;
            this.expect(0);
            let s = this.parseIdentifier();
            s.typeAnnotation = this.tsParseTypeAnnotation(), this.resetEndLocation(s), this.expect(3), e.parameters = [s];
            let r = this.tsTryParseTypeAnnotation();
            return r && (e.typeAnnotation = r), this.tsParseTypeMemberSemicolon(), this.finishNode(e, "TSIndexSignature");
          }
          tsParsePropertyOrMethodSignature(e, s) {
            this.eat(17) && (e.optional = !0);
            let r = e;
            if (this.match(10) || this.match(47)) {
              s && this.raise(R.ReadonlyForMethodSignature, { at: e });
              let i = r;
              i.kind && this.match(47) && this.raise(R.AccesorCannotHaveTypeParameters, { at: this.state.curPosition() }), this.tsFillSignature(14, i), this.tsParseTypeMemberSemicolon();
              let a = "parameters", n = "typeAnnotation";
              if (i.kind === "get")
                i[a].length > 0 && (this.raise(h.BadGetterArity, { at: this.state.curPosition() }), this.isThisParam(i[a][0]) && this.raise(R.AccesorCannotDeclareThisParameter, { at: this.state.curPosition() }));
              else if (i.kind === "set") {
                if (i[a].length !== 1)
                  this.raise(h.BadSetterArity, { at: this.state.curPosition() });
                else {
                  let o = i[a][0];
                  this.isThisParam(o) && this.raise(R.AccesorCannotDeclareThisParameter, { at: this.state.curPosition() }), o.type === "Identifier" && o.optional && this.raise(R.SetAccesorCannotHaveOptionalParameter, { at: this.state.curPosition() }), o.type === "RestElement" && this.raise(R.SetAccesorCannotHaveRestParameter, { at: this.state.curPosition() });
                }
                i[n] && this.raise(R.SetAccesorCannotHaveReturnType, { at: i[n] });
              } else
                i.kind = "method";
              return this.finishNode(i, "TSMethodSignature");
            } else {
              let i = r;
              s && (i.readonly = !0);
              let a = this.tsTryParseTypeAnnotation();
              return a && (i.typeAnnotation = a), this.tsParseTypeMemberSemicolon(), this.finishNode(i, "TSPropertySignature");
            }
          }
          tsParseTypeMember() {
            let e = this.startNode();
            if (this.match(10) || this.match(47))
              return this.tsParseSignatureMember("TSCallSignatureDeclaration", e);
            if (this.match(77)) {
              let r = this.startNode();
              return this.next(), this.match(10) || this.match(47) ? this.tsParseSignatureMember("TSConstructSignatureDeclaration", e) : (e.key = this.createIdentifier(r, "new"), this.tsParsePropertyOrMethodSignature(e, !1));
            }
            return this.tsParseModifiers({ modified: e, allowedModifiers: ["readonly"], disallowedModifiers: ["declare", "abstract", "private", "protected", "public", "static", "override"] }), this.tsTryParseIndexSignature(e) || (this.parsePropertyName(e), !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.tsTokenCanFollowModifier() && (e.kind = e.key.name, this.parsePropertyName(e)), this.tsParsePropertyOrMethodSignature(e, !!e.readonly));
          }
          tsParseTypeLiteral() {
            let e = this.startNode();
            return e.members = this.tsParseObjectTypeMembers(), this.finishNode(e, "TSTypeLiteral");
          }
          tsParseObjectTypeMembers() {
            this.expect(5);
            let e = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
            return this.expect(8), e;
          }
          tsIsStartOfMappedType() {
            return this.next(), this.eat(53) ? this.isContextual(118) : (this.isContextual(118) && this.next(), !this.match(0) || (this.next(), !this.tsIsIdentifier()) ? !1 : (this.next(), this.match(58)));
          }
          tsParseMappedTypeParameter() {
            let e = this.startNode();
            return e.name = this.tsParseTypeParameterName(), e.constraint = this.tsExpectThenParseType(58), this.finishNode(e, "TSTypeParameter");
          }
          tsParseMappedType() {
            let e = this.startNode();
            return this.expect(5), this.match(53) ? (e.readonly = this.state.value, this.next(), this.expectContextual(118)) : this.eatContextual(118) && (e.readonly = !0), this.expect(0), e.typeParameter = this.tsParseMappedTypeParameter(), e.nameType = this.eatContextual(93) ? this.tsParseType() : null, this.expect(3), this.match(53) ? (e.optional = this.state.value, this.next(), this.expect(17)) : this.eat(17) && (e.optional = !0), e.typeAnnotation = this.tsTryParseType(), this.semicolon(), this.expect(8), this.finishNode(e, "TSMappedType");
          }
          tsParseTupleType() {
            let e = this.startNode();
            e.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), !0, !1);
            let s = !1, r = null;
            return e.elementTypes.forEach((i) => {
              var a;
              let { type: n } = i;
              s && n !== "TSRestType" && n !== "TSOptionalType" && !(n === "TSNamedTupleMember" && i.optional) && this.raise(R.OptionalTypeBeforeRequired, { at: i }), s = s || n === "TSNamedTupleMember" && i.optional || n === "TSOptionalType", n === "TSRestType" && (i = i.typeAnnotation, n = i.type);
              let o = n === "TSNamedTupleMember";
              r = (a = r) != null ? a : o, r !== o && this.raise(R.MixedLabeledAndUnlabeledElements, { at: i });
            }), this.finishNode(e, "TSTupleType");
          }
          tsParseTupleElementType() {
            let { start: e, startLoc: s } = this.state, r = this.eat(21), i = this.tsParseType(), a = this.eat(17);
            if (this.eat(14)) {
              let n = this.startNodeAtNode(i);
              n.optional = a, i.type === "TSTypeReference" && !i.typeParameters && i.typeName.type === "Identifier" ? n.label = i.typeName : (this.raise(R.InvalidTupleMemberLabel, { at: i }), n.label = i), n.elementType = this.tsParseType(), i = this.finishNode(n, "TSNamedTupleMember");
            } else if (a) {
              let n = this.startNodeAtNode(i);
              n.typeAnnotation = i, i = this.finishNode(n, "TSOptionalType");
            }
            if (r) {
              let n = this.startNodeAt(e, s);
              n.typeAnnotation = i, i = this.finishNode(n, "TSRestType");
            }
            return i;
          }
          tsParseParenthesizedType() {
            let e = this.startNode();
            return this.expect(10), e.typeAnnotation = this.tsParseType(), this.expect(11), this.finishNode(e, "TSParenthesizedType");
          }
          tsParseFunctionOrConstructorType(e, s) {
            let r = this.startNode();
            return e === "TSConstructorType" && (r.abstract = !!s, s && this.next(), this.next()), this.tsFillSignature(19, r), this.finishNode(r, e);
          }
          tsParseLiteralTypeNode() {
            let e = this.startNode();
            return e.literal = (() => {
              switch (this.state.type) {
                case 130:
                case 131:
                case 129:
                case 85:
                case 86:
                  return this.parseExprAtom();
                default:
                  throw this.unexpected();
              }
            })(), this.finishNode(e, "TSLiteralType");
          }
          tsParseTemplateLiteralType() {
            let e = this.startNode();
            return e.literal = this.parseTemplate(!1), this.finishNode(e, "TSLiteralType");
          }
          parseTemplateSubstitution() {
            return this.state.inType ? this.tsParseType() : super.parseTemplateSubstitution();
          }
          tsParseThisTypeOrThisTypePredicate() {
            let e = this.tsParseThisTypeNode();
            return this.isContextual(113) && !this.hasPrecedingLineBreak() ? this.tsParseThisTypePredicate(e) : e;
          }
          tsParseNonArrayType() {
            switch (this.state.type) {
              case 129:
              case 130:
              case 131:
              case 85:
              case 86:
                return this.tsParseLiteralTypeNode();
              case 53:
                if (this.state.value === "-") {
                  let e = this.startNode(), s = this.lookahead();
                  if (s.type !== 130 && s.type !== 131)
                    throw this.unexpected();
                  return e.literal = this.parseMaybeUnary(), this.finishNode(e, "TSLiteralType");
                }
                break;
              case 78:
                return this.tsParseThisTypeOrThisTypePredicate();
              case 87:
                return this.tsParseTypeQuery();
              case 83:
                return this.tsParseImportType();
              case 5:
                return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();
              case 0:
                return this.tsParseTupleType();
              case 10:
                return this.tsParseParenthesizedType();
              case 25:
              case 24:
                return this.tsParseTemplateLiteralType();
              default: {
                let { type: e } = this.state;
                if (oe(e) || e === 88 || e === 84) {
                  let s = e === 88 ? "TSVoidKeyword" : e === 84 ? "TSNullKeyword" : zn(this.state.value);
                  if (s !== void 0 && this.lookaheadCharCode() !== 46) {
                    let r = this.startNode();
                    return this.next(), this.finishNode(r, s);
                  }
                  return this.tsParseTypeReference();
                }
              }
            }
            throw this.unexpected();
          }
          tsParseArrayTypeOrHigher() {
            let e = this.tsParseNonArrayType();
            for (; !this.hasPrecedingLineBreak() && this.eat(0); )
              if (this.match(3)) {
                let s = this.startNodeAtNode(e);
                s.elementType = e, this.expect(3), e = this.finishNode(s, "TSArrayType");
              } else {
                let s = this.startNodeAtNode(e);
                s.objectType = e, s.indexType = this.tsParseType(), this.expect(3), e = this.finishNode(s, "TSIndexedAccessType");
              }
            return e;
          }
          tsParseTypeOperator() {
            let e = this.startNode(), s = this.state.value;
            return this.next(), e.operator = s, e.typeAnnotation = this.tsParseTypeOperatorOrHigher(), s === "readonly" && this.tsCheckTypeAnnotationForReadOnly(e), this.finishNode(e, "TSTypeOperator");
          }
          tsCheckTypeAnnotationForReadOnly(e) {
            switch (e.typeAnnotation.type) {
              case "TSTupleType":
              case "TSArrayType":
                return;
              default:
                this.raise(R.UnexpectedReadonly, { at: e });
            }
          }
          tsParseInferType() {
            let e = this.startNode();
            this.expectContextual(112);
            let s = this.startNode();
            return s.name = this.tsParseTypeParameterName(), s.constraint = this.tsTryParse(() => this.tsParseConstraintForInferType()), e.typeParameter = this.finishNode(s, "TSTypeParameter"), this.finishNode(e, "TSInferType");
          }
          tsParseConstraintForInferType() {
            if (this.eat(81)) {
              let e = this.tsInDisallowConditionalTypesContext(() => this.tsParseType());
              if (this.state.inDisallowConditionalTypesContext || !this.match(17))
                return e;
            }
          }
          tsParseTypeOperatorOrHigher() {
            return La(this.state.type) && !this.state.containsEsc ? this.tsParseTypeOperator() : this.isContextual(112) ? this.tsParseInferType() : this.tsInAllowConditionalTypesContext(() => this.tsParseArrayTypeOrHigher());
          }
          tsParseUnionOrIntersectionType(e, s, r) {
            let i = this.startNode(), a = this.eat(r), n = [];
            do
              n.push(s());
            while (this.eat(r));
            return n.length === 1 && !a ? n[0] : (i.types = n, this.finishNode(i, e));
          }
          tsParseIntersectionTypeOrHigher() {
            return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), 45);
          }
          tsParseUnionTypeOrHigher() {
            return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), 43);
          }
          tsIsStartOfFunctionType() {
            return this.match(47) ? !0 : this.match(10) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this));
          }
          tsSkipParameterStart() {
            if (oe(this.state.type) || this.match(78))
              return this.next(), !0;
            if (this.match(5)) {
              let { errors: e } = this.state, s = e.length;
              try {
                return this.parseObjectLike(8, !0), e.length === s;
              } catch {
                return !1;
              }
            }
            if (this.match(0)) {
              this.next();
              let { errors: e } = this.state, s = e.length;
              try {
                return this.parseBindingList(3, 93, !0), e.length === s;
              } catch {
                return !1;
              }
            }
            return !1;
          }
          tsIsUnambiguouslyStartOfFunctionType() {
            return this.next(), !!(this.match(11) || this.match(21) || this.tsSkipParameterStart() && (this.match(14) || this.match(12) || this.match(17) || this.match(29) || this.match(11) && (this.next(), this.match(19))));
          }
          tsParseTypeOrTypePredicateAnnotation(e) {
            return this.tsInType(() => {
              let s = this.startNode();
              this.expect(e);
              let r = this.startNode(), i = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
              if (i && this.match(78)) {
                let o = this.tsParseThisTypeOrThisTypePredicate();
                return o.type === "TSThisType" ? (r.parameterName = o, r.asserts = !0, r.typeAnnotation = null, o = this.finishNode(r, "TSTypePredicate")) : (this.resetStartLocationFromNode(o, r), o.asserts = !0), s.typeAnnotation = o, this.finishNode(s, "TSTypeAnnotation");
              }
              let a = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
              if (!a)
                return i ? (r.parameterName = this.parseIdentifier(), r.asserts = i, r.typeAnnotation = null, s.typeAnnotation = this.finishNode(r, "TSTypePredicate"), this.finishNode(s, "TSTypeAnnotation")) : this.tsParseTypeAnnotation(!1, s);
              let n = this.tsParseTypeAnnotation(!1);
              return r.parameterName = a, r.typeAnnotation = n, r.asserts = i, s.typeAnnotation = this.finishNode(r, "TSTypePredicate"), this.finishNode(s, "TSTypeAnnotation");
            });
          }
          tsTryParseTypeOrTypePredicateAnnotation() {
            return this.match(14) ? this.tsParseTypeOrTypePredicateAnnotation(14) : void 0;
          }
          tsTryParseTypeAnnotation() {
            return this.match(14) ? this.tsParseTypeAnnotation() : void 0;
          }
          tsTryParseType() {
            return this.tsEatThenParseType(14);
          }
          tsParseTypePredicatePrefix() {
            let e = this.parseIdentifier();
            if (this.isContextual(113) && !this.hasPrecedingLineBreak())
              return this.next(), e;
          }
          tsParseTypePredicateAsserts() {
            if (this.state.type !== 106)
              return !1;
            let e = this.state.containsEsc;
            return this.next(), !oe(this.state.type) && !this.match(78) ? !1 : (e && this.raise(h.InvalidEscapedReservedWord, { at: this.state.lastTokStartLoc, reservedWord: "asserts" }), !0);
          }
          tsParseTypeAnnotation() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.startNode();
            return this.tsInType(() => {
              e && this.expect(14), s.typeAnnotation = this.tsParseType();
            }), this.finishNode(s, "TSTypeAnnotation");
          }
          tsParseType() {
            Wr(this.state.inType);
            let e = this.tsParseNonConditionalType();
            if (this.state.inDisallowConditionalTypesContext || this.hasPrecedingLineBreak() || !this.eat(81))
              return e;
            let s = this.startNodeAtNode(e);
            return s.checkType = e, s.extendsType = this.tsInDisallowConditionalTypesContext(() => this.tsParseNonConditionalType()), this.expect(17), s.trueType = this.tsInAllowConditionalTypesContext(() => this.tsParseType()), this.expect(14), s.falseType = this.tsInAllowConditionalTypesContext(() => this.tsParseType()), this.finishNode(s, "TSConditionalType");
          }
          isAbstractConstructorSignature() {
            return this.isContextual(120) && this.lookahead().type === 77;
          }
          tsParseNonConditionalType() {
            return this.tsIsStartOfFunctionType() ? this.tsParseFunctionOrConstructorType("TSFunctionType") : this.match(77) ? this.tsParseFunctionOrConstructorType("TSConstructorType") : this.isAbstractConstructorSignature() ? this.tsParseFunctionOrConstructorType("TSConstructorType", !0) : this.tsParseUnionTypeOrHigher();
          }
          tsParseTypeAssertion() {
            this.getPluginOption("typescript", "disallowAmbiguousJSXLike") && this.raise(R.ReservedTypeAssertion, { at: this.state.startLoc });
            let e = this.startNode(), s = this.tsTryNextParseConstantContext();
            return e.typeAnnotation = s || this.tsNextThenParseType(), this.expect(48), e.expression = this.parseMaybeUnary(), this.finishNode(e, "TSTypeAssertion");
          }
          tsParseHeritageClause(e) {
            let s = this.state.startLoc, r = this.tsParseDelimitedList("HeritageClauseElement", () => {
              let i = this.startNode();
              return i.expression = this.tsParseEntityName(), this.match(47) && (i.typeParameters = this.tsParseTypeArguments()), this.finishNode(i, "TSExpressionWithTypeArguments");
            });
            return r.length || this.raise(R.EmptyHeritageClauseType, { at: s, token: e }), r;
          }
          tsParseInterfaceDeclaration(e) {
            let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            if (this.hasFollowingLineBreak())
              return null;
            this.expectContextual(125), s.declare && (e.declare = !0), oe(this.state.type) ? (e.id = this.parseIdentifier(), this.checkIdentifier(e.id, Ja)) : (e.id = null, this.raise(R.MissingInterfaceName, { at: this.state.startLoc })), e.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers.bind(this)), this.eat(81) && (e.extends = this.tsParseHeritageClause("extends"));
            let r = this.startNode();
            return r.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this)), e.body = this.finishNode(r, "TSInterfaceBody"), this.finishNode(e, "TSInterfaceDeclaration");
          }
          tsParseTypeAliasDeclaration(e) {
            return e.id = this.parseIdentifier(), this.checkIdentifier(e.id, Xa), e.typeAnnotation = this.tsInType(() => {
              if (e.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers.bind(this)), this.expect(29), this.isContextual(111) && this.lookahead().type !== 16) {
                let s = this.startNode();
                return this.next(), this.finishNode(s, "TSIntrinsicKeyword");
              }
              return this.tsParseType();
            }), this.semicolon(), this.finishNode(e, "TSTypeAliasDeclaration");
          }
          tsInNoContext(e) {
            let s = this.state.context;
            this.state.context = [s[0]];
            try {
              return e();
            } finally {
              this.state.context = s;
            }
          }
          tsInType(e) {
            let s = this.state.inType;
            this.state.inType = !0;
            try {
              return e();
            } finally {
              this.state.inType = s;
            }
          }
          tsInDisallowConditionalTypesContext(e) {
            let s = this.state.inDisallowConditionalTypesContext;
            this.state.inDisallowConditionalTypesContext = !0;
            try {
              return e();
            } finally {
              this.state.inDisallowConditionalTypesContext = s;
            }
          }
          tsInAllowConditionalTypesContext(e) {
            let s = this.state.inDisallowConditionalTypesContext;
            this.state.inDisallowConditionalTypesContext = !1;
            try {
              return e();
            } finally {
              this.state.inDisallowConditionalTypesContext = s;
            }
          }
          tsEatThenParseType(e) {
            return this.match(e) ? this.tsNextThenParseType() : void 0;
          }
          tsExpectThenParseType(e) {
            return this.tsDoThenParseType(() => this.expect(e));
          }
          tsNextThenParseType() {
            return this.tsDoThenParseType(() => this.next());
          }
          tsDoThenParseType(e) {
            return this.tsInType(() => (e(), this.tsParseType()));
          }
          tsParseEnumMember() {
            let e = this.startNode();
            return e.id = this.match(129) ? this.parseExprAtom() : this.parseIdentifier(!0), this.eat(29) && (e.initializer = this.parseMaybeAssignAllowIn()), this.finishNode(e, "TSEnumMember");
          }
          tsParseEnumDeclaration(e) {
            let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return s.const && (e.const = !0), s.declare && (e.declare = !0), this.expectContextual(122), e.id = this.parseIdentifier(), this.checkIdentifier(e.id, e.const ? Ya : Lr), this.expect(5), e.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this)), this.expect(8), this.finishNode(e, "TSEnumDeclaration");
          }
          tsParseModuleBlock() {
            let e = this.startNode();
            return this.scope.enter(rt), this.expect(5), this.parseBlockOrModuleBlockBody(e.body = [], void 0, !0, 8), this.scope.exit(), this.finishNode(e, "TSModuleBlock");
          }
          tsParseModuleOrNamespaceDeclaration(e) {
            let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
            if (e.id = this.parseIdentifier(), s || this.checkIdentifier(e.id, Qa), this.eat(16)) {
              let r = this.startNode();
              this.tsParseModuleOrNamespaceDeclaration(r, !0), e.body = r;
            } else
              this.scope.enter(vt), this.prodParam.enter(at), e.body = this.tsParseModuleBlock(), this.prodParam.exit(), this.scope.exit();
            return this.finishNode(e, "TSModuleDeclaration");
          }
          tsParseAmbientExternalModuleDeclaration(e) {
            return this.isContextual(109) ? (e.global = !0, e.id = this.parseIdentifier()) : this.match(129) ? e.id = this.parseExprAtom() : this.unexpected(), this.match(5) ? (this.scope.enter(vt), this.prodParam.enter(at), e.body = this.tsParseModuleBlock(), this.prodParam.exit(), this.scope.exit()) : this.semicolon(), this.finishNode(e, "TSModuleDeclaration");
          }
          tsParseImportEqualsDeclaration(e, s) {
            e.isExport = s || !1, e.id = this.parseIdentifier(), this.checkIdentifier(e.id, ze), this.expect(29);
            let r = this.tsParseModuleReference();
            return e.importKind === "type" && r.type !== "TSExternalModuleReference" && this.raise(R.ImportAliasHasImportType, { at: r }), e.moduleReference = r, this.semicolon(), this.finishNode(e, "TSImportEqualsDeclaration");
          }
          tsIsExternalModuleReference() {
            return this.isContextual(116) && this.lookaheadCharCode() === 40;
          }
          tsParseModuleReference() {
            return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(!1);
          }
          tsParseExternalModuleReference() {
            let e = this.startNode();
            if (this.expectContextual(116), this.expect(10), !this.match(129))
              throw this.unexpected();
            return e.expression = this.parseExprAtom(), this.expect(11), this.finishNode(e, "TSExternalModuleReference");
          }
          tsLookAhead(e) {
            let s = this.state.clone(), r = e();
            return this.state = s, r;
          }
          tsTryParseAndCatch(e) {
            let s = this.tryParse((r) => e() || r());
            if (!(s.aborted || !s.node))
              return s.error && (this.state = s.failState), s.node;
          }
          tsTryParse(e) {
            let s = this.state.clone(), r = e();
            if (r !== void 0 && r !== !1)
              return r;
            this.state = s;
          }
          tsTryParseDeclare(e) {
            if (this.isLineTerminator())
              return;
            let s = this.state.type, r;
            return this.isContextual(99) && (s = 74, r = "let"), this.tsInAmbientContext(() => {
              if (s === 68)
                return e.declare = !0, this.parseFunctionStatement(e, !1, !0);
              if (s === 80)
                return e.declare = !0, this.parseClass(e, !0, !1);
              if (s === 122)
                return this.tsParseEnumDeclaration(e, { declare: !0 });
              if (s === 109)
                return this.tsParseAmbientExternalModuleDeclaration(e);
              if (s === 75 || s === 74)
                return !this.match(75) || !this.isLookaheadContextual("enum") ? (e.declare = !0, this.parseVarStatement(e, r || this.state.value, !0)) : (this.expect(75), this.tsParseEnumDeclaration(e, { const: !0, declare: !0 }));
              if (s === 125) {
                let i = this.tsParseInterfaceDeclaration(e, { declare: !0 });
                if (i)
                  return i;
              }
              if (oe(s))
                return this.tsParseDeclaration(e, this.state.value, !0);
            });
          }
          tsTryParseExportDeclaration() {
            return this.tsParseDeclaration(this.startNode(), this.state.value, !0);
          }
          tsParseExpressionStatement(e, s) {
            switch (s.name) {
              case "declare": {
                let r = this.tsTryParseDeclare(e);
                if (r)
                  return r.declare = !0, r;
                break;
              }
              case "global":
                if (this.match(5)) {
                  this.scope.enter(vt), this.prodParam.enter(at);
                  let r = e;
                  return r.global = !0, r.id = s, r.body = this.tsParseModuleBlock(), this.scope.exit(), this.prodParam.exit(), this.finishNode(r, "TSModuleDeclaration");
                }
                break;
              default:
                return this.tsParseDeclaration(e, s.name, !1);
            }
          }
          tsParseDeclaration(e, s, r) {
            switch (s) {
              case "abstract":
                if (this.tsCheckLineTerminator(r) && (this.match(80) || oe(this.state.type)))
                  return this.tsParseAbstractDeclaration(e);
                break;
              case "module":
                if (this.tsCheckLineTerminator(r)) {
                  if (this.match(129))
                    return this.tsParseAmbientExternalModuleDeclaration(e);
                  if (oe(this.state.type))
                    return this.tsParseModuleOrNamespaceDeclaration(e);
                }
                break;
              case "namespace":
                if (this.tsCheckLineTerminator(r) && oe(this.state.type))
                  return this.tsParseModuleOrNamespaceDeclaration(e);
                break;
              case "type":
                if (this.tsCheckLineTerminator(r) && oe(this.state.type))
                  return this.tsParseTypeAliasDeclaration(e);
                break;
            }
          }
          tsCheckLineTerminator(e) {
            return e ? this.hasFollowingLineBreak() ? !1 : (this.next(), !0) : !this.isLineTerminator();
          }
          tsTryParseGenericAsyncArrowFunction(e, s) {
            if (!this.match(47))
              return;
            let r = this.state.maybeInArrowParameters;
            this.state.maybeInArrowParameters = !0;
            let i = this.tsTryParseAndCatch(() => {
              let a = this.startNodeAt(e, s);
              return a.typeParameters = this.tsParseTypeParameters(), super.parseFunctionParams(a), a.returnType = this.tsTryParseTypeOrTypePredicateAnnotation(), this.expect(19), a;
            });
            if (this.state.maybeInArrowParameters = r, !!i)
              return this.parseArrowExpression(i, null, !0);
          }
          tsParseTypeArgumentsInExpression() {
            if (this.reScan_lt() === 47)
              return this.tsParseTypeArguments();
          }
          tsParseTypeArguments() {
            let e = this.startNode();
            return e.params = this.tsInType(() => this.tsInNoContext(() => (this.expect(47), this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this))))), e.params.length === 0 && this.raise(R.EmptyTypeArguments, { at: e }), this.expect(48), this.finishNode(e, "TSTypeParameterInstantiation");
          }
          tsIsDeclarationStart() {
            return Ba(this.state.type);
          }
          isExportDefaultSpecifier() {
            return this.tsIsDeclarationStart() ? !1 : super.isExportDefaultSpecifier();
          }
          parseAssignableListItem(e, s) {
            let r = this.state.start, i = this.state.startLoc, a, n = !1, o = !1;
            if (e !== void 0) {
              let y = {};
              this.tsParseModifiers({ modified: y, allowedModifiers: ["public", "private", "protected", "override", "readonly"] }), a = y.accessibility, o = y.override, n = y.readonly, e === !1 && (a || n || o) && this.raise(R.UnexpectedParameterModifier, { at: i });
            }
            let l = this.parseMaybeDefault();
            this.parseAssignableListItemTypes(l);
            let p = this.parseMaybeDefault(l.start, l.loc.start, l);
            if (a || n || o) {
              let y = this.startNodeAt(r, i);
              return s.length && (y.decorators = s), a && (y.accessibility = a), n && (y.readonly = n), o && (y.override = o), p.type !== "Identifier" && p.type !== "AssignmentPattern" && this.raise(R.UnsupportedParameterPropertyKind, { at: y }), y.parameter = p, this.finishNode(y, "TSParameterProperty");
            }
            return s.length && (l.decorators = s), p;
          }
          isSimpleParameter(e) {
            return e.type === "TSParameterProperty" && super.isSimpleParameter(e.parameter) || super.isSimpleParameter(e);
          }
          parseFunctionBodyAndFinish(e, s) {
            let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            this.match(14) && (e.returnType = this.tsParseTypeOrTypePredicateAnnotation(14));
            let i = s === "FunctionDeclaration" ? "TSDeclareFunction" : s === "ClassMethod" || s === "ClassPrivateMethod" ? "TSDeclareMethod" : void 0;
            if (i && !this.match(5) && this.isLineTerminator()) {
              this.finishNode(e, i);
              return;
            }
            if (i === "TSDeclareFunction" && this.state.isAmbientContext && (this.raise(R.DeclareFunctionHasImplementation, { at: e }), e.declare)) {
              super.parseFunctionBodyAndFinish(e, i, r);
              return;
            }
            super.parseFunctionBodyAndFinish(e, s, r);
          }
          registerFunctionStatementId(e) {
            !e.body && e.id ? this.checkIdentifier(e.id, Br) : super.registerFunctionStatementId(...arguments);
          }
          tsCheckForInvalidTypeCasts(e) {
            e.forEach((s) => {
              (s == null ? void 0 : s.type) === "TSTypeCastExpression" && this.raise(R.UnexpectedTypeAnnotation, { at: s.typeAnnotation });
            });
          }
          toReferencedList(e, s) {
            return this.tsCheckForInvalidTypeCasts(e), e;
          }
          parseArrayLike() {
            let e = super.parseArrayLike(...arguments);
            return e.type === "ArrayExpression" && this.tsCheckForInvalidTypeCasts(e.elements), e;
          }
          parseSubscript(e, s, r, i, a) {
            if (!this.hasPrecedingLineBreak() && this.match(35)) {
              this.state.canStartJSXElement = !1, this.next();
              let o = this.startNodeAt(s, r);
              return o.expression = e, this.finishNode(o, "TSNonNullExpression");
            }
            let n = !1;
            if (this.match(18) && this.lookaheadCharCode() === 60) {
              if (i)
                return a.stop = !0, e;
              a.optionalChainMember = n = !0, this.next();
            }
            if (this.match(47) || this.match(51)) {
              let o, l = this.tsTryParseAndCatch(() => {
                if (!i && this.atPossibleAsyncArrow(e)) {
                  let S = this.tsTryParseGenericAsyncArrowFunction(s, r);
                  if (S)
                    return S;
                }
                let p = this.tsParseTypeArgumentsInExpression();
                if (!p)
                  throw this.unexpected();
                if (n && !this.match(10))
                  throw o = this.state.curPosition(), this.unexpected();
                if (Ct(this.state.type)) {
                  let S = this.parseTaggedTemplateExpression(e, s, r, a);
                  return S.typeParameters = p, S;
                }
                if (!i && this.eat(10)) {
                  let S = this.startNodeAt(s, r);
                  return S.callee = e, S.arguments = this.parseCallExpressionArguments(11, !1), this.tsCheckForInvalidTypeCasts(S.arguments), S.typeParameters = p, a.optionalChainMember && (S.optional = n), this.finishCallExpression(S, a.optionalChainMember);
                }
                if (_n(this.state.type) && this.state.type !== 10)
                  throw this.unexpected();
                let y = this.startNodeAt(s, r);
                return y.expression = e, y.typeParameters = p, this.finishNode(y, "TSInstantiationExpression");
              });
              if (o && this.unexpected(o, 10), l)
                return l;
            }
            return super.parseSubscript(e, s, r, i, a);
          }
          parseNewCallee(e) {
            var s;
            super.parseNewCallee(e);
            let { callee: r } = e;
            r.type === "TSInstantiationExpression" && !((s = r.extra) != null && s.parenthesized) && (e.typeParameters = r.typeParameters, e.callee = r.expression);
          }
          parseExprOp(e, s, r, i) {
            if (Et(58) > i && !this.hasPrecedingLineBreak() && this.isContextual(93)) {
              let a = this.startNodeAt(s, r);
              a.expression = e;
              let n = this.tsTryNextParseConstantContext();
              return n ? a.typeAnnotation = n : a.typeAnnotation = this.tsNextThenParseType(), this.finishNode(a, "TSAsExpression"), this.reScan_lt_gt(), this.parseExprOp(a, s, r, i);
            }
            return super.parseExprOp(e, s, r, i);
          }
          checkReservedWord(e, s, r, i) {
            this.state.isAmbientContext || super.checkReservedWord(e, s, r, i);
          }
          checkDuplicateExports() {
          }
          parseImport(e) {
            if (e.importKind = "value", oe(this.state.type) || this.match(55) || this.match(5)) {
              let r = this.lookahead();
              if (this.isContextual(126) && r.type !== 12 && r.type !== 97 && r.type !== 29 && (e.importKind = "type", this.next(), r = this.lookahead()), oe(this.state.type) && r.type === 29)
                return this.tsParseImportEqualsDeclaration(e);
            }
            let s = super.parseImport(e);
            return s.importKind === "type" && s.specifiers.length > 1 && s.specifiers[0].type === "ImportDefaultSpecifier" && this.raise(R.TypeImportCannotSpecifyDefaultAndNamed, { at: s }), s;
          }
          parseExport(e) {
            if (this.match(83))
              return this.next(), this.isContextual(126) && this.lookaheadCharCode() !== 61 ? (e.importKind = "type", this.next()) : e.importKind = "value", this.tsParseImportEqualsDeclaration(e, !0);
            if (this.eat(29)) {
              let s = e;
              return s.expression = this.parseExpression(), this.semicolon(), this.finishNode(s, "TSExportAssignment");
            } else if (this.eatContextual(93)) {
              let s = e;
              return this.expectContextual(124), s.id = this.parseIdentifier(), this.semicolon(), this.finishNode(s, "TSNamespaceExportDeclaration");
            } else
              return this.isContextual(126) && this.lookahead().type === 5 ? (this.next(), e.exportKind = "type") : e.exportKind = "value", super.parseExport(e);
          }
          isAbstractClass() {
            return this.isContextual(120) && this.lookahead().type === 80;
          }
          parseExportDefaultExpression() {
            if (this.isAbstractClass()) {
              let e = this.startNode();
              return this.next(), e.abstract = !0, this.parseClass(e, !0, !0), e;
            }
            if (this.match(125)) {
              let e = this.tsParseInterfaceDeclaration(this.startNode());
              if (e)
                return e;
            }
            return super.parseExportDefaultExpression();
          }
          parseVarStatement(e, s) {
            let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, { isAmbientContext: i } = this.state, a = super.parseVarStatement(e, s, r || i);
            if (!i)
              return a;
            for (let { id: n, init: o } of a.declarations)
              !o || (s !== "const" || !!n.typeAnnotation ? this.raise(R.InitializerNotAllowedInAmbientContext, { at: o }) : o.type !== "StringLiteral" && o.type !== "BooleanLiteral" && o.type !== "NumericLiteral" && o.type !== "BigIntLiteral" && (o.type !== "TemplateLiteral" || o.expressions.length > 0) && !qn(o) && this.raise(R.ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference, { at: o }));
            return a;
          }
          parseStatementContent(e, s) {
            if (this.match(75) && this.isLookaheadContextual("enum")) {
              let r = this.startNode();
              return this.expect(75), this.tsParseEnumDeclaration(r, { const: !0 });
            }
            if (this.isContextual(122))
              return this.tsParseEnumDeclaration(this.startNode());
            if (this.isContextual(125)) {
              let r = this.tsParseInterfaceDeclaration(this.startNode());
              if (r)
                return r;
            }
            return super.parseStatementContent(e, s);
          }
          parseAccessModifier() {
            return this.tsParseModifier(["public", "protected", "private"]);
          }
          tsHasSomeModifiers(e, s) {
            return s.some((r) => Jr(r) ? e.accessibility === r : !!e[r]);
          }
          tsIsStartOfStaticBlocks() {
            return this.isContextual(104) && this.lookaheadCharCode() === 123;
          }
          parseClassMember(e, s, r) {
            let i = ["declare", "private", "public", "protected", "override", "abstract", "readonly", "static"];
            this.tsParseModifiers({ modified: s, allowedModifiers: i, disallowedModifiers: ["in", "out"], stopOnStartOfClassStaticBlock: !0, errorTemplate: R.InvalidModifierOnTypeParameterPositions });
            let a = () => {
              this.tsIsStartOfStaticBlocks() ? (this.next(), this.next(), this.tsHasSomeModifiers(s, i) && this.raise(R.StaticBlockCannotHaveModifier, { at: this.state.curPosition() }), this.parseClassStaticBlock(e, s)) : this.parseClassMemberWithIsStatic(e, s, r, !!s.static);
            };
            s.declare ? this.tsInAmbientContext(a) : a();
          }
          parseClassMemberWithIsStatic(e, s, r, i) {
            let a = this.tsTryParseIndexSignature(s);
            if (a) {
              e.body.push(a), s.abstract && this.raise(R.IndexSignatureHasAbstract, { at: s }), s.accessibility && this.raise(R.IndexSignatureHasAccessibility, { at: s, modifier: s.accessibility }), s.declare && this.raise(R.IndexSignatureHasDeclare, { at: s }), s.override && this.raise(R.IndexSignatureHasOverride, { at: s });
              return;
            }
            !this.state.inAbstractClass && s.abstract && this.raise(R.NonAbstractClassHasAbstractMethod, { at: s }), s.override && (r.hadSuperClass || this.raise(R.OverrideNotInSubClass, { at: s })), super.parseClassMemberWithIsStatic(e, s, r, i);
          }
          parsePostMemberNameModifiers(e) {
            this.eat(17) && (e.optional = !0), e.readonly && this.match(10) && this.raise(R.ClassMethodHasReadonly, { at: e }), e.declare && this.match(10) && this.raise(R.ClassMethodHasDeclare, { at: e });
          }
          parseExpressionStatement(e, s) {
            return (s.type === "Identifier" ? this.tsParseExpressionStatement(e, s) : void 0) || super.parseExpressionStatement(e, s);
          }
          shouldParseExportDeclaration() {
            return this.tsIsDeclarationStart() ? !0 : super.shouldParseExportDeclaration();
          }
          parseConditional(e, s, r, i) {
            if (!this.state.maybeInArrowParameters || !this.match(17))
              return super.parseConditional(e, s, r, i);
            let a = this.tryParse(() => super.parseConditional(e, s, r));
            return a.node ? (a.error && (this.state = a.failState), a.node) : (a.error && super.setOptionalParametersError(i, a.error), e);
          }
          parseParenItem(e, s, r) {
            if (e = super.parseParenItem(e, s, r), this.eat(17) && (e.optional = !0, this.resetEndLocation(e)), this.match(14)) {
              let i = this.startNodeAt(s, r);
              return i.expression = e, i.typeAnnotation = this.tsParseTypeAnnotation(), this.finishNode(i, "TSTypeCastExpression");
            }
            return e;
          }
          parseExportDeclaration(e) {
            if (!this.state.isAmbientContext && this.isContextual(121))
              return this.tsInAmbientContext(() => this.parseExportDeclaration(e));
            let s = this.state.start, r = this.state.startLoc, i = this.eatContextual(121);
            if (i && (this.isContextual(121) || !this.shouldParseExportDeclaration()))
              throw this.raise(R.ExpectedAmbientAfterExportDeclare, { at: this.state.startLoc });
            let a = oe(this.state.type) && this.tsTryParseExportDeclaration() || super.parseExportDeclaration(e);
            return a ? ((a.type === "TSInterfaceDeclaration" || a.type === "TSTypeAliasDeclaration" || i) && (e.exportKind = "type"), i && (this.resetStartLocation(a, s, r), a.declare = !0), a) : null;
          }
          parseClassId(e, s, r) {
            if ((!s || r) && this.isContextual(110))
              return;
            super.parseClassId(e, s, r, e.declare ? Br : Dr);
            let i = this.tsTryParseTypeParameters(this.tsParseInOutModifiers.bind(this));
            i && (e.typeParameters = i);
          }
          parseClassPropertyAnnotation(e) {
            !e.optional && this.eat(35) && (e.definite = !0);
            let s = this.tsTryParseTypeAnnotation();
            s && (e.typeAnnotation = s);
          }
          parseClassProperty(e) {
            if (this.parseClassPropertyAnnotation(e), this.state.isAmbientContext && this.match(29) && this.raise(R.DeclareClassFieldHasInitializer, { at: this.state.startLoc }), e.abstract && this.match(29)) {
              let { key: s } = e;
              this.raise(R.AbstractPropertyHasInitializer, { at: this.state.startLoc, propertyName: s.type === "Identifier" && !e.computed ? s.name : "[".concat(this.input.slice(s.start, s.end), "]") });
            }
            return super.parseClassProperty(e);
          }
          parseClassPrivateProperty(e) {
            return e.abstract && this.raise(R.PrivateElementHasAbstract, { at: e }), e.accessibility && this.raise(R.PrivateElementHasAccessibility, { at: e, modifier: e.accessibility }), this.parseClassPropertyAnnotation(e), super.parseClassPrivateProperty(e);
          }
          pushClassMethod(e, s, r, i, a, n) {
            let o = this.tsTryParseTypeParameters();
            o && a && this.raise(R.ConstructorHasTypeParameters, { at: o });
            let { declare: l = !1, kind: p } = s;
            l && (p === "get" || p === "set") && this.raise(R.DeclareAccessor, { at: s, kind: p }), o && (s.typeParameters = o), super.pushClassMethod(e, s, r, i, a, n);
          }
          pushClassPrivateMethod(e, s, r, i) {
            let a = this.tsTryParseTypeParameters();
            a && (s.typeParameters = a), super.pushClassPrivateMethod(e, s, r, i);
          }
          declareClassPrivateMethodInScope(e, s) {
            e.type !== "TSDeclareMethod" && (e.type === "MethodDefinition" && !e.value.body || super.declareClassPrivateMethodInScope(e, s));
          }
          parseClassSuper(e) {
            super.parseClassSuper(e), e.superClass && (this.match(47) || this.match(51)) && (e.superTypeParameters = this.tsParseTypeArgumentsInExpression()), this.eatContextual(110) && (e.implements = this.tsParseHeritageClause("implements"));
          }
          parseObjPropValue(e) {
            let s = this.tsTryParseTypeParameters();
            s && (e.typeParameters = s);
            for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
              i[a - 1] = arguments[a];
            super.parseObjPropValue(e, ...i);
          }
          parseFunctionParams(e, s) {
            let r = this.tsTryParseTypeParameters();
            r && (e.typeParameters = r), super.parseFunctionParams(e, s);
          }
          parseVarId(e, s) {
            super.parseVarId(e, s), e.id.type === "Identifier" && !this.hasPrecedingLineBreak() && this.eat(35) && (e.definite = !0);
            let r = this.tsTryParseTypeAnnotation();
            r && (e.id.typeAnnotation = r, this.resetEndLocation(e.id));
          }
          parseAsyncArrowFromCallExpression(e, s) {
            return this.match(14) && (e.returnType = this.tsParseTypeAnnotation()), super.parseAsyncArrowFromCallExpression(e, s);
          }
          parseMaybeAssign() {
            for (var e = arguments.length, s = new Array(e), r = 0; r < e; r++)
              s[r] = arguments[r];
            var i, a, n, o, l, p, y;
            let S, B, z;
            if (this.hasPlugin("jsx") && (this.match(138) || this.match(47))) {
              if (S = this.state.clone(), B = this.tryParse(() => super.parseMaybeAssign(...s), S), !B.error)
                return B.node;
              let { context: fe } = this.state, we = fe[fe.length - 1];
              (we === ne.j_oTag || we === ne.j_expr) && fe.pop();
            }
            if (!((i = B) != null && i.error) && !this.match(47))
              return super.parseMaybeAssign(...s);
            let $;
            S = S || this.state.clone();
            let ae = this.tryParse((fe) => {
              var we, Ne, gt;
              $ = this.tsParseTypeParameters();
              let Fe = super.parseMaybeAssign(...s);
              return (Fe.type !== "ArrowFunctionExpression" || (we = Fe.extra) != null && we.parenthesized) && fe(), ((Ne = $) == null ? void 0 : Ne.params.length) !== 0 && this.resetStartLocationFromNode(Fe, $), Fe.typeParameters = $, this.hasPlugin("jsx") && Fe.typeParameters.params.length === 1 && !((gt = Fe.typeParameters.extra) != null && gt.trailingComma) && Fe.typeParameters.params[0].constraint, Fe;
            }, S);
            if (!ae.error && !ae.aborted)
              return $ && this.reportReservedArrowTypeParam($), ae.node;
            if (!B && (Wr(!this.hasPlugin("jsx")), z = this.tryParse(() => super.parseMaybeAssign(...s), S), !z.error))
              return z.node;
            if ((a = B) != null && a.node)
              return this.state = B.failState, B.node;
            if (ae.node)
              return this.state = ae.failState, $ && this.reportReservedArrowTypeParam($), ae.node;
            if ((n = z) != null && n.node)
              return this.state = z.failState, z.node;
            throw (o = B) != null && o.thrown ? B.error : ae.thrown ? ae.error : (l = z) != null && l.thrown ? z.error : ((p = B) == null ? void 0 : p.error) || ae.error || ((y = z) == null ? void 0 : y.error);
          }
          reportReservedArrowTypeParam(e) {
            var s;
            e.params.length === 1 && !((s = e.extra) != null && s.trailingComma) && this.getPluginOption("typescript", "disallowAmbiguousJSXLike") && this.raise(R.ReservedArrowTypeParam, { at: e });
          }
          parseMaybeUnary(e) {
            return !this.hasPlugin("jsx") && this.match(47) ? this.tsParseTypeAssertion() : super.parseMaybeUnary(e);
          }
          parseArrow(e) {
            if (this.match(14)) {
              let s = this.tryParse((r) => {
                let i = this.tsParseTypeOrTypePredicateAnnotation(14);
                return (this.canInsertSemicolon() || !this.match(19)) && r(), i;
              });
              if (s.aborted)
                return;
              s.thrown || (s.error && (this.state = s.failState), e.returnType = s.node);
            }
            return super.parseArrow(e);
          }
          parseAssignableListItemTypes(e) {
            this.eat(17) && (e.type !== "Identifier" && !this.state.isAmbientContext && !this.state.inType && this.raise(R.PatternIsOptional, { at: e }), e.optional = !0);
            let s = this.tsTryParseTypeAnnotation();
            return s && (e.typeAnnotation = s), this.resetEndLocation(e), e;
          }
          isAssignable(e, s) {
            switch (e.type) {
              case "TSTypeCastExpression":
                return this.isAssignable(e.expression, s);
              case "TSParameterProperty":
                return !0;
              default:
                return super.isAssignable(e, s);
            }
          }
          toAssignable(e) {
            let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
            switch (e.type) {
              case "ParenthesizedExpression":
                this.toAssignableParenthesizedExpression(e, s);
                break;
              case "TSAsExpression":
              case "TSNonNullExpression":
              case "TSTypeAssertion":
                s ? this.expressionScope.recordArrowParemeterBindingError(R.UnexpectedTypeCastInParameter, { at: e }) : this.raise(R.UnexpectedTypeCastInParameter, { at: e }), this.toAssignable(e.expression, s);
                break;
              case "AssignmentExpression":
                !s && e.left.type === "TSTypeCastExpression" && (e.left = this.typeCastToParameter(e.left));
              default:
                super.toAssignable(e, s);
            }
          }
          toAssignableParenthesizedExpression(e, s) {
            switch (e.expression.type) {
              case "TSAsExpression":
              case "TSNonNullExpression":
              case "TSTypeAssertion":
              case "ParenthesizedExpression":
                this.toAssignable(e.expression, s);
                break;
              default:
                super.toAssignable(e, s);
            }
          }
          checkToRestConversion(e, s) {
            switch (e.type) {
              case "TSAsExpression":
              case "TSTypeAssertion":
              case "TSNonNullExpression":
                this.checkToRestConversion(e.expression, !1);
                break;
              default:
                super.checkToRestConversion(e, s);
            }
          }
          isValidLVal(e, s, r) {
            return Rn({ TSTypeCastExpression: !0, TSParameterProperty: "parameter", TSNonNullExpression: "expression", TSAsExpression: (r !== Ge || !s) && ["expression", !0], TSTypeAssertion: (r !== Ge || !s) && ["expression", !0] }, e) || super.isValidLVal(e, s, r);
          }
          parseBindingAtom() {
            switch (this.state.type) {
              case 78:
                return this.parseIdentifier(!0);
              default:
                return super.parseBindingAtom();
            }
          }
          parseMaybeDecoratorArguments(e) {
            if (this.match(47) || this.match(51)) {
              let s = this.tsParseTypeArgumentsInExpression();
              if (this.match(10)) {
                let r = super.parseMaybeDecoratorArguments(e);
                return r.typeParameters = s, r;
              }
              this.unexpected(null, 10);
            }
            return super.parseMaybeDecoratorArguments(e);
          }
          checkCommaAfterRest(e) {
            return this.state.isAmbientContext && this.match(12) && this.lookaheadCharCode() === e ? (this.next(), !1) : super.checkCommaAfterRest(e);
          }
          isClassMethod() {
            return this.match(47) || super.isClassMethod();
          }
          isClassProperty() {
            return this.match(35) || this.match(14) || super.isClassProperty();
          }
          parseMaybeDefault() {
            let e = super.parseMaybeDefault(...arguments);
            return e.type === "AssignmentPattern" && e.typeAnnotation && e.right.start < e.typeAnnotation.start && this.raise(R.TypeAnnotationAfterAssign, { at: e.typeAnnotation }), e;
          }
          getTokenFromCode(e) {
            if (this.state.inType) {
              if (e === 62)
                return this.finishOp(48, 1);
              if (e === 60)
                return this.finishOp(47, 1);
            }
            return super.getTokenFromCode(e);
          }
          reScan_lt_gt() {
            let { type: e } = this.state;
            e === 47 ? (this.state.pos -= 1, this.readToken_lt()) : e === 48 && (this.state.pos -= 1, this.readToken_gt());
          }
          reScan_lt() {
            let { type: e } = this.state;
            return e === 51 ? (this.state.pos -= 2, this.finishOp(47, 1), 47) : e;
          }
          toAssignableList(e) {
            for (let s = 0; s < e.length; s++) {
              let r = e[s];
              (r == null ? void 0 : r.type) === "TSTypeCastExpression" && (e[s] = this.typeCastToParameter(r));
            }
            super.toAssignableList(...arguments);
          }
          typeCastToParameter(e) {
            return e.expression.typeAnnotation = e.typeAnnotation, this.resetEndLocation(e.expression, e.typeAnnotation.loc.end), e.expression;
          }
          shouldParseArrow(e) {
            return this.match(14) ? e.every((s) => this.isAssignable(s, !0)) : super.shouldParseArrow(e);
          }
          shouldParseAsyncArrow() {
            return this.match(14) || super.shouldParseAsyncArrow();
          }
          canHaveLeadingDecorator() {
            return super.canHaveLeadingDecorator() || this.isAbstractClass();
          }
          jsxParseOpeningElementAfterName(e) {
            if (this.match(47) || this.match(51)) {
              let s = this.tsTryParseAndCatch(() => this.tsParseTypeArgumentsInExpression());
              s && (e.typeParameters = s);
            }
            return super.jsxParseOpeningElementAfterName(e);
          }
          getGetterSetterExpectedParamCount(e) {
            let s = super.getGetterSetterExpectedParamCount(e), r = this.getObjectOrClassMethodParams(e)[0];
            return r && this.isThisParam(r) ? s + 1 : s;
          }
          parseCatchClauseParam() {
            let e = super.parseCatchClauseParam(), s = this.tsTryParseTypeAnnotation();
            return s && (e.typeAnnotation = s, this.resetEndLocation(e)), e;
          }
          tsInAmbientContext(e) {
            let s = this.state.isAmbientContext;
            this.state.isAmbientContext = !0;
            try {
              return e();
            } finally {
              this.state.isAmbientContext = s;
            }
          }
          parseClass(e) {
            let s = this.state.inAbstractClass;
            this.state.inAbstractClass = !!e.abstract;
            try {
              for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
                i[a - 1] = arguments[a];
              return super.parseClass(e, ...i);
            } finally {
              this.state.inAbstractClass = s;
            }
          }
          tsParseAbstractDeclaration(e) {
            if (this.match(80))
              return e.abstract = !0, this.parseClass(e, !0, !1);
            if (this.isContextual(125)) {
              if (!this.hasFollowingLineBreak())
                return e.abstract = !0, this.raise(R.NonClassMethodPropertyHasAbstractModifer, { at: e }), this.tsParseInterfaceDeclaration(e);
            } else
              this.unexpected(null, 80);
          }
          parseMethod() {
            let e = super.parseMethod(...arguments);
            if (e.abstract && (this.hasPlugin("estree") ? !!e.value.body : !!e.body)) {
              let { key: s } = e;
              this.raise(R.AbstractMethodHasImplementation, { at: e, methodName: s.type === "Identifier" && !e.computed ? s.name : "[".concat(this.input.slice(s.start, s.end), "]") });
            }
            return e;
          }
          tsParseTypeParameterName() {
            return this.parseIdentifier().name;
          }
          shouldParseAsAmbientContext() {
            return !!this.getPluginOption("typescript", "dts");
          }
          parse() {
            return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = !0), super.parse();
          }
          getExpression() {
            return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = !0), super.getExpression();
          }
          parseExportSpecifier(e, s, r, i) {
            return !s && i ? (this.parseTypeOnlyImportExportSpecifier(e, !1, r), this.finishNode(e, "ExportSpecifier")) : (e.exportKind = "value", super.parseExportSpecifier(e, s, r, i));
          }
          parseImportSpecifier(e, s, r, i) {
            return !s && i ? (this.parseTypeOnlyImportExportSpecifier(e, !0, r), this.finishNode(e, "ImportSpecifier")) : (e.importKind = "value", super.parseImportSpecifier(e, s, r, i));
          }
          parseTypeOnlyImportExportSpecifier(e, s, r) {
            let i = s ? "imported" : "local", a = s ? "local" : "exported", n = e[i], o, l = !1, p = !0, y = n.loc.start;
            if (this.isContextual(93)) {
              let B = this.parseIdentifier();
              if (this.isContextual(93)) {
                let z = this.parseIdentifier();
                Oe(this.state.type) ? (l = !0, n = B, o = s ? this.parseIdentifier() : this.parseModuleExportName(), p = !1) : (o = z, p = !1);
              } else
                Oe(this.state.type) ? (p = !1, o = s ? this.parseIdentifier() : this.parseModuleExportName()) : (l = !0, n = B);
            } else
              Oe(this.state.type) && (l = !0, s ? (n = this.parseIdentifier(!0), this.isContextual(93) || this.checkReservedWord(n.name, n.loc.start, !0, !0)) : n = this.parseModuleExportName());
            l && r && this.raise(s ? R.TypeModifierIsUsedInTypeImports : R.TypeModifierIsUsedInTypeExports, { at: y }), e[i] = n, e[a] = o;
            let S = s ? "importKind" : "exportKind";
            e[S] = l ? "type" : "value", p && this.eatContextual(93) && (e[a] = s ? this.parseIdentifier() : this.parseModuleExportName()), e[a] || (e[a] = He(e[i])), s && this.checkIdentifier(e[a], ze);
          }
        };
        function qn(t) {
          if (t.type !== "MemberExpression")
            return !1;
          let { computed: e, property: s } = t;
          return e && s.type !== "StringLiteral" && (s.type !== "TemplateLiteral" || s.expressions.length > 0) ? !1 : Xr(t.object);
        }
        function Xr(t) {
          return t.type === "Identifier" ? !0 : t.type !== "MemberExpression" || t.computed ? !1 : Xr(t.object);
        }
        var Gr = Z(b || (b = T(["placeholders"])))((t) => ({ ClassNameIsRequired: t("A class name is required."), UnexpectedSpace: t("Unexpected space in placeholder.") })), Kn = (t) => class extends t {
          parsePlaceholder(e) {
            if (this.match(140)) {
              let s = this.startNode();
              return this.next(), this.assertNoSpace(), s.name = super.parseIdentifier(!0), this.assertNoSpace(), this.expect(140), this.finishPlaceholder(s, e);
            }
          }
          finishPlaceholder(e, s) {
            let r = !!(e.expectedNode && e.type === "Placeholder");
            return e.expectedNode = s, r ? e : this.finishNode(e, "Placeholder");
          }
          getTokenFromCode(e) {
            return e === 37 && this.input.charCodeAt(this.state.pos + 1) === 37 ? this.finishOp(140, 2) : super.getTokenFromCode(...arguments);
          }
          parseExprAtom() {
            return this.parsePlaceholder("Expression") || super.parseExprAtom(...arguments);
          }
          parseIdentifier() {
            return this.parsePlaceholder("Identifier") || super.parseIdentifier(...arguments);
          }
          checkReservedWord(e) {
            e !== void 0 && super.checkReservedWord(...arguments);
          }
          parseBindingAtom() {
            return this.parsePlaceholder("Pattern") || super.parseBindingAtom(...arguments);
          }
          isValidLVal(e) {
            for (var s = arguments.length, r = new Array(s > 1 ? s - 1 : 0), i = 1; i < s; i++)
              r[i - 1] = arguments[i];
            return e === "Placeholder" || super.isValidLVal(e, ...r);
          }
          toAssignable(e) {
            e && e.type === "Placeholder" && e.expectedNode === "Expression" ? e.expectedNode = "Pattern" : super.toAssignable(...arguments);
          }
          isLet(e) {
            return super.isLet(e) ? !0 : !this.isContextual(99) || e ? !1 : this.lookahead().type === 140;
          }
          verifyBreakContinue(e) {
            e.label && e.label.type === "Placeholder" || super.verifyBreakContinue(...arguments);
          }
          parseExpressionStatement(e, s) {
            if (s.type !== "Placeholder" || s.extra && s.extra.parenthesized)
              return super.parseExpressionStatement(...arguments);
            if (this.match(14)) {
              let r = e;
              return r.label = this.finishPlaceholder(s, "Identifier"), this.next(), r.body = this.parseStatement("label"), this.finishNode(r, "LabeledStatement");
            }
            return this.semicolon(), e.name = s.name, this.finishPlaceholder(e, "Statement");
          }
          parseBlock() {
            return this.parsePlaceholder("BlockStatement") || super.parseBlock(...arguments);
          }
          parseFunctionId() {
            return this.parsePlaceholder("Identifier") || super.parseFunctionId(...arguments);
          }
          parseClass(e, s, r) {
            let i = s ? "ClassDeclaration" : "ClassExpression";
            this.next(), this.takeDecorators(e);
            let a = this.state.strict, n = this.parsePlaceholder("Identifier");
            if (n)
              if (this.match(81) || this.match(140) || this.match(5))
                e.id = n;
              else {
                if (r || !s)
                  return e.id = null, e.body = this.finishPlaceholder(n, "ClassBody"), this.finishNode(e, i);
                throw this.raise(Gr.ClassNameIsRequired, { at: this.state.startLoc });
              }
            else
              this.parseClassId(e, s, r);
            return this.parseClassSuper(e), e.body = this.parsePlaceholder("ClassBody") || this.parseClassBody(!!e.superClass, a), this.finishNode(e, i);
          }
          parseExport(e) {
            let s = this.parsePlaceholder("Identifier");
            if (!s)
              return super.parseExport(...arguments);
            if (!this.isContextual(97) && !this.match(12))
              return e.specifiers = [], e.source = null, e.declaration = this.finishPlaceholder(s, "Declaration"), this.finishNode(e, "ExportNamedDeclaration");
            this.expectPlugin("exportDefaultFrom");
            let r = this.startNode();
            return r.exported = s, e.specifiers = [this.finishNode(r, "ExportDefaultSpecifier")], super.parseExport(e);
          }
          isExportDefaultSpecifier() {
            if (this.match(65)) {
              let e = this.nextTokenStart();
              if (this.isUnparsedContextual(e, "from") && this.input.startsWith(Ve(140), this.nextTokenStartSince(e + 4)))
                return !0;
            }
            return super.isExportDefaultSpecifier();
          }
          maybeParseExportDefaultSpecifier(e) {
            return e.specifiers && e.specifiers.length > 0 ? !0 : super.maybeParseExportDefaultSpecifier(...arguments);
          }
          checkExport(e) {
            let { specifiers: s } = e;
            s != null && s.length && (e.specifiers = s.filter((r) => r.exported.type === "Placeholder")), super.checkExport(e), e.specifiers = s;
          }
          parseImport(e) {
            let s = this.parsePlaceholder("Identifier");
            if (!s)
              return super.parseImport(...arguments);
            if (e.specifiers = [], !this.isContextual(97) && !this.match(12))
              return e.source = this.finishPlaceholder(s, "StringLiteral"), this.semicolon(), this.finishNode(e, "ImportDeclaration");
            let r = this.startNodeAtNode(s);
            return r.local = s, this.finishNode(r, "ImportDefaultSpecifier"), e.specifiers.push(r), this.eat(12) && (this.maybeParseStarImportSpecifier(e) || this.parseNamedImportSpecifiers(e)), this.expectContextual(97), e.source = this.parseImportSource(), this.semicolon(), this.finishNode(e, "ImportDeclaration");
          }
          parseImportSource() {
            return this.parsePlaceholder("StringLiteral") || super.parseImportSource(...arguments);
          }
          assertNoSpace() {
            this.state.start > this.state.lastTokEndLoc.index && this.raise(Gr.UnexpectedSpace, { at: this.state.lastTokEndLoc });
          }
        }, Wn = (t) => class extends t {
          parseV8Intrinsic() {
            if (this.match(54)) {
              let e = this.state.startLoc, s = this.startNode();
              if (this.next(), oe(this.state.type)) {
                let r = this.parseIdentifierName(this.state.start), i = this.createIdentifier(s, r);
                if (i.type = "V8IntrinsicIdentifier", this.match(10))
                  return i;
              }
              this.unexpected(e);
            }
          }
          parseExprAtom() {
            return this.parseV8Intrinsic() || super.parseExprAtom(...arguments);
          }
        };
        function ge(t, e) {
          let [s, r] = typeof e == "string" ? [e, {}] : e, i = Object.keys(r), a = i.length === 0;
          return t.some((n) => {
            if (typeof n == "string")
              return a && n === s;
            {
              let [o, l] = n;
              if (o !== s)
                return !1;
              for (let p of i)
                if (l[p] !== r[p])
                  return !1;
              return !0;
            }
          });
        }
        function yt(t, e, s) {
          let r = t.find((i) => Array.isArray(i) ? i[0] === e : i === e);
          return r && Array.isArray(r) ? r[1][s] : null;
        }
        var Yr = ["minimal", "fsharp", "hack", "smart"], Qr = ["^^", "@@", "^", "%", "#"], $r = ["hash", "bar"];
        function Jn(t) {
          if (ge(t, "decorators")) {
            if (ge(t, "decorators-legacy"))
              throw new Error("Cannot use the decorators and decorators-legacy plugin together");
            let e = yt(t, "decorators", "decoratorsBeforeExport");
            if (e == null)
              throw new Error("The 'decorators' plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you are migrating from Babylon/Babel 6 or want to use the old decorators proposal, you should use the 'decorators-legacy' plugin instead of 'decorators'.");
            if (typeof e != "boolean")
              throw new Error("'decoratorsBeforeExport' must be a boolean.");
          }
          if (ge(t, "flow") && ge(t, "typescript"))
            throw new Error("Cannot combine flow and typescript plugins.");
          if (ge(t, "placeholders") && ge(t, "v8intrinsic"))
            throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
          if (ge(t, "pipelineOperator")) {
            let e = yt(t, "pipelineOperator", "proposal");
            if (!Yr.includes(e)) {
              let r = Yr.map((i) => '"'.concat(i, '"')).join(", ");
              throw new Error('"pipelineOperator" requires "proposal" option whose value must be one of: '.concat(r, "."));
            }
            let s = ge(t, ["recordAndTuple", { syntaxType: "hash" }]);
            if (e === "hack") {
              if (ge(t, "placeholders"))
                throw new Error("Cannot combine placeholders plugin and Hack-style pipes.");
              if (ge(t, "v8intrinsic"))
                throw new Error("Cannot combine v8intrinsic plugin and Hack-style pipes.");
              let r = yt(t, "pipelineOperator", "topicToken");
              if (!Qr.includes(r)) {
                let i = Qr.map((a) => '"'.concat(a, '"')).join(", ");
                throw new Error('"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: '.concat(i, "."));
              }
              if (r === "#" && s)
                throw new Error('Plugin conflict between `["pipelineOperator", { proposal: "hack", topicToken: "#" }]` and `["recordAndtuple", { syntaxType: "hash"}]`.');
            } else if (e === "smart" && s)
              throw new Error('Plugin conflict between `["pipelineOperator", { proposal: "smart" }]` and `["recordAndtuple", { syntaxType: "hash"}]`.');
          }
          if (ge(t, "moduleAttributes")) {
            if (ge(t, "importAssertions"))
              throw new Error("Cannot combine importAssertions and moduleAttributes plugins.");
            if (yt(t, "moduleAttributes", "version") !== "may-2020")
              throw new Error("The 'moduleAttributes' plugin requires a 'version' option, representing the last proposal update. Currently, the only supported value is 'may-2020'.");
          }
          if (ge(t, "recordAndTuple") && !$r.includes(yt(t, "recordAndTuple", "syntaxType")))
            throw new Error("'recordAndTuple' requires 'syntaxType' option whose value should be one of: " + $r.map((e) => "'".concat(e, "'")).join(", "));
          if (ge(t, "asyncDoExpressions") && !ge(t, "doExpressions")) {
            let e = new Error("'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins.");
            throw e.missingPlugins = "doExpressions", e;
          }
        }
        var Zr = { estree: tt, jsx: Mn, flow: Ln, typescript: Vn, v8intrinsic: Wn, placeholders: Kn }, Xn = Object.keys(Zr), ei = { sourceType: "script", sourceFilename: void 0, startColumn: 0, startLine: 1, allowAwaitOutsideFunction: !1, allowReturnOutsideFunction: !1, allowImportExportEverywhere: !1, allowSuperOutsideMethod: !1, allowUndeclaredExports: !1, plugins: [], strictMode: null, ranges: !1, tokens: !1, createParenthesizedExpressions: !1, errorRecovery: !1, attachComment: !0 };
        function Gn(t) {
          let e = {};
          for (let s of Object.keys(ei))
            e[s] = t && t[s] != null ? t[s] : ei[s];
          return e;
        }
        var Yn = (t, e) => Object.hasOwnProperty.call(t, e) && t[e], ti = (t) => t.type === "ParenthesizedExpression" ? ti(t.expression) : t, Qn = class extends Sn {
          toAssignable(t) {
            let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
            var s, r;
            let i;
            switch ((t.type === "ParenthesizedExpression" || (s = t.extra) != null && s.parenthesized) && (i = ti(t), e ? i.type === "Identifier" ? this.expressionScope.recordArrowParemeterBindingError(h.InvalidParenthesizedAssignment, { at: t }) : i.type !== "MemberExpression" && this.raise(h.InvalidParenthesizedAssignment, { at: t }) : this.raise(h.InvalidParenthesizedAssignment, { at: t })), t.type) {
              case "Identifier":
              case "ObjectPattern":
              case "ArrayPattern":
              case "AssignmentPattern":
              case "RestElement":
                break;
              case "ObjectExpression":
                t.type = "ObjectPattern";
                for (let n = 0, o = t.properties.length, l = o - 1; n < o; n++) {
                  var a;
                  let p = t.properties[n], y = n === l;
                  this.toAssignableObjectExpressionProp(p, y, e), y && p.type === "RestElement" && (a = t.extra) != null && a.trailingCommaLoc && this.raise(h.RestTrailingComma, { at: t.extra.trailingCommaLoc });
                }
                break;
              case "ObjectProperty": {
                let { key: n, value: o } = t;
                this.isPrivateName(n) && this.classScope.usePrivateName(this.getPrivateNameSV(n), n.loc.start), this.toAssignable(o, e);
                break;
              }
              case "SpreadElement":
                throw new Error("Internal @babel/parser error (this is a bug, please report it). SpreadElement should be converted by .toAssignable's caller.");
              case "ArrayExpression":
                t.type = "ArrayPattern", this.toAssignableList(t.elements, (r = t.extra) == null ? void 0 : r.trailingCommaLoc, e);
                break;
              case "AssignmentExpression":
                t.operator !== "=" && this.raise(h.MissingEqInAssignment, { at: t.left.loc.end }), t.type = "AssignmentPattern", delete t.operator, this.toAssignable(t.left, e);
                break;
              case "ParenthesizedExpression":
                this.toAssignable(i, e);
                break;
            }
          }
          toAssignableObjectExpressionProp(t, e, s) {
            if (t.type === "ObjectMethod")
              this.raise(t.kind === "get" || t.kind === "set" ? h.PatternHasAccessor : h.PatternHasMethod, { at: t.key });
            else if (t.type === "SpreadElement") {
              t.type = "RestElement";
              let r = t.argument;
              this.checkToRestConversion(r, !1), this.toAssignable(r, s), e || this.raise(h.RestTrailingComma, { at: t });
            } else
              this.toAssignable(t, s);
          }
          toAssignableList(t, e, s) {
            let r = t.length - 1;
            for (let i = 0; i <= r; i++) {
              let a = t[i];
              if (a) {
                if (a.type === "SpreadElement") {
                  a.type = "RestElement";
                  let n = a.argument;
                  this.checkToRestConversion(n, !0), this.toAssignable(n, s);
                } else
                  this.toAssignable(a, s);
                a.type === "RestElement" && (i < r ? this.raise(h.RestTrailingComma, { at: a }) : e && this.raise(h.RestTrailingComma, { at: e }));
              }
            }
          }
          isAssignable(t, e) {
            switch (t.type) {
              case "Identifier":
              case "ObjectPattern":
              case "ArrayPattern":
              case "AssignmentPattern":
              case "RestElement":
                return !0;
              case "ObjectExpression": {
                let s = t.properties.length - 1;
                return t.properties.every((r, i) => r.type !== "ObjectMethod" && (i === s || r.type !== "SpreadElement") && this.isAssignable(r));
              }
              case "ObjectProperty":
                return this.isAssignable(t.value);
              case "SpreadElement":
                return this.isAssignable(t.argument);
              case "ArrayExpression":
                return t.elements.every((s) => s === null || this.isAssignable(s));
              case "AssignmentExpression":
                return t.operator === "=";
              case "ParenthesizedExpression":
                return this.isAssignable(t.expression);
              case "MemberExpression":
              case "OptionalMemberExpression":
                return !e;
              default:
                return !1;
            }
          }
          toReferencedList(t, e) {
            return t;
          }
          toReferencedListDeep(t, e) {
            this.toReferencedList(t, e);
            for (let s of t)
              (s == null ? void 0 : s.type) === "ArrayExpression" && this.toReferencedListDeep(s.elements);
          }
          parseSpread(t, e) {
            let s = this.startNode();
            return this.next(), s.argument = this.parseMaybeAssignAllowIn(t, void 0, e), this.finishNode(s, "SpreadElement");
          }
          parseRestBinding() {
            let t = this.startNode();
            return this.next(), t.argument = this.parseBindingAtom(), this.finishNode(t, "RestElement");
          }
          parseBindingAtom() {
            switch (this.state.type) {
              case 0: {
                let t = this.startNode();
                return this.next(), t.elements = this.parseBindingList(3, 93, !0), this.finishNode(t, "ArrayPattern");
              }
              case 5:
                return this.parseObjectLike(8, !0);
            }
            return this.parseIdentifier();
          }
          parseBindingList(t, e, s, r) {
            let i = [], a = !0;
            for (; !this.eat(t); )
              if (a ? a = !1 : this.expect(12), s && this.match(12))
                i.push(null);
              else {
                if (this.eat(t))
                  break;
                if (this.match(21)) {
                  if (i.push(this.parseAssignableListItemTypes(this.parseRestBinding())), !this.checkCommaAfterRest(e)) {
                    this.expect(t);
                    break;
                  }
                } else {
                  let n = [];
                  for (this.match(26) && this.hasPlugin("decorators") && this.raise(h.UnsupportedParameterDecorator, { at: this.state.startLoc }); this.match(26); )
                    n.push(this.parseDecorator());
                  i.push(this.parseAssignableListItem(r, n));
                }
              }
            return i;
          }
          parseBindingRestProperty(t) {
            return this.next(), t.argument = this.parseIdentifier(), this.checkCommaAfterRest(125), this.finishNode(t, "RestElement");
          }
          parseBindingProperty() {
            let t = this.startNode(), { type: e, start: s, startLoc: r } = this.state;
            return e === 21 ? this.parseBindingRestProperty(t) : (e === 134 ? (this.expectPlugin("destructuringPrivate", r), this.classScope.usePrivateName(this.state.value, r), t.key = this.parsePrivateName()) : this.parsePropertyName(t), t.method = !1, this.parseObjPropValue(t, s, r, !1, !1, !0, !1), t);
          }
          parseAssignableListItem(t, e) {
            let s = this.parseMaybeDefault();
            this.parseAssignableListItemTypes(s);
            let r = this.parseMaybeDefault(s.start, s.loc.start, s);
            return e.length && (s.decorators = e), r;
          }
          parseAssignableListItemTypes(t) {
            return t;
          }
          parseMaybeDefault(t, e, s) {
            var r, i, a;
            if (e = (r = e) != null ? r : this.state.startLoc, t = (i = t) != null ? i : this.state.start, s = (a = s) != null ? a : this.parseBindingAtom(), !this.eat(29))
              return s;
            let n = this.startNodeAt(t, e);
            return n.left = s, n.right = this.parseMaybeAssignAllowIn(), this.finishNode(n, "AssignmentPattern");
          }
          isValidLVal(t, e, s) {
            return Yn({ AssignmentPattern: "left", RestElement: "argument", ObjectProperty: "value", ParenthesizedExpression: "expression", ArrayPattern: "elements", ObjectPattern: "properties" }, t);
          }
          checkLVal(t, e) {
            let { in: s, binding: r = Ge, checkClashes: i = !1, strictModeChanged: a = !1, allowingSloppyLetBinding: n = !(r & qe), hasParenthesizedAncestor: o = !1 } = e;
            var l;
            let p = t.type;
            if (this.isObjectMethod(t))
              return;
            if (p === "MemberExpression") {
              r !== Ge && this.raise(h.InvalidPropertyBindingPattern, { at: t });
              return;
            }
            if (t.type === "Identifier") {
              this.checkIdentifier(t, r, a, n);
              let { name: $ } = t;
              i && (i.has($) ? this.raise(h.ParamDupe, { at: t }) : i.add($));
              return;
            }
            let y = this.isValidLVal(t.type, !(o || (l = t.extra) != null && l.parenthesized) && s.type === "AssignmentExpression", r);
            if (y === !0)
              return;
            if (y === !1) {
              let $ = r === Ge ? h.InvalidLhs : h.InvalidLhsBinding;
              this.raise($, { at: t, ancestor: s.type === "UpdateExpression" ? { type: "UpdateExpression", prefix: s.prefix } : { type: s.type } });
              return;
            }
            let [S, B] = Array.isArray(y) ? y : [y, p === "ParenthesizedExpression"], z = t.type === "ArrayPattern" || t.type === "ObjectPattern" || t.type === "ParenthesizedExpression" ? t : s;
            for (let $ of [].concat(t[S]))
              $ && this.checkLVal($, { in: z, binding: r, checkClashes: i, allowingSloppyLetBinding: n, strictModeChanged: a, hasParenthesizedAncestor: B });
          }
          checkIdentifier(t, e) {
            let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !(e & qe);
            this.state.strict && (s ? vr(t.name, this.inModule) : wr(t.name)) && (e === Ge ? this.raise(h.StrictEvalArguments, { at: t, referenceName: t.name }) : this.raise(h.StrictEvalArgumentsBinding, { at: t, bindingName: t.name })), !r && t.name === "let" && this.raise(h.LetInLexicalBinding, { at: t }), e & Ge || this.declareNameFromIdentifier(t, e);
          }
          declareNameFromIdentifier(t, e) {
            this.scope.declareName(t.name, e, t.loc.start);
          }
          checkToRestConversion(t, e) {
            switch (t.type) {
              case "ParenthesizedExpression":
                this.checkToRestConversion(t.expression, e);
                break;
              case "Identifier":
              case "MemberExpression":
                break;
              case "ArrayExpression":
              case "ObjectExpression":
                if (e)
                  break;
              default:
                this.raise(h.InvalidRestAssignmentPattern, { at: t });
            }
          }
          checkCommaAfterRest(t) {
            return this.match(12) ? (this.raise(this.lookaheadCharCode() === t ? h.RestTrailingComma : h.ElementAfterRest, { at: this.state.startLoc }), !0) : !1;
          }
        }, $n = class extends Qn {
          checkProto(t, e, s, r) {
            if (t.type === "SpreadElement" || this.isObjectMethod(t) || t.computed || t.shorthand)
              return;
            let i = t.key;
            if ((i.type === "Identifier" ? i.name : i.value) === "__proto__") {
              if (e) {
                this.raise(h.RecordNoProto, { at: i });
                return;
              }
              s.used && (r ? r.doubleProtoLoc === null && (r.doubleProtoLoc = i.loc.start) : this.raise(h.DuplicateProto, { at: i })), s.used = !0;
            }
          }
          shouldExitDescending(t, e) {
            return t.type === "ArrowFunctionExpression" && t.start === e;
          }
          getExpression() {
            this.enterInitialScopes(), this.nextToken();
            let t = this.parseExpression();
            return this.match(135) || this.unexpected(), this.finalizeRemainingComments(), t.comments = this.state.comments, t.errors = this.state.errors, this.options.tokens && (t.tokens = this.tokens), t;
          }
          parseExpression(t, e) {
            return t ? this.disallowInAnd(() => this.parseExpressionBase(e)) : this.allowInAnd(() => this.parseExpressionBase(e));
          }
          parseExpressionBase(t) {
            let e = this.state.start, s = this.state.startLoc, r = this.parseMaybeAssign(t);
            if (this.match(12)) {
              let i = this.startNodeAt(e, s);
              for (i.expressions = [r]; this.eat(12); )
                i.expressions.push(this.parseMaybeAssign(t));
              return this.toReferencedList(i.expressions), this.finishNode(i, "SequenceExpression");
            }
            return r;
          }
          parseMaybeAssignDisallowIn(t, e) {
            return this.disallowInAnd(() => this.parseMaybeAssign(t, e));
          }
          parseMaybeAssignAllowIn(t, e) {
            return this.allowInAnd(() => this.parseMaybeAssign(t, e));
          }
          setOptionalParametersError(t, e) {
            var s;
            t.optionalParametersLoc = (s = e == null ? void 0 : e.loc) != null ? s : this.state.startLoc;
          }
          parseMaybeAssign(t, e) {
            let s = this.state.start, r = this.state.startLoc;
            if (this.isContextual(105) && this.prodParam.hasYield) {
              let o = this.parseYield();
              return e && (o = e.call(this, o, s, r)), o;
            }
            let i;
            t ? i = !1 : (t = new jt(), i = !0);
            let { type: a } = this.state;
            (a === 10 || oe(a)) && (this.state.potentialArrowAt = this.state.start);
            let n = this.parseMaybeConditional(t);
            if (e && (n = e.call(this, n, s, r)), Na(this.state.type)) {
              let o = this.startNodeAt(s, r), l = this.state.value;
              return o.operator = l, this.match(29) ? (this.toAssignable(n, !0), o.left = n, t.doubleProtoLoc != null && t.doubleProtoLoc.index >= s && (t.doubleProtoLoc = null), t.shorthandAssignLoc != null && t.shorthandAssignLoc.index >= s && (t.shorthandAssignLoc = null), t.privateKeyLoc != null && t.privateKeyLoc.index >= s && (this.checkDestructuringPrivate(t), t.privateKeyLoc = null)) : o.left = n, this.next(), o.right = this.parseMaybeAssign(), this.checkLVal(n, { in: this.finishNode(o, "AssignmentExpression") }), o;
            } else
              i && this.checkExpressionErrors(t, !0);
            return n;
          }
          parseMaybeConditional(t) {
            let e = this.state.start, s = this.state.startLoc, r = this.state.potentialArrowAt, i = this.parseExprOps(t);
            return this.shouldExitDescending(i, r) ? i : this.parseConditional(i, e, s, t);
          }
          parseConditional(t, e, s, r) {
            if (this.eat(17)) {
              let i = this.startNodeAt(e, s);
              return i.test = t, i.consequent = this.parseMaybeAssignAllowIn(), this.expect(14), i.alternate = this.parseMaybeAssign(), this.finishNode(i, "ConditionalExpression");
            }
            return t;
          }
          parseMaybeUnaryOrPrivate(t) {
            return this.match(134) ? this.parsePrivateName() : this.parseMaybeUnary(t);
          }
          parseExprOps(t) {
            let e = this.state.start, s = this.state.startLoc, r = this.state.potentialArrowAt, i = this.parseMaybeUnaryOrPrivate(t);
            return this.shouldExitDescending(i, r) ? i : this.parseExprOp(i, e, s, -1);
          }
          parseExprOp(t, e, s, r) {
            if (this.isPrivateName(t)) {
              let a = this.getPrivateNameSV(t);
              (r >= Et(58) || !this.prodParam.hasIn || !this.match(58)) && this.raise(h.PrivateInExpectedIn, { at: t, identifierName: a }), this.classScope.usePrivateName(a, t.loc.start);
            }
            let i = this.state.type;
            if (ka(i) && (this.prodParam.hasIn || !this.match(58))) {
              let a = Et(i);
              if (a > r) {
                if (i === 39) {
                  if (this.expectPlugin("pipelineOperator"), this.state.inFSharpPipelineDirectBody)
                    return t;
                  this.checkPipelineAtInfixOperator(t, s);
                }
                let n = this.startNodeAt(e, s);
                n.left = t, n.operator = this.state.value;
                let o = i === 41 || i === 42, l = i === 40;
                if (l && (a = Et(42)), this.next(), i === 39 && this.hasPlugin(["pipelineOperator", { proposal: "minimal" }]) && this.state.type === 96 && this.prodParam.hasAwait)
                  throw this.raise(h.UnexpectedAwaitAfterPipelineBody, { at: this.state.startLoc });
                n.right = this.parseExprOpRightExpr(i, a), this.finishNode(n, o || l ? "LogicalExpression" : "BinaryExpression");
                let p = this.state.type;
                if (l && (p === 41 || p === 42) || o && p === 40)
                  throw this.raise(h.MixingCoalesceWithLogical, { at: this.state.startLoc });
                return this.parseExprOp(n, e, s, r);
              }
            }
            return t;
          }
          parseExprOpRightExpr(t, e) {
            let s = this.state.start, r = this.state.startLoc;
            switch (t) {
              case 39:
                switch (this.getPluginOption("pipelineOperator", "proposal")) {
                  case "hack":
                    return this.withTopicBindingContext(() => this.parseHackPipeBody());
                  case "smart":
                    return this.withTopicBindingContext(() => {
                      if (this.prodParam.hasYield && this.isContextual(105))
                        throw this.raise(h.PipeBodyIsTighter, { at: this.state.startLoc });
                      return this.parseSmartPipelineBodyInStyle(this.parseExprOpBaseRightExpr(t, e), s, r);
                    });
                  case "fsharp":
                    return this.withSoloAwaitPermittingContext(() => this.parseFSharpPipelineBody(e));
                }
              default:
                return this.parseExprOpBaseRightExpr(t, e);
            }
          }
          parseExprOpBaseRightExpr(t, e) {
            let s = this.state.start, r = this.state.startLoc;
            return this.parseExprOp(this.parseMaybeUnaryOrPrivate(), s, r, Oa(t) ? e - 1 : e);
          }
          parseHackPipeBody() {
            var t;
            let { startLoc: e } = this.state, s = this.parseMaybeAssign();
            return te.has(s.type) && !((t = s.extra) != null && t.parenthesized) && this.raise(h.PipeUnparenthesizedBody, { at: e, type: s.type }), this.topicReferenceWasUsedInCurrentContext() || this.raise(h.PipeTopicUnused, { at: e }), s;
          }
          checkExponentialAfterUnary(t) {
            this.match(57) && this.raise(h.UnexpectedTokenUnaryExponentiation, { at: t.argument });
          }
          parseMaybeUnary(t, e) {
            let s = this.state.start, r = this.state.startLoc, i = this.isContextual(96);
            if (i && this.isAwaitAllowed()) {
              this.next();
              let l = this.parseAwait(s, r);
              return e || this.checkExponentialAfterUnary(l), l;
            }
            let a = this.match(34), n = this.startNode();
            if (Fa(this.state.type)) {
              n.operator = this.state.value, n.prefix = !0, this.match(72) && this.expectPlugin("throwExpressions");
              let l = this.match(89);
              if (this.next(), n.argument = this.parseMaybeUnary(null, !0), this.checkExpressionErrors(t, !0), this.state.strict && l) {
                let p = n.argument;
                p.type === "Identifier" ? this.raise(h.StrictDelete, { at: n }) : this.hasPropertyAsPrivateName(p) && this.raise(h.DeletePrivateField, { at: n });
              }
              if (!a)
                return e || this.checkExponentialAfterUnary(n), this.finishNode(n, "UnaryExpression");
            }
            let o = this.parseUpdate(n, a, t);
            if (i) {
              let { type: l } = this.state;
              if ((this.hasPlugin("v8intrinsic") ? as(l) : as(l) && !this.match(54)) && !this.isAmbiguousAwait())
                return this.raiseOverwrite(h.AwaitNotInAsyncContext, { at: r }), this.parseAwait(s, r);
            }
            return o;
          }
          parseUpdate(t, e, s) {
            if (e)
              return this.checkLVal(t.argument, { in: this.finishNode(t, "UpdateExpression") }), t;
            let r = this.state.start, i = this.state.startLoc, a = this.parseExprSubscripts(s);
            if (this.checkExpressionErrors(s, !1))
              return a;
            for (; Da(this.state.type) && !this.canInsertSemicolon(); ) {
              let n = this.startNodeAt(r, i);
              n.operator = this.state.value, n.prefix = !1, n.argument = a, this.next(), this.checkLVal(a, { in: a = this.finishNode(n, "UpdateExpression") });
            }
            return a;
          }
          parseExprSubscripts(t) {
            let e = this.state.start, s = this.state.startLoc, r = this.state.potentialArrowAt, i = this.parseExprAtom(t);
            return this.shouldExitDescending(i, r) ? i : this.parseSubscripts(i, e, s);
          }
          parseSubscripts(t, e, s, r) {
            let i = { optionalChainMember: !1, maybeAsyncArrow: this.atPossibleAsyncArrow(t), stop: !1 };
            do
              t = this.parseSubscript(t, e, s, r, i), i.maybeAsyncArrow = !1;
            while (!i.stop);
            return t;
          }
          parseSubscript(t, e, s, r, i) {
            let { type: a } = this.state;
            if (!r && a === 15)
              return this.parseBind(t, e, s, r, i);
            if (Ct(a))
              return this.parseTaggedTemplateExpression(t, e, s, i);
            let n = !1;
            if (a === 18) {
              if (r && this.lookaheadCharCode() === 40)
                return i.stop = !0, t;
              i.optionalChainMember = n = !0, this.next();
            }
            if (!r && this.match(10))
              return this.parseCoverCallAndAsyncArrowHead(t, e, s, i, n);
            {
              let o = this.eat(0);
              return o || n || this.eat(16) ? this.parseMember(t, e, s, i, o, n) : (i.stop = !0, t);
            }
          }
          parseMember(t, e, s, r, i, a) {
            let n = this.startNodeAt(e, s);
            return n.object = t, n.computed = i, i ? (n.property = this.parseExpression(), this.expect(3)) : this.match(134) ? (t.type === "Super" && this.raise(h.SuperPrivateField, { at: s }), this.classScope.usePrivateName(this.state.value, this.state.startLoc), n.property = this.parsePrivateName()) : n.property = this.parseIdentifier(!0), r.optionalChainMember ? (n.optional = a, this.finishNode(n, "OptionalMemberExpression")) : this.finishNode(n, "MemberExpression");
          }
          parseBind(t, e, s, r, i) {
            let a = this.startNodeAt(e, s);
            return a.object = t, this.next(), a.callee = this.parseNoCallExpr(), i.stop = !0, this.parseSubscripts(this.finishNode(a, "BindExpression"), e, s, r);
          }
          parseCoverCallAndAsyncArrowHead(t, e, s, r, i) {
            let a = this.state.maybeInArrowParameters, n = null;
            this.state.maybeInArrowParameters = !0, this.next();
            let o = this.startNodeAt(e, s);
            o.callee = t;
            let { maybeAsyncArrow: l, optionalChainMember: p } = r;
            return l && (this.expressionScope.enter(Tn()), n = new jt()), p && (o.optional = i), i ? o.arguments = this.parseCallExpressionArguments(11) : o.arguments = this.parseCallExpressionArguments(11, t.type === "Import", t.type !== "Super", o, n), this.finishCallExpression(o, p), l && this.shouldParseAsyncArrow() && !i ? (r.stop = !0, this.checkDestructuringPrivate(n), this.expressionScope.validateAsPattern(), this.expressionScope.exit(), o = this.parseAsyncArrowFromCallExpression(this.startNodeAt(e, s), o)) : (l && (this.checkExpressionErrors(n, !0), this.expressionScope.exit()), this.toReferencedArguments(o)), this.state.maybeInArrowParameters = a, o;
          }
          toReferencedArguments(t, e) {
            this.toReferencedListDeep(t.arguments, e);
          }
          parseTaggedTemplateExpression(t, e, s, r) {
            let i = this.startNodeAt(e, s);
            return i.tag = t, i.quasi = this.parseTemplate(!0), r.optionalChainMember && this.raise(h.OptionalChainingNoTemplate, { at: s }), this.finishNode(i, "TaggedTemplateExpression");
          }
          atPossibleAsyncArrow(t) {
            return t.type === "Identifier" && t.name === "async" && this.state.lastTokEndLoc.index === t.end && !this.canInsertSemicolon() && t.end - t.start === 5 && t.start === this.state.potentialArrowAt;
          }
          finishCallExpression(t, e) {
            if (t.callee.type === "Import")
              if (t.arguments.length === 2 && (this.hasPlugin("moduleAttributes") || this.expectPlugin("importAssertions")), t.arguments.length === 0 || t.arguments.length > 2)
                this.raise(h.ImportCallArity, { at: t, maxArgumentCount: this.hasPlugin("importAssertions") || this.hasPlugin("moduleAttributes") ? 2 : 1 });
              else
                for (let s of t.arguments)
                  s.type === "SpreadElement" && this.raise(h.ImportCallSpreadArgument, { at: s });
            return this.finishNode(t, e ? "OptionalCallExpression" : "CallExpression");
          }
          parseCallExpressionArguments(t, e, s, r, i) {
            let a = [], n = !0, o = this.state.inFSharpPipelineDirectBody;
            for (this.state.inFSharpPipelineDirectBody = !1; !this.eat(t); ) {
              if (n)
                n = !1;
              else if (this.expect(12), this.match(t)) {
                e && !this.hasPlugin("importAssertions") && !this.hasPlugin("moduleAttributes") && this.raise(h.ImportCallArgumentTrailingComma, { at: this.state.lastTokStartLoc }), r && this.addTrailingCommaExtraToNode(r), this.next();
                break;
              }
              a.push(this.parseExprListItem(!1, i, s));
            }
            return this.state.inFSharpPipelineDirectBody = o, a;
          }
          shouldParseAsyncArrow() {
            return this.match(19) && !this.canInsertSemicolon();
          }
          parseAsyncArrowFromCallExpression(t, e) {
            var s;
            return this.resetPreviousNodeTrailingComments(e), this.expect(19), this.parseArrowExpression(t, e.arguments, !0, (s = e.extra) == null ? void 0 : s.trailingCommaLoc), e.innerComments && mt(t, e.innerComments), e.callee.trailingComments && mt(t, e.callee.trailingComments), t;
          }
          parseNoCallExpr() {
            let t = this.state.start, e = this.state.startLoc;
            return this.parseSubscripts(this.parseExprAtom(), t, e, !0);
          }
          parseExprAtom(t) {
            let e, { type: s } = this.state;
            switch (s) {
              case 79:
                return this.parseSuper();
              case 83:
                return e = this.startNode(), this.next(), this.match(16) ? this.parseImportMetaProperty(e) : (this.match(10) || this.raise(h.UnsupportedImport, { at: this.state.lastTokStartLoc }), this.finishNode(e, "Import"));
              case 78:
                return e = this.startNode(), this.next(), this.finishNode(e, "ThisExpression");
              case 90:
                return this.parseDo(this.startNode(), !1);
              case 56:
              case 31:
                return this.readRegexp(), this.parseRegExpLiteral(this.state.value);
              case 130:
                return this.parseNumericLiteral(this.state.value);
              case 131:
                return this.parseBigIntLiteral(this.state.value);
              case 132:
                return this.parseDecimalLiteral(this.state.value);
              case 129:
                return this.parseStringLiteral(this.state.value);
              case 84:
                return this.parseNullLiteral();
              case 85:
                return this.parseBooleanLiteral(!0);
              case 86:
                return this.parseBooleanLiteral(!1);
              case 10: {
                let r = this.state.potentialArrowAt === this.state.start;
                return this.parseParenAndDistinguishExpression(r);
              }
              case 2:
              case 1:
                return this.parseArrayLike(this.state.type === 2 ? 4 : 3, !1, !0);
              case 0:
                return this.parseArrayLike(3, !0, !1, t);
              case 6:
              case 7:
                return this.parseObjectLike(this.state.type === 6 ? 9 : 8, !1, !0);
              case 5:
                return this.parseObjectLike(8, !1, !1, t);
              case 68:
                return this.parseFunctionOrFunctionSent();
              case 26:
                this.parseDecorators();
              case 80:
                return e = this.startNode(), this.takeDecorators(e), this.parseClass(e, !1);
              case 77:
                return this.parseNewOrNewTarget();
              case 25:
              case 24:
                return this.parseTemplate(!1);
              case 15: {
                e = this.startNode(), this.next(), e.object = null;
                let r = e.callee = this.parseNoCallExpr();
                if (r.type === "MemberExpression")
                  return this.finishNode(e, "BindExpression");
                throw this.raise(h.UnsupportedBind, { at: r });
              }
              case 134:
                return this.raise(h.PrivateInExpectedIn, { at: this.state.startLoc, identifierName: this.state.value }), this.parsePrivateName();
              case 33:
                return this.parseTopicReferenceThenEqualsSign(54, "%");
              case 32:
                return this.parseTopicReferenceThenEqualsSign(44, "^");
              case 37:
              case 38:
                return this.parseTopicReference("hack");
              case 44:
              case 54:
              case 27: {
                let r = this.getPluginOption("pipelineOperator", "proposal");
                if (r)
                  return this.parseTopicReference(r);
                throw this.unexpected();
              }
              case 47: {
                let r = this.input.codePointAt(this.nextTokenStart());
                if (Re(r) || r === 62) {
                  this.expectOnePlugin(["jsx", "flow", "typescript"]);
                  break;
                } else
                  throw this.unexpected();
              }
              default:
                if (oe(s)) {
                  if (this.isContextual(123) && this.lookaheadCharCode() === 123 && !this.hasFollowingLineBreak())
                    return this.parseModuleExpression();
                  let r = this.state.potentialArrowAt === this.state.start, i = this.state.containsEsc, a = this.parseIdentifier();
                  if (!i && a.name === "async" && !this.canInsertSemicolon()) {
                    let { type: n } = this.state;
                    if (n === 68)
                      return this.resetPreviousNodeTrailingComments(a), this.next(), this.parseFunction(this.startNodeAtNode(a), void 0, !0);
                    if (oe(n))
                      return this.lookaheadCharCode() === 61 ? this.parseAsyncArrowUnaryFunction(this.startNodeAtNode(a)) : a;
                    if (n === 90)
                      return this.resetPreviousNodeTrailingComments(a), this.parseDo(this.startNodeAtNode(a), !0);
                  }
                  return r && this.match(19) && !this.canInsertSemicolon() ? (this.next(), this.parseArrowExpression(this.startNodeAtNode(a), [a], !1)) : a;
                } else
                  throw this.unexpected();
            }
          }
          parseTopicReferenceThenEqualsSign(t, e) {
            let s = this.getPluginOption("pipelineOperator", "proposal");
            if (s)
              return this.state.type = t, this.state.value = e, this.state.pos--, this.state.end--, this.state.endLoc = g(this.state.endLoc, -1), this.parseTopicReference(s);
            throw this.unexpected();
          }
          parseTopicReference(t) {
            let e = this.startNode(), s = this.state.startLoc, r = this.state.type;
            return this.next(), this.finishTopicReference(e, s, t, r);
          }
          finishTopicReference(t, e, s, r) {
            if (this.testTopicReferenceConfiguration(s, e, r)) {
              let i = s === "smart" ? "PipelinePrimaryTopicReference" : "TopicReference";
              return this.topicReferenceIsAllowedInCurrentContext() || this.raise(s === "smart" ? h.PrimaryTopicNotAllowed : h.PipeTopicUnbound, { at: e }), this.registerTopicReference(), this.finishNode(t, i);
            } else
              throw this.raise(h.PipeTopicUnconfiguredToken, { at: e, token: Ve(r) });
          }
          testTopicReferenceConfiguration(t, e, s) {
            switch (t) {
              case "hack":
                return this.hasPlugin(["pipelineOperator", { topicToken: Ve(s) }]);
              case "smart":
                return s === 27;
              default:
                throw this.raise(h.PipeTopicRequiresHackPipes, { at: e });
            }
          }
          parseAsyncArrowUnaryFunction(t) {
            this.prodParam.enter(Ot(!0, this.prodParam.hasYield));
            let e = [this.parseIdentifier()];
            return this.prodParam.exit(), this.hasPrecedingLineBreak() && this.raise(h.LineTerminatorBeforeArrow, { at: this.state.curPosition() }), this.expect(19), this.parseArrowExpression(t, e, !0), t;
          }
          parseDo(t, e) {
            this.expectPlugin("doExpressions"), e && this.expectPlugin("asyncDoExpressions"), t.async = e, this.next();
            let s = this.state.labels;
            return this.state.labels = [], e ? (this.prodParam.enter(Mt), t.body = this.parseBlock(), this.prodParam.exit()) : t.body = this.parseBlock(), this.state.labels = s, this.finishNode(t, "DoExpression");
          }
          parseSuper() {
            let t = this.startNode();
            return this.next(), this.match(10) && !this.scope.allowDirectSuper && !this.options.allowSuperOutsideMethod ? this.raise(h.SuperNotAllowed, { at: t }) : !this.scope.allowSuper && !this.options.allowSuperOutsideMethod && this.raise(h.UnexpectedSuper, { at: t }), !this.match(10) && !this.match(0) && !this.match(16) && this.raise(h.UnsupportedSuper, { at: t }), this.finishNode(t, "Super");
          }
          parsePrivateName() {
            let t = this.startNode(), e = this.startNodeAt(this.state.start + 1, new A(this.state.curLine, this.state.start + 1 - this.state.lineStart, this.state.start + 1)), s = this.state.value;
            return this.next(), t.id = this.createIdentifier(e, s), this.finishNode(t, "PrivateName");
          }
          parseFunctionOrFunctionSent() {
            let t = this.startNode();
            if (this.next(), this.prodParam.hasYield && this.match(16)) {
              let e = this.createIdentifier(this.startNodeAtNode(t), "function");
              return this.next(), this.match(102) ? this.expectPlugin("functionSent") : this.hasPlugin("functionSent") || this.unexpected(), this.parseMetaProperty(t, e, "sent");
            }
            return this.parseFunction(t);
          }
          parseMetaProperty(t, e, s) {
            t.meta = e;
            let r = this.state.containsEsc;
            return t.property = this.parseIdentifier(!0), (t.property.name !== s || r) && this.raise(h.UnsupportedMetaProperty, { at: t.property, target: e.name, onlyValidPropertyName: s }), this.finishNode(t, "MetaProperty");
          }
          parseImportMetaProperty(t) {
            let e = this.createIdentifier(this.startNodeAtNode(t), "import");
            return this.next(), this.isContextual(100) && (this.inModule || this.raise(h.ImportMetaOutsideModule, { at: e }), this.sawUnambiguousESM = !0), this.parseMetaProperty(t, e, "meta");
          }
          parseLiteralAtNode(t, e, s) {
            return this.addExtra(s, "rawValue", t), this.addExtra(s, "raw", this.input.slice(s.start, this.state.end)), s.value = t, this.next(), this.finishNode(s, e);
          }
          parseLiteral(t, e) {
            let s = this.startNode();
            return this.parseLiteralAtNode(t, e, s);
          }
          parseStringLiteral(t) {
            return this.parseLiteral(t, "StringLiteral");
          }
          parseNumericLiteral(t) {
            return this.parseLiteral(t, "NumericLiteral");
          }
          parseBigIntLiteral(t) {
            return this.parseLiteral(t, "BigIntLiteral");
          }
          parseDecimalLiteral(t) {
            return this.parseLiteral(t, "DecimalLiteral");
          }
          parseRegExpLiteral(t) {
            let e = this.parseLiteral(t.value, "RegExpLiteral");
            return e.pattern = t.pattern, e.flags = t.flags, e;
          }
          parseBooleanLiteral(t) {
            let e = this.startNode();
            return e.value = t, this.next(), this.finishNode(e, "BooleanLiteral");
          }
          parseNullLiteral() {
            let t = this.startNode();
            return this.next(), this.finishNode(t, "NullLiteral");
          }
          parseParenAndDistinguishExpression(t) {
            let e = this.state.start, s = this.state.startLoc, r;
            this.next(), this.expressionScope.enter(bn());
            let i = this.state.maybeInArrowParameters, a = this.state.inFSharpPipelineDirectBody;
            this.state.maybeInArrowParameters = !0, this.state.inFSharpPipelineDirectBody = !1;
            let n = this.state.start, o = this.state.startLoc, l = [], p = new jt(), y = !0, S, B;
            for (; !this.match(11); ) {
              if (y)
                y = !1;
              else if (this.expect(12, p.optionalParametersLoc === null ? null : p.optionalParametersLoc), this.match(11)) {
                B = this.state.startLoc;
                break;
              }
              if (this.match(21)) {
                let ae = this.state.start, fe = this.state.startLoc;
                if (S = this.state.startLoc, l.push(this.parseParenItem(this.parseRestBinding(), ae, fe)), !this.checkCommaAfterRest(41))
                  break;
              } else
                l.push(this.parseMaybeAssignAllowIn(p, this.parseParenItem));
            }
            let z = this.state.lastTokEndLoc;
            this.expect(11), this.state.maybeInArrowParameters = i, this.state.inFSharpPipelineDirectBody = a;
            let $ = this.startNodeAt(e, s);
            return t && this.shouldParseArrow(l) && ($ = this.parseArrow($)) ? (this.checkDestructuringPrivate(p), this.expressionScope.validateAsPattern(), this.expressionScope.exit(), this.parseArrowExpression($, l, !1), $) : (this.expressionScope.exit(), l.length || this.unexpected(this.state.lastTokStartLoc), B && this.unexpected(B), S && this.unexpected(S), this.checkExpressionErrors(p, !0), this.toReferencedListDeep(l, !0), l.length > 1 ? (r = this.startNodeAt(n, o), r.expressions = l, this.finishNode(r, "SequenceExpression"), this.resetEndLocation(r, z)) : r = l[0], this.wrapParenthesis(e, s, r));
          }
          wrapParenthesis(t, e, s) {
            if (!this.options.createParenthesizedExpressions)
              return this.addExtra(s, "parenthesized", !0), this.addExtra(s, "parenStart", t), this.takeSurroundingComments(s, t, this.state.lastTokEndLoc.index), s;
            let r = this.startNodeAt(t, e);
            return r.expression = s, this.finishNode(r, "ParenthesizedExpression"), r;
          }
          shouldParseArrow(t) {
            return !this.canInsertSemicolon();
          }
          parseArrow(t) {
            if (this.eat(19))
              return t;
          }
          parseParenItem(t, e, s) {
            return t;
          }
          parseNewOrNewTarget() {
            let t = this.startNode();
            if (this.next(), this.match(16)) {
              let e = this.createIdentifier(this.startNodeAtNode(t), "new");
              this.next();
              let s = this.parseMetaProperty(t, e, "target");
              return !this.scope.inNonArrowFunction && !this.scope.inClass && this.raise(h.UnexpectedNewTarget, { at: s }), s;
            }
            return this.parseNew(t);
          }
          parseNew(t) {
            if (this.parseNewCallee(t), this.eat(10)) {
              let e = this.parseExprList(11);
              this.toReferencedList(e), t.arguments = e;
            } else
              t.arguments = [];
            return this.finishNode(t, "NewExpression");
          }
          parseNewCallee(t) {
            t.callee = this.parseNoCallExpr(), t.callee.type === "Import" ? this.raise(h.ImportCallNotNewExpression, { at: t.callee }) : this.isOptionalChain(t.callee) ? this.raise(h.OptionalChainingNoNew, { at: this.state.lastTokEndLoc }) : this.eat(18) && this.raise(h.OptionalChainingNoNew, { at: this.state.startLoc });
          }
          parseTemplateElement(t) {
            let { start: e, startLoc: s, end: r, value: i } = this.state, a = e + 1, n = this.startNodeAt(a, g(s, 1));
            i === null && (t || this.raise(h.InvalidEscapeSequenceTemplate, { at: g(s, 2) }));
            let o = this.match(24), l = o ? -1 : -2, p = r + l;
            return n.value = { raw: this.input.slice(a, p).replace(/\r\n?/g, `
`), cooked: i === null ? null : i.slice(1, l) }, n.tail = o, this.next(), this.finishNode(n, "TemplateElement"), this.resetEndLocation(n, g(this.state.lastTokEndLoc, l)), n;
          }
          parseTemplate(t) {
            let e = this.startNode();
            e.expressions = [];
            let s = this.parseTemplateElement(t);
            for (e.quasis = [s]; !s.tail; )
              e.expressions.push(this.parseTemplateSubstitution()), this.readTemplateContinuation(), e.quasis.push(s = this.parseTemplateElement(t));
            return this.finishNode(e, "TemplateLiteral");
          }
          parseTemplateSubstitution() {
            return this.parseExpression();
          }
          parseObjectLike(t, e, s, r) {
            s && this.expectPlugin("recordAndTuple");
            let i = this.state.inFSharpPipelineDirectBody;
            this.state.inFSharpPipelineDirectBody = !1;
            let a = /* @__PURE__ */ Object.create(null), n = !0, o = this.startNode();
            for (o.properties = [], this.next(); !this.match(t); ) {
              if (n)
                n = !1;
              else if (this.expect(12), this.match(t)) {
                this.addTrailingCommaExtraToNode(o);
                break;
              }
              let p;
              e ? p = this.parseBindingProperty() : (p = this.parsePropertyDefinition(r), this.checkProto(p, s, a, r)), s && !this.isObjectProperty(p) && p.type !== "SpreadElement" && this.raise(h.InvalidRecordProperty, { at: p }), p.shorthand && this.addExtra(p, "shorthand", !0), o.properties.push(p);
            }
            this.next(), this.state.inFSharpPipelineDirectBody = i;
            let l = "ObjectExpression";
            return e ? l = "ObjectPattern" : s && (l = "RecordExpression"), this.finishNode(o, l);
          }
          addTrailingCommaExtraToNode(t) {
            this.addExtra(t, "trailingComma", this.state.lastTokStart), this.addExtra(t, "trailingCommaLoc", this.state.lastTokStartLoc, !1);
          }
          maybeAsyncOrAccessorProp(t) {
            return !t.computed && t.key.type === "Identifier" && (this.isLiteralPropertyName() || this.match(0) || this.match(55));
          }
          parsePropertyDefinition(t) {
            let e = [];
            if (this.match(26))
              for (this.hasPlugin("decorators") && this.raise(h.UnsupportedPropertyDecorator, { at: this.state.startLoc }); this.match(26); )
                e.push(this.parseDecorator());
            let s = this.startNode(), r = !1, i = !1, a, n;
            if (this.match(21))
              return e.length && this.unexpected(), this.parseSpread();
            e.length && (s.decorators = e, e = []), s.method = !1, t && (a = this.state.start, n = this.state.startLoc);
            let o = this.eat(55);
            this.parsePropertyNamePrefixOperator(s);
            let l = this.state.containsEsc, p = this.parsePropertyName(s, t);
            if (!o && !l && this.maybeAsyncOrAccessorProp(s)) {
              let y = p.name;
              y === "async" && !this.hasPrecedingLineBreak() && (r = !0, this.resetPreviousNodeTrailingComments(p), o = this.eat(55), this.parsePropertyName(s)), (y === "get" || y === "set") && (i = !0, this.resetPreviousNodeTrailingComments(p), s.kind = y, this.match(55) && (o = !0, this.raise(h.AccessorIsGenerator, { at: this.state.curPosition(), kind: y }), this.next()), this.parsePropertyName(s));
            }
            return this.parseObjPropValue(s, a, n, o, r, !1, i, t), s;
          }
          getGetterSetterExpectedParamCount(t) {
            return t.kind === "get" ? 0 : 1;
          }
          getObjectOrClassMethodParams(t) {
            return t.params;
          }
          checkGetterSetterParams(t) {
            var e;
            let s = this.getGetterSetterExpectedParamCount(t), r = this.getObjectOrClassMethodParams(t);
            r.length !== s && this.raise(t.kind === "get" ? h.BadGetterArity : h.BadSetterArity, { at: t }), t.kind === "set" && ((e = r[r.length - 1]) == null ? void 0 : e.type) === "RestElement" && this.raise(h.BadSetterRestParameter, { at: t });
          }
          parseObjectMethod(t, e, s, r, i) {
            if (i)
              return this.parseMethod(t, e, !1, !1, !1, "ObjectMethod"), this.checkGetterSetterParams(t), t;
            if (s || e || this.match(10))
              return r && this.unexpected(), t.kind = "method", t.method = !0, this.parseMethod(t, e, s, !1, !1, "ObjectMethod");
          }
          parseObjectProperty(t, e, s, r, i) {
            if (t.shorthand = !1, this.eat(14))
              return t.value = r ? this.parseMaybeDefault(this.state.start, this.state.startLoc) : this.parseMaybeAssignAllowIn(i), this.finishNode(t, "ObjectProperty");
            if (!t.computed && t.key.type === "Identifier") {
              if (this.checkReservedWord(t.key.name, t.key.loc.start, !0, !1), r)
                t.value = this.parseMaybeDefault(e, s, He(t.key));
              else if (this.match(29)) {
                let a = this.state.startLoc;
                i != null ? i.shorthandAssignLoc === null && (i.shorthandAssignLoc = a) : this.raise(h.InvalidCoverInitializedName, { at: a }), t.value = this.parseMaybeDefault(e, s, He(t.key));
              } else
                t.value = He(t.key);
              return t.shorthand = !0, this.finishNode(t, "ObjectProperty");
            }
          }
          parseObjPropValue(t, e, s, r, i, a, n, o) {
            let l = this.parseObjectMethod(t, r, i, a, n) || this.parseObjectProperty(t, e, s, a, o);
            return l || this.unexpected(), l;
          }
          parsePropertyName(t, e) {
            if (this.eat(0))
              t.computed = !0, t.key = this.parseMaybeAssignAllowIn(), this.expect(3);
            else {
              let { type: s, value: r } = this.state, i;
              if (Oe(s))
                i = this.parseIdentifier(!0);
              else
                switch (s) {
                  case 130:
                    i = this.parseNumericLiteral(r);
                    break;
                  case 129:
                    i = this.parseStringLiteral(r);
                    break;
                  case 131:
                    i = this.parseBigIntLiteral(r);
                    break;
                  case 132:
                    i = this.parseDecimalLiteral(r);
                    break;
                  case 134: {
                    let a = this.state.startLoc;
                    e != null ? e.privateKeyLoc === null && (e.privateKeyLoc = a) : this.raise(h.UnexpectedPrivateField, { at: a }), i = this.parsePrivateName();
                    break;
                  }
                  default:
                    throw this.unexpected();
                }
              t.key = i, s !== 134 && (t.computed = !1);
            }
            return t.key;
          }
          initFunction(t, e) {
            t.id = null, t.generator = !1, t.async = !!e;
          }
          parseMethod(t, e, s, r, i, a) {
            let n = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : !1;
            this.initFunction(t, s), t.generator = !!e;
            let o = r;
            return this.scope.enter(Ue | wt | (n ? Xe : 0) | (i ? Nr : 0)), this.prodParam.enter(Ot(s, t.generator)), this.parseFunctionParams(t, o), this.parseFunctionBodyAndFinish(t, a, !0), this.prodParam.exit(), this.scope.exit(), t;
          }
          parseArrayLike(t, e, s, r) {
            s && this.expectPlugin("recordAndTuple");
            let i = this.state.inFSharpPipelineDirectBody;
            this.state.inFSharpPipelineDirectBody = !1;
            let a = this.startNode();
            return this.next(), a.elements = this.parseExprList(t, !s, r, a), this.state.inFSharpPipelineDirectBody = i, this.finishNode(a, s ? "TupleExpression" : "ArrayExpression");
          }
          parseArrowExpression(t, e, s, r) {
            this.scope.enter(Ue | ps);
            let i = Ot(s, !1);
            !this.match(5) && this.prodParam.hasIn && (i |= nt), this.prodParam.enter(i), this.initFunction(t, s);
            let a = this.state.maybeInArrowParameters;
            return e && (this.state.maybeInArrowParameters = !0, this.setArrowFunctionParameters(t, e, r)), this.state.maybeInArrowParameters = !1, this.parseFunctionBody(t, !0), this.prodParam.exit(), this.scope.exit(), this.state.maybeInArrowParameters = a, this.finishNode(t, "ArrowFunctionExpression");
          }
          setArrowFunctionParameters(t, e, s) {
            this.toAssignableList(e, s, !1), t.params = e;
          }
          parseFunctionBodyAndFinish(t, e) {
            let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            this.parseFunctionBody(t, !1, s), this.finishNode(t, e);
          }
          parseFunctionBody(t, e) {
            let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = e && !this.match(5);
            if (this.expressionScope.enter(Hr()), r)
              t.body = this.parseMaybeAssign(), this.checkParams(t, !1, e, !1);
            else {
              let i = this.state.strict, a = this.state.labels;
              this.state.labels = [], this.prodParam.enter(this.prodParam.currentFlags() | qr), t.body = this.parseBlock(!0, !1, (n) => {
                let o = !this.isSimpleParamList(t.params);
                n && o && this.raise(h.IllegalLanguageModeDirective, { at: (t.kind === "method" || t.kind === "constructor") && !!t.key ? t.key.loc.end : t });
                let l = !i && this.state.strict;
                this.checkParams(t, !this.state.strict && !e && !s && !o, e, l), this.state.strict && t.id && this.checkIdentifier(t.id, Ga, l);
              }), this.prodParam.exit(), this.state.labels = a;
            }
            this.expressionScope.exit();
          }
          isSimpleParameter(t) {
            return t.type === "Identifier";
          }
          isSimpleParamList(t) {
            for (let e = 0, s = t.length; e < s; e++)
              if (!this.isSimpleParameter(t[e]))
                return !1;
            return !0;
          }
          checkParams(t, e, s) {
            let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, i = !e && /* @__PURE__ */ new Set(), a = { type: "FormalParameters" };
            for (let n of t.params)
              this.checkLVal(n, { in: a, binding: kt, checkClashes: i, strictModeChanged: r });
          }
          parseExprList(t, e, s, r) {
            let i = [], a = !0;
            for (; !this.eat(t); ) {
              if (a)
                a = !1;
              else if (this.expect(12), this.match(t)) {
                r && this.addTrailingCommaExtraToNode(r), this.next();
                break;
              }
              i.push(this.parseExprListItem(e, s));
            }
            return i;
          }
          parseExprListItem(t, e, s) {
            let r;
            if (this.match(12))
              t || this.raise(h.UnexpectedToken, { at: this.state.curPosition(), unexpected: "," }), r = null;
            else if (this.match(21)) {
              let i = this.state.start, a = this.state.startLoc;
              r = this.parseParenItem(this.parseSpread(e), i, a);
            } else if (this.match(17)) {
              this.expectPlugin("partialApplication"), s || this.raise(h.UnexpectedArgumentPlaceholder, { at: this.state.startLoc });
              let i = this.startNode();
              this.next(), r = this.finishNode(i, "ArgumentPlaceholder");
            } else
              r = this.parseMaybeAssignAllowIn(e, this.parseParenItem);
            return r;
          }
          parseIdentifier(t) {
            let e = this.startNode(), s = this.parseIdentifierName(e.start, t);
            return this.createIdentifier(e, s);
          }
          createIdentifier(t, e) {
            return t.name = e, t.loc.identifierName = e, this.finishNode(t, "Identifier");
          }
          parseIdentifierName(t, e) {
            let s, { startLoc: r, type: i } = this.state;
            if (Oe(i))
              s = this.state.value;
            else
              throw this.unexpected();
            let a = va(i);
            return e ? a && this.replaceToken(128) : this.checkReservedWord(s, r, a, !1), this.next(), s;
          }
          checkReservedWord(t, e, s, r) {
            if (!(t.length > 10 || !Wa(t))) {
              if (t === "yield") {
                if (this.prodParam.hasYield) {
                  this.raise(h.YieldBindingIdentifier, { at: e });
                  return;
                }
              } else if (t === "await") {
                if (this.prodParam.hasAwait) {
                  this.raise(h.AwaitBindingIdentifier, { at: e });
                  return;
                }
                if (this.scope.inStaticBlock) {
                  this.raise(h.AwaitBindingIdentifierInStaticBlock, { at: e });
                  return;
                }
                this.expressionScope.recordAsyncArrowParametersError({ at: e });
              } else if (t === "arguments" && this.scope.inClassAndNotInNonArrowFunction) {
                this.raise(h.ArgumentsInClass, { at: e });
                return;
              }
              if (s && Va(t)) {
                this.raise(h.UnexpectedKeyword, { at: e, keyword: t });
                return;
              }
              (this.state.strict ? r ? vr : Cr : Er)(t, this.inModule) && this.raise(h.UnexpectedReservedWord, { at: e, reservedWord: t });
            }
          }
          isAwaitAllowed() {
            return !!(this.prodParam.hasAwait || this.options.allowAwaitOutsideFunction && !this.scope.inFunction);
          }
          parseAwait(t, e) {
            let s = this.startNodeAt(t, e);
            return this.expressionScope.recordParameterInitializerError(h.AwaitExpressionFormalParameter, { at: s }), this.eat(55) && this.raise(h.ObsoleteAwaitStar, { at: s }), !this.scope.inFunction && !this.options.allowAwaitOutsideFunction && (this.isAmbiguousAwait() ? this.ambiguousScriptDifferentAst = !0 : this.sawUnambiguousESM = !0), this.state.soloAwait || (s.argument = this.parseMaybeUnary(null, !0)), this.finishNode(s, "AwaitExpression");
          }
          isAmbiguousAwait() {
            if (this.hasPrecedingLineBreak())
              return !0;
            let { type: t } = this.state;
            return t === 53 || t === 10 || t === 0 || Ct(t) || t === 133 || t === 56 || this.hasPlugin("v8intrinsic") && t === 54;
          }
          parseYield() {
            let t = this.startNode();
            this.expressionScope.recordParameterInitializerError(h.YieldInParameter, { at: t }), this.next();
            let e = !1, s = null;
            if (!this.hasPrecedingLineBreak())
              switch (e = this.eat(55), this.state.type) {
                case 13:
                case 135:
                case 8:
                case 11:
                case 3:
                case 9:
                case 14:
                case 12:
                  if (!e)
                    break;
                default:
                  s = this.parseMaybeAssign();
              }
            return t.delegate = e, t.argument = s, this.finishNode(t, "YieldExpression");
          }
          checkPipelineAtInfixOperator(t, e) {
            this.hasPlugin(["pipelineOperator", { proposal: "smart" }]) && t.type === "SequenceExpression" && this.raise(h.PipelineHeadSequenceExpression, { at: e });
          }
          parseSmartPipelineBodyInStyle(t, e, s) {
            let r = this.startNodeAt(e, s);
            return this.isSimpleReference(t) ? (r.callee = t, this.finishNode(r, "PipelineBareFunction")) : (this.checkSmartPipeTopicBodyEarlyErrors(s), r.expression = t, this.finishNode(r, "PipelineTopicExpression"));
          }
          isSimpleReference(t) {
            switch (t.type) {
              case "MemberExpression":
                return !t.computed && this.isSimpleReference(t.object);
              case "Identifier":
                return !0;
              default:
                return !1;
            }
          }
          checkSmartPipeTopicBodyEarlyErrors(t) {
            if (this.match(19))
              throw this.raise(h.PipelineBodyNoArrow, { at: this.state.startLoc });
            this.topicReferenceWasUsedInCurrentContext() || this.raise(h.PipelineTopicUnused, { at: t });
          }
          withTopicBindingContext(t) {
            let e = this.state.topicContext;
            this.state.topicContext = { maxNumOfResolvableTopics: 1, maxTopicIndex: null };
            try {
              return t();
            } finally {
              this.state.topicContext = e;
            }
          }
          withSmartMixTopicForbiddingContext(t) {
            if (this.hasPlugin(["pipelineOperator", { proposal: "smart" }])) {
              let e = this.state.topicContext;
              this.state.topicContext = { maxNumOfResolvableTopics: 0, maxTopicIndex: null };
              try {
                return t();
              } finally {
                this.state.topicContext = e;
              }
            } else
              return t();
          }
          withSoloAwaitPermittingContext(t) {
            let e = this.state.soloAwait;
            this.state.soloAwait = !0;
            try {
              return t();
            } finally {
              this.state.soloAwait = e;
            }
          }
          allowInAnd(t) {
            let e = this.prodParam.currentFlags();
            if (nt & ~e) {
              this.prodParam.enter(e | nt);
              try {
                return t();
              } finally {
                this.prodParam.exit();
              }
            }
            return t();
          }
          disallowInAnd(t) {
            let e = this.prodParam.currentFlags();
            if (nt & e) {
              this.prodParam.enter(e & ~nt);
              try {
                return t();
              } finally {
                this.prodParam.exit();
              }
            }
            return t();
          }
          registerTopicReference() {
            this.state.topicContext.maxTopicIndex = 0;
          }
          topicReferenceIsAllowedInCurrentContext() {
            return this.state.topicContext.maxNumOfResolvableTopics >= 1;
          }
          topicReferenceWasUsedInCurrentContext() {
            return this.state.topicContext.maxTopicIndex != null && this.state.topicContext.maxTopicIndex >= 0;
          }
          parseFSharpPipelineBody(t) {
            let e = this.state.start, s = this.state.startLoc;
            this.state.potentialArrowAt = this.state.start;
            let r = this.state.inFSharpPipelineDirectBody;
            this.state.inFSharpPipelineDirectBody = !0;
            let i = this.parseExprOp(this.parseMaybeUnaryOrPrivate(), e, s, t);
            return this.state.inFSharpPipelineDirectBody = r, i;
          }
          parseModuleExpression() {
            this.expectPlugin("moduleBlocks");
            let t = this.startNode();
            this.next(), this.eat(5);
            let e = this.initializeScopes(!0);
            this.enterInitialScopes();
            let s = this.startNode();
            try {
              t.body = this.parseProgram(s, 8, "module");
            } finally {
              e();
            }
            return this.eat(8), this.finishNode(t, "ModuleExpression");
          }
          parsePropertyNamePrefixOperator(t) {
          }
        }, Ss = { kind: "loop" }, Zn = { kind: "switch" }, eo = 0, Ns = 1, si = 2, ri = 4, to = /[\uD800-\uDFFF]/u, Is = /in(?:stanceof)?/y;
        function so(t, e) {
          for (let s = 0; s < t.length; s++) {
            let r = t[s], { type: i } = r;
            if (typeof i == "number") {
              {
                if (i === 134) {
                  let { loc: a, start: n, value: o, end: l } = r, p = n + 1, y = g(a.start, 1);
                  t.splice(s, 1, new Ke({ type: je(27), value: "#", start: n, end: p, startLoc: a.start, endLoc: y }), new Ke({ type: je(128), value: o, start: p, end: l, startLoc: y, endLoc: a.end })), s++;
                  continue;
                }
                if (Ct(i)) {
                  let { loc: a, start: n, value: o, end: l } = r, p = n + 1, y = g(a.start, 1), S;
                  e.charCodeAt(n) === 96 ? S = new Ke({ type: je(22), value: "`", start: n, end: p, startLoc: a.start, endLoc: y }) : S = new Ke({ type: je(8), value: "}", start: n, end: p, startLoc: a.start, endLoc: y });
                  let B, z, $, ae;
                  i === 24 ? (z = l - 1, $ = g(a.end, -1), B = o === null ? null : o.slice(1, -1), ae = new Ke({ type: je(22), value: "`", start: z, end: l, startLoc: $, endLoc: a.end })) : (z = l - 2, $ = g(a.end, -2), B = o === null ? null : o.slice(1, -2), ae = new Ke({ type: je(23), value: "${", start: z, end: l, startLoc: $, endLoc: a.end })), t.splice(s, 1, S, new Ke({ type: je(20), value: B, start: p, end: z, startLoc: y, endLoc: $ }), ae), s += 2;
                  continue;
                }
              }
              r.type = je(i);
            }
          }
          return t;
        }
        var ro = class extends $n {
          parseTopLevel(t, e) {
            return t.program = this.parseProgram(e), t.comments = this.state.comments, this.options.tokens && (t.tokens = so(this.tokens, this.input)), this.finishNode(t, "File");
          }
          parseProgram(t) {
            let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 135, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.options.sourceType;
            if (t.sourceType = s, t.interpreter = this.parseInterpreterDirective(), this.parseBlockBody(t, !0, !0, e), this.inModule && !this.options.allowUndeclaredExports && this.scope.undefinedExports.size > 0)
              for (let [r, i] of Array.from(this.scope.undefinedExports))
                this.raise(h.ModuleExportUndefined, { at: i, localName: r });
            return this.finishNode(t, "Program");
          }
          stmtToDirective(t) {
            let e = t;
            e.type = "Directive", e.value = e.expression, delete e.expression;
            let s = e.value, r = s.value, i = this.input.slice(s.start, s.end), a = s.value = i.slice(1, -1);
            return this.addExtra(s, "raw", i), this.addExtra(s, "rawValue", a), this.addExtra(s, "expressionValue", r), s.type = "DirectiveLiteral", e;
          }
          parseInterpreterDirective() {
            if (!this.match(28))
              return null;
            let t = this.startNode();
            return t.value = this.state.value, this.next(), this.finishNode(t, "InterpreterDirective");
          }
          isLet(t) {
            return this.isContextual(99) ? this.isLetKeyword(t) : !1;
          }
          isLetKeyword(t) {
            let e = this.nextTokenStart(), s = this.codePointAtPos(e);
            if (s === 92 || s === 91)
              return !0;
            if (t)
              return !1;
            if (s === 123)
              return !0;
            if (Re(s)) {
              if (Is.lastIndex = e, Is.test(this.input)) {
                let r = this.codePointAtPos(Is.lastIndex);
                if (!st(r) && r !== 92)
                  return !1;
              }
              return !0;
            }
            return !1;
          }
          parseStatement(t, e) {
            return this.match(26) && this.parseDecorators(!0), this.parseStatementContent(t, e);
          }
          parseStatementContent(t, e) {
            let s = this.state.type, r = this.startNode(), i;
            switch (this.isLet(t) && (s = 74, i = "let"), s) {
              case 60:
                return this.parseBreakContinueStatement(r, !0);
              case 63:
                return this.parseBreakContinueStatement(r, !1);
              case 64:
                return this.parseDebuggerStatement(r);
              case 90:
                return this.parseDoStatement(r);
              case 91:
                return this.parseForStatement(r);
              case 68:
                if (this.lookaheadCharCode() === 46)
                  break;
                return t && (this.state.strict ? this.raise(h.StrictFunction, { at: this.state.startLoc }) : t !== "if" && t !== "label" && this.raise(h.SloppyFunction, { at: this.state.startLoc })), this.parseFunctionStatement(r, !1, !t);
              case 80:
                return t && this.unexpected(), this.parseClass(r, !0);
              case 69:
                return this.parseIfStatement(r);
              case 70:
                return this.parseReturnStatement(r);
              case 71:
                return this.parseSwitchStatement(r);
              case 72:
                return this.parseThrowStatement(r);
              case 73:
                return this.parseTryStatement(r);
              case 75:
              case 74:
                return i = i || this.state.value, t && i !== "var" && this.raise(h.UnexpectedLexicalDeclaration, { at: this.state.startLoc }), this.parseVarStatement(r, i);
              case 92:
                return this.parseWhileStatement(r);
              case 76:
                return this.parseWithStatement(r);
              case 5:
                return this.parseBlock();
              case 13:
                return this.parseEmptyStatement(r);
              case 83: {
                let o = this.lookaheadCharCode();
                if (o === 40 || o === 46)
                  break;
              }
              case 82: {
                !this.options.allowImportExportEverywhere && !e && this.raise(h.UnexpectedImportExport, { at: this.state.startLoc }), this.next();
                let o;
                return s === 83 ? (o = this.parseImport(r), o.type === "ImportDeclaration" && (!o.importKind || o.importKind === "value") && (this.sawUnambiguousESM = !0)) : (o = this.parseExport(r), (o.type === "ExportNamedDeclaration" && (!o.exportKind || o.exportKind === "value") || o.type === "ExportAllDeclaration" && (!o.exportKind || o.exportKind === "value") || o.type === "ExportDefaultDeclaration") && (this.sawUnambiguousESM = !0)), this.assertModuleNodeAllowed(r), o;
              }
              default:
                if (this.isAsyncFunction())
                  return t && this.raise(h.AsyncFunctionInSingleStatementContext, { at: this.state.startLoc }), this.next(), this.parseFunctionStatement(r, !0, !t);
            }
            let a = this.state.value, n = this.parseExpression();
            return oe(s) && n.type === "Identifier" && this.eat(14) ? this.parseLabeledStatement(r, a, n, t) : this.parseExpressionStatement(r, n);
          }
          assertModuleNodeAllowed(t) {
            !this.options.allowImportExportEverywhere && !this.inModule && this.raise(h.ImportOutsideModule, { at: t });
          }
          takeDecorators(t) {
            let e = this.state.decoratorStack[this.state.decoratorStack.length - 1];
            e.length && (t.decorators = e, this.resetStartLocationFromNode(t, e[0]), this.state.decoratorStack[this.state.decoratorStack.length - 1] = []);
          }
          canHaveLeadingDecorator() {
            return this.match(80);
          }
          parseDecorators(t) {
            let e = this.state.decoratorStack[this.state.decoratorStack.length - 1];
            for (; this.match(26); ) {
              let s = this.parseDecorator();
              e.push(s);
            }
            if (this.match(82))
              t || this.unexpected(), this.hasPlugin("decorators") && !this.getPluginOption("decorators", "decoratorsBeforeExport") && this.raise(h.DecoratorExportClass, { at: this.state.startLoc });
            else if (!this.canHaveLeadingDecorator())
              throw this.raise(h.UnexpectedLeadingDecorator, { at: this.state.startLoc });
          }
          parseDecorator() {
            this.expectOnePlugin(["decorators-legacy", "decorators"]);
            let t = this.startNode();
            if (this.next(), this.hasPlugin("decorators")) {
              this.state.decoratorStack.push([]);
              let e = this.state.start, s = this.state.startLoc, r;
              if (this.match(10)) {
                let i = this.state.start, a = this.state.startLoc;
                this.next(), r = this.parseExpression(), this.expect(11), r = this.wrapParenthesis(i, a, r);
              } else
                for (r = this.parseIdentifier(!1); this.eat(16); ) {
                  let i = this.startNodeAt(e, s);
                  i.object = r, i.property = this.parseIdentifier(!0), i.computed = !1, r = this.finishNode(i, "MemberExpression");
                }
              t.expression = this.parseMaybeDecoratorArguments(r), this.state.decoratorStack.pop();
            } else
              t.expression = this.parseExprSubscripts();
            return this.finishNode(t, "Decorator");
          }
          parseMaybeDecoratorArguments(t) {
            if (this.eat(10)) {
              let e = this.startNodeAtNode(t);
              return e.callee = t, e.arguments = this.parseCallExpressionArguments(11, !1), this.toReferencedList(e.arguments), this.finishNode(e, "CallExpression");
            }
            return t;
          }
          parseBreakContinueStatement(t, e) {
            return this.next(), this.isLineTerminator() ? t.label = null : (t.label = this.parseIdentifier(), this.semicolon()), this.verifyBreakContinue(t, e), this.finishNode(t, e ? "BreakStatement" : "ContinueStatement");
          }
          verifyBreakContinue(t, e) {
            let s;
            for (s = 0; s < this.state.labels.length; ++s) {
              let r = this.state.labels[s];
              if ((t.label == null || r.name === t.label.name) && (r.kind != null && (e || r.kind === "loop") || t.label && e))
                break;
            }
            if (s === this.state.labels.length) {
              let r = e ? "BreakStatement" : "ContinueStatement";
              this.raise(h.IllegalBreakContinue, { at: t, type: r });
            }
          }
          parseDebuggerStatement(t) {
            return this.next(), this.semicolon(), this.finishNode(t, "DebuggerStatement");
          }
          parseHeaderExpression() {
            this.expect(10);
            let t = this.parseExpression();
            return this.expect(11), t;
          }
          parseDoStatement(t) {
            return this.next(), this.state.labels.push(Ss), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement("do")), this.state.labels.pop(), this.expect(92), t.test = this.parseHeaderExpression(), this.eat(13), this.finishNode(t, "DoWhileStatement");
          }
          parseForStatement(t) {
            this.next(), this.state.labels.push(Ss);
            let e = null;
            if (this.isAwaitAllowed() && this.eatContextual(96) && (e = this.state.lastTokStartLoc), this.scope.enter(rt), this.expect(10), this.match(13))
              return e !== null && this.unexpected(e), this.parseFor(t, null);
            let s = this.isContextual(99), r = s && this.isLetKeyword();
            if (this.match(74) || this.match(75) || r) {
              let l = this.startNode(), p = r ? "let" : this.state.value;
              return this.next(), this.parseVar(l, !0, p), this.finishNode(l, "VariableDeclaration"), (this.match(58) || this.isContextual(101)) && l.declarations.length === 1 ? this.parseForIn(t, l, e) : (e !== null && this.unexpected(e), this.parseFor(t, l));
            }
            let i = this.isContextual(95), a = new jt(), n = this.parseExpression(!0, a), o = this.isContextual(101);
            if (o && (s && this.raise(h.ForOfLet, { at: n }), e === null && i && n.type === "Identifier" && this.raise(h.ForOfAsync, { at: n })), o || this.match(58)) {
              this.checkDestructuringPrivate(a), this.toAssignable(n, !0);
              let l = o ? "ForOfStatement" : "ForInStatement";
              return this.checkLVal(n, { in: { type: l } }), this.parseForIn(t, n, e);
            } else
              this.checkExpressionErrors(a, !0);
            return e !== null && this.unexpected(e), this.parseFor(t, n);
          }
          parseFunctionStatement(t, e, s) {
            return this.next(), this.parseFunction(t, Ns | (s ? 0 : si), e);
          }
          parseIfStatement(t) {
            return this.next(), t.test = this.parseHeaderExpression(), t.consequent = this.parseStatement("if"), t.alternate = this.eat(66) ? this.parseStatement("if") : null, this.finishNode(t, "IfStatement");
          }
          parseReturnStatement(t) {
            return !this.prodParam.hasReturn && !this.options.allowReturnOutsideFunction && this.raise(h.IllegalReturn, { at: this.state.startLoc }), this.next(), this.isLineTerminator() ? t.argument = null : (t.argument = this.parseExpression(), this.semicolon()), this.finishNode(t, "ReturnStatement");
          }
          parseSwitchStatement(t) {
            this.next(), t.discriminant = this.parseHeaderExpression();
            let e = t.cases = [];
            this.expect(5), this.state.labels.push(Zn), this.scope.enter(rt);
            let s;
            for (let r; !this.match(8); )
              if (this.match(61) || this.match(65)) {
                let i = this.match(61);
                s && this.finishNode(s, "SwitchCase"), e.push(s = this.startNode()), s.consequent = [], this.next(), i ? s.test = this.parseExpression() : (r && this.raise(h.MultipleDefaultsInSwitch, { at: this.state.lastTokStartLoc }), r = !0, s.test = null), this.expect(14);
              } else
                s ? s.consequent.push(this.parseStatement(null)) : this.unexpected();
            return this.scope.exit(), s && this.finishNode(s, "SwitchCase"), this.next(), this.state.labels.pop(), this.finishNode(t, "SwitchStatement");
          }
          parseThrowStatement(t) {
            return this.next(), this.hasPrecedingLineBreak() && this.raise(h.NewlineAfterThrow, { at: this.state.lastTokEndLoc }), t.argument = this.parseExpression(), this.semicolon(), this.finishNode(t, "ThrowStatement");
          }
          parseCatchClauseParam() {
            let t = this.parseBindingAtom(), e = t.type === "Identifier";
            return this.scope.enter(e ? Sr : 0), this.checkLVal(t, { in: { type: "CatchClause" }, binding: ze, allowingSloppyLetBinding: !0 }), t;
          }
          parseTryStatement(t) {
            if (this.next(), t.block = this.parseBlock(), t.handler = null, this.match(62)) {
              let e = this.startNode();
              this.next(), this.match(10) ? (this.expect(10), e.param = this.parseCatchClauseParam(), this.expect(11)) : (e.param = null, this.scope.enter(rt)), e.body = this.withSmartMixTopicForbiddingContext(() => this.parseBlock(!1, !1)), this.scope.exit(), t.handler = this.finishNode(e, "CatchClause");
            }
            return t.finalizer = this.eat(67) ? this.parseBlock() : null, !t.handler && !t.finalizer && this.raise(h.NoCatchOrFinally, { at: t }), this.finishNode(t, "TryStatement");
          }
          parseVarStatement(t, e) {
            let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            return this.next(), this.parseVar(t, !1, e, s), this.semicolon(), this.finishNode(t, "VariableDeclaration");
          }
          parseWhileStatement(t) {
            return this.next(), t.test = this.parseHeaderExpression(), this.state.labels.push(Ss), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement("while")), this.state.labels.pop(), this.finishNode(t, "WhileStatement");
          }
          parseWithStatement(t) {
            return this.state.strict && this.raise(h.StrictWith, { at: this.state.startLoc }), this.next(), t.object = this.parseHeaderExpression(), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement("with")), this.finishNode(t, "WithStatement");
          }
          parseEmptyStatement(t) {
            return this.next(), this.finishNode(t, "EmptyStatement");
          }
          parseLabeledStatement(t, e, s, r) {
            for (let a of this.state.labels)
              a.name === e && this.raise(h.LabelRedeclaration, { at: s, labelName: e });
            let i = Ia(this.state.type) ? "loop" : this.match(71) ? "switch" : null;
            for (let a = this.state.labels.length - 1; a >= 0; a--) {
              let n = this.state.labels[a];
              if (n.statementStart === t.start)
                n.statementStart = this.state.start, n.kind = i;
              else
                break;
            }
            return this.state.labels.push({ name: e, kind: i, statementStart: this.state.start }), t.body = this.parseStatement(r ? r.indexOf("label") === -1 ? r + "label" : r : "label"), this.state.labels.pop(), t.label = s, this.finishNode(t, "LabeledStatement");
          }
          parseExpressionStatement(t, e) {
            return t.expression = e, this.semicolon(), this.finishNode(t, "ExpressionStatement");
          }
          parseBlock() {
            let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, s = arguments.length > 2 ? arguments[2] : void 0, r = this.startNode();
            return t && this.state.strictErrors.clear(), this.expect(5), e && this.scope.enter(rt), this.parseBlockBody(r, t, !1, 8, s), e && this.scope.exit(), this.finishNode(r, "BlockStatement");
          }
          isValidDirective(t) {
            return t.type === "ExpressionStatement" && t.expression.type === "StringLiteral" && !t.expression.extra.parenthesized;
          }
          parseBlockBody(t, e, s, r, i) {
            let a = t.body = [], n = t.directives = [];
            this.parseBlockOrModuleBlockBody(a, e ? n : void 0, s, r, i);
          }
          parseBlockOrModuleBlockBody(t, e, s, r, i) {
            let a = this.state.strict, n = !1, o = !1;
            for (; !this.match(r); ) {
              let l = this.parseStatement(null, s);
              if (e && !o) {
                if (this.isValidDirective(l)) {
                  let p = this.stmtToDirective(l);
                  e.push(p), !n && p.value.value === "use strict" && (n = !0, this.setStrict(!0));
                  continue;
                }
                o = !0, this.state.strictErrors.clear();
              }
              t.push(l);
            }
            i && i.call(this, n), a || this.setStrict(!1), this.next();
          }
          parseFor(t, e) {
            return t.init = e, this.semicolon(!1), t.test = this.match(13) ? null : this.parseExpression(), this.semicolon(!1), t.update = this.match(11) ? null : this.parseExpression(), this.expect(11), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement("for")), this.scope.exit(), this.state.labels.pop(), this.finishNode(t, "ForStatement");
          }
          parseForIn(t, e, s) {
            let r = this.match(58);
            return this.next(), r ? s !== null && this.unexpected(s) : t.await = s !== null, e.type === "VariableDeclaration" && e.declarations[0].init != null && (!r || this.state.strict || e.kind !== "var" || e.declarations[0].id.type !== "Identifier") && this.raise(h.ForInOfLoopInitializer, { at: e, type: r ? "ForInStatement" : "ForOfStatement" }), e.type === "AssignmentPattern" && this.raise(h.InvalidLhs, { at: e, ancestor: { type: "ForStatement" } }), t.left = e, t.right = r ? this.parseExpression() : this.parseMaybeAssignAllowIn(), this.expect(11), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement("for")), this.scope.exit(), this.state.labels.pop(), this.finishNode(t, r ? "ForInStatement" : "ForOfStatement");
          }
          parseVar(t, e, s) {
            let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = t.declarations = [];
            for (t.kind = s; ; ) {
              let a = this.startNode();
              if (this.parseVarId(a, s), a.init = this.eat(29) ? e ? this.parseMaybeAssignDisallowIn() : this.parseMaybeAssignAllowIn() : null, a.init === null && !r && (a.id.type !== "Identifier" && !(e && (this.match(58) || this.isContextual(101))) ? this.raise(h.DeclarationMissingInitializer, { at: this.state.lastTokEndLoc, kind: "destructuring" }) : s === "const" && !(this.match(58) || this.isContextual(101)) && this.raise(h.DeclarationMissingInitializer, { at: this.state.lastTokEndLoc, kind: "const" })), i.push(this.finishNode(a, "VariableDeclarator")), !this.eat(12))
                break;
            }
            return t;
          }
          parseVarId(t, e) {
            t.id = this.parseBindingAtom(), this.checkLVal(t.id, { in: { type: "VariableDeclarator" }, binding: e === "var" ? kt : ze });
          }
          parseFunction(t) {
            let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : eo, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = e & Ns, i = e & si, a = !!r && !(e & ri);
            this.initFunction(t, s), this.match(55) && i && this.raise(h.GeneratorInSingleStatementContext, { at: this.state.startLoc }), t.generator = this.eat(55), r && (t.id = this.parseFunctionId(a));
            let n = this.state.maybeInArrowParameters;
            return this.state.maybeInArrowParameters = !1, this.scope.enter(Ue), this.prodParam.enter(Ot(s, t.generator)), r || (t.id = this.parseFunctionId()), this.parseFunctionParams(t, !1), this.withSmartMixTopicForbiddingContext(() => {
              this.parseFunctionBodyAndFinish(t, r ? "FunctionDeclaration" : "FunctionExpression");
            }), this.prodParam.exit(), this.scope.exit(), r && !i && this.registerFunctionStatementId(t), this.state.maybeInArrowParameters = n, t;
          }
          parseFunctionId(t) {
            return t || oe(this.state.type) ? this.parseIdentifier() : null;
          }
          parseFunctionParams(t, e) {
            this.expect(10), this.expressionScope.enter(Pn()), t.params = this.parseBindingList(11, 41, !1, e), this.expressionScope.exit();
          }
          registerFunctionStatementId(t) {
            !t.id || this.scope.declareName(t.id.name, this.state.strict || t.generator || t.async ? this.scope.treatFunctionsAsVar ? kt : ze : Fr, t.id.loc.start);
          }
          parseClass(t, e, s) {
            this.next(), this.takeDecorators(t);
            let r = this.state.strict;
            return this.state.strict = !0, this.parseClassId(t, e, s), this.parseClassSuper(t), t.body = this.parseClassBody(!!t.superClass, r), this.finishNode(t, e ? "ClassDeclaration" : "ClassExpression");
          }
          isClassProperty() {
            return this.match(29) || this.match(13) || this.match(8);
          }
          isClassMethod() {
            return this.match(10);
          }
          isNonstaticConstructor(t) {
            return !t.computed && !t.static && (t.key.name === "constructor" || t.key.value === "constructor");
          }
          parseClassBody(t, e) {
            this.classScope.enter();
            let s = { hadConstructor: !1, hadSuperClass: t }, r = [], i = this.startNode();
            if (i.body = [], this.expect(5), this.withSmartMixTopicForbiddingContext(() => {
              for (; !this.match(8); ) {
                if (this.eat(13)) {
                  if (r.length > 0)
                    throw this.raise(h.DecoratorSemicolon, { at: this.state.lastTokEndLoc });
                  continue;
                }
                if (this.match(26)) {
                  r.push(this.parseDecorator());
                  continue;
                }
                let a = this.startNode();
                r.length && (a.decorators = r, this.resetStartLocationFromNode(a, r[0]), r = []), this.parseClassMember(i, a, s), a.kind === "constructor" && a.decorators && a.decorators.length > 0 && this.raise(h.DecoratorConstructor, { at: a });
              }
            }), this.state.strict = e, this.next(), r.length)
              throw this.raise(h.TrailingDecorator, { at: this.state.startLoc });
            return this.classScope.exit(), this.finishNode(i, "ClassBody");
          }
          parseClassMemberFromModifier(t, e) {
            let s = this.parseIdentifier(!0);
            if (this.isClassMethod()) {
              let r = e;
              return r.kind = "method", r.computed = !1, r.key = s, r.static = !1, this.pushClassMethod(t, r, !1, !1, !1, !1), !0;
            } else if (this.isClassProperty()) {
              let r = e;
              return r.computed = !1, r.key = s, r.static = !1, t.body.push(this.parseClassProperty(r)), !0;
            }
            return this.resetPreviousNodeTrailingComments(s), !1;
          }
          parseClassMember(t, e, s) {
            let r = this.isContextual(104);
            if (r) {
              if (this.parseClassMemberFromModifier(t, e))
                return;
              if (this.eat(5)) {
                this.parseClassStaticBlock(t, e);
                return;
              }
            }
            this.parseClassMemberWithIsStatic(t, e, s, r);
          }
          parseClassMemberWithIsStatic(t, e, s, r) {
            let i = e, a = e, n = e, o = e, l = e, p = i, y = i;
            if (e.static = r, this.parsePropertyNamePrefixOperator(e), this.eat(55)) {
              p.kind = "method";
              let ae = this.match(134);
              if (this.parseClassElementName(p), ae) {
                this.pushClassPrivateMethod(t, a, !0, !1);
                return;
              }
              this.isNonstaticConstructor(i) && this.raise(h.ConstructorIsGenerator, { at: i.key }), this.pushClassMethod(t, i, !0, !1, !1, !1);
              return;
            }
            let S = oe(this.state.type) && !this.state.containsEsc, B = this.match(134), z = this.parseClassElementName(e), $ = this.state.startLoc;
            if (this.parsePostMemberNameModifiers(y), this.isClassMethod()) {
              if (p.kind = "method", B) {
                this.pushClassPrivateMethod(t, a, !1, !1);
                return;
              }
              let ae = this.isNonstaticConstructor(i), fe = !1;
              ae && (i.kind = "constructor", s.hadConstructor && !this.hasPlugin("typescript") && this.raise(h.DuplicateConstructor, { at: z }), ae && this.hasPlugin("typescript") && e.override && this.raise(h.OverrideOnConstructor, { at: z }), s.hadConstructor = !0, fe = s.hadSuperClass), this.pushClassMethod(t, i, !1, !1, ae, fe);
            } else if (this.isClassProperty())
              B ? this.pushClassPrivateProperty(t, o) : this.pushClassProperty(t, n);
            else if (S && z.name === "async" && !this.isLineTerminator()) {
              this.resetPreviousNodeTrailingComments(z);
              let ae = this.eat(55);
              y.optional && this.unexpected($), p.kind = "method";
              let fe = this.match(134);
              this.parseClassElementName(p), this.parsePostMemberNameModifiers(y), fe ? this.pushClassPrivateMethod(t, a, ae, !0) : (this.isNonstaticConstructor(i) && this.raise(h.ConstructorIsAsync, { at: i.key }), this.pushClassMethod(t, i, ae, !0, !1, !1));
            } else if (S && (z.name === "get" || z.name === "set") && !(this.match(55) && this.isLineTerminator())) {
              this.resetPreviousNodeTrailingComments(z), p.kind = z.name;
              let ae = this.match(134);
              this.parseClassElementName(i), ae ? this.pushClassPrivateMethod(t, a, !1, !1) : (this.isNonstaticConstructor(i) && this.raise(h.ConstructorIsAccessor, { at: i.key }), this.pushClassMethod(t, i, !1, !1, !1, !1)), this.checkGetterSetterParams(i);
            } else if (S && z.name === "accessor" && !this.isLineTerminator()) {
              this.expectPlugin("decoratorAutoAccessors"), this.resetPreviousNodeTrailingComments(z);
              let ae = this.match(134);
              this.parseClassElementName(n), this.pushClassAccessorProperty(t, l, ae);
            } else
              this.isLineTerminator() ? B ? this.pushClassPrivateProperty(t, o) : this.pushClassProperty(t, n) : this.unexpected();
          }
          parseClassElementName(t) {
            let { type: e, value: s } = this.state;
            if ((e === 128 || e === 129) && t.static && s === "prototype" && this.raise(h.StaticPrototype, { at: this.state.startLoc }), e === 134) {
              s === "constructor" && this.raise(h.ConstructorClassPrivateField, { at: this.state.startLoc });
              let r = this.parsePrivateName();
              return t.key = r, r;
            }
            return this.parsePropertyName(t);
          }
          parseClassStaticBlock(t, e) {
            var s;
            this.scope.enter(Xe | us | wt);
            let r = this.state.labels;
            this.state.labels = [], this.prodParam.enter(at);
            let i = e.body = [];
            this.parseBlockOrModuleBlockBody(i, void 0, !1, 8), this.prodParam.exit(), this.scope.exit(), this.state.labels = r, t.body.push(this.finishNode(e, "StaticBlock")), (s = e.decorators) != null && s.length && this.raise(h.DecoratorStaticBlock, { at: e });
          }
          pushClassProperty(t, e) {
            !e.computed && (e.key.name === "constructor" || e.key.value === "constructor") && this.raise(h.ConstructorClassField, { at: e.key }), t.body.push(this.parseClassProperty(e));
          }
          pushClassPrivateProperty(t, e) {
            let s = this.parseClassPrivateProperty(e);
            t.body.push(s), this.classScope.declarePrivateName(this.getPrivateNameSV(s.key), As, s.key.loc.start);
          }
          pushClassAccessorProperty(t, e, s) {
            if (!s && !e.computed) {
              let i = e.key;
              (i.name === "constructor" || i.value === "constructor") && this.raise(h.ConstructorClassField, { at: i });
            }
            let r = this.parseClassAccessorProperty(e);
            t.body.push(r), s && this.classScope.declarePrivateName(this.getPrivateNameSV(r.key), As, r.key.loc.start);
          }
          pushClassMethod(t, e, s, r, i, a) {
            t.body.push(this.parseMethod(e, s, r, i, a, "ClassMethod", !0));
          }
          pushClassPrivateMethod(t, e, s, r) {
            let i = this.parseMethod(e, s, r, !1, !1, "ClassPrivateMethod", !0);
            t.body.push(i);
            let a = i.kind === "get" ? i.static ? Za : tn : i.kind === "set" ? i.static ? en : sn : As;
            this.declareClassPrivateMethodInScope(i, a);
          }
          declareClassPrivateMethodInScope(t, e) {
            this.classScope.declarePrivateName(this.getPrivateNameSV(t.key), e, t.key.loc.start);
          }
          parsePostMemberNameModifiers(t) {
          }
          parseClassPrivateProperty(t) {
            return this.parseInitializer(t), this.semicolon(), this.finishNode(t, "ClassPrivateProperty");
          }
          parseClassProperty(t) {
            return this.parseInitializer(t), this.semicolon(), this.finishNode(t, "ClassProperty");
          }
          parseClassAccessorProperty(t) {
            return this.parseInitializer(t), this.semicolon(), this.finishNode(t, "ClassAccessorProperty");
          }
          parseInitializer(t) {
            this.scope.enter(Xe | wt), this.expressionScope.enter(Hr()), this.prodParam.enter(at), t.value = this.eat(29) ? this.parseMaybeAssignAllowIn() : null, this.expressionScope.exit(), this.prodParam.exit(), this.scope.exit();
          }
          parseClassId(t, e, s) {
            let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Dr;
            if (oe(this.state.type))
              t.id = this.parseIdentifier(), e && this.declareNameFromIdentifier(t.id, r);
            else if (s || !e)
              t.id = null;
            else
              throw this.raise(h.MissingClassName, { at: this.state.startLoc });
          }
          parseClassSuper(t) {
            t.superClass = this.eat(81) ? this.parseExprSubscripts() : null;
          }
          parseExport(t) {
            let e = this.maybeParseExportDefaultSpecifier(t), s = !e || this.eat(12), r = s && this.eatExportStar(t), i = r && this.maybeParseExportNamespaceSpecifier(t), a = s && (!i || this.eat(12)), n = e || r;
            if (r && !i)
              return e && this.unexpected(), this.parseExportFrom(t, !0), this.finishNode(t, "ExportAllDeclaration");
            let o = this.maybeParseExportNamedSpecifiers(t);
            if (e && s && !r && !o || i && a && !o)
              throw this.unexpected(null, 5);
            let l;
            if (n || o ? (l = !1, this.parseExportFrom(t, n)) : l = this.maybeParseExportDeclaration(t), n || o || l)
              return this.checkExport(t, !0, !1, !!t.source), this.finishNode(t, "ExportNamedDeclaration");
            if (this.eat(65))
              return t.declaration = this.parseExportDefaultExpression(), this.checkExport(t, !0, !0), this.finishNode(t, "ExportDefaultDeclaration");
            throw this.unexpected(null, 5);
          }
          eatExportStar(t) {
            return this.eat(55);
          }
          maybeParseExportDefaultSpecifier(t) {
            if (this.isExportDefaultSpecifier()) {
              this.expectPlugin("exportDefaultFrom");
              let e = this.startNode();
              return e.exported = this.parseIdentifier(!0), t.specifiers = [this.finishNode(e, "ExportDefaultSpecifier")], !0;
            }
            return !1;
          }
          maybeParseExportNamespaceSpecifier(t) {
            if (this.isContextual(93)) {
              t.specifiers || (t.specifiers = []);
              let e = this.startNodeAt(this.state.lastTokStart, this.state.lastTokStartLoc);
              return this.next(), e.exported = this.parseModuleExportName(), t.specifiers.push(this.finishNode(e, "ExportNamespaceSpecifier")), !0;
            }
            return !1;
          }
          maybeParseExportNamedSpecifiers(t) {
            if (this.match(5)) {
              t.specifiers || (t.specifiers = []);
              let e = t.exportKind === "type";
              return t.specifiers.push(...this.parseExportSpecifiers(e)), t.source = null, t.declaration = null, this.hasPlugin("importAssertions") && (t.assertions = []), !0;
            }
            return !1;
          }
          maybeParseExportDeclaration(t) {
            return this.shouldParseExportDeclaration() ? (t.specifiers = [], t.source = null, this.hasPlugin("importAssertions") && (t.assertions = []), t.declaration = this.parseExportDeclaration(t), !0) : !1;
          }
          isAsyncFunction() {
            if (!this.isContextual(95))
              return !1;
            let t = this.nextTokenStart();
            return !Ps.test(this.input.slice(this.state.pos, t)) && this.isUnparsedContextual(t, "function");
          }
          parseExportDefaultExpression() {
            let t = this.startNode(), e = this.isAsyncFunction();
            if (this.match(68) || e)
              return this.next(), e && this.next(), this.parseFunction(t, Ns | ri, e);
            if (this.match(80))
              return this.parseClass(t, !0, !0);
            if (this.match(26))
              return this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") && this.raise(h.DecoratorBeforeExport, { at: this.state.startLoc }), this.parseDecorators(!1), this.parseClass(t, !0, !0);
            if (this.match(75) || this.match(74) || this.isLet())
              throw this.raise(h.UnsupportedDefaultExport, { at: this.state.startLoc });
            let s = this.parseMaybeAssignAllowIn();
            return this.semicolon(), s;
          }
          parseExportDeclaration(t) {
            return this.parseStatement(null);
          }
          isExportDefaultSpecifier() {
            let { type: t } = this.state;
            if (oe(t)) {
              if (t === 95 && !this.state.containsEsc || t === 99)
                return !1;
              if ((t === 126 || t === 125) && !this.state.containsEsc) {
                let { type: r } = this.lookahead();
                if (oe(r) && r !== 97 || r === 5)
                  return this.expectOnePlugin(["flow", "typescript"]), !1;
              }
            } else if (!this.match(65))
              return !1;
            let e = this.nextTokenStart(), s = this.isUnparsedContextual(e, "from");
            if (this.input.charCodeAt(e) === 44 || oe(this.state.type) && s)
              return !0;
            if (this.match(65) && s) {
              let r = this.input.charCodeAt(this.nextTokenStartSince(e + 4));
              return r === 34 || r === 39;
            }
            return !1;
          }
          parseExportFrom(t, e) {
            if (this.eatContextual(97)) {
              t.source = this.parseImportSource(), this.checkExport(t);
              let s = this.maybeParseImportAssertions();
              s && (t.assertions = s);
            } else
              e && this.unexpected();
            this.semicolon();
          }
          shouldParseExportDeclaration() {
            let { type: t } = this.state;
            if (t === 26 && (this.expectOnePlugin(["decorators", "decorators-legacy"]), this.hasPlugin("decorators"))) {
              if (this.getPluginOption("decorators", "decoratorsBeforeExport"))
                throw this.raise(h.DecoratorBeforeExport, { at: this.state.startLoc });
              return !0;
            }
            return t === 74 || t === 75 || t === 68 || t === 80 || this.isLet() || this.isAsyncFunction();
          }
          checkExport(t, e, s, r) {
            if (e) {
              if (s) {
                if (this.checkDuplicateExports(t, "default"), this.hasPlugin("exportDefaultFrom")) {
                  var i;
                  let a = t.declaration;
                  a.type === "Identifier" && a.name === "from" && a.end - a.start === 4 && !((i = a.extra) != null && i.parenthesized) && this.raise(h.ExportDefaultFromAsIdentifier, { at: a });
                }
              } else if (t.specifiers && t.specifiers.length)
                for (let a of t.specifiers) {
                  let { exported: n } = a, o = n.type === "Identifier" ? n.name : n.value;
                  if (this.checkDuplicateExports(a, o), !r && a.local) {
                    let { local: l } = a;
                    l.type !== "Identifier" ? this.raise(h.ExportBindingIsString, { at: a, localName: l.value, exportName: o }) : (this.checkReservedWord(l.name, l.loc.start, !0, !1), this.scope.checkLocalExport(l));
                  }
                }
              else if (t.declaration) {
                if (t.declaration.type === "FunctionDeclaration" || t.declaration.type === "ClassDeclaration") {
                  let a = t.declaration.id;
                  if (!a)
                    throw new Error("Assertion failure");
                  this.checkDuplicateExports(t, a.name);
                } else if (t.declaration.type === "VariableDeclaration")
                  for (let a of t.declaration.declarations)
                    this.checkDeclaration(a.id);
              }
            }
            if (this.state.decoratorStack[this.state.decoratorStack.length - 1].length)
              throw this.raise(h.UnsupportedDecoratorExport, { at: t });
          }
          checkDeclaration(t) {
            if (t.type === "Identifier")
              this.checkDuplicateExports(t, t.name);
            else if (t.type === "ObjectPattern")
              for (let e of t.properties)
                this.checkDeclaration(e);
            else if (t.type === "ArrayPattern")
              for (let e of t.elements)
                e && this.checkDeclaration(e);
            else
              t.type === "ObjectProperty" ? this.checkDeclaration(t.value) : t.type === "RestElement" ? this.checkDeclaration(t.argument) : t.type === "AssignmentPattern" && this.checkDeclaration(t.left);
          }
          checkDuplicateExports(t, e) {
            this.exportedIdentifiers.has(e) && (e === "default" ? this.raise(h.DuplicateDefaultExport, { at: t }) : this.raise(h.DuplicateExport, { at: t, exportName: e })), this.exportedIdentifiers.add(e);
          }
          parseExportSpecifiers(t) {
            let e = [], s = !0;
            for (this.expect(5); !this.eat(8); ) {
              if (s)
                s = !1;
              else if (this.expect(12), this.eat(8))
                break;
              let r = this.isContextual(126), i = this.match(129), a = this.startNode();
              a.local = this.parseModuleExportName(), e.push(this.parseExportSpecifier(a, i, t, r));
            }
            return e;
          }
          parseExportSpecifier(t, e, s, r) {
            return this.eatContextual(93) ? t.exported = this.parseModuleExportName() : e ? t.exported = vn(t.local) : t.exported || (t.exported = He(t.local)), this.finishNode(t, "ExportSpecifier");
          }
          parseModuleExportName() {
            if (this.match(129)) {
              let t = this.parseStringLiteral(this.state.value), e = t.value.match(to);
              return e && this.raise(h.ModuleExportNameHasLoneSurrogate, { at: t, surrogateCharCode: e[0].charCodeAt(0) }), t;
            }
            return this.parseIdentifier(!0);
          }
          parseImport(t) {
            if (t.specifiers = [], !this.match(129)) {
              let s = !this.maybeParseDefaultImportSpecifier(t) || this.eat(12), r = s && this.maybeParseStarImportSpecifier(t);
              s && !r && this.parseNamedImportSpecifiers(t), this.expectContextual(97);
            }
            t.source = this.parseImportSource();
            let e = this.maybeParseImportAssertions();
            if (e)
              t.assertions = e;
            else {
              let s = this.maybeParseModuleAttributes();
              s && (t.attributes = s);
            }
            return this.semicolon(), this.finishNode(t, "ImportDeclaration");
          }
          parseImportSource() {
            return this.match(129) || this.unexpected(), this.parseExprAtom();
          }
          shouldParseDefaultImport(t) {
            return oe(this.state.type);
          }
          parseImportSpecifierLocal(t, e, s) {
            e.local = this.parseIdentifier(), t.specifiers.push(this.finishImportSpecifier(e, s));
          }
          finishImportSpecifier(t, e) {
            return this.checkLVal(t.local, { in: t, binding: ze }), this.finishNode(t, e);
          }
          parseAssertEntries() {
            let t = [], e = /* @__PURE__ */ new Set();
            do {
              if (this.match(8))
                break;
              let s = this.startNode(), r = this.state.value;
              if (e.has(r) && this.raise(h.ModuleAttributesWithDuplicateKeys, { at: this.state.startLoc, key: r }), e.add(r), this.match(129) ? s.key = this.parseStringLiteral(r) : s.key = this.parseIdentifier(!0), this.expect(14), !this.match(129))
                throw this.raise(h.ModuleAttributeInvalidValue, { at: this.state.startLoc });
              s.value = this.parseStringLiteral(this.state.value), this.finishNode(s, "ImportAttribute"), t.push(s);
            } while (this.eat(12));
            return t;
          }
          maybeParseModuleAttributes() {
            if (this.match(76) && !this.hasPrecedingLineBreak())
              this.expectPlugin("moduleAttributes"), this.next();
            else
              return this.hasPlugin("moduleAttributes") ? [] : null;
            let t = [], e = /* @__PURE__ */ new Set();
            do {
              let s = this.startNode();
              if (s.key = this.parseIdentifier(!0), s.key.name !== "type" && this.raise(h.ModuleAttributeDifferentFromType, { at: s.key }), e.has(s.key.name) && this.raise(h.ModuleAttributesWithDuplicateKeys, { at: s.key, key: s.key.name }), e.add(s.key.name), this.expect(14), !this.match(129))
                throw this.raise(h.ModuleAttributeInvalidValue, { at: this.state.startLoc });
              s.value = this.parseStringLiteral(this.state.value), this.finishNode(s, "ImportAttribute"), t.push(s);
            } while (this.eat(12));
            return t;
          }
          maybeParseImportAssertions() {
            if (this.isContextual(94) && !this.hasPrecedingLineBreak())
              this.expectPlugin("importAssertions"), this.next();
            else
              return this.hasPlugin("importAssertions") ? [] : null;
            this.eat(5);
            let t = this.parseAssertEntries();
            return this.eat(8), t;
          }
          maybeParseDefaultImportSpecifier(t) {
            return this.shouldParseDefaultImport(t) ? (this.parseImportSpecifierLocal(t, this.startNode(), "ImportDefaultSpecifier"), !0) : !1;
          }
          maybeParseStarImportSpecifier(t) {
            if (this.match(55)) {
              let e = this.startNode();
              return this.next(), this.expectContextual(93), this.parseImportSpecifierLocal(t, e, "ImportNamespaceSpecifier"), !0;
            }
            return !1;
          }
          parseNamedImportSpecifiers(t) {
            let e = !0;
            for (this.expect(5); !this.eat(8); ) {
              if (e)
                e = !1;
              else {
                if (this.eat(14))
                  throw this.raise(h.DestructureNamedImport, { at: this.state.startLoc });
                if (this.expect(12), this.eat(8))
                  break;
              }
              let s = this.startNode(), r = this.match(129), i = this.isContextual(126);
              s.imported = this.parseModuleExportName();
              let a = this.parseImportSpecifier(s, r, t.importKind === "type" || t.importKind === "typeof", i);
              t.specifiers.push(a);
            }
          }
          parseImportSpecifier(t, e, s, r) {
            if (this.eatContextual(93))
              t.local = this.parseIdentifier();
            else {
              let { imported: i } = t;
              if (e)
                throw this.raise(h.ImportBindingIsString, { at: t, importName: i.value });
              this.checkReservedWord(i.name, t.loc.start, !0, !0), t.local || (t.local = He(i));
            }
            return this.finishImportSpecifier(t, "ImportSpecifier");
          }
          isThisParam(t) {
            return t.type === "Identifier" && t.name === "this";
          }
        }, ii = class extends ro {
          constructor(t, e) {
            t = Gn(t), super(t, e), this.options = t, this.initializeScopes(), this.plugins = io(this.options.plugins), this.filename = t.sourceFilename;
          }
          getScopeHandler() {
            return Es;
          }
          parse() {
            this.enterInitialScopes();
            let t = this.startNode(), e = this.startNode();
            return this.nextToken(), t.errors = null, this.parseTopLevel(t, e), t.errors = this.state.errors, t;
          }
        };
        function io(t) {
          let e = /* @__PURE__ */ new Map();
          for (let s of t) {
            let [r, i] = Array.isArray(s) ? s : [s, {}];
            e.has(r) || e.set(r, i || {});
          }
          return e;
        }
        function ao(t, e) {
          var s;
          if (((s = e) == null ? void 0 : s.sourceType) === "unambiguous") {
            e = Object.assign({}, e);
            try {
              e.sourceType = "module";
              let r = xt(e, t), i = r.parse();
              if (r.sawUnambiguousESM)
                return i;
              if (r.ambiguousScriptDifferentAst)
                try {
                  return e.sourceType = "script", xt(e, t).parse();
                } catch {
                }
              else
                i.program.sourceType = "script";
              return i;
            } catch (r) {
              try {
                return e.sourceType = "script", xt(e, t).parse();
              } catch {
              }
              throw r;
            }
          } else
            return xt(e, t).parse();
        }
        function no(t, e) {
          let s = xt(e, t);
          return s.options.strictMode && (s.state.strict = !0), s.getExpression();
        }
        function oo(t) {
          let e = {};
          for (let s of Object.keys(t))
            e[s] = je(t[s]);
          return e;
        }
        var ho = oo(wa);
        function xt(t, e) {
          let s = ii;
          return t != null && t.plugins && (Jn(t.plugins), s = lo(t.plugins)), new s(t, e);
        }
        var ai = {};
        function lo(t) {
          let e = Xn.filter((i) => ge(t, i)), s = e.join("/"), r = ai[s];
          if (!r) {
            r = ii;
            for (let i of e)
              r = Zr[i](r);
            ai[s] = r;
          }
          return r;
        }
        I.parse = ao, I.parseExpression = no, I.tokTypes = ho;
      } }), aa = C({ "src/language-js/parse/json.js"(I, P) {
        W();
        var A = ar(), x = Zt(), g = or(), O = hr();
        function M() {
          let L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, { allowComments: Q = !0 } = L;
          return function(te) {
            let { parseExpression: q } = ur(), le;
            try {
              le = q(te, { tokens: !0, ranges: !0 });
            } catch (Ee) {
              throw O(Ee);
            }
            if (!Q && A(le.comments))
              throw k(le.comments[0], "Comment");
            return _(le), le;
          };
        }
        function k(L, Q) {
          let [te, q] = [L.loc.start, L.loc.end].map((le) => {
            let { line: Ee, column: se } = le;
            return { line: Ee, column: se + 1 };
          });
          return x("".concat(Q, " is not allowed in JSON."), { start: te, end: q });
        }
        function _(L) {
          switch (L.type) {
            case "ArrayExpression":
              for (let Q of L.elements)
                Q !== null && _(Q);
              return;
            case "ObjectExpression":
              for (let Q of L.properties)
                _(Q);
              return;
            case "ObjectProperty":
              if (L.computed)
                throw k(L.key, "Computed key");
              if (L.shorthand)
                throw k(L.key, "Shorthand property");
              L.key.type !== "Identifier" && _(L.key), _(L.value);
              return;
            case "UnaryExpression": {
              let { operator: Q, argument: te } = L;
              if (Q !== "+" && Q !== "-")
                throw k(L, "Operator '".concat(L.operator, "'"));
              if (te.type === "NumericLiteral" || te.type === "Identifier" && (te.name === "Infinity" || te.name === "NaN"))
                return;
              throw k(te, "Operator '".concat(Q, "' before '").concat(te.type, "'"));
            }
            case "Identifier":
              if (L.name !== "Infinity" && L.name !== "NaN" && L.name !== "undefined")
                throw k(L, "Identifier '".concat(L.name, "'"));
              return;
            case "TemplateLiteral":
              if (A(L.expressions))
                throw k(L.expressions[0], "'TemplateLiteral' with expression");
              for (let Q of L.quasis)
                _(Q);
              return;
            case "NullLiteral":
            case "BooleanLiteral":
            case "NumericLiteral":
            case "StringLiteral":
            case "TemplateElement":
              return;
            default:
              throw k(L, "'".concat(L.type, "'"));
          }
        }
        var ee = M(), Y = { json: g({ parse: ee, hasPragma() {
          return !0;
        } }), json5: g(ee), "json-stringify": g({ parse: M({ allowComments: !1 }), astFormat: "estree-json" }) };
        P.exports = Y;
      } });
      W();
      var na = ye(), oa = ue(), ha = pe(), Ze = or(), la = hr(), pa = ia(), ua = aa(), ca = { sourceType: "module", allowImportExportEverywhere: !0, allowReturnOutsideFunction: !0, allowSuperOutsideMethod: !0, allowUndeclaredExports: !0, errorRecovery: !0, createParenthesizedExpressions: !0, plugins: ["doExpressions", "exportDefaultFrom", "functionBind", "functionSent", "throwExpressions", "partialApplication", ["decorators", { decoratorsBeforeExport: !1 }], "importAssertions", "decimal", "moduleBlocks", "asyncDoExpressions", "regexpUnicodeSets", "destructuringPrivate", "decoratorAutoAccessors"], tokens: !0, ranges: !0 }, da = ["recordAndTuple", { syntaxType: "hash" }], cr = "v8intrinsic", dr = [["pipelineOperator", { proposal: "hack", topicToken: "%" }], ["pipelineOperator", { proposal: "minimal" }], ["pipelineOperator", { proposal: "fsharp" }]], ke = function(I) {
        let P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ca;
        return Object.assign(Object.assign({}, P), {}, { plugins: [...P.plugins, ...I] });
      }, ma = /@(?:no)?flow\b/;
      function fa(I, P) {
        if (P.filepath && P.filepath.endsWith(".js.flow"))
          return !0;
        let A = oa(I);
        A && (I = I.slice(A.length));
        let x = ha(I, 0);
        return x !== !1 && (I = I.slice(0, x)), ma.test(I);
      }
      function ya(I, P, A) {
        let x = ur()[I](P, A), g = x.errors.find((O) => !Ta.has(O.reasonCode));
        if (g)
          throw g;
        return x;
      }
      function et(I) {
        for (var P = arguments.length, A = new Array(P > 1 ? P - 1 : 0), x = 1; x < P; x++)
          A[x - 1] = arguments[x];
        return function(g, O) {
          let M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          if ((M.parser === "babel" || M.parser === "__babel_estree") && fa(g, M))
            return M.parser = "babel-flow", mr(g, O, M);
          let k = A;
          M.__babelSourceType === "script" && (k = k.map((L) => Object.assign(Object.assign({}, L), {}, { sourceType: "script" }))), /#[[{]/.test(g) && (k = k.map((L) => ke([da], L)));
          let _ = /%[A-Z]/.test(g);
          g.includes("|>") ? k = (_ ? [...dr, cr] : dr).flatMap((L) => k.map((Q) => ke([L], Q))) : _ && (k = k.map((L) => ke([cr], L)));
          let { result: ee, error: Y } = na(...k.map((L) => () => ya(I, g, L)));
          if (!ee)
            throw la(Y);
          return M.originalText = g, pa(ee, M);
        };
      }
      var xa = et("parse", ke(["jsx", "flow"])), mr = et("parse", ke(["jsx", ["flow", { all: !0, enums: !0 }]])), ga = et("parse", ke(["jsx", "typescript"]), ke(["typescript"])), Aa = et("parse", ke(["jsx", "flow", "estree"])), Pa = et("parseExpression", ke(["jsx"])), ba = et("parseExpression", ke(["typescript"])), Ta = /* @__PURE__ */ new Set(["StrictNumericEscape", "StrictWith", "StrictOctalLiteral", "StrictDelete", "StrictEvalArguments", "StrictEvalArgumentsBinding", "StrictFunction", "EmptyTypeArguments", "EmptyTypeParameters", "ConstructorHasTypeParameters", "UnsupportedParameterPropertyKind", "UnexpectedParameterModifier", "MixedLabeledAndUnlabeledElements", "InvalidTupleMemberLabel", "NonClassMethodPropertyHasAbstractModifer", "ReadonlyForMethodSignature", "ClassMethodHasDeclare", "ClassMethodHasReadonly", "InvalidModifierOnTypeMember", "DuplicateAccessibilityModifier", "IndexSignatureHasDeclare", "DecoratorExportClass", "ParamDupe", "InvalidDecimal", "RestTrailingComma", "UnsupportedParameterDecorator", "UnterminatedJsxContent", "UnexpectedReservedWord", "ModuleAttributesWithDuplicateKeys", "LineTerminatorBeforeArrow", "InvalidEscapeSequenceTemplate", "NonAbstractClassHasAbstractMethod", "UnsupportedPropertyDecorator", "OptionalTypeBeforeRequired", "PatternIsOptional", "OptionalBindingPattern", "DeclareClassFieldHasInitializer", "TypeImportCannotSpecifyDefaultAndNamed", "DeclareFunctionHasImplementation", "ConstructorClassField", "VarRedeclaration", "InvalidPrivateFieldResolution", "DuplicateExport"]), fr = Ze(xa), yr = Ze(ga), xr = Ze(Pa), Ea = Ze(ba);
      c.exports = { parsers: Object.assign(Object.assign({ babel: fr, "babel-flow": Ze(mr), "babel-ts": yr }, ua), {}, { __js_expression: xr, __vue_expression: xr, __vue_ts_expression: Ea, __vue_event_binding: fr, __vue_ts_event_binding: yr, __babel_estree: Ze(Aa) }) };
    });
    return qi();
  });
})(ks);
const co = /* @__PURE__ */ po(ks.exports), fo = /* @__PURE__ */ uo({
  __proto__: null,
  default: co
}, [ks.exports]);
export {
  fo as p
};
