import { a as al, c as Xu } from "./b1893f4d.js";
function sl(rn, Ln) {
  for (var Me = 0; Me < Ln.length; Me++) {
    const ft = Ln[Me];
    if (typeof ft != "string" && !Array.isArray(ft)) {
      for (const jt in ft)
        if (jt !== "default" && !(jt in rn)) {
          const Rt = Object.getOwnPropertyDescriptor(ft, jt);
          Rt && Object.defineProperty(rn, jt, Rt.get ? Rt : {
            enumerable: !0,
            get: () => ft[jt]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(rn, Symbol.toStringTag, { value: "Module" }));
}
var Fr = { exports: {} };
(function(rn, Ln) {
  (function(Me) {
    rn.exports = Me();
  })(function() {
    var Me = (Le, de) => () => (de || Le((de = { exports: {} }).exports, de), de.exports), ft = Me((Le, de) => {
      var oe = function(ge) {
        return ge && ge.Math == Math && ge;
      };
      de.exports = oe(typeof globalThis == "object" && globalThis) || oe(typeof window == "object" && window) || oe(typeof self == "object" && self) || oe(typeof Xu == "object" && Xu) || function() {
        return this;
      }() || Function("return this")();
    }), jt = Me((Le, de) => {
      de.exports = function(oe) {
        try {
          return !!oe();
        } catch {
          return !0;
        }
      };
    }), Rt = Me((Le, de) => {
      var oe = jt();
      de.exports = !oe(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] != 7;
      });
    }), On = Me((Le, de) => {
      var oe = jt();
      de.exports = !oe(function() {
        var ge = function() {
        }.bind();
        return typeof ge != "function" || ge.hasOwnProperty("prototype");
      });
    }), Xt = Me((Le, de) => {
      var oe = On(), ge = Function.prototype.call;
      de.exports = oe ? ge.bind(ge) : function() {
        return ge.apply(ge, arguments);
      };
    }), Gu = Me((Le) => {
      var de = {}.propertyIsEnumerable, oe = Object.getOwnPropertyDescriptor, ge = oe && !de.call({ 1: 2 }, 1);
      Le.f = ge ? function(Fe) {
        var Ce = oe(this, Fe);
        return !!Ce && Ce.enumerable;
      } : de;
    }), Mn = Me((Le, de) => {
      de.exports = function(oe, ge) {
        return { enumerable: !(oe & 1), configurable: !(oe & 2), writable: !(oe & 4), value: ge };
      };
    }), Lt = Me((Le, de) => {
      var oe = On(), ge = Function.prototype, Fe = ge.bind, Ce = ge.call, Ne = oe && Fe.bind(Ce, Ce);
      de.exports = oe ? function(ke) {
        return ke && Ne(ke);
      } : function(ke) {
        return ke && function() {
          return Ce.apply(ke, arguments);
        };
      };
    }), _n = Me((Le, de) => {
      var oe = Lt(), ge = oe({}.toString), Fe = oe("".slice);
      de.exports = function(Ce) {
        return Fe(ge(Ce), 8, -1);
      };
    }), zu = Me((Le, de) => {
      var oe = ft(), ge = Lt(), Fe = jt(), Ce = _n(), Ne = oe.Object, ke = ge("".split);
      de.exports = Fe(function() {
        return !Ne("z").propertyIsEnumerable(0);
      }) ? function(je) {
        return Ce(je) == "String" ? ke(je, "") : Ne(je);
      } : Ne;
    }), Ar = Me((Le, de) => {
      var oe = ft(), ge = oe.TypeError;
      de.exports = function(Fe) {
        if (Fe == null)
          throw ge("Can't call method on " + Fe);
        return Fe;
      };
    }), Rn = Me((Le, de) => {
      var oe = zu(), ge = Ar();
      de.exports = function(Fe) {
        return oe(ge(Fe));
      };
    }), Ot = Me((Le, de) => {
      de.exports = function(oe) {
        return typeof oe == "function";
      };
    }), Gt = Me((Le, de) => {
      var oe = Ot();
      de.exports = function(ge) {
        return typeof ge == "object" ? ge !== null : oe(ge);
      };
    }), yn = Me((Le, de) => {
      var oe = ft(), ge = Ot(), Fe = function(Ce) {
        return ge(Ce) ? Ce : void 0;
      };
      de.exports = function(Ce, Ne) {
        return arguments.length < 2 ? Fe(oe[Ce]) : oe[Ce] && oe[Ce][Ne];
      };
    }), vr = Me((Le, de) => {
      var oe = Lt();
      de.exports = oe({}.isPrototypeOf);
    }), Qu = Me((Le, de) => {
      var oe = yn();
      de.exports = oe("navigator", "userAgent") || "";
    }), Yu = Me((Le, de) => {
      var oe = ft(), ge = Qu(), Fe = oe.process, Ce = oe.Deno, Ne = Fe && Fe.versions || Ce && Ce.version, ke = Ne && Ne.v8, je, Re;
      ke && (je = ke.split("."), Re = je[0] > 0 && je[0] < 4 ? 1 : +(je[0] + je[1])), !Re && ge && (je = ge.match(/Edge\/(\d+)/), (!je || je[1] >= 74) && (je = ge.match(/Chrome\/(\d+)/), je && (Re = +je[1]))), de.exports = Re;
    }), xr = Me((Le, de) => {
      var oe = Yu(), ge = jt();
      de.exports = !!Object.getOwnPropertySymbols && !ge(function() {
        var Fe = Symbol();
        return !String(Fe) || !(Object(Fe) instanceof Symbol) || !Symbol.sham && oe && oe < 41;
      });
    }), br = Me((Le, de) => {
      var oe = xr();
      de.exports = oe && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }), Sr = Me((Le, de) => {
      var oe = ft(), ge = yn(), Fe = Ot(), Ce = vr(), Ne = br(), ke = oe.Object;
      de.exports = Ne ? function(je) {
        return typeof je == "symbol";
      } : function(je) {
        var Re = ge("Symbol");
        return Fe(Re) && Ce(Re.prototype, ke(je));
      };
    }), Vn = Me((Le, de) => {
      var oe = ft(), ge = oe.String;
      de.exports = function(Fe) {
        try {
          return ge(Fe);
        } catch {
          return "Object";
        }
      };
    }), hn = Me((Le, de) => {
      var oe = ft(), ge = Ot(), Fe = Vn(), Ce = oe.TypeError;
      de.exports = function(Ne) {
        if (ge(Ne))
          return Ne;
        throw Ce(Fe(Ne) + " is not a function");
      };
    }), $n = Me((Le, de) => {
      var oe = hn();
      de.exports = function(ge, Fe) {
        var Ce = ge[Fe];
        return Ce == null ? void 0 : oe(Ce);
      };
    }), Zu = Me((Le, de) => {
      var oe = ft(), ge = Xt(), Fe = Ot(), Ce = Gt(), Ne = oe.TypeError;
      de.exports = function(ke, je) {
        var Re, Ve;
        if (je === "string" && Fe(Re = ke.toString) && !Ce(Ve = ge(Re, ke)) || Fe(Re = ke.valueOf) && !Ce(Ve = ge(Re, ke)) || je !== "string" && Fe(Re = ke.toString) && !Ce(Ve = ge(Re, ke)))
          return Ve;
        throw Ne("Can't convert object to primitive value");
      };
    }), Ku = Me((Le, de) => {
      de.exports = !1;
    }), Jn = Me((Le, de) => {
      var oe = ft(), ge = Object.defineProperty;
      de.exports = function(Fe, Ce) {
        try {
          ge(oe, Fe, { value: Ce, configurable: !0, writable: !0 });
        } catch {
          oe[Fe] = Ce;
        }
        return Ce;
      };
    }), Un = Me((Le, de) => {
      var oe = ft(), ge = Jn(), Fe = "__core-js_shared__", Ce = oe[Fe] || ge(Fe, {});
      de.exports = Ce;
    }), Tr = Me((Le, de) => {
      var oe = Ku(), ge = Un();
      (de.exports = function(Fe, Ce) {
        return ge[Fe] || (ge[Fe] = Ce !== void 0 ? Ce : {});
      })("versions", []).push({ version: "3.22.2", mode: oe ? "pure" : "global", copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.22.2/LICENSE", source: "https://github.com/zloirock/core-js" });
    }), Hn = Me((Le, de) => {
      var oe = ft(), ge = Ar(), Fe = oe.Object;
      de.exports = function(Ce) {
        return Fe(ge(Ce));
      };
    }), Ht = Me((Le, de) => {
      var oe = Lt(), ge = Hn(), Fe = oe({}.hasOwnProperty);
      de.exports = Object.hasOwn || function(Ce, Ne) {
        return Fe(ge(Ce), Ne);
      };
    }), Br = Me((Le, de) => {
      var oe = Lt(), ge = 0, Fe = Math.random(), Ce = oe(1 .toString);
      de.exports = function(Ne) {
        return "Symbol(" + (Ne === void 0 ? "" : Ne) + ")_" + Ce(++ge + Fe, 36);
      };
    }), zt = Me((Le, de) => {
      var oe = ft(), ge = Tr(), Fe = Ht(), Ce = Br(), Ne = xr(), ke = br(), je = ge("wks"), Re = oe.Symbol, Ve = Re && Re.for, ze = ke ? Re : Re && Re.withoutSetter || Ce;
      de.exports = function(Xe) {
        if (!Fe(je, Xe) || !(Ne || typeof je[Xe] == "string")) {
          var Qe = "Symbol." + Xe;
          Ne && Fe(Re, Xe) ? je[Xe] = Re[Xe] : ke && Ve ? je[Xe] = Ve(Qe) : je[Xe] = ze(Qe);
        }
        return je[Xe];
      };
    }), ei = Me((Le, de) => {
      var oe = ft(), ge = Xt(), Fe = Gt(), Ce = Sr(), Ne = $n(), ke = Zu(), je = zt(), Re = oe.TypeError, Ve = je("toPrimitive");
      de.exports = function(ze, Xe) {
        if (!Fe(ze) || Ce(ze))
          return ze;
        var Qe = Ne(ze, Ve), tt;
        if (Qe) {
          if (Xe === void 0 && (Xe = "default"), tt = ge(Qe, ze, Xe), !Fe(tt) || Ce(tt))
            return tt;
          throw Re("Can't convert object to primitive value");
        }
        return Xe === void 0 && (Xe = "number"), ke(ze, Xe);
      };
    }), qn = Me((Le, de) => {
      var oe = ei(), ge = Sr();
      de.exports = function(Fe) {
        var Ce = oe(Fe, "string");
        return ge(Ce) ? Ce : Ce + "";
      };
    }), ti = Me((Le, de) => {
      var oe = ft(), ge = Gt(), Fe = oe.document, Ce = ge(Fe) && ge(Fe.createElement);
      de.exports = function(Ne) {
        return Ce ? Fe.createElement(Ne) : {};
      };
    }), wr = Me((Le, de) => {
      var oe = Rt(), ge = jt(), Fe = ti();
      de.exports = !oe && !ge(function() {
        return Object.defineProperty(Fe("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }), Nr = Me((Le) => {
      var de = Rt(), oe = Xt(), ge = Gu(), Fe = Mn(), Ce = Rn(), Ne = qn(), ke = Ht(), je = wr(), Re = Object.getOwnPropertyDescriptor;
      Le.f = de ? Re : function(Ve, ze) {
        if (Ve = Ce(Ve), ze = Ne(ze), je)
          try {
            return Re(Ve, ze);
          } catch {
          }
        if (ke(Ve, ze))
          return Fe(!oe(ge.f, Ve, ze), Ve[ze]);
      };
    }), ni = Me((Le, de) => {
      var oe = Rt(), ge = jt();
      de.exports = oe && ge(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype != 42;
      });
    }), un = Me((Le, de) => {
      var oe = ft(), ge = Gt(), Fe = oe.String, Ce = oe.TypeError;
      de.exports = function(Ne) {
        if (ge(Ne))
          return Ne;
        throw Ce(Fe(Ne) + " is not an object");
      };
    }), Wn = Me((Le) => {
      var de = ft(), oe = Rt(), ge = wr(), Fe = ni(), Ce = un(), Ne = qn(), ke = de.TypeError, je = Object.defineProperty, Re = Object.getOwnPropertyDescriptor, Ve = "enumerable", ze = "configurable", Xe = "writable";
      Le.f = oe ? Fe ? function(Qe, tt, Ke) {
        if (Ce(Qe), tt = Ne(tt), Ce(Ke), typeof Qe == "function" && tt === "prototype" && "value" in Ke && Xe in Ke && !Ke[Xe]) {
          var et = Re(Qe, tt);
          et && et[Xe] && (Qe[tt] = Ke.value, Ke = { configurable: ze in Ke ? Ke[ze] : et[ze], enumerable: Ve in Ke ? Ke[Ve] : et[Ve], writable: !1 });
        }
        return je(Qe, tt, Ke);
      } : je : function(Qe, tt, Ke) {
        if (Ce(Qe), tt = Ne(tt), Ce(Ke), ge)
          try {
            return je(Qe, tt, Ke);
          } catch {
          }
        if ("get" in Ke || "set" in Ke)
          throw ke("Accessors not supported");
        return "value" in Ke && (Qe[tt] = Ke.value), Qe;
      };
    }), Xn = Me((Le, de) => {
      var oe = Rt(), ge = Wn(), Fe = Mn();
      de.exports = oe ? function(Ce, Ne, ke) {
        return ge.f(Ce, Ne, Fe(1, ke));
      } : function(Ce, Ne, ke) {
        return Ce[Ne] = ke, Ce;
      };
    }), Gn = Me((Le, de) => {
      var oe = Lt(), ge = Ot(), Fe = Un(), Ce = oe(Function.toString);
      ge(Fe.inspectSource) || (Fe.inspectSource = function(Ne) {
        return Ce(Ne);
      }), de.exports = Fe.inspectSource;
    }), ri = Me((Le, de) => {
      var oe = ft(), ge = Ot(), Fe = Gn(), Ce = oe.WeakMap;
      de.exports = ge(Ce) && /native code/.test(Fe(Ce));
    }), ui = Me((Le, de) => {
      var oe = Tr(), ge = Br(), Fe = oe("keys");
      de.exports = function(Ce) {
        return Fe[Ce] || (Fe[Ce] = ge(Ce));
      };
    }), kr = Me((Le, de) => {
      de.exports = {};
    }), ii = Me((Le, de) => {
      var oe = ri(), ge = ft(), Fe = Lt(), Ce = Gt(), Ne = Xn(), ke = Ht(), je = Un(), Re = ui(), Ve = kr(), ze = "Object already initialized", Xe = ge.TypeError, Qe = ge.WeakMap, tt, Ke, et, ht = function(dt) {
        return et(dt) ? Ke(dt) : tt(dt, {});
      }, Et = function(dt) {
        return function(gt) {
          var Vt;
          if (!Ce(gt) || (Vt = Ke(gt)).type !== dt)
            throw Xe("Incompatible receiver, " + dt + " required");
          return Vt;
        };
      };
      oe || je.state ? (Ft = je.state || (je.state = new Qe()), Ct = Fe(Ft.get), Z = Fe(Ft.has), Mt = Fe(Ft.set), tt = function(dt, gt) {
        if (Z(Ft, dt))
          throw new Xe(ze);
        return gt.facade = dt, Mt(Ft, dt, gt), gt;
      }, Ke = function(dt) {
        return Ct(Ft, dt) || {};
      }, et = function(dt) {
        return Z(Ft, dt);
      }) : (kt = Re("state"), Ve[kt] = !0, tt = function(dt, gt) {
        if (ke(dt, kt))
          throw new Xe(ze);
        return gt.facade = dt, Ne(dt, kt, gt), gt;
      }, Ke = function(dt) {
        return ke(dt, kt) ? dt[kt] : {};
      }, et = function(dt) {
        return ke(dt, kt);
      });
      var Ft, Ct, Z, Mt, kt;
      de.exports = { set: tt, get: Ke, has: et, enforce: ht, getterFor: Et };
    }), ai = Me((Le, de) => {
      var oe = Rt(), ge = Ht(), Fe = Function.prototype, Ce = oe && Object.getOwnPropertyDescriptor, Ne = ge(Fe, "name"), ke = Ne && function() {
      }.name === "something", je = Ne && (!oe || oe && Ce(Fe, "name").configurable);
      de.exports = { EXISTS: Ne, PROPER: ke, CONFIGURABLE: je };
    }), si = Me((Le, de) => {
      var oe = ft(), ge = Ot(), Fe = Ht(), Ce = Xn(), Ne = Jn(), ke = Gn(), je = ii(), Re = ai().CONFIGURABLE, Ve = je.get, ze = je.enforce, Xe = String(String).split("String");
      (de.exports = function(Qe, tt, Ke, et) {
        var ht = et ? !!et.unsafe : !1, Et = et ? !!et.enumerable : !1, Ft = et ? !!et.noTargetGet : !1, Ct = et && et.name !== void 0 ? et.name : tt, Z;
        if (ge(Ke) && (String(Ct).slice(0, 7) === "Symbol(" && (Ct = "[" + String(Ct).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), (!Fe(Ke, "name") || Re && Ke.name !== Ct) && Ce(Ke, "name", Ct), Z = ze(Ke), Z.source || (Z.source = Xe.join(typeof Ct == "string" ? Ct : ""))), Qe === oe) {
          Et ? Qe[tt] = Ke : Ne(tt, Ke);
          return;
        } else
          ht ? !Ft && Qe[tt] && (Et = !0) : delete Qe[tt];
        Et ? Qe[tt] = Ke : Ce(Qe, tt, Ke);
      })(Function.prototype, "toString", function() {
        return ge(this) && Ve(this).source || ke(this);
      });
    }), zn = Me((Le, de) => {
      var oe = Math.ceil, ge = Math.floor;
      de.exports = function(Fe) {
        var Ce = +Fe;
        return Ce !== Ce || Ce === 0 ? 0 : (Ce > 0 ? ge : oe)(Ce);
      };
    }), oi = Me((Le, de) => {
      var oe = zn(), ge = Math.max, Fe = Math.min;
      de.exports = function(Ce, Ne) {
        var ke = oe(Ce);
        return ke < 0 ? ge(ke + Ne, 0) : Fe(ke, Ne);
      };
    }), li = Me((Le, de) => {
      var oe = zn(), ge = Math.min;
      de.exports = function(Fe) {
        return Fe > 0 ? ge(oe(Fe), 9007199254740991) : 0;
      };
    }), an = Me((Le, de) => {
      var oe = li();
      de.exports = function(ge) {
        return oe(ge.length);
      };
    }), ci = Me((Le, de) => {
      var oe = Rn(), ge = oi(), Fe = an(), Ce = function(Ne) {
        return function(ke, je, Re) {
          var Ve = oe(ke), ze = Fe(Ve), Xe = ge(Re, ze), Qe;
          if (Ne && je != je) {
            for (; ze > Xe; )
              if (Qe = Ve[Xe++], Qe != Qe)
                return !0;
          } else
            for (; ze > Xe; Xe++)
              if ((Ne || Xe in Ve) && Ve[Xe] === je)
                return Ne || Xe || 0;
          return !Ne && -1;
        };
      };
      de.exports = { includes: Ce(!0), indexOf: Ce(!1) };
    }), pi = Me((Le, de) => {
      var oe = Lt(), ge = Ht(), Fe = Rn(), Ce = ci().indexOf, Ne = kr(), ke = oe([].push);
      de.exports = function(je, Re) {
        var Ve = Fe(je), ze = 0, Xe = [], Qe;
        for (Qe in Ve)
          !ge(Ne, Qe) && ge(Ve, Qe) && ke(Xe, Qe);
        for (; Re.length > ze; )
          ge(Ve, Qe = Re[ze++]) && (~Ce(Xe, Qe) || ke(Xe, Qe));
        return Xe;
      };
    }), di = Me((Le, de) => {
      de.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }), Di = Me((Le) => {
      var de = pi(), oe = di(), ge = oe.concat("length", "prototype");
      Le.f = Object.getOwnPropertyNames || function(Fe) {
        return de(Fe, ge);
      };
    }), fi = Me((Le) => {
      Le.f = Object.getOwnPropertySymbols;
    }), mi = Me((Le, de) => {
      var oe = yn(), ge = Lt(), Fe = Di(), Ce = fi(), Ne = un(), ke = ge([].concat);
      de.exports = oe("Reflect", "ownKeys") || function(je) {
        var Re = Fe.f(Ne(je)), Ve = Ce.f;
        return Ve ? ke(Re, Ve(je)) : Re;
      };
    }), gi = Me((Le, de) => {
      var oe = Ht(), ge = mi(), Fe = Nr(), Ce = Wn();
      de.exports = function(Ne, ke, je) {
        for (var Re = ge(ke), Ve = Ce.f, ze = Fe.f, Xe = 0; Xe < Re.length; Xe++) {
          var Qe = Re[Xe];
          !oe(Ne, Qe) && !(je && oe(je, Qe)) && Ve(Ne, Qe, ze(ke, Qe));
        }
      };
    }), yi = Me((Le, de) => {
      var oe = jt(), ge = Ot(), Fe = /#|\.prototype\./, Ce = function(Ve, ze) {
        var Xe = ke[Ne(Ve)];
        return Xe == Re ? !0 : Xe == je ? !1 : ge(ze) ? oe(ze) : !!ze;
      }, Ne = Ce.normalize = function(Ve) {
        return String(Ve).replace(Fe, ".").toLowerCase();
      }, ke = Ce.data = {}, je = Ce.NATIVE = "N", Re = Ce.POLYFILL = "P";
      de.exports = Ce;
    }), En = Me((Le, de) => {
      var oe = ft(), ge = Nr().f, Fe = Xn(), Ce = si(), Ne = Jn(), ke = gi(), je = yi();
      de.exports = function(Re, Ve) {
        var ze = Re.target, Xe = Re.global, Qe = Re.stat, tt, Ke, et, ht, Et, Ft;
        if (Xe ? Ke = oe : Qe ? Ke = oe[ze] || Ne(ze, {}) : Ke = (oe[ze] || {}).prototype, Ke)
          for (et in Ve) {
            if (Et = Ve[et], Re.noTargetGet ? (Ft = ge(Ke, et), ht = Ft && Ft.value) : ht = Ke[et], tt = je(Xe ? et : ze + (Qe ? "." : "#") + et, Re.forced), !tt && ht !== void 0) {
              if (typeof Et == typeof ht)
                continue;
              ke(Et, ht);
            }
            (Re.sham || ht && ht.sham) && Fe(Et, "sham", !0), Ce(Ke, et, Et, Re);
          }
      };
    }), jr = Me((Le, de) => {
      var oe = _n();
      de.exports = Array.isArray || function(ge) {
        return oe(ge) == "Array";
      };
    }), Ir = Me((Le, de) => {
      var oe = Lt(), ge = hn(), Fe = On(), Ce = oe(oe.bind);
      de.exports = function(Ne, ke) {
        return ge(Ne), ke === void 0 ? Ne : Fe ? Ce(Ne, ke) : function() {
          return Ne.apply(ke, arguments);
        };
      };
    }), Pr = Me((Le, de) => {
      var oe = ft(), ge = jr(), Fe = an(), Ce = Ir(), Ne = oe.TypeError, ke = function(je, Re, Ve, ze, Xe, Qe, tt, Ke) {
        for (var et = Xe, ht = 0, Et = tt ? Ce(tt, Ke) : !1, Ft, Ct; ht < ze; ) {
          if (ht in Ve) {
            if (Ft = Et ? Et(Ve[ht], ht, Re) : Ve[ht], Qe > 0 && ge(Ft))
              Ct = Fe(Ft), et = ke(je, Re, Ft, Ct, et, Qe - 1) - 1;
            else {
              if (et >= 9007199254740991)
                throw Ne("Exceed the acceptable array length");
              je[et] = Ft;
            }
            et++;
          }
          ht++;
        }
        return et;
      };
      de.exports = ke;
    }), hi = Me((Le, de) => {
      var oe = zt(), ge = oe("toStringTag"), Fe = {};
      Fe[ge] = "z", de.exports = String(Fe) === "[object z]";
    }), Lr = Me((Le, de) => {
      var oe = ft(), ge = hi(), Fe = Ot(), Ce = _n(), Ne = zt(), ke = Ne("toStringTag"), je = oe.Object, Re = Ce(function() {
        return arguments;
      }()) == "Arguments", Ve = function(ze, Xe) {
        try {
          return ze[Xe];
        } catch {
        }
      };
      de.exports = ge ? Ce : function(ze) {
        var Xe, Qe, tt;
        return ze === void 0 ? "Undefined" : ze === null ? "Null" : typeof (Qe = Ve(Xe = je(ze), ke)) == "string" ? Qe : Re ? Ce(Xe) : (tt = Ce(Xe)) == "Object" && Fe(Xe.callee) ? "Arguments" : tt;
      };
    }), Ei = Me((Le, de) => {
      var oe = Lt(), ge = jt(), Fe = Ot(), Ce = Lr(), Ne = yn(), ke = Gn(), je = function() {
      }, Re = [], Ve = Ne("Reflect", "construct"), ze = /^\s*(?:class|function)\b/, Xe = oe(ze.exec), Qe = !ze.exec(je), tt = function(et) {
        if (!Fe(et))
          return !1;
        try {
          return Ve(je, Re, et), !0;
        } catch {
          return !1;
        }
      }, Ke = function(et) {
        if (!Fe(et))
          return !1;
        switch (Ce(et)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return Qe || !!Xe(ze, ke(et));
        } catch {
          return !0;
        }
      };
      Ke.sham = !0, de.exports = !Ve || ge(function() {
        var et;
        return tt(tt.call) || !tt(Object) || !tt(function() {
          et = !0;
        }) || et;
      }) ? Ke : tt;
    }), Ci = Me((Le, de) => {
      var oe = ft(), ge = jr(), Fe = Ei(), Ce = Gt(), Ne = zt(), ke = Ne("species"), je = oe.Array;
      de.exports = function(Re) {
        var Ve;
        return ge(Re) && (Ve = Re.constructor, Fe(Ve) && (Ve === je || ge(Ve.prototype)) ? Ve = void 0 : Ce(Ve) && (Ve = Ve[ke], Ve === null && (Ve = void 0))), Ve === void 0 ? je : Ve;
      };
    }), Or = Me((Le, de) => {
      var oe = Ci();
      de.exports = function(ge, Fe) {
        return new (oe(ge))(Fe === 0 ? 0 : Fe);
      };
    }), Fi = Me(() => {
      var Le = En(), de = Pr(), oe = hn(), ge = Hn(), Fe = an(), Ce = Or();
      Le({ target: "Array", proto: !0 }, { flatMap: function(Ne) {
        var ke = ge(this), je = Fe(ke), Re;
        return oe(Ne), Re = Ce(ke, 0), Re.length = de(Re, ke, ke, je, 0, 1, Ne, arguments.length > 1 ? arguments[1] : void 0), Re;
      } });
    }), Mr = Me((Le, de) => {
      de.exports = {};
    }), Ai = Me((Le, de) => {
      var oe = zt(), ge = Mr(), Fe = oe("iterator"), Ce = Array.prototype;
      de.exports = function(Ne) {
        return Ne !== void 0 && (ge.Array === Ne || Ce[Fe] === Ne);
      };
    }), _r = Me((Le, de) => {
      var oe = Lr(), ge = $n(), Fe = Mr(), Ce = zt(), Ne = Ce("iterator");
      de.exports = function(ke) {
        if (ke != null)
          return ge(ke, Ne) || ge(ke, "@@iterator") || Fe[oe(ke)];
      };
    }), vi = Me((Le, de) => {
      var oe = ft(), ge = Xt(), Fe = hn(), Ce = un(), Ne = Vn(), ke = _r(), je = oe.TypeError;
      de.exports = function(Re, Ve) {
        var ze = arguments.length < 2 ? ke(Re) : Ve;
        if (Fe(ze))
          return Ce(ge(ze, Re));
        throw je(Ne(Re) + " is not iterable");
      };
    }), xi = Me((Le, de) => {
      var oe = Xt(), ge = un(), Fe = $n();
      de.exports = function(Ce, Ne, ke) {
        var je, Re;
        ge(Ce);
        try {
          if (je = Fe(Ce, "return"), !je) {
            if (Ne === "throw")
              throw ke;
            return ke;
          }
          je = oe(je, Ce);
        } catch (Ve) {
          Re = !0, je = Ve;
        }
        if (Ne === "throw")
          throw ke;
        if (Re)
          throw je;
        return ge(je), ke;
      };
    }), bi = Me((Le, de) => {
      var oe = ft(), ge = Ir(), Fe = Xt(), Ce = un(), Ne = Vn(), ke = Ai(), je = an(), Re = vr(), Ve = vi(), ze = _r(), Xe = xi(), Qe = oe.TypeError, tt = function(et, ht) {
        this.stopped = et, this.result = ht;
      }, Ke = tt.prototype;
      de.exports = function(et, ht, Et) {
        var Ft = Et && Et.that, Ct = !!(Et && Et.AS_ENTRIES), Z = !!(Et && Et.IS_ITERATOR), Mt = !!(Et && Et.INTERRUPTED), kt = ge(ht, Ft), dt, gt, Vt, sn, St, te, on, Cn = function(Bt) {
          return dt && Xe(dt, "normal", Bt), new tt(!0, Bt);
        }, Fn = function(Bt) {
          return Ct ? (Ce(Bt), Mt ? kt(Bt[0], Bt[1], Cn) : kt(Bt[0], Bt[1])) : Mt ? kt(Bt, Cn) : kt(Bt);
        };
        if (Z)
          dt = et;
        else {
          if (gt = ze(et), !gt)
            throw Qe(Ne(et) + " is not iterable");
          if (ke(gt)) {
            for (Vt = 0, sn = je(et); sn > Vt; Vt++)
              if (St = Fn(et[Vt]), St && Re(Ke, St))
                return St;
            return new tt(!1);
          }
          dt = Ve(et, gt);
        }
        for (te = dt.next; !(on = Fe(te, dt)).done; ) {
          try {
            St = Fn(on.value);
          } catch (Bt) {
            Xe(dt, "throw", Bt);
          }
          if (typeof St == "object" && St && Re(Ke, St))
            return St;
        }
        return new tt(!1);
      };
    }), Si = Me((Le, de) => {
      var oe = qn(), ge = Wn(), Fe = Mn();
      de.exports = function(Ce, Ne, ke) {
        var je = oe(Ne);
        je in Ce ? ge.f(Ce, je, Fe(0, ke)) : Ce[je] = ke;
      };
    }), Ti = Me(() => {
      var Le = En(), de = bi(), oe = Si();
      Le({ target: "Object", stat: !0 }, { fromEntries: function(ge) {
        var Fe = {};
        return de(ge, function(Ce, Ne) {
          oe(Fe, Ce, Ne);
        }, { AS_ENTRIES: !0 }), Fe;
      } });
    }), Bi = Me(() => {
      var Le = En(), de = ft();
      Le({ global: !0 }, { globalThis: de });
    }), wi = Me(() => {
      Bi();
    }), Ni = Me(() => {
      var Le = En(), de = Pr(), oe = Hn(), ge = an(), Fe = zn(), Ce = Or();
      Le({ target: "Array", proto: !0 }, { flat: function() {
        var Ne = arguments.length ? arguments[0] : void 0, ke = oe(this), je = ge(ke), Re = Ce(ke, 0);
        return Re.length = de(Re, ke, ke, je, 0, Ne === void 0 ? 1 : Fe(Ne)), Re;
      } });
    }), ki = Me((Le, de) => {
      var oe = ["cliName", "cliCategory", "cliDescription"], ge = ["_"], Fe = ["languageId"], Ce, Ne, ke, je, Re, Ve;
      function ze(r, l) {
        if (r == null)
          return {};
        var n = Xe(r, l), a, i;
        if (Object.getOwnPropertySymbols) {
          var e = Object.getOwnPropertySymbols(r);
          for (i = 0; i < e.length; i++)
            a = e[i], !(l.indexOf(a) >= 0) && (!Object.prototype.propertyIsEnumerable.call(r, a) || (n[a] = r[a]));
        }
        return n;
      }
      function Xe(r, l) {
        if (r == null)
          return {};
        var n = {}, a = Object.keys(r), i, e;
        for (e = 0; e < a.length; e++)
          i = a[e], !(l.indexOf(i) >= 0) && (n[i] = r[i]);
        return n;
      }
      Fi(), Ti(), wi(), Ni();
      function Qe(r, l) {
        return l || (l = r.slice(0)), Object.freeze(Object.defineProperties(r, { raw: { value: Object.freeze(l) } }));
      }
      var tt = Object.create, Ke = Object.defineProperty, et = Object.getOwnPropertyDescriptor, ht = Object.getOwnPropertyNames, Et = Object.getPrototypeOf, Ft = Object.prototype.hasOwnProperty, Ct = (r, l) => function() {
        return r && (l = (0, r[ht(r)[0]])(r = 0)), l;
      }, Z = (r, l) => function() {
        return l || (0, r[ht(r)[0]])((l = { exports: {} }).exports, l), l.exports;
      }, Mt = (r, l) => {
        for (var n in l)
          Ke(r, n, { get: l[n], enumerable: !0 });
      }, kt = (r, l, n, a) => {
        if (l && typeof l == "object" || typeof l == "function")
          for (let i of ht(l))
            !Ft.call(r, i) && i !== n && Ke(r, i, { get: () => l[i], enumerable: !(a = et(l, i)) || a.enumerable });
        return r;
      }, dt = (r, l, n) => (n = r != null ? tt(Et(r)) : {}, kt(l || !r || !r.__esModule ? Ke(n, "default", { value: r, enumerable: !0 }) : n, r)), gt = (r) => kt(Ke({}, "__esModule", { value: !0 }), r), Vt, sn, St, te = Ct({ "<define:process>"() {
        Vt = {}, sn = [], St = { env: Vt, argv: sn };
      } }), on = Z({ "package.json"(r, l) {
        l.exports = { version: "2.7.0" };
      } }), Cn = Z({ "node_modules/diff/lib/diff/base.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 }), r.default = l;
        function l() {
        }
        l.prototype = { diff: function(i, e) {
          var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, u = t.callback;
          typeof t == "function" && (u = t, t = {}), this.options = t;
          var s = this;
          function c(v) {
            return u ? (setTimeout(function() {
              u(void 0, v);
            }, 0), !0) : v;
          }
          i = this.castInput(i), e = this.castInput(e), i = this.removeEmpty(this.tokenize(i)), e = this.removeEmpty(this.tokenize(e));
          var C = e.length, f = i.length, h = 1, p = C + f, d = [{ newPos: -1, components: [] }], g = this.extractCommon(d[0], e, i, 0);
          if (d[0].newPos + 1 >= C && g + 1 >= f)
            return c([{ value: this.join(e), count: e.length }]);
          function w() {
            for (var v = -1 * h; v <= h; v += 2) {
              var x = void 0, B = d[v - 1], I = d[v + 1], j = (I ? I.newPos : 0) - v;
              B && (d[v - 1] = void 0);
              var P = B && B.newPos + 1 < C, E = I && 0 <= j && j < f;
              if (!P && !E) {
                d[v] = void 0;
                continue;
              }
              if (!P || E && B.newPos < I.newPos ? (x = a(I), s.pushComponent(x.components, void 0, !0)) : (x = B, x.newPos++, s.pushComponent(x.components, !0, void 0)), j = s.extractCommon(x, e, i, v), x.newPos + 1 >= C && j + 1 >= f)
                return c(n(s, x.components, e, i, s.useLongestToken));
              d[v] = x;
            }
            h++;
          }
          if (u)
            (function v() {
              setTimeout(function() {
                if (h > p)
                  return u();
                w() || v();
              }, 0);
            })();
          else
            for (; h <= p; ) {
              var k = w();
              if (k)
                return k;
            }
        }, pushComponent: function(i, e, t) {
          var u = i[i.length - 1];
          u && u.added === e && u.removed === t ? i[i.length - 1] = { count: u.count + 1, added: e, removed: t } : i.push({ count: 1, added: e, removed: t });
        }, extractCommon: function(i, e, t, u) {
          for (var s = e.length, c = t.length, C = i.newPos, f = C - u, h = 0; C + 1 < s && f + 1 < c && this.equals(e[C + 1], t[f + 1]); )
            C++, f++, h++;
          return h && i.components.push({ count: h }), i.newPos = C, f;
        }, equals: function(i, e) {
          return this.options.comparator ? this.options.comparator(i, e) : i === e || this.options.ignoreCase && i.toLowerCase() === e.toLowerCase();
        }, removeEmpty: function(i) {
          for (var e = [], t = 0; t < i.length; t++)
            i[t] && e.push(i[t]);
          return e;
        }, castInput: function(i) {
          return i;
        }, tokenize: function(i) {
          return i.split("");
        }, join: function(i) {
          return i.join("");
        } };
        function n(i, e, t, u, s) {
          for (var c = 0, C = e.length, f = 0, h = 0; c < C; c++) {
            var p = e[c];
            if (p.removed) {
              if (p.value = i.join(u.slice(h, h + p.count)), h += p.count, c && e[c - 1].added) {
                var d = e[c - 1];
                e[c - 1] = e[c], e[c] = d;
              }
            } else {
              if (!p.added && s) {
                var g = t.slice(f, f + p.count);
                g = g.map(function(k, v) {
                  var x = u[h + v];
                  return x.length > k.length ? x : k;
                }), p.value = i.join(g);
              } else
                p.value = i.join(t.slice(f, f + p.count));
              f += p.count, p.added || (h += p.count);
            }
          }
          var w = e[C - 1];
          return C > 1 && typeof w.value == "string" && (w.added || w.removed) && i.equals("", w.value) && (e[C - 2].value += w.value, e.pop()), e;
        }
        function a(i) {
          return { newPos: i.newPos, components: i.components.slice(0) };
        }
      } }), Fn = Z({ "node_modules/diff/lib/diff/array.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 }), r.diffArrays = i, r.arrayDiff = void 0;
        var l = n(Cn());
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var a = new l.default();
        r.arrayDiff = a, a.tokenize = function(e) {
          return e.slice();
        }, a.join = a.removeEmpty = function(e) {
          return e;
        };
        function i(e, t, u) {
          return a.diff(e, t, u);
        }
      } }), Bt = Z({ "src/document/doc-builders.js"(r, l) {
        te();
        function n(A) {
          return { type: "concat", parts: A };
        }
        function a(A) {
          return { type: "indent", contents: A };
        }
        function i(A, o) {
          return { type: "align", contents: o, n: A };
        }
        function e(A) {
          let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return { type: "group", id: o.id, contents: A, break: Boolean(o.shouldBreak), expandedStates: o.expandedStates };
        }
        function t(A) {
          return i(Number.NEGATIVE_INFINITY, A);
        }
        function u(A) {
          return i({ type: "root" }, A);
        }
        function s(A) {
          return i(-1, A);
        }
        function c(A, o) {
          return e(A[0], Object.assign(Object.assign({}, o), {}, { expandedStates: A }));
        }
        function C(A) {
          return { type: "fill", parts: A };
        }
        function f(A, o) {
          let F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return { type: "if-break", breakContents: A, flatContents: o, groupId: F.groupId };
        }
        function h(A, o) {
          return { type: "indent-if-break", contents: A, groupId: o.groupId, negate: o.negate };
        }
        function p(A) {
          return { type: "line-suffix", contents: A };
        }
        var d = { type: "line-suffix-boundary" }, g = { type: "break-parent" }, w = { type: "trim" }, k = { type: "line", hard: !0 }, v = { type: "line", hard: !0, literal: !0 }, x = { type: "line" }, B = { type: "line", soft: !0 }, I = n([k, g]), j = n([v, g]), P = { type: "cursor", placeholder: Symbol("cursor") };
        function E(A, o) {
          let F = [];
          for (let y = 0; y < o.length; y++)
            y !== 0 && F.push(A), F.push(o[y]);
          return n(F);
        }
        function D(A, o, F) {
          let y = A;
          if (o > 0) {
            for (let T = 0; T < Math.floor(o / F); ++T)
              y = a(y);
            y = i(o % F, y), y = i(Number.NEGATIVE_INFINITY, y);
          }
          return y;
        }
        function m(A, o) {
          return { type: "label", label: A, contents: o };
        }
        l.exports = { concat: n, join: E, line: x, softline: B, hardline: I, literalline: j, group: e, conditionalGroup: c, fill: C, lineSuffix: p, lineSuffixBoundary: d, cursor: P, breakParent: g, ifBreak: f, trim: w, indent: a, indentIfBreak: h, align: i, addAlignmentToDoc: D, markAsRoot: u, dedentToRoot: t, dedent: s, hardlineWithoutBreakParent: k, literallineWithoutBreakParent: v, label: m };
      } }), Qn = Z({ "src/common/end-of-line.js"(r, l) {
        te();
        function n(t) {
          let u = t.indexOf("\r");
          return u >= 0 ? t.charAt(u + 1) === `
` ? "crlf" : "cr" : "lf";
        }
        function a(t) {
          switch (t) {
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
        function i(t, u) {
          let s;
          switch (u) {
            case `
`:
              s = /\n/g;
              break;
            case "\r":
              s = /\r/g;
              break;
            case `\r
`:
              s = /\r\n/g;
              break;
            default:
              throw new Error('Unexpected "eol" '.concat(JSON.stringify(u), "."));
          }
          let c = t.match(s);
          return c ? c.length : 0;
        }
        function e(t) {
          return t.replace(/\r\n?/g, `
`);
        }
        l.exports = { guessEndOfLine: n, convertEndOfLineToChars: a, countEndOfLineChars: i, normalizeEndOfLine: e };
      } }), It = Z({ "src/utils/get-last.js"(r, l) {
        te();
        var n = (a) => a[a.length - 1];
        l.exports = n;
      } });
      function ji() {
        let { onlyFirst: r = !1 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, l = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(l, r ? void 0 : "g");
      }
      var Ii = Ct({ "node_modules/strip-ansi/node_modules/ansi-regex/index.js"() {
        te();
      } });
      function Pi(r) {
        if (typeof r != "string")
          throw new TypeError("Expected a `string`, got `".concat(typeof r, "`"));
        return r.replace(ji(), "");
      }
      var Li = Ct({ "node_modules/strip-ansi/index.js"() {
        te(), Ii();
      } });
      function Oi(r) {
        return Number.isInteger(r) ? r >= 4352 && (r <= 4447 || r === 9001 || r === 9002 || 11904 <= r && r <= 12871 && r !== 12351 || 12880 <= r && r <= 19903 || 19968 <= r && r <= 42182 || 43360 <= r && r <= 43388 || 44032 <= r && r <= 55203 || 63744 <= r && r <= 64255 || 65040 <= r && r <= 65049 || 65072 <= r && r <= 65131 || 65281 <= r && r <= 65376 || 65504 <= r && r <= 65510 || 110592 <= r && r <= 110593 || 127488 <= r && r <= 127569 || 131072 <= r && r <= 262141) : !1;
      }
      var Mi = Ct({ "node_modules/is-fullwidth-code-point/index.js"() {
        te();
      } }), _i = Z({ "node_modules/emoji-regex/index.js"(r, l) {
        te(), l.exports = function() {
          return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
        };
      } }), Rr = {};
      Mt(Rr, { default: () => Ri });
      function Ri(r) {
        if (typeof r != "string" || r.length === 0 || (r = Pi(r), r.length === 0))
          return 0;
        r = r.replace((0, Vr.default)(), "  ");
        let l = 0;
        for (let n = 0; n < r.length; n++) {
          let a = r.codePointAt(n);
          a <= 31 || a >= 127 && a <= 159 || a >= 768 && a <= 879 || (a > 65535 && n++, l += Oi(a) ? 2 : 1);
        }
        return l;
      }
      var Vr, Vi = Ct({ "node_modules/string-width/index.js"() {
        te(), Li(), Mi(), Vr = dt(_i());
      } }), $r = Z({ "src/utils/get-string-width.js"(r, l) {
        te();
        var n = (Vi(), gt(Rr)).default, a = /[^\x20-\x7F]/;
        function i(e) {
          return e ? a.test(e) ? n(e) : e.length : 0;
        }
        l.exports = i;
      } }), Yn = Z({ "src/document/doc-utils.js"(r, l) {
        te();
        var n = It(), { literalline: a, join: i } = Bt(), e = (o) => Array.isArray(o) || o && o.type === "concat", t = (o) => {
          if (Array.isArray(o))
            return o;
          if (o.type !== "concat" && o.type !== "fill")
            throw new Error("Expect doc type to be `concat` or `fill`.");
          return o.parts;
        }, u = {};
        function s(o, F, y, T) {
          let b = [o];
          for (; b.length > 0; ) {
            let S = b.pop();
            if (S === u) {
              y(b.pop());
              continue;
            }
            if (y && b.push(S, u), !F || F(S) !== !1)
              if (e(S) || S.type === "fill") {
                let L = t(S);
                for (let R = L.length, O = R - 1; O >= 0; --O)
                  b.push(L[O]);
              } else if (S.type === "if-break")
                S.flatContents && b.push(S.flatContents), S.breakContents && b.push(S.breakContents);
              else if (S.type === "group" && S.expandedStates)
                if (T)
                  for (let L = S.expandedStates.length, R = L - 1; R >= 0; --R)
                    b.push(S.expandedStates[R]);
                else
                  b.push(S.contents);
              else
                S.contents && b.push(S.contents);
          }
        }
        function c(o, F) {
          let y = /* @__PURE__ */ new Map();
          return T(o);
          function T(S) {
            if (y.has(S))
              return y.get(S);
            let L = b(S);
            return y.set(S, L), L;
          }
          function b(S) {
            if (Array.isArray(S))
              return F(S.map(T));
            if (S.type === "concat" || S.type === "fill") {
              let L = S.parts.map(T);
              return F(Object.assign(Object.assign({}, S), {}, { parts: L }));
            }
            if (S.type === "if-break") {
              let L = S.breakContents && T(S.breakContents), R = S.flatContents && T(S.flatContents);
              return F(Object.assign(Object.assign({}, S), {}, { breakContents: L, flatContents: R }));
            }
            if (S.type === "group" && S.expandedStates) {
              let L = S.expandedStates.map(T), R = L[0];
              return F(Object.assign(Object.assign({}, S), {}, { contents: R, expandedStates: L }));
            }
            if (S.contents) {
              let L = T(S.contents);
              return F(Object.assign(Object.assign({}, S), {}, { contents: L }));
            }
            return F(S);
          }
        }
        function C(o, F, y) {
          let T = y, b = !1;
          function S(L) {
            let R = F(L);
            if (R !== void 0 && (b = !0, T = R), b)
              return !1;
          }
          return s(o, S), T;
        }
        function f(o) {
          if (o.type === "group" && o.break || o.type === "line" && o.hard || o.type === "break-parent")
            return !0;
        }
        function h(o) {
          return C(o, f, !1);
        }
        function p(o) {
          if (o.length > 0) {
            let F = n(o);
            !F.expandedStates && !F.break && (F.break = "propagated");
          }
          return null;
        }
        function d(o) {
          let F = /* @__PURE__ */ new Set(), y = [];
          function T(S) {
            if (S.type === "break-parent" && p(y), S.type === "group") {
              if (y.push(S), F.has(S))
                return !1;
              F.add(S);
            }
          }
          function b(S) {
            S.type === "group" && y.pop().break && p(y);
          }
          s(o, T, b, !0);
        }
        function g(o) {
          return o.type === "line" && !o.hard ? o.soft ? "" : " " : o.type === "if-break" ? o.flatContents || "" : o;
        }
        function w(o) {
          return c(o, g);
        }
        var k = (o, F) => o && o.type === "line" && o.hard && F && F.type === "break-parent";
        function v(o) {
          if (!o)
            return o;
          if (e(o) || o.type === "fill") {
            let F = t(o);
            for (; F.length > 1 && k(...F.slice(-2)); )
              F.length -= 2;
            if (F.length > 0) {
              let y = v(n(F));
              F[F.length - 1] = y;
            }
            return Array.isArray(o) ? F : Object.assign(Object.assign({}, o), {}, { parts: F });
          }
          switch (o.type) {
            case "align":
            case "indent":
            case "indent-if-break":
            case "group":
            case "line-suffix":
            case "label": {
              let F = v(o.contents);
              return Object.assign(Object.assign({}, o), {}, { contents: F });
            }
            case "if-break": {
              let F = v(o.breakContents), y = v(o.flatContents);
              return Object.assign(Object.assign({}, o), {}, { breakContents: F, flatContents: y });
            }
          }
          return o;
        }
        function x(o) {
          return v(I(o));
        }
        function B(o) {
          switch (o.type) {
            case "fill":
              if (o.parts.every((y) => y === ""))
                return "";
              break;
            case "group":
              if (!o.contents && !o.id && !o.break && !o.expandedStates)
                return "";
              if (o.contents.type === "group" && o.contents.id === o.id && o.contents.break === o.break && o.contents.expandedStates === o.expandedStates)
                return o.contents;
              break;
            case "align":
            case "indent":
            case "indent-if-break":
            case "line-suffix":
              if (!o.contents)
                return "";
              break;
            case "if-break":
              if (!o.flatContents && !o.breakContents)
                return "";
              break;
          }
          if (!e(o))
            return o;
          let F = [];
          for (let y of t(o)) {
            if (!y)
              continue;
            let [T, ...b] = e(y) ? t(y) : [y];
            typeof T == "string" && typeof n(F) == "string" ? F[F.length - 1] += T : F.push(T), F.push(...b);
          }
          return F.length === 0 ? "" : F.length === 1 ? F[0] : Array.isArray(o) ? F : Object.assign(Object.assign({}, o), {}, { parts: F });
        }
        function I(o) {
          return c(o, (F) => B(F));
        }
        function j(o) {
          let F = [], y = o.filter(Boolean);
          for (; y.length > 0; ) {
            let T = y.shift();
            if (T) {
              if (e(T)) {
                y.unshift(...t(T));
                continue;
              }
              if (F.length > 0 && typeof n(F) == "string" && typeof T == "string") {
                F[F.length - 1] += T;
                continue;
              }
              F.push(T);
            }
          }
          return F;
        }
        function P(o) {
          return c(o, (F) => Array.isArray(F) ? j(F) : F.parts ? Object.assign(Object.assign({}, F), {}, { parts: j(F.parts) }) : F);
        }
        function E(o) {
          return c(o, (F) => typeof F == "string" && F.includes(`
`) ? D(F) : F);
        }
        function D(o) {
          let F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : a;
          return i(F, o.split(`
`)).parts;
        }
        function m(o) {
          if (o.type === "line")
            return !0;
        }
        function A(o) {
          return C(o, m, !1);
        }
        l.exports = { isConcat: e, getDocParts: t, willBreak: h, traverseDoc: s, findInDoc: C, mapDoc: c, propagateBreaks: d, removeLines: w, stripTrailingHardline: x, normalizeParts: j, normalizeDoc: P, cleanDoc: I, replaceTextEndOfLine: D, replaceEndOfLine: E, canBreak: A };
      } }), $i = Z({ "src/document/doc-printer.js"(r, l) {
        te();
        var { convertEndOfLineToChars: n } = Qn(), a = It(), i = $r(), { fill: e, cursor: t, indent: u } = Bt(), { isConcat: s, getDocParts: c } = Yn(), C, f = 1, h = 2;
        function p() {
          return { value: "", length: 0, queue: [] };
        }
        function d(B, I) {
          return w(B, { type: "indent" }, I);
        }
        function g(B, I, j) {
          return I === Number.NEGATIVE_INFINITY ? B.root || p() : I < 0 ? w(B, { type: "dedent" }, j) : I ? I.type === "root" ? Object.assign(Object.assign({}, B), {}, { root: B }) : w(B, { type: typeof I == "string" ? "stringAlign" : "numberAlign", n: I }, j) : B;
        }
        function w(B, I, j) {
          let P = I.type === "dedent" ? B.queue.slice(0, -1) : [...B.queue, I], E = "", D = 0, m = 0, A = 0;
          for (let L of P)
            switch (L.type) {
              case "indent":
                y(), j.useTabs ? o(1) : F(j.tabWidth);
                break;
              case "stringAlign":
                y(), E += L.n, D += L.n.length;
                break;
              case "numberAlign":
                m += 1, A += L.n;
                break;
              default:
                throw new Error("Unexpected type '".concat(L.type, "'"));
            }
          return b(), Object.assign(Object.assign({}, B), {}, { value: E, length: D, queue: P });
          function o(L) {
            E += "	".repeat(L), D += j.tabWidth * L;
          }
          function F(L) {
            E += " ".repeat(L), D += L;
          }
          function y() {
            j.useTabs ? T() : b();
          }
          function T() {
            m > 0 && o(m), S();
          }
          function b() {
            A > 0 && F(A), S();
          }
          function S() {
            m = 0, A = 0;
          }
        }
        function k(B) {
          if (B.length === 0)
            return 0;
          let I = 0;
          for (; B.length > 0 && typeof a(B) == "string" && /^[\t ]*$/.test(a(B)); )
            I += B.pop().length;
          if (B.length > 0 && typeof a(B) == "string") {
            let j = a(B).replace(/[\t ]*$/, "");
            I += a(B).length - j.length, B[B.length - 1] = j;
          }
          return I;
        }
        function v(B, I, j, P, E, D) {
          let m = I.length, A = [B], o = [];
          for (; j >= 0; ) {
            if (A.length === 0) {
              if (m === 0)
                return !0;
              A.push(I[m - 1]), m--;
              continue;
            }
            let [F, y, T] = A.pop();
            if (typeof T == "string")
              o.push(T), j -= i(T);
            else if (s(T)) {
              let b = c(T);
              for (let S = b.length - 1; S >= 0; S--)
                A.push([F, y, b[S]]);
            } else
              switch (T.type) {
                case "indent":
                  A.push([d(F, P), y, T.contents]);
                  break;
                case "align":
                  A.push([g(F, T.n, P), y, T.contents]);
                  break;
                case "trim":
                  j += k(o);
                  break;
                case "group": {
                  if (D && T.break)
                    return !1;
                  let b = T.break ? f : y;
                  A.push([F, b, T.expandedStates && b === f ? a(T.expandedStates) : T.contents]), T.id && (C[T.id] = b);
                  break;
                }
                case "fill":
                  for (let b = T.parts.length - 1; b >= 0; b--)
                    A.push([F, y, T.parts[b]]);
                  break;
                case "if-break":
                case "indent-if-break": {
                  let b = T.groupId ? C[T.groupId] : y;
                  if (b === f) {
                    let S = T.type === "if-break" ? T.breakContents : T.negate ? T.contents : u(T.contents);
                    S && A.push([F, y, S]);
                  }
                  if (b === h) {
                    let S = T.type === "if-break" ? T.flatContents : T.negate ? u(T.contents) : T.contents;
                    S && A.push([F, y, S]);
                  }
                  break;
                }
                case "line":
                  switch (y) {
                    case h:
                      if (!T.hard) {
                        T.soft || (o.push(" "), j -= 1);
                        break;
                      }
                      return !0;
                    case f:
                      return !0;
                  }
                  break;
                case "line-suffix":
                  E = !0;
                  break;
                case "line-suffix-boundary":
                  if (E)
                    return !1;
                  break;
                case "label":
                  A.push([F, y, T.contents]);
                  break;
              }
          }
          return !1;
        }
        function x(B, I) {
          C = {};
          let j = I.printWidth, P = n(I.endOfLine), E = 0, D = [[p(), f, B]], m = [], A = !1, o = [];
          for (; D.length > 0; ) {
            let [y, T, b] = D.pop();
            if (typeof b == "string") {
              let S = P !== `
` ? b.replace(/\n/g, P) : b;
              m.push(S), E += i(S);
            } else if (s(b)) {
              let S = c(b);
              for (let L = S.length - 1; L >= 0; L--)
                D.push([y, T, S[L]]);
            } else
              switch (b.type) {
                case "cursor":
                  m.push(t.placeholder);
                  break;
                case "indent":
                  D.push([d(y, I), T, b.contents]);
                  break;
                case "align":
                  D.push([g(y, b.n, I), T, b.contents]);
                  break;
                case "trim":
                  E -= k(m);
                  break;
                case "group":
                  switch (T) {
                    case h:
                      if (!A) {
                        D.push([y, b.break ? f : h, b.contents]);
                        break;
                      }
                    case f: {
                      A = !1;
                      let S = [y, h, b.contents], L = j - E, R = o.length > 0;
                      if (!b.break && v(S, D, L, I, R))
                        D.push(S);
                      else if (b.expandedStates) {
                        let O = a(b.expandedStates);
                        if (b.break) {
                          D.push([y, f, O]);
                          break;
                        } else
                          for (let U = 1; U < b.expandedStates.length + 1; U++)
                            if (U >= b.expandedStates.length) {
                              D.push([y, f, O]);
                              break;
                            } else {
                              let V = b.expandedStates[U], _ = [y, h, V];
                              if (v(_, D, L, I, R)) {
                                D.push(_);
                                break;
                              }
                            }
                      } else
                        D.push([y, f, b.contents]);
                      break;
                    }
                  }
                  b.id && (C[b.id] = a(D)[1]);
                  break;
                case "fill": {
                  let S = j - E, { parts: L } = b;
                  if (L.length === 0)
                    break;
                  let [R, O] = L, U = [y, h, R], V = [y, f, R], _ = v(U, [], S, I, o.length > 0, !0);
                  if (L.length === 1) {
                    _ ? D.push(U) : D.push(V);
                    break;
                  }
                  let Y = [y, h, O], H = [y, f, O];
                  if (L.length === 2) {
                    _ ? D.push(Y, U) : D.push(H, V);
                    break;
                  }
                  L.splice(0, 2);
                  let $ = [y, T, e(L)], K = L[0];
                  v([y, h, [R, O, K]], [], S, I, o.length > 0, !0) ? D.push($, Y, U) : _ ? D.push($, H, U) : D.push($, H, V);
                  break;
                }
                case "if-break":
                case "indent-if-break": {
                  let S = b.groupId ? C[b.groupId] : T;
                  if (S === f) {
                    let L = b.type === "if-break" ? b.breakContents : b.negate ? b.contents : u(b.contents);
                    L && D.push([y, T, L]);
                  }
                  if (S === h) {
                    let L = b.type === "if-break" ? b.flatContents : b.negate ? u(b.contents) : b.contents;
                    L && D.push([y, T, L]);
                  }
                  break;
                }
                case "line-suffix":
                  o.push([y, T, b.contents]);
                  break;
                case "line-suffix-boundary":
                  o.length > 0 && D.push([y, T, { type: "line", hard: !0 }]);
                  break;
                case "line":
                  switch (T) {
                    case h:
                      if (b.hard)
                        A = !0;
                      else {
                        b.soft || (m.push(" "), E += 1);
                        break;
                      }
                    case f:
                      if (o.length > 0) {
                        D.push([y, T, b], ...o.reverse()), o = [];
                        break;
                      }
                      b.literal ? y.root ? (m.push(P, y.root.value), E = y.root.length) : (m.push(P), E = 0) : (E -= k(m), m.push(P + y.value), E = y.length);
                      break;
                  }
                  break;
                case "label":
                  D.push([y, T, b.contents]);
                  break;
              }
            D.length === 0 && o.length > 0 && (D.push(...o.reverse()), o = []);
          }
          let F = m.indexOf(t.placeholder);
          if (F !== -1) {
            let y = m.indexOf(t.placeholder, F + 1), T = m.slice(0, F).join(""), b = m.slice(F + 1, y).join(""), S = m.slice(y + 1).join("");
            return { formatted: T + b + S, cursorNodeStart: T.length, cursorNodeText: b };
          }
          return { formatted: m.join("") };
        }
        l.exports = { printDocToString: x };
      } }), Ji = Z({ "src/document/doc-debug.js"(r, l) {
        te();
        var { isConcat: n, getDocParts: a } = Yn();
        function i(t) {
          if (!t)
            return "";
          if (n(t)) {
            let u = [];
            for (let s of a(t))
              if (n(s))
                u.push(...i(s).parts);
              else {
                let c = i(s);
                c !== "" && u.push(c);
              }
            return { type: "concat", parts: u };
          }
          return t.type === "if-break" ? Object.assign(Object.assign({}, t), {}, { breakContents: i(t.breakContents), flatContents: i(t.flatContents) }) : t.type === "group" ? Object.assign(Object.assign({}, t), {}, { contents: i(t.contents), expandedStates: t.expandedStates && t.expandedStates.map(i) }) : t.type === "fill" ? { type: "fill", parts: t.parts.map(i) } : t.contents ? Object.assign(Object.assign({}, t), {}, { contents: i(t.contents) }) : t;
        }
        function e(t) {
          let u = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ new Set();
          return c(i(t));
          function c(f, h, p) {
            if (typeof f == "string")
              return JSON.stringify(f);
            if (n(f)) {
              let d = a(f).map(c).filter(Boolean);
              return d.length === 1 ? d[0] : "[".concat(d.join(", "), "]");
            }
            if (f.type === "line") {
              let d = Array.isArray(p) && p[h + 1] && p[h + 1].type === "break-parent";
              return f.literal ? d ? "literalline" : "literallineWithoutBreakParent" : f.hard ? d ? "hardline" : "hardlineWithoutBreakParent" : f.soft ? "softline" : "line";
            }
            if (f.type === "break-parent")
              return Array.isArray(p) && p[h - 1] && p[h - 1].type === "line" && p[h - 1].hard ? void 0 : "breakParent";
            if (f.type === "trim")
              return "trim";
            if (f.type === "indent")
              return "indent(" + c(f.contents) + ")";
            if (f.type === "align")
              return f.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + c(f.contents) + ")" : f.n < 0 ? "dedent(" + c(f.contents) + ")" : f.n.type === "root" ? "markAsRoot(" + c(f.contents) + ")" : "align(" + JSON.stringify(f.n) + ", " + c(f.contents) + ")";
            if (f.type === "if-break")
              return "ifBreak(" + c(f.breakContents) + (f.flatContents ? ", " + c(f.flatContents) : "") + (f.groupId ? (f.flatContents ? "" : ', ""') + ", { groupId: ".concat(C(f.groupId), " }") : "") + ")";
            if (f.type === "indent-if-break") {
              let d = [];
              f.negate && d.push("negate: true"), f.groupId && d.push("groupId: ".concat(C(f.groupId)));
              let g = d.length > 0 ? ", { ".concat(d.join(", "), " }") : "";
              return "indentIfBreak(".concat(c(f.contents)).concat(g, ")");
            }
            if (f.type === "group") {
              let d = [];
              f.break && f.break !== "propagated" && d.push("shouldBreak: true"), f.id && d.push("id: ".concat(C(f.id)));
              let g = d.length > 0 ? ", { ".concat(d.join(", "), " }") : "";
              return f.expandedStates ? "conditionalGroup([".concat(f.expandedStates.map((w) => c(w)).join(","), "]").concat(g, ")") : "group(".concat(c(f.contents)).concat(g, ")");
            }
            if (f.type === "fill")
              return "fill([".concat(f.parts.map((d) => c(d)).join(", "), "])");
            if (f.type === "line-suffix")
              return "lineSuffix(" + c(f.contents) + ")";
            if (f.type === "line-suffix-boundary")
              return "lineSuffixBoundary";
            if (f.type === "label")
              return "label(".concat(JSON.stringify(f.label), ", ").concat(c(f.contents), ")");
            throw new Error("Unknown doc type " + f.type);
          }
          function C(f) {
            if (typeof f != "symbol")
              return JSON.stringify(String(f));
            if (f in u)
              return u[f];
            let h = String(f).slice(7, -1) || "symbol";
            for (let p = 0; ; p++) {
              let d = h + (p > 0 ? " #".concat(p) : "");
              if (!s.has(d))
                return s.add(d), u[f] = "Symbol.for(".concat(JSON.stringify(d), ")");
            }
          }
        }
        l.exports = { printDocToDebug: e };
      } }), Ye = Z({ "src/document/index.js"(r, l) {
        te(), l.exports = { builders: Bt(), printer: $i(), utils: Yn(), debug: Ji() };
      } }), Jr = {};
      Mt(Jr, { default: () => Ui });
      function Ui(r) {
        if (typeof r != "string")
          throw new TypeError("Expected a string");
        return r.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
      }
      var Hi = Ct({ "node_modules/escape-string-regexp/index.js"() {
        te();
      } }), Ur = Z({ "node_modules/semver/internal/debug.js"(r, l) {
        te();
        var n = typeof St == "object" && St.env && St.env.NODE_DEBUG && /\bsemver\b/i.test(St.env.NODE_DEBUG) ? function() {
          for (var a = arguments.length, i = new Array(a), e = 0; e < a; e++)
            i[e] = arguments[e];
          return console.error("SEMVER", ...i);
        } : () => {
        };
        l.exports = n;
      } }), Hr = Z({ "node_modules/semver/internal/constants.js"(r, l) {
        te();
        var n = "2.0.0", a = 256, i = Number.MAX_SAFE_INTEGER || 9007199254740991, e = 16;
        l.exports = { SEMVER_SPEC_VERSION: n, MAX_LENGTH: a, MAX_SAFE_INTEGER: i, MAX_SAFE_COMPONENT_LENGTH: e };
      } }), qi = Z({ "node_modules/semver/internal/re.js"(r, l) {
        te();
        var { MAX_SAFE_COMPONENT_LENGTH: n } = Hr(), a = Ur();
        r = l.exports = {};
        var i = r.re = [], e = r.src = [], t = r.t = {}, u = 0, s = (c, C, f) => {
          let h = u++;
          a(c, h, C), t[c] = h, e[h] = C, i[h] = new RegExp(C, f ? "g" : void 0);
        };
        s("NUMERICIDENTIFIER", "0|[1-9]\\d*"), s("NUMERICIDENTIFIERLOOSE", "[0-9]+"), s("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"), s("MAINVERSION", "(".concat(e[t.NUMERICIDENTIFIER], ")\\.(").concat(e[t.NUMERICIDENTIFIER], ")\\.(").concat(e[t.NUMERICIDENTIFIER], ")")), s("MAINVERSIONLOOSE", "(".concat(e[t.NUMERICIDENTIFIERLOOSE], ")\\.(").concat(e[t.NUMERICIDENTIFIERLOOSE], ")\\.(").concat(e[t.NUMERICIDENTIFIERLOOSE], ")")), s("PRERELEASEIDENTIFIER", "(?:".concat(e[t.NUMERICIDENTIFIER], "|").concat(e[t.NONNUMERICIDENTIFIER], ")")), s("PRERELEASEIDENTIFIERLOOSE", "(?:".concat(e[t.NUMERICIDENTIFIERLOOSE], "|").concat(e[t.NONNUMERICIDENTIFIER], ")")), s("PRERELEASE", "(?:-(".concat(e[t.PRERELEASEIDENTIFIER], "(?:\\.").concat(e[t.PRERELEASEIDENTIFIER], ")*))")), s("PRERELEASELOOSE", "(?:-?(".concat(e[t.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(e[t.PRERELEASEIDENTIFIERLOOSE], ")*))")), s("BUILDIDENTIFIER", "[0-9A-Za-z-]+"), s("BUILD", "(?:\\+(".concat(e[t.BUILDIDENTIFIER], "(?:\\.").concat(e[t.BUILDIDENTIFIER], ")*))")), s("FULLPLAIN", "v?".concat(e[t.MAINVERSION]).concat(e[t.PRERELEASE], "?").concat(e[t.BUILD], "?")), s("FULL", "^".concat(e[t.FULLPLAIN], "$")), s("LOOSEPLAIN", "[v=\\s]*".concat(e[t.MAINVERSIONLOOSE]).concat(e[t.PRERELEASELOOSE], "?").concat(e[t.BUILD], "?")), s("LOOSE", "^".concat(e[t.LOOSEPLAIN], "$")), s("GTLT", "((?:<|>)?=?)"), s("XRANGEIDENTIFIERLOOSE", "".concat(e[t.NUMERICIDENTIFIERLOOSE], "|x|X|\\*")), s("XRANGEIDENTIFIER", "".concat(e[t.NUMERICIDENTIFIER], "|x|X|\\*")), s("XRANGEPLAIN", "[v=\\s]*(".concat(e[t.XRANGEIDENTIFIER], ")(?:\\.(").concat(e[t.XRANGEIDENTIFIER], ")(?:\\.(").concat(e[t.XRANGEIDENTIFIER], ")(?:").concat(e[t.PRERELEASE], ")?").concat(e[t.BUILD], "?)?)?")), s("XRANGEPLAINLOOSE", "[v=\\s]*(".concat(e[t.XRANGEIDENTIFIERLOOSE], ")(?:\\.(").concat(e[t.XRANGEIDENTIFIERLOOSE], ")(?:\\.(").concat(e[t.XRANGEIDENTIFIERLOOSE], ")(?:").concat(e[t.PRERELEASELOOSE], ")?").concat(e[t.BUILD], "?)?)?")), s("XRANGE", "^".concat(e[t.GTLT], "\\s*").concat(e[t.XRANGEPLAIN], "$")), s("XRANGELOOSE", "^".concat(e[t.GTLT], "\\s*").concat(e[t.XRANGEPLAINLOOSE], "$")), s("COERCE", "(^|[^\\d])(\\d{1,".concat(n, "})(?:\\.(\\d{1,").concat(n, "}))?(?:\\.(\\d{1,").concat(n, "}))?(?:$|[^\\d])")), s("COERCERTL", e[t.COERCE], !0), s("LONETILDE", "(?:~>?)"), s("TILDETRIM", "(\\s*)".concat(e[t.LONETILDE], "\\s+"), !0), r.tildeTrimReplace = "$1~", s("TILDE", "^".concat(e[t.LONETILDE]).concat(e[t.XRANGEPLAIN], "$")), s("TILDELOOSE", "^".concat(e[t.LONETILDE]).concat(e[t.XRANGEPLAINLOOSE], "$")), s("LONECARET", "(?:\\^)"), s("CARETTRIM", "(\\s*)".concat(e[t.LONECARET], "\\s+"), !0), r.caretTrimReplace = "$1^", s("CARET", "^".concat(e[t.LONECARET]).concat(e[t.XRANGEPLAIN], "$")), s("CARETLOOSE", "^".concat(e[t.LONECARET]).concat(e[t.XRANGEPLAINLOOSE], "$")), s("COMPARATORLOOSE", "^".concat(e[t.GTLT], "\\s*(").concat(e[t.LOOSEPLAIN], ")$|^$")), s("COMPARATOR", "^".concat(e[t.GTLT], "\\s*(").concat(e[t.FULLPLAIN], ")$|^$")), s("COMPARATORTRIM", "(\\s*)".concat(e[t.GTLT], "\\s*(").concat(e[t.LOOSEPLAIN], "|").concat(e[t.XRANGEPLAIN], ")"), !0), r.comparatorTrimReplace = "$1$2$3", s("HYPHENRANGE", "^\\s*(".concat(e[t.XRANGEPLAIN], ")\\s+-\\s+(").concat(e[t.XRANGEPLAIN], ")\\s*$")), s("HYPHENRANGELOOSE", "^\\s*(".concat(e[t.XRANGEPLAINLOOSE], ")\\s+-\\s+(").concat(e[t.XRANGEPLAINLOOSE], ")\\s*$")), s("STAR", "(<|>)?=?\\s*\\*"), s("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), s("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
      } }), Wi = Z({ "node_modules/semver/internal/parse-options.js"(r, l) {
        te();
        var n = ["includePrerelease", "loose", "rtl"], a = (i) => i ? typeof i != "object" ? { loose: !0 } : n.filter((e) => i[e]).reduce((e, t) => (e[t] = !0, e), {}) : {};
        l.exports = a;
      } }), Xi = Z({ "node_modules/semver/internal/identifiers.js"(r, l) {
        te();
        var n = /^[0-9]+$/, a = (e, t) => {
          let u = n.test(e), s = n.test(t);
          return u && s && (e = +e, t = +t), e === t ? 0 : u && !s ? -1 : s && !u ? 1 : e < t ? -1 : 1;
        }, i = (e, t) => a(t, e);
        l.exports = { compareIdentifiers: a, rcompareIdentifiers: i };
      } }), Gi = Z({ "node_modules/semver/classes/semver.js"(r, l) {
        te();
        var n = Ur(), { MAX_LENGTH: a, MAX_SAFE_INTEGER: i } = Hr(), { re: e, t } = qi(), u = Wi(), { compareIdentifiers: s } = Xi(), c = class {
          constructor(C, f) {
            if (f = u(f), C instanceof c) {
              if (C.loose === !!f.loose && C.includePrerelease === !!f.includePrerelease)
                return C;
              C = C.version;
            } else if (typeof C != "string")
              throw new TypeError("Invalid Version: ".concat(C));
            if (C.length > a)
              throw new TypeError("version is longer than ".concat(a, " characters"));
            n("SemVer", C, f), this.options = f, this.loose = !!f.loose, this.includePrerelease = !!f.includePrerelease;
            let h = C.trim().match(f.loose ? e[t.LOOSE] : e[t.FULL]);
            if (!h)
              throw new TypeError("Invalid Version: ".concat(C));
            if (this.raw = C, this.major = +h[1], this.minor = +h[2], this.patch = +h[3], this.major > i || this.major < 0)
              throw new TypeError("Invalid major version");
            if (this.minor > i || this.minor < 0)
              throw new TypeError("Invalid minor version");
            if (this.patch > i || this.patch < 0)
              throw new TypeError("Invalid patch version");
            h[4] ? this.prerelease = h[4].split(".").map((p) => {
              if (/^[0-9]+$/.test(p)) {
                let d = +p;
                if (d >= 0 && d < i)
                  return d;
              }
              return p;
            }) : this.prerelease = [], this.build = h[5] ? h[5].split(".") : [], this.format();
          }
          format() {
            return this.version = "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch), this.prerelease.length && (this.version += "-".concat(this.prerelease.join("."))), this.version;
          }
          toString() {
            return this.version;
          }
          compare(C) {
            if (n("SemVer.compare", this.version, this.options, C), !(C instanceof c)) {
              if (typeof C == "string" && C === this.version)
                return 0;
              C = new c(C, this.options);
            }
            return C.version === this.version ? 0 : this.compareMain(C) || this.comparePre(C);
          }
          compareMain(C) {
            return C instanceof c || (C = new c(C, this.options)), s(this.major, C.major) || s(this.minor, C.minor) || s(this.patch, C.patch);
          }
          comparePre(C) {
            if (C instanceof c || (C = new c(C, this.options)), this.prerelease.length && !C.prerelease.length)
              return -1;
            if (!this.prerelease.length && C.prerelease.length)
              return 1;
            if (!this.prerelease.length && !C.prerelease.length)
              return 0;
            let f = 0;
            do {
              let h = this.prerelease[f], p = C.prerelease[f];
              if (n("prerelease compare", f, h, p), h === void 0 && p === void 0)
                return 0;
              if (p === void 0)
                return 1;
              if (h === void 0)
                return -1;
              if (h !== p)
                return s(h, p);
            } while (++f);
          }
          compareBuild(C) {
            C instanceof c || (C = new c(C, this.options));
            let f = 0;
            do {
              let h = this.build[f], p = C.build[f];
              if (n("prerelease compare", f, h, p), h === void 0 && p === void 0)
                return 0;
              if (p === void 0)
                return 1;
              if (h === void 0)
                return -1;
              if (h !== p)
                return s(h, p);
            } while (++f);
          }
          inc(C, f) {
            switch (C) {
              case "premajor":
                this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", f);
                break;
              case "preminor":
                this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", f);
                break;
              case "prepatch":
                this.prerelease.length = 0, this.inc("patch", f), this.inc("pre", f);
                break;
              case "prerelease":
                this.prerelease.length === 0 && this.inc("patch", f), this.inc("pre", f);
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
                  let h = this.prerelease.length;
                  for (; --h >= 0; )
                    typeof this.prerelease[h] == "number" && (this.prerelease[h]++, h = -2);
                  h === -1 && this.prerelease.push(0);
                }
                f && (s(this.prerelease[0], f) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = [f, 0]) : this.prerelease = [f, 0]);
                break;
              default:
                throw new Error("invalid increment argument: ".concat(C));
            }
            return this.format(), this.raw = this.version, this;
          }
        };
        l.exports = c;
      } }), Zn = Z({ "node_modules/semver/functions/compare.js"(r, l) {
        te();
        var n = Gi(), a = (i, e, t) => new n(i, t).compare(new n(e, t));
        l.exports = a;
      } }), zi = Z({ "node_modules/semver/functions/lt.js"(r, l) {
        te();
        var n = Zn(), a = (i, e, t) => n(i, e, t) < 0;
        l.exports = a;
      } }), Qi = Z({ "node_modules/semver/functions/gte.js"(r, l) {
        te();
        var n = Zn(), a = (i, e, t) => n(i, e, t) >= 0;
        l.exports = a;
      } }), Yi = Z({ "src/utils/arrayify.js"(r, l) {
        te(), l.exports = (n, a) => Object.entries(n).map((i) => {
          let [e, t] = i;
          return Object.assign({ [a]: e }, t);
        });
      } }), Zi = Z({ "node_modules/outdent/lib/index.js"(r, l) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 }), r.outdent = void 0;
        function n() {
          for (var v = [], x = 0; x < arguments.length; x++)
            v[x] = arguments[x];
        }
        function a() {
          return typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : i();
        }
        function i() {
          return { add: n, delete: n, get: n, set: n, has: function(v) {
            return !1;
          } };
        }
        var e = Object.prototype.hasOwnProperty, t = function(v, x) {
          return e.call(v, x);
        };
        function u(v, x) {
          for (var B in x)
            t(x, B) && (v[B] = x[B]);
          return v;
        }
        var s = /^[ \t]*(?:\r\n|\r|\n)/, c = /(?:\r\n|\r|\n)[ \t]*$/, C = /^(?:[\r\n]|$)/, f = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/, h = /^[ \t]*[\r\n][ \t\r\n]*$/;
        function p(v, x, B) {
          var I = 0, j = v[0].match(f);
          j && (I = j[1].length);
          var P = "(\\r\\n|\\r|\\n).{0," + I + "}", E = new RegExp(P, "g");
          x && (v = v.slice(1));
          var D = B.newline, m = B.trimLeadingNewline, A = B.trimTrailingNewline, o = typeof D == "string", F = v.length, y = v.map(function(T, b) {
            return T = T.replace(E, "$1"), b === 0 && m && (T = T.replace(s, "")), b === F - 1 && A && (T = T.replace(c, "")), o && (T = T.replace(/\r\n|\n|\r/g, function(S) {
              return D;
            })), T;
          });
          return y;
        }
        function d(v, x) {
          for (var B = "", I = 0, j = v.length; I < j; I++)
            B += v[I], I < j - 1 && (B += x[I]);
          return B;
        }
        function g(v) {
          return t(v, "raw") && t(v, "length");
        }
        function w(v) {
          var x = a(), B = a();
          function I(P) {
            for (var E = [], D = 1; D < arguments.length; D++)
              E[D - 1] = arguments[D];
            if (g(P)) {
              var m = P, A = (E[0] === I || E[0] === k) && h.test(m[0]) && C.test(m[1]), o = A ? B : x, F = o.get(m);
              if (F || (F = p(m, A, v), o.set(m, F)), E.length === 0)
                return F[0];
              var y = d(F, A ? E.slice(1) : E);
              return y;
            } else
              return w(u(u({}, v), P || {}));
          }
          var j = u(I, { string: function(P) {
            return p([P], !1, v)[0];
          } });
          return j;
        }
        var k = w({ trimLeadingNewline: !0, trimTrailingNewline: !0 });
        if (r.outdent = k, r.default = k, typeof l < "u")
          try {
            l.exports = k, Object.defineProperty(k, "__esModule", { value: !0 }), k.default = k, k.outdent = k;
          } catch {
          }
      } }), Ki = Z({ "src/main/core-options.js"(r, l) {
        te();
        var { outdent: n } = Zi(), a = "Config", i = "Editor", e = "Format", t = "Other", u = "Output", s = "Global", c = "Special", C = { cursorOffset: { since: "1.4.0", category: c, type: "int", default: -1, range: { start: -1, end: Number.POSITIVE_INFINITY, step: 1 }, description: n(Ce || (Ce = Qe([`
      Print (to stderr) where a cursor at the given position would move to after formatting.
      This option cannot be used with --range-start and --range-end.
    `]))), cliCategory: i }, endOfLine: { since: "1.15.0", category: s, type: "choice", default: [{ since: "1.15.0", value: "auto" }, { since: "2.0.0", value: "lf" }], description: "Which end of line characters to apply.", choices: [{ value: "lf", description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos" }, { value: "crlf", description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows" }, { value: "cr", description: "Carriage Return character only (\\r), used very rarely" }, { value: "auto", description: n(Ne || (Ne = Qe([`
          Maintain existing
          (mixed values within one file are normalised by looking at what's used after the first line)
        `]))) }] }, filepath: { since: "1.4.0", category: c, type: "path", description: "Specify the input filepath. This will be used to do parser inference.", cliName: "stdin-filepath", cliCategory: t, cliDescription: "Path to the file to pretend that stdin comes from." }, insertPragma: { since: "1.8.0", category: c, type: "boolean", default: !1, description: "Insert @format pragma into file's first docblock comment.", cliCategory: t }, parser: { since: "0.0.10", category: s, type: "choice", default: [{ since: "0.0.10", value: "babylon" }, { since: "1.13.0", value: void 0 }], description: "Which parser to use.", exception: (f) => typeof f == "string" || typeof f == "function", choices: [{ value: "flow", description: "Flow" }, { value: "babel", since: "1.16.0", description: "JavaScript" }, { value: "babel-flow", since: "1.16.0", description: "Flow" }, { value: "babel-ts", since: "2.0.0", description: "TypeScript" }, { value: "typescript", since: "1.4.0", description: "TypeScript" }, { value: "acorn", since: "2.6.0", description: "JavaScript" }, { value: "espree", since: "2.2.0", description: "JavaScript" }, { value: "meriyah", since: "2.2.0", description: "JavaScript" }, { value: "css", since: "1.7.1", description: "CSS" }, { value: "less", since: "1.7.1", description: "Less" }, { value: "scss", since: "1.7.1", description: "SCSS" }, { value: "json", since: "1.5.0", description: "JSON" }, { value: "json5", since: "1.13.0", description: "JSON5" }, { value: "json-stringify", since: "1.13.0", description: "JSON.stringify" }, { value: "graphql", since: "1.5.0", description: "GraphQL" }, { value: "markdown", since: "1.8.0", description: "Markdown" }, { value: "mdx", since: "1.15.0", description: "MDX" }, { value: "vue", since: "1.10.0", description: "Vue" }, { value: "yaml", since: "1.14.0", description: "YAML" }, { value: "glimmer", since: "2.3.0", description: "Ember / Handlebars" }, { value: "html", since: "1.15.0", description: "HTML" }, { value: "angular", since: "1.15.0", description: "Angular" }, { value: "lwc", since: "1.17.0", description: "Lightning Web Components" }] }, plugins: { since: "1.10.0", type: "path", array: !0, default: [{ value: [] }], category: s, description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.", exception: (f) => typeof f == "string" || typeof f == "object", cliName: "plugin", cliCategory: a }, pluginSearchDirs: { since: "1.13.0", type: "path", array: !0, default: [{ value: [] }], category: s, description: n(ke || (ke = Qe([`
      Custom directory that contains prettier plugins in node_modules subdirectory.
      Overrides default behavior when plugins are searched relatively to the location of Prettier.
      Multiple values are accepted.
    `]))), exception: (f) => typeof f == "string" || typeof f == "object", cliName: "plugin-search-dir", cliCategory: a }, printWidth: { since: "0.0.0", category: s, type: "int", default: 80, description: "The line length where Prettier will try wrap.", range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 } }, rangeEnd: { since: "1.4.0", category: c, type: "int", default: Number.POSITIVE_INFINITY, range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 }, description: n(je || (je = Qe([`
      Format code ending at a given character offset (exclusive).
      The range will extend forwards to the end of the selected statement.
      This option cannot be used with --cursor-offset.
    `]))), cliCategory: i }, rangeStart: { since: "1.4.0", category: c, type: "int", default: 0, range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 }, description: n(Re || (Re = Qe([`
      Format code starting at a given character offset.
      The range will extend backwards to the start of the first line containing the selected statement.
      This option cannot be used with --cursor-offset.
    `]))), cliCategory: i }, requirePragma: { since: "1.7.0", category: c, type: "boolean", default: !1, description: n(Ve || (Ve = Qe([`
      Require either '@prettier' or '@format' to be present in the file's first docblock comment
      in order for it to be formatted.
    `]))), cliCategory: t }, tabWidth: { type: "int", category: s, default: 2, description: "Number of spaces per indentation level.", range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 } }, useTabs: { since: "1.0.0", category: s, type: "boolean", default: !1, description: "Indent with tabs instead of spaces." }, embeddedLanguageFormatting: { since: "2.1.0", category: s, type: "choice", default: [{ since: "2.1.0", value: "auto" }], description: "Control how Prettier formats quoted code embedded in the file.", choices: [{ value: "auto", description: "Format embedded code if Prettier can automatically identify it." }, { value: "off", description: "Never automatically format embedded code." }] } };
        l.exports = { CATEGORY_CONFIG: a, CATEGORY_EDITOR: i, CATEGORY_FORMAT: e, CATEGORY_OTHER: t, CATEGORY_OUTPUT: u, CATEGORY_GLOBAL: s, CATEGORY_SPECIAL: c, options: C };
      } }), Kn = Z({ "src/main/support.js"(r, l) {
        te();
        var n = { compare: Zn(), lt: zi(), gte: Qi() }, a = Yi(), i = on().version, e = Ki().options;
        function t() {
          let { plugins: s = [], showUnreleased: c = !1, showDeprecated: C = !1, showInternal: f = !1 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, h = i.split("-", 1)[0], p = s.flatMap((v) => v.languages || []).filter(g), d = a(Object.assign({}, ...s.map((v) => {
            let { options: x } = v;
            return x;
          }), e), "name").filter((v) => g(v) && w(v)).sort((v, x) => v.name === x.name ? 0 : v.name < x.name ? -1 : 1).map(k).map((v) => {
            v = Object.assign({}, v), Array.isArray(v.default) && (v.default = v.default.length === 1 ? v.default[0].value : v.default.filter(g).sort((B, I) => n.compare(I.since, B.since))[0].value), Array.isArray(v.choices) && (v.choices = v.choices.filter((B) => g(B) && w(B)), v.name === "parser" && u(v, p, s));
            let x = Object.fromEntries(s.filter((B) => B.defaultOptions && B.defaultOptions[v.name] !== void 0).map((B) => [B.name, B.defaultOptions[v.name]]));
            return Object.assign(Object.assign({}, v), {}, { pluginDefaults: x });
          });
          return { languages: p, options: d };
          function g(v) {
            return c || !("since" in v) || v.since && n.gte(h, v.since);
          }
          function w(v) {
            return C || !("deprecated" in v) || v.deprecated && n.lt(h, v.deprecated);
          }
          function k(v) {
            return f ? v : ze(v, oe);
          }
        }
        function u(s, c, C) {
          let f = new Set(s.choices.map((h) => h.value));
          for (let h of c)
            if (h.parsers) {
              for (let p of h.parsers)
                if (!f.has(p)) {
                  f.add(p);
                  let d = C.find((w) => w.parsers && w.parsers[p]), g = h.name;
                  d && d.name && (g += " (plugin: ".concat(d.name, ")")), s.choices.push({ value: p, description: g });
                }
            }
        }
        l.exports = { getSupportInfo: t };
      } }), er = Z({ "src/utils/is-non-empty-array.js"(r, l) {
        te();
        function n(a) {
          return Array.isArray(a) && a.length > 0;
        }
        l.exports = n;
      } }), An = Z({ "src/utils/text/skip.js"(r, l) {
        te();
        function n(u) {
          return (s, c, C) => {
            let f = C && C.backwards;
            if (c === !1)
              return !1;
            let { length: h } = s, p = c;
            for (; p >= 0 && p < h; ) {
              let d = s.charAt(p);
              if (u instanceof RegExp) {
                if (!u.test(d))
                  return p;
              } else if (!u.includes(d))
                return p;
              f ? p-- : p++;
            }
            return p === -1 || p === h ? p : !1;
          };
        }
        var a = n(/\s/), i = n(" 	"), e = n(",; 	"), t = n(/[^\n\r]/);
        l.exports = { skipWhitespace: a, skipSpaces: i, skipToLineEnd: e, skipEverythingButNewLine: t };
      } }), qr = Z({ "src/utils/text/skip-inline-comment.js"(r, l) {
        te();
        function n(a, i) {
          if (i === !1)
            return !1;
          if (a.charAt(i) === "/" && a.charAt(i + 1) === "*") {
            for (let e = i + 2; e < a.length; ++e)
              if (a.charAt(e) === "*" && a.charAt(e + 1) === "/")
                return e + 2;
          }
          return i;
        }
        l.exports = n;
      } }), Wr = Z({ "src/utils/text/skip-trailing-comment.js"(r, l) {
        te();
        var { skipEverythingButNewLine: n } = An();
        function a(i, e) {
          return e === !1 ? !1 : i.charAt(e) === "/" && i.charAt(e + 1) === "/" ? n(i, e) : e;
        }
        l.exports = a;
      } }), Xr = Z({ "src/utils/text/skip-newline.js"(r, l) {
        te();
        function n(a, i, e) {
          let t = e && e.backwards;
          if (i === !1)
            return !1;
          let u = a.charAt(i);
          if (t) {
            if (a.charAt(i - 1) === "\r" && u === `
`)
              return i - 2;
            if (u === `
` || u === "\r" || u === "\u2028" || u === "\u2029")
              return i - 1;
          } else {
            if (u === "\r" && a.charAt(i + 1) === `
`)
              return i + 2;
            if (u === `
` || u === "\r" || u === "\u2028" || u === "\u2029")
              return i + 1;
          }
          return i;
        }
        l.exports = n;
      } }), ea = Z({ "src/utils/text/get-next-non-space-non-comment-character-index-with-start-index.js"(r, l) {
        te();
        var n = qr(), a = Xr(), i = Wr(), { skipSpaces: e } = An();
        function t(u, s) {
          let c = null, C = s;
          for (; C !== c; )
            c = C, C = e(u, C), C = n(u, C), C = i(u, C), C = a(u, C);
          return C;
        }
        l.exports = t;
      } }), ot = Z({ "src/common/util.js"(r, l) {
        te();
        var { default: n } = (Hi(), gt(Jr)), a = It(), { getSupportInfo: i } = Kn(), e = er(), t = $r(), { skipWhitespace: u, skipSpaces: s, skipToLineEnd: c, skipEverythingButNewLine: C } = An(), f = qr(), h = Wr(), p = Xr(), d = ea(), g = (H) => H[H.length - 2];
        function w(H) {
          return ($, K, ne) => {
            let ee = ne && ne.backwards;
            if (K === !1)
              return !1;
            let { length: pe } = $, J = K;
            for (; J >= 0 && J < pe; ) {
              let W = $.charAt(J);
              if (H instanceof RegExp) {
                if (!H.test(W))
                  return J;
              } else if (!H.includes(W))
                return J;
              ee ? J-- : J++;
            }
            return J === -1 || J === pe ? J : !1;
          };
        }
        function k(H, $) {
          let K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, ne = s(H, K.backwards ? $ - 1 : $, K), ee = p(H, ne, K);
          return ne !== ee;
        }
        function v(H, $, K) {
          for (let ne = $; ne < K; ++ne)
            if (H.charAt(ne) === `
`)
              return !0;
          return !1;
        }
        function x(H, $, K) {
          let ne = K($) - 1;
          ne = s(H, ne, { backwards: !0 }), ne = p(H, ne, { backwards: !0 }), ne = s(H, ne, { backwards: !0 });
          let ee = p(H, ne, { backwards: !0 });
          return ne !== ee;
        }
        function B(H, $) {
          let K = null, ne = $;
          for (; ne !== K; )
            K = ne, ne = c(H, ne), ne = f(H, ne), ne = s(H, ne);
          return ne = h(H, ne), ne = p(H, ne), ne !== !1 && k(H, ne);
        }
        function I(H, $, K) {
          return B(H, K($));
        }
        function j(H, $, K) {
          return d(H, K($));
        }
        function P(H, $, K) {
          return H.charAt(j(H, $, K));
        }
        function E(H, $) {
          let K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return s(H, K.backwards ? $ - 1 : $, K) !== $;
        }
        function D(H, $) {
          let K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, ne = 0;
          for (let ee = K; ee < H.length; ++ee)
            H[ee] === "	" ? ne = ne + $ - ne % $ : ne++;
          return ne;
        }
        function m(H, $) {
          let K = H.lastIndexOf(`
`);
          return K === -1 ? 0 : D(H.slice(K + 1).match(/^[\t ]*/)[0], $);
        }
        function A(H, $) {
          let K = { quote: '"', regex: /"/g, escaped: "&quot;" }, ne = { quote: "'", regex: /'/g, escaped: "&apos;" }, ee = $ === "'" ? ne : K, pe = ee === ne ? K : ne, J = ee;
          if (H.includes(ee.quote) || H.includes(pe.quote)) {
            let W = (H.match(ee.regex) || []).length, se = (H.match(pe.regex) || []).length;
            J = W > se ? pe : ee;
          }
          return J;
        }
        function o(H, $) {
          let K = H.slice(1, -1), ne = $.parser === "json" || $.parser === "json5" && $.quoteProps === "preserve" && !$.singleQuote ? '"' : $.__isInHtmlAttribute ? "'" : A(K, $.singleQuote ? "'" : '"').quote;
          return F(K, ne, !($.parser === "css" || $.parser === "less" || $.parser === "scss" || $.__embeddedInHtml));
        }
        function F(H, $, K) {
          let ne = $ === '"' ? "'" : '"', ee = /\\(.)|(["'])/gs, pe = H.replace(ee, (J, W, se) => W === ne ? W : se === $ ? "\\" + se : se || (K && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(W) ? W : "\\" + W));
          return $ + pe + $;
        }
        function y(H) {
          return H.toLowerCase().replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3").replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1").replace(/^([+-])?\./, "$10.").replace(/(\.\d+?)0+(?=e|$)/, "$1").replace(/\.(?=e|$)/, "");
        }
        function T(H, $) {
          let K = H.match(new RegExp("(".concat(n($), ")+"), "g"));
          return K === null ? 0 : K.reduce((ne, ee) => Math.max(ne, ee.length / $.length), 0);
        }
        function b(H, $) {
          let K = H.match(new RegExp("(".concat(n($), ")+"), "g"));
          if (K === null)
            return 0;
          let ne = /* @__PURE__ */ new Map(), ee = 0;
          for (let pe of K) {
            let J = pe.length / $.length;
            ne.set(J, !0), J > ee && (ee = J);
          }
          for (let pe = 1; pe < ee; pe++)
            if (!ne.get(pe))
              return pe;
          return ee + 1;
        }
        function S(H, $) {
          (H.comments || (H.comments = [])).push($), $.printed = !1, $.nodeDescription = Y(H);
        }
        function L(H, $) {
          $.leading = !0, $.trailing = !1, S(H, $);
        }
        function R(H, $, K) {
          $.leading = !1, $.trailing = !1, K && ($.marker = K), S(H, $);
        }
        function O(H, $) {
          $.leading = !1, $.trailing = !0, S(H, $);
        }
        function U(H, $) {
          let { languages: K } = i({ plugins: $.plugins }), ne = K.find((ee) => {
            let { name: pe } = ee;
            return pe.toLowerCase() === H;
          }) || K.find((ee) => {
            let { aliases: pe } = ee;
            return Array.isArray(pe) && pe.includes(H);
          }) || K.find((ee) => {
            let { extensions: pe } = ee;
            return Array.isArray(pe) && pe.includes(".".concat(H));
          });
          return ne && ne.parsers[0];
        }
        function V(H) {
          return H && H.type === "front-matter";
        }
        function _(H) {
          let $ = /* @__PURE__ */ new WeakMap();
          return function(K) {
            return $.has(K) || $.set(K, Symbol(H)), $.get(K);
          };
        }
        function Y(H) {
          let $ = H.type || H.kind || "(unknown type)", K = String(H.name || H.id && (typeof H.id == "object" ? H.id.name : H.id) || H.key && (typeof H.key == "object" ? H.key.name : H.key) || H.value && (typeof H.value == "object" ? "" : String(H.value)) || H.operator || "");
          return K.length > 20 && (K = K.slice(0, 19) + "\u2026"), $ + (K ? " " + K : "");
        }
        l.exports = { inferParserByLanguage: U, getStringWidth: t, getMaxContinuousCount: T, getMinNotPresentContinuousCount: b, getPenultimate: g, getLast: a, getNextNonSpaceNonCommentCharacterIndexWithStartIndex: d, getNextNonSpaceNonCommentCharacterIndex: j, getNextNonSpaceNonCommentCharacter: P, skip: w, skipWhitespace: u, skipSpaces: s, skipToLineEnd: c, skipEverythingButNewLine: C, skipInlineComment: f, skipTrailingComment: h, skipNewline: p, isNextLineEmptyAfterIndex: B, isNextLineEmpty: I, isPreviousLineEmpty: x, hasNewline: k, hasNewlineInRange: v, hasSpaces: E, getAlignmentSize: D, getIndentSize: m, getPreferredQuote: A, printString: o, printNumber: y, makeString: F, addLeadingComment: L, addDanglingComment: R, addTrailingComment: O, isFrontMatterNode: V, isNonEmptyArray: e, createGroupIdMapper: _ };
      } }), Gr = {};
      Mt(Gr, { basename: () => Kr, default: () => nu, delimiter: () => ir, dirname: () => Zr, extname: () => eu, isAbsolute: () => nr, join: () => Qr, normalize: () => tr, relative: () => Yr, resolve: () => vn, sep: () => ur });
      function zr(r, l) {
        for (var n = 0, a = r.length - 1; a >= 0; a--) {
          var i = r[a];
          i === "." ? r.splice(a, 1) : i === ".." ? (r.splice(a, 1), n++) : n && (r.splice(a, 1), n--);
        }
        if (l)
          for (; n--; n)
            r.unshift("..");
        return r;
      }
      function vn() {
        for (var r = "", l = !1, n = arguments.length - 1; n >= -1 && !l; n--) {
          var a = n >= 0 ? arguments[n] : "/";
          if (typeof a != "string")
            throw new TypeError("Arguments to path.resolve must be strings");
          !a || (r = a + "/" + r, l = a.charAt(0) === "/");
        }
        return r = zr(rr(r.split("/"), function(i) {
          return !!i;
        }), !l).join("/"), (l ? "/" : "") + r || ".";
      }
      function tr(r) {
        var l = nr(r), n = ru(r, -1) === "/";
        return r = zr(rr(r.split("/"), function(a) {
          return !!a;
        }), !l).join("/"), !r && !l && (r = "."), r && n && (r += "/"), (l ? "/" : "") + r;
      }
      function nr(r) {
        return r.charAt(0) === "/";
      }
      function Qr() {
        var r = Array.prototype.slice.call(arguments, 0);
        return tr(rr(r, function(l, n) {
          if (typeof l != "string")
            throw new TypeError("Arguments to path.join must be strings");
          return l;
        }).join("/"));
      }
      function Yr(r, l) {
        r = vn(r).substr(1), l = vn(l).substr(1);
        function n(c) {
          for (var C = 0; C < c.length && c[C] === ""; C++)
            ;
          for (var f = c.length - 1; f >= 0 && c[f] === ""; f--)
            ;
          return C > f ? [] : c.slice(C, f - C + 1);
        }
        for (var a = n(r.split("/")), i = n(l.split("/")), e = Math.min(a.length, i.length), t = e, u = 0; u < e; u++)
          if (a[u] !== i[u]) {
            t = u;
            break;
          }
        for (var s = [], u = t; u < a.length; u++)
          s.push("..");
        return s = s.concat(i.slice(t)), s.join("/");
      }
      function Zr(r) {
        var l = xn(r), n = l[0], a = l[1];
        return !n && !a ? "." : (a && (a = a.substr(0, a.length - 1)), n + a);
      }
      function Kr(r, l) {
        var n = xn(r)[2];
        return l && n.substr(-1 * l.length) === l && (n = n.substr(0, n.length - l.length)), n;
      }
      function eu(r) {
        return xn(r)[3];
      }
      function rr(r, l) {
        if (r.filter)
          return r.filter(l);
        for (var n = [], a = 0; a < r.length; a++)
          l(r[a], a, r) && n.push(r[a]);
        return n;
      }
      var tu, xn, ur, ir, nu, ru, ta = Ct({ "node-modules-polyfills:path"() {
        te(), tu = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, xn = function(r) {
          return tu.exec(r).slice(1);
        }, ur = "/", ir = ":", nu = { extname: eu, basename: Kr, dirname: Zr, sep: ur, delimiter: ir, relative: Yr, join: Qr, isAbsolute: nr, normalize: tr, resolve: vn }, ru = "ab".substr(-1) === "b" ? function(r, l, n) {
          return r.substr(l, n);
        } : function(r, l, n) {
          return l < 0 && (l = r.length + l), r.substr(l, n);
        };
      } }), na = Z({ "node-modules-polyfills-commonjs:path"(r, l) {
        te();
        var n = (ta(), gt(Gr));
        if (n && n.default) {
          l.exports = n.default;
          for (let a in n)
            l.exports[a] = n[a];
        } else
          n && (l.exports = n);
      } }), ln = Z({ "src/common/errors.js"(r, l) {
        te();
        var n = class extends Error {
        }, a = class extends Error {
        }, i = class extends Error {
        }, e = class extends Error {
        };
        l.exports = { ConfigError: n, DebugError: a, UndefinedParserError: i, ArgExpansionBailout: e };
      } }), $t = {};
      Mt($t, { __assign: () => Sn, __asyncDelegator: () => ma, __asyncGenerator: () => fa, __asyncValues: () => ga, __await: () => cn, __awaiter: () => oa, __classPrivateFieldGet: () => Ca, __classPrivateFieldSet: () => Fa, __createBinding: () => ca, __decorate: () => ia, __exportStar: () => pa, __extends: () => ra, __generator: () => la, __importDefault: () => Ea, __importStar: () => ha, __makeTemplateObject: () => ya, __metadata: () => sa, __param: () => aa, __read: () => uu, __rest: () => ua, __spread: () => da, __spreadArrays: () => Da, __values: () => ar });
      function ra(r, l) {
        bn(r, l);
        function n() {
          this.constructor = r;
        }
        r.prototype = l === null ? Object.create(l) : (n.prototype = l.prototype, new n());
      }
      function ua(r, l) {
        var n = {};
        for (var a in r)
          Object.prototype.hasOwnProperty.call(r, a) && l.indexOf(a) < 0 && (n[a] = r[a]);
        if (r != null && typeof Object.getOwnPropertySymbols == "function")
          for (var i = 0, a = Object.getOwnPropertySymbols(r); i < a.length; i++)
            l.indexOf(a[i]) < 0 && Object.prototype.propertyIsEnumerable.call(r, a[i]) && (n[a[i]] = r[a[i]]);
        return n;
      }
      function ia(r, l, n, a) {
        var i = arguments.length, e = i < 3 ? l : a === null ? a = Object.getOwnPropertyDescriptor(l, n) : a, t;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          e = Reflect.decorate(r, l, n, a);
        else
          for (var u = r.length - 1; u >= 0; u--)
            (t = r[u]) && (e = (i < 3 ? t(e) : i > 3 ? t(l, n, e) : t(l, n)) || e);
        return i > 3 && e && Object.defineProperty(l, n, e), e;
      }
      function aa(r, l) {
        return function(n, a) {
          l(n, a, r);
        };
      }
      function sa(r, l) {
        if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
          return Reflect.metadata(r, l);
      }
      function oa(r, l, n, a) {
        function i(e) {
          return e instanceof n ? e : new n(function(t) {
            t(e);
          });
        }
        return new (n || (n = Promise))(function(e, t) {
          function u(C) {
            try {
              c(a.next(C));
            } catch (f) {
              t(f);
            }
          }
          function s(C) {
            try {
              c(a.throw(C));
            } catch (f) {
              t(f);
            }
          }
          function c(C) {
            C.done ? e(C.value) : i(C.value).then(u, s);
          }
          c((a = a.apply(r, l || [])).next());
        });
      }
      function la(r, l) {
        var n = { label: 0, sent: function() {
          if (e[0] & 1)
            throw e[1];
          return e[1];
        }, trys: [], ops: [] }, a, i, e, t;
        return t = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (t[Symbol.iterator] = function() {
          return this;
        }), t;
        function u(c) {
          return function(C) {
            return s([c, C]);
          };
        }
        function s(c) {
          if (a)
            throw new TypeError("Generator is already executing.");
          for (; n; )
            try {
              if (a = 1, i && (e = c[0] & 2 ? i.return : c[0] ? i.throw || ((e = i.return) && e.call(i), 0) : i.next) && !(e = e.call(i, c[1])).done)
                return e;
              switch (i = 0, e && (c = [c[0] & 2, e.value]), c[0]) {
                case 0:
                case 1:
                  e = c;
                  break;
                case 4:
                  return n.label++, { value: c[1], done: !1 };
                case 5:
                  n.label++, i = c[1], c = [0];
                  continue;
                case 7:
                  c = n.ops.pop(), n.trys.pop();
                  continue;
                default:
                  if (e = n.trys, !(e = e.length > 0 && e[e.length - 1]) && (c[0] === 6 || c[0] === 2)) {
                    n = 0;
                    continue;
                  }
                  if (c[0] === 3 && (!e || c[1] > e[0] && c[1] < e[3])) {
                    n.label = c[1];
                    break;
                  }
                  if (c[0] === 6 && n.label < e[1]) {
                    n.label = e[1], e = c;
                    break;
                  }
                  if (e && n.label < e[2]) {
                    n.label = e[2], n.ops.push(c);
                    break;
                  }
                  e[2] && n.ops.pop(), n.trys.pop();
                  continue;
              }
              c = l.call(r, n);
            } catch (C) {
              c = [6, C], i = 0;
            } finally {
              a = e = 0;
            }
          if (c[0] & 5)
            throw c[1];
          return { value: c[0] ? c[1] : void 0, done: !0 };
        }
      }
      function ca(r, l, n, a) {
        a === void 0 && (a = n), r[a] = l[n];
      }
      function pa(r, l) {
        for (var n in r)
          n !== "default" && !l.hasOwnProperty(n) && (l[n] = r[n]);
      }
      function ar(r) {
        var l = typeof Symbol == "function" && Symbol.iterator, n = l && r[l], a = 0;
        if (n)
          return n.call(r);
        if (r && typeof r.length == "number")
          return { next: function() {
            return r && a >= r.length && (r = void 0), { value: r && r[a++], done: !r };
          } };
        throw new TypeError(l ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }
      function uu(r, l) {
        var n = typeof Symbol == "function" && r[Symbol.iterator];
        if (!n)
          return r;
        var a = n.call(r), i, e = [], t;
        try {
          for (; (l === void 0 || l-- > 0) && !(i = a.next()).done; )
            e.push(i.value);
        } catch (u) {
          t = { error: u };
        } finally {
          try {
            i && !i.done && (n = a.return) && n.call(a);
          } finally {
            if (t)
              throw t.error;
          }
        }
        return e;
      }
      function da() {
        for (var r = [], l = 0; l < arguments.length; l++)
          r = r.concat(uu(arguments[l]));
        return r;
      }
      function Da() {
        for (var r = 0, l = 0, n = arguments.length; l < n; l++)
          r += arguments[l].length;
        for (var a = Array(r), i = 0, l = 0; l < n; l++)
          for (var e = arguments[l], t = 0, u = e.length; t < u; t++, i++)
            a[i] = e[t];
        return a;
      }
      function cn(r) {
        return this instanceof cn ? (this.v = r, this) : new cn(r);
      }
      function fa(r, l, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var a = n.apply(r, l || []), i, e = [];
        return i = {}, t("next"), t("throw"), t("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function t(h) {
          a[h] && (i[h] = function(p) {
            return new Promise(function(d, g) {
              e.push([h, p, d, g]) > 1 || u(h, p);
            });
          });
        }
        function u(h, p) {
          try {
            s(a[h](p));
          } catch (d) {
            f(e[0][3], d);
          }
        }
        function s(h) {
          h.value instanceof cn ? Promise.resolve(h.value.v).then(c, C) : f(e[0][2], h);
        }
        function c(h) {
          u("next", h);
        }
        function C(h) {
          u("throw", h);
        }
        function f(h, p) {
          h(p), e.shift(), e.length && u(e[0][0], e[0][1]);
        }
      }
      function ma(r) {
        var l, n;
        return l = {}, a("next"), a("throw", function(i) {
          throw i;
        }), a("return"), l[Symbol.iterator] = function() {
          return this;
        }, l;
        function a(i, e) {
          l[i] = r[i] ? function(t) {
            return (n = !n) ? { value: cn(r[i](t)), done: i === "return" } : e ? e(t) : t;
          } : e;
        }
      }
      function ga(r) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var l = r[Symbol.asyncIterator], n;
        return l ? l.call(r) : (r = typeof ar == "function" ? ar(r) : r[Symbol.iterator](), n = {}, a("next"), a("throw"), a("return"), n[Symbol.asyncIterator] = function() {
          return this;
        }, n);
        function a(e) {
          n[e] = r[e] && function(t) {
            return new Promise(function(u, s) {
              t = r[e](t), i(u, s, t.done, t.value);
            });
          };
        }
        function i(e, t, u, s) {
          Promise.resolve(s).then(function(c) {
            e({ value: c, done: u });
          }, t);
        }
      }
      function ya(r, l) {
        return Object.defineProperty ? Object.defineProperty(r, "raw", { value: l }) : r.raw = l, r;
      }
      function ha(r) {
        if (r && r.__esModule)
          return r;
        var l = {};
        if (r != null)
          for (var n in r)
            Object.hasOwnProperty.call(r, n) && (l[n] = r[n]);
        return l.default = r, l;
      }
      function Ea(r) {
        return r && r.__esModule ? r : { default: r };
      }
      function Ca(r, l) {
        if (!l.has(r))
          throw new TypeError("attempted to get private field on non-instance");
        return l.get(r);
      }
      function Fa(r, l, n) {
        if (!l.has(r))
          throw new TypeError("attempted to set private field on non-instance");
        return l.set(r, n), n;
      }
      var bn, Sn, Jt = Ct({ "node_modules/tslib/tslib.es6.js"() {
        te(), bn = function(r, l) {
          return bn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
            n.__proto__ = a;
          } || function(n, a) {
            for (var i in a)
              a.hasOwnProperty(i) && (n[i] = a[i]);
          }, bn(r, l);
        }, Sn = function() {
          return Sn = Object.assign || function(r) {
            for (var l, n = 1, a = arguments.length; n < a; n++) {
              l = arguments[n];
              for (var i in l)
                Object.prototype.hasOwnProperty.call(l, i) && (r[i] = l[i]);
            }
            return r;
          }, Sn.apply(this, arguments);
        };
      } }), iu = Z({ "node_modules/vnopts/lib/descriptors/api.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 }), r.apiDescriptor = { key: (l) => /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(l) ? l : JSON.stringify(l), value(l) {
          if (l === null || typeof l != "object")
            return JSON.stringify(l);
          if (Array.isArray(l))
            return "[".concat(l.map((a) => r.apiDescriptor.value(a)).join(", "), "]");
          let n = Object.keys(l);
          return n.length === 0 ? "{}" : "{ ".concat(n.map((a) => "".concat(r.apiDescriptor.key(a), ": ").concat(r.apiDescriptor.value(l[a]))).join(", "), " }");
        }, pair: (l) => {
          let { key: n, value: a } = l;
          return r.apiDescriptor.value({ [n]: a });
        } };
      } }), Aa = Z({ "node_modules/vnopts/lib/descriptors/index.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = (Jt(), gt($t));
        l.__exportStar(iu(), r);
      } }), Tn = Z({ "scripts/build/shims/chalk.cjs"(r, l) {
        te();
        var n = (a) => a;
        n.grey = n, n.red = n, n.bold = n, n.yellow = n, n.blue = n, n.default = n, l.exports = n;
      } }), au = Z({ "node_modules/vnopts/lib/handlers/deprecated/common.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Tn();
        r.commonDeprecatedHandler = (n, a, i) => {
          let { descriptor: e } = i, t = ["".concat(l.default.yellow(typeof n == "string" ? e.key(n) : e.pair(n)), " is deprecated")];
          return a && t.push("we now treat it as ".concat(l.default.blue(typeof a == "string" ? e.key(a) : e.pair(a)))), t.join("; ") + ".";
        };
      } }), va = Z({ "node_modules/vnopts/lib/handlers/deprecated/index.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = (Jt(), gt($t));
        l.__exportStar(au(), r);
      } }), xa = Z({ "node_modules/vnopts/lib/handlers/invalid/common.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Tn();
        r.commonInvalidHandler = (n, a, i) => ["Invalid ".concat(l.default.red(i.descriptor.key(n)), " value."), "Expected ".concat(l.default.blue(i.schemas[n].expected(i)), ","), "but received ".concat(l.default.red(i.descriptor.value(a)), ".")].join(" ");
      } }), su = Z({ "node_modules/vnopts/lib/handlers/invalid/index.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = (Jt(), gt($t));
        l.__exportStar(xa(), r);
      } }), ba = Z({ "node_modules/vnopts/node_modules/leven/index.js"(r, l) {
        te();
        var n = [], a = [];
        l.exports = function(i, e) {
          if (i === e)
            return 0;
          var t = i;
          i.length > e.length && (i = e, e = t);
          var u = i.length, s = e.length;
          if (u === 0)
            return s;
          if (s === 0)
            return u;
          for (; u > 0 && i.charCodeAt(~-u) === e.charCodeAt(~-s); )
            u--, s--;
          if (u === 0)
            return s;
          for (var c = 0; c < u && i.charCodeAt(c) === e.charCodeAt(c); )
            c++;
          if (u -= c, s -= c, u === 0)
            return s;
          for (var C, f, h, p, d = 0, g = 0; d < u; )
            a[c + d] = i.charCodeAt(c + d), n[d] = ++d;
          for (; g < s; )
            for (C = e.charCodeAt(c + g), h = g++, f = g, d = 0; d < u; d++)
              p = C === a[c + d] ? h : h + 1, h = n[d], f = n[d] = h > f ? p > f ? f + 1 : p : p > h ? h + 1 : p;
          return f;
        };
      } }), ou = Z({ "node_modules/vnopts/lib/handlers/unknown/leven.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Tn(), n = ba();
        r.levenUnknownHandler = (a, i, e) => {
          let { descriptor: t, logger: u, schemas: s } = e, c = ["Ignored unknown option ".concat(l.default.yellow(t.pair({ key: a, value: i })), ".")], C = Object.keys(s).sort().find((f) => n(a, f) < 3);
          C && c.push("Did you mean ".concat(l.default.blue(t.key(C)), "?")), u.warn(c.join(" "));
        };
      } }), Sa = Z({ "node_modules/vnopts/lib/handlers/unknown/index.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = (Jt(), gt($t));
        l.__exportStar(ou(), r);
      } }), Ta = Z({ "node_modules/vnopts/lib/handlers/index.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = (Jt(), gt($t));
        l.__exportStar(va(), r), l.__exportStar(su(), r), l.__exportStar(Sa(), r);
      } }), Ut = Z({ "node_modules/vnopts/lib/schema.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = ["default", "expected", "validate", "deprecated", "forward", "redirect", "overlap", "preprocess", "postprocess"];
        function n(e, t) {
          let u = new e(t), s = Object.create(u);
          for (let c of l)
            c in t && (s[c] = i(t[c], u, a.prototype[c].length));
          return s;
        }
        r.createSchema = n;
        var a = class {
          constructor(e) {
            this.name = e.name;
          }
          static create(e) {
            return n(this, e);
          }
          default(e) {
          }
          expected(e) {
            return "nothing";
          }
          validate(e, t) {
            return !1;
          }
          deprecated(e, t) {
            return !1;
          }
          forward(e, t) {
          }
          redirect(e, t) {
          }
          overlap(e, t, u) {
            return e;
          }
          preprocess(e, t) {
            return e;
          }
          postprocess(e, t) {
            return e;
          }
        };
        r.Schema = a;
        function i(e, t, u) {
          return typeof e == "function" ? function() {
            for (var s = arguments.length, c = new Array(s), C = 0; C < s; C++)
              c[C] = arguments[C];
            return e(...c.slice(0, u - 1), t, ...c.slice(u - 1));
          } : () => e;
        }
      } }), Ba = Z({ "node_modules/vnopts/lib/schemas/alias.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Ut(), n = class extends l.Schema {
          constructor(a) {
            super(a), this._sourceName = a.sourceName;
          }
          expected(a) {
            return a.schemas[this._sourceName].expected(a);
          }
          validate(a, i) {
            return i.schemas[this._sourceName].validate(a, i);
          }
          redirect(a, i) {
            return this._sourceName;
          }
        };
        r.AliasSchema = n;
      } }), wa = Z({ "node_modules/vnopts/lib/schemas/any.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Ut(), n = class extends l.Schema {
          expected() {
            return "anything";
          }
          validate() {
            return !0;
          }
        };
        r.AnySchema = n;
      } }), Na = Z({ "node_modules/vnopts/lib/schemas/array.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = (Jt(), gt($t)), n = Ut(), a = class extends n.Schema {
          constructor(e) {
            var { valueSchema: t, name: u = t.name } = e, s = l.__rest(e, ["valueSchema", "name"]);
            super(Object.assign({}, s, { name: u })), this._valueSchema = t;
          }
          expected(e) {
            return "an array of ".concat(this._valueSchema.expected(e));
          }
          validate(e, t) {
            if (!Array.isArray(e))
              return !1;
            let u = [];
            for (let s of e) {
              let c = t.normalizeValidateResult(this._valueSchema.validate(s, t), s);
              c !== !0 && u.push(c.value);
            }
            return u.length === 0 ? !0 : { value: u };
          }
          deprecated(e, t) {
            let u = [];
            for (let s of e) {
              let c = t.normalizeDeprecatedResult(this._valueSchema.deprecated(s, t), s);
              c !== !1 && u.push(...c.map((C) => {
                let { value: f } = C;
                return { value: [f] };
              }));
            }
            return u;
          }
          forward(e, t) {
            let u = [];
            for (let s of e) {
              let c = t.normalizeForwardResult(this._valueSchema.forward(s, t), s);
              u.push(...c.map(i));
            }
            return u;
          }
          redirect(e, t) {
            let u = [], s = [];
            for (let c of e) {
              let C = t.normalizeRedirectResult(this._valueSchema.redirect(c, t), c);
              "remain" in C && u.push(C.remain), s.push(...C.redirect.map(i));
            }
            return u.length === 0 ? { redirect: s } : { redirect: s, remain: u };
          }
          overlap(e, t) {
            return e.concat(t);
          }
        };
        r.ArraySchema = a;
        function i(e) {
          let { from: t, to: u } = e;
          return { from: [t], to: u };
        }
      } }), ka = Z({ "node_modules/vnopts/lib/schemas/boolean.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Ut(), n = class extends l.Schema {
          expected() {
            return "true or false";
          }
          validate(a) {
            return typeof a == "boolean";
          }
        };
        r.BooleanSchema = n;
      } }), sr = Z({ "node_modules/vnopts/lib/utils.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        function l(p, d) {
          let g = /* @__PURE__ */ Object.create(null);
          for (let w of p) {
            let k = w[d];
            if (g[k])
              throw new Error("Duplicate ".concat(d, " ").concat(JSON.stringify(k)));
            g[k] = w;
          }
          return g;
        }
        r.recordFromArray = l;
        function n(p, d) {
          let g = /* @__PURE__ */ new Map();
          for (let w of p) {
            let k = w[d];
            if (g.has(k))
              throw new Error("Duplicate ".concat(d, " ").concat(JSON.stringify(k)));
            g.set(k, w);
          }
          return g;
        }
        r.mapFromArray = n;
        function a() {
          let p = /* @__PURE__ */ Object.create(null);
          return (d) => {
            let g = JSON.stringify(d);
            return p[g] ? !0 : (p[g] = !0, !1);
          };
        }
        r.createAutoChecklist = a;
        function i(p, d) {
          let g = [], w = [];
          for (let k of p)
            d(k) ? g.push(k) : w.push(k);
          return [g, w];
        }
        r.partition = i;
        function e(p) {
          return p === Math.floor(p);
        }
        r.isInt = e;
        function t(p, d) {
          if (p === d)
            return 0;
          let g = typeof p, w = typeof d, k = ["undefined", "object", "boolean", "number", "string"];
          return g !== w ? k.indexOf(g) - k.indexOf(w) : g !== "string" ? Number(p) - Number(d) : p.localeCompare(d);
        }
        r.comparePrimitive = t;
        function u(p) {
          return p === void 0 ? {} : p;
        }
        r.normalizeDefaultResult = u;
        function s(p, d) {
          return p === !0 ? !0 : p === !1 ? { value: d } : p;
        }
        r.normalizeValidateResult = s;
        function c(p, d) {
          let g = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return p === !1 ? !1 : p === !0 ? g ? !0 : [{ value: d }] : "value" in p ? [p] : p.length === 0 ? !1 : p;
        }
        r.normalizeDeprecatedResult = c;
        function C(p, d) {
          return typeof p == "string" || "key" in p ? { from: d, to: p } : "from" in p ? { from: p.from, to: p.to } : { from: d, to: p.to };
        }
        r.normalizeTransferResult = C;
        function f(p, d) {
          return p === void 0 ? [] : Array.isArray(p) ? p.map((g) => C(g, d)) : [C(p, d)];
        }
        r.normalizeForwardResult = f;
        function h(p, d) {
          let g = f(typeof p == "object" && "redirect" in p ? p.redirect : p, d);
          return g.length === 0 ? { remain: d, redirect: g } : typeof p == "object" && "remain" in p ? { remain: p.remain, redirect: g } : { redirect: g };
        }
        r.normalizeRedirectResult = h;
      } }), ja = Z({ "node_modules/vnopts/lib/schemas/choice.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Ut(), n = sr(), a = class extends l.Schema {
          constructor(i) {
            super(i), this._choices = n.mapFromArray(i.choices.map((e) => e && typeof e == "object" ? e : { value: e }), "value");
          }
          expected(i) {
            let { descriptor: e } = i, t = Array.from(this._choices.keys()).map((c) => this._choices.get(c)).filter((c) => !c.deprecated).map((c) => c.value).sort(n.comparePrimitive).map(e.value), u = t.slice(0, -2), s = t.slice(-2);
            return u.concat(s.join(" or ")).join(", ");
          }
          validate(i) {
            return this._choices.has(i);
          }
          deprecated(i) {
            let e = this._choices.get(i);
            return e && e.deprecated ? { value: i } : !1;
          }
          forward(i) {
            let e = this._choices.get(i);
            return e ? e.forward : void 0;
          }
          redirect(i) {
            let e = this._choices.get(i);
            return e ? e.redirect : void 0;
          }
        };
        r.ChoiceSchema = a;
      } }), lu = Z({ "node_modules/vnopts/lib/schemas/number.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Ut(), n = class extends l.Schema {
          expected() {
            return "a number";
          }
          validate(a, i) {
            return typeof a == "number";
          }
        };
        r.NumberSchema = n;
      } }), Ia = Z({ "node_modules/vnopts/lib/schemas/integer.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = sr(), n = lu(), a = class extends n.NumberSchema {
          expected() {
            return "an integer";
          }
          validate(i, e) {
            return e.normalizeValidateResult(super.validate(i, e), i) === !0 && l.isInt(i);
          }
        };
        r.IntegerSchema = a;
      } }), Pa = Z({ "node_modules/vnopts/lib/schemas/string.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Ut(), n = class extends l.Schema {
          expected() {
            return "a string";
          }
          validate(a) {
            return typeof a == "string";
          }
        };
        r.StringSchema = n;
      } }), La = Z({ "node_modules/vnopts/lib/schemas/index.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = (Jt(), gt($t));
        l.__exportStar(Ba(), r), l.__exportStar(wa(), r), l.__exportStar(Na(), r), l.__exportStar(ka(), r), l.__exportStar(ja(), r), l.__exportStar(Ia(), r), l.__exportStar(lu(), r), l.__exportStar(Pa(), r);
      } }), Oa = Z({ "node_modules/vnopts/lib/defaults.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = iu(), n = au(), a = su(), i = ou();
        r.defaultDescriptor = l.apiDescriptor, r.defaultUnknownHandler = i.levenUnknownHandler, r.defaultInvalidHandler = a.commonInvalidHandler, r.defaultDeprecatedHandler = n.commonDeprecatedHandler;
      } }), Ma = Z({ "node_modules/vnopts/lib/normalize.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Oa(), n = sr();
        r.normalize = (i, e, t) => new a(e, t).normalize(i);
        var a = class {
          constructor(i, e) {
            let { logger: t = console, descriptor: u = l.defaultDescriptor, unknown: s = l.defaultUnknownHandler, invalid: c = l.defaultInvalidHandler, deprecated: C = l.defaultDeprecatedHandler } = e || {};
            this._utils = { descriptor: u, logger: t || { warn: () => {
            } }, schemas: n.recordFromArray(i, "name"), normalizeDefaultResult: n.normalizeDefaultResult, normalizeDeprecatedResult: n.normalizeDeprecatedResult, normalizeForwardResult: n.normalizeForwardResult, normalizeRedirectResult: n.normalizeRedirectResult, normalizeValidateResult: n.normalizeValidateResult }, this._unknownHandler = s, this._invalidHandler = c, this._deprecatedHandler = C, this.cleanHistory();
          }
          cleanHistory() {
            this._hasDeprecationWarned = n.createAutoChecklist();
          }
          normalize(i) {
            let e = {}, t = [i], u = () => {
              for (; t.length !== 0; ) {
                let s = t.shift(), c = this._applyNormalization(s, e);
                t.push(...c);
              }
            };
            u();
            for (let s of Object.keys(this._utils.schemas)) {
              let c = this._utils.schemas[s];
              if (!(s in e)) {
                let C = n.normalizeDefaultResult(c.default(this._utils));
                "value" in C && t.push({ [s]: C.value });
              }
            }
            u();
            for (let s of Object.keys(this._utils.schemas)) {
              let c = this._utils.schemas[s];
              s in e && (e[s] = c.postprocess(e[s], this._utils));
            }
            return e;
          }
          _applyNormalization(i, e) {
            let t = [], [u, s] = n.partition(Object.keys(i), (c) => c in this._utils.schemas);
            for (let c of u) {
              let C = this._utils.schemas[c], f = C.preprocess(i[c], this._utils), h = n.normalizeValidateResult(C.validate(f, this._utils), f);
              if (h !== !0) {
                let { value: w } = h, k = this._invalidHandler(c, w, this._utils);
                throw typeof k == "string" ? new Error(k) : k;
              }
              let p = (w) => {
                let { from: k, to: v } = w;
                t.push(typeof v == "string" ? { [v]: k } : { [v.key]: v.value });
              }, d = (w) => {
                let { value: k, redirectTo: v } = w, x = n.normalizeDeprecatedResult(C.deprecated(k, this._utils), f, !0);
                if (x !== !1)
                  if (x === !0)
                    this._hasDeprecationWarned(c) || this._utils.logger.warn(this._deprecatedHandler(c, v, this._utils));
                  else
                    for (let { value: B } of x) {
                      let I = { key: c, value: B };
                      if (!this._hasDeprecationWarned(I)) {
                        let j = typeof v == "string" ? { key: v, value: B } : v;
                        this._utils.logger.warn(this._deprecatedHandler(I, j, this._utils));
                      }
                    }
              };
              n.normalizeForwardResult(C.forward(f, this._utils), f).forEach(p);
              let g = n.normalizeRedirectResult(C.redirect(f, this._utils), f);
              if (g.redirect.forEach(p), "remain" in g) {
                let w = g.remain;
                e[c] = c in e ? C.overlap(e[c], w, this._utils) : w, d({ value: w });
              }
              for (let { from: w, to: k } of g.redirect)
                d({ value: w, redirectTo: k });
            }
            for (let c of s) {
              let C = i[c], f = this._unknownHandler(c, C, this._utils);
              if (f)
                for (let h of Object.keys(f)) {
                  let p = { [h]: f[h] };
                  h in this._utils.schemas ? t.push(p) : Object.assign(e, p);
                }
            }
            return t;
          }
        };
        r.Normalizer = a;
      } }), _a = Z({ "node_modules/vnopts/lib/index.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = (Jt(), gt($t));
        l.__exportStar(Aa(), r), l.__exportStar(Ta(), r), l.__exportStar(La(), r), l.__exportStar(Ma(), r), l.__exportStar(Ut(), r);
      } }), Ra = Z({ "src/main/options-normalizer.js"(r, l) {
        te();
        var n = _a(), a = It(), i = { key: (h) => h.length === 1 ? "-".concat(h) : "--".concat(h), value: (h) => n.apiDescriptor.value(h), pair: (h) => {
          let { key: p, value: d } = h;
          return d === !1 ? "--no-".concat(p) : d === !0 ? i.key(p) : d === "" ? "".concat(i.key(p), " without an argument") : "".concat(i.key(p), "=").concat(d);
        } }, e = (h) => {
          let { colorsModule: p, levenshteinDistance: d } = h;
          return class extends n.ChoiceSchema {
            constructor(g) {
              let { name: w, flags: k } = g;
              super({ name: w, choices: k }), this._flags = [...k].sort();
            }
            preprocess(g, w) {
              if (typeof g == "string" && g.length > 0 && !this._flags.includes(g)) {
                let k = this._flags.find((v) => d(v, g) < 3);
                if (k)
                  return w.logger.warn(["Unknown flag ".concat(p.yellow(w.descriptor.value(g)), ","), "did you mean ".concat(p.blue(w.descriptor.value(k)), "?")].join(" ")), k;
              }
              return g;
            }
            expected() {
              return "a flag";
            }
          };
        }, t;
        function u(h, p) {
          let { logger: d = !1, isCLI: g = !1, passThrough: w = !1, colorsModule: k = null, levenshteinDistance: v = null } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, x = w ? Array.isArray(w) ? (D, m) => w.includes(D) ? { [D]: m } : void 0 : (D, m) => ({ [D]: m }) : (D, m, A) => {
            let o = A.schemas, F = ze(o, ge);
            return n.levenUnknownHandler(D, m, Object.assign(Object.assign({}, A), {}, { schemas: F }));
          }, B = g ? i : n.apiDescriptor, I = s(p, { isCLI: g, colorsModule: k, levenshteinDistance: v }), j = new n.Normalizer(I, { logger: d, unknown: x, descriptor: B }), P = d !== !1;
          P && t && (j._hasDeprecationWarned = t);
          let E = j.normalize(h);
          return P && (t = j._hasDeprecationWarned), g && E["plugin-search"] === !1 && (E["plugin-search-dir"] = !1), E;
        }
        function s(h, p) {
          let { isCLI: d, colorsModule: g, levenshteinDistance: w } = p, k = [];
          d && k.push(n.AnySchema.create({ name: "_" }));
          for (let v of h)
            k.push(c(v, { isCLI: d, optionInfos: h, colorsModule: g, levenshteinDistance: w })), v.alias && d && k.push(n.AliasSchema.create({ name: v.alias, sourceName: v.name }));
          return k;
        }
        function c(h, p) {
          let { isCLI: d, optionInfos: g, colorsModule: w, levenshteinDistance: k } = p, { name: v } = h;
          if (v === "plugin-search-dir" || v === "pluginSearchDirs")
            return n.AnySchema.create({ name: v, preprocess(j) {
              return j === !1 || (j = Array.isArray(j) ? j : [j]), j;
            }, validate(j) {
              return j === !1 ? !0 : j.every((P) => typeof P == "string");
            }, expected() {
              return "false or paths to plugin search dir";
            } });
          let x = { name: v }, B, I = {};
          switch (h.type) {
            case "int":
              B = n.IntegerSchema, d && (x.preprocess = Number);
              break;
            case "string":
              B = n.StringSchema;
              break;
            case "choice":
              B = n.ChoiceSchema, x.choices = h.choices.map((j) => typeof j == "object" && j.redirect ? Object.assign(Object.assign({}, j), {}, { redirect: { to: { key: h.name, value: j.redirect } } }) : j);
              break;
            case "boolean":
              B = n.BooleanSchema;
              break;
            case "flag":
              B = e({ colorsModule: w, levenshteinDistance: k }), x.flags = g.flatMap((j) => [j.alias, j.description && j.name, j.oppositeDescription && "no-".concat(j.name)].filter(Boolean));
              break;
            case "path":
              B = n.StringSchema;
              break;
            default:
              throw new Error("Unexpected type ".concat(h.type));
          }
          if (h.exception ? x.validate = (j, P, E) => h.exception(j) || P.validate(j, E) : x.validate = (j, P, E) => j === void 0 || P.validate(j, E), h.redirect && (I.redirect = (j) => j ? { to: { key: h.redirect.option, value: h.redirect.value } } : void 0), h.deprecated && (I.deprecated = !0), d && !h.array) {
            let j = x.preprocess || ((P) => P);
            x.preprocess = (P, E, D) => E.preprocess(j(Array.isArray(P) ? a(P) : P), D);
          }
          return h.array ? n.ArraySchema.create(Object.assign(Object.assign(Object.assign({}, d ? { preprocess: (j) => Array.isArray(j) ? j : [j] } : {}), I), {}, { valueSchema: B.create(x) })) : B.create(Object.assign(Object.assign({}, x), I));
        }
        function C(h, p, d) {
          return u(h, p, d);
        }
        function f(h, p, d) {
          return u(h, p, Object.assign({ isCLI: !0 }, d));
        }
        l.exports = { normalizeApiOptions: C, normalizeCliOptions: f };
      } }), wt = Z({ "src/language-js/loc.js"(r, l) {
        te();
        var n = er();
        function a(s, c) {
          let { ignoreDecorators: C } = c || {};
          if (!C) {
            let f = s.declaration && s.declaration.decorators || s.decorators;
            if (n(f))
              return a(f[0]);
          }
          return s.range ? s.range[0] : s.start;
        }
        function i(s) {
          return s.range ? s.range[1] : s.end;
        }
        function e(s, c) {
          let C = a(s);
          return Number.isInteger(C) && C === a(c);
        }
        function t(s, c) {
          let C = i(s);
          return Number.isInteger(C) && C === i(c);
        }
        function u(s, c) {
          return e(s, c) && t(s, c);
        }
        l.exports = { locStart: a, locEnd: i, hasSameLocStart: e, hasSameLoc: u };
      } }), Va = Z({ "src/main/load-parser.js"(r, l) {
        te(), l.exports = () => {
        };
      } }), $a = Z({ "scripts/build/shims/babel-highlight.cjs"(r, l) {
        te();
        var n = Tn(), a = { shouldHighlight: () => !1, getChalk: () => n };
        l.exports = a;
      } }), Ja = Z({ "node_modules/@babel/code-frame/lib/index.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 }), r.codeFrameColumns = t, r.default = u;
        var l = $a(), n = !1;
        function a(s) {
          return { gutter: s.grey, marker: s.red.bold, message: s.red.bold };
        }
        var i = /\r\n|[\n\r\u2028\u2029]/;
        function e(s, c, C) {
          let f = Object.assign({ column: 0, line: -1 }, s.start), h = Object.assign({}, f, s.end), { linesAbove: p = 2, linesBelow: d = 3 } = C || {}, g = f.line, w = f.column, k = h.line, v = h.column, x = Math.max(g - (p + 1), 0), B = Math.min(c.length, k + d);
          g === -1 && (x = 0), k === -1 && (B = c.length);
          let I = k - g, j = {};
          if (I)
            for (let P = 0; P <= I; P++) {
              let E = P + g;
              if (!w)
                j[E] = !0;
              else if (P === 0) {
                let D = c[E - 1].length;
                j[E] = [w, D - w + 1];
              } else if (P === I)
                j[E] = [0, v];
              else {
                let D = c[E - P].length;
                j[E] = [0, D];
              }
            }
          else
            w === v ? w ? j[g] = [w, 0] : j[g] = !0 : j[g] = [w, v - w];
          return { start: x, end: B, markerLines: j };
        }
        function t(s, c) {
          let C = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, f = (C.highlightCode || C.forceColor) && (0, l.shouldHighlight)(C), h = (0, l.getChalk)(C), p = a(h), d = (j, P) => f ? j(P) : P, g = s.split(i), { start: w, end: k, markerLines: v } = e(c, g, C), x = c.start && typeof c.start.column == "number", B = String(k).length, I = (f ? (0, l.default)(s, C) : s).split(i, k).slice(w, k).map((j, P) => {
            let E = w + 1 + P, D = " ".concat(E).slice(-B), m = " ".concat(D, " |"), A = v[E], o = !v[E + 1];
            if (A) {
              let F = "";
              if (Array.isArray(A)) {
                let y = j.slice(0, Math.max(A[0] - 1, 0)).replace(/[^\t]/g, " "), T = A[1] || 1;
                F = [`
 `, d(p.gutter, m.replace(/\d/g, " ")), " ", y, d(p.marker, "^").repeat(T)].join(""), o && C.message && (F += " " + d(p.message, C.message));
              }
              return [d(p.marker, ">"), d(p.gutter, m), j.length > 0 ? " ".concat(j) : "", F].join("");
            } else
              return " ".concat(d(p.gutter, m)).concat(j.length > 0 ? " ".concat(j) : "");
          }).join(`
`);
          return C.message && !x && (I = "".concat(" ".repeat(B + 1)).concat(C.message, `
`).concat(I)), f ? h.reset(I) : I;
        }
        function u(s, c, C) {
          let f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          if (!n) {
            n = !0;
            let h = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
            if (St.emitWarning)
              St.emitWarning(h, "DeprecationWarning");
            else {
              let p = new Error(h);
              p.name = "DeprecationWarning", console.warn(new Error(h));
            }
          }
          return C = Math.max(C, 0), t(s, { start: { column: C, line: c } }, f);
        }
      } }), or = Z({ "src/main/parser.js"(r, l) {
        te();
        var { ConfigError: n } = ln(), a = wt();
        Va();
        var { locStart: i, locEnd: e } = a, t = Object.getOwnPropertyNames, u = Object.getOwnPropertyDescriptor;
        function s(f) {
          let h = {};
          for (let p of f.plugins)
            if (p.parsers)
              for (let d of t(p.parsers))
                Object.defineProperty(h, d, u(p.parsers, d));
          return h;
        }
        function c(f) {
          let h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : s(f);
          if (typeof f.parser == "function")
            return { parse: f.parser, astFormat: "estree", locStart: i, locEnd: e };
          if (typeof f.parser == "string") {
            if (Object.prototype.hasOwnProperty.call(h, f.parser))
              return h[f.parser];
            throw new n(`Couldn't resolve parser "`.concat(f.parser, '". Parsers must be explicitly added to the standalone bundle.'));
          }
        }
        function C(f, h) {
          let p = s(h), d = Object.defineProperties({}, Object.fromEntries(Object.keys(p).map((w) => [w, { enumerable: !0, get() {
            return p[w].parse;
          } }]))), g = c(h, p);
          try {
            return g.preprocess && (f = g.preprocess(f, h)), { text: f, ast: g.parse(f, d, h) };
          } catch (w) {
            let { loc: k } = w;
            if (k) {
              let { codeFrameColumns: v } = Ja();
              throw w.codeFrame = v(f, k, { highlightCode: !0 }), w.message += `
` + w.codeFrame, w;
            }
            throw w.stack;
          }
        }
        l.exports = { parse: C, resolveParser: c };
      } }), cu = Z({ "src/main/options.js"(r, l) {
        te();
        var n = na(), { UndefinedParserError: a } = ln(), { getSupportInfo: i } = Kn(), e = Ra(), { resolveParser: t } = or(), u = { astFormat: "estree", printer: {}, originalText: void 0, locStart: null, locEnd: null };
        function s(f) {
          let h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, p = Object.assign({}, f), d = i({ plugins: f.plugins, showUnreleased: !0, showDeprecated: !0 }).options, g = Object.assign(Object.assign({}, u), Object.fromEntries(d.filter((B) => B.default !== void 0).map((B) => [B.name, B.default])));
          if (!p.parser) {
            if (!p.filepath)
              (h.logger || console).warn("No parser and no filepath given, using 'babel' the parser now but this will throw an error in the future. Please specify a parser or a filepath so one can be inferred."), p.parser = "babel";
            else if (p.parser = C(p.filepath, p.plugins), !p.parser)
              throw new a("No parser could be inferred for file: ".concat(p.filepath));
          }
          let w = t(e.normalizeApiOptions(p, [d.find((B) => B.name === "parser")], { passThrough: !0, logger: !1 }));
          p.astFormat = w.astFormat, p.locEnd = w.locEnd, p.locStart = w.locStart;
          let k = c(p);
          p.printer = k.printers[p.astFormat];
          let v = Object.fromEntries(d.filter((B) => B.pluginDefaults && B.pluginDefaults[k.name] !== void 0).map((B) => [B.name, B.pluginDefaults[k.name]])), x = Object.assign(Object.assign({}, g), v);
          for (let [B, I] of Object.entries(x))
            (p[B] === null || p[B] === void 0) && (p[B] = I);
          return p.parser === "json" && (p.trailingComma = "none"), e.normalizeApiOptions(p, d, Object.assign({ passThrough: Object.keys(u) }, h));
        }
        function c(f) {
          let { astFormat: h } = f;
          if (!h)
            throw new Error("getPlugin() requires astFormat to be set");
          let p = f.plugins.find((d) => d.printers && d.printers[h]);
          if (!p)
            throw new Error(`Couldn't find plugin for AST format "`.concat(h, '"'));
          return p;
        }
        function C(f, h) {
          let p = n.basename(f).toLowerCase(), d = i({ plugins: h }).languages.filter((g) => g.since !== null).find((g) => g.extensions && g.extensions.some((w) => p.endsWith(w)) || g.filenames && g.filenames.some((w) => w.toLowerCase() === p));
          return d && d.parsers[0];
        }
        l.exports = { normalize: s, hiddenDefaults: u, inferParser: C };
      } }), Ua = Z({ "src/main/massage-ast.js"(r, l) {
        te();
        function n(a, i, e) {
          if (Array.isArray(a))
            return a.map((c) => n(c, i, e)).filter(Boolean);
          if (!a || typeof a != "object")
            return a;
          let t = i.printer.massageAstNode, u;
          t && t.ignoredProperties ? u = t.ignoredProperties : u = /* @__PURE__ */ new Set();
          let s = {};
          for (let [c, C] of Object.entries(a))
            !u.has(c) && typeof C != "function" && (s[c] = n(C, i, a));
          if (t) {
            let c = t(a, s, e);
            if (c === null)
              return;
            if (c)
              return c;
          }
          return s;
        }
        l.exports = n;
      } }), pn = Z({ "scripts/build/shims/assert.cjs"(r, l) {
        te();
        var n = () => {
        };
        n.ok = n, n.strictEqual = n, l.exports = n;
      } }), vt = Z({ "src/main/comments.js"(r, l) {
        te();
        var n = pn(), { builders: { line: a, hardline: i, breakParent: e, indent: t, lineSuffix: u, join: s, cursor: c } } = Ye(), { hasNewline: C, skipNewline: f, skipSpaces: h, isPreviousLineEmpty: p, addLeadingComment: d, addDanglingComment: g, addTrailingComment: w } = ot(), k = /* @__PURE__ */ new WeakMap();
        function v(L, R, O) {
          if (!L)
            return;
          let { printer: U, locStart: V, locEnd: _ } = R;
          if (O) {
            if (U.canAttachComment && U.canAttachComment(L)) {
              let H;
              for (H = O.length - 1; H >= 0 && !(V(O[H]) <= V(L) && _(O[H]) <= _(L)); --H)
                ;
              O.splice(H + 1, 0, L);
              return;
            }
          } else if (k.has(L))
            return k.get(L);
          let Y = U.getCommentChildNodes && U.getCommentChildNodes(L, R) || typeof L == "object" && Object.entries(L).filter((H) => {
            let [$] = H;
            return $ !== "enclosingNode" && $ !== "precedingNode" && $ !== "followingNode" && $ !== "tokens" && $ !== "comments" && $ !== "parent";
          }).map((H) => {
            let [, $] = H;
            return $;
          });
          if (Y) {
            O || (O = [], k.set(L, O));
            for (let H of Y)
              v(H, R, O);
            return O;
          }
        }
        function x(L, R, O, U) {
          let { locStart: V, locEnd: _ } = O, Y = V(R), H = _(R), $ = v(L, O), K, ne, ee = 0, pe = $.length;
          for (; ee < pe; ) {
            let J = ee + pe >> 1, W = $[J], se = V(W), fe = _(W);
            if (se <= Y && H <= fe)
              return x(W, R, O, W);
            if (fe <= Y) {
              K = W, ee = J + 1;
              continue;
            }
            if (H <= se) {
              ne = W, pe = J;
              continue;
            }
            throw new Error("Comment location overlaps with node location");
          }
          if (U && U.type === "TemplateLiteral") {
            let { quasis: J } = U, W = A(J, R, O);
            K && A(J, K, O) !== W && (K = null), ne && A(J, ne, O) !== W && (ne = null);
          }
          return { enclosingNode: U, precedingNode: K, followingNode: ne };
        }
        var B = () => !1;
        function I(L, R, O, U) {
          if (!Array.isArray(L))
            return;
          let V = [], { locStart: _, locEnd: Y, printer: { handleComments: H = {} } } = U, { avoidAstMutation: $, ownLine: K = B, endOfLine: ne = B, remaining: ee = B } = H, pe = L.map((J, W) => Object.assign(Object.assign({}, x(R, J, U)), {}, { comment: J, text: O, options: U, ast: R, isLastComment: L.length - 1 === W }));
          for (let [J, W] of pe.entries()) {
            let { comment: se, precedingNode: fe, enclosingNode: ae, followingNode: q, text: X, options: G, ast: le, isLastComment: Ee } = W;
            if (G.parser === "json" || G.parser === "json5" || G.parser === "__js_expression" || G.parser === "__vue_expression" || G.parser === "__vue_ts_expression") {
              if (_(se) - _(le) <= 0) {
                d(le, se);
                continue;
              }
              if (Y(se) - Y(le) >= 0) {
                w(le, se);
                continue;
              }
            }
            let Te;
            if ($ ? Te = [W] : (se.enclosingNode = ae, se.precedingNode = fe, se.followingNode = q, Te = [se, X, G, le, Ee]), P(X, G, pe, J))
              se.placement = "ownLine", K(...Te) || (q ? d(q, se) : fe ? w(fe, se) : g(ae || le, se));
            else if (E(X, G, pe, J))
              se.placement = "endOfLine", ne(...Te) || (fe ? w(fe, se) : q ? d(q, se) : g(ae || le, se));
            else if (se.placement = "remaining", !ee(...Te))
              if (fe && q) {
                let $e = V.length;
                $e > 0 && V[$e - 1].followingNode !== q && D(V, X, G), V.push(W);
              } else
                fe ? w(fe, se) : q ? d(q, se) : g(ae || le, se);
          }
          if (D(V, O, U), !$)
            for (let J of L)
              delete J.precedingNode, delete J.enclosingNode, delete J.followingNode;
        }
        var j = (L) => !/[\S\n\u2028\u2029]/.test(L);
        function P(L, R, O, U) {
          let { comment: V, precedingNode: _ } = O[U], { locStart: Y, locEnd: H } = R, $ = Y(V);
          if (_)
            for (let K = U - 1; K >= 0; K--) {
              let { comment: ne, precedingNode: ee } = O[K];
              if (ee !== _ || !j(L.slice(H(ne), $)))
                break;
              $ = Y(ne);
            }
          return C(L, $, { backwards: !0 });
        }
        function E(L, R, O, U) {
          let { comment: V, followingNode: _ } = O[U], { locStart: Y, locEnd: H } = R, $ = H(V);
          if (_)
            for (let K = U + 1; K < O.length; K++) {
              let { comment: ne, followingNode: ee } = O[K];
              if (ee !== _ || !j(L.slice($, Y(ne))))
                break;
              $ = H(ne);
            }
          return C(L, $);
        }
        function D(L, R, O) {
          let U = L.length;
          if (U === 0)
            return;
          let { precedingNode: V, followingNode: _, enclosingNode: Y } = L[0], H = O.printer.getGapRegex && O.printer.getGapRegex(Y) || /^[\s(]*$/, $ = O.locStart(_), K;
          for (K = U; K > 0; --K) {
            let { comment: ne, precedingNode: ee, followingNode: pe } = L[K - 1];
            n.strictEqual(ee, V), n.strictEqual(pe, _);
            let J = R.slice(O.locEnd(ne), $);
            if (H.test(J))
              $ = O.locStart(ne);
            else
              break;
          }
          for (let [ne, { comment: ee }] of L.entries())
            ne < K ? w(V, ee) : d(_, ee);
          for (let ne of [V, _])
            ne.comments && ne.comments.length > 1 && ne.comments.sort((ee, pe) => O.locStart(ee) - O.locStart(pe));
          L.length = 0;
        }
        function m(L, R) {
          let O = L.getValue();
          return O.printed = !0, R.printer.printComment(L, R);
        }
        function A(L, R, O) {
          let U = O.locStart(R) - 1;
          for (let V = 1; V < L.length; ++V)
            if (U < O.locStart(L[V]))
              return V - 1;
          return 0;
        }
        function o(L, R) {
          let O = L.getValue(), U = [m(L, R)], { printer: V, originalText: _, locStart: Y, locEnd: H } = R;
          if (V.isBlockComment && V.isBlockComment(O)) {
            let K = C(_, H(O)) ? C(_, Y(O), { backwards: !0 }) ? i : a : " ";
            U.push(K);
          } else
            U.push(i);
          let $ = f(_, h(_, H(O)));
          return $ !== !1 && C(_, $) && U.push(i), U;
        }
        function F(L, R) {
          let O = L.getValue(), U = m(L, R), { printer: V, originalText: _, locStart: Y } = R, H = V.isBlockComment && V.isBlockComment(O);
          if (C(_, Y(O), { backwards: !0 })) {
            let K = p(_, O, Y);
            return u([i, K ? i : "", U]);
          }
          let $ = [" ", U];
          return H || ($ = [u($), e]), $;
        }
        function y(L, R, O, U) {
          let V = [], _ = L.getValue();
          return !_ || !_.comments || (L.each(() => {
            let Y = L.getValue();
            !Y.leading && !Y.trailing && (!U || U(Y)) && V.push(m(L, R));
          }, "comments"), V.length === 0) ? "" : O ? s(i, V) : t([i, s(i, V)]);
        }
        function T(L, R, O) {
          let U = L.getValue();
          if (!U)
            return {};
          let V = U.comments || [];
          O && (V = V.filter(($) => !O.has($)));
          let _ = U === R.cursorNode;
          if (V.length === 0) {
            let $ = _ ? c : "";
            return { leading: $, trailing: $ };
          }
          let Y = [], H = [];
          return L.each(() => {
            let $ = L.getValue();
            if (O && O.has($))
              return;
            let { leading: K, trailing: ne } = $;
            K ? Y.push(o(L, R)) : ne && H.push(F(L, R));
          }, "comments"), _ && (Y.unshift(c), H.push(c)), { leading: Y, trailing: H };
        }
        function b(L, R, O, U) {
          let { leading: V, trailing: _ } = T(L, O, U);
          return !V && !_ ? R : [V, R, _];
        }
        function S(L) {
          if (L)
            for (let R of L) {
              if (!R.printed)
                throw new Error('Comment "' + R.value.trim() + '" was not printed. Please report this error!');
              delete R.printed;
            }
        }
        l.exports = { attach: I, printComments: b, printCommentsSeparately: T, printDanglingComments: y, getSortedChildNodes: v, ensureAllCommentsPrinted: S };
      } }), Ha = Z({ "src/common/ast-path.js"(r, l) {
        te();
        var n = It();
        function a(t, u) {
          let s = i(t.stack, u);
          return s === -1 ? null : t.stack[s];
        }
        function i(t, u) {
          for (let s = t.length - 1; s >= 0; s -= 2) {
            let c = t[s];
            if (c && !Array.isArray(c) && --u < 0)
              return s;
          }
          return -1;
        }
        var e = class {
          constructor(t) {
            this.stack = [t];
          }
          getName() {
            let { stack: t } = this, { length: u } = t;
            return u > 1 ? t[u - 2] : null;
          }
          getValue() {
            return n(this.stack);
          }
          getNode() {
            let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
            return a(this, t);
          }
          getParentNode() {
            let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
            return a(this, t + 1);
          }
          call(t) {
            let { stack: u } = this, { length: s } = u, c = n(u);
            for (var C = arguments.length, f = new Array(C > 1 ? C - 1 : 0), h = 1; h < C; h++)
              f[h - 1] = arguments[h];
            for (let d of f)
              c = c[d], u.push(d, c);
            let p = t(this);
            return u.length = s, p;
          }
          callParent(t) {
            let u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, s = i(this.stack, u + 1), c = this.stack.splice(s + 1), C = t(this);
            return this.stack.push(...c), C;
          }
          each(t) {
            let { stack: u } = this, { length: s } = u, c = n(u);
            for (var C = arguments.length, f = new Array(C > 1 ? C - 1 : 0), h = 1; h < C; h++)
              f[h - 1] = arguments[h];
            for (let p of f)
              c = c[p], u.push(p, c);
            for (let p = 0; p < c.length; ++p)
              u.push(p, c[p]), t(this, p, c), u.length -= 2;
            u.length = s;
          }
          map(t) {
            let u = [];
            for (var s = arguments.length, c = new Array(s > 1 ? s - 1 : 0), C = 1; C < s; C++)
              c[C - 1] = arguments[C];
            return this.each((f, h, p) => {
              u[h] = t(f, h, p);
            }, ...c), u;
          }
          try(t) {
            let { stack: u } = this, s = [...u];
            try {
              return t();
            } finally {
              u.length = 0, u.push(...s);
            }
          }
          match() {
            let t = this.stack.length - 1, u = null, s = this.stack[t--];
            for (var c = arguments.length, C = new Array(c), f = 0; f < c; f++)
              C[f] = arguments[f];
            for (let h of C) {
              if (s === void 0)
                return !1;
              let p = null;
              if (typeof u == "number" && (p = u, u = this.stack[t--], s = this.stack[t--]), h && !h(s, u, p))
                return !1;
              u = this.stack[t--], s = this.stack[t--];
            }
            return !0;
          }
          findAncestor(t) {
            let u = this.stack.length - 1, s = null, c = this.stack[u--];
            for (; c; ) {
              let C = null;
              if (typeof s == "number" && (C = s, s = this.stack[u--], c = this.stack[u--]), s !== null && t(c, s, C))
                return c;
              s = this.stack[u--], c = this.stack[u--];
            }
          }
        };
        l.exports = e;
      } }), qa = Z({ "src/main/multiparser.js"(r, l) {
        te();
        var { utils: { stripTrailingHardline: n } } = Ye(), { normalize: a } = cu(), i = vt();
        function e(u, s, c, C) {
          if (c.printer.embed && c.embeddedLanguageFormatting === "auto")
            return c.printer.embed(u, s, (f, h, p) => t(f, h, c, C, p), c);
        }
        function t(u, s, c, C) {
          let { stripTrailingHardline: f = !1 } = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {}, h = a(Object.assign(Object.assign(Object.assign({}, c), s), {}, { parentParser: c.parser, originalText: u }), { passThrough: !0 }), p = or().parse(u, h), { ast: d } = p;
          u = p.text;
          let g = d.comments;
          delete d.comments, i.attach(g, d, u, h), h[Symbol.for("comments")] = g || [], h[Symbol.for("tokens")] = d.tokens || [];
          let w = C(d, h);
          return i.ensureAllCommentsPrinted(g), f ? typeof w == "string" ? w.replace(/(?:\r?\n)*$/, "") : n(w) : w;
        }
        l.exports = { printSubtree: e };
      } }), Wa = Z({ "src/main/ast-to-doc.js"(r, l) {
        te();
        var n = Ha(), { builders: { hardline: a, addAlignmentToDoc: i }, utils: { propagateBreaks: e } } = Ye(), { printComments: t } = vt(), u = qa();
        function s(f, h) {
          let p = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, { printer: d } = h;
          d.preprocess && (f = d.preprocess(f, h));
          let g = /* @__PURE__ */ new Map(), w = new n(f), k = v();
          return p > 0 && (k = i([a, k], p, h.tabWidth)), e(k), k;
          function v(B, I) {
            return B === void 0 || B === w ? x(I) : Array.isArray(B) ? w.call(() => x(I), ...B) : w.call(() => x(I), B);
          }
          function x(B) {
            let I = w.getValue(), j = I && typeof I == "object" && B === void 0;
            if (j && g.has(I))
              return g.get(I);
            let P = C(w, h, v, B);
            return j && g.set(I, P), P;
          }
        }
        function c(f, h) {
          let { originalText: p, [Symbol.for("comments")]: d, locStart: g, locEnd: w } = h, k = g(f), v = w(f), x = /* @__PURE__ */ new Set();
          for (let B of d)
            g(B) >= k && w(B) <= v && (B.printed = !0, x.add(B));
          return { doc: p.slice(k, v), printedComments: x };
        }
        function C(f, h, p, d) {
          let g = f.getValue(), { printer: w } = h, k, v;
          if (w.hasPrettierIgnore && w.hasPrettierIgnore(f))
            ({ doc: k, printedComments: v } = c(g, h));
          else {
            if (g)
              try {
                k = u.printSubtree(f, p, h, s);
              } catch (x) {
                if (globalThis.PRETTIER_DEBUG)
                  throw x;
              }
            k || (k = w.print(f, h, p, d));
          }
          return (!w.willPrintOwnComments || !w.willPrintOwnComments(f, h)) && (k = t(f, k, h, v)), k;
        }
        l.exports = s;
      } }), Xa = Z({ "src/main/range-util.js"(r, l) {
        te();
        var n = pn(), a = vt(), i = (d) => {
          let { parser: g } = d;
          return g === "json" || g === "json5" || g === "json-stringify";
        };
        function e(d, g) {
          let w = [d.node, ...d.parentNodes], k = /* @__PURE__ */ new Set([g.node, ...g.parentNodes]);
          return w.find((v) => C.has(v.type) && k.has(v));
        }
        function t(d) {
          let g = d.length - 1;
          for (; ; ) {
            let w = d[g];
            if (w && (w.type === "Program" || w.type === "File"))
              g--;
            else
              break;
          }
          return d.slice(0, g + 1);
        }
        function u(d, g, w) {
          let { locStart: k, locEnd: v } = w, x = d.node, B = g.node;
          if (x === B)
            return { startNode: x, endNode: B };
          let I = k(d.node);
          for (let P of t(g.parentNodes))
            if (k(P) >= I)
              B = P;
            else
              break;
          let j = v(g.node);
          for (let P of t(d.parentNodes))
            if (v(P) <= j)
              x = P;
            else
              break;
          return { startNode: x, endNode: B };
        }
        function s(d, g, w, k) {
          let v = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [], x = arguments.length > 5 ? arguments[5] : void 0, { locStart: B, locEnd: I } = w, j = B(d), P = I(d);
          if (!(g > P || g < j || x === "rangeEnd" && g === j || x === "rangeStart" && g === P)) {
            for (let E of a.getSortedChildNodes(d, w)) {
              let D = s(E, g, w, k, [d, ...v], x);
              if (D)
                return D;
            }
            if (!k || k(d, v[0]))
              return { node: d, parentNodes: v };
          }
        }
        function c(d, g) {
          return g !== "DeclareExportDeclaration" && d !== "TypeParameterDeclaration" && (d === "Directive" || d === "TypeAlias" || d === "TSExportAssignment" || d.startsWith("Declare") || d.startsWith("TSDeclare") || d.endsWith("Statement") || d.endsWith("Declaration"));
        }
        var C = /* @__PURE__ */ new Set(["ObjectExpression", "ArrayExpression", "StringLiteral", "NumericLiteral", "BooleanLiteral", "NullLiteral", "UnaryExpression", "TemplateLiteral"]), f = /* @__PURE__ */ new Set(["OperationDefinition", "FragmentDefinition", "VariableDefinition", "TypeExtensionDefinition", "ObjectTypeDefinition", "FieldDefinition", "DirectiveDefinition", "EnumTypeDefinition", "EnumValueDefinition", "InputValueDefinition", "InputObjectTypeDefinition", "SchemaDefinition", "OperationTypeDefinition", "InterfaceTypeDefinition", "UnionTypeDefinition", "ScalarTypeDefinition"]);
        function h(d, g, w) {
          if (!g)
            return !1;
          switch (d.parser) {
            case "flow":
            case "babel":
            case "babel-flow":
            case "babel-ts":
            case "typescript":
            case "acorn":
            case "espree":
            case "meriyah":
            case "__babel_estree":
              return c(g.type, w && w.type);
            case "json":
            case "json5":
            case "json-stringify":
              return C.has(g.type);
            case "graphql":
              return f.has(g.kind);
            case "vue":
              return g.tag !== "root";
          }
          return !1;
        }
        function p(d, g, w) {
          let { rangeStart: k, rangeEnd: v, locStart: x, locEnd: B } = g;
          n.ok(v > k);
          let I = d.slice(k, v).search(/\S/), j = I === -1;
          if (!j)
            for (k += I; v > k && !/\S/.test(d[v - 1]); --v)
              ;
          let P = s(w, k, g, (A, o) => h(g, A, o), [], "rangeStart"), E = j ? P : s(w, v, g, (A) => h(g, A), [], "rangeEnd");
          if (!P || !E)
            return { rangeStart: 0, rangeEnd: 0 };
          let D, m;
          if (i(g)) {
            let A = e(P, E);
            D = A, m = A;
          } else
            ({ startNode: D, endNode: m } = u(P, E, g));
          return { rangeStart: Math.min(x(D), x(m)), rangeEnd: Math.max(B(D), B(m)) };
        }
        l.exports = { calculateRange: p, findNodeAtOffset: s };
      } }), Ga = Z({ "src/main/core.js"(r, l) {
        te();
        var { diffArrays: n } = Fn(), { printer: { printDocToString: a }, debug: { printDocToDebug: i } } = Ye(), { getAlignmentSize: e } = ot(), { guessEndOfLine: t, convertEndOfLineToChars: u, countEndOfLineChars: s, normalizeEndOfLine: c } = Qn(), C = cu().normalize, f = Ua(), h = vt(), p = or(), d = Wa(), g = Xa(), w = "\uFEFF", k = Symbol("cursor");
        function v(m, A, o) {
          let F = A.comments;
          return F && (delete A.comments, h.attach(F, A, m, o)), o[Symbol.for("comments")] = F || [], o[Symbol.for("tokens")] = A.tokens || [], o.originalText = m, F;
        }
        function x(m, A) {
          let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          if (!m || m.trim().length === 0)
            return { formatted: "", cursorOffset: -1, comments: [] };
          let { ast: F, text: y } = p.parse(m, A);
          if (A.cursorOffset >= 0) {
            let L = g.findNodeAtOffset(F, A.cursorOffset, A);
            L && L.node && (A.cursorNode = L.node);
          }
          let T = v(y, F, A), b = d(F, A, o), S = a(b, A);
          if (h.ensureAllCommentsPrinted(T), o > 0) {
            let L = S.formatted.trim();
            S.cursorNodeStart !== void 0 && (S.cursorNodeStart -= S.formatted.indexOf(L)), S.formatted = L + u(A.endOfLine);
          }
          if (A.cursorOffset >= 0) {
            let L, R, O, U, V;
            if (A.cursorNode && S.cursorNodeText ? (L = A.locStart(A.cursorNode), R = y.slice(L, A.locEnd(A.cursorNode)), O = A.cursorOffset - L, U = S.cursorNodeStart, V = S.cursorNodeText) : (L = 0, R = y, O = A.cursorOffset, U = 0, V = S.formatted), R === V)
              return { formatted: S.formatted, cursorOffset: U + O, comments: T };
            let _ = [...R];
            _.splice(O, 0, k);
            let Y = [...V], H = n(_, Y), $ = U;
            for (let K of H)
              if (K.removed) {
                if (K.value.includes(k))
                  break;
              } else
                $ += K.count;
            return { formatted: S.formatted, cursorOffset: $, comments: T };
          }
          return { formatted: S.formatted, cursorOffset: -1, comments: T };
        }
        function B(m, A) {
          let { ast: o, text: F } = p.parse(m, A), { rangeStart: y, rangeEnd: T } = g.calculateRange(F, A, o), b = F.slice(y, T), S = Math.min(y, F.lastIndexOf(`
`, y) + 1), L = F.slice(S, y).match(/^\s*/)[0], R = e(L, A.tabWidth), O = x(b, Object.assign(Object.assign({}, A), {}, { rangeStart: 0, rangeEnd: Number.POSITIVE_INFINITY, cursorOffset: A.cursorOffset > y && A.cursorOffset <= T ? A.cursorOffset - y : -1, endOfLine: "lf" }), R), U = O.formatted.trimEnd(), { cursorOffset: V } = A;
          V > T ? V += U.length - b.length : O.cursorOffset >= 0 && (V = O.cursorOffset + y);
          let _ = F.slice(0, y) + U + F.slice(T);
          if (A.endOfLine !== "lf") {
            let Y = u(A.endOfLine);
            V >= 0 && Y === `\r
` && (V += s(_.slice(0, V), `
`)), _ = _.replace(/\n/g, Y);
          }
          return { formatted: _, cursorOffset: V, comments: O.comments };
        }
        function I(m, A, o) {
          return typeof A != "number" || Number.isNaN(A) || A < 0 || A > m.length ? o : A;
        }
        function j(m, A) {
          let { cursorOffset: o, rangeStart: F, rangeEnd: y } = A;
          return o = I(m, o, -1), F = I(m, F, 0), y = I(m, y, m.length), Object.assign(Object.assign({}, A), {}, { cursorOffset: o, rangeStart: F, rangeEnd: y });
        }
        function P(m, A) {
          let { cursorOffset: o, rangeStart: F, rangeEnd: y, endOfLine: T } = j(m, A), b = m.charAt(0) === w;
          if (b && (m = m.slice(1), o--, F--, y--), T === "auto" && (T = t(m)), m.includes("\r")) {
            let S = (L) => s(m.slice(0, Math.max(L, 0)), `\r
`);
            o -= S(o), F -= S(F), y -= S(y), m = c(m);
          }
          return { hasBOM: b, text: m, options: j(m, Object.assign(Object.assign({}, A), {}, { cursorOffset: o, rangeStart: F, rangeEnd: y, endOfLine: T })) };
        }
        function E(m, A) {
          let o = p.resolveParser(A);
          return !o.hasPragma || o.hasPragma(m);
        }
        function D(m, A) {
          let { hasBOM: o, text: F, options: y } = P(m, C(A));
          if (y.rangeStart >= y.rangeEnd && F !== "" || y.requirePragma && !E(F, y))
            return { formatted: m, cursorOffset: A.cursorOffset, comments: [] };
          let T;
          return y.rangeStart > 0 || y.rangeEnd < F.length ? T = B(F, y) : (!y.requirePragma && y.insertPragma && y.printer.insertPragma && !E(F, y) && (F = y.printer.insertPragma(F)), T = x(F, y)), o && (T.formatted = w + T.formatted, T.cursorOffset >= 0 && T.cursorOffset++), T;
        }
        l.exports = { formatWithCursor: D, parse(m, A, o) {
          let { text: F, options: y } = P(m, C(A)), T = p.parse(F, y);
          return o && (T.ast = f(T.ast, y)), T;
        }, formatAST(m, A) {
          A = C(A);
          let o = d(m, A);
          return a(o, A);
        }, formatDoc(m, A) {
          return D(i(m), Object.assign(Object.assign({}, A), {}, { parser: "__js_expression" })).formatted;
        }, printToDoc(m, A) {
          A = C(A);
          let { ast: o, text: F } = p.parse(m, A);
          return v(F, o, A), d(o, A);
        }, printDocToString(m, A) {
          return a(m, C(A));
        } };
      } }), za = Z({ "src/common/util-shared.js"(r, l) {
        te();
        var { getMaxContinuousCount: n, getStringWidth: a, getAlignmentSize: i, getIndentSize: e, skip: t, skipWhitespace: u, skipSpaces: s, skipNewline: c, skipToLineEnd: C, skipEverythingButNewLine: f, skipInlineComment: h, skipTrailingComment: p, hasNewline: d, hasNewlineInRange: g, hasSpaces: w, isNextLineEmpty: k, isNextLineEmptyAfterIndex: v, isPreviousLineEmpty: x, getNextNonSpaceNonCommentCharacterIndex: B, makeString: I, addLeadingComment: j, addDanglingComment: P, addTrailingComment: E } = ot();
        l.exports = { getMaxContinuousCount: n, getStringWidth: a, getAlignmentSize: i, getIndentSize: e, skip: t, skipWhitespace: u, skipSpaces: s, skipNewline: c, skipToLineEnd: C, skipEverythingButNewLine: f, skipInlineComment: h, skipTrailingComment: p, hasNewline: d, hasNewlineInRange: g, hasSpaces: w, isNextLineEmpty: k, isNextLineEmptyAfterIndex: v, isPreviousLineEmpty: x, getNextNonSpaceNonCommentCharacterIndex: B, makeString: I, addLeadingComment: j, addDanglingComment: P, addTrailingComment: E };
      } }), qt = Z({ "src/utils/create-language.js"(r, l) {
        te(), l.exports = function(n, a) {
          let { languageId: i } = n, e = ze(n, Fe);
          return Object.assign(Object.assign({ linguistLanguageId: i }, e), a(n));
        };
      } }), Qa = Z({ "node_modules/esutils/lib/ast.js"(r, l) {
        te(), function() {
          function n(s) {
            if (s == null)
              return !1;
            switch (s.type) {
              case "ArrayExpression":
              case "AssignmentExpression":
              case "BinaryExpression":
              case "CallExpression":
              case "ConditionalExpression":
              case "FunctionExpression":
              case "Identifier":
              case "Literal":
              case "LogicalExpression":
              case "MemberExpression":
              case "NewExpression":
              case "ObjectExpression":
              case "SequenceExpression":
              case "ThisExpression":
              case "UnaryExpression":
              case "UpdateExpression":
                return !0;
            }
            return !1;
          }
          function a(s) {
            if (s == null)
              return !1;
            switch (s.type) {
              case "DoWhileStatement":
              case "ForInStatement":
              case "ForStatement":
              case "WhileStatement":
                return !0;
            }
            return !1;
          }
          function i(s) {
            if (s == null)
              return !1;
            switch (s.type) {
              case "BlockStatement":
              case "BreakStatement":
              case "ContinueStatement":
              case "DebuggerStatement":
              case "DoWhileStatement":
              case "EmptyStatement":
              case "ExpressionStatement":
              case "ForInStatement":
              case "ForStatement":
              case "IfStatement":
              case "LabeledStatement":
              case "ReturnStatement":
              case "SwitchStatement":
              case "ThrowStatement":
              case "TryStatement":
              case "VariableDeclaration":
              case "WhileStatement":
              case "WithStatement":
                return !0;
            }
            return !1;
          }
          function e(s) {
            return i(s) || s != null && s.type === "FunctionDeclaration";
          }
          function t(s) {
            switch (s.type) {
              case "IfStatement":
                return s.alternate != null ? s.alternate : s.consequent;
              case "LabeledStatement":
              case "ForStatement":
              case "ForInStatement":
              case "WhileStatement":
              case "WithStatement":
                return s.body;
            }
            return null;
          }
          function u(s) {
            var c;
            if (s.type !== "IfStatement" || s.alternate == null)
              return !1;
            c = s.consequent;
            do {
              if (c.type === "IfStatement" && c.alternate == null)
                return !0;
              c = t(c);
            } while (c);
            return !1;
          }
          l.exports = { isExpression: n, isStatement: i, isIterationStatement: a, isSourceElement: e, isProblematicIfStatement: u, trailingStatement: t };
        }();
      } }), pu = Z({ "node_modules/esutils/lib/code.js"(r, l) {
        te(), function() {
          var n, a, i, e, t, u;
          a = { NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/, NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/ }, n = { NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/, NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/ };
          function s(v) {
            return 48 <= v && v <= 57;
          }
          function c(v) {
            return 48 <= v && v <= 57 || 97 <= v && v <= 102 || 65 <= v && v <= 70;
          }
          function C(v) {
            return v >= 48 && v <= 55;
          }
          i = [5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279];
          function f(v) {
            return v === 32 || v === 9 || v === 11 || v === 12 || v === 160 || v >= 5760 && i.indexOf(v) >= 0;
          }
          function h(v) {
            return v === 10 || v === 13 || v === 8232 || v === 8233;
          }
          function p(v) {
            if (v <= 65535)
              return String.fromCharCode(v);
            var x = String.fromCharCode(Math.floor((v - 65536) / 1024) + 55296), B = String.fromCharCode((v - 65536) % 1024 + 56320);
            return x + B;
          }
          for (e = new Array(128), u = 0; u < 128; ++u)
            e[u] = u >= 97 && u <= 122 || u >= 65 && u <= 90 || u === 36 || u === 95;
          for (t = new Array(128), u = 0; u < 128; ++u)
            t[u] = u >= 97 && u <= 122 || u >= 65 && u <= 90 || u >= 48 && u <= 57 || u === 36 || u === 95;
          function d(v) {
            return v < 128 ? e[v] : a.NonAsciiIdentifierStart.test(p(v));
          }
          function g(v) {
            return v < 128 ? t[v] : a.NonAsciiIdentifierPart.test(p(v));
          }
          function w(v) {
            return v < 128 ? e[v] : n.NonAsciiIdentifierStart.test(p(v));
          }
          function k(v) {
            return v < 128 ? t[v] : n.NonAsciiIdentifierPart.test(p(v));
          }
          l.exports = { isDecimalDigit: s, isHexDigit: c, isOctalDigit: C, isWhiteSpace: f, isLineTerminator: h, isIdentifierStartES5: d, isIdentifierPartES5: g, isIdentifierStartES6: w, isIdentifierPartES6: k };
        }();
      } }), Ya = Z({ "node_modules/esutils/lib/keyword.js"(r, l) {
        te(), function() {
          var n = pu();
          function a(d) {
            switch (d) {
              case "implements":
              case "interface":
              case "package":
              case "private":
              case "protected":
              case "public":
              case "static":
              case "let":
                return !0;
              default:
                return !1;
            }
          }
          function i(d, g) {
            return !g && d === "yield" ? !1 : e(d, g);
          }
          function e(d, g) {
            if (g && a(d))
              return !0;
            switch (d.length) {
              case 2:
                return d === "if" || d === "in" || d === "do";
              case 3:
                return d === "var" || d === "for" || d === "new" || d === "try";
              case 4:
                return d === "this" || d === "else" || d === "case" || d === "void" || d === "with" || d === "enum";
              case 5:
                return d === "while" || d === "break" || d === "catch" || d === "throw" || d === "const" || d === "yield" || d === "class" || d === "super";
              case 6:
                return d === "return" || d === "typeof" || d === "delete" || d === "switch" || d === "export" || d === "import";
              case 7:
                return d === "default" || d === "finally" || d === "extends";
              case 8:
                return d === "function" || d === "continue" || d === "debugger";
              case 10:
                return d === "instanceof";
              default:
                return !1;
            }
          }
          function t(d, g) {
            return d === "null" || d === "true" || d === "false" || i(d, g);
          }
          function u(d, g) {
            return d === "null" || d === "true" || d === "false" || e(d, g);
          }
          function s(d) {
            return d === "eval" || d === "arguments";
          }
          function c(d) {
            var g, w, k;
            if (d.length === 0 || (k = d.charCodeAt(0), !n.isIdentifierStartES5(k)))
              return !1;
            for (g = 1, w = d.length; g < w; ++g)
              if (k = d.charCodeAt(g), !n.isIdentifierPartES5(k))
                return !1;
            return !0;
          }
          function C(d, g) {
            return (d - 55296) * 1024 + (g - 56320) + 65536;
          }
          function f(d) {
            var g, w, k, v, x;
            if (d.length === 0)
              return !1;
            for (x = n.isIdentifierStartES6, g = 0, w = d.length; g < w; ++g) {
              if (k = d.charCodeAt(g), 55296 <= k && k <= 56319) {
                if (++g, g >= w || (v = d.charCodeAt(g), !(56320 <= v && v <= 57343)))
                  return !1;
                k = C(k, v);
              }
              if (!x(k))
                return !1;
              x = n.isIdentifierPartES6;
            }
            return !0;
          }
          function h(d, g) {
            return c(d) && !t(d, g);
          }
          function p(d, g) {
            return f(d) && !u(d, g);
          }
          l.exports = { isKeywordES5: i, isKeywordES6: e, isReservedWordES5: t, isReservedWordES6: u, isRestrictedWord: s, isIdentifierNameES5: c, isIdentifierNameES6: f, isIdentifierES5: h, isIdentifierES6: p };
        }();
      } }), Za = Z({ "node_modules/esutils/lib/utils.js"(r) {
        te(), function() {
          r.ast = Qa(), r.code = pu(), r.keyword = Ya();
        }();
      } }), Qt = Z({ "src/language-js/utils/is-block-comment.js"(r, l) {
        te();
        var n = /* @__PURE__ */ new Set(["Block", "CommentBlock", "MultiLine"]), a = (i) => n.has(i == null ? void 0 : i.type);
        l.exports = a;
      } }), Ka = Z({ "src/language-js/utils/is-node-matches.js"(r, l) {
        te();
        function n(i, e) {
          let t = e.split(".");
          for (let u = t.length - 1; u >= 0; u--) {
            let s = t[u];
            if (u === 0)
              return i.type === "Identifier" && i.name === s;
            if (i.type !== "MemberExpression" || i.optional || i.computed || i.property.type !== "Identifier" || i.property.name !== s)
              return !1;
            i = i.object;
          }
        }
        function a(i, e) {
          return e.some((t) => n(i, t));
        }
        l.exports = a;
      } }), mt = Z({ "src/language-js/utils/index.js"(r, l) {
        te();
        var n = Za().keyword.isIdentifierNameES5, { getLast: a, hasNewline: i, skipWhitespace: e, isNonEmptyArray: t, isNextLineEmptyAfterIndex: u, getStringWidth: s } = ot(), { locStart: c, locEnd: C, hasSameLocStart: f } = wt(), h = Qt(), p = Ka(), d = "(?:(?=.)\\s)", g = new RegExp("^".concat(d, "*:")), w = new RegExp("^".concat(d, "*::"));
        function k(M) {
          var me, Oe;
          return ((me = M.extra) === null || me === void 0 ? void 0 : me.parenthesized) && h((Oe = M.trailingComments) === null || Oe === void 0 ? void 0 : Oe[0]) && g.test(M.trailingComments[0].value);
        }
        function v(M) {
          let me = M == null ? void 0 : M[0];
          return h(me) && w.test(me.value);
        }
        function x(M, me) {
          if (!M || typeof M != "object")
            return !1;
          if (Array.isArray(M))
            return M.some((at) => x(at, me));
          let Oe = me(M);
          return typeof Oe == "boolean" ? Oe : Object.values(M).some((at) => x(at, me));
        }
        function B(M) {
          return M.type === "AssignmentExpression" || M.type === "BinaryExpression" || M.type === "LogicalExpression" || M.type === "NGPipeExpression" || M.type === "ConditionalExpression" || se(M) || fe(M) || M.type === "SequenceExpression" || M.type === "TaggedTemplateExpression" || M.type === "BindExpression" || M.type === "UpdateExpression" && !M.prefix || M.type === "TSAsExpression" || M.type === "TSNonNullExpression";
        }
        function I(M) {
          var me, Oe, at, lt, At, Tt;
          return M.expressions ? M.expressions[0] : (me = (Oe = (at = (lt = (At = (Tt = M.left) !== null && Tt !== void 0 ? Tt : M.test) !== null && At !== void 0 ? At : M.callee) !== null && lt !== void 0 ? lt : M.object) !== null && at !== void 0 ? at : M.tag) !== null && Oe !== void 0 ? Oe : M.argument) !== null && me !== void 0 ? me : M.expression;
        }
        function j(M, me) {
          if (me.expressions)
            return ["expressions", 0];
          if (me.left)
            return ["left"];
          if (me.test)
            return ["test"];
          if (me.object)
            return ["object"];
          if (me.callee)
            return ["callee"];
          if (me.tag)
            return ["tag"];
          if (me.argument)
            return ["argument"];
          if (me.expression)
            return ["expression"];
          throw new Error("Unexpected node has no left side.");
        }
        function P(M) {
          return M = new Set(M), (me) => M.has(me == null ? void 0 : me.type);
        }
        var E = P(["Line", "CommentLine", "SingleLine", "HashbangComment", "HTMLOpen", "HTMLClose"]), D = P(["ExportDefaultDeclaration", "ExportDefaultSpecifier", "DeclareExportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"]);
        function m(M) {
          let me = M.getParentNode();
          return M.getName() === "declaration" && D(me) ? me : null;
        }
        var A = P(["BooleanLiteral", "DirectiveLiteral", "Literal", "NullLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "RegExpLiteral", "StringLiteral", "TemplateLiteral", "TSTypeLiteral", "JSXText"]);
        function o(M) {
          return M.type === "NumericLiteral" || M.type === "Literal" && typeof M.value == "number";
        }
        function F(M) {
          return M.type === "UnaryExpression" && (M.operator === "+" || M.operator === "-") && o(M.argument);
        }
        function y(M) {
          return M.type === "StringLiteral" || M.type === "Literal" && typeof M.value == "string";
        }
        var T = P(["ObjectTypeAnnotation", "TSTypeLiteral", "TSMappedType"]), b = P(["FunctionExpression", "ArrowFunctionExpression"]);
        function S(M) {
          return M.type === "FunctionExpression" || M.type === "ArrowFunctionExpression" && M.body.type === "BlockStatement";
        }
        function L(M) {
          return se(M) && M.callee.type === "Identifier" && ["async", "inject", "fakeAsync", "waitForAsync"].includes(M.callee.name);
        }
        var R = P(["JSXElement", "JSXFragment"]);
        function O(M, me) {
          if (M.parentParser !== "markdown" && M.parentParser !== "mdx")
            return !1;
          let Oe = me.getNode();
          if (!Oe.expression || !R(Oe.expression))
            return !1;
          let at = me.getParentNode();
          return at.type === "Program" && at.body.length === 1;
        }
        function U(M) {
          return M.kind === "get" || M.kind === "set";
        }
        function V(M) {
          return U(M) || f(M, M.value);
        }
        function _(M) {
          return (M.type === "ObjectTypeProperty" || M.type === "ObjectTypeInternalSlot") && M.value.type === "FunctionTypeAnnotation" && !M.static && !V(M);
        }
        function Y(M) {
          return (M.type === "TypeAnnotation" || M.type === "TSTypeAnnotation") && M.typeAnnotation.type === "FunctionTypeAnnotation" && !M.static && !f(M, M.typeAnnotation);
        }
        var H = P(["BinaryExpression", "LogicalExpression", "NGPipeExpression"]);
        function $(M) {
          return fe(M) || M.type === "BindExpression" && Boolean(M.object);
        }
        var K = /* @__PURE__ */ new Set(["AnyTypeAnnotation", "TSAnyKeyword", "NullLiteralTypeAnnotation", "TSNullKeyword", "ThisTypeAnnotation", "TSThisType", "NumberTypeAnnotation", "TSNumberKeyword", "VoidTypeAnnotation", "TSVoidKeyword", "BooleanTypeAnnotation", "TSBooleanKeyword", "BigIntTypeAnnotation", "TSBigIntKeyword", "SymbolTypeAnnotation", "TSSymbolKeyword", "StringTypeAnnotation", "TSStringKeyword", "BooleanLiteralTypeAnnotation", "StringLiteralTypeAnnotation", "BigIntLiteralTypeAnnotation", "NumberLiteralTypeAnnotation", "TSLiteralType", "TSTemplateLiteralType", "EmptyTypeAnnotation", "MixedTypeAnnotation", "TSNeverKeyword", "TSObjectKeyword", "TSUndefinedKeyword", "TSUnknownKeyword"]);
        function ne(M) {
          return M ? !!((M.type === "GenericTypeAnnotation" || M.type === "TSTypeReference") && !M.typeParameters || K.has(M.type)) : !1;
        }
        function ee(M) {
          let me = /^(?:before|after)(?:Each|All)$/;
          return M.callee.type === "Identifier" && me.test(M.callee.name) && M.arguments.length === 1;
        }
        var pe = ["it", "it.only", "it.skip", "describe", "describe.only", "describe.skip", "test", "test.only", "test.skip", "test.step", "test.describe", "test.describe.only", "test.describe.parallel", "test.describe.parallel.only", "test.describe.serial", "test.describe.serial.only", "skip", "xit", "xdescribe", "xtest", "fit", "fdescribe", "ftest"];
        function J(M) {
          return p(M, pe);
        }
        function W(M, me) {
          if (M.type !== "CallExpression")
            return !1;
          if (M.arguments.length === 1) {
            if (L(M) && me && W(me))
              return b(M.arguments[0]);
            if (ee(M))
              return L(M.arguments[0]);
          } else if ((M.arguments.length === 2 || M.arguments.length === 3) && (M.arguments[0].type === "TemplateLiteral" || y(M.arguments[0])) && J(M.callee))
            return M.arguments[2] && !o(M.arguments[2]) ? !1 : (M.arguments.length === 2 ? b(M.arguments[1]) : S(M.arguments[1]) && we(M.arguments[1]).length <= 1) || L(M.arguments[1]);
          return !1;
        }
        var se = P(["CallExpression", "OptionalCallExpression"]), fe = P(["MemberExpression", "OptionalMemberExpression"]);
        function ae(M) {
          let me = "expressions";
          M.type === "TSTemplateLiteralType" && (me = "types");
          let Oe = M[me];
          return Oe.length === 0 ? !1 : Oe.every((at) => {
            if (re(at))
              return !1;
            if (at.type === "Identifier" || at.type === "ThisExpression")
              return !0;
            if (fe(at)) {
              let lt = at;
              for (; fe(lt); )
                if (lt.property.type !== "Identifier" && lt.property.type !== "Literal" && lt.property.type !== "StringLiteral" && lt.property.type !== "NumericLiteral" || (lt = lt.object, re(lt)))
                  return !1;
              return lt.type === "Identifier" || lt.type === "ThisExpression";
            }
            return !1;
          });
        }
        function q(M, me) {
          return M === "+" || M === "-" ? M + me : me;
        }
        function X(M, me) {
          let Oe = c(me), at = e(M, C(me));
          return at !== !1 && M.slice(Oe, Oe + 2) === "/*" && M.slice(at, at + 2) === "*/";
        }
        function G(M, me) {
          return R(me) ? it(me) : re(me, He.Leading, (Oe) => i(M, C(Oe)));
        }
        function le(M, me) {
          return me.parser !== "json" && y(M.key) && xe(M.key).slice(1, -1) === M.key.value && (n(M.key.value) && !(me.parser === "babel-ts" && M.type === "ClassProperty" || me.parser === "typescript" && M.type === "PropertyDefinition") || Ee(M.key.value) && String(Number(M.key.value)) === M.key.value && (me.parser === "babel" || me.parser === "acorn" || me.parser === "espree" || me.parser === "meriyah" || me.parser === "__babel_estree"));
        }
        function Ee(M) {
          return /^(?:\d+|\d+\.\d+)$/.test(M);
        }
        function Te(M, me) {
          let Oe = /^[fx]?(?:describe|it|test)$/;
          return me.type === "TaggedTemplateExpression" && me.quasi === M && me.tag.type === "MemberExpression" && me.tag.property.type === "Identifier" && me.tag.property.name === "each" && (me.tag.object.type === "Identifier" && Oe.test(me.tag.object.name) || me.tag.object.type === "MemberExpression" && me.tag.object.property.type === "Identifier" && (me.tag.object.property.name === "only" || me.tag.object.property.name === "skip") && me.tag.object.object.type === "Identifier" && Oe.test(me.tag.object.object.name));
        }
        function $e(M) {
          return M.quasis.some((me) => me.value.raw.includes(`
`));
        }
        function qe(M, me) {
          return (M.type === "TemplateLiteral" && $e(M) || M.type === "TaggedTemplateExpression" && $e(M.quasi)) && !i(me, c(M), { backwards: !0 });
        }
        function ce(M) {
          if (!re(M))
            return !1;
          let me = a(ct(M, He.Dangling));
          return me && !h(me);
        }
        function De(M) {
          if (M.length <= 1)
            return !1;
          let me = 0;
          for (let Oe of M)
            if (b(Oe)) {
              if (me += 1, me > 1)
                return !0;
            } else if (se(Oe)) {
              for (let at of Oe.arguments)
                if (b(at))
                  return !0;
            }
          return !1;
        }
        function he(M) {
          let me = M.getValue(), Oe = M.getParentNode();
          return se(me) && se(Oe) && Oe.callee === me && me.arguments.length > Oe.arguments.length && Oe.arguments.length > 0;
        }
        function ue(M, me) {
          if (me >= 2)
            return !1;
          let Oe = (lt) => ue(lt, me + 1), at = M.type === "Literal" && "regex" in M && M.regex.pattern || M.type === "RegExpLiteral" && M.pattern;
          return at && s(at) > 5 ? !1 : M.type === "Literal" || M.type === "BigIntLiteral" || M.type === "DecimalLiteral" || M.type === "BooleanLiteral" || M.type === "NullLiteral" || M.type === "NumericLiteral" || M.type === "RegExpLiteral" || M.type === "StringLiteral" || M.type === "Identifier" || M.type === "ThisExpression" || M.type === "Super" || M.type === "PrivateName" || M.type === "PrivateIdentifier" || M.type === "ArgumentPlaceholder" || M.type === "Import" ? !0 : M.type === "TemplateLiteral" ? M.quasis.every((lt) => !lt.value.raw.includes(`
`)) && M.expressions.every(Oe) : M.type === "ObjectExpression" ? M.properties.every((lt) => !lt.computed && (lt.shorthand || lt.value && Oe(lt.value))) : M.type === "ArrayExpression" ? M.elements.every((lt) => lt === null || Oe(lt)) : pt(M) ? (M.type === "ImportExpression" || ue(M.callee, me)) && Dt(M).every(Oe) : fe(M) ? ue(M.object, me) && ue(M.property, me) : M.type === "UnaryExpression" && (M.operator === "!" || M.operator === "-") ? ue(M.argument, me) : M.type === "TSNonNullExpression" ? ue(M.expression, me) : !1;
        }
        function xe(M) {
          var me, Oe;
          return (me = (Oe = M.extra) === null || Oe === void 0 ? void 0 : Oe.raw) !== null && me !== void 0 ? me : M.raw;
        }
        function Q(M) {
          return M;
        }
        function ve(M) {
          return M.filepath && /\.tsx$/i.test(M.filepath);
        }
        function Ae(M) {
          let me = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "es5";
          return M.trailingComma === "es5" && me === "es5" || M.trailingComma === "all" && (me === "all" || me === "es5");
        }
        function be(M, me) {
          switch (M = Be(M), M.type) {
            case "FunctionExpression":
            case "ClassExpression":
            case "DoExpression":
              return me;
            case "ObjectExpression":
              return !0;
            case "MemberExpression":
            case "OptionalMemberExpression":
              return be(M.object, me);
            case "TaggedTemplateExpression":
              return M.tag.type === "FunctionExpression" ? !1 : be(M.tag, me);
            case "CallExpression":
            case "OptionalCallExpression":
              return M.callee.type === "FunctionExpression" ? !1 : be(M.callee, me);
            case "ConditionalExpression":
              return be(M.test, me);
            case "UpdateExpression":
              return !M.prefix && be(M.argument, me);
            case "BindExpression":
              return M.object && be(M.object, me);
            case "SequenceExpression":
              return be(M.expressions[0], me);
            case "TSAsExpression":
            case "TSNonNullExpression":
              return be(M.expression, me);
            default:
              return !1;
          }
        }
        var We = { "==": !0, "!=": !0, "===": !0, "!==": !0 }, Se = { "*": !0, "/": !0, "%": !0 }, ye = { ">>": !0, ">>>": !0, "<<": !0 };
        function N(M, me) {
          return !(ie(me) !== ie(M) || M === "**" || We[M] && We[me] || me === "%" && Se[M] || M === "%" && Se[me] || me !== M && Se[me] && Se[M] || ye[M] && ye[me]);
        }
        var z = new Map([["|>"], ["??"], ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "===", "!=", "!=="], ["<", ">", "<=", ">=", "in", "instanceof"], [">>", "<<", ">>>"], ["+", "-"], ["*", "/", "%"], ["**"]].flatMap((M, me) => M.map((Oe) => [Oe, me])));
        function ie(M) {
          return z.get(M);
        }
        function Be(M) {
          for (; M.left; )
            M = M.left;
          return M;
        }
        function nt(M) {
          return Boolean(ye[M]) || M === "|" || M === "^" || M === "&";
        }
        function _e(M) {
          var me;
          if (M.rest)
            return !0;
          let Oe = we(M);
          return ((me = a(Oe)) === null || me === void 0 ? void 0 : me.type) === "RestElement";
        }
        var Ue = /* @__PURE__ */ new WeakMap();
        function we(M) {
          if (Ue.has(M))
            return Ue.get(M);
          let me = [];
          return M.this && me.push(M.this), Array.isArray(M.parameters) ? me.push(...M.parameters) : Array.isArray(M.params) && me.push(...M.params), M.rest && me.push(M.rest), Ue.set(M, me), me;
        }
        function yt(M, me) {
          let Oe = M.getValue(), at = 0, lt = (At) => me(At, at++);
          Oe.this && M.call(lt, "this"), Array.isArray(Oe.parameters) ? M.each(lt, "parameters") : Array.isArray(Oe.params) && M.each(lt, "params"), Oe.rest && M.call(lt, "rest");
        }
        var Ie = /* @__PURE__ */ new WeakMap();
        function Dt(M) {
          if (Ie.has(M))
            return Ie.get(M);
          let me = M.arguments;
          return M.type === "ImportExpression" && (me = [M.source], M.attributes && me.push(M.attributes)), Ie.set(M, me), me;
        }
        function Je(M, me) {
          let Oe = M.getValue();
          Oe.type === "ImportExpression" ? (M.call((at) => me(at, 0), "source"), Oe.attributes && M.call((at) => me(at, 1), "attributes")) : M.each(me, "arguments");
        }
        function Ge(M) {
          return M.value.trim() === "prettier-ignore" && !M.unignore;
        }
        function it(M) {
          return M && (M.prettierIgnore || re(M, He.PrettierIgnore));
        }
        function Pe(M) {
          let me = M.getValue();
          return it(me);
        }
        var He = { Leading: 1 << 1, Trailing: 1 << 2, Dangling: 1 << 3, Block: 1 << 4, Line: 1 << 5, PrettierIgnore: 1 << 6, First: 1 << 7, Last: 1 << 8 }, Ze = (M, me) => {
          if (typeof M == "function" && (me = M, M = 0), M || me)
            return (Oe, at, lt) => !(M & He.Leading && !Oe.leading || M & He.Trailing && !Oe.trailing || M & He.Dangling && (Oe.leading || Oe.trailing) || M & He.Block && !h(Oe) || M & He.Line && !E(Oe) || M & He.First && at !== 0 || M & He.Last && at !== lt.length - 1 || M & He.PrettierIgnore && !Ge(Oe) || me && !me(Oe));
        };
        function re(M, me, Oe) {
          if (!t(M == null ? void 0 : M.comments))
            return !1;
          let at = Ze(me, Oe);
          return at ? M.comments.some(at) : !0;
        }
        function ct(M, me, Oe) {
          if (!Array.isArray(M == null ? void 0 : M.comments))
            return [];
          let at = Ze(me, Oe);
          return at ? M.comments.filter(at) : M.comments;
        }
        var rt = (M, me) => {
          let { originalText: Oe } = me;
          return u(Oe, C(M));
        };
        function pt(M) {
          return se(M) || M.type === "NewExpression" || M.type === "ImportExpression";
        }
        function Nt(M) {
          return M && (M.type === "ObjectProperty" || M.type === "Property" && !M.method && M.kind === "init");
        }
        function xt(M) {
          return Boolean(M.__isUsingHackPipeline);
        }
        var _t = Symbol("ifWithoutBlockAndSameLineComment");
        l.exports = { getFunctionParameters: we, iterateFunctionParametersPath: yt, getCallArguments: Dt, iterateCallArgumentsPath: Je, hasRestParameter: _e, getLeftSide: I, getLeftSidePathName: j, getParentExportDeclaration: m, getTypeScriptMappedTypeModifier: q, hasFlowAnnotationComment: v, hasFlowShorthandAnnotationComment: k, hasLeadingOwnLineComment: G, hasNakedLeftSide: B, hasNode: x, hasIgnoreComment: Pe, hasNodeIgnoreComment: it, identity: Q, isBinaryish: H, isCallLikeExpression: pt, isEnabledHackPipeline: xt, isLineComment: E, isPrettierIgnoreComment: Ge, isCallExpression: se, isMemberExpression: fe, isExportDeclaration: D, isFlowAnnotationComment: X, isFunctionCompositionArgs: De, isFunctionNotation: V, isFunctionOrArrowExpression: b, isGetterOrSetter: U, isJestEachTemplateLiteral: Te, isJsxNode: R, isLiteral: A, isLongCurriedCallExpression: he, isSimpleCallArgument: ue, isMemberish: $, isNumericLiteral: o, isSignedNumericLiteral: F, isObjectProperty: Nt, isObjectType: T, isObjectTypePropertyAFunction: _, isSimpleType: ne, isSimpleNumber: Ee, isSimpleTemplateLiteral: ae, isStringLiteral: y, isStringPropSafeToUnquote: le, isTemplateOnItsOwnLine: qe, isTestCall: W, isTheOnlyJsxElementInMarkdown: O, isTSXFile: ve, isTypeAnnotationAFunction: Y, isNextLineEmpty: rt, needsHardlineAfterDanglingComment: ce, rawText: xe, shouldPrintComma: Ae, isBitwiseOperator: nt, shouldFlatten: N, startsWithNoLookaheadToken: be, getPrecedence: ie, hasComment: re, getComments: ct, CommentCheckFlags: He, markerForIfWithoutBlockAndSameLineComment: _t };
      } }), Yt = Z({ "src/language-js/print/template-literal.js"(r, l) {
        te();
        var n = It(), { getStringWidth: a, getIndentSize: i } = ot(), { builders: { join: e, hardline: t, softline: u, group: s, indent: c, align: C, lineSuffixBoundary: f, addAlignmentToDoc: h }, printer: { printDocToString: p }, utils: { mapDoc: d } } = Ye(), { isBinaryish: g, isJestEachTemplateLiteral: w, isSimpleTemplateLiteral: k, hasComment: v, isMemberExpression: x } = mt();
        function B(m, A, o) {
          let F = m.getValue();
          if (F.type === "TemplateLiteral" && w(F, m.getParentNode())) {
            let L = I(m, o, A);
            if (L)
              return L;
          }
          let y = "expressions";
          F.type === "TSTemplateLiteralType" && (y = "types");
          let T = [], b = m.map(A, y), S = k(F);
          return S && (b = b.map((L) => p(L, Object.assign(Object.assign({}, o), {}, { printWidth: Number.POSITIVE_INFINITY })).formatted)), T.push(f, "`"), m.each((L) => {
            let R = L.getName();
            if (T.push(A()), R < b.length) {
              let { tabWidth: O } = o, U = L.getValue(), V = i(U.value.raw, O), _ = b[R];
              if (!S) {
                let H = F[y][R];
                (v(H) || x(H) || H.type === "ConditionalExpression" || H.type === "SequenceExpression" || H.type === "TSAsExpression" || g(H)) && (_ = [c([u, _]), u]);
              }
              let Y = V === 0 && U.value.raw.endsWith(`
`) ? C(Number.NEGATIVE_INFINITY, _) : h(_, V, O);
              T.push(s(["${", Y, f, "}"]));
            }
          }, "quasis"), T.push("`"), T;
        }
        function I(m, A, o) {
          let F = m.getNode(), y = F.quasis[0].value.raw.trim().split(/\s*\|\s*/);
          if (y.length > 1 || y.some((T) => T.length > 0)) {
            A.__inJestEach = !0;
            let T = m.map(o, "expressions");
            A.__inJestEach = !1;
            let b = [], S = T.map((V) => "${" + p(V, Object.assign(Object.assign({}, A), {}, { printWidth: Number.POSITIVE_INFINITY, endOfLine: "lf" })).formatted + "}"), L = [{ hasLineBreak: !1, cells: [] }];
            for (let V = 1; V < F.quasis.length; V++) {
              let _ = n(L), Y = S[V - 1];
              _.cells.push(Y), Y.includes(`
`) && (_.hasLineBreak = !0), F.quasis[V].value.raw.includes(`
`) && L.push({ hasLineBreak: !1, cells: [] });
            }
            let R = Math.max(y.length, ...L.map((V) => V.cells.length)), O = Array.from({ length: R }).fill(0), U = [{ cells: y }, ...L.filter((V) => V.cells.length > 0)];
            for (let { cells: V } of U.filter((_) => !_.hasLineBreak))
              for (let [_, Y] of V.entries())
                O[_] = Math.max(O[_], a(Y));
            return b.push(f, "`", c([t, e(t, U.map((V) => e(" | ", V.cells.map((_, Y) => V.hasLineBreak ? _ : _ + " ".repeat(O[Y] - a(_))))))]), t, "`"), b;
          }
        }
        function j(m, A) {
          let o = m.getValue(), F = A();
          return v(o) && (F = s([c([u, F]), u])), ["${", F, f, "}"];
        }
        function P(m, A) {
          return m.map((o) => j(o, A), "expressions");
        }
        function E(m, A) {
          return d(m, (o) => typeof o == "string" ? A ? o.replace(/(\\*)`/g, "$1$1\\`") : D(o) : o);
        }
        function D(m) {
          return m.replace(/([\\`]|\${)/g, "\\$1");
        }
        l.exports = { printTemplateLiteral: B, printTemplateExpressions: P, escapeTemplateCharacters: E, uncookTemplateElementValue: D };
      } }), es = Z({ "src/language-js/embed/markdown.js"(r, l) {
        te();
        var { builders: { indent: n, softline: a, literalline: i, dedentToRoot: e } } = Ye(), { escapeTemplateCharacters: t } = Yt();
        function u(c, C, f) {
          let h = c.getValue().quasis[0].value.raw.replace(/((?:\\\\)*)\\`/g, (w, k) => "\\".repeat(k.length / 2) + "`"), p = s(h), d = p !== "";
          d && (h = h.replace(new RegExp("^".concat(p), "gm"), ""));
          let g = t(f(h, { parser: "markdown", __inJsTemplate: !0 }, { stripTrailingHardline: !0 }), !0);
          return ["`", d ? n([a, g]) : [i, e(g)], a, "`"];
        }
        function s(c) {
          let C = c.match(/^([^\S\n]*)\S/m);
          return C === null ? "" : C[1];
        }
        l.exports = u;
      } }), ts = Z({ "src/language-js/embed/css.js"(r, l) {
        te();
        var { isNonEmptyArray: n } = ot(), { builders: { indent: a, hardline: i, softline: e }, utils: { mapDoc: t, replaceEndOfLine: u, cleanDoc: s } } = Ye(), { printTemplateExpressions: c } = Yt();
        function C(p, d, g) {
          let w = p.getValue(), k = w.quasis.map((j) => j.value.raw), v = 0, x = k.reduce((j, P, E) => E === 0 ? P : j + "@prettier-placeholder-" + v++ + "-id" + P, ""), B = g(x, { parser: "scss" }, { stripTrailingHardline: !0 }), I = c(p, d);
          return f(B, w, I);
        }
        function f(p, d, g) {
          if (d.quasis.length === 1 && !d.quasis[0].value.raw.trim())
            return "``";
          let w = h(p, g);
          if (!w)
            throw new Error("Couldn't insert all the expressions");
          return ["`", a([i, w]), e, "`"];
        }
        function h(p, d) {
          if (!n(d))
            return p;
          let g = 0, w = t(s(p), (k) => typeof k != "string" || !k.includes("@prettier-placeholder") ? k : k.split(/@prettier-placeholder-(\d+)-id/).map((v, x) => x % 2 === 0 ? u(v) : (g++, d[v])));
          return d.length === g ? w : null;
        }
        l.exports = C;
      } }), ns = Z({ "src/language-js/embed/graphql.js"(r, l) {
        te();
        var { builders: { indent: n, join: a, hardline: i } } = Ye(), { escapeTemplateCharacters: e, printTemplateExpressions: t } = Yt();
        function u(c, C, f) {
          let h = c.getValue(), p = h.quasis.length;
          if (p === 1 && h.quasis[0].value.raw.trim() === "")
            return "``";
          let d = t(c, C), g = [];
          for (let w = 0; w < p; w++) {
            let k = h.quasis[w], v = w === 0, x = w === p - 1, B = k.value.cooked, I = B.split(`
`), j = I.length, P = d[w], E = j > 2 && I[0].trim() === "" && I[1].trim() === "", D = j > 2 && I[j - 1].trim() === "" && I[j - 2].trim() === "", m = I.every((o) => /^\s*(?:#[^\n\r]*)?$/.test(o));
            if (!x && /#[^\n\r]*$/.test(I[j - 1]))
              return null;
            let A = null;
            m ? A = s(I) : A = f(B, { parser: "graphql" }, { stripTrailingHardline: !0 }), A ? (A = e(A, !1), !v && E && g.push(""), g.push(A), !x && D && g.push("")) : !v && !x && E && g.push(""), P && g.push(P);
          }
          return ["`", n([i, a(i, g)]), i, "`"];
        }
        function s(c) {
          let C = [], f = !1, h = c.map((p) => p.trim());
          for (let [p, d] of h.entries())
            d !== "" && (h[p - 1] === "" && f ? C.push([i, d]) : C.push(d), f = !0);
          return C.length === 0 ? null : a(i, C);
        }
        l.exports = u;
      } }), rs = Z({ "src/language-js/embed/html.js"(r, l) {
        te();
        var { builders: { indent: n, line: a, hardline: i, group: e }, utils: { mapDoc: t } } = Ye(), { printTemplateExpressions: u, uncookTemplateElementValue: s } = Yt(), c = 0;
        function C(f, h, p, d, g) {
          let { parser: w } = g, k = f.getValue(), v = c;
          c = c + 1 >>> 0;
          let x = (F) => "PRETTIER_HTML_PLACEHOLDER_".concat(F, "_").concat(v, "_IN_JS"), B = k.quasis.map((F, y, T) => y === T.length - 1 ? F.value.cooked : F.value.cooked + x(y)).join(""), I = u(f, h);
          if (I.length === 0 && B.trim().length === 0)
            return "``";
          let j = new RegExp(x("(\\d+)"), "g"), P = 0, E = p(B, { parser: w, __onHtmlRoot(F) {
            P = F.children.length;
          } }, { stripTrailingHardline: !0 }), D = t(E, (F) => {
            if (typeof F != "string")
              return F;
            let y = [], T = F.split(j);
            for (let b = 0; b < T.length; b++) {
              let S = T[b];
              if (b % 2 === 0) {
                S && (S = s(S), d.__embeddedInHtml && (S = S.replace(/<\/(script)\b/gi, "<\\/$1")), y.push(S));
                continue;
              }
              let L = Number(S);
              y.push(I[L]);
            }
            return y;
          }), m = /^\s/.test(B) ? " " : "", A = /\s$/.test(B) ? " " : "", o = d.htmlWhitespaceSensitivity === "ignore" ? i : m && A ? a : null;
          return e(o ? ["`", n([o, e(D)]), o, "`"] : ["`", m, P > 1 ? n(e(D)) : e(D), A, "`"]);
        }
        l.exports = C;
      } }), us = Z({ "src/language-js/embed.js"(r, l) {
        te();
        var { hasComment: n, CommentCheckFlags: a, isObjectProperty: i } = mt(), e = es(), t = ts(), u = ns(), s = rs();
        function c(E) {
          if (h(E) || w(E) || k(E) || p(E))
            return "css";
          if (B(E))
            return "graphql";
          if (j(E))
            return "html";
          if (d(E))
            return "angular";
          if (f(E))
            return "markdown";
        }
        function C(E, D, m, A) {
          let o = E.getValue();
          if (o.type !== "TemplateLiteral" || P(o))
            return;
          let F = c(E);
          if (F) {
            if (F === "markdown")
              return e(E, D, m);
            if (F === "css")
              return t(E, D, m);
            if (F === "graphql")
              return u(E, D, m);
            if (F === "html" || F === "angular")
              return s(E, D, m, A, { parser: F });
          }
        }
        function f(E) {
          let D = E.getValue(), m = E.getParentNode();
          return m && m.type === "TaggedTemplateExpression" && D.quasis.length === 1 && m.tag.type === "Identifier" && (m.tag.name === "md" || m.tag.name === "markdown");
        }
        function h(E) {
          let D = E.getValue(), m = E.getParentNode(), A = E.getParentNode(1);
          return A && D.quasis && m.type === "JSXExpressionContainer" && A.type === "JSXElement" && A.openingElement.name.name === "style" && A.openingElement.attributes.some((o) => o.name.name === "jsx") || m && m.type === "TaggedTemplateExpression" && m.tag.type === "Identifier" && m.tag.name === "css" || m && m.type === "TaggedTemplateExpression" && m.tag.type === "MemberExpression" && m.tag.object.name === "css" && (m.tag.property.name === "global" || m.tag.property.name === "resolve");
        }
        function p(E) {
          return E.match((D) => D.type === "TemplateLiteral", (D, m) => D.type === "ArrayExpression" && m === "elements", (D, m) => i(D) && D.key.type === "Identifier" && D.key.name === "styles" && m === "value", ...g);
        }
        function d(E) {
          return E.match((D) => D.type === "TemplateLiteral", (D, m) => i(D) && D.key.type === "Identifier" && D.key.name === "template" && m === "value", ...g);
        }
        var g = [(E, D) => E.type === "ObjectExpression" && D === "properties", (E, D) => E.type === "CallExpression" && E.callee.type === "Identifier" && E.callee.name === "Component" && D === "arguments", (E, D) => E.type === "Decorator" && D === "expression"];
        function w(E) {
          let D = E.getParentNode();
          if (!D || D.type !== "TaggedTemplateExpression")
            return !1;
          let m = D.tag.type === "ParenthesizedExpression" ? D.tag.expression : D.tag;
          switch (m.type) {
            case "MemberExpression":
              return v(m.object) || x(m);
            case "CallExpression":
              return v(m.callee) || m.callee.type === "MemberExpression" && (m.callee.object.type === "MemberExpression" && (v(m.callee.object.object) || x(m.callee.object)) || m.callee.object.type === "CallExpression" && v(m.callee.object.callee));
            case "Identifier":
              return m.name === "css";
            default:
              return !1;
          }
        }
        function k(E) {
          let D = E.getParentNode(), m = E.getParentNode(1);
          return m && D.type === "JSXExpressionContainer" && m.type === "JSXAttribute" && m.name.type === "JSXIdentifier" && m.name.name === "css";
        }
        function v(E) {
          return E.type === "Identifier" && E.name === "styled";
        }
        function x(E) {
          return /^[A-Z]/.test(E.object.name) && E.property.name === "extend";
        }
        function B(E) {
          let D = E.getValue(), m = E.getParentNode();
          return I(D, "GraphQL") || m && (m.type === "TaggedTemplateExpression" && (m.tag.type === "MemberExpression" && m.tag.object.name === "graphql" && m.tag.property.name === "experimental" || m.tag.type === "Identifier" && (m.tag.name === "gql" || m.tag.name === "graphql")) || m.type === "CallExpression" && m.callee.type === "Identifier" && m.callee.name === "graphql");
        }
        function I(E, D) {
          return n(E, a.Block | a.Leading, (m) => {
            let { value: A } = m;
            return A === " ".concat(D, " ");
          });
        }
        function j(E) {
          return I(E.getValue(), "HTML") || E.match((D) => D.type === "TemplateLiteral", (D, m) => D.type === "TaggedTemplateExpression" && D.tag.type === "Identifier" && D.tag.name === "html" && m === "quasi");
        }
        function P(E) {
          let { quasis: D } = E;
          return D.some((m) => {
            let { value: { cooked: A } } = m;
            return A === null;
          });
        }
        l.exports = C;
      } }), is = Z({ "src/language-js/clean.js"(r, l) {
        te();
        var n = Qt(), a = /* @__PURE__ */ new Set(["range", "raw", "comments", "leadingComments", "trailingComments", "innerComments", "extra", "start", "end", "loc", "flags", "errors", "tokens"]), i = (t) => {
          for (let u of t.quasis)
            delete u.value;
        };
        function e(t, u, s) {
          if (t.type === "Program" && delete u.sourceType, (t.type === "BigIntLiteral" || t.type === "BigIntLiteralTypeAnnotation") && u.value && (u.value = u.value.toLowerCase()), (t.type === "BigIntLiteral" || t.type === "Literal") && u.bigint && (u.bigint = u.bigint.toLowerCase()), t.type === "DecimalLiteral" && (u.value = Number(u.value)), t.type === "Literal" && u.decimal && (u.decimal = Number(u.decimal)), t.type === "EmptyStatement" || t.type === "JSXText" || t.type === "JSXExpressionContainer" && (t.expression.type === "Literal" || t.expression.type === "StringLiteral") && t.expression.value === " ")
            return null;
          if ((t.type === "Property" || t.type === "ObjectProperty" || t.type === "MethodDefinition" || t.type === "ClassProperty" || t.type === "ClassMethod" || t.type === "PropertyDefinition" || t.type === "TSDeclareMethod" || t.type === "TSPropertySignature" || t.type === "ObjectTypeProperty") && typeof t.key == "object" && t.key && (t.key.type === "Literal" || t.key.type === "NumericLiteral" || t.key.type === "StringLiteral" || t.key.type === "Identifier") && delete u.key, t.type === "JSXElement" && t.openingElement.name.name === "style" && t.openingElement.attributes.some((f) => f.name.name === "jsx"))
            for (let { type: f, expression: h } of u.children)
              f === "JSXExpressionContainer" && h.type === "TemplateLiteral" && i(h);
          t.type === "JSXAttribute" && t.name.name === "css" && t.value.type === "JSXExpressionContainer" && t.value.expression.type === "TemplateLiteral" && i(u.value.expression), t.type === "JSXAttribute" && t.value && t.value.type === "Literal" && /["']|&quot;|&apos;/.test(t.value.value) && (u.value.value = u.value.value.replace(/["']|&quot;|&apos;/g, '"'));
          let c = t.expression || t.callee;
          if (t.type === "Decorator" && c.type === "CallExpression" && c.callee.name === "Component" && c.arguments.length === 1) {
            let f = t.expression.arguments[0].properties;
            for (let [h, p] of u.expression.arguments[0].properties.entries())
              switch (f[h].key.name) {
                case "styles":
                  p.value.type === "ArrayExpression" && i(p.value.elements[0]);
                  break;
                case "template":
                  p.value.type === "TemplateLiteral" && i(p.value);
                  break;
              }
          }
          if (t.type === "TaggedTemplateExpression" && (t.tag.type === "MemberExpression" || t.tag.type === "Identifier" && (t.tag.name === "gql" || t.tag.name === "graphql" || t.tag.name === "css" || t.tag.name === "md" || t.tag.name === "markdown" || t.tag.name === "html") || t.tag.type === "CallExpression") && i(u.quasi), t.type === "TemplateLiteral") {
            var C;
            (((C = t.leadingComments) === null || C === void 0 ? void 0 : C.some((f) => n(f) && ["GraphQL", "HTML"].some((h) => f.value === " ".concat(h, " ")))) || s.type === "CallExpression" && s.callee.name === "graphql" || !t.leadingComments) && i(u);
          }
          if (t.type === "InterpreterDirective" && (u.value = u.value.trimEnd()), (t.type === "TSIntersectionType" || t.type === "TSUnionType") && t.types.length === 1)
            return u.types[0];
        }
        e.ignoredProperties = a, l.exports = e;
      } }), du = {};
      Mt(du, { EOL: () => pr, arch: () => as, cpus: () => Eu, default: () => xu, endianness: () => Du, freemem: () => yu, getNetworkInterfaces: () => vu, hostname: () => fu, loadavg: () => mu, networkInterfaces: () => Au, platform: () => ss, release: () => Fu, tmpDir: () => lr, tmpdir: () => cr, totalmem: () => hu, type: () => Cu, uptime: () => gu });
      function Du() {
        if (typeof Bn > "u") {
          var r = new ArrayBuffer(2), l = new Uint8Array(r), n = new Uint16Array(r);
          if (l[0] = 1, l[1] = 2, n[0] === 258)
            Bn = "BE";
          else if (n[0] === 513)
            Bn = "LE";
          else
            throw new Error("unable to figure out endianess");
        }
        return Bn;
      }
      function fu() {
        return typeof globalThis.location < "u" ? globalThis.location.hostname : "";
      }
      function mu() {
        return [];
      }
      function gu() {
        return 0;
      }
      function yu() {
        return Number.MAX_VALUE;
      }
      function hu() {
        return Number.MAX_VALUE;
      }
      function Eu() {
        return [];
      }
      function Cu() {
        return "Browser";
      }
      function Fu() {
        return typeof globalThis.navigator < "u" ? globalThis.navigator.appVersion : "";
      }
      function Au() {
      }
      function vu() {
      }
      function as() {
        return "javascript";
      }
      function ss() {
        return "browser";
      }
      function lr() {
        return "/tmp";
      }
      var Bn, cr, pr, xu, os = Ct({ "node-modules-polyfills:os"() {
        te(), cr = lr, pr = `
`, xu = { EOL: pr, tmpdir: cr, tmpDir: lr, networkInterfaces: Au, getNetworkInterfaces: vu, release: Fu, type: Cu, cpus: Eu, totalmem: hu, freemem: yu, uptime: gu, loadavg: mu, hostname: fu, endianness: Du };
      } }), ls = Z({ "node-modules-polyfills-commonjs:os"(r, l) {
        te();
        var n = (os(), gt(du));
        if (n && n.default) {
          l.exports = n.default;
          for (let a in n)
            l.exports[a] = n[a];
        } else
          n && (l.exports = n);
      } }), cs = Z({ "node_modules/detect-newline/index.js"(r, l) {
        te();
        var n = (a) => {
          if (typeof a != "string")
            throw new TypeError("Expected a string");
          let i = a.match(/(?:\r?\n)/g) || [];
          if (i.length === 0)
            return;
          let e = i.filter((u) => u === `\r
`).length, t = i.length - e;
          return e > t ? `\r
` : `
`;
        };
        l.exports = n, l.exports.graceful = (a) => typeof a == "string" && n(a) || `
`;
      } }), ps = Z({ "node_modules/jest-docblock/build/index.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 }), r.extract = p, r.parse = g, r.parseWithComments = w, r.print = k, r.strip = d;
        function l() {
          let x = ls();
          return l = function() {
            return x;
          }, x;
        }
        function n() {
          let x = a(cs());
          return n = function() {
            return x;
          }, x;
        }
        function a(x) {
          return x && x.__esModule ? x : { default: x };
        }
        var i = /\*\/$/, e = /^\/\*\*/, t = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/, u = /(^|\s+)\/\/([^\r\n]*)/g, s = /^(\r?\n)+/, c = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g, C = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g, f = /(\r?\n|^) *\* ?/g, h = [];
        function p(x) {
          let B = x.match(t);
          return B ? B[0].trimLeft() : "";
        }
        function d(x) {
          let B = x.match(t);
          return B && B[0] ? x.substring(B[0].length) : x;
        }
        function g(x) {
          return w(x).pragmas;
        }
        function w(x) {
          let B = (0, n().default)(x) || l().EOL;
          x = x.replace(e, "").replace(i, "").replace(f, "$1");
          let I = "";
          for (; I !== x; )
            I = x, x = x.replace(c, "".concat(B, "$1 $2").concat(B));
          x = x.replace(s, "").trimRight();
          let j = /* @__PURE__ */ Object.create(null), P = x.replace(C, "").replace(s, "").trimRight(), E;
          for (; E = C.exec(x); ) {
            let D = E[2].replace(u, "");
            typeof j[E[1]] == "string" || Array.isArray(j[E[1]]) ? j[E[1]] = h.concat(j[E[1]], D) : j[E[1]] = D;
          }
          return { comments: P, pragmas: j };
        }
        function k(x) {
          let { comments: B = "", pragmas: I = {} } = x, j = (0, n().default)(B) || l().EOL, P = "/**", E = " *", D = " */", m = Object.keys(I), A = m.map((F) => v(F, I[F])).reduce((F, y) => F.concat(y), []).map((F) => E + " " + F + j).join("");
          if (!B) {
            if (m.length === 0)
              return "";
            if (m.length === 1 && !Array.isArray(I[m[0]])) {
              let F = I[m[0]];
              return "".concat(P, " ").concat(v(m[0], F)[0]).concat(D);
            }
          }
          let o = B.split(j).map((F) => "".concat(E, " ").concat(F)).join(j) + j;
          return P + j + (B ? o : "") + (B && m.length ? E + j : "") + A + D;
        }
        function v(x, B) {
          return h.concat(B).map((I) => "@".concat(x, " ").concat(I).trim());
        }
      } }), ds = Z({ "src/language-js/utils/get-shebang.js"(r, l) {
        te();
        function n(a) {
          if (!a.startsWith("#!"))
            return "";
          let i = a.indexOf(`
`);
          return i === -1 ? a : a.slice(0, i);
        }
        l.exports = n;
      } }), bu = Z({ "src/language-js/pragma.js"(r, l) {
        te();
        var { parseWithComments: n, strip: a, extract: i, print: e } = ps(), { normalizeEndOfLine: t } = Qn(), u = ds();
        function s(f) {
          let h = u(f);
          h && (f = f.slice(h.length + 1));
          let p = i(f), { pragmas: d, comments: g } = n(p);
          return { shebang: h, text: f, pragmas: d, comments: g };
        }
        function c(f) {
          let h = Object.keys(s(f).pragmas);
          return h.includes("prettier") || h.includes("format");
        }
        function C(f) {
          let { shebang: h, text: p, pragmas: d, comments: g } = s(f), w = a(p), k = e({ pragmas: Object.assign({ format: "" }, d), comments: g.trimStart() });
          return (h ? "".concat(h, `
`) : "") + t(k) + (w.startsWith(`
`) ? `
` : `

`) + w;
        }
        l.exports = { hasPragma: c, insertPragma: C };
      } }), Su = Z({ "src/language-js/comments.js"(r, l) {
        te();
        var { getLast: n, hasNewline: a, getNextNonSpaceNonCommentCharacterIndexWithStartIndex: i, getNextNonSpaceNonCommentCharacter: e, hasNewlineInRange: t, addLeadingComment: u, addTrailingComment: s, addDanglingComment: c, getNextNonSpaceNonCommentCharacterIndex: C, isNonEmptyArray: f } = ot(), { getFunctionParameters: h, isPrettierIgnoreComment: p, isJsxNode: d, hasFlowShorthandAnnotationComment: g, hasFlowAnnotationComment: w, hasIgnoreComment: k, isCallLikeExpression: v, getCallArguments: x, isCallExpression: B, isMemberExpression: I, isObjectProperty: j, isLineComment: P, getComments: E, CommentCheckFlags: D, markerForIfWithoutBlockAndSameLineComment: m } = mt(), { locStart: A, locEnd: o } = wt(), F = Qt();
        function y(ye) {
          return [xe, fe, _, O, U, V, K, Te, G, Ee, $e, qe, ee, ae, q].some((N) => N(ye));
        }
        function T(ye) {
          return [R, fe, Y, $e, O, U, V, K, ae, X, le, Ee, he, q, ve].some((N) => N(ye));
        }
        function b(ye) {
          return [xe, O, U, H, se, ee, Ee, W, J, Q, q, ue].some((N) => N(ye));
        }
        function S(ye, N) {
          let z = (ye.body || ye.properties).find((ie) => {
            let { type: Be } = ie;
            return Be !== "EmptyStatement";
          });
          z ? u(z, N) : c(ye, N);
        }
        function L(ye, N) {
          ye.type === "BlockStatement" ? S(ye, N) : u(ye, N);
        }
        function R(ye) {
          let { comment: N, followingNode: z } = ye;
          return z && We(N) ? (u(z, N), !0) : !1;
        }
        function O(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, followingNode: Be, text: nt } = ye;
          if ((ie == null ? void 0 : ie.type) !== "IfStatement" || !Be)
            return !1;
          if (e(nt, N, o) === ")")
            return s(z, N), !0;
          if (z === ie.consequent && Be === ie.alternate) {
            if (z.type === "BlockStatement")
              s(z, N);
            else {
              let _e = N.type === "SingleLine" || N.loc.start.line === N.loc.end.line, Ue = N.loc.start.line === z.loc.start.line;
              _e && Ue ? c(z, N, m) : c(ie, N);
            }
            return !0;
          }
          return Be.type === "BlockStatement" ? (S(Be, N), !0) : Be.type === "IfStatement" ? (L(Be.consequent, N), !0) : ie.consequent === Be ? (u(Be, N), !0) : !1;
        }
        function U(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, followingNode: Be, text: nt } = ye;
          return (ie == null ? void 0 : ie.type) !== "WhileStatement" || !Be ? !1 : e(nt, N, o) === ")" ? (s(z, N), !0) : Be.type === "BlockStatement" ? (S(Be, N), !0) : ie.body === Be ? (u(Be, N), !0) : !1;
        }
        function V(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, followingNode: Be } = ye;
          return (ie == null ? void 0 : ie.type) !== "TryStatement" && (ie == null ? void 0 : ie.type) !== "CatchClause" || !Be ? !1 : ie.type === "CatchClause" && z ? (s(z, N), !0) : Be.type === "BlockStatement" ? (S(Be, N), !0) : Be.type === "TryStatement" ? (L(Be.finalizer, N), !0) : Be.type === "CatchClause" ? (L(Be.body, N), !0) : !1;
        }
        function _(ye) {
          let { comment: N, enclosingNode: z, followingNode: ie } = ye;
          return I(z) && (ie == null ? void 0 : ie.type) === "Identifier" ? (u(z, N), !0) : !1;
        }
        function Y(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, followingNode: Be, text: nt } = ye, _e = z && !t(nt, o(z), A(N));
          return (!z || !_e) && ((ie == null ? void 0 : ie.type) === "ConditionalExpression" || (ie == null ? void 0 : ie.type) === "TSConditionalType") && Be ? (u(Be, N), !0) : !1;
        }
        function H(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie } = ye;
          return j(ie) && ie.shorthand && ie.key === z && ie.value.type === "AssignmentPattern" ? (s(ie.value.left, N), !0) : !1;
        }
        var $ = /* @__PURE__ */ new Set(["ClassDeclaration", "ClassExpression", "DeclareClass", "DeclareInterface", "InterfaceDeclaration", "TSInterfaceDeclaration"]);
        function K(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, followingNode: Be } = ye;
          if ($.has(ie == null ? void 0 : ie.type)) {
            if (f(ie.decorators) && !(Be && Be.type === "Decorator"))
              return s(n(ie.decorators), N), !0;
            if (ie.body && Be === ie.body)
              return S(ie.body, N), !0;
            if (Be) {
              if (ie.superClass && Be === ie.superClass && z && (z === ie.id || z === ie.typeParameters))
                return s(z, N), !0;
              for (let nt of ["implements", "extends", "mixins"])
                if (ie[nt] && Be === ie[nt][0])
                  return z && (z === ie.id || z === ie.typeParameters || z === ie.superClass) ? s(z, N) : c(ie, N, nt), !0;
            }
          }
          return !1;
        }
        var ne = /* @__PURE__ */ new Set(["ClassMethod", "ClassProperty", "PropertyDefinition", "TSAbstractPropertyDefinition", "TSAbstractMethodDefinition", "TSDeclareMethod", "MethodDefinition"]);
        function ee(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, text: Be } = ye;
          return ie && z && e(Be, N, o) === "(" && (ie.type === "Property" || ie.type === "TSDeclareMethod" || ie.type === "TSAbstractMethodDefinition") && z.type === "Identifier" && ie.key === z && e(Be, z, o) !== ":" || (z == null ? void 0 : z.type) === "Decorator" && ne.has(ie == null ? void 0 : ie.type) ? (s(z, N), !0) : !1;
        }
        var pe = /* @__PURE__ */ new Set(["FunctionDeclaration", "FunctionExpression", "ClassMethod", "MethodDefinition", "ObjectMethod"]);
        function J(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, text: Be } = ye;
          return e(Be, N, o) !== "(" ? !1 : z && pe.has(ie == null ? void 0 : ie.type) ? (s(z, N), !0) : !1;
        }
        function W(ye) {
          let { comment: N, enclosingNode: z, text: ie } = ye;
          if ((z == null ? void 0 : z.type) !== "ArrowFunctionExpression")
            return !1;
          let Be = C(ie, N, o);
          return Be !== !1 && ie.slice(Be, Be + 2) === "=>" ? (c(z, N), !0) : !1;
        }
        function se(ye) {
          let { comment: N, enclosingNode: z, text: ie } = ye;
          return e(ie, N, o) !== ")" ? !1 : z && (Ae(z) && h(z).length === 0 || v(z) && x(z).length === 0) ? (c(z, N), !0) : ((z == null ? void 0 : z.type) === "MethodDefinition" || (z == null ? void 0 : z.type) === "TSAbstractMethodDefinition") && h(z.value).length === 0 ? (c(z.value, N), !0) : !1;
        }
        function fe(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, followingNode: Be, text: nt } = ye;
          if ((z == null ? void 0 : z.type) === "FunctionTypeParam" && (ie == null ? void 0 : ie.type) === "FunctionTypeAnnotation" && (Be == null ? void 0 : Be.type) !== "FunctionTypeParam" || ((z == null ? void 0 : z.type) === "Identifier" || (z == null ? void 0 : z.type) === "AssignmentPattern") && ie && Ae(ie) && e(nt, N, o) === ")")
            return s(z, N), !0;
          if ((ie == null ? void 0 : ie.type) === "FunctionDeclaration" && (Be == null ? void 0 : Be.type) === "BlockStatement") {
            let _e = (() => {
              let Ue = h(ie);
              if (Ue.length > 0)
                return i(nt, o(n(Ue)));
              let we = i(nt, o(ie.id));
              return we !== !1 && i(nt, we + 1);
            })();
            if (A(N) > _e)
              return S(Be, N), !0;
          }
          return !1;
        }
        function ae(ye) {
          let { comment: N, enclosingNode: z } = ye;
          return (z == null ? void 0 : z.type) === "LabeledStatement" ? (u(z, N), !0) : !1;
        }
        function q(ye) {
          let { comment: N, enclosingNode: z } = ye;
          return ((z == null ? void 0 : z.type) === "ContinueStatement" || (z == null ? void 0 : z.type) === "BreakStatement") && !z.label ? (s(z, N), !0) : !1;
        }
        function X(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie } = ye;
          return B(ie) && z && ie.callee === z && ie.arguments.length > 0 ? (u(ie.arguments[0], N), !0) : !1;
        }
        function G(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, followingNode: Be } = ye;
          return (ie == null ? void 0 : ie.type) === "UnionTypeAnnotation" || (ie == null ? void 0 : ie.type) === "TSUnionType" ? (p(N) && (Be.prettierIgnore = !0, N.unignore = !0), z ? (s(z, N), !0) : !1) : (((Be == null ? void 0 : Be.type) === "UnionTypeAnnotation" || (Be == null ? void 0 : Be.type) === "TSUnionType") && p(N) && (Be.types[0].prettierIgnore = !0, N.unignore = !0), !1);
        }
        function le(ye) {
          let { comment: N, enclosingNode: z } = ye;
          return j(z) ? (u(z, N), !0) : !1;
        }
        function Ee(ye) {
          let { comment: N, enclosingNode: z, followingNode: ie, ast: Be, isLastComment: nt } = ye;
          return Be && Be.body && Be.body.length === 0 ? (nt ? c(Be, N) : u(Be, N), !0) : (z == null ? void 0 : z.type) === "Program" && (z == null ? void 0 : z.body.length) === 0 && !f(z.directives) ? (nt ? c(z, N) : u(z, N), !0) : (ie == null ? void 0 : ie.type) === "Program" && (ie == null ? void 0 : ie.body.length) === 0 && (z == null ? void 0 : z.type) === "ModuleExpression" ? (c(ie, N), !0) : !1;
        }
        function Te(ye) {
          let { comment: N, enclosingNode: z } = ye;
          return (z == null ? void 0 : z.type) === "ForInStatement" || (z == null ? void 0 : z.type) === "ForOfStatement" ? (u(z, N), !0) : !1;
        }
        function $e(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, text: Be } = ye;
          if ((ie == null ? void 0 : ie.type) === "ImportSpecifier" || (ie == null ? void 0 : ie.type) === "ExportSpecifier")
            return u(ie, N), !0;
          let nt = (z == null ? void 0 : z.type) === "ImportSpecifier" && (ie == null ? void 0 : ie.type) === "ImportDeclaration", _e = (z == null ? void 0 : z.type) === "ExportSpecifier" && (ie == null ? void 0 : ie.type) === "ExportNamedDeclaration";
          return (nt || _e) && a(Be, o(N)) ? (s(z, N), !0) : !1;
        }
        function qe(ye) {
          let { comment: N, enclosingNode: z } = ye;
          return (z == null ? void 0 : z.type) === "AssignmentPattern" ? (u(z, N), !0) : !1;
        }
        var ce = /* @__PURE__ */ new Set(["VariableDeclarator", "AssignmentExpression", "TypeAlias", "TSTypeAliasDeclaration"]), De = /* @__PURE__ */ new Set(["ObjectExpression", "ArrayExpression", "TemplateLiteral", "TaggedTemplateExpression", "ObjectTypeAnnotation", "TSTypeLiteral"]);
        function he(ye) {
          let { comment: N, enclosingNode: z, followingNode: ie } = ye;
          return ce.has(z == null ? void 0 : z.type) && ie && (De.has(ie.type) || F(N)) ? (u(ie, N), !0) : !1;
        }
        function ue(ye) {
          let { comment: N, enclosingNode: z, followingNode: ie, text: Be } = ye;
          return !ie && ((z == null ? void 0 : z.type) === "TSMethodSignature" || (z == null ? void 0 : z.type) === "TSDeclareFunction" || (z == null ? void 0 : z.type) === "TSAbstractMethodDefinition") && e(Be, N, o) === ";" ? (s(z, N), !0) : !1;
        }
        function xe(ye) {
          let { comment: N, enclosingNode: z, followingNode: ie } = ye;
          if (p(N) && (z == null ? void 0 : z.type) === "TSMappedType" && (ie == null ? void 0 : ie.type) === "TSTypeParameter" && ie.constraint)
            return z.prettierIgnore = !0, N.unignore = !0, !0;
        }
        function Q(ye) {
          let { comment: N, precedingNode: z, enclosingNode: ie, followingNode: Be } = ye;
          return (ie == null ? void 0 : ie.type) !== "TSMappedType" ? !1 : (Be == null ? void 0 : Be.type) === "TSTypeParameter" && Be.name ? (u(Be.name, N), !0) : (z == null ? void 0 : z.type) === "TSTypeParameter" && z.constraint ? (s(z.constraint, N), !0) : !1;
        }
        function ve(ye) {
          let { comment: N, enclosingNode: z, followingNode: ie } = ye;
          return !z || z.type !== "SwitchCase" || z.test ? !1 : (ie.type === "BlockStatement" && P(N) ? S(ie, N) : c(z, N), !0);
        }
        function Ae(ye) {
          return ye.type === "ArrowFunctionExpression" || ye.type === "FunctionExpression" || ye.type === "FunctionDeclaration" || ye.type === "ObjectMethod" || ye.type === "ClassMethod" || ye.type === "TSDeclareFunction" || ye.type === "TSCallSignatureDeclaration" || ye.type === "TSConstructSignatureDeclaration" || ye.type === "TSMethodSignature" || ye.type === "TSConstructorType" || ye.type === "TSFunctionType" || ye.type === "TSDeclareMethod";
        }
        function be(ye, N) {
          if ((N.parser === "typescript" || N.parser === "flow" || N.parser === "acorn" || N.parser === "espree" || N.parser === "meriyah" || N.parser === "__babel_estree") && ye.type === "MethodDefinition" && ye.value && ye.value.type === "FunctionExpression" && h(ye.value).length === 0 && !ye.value.returnType && !f(ye.value.typeParameters) && ye.value.body)
            return [...ye.decorators || [], ye.key, ye.value.body];
        }
        function We(ye) {
          return F(ye) && ye.value[0] === "*" && /@type\b/.test(ye.value);
        }
        function Se(ye) {
          let N = ye.getValue(), z = ye.getParentNode(), ie = (Be) => w(E(Be, D.Leading)) || w(E(Be, D.Trailing));
          return (N && (d(N) || g(N) || B(z) && ie(N)) || z && (z.type === "JSXSpreadAttribute" || z.type === "JSXSpreadChild" || z.type === "UnionTypeAnnotation" || z.type === "TSUnionType" || (z.type === "ClassDeclaration" || z.type === "ClassExpression") && z.superClass === N)) && (!k(ye) || z.type === "UnionTypeAnnotation" || z.type === "TSUnionType");
        }
        l.exports = { handleOwnLineComment: y, handleEndOfLineComment: T, handleRemainingComment: b, isTypeCastComment: We, getCommentChildNodes: be, willPrintOwnComments: Se };
      } }), Zt = Z({ "src/language-js/needs-parens.js"(r, l) {
        te();
        var n = It(), a = er(), { getFunctionParameters: i, getLeftSidePathName: e, hasFlowShorthandAnnotationComment: t, hasNakedLeftSide: u, hasNode: s, isBitwiseOperator: c, startsWithNoLookaheadToken: C, shouldFlatten: f, getPrecedence: h, isCallExpression: p, isMemberExpression: d, isObjectProperty: g } = mt();
        function w(P, E) {
          let D = P.getParentNode();
          if (!D)
            return !1;
          let m = P.getName(), A = P.getNode();
          if (E.__isInHtmlInterpolation && !E.bracketSpacing && B(A) && I(P))
            return !0;
          if (k(A))
            return !1;
          if (E.parser !== "flow" && t(P.getValue()))
            return !0;
          if (A.type === "Identifier")
            return !!(A.extra && A.extra.parenthesized && /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(A.name) || m === "left" && A.name === "async" && D.type === "ForOfStatement" && !D.await);
          switch (D.type) {
            case "ParenthesizedExpression":
              return !1;
            case "ClassDeclaration":
            case "ClassExpression": {
              if (m === "superClass" && (A.type === "ArrowFunctionExpression" || A.type === "AssignmentExpression" || A.type === "AwaitExpression" || A.type === "BinaryExpression" || A.type === "ConditionalExpression" || A.type === "LogicalExpression" || A.type === "NewExpression" || A.type === "ObjectExpression" || A.type === "SequenceExpression" || A.type === "TaggedTemplateExpression" || A.type === "UnaryExpression" || A.type === "UpdateExpression" || A.type === "YieldExpression" || A.type === "TSNonNullExpression"))
                return !0;
              break;
            }
            case "ExportDefaultDeclaration":
              return j(P, E) || A.type === "SequenceExpression";
            case "Decorator": {
              if (m === "expression") {
                let o = !1, F = !1, y = A;
                for (; y; )
                  switch (y.type) {
                    case "MemberExpression":
                      F = !0, y = y.object;
                      break;
                    case "CallExpression":
                      if (F || o)
                        return E.parser !== "typescript";
                      o = !0, y = y.callee;
                      break;
                    case "Identifier":
                      return !1;
                    case "TaggedTemplateExpression":
                      return E.parser !== "typescript";
                    default:
                      return !0;
                  }
                return !0;
              }
              break;
            }
            case "ExpressionStatement": {
              if (C(A, !0))
                return !0;
              break;
            }
            case "ArrowFunctionExpression": {
              if (m === "body" && A.type !== "SequenceExpression" && C(A, !1))
                return !0;
              break;
            }
          }
          switch (A.type) {
            case "UpdateExpression":
              if (D.type === "UnaryExpression")
                return A.prefix && (A.operator === "++" && D.operator === "+" || A.operator === "--" && D.operator === "-");
            case "UnaryExpression":
              switch (D.type) {
                case "UnaryExpression":
                  return A.operator === D.operator && (A.operator === "+" || A.operator === "-");
                case "BindExpression":
                  return !0;
                case "MemberExpression":
                case "OptionalMemberExpression":
                  return m === "object";
                case "TaggedTemplateExpression":
                  return !0;
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                  return m === "callee";
                case "BinaryExpression":
                  return m === "left" && D.operator === "**";
                case "TSNonNullExpression":
                  return !0;
                default:
                  return !1;
              }
            case "BinaryExpression": {
              if (D.type === "UpdateExpression" || A.operator === "in" && v(P))
                return !0;
              if (A.operator === "|>" && A.extra && A.extra.parenthesized) {
                let o = P.getParentNode(1);
                if (o.type === "BinaryExpression" && o.operator === "|>")
                  return !0;
              }
            }
            case "TSTypeAssertion":
            case "TSAsExpression":
            case "LogicalExpression":
              switch (D.type) {
                case "TSAsExpression":
                  return A.type !== "TSAsExpression";
                case "ConditionalExpression":
                  return A.type === "TSAsExpression";
                case "CallExpression":
                case "NewExpression":
                case "OptionalCallExpression":
                  return m === "callee";
                case "ClassExpression":
                case "ClassDeclaration":
                  return m === "superClass";
                case "TSTypeAssertion":
                case "TaggedTemplateExpression":
                case "UnaryExpression":
                case "JSXSpreadAttribute":
                case "SpreadElement":
                case "SpreadProperty":
                case "BindExpression":
                case "AwaitExpression":
                case "TSNonNullExpression":
                case "UpdateExpression":
                  return !0;
                case "MemberExpression":
                case "OptionalMemberExpression":
                  return m === "object";
                case "AssignmentExpression":
                case "AssignmentPattern":
                  return m === "left" && (A.type === "TSTypeAssertion" || A.type === "TSAsExpression");
                case "LogicalExpression":
                  if (A.type === "LogicalExpression")
                    return D.operator !== A.operator;
                case "BinaryExpression": {
                  let { operator: o, type: F } = A;
                  if (!o && F !== "TSTypeAssertion")
                    return !0;
                  let y = h(o), T = D.operator, b = h(T);
                  return b > y || m === "right" && b === y || b === y && !f(T, o) ? !0 : b < y && o === "%" ? T === "+" || T === "-" : !!c(T);
                }
                default:
                  return !1;
              }
            case "SequenceExpression":
              switch (D.type) {
                case "ReturnStatement":
                  return !1;
                case "ForStatement":
                  return !1;
                case "ExpressionStatement":
                  return m !== "expression";
                case "ArrowFunctionExpression":
                  return m !== "body";
                default:
                  return !0;
              }
            case "YieldExpression":
              if (D.type === "UnaryExpression" || D.type === "AwaitExpression" || D.type === "TSAsExpression" || D.type === "TSNonNullExpression")
                return !0;
            case "AwaitExpression":
              switch (D.type) {
                case "TaggedTemplateExpression":
                case "UnaryExpression":
                case "LogicalExpression":
                case "SpreadElement":
                case "SpreadProperty":
                case "TSAsExpression":
                case "TSNonNullExpression":
                case "BindExpression":
                  return !0;
                case "MemberExpression":
                case "OptionalMemberExpression":
                  return m === "object";
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                  return m === "callee";
                case "ConditionalExpression":
                  return m === "test";
                case "BinaryExpression":
                  return !(!A.argument && D.operator === "|>");
                default:
                  return !1;
              }
            case "TSConditionalType":
              if (m === "extendsType" && D.type === "TSConditionalType")
                return !0;
            case "TSFunctionType":
            case "TSConstructorType":
              if (m === "checkType" && D.type === "TSConditionalType")
                return !0;
            case "TSUnionType":
            case "TSIntersectionType":
              if ((D.type === "TSUnionType" || D.type === "TSIntersectionType") && D.types.length > 1 && (!A.types || A.types.length > 1))
                return !0;
            case "TSInferType":
              if (A.type === "TSInferType" && D.type === "TSRestType")
                return !1;
            case "TSTypeOperator":
              return D.type === "TSArrayType" || D.type === "TSOptionalType" || D.type === "TSRestType" || m === "objectType" && D.type === "TSIndexedAccessType" || D.type === "TSTypeOperator" || D.type === "TSTypeAnnotation" && P.getParentNode(1).type.startsWith("TSJSDoc");
            case "ArrayTypeAnnotation":
              return D.type === "NullableTypeAnnotation";
            case "IntersectionTypeAnnotation":
            case "UnionTypeAnnotation":
              return D.type === "ArrayTypeAnnotation" || D.type === "NullableTypeAnnotation" || D.type === "IntersectionTypeAnnotation" || D.type === "UnionTypeAnnotation" || m === "objectType" && (D.type === "IndexedAccessType" || D.type === "OptionalIndexedAccessType");
            case "NullableTypeAnnotation":
              return D.type === "ArrayTypeAnnotation" || m === "objectType" && (D.type === "IndexedAccessType" || D.type === "OptionalIndexedAccessType");
            case "FunctionTypeAnnotation": {
              let o = D.type === "NullableTypeAnnotation" ? P.getParentNode(1) : D;
              return o.type === "UnionTypeAnnotation" || o.type === "IntersectionTypeAnnotation" || o.type === "ArrayTypeAnnotation" || m === "objectType" && (o.type === "IndexedAccessType" || o.type === "OptionalIndexedAccessType") || o.type === "NullableTypeAnnotation" || D.type === "FunctionTypeParam" && D.name === null && i(A).some((F) => F.typeAnnotation && F.typeAnnotation.type === "NullableTypeAnnotation");
            }
            case "OptionalIndexedAccessType":
              return m === "objectType" && D.type === "IndexedAccessType";
            case "TypeofTypeAnnotation":
              return m === "objectType" && (D.type === "IndexedAccessType" || D.type === "OptionalIndexedAccessType");
            case "StringLiteral":
            case "NumericLiteral":
            case "Literal":
              if (typeof A.value == "string" && D.type === "ExpressionStatement" && !D.directive) {
                let o = P.getParentNode(1);
                return o.type === "Program" || o.type === "BlockStatement";
              }
              return m === "object" && D.type === "MemberExpression" && typeof A.value == "number";
            case "AssignmentExpression": {
              let o = P.getParentNode(1);
              return m === "body" && D.type === "ArrowFunctionExpression" ? !0 : m === "key" && (D.type === "ClassProperty" || D.type === "PropertyDefinition") && D.computed || (m === "init" || m === "update") && D.type === "ForStatement" ? !1 : D.type === "ExpressionStatement" ? A.left.type === "ObjectPattern" : !(m === "key" && D.type === "TSPropertySignature" || D.type === "AssignmentExpression" || D.type === "SequenceExpression" && o && o.type === "ForStatement" && (o.init === D || o.update === D) || m === "value" && D.type === "Property" && o && o.type === "ObjectPattern" && o.properties.includes(D) || D.type === "NGChainedExpression");
            }
            case "ConditionalExpression":
              switch (D.type) {
                case "TaggedTemplateExpression":
                case "UnaryExpression":
                case "SpreadElement":
                case "SpreadProperty":
                case "BinaryExpression":
                case "LogicalExpression":
                case "NGPipeExpression":
                case "ExportDefaultDeclaration":
                case "AwaitExpression":
                case "JSXSpreadAttribute":
                case "TSTypeAssertion":
                case "TypeCastExpression":
                case "TSAsExpression":
                case "TSNonNullExpression":
                  return !0;
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                  return m === "callee";
                case "ConditionalExpression":
                  return m === "test";
                case "MemberExpression":
                case "OptionalMemberExpression":
                  return m === "object";
                default:
                  return !1;
              }
            case "FunctionExpression":
              switch (D.type) {
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                  return m === "callee";
                case "TaggedTemplateExpression":
                  return !0;
                default:
                  return !1;
              }
            case "ArrowFunctionExpression":
              switch (D.type) {
                case "BinaryExpression":
                  return D.operator !== "|>" || A.extra && A.extra.parenthesized;
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                  return m === "callee";
                case "MemberExpression":
                case "OptionalMemberExpression":
                  return m === "object";
                case "TSAsExpression":
                case "TSNonNullExpression":
                case "BindExpression":
                case "TaggedTemplateExpression":
                case "UnaryExpression":
                case "LogicalExpression":
                case "AwaitExpression":
                case "TSTypeAssertion":
                  return !0;
                case "ConditionalExpression":
                  return m === "test";
                default:
                  return !1;
              }
            case "ClassExpression":
              if (a(A.decorators))
                return !0;
              switch (D.type) {
                case "NewExpression":
                  return m === "callee";
                default:
                  return !1;
              }
            case "OptionalMemberExpression":
            case "OptionalCallExpression": {
              let o = P.getParentNode(1);
              if (m === "object" && D.type === "MemberExpression" || m === "callee" && (D.type === "CallExpression" || D.type === "NewExpression") || D.type === "TSNonNullExpression" && o.type === "MemberExpression" && o.object === D)
                return !0;
            }
            case "CallExpression":
            case "MemberExpression":
            case "TaggedTemplateExpression":
            case "TSNonNullExpression":
              if (m === "callee" && (D.type === "BindExpression" || D.type === "NewExpression")) {
                let o = A;
                for (; o; )
                  switch (o.type) {
                    case "CallExpression":
                    case "OptionalCallExpression":
                      return !0;
                    case "MemberExpression":
                    case "OptionalMemberExpression":
                    case "BindExpression":
                      o = o.object;
                      break;
                    case "TaggedTemplateExpression":
                      o = o.tag;
                      break;
                    case "TSNonNullExpression":
                      o = o.expression;
                      break;
                    default:
                      return !1;
                  }
              }
              return !1;
            case "BindExpression":
              return m === "callee" && (D.type === "BindExpression" || D.type === "NewExpression") || m === "object" && d(D);
            case "NGPipeExpression":
              return !(D.type === "NGRoot" || D.type === "NGMicrosyntaxExpression" || D.type === "ObjectProperty" && !(A.extra && A.extra.parenthesized) || D.type === "ArrayExpression" || p(D) && D.arguments[m] === A || m === "right" && D.type === "NGPipeExpression" || m === "property" && D.type === "MemberExpression" || D.type === "AssignmentExpression");
            case "JSXFragment":
            case "JSXElement":
              return m === "callee" || m === "left" && D.type === "BinaryExpression" && D.operator === "<" || D.type !== "ArrayExpression" && D.type !== "ArrowFunctionExpression" && D.type !== "AssignmentExpression" && D.type !== "AssignmentPattern" && D.type !== "BinaryExpression" && D.type !== "NewExpression" && D.type !== "ConditionalExpression" && D.type !== "ExpressionStatement" && D.type !== "JsExpressionRoot" && D.type !== "JSXAttribute" && D.type !== "JSXElement" && D.type !== "JSXExpressionContainer" && D.type !== "JSXFragment" && D.type !== "LogicalExpression" && !p(D) && !g(D) && D.type !== "ReturnStatement" && D.type !== "ThrowStatement" && D.type !== "TypeCastExpression" && D.type !== "VariableDeclarator" && D.type !== "YieldExpression";
            case "TypeAnnotation":
              return m === "returnType" && D.type === "ArrowFunctionExpression" && x(A);
          }
          return !1;
        }
        function k(P) {
          return P.type === "BlockStatement" || P.type === "BreakStatement" || P.type === "ClassBody" || P.type === "ClassDeclaration" || P.type === "ClassMethod" || P.type === "ClassProperty" || P.type === "PropertyDefinition" || P.type === "ClassPrivateProperty" || P.type === "ContinueStatement" || P.type === "DebuggerStatement" || P.type === "DeclareClass" || P.type === "DeclareExportAllDeclaration" || P.type === "DeclareExportDeclaration" || P.type === "DeclareFunction" || P.type === "DeclareInterface" || P.type === "DeclareModule" || P.type === "DeclareModuleExports" || P.type === "DeclareVariable" || P.type === "DoWhileStatement" || P.type === "EnumDeclaration" || P.type === "ExportAllDeclaration" || P.type === "ExportDefaultDeclaration" || P.type === "ExportNamedDeclaration" || P.type === "ExpressionStatement" || P.type === "ForInStatement" || P.type === "ForOfStatement" || P.type === "ForStatement" || P.type === "FunctionDeclaration" || P.type === "IfStatement" || P.type === "ImportDeclaration" || P.type === "InterfaceDeclaration" || P.type === "LabeledStatement" || P.type === "MethodDefinition" || P.type === "ReturnStatement" || P.type === "SwitchStatement" || P.type === "ThrowStatement" || P.type === "TryStatement" || P.type === "TSDeclareFunction" || P.type === "TSEnumDeclaration" || P.type === "TSImportEqualsDeclaration" || P.type === "TSInterfaceDeclaration" || P.type === "TSModuleDeclaration" || P.type === "TSNamespaceExportDeclaration" || P.type === "TypeAlias" || P.type === "VariableDeclaration" || P.type === "WhileStatement" || P.type === "WithStatement";
        }
        function v(P) {
          let E = 0, D = P.getValue();
          for (; D; ) {
            let m = P.getParentNode(E++);
            if (m && m.type === "ForStatement" && m.init === D)
              return !0;
            D = m;
          }
          return !1;
        }
        function x(P) {
          return s(P, (E) => E.type === "ObjectTypeAnnotation" && s(E, (D) => D.type === "FunctionTypeAnnotation" || void 0) || void 0);
        }
        function B(P) {
          switch (P.type) {
            case "ObjectExpression":
              return !0;
            default:
              return !1;
          }
        }
        function I(P) {
          let E = P.getValue(), D = P.getParentNode(), m = P.getName();
          switch (D.type) {
            case "NGPipeExpression":
              if (typeof m == "number" && D.arguments[m] === E && D.arguments.length - 1 === m)
                return P.callParent(I);
              break;
            case "ObjectProperty":
              if (m === "value") {
                let A = P.getParentNode(1);
                return n(A.properties) === D;
              }
              break;
            case "BinaryExpression":
            case "LogicalExpression":
              if (m === "right")
                return P.callParent(I);
              break;
            case "ConditionalExpression":
              if (m === "alternate")
                return P.callParent(I);
              break;
            case "UnaryExpression":
              if (D.prefix)
                return P.callParent(I);
              break;
          }
          return !1;
        }
        function j(P, E) {
          let D = P.getValue(), m = P.getParentNode();
          return D.type === "FunctionExpression" || D.type === "ClassExpression" ? m.type === "ExportDefaultDeclaration" || !w(P, E) : !u(D) || m.type !== "ExportDefaultDeclaration" && w(P, E) ? !1 : P.call((A) => j(A, E), ...e(P, D));
        }
        l.exports = w;
      } }), Tu = Z({ "src/language-js/print-preprocess.js"(r, l) {
        te();
        function n(a, i) {
          switch (i.parser) {
            case "json":
            case "json5":
            case "json-stringify":
            case "__js_expression":
            case "__vue_expression":
            case "__vue_ts_expression":
              return Object.assign(Object.assign({}, a), {}, { type: i.parser.startsWith("__") ? "JsExpressionRoot" : "JsonRoot", node: a, comments: [], rootMarker: i.rootMarker });
            default:
              return a;
          }
        }
        l.exports = n;
      } }), Ds = Z({ "src/language-js/print/html-binding.js"(r, l) {
        te();
        var { builders: { join: n, line: a, group: i, softline: e, indent: t } } = Ye();
        function u(c, C, f) {
          let h = c.getValue();
          if (C.__onHtmlBindingRoot && c.getName() === null && C.__onHtmlBindingRoot(h, C), h.type === "File") {
            if (C.__isVueForBindingLeft)
              return c.call((p) => {
                let d = n([",", a], p.map(f, "params")), { params: g } = p.getValue();
                return g.length === 1 ? d : ["(", t([e, i(d)]), e, ")"];
              }, "program", "body", 0);
            if (C.__isVueBindings)
              return c.call((p) => n([",", a], p.map(f, "params")), "program", "body", 0);
          }
        }
        function s(c) {
          switch (c.type) {
            case "MemberExpression":
              switch (c.property.type) {
                case "Identifier":
                case "NumericLiteral":
                case "StringLiteral":
                  return s(c.object);
              }
              return !1;
            case "Identifier":
              return !0;
            default:
              return !1;
          }
        }
        l.exports = { isVueEventBindingExpression: s, printHtmlBinding: u };
      } }), dr = Z({ "src/language-js/print/binaryish.js"(r, l) {
        te();
        var { printComments: n } = vt(), { getLast: a } = ot(), { builders: { join: i, line: e, softline: t, group: u, indent: s, align: c, ifBreak: C, indentIfBreak: f }, utils: { cleanDoc: h, getDocParts: p, isConcat: d } } = Ye(), { hasLeadingOwnLineComment: g, isBinaryish: w, isJsxNode: k, shouldFlatten: v, hasComment: x, CommentCheckFlags: B, isCallExpression: I, isMemberExpression: j, isObjectProperty: P, isEnabledHackPipeline: E } = mt(), D = 0;
        function m(F, y, T) {
          let b = F.getValue(), S = F.getParentNode(), L = F.getParentNode(1), R = b !== S.body && (S.type === "IfStatement" || S.type === "WhileStatement" || S.type === "SwitchStatement" || S.type === "DoWhileStatement"), O = E(y) && b.operator === "|>", U = A(F, T, y, !1, R);
          if (R)
            return U;
          if (O)
            return u(U);
          if (I(S) && S.callee === b || S.type === "UnaryExpression" || j(S) && !S.computed)
            return u([s([t, ...U]), t]);
          let V = S.type === "ReturnStatement" || S.type === "ThrowStatement" || S.type === "JSXExpressionContainer" && L.type === "JSXAttribute" || b.operator !== "|" && S.type === "JsExpressionRoot" || b.type !== "NGPipeExpression" && (S.type === "NGRoot" && y.parser === "__ng_binding" || S.type === "NGMicrosyntaxExpression" && L.type === "NGMicrosyntax" && L.body.length === 1) || b === S.body && S.type === "ArrowFunctionExpression" || b !== S.body && S.type === "ForStatement" || S.type === "ConditionalExpression" && L.type !== "ReturnStatement" && L.type !== "ThrowStatement" && !I(L) || S.type === "TemplateLiteral", _ = S.type === "AssignmentExpression" || S.type === "VariableDeclarator" || S.type === "ClassProperty" || S.type === "PropertyDefinition" || S.type === "TSAbstractPropertyDefinition" || S.type === "ClassPrivateProperty" || P(S), Y = w(b.left) && v(b.operator, b.left.operator);
          if (V || o(b) && !Y || !o(b) && _)
            return u(U);
          if (U.length === 0)
            return "";
          let H = k(b.right), $ = U.findIndex((W) => typeof W != "string" && !Array.isArray(W) && W.type === "group"), K = U.slice(0, $ === -1 ? 1 : $ + 1), ne = U.slice(K.length, H ? -1 : void 0), ee = Symbol("logicalChain-" + ++D), pe = u([...K, s(ne)], { id: ee });
          if (!H)
            return pe;
          let J = a(U);
          return u([pe, f(J, { groupId: ee })]);
        }
        function A(F, y, T, b, S) {
          let L = F.getValue();
          if (!w(L))
            return [u(y())];
          let R = [];
          v(L.operator, L.left.operator) ? R = F.call((ne) => A(ne, y, T, !0, S), "left") : R.push(u(y("left")));
          let O = o(L), U = (L.operator === "|>" || L.type === "NGPipeExpression" || L.operator === "|" && T.parser === "__vue_expression") && !g(T.originalText, L.right), V = L.type === "NGPipeExpression" ? "|" : L.operator, _ = L.type === "NGPipeExpression" && L.arguments.length > 0 ? u(s([t, ": ", i([t, ":", C(" ")], F.map(y, "arguments").map((ne) => c(2, u(ne))))])) : "", Y;
          if (O)
            Y = [V, " ", y("right"), _];
          else {
            let ne = E(T) && V === "|>" ? F.call((ee) => A(ee, y, T, !0, S), "right") : y("right");
            Y = [U ? e : "", V, U ? " " : e, ne, _];
          }
          let H = F.getParentNode(), $ = x(L.left, B.Trailing | B.Line), K = $ || !(S && L.type === "LogicalExpression") && H.type !== L.type && L.left.type !== L.type && L.right.type !== L.type;
          if (R.push(U ? "" : " ", K ? u(Y, { shouldBreak: $ }) : Y), b && x(L)) {
            let ne = h(n(F, R, T));
            return d(ne) || ne.type === "fill" ? p(ne) : [ne];
          }
          return R;
        }
        function o(F) {
          return F.type !== "LogicalExpression" ? !1 : !!(F.right.type === "ObjectExpression" && F.right.properties.length > 0 || F.right.type === "ArrayExpression" && F.right.elements.length > 0 || k(F.right));
        }
        l.exports = { printBinaryishExpression: m, shouldInlineLogicalExpression: o };
      } }), fs = Z({ "src/language-js/print/angular.js"(r, l) {
        te();
        var { builders: { join: n, line: a, group: i } } = Ye(), { hasNode: e, hasComment: t, getComments: u } = mt(), { printBinaryishExpression: s } = dr();
        function c(h, p, d) {
          let g = h.getValue();
          if (g.type.startsWith("NG"))
            switch (g.type) {
              case "NGRoot":
                return [d("node"), t(g.node) ? " //" + u(g.node)[0].value.trimEnd() : ""];
              case "NGPipeExpression":
                return s(h, p, d);
              case "NGChainedExpression":
                return i(n([";", a], h.map((w) => f(w) ? d() : ["(", d(), ")"], "expressions")));
              case "NGEmptyExpression":
                return "";
              case "NGQuotedExpression":
                return [g.prefix, ": ", g.value.trim()];
              case "NGMicrosyntax":
                return h.map((w, k) => [k === 0 ? "" : C(w.getValue(), k, g) ? " " : [";", a], d()], "body");
              case "NGMicrosyntaxKey":
                return /^[$_a-z][\w$]*(?:-[$_a-z][\w$])*$/i.test(g.name) ? g.name : JSON.stringify(g.name);
              case "NGMicrosyntaxExpression":
                return [d("expression"), g.alias === null ? "" : [" as ", d("alias")]];
              case "NGMicrosyntaxKeyedExpression": {
                let w = h.getName(), k = h.getParentNode(), v = C(g, w, k) || (w === 1 && (g.key.name === "then" || g.key.name === "else") || w === 2 && g.key.name === "else" && k.body[w - 1].type === "NGMicrosyntaxKeyedExpression" && k.body[w - 1].key.name === "then") && k.body[0].type === "NGMicrosyntaxExpression";
                return [d("key"), v ? " " : ": ", d("expression")];
              }
              case "NGMicrosyntaxLet":
                return ["let ", d("key"), g.value === null ? "" : [" = ", d("value")]];
              case "NGMicrosyntaxAs":
                return [d("key"), " as ", d("alias")];
              default:
                throw new Error("Unknown Angular node type: ".concat(JSON.stringify(g.type), "."));
            }
        }
        function C(h, p, d) {
          return h.type === "NGMicrosyntaxKeyedExpression" && h.key.name === "of" && p === 1 && d.body[0].type === "NGMicrosyntaxLet" && d.body[0].value === null;
        }
        function f(h) {
          return e(h.getValue(), (p) => {
            switch (p.type) {
              case void 0:
                return !1;
              case "CallExpression":
              case "OptionalCallExpression":
              case "AssignmentExpression":
                return !0;
            }
          });
        }
        l.exports = { printAngular: c };
      } }), ms = Z({ "src/language-js/print/jsx.js"(r, l) {
        te();
        var { printComments: n, printDanglingComments: a } = vt(), { builders: { line: i, hardline: e, softline: t, group: u, indent: s, conditionalGroup: c, fill: C, ifBreak: f, lineSuffixBoundary: h, join: p }, utils: { willBreak: d } } = Ye(), { getLast: g, getPreferredQuote: w } = ot(), { isJsxNode: k, rawText: v, isLiteral: x, isCallExpression: B, isStringLiteral: I, isBinaryish: j, hasComment: P, CommentCheckFlags: E, hasNodeIgnoreComment: D } = mt(), m = Zt(), { willPrintOwnComments: A } = Su(), o = (ae) => ae === "" || ae === i || ae === e || ae === t;
        function F(ae, q, X) {
          let G = ae.getValue();
          if (G.type === "JSXElement" && J(G))
            return [X("openingElement"), X("closingElement")];
          let le = G.type === "JSXElement" ? X("openingElement") : X("openingFragment"), Ee = G.type === "JSXElement" ? X("closingElement") : X("closingFragment");
          if (G.children.length === 1 && G.children[0].type === "JSXExpressionContainer" && (G.children[0].expression.type === "TemplateLiteral" || G.children[0].expression.type === "TaggedTemplateExpression"))
            return [le, ...ae.map(X, "children"), Ee];
          G.children = G.children.map((Se) => se(Se) ? { type: "JSXText", value: " ", raw: " " } : Se);
          let Te = G.children.some(k), $e = G.children.filter((Se) => Se.type === "JSXExpressionContainer").length > 1, qe = G.type === "JSXElement" && G.openingElement.attributes.length > 1, ce = d(le) || Te || qe || $e, De = ae.getParentNode().rootMarker === "mdx", he = q.singleQuote ? "{' '}" : '{" "}', ue = De ? " " : f([he, t], " "), xe = G.openingElement && G.openingElement.name && G.openingElement.name.name === "fbt", Q = y(ae, q, X, ue, xe), ve = G.children.some((Se) => W(Se));
          for (let Se = Q.length - 2; Se >= 0; Se--) {
            let ye = Q[Se] === "" && Q[Se + 1] === "", N = Q[Se] === e && Q[Se + 1] === "" && Q[Se + 2] === e, z = (Q[Se] === t || Q[Se] === e) && Q[Se + 1] === "" && Q[Se + 2] === ue, ie = Q[Se] === ue && Q[Se + 1] === "" && (Q[Se + 2] === t || Q[Se + 2] === e), Be = Q[Se] === ue && Q[Se + 1] === "" && Q[Se + 2] === ue, nt = Q[Se] === t && Q[Se + 1] === "" && Q[Se + 2] === e || Q[Se] === e && Q[Se + 1] === "" && Q[Se + 2] === t;
            N && ve || ye || z || Be || nt ? Q.splice(Se, 2) : ie && Q.splice(Se + 1, 2);
          }
          for (; Q.length > 0 && o(g(Q)); )
            Q.pop();
          for (; Q.length > 1 && o(Q[0]) && o(Q[1]); )
            Q.shift(), Q.shift();
          let Ae = [];
          for (let [Se, ye] of Q.entries()) {
            if (ye === ue) {
              if (Se === 1 && Q[Se - 1] === "") {
                if (Q.length === 2) {
                  Ae.push(he);
                  continue;
                }
                Ae.push([he, e]);
                continue;
              } else if (Se === Q.length - 1) {
                Ae.push(he);
                continue;
              } else if (Q[Se - 1] === "" && Q[Se - 2] === e) {
                Ae.push(he);
                continue;
              }
            }
            Ae.push(ye), d(ye) && (ce = !0);
          }
          let be = ve ? C(Ae) : u(Ae, { shouldBreak: !0 });
          if (De)
            return be;
          let We = u([le, s([e, be]), e, Ee]);
          return ce ? We : c([u([le, ...Q, Ee]), We]);
        }
        function y(ae, q, X, G, le) {
          let Ee = [];
          return ae.each((Te, $e, qe) => {
            let ce = Te.getValue();
            if (x(ce)) {
              let De = v(ce);
              if (W(ce)) {
                let he = De.split(ne);
                if (he[0] === "") {
                  if (Ee.push(""), he.shift(), /\n/.test(he[0])) {
                    let xe = qe[$e + 1];
                    Ee.push(b(le, he[1], ce, xe));
                  } else
                    Ee.push(G);
                  he.shift();
                }
                let ue;
                if (g(he) === "" && (he.pop(), ue = he.pop()), he.length === 0)
                  return;
                for (let [xe, Q] of he.entries())
                  xe % 2 === 1 ? Ee.push(i) : Ee.push(Q);
                if (ue !== void 0)
                  if (/\n/.test(ue)) {
                    let xe = qe[$e + 1];
                    Ee.push(b(le, g(Ee), ce, xe));
                  } else
                    Ee.push(G);
                else {
                  let xe = qe[$e + 1];
                  Ee.push(T(le, g(Ee), ce, xe));
                }
              } else
                /\n/.test(De) ? De.match(/\n/g).length > 1 && Ee.push("", e) : Ee.push("", G);
            } else {
              let De = X();
              Ee.push(De);
              let he = qe[$e + 1];
              if (he && W(he)) {
                let ue = pe(v(he)).split(ne)[0];
                Ee.push(T(le, ue, ce, he));
              } else
                Ee.push(e);
            }
          }, "children"), Ee;
        }
        function T(ae, q, X, G) {
          return ae ? "" : X.type === "JSXElement" && !X.closingElement || G && G.type === "JSXElement" && !G.closingElement ? q.length === 1 ? t : e : t;
        }
        function b(ae, q, X, G) {
          return ae ? e : q.length === 1 ? X.type === "JSXElement" && !X.closingElement || G && G.type === "JSXElement" && !G.closingElement ? e : t : e;
        }
        function S(ae, q, X) {
          let G = ae.getParentNode();
          if (!G || { ArrayExpression: !0, JSXAttribute: !0, JSXElement: !0, JSXExpressionContainer: !0, JSXFragment: !0, ExpressionStatement: !0, CallExpression: !0, OptionalCallExpression: !0, ConditionalExpression: !0, JsExpressionRoot: !0 }[G.type])
            return q;
          let le = ae.match(void 0, (Te) => Te.type === "ArrowFunctionExpression", B, (Te) => Te.type === "JSXExpressionContainer"), Ee = m(ae, X);
          return u([Ee ? "" : f("("), s([t, q]), t, Ee ? "" : f(")")], { shouldBreak: le });
        }
        function L(ae, q, X) {
          let G = ae.getValue(), le = [];
          if (le.push(X("name")), G.value) {
            let Ee;
            if (I(G.value)) {
              let Te = v(G.value).slice(1, -1).replace(/&apos;/g, "'").replace(/&quot;/g, '"'), { escaped: $e, quote: qe, regex: ce } = w(Te, q.jsxSingleQuote ? "'" : '"');
              Te = Te.replace(ce, $e), Ee = [qe, Te, qe];
            } else
              Ee = X("value");
            le.push("=", Ee);
          }
          return le;
        }
        function R(ae, q, X) {
          let G = ae.getValue(), le = (Ee, Te) => Ee.type === "JSXEmptyExpression" || !P(Ee) && (Ee.type === "ArrayExpression" || Ee.type === "ObjectExpression" || Ee.type === "ArrowFunctionExpression" || Ee.type === "AwaitExpression" && (le(Ee.argument, Ee) || Ee.argument.type === "JSXElement") || B(Ee) || Ee.type === "FunctionExpression" || Ee.type === "TemplateLiteral" || Ee.type === "TaggedTemplateExpression" || Ee.type === "DoExpression" || k(Te) && (Ee.type === "ConditionalExpression" || j(Ee)));
          return le(G.expression, ae.getParentNode(0)) ? u(["{", X("expression"), h, "}"]) : u(["{", s([t, X("expression")]), t, h, "}"]);
        }
        function O(ae, q, X) {
          let G = ae.getValue(), le = G.name && P(G.name) || G.typeParameters && P(G.typeParameters);
          if (G.selfClosing && G.attributes.length === 0 && !le)
            return ["<", X("name"), X("typeParameters"), " />"];
          if (G.attributes && G.attributes.length === 1 && G.attributes[0].value && I(G.attributes[0].value) && !G.attributes[0].value.value.includes(`
`) && !le && !P(G.attributes[0]))
            return u(["<", X("name"), X("typeParameters"), " ", ...ae.map(X, "attributes"), G.selfClosing ? " />" : ">"]);
          let Ee = G.attributes.length > 0 && P(g(G.attributes), E.Trailing), Te = G.attributes.length === 0 && !le || (q.bracketSameLine || q.jsxBracketSameLine) && (!le || G.attributes.length > 0) && !Ee, $e = G.attributes && G.attributes.some((ce) => ce.value && I(ce.value) && ce.value.value.includes(`
`)), qe = q.singleAttributePerLine && G.attributes.length > 1 ? e : i;
          return u(["<", X("name"), X("typeParameters"), s(ae.map(() => [qe, X()], "attributes")), G.selfClosing ? i : Te ? ">" : t, G.selfClosing ? "/>" : Te ? "" : ">"], { shouldBreak: $e });
        }
        function U(ae, q, X) {
          let G = ae.getValue(), le = [];
          le.push("</");
          let Ee = X("name");
          return P(G.name, E.Leading | E.Line) ? le.push(s([e, Ee]), e) : P(G.name, E.Leading | E.Block) ? le.push(" ", Ee) : le.push(Ee), le.push(">"), le;
        }
        function V(ae, q) {
          let X = ae.getValue(), G = P(X), le = P(X, E.Line), Ee = X.type === "JSXOpeningFragment";
          return [Ee ? "<" : "</", s([le ? e : G && !Ee ? " " : "", a(ae, q, !0)]), le ? e : "", ">"];
        }
        function _(ae, q, X) {
          let G = n(ae, F(ae, q, X), q);
          return S(ae, G, q);
        }
        function Y(ae, q) {
          let X = ae.getValue(), G = P(X, E.Line);
          return [a(ae, q, !G), G ? e : ""];
        }
        function H(ae, q, X) {
          let G = ae.getValue();
          return ["{", ae.call((le) => {
            let Ee = ["...", X()], Te = le.getValue();
            return !P(Te) || !A(le) ? Ee : [s([t, n(le, Ee, q)]), t];
          }, G.type === "JSXSpreadAttribute" ? "argument" : "expression"), "}"];
        }
        function $(ae, q, X) {
          let G = ae.getValue();
          if (G.type.startsWith("JSX"))
            switch (G.type) {
              case "JSXAttribute":
                return L(ae, q, X);
              case "JSXIdentifier":
                return String(G.name);
              case "JSXNamespacedName":
                return p(":", [X("namespace"), X("name")]);
              case "JSXMemberExpression":
                return p(".", [X("object"), X("property")]);
              case "JSXSpreadAttribute":
                return H(ae, q, X);
              case "JSXSpreadChild":
                return H(ae, q, X);
              case "JSXExpressionContainer":
                return R(ae, q, X);
              case "JSXFragment":
              case "JSXElement":
                return _(ae, q, X);
              case "JSXOpeningElement":
                return O(ae, q, X);
              case "JSXClosingElement":
                return U(ae, q, X);
              case "JSXOpeningFragment":
              case "JSXClosingFragment":
                return V(ae, q);
              case "JSXEmptyExpression":
                return Y(ae, q);
              case "JSXText":
                throw new Error("JSXTest should be handled by JSXElement");
              default:
                throw new Error("Unknown JSX node type: ".concat(JSON.stringify(G.type), "."));
            }
        }
        var K = ` 
\r	`, ne = new RegExp("([" + K + "]+)"), ee = new RegExp("[^" + K + "]"), pe = (ae) => ae.replace(new RegExp("(?:^" + ne.source + "|" + ne.source + "$)"), "");
        function J(ae) {
          if (ae.children.length === 0)
            return !0;
          if (ae.children.length > 1)
            return !1;
          let q = ae.children[0];
          return x(q) && !W(q);
        }
        function W(ae) {
          return x(ae) && (ee.test(v(ae)) || !/\n/.test(v(ae)));
        }
        function se(ae) {
          return ae.type === "JSXExpressionContainer" && x(ae.expression) && ae.expression.value === " " && !P(ae.expression);
        }
        function fe(ae) {
          let q = ae.getValue(), X = ae.getParentNode();
          if (!X || !q || !k(q) || !k(X))
            return !1;
          let G = X.children.indexOf(q), le = null;
          for (let Ee = G; Ee > 0; Ee--) {
            let Te = X.children[Ee - 1];
            if (!(Te.type === "JSXText" && !W(Te))) {
              le = Te;
              break;
            }
          }
          return le && le.type === "JSXExpressionContainer" && le.expression.type === "JSXEmptyExpression" && D(le.expression);
        }
        l.exports = { hasJsxIgnoreComment: fe, printJsx: $ };
      } }), Pt = Z({ "src/language-js/print/misc.js"(r, l) {
        te();
        var { isNonEmptyArray: n } = ot(), { builders: { indent: a, join: i, line: e } } = Ye(), { isFlowAnnotationComment: t } = mt();
        function u(g) {
          let w = g.getValue();
          return !w.optional || w.type === "Identifier" && w === g.getParentNode().key ? "" : w.type === "OptionalCallExpression" || w.type === "OptionalMemberExpression" && w.computed ? "?." : "?";
        }
        function s(g) {
          return g.getValue().definite || g.match(void 0, (w, k) => k === "id" && w.type === "VariableDeclarator" && w.definite) ? "!" : "";
        }
        function c(g, w, k) {
          let v = g.getValue();
          return v.typeArguments ? k("typeArguments") : v.typeParameters ? k("typeParameters") : "";
        }
        function C(g, w, k) {
          let v = g.getValue();
          if (!v.typeAnnotation)
            return "";
          let x = g.getParentNode(), B = x.type === "DeclareFunction" && x.id === v;
          return t(w.originalText, v.typeAnnotation) ? [" /*: ", k("typeAnnotation"), " */"] : [B ? "" : ": ", k("typeAnnotation")];
        }
        function f(g, w, k) {
          return ["::", k("callee")];
        }
        function h(g, w, k) {
          let v = g.getValue();
          return n(v.modifiers) ? [i(" ", g.map(k, "modifiers")), " "] : "";
        }
        function p(g, w, k) {
          return g.type === "EmptyStatement" ? ";" : g.type === "BlockStatement" || k ? [" ", w] : a([e, w]);
        }
        function d(g, w, k) {
          return ["...", k("argument"), C(g, w, k)];
        }
        l.exports = { printOptionalToken: u, printDefiniteToken: s, printFunctionTypeParameters: c, printBindExpressionCallee: f, printTypeScriptModifiers: h, printTypeAnnotation: C, printRestSpread: d, adjustClause: p };
      } }), dn = Z({ "src/language-js/print/array.js"(r, l) {
        te();
        var { printDanglingComments: n } = vt(), { builders: { line: a, softline: i, hardline: e, group: t, indent: u, ifBreak: s, fill: c } } = Ye(), { getLast: C, hasNewline: f } = ot(), { shouldPrintComma: h, hasComment: p, CommentCheckFlags: d, isNextLineEmpty: g, isNumericLiteral: w, isSignedNumericLiteral: k } = mt(), { locStart: v } = wt(), { printOptionalToken: x, printTypeAnnotation: B } = Pt();
        function I(D, m, A) {
          let o = D.getValue(), F = [], y = o.type === "TupleExpression" ? "#[" : "[", T = "]";
          if (o.elements.length === 0)
            p(o, d.Dangling) ? F.push(t([y, n(D, m), i, T])) : F.push(y, T);
          else {
            let b = C(o.elements), S = !(b && b.type === "RestElement"), L = b === null, R = Symbol("array"), O = !m.__inJestEach && o.elements.length > 1 && o.elements.every((_, Y, H) => {
              let $ = _ && _.type;
              if ($ !== "ArrayExpression" && $ !== "ObjectExpression")
                return !1;
              let K = H[Y + 1];
              if (K && $ !== K.type)
                return !1;
              let ne = $ === "ArrayExpression" ? "elements" : "properties";
              return _[ne] && _[ne].length > 1;
            }), U = j(o, m), V = S ? L ? "," : h(m) ? U ? s(",", "", { groupId: R }) : s(",") : "" : "";
            F.push(t([y, u([i, U ? E(D, m, A, V) : [P(D, m, "elements", A), V], n(D, m, !0)]), i, T], { shouldBreak: O, id: R }));
          }
          return F.push(x(D), B(D, m, A)), F;
        }
        function j(D, m) {
          return D.elements.length > 1 && D.elements.every((A) => A && (w(A) || k(A) && !p(A.argument)) && !p(A, d.Trailing | d.Line, (o) => !f(m.originalText, v(o), { backwards: !0 })));
        }
        function P(D, m, A, o) {
          let F = [], y = [];
          return D.each((T) => {
            F.push(y, t(o())), y = [",", a], T.getValue() && g(T.getValue(), m) && y.push(i);
          }, A), F;
        }
        function E(D, m, A, o) {
          let F = [];
          return D.each((y, T, b) => {
            let S = T === b.length - 1;
            F.push([A(), S ? o : ","]), S || F.push(g(y.getValue(), m) ? [e, e] : p(b[T + 1], d.Leading | d.Line) ? e : a);
          }, "elements"), c(F);
        }
        l.exports = { printArray: I, printArrayItems: P, isConciselyPrintedArray: j };
      } }), Bu = Z({ "src/language-js/print/call-arguments.js"(r, l) {
        te();
        var { printDanglingComments: n } = vt(), { getLast: a, getPenultimate: i } = ot(), { getFunctionParameters: e, hasComment: t, CommentCheckFlags: u, isFunctionCompositionArgs: s, isJsxNode: c, isLongCurriedCallExpression: C, shouldPrintComma: f, getCallArguments: h, iterateCallArgumentsPath: p, isNextLineEmpty: d, isCallExpression: g, isStringLiteral: w, isObjectProperty: k } = mt(), { builders: { line: v, hardline: x, softline: B, group: I, indent: j, conditionalGroup: P, ifBreak: E, breakParent: D }, utils: { willBreak: m } } = Ye(), { ArgExpansionBailout: A } = ln(), { isConciselyPrintedArray: o } = dn();
        function F(O, U, V) {
          let _ = O.getValue(), Y = _.type === "ImportExpression", H = h(_);
          if (H.length === 0)
            return ["(", n(O, U, !0), ")"];
          if (S(H))
            return ["(", V(["arguments", 0]), ", ", V(["arguments", 1]), ")"];
          let $ = !1, K = !1, ne = H.length - 1, ee = [];
          p(O, (ae, q) => {
            let X = ae.getNode(), G = [V()];
            q === ne || (d(X, U) ? (q === 0 && (K = !0), $ = !0, G.push(",", x, x)) : G.push(",", v)), ee.push(G);
          });
          let pe = !(Y || _.callee && _.callee.type === "Import") && f(U, "all") ? "," : "";
          function J() {
            return I(["(", j([v, ...ee]), pe, v, ")"], { shouldBreak: !0 });
          }
          if ($ || O.getParentNode().type !== "Decorator" && s(H))
            return J();
          let W = b(H), se = T(H, U);
          if (W || se) {
            if (W ? ee.slice(1).some(m) : ee.slice(0, -1).some(m))
              return J();
            let ae = [];
            try {
              O.try(() => {
                p(O, (q, X) => {
                  W && X === 0 && (ae = [[V([], { expandFirstArg: !0 }), ee.length > 1 ? "," : "", K ? x : v, K ? x : ""], ...ee.slice(1)]), se && X === ne && (ae = [...ee.slice(0, -1), V([], { expandLastArg: !0 })]);
                });
              });
            } catch (q) {
              if (q instanceof A)
                return J();
              throw q;
            }
            return [ee.some(m) ? D : "", P([["(", ...ae, ")"], W ? ["(", I(ae[0], { shouldBreak: !0 }), ...ae.slice(1), ")"] : ["(", ...ee.slice(0, -1), I(a(ae), { shouldBreak: !0 }), ")"], J()])];
          }
          let fe = ["(", j([B, ...ee]), E(pe), B, ")"];
          return C(O) ? fe : I(fe, { shouldBreak: ee.some(m) || $ });
        }
        function y(O) {
          let U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return O.type === "ObjectExpression" && (O.properties.length > 0 || t(O)) || O.type === "ArrayExpression" && (O.elements.length > 0 || t(O)) || O.type === "TSTypeAssertion" && y(O.expression) || O.type === "TSAsExpression" && y(O.expression) || O.type === "FunctionExpression" || O.type === "ArrowFunctionExpression" && (!O.returnType || !O.returnType.typeAnnotation || O.returnType.typeAnnotation.type !== "TSTypeReference" || L(O.body)) && (O.body.type === "BlockStatement" || O.body.type === "ArrowFunctionExpression" && y(O.body, !0) || O.body.type === "ObjectExpression" || O.body.type === "ArrayExpression" || !U && (g(O.body) || O.body.type === "ConditionalExpression") || c(O.body)) || O.type === "DoExpression" || O.type === "ModuleExpression";
        }
        function T(O, U) {
          let V = a(O), _ = i(O);
          return !t(V, u.Leading) && !t(V, u.Trailing) && y(V) && (!_ || _.type !== V.type) && (O.length !== 2 || _.type !== "ArrowFunctionExpression" || V.type !== "ArrayExpression") && !(O.length > 1 && V.type === "ArrayExpression" && o(V, U));
        }
        function b(O) {
          if (O.length !== 2)
            return !1;
          let [U, V] = O;
          return U.type === "ModuleExpression" && R(V) ? !0 : !t(U) && (U.type === "FunctionExpression" || U.type === "ArrowFunctionExpression" && U.body.type === "BlockStatement") && V.type !== "FunctionExpression" && V.type !== "ArrowFunctionExpression" && V.type !== "ConditionalExpression" && !y(V);
        }
        function S(O) {
          return O.length === 2 && O[0].type === "ArrowFunctionExpression" && e(O[0]).length === 0 && O[0].body.type === "BlockStatement" && O[1].type === "ArrayExpression" && !O.some((U) => t(U));
        }
        function L(O) {
          return O.type === "BlockStatement" && (O.body.some((U) => U.type !== "EmptyStatement") || t(O, u.Dangling));
        }
        function R(O) {
          return O.type === "ObjectExpression" && O.properties.length === 1 && k(O.properties[0]) && O.properties[0].key.type === "Identifier" && O.properties[0].key.name === "type" && w(O.properties[0].value) && O.properties[0].value.value === "module";
        }
        l.exports = F;
      } }), wu = Z({ "src/language-js/print/member.js"(r, l) {
        te();
        var { builders: { softline: n, group: a, indent: i, label: e } } = Ye(), { isNumericLiteral: t, isMemberExpression: u, isCallExpression: s } = mt(), { printOptionalToken: c } = Pt();
        function C(h, p, d) {
          let g = h.getValue(), w = h.getParentNode(), k, v = 0;
          do
            k = h.getParentNode(v), v++;
          while (k && (u(k) || k.type === "TSNonNullExpression"));
          let x = d("object"), B = f(h, p, d), I = k && (k.type === "NewExpression" || k.type === "BindExpression" || k.type === "AssignmentExpression" && k.left.type !== "Identifier") || g.computed || g.object.type === "Identifier" && g.property.type === "Identifier" && !u(w) || (w.type === "AssignmentExpression" || w.type === "VariableDeclarator") && (s(g.object) && g.object.arguments.length > 0 || g.object.type === "TSNonNullExpression" && s(g.object.expression) && g.object.expression.arguments.length > 0 || x.label === "member-chain");
          return e(x.label === "member-chain" ? "member-chain" : "member", [x, I ? B : a(i([n, B]))]);
        }
        function f(h, p, d) {
          let g = d("property"), w = h.getValue(), k = c(h);
          return w.computed ? !w.property || t(w.property) ? [k, "[", g, "]"] : a([k, "[", i([n, g]), n, "]"]) : [k, ".", g];
        }
        l.exports = { printMemberExpression: C, printMemberLookup: f };
      } }), gs = Z({ "src/language-js/print/member-chain.js"(r, l) {
        te();
        var { printComments: n } = vt(), { getLast: a, isNextLineEmptyAfterIndex: i, getNextNonSpaceNonCommentCharacterIndex: e } = ot(), t = Zt(), { isCallExpression: u, isMemberExpression: s, isFunctionOrArrowExpression: c, isLongCurriedCallExpression: C, isMemberish: f, isNumericLiteral: h, isSimpleCallArgument: p, hasComment: d, CommentCheckFlags: g, isNextLineEmpty: w } = mt(), { locEnd: k } = wt(), { builders: { join: v, hardline: x, group: B, indent: I, conditionalGroup: j, breakParent: P, label: E }, utils: { willBreak: D } } = Ye(), m = Bu(), { printMemberLookup: A } = wu(), { printOptionalToken: o, printFunctionTypeParameters: F, printBindExpressionCallee: y } = Pt();
        function T(b, S, L) {
          let R = b.getParentNode(), O = !R || R.type === "ExpressionStatement", U = [];
          function V(he) {
            let { originalText: ue } = S, xe = e(ue, he, k);
            return ue.charAt(xe) === ")" ? xe !== !1 && i(ue, xe + 1) : w(he, S);
          }
          function _(he) {
            let ue = he.getValue();
            u(ue) && (f(ue.callee) || u(ue.callee)) ? (U.unshift({ node: ue, printed: [n(he, [o(he), F(he, S, L), m(he, S, L)], S), V(ue) ? x : ""] }), he.call((xe) => _(xe), "callee")) : f(ue) ? (U.unshift({ node: ue, needsParens: t(he, S), printed: n(he, s(ue) ? A(he, S, L) : y(he, S, L), S) }), he.call((xe) => _(xe), "object")) : ue.type === "TSNonNullExpression" ? (U.unshift({ node: ue, printed: n(he, "!", S) }), he.call((xe) => _(xe), "expression")) : U.unshift({ node: ue, printed: L() });
          }
          let Y = b.getValue();
          U.unshift({ node: Y, printed: [o(b), F(b, S, L), m(b, S, L)] }), Y.callee && b.call((he) => _(he), "callee");
          let H = [], $ = [U[0]], K = 1;
          for (; K < U.length && (U[K].node.type === "TSNonNullExpression" || u(U[K].node) || s(U[K].node) && U[K].node.computed && h(U[K].node.property)); ++K)
            $.push(U[K]);
          if (!u(U[0].node))
            for (; K + 1 < U.length && f(U[K].node) && f(U[K + 1].node); ++K)
              $.push(U[K]);
          H.push($), $ = [];
          let ne = !1;
          for (; K < U.length; ++K) {
            if (ne && f(U[K].node)) {
              if (U[K].node.computed && h(U[K].node.property)) {
                $.push(U[K]);
                continue;
              }
              H.push($), $ = [], ne = !1;
            }
            (u(U[K].node) || U[K].node.type === "ImportExpression") && (ne = !0), $.push(U[K]), d(U[K].node, g.Trailing) && (H.push($), $ = [], ne = !1);
          }
          $.length > 0 && H.push($);
          function ee(he) {
            return /^[A-Z]|^[$_]+$/.test(he);
          }
          function pe(he) {
            return he.length <= S.tabWidth;
          }
          function J(he) {
            let ue = he[1].length > 0 && he[1][0].node.computed;
            if (he[0].length === 1) {
              let Q = he[0][0].node;
              return Q.type === "ThisExpression" || Q.type === "Identifier" && (ee(Q.name) || O && pe(Q.name) || ue);
            }
            let xe = a(he[0]).node;
            return s(xe) && xe.property.type === "Identifier" && (ee(xe.property.name) || ue);
          }
          let W = H.length >= 2 && !d(H[1][0].node) && J(H);
          function se(he) {
            let ue = he.map((xe) => xe.printed);
            return he.length > 0 && a(he).needsParens ? ["(", ...ue, ")"] : ue;
          }
          function fe(he) {
            return he.length === 0 ? "" : I(B([x, v(x, he.map(se))]));
          }
          let ae = H.map(se), q = ae, X = W ? 3 : 2, G = H.flat(), le = G.slice(1, -1).some((he) => d(he.node, g.Leading)) || G.slice(0, -1).some((he) => d(he.node, g.Trailing)) || H[X] && d(H[X][0].node, g.Leading);
          if (H.length <= X && !le)
            return C(b) ? q : B(q);
          let Ee = a(H[W ? 1 : 0]).node, Te = !u(Ee) && V(Ee), $e = [se(H[0]), W ? H.slice(1, 2).map(se) : "", Te ? x : "", fe(H.slice(W ? 2 : 1))], qe = U.map((he) => {
            let { node: ue } = he;
            return ue;
          }).filter(u);
          function ce() {
            let he = a(a(H)).node, ue = a(ae);
            return u(he) && D(ue) && qe.slice(0, -1).some((xe) => xe.arguments.some(c));
          }
          let De;
          return le || qe.length > 2 && qe.some((he) => !he.arguments.every((ue) => p(ue, 0))) || ae.slice(0, -1).some(D) || ce() ? De = B($e) : De = [D(q) || Te ? P : "", j([q, $e])], E("member-chain", De);
        }
        l.exports = T;
      } }), Nu = Z({ "src/language-js/print/call-expression.js"(r, l) {
        te();
        var { builders: { join: n, group: a } } = Ye(), i = Zt(), { getCallArguments: e, hasFlowAnnotationComment: t, isCallExpression: u, isMemberish: s, isStringLiteral: c, isTemplateOnItsOwnLine: C, isTestCall: f, iterateCallArgumentsPath: h } = mt(), p = gs(), d = Bu(), { printOptionalToken: g, printFunctionTypeParameters: w } = Pt();
        function k(x, B, I) {
          let j = x.getValue(), P = x.getParentNode(), E = j.type === "NewExpression", D = j.type === "ImportExpression", m = g(x), A = e(j);
          if (A.length > 0 && (!D && !E && v(j, P) || A.length === 1 && C(A[0], B.originalText) || !E && f(j, P))) {
            let y = [];
            return h(x, () => {
              y.push(I());
            }), [E ? "new " : "", I("callee"), m, w(x, B, I), "(", n(", ", y), ")"];
          }
          let o = (B.parser === "babel" || B.parser === "babel-flow") && j.callee && j.callee.type === "Identifier" && t(j.callee.trailingComments);
          if (o && (j.callee.trailingComments[0].printed = !0), !D && !E && s(j.callee) && !x.call((y) => i(y, B), "callee"))
            return p(x, B, I);
          let F = [E ? "new " : "", D ? "import" : I("callee"), m, o ? "/*:: ".concat(j.callee.trailingComments[0].value.slice(2).trim(), " */") : "", w(x, B, I), d(x, B, I)];
          return D || u(j.callee) ? a(F) : F;
        }
        function v(x, B) {
          if (x.callee.type !== "Identifier")
            return !1;
          if (x.callee.name === "require")
            return !0;
          if (x.callee.name === "define") {
            let I = e(x);
            return B.type === "ExpressionStatement" && (I.length === 1 || I.length === 2 && I[0].type === "ArrayExpression" || I.length === 3 && c(I[0]) && I[1].type === "ArrayExpression");
          }
          return !1;
        }
        l.exports = { printCallExpression: k };
      } }), Dn = Z({ "src/language-js/print/assignment.js"(r, l) {
        te();
        var { isNonEmptyArray: n, getStringWidth: a } = ot(), { builders: { line: i, group: e, indent: t, indentIfBreak: u, lineSuffixBoundary: s }, utils: { cleanDoc: c, willBreak: C, canBreak: f } } = Ye(), { hasLeadingOwnLineComment: h, isBinaryish: p, isStringLiteral: d, isLiteral: g, isNumericLiteral: w, isCallExpression: k, isMemberExpression: v, getCallArguments: x, rawText: B, hasComment: I, isSignedNumericLiteral: j, isObjectProperty: P } = mt(), { shouldInlineLogicalExpression: E } = dr(), { printCallExpression: D } = Nu();
        function m(J, W, se, fe, ae, q) {
          let X = F(J, W, se, fe, q), G = se(q, { assignmentLayout: X });
          switch (X) {
            case "break-after-operator":
              return e([e(fe), ae, e(t([i, G]))]);
            case "never-break-after-operator":
              return e([e(fe), ae, " ", G]);
            case "fluid": {
              let le = Symbol("assignment");
              return e([e(fe), ae, e(t(i), { id: le }), s, u(G, { groupId: le })]);
            }
            case "break-lhs":
              return e([fe, ae, " ", e(G)]);
            case "chain":
              return [e(fe), ae, i, G];
            case "chain-tail":
              return [e(fe), ae, t([i, G])];
            case "chain-tail-arrow-chain":
              return [e(fe), ae, G];
            case "only-left":
              return fe;
          }
        }
        function A(J, W, se) {
          let fe = J.getValue();
          return m(J, W, se, se("left"), [" ", fe.operator], "right");
        }
        function o(J, W, se) {
          return m(J, W, se, se("id"), " =", "init");
        }
        function F(J, W, se, fe, ae) {
          let q = J.getValue(), X = q[ae];
          if (!X)
            return "only-left";
          let G = !b(X);
          if (J.match(b, S, (Ee) => !G || Ee.type !== "ExpressionStatement" && Ee.type !== "VariableDeclaration"))
            return G ? X.type === "ArrowFunctionExpression" && X.body.type === "ArrowFunctionExpression" ? "chain-tail-arrow-chain" : "chain-tail" : "chain";
          if (!G && b(X.right) || h(W.originalText, X))
            return "break-after-operator";
          if (X.type === "CallExpression" && X.callee.name === "require" || W.parser === "json5" || W.parser === "json")
            return "never-break-after-operator";
          if (T(q) || L(q) || U(q) || V(q) && f(fe))
            return "break-lhs";
          let le = ne(q, fe, W);
          return J.call(() => y(J, W, se, le), ae) ? "break-after-operator" : le || X.type === "TemplateLiteral" || X.type === "TaggedTemplateExpression" || X.type === "BooleanLiteral" || w(X) || X.type === "ClassExpression" ? "never-break-after-operator" : "fluid";
        }
        function y(J, W, se, fe) {
          let ae = J.getValue();
          if (p(ae) && !E(ae))
            return !0;
          switch (ae.type) {
            case "StringLiteralTypeAnnotation":
            case "SequenceExpression":
              return !0;
            case "ConditionalExpression": {
              let { test: G } = ae;
              return p(G) && !E(G);
            }
            case "ClassExpression":
              return n(ae.decorators);
          }
          if (fe)
            return !1;
          let q = ae, X = [];
          for (; ; )
            if (q.type === "UnaryExpression")
              q = q.argument, X.push("argument");
            else if (q.type === "TSNonNullExpression")
              q = q.expression, X.push("expression");
            else
              break;
          return !!(d(q) || J.call(() => H(J, W, se), ...X));
        }
        function T(J) {
          if (S(J)) {
            let W = J.left || J.id;
            return W.type === "ObjectPattern" && W.properties.length > 2 && W.properties.some((se) => P(se) && (!se.shorthand || se.value && se.value.type === "AssignmentPattern"));
          }
          return !1;
        }
        function b(J) {
          return J.type === "AssignmentExpression";
        }
        function S(J) {
          return b(J) || J.type === "VariableDeclarator";
        }
        function L(J) {
          let W = R(J);
          if (n(W)) {
            let se = J.type === "TSTypeAliasDeclaration" ? "constraint" : "bound";
            if (W.length > 1 && W.some((fe) => fe[se] || fe.default))
              return !0;
          }
          return !1;
        }
        function R(J) {
          return O(J) && J.typeParameters && J.typeParameters.params ? J.typeParameters.params : null;
        }
        function O(J) {
          return J.type === "TSTypeAliasDeclaration" || J.type === "TypeAlias";
        }
        function U(J) {
          if (J.type !== "VariableDeclarator")
            return !1;
          let { typeAnnotation: W } = J.id;
          if (!W || !W.typeAnnotation)
            return !1;
          let se = _(W.typeAnnotation);
          return n(se) && se.length > 1 && se.some((fe) => n(_(fe)) || fe.type === "TSConditionalType");
        }
        function V(J) {
          return J.type === "VariableDeclarator" && J.init && J.init.type === "ArrowFunctionExpression";
        }
        function _(J) {
          return Y(J) && J.typeParameters && J.typeParameters.params ? J.typeParameters.params : null;
        }
        function Y(J) {
          return J.type === "TSTypeReference" || J.type === "GenericTypeAnnotation";
        }
        function H(J, W, se) {
          let fe = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, ae = J.getValue(), q = () => H(J, W, se, !0);
          if (ae.type === "TSNonNullExpression")
            return J.call(q, "expression");
          if (k(ae)) {
            if (D(J, W, se).label === "member-chain")
              return !1;
            let X = x(ae);
            return !(X.length === 0 || X.length === 1 && K(X[0], W)) || ee(ae, se) ? !1 : J.call(q, "callee");
          }
          return v(ae) ? J.call(q, "object") : fe && (ae.type === "Identifier" || ae.type === "ThisExpression");
        }
        var $ = 0.25;
        function K(J, W) {
          let { printWidth: se } = W;
          if (I(J))
            return !1;
          let fe = se * $;
          if (J.type === "ThisExpression" || J.type === "Identifier" && J.name.length <= fe || j(J) && !I(J.argument))
            return !0;
          let ae = J.type === "Literal" && "regex" in J && J.regex.pattern || J.type === "RegExpLiteral" && J.pattern;
          return ae ? ae.length <= fe : d(J) ? B(J).length <= fe : J.type === "TemplateLiteral" ? J.expressions.length === 0 && J.quasis[0].value.raw.length <= fe && !J.quasis[0].value.raw.includes(`
`) : g(J);
        }
        function ne(J, W, se) {
          if (!P(J))
            return !1;
          W = c(W);
          let fe = 3;
          return typeof W == "string" && a(W) < se.tabWidth + fe;
        }
        function ee(J, W) {
          let se = pe(J);
          if (n(se)) {
            if (se.length > 1)
              return !0;
            if (se.length === 1) {
              let ae = se[0];
              if (ae.type === "TSUnionType" || ae.type === "UnionTypeAnnotation" || ae.type === "TSIntersectionType" || ae.type === "IntersectionTypeAnnotation" || ae.type === "TSTypeLiteral" || ae.type === "ObjectTypeAnnotation")
                return !0;
            }
            let fe = J.typeParameters ? "typeParameters" : "typeArguments";
            if (C(W(fe)))
              return !0;
          }
          return !1;
        }
        function pe(J) {
          return J.typeParameters && J.typeParameters.params || J.typeArguments && J.typeArguments.params;
        }
        l.exports = { printVariableDeclarator: o, printAssignmentExpression: A, printAssignment: m, isArrowFunctionVariableDeclarator: V };
      } }), wn = Z({ "src/language-js/print/function-parameters.js"(r, l) {
        te();
        var { getNextNonSpaceNonCommentCharacter: n } = ot(), { printDanglingComments: a } = vt(), { builders: { line: i, hardline: e, softline: t, group: u, indent: s, ifBreak: c }, utils: { removeLines: C, willBreak: f } } = Ye(), { getFunctionParameters: h, iterateFunctionParametersPath: p, isSimpleType: d, isTestCall: g, isTypeAnnotationAFunction: w, isObjectType: k, isObjectTypePropertyAFunction: v, hasRestParameter: x, shouldPrintComma: B, hasComment: I, isNextLineEmpty: j } = mt(), { locEnd: P } = wt(), { ArgExpansionBailout: E } = ln(), { printFunctionTypeParameters: D } = Pt();
        function m(y, T, b, S, L) {
          let R = y.getValue(), O = h(R), U = L ? D(y, b, T) : "";
          if (O.length === 0)
            return [U, "(", a(y, b, !0, (K) => n(b.originalText, K, P) === ")"), ")"];
          let V = y.getParentNode(), _ = g(V), Y = A(R), H = [];
          if (p(y, (K, ne) => {
            let ee = ne === O.length - 1;
            ee && R.rest && H.push("..."), H.push(T()), !ee && (H.push(","), _ || Y ? H.push(" ") : j(O[ne], b) ? H.push(e, e) : H.push(i));
          }), S) {
            if (f(U) || f(H))
              throw new E();
            return u([C(U), "(", C(H), ")"]);
          }
          let $ = O.every((K) => !K.decorators);
          return Y && $ ? [U, "(", ...H, ")"] : _ ? [U, "(", ...H, ")"] : (v(V) || w(V) || V.type === "TypeAlias" || V.type === "UnionTypeAnnotation" || V.type === "TSUnionType" || V.type === "IntersectionTypeAnnotation" || V.type === "FunctionTypeAnnotation" && V.returnType === R) && O.length === 1 && O[0].name === null && R.this !== O[0] && O[0].typeAnnotation && R.typeParameters === null && d(O[0].typeAnnotation) && !R.rest ? b.arrowParens === "always" ? ["(", ...H, ")"] : H : [U, "(", s([t, ...H]), c(!x(R) && B(b, "all") ? "," : ""), t, ")"];
        }
        function A(y) {
          if (!y)
            return !1;
          let T = h(y);
          if (T.length !== 1)
            return !1;
          let [b] = T;
          return !I(b) && (b.type === "ObjectPattern" || b.type === "ArrayPattern" || b.type === "Identifier" && b.typeAnnotation && (b.typeAnnotation.type === "TypeAnnotation" || b.typeAnnotation.type === "TSTypeAnnotation") && k(b.typeAnnotation.typeAnnotation) || b.type === "FunctionTypeParam" && k(b.typeAnnotation) || b.type === "AssignmentPattern" && (b.left.type === "ObjectPattern" || b.left.type === "ArrayPattern") && (b.right.type === "Identifier" || b.right.type === "ObjectExpression" && b.right.properties.length === 0 || b.right.type === "ArrayExpression" && b.right.elements.length === 0));
        }
        function o(y) {
          let T;
          return y.returnType ? (T = y.returnType, T.typeAnnotation && (T = T.typeAnnotation)) : y.typeAnnotation && (T = y.typeAnnotation), T;
        }
        function F(y, T) {
          let b = o(y);
          if (!b)
            return !1;
          let S = y.typeParameters && y.typeParameters.params;
          if (S) {
            if (S.length > 1)
              return !1;
            if (S.length === 1) {
              let L = S[0];
              if (L.constraint || L.default)
                return !1;
            }
          }
          return h(y).length === 1 && (k(b) || f(T));
        }
        l.exports = { printFunctionParameters: m, shouldHugFunctionParameters: A, shouldGroupFunctionParameters: F };
      } }), Nn = Z({ "src/language-js/print/type-annotation.js"(r, l) {
        te();
        var { printComments: n, printDanglingComments: a } = vt(), { isNonEmptyArray: i } = ot(), { builders: { group: e, join: t, line: u, softline: s, indent: c, align: C, ifBreak: f } } = Ye(), h = Zt(), { locStart: p } = wt(), { isSimpleType: d, isObjectType: g, hasLeadingOwnLineComment: w, isObjectTypePropertyAFunction: k, shouldPrintComma: v } = mt(), { printAssignment: x } = Dn(), { printFunctionParameters: B, shouldGroupFunctionParameters: I } = wn(), { printArrayItems: j } = dn();
        function P(b) {
          if (d(b) || g(b))
            return !0;
          if (b.type === "UnionTypeAnnotation" || b.type === "TSUnionType") {
            let S = b.types.filter((R) => R.type === "VoidTypeAnnotation" || R.type === "TSVoidKeyword" || R.type === "NullLiteralTypeAnnotation" || R.type === "TSNullKeyword").length, L = b.types.some((R) => R.type === "ObjectTypeAnnotation" || R.type === "TSTypeLiteral" || R.type === "GenericTypeAnnotation" || R.type === "TSTypeReference");
            if (b.types.length - 1 === S && L)
              return !0;
          }
          return !1;
        }
        function E(b, S, L) {
          let R = S.semi ? ";" : "", O = b.getValue(), U = [];
          return U.push("opaque type ", L("id"), L("typeParameters")), O.supertype && U.push(": ", L("supertype")), O.impltype && U.push(" = ", L("impltype")), U.push(R), U;
        }
        function D(b, S, L) {
          let R = S.semi ? ";" : "", O = b.getValue(), U = [];
          O.declare && U.push("declare "), U.push("type ", L("id"), L("typeParameters"));
          let V = O.type === "TSTypeAliasDeclaration" ? "typeAnnotation" : "right";
          return [x(b, S, L, U, " =", V), R];
        }
        function m(b, S, L) {
          let R = b.getValue(), O = b.map(L, "types"), U = [], V = !1;
          for (let _ = 0; _ < O.length; ++_)
            _ === 0 ? U.push(O[_]) : g(R.types[_ - 1]) && g(R.types[_]) ? U.push([" & ", V ? c(O[_]) : O[_]]) : !g(R.types[_ - 1]) && !g(R.types[_]) ? U.push(c([" &", u, O[_]])) : (_ > 1 && (V = !0), U.push(" & ", _ > 1 ? c(O[_]) : O[_]));
          return e(U);
        }
        function A(b, S, L) {
          let R = b.getValue(), O = b.getParentNode(), U = O.type !== "TypeParameterInstantiation" && O.type !== "TSTypeParameterInstantiation" && O.type !== "GenericTypeAnnotation" && O.type !== "TSTypeReference" && O.type !== "TSTypeAssertion" && O.type !== "TupleTypeAnnotation" && O.type !== "TSTupleType" && !(O.type === "FunctionTypeParam" && !O.name && b.getParentNode(1).this !== O) && !((O.type === "TypeAlias" || O.type === "VariableDeclarator" || O.type === "TSTypeAliasDeclaration") && w(S.originalText, R)), V = P(R), _ = b.map(($) => {
            let K = L();
            return V || (K = C(2, K)), n($, K, S);
          }, "types");
          if (V)
            return t(" | ", _);
          let Y = U && !w(S.originalText, R), H = [f([Y ? u : "", "| "]), t([u, "| "], _)];
          return h(b, S) ? e([c(H), s]) : O.type === "TupleTypeAnnotation" && O.types.length > 1 || O.type === "TSTupleType" && O.elementTypes.length > 1 ? e([c([f(["(", s]), H]), s, f(")")]) : e(U ? c(H) : H);
        }
        function o(b, S, L) {
          let R = b.getValue(), O = [], U = b.getParentNode(0), V = b.getParentNode(1), _ = b.getParentNode(2), Y = R.type === "TSFunctionType" || !((U.type === "ObjectTypeProperty" || U.type === "ObjectTypeInternalSlot") && !U.variance && !U.optional && p(U) === p(R) || U.type === "ObjectTypeCallProperty" || _ && _.type === "DeclareFunction"), H = Y && (U.type === "TypeAnnotation" || U.type === "TSTypeAnnotation"), $ = H && Y && (U.type === "TypeAnnotation" || U.type === "TSTypeAnnotation") && V.type === "ArrowFunctionExpression";
          k(U) && (Y = !0, H = !0), $ && O.push("(");
          let K = B(b, L, S, !1, !0), ne = R.returnType || R.predicate || R.typeAnnotation ? [Y ? " => " : ": ", L("returnType"), L("predicate"), L("typeAnnotation")] : "", ee = I(R, ne);
          return O.push(ee ? e(K) : K), ne && O.push(ne), $ && O.push(")"), e(O);
        }
        function F(b, S, L) {
          let R = b.getValue(), O = R.type === "TSTupleType" ? "elementTypes" : "types", U = R[O], V = i(U), _ = V ? s : "";
          return e(["[", c([_, j(b, S, O, L)]), f(V && v(S, "all") ? "," : ""), a(b, S, !0), _, "]"]);
        }
        function y(b, S, L) {
          let R = b.getValue(), O = R.type === "OptionalIndexedAccessType" && R.optional ? "?.[" : "[";
          return [L("objectType"), O, L("indexType"), "]"];
        }
        function T(b, S, L) {
          let R = b.getValue();
          return [R.postfix ? "" : L, S("typeAnnotation"), R.postfix ? L : ""];
        }
        l.exports = { printOpaqueType: E, printTypeAlias: D, printIntersectionType: m, printUnionType: A, printFunctionType: o, printTupleType: F, printIndexedAccessType: y, shouldHugType: P, printJSDocType: T };
      } }), kn = Z({ "src/language-js/print/type-parameters.js"(r, l) {
        te();
        var { printDanglingComments: n } = vt(), { builders: { join: a, line: i, hardline: e, softline: t, group: u, indent: s, ifBreak: c } } = Ye(), { isTestCall: C, hasComment: f, CommentCheckFlags: h, isTSXFile: p, shouldPrintComma: d, getFunctionParameters: g, isObjectType: w } = mt(), { createGroupIdMapper: k } = ot(), { shouldHugType: v } = Nn(), { isArrowFunctionVariableDeclarator: x } = Dn(), B = k("typeParameters");
        function I(E, D, m, A) {
          let o = E.getValue();
          if (!o[A])
            return "";
          if (!Array.isArray(o[A]))
            return m(A);
          let F = E.getNode(2), y = F && C(F);
          if (!E.match((b) => !(b[A].length === 1 && w(b[A][0])), void 0, (b, S) => S === "typeAnnotation", (b) => b.type === "Identifier", x) && (y || o[A].length === 0 || o[A].length === 1 && (o[A][0].type === "NullableTypeAnnotation" || v(o[A][0]))))
            return ["<", a(", ", E.map(m, A)), j(E, D), ">"];
          let T = o.type === "TSTypeParameterInstantiation" ? "" : g(o).length === 1 && p(D) && !o[A][0].constraint && E.getParentNode().type === "ArrowFunctionExpression" ? "," : d(D, "all") ? c(",") : "";
          return u(["<", s([t, a([",", i], E.map(m, A))]), T, t, ">"], { id: B(o) });
        }
        function j(E, D) {
          let m = E.getValue();
          if (!f(m, h.Dangling))
            return "";
          let A = !f(m, h.Line), o = n(E, D, A);
          return A ? o : [o, e];
        }
        function P(E, D, m) {
          let A = E.getValue(), o = [], F = E.getParentNode();
          return F.type === "TSMappedType" ? (o.push("[", m("name")), A.constraint && o.push(" in ", m("constraint")), F.nameType && o.push(" as ", E.callParent(() => m("nameType"))), o.push("]"), o) : (A.variance && o.push(m("variance")), A.in && o.push("in "), A.out && o.push("out "), o.push(m("name")), A.bound && o.push(": ", m("bound")), A.constraint && o.push(" extends ", m("constraint")), A.default && o.push(" = ", m("default")), o);
        }
        l.exports = { printTypeParameter: P, printTypeParameters: I, getTypeParametersGroupId: B };
      } }), fn = Z({ "src/language-js/print/property.js"(r, l) {
        te();
        var { printComments: n } = vt(), { printString: a, printNumber: i } = ot(), { isNumericLiteral: e, isSimpleNumber: t, isStringLiteral: u, isStringPropSafeToUnquote: s, rawText: c } = mt(), { printAssignment: C } = Dn(), f = /* @__PURE__ */ new WeakMap();
        function h(d, g, w) {
          let k = d.getNode();
          if (k.computed)
            return ["[", w("key"), "]"];
          let v = d.getParentNode(), { key: x } = k;
          if (k.type === "ClassPrivateProperty" && x.type === "Identifier")
            return ["#", w("key")];
          if (g.quoteProps === "consistent" && !f.has(v)) {
            let B = (v.properties || v.body || v.members).some((I) => !I.computed && I.key && u(I.key) && !s(I, g));
            f.set(v, B);
          }
          if ((x.type === "Identifier" || e(x) && t(i(c(x))) && String(x.value) === i(c(x)) && !(g.parser === "typescript" || g.parser === "babel-ts")) && (g.parser === "json" || g.quoteProps === "consistent" && f.get(v))) {
            let B = a(JSON.stringify(x.type === "Identifier" ? x.name : x.value.toString()), g);
            return d.call((I) => n(I, B, g), "key");
          }
          return s(k, g) && (g.quoteProps === "as-needed" || g.quoteProps === "consistent" && !f.get(v)) ? d.call((B) => n(B, /^\d/.test(x.value) ? i(x.value) : x.value, g), "key") : w("key");
        }
        function p(d, g, w) {
          return d.getValue().shorthand ? w("value") : C(d, g, w, h(d, g, w), ":", "value");
        }
        l.exports = { printProperty: p, printPropertyKey: h };
      } }), jn = Z({ "src/language-js/print/function.js"(r, l) {
        te();
        var n = pn(), { printDanglingComments: a, printCommentsSeparately: i } = vt(), e = It(), { getNextNonSpaceNonCommentCharacterIndex: t } = ot(), { builders: { line: u, softline: s, group: c, indent: C, ifBreak: f, hardline: h, join: p, indentIfBreak: d }, utils: { removeLines: g, willBreak: w } } = Ye(), { ArgExpansionBailout: k } = ln(), { getFunctionParameters: v, hasLeadingOwnLineComment: x, isFlowAnnotationComment: B, isJsxNode: I, isTemplateOnItsOwnLine: j, shouldPrintComma: P, startsWithNoLookaheadToken: E, isBinaryish: D, isLineComment: m, hasComment: A, getComments: o, CommentCheckFlags: F, isCallLikeExpression: y, isCallExpression: T, getCallArguments: b, hasNakedLeftSide: S, getLeftSide: L } = mt(), { locEnd: R } = wt(), { printFunctionParameters: O, shouldGroupFunctionParameters: U } = wn(), { printPropertyKey: V } = fn(), { printFunctionTypeParameters: _ } = Pt();
        function Y(X, G, le, Ee) {
          let Te = X.getValue(), $e = !1;
          if ((Te.type === "FunctionDeclaration" || Te.type === "FunctionExpression") && Ee && Ee.expandLastArg) {
            let ue = X.getParentNode();
            T(ue) && b(ue).length > 1 && ($e = !0);
          }
          let qe = [];
          Te.type === "TSDeclareFunction" && Te.declare && qe.push("declare "), Te.async && qe.push("async "), Te.generator ? qe.push("function* ") : qe.push("function "), Te.id && qe.push(G("id"));
          let ce = O(X, G, le, $e), De = W(X, G, le), he = U(Te, De);
          return qe.push(_(X, le, G), c([he ? c(ce) : ce, De]), Te.body ? " " : "", G("body")), le.semi && (Te.declare || !Te.body) && qe.push(";"), qe;
        }
        function H(X, G, le) {
          let Ee = X.getNode(), { kind: Te } = Ee, $e = Ee.value || Ee, qe = [];
          return !Te || Te === "init" || Te === "method" || Te === "constructor" ? $e.async && qe.push("async ") : (n.ok(Te === "get" || Te === "set"), qe.push(Te, " ")), $e.generator && qe.push("*"), qe.push(V(X, G, le), Ee.optional || Ee.key.optional ? "?" : ""), Ee === $e ? qe.push($(X, G, le)) : $e.type === "FunctionExpression" ? qe.push(X.call((ce) => $(ce, G, le), "value")) : qe.push(le("value")), qe;
        }
        function $(X, G, le) {
          let Ee = X.getNode(), Te = O(X, le, G), $e = W(X, le, G), qe = U(Ee, $e), ce = [_(X, G, le), c([qe ? c(Te) : Te, $e])];
          return Ee.body ? ce.push(" ", le("body")) : ce.push(G.semi ? ";" : ""), ce;
        }
        function K(X, G, le, Ee) {
          let Te = X.getValue(), $e = [];
          if (Te.async && $e.push("async "), J(X, G))
            $e.push(le(["params", 0]));
          else {
            let ce = Ee && (Ee.expandLastArg || Ee.expandFirstArg), De = W(X, le, G);
            if (ce) {
              if (w(De))
                throw new k();
              De = c(g(De));
            }
            $e.push(c([O(X, le, G, ce, !0), De]));
          }
          let qe = a(X, G, !0, (ce) => {
            let De = t(G.originalText, ce, R);
            return De !== !1 && G.originalText.slice(De, De + 2) === "=>";
          });
          return qe && $e.push(" ", qe), $e;
        }
        function ne(X, G, le, Ee, Te, $e) {
          let qe = X.getName(), ce = X.getParentNode(), De = y(ce) && qe === "callee", he = Boolean(G && G.assignmentLayout), ue = $e.body.type !== "BlockStatement" && $e.body.type !== "ObjectExpression" && $e.body.type !== "SequenceExpression", xe = De && ue || G && G.assignmentLayout === "chain-tail-arrow-chain", Q = Symbol("arrow-chain");
          return $e.body.type === "SequenceExpression" && (Te = c(["(", C([s, Te]), s, ")"])), c([c(C([De || he ? s : "", c(p([" =>", u], le), { shouldBreak: Ee })]), { id: Q, shouldBreak: xe }), " =>", d(ue ? C([u, Te]) : [" ", Te], { groupId: Q }), De ? f(s, "", { groupId: Q }) : ""]);
        }
        function ee(X, G, le, Ee) {
          let Te = X.getValue(), $e = [], qe = [], ce = !1;
          if (function Q() {
            let ve = K(X, G, le, Ee);
            if ($e.length === 0)
              $e.push(ve);
            else {
              let { leading: Ae, trailing: be } = i(X, G);
              $e.push([Ae, ve]), qe.unshift(be);
            }
            ce = ce || Te.returnType && v(Te).length > 0 || Te.typeParameters || v(Te).some((Ae) => Ae.type !== "Identifier"), Te.body.type !== "ArrowFunctionExpression" || Ee && Ee.expandLastArg ? qe.unshift(le("body", Ee)) : (Te = Te.body, X.call(Q, "body"));
          }(), $e.length > 1)
            return ne(X, Ee, $e, ce, qe, Te);
          let De = $e;
          if (De.push(" =>"), !x(G.originalText, Te.body) && (Te.body.type === "ArrayExpression" || Te.body.type === "ObjectExpression" || Te.body.type === "BlockStatement" || I(Te.body) || j(Te.body, G.originalText) || Te.body.type === "ArrowFunctionExpression" || Te.body.type === "DoExpression"))
            return c([...De, " ", qe]);
          if (Te.body.type === "SequenceExpression")
            return c([...De, c([" (", C([s, qe]), s, ")"])]);
          let he = (Ee && Ee.expandLastArg || X.getParentNode().type === "JSXExpressionContainer") && !A(Te), ue = Ee && Ee.expandLastArg && P(G, "all"), xe = Te.body.type === "ConditionalExpression" && !E(Te.body, !1);
          return c([...De, c([C([u, xe ? f("", "(") : "", qe, xe ? f("", ")") : ""]), he ? [f(ue ? "," : ""), s] : ""])]);
        }
        function pe(X) {
          let G = v(X);
          return G.length === 1 && !X.typeParameters && !A(X, F.Dangling) && G[0].type === "Identifier" && !G[0].typeAnnotation && !A(G[0]) && !G[0].optional && !X.predicate && !X.returnType;
        }
        function J(X, G) {
          if (G.arrowParens === "always")
            return !1;
          if (G.arrowParens === "avoid") {
            let le = X.getValue();
            return pe(le);
          }
          return !1;
        }
        function W(X, G, le) {
          let Ee = X.getValue(), Te = G("returnType");
          if (Ee.returnType && B(le.originalText, Ee.returnType))
            return [" /*: ", Te, " */"];
          let $e = [Te];
          return Ee.returnType && Ee.returnType.typeAnnotation && $e.unshift(": "), Ee.predicate && $e.push(Ee.returnType ? " " : ": ", G("predicate")), $e;
        }
        function se(X, G, le) {
          let Ee = X.getValue(), Te = G.semi ? ";" : "", $e = [];
          Ee.argument && (q(G, Ee.argument) ? $e.push([" (", C([h, le("argument")]), h, ")"]) : D(Ee.argument) || Ee.argument.type === "SequenceExpression" ? $e.push(c([f(" (", " "), C([s, le("argument")]), s, f(")")])) : $e.push(" ", le("argument")));
          let qe = o(Ee), ce = e(qe), De = ce && m(ce);
          return De && $e.push(Te), A(Ee, F.Dangling) && $e.push(" ", a(X, G, !0)), De || $e.push(Te), $e;
        }
        function fe(X, G, le) {
          return ["return", se(X, G, le)];
        }
        function ae(X, G, le) {
          return ["throw", se(X, G, le)];
        }
        function q(X, G) {
          if (x(X.originalText, G))
            return !0;
          if (S(G)) {
            let le = G, Ee;
            for (; Ee = L(le); )
              if (le = Ee, x(X.originalText, le))
                return !0;
          }
          return !1;
        }
        l.exports = { printFunction: Y, printArrowFunction: ee, printMethod: H, printReturnStatement: fe, printThrowStatement: ae, printMethodInternal: $, shouldPrintParamsWithoutParens: J };
      } }), Dr = Z({ "src/language-js/print/decorators.js"(r, l) {
        te();
        var { isNonEmptyArray: n, hasNewline: a } = ot(), { builders: { line: i, hardline: e, join: t, breakParent: u, group: s } } = Ye(), { locStart: c, locEnd: C } = wt(), { getParentExportDeclaration: f } = mt();
        function h(k, v, x) {
          let B = k.getValue();
          return s([t(i, k.map(x, "decorators")), g(B, v) ? e : i]);
        }
        function p(k, v, x) {
          return [t(e, k.map(x, "declaration", "decorators")), e];
        }
        function d(k, v, x) {
          let B = k.getValue(), { decorators: I } = B;
          if (!n(I) || w(k.getParentNode()))
            return;
          let j = B.type === "ClassExpression" || B.type === "ClassDeclaration" || g(B, v);
          return [f(k) ? e : j ? u : "", t(i, k.map(x, "decorators")), i];
        }
        function g(k, v) {
          return k.decorators.some((x) => a(v.originalText, C(x)));
        }
        function w(k) {
          if (k.type !== "ExportDefaultDeclaration" && k.type !== "ExportNamedDeclaration" && k.type !== "DeclareExportDeclaration")
            return !1;
          let v = k.declaration && k.declaration.decorators;
          return n(v) && c(k, { ignoreDecorators: !0 }) > c(v[0]);
        }
        l.exports = { printDecorators: d, printClassMemberDecorators: h, printDecoratorsBeforeExport: p, hasDecoratorsBeforeExport: w };
      } }), mn = Z({ "src/language-js/print/class.js"(r, l) {
        te();
        var { isNonEmptyArray: n, createGroupIdMapper: a } = ot(), { printComments: i, printDanglingComments: e } = vt(), { builders: { join: t, line: u, hardline: s, softline: c, group: C, indent: f, ifBreak: h } } = Ye(), { hasComment: p, CommentCheckFlags: d } = mt(), { getTypeParametersGroupId: g } = kn(), { printMethod: w } = jn(), { printOptionalToken: k, printTypeAnnotation: v, printDefiniteToken: x } = Pt(), { printPropertyKey: B } = fn(), { printAssignment: I } = Dn(), { printClassMemberDecorators: j } = Dr();
        function P(b, S, L) {
          let R = b.getValue(), O = [];
          R.declare && O.push("declare "), R.abstract && O.push("abstract "), O.push("class");
          let U = R.id && p(R.id, d.Trailing) || R.typeParameters && p(R.typeParameters, d.Trailing) || R.superClass && p(R.superClass) || n(R.extends) || n(R.mixins) || n(R.implements), V = [], _ = [];
          if (R.id && V.push(" ", L("id")), V.push(L("typeParameters")), R.superClass) {
            let Y = [F(b, S, L), L("superTypeParameters")], H = b.call(($) => ["extends ", i($, Y, S)], "superClass");
            U ? _.push(u, C(H)) : _.push(" ", H);
          } else
            _.push(o(b, S, L, "extends"));
          if (_.push(o(b, S, L, "mixins"), o(b, S, L, "implements")), U) {
            let Y;
            A(R) ? Y = [...V, f(_)] : Y = f([...V, _]), O.push(C(Y, { id: E(R) }));
          } else
            O.push(...V, ..._);
          return O.push(" ", L("body")), O;
        }
        var E = a("heritageGroup");
        function D(b) {
          return h(s, "", { groupId: E(b) });
        }
        function m(b) {
          return ["superClass", "extends", "mixins", "implements"].filter((S) => Boolean(b[S])).length > 1;
        }
        function A(b) {
          return b.typeParameters && !p(b.typeParameters, d.Trailing | d.Line) && !m(b);
        }
        function o(b, S, L, R) {
          let O = b.getValue();
          if (!n(O[R]))
            return "";
          let U = e(b, S, !0, (V) => {
            let { marker: _ } = V;
            return _ === R;
          });
          return [A(O) ? h(" ", u, { groupId: g(O.typeParameters) }) : u, U, U && s, R, C(f([u, t([",", u], b.map(L, R))]))];
        }
        function F(b, S, L) {
          let R = L("superClass");
          return b.getParentNode().type === "AssignmentExpression" ? C(h(["(", f([c, R]), c, ")"], R)) : R;
        }
        function y(b, S, L) {
          let R = b.getValue(), O = [];
          return n(R.decorators) && O.push(j(b, S, L)), R.accessibility && O.push(R.accessibility + " "), R.readonly && O.push("readonly "), R.declare && O.push("declare "), R.static && O.push("static "), (R.type === "TSAbstractMethodDefinition" || R.abstract) && O.push("abstract "), R.override && O.push("override "), O.push(w(b, S, L)), O;
        }
        function T(b, S, L) {
          let R = b.getValue(), O = [], U = S.semi ? ";" : "";
          return n(R.decorators) && O.push(j(b, S, L)), R.accessibility && O.push(R.accessibility + " "), R.declare && O.push("declare "), R.static && O.push("static "), (R.type === "TSAbstractPropertyDefinition" || R.abstract) && O.push("abstract "), R.override && O.push("override "), R.readonly && O.push("readonly "), R.variance && O.push(L("variance")), R.type === "ClassAccessorProperty" && O.push("accessor "), O.push(B(b, S, L), k(b), x(b), v(b, S, L)), [I(b, S, L, O, " =", "value"), U];
        }
        l.exports = { printClass: P, printClassMethod: y, printClassProperty: T, printHardlineAfterHeritage: D };
      } }), ku = Z({ "src/language-js/print/interface.js"(r, l) {
        te();
        var { isNonEmptyArray: n } = ot(), { builders: { join: a, line: i, group: e, indent: t, ifBreak: u } } = Ye(), { hasComment: s, identity: c, CommentCheckFlags: C } = mt(), { getTypeParametersGroupId: f } = kn(), { printTypeScriptModifiers: h } = Pt();
        function p(d, g, w) {
          let k = d.getValue(), v = [];
          k.declare && v.push("declare "), k.type === "TSInterfaceDeclaration" && v.push(k.abstract ? "abstract " : "", h(d, g, w)), v.push("interface");
          let x = [], B = [];
          k.type !== "InterfaceTypeAnnotation" && x.push(" ", w("id"), w("typeParameters"));
          let I = k.typeParameters && !s(k.typeParameters, C.Trailing | C.Line);
          return n(k.extends) && B.push(I ? u(" ", i, { groupId: f(k.typeParameters) }) : i, "extends ", (k.extends.length === 1 ? c : t)(a([",", i], d.map(w, "extends")))), k.id && s(k.id, C.Trailing) || n(k.extends) ? I ? v.push(e([...x, t(B)])) : v.push(e(t([...x, ...B]))) : v.push(...x, ...B), v.push(" ", w("body")), e(v);
        }
        l.exports = { printInterface: p };
      } }), ju = Z({ "src/language-js/print/module.js"(r, l) {
        te();
        var { isNonEmptyArray: n } = ot(), { builders: { softline: a, group: i, indent: e, join: t, line: u, ifBreak: s, hardline: c } } = Ye(), { printDanglingComments: C } = vt(), { hasComment: f, CommentCheckFlags: h, shouldPrintComma: p, needsHardlineAfterDanglingComment: d, isStringLiteral: g, rawText: w } = mt(), { locStart: k, hasSameLoc: v } = wt(), { hasDecoratorsBeforeExport: x, printDecoratorsBeforeExport: B } = Dr();
        function I(T, b, S) {
          let L = T.getValue(), R = b.semi ? ";" : "", O = [], { importKind: U } = L;
          return O.push("import"), U && U !== "value" && O.push(" ", U), O.push(m(T, b, S), D(T, b, S), o(T, b, S), R), O;
        }
        function j(T, b, S) {
          let L = T.getValue(), R = [];
          x(L) && R.push(B(T, b, S));
          let { type: O, exportKind: U, declaration: V } = L;
          return R.push("export"), (L.default || O === "ExportDefaultDeclaration") && R.push(" default"), f(L, h.Dangling) && (R.push(" ", C(T, b, !0)), d(L) && R.push(c)), V ? R.push(" ", S("declaration")) : R.push(U === "type" ? " type" : "", m(T, b, S), D(T, b, S), o(T, b, S)), E(L, b) && R.push(";"), R;
        }
        function P(T, b, S) {
          let L = T.getValue(), R = b.semi ? ";" : "", O = [], { exportKind: U, exported: V } = L;
          return O.push("export"), U === "type" && O.push(" type"), O.push(" *"), V && O.push(" as ", S("exported")), O.push(D(T, b, S), o(T, b, S), R), O;
        }
        function E(T, b) {
          if (!b.semi)
            return !1;
          let { type: S, declaration: L } = T, R = T.default || S === "ExportDefaultDeclaration";
          if (!L)
            return !0;
          let { type: O } = L;
          return !!(R && O !== "ClassDeclaration" && O !== "FunctionDeclaration" && O !== "TSInterfaceDeclaration" && O !== "DeclareClass" && O !== "DeclareFunction" && O !== "TSDeclareFunction" && O !== "EnumDeclaration");
        }
        function D(T, b, S) {
          let L = T.getValue();
          if (!L.source)
            return "";
          let R = [];
          return A(L, b) || R.push(" from"), R.push(" ", S("source")), R;
        }
        function m(T, b, S) {
          let L = T.getValue();
          if (A(L, b))
            return "";
          let R = [" "];
          if (n(L.specifiers)) {
            let O = [], U = [];
            T.each(() => {
              let V = T.getValue().type;
              if (V === "ExportNamespaceSpecifier" || V === "ExportDefaultSpecifier" || V === "ImportNamespaceSpecifier" || V === "ImportDefaultSpecifier")
                O.push(S());
              else if (V === "ExportSpecifier" || V === "ImportSpecifier")
                U.push(S());
              else
                throw new Error("Unknown specifier type ".concat(JSON.stringify(V)));
            }, "specifiers"), R.push(t(", ", O)), U.length > 0 && (O.length > 0 && R.push(", "), U.length > 1 || O.length > 0 || L.specifiers.some((V) => f(V)) ? R.push(i(["{", e([b.bracketSpacing ? u : a, t([",", u], U)]), s(p(b) ? "," : ""), b.bracketSpacing ? u : a, "}"])) : R.push(["{", b.bracketSpacing ? " " : "", ...U, b.bracketSpacing ? " " : "", "}"]));
          } else
            R.push("{}");
          return R;
        }
        function A(T, b) {
          let { type: S, importKind: L, source: R, specifiers: O } = T;
          return S !== "ImportDeclaration" || n(O) || L === "type" ? !1 : !/{\s*}/.test(b.originalText.slice(k(T), k(R)));
        }
        function o(T, b, S) {
          let L = T.getNode();
          return n(L.assertions) ? [" assert {", b.bracketSpacing ? " " : "", t(", ", T.map(S, "assertions")), b.bracketSpacing ? " " : "", "}"] : "";
        }
        function F(T, b, S) {
          let L = T.getNode(), { type: R } = L, O = [], U = R === "ImportSpecifier" ? L.importKind : L.exportKind;
          U && U !== "value" && O.push(U, " ");
          let V = R.startsWith("Import"), _ = V ? "imported" : "local", Y = V ? "local" : "exported", H = L[_], $ = L[Y], K = "", ne = "";
          return R === "ExportNamespaceSpecifier" || R === "ImportNamespaceSpecifier" ? K = "*" : H && (K = S(_)), $ && !y(L) && (ne = S(Y)), O.push(K, K && ne ? " as " : "", ne), O;
        }
        function y(T) {
          if (T.type !== "ImportSpecifier" && T.type !== "ExportSpecifier")
            return !1;
          let { local: b, [T.type === "ImportSpecifier" ? "imported" : "exported"]: S } = T;
          if (b.type !== S.type || !v(b, S))
            return !1;
          if (g(b))
            return b.value === S.value && w(b) === w(S);
          switch (b.type) {
            case "Identifier":
              return b.name === S.name;
            default:
              return !1;
          }
        }
        l.exports = { printImportDeclaration: I, printExportDeclaration: j, printExportAllDeclaration: P, printModuleSpecifier: F };
      } }), fr = Z({ "src/language-js/print/object.js"(r, l) {
        te();
        var { printDanglingComments: n } = vt(), { builders: { line: a, softline: i, group: e, indent: t, ifBreak: u, hardline: s } } = Ye(), { getLast: c, hasNewlineInRange: C, hasNewline: f, isNonEmptyArray: h } = ot(), { shouldPrintComma: p, hasComment: d, getComments: g, CommentCheckFlags: w, isNextLineEmpty: k } = mt(), { locStart: v, locEnd: x } = wt(), { printOptionalToken: B, printTypeAnnotation: I } = Pt(), { shouldHugFunctionParameters: j } = wn(), { shouldHugType: P } = Nn(), { printHardlineAfterHeritage: E } = mn();
        function D(m, A, o) {
          let F = A.semi ? ";" : "", y = m.getValue(), T;
          y.type === "TSTypeLiteral" ? T = "members" : y.type === "TSInterfaceBody" ? T = "body" : T = "properties";
          let b = y.type === "ObjectTypeAnnotation", S = [T];
          b && S.push("indexers", "callProperties", "internalSlots");
          let L = S.map((J) => y[J][0]).sort((J, W) => v(J) - v(W))[0], R = m.getParentNode(0), O = b && R && (R.type === "InterfaceDeclaration" || R.type === "DeclareInterface" || R.type === "DeclareClass") && m.getName() === "body", U = y.type === "TSInterfaceBody" || O || y.type === "ObjectPattern" && R.type !== "FunctionDeclaration" && R.type !== "FunctionExpression" && R.type !== "ArrowFunctionExpression" && R.type !== "ObjectMethod" && R.type !== "ClassMethod" && R.type !== "ClassPrivateMethod" && R.type !== "AssignmentPattern" && R.type !== "CatchClause" && y.properties.some((J) => J.value && (J.value.type === "ObjectPattern" || J.value.type === "ArrayPattern")) || y.type !== "ObjectPattern" && L && C(A.originalText, v(y), v(L)), V = O ? ";" : y.type === "TSInterfaceBody" || y.type === "TSTypeLiteral" ? u(F, ";") : ",", _ = y.type === "RecordExpression" ? "#{" : y.exact ? "{|" : "{", Y = y.exact ? "|}" : "}", H = [];
          for (let J of S)
            m.each((W) => {
              let se = W.getValue();
              H.push({ node: se, printed: o(), loc: v(se) });
            }, J);
          S.length > 1 && H.sort((J, W) => J.loc - W.loc);
          let $ = [], K = H.map((J) => {
            let W = [...$, e(J.printed)];
            return $ = [V, a], (J.node.type === "TSPropertySignature" || J.node.type === "TSMethodSignature" || J.node.type === "TSConstructSignatureDeclaration") && d(J.node, w.PrettierIgnore) && $.shift(), k(J.node, A) && $.push(s), W;
          });
          if (y.inexact) {
            let J;
            if (d(y, w.Dangling)) {
              let W = d(y, w.Line);
              J = [n(m, A, !0), W || f(A.originalText, x(c(g(y)))) ? s : a, "..."];
            } else
              J = ["..."];
            K.push([...$, ...J]);
          }
          let ne = c(y[T]), ee = !(y.inexact || ne && ne.type === "RestElement" || ne && (ne.type === "TSPropertySignature" || ne.type === "TSCallSignatureDeclaration" || ne.type === "TSMethodSignature" || ne.type === "TSConstructSignatureDeclaration") && d(ne, w.PrettierIgnore)), pe;
          if (K.length === 0) {
            if (!d(y, w.Dangling))
              return [_, Y, I(m, A, o)];
            pe = e([_, n(m, A), i, Y, B(m), I(m, A, o)]);
          } else
            pe = [O && h(y.properties) ? E(R) : "", _, t([A.bracketSpacing ? a : i, ...K]), u(ee && (V !== "," || p(A)) ? V : ""), A.bracketSpacing ? a : i, Y, B(m), I(m, A, o)];
          return m.match((J) => J.type === "ObjectPattern" && !J.decorators, (J, W, se) => j(J) && (W === "params" || W === "parameters" || W === "this" || W === "rest") && se === 0) || m.match(P, (J, W) => W === "typeAnnotation", (J, W) => W === "typeAnnotation", (J, W, se) => j(J) && (W === "params" || W === "parameters" || W === "this" || W === "rest") && se === 0) || !U && m.match((J) => J.type === "ObjectPattern", (J) => J.type === "AssignmentExpression" || J.type === "VariableDeclarator") ? pe : e(pe, { shouldBreak: U });
        }
        l.exports = { printObject: D };
      } }), ys = Z({ "src/language-js/print/flow.js"(r, l) {
        te();
        var n = pn(), { printDanglingComments: a } = vt(), { printString: i, printNumber: e } = ot(), { builders: { hardline: t, softline: u, group: s, indent: c } } = Ye(), { getParentExportDeclaration: C, isFunctionNotation: f, isGetterOrSetter: h, rawText: p, shouldPrintComma: d } = mt(), { locStart: g, locEnd: w } = wt(), { printClass: k } = mn(), { printOpaqueType: v, printTypeAlias: x, printIntersectionType: B, printUnionType: I, printFunctionType: j, printTupleType: P, printIndexedAccessType: E } = Nn(), { printInterface: D } = ku(), { printTypeParameter: m, printTypeParameters: A } = kn(), { printExportDeclaration: o, printExportAllDeclaration: F } = ju(), { printArrayItems: y } = dn(), { printObject: T } = fr(), { printPropertyKey: b } = fn(), { printOptionalToken: S, printTypeAnnotation: L, printRestSpread: R } = Pt();
        function O(V, _, Y) {
          let H = V.getValue(), $ = _.semi ? ";" : "", K = [];
          switch (H.type) {
            case "DeclareClass":
              return U(V, k(V, _, Y));
            case "DeclareFunction":
              return U(V, ["function ", Y("id"), H.predicate ? " " : "", Y("predicate"), $]);
            case "DeclareModule":
              return U(V, ["module ", Y("id"), " ", Y("body")]);
            case "DeclareModuleExports":
              return U(V, ["module.exports", ": ", Y("typeAnnotation"), $]);
            case "DeclareVariable":
              return U(V, ["var ", Y("id"), $]);
            case "DeclareOpaqueType":
              return U(V, v(V, _, Y));
            case "DeclareInterface":
              return U(V, D(V, _, Y));
            case "DeclareTypeAlias":
              return U(V, x(V, _, Y));
            case "DeclareExportDeclaration":
              return U(V, o(V, _, Y));
            case "DeclareExportAllDeclaration":
              return U(V, F(V, _, Y));
            case "OpaqueType":
              return v(V, _, Y);
            case "TypeAlias":
              return x(V, _, Y);
            case "IntersectionTypeAnnotation":
              return B(V, _, Y);
            case "UnionTypeAnnotation":
              return I(V, _, Y);
            case "FunctionTypeAnnotation":
              return j(V, _, Y);
            case "TupleTypeAnnotation":
              return P(V, _, Y);
            case "GenericTypeAnnotation":
              return [Y("id"), A(V, _, Y, "typeParameters")];
            case "IndexedAccessType":
            case "OptionalIndexedAccessType":
              return E(V, _, Y);
            case "TypeAnnotation":
              return Y("typeAnnotation");
            case "TypeParameter":
              return m(V, _, Y);
            case "TypeofTypeAnnotation":
              return ["typeof ", Y("argument")];
            case "ExistsTypeAnnotation":
              return "*";
            case "EmptyTypeAnnotation":
              return "empty";
            case "MixedTypeAnnotation":
              return "mixed";
            case "ArrayTypeAnnotation":
              return [Y("elementType"), "[]"];
            case "BooleanLiteralTypeAnnotation":
              return String(H.value);
            case "EnumDeclaration":
              return ["enum ", Y("id"), " ", Y("body")];
            case "EnumBooleanBody":
            case "EnumNumberBody":
            case "EnumStringBody":
            case "EnumSymbolBody": {
              if (H.type === "EnumSymbolBody" || H.explicitType) {
                let ne = null;
                switch (H.type) {
                  case "EnumBooleanBody":
                    ne = "boolean";
                    break;
                  case "EnumNumberBody":
                    ne = "number";
                    break;
                  case "EnumStringBody":
                    ne = "string";
                    break;
                  case "EnumSymbolBody":
                    ne = "symbol";
                    break;
                }
                K.push("of ", ne, " ");
              }
              if (H.members.length === 0 && !H.hasUnknownMembers)
                K.push(s(["{", a(V, _), u, "}"]));
              else {
                let ne = H.members.length > 0 ? [t, y(V, _, "members", Y), H.hasUnknownMembers || d(_) ? "," : ""] : [];
                K.push(s(["{", c([...ne, ...H.hasUnknownMembers ? [t, "..."] : []]), a(V, _, !0), t, "}"]));
              }
              return K;
            }
            case "EnumBooleanMember":
            case "EnumNumberMember":
            case "EnumStringMember":
              return [Y("id"), " = ", typeof H.init == "object" ? Y("init") : String(H.init)];
            case "EnumDefaultedMember":
              return Y("id");
            case "FunctionTypeParam": {
              let ne = H.name ? Y("name") : V.getParentNode().this === H ? "this" : "";
              return [ne, S(V), ne ? ": " : "", Y("typeAnnotation")];
            }
            case "InterfaceDeclaration":
            case "InterfaceTypeAnnotation":
              return D(V, _, Y);
            case "ClassImplements":
            case "InterfaceExtends":
              return [Y("id"), Y("typeParameters")];
            case "NullableTypeAnnotation":
              return ["?", Y("typeAnnotation")];
            case "Variance": {
              let { kind: ne } = H;
              return n.ok(ne === "plus" || ne === "minus"), ne === "plus" ? "+" : "-";
            }
            case "ObjectTypeCallProperty":
              return H.static && K.push("static "), K.push(Y("value")), K;
            case "ObjectTypeIndexer":
              return [H.static ? "static " : "", H.variance ? Y("variance") : "", "[", Y("id"), H.id ? ": " : "", Y("key"), "]: ", Y("value")];
            case "ObjectTypeProperty": {
              let ne = "";
              return H.proto ? ne = "proto " : H.static && (ne = "static "), [ne, h(H) ? H.kind + " " : "", H.variance ? Y("variance") : "", b(V, _, Y), S(V), f(H) ? "" : ": ", Y("value")];
            }
            case "ObjectTypeAnnotation":
              return T(V, _, Y);
            case "ObjectTypeInternalSlot":
              return [H.static ? "static " : "", "[[", Y("id"), "]]", S(V), H.method ? "" : ": ", Y("value")];
            case "ObjectTypeSpreadProperty":
              return R(V, _, Y);
            case "QualifiedTypeofIdentifier":
            case "QualifiedTypeIdentifier":
              return [Y("qualification"), ".", Y("id")];
            case "StringLiteralTypeAnnotation":
              return i(p(H), _);
            case "NumberLiteralTypeAnnotation":
              n.strictEqual(typeof H.value, "number");
            case "BigIntLiteralTypeAnnotation":
              return H.extra ? e(H.extra.raw) : e(H.raw);
            case "TypeCastExpression":
              return ["(", Y("expression"), L(V, _, Y), ")"];
            case "TypeParameterDeclaration":
            case "TypeParameterInstantiation": {
              let ne = A(V, _, Y, "params");
              if (_.parser === "flow") {
                let ee = g(H), pe = w(H), J = _.originalText.lastIndexOf("/*", ee), W = _.originalText.indexOf("*/", pe);
                if (J !== -1 && W !== -1) {
                  let se = _.originalText.slice(J + 2, W).trim();
                  if (se.startsWith("::") && !se.includes("/*") && !se.includes("*/"))
                    return ["/*:: ", ne, " */"];
                }
              }
              return ne;
            }
            case "InferredPredicate":
              return "%checks";
            case "DeclaredPredicate":
              return ["%checks(", Y("value"), ")"];
            case "AnyTypeAnnotation":
              return "any";
            case "BooleanTypeAnnotation":
              return "boolean";
            case "BigIntTypeAnnotation":
              return "bigint";
            case "NullLiteralTypeAnnotation":
              return "null";
            case "NumberTypeAnnotation":
              return "number";
            case "SymbolTypeAnnotation":
              return "symbol";
            case "StringTypeAnnotation":
              return "string";
            case "VoidTypeAnnotation":
              return "void";
            case "ThisTypeAnnotation":
              return "this";
            case "Node":
            case "Printable":
            case "SourceLocation":
            case "Position":
            case "Statement":
            case "Function":
            case "Pattern":
            case "Expression":
            case "Declaration":
            case "Specifier":
            case "NamedSpecifier":
            case "Comment":
            case "MemberTypeAnnotation":
            case "Type":
              throw new Error("unprintable type: " + JSON.stringify(H.type));
          }
        }
        function U(V, _) {
          let Y = C(V);
          return Y ? (n.strictEqual(Y.type, "DeclareExportDeclaration"), _) : ["declare ", _];
        }
        l.exports = { printFlow: O };
      } }), hs = Z({ "src/language-js/utils/is-ts-keyword-type.js"(r, l) {
        te();
        function n(a) {
          let { type: i } = a;
          return i.startsWith("TS") && i.endsWith("Keyword");
        }
        l.exports = n;
      } }), Iu = Z({ "src/language-js/print/ternary.js"(r, l) {
        te();
        var { hasNewlineInRange: n } = ot(), { isJsxNode: a, getComments: i, isCallExpression: e, isMemberExpression: t } = mt(), { locStart: u, locEnd: s } = wt(), c = Qt(), { builders: { line: C, softline: f, group: h, indent: p, align: d, ifBreak: g, dedent: w, breakParent: k } } = Ye();
        function v(P) {
          let E = [P];
          for (let D = 0; D < E.length; D++) {
            let m = E[D];
            for (let A of ["test", "consequent", "alternate"]) {
              let o = m[A];
              if (a(o))
                return !0;
              o.type === "ConditionalExpression" && E.push(o);
            }
          }
          return !1;
        }
        function x(P, E, D) {
          let m = P.getValue(), A = m.type === "ConditionalExpression", o = A ? "alternate" : "falseType", F = P.getParentNode(), y = A ? D("test") : [D("checkType"), " ", "extends", " ", D("extendsType")];
          return F.type === m.type && F[o] === m ? d(2, y) : y;
        }
        var B = /* @__PURE__ */ new Map([["AssignmentExpression", "right"], ["VariableDeclarator", "init"], ["ReturnStatement", "argument"], ["ThrowStatement", "argument"], ["UnaryExpression", "argument"], ["YieldExpression", "argument"]]);
        function I(P) {
          let E = P.getValue();
          if (E.type !== "ConditionalExpression")
            return !1;
          let D, m = E;
          for (let A = 0; !D; A++) {
            let o = P.getParentNode(A);
            if (e(o) && o.callee === m || t(o) && o.object === m || o.type === "TSNonNullExpression" && o.expression === m) {
              m = o;
              continue;
            }
            o.type === "NewExpression" && o.callee === m || o.type === "TSAsExpression" && o.expression === m ? (D = P.getParentNode(A + 1), m = o) : D = o;
          }
          return m === E ? !1 : D[B.get(D.type)] === m;
        }
        function j(P, E, D) {
          let m = P.getValue(), A = m.type === "ConditionalExpression", o = A ? "consequent" : "trueType", F = A ? "alternate" : "falseType", y = A ? ["test"] : ["checkType", "extendsType"], T = m[o], b = m[F], S = [], L = !1, R = P.getParentNode(), O = R.type === m.type && y.some((W) => R[W] === m), U = R.type === m.type && !O, V, _, Y = 0;
          do
            _ = V || m, V = P.getParentNode(Y), Y++;
          while (V && V.type === m.type && y.every((W) => V[W] !== _));
          let H = V || R, $ = _;
          if (A && (a(m[y[0]]) || a(T) || a(b) || v($))) {
            L = !0, U = !0;
            let W = (fe) => [g("("), p([f, fe]), f, g(")")], se = (fe) => fe.type === "NullLiteral" || fe.type === "Literal" && fe.value === null || fe.type === "Identifier" && fe.name === "undefined";
            S.push(" ? ", se(T) ? D(o) : W(D(o)), " : ", b.type === m.type || se(b) ? D(F) : W(D(F)));
          } else {
            let W = [C, "? ", T.type === m.type ? g("", "(") : "", d(2, D(o)), T.type === m.type ? g("", ")") : "", C, ": ", b.type === m.type ? D(F) : d(2, D(F))];
            S.push(R.type !== m.type || R[F] === m || O ? W : E.useTabs ? w(p(W)) : d(Math.max(0, E.tabWidth - 2), W));
          }
          let K = [...y.map((W) => i(m[W])), i(T), i(b)].flat().some((W) => c(W) && n(E.originalText, u(W), s(W))), ne = (W) => R === H ? h(W, { shouldBreak: K }) : K ? [W, k] : W, ee = !L && (t(R) || R.type === "NGPipeExpression" && R.left === m) && !R.computed, pe = I(P), J = ne([x(P, E, D), U ? S : p(S), A && ee && !pe ? f : ""]);
          return O || pe ? h([p([f, J]), f]) : J;
        }
        l.exports = { printTernary: j };
      } }), Pu = Z({ "src/language-js/print/statement.js"(r, l) {
        te();
        var { builders: { hardline: n } } = Ye(), a = Zt(), { getLeftSidePathName: i, hasNakedLeftSide: e, isJsxNode: t, isTheOnlyJsxElementInMarkdown: u, hasComment: s, CommentCheckFlags: c, isNextLineEmpty: C } = mt(), { shouldPrintParamsWithoutParens: f } = jn();
        function h(B, I, j, P) {
          let E = B.getValue(), D = [], m = E.type === "ClassBody", A = p(E[P]);
          return B.each((o, F, y) => {
            let T = o.getValue();
            if (T.type === "EmptyStatement")
              return;
            let b = j();
            !I.semi && !m && !u(I, o) && d(o, I) ? s(T, c.Leading) ? D.push(j([], { needsSemi: !0 })) : D.push(";", b) : D.push(b), !I.semi && m && v(T) && x(T, y[F + 1]) && D.push(";"), T !== A && (D.push(n), C(T, I) && D.push(n));
          }, P), D;
        }
        function p(B) {
          for (let I = B.length - 1; I >= 0; I--) {
            let j = B[I];
            if (j.type !== "EmptyStatement")
              return j;
          }
        }
        function d(B, I) {
          return B.getNode().type !== "ExpressionStatement" ? !1 : B.call((j) => g(j, I), "expression");
        }
        function g(B, I) {
          let j = B.getValue();
          switch (j.type) {
            case "ParenthesizedExpression":
            case "TypeCastExpression":
            case "ArrayExpression":
            case "ArrayPattern":
            case "TemplateLiteral":
            case "TemplateElement":
            case "RegExpLiteral":
              return !0;
            case "ArrowFunctionExpression": {
              if (!f(B, I))
                return !0;
              break;
            }
            case "UnaryExpression": {
              let { prefix: P, operator: E } = j;
              if (P && (E === "+" || E === "-"))
                return !0;
              break;
            }
            case "BindExpression": {
              if (!j.object)
                return !0;
              break;
            }
            case "Literal": {
              if (j.regex)
                return !0;
              break;
            }
            default:
              if (t(j))
                return !0;
          }
          return a(B, I) ? !0 : e(j) ? B.call((P) => g(P, I), ...i(B, j)) : !1;
        }
        function w(B, I, j) {
          return h(B, I, j, "body");
        }
        function k(B, I, j) {
          return h(B, I, j, "consequent");
        }
        var v = (B) => {
          let { type: I } = B;
          return I === "ClassProperty" || I === "PropertyDefinition" || I === "ClassPrivateProperty" || I === "ClassAccessorProperty";
        };
        function x(B, I) {
          let j = B.key && B.key.name;
          if ((j === "static" || j === "get" || j === "set") && !B.value && !B.typeAnnotation)
            return !0;
          if (!I || I.static || I.accessibility)
            return !1;
          if (!I.computed) {
            let P = I.key && I.key.name;
            if (P === "in" || P === "instanceof")
              return !0;
          }
          if (v(I) && I.variance && !I.static && !I.declare)
            return !0;
          switch (I.type) {
            case "ClassProperty":
            case "PropertyDefinition":
            case "TSAbstractPropertyDefinition":
              return I.computed;
            case "MethodDefinition":
            case "TSAbstractMethodDefinition":
            case "ClassMethod":
            case "ClassPrivateMethod": {
              if ((I.value ? I.value.async : I.async) || I.kind === "get" || I.kind === "set")
                return !1;
              let P = I.value ? I.value.generator : I.generator;
              return !!(I.computed || P);
            }
            case "TSIndexSignature":
              return !0;
          }
          return !1;
        }
        l.exports = { printBody: w, printSwitchCaseConsequent: k };
      } }), Lu = Z({ "src/language-js/print/block.js"(r, l) {
        te();
        var { printDanglingComments: n } = vt(), { isNonEmptyArray: a } = ot(), { builders: { hardline: i, indent: e } } = Ye(), { hasComment: t, CommentCheckFlags: u, isNextLineEmpty: s } = mt(), { printHardlineAfterHeritage: c } = mn(), { printBody: C } = Pu();
        function f(p, d, g) {
          let w = p.getValue(), k = [];
          if (w.type === "StaticBlock" && k.push("static "), w.type === "ClassBody" && a(w.body)) {
            let x = p.getParentNode();
            k.push(c(x));
          }
          k.push("{");
          let v = h(p, d, g);
          if (v)
            k.push(e([i, v]), i);
          else {
            let x = p.getParentNode(), B = p.getParentNode(1);
            x.type === "ArrowFunctionExpression" || x.type === "FunctionExpression" || x.type === "FunctionDeclaration" || x.type === "ObjectMethod" || x.type === "ClassMethod" || x.type === "ClassPrivateMethod" || x.type === "ForStatement" || x.type === "WhileStatement" || x.type === "DoWhileStatement" || x.type === "DoExpression" || x.type === "CatchClause" && !B.finalizer || x.type === "TSModuleDeclaration" || x.type === "TSDeclareFunction" || w.type === "StaticBlock" || w.type === "ClassBody" || k.push(i);
          }
          return k.push("}"), k;
        }
        function h(p, d, g) {
          let w = p.getValue(), k = a(w.directives), v = w.body.some((I) => I.type !== "EmptyStatement"), x = t(w, u.Dangling);
          if (!k && !v && !x)
            return "";
          let B = [];
          if (k && p.each((I, j, P) => {
            B.push(g()), (j < P.length - 1 || v || x) && (B.push(i), s(I.getValue(), d) && B.push(i));
          }, "directives"), v && B.push(C(p, d, g)), x && B.push(n(p, d, !0)), w.type === "Program") {
            let I = p.getParentNode();
            (!I || I.type !== "ModuleExpression") && B.push(i);
          }
          return B;
        }
        l.exports = { printBlock: f, printBlockBody: h };
      } }), Es = Z({ "src/language-js/print/typescript.js"(r, l) {
        te();
        var { printDanglingComments: n } = vt(), { hasNewlineInRange: a } = ot(), { builders: { join: i, line: e, hardline: t, softline: u, group: s, indent: c, conditionalGroup: C, ifBreak: f } } = Ye(), { isLiteral: h, getTypeScriptMappedTypeModifier: p, shouldPrintComma: d, isCallExpression: g, isMemberExpression: w } = mt(), k = hs(), { locStart: v, locEnd: x } = wt(), { printOptionalToken: B, printTypeScriptModifiers: I } = Pt(), { printTernary: j } = Iu(), { printFunctionParameters: P, shouldGroupFunctionParameters: E } = wn(), { printTemplateLiteral: D } = Yt(), { printArrayItems: m } = dn(), { printObject: A } = fr(), { printClassProperty: o, printClassMethod: F } = mn(), { printTypeParameter: y, printTypeParameters: T } = kn(), { printPropertyKey: b } = fn(), { printFunction: S, printMethodInternal: L } = jn(), { printInterface: R } = ku(), { printBlock: O } = Lu(), { printTypeAlias: U, printIntersectionType: V, printUnionType: _, printFunctionType: Y, printTupleType: H, printIndexedAccessType: $, printJSDocType: K } = Nn();
        function ne(ee, pe, J) {
          let W = ee.getValue();
          if (!W.type.startsWith("TS"))
            return;
          if (k(W))
            return W.type.slice(2, -7).toLowerCase();
          let se = pe.semi ? ";" : "", fe = [];
          switch (W.type) {
            case "TSThisType":
              return "this";
            case "TSTypeAssertion": {
              let ae = !(W.expression.type === "ArrayExpression" || W.expression.type === "ObjectExpression"), q = s(["<", c([u, J("typeAnnotation")]), u, ">"]), X = [f("("), c([u, J("expression")]), u, f(")")];
              return ae ? C([[q, J("expression")], [q, s(X, { shouldBreak: !0 })], [q, J("expression")]]) : s([q, J("expression")]);
            }
            case "TSDeclareFunction":
              return S(ee, J, pe);
            case "TSExportAssignment":
              return ["export = ", J("expression"), se];
            case "TSModuleBlock":
              return O(ee, pe, J);
            case "TSInterfaceBody":
            case "TSTypeLiteral":
              return A(ee, pe, J);
            case "TSTypeAliasDeclaration":
              return U(ee, pe, J);
            case "TSQualifiedName":
              return i(".", [J("left"), J("right")]);
            case "TSAbstractMethodDefinition":
            case "TSDeclareMethod":
              return F(ee, pe, J);
            case "TSAbstractPropertyDefinition":
              return o(ee, pe, J);
            case "TSInterfaceHeritage":
            case "TSExpressionWithTypeArguments":
              return fe.push(J("expression")), W.typeParameters && fe.push(J("typeParameters")), fe;
            case "TSTemplateLiteralType":
              return D(ee, J, pe);
            case "TSNamedTupleMember":
              return [J("label"), W.optional ? "?" : "", ": ", J("elementType")];
            case "TSRestType":
              return ["...", J("typeAnnotation")];
            case "TSOptionalType":
              return [J("typeAnnotation"), "?"];
            case "TSInterfaceDeclaration":
              return R(ee, pe, J);
            case "TSClassImplements":
              return [J("expression"), J("typeParameters")];
            case "TSTypeParameterDeclaration":
            case "TSTypeParameterInstantiation":
              return T(ee, pe, J, "params");
            case "TSTypeParameter":
              return y(ee, pe, J);
            case "TSAsExpression": {
              fe.push(J("expression"), " as ", J("typeAnnotation"));
              let ae = ee.getParentNode();
              return g(ae) && ae.callee === W || w(ae) && ae.object === W ? s([c([u, ...fe]), u]) : fe;
            }
            case "TSArrayType":
              return [J("elementType"), "[]"];
            case "TSPropertySignature":
              return W.readonly && fe.push("readonly "), fe.push(b(ee, pe, J), B(ee)), W.typeAnnotation && fe.push(": ", J("typeAnnotation")), W.initializer && fe.push(" = ", J("initializer")), fe;
            case "TSParameterProperty":
              return W.accessibility && fe.push(W.accessibility + " "), W.export && fe.push("export "), W.static && fe.push("static "), W.override && fe.push("override "), W.readonly && fe.push("readonly "), fe.push(J("parameter")), fe;
            case "TSTypeQuery":
              return ["typeof ", J("exprName"), J("typeParameters")];
            case "TSIndexSignature": {
              let ae = ee.getParentNode(), q = W.parameters.length > 1 ? f(d(pe) ? "," : "") : "", X = s([c([u, i([", ", u], ee.map(J, "parameters"))]), q, u]);
              return [W.export ? "export " : "", W.accessibility ? [W.accessibility, " "] : "", W.static ? "static " : "", W.readonly ? "readonly " : "", W.declare ? "declare " : "", "[", W.parameters ? X : "", W.typeAnnotation ? "]: " : "]", W.typeAnnotation ? J("typeAnnotation") : "", ae.type === "ClassBody" ? se : ""];
            }
            case "TSTypePredicate":
              return [W.asserts ? "asserts " : "", J("parameterName"), W.typeAnnotation ? [" is ", J("typeAnnotation")] : ""];
            case "TSNonNullExpression":
              return [J("expression"), "!"];
            case "TSImportType":
              return [W.isTypeOf ? "typeof " : "", "import(", J(W.parameter ? "parameter" : "argument"), ")", W.qualifier ? [".", J("qualifier")] : "", T(ee, pe, J, "typeParameters")];
            case "TSLiteralType":
              return J("literal");
            case "TSIndexedAccessType":
              return $(ee, pe, J);
            case "TSConstructSignatureDeclaration":
            case "TSCallSignatureDeclaration":
            case "TSConstructorType": {
              if (W.type === "TSConstructorType" && W.abstract && fe.push("abstract "), W.type !== "TSCallSignatureDeclaration" && fe.push("new "), fe.push(s(P(ee, J, pe, !1, !0))), W.returnType || W.typeAnnotation) {
                let ae = W.type === "TSConstructorType";
                fe.push(ae ? " => " : ": ", J("returnType"), J("typeAnnotation"));
              }
              return fe;
            }
            case "TSTypeOperator":
              return [W.operator, " ", J("typeAnnotation")];
            case "TSMappedType": {
              let ae = a(pe.originalText, v(W), x(W));
              return s(["{", c([pe.bracketSpacing ? e : u, W.readonly ? [p(W.readonly, "readonly"), " "] : "", I(ee, pe, J), J("typeParameter"), W.optional ? p(W.optional, "?") : "", W.typeAnnotation ? ": " : "", J("typeAnnotation"), f(se)]), n(ee, pe, !0), pe.bracketSpacing ? e : u, "}"], { shouldBreak: ae });
            }
            case "TSMethodSignature": {
              let ae = W.kind && W.kind !== "method" ? "".concat(W.kind, " ") : "";
              fe.push(W.accessibility ? [W.accessibility, " "] : "", ae, W.export ? "export " : "", W.static ? "static " : "", W.readonly ? "readonly " : "", W.abstract ? "abstract " : "", W.declare ? "declare " : "", W.computed ? "[" : "", J("key"), W.computed ? "]" : "", B(ee));
              let q = P(ee, J, pe, !1, !0), X = W.returnType ? "returnType" : "typeAnnotation", G = W[X], le = G ? J(X) : "", Ee = E(W, le);
              return fe.push(Ee ? s(q) : q), G && fe.push(": ", s(le)), s(fe);
            }
            case "TSNamespaceExportDeclaration":
              return fe.push("export as namespace ", J("id")), pe.semi && fe.push(";"), s(fe);
            case "TSEnumDeclaration":
              return W.declare && fe.push("declare "), W.modifiers && fe.push(I(ee, pe, J)), W.const && fe.push("const "), fe.push("enum ", J("id"), " "), W.members.length === 0 ? fe.push(s(["{", n(ee, pe), u, "}"])) : fe.push(s(["{", c([t, m(ee, pe, "members", J), d(pe, "es5") ? "," : ""]), n(ee, pe, !0), t, "}"])), fe;
            case "TSEnumMember":
              return W.computed ? fe.push("[", J("id"), "]") : fe.push(J("id")), W.initializer && fe.push(" = ", J("initializer")), fe;
            case "TSImportEqualsDeclaration":
              return W.isExport && fe.push("export "), fe.push("import "), W.importKind && W.importKind !== "value" && fe.push(W.importKind, " "), fe.push(J("id"), " = ", J("moduleReference")), pe.semi && fe.push(";"), s(fe);
            case "TSExternalModuleReference":
              return ["require(", J("expression"), ")"];
            case "TSModuleDeclaration": {
              let ae = ee.getParentNode(), q = h(W.id), X = ae.type === "TSModuleDeclaration", G = W.body && W.body.type === "TSModuleDeclaration";
              if (X)
                fe.push(".");
              else {
                W.declare && fe.push("declare "), fe.push(I(ee, pe, J));
                let le = pe.originalText.slice(v(W), v(W.id));
                W.id.type === "Identifier" && W.id.name === "global" && !/namespace|module/.test(le) || fe.push(q || /(?:^|\s)module(?:\s|$)/.test(le) ? "module " : "namespace ");
              }
              return fe.push(J("id")), G ? fe.push(J("body")) : W.body ? fe.push(" ", s(J("body"))) : fe.push(se), fe;
            }
            case "TSConditionalType":
              return j(ee, pe, J);
            case "TSInferType":
              return ["infer", " ", J("typeParameter")];
            case "TSIntersectionType":
              return V(ee, pe, J);
            case "TSUnionType":
              return _(ee, pe, J);
            case "TSFunctionType":
              return Y(ee, pe, J);
            case "TSTupleType":
              return H(ee, pe, J);
            case "TSTypeReference":
              return [J("typeName"), T(ee, pe, J, "typeParameters")];
            case "TSTypeAnnotation":
              return J("typeAnnotation");
            case "TSEmptyBodyFunctionExpression":
              return L(ee, pe, J);
            case "TSJSDocAllType":
              return "*";
            case "TSJSDocUnknownType":
              return "?";
            case "TSJSDocNullableType":
              return K(ee, J, "?");
            case "TSJSDocNonNullableType":
              return K(ee, J, "!");
            case "TSInstantiationExpression":
              return [J("expression"), J("typeParameters")];
            default:
              throw new Error("Unknown TypeScript node type: ".concat(JSON.stringify(W.type), "."));
          }
        }
        l.exports = { printTypescript: ne };
      } }), Cs = Z({ "src/language-js/print/comment.js"(r, l) {
        te();
        var { hasNewline: n } = ot(), { builders: { join: a, hardline: i }, utils: { replaceTextEndOfLine: e } } = Ye(), { isLineComment: t } = mt(), { locStart: u, locEnd: s } = wt(), c = Qt();
        function C(p, d) {
          let g = p.getValue();
          if (t(g))
            return d.originalText.slice(u(g), s(g)).trimEnd();
          if (c(g)) {
            if (f(g)) {
              let v = h(g);
              return g.trailing && !n(d.originalText, u(g), { backwards: !0 }) ? [i, v] : v;
            }
            let w = s(g), k = d.originalText.slice(w - 3, w) === "*-/";
            return ["/*", e(g.value), k ? "*-/" : "*/"];
          }
          throw new Error("Not a comment: " + JSON.stringify(g));
        }
        function f(p) {
          let d = "*".concat(p.value, "*").split(`
`);
          return d.length > 1 && d.every((g) => g.trim()[0] === "*");
        }
        function h(p) {
          let d = p.value.split(`
`);
          return ["/*", a(i, d.map((g, w) => w === 0 ? g.trimEnd() : " " + (w < d.length - 1 ? g.trim() : g.trimStart()))), "*/"];
        }
        l.exports = { printComment: C };
      } }), Fs = Z({ "src/language-js/print/literal.js"(r, l) {
        te();
        var { printString: n, printNumber: a } = ot();
        function i(u, s) {
          let c = u.getNode();
          switch (c.type) {
            case "RegExpLiteral":
              return t(c);
            case "BigIntLiteral":
              return e(c.bigint || c.extra.raw);
            case "NumericLiteral":
              return a(c.extra.raw);
            case "StringLiteral":
              return n(c.extra.raw, s);
            case "NullLiteral":
              return "null";
            case "BooleanLiteral":
              return String(c.value);
            case "DecimalLiteral":
              return a(c.value) + "m";
            case "Literal": {
              if (c.regex)
                return t(c.regex);
              if (c.bigint)
                return e(c.raw);
              if (c.decimal)
                return a(c.decimal) + "m";
              let { value: C } = c;
              return typeof C == "number" ? a(c.raw) : typeof C == "string" ? n(c.raw, s) : String(C);
            }
          }
        }
        function e(u) {
          return u.toLowerCase();
        }
        function t(u) {
          let { pattern: s, flags: c } = u;
          return c = [...c].sort().join(""), "/".concat(s, "/").concat(c);
        }
        l.exports = { printLiteral: i };
      } }), As = Z({ "src/language-js/printer-estree.js"(r, l) {
        te();
        var { printDanglingComments: n } = vt(), { hasNewline: a } = ot(), { builders: { join: i, line: e, hardline: t, softline: u, group: s, indent: c }, utils: { replaceTextEndOfLine: C } } = Ye(), f = us(), h = is(), { insertPragma: p } = bu(), d = Su(), g = Zt(), w = Tu(), { hasFlowShorthandAnnotationComment: k, hasComment: v, CommentCheckFlags: x, isTheOnlyJsxElementInMarkdown: B, isLineComment: I, isNextLineEmpty: j, needsHardlineAfterDanglingComment: P, rawText: E, hasIgnoreComment: D, isCallExpression: m, isMemberExpression: A, markerForIfWithoutBlockAndSameLineComment: o } = mt(), { locStart: F, locEnd: y } = wt(), T = Qt(), { printHtmlBinding: b, isVueEventBindingExpression: S } = Ds(), { printAngular: L } = fs(), { printJsx: R, hasJsxIgnoreComment: O } = ms(), { printFlow: U } = ys(), { printTypescript: V } = Es(), { printOptionalToken: _, printBindExpressionCallee: Y, printTypeAnnotation: H, adjustClause: $, printRestSpread: K, printDefiniteToken: ne } = Pt(), { printImportDeclaration: ee, printExportDeclaration: pe, printExportAllDeclaration: J, printModuleSpecifier: W } = ju(), { printTernary: se } = Iu(), { printTemplateLiteral: fe } = Yt(), { printArray: ae } = dn(), { printObject: q } = fr(), { printClass: X, printClassMethod: G, printClassProperty: le } = mn(), { printProperty: Ee } = fn(), { printFunction: Te, printArrowFunction: $e, printMethod: qe, printReturnStatement: ce, printThrowStatement: De } = jn(), { printCallExpression: he } = Nu(), { printVariableDeclarator: ue, printAssignmentExpression: xe } = Dn(), { printBinaryishExpression: Q } = dr(), { printSwitchCaseConsequent: ve } = Pu(), { printMemberExpression: Ae } = wu(), { printBlock: be, printBlockBody: We } = Lu(), { printComment: Se } = Cs(), { printLiteral: ye } = Fs(), { printDecorators: N } = Dr();
        function z(_e, Ue, we, yt) {
          let Ie = ie(_e, Ue, we, yt);
          if (!Ie)
            return "";
          let Dt = _e.getValue(), { type: Je } = Dt;
          if (Je === "ClassMethod" || Je === "ClassPrivateMethod" || Je === "ClassProperty" || Je === "ClassAccessorProperty" || Je === "PropertyDefinition" || Je === "TSAbstractPropertyDefinition" || Je === "ClassPrivateProperty" || Je === "MethodDefinition" || Je === "TSAbstractMethodDefinition" || Je === "TSDeclareMethod")
            return Ie;
          let Ge = [Ie], it = N(_e, Ue, we), Pe = Dt.type === "ClassExpression" && it;
          if (it && (Ge = [...it, Ie], !Pe))
            return s(Ge);
          if (!g(_e, Ue))
            return yt && yt.needsSemi && Ge.unshift(";"), Ge.length === 1 && Ge[0] === Ie ? Ie : Ge;
          if (Pe && (Ge = [c([e, ...Ge])]), Ge.unshift("("), yt && yt.needsSemi && Ge.unshift(";"), k(Dt)) {
            let [He] = Dt.trailingComments;
            Ge.push(" /*", He.value.trimStart(), "*/"), He.printed = !0;
          }
          return Pe && Ge.push(e), Ge.push(")"), Ge;
        }
        function ie(_e, Ue, we, yt) {
          let Ie = _e.getValue(), Dt = Ue.semi ? ";" : "";
          if (!Ie)
            return "";
          if (typeof Ie == "string")
            return Ie;
          for (let Ge of [ye, b, L, R, U, V]) {
            let it = Ge(_e, Ue, we);
            if (typeof it < "u")
              return it;
          }
          let Je = [];
          switch (Ie.type) {
            case "JsExpressionRoot":
              return we("node");
            case "JsonRoot":
              return [we("node"), t];
            case "File":
              return Ie.program && Ie.program.interpreter && Je.push(we(["program", "interpreter"])), Je.push(we("program")), Je;
            case "Program":
              return We(_e, Ue, we);
            case "EmptyStatement":
              return "";
            case "ExpressionStatement": {
              if (Ie.directive)
                return [Be(Ie.expression, Ue), Dt];
              if (Ue.parser === "__vue_event_binding" || Ue.parser === "__vue_ts_event_binding") {
                let it = _e.getParentNode();
                if (it.type === "Program" && it.body.length === 1 && it.body[0] === Ie)
                  return [we("expression"), S(Ie.expression) ? ";" : ""];
              }
              let Ge = n(_e, Ue, !0, (it) => {
                let { marker: Pe } = it;
                return Pe === o;
              });
              return [we("expression"), B(Ue, _e) ? "" : Dt, Ge ? [" ", Ge] : ""];
            }
            case "ParenthesizedExpression":
              return !v(Ie.expression) && (Ie.expression.type === "ObjectExpression" || Ie.expression.type === "ArrayExpression") ? ["(", we("expression"), ")"] : s(["(", c([u, we("expression")]), u, ")"]);
            case "AssignmentExpression":
              return xe(_e, Ue, we);
            case "VariableDeclarator":
              return ue(_e, Ue, we);
            case "BinaryExpression":
            case "LogicalExpression":
              return Q(_e, Ue, we);
            case "AssignmentPattern":
              return [we("left"), " = ", we("right")];
            case "OptionalMemberExpression":
            case "MemberExpression":
              return Ae(_e, Ue, we);
            case "MetaProperty":
              return [we("meta"), ".", we("property")];
            case "BindExpression":
              return Ie.object && Je.push(we("object")), Je.push(s(c([u, Y(_e, Ue, we)]))), Je;
            case "Identifier":
              return [Ie.name, _(_e), ne(_e), H(_e, Ue, we)];
            case "V8IntrinsicIdentifier":
              return ["%", Ie.name];
            case "SpreadElement":
            case "SpreadElementPattern":
            case "SpreadProperty":
            case "SpreadPropertyPattern":
            case "RestElement":
              return K(_e, Ue, we);
            case "FunctionDeclaration":
            case "FunctionExpression":
              return Te(_e, we, Ue, yt);
            case "ArrowFunctionExpression":
              return $e(_e, Ue, we, yt);
            case "YieldExpression":
              return Je.push("yield"), Ie.delegate && Je.push("*"), Ie.argument && Je.push(" ", we("argument")), Je;
            case "AwaitExpression": {
              if (Je.push("await"), Ie.argument) {
                Je.push(" ", we("argument"));
                let Ge = _e.getParentNode();
                if (m(Ge) && Ge.callee === Ie || A(Ge) && Ge.object === Ie) {
                  Je = [c([u, ...Je]), u];
                  let it = _e.findAncestor((Pe) => Pe.type === "AwaitExpression" || Pe.type === "BlockStatement");
                  if (!it || it.type !== "AwaitExpression")
                    return s(Je);
                }
              }
              return Je;
            }
            case "ExportDefaultDeclaration":
            case "ExportNamedDeclaration":
              return pe(_e, Ue, we);
            case "ExportAllDeclaration":
              return J(_e, Ue, we);
            case "ImportDeclaration":
              return ee(_e, Ue, we);
            case "ImportSpecifier":
            case "ExportSpecifier":
            case "ImportNamespaceSpecifier":
            case "ExportNamespaceSpecifier":
            case "ImportDefaultSpecifier":
            case "ExportDefaultSpecifier":
              return W(_e, Ue, we);
            case "ImportAttribute":
              return [we("key"), ": ", we("value")];
            case "Import":
              return "import";
            case "BlockStatement":
            case "StaticBlock":
            case "ClassBody":
              return be(_e, Ue, we);
            case "ThrowStatement":
              return De(_e, Ue, we);
            case "ReturnStatement":
              return ce(_e, Ue, we);
            case "NewExpression":
            case "ImportExpression":
            case "OptionalCallExpression":
            case "CallExpression":
              return he(_e, Ue, we);
            case "ObjectExpression":
            case "ObjectPattern":
            case "RecordExpression":
              return q(_e, Ue, we);
            case "ObjectProperty":
            case "Property":
              return Ie.method || Ie.kind === "get" || Ie.kind === "set" ? qe(_e, Ue, we) : Ee(_e, Ue, we);
            case "ObjectMethod":
              return qe(_e, Ue, we);
            case "Decorator":
              return ["@", we("expression")];
            case "ArrayExpression":
            case "ArrayPattern":
            case "TupleExpression":
              return ae(_e, Ue, we);
            case "SequenceExpression": {
              let Ge = _e.getParentNode(0);
              if (Ge.type === "ExpressionStatement" || Ge.type === "ForStatement") {
                let it = [];
                return _e.each((Pe, He) => {
                  He === 0 ? it.push(we()) : it.push(",", c([e, we()]));
                }, "expressions"), s(it);
              }
              return s(i([",", e], _e.map(we, "expressions")));
            }
            case "ThisExpression":
              return "this";
            case "Super":
              return "super";
            case "Directive":
              return [we("value"), Dt];
            case "DirectiveLiteral":
              return Be(Ie, Ue);
            case "UnaryExpression":
              return Je.push(Ie.operator), /[a-z]$/.test(Ie.operator) && Je.push(" "), v(Ie.argument) ? Je.push(s(["(", c([u, we("argument")]), u, ")"])) : Je.push(we("argument")), Je;
            case "UpdateExpression":
              return Je.push(we("argument"), Ie.operator), Ie.prefix && Je.reverse(), Je;
            case "ConditionalExpression":
              return se(_e, Ue, we);
            case "VariableDeclaration": {
              let Ge = _e.map(we, "declarations"), it = _e.getParentNode(), Pe = it.type === "ForStatement" || it.type === "ForInStatement" || it.type === "ForOfStatement", He = Ie.declarations.some((re) => re.init), Ze;
              return Ge.length === 1 && !v(Ie.declarations[0]) ? Ze = Ge[0] : Ge.length > 0 && (Ze = c(Ge[0])), Je = [Ie.declare ? "declare " : "", Ie.kind, Ze ? [" ", Ze] : "", c(Ge.slice(1).map((re) => [",", He && !Pe ? t : e, re]))], Pe && it.body !== Ie || Je.push(Dt), s(Je);
            }
            case "WithStatement":
              return s(["with (", we("object"), ")", $(Ie.body, we("body"))]);
            case "IfStatement": {
              let Ge = $(Ie.consequent, we("consequent")), it = s(["if (", s([c([u, we("test")]), u]), ")", Ge]);
              if (Je.push(it), Ie.alternate) {
                let Pe = v(Ie.consequent, x.Trailing | x.Line) || P(Ie), He = Ie.consequent.type === "BlockStatement" && !Pe;
                Je.push(He ? " " : t), v(Ie, x.Dangling) && Je.push(n(_e, Ue, !0), Pe ? t : " "), Je.push("else", s($(Ie.alternate, we("alternate"), Ie.alternate.type === "IfStatement")));
              }
              return Je;
            }
            case "ForStatement": {
              let Ge = $(Ie.body, we("body")), it = n(_e, Ue, !0), Pe = it ? [it, u] : "";
              return !Ie.init && !Ie.test && !Ie.update ? [Pe, s(["for (;;)", Ge])] : [Pe, s(["for (", s([c([u, we("init"), ";", e, we("test"), ";", e, we("update")]), u]), ")", Ge])];
            }
            case "WhileStatement":
              return s(["while (", s([c([u, we("test")]), u]), ")", $(Ie.body, we("body"))]);
            case "ForInStatement":
              return s(["for (", we("left"), " in ", we("right"), ")", $(Ie.body, we("body"))]);
            case "ForOfStatement":
              return s(["for", Ie.await ? " await" : "", " (", we("left"), " of ", we("right"), ")", $(Ie.body, we("body"))]);
            case "DoWhileStatement": {
              let Ge = $(Ie.body, we("body"));
              return Je = [s(["do", Ge])], Ie.body.type === "BlockStatement" ? Je.push(" ") : Je.push(t), Je.push("while (", s([c([u, we("test")]), u]), ")", Dt), Je;
            }
            case "DoExpression":
              return [Ie.async ? "async " : "", "do ", we("body")];
            case "BreakStatement":
              return Je.push("break"), Ie.label && Je.push(" ", we("label")), Je.push(Dt), Je;
            case "ContinueStatement":
              return Je.push("continue"), Ie.label && Je.push(" ", we("label")), Je.push(Dt), Je;
            case "LabeledStatement":
              return Ie.body.type === "EmptyStatement" ? [we("label"), ":;"] : [we("label"), ": ", we("body")];
            case "TryStatement":
              return ["try ", we("block"), Ie.handler ? [" ", we("handler")] : "", Ie.finalizer ? [" finally ", we("finalizer")] : ""];
            case "CatchClause":
              if (Ie.param) {
                let Ge = v(Ie.param, (Pe) => !T(Pe) || Pe.leading && a(Ue.originalText, y(Pe)) || Pe.trailing && a(Ue.originalText, F(Pe), { backwards: !0 })), it = we("param");
                return ["catch ", Ge ? ["(", c([u, it]), u, ") "] : ["(", it, ") "], we("body")];
              }
              return ["catch ", we("body")];
            case "SwitchStatement":
              return [s(["switch (", c([u, we("discriminant")]), u, ")"]), " {", Ie.cases.length > 0 ? c([t, i(t, _e.map((Ge, it, Pe) => {
                let He = Ge.getValue();
                return [we(), it !== Pe.length - 1 && j(He, Ue) ? t : ""];
              }, "cases"))]) : "", t, "}"];
            case "SwitchCase": {
              Ie.test ? Je.push("case ", we("test"), ":") : Je.push("default:"), v(Ie, x.Dangling) && Je.push(" ", n(_e, Ue, !0));
              let Ge = Ie.consequent.filter((it) => it.type !== "EmptyStatement");
              if (Ge.length > 0) {
                let it = ve(_e, Ue, we);
                Je.push(Ge.length === 1 && Ge[0].type === "BlockStatement" ? [" ", it] : c([t, it]));
              }
              return Je;
            }
            case "DebuggerStatement":
              return ["debugger", Dt];
            case "ClassDeclaration":
            case "ClassExpression":
              return X(_e, Ue, we);
            case "ClassMethod":
            case "ClassPrivateMethod":
            case "MethodDefinition":
              return G(_e, Ue, we);
            case "ClassProperty":
            case "PropertyDefinition":
            case "ClassPrivateProperty":
            case "ClassAccessorProperty":
              return le(_e, Ue, we);
            case "TemplateElement":
              return C(Ie.value.raw);
            case "TemplateLiteral":
              return fe(_e, we, Ue);
            case "TaggedTemplateExpression":
              return [we("tag"), we("typeParameters"), we("quasi")];
            case "PrivateIdentifier":
              return ["#", we("name")];
            case "PrivateName":
              return ["#", we("id")];
            case "InterpreterDirective":
              return Je.push("#!", Ie.value, t), j(Ie, Ue) && Je.push(t), Je;
            case "TopicReference":
              return "%";
            case "ArgumentPlaceholder":
              return "?";
            case "ModuleExpression": {
              Je.push("module {");
              let Ge = we("body");
              return Ge && Je.push(c([t, Ge]), t), Je.push("}"), Je;
            }
            default:
              throw new Error("unknown type: " + JSON.stringify(Ie.type));
          }
        }
        function Be(_e, Ue) {
          let we = E(_e), yt = we.slice(1, -1);
          if (yt.includes('"') || yt.includes("'"))
            return we;
          let Ie = Ue.singleQuote ? "'" : '"';
          return Ie + yt + Ie;
        }
        function nt(_e) {
          return _e.type && !T(_e) && !I(_e) && _e.type !== "EmptyStatement" && _e.type !== "TemplateElement" && _e.type !== "Import" && _e.type !== "TSEmptyBodyFunctionExpression";
        }
        l.exports = { preprocess: w, print: z, embed: f, insertPragma: p, massageAstNode: h, hasPrettierIgnore(_e) {
          return D(_e) || O(_e);
        }, willPrintOwnComments: d.willPrintOwnComments, canAttachComment: nt, printComment: Se, isBlockComment: T, handleComments: { avoidAstMutation: !0, ownLine: d.handleOwnLineComment, endOfLine: d.handleEndOfLineComment, remaining: d.handleRemainingComment }, getCommentChildNodes: d.getCommentChildNodes };
      } }), vs = Z({ "src/language-js/printer-estree-json.js"(r, l) {
        te();
        var { builders: { hardline: n, indent: a, join: i } } = Ye(), e = Tu();
        function t(c, C, f) {
          let h = c.getValue();
          switch (h.type) {
            case "JsonRoot":
              return [f("node"), n];
            case "ArrayExpression": {
              if (h.elements.length === 0)
                return "[]";
              let p = c.map(() => c.getValue() === null ? "null" : f(), "elements");
              return ["[", a([n, i([",", n], p)]), n, "]"];
            }
            case "ObjectExpression":
              return h.properties.length === 0 ? "{}" : ["{", a([n, i([",", n], c.map(f, "properties"))]), n, "}"];
            case "ObjectProperty":
              return [f("key"), ": ", f("value")];
            case "UnaryExpression":
              return [h.operator === "+" ? "" : h.operator, f("argument")];
            case "NullLiteral":
              return "null";
            case "BooleanLiteral":
              return h.value ? "true" : "false";
            case "StringLiteral":
            case "NumericLiteral":
              return JSON.stringify(h.value);
            case "Identifier": {
              let p = c.getParentNode();
              return p && p.type === "ObjectProperty" && p.key === h ? JSON.stringify(h.name) : h.name;
            }
            case "TemplateLiteral":
              return f(["quasis", 0]);
            case "TemplateElement":
              return JSON.stringify(h.value.cooked);
            default:
              throw new Error("unknown type: " + JSON.stringify(h.type));
          }
        }
        var u = /* @__PURE__ */ new Set(["start", "end", "extra", "loc", "comments", "leadingComments", "trailingComments", "innerComments", "errors", "range", "tokens"]);
        function s(c, C) {
          let { type: f } = c;
          if (f === "ObjectProperty" && c.key.type === "Identifier") {
            C.key = { type: "StringLiteral", value: c.key.name };
            return;
          }
          if (f === "UnaryExpression" && c.operator === "+")
            return C.argument;
          if (f === "ArrayExpression") {
            for (let [h, p] of c.elements.entries())
              p === null && C.elements.splice(h, 0, { type: "NullLiteral" });
            return;
          }
          if (f === "TemplateLiteral")
            return { type: "StringLiteral", value: c.quasis[0].value.cooked };
        }
        s.ignoredProperties = u, l.exports = { preprocess: e, print: t, massageAstNode: s };
      } }), Kt = Z({ "src/common/common-options.js"(r, l) {
        te();
        var n = "Common";
        l.exports = { bracketSpacing: { since: "0.0.0", category: n, type: "boolean", default: !0, description: "Print spaces between brackets.", oppositeDescription: "Do not print spaces between brackets." }, singleQuote: { since: "0.0.0", category: n, type: "boolean", default: !1, description: "Use single quotes instead of double quotes." }, proseWrap: { since: "1.8.2", category: n, type: "choice", default: [{ since: "1.8.2", value: !0 }, { since: "1.9.0", value: "preserve" }], description: "How to wrap prose.", choices: [{ since: "1.9.0", value: "always", description: "Wrap prose if it exceeds the print width." }, { since: "1.9.0", value: "never", description: "Do not wrap prose." }, { since: "1.9.0", value: "preserve", description: "Wrap prose as-is." }] }, bracketSameLine: { since: "2.4.0", category: n, type: "boolean", default: !1, description: "Put > of opening tags on the last line instead of on a new line." }, singleAttributePerLine: { since: "2.6.0", category: n, type: "boolean", default: !1, description: "Enforce single attribute per line in HTML, Vue and JSX." } };
      } }), xs = Z({ "src/language-js/options.js"(r, l) {
        te();
        var n = Kt(), a = "JavaScript";
        l.exports = { arrowParens: { since: "1.9.0", category: a, type: "choice", default: [{ since: "1.9.0", value: "avoid" }, { since: "2.0.0", value: "always" }], description: "Include parentheses around a sole arrow function parameter.", choices: [{ value: "always", description: "Always include parens. Example: `(x) => x`" }, { value: "avoid", description: "Omit parens when possible. Example: `x => x`" }] }, bracketSameLine: n.bracketSameLine, bracketSpacing: n.bracketSpacing, jsxBracketSameLine: { since: "0.17.0", category: a, type: "boolean", description: "Put > on the last line instead of at a new line.", deprecated: "2.4.0" }, semi: { since: "1.0.0", category: a, type: "boolean", default: !0, description: "Print semicolons.", oppositeDescription: "Do not print semicolons, except at the beginning of lines which may need them." }, singleQuote: n.singleQuote, jsxSingleQuote: { since: "1.15.0", category: a, type: "boolean", default: !1, description: "Use single quotes in JSX." }, quoteProps: { since: "1.17.0", category: a, type: "choice", default: "as-needed", description: "Change when properties in objects are quoted.", choices: [{ value: "as-needed", description: "Only add quotes around object properties where required." }, { value: "consistent", description: "If at least one property in an object requires quotes, quote all properties." }, { value: "preserve", description: "Respect the input use of quotes in object properties." }] }, trailingComma: { since: "0.0.0", category: a, type: "choice", default: [{ since: "0.0.0", value: !1 }, { since: "0.19.0", value: "none" }, { since: "2.0.0", value: "es5" }], description: "Print trailing commas wherever possible when multi-line.", choices: [{ value: "es5", description: "Trailing commas where valid in ES5 (objects, arrays, etc.)" }, { value: "none", description: "No trailing commas." }, { value: "all", description: "Trailing commas wherever possible (including function arguments)." }] }, singleAttributePerLine: n.singleAttributePerLine };
      } }), bs = Z({ "src/language-js/parse/parsers.js"() {
        te();
      } }), mr = Z({ "node_modules/linguist-languages/data/JavaScript.json"(r, l) {
        l.exports = { name: "JavaScript", type: "programming", tmScope: "source.js", aceMode: "javascript", codemirrorMode: "javascript", codemirrorMimeType: "text/javascript", color: "#f1e05a", aliases: ["js", "node"], extensions: [".js", "._js", ".bones", ".cjs", ".es", ".es6", ".frag", ".gs", ".jake", ".javascript", ".jsb", ".jscad", ".jsfl", ".jslib", ".jsm", ".jspre", ".jss", ".jsx", ".mjs", ".njs", ".pac", ".sjs", ".ssjs", ".xsjs", ".xsjslib"], filenames: ["Jakefile"], interpreters: ["chakra", "d8", "gjs", "js", "node", "nodejs", "qjs", "rhino", "v8", "v8-shell"], languageId: 183 };
      } }), Ss = Z({ "node_modules/linguist-languages/data/TypeScript.json"(r, l) {
        l.exports = { name: "TypeScript", type: "programming", color: "#3178c6", aliases: ["ts"], interpreters: ["deno", "ts-node"], extensions: [".ts", ".cts", ".mts"], tmScope: "source.ts", aceMode: "typescript", codemirrorMode: "javascript", codemirrorMimeType: "application/typescript", languageId: 378 };
      } }), Ts = Z({ "node_modules/linguist-languages/data/TSX.json"(r, l) {
        l.exports = { name: "TSX", type: "programming", color: "#3178c6", group: "TypeScript", extensions: [".tsx"], tmScope: "source.tsx", aceMode: "javascript", codemirrorMode: "jsx", codemirrorMimeType: "text/jsx", languageId: 94901924 };
      } }), Ou = Z({ "node_modules/linguist-languages/data/JSON.json"(r, l) {
        l.exports = { name: "JSON", type: "data", color: "#292929", tmScope: "source.json", aceMode: "json", codemirrorMode: "javascript", codemirrorMimeType: "application/json", aliases: ["geojson", "jsonl", "topojson"], extensions: [".json", ".4DForm", ".4DProject", ".avsc", ".geojson", ".gltf", ".har", ".ice", ".JSON-tmLanguage", ".jsonl", ".mcmeta", ".tfstate", ".tfstate.backup", ".topojson", ".webapp", ".webmanifest", ".yy", ".yyp"], filenames: [".arcconfig", ".auto-changelog", ".c8rc", ".htmlhintrc", ".imgbotconfig", ".nycrc", ".tern-config", ".tern-project", ".watchmanconfig", "Pipfile.lock", "composer.lock", "mcmod.info"], languageId: 174 };
      } }), Bs = Z({ "node_modules/linguist-languages/data/JSON with Comments.json"(r, l) {
        l.exports = { name: "JSON with Comments", type: "data", color: "#292929", group: "JSON", tmScope: "source.js", aceMode: "javascript", codemirrorMode: "javascript", codemirrorMimeType: "text/javascript", aliases: ["jsonc"], extensions: [".jsonc", ".code-snippets", ".sublime-build", ".sublime-commands", ".sublime-completions", ".sublime-keymap", ".sublime-macro", ".sublime-menu", ".sublime-mousemap", ".sublime-project", ".sublime-settings", ".sublime-theme", ".sublime-workspace", ".sublime_metrics", ".sublime_session"], filenames: [".babelrc", ".devcontainer.json", ".eslintrc.json", ".jscsrc", ".jshintrc", ".jslintrc", "api-extractor.json", "devcontainer.json", "jsconfig.json", "language-configuration.json", "tsconfig.json", "tslint.json"], languageId: 423 };
      } }), ws = Z({ "node_modules/linguist-languages/data/JSON5.json"(r, l) {
        l.exports = { name: "JSON5", type: "data", color: "#267CB9", extensions: [".json5"], tmScope: "source.js", aceMode: "javascript", codemirrorMode: "javascript", codemirrorMimeType: "application/json", languageId: 175 };
      } }), Ns = Z({ "src/language-js/index.js"(r, l) {
        te();
        var n = qt(), a = As(), i = vs(), e = xs(), t = bs(), u = [n(mr(), (c) => ({ since: "0.0.0", parsers: ["babel", "acorn", "espree", "meriyah", "babel-flow", "babel-ts", "flow", "typescript"], vscodeLanguageIds: ["javascript", "mongo"], interpreters: [...c.interpreters, "zx"], extensions: [...c.extensions.filter((C) => C !== ".jsx"), ".wxs"] })), n(mr(), () => ({ name: "Flow", since: "0.0.0", parsers: ["flow", "babel-flow"], vscodeLanguageIds: ["javascript"], aliases: [], filenames: [], extensions: [".js.flow"] })), n(mr(), () => ({ name: "JSX", since: "0.0.0", parsers: ["babel", "babel-flow", "babel-ts", "flow", "typescript", "espree", "meriyah"], vscodeLanguageIds: ["javascriptreact"], aliases: void 0, filenames: void 0, extensions: [".jsx"], group: "JavaScript", interpreters: void 0, tmScope: "source.js.jsx", aceMode: "javascript", codemirrorMode: "jsx", codemirrorMimeType: "text/jsx", color: void 0 })), n(Ss(), () => ({ since: "1.4.0", parsers: ["typescript", "babel-ts"], vscodeLanguageIds: ["typescript"] })), n(Ts(), () => ({ since: "1.4.0", parsers: ["typescript", "babel-ts"], vscodeLanguageIds: ["typescriptreact"] })), n(Ou(), () => ({ name: "JSON.stringify", since: "1.13.0", parsers: ["json-stringify"], vscodeLanguageIds: ["json"], extensions: [".importmap"], filenames: ["package.json", "package-lock.json", "composer.json"] })), n(Ou(), (c) => ({ since: "1.5.0", parsers: ["json"], vscodeLanguageIds: ["json"], extensions: c.extensions.filter((C) => C !== ".jsonl") })), n(Bs(), (c) => ({ since: "1.5.0", parsers: ["json"], vscodeLanguageIds: ["jsonc"], filenames: [...c.filenames, ".eslintrc", ".swcrc"] })), n(ws(), () => ({ since: "1.13.0", parsers: ["json5"], vscodeLanguageIds: ["json5"] }))], s = { estree: a, "estree-json": i };
        l.exports = { languages: u, options: e, printers: s, parsers: t };
      } }), ks = Z({ "src/language-css/clean.js"(r, l) {
        te();
        var { isFrontMatterNode: n } = ot(), a = It(), i = /* @__PURE__ */ new Set(["raw", "raws", "sourceIndex", "source", "before", "after", "trailingComma"]);
        function e(u, s, c) {
          if (n(u) && u.lang === "yaml" && delete s.value, u.type === "css-comment" && c.type === "css-root" && c.nodes.length > 0 && ((c.nodes[0] === u || n(c.nodes[0]) && c.nodes[1] === u) && (delete s.text, /^\*\s*@(?:format|prettier)\s*$/.test(u.text)) || c.type === "css-root" && a(c.nodes) === u))
            return null;
          if (u.type === "value-root" && delete s.text, (u.type === "media-query" || u.type === "media-query-list" || u.type === "media-feature-expression") && delete s.value, u.type === "css-rule" && delete s.params, u.type === "selector-combinator" && (s.value = s.value.replace(/\s+/g, " ")), u.type === "media-feature" && (s.value = s.value.replace(/ /g, "")), (u.type === "value-word" && (u.isColor && u.isHex || ["initial", "inherit", "unset", "revert"].includes(s.value.replace().toLowerCase())) || u.type === "media-feature" || u.type === "selector-root-invalid" || u.type === "selector-pseudo") && (s.value = s.value.toLowerCase()), u.type === "css-decl" && (s.prop = s.prop.toLowerCase()), (u.type === "css-atrule" || u.type === "css-import") && (s.name = s.name.toLowerCase()), u.type === "value-number" && (s.unit = s.unit.toLowerCase()), (u.type === "media-feature" || u.type === "media-keyword" || u.type === "media-type" || u.type === "media-unknown" || u.type === "media-url" || u.type === "media-value" || u.type === "selector-attribute" || u.type === "selector-string" || u.type === "selector-class" || u.type === "selector-combinator" || u.type === "value-string") && s.value && (s.value = t(s.value)), u.type === "selector-attribute" && (s.attribute = s.attribute.trim(), s.namespace && typeof s.namespace == "string" && (s.namespace = s.namespace.trim(), s.namespace.length === 0 && (s.namespace = !0)), s.value && (s.value = s.value.trim().replace(/^["']|["']$/g, ""), delete s.quoted)), (u.type === "media-value" || u.type === "media-type" || u.type === "value-number" || u.type === "selector-root-invalid" || u.type === "selector-class" || u.type === "selector-combinator" || u.type === "selector-tag") && s.value && (s.value = s.value.replace(/([\d+.Ee-]+)([A-Za-z]*)/g, (C, f, h) => {
            let p = Number(f);
            return Number.isNaN(p) ? C : p + h.toLowerCase();
          })), u.type === "selector-tag") {
            let C = u.value.toLowerCase();
            ["from", "to"].includes(C) && (s.value = C);
          }
          if (u.type === "css-atrule" && u.name.toLowerCase() === "supports" && delete s.value, u.type === "selector-unknown" && delete s.value, u.type === "value-comma_group") {
            let C = u.groups.findIndex((f) => f.type === "value-number" && f.unit === "...");
            C !== -1 && (s.groups[C].unit = "", s.groups.splice(C + 1, 0, { type: "value-word", value: "...", isColor: !1, isHex: !1 }));
          }
        }
        e.ignoredProperties = i;
        function t(u) {
          return u.replace(/'/g, '"').replace(/\\([^\dA-Fa-f])/g, "$1");
        }
        l.exports = e;
      } }), gr = Z({ "src/utils/front-matter/print.js"(r, l) {
        te();
        var { builders: { hardline: n, markAsRoot: a } } = Ye();
        function i(e, t) {
          if (e.lang === "yaml") {
            let u = e.value.trim(), s = u ? t(u, { parser: "yaml" }, { stripTrailingHardline: !0 }) : "";
            return a([e.startDelimiter, n, s, s ? n : "", e.endDelimiter]);
          }
        }
        l.exports = i;
      } }), js = Z({ "src/language-css/embed.js"(r, l) {
        te();
        var { builders: { hardline: n } } = Ye(), a = gr();
        function i(e, t, u) {
          let s = e.getValue();
          if (s.type === "front-matter") {
            let c = a(s, u);
            return c ? [c, n] : "";
          }
        }
        l.exports = i;
      } }), Mu = Z({ "src/utils/front-matter/parse.js"(r, l) {
        te();
        var n = new RegExp("^(?<startDelimiter>-{3}|\\+{3})(?<language>[^\\n]*)\\n(?:|(?<value>.*?)\\n)(?<endDelimiter>\\k<startDelimiter>|\\.{3})[^\\S\\n]*(?:\\n|$)", "s");
        function a(i) {
          let e = i.match(n);
          if (!e)
            return { content: i };
          let { startDelimiter: t, language: u, value: s = "", endDelimiter: c } = e.groups, C = u.trim() || "yaml";
          if (t === "+++" && (C = "toml"), C !== "yaml" && t !== c)
            return { content: i };
          let [f] = e;
          return { frontMatter: { type: "front-matter", lang: C, value: s, startDelimiter: t, endDelimiter: c, raw: f.replace(/\n$/, "") }, content: f.replace(/[^\n]/g, " ") + i.slice(f.length) };
        }
        l.exports = a;
      } }), Is = Z({ "src/language-css/pragma.js"(r, l) {
        te();
        var n = bu(), a = Mu();
        function i(t) {
          return n.hasPragma(a(t).content);
        }
        function e(t) {
          let { frontMatter: u, content: s } = a(t);
          return (u ? u.raw + `

` : "") + n.insertPragma(s);
        }
        l.exports = { hasPragma: i, insertPragma: e };
      } }), Ps = Z({ "src/language-css/utils/index.js"(r, l) {
        te();
        var n = /* @__PURE__ */ new Set(["red", "green", "blue", "alpha", "a", "rgb", "hue", "h", "saturation", "s", "lightness", "l", "whiteness", "w", "blackness", "b", "tint", "shade", "blend", "blenda", "contrast", "hsl", "hsla", "hwb", "hwba"]);
        function a(q, X) {
          let G = Array.isArray(X) ? X : [X], le = -1, Ee;
          for (; Ee = q.getParentNode(++le); )
            if (G.includes(Ee.type))
              return le;
          return -1;
        }
        function i(q, X) {
          let G = a(q, X);
          return G === -1 ? null : q.getParentNode(G);
        }
        function e(q) {
          var X;
          let G = i(q, "css-decl");
          return G == null || (X = G.prop) === null || X === void 0 ? void 0 : X.toLowerCase();
        }
        var t = /* @__PURE__ */ new Set(["initial", "inherit", "unset", "revert"]);
        function u(q) {
          return t.has(q.toLowerCase());
        }
        function s(q, X) {
          let G = i(q, "css-atrule");
          return (G == null ? void 0 : G.name) && G.name.toLowerCase().endsWith("keyframes") && ["from", "to"].includes(X.toLowerCase());
        }
        function c(q) {
          return q.includes("$") || q.includes("@") || q.includes("#") || q.startsWith("%") || q.startsWith("--") || q.startsWith(":--") || q.includes("(") && q.includes(")") ? q : q.toLowerCase();
        }
        function C(q, X) {
          var G;
          let le = i(q, "value-func");
          return (le == null || (G = le.value) === null || G === void 0 ? void 0 : G.toLowerCase()) === X;
        }
        function f(q) {
          var X;
          let G = i(q, "css-rule"), le = G == null || (X = G.raws) === null || X === void 0 ? void 0 : X.selector;
          return le && (le.startsWith(":import") || le.startsWith(":export"));
        }
        function h(q, X) {
          let G = Array.isArray(X) ? X : [X], le = i(q, "css-atrule");
          return le && G.includes(le.name.toLowerCase());
        }
        function p(q) {
          let X = q.getValue(), G = i(q, "css-atrule");
          return (G == null ? void 0 : G.name) === "import" && X.groups[0].value === "url" && X.groups.length === 2;
        }
        function d(q) {
          return q.type === "value-func" && q.value.toLowerCase() === "url";
        }
        function g(q, X) {
          var G;
          let le = (G = q.getParentNode()) === null || G === void 0 ? void 0 : G.nodes;
          return le && le.indexOf(X) === le.length - 1;
        }
        function w(q) {
          let { selector: X } = q;
          return X ? typeof X == "string" && /^@.+:.*$/.test(X) || X.value && /^@.+:.*$/.test(X.value) : !1;
        }
        function k(q) {
          return q.type === "value-word" && ["from", "through", "end"].includes(q.value);
        }
        function v(q) {
          return q.type === "value-word" && ["and", "or", "not"].includes(q.value);
        }
        function x(q) {
          return q.type === "value-word" && q.value === "in";
        }
        function B(q) {
          return q.type === "value-operator" && q.value === "*";
        }
        function I(q) {
          return q.type === "value-operator" && q.value === "/";
        }
        function j(q) {
          return q.type === "value-operator" && q.value === "+";
        }
        function P(q) {
          return q.type === "value-operator" && q.value === "-";
        }
        function E(q) {
          return q.type === "value-operator" && q.value === "%";
        }
        function D(q) {
          return B(q) || I(q) || j(q) || P(q) || E(q);
        }
        function m(q) {
          return q.type === "value-word" && ["==", "!="].includes(q.value);
        }
        function A(q) {
          return q.type === "value-word" && ["<", ">", "<=", ">="].includes(q.value);
        }
        function o(q) {
          return q.type === "css-atrule" && ["if", "else", "for", "each", "while"].includes(q.name);
        }
        function F(q) {
          var X;
          return ((X = q.raws) === null || X === void 0 ? void 0 : X.params) && /^\(\s*\)$/.test(q.raws.params);
        }
        function y(q) {
          return q.name.startsWith("prettier-placeholder");
        }
        function T(q) {
          return q.prop.startsWith("@prettier-placeholder");
        }
        function b(q, X) {
          return q.value === "$$" && q.type === "value-func" && (X == null ? void 0 : X.type) === "value-word" && !X.raws.before;
        }
        function S(q) {
          var X, G;
          return ((X = q.value) === null || X === void 0 ? void 0 : X.type) === "value-root" && ((G = q.value.group) === null || G === void 0 ? void 0 : G.type) === "value-value" && q.prop.toLowerCase() === "composes";
        }
        function L(q) {
          var X, G, le;
          return ((X = q.value) === null || X === void 0 || (G = X.group) === null || G === void 0 || (le = G.group) === null || le === void 0 ? void 0 : le.type) === "value-paren_group" && q.value.group.group.open !== null && q.value.group.group.close !== null;
        }
        function R(q) {
          var X;
          return ((X = q.raws) === null || X === void 0 ? void 0 : X.before) === "";
        }
        function O(q) {
          var X, G;
          return q.type === "value-comma_group" && ((X = q.groups) === null || X === void 0 || (G = X[1]) === null || G === void 0 ? void 0 : G.type) === "value-colon";
        }
        function U(q) {
          var X;
          return q.type === "value-paren_group" && ((X = q.groups) === null || X === void 0 ? void 0 : X[0]) && O(q.groups[0]);
        }
        function V(q) {
          var X;
          let G = q.getValue();
          if (G.groups.length === 0)
            return !1;
          let le = q.getParentNode(1);
          if (!U(G) && !(le && U(le)))
            return !1;
          let Ee = i(q, "css-decl");
          return !!(Ee != null && (X = Ee.prop) !== null && X !== void 0 && X.startsWith("$") || U(le) || le.type === "value-func");
        }
        function _(q) {
          return q.type === "value-comment" && q.inline;
        }
        function Y(q) {
          return q.type === "value-word" && q.value === "#";
        }
        function H(q) {
          return q.type === "value-word" && q.value === "{";
        }
        function $(q) {
          return q.type === "value-word" && q.value === "}";
        }
        function K(q) {
          return ["value-word", "value-atword"].includes(q.type);
        }
        function ne(q) {
          return (q == null ? void 0 : q.type) === "value-colon";
        }
        function ee(q, X) {
          if (!O(X))
            return !1;
          let { groups: G } = X, le = G.indexOf(q);
          return le === -1 ? !1 : ne(G[le + 1]);
        }
        function pe(q) {
          return q.value && ["not", "and", "or"].includes(q.value.toLowerCase());
        }
        function J(q) {
          return q.type !== "value-func" ? !1 : n.has(q.value.toLowerCase());
        }
        function W(q) {
          return /\/\//.test(q.split(/[\n\r]/).pop());
        }
        function se(q) {
          return (q == null ? void 0 : q.type) === "value-atword" && q.value.startsWith("prettier-placeholder-");
        }
        function fe(q, X) {
          var G, le;
          if (((G = q.open) === null || G === void 0 ? void 0 : G.value) !== "(" || ((le = q.close) === null || le === void 0 ? void 0 : le.value) !== ")" || q.groups.some((Ee) => Ee.type !== "value-comma_group"))
            return !1;
          if (X.type === "value-comma_group") {
            let Ee = X.groups.indexOf(q) - 1, Te = X.groups[Ee];
            if ((Te == null ? void 0 : Te.type) === "value-word" && Te.value === "with")
              return !0;
          }
          return !1;
        }
        function ae(q) {
          var X, G;
          return q.type === "value-paren_group" && ((X = q.open) === null || X === void 0 ? void 0 : X.value) === "(" && ((G = q.close) === null || G === void 0 ? void 0 : G.value) === ")";
        }
        l.exports = { getAncestorCounter: a, getAncestorNode: i, getPropOfDeclNode: e, maybeToLowerCase: c, insideValueFunctionNode: C, insideICSSRuleNode: f, insideAtRuleNode: h, insideURLFunctionInImportAtRuleNode: p, isKeyframeAtRuleKeywords: s, isWideKeywords: u, isLastNode: g, isSCSSControlDirectiveNode: o, isDetachedRulesetDeclarationNode: w, isRelationalOperatorNode: A, isEqualityOperatorNode: m, isMultiplicationNode: B, isDivisionNode: I, isAdditionNode: j, isSubtractionNode: P, isModuloNode: E, isMathOperatorNode: D, isEachKeywordNode: x, isForKeywordNode: k, isURLFunctionNode: d, isIfElseKeywordNode: v, hasComposesNode: S, hasParensAroundNode: L, hasEmptyRawBefore: R, isDetachedRulesetCallNode: F, isTemplatePlaceholderNode: y, isTemplatePropNode: T, isPostcssSimpleVarNode: b, isKeyValuePairNode: O, isKeyValuePairInParenGroupNode: U, isKeyInValuePairNode: ee, isSCSSMapItemNode: V, isInlineValueCommentNode: _, isHashNode: Y, isLeftCurlyBraceNode: H, isRightCurlyBraceNode: $, isWordNode: K, isColonNode: ne, isMediaAndSupportsKeywords: pe, isColorAdjusterFuncNode: J, lastLineHasInlineComment: W, isAtWordPlaceholderNode: se, isConfigurationNode: fe, isParenGroupNode: ae };
      } }), Ls = Z({ "src/utils/line-column-to-index.js"(r, l) {
        te(), l.exports = function(n, a) {
          let i = 0;
          for (let e = 0; e < n.line - 1; ++e)
            i = a.indexOf(`
`, i) + 1;
          return i + n.column;
        };
      } }), Os = Z({ "src/language-css/loc.js"(r, l) {
        te();
        var { skipEverythingButNewLine: n } = An(), a = It(), i = Ls();
        function e(p, d) {
          return typeof p.sourceIndex == "number" ? p.sourceIndex : p.source ? i(p.source.start, d) - 1 : null;
        }
        function t(p, d) {
          if (p.type === "css-comment" && p.inline)
            return n(d, p.source.startOffset);
          let g = p.nodes && a(p.nodes);
          return g && p.source && !p.source.end && (p = g), p.source && p.source.end ? i(p.source.end, d) : null;
        }
        function u(p, d) {
          p.source && (p.source.startOffset = e(p, d), p.source.endOffset = t(p, d));
          for (let g in p) {
            let w = p[g];
            g === "source" || !w || typeof w != "object" || (w.type === "value-root" || w.type === "value-unknown" ? s(w, c(p), w.text || w.value) : u(w, d));
          }
        }
        function s(p, d, g) {
          p.source && (p.source.startOffset = e(p, g) + d, p.source.endOffset = t(p, g) + d);
          for (let w in p) {
            let k = p[w];
            w === "source" || !k || typeof k != "object" || s(k, d, g);
          }
        }
        function c(p) {
          let d = p.source.startOffset;
          return typeof p.prop == "string" && (d += p.prop.length), p.type === "css-atrule" && typeof p.name == "string" && (d += 1 + p.name.length + p.raws.afterName.match(/^\s*:?\s*/)[0].length), p.type !== "css-atrule" && p.raws && typeof p.raws.between == "string" && (d += p.raws.between.length), d;
        }
        function C(p) {
          let d = "initial", g = "initial", w, k = !1, v = [];
          for (let x = 0; x < p.length; x++) {
            let B = p[x];
            switch (d) {
              case "initial":
                if (B === "'") {
                  d = "single-quotes";
                  continue;
                }
                if (B === '"') {
                  d = "double-quotes";
                  continue;
                }
                if ((B === "u" || B === "U") && p.slice(x, x + 4).toLowerCase() === "url(") {
                  d = "url", x += 3;
                  continue;
                }
                if (B === "*" && p[x - 1] === "/") {
                  d = "comment-block";
                  continue;
                }
                if (B === "/" && p[x - 1] === "/") {
                  d = "comment-inline", w = x - 1;
                  continue;
                }
                continue;
              case "single-quotes":
                if (B === "'" && p[x - 1] !== "\\" && (d = g, g = "initial"), B === `
` || B === "\r")
                  return p;
                continue;
              case "double-quotes":
                if (B === '"' && p[x - 1] !== "\\" && (d = g, g = "initial"), B === `
` || B === "\r")
                  return p;
                continue;
              case "url":
                if (B === ")" && (d = "initial"), B === `
` || B === "\r")
                  return p;
                if (B === "'") {
                  d = "single-quotes", g = "url";
                  continue;
                }
                if (B === '"') {
                  d = "double-quotes", g = "url";
                  continue;
                }
                continue;
              case "comment-block":
                B === "/" && p[x - 1] === "*" && (d = "initial");
                continue;
              case "comment-inline":
                (B === '"' || B === "'" || B === "*") && (k = !0), (B === `
` || B === "\r") && (k && v.push([w, x]), d = "initial", k = !1);
                continue;
            }
          }
          for (let [x, B] of v)
            p = p.slice(0, x) + p.slice(x, B).replace(/["'*]/g, " ") + p.slice(B);
          return p;
        }
        function f(p) {
          return p.source.startOffset;
        }
        function h(p) {
          return p.source.endOffset;
        }
        l.exports = { locStart: f, locEnd: h, calculateLoc: u, replaceQuotesInInlineComments: C };
      } }), Ms = Z({ "src/language-css/utils/is-less-parser.js"(r, l) {
        te();
        function n(a) {
          return a.parser === "css" || a.parser === "less";
        }
        l.exports = n;
      } }), _s = Z({ "src/language-css/utils/is-scss.js"(r, l) {
        te();
        function n(a, i) {
          return a === "less" || a === "scss" ? a === "scss" : /(?:\w\s*:\s*[^:}]+|#){|@import[^\n]+(?:url|,)/.test(i);
        }
        l.exports = n;
      } }), Rs = Z({ "src/language-css/utils/css-units.evaluate.js"(r, l) {
        l.exports = { em: "em", rem: "rem", ex: "ex", rex: "rex", cap: "cap", rcap: "rcap", ch: "ch", rch: "rch", ic: "ic", ric: "ric", lh: "lh", rlh: "rlh", vw: "vw", svw: "svw", lvw: "lvw", dvw: "dvw", vh: "vh", svh: "svh", lvh: "lvh", dvh: "dvh", vi: "vi", svi: "svi", lvi: "lvi", dvi: "dvi", vb: "vb", svb: "svb", lvb: "lvb", dvb: "dvb", vmin: "vmin", svmin: "svmin", lvmin: "lvmin", dvmin: "dvmin", vmax: "vmax", svmax: "svmax", lvmax: "lvmax", dvmax: "dvmax", cm: "cm", mm: "mm", q: "Q", in: "in", pt: "pt", pc: "pc", px: "px", deg: "deg", grad: "grad", rad: "rad", turn: "turn", s: "s", ms: "ms", hz: "Hz", khz: "kHz", dpi: "dpi", dpcm: "dpcm", dppx: "dppx", x: "x" };
      } }), Vs = Z({ "src/language-css/utils/print-unit.js"(r, l) {
        te();
        var n = Rs();
        function a(i) {
          let e = i.toLowerCase();
          return Object.prototype.hasOwnProperty.call(n, e) ? n[e] : i;
        }
        l.exports = a;
      } }), $s = Z({ "src/language-css/printer-postcss.js"(r, l) {
        te();
        var n = It(), { printNumber: a, printString: i, hasNewline: e, isFrontMatterNode: t, isNextLineEmpty: u, isNonEmptyArray: s } = ot(), { builders: { join: c, line: C, hardline: f, softline: h, group: p, fill: d, indent: g, dedent: w, ifBreak: k, breakParent: v }, utils: { removeLines: x, getDocParts: B } } = Ye(), I = ks(), j = js(), { insertPragma: P } = Is(), { getAncestorNode: E, getPropOfDeclNode: D, maybeToLowerCase: m, insideValueFunctionNode: A, insideICSSRuleNode: o, insideAtRuleNode: F, insideURLFunctionInImportAtRuleNode: y, isKeyframeAtRuleKeywords: T, isWideKeywords: b, isLastNode: S, isSCSSControlDirectiveNode: L, isDetachedRulesetDeclarationNode: R, isRelationalOperatorNode: O, isEqualityOperatorNode: U, isMultiplicationNode: V, isDivisionNode: _, isAdditionNode: Y, isSubtractionNode: H, isMathOperatorNode: $, isEachKeywordNode: K, isForKeywordNode: ne, isURLFunctionNode: ee, isIfElseKeywordNode: pe, hasComposesNode: J, hasParensAroundNode: W, hasEmptyRawBefore: se, isKeyValuePairNode: fe, isKeyInValuePairNode: ae, isDetachedRulesetCallNode: q, isTemplatePlaceholderNode: X, isTemplatePropNode: G, isPostcssSimpleVarNode: le, isSCSSMapItemNode: Ee, isInlineValueCommentNode: Te, isHashNode: $e, isLeftCurlyBraceNode: qe, isRightCurlyBraceNode: ce, isWordNode: De, isColonNode: he, isMediaAndSupportsKeywords: ue, isColorAdjusterFuncNode: xe, lastLineHasInlineComment: Q, isAtWordPlaceholderNode: ve, isConfigurationNode: Ae, isParenGroupNode: be } = Ps(), { locStart: We, locEnd: Se } = Os(), ye = Ms(), N = _s(), z = Vs();
        function ie(Pe) {
          return Pe.trailingComma === "es5" || Pe.trailingComma === "all";
        }
        function Be(Pe, He, Ze) {
          let re = Pe.getValue();
          if (!re)
            return "";
          if (typeof re == "string")
            return re;
          switch (re.type) {
            case "front-matter":
              return [re.raw, f];
            case "css-root": {
              let ct = nt(Pe, He, Ze), rt = re.raws.after.trim();
              return [ct, rt ? " ".concat(rt) : "", B(ct).length > 0 ? f : ""];
            }
            case "css-comment": {
              let ct = re.inline || re.raws.inline, rt = He.originalText.slice(We(re), Se(re));
              return ct ? rt.trimEnd() : rt;
            }
            case "css-rule":
              return [Ze("selector"), re.important ? " !important" : "", re.nodes ? [re.selector && re.selector.type === "selector-unknown" && Q(re.selector.value) ? C : " ", "{", re.nodes.length > 0 ? g([f, nt(Pe, He, Ze)]) : "", f, "}", R(re) ? ";" : ""] : ";"];
            case "css-decl": {
              let ct = Pe.getParentNode(), { between: rt } = re.raws, pt = rt.trim(), Nt = pt === ":", xt = J(re) ? x(Ze("value")) : Ze("value");
              return !Nt && Q(pt) && (xt = g([f, w(xt)])), [re.raws.before.replace(/[\s;]/g, ""), o(Pe) ? re.prop : m(re.prop), pt.startsWith("//") ? " " : "", pt, re.extend ? "" : " ", ye(He) && re.extend && re.selector ? ["extend(", Ze("selector"), ")"] : "", xt, re.raws.important ? re.raws.important.replace(/\s*!\s*important/i, " !important") : re.important ? " !important" : "", re.raws.scssDefault ? re.raws.scssDefault.replace(/\s*!default/i, " !default") : re.scssDefault ? " !default" : "", re.raws.scssGlobal ? re.raws.scssGlobal.replace(/\s*!global/i, " !global") : re.scssGlobal ? " !global" : "", re.nodes ? [" {", g([h, nt(Pe, He, Ze)]), h, "}"] : G(re) && !ct.raws.semicolon && He.originalText[Se(re) - 1] !== ";" ? "" : He.__isHTMLStyleAttribute && S(Pe, re) ? k(";") : ";"];
            }
            case "css-atrule": {
              let ct = Pe.getParentNode(), rt = X(re) && !ct.raws.semicolon && He.originalText[Se(re) - 1] !== ";";
              if (ye(He)) {
                if (re.mixin)
                  return [Ze("selector"), re.important ? " !important" : "", rt ? "" : ";"];
                if (re.function)
                  return [re.name, Ze("params"), rt ? "" : ";"];
                if (re.variable)
                  return ["@", re.name, ": ", re.value ? Ze("value") : "", re.raws.between.trim() ? re.raws.between.trim() + " " : "", re.nodes ? ["{", g([re.nodes.length > 0 ? h : "", nt(Pe, He, Ze)]), h, "}"] : "", rt ? "" : ";"];
              }
              return ["@", q(re) || re.name.endsWith(":") ? re.name : m(re.name), re.params ? [q(re) ? "" : X(re) ? re.raws.afterName === "" ? "" : re.name.endsWith(":") ? " " : /^\s*\n\s*\n/.test(re.raws.afterName) ? [f, f] : /^\s*\n/.test(re.raws.afterName) ? f : " " : " ", Ze("params")] : "", re.selector ? g([" ", Ze("selector")]) : "", re.value ? p([" ", Ze("value"), L(re) ? W(re) ? " " : C : ""]) : re.name === "else" ? " " : "", re.nodes ? [L(re) ? "" : re.selector && !re.selector.nodes && typeof re.selector.value == "string" && Q(re.selector.value) || !re.selector && typeof re.params == "string" && Q(re.params) ? C : " ", "{", g([re.nodes.length > 0 ? h : "", nt(Pe, He, Ze)]), h, "}"] : rt ? "" : ";"];
            }
            case "media-query-list": {
              let ct = [];
              return Pe.each((rt) => {
                let pt = rt.getValue();
                pt.type === "media-query" && pt.value === "" || ct.push(Ze());
              }, "nodes"), p(g(c(C, ct)));
            }
            case "media-query":
              return [c(" ", Pe.map(Ze, "nodes")), S(Pe, re) ? "" : ","];
            case "media-type":
              return Ge(Dt(re.value, He));
            case "media-feature-expression":
              return re.nodes ? ["(", ...Pe.map(Ze, "nodes"), ")"] : re.value;
            case "media-feature":
              return m(Dt(re.value.replace(/ +/g, " "), He));
            case "media-colon":
              return [re.value, " "];
            case "media-value":
              return Ge(Dt(re.value, He));
            case "media-keyword":
              return Dt(re.value, He);
            case "media-url":
              return Dt(re.value.replace(/^url\(\s+/gi, "url(").replace(/\s+\)$/g, ")"), He);
            case "media-unknown":
              return re.value;
            case "selector-root":
              return p([F(Pe, "custom-selector") ? [E(Pe, "css-atrule").customSelector, C] : "", c([",", F(Pe, ["extend", "custom-selector", "nest"]) ? C : f], Pe.map(Ze, "nodes"))]);
            case "selector-selector":
              return p(g(Pe.map(Ze, "nodes")));
            case "selector-comment":
              return re.value;
            case "selector-string":
              return Dt(re.value, He);
            case "selector-tag": {
              let ct = Pe.getParentNode(), rt = ct && ct.nodes.indexOf(re), pt = rt && ct.nodes[rt - 1];
              return [re.namespace ? [re.namespace === !0 ? "" : re.namespace.trim(), "|"] : "", pt.type === "selector-nesting" ? re.value : Ge(T(Pe, re.value) ? re.value.toLowerCase() : re.value)];
            }
            case "selector-id":
              return ["#", re.value];
            case "selector-class":
              return [".", Ge(Dt(re.value, He))];
            case "selector-attribute":
              return ["[", re.namespace ? [re.namespace === !0 ? "" : re.namespace.trim(), "|"] : "", re.attribute.trim(), re.operator ? re.operator : "", re.value ? Je(Dt(re.value.trim(), He), He) : "", re.insensitive ? " i" : "", "]"];
            case "selector-combinator": {
              if (re.value === "+" || re.value === ">" || re.value === "~" || re.value === ">>>") {
                let pt = Pe.getParentNode();
                return [pt.type === "selector-selector" && pt.nodes[0] === re ? "" : C, re.value, S(Pe, re) ? "" : " "];
              }
              let ct = re.value.trim().startsWith("(") ? C : "", rt = Ge(Dt(re.value.trim(), He)) || C;
              return [ct, rt];
            }
            case "selector-universal":
              return [re.namespace ? [re.namespace === !0 ? "" : re.namespace.trim(), "|"] : "", re.value];
            case "selector-pseudo":
              return [m(re.value), s(re.nodes) ? ["(", c(", ", Pe.map(Ze, "nodes")), ")"] : ""];
            case "selector-nesting":
              return re.value;
            case "selector-unknown": {
              let ct = E(Pe, "css-rule");
              if (ct && ct.isSCSSNesterProperty)
                return Ge(Dt(m(re.value), He));
              let rt = Pe.getParentNode();
              if (rt.raws && rt.raws.selector) {
                let Nt = We(rt), xt = Nt + rt.raws.selector.length;
                return He.originalText.slice(Nt, xt).trim();
              }
              let pt = Pe.getParentNode(1);
              if (rt.type === "value-paren_group" && pt && pt.type === "value-func" && pt.value === "selector") {
                let Nt = Se(rt.open) + 1, xt = We(rt.close), _t = He.originalText.slice(Nt, xt).trim();
                return Q(_t) ? [v, _t] : _t;
              }
              return re.value;
            }
            case "value-value":
            case "value-root":
              return Ze("group");
            case "value-comment":
              return He.originalText.slice(We(re), Se(re));
            case "value-comma_group": {
              let ct = Pe.getParentNode(), rt = Pe.getParentNode(1), pt = D(Pe), Nt = pt && ct.type === "value-value" && (pt === "grid" || pt.startsWith("grid-template")), xt = E(Pe, "css-atrule"), _t = xt && L(xt), M = re.groups.some((Tt) => Te(Tt)), me = Pe.map(Ze, "groups"), Oe = [], at = A(Pe, "url"), lt = !1, At = !1;
              for (let Tt = 0; Tt < re.groups.length; ++Tt) {
                Oe.push(me[Tt]);
                let bt = re.groups[Tt - 1], ut = re.groups[Tt], st = re.groups[Tt + 1], Pn = re.groups[Tt + 2];
                if (at) {
                  (st && Y(st) || Y(ut)) && Oe.push(" ");
                  continue;
                }
                if (F(Pe, "forward") && ut.type === "value-word" && ut.value && bt !== void 0 && bt.type === "value-word" && bt.value === "as" && st.type === "value-operator" && st.value === "*" || !st || ut.type === "value-word" && ut.value.endsWith("-") && ve(st))
                  continue;
                let rl = ut.type === "value-string" && ut.value.startsWith("#{"), ul = lt && st.type === "value-string" && st.value.endsWith("}");
                if (rl || ul) {
                  lt = !lt;
                  continue;
                }
                if (lt || he(ut) || he(st) || ut.type === "value-atword" && ut.value === "" || ut.value === "~" || ut.value && ut.value.includes("\\") && st && st.type !== "value-comment" || bt && bt.value && bt.value.indexOf("\\") === bt.value.length - 1 && ut.type === "value-operator" && ut.value === "/" || ut.value === "\\" || le(ut, st) || $e(ut) || qe(ut) || ce(st) || qe(st) && se(st) || ce(ut) && se(st) || ut.value === "--" && $e(st))
                  continue;
                let Uu = $(ut), Hu = $(st);
                if ((Uu && $e(st) || Hu && ce(ut)) && se(st) || !bt && _(ut) || A(Pe, "calc") && (Y(ut) || Y(st) || H(ut) || H(st)) && se(st))
                  continue;
                let il = (Y(ut) || H(ut)) && Tt === 0 && (st.type === "value-number" || st.isHex) && rt && xe(rt) && !se(st), qu = Pn && Pn.type === "value-func" || Pn && De(Pn) || ut.type === "value-func" || De(ut), Wu = st.type === "value-func" || De(st) || bt && bt.type === "value-func" || bt && De(bt);
                if (!(!(V(st) || V(ut)) && !A(Pe, "calc") && !il && (_(st) && !qu || _(ut) && !Wu || Y(st) && !qu || Y(ut) && !Wu || H(st) || H(ut)) && (se(st) || Uu && (!bt || bt && $(bt))))) {
                  if (Te(ut)) {
                    if (ct.type === "value-paren_group") {
                      Oe.push(w(f));
                      continue;
                    }
                    Oe.push(f);
                    continue;
                  }
                  if (_t && (U(st) || O(st) || pe(st) || K(ut) || ne(ut))) {
                    Oe.push(" ");
                    continue;
                  }
                  if (xt && xt.name.toLowerCase() === "namespace") {
                    Oe.push(" ");
                    continue;
                  }
                  if (Nt) {
                    ut.source && st.source && ut.source.start.line !== st.source.start.line ? (Oe.push(f), At = !0) : Oe.push(" ");
                    continue;
                  }
                  if (Hu) {
                    Oe.push(" ");
                    continue;
                  }
                  if (!(st && st.value === "...") && !(ve(ut) && ve(st) && Se(ut) === We(st))) {
                    if (ve(ut) && be(st) && Se(ut) === We(st.open)) {
                      Oe.push(h);
                      continue;
                    }
                    if (ut.value === "with" && be(st)) {
                      Oe.push(" ");
                      continue;
                    }
                    Oe.push(C);
                  }
                }
              }
              return M && Oe.push(v), At && Oe.unshift(f), _t ? p(g(Oe)) : y(Pe) ? p(d(Oe)) : p(g(d(Oe)));
            }
            case "value-paren_group": {
              let ct = Pe.getParentNode();
              if (ct && ee(ct) && (re.groups.length === 1 || re.groups.length > 0 && re.groups[0].type === "value-comma_group" && re.groups[0].groups.length > 0 && re.groups[0].groups[0].type === "value-word" && re.groups[0].groups[0].value.startsWith("data:")))
                return [re.open ? Ze("open") : "", c(",", Pe.map(Ze, "groups")), re.close ? Ze("close") : ""];
              if (!re.open) {
                let at = Pe.map(Ze, "groups"), lt = [];
                for (let At = 0; At < at.length; At++)
                  At !== 0 && lt.push([",", C]), lt.push(at[At]);
                return p(g(d(lt)));
              }
              let rt = Ee(Pe), pt = n(re.groups), Nt = pt && pt.type === "value-comment", xt = ae(re, ct), _t = Ae(re, ct), M = _t || rt && !xt, me = _t || xt, Oe = p([re.open ? Ze("open") : "", g([h, c([C], Pe.map((at, lt) => {
                let At = at.getValue(), Tt = lt === re.groups.length - 1, bt = [Ze(), Tt ? "" : ","];
                if (fe(At) && At.type === "value-comma_group" && At.groups && At.groups[0].type !== "value-paren_group" && At.groups[2] && At.groups[2].type === "value-paren_group") {
                  let ut = B(bt[0].contents.contents);
                  return ut[1] = p(ut[1]), p(w(bt));
                }
                if (!Tt && At.type === "value-comma_group" && s(At.groups)) {
                  let ut = n(At.groups);
                  ut.source && u(He.originalText, ut, Se) && bt.push(f);
                }
                return bt;
              }, "groups"))]), k(!Nt && N(He.parser, He.originalText) && rt && ie(He) ? "," : ""), h, re.close ? Ze("close") : ""], { shouldBreak: M });
              return me ? w(Oe) : Oe;
            }
            case "value-func":
              return [re.value, F(Pe, "supports") && ue(re) ? " " : "", Ze("group")];
            case "value-paren":
              return re.value;
            case "value-number":
              return [it(re.value), z(re.unit)];
            case "value-operator":
              return re.value;
            case "value-word":
              return re.isColor && re.isHex || b(re.value) ? re.value.toLowerCase() : re.value;
            case "value-colon": {
              let ct = Pe.getParentNode(), rt = ct && ct.groups.indexOf(re), pt = rt && ct.groups[rt - 1];
              return [re.value, pt && typeof pt.value == "string" && n(pt.value) === "\\" || A(Pe, "url") ? "" : C];
            }
            case "value-comma":
              return [re.value, " "];
            case "value-string":
              return i(re.raws.quote + re.value + re.raws.quote, He);
            case "value-atword":
              return ["@", re.value];
            case "value-unicode-range":
              return re.value;
            case "value-unknown":
              return re.value;
            default:
              throw new Error("Unknown postcss type ".concat(JSON.stringify(re.type)));
          }
        }
        function nt(Pe, He, Ze) {
          let re = [];
          return Pe.each((ct, rt, pt) => {
            let Nt = pt[rt - 1];
            if (Nt && Nt.type === "css-comment" && Nt.text.trim() === "prettier-ignore") {
              let xt = ct.getValue();
              re.push(He.originalText.slice(We(xt), Se(xt)));
            } else
              re.push(Ze());
            rt !== pt.length - 1 && (pt[rt + 1].type === "css-comment" && !e(He.originalText, We(pt[rt + 1]), { backwards: !0 }) && !t(pt[rt]) || pt[rt + 1].type === "css-atrule" && pt[rt + 1].name === "else" && pt[rt].type !== "css-comment" ? re.push(" ") : (re.push(He.__isHTMLStyleAttribute ? C : f), u(He.originalText, ct.getValue(), Se) && !t(pt[rt]) && re.push(f)));
          }, "nodes"), re;
        }
        var _e = /(["'])(?:(?!\1)[^\\]|\\.)*\1/gs, Ue = /(?:\d*\.\d+|\d+\.?)(?:[Ee][+-]?\d+)?/g, we = /[A-Za-z]+/g, yt = /[$@]?[A-Z_a-z\u0080-\uFFFF][\w\u0080-\uFFFF-]*/g, Ie = new RegExp(_e.source + "|(".concat(yt.source, ")?(").concat(Ue.source, ")(").concat(we.source, ")?"), "g");
        function Dt(Pe, He) {
          return Pe.replace(_e, (Ze) => i(Ze, He));
        }
        function Je(Pe, He) {
          let Ze = He.singleQuote ? "'" : '"';
          return Pe.includes('"') || Pe.includes("'") ? Pe : Ze + Pe + Ze;
        }
        function Ge(Pe) {
          return Pe.replace(Ie, (He, Ze, re, ct, rt) => !re && ct ? it(ct) + m(rt || "") : He);
        }
        function it(Pe) {
          return a(Pe).replace(/\.0(?=$|e)/, "");
        }
        l.exports = { print: Be, embed: j, insertPragma: P, massageAstNode: I };
      } }), Js = Z({ "src/language-css/options.js"(r, l) {
        te();
        var n = Kt();
        l.exports = { singleQuote: n.singleQuote };
      } }), Us = Z({ "src/language-css/parsers.js"() {
        te();
      } }), Hs = Z({ "node_modules/linguist-languages/data/CSS.json"(r, l) {
        l.exports = { name: "CSS", type: "markup", tmScope: "source.css", aceMode: "css", codemirrorMode: "css", codemirrorMimeType: "text/css", color: "#563d7c", extensions: [".css"], languageId: 50 };
      } }), qs = Z({ "node_modules/linguist-languages/data/PostCSS.json"(r, l) {
        l.exports = { name: "PostCSS", type: "markup", color: "#dc3a0c", tmScope: "source.postcss", group: "CSS", extensions: [".pcss", ".postcss"], aceMode: "text", languageId: 262764437 };
      } }), Ws = Z({ "node_modules/linguist-languages/data/Less.json"(r, l) {
        l.exports = { name: "Less", type: "markup", color: "#1d365d", aliases: ["less-css"], extensions: [".less"], tmScope: "source.css.less", aceMode: "less", codemirrorMode: "css", codemirrorMimeType: "text/css", languageId: 198 };
      } }), Xs = Z({ "node_modules/linguist-languages/data/SCSS.json"(r, l) {
        l.exports = { name: "SCSS", type: "markup", color: "#c6538c", tmScope: "source.css.scss", aceMode: "scss", codemirrorMode: "css", codemirrorMimeType: "text/x-scss", extensions: [".scss"], languageId: 329 };
      } }), Gs = Z({ "src/language-css/index.js"(r, l) {
        te();
        var n = qt(), a = $s(), i = Js(), e = Us(), t = [n(Hs(), (s) => ({ since: "1.4.0", parsers: ["css"], vscodeLanguageIds: ["css"], extensions: [...s.extensions, ".wxss"] })), n(qs(), () => ({ since: "1.4.0", parsers: ["css"], vscodeLanguageIds: ["postcss"] })), n(Ws(), () => ({ since: "1.4.0", parsers: ["less"], vscodeLanguageIds: ["less"] })), n(Xs(), () => ({ since: "1.4.0", parsers: ["scss"], vscodeLanguageIds: ["scss"] }))], u = { postcss: a };
        l.exports = { languages: t, options: i, printers: u, parsers: e };
      } }), zs = Z({ "src/language-handlebars/loc.js"(r, l) {
        te();
        function n(i) {
          return i.loc.start.offset;
        }
        function a(i) {
          return i.loc.end.offset;
        }
        l.exports = { locStart: n, locEnd: a };
      } }), Qs = Z({ "src/language-handlebars/clean.js"(r, l) {
        te();
        function n(a, i) {
          if (a.type === "TextNode") {
            let e = a.chars.trim();
            if (!e)
              return null;
            i.chars = e.replace(/[\t\n\f\r ]+/g, " ");
          }
          a.type === "AttrNode" && a.name.toLowerCase() === "class" && delete i.value;
        }
        n.ignoredProperties = /* @__PURE__ */ new Set(["loc", "selfClosing"]), l.exports = n;
      } }), Ys = Z({ "vendors/html-void-elements.json"(r, l) {
        l.exports = { htmlVoidElements: ["area", "base", "basefont", "bgsound", "br", "col", "command", "embed", "frame", "hr", "image", "img", "input", "isindex", "keygen", "link", "menuitem", "meta", "nextid", "param", "source", "track", "wbr"] };
      } }), Zs = Z({ "src/language-handlebars/utils.js"(r, l) {
        te();
        var { htmlVoidElements: n } = Ys(), a = It();
        function i(x) {
          let B = x.getValue(), I = x.getParentNode(0);
          return !!(f(x, ["ElementNode"]) && a(I.children) === B || f(x, ["Block"]) && a(I.body) === B);
        }
        function e(x) {
          return x.toUpperCase() === x;
        }
        function t(x) {
          return C(x, ["ElementNode"]) && typeof x.tag == "string" && !x.tag.startsWith(":") && (e(x.tag[0]) || x.tag.includes("."));
        }
        var u = new Set(n);
        function s(x) {
          return u.has(x.tag) || t(x) && x.children.every((B) => c(B));
        }
        function c(x) {
          return C(x, ["TextNode"]) && !/\S/.test(x.chars);
        }
        function C(x, B) {
          return x && B.includes(x.type);
        }
        function f(x, B) {
          let I = x.getParentNode(0);
          return C(I, B);
        }
        function h(x, B) {
          let I = g(x);
          return C(I, B);
        }
        function p(x, B) {
          let I = w(x);
          return C(I, B);
        }
        function d(x, B) {
          var I, j, P, E;
          let D = x.getValue(), m = (I = x.getParentNode(0)) !== null && I !== void 0 ? I : {}, A = (j = (P = (E = m.children) !== null && E !== void 0 ? E : m.body) !== null && P !== void 0 ? P : m.parts) !== null && j !== void 0 ? j : [], o = A.indexOf(D);
          return o !== -1 && A[o + B];
        }
        function g(x) {
          let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
          return d(x, -B);
        }
        function w(x) {
          return d(x, 1);
        }
        function k(x) {
          return C(x, ["MustacheCommentStatement"]) && typeof x.value == "string" && x.value.trim() === "prettier-ignore";
        }
        function v(x) {
          let B = x.getValue(), I = g(x, 2);
          return k(B) || k(I);
        }
        l.exports = { getNextNode: w, getPreviousNode: g, hasPrettierIgnore: v, isLastNodeOfSiblings: i, isNextNodeOfSomeType: p, isNodeOfSomeType: C, isParentOfSomeType: f, isPreviousNodeOfSomeType: h, isVoid: s, isWhitespaceNode: c };
      } }), Ks = Z({ "src/language-handlebars/printer-glimmer.js"(r, l) {
        te();
        var { builders: { dedent: n, fill: a, group: i, hardline: e, ifBreak: t, indent: u, join: s, line: c, softline: C }, utils: { getDocParts: f, replaceTextEndOfLine: h } } = Ye(), { getPreferredQuote: p, isNonEmptyArray: d } = ot(), { locStart: g, locEnd: w } = zs(), k = Qs(), { getNextNode: v, getPreviousNode: x, hasPrettierIgnore: B, isLastNodeOfSiblings: I, isNextNodeOfSomeType: j, isNodeOfSomeType: P, isParentOfSomeType: E, isPreviousNodeOfSomeType: D, isVoid: m, isWhitespaceNode: A } = Zs(), o = 2;
        function F(Q, ve, Ae) {
          let be = Q.getValue();
          if (!be)
            return "";
          if (B(Q))
            return ve.originalText.slice(g(be), w(be));
          let We = ve.singleQuote ? "'" : '"';
          switch (be.type) {
            case "Block":
            case "Program":
            case "Template":
              return i(Q.map(Ae, "body"));
            case "ElementNode": {
              let Se = i(T(Q, Ae)), ye = ve.htmlWhitespaceSensitivity === "ignore" && j(Q, ["ElementNode"]) ? C : "";
              if (m(be))
                return [Se, ye];
              let N = ["</", be.tag, ">"];
              return be.children.length === 0 ? [Se, u(N), ye] : ve.htmlWhitespaceSensitivity === "ignore" ? [Se, u(b(Q, ve, Ae)), e, u(N), ye] : [Se, u(i(b(Q, ve, Ae))), u(N), ye];
            }
            case "BlockStatement": {
              let Se = Q.getParentNode(1);
              return Se && Se.inverse && Se.inverse.body.length === 1 && Se.inverse.body[0] === be && Se.inverse.body[0].path.parts[0] === "if" ? [ne(Q, Ae), se(Q, Ae, ve), fe(Q, Ae, ve)] : [$(Q, Ae), i([se(Q, Ae, ve), fe(Q, Ae, ve), ee(Q, Ae, ve)])];
            }
            case "ElementModifierStatement":
              return i(["{{", De(Q, Ae), "}}"]);
            case "MustacheStatement":
              return i([L(be), De(Q, Ae), R(be)]);
            case "SubExpression":
              return i(["(", ce(Q, Ae), C, ")"]);
            case "AttrNode": {
              let Se = be.value.type === "TextNode";
              if (Se && be.value.chars === "" && g(be.value) === w(be.value))
                return be.name;
              let ye = Se ? p(be.value.chars, We).quote : be.value.type === "ConcatStatement" ? p(be.value.parts.filter((z) => z.type === "TextNode").map((z) => z.chars).join(""), We).quote : "", N = Ae("value");
              return [be.name, "=", ye, be.name === "class" && ye ? i(u(N)) : N, ye];
            }
            case "ConcatStatement":
              return Q.map(Ae, "parts");
            case "Hash":
              return s(c, Q.map(Ae, "pairs"));
            case "HashPair":
              return [be.key, "=", Ae("value")];
            case "TextNode": {
              let Se = be.chars.replace(/{{/g, "\\{{"), ye = X(Q);
              if (ye) {
                if (ye === "class") {
                  let yt = Se.trim().split(/\s+/).join(" "), Ie = !1, Dt = !1;
                  return E(Q, ["ConcatStatement"]) && (D(Q, ["MustacheStatement"]) && /^\s/.test(Se) && (Ie = !0), j(Q, ["MustacheStatement"]) && /\s$/.test(Se) && yt !== "" && (Dt = !0)), [Ie ? c : "", yt, Dt ? c : ""];
                }
                return h(Se);
              }
              let N = /^[\t\n\f\r ]*$/.test(Se), z = !x(Q), ie = !v(Q);
              if (ve.htmlWhitespaceSensitivity !== "ignore") {
                let yt = /^[\t\n\f\r ]*/, Ie = /[\t\n\f\r ]*$/, Dt = ie && E(Q, ["Template"]), Je = z && E(Q, ["Template"]);
                if (N) {
                  if (Je || Dt)
                    return "";
                  let Ze = [c], re = G(Se);
                  return re && (Ze = Te(re)), I(Q) && (Ze = Ze.map((ct) => n(ct))), Ze;
                }
                let [Ge] = Se.match(yt), [it] = Se.match(Ie), Pe = [];
                if (Ge) {
                  Pe = [c];
                  let Ze = G(Ge);
                  Ze && (Pe = Te(Ze)), Se = Se.replace(yt, "");
                }
                let He = [];
                if (it) {
                  if (!Dt) {
                    He = [c];
                    let Ze = G(it);
                    Ze && (He = Te(Ze)), I(Q) && (He = He.map((re) => n(re)));
                  }
                  Se = Se.replace(Ie, "");
                }
                return [...Pe, a(ae(Se)), ...He];
              }
              let Be = G(Se), nt = le(Se), _e = Ee(Se);
              if ((z || ie) && N && E(Q, ["Block", "ElementNode", "Template"]))
                return "";
              N && Be ? (nt = Math.min(Be, o), _e = 0) : (j(Q, ["BlockStatement", "ElementNode"]) && (_e = Math.max(_e, 1)), D(Q, ["BlockStatement", "ElementNode"]) && (nt = Math.max(nt, 1)));
              let Ue = "", we = "";
              return _e === 0 && j(Q, ["MustacheStatement"]) && (we = " "), nt === 0 && D(Q, ["MustacheStatement"]) && (Ue = " "), z && (nt = 0, Ue = ""), ie && (_e = 0, we = ""), Se = Se.replace(/^[\t\n\f\r ]+/g, Ue).replace(/[\t\n\f\r ]+$/, we), [...Te(nt), a(ae(Se)), ...Te(_e)];
            }
            case "MustacheCommentStatement": {
              let Se = g(be), ye = w(be), N = ve.originalText.charAt(Se + 2) === "~", z = ve.originalText.charAt(ye - 3) === "~", ie = be.value.includes("}}") ? "--" : "";
              return ["{{", N ? "~" : "", "!", ie, be.value, ie, z ? "~" : "", "}}"];
            }
            case "PathExpression":
              return be.original;
            case "BooleanLiteral":
              return String(be.value);
            case "CommentStatement":
              return ["<!--", be.value, "-->"];
            case "StringLiteral": {
              if (qe(Q)) {
                let Se = ve.singleQuote ? '"' : "'";
                return $e(be.value, Se);
              }
              return $e(be.value, We);
            }
            case "NumberLiteral":
              return String(be.value);
            case "UndefinedLiteral":
              return "undefined";
            case "NullLiteral":
              return "null";
            default:
              throw new Error("unknown glimmer type: " + JSON.stringify(be.type));
          }
        }
        function y(Q, ve) {
          return g(Q) - g(ve);
        }
        function T(Q, ve) {
          let Ae = Q.getValue(), be = ["attributes", "modifiers", "comments"].filter((Se) => d(Ae[Se])), We = be.flatMap((Se) => Ae[Se]).sort(y);
          for (let Se of be)
            Q.each((ye) => {
              let N = We.indexOf(ye.getValue());
              We.splice(N, 1, [c, ve()]);
            }, Se);
          return d(Ae.blockParams) && We.push(c, xe(Ae)), ["<", Ae.tag, u(We), S(Ae)];
        }
        function b(Q, ve, Ae) {
          let be = Q.getValue().children.every((We) => A(We));
          return ve.htmlWhitespaceSensitivity === "ignore" && be ? "" : Q.map((We, Se) => {
            let ye = Ae();
            return Se === 0 && ve.htmlWhitespaceSensitivity === "ignore" ? [C, ye] : ye;
          }, "children");
        }
        function S(Q) {
          return m(Q) ? t([C, "/>"], [" />", C]) : t([C, ">"], ">");
        }
        function L(Q) {
          let ve = Q.escaped === !1 ? "{{{" : "{{", Ae = Q.strip && Q.strip.open ? "~" : "";
          return [ve, Ae];
        }
        function R(Q) {
          let ve = Q.escaped === !1 ? "}}}" : "}}";
          return [Q.strip && Q.strip.close ? "~" : "", ve];
        }
        function O(Q) {
          let ve = L(Q), Ae = Q.openStrip.open ? "~" : "";
          return [ve, Ae, "#"];
        }
        function U(Q) {
          let ve = R(Q);
          return [Q.openStrip.close ? "~" : "", ve];
        }
        function V(Q) {
          let ve = L(Q), Ae = Q.closeStrip.open ? "~" : "";
          return [ve, Ae, "/"];
        }
        function _(Q) {
          let ve = R(Q);
          return [Q.closeStrip.close ? "~" : "", ve];
        }
        function Y(Q) {
          let ve = L(Q), Ae = Q.inverseStrip.open ? "~" : "";
          return [ve, Ae];
        }
        function H(Q) {
          let ve = R(Q);
          return [Q.inverseStrip.close ? "~" : "", ve];
        }
        function $(Q, ve) {
          let Ae = Q.getValue(), be = O(Ae), We = U(Ae), Se = [he(Q, ve)], ye = ue(Q, ve);
          if (ye && Se.push(c, ye), d(Ae.program.blockParams)) {
            let N = xe(Ae.program);
            Se.push(c, N);
          }
          return i([be, u(Se), C, We]);
        }
        function K(Q, ve) {
          return [ve.htmlWhitespaceSensitivity === "ignore" ? e : "", Y(Q), "else", H(Q)];
        }
        function ne(Q, ve) {
          let Ae = Q.getParentNode(1);
          return [Y(Ae), "else if ", ue(Q, ve), H(Ae)];
        }
        function ee(Q, ve, Ae) {
          let be = Q.getValue();
          return Ae.htmlWhitespaceSensitivity === "ignore" ? [pe(be) ? C : e, V(be), ve("path"), _(be)] : [V(be), ve("path"), _(be)];
        }
        function pe(Q) {
          return P(Q, ["BlockStatement"]) && Q.program.body.every((ve) => A(ve));
        }
        function J(Q) {
          return W(Q) && Q.inverse.body.length === 1 && P(Q.inverse.body[0], ["BlockStatement"]) && Q.inverse.body[0].path.parts[0] === "if";
        }
        function W(Q) {
          return P(Q, ["BlockStatement"]) && Q.inverse;
        }
        function se(Q, ve, Ae) {
          let be = Q.getValue();
          if (pe(be))
            return "";
          let We = ve("program");
          return Ae.htmlWhitespaceSensitivity === "ignore" ? u([e, We]) : u(We);
        }
        function fe(Q, ve, Ae) {
          let be = Q.getValue(), We = ve("inverse"), Se = Ae.htmlWhitespaceSensitivity === "ignore" ? [e, We] : We;
          return J(be) ? Se : W(be) ? [K(be, Ae), u(Se)] : "";
        }
        function ae(Q) {
          return f(s(c, q(Q)));
        }
        function q(Q) {
          return Q.split(/[\t\n\f\r ]+/);
        }
        function X(Q) {
          for (let ve = 0; ve < 2; ve++) {
            let Ae = Q.getParentNode(ve);
            if (Ae && Ae.type === "AttrNode")
              return Ae.name.toLowerCase();
          }
        }
        function G(Q) {
          return Q = typeof Q == "string" ? Q : "", Q.split(`
`).length - 1;
        }
        function le(Q) {
          Q = typeof Q == "string" ? Q : "";
          let ve = (Q.match(/^([^\S\n\r]*[\n\r])+/g) || [])[0] || "";
          return G(ve);
        }
        function Ee(Q) {
          Q = typeof Q == "string" ? Q : "";
          let ve = (Q.match(/([\n\r][^\S\n\r]*)+$/g) || [])[0] || "";
          return G(ve);
        }
        function Te() {
          let Q = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          return Array.from({ length: Math.min(Q, o) }).fill(e);
        }
        function $e(Q, ve) {
          let { quote: Ae, regex: be } = p(Q, ve);
          return [Ae, Q.replace(be, "\\".concat(Ae)), Ae];
        }
        function qe(Q) {
          let ve = 0, Ae = Q.getParentNode(ve);
          for (; Ae && P(Ae, ["SubExpression"]); )
            ve++, Ae = Q.getParentNode(ve);
          return !!(Ae && P(Q.getParentNode(ve + 1), ["ConcatStatement"]) && P(Q.getParentNode(ve + 2), ["AttrNode"]));
        }
        function ce(Q, ve) {
          let Ae = he(Q, ve), be = ue(Q, ve);
          return be ? u([Ae, c, i(be)]) : Ae;
        }
        function De(Q, ve) {
          let Ae = he(Q, ve), be = ue(Q, ve);
          return be ? [u([Ae, c, be]), C] : Ae;
        }
        function he(Q, ve) {
          return ve("path");
        }
        function ue(Q, ve) {
          let Ae = Q.getValue(), be = [];
          if (Ae.params.length > 0) {
            let We = Q.map(ve, "params");
            be.push(...We);
          }
          if (Ae.hash && Ae.hash.pairs.length > 0) {
            let We = ve("hash");
            be.push(We);
          }
          return be.length === 0 ? "" : s(c, be);
        }
        function xe(Q) {
          return ["as |", Q.blockParams.join(" "), "|"];
        }
        l.exports = { print: F, massageAstNode: k };
      } }), eo = Z({ "src/language-handlebars/parsers.js"() {
        te();
      } }), to = Z({ "node_modules/linguist-languages/data/Handlebars.json"(r, l) {
        l.exports = { name: "Handlebars", type: "markup", color: "#f7931e", aliases: ["hbs", "htmlbars"], extensions: [".handlebars", ".hbs"], tmScope: "text.html.handlebars", aceMode: "handlebars", languageId: 155 };
      } }), no = Z({ "src/language-handlebars/index.js"(r, l) {
        te();
        var n = qt(), a = Ks(), i = eo(), e = [n(to(), () => ({ since: "2.3.0", parsers: ["glimmer"], vscodeLanguageIds: ["handlebars"] }))], t = { glimmer: a };
        l.exports = { languages: e, printers: t, parsers: i };
      } }), ro = Z({ "src/language-graphql/pragma.js"(r, l) {
        te();
        function n(i) {
          return /^\s*#[^\S\n]*@(?:format|prettier)\s*(?:\n|$)/.test(i);
        }
        function a(i) {
          return `# @format

` + i;
        }
        l.exports = { hasPragma: n, insertPragma: a };
      } }), uo = Z({ "src/language-graphql/loc.js"(r, l) {
        te();
        function n(i) {
          return typeof i.start == "number" ? i.start : i.loc && i.loc.start;
        }
        function a(i) {
          return typeof i.end == "number" ? i.end : i.loc && i.loc.end;
        }
        l.exports = { locStart: n, locEnd: a };
      } }), io = Z({ "src/language-graphql/printer-graphql.js"(r, l) {
        te();
        var { builders: { join: n, hardline: a, line: i, softline: e, group: t, indent: u, ifBreak: s } } = Ye(), { isNextLineEmpty: c, isNonEmptyArray: C } = ot(), { insertPragma: f } = ro(), { locStart: h, locEnd: p } = uo();
        function d(j, P, E) {
          let D = j.getValue();
          if (!D)
            return "";
          if (typeof D == "string")
            return D;
          switch (D.kind) {
            case "Document": {
              let m = [];
              return j.each((A, o, F) => {
                m.push(E()), o !== F.length - 1 && (m.push(a), c(P.originalText, A.getValue(), p) && m.push(a));
              }, "definitions"), [...m, a];
            }
            case "OperationDefinition": {
              let m = P.originalText[h(D)] !== "{", A = Boolean(D.name);
              return [m ? D.operation : "", m && A ? [" ", E("name")] : "", m && !A && C(D.variableDefinitions) ? " " : "", C(D.variableDefinitions) ? t(["(", u([e, n([s("", ", "), e], j.map(E, "variableDefinitions"))]), e, ")"]) : "", g(j, E, D), D.selectionSet ? !m && !A ? "" : " " : "", E("selectionSet")];
            }
            case "FragmentDefinition":
              return ["fragment ", E("name"), C(D.variableDefinitions) ? t(["(", u([e, n([s("", ", "), e], j.map(E, "variableDefinitions"))]), e, ")"]) : "", " on ", E("typeCondition"), g(j, E, D), " ", E("selectionSet")];
            case "SelectionSet":
              return ["{", u([a, n(a, w(j, P, E, "selections"))]), a, "}"];
            case "Field":
              return t([D.alias ? [E("alias"), ": "] : "", E("name"), D.arguments.length > 0 ? t(["(", u([e, n([s("", ", "), e], w(j, P, E, "arguments"))]), e, ")"]) : "", g(j, E, D), D.selectionSet ? " " : "", E("selectionSet")]);
            case "Name":
              return D.value;
            case "StringValue": {
              if (D.block) {
                let m = D.value.replace(/"""/g, "\\$&").split(`
`);
                return m.length === 1 && (m[0] = m[0].trim()), n(a, ['"""', ...m.length > 0 ? m : [], '"""'].filter(Boolean));
              }
              return ['"', D.value.replace(/["\\]/g, "\\$&").replace(/\n/g, "\\n"), '"'];
            }
            case "IntValue":
            case "FloatValue":
            case "EnumValue":
              return D.value;
            case "BooleanValue":
              return D.value ? "true" : "false";
            case "NullValue":
              return "null";
            case "Variable":
              return ["$", E("name")];
            case "ListValue":
              return t(["[", u([e, n([s("", ", "), e], j.map(E, "values"))]), e, "]"]);
            case "ObjectValue":
              return t(["{", P.bracketSpacing && D.fields.length > 0 ? " " : "", u([e, n([s("", ", "), e], j.map(E, "fields"))]), e, s("", P.bracketSpacing && D.fields.length > 0 ? " " : ""), "}"]);
            case "ObjectField":
            case "Argument":
              return [E("name"), ": ", E("value")];
            case "Directive":
              return ["@", E("name"), D.arguments.length > 0 ? t(["(", u([e, n([s("", ", "), e], w(j, P, E, "arguments"))]), e, ")"]) : ""];
            case "NamedType":
              return E("name");
            case "VariableDefinition":
              return [E("variable"), ": ", E("type"), D.defaultValue ? [" = ", E("defaultValue")] : "", g(j, E, D)];
            case "ObjectTypeExtension":
            case "ObjectTypeDefinition":
              return [E("description"), D.description ? a : "", D.kind === "ObjectTypeExtension" ? "extend " : "", "type ", E("name"), D.interfaces.length > 0 ? [" implements ", ...x(j, P, E)] : "", g(j, E, D), D.fields.length > 0 ? [" {", u([a, n(a, w(j, P, E, "fields"))]), a, "}"] : ""];
            case "FieldDefinition":
              return [E("description"), D.description ? a : "", E("name"), D.arguments.length > 0 ? t(["(", u([e, n([s("", ", "), e], w(j, P, E, "arguments"))]), e, ")"]) : "", ": ", E("type"), g(j, E, D)];
            case "DirectiveDefinition":
              return [E("description"), D.description ? a : "", "directive ", "@", E("name"), D.arguments.length > 0 ? t(["(", u([e, n([s("", ", "), e], w(j, P, E, "arguments"))]), e, ")"]) : "", D.repeatable ? " repeatable" : "", " on ", n(" | ", j.map(E, "locations"))];
            case "EnumTypeExtension":
            case "EnumTypeDefinition":
              return [E("description"), D.description ? a : "", D.kind === "EnumTypeExtension" ? "extend " : "", "enum ", E("name"), g(j, E, D), D.values.length > 0 ? [" {", u([a, n(a, w(j, P, E, "values"))]), a, "}"] : ""];
            case "EnumValueDefinition":
              return [E("description"), D.description ? a : "", E("name"), g(j, E, D)];
            case "InputValueDefinition":
              return [E("description"), D.description ? D.description.block ? a : i : "", E("name"), ": ", E("type"), D.defaultValue ? [" = ", E("defaultValue")] : "", g(j, E, D)];
            case "InputObjectTypeExtension":
            case "InputObjectTypeDefinition":
              return [E("description"), D.description ? a : "", D.kind === "InputObjectTypeExtension" ? "extend " : "", "input ", E("name"), g(j, E, D), D.fields.length > 0 ? [" {", u([a, n(a, w(j, P, E, "fields"))]), a, "}"] : ""];
            case "SchemaExtension":
              return ["extend schema", g(j, E, D), ...D.operationTypes.length > 0 ? [" {", u([a, n(a, w(j, P, E, "operationTypes"))]), a, "}"] : []];
            case "SchemaDefinition":
              return [E("description"), D.description ? a : "", "schema", g(j, E, D), " {", D.operationTypes.length > 0 ? u([a, n(a, w(j, P, E, "operationTypes"))]) : "", a, "}"];
            case "OperationTypeDefinition":
              return [E("operation"), ": ", E("type")];
            case "InterfaceTypeExtension":
            case "InterfaceTypeDefinition":
              return [E("description"), D.description ? a : "", D.kind === "InterfaceTypeExtension" ? "extend " : "", "interface ", E("name"), D.interfaces.length > 0 ? [" implements ", ...x(j, P, E)] : "", g(j, E, D), D.fields.length > 0 ? [" {", u([a, n(a, w(j, P, E, "fields"))]), a, "}"] : ""];
            case "FragmentSpread":
              return ["...", E("name"), g(j, E, D)];
            case "InlineFragment":
              return ["...", D.typeCondition ? [" on ", E("typeCondition")] : "", g(j, E, D), " ", E("selectionSet")];
            case "UnionTypeExtension":
            case "UnionTypeDefinition":
              return t([E("description"), D.description ? a : "", t([D.kind === "UnionTypeExtension" ? "extend " : "", "union ", E("name"), g(j, E, D), D.types.length > 0 ? [" =", s("", " "), u([s([i, "  "]), n([i, "| "], j.map(E, "types"))])] : ""])]);
            case "ScalarTypeExtension":
            case "ScalarTypeDefinition":
              return [E("description"), D.description ? a : "", D.kind === "ScalarTypeExtension" ? "extend " : "", "scalar ", E("name"), g(j, E, D)];
            case "NonNullType":
              return [E("type"), "!"];
            case "ListType":
              return ["[", E("type"), "]"];
            default:
              throw new Error("unknown graphql type: " + JSON.stringify(D.kind));
          }
        }
        function g(j, P, E) {
          if (E.directives.length === 0)
            return "";
          let D = n(i, j.map(P, "directives"));
          return E.kind === "FragmentDefinition" || E.kind === "OperationDefinition" ? t([i, D]) : [" ", t(u([e, D]))];
        }
        function w(j, P, E, D) {
          return j.map((m, A, o) => {
            let F = E();
            return A < o.length - 1 && c(P.originalText, m.getValue(), p) ? [F, a] : F;
          }, D);
        }
        function k(j) {
          return j.kind && j.kind !== "Comment";
        }
        function v(j) {
          let P = j.getValue();
          if (P.kind === "Comment")
            return "#" + P.value.trimEnd();
          throw new Error("Not a comment: " + JSON.stringify(P));
        }
        function x(j, P, E) {
          let D = j.getNode(), m = [], { interfaces: A } = D, o = j.map((F) => E(F), "interfaces");
          for (let F = 0; F < A.length; F++) {
            let y = A[F];
            m.push(o[F]);
            let T = A[F + 1];
            if (T) {
              let b = P.originalText.slice(y.loc.end, T.loc.start), S = b.includes("#"), L = b.replace(/#.*/g, "").trim();
              m.push(L === "," ? "," : " &", S ? i : " ");
            }
          }
          return m;
        }
        function B(j, P) {
          j.kind === "StringValue" && j.block && !j.value.includes(`
`) && (P.value = P.value.trim());
        }
        B.ignoredProperties = /* @__PURE__ */ new Set(["loc", "comments"]);
        function I(j) {
          var P;
          let E = j.getValue();
          return E == null || (P = E.comments) === null || P === void 0 ? void 0 : P.some((D) => D.value.trim() === "prettier-ignore");
        }
        l.exports = { print: d, massageAstNode: B, hasPrettierIgnore: I, insertPragma: f, printComment: v, canAttachComment: k };
      } }), ao = Z({ "src/language-graphql/options.js"(r, l) {
        te();
        var n = Kt();
        l.exports = { bracketSpacing: n.bracketSpacing };
      } }), so = Z({ "src/language-graphql/parsers.js"() {
        te();
      } }), oo = Z({ "node_modules/linguist-languages/data/GraphQL.json"(r, l) {
        l.exports = { name: "GraphQL", type: "data", color: "#e10098", extensions: [".graphql", ".gql", ".graphqls"], tmScope: "source.graphql", aceMode: "text", languageId: 139 };
      } }), lo = Z({ "src/language-graphql/index.js"(r, l) {
        te();
        var n = qt(), a = io(), i = ao(), e = so(), t = [n(oo(), () => ({ since: "1.5.0", parsers: ["graphql"], vscodeLanguageIds: ["graphql"] }))], u = { graphql: a };
        l.exports = { languages: t, options: i, printers: u, parsers: e };
      } }), _u = Z({ "src/language-markdown/loc.js"(r, l) {
        te();
        function n(i) {
          return i.position.start.offset;
        }
        function a(i) {
          return i.position.end.offset;
        }
        l.exports = { locStart: n, locEnd: a };
      } }), co = Z({ "src/language-markdown/constants.evaluate.js"(r, l) {
        l.exports = { cjkPattern: "(?:[\\u02ea-\\u02eb\\u1100-\\u11ff\\u2e80-\\u2e99\\u2e9b-\\u2ef3\\u2f00-\\u2fd5\\u2ff0-\\u303f\\u3041-\\u3096\\u3099-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312f\\u3131-\\u318e\\u3190-\\u3191\\u3196-\\u31ba\\u31c0-\\u31e3\\u31f0-\\u321e\\u322a-\\u3247\\u3260-\\u327e\\u328a-\\u32b0\\u32c0-\\u32cb\\u32d0-\\u3370\\u337b-\\u337f\\u33e0-\\u33fe\\u3400-\\u4db5\\u4e00-\\u9fef\\ua960-\\ua97c\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufe10-\\ufe1f\\ufe30-\\ufe6f\\uff00-\\uffef]|[\\ud840-\\ud868\\ud86a-\\ud86c\\ud86f-\\ud872\\ud874-\\ud879][\\udc00-\\udfff]|\\ud82c[\\udc00-\\udd1e\\udd50-\\udd52\\udd64-\\udd67]|\\ud83c[\\ude00\\ude50-\\ude51]|\\ud869[\\udc00-\\uded6\\udf00-\\udfff]|\\ud86d[\\udc00-\\udf34\\udf40-\\udfff]|\\ud86e[\\udc00-\\udc1d\\udc20-\\udfff]|\\ud873[\\udc00-\\udea1\\udeb0-\\udfff]|\\ud87a[\\udc00-\\udfe0]|\\ud87e[\\udc00-\\ude1d])(?:[\\ufe00-\\ufe0f]|\\udb40[\\udd00-\\uddef])?", kPattern: "[\\u1100-\\u11ff\\u3001-\\u3003\\u3008-\\u3011\\u3013-\\u301f\\u302e-\\u3030\\u3037\\u30fb\\u3131-\\u318e\\u3200-\\u321e\\u3260-\\u327e\\ua960-\\ua97c\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\ufe45-\\ufe46\\uff61-\\uff65\\uffa0-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc]", punctuationPattern: "[\\u0021-\\u002f\\u003a-\\u0040\\u005b-\\u0060\\u007b-\\u007e\\u00a1\\u00a7\\u00ab\\u00b6-\\u00b7\\u00bb\\u00bf\\u037e\\u0387\\u055a-\\u055f\\u0589-\\u058a\\u05be\\u05c0\\u05c3\\u05c6\\u05f3-\\u05f4\\u0609-\\u060a\\u060c-\\u060d\\u061b\\u061e-\\u061f\\u066a-\\u066d\\u06d4\\u0700-\\u070d\\u07f7-\\u07f9\\u0830-\\u083e\\u085e\\u0964-\\u0965\\u0970\\u09fd\\u0a76\\u0af0\\u0c77\\u0c84\\u0df4\\u0e4f\\u0e5a-\\u0e5b\\u0f04-\\u0f12\\u0f14\\u0f3a-\\u0f3d\\u0f85\\u0fd0-\\u0fd4\\u0fd9-\\u0fda\\u104a-\\u104f\\u10fb\\u1360-\\u1368\\u1400\\u166e\\u169b-\\u169c\\u16eb-\\u16ed\\u1735-\\u1736\\u17d4-\\u17d6\\u17d8-\\u17da\\u1800-\\u180a\\u1944-\\u1945\\u1a1e-\\u1a1f\\u1aa0-\\u1aa6\\u1aa8-\\u1aad\\u1b5a-\\u1b60\\u1bfc-\\u1bff\\u1c3b-\\u1c3f\\u1c7e-\\u1c7f\\u1cc0-\\u1cc7\\u1cd3\\u2010-\\u2027\\u2030-\\u2043\\u2045-\\u2051\\u2053-\\u205e\\u207d-\\u207e\\u208d-\\u208e\\u2308-\\u230b\\u2329-\\u232a\\u2768-\\u2775\\u27c5-\\u27c6\\u27e6-\\u27ef\\u2983-\\u2998\\u29d8-\\u29db\\u29fc-\\u29fd\\u2cf9-\\u2cfc\\u2cfe-\\u2cff\\u2d70\\u2e00-\\u2e2e\\u2e30-\\u2e4f\\u3001-\\u3003\\u3008-\\u3011\\u3014-\\u301f\\u3030\\u303d\\u30a0\\u30fb\\ua4fe-\\ua4ff\\ua60d-\\ua60f\\ua673\\ua67e\\ua6f2-\\ua6f7\\ua874-\\ua877\\ua8ce-\\ua8cf\\ua8f8-\\ua8fa\\ua8fc\\ua92e-\\ua92f\\ua95f\\ua9c1-\\ua9cd\\ua9de-\\ua9df\\uaa5c-\\uaa5f\\uaade-\\uaadf\\uaaf0-\\uaaf1\\uabeb\\ufd3e-\\ufd3f\\ufe10-\\ufe19\\ufe30-\\ufe52\\ufe54-\\ufe61\\ufe63\\ufe68\\ufe6a-\\ufe6b\\uff01-\\uff03\\uff05-\\uff0a\\uff0c-\\uff0f\\uff1a-\\uff1b\\uff1f-\\uff20\\uff3b-\\uff3d\\uff3f\\uff5b\\uff5d\\uff5f-\\uff65]|\\ud800[\\udd00-\\udd02\\udf9f\\udfd0]|\\ud801[\\udd6f]|\\ud802[\\udc57\\udd1f\\udd3f\\ude50-\\ude58\\ude7f\\udef0-\\udef6\\udf39-\\udf3f\\udf99-\\udf9c]|\\ud803[\\udf55-\\udf59]|\\ud804[\\udc47-\\udc4d\\udcbb-\\udcbc\\udcbe-\\udcc1\\udd40-\\udd43\\udd74-\\udd75\\uddc5-\\uddc8\\uddcd\\udddb\\udddd-\\udddf\\ude38-\\ude3d\\udea9]|\\ud805[\\udc4b-\\udc4f\\udc5b\\udc5d\\udcc6\\uddc1-\\uddd7\\ude41-\\ude43\\ude60-\\ude6c\\udf3c-\\udf3e]|\\ud806[\\udc3b\\udde2\\ude3f-\\ude46\\ude9a-\\ude9c\\ude9e-\\udea2]|\\ud807[\\udc41-\\udc45\\udc70-\\udc71\\udef7-\\udef8\\udfff]|\\ud809[\\udc70-\\udc74]|\\ud81a[\\ude6e-\\ude6f\\udef5\\udf37-\\udf3b\\udf44]|\\ud81b[\\ude97-\\ude9a\\udfe2]|\\ud82f[\\udc9f]|\\ud836[\\ude87-\\ude8b]|\\ud83a[\\udd5e-\\udd5f]" };
      } }), yr = Z({ "src/language-markdown/utils.js"(r, l) {
        te();
        var { getLast: n } = ot(), { locStart: a, locEnd: i } = _u(), { cjkPattern: e, kPattern: t, punctuationPattern: u } = co(), s = ["liquidNode", "inlineCode", "emphasis", "esComment", "strong", "delete", "wikiLink", "link", "linkReference", "image", "imageReference", "footnote", "footnoteReference", "sentence", "whitespace", "word", "break", "inlineMath"], c = [...s, "tableCell", "paragraph", "heading"], C = new RegExp(t), f = new RegExp(u);
        function h(v, x) {
          let B = "non-cjk", I = "cj-letter", j = "k-letter", P = "cjk-punctuation", E = [], D = (x.proseWrap === "preserve" ? v : v.replace(new RegExp("(".concat(e, `)
(`).concat(e, ")"), "g"), "$1$2")).split(/([\t\n ]+)/);
          for (let [A, o] of D.entries()) {
            if (A % 2 === 1) {
              E.push({ type: "whitespace", value: /\n/.test(o) ? `
` : " " });
              continue;
            }
            if ((A === 0 || A === D.length - 1) && o === "")
              continue;
            let F = o.split(new RegExp("(".concat(e, ")")));
            for (let [y, T] of F.entries())
              if (!((y === 0 || y === F.length - 1) && T === "")) {
                if (y % 2 === 0) {
                  T !== "" && m({ type: "word", value: T, kind: B, hasLeadingPunctuation: f.test(T[0]), hasTrailingPunctuation: f.test(n(T)) });
                  continue;
                }
                m(f.test(T) ? { type: "word", value: T, kind: P, hasLeadingPunctuation: !0, hasTrailingPunctuation: !0 } : { type: "word", value: T, kind: C.test(T) ? j : I, hasLeadingPunctuation: !1, hasTrailingPunctuation: !1 });
              }
          }
          return E;
          function m(A) {
            let o = n(E);
            o && o.type === "word" && (o.kind === B && A.kind === I && !o.hasTrailingPunctuation || o.kind === I && A.kind === B && !A.hasLeadingPunctuation ? E.push({ type: "whitespace", value: " " }) : !F(B, P) && ![o.value, A.value].some((y) => /\u3000/.test(y)) && E.push({ type: "whitespace", value: "" })), E.push(A);
            function F(y, T) {
              return o.kind === y && A.kind === T || o.kind === T && A.kind === y;
            }
          }
        }
        function p(v, x) {
          let [, B, I, j] = x.slice(v.position.start.offset, v.position.end.offset).match(/^\s*(\d+)(\.|\))(\s*)/);
          return { numberText: B, marker: I, leadingSpaces: j };
        }
        function d(v, x) {
          if (!v.ordered || v.children.length < 2)
            return !1;
          let B = Number(p(v.children[0], x.originalText).numberText), I = Number(p(v.children[1], x.originalText).numberText);
          if (B === 0 && v.children.length > 2) {
            let j = Number(p(v.children[2], x.originalText).numberText);
            return I === 1 && j === 1;
          }
          return I === 1;
        }
        function g(v, x) {
          let { value: B } = v;
          return v.position.end.offset === x.length && B.endsWith(`
`) && x.endsWith(`
`) ? B.slice(0, -1) : B;
        }
        function w(v, x) {
          return function B(I, j, P) {
            let E = Object.assign({}, x(I, j, P));
            return E.children && (E.children = E.children.map((D, m) => B(D, m, [E, ...P]))), E;
          }(v, null, []);
        }
        function k(v) {
          if ((v == null ? void 0 : v.type) !== "link" || v.children.length !== 1)
            return !1;
          let [x] = v.children;
          return a(v) === a(x) && i(v) === i(x);
        }
        l.exports = { mapAst: w, splitText: h, punctuationPattern: u, getFencedCodeBlockValue: g, getOrderedListItemInfo: p, hasGitDiffFriendlyOrderedList: d, INLINE_NODE_TYPES: s, INLINE_NODE_WRAPPER_TYPES: c, isAutolink: k };
      } }), po = Z({ "src/language-markdown/embed.js"(r, l) {
        te();
        var { inferParserByLanguage: n, getMaxContinuousCount: a } = ot(), { builders: { hardline: i, markAsRoot: e }, utils: { replaceEndOfLine: t } } = Ye(), u = gr(), { getFencedCodeBlockValue: s } = yr();
        function c(C, f, h, p) {
          let d = C.getValue();
          if (d.type === "code" && d.lang !== null) {
            let g = n(d.lang, p);
            if (g) {
              let w = p.__inJsTemplate ? "~" : "`", k = w.repeat(Math.max(3, a(d.value, w) + 1)), v = { parser: g };
              d.lang === "tsx" && (v.filepath = "dummy.tsx");
              let x = h(s(d, p.originalText), v, { stripTrailingHardline: !0 });
              return e([k, d.lang, d.meta ? " " + d.meta : "", i, t(x), i, k]);
            }
          }
          switch (d.type) {
            case "front-matter":
              return u(d, h);
            case "importExport":
              return [h(d.value, { parser: "babel" }, { stripTrailingHardline: !0 }), i];
            case "jsx":
              return h("<$>".concat(d.value, "</$>"), { parser: "__js_expression", rootMarker: "mdx" }, { stripTrailingHardline: !0 });
          }
          return null;
        }
        l.exports = c;
      } }), Ru = Z({ "src/language-markdown/pragma.js"(r, l) {
        te();
        var n = Mu(), a = ["format", "prettier"];
        function i(e) {
          let t = "@(".concat(a.join("|"), ")"), u = new RegExp(["<!--\\s*".concat(t, "\\s*-->"), "{\\s*\\/\\*\\s*".concat(t, "\\s*\\*\\/\\s*}"), `<!--.*\r?
[\\s\\S]*(^|
)[^\\S
]*`.concat(t, `[^\\S
]*($|
)[\\s\\S]*
.*-->`)].join("|"), "m"), s = e.match(u);
          return (s == null ? void 0 : s.index) === 0;
        }
        l.exports = { startWithPragma: i, hasPragma: (e) => i(n(e).content.trimStart()), insertPragma: (e) => {
          let t = n(e), u = "<!-- @".concat(a[0], " -->");
          return t.frontMatter ? "".concat(t.frontMatter.raw, `

`).concat(u, `

`).concat(t.content) : "".concat(u, `

`).concat(t.content);
        } };
      } }), Do = Z({ "src/language-markdown/print-preprocess.js"(r, l) {
        te();
        var n = It(), { getOrderedListItemInfo: a, mapAst: i, splitText: e } = yr(), t = /^.$/su;
        function u(k, v) {
          return k = C(k, v), k = p(k), k = c(k), k = g(k, v), k = w(k, v), k = d(k, v), k = s(k), k = f(k), k;
        }
        function s(k) {
          return i(k, (v) => v.type !== "import" && v.type !== "export" ? v : Object.assign(Object.assign({}, v), {}, { type: "importExport" }));
        }
        function c(k) {
          return i(k, (v) => v.type !== "inlineCode" ? v : Object.assign(Object.assign({}, v), {}, { value: v.value.replace(/\s+/g, " ") }));
        }
        function C(k, v) {
          return i(k, (x) => x.type !== "text" || x.value === "*" || x.value === "_" || !t.test(x.value) || x.position.end.offset - x.position.start.offset === x.value.length ? x : Object.assign(Object.assign({}, x), {}, { value: v.originalText.slice(x.position.start.offset, x.position.end.offset) }));
        }
        function f(k) {
          return h(k, (v, x) => v.type === "importExport" && x.type === "importExport", (v, x) => ({ type: "importExport", value: v.value + `

` + x.value, position: { start: v.position.start, end: x.position.end } }));
        }
        function h(k, v, x) {
          return i(k, (B) => {
            if (!B.children)
              return B;
            let I = B.children.reduce((j, P) => {
              let E = n(j);
              return E && v(E, P) ? j.splice(-1, 1, x(E, P)) : j.push(P), j;
            }, []);
            return Object.assign(Object.assign({}, B), {}, { children: I });
          });
        }
        function p(k) {
          return h(k, (v, x) => v.type === "text" && x.type === "text", (v, x) => ({ type: "text", value: v.value + x.value, position: { start: v.position.start, end: x.position.end } }));
        }
        function d(k, v) {
          return i(k, (x, B, I) => {
            let [j] = I;
            if (x.type !== "text")
              return x;
            let { value: P } = x;
            return j.type === "paragraph" && (B === 0 && (P = P.trimStart()), B === j.children.length - 1 && (P = P.trimEnd())), { type: "sentence", position: x.position, children: e(P, v) };
          });
        }
        function g(k, v) {
          return i(k, (x, B, I) => {
            if (x.type === "code") {
              let j = /^\n?(?: {4,}|\t)/.test(v.originalText.slice(x.position.start.offset, x.position.end.offset));
              if (x.isIndented = j, j)
                for (let P = 0; P < I.length; P++) {
                  let E = I[P];
                  if (E.hasIndentedCodeblock)
                    break;
                  E.type === "list" && (E.hasIndentedCodeblock = !0);
                }
            }
            return x;
          });
        }
        function w(k, v) {
          return i(k, (I, j, P) => {
            if (I.type === "list" && I.children.length > 0) {
              for (let E = 0; E < P.length; E++) {
                let D = P[E];
                if (D.type === "list" && !D.isAligned)
                  return I.isAligned = !1, I;
              }
              I.isAligned = B(I);
            }
            return I;
          });
          function x(I) {
            return I.children.length === 0 ? -1 : I.children[0].position.start.column - 1;
          }
          function B(I) {
            if (!I.ordered)
              return !0;
            let [j, P] = I.children;
            if (a(j, v.originalText).leadingSpaces.length > 1)
              return !0;
            let E = x(j);
            if (E === -1)
              return !1;
            if (I.children.length === 1)
              return E % v.tabWidth === 0;
            let D = x(P);
            return E !== D ? !1 : E % v.tabWidth === 0 ? !0 : a(P, v.originalText).leadingSpaces.length > 1;
          }
        }
        l.exports = u;
      } }), fo = Z({ "src/language-markdown/clean.js"(r, l) {
        te();
        var { isFrontMatterNode: n } = ot(), { startWithPragma: a } = Ru(), i = /* @__PURE__ */ new Set(["position", "raw"]);
        function e(t, u, s) {
          if ((t.type === "front-matter" || t.type === "code" || t.type === "yaml" || t.type === "import" || t.type === "export" || t.type === "jsx") && delete u.value, t.type === "list" && delete u.isAligned, (t.type === "list" || t.type === "listItem") && (delete u.spread, delete u.loose), t.type === "text" || (t.type === "inlineCode" && (u.value = t.value.replace(/[\t\n ]+/g, " ")), t.type === "wikiLink" && (u.value = t.value.trim().replace(/[\t\n]+/g, " ")), (t.type === "definition" || t.type === "linkReference") && (u.label = t.label.trim().replace(/[\t\n ]+/g, " ").toLowerCase()), (t.type === "definition" || t.type === "link" || t.type === "image") && t.title && (u.title = t.title.replace(/\\(["')])/g, "$1")), s && s.type === "root" && s.children.length > 0 && (s.children[0] === t || n(s.children[0]) && s.children[1] === t) && t.type === "html" && a(t.value)))
            return null;
        }
        e.ignoredProperties = i, l.exports = e;
      } }), mo = Z({ "src/language-markdown/printer-markdown.js"(r, l) {
        te();
        var { getLast: n, getMinNotPresentContinuousCount: a, getMaxContinuousCount: i, getStringWidth: e, isNonEmptyArray: t } = ot(), { builders: { breakParent: u, join: s, line: c, literalline: C, markAsRoot: f, hardline: h, softline: p, ifBreak: d, fill: g, align: w, indent: k, group: v, hardlineWithoutBreakParent: x }, utils: { normalizeDoc: B, replaceTextEndOfLine: I }, printer: { printDocToString: j } } = Ye(), P = po(), { insertPragma: E } = Ru(), { locStart: D, locEnd: m } = _u(), A = Do(), o = fo(), { getFencedCodeBlockValue: F, hasGitDiffFriendlyOrderedList: y, splitText: T, punctuationPattern: b, INLINE_NODE_TYPES: S, INLINE_NODE_WRAPPER_TYPES: L, isAutolink: R } = yr(), O = /* @__PURE__ */ new Set(["importExport"]), U = ["heading", "tableCell", "link", "wikiLink"], V = /* @__PURE__ */ new Set(["listItem", "definition", "footnoteDefinition"]);
        function _(ce, De, he) {
          let ue = ce.getValue();
          if (le(ce))
            return T(De.originalText.slice(ue.position.start.offset, ue.position.end.offset), De).map((xe) => xe.type === "word" ? xe.value : xe.value === "" ? "" : pe(ce, xe.value, De));
          switch (ue.type) {
            case "front-matter":
              return De.originalText.slice(ue.position.start.offset, ue.position.end.offset);
            case "root":
              return ue.children.length === 0 ? "" : [B(W(ce, De, he)), O.has(fe(ue).type) ? "" : h];
            case "paragraph":
              return se(ce, De, he, { postprocessor: g });
            case "sentence":
              return se(ce, De, he);
            case "word": {
              let xe = ue.value.replace(/\*/g, "\\$&").replace(new RegExp(["(^|".concat(b, ")(_+)"), "(_+)(".concat(b, "|$)")].join("|"), "g"), (Ae, be, We, Se, ye) => (We ? "".concat(be).concat(We) : "".concat(Se).concat(ye)).replace(/_/g, "\\_")), Q = (Ae, be, We) => Ae.type === "sentence" && We === 0, ve = (Ae, be, We) => R(Ae.children[We - 1]);
              return xe !== ue.value && (ce.match(void 0, Q, ve) || ce.match(void 0, Q, (Ae, be, We) => Ae.type === "emphasis" && We === 0, ve)) && (xe = xe.replace(/^(\\?[*_])+/, (Ae) => Ae.replace(/\\/g, ""))), xe;
            }
            case "whitespace": {
              let xe = ce.getParentNode(), Q = xe.children.indexOf(ue), ve = xe.children[Q + 1], Ae = ve && /^>|^(?:[*+-]|#{1,6}|\d+[).])$/.test(ve.value) ? "never" : De.proseWrap;
              return pe(ce, ue.value, { proseWrap: Ae });
            }
            case "emphasis": {
              let xe;
              if (R(ue.children[0]))
                xe = De.originalText[ue.position.start.offset];
              else {
                let Q = ce.getParentNode(), ve = Q.children.indexOf(ue), Ae = Q.children[ve - 1], be = Q.children[ve + 1];
                xe = Ae && Ae.type === "sentence" && Ae.children.length > 0 && n(Ae.children).type === "word" && !n(Ae.children).hasTrailingPunctuation || be && be.type === "sentence" && be.children.length > 0 && be.children[0].type === "word" && !be.children[0].hasLeadingPunctuation || ee(ce, "emphasis") ? "*" : "_";
              }
              return [xe, se(ce, De, he), xe];
            }
            case "strong":
              return ["**", se(ce, De, he), "**"];
            case "delete":
              return ["~~", se(ce, De, he), "~~"];
            case "inlineCode": {
              let xe = a(ue.value, "`"), Q = "`".repeat(xe || 1), ve = xe && !/^\s/.test(ue.value) ? " " : "";
              return [Q, ve, ue.value, ve, Q];
            }
            case "wikiLink": {
              let xe = "";
              return De.proseWrap === "preserve" ? xe = ue.value : xe = ue.value.replace(/[\t\n]+/g, " "), ["[[", xe, "]]"];
            }
            case "link":
              switch (De.originalText[ue.position.start.offset]) {
                case "<": {
                  let xe = "mailto:";
                  return ["<", ue.url.startsWith(xe) && De.originalText.slice(ue.position.start.offset + 1, ue.position.start.offset + 1 + xe.length) !== xe ? ue.url.slice(xe.length) : ue.url, ">"];
                }
                case "[":
                  return ["[", se(ce, De, he), "](", Ee(ue.url, ")"), Te(ue.title, De), ")"];
                default:
                  return De.originalText.slice(ue.position.start.offset, ue.position.end.offset);
              }
            case "image":
              return ["![", ue.alt || "", "](", Ee(ue.url, ")"), Te(ue.title, De), ")"];
            case "blockquote":
              return ["> ", w("> ", se(ce, De, he))];
            case "heading":
              return ["#".repeat(ue.depth) + " ", se(ce, De, he)];
            case "code": {
              if (ue.isIndented) {
                let ve = " ".repeat(4);
                return w(ve, [ve, ...I(ue.value, h)]);
              }
              let xe = De.__inJsTemplate ? "~" : "`", Q = xe.repeat(Math.max(3, i(ue.value, xe) + 1));
              return [Q, ue.lang || "", ue.meta ? " " + ue.meta : "", h, ...I(F(ue, De.originalText), h), h, Q];
            }
            case "html": {
              let xe = ce.getParentNode(), Q = xe.type === "root" && n(xe.children) === ue ? ue.value.trimEnd() : ue.value, ve = /^<!--.*-->$/s.test(Q);
              return I(Q, ve ? h : f(C));
            }
            case "list": {
              let xe = $(ue, ce.getParentNode()), Q = y(ue, De);
              return se(ce, De, he, { processor: (ve, Ae) => {
                let be = Se(), We = ve.getValue();
                if (We.children.length === 2 && We.children[1].type === "html" && We.children[0].position.start.column !== We.children[1].position.start.column)
                  return [be, Y(ve, De, he, be)];
                return [be, w(" ".repeat(be.length), Y(ve, De, he, be))];
                function Se() {
                  let ye = ue.ordered ? (Ae === 0 ? ue.start : Q ? 1 : ue.start + Ae) + (xe % 2 === 0 ? ". " : ") ") : xe % 2 === 0 ? "- " : "* ";
                  return ue.isAligned || ue.hasIndentedCodeblock ? H(ye, De) : ye;
                }
              } });
            }
            case "thematicBreak": {
              let xe = ne(ce, "list");
              return xe === -1 ? "---" : $(ce.getParentNode(xe), ce.getParentNode(xe + 1)) % 2 === 0 ? "***" : "---";
            }
            case "linkReference":
              return ["[", se(ce, De, he), "]", ue.referenceType === "full" ? ["[", ue.identifier, "]"] : ue.referenceType === "collapsed" ? "[]" : ""];
            case "imageReference":
              switch (ue.referenceType) {
                case "full":
                  return ["![", ue.alt || "", "][", ue.identifier, "]"];
                default:
                  return ["![", ue.alt, "]", ue.referenceType === "collapsed" ? "[]" : ""];
              }
            case "definition": {
              let xe = De.proseWrap === "always" ? c : " ";
              return v(["[", ue.identifier, "]:", k([xe, Ee(ue.url), ue.title === null ? "" : [xe, Te(ue.title, De, !1)]])]);
            }
            case "footnote":
              return ["[^", se(ce, De, he), "]"];
            case "footnoteReference":
              return ["[^", ue.identifier, "]"];
            case "footnoteDefinition": {
              let xe = ce.getParentNode().children[ce.getName() + 1], Q = ue.children.length === 1 && ue.children[0].type === "paragraph" && (De.proseWrap === "never" || De.proseWrap === "preserve" && ue.children[0].position.start.line === ue.children[0].position.end.line);
              return ["[^", ue.identifier, "]: ", Q ? se(ce, De, he) : v([w(" ".repeat(4), se(ce, De, he, { processor: (ve, Ae) => Ae === 0 ? v([p, he()]) : he() })), xe && xe.type === "footnoteDefinition" ? p : ""])];
            }
            case "table":
              return J(ce, De, he);
            case "tableCell":
              return se(ce, De, he);
            case "break":
              return /\s/.test(De.originalText[ue.position.start.offset]) ? ["  ", f(C)] : ["\\", h];
            case "liquidNode":
              return I(ue.value, h);
            case "importExport":
              return [ue.value, h];
            case "esComment":
              return ["{/* ", ue.value, " */}"];
            case "jsx":
              return ue.value;
            case "math":
              return ["$$", h, ue.value ? [...I(ue.value, h), h] : "", "$$"];
            case "inlineMath":
              return De.originalText.slice(D(ue), m(ue));
            case "tableRow":
            case "listItem":
            default:
              throw new Error("Unknown markdown type ".concat(JSON.stringify(ue.type)));
          }
        }
        function Y(ce, De, he, ue) {
          let xe = ce.getValue(), Q = xe.checked === null ? "" : xe.checked ? "[x] " : "[ ] ";
          return [Q, se(ce, De, he, { processor: (ve, Ae) => {
            if (Ae === 0 && ve.getValue().type !== "list")
              return w(" ".repeat(Q.length), he());
            let be = " ".repeat($e(De.tabWidth - ue.length, 0, 3));
            return [be, w(be, he())];
          } })];
        }
        function H(ce, De) {
          let he = ue();
          return ce + " ".repeat(he >= 4 ? 0 : he);
          function ue() {
            let xe = ce.length % De.tabWidth;
            return xe === 0 ? 0 : De.tabWidth - xe;
          }
        }
        function $(ce, De) {
          return K(ce, De, (he) => he.ordered === ce.ordered);
        }
        function K(ce, De, he) {
          let ue = -1;
          for (let xe of De.children)
            if (xe.type === ce.type && he(xe) ? ue++ : ue = -1, xe === ce)
              return ue;
        }
        function ne(ce, De) {
          let he = Array.isArray(De) ? De : [De], ue = -1, xe;
          for (; xe = ce.getParentNode(++ue); )
            if (he.includes(xe.type))
              return ue;
          return -1;
        }
        function ee(ce, De) {
          let he = ne(ce, De);
          return he === -1 ? null : ce.getParentNode(he);
        }
        function pe(ce, De, he) {
          if (he.proseWrap === "preserve" && De === `
`)
            return h;
          let ue = he.proseWrap === "always" && !ee(ce, U);
          return De !== "" ? ue ? c : " " : ue ? p : "";
        }
        function J(ce, De, he) {
          let ue = ce.getValue(), xe = [], Q = ce.map((ye) => ye.map((N, z) => {
            let ie = j(he(), De).formatted, Be = e(ie);
            return xe[z] = Math.max(xe[z] || 3, Be), { text: ie, width: Be };
          }, "children"), "children"), ve = be(!1);
          if (De.proseWrap !== "never")
            return [u, ve];
          let Ae = be(!0);
          return [u, v(d(Ae, ve))];
          function be(ye) {
            let N = [Se(Q[0], ye), We(ye)];
            return Q.length > 1 && N.push(s(x, Q.slice(1).map((z) => Se(z, ye)))), s(x, N);
          }
          function We(ye) {
            let N = xe.map((z, ie) => {
              let Be = ue.align[ie], nt = Be === "center" || Be === "left" ? ":" : "-", _e = Be === "center" || Be === "right" ? ":" : "-", Ue = ye ? "-" : "-".repeat(z - 2);
              return "".concat(nt).concat(Ue).concat(_e);
            });
            return "| ".concat(N.join(" | "), " |");
          }
          function Se(ye, N) {
            let z = ye.map((ie, Be) => {
              let { text: nt, width: _e } = ie;
              if (N)
                return nt;
              let Ue = xe[Be] - _e, we = ue.align[Be], yt = 0;
              we === "right" ? yt = Ue : we === "center" && (yt = Math.floor(Ue / 2));
              let Ie = Ue - yt;
              return "".concat(" ".repeat(yt)).concat(nt).concat(" ".repeat(Ie));
            });
            return "| ".concat(z.join(" | "), " |");
          }
        }
        function W(ce, De, he) {
          let ue = [], xe = null, { children: Q } = ce.getValue();
          for (let [ve, Ae] of Q.entries())
            switch (ae(Ae)) {
              case "start":
                xe === null && (xe = { index: ve, offset: Ae.position.end.offset });
                break;
              case "end":
                xe !== null && (ue.push({ start: xe, end: { index: ve, offset: Ae.position.start.offset } }), xe = null);
                break;
            }
          return se(ce, De, he, { processor: (ve, Ae) => {
            if (ue.length > 0) {
              let be = ue[0];
              if (Ae === be.start.index)
                return [Q[be.start.index].value, De.originalText.slice(be.start.offset, be.end.offset), Q[be.end.index].value];
              if (be.start.index < Ae && Ae < be.end.index)
                return !1;
              if (Ae === be.end.index)
                return ue.shift(), !1;
            }
            return he();
          } });
        }
        function se(ce, De, he) {
          let ue = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, { postprocessor: xe } = ue, Q = ue.processor || (() => he()), ve = ce.getValue(), Ae = [], be;
          return ce.each((We, Se) => {
            let ye = We.getValue(), N = Q(We, Se);
            if (N !== !1) {
              let z = { parts: Ae, prevNode: be, parentNode: ve, options: De };
              q(ye, z) && (Ae.push(h), be && O.has(be.type) || (X(ye, z) || G(ye, z)) && Ae.push(h), G(ye, z) && Ae.push(h)), Ae.push(N), be = ye;
            }
          }, "children"), xe ? xe(Ae) : Ae;
        }
        function fe(ce) {
          let De = ce;
          for (; t(De.children); )
            De = n(De.children);
          return De;
        }
        function ae(ce) {
          let De;
          if (ce.type === "html")
            De = ce.value.match(/^<!--\s*prettier-ignore(?:-(start|end))?\s*-->$/);
          else {
            let he;
            ce.type === "esComment" ? he = ce : ce.type === "paragraph" && ce.children.length === 1 && ce.children[0].type === "esComment" && (he = ce.children[0]), he && (De = he.value.match(/^prettier-ignore(?:-(start|end))?$/));
          }
          return De ? De[1] || "next" : !1;
        }
        function q(ce, De) {
          let he = De.parts.length === 0, ue = S.includes(ce.type), xe = ce.type === "html" && L.includes(De.parentNode.type);
          return !he && !ue && !xe;
        }
        function X(ce, De) {
          var he, ue, xe;
          let Q = (De.prevNode && De.prevNode.type) === ce.type && V.has(ce.type), ve = De.parentNode.type === "listItem" && !De.parentNode.loose, Ae = ((he = De.prevNode) === null || he === void 0 ? void 0 : he.type) === "listItem" && De.prevNode.loose, be = ae(De.prevNode) === "next", We = ce.type === "html" && ((ue = De.prevNode) === null || ue === void 0 ? void 0 : ue.type) === "html" && De.prevNode.position.end.line + 1 === ce.position.start.line, Se = ce.type === "html" && De.parentNode.type === "listItem" && ((xe = De.prevNode) === null || xe === void 0 ? void 0 : xe.type) === "paragraph" && De.prevNode.position.end.line + 1 === ce.position.start.line;
          return Ae || !(Q || ve || be || We || Se);
        }
        function G(ce, De) {
          let he = De.prevNode && De.prevNode.type === "list", ue = ce.type === "code" && ce.isIndented;
          return he && ue;
        }
        function le(ce) {
          let De = ee(ce, ["linkReference", "imageReference"]);
          return De && (De.type !== "linkReference" || De.referenceType !== "full");
        }
        function Ee(ce) {
          let De = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], he = [" ", ...Array.isArray(De) ? De : [De]];
          return new RegExp(he.map((ue) => "\\".concat(ue)).join("|")).test(ce) ? "<".concat(ce, ">") : ce;
        }
        function Te(ce, De) {
          let he = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
          if (!ce)
            return "";
          if (he)
            return " " + Te(ce, De, !1);
          if (ce = ce.replace(/\\(["')])/g, "$1"), ce.includes('"') && ce.includes("'") && !ce.includes(")"))
            return "(".concat(ce, ")");
          let ue = ce.split("'").length - 1, xe = ce.split('"').length - 1, Q = ue > xe ? '"' : xe > ue || De.singleQuote ? "'" : '"';
          return ce = ce.replace(/\\/, "\\\\"), ce = ce.replace(new RegExp("(".concat(Q, ")"), "g"), "\\$1"), "".concat(Q).concat(ce).concat(Q);
        }
        function $e(ce, De, he) {
          return ce < De ? De : ce > he ? he : ce;
        }
        function qe(ce) {
          let De = Number(ce.getName());
          if (De === 0)
            return !1;
          let he = ce.getParentNode().children[De - 1];
          return ae(he) === "next";
        }
        l.exports = { preprocess: A, print: _, embed: P, massageAstNode: o, hasPrettierIgnore: qe, insertPragma: E };
      } }), go = Z({ "src/language-markdown/options.js"(r, l) {
        te();
        var n = Kt();
        l.exports = { proseWrap: n.proseWrap, singleQuote: n.singleQuote };
      } }), yo = Z({ "src/language-markdown/parsers.js"() {
        te();
      } }), Vu = Z({ "node_modules/linguist-languages/data/Markdown.json"(r, l) {
        l.exports = { name: "Markdown", type: "prose", color: "#083fa1", aliases: ["pandoc"], aceMode: "markdown", codemirrorMode: "gfm", codemirrorMimeType: "text/x-gfm", wrap: !0, extensions: [".md", ".livemd", ".markdown", ".mdown", ".mdwn", ".mdx", ".mkd", ".mkdn", ".mkdown", ".ronn", ".scd", ".workbook"], filenames: ["contents.lr"], tmScope: "source.gfm", languageId: 222 };
      } }), ho = Z({ "src/language-markdown/index.js"(r, l) {
        te();
        var n = qt(), a = mo(), i = go(), e = yo(), t = [n(Vu(), (s) => ({ since: "1.8.0", parsers: ["markdown"], vscodeLanguageIds: ["markdown"], filenames: [...s.filenames, "README"], extensions: s.extensions.filter((c) => c !== ".mdx") })), n(Vu(), () => ({ name: "MDX", since: "1.15.0", parsers: ["mdx"], vscodeLanguageIds: ["mdx"], filenames: [], extensions: [".mdx"] }))], u = { mdast: a };
        l.exports = { languages: t, options: i, printers: u, parsers: e };
      } }), Eo = Z({ "src/language-html/clean.js"(r, l) {
        te();
        var { isFrontMatterNode: n } = ot(), a = /* @__PURE__ */ new Set(["sourceSpan", "startSourceSpan", "endSourceSpan", "nameSpan", "valueSpan"]);
        function i(e, t) {
          if (e.type === "text" || e.type === "comment" || n(e) || e.type === "yaml" || e.type === "toml")
            return null;
          e.type === "attribute" && delete t.value, e.type === "docType" && delete t.value;
        }
        i.ignoredProperties = a, l.exports = i;
      } }), Co = Z({ "src/language-html/constants.evaluate.js"(r, l) {
        l.exports = { CSS_DISPLAY_TAGS: { area: "none", base: "none", basefont: "none", datalist: "none", head: "none", link: "none", meta: "none", noembed: "none", noframes: "none", param: "block", rp: "none", script: "block", source: "block", style: "none", template: "inline", track: "block", title: "none", html: "block", body: "block", address: "block", blockquote: "block", center: "block", div: "block", figure: "block", figcaption: "block", footer: "block", form: "block", header: "block", hr: "block", legend: "block", listing: "block", main: "block", p: "block", plaintext: "block", pre: "block", xmp: "block", slot: "contents", ruby: "ruby", rt: "ruby-text", article: "block", aside: "block", h1: "block", h2: "block", h3: "block", h4: "block", h5: "block", h6: "block", hgroup: "block", nav: "block", section: "block", dir: "block", dd: "block", dl: "block", dt: "block", ol: "block", ul: "block", li: "list-item", table: "table", caption: "table-caption", colgroup: "table-column-group", col: "table-column", thead: "table-header-group", tbody: "table-row-group", tfoot: "table-footer-group", tr: "table-row", td: "table-cell", th: "table-cell", fieldset: "block", button: "inline-block", details: "block", summary: "block", dialog: "block", meter: "inline-block", progress: "inline-block", object: "inline-block", video: "inline-block", audio: "inline-block", select: "inline-block", option: "block", optgroup: "block" }, CSS_DISPLAY_DEFAULT: "inline", CSS_WHITE_SPACE_TAGS: { listing: "pre", plaintext: "pre", pre: "pre", xmp: "pre", nobr: "nowrap", table: "initial", textarea: "pre-wrap" }, CSS_WHITE_SPACE_DEFAULT: "normal" };
      } }), Fo = Z({ "src/language-html/utils/is-unknown-namespace.js"(r, l) {
        te();
        function n(a) {
          return a.type === "element" && !a.hasExplicitNamespace && !["html", "svg"].includes(a.namespace);
        }
        l.exports = n;
      } }), en = Z({ "src/language-html/utils/index.js"(r, l) {
        te();
        var { inferParserByLanguage: n, isFrontMatterNode: a } = ot(), { builders: { line: i, hardline: e, join: t }, utils: { getDocParts: u, replaceTextEndOfLine: s } } = Ye(), { CSS_DISPLAY_TAGS: c, CSS_DISPLAY_DEFAULT: C, CSS_WHITE_SPACE_TAGS: f, CSS_WHITE_SPACE_DEFAULT: h } = Co(), p = Fo(), d = /* @__PURE__ */ new Set(["	", `
`, "\f", "\r", " "]), g = (N) => N.replace(/^[\t\n\f\r ]+/, ""), w = (N) => N.replace(/[\t\n\f\r ]+$/, ""), k = (N) => g(w(N)), v = (N) => N.replace(/^[\t\f\r ]*\n/g, ""), x = (N) => v(w(N)), B = (N) => N.split(/[\t\n\f\r ]+/), I = (N) => N.match(/^[\t\n\f\r ]*/)[0], j = (N) => {
          let [, z, ie, Be] = N.match(/^([\t\n\f\r ]*)(.*?)([\t\n\f\r ]*)$/s);
          return { leadingWhitespace: z, trailingWhitespace: Be, text: ie };
        }, P = (N) => /[\t\n\f\r ]/.test(N);
        function E(N, z) {
          return !!(N.type === "ieConditionalComment" && N.lastChild && !N.lastChild.isSelfClosing && !N.lastChild.endSourceSpan || N.type === "ieConditionalComment" && !N.complete || le(N) && N.children.some((ie) => ie.type !== "text" && ie.type !== "interpolation") || Ae(N, z) && !o(N) && N.type !== "interpolation");
        }
        function D(N) {
          return N.type === "attribute" || !N.parent || !N.prev ? !1 : m(N.prev);
        }
        function m(N) {
          return N.type === "comment" && N.value.trim() === "prettier-ignore";
        }
        function A(N) {
          return N.type === "text" || N.type === "comment";
        }
        function o(N) {
          return N.type === "element" && (N.fullName === "script" || N.fullName === "style" || N.fullName === "svg:style" || p(N) && (N.name === "script" || N.name === "style"));
        }
        function F(N) {
          return N.children && !o(N);
        }
        function y(N) {
          return o(N) || N.type === "interpolation" || T(N);
        }
        function T(N) {
          return qe(N).startsWith("pre");
        }
        function b(N, z) {
          let ie = Be();
          if (ie && !N.prev && N.parent && N.parent.tagDefinition && N.parent.tagDefinition.ignoreFirstLf)
            return N.type === "interpolation";
          return ie;
          function Be() {
            return a(N) ? !1 : (N.type === "text" || N.type === "interpolation") && N.prev && (N.prev.type === "text" || N.prev.type === "interpolation") ? !0 : !N.parent || N.parent.cssDisplay === "none" ? !1 : le(N.parent) ? !0 : !(!N.prev && (N.parent.type === "root" || le(N) && N.parent || o(N.parent) || Q(N.parent, z) || !fe(N.parent.cssDisplay)) || N.prev && !X(N.prev.cssDisplay));
          }
        }
        function S(N, z) {
          return a(N) ? !1 : (N.type === "text" || N.type === "interpolation") && N.next && (N.next.type === "text" || N.next.type === "interpolation") ? !0 : !N.parent || N.parent.cssDisplay === "none" ? !1 : le(N.parent) ? !0 : !(!N.next && (N.parent.type === "root" || le(N) && N.parent || o(N.parent) || Q(N.parent, z) || !ae(N.parent.cssDisplay)) || N.next && !q(N.next.cssDisplay));
        }
        function L(N) {
          return G(N.cssDisplay) && !o(N);
        }
        function R(N) {
          return a(N) || N.next && N.sourceSpan.end && N.sourceSpan.end.line + 1 < N.next.sourceSpan.start.line;
        }
        function O(N) {
          return U(N) || N.type === "element" && N.children.length > 0 && (["body", "script", "style"].includes(N.name) || N.children.some((z) => ee(z))) || N.firstChild && N.firstChild === N.lastChild && N.firstChild.type !== "text" && H(N.firstChild) && (!N.lastChild.isTrailingSpaceSensitive || $(N.lastChild));
        }
        function U(N) {
          return N.type === "element" && N.children.length > 0 && (["html", "head", "ul", "ol", "select"].includes(N.name) || N.cssDisplay.startsWith("table") && N.cssDisplay !== "table-cell");
        }
        function V(N) {
          return K(N) || N.prev && _(N.prev) || Y(N);
        }
        function _(N) {
          return K(N) || N.type === "element" && N.fullName === "br" || Y(N);
        }
        function Y(N) {
          return H(N) && $(N);
        }
        function H(N) {
          return N.hasLeadingSpaces && (N.prev ? N.prev.sourceSpan.end.line < N.sourceSpan.start.line : N.parent.type === "root" || N.parent.startSourceSpan.end.line < N.sourceSpan.start.line);
        }
        function $(N) {
          return N.hasTrailingSpaces && (N.next ? N.next.sourceSpan.start.line > N.sourceSpan.end.line : N.parent.type === "root" || N.parent.endSourceSpan && N.parent.endSourceSpan.start.line > N.sourceSpan.end.line);
        }
        function K(N) {
          switch (N.type) {
            case "ieConditionalComment":
            case "comment":
            case "directive":
              return !0;
            case "element":
              return ["script", "select"].includes(N.name);
          }
          return !1;
        }
        function ne(N) {
          return N.lastChild ? ne(N.lastChild) : N;
        }
        function ee(N) {
          return N.children && N.children.some((z) => z.type !== "text");
        }
        function pe(N) {
          let { type: z, lang: ie } = N.attrMap;
          if (z === "module" || z === "text/javascript" || z === "text/babel" || z === "application/javascript" || ie === "jsx")
            return "babel";
          if (z === "application/x-typescript" || ie === "ts" || ie === "tsx")
            return "typescript";
          if (z === "text/markdown")
            return "markdown";
          if (z === "text/html")
            return "html";
          if (z && (z.endsWith("json") || z.endsWith("importmap")) || z === "speculationrules")
            return "json";
          if (z === "text/x-handlebars-template")
            return "glimmer";
        }
        function J(N, z) {
          let { lang: ie } = N.attrMap;
          if (!ie || ie === "postcss" || ie === "css")
            return "css";
          if (ie === "scss")
            return "scss";
          if (ie === "less")
            return "less";
          if (ie === "stylus")
            return n("stylus", z);
        }
        function W(N, z) {
          if (N.name === "script" && !N.attrMap.src)
            return !N.attrMap.lang && !N.attrMap.type ? "babel" : pe(N);
          if (N.name === "style")
            return J(N, z);
          if (z && Ae(N, z))
            return pe(N) || !("src" in N.attrMap) && n(N.attrMap.lang, z);
        }
        function se(N) {
          return N === "block" || N === "list-item" || N.startsWith("table");
        }
        function fe(N) {
          return !se(N) && N !== "inline-block";
        }
        function ae(N) {
          return !se(N) && N !== "inline-block";
        }
        function q(N) {
          return !se(N);
        }
        function X(N) {
          return !se(N);
        }
        function G(N) {
          return !se(N) && N !== "inline-block";
        }
        function le(N) {
          return qe(N).startsWith("pre");
        }
        function Ee(N, z) {
          let ie = 0;
          for (let Be = N.stack.length - 1; Be >= 0; Be--) {
            let nt = N.stack[Be];
            nt && typeof nt == "object" && !Array.isArray(nt) && z(nt) && ie++;
          }
          return ie;
        }
        function Te(N, z) {
          let ie = N;
          for (; ie; ) {
            if (z(ie))
              return !0;
            ie = ie.parent;
          }
          return !1;
        }
        function $e(N, z) {
          if (N.prev && N.prev.type === "comment") {
            let Be = N.prev.value.match(/^\s*display:\s*([a-z]+)\s*$/);
            if (Be)
              return Be[1];
          }
          let ie = !1;
          if (N.type === "element" && N.namespace === "svg")
            if (Te(N, (Be) => Be.fullName === "svg:foreignObject"))
              ie = !0;
            else
              return N.name === "svg" ? "inline-block" : "block";
          switch (z.htmlWhitespaceSensitivity) {
            case "strict":
              return "inline";
            case "ignore":
              return "block";
            default:
              return z.parser === "vue" && N.parent && N.parent.type === "root" ? "block" : N.type === "element" && (!N.namespace || ie || p(N)) && c[N.name] || C;
          }
        }
        function qe(N) {
          return N.type === "element" && (!N.namespace || p(N)) && f[N.name] || h;
        }
        function ce(N) {
          let z = Number.POSITIVE_INFINITY;
          for (let ie of N.split(`
`)) {
            if (ie.length === 0)
              continue;
            if (!d.has(ie[0]))
              return 0;
            let Be = I(ie).length;
            ie.length !== Be && Be < z && (z = Be);
          }
          return z === Number.POSITIVE_INFINITY ? 0 : z;
        }
        function De(N) {
          let z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ce(N);
          return z === 0 ? N : N.split(`
`).map((ie) => ie.slice(z)).join(`
`);
        }
        function he(N, z) {
          let ie = 0;
          for (let Be = 0; Be < N.length; Be++)
            N[Be] === z && ie++;
          return ie;
        }
        function ue(N) {
          return N.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
        }
        var xe = /* @__PURE__ */ new Set(["template", "style", "script"]);
        function Q(N, z) {
          return ve(N, z) && !xe.has(N.fullName);
        }
        function ve(N, z) {
          return z.parser === "vue" && N.type === "element" && N.parent.type === "root" && N.fullName.toLowerCase() !== "html";
        }
        function Ae(N, z) {
          return ve(N, z) && (Q(N, z) || N.attrMap.lang && N.attrMap.lang !== "html");
        }
        function be(N) {
          let z = N.fullName;
          return z.charAt(0) === "#" || z === "slot-scope" || z === "v-slot" || z.startsWith("v-slot:");
        }
        function We(N, z) {
          let ie = N.parent;
          if (!ve(ie, z))
            return !1;
          let Be = ie.fullName, nt = N.fullName;
          return Be === "script" && nt === "setup" || Be === "style" && nt === "vars";
        }
        function Se(N) {
          let z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : N.value;
          return N.parent.isWhitespaceSensitive ? N.parent.isIndentationSensitive ? s(z) : s(De(x(z)), e) : u(t(i, B(z)));
        }
        function ye(N, z) {
          return ve(N, z) && N.name === "script";
        }
        l.exports = { htmlTrim: k, htmlTrimPreserveIndentation: x, hasHtmlWhitespace: P, getLeadingAndTrailingHtmlWhitespace: j, canHaveInterpolation: F, countChars: he, countParents: Ee, dedentString: De, forceBreakChildren: U, forceBreakContent: O, forceNextEmptyLine: R, getLastDescendant: ne, getNodeCssStyleDisplay: $e, getNodeCssStyleWhiteSpace: qe, hasPrettierIgnore: D, inferScriptParser: W, isVueCustomBlock: Q, isVueNonHtmlBlock: Ae, isVueScriptTag: ye, isVueSlotAttribute: be, isVueSfcBindingsAttribute: We, isVueSfcBlock: ve, isDanglingSpaceSensitiveNode: L, isIndentationSensitiveNode: T, isLeadingSpaceSensitiveNode: b, isPreLikeNode: le, isScriptLikeTag: o, isTextLikeNode: A, isTrailingSpaceSensitiveNode: S, isWhitespaceSensitiveNode: y, isUnknownNamespace: p, preferHardlineAsLeadingSpaces: V, preferHardlineAsTrailingSpaces: _, shouldPreserveContent: E, unescapeQuoteEntities: ue, getTextValueParts: Se };
      } }), Ao = Z({ "node_modules/angular-html-parser/lib/compiler/src/chars.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 }), r.$EOF = 0, r.$BSPACE = 8, r.$TAB = 9, r.$LF = 10, r.$VTAB = 11, r.$FF = 12, r.$CR = 13, r.$SPACE = 32, r.$BANG = 33, r.$DQ = 34, r.$HASH = 35, r.$$ = 36, r.$PERCENT = 37, r.$AMPERSAND = 38, r.$SQ = 39, r.$LPAREN = 40, r.$RPAREN = 41, r.$STAR = 42, r.$PLUS = 43, r.$COMMA = 44, r.$MINUS = 45, r.$PERIOD = 46, r.$SLASH = 47, r.$COLON = 58, r.$SEMICOLON = 59, r.$LT = 60, r.$EQ = 61, r.$GT = 62, r.$QUESTION = 63, r.$0 = 48, r.$7 = 55, r.$9 = 57, r.$A = 65, r.$E = 69, r.$F = 70, r.$X = 88, r.$Z = 90, r.$LBRACKET = 91, r.$BACKSLASH = 92, r.$RBRACKET = 93, r.$CARET = 94, r.$_ = 95, r.$a = 97, r.$b = 98, r.$e = 101, r.$f = 102, r.$n = 110, r.$r = 114, r.$t = 116, r.$u = 117, r.$v = 118, r.$x = 120, r.$z = 122, r.$LBRACE = 123, r.$BAR = 124, r.$RBRACE = 125, r.$NBSP = 160, r.$PIPE = 124, r.$TILDA = 126, r.$AT = 64, r.$BT = 96;
        function l(u) {
          return u >= r.$TAB && u <= r.$SPACE || u == r.$NBSP;
        }
        r.isWhitespace = l;
        function n(u) {
          return r.$0 <= u && u <= r.$9;
        }
        r.isDigit = n;
        function a(u) {
          return u >= r.$a && u <= r.$z || u >= r.$A && u <= r.$Z;
        }
        r.isAsciiLetter = a;
        function i(u) {
          return u >= r.$a && u <= r.$f || u >= r.$A && u <= r.$F || n(u);
        }
        r.isAsciiHexDigit = i;
        function e(u) {
          return u === r.$LF || u === r.$CR;
        }
        r.isNewLine = e;
        function t(u) {
          return r.$0 <= u && u <= r.$7;
        }
        r.isOctalDigit = t;
      } }), vo = Z({ "node_modules/angular-html-parser/lib/compiler/src/aot/static_symbol.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = class {
          constructor(a, i, e) {
            this.filePath = a, this.name = i, this.members = e;
          }
          assertNoMembers() {
            if (this.members.length)
              throw new Error("Illegal state: symbol without members expected, but got ".concat(JSON.stringify(this), "."));
          }
        };
        r.StaticSymbol = l;
        var n = class {
          constructor() {
            this.cache = /* @__PURE__ */ new Map();
          }
          get(a, i, e) {
            e = e || [];
            let t = e.length ? ".".concat(e.join(".")) : "", u = '"'.concat(a, '".').concat(i).concat(t), s = this.cache.get(u);
            return s || (s = new l(a, i, e), this.cache.set(u, s)), s;
          }
        };
        r.StaticSymbolCache = n;
      } }), xo = Z({ "node_modules/angular-html-parser/lib/compiler/src/util.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = /-+([a-z0-9])/g;
        function n(o) {
          return o.replace(l, function() {
            for (var F = arguments.length, y = new Array(F), T = 0; T < F; T++)
              y[T] = arguments[T];
            return y[1].toUpperCase();
          });
        }
        r.dashCaseToCamelCase = n;
        function a(o, F) {
          return e(o, ":", F);
        }
        r.splitAtColon = a;
        function i(o, F) {
          return e(o, ".", F);
        }
        r.splitAtPeriod = i;
        function e(o, F, y) {
          let T = o.indexOf(F);
          return T == -1 ? y : [o.slice(0, T).trim(), o.slice(T + 1).trim()];
        }
        function t(o, F, y) {
          return Array.isArray(o) ? F.visitArray(o, y) : v(o) ? F.visitStringMap(o, y) : o == null || typeof o == "string" || typeof o == "number" || typeof o == "boolean" ? F.visitPrimitive(o, y) : F.visitOther(o, y);
        }
        r.visitValue = t;
        function u(o) {
          return o != null;
        }
        r.isDefined = u;
        function s(o) {
          return o === void 0 ? null : o;
        }
        r.noUndefined = s;
        var c = class {
          visitArray(o, F) {
            return o.map((y) => t(y, this, F));
          }
          visitStringMap(o, F) {
            let y = {};
            return Object.keys(o).forEach((T) => {
              y[T] = t(o[T], this, F);
            }), y;
          }
          visitPrimitive(o, F) {
            return o;
          }
          visitOther(o, F) {
            return o;
          }
        };
        r.ValueTransformer = c, r.SyncAsync = { assertSync: (o) => {
          if (j(o))
            throw new Error("Illegal state: value cannot be a promise");
          return o;
        }, then: (o, F) => j(o) ? o.then(F) : F(o), all: (o) => o.some(j) ? Promise.all(o) : o };
        function C(o) {
          throw new Error("Internal Error: ".concat(o));
        }
        r.error = C;
        function f(o, F) {
          let y = Error(o);
          return y[h] = !0, F && (y[p] = F), y;
        }
        r.syntaxError = f;
        var h = "ngSyntaxError", p = "ngParseErrors";
        function d(o) {
          return o[h];
        }
        r.isSyntaxError = d;
        function g(o) {
          return o[p] || [];
        }
        r.getParseErrors = g;
        function w(o) {
          return o.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
        }
        r.escapeRegExp = w;
        var k = Object.getPrototypeOf({});
        function v(o) {
          return typeof o == "object" && o !== null && Object.getPrototypeOf(o) === k;
        }
        function x(o) {
          let F = "";
          for (let y = 0; y < o.length; y++) {
            let T = o.charCodeAt(y);
            if (T >= 55296 && T <= 56319 && o.length > y + 1) {
              let b = o.charCodeAt(y + 1);
              b >= 56320 && b <= 57343 && (y++, T = (T - 55296 << 10) + b - 56320 + 65536);
            }
            T <= 127 ? F += String.fromCharCode(T) : T <= 2047 ? F += String.fromCharCode(T >> 6 & 31 | 192, T & 63 | 128) : T <= 65535 ? F += String.fromCharCode(T >> 12 | 224, T >> 6 & 63 | 128, T & 63 | 128) : T <= 2097151 && (F += String.fromCharCode(T >> 18 & 7 | 240, T >> 12 & 63 | 128, T >> 6 & 63 | 128, T & 63 | 128));
          }
          return F;
        }
        r.utf8Encode = x;
        function B(o) {
          if (typeof o == "string")
            return o;
          if (o instanceof Array)
            return "[" + o.map(B).join(", ") + "]";
          if (o == null)
            return "" + o;
          if (o.overriddenName)
            return "".concat(o.overriddenName);
          if (o.name)
            return "".concat(o.name);
          if (!o.toString)
            return "object";
          let F = o.toString();
          if (F == null)
            return "" + F;
          let y = F.indexOf(`
`);
          return y === -1 ? F : F.substring(0, y);
        }
        r.stringify = B;
        function I(o) {
          return typeof o == "function" && o.hasOwnProperty("__forward_ref__") ? o() : o;
        }
        r.resolveForwardRef = I;
        function j(o) {
          return !!o && typeof o.then == "function";
        }
        r.isPromise = j;
        var P = class {
          constructor(o) {
            this.full = o;
            let F = o.split(".");
            this.major = F[0], this.minor = F[1], this.patch = F.slice(2).join(".");
          }
        };
        r.Version = P;
        var E = typeof window < "u" && window, D = typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self, m = typeof globalThis < "u" && globalThis, A = m || E || D;
        r.global = A;
      } }), bo = Z({ "node_modules/angular-html-parser/lib/compiler/src/compile_metadata.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = vo(), n = xo(), a = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/;
        function i(y) {
          return y.replace(/\W/g, "_");
        }
        r.sanitizeIdentifier = i;
        var e = 0;
        function t(y) {
          if (!y || !y.reference)
            return null;
          let T = y.reference;
          if (T instanceof l.StaticSymbol)
            return T.name;
          if (T.__anonymousType)
            return T.__anonymousType;
          let b = n.stringify(T);
          return b.indexOf("(") >= 0 ? (b = "anonymous_".concat(e++), T.__anonymousType = b) : b = i(b), b;
        }
        r.identifierName = t;
        function u(y) {
          let T = y.reference;
          return T instanceof l.StaticSymbol ? T.filePath : "./".concat(n.stringify(T));
        }
        r.identifierModuleUrl = u;
        function s(y, T) {
          return "View_".concat(t({ reference: y }), "_").concat(T);
        }
        r.viewClassName = s;
        function c(y) {
          return "RenderType_".concat(t({ reference: y }));
        }
        r.rendererTypeName = c;
        function C(y) {
          return "HostView_".concat(t({ reference: y }));
        }
        r.hostViewClassName = C;
        function f(y) {
          return "".concat(t({ reference: y }), "NgFactory");
        }
        r.componentFactoryName = f;
        var h;
        (function(y) {
          y[y.Pipe = 0] = "Pipe", y[y.Directive = 1] = "Directive", y[y.NgModule = 2] = "NgModule", y[y.Injectable = 3] = "Injectable";
        })(h = r.CompileSummaryKind || (r.CompileSummaryKind = {}));
        function p(y) {
          return y.value != null ? i(y.value) : t(y.identifier);
        }
        r.tokenName = p;
        function d(y) {
          return y.identifier != null ? y.identifier.reference : y.value;
        }
        r.tokenReference = d;
        var g = class {
          constructor() {
            let { moduleUrl: y, styles: T, styleUrls: b } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            this.moduleUrl = y || null, this.styles = j(T), this.styleUrls = j(b);
          }
        };
        r.CompileStylesheetMetadata = g;
        var w = class {
          constructor(y) {
            let { encapsulation: T, template: b, templateUrl: S, htmlAst: L, styles: R, styleUrls: O, externalStylesheets: U, animations: V, ngContentSelectors: _, interpolation: Y, isInline: H, preserveWhitespaces: $ } = y;
            if (this.encapsulation = T, this.template = b, this.templateUrl = S, this.htmlAst = L, this.styles = j(R), this.styleUrls = j(O), this.externalStylesheets = j(U), this.animations = V ? E(V) : [], this.ngContentSelectors = _ || [], Y && Y.length != 2)
              throw new Error("'interpolation' should have a start and an end symbol.");
            this.interpolation = Y, this.isInline = H, this.preserveWhitespaces = $;
          }
          toSummary() {
            return { ngContentSelectors: this.ngContentSelectors, encapsulation: this.encapsulation, styles: this.styles, animations: this.animations };
          }
        };
        r.CompileTemplateMetadata = w;
        var k = class {
          static create(y) {
            let { isHost: T, type: b, isComponent: S, selector: L, exportAs: R, changeDetection: O, inputs: U, outputs: V, host: _, providers: Y, viewProviders: H, queries: $, guards: K, viewQueries: ne, entryComponents: ee, template: pe, componentViewType: J, rendererType: W, componentFactory: se } = y, fe = {}, ae = {}, q = {};
            _ != null && Object.keys(_).forEach((le) => {
              let Ee = _[le], Te = le.match(a);
              Te === null ? q[le] = Ee : Te[1] != null ? ae[Te[1]] = Ee : Te[2] != null && (fe[Te[2]] = Ee);
            });
            let X = {};
            U != null && U.forEach((le) => {
              let Ee = n.splitAtColon(le, [le, le]);
              X[Ee[0]] = Ee[1];
            });
            let G = {};
            return V != null && V.forEach((le) => {
              let Ee = n.splitAtColon(le, [le, le]);
              G[Ee[0]] = Ee[1];
            }), new k({ isHost: T, type: b, isComponent: !!S, selector: L, exportAs: R, changeDetection: O, inputs: X, outputs: G, hostListeners: fe, hostProperties: ae, hostAttributes: q, providers: Y, viewProviders: H, queries: $, guards: K, viewQueries: ne, entryComponents: ee, template: pe, componentViewType: J, rendererType: W, componentFactory: se });
          }
          constructor(y) {
            let { isHost: T, type: b, isComponent: S, selector: L, exportAs: R, changeDetection: O, inputs: U, outputs: V, hostListeners: _, hostProperties: Y, hostAttributes: H, providers: $, viewProviders: K, queries: ne, guards: ee, viewQueries: pe, entryComponents: J, template: W, componentViewType: se, rendererType: fe, componentFactory: ae } = y;
            this.isHost = !!T, this.type = b, this.isComponent = S, this.selector = L, this.exportAs = R, this.changeDetection = O, this.inputs = U, this.outputs = V, this.hostListeners = _, this.hostProperties = Y, this.hostAttributes = H, this.providers = j($), this.viewProviders = j(K), this.queries = j(ne), this.guards = ee, this.viewQueries = j(pe), this.entryComponents = j(J), this.template = W, this.componentViewType = se, this.rendererType = fe, this.componentFactory = ae;
          }
          toSummary() {
            return { summaryKind: h.Directive, type: this.type, isComponent: this.isComponent, selector: this.selector, exportAs: this.exportAs, inputs: this.inputs, outputs: this.outputs, hostListeners: this.hostListeners, hostProperties: this.hostProperties, hostAttributes: this.hostAttributes, providers: this.providers, viewProviders: this.viewProviders, queries: this.queries, guards: this.guards, viewQueries: this.viewQueries, entryComponents: this.entryComponents, changeDetection: this.changeDetection, template: this.template && this.template.toSummary(), componentViewType: this.componentViewType, rendererType: this.rendererType, componentFactory: this.componentFactory };
          }
        };
        r.CompileDirectiveMetadata = k;
        var v = class {
          constructor(y) {
            let { type: T, name: b, pure: S } = y;
            this.type = T, this.name = b, this.pure = !!S;
          }
          toSummary() {
            return { summaryKind: h.Pipe, type: this.type, name: this.name, pure: this.pure };
          }
        };
        r.CompilePipeMetadata = v;
        var x = class {
        };
        r.CompileShallowModuleMetadata = x;
        var B = class {
          constructor(y) {
            let { type: T, providers: b, declaredDirectives: S, exportedDirectives: L, declaredPipes: R, exportedPipes: O, entryComponents: U, bootstrapComponents: V, importedModules: _, exportedModules: Y, schemas: H, transitiveModule: $, id: K } = y;
            this.type = T || null, this.declaredDirectives = j(S), this.exportedDirectives = j(L), this.declaredPipes = j(R), this.exportedPipes = j(O), this.providers = j(b), this.entryComponents = j(U), this.bootstrapComponents = j(V), this.importedModules = j(_), this.exportedModules = j(Y), this.schemas = j(H), this.id = K || null, this.transitiveModule = $ || null;
          }
          toSummary() {
            let y = this.transitiveModule;
            return { summaryKind: h.NgModule, type: this.type, entryComponents: y.entryComponents, providers: y.providers, modules: y.modules, exportedDirectives: y.exportedDirectives, exportedPipes: y.exportedPipes };
          }
        };
        r.CompileNgModuleMetadata = B;
        var I = class {
          constructor() {
            this.directivesSet = /* @__PURE__ */ new Set(), this.directives = [], this.exportedDirectivesSet = /* @__PURE__ */ new Set(), this.exportedDirectives = [], this.pipesSet = /* @__PURE__ */ new Set(), this.pipes = [], this.exportedPipesSet = /* @__PURE__ */ new Set(), this.exportedPipes = [], this.modulesSet = /* @__PURE__ */ new Set(), this.modules = [], this.entryComponentsSet = /* @__PURE__ */ new Set(), this.entryComponents = [], this.providers = [];
          }
          addProvider(y, T) {
            this.providers.push({ provider: y, module: T });
          }
          addDirective(y) {
            this.directivesSet.has(y.reference) || (this.directivesSet.add(y.reference), this.directives.push(y));
          }
          addExportedDirective(y) {
            this.exportedDirectivesSet.has(y.reference) || (this.exportedDirectivesSet.add(y.reference), this.exportedDirectives.push(y));
          }
          addPipe(y) {
            this.pipesSet.has(y.reference) || (this.pipesSet.add(y.reference), this.pipes.push(y));
          }
          addExportedPipe(y) {
            this.exportedPipesSet.has(y.reference) || (this.exportedPipesSet.add(y.reference), this.exportedPipes.push(y));
          }
          addModule(y) {
            this.modulesSet.has(y.reference) || (this.modulesSet.add(y.reference), this.modules.push(y));
          }
          addEntryComponent(y) {
            this.entryComponentsSet.has(y.componentType) || (this.entryComponentsSet.add(y.componentType), this.entryComponents.push(y));
          }
        };
        r.TransitiveCompileNgModuleMetadata = I;
        function j(y) {
          return y || [];
        }
        var P = class {
          constructor(y, T) {
            let { useClass: b, useValue: S, useExisting: L, useFactory: R, deps: O, multi: U } = T;
            this.token = y, this.useClass = b || null, this.useValue = S, this.useExisting = L, this.useFactory = R || null, this.dependencies = O || null, this.multi = !!U;
          }
        };
        r.ProviderMeta = P;
        function E(y) {
          return y.reduce((T, b) => {
            let S = Array.isArray(b) ? E(b) : b;
            return T.concat(S);
          }, []);
        }
        r.flatten = E;
        function D(y) {
          return y.replace(/(\w+:\/\/[\w:-]+)?(\/+)?/, "ng:///");
        }
        function m(y, T, b) {
          let S;
          return b.isInline ? T.type.reference instanceof l.StaticSymbol ? S = "".concat(T.type.reference.filePath, ".").concat(T.type.reference.name, ".html") : S = "".concat(t(y), "/").concat(t(T.type), ".html") : S = b.templateUrl, T.type.reference instanceof l.StaticSymbol ? S : D(S);
        }
        r.templateSourceUrl = m;
        function A(y, T) {
          let b = y.moduleUrl.split(/\/\\/g), S = b[b.length - 1];
          return D("css/".concat(T).concat(S, ".ngstyle.js"));
        }
        r.sharedStylesheetJitUrl = A;
        function o(y) {
          return D("".concat(t(y.type), "/module.ngfactory.js"));
        }
        r.ngModuleJitUrl = o;
        function F(y, T) {
          return D("".concat(t(y), "/").concat(t(T.type), ".ngfactory.js"));
        }
        r.templateJitUrl = F;
      } }), So = Z({ "node_modules/angular-html-parser/lib/compiler/src/parse_util.js"(r) {
        te(), Object.defineProperty(r, "__esModule", { value: !0 });
        var l = Ao(), n = bo(), a = class {
          constructor(C, f, h, p) {
            this.file = C, this.offset = f, this.line = h, this.col = p;
          }
          toString() {
            return this.offset != null ? "".concat(this.file.url, "@").concat(this.line, ":").concat(this.col) : this.file.url;
          }
          moveBy(C) {
            let f = this.file.content, h = f.length, p = this.offset, d = this.line, g = this.col;
            for (; p > 0 && C < 0; )
              if (p--, C++, f.charCodeAt(p) == l.$LF) {
                d--;
                let w = f.substr(0, p - 1).lastIndexOf(String.fromCharCode(l.$LF));
                g = w > 0 ? p - w : p;
              } else
                g--;
            for (; p < h && C > 0; ) {
              let w = f.charCodeAt(p);
              p++, C--, w == l.$LF ? (d++, g = 0) : g++;
            }
            return new a(this.file, p, d, g);
          }
          getContext(C, f) {
            let h = this.file.content, p = this.offset;
            if (p != null) {
              p > h.length - 1 && (p = h.length - 1);
              let d = p, g = 0, w = 0;
              for (; g < C && p > 0 && (p--, g++, !(h[p] == `
` && ++w == f)); )
                ;
              for (g = 0, w = 0; g < C && d < h.length - 1 && (d++, g++, !(h[d] == `
` && ++w == f)); )
                ;
              return { before: h.substring(p, this.offset), after: h.substring(this.offset, d + 1) };
            }
            return null;
          }
        };
        r.ParseLocation = a;
        var i = class {
          constructor(C, f) {
            this.content = C, this.url = f;
          }
        };
        r.ParseSourceFile = i;
        var e = class {
          constructor(C, f) {
            let h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
            this.start = C, this.end = f, this.details = h;
          }
          toString() {
            return this.start.file.content.substring(this.start.offset, this.end.offset);
          }
        };
        r.ParseSourceSpan = e, r.EMPTY_PARSE_LOCATION = new a(new i("", ""), 0, 0, 0), r.EMPTY_SOURCE_SPAN = new e(r.EMPTY_PARSE_LOCATION, r.EMPTY_PARSE_LOCATION);
        var t;
        (function(C) {
          C[C.WARNING = 0] = "WARNING", C[C.ERROR = 1] = "ERROR";
        })(t = r.ParseErrorLevel || (r.ParseErrorLevel = {}));
        var u = class {
          constructor(C, f) {
            let h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t.ERROR;
            this.span = C, this.msg = f, this.level = h;
          }
          contextualMessage() {
            let C = this.span.start.getContext(100, 3);
            return C ? "".concat(this.msg, ' ("').concat(C.before, "[").concat(t[this.level], " ->]").concat(C.after, '")') : this.msg;
          }
          toString() {
            let C = this.span.details ? ", ".concat(this.span.details) : "";
            return "".concat(this.contextualMessage(), ": ").concat(this.span.start).concat(C);
          }
        };
        r.ParseError = u;
        function s(C, f) {
          let h = n.identifierModuleUrl(f), p = h != null ? "in ".concat(C, " ").concat(n.identifierName(f), " in ").concat(h) : "in ".concat(C, " ").concat(n.identifierName(f)), d = new i("", p);
          return new e(new a(d, -1, -1, -1), new a(d, -1, -1, -1));
        }
        r.typeSourceSpan = s;
        function c(C, f, h) {
          let p = "in ".concat(C, " ").concat(f, " in ").concat(h), d = new i("", p);
          return new e(new a(d, -1, -1, -1), new a(d, -1, -1, -1));
        }
        r.r3JitTypeSourceSpan = c;
      } }), To = Z({ "src/language-html/print-preprocess.js"(r, l) {
        te();
        var { ParseSourceSpan: n } = So(), { htmlTrim: a, getLeadingAndTrailingHtmlWhitespace: i, hasHtmlWhitespace: e, canHaveInterpolation: t, getNodeCssStyleDisplay: u, isDanglingSpaceSensitiveNode: s, isIndentationSensitiveNode: c, isLeadingSpaceSensitiveNode: C, isTrailingSpaceSensitiveNode: f, isWhitespaceSensitiveNode: h, isVueScriptTag: p } = en(), d = [w, k, x, I, j, D, P, E, m, B, A];
        function g(o, F) {
          for (let y of d)
            y(o, F);
          return o;
        }
        function w(o) {
          o.walk((F) => {
            if (F.type === "element" && F.tagDefinition.ignoreFirstLf && F.children.length > 0 && F.children[0].type === "text" && F.children[0].value[0] === `
`) {
              let y = F.children[0];
              y.value.length === 1 ? F.removeChild(y) : y.value = y.value.slice(1);
            }
          });
        }
        function k(o) {
          let F = (y) => y.type === "element" && y.prev && y.prev.type === "ieConditionalStartComment" && y.prev.sourceSpan.end.offset === y.startSourceSpan.start.offset && y.firstChild && y.firstChild.type === "ieConditionalEndComment" && y.firstChild.sourceSpan.start.offset === y.startSourceSpan.end.offset;
          o.walk((y) => {
            if (y.children)
              for (let T = 0; T < y.children.length; T++) {
                let b = y.children[T];
                if (!F(b))
                  continue;
                let S = b.prev, L = b.firstChild;
                y.removeChild(S), T--;
                let R = new n(S.sourceSpan.start, L.sourceSpan.end), O = new n(R.start, b.sourceSpan.end);
                b.condition = S.condition, b.sourceSpan = O, b.startSourceSpan = R, b.removeChild(L);
              }
          });
        }
        function v(o, F, y) {
          o.walk((T) => {
            if (T.children)
              for (let b = 0; b < T.children.length; b++) {
                let S = T.children[b];
                if (S.type !== "text" && !F(S))
                  continue;
                S.type !== "text" && (S.type = "text", S.value = y(S));
                let L = S.prev;
                !L || L.type !== "text" || (L.value += S.value, L.sourceSpan = new n(L.sourceSpan.start, S.sourceSpan.end), T.removeChild(S), b--);
              }
          });
        }
        function x(o) {
          return v(o, (F) => F.type === "cdata", (F) => "<![CDATA[".concat(F.value, "]]>"));
        }
        function B(o) {
          let F = (y) => y.type === "element" && y.attrs.length === 0 && y.children.length === 1 && y.firstChild.type === "text" && !e(y.children[0].value) && !y.firstChild.hasLeadingSpaces && !y.firstChild.hasTrailingSpaces && y.isLeadingSpaceSensitive && !y.hasLeadingSpaces && y.isTrailingSpaceSensitive && !y.hasTrailingSpaces && y.prev && y.prev.type === "text" && y.next && y.next.type === "text";
          o.walk((y) => {
            if (y.children)
              for (let T = 0; T < y.children.length; T++) {
                let b = y.children[T];
                if (!F(b))
                  continue;
                let S = b.prev, L = b.next;
                S.value += "<".concat(b.rawName, ">") + b.firstChild.value + "</".concat(b.rawName, ">") + L.value, S.sourceSpan = new n(S.sourceSpan.start, L.sourceSpan.end), S.isTrailingSpaceSensitive = L.isTrailingSpaceSensitive, S.hasTrailingSpaces = L.hasTrailingSpaces, y.removeChild(b), T--, y.removeChild(L);
              }
          });
        }
        function I(o, F) {
          if (F.parser === "html")
            return;
          let y = /{{(.+?)}}/s;
          o.walk((T) => {
            if (t(T))
              for (let b of T.children) {
                if (b.type !== "text")
                  continue;
                let S = b.sourceSpan.start, L = null, R = b.value.split(y);
                for (let O = 0; O < R.length; O++, S = L) {
                  let U = R[O];
                  if (O % 2 === 0) {
                    L = S.moveBy(U.length), U.length > 0 && T.insertChildBefore(b, { type: "text", value: U, sourceSpan: new n(S, L) });
                    continue;
                  }
                  L = S.moveBy(U.length + 4), T.insertChildBefore(b, { type: "interpolation", sourceSpan: new n(S, L), children: U.length === 0 ? [] : [{ type: "text", value: U, sourceSpan: new n(S.moveBy(2), L.moveBy(-2)) }] });
                }
                T.removeChild(b);
              }
          });
        }
        function j(o) {
          o.walk((F) => {
            if (!F.children)
              return;
            if (F.children.length === 0 || F.children.length === 1 && F.children[0].type === "text" && a(F.children[0].value).length === 0) {
              F.hasDanglingSpaces = F.children.length > 0, F.children = [];
              return;
            }
            let y = h(F), T = c(F);
            if (!y)
              for (let b = 0; b < F.children.length; b++) {
                let S = F.children[b];
                if (S.type !== "text")
                  continue;
                let { leadingWhitespace: L, text: R, trailingWhitespace: O } = i(S.value), U = S.prev, V = S.next;
                R ? (S.value = R, S.sourceSpan = new n(S.sourceSpan.start.moveBy(L.length), S.sourceSpan.end.moveBy(-O.length)), L && (U && (U.hasTrailingSpaces = !0), S.hasLeadingSpaces = !0), O && (S.hasTrailingSpaces = !0, V && (V.hasLeadingSpaces = !0))) : (F.removeChild(S), b--, (L || O) && (U && (U.hasTrailingSpaces = !0), V && (V.hasLeadingSpaces = !0)));
              }
            F.isWhitespaceSensitive = y, F.isIndentationSensitive = T;
          });
        }
        function P(o) {
          o.walk((F) => {
            F.isSelfClosing = !F.children || F.type === "element" && (F.tagDefinition.isVoid || F.startSourceSpan === F.endSourceSpan);
          });
        }
        function E(o, F) {
          o.walk((y) => {
            y.type === "element" && (y.hasHtmComponentClosingTag = y.endSourceSpan && /^<\s*\/\s*\/\s*>$/.test(F.originalText.slice(y.endSourceSpan.start.offset, y.endSourceSpan.end.offset)));
          });
        }
        function D(o, F) {
          o.walk((y) => {
            y.cssDisplay = u(y, F);
          });
        }
        function m(o, F) {
          o.walk((y) => {
            let { children: T } = y;
            if (T) {
              if (T.length === 0) {
                y.isDanglingSpaceSensitive = s(y);
                return;
              }
              for (let b of T)
                b.isLeadingSpaceSensitive = C(b, F), b.isTrailingSpaceSensitive = f(b, F);
              for (let b = 0; b < T.length; b++) {
                let S = T[b];
                S.isLeadingSpaceSensitive = (b === 0 || S.prev.isTrailingSpaceSensitive) && S.isLeadingSpaceSensitive, S.isTrailingSpaceSensitive = (b === T.length - 1 || S.next.isLeadingSpaceSensitive) && S.isTrailingSpaceSensitive;
              }
            }
          });
        }
        function A(o, F) {
          if (F.parser === "vue") {
            let y = o.children.find((b) => p(b, F));
            if (!y)
              return;
            let { lang: T } = y.attrMap;
            (T === "ts" || T === "typescript") && (F.__should_parse_vue_template_with_ts = !0);
          }
        }
        l.exports = g;
      } }), Bo = Z({ "src/language-html/pragma.js"(r, l) {
        te();
        function n(i) {
          return /^\s*<!--\s*@(?:format|prettier)\s*-->/.test(i);
        }
        function a(i) {
          return `<!-- @format -->

` + i.replace(/^\s*\n/, "");
        }
        l.exports = { hasPragma: n, insertPragma: a };
      } }), hr = Z({ "src/language-html/loc.js"(r, l) {
        te();
        function n(i) {
          return i.sourceSpan.start.offset;
        }
        function a(i) {
          return i.sourceSpan.end.offset;
        }
        l.exports = { locStart: n, locEnd: a };
      } }), gn = Z({ "src/language-html/print/tag.js"(r, l) {
        te();
        var n = pn(), { isNonEmptyArray: a } = ot(), { builders: { indent: i, join: e, line: t, softline: u, hardline: s }, utils: { replaceTextEndOfLine: c } } = Ye(), { locStart: C, locEnd: f } = hr(), { isTextLikeNode: h, getLastDescendant: p, isPreLikeNode: d, hasPrettierIgnore: g, shouldPreserveContent: w, isVueSfcBlock: k } = en();
        function v(_, Y) {
          return [_.isSelfClosing ? "" : x(_, Y), B(_, Y)];
        }
        function x(_, Y) {
          return _.lastChild && o(_.lastChild) ? "" : [I(_, Y), P(_, Y)];
        }
        function B(_, Y) {
          return (_.next ? m(_.next) : A(_.parent)) ? "" : [E(_, Y), j(_, Y)];
        }
        function I(_, Y) {
          return A(_) ? E(_.lastChild, Y) : "";
        }
        function j(_, Y) {
          return o(_) ? P(_.parent, Y) : F(_) ? U(_.next) : "";
        }
        function P(_, Y) {
          if (n(!_.isSelfClosing), D(_, Y))
            return "";
          switch (_.type) {
            case "ieConditionalComment":
              return "<!";
            case "element":
              if (_.hasHtmComponentClosingTag)
                return "<//";
            default:
              return "</".concat(_.rawName);
          }
        }
        function E(_, Y) {
          if (D(_, Y))
            return "";
          switch (_.type) {
            case "ieConditionalComment":
            case "ieConditionalEndComment":
              return "[endif]-->";
            case "ieConditionalStartComment":
              return "]><!-->";
            case "interpolation":
              return "}}";
            case "element":
              if (_.isSelfClosing)
                return "/>";
            default:
              return ">";
          }
        }
        function D(_, Y) {
          return !_.isSelfClosing && !_.endSourceSpan && (g(_) || w(_.parent, Y));
        }
        function m(_) {
          return _.prev && _.prev.type !== "docType" && !h(_.prev) && _.isLeadingSpaceSensitive && !_.hasLeadingSpaces;
        }
        function A(_) {
          return _.lastChild && _.lastChild.isTrailingSpaceSensitive && !_.lastChild.hasTrailingSpaces && !h(p(_.lastChild)) && !d(_);
        }
        function o(_) {
          return !_.next && !_.hasTrailingSpaces && _.isTrailingSpaceSensitive && h(p(_));
        }
        function F(_) {
          return _.next && !h(_.next) && h(_) && _.isTrailingSpaceSensitive && !_.hasTrailingSpaces;
        }
        function y(_) {
          let Y = _.trim().match(/^prettier-ignore-attribute(?:\s+(.+))?$/s);
          return Y ? Y[1] ? Y[1].split(/\s+/) : !0 : !1;
        }
        function T(_) {
          return !_.prev && _.isLeadingSpaceSensitive && !_.hasLeadingSpaces;
        }
        function b(_, Y, H) {
          let $ = _.getValue();
          if (!a($.attrs))
            return $.isSelfClosing ? " " : "";
          let K = $.prev && $.prev.type === "comment" && y($.prev.value), ne = typeof K == "boolean" ? () => K : Array.isArray(K) ? (se) => K.includes(se.rawName) : () => !1, ee = _.map((se) => {
            let fe = se.getValue();
            return ne(fe) ? c(Y.originalText.slice(C(fe), f(fe))) : H();
          }, "attrs"), pe = $.type === "element" && $.fullName === "script" && $.attrs.length === 1 && $.attrs[0].fullName === "src" && $.children.length === 0, J = Y.singleAttributePerLine && $.attrs.length > 1 && !k($, Y) ? s : t, W = [i([pe ? " " : t, e(J, ee)])];
          return $.firstChild && T($.firstChild) || $.isSelfClosing && A($.parent) || pe ? W.push($.isSelfClosing ? " " : "") : W.push(Y.bracketSameLine ? $.isSelfClosing ? " " : "" : $.isSelfClosing ? t : u), W;
        }
        function S(_) {
          return _.firstChild && T(_.firstChild) ? "" : V(_);
        }
        function L(_, Y, H) {
          let $ = _.getValue();
          return [R($, Y), b(_, Y, H), $.isSelfClosing ? "" : S($)];
        }
        function R(_, Y) {
          return _.prev && F(_.prev) ? "" : [O(_, Y), U(_)];
        }
        function O(_, Y) {
          return T(_) ? V(_.parent) : m(_) ? E(_.prev, Y) : "";
        }
        function U(_) {
          switch (_.type) {
            case "ieConditionalComment":
            case "ieConditionalStartComment":
              return "<!--[if ".concat(_.condition);
            case "ieConditionalEndComment":
              return "<!--<!";
            case "interpolation":
              return "{{";
            case "docType":
              return "<!DOCTYPE";
            case "element":
              if (_.condition)
                return "<!--[if ".concat(_.condition, "]><!--><").concat(_.rawName);
            default:
              return "<".concat(_.rawName);
          }
        }
        function V(_) {
          switch (n(!_.isSelfClosing), _.type) {
            case "ieConditionalComment":
              return "]>";
            case "element":
              if (_.condition)
                return "><!--<![endif]-->";
            default:
              return ">";
          }
        }
        l.exports = { printClosingTag: v, printClosingTagStart: x, printClosingTagStartMarker: P, printClosingTagEndMarker: E, printClosingTagSuffix: j, printClosingTagEnd: B, needsToBorrowLastChildClosingTagEndMarker: A, needsToBorrowParentClosingTagStartMarker: o, needsToBorrowPrevClosingTagEndMarker: m, printOpeningTag: L, printOpeningTagStart: R, printOpeningTagPrefix: O, printOpeningTagStartMarker: U, printOpeningTagEndMarker: V, needsToBorrowNextOpeningTagStartMarker: F, needsToBorrowParentOpeningTagEndMarker: T };
      } }), wo = Z({ "node_modules/parse-srcset/src/parse-srcset.js"(r, l) {
        te(), function(n, a) {
          typeof l == "object" && l.exports ? l.exports = a() : n.parseSrcset = a();
        }(r, function() {
          return function(n, a) {
            var i = a && a.logger || console;
            function e(P) {
              return P === " " || P === "	" || P === `
` || P === "\f" || P === "\r";
            }
            function t(P) {
              var E, D = P.exec(n.substring(x));
              if (D)
                return E = D[0], x += E.length, E;
            }
            for (var u = n.length, s = /^[ \t\n\r\u000c]+/, c = /^[, \t\n\r\u000c]+/, C = /^[^ \t\n\r\u000c]+/, f = /[,]+$/, h = /^\d+$/, p = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, d, g, w, k, v, x = 0, B = []; ; ) {
              if (t(c), x >= u)
                return B;
              d = t(C), g = [], d.slice(-1) === "," ? (d = d.replace(f, ""), j()) : I();
            }
            function I() {
              for (t(s), w = "", k = "in descriptor"; ; ) {
                if (v = n.charAt(x), k === "in descriptor")
                  if (e(v))
                    w && (g.push(w), w = "", k = "after descriptor");
                  else if (v === ",") {
                    x += 1, w && g.push(w), j();
                    return;
                  } else if (v === "(")
                    w = w + v, k = "in parens";
                  else if (v === "") {
                    w && g.push(w), j();
                    return;
                  } else
                    w = w + v;
                else if (k === "in parens")
                  if (v === ")")
                    w = w + v, k = "in descriptor";
                  else if (v === "") {
                    g.push(w), j();
                    return;
                  } else
                    w = w + v;
                else if (k === "after descriptor" && !e(v))
                  if (v === "") {
                    j();
                    return;
                  } else
                    k = "in descriptor", x -= 1;
                x += 1;
              }
            }
            function j() {
              var P = !1, E, D, m, A, o = {}, F, y, T, b, S;
              for (A = 0; A < g.length; A++)
                F = g[A], y = F[F.length - 1], T = F.substring(0, F.length - 1), b = parseInt(T, 10), S = parseFloat(T), h.test(T) && y === "w" ? ((E || D) && (P = !0), b === 0 ? P = !0 : E = b) : p.test(T) && y === "x" ? ((E || D || m) && (P = !0), S < 0 ? P = !0 : D = S) : h.test(T) && y === "h" ? ((m || D) && (P = !0), b === 0 ? P = !0 : m = b) : P = !0;
              P ? i && i.error && i.error("Invalid srcset descriptor found in '" + n + "' at '" + F + "'.") : (o.url = d, E && (o.w = E), D && (o.d = D), m && (o.h = m), B.push(o));
            }
          };
        });
      } }), No = Z({ "src/language-html/syntax-attribute.js"(r, l) {
        te();
        var n = wo(), { builders: { ifBreak: a, join: i, line: e } } = Ye();
        function t(s) {
          let c = n(s, { logger: { error(I) {
            throw new Error(I);
          } } }), C = c.some((I) => {
            let { w: j } = I;
            return j;
          }), f = c.some((I) => {
            let { h: j } = I;
            return j;
          }), h = c.some((I) => {
            let { d: j } = I;
            return j;
          });
          if (C + f + h > 1)
            throw new Error("Mixed descriptor in srcset is not supported");
          let p = C ? "w" : f ? "h" : "d", d = C ? "w" : f ? "h" : "x", g = (I) => Math.max(...I), w = c.map((I) => I.url), k = g(w.map((I) => I.length)), v = c.map((I) => I[p]).map((I) => I ? I.toString() : ""), x = v.map((I) => {
            let j = I.indexOf(".");
            return j === -1 ? I.length : j;
          }), B = g(x);
          return i([",", e], w.map((I, j) => {
            let P = [I], E = v[j];
            if (E) {
              let D = k - I.length + 1, m = B - x[j], A = " ".repeat(D + m);
              P.push(a(A, " "), E + d);
            }
            return P;
          }));
        }
        function u(s) {
          return s.trim().split(/\s+/).join(" ");
        }
        l.exports = { printImgSrcset: t, printClassNames: u };
      } }), ko = Z({ "src/language-html/syntax-vue.js"(r, l) {
        te();
        var { builders: { group: n } } = Ye();
        function a(u, s) {
          let { left: c, operator: C, right: f } = i(u);
          return [n(s("function _(".concat(c, ") {}"), { parser: "babel", __isVueForBindingLeft: !0 })), " ", C, " ", s(f, { parser: "__js_expression" }, { stripTrailingHardline: !0 })];
        }
        function i(u) {
          let s = /(.*?)\s+(in|of)\s+(.*)/s, c = /,([^,\]}]*)(?:,([^,\]}]*))?$/, C = /^\(|\)$/g, f = u.match(s);
          if (!f)
            return;
          let h = {};
          if (h.for = f[3].trim(), !h.for)
            return;
          let p = f[1].trim().replace(C, ""), d = p.match(c);
          d ? (h.alias = p.replace(c, ""), h.iterator1 = d[1].trim(), d[2] && (h.iterator2 = d[2].trim())) : h.alias = p;
          let g = [h.alias, h.iterator1, h.iterator2];
          if (!g.some((w, k) => !w && (k === 0 || g.slice(k + 1).some(Boolean))))
            return { left: g.filter(Boolean).join(","), operator: f[2], right: h.for };
        }
        function e(u, s) {
          return s("function _(".concat(u, ") {}"), { parser: "babel", __isVueBindings: !0 });
        }
        function t(u) {
          let s = /^(?:[\w$]+|\([^)]*\))\s*=>|^function\s*\(/, c = /^[$A-Z_a-z][\w$]*(?:\.[$A-Z_a-z][\w$]*|\['[^']*']|\["[^"]*"]|\[\d+]|\[[$A-Z_a-z][\w$]*])*$/, C = u.trim();
          return s.test(C) || c.test(C);
        }
        l.exports = { isVueEventBindingExpression: t, printVueFor: a, printVueBindings: e };
      } }), $u = Z({ "src/language-html/get-node-content.js"(r, l) {
        te();
        var { needsToBorrowParentClosingTagStartMarker: n, printClosingTagStartMarker: a, needsToBorrowLastChildClosingTagEndMarker: i, printClosingTagEndMarker: e, needsToBorrowParentOpeningTagEndMarker: t, printOpeningTagEndMarker: u } = gn();
        function s(c, C) {
          let f = c.startSourceSpan.end.offset;
          c.firstChild && t(c.firstChild) && (f -= u(c).length);
          let h = c.endSourceSpan.start.offset;
          return c.lastChild && n(c.lastChild) ? h += a(c, C).length : i(c) && (h -= e(c.lastChild, C).length), C.originalText.slice(f, h);
        }
        l.exports = s;
      } }), jo = Z({ "src/language-html/embed.js"(r, l) {
        te();
        var { builders: { breakParent: n, group: a, hardline: i, indent: e, line: t, fill: u, softline: s }, utils: { mapDoc: c, replaceTextEndOfLine: C } } = Ye(), f = gr(), { printClosingTag: h, printClosingTagSuffix: p, needsToBorrowPrevClosingTagEndMarker: d, printOpeningTagPrefix: g, printOpeningTag: w } = gn(), { printImgSrcset: k, printClassNames: v } = No(), { printVueFor: x, printVueBindings: B, isVueEventBindingExpression: I } = ko(), { isScriptLikeTag: j, isVueNonHtmlBlock: P, inferScriptParser: E, htmlTrimPreserveIndentation: D, dedentString: m, unescapeQuoteEntities: A, isVueSlotAttribute: o, isVueSfcBindingsAttribute: F, getTextValueParts: y } = en(), T = $u();
        function b(L, R, O) {
          let U = (ee) => new RegExp(ee.join("|")).test(L.fullName), V = () => A(L.value), _ = !1, Y = (ee, pe) => {
            let J = ee.type === "NGRoot" ? ee.node.type === "NGMicrosyntax" && ee.node.body.length === 1 && ee.node.body[0].type === "NGMicrosyntaxExpression" ? ee.node.body[0].expression : ee.node : ee.type === "JsExpressionRoot" ? ee.node : ee;
            J && (J.type === "ObjectExpression" || J.type === "ArrayExpression" || pe.parser === "__vue_expression" && (J.type === "TemplateLiteral" || J.type === "StringLiteral")) && (_ = !0);
          }, H = (ee) => a(ee), $ = function(ee) {
            let pe = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
            return a([e([s, ee]), pe ? s : ""]);
          }, K = (ee) => _ ? H(ee) : $(ee), ne = (ee, pe) => R(ee, Object.assign({ __onHtmlBindingRoot: Y, __embeddedInHtml: !0 }, pe));
          if (L.fullName === "srcset" && (L.parent.fullName === "img" || L.parent.fullName === "source"))
            return $(k(V()));
          if (L.fullName === "class" && !O.parentParser) {
            let ee = V();
            if (!ee.includes("{{"))
              return v(ee);
          }
          if (L.fullName === "style" && !O.parentParser) {
            let ee = V();
            if (!ee.includes("{{"))
              return $(ne(ee, { parser: "css", __isHTMLStyleAttribute: !0 }));
          }
          if (O.parser === "vue") {
            if (L.fullName === "v-for")
              return x(V(), ne);
            if (o(L) || F(L, O))
              return B(V(), ne);
            let ee = ["^@", "^v-on:"], pe = ["^:", "^v-bind:"], J = ["^v-"];
            if (U(ee)) {
              let W = V(), se = I(W) ? "__js_expression" : O.__should_parse_vue_template_with_ts ? "__vue_ts_event_binding" : "__vue_event_binding";
              return K(ne(W, { parser: se }));
            }
            if (U(pe))
              return K(ne(V(), { parser: "__vue_expression" }));
            if (U(J))
              return K(ne(V(), { parser: "__js_expression" }));
          }
          if (O.parser === "angular") {
            let ee = (q, X) => ne(q, Object.assign(Object.assign({}, X), {}, { trailingComma: "none" })), pe = ["^\\*"], J = ["^\\(.+\\)$", "^on-"], W = ["^\\[.+\\]$", "^bind(on)?-", "^ng-(if|show|hide|class|style)$"], se = ["^i18n(-.+)?$"];
            if (U(J))
              return K(ee(V(), { parser: "__ng_action" }));
            if (U(W))
              return K(ee(V(), { parser: "__ng_binding" }));
            if (U(se)) {
              let q = V().trim();
              return $(u(y(L, q)), !q.includes("@@"));
            }
            if (U(pe))
              return K(ee(V(), { parser: "__ng_directive" }));
            let fe = /{{(.+?)}}/s, ae = V();
            if (fe.test(ae)) {
              let q = [];
              for (let [X, G] of ae.split(fe).entries())
                if (X % 2 === 0)
                  q.push(C(G));
                else
                  try {
                    q.push(a(["{{", e([t, ee(G, { parser: "__ng_interpolation", __isInHtmlInterpolation: !0 })]), t, "}}"]));
                  } catch {
                    q.push("{{", C(G), "}}");
                  }
              return a(q);
            }
          }
          return null;
        }
        function S(L, R, O, U) {
          let V = L.getValue();
          switch (V.type) {
            case "element": {
              if (j(V) || V.type === "interpolation")
                return;
              if (!V.isSelfClosing && P(V, U)) {
                let _ = E(V, U);
                if (!_)
                  return;
                let Y = T(V, U), H = /^\s*$/.test(Y), $ = "";
                return H || ($ = O(D(Y), { parser: _, __embeddedInHtml: !0 }, { stripTrailingHardline: !0 }), H = $ === ""), [g(V, U), a(w(L, U, R)), H ? "" : i, $, H ? "" : i, h(V, U), p(V, U)];
              }
              break;
            }
            case "text": {
              if (j(V.parent)) {
                let _ = E(V.parent, U);
                if (_) {
                  let Y = _ === "markdown" ? m(V.value.replace(/^[^\S\n]*\n/, "")) : V.value, H = { parser: _, __embeddedInHtml: !0 };
                  if (U.parser === "html" && _ === "babel") {
                    let $ = "script", { attrMap: K } = V.parent;
                    K && (K.type === "module" || K.type === "text/babel" && K["data-type"] === "module") && ($ = "module"), H.__babelSourceType = $;
                  }
                  return [n, g(V, U), O(Y, H, { stripTrailingHardline: !0 }), p(V, U)];
                }
              } else if (V.parent.type === "interpolation") {
                let _ = { __isInHtmlInterpolation: !0, __embeddedInHtml: !0 };
                return U.parser === "angular" ? (_.parser = "__ng_interpolation", _.trailingComma = "none") : U.parser === "vue" ? _.parser = U.__should_parse_vue_template_with_ts ? "__vue_ts_expression" : "__vue_expression" : _.parser = "__js_expression", [e([t, O(V.value, _, { stripTrailingHardline: !0 })]), V.parent.next && d(V.parent.next) ? " " : t];
              }
              break;
            }
            case "attribute": {
              if (!V.value)
                break;
              if (/^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(U.originalText.slice(V.valueSpan.start.offset, V.valueSpan.end.offset)))
                return [V.rawName, "=", V.value];
              if (U.parser === "lwc" && /^{.*}$/s.test(U.originalText.slice(V.valueSpan.start.offset, V.valueSpan.end.offset)))
                return [V.rawName, "=", V.value];
              let _ = b(V, (Y, H) => O(Y, Object.assign({ __isInHtmlAttribute: !0, __embeddedInHtml: !0 }, H), { stripTrailingHardline: !0 }), U);
              if (_)
                return [V.rawName, '="', a(c(_, (Y) => typeof Y == "string" ? Y.replace(/"/g, "&quot;") : Y)), '"'];
              break;
            }
            case "front-matter":
              return f(V, O);
          }
        }
        l.exports = S;
      } }), Ju = Z({ "src/language-html/print/children.js"(r, l) {
        te();
        var { builders: { breakParent: n, group: a, ifBreak: i, line: e, softline: t, hardline: u }, utils: { replaceTextEndOfLine: s } } = Ye(), { locStart: c, locEnd: C } = hr(), { forceBreakChildren: f, forceNextEmptyLine: h, isTextLikeNode: p, hasPrettierIgnore: d, preferHardlineAsLeadingSpaces: g } = en(), { printOpeningTagPrefix: w, needsToBorrowNextOpeningTagStartMarker: k, printOpeningTagStartMarker: v, needsToBorrowPrevClosingTagEndMarker: x, printClosingTagEndMarker: B, printClosingTagSuffix: I, needsToBorrowParentClosingTagStartMarker: j } = gn();
        function P(m, A, o) {
          let F = m.getValue();
          return d(F) ? [w(F, A), ...s(A.originalText.slice(c(F) + (F.prev && k(F.prev) ? v(F).length : 0), C(F) - (F.next && x(F.next) ? B(F, A).length : 0))), I(F, A)] : o();
        }
        function E(m, A) {
          return p(m) && p(A) ? m.isTrailingSpaceSensitive ? m.hasTrailingSpaces ? g(A) ? u : e : "" : g(A) ? u : t : k(m) && (d(A) || A.firstChild || A.isSelfClosing || A.type === "element" && A.attrs.length > 0) || m.type === "element" && m.isSelfClosing && x(A) ? "" : !A.isLeadingSpaceSensitive || g(A) || x(A) && m.lastChild && j(m.lastChild) && m.lastChild.lastChild && j(m.lastChild.lastChild) ? u : A.hasLeadingSpaces ? e : t;
        }
        function D(m, A, o) {
          let F = m.getValue();
          if (f(F))
            return [n, ...m.map((T) => {
              let b = T.getValue(), S = b.prev ? E(b.prev, b) : "";
              return [S ? [S, h(b.prev) ? u : ""] : "", P(T, A, o)];
            }, "children")];
          let y = F.children.map(() => Symbol(""));
          return m.map((T, b) => {
            let S = T.getValue();
            if (p(S)) {
              if (S.prev && p(S.prev)) {
                let Y = E(S.prev, S);
                if (Y)
                  return h(S.prev) ? [u, u, P(T, A, o)] : [Y, P(T, A, o)];
              }
              return P(T, A, o);
            }
            let L = [], R = [], O = [], U = [], V = S.prev ? E(S.prev, S) : "", _ = S.next ? E(S, S.next) : "";
            return V && (h(S.prev) ? L.push(u, u) : V === u ? L.push(u) : p(S.prev) ? R.push(V) : R.push(i("", t, { groupId: y[b - 1] }))), _ && (h(S) ? p(S.next) && U.push(u, u) : _ === u ? p(S.next) && U.push(u) : O.push(_)), [...L, a([...R, a([P(T, A, o), ...O], { id: y[b] })]), ...U];
          }, "children");
        }
        l.exports = { printChildren: D };
      } }), Io = Z({ "src/language-html/print/element.js"(r, l) {
        te();
        var { builders: { breakParent: n, dedentToRoot: a, group: i, ifBreak: e, indentIfBreak: t, indent: u, line: s, softline: c }, utils: { replaceTextEndOfLine: C } } = Ye(), f = $u(), { shouldPreserveContent: h, isScriptLikeTag: p, isVueCustomBlock: d, countParents: g, forceBreakContent: w } = en(), { printOpeningTagPrefix: k, printOpeningTag: v, printClosingTagSuffix: x, printClosingTag: B, needsToBorrowPrevClosingTagEndMarker: I, needsToBorrowLastChildClosingTagEndMarker: j } = gn(), { printChildren: P } = Ju();
        function E(D, m, A) {
          let o = D.getValue();
          if (h(o, m))
            return [k(o, m), i(v(D, m, A)), ...C(f(o, m)), ...B(o, m), x(o, m)];
          let F = o.children.length === 1 && o.firstChild.type === "interpolation" && o.firstChild.isLeadingSpaceSensitive && !o.firstChild.hasLeadingSpaces && o.lastChild.isTrailingSpaceSensitive && !o.lastChild.hasTrailingSpaces, y = Symbol("element-attr-group-id"), T = (R) => i([i(v(D, m, A), { id: y }), R, B(o, m)]), b = (R) => F ? t(R, { groupId: y }) : (p(o) || d(o, m)) && o.parent.type === "root" && m.parser === "vue" && !m.vueIndentScriptAndStyle ? R : u(R), S = () => F ? e(c, "", { groupId: y }) : o.firstChild.hasLeadingSpaces && o.firstChild.isLeadingSpaceSensitive ? s : o.firstChild.type === "text" && o.isWhitespaceSensitive && o.isIndentationSensitive ? a(c) : c, L = () => (o.next ? I(o.next) : j(o.parent)) ? o.lastChild.hasTrailingSpaces && o.lastChild.isTrailingSpaceSensitive ? " " : "" : F ? e(c, "", { groupId: y }) : o.lastChild.hasTrailingSpaces && o.lastChild.isTrailingSpaceSensitive ? s : (o.lastChild.type === "comment" || o.lastChild.type === "text" && o.isWhitespaceSensitive && o.isIndentationSensitive) && new RegExp("\\n[\\t ]{".concat(m.tabWidth * g(D, (R) => R.parent && R.parent.type !== "root"), "}$")).test(o.lastChild.value) ? "" : c;
          return o.children.length === 0 ? T(o.hasDanglingSpaces && o.isDanglingSpaceSensitive ? s : "") : T([w(o) ? n : "", b([S(), P(D, m, A)]), L()]);
        }
        l.exports = { printElement: E };
      } }), Po = Z({ "src/language-html/printer-html.js"(r, l) {
        te();
        var { builders: { fill: n, group: a, hardline: i, literalline: e }, utils: { cleanDoc: t, getDocParts: u, isConcat: s, replaceTextEndOfLine: c } } = Ye(), C = Eo(), { countChars: f, unescapeQuoteEntities: h, getTextValueParts: p } = en(), d = To(), { insertPragma: g } = Bo(), { locStart: w, locEnd: k } = hr(), v = jo(), { printClosingTagSuffix: x, printClosingTagEnd: B, printOpeningTagPrefix: I, printOpeningTagStart: j } = gn(), { printElement: P } = Io(), { printChildren: E } = Ju();
        function D(m, A, o) {
          let F = m.getValue();
          switch (F.type) {
            case "front-matter":
              return c(F.raw);
            case "root":
              return A.__onHtmlRoot && A.__onHtmlRoot(F), [a(E(m, A, o)), i];
            case "element":
            case "ieConditionalComment":
              return P(m, A, o);
            case "ieConditionalStartComment":
            case "ieConditionalEndComment":
              return [j(F), B(F)];
            case "interpolation":
              return [j(F, A), ...m.map(o, "children"), B(F, A)];
            case "text": {
              if (F.parent.type === "interpolation") {
                let T = /\n[^\S\n]*$/, b = T.test(F.value), S = b ? F.value.replace(T, "") : F.value;
                return [...c(S), b ? i : ""];
              }
              let y = t([I(F, A), ...p(F), x(F, A)]);
              return s(y) || y.type === "fill" ? n(u(y)) : y;
            }
            case "docType":
              return [a([j(F, A), " ", F.value.replace(/^html\b/i, "html").replace(/\s+/g, " ")]), B(F, A)];
            case "comment":
              return [I(F, A), ...c(A.originalText.slice(w(F), k(F)), e), x(F, A)];
            case "attribute": {
              if (F.value === null)
                return F.rawName;
              let y = h(F.value), T = f(y, "'"), b = f(y, '"'), S = T < b ? "'" : '"';
              return [F.rawName, "=", S, ...c(S === '"' ? y.replace(/"/g, "&quot;") : y.replace(/'/g, "&apos;")), S];
            }
            default:
              throw new Error("Unexpected node type ".concat(F.type));
          }
        }
        l.exports = { preprocess: d, print: D, insertPragma: g, massageAstNode: C, embed: v };
      } }), Lo = Z({ "src/language-html/options.js"(r, l) {
        te();
        var n = Kt(), a = "HTML";
        l.exports = { bracketSameLine: n.bracketSameLine, htmlWhitespaceSensitivity: { since: "1.15.0", category: a, type: "choice", default: "css", description: "How to handle whitespaces in HTML.", choices: [{ value: "css", description: "Respect the default value of CSS display property." }, { value: "strict", description: "Whitespaces are considered sensitive." }, { value: "ignore", description: "Whitespaces are considered insensitive." }] }, singleAttributePerLine: n.singleAttributePerLine, vueIndentScriptAndStyle: { since: "1.19.0", category: a, type: "boolean", default: !1, description: "Indent script and style tags in Vue files." } };
      } }), Oo = Z({ "src/language-html/parsers.js"() {
        te();
      } }), Er = Z({ "node_modules/linguist-languages/data/HTML.json"(r, l) {
        l.exports = { name: "HTML", type: "markup", tmScope: "text.html.basic", aceMode: "html", codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", color: "#e34c26", aliases: ["xhtml"], extensions: [".html", ".hta", ".htm", ".html.hl", ".inc", ".xht", ".xhtml"], languageId: 146 };
      } }), Mo = Z({ "node_modules/linguist-languages/data/Vue.json"(r, l) {
        l.exports = { name: "Vue", type: "markup", color: "#41b883", extensions: [".vue"], tmScope: "text.html.vue", aceMode: "html", languageId: 391 };
      } }), _o = Z({ "src/language-html/index.js"(r, l) {
        te();
        var n = qt(), a = Po(), i = Lo(), e = Oo(), t = [n(Er(), () => ({ name: "Angular", since: "1.15.0", parsers: ["angular"], vscodeLanguageIds: ["html"], extensions: [".component.html"], filenames: [] })), n(Er(), (s) => ({ since: "1.15.0", parsers: ["html"], vscodeLanguageIds: ["html"], extensions: [...s.extensions, ".mjml"] })), n(Er(), () => ({ name: "Lightning Web Components", since: "1.17.0", parsers: ["lwc"], vscodeLanguageIds: ["html"], extensions: [], filenames: [] })), n(Mo(), () => ({ since: "1.10.0", parsers: ["vue"], vscodeLanguageIds: ["vue"] }))], u = { html: a };
        l.exports = { languages: t, printers: u, options: i, parsers: e };
      } }), Ro = Z({ "src/language-yaml/pragma.js"(r, l) {
        te();
        function n(e) {
          return /^\s*@(?:prettier|format)\s*$/.test(e);
        }
        function a(e) {
          return /^\s*#[^\S\n]*@(?:prettier|format)\s*?(?:\n|$)/.test(e);
        }
        function i(e) {
          return `# @format

`.concat(e);
        }
        l.exports = { isPragma: n, hasPragma: a, insertPragma: i };
      } }), Vo = Z({ "src/language-yaml/loc.js"(r, l) {
        te();
        function n(i) {
          return i.position.start.offset;
        }
        function a(i) {
          return i.position.end.offset;
        }
        l.exports = { locStart: n, locEnd: a };
      } }), $o = Z({ "src/language-yaml/embed.js"(r, l) {
        te();
        function n(a, i, e, t) {
          if (a.getValue().type === "root" && t.filepath && /(?:[/\\]|^)\.(?:prettier|stylelint)rc$/.test(t.filepath))
            return e(t.originalText, Object.assign(Object.assign({}, t), {}, { parser: "json" }));
        }
        l.exports = n;
      } }), tn = Z({ "src/language-yaml/utils.js"(r, l) {
        te();
        var { getLast: n, isNonEmptyArray: a } = ot();
        function i(E, D) {
          let m = 0, A = E.stack.length - 1;
          for (let o = 0; o < A; o++) {
            let F = E.stack[o];
            e(F) && D(F) && m++;
          }
          return m;
        }
        function e(E, D) {
          return E && typeof E.type == "string" && (!D || D.includes(E.type));
        }
        function t(E, D, m) {
          return D("children" in E ? Object.assign(Object.assign({}, E), {}, { children: E.children.map((A) => t(A, D, E)) }) : E, m);
        }
        function u(E, D, m) {
          Object.defineProperty(E, D, { get: m, enumerable: !1 });
        }
        function s(E, D) {
          let m = 0, A = D.length;
          for (let o = E.position.end.offset - 1; o < A; o++) {
            let F = D[o];
            if (F === `
` && m++, m === 1 && /\S/.test(F))
              return !1;
            if (m === 2)
              return !0;
          }
          return !1;
        }
        function c(E) {
          switch (E.getValue().type) {
            case "tag":
            case "anchor":
            case "comment":
              return !1;
          }
          let D = E.stack.length;
          for (let m = 1; m < D; m++) {
            let A = E.stack[m], o = E.stack[m - 1];
            if (Array.isArray(o) && typeof A == "number" && A !== o.length - 1)
              return !1;
          }
          return !0;
        }
        function C(E) {
          return a(E.children) ? C(n(E.children)) : E;
        }
        function f(E) {
          return E.value.trim() === "prettier-ignore";
        }
        function h(E) {
          let D = E.getValue();
          if (D.type === "documentBody") {
            let m = E.getParentNode();
            return x(m.head) && f(n(m.head.endComments));
          }
          return g(D) && f(n(D.leadingComments));
        }
        function p(E) {
          return !a(E.children) && !d(E);
        }
        function d(E) {
          return g(E) || w(E) || k(E) || v(E) || x(E);
        }
        function g(E) {
          return a(E == null ? void 0 : E.leadingComments);
        }
        function w(E) {
          return a(E == null ? void 0 : E.middleComments);
        }
        function k(E) {
          return E == null ? void 0 : E.indicatorComment;
        }
        function v(E) {
          return E == null ? void 0 : E.trailingComment;
        }
        function x(E) {
          return a(E == null ? void 0 : E.endComments);
        }
        function B(E) {
          let D = [], m;
          for (let A of E.split(/( +)/))
            A !== " " ? m === " " ? D.push(A) : D.push((D.pop() || "") + A) : m === void 0 && D.unshift(""), m = A;
          return m === " " && D.push((D.pop() || "") + " "), D[0] === "" && (D.shift(), D.unshift(" " + (D.shift() || ""))), D;
        }
        function I(E, D, m) {
          let A = D.split(`
`).map((o, F, y) => F === 0 && F === y.length - 1 ? o : F !== 0 && F !== y.length - 1 ? o.trim() : F === 0 ? o.trimEnd() : o.trimStart());
          return m.proseWrap === "preserve" ? A.map((o) => o.length === 0 ? [] : [o]) : A.map((o) => o.length === 0 ? [] : B(o)).reduce((o, F, y) => y !== 0 && A[y - 1].length > 0 && F.length > 0 && !(E === "quoteDouble" && n(n(o)).endsWith("\\")) ? [...o.slice(0, -1), [...n(o), ...F]] : [...o, F], []).map((o) => m.proseWrap === "never" ? [o.join(" ")] : o);
        }
        function j(E, D) {
          let { parentIndent: m, isLastDescendant: A, options: o } = D, F = E.position.start.line === E.position.end.line ? "" : o.originalText.slice(E.position.start.offset, E.position.end.offset).match(/^[^\n]*\n(.*)$/s)[1], y;
          if (E.indent === null) {
            let S = F.match(/^(?<leadingSpace> *)[^\n\r ]/m);
            y = S ? S.groups.leadingSpace.length : Number.POSITIVE_INFINITY;
          } else
            y = E.indent - 1 + m;
          let T = F.split(`
`).map((S) => S.slice(y));
          if (o.proseWrap === "preserve" || E.type === "blockLiteral")
            return b(T.map((S) => S.length === 0 ? [] : [S]));
          return b(T.map((S) => S.length === 0 ? [] : B(S)).reduce((S, L, R) => R !== 0 && T[R - 1].length > 0 && L.length > 0 && !/^\s/.test(L[0]) && !/^\s|\s$/.test(n(S)) ? [...S.slice(0, -1), [...n(S), ...L]] : [...S, L], []).map((S) => S.reduce((L, R) => L.length > 0 && /\s$/.test(n(L)) ? [...L.slice(0, -1), n(L) + " " + R] : [...L, R], [])).map((S) => o.proseWrap === "never" ? [S.join(" ")] : S));
          function b(S) {
            if (E.chomping === "keep")
              return n(S).length === 0 ? S.slice(0, -1) : S;
            let L = 0;
            for (let R = S.length - 1; R >= 0 && S[R].length === 0; R--)
              L++;
            return L === 0 ? S : L >= 2 && !A ? S.slice(0, -(L - 1)) : S.slice(0, -L);
          }
        }
        function P(E) {
          if (!E)
            return !0;
          switch (E.type) {
            case "plain":
            case "quoteDouble":
            case "quoteSingle":
            case "alias":
            case "flowMapping":
            case "flowSequence":
              return !0;
            default:
              return !1;
          }
        }
        l.exports = { getLast: n, getAncestorCount: i, isNode: e, isEmptyNode: p, isInlineNode: P, mapNode: t, defineShortcut: u, isNextLineEmpty: s, isLastDescendantNode: c, getBlockValueLineContents: j, getFlowScalarLineContents: I, getLastDescendantNode: C, hasPrettierIgnore: h, hasLeadingComments: g, hasMiddleComments: w, hasIndicatorComment: k, hasTrailingComment: v, hasEndComments: x };
      } }), Jo = Z({ "src/language-yaml/print-preprocess.js"(r, l) {
        te();
        var { defineShortcut: n, mapNode: a } = tn();
        function i(t) {
          return a(t, e);
        }
        function e(t) {
          switch (t.type) {
            case "document":
              n(t, "head", () => t.children[0]), n(t, "body", () => t.children[1]);
              break;
            case "documentBody":
            case "sequenceItem":
            case "flowSequenceItem":
            case "mappingKey":
            case "mappingValue":
              n(t, "content", () => t.children[0]);
              break;
            case "mappingItem":
            case "flowMappingItem":
              n(t, "key", () => t.children[0]), n(t, "value", () => t.children[1]);
              break;
          }
          return t;
        }
        l.exports = i;
      } }), In = Z({ "src/language-yaml/print/misc.js"(r, l) {
        te();
        var { builders: { softline: n, align: a } } = Ye(), { hasEndComments: i, isNextLineEmpty: e, isNode: t } = tn(), u = /* @__PURE__ */ new WeakMap();
        function s(f, h) {
          let p = f.getValue(), d = f.stack[0], g;
          return u.has(d) ? g = u.get(d) : (g = /* @__PURE__ */ new Set(), u.set(d, g)), !g.has(p.position.end.line) && (g.add(p.position.end.line), e(p, h) && !c(f.getParentNode())) ? n : "";
        }
        function c(f) {
          return i(f) && !t(f, ["documentHead", "documentBody", "flowMapping", "flowSequence"]);
        }
        function C(f, h) {
          return a(" ".repeat(f), h);
        }
        l.exports = { alignWithSpaces: C, shouldPrintEndComments: c, printNextEmptyLine: s };
      } }), Uo = Z({ "src/language-yaml/print/flow-mapping-sequence.js"(r, l) {
        te();
        var { builders: { ifBreak: n, line: a, softline: i, hardline: e, join: t } } = Ye(), { isEmptyNode: u, getLast: s, hasEndComments: c } = tn(), { printNextEmptyLine: C, alignWithSpaces: f } = In();
        function h(d, g, w) {
          let k = d.getValue(), v = k.type === "flowMapping", x = v ? "{" : "[", B = v ? "}" : "]", I = i;
          v && k.children.length > 0 && w.bracketSpacing && (I = a);
          let j = s(k.children), P = j && j.type === "flowMappingItem" && u(j.key) && u(j.value);
          return [x, f(w.tabWidth, [I, p(d, g, w), w.trailingComma === "none" ? "" : n(","), c(k) ? [e, t(e, d.map(g, "endComments"))] : ""]), P ? "" : I, B];
        }
        function p(d, g, w) {
          let k = d.getValue();
          return d.map((v, x) => [g(), x === k.children.length - 1 ? "" : [",", a, k.children[x].position.start.line !== k.children[x + 1].position.start.line ? C(v, w.originalText) : ""]], "children");
        }
        l.exports = { printFlowMapping: h, printFlowSequence: h };
      } }), Ho = Z({ "src/language-yaml/print/mapping-item.js"(r, l) {
        te();
        var { builders: { conditionalGroup: n, group: a, hardline: i, ifBreak: e, join: t, line: u } } = Ye(), { hasLeadingComments: s, hasMiddleComments: c, hasTrailingComment: C, hasEndComments: f, isNode: h, isEmptyNode: p, isInlineNode: d } = tn(), { alignWithSpaces: g } = In();
        function w(B, I, j, P, E) {
          let { key: D, value: m } = B, A = p(D), o = p(m);
          if (A && o)
            return ": ";
          let F = P("key"), y = v(B) ? " " : "";
          if (o)
            return B.type === "flowMappingItem" && I.type === "flowMapping" ? F : B.type === "mappingItem" && k(D.content, E) && !C(D.content) && (!I.tag || I.tag.value !== "tag:yaml.org,2002:set") ? [F, y, ":"] : ["? ", g(2, F)];
          let T = P("value");
          if (A)
            return [": ", g(2, T)];
          if (s(m) || !d(D.content))
            return ["? ", g(2, F), i, t("", j.map(P, "value", "leadingComments").map((U) => [U, i])), ": ", g(2, T)];
          if (x(D.content) && !s(D.content) && !c(D.content) && !C(D.content) && !f(D) && !s(m.content) && !c(m.content) && !f(m) && k(m.content, E))
            return [F, y, ": ", T];
          let b = Symbol("mappingKey"), S = a([e("? "), a(g(2, F), { id: b })]), L = [i, ": ", g(2, T)], R = [y, ":"];
          s(m.content) || f(m) && m.content && !h(m.content, ["mapping", "sequence"]) || I.type === "mapping" && C(D.content) && d(m.content) || h(m.content, ["mapping", "sequence"]) && m.content.tag === null && m.content.anchor === null ? R.push(i) : m.content && R.push(u), R.push(T);
          let O = g(E.tabWidth, R);
          return k(D.content, E) && !s(D.content) && !c(D.content) && !f(D) ? n([[F, O]]) : n([[S, e(L, O, { groupId: b })]]);
        }
        function k(B, I) {
          if (!B)
            return !0;
          switch (B.type) {
            case "plain":
            case "quoteSingle":
            case "quoteDouble":
              break;
            case "alias":
              return !0;
            default:
              return !1;
          }
          if (I.proseWrap === "preserve")
            return B.position.start.line === B.position.end.line;
          if (/\\$/m.test(I.originalText.slice(B.position.start.offset, B.position.end.offset)))
            return !1;
          switch (I.proseWrap) {
            case "never":
              return !B.value.includes(`
`);
            case "always":
              return !/[\n ]/.test(B.value);
            default:
              return !1;
          }
        }
        function v(B) {
          return B.key.content && B.key.content.type === "alias";
        }
        function x(B) {
          if (!B)
            return !0;
          switch (B.type) {
            case "plain":
            case "quoteDouble":
            case "quoteSingle":
              return B.position.start.line === B.position.end.line;
            case "alias":
              return !0;
            default:
              return !1;
          }
        }
        l.exports = w;
      } }), qo = Z({ "src/language-yaml/print/block.js"(r, l) {
        te();
        var { builders: { dedent: n, dedentToRoot: a, fill: i, hardline: e, join: t, line: u, literalline: s, markAsRoot: c }, utils: { getDocParts: C } } = Ye(), { getAncestorCount: f, getBlockValueLineContents: h, hasIndicatorComment: p, isLastDescendantNode: d, isNode: g } = tn(), { alignWithSpaces: w } = In();
        function k(v, x, B) {
          let I = v.getValue(), j = f(v, (A) => g(A, ["sequence", "mapping"])), P = d(v), E = [I.type === "blockFolded" ? ">" : "|"];
          I.indent !== null && E.push(I.indent.toString()), I.chomping !== "clip" && E.push(I.chomping === "keep" ? "+" : "-"), p(I) && E.push(" ", x("indicatorComment"));
          let D = h(I, { parentIndent: j, isLastDescendant: P, options: B }), m = [];
          for (let [A, o] of D.entries())
            A === 0 && m.push(e), m.push(i(C(t(u, o)))), A !== D.length - 1 ? m.push(o.length === 0 ? e : c(s)) : I.chomping === "keep" && P && m.push(a(o.length === 0 ? e : s));
          return I.indent === null ? E.push(n(w(B.tabWidth, m))) : E.push(a(w(I.indent - 1 + j, m))), E;
        }
        l.exports = k;
      } }), Wo = Z({ "src/language-yaml/printer-yaml.js"(r, l) {
        te();
        var { builders: { breakParent: n, fill: a, group: i, hardline: e, join: t, line: u, lineSuffix: s, literalline: c }, utils: { getDocParts: C, replaceTextEndOfLine: f } } = Ye(), { isPreviousLineEmpty: h } = ot(), { insertPragma: p, isPragma: d } = Ro(), { locStart: g } = Vo(), w = $o(), { getFlowScalarLineContents: k, getLastDescendantNode: v, hasLeadingComments: x, hasMiddleComments: B, hasTrailingComment: I, hasEndComments: j, hasPrettierIgnore: P, isLastDescendantNode: E, isNode: D, isInlineNode: m } = tn(), A = Jo(), { alignWithSpaces: o, printNextEmptyLine: F, shouldPrintEndComments: y } = In(), { printFlowMapping: T, printFlowSequence: b } = Uo(), S = Ho(), L = qo();
        function R($, K, ne) {
          let ee = $.getValue(), pe = [];
          ee.type !== "mappingValue" && x(ee) && pe.push([t(e, $.map(ne, "leadingComments")), e]);
          let { tag: J, anchor: W } = ee;
          J && pe.push(ne("tag")), J && W && pe.push(" "), W && pe.push(ne("anchor"));
          let se = "";
          D(ee, ["mapping", "sequence", "comment", "directive", "mappingItem", "sequenceItem"]) && !E($) && (se = F($, K.originalText)), (J || W) && (D(ee, ["sequence", "mapping"]) && !B(ee) ? pe.push(e) : pe.push(" ")), B(ee) && pe.push([ee.middleComments.length === 1 ? "" : e, t(e, $.map(ne, "middleComments")), e]);
          let fe = $.getParentNode();
          return P($) ? pe.push(f(K.originalText.slice(ee.position.start.offset, ee.position.end.offset).trimEnd(), c)) : pe.push(i(O(ee, fe, $, K, ne))), I(ee) && !D(ee, ["document", "documentHead"]) && pe.push(s([ee.type === "mappingValue" && !ee.content ? "" : " ", fe.type === "mappingKey" && $.getParentNode(2).type === "mapping" && m(ee) ? "" : n, ne("trailingComment")])), y(ee) && pe.push(o(ee.type === "sequenceItem" ? 2 : 0, [e, t(e, $.map((ae) => [h(K.originalText, ae.getValue(), g) ? e : "", ne()], "endComments"))])), pe.push(se), pe;
        }
        function O($, K, ne, ee, pe) {
          switch ($.type) {
            case "root": {
              let { children: J } = $, W = [];
              ne.each((fe, ae) => {
                let q = J[ae], X = J[ae + 1];
                ae !== 0 && W.push(e), W.push(pe()), V(q, X) ? (W.push(e, "..."), I(q) && W.push(" ", pe("trailingComment"))) : X && !I(X.head) && W.push(e, "---");
              }, "children");
              let se = v($);
              return (!D(se, ["blockLiteral", "blockFolded"]) || se.chomping !== "keep") && W.push(e), W;
            }
            case "document": {
              let J = K.children[ne.getName() + 1], W = [];
              return _($, J, K, ee) === "head" && (($.head.children.length > 0 || $.head.endComments.length > 0) && W.push(pe("head")), I($.head) ? W.push(["---", " ", pe(["head", "trailingComment"])]) : W.push("---")), U($) && W.push(pe("body")), t(e, W);
            }
            case "documentHead":
              return t(e, [...ne.map(pe, "children"), ...ne.map(pe, "endComments")]);
            case "documentBody": {
              let { children: J, endComments: W } = $, se = "";
              if (J.length > 0 && W.length > 0) {
                let fe = v($);
                D(fe, ["blockFolded", "blockLiteral"]) ? fe.chomping !== "keep" && (se = [e, e]) : se = e;
              }
              return [t(e, ne.map(pe, "children")), se, t(e, ne.map(pe, "endComments"))];
            }
            case "directive":
              return ["%", t(" ", [$.name, ...$.parameters])];
            case "comment":
              return ["#", $.value];
            case "alias":
              return ["*", $.value];
            case "tag":
              return ee.originalText.slice($.position.start.offset, $.position.end.offset);
            case "anchor":
              return ["&", $.value];
            case "plain":
              return Y($.type, ee.originalText.slice($.position.start.offset, $.position.end.offset), ee);
            case "quoteDouble":
            case "quoteSingle": {
              let J = "'", W = '"', se = ee.originalText.slice($.position.start.offset + 1, $.position.end.offset - 1);
              if ($.type === "quoteSingle" && se.includes("\\") || $.type === "quoteDouble" && /\\[^"]/.test(se)) {
                let ae = $.type === "quoteDouble" ? W : J;
                return [ae, Y($.type, se, ee), ae];
              }
              if (se.includes(W))
                return [J, Y($.type, $.type === "quoteDouble" ? se.replace(/\\"/g, W).replace(/'/g, J.repeat(2)) : se, ee), J];
              if (se.includes(J))
                return [W, Y($.type, $.type === "quoteSingle" ? se.replace(/''/g, J) : se, ee), W];
              let fe = ee.singleQuote ? J : W;
              return [fe, Y($.type, se, ee), fe];
            }
            case "blockFolded":
            case "blockLiteral":
              return L(ne, pe, ee);
            case "mapping":
            case "sequence":
              return t(e, ne.map(pe, "children"));
            case "sequenceItem":
              return ["- ", o(2, $.content ? pe("content") : "")];
            case "mappingKey":
            case "mappingValue":
              return $.content ? pe("content") : "";
            case "mappingItem":
            case "flowMappingItem":
              return S($, K, ne, pe, ee);
            case "flowMapping":
              return T(ne, pe, ee);
            case "flowSequence":
              return b(ne, pe, ee);
            case "flowSequenceItem":
              return pe("content");
            default:
              throw new Error("Unexpected node type ".concat($.type));
          }
        }
        function U($) {
          return $.body.children.length > 0 || j($.body);
        }
        function V($, K) {
          return I($) || K && (K.head.children.length > 0 || j(K.head));
        }
        function _($, K, ne, ee) {
          return ne.children[0] === $ && /---(?:\s|$)/.test(ee.originalText.slice(g($), g($) + 4)) || $.head.children.length > 0 || j($.head) || I($.head) ? "head" : V($, K) ? !1 : K ? "root" : !1;
        }
        function Y($, K, ne) {
          let ee = k($, K, ne);
          return t(e, ee.map((pe) => a(C(t(u, pe)))));
        }
        function H($, K) {
          if (D(K))
            switch (delete K.position, K.type) {
              case "comment":
                if (d(K.value))
                  return null;
                break;
              case "quoteDouble":
              case "quoteSingle":
                K.type = "quote";
                break;
            }
        }
        l.exports = { preprocess: A, embed: w, print: R, massageAstNode: H, insertPragma: p };
      } }), Xo = Z({ "src/language-yaml/options.js"(r, l) {
        te();
        var n = Kt();
        l.exports = { bracketSpacing: n.bracketSpacing, singleQuote: n.singleQuote, proseWrap: n.proseWrap };
      } }), Go = Z({ "src/language-yaml/parsers.js"() {
        te();
      } }), zo = Z({ "node_modules/linguist-languages/data/YAML.json"(r, l) {
        l.exports = { name: "YAML", type: "data", color: "#cb171e", tmScope: "source.yaml", aliases: ["yml"], extensions: [".yml", ".mir", ".reek", ".rviz", ".sublime-syntax", ".syntax", ".yaml", ".yaml-tmlanguage", ".yaml.sed", ".yml.mysql"], filenames: [".clang-format", ".clang-tidy", ".gemrc", "CITATION.cff", "glide.lock", "yarn.lock"], aceMode: "yaml", codemirrorMode: "yaml", codemirrorMimeType: "text/x-yaml", languageId: 407 };
      } }), Qo = Z({ "src/language-yaml/index.js"(r, l) {
        te();
        var n = qt(), a = Wo(), i = Xo(), e = Go(), t = [n(zo(), (u) => ({ since: "1.14.0", parsers: ["yaml"], vscodeLanguageIds: ["yaml", "ansible", "home-assistant"], filenames: [...u.filenames.filter((s) => s !== "yarn.lock"), ".prettierrc", ".stylelintrc"] }))];
        l.exports = { languages: t, printers: { yaml: a }, options: i, parsers: e };
      } }), Yo = Z({ "src/languages.js"(r, l) {
        te(), l.exports = [Ns(), Gs(), no(), lo(), ho(), _o(), Qo()];
      } });
      te();
      var { version: Zo } = on(), nn = Ga(), { getSupportInfo: Ko } = Kn(), el = za(), tl = Yo(), nl = Ye();
      function Wt(r) {
        let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
        return function() {
          for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
            a[i] = arguments[i];
          let e = a[l] || {}, t = e.plugins || [];
          return a[l] = Object.assign(Object.assign({}, e), {}, { plugins: [...tl, ...Array.isArray(t) ? t : Object.values(t)] }), r(...a);
        };
      }
      var Cr = Wt(nn.formatWithCursor);
      de.exports = { formatWithCursor: Cr, format(r, l) {
        return Cr(r, l).formatted;
      }, check(r, l) {
        let { formatted: n } = Cr(r, l);
        return n === r;
      }, doc: nl, getSupportInfo: Wt(Ko, 0), version: Zo, util: el, __debug: { parse: Wt(nn.parse), formatAST: Wt(nn.formatAST), formatDoc: Wt(nn.formatDoc), printToDoc: Wt(nn.printToDoc), printDocToString: Wt(nn.printDocToString) } };
    });
    return ki();
  });
})(Fr);
const ol = /* @__PURE__ */ al(Fr.exports), cl = /* @__PURE__ */ sl({
  __proto__: null,
  default: ol
}, [Fr.exports]);
export {
  cl as s
};
