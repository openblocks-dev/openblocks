import { g as C1, c as E } from "./b1893f4d.js";
import Vo from "react";
function S1(r, e) {
  for (var t = 0; t < e.length; t++) {
    const n = e[t];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const a in n)
        if (a !== "default" && !(a in r)) {
          const i = Object.getOwnPropertyDescriptor(n, a);
          i && Object.defineProperty(r, a, i.get ? i : {
            enumerable: !0,
            get: () => n[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }));
}
var $n = {}, kn = {}, nn = {}, an = {}, Ft = {}, Ee = {}, _t = {}, z = {};
function m1(r, e) {
  var t = Object.setPrototypeOf;
  t ? t(r, e) : r.__proto__ = e;
}
function jo(r, e) {
  e === void 0 && (e = r.constructor);
  var t = Error.captureStackTrace;
  t && t(r, e);
}
var I1 = function() {
  var r = function(t, n) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(a, i) {
      a.__proto__ = i;
    } || function(a, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (a[o] = i[o]);
    }, r(t, n);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), O1 = function(r) {
  I1(e, r);
  function e(t, n) {
    var a = this.constructor, i = r.call(this, t, n) || this;
    return Object.defineProperty(i, "name", {
      value: a.name,
      enumerable: !1,
      configurable: !0
    }), m1(i, a.prototype), jo(i), i;
  }
  return e;
}(Error), R1 = function(r, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, a = e.length, i; n < a; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return r.concat(i || Array.prototype.slice.call(e));
};
function D1(r, e) {
  e === void 0 && (e = Error);
  function t() {
    for (var n = [], a = 0; a < arguments.length; a++)
      n[a] = arguments[a];
    if (!(this instanceof t))
      return new (t.bind.apply(t, R1([void 0], n, !1)))();
    e.apply(this, n), Object.defineProperty(this, "name", {
      value: r.name || e.name,
      enumerable: !1,
      configurable: !0
    }), r.apply(this, n), jo(this, t);
  }
  return Object.defineProperties(t, {
    prototype: {
      value: Object.create(e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      })
    }
  });
}
const T1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CustomError: O1,
  customErrorFactory: D1
}, Symbol.toStringTag, { value: "Module" })), P1 = /* @__PURE__ */ C1(T1);
var b1 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(z, "__esModule", { value: !0 });
var N1 = P1, M1 = function(r) {
  b1(e, r);
  function e(t) {
    t === void 0 && (t = void 0);
    var n = r.call(this, t) || this;
    return n.message = t, n;
  }
  return e;
}(N1.CustomError);
z.default = M1;
var B1 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(_t, "__esModule", { value: !0 });
var F1 = z, L1 = function(r) {
  B1(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(F1.default);
_t.default = L1;
var Er = {}, N = {}, $1 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(N, "__esModule", { value: !0 });
var k1 = z, U1 = function(r) {
  $1(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(k1.default);
N.default = U1;
Object.defineProperty(Er, "__esModule", { value: !0 });
var G1 = N, H1 = function() {
  function r(e) {
    if (this.binarizer = e, e === null)
      throw new G1.default("Binarizer must be non-null.");
  }
  return r.prototype.getWidth = function() {
    return this.binarizer.getWidth();
  }, r.prototype.getHeight = function() {
    return this.binarizer.getHeight();
  }, r.prototype.getBlackRow = function(e, t) {
    return this.binarizer.getBlackRow(e, t);
  }, r.prototype.getBlackMatrix = function() {
    return (this.matrix === null || this.matrix === void 0) && (this.matrix = this.binarizer.getBlackMatrix()), this.matrix;
  }, r.prototype.isCropSupported = function() {
    return this.binarizer.getLuminanceSource().isCropSupported();
  }, r.prototype.crop = function(e, t, n, a) {
    var i = this.binarizer.getLuminanceSource().crop(e, t, n, a);
    return new r(this.binarizer.createBinarizer(i));
  }, r.prototype.isRotateSupported = function() {
    return this.binarizer.getLuminanceSource().isRotateSupported();
  }, r.prototype.rotateCounterClockwise = function() {
    var e = this.binarizer.getLuminanceSource().rotateCounterClockwise();
    return new r(this.binarizer.createBinarizer(e));
  }, r.prototype.rotateCounterClockwise45 = function() {
    var e = this.binarizer.getLuminanceSource().rotateCounterClockwise45();
    return new r(this.binarizer.createBinarizer(e));
  }, r.prototype.toString = function() {
    try {
      return this.getBlackMatrix().toString();
    } catch {
      return "";
    }
  }, r;
}();
Er.default = H1;
var ue = {}, V1 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(ue, "__esModule", { value: !0 });
var j1 = z, W1 = function(r) {
  V1(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e.getChecksumInstance = function() {
    return new e();
  }, e;
}(j1.default);
ue.default = W1;
var Ar = {}, wr = {}, Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
var X1 = function() {
  function r(e) {
    this.source = e;
  }
  return r.prototype.getLuminanceSource = function() {
    return this.source;
  }, r.prototype.getWidth = function() {
    return this.source.getWidth();
  }, r.prototype.getHeight = function() {
    return this.source.getHeight();
  }, r;
}();
Cr.default = X1;
var Ae = {}, j = {};
Object.defineProperty(j, "__esModule", { value: !0 });
var z1 = function() {
  function r() {
  }
  return r.arraycopy = function(e, t, n, a, i) {
    for (; i--; )
      n[a++] = e[t++];
  }, r.currentTimeMillis = function() {
    return Date.now();
  }, r;
}();
j.default = z1;
var ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
var Y1 = function() {
  function r() {
  }
  return r.numberOfTrailingZeros = function(e) {
    var t;
    if (e === 0)
      return 32;
    var n = 31;
    return t = e << 16, t !== 0 && (n -= 16, e = t), t = e << 8, t !== 0 && (n -= 8, e = t), t = e << 4, t !== 0 && (n -= 4, e = t), t = e << 2, t !== 0 && (n -= 2, e = t), n - (e << 1 >>> 31);
  }, r.numberOfLeadingZeros = function(e) {
    if (e === 0)
      return 32;
    var t = 1;
    return e >>> 16 === 0 && (t += 16, e <<= 16), e >>> 24 === 0 && (t += 8, e <<= 8), e >>> 28 === 0 && (t += 4, e <<= 4), e >>> 30 === 0 && (t += 2, e <<= 2), t -= e >>> 31, t;
  }, r.toHexString = function(e) {
    return e.toString(16);
  }, r.toBinaryString = function(e) {
    return String(parseInt(String(e), 2));
  }, r.bitCount = function(e) {
    return e = e - (e >>> 1 & 1431655765), e = (e & 858993459) + (e >>> 2 & 858993459), e = e + (e >>> 4) & 252645135, e = e + (e >>> 8), e = e + (e >>> 16), e & 63;
  }, r.truncDivision = function(e, t) {
    return Math.trunc(e / t);
  }, r.parseInt = function(e, t) {
    return t === void 0 && (t = void 0), parseInt(e, t);
  }, r.MIN_VALUE_32_BITS = -2147483648, r.MAX_VALUE = Number.MAX_SAFE_INTEGER, r;
}();
ce.default = Y1;
var we = {}, Un = {}, gt = {}, Z1 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(gt, "__esModule", { value: !0 });
var K1 = z, q1 = function(r) {
  Z1(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(K1.default);
gt.default = q1;
var Q1 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Un, "__esModule", { value: !0 });
var J1 = gt, eu = function(r) {
  Q1(e, r);
  function e(t, n) {
    t === void 0 && (t = void 0), n === void 0 && (n = void 0);
    var a = r.call(this, n) || this;
    return a.index = t, a.message = n, a;
  }
  return e;
}(J1.default);
Un.default = eu;
var tu = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(we, "__esModule", { value: !0 });
var ru = j, nu = N, oi = Un, au = function() {
  function r() {
  }
  return r.fill = function(e, t) {
    for (var n = 0, a = e.length; n < a; n++)
      e[n] = t;
  }, r.fillWithin = function(e, t, n, a) {
    r.rangeCheck(e.length, t, n);
    for (var i = t; i < n; i++)
      e[i] = a;
  }, r.rangeCheck = function(e, t, n) {
    if (t > n)
      throw new nu.default("fromIndex(" + t + ") > toIndex(" + n + ")");
    if (t < 0)
      throw new oi.default(t);
    if (n > e)
      throw new oi.default(n);
  }, r.asList = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return e;
  }, r.create = function(e, t, n) {
    var a = Array.from({ length: e });
    return a.map(function(i) {
      return Array.from({ length: t }).fill(n);
    });
  }, r.createInt32Array = function(e, t, n) {
    var a = Array.from({ length: e });
    return a.map(function(i) {
      return Int32Array.from({ length: t }).fill(n);
    });
  }, r.equals = function(e, t) {
    if (!e || !t || !e.length || !t.length || e.length !== t.length)
      return !1;
    for (var n = 0, a = e.length; n < a; n++)
      if (e[n] !== t[n])
        return !1;
    return !0;
  }, r.hashCode = function(e) {
    var t, n;
    if (e === null)
      return 0;
    var a = 1;
    try {
      for (var i = tu(e), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        a = 31 * a + u;
      }
    } catch (f) {
      t = { error: f };
    } finally {
      try {
        o && !o.done && (n = i.return) && n.call(i);
      } finally {
        if (t)
          throw t.error;
      }
    }
    return a;
  }, r.fillUint8Array = function(e, t) {
    for (var n = 0; n !== e.length; n++)
      e[n] = t;
  }, r.copyOf = function(e, t) {
    return e.slice(0, t);
  }, r.copyOfUint8Array = function(e, t) {
    if (e.length <= t) {
      var n = new Uint8Array(t);
      return n.set(e), n;
    }
    return e.slice(0, t);
  }, r.copyOfRange = function(e, t, n) {
    var a = n - t, i = new Int32Array(a);
    return ru.default.arraycopy(e, t, i, 0, a), i;
  }, r.binarySearch = function(e, t, n) {
    n === void 0 && (n = r.numberComparator);
    for (var a = 0, i = e.length - 1; a <= i; ) {
      var o = i + a >> 1, u = n(t, e[o]);
      if (u > 0)
        a = o + 1;
      else if (u < 0)
        i = o - 1;
      else
        return o;
    }
    return -a - 1;
  }, r.numberComparator = function(e, t) {
    return e - t;
  }, r;
}();
we.default = au;
Object.defineProperty(Ae, "__esModule", { value: !0 });
var iu = j, ui = ce, fi = we, Lt = N, ou = function() {
  function r(e, t) {
    e === void 0 ? (this.size = 0, this.bits = new Int32Array(1)) : (this.size = e, t == null ? this.bits = r.makeArray(e) : this.bits = t);
  }
  return r.prototype.getSize = function() {
    return this.size;
  }, r.prototype.getSizeInBytes = function() {
    return Math.floor((this.size + 7) / 8);
  }, r.prototype.ensureCapacity = function(e) {
    if (e > this.bits.length * 32) {
      var t = r.makeArray(e);
      iu.default.arraycopy(this.bits, 0, t, 0, this.bits.length), this.bits = t;
    }
  }, r.prototype.get = function(e) {
    return (this.bits[Math.floor(e / 32)] & 1 << (e & 31)) !== 0;
  }, r.prototype.set = function(e) {
    this.bits[Math.floor(e / 32)] |= 1 << (e & 31);
  }, r.prototype.flip = function(e) {
    this.bits[Math.floor(e / 32)] ^= 1 << (e & 31);
  }, r.prototype.getNextSet = function(e) {
    var t = this.size;
    if (e >= t)
      return t;
    var n = this.bits, a = Math.floor(e / 32), i = n[a];
    i &= ~((1 << (e & 31)) - 1);
    for (var o = n.length; i === 0; ) {
      if (++a === o)
        return t;
      i = n[a];
    }
    var u = a * 32 + ui.default.numberOfTrailingZeros(i);
    return u > t ? t : u;
  }, r.prototype.getNextUnset = function(e) {
    var t = this.size;
    if (e >= t)
      return t;
    var n = this.bits, a = Math.floor(e / 32), i = ~n[a];
    i &= ~((1 << (e & 31)) - 1);
    for (var o = n.length; i === 0; ) {
      if (++a === o)
        return t;
      i = ~n[a];
    }
    var u = a * 32 + ui.default.numberOfTrailingZeros(i);
    return u > t ? t : u;
  }, r.prototype.setBulk = function(e, t) {
    this.bits[Math.floor(e / 32)] = t;
  }, r.prototype.setRange = function(e, t) {
    if (t < e || e < 0 || t > this.size)
      throw new Lt.default();
    if (t !== e) {
      t--;
      for (var n = Math.floor(e / 32), a = Math.floor(t / 32), i = this.bits, o = n; o <= a; o++) {
        var u = o > n ? 0 : e & 31, f = o < a ? 31 : t & 31, l = (2 << f) - (1 << u);
        i[o] |= l;
      }
    }
  }, r.prototype.clear = function() {
    for (var e = this.bits.length, t = this.bits, n = 0; n < e; n++)
      t[n] = 0;
  }, r.prototype.isRange = function(e, t, n) {
    if (t < e || e < 0 || t > this.size)
      throw new Lt.default();
    if (t === e)
      return !0;
    t--;
    for (var a = Math.floor(e / 32), i = Math.floor(t / 32), o = this.bits, u = a; u <= i; u++) {
      var f = u > a ? 0 : e & 31, l = u < i ? 31 : t & 31, c = (2 << l) - (1 << f) & 4294967295;
      if ((o[u] & c) !== (n ? c : 0))
        return !1;
    }
    return !0;
  }, r.prototype.appendBit = function(e) {
    this.ensureCapacity(this.size + 1), e && (this.bits[Math.floor(this.size / 32)] |= 1 << (this.size & 31)), this.size++;
  }, r.prototype.appendBits = function(e, t) {
    if (t < 0 || t > 32)
      throw new Lt.default("Num bits must be between 0 and 32");
    this.ensureCapacity(this.size + t), this.appendBit;
    for (var n = t; n > 0; n--)
      this.appendBit((e >> n - 1 & 1) === 1);
  }, r.prototype.appendBitArray = function(e) {
    var t = e.size;
    this.ensureCapacity(this.size + t), this.appendBit;
    for (var n = 0; n < t; n++)
      this.appendBit(e.get(n));
  }, r.prototype.xor = function(e) {
    if (this.size !== e.size)
      throw new Lt.default("Sizes don't match");
    for (var t = this.bits, n = 0, a = t.length; n < a; n++)
      t[n] ^= e.bits[n];
  }, r.prototype.toBytes = function(e, t, n, a) {
    for (var i = 0; i < a; i++) {
      for (var o = 0, u = 0; u < 8; u++)
        this.get(e) && (o |= 1 << 7 - u), e++;
      t[n + i] = o;
    }
  }, r.prototype.getBitArray = function() {
    return this.bits;
  }, r.prototype.reverse = function() {
    for (var e = new Int32Array(this.bits.length), t = Math.floor((this.size - 1) / 32), n = t + 1, a = this.bits, i = 0; i < n; i++) {
      var o = a[i];
      o = o >> 1 & 1431655765 | (o & 1431655765) << 1, o = o >> 2 & 858993459 | (o & 858993459) << 2, o = o >> 4 & 252645135 | (o & 252645135) << 4, o = o >> 8 & 16711935 | (o & 16711935) << 8, o = o >> 16 & 65535 | (o & 65535) << 16, e[t - i] = o;
    }
    if (this.size !== n * 32) {
      for (var u = n * 32 - this.size, f = e[0] >>> u, i = 1; i < n; i++) {
        var l = e[i];
        f |= l << 32 - u, e[i - 1] = f, f = l >>> u;
      }
      e[n - 1] = f;
    }
    this.bits = e;
  }, r.makeArray = function(e) {
    return new Int32Array(Math.floor((e + 31) / 32));
  }, r.prototype.equals = function(e) {
    if (!(e instanceof r))
      return !1;
    var t = e;
    return this.size === t.size && fi.default.equals(this.bits, t.bits);
  }, r.prototype.hashCode = function() {
    return 31 * this.size + fi.default.hashCode(this.bits);
  }, r.prototype.toString = function() {
    for (var e = "", t = 0, n = this.size; t < n; t++)
      (t & 7) === 0 && (e += " "), e += this.get(t) ? "X" : ".";
    return e;
  }, r.prototype.clone = function() {
    return new r(this.size, this.bits.slice());
  }, r;
}();
Ae.default = ou;
var fe = {}, G = {}, Ke = {}, Y = {};
Object.defineProperty(Y, "__esModule", { value: !0 });
var Mn;
(function(r) {
  r[r.OTHER = 0] = "OTHER", r[r.PURE_BARCODE = 1] = "PURE_BARCODE", r[r.POSSIBLE_FORMATS = 2] = "POSSIBLE_FORMATS", r[r.TRY_HARDER = 3] = "TRY_HARDER", r[r.CHARACTER_SET = 4] = "CHARACTER_SET", r[r.ALLOWED_LENGTHS = 5] = "ALLOWED_LENGTHS", r[r.ASSUME_CODE_39_CHECK_DIGIT = 6] = "ASSUME_CODE_39_CHECK_DIGIT", r[r.ASSUME_GS1 = 7] = "ASSUME_GS1", r[r.RETURN_CODABAR_START_END = 8] = "RETURN_CODABAR_START_END", r[r.NEED_RESULT_POINT_CALLBACK = 9] = "NEED_RESULT_POINT_CALLBACK", r[r.ALLOWED_EAN_EXTENSIONS = 10] = "ALLOWED_EAN_EXTENSIONS";
})(Mn || (Mn = {}));
Y.default = Mn;
var Fe = {}, F = {}, uu = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(F, "__esModule", { value: !0 });
var fu = z, lu = function(r) {
  uu(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e.getFormatInstance = function() {
    return new e();
  }, e;
}(fu.default);
F.default = lu;
(function(r) {
  var e = E && E.__values || function(i) {
    var o = typeof Symbol == "function" && i[Symbol.iterator], u = 0;
    return o ? o.call(i) : {
      next: function() {
        return i && u >= i.length && (i = void 0), { value: i && i[u++], done: !i };
      }
    };
  };
  Object.defineProperty(r, "__esModule", { value: !0 });
  var t = F, n;
  (function(i) {
    i[i.Cp437 = 0] = "Cp437", i[i.ISO8859_1 = 1] = "ISO8859_1", i[i.ISO8859_2 = 2] = "ISO8859_2", i[i.ISO8859_3 = 3] = "ISO8859_3", i[i.ISO8859_4 = 4] = "ISO8859_4", i[i.ISO8859_5 = 5] = "ISO8859_5", i[i.ISO8859_6 = 6] = "ISO8859_6", i[i.ISO8859_7 = 7] = "ISO8859_7", i[i.ISO8859_8 = 8] = "ISO8859_8", i[i.ISO8859_9 = 9] = "ISO8859_9", i[i.ISO8859_10 = 10] = "ISO8859_10", i[i.ISO8859_11 = 11] = "ISO8859_11", i[i.ISO8859_13 = 12] = "ISO8859_13", i[i.ISO8859_14 = 13] = "ISO8859_14", i[i.ISO8859_15 = 14] = "ISO8859_15", i[i.ISO8859_16 = 15] = "ISO8859_16", i[i.SJIS = 16] = "SJIS", i[i.Cp1250 = 17] = "Cp1250", i[i.Cp1251 = 18] = "Cp1251", i[i.Cp1252 = 19] = "Cp1252", i[i.Cp1256 = 20] = "Cp1256", i[i.UnicodeBigUnmarked = 21] = "UnicodeBigUnmarked", i[i.UTF8 = 22] = "UTF8", i[i.ASCII = 23] = "ASCII", i[i.Big5 = 24] = "Big5", i[i.GB18030 = 25] = "GB18030", i[i.EUC_KR = 26] = "EUC_KR";
  })(n = r.CharacterSetValueIdentifiers || (r.CharacterSetValueIdentifiers = {}));
  var a = function() {
    function i(o, u, f) {
      for (var l, c, d = [], s = 3; s < arguments.length; s++)
        d[s - 3] = arguments[s];
      this.valueIdentifier = o, this.name = f, typeof u == "number" ? this.values = Int32Array.from([u]) : this.values = u, this.otherEncodingNames = d, i.VALUE_IDENTIFIER_TO_ECI.set(o, this), i.NAME_TO_ECI.set(f, this);
      for (var v = this.values, h = 0, x = v.length; h !== x; h++) {
        var _ = v[h];
        i.VALUES_TO_ECI.set(_, this);
      }
      try {
        for (var g = e(d), y = g.next(); !y.done; y = g.next()) {
          var A = y.value;
          i.NAME_TO_ECI.set(A, this);
        }
      } catch (w) {
        l = { error: w };
      } finally {
        try {
          y && !y.done && (c = g.return) && c.call(g);
        } finally {
          if (l)
            throw l.error;
        }
      }
    }
    return i.prototype.getValueIdentifier = function() {
      return this.valueIdentifier;
    }, i.prototype.getName = function() {
      return this.name;
    }, i.prototype.getValue = function() {
      return this.values[0];
    }, i.getCharacterSetECIByValue = function(o) {
      if (o < 0 || o >= 900)
        throw new t.default("incorect value");
      var u = i.VALUES_TO_ECI.get(o);
      if (u === void 0)
        throw new t.default("incorect value");
      return u;
    }, i.getCharacterSetECIByName = function(o) {
      var u = i.NAME_TO_ECI.get(o);
      if (u === void 0)
        throw new t.default("incorect value");
      return u;
    }, i.prototype.equals = function(o) {
      if (!(o instanceof i))
        return !1;
      var u = o;
      return this.getName() === u.getName();
    }, i.VALUE_IDENTIFIER_TO_ECI = /* @__PURE__ */ new Map(), i.VALUES_TO_ECI = /* @__PURE__ */ new Map(), i.NAME_TO_ECI = /* @__PURE__ */ new Map(), i.Cp437 = new i(n.Cp437, Int32Array.from([0, 2]), "Cp437"), i.ISO8859_1 = new i(n.ISO8859_1, Int32Array.from([1, 3]), "ISO-8859-1", "ISO88591", "ISO8859_1"), i.ISO8859_2 = new i(n.ISO8859_2, 4, "ISO-8859-2", "ISO88592", "ISO8859_2"), i.ISO8859_3 = new i(n.ISO8859_3, 5, "ISO-8859-3", "ISO88593", "ISO8859_3"), i.ISO8859_4 = new i(n.ISO8859_4, 6, "ISO-8859-4", "ISO88594", "ISO8859_4"), i.ISO8859_5 = new i(n.ISO8859_5, 7, "ISO-8859-5", "ISO88595", "ISO8859_5"), i.ISO8859_6 = new i(n.ISO8859_6, 8, "ISO-8859-6", "ISO88596", "ISO8859_6"), i.ISO8859_7 = new i(n.ISO8859_7, 9, "ISO-8859-7", "ISO88597", "ISO8859_7"), i.ISO8859_8 = new i(n.ISO8859_8, 10, "ISO-8859-8", "ISO88598", "ISO8859_8"), i.ISO8859_9 = new i(n.ISO8859_9, 11, "ISO-8859-9", "ISO88599", "ISO8859_9"), i.ISO8859_10 = new i(n.ISO8859_10, 12, "ISO-8859-10", "ISO885910", "ISO8859_10"), i.ISO8859_11 = new i(n.ISO8859_11, 13, "ISO-8859-11", "ISO885911", "ISO8859_11"), i.ISO8859_13 = new i(n.ISO8859_13, 15, "ISO-8859-13", "ISO885913", "ISO8859_13"), i.ISO8859_14 = new i(n.ISO8859_14, 16, "ISO-8859-14", "ISO885914", "ISO8859_14"), i.ISO8859_15 = new i(n.ISO8859_15, 17, "ISO-8859-15", "ISO885915", "ISO8859_15"), i.ISO8859_16 = new i(n.ISO8859_16, 18, "ISO-8859-16", "ISO885916", "ISO8859_16"), i.SJIS = new i(n.SJIS, 20, "SJIS", "Shift_JIS"), i.Cp1250 = new i(n.Cp1250, 21, "Cp1250", "windows-1250"), i.Cp1251 = new i(n.Cp1251, 22, "Cp1251", "windows-1251"), i.Cp1252 = new i(n.Cp1252, 23, "Cp1252", "windows-1252"), i.Cp1256 = new i(n.Cp1256, 24, "Cp1256", "windows-1256"), i.UnicodeBigUnmarked = new i(n.UnicodeBigUnmarked, 25, "UnicodeBigUnmarked", "UTF-16BE", "UnicodeBig"), i.UTF8 = new i(n.UTF8, 26, "UTF8", "UTF-8"), i.ASCII = new i(n.ASCII, Int32Array.from([27, 170]), "ASCII", "US-ASCII"), i.Big5 = new i(n.Big5, 28, "Big5"), i.GB18030 = new i(n.GB18030, 29, "GB18030", "GB2312", "EUC_CN", "GBK"), i.EUC_KR = new i(n.EUC_KR, 30, "EUC_KR", "EUC-KR"), i;
  }();
  r.default = a;
})(Fe);
var Le = {}, yt = {}, cu = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(yt, "__esModule", { value: !0 });
var du = z, su = function(r) {
  cu(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(du.default);
yt.default = su;
Object.defineProperty(Le, "__esModule", { value: !0 });
var vu = yt, Ge = Fe, hu = function() {
  function r() {
  }
  return r.decode = function(e, t) {
    var n = this.encodingName(t);
    return this.customDecoder ? this.customDecoder(e, n) : typeof TextDecoder > "u" || this.shouldDecodeOnFallback(n) ? this.decodeFallback(e, n) : new TextDecoder(n).decode(e);
  }, r.shouldDecodeOnFallback = function(e) {
    return !r.isBrowser() && e === "ISO-8859-1";
  }, r.encode = function(e, t) {
    var n = this.encodingName(t);
    return this.customEncoder ? this.customEncoder(e, n) : typeof TextEncoder > "u" ? this.encodeFallback(e) : new TextEncoder().encode(e);
  }, r.isBrowser = function() {
    return typeof window < "u" && {}.toString.call(window) === "[object Window]";
  }, r.encodingName = function(e) {
    return typeof e == "string" ? e : e.getName();
  }, r.encodingCharacterSet = function(e) {
    return e instanceof Ge.default ? e : Ge.default.getCharacterSetECIByName(e);
  }, r.decodeFallback = function(e, t) {
    var n = this.encodingCharacterSet(t);
    if (r.isDecodeFallbackSupported(n)) {
      for (var a = "", i = 0, o = e.length; i < o; i++) {
        var u = e[i].toString(16);
        u.length < 2 && (u = "0" + u), a += "%" + u;
      }
      return decodeURIComponent(a);
    }
    if (n.equals(Ge.default.UnicodeBigUnmarked))
      return String.fromCharCode.apply(null, new Uint16Array(e.buffer));
    throw new vu.default("Encoding " + this.encodingName(t) + " not supported by fallback.");
  }, r.isDecodeFallbackSupported = function(e) {
    return e.equals(Ge.default.UTF8) || e.equals(Ge.default.ISO8859_1) || e.equals(Ge.default.ASCII);
  }, r.encodeFallback = function(e) {
    for (var t = btoa(unescape(encodeURIComponent(e))), n = t.split(""), a = [], i = 0; i < n.length; i++)
      a.push(n[i].charCodeAt(0));
    return new Uint8Array(a);
  }, r;
}();
Le.default = hu;
Object.defineProperty(Ke, "__esModule", { value: !0 });
var li = Y, on = Fe, ci = Le, xu = function() {
  function r() {
  }
  return r.castAsNonUtf8Char = function(e, t) {
    t === void 0 && (t = null);
    var n = t ? t.getName() : this.ISO88591;
    return ci.default.decode(new Uint8Array([e]), n);
  }, r.guessEncoding = function(e, t) {
    if (t != null && t.get(li.default.CHARACTER_SET) !== void 0)
      return t.get(li.default.CHARACTER_SET).toString();
    for (var n = e.length, a = !0, i = !0, o = !0, u = 0, f = 0, l = 0, c = 0, d = 0, s = 0, v = 0, h = 0, x = 0, _ = 0, g = 0, y = e.length > 3 && e[0] === 239 && e[1] === 187 && e[2] === 191, A = 0; A < n && (a || i || o); A++) {
      var w = e[A] & 255;
      o && (u > 0 ? (w & 128) === 0 ? o = !1 : u-- : (w & 128) !== 0 && ((w & 64) === 0 ? o = !1 : (u++, (w & 32) === 0 ? f++ : (u++, (w & 16) === 0 ? l++ : (u++, (w & 8) === 0 ? c++ : o = !1))))), a && (w > 127 && w < 160 ? a = !1 : w > 159 && (w < 192 || w === 215 || w === 247) && g++), i && (d > 0 ? w < 64 || w === 127 || w > 252 ? i = !1 : d-- : w === 128 || w === 160 || w > 239 ? i = !1 : w > 160 && w < 224 ? (s++, h = 0, v++, v > x && (x = v)) : w > 127 ? (d++, v = 0, h++, h > _ && (_ = h)) : (v = 0, h = 0));
    }
    return o && u > 0 && (o = !1), i && d > 0 && (i = !1), o && (y || f + l + c > 0) ? r.UTF8 : i && (r.ASSUME_SHIFT_JIS || x >= 3 || _ >= 3) ? r.SHIFT_JIS : a && i ? x === 2 && s === 2 || g * 10 >= n ? r.SHIFT_JIS : r.ISO88591 : a ? r.ISO88591 : i ? r.SHIFT_JIS : o ? r.UTF8 : r.PLATFORM_DEFAULT_ENCODING;
  }, r.format = function(e) {
    for (var t = [], n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
    var a = -1;
    function i(u, f, l, c, d, s) {
      if (u === "%%")
        return "%";
      if (t[++a] !== void 0) {
        u = c ? parseInt(c.substr(1)) : void 0;
        var v = d ? parseInt(d.substr(1)) : void 0, h;
        switch (s) {
          case "s":
            h = t[a];
            break;
          case "c":
            h = t[a][0];
            break;
          case "f":
            h = parseFloat(t[a]).toFixed(u);
            break;
          case "p":
            h = parseFloat(t[a]).toPrecision(u);
            break;
          case "e":
            h = parseFloat(t[a]).toExponential(u);
            break;
          case "x":
            h = parseInt(t[a]).toString(v || 16);
            break;
          case "d":
            h = parseFloat(parseInt(t[a], v || 10).toPrecision(u)).toFixed(0);
            break;
        }
        h = typeof h == "object" ? JSON.stringify(h) : (+h).toString(v);
        for (var x = parseInt(l), _ = l && l[0] + "" == "0" ? "0" : " "; h.length < x; )
          h = f !== void 0 ? h + _ : _ + h;
        return h;
      }
    }
    var o = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;
    return e.replace(o, i);
  }, r.getBytes = function(e, t) {
    return ci.default.encode(e, t);
  }, r.getCharCode = function(e, t) {
    return t === void 0 && (t = 0), e.charCodeAt(t);
  }, r.getCharAt = function(e) {
    return String.fromCharCode(e);
  }, r.SHIFT_JIS = on.default.SJIS.getName(), r.GB2312 = "GB2312", r.ISO88591 = on.default.ISO8859_1.getName(), r.EUC_JP = "EUC_JP", r.UTF8 = on.default.UTF8.getName(), r.PLATFORM_DEFAULT_ENCODING = r.UTF8, r.ASSUME_SHIFT_JIS = !1, r;
}();
Ke.default = xu;
Object.defineProperty(G, "__esModule", { value: !0 });
var pu = Ke, _u = function() {
  function r(e) {
    e === void 0 && (e = ""), this.value = e;
  }
  return r.prototype.enableDecoding = function(e) {
    return this.encoding = e, this;
  }, r.prototype.append = function(e) {
    return typeof e == "string" ? this.value += e.toString() : this.encoding ? this.value += pu.default.castAsNonUtf8Char(e, this.encoding) : this.value += String.fromCharCode(e), this;
  }, r.prototype.length = function() {
    return this.value.length;
  }, r.prototype.charAt = function(e) {
    return this.value.charAt(e);
  }, r.prototype.deleteCharAt = function(e) {
    this.value = this.value.substr(0, e) + this.value.substring(e + 1);
  }, r.prototype.setCharAt = function(e, t) {
    this.value = this.value.substr(0, e) + t + this.value.substr(e + 1);
  }, r.prototype.substring = function(e, t) {
    return this.value.substring(e, t);
  }, r.prototype.setLengthToZero = function() {
    this.value = "";
  }, r.prototype.toString = function() {
    return this.value;
  }, r.prototype.insert = function(e, t) {
    this.value = this.value.substr(0, e) + t + this.value.substr(e + t.length);
  }, r;
}();
G.default = _u;
Object.defineProperty(fe, "__esModule", { value: !0 });
var $t = Ae, gu = j, di = we, yu = G, pe = N, Eu = function() {
  function r(e, t, n, a) {
    if (this.width = e, this.height = t, this.rowSize = n, this.bits = a, t == null && (t = e), this.height = t, e < 1 || t < 1)
      throw new pe.default("Both dimensions must be greater than 0");
    n == null && (n = Math.floor((e + 31) / 32)), this.rowSize = n, a == null && (this.bits = new Int32Array(this.rowSize * this.height));
  }
  return r.parseFromBooleanArray = function(e) {
    for (var t = e.length, n = e[0].length, a = new r(n, t), i = 0; i < t; i++)
      for (var o = e[i], u = 0; u < n; u++)
        o[u] && a.set(u, i);
    return a;
  }, r.parseFromString = function(e, t, n) {
    if (e === null)
      throw new pe.default("stringRepresentation cannot be null");
    for (var a = new Array(e.length), i = 0, o = 0, u = -1, f = 0, l = 0; l < e.length; )
      if (e.charAt(l) === `
` || e.charAt(l) === "\r") {
        if (i > o) {
          if (u === -1)
            u = i - o;
          else if (i - o !== u)
            throw new pe.default("row lengths do not match");
          o = i, f++;
        }
        l++;
      } else if (e.substring(l, l + t.length) === t)
        l += t.length, a[i] = !0, i++;
      else if (e.substring(l, l + n.length) === n)
        l += n.length, a[i] = !1, i++;
      else
        throw new pe.default("illegal character encountered: " + e.substring(l));
    if (i > o) {
      if (u === -1)
        u = i - o;
      else if (i - o !== u)
        throw new pe.default("row lengths do not match");
      f++;
    }
    for (var c = new r(u, f), d = 0; d < i; d++)
      a[d] && c.set(Math.floor(d % u), Math.floor(d / u));
    return c;
  }, r.prototype.get = function(e, t) {
    var n = t * this.rowSize + Math.floor(e / 32);
    return (this.bits[n] >>> (e & 31) & 1) !== 0;
  }, r.prototype.set = function(e, t) {
    var n = t * this.rowSize + Math.floor(e / 32);
    this.bits[n] |= 1 << (e & 31) & 4294967295;
  }, r.prototype.unset = function(e, t) {
    var n = t * this.rowSize + Math.floor(e / 32);
    this.bits[n] &= ~(1 << (e & 31) & 4294967295);
  }, r.prototype.flip = function(e, t) {
    var n = t * this.rowSize + Math.floor(e / 32);
    this.bits[n] ^= 1 << (e & 31) & 4294967295;
  }, r.prototype.xor = function(e) {
    if (this.width !== e.getWidth() || this.height !== e.getHeight() || this.rowSize !== e.getRowSize())
      throw new pe.default("input matrix dimensions do not match");
    for (var t = new $t.default(Math.floor(this.width / 32) + 1), n = this.rowSize, a = this.bits, i = 0, o = this.height; i < o; i++)
      for (var u = i * n, f = e.getRow(i, t).getBitArray(), l = 0; l < n; l++)
        a[u + l] ^= f[l];
  }, r.prototype.clear = function() {
    for (var e = this.bits, t = e.length, n = 0; n < t; n++)
      e[n] = 0;
  }, r.prototype.setRegion = function(e, t, n, a) {
    if (t < 0 || e < 0)
      throw new pe.default("Left and top must be nonnegative");
    if (a < 1 || n < 1)
      throw new pe.default("Height and width must be at least 1");
    var i = e + n, o = t + a;
    if (o > this.height || i > this.width)
      throw new pe.default("The region must fit inside the matrix");
    for (var u = this.rowSize, f = this.bits, l = t; l < o; l++)
      for (var c = l * u, d = e; d < i; d++)
        f[c + Math.floor(d / 32)] |= 1 << (d & 31) & 4294967295;
  }, r.prototype.getRow = function(e, t) {
    t == null || t.getSize() < this.width ? t = new $t.default(this.width) : t.clear();
    for (var n = this.rowSize, a = this.bits, i = e * n, o = 0; o < n; o++)
      t.setBulk(o * 32, a[i + o]);
    return t;
  }, r.prototype.setRow = function(e, t) {
    gu.default.arraycopy(t.getBitArray(), 0, this.bits, e * this.rowSize, this.rowSize);
  }, r.prototype.rotate180 = function() {
    for (var e = this.getWidth(), t = this.getHeight(), n = new $t.default(e), a = new $t.default(e), i = 0, o = Math.floor((t + 1) / 2); i < o; i++)
      n = this.getRow(i, n), a = this.getRow(t - 1 - i, a), n.reverse(), a.reverse(), this.setRow(i, a), this.setRow(t - 1 - i, n);
  }, r.prototype.getEnclosingRectangle = function() {
    for (var e = this.width, t = this.height, n = this.rowSize, a = this.bits, i = e, o = t, u = -1, f = -1, l = 0; l < t; l++)
      for (var c = 0; c < n; c++) {
        var d = a[l * n + c];
        if (d !== 0) {
          if (l < o && (o = l), l > f && (f = l), c * 32 < i) {
            for (var s = 0; (d << 31 - s & 4294967295) === 0; )
              s++;
            c * 32 + s < i && (i = c * 32 + s);
          }
          if (c * 32 + 31 > u) {
            for (var s = 31; d >>> s === 0; )
              s--;
            c * 32 + s > u && (u = c * 32 + s);
          }
        }
      }
    return u < i || f < o ? null : Int32Array.from([i, o, u - i + 1, f - o + 1]);
  }, r.prototype.getTopLeftOnBit = function() {
    for (var e = this.rowSize, t = this.bits, n = 0; n < t.length && t[n] === 0; )
      n++;
    if (n === t.length)
      return null;
    for (var a = n / e, i = n % e * 32, o = t[n], u = 0; (o << 31 - u & 4294967295) === 0; )
      u++;
    return i += u, Int32Array.from([i, a]);
  }, r.prototype.getBottomRightOnBit = function() {
    for (var e = this.rowSize, t = this.bits, n = t.length - 1; n >= 0 && t[n] === 0; )
      n--;
    if (n < 0)
      return null;
    for (var a = Math.floor(n / e), i = Math.floor(n % e) * 32, o = t[n], u = 31; o >>> u === 0; )
      u--;
    return i += u, Int32Array.from([i, a]);
  }, r.prototype.getWidth = function() {
    return this.width;
  }, r.prototype.getHeight = function() {
    return this.height;
  }, r.prototype.getRowSize = function() {
    return this.rowSize;
  }, r.prototype.equals = function(e) {
    if (!(e instanceof r))
      return !1;
    var t = e;
    return this.width === t.width && this.height === t.height && this.rowSize === t.rowSize && di.default.equals(this.bits, t.bits);
  }, r.prototype.hashCode = function() {
    var e = this.width;
    return e = 31 * e + this.width, e = 31 * e + this.height, e = 31 * e + this.rowSize, e = 31 * e + di.default.hashCode(this.bits), e;
  }, r.prototype.toString = function(e, t, n) {
    return e === void 0 && (e = "X "), t === void 0 && (t = "  "), n === void 0 && (n = `
`), this.buildToString(e, t, n);
  }, r.prototype.buildToString = function(e, t, n) {
    for (var a = new yu.default(), i = 0, o = this.height; i < o; i++) {
      for (var u = 0, f = this.width; u < f; u++)
        a.append(this.get(u, i) ? e : t);
      a.append(n);
    }
    return a.toString();
  }, r.prototype.clone = function() {
    return new r(this.width, this.height, this.rowSize, this.bits.slice());
  }, r;
}();
fe.default = Eu;
var T = {}, Au = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(T, "__esModule", { value: !0 });
var wu = z, Cu = function(r) {
  Au(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e.getNotFoundInstance = function() {
    return new e();
  }, e;
}(wu.default);
T.default = Cu;
var Su = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(wr, "__esModule", { value: !0 });
var mu = Cr, Iu = Ae, Ou = fe, Ru = T, Du = function(r) {
  Su(e, r);
  function e(t) {
    var n = r.call(this, t) || this;
    return n.luminances = e.EMPTY, n.buckets = new Int32Array(e.LUMINANCE_BUCKETS), n;
  }
  return e.prototype.getBlackRow = function(t, n) {
    var a = this.getLuminanceSource(), i = a.getWidth();
    n == null || n.getSize() < i ? n = new Iu.default(i) : n.clear(), this.initArrays(i);
    for (var o = a.getRow(t, this.luminances), u = this.buckets, f = 0; f < i; f++)
      u[(o[f] & 255) >> e.LUMINANCE_SHIFT]++;
    var l = e.estimateBlackPoint(u);
    if (i < 3)
      for (var f = 0; f < i; f++)
        (o[f] & 255) < l && n.set(f);
    else
      for (var c = o[0] & 255, d = o[1] & 255, f = 1; f < i - 1; f++) {
        var s = o[f + 1] & 255;
        (d * 4 - c - s) / 2 < l && n.set(f), c = d, d = s;
      }
    return n;
  }, e.prototype.getBlackMatrix = function() {
    var t = this.getLuminanceSource(), n = t.getWidth(), a = t.getHeight(), i = new Ou.default(n, a);
    this.initArrays(n);
    for (var o = this.buckets, u = 1; u < 5; u++)
      for (var f = Math.floor(a * u / 5), l = t.getRow(f, this.luminances), c = Math.floor(n * 4 / 5), d = Math.floor(n / 5); d < c; d++) {
        var s = l[d] & 255;
        o[s >> e.LUMINANCE_SHIFT]++;
      }
    for (var v = e.estimateBlackPoint(o), h = t.getMatrix(), u = 0; u < a; u++)
      for (var x = u * n, d = 0; d < n; d++) {
        var s = h[x + d] & 255;
        s < v && i.set(d, u);
      }
    return i;
  }, e.prototype.createBinarizer = function(t) {
    return new e(t);
  }, e.prototype.initArrays = function(t) {
    this.luminances.length < t && (this.luminances = new Uint8ClampedArray(t));
    for (var n = this.buckets, a = 0; a < e.LUMINANCE_BUCKETS; a++)
      n[a] = 0;
  }, e.estimateBlackPoint = function(t) {
    for (var n = t.length, a = 0, i = 0, o = 0, u = 0; u < n; u++)
      t[u] > o && (i = u, o = t[u]), t[u] > a && (a = t[u]);
    for (var f = 0, l = 0, u = 0; u < n; u++) {
      var c = u - i, d = t[u] * c * c;
      d > l && (f = u, l = d);
    }
    if (i > f) {
      var s = i;
      i = f, f = s;
    }
    if (f - i <= n / 16)
      throw new Ru.default();
    for (var v = f - 1, h = -1, u = f - 1; u > i; u--) {
      var x = u - i, d = x * x * (f - u) * (a - t[u]);
      d > h && (v = u, h = d);
    }
    return v << e.LUMINANCE_SHIFT;
  }, e.LUMINANCE_BITS = 5, e.LUMINANCE_SHIFT = 8 - e.LUMINANCE_BITS, e.LUMINANCE_BUCKETS = 1 << e.LUMINANCE_BITS, e.EMPTY = Uint8ClampedArray.from([0]), e;
}(mu.default);
wr.default = Du;
var Tu = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Ar, "__esModule", { value: !0 });
var Pu = wr, bu = fe, Nu = function(r) {
  Tu(e, r);
  function e(t) {
    var n = r.call(this, t) || this;
    return n.matrix = null, n;
  }
  return e.prototype.getBlackMatrix = function() {
    if (this.matrix !== null)
      return this.matrix;
    var t = this.getLuminanceSource(), n = t.getWidth(), a = t.getHeight();
    if (n >= e.MINIMUM_DIMENSION && a >= e.MINIMUM_DIMENSION) {
      var i = t.getMatrix(), o = n >> e.BLOCK_SIZE_POWER;
      (n & e.BLOCK_SIZE_MASK) !== 0 && o++;
      var u = a >> e.BLOCK_SIZE_POWER;
      (a & e.BLOCK_SIZE_MASK) !== 0 && u++;
      var f = e.calculateBlackPoints(i, o, u, n, a), l = new bu.default(n, a);
      e.calculateThresholdForBlock(i, o, u, n, a, f, l), this.matrix = l;
    } else
      this.matrix = r.prototype.getBlackMatrix.call(this);
    return this.matrix;
  }, e.prototype.createBinarizer = function(t) {
    return new e(t);
  }, e.calculateThresholdForBlock = function(t, n, a, i, o, u, f) {
    for (var l = o - e.BLOCK_SIZE, c = i - e.BLOCK_SIZE, d = 0; d < a; d++) {
      var s = d << e.BLOCK_SIZE_POWER;
      s > l && (s = l);
      for (var v = e.cap(d, 2, a - 3), h = 0; h < n; h++) {
        var x = h << e.BLOCK_SIZE_POWER;
        x > c && (x = c);
        for (var _ = e.cap(h, 2, n - 3), g = 0, y = -2; y <= 2; y++) {
          var A = u[v + y];
          g += A[_ - 2] + A[_ - 1] + A[_] + A[_ + 1] + A[_ + 2];
        }
        var w = g / 25;
        e.thresholdBlock(t, x, s, w, i, f);
      }
    }
  }, e.cap = function(t, n, a) {
    return t < n ? n : t > a ? a : t;
  }, e.thresholdBlock = function(t, n, a, i, o, u) {
    for (var f = 0, l = a * o + n; f < e.BLOCK_SIZE; f++, l += o)
      for (var c = 0; c < e.BLOCK_SIZE; c++)
        (t[l + c] & 255) <= i && u.set(n + c, a + f);
  }, e.calculateBlackPoints = function(t, n, a, i, o) {
    for (var u = o - e.BLOCK_SIZE, f = i - e.BLOCK_SIZE, l = new Array(a), c = 0; c < a; c++) {
      l[c] = new Int32Array(n);
      var d = c << e.BLOCK_SIZE_POWER;
      d > u && (d = u);
      for (var s = 0; s < n; s++) {
        var v = s << e.BLOCK_SIZE_POWER;
        v > f && (v = f);
        for (var h = 0, x = 255, _ = 0, g = 0, y = d * i + v; g < e.BLOCK_SIZE; g++, y += i) {
          for (var A = 0; A < e.BLOCK_SIZE; A++) {
            var w = t[y + A] & 255;
            h += w, w < x && (x = w), w > _ && (_ = w);
          }
          if (_ - x > e.MIN_DYNAMIC_RANGE)
            for (g++, y += i; g < e.BLOCK_SIZE; g++, y += i)
              for (var A = 0; A < e.BLOCK_SIZE; A++)
                h += t[y + A] & 255;
        }
        var S = h >> e.BLOCK_SIZE_POWER * 2;
        if (_ - x <= e.MIN_DYNAMIC_RANGE && (S = x / 2, c > 0 && s > 0)) {
          var m = (l[c - 1][s] + 2 * l[c][s - 1] + l[c - 1][s - 1]) / 4;
          x < m && (S = m);
        }
        l[c][s] = S;
      }
    }
    return l;
  }, e.BLOCK_SIZE_POWER = 3, e.BLOCK_SIZE = 1 << e.BLOCK_SIZE_POWER, e.BLOCK_SIZE_MASK = e.BLOCK_SIZE - 1, e.MINIMUM_DIMENSION = e.BLOCK_SIZE * 5, e.MIN_DYNAMIC_RANGE = 24, e;
}(Pu.default);
Ar.default = Nu;
var Sr = {}, qe = {}, $e = {};
Object.defineProperty($e, "__esModule", { value: !0 });
var Mu = G, un = yt, Bu = function() {
  function r(e, t) {
    this.width = e, this.height = t;
  }
  return r.prototype.getWidth = function() {
    return this.width;
  }, r.prototype.getHeight = function() {
    return this.height;
  }, r.prototype.isCropSupported = function() {
    return !1;
  }, r.prototype.crop = function(e, t, n, a) {
    throw new un.default("This luminance source does not support cropping.");
  }, r.prototype.isRotateSupported = function() {
    return !1;
  }, r.prototype.rotateCounterClockwise = function() {
    throw new un.default("This luminance source does not support rotation by 90 degrees.");
  }, r.prototype.rotateCounterClockwise45 = function() {
    throw new un.default("This luminance source does not support rotation by 45 degrees.");
  }, r.prototype.toString = function() {
    for (var e = new Uint8ClampedArray(this.width), t = new Mu.default(), n = 0; n < this.height; n++) {
      for (var a = this.getRow(n, e), i = 0; i < this.width; i++) {
        var o = a[i] & 255, u = void 0;
        o < 64 ? u = "#" : o < 128 ? u = "+" : o < 192 ? u = "." : u = " ", t.append(u);
      }
      t.append(`
`);
    }
    return t.toString();
  }, r;
}();
$e.default = Bu;
var Fu = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(qe, "__esModule", { value: !0 });
var Lu = $e, $u = function(r) {
  Fu(e, r);
  function e(t) {
    var n = r.call(this, t.getWidth(), t.getHeight()) || this;
    return n.delegate = t, n;
  }
  return e.prototype.getRow = function(t, n) {
    for (var a = this.delegate.getRow(t, n), i = this.getWidth(), o = 0; o < i; o++)
      a[o] = 255 - (a[o] & 255);
    return a;
  }, e.prototype.getMatrix = function() {
    for (var t = this.delegate.getMatrix(), n = this.getWidth() * this.getHeight(), a = new Uint8ClampedArray(n), i = 0; i < n; i++)
      a[i] = 255 - (t[i] & 255);
    return a;
  }, e.prototype.isCropSupported = function() {
    return this.delegate.isCropSupported();
  }, e.prototype.crop = function(t, n, a, i) {
    return new e(this.delegate.crop(t, n, a, i));
  }, e.prototype.isRotateSupported = function() {
    return this.delegate.isRotateSupported();
  }, e.prototype.invert = function() {
    return this.delegate;
  }, e.prototype.rotateCounterClockwise = function() {
    return new e(this.delegate.rotateCounterClockwise());
  }, e.prototype.rotateCounterClockwise45 = function() {
    return new e(this.delegate.rotateCounterClockwise45());
  }, e;
}(Lu.default);
qe.default = $u;
var ku = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Sr, "__esModule", { value: !0 });
var Uu = qe, Gu = $e, Hu = N, Vu = function(r) {
  ku(e, r);
  function e(t) {
    var n = r.call(this, t.width, t.height) || this;
    return n.canvas = t, n.tempCanvasElement = null, n.buffer = e.makeBufferFromCanvasImageData(t), n;
  }
  return e.makeBufferFromCanvasImageData = function(t) {
    var n = t.getContext("2d").getImageData(0, 0, t.width, t.height);
    return e.toGrayscaleBuffer(n.data, t.width, t.height);
  }, e.toGrayscaleBuffer = function(t, n, a) {
    for (var i = new Uint8ClampedArray(n * a), o = 0, u = 0, f = t.length; o < f; o += 4, u++) {
      var l = void 0, c = t[o + 3];
      if (c === 0)
        l = 255;
      else {
        var d = t[o], s = t[o + 1], v = t[o + 2];
        l = 306 * d + 601 * s + 117 * v + 512 >> 10;
      }
      i[u] = l;
    }
    return i;
  }, e.prototype.getRow = function(t, n) {
    if (t < 0 || t >= this.getHeight())
      throw new Hu.default("Requested row is outside the image: " + t);
    var a = this.getWidth(), i = t * a;
    return n === null ? n = this.buffer.slice(i, i + a) : (n.length < a && (n = new Uint8ClampedArray(a)), n.set(this.buffer.slice(i, i + a))), n;
  }, e.prototype.getMatrix = function() {
    return this.buffer;
  }, e.prototype.isCropSupported = function() {
    return !0;
  }, e.prototype.crop = function(t, n, a, i) {
    return r.prototype.crop.call(this, t, n, a, i), this;
  }, e.prototype.isRotateSupported = function() {
    return !0;
  }, e.prototype.rotateCounterClockwise = function() {
    return this.rotate(-90), this;
  }, e.prototype.rotateCounterClockwise45 = function() {
    return this.rotate(-45), this;
  }, e.prototype.getTempCanvasElement = function() {
    if (this.tempCanvasElement === null) {
      var t = this.canvas.ownerDocument.createElement("canvas");
      t.width = this.canvas.width, t.height = this.canvas.height, this.tempCanvasElement = t;
    }
    return this.tempCanvasElement;
  }, e.prototype.rotate = function(t) {
    var n = this.getTempCanvasElement(), a = n.getContext("2d"), i = t * e.DEGREE_TO_RADIANS, o = this.canvas.width, u = this.canvas.height, f = Math.ceil(Math.abs(Math.cos(i)) * o + Math.abs(Math.sin(i)) * u), l = Math.ceil(Math.abs(Math.sin(i)) * o + Math.abs(Math.cos(i)) * u);
    return n.width = f, n.height = l, a.translate(f / 2, l / 2), a.rotate(i), a.drawImage(this.canvas, o / -2, u / -2), this.buffer = e.makeBufferFromCanvasImageData(n), this;
  }, e.prototype.invert = function() {
    return new Uu.default(this);
  }, e.DEGREE_TO_RADIANS = Math.PI / 180, e;
}(Gu.default);
Sr.HTMLCanvasElementLuminanceSource = Vu;
var mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
var ju = function() {
  function r(e, t, n) {
    this.deviceId = e, this.label = t, this.kind = "videoinput", this.groupId = n || void 0;
  }
  return r.prototype.toJSON = function() {
    return {
      kind: this.kind,
      groupId: this.groupId,
      deviceId: this.deviceId,
      label: this.label
    };
  }, r;
}();
mr.VideoInputDevice = ju;
var K = E && E.__awaiter || function(r, e, t, n) {
  return new (t || (t = Promise))(function(a, i) {
    function o(l) {
      try {
        f(n.next(l));
      } catch (c) {
        i(c);
      }
    }
    function u(l) {
      try {
        f(n.throw(l));
      } catch (c) {
        i(c);
      }
    }
    function f(l) {
      l.done ? a(l.value) : new t(function(c) {
        c(l.value);
      }).then(o, u);
    }
    f((n = n.apply(r, e || [])).next());
  });
}, q = E && E.__generator || function(r, e) {
  var t = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, n, a, i, o;
  return o = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function u(l) {
    return function(c) {
      return f([l, c]);
    };
  }
  function f(l) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (n = 1, a && (i = l[0] & 2 ? a.return : l[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, l[1])).done)
          return i;
        switch (a = 0, i && (l = [l[0] & 2, i.value]), l[0]) {
          case 0:
          case 1:
            i = l;
            break;
          case 4:
            return t.label++, { value: l[1], done: !1 };
          case 5:
            t.label++, a = l[1], l = [0];
            continue;
          case 7:
            l = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (i = t.trys, !(i = i.length > 0 && i[i.length - 1]) && (l[0] === 6 || l[0] === 2)) {
              t = 0;
              continue;
            }
            if (l[0] === 3 && (!i || l[1] > i[0] && l[1] < i[3])) {
              t.label = l[1];
              break;
            }
            if (l[0] === 6 && t.label < i[1]) {
              t.label = i[1], i = l;
              break;
            }
            if (i && t.label < i[2]) {
              t.label = i[2], t.ops.push(l);
              break;
            }
            i[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        l = e.call(r, t);
      } catch (c) {
        l = [6, c], a = 0;
      } finally {
        n = i = 0;
      }
    if (l[0] & 5)
      throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}, Wu = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Ee, "__esModule", { value: !0 });
var he = _t, Xu = Er, si = ue, zu = Ar, vi = F, fn = T, Yu = Sr, Zu = mr, Ku = function() {
  function r(e, t, n) {
    t === void 0 && (t = 500), this.reader = e, this.timeBetweenScansMillis = t, this._hints = n, this._stopContinuousDecode = !1, this._stopAsyncDecode = !1, this._timeBetweenDecodingAttempts = 0;
  }
  return Object.defineProperty(r.prototype, "hasNavigator", {
    get: function() {
      return typeof navigator < "u";
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(r.prototype, "isMediaDevicesSuported", {
    get: function() {
      return this.hasNavigator && !!navigator.mediaDevices;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(r.prototype, "canEnumerateDevices", {
    get: function() {
      return !!(this.isMediaDevicesSuported && navigator.mediaDevices.enumerateDevices);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(r.prototype, "timeBetweenDecodingAttempts", {
    get: function() {
      return this._timeBetweenDecodingAttempts;
    },
    set: function(e) {
      this._timeBetweenDecodingAttempts = e < 0 ? 0 : e;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(r.prototype, "hints", {
    get: function() {
      return this._hints;
    },
    set: function(e) {
      this._hints = e || null;
    },
    enumerable: !0,
    configurable: !0
  }), r.prototype.listVideoInputDevices = function() {
    return K(this, void 0, void 0, function() {
      var e, t, n, a, i, o, u, f, l, c, d, s;
      return q(this, function(v) {
        switch (v.label) {
          case 0:
            if (!this.hasNavigator)
              throw new Error("Can't enumerate devices, navigator is not present.");
            if (!this.canEnumerateDevices)
              throw new Error("Can't enumerate devices, method not supported.");
            return [4, navigator.mediaDevices.enumerateDevices()];
          case 1:
            n = v.sent(), a = [];
            try {
              for (i = Wu(n), o = i.next(); !o.done; o = i.next())
                u = o.value, f = u.kind === "video" ? "videoinput" : u.kind, f === "videoinput" && (l = u.deviceId || u.id, c = u.label || "Video device " + (a.length + 1), d = u.groupId, s = { deviceId: l, label: c, kind: f, groupId: d }, a.push(s));
            } catch (h) {
              e = { error: h };
            } finally {
              try {
                o && !o.done && (t = i.return) && t.call(i);
              } finally {
                if (e)
                  throw e.error;
              }
            }
            return [2, a];
        }
      });
    });
  }, r.prototype.getVideoInputDevices = function() {
    return K(this, void 0, void 0, function() {
      var e;
      return q(this, function(t) {
        switch (t.label) {
          case 0:
            return [4, this.listVideoInputDevices()];
          case 1:
            return e = t.sent(), [2, e.map(function(n) {
              return new Zu.VideoInputDevice(n.deviceId, n.label);
            })];
        }
      });
    });
  }, r.prototype.findDeviceById = function(e) {
    return K(this, void 0, void 0, function() {
      var t;
      return q(this, function(n) {
        switch (n.label) {
          case 0:
            return [4, this.listVideoInputDevices()];
          case 1:
            return t = n.sent(), t ? [2, t.find(function(a) {
              return a.deviceId === e;
            })] : [2, null];
        }
      });
    });
  }, r.prototype.decodeFromInputVideoDevice = function(e, t) {
    return K(this, void 0, void 0, function() {
      return q(this, function(n) {
        switch (n.label) {
          case 0:
            return [4, this.decodeOnceFromVideoDevice(e, t)];
          case 1:
            return [2, n.sent()];
        }
      });
    });
  }, r.prototype.decodeOnceFromVideoDevice = function(e, t) {
    return K(this, void 0, void 0, function() {
      var n, a;
      return q(this, function(i) {
        switch (i.label) {
          case 0:
            return this.reset(), e ? n = { deviceId: { exact: e } } : n = { facingMode: "environment" }, a = { video: n }, [4, this.decodeOnceFromConstraints(a, t)];
          case 1:
            return [2, i.sent()];
        }
      });
    });
  }, r.prototype.decodeOnceFromConstraints = function(e, t) {
    return K(this, void 0, void 0, function() {
      var n;
      return q(this, function(a) {
        switch (a.label) {
          case 0:
            return [4, navigator.mediaDevices.getUserMedia(e)];
          case 1:
            return n = a.sent(), [4, this.decodeOnceFromStream(n, t)];
          case 2:
            return [2, a.sent()];
        }
      });
    });
  }, r.prototype.decodeOnceFromStream = function(e, t) {
    return K(this, void 0, void 0, function() {
      var n, a;
      return q(this, function(i) {
        switch (i.label) {
          case 0:
            return this.reset(), [4, this.attachStreamToVideo(e, t)];
          case 1:
            return n = i.sent(), [4, this.decodeOnce(n)];
          case 2:
            return a = i.sent(), [2, a];
        }
      });
    });
  }, r.prototype.decodeFromInputVideoDeviceContinuously = function(e, t, n) {
    return K(this, void 0, void 0, function() {
      return q(this, function(a) {
        switch (a.label) {
          case 0:
            return [4, this.decodeFromVideoDevice(e, t, n)];
          case 1:
            return [2, a.sent()];
        }
      });
    });
  }, r.prototype.decodeFromVideoDevice = function(e, t, n) {
    return K(this, void 0, void 0, function() {
      var a, i;
      return q(this, function(o) {
        switch (o.label) {
          case 0:
            return e ? a = { deviceId: { exact: e } } : a = { facingMode: "environment" }, i = { video: a }, [4, this.decodeFromConstraints(i, t, n)];
          case 1:
            return [2, o.sent()];
        }
      });
    });
  }, r.prototype.decodeFromConstraints = function(e, t, n) {
    return K(this, void 0, void 0, function() {
      var a;
      return q(this, function(i) {
        switch (i.label) {
          case 0:
            return [4, navigator.mediaDevices.getUserMedia(e)];
          case 1:
            return a = i.sent(), [4, this.decodeFromStream(a, t, n)];
          case 2:
            return [2, i.sent()];
        }
      });
    });
  }, r.prototype.decodeFromStream = function(e, t, n) {
    return K(this, void 0, void 0, function() {
      var a;
      return q(this, function(i) {
        switch (i.label) {
          case 0:
            return this.reset(), [4, this.attachStreamToVideo(e, t)];
          case 1:
            return a = i.sent(), [4, this.decodeContinuously(a, n)];
          case 2:
            return [2, i.sent()];
        }
      });
    });
  }, r.prototype.stopAsyncDecode = function() {
    this._stopAsyncDecode = !0;
  }, r.prototype.stopContinuousDecode = function() {
    this._stopContinuousDecode = !0;
  }, r.prototype.attachStreamToVideo = function(e, t) {
    return K(this, void 0, void 0, function() {
      var n;
      return q(this, function(a) {
        switch (a.label) {
          case 0:
            return n = this.prepareVideoElement(t), this.addVideoSource(n, e), this.videoElement = n, this.stream = e, [4, this.playVideoOnLoadAsync(n)];
          case 1:
            return a.sent(), [2, n];
        }
      });
    });
  }, r.prototype.playVideoOnLoadAsync = function(e) {
    var t = this;
    return new Promise(function(n, a) {
      return t.playVideoOnLoad(e, function() {
        return n();
      });
    });
  }, r.prototype.playVideoOnLoad = function(e, t) {
    var n = this;
    this.videoEndedListener = function() {
      return n.stopStreams();
    }, this.videoCanPlayListener = function() {
      return n.tryPlayVideo(e);
    }, e.addEventListener("ended", this.videoEndedListener), e.addEventListener("canplay", this.videoCanPlayListener), e.addEventListener("playing", t), this.tryPlayVideo(e);
  }, r.prototype.isVideoPlaying = function(e) {
    return e.currentTime > 0 && !e.paused && !e.ended && e.readyState > 2;
  }, r.prototype.tryPlayVideo = function(e) {
    return K(this, void 0, void 0, function() {
      return q(this, function(t) {
        switch (t.label) {
          case 0:
            if (this.isVideoPlaying(e))
              return console.warn("Trying to play video that is already playing."), [2];
            t.label = 1;
          case 1:
            return t.trys.push([1, 3, , 4]), [4, e.play()];
          case 2:
            return t.sent(), [3, 4];
          case 3:
            return t.sent(), console.warn("It was not possible to play the video."), [3, 4];
          case 4:
            return [2];
        }
      });
    });
  }, r.prototype.getMediaElement = function(e, t) {
    var n = document.getElementById(e);
    if (!n)
      throw new he.default("element with id '" + e + "' not found");
    if (n.nodeName.toLowerCase() !== t.toLowerCase())
      throw new he.default("element with id '" + e + "' must be an " + t + " element");
    return n;
  }, r.prototype.decodeFromImage = function(e, t) {
    if (!e && !t)
      throw new he.default("either imageElement with a src set or an url must be provided");
    return t && !e ? this.decodeFromImageUrl(t) : this.decodeFromImageElement(e);
  }, r.prototype.decodeFromVideo = function(e, t) {
    if (!e && !t)
      throw new he.default("Either an element with a src set or an URL must be provided");
    return t && !e ? this.decodeFromVideoUrl(t) : this.decodeFromVideoElement(e);
  }, r.prototype.decodeFromVideoContinuously = function(e, t, n) {
    if (e === void 0 && t === void 0)
      throw new he.default("Either an element with a src set or an URL must be provided");
    return t && !e ? this.decodeFromVideoUrlContinuously(t, n) : this.decodeFromVideoElementContinuously(e, n);
  }, r.prototype.decodeFromImageElement = function(e) {
    if (!e)
      throw new he.default("An image element must be provided.");
    this.reset();
    var t = this.prepareImageElement(e);
    this.imageElement = t;
    var n;
    return this.isImageLoaded(t) ? n = this.decodeOnce(t, !1, !0) : n = this._decodeOnLoadImage(t), n;
  }, r.prototype.decodeFromVideoElement = function(e) {
    var t = this._decodeFromVideoElementSetup(e);
    return this._decodeOnLoadVideo(t);
  }, r.prototype.decodeFromVideoElementContinuously = function(e, t) {
    var n = this._decodeFromVideoElementSetup(e);
    return this._decodeOnLoadVideoContinuously(n, t);
  }, r.prototype._decodeFromVideoElementSetup = function(e) {
    if (!e)
      throw new he.default("A video element must be provided.");
    this.reset();
    var t = this.prepareVideoElement(e);
    return this.videoElement = t, t;
  }, r.prototype.decodeFromImageUrl = function(e) {
    if (!e)
      throw new he.default("An URL must be provided.");
    this.reset();
    var t = this.prepareImageElement();
    this.imageElement = t;
    var n = this._decodeOnLoadImage(t);
    return t.src = e, n;
  }, r.prototype.decodeFromVideoUrl = function(e) {
    if (!e)
      throw new he.default("An URL must be provided.");
    this.reset();
    var t = this.prepareVideoElement(), n = this.decodeFromVideoElement(t);
    return t.src = e, n;
  }, r.prototype.decodeFromVideoUrlContinuously = function(e, t) {
    if (!e)
      throw new he.default("An URL must be provided.");
    this.reset();
    var n = this.prepareVideoElement(), a = this.decodeFromVideoElementContinuously(n, t);
    return n.src = e, a;
  }, r.prototype._decodeOnLoadImage = function(e) {
    var t = this;
    return new Promise(function(n, a) {
      t.imageLoadedListener = function() {
        return t.decodeOnce(e, !1, !0).then(n, a);
      }, e.addEventListener("load", t.imageLoadedListener);
    });
  }, r.prototype._decodeOnLoadVideo = function(e) {
    return K(this, void 0, void 0, function() {
      return q(this, function(t) {
        switch (t.label) {
          case 0:
            return [4, this.playVideoOnLoadAsync(e)];
          case 1:
            return t.sent(), [4, this.decodeOnce(e)];
          case 2:
            return [2, t.sent()];
        }
      });
    });
  }, r.prototype._decodeOnLoadVideoContinuously = function(e, t) {
    return K(this, void 0, void 0, function() {
      return q(this, function(n) {
        switch (n.label) {
          case 0:
            return [4, this.playVideoOnLoadAsync(e)];
          case 1:
            return n.sent(), this.decodeContinuously(e, t), [2];
        }
      });
    });
  }, r.prototype.isImageLoaded = function(e) {
    return !(!e.complete || e.naturalWidth === 0);
  }, r.prototype.prepareImageElement = function(e) {
    var t;
    return typeof e > "u" && (t = document.createElement("img"), t.width = 200, t.height = 200), typeof e == "string" && (t = this.getMediaElement(e, "img")), e instanceof HTMLImageElement && (t = e), t;
  }, r.prototype.prepareVideoElement = function(e) {
    var t;
    return !e && typeof document < "u" && (t = document.createElement("video"), t.width = 200, t.height = 200), typeof e == "string" && (t = this.getMediaElement(e, "video")), e instanceof HTMLVideoElement && (t = e), t.setAttribute("autoplay", "true"), t.setAttribute("muted", "true"), t.setAttribute("playsinline", "true"), t;
  }, r.prototype.decodeOnce = function(e, t, n) {
    var a = this;
    t === void 0 && (t = !0), n === void 0 && (n = !0), this._stopAsyncDecode = !1;
    var i = function(o, u) {
      if (a._stopAsyncDecode) {
        u(new fn.default("Video stream has ended before any code could be detected.")), a._stopAsyncDecode = void 0;
        return;
      }
      try {
        var f = a.decode(e);
        o(f);
      } catch (s) {
        var l = t && s instanceof fn.default, c = s instanceof si.default || s instanceof vi.default, d = c && n;
        if (l || d)
          return setTimeout(i, a._timeBetweenDecodingAttempts, o, u);
        u(s);
      }
    };
    return new Promise(function(o, u) {
      return i(o, u);
    });
  }, r.prototype.decodeContinuously = function(e, t) {
    var n = this;
    this._stopContinuousDecode = !1;
    var a = function() {
      if (n._stopContinuousDecode) {
        n._stopContinuousDecode = void 0;
        return;
      }
      try {
        var i = n.decode(e);
        t(i, null), setTimeout(a, n.timeBetweenScansMillis);
      } catch (f) {
        t(null, f);
        var o = f instanceof si.default || f instanceof vi.default, u = f instanceof fn.default;
        (o || u) && setTimeout(a, n._timeBetweenDecodingAttempts);
      }
    };
    a();
  }, r.prototype.decode = function(e) {
    var t = this.createBinaryBitmap(e);
    return this.decodeBitmap(t);
  }, r.prototype.createBinaryBitmap = function(e) {
    var t = this.getCaptureCanvasContext(e);
    this.drawImageOnCanvas(t, e);
    var n = this.getCaptureCanvas(e), a = new Yu.HTMLCanvasElementLuminanceSource(n), i = new zu.default(a);
    return new Xu.default(i);
  }, r.prototype.getCaptureCanvasContext = function(e) {
    if (!this.captureCanvasContext) {
      var t = this.getCaptureCanvas(e), n = t.getContext("2d");
      this.captureCanvasContext = n;
    }
    return this.captureCanvasContext;
  }, r.prototype.getCaptureCanvas = function(e) {
    if (!this.captureCanvas) {
      var t = this.createCaptureCanvas(e);
      this.captureCanvas = t;
    }
    return this.captureCanvas;
  }, r.prototype.drawImageOnCanvas = function(e, t) {
    e.drawImage(t, 0, 0);
  }, r.prototype.decodeBitmap = function(e) {
    return this.reader.decode(e, this._hints);
  }, r.prototype.createCaptureCanvas = function(e) {
    if (typeof document > "u")
      return this._destroyCaptureCanvas(), null;
    var t = document.createElement("canvas"), n, a;
    return typeof e < "u" && (e instanceof HTMLVideoElement ? (n = e.videoWidth, a = e.videoHeight) : e instanceof HTMLImageElement && (n = e.naturalWidth || e.width, a = e.naturalHeight || e.height)), t.style.width = n + "px", t.style.height = a + "px", t.width = n, t.height = a, t;
  }, r.prototype.stopStreams = function() {
    this.stream && (this.stream.getVideoTracks().forEach(function(e) {
      return e.stop();
    }), this.stream = void 0), this._stopAsyncDecode === !1 && this.stopAsyncDecode(), this._stopContinuousDecode === !1 && this.stopContinuousDecode();
  }, r.prototype.reset = function() {
    this.stopStreams(), this._destroyVideoElement(), this._destroyImageElement(), this._destroyCaptureCanvas();
  }, r.prototype._destroyVideoElement = function() {
    !this.videoElement || (typeof this.videoEndedListener < "u" && this.videoElement.removeEventListener("ended", this.videoEndedListener), typeof this.videoPlayingEventListener < "u" && this.videoElement.removeEventListener("playing", this.videoPlayingEventListener), typeof this.videoCanPlayListener < "u" && this.videoElement.removeEventListener("loadedmetadata", this.videoCanPlayListener), this.cleanVideoSource(this.videoElement), this.videoElement = void 0);
  }, r.prototype._destroyImageElement = function() {
    !this.imageElement || (this.imageLoadedListener !== void 0 && this.imageElement.removeEventListener("load", this.imageLoadedListener), this.imageElement.src = void 0, this.imageElement.removeAttribute("src"), this.imageElement = void 0);
  }, r.prototype._destroyCaptureCanvas = function() {
    this.captureCanvasContext = void 0, this.captureCanvas = void 0;
  }, r.prototype.addVideoSource = function(e, t) {
    try {
      e.srcObject = t;
    } catch {
      e.src = URL.createObjectURL(t);
    }
  }, r.prototype.cleanVideoSource = function(e) {
    try {
      e.srcObject = null;
    } catch {
      e.src = "";
    }
    this.videoElement.removeAttribute("src");
  }, r;
}();
Ee.BrowserCodeReader = Ku;
var kt = {}, J = {};
Object.defineProperty(J, "__esModule", { value: !0 });
var Ut = j, qu = function() {
  function r(e, t, n, a, i, o) {
    n === void 0 && (n = t == null ? 0 : 8 * t.length), o === void 0 && (o = Ut.default.currentTimeMillis()), this.text = e, this.rawBytes = t, this.numBits = n, this.resultPoints = a, this.format = i, this.timestamp = o, this.text = e, this.rawBytes = t, n == null ? this.numBits = t == null ? 0 : 8 * t.length : this.numBits = n, this.resultPoints = a, this.format = i, this.resultMetadata = null, o == null ? this.timestamp = Ut.default.currentTimeMillis() : this.timestamp = o;
  }
  return r.prototype.getText = function() {
    return this.text;
  }, r.prototype.getRawBytes = function() {
    return this.rawBytes;
  }, r.prototype.getNumBits = function() {
    return this.numBits;
  }, r.prototype.getResultPoints = function() {
    return this.resultPoints;
  }, r.prototype.getBarcodeFormat = function() {
    return this.format;
  }, r.prototype.getResultMetadata = function() {
    return this.resultMetadata;
  }, r.prototype.putMetadata = function(e, t) {
    this.resultMetadata === null && (this.resultMetadata = /* @__PURE__ */ new Map()), this.resultMetadata.set(e, t);
  }, r.prototype.putAllMetadata = function(e) {
    e !== null && (this.resultMetadata === null ? this.resultMetadata = e : this.resultMetadata = new Map(e));
  }, r.prototype.addResultPoints = function(e) {
    var t = this.resultPoints;
    if (t === null)
      this.resultPoints = e;
    else if (e !== null && e.length > 0) {
      var n = new Array(t.length + e.length);
      Ut.default.arraycopy(t, 0, n, 0, t.length), Ut.default.arraycopy(e, 0, n, t.length, e.length), this.resultPoints = n;
    }
  }, r.prototype.getTimestamp = function() {
    return this.timestamp;
  }, r.prototype.toString = function() {
    return this.text;
  }, r;
}();
J.default = qu;
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
var Bn;
(function(r) {
  r[r.AZTEC = 0] = "AZTEC", r[r.CODABAR = 1] = "CODABAR", r[r.CODE_39 = 2] = "CODE_39", r[r.CODE_93 = 3] = "CODE_93", r[r.CODE_128 = 4] = "CODE_128", r[r.DATA_MATRIX = 5] = "DATA_MATRIX", r[r.EAN_8 = 6] = "EAN_8", r[r.EAN_13 = 7] = "EAN_13", r[r.ITF = 8] = "ITF", r[r.MAXICODE = 9] = "MAXICODE", r[r.PDF_417 = 10] = "PDF_417", r[r.QR_CODE = 11] = "QR_CODE", r[r.RSS_14 = 12] = "RSS_14", r[r.RSS_EXPANDED = 13] = "RSS_EXPANDED", r[r.UPC_A = 14] = "UPC_A", r[r.UPC_E = 15] = "UPC_E", r[r.UPC_EAN_EXTENSION = 16] = "UPC_EAN_EXTENSION";
})(Bn || (Bn = {}));
L.default = Bn;
var de = {};
Object.defineProperty(de, "__esModule", { value: !0 });
var Fn;
(function(r) {
  r[r.OTHER = 0] = "OTHER", r[r.ORIENTATION = 1] = "ORIENTATION", r[r.BYTE_SEGMENTS = 2] = "BYTE_SEGMENTS", r[r.ERROR_CORRECTION_LEVEL = 3] = "ERROR_CORRECTION_LEVEL", r[r.ISSUE_NUMBER = 4] = "ISSUE_NUMBER", r[r.SUGGESTED_PRICE = 5] = "SUGGESTED_PRICE", r[r.POSSIBLE_COUNTRY = 6] = "POSSIBLE_COUNTRY", r[r.UPC_EAN_EXTENSION = 7] = "UPC_EAN_EXTENSION", r[r.PDF417_EXTRA_METADATA = 8] = "PDF417_EXTRA_METADATA", r[r.STRUCTURED_APPEND_SEQUENCE = 9] = "STRUCTURED_APPEND_SEQUENCE", r[r.STRUCTURED_APPEND_PARITY = 10] = "STRUCTURED_APPEND_PARITY";
})(Fn || (Fn = {}));
de.default = Fn;
var Gt = {}, ke = {};
Object.defineProperty(ke, "__esModule", { value: !0 });
var Qu = function() {
  function r(e, t, n, a, i, o) {
    i === void 0 && (i = -1), o === void 0 && (o = -1), this.rawBytes = e, this.text = t, this.byteSegments = n, this.ecLevel = a, this.structuredAppendSequenceNumber = i, this.structuredAppendParity = o, this.numBits = e == null ? 0 : 8 * e.length;
  }
  return r.prototype.getRawBytes = function() {
    return this.rawBytes;
  }, r.prototype.getNumBits = function() {
    return this.numBits;
  }, r.prototype.setNumBits = function(e) {
    this.numBits = e;
  }, r.prototype.getText = function() {
    return this.text;
  }, r.prototype.getByteSegments = function() {
    return this.byteSegments;
  }, r.prototype.getECLevel = function() {
    return this.ecLevel;
  }, r.prototype.getErrorsCorrected = function() {
    return this.errorsCorrected;
  }, r.prototype.setErrorsCorrected = function(e) {
    this.errorsCorrected = e;
  }, r.prototype.getErasures = function() {
    return this.erasures;
  }, r.prototype.setErasures = function(e) {
    this.erasures = e;
  }, r.prototype.getOther = function() {
    return this.other;
  }, r.prototype.setOther = function(e) {
    this.other = e;
  }, r.prototype.hasStructuredAppend = function() {
    return this.structuredAppendParity >= 0 && this.structuredAppendSequenceNumber >= 0;
  }, r.prototype.getStructuredAppendParity = function() {
    return this.structuredAppendParity;
  }, r.prototype.getStructuredAppendSequenceNumber = function() {
    return this.structuredAppendSequenceNumber;
  }, r;
}();
ke.default = Qu;
var Ce = {}, Qe = {}, Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
var Ju = N, ef = function() {
  function r() {
  }
  return r.prototype.exp = function(e) {
    return this.expTable[e];
  }, r.prototype.log = function(e) {
    if (e === 0)
      throw new Ju.default();
    return this.logTable[e];
  }, r.addOrSubtract = function(e, t) {
    return e ^ t;
  }, r;
}();
Ir.default = ef;
Object.defineProperty(Qe, "__esModule", { value: !0 });
var Ht = Ir, hi = j, He = N, tf = function() {
  function r(e, t) {
    if (t.length === 0)
      throw new He.default();
    this.field = e;
    var n = t.length;
    if (n > 1 && t[0] === 0) {
      for (var a = 1; a < n && t[a] === 0; )
        a++;
      a === n ? this.coefficients = Int32Array.from([0]) : (this.coefficients = new Int32Array(n - a), hi.default.arraycopy(t, a, this.coefficients, 0, this.coefficients.length));
    } else
      this.coefficients = t;
  }
  return r.prototype.getCoefficients = function() {
    return this.coefficients;
  }, r.prototype.getDegree = function() {
    return this.coefficients.length - 1;
  }, r.prototype.isZero = function() {
    return this.coefficients[0] === 0;
  }, r.prototype.getCoefficient = function(e) {
    return this.coefficients[this.coefficients.length - 1 - e];
  }, r.prototype.evaluateAt = function(e) {
    if (e === 0)
      return this.getCoefficient(0);
    var t = this.coefficients, n;
    if (e === 1) {
      n = 0;
      for (var a = 0, i = t.length; a !== i; a++) {
        var o = t[a];
        n = Ht.default.addOrSubtract(n, o);
      }
      return n;
    }
    n = t[0];
    for (var u = t.length, f = this.field, a = 1; a < u; a++)
      n = Ht.default.addOrSubtract(f.multiply(e, n), t[a]);
    return n;
  }, r.prototype.addOrSubtract = function(e) {
    if (!this.field.equals(e.field))
      throw new He.default("GenericGFPolys do not have same GenericGF field");
    if (this.isZero())
      return e;
    if (e.isZero())
      return this;
    var t = this.coefficients, n = e.coefficients;
    if (t.length > n.length) {
      var a = t;
      t = n, n = a;
    }
    var i = new Int32Array(n.length), o = n.length - t.length;
    hi.default.arraycopy(n, 0, i, 0, o);
    for (var u = o; u < n.length; u++)
      i[u] = Ht.default.addOrSubtract(t[u - o], n[u]);
    return new r(this.field, i);
  }, r.prototype.multiply = function(e) {
    if (!this.field.equals(e.field))
      throw new He.default("GenericGFPolys do not have same GenericGF field");
    if (this.isZero() || e.isZero())
      return this.field.getZero();
    for (var t = this.coefficients, n = t.length, a = e.coefficients, i = a.length, o = new Int32Array(n + i - 1), u = this.field, f = 0; f < n; f++)
      for (var l = t[f], c = 0; c < i; c++)
        o[f + c] = Ht.default.addOrSubtract(o[f + c], u.multiply(l, a[c]));
    return new r(u, o);
  }, r.prototype.multiplyScalar = function(e) {
    if (e === 0)
      return this.field.getZero();
    if (e === 1)
      return this;
    for (var t = this.coefficients.length, n = this.field, a = new Int32Array(t), i = this.coefficients, o = 0; o < t; o++)
      a[o] = n.multiply(i[o], e);
    return new r(n, a);
  }, r.prototype.multiplyByMonomial = function(e, t) {
    if (e < 0)
      throw new He.default();
    if (t === 0)
      return this.field.getZero();
    for (var n = this.coefficients, a = n.length, i = new Int32Array(a + e), o = this.field, u = 0; u < a; u++)
      i[u] = o.multiply(n[u], t);
    return new r(o, i);
  }, r.prototype.divide = function(e) {
    if (!this.field.equals(e.field))
      throw new He.default("GenericGFPolys do not have same GenericGF field");
    if (e.isZero())
      throw new He.default("Divide by 0");
    for (var t = this.field, n = t.getZero(), a = this, i = e.getCoefficient(e.getDegree()), o = t.inverse(i); a.getDegree() >= e.getDegree() && !a.isZero(); ) {
      var u = a.getDegree() - e.getDegree(), f = t.multiply(a.getCoefficient(a.getDegree()), o), l = e.multiplyByMonomial(u, f), c = t.buildMonomial(u, f);
      n = n.addOrSubtract(c), a = a.addOrSubtract(l);
    }
    return [n, a];
  }, r.prototype.toString = function() {
    for (var e = "", t = this.getDegree(); t >= 0; t--) {
      var n = this.getCoefficient(t);
      if (n !== 0) {
        if (n < 0 ? (e += " - ", n = -n) : e.length > 0 && (e += " + "), t === 0 || n !== 1) {
          var a = this.field.log(n);
          a === 0 ? e += "1" : a === 1 ? e += "a" : (e += "a^", e += a);
        }
        t !== 0 && (t === 1 ? e += "x" : (e += "x^", e += t));
      }
    }
    return e;
  }, r;
}();
Qe.default = tf;
var Et = {}, rf = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Et, "__esModule", { value: !0 });
var nf = z, af = function(r) {
  rf(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(nf.default);
Et.default = af;
var of = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Ce, "__esModule", { value: !0 });
var ln = Qe, uf = Ir, ff = ce, lf = N, cf = Et, df = function(r) {
  of(e, r);
  function e(t, n, a) {
    var i = r.call(this) || this;
    i.primitive = t, i.size = n, i.generatorBase = a;
    for (var o = new Int32Array(n), u = 1, f = 0; f < n; f++)
      o[f] = u, u *= 2, u >= n && (u ^= t, u &= n - 1);
    i.expTable = o;
    for (var l = new Int32Array(n), f = 0; f < n - 1; f++)
      l[o[f]] = f;
    return i.logTable = l, i.zero = new ln.default(i, Int32Array.from([0])), i.one = new ln.default(i, Int32Array.from([1])), i;
  }
  return e.prototype.getZero = function() {
    return this.zero;
  }, e.prototype.getOne = function() {
    return this.one;
  }, e.prototype.buildMonomial = function(t, n) {
    if (t < 0)
      throw new lf.default();
    if (n === 0)
      return this.zero;
    var a = new Int32Array(t + 1);
    return a[0] = n, new ln.default(this, a);
  }, e.prototype.inverse = function(t) {
    if (t === 0)
      throw new cf.default();
    return this.expTable[this.size - this.logTable[t] - 1];
  }, e.prototype.multiply = function(t, n) {
    return t === 0 || n === 0 ? 0 : this.expTable[(this.logTable[t] + this.logTable[n]) % (this.size - 1)];
  }, e.prototype.getSize = function() {
    return this.size;
  }, e.prototype.getGeneratorBase = function() {
    return this.generatorBase;
  }, e.prototype.toString = function() {
    return "GF(0x" + ff.default.toHexString(this.primitive) + "," + this.size + ")";
  }, e.prototype.equals = function(t) {
    return t === this;
  }, e.AZTEC_DATA_12 = new e(4201, 4096, 1), e.AZTEC_DATA_10 = new e(1033, 1024, 1), e.AZTEC_DATA_6 = new e(67, 64, 1), e.AZTEC_PARAM = new e(19, 16, 1), e.QR_CODE_FIELD_256 = new e(285, 256, 0), e.DATA_MATRIX_FIELD_256 = new e(301, 256, 1), e.AZTEC_DATA_8 = e.DATA_MATRIX_FIELD_256, e.MAXICODE_FIELD_64 = e.AZTEC_DATA_6, e;
}(uf.default);
Ce.default = df;
var Ue = {}, Or = {}, sf = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Or, "__esModule", { value: !0 });
var vf = z, hf = function(r) {
  sf(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(vf.default);
Or.default = hf;
var xe = {}, xf = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(xe, "__esModule", { value: !0 });
var pf = z, _f = function(r) {
  xf(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(pf.default);
xe.default = _f;
Object.defineProperty(Ue, "__esModule", { value: !0 });
var gf = Ce, xi = Qe, Vt = Or, yf = xe, Ef = function() {
  function r(e) {
    this.field = e;
  }
  return r.prototype.decode = function(e, t) {
    for (var n = this.field, a = new xi.default(n, e), i = new Int32Array(t), o = !0, u = 0; u < t; u++) {
      var f = a.evaluateAt(n.exp(u + n.getGeneratorBase()));
      i[i.length - 1 - u] = f, f !== 0 && (o = !1);
    }
    if (!o)
      for (var l = new xi.default(n, i), c = this.runEuclideanAlgorithm(n.buildMonomial(t, 1), l, t), d = c[0], s = c[1], v = this.findErrorLocations(d), h = this.findErrorMagnitudes(s, v), u = 0; u < v.length; u++) {
        var x = e.length - 1 - n.log(v[u]);
        if (x < 0)
          throw new Vt.default("Bad error location");
        e[x] = gf.default.addOrSubtract(e[x], h[u]);
      }
  }, r.prototype.runEuclideanAlgorithm = function(e, t, n) {
    if (e.getDegree() < t.getDegree()) {
      var a = e;
      e = t, t = a;
    }
    for (var i = this.field, o = e, u = t, f = i.getZero(), l = i.getOne(); u.getDegree() >= (n / 2 | 0); ) {
      var c = o, d = f;
      if (o = u, f = l, o.isZero())
        throw new Vt.default("r_{i-1} was zero");
      u = c;
      for (var s = i.getZero(), v = o.getCoefficient(o.getDegree()), h = i.inverse(v); u.getDegree() >= o.getDegree() && !u.isZero(); ) {
        var x = u.getDegree() - o.getDegree(), _ = i.multiply(u.getCoefficient(u.getDegree()), h);
        s = s.addOrSubtract(i.buildMonomial(x, _)), u = u.addOrSubtract(o.multiplyByMonomial(x, _));
      }
      if (l = s.multiply(f).addOrSubtract(d), u.getDegree() >= o.getDegree())
        throw new yf.default("Division algorithm failed to reduce polynomial?");
    }
    var g = l.getCoefficient(0);
    if (g === 0)
      throw new Vt.default("sigmaTilde(0) was zero");
    var y = i.inverse(g), A = l.multiplyScalar(y), w = u.multiplyScalar(y);
    return [A, w];
  }, r.prototype.findErrorLocations = function(e) {
    var t = e.getDegree();
    if (t === 1)
      return Int32Array.from([e.getCoefficient(1)]);
    for (var n = new Int32Array(t), a = 0, i = this.field, o = 1; o < i.getSize() && a < t; o++)
      e.evaluateAt(o) === 0 && (n[a] = i.inverse(o), a++);
    if (a !== t)
      throw new Vt.default("Error locator degree does not match number of roots");
    return n;
  }, r.prototype.findErrorMagnitudes = function(e, t) {
    for (var n = t.length, a = new Int32Array(n), i = this.field, o = 0; o < n; o++) {
      for (var u = i.inverse(t[o]), f = 1, l = 0; l < n; l++)
        if (o !== l) {
          var c = i.multiply(t[l], u), d = (c & 1) === 0 ? c | 1 : c & -2;
          f = i.multiply(f, d);
        }
      a[o] = i.multiply(e.evaluateAt(u), i.inverse(f)), i.getGeneratorBase() !== 0 && (a[o] = i.multiply(a[o], u));
    }
    return a;
  }, r;
}();
Ue.default = Ef;
var pi;
function Af() {
  if (pi)
    return Gt;
  pi = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  var r = ke, e = Ce, t = Ue, n = xe, a = F, i = Yo(), o = ce, u;
  (function(l) {
    l[l.UPPER = 0] = "UPPER", l[l.LOWER = 1] = "LOWER", l[l.MIXED = 2] = "MIXED", l[l.DIGIT = 3] = "DIGIT", l[l.PUNCT = 4] = "PUNCT", l[l.BINARY = 5] = "BINARY";
  })(u || (u = {}));
  var f = function() {
    function l() {
    }
    return l.prototype.decode = function(c) {
      this.ddata = c;
      var d = c.getBits(), s = this.extractBits(d), v = this.correctBits(s), h = l.convertBoolArrayToByteArray(v), x = l.getEncodedData(v), _ = new r.default(h, x, null, null);
      return _.setNumBits(v.length), _;
    }, l.highLevelDecode = function(c) {
      return this.getEncodedData(c);
    }, l.getEncodedData = function(c) {
      for (var d = c.length, s = u.UPPER, v = u.UPPER, h = "", x = 0; x < d; )
        if (v === u.BINARY) {
          if (d - x < 5)
            break;
          var _ = l.readCode(c, x, 5);
          if (x += 5, _ === 0) {
            if (d - x < 11)
              break;
            _ = l.readCode(c, x, 11) + 31, x += 11;
          }
          for (var g = 0; g < _; g++) {
            if (d - x < 8) {
              x = d;
              break;
            }
            var y = l.readCode(c, x, 8);
            h += i.StringUtils.castAsNonUtf8Char(y), x += 8;
          }
          v = s;
        } else {
          var A = v === u.DIGIT ? 4 : 5;
          if (d - x < A)
            break;
          var y = l.readCode(c, x, A);
          x += A;
          var w = l.getCharacter(v, y);
          w.startsWith("CTRL_") ? (s = v, v = l.getTable(w.charAt(5)), w.charAt(6) === "L" && (s = v)) : (h += w, v = s);
        }
      return h;
    }, l.getTable = function(c) {
      switch (c) {
        case "L":
          return u.LOWER;
        case "P":
          return u.PUNCT;
        case "M":
          return u.MIXED;
        case "D":
          return u.DIGIT;
        case "B":
          return u.BINARY;
        case "U":
        default:
          return u.UPPER;
      }
    }, l.getCharacter = function(c, d) {
      switch (c) {
        case u.UPPER:
          return l.UPPER_TABLE[d];
        case u.LOWER:
          return l.LOWER_TABLE[d];
        case u.MIXED:
          return l.MIXED_TABLE[d];
        case u.PUNCT:
          return l.PUNCT_TABLE[d];
        case u.DIGIT:
          return l.DIGIT_TABLE[d];
        default:
          throw new n.default("Bad table");
      }
    }, l.prototype.correctBits = function(c) {
      var d, s;
      this.ddata.getNbLayers() <= 2 ? (s = 6, d = e.default.AZTEC_DATA_6) : this.ddata.getNbLayers() <= 8 ? (s = 8, d = e.default.AZTEC_DATA_8) : this.ddata.getNbLayers() <= 22 ? (s = 10, d = e.default.AZTEC_DATA_10) : (s = 12, d = e.default.AZTEC_DATA_12);
      var v = this.ddata.getNbDatablocks(), h = c.length / s;
      if (h < v)
        throw new a.default();
      for (var x = c.length % s, _ = new Int32Array(h), g = 0; g < h; g++, x += s)
        _[g] = l.readCode(c, x, s);
      try {
        var y = new t.default(d);
        y.decode(_, h - v);
      } catch (D) {
        throw new a.default(D);
      }
      for (var A = (1 << s) - 1, w = 0, g = 0; g < v; g++) {
        var S = _[g];
        if (S === 0 || S === A)
          throw new a.default();
        (S === 1 || S === A - 1) && w++;
      }
      for (var m = new Array(v * s - w), I = 0, g = 0; g < v; g++) {
        var S = _[g];
        if (S === 1 || S === A - 1)
          m.fill(S > 1, I, I + s - 1), I += s - 1;
        else
          for (var O = s - 1; O >= 0; --O)
            m[I++] = (S & 1 << O) !== 0;
      }
      return m;
    }, l.prototype.extractBits = function(c) {
      var d = this.ddata.isCompact(), s = this.ddata.getNbLayers(), v = (d ? 11 : 14) + s * 4, h = new Int32Array(v), x = new Array(this.totalBitsInLayer(s, d));
      if (d)
        for (var _ = 0; _ < h.length; _++)
          h[_] = _;
      else
        for (var g = v + 1 + 2 * o.default.truncDivision(o.default.truncDivision(v, 2) - 1, 15), y = v / 2, A = o.default.truncDivision(g, 2), _ = 0; _ < y; _++) {
          var w = _ + o.default.truncDivision(_, 15);
          h[y - _ - 1] = A - w - 1, h[y + _] = A + w + 1;
        }
      for (var _ = 0, S = 0; _ < s; _++) {
        for (var m = (s - _) * 4 + (d ? 9 : 12), I = _ * 2, O = v - 1 - I, D = 0; D < m; D++)
          for (var R = D * 2, M = 0; M < 2; M++)
            x[S + R + M] = c.get(h[I + M], h[I + D]), x[S + 2 * m + R + M] = c.get(h[I + D], h[O - M]), x[S + 4 * m + R + M] = c.get(h[O - M], h[O - D]), x[S + 6 * m + R + M] = c.get(h[O - D], h[I + M]);
        S += m * 8;
      }
      return x;
    }, l.readCode = function(c, d, s) {
      for (var v = 0, h = d; h < d + s; h++)
        v <<= 1, c[h] && (v |= 1);
      return v;
    }, l.readByte = function(c, d) {
      var s = c.length - d;
      return s >= 8 ? l.readCode(c, d, 8) : l.readCode(c, d, s) << 8 - s;
    }, l.convertBoolArrayToByteArray = function(c) {
      for (var d = new Uint8Array((c.length + 7) / 8), s = 0; s < d.length; s++)
        d[s] = l.readByte(c, 8 * s);
      return d;
    }, l.prototype.totalBitsInLayer = function(c, d) {
      return ((d ? 88 : 112) + 16 * c) * c;
    }, l.UPPER_TABLE = [
      "CTRL_PS",
      " ",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "CTRL_LL",
      "CTRL_ML",
      "CTRL_DL",
      "CTRL_BS"
    ], l.LOWER_TABLE = [
      "CTRL_PS",
      " ",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "CTRL_US",
      "CTRL_ML",
      "CTRL_DL",
      "CTRL_BS"
    ], l.MIXED_TABLE = [
      "CTRL_PS",
      " ",
      "\\1",
      "\\2",
      "\\3",
      "\\4",
      "\\5",
      "\\6",
      "\\7",
      "\b",
      "	",
      `
`,
      "\\13",
      "\f",
      "\r",
      "\\33",
      "\\34",
      "\\35",
      "\\36",
      "\\37",
      "@",
      "\\",
      "^",
      "_",
      "`",
      "|",
      "~",
      "\\177",
      "CTRL_LL",
      "CTRL_UL",
      "CTRL_PL",
      "CTRL_BS"
    ], l.PUNCT_TABLE = [
      "",
      "\r",
      `\r
`,
      ". ",
      ", ",
      ": ",
      "!",
      '"',
      "#",
      "$",
      "%",
      "&",
      "'",
      "(",
      ")",
      "*",
      "+",
      ",",
      "-",
      ".",
      "/",
      ":",
      ";",
      "<",
      "=",
      ">",
      "?",
      "[",
      "]",
      "{",
      "}",
      "CTRL_UL"
    ], l.DIGIT_TABLE = [
      "CTRL_PS",
      " ",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ",",
      ".",
      "CTRL_UL",
      "CTRL_US"
    ], l;
  }();
  return Gt.default = f, Gt;
}
var Rr = {}, k = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
var wf = function() {
  function r() {
  }
  return r.prototype.MathUtils = function() {
  }, r.round = function(e) {
    return e === NaN ? 0 : e <= Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : e >= Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : e + (e < 0 ? -0.5 : 0.5) | 0;
  }, r.distance = function(e, t, n, a) {
    var i = e - n, o = t - a;
    return Math.sqrt(i * i + o * o);
  }, r.sum = function(e) {
    for (var t = 0, n = 0, a = e.length; n !== a; n++) {
      var i = e[n];
      t += i;
    }
    return t;
  }, r;
}();
ae.default = wf;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
var Cf = function() {
  function r() {
  }
  return r.floatToIntBits = function(e) {
    return e;
  }, r.MAX_VALUE = Number.MAX_SAFE_INTEGER, r;
}();
Dr.default = Cf;
Object.defineProperty(k, "__esModule", { value: !0 });
var Sf = ae, _i = Dr, mf = function() {
  function r(e, t) {
    this.x = e, this.y = t;
  }
  return r.prototype.getX = function() {
    return this.x;
  }, r.prototype.getY = function() {
    return this.y;
  }, r.prototype.equals = function(e) {
    if (e instanceof r) {
      var t = e;
      return this.x === t.x && this.y === t.y;
    }
    return !1;
  }, r.prototype.hashCode = function() {
    return 31 * _i.default.floatToIntBits(this.x) + _i.default.floatToIntBits(this.y);
  }, r.prototype.toString = function() {
    return "(" + this.x + "," + this.y + ")";
  }, r.orderBestPatterns = function(e) {
    var t = this.distance(e[0], e[1]), n = this.distance(e[1], e[2]), a = this.distance(e[0], e[2]), i, o, u;
    if (n >= t && n >= a ? (o = e[0], i = e[1], u = e[2]) : a >= n && a >= t ? (o = e[1], i = e[0], u = e[2]) : (o = e[2], i = e[0], u = e[1]), this.crossProductZ(i, o, u) < 0) {
      var f = i;
      i = u, u = f;
    }
    e[0] = i, e[1] = o, e[2] = u;
  }, r.distance = function(e, t) {
    return Sf.default.distance(e.x, e.y, t.x, t.y);
  }, r.crossProductZ = function(e, t, n) {
    var a = t.x, i = t.y;
    return (n.x - a) * (e.y - i) - (n.y - i) * (e.x - a);
  }, r;
}();
k.default = mf;
var Gn = {}, Je = {};
Object.defineProperty(Je, "__esModule", { value: !0 });
var If = function() {
  function r(e, t) {
    this.bits = e, this.points = t;
  }
  return r.prototype.getBits = function() {
    return this.bits;
  }, r.prototype.getPoints = function() {
    return this.points;
  }, r;
}();
Je.default = If;
var Of = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Gn, "__esModule", { value: !0 });
var Rf = Je, Df = function(r) {
  Of(e, r);
  function e(t, n, a, i, o) {
    var u = r.call(this, t, n) || this;
    return u.compact = a, u.nbDatablocks = i, u.nbLayers = o, u;
  }
  return e.prototype.getNbLayers = function() {
    return this.nbLayers;
  }, e.prototype.getNbDatablocks = function() {
    return this.nbDatablocks;
  }, e.prototype.isCompact = function() {
    return this.compact;
  }, e;
}(Rf.default);
Gn.default = Df;
var At = {};
Object.defineProperty(At, "__esModule", { value: !0 });
var _e = k, jt = ae, Ve = T, Tf = function() {
  function r(e, t, n, a) {
    this.image = e, this.height = e.getHeight(), this.width = e.getWidth(), t == null && (t = r.INIT_SIZE), n == null && (n = e.getWidth() / 2 | 0), a == null && (a = e.getHeight() / 2 | 0);
    var i = t / 2 | 0;
    if (this.leftInit = n - i, this.rightInit = n + i, this.upInit = a - i, this.downInit = a + i, this.upInit < 0 || this.leftInit < 0 || this.downInit >= this.height || this.rightInit >= this.width)
      throw new Ve.default();
  }
  return r.prototype.detect = function() {
    for (var e = this.leftInit, t = this.rightInit, n = this.upInit, a = this.downInit, i = !1, o = !0, u = !1, f = !1, l = !1, c = !1, d = !1, s = this.width, v = this.height; o; ) {
      o = !1;
      for (var h = !0; (h || !f) && t < s; )
        h = this.containsBlackPoint(n, a, t, !1), h ? (t++, o = !0, f = !0) : f || t++;
      if (t >= s) {
        i = !0;
        break;
      }
      for (var x = !0; (x || !l) && a < v; )
        x = this.containsBlackPoint(e, t, a, !0), x ? (a++, o = !0, l = !0) : l || a++;
      if (a >= v) {
        i = !0;
        break;
      }
      for (var _ = !0; (_ || !c) && e >= 0; )
        _ = this.containsBlackPoint(n, a, e, !1), _ ? (e--, o = !0, c = !0) : c || e--;
      if (e < 0) {
        i = !0;
        break;
      }
      for (var g = !0; (g || !d) && n >= 0; )
        g = this.containsBlackPoint(e, t, n, !0), g ? (n--, o = !0, d = !0) : d || n--;
      if (n < 0) {
        i = !0;
        break;
      }
      o && (u = !0);
    }
    if (!i && u) {
      for (var y = t - e, A = null, w = 1; A === null && w < y; w++)
        A = this.getBlackPointOnSegment(e, a - w, e + w, a);
      if (A == null)
        throw new Ve.default();
      for (var S = null, w = 1; S === null && w < y; w++)
        S = this.getBlackPointOnSegment(e, n + w, e + w, n);
      if (S == null)
        throw new Ve.default();
      for (var m = null, w = 1; m === null && w < y; w++)
        m = this.getBlackPointOnSegment(t, n + w, t - w, n);
      if (m == null)
        throw new Ve.default();
      for (var I = null, w = 1; I === null && w < y; w++)
        I = this.getBlackPointOnSegment(t, a - w, t - w, a);
      if (I == null)
        throw new Ve.default();
      return this.centerEdges(I, A, m, S);
    } else
      throw new Ve.default();
  }, r.prototype.getBlackPointOnSegment = function(e, t, n, a) {
    for (var i = jt.default.round(jt.default.distance(e, t, n, a)), o = (n - e) / i, u = (a - t) / i, f = this.image, l = 0; l < i; l++) {
      var c = jt.default.round(e + l * o), d = jt.default.round(t + l * u);
      if (f.get(c, d))
        return new _e.default(c, d);
    }
    return null;
  }, r.prototype.centerEdges = function(e, t, n, a) {
    var i = e.getX(), o = e.getY(), u = t.getX(), f = t.getY(), l = n.getX(), c = n.getY(), d = a.getX(), s = a.getY(), v = r.CORR;
    return i < this.width / 2 ? [
      new _e.default(d - v, s + v),
      new _e.default(u + v, f + v),
      new _e.default(l - v, c - v),
      new _e.default(i + v, o - v)
    ] : [
      new _e.default(d + v, s + v),
      new _e.default(u + v, f - v),
      new _e.default(l - v, c + v),
      new _e.default(i - v, o - v)
    ];
  }, r.prototype.containsBlackPoint = function(e, t, n, a) {
    var i = this.image;
    if (a) {
      for (var o = e; o <= t; o++)
        if (i.get(o, n))
          return !0;
    } else
      for (var u = e; u <= t; u++)
        if (i.get(n, u))
          return !0;
    return !1;
  }, r.INIT_SIZE = 10, r.CORR = 1, r;
}();
At.default = Tf;
var et = {}, Tr = {}, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
var gi = T, Pf = function() {
  function r() {
  }
  return r.checkAndNudgePoints = function(e, t) {
    for (var n = e.getWidth(), a = e.getHeight(), i = !0, o = 0; o < t.length && i; o += 2) {
      var u = Math.floor(t[o]), f = Math.floor(t[o + 1]);
      if (u < -1 || u > n || f < -1 || f > a)
        throw new gi.default();
      i = !1, u === -1 ? (t[o] = 0, i = !0) : u === n && (t[o] = n - 1, i = !0), f === -1 ? (t[o + 1] = 0, i = !0) : f === a && (t[o + 1] = a - 1, i = !0);
    }
    i = !0;
    for (var o = t.length - 2; o >= 0 && i; o -= 2) {
      var u = Math.floor(t[o]), f = Math.floor(t[o + 1]);
      if (u < -1 || u > n || f < -1 || f > a)
        throw new gi.default();
      i = !1, u === -1 ? (t[o] = 0, i = !0) : u === n && (t[o] = n - 1, i = !0), f === -1 ? (t[o + 1] = 0, i = !0) : f === a && (t[o + 1] = a - 1, i = !0);
    }
  }, r;
}();
Pr.default = Pf;
var wt = {};
Object.defineProperty(wt, "__esModule", { value: !0 });
var bf = function() {
  function r(e, t, n, a, i, o, u, f, l) {
    this.a11 = e, this.a21 = t, this.a31 = n, this.a12 = a, this.a22 = i, this.a32 = o, this.a13 = u, this.a23 = f, this.a33 = l;
  }
  return r.quadrilateralToQuadrilateral = function(e, t, n, a, i, o, u, f, l, c, d, s, v, h, x, _) {
    var g = r.quadrilateralToSquare(e, t, n, a, i, o, u, f), y = r.squareToQuadrilateral(l, c, d, s, v, h, x, _);
    return y.times(g);
  }, r.prototype.transformPoints = function(e) {
    for (var t = e.length, n = this.a11, a = this.a12, i = this.a13, o = this.a21, u = this.a22, f = this.a23, l = this.a31, c = this.a32, d = this.a33, s = 0; s < t; s += 2) {
      var v = e[s], h = e[s + 1], x = i * v + f * h + d;
      e[s] = (n * v + o * h + l) / x, e[s + 1] = (a * v + u * h + c) / x;
    }
  }, r.prototype.transformPointsWithValues = function(e, t) {
    for (var n = this.a11, a = this.a12, i = this.a13, o = this.a21, u = this.a22, f = this.a23, l = this.a31, c = this.a32, d = this.a33, s = e.length, v = 0; v < s; v++) {
      var h = e[v], x = t[v], _ = i * h + f * x + d;
      e[v] = (n * h + o * x + l) / _, t[v] = (a * h + u * x + c) / _;
    }
  }, r.squareToQuadrilateral = function(e, t, n, a, i, o, u, f) {
    var l = e - n + i - u, c = t - a + o - f;
    if (l === 0 && c === 0)
      return new r(n - e, i - n, e, a - t, o - a, t, 0, 0, 1);
    var d = n - i, s = u - i, v = a - o, h = f - o, x = d * h - s * v, _ = (l * h - s * c) / x, g = (d * c - l * v) / x;
    return new r(n - e + _ * n, u - e + g * u, e, a - t + _ * a, f - t + g * f, t, _, g, 1);
  }, r.quadrilateralToSquare = function(e, t, n, a, i, o, u, f) {
    return r.squareToQuadrilateral(e, t, n, a, i, o, u, f).buildAdjoint();
  }, r.prototype.buildAdjoint = function() {
    return new r(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21);
  }, r.prototype.times = function(e) {
    return new r(this.a11 * e.a11 + this.a21 * e.a12 + this.a31 * e.a13, this.a11 * e.a21 + this.a21 * e.a22 + this.a31 * e.a23, this.a11 * e.a31 + this.a21 * e.a32 + this.a31 * e.a33, this.a12 * e.a11 + this.a22 * e.a12 + this.a32 * e.a13, this.a12 * e.a21 + this.a22 * e.a22 + this.a32 * e.a23, this.a12 * e.a31 + this.a22 * e.a32 + this.a32 * e.a33, this.a13 * e.a11 + this.a23 * e.a12 + this.a33 * e.a13, this.a13 * e.a21 + this.a23 * e.a22 + this.a33 * e.a23, this.a13 * e.a31 + this.a23 * e.a32 + this.a33 * e.a33);
  }, r;
}();
wt.default = bf;
var Nf = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Tr, "__esModule", { value: !0 });
var yi = Pr, Mf = fe, Bf = wt, Ei = T, Ff = function(r) {
  Nf(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e.prototype.sampleGrid = function(t, n, a, i, o, u, f, l, c, d, s, v, h, x, _, g, y, A, w) {
    var S = Bf.default.quadrilateralToQuadrilateral(i, o, u, f, l, c, d, s, v, h, x, _, g, y, A, w);
    return this.sampleGridWithTransform(t, n, a, S);
  }, e.prototype.sampleGridWithTransform = function(t, n, a, i) {
    if (n <= 0 || a <= 0)
      throw new Ei.default();
    for (var o = new Mf.default(n, a), u = new Float32Array(2 * n), f = 0; f < a; f++) {
      for (var l = u.length, c = f + 0.5, d = 0; d < l; d += 2)
        u[d] = d / 2 + 0.5, u[d + 1] = c;
      i.transformPoints(u), yi.default.checkAndNudgePoints(t, u);
      try {
        for (var d = 0; d < l; d += 2)
          t.get(Math.floor(u[d]), Math.floor(u[d + 1])) && o.set(d / 2, f);
      } catch {
        throw new Ei.default();
      }
    }
    return o;
  }, e;
}(yi.default);
Tr.default = Ff;
Object.defineProperty(et, "__esModule", { value: !0 });
var Lf = Tr, $f = function() {
  function r() {
  }
  return r.setGridSampler = function(e) {
    r.gridSampler = e;
  }, r.getInstance = function() {
    return r.gridSampler;
  }, r.gridSampler = new Lf.default(), r;
}();
et.default = $f;
Object.defineProperty(Rr, "__esModule", { value: !0 });
var ye = k, kf = Gn, ie = ae, Ai = At, Uf = Ce, Gf = Ue, Wt = T, Hf = et, wi = ce, Q = function() {
  function r(e, t) {
    this.x = e, this.y = t;
  }
  return r.prototype.toResultPoint = function() {
    return new ye.default(this.getX(), this.getY());
  }, r.prototype.getX = function() {
    return this.x;
  }, r.prototype.getY = function() {
    return this.y;
  }, r;
}();
Rr.Point = Q;
var Vf = function() {
  function r(e) {
    this.EXPECTED_CORNER_BITS = new Int32Array([
      3808,
      476,
      2107,
      1799
    ]), this.image = e;
  }
  return r.prototype.detect = function() {
    return this.detectMirror(!1);
  }, r.prototype.detectMirror = function(e) {
    var t = this.getMatrixCenter(), n = this.getBullsEyeCorners(t);
    if (e) {
      var a = n[0];
      n[0] = n[2], n[2] = a;
    }
    this.extractParameters(n);
    var i = this.sampleGrid(this.image, n[this.shift % 4], n[(this.shift + 1) % 4], n[(this.shift + 2) % 4], n[(this.shift + 3) % 4]), o = this.getMatrixCornerPoints(n);
    return new kf.default(i, o, this.compact, this.nbDataBlocks, this.nbLayers);
  }, r.prototype.extractParameters = function(e) {
    if (!this.isValidPoint(e[0]) || !this.isValidPoint(e[1]) || !this.isValidPoint(e[2]) || !this.isValidPoint(e[3]))
      throw new Wt.default();
    var t = 2 * this.nbCenterLayers, n = new Int32Array([
      this.sampleLine(e[0], e[1], t),
      this.sampleLine(e[1], e[2], t),
      this.sampleLine(e[2], e[3], t),
      this.sampleLine(e[3], e[0], t)
    ]);
    this.shift = this.getRotation(n, t);
    for (var a = 0, i = 0; i < 4; i++) {
      var o = n[(this.shift + i) % 4];
      this.compact ? (a <<= 7, a += o >> 1 & 127) : (a <<= 10, a += (o >> 2 & 31 << 5) + (o >> 1 & 31));
    }
    var u = this.getCorrectedParameterData(a, this.compact);
    this.compact ? (this.nbLayers = (u >> 6) + 1, this.nbDataBlocks = (u & 63) + 1) : (this.nbLayers = (u >> 11) + 1, this.nbDataBlocks = (u & 2047) + 1);
  }, r.prototype.getRotation = function(e, t) {
    var n = 0;
    e.forEach(function(i, o, u) {
      var f = (i >> t - 2 << 1) + (i & 1);
      n = (n << 3) + f;
    }), n = ((n & 1) << 11) + (n >> 1);
    for (var a = 0; a < 4; a++)
      if (wi.default.bitCount(n ^ this.EXPECTED_CORNER_BITS[a]) <= 2)
        return a;
    throw new Wt.default();
  }, r.prototype.getCorrectedParameterData = function(e, t) {
    var n, a;
    t ? (n = 7, a = 2) : (n = 10, a = 4);
    for (var i = n - a, o = new Int32Array(n), u = n - 1; u >= 0; --u)
      o[u] = e & 15, e >>= 4;
    try {
      var f = new Gf.default(Uf.default.AZTEC_PARAM);
      f.decode(o, i);
    } catch {
      throw new Wt.default();
    }
    for (var l = 0, u = 0; u < a; u++)
      l = (l << 4) + o[u];
    return l;
  }, r.prototype.getBullsEyeCorners = function(e) {
    var t = e, n = e, a = e, i = e, o = !0;
    for (this.nbCenterLayers = 1; this.nbCenterLayers < 9; this.nbCenterLayers++) {
      var u = this.getFirstDifferent(t, o, 1, -1), f = this.getFirstDifferent(n, o, 1, 1), l = this.getFirstDifferent(a, o, -1, 1), c = this.getFirstDifferent(i, o, -1, -1);
      if (this.nbCenterLayers > 2) {
        var d = this.distancePoint(c, u) * this.nbCenterLayers / (this.distancePoint(i, t) * (this.nbCenterLayers + 2));
        if (d < 0.75 || d > 1.25 || !this.isWhiteOrBlackRectangle(u, f, l, c))
          break;
      }
      t = u, n = f, a = l, i = c, o = !o;
    }
    if (this.nbCenterLayers !== 5 && this.nbCenterLayers !== 7)
      throw new Wt.default();
    this.compact = this.nbCenterLayers === 5;
    var s = new ye.default(t.getX() + 0.5, t.getY() - 0.5), v = new ye.default(n.getX() + 0.5, n.getY() + 0.5), h = new ye.default(a.getX() - 0.5, a.getY() + 0.5), x = new ye.default(i.getX() - 0.5, i.getY() - 0.5);
    return this.expandSquare([s, v, h, x], 2 * this.nbCenterLayers - 3, 2 * this.nbCenterLayers);
  }, r.prototype.getMatrixCenter = function() {
    var e, t, n, a;
    try {
      var i = new Ai.default(this.image).detect();
      e = i[0], t = i[1], n = i[2], a = i[3];
    } catch {
      var o = this.image.getWidth() / 2, u = this.image.getHeight() / 2;
      e = this.getFirstDifferent(new Q(o + 7, u - 7), !1, 1, -1).toResultPoint(), t = this.getFirstDifferent(new Q(o + 7, u + 7), !1, 1, 1).toResultPoint(), n = this.getFirstDifferent(new Q(o - 7, u + 7), !1, -1, 1).toResultPoint(), a = this.getFirstDifferent(new Q(o - 7, u - 7), !1, -1, -1).toResultPoint();
    }
    var f = ie.default.round((e.getX() + a.getX() + t.getX() + n.getX()) / 4), l = ie.default.round((e.getY() + a.getY() + t.getY() + n.getY()) / 4);
    try {
      var i = new Ai.default(this.image, 15, f, l).detect();
      e = i[0], t = i[1], n = i[2], a = i[3];
    } catch {
      e = this.getFirstDifferent(new Q(f + 7, l - 7), !1, 1, -1).toResultPoint(), t = this.getFirstDifferent(new Q(f + 7, l + 7), !1, 1, 1).toResultPoint(), n = this.getFirstDifferent(new Q(f - 7, l + 7), !1, -1, 1).toResultPoint(), a = this.getFirstDifferent(new Q(f - 7, l - 7), !1, -1, -1).toResultPoint();
    }
    return f = ie.default.round((e.getX() + a.getX() + t.getX() + n.getX()) / 4), l = ie.default.round((e.getY() + a.getY() + t.getY() + n.getY()) / 4), new Q(f, l);
  }, r.prototype.getMatrixCornerPoints = function(e) {
    return this.expandSquare(e, 2 * this.nbCenterLayers, this.getDimension());
  }, r.prototype.sampleGrid = function(e, t, n, a, i) {
    var o = Hf.default.getInstance(), u = this.getDimension(), f = u / 2 - this.nbCenterLayers, l = u / 2 + this.nbCenterLayers;
    return o.sampleGrid(
      e,
      u,
      u,
      f,
      f,
      l,
      f,
      l,
      l,
      f,
      l,
      t.getX(),
      t.getY(),
      n.getX(),
      n.getY(),
      a.getX(),
      a.getY(),
      i.getX(),
      i.getY()
    );
  }, r.prototype.sampleLine = function(e, t, n) {
    for (var a = 0, i = this.distanceResultPoint(e, t), o = i / n, u = e.getX(), f = e.getY(), l = o * (t.getX() - e.getX()) / i, c = o * (t.getY() - e.getY()) / i, d = 0; d < n; d++)
      this.image.get(ie.default.round(u + d * l), ie.default.round(f + d * c)) && (a |= 1 << n - d - 1);
    return a;
  }, r.prototype.isWhiteOrBlackRectangle = function(e, t, n, a) {
    var i = 3;
    e = new Q(e.getX() - i, e.getY() + i), t = new Q(t.getX() - i, t.getY() - i), n = new Q(n.getX() + i, n.getY() - i), a = new Q(a.getX() + i, a.getY() + i);
    var o = this.getColor(a, e);
    if (o === 0)
      return !1;
    var u = this.getColor(e, t);
    return u !== o || (u = this.getColor(t, n), u !== o) ? !1 : (u = this.getColor(n, a), u === o);
  }, r.prototype.getColor = function(e, t) {
    for (var n = this.distancePoint(e, t), a = (t.getX() - e.getX()) / n, i = (t.getY() - e.getY()) / n, o = 0, u = e.getX(), f = e.getY(), l = this.image.get(e.getX(), e.getY()), c = Math.ceil(n), d = 0; d < c; d++)
      u += a, f += i, this.image.get(ie.default.round(u), ie.default.round(f)) !== l && o++;
    var s = o / n;
    return s > 0.1 && s < 0.9 ? 0 : s <= 0.1 === l ? 1 : -1;
  }, r.prototype.getFirstDifferent = function(e, t, n, a) {
    for (var i = e.getX() + n, o = e.getY() + a; this.isValid(i, o) && this.image.get(i, o) === t; )
      i += n, o += a;
    for (i -= n, o -= a; this.isValid(i, o) && this.image.get(i, o) === t; )
      i += n;
    for (i -= n; this.isValid(i, o) && this.image.get(i, o) === t; )
      o += a;
    return o -= a, new Q(i, o);
  }, r.prototype.expandSquare = function(e, t, n) {
    var a = n / (2 * t), i = e[0].getX() - e[2].getX(), o = e[0].getY() - e[2].getY(), u = (e[0].getX() + e[2].getX()) / 2, f = (e[0].getY() + e[2].getY()) / 2, l = new ye.default(u + a * i, f + a * o), c = new ye.default(u - a * i, f - a * o);
    i = e[1].getX() - e[3].getX(), o = e[1].getY() - e[3].getY(), u = (e[1].getX() + e[3].getX()) / 2, f = (e[1].getY() + e[3].getY()) / 2;
    var d = new ye.default(u + a * i, f + a * o), s = new ye.default(u - a * i, f - a * o), v = [l, d, c, s];
    return v;
  }, r.prototype.isValid = function(e, t) {
    return e >= 0 && e < this.image.getWidth() && t > 0 && t < this.image.getHeight();
  }, r.prototype.isValidPoint = function(e) {
    var t = ie.default.round(e.getX()), n = ie.default.round(e.getY());
    return this.isValid(t, n);
  }, r.prototype.distancePoint = function(e, t) {
    return ie.default.distance(e.getX(), e.getY(), t.getX(), t.getY());
  }, r.prototype.distanceResultPoint = function(e, t) {
    return ie.default.distance(e.getX(), e.getY(), t.getX(), t.getY());
  }, r.prototype.getDimension = function() {
    return this.compact ? 4 * this.nbLayers + 11 : this.nbLayers <= 4 ? 4 * this.nbLayers + 15 : 4 * this.nbLayers + 2 * (wi.default.truncDivision(this.nbLayers - 4, 8) + 1) + 15;
  }, r;
}();
Rr.default = Vf;
var Ci;
function Hn() {
  if (Ci)
    return kt;
  Ci = 1, Object.defineProperty(kt, "__esModule", { value: !0 });
  var r = J, e = L, t = Y, n = de, a = j, i = Af(), o = Rr, u = function() {
    function f() {
    }
    return f.prototype.decode = function(l, c) {
      c === void 0 && (c = null);
      var d = null, s = new o.default(l.getBlackMatrix()), v = null, h = null;
      try {
        var x = s.detectMirror(!1);
        v = x.getPoints(), this.reportFoundResultPoints(c, v), h = new i.default().decode(x);
      } catch (A) {
        d = A;
      }
      if (h == null)
        try {
          var x = s.detectMirror(!0);
          v = x.getPoints(), this.reportFoundResultPoints(c, v), h = new i.default().decode(x);
        } catch (A) {
          throw d != null ? d : A;
        }
      var _ = new r.default(h.getText(), h.getRawBytes(), h.getNumBits(), v, e.default.AZTEC, a.default.currentTimeMillis()), g = h.getByteSegments();
      g != null && _.putMetadata(n.default.BYTE_SEGMENTS, g);
      var y = h.getECLevel();
      return y != null && _.putMetadata(n.default.ERROR_CORRECTION_LEVEL, y), _;
    }, f.prototype.reportFoundResultPoints = function(l, c) {
      if (l != null) {
        var d = l.get(t.default.NEED_RESULT_POINT_CALLBACK);
        d != null && c.forEach(function(s, v, h) {
          d.foundPossibleResultPoint(s);
        });
      }
    }, f.prototype.reset = function() {
    }, f;
  }();
  return kt.default = u, kt;
}
var Si;
function jf() {
  if (Si)
    return Ft;
  Si = 1;
  var r = E && E.__extends || function() {
    var a = function(i, o) {
      return a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, f) {
        u.__proto__ = f;
      } || function(u, f) {
        for (var l in f)
          f.hasOwnProperty(l) && (u[l] = f[l]);
      }, a(i, o);
    };
    return function(i, o) {
      a(i, o);
      function u() {
        this.constructor = i;
      }
      i.prototype = o === null ? Object.create(o) : (u.prototype = o.prototype, new u());
    };
  }();
  Object.defineProperty(Ft, "__esModule", { value: !0 });
  var e = Ee, t = Hn(), n = function(a) {
    r(i, a);
    function i(o) {
      return o === void 0 && (o = 500), a.call(this, new t.default(), o) || this;
    }
    return i;
  }(e.BrowserCodeReader);
  return Ft.BrowserAztecCodeReader = n, Ft;
}
var Vn = {}, Ct = {}, br = {}, se = {};
Object.defineProperty(se, "__esModule", { value: !0 });
var Wf = Ae, Xt = Y, zt = de, cn = k, ut = T, Xf = function() {
  function r() {
  }
  return r.prototype.decode = function(e, t) {
    try {
      return this.doDecode(e, t);
    } catch {
      var n = t && t.get(Xt.default.TRY_HARDER) === !0;
      if (n && e.isRotateSupported()) {
        var a = e.rotateCounterClockwise(), i = this.doDecode(a, t), o = i.getResultMetadata(), u = 270;
        o !== null && o.get(zt.default.ORIENTATION) === !0 && (u = u + o.get(zt.default.ORIENTATION) % 360), i.putMetadata(zt.default.ORIENTATION, u);
        var f = i.getResultPoints();
        if (f !== null)
          for (var l = a.getHeight(), c = 0; c < f.length; c++)
            f[c] = new cn.default(l - f[c].getY() - 1, f[c].getX());
        return i;
      } else
        throw new ut.default();
    }
  }, r.prototype.reset = function() {
  }, r.prototype.doDecode = function(e, t) {
    var n = e.getWidth(), a = e.getHeight(), i = new Wf.default(n), o = t && t.get(Xt.default.TRY_HARDER) === !0, u = Math.max(1, a >> (o ? 8 : 5)), f;
    o ? f = a : f = 15;
    for (var l = Math.trunc(a / 2), c = 0; c < f; c++) {
      var d = Math.trunc((c + 1) / 2), s = (c & 1) === 0, v = l + u * (s ? d : -d);
      if (v < 0 || v >= a)
        break;
      try {
        i = e.getBlackRow(v, i);
      } catch {
        continue;
      }
      for (var h = function(y) {
        if (y === 1 && (i.reverse(), t && t.get(Xt.default.NEED_RESULT_POINT_CALLBACK) === !0)) {
          var A = /* @__PURE__ */ new Map();
          t.forEach(function(m, I) {
            return A.set(I, m);
          }), A.delete(Xt.default.NEED_RESULT_POINT_CALLBACK), t = A;
        }
        try {
          var w = x.decodeRow(v, i, t);
          if (y === 1) {
            w.putMetadata(zt.default.ORIENTATION, 180);
            var S = w.getResultPoints();
            S !== null && (S[0] = new cn.default(n - S[0].getX() - 1, S[0].getY()), S[1] = new cn.default(n - S[1].getX() - 1, S[1].getY()));
          }
          return { value: w };
        } catch {
        }
      }, x = this, _ = 0; _ < 2; _++) {
        var g = h(_);
        if (typeof g == "object")
          return g.value;
      }
    }
    throw new ut.default();
  }, r.recordPattern = function(e, t, n) {
    for (var a = n.length, i = 0; i < a; i++)
      n[i] = 0;
    var o = e.getSize();
    if (t >= o)
      throw new ut.default();
    for (var u = !e.get(t), f = 0, l = t; l < o; ) {
      if (e.get(l) !== u)
        n[f]++;
      else {
        if (++f === a)
          break;
        n[f] = 1, u = !u;
      }
      l++;
    }
    if (!(f === a || f === a - 1 && l === o))
      throw new ut.default();
  }, r.recordPatternInReverse = function(e, t, n) {
    for (var a = n.length, i = e.get(t); t > 0 && a >= 0; )
      e.get(--t) !== i && (a--, i = !i);
    if (a >= 0)
      throw new ut.default();
    r.recordPattern(e, t + 1, n);
  }, r.patternMatchVariance = function(e, t, n) {
    for (var a = e.length, i = 0, o = 0, u = 0; u < a; u++)
      i += e[u], o += t[u];
    if (i < o)
      return Number.POSITIVE_INFINITY;
    var f = i / o;
    n *= f;
    for (var l = 0, c = 0; c < a; c++) {
      var d = e[c], s = t[c] * f, v = d > s ? d - s : s - d;
      if (v > n)
        return Number.POSITIVE_INFINITY;
      l += v;
    }
    return l / i;
  }, r;
}();
se.default = Xf;
var zf = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), dn = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(br, "__esModule", { value: !0 });
var Yf = L, Zf = ue, Yt = F, ft = T, Kf = se, qf = J, mi = k, Qf = function(r) {
  zf(e, r);
  function e(t, n) {
    t === void 0 && (t = !1), n === void 0 && (n = !1);
    var a = r.call(this) || this;
    return a.usingCheckDigit = t, a.extendedMode = n, a.decodeRowResult = "", a.counters = new Array(9), a;
  }
  return e.prototype.decodeRow = function(t, n, a) {
    var i, o, u, f, l = this.counters;
    l.fill(0), this.decodeRowResult = "";
    var c = e.findAsteriskPattern(n, l), d = n.getNextSet(c[1]), s = n.getSize(), v, h;
    do {
      e.recordPattern(n, d, l);
      var x = e.toNarrowWidePattern(l);
      if (x < 0)
        throw new ft.default();
      v = e.patternToChar(x), this.decodeRowResult += v, h = d;
      try {
        for (var _ = dn(l), g = _.next(); !g.done; g = _.next()) {
          var y = g.value;
          d += y;
        }
      } catch (H) {
        i = { error: H };
      } finally {
        try {
          g && !g.done && (o = _.return) && o.call(_);
        } finally {
          if (i)
            throw i.error;
        }
      }
      d = n.getNextSet(d);
    } while (v !== "*");
    this.decodeRowResult = this.decodeRowResult.substring(0, this.decodeRowResult.length - 1);
    var A = 0;
    try {
      for (var w = dn(l), S = w.next(); !S.done; S = w.next()) {
        var y = S.value;
        A += y;
      }
    } catch (H) {
      u = { error: H };
    } finally {
      try {
        S && !S.done && (f = w.return) && f.call(w);
      } finally {
        if (u)
          throw u.error;
      }
    }
    var m = d - h - A;
    if (d !== s && m * 2 < A)
      throw new ft.default();
    if (this.usingCheckDigit) {
      for (var I = this.decodeRowResult.length - 1, O = 0, D = 0; D < I; D++)
        O += e.ALPHABET_STRING.indexOf(this.decodeRowResult.charAt(D));
      if (this.decodeRowResult.charAt(I) !== e.ALPHABET_STRING.charAt(O % 43))
        throw new Zf.default();
      this.decodeRowResult = this.decodeRowResult.substring(0, I);
    }
    if (this.decodeRowResult.length === 0)
      throw new ft.default();
    var R;
    this.extendedMode ? R = e.decodeExtended(this.decodeRowResult) : R = this.decodeRowResult;
    var M = (c[1] + c[0]) / 2, W = h + A / 2;
    return new qf.default(R, null, 0, [new mi.default(M, t), new mi.default(W, t)], Yf.default.CODE_39, new Date().getTime());
  }, e.findAsteriskPattern = function(t, n) {
    for (var a = t.getSize(), i = t.getNextSet(0), o = 0, u = i, f = !1, l = n.length, c = i; c < a; c++)
      if (t.get(c) !== f)
        n[o]++;
      else {
        if (o === l - 1) {
          if (this.toNarrowWidePattern(n) === e.ASTERISK_ENCODING && t.isRange(Math.max(0, u - Math.floor((c - u) / 2)), u, !1))
            return [u, c];
          u += n[0] + n[1], n.copyWithin(0, 2, 2 + o - 1), n[o - 1] = 0, n[o] = 0, o--;
        } else
          o++;
        n[o] = 1, f = !f;
      }
    throw new ft.default();
  }, e.toNarrowWidePattern = function(t) {
    var n, a, i = t.length, o = 0, u;
    do {
      var f = 2147483647;
      try {
        for (var l = dn(t), c = l.next(); !c.done; c = l.next()) {
          var d = c.value;
          d < f && d > o && (f = d);
        }
      } catch (x) {
        n = { error: x };
      } finally {
        try {
          c && !c.done && (a = l.return) && a.call(l);
        } finally {
          if (n)
            throw n.error;
        }
      }
      o = f, u = 0;
      for (var s = 0, v = 0, h = 0; h < i; h++) {
        var d = t[h];
        d > o && (v |= 1 << i - 1 - h, u++, s += d);
      }
      if (u === 3) {
        for (var h = 0; h < i && u > 0; h++) {
          var d = t[h];
          if (d > o && (u--, d * 2 >= s))
            return -1;
        }
        return v;
      }
    } while (u > 3);
    return -1;
  }, e.patternToChar = function(t) {
    for (var n = 0; n < e.CHARACTER_ENCODINGS.length; n++)
      if (e.CHARACTER_ENCODINGS[n] === t)
        return e.ALPHABET_STRING.charAt(n);
    if (t === e.ASTERISK_ENCODING)
      return "*";
    throw new ft.default();
  }, e.decodeExtended = function(t) {
    for (var n = t.length, a = "", i = 0; i < n; i++) {
      var o = t.charAt(i);
      if (o === "+" || o === "$" || o === "%" || o === "/") {
        var u = t.charAt(i + 1), f = "\0";
        switch (o) {
          case "+":
            if (u >= "A" && u <= "Z")
              f = String.fromCharCode(u.charCodeAt(0) + 32);
            else
              throw new Yt.default();
            break;
          case "$":
            if (u >= "A" && u <= "Z")
              f = String.fromCharCode(u.charCodeAt(0) - 64);
            else
              throw new Yt.default();
            break;
          case "%":
            if (u >= "A" && u <= "E")
              f = String.fromCharCode(u.charCodeAt(0) - 38);
            else if (u >= "F" && u <= "J")
              f = String.fromCharCode(u.charCodeAt(0) - 11);
            else if (u >= "K" && u <= "O")
              f = String.fromCharCode(u.charCodeAt(0) + 16);
            else if (u >= "P" && u <= "T")
              f = String.fromCharCode(u.charCodeAt(0) + 43);
            else if (u === "U")
              f = "\0";
            else if (u === "V")
              f = "@";
            else if (u === "W")
              f = "`";
            else if (u === "X" || u === "Y" || u === "Z")
              f = "\x7F";
            else
              throw new Yt.default();
            break;
          case "/":
            if (u >= "A" && u <= "O")
              f = String.fromCharCode(u.charCodeAt(0) - 32);
            else if (u === "Z")
              f = ":";
            else
              throw new Yt.default();
            break;
        }
        a += f, i++;
      } else
        a += o;
    }
    return a;
  }, e.ALPHABET_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%", e.CHARACTER_ENCODINGS = [
    52,
    289,
    97,
    352,
    49,
    304,
    112,
    37,
    292,
    100,
    265,
    73,
    328,
    25,
    280,
    88,
    13,
    268,
    76,
    28,
    259,
    67,
    322,
    19,
    274,
    82,
    7,
    262,
    70,
    22,
    385,
    193,
    448,
    145,
    400,
    208,
    133,
    388,
    196,
    168,
    162,
    138,
    42
  ], e.ASTERISK_ENCODING = 148, e;
}(Kf.default);
br.default = Qf;
var Nr = {}, Jf = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Nr, "__esModule", { value: !0 });
var e0 = L, t0 = Y, r0 = J, Ii = k, sn = se, Zt = T, Oi = F, n0 = ue, a0 = function(r) {
  Jf(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e.findStartPattern = function(t) {
    for (var n = t.getSize(), a = t.getNextSet(0), i = 0, o = [0, 0, 0, 0, 0, 0], u = a, f = !1, l = 6, c = a; c < n; c++)
      if (t.get(c) !== f)
        o[i]++;
      else {
        if (i === l - 1) {
          for (var d = e.MAX_AVG_VARIANCE, s = -1, v = e.CODE_START_A; v <= e.CODE_START_C; v++) {
            var h = sn.default.patternMatchVariance(o, e.CODE_PATTERNS[v], e.MAX_INDIVIDUAL_VARIANCE);
            h < d && (d = h, s = v);
          }
          if (s >= 0 && t.isRange(Math.max(0, u - (c - u) / 2), u, !1))
            return [u, c, s];
          u += o[0] + o[1], o.splice(0, 2), o[i - 1] = 0, o[i] = 0, i--;
        } else
          i++;
        o[i] = 1, f = !f;
      }
    throw new Zt.default();
  }, e.decodeCode = function(t, n, a) {
    sn.default.recordPattern(t, a, n);
    for (var i = e.MAX_AVG_VARIANCE, o = -1, u = 0; u < e.CODE_PATTERNS.length; u++) {
      var f = e.CODE_PATTERNS[u], l = this.patternMatchVariance(n, f, e.MAX_INDIVIDUAL_VARIANCE);
      l < i && (i = l, o = u);
    }
    if (o >= 0)
      return o;
    throw new Zt.default();
  }, e.prototype.decodeRow = function(t, n, a) {
    var i = a && a.get(t0.default.ASSUME_GS1) === !0, o = e.findStartPattern(n), u = o[2], f = 0, l = new Uint8Array(20);
    l[f++] = u;
    var c;
    switch (u) {
      case e.CODE_START_A:
        c = e.CODE_CODE_A;
        break;
      case e.CODE_START_B:
        c = e.CODE_CODE_B;
        break;
      case e.CODE_START_C:
        c = e.CODE_CODE_C;
        break;
      default:
        throw new Oi.default();
    }
    for (var d = !1, s = !1, v = "", h = o[0], x = o[1], _ = [0, 0, 0, 0, 0, 0], g = 0, y = 0, A = u, w = 0, S = !0, m = !1, I = !1; !d; ) {
      var O = s;
      switch (s = !1, g = y, y = e.decodeCode(n, _, x), l[f++] = y, y !== e.CODE_STOP && (S = !0), y !== e.CODE_STOP && (w++, A += w * y), h = x, x += _.reduce(function(it, ot) {
        return it + ot;
      }, 0), y) {
        case e.CODE_START_A:
        case e.CODE_START_B:
        case e.CODE_START_C:
          throw new Oi.default();
      }
      switch (c) {
        case e.CODE_CODE_A:
          if (y < 64)
            I === m ? v += String.fromCharCode(" ".charCodeAt(0) + y) : v += String.fromCharCode(" ".charCodeAt(0) + y + 128), I = !1;
          else if (y < 96)
            I === m ? v += String.fromCharCode(y - 64) : v += String.fromCharCode(y + 64), I = !1;
          else
            switch (y !== e.CODE_STOP && (S = !1), y) {
              case e.CODE_FNC_1:
                i && (v.length === 0 ? v += "]C1" : v += String.fromCharCode(29));
                break;
              case e.CODE_FNC_2:
              case e.CODE_FNC_3:
                break;
              case e.CODE_FNC_4_A:
                !m && I ? (m = !0, I = !1) : m && I ? (m = !1, I = !1) : I = !0;
                break;
              case e.CODE_SHIFT:
                s = !0, c = e.CODE_CODE_B;
                break;
              case e.CODE_CODE_B:
                c = e.CODE_CODE_B;
                break;
              case e.CODE_CODE_C:
                c = e.CODE_CODE_C;
                break;
              case e.CODE_STOP:
                d = !0;
                break;
            }
          break;
        case e.CODE_CODE_B:
          if (y < 96)
            I === m ? v += String.fromCharCode(" ".charCodeAt(0) + y) : v += String.fromCharCode(" ".charCodeAt(0) + y + 128), I = !1;
          else
            switch (y !== e.CODE_STOP && (S = !1), y) {
              case e.CODE_FNC_1:
                i && (v.length === 0 ? v += "]C1" : v += String.fromCharCode(29));
                break;
              case e.CODE_FNC_2:
              case e.CODE_FNC_3:
                break;
              case e.CODE_FNC_4_B:
                !m && I ? (m = !0, I = !1) : m && I ? (m = !1, I = !1) : I = !0;
                break;
              case e.CODE_SHIFT:
                s = !0, c = e.CODE_CODE_A;
                break;
              case e.CODE_CODE_A:
                c = e.CODE_CODE_A;
                break;
              case e.CODE_CODE_C:
                c = e.CODE_CODE_C;
                break;
              case e.CODE_STOP:
                d = !0;
                break;
            }
          break;
        case e.CODE_CODE_C:
          if (y < 100)
            y < 10 && (v += "0"), v += y;
          else
            switch (y !== e.CODE_STOP && (S = !1), y) {
              case e.CODE_FNC_1:
                i && (v.length === 0 ? v += "]C1" : v += String.fromCharCode(29));
                break;
              case e.CODE_CODE_A:
                c = e.CODE_CODE_A;
                break;
              case e.CODE_CODE_B:
                c = e.CODE_CODE_B;
                break;
              case e.CODE_STOP:
                d = !0;
                break;
            }
          break;
      }
      O && (c = c === e.CODE_CODE_A ? e.CODE_CODE_B : e.CODE_CODE_A);
    }
    var D = x - h;
    if (x = n.getNextUnset(x), !n.isRange(x, Math.min(n.getSize(), x + (x - h) / 2), !1))
      throw new Zt.default();
    if (A -= w * g, A % 103 !== g)
      throw new n0.default();
    var R = v.length;
    if (R === 0)
      throw new Zt.default();
    R > 0 && S && (c === e.CODE_CODE_C ? v = v.substring(0, R - 2) : v = v.substring(0, R - 1));
    for (var M = (o[1] + o[0]) / 2, W = h + D / 2, H = l.length, ee = new Uint8Array(H), ve = 0; ve < H; ve++)
      ee[ve] = l[ve];
    var at = [new Ii.default(M, t), new Ii.default(W, t)];
    return new r0.default(v, ee, 0, at, e0.default.CODE_128, new Date().getTime());
  }, e.CODE_PATTERNS = [
    [2, 1, 2, 2, 2, 2],
    [2, 2, 2, 1, 2, 2],
    [2, 2, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 3],
    [1, 2, 1, 3, 2, 2],
    [1, 3, 1, 2, 2, 2],
    [1, 2, 2, 2, 1, 3],
    [1, 2, 2, 3, 1, 2],
    [1, 3, 2, 2, 1, 2],
    [2, 2, 1, 2, 1, 3],
    [2, 2, 1, 3, 1, 2],
    [2, 3, 1, 2, 1, 2],
    [1, 1, 2, 2, 3, 2],
    [1, 2, 2, 1, 3, 2],
    [1, 2, 2, 2, 3, 1],
    [1, 1, 3, 2, 2, 2],
    [1, 2, 3, 1, 2, 2],
    [1, 2, 3, 2, 2, 1],
    [2, 2, 3, 2, 1, 1],
    [2, 2, 1, 1, 3, 2],
    [2, 2, 1, 2, 3, 1],
    [2, 1, 3, 2, 1, 2],
    [2, 2, 3, 1, 1, 2],
    [3, 1, 2, 1, 3, 1],
    [3, 1, 1, 2, 2, 2],
    [3, 2, 1, 1, 2, 2],
    [3, 2, 1, 2, 2, 1],
    [3, 1, 2, 2, 1, 2],
    [3, 2, 2, 1, 1, 2],
    [3, 2, 2, 2, 1, 1],
    [2, 1, 2, 1, 2, 3],
    [2, 1, 2, 3, 2, 1],
    [2, 3, 2, 1, 2, 1],
    [1, 1, 1, 3, 2, 3],
    [1, 3, 1, 1, 2, 3],
    [1, 3, 1, 3, 2, 1],
    [1, 1, 2, 3, 1, 3],
    [1, 3, 2, 1, 1, 3],
    [1, 3, 2, 3, 1, 1],
    [2, 1, 1, 3, 1, 3],
    [2, 3, 1, 1, 1, 3],
    [2, 3, 1, 3, 1, 1],
    [1, 1, 2, 1, 3, 3],
    [1, 1, 2, 3, 3, 1],
    [1, 3, 2, 1, 3, 1],
    [1, 1, 3, 1, 2, 3],
    [1, 1, 3, 3, 2, 1],
    [1, 3, 3, 1, 2, 1],
    [3, 1, 3, 1, 2, 1],
    [2, 1, 1, 3, 3, 1],
    [2, 3, 1, 1, 3, 1],
    [2, 1, 3, 1, 1, 3],
    [2, 1, 3, 3, 1, 1],
    [2, 1, 3, 1, 3, 1],
    [3, 1, 1, 1, 2, 3],
    [3, 1, 1, 3, 2, 1],
    [3, 3, 1, 1, 2, 1],
    [3, 1, 2, 1, 1, 3],
    [3, 1, 2, 3, 1, 1],
    [3, 3, 2, 1, 1, 1],
    [3, 1, 4, 1, 1, 1],
    [2, 2, 1, 4, 1, 1],
    [4, 3, 1, 1, 1, 1],
    [1, 1, 1, 2, 2, 4],
    [1, 1, 1, 4, 2, 2],
    [1, 2, 1, 1, 2, 4],
    [1, 2, 1, 4, 2, 1],
    [1, 4, 1, 1, 2, 2],
    [1, 4, 1, 2, 2, 1],
    [1, 1, 2, 2, 1, 4],
    [1, 1, 2, 4, 1, 2],
    [1, 2, 2, 1, 1, 4],
    [1, 2, 2, 4, 1, 1],
    [1, 4, 2, 1, 1, 2],
    [1, 4, 2, 2, 1, 1],
    [2, 4, 1, 2, 1, 1],
    [2, 2, 1, 1, 1, 4],
    [4, 1, 3, 1, 1, 1],
    [2, 4, 1, 1, 1, 2],
    [1, 3, 4, 1, 1, 1],
    [1, 1, 1, 2, 4, 2],
    [1, 2, 1, 1, 4, 2],
    [1, 2, 1, 2, 4, 1],
    [1, 1, 4, 2, 1, 2],
    [1, 2, 4, 1, 1, 2],
    [1, 2, 4, 2, 1, 1],
    [4, 1, 1, 2, 1, 2],
    [4, 2, 1, 1, 1, 2],
    [4, 2, 1, 2, 1, 1],
    [2, 1, 2, 1, 4, 1],
    [2, 1, 4, 1, 2, 1],
    [4, 1, 2, 1, 2, 1],
    [1, 1, 1, 1, 4, 3],
    [1, 1, 1, 3, 4, 1],
    [1, 3, 1, 1, 4, 1],
    [1, 1, 4, 1, 1, 3],
    [1, 1, 4, 3, 1, 1],
    [4, 1, 1, 1, 1, 3],
    [4, 1, 1, 3, 1, 1],
    [1, 1, 3, 1, 4, 1],
    [1, 1, 4, 1, 3, 1],
    [3, 1, 1, 1, 4, 1],
    [4, 1, 1, 1, 3, 1],
    [2, 1, 1, 4, 1, 2],
    [2, 1, 1, 2, 1, 4],
    [2, 1, 1, 2, 3, 2],
    [2, 3, 3, 1, 1, 1, 2]
  ], e.MAX_AVG_VARIANCE = 0.25, e.MAX_INDIVIDUAL_VARIANCE = 0.7, e.CODE_SHIFT = 98, e.CODE_CODE_C = 99, e.CODE_CODE_B = 100, e.CODE_CODE_A = 101, e.CODE_FNC_1 = 102, e.CODE_FNC_2 = 97, e.CODE_FNC_3 = 96, e.CODE_FNC_4_A = 101, e.CODE_FNC_4_B = 100, e.CODE_START_A = 103, e.CODE_START_B = 104, e.CODE_START_C = 105, e.CODE_STOP = 106, e;
}(sn.default);
Nr.default = a0;
var Mr = {}, Br = {}, i0 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), o0 = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Br, "__esModule", { value: !0 });
var Ri = se, u0 = T, f0 = ae, l0 = function(r) {
  i0(e, r);
  function e() {
    var t = r.call(this) || this;
    return t.decodeFinderCounters = new Array(4), t.dataCharacterCounters = new Array(8), t.oddRoundingErrors = new Array(4), t.evenRoundingErrors = new Array(4), t.oddCounts = new Array(t.dataCharacterCounters.length / 2), t.evenCounts = new Array(t.dataCharacterCounters.length / 2), t;
  }
  return e.prototype.getDecodeFinderCounters = function() {
    return this.decodeFinderCounters;
  }, e.prototype.getDataCharacterCounters = function() {
    return this.dataCharacterCounters;
  }, e.prototype.getOddRoundingErrors = function() {
    return this.oddRoundingErrors;
  }, e.prototype.getEvenRoundingErrors = function() {
    return this.evenRoundingErrors;
  }, e.prototype.getOddCounts = function() {
    return this.oddCounts;
  }, e.prototype.getEvenCounts = function() {
    return this.evenCounts;
  }, e.prototype.parseFinderValue = function(t, n) {
    for (var a = 0; a < n.length; a++)
      if (Ri.default.patternMatchVariance(t, n[a], e.MAX_INDIVIDUAL_VARIANCE) < e.MAX_AVG_VARIANCE)
        return a;
    throw new u0.default();
  }, e.count = function(t) {
    return f0.default.sum(new Int32Array(t));
  }, e.increment = function(t, n) {
    for (var a = 0, i = n[0], o = 1; o < t.length; o++)
      n[o] > i && (i = n[o], a = o);
    t[a]++;
  }, e.decrement = function(t, n) {
    for (var a = 0, i = n[0], o = 1; o < t.length; o++)
      n[o] < i && (i = n[o], a = o);
    t[a]--;
  }, e.isFinderPattern = function(t) {
    var n, a, i = t[0] + t[1], o = i + t[2] + t[3], u = i / o;
    if (u >= e.MIN_FINDER_PATTERN_RATIO && u <= e.MAX_FINDER_PATTERN_RATIO) {
      var f = Number.MAX_SAFE_INTEGER, l = Number.MIN_SAFE_INTEGER;
      try {
        for (var c = o0(t), d = c.next(); !d.done; d = c.next()) {
          var s = d.value;
          s > l && (l = s), s < f && (f = s);
        }
      } catch (v) {
        n = { error: v };
      } finally {
        try {
          d && !d.done && (a = c.return) && a.call(c);
        } finally {
          if (n)
            throw n.error;
        }
      }
      return l < 10 * f;
    }
    return !1;
  }, e.MAX_AVG_VARIANCE = 0.2, e.MAX_INDIVIDUAL_VARIANCE = 0.45, e.MIN_FINDER_PATTERN_RATIO = 9.5 / 12, e.MAX_FINDER_PATTERN_RATIO = 12.5 / 14, e;
}(Ri.default);
Br.default = l0;
var jn = {}, St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
var c0 = function() {
  function r(e, t) {
    this.value = e, this.checksumPortion = t;
  }
  return r.prototype.getValue = function() {
    return this.value;
  }, r.prototype.getChecksumPortion = function() {
    return this.checksumPortion;
  }, r.prototype.toString = function() {
    return this.value + "(" + this.checksumPortion + ")";
  }, r.prototype.equals = function(e) {
    if (!(e instanceof r))
      return !1;
    var t = e;
    return this.value === t.value && this.checksumPortion === t.checksumPortion;
  }, r.prototype.hashCode = function() {
    return this.value ^ this.checksumPortion;
  }, r;
}();
St.default = c0;
var d0 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(jn, "__esModule", { value: !0 });
var s0 = St, v0 = function(r) {
  d0(e, r);
  function e(t, n, a) {
    var i = r.call(this, t, n) || this;
    return i.count = 0, i.finderPattern = a, i;
  }
  return e.prototype.getFinderPattern = function() {
    return this.finderPattern;
  }, e.prototype.getCount = function() {
    return this.count;
  }, e.prototype.incrementCount = function() {
    this.count++;
  }, e;
}(s0.default);
jn.default = v0;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
var Di = k, h0 = function() {
  function r(e, t, n, a, i) {
    this.value = e, this.startEnd = t, this.value = e, this.startEnd = t, this.resultPoints = new Array(), this.resultPoints.push(new Di.default(n, i)), this.resultPoints.push(new Di.default(a, i));
  }
  return r.prototype.getValue = function() {
    return this.value;
  }, r.prototype.getStartEnd = function() {
    return this.startEnd;
  }, r.prototype.getResultPoints = function() {
    return this.resultPoints;
  }, r.prototype.equals = function(e) {
    if (!(e instanceof r))
      return !1;
    var t = e;
    return this.value === t.value;
  }, r.prototype.hashCode = function() {
    return this.value;
  }, r;
}();
Fr.default = h0;
var Lr = {}, x0 = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Lr, "__esModule", { value: !0 });
var p0 = function() {
  function r() {
  }
  return r.prototype.RSSUtils = function() {
  }, r.getRSSvalue = function(e, t, n) {
    var a, i, o = 0;
    try {
      for (var u = x0(e), f = u.next(); !f.done; f = u.next()) {
        var l = f.value;
        o += l;
      }
    } catch (y) {
      a = { error: y };
    } finally {
      try {
        f && !f.done && (i = u.return) && i.call(u);
      } finally {
        if (a)
          throw a.error;
      }
    }
    for (var c = 0, d = 0, s = e.length, v = 0; v < s - 1; v++) {
      var h = void 0;
      for (h = 1, d |= 1 << v; h < e[v]; h++, d &= ~(1 << v)) {
        var x = r.combins(o - h - 1, s - v - 2);
        if (n && d === 0 && o - h - (s - v - 1) >= s - v - 1 && (x -= r.combins(o - h - (s - v), s - v - 2)), s - v - 1 > 1) {
          for (var _ = 0, g = o - h - (s - v - 2); g > t; g--)
            _ += r.combins(o - h - g - 1, s - v - 3);
          x -= _ * (s - 1 - v);
        } else
          o - h > t && x--;
        c += x;
      }
      o -= h;
    }
    return c;
  }, r.combins = function(e, t) {
    var n, a;
    e - t > t ? (a = t, n = e - t) : (a = e - t, n = t);
    for (var i = 1, o = 1, u = e; u > n; u--)
      i *= u, o <= a && (i /= o, o++);
    for (; o <= a; )
      i /= o, o++;
    return i;
  }, r;
}();
Lr.default = p0;
var _0 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), vn = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Mr, "__esModule", { value: !0 });
var je = Br, g0 = jn, y0 = J, E0 = Y, te = T, A0 = G, w0 = L, C0 = k, S0 = Fr, Ti = St, hn = ae, Kt = Lr, m0 = j, Pi = se, I0 = function(r) {
  _0(e, r);
  function e() {
    var t = r !== null && r.apply(this, arguments) || this;
    return t.possibleLeftPairs = [], t.possibleRightPairs = [], t;
  }
  return e.prototype.decodeRow = function(t, n, a) {
    var i, o, u, f, l = this.decodePair(n, !1, t, a);
    e.addOrTally(this.possibleLeftPairs, l), n.reverse();
    var c = this.decodePair(n, !0, t, a);
    e.addOrTally(this.possibleRightPairs, c), n.reverse();
    try {
      for (var d = vn(this.possibleLeftPairs), s = d.next(); !s.done; s = d.next()) {
        var v = s.value;
        if (v.getCount() > 1)
          try {
            for (var h = vn(this.possibleRightPairs), x = h.next(); !x.done; x = h.next()) {
              var _ = x.value;
              if (_.getCount() > 1 && e.checkChecksum(v, _))
                return e.constructResult(v, _);
            }
          } catch (g) {
            u = { error: g };
          } finally {
            try {
              x && !x.done && (f = h.return) && f.call(h);
            } finally {
              if (u)
                throw u.error;
            }
          }
      }
    } catch (g) {
      i = { error: g };
    } finally {
      try {
        s && !s.done && (o = d.return) && o.call(d);
      } finally {
        if (i)
          throw i.error;
      }
    }
    throw new te.default();
  }, e.addOrTally = function(t, n) {
    var a, i;
    if (n != null) {
      var o = !1;
      try {
        for (var u = vn(t), f = u.next(); !f.done; f = u.next()) {
          var l = f.value;
          if (l.getValue() === n.getValue()) {
            l.incrementCount(), o = !0;
            break;
          }
        }
      } catch (c) {
        a = { error: c };
      } finally {
        try {
          f && !f.done && (i = u.return) && i.call(u);
        } finally {
          if (a)
            throw a.error;
        }
      }
      o || t.push(n);
    }
  }, e.prototype.reset = function() {
    this.possibleLeftPairs.length = 0, this.possibleRightPairs.length = 0;
  }, e.constructResult = function(t, n) {
    for (var a = 4537077 * t.getValue() + n.getValue(), i = new String(a).toString(), o = new A0.default(), u = 13 - i.length; u > 0; u--)
      o.append("0");
    o.append(i);
    for (var f = 0, u = 0; u < 13; u++) {
      var l = o.charAt(u).charCodeAt(0) - "0".charCodeAt(0);
      f += (u & 1) === 0 ? 3 * l : l;
    }
    f = 10 - f % 10, f === 10 && (f = 0), o.append(f.toString());
    var c = t.getFinderPattern().getResultPoints(), d = n.getFinderPattern().getResultPoints();
    return new y0.default(o.toString(), null, 0, [c[0], c[1], d[0], d[1]], w0.default.RSS_14, new Date().getTime());
  }, e.checkChecksum = function(t, n) {
    var a = (t.getChecksumPortion() + 16 * n.getChecksumPortion()) % 79, i = 9 * t.getFinderPattern().getValue() + n.getFinderPattern().getValue();
    return i > 72 && i--, i > 8 && i--, a === i;
  }, e.prototype.decodePair = function(t, n, a, i) {
    try {
      var o = this.findFinderPattern(t, n), u = this.parseFoundFinderPattern(t, a, n, o), f = i == null ? null : i.get(E0.default.NEED_RESULT_POINT_CALLBACK);
      if (f != null) {
        var l = (o[0] + o[1]) / 2;
        n && (l = t.getSize() - 1 - l), f.foundPossibleResultPoint(new C0.default(l, a));
      }
      var c = this.decodeDataCharacter(t, u, !0), d = this.decodeDataCharacter(t, u, !1);
      return new g0.default(1597 * c.getValue() + d.getValue(), c.getChecksumPortion() + 4 * d.getChecksumPortion(), u);
    } catch {
      return null;
    }
  }, e.prototype.decodeDataCharacter = function(t, n, a) {
    for (var i = this.getDataCharacterCounters(), o = 0; o < i.length; o++)
      i[o] = 0;
    if (a)
      Pi.default.recordPatternInReverse(t, n.getStartEnd()[0], i);
    else {
      Pi.default.recordPattern(t, n.getStartEnd()[1] + 1, i);
      for (var u = 0, f = i.length - 1; u < f; u++, f--) {
        var l = i[u];
        i[u] = i[f], i[f] = l;
      }
    }
    for (var c = a ? 16 : 15, d = hn.default.sum(new Int32Array(i)) / c, s = this.getOddCounts(), v = this.getEvenCounts(), h = this.getOddRoundingErrors(), x = this.getEvenRoundingErrors(), u = 0; u < i.length; u++) {
      var _ = i[u] / d, g = Math.floor(_ + 0.5);
      g < 1 ? g = 1 : g > 8 && (g = 8);
      var y = Math.floor(u / 2);
      (u & 1) === 0 ? (s[y] = g, h[y] = _ - g) : (v[y] = g, x[y] = _ - g);
    }
    this.adjustOddEvenCounts(a, c);
    for (var A = 0, w = 0, u = s.length - 1; u >= 0; u--)
      w *= 9, w += s[u], A += s[u];
    for (var S = 0, m = 0, u = v.length - 1; u >= 0; u--)
      S *= 9, S += v[u], m += v[u];
    var I = w + 3 * S;
    if (a) {
      if ((A & 1) !== 0 || A > 12 || A < 4)
        throw new te.default();
      var O = (12 - A) / 2, D = e.OUTSIDE_ODD_WIDEST[O], R = 9 - D, M = Kt.default.getRSSvalue(s, D, !1), W = Kt.default.getRSSvalue(v, R, !0), H = e.OUTSIDE_EVEN_TOTAL_SUBSET[O], ee = e.OUTSIDE_GSUM[O];
      return new Ti.default(M * H + W + ee, I);
    } else {
      if ((m & 1) !== 0 || m > 10 || m < 4)
        throw new te.default();
      var O = (10 - m) / 2, D = e.INSIDE_ODD_WIDEST[O], R = 9 - D, M = Kt.default.getRSSvalue(s, D, !0), W = Kt.default.getRSSvalue(v, R, !1), ve = e.INSIDE_ODD_TOTAL_SUBSET[O], ee = e.INSIDE_GSUM[O];
      return new Ti.default(W * ve + M + ee, I);
    }
  }, e.prototype.findFinderPattern = function(t, n) {
    var a = this.getDecodeFinderCounters();
    a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0;
    for (var i = t.getSize(), o = !1, u = 0; u < i && (o = !t.get(u), n !== o); )
      u++;
    for (var f = 0, l = u, c = u; c < i; c++)
      if (t.get(c) !== o)
        a[f]++;
      else {
        if (f === 3) {
          if (je.default.isFinderPattern(a))
            return [l, c];
          l += a[0] + a[1], a[0] = a[2], a[1] = a[3], a[2] = 0, a[3] = 0, f--;
        } else
          f++;
        a[f] = 1, o = !o;
      }
    throw new te.default();
  }, e.prototype.parseFoundFinderPattern = function(t, n, a, i) {
    for (var o = t.get(i[0]), u = i[0] - 1; u >= 0 && o !== t.get(u); )
      u--;
    u++;
    var f = i[0] - u, l = this.getDecodeFinderCounters(), c = new Array(l.length);
    m0.default.arraycopy(l, 0, c, 1, l.length - 1), c[0] = f;
    var d = this.parseFinderValue(c, e.FINDER_PATTERNS), s = u, v = i[1];
    return a && (s = t.getSize() - 1 - s, v = t.getSize() - 1 - v), new S0.default(d, [u, i[1]], s, v, n);
  }, e.prototype.adjustOddEvenCounts = function(t, n) {
    var a = hn.default.sum(new Int32Array(this.getOddCounts())), i = hn.default.sum(new Int32Array(this.getEvenCounts())), o = !1, u = !1, f = !1, l = !1;
    t ? (a > 12 ? u = !0 : a < 4 && (o = !0), i > 12 ? l = !0 : i < 4 && (f = !0)) : (a > 11 ? u = !0 : a < 5 && (o = !0), i > 10 ? l = !0 : i < 4 && (f = !0));
    var c = a + i - n, d = (a & 1) === (t ? 1 : 0), s = (i & 1) === 1;
    if (c === 1)
      if (d) {
        if (s)
          throw new te.default();
        u = !0;
      } else {
        if (!s)
          throw new te.default();
        l = !0;
      }
    else if (c === -1)
      if (d) {
        if (s)
          throw new te.default();
        o = !0;
      } else {
        if (!s)
          throw new te.default();
        f = !0;
      }
    else if (c === 0) {
      if (d) {
        if (!s)
          throw new te.default();
        a < i ? (o = !0, l = !0) : (u = !0, f = !0);
      } else if (s)
        throw new te.default();
    } else
      throw new te.default();
    if (o) {
      if (u)
        throw new te.default();
      je.default.increment(this.getOddCounts(), this.getOddRoundingErrors());
    }
    if (u && je.default.decrement(this.getOddCounts(), this.getOddRoundingErrors()), f) {
      if (l)
        throw new te.default();
      je.default.increment(this.getEvenCounts(), this.getOddRoundingErrors());
    }
    l && je.default.decrement(this.getEvenCounts(), this.getEvenRoundingErrors());
  }, e.OUTSIDE_EVEN_TOTAL_SUBSET = [1, 10, 34, 70, 126], e.INSIDE_ODD_TOTAL_SUBSET = [4, 20, 48, 81], e.OUTSIDE_GSUM = [0, 161, 961, 2015, 2715], e.INSIDE_GSUM = [0, 336, 1036, 1516], e.OUTSIDE_ODD_WIDEST = [8, 6, 4, 3, 1], e.INSIDE_ODD_WIDEST = [2, 4, 6, 8], e.FINDER_PATTERNS = [
    [3, 8, 2, 1],
    [3, 5, 5, 1],
    [3, 3, 7, 1],
    [3, 1, 9, 1],
    [2, 7, 4, 1],
    [2, 5, 6, 1],
    [2, 3, 8, 1],
    [1, 5, 7, 1],
    [1, 3, 9, 1]
  ], e;
}(je.default);
Mr.default = I0;
var $r = {}, O0 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), R0 = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty($r, "__esModule", { value: !0 });
var D0 = L, T0 = Y, P0 = J, bi = k, qt = se, b0 = G, N0 = j, M0 = F, Qt = T, B0 = function(r) {
  O0(e, r);
  function e() {
    var t = r !== null && r.apply(this, arguments) || this;
    return t.narrowLineWidth = -1, t;
  }
  return e.prototype.decodeRow = function(t, n, a) {
    var i, o, u = this.decodeStart(n), f = this.decodeEnd(n), l = new b0.default();
    e.decodeMiddle(n, u[1], f[0], l);
    var c = l.toString(), d = null;
    a != null && (d = a.get(T0.default.ALLOWED_LENGTHS)), d == null && (d = e.DEFAULT_ALLOWED_LENGTHS);
    var s = c.length, v = !1, h = 0;
    try {
      for (var x = R0(d), _ = x.next(); !_.done; _ = x.next()) {
        var g = _.value;
        if (s === g) {
          v = !0;
          break;
        }
        g > h && (h = g);
      }
    } catch (w) {
      i = { error: w };
    } finally {
      try {
        _ && !_.done && (o = x.return) && o.call(x);
      } finally {
        if (i)
          throw i.error;
      }
    }
    if (!v && s > h && (v = !0), !v)
      throw new M0.default();
    var y = [new bi.default(u[1], t), new bi.default(f[0], t)], A = new P0.default(
      c,
      null,
      0,
      y,
      D0.default.ITF,
      new Date().getTime()
    );
    return A;
  }, e.decodeMiddle = function(t, n, a, i) {
    var o = new Array(10), u = new Array(5), f = new Array(5);
    for (o.fill(0), u.fill(0), f.fill(0); n < a; ) {
      qt.default.recordPattern(t, n, o);
      for (var l = 0; l < 5; l++) {
        var c = 2 * l;
        u[l] = o[c], f[l] = o[c + 1];
      }
      var d = e.decodeDigit(u);
      i.append(d.toString()), d = this.decodeDigit(f), i.append(d.toString()), o.forEach(function(s) {
        n += s;
      });
    }
  }, e.prototype.decodeStart = function(t) {
    var n = e.skipWhiteSpace(t), a = e.findGuardPattern(t, n, e.START_PATTERN);
    return this.narrowLineWidth = (a[1] - a[0]) / 4, this.validateQuietZone(t, a[0]), a;
  }, e.prototype.validateQuietZone = function(t, n) {
    var a = this.narrowLineWidth * 10;
    a = a < n ? a : n;
    for (var i = n - 1; a > 0 && i >= 0 && !t.get(i); i--)
      a--;
    if (a !== 0)
      throw new Qt.default();
  }, e.skipWhiteSpace = function(t) {
    var n = t.getSize(), a = t.getNextSet(0);
    if (a === n)
      throw new Qt.default();
    return a;
  }, e.prototype.decodeEnd = function(t) {
    t.reverse();
    try {
      var n = e.skipWhiteSpace(t), a = void 0;
      try {
        a = e.findGuardPattern(t, n, e.END_PATTERN_REVERSED[0]);
      } catch {
        a = e.findGuardPattern(t, n, e.END_PATTERN_REVERSED[1]);
      }
      this.validateQuietZone(t, a[0]);
      var i = a[0];
      return a[0] = t.getSize() - a[1], a[1] = t.getSize() - i, a;
    } finally {
      t.reverse();
    }
  }, e.findGuardPattern = function(t, n, a) {
    var i = a.length, o = new Array(i), u = t.getSize(), f = !1, l = 0, c = n;
    o.fill(0);
    for (var d = n; d < u; d++)
      if (t.get(d) !== f)
        o[l]++;
      else {
        if (l === i - 1) {
          if (qt.default.patternMatchVariance(o, a, e.MAX_INDIVIDUAL_VARIANCE) < e.MAX_AVG_VARIANCE)
            return [c, d];
          c += o[0] + o[1], N0.default.arraycopy(o, 2, o, 0, l - 1), o[l - 1] = 0, o[l] = 0, l--;
        } else
          l++;
        o[l] = 1, f = !f;
      }
    throw new Qt.default();
  }, e.decodeDigit = function(t) {
    for (var n = e.MAX_AVG_VARIANCE, a = -1, i = e.PATTERNS.length, o = 0; o < i; o++) {
      var u = e.PATTERNS[o], f = qt.default.patternMatchVariance(t, u, e.MAX_INDIVIDUAL_VARIANCE);
      f < n ? (n = f, a = o) : f === n && (a = -1);
    }
    if (a >= 0)
      return a % 10;
    throw new Qt.default();
  }, e.W = 3, e.w = 2, e.N = 1, e.PATTERNS = [
    [1, 1, 2, 2, 1],
    [2, 1, 1, 1, 2],
    [1, 2, 1, 1, 2],
    [2, 2, 1, 1, 1],
    [1, 1, 2, 1, 2],
    [2, 1, 2, 1, 1],
    [1, 2, 2, 1, 1],
    [1, 1, 1, 2, 2],
    [2, 1, 1, 2, 1],
    [1, 2, 1, 2, 1],
    [1, 1, 3, 3, 1],
    [3, 1, 1, 1, 3],
    [1, 3, 1, 1, 3],
    [3, 3, 1, 1, 1],
    [1, 1, 3, 1, 3],
    [3, 1, 3, 1, 1],
    [1, 3, 3, 1, 1],
    [1, 1, 1, 3, 3],
    [3, 1, 1, 3, 1],
    [1, 3, 1, 3, 1]
  ], e.MAX_AVG_VARIANCE = 0.38, e.MAX_INDIVIDUAL_VARIANCE = 0.5, e.DEFAULT_ALLOWED_LENGTHS = [6, 8, 10, 12, 14], e.START_PATTERN = [1, 1, 1, 1], e.END_PATTERN_REVERSED = [
    [1, 1, 2],
    [1, 1, 3]
  ], e;
}(qt.default);
$r.default = B0;
var Wn = {}, kr = {}, Ur = {}, Xn = {}, tt = {}, F0 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(tt, "__esModule", { value: !0 });
var xn = se, Ni = T, Mi = F, L0 = function(r) {
  F0(e, r);
  function e() {
    var t = r !== null && r.apply(this, arguments) || this;
    return t.decodeRowStringBuffer = "", t;
  }
  return e.findStartGuardPattern = function(t) {
    for (var n = !1, a = null, i = 0, o = [0, 0, 0]; !n; ) {
      o = [0, 0, 0], a = e.findGuardPattern(t, i, !1, this.START_END_PATTERN, o);
      var u = a[0];
      i = a[1];
      var f = u - (i - u);
      f >= 0 && (n = t.isRange(f, u, !1));
    }
    return a;
  }, e.checkChecksum = function(t) {
    return e.checkStandardUPCEANChecksum(t);
  }, e.checkStandardUPCEANChecksum = function(t) {
    var n = t.length;
    if (n === 0)
      return !1;
    var a = parseInt(t.charAt(n - 1), 10);
    return e.getStandardUPCEANChecksum(t.substring(0, n - 1)) === a;
  }, e.getStandardUPCEANChecksum = function(t) {
    for (var n = t.length, a = 0, i = n - 1; i >= 0; i -= 2) {
      var o = t.charAt(i).charCodeAt(0) - "0".charCodeAt(0);
      if (o < 0 || o > 9)
        throw new Mi.default();
      a += o;
    }
    a *= 3;
    for (var i = n - 2; i >= 0; i -= 2) {
      var o = t.charAt(i).charCodeAt(0) - "0".charCodeAt(0);
      if (o < 0 || o > 9)
        throw new Mi.default();
      a += o;
    }
    return (1e3 - a) % 10;
  }, e.decodeEnd = function(t, n) {
    return e.findGuardPattern(t, n, !1, e.START_END_PATTERN, new Array(e.START_END_PATTERN.length).fill(0));
  }, e.findGuardPattern = function(t, n, a, i, o) {
    var u = t.getSize();
    n = a ? t.getNextUnset(n) : t.getNextSet(n);
    for (var f = 0, l = n, c = i.length, d = a, s = n; s < u; s++)
      if (t.get(s) !== d)
        o[f]++;
      else {
        if (f === c - 1) {
          if (xn.default.patternMatchVariance(o, i, e.MAX_INDIVIDUAL_VARIANCE) < e.MAX_AVG_VARIANCE)
            return [l, s];
          l += o[0] + o[1];
          for (var v = o.slice(2, o.length), h = 0; h < f - 1; h++)
            o[h] = v[h];
          o[f - 1] = 0, o[f] = 0, f--;
        } else
          f++;
        o[f] = 1, d = !d;
      }
    throw new Ni.default();
  }, e.decodeDigit = function(t, n, a, i) {
    this.recordPattern(t, a, n);
    for (var o = this.MAX_AVG_VARIANCE, u = -1, f = i.length, l = 0; l < f; l++) {
      var c = i[l], d = xn.default.patternMatchVariance(n, c, e.MAX_INDIVIDUAL_VARIANCE);
      d < o && (o = d, u = l);
    }
    if (u >= 0)
      return u;
    throw new Ni.default();
  }, e.MAX_AVG_VARIANCE = 0.48, e.MAX_INDIVIDUAL_VARIANCE = 0.7, e.START_END_PATTERN = [1, 1, 1], e.MIDDLE_PATTERN = [1, 1, 1, 1, 1], e.END_PATTERN = [1, 1, 1, 1, 1, 1], e.L_PATTERNS = [
    [3, 2, 1, 1],
    [2, 2, 2, 1],
    [2, 1, 2, 2],
    [1, 4, 1, 1],
    [1, 1, 3, 2],
    [1, 2, 3, 1],
    [1, 1, 1, 4],
    [1, 3, 1, 2],
    [1, 2, 1, 3],
    [3, 1, 1, 2]
  ], e;
}(xn.default);
tt.default = L0;
var zn = {}, $0 = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(zn, "__esModule", { value: !0 });
var k0 = L, Bi = tt, U0 = J, Fi = k, G0 = de, pn = T, H0 = function() {
  function r() {
    this.CHECK_DIGIT_ENCODINGS = [24, 20, 18, 17, 12, 6, 3, 10, 9, 5], this.decodeMiddleCounters = [0, 0, 0, 0], this.decodeRowStringBuffer = "";
  }
  return r.prototype.decodeRow = function(e, t, n) {
    var a = this.decodeRowStringBuffer, i = this.decodeMiddle(t, n, a), o = a.toString(), u = r.parseExtensionString(o), f = [
      new Fi.default((n[0] + n[1]) / 2, e),
      new Fi.default(i, e)
    ], l = new U0.default(o, null, 0, f, k0.default.UPC_EAN_EXTENSION, new Date().getTime());
    return u != null && l.putAllMetadata(u), l;
  }, r.prototype.decodeMiddle = function(e, t, n) {
    var a, i, o = this.decodeMiddleCounters;
    o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 0;
    for (var u = e.getSize(), f = t[1], l = 0, c = 0; c < 5 && f < u; c++) {
      var d = Bi.default.decodeDigit(e, o, f, Bi.default.L_AND_G_PATTERNS);
      n += String.fromCharCode("0".charCodeAt(0) + d % 10);
      try {
        for (var s = $0(o), v = s.next(); !v.done; v = s.next()) {
          var h = v.value;
          f += h;
        }
      } catch (_) {
        a = { error: _ };
      } finally {
        try {
          v && !v.done && (i = s.return) && i.call(s);
        } finally {
          if (a)
            throw a.error;
        }
      }
      d >= 10 && (l |= 1 << 4 - c), c !== 4 && (f = e.getNextSet(f), f = e.getNextUnset(f));
    }
    if (n.length !== 5)
      throw new pn.default();
    var x = this.determineCheckDigit(l);
    if (r.extensionChecksum(n.toString()) !== x)
      throw new pn.default();
    return f;
  }, r.extensionChecksum = function(e) {
    for (var t = e.length, n = 0, a = t - 2; a >= 0; a -= 2)
      n += e.charAt(a).charCodeAt(0) - "0".charCodeAt(0);
    n *= 3;
    for (var a = t - 1; a >= 0; a -= 2)
      n += e.charAt(a).charCodeAt(0) - "0".charCodeAt(0);
    return n *= 3, n % 10;
  }, r.prototype.determineCheckDigit = function(e) {
    for (var t = 0; t < 10; t++)
      if (e === this.CHECK_DIGIT_ENCODINGS[t])
        return t;
    throw new pn.default();
  }, r.parseExtensionString = function(e) {
    if (e.length !== 5)
      return null;
    var t = r.parseExtension5String(e);
    return t == null ? null : /* @__PURE__ */ new Map([[G0.default.SUGGESTED_PRICE, t]]);
  }, r.parseExtension5String = function(e) {
    var t;
    switch (e.charAt(0)) {
      case "0":
        t = "\xA3";
        break;
      case "5":
        t = "$";
        break;
      case "9":
        switch (e) {
          case "90000":
            return null;
          case "99991":
            return "0.00";
          case "99990":
            return "Used";
        }
        t = "";
        break;
      default:
        t = "";
        break;
    }
    var n = parseInt(e.substring(1)), a = (n / 100).toString(), i = n % 100, o = i < 10 ? "0" + i : i.toString();
    return t + a + "." + o;
  }, r;
}();
zn.default = H0;
var Yn = {}, V0 = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Yn, "__esModule", { value: !0 });
var j0 = L, Li = tt, W0 = J, $i = k, X0 = de, ki = T, z0 = function() {
  function r() {
    this.decodeMiddleCounters = [0, 0, 0, 0], this.decodeRowStringBuffer = "";
  }
  return r.prototype.decodeRow = function(e, t, n) {
    var a = this.decodeRowStringBuffer, i = this.decodeMiddle(t, n, a), o = a.toString(), u = r.parseExtensionString(o), f = [
      new $i.default((n[0] + n[1]) / 2, e),
      new $i.default(i, e)
    ], l = new W0.default(o, null, 0, f, j0.default.UPC_EAN_EXTENSION, new Date().getTime());
    return u != null && l.putAllMetadata(u), l;
  }, r.prototype.decodeMiddle = function(e, t, n) {
    var a, i, o = this.decodeMiddleCounters;
    o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 0;
    for (var u = e.getSize(), f = t[1], l = 0, c = 0; c < 2 && f < u; c++) {
      var d = Li.default.decodeDigit(e, o, f, Li.default.L_AND_G_PATTERNS);
      n += String.fromCharCode("0".charCodeAt(0) + d % 10);
      try {
        for (var s = V0(o), v = s.next(); !v.done; v = s.next()) {
          var h = v.value;
          f += h;
        }
      } catch (x) {
        a = { error: x };
      } finally {
        try {
          v && !v.done && (i = s.return) && i.call(s);
        } finally {
          if (a)
            throw a.error;
        }
      }
      d >= 10 && (l |= 1 << 1 - c), c !== 1 && (f = e.getNextSet(f), f = e.getNextUnset(f));
    }
    if (n.length !== 2)
      throw new ki.default();
    if (parseInt(n.toString()) % 4 !== l)
      throw new ki.default();
    return f;
  }, r.parseExtensionString = function(e) {
    return e.length !== 2 ? null : /* @__PURE__ */ new Map([[X0.default.ISSUE_NUMBER, parseInt(e)]]);
  }, r;
}();
Yn.default = z0;
Object.defineProperty(Xn, "__esModule", { value: !0 });
var Y0 = tt, Z0 = zn, K0 = Yn, q0 = function() {
  function r() {
  }
  return r.decodeRow = function(e, t, n) {
    var a = Y0.default.findGuardPattern(t, n, !1, this.EXTENSION_START_PATTERN, new Array(this.EXTENSION_START_PATTERN.length).fill(0));
    try {
      var i = new Z0.default();
      return i.decodeRow(e, t, a);
    } catch {
      var o = new K0.default();
      return o.decodeRow(e, t, a);
    }
  }, r.EXTENSION_START_PATTERN = [1, 1, 2], r;
}();
Xn.default = q0;
var Q0 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Ur, "__esModule", { value: !0 });
var Ui = L, Gi = Y, J0 = J, el = de, lt = k, tl = Xn, rl = tt, Hi = T, _n = F, nl = ue, al = function(r) {
  Q0(e, r);
  function e() {
    var t = r.call(this) || this;
    t.decodeRowStringBuffer = "", e.L_AND_G_PATTERNS = e.L_PATTERNS.map(function(u) {
      return u.slice();
    });
    for (var n = 10; n < 20; n++) {
      for (var a = e.L_PATTERNS[n - 10], i = new Array(a.length), o = 0; o < a.length; o++)
        i[o] = a[a.length - o - 1];
      e.L_AND_G_PATTERNS[n] = i;
    }
    return t;
  }
  return e.prototype.decodeRow = function(t, n, a) {
    var i = e.findStartGuardPattern(n), o = a == null ? null : a.get(Gi.default.NEED_RESULT_POINT_CALLBACK);
    if (o != null) {
      var u = new lt.default((i[0] + i[1]) / 2, t);
      o.foundPossibleResultPoint(u);
    }
    var f = this.decodeMiddle(n, i, this.decodeRowStringBuffer), l = f.rowOffset, c = f.resultString;
    if (o != null) {
      var d = new lt.default(l, t);
      o.foundPossibleResultPoint(d);
    }
    var s = e.decodeEnd(n, l);
    if (o != null) {
      var v = new lt.default((s[0] + s[1]) / 2, t);
      o.foundPossibleResultPoint(v);
    }
    var h = s[1], x = h + (h - s[0]);
    if (x >= n.getSize() || !n.isRange(h, x, !1))
      throw new Hi.default();
    var _ = c.toString();
    if (_.length < 8)
      throw new _n.default();
    if (!e.checkChecksum(_))
      throw new nl.default();
    var g = (i[1] + i[0]) / 2, y = (s[1] + s[0]) / 2, A = this.getBarcodeFormat(), w = [new lt.default(g, t), new lt.default(y, t)], S = new J0.default(_, null, 0, w, A, new Date().getTime()), m = 0;
    try {
      var I = tl.default.decodeRow(t, n, s[1]);
      S.putMetadata(el.default.UPC_EAN_EXTENSION, I.getText()), S.putAllMetadata(I.getResultMetadata()), S.addResultPoints(I.getResultPoints()), m = I.getText().length;
    } catch {
    }
    var O = a == null ? null : a.get(Gi.default.ALLOWED_EAN_EXTENSIONS);
    if (O != null) {
      var D = !1;
      for (var R in O)
        if (m.toString() === R) {
          D = !0;
          break;
        }
      if (!D)
        throw new Hi.default();
    }
    return A === Ui.default.EAN_13 || Ui.default.UPC_A, S;
  }, e.checkChecksum = function(t) {
    return e.checkStandardUPCEANChecksum(t);
  }, e.checkStandardUPCEANChecksum = function(t) {
    var n = t.length;
    if (n === 0)
      return !1;
    var a = parseInt(t.charAt(n - 1), 10);
    return e.getStandardUPCEANChecksum(t.substring(0, n - 1)) === a;
  }, e.getStandardUPCEANChecksum = function(t) {
    for (var n = t.length, a = 0, i = n - 1; i >= 0; i -= 2) {
      var o = t.charAt(i).charCodeAt(0) - "0".charCodeAt(0);
      if (o < 0 || o > 9)
        throw new _n.default();
      a += o;
    }
    a *= 3;
    for (var i = n - 2; i >= 0; i -= 2) {
      var o = t.charAt(i).charCodeAt(0) - "0".charCodeAt(0);
      if (o < 0 || o > 9)
        throw new _n.default();
      a += o;
    }
    return (1e3 - a) % 10;
  }, e.decodeEnd = function(t, n) {
    return e.findGuardPattern(t, n, !1, e.START_END_PATTERN, new Array(e.START_END_PATTERN.length).fill(0));
  }, e;
}(rl.default);
Ur.default = al;
var il = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Vi = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(kr, "__esModule", { value: !0 });
var ol = L, me = Ur, ul = T, fl = function(r) {
  il(e, r);
  function e() {
    var t = r.call(this) || this;
    return t.decodeMiddleCounters = [0, 0, 0, 0], t;
  }
  return e.prototype.decodeMiddle = function(t, n, a) {
    var i, o, u, f, l = this.decodeMiddleCounters;
    l[0] = 0, l[1] = 0, l[2] = 0, l[3] = 0;
    for (var c = t.getSize(), d = n[1], s = 0, v = 0; v < 6 && d < c; v++) {
      var h = me.default.decodeDigit(t, l, d, me.default.L_AND_G_PATTERNS);
      a += String.fromCharCode("0".charCodeAt(0) + h % 10);
      try {
        for (var x = Vi(l), _ = x.next(); !_.done; _ = x.next()) {
          var g = _.value;
          d += g;
        }
      } catch (S) {
        i = { error: S };
      } finally {
        try {
          _ && !_.done && (o = x.return) && o.call(x);
        } finally {
          if (i)
            throw i.error;
        }
      }
      h >= 10 && (s |= 1 << 5 - v);
    }
    a = e.determineFirstDigit(a, s);
    var y = me.default.findGuardPattern(t, d, !0, me.default.MIDDLE_PATTERN, new Array(me.default.MIDDLE_PATTERN.length).fill(0));
    d = y[1];
    for (var v = 0; v < 6 && d < c; v++) {
      var h = me.default.decodeDigit(t, l, d, me.default.L_PATTERNS);
      a += String.fromCharCode("0".charCodeAt(0) + h);
      try {
        for (var A = Vi(l), w = A.next(); !w.done; w = A.next()) {
          var g = w.value;
          d += g;
        }
      } catch (I) {
        u = { error: I };
      } finally {
        try {
          w && !w.done && (f = A.return) && f.call(A);
        } finally {
          if (u)
            throw u.error;
        }
      }
    }
    return { rowOffset: d, resultString: a };
  }, e.prototype.getBarcodeFormat = function() {
    return ol.default.EAN_13;
  }, e.determineFirstDigit = function(t, n) {
    for (var a = 0; a < 10; a++)
      if (n === this.FIRST_DIGIT_ENCODINGS[a])
        return t = String.fromCharCode("0".charCodeAt(0) + a) + t, t;
    throw new ul.default();
  }, e.FIRST_DIGIT_ENCODINGS = [0, 11, 13, 14, 19, 25, 28, 21, 22, 26], e;
}(me.default);
kr.default = fl;
var Zn = {}, ll = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), ji = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Zn, "__esModule", { value: !0 });
var cl = L, Ie = Ur, dl = function(r) {
  ll(e, r);
  function e() {
    var t = r.call(this) || this;
    return t.decodeMiddleCounters = [0, 0, 0, 0], t;
  }
  return e.prototype.decodeMiddle = function(t, n, a) {
    var i, o, u, f, l = this.decodeMiddleCounters;
    l[0] = 0, l[1] = 0, l[2] = 0, l[3] = 0;
    for (var c = t.getSize(), d = n[1], s = 0; s < 4 && d < c; s++) {
      var v = Ie.default.decodeDigit(t, l, d, Ie.default.L_PATTERNS);
      a += String.fromCharCode("0".charCodeAt(0) + v);
      try {
        for (var h = ji(l), x = h.next(); !x.done; x = h.next()) {
          var _ = x.value;
          d += _;
        }
      } catch (w) {
        i = { error: w };
      } finally {
        try {
          x && !x.done && (o = h.return) && o.call(h);
        } finally {
          if (i)
            throw i.error;
        }
      }
    }
    var g = Ie.default.findGuardPattern(t, d, !0, Ie.default.MIDDLE_PATTERN, new Array(Ie.default.MIDDLE_PATTERN.length).fill(0));
    d = g[1];
    for (var s = 0; s < 4 && d < c; s++) {
      var v = Ie.default.decodeDigit(t, l, d, Ie.default.L_PATTERNS);
      a += String.fromCharCode("0".charCodeAt(0) + v);
      try {
        for (var y = ji(l), A = y.next(); !A.done; A = y.next()) {
          var _ = A.value;
          d += _;
        }
      } catch (m) {
        u = { error: m };
      } finally {
        try {
          A && !A.done && (f = y.return) && f.call(y);
        } finally {
          if (u)
            throw u.error;
        }
      }
    }
    return { rowOffset: d, resultString: a };
  }, e.prototype.getBarcodeFormat = function() {
    return cl.default.EAN_8;
  }, e;
}(Ie.default);
Zn.default = dl;
var sl = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Wi = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Wn, "__esModule", { value: !0 });
var Xi = L, vl = Y, hl = se, zi = kr, Yi = Zn, xl = T, pl = function(r) {
  sl(e, r);
  function e(t) {
    var n = r.call(this) || this, a = t == null ? null : t.get(vl.default.POSSIBLE_FORMATS), i = [];
    return a != null && (a.indexOf(Xi.default.EAN_13) > -1 && i.push(new zi.default()), a.indexOf(Xi.default.EAN_8) > -1 && i.push(new Yi.default())), i.length === 0 && (i.push(new zi.default()), i.push(new Yi.default())), n.readers = i, n;
  }
  return e.prototype.decodeRow = function(t, n, a) {
    var i, o;
    try {
      for (var u = Wi(this.readers), f = u.next(); !f.done; f = u.next()) {
        var l = f.value;
        try {
          return l.decodeRow(t, n, a);
        } catch {
        }
      }
    } catch (c) {
      i = { error: c };
    } finally {
      try {
        f && !f.done && (o = u.return) && o.call(u);
      } finally {
        if (i)
          throw i.error;
      }
    }
    throw new xl.default();
  }, e.prototype.reset = function() {
    var t, n;
    try {
      for (var a = Wi(this.readers), i = a.next(); !i.done; i = a.next()) {
        var o = i.value;
        o.reset();
      }
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
  }, e;
}(hl.default);
Wn.default = pl;
var _l = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Ct, "__esModule", { value: !0 });
var We = L, Zi = br, Ki = Nr, qi = Mr, Qi = Y, Ji = $r, eo = Wn, gl = T, yl = se, El = function(r) {
  _l(e, r);
  function e(t) {
    var n = r.call(this) || this;
    n.readers = [];
    var a = t ? t.get(Qi.default.POSSIBLE_FORMATS) : null, i = t && t.get(Qi.default.ASSUME_CODE_39_CHECK_DIGIT) !== void 0;
    return a && ((a.includes(We.default.EAN_13) || a.includes(We.default.EAN_8)) && n.readers.push(new eo.default(t)), a.includes(We.default.CODE_39) && n.readers.push(new Zi.default(i)), a.includes(We.default.CODE_128) && n.readers.push(new Ki.default()), a.includes(We.default.ITF) && n.readers.push(new Ji.default()), a.includes(We.default.RSS_14) && n.readers.push(new qi.default())), n.readers.length === 0 && (n.readers.push(new Zi.default()), n.readers.push(new eo.default(t)), n.readers.push(new Ki.default()), n.readers.push(new Ji.default()), n.readers.push(new qi.default())), n;
  }
  return e.prototype.decodeRow = function(t, n, a) {
    for (var i = 0; i < this.readers.length; i++)
      try {
        return this.readers[i].decodeRow(t, n, a);
      } catch {
      }
    throw new gl.default();
  }, e.prototype.reset = function() {
    this.readers.forEach(function(t) {
      return t.reset();
    });
  }, e;
}(yl.default);
Ct.default = El;
var Al = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Vn, "__esModule", { value: !0 });
var wl = Ee, Cl = Ct, Sl = function(r) {
  Al(e, r);
  function e(t, n) {
    return t === void 0 && (t = 500), r.call(this, new Cl.default(n), t, n) || this;
  }
  return e;
}(wl.BrowserCodeReader);
Vn.BrowserBarcodeReader = Sl;
var Kn = {}, mt = {}, qn = {}, Qn = {}, It = {}, to = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(It, "__esModule", { value: !0 });
var ro = F, b = function() {
  function r(e, t, n) {
    this.ecCodewords = e, this.ecBlocks = [t], n && this.ecBlocks.push(n);
  }
  return r.prototype.getECCodewords = function() {
    return this.ecCodewords;
  }, r.prototype.getECBlocks = function() {
    return this.ecBlocks;
  }, r;
}();
It.ECBlocks = b;
var P = function() {
  function r(e, t) {
    this.count = e, this.dataCodewords = t;
  }
  return r.prototype.getCount = function() {
    return this.count;
  }, r.prototype.getDataCodewords = function() {
    return this.dataCodewords;
  }, r;
}();
It.ECB = P;
var ml = function() {
  function r(e, t, n, a, i, o) {
    var u, f;
    this.versionNumber = e, this.symbolSizeRows = t, this.symbolSizeColumns = n, this.dataRegionSizeRows = a, this.dataRegionSizeColumns = i, this.ecBlocks = o;
    var l = 0, c = o.getECCodewords(), d = o.getECBlocks();
    try {
      for (var s = to(d), v = s.next(); !v.done; v = s.next()) {
        var h = v.value;
        l += h.getCount() * (h.getDataCodewords() + c);
      }
    } catch (x) {
      u = { error: x };
    } finally {
      try {
        v && !v.done && (f = s.return) && f.call(s);
      } finally {
        if (u)
          throw u.error;
      }
    }
    this.totalCodewords = l;
  }
  return r.prototype.getVersionNumber = function() {
    return this.versionNumber;
  }, r.prototype.getSymbolSizeRows = function() {
    return this.symbolSizeRows;
  }, r.prototype.getSymbolSizeColumns = function() {
    return this.symbolSizeColumns;
  }, r.prototype.getDataRegionSizeRows = function() {
    return this.dataRegionSizeRows;
  }, r.prototype.getDataRegionSizeColumns = function() {
    return this.dataRegionSizeColumns;
  }, r.prototype.getTotalCodewords = function() {
    return this.totalCodewords;
  }, r.prototype.getECBlocks = function() {
    return this.ecBlocks;
  }, r.getVersionForDimensions = function(e, t) {
    var n, a;
    if ((e & 1) !== 0 || (t & 1) !== 0)
      throw new ro.default();
    try {
      for (var i = to(r.VERSIONS), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        if (u.symbolSizeRows === e && u.symbolSizeColumns === t)
          return u;
      }
    } catch (f) {
      n = { error: f };
    } finally {
      try {
        o && !o.done && (a = i.return) && a.call(i);
      } finally {
        if (n)
          throw n.error;
      }
    }
    throw new ro.default();
  }, r.prototype.toString = function() {
    return "" + this.versionNumber;
  }, r.buildVersions = function() {
    return [
      new r(1, 10, 10, 8, 8, new b(5, new P(1, 3))),
      new r(2, 12, 12, 10, 10, new b(7, new P(1, 5))),
      new r(3, 14, 14, 12, 12, new b(10, new P(1, 8))),
      new r(4, 16, 16, 14, 14, new b(12, new P(1, 12))),
      new r(5, 18, 18, 16, 16, new b(14, new P(1, 18))),
      new r(6, 20, 20, 18, 18, new b(18, new P(1, 22))),
      new r(7, 22, 22, 20, 20, new b(20, new P(1, 30))),
      new r(8, 24, 24, 22, 22, new b(24, new P(1, 36))),
      new r(9, 26, 26, 24, 24, new b(28, new P(1, 44))),
      new r(10, 32, 32, 14, 14, new b(36, new P(1, 62))),
      new r(11, 36, 36, 16, 16, new b(42, new P(1, 86))),
      new r(12, 40, 40, 18, 18, new b(48, new P(1, 114))),
      new r(13, 44, 44, 20, 20, new b(56, new P(1, 144))),
      new r(14, 48, 48, 22, 22, new b(68, new P(1, 174))),
      new r(15, 52, 52, 24, 24, new b(42, new P(2, 102))),
      new r(16, 64, 64, 14, 14, new b(56, new P(2, 140))),
      new r(17, 72, 72, 16, 16, new b(36, new P(4, 92))),
      new r(18, 80, 80, 18, 18, new b(48, new P(4, 114))),
      new r(19, 88, 88, 20, 20, new b(56, new P(4, 144))),
      new r(20, 96, 96, 22, 22, new b(68, new P(4, 174))),
      new r(21, 104, 104, 24, 24, new b(56, new P(6, 136))),
      new r(22, 120, 120, 18, 18, new b(68, new P(6, 175))),
      new r(23, 132, 132, 20, 20, new b(62, new P(8, 163))),
      new r(24, 144, 144, 22, 22, new b(62, new P(8, 156), new P(2, 155))),
      new r(25, 8, 18, 6, 16, new b(7, new P(1, 5))),
      new r(26, 8, 32, 6, 14, new b(11, new P(1, 10))),
      new r(27, 12, 26, 10, 24, new b(14, new P(1, 16))),
      new r(28, 12, 36, 10, 16, new b(18, new P(1, 22))),
      new r(29, 16, 36, 14, 16, new b(24, new P(1, 32))),
      new r(30, 16, 48, 14, 22, new b(28, new P(1, 49)))
    ];
  }, r.VERSIONS = r.buildVersions(), r;
}();
It.default = ml;
Object.defineProperty(Qn, "__esModule", { value: !0 });
var no = fe, Il = It, ao = F, Ol = N, Rl = function() {
  function r(e) {
    var t = e.getHeight();
    if (t < 8 || t > 144 || (t & 1) !== 0)
      throw new ao.default();
    this.version = r.readVersion(e), this.mappingBitMatrix = this.extractDataRegion(e), this.readMappingMatrix = new no.default(this.mappingBitMatrix.getWidth(), this.mappingBitMatrix.getHeight());
  }
  return r.prototype.getVersion = function() {
    return this.version;
  }, r.readVersion = function(e) {
    var t = e.getHeight(), n = e.getWidth();
    return Il.default.getVersionForDimensions(t, n);
  }, r.prototype.readCodewords = function() {
    var e = new Int8Array(this.version.getTotalCodewords()), t = 0, n = 4, a = 0, i = this.mappingBitMatrix.getHeight(), o = this.mappingBitMatrix.getWidth(), u = !1, f = !1, l = !1, c = !1;
    do
      if (n === i && a === 0 && !u)
        e[t++] = this.readCorner1(i, o) & 255, n -= 2, a += 2, u = !0;
      else if (n === i - 2 && a === 0 && (o & 3) !== 0 && !f)
        e[t++] = this.readCorner2(i, o) & 255, n -= 2, a += 2, f = !0;
      else if (n === i + 4 && a === 2 && (o & 7) === 0 && !l)
        e[t++] = this.readCorner3(i, o) & 255, n -= 2, a += 2, l = !0;
      else if (n === i - 2 && a === 0 && (o & 7) === 4 && !c)
        e[t++] = this.readCorner4(i, o) & 255, n -= 2, a += 2, c = !0;
      else {
        do
          n < i && a >= 0 && !this.readMappingMatrix.get(a, n) && (e[t++] = this.readUtah(n, a, i, o) & 255), n -= 2, a += 2;
        while (n >= 0 && a < o);
        n += 1, a += 3;
        do
          n >= 0 && a < o && !this.readMappingMatrix.get(a, n) && (e[t++] = this.readUtah(n, a, i, o) & 255), n += 2, a -= 2;
        while (n < i && a >= 0);
        n += 3, a += 1;
      }
    while (n < i || a < o);
    if (t !== this.version.getTotalCodewords())
      throw new ao.default();
    return e;
  }, r.prototype.readModule = function(e, t, n, a) {
    return e < 0 && (e += n, t += 4 - (n + 4 & 7)), t < 0 && (t += a, e += 4 - (a + 4 & 7)), this.readMappingMatrix.set(t, e), this.mappingBitMatrix.get(t, e);
  }, r.prototype.readUtah = function(e, t, n, a) {
    var i = 0;
    return this.readModule(e - 2, t - 2, n, a) && (i |= 1), i <<= 1, this.readModule(e - 2, t - 1, n, a) && (i |= 1), i <<= 1, this.readModule(e - 1, t - 2, n, a) && (i |= 1), i <<= 1, this.readModule(e - 1, t - 1, n, a) && (i |= 1), i <<= 1, this.readModule(e - 1, t, n, a) && (i |= 1), i <<= 1, this.readModule(e, t - 2, n, a) && (i |= 1), i <<= 1, this.readModule(e, t - 1, n, a) && (i |= 1), i <<= 1, this.readModule(e, t, n, a) && (i |= 1), i;
  }, r.prototype.readCorner1 = function(e, t) {
    var n = 0;
    return this.readModule(e - 1, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, 1, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(2, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(3, t - 1, e, t) && (n |= 1), n;
  }, r.prototype.readCorner2 = function(e, t) {
    var n = 0;
    return this.readModule(e - 3, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 2, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, 0, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 4, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 3, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 1, e, t) && (n |= 1), n;
  }, r.prototype.readCorner3 = function(e, t) {
    var n = 0;
    return this.readModule(e - 1, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 3, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 3, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 1, e, t) && (n |= 1), n;
  }, r.prototype.readCorner4 = function(e, t) {
    var n = 0;
    return this.readModule(e - 3, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 2, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, 0, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(2, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(3, t - 1, e, t) && (n |= 1), n;
  }, r.prototype.extractDataRegion = function(e) {
    var t = this.version.getSymbolSizeRows(), n = this.version.getSymbolSizeColumns();
    if (e.getHeight() !== t)
      throw new Ol.default("Dimension of bitMatrix must match the version size");
    for (var a = this.version.getDataRegionSizeRows(), i = this.version.getDataRegionSizeColumns(), o = t / a | 0, u = n / i | 0, f = o * a, l = u * i, c = new no.default(l, f), d = 0; d < o; ++d)
      for (var s = d * a, v = 0; v < u; ++v)
        for (var h = v * i, x = 0; x < a; ++x)
          for (var _ = d * (a + 2) + 1 + x, g = s + x, y = 0; y < i; ++y) {
            var A = v * (i + 2) + 1 + y;
            if (e.get(A, _)) {
              var w = h + y;
              c.set(w, g);
            }
          }
    return c;
  }, r;
}();
Qn.default = Rl;
var Jn = {}, io = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Jn, "__esModule", { value: !0 });
var Dl = N, Tl = function() {
  function r(e, t) {
    this.numDataCodewords = e, this.codewords = t;
  }
  return r.getDataBlocks = function(e, t) {
    var n, a, i, o, u = t.getECBlocks(), f = 0, l = u.getECBlocks();
    try {
      for (var c = io(l), d = c.next(); !d.done; d = c.next()) {
        var s = d.value;
        f += s.getCount();
      }
    } catch (ee) {
      n = { error: ee };
    } finally {
      try {
        d && !d.done && (a = c.return) && a.call(c);
      } finally {
        if (n)
          throw n.error;
      }
    }
    var v = new Array(f), h = 0;
    try {
      for (var x = io(l), _ = x.next(); !_.done; _ = x.next())
        for (var s = _.value, g = 0; g < s.getCount(); g++) {
          var y = s.getDataCodewords(), A = u.getECCodewords() + y;
          v[h++] = new r(y, new Uint8Array(A));
        }
    } catch (ee) {
      i = { error: ee };
    } finally {
      try {
        _ && !_.done && (o = x.return) && o.call(x);
      } finally {
        if (i)
          throw i.error;
      }
    }
    for (var w = v[0].codewords.length, S = w - u.getECCodewords(), m = S - 1, I = 0, g = 0; g < m; g++)
      for (var O = 0; O < h; O++)
        v[O].codewords[g] = e[I++];
    for (var D = t.getVersionNumber() === 24, R = D ? 8 : h, O = 0; O < R; O++)
      v[O].codewords[S - 1] = e[I++];
    for (var M = v[0].codewords.length, g = S; g < M; g++)
      for (var O = 0; O < h; O++) {
        var W = D ? (O + 8) % h : O, H = D && W > 7 ? g - 1 : g;
        v[W].codewords[H] = e[I++];
      }
    if (I !== e.length)
      throw new Dl.default();
    return v;
  }, r.prototype.getNumDataCodewords = function() {
    return this.numDataCodewords;
  }, r.prototype.getCodewords = function() {
    return this.codewords;
  }, r;
}();
Jn.default = Tl;
var ea = {}, Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
var Pl = N, bl = function() {
  function r(e) {
    this.bytes = e, this.byteOffset = 0, this.bitOffset = 0;
  }
  return r.prototype.getBitOffset = function() {
    return this.bitOffset;
  }, r.prototype.getByteOffset = function() {
    return this.byteOffset;
  }, r.prototype.readBits = function(e) {
    if (e < 1 || e > 32 || e > this.available())
      throw new Pl.default("" + e);
    var t = 0, n = this.bitOffset, a = this.byteOffset, i = this.bytes;
    if (n > 0) {
      var o = 8 - n, u = e < o ? e : o, f = o - u, l = 255 >> 8 - u << f;
      t = (i[a] & l) >> f, e -= u, n += u, n === 8 && (n = 0, a++);
    }
    if (e > 0) {
      for (; e >= 8; )
        t = t << 8 | i[a] & 255, a++, e -= 8;
      if (e > 0) {
        var f = 8 - e, l = 255 >> f << f;
        t = t << e | (i[a] & l) >> f, n += e;
      }
    }
    return this.bitOffset = n, this.byteOffset = a, t;
  }, r.prototype.available = function() {
    return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
  }, r;
}();
Ot.default = bl;
Object.defineProperty(ea, "__esModule", { value: !0 });
var Nl = ke, Ml = Ot, oo = G, Bl = Le, Fl = Ke, re = F, Ll = xe, U;
(function(r) {
  r[r.PAD_ENCODE = 0] = "PAD_ENCODE", r[r.ASCII_ENCODE = 1] = "ASCII_ENCODE", r[r.C40_ENCODE = 2] = "C40_ENCODE", r[r.TEXT_ENCODE = 3] = "TEXT_ENCODE", r[r.ANSIX12_ENCODE = 4] = "ANSIX12_ENCODE", r[r.EDIFACT_ENCODE = 5] = "EDIFACT_ENCODE", r[r.BASE256_ENCODE = 6] = "BASE256_ENCODE";
})(U || (U = {}));
var $l = function() {
  function r() {
  }
  return r.decode = function(e) {
    var t = new Ml.default(e), n = new oo.default(), a = new oo.default(), i = new Array(), o = U.ASCII_ENCODE;
    do
      if (o === U.ASCII_ENCODE)
        o = this.decodeAsciiSegment(t, n, a);
      else {
        switch (o) {
          case U.C40_ENCODE:
            this.decodeC40Segment(t, n);
            break;
          case U.TEXT_ENCODE:
            this.decodeTextSegment(t, n);
            break;
          case U.ANSIX12_ENCODE:
            this.decodeAnsiX12Segment(t, n);
            break;
          case U.EDIFACT_ENCODE:
            this.decodeEdifactSegment(t, n);
            break;
          case U.BASE256_ENCODE:
            this.decodeBase256Segment(t, n, i);
            break;
          default:
            throw new re.default();
        }
        o = U.ASCII_ENCODE;
      }
    while (o !== U.PAD_ENCODE && t.available() > 0);
    return a.length() > 0 && n.append(a.toString()), new Nl.default(e, n.toString(), i.length === 0 ? null : i, null);
  }, r.decodeAsciiSegment = function(e, t, n) {
    var a = !1;
    do {
      var i = e.readBits(8);
      if (i === 0)
        throw new re.default();
      if (i <= 128)
        return a && (i += 128), t.append(String.fromCharCode(i - 1)), U.ASCII_ENCODE;
      if (i === 129)
        return U.PAD_ENCODE;
      if (i <= 229) {
        var o = i - 130;
        o < 10 && t.append("0"), t.append("" + o);
      } else
        switch (i) {
          case 230:
            return U.C40_ENCODE;
          case 231:
            return U.BASE256_ENCODE;
          case 232:
            t.append(String.fromCharCode(29));
            break;
          case 233:
          case 234:
            break;
          case 235:
            a = !0;
            break;
          case 236:
            t.append("[)>05"), n.insert(0, "");
            break;
          case 237:
            t.append("[)>06"), n.insert(0, "");
            break;
          case 238:
            return U.ANSIX12_ENCODE;
          case 239:
            return U.TEXT_ENCODE;
          case 240:
            return U.EDIFACT_ENCODE;
          case 241:
            break;
          default:
            if (i !== 254 || e.available() !== 0)
              throw new re.default();
            break;
        }
    } while (e.available() > 0);
    return U.ASCII_ENCODE;
  }, r.decodeC40Segment = function(e, t) {
    var n = !1, a = [], i = 0;
    do {
      if (e.available() === 8)
        return;
      var o = e.readBits(8);
      if (o === 254)
        return;
      this.parseTwoBytes(o, e.readBits(8), a);
      for (var u = 0; u < 3; u++) {
        var f = a[u];
        switch (i) {
          case 0:
            if (f < 3)
              i = f + 1;
            else if (f < this.C40_BASIC_SET_CHARS.length) {
              var l = this.C40_BASIC_SET_CHARS[f];
              n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l);
            } else
              throw new re.default();
            break;
          case 1:
            n ? (t.append(String.fromCharCode(f + 128)), n = !1) : t.append(String.fromCharCode(f)), i = 0;
            break;
          case 2:
            if (f < this.C40_SHIFT2_SET_CHARS.length) {
              var l = this.C40_SHIFT2_SET_CHARS[f];
              n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l);
            } else
              switch (f) {
                case 27:
                  t.append(String.fromCharCode(29));
                  break;
                case 30:
                  n = !0;
                  break;
                default:
                  throw new re.default();
              }
            i = 0;
            break;
          case 3:
            n ? (t.append(String.fromCharCode(f + 224)), n = !1) : t.append(String.fromCharCode(f + 96)), i = 0;
            break;
          default:
            throw new re.default();
        }
      }
    } while (e.available() > 0);
  }, r.decodeTextSegment = function(e, t) {
    var n = !1, a = [], i = 0;
    do {
      if (e.available() === 8)
        return;
      var o = e.readBits(8);
      if (o === 254)
        return;
      this.parseTwoBytes(o, e.readBits(8), a);
      for (var u = 0; u < 3; u++) {
        var f = a[u];
        switch (i) {
          case 0:
            if (f < 3)
              i = f + 1;
            else if (f < this.TEXT_BASIC_SET_CHARS.length) {
              var l = this.TEXT_BASIC_SET_CHARS[f];
              n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l);
            } else
              throw new re.default();
            break;
          case 1:
            n ? (t.append(String.fromCharCode(f + 128)), n = !1) : t.append(String.fromCharCode(f)), i = 0;
            break;
          case 2:
            if (f < this.TEXT_SHIFT2_SET_CHARS.length) {
              var l = this.TEXT_SHIFT2_SET_CHARS[f];
              n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l);
            } else
              switch (f) {
                case 27:
                  t.append(String.fromCharCode(29));
                  break;
                case 30:
                  n = !0;
                  break;
                default:
                  throw new re.default();
              }
            i = 0;
            break;
          case 3:
            if (f < this.TEXT_SHIFT3_SET_CHARS.length) {
              var l = this.TEXT_SHIFT3_SET_CHARS[f];
              n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l), i = 0;
            } else
              throw new re.default();
            break;
          default:
            throw new re.default();
        }
      }
    } while (e.available() > 0);
  }, r.decodeAnsiX12Segment = function(e, t) {
    var n = [];
    do {
      if (e.available() === 8)
        return;
      var a = e.readBits(8);
      if (a === 254)
        return;
      this.parseTwoBytes(a, e.readBits(8), n);
      for (var i = 0; i < 3; i++) {
        var o = n[i];
        switch (o) {
          case 0:
            t.append("\r");
            break;
          case 1:
            t.append("*");
            break;
          case 2:
            t.append(">");
            break;
          case 3:
            t.append(" ");
            break;
          default:
            if (o < 14)
              t.append(String.fromCharCode(o + 44));
            else if (o < 40)
              t.append(String.fromCharCode(o + 51));
            else
              throw new re.default();
            break;
        }
      }
    } while (e.available() > 0);
  }, r.parseTwoBytes = function(e, t, n) {
    var a = (e << 8) + t - 1, i = Math.floor(a / 1600);
    n[0] = i, a -= i * 1600, i = Math.floor(a / 40), n[1] = i, n[2] = a - i * 40;
  }, r.decodeEdifactSegment = function(e, t) {
    do {
      if (e.available() <= 16)
        return;
      for (var n = 0; n < 4; n++) {
        var a = e.readBits(6);
        if (a === 31) {
          var i = 8 - e.getBitOffset();
          i !== 8 && e.readBits(i);
          return;
        }
        (a & 32) === 0 && (a |= 64), t.append(String.fromCharCode(a));
      }
    } while (e.available() > 0);
  }, r.decodeBase256Segment = function(e, t, n) {
    var a = 1 + e.getByteOffset(), i = this.unrandomize255State(e.readBits(8), a++), o;
    if (i === 0 ? o = e.available() / 8 | 0 : i < 250 ? o = i : o = 250 * (i - 249) + this.unrandomize255State(e.readBits(8), a++), o < 0)
      throw new re.default();
    for (var u = new Uint8Array(o), f = 0; f < o; f++) {
      if (e.available() < 8)
        throw new re.default();
      u[f] = this.unrandomize255State(e.readBits(8), a++);
    }
    n.push(u);
    try {
      t.append(Bl.default.decode(u, Fl.default.ISO88591));
    } catch (l) {
      throw new Ll.default("Platform does not support required encoding: " + l.message);
    }
  }, r.unrandomize255State = function(e, t) {
    var n = 149 * t % 255 + 1, a = e - n;
    return a >= 0 ? a : a + 256;
  }, r.C40_BASIC_SET_CHARS = [
    "*",
    "*",
    "*",
    " ",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ], r.C40_SHIFT2_SET_CHARS = [
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_"
  ], r.TEXT_BASIC_SET_CHARS = [
    "*",
    "*",
    "*",
    " ",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ], r.TEXT_SHIFT2_SET_CHARS = r.C40_SHIFT2_SET_CHARS, r.TEXT_SHIFT3_SET_CHARS = [
    "`",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "{",
    "|",
    "}",
    "~",
    String.fromCharCode(127)
  ], r;
}();
ea.default = $l;
var kl = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(qn, "__esModule", { value: !0 });
var Ul = Ue, Gl = Ce, Hl = Qn, Vl = Jn, jl = ea, Wl = ue, Xl = function() {
  function r() {
    this.rsDecoder = new Ul.default(Gl.default.DATA_MATRIX_FIELD_256);
  }
  return r.prototype.decode = function(e) {
    var t, n, a = new Hl.default(e), i = a.getVersion(), o = a.readCodewords(), u = Vl.default.getDataBlocks(o, i), f = 0;
    try {
      for (var l = kl(u), c = l.next(); !c.done; c = l.next()) {
        var d = c.value;
        f += d.getNumDataCodewords();
      }
    } catch (A) {
      t = { error: A };
    } finally {
      try {
        c && !c.done && (n = l.return) && n.call(l);
      } finally {
        if (t)
          throw t.error;
      }
    }
    for (var s = new Uint8Array(f), v = u.length, h = 0; h < v; h++) {
      var x = u[h], _ = x.getCodewords(), g = x.getNumDataCodewords();
      this.correctErrors(_, g);
      for (var y = 0; y < g; y++)
        s[y * v + h] = _[y];
    }
    return jl.default.decode(s);
  }, r.prototype.correctErrors = function(e, t) {
    e.length;
    var n = new Int32Array(e);
    try {
      this.rsDecoder.decode(n, e.length - t);
    } catch {
      throw new Wl.default();
    }
    for (var a = 0; a < t; a++)
      e[a] = n[a];
  }, r;
}();
qn.default = Xl;
var ta = {};
Object.defineProperty(ta, "__esModule", { value: !0 });
var Jt = k, zl = Je, Yl = et, Zl = At, Kl = T, ql = function() {
  function r(e) {
    this.image = e, this.rectangleDetector = new Zl.default(this.image);
  }
  return r.prototype.detect = function() {
    var e = this.rectangleDetector.detect(), t = this.detectSolid1(e);
    if (t = this.detectSolid2(t), t[3] = this.correctTopRight(t), !t[3])
      throw new Kl.default();
    t = this.shiftToModuleCenter(t);
    var n = t[0], a = t[1], i = t[2], o = t[3], u = this.transitionsBetween(n, o) + 1, f = this.transitionsBetween(i, o) + 1;
    (u & 1) === 1 && (u += 1), (f & 1) === 1 && (f += 1), 4 * u < 7 * f && 4 * f < 7 * u && (u = f = Math.max(u, f));
    var l = r.sampleGrid(this.image, n, a, i, o, u, f);
    return new zl.default(l, [n, a, i, o]);
  }, r.shiftPoint = function(e, t, n) {
    var a = (t.getX() - e.getX()) / (n + 1), i = (t.getY() - e.getY()) / (n + 1);
    return new Jt.default(e.getX() + a, e.getY() + i);
  }, r.moveAway = function(e, t, n) {
    var a = e.getX(), i = e.getY();
    return a < t ? a -= 1 : a += 1, i < n ? i -= 1 : i += 1, new Jt.default(a, i);
  }, r.prototype.detectSolid1 = function(e) {
    var t = e[0], n = e[1], a = e[3], i = e[2], o = this.transitionsBetween(t, n), u = this.transitionsBetween(n, a), f = this.transitionsBetween(a, i), l = this.transitionsBetween(i, t), c = o, d = [i, t, n, a];
    return c > u && (c = u, d[0] = t, d[1] = n, d[2] = a, d[3] = i), c > f && (c = f, d[0] = n, d[1] = a, d[2] = i, d[3] = t), c > l && (d[0] = a, d[1] = i, d[2] = t, d[3] = n), d;
  }, r.prototype.detectSolid2 = function(e) {
    var t = e[0], n = e[1], a = e[2], i = e[3], o = this.transitionsBetween(t, i), u = r.shiftPoint(n, a, (o + 1) * 4), f = r.shiftPoint(a, n, (o + 1) * 4), l = this.transitionsBetween(u, t), c = this.transitionsBetween(f, i);
    return l < c ? (e[0] = t, e[1] = n, e[2] = a, e[3] = i) : (e[0] = n, e[1] = a, e[2] = i, e[3] = t), e;
  }, r.prototype.correctTopRight = function(e) {
    var t = e[0], n = e[1], a = e[2], i = e[3], o = this.transitionsBetween(t, i), u = this.transitionsBetween(n, i), f = r.shiftPoint(t, n, (u + 1) * 4), l = r.shiftPoint(a, n, (o + 1) * 4);
    o = this.transitionsBetween(f, i), u = this.transitionsBetween(l, i);
    var c = new Jt.default(i.getX() + (a.getX() - n.getX()) / (o + 1), i.getY() + (a.getY() - n.getY()) / (o + 1)), d = new Jt.default(i.getX() + (t.getX() - n.getX()) / (u + 1), i.getY() + (t.getY() - n.getY()) / (u + 1));
    if (!this.isValid(c))
      return this.isValid(d) ? d : null;
    if (!this.isValid(d))
      return c;
    var s = this.transitionsBetween(f, c) + this.transitionsBetween(l, c), v = this.transitionsBetween(f, d) + this.transitionsBetween(l, d);
    return s > v ? c : d;
  }, r.prototype.shiftToModuleCenter = function(e) {
    var t = e[0], n = e[1], a = e[2], i = e[3], o = this.transitionsBetween(t, i) + 1, u = this.transitionsBetween(a, i) + 1, f = r.shiftPoint(t, n, u * 4), l = r.shiftPoint(a, n, o * 4);
    o = this.transitionsBetween(f, i) + 1, u = this.transitionsBetween(l, i) + 1, (o & 1) === 1 && (o += 1), (u & 1) === 1 && (u += 1);
    var c = (t.getX() + n.getX() + a.getX() + i.getX()) / 4, d = (t.getY() + n.getY() + a.getY() + i.getY()) / 4;
    t = r.moveAway(t, c, d), n = r.moveAway(n, c, d), a = r.moveAway(a, c, d), i = r.moveAway(i, c, d);
    var s, v;
    return f = r.shiftPoint(t, n, u * 4), f = r.shiftPoint(f, i, o * 4), s = r.shiftPoint(n, t, u * 4), s = r.shiftPoint(s, a, o * 4), l = r.shiftPoint(a, i, u * 4), l = r.shiftPoint(l, n, o * 4), v = r.shiftPoint(i, a, u * 4), v = r.shiftPoint(v, t, o * 4), [f, s, l, v];
  }, r.prototype.isValid = function(e) {
    return e.getX() >= 0 && e.getX() < this.image.getWidth() && e.getY() > 0 && e.getY() < this.image.getHeight();
  }, r.sampleGrid = function(e, t, n, a, i, o, u) {
    var f = Yl.default.getInstance();
    return f.sampleGrid(e, o, u, 0.5, 0.5, o - 0.5, 0.5, o - 0.5, u - 0.5, 0.5, u - 0.5, t.getX(), t.getY(), i.getX(), i.getY(), a.getX(), a.getY(), n.getX(), n.getY());
  }, r.prototype.transitionsBetween = function(e, t) {
    var n = Math.trunc(e.getX()), a = Math.trunc(e.getY()), i = Math.trunc(t.getX()), o = Math.trunc(t.getY()), u = Math.abs(o - a) > Math.abs(i - n);
    if (u) {
      var f = n;
      n = a, a = f, f = i, i = o, o = f;
    }
    for (var l = Math.abs(i - n), c = Math.abs(o - a), d = -l / 2, s = a < o ? 1 : -1, v = n < i ? 1 : -1, h = 0, x = this.image.get(u ? a : n, u ? n : a), _ = n, g = a; _ !== i; _ += v) {
      var y = this.image.get(u ? g : _, u ? _ : g);
      if (y !== x && (h++, x = y), d += c, d > 0) {
        if (g === o)
          break;
        g += s, d -= l;
      }
    }
    return h;
  }, r;
}();
ta.default = ql;
Object.defineProperty(mt, "__esModule", { value: !0 });
var Ql = qn, Jl = J, ec = L, tc = Y, uo = de, rc = fe, nc = ta, ac = j, er = T, ic = function() {
  function r() {
    this.decoder = new Ql.default();
  }
  return r.prototype.decode = function(e, t) {
    t === void 0 && (t = null);
    var n, a;
    if (t != null && t.has(tc.default.PURE_BARCODE)) {
      var i = r.extractPureBits(e.getBlackMatrix());
      n = this.decoder.decode(i), a = r.NO_POINTS;
    } else {
      var o = new nc.default(e.getBlackMatrix()).detect();
      n = this.decoder.decode(o.getBits()), a = o.getPoints();
    }
    var u = n.getRawBytes(), f = new Jl.default(n.getText(), u, 8 * u.length, a, ec.default.DATA_MATRIX, ac.default.currentTimeMillis()), l = n.getByteSegments();
    l != null && f.putMetadata(uo.default.BYTE_SEGMENTS, l);
    var c = n.getECLevel();
    return c != null && f.putMetadata(uo.default.ERROR_CORRECTION_LEVEL, c), f;
  }, r.prototype.reset = function() {
  }, r.extractPureBits = function(e) {
    var t = e.getTopLeftOnBit(), n = e.getBottomRightOnBit();
    if (t == null || n == null)
      throw new er.default();
    var a = this.moduleSize(t, e), i = t[1], o = n[1], u = t[0], f = n[0], l = (f - u + 1) / a, c = (o - i + 1) / a;
    if (l <= 0 || c <= 0)
      throw new er.default();
    var d = a / 2;
    i += d, u += d;
    for (var s = new rc.default(l, c), v = 0; v < c; v++)
      for (var h = i + v * a, x = 0; x < l; x++)
        e.get(u + x * a, h) && s.set(x, v);
    return s;
  }, r.moduleSize = function(e, t) {
    for (var n = t.getWidth(), a = e[0], i = e[1]; a < n && t.get(a, i); )
      a++;
    if (a === n)
      throw new er.default();
    var o = a - e[0];
    if (o === 0)
      throw new er.default();
    return o;
  }, r.NO_POINTS = [], r;
}();
mt.default = ic;
var oc = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Kn, "__esModule", { value: !0 });
var uc = Ee, fc = mt, lc = function(r) {
  oc(e, r);
  function e(t) {
    return t === void 0 && (t = 500), r.call(this, new fc.default(), t) || this;
  }
  return e;
}(uc.BrowserCodeReader);
Kn.BrowserDatamatrixCodeReader = lc;
var tr = {}, rr = {}, Rt = {}, ra = {}, na = {}, Dt = {}, Gr = {}, Tt = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var e = _t, t = N, n;
  (function(i) {
    i[i.L = 0] = "L", i[i.M = 1] = "M", i[i.Q = 2] = "Q", i[i.H = 3] = "H";
  })(n = r.ErrorCorrectionLevelValues || (r.ErrorCorrectionLevelValues = {}));
  var a = function() {
    function i(o, u, f) {
      this.value = o, this.stringValue = u, this.bits = f, i.FOR_BITS.set(f, this), i.FOR_VALUE.set(o, this);
    }
    return i.prototype.getValue = function() {
      return this.value;
    }, i.prototype.getBits = function() {
      return this.bits;
    }, i.fromString = function(o) {
      switch (o) {
        case "L":
          return i.L;
        case "M":
          return i.M;
        case "Q":
          return i.Q;
        case "H":
          return i.H;
        default:
          throw new e.default(o + "not available");
      }
    }, i.prototype.toString = function() {
      return this.stringValue;
    }, i.prototype.equals = function(o) {
      if (!(o instanceof i))
        return !1;
      var u = o;
      return this.value === u.value;
    }, i.forBits = function(o) {
      if (o < 0 || o >= i.FOR_BITS.size)
        throw new t.default();
      return i.FOR_BITS.get(o);
    }, i.FOR_BITS = /* @__PURE__ */ new Map(), i.FOR_VALUE = /* @__PURE__ */ new Map(), i.L = new i(n.L, "L", 1), i.M = new i(n.M, "M", 0), i.Q = new i(n.Q, "Q", 3), i.H = new i(n.H, "H", 2), i;
  }();
  r.default = a;
})(Tt);
var cc = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Gr, "__esModule", { value: !0 });
var dc = Tt, sc = ce, vc = function() {
  function r(e) {
    this.errorCorrectionLevel = dc.default.forBits(e >> 3 & 3), this.dataMask = e & 7;
  }
  return r.numBitsDiffering = function(e, t) {
    return sc.default.bitCount(e ^ t);
  }, r.decodeFormatInformation = function(e, t) {
    var n = r.doDecodeFormatInformation(e, t);
    return n !== null ? n : r.doDecodeFormatInformation(e ^ r.FORMAT_INFO_MASK_QR, t ^ r.FORMAT_INFO_MASK_QR);
  }, r.doDecodeFormatInformation = function(e, t) {
    var n, a, i = Number.MAX_SAFE_INTEGER, o = 0;
    try {
      for (var u = cc(r.FORMAT_INFO_DECODE_LOOKUP), f = u.next(); !f.done; f = u.next()) {
        var l = f.value, c = l[0];
        if (c === e || c === t)
          return new r(l[1]);
        var d = r.numBitsDiffering(e, c);
        d < i && (o = l[1], i = d), e !== t && (d = r.numBitsDiffering(t, c), d < i && (o = l[1], i = d));
      }
    } catch (s) {
      n = { error: s };
    } finally {
      try {
        f && !f.done && (a = u.return) && a.call(u);
      } finally {
        if (n)
          throw n.error;
      }
    }
    return i <= 3 ? new r(o) : null;
  }, r.prototype.getErrorCorrectionLevel = function() {
    return this.errorCorrectionLevel;
  }, r.prototype.getDataMask = function() {
    return this.dataMask;
  }, r.prototype.hashCode = function() {
    return this.errorCorrectionLevel.getBits() << 3 | this.dataMask;
  }, r.prototype.equals = function(e) {
    if (!(e instanceof r))
      return !1;
    var t = e;
    return this.errorCorrectionLevel === t.errorCorrectionLevel && this.dataMask === t.dataMask;
  }, r.FORMAT_INFO_MASK_QR = 21522, r.FORMAT_INFO_DECODE_LOOKUP = [
    Int32Array.from([21522, 0]),
    Int32Array.from([20773, 1]),
    Int32Array.from([24188, 2]),
    Int32Array.from([23371, 3]),
    Int32Array.from([17913, 4]),
    Int32Array.from([16590, 5]),
    Int32Array.from([20375, 6]),
    Int32Array.from([19104, 7]),
    Int32Array.from([30660, 8]),
    Int32Array.from([29427, 9]),
    Int32Array.from([32170, 10]),
    Int32Array.from([30877, 11]),
    Int32Array.from([26159, 12]),
    Int32Array.from([25368, 13]),
    Int32Array.from([27713, 14]),
    Int32Array.from([26998, 15]),
    Int32Array.from([5769, 16]),
    Int32Array.from([5054, 17]),
    Int32Array.from([7399, 18]),
    Int32Array.from([6608, 19]),
    Int32Array.from([1890, 20]),
    Int32Array.from([597, 21]),
    Int32Array.from([3340, 22]),
    Int32Array.from([2107, 23]),
    Int32Array.from([13663, 24]),
    Int32Array.from([12392, 25]),
    Int32Array.from([16177, 26]),
    Int32Array.from([14854, 27]),
    Int32Array.from([9396, 28]),
    Int32Array.from([8579, 29]),
    Int32Array.from([11994, 30]),
    Int32Array.from([11245, 31])
  ], r;
}();
Gr.default = vc;
var aa = {}, hc = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(aa, "__esModule", { value: !0 });
var xc = function() {
  function r(e) {
    for (var t = [], n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
    this.ecCodewordsPerBlock = e, this.ecBlocks = t;
  }
  return r.prototype.getECCodewordsPerBlock = function() {
    return this.ecCodewordsPerBlock;
  }, r.prototype.getNumBlocks = function() {
    var e, t, n = 0, a = this.ecBlocks;
    try {
      for (var i = hc(a), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        n += u.getCount();
      }
    } catch (f) {
      e = { error: f };
    } finally {
      try {
        o && !o.done && (t = i.return) && t.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return n;
  }, r.prototype.getTotalECCodewords = function() {
    return this.ecCodewordsPerBlock * this.getNumBlocks();
  }, r.prototype.getECBlocks = function() {
    return this.ecBlocks;
  }, r;
}();
aa.default = xc;
var ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
var pc = function() {
  function r(e, t) {
    this.count = e, this.dataCodewords = t;
  }
  return r.prototype.getCount = function() {
    return this.count;
  }, r.prototype.getDataCodewords = function() {
    return this.dataCodewords;
  }, r;
}();
ia.default = pc;
var _c = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Dt, "__esModule", { value: !0 });
var gc = fe, yc = Gr, C = aa, p = ia, fo = F, Ec = N, Ac = function() {
  function r(e, t) {
    for (var n, a, i = [], o = 2; o < arguments.length; o++)
      i[o - 2] = arguments[o];
    this.versionNumber = e, this.alignmentPatternCenters = t, this.ecBlocks = i;
    var u = 0, f = i[0].getECCodewordsPerBlock(), l = i[0].getECBlocks();
    try {
      for (var c = _c(l), d = c.next(); !d.done; d = c.next()) {
        var s = d.value;
        u += s.getCount() * (s.getDataCodewords() + f);
      }
    } catch (v) {
      n = { error: v };
    } finally {
      try {
        d && !d.done && (a = c.return) && a.call(c);
      } finally {
        if (n)
          throw n.error;
      }
    }
    this.totalCodewords = u;
  }
  return r.prototype.getVersionNumber = function() {
    return this.versionNumber;
  }, r.prototype.getAlignmentPatternCenters = function() {
    return this.alignmentPatternCenters;
  }, r.prototype.getTotalCodewords = function() {
    return this.totalCodewords;
  }, r.prototype.getDimensionForVersion = function() {
    return 17 + 4 * this.versionNumber;
  }, r.prototype.getECBlocksForLevel = function(e) {
    return this.ecBlocks[e.getValue()];
  }, r.getProvisionalVersionForDimension = function(e) {
    if (e % 4 !== 1)
      throw new fo.default();
    try {
      return this.getVersionForNumber((e - 17) / 4);
    } catch {
      throw new fo.default();
    }
  }, r.getVersionForNumber = function(e) {
    if (e < 1 || e > 40)
      throw new Ec.default();
    return r.VERSIONS[e - 1];
  }, r.decodeVersionInformation = function(e) {
    for (var t = Number.MAX_SAFE_INTEGER, n = 0, a = 0; a < r.VERSION_DECODE_INFO.length; a++) {
      var i = r.VERSION_DECODE_INFO[a];
      if (i === e)
        return r.getVersionForNumber(a + 7);
      var o = yc.default.numBitsDiffering(e, i);
      o < t && (n = a + 7, t = o);
    }
    return t <= 3 ? r.getVersionForNumber(n) : null;
  }, r.prototype.buildFunctionPattern = function() {
    var e = this.getDimensionForVersion(), t = new gc.default(e);
    t.setRegion(0, 0, 9, 9), t.setRegion(e - 8, 0, 8, 9), t.setRegion(0, e - 8, 9, 8);
    for (var n = this.alignmentPatternCenters.length, a = 0; a < n; a++)
      for (var i = this.alignmentPatternCenters[a] - 2, o = 0; o < n; o++)
        a === 0 && (o === 0 || o === n - 1) || a === n - 1 && o === 0 || t.setRegion(this.alignmentPatternCenters[o] - 2, i, 5, 5);
    return t.setRegion(6, 9, 1, e - 17), t.setRegion(9, 6, e - 17, 1), this.versionNumber > 6 && (t.setRegion(e - 11, 0, 3, 6), t.setRegion(0, e - 11, 6, 3)), t;
  }, r.prototype.toString = function() {
    return "" + this.versionNumber;
  }, r.VERSION_DECODE_INFO = Int32Array.from([
    31892,
    34236,
    39577,
    42195,
    48118,
    51042,
    55367,
    58893,
    63784,
    68472,
    70749,
    76311,
    79154,
    84390,
    87683,
    92361,
    96236,
    102084,
    102881,
    110507,
    110734,
    117786,
    119615,
    126325,
    127568,
    133589,
    136944,
    141498,
    145311,
    150283,
    152622,
    158308,
    161089,
    167017
  ]), r.VERSIONS = [
    new r(1, new Int32Array(0), new C.default(7, new p.default(1, 19)), new C.default(10, new p.default(1, 16)), new C.default(13, new p.default(1, 13)), new C.default(17, new p.default(1, 9))),
    new r(2, Int32Array.from([6, 18]), new C.default(10, new p.default(1, 34)), new C.default(16, new p.default(1, 28)), new C.default(22, new p.default(1, 22)), new C.default(28, new p.default(1, 16))),
    new r(3, Int32Array.from([6, 22]), new C.default(15, new p.default(1, 55)), new C.default(26, new p.default(1, 44)), new C.default(18, new p.default(2, 17)), new C.default(22, new p.default(2, 13))),
    new r(4, Int32Array.from([6, 26]), new C.default(20, new p.default(1, 80)), new C.default(18, new p.default(2, 32)), new C.default(26, new p.default(2, 24)), new C.default(16, new p.default(4, 9))),
    new r(5, Int32Array.from([6, 30]), new C.default(26, new p.default(1, 108)), new C.default(24, new p.default(2, 43)), new C.default(18, new p.default(2, 15), new p.default(2, 16)), new C.default(22, new p.default(2, 11), new p.default(2, 12))),
    new r(6, Int32Array.from([6, 34]), new C.default(18, new p.default(2, 68)), new C.default(16, new p.default(4, 27)), new C.default(24, new p.default(4, 19)), new C.default(28, new p.default(4, 15))),
    new r(7, Int32Array.from([6, 22, 38]), new C.default(20, new p.default(2, 78)), new C.default(18, new p.default(4, 31)), new C.default(18, new p.default(2, 14), new p.default(4, 15)), new C.default(26, new p.default(4, 13), new p.default(1, 14))),
    new r(8, Int32Array.from([6, 24, 42]), new C.default(24, new p.default(2, 97)), new C.default(22, new p.default(2, 38), new p.default(2, 39)), new C.default(22, new p.default(4, 18), new p.default(2, 19)), new C.default(26, new p.default(4, 14), new p.default(2, 15))),
    new r(9, Int32Array.from([6, 26, 46]), new C.default(30, new p.default(2, 116)), new C.default(22, new p.default(3, 36), new p.default(2, 37)), new C.default(20, new p.default(4, 16), new p.default(4, 17)), new C.default(24, new p.default(4, 12), new p.default(4, 13))),
    new r(10, Int32Array.from([6, 28, 50]), new C.default(18, new p.default(2, 68), new p.default(2, 69)), new C.default(26, new p.default(4, 43), new p.default(1, 44)), new C.default(24, new p.default(6, 19), new p.default(2, 20)), new C.default(28, new p.default(6, 15), new p.default(2, 16))),
    new r(11, Int32Array.from([6, 30, 54]), new C.default(20, new p.default(4, 81)), new C.default(30, new p.default(1, 50), new p.default(4, 51)), new C.default(28, new p.default(4, 22), new p.default(4, 23)), new C.default(24, new p.default(3, 12), new p.default(8, 13))),
    new r(12, Int32Array.from([6, 32, 58]), new C.default(24, new p.default(2, 92), new p.default(2, 93)), new C.default(22, new p.default(6, 36), new p.default(2, 37)), new C.default(26, new p.default(4, 20), new p.default(6, 21)), new C.default(28, new p.default(7, 14), new p.default(4, 15))),
    new r(13, Int32Array.from([6, 34, 62]), new C.default(26, new p.default(4, 107)), new C.default(22, new p.default(8, 37), new p.default(1, 38)), new C.default(24, new p.default(8, 20), new p.default(4, 21)), new C.default(22, new p.default(12, 11), new p.default(4, 12))),
    new r(14, Int32Array.from([6, 26, 46, 66]), new C.default(30, new p.default(3, 115), new p.default(1, 116)), new C.default(24, new p.default(4, 40), new p.default(5, 41)), new C.default(20, new p.default(11, 16), new p.default(5, 17)), new C.default(24, new p.default(11, 12), new p.default(5, 13))),
    new r(15, Int32Array.from([6, 26, 48, 70]), new C.default(22, new p.default(5, 87), new p.default(1, 88)), new C.default(24, new p.default(5, 41), new p.default(5, 42)), new C.default(30, new p.default(5, 24), new p.default(7, 25)), new C.default(24, new p.default(11, 12), new p.default(7, 13))),
    new r(16, Int32Array.from([6, 26, 50, 74]), new C.default(24, new p.default(5, 98), new p.default(1, 99)), new C.default(28, new p.default(7, 45), new p.default(3, 46)), new C.default(24, new p.default(15, 19), new p.default(2, 20)), new C.default(30, new p.default(3, 15), new p.default(13, 16))),
    new r(17, Int32Array.from([6, 30, 54, 78]), new C.default(28, new p.default(1, 107), new p.default(5, 108)), new C.default(28, new p.default(10, 46), new p.default(1, 47)), new C.default(28, new p.default(1, 22), new p.default(15, 23)), new C.default(28, new p.default(2, 14), new p.default(17, 15))),
    new r(18, Int32Array.from([6, 30, 56, 82]), new C.default(30, new p.default(5, 120), new p.default(1, 121)), new C.default(26, new p.default(9, 43), new p.default(4, 44)), new C.default(28, new p.default(17, 22), new p.default(1, 23)), new C.default(28, new p.default(2, 14), new p.default(19, 15))),
    new r(19, Int32Array.from([6, 30, 58, 86]), new C.default(28, new p.default(3, 113), new p.default(4, 114)), new C.default(26, new p.default(3, 44), new p.default(11, 45)), new C.default(26, new p.default(17, 21), new p.default(4, 22)), new C.default(26, new p.default(9, 13), new p.default(16, 14))),
    new r(20, Int32Array.from([6, 34, 62, 90]), new C.default(28, new p.default(3, 107), new p.default(5, 108)), new C.default(26, new p.default(3, 41), new p.default(13, 42)), new C.default(30, new p.default(15, 24), new p.default(5, 25)), new C.default(28, new p.default(15, 15), new p.default(10, 16))),
    new r(21, Int32Array.from([6, 28, 50, 72, 94]), new C.default(28, new p.default(4, 116), new p.default(4, 117)), new C.default(26, new p.default(17, 42)), new C.default(28, new p.default(17, 22), new p.default(6, 23)), new C.default(30, new p.default(19, 16), new p.default(6, 17))),
    new r(22, Int32Array.from([6, 26, 50, 74, 98]), new C.default(28, new p.default(2, 111), new p.default(7, 112)), new C.default(28, new p.default(17, 46)), new C.default(30, new p.default(7, 24), new p.default(16, 25)), new C.default(24, new p.default(34, 13))),
    new r(23, Int32Array.from([6, 30, 54, 78, 102]), new C.default(30, new p.default(4, 121), new p.default(5, 122)), new C.default(28, new p.default(4, 47), new p.default(14, 48)), new C.default(30, new p.default(11, 24), new p.default(14, 25)), new C.default(30, new p.default(16, 15), new p.default(14, 16))),
    new r(24, Int32Array.from([6, 28, 54, 80, 106]), new C.default(30, new p.default(6, 117), new p.default(4, 118)), new C.default(28, new p.default(6, 45), new p.default(14, 46)), new C.default(30, new p.default(11, 24), new p.default(16, 25)), new C.default(30, new p.default(30, 16), new p.default(2, 17))),
    new r(25, Int32Array.from([6, 32, 58, 84, 110]), new C.default(26, new p.default(8, 106), new p.default(4, 107)), new C.default(28, new p.default(8, 47), new p.default(13, 48)), new C.default(30, new p.default(7, 24), new p.default(22, 25)), new C.default(30, new p.default(22, 15), new p.default(13, 16))),
    new r(26, Int32Array.from([6, 30, 58, 86, 114]), new C.default(28, new p.default(10, 114), new p.default(2, 115)), new C.default(28, new p.default(19, 46), new p.default(4, 47)), new C.default(28, new p.default(28, 22), new p.default(6, 23)), new C.default(30, new p.default(33, 16), new p.default(4, 17))),
    new r(27, Int32Array.from([6, 34, 62, 90, 118]), new C.default(30, new p.default(8, 122), new p.default(4, 123)), new C.default(28, new p.default(22, 45), new p.default(3, 46)), new C.default(30, new p.default(8, 23), new p.default(26, 24)), new C.default(30, new p.default(12, 15), new p.default(28, 16))),
    new r(28, Int32Array.from([6, 26, 50, 74, 98, 122]), new C.default(30, new p.default(3, 117), new p.default(10, 118)), new C.default(28, new p.default(3, 45), new p.default(23, 46)), new C.default(30, new p.default(4, 24), new p.default(31, 25)), new C.default(30, new p.default(11, 15), new p.default(31, 16))),
    new r(29, Int32Array.from([6, 30, 54, 78, 102, 126]), new C.default(30, new p.default(7, 116), new p.default(7, 117)), new C.default(28, new p.default(21, 45), new p.default(7, 46)), new C.default(30, new p.default(1, 23), new p.default(37, 24)), new C.default(30, new p.default(19, 15), new p.default(26, 16))),
    new r(30, Int32Array.from([6, 26, 52, 78, 104, 130]), new C.default(30, new p.default(5, 115), new p.default(10, 116)), new C.default(28, new p.default(19, 47), new p.default(10, 48)), new C.default(30, new p.default(15, 24), new p.default(25, 25)), new C.default(30, new p.default(23, 15), new p.default(25, 16))),
    new r(31, Int32Array.from([6, 30, 56, 82, 108, 134]), new C.default(30, new p.default(13, 115), new p.default(3, 116)), new C.default(28, new p.default(2, 46), new p.default(29, 47)), new C.default(30, new p.default(42, 24), new p.default(1, 25)), new C.default(30, new p.default(23, 15), new p.default(28, 16))),
    new r(32, Int32Array.from([6, 34, 60, 86, 112, 138]), new C.default(30, new p.default(17, 115)), new C.default(28, new p.default(10, 46), new p.default(23, 47)), new C.default(30, new p.default(10, 24), new p.default(35, 25)), new C.default(30, new p.default(19, 15), new p.default(35, 16))),
    new r(33, Int32Array.from([6, 30, 58, 86, 114, 142]), new C.default(30, new p.default(17, 115), new p.default(1, 116)), new C.default(28, new p.default(14, 46), new p.default(21, 47)), new C.default(30, new p.default(29, 24), new p.default(19, 25)), new C.default(30, new p.default(11, 15), new p.default(46, 16))),
    new r(34, Int32Array.from([6, 34, 62, 90, 118, 146]), new C.default(30, new p.default(13, 115), new p.default(6, 116)), new C.default(28, new p.default(14, 46), new p.default(23, 47)), new C.default(30, new p.default(44, 24), new p.default(7, 25)), new C.default(30, new p.default(59, 16), new p.default(1, 17))),
    new r(35, Int32Array.from([6, 30, 54, 78, 102, 126, 150]), new C.default(30, new p.default(12, 121), new p.default(7, 122)), new C.default(28, new p.default(12, 47), new p.default(26, 48)), new C.default(30, new p.default(39, 24), new p.default(14, 25)), new C.default(30, new p.default(22, 15), new p.default(41, 16))),
    new r(36, Int32Array.from([6, 24, 50, 76, 102, 128, 154]), new C.default(30, new p.default(6, 121), new p.default(14, 122)), new C.default(28, new p.default(6, 47), new p.default(34, 48)), new C.default(30, new p.default(46, 24), new p.default(10, 25)), new C.default(30, new p.default(2, 15), new p.default(64, 16))),
    new r(37, Int32Array.from([6, 28, 54, 80, 106, 132, 158]), new C.default(30, new p.default(17, 122), new p.default(4, 123)), new C.default(28, new p.default(29, 46), new p.default(14, 47)), new C.default(30, new p.default(49, 24), new p.default(10, 25)), new C.default(30, new p.default(24, 15), new p.default(46, 16))),
    new r(38, Int32Array.from([6, 32, 58, 84, 110, 136, 162]), new C.default(30, new p.default(4, 122), new p.default(18, 123)), new C.default(28, new p.default(13, 46), new p.default(32, 47)), new C.default(30, new p.default(48, 24), new p.default(14, 25)), new C.default(30, new p.default(42, 15), new p.default(32, 16))),
    new r(39, Int32Array.from([6, 26, 54, 82, 110, 138, 166]), new C.default(30, new p.default(20, 117), new p.default(4, 118)), new C.default(28, new p.default(40, 47), new p.default(7, 48)), new C.default(30, new p.default(43, 24), new p.default(22, 25)), new C.default(30, new p.default(10, 15), new p.default(67, 16))),
    new r(40, Int32Array.from([6, 30, 58, 86, 114, 142, 170]), new C.default(30, new p.default(19, 118), new p.default(6, 119)), new C.default(28, new p.default(18, 47), new p.default(31, 48)), new C.default(30, new p.default(34, 24), new p.default(34, 25)), new C.default(30, new p.default(20, 15), new p.default(61, 16)))
  ], r;
}();
Dt.default = Ac;
var Wo = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var e;
  (function(n) {
    n[n.DATA_MASK_000 = 0] = "DATA_MASK_000", n[n.DATA_MASK_001 = 1] = "DATA_MASK_001", n[n.DATA_MASK_010 = 2] = "DATA_MASK_010", n[n.DATA_MASK_011 = 3] = "DATA_MASK_011", n[n.DATA_MASK_100 = 4] = "DATA_MASK_100", n[n.DATA_MASK_101 = 5] = "DATA_MASK_101", n[n.DATA_MASK_110 = 6] = "DATA_MASK_110", n[n.DATA_MASK_111 = 7] = "DATA_MASK_111";
  })(e = r.DataMaskValues || (r.DataMaskValues = {}));
  var t = function() {
    function n(a, i) {
      this.value = a, this.isMasked = i;
    }
    return n.prototype.unmaskBitMatrix = function(a, i) {
      for (var o = 0; o < i; o++)
        for (var u = 0; u < i; u++)
          this.isMasked(o, u) && a.flip(u, o);
    }, n.values = /* @__PURE__ */ new Map([
      [e.DATA_MASK_000, new n(e.DATA_MASK_000, function(a, i) {
        return (a + i & 1) === 0;
      })],
      [e.DATA_MASK_001, new n(e.DATA_MASK_001, function(a, i) {
        return (a & 1) === 0;
      })],
      [e.DATA_MASK_010, new n(e.DATA_MASK_010, function(a, i) {
        return i % 3 === 0;
      })],
      [e.DATA_MASK_011, new n(e.DATA_MASK_011, function(a, i) {
        return (a + i) % 3 === 0;
      })],
      [e.DATA_MASK_100, new n(e.DATA_MASK_100, function(a, i) {
        return (Math.floor(a / 2) + Math.floor(i / 3) & 1) === 0;
      })],
      [e.DATA_MASK_101, new n(e.DATA_MASK_101, function(a, i) {
        return a * i % 6 === 0;
      })],
      [e.DATA_MASK_110, new n(e.DATA_MASK_110, function(a, i) {
        return a * i % 6 < 3;
      })],
      [e.DATA_MASK_111, new n(e.DATA_MASK_111, function(a, i) {
        return (a + i + a * i % 3 & 1) === 0;
      })]
    ]), n;
  }();
  r.default = t;
})(Wo);
Object.defineProperty(na, "__esModule", { value: !0 });
var gn = Dt, wc = Gr, lo = Wo, nr = F, Cc = function() {
  function r(e) {
    var t = e.getHeight();
    if (t < 21 || (t & 3) !== 1)
      throw new nr.default();
    this.bitMatrix = e;
  }
  return r.prototype.readFormatInformation = function() {
    if (this.parsedFormatInfo !== null && this.parsedFormatInfo !== void 0)
      return this.parsedFormatInfo;
    for (var e = 0, t = 0; t < 6; t++)
      e = this.copyBit(t, 8, e);
    e = this.copyBit(7, 8, e), e = this.copyBit(8, 8, e), e = this.copyBit(8, 7, e);
    for (var n = 5; n >= 0; n--)
      e = this.copyBit(8, n, e);
    for (var a = this.bitMatrix.getHeight(), i = 0, o = a - 7, n = a - 1; n >= o; n--)
      i = this.copyBit(8, n, i);
    for (var t = a - 8; t < a; t++)
      i = this.copyBit(t, 8, i);
    if (this.parsedFormatInfo = wc.default.decodeFormatInformation(e, i), this.parsedFormatInfo !== null)
      return this.parsedFormatInfo;
    throw new nr.default();
  }, r.prototype.readVersion = function() {
    if (this.parsedVersion !== null && this.parsedVersion !== void 0)
      return this.parsedVersion;
    var e = this.bitMatrix.getHeight(), t = Math.floor((e - 17) / 4);
    if (t <= 6)
      return gn.default.getVersionForNumber(t);
    for (var n = 0, a = e - 11, i = 5; i >= 0; i--)
      for (var o = e - 9; o >= a; o--)
        n = this.copyBit(o, i, n);
    var u = gn.default.decodeVersionInformation(n);
    if (u !== null && u.getDimensionForVersion() === e)
      return this.parsedVersion = u, u;
    n = 0;
    for (var o = 5; o >= 0; o--)
      for (var i = e - 9; i >= a; i--)
        n = this.copyBit(o, i, n);
    if (u = gn.default.decodeVersionInformation(n), u !== null && u.getDimensionForVersion() === e)
      return this.parsedVersion = u, u;
    throw new nr.default();
  }, r.prototype.copyBit = function(e, t, n) {
    var a = this.isMirror ? this.bitMatrix.get(t, e) : this.bitMatrix.get(e, t);
    return a ? n << 1 | 1 : n << 1;
  }, r.prototype.readCodewords = function() {
    var e = this.readFormatInformation(), t = this.readVersion(), n = lo.default.values.get(e.getDataMask()), a = this.bitMatrix.getHeight();
    n.unmaskBitMatrix(this.bitMatrix, a);
    for (var i = t.buildFunctionPattern(), o = !0, u = new Uint8Array(t.getTotalCodewords()), f = 0, l = 0, c = 0, d = a - 1; d > 0; d -= 2) {
      d === 6 && d--;
      for (var s = 0; s < a; s++)
        for (var v = o ? a - 1 - s : s, h = 0; h < 2; h++)
          i.get(d - h, v) || (c++, l <<= 1, this.bitMatrix.get(d - h, v) && (l |= 1), c === 8 && (u[f++] = l, c = 0, l = 0));
      o = !o;
    }
    if (f !== t.getTotalCodewords())
      throw new nr.default();
    return u;
  }, r.prototype.remask = function() {
    if (this.parsedFormatInfo !== null) {
      var e = lo.default.values[this.parsedFormatInfo.getDataMask()], t = this.bitMatrix.getHeight();
      e.unmaskBitMatrix(this.bitMatrix, t);
    }
  }, r.prototype.setMirror = function(e) {
    this.parsedVersion = null, this.parsedFormatInfo = null, this.isMirror = e;
  }, r.prototype.mirror = function() {
    for (var e = this.bitMatrix, t = 0, n = e.getWidth(); t < n; t++)
      for (var a = t + 1, i = e.getHeight(); a < i; a++)
        e.get(t, a) !== e.get(a, t) && (e.flip(a, t), e.flip(t, a));
  }, r;
}();
na.default = Cc;
var Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
var Sc = function() {
  function r(e) {
    this.mirrored = e;
  }
  return r.prototype.isMirrored = function() {
    return this.mirrored;
  }, r.prototype.applyMirroredCorrection = function(e) {
    if (!(!this.mirrored || e === null || e.length < 3)) {
      var t = e[0];
      e[0] = e[2], e[2] = t;
    }
  }, r;
}();
Hr.default = Sc;
var oa = {}, co = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(oa, "__esModule", { value: !0 });
var mc = N, Ic = function() {
  function r(e, t) {
    this.numDataCodewords = e, this.codewords = t;
  }
  return r.getDataBlocks = function(e, t, n) {
    var a, i, o, u;
    if (e.length !== t.getTotalCodewords())
      throw new mc.default();
    var f = t.getECBlocksForLevel(n), l = 0, c = f.getECBlocks();
    try {
      for (var d = co(c), s = d.next(); !s.done; s = d.next()) {
        var v = s.value;
        l += v.getCount();
      }
    } catch (H) {
      a = { error: H };
    } finally {
      try {
        s && !s.done && (i = d.return) && i.call(d);
      } finally {
        if (a)
          throw a.error;
      }
    }
    var h = new Array(l), x = 0;
    try {
      for (var _ = co(c), g = _.next(); !g.done; g = _.next())
        for (var v = g.value, y = 0; y < v.getCount(); y++) {
          var A = v.getDataCodewords(), w = f.getECCodewordsPerBlock() + A;
          h[x++] = new r(A, new Uint8Array(w));
        }
    } catch (H) {
      o = { error: H };
    } finally {
      try {
        g && !g.done && (u = _.return) && u.call(_);
      } finally {
        if (o)
          throw o.error;
      }
    }
    for (var S = h[0].codewords.length, m = h.length - 1; m >= 0; ) {
      var I = h[m].codewords.length;
      if (I === S)
        break;
      m--;
    }
    m++;
    for (var O = S - f.getECCodewordsPerBlock(), D = 0, y = 0; y < O; y++)
      for (var R = 0; R < x; R++)
        h[R].codewords[y] = e[D++];
    for (var R = m; R < x; R++)
      h[R].codewords[O] = e[D++];
    for (var M = h[0].codewords.length, y = O; y < M; y++)
      for (var R = 0; R < x; R++) {
        var W = R < m ? y : y + 1;
        h[R].codewords[W] = e[D++];
      }
    return h;
  }, r.prototype.getNumDataCodewords = function() {
    return this.numDataCodewords;
  }, r.prototype.getCodewords = function() {
    return this.codewords;
  }, r;
}();
oa.default = Ic;
var ua = {}, fa = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var e = N, t;
  (function(a) {
    a[a.TERMINATOR = 0] = "TERMINATOR", a[a.NUMERIC = 1] = "NUMERIC", a[a.ALPHANUMERIC = 2] = "ALPHANUMERIC", a[a.STRUCTURED_APPEND = 3] = "STRUCTURED_APPEND", a[a.BYTE = 4] = "BYTE", a[a.ECI = 5] = "ECI", a[a.KANJI = 6] = "KANJI", a[a.FNC1_FIRST_POSITION = 7] = "FNC1_FIRST_POSITION", a[a.FNC1_SECOND_POSITION = 8] = "FNC1_SECOND_POSITION", a[a.HANZI = 9] = "HANZI";
  })(t = r.ModeValues || (r.ModeValues = {}));
  var n = function() {
    function a(i, o, u, f) {
      this.value = i, this.stringValue = o, this.characterCountBitsForVersions = u, this.bits = f, a.FOR_BITS.set(f, this), a.FOR_VALUE.set(i, this);
    }
    return a.forBits = function(i) {
      var o = a.FOR_BITS.get(i);
      if (o === void 0)
        throw new e.default();
      return o;
    }, a.prototype.getCharacterCountBits = function(i) {
      var o = i.getVersionNumber(), u;
      return o <= 9 ? u = 0 : o <= 26 ? u = 1 : u = 2, this.characterCountBitsForVersions[u];
    }, a.prototype.getValue = function() {
      return this.value;
    }, a.prototype.getBits = function() {
      return this.bits;
    }, a.prototype.equals = function(i) {
      if (!(i instanceof a))
        return !1;
      var o = i;
      return this.value === o.value;
    }, a.prototype.toString = function() {
      return this.stringValue;
    }, a.FOR_BITS = /* @__PURE__ */ new Map(), a.FOR_VALUE = /* @__PURE__ */ new Map(), a.TERMINATOR = new a(t.TERMINATOR, "TERMINATOR", Int32Array.from([0, 0, 0]), 0), a.NUMERIC = new a(t.NUMERIC, "NUMERIC", Int32Array.from([10, 12, 14]), 1), a.ALPHANUMERIC = new a(t.ALPHANUMERIC, "ALPHANUMERIC", Int32Array.from([9, 11, 13]), 2), a.STRUCTURED_APPEND = new a(t.STRUCTURED_APPEND, "STRUCTURED_APPEND", Int32Array.from([0, 0, 0]), 3), a.BYTE = new a(t.BYTE, "BYTE", Int32Array.from([8, 16, 16]), 4), a.ECI = new a(t.ECI, "ECI", Int32Array.from([0, 0, 0]), 7), a.KANJI = new a(t.KANJI, "KANJI", Int32Array.from([8, 10, 12]), 8), a.FNC1_FIRST_POSITION = new a(t.FNC1_FIRST_POSITION, "FNC1_FIRST_POSITION", Int32Array.from([0, 0, 0]), 5), a.FNC1_SECOND_POSITION = new a(t.FNC1_SECOND_POSITION, "FNC1_SECOND_POSITION", Int32Array.from([0, 0, 0]), 9), a.HANZI = new a(t.HANZI, "HANZI", Int32Array.from([8, 10, 12]), 13), a;
  }();
  r.default = n;
})(fa);
Object.defineProperty(ua, "__esModule", { value: !0 });
var Oc = Ot, Rc = Fe, Dc = ke, yn = Ke, ne = fa, Tc = G, En = Le, $ = F, Pc = function() {
  function r() {
  }
  return r.decode = function(e, t, n, a) {
    var i = new Oc.default(e), o = new Tc.default(), u = new Array(), f = -1, l = -1;
    try {
      var c = null, d = !1, s = void 0;
      do {
        if (i.available() < 4)
          s = ne.default.TERMINATOR;
        else {
          var v = i.readBits(4);
          s = ne.default.forBits(v);
        }
        switch (s) {
          case ne.default.TERMINATOR:
            break;
          case ne.default.FNC1_FIRST_POSITION:
          case ne.default.FNC1_SECOND_POSITION:
            d = !0;
            break;
          case ne.default.STRUCTURED_APPEND:
            if (i.available() < 16)
              throw new $.default();
            f = i.readBits(8), l = i.readBits(8);
            break;
          case ne.default.ECI:
            var h = r.parseECIValue(i);
            if (c = Rc.default.getCharacterSetECIByValue(h), c === null)
              throw new $.default();
            break;
          case ne.default.HANZI:
            var x = i.readBits(4), _ = i.readBits(s.getCharacterCountBits(t));
            x === r.GB2312_SUBSET && r.decodeHanziSegment(i, o, _);
            break;
          default:
            var g = i.readBits(s.getCharacterCountBits(t));
            switch (s) {
              case ne.default.NUMERIC:
                r.decodeNumericSegment(i, o, g);
                break;
              case ne.default.ALPHANUMERIC:
                r.decodeAlphanumericSegment(i, o, g, d);
                break;
              case ne.default.BYTE:
                r.decodeByteSegment(i, o, g, c, u, a);
                break;
              case ne.default.KANJI:
                r.decodeKanjiSegment(i, o, g);
                break;
              default:
                throw new $.default();
            }
            break;
        }
      } while (s !== ne.default.TERMINATOR);
    } catch {
      throw new $.default();
    }
    return new Dc.default(e, o.toString(), u.length === 0 ? null : u, n === null ? null : n.toString(), f, l);
  }, r.decodeHanziSegment = function(e, t, n) {
    if (n * 13 > e.available())
      throw new $.default();
    for (var a = new Uint8Array(2 * n), i = 0; n > 0; ) {
      var o = e.readBits(13), u = o / 96 << 8 & 4294967295 | o % 96;
      u < 959 ? u += 41377 : u += 42657, a[i] = u >> 8 & 255, a[i + 1] = u & 255, i += 2, n--;
    }
    try {
      t.append(En.default.decode(a, yn.default.GB2312));
    } catch (f) {
      throw new $.default(f);
    }
  }, r.decodeKanjiSegment = function(e, t, n) {
    if (n * 13 > e.available())
      throw new $.default();
    for (var a = new Uint8Array(2 * n), i = 0; n > 0; ) {
      var o = e.readBits(13), u = o / 192 << 8 & 4294967295 | o % 192;
      u < 7936 ? u += 33088 : u += 49472, a[i] = u >> 8, a[i + 1] = u, i += 2, n--;
    }
    try {
      t.append(En.default.decode(a, yn.default.SHIFT_JIS));
    } catch (f) {
      throw new $.default(f);
    }
  }, r.decodeByteSegment = function(e, t, n, a, i, o) {
    if (8 * n > e.available())
      throw new $.default();
    for (var u = new Uint8Array(n), f = 0; f < n; f++)
      u[f] = e.readBits(8);
    var l;
    a === null ? l = yn.default.guessEncoding(u, o) : l = a.getName();
    try {
      t.append(En.default.decode(u, l));
    } catch (c) {
      throw new $.default(c);
    }
    i.push(u);
  }, r.toAlphaNumericChar = function(e) {
    if (e >= r.ALPHANUMERIC_CHARS.length)
      throw new $.default();
    return r.ALPHANUMERIC_CHARS[e];
  }, r.decodeAlphanumericSegment = function(e, t, n, a) {
    for (var i = t.length(); n > 1; ) {
      if (e.available() < 11)
        throw new $.default();
      var o = e.readBits(11);
      t.append(r.toAlphaNumericChar(Math.floor(o / 45))), t.append(r.toAlphaNumericChar(o % 45)), n -= 2;
    }
    if (n === 1) {
      if (e.available() < 6)
        throw new $.default();
      t.append(r.toAlphaNumericChar(e.readBits(6)));
    }
    if (a)
      for (var u = i; u < t.length(); u++)
        t.charAt(u) === "%" && (u < t.length() - 1 && t.charAt(u + 1) === "%" ? t.deleteCharAt(u + 1) : t.setCharAt(u, String.fromCharCode(29)));
  }, r.decodeNumericSegment = function(e, t, n) {
    for (; n >= 3; ) {
      if (e.available() < 10)
        throw new $.default();
      var a = e.readBits(10);
      if (a >= 1e3)
        throw new $.default();
      t.append(r.toAlphaNumericChar(Math.floor(a / 100))), t.append(r.toAlphaNumericChar(Math.floor(a / 10) % 10)), t.append(r.toAlphaNumericChar(a % 10)), n -= 3;
    }
    if (n === 2) {
      if (e.available() < 7)
        throw new $.default();
      var i = e.readBits(7);
      if (i >= 100)
        throw new $.default();
      t.append(r.toAlphaNumericChar(Math.floor(i / 10))), t.append(r.toAlphaNumericChar(i % 10));
    } else if (n === 1) {
      if (e.available() < 4)
        throw new $.default();
      var o = e.readBits(4);
      if (o >= 10)
        throw new $.default();
      t.append(r.toAlphaNumericChar(o));
    }
  }, r.parseECIValue = function(e) {
    var t = e.readBits(8);
    if ((t & 128) === 0)
      return t & 127;
    if ((t & 192) === 128) {
      var n = e.readBits(8);
      return (t & 63) << 8 & 4294967295 | n;
    }
    if ((t & 224) === 192) {
      var a = e.readBits(16);
      return (t & 31) << 16 & 4294967295 | a;
    }
    throw new $.default();
  }, r.ALPHANUMERIC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:", r.GB2312_SUBSET = 1, r;
}();
ua.default = Pc;
var so = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(ra, "__esModule", { value: !0 });
var bc = fe, Nc = Ce, Mc = Ue, Bc = na, Fc = Hr, Lc = oa, $c = ua, kc = ue, Uc = function() {
  function r() {
    this.rsDecoder = new Mc.default(Nc.default.QR_CODE_FIELD_256);
  }
  return r.prototype.decodeBooleanArray = function(e, t) {
    return this.decodeBitMatrix(bc.default.parseFromBooleanArray(e), t);
  }, r.prototype.decodeBitMatrix = function(e, t) {
    var n = new Bc.default(e), a = null;
    try {
      return this.decodeBitMatrixParser(n, t);
    } catch (o) {
      a = o;
    }
    try {
      n.remask(), n.setMirror(!0), n.readVersion(), n.readFormatInformation(), n.mirror();
      var i = this.decodeBitMatrixParser(n, t);
      return i.setOther(new Fc.default(!0)), i;
    } catch (o) {
      throw a !== null ? a : o;
    }
  }, r.prototype.decodeBitMatrixParser = function(e, t) {
    var n, a, i, o, u = e.readVersion(), f = e.readFormatInformation().getErrorCorrectionLevel(), l = e.readCodewords(), c = Lc.default.getDataBlocks(l, u, f), d = 0;
    try {
      for (var s = so(c), v = s.next(); !v.done; v = s.next()) {
        var h = v.value;
        d += h.getNumDataCodewords();
      }
    } catch (m) {
      n = { error: m };
    } finally {
      try {
        v && !v.done && (a = s.return) && a.call(s);
      } finally {
        if (n)
          throw n.error;
      }
    }
    var x = new Uint8Array(d), _ = 0;
    try {
      for (var g = so(c), y = g.next(); !y.done; y = g.next()) {
        var h = y.value, A = h.getCodewords(), w = h.getNumDataCodewords();
        this.correctErrors(A, w);
        for (var S = 0; S < w; S++)
          x[_++] = A[S];
      }
    } catch (m) {
      i = { error: m };
    } finally {
      try {
        y && !y.done && (o = g.return) && o.call(g);
      } finally {
        if (i)
          throw i.error;
      }
    }
    return $c.default.decode(x, u, f, t);
  }, r.prototype.correctErrors = function(e, t) {
    e.length;
    var n = new Int32Array(e);
    try {
      this.rsDecoder.decode(n, e.length - t);
    } catch {
      throw new kc.default();
    }
    for (var a = 0; a < t; a++)
      e[a] = n[a];
  }, r;
}();
ra.default = Uc;
var la = {}, ca = {}, da = {}, Gc = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(da, "__esModule", { value: !0 });
var Hc = k, Vc = function(r) {
  Gc(e, r);
  function e(t, n, a, i) {
    var o = r.call(this, t, n) || this;
    return o.estimatedModuleSize = a, o.count = i, i === void 0 && (o.count = 1), o;
  }
  return e.prototype.getEstimatedModuleSize = function() {
    return this.estimatedModuleSize;
  }, e.prototype.getCount = function() {
    return this.count;
  }, e.prototype.aboutEquals = function(t, n, a) {
    if (Math.abs(n - this.getY()) <= t && Math.abs(a - this.getX()) <= t) {
      var i = Math.abs(t - this.estimatedModuleSize);
      return i <= 1 || i <= this.estimatedModuleSize;
    }
    return !1;
  }, e.prototype.combineEstimate = function(t, n, a) {
    var i = this.count + 1, o = (this.count * this.getX() + n) / i, u = (this.count * this.getY() + t) / i, f = (this.count * this.estimatedModuleSize + a) / i;
    return new e(o, u, f, i);
  }, e;
}(Hc.default);
da.default = Vc;
var sa = {};
Object.defineProperty(sa, "__esModule", { value: !0 });
var jc = function() {
  function r(e) {
    this.bottomLeft = e[0], this.topLeft = e[1], this.topRight = e[2];
  }
  return r.prototype.getBottomLeft = function() {
    return this.bottomLeft;
  }, r.prototype.getTopLeft = function() {
    return this.topLeft;
  }, r.prototype.getTopRight = function() {
    return this.topRight;
  }, r;
}();
sa.default = jc;
var ct = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(ca, "__esModule", { value: !0 });
var vo = Y, Wc = k, Xc = da, zc = sa, Yc = T, Zc = function() {
  function r(e, t) {
    this.image = e, this.resultPointCallback = t, this.possibleCenters = [], this.crossCheckStateCount = new Int32Array(5), this.resultPointCallback = t;
  }
  return r.prototype.getImage = function() {
    return this.image;
  }, r.prototype.getPossibleCenters = function() {
    return this.possibleCenters;
  }, r.prototype.find = function(e) {
    var t = e != null && e.get(vo.default.TRY_HARDER) !== void 0, n = e != null && e.get(vo.default.PURE_BARCODE) !== void 0, a = this.image, i = a.getHeight(), o = a.getWidth(), u = Math.floor(3 * i / (4 * r.MAX_MODULES));
    (u < r.MIN_SKIP || t) && (u = r.MIN_SKIP);
    for (var f = !1, l = new Int32Array(5), c = u - 1; c < i && !f; c += u) {
      l[0] = 0, l[1] = 0, l[2] = 0, l[3] = 0, l[4] = 0;
      for (var d = 0, s = 0; s < o; s++)
        if (a.get(s, c))
          (d & 1) === 1 && d++, l[d]++;
        else if ((d & 1) === 0)
          if (d === 4)
            if (r.foundPatternCross(l)) {
              var v = this.handlePossibleCenter(l, c, s, n);
              if (v === !0)
                if (u = 2, this.hasSkipped === !0)
                  f = this.haveMultiplyConfirmedCenters();
                else {
                  var h = this.findRowSkip();
                  h > l[2] && (c += h - l[2] - u, s = o - 1);
                }
              else {
                l[0] = l[2], l[1] = l[3], l[2] = l[4], l[3] = 1, l[4] = 0, d = 3;
                continue;
              }
              d = 0, l[0] = 0, l[1] = 0, l[2] = 0, l[3] = 0, l[4] = 0;
            } else
              l[0] = l[2], l[1] = l[3], l[2] = l[4], l[3] = 1, l[4] = 0, d = 3;
          else
            l[++d]++;
        else
          l[d]++;
      if (r.foundPatternCross(l)) {
        var v = this.handlePossibleCenter(l, c, o, n);
        v === !0 && (u = l[0], this.hasSkipped && (f = this.haveMultiplyConfirmedCenters()));
      }
    }
    var x = this.selectBestPatterns();
    return Wc.default.orderBestPatterns(x), new zc.default(x);
  }, r.centerFromEnd = function(e, t) {
    return t - e[4] - e[3] - e[2] / 2;
  }, r.foundPatternCross = function(e) {
    for (var t = 0, n = 0; n < 5; n++) {
      var a = e[n];
      if (a === 0)
        return !1;
      t += a;
    }
    if (t < 7)
      return !1;
    var i = t / 7, o = i / 2;
    return Math.abs(i - e[0]) < o && Math.abs(i - e[1]) < o && Math.abs(3 * i - e[2]) < 3 * o && Math.abs(i - e[3]) < o && Math.abs(i - e[4]) < o;
  }, r.prototype.getCrossCheckStateCount = function() {
    var e = this.crossCheckStateCount;
    return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e;
  }, r.prototype.crossCheckDiagonal = function(e, t, n, a) {
    for (var i = this.getCrossCheckStateCount(), o = 0, u = this.image; e >= o && t >= o && u.get(t - o, e - o); )
      i[2]++, o++;
    if (e < o || t < o)
      return !1;
    for (; e >= o && t >= o && !u.get(t - o, e - o) && i[1] <= n; )
      i[1]++, o++;
    if (e < o || t < o || i[1] > n)
      return !1;
    for (; e >= o && t >= o && u.get(t - o, e - o) && i[0] <= n; )
      i[0]++, o++;
    if (i[0] > n)
      return !1;
    var f = u.getHeight(), l = u.getWidth();
    for (o = 1; e + o < f && t + o < l && u.get(t + o, e + o); )
      i[2]++, o++;
    if (e + o >= f || t + o >= l)
      return !1;
    for (; e + o < f && t + o < l && !u.get(t + o, e + o) && i[3] < n; )
      i[3]++, o++;
    if (e + o >= f || t + o >= l || i[3] >= n)
      return !1;
    for (; e + o < f && t + o < l && u.get(t + o, e + o) && i[4] < n; )
      i[4]++, o++;
    if (i[4] >= n)
      return !1;
    var c = i[0] + i[1] + i[2] + i[3] + i[4];
    return Math.abs(c - a) < 2 * a && r.foundPatternCross(i);
  }, r.prototype.crossCheckVertical = function(e, t, n, a) {
    for (var i = this.image, o = i.getHeight(), u = this.getCrossCheckStateCount(), f = e; f >= 0 && i.get(t, f); )
      u[2]++, f--;
    if (f < 0)
      return NaN;
    for (; f >= 0 && !i.get(t, f) && u[1] <= n; )
      u[1]++, f--;
    if (f < 0 || u[1] > n)
      return NaN;
    for (; f >= 0 && i.get(t, f) && u[0] <= n; )
      u[0]++, f--;
    if (u[0] > n)
      return NaN;
    for (f = e + 1; f < o && i.get(t, f); )
      u[2]++, f++;
    if (f === o)
      return NaN;
    for (; f < o && !i.get(t, f) && u[3] < n; )
      u[3]++, f++;
    if (f === o || u[3] >= n)
      return NaN;
    for (; f < o && i.get(t, f) && u[4] < n; )
      u[4]++, f++;
    if (u[4] >= n)
      return NaN;
    var l = u[0] + u[1] + u[2] + u[3] + u[4];
    return 5 * Math.abs(l - a) >= 2 * a ? NaN : r.foundPatternCross(u) ? r.centerFromEnd(u, f) : NaN;
  }, r.prototype.crossCheckHorizontal = function(e, t, n, a) {
    for (var i = this.image, o = i.getWidth(), u = this.getCrossCheckStateCount(), f = e; f >= 0 && i.get(f, t); )
      u[2]++, f--;
    if (f < 0)
      return NaN;
    for (; f >= 0 && !i.get(f, t) && u[1] <= n; )
      u[1]++, f--;
    if (f < 0 || u[1] > n)
      return NaN;
    for (; f >= 0 && i.get(f, t) && u[0] <= n; )
      u[0]++, f--;
    if (u[0] > n)
      return NaN;
    for (f = e + 1; f < o && i.get(f, t); )
      u[2]++, f++;
    if (f === o)
      return NaN;
    for (; f < o && !i.get(f, t) && u[3] < n; )
      u[3]++, f++;
    if (f === o || u[3] >= n)
      return NaN;
    for (; f < o && i.get(f, t) && u[4] < n; )
      u[4]++, f++;
    if (u[4] >= n)
      return NaN;
    var l = u[0] + u[1] + u[2] + u[3] + u[4];
    return 5 * Math.abs(l - a) >= a ? NaN : r.foundPatternCross(u) ? r.centerFromEnd(u, f) : NaN;
  }, r.prototype.handlePossibleCenter = function(e, t, n, a) {
    var i = e[0] + e[1] + e[2] + e[3] + e[4], o = r.centerFromEnd(e, n), u = this.crossCheckVertical(t, Math.floor(o), e[2], i);
    if (!isNaN(u) && (o = this.crossCheckHorizontal(Math.floor(o), Math.floor(u), e[2], i), !isNaN(o) && (!a || this.crossCheckDiagonal(Math.floor(u), Math.floor(o), e[2], i)))) {
      for (var f = i / 7, l = !1, c = this.possibleCenters, d = 0, s = c.length; d < s; d++) {
        var v = c[d];
        if (v.aboutEquals(f, u, o)) {
          c[d] = v.combineEstimate(u, o, f), l = !0;
          break;
        }
      }
      if (!l) {
        var h = new Xc.default(o, u, f);
        c.push(h), this.resultPointCallback !== null && this.resultPointCallback !== void 0 && this.resultPointCallback.foundPossibleResultPoint(h);
      }
      return !0;
    }
    return !1;
  }, r.prototype.findRowSkip = function() {
    var e, t, n = this.possibleCenters.length;
    if (n <= 1)
      return 0;
    var a = null;
    try {
      for (var i = ct(this.possibleCenters), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        if (u.getCount() >= r.CENTER_QUORUM)
          if (a == null)
            a = u;
          else
            return this.hasSkipped = !0, Math.floor((Math.abs(a.getX() - u.getX()) - Math.abs(a.getY() - u.getY())) / 2);
      }
    } catch (f) {
      e = { error: f };
    } finally {
      try {
        o && !o.done && (t = i.return) && t.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return 0;
  }, r.prototype.haveMultiplyConfirmedCenters = function() {
    var e, t, n, a, i = 0, o = 0, u = this.possibleCenters.length;
    try {
      for (var f = ct(this.possibleCenters), l = f.next(); !l.done; l = f.next()) {
        var c = l.value;
        c.getCount() >= r.CENTER_QUORUM && (i++, o += c.getEstimatedModuleSize());
      }
    } catch (x) {
      e = { error: x };
    } finally {
      try {
        l && !l.done && (t = f.return) && t.call(f);
      } finally {
        if (e)
          throw e.error;
      }
    }
    if (i < 3)
      return !1;
    var d = o / u, s = 0;
    try {
      for (var v = ct(this.possibleCenters), h = v.next(); !h.done; h = v.next()) {
        var c = h.value;
        s += Math.abs(c.getEstimatedModuleSize() - d);
      }
    } catch (x) {
      n = { error: x };
    } finally {
      try {
        h && !h.done && (a = v.return) && a.call(v);
      } finally {
        if (n)
          throw n.error;
      }
    }
    return s <= 0.05 * o;
  }, r.prototype.selectBestPatterns = function() {
    var e, t, n, a, i = this.possibleCenters.length;
    if (i < 3)
      throw new Yc.default();
    var o = this.possibleCenters, u;
    if (i > 3) {
      var f = 0, l = 0;
      try {
        for (var c = ct(this.possibleCenters), d = c.next(); !d.done; d = c.next()) {
          var s = d.value, v = s.getEstimatedModuleSize();
          f += v, l += v * v;
        }
      } catch (S) {
        e = { error: S };
      } finally {
        try {
          d && !d.done && (t = c.return) && t.call(c);
        } finally {
          if (e)
            throw e.error;
        }
      }
      u = f / i;
      var h = Math.sqrt(l / i - u * u);
      o.sort(
        function(S, m) {
          var I = Math.abs(m.getEstimatedModuleSize() - u), O = Math.abs(S.getEstimatedModuleSize() - u);
          return I < O ? -1 : I > O ? 1 : 0;
        }
      );
      for (var x = Math.max(0.2 * u, h), _ = 0; _ < o.length && o.length > 3; _++) {
        var g = o[_];
        Math.abs(g.getEstimatedModuleSize() - u) > x && (o.splice(_, 1), _--);
      }
    }
    if (o.length > 3) {
      var f = 0;
      try {
        for (var y = ct(o), A = y.next(); !A.done; A = y.next()) {
          var w = A.value;
          f += w.getEstimatedModuleSize();
        }
      } catch (m) {
        n = { error: m };
      } finally {
        try {
          A && !A.done && (a = y.return) && a.call(y);
        } finally {
          if (n)
            throw n.error;
        }
      }
      u = f / o.length, o.sort(
        function(m, I) {
          if (I.getCount() === m.getCount()) {
            var O = Math.abs(I.getEstimatedModuleSize() - u), D = Math.abs(m.getEstimatedModuleSize() - u);
            return O < D ? 1 : O > D ? -1 : 0;
          } else
            return I.getCount() - m.getCount();
        }
      ), o.splice(3);
    }
    return [
      o[0],
      o[1],
      o[2]
    ];
  }, r.CENTER_QUORUM = 2, r.MIN_SKIP = 3, r.MAX_MODULES = 57, r;
}();
ca.default = Zc;
var va = {}, ha = {}, Kc = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(ha, "__esModule", { value: !0 });
var qc = k, Qc = function(r) {
  Kc(e, r);
  function e(t, n, a) {
    var i = r.call(this, t, n) || this;
    return i.estimatedModuleSize = a, i;
  }
  return e.prototype.aboutEquals = function(t, n, a) {
    if (Math.abs(n - this.getY()) <= t && Math.abs(a - this.getX()) <= t) {
      var i = Math.abs(t - this.estimatedModuleSize);
      return i <= 1 || i <= this.estimatedModuleSize;
    }
    return !1;
  }, e.prototype.combineEstimate = function(t, n, a) {
    var i = (this.getX() + n) / 2, o = (this.getY() + t) / 2, u = (this.estimatedModuleSize + a) / 2;
    return new e(i, o, u);
  }, e;
}(qc.default);
ha.default = Qc;
var Jc = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(va, "__esModule", { value: !0 });
var ed = ha, td = T, rd = function() {
  function r(e, t, n, a, i, o, u) {
    this.image = e, this.startX = t, this.startY = n, this.width = a, this.height = i, this.moduleSize = o, this.resultPointCallback = u, this.possibleCenters = [], this.crossCheckStateCount = new Int32Array(3);
  }
  return r.prototype.find = function() {
    for (var e = this.startX, t = this.height, n = this.width, a = e + n, i = this.startY + t / 2, o = new Int32Array(3), u = this.image, f = 0; f < t; f++) {
      var l = i + ((f & 1) === 0 ? Math.floor((f + 1) / 2) : -Math.floor((f + 1) / 2));
      o[0] = 0, o[1] = 0, o[2] = 0;
      for (var c = e; c < a && !u.get(c, l); )
        c++;
      for (var d = 0; c < a; ) {
        if (u.get(c, l))
          if (d === 1)
            o[1]++;
          else if (d === 2) {
            if (this.foundPatternCross(o)) {
              var s = this.handlePossibleCenter(o, l, c);
              if (s !== null)
                return s;
            }
            o[0] = o[2], o[1] = 1, o[2] = 0, d = 1;
          } else
            o[++d]++;
        else
          d === 1 && d++, o[d]++;
        c++;
      }
      if (this.foundPatternCross(o)) {
        var s = this.handlePossibleCenter(o, l, a);
        if (s !== null)
          return s;
      }
    }
    if (this.possibleCenters.length !== 0)
      return this.possibleCenters[0];
    throw new td.default();
  }, r.centerFromEnd = function(e, t) {
    return t - e[2] - e[1] / 2;
  }, r.prototype.foundPatternCross = function(e) {
    for (var t = this.moduleSize, n = t / 2, a = 0; a < 3; a++)
      if (Math.abs(t - e[a]) >= n)
        return !1;
    return !0;
  }, r.prototype.crossCheckVertical = function(e, t, n, a) {
    var i = this.image, o = i.getHeight(), u = this.crossCheckStateCount;
    u[0] = 0, u[1] = 0, u[2] = 0;
    for (var f = e; f >= 0 && i.get(t, f) && u[1] <= n; )
      u[1]++, f--;
    if (f < 0 || u[1] > n)
      return NaN;
    for (; f >= 0 && !i.get(t, f) && u[0] <= n; )
      u[0]++, f--;
    if (u[0] > n)
      return NaN;
    for (f = e + 1; f < o && i.get(t, f) && u[1] <= n; )
      u[1]++, f++;
    if (f === o || u[1] > n)
      return NaN;
    for (; f < o && !i.get(t, f) && u[2] <= n; )
      u[2]++, f++;
    if (u[2] > n)
      return NaN;
    var l = u[0] + u[1] + u[2];
    return 5 * Math.abs(l - a) >= 2 * a ? NaN : this.foundPatternCross(u) ? r.centerFromEnd(u, f) : NaN;
  }, r.prototype.handlePossibleCenter = function(e, t, n) {
    var a, i, o = e[0] + e[1] + e[2], u = r.centerFromEnd(e, n), f = this.crossCheckVertical(t, u, 2 * e[1], o);
    if (!isNaN(f)) {
      var l = (e[0] + e[1] + e[2]) / 3;
      try {
        for (var c = Jc(this.possibleCenters), d = c.next(); !d.done; d = c.next()) {
          var s = d.value;
          if (s.aboutEquals(l, f, u))
            return s.combineEstimate(f, u, l);
        }
      } catch (h) {
        a = { error: h };
      } finally {
        try {
          d && !d.done && (i = c.return) && i.call(c);
        } finally {
          if (a)
            throw a.error;
        }
      }
      var v = new ed.default(u, f, l);
      this.possibleCenters.push(v), this.resultPointCallback !== null && this.resultPointCallback !== void 0 && this.resultPointCallback.foundPossibleResultPoint(v);
    }
    return null;
  }, r;
}();
va.default = rd;
Object.defineProperty(la, "__esModule", { value: !0 });
var nd = Y, ho = k, ad = Je, id = et, od = wt, ar = ae, ud = Dt, fd = ca, ld = va, dt = T, cd = function() {
  function r(e) {
    this.image = e;
  }
  return r.prototype.getImage = function() {
    return this.image;
  }, r.prototype.getResultPointCallback = function() {
    return this.resultPointCallback;
  }, r.prototype.detect = function(e) {
    this.resultPointCallback = e == null ? null : e.get(nd.default.NEED_RESULT_POINT_CALLBACK);
    var t = new fd.default(this.image, this.resultPointCallback), n = t.find(e);
    return this.processFinderPatternInfo(n);
  }, r.prototype.processFinderPatternInfo = function(e) {
    var t = e.getTopLeft(), n = e.getTopRight(), a = e.getBottomLeft(), i = this.calculateModuleSize(t, n, a);
    if (i < 1)
      throw new dt.default("No pattern found in proccess finder.");
    var o = r.computeDimension(t, n, a, i), u = ud.default.getProvisionalVersionForDimension(o), f = u.getDimensionForVersion() - 7, l = null;
    if (u.getAlignmentPatternCenters().length > 0)
      for (var c = n.getX() - t.getX() + a.getX(), d = n.getY() - t.getY() + a.getY(), s = 1 - 3 / f, v = Math.floor(t.getX() + s * (c - t.getX())), h = Math.floor(t.getY() + s * (d - t.getY())), x = 4; x <= 16; x <<= 1)
        try {
          l = this.findAlignmentInRegion(i, v, h, x);
          break;
        } catch (A) {
          if (!(A instanceof dt.default))
            throw A;
        }
    var _ = r.createTransform(t, n, a, l, o), g = r.sampleGrid(this.image, _, o), y;
    return l === null ? y = [a, t, n] : y = [a, t, n, l], new ad.default(g, y);
  }, r.createTransform = function(e, t, n, a, i) {
    var o = i - 3.5, u, f, l, c;
    return a !== null ? (u = a.getX(), f = a.getY(), l = o - 3, c = l) : (u = t.getX() - e.getX() + n.getX(), f = t.getY() - e.getY() + n.getY(), l = o, c = o), od.default.quadrilateralToQuadrilateral(3.5, 3.5, o, 3.5, l, c, 3.5, o, e.getX(), e.getY(), t.getX(), t.getY(), u, f, n.getX(), n.getY());
  }, r.sampleGrid = function(e, t, n) {
    var a = id.default.getInstance();
    return a.sampleGridWithTransform(e, n, n, t);
  }, r.computeDimension = function(e, t, n, a) {
    var i = ar.default.round(ho.default.distance(e, t) / a), o = ar.default.round(ho.default.distance(e, n) / a), u = Math.floor((i + o) / 2) + 7;
    switch (u & 3) {
      case 0:
        u++;
        break;
      case 2:
        u--;
        break;
      case 3:
        throw new dt.default("Dimensions could be not found.");
    }
    return u;
  }, r.prototype.calculateModuleSize = function(e, t, n) {
    return (this.calculateModuleSizeOneWay(e, t) + this.calculateModuleSizeOneWay(e, n)) / 2;
  }, r.prototype.calculateModuleSizeOneWay = function(e, t) {
    var n = this.sizeOfBlackWhiteBlackRunBothWays(
      Math.floor(e.getX()),
      Math.floor(e.getY()),
      Math.floor(t.getX()),
      Math.floor(t.getY())
    ), a = this.sizeOfBlackWhiteBlackRunBothWays(
      Math.floor(t.getX()),
      Math.floor(t.getY()),
      Math.floor(e.getX()),
      Math.floor(e.getY())
    );
    return isNaN(n) ? a / 7 : isNaN(a) ? n / 7 : (n + a) / 14;
  }, r.prototype.sizeOfBlackWhiteBlackRunBothWays = function(e, t, n, a) {
    var i = this.sizeOfBlackWhiteBlackRun(e, t, n, a), o = 1, u = e - (n - e);
    u < 0 ? (o = e / (e - u), u = 0) : u >= this.image.getWidth() && (o = (this.image.getWidth() - 1 - e) / (u - e), u = this.image.getWidth() - 1);
    var f = Math.floor(t - (a - t) * o);
    return o = 1, f < 0 ? (o = t / (t - f), f = 0) : f >= this.image.getHeight() && (o = (this.image.getHeight() - 1 - t) / (f - t), f = this.image.getHeight() - 1), u = Math.floor(e + (u - e) * o), i += this.sizeOfBlackWhiteBlackRun(e, t, u, f), i - 1;
  }, r.prototype.sizeOfBlackWhiteBlackRun = function(e, t, n, a) {
    var i = Math.abs(a - t) > Math.abs(n - e);
    if (i) {
      var o = e;
      e = t, t = o, o = n, n = a, a = o;
    }
    for (var u = Math.abs(n - e), f = Math.abs(a - t), l = -u / 2, c = e < n ? 1 : -1, d = t < a ? 1 : -1, s = 0, v = n + c, h = e, x = t; h !== v; h += c) {
      var _ = i ? x : h, g = i ? h : x;
      if (s === 1 === this.image.get(_, g)) {
        if (s === 2)
          return ar.default.distance(h, x, e, t);
        s++;
      }
      if (l += f, l > 0) {
        if (x === a)
          break;
        x += d, l -= u;
      }
    }
    return s === 2 ? ar.default.distance(n + c, a, e, t) : NaN;
  }, r.prototype.findAlignmentInRegion = function(e, t, n, a) {
    var i = Math.floor(a * e), o = Math.max(0, t - i), u = Math.min(this.image.getWidth() - 1, t + i);
    if (u - o < e * 3)
      throw new dt.default("Alignment top exceeds estimated module size.");
    var f = Math.max(0, n - i), l = Math.min(this.image.getHeight() - 1, n + i);
    if (l - f < e * 3)
      throw new dt.default("Alignment bottom exceeds estimated module size.");
    var c = new ld.default(this.image, o, f, u - o, l - f, e, this.resultPointCallback);
    return c.find();
  }, r;
}();
la.default = cd;
Object.defineProperty(Rt, "__esModule", { value: !0 });
var dd = L, sd = Y, vd = J, ir = de, hd = fe, xd = ra, pd = Hr, _d = la, Oe = T, gd = function() {
  function r() {
    this.decoder = new xd.default();
  }
  return r.prototype.getDecoder = function() {
    return this.decoder;
  }, r.prototype.decode = function(e, t) {
    var n, a;
    if (t != null && t.get(sd.default.PURE_BARCODE) !== void 0) {
      var i = r.extractPureBits(e.getBlackMatrix());
      n = this.decoder.decodeBitMatrix(i, t), a = r.NO_POINTS;
    } else {
      var o = new _d.default(e.getBlackMatrix()).detect(t);
      n = this.decoder.decodeBitMatrix(o.getBits(), t), a = o.getPoints();
    }
    n.getOther() instanceof pd.default && n.getOther().applyMirroredCorrection(a);
    var u = new vd.default(n.getText(), n.getRawBytes(), void 0, a, dd.default.QR_CODE, void 0), f = n.getByteSegments();
    f !== null && u.putMetadata(ir.default.BYTE_SEGMENTS, f);
    var l = n.getECLevel();
    return l !== null && u.putMetadata(ir.default.ERROR_CORRECTION_LEVEL, l), n.hasStructuredAppend() && (u.putMetadata(ir.default.STRUCTURED_APPEND_SEQUENCE, n.getStructuredAppendSequenceNumber()), u.putMetadata(ir.default.STRUCTURED_APPEND_PARITY, n.getStructuredAppendParity())), u;
  }, r.prototype.reset = function() {
  }, r.extractPureBits = function(e) {
    var t = e.getTopLeftOnBit(), n = e.getBottomRightOnBit();
    if (t === null || n === null)
      throw new Oe.default();
    var a = this.moduleSize(t, e), i = t[1], o = n[1], u = t[0], f = n[0];
    if (u >= f || i >= o)
      throw new Oe.default();
    if (o - i !== f - u && (f = u + (o - i), f >= e.getWidth()))
      throw new Oe.default();
    var l = Math.round((f - u + 1) / a), c = Math.round((o - i + 1) / a);
    if (l <= 0 || c <= 0)
      throw new Oe.default();
    if (c !== l)
      throw new Oe.default();
    var d = Math.floor(a / 2);
    i += d, u += d;
    var s = u + Math.floor((l - 1) * a) - f;
    if (s > 0) {
      if (s > d)
        throw new Oe.default();
      u -= s;
    }
    var v = i + Math.floor((c - 1) * a) - o;
    if (v > 0) {
      if (v > d)
        throw new Oe.default();
      i -= v;
    }
    for (var h = new hd.default(l, c), x = 0; x < c; x++)
      for (var _ = i + Math.floor(x * a), g = 0; g < l; g++)
        e.get(u + Math.floor(g * a), _) && h.set(g, x);
    return h;
  }, r.moduleSize = function(e, t) {
    for (var n = t.getHeight(), a = t.getWidth(), i = e[0], o = e[1], u = !0, f = 0; i < a && o < n; ) {
      if (u !== t.get(i, o)) {
        if (++f === 5)
          break;
        u = !u;
      }
      i++, o++;
    }
    if (i === a || o === n)
      throw new Oe.default();
    return (i - e[0]) / 7;
  }, r.NO_POINTS = new Array(), r;
}();
Rt.default = gd;
var Vr = {}, Se = {}, yd = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Se, "__esModule", { value: !0 });
var Ed = we, Ad = ae, wd = function() {
  function r() {
  }
  return r.prototype.PDF417Common = function() {
  }, r.getBitCountSum = function(e) {
    return Ad.default.sum(e);
  }, r.toIntArray = function(e) {
    var t, n;
    if (e == null || !e.length)
      return r.EMPTY_INT_ARRAY;
    var a = new Int32Array(e.length), i = 0;
    try {
      for (var o = yd(e), u = o.next(); !u.done; u = o.next()) {
        var f = u.value;
        a[i++] = f;
      }
    } catch (l) {
      t = { error: l };
    } finally {
      try {
        u && !u.done && (n = o.return) && n.call(o);
      } finally {
        if (t)
          throw t.error;
      }
    }
    return a;
  }, r.getCodeword = function(e) {
    var t = Ed.default.binarySearch(r.SYMBOL_TABLE, e & 262143);
    return t < 0 ? -1 : (r.CODEWORD_TABLE[t] - 1) % r.NUMBER_OF_CODEWORDS;
  }, r.NUMBER_OF_CODEWORDS = 929, r.MAX_CODEWORDS_IN_BARCODE = r.NUMBER_OF_CODEWORDS - 1, r.MIN_ROWS_IN_BARCODE = 3, r.MAX_ROWS_IN_BARCODE = 90, r.MODULES_IN_CODEWORD = 17, r.MODULES_IN_STOP_PATTERN = 18, r.BARS_IN_MODULE = 8, r.EMPTY_INT_ARRAY = new Int32Array([]), r.SYMBOL_TABLE = Int32Array.from([
    66142,
    66170,
    66206,
    66236,
    66290,
    66292,
    66350,
    66382,
    66396,
    66454,
    66470,
    66476,
    66594,
    66600,
    66614,
    66626,
    66628,
    66632,
    66640,
    66654,
    66662,
    66668,
    66682,
    66690,
    66718,
    66720,
    66748,
    66758,
    66776,
    66798,
    66802,
    66804,
    66820,
    66824,
    66832,
    66846,
    66848,
    66876,
    66880,
    66936,
    66950,
    66956,
    66968,
    66992,
    67006,
    67022,
    67036,
    67042,
    67044,
    67048,
    67062,
    67118,
    67150,
    67164,
    67214,
    67228,
    67256,
    67294,
    67322,
    67350,
    67366,
    67372,
    67398,
    67404,
    67416,
    67438,
    67474,
    67476,
    67490,
    67492,
    67496,
    67510,
    67618,
    67624,
    67650,
    67656,
    67664,
    67678,
    67686,
    67692,
    67706,
    67714,
    67716,
    67728,
    67742,
    67744,
    67772,
    67782,
    67788,
    67800,
    67822,
    67826,
    67828,
    67842,
    67848,
    67870,
    67872,
    67900,
    67904,
    67960,
    67974,
    67992,
    68016,
    68030,
    68046,
    68060,
    68066,
    68068,
    68072,
    68086,
    68104,
    68112,
    68126,
    68128,
    68156,
    68160,
    68216,
    68336,
    68358,
    68364,
    68376,
    68400,
    68414,
    68448,
    68476,
    68494,
    68508,
    68536,
    68546,
    68548,
    68552,
    68560,
    68574,
    68582,
    68588,
    68654,
    68686,
    68700,
    68706,
    68708,
    68712,
    68726,
    68750,
    68764,
    68792,
    68802,
    68804,
    68808,
    68816,
    68830,
    68838,
    68844,
    68858,
    68878,
    68892,
    68920,
    68976,
    68990,
    68994,
    68996,
    69e3,
    69008,
    69022,
    69024,
    69052,
    69062,
    69068,
    69080,
    69102,
    69106,
    69108,
    69142,
    69158,
    69164,
    69190,
    69208,
    69230,
    69254,
    69260,
    69272,
    69296,
    69310,
    69326,
    69340,
    69386,
    69394,
    69396,
    69410,
    69416,
    69430,
    69442,
    69444,
    69448,
    69456,
    69470,
    69478,
    69484,
    69554,
    69556,
    69666,
    69672,
    69698,
    69704,
    69712,
    69726,
    69754,
    69762,
    69764,
    69776,
    69790,
    69792,
    69820,
    69830,
    69836,
    69848,
    69870,
    69874,
    69876,
    69890,
    69918,
    69920,
    69948,
    69952,
    70008,
    70022,
    70040,
    70064,
    70078,
    70094,
    70108,
    70114,
    70116,
    70120,
    70134,
    70152,
    70174,
    70176,
    70264,
    70384,
    70412,
    70448,
    70462,
    70496,
    70524,
    70542,
    70556,
    70584,
    70594,
    70600,
    70608,
    70622,
    70630,
    70636,
    70664,
    70672,
    70686,
    70688,
    70716,
    70720,
    70776,
    70896,
    71136,
    71180,
    71192,
    71216,
    71230,
    71264,
    71292,
    71360,
    71416,
    71452,
    71480,
    71536,
    71550,
    71554,
    71556,
    71560,
    71568,
    71582,
    71584,
    71612,
    71622,
    71628,
    71640,
    71662,
    71726,
    71732,
    71758,
    71772,
    71778,
    71780,
    71784,
    71798,
    71822,
    71836,
    71864,
    71874,
    71880,
    71888,
    71902,
    71910,
    71916,
    71930,
    71950,
    71964,
    71992,
    72048,
    72062,
    72066,
    72068,
    72080,
    72094,
    72096,
    72124,
    72134,
    72140,
    72152,
    72174,
    72178,
    72180,
    72206,
    72220,
    72248,
    72304,
    72318,
    72416,
    72444,
    72456,
    72464,
    72478,
    72480,
    72508,
    72512,
    72568,
    72588,
    72600,
    72624,
    72638,
    72654,
    72668,
    72674,
    72676,
    72680,
    72694,
    72726,
    72742,
    72748,
    72774,
    72780,
    72792,
    72814,
    72838,
    72856,
    72880,
    72894,
    72910,
    72924,
    72930,
    72932,
    72936,
    72950,
    72966,
    72972,
    72984,
    73008,
    73022,
    73056,
    73084,
    73102,
    73116,
    73144,
    73156,
    73160,
    73168,
    73182,
    73190,
    73196,
    73210,
    73226,
    73234,
    73236,
    73250,
    73252,
    73256,
    73270,
    73282,
    73284,
    73296,
    73310,
    73318,
    73324,
    73346,
    73348,
    73352,
    73360,
    73374,
    73376,
    73404,
    73414,
    73420,
    73432,
    73454,
    73498,
    73518,
    73522,
    73524,
    73550,
    73564,
    73570,
    73572,
    73576,
    73590,
    73800,
    73822,
    73858,
    73860,
    73872,
    73886,
    73888,
    73916,
    73944,
    73970,
    73972,
    73992,
    74014,
    74016,
    74044,
    74048,
    74104,
    74118,
    74136,
    74160,
    74174,
    74210,
    74212,
    74216,
    74230,
    74244,
    74256,
    74270,
    74272,
    74360,
    74480,
    74502,
    74508,
    74544,
    74558,
    74592,
    74620,
    74638,
    74652,
    74680,
    74690,
    74696,
    74704,
    74726,
    74732,
    74782,
    74784,
    74812,
    74992,
    75232,
    75288,
    75326,
    75360,
    75388,
    75456,
    75512,
    75576,
    75632,
    75646,
    75650,
    75652,
    75664,
    75678,
    75680,
    75708,
    75718,
    75724,
    75736,
    75758,
    75808,
    75836,
    75840,
    75896,
    76016,
    76256,
    76736,
    76824,
    76848,
    76862,
    76896,
    76924,
    76992,
    77048,
    77296,
    77340,
    77368,
    77424,
    77438,
    77536,
    77564,
    77572,
    77576,
    77584,
    77600,
    77628,
    77632,
    77688,
    77702,
    77708,
    77720,
    77744,
    77758,
    77774,
    77788,
    77870,
    77902,
    77916,
    77922,
    77928,
    77966,
    77980,
    78008,
    78018,
    78024,
    78032,
    78046,
    78060,
    78074,
    78094,
    78136,
    78192,
    78206,
    78210,
    78212,
    78224,
    78238,
    78240,
    78268,
    78278,
    78284,
    78296,
    78322,
    78324,
    78350,
    78364,
    78448,
    78462,
    78560,
    78588,
    78600,
    78622,
    78624,
    78652,
    78656,
    78712,
    78726,
    78744,
    78768,
    78782,
    78798,
    78812,
    78818,
    78820,
    78824,
    78838,
    78862,
    78876,
    78904,
    78960,
    78974,
    79072,
    79100,
    79296,
    79352,
    79368,
    79376,
    79390,
    79392,
    79420,
    79424,
    79480,
    79600,
    79628,
    79640,
    79664,
    79678,
    79712,
    79740,
    79772,
    79800,
    79810,
    79812,
    79816,
    79824,
    79838,
    79846,
    79852,
    79894,
    79910,
    79916,
    79942,
    79948,
    79960,
    79982,
    79988,
    80006,
    80024,
    80048,
    80062,
    80078,
    80092,
    80098,
    80100,
    80104,
    80134,
    80140,
    80176,
    80190,
    80224,
    80252,
    80270,
    80284,
    80312,
    80328,
    80336,
    80350,
    80358,
    80364,
    80378,
    80390,
    80396,
    80408,
    80432,
    80446,
    80480,
    80508,
    80576,
    80632,
    80654,
    80668,
    80696,
    80752,
    80766,
    80776,
    80784,
    80798,
    80800,
    80828,
    80844,
    80856,
    80878,
    80882,
    80884,
    80914,
    80916,
    80930,
    80932,
    80936,
    80950,
    80962,
    80968,
    80976,
    80990,
    80998,
    81004,
    81026,
    81028,
    81040,
    81054,
    81056,
    81084,
    81094,
    81100,
    81112,
    81134,
    81154,
    81156,
    81160,
    81168,
    81182,
    81184,
    81212,
    81216,
    81272,
    81286,
    81292,
    81304,
    81328,
    81342,
    81358,
    81372,
    81380,
    81384,
    81398,
    81434,
    81454,
    81458,
    81460,
    81486,
    81500,
    81506,
    81508,
    81512,
    81526,
    81550,
    81564,
    81592,
    81602,
    81604,
    81608,
    81616,
    81630,
    81638,
    81644,
    81702,
    81708,
    81722,
    81734,
    81740,
    81752,
    81774,
    81778,
    81780,
    82050,
    82078,
    82080,
    82108,
    82180,
    82184,
    82192,
    82206,
    82208,
    82236,
    82240,
    82296,
    82316,
    82328,
    82352,
    82366,
    82402,
    82404,
    82408,
    82440,
    82448,
    82462,
    82464,
    82492,
    82496,
    82552,
    82672,
    82694,
    82700,
    82712,
    82736,
    82750,
    82784,
    82812,
    82830,
    82882,
    82884,
    82888,
    82896,
    82918,
    82924,
    82952,
    82960,
    82974,
    82976,
    83004,
    83008,
    83064,
    83184,
    83424,
    83468,
    83480,
    83504,
    83518,
    83552,
    83580,
    83648,
    83704,
    83740,
    83768,
    83824,
    83838,
    83842,
    83844,
    83848,
    83856,
    83872,
    83900,
    83910,
    83916,
    83928,
    83950,
    83984,
    84e3,
    84028,
    84032,
    84088,
    84208,
    84448,
    84928,
    85040,
    85054,
    85088,
    85116,
    85184,
    85240,
    85488,
    85560,
    85616,
    85630,
    85728,
    85756,
    85764,
    85768,
    85776,
    85790,
    85792,
    85820,
    85824,
    85880,
    85894,
    85900,
    85912,
    85936,
    85966,
    85980,
    86048,
    86080,
    86136,
    86256,
    86496,
    86976,
    88160,
    88188,
    88256,
    88312,
    88560,
    89056,
    89200,
    89214,
    89312,
    89340,
    89536,
    89592,
    89608,
    89616,
    89632,
    89664,
    89720,
    89840,
    89868,
    89880,
    89904,
    89952,
    89980,
    89998,
    90012,
    90040,
    90190,
    90204,
    90254,
    90268,
    90296,
    90306,
    90308,
    90312,
    90334,
    90382,
    90396,
    90424,
    90480,
    90494,
    90500,
    90504,
    90512,
    90526,
    90528,
    90556,
    90566,
    90572,
    90584,
    90610,
    90612,
    90638,
    90652,
    90680,
    90736,
    90750,
    90848,
    90876,
    90884,
    90888,
    90896,
    90910,
    90912,
    90940,
    90944,
    91e3,
    91014,
    91020,
    91032,
    91056,
    91070,
    91086,
    91100,
    91106,
    91108,
    91112,
    91126,
    91150,
    91164,
    91192,
    91248,
    91262,
    91360,
    91388,
    91584,
    91640,
    91664,
    91678,
    91680,
    91708,
    91712,
    91768,
    91888,
    91928,
    91952,
    91966,
    92e3,
    92028,
    92046,
    92060,
    92088,
    92098,
    92100,
    92104,
    92112,
    92126,
    92134,
    92140,
    92188,
    92216,
    92272,
    92384,
    92412,
    92608,
    92664,
    93168,
    93200,
    93214,
    93216,
    93244,
    93248,
    93304,
    93424,
    93664,
    93720,
    93744,
    93758,
    93792,
    93820,
    93888,
    93944,
    93980,
    94008,
    94064,
    94078,
    94084,
    94088,
    94096,
    94110,
    94112,
    94140,
    94150,
    94156,
    94168,
    94246,
    94252,
    94278,
    94284,
    94296,
    94318,
    94342,
    94348,
    94360,
    94384,
    94398,
    94414,
    94428,
    94440,
    94470,
    94476,
    94488,
    94512,
    94526,
    94560,
    94588,
    94606,
    94620,
    94648,
    94658,
    94660,
    94664,
    94672,
    94686,
    94694,
    94700,
    94714,
    94726,
    94732,
    94744,
    94768,
    94782,
    94816,
    94844,
    94912,
    94968,
    94990,
    95004,
    95032,
    95088,
    95102,
    95112,
    95120,
    95134,
    95136,
    95164,
    95180,
    95192,
    95214,
    95218,
    95220,
    95244,
    95256,
    95280,
    95294,
    95328,
    95356,
    95424,
    95480,
    95728,
    95758,
    95772,
    95800,
    95856,
    95870,
    95968,
    95996,
    96008,
    96016,
    96030,
    96032,
    96060,
    96064,
    96120,
    96152,
    96176,
    96190,
    96220,
    96226,
    96228,
    96232,
    96290,
    96292,
    96296,
    96310,
    96322,
    96324,
    96328,
    96336,
    96350,
    96358,
    96364,
    96386,
    96388,
    96392,
    96400,
    96414,
    96416,
    96444,
    96454,
    96460,
    96472,
    96494,
    96498,
    96500,
    96514,
    96516,
    96520,
    96528,
    96542,
    96544,
    96572,
    96576,
    96632,
    96646,
    96652,
    96664,
    96688,
    96702,
    96718,
    96732,
    96738,
    96740,
    96744,
    96758,
    96772,
    96776,
    96784,
    96798,
    96800,
    96828,
    96832,
    96888,
    97008,
    97030,
    97036,
    97048,
    97072,
    97086,
    97120,
    97148,
    97166,
    97180,
    97208,
    97220,
    97224,
    97232,
    97246,
    97254,
    97260,
    97326,
    97330,
    97332,
    97358,
    97372,
    97378,
    97380,
    97384,
    97398,
    97422,
    97436,
    97464,
    97474,
    97476,
    97480,
    97488,
    97502,
    97510,
    97516,
    97550,
    97564,
    97592,
    97648,
    97666,
    97668,
    97672,
    97680,
    97694,
    97696,
    97724,
    97734,
    97740,
    97752,
    97774,
    97830,
    97836,
    97850,
    97862,
    97868,
    97880,
    97902,
    97906,
    97908,
    97926,
    97932,
    97944,
    97968,
    97998,
    98012,
    98018,
    98020,
    98024,
    98038,
    98618,
    98674,
    98676,
    98838,
    98854,
    98874,
    98892,
    98904,
    98926,
    98930,
    98932,
    98968,
    99006,
    99042,
    99044,
    99048,
    99062,
    99166,
    99194,
    99246,
    99286,
    99350,
    99366,
    99372,
    99386,
    99398,
    99416,
    99438,
    99442,
    99444,
    99462,
    99504,
    99518,
    99534,
    99548,
    99554,
    99556,
    99560,
    99574,
    99590,
    99596,
    99608,
    99632,
    99646,
    99680,
    99708,
    99726,
    99740,
    99768,
    99778,
    99780,
    99784,
    99792,
    99806,
    99814,
    99820,
    99834,
    99858,
    99860,
    99874,
    99880,
    99894,
    99906,
    99920,
    99934,
    99962,
    99970,
    99972,
    99976,
    99984,
    99998,
    1e5,
    100028,
    100038,
    100044,
    100056,
    100078,
    100082,
    100084,
    100142,
    100174,
    100188,
    100246,
    100262,
    100268,
    100306,
    100308,
    100390,
    100396,
    100410,
    100422,
    100428,
    100440,
    100462,
    100466,
    100468,
    100486,
    100504,
    100528,
    100542,
    100558,
    100572,
    100578,
    100580,
    100584,
    100598,
    100620,
    100656,
    100670,
    100704,
    100732,
    100750,
    100792,
    100802,
    100808,
    100816,
    100830,
    100838,
    100844,
    100858,
    100888,
    100912,
    100926,
    100960,
    100988,
    101056,
    101112,
    101148,
    101176,
    101232,
    101246,
    101250,
    101252,
    101256,
    101264,
    101278,
    101280,
    101308,
    101318,
    101324,
    101336,
    101358,
    101362,
    101364,
    101410,
    101412,
    101416,
    101430,
    101442,
    101448,
    101456,
    101470,
    101478,
    101498,
    101506,
    101508,
    101520,
    101534,
    101536,
    101564,
    101580,
    101618,
    101620,
    101636,
    101640,
    101648,
    101662,
    101664,
    101692,
    101696,
    101752,
    101766,
    101784,
    101838,
    101858,
    101860,
    101864,
    101934,
    101938,
    101940,
    101966,
    101980,
    101986,
    101988,
    101992,
    102030,
    102044,
    102072,
    102082,
    102084,
    102088,
    102096,
    102138,
    102166,
    102182,
    102188,
    102214,
    102220,
    102232,
    102254,
    102282,
    102290,
    102292,
    102306,
    102308,
    102312,
    102326,
    102444,
    102458,
    102470,
    102476,
    102488,
    102514,
    102516,
    102534,
    102552,
    102576,
    102590,
    102606,
    102620,
    102626,
    102632,
    102646,
    102662,
    102668,
    102704,
    102718,
    102752,
    102780,
    102798,
    102812,
    102840,
    102850,
    102856,
    102864,
    102878,
    102886,
    102892,
    102906,
    102936,
    102974,
    103008,
    103036,
    103104,
    103160,
    103224,
    103280,
    103294,
    103298,
    103300,
    103312,
    103326,
    103328,
    103356,
    103366,
    103372,
    103384,
    103406,
    103410,
    103412,
    103472,
    103486,
    103520,
    103548,
    103616,
    103672,
    103920,
    103992,
    104048,
    104062,
    104160,
    104188,
    104194,
    104196,
    104200,
    104208,
    104224,
    104252,
    104256,
    104312,
    104326,
    104332,
    104344,
    104368,
    104382,
    104398,
    104412,
    104418,
    104420,
    104424,
    104482,
    104484,
    104514,
    104520,
    104528,
    104542,
    104550,
    104570,
    104578,
    104580,
    104592,
    104606,
    104608,
    104636,
    104652,
    104690,
    104692,
    104706,
    104712,
    104734,
    104736,
    104764,
    104768,
    104824,
    104838,
    104856,
    104910,
    104930,
    104932,
    104936,
    104968,
    104976,
    104990,
    104992,
    105020,
    105024,
    105080,
    105200,
    105240,
    105278,
    105312,
    105372,
    105410,
    105412,
    105416,
    105424,
    105446,
    105518,
    105524,
    105550,
    105564,
    105570,
    105572,
    105576,
    105614,
    105628,
    105656,
    105666,
    105672,
    105680,
    105702,
    105722,
    105742,
    105756,
    105784,
    105840,
    105854,
    105858,
    105860,
    105864,
    105872,
    105888,
    105932,
    105970,
    105972,
    106006,
    106022,
    106028,
    106054,
    106060,
    106072,
    106100,
    106118,
    106124,
    106136,
    106160,
    106174,
    106190,
    106210,
    106212,
    106216,
    106250,
    106258,
    106260,
    106274,
    106276,
    106280,
    106306,
    106308,
    106312,
    106320,
    106334,
    106348,
    106394,
    106414,
    106418,
    106420,
    106566,
    106572,
    106610,
    106612,
    106630,
    106636,
    106648,
    106672,
    106686,
    106722,
    106724,
    106728,
    106742,
    106758,
    106764,
    106776,
    106800,
    106814,
    106848,
    106876,
    106894,
    106908,
    106936,
    106946,
    106948,
    106952,
    106960,
    106974,
    106982,
    106988,
    107032,
    107056,
    107070,
    107104,
    107132,
    107200,
    107256,
    107292,
    107320,
    107376,
    107390,
    107394,
    107396,
    107400,
    107408,
    107422,
    107424,
    107452,
    107462,
    107468,
    107480,
    107502,
    107506,
    107508,
    107544,
    107568,
    107582,
    107616,
    107644,
    107712,
    107768,
    108016,
    108060,
    108088,
    108144,
    108158,
    108256,
    108284,
    108290,
    108292,
    108296,
    108304,
    108318,
    108320,
    108348,
    108352,
    108408,
    108422,
    108428,
    108440,
    108464,
    108478,
    108494,
    108508,
    108514,
    108516,
    108520,
    108592,
    108640,
    108668,
    108736,
    108792,
    109040,
    109536,
    109680,
    109694,
    109792,
    109820,
    110016,
    110072,
    110084,
    110088,
    110096,
    110112,
    110140,
    110144,
    110200,
    110320,
    110342,
    110348,
    110360,
    110384,
    110398,
    110432,
    110460,
    110478,
    110492,
    110520,
    110532,
    110536,
    110544,
    110558,
    110658,
    110686,
    110714,
    110722,
    110724,
    110728,
    110736,
    110750,
    110752,
    110780,
    110796,
    110834,
    110836,
    110850,
    110852,
    110856,
    110864,
    110878,
    110880,
    110908,
    110912,
    110968,
    110982,
    111e3,
    111054,
    111074,
    111076,
    111080,
    111108,
    111112,
    111120,
    111134,
    111136,
    111164,
    111168,
    111224,
    111344,
    111372,
    111422,
    111456,
    111516,
    111554,
    111556,
    111560,
    111568,
    111590,
    111632,
    111646,
    111648,
    111676,
    111680,
    111736,
    111856,
    112096,
    112152,
    112224,
    112252,
    112320,
    112440,
    112514,
    112516,
    112520,
    112528,
    112542,
    112544,
    112588,
    112686,
    112718,
    112732,
    112782,
    112796,
    112824,
    112834,
    112836,
    112840,
    112848,
    112870,
    112890,
    112910,
    112924,
    112952,
    113008,
    113022,
    113026,
    113028,
    113032,
    113040,
    113054,
    113056,
    113100,
    113138,
    113140,
    113166,
    113180,
    113208,
    113264,
    113278,
    113376,
    113404,
    113416,
    113424,
    113440,
    113468,
    113472,
    113560,
    113614,
    113634,
    113636,
    113640,
    113686,
    113702,
    113708,
    113734,
    113740,
    113752,
    113778,
    113780,
    113798,
    113804,
    113816,
    113840,
    113854,
    113870,
    113890,
    113892,
    113896,
    113926,
    113932,
    113944,
    113968,
    113982,
    114016,
    114044,
    114076,
    114114,
    114116,
    114120,
    114128,
    114150,
    114170,
    114194,
    114196,
    114210,
    114212,
    114216,
    114242,
    114244,
    114248,
    114256,
    114270,
    114278,
    114306,
    114308,
    114312,
    114320,
    114334,
    114336,
    114364,
    114380,
    114420,
    114458,
    114478,
    114482,
    114484,
    114510,
    114524,
    114530,
    114532,
    114536,
    114842,
    114866,
    114868,
    114970,
    114994,
    114996,
    115042,
    115044,
    115048,
    115062,
    115130,
    115226,
    115250,
    115252,
    115278,
    115292,
    115298,
    115300,
    115304,
    115318,
    115342,
    115394,
    115396,
    115400,
    115408,
    115422,
    115430,
    115436,
    115450,
    115478,
    115494,
    115514,
    115526,
    115532,
    115570,
    115572,
    115738,
    115758,
    115762,
    115764,
    115790,
    115804,
    115810,
    115812,
    115816,
    115830,
    115854,
    115868,
    115896,
    115906,
    115912,
    115920,
    115934,
    115942,
    115948,
    115962,
    115996,
    116024,
    116080,
    116094,
    116098,
    116100,
    116104,
    116112,
    116126,
    116128,
    116156,
    116166,
    116172,
    116184,
    116206,
    116210,
    116212,
    116246,
    116262,
    116268,
    116282,
    116294,
    116300,
    116312,
    116334,
    116338,
    116340,
    116358,
    116364,
    116376,
    116400,
    116414,
    116430,
    116444,
    116450,
    116452,
    116456,
    116498,
    116500,
    116514,
    116520,
    116534,
    116546,
    116548,
    116552,
    116560,
    116574,
    116582,
    116588,
    116602,
    116654,
    116694,
    116714,
    116762,
    116782,
    116786,
    116788,
    116814,
    116828,
    116834,
    116836,
    116840,
    116854,
    116878,
    116892,
    116920,
    116930,
    116936,
    116944,
    116958,
    116966,
    116972,
    116986,
    117006,
    117048,
    117104,
    117118,
    117122,
    117124,
    117136,
    117150,
    117152,
    117180,
    117190,
    117196,
    117208,
    117230,
    117234,
    117236,
    117304,
    117360,
    117374,
    117472,
    117500,
    117506,
    117508,
    117512,
    117520,
    117536,
    117564,
    117568,
    117624,
    117638,
    117644,
    117656,
    117680,
    117694,
    117710,
    117724,
    117730,
    117732,
    117736,
    117750,
    117782,
    117798,
    117804,
    117818,
    117830,
    117848,
    117874,
    117876,
    117894,
    117936,
    117950,
    117966,
    117986,
    117988,
    117992,
    118022,
    118028,
    118040,
    118064,
    118078,
    118112,
    118140,
    118172,
    118210,
    118212,
    118216,
    118224,
    118238,
    118246,
    118266,
    118306,
    118312,
    118338,
    118352,
    118366,
    118374,
    118394,
    118402,
    118404,
    118408,
    118416,
    118430,
    118432,
    118460,
    118476,
    118514,
    118516,
    118574,
    118578,
    118580,
    118606,
    118620,
    118626,
    118628,
    118632,
    118678,
    118694,
    118700,
    118730,
    118738,
    118740,
    118830,
    118834,
    118836,
    118862,
    118876,
    118882,
    118884,
    118888,
    118902,
    118926,
    118940,
    118968,
    118978,
    118980,
    118984,
    118992,
    119006,
    119014,
    119020,
    119034,
    119068,
    119096,
    119152,
    119166,
    119170,
    119172,
    119176,
    119184,
    119198,
    119200,
    119228,
    119238,
    119244,
    119256,
    119278,
    119282,
    119284,
    119324,
    119352,
    119408,
    119422,
    119520,
    119548,
    119554,
    119556,
    119560,
    119568,
    119582,
    119584,
    119612,
    119616,
    119672,
    119686,
    119692,
    119704,
    119728,
    119742,
    119758,
    119772,
    119778,
    119780,
    119784,
    119798,
    119920,
    119934,
    120032,
    120060,
    120256,
    120312,
    120324,
    120328,
    120336,
    120352,
    120384,
    120440,
    120560,
    120582,
    120588,
    120600,
    120624,
    120638,
    120672,
    120700,
    120718,
    120732,
    120760,
    120770,
    120772,
    120776,
    120784,
    120798,
    120806,
    120812,
    120870,
    120876,
    120890,
    120902,
    120908,
    120920,
    120946,
    120948,
    120966,
    120972,
    120984,
    121008,
    121022,
    121038,
    121058,
    121060,
    121064,
    121078,
    121100,
    121112,
    121136,
    121150,
    121184,
    121212,
    121244,
    121282,
    121284,
    121288,
    121296,
    121318,
    121338,
    121356,
    121368,
    121392,
    121406,
    121440,
    121468,
    121536,
    121592,
    121656,
    121730,
    121732,
    121736,
    121744,
    121758,
    121760,
    121804,
    121842,
    121844,
    121890,
    121922,
    121924,
    121928,
    121936,
    121950,
    121958,
    121978,
    121986,
    121988,
    121992,
    122e3,
    122014,
    122016,
    122044,
    122060,
    122098,
    122100,
    122116,
    122120,
    122128,
    122142,
    122144,
    122172,
    122176,
    122232,
    122246,
    122264,
    122318,
    122338,
    122340,
    122344,
    122414,
    122418,
    122420,
    122446,
    122460,
    122466,
    122468,
    122472,
    122510,
    122524,
    122552,
    122562,
    122564,
    122568,
    122576,
    122598,
    122618,
    122646,
    122662,
    122668,
    122694,
    122700,
    122712,
    122738,
    122740,
    122762,
    122770,
    122772,
    122786,
    122788,
    122792,
    123018,
    123026,
    123028,
    123042,
    123044,
    123048,
    123062,
    123098,
    123146,
    123154,
    123156,
    123170,
    123172,
    123176,
    123190,
    123202,
    123204,
    123208,
    123216,
    123238,
    123244,
    123258,
    123290,
    123314,
    123316,
    123402,
    123410,
    123412,
    123426,
    123428,
    123432,
    123446,
    123458,
    123464,
    123472,
    123486,
    123494,
    123500,
    123514,
    123522,
    123524,
    123528,
    123536,
    123552,
    123580,
    123590,
    123596,
    123608,
    123630,
    123634,
    123636,
    123674,
    123698,
    123700,
    123740,
    123746,
    123748,
    123752,
    123834,
    123914,
    123922,
    123924,
    123938,
    123944,
    123958,
    123970,
    123976,
    123984,
    123998,
    124006,
    124012,
    124026,
    124034,
    124036,
    124048,
    124062,
    124064,
    124092,
    124102,
    124108,
    124120,
    124142,
    124146,
    124148,
    124162,
    124164,
    124168,
    124176,
    124190,
    124192,
    124220,
    124224,
    124280,
    124294,
    124300,
    124312,
    124336,
    124350,
    124366,
    124380,
    124386,
    124388,
    124392,
    124406,
    124442,
    124462,
    124466,
    124468,
    124494,
    124508,
    124514,
    124520,
    124558,
    124572,
    124600,
    124610,
    124612,
    124616,
    124624,
    124646,
    124666,
    124694,
    124710,
    124716,
    124730,
    124742,
    124748,
    124760,
    124786,
    124788,
    124818,
    124820,
    124834,
    124836,
    124840,
    124854,
    124946,
    124948,
    124962,
    124964,
    124968,
    124982,
    124994,
    124996,
    125e3,
    125008,
    125022,
    125030,
    125036,
    125050,
    125058,
    125060,
    125064,
    125072,
    125086,
    125088,
    125116,
    125126,
    125132,
    125144,
    125166,
    125170,
    125172,
    125186,
    125188,
    125192,
    125200,
    125216,
    125244,
    125248,
    125304,
    125318,
    125324,
    125336,
    125360,
    125374,
    125390,
    125404,
    125410,
    125412,
    125416,
    125430,
    125444,
    125448,
    125456,
    125472,
    125504,
    125560,
    125680,
    125702,
    125708,
    125720,
    125744,
    125758,
    125792,
    125820,
    125838,
    125852,
    125880,
    125890,
    125892,
    125896,
    125904,
    125918,
    125926,
    125932,
    125978,
    125998,
    126002,
    126004,
    126030,
    126044,
    126050,
    126052,
    126056,
    126094,
    126108,
    126136,
    126146,
    126148,
    126152,
    126160,
    126182,
    126202,
    126222,
    126236,
    126264,
    126320,
    126334,
    126338,
    126340,
    126344,
    126352,
    126366,
    126368,
    126412,
    126450,
    126452,
    126486,
    126502,
    126508,
    126522,
    126534,
    126540,
    126552,
    126574,
    126578,
    126580,
    126598,
    126604,
    126616,
    126640,
    126654,
    126670,
    126684,
    126690,
    126692,
    126696,
    126738,
    126754,
    126756,
    126760,
    126774,
    126786,
    126788,
    126792,
    126800,
    126814,
    126822,
    126828,
    126842,
    126894,
    126898,
    126900,
    126934,
    127126,
    127142,
    127148,
    127162,
    127178,
    127186,
    127188,
    127254,
    127270,
    127276,
    127290,
    127302,
    127308,
    127320,
    127342,
    127346,
    127348,
    127370,
    127378,
    127380,
    127394,
    127396,
    127400,
    127450,
    127510,
    127526,
    127532,
    127546,
    127558,
    127576,
    127598,
    127602,
    127604,
    127622,
    127628,
    127640,
    127664,
    127678,
    127694,
    127708,
    127714,
    127716,
    127720,
    127734,
    127754,
    127762,
    127764,
    127778,
    127784,
    127810,
    127812,
    127816,
    127824,
    127838,
    127846,
    127866,
    127898,
    127918,
    127922,
    127924,
    128022,
    128038,
    128044,
    128058,
    128070,
    128076,
    128088,
    128110,
    128114,
    128116,
    128134,
    128140,
    128152,
    128176,
    128190,
    128206,
    128220,
    128226,
    128228,
    128232,
    128246,
    128262,
    128268,
    128280,
    128304,
    128318,
    128352,
    128380,
    128398,
    128412,
    128440,
    128450,
    128452,
    128456,
    128464,
    128478,
    128486,
    128492,
    128506,
    128522,
    128530,
    128532,
    128546,
    128548,
    128552,
    128566,
    128578,
    128580,
    128584,
    128592,
    128606,
    128614,
    128634,
    128642,
    128644,
    128648,
    128656,
    128670,
    128672,
    128700,
    128716,
    128754,
    128756,
    128794,
    128814,
    128818,
    128820,
    128846,
    128860,
    128866,
    128868,
    128872,
    128886,
    128918,
    128934,
    128940,
    128954,
    128978,
    128980,
    129178,
    129198,
    129202,
    129204,
    129238,
    129258,
    129306,
    129326,
    129330,
    129332,
    129358,
    129372,
    129378,
    129380,
    129384,
    129398,
    129430,
    129446,
    129452,
    129466,
    129482,
    129490,
    129492,
    129562,
    129582,
    129586,
    129588,
    129614,
    129628,
    129634,
    129636,
    129640,
    129654,
    129678,
    129692,
    129720,
    129730,
    129732,
    129736,
    129744,
    129758,
    129766,
    129772,
    129814,
    129830,
    129836,
    129850,
    129862,
    129868,
    129880,
    129902,
    129906,
    129908,
    129930,
    129938,
    129940,
    129954,
    129956,
    129960,
    129974,
    130010
  ]), r.CODEWORD_TABLE = Int32Array.from([
    2627,
    1819,
    2622,
    2621,
    1813,
    1812,
    2729,
    2724,
    2723,
    2779,
    2774,
    2773,
    902,
    896,
    908,
    868,
    865,
    861,
    859,
    2511,
    873,
    871,
    1780,
    835,
    2493,
    825,
    2491,
    842,
    837,
    844,
    1764,
    1762,
    811,
    810,
    809,
    2483,
    807,
    2482,
    806,
    2480,
    815,
    814,
    813,
    812,
    2484,
    817,
    816,
    1745,
    1744,
    1742,
    1746,
    2655,
    2637,
    2635,
    2626,
    2625,
    2623,
    2628,
    1820,
    2752,
    2739,
    2737,
    2728,
    2727,
    2725,
    2730,
    2785,
    2783,
    2778,
    2777,
    2775,
    2780,
    787,
    781,
    747,
    739,
    736,
    2413,
    754,
    752,
    1719,
    692,
    689,
    681,
    2371,
    678,
    2369,
    700,
    697,
    694,
    703,
    1688,
    1686,
    642,
    638,
    2343,
    631,
    2341,
    627,
    2338,
    651,
    646,
    643,
    2345,
    654,
    652,
    1652,
    1650,
    1647,
    1654,
    601,
    599,
    2322,
    596,
    2321,
    594,
    2319,
    2317,
    611,
    610,
    608,
    606,
    2324,
    603,
    2323,
    615,
    614,
    612,
    1617,
    1616,
    1614,
    1612,
    616,
    1619,
    1618,
    2575,
    2538,
    2536,
    905,
    901,
    898,
    909,
    2509,
    2507,
    2504,
    870,
    867,
    864,
    860,
    2512,
    875,
    872,
    1781,
    2490,
    2489,
    2487,
    2485,
    1748,
    836,
    834,
    832,
    830,
    2494,
    827,
    2492,
    843,
    841,
    839,
    845,
    1765,
    1763,
    2701,
    2676,
    2674,
    2653,
    2648,
    2656,
    2634,
    2633,
    2631,
    2629,
    1821,
    2638,
    2636,
    2770,
    2763,
    2761,
    2750,
    2745,
    2753,
    2736,
    2735,
    2733,
    2731,
    1848,
    2740,
    2738,
    2786,
    2784,
    591,
    588,
    576,
    569,
    566,
    2296,
    1590,
    537,
    534,
    526,
    2276,
    522,
    2274,
    545,
    542,
    539,
    548,
    1572,
    1570,
    481,
    2245,
    466,
    2242,
    462,
    2239,
    492,
    485,
    482,
    2249,
    496,
    494,
    1534,
    1531,
    1528,
    1538,
    413,
    2196,
    406,
    2191,
    2188,
    425,
    419,
    2202,
    415,
    2199,
    432,
    430,
    427,
    1472,
    1467,
    1464,
    433,
    1476,
    1474,
    368,
    367,
    2160,
    365,
    2159,
    362,
    2157,
    2155,
    2152,
    378,
    377,
    375,
    2166,
    372,
    2165,
    369,
    2162,
    383,
    381,
    379,
    2168,
    1419,
    1418,
    1416,
    1414,
    385,
    1411,
    384,
    1423,
    1422,
    1420,
    1424,
    2461,
    802,
    2441,
    2439,
    790,
    786,
    783,
    794,
    2409,
    2406,
    2403,
    750,
    742,
    738,
    2414,
    756,
    753,
    1720,
    2367,
    2365,
    2362,
    2359,
    1663,
    693,
    691,
    684,
    2373,
    680,
    2370,
    702,
    699,
    696,
    704,
    1690,
    1687,
    2337,
    2336,
    2334,
    2332,
    1624,
    2329,
    1622,
    640,
    637,
    2344,
    634,
    2342,
    630,
    2340,
    650,
    648,
    645,
    2346,
    655,
    653,
    1653,
    1651,
    1649,
    1655,
    2612,
    2597,
    2595,
    2571,
    2568,
    2565,
    2576,
    2534,
    2529,
    2526,
    1787,
    2540,
    2537,
    907,
    904,
    900,
    910,
    2503,
    2502,
    2500,
    2498,
    1768,
    2495,
    1767,
    2510,
    2508,
    2506,
    869,
    866,
    863,
    2513,
    876,
    874,
    1782,
    2720,
    2713,
    2711,
    2697,
    2694,
    2691,
    2702,
    2672,
    2670,
    2664,
    1828,
    2678,
    2675,
    2647,
    2646,
    2644,
    2642,
    1823,
    2639,
    1822,
    2654,
    2652,
    2650,
    2657,
    2771,
    1855,
    2765,
    2762,
    1850,
    1849,
    2751,
    2749,
    2747,
    2754,
    353,
    2148,
    344,
    342,
    336,
    2142,
    332,
    2140,
    345,
    1375,
    1373,
    306,
    2130,
    299,
    2128,
    295,
    2125,
    319,
    314,
    311,
    2132,
    1354,
    1352,
    1349,
    1356,
    262,
    257,
    2101,
    253,
    2096,
    2093,
    274,
    273,
    267,
    2107,
    263,
    2104,
    280,
    278,
    275,
    1316,
    1311,
    1308,
    1320,
    1318,
    2052,
    202,
    2050,
    2044,
    2040,
    219,
    2063,
    212,
    2060,
    208,
    2055,
    224,
    221,
    2066,
    1260,
    1258,
    1252,
    231,
    1248,
    229,
    1266,
    1264,
    1261,
    1268,
    155,
    1998,
    153,
    1996,
    1994,
    1991,
    1988,
    165,
    164,
    2007,
    162,
    2006,
    159,
    2003,
    2e3,
    172,
    171,
    169,
    2012,
    166,
    2010,
    1186,
    1184,
    1182,
    1179,
    175,
    1176,
    173,
    1192,
    1191,
    1189,
    1187,
    176,
    1194,
    1193,
    2313,
    2307,
    2305,
    592,
    589,
    2294,
    2292,
    2289,
    578,
    572,
    568,
    2297,
    580,
    1591,
    2272,
    2267,
    2264,
    1547,
    538,
    536,
    529,
    2278,
    525,
    2275,
    547,
    544,
    541,
    1574,
    1571,
    2237,
    2235,
    2229,
    1493,
    2225,
    1489,
    478,
    2247,
    470,
    2244,
    465,
    2241,
    493,
    488,
    484,
    2250,
    498,
    495,
    1536,
    1533,
    1530,
    1539,
    2187,
    2186,
    2184,
    2182,
    1432,
    2179,
    1430,
    2176,
    1427,
    414,
    412,
    2197,
    409,
    2195,
    405,
    2193,
    2190,
    426,
    424,
    421,
    2203,
    418,
    2201,
    431,
    429,
    1473,
    1471,
    1469,
    1466,
    434,
    1477,
    1475,
    2478,
    2472,
    2470,
    2459,
    2457,
    2454,
    2462,
    803,
    2437,
    2432,
    2429,
    1726,
    2443,
    2440,
    792,
    789,
    785,
    2401,
    2399,
    2393,
    1702,
    2389,
    1699,
    2411,
    2408,
    2405,
    745,
    741,
    2415,
    758,
    755,
    1721,
    2358,
    2357,
    2355,
    2353,
    1661,
    2350,
    1660,
    2347,
    1657,
    2368,
    2366,
    2364,
    2361,
    1666,
    690,
    687,
    2374,
    683,
    2372,
    701,
    698,
    705,
    1691,
    1689,
    2619,
    2617,
    2610,
    2608,
    2605,
    2613,
    2593,
    2588,
    2585,
    1803,
    2599,
    2596,
    2563,
    2561,
    2555,
    1797,
    2551,
    1795,
    2573,
    2570,
    2567,
    2577,
    2525,
    2524,
    2522,
    2520,
    1786,
    2517,
    1785,
    2514,
    1783,
    2535,
    2533,
    2531,
    2528,
    1788,
    2541,
    2539,
    906,
    903,
    911,
    2721,
    1844,
    2715,
    2712,
    1838,
    1836,
    2699,
    2696,
    2693,
    2703,
    1827,
    1826,
    1824,
    2673,
    2671,
    2669,
    2666,
    1829,
    2679,
    2677,
    1858,
    1857,
    2772,
    1854,
    1853,
    1851,
    1856,
    2766,
    2764,
    143,
    1987,
    139,
    1986,
    135,
    133,
    131,
    1984,
    128,
    1983,
    125,
    1981,
    138,
    137,
    136,
    1985,
    1133,
    1132,
    1130,
    112,
    110,
    1974,
    107,
    1973,
    104,
    1971,
    1969,
    122,
    121,
    119,
    117,
    1977,
    114,
    1976,
    124,
    1115,
    1114,
    1112,
    1110,
    1117,
    1116,
    84,
    83,
    1953,
    81,
    1952,
    78,
    1950,
    1948,
    1945,
    94,
    93,
    91,
    1959,
    88,
    1958,
    85,
    1955,
    99,
    97,
    95,
    1961,
    1086,
    1085,
    1083,
    1081,
    1078,
    100,
    1090,
    1089,
    1087,
    1091,
    49,
    47,
    1917,
    44,
    1915,
    1913,
    1910,
    1907,
    59,
    1926,
    56,
    1925,
    53,
    1922,
    1919,
    66,
    64,
    1931,
    61,
    1929,
    1042,
    1040,
    1038,
    71,
    1035,
    70,
    1032,
    68,
    1048,
    1047,
    1045,
    1043,
    1050,
    1049,
    12,
    10,
    1869,
    1867,
    1864,
    1861,
    21,
    1880,
    19,
    1877,
    1874,
    1871,
    28,
    1888,
    25,
    1886,
    22,
    1883,
    982,
    980,
    977,
    974,
    32,
    30,
    991,
    989,
    987,
    984,
    34,
    995,
    994,
    992,
    2151,
    2150,
    2147,
    2146,
    2144,
    356,
    355,
    354,
    2149,
    2139,
    2138,
    2136,
    2134,
    1359,
    343,
    341,
    338,
    2143,
    335,
    2141,
    348,
    347,
    346,
    1376,
    1374,
    2124,
    2123,
    2121,
    2119,
    1326,
    2116,
    1324,
    310,
    308,
    305,
    2131,
    302,
    2129,
    298,
    2127,
    320,
    318,
    316,
    313,
    2133,
    322,
    321,
    1355,
    1353,
    1351,
    1357,
    2092,
    2091,
    2089,
    2087,
    1276,
    2084,
    1274,
    2081,
    1271,
    259,
    2102,
    256,
    2100,
    252,
    2098,
    2095,
    272,
    269,
    2108,
    266,
    2106,
    281,
    279,
    277,
    1317,
    1315,
    1313,
    1310,
    282,
    1321,
    1319,
    2039,
    2037,
    2035,
    2032,
    1203,
    2029,
    1200,
    1197,
    207,
    2053,
    205,
    2051,
    201,
    2049,
    2046,
    2043,
    220,
    218,
    2064,
    215,
    2062,
    211,
    2059,
    228,
    226,
    223,
    2069,
    1259,
    1257,
    1254,
    232,
    1251,
    230,
    1267,
    1265,
    1263,
    2316,
    2315,
    2312,
    2311,
    2309,
    2314,
    2304,
    2303,
    2301,
    2299,
    1593,
    2308,
    2306,
    590,
    2288,
    2287,
    2285,
    2283,
    1578,
    2280,
    1577,
    2295,
    2293,
    2291,
    579,
    577,
    574,
    571,
    2298,
    582,
    581,
    1592,
    2263,
    2262,
    2260,
    2258,
    1545,
    2255,
    1544,
    2252,
    1541,
    2273,
    2271,
    2269,
    2266,
    1550,
    535,
    532,
    2279,
    528,
    2277,
    546,
    543,
    549,
    1575,
    1573,
    2224,
    2222,
    2220,
    1486,
    2217,
    1485,
    2214,
    1482,
    1479,
    2238,
    2236,
    2234,
    2231,
    1496,
    2228,
    1492,
    480,
    477,
    2248,
    473,
    2246,
    469,
    2243,
    490,
    487,
    2251,
    497,
    1537,
    1535,
    1532,
    2477,
    2476,
    2474,
    2479,
    2469,
    2468,
    2466,
    2464,
    1730,
    2473,
    2471,
    2453,
    2452,
    2450,
    2448,
    1729,
    2445,
    1728,
    2460,
    2458,
    2456,
    2463,
    805,
    804,
    2428,
    2427,
    2425,
    2423,
    1725,
    2420,
    1724,
    2417,
    1722,
    2438,
    2436,
    2434,
    2431,
    1727,
    2444,
    2442,
    793,
    791,
    788,
    795,
    2388,
    2386,
    2384,
    1697,
    2381,
    1696,
    2378,
    1694,
    1692,
    2402,
    2400,
    2398,
    2395,
    1703,
    2392,
    1701,
    2412,
    2410,
    2407,
    751,
    748,
    744,
    2416,
    759,
    757,
    1807,
    2620,
    2618,
    1806,
    1805,
    2611,
    2609,
    2607,
    2614,
    1802,
    1801,
    1799,
    2594,
    2592,
    2590,
    2587,
    1804,
    2600,
    2598,
    1794,
    1793,
    1791,
    1789,
    2564,
    2562,
    2560,
    2557,
    1798,
    2554,
    1796,
    2574,
    2572,
    2569,
    2578,
    1847,
    1846,
    2722,
    1843,
    1842,
    1840,
    1845,
    2716,
    2714,
    1835,
    1834,
    1832,
    1830,
    1839,
    1837,
    2700,
    2698,
    2695,
    2704,
    1817,
    1811,
    1810,
    897,
    862,
    1777,
    829,
    826,
    838,
    1760,
    1758,
    808,
    2481,
    1741,
    1740,
    1738,
    1743,
    2624,
    1818,
    2726,
    2776,
    782,
    740,
    737,
    1715,
    686,
    679,
    695,
    1682,
    1680,
    639,
    628,
    2339,
    647,
    644,
    1645,
    1643,
    1640,
    1648,
    602,
    600,
    597,
    595,
    2320,
    593,
    2318,
    609,
    607,
    604,
    1611,
    1610,
    1608,
    1606,
    613,
    1615,
    1613,
    2328,
    926,
    924,
    892,
    886,
    899,
    857,
    850,
    2505,
    1778,
    824,
    823,
    821,
    819,
    2488,
    818,
    2486,
    833,
    831,
    828,
    840,
    1761,
    1759,
    2649,
    2632,
    2630,
    2746,
    2734,
    2732,
    2782,
    2781,
    570,
    567,
    1587,
    531,
    527,
    523,
    540,
    1566,
    1564,
    476,
    467,
    463,
    2240,
    486,
    483,
    1524,
    1521,
    1518,
    1529,
    411,
    403,
    2192,
    399,
    2189,
    423,
    416,
    1462,
    1457,
    1454,
    428,
    1468,
    1465,
    2210,
    366,
    363,
    2158,
    360,
    2156,
    357,
    2153,
    376,
    373,
    370,
    2163,
    1410,
    1409,
    1407,
    1405,
    382,
    1402,
    380,
    1417,
    1415,
    1412,
    1421,
    2175,
    2174,
    777,
    774,
    771,
    784,
    732,
    725,
    722,
    2404,
    743,
    1716,
    676,
    674,
    668,
    2363,
    665,
    2360,
    685,
    1684,
    1681,
    626,
    624,
    622,
    2335,
    620,
    2333,
    617,
    2330,
    641,
    635,
    649,
    1646,
    1644,
    1642,
    2566,
    928,
    925,
    2530,
    2527,
    894,
    891,
    888,
    2501,
    2499,
    2496,
    858,
    856,
    854,
    851,
    1779,
    2692,
    2668,
    2665,
    2645,
    2643,
    2640,
    2651,
    2768,
    2759,
    2757,
    2744,
    2743,
    2741,
    2748,
    352,
    1382,
    340,
    337,
    333,
    1371,
    1369,
    307,
    300,
    296,
    2126,
    315,
    312,
    1347,
    1342,
    1350,
    261,
    258,
    250,
    2097,
    246,
    2094,
    271,
    268,
    264,
    1306,
    1301,
    1298,
    276,
    1312,
    1309,
    2115,
    203,
    2048,
    195,
    2045,
    191,
    2041,
    213,
    209,
    2056,
    1246,
    1244,
    1238,
    225,
    1234,
    222,
    1256,
    1253,
    1249,
    1262,
    2080,
    2079,
    154,
    1997,
    150,
    1995,
    147,
    1992,
    1989,
    163,
    160,
    2004,
    156,
    2001,
    1175,
    1174,
    1172,
    1170,
    1167,
    170,
    1164,
    167,
    1185,
    1183,
    1180,
    1177,
    174,
    1190,
    1188,
    2025,
    2024,
    2022,
    587,
    586,
    564,
    559,
    556,
    2290,
    573,
    1588,
    520,
    518,
    512,
    2268,
    508,
    2265,
    530,
    1568,
    1565,
    461,
    457,
    2233,
    450,
    2230,
    446,
    2226,
    479,
    471,
    489,
    1526,
    1523,
    1520,
    397,
    395,
    2185,
    392,
    2183,
    389,
    2180,
    2177,
    410,
    2194,
    402,
    422,
    1463,
    1461,
    1459,
    1456,
    1470,
    2455,
    799,
    2433,
    2430,
    779,
    776,
    773,
    2397,
    2394,
    2390,
    734,
    728,
    724,
    746,
    1717,
    2356,
    2354,
    2351,
    2348,
    1658,
    677,
    675,
    673,
    670,
    667,
    688,
    1685,
    1683,
    2606,
    2589,
    2586,
    2559,
    2556,
    2552,
    927,
    2523,
    2521,
    2518,
    2515,
    1784,
    2532,
    895,
    893,
    890,
    2718,
    2709,
    2707,
    2689,
    2687,
    2684,
    2663,
    2662,
    2660,
    2658,
    1825,
    2667,
    2769,
    1852,
    2760,
    2758,
    142,
    141,
    1139,
    1138,
    134,
    132,
    129,
    126,
    1982,
    1129,
    1128,
    1126,
    1131,
    113,
    111,
    108,
    105,
    1972,
    101,
    1970,
    120,
    118,
    115,
    1109,
    1108,
    1106,
    1104,
    123,
    1113,
    1111,
    82,
    79,
    1951,
    75,
    1949,
    72,
    1946,
    92,
    89,
    86,
    1956,
    1077,
    1076,
    1074,
    1072,
    98,
    1069,
    96,
    1084,
    1082,
    1079,
    1088,
    1968,
    1967,
    48,
    45,
    1916,
    42,
    1914,
    39,
    1911,
    1908,
    60,
    57,
    54,
    1923,
    50,
    1920,
    1031,
    1030,
    1028,
    1026,
    67,
    1023,
    65,
    1020,
    62,
    1041,
    1039,
    1036,
    1033,
    69,
    1046,
    1044,
    1944,
    1943,
    1941,
    11,
    9,
    1868,
    7,
    1865,
    1862,
    1859,
    20,
    1878,
    16,
    1875,
    13,
    1872,
    970,
    968,
    966,
    963,
    29,
    960,
    26,
    23,
    983,
    981,
    978,
    975,
    33,
    971,
    31,
    990,
    988,
    985,
    1906,
    1904,
    1902,
    993,
    351,
    2145,
    1383,
    331,
    330,
    328,
    326,
    2137,
    323,
    2135,
    339,
    1372,
    1370,
    294,
    293,
    291,
    289,
    2122,
    286,
    2120,
    283,
    2117,
    309,
    303,
    317,
    1348,
    1346,
    1344,
    245,
    244,
    242,
    2090,
    239,
    2088,
    236,
    2085,
    2082,
    260,
    2099,
    249,
    270,
    1307,
    1305,
    1303,
    1300,
    1314,
    189,
    2038,
    186,
    2036,
    183,
    2033,
    2030,
    2026,
    206,
    198,
    2047,
    194,
    216,
    1247,
    1245,
    1243,
    1240,
    227,
    1237,
    1255,
    2310,
    2302,
    2300,
    2286,
    2284,
    2281,
    565,
    563,
    561,
    558,
    575,
    1589,
    2261,
    2259,
    2256,
    2253,
    1542,
    521,
    519,
    517,
    514,
    2270,
    511,
    533,
    1569,
    1567,
    2223,
    2221,
    2218,
    2215,
    1483,
    2211,
    1480,
    459,
    456,
    453,
    2232,
    449,
    474,
    491,
    1527,
    1525,
    1522,
    2475,
    2467,
    2465,
    2451,
    2449,
    2446,
    801,
    800,
    2426,
    2424,
    2421,
    2418,
    1723,
    2435,
    780,
    778,
    775,
    2387,
    2385,
    2382,
    2379,
    1695,
    2375,
    1693,
    2396,
    735,
    733,
    730,
    727,
    749,
    1718,
    2616,
    2615,
    2604,
    2603,
    2601,
    2584,
    2583,
    2581,
    2579,
    1800,
    2591,
    2550,
    2549,
    2547,
    2545,
    1792,
    2542,
    1790,
    2558,
    929,
    2719,
    1841,
    2710,
    2708,
    1833,
    1831,
    2690,
    2688,
    2686,
    1815,
    1809,
    1808,
    1774,
    1756,
    1754,
    1737,
    1736,
    1734,
    1739,
    1816,
    1711,
    1676,
    1674,
    633,
    629,
    1638,
    1636,
    1633,
    1641,
    598,
    1605,
    1604,
    1602,
    1600,
    605,
    1609,
    1607,
    2327,
    887,
    853,
    1775,
    822,
    820,
    1757,
    1755,
    1584,
    524,
    1560,
    1558,
    468,
    464,
    1514,
    1511,
    1508,
    1519,
    408,
    404,
    400,
    1452,
    1447,
    1444,
    417,
    1458,
    1455,
    2208,
    364,
    361,
    358,
    2154,
    1401,
    1400,
    1398,
    1396,
    374,
    1393,
    371,
    1408,
    1406,
    1403,
    1413,
    2173,
    2172,
    772,
    726,
    723,
    1712,
    672,
    669,
    666,
    682,
    1678,
    1675,
    625,
    623,
    621,
    618,
    2331,
    636,
    632,
    1639,
    1637,
    1635,
    920,
    918,
    884,
    880,
    889,
    849,
    848,
    847,
    846,
    2497,
    855,
    852,
    1776,
    2641,
    2742,
    2787,
    1380,
    334,
    1367,
    1365,
    301,
    297,
    1340,
    1338,
    1335,
    1343,
    255,
    251,
    247,
    1296,
    1291,
    1288,
    265,
    1302,
    1299,
    2113,
    204,
    196,
    192,
    2042,
    1232,
    1230,
    1224,
    214,
    1220,
    210,
    1242,
    1239,
    1235,
    1250,
    2077,
    2075,
    151,
    148,
    1993,
    144,
    1990,
    1163,
    1162,
    1160,
    1158,
    1155,
    161,
    1152,
    157,
    1173,
    1171,
    1168,
    1165,
    168,
    1181,
    1178,
    2021,
    2020,
    2018,
    2023,
    585,
    560,
    557,
    1585,
    516,
    509,
    1562,
    1559,
    458,
    447,
    2227,
    472,
    1516,
    1513,
    1510,
    398,
    396,
    393,
    390,
    2181,
    386,
    2178,
    407,
    1453,
    1451,
    1449,
    1446,
    420,
    1460,
    2209,
    769,
    764,
    720,
    712,
    2391,
    729,
    1713,
    664,
    663,
    661,
    659,
    2352,
    656,
    2349,
    671,
    1679,
    1677,
    2553,
    922,
    919,
    2519,
    2516,
    885,
    883,
    881,
    2685,
    2661,
    2659,
    2767,
    2756,
    2755,
    140,
    1137,
    1136,
    130,
    127,
    1125,
    1124,
    1122,
    1127,
    109,
    106,
    102,
    1103,
    1102,
    1100,
    1098,
    116,
    1107,
    1105,
    1980,
    80,
    76,
    73,
    1947,
    1068,
    1067,
    1065,
    1063,
    90,
    1060,
    87,
    1075,
    1073,
    1070,
    1080,
    1966,
    1965,
    46,
    43,
    40,
    1912,
    36,
    1909,
    1019,
    1018,
    1016,
    1014,
    58,
    1011,
    55,
    1008,
    51,
    1029,
    1027,
    1024,
    1021,
    63,
    1037,
    1034,
    1940,
    1939,
    1937,
    1942,
    8,
    1866,
    4,
    1863,
    1,
    1860,
    956,
    954,
    952,
    949,
    946,
    17,
    14,
    969,
    967,
    964,
    961,
    27,
    957,
    24,
    979,
    976,
    972,
    1901,
    1900,
    1898,
    1896,
    986,
    1905,
    1903,
    350,
    349,
    1381,
    329,
    327,
    324,
    1368,
    1366,
    292,
    290,
    287,
    284,
    2118,
    304,
    1341,
    1339,
    1337,
    1345,
    243,
    240,
    237,
    2086,
    233,
    2083,
    254,
    1297,
    1295,
    1293,
    1290,
    1304,
    2114,
    190,
    187,
    184,
    2034,
    180,
    2031,
    177,
    2027,
    199,
    1233,
    1231,
    1229,
    1226,
    217,
    1223,
    1241,
    2078,
    2076,
    584,
    555,
    554,
    552,
    550,
    2282,
    562,
    1586,
    507,
    506,
    504,
    502,
    2257,
    499,
    2254,
    515,
    1563,
    1561,
    445,
    443,
    441,
    2219,
    438,
    2216,
    435,
    2212,
    460,
    454,
    475,
    1517,
    1515,
    1512,
    2447,
    798,
    797,
    2422,
    2419,
    770,
    768,
    766,
    2383,
    2380,
    2376,
    721,
    719,
    717,
    714,
    731,
    1714,
    2602,
    2582,
    2580,
    2548,
    2546,
    2543,
    923,
    921,
    2717,
    2706,
    2705,
    2683,
    2682,
    2680,
    1771,
    1752,
    1750,
    1733,
    1732,
    1731,
    1735,
    1814,
    1707,
    1670,
    1668,
    1631,
    1629,
    1626,
    1634,
    1599,
    1598,
    1596,
    1594,
    1603,
    1601,
    2326,
    1772,
    1753,
    1751,
    1581,
    1554,
    1552,
    1504,
    1501,
    1498,
    1509,
    1442,
    1437,
    1434,
    401,
    1448,
    1445,
    2206,
    1392,
    1391,
    1389,
    1387,
    1384,
    359,
    1399,
    1397,
    1394,
    1404,
    2171,
    2170,
    1708,
    1672,
    1669,
    619,
    1632,
    1630,
    1628,
    1773,
    1378,
    1363,
    1361,
    1333,
    1328,
    1336,
    1286,
    1281,
    1278,
    248,
    1292,
    1289,
    2111,
    1218,
    1216,
    1210,
    197,
    1206,
    193,
    1228,
    1225,
    1221,
    1236,
    2073,
    2071,
    1151,
    1150,
    1148,
    1146,
    152,
    1143,
    149,
    1140,
    145,
    1161,
    1159,
    1156,
    1153,
    158,
    1169,
    1166,
    2017,
    2016,
    2014,
    2019,
    1582,
    510,
    1556,
    1553,
    452,
    448,
    1506,
    1500,
    394,
    391,
    387,
    1443,
    1441,
    1439,
    1436,
    1450,
    2207,
    765,
    716,
    713,
    1709,
    662,
    660,
    657,
    1673,
    1671,
    916,
    914,
    879,
    878,
    877,
    882,
    1135,
    1134,
    1121,
    1120,
    1118,
    1123,
    1097,
    1096,
    1094,
    1092,
    103,
    1101,
    1099,
    1979,
    1059,
    1058,
    1056,
    1054,
    77,
    1051,
    74,
    1066,
    1064,
    1061,
    1071,
    1964,
    1963,
    1007,
    1006,
    1004,
    1002,
    999,
    41,
    996,
    37,
    1017,
    1015,
    1012,
    1009,
    52,
    1025,
    1022,
    1936,
    1935,
    1933,
    1938,
    942,
    940,
    938,
    935,
    932,
    5,
    2,
    955,
    953,
    950,
    947,
    18,
    943,
    15,
    965,
    962,
    958,
    1895,
    1894,
    1892,
    1890,
    973,
    1899,
    1897,
    1379,
    325,
    1364,
    1362,
    288,
    285,
    1334,
    1332,
    1330,
    241,
    238,
    234,
    1287,
    1285,
    1283,
    1280,
    1294,
    2112,
    188,
    185,
    181,
    178,
    2028,
    1219,
    1217,
    1215,
    1212,
    200,
    1209,
    1227,
    2074,
    2072,
    583,
    553,
    551,
    1583,
    505,
    503,
    500,
    513,
    1557,
    1555,
    444,
    442,
    439,
    436,
    2213,
    455,
    451,
    1507,
    1505,
    1502,
    796,
    763,
    762,
    760,
    767,
    711,
    710,
    708,
    706,
    2377,
    718,
    715,
    1710,
    2544,
    917,
    915,
    2681,
    1627,
    1597,
    1595,
    2325,
    1769,
    1749,
    1747,
    1499,
    1438,
    1435,
    2204,
    1390,
    1388,
    1385,
    1395,
    2169,
    2167,
    1704,
    1665,
    1662,
    1625,
    1623,
    1620,
    1770,
    1329,
    1282,
    1279,
    2109,
    1214,
    1207,
    1222,
    2068,
    2065,
    1149,
    1147,
    1144,
    1141,
    146,
    1157,
    1154,
    2013,
    2011,
    2008,
    2015,
    1579,
    1549,
    1546,
    1495,
    1487,
    1433,
    1431,
    1428,
    1425,
    388,
    1440,
    2205,
    1705,
    658,
    1667,
    1664,
    1119,
    1095,
    1093,
    1978,
    1057,
    1055,
    1052,
    1062,
    1962,
    1960,
    1005,
    1003,
    1e3,
    997,
    38,
    1013,
    1010,
    1932,
    1930,
    1927,
    1934,
    941,
    939,
    936,
    933,
    6,
    930,
    3,
    951,
    948,
    944,
    1889,
    1887,
    1884,
    1881,
    959,
    1893,
    1891,
    35,
    1377,
    1360,
    1358,
    1327,
    1325,
    1322,
    1331,
    1277,
    1275,
    1272,
    1269,
    235,
    1284,
    2110,
    1205,
    1204,
    1201,
    1198,
    182,
    1195,
    179,
    1213,
    2070,
    2067,
    1580,
    501,
    1551,
    1548,
    440,
    437,
    1497,
    1494,
    1490,
    1503,
    761,
    709,
    707,
    1706,
    913,
    912,
    2198,
    1386,
    2164,
    2161,
    1621,
    1766,
    2103,
    1208,
    2058,
    2054,
    1145,
    1142,
    2005,
    2002,
    1999,
    2009,
    1488,
    1429,
    1426,
    2200,
    1698,
    1659,
    1656,
    1975,
    1053,
    1957,
    1954,
    1001,
    998,
    1924,
    1921,
    1918,
    1928,
    937,
    934,
    931,
    1879,
    1876,
    1873,
    1870,
    945,
    1885,
    1882,
    1323,
    1273,
    1270,
    2105,
    1202,
    1199,
    1196,
    1211,
    2061,
    2057,
    1576,
    1543,
    1540,
    1484,
    1481,
    1478,
    1491,
    1700
  ]), r;
}();
Se.default = wd;
var xa = {}, pa = {};
Object.defineProperty(pa, "__esModule", { value: !0 });
var Cd = function() {
  function r(e, t) {
    this.bits = e, this.points = t;
  }
  return r.prototype.getBits = function() {
    return this.bits;
  }, r.prototype.getPoints = function() {
    return this.points;
  }, r;
}();
pa.default = Cd;
var Sd = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(xa, "__esModule", { value: !0 });
var or = k, md = j, xo = we, Id = pa, Od = function() {
  function r() {
  }
  return r.detectMultiple = function(e, t, n) {
    var a = e.getBlackMatrix(), i = r.detect(n, a);
    return i.length || (a = a.clone(), a.rotate180(), i = r.detect(n, a)), new Id.default(a, i);
  }, r.detect = function(e, t) {
    for (var n, a, i = new Array(), o = 0, u = 0, f = !1; o < t.getHeight(); ) {
      var l = r.findVertices(t, o, u);
      if (l[0] == null && l[3] == null) {
        if (!f)
          break;
        f = !1, u = 0;
        try {
          for (var c = Sd(i), d = c.next(); !d.done; d = c.next()) {
            var s = d.value;
            s[1] != null && (o = Math.trunc(Math.max(o, s[1].getY()))), s[3] != null && (o = Math.max(o, Math.trunc(s[3].getY())));
          }
        } catch (v) {
          n = { error: v };
        } finally {
          try {
            d && !d.done && (a = c.return) && a.call(c);
          } finally {
            if (n)
              throw n.error;
          }
        }
        o += r.ROW_STEP;
        continue;
      }
      if (f = !0, i.push(l), !e)
        break;
      l[2] != null ? (u = Math.trunc(l[2].getX()), o = Math.trunc(l[2].getY())) : (u = Math.trunc(l[4].getX()), o = Math.trunc(l[4].getY()));
    }
    return i;
  }, r.findVertices = function(e, t, n) {
    var a = e.getHeight(), i = e.getWidth(), o = new Array(8);
    return r.copyToResult(o, r.findRowsWithPattern(e, a, i, t, n, r.START_PATTERN), r.INDEXES_START_PATTERN), o[4] != null && (n = Math.trunc(o[4].getX()), t = Math.trunc(o[4].getY())), r.copyToResult(o, r.findRowsWithPattern(e, a, i, t, n, r.STOP_PATTERN), r.INDEXES_STOP_PATTERN), o;
  }, r.copyToResult = function(e, t, n) {
    for (var a = 0; a < n.length; a++)
      e[n[a]] = t[a];
  }, r.findRowsWithPattern = function(e, t, n, a, i, o) {
    for (var u = new Array(4), f = !1, l = new Int32Array(o.length); a < t; a += r.ROW_STEP) {
      var c = r.findGuardPattern(e, i, a, n, !1, o, l);
      if (c != null) {
        for (; a > 0; ) {
          var d = r.findGuardPattern(e, i, --a, n, !1, o, l);
          if (d != null)
            c = d;
          else {
            a++;
            break;
          }
        }
        u[0] = new or.default(c[0], a), u[1] = new or.default(c[1], a), f = !0;
        break;
      }
    }
    var s = a + 1;
    if (f) {
      for (var v = 0, d = Int32Array.from([Math.trunc(u[0].getX()), Math.trunc(u[1].getX())]); s < t; s++) {
        var c = r.findGuardPattern(e, d[0], s, n, !1, o, l);
        if (c != null && Math.abs(d[0] - c[0]) < r.MAX_PATTERN_DRIFT && Math.abs(d[1] - c[1]) < r.MAX_PATTERN_DRIFT)
          d = c, v = 0;
        else {
          if (v > r.SKIPPED_ROW_COUNT_MAX)
            break;
          v++;
        }
      }
      s -= v + 1, u[2] = new or.default(d[0], s), u[3] = new or.default(d[1], s);
    }
    return s - a < r.BARCODE_MIN_HEIGHT && xo.default.fill(u, null), u;
  }, r.findGuardPattern = function(e, t, n, a, i, o, u) {
    xo.default.fillWithin(u, 0, u.length, 0);
    for (var f = t, l = 0; e.get(f, n) && f > 0 && l++ < r.MAX_PIXEL_DRIFT; )
      f--;
    for (var c = f, d = 0, s = o.length, v = i; c < a; c++) {
      var h = e.get(c, n);
      if (h !== v)
        u[d]++;
      else {
        if (d === s - 1) {
          if (r.patternMatchVariance(u, o, r.MAX_INDIVIDUAL_VARIANCE) < r.MAX_AVG_VARIANCE)
            return new Int32Array([f, c]);
          f += u[0] + u[1], md.default.arraycopy(u, 2, u, 0, d - 1), u[d - 1] = 0, u[d] = 0, d--;
        } else
          d++;
        u[d] = 1, v = !v;
      }
    }
    return d === s - 1 && r.patternMatchVariance(u, o, r.MAX_INDIVIDUAL_VARIANCE) < r.MAX_AVG_VARIANCE ? new Int32Array([f, c - 1]) : null;
  }, r.patternMatchVariance = function(e, t, n) {
    for (var a = e.length, i = 0, o = 0, u = 0; u < a; u++)
      i += e[u], o += t[u];
    if (i < o)
      return 1 / 0;
    var f = i / o;
    n *= f;
    for (var l = 0, c = 0; c < a; c++) {
      var d = e[c], s = t[c] * f, v = d > s ? d - s : s - d;
      if (v > n)
        return 1 / 0;
      l += v;
    }
    return l / i;
  }, r.INDEXES_START_PATTERN = Int32Array.from([0, 4, 1, 5]), r.INDEXES_STOP_PATTERN = Int32Array.from([6, 2, 7, 3]), r.MAX_AVG_VARIANCE = 0.42, r.MAX_INDIVIDUAL_VARIANCE = 0.8, r.START_PATTERN = Int32Array.from([8, 1, 1, 1, 1, 1, 1, 3]), r.STOP_PATTERN = Int32Array.from([7, 1, 1, 3, 1, 1, 1, 2, 1]), r.MAX_PIXEL_DRIFT = 3, r.MAX_PATTERN_DRIFT = 5, r.SKIPPED_ROW_COUNT_MAX = 25, r.ROW_STEP = 5, r.BARCODE_MIN_HEIGHT = 10, r;
}();
xa.default = Od;
var _a = {}, ga = {}, jr = {}, Rd = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(jr, "__esModule", { value: !0 });
var st = N, po = j, Dd = G, Td = function() {
  function r(e, t) {
    if (t.length === 0)
      throw new st.default();
    this.field = e;
    var n = t.length;
    if (n > 1 && t[0] === 0) {
      for (var a = 1; a < n && t[a] === 0; )
        a++;
      a === n ? this.coefficients = new Int32Array([0]) : (this.coefficients = new Int32Array(n - a), po.default.arraycopy(t, a, this.coefficients, 0, this.coefficients.length));
    } else
      this.coefficients = t;
  }
  return r.prototype.getCoefficients = function() {
    return this.coefficients;
  }, r.prototype.getDegree = function() {
    return this.coefficients.length - 1;
  }, r.prototype.isZero = function() {
    return this.coefficients[0] === 0;
  }, r.prototype.getCoefficient = function(e) {
    return this.coefficients[this.coefficients.length - 1 - e];
  }, r.prototype.evaluateAt = function(e) {
    var t, n;
    if (e === 0)
      return this.getCoefficient(0);
    if (e === 1) {
      var a = 0;
      try {
        for (var i = Rd(this.coefficients), o = i.next(); !o.done; o = i.next()) {
          var u = o.value;
          a = this.field.add(a, u);
        }
      } catch (d) {
        t = { error: d };
      } finally {
        try {
          o && !o.done && (n = i.return) && n.call(i);
        } finally {
          if (t)
            throw t.error;
        }
      }
      return a;
    }
    for (var f = this.coefficients[0], l = this.coefficients.length, c = 1; c < l; c++)
      f = this.field.add(this.field.multiply(e, f), this.coefficients[c]);
    return f;
  }, r.prototype.add = function(e) {
    if (!this.field.equals(e.field))
      throw new st.default("ModulusPolys do not have same ModulusGF field");
    if (this.isZero())
      return e;
    if (e.isZero())
      return this;
    var t = this.coefficients, n = e.coefficients;
    if (t.length > n.length) {
      var a = t;
      t = n, n = a;
    }
    var i = new Int32Array(n.length), o = n.length - t.length;
    po.default.arraycopy(n, 0, i, 0, o);
    for (var u = o; u < n.length; u++)
      i[u] = this.field.add(t[u - o], n[u]);
    return new r(this.field, i);
  }, r.prototype.subtract = function(e) {
    if (!this.field.equals(e.field))
      throw new st.default("ModulusPolys do not have same ModulusGF field");
    return e.isZero() ? this : this.add(e.negative());
  }, r.prototype.multiply = function(e) {
    return e instanceof r ? this.multiplyOther(e) : this.multiplyScalar(e);
  }, r.prototype.multiplyOther = function(e) {
    if (!this.field.equals(e.field))
      throw new st.default("ModulusPolys do not have same ModulusGF field");
    if (this.isZero() || e.isZero())
      return new r(this.field, new Int32Array([0]));
    for (var t = this.coefficients, n = t.length, a = e.coefficients, i = a.length, o = new Int32Array(n + i - 1), u = 0; u < n; u++)
      for (var f = t[u], l = 0; l < i; l++)
        o[u + l] = this.field.add(o[u + l], this.field.multiply(f, a[l]));
    return new r(this.field, o);
  }, r.prototype.negative = function() {
    for (var e = this.coefficients.length, t = new Int32Array(e), n = 0; n < e; n++)
      t[n] = this.field.subtract(0, this.coefficients[n]);
    return new r(this.field, t);
  }, r.prototype.multiplyScalar = function(e) {
    if (e === 0)
      return new r(this.field, new Int32Array([0]));
    if (e === 1)
      return this;
    for (var t = this.coefficients.length, n = new Int32Array(t), a = 0; a < t; a++)
      n[a] = this.field.multiply(this.coefficients[a], e);
    return new r(this.field, n);
  }, r.prototype.multiplyByMonomial = function(e, t) {
    if (e < 0)
      throw new st.default();
    if (t === 0)
      return new r(this.field, new Int32Array([0]));
    for (var n = this.coefficients.length, a = new Int32Array(n + e), i = 0; i < n; i++)
      a[i] = this.field.multiply(this.coefficients[i], t);
    return new r(this.field, a);
  }, r.prototype.toString = function() {
    for (var e = new Dd.default(), t = this.getDegree(); t >= 0; t--) {
      var n = this.getCoefficient(t);
      n !== 0 && (n < 0 ? (e.append(" - "), n = -n) : e.length() > 0 && e.append(" + "), (t === 0 || n !== 1) && e.append(n), t !== 0 && (t === 1 ? e.append("x") : (e.append("x^"), e.append(t))));
    }
    return e.toString();
  }, r;
}();
jr.default = Td;
var ya = {}, Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
var Pd = N, bd = Et, Nd = function() {
  function r() {
  }
  return r.prototype.add = function(e, t) {
    return (e + t) % this.modulus;
  }, r.prototype.subtract = function(e, t) {
    return (this.modulus + e - t) % this.modulus;
  }, r.prototype.exp = function(e) {
    return this.expTable[e];
  }, r.prototype.log = function(e) {
    if (e === 0)
      throw new Pd.default();
    return this.logTable[e];
  }, r.prototype.inverse = function(e) {
    if (e === 0)
      throw new bd.default();
    return this.expTable[this.modulus - this.logTable[e] - 1];
  }, r.prototype.multiply = function(e, t) {
    return e === 0 || t === 0 ? 0 : this.expTable[(this.logTable[e] + this.logTable[t]) % (this.modulus - 1)];
  }, r.prototype.getSize = function() {
    return this.modulus;
  }, r.prototype.equals = function(e) {
    return e === this;
  }, r;
}();
Ea.default = Nd;
var Md = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(ya, "__esModule", { value: !0 });
var Bd = Se, An = jr, Fd = N, Ld = Ea, $d = function(r) {
  Md(e, r);
  function e(t, n) {
    var a = r.call(this) || this;
    a.modulus = t, a.expTable = new Int32Array(t), a.logTable = new Int32Array(t);
    for (var i = 1, o = 0; o < t; o++)
      a.expTable[o] = i, i = i * n % t;
    for (var o = 0; o < t - 1; o++)
      a.logTable[a.expTable[o]] = o;
    return a.zero = new An.default(a, new Int32Array([0])), a.one = new An.default(a, new Int32Array([1])), a;
  }
  return e.prototype.getZero = function() {
    return this.zero;
  }, e.prototype.getOne = function() {
    return this.one;
  }, e.prototype.buildMonomial = function(t, n) {
    if (t < 0)
      throw new Fd.default();
    if (n === 0)
      return this.zero;
    var a = new Int32Array(t + 1);
    return a[0] = n, new An.default(this, a);
  }, e.PDF417_GF = new e(Bd.default.NUMBER_OF_CODEWORDS, 3), e;
}(Ld.default);
ya.default = $d;
var kd = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(ga, "__esModule", { value: !0 });
var ur = ue, fr = jr, Ud = ya, Gd = function() {
  function r() {
    this.field = Ud.default.PDF417_GF;
  }
  return r.prototype.decode = function(e, t, n) {
    for (var a, i, o = new fr.default(this.field, e), u = new Int32Array(t), f = !1, l = t; l > 0; l--) {
      var c = o.evaluateAt(this.field.exp(l));
      u[t - l] = c, c !== 0 && (f = !0);
    }
    if (!f)
      return 0;
    var d = this.field.getOne();
    if (n != null)
      try {
        for (var s = kd(n), v = s.next(); !v.done; v = s.next()) {
          var h = v.value, x = this.field.exp(e.length - 1 - h), _ = new fr.default(this.field, new Int32Array([this.field.subtract(0, x), 1]));
          d = d.multiply(_);
        }
      } catch (O) {
        a = { error: O };
      } finally {
        try {
          v && !v.done && (i = s.return) && i.call(s);
        } finally {
          if (a)
            throw a.error;
        }
      }
    for (var g = new fr.default(this.field, u), y = this.runEuclideanAlgorithm(this.field.buildMonomial(t, 1), g, t), A = y[0], w = y[1], S = this.findErrorLocations(A), m = this.findErrorMagnitudes(w, A, S), l = 0; l < S.length; l++) {
      var I = e.length - 1 - this.field.log(S[l]);
      if (I < 0)
        throw ur.default.getChecksumInstance();
      e[I] = this.field.subtract(e[I], m[l]);
    }
    return S.length;
  }, r.prototype.runEuclideanAlgorithm = function(e, t, n) {
    if (e.getDegree() < t.getDegree()) {
      var a = e;
      e = t, t = a;
    }
    for (var i = e, o = t, u = this.field.getZero(), f = this.field.getOne(); o.getDegree() >= Math.round(n / 2); ) {
      var l = i, c = u;
      if (i = o, u = f, i.isZero())
        throw ur.default.getChecksumInstance();
      o = l;
      for (var d = this.field.getZero(), s = i.getCoefficient(i.getDegree()), v = this.field.inverse(s); o.getDegree() >= i.getDegree() && !o.isZero(); ) {
        var h = o.getDegree() - i.getDegree(), x = this.field.multiply(o.getCoefficient(o.getDegree()), v);
        d = d.add(this.field.buildMonomial(h, x)), o = o.subtract(i.multiplyByMonomial(h, x));
      }
      f = d.multiply(u).subtract(c).negative();
    }
    var _ = f.getCoefficient(0);
    if (_ === 0)
      throw ur.default.getChecksumInstance();
    var g = this.field.inverse(_), y = f.multiply(g), A = o.multiply(g);
    return [y, A];
  }, r.prototype.findErrorLocations = function(e) {
    for (var t = e.getDegree(), n = new Int32Array(t), a = 0, i = 1; i < this.field.getSize() && a < t; i++)
      e.evaluateAt(i) === 0 && (n[a] = this.field.inverse(i), a++);
    if (a !== t)
      throw ur.default.getChecksumInstance();
    return n;
  }, r.prototype.findErrorMagnitudes = function(e, t, n) {
    for (var a = t.getDegree(), i = new Int32Array(a), o = 1; o <= a; o++)
      i[a - o] = this.field.multiply(o, t.getCoefficient(o));
    for (var u = new fr.default(this.field, i), f = n.length, l = new Int32Array(f), o = 0; o < f; o++) {
      var c = this.field.inverse(n[o]), d = this.field.subtract(0, e.evaluateAt(c)), s = this.field.inverse(u.evaluateAt(c));
      l[o] = this.field.multiply(d, s);
    }
    return l;
  }, r;
}();
ga.default = Gd;
var Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
var Hd = T, Xe = k, Vd = function() {
  function r(e, t, n, a, i) {
    e instanceof r ? this.constructor_2(e) : this.constructor_1(e, t, n, a, i);
  }
  return r.prototype.constructor_1 = function(e, t, n, a, i) {
    var o = t == null || n == null, u = a == null || i == null;
    if (o && u)
      throw new Hd.default();
    o ? (t = new Xe.default(0, a.getY()), n = new Xe.default(0, i.getY())) : u && (a = new Xe.default(e.getWidth() - 1, t.getY()), i = new Xe.default(e.getWidth() - 1, n.getY())), this.image = e, this.topLeft = t, this.bottomLeft = n, this.topRight = a, this.bottomRight = i, this.minX = Math.trunc(Math.min(t.getX(), n.getX())), this.maxX = Math.trunc(Math.max(a.getX(), i.getX())), this.minY = Math.trunc(Math.min(t.getY(), a.getY())), this.maxY = Math.trunc(Math.max(n.getY(), i.getY()));
  }, r.prototype.constructor_2 = function(e) {
    this.image = e.image, this.topLeft = e.getTopLeft(), this.bottomLeft = e.getBottomLeft(), this.topRight = e.getTopRight(), this.bottomRight = e.getBottomRight(), this.minX = e.getMinX(), this.maxX = e.getMaxX(), this.minY = e.getMinY(), this.maxY = e.getMaxY();
  }, r.merge = function(e, t) {
    return e == null ? t : t == null ? e : new r(e.image, e.topLeft, e.bottomLeft, t.topRight, t.bottomRight);
  }, r.prototype.addMissingRows = function(e, t, n) {
    var a = this.topLeft, i = this.bottomLeft, o = this.topRight, u = this.bottomRight;
    if (e > 0) {
      var f = n ? this.topLeft : this.topRight, l = Math.trunc(f.getY() - e);
      l < 0 && (l = 0);
      var c = new Xe.default(f.getX(), l);
      n ? a = c : o = c;
    }
    if (t > 0) {
      var d = n ? this.bottomLeft : this.bottomRight, s = Math.trunc(d.getY() + t);
      s >= this.image.getHeight() && (s = this.image.getHeight() - 1);
      var v = new Xe.default(d.getX(), s);
      n ? i = v : u = v;
    }
    return new r(this.image, a, i, o, u);
  }, r.prototype.getMinX = function() {
    return this.minX;
  }, r.prototype.getMaxX = function() {
    return this.maxX;
  }, r.prototype.getMinY = function() {
    return this.minY;
  }, r.prototype.getMaxY = function() {
    return this.maxY;
  }, r.prototype.getTopLeft = function() {
    return this.topLeft;
  }, r.prototype.getTopRight = function() {
    return this.topRight;
  }, r.prototype.getBottomLeft = function() {
    return this.bottomLeft;
  }, r.prototype.getBottomRight = function() {
    return this.bottomRight;
  }, r;
}();
Wr.default = Vd;
var Aa = {}, wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
var jd = function() {
  function r(e, t, n, a) {
    this.columnCount = e, this.errorCorrectionLevel = a, this.rowCountUpperPart = t, this.rowCountLowerPart = n, this.rowCount = t + n;
  }
  return r.prototype.getColumnCount = function() {
    return this.columnCount;
  }, r.prototype.getErrorCorrectionLevel = function() {
    return this.errorCorrectionLevel;
  }, r.prototype.getRowCount = function() {
    return this.rowCount;
  }, r.prototype.getRowCountUpperPart = function() {
    return this.rowCountUpperPart;
  }, r.prototype.getRowCountLowerPart = function() {
    return this.rowCountLowerPart;
  }, r;
}();
wa.default = jd;
var Xr = {}, Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
var Wd = function() {
  function r() {
    this.buffer = "";
  }
  return r.form = function(e, t) {
    var n = -1;
    function a(o, u, f, l, c, d) {
      if (o === "%%")
        return "%";
      if (t[++n] !== void 0) {
        o = l ? parseInt(l.substr(1)) : void 0;
        var s = c ? parseInt(c.substr(1)) : void 0, v;
        switch (d) {
          case "s":
            v = t[n];
            break;
          case "c":
            v = t[n][0];
            break;
          case "f":
            v = parseFloat(t[n]).toFixed(o);
            break;
          case "p":
            v = parseFloat(t[n]).toPrecision(o);
            break;
          case "e":
            v = parseFloat(t[n]).toExponential(o);
            break;
          case "x":
            v = parseInt(t[n]).toString(s || 16);
            break;
          case "d":
            v = parseFloat(parseInt(t[n], s || 10).toPrecision(o)).toFixed(0);
            break;
        }
        v = typeof v == "object" ? JSON.stringify(v) : (+v).toString(s);
        for (var h = parseInt(f), x = f && f[0] + "" == "0" ? "0" : " "; v.length < h; )
          v = u !== void 0 ? v + x : x + v;
        return v;
      }
    }
    var i = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;
    return e.replace(i, a);
  }, r.prototype.format = function(e) {
    for (var t = [], n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
    this.buffer += r.form(e, t);
  }, r.prototype.toString = function() {
    return this.buffer;
  }, r;
}();
Pt.default = Wd;
var Xd = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Xr, "__esModule", { value: !0 });
var zd = Pt, Yd = Wr, Zd = function() {
  function r(e) {
    this.boundingBox = new Yd.default(e), this.codewords = new Array(e.getMaxY() - e.getMinY() + 1);
  }
  return r.prototype.getCodewordNearby = function(e) {
    var t = this.getCodeword(e);
    if (t != null)
      return t;
    for (var n = 1; n < r.MAX_NEARBY_DISTANCE; n++) {
      var a = this.imageRowToCodewordIndex(e) - n;
      if (a >= 0 && (t = this.codewords[a], t != null) || (a = this.imageRowToCodewordIndex(e) + n, a < this.codewords.length && (t = this.codewords[a], t != null)))
        return t;
    }
    return null;
  }, r.prototype.imageRowToCodewordIndex = function(e) {
    return e - this.boundingBox.getMinY();
  }, r.prototype.setCodeword = function(e, t) {
    this.codewords[this.imageRowToCodewordIndex(e)] = t;
  }, r.prototype.getCodeword = function(e) {
    return this.codewords[this.imageRowToCodewordIndex(e)];
  }, r.prototype.getBoundingBox = function() {
    return this.boundingBox;
  }, r.prototype.getCodewords = function() {
    return this.codewords;
  }, r.prototype.toString = function() {
    var e, t, n = new zd.default(), a = 0;
    try {
      for (var i = Xd(this.codewords), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        if (u == null) {
          n.format("%3d:    |   %n", a++);
          continue;
        }
        n.format("%3d: %3d|%3d%n", a++, u.getRowNumber(), u.getValue());
      }
    } catch (f) {
      e = { error: f };
    } finally {
      try {
        o && !o.done && (t = i.return) && t.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return n.toString();
  }, r.MAX_NEARBY_DISTANCE = 5, r;
}();
Xr.default = Zd;
var zr = {}, Kd = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
}, qd = E && E.__read || function(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t)
    return r;
  var n = t.call(r), a, i = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(a = n.next()).done; )
      i.push(a.value);
  } catch (u) {
    o = { error: u };
  } finally {
    try {
      a && !a.done && (t = n.return) && t.call(n);
    } finally {
      if (o)
        throw o.error;
    }
  }
  return i;
};
Object.defineProperty(zr, "__esModule", { value: !0 });
var Qd = Se, Jd = function() {
  function r() {
    this.values = /* @__PURE__ */ new Map();
  }
  return r.prototype.setValue = function(e) {
    e = Math.trunc(e);
    var t = this.values.get(e);
    t == null && (t = 0), t++, this.values.set(e, t);
  }, r.prototype.getValue = function() {
    var e, t, n = -1, a = new Array(), i = function(d, s) {
      var v = {
        getKey: function() {
          return d;
        },
        getValue: function() {
          return s;
        }
      };
      v.getValue() > n ? (n = v.getValue(), a = [], a.push(v.getKey())) : v.getValue() === n && a.push(v.getKey());
    };
    try {
      for (var o = Kd(this.values.entries()), u = o.next(); !u.done; u = o.next()) {
        var f = qd(u.value, 2), l = f[0], c = f[1];
        i(l, c);
      }
    } catch (d) {
      e = { error: d };
    } finally {
      try {
        u && !u.done && (t = o.return) && t.call(o);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return Qd.default.toIntArray(a);
  }, r.prototype.getConfidence = function(e) {
    return this.values.get(e);
  }, r;
}();
zr.default = Jd;
var es = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), wn = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Aa, "__esModule", { value: !0 });
var _o = Se, ts = wa, rs = Xr, lr = zr, ns = function(r) {
  es(e, r);
  function e(t, n) {
    var a = r.call(this, t) || this;
    return a._isLeft = n, a;
  }
  return e.prototype.setRowNumbers = function() {
    var t, n;
    try {
      for (var a = wn(this.getCodewords()), i = a.next(); !i.done; i = a.next()) {
        var o = i.value;
        o != null && o.setRowNumberAsRowIndicatorColumn();
      }
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
  }, e.prototype.adjustCompleteIndicatorColumnRowNumbers = function(t) {
    var n = this.getCodewords();
    this.setRowNumbers(), this.removeIncorrectCodewords(n, t);
    for (var a = this.getBoundingBox(), i = this._isLeft ? a.getTopLeft() : a.getTopRight(), o = this._isLeft ? a.getBottomLeft() : a.getBottomRight(), u = this.imageRowToCodewordIndex(Math.trunc(i.getY())), f = this.imageRowToCodewordIndex(Math.trunc(o.getY())), l = -1, c = 1, d = 0, s = u; s < f; s++)
      if (n[s] != null) {
        var v = n[s], h = v.getRowNumber() - l;
        if (h === 0)
          d++;
        else if (h === 1)
          c = Math.max(c, d), d = 1, l = v.getRowNumber();
        else if (h < 0 || v.getRowNumber() >= t.getRowCount() || h > s)
          n[s] = null;
        else {
          var x = void 0;
          c > 2 ? x = (c - 2) * h : x = h;
          for (var _ = x >= s, g = 1; g <= x && !_; g++)
            _ = n[s - g] != null;
          _ ? n[s] = null : (l = v.getRowNumber(), d = 1);
        }
      }
  }, e.prototype.getRowHeights = function() {
    var t, n, a = this.getBarcodeMetadata();
    if (a == null)
      return null;
    this.adjustIncompleteIndicatorColumnRowNumbers(a);
    var i = new Int32Array(a.getRowCount());
    try {
      for (var o = wn(this.getCodewords()), u = o.next(); !u.done; u = o.next()) {
        var f = u.value;
        if (f != null) {
          var l = f.getRowNumber();
          if (l >= i.length)
            continue;
          i[l]++;
        }
      }
    } catch (c) {
      t = { error: c };
    } finally {
      try {
        u && !u.done && (n = o.return) && n.call(o);
      } finally {
        if (t)
          throw t.error;
      }
    }
    return i;
  }, e.prototype.adjustIncompleteIndicatorColumnRowNumbers = function(t) {
    for (var n = this.getBoundingBox(), a = this._isLeft ? n.getTopLeft() : n.getTopRight(), i = this._isLeft ? n.getBottomLeft() : n.getBottomRight(), o = this.imageRowToCodewordIndex(Math.trunc(a.getY())), u = this.imageRowToCodewordIndex(Math.trunc(i.getY())), f = this.getCodewords(), l = -1, c = o; c < u; c++)
      if (f[c] != null) {
        var d = f[c];
        d.setRowNumberAsRowIndicatorColumn();
        var s = d.getRowNumber() - l;
        s === 0 || (s === 1 ? l = d.getRowNumber() : d.getRowNumber() >= t.getRowCount() ? f[c] = null : l = d.getRowNumber());
      }
  }, e.prototype.getBarcodeMetadata = function() {
    var t, n, a = this.getCodewords(), i = new lr.default(), o = new lr.default(), u = new lr.default(), f = new lr.default();
    try {
      for (var l = wn(a), c = l.next(); !c.done; c = l.next()) {
        var d = c.value;
        if (d != null) {
          d.setRowNumberAsRowIndicatorColumn();
          var s = d.getValue() % 30, v = d.getRowNumber();
          switch (this._isLeft || (v += 2), v % 3) {
            case 0:
              o.setValue(s * 3 + 1);
              break;
            case 1:
              f.setValue(s / 3), u.setValue(s % 3);
              break;
            case 2:
              i.setValue(s + 1);
              break;
          }
        }
      }
    } catch (x) {
      t = { error: x };
    } finally {
      try {
        c && !c.done && (n = l.return) && n.call(l);
      } finally {
        if (t)
          throw t.error;
      }
    }
    if (i.getValue().length === 0 || o.getValue().length === 0 || u.getValue().length === 0 || f.getValue().length === 0 || i.getValue()[0] < 1 || o.getValue()[0] + u.getValue()[0] < _o.default.MIN_ROWS_IN_BARCODE || o.getValue()[0] + u.getValue()[0] > _o.default.MAX_ROWS_IN_BARCODE)
      return null;
    var h = new ts.default(i.getValue()[0], o.getValue()[0], u.getValue()[0], f.getValue()[0]);
    return this.removeIncorrectCodewords(a, h), h;
  }, e.prototype.removeIncorrectCodewords = function(t, n) {
    for (var a = 0; a < t.length; a++) {
      var i = t[a];
      if (t[a] != null) {
        var o = i.getValue() % 30, u = i.getRowNumber();
        if (u > n.getRowCount()) {
          t[a] = null;
          continue;
        }
        switch (this._isLeft || (u += 2), u % 3) {
          case 0:
            o * 3 + 1 !== n.getRowCountUpperPart() && (t[a] = null);
            break;
          case 1:
            (Math.trunc(o / 3) !== n.getErrorCorrectionLevel() || o % 3 !== n.getRowCountLowerPart()) && (t[a] = null);
            break;
          case 2:
            o + 1 !== n.getColumnCount() && (t[a] = null);
            break;
        }
      }
    }
  }, e.prototype.isLeft = function() {
    return this._isLeft;
  }, e.prototype.toString = function() {
    return "IsLeft: " + this._isLeft + `
` + r.prototype.toString.call(this);
  }, e;
}(rs.default);
Aa.default = ns;
var Ca = {}, as = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Ca, "__esModule", { value: !0 });
var is = Se, os = Pt, us = function() {
  function r(e, t) {
    this.ADJUST_ROW_NUMBER_SKIP = 2, this.barcodeMetadata = e, this.barcodeColumnCount = e.getColumnCount(), this.boundingBox = t, this.detectionResultColumns = new Array(this.barcodeColumnCount + 2);
  }
  return r.prototype.getDetectionResultColumns = function() {
    this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[0]), this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[this.barcodeColumnCount + 1]);
    var e = is.default.MAX_CODEWORDS_IN_BARCODE, t;
    do
      t = e, e = this.adjustRowNumbersAndGetCount();
    while (e > 0 && e < t);
    return this.detectionResultColumns;
  }, r.prototype.adjustIndicatorColumnRowNumbers = function(e) {
    e != null && e.adjustCompleteIndicatorColumnRowNumbers(this.barcodeMetadata);
  }, r.prototype.adjustRowNumbersAndGetCount = function() {
    var e = this.adjustRowNumbersByRow();
    if (e === 0)
      return 0;
    for (var t = 1; t < this.barcodeColumnCount + 1; t++)
      for (var n = this.detectionResultColumns[t].getCodewords(), a = 0; a < n.length; a++)
        n[a] != null && (n[a].hasValidRowNumber() || this.adjustRowNumbers(t, a, n));
    return e;
  }, r.prototype.adjustRowNumbersByRow = function() {
    this.adjustRowNumbersFromBothRI();
    var e = this.adjustRowNumbersFromLRI();
    return e + this.adjustRowNumbersFromRRI();
  }, r.prototype.adjustRowNumbersFromBothRI = function() {
    if (!(this.detectionResultColumns[0] == null || this.detectionResultColumns[this.barcodeColumnCount + 1] == null)) {
      for (var e = this.detectionResultColumns[0].getCodewords(), t = this.detectionResultColumns[this.barcodeColumnCount + 1].getCodewords(), n = 0; n < e.length; n++)
        if (e[n] != null && t[n] != null && e[n].getRowNumber() === t[n].getRowNumber())
          for (var a = 1; a <= this.barcodeColumnCount; a++) {
            var i = this.detectionResultColumns[a].getCodewords()[n];
            i != null && (i.setRowNumber(e[n].getRowNumber()), i.hasValidRowNumber() || (this.detectionResultColumns[a].getCodewords()[n] = null));
          }
    }
  }, r.prototype.adjustRowNumbersFromRRI = function() {
    if (this.detectionResultColumns[this.barcodeColumnCount + 1] == null)
      return 0;
    for (var e = 0, t = this.detectionResultColumns[this.barcodeColumnCount + 1].getCodewords(), n = 0; n < t.length; n++)
      if (t[n] != null)
        for (var a = t[n].getRowNumber(), i = 0, o = this.barcodeColumnCount + 1; o > 0 && i < this.ADJUST_ROW_NUMBER_SKIP; o--) {
          var u = this.detectionResultColumns[o].getCodewords()[n];
          u != null && (i = r.adjustRowNumberIfValid(a, i, u), u.hasValidRowNumber() || e++);
        }
    return e;
  }, r.prototype.adjustRowNumbersFromLRI = function() {
    if (this.detectionResultColumns[0] == null)
      return 0;
    for (var e = 0, t = this.detectionResultColumns[0].getCodewords(), n = 0; n < t.length; n++)
      if (t[n] != null)
        for (var a = t[n].getRowNumber(), i = 0, o = 1; o < this.barcodeColumnCount + 1 && i < this.ADJUST_ROW_NUMBER_SKIP; o++) {
          var u = this.detectionResultColumns[o].getCodewords()[n];
          u != null && (i = r.adjustRowNumberIfValid(a, i, u), u.hasValidRowNumber() || e++);
        }
    return e;
  }, r.adjustRowNumberIfValid = function(e, t, n) {
    return n == null || n.hasValidRowNumber() || (n.isValidRowNumber(e) ? (n.setRowNumber(e), t = 0) : ++t), t;
  }, r.prototype.adjustRowNumbers = function(e, t, n) {
    var a, i, o = n[t], u = this.detectionResultColumns[e - 1].getCodewords(), f = u;
    this.detectionResultColumns[e + 1] != null && (f = this.detectionResultColumns[e + 1].getCodewords());
    var l = new Array(14);
    l[2] = u[t], l[3] = f[t], t > 0 && (l[0] = n[t - 1], l[4] = u[t - 1], l[5] = f[t - 1]), t > 1 && (l[8] = n[t - 2], l[10] = u[t - 2], l[11] = f[t - 2]), t < n.length - 1 && (l[1] = n[t + 1], l[6] = u[t + 1], l[7] = f[t + 1]), t < n.length - 2 && (l[9] = n[t + 2], l[12] = u[t + 2], l[13] = f[t + 2]);
    try {
      for (var c = as(l), d = c.next(); !d.done; d = c.next()) {
        var s = d.value;
        if (r.adjustRowNumber(o, s))
          return;
      }
    } catch (v) {
      a = { error: v };
    } finally {
      try {
        d && !d.done && (i = c.return) && i.call(c);
      } finally {
        if (a)
          throw a.error;
      }
    }
  }, r.adjustRowNumber = function(e, t) {
    return t == null ? !1 : t.hasValidRowNumber() && t.getBucket() === e.getBucket() ? (e.setRowNumber(t.getRowNumber()), !0) : !1;
  }, r.prototype.getBarcodeColumnCount = function() {
    return this.barcodeColumnCount;
  }, r.prototype.getBarcodeRowCount = function() {
    return this.barcodeMetadata.getRowCount();
  }, r.prototype.getBarcodeECLevel = function() {
    return this.barcodeMetadata.getErrorCorrectionLevel();
  }, r.prototype.setBoundingBox = function(e) {
    this.boundingBox = e;
  }, r.prototype.getBoundingBox = function() {
    return this.boundingBox;
  }, r.prototype.setDetectionResultColumn = function(e, t) {
    this.detectionResultColumns[e] = t;
  }, r.prototype.getDetectionResultColumn = function(e) {
    return this.detectionResultColumns[e];
  }, r.prototype.toString = function() {
    var e = this.detectionResultColumns[0];
    e == null && (e = this.detectionResultColumns[this.barcodeColumnCount + 1]);
    for (var t = new os.default(), n = 0; n < e.getCodewords().length; n++) {
      t.format("CW %3d:", n);
      for (var a = 0; a < this.barcodeColumnCount + 2; a++) {
        if (this.detectionResultColumns[a] == null) {
          t.format("    |   ");
          continue;
        }
        var i = this.detectionResultColumns[a].getCodewords()[n];
        if (i == null) {
          t.format("    |   ");
          continue;
        }
        t.format(" %3d|%3d", i.getRowNumber(), i.getValue());
      }
      t.format("%n");
    }
    return t.toString();
  }, r;
}();
Ca.default = us;
var Sa = {};
Object.defineProperty(Sa, "__esModule", { value: !0 });
var fs = function() {
  function r(e, t, n, a) {
    this.rowNumber = r.BARCODE_ROW_UNKNOWN, this.startX = Math.trunc(e), this.endX = Math.trunc(t), this.bucket = Math.trunc(n), this.value = Math.trunc(a);
  }
  return r.prototype.hasValidRowNumber = function() {
    return this.isValidRowNumber(this.rowNumber);
  }, r.prototype.isValidRowNumber = function(e) {
    return e !== r.BARCODE_ROW_UNKNOWN && this.bucket === e % 3 * 3;
  }, r.prototype.setRowNumberAsRowIndicatorColumn = function() {
    this.rowNumber = Math.trunc(Math.trunc(this.value / 30) * 3 + Math.trunc(this.bucket / 3));
  }, r.prototype.getWidth = function() {
    return this.endX - this.startX;
  }, r.prototype.getStartX = function() {
    return this.startX;
  }, r.prototype.getEndX = function() {
    return this.endX;
  }, r.prototype.getBucket = function() {
    return this.bucket;
  }, r.prototype.getValue = function() {
    return this.value;
  }, r.prototype.getRowNumber = function() {
    return this.rowNumber;
  }, r.prototype.setRowNumber = function(e) {
    this.rowNumber = e;
  }, r.prototype.toString = function() {
    return this.rowNumber + "|" + this.value;
  }, r.BARCODE_ROW_UNKNOWN = -1, r;
}();
Sa.default = fs;
var ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
var go = ae, Z = Se, ls = Dr, cs = function() {
  function r() {
  }
  return r.initialize = function() {
    for (var e = 0; e < Z.default.SYMBOL_TABLE.length; e++)
      for (var t = Z.default.SYMBOL_TABLE[e], n = t & 1, a = 0; a < Z.default.BARS_IN_MODULE; a++) {
        for (var i = 0; (t & 1) === n; )
          i += 1, t >>= 1;
        n = t & 1, r.RATIOS_TABLE[e] || (r.RATIOS_TABLE[e] = new Array(Z.default.BARS_IN_MODULE)), r.RATIOS_TABLE[e][Z.default.BARS_IN_MODULE - a - 1] = Math.fround(i / Z.default.MODULES_IN_CODEWORD);
      }
    this.bSymbolTableReady = !0;
  }, r.getDecodedValue = function(e) {
    var t = r.getDecodedCodewordValue(r.sampleBitCounts(e));
    return t !== -1 ? t : r.getClosestDecodedValue(e);
  }, r.sampleBitCounts = function(e) {
    for (var t = go.default.sum(e), n = new Int32Array(Z.default.BARS_IN_MODULE), a = 0, i = 0, o = 0; o < Z.default.MODULES_IN_CODEWORD; o++) {
      var u = t / (2 * Z.default.MODULES_IN_CODEWORD) + o * t / Z.default.MODULES_IN_CODEWORD;
      i + e[a] <= u && (i += e[a], a++), n[a]++;
    }
    return n;
  }, r.getDecodedCodewordValue = function(e) {
    var t = r.getBitValue(e);
    return Z.default.getCodeword(t) === -1 ? -1 : t;
  }, r.getBitValue = function(e) {
    for (var t = 0, n = 0; n < e.length; n++)
      for (var a = 0; a < e[n]; a++)
        t = t << 1 | (n % 2 === 0 ? 1 : 0);
    return Math.trunc(t);
  }, r.getClosestDecodedValue = function(e) {
    var t = go.default.sum(e), n = new Array(Z.default.BARS_IN_MODULE);
    if (t > 1)
      for (var a = 0; a < n.length; a++)
        n[a] = Math.fround(e[a] / t);
    var i = ls.default.MAX_VALUE, o = -1;
    this.bSymbolTableReady || r.initialize();
    for (var u = 0; u < r.RATIOS_TABLE.length; u++) {
      for (var f = 0, l = r.RATIOS_TABLE[u], c = 0; c < Z.default.BARS_IN_MODULE; c++) {
        var d = Math.fround(l[c] - n[c]);
        if (f += Math.fround(d * d), f >= i)
          break;
      }
      f < i && (i = f, o = Z.default.SYMBOL_TABLE[u]);
    }
    return o;
  }, r.bSymbolTableReady = !1, r.RATIOS_TABLE = new Array(Z.default.SYMBOL_TABLE.length).map(function(e) {
    return new Array(Z.default.BARS_IN_MODULE);
  }), r;
}();
ma.default = cs;
var Ia = {}, Oa = {};
Object.defineProperty(Oa, "__esModule", { value: !0 });
var ds = function() {
  function r() {
    this.segmentCount = -1, this.fileSize = -1, this.timestamp = -1, this.checksum = -1;
  }
  return r.prototype.getSegmentIndex = function() {
    return this.segmentIndex;
  }, r.prototype.setSegmentIndex = function(e) {
    this.segmentIndex = e;
  }, r.prototype.getFileId = function() {
    return this.fileId;
  }, r.prototype.setFileId = function(e) {
    this.fileId = e;
  }, r.prototype.getOptionalData = function() {
    return this.optionalData;
  }, r.prototype.setOptionalData = function(e) {
    this.optionalData = e;
  }, r.prototype.isLastSegment = function() {
    return this.lastSegment;
  }, r.prototype.setLastSegment = function(e) {
    this.lastSegment = e;
  }, r.prototype.getSegmentCount = function() {
    return this.segmentCount;
  }, r.prototype.setSegmentCount = function(e) {
    this.segmentCount = e;
  }, r.prototype.getSender = function() {
    return this.sender || null;
  }, r.prototype.setSender = function(e) {
    this.sender = e;
  }, r.prototype.getAddressee = function() {
    return this.addressee || null;
  }, r.prototype.setAddressee = function(e) {
    this.addressee = e;
  }, r.prototype.getFileName = function() {
    return this.fileName;
  }, r.prototype.setFileName = function(e) {
    this.fileName = e;
  }, r.prototype.getFileSize = function() {
    return this.fileSize;
  }, r.prototype.setFileSize = function(e) {
    this.fileSize = e;
  }, r.prototype.getChecksum = function() {
    return this.checksum;
  }, r.prototype.setChecksum = function(e) {
    this.checksum = e;
  }, r.prototype.getTimestamp = function() {
    return this.timestamp;
  }, r.prototype.setTimestamp = function(e) {
    this.timestamp = e;
  }, r;
}();
Oa.default = ds;
var Ra = {};
Object.defineProperty(Ra, "__esModule", { value: !0 });
var ss = function() {
  function r() {
  }
  return r.parseLong = function(e, t) {
    return t === void 0 && (t = void 0), parseInt(e, t);
  }, r;
}();
Ra.default = ss;
var Da = {}, Ta = {}, Pa = {}, vs = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Pa, "__esModule", { value: !0 });
var hs = z, xs = function(r) {
  vs(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(hs.default);
Pa.default = xs;
Object.defineProperty(Ta, "__esModule", { value: !0 });
var ps = gt, _s = Pa, gs = function() {
  function r() {
  }
  return r.prototype.writeBytes = function(e) {
    this.writeBytesOffset(e, 0, e.length);
  }, r.prototype.writeBytesOffset = function(e, t, n) {
    if (e == null)
      throw new _s.default();
    if (t < 0 || t > e.length || n < 0 || t + n > e.length || t + n < 0)
      throw new ps.default();
    if (n === 0)
      return;
    for (var a = 0; a < n; a++)
      this.write(e[t + a]);
  }, r.prototype.flush = function() {
  }, r.prototype.close = function() {
  }, r;
}();
Ta.default = gs;
var ba = {}, ys = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(ba, "__esModule", { value: !0 });
var Es = z, As = function(r) {
  ys(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(Es.default);
ba.default = As;
var ws = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Da, "__esModule", { value: !0 });
var yo = we, Cs = Ta, Ss = ce, ms = N, Is = ba, Os = j, Rs = gt, Ds = function(r) {
  ws(e, r);
  function e(t) {
    t === void 0 && (t = 32);
    var n = r.call(this) || this;
    if (n.count = 0, t < 0)
      throw new ms.default("Negative initial size: " + t);
    return n.buf = new Uint8Array(t), n;
  }
  return e.prototype.ensureCapacity = function(t) {
    t - this.buf.length > 0 && this.grow(t);
  }, e.prototype.grow = function(t) {
    var n = this.buf.length, a = n << 1;
    if (a - t < 0 && (a = t), a < 0) {
      if (t < 0)
        throw new Is.default();
      a = Ss.default.MAX_VALUE;
    }
    this.buf = yo.default.copyOfUint8Array(this.buf, a);
  }, e.prototype.write = function(t) {
    this.ensureCapacity(this.count + 1), this.buf[this.count] = t, this.count += 1;
  }, e.prototype.writeBytesOffset = function(t, n, a) {
    if (n < 0 || n > t.length || a < 0 || n + a - t.length > 0)
      throw new Rs.default();
    this.ensureCapacity(this.count + a), Os.default.arraycopy(t, n, this.buf, this.count, a), this.count += a;
  }, e.prototype.writeTo = function(t) {
    t.writeBytesOffset(this.buf, 0, this.count);
  }, e.prototype.reset = function() {
    this.count = 0;
  }, e.prototype.toByteArray = function() {
    return yo.default.copyOfUint8Array(this.buf, this.count);
  }, e.prototype.size = function() {
    return this.count;
  }, e.prototype.toString = function(t) {
    return t ? typeof t == "string" ? this.toString_string(t) : this.toString_number(t) : this.toString_void();
  }, e.prototype.toString_void = function() {
    return new String(this.buf).toString();
  }, e.prototype.toString_string = function(t) {
    return new String(this.buf).toString();
  }, e.prototype.toString_number = function(t) {
    return new String(this.buf).toString();
  }, e.prototype.close = function() {
  }, e;
}(Cs.default);
Da.default = Ds;
Object.defineProperty(Ia, "__esModule", { value: !0 });
var be = F, Eo = Fe, Ts = ke, Ps = Oa, bs = we, ge = G, Cn = ce, Ao = Ra, Ns = Da, Ms = Le, B;
(function(r) {
  r[r.ALPHA = 0] = "ALPHA", r[r.LOWER = 1] = "LOWER", r[r.MIXED = 2] = "MIXED", r[r.PUNCT = 3] = "PUNCT", r[r.ALPHA_SHIFT = 4] = "ALPHA_SHIFT", r[r.PUNCT_SHIFT = 5] = "PUNCT_SHIFT";
})(B || (B = {}));
function Xo() {
  if (typeof window < "u")
    return window.BigInt || null;
  if (typeof E < "u")
    return E.BigInt || null;
  throw new Error("Can't search globals for BigInt!");
}
var cr;
function Pe(r) {
  if (typeof cr > "u" && (cr = Xo()), cr === null)
    throw new Error("BigInt is not supported!");
  return cr(r);
}
function Bs() {
  var r = [];
  r[0] = Pe(1);
  var e = Pe(900);
  r[1] = e;
  for (var t = 2; t < 16; t++)
    r[t] = r[t - 1] * e;
  return r;
}
var Fs = function() {
  function r() {
  }
  return r.decode = function(e, t) {
    var n = new ge.default(""), a = Eo.default.ISO8859_1;
    n.enableDecoding(a);
    for (var i = 1, o = e[i++], u = new Ps.default(); i < e[0]; ) {
      switch (o) {
        case r.TEXT_COMPACTION_MODE_LATCH:
          i = r.textCompaction(e, i, n);
          break;
        case r.BYTE_COMPACTION_MODE_LATCH:
        case r.BYTE_COMPACTION_MODE_LATCH_6:
          i = r.byteCompaction(o, e, a, i, n);
          break;
        case r.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
          n.append(e[i++]);
          break;
        case r.NUMERIC_COMPACTION_MODE_LATCH:
          i = r.numericCompaction(e, i, n);
          break;
        case r.ECI_CHARSET:
          Eo.default.getCharacterSetECIByValue(e[i++]);
          break;
        case r.ECI_GENERAL_PURPOSE:
          i += 2;
          break;
        case r.ECI_USER_DEFINED:
          i++;
          break;
        case r.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
          i = r.decodeMacroBlock(e, i, u);
          break;
        case r.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
        case r.MACRO_PDF417_TERMINATOR:
          throw new be.default();
        default:
          i--, i = r.textCompaction(e, i, n);
          break;
      }
      if (i < e.length)
        o = e[i++];
      else
        throw be.default.getFormatInstance();
    }
    if (n.length() === 0)
      throw be.default.getFormatInstance();
    var f = new Ts.default(null, n.toString(), null, t);
    return f.setOther(u), f;
  }, r.decodeMacroBlock = function(e, t, n) {
    if (t + r.NUMBER_OF_SEQUENCE_CODEWORDS > e[0])
      throw be.default.getFormatInstance();
    for (var a = new Int32Array(r.NUMBER_OF_SEQUENCE_CODEWORDS), i = 0; i < r.NUMBER_OF_SEQUENCE_CODEWORDS; i++, t++)
      a[i] = e[t];
    n.setSegmentIndex(Cn.default.parseInt(r.decodeBase900toBase10(a, r.NUMBER_OF_SEQUENCE_CODEWORDS)));
    var o = new ge.default();
    t = r.textCompaction(e, t, o), n.setFileId(o.toString());
    var u = -1;
    for (e[t] === r.BEGIN_MACRO_PDF417_OPTIONAL_FIELD && (u = t + 1); t < e[0]; )
      switch (e[t]) {
        case r.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
          switch (t++, e[t]) {
            case r.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME:
              var f = new ge.default();
              t = r.textCompaction(e, t + 1, f), n.setFileName(f.toString());
              break;
            case r.MACRO_PDF417_OPTIONAL_FIELD_SENDER:
              var l = new ge.default();
              t = r.textCompaction(e, t + 1, l), n.setSender(l.toString());
              break;
            case r.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE:
              var c = new ge.default();
              t = r.textCompaction(e, t + 1, c), n.setAddressee(c.toString());
              break;
            case r.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT:
              var d = new ge.default();
              t = r.numericCompaction(e, t + 1, d), n.setSegmentCount(Cn.default.parseInt(d.toString()));
              break;
            case r.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP:
              var s = new ge.default();
              t = r.numericCompaction(e, t + 1, s), n.setTimestamp(Ao.default.parseLong(s.toString()));
              break;
            case r.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM:
              var v = new ge.default();
              t = r.numericCompaction(e, t + 1, v), n.setChecksum(Cn.default.parseInt(v.toString()));
              break;
            case r.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE:
              var h = new ge.default();
              t = r.numericCompaction(e, t + 1, h), n.setFileSize(Ao.default.parseLong(h.toString()));
              break;
            default:
              throw be.default.getFormatInstance();
          }
          break;
        case r.MACRO_PDF417_TERMINATOR:
          t++, n.setLastSegment(!0);
          break;
        default:
          throw be.default.getFormatInstance();
      }
    if (u !== -1) {
      var x = t - u;
      n.isLastSegment() && x--, n.setOptionalData(bs.default.copyOfRange(e, u, u + x));
    }
    return t;
  }, r.textCompaction = function(e, t, n) {
    for (var a = new Int32Array((e[0] - t) * 2), i = new Int32Array((e[0] - t) * 2), o = 0, u = !1; t < e[0] && !u; ) {
      var f = e[t++];
      if (f < r.TEXT_COMPACTION_MODE_LATCH)
        a[o] = f / 30, a[o + 1] = f % 30, o += 2;
      else
        switch (f) {
          case r.TEXT_COMPACTION_MODE_LATCH:
            a[o++] = r.TEXT_COMPACTION_MODE_LATCH;
            break;
          case r.BYTE_COMPACTION_MODE_LATCH:
          case r.BYTE_COMPACTION_MODE_LATCH_6:
          case r.NUMERIC_COMPACTION_MODE_LATCH:
          case r.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
          case r.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
          case r.MACRO_PDF417_TERMINATOR:
            t--, u = !0;
            break;
          case r.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
            a[o] = r.MODE_SHIFT_TO_BYTE_COMPACTION_MODE, f = e[t++], i[o] = f, o++;
            break;
        }
    }
    return r.decodeTextCompaction(a, i, o, n), t;
  }, r.decodeTextCompaction = function(e, t, n, a) {
    for (var i = B.ALPHA, o = B.ALPHA, u = 0; u < n; ) {
      var f = e[u], l = "";
      switch (i) {
        case B.ALPHA:
          if (f < 26)
            l = String.fromCharCode(65 + f);
          else
            switch (f) {
              case 26:
                l = " ";
                break;
              case r.LL:
                i = B.LOWER;
                break;
              case r.ML:
                i = B.MIXED;
                break;
              case r.PS:
                o = i, i = B.PUNCT_SHIFT;
                break;
              case r.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                a.append(t[u]);
                break;
              case r.TEXT_COMPACTION_MODE_LATCH:
                i = B.ALPHA;
                break;
            }
          break;
        case B.LOWER:
          if (f < 26)
            l = String.fromCharCode(97 + f);
          else
            switch (f) {
              case 26:
                l = " ";
                break;
              case r.AS:
                o = i, i = B.ALPHA_SHIFT;
                break;
              case r.ML:
                i = B.MIXED;
                break;
              case r.PS:
                o = i, i = B.PUNCT_SHIFT;
                break;
              case r.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                a.append(t[u]);
                break;
              case r.TEXT_COMPACTION_MODE_LATCH:
                i = B.ALPHA;
                break;
            }
          break;
        case B.MIXED:
          if (f < r.PL)
            l = r.MIXED_CHARS[f];
          else
            switch (f) {
              case r.PL:
                i = B.PUNCT;
                break;
              case 26:
                l = " ";
                break;
              case r.LL:
                i = B.LOWER;
                break;
              case r.AL:
                i = B.ALPHA;
                break;
              case r.PS:
                o = i, i = B.PUNCT_SHIFT;
                break;
              case r.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                a.append(t[u]);
                break;
              case r.TEXT_COMPACTION_MODE_LATCH:
                i = B.ALPHA;
                break;
            }
          break;
        case B.PUNCT:
          if (f < r.PAL)
            l = r.PUNCT_CHARS[f];
          else
            switch (f) {
              case r.PAL:
                i = B.ALPHA;
                break;
              case r.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                a.append(t[u]);
                break;
              case r.TEXT_COMPACTION_MODE_LATCH:
                i = B.ALPHA;
                break;
            }
          break;
        case B.ALPHA_SHIFT:
          if (i = o, f < 26)
            l = String.fromCharCode(65 + f);
          else
            switch (f) {
              case 26:
                l = " ";
                break;
              case r.TEXT_COMPACTION_MODE_LATCH:
                i = B.ALPHA;
                break;
            }
          break;
        case B.PUNCT_SHIFT:
          if (i = o, f < r.PAL)
            l = r.PUNCT_CHARS[f];
          else
            switch (f) {
              case r.PAL:
                i = B.ALPHA;
                break;
              case r.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                a.append(t[u]);
                break;
              case r.TEXT_COMPACTION_MODE_LATCH:
                i = B.ALPHA;
                break;
            }
          break;
      }
      l !== "" && a.append(l), u++;
    }
  }, r.byteCompaction = function(e, t, n, a, i) {
    var o = new Ns.default(), u = 0, f = 0, l = !1;
    switch (e) {
      case r.BYTE_COMPACTION_MODE_LATCH:
        for (var c = new Int32Array(6), d = t[a++]; a < t[0] && !l; )
          switch (c[u++] = d, f = 900 * f + d, d = t[a++], d) {
            case r.TEXT_COMPACTION_MODE_LATCH:
            case r.BYTE_COMPACTION_MODE_LATCH:
            case r.NUMERIC_COMPACTION_MODE_LATCH:
            case r.BYTE_COMPACTION_MODE_LATCH_6:
            case r.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
            case r.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
            case r.MACRO_PDF417_TERMINATOR:
              a--, l = !0;
              break;
            default:
              if (u % 5 === 0 && u > 0) {
                for (var s = 0; s < 6; ++s)
                  o.write(Number(Pe(f) >> Pe(8 * (5 - s))));
                f = 0, u = 0;
              }
              break;
          }
        a === t[0] && d < r.TEXT_COMPACTION_MODE_LATCH && (c[u++] = d);
        for (var v = 0; v < u; v++)
          o.write(c[v]);
        break;
      case r.BYTE_COMPACTION_MODE_LATCH_6:
        for (; a < t[0] && !l; ) {
          var h = t[a++];
          if (h < r.TEXT_COMPACTION_MODE_LATCH)
            u++, f = 900 * f + h;
          else
            switch (h) {
              case r.TEXT_COMPACTION_MODE_LATCH:
              case r.BYTE_COMPACTION_MODE_LATCH:
              case r.NUMERIC_COMPACTION_MODE_LATCH:
              case r.BYTE_COMPACTION_MODE_LATCH_6:
              case r.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
              case r.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
              case r.MACRO_PDF417_TERMINATOR:
                a--, l = !0;
                break;
            }
          if (u % 5 === 0 && u > 0) {
            for (var s = 0; s < 6; ++s)
              o.write(Number(Pe(f) >> Pe(8 * (5 - s))));
            f = 0, u = 0;
          }
        }
        break;
    }
    return i.append(Ms.default.decode(o.toByteArray(), n)), a;
  }, r.numericCompaction = function(e, t, n) {
    for (var a = 0, i = !1, o = new Int32Array(r.MAX_NUMERIC_CODEWORDS); t < e[0] && !i; ) {
      var u = e[t++];
      if (t === e[0] && (i = !0), u < r.TEXT_COMPACTION_MODE_LATCH)
        o[a] = u, a++;
      else
        switch (u) {
          case r.TEXT_COMPACTION_MODE_LATCH:
          case r.BYTE_COMPACTION_MODE_LATCH:
          case r.BYTE_COMPACTION_MODE_LATCH_6:
          case r.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
          case r.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
          case r.MACRO_PDF417_TERMINATOR:
            t--, i = !0;
            break;
        }
      (a % r.MAX_NUMERIC_CODEWORDS === 0 || u === r.NUMERIC_COMPACTION_MODE_LATCH || i) && a > 0 && (n.append(r.decodeBase900toBase10(o, a)), a = 0);
    }
    return t;
  }, r.decodeBase900toBase10 = function(e, t) {
    for (var n = Pe(0), a = 0; a < t; a++)
      n += r.EXP900[t - a - 1] * Pe(e[a]);
    var i = n.toString();
    if (i.charAt(0) !== "1")
      throw new be.default();
    return i.substring(1);
  }, r.TEXT_COMPACTION_MODE_LATCH = 900, r.BYTE_COMPACTION_MODE_LATCH = 901, r.NUMERIC_COMPACTION_MODE_LATCH = 902, r.BYTE_COMPACTION_MODE_LATCH_6 = 924, r.ECI_USER_DEFINED = 925, r.ECI_GENERAL_PURPOSE = 926, r.ECI_CHARSET = 927, r.BEGIN_MACRO_PDF417_CONTROL_BLOCK = 928, r.BEGIN_MACRO_PDF417_OPTIONAL_FIELD = 923, r.MACRO_PDF417_TERMINATOR = 922, r.MODE_SHIFT_TO_BYTE_COMPACTION_MODE = 913, r.MAX_NUMERIC_CODEWORDS = 15, r.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME = 0, r.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT = 1, r.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP = 2, r.MACRO_PDF417_OPTIONAL_FIELD_SENDER = 3, r.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE = 4, r.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE = 5, r.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM = 6, r.PL = 25, r.LL = 27, r.AS = 27, r.ML = 28, r.AL = 28, r.PS = 29, r.PAL = 29, r.PUNCT_CHARS = `;<>@[\\]_\`~!\r	,:
-.$/"|*()?{}'`, r.MIXED_CHARS = "0123456789&\r	,:#-.$/+%*=^", r.EXP900 = Xo() ? Bs() : [], r.NUMBER_OF_SEQUENCE_CODEWORDS = 2, r;
}();
Ia.default = Fs;
var vt = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(_a, "__esModule", { value: !0 });
var ht = ue, dr = F, wo = T, Ls = ae, sr = Se, $s = ga, Co = Wr, So = Aa, ks = Ca, Us = Xr, Gs = Sa, Hs = zr, Vs = ma, js = Ia, Ws = Pt, Xs = function() {
  function r() {
  }
  return r.decode = function(e, t, n, a, i, o, u) {
    for (var f = new Co.default(e, t, n, a, i), l = null, c = null, d, s = !0; ; s = !1) {
      if (t != null && (l = r.getRowIndicatorColumn(e, f, t, !0, o, u)), a != null && (c = r.getRowIndicatorColumn(e, f, a, !1, o, u)), d = r.merge(l, c), d == null)
        throw wo.default.getNotFoundInstance();
      var v = d.getBoundingBox();
      if (s && v != null && (v.getMinY() < f.getMinY() || v.getMaxY() > f.getMaxY()))
        f = v;
      else
        break;
    }
    d.setBoundingBox(f);
    var h = d.getBarcodeColumnCount() + 1;
    d.setDetectionResultColumn(0, l), d.setDetectionResultColumn(h, c);
    for (var x = l != null, _ = 1; _ <= h; _++) {
      var g = x ? _ : h - _;
      if (d.getDetectionResultColumn(g) === void 0) {
        var y = void 0;
        g === 0 || g === h ? y = new So.default(f, g === 0) : y = new Us.default(f), d.setDetectionResultColumn(g, y);
        for (var A = -1, w = A, S = f.getMinY(); S <= f.getMaxY(); S++) {
          if (A = r.getStartColumn(d, g, S, x), A < 0 || A > f.getMaxX()) {
            if (w === -1)
              continue;
            A = w;
          }
          var m = r.detectCodeword(e, f.getMinX(), f.getMaxX(), x, A, S, o, u);
          m != null && (y.setCodeword(S, m), w = A, o = Math.min(o, m.getWidth()), u = Math.max(u, m.getWidth()));
        }
      }
    }
    return r.createDecoderResult(d);
  }, r.merge = function(e, t) {
    if (e == null && t == null)
      return null;
    var n = r.getBarcodeMetadata(e, t);
    if (n == null)
      return null;
    var a = Co.default.merge(r.adjustBoundingBox(e), r.adjustBoundingBox(t));
    return new ks.default(n, a);
  }, r.adjustBoundingBox = function(e) {
    var t, n;
    if (e == null)
      return null;
    var a = e.getRowHeights();
    if (a == null)
      return null;
    var i = r.getMax(a), o = 0;
    try {
      for (var u = vt(a), f = u.next(); !f.done; f = u.next()) {
        var l = f.value;
        if (o += i - l, l > 0)
          break;
      }
    } catch (v) {
      t = { error: v };
    } finally {
      try {
        f && !f.done && (n = u.return) && n.call(u);
      } finally {
        if (t)
          throw t.error;
      }
    }
    for (var c = e.getCodewords(), d = 0; o > 0 && c[d] == null; d++)
      o--;
    for (var s = 0, d = a.length - 1; d >= 0 && (s += i - a[d], !(a[d] > 0)); d--)
      ;
    for (var d = c.length - 1; s > 0 && c[d] == null; d--)
      s--;
    return e.getBoundingBox().addMissingRows(o, s, e.isLeft());
  }, r.getMax = function(e) {
    var t, n, a = -1;
    try {
      for (var i = vt(e), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        a = Math.max(a, u);
      }
    } catch (f) {
      t = { error: f };
    } finally {
      try {
        o && !o.done && (n = i.return) && n.call(i);
      } finally {
        if (t)
          throw t.error;
      }
    }
    return a;
  }, r.getBarcodeMetadata = function(e, t) {
    var n;
    if (e == null || (n = e.getBarcodeMetadata()) == null)
      return t == null ? null : t.getBarcodeMetadata();
    var a;
    return t == null || (a = t.getBarcodeMetadata()) == null ? n : n.getColumnCount() !== a.getColumnCount() && n.getErrorCorrectionLevel() !== a.getErrorCorrectionLevel() && n.getRowCount() !== a.getRowCount() ? null : n;
  }, r.getRowIndicatorColumn = function(e, t, n, a, i, o) {
    for (var u = new So.default(t, a), f = 0; f < 2; f++)
      for (var l = f === 0 ? 1 : -1, c = Math.trunc(Math.trunc(n.getX())), d = Math.trunc(Math.trunc(n.getY())); d <= t.getMaxY() && d >= t.getMinY(); d += l) {
        var s = r.detectCodeword(e, 0, e.getWidth(), a, c, d, i, o);
        s != null && (u.setCodeword(d, s), a ? c = s.getStartX() : c = s.getEndX());
      }
    return u;
  }, r.adjustCodewordCount = function(e, t) {
    var n = t[0][1], a = n.getValue(), i = e.getBarcodeColumnCount() * e.getBarcodeRowCount() - r.getNumberOfECCodeWords(e.getBarcodeECLevel());
    if (a.length === 0) {
      if (i < 1 || i > sr.default.MAX_CODEWORDS_IN_BARCODE)
        throw wo.default.getNotFoundInstance();
      n.setValue(i);
    } else
      a[0] !== i && n.setValue(i);
  }, r.createDecoderResult = function(e) {
    var t = r.createBarcodeMatrix(e);
    r.adjustCodewordCount(e, t);
    for (var n = new Array(), a = new Int32Array(e.getBarcodeRowCount() * e.getBarcodeColumnCount()), i = [], o = new Array(), u = 0; u < e.getBarcodeRowCount(); u++)
      for (var f = 0; f < e.getBarcodeColumnCount(); f++) {
        var l = t[u][f + 1].getValue(), c = u * e.getBarcodeColumnCount() + f;
        l.length === 0 ? n.push(c) : l.length === 1 ? a[c] = l[0] : (o.push(c), i.push(l));
      }
    for (var d = new Array(i.length), s = 0; s < d.length; s++)
      d[s] = i[s];
    return r.createDecoderResultFromAmbiguousValues(e.getBarcodeECLevel(), a, sr.default.toIntArray(n), sr.default.toIntArray(o), d);
  }, r.createDecoderResultFromAmbiguousValues = function(e, t, n, a, i) {
    for (var o = new Int32Array(a.length), u = 100; u-- > 0; ) {
      for (var f = 0; f < o.length; f++)
        t[a[f]] = i[f][o[f]];
      try {
        return r.decodeCodewords(t, e, n);
      } catch (c) {
        var l = c instanceof ht.default;
        if (!l)
          throw c;
      }
      if (o.length === 0)
        throw ht.default.getChecksumInstance();
      for (var f = 0; f < o.length; f++)
        if (o[f] < i[f].length - 1) {
          o[f]++;
          break;
        } else if (o[f] = 0, f === o.length - 1)
          throw ht.default.getChecksumInstance();
    }
    throw ht.default.getChecksumInstance();
  }, r.createBarcodeMatrix = function(e) {
    for (var t, n, a, i, o = Array.from({ length: e.getBarcodeRowCount() }, function() {
      return new Array(e.getBarcodeColumnCount() + 2);
    }), u = 0; u < o.length; u++)
      for (var f = 0; f < o[u].length; f++)
        o[u][f] = new Hs.default();
    var l = 0;
    try {
      for (var c = vt(e.getDetectionResultColumns()), d = c.next(); !d.done; d = c.next()) {
        var s = d.value;
        if (s != null)
          try {
            for (var v = vt(s.getCodewords()), h = v.next(); !h.done; h = v.next()) {
              var x = h.value;
              if (x != null) {
                var _ = x.getRowNumber();
                if (_ >= 0) {
                  if (_ >= o.length)
                    continue;
                  o[_][l].setValue(x.getValue());
                }
              }
            }
          } catch (g) {
            a = { error: g };
          } finally {
            try {
              h && !h.done && (i = v.return) && i.call(v);
            } finally {
              if (a)
                throw a.error;
            }
          }
        l++;
      }
    } catch (g) {
      t = { error: g };
    } finally {
      try {
        d && !d.done && (n = c.return) && n.call(c);
      } finally {
        if (t)
          throw t.error;
      }
    }
    return o;
  }, r.isValidBarcodeColumn = function(e, t) {
    return t >= 0 && t <= e.getBarcodeColumnCount() + 1;
  }, r.getStartColumn = function(e, t, n, a) {
    var i, o, u = a ? 1 : -1, f = null;
    if (r.isValidBarcodeColumn(e, t - u) && (f = e.getDetectionResultColumn(t - u).getCodeword(n)), f != null)
      return a ? f.getEndX() : f.getStartX();
    if (f = e.getDetectionResultColumn(t).getCodewordNearby(n), f != null)
      return a ? f.getStartX() : f.getEndX();
    if (r.isValidBarcodeColumn(e, t - u) && (f = e.getDetectionResultColumn(t - u).getCodewordNearby(n)), f != null)
      return a ? f.getEndX() : f.getStartX();
    for (var l = 0; r.isValidBarcodeColumn(e, t - u); ) {
      t -= u;
      try {
        for (var c = vt(e.getDetectionResultColumn(t).getCodewords()), d = c.next(); !d.done; d = c.next()) {
          var s = d.value;
          if (s != null)
            return (a ? s.getEndX() : s.getStartX()) + u * l * (s.getEndX() - s.getStartX());
        }
      } catch (v) {
        i = { error: v };
      } finally {
        try {
          d && !d.done && (o = c.return) && o.call(c);
        } finally {
          if (i)
            throw i.error;
        }
      }
      l++;
    }
    return a ? e.getBoundingBox().getMinX() : e.getBoundingBox().getMaxX();
  }, r.detectCodeword = function(e, t, n, a, i, o, u, f) {
    i = r.adjustCodewordStartColumn(e, t, n, a, i, o);
    var l = r.getModuleBitCount(e, t, n, a, i, o);
    if (l == null)
      return null;
    var c, d = Ls.default.sum(l);
    if (a)
      c = i + d;
    else {
      for (var s = 0; s < l.length / 2; s++) {
        var v = l[s];
        l[s] = l[l.length - 1 - s], l[l.length - 1 - s] = v;
      }
      c = i, i = c - d;
    }
    if (!r.checkCodewordSkew(d, u, f))
      return null;
    var h = Vs.default.getDecodedValue(l), x = sr.default.getCodeword(h);
    return x === -1 ? null : new Gs.default(i, c, r.getCodewordBucketNumber(h), x);
  }, r.getModuleBitCount = function(e, t, n, a, i, o) {
    for (var u = i, f = new Int32Array(8), l = 0, c = a ? 1 : -1, d = a; (a ? u < n : u >= t) && l < f.length; )
      e.get(u, o) === d ? (f[l]++, u += c) : (l++, d = !d);
    return l === f.length || u === (a ? n : t) && l === f.length - 1 ? f : null;
  }, r.getNumberOfECCodeWords = function(e) {
    return 2 << e;
  }, r.adjustCodewordStartColumn = function(e, t, n, a, i, o) {
    for (var u = i, f = a ? -1 : 1, l = 0; l < 2; l++) {
      for (; (a ? u >= t : u < n) && a === e.get(u, o); ) {
        if (Math.abs(i - u) > r.CODEWORD_SKEW_SIZE)
          return i;
        u += f;
      }
      f = -f, a = !a;
    }
    return u;
  }, r.checkCodewordSkew = function(e, t, n) {
    return t - r.CODEWORD_SKEW_SIZE <= e && e <= n + r.CODEWORD_SKEW_SIZE;
  }, r.decodeCodewords = function(e, t, n) {
    if (e.length === 0)
      throw dr.default.getFormatInstance();
    var a = 1 << t + 1, i = r.correctErrors(e, n, a);
    r.verifyCodewordCount(e, a);
    var o = js.default.decode(e, "" + t);
    return o.setErrorsCorrected(i), o.setErasures(n.length), o;
  }, r.correctErrors = function(e, t, n) {
    if (t != null && t.length > n / 2 + r.MAX_ERRORS || n < 0 || n > r.MAX_EC_CODEWORDS)
      throw ht.default.getChecksumInstance();
    return r.errorCorrection.decode(e, n, t);
  }, r.verifyCodewordCount = function(e, t) {
    if (e.length < 4)
      throw dr.default.getFormatInstance();
    var n = e[0];
    if (n > e.length)
      throw dr.default.getFormatInstance();
    if (n === 0)
      if (t < e.length)
        e[0] = e.length - t;
      else
        throw dr.default.getFormatInstance();
  }, r.getBitCountForCodeword = function(e) {
    for (var t = new Int32Array(8), n = 0, a = t.length - 1; !((e & 1) !== n && (n = e & 1, a--, a < 0)); )
      t[a]++, e >>= 1;
    return t;
  }, r.getCodewordBucketNumber = function(e) {
    return e instanceof Int32Array ? this.getCodewordBucketNumber_Int32Array(e) : this.getCodewordBucketNumber_number(e);
  }, r.getCodewordBucketNumber_number = function(e) {
    return r.getCodewordBucketNumber(r.getBitCountForCodeword(e));
  }, r.getCodewordBucketNumber_Int32Array = function(e) {
    return (e[0] - e[2] + e[4] - e[6] + 9) % 9;
  }, r.toString = function(e) {
    for (var t = new Ws.default(), n = 0; n < e.length; n++) {
      t.format("Row %2d: ", n);
      for (var a = 0; a < e[n].length; a++) {
        var i = e[n][a];
        i.getValue().length === 0 ? t.format("        ", null) : t.format("%4d(%2d)", i.getValue()[0], i.getConfidence(i.getValue()[0]));
      }
      t.format("%n");
    }
    return t.toString();
  }, r.CODEWORD_SKEW_SIZE = 2, r.MAX_ERRORS = 3, r.MAX_EC_CODEWORDS = 512, r.errorCorrection = new $s.default(), r;
}();
_a.default = Xs;
var zs = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Vr, "__esModule", { value: !0 });
var Ys = L, Zs = ue, Ks = F, mo = T, qs = J, Re = Se, Qs = ce, Io = de, Js = xa, ev = _a, tv = function() {
  function r() {
  }
  return r.prototype.decode = function(e, t) {
    t === void 0 && (t = null);
    var n = r.decode(e, t, !1);
    if (n == null || n.length === 0 || n[0] == null)
      throw mo.default.getNotFoundInstance();
    return n[0];
  }, r.prototype.decodeMultiple = function(e, t) {
    t === void 0 && (t = null);
    try {
      return r.decode(e, t, !0);
    } catch (n) {
      throw n instanceof Ks.default || n instanceof Zs.default ? mo.default.getNotFoundInstance() : n;
    }
  }, r.decode = function(e, t, n) {
    var a, i, o = new Array(), u = Js.default.detectMultiple(e, t, n);
    try {
      for (var f = zs(u.getPoints()), l = f.next(); !l.done; l = f.next()) {
        var c = l.value, d = ev.default.decode(u.getBits(), c[4], c[5], c[6], c[7], r.getMinCodewordWidth(c), r.getMaxCodewordWidth(c)), s = new qs.default(d.getText(), d.getRawBytes(), void 0, c, Ys.default.PDF_417);
        s.putMetadata(Io.default.ERROR_CORRECTION_LEVEL, d.getECLevel());
        var v = d.getOther();
        v != null && s.putMetadata(Io.default.PDF417_EXTRA_METADATA, v), o.push(s);
      }
    } catch (h) {
      a = { error: h };
    } finally {
      try {
        l && !l.done && (i = f.return) && i.call(f);
      } finally {
        if (a)
          throw a.error;
      }
    }
    return o.map(function(h) {
      return h;
    });
  }, r.getMaxWidth = function(e, t) {
    return e == null || t == null ? 0 : Math.trunc(Math.abs(e.getX() - t.getX()));
  }, r.getMinWidth = function(e, t) {
    return e == null || t == null ? Qs.default.MAX_VALUE : Math.trunc(Math.abs(e.getX() - t.getX()));
  }, r.getMaxCodewordWidth = function(e) {
    return Math.floor(Math.max(Math.max(r.getMaxWidth(e[0], e[4]), r.getMaxWidth(e[6], e[2]) * Re.default.MODULES_IN_CODEWORD / Re.default.MODULES_IN_STOP_PATTERN), Math.max(r.getMaxWidth(e[1], e[5]), r.getMaxWidth(e[7], e[3]) * Re.default.MODULES_IN_CODEWORD / Re.default.MODULES_IN_STOP_PATTERN)));
  }, r.getMinCodewordWidth = function(e) {
    return Math.floor(Math.min(Math.min(r.getMinWidth(e[0], e[4]), r.getMinWidth(e[6], e[2]) * Re.default.MODULES_IN_CODEWORD / Re.default.MODULES_IN_STOP_PATTERN), Math.min(r.getMinWidth(e[1], e[5]), r.getMinWidth(e[7], e[3]) * Re.default.MODULES_IN_CODEWORD / Re.default.MODULES_IN_STOP_PATTERN)));
  }, r.prototype.reset = function() {
  }, r;
}();
Vr.default = tv;
var Yr = {}, rv = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Yr, "__esModule", { value: !0 });
var nv = z, av = function(r) {
  rv(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(nv.default);
Yr.default = av;
var Oo;
function zo() {
  if (Oo)
    return rr;
  Oo = 1;
  var r = E && E.__values || function(d) {
    var s = typeof Symbol == "function" && d[Symbol.iterator], v = 0;
    return s ? s.call(d) : {
      next: function() {
        return d && v >= d.length && (d = void 0), { value: d && d[v++], done: !d };
      }
    };
  };
  Object.defineProperty(rr, "__esModule", { value: !0 });
  var e = Y, t = L, n = Rt, a = Hn(), i = Ct, o = mt, u = T, f = Vr, l = Yr, c = function() {
    function d() {
    }
    return d.prototype.decode = function(s, v) {
      return this.setHints(v), this.decodeInternal(s);
    }, d.prototype.decodeWithState = function(s) {
      return (this.readers === null || this.readers === void 0) && this.setHints(null), this.decodeInternal(s);
    }, d.prototype.setHints = function(s) {
      this.hints = s;
      var v = s != null && s.get(e.default.TRY_HARDER) !== void 0, h = s == null ? null : s.get(e.default.POSSIBLE_FORMATS), x = new Array();
      if (h != null) {
        var _ = h.some(function(g) {
          return g === t.default.UPC_A || g === t.default.UPC_E || g === t.default.EAN_13 || g === t.default.EAN_8 || g === t.default.CODABAR || g === t.default.CODE_39 || g === t.default.CODE_93 || g === t.default.CODE_128 || g === t.default.ITF || g === t.default.RSS_14 || g === t.default.RSS_EXPANDED;
        });
        _ && !v && x.push(new i.default(s)), h.includes(t.default.QR_CODE) && x.push(new n.default()), h.includes(t.default.DATA_MATRIX) && x.push(new o.default()), h.includes(t.default.AZTEC) && x.push(new a.default()), h.includes(t.default.PDF_417) && x.push(new f.default()), _ && v && x.push(new i.default(s));
      }
      x.length === 0 && (v || x.push(new i.default(s)), x.push(new n.default()), x.push(new o.default()), x.push(new a.default()), x.push(new f.default()), v && x.push(new i.default(s))), this.readers = x;
    }, d.prototype.reset = function() {
      var s, v;
      if (this.readers !== null)
        try {
          for (var h = r(this.readers), x = h.next(); !x.done; x = h.next()) {
            var _ = x.value;
            _.reset();
          }
        } catch (g) {
          s = { error: g };
        } finally {
          try {
            x && !x.done && (v = h.return) && v.call(h);
          } finally {
            if (s)
              throw s.error;
          }
        }
    }, d.prototype.decodeInternal = function(s) {
      var v, h;
      if (this.readers === null)
        throw new l.default("No readers where selected, nothing can be read.");
      try {
        for (var x = r(this.readers), _ = x.next(); !_.done; _ = x.next()) {
          var g = _.value;
          try {
            return g.decode(s, this.hints);
          } catch (y) {
            if (y instanceof l.default)
              continue;
          }
        }
      } catch (y) {
        v = { error: y };
      } finally {
        try {
          _ && !_.done && (h = x.return) && h.call(x);
        } finally {
          if (v)
            throw v.error;
        }
      }
      throw new u.default("No MultiFormat Readers were able to detect the code.");
    }, d;
  }();
  return rr.default = c, rr;
}
var Ro;
function iv() {
  if (Ro)
    return tr;
  Ro = 1;
  var r = E && E.__extends || function() {
    var a = function(i, o) {
      return a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, f) {
        u.__proto__ = f;
      } || function(u, f) {
        for (var l in f)
          f.hasOwnProperty(l) && (u[l] = f[l]);
      }, a(i, o);
    };
    return function(i, o) {
      a(i, o);
      function u() {
        this.constructor = i;
      }
      i.prototype = o === null ? Object.create(o) : (u.prototype = o.prototype, new u());
    };
  }();
  Object.defineProperty(tr, "__esModule", { value: !0 });
  var e = Ee, t = zo(), n = function(a) {
    r(i, a);
    function i(o, u) {
      o === void 0 && (o = null), u === void 0 && (u = 500);
      var f = this, l = new t.default();
      return l.setHints(o), f = a.call(this, l, u) || this, f;
    }
    return i.prototype.decodeBitmap = function(o) {
      return this.reader.decodeWithState(o);
    }, i;
  }(e.BrowserCodeReader);
  return tr.BrowserMultiFormatReader = n, tr;
}
var Na = {}, ov = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Na, "__esModule", { value: !0 });
var uv = Ee, fv = Vr, lv = function(r) {
  ov(e, r);
  function e(t) {
    return t === void 0 && (t = 500), r.call(this, new fv.default(), t) || this;
  }
  return e;
}(uv.BrowserCodeReader);
Na.BrowserPDF417Reader = lv;
var Ma = {}, cv = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Ma, "__esModule", { value: !0 });
var dv = Ee, sv = Rt, vv = function(r) {
  cv(e, r);
  function e(t) {
    return t === void 0 && (t = 500), r.call(this, new sv.default(), t) || this;
  }
  return e;
}(dv.BrowserCodeReader);
Ma.BrowserQRCodeReader = vv;
var Ba = {}, rt = {};
Object.defineProperty(rt, "__esModule", { value: !0 });
var Ln;
(function(r) {
  r[r.ERROR_CORRECTION = 0] = "ERROR_CORRECTION", r[r.CHARACTER_SET = 1] = "CHARACTER_SET", r[r.DATA_MATRIX_SHAPE = 2] = "DATA_MATRIX_SHAPE", r[r.MIN_SIZE = 3] = "MIN_SIZE", r[r.MAX_SIZE = 4] = "MAX_SIZE", r[r.MARGIN = 5] = "MARGIN", r[r.PDF417_COMPACT = 6] = "PDF417_COMPACT", r[r.PDF417_COMPACTION = 7] = "PDF417_COMPACTION", r[r.PDF417_DIMENSIONS = 8] = "PDF417_DIMENSIONS", r[r.AZTEC_LAYERS = 9] = "AZTEC_LAYERS", r[r.QR_VERSION = 10] = "QR_VERSION";
})(Ln || (Ln = {}));
rt.default = Ln;
var bt = {}, Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
var Sn = Qe, Do = j, To = N, hv = function() {
  function r(e) {
    this.field = e, this.cachedGenerators = [], this.cachedGenerators.push(new Sn.default(e, Int32Array.from([1])));
  }
  return r.prototype.buildGenerator = function(e) {
    var t = this.cachedGenerators;
    if (e >= t.length)
      for (var n = t[t.length - 1], a = this.field, i = t.length; i <= e; i++) {
        var o = n.multiply(new Sn.default(a, Int32Array.from([1, a.exp(i - 1 + a.getGeneratorBase())])));
        t.push(o), n = o;
      }
    return t[e];
  }, r.prototype.encode = function(e, t) {
    if (t === 0)
      throw new To.default("No error correction bytes");
    var n = e.length - t;
    if (n <= 0)
      throw new To.default("No data bytes provided");
    var a = this.buildGenerator(t), i = new Int32Array(n);
    Do.default.arraycopy(e, 0, i, 0, n);
    var o = new Sn.default(this.field, i);
    o = o.multiplyByMonomial(t, 1);
    for (var u = o.divide(a)[1], f = u.getCoefficients(), l = t - f.length, c = 0; c < l; c++)
      e[n + c] = 0;
    Do.default.arraycopy(f, 0, e, n + l, f.length);
  }, r;
}();
Zr.default = hv;
var Kr = {};
Object.defineProperty(Kr, "__esModule", { value: !0 });
var xv = N, pv = function() {
  function r() {
  }
  return r.applyMaskPenaltyRule1 = function(e) {
    return r.applyMaskPenaltyRule1Internal(e, !0) + r.applyMaskPenaltyRule1Internal(e, !1);
  }, r.applyMaskPenaltyRule2 = function(e) {
    for (var t = 0, n = e.getArray(), a = e.getWidth(), i = e.getHeight(), o = 0; o < i - 1; o++)
      for (var u = n[o], f = 0; f < a - 1; f++) {
        var l = u[f];
        l === u[f + 1] && l === n[o + 1][f] && l === n[o + 1][f + 1] && t++;
      }
    return r.N2 * t;
  }, r.applyMaskPenaltyRule3 = function(e) {
    for (var t = 0, n = e.getArray(), a = e.getWidth(), i = e.getHeight(), o = 0; o < i; o++)
      for (var u = 0; u < a; u++) {
        var f = n[o];
        u + 6 < a && f[u] === 1 && f[u + 1] === 0 && f[u + 2] === 1 && f[u + 3] === 1 && f[u + 4] === 1 && f[u + 5] === 0 && f[u + 6] === 1 && (r.isWhiteHorizontal(f, u - 4, u) || r.isWhiteHorizontal(f, u + 7, u + 11)) && t++, o + 6 < i && n[o][u] === 1 && n[o + 1][u] === 0 && n[o + 2][u] === 1 && n[o + 3][u] === 1 && n[o + 4][u] === 1 && n[o + 5][u] === 0 && n[o + 6][u] === 1 && (r.isWhiteVertical(n, u, o - 4, o) || r.isWhiteVertical(n, u, o + 7, o + 11)) && t++;
      }
    return t * r.N3;
  }, r.isWhiteHorizontal = function(e, t, n) {
    t = Math.max(t, 0), n = Math.min(n, e.length);
    for (var a = t; a < n; a++)
      if (e[a] === 1)
        return !1;
    return !0;
  }, r.isWhiteVertical = function(e, t, n, a) {
    n = Math.max(n, 0), a = Math.min(a, e.length);
    for (var i = n; i < a; i++)
      if (e[i][t] === 1)
        return !1;
    return !0;
  }, r.applyMaskPenaltyRule4 = function(e) {
    for (var t = 0, n = e.getArray(), a = e.getWidth(), i = e.getHeight(), o = 0; o < i; o++)
      for (var u = n[o], f = 0; f < a; f++)
        u[f] === 1 && t++;
    var l = e.getHeight() * e.getWidth(), c = Math.floor(Math.abs(t * 2 - l) * 10 / l);
    return c * r.N4;
  }, r.getDataMaskBit = function(e, t, n) {
    var a, i;
    switch (e) {
      case 0:
        a = n + t & 1;
        break;
      case 1:
        a = n & 1;
        break;
      case 2:
        a = t % 3;
        break;
      case 3:
        a = (n + t) % 3;
        break;
      case 4:
        a = Math.floor(n / 2) + Math.floor(t / 3) & 1;
        break;
      case 5:
        i = n * t, a = (i & 1) + i % 3;
        break;
      case 6:
        i = n * t, a = (i & 1) + i % 3 & 1;
        break;
      case 7:
        i = n * t, a = i % 3 + (n + t & 1) & 1;
        break;
      default:
        throw new xv.default("Invalid mask pattern: " + e);
    }
    return a === 0;
  }, r.applyMaskPenaltyRule1Internal = function(e, t) {
    for (var n = 0, a = t ? e.getHeight() : e.getWidth(), i = t ? e.getWidth() : e.getHeight(), o = e.getArray(), u = 0; u < a; u++) {
      for (var f = 0, l = -1, c = 0; c < i; c++) {
        var d = t ? o[u][c] : o[c][u];
        d === l ? f++ : (f >= 5 && (n += r.N1 + (f - 5)), f = 1, l = d);
      }
      f >= 5 && (n += r.N1 + (f - 5));
    }
    return n;
  }, r.N1 = 3, r.N2 = 3, r.N3 = 40, r.N4 = 10, r;
}();
Kr.default = pv;
var Fa = {}, _v = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Fa, "__esModule", { value: !0 });
var gv = we, yv = G, Ev = function() {
  function r(e, t) {
    this.width = e, this.height = t;
    for (var n = new Array(t), a = 0; a !== t; a++)
      n[a] = new Uint8Array(e);
    this.bytes = n;
  }
  return r.prototype.getHeight = function() {
    return this.height;
  }, r.prototype.getWidth = function() {
    return this.width;
  }, r.prototype.get = function(e, t) {
    return this.bytes[t][e];
  }, r.prototype.getArray = function() {
    return this.bytes;
  }, r.prototype.setNumber = function(e, t, n) {
    this.bytes[t][e] = n;
  }, r.prototype.setBoolean = function(e, t, n) {
    this.bytes[t][e] = n ? 1 : 0;
  }, r.prototype.clear = function(e) {
    var t, n;
    try {
      for (var a = _v(this.bytes), i = a.next(); !i.done; i = a.next()) {
        var o = i.value;
        gv.default.fill(o, e);
      }
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
  }, r.prototype.equals = function(e) {
    if (!(e instanceof r))
      return !1;
    var t = e;
    if (this.width !== t.width || this.height !== t.height)
      return !1;
    for (var n = 0, a = this.height; n < a; ++n)
      for (var i = this.bytes[n], o = t.bytes[n], u = 0, f = this.width; u < f; ++u)
        if (i[u] !== o[u])
          return !1;
    return !0;
  }, r.prototype.toString = function() {
    for (var e = new yv.default(), t = 0, n = this.height; t < n; ++t) {
      for (var a = this.bytes[t], i = 0, o = this.width; i < o; ++i)
        switch (a[i]) {
          case 0:
            e.append(" 0");
            break;
          case 1:
            e.append(" 1");
            break;
          default:
            e.append("  ");
            break;
        }
      e.append(`
`);
    }
    return e.toString();
  }, r;
}();
Fa.default = Ev;
var Nt = {};
Object.defineProperty(Nt, "__esModule", { value: !0 });
var Av = G, wv = function() {
  function r() {
    this.maskPattern = -1;
  }
  return r.prototype.getMode = function() {
    return this.mode;
  }, r.prototype.getECLevel = function() {
    return this.ecLevel;
  }, r.prototype.getVersion = function() {
    return this.version;
  }, r.prototype.getMaskPattern = function() {
    return this.maskPattern;
  }, r.prototype.getMatrix = function() {
    return this.matrix;
  }, r.prototype.toString = function() {
    var e = new Av.default();
    return e.append(`<<
`), e.append(" mode: "), e.append(this.mode ? this.mode.toString() : "null"), e.append(`
 ecLevel: `), e.append(this.ecLevel ? this.ecLevel.toString() : "null"), e.append(`
 version: `), e.append(this.version ? this.version.toString() : "null"), e.append(`
 maskPattern: `), e.append(this.maskPattern.toString()), this.matrix ? (e.append(`
 matrix:
`), e.append(this.matrix.toString())) : e.append(`
 matrix: null
`), e.append(`>>
`), e.toString();
  }, r.prototype.setMode = function(e) {
    this.mode = e;
  }, r.prototype.setECLevel = function(e) {
    this.ecLevel = e;
  }, r.prototype.setVersion = function(e) {
    this.version = e;
  }, r.prototype.setMaskPattern = function(e) {
    this.maskPattern = e;
  }, r.prototype.setMatrix = function(e) {
    this.matrix = e;
  }, r.isValidMaskPattern = function(e) {
    return e >= 0 && e < r.NUM_MASK_PATTERNS;
  }, r.NUM_MASK_PATTERNS = 8, r;
}();
Nt.default = wv;
var La = {}, Mt = {}, Cv = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Mt, "__esModule", { value: !0 });
var Sv = z, mv = function(r) {
  Cv(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(Sv.default);
Mt.default = mv;
Object.defineProperty(La, "__esModule", { value: !0 });
var mn = Ae, Iv = ce, Ov = Nt, Rv = Kr, Ne = Mt, Dv = N, Tv = function() {
  function r() {
  }
  return r.clearMatrix = function(e) {
    e.clear(255);
  }, r.buildMatrix = function(e, t, n, a, i) {
    r.clearMatrix(i), r.embedBasicPatterns(n, i), r.embedTypeInfo(t, a, i), r.maybeEmbedVersionInfo(n, i), r.embedDataBits(e, a, i);
  }, r.embedBasicPatterns = function(e, t) {
    r.embedPositionDetectionPatternsAndSeparators(t), r.embedDarkDotAtLeftBottomCorner(t), r.maybeEmbedPositionAdjustmentPatterns(e, t), r.embedTimingPatterns(t);
  }, r.embedTypeInfo = function(e, t, n) {
    var a = new mn.default();
    r.makeTypeInfoBits(e, t, a);
    for (var i = 0, o = a.getSize(); i < o; ++i) {
      var u = a.get(a.getSize() - 1 - i), f = r.TYPE_INFO_COORDINATES[i], l = f[0], c = f[1];
      if (n.setBoolean(l, c, u), i < 8) {
        var d = n.getWidth() - i - 1, s = 8;
        n.setBoolean(d, s, u);
      } else {
        var d = 8, s = n.getHeight() - 7 + (i - 8);
        n.setBoolean(d, s, u);
      }
    }
  }, r.maybeEmbedVersionInfo = function(e, t) {
    if (!(e.getVersionNumber() < 7)) {
      var n = new mn.default();
      r.makeVersionInfoBits(e, n);
      for (var a = 6 * 3 - 1, i = 0; i < 6; ++i)
        for (var o = 0; o < 3; ++o) {
          var u = n.get(a);
          a--, t.setBoolean(i, t.getHeight() - 11 + o, u), t.setBoolean(t.getHeight() - 11 + o, i, u);
        }
    }
  }, r.embedDataBits = function(e, t, n) {
    for (var a = 0, i = -1, o = n.getWidth() - 1, u = n.getHeight() - 1; o > 0; ) {
      for (o === 6 && (o -= 1); u >= 0 && u < n.getHeight(); ) {
        for (var f = 0; f < 2; ++f) {
          var l = o - f;
          if (!!r.isEmpty(n.get(l, u))) {
            var c = void 0;
            a < e.getSize() ? (c = e.get(a), ++a) : c = !1, t !== 255 && Rv.default.getDataMaskBit(t, l, u) && (c = !c), n.setBoolean(l, u, c);
          }
        }
        u += i;
      }
      i = -i, u += i, o -= 2;
    }
    if (a !== e.getSize())
      throw new Ne.default("Not all bits consumed: " + a + "/" + e.getSize());
  }, r.findMSBSet = function(e) {
    return 32 - Iv.default.numberOfLeadingZeros(e);
  }, r.calculateBCHCode = function(e, t) {
    if (t === 0)
      throw new Dv.default("0 polynomial");
    var n = r.findMSBSet(t);
    for (e <<= n - 1; r.findMSBSet(e) >= n; )
      e ^= t << r.findMSBSet(e) - n;
    return e;
  }, r.makeTypeInfoBits = function(e, t, n) {
    if (!Ov.default.isValidMaskPattern(t))
      throw new Ne.default("Invalid mask pattern");
    var a = e.getBits() << 3 | t;
    n.appendBits(a, 5);
    var i = r.calculateBCHCode(a, r.TYPE_INFO_POLY);
    n.appendBits(i, 10);
    var o = new mn.default();
    if (o.appendBits(r.TYPE_INFO_MASK_PATTERN, 15), n.xor(o), n.getSize() !== 15)
      throw new Ne.default("should not happen but we got: " + n.getSize());
  }, r.makeVersionInfoBits = function(e, t) {
    t.appendBits(e.getVersionNumber(), 6);
    var n = r.calculateBCHCode(e.getVersionNumber(), r.VERSION_INFO_POLY);
    if (t.appendBits(n, 12), t.getSize() !== 18)
      throw new Ne.default("should not happen but we got: " + t.getSize());
  }, r.isEmpty = function(e) {
    return e === 255;
  }, r.embedTimingPatterns = function(e) {
    for (var t = 8; t < e.getWidth() - 8; ++t) {
      var n = (t + 1) % 2;
      r.isEmpty(e.get(t, 6)) && e.setNumber(t, 6, n), r.isEmpty(e.get(6, t)) && e.setNumber(6, t, n);
    }
  }, r.embedDarkDotAtLeftBottomCorner = function(e) {
    if (e.get(8, e.getHeight() - 8) === 0)
      throw new Ne.default();
    e.setNumber(8, e.getHeight() - 8, 1);
  }, r.embedHorizontalSeparationPattern = function(e, t, n) {
    for (var a = 0; a < 8; ++a) {
      if (!r.isEmpty(n.get(e + a, t)))
        throw new Ne.default();
      n.setNumber(e + a, t, 0);
    }
  }, r.embedVerticalSeparationPattern = function(e, t, n) {
    for (var a = 0; a < 7; ++a) {
      if (!r.isEmpty(n.get(e, t + a)))
        throw new Ne.default();
      n.setNumber(e, t + a, 0);
    }
  }, r.embedPositionAdjustmentPattern = function(e, t, n) {
    for (var a = 0; a < 5; ++a)
      for (var i = r.POSITION_ADJUSTMENT_PATTERN[a], o = 0; o < 5; ++o)
        n.setNumber(e + o, t + a, i[o]);
  }, r.embedPositionDetectionPattern = function(e, t, n) {
    for (var a = 0; a < 7; ++a)
      for (var i = r.POSITION_DETECTION_PATTERN[a], o = 0; o < 7; ++o)
        n.setNumber(e + o, t + a, i[o]);
  }, r.embedPositionDetectionPatternsAndSeparators = function(e) {
    var t = r.POSITION_DETECTION_PATTERN[0].length;
    r.embedPositionDetectionPattern(0, 0, e), r.embedPositionDetectionPattern(e.getWidth() - t, 0, e), r.embedPositionDetectionPattern(0, e.getWidth() - t, e);
    var n = 8;
    r.embedHorizontalSeparationPattern(0, n - 1, e), r.embedHorizontalSeparationPattern(e.getWidth() - n, n - 1, e), r.embedHorizontalSeparationPattern(0, e.getWidth() - n, e);
    var a = 7;
    r.embedVerticalSeparationPattern(a, 0, e), r.embedVerticalSeparationPattern(e.getHeight() - a - 1, 0, e), r.embedVerticalSeparationPattern(a, e.getHeight() - a, e);
  }, r.maybeEmbedPositionAdjustmentPatterns = function(e, t) {
    if (!(e.getVersionNumber() < 2))
      for (var n = e.getVersionNumber() - 1, a = r.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE[n], i = 0, o = a.length; i !== o; i++) {
        var u = a[i];
        if (u >= 0)
          for (var f = 0; f !== o; f++) {
            var l = a[f];
            l >= 0 && r.isEmpty(t.get(l, u)) && r.embedPositionAdjustmentPattern(l - 2, u - 2, t);
          }
      }
  }, r.POSITION_DETECTION_PATTERN = Array.from([
    Int32Array.from([1, 1, 1, 1, 1, 1, 1]),
    Int32Array.from([1, 0, 0, 0, 0, 0, 1]),
    Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
    Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
    Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
    Int32Array.from([1, 0, 0, 0, 0, 0, 1]),
    Int32Array.from([1, 1, 1, 1, 1, 1, 1])
  ]), r.POSITION_ADJUSTMENT_PATTERN = Array.from([
    Int32Array.from([1, 1, 1, 1, 1]),
    Int32Array.from([1, 0, 0, 0, 1]),
    Int32Array.from([1, 0, 1, 0, 1]),
    Int32Array.from([1, 0, 0, 0, 1]),
    Int32Array.from([1, 1, 1, 1, 1])
  ]), r.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE = Array.from([
    Int32Array.from([-1, -1, -1, -1, -1, -1, -1]),
    Int32Array.from([6, 18, -1, -1, -1, -1, -1]),
    Int32Array.from([6, 22, -1, -1, -1, -1, -1]),
    Int32Array.from([6, 26, -1, -1, -1, -1, -1]),
    Int32Array.from([6, 30, -1, -1, -1, -1, -1]),
    Int32Array.from([6, 34, -1, -1, -1, -1, -1]),
    Int32Array.from([6, 22, 38, -1, -1, -1, -1]),
    Int32Array.from([6, 24, 42, -1, -1, -1, -1]),
    Int32Array.from([6, 26, 46, -1, -1, -1, -1]),
    Int32Array.from([6, 28, 50, -1, -1, -1, -1]),
    Int32Array.from([6, 30, 54, -1, -1, -1, -1]),
    Int32Array.from([6, 32, 58, -1, -1, -1, -1]),
    Int32Array.from([6, 34, 62, -1, -1, -1, -1]),
    Int32Array.from([6, 26, 46, 66, -1, -1, -1]),
    Int32Array.from([6, 26, 48, 70, -1, -1, -1]),
    Int32Array.from([6, 26, 50, 74, -1, -1, -1]),
    Int32Array.from([6, 30, 54, 78, -1, -1, -1]),
    Int32Array.from([6, 30, 56, 82, -1, -1, -1]),
    Int32Array.from([6, 30, 58, 86, -1, -1, -1]),
    Int32Array.from([6, 34, 62, 90, -1, -1, -1]),
    Int32Array.from([6, 28, 50, 72, 94, -1, -1]),
    Int32Array.from([6, 26, 50, 74, 98, -1, -1]),
    Int32Array.from([6, 30, 54, 78, 102, -1, -1]),
    Int32Array.from([6, 28, 54, 80, 106, -1, -1]),
    Int32Array.from([6, 32, 58, 84, 110, -1, -1]),
    Int32Array.from([6, 30, 58, 86, 114, -1, -1]),
    Int32Array.from([6, 34, 62, 90, 118, -1, -1]),
    Int32Array.from([6, 26, 50, 74, 98, 122, -1]),
    Int32Array.from([6, 30, 54, 78, 102, 126, -1]),
    Int32Array.from([6, 26, 52, 78, 104, 130, -1]),
    Int32Array.from([6, 30, 56, 82, 108, 134, -1]),
    Int32Array.from([6, 34, 60, 86, 112, 138, -1]),
    Int32Array.from([6, 30, 58, 86, 114, 142, -1]),
    Int32Array.from([6, 34, 62, 90, 118, 146, -1]),
    Int32Array.from([6, 30, 54, 78, 102, 126, 150]),
    Int32Array.from([6, 24, 50, 76, 102, 128, 154]),
    Int32Array.from([6, 28, 54, 80, 106, 132, 158]),
    Int32Array.from([6, 32, 58, 84, 110, 136, 162]),
    Int32Array.from([6, 26, 54, 82, 110, 138, 166]),
    Int32Array.from([6, 30, 58, 86, 114, 142, 170])
  ]), r.TYPE_INFO_COORDINATES = Array.from([
    Int32Array.from([8, 0]),
    Int32Array.from([8, 1]),
    Int32Array.from([8, 2]),
    Int32Array.from([8, 3]),
    Int32Array.from([8, 4]),
    Int32Array.from([8, 5]),
    Int32Array.from([8, 7]),
    Int32Array.from([8, 8]),
    Int32Array.from([7, 8]),
    Int32Array.from([5, 8]),
    Int32Array.from([4, 8]),
    Int32Array.from([3, 8]),
    Int32Array.from([2, 8]),
    Int32Array.from([1, 8]),
    Int32Array.from([0, 8])
  ]), r.VERSION_INFO_POLY = 7973, r.TYPE_INFO_POLY = 1335, r.TYPE_INFO_MASK_PATTERN = 21522, r;
}();
La.default = Tv;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
var Pv = function() {
  function r(e, t) {
    this.dataBytes = e, this.errorCorrectionBytes = t;
  }
  return r.prototype.getDataBytes = function() {
    return this.dataBytes;
  }, r.prototype.getErrorCorrectionBytes = function() {
    return this.errorCorrectionBytes;
  }, r;
}();
$a.default = Pv;
var Po = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(bt, "__esModule", { value: !0 });
var vr = rt, hr = Ae, xt = Fe, bv = Ce, Nv = Zr, oe = fa, In = Dt, xr = Kr, Mv = Fa, bo = Nt, No = La, On = Le, Bv = $a, V = Mt, Fv = function() {
  function r() {
  }
  return r.calculateMaskPenalty = function(e) {
    return xr.default.applyMaskPenaltyRule1(e) + xr.default.applyMaskPenaltyRule2(e) + xr.default.applyMaskPenaltyRule3(e) + xr.default.applyMaskPenaltyRule4(e);
  }, r.encode = function(e, t, n) {
    n === void 0 && (n = null);
    var a = r.DEFAULT_BYTE_MODE_ENCODING, i = n !== null && n.get(vr.default.CHARACTER_SET) !== void 0;
    i && (a = n.get(vr.default.CHARACTER_SET).toString());
    var o = this.chooseMode(e, a), u = new hr.default();
    if (o === oe.default.BYTE && (i || r.DEFAULT_BYTE_MODE_ENCODING !== a)) {
      var f = xt.default.getCharacterSetECIByName(a);
      f !== void 0 && this.appendECI(f, u);
    }
    this.appendModeInfo(o, u);
    var l = new hr.default();
    this.appendBytes(e, o, l, a);
    var c;
    if (n !== null && n.get(vr.default.QR_VERSION) !== void 0) {
      var d = Number.parseInt(n.get(vr.default.QR_VERSION).toString(), 10);
      c = In.default.getVersionForNumber(d);
      var s = this.calculateBitsNeeded(o, u, l, c);
      if (!this.willFit(s, c, t))
        throw new V.default("Data too big for requested version");
    } else
      c = this.recommendVersion(t, o, u, l);
    var v = new hr.default();
    v.appendBitArray(u);
    var h = o === oe.default.BYTE ? l.getSizeInBytes() : e.length;
    this.appendLengthInfo(h, c, o, v), v.appendBitArray(l);
    var x = c.getECBlocksForLevel(t), _ = c.getTotalCodewords() - x.getTotalECCodewords();
    this.terminateBits(_, v);
    var g = this.interleaveWithECBytes(v, c.getTotalCodewords(), _, x.getNumBlocks()), y = new bo.default();
    y.setECLevel(t), y.setMode(o), y.setVersion(c);
    var A = c.getDimensionForVersion(), w = new Mv.default(A, A), S = this.chooseMaskPattern(g, t, c, w);
    return y.setMaskPattern(S), No.default.buildMatrix(g, t, c, S, w), y.setMatrix(w), y;
  }, r.recommendVersion = function(e, t, n, a) {
    var i = this.calculateBitsNeeded(t, n, a, In.default.getVersionForNumber(1)), o = this.chooseVersion(i, e), u = this.calculateBitsNeeded(t, n, a, o);
    return this.chooseVersion(u, e);
  }, r.calculateBitsNeeded = function(e, t, n, a) {
    return t.getSize() + e.getCharacterCountBits(a) + n.getSize();
  }, r.getAlphanumericCode = function(e) {
    return e < r.ALPHANUMERIC_TABLE.length ? r.ALPHANUMERIC_TABLE[e] : -1;
  }, r.chooseMode = function(e, t) {
    if (t === void 0 && (t = null), xt.default.SJIS.getName() === t && this.isOnlyDoubleByteKanji(e))
      return oe.default.KANJI;
    for (var n = !1, a = !1, i = 0, o = e.length; i < o; ++i) {
      var u = e.charAt(i);
      if (r.isDigit(u))
        n = !0;
      else if (this.getAlphanumericCode(u.charCodeAt(0)) !== -1)
        a = !0;
      else
        return oe.default.BYTE;
    }
    return a ? oe.default.ALPHANUMERIC : n ? oe.default.NUMERIC : oe.default.BYTE;
  }, r.isOnlyDoubleByteKanji = function(e) {
    var t;
    try {
      t = On.default.encode(e, xt.default.SJIS);
    } catch {
      return !1;
    }
    var n = t.length;
    if (n % 2 !== 0)
      return !1;
    for (var a = 0; a < n; a += 2) {
      var i = t[a] & 255;
      if ((i < 129 || i > 159) && (i < 224 || i > 235))
        return !1;
    }
    return !0;
  }, r.chooseMaskPattern = function(e, t, n, a) {
    for (var i = Number.MAX_SAFE_INTEGER, o = -1, u = 0; u < bo.default.NUM_MASK_PATTERNS; u++) {
      No.default.buildMatrix(e, t, n, u, a);
      var f = this.calculateMaskPenalty(a);
      f < i && (i = f, o = u);
    }
    return o;
  }, r.chooseVersion = function(e, t) {
    for (var n = 1; n <= 40; n++) {
      var a = In.default.getVersionForNumber(n);
      if (r.willFit(e, a, t))
        return a;
    }
    throw new V.default("Data too big");
  }, r.willFit = function(e, t, n) {
    var a = t.getTotalCodewords(), i = t.getECBlocksForLevel(n), o = i.getTotalECCodewords(), u = a - o, f = (e + 7) / 8;
    return u >= f;
  }, r.terminateBits = function(e, t) {
    var n = e * 8;
    if (t.getSize() > n)
      throw new V.default("data bits cannot fit in the QR Code" + t.getSize() + " > " + n);
    for (var a = 0; a < 4 && t.getSize() < n; ++a)
      t.appendBit(!1);
    var i = t.getSize() & 7;
    if (i > 0)
      for (var a = i; a < 8; a++)
        t.appendBit(!1);
    for (var o = e - t.getSizeInBytes(), a = 0; a < o; ++a)
      t.appendBits((a & 1) === 0 ? 236 : 17, 8);
    if (t.getSize() !== n)
      throw new V.default("Bits size does not equal capacity");
  }, r.getNumDataBytesAndNumECBytesForBlockID = function(e, t, n, a, i, o) {
    if (a >= n)
      throw new V.default("Block ID too large");
    var u = e % n, f = n - u, l = Math.floor(e / n), c = l + 1, d = Math.floor(t / n), s = d + 1, v = l - d, h = c - s;
    if (v !== h)
      throw new V.default("EC bytes mismatch");
    if (n !== f + u)
      throw new V.default("RS blocks mismatch");
    if (e !== (d + v) * f + (s + h) * u)
      throw new V.default("Total bytes mismatch");
    a < f ? (i[0] = d, o[0] = v) : (i[0] = s, o[0] = h);
  }, r.interleaveWithECBytes = function(e, t, n, a) {
    var i, o, u, f;
    if (e.getSizeInBytes() !== n)
      throw new V.default("Number of bits and data bytes does not match");
    for (var l = 0, c = 0, d = 0, s = new Array(), v = 0; v < a; ++v) {
      var h = new Int32Array(1), x = new Int32Array(1);
      r.getNumDataBytesAndNumECBytesForBlockID(t, n, a, v, h, x);
      var _ = h[0], g = new Uint8Array(_);
      e.toBytes(8 * l, g, 0, _);
      var y = r.generateECBytes(g, x[0]);
      s.push(new Bv.default(g, y)), c = Math.max(c, _), d = Math.max(d, y.length), l += h[0];
    }
    if (n !== l)
      throw new V.default("Data bytes does not match offset");
    for (var A = new hr.default(), v = 0; v < c; ++v)
      try {
        for (var w = Po(s), S = w.next(); !S.done; S = w.next()) {
          var m = S.value, g = m.getDataBytes();
          v < g.length && A.appendBits(g[v], 8);
        }
      } catch (R) {
        i = { error: R };
      } finally {
        try {
          S && !S.done && (o = w.return) && o.call(w);
        } finally {
          if (i)
            throw i.error;
        }
      }
    for (var v = 0; v < d; ++v)
      try {
        for (var I = Po(s), O = I.next(); !O.done; O = I.next()) {
          var m = O.value, y = m.getErrorCorrectionBytes();
          v < y.length && A.appendBits(y[v], 8);
        }
      } catch (R) {
        u = { error: R };
      } finally {
        try {
          O && !O.done && (f = I.return) && f.call(I);
        } finally {
          if (u)
            throw u.error;
        }
      }
    if (t !== A.getSizeInBytes())
      throw new V.default("Interleaving error: " + t + " and " + A.getSizeInBytes() + " differ.");
    return A;
  }, r.generateECBytes = function(e, t) {
    for (var n = e.length, a = new Int32Array(n + t), i = 0; i < n; i++)
      a[i] = e[i] & 255;
    new Nv.default(bv.default.QR_CODE_FIELD_256).encode(a, t);
    for (var o = new Uint8Array(t), i = 0; i < t; i++)
      o[i] = a[n + i];
    return o;
  }, r.appendModeInfo = function(e, t) {
    t.appendBits(e.getBits(), 4);
  }, r.appendLengthInfo = function(e, t, n, a) {
    var i = n.getCharacterCountBits(t);
    if (e >= 1 << i)
      throw new V.default(e + " is bigger than " + ((1 << i) - 1));
    a.appendBits(e, i);
  }, r.appendBytes = function(e, t, n, a) {
    switch (t) {
      case oe.default.NUMERIC:
        r.appendNumericBytes(e, n);
        break;
      case oe.default.ALPHANUMERIC:
        r.appendAlphanumericBytes(e, n);
        break;
      case oe.default.BYTE:
        r.append8BitBytes(e, n, a);
        break;
      case oe.default.KANJI:
        r.appendKanjiBytes(e, n);
        break;
      default:
        throw new V.default("Invalid mode: " + t);
    }
  }, r.getDigit = function(e) {
    return e.charCodeAt(0) - 48;
  }, r.isDigit = function(e) {
    var t = r.getDigit(e);
    return t >= 0 && t <= 9;
  }, r.appendNumericBytes = function(e, t) {
    for (var n = e.length, a = 0; a < n; ) {
      var i = r.getDigit(e.charAt(a));
      if (a + 2 < n) {
        var o = r.getDigit(e.charAt(a + 1)), u = r.getDigit(e.charAt(a + 2));
        t.appendBits(i * 100 + o * 10 + u, 10), a += 3;
      } else if (a + 1 < n) {
        var o = r.getDigit(e.charAt(a + 1));
        t.appendBits(i * 10 + o, 7), a += 2;
      } else
        t.appendBits(i, 4), a++;
    }
  }, r.appendAlphanumericBytes = function(e, t) {
    for (var n = e.length, a = 0; a < n; ) {
      var i = r.getAlphanumericCode(e.charCodeAt(a));
      if (i === -1)
        throw new V.default();
      if (a + 1 < n) {
        var o = r.getAlphanumericCode(e.charCodeAt(a + 1));
        if (o === -1)
          throw new V.default();
        t.appendBits(i * 45 + o, 11), a += 2;
      } else
        t.appendBits(i, 6), a++;
    }
  }, r.append8BitBytes = function(e, t, n) {
    var a;
    try {
      a = On.default.encode(e, n);
    } catch (f) {
      throw new V.default(f);
    }
    for (var i = 0, o = a.length; i !== o; i++) {
      var u = a[i];
      t.appendBits(u, 8);
    }
  }, r.appendKanjiBytes = function(e, t) {
    var n;
    try {
      n = On.default.encode(e, xt.default.SJIS);
    } catch (d) {
      throw new V.default(d);
    }
    for (var a = n.length, i = 0; i < a; i += 2) {
      var o = n[i] & 255, u = n[i + 1] & 255, f = o << 8 & 4294967295 | u, l = -1;
      if (f >= 33088 && f <= 40956 ? l = f - 33088 : f >= 57408 && f <= 60351 && (l = f - 49472), l === -1)
        throw new V.default("Invalid byte sequence");
      var c = (l >> 8) * 192 + (l & 255);
      t.appendBits(c, 13);
    }
  }, r.appendECI = function(e, t) {
    t.appendBits(oe.default.ECI.getBits(), 4), t.appendBits(e.getValue(), 8);
  }, r.ALPHANUMERIC_TABLE = Int32Array.from([
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    36,
    -1,
    -1,
    -1,
    37,
    38,
    -1,
    -1,
    -1,
    -1,
    39,
    40,
    -1,
    41,
    42,
    43,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    44,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    -1,
    -1,
    -1,
    -1,
    -1
  ]), r.DEFAULT_BYTE_MODE_ENCODING = xt.default.UTF8.getName(), r;
}();
bt.default = Fv;
Object.defineProperty(Ba, "__esModule", { value: !0 });
var pr = rt, Lv = bt, Mo = Tt, Bo = N, $v = xe, kv = function() {
  function r() {
  }
  return r.prototype.write = function(e, t, n, a) {
    if (a === void 0 && (a = null), e.length === 0)
      throw new Bo.default("Found empty contents");
    if (t < 0 || n < 0)
      throw new Bo.default("Requested dimensions are too small: " + t + "x" + n);
    var i = Mo.default.L, o = r.QUIET_ZONE_SIZE;
    a !== null && (a.get(pr.default.ERROR_CORRECTION) !== void 0 && (i = Mo.default.fromString(a.get(pr.default.ERROR_CORRECTION).toString())), a.get(pr.default.MARGIN) !== void 0 && (o = Number.parseInt(a.get(pr.default.MARGIN).toString(), 10)));
    var u = Lv.default.encode(e, i, a);
    return this.renderResult(u, t, n, o);
  }, r.prototype.writeToDom = function(e, t, n, a, i) {
    i === void 0 && (i = null), typeof e == "string" && (e = document.querySelector(e));
    var o = this.write(t, n, a, i);
    e && e.appendChild(o);
  }, r.prototype.renderResult = function(e, t, n, a) {
    var i = e.getMatrix();
    if (i === null)
      throw new $v.default();
    for (var o = i.getWidth(), u = i.getHeight(), f = o + a * 2, l = u + a * 2, c = Math.max(t, f), d = Math.max(n, l), s = Math.min(Math.floor(c / f), Math.floor(d / l)), v = Math.floor((c - o * s) / 2), h = Math.floor((d - u * s) / 2), x = this.createSVGElement(c, d), _ = 0, g = h; _ < u; _++, g += s)
      for (var y = 0, A = v; y < o; y++, A += s)
        if (i.get(y, _) === 1) {
          var w = this.createSvgRectElement(A, g, s, s);
          x.appendChild(w);
        }
    return x;
  }, r.prototype.createSVGElement = function(e, t) {
    var n = document.createElementNS(r.SVG_NS, "svg");
    return n.setAttributeNS(null, "height", e.toString()), n.setAttributeNS(null, "width", t.toString()), n;
  }, r.prototype.createSvgRectElement = function(e, t, n, a) {
    var i = document.createElementNS(r.SVG_NS, "rect");
    return i.setAttributeNS(null, "x", e.toString()), i.setAttributeNS(null, "y", t.toString()), i.setAttributeNS(null, "height", n.toString()), i.setAttributeNS(null, "width", a.toString()), i.setAttributeNS(null, "fill", "#000000"), i;
  }, r.QUIET_ZONE_SIZE = 4, r.SVG_NS = "http://www.w3.org/2000/svg", r;
}();
Ba.BrowserQRCodeSvgWriter = kv;
var Fo;
function Uv() {
  return Fo || (Fo = 1, function(r) {
    function e(t) {
      for (var n in t)
        r.hasOwnProperty(n) || (r[n] = t[n]);
    }
    Object.defineProperty(r, "__esModule", { value: !0 }), e(jf()), e(Vn), e(Ee), e(Kn), e(iv()), e(Na), e(Ma), e(Ba), e(Sr), e(mr);
  }(an)), an;
}
var ka = {}, qr = {};
Object.defineProperty(qr, "__esModule", { value: !0 });
var Gv = L, _r = rt, Hv = fe, Lo = Tt, Vv = bt, Rn = N, jv = xe, Wv = function() {
  function r() {
  }
  return r.prototype.encode = function(e, t, n, a, i) {
    if (e.length === 0)
      throw new Rn.default("Found empty contents");
    if (t !== Gv.default.QR_CODE)
      throw new Rn.default("Can only encode QR_CODE, but got " + t);
    if (n < 0 || a < 0)
      throw new Rn.default("Requested dimensions are too small: " + n + "x" + a);
    var o = Lo.default.L, u = r.QUIET_ZONE_SIZE;
    i !== null && (i.get(_r.default.ERROR_CORRECTION) !== void 0 && (o = Lo.default.fromString(i.get(_r.default.ERROR_CORRECTION).toString())), i.get(_r.default.MARGIN) !== void 0 && (u = Number.parseInt(i.get(_r.default.MARGIN).toString(), 10)));
    var f = Vv.default.encode(e, o, i);
    return r.renderResult(f, n, a, u);
  }, r.renderResult = function(e, t, n, a) {
    var i = e.getMatrix();
    if (i === null)
      throw new jv.default();
    for (var o = i.getWidth(), u = i.getHeight(), f = o + a * 2, l = u + a * 2, c = Math.max(t, f), d = Math.max(n, l), s = Math.min(Math.floor(c / f), Math.floor(d / l)), v = Math.floor((c - o * s) / 2), h = Math.floor((d - u * s) / 2), x = new Hv.default(c, d), _ = 0, g = h; _ < u; _++, g += s)
      for (var y = 0, A = v; y < o; y++, A += s)
        i.get(y, _) === 1 && x.setRegion(A, g, s, s);
    return x;
  }, r.QUIET_ZONE_SIZE = 4, r;
}();
qr.default = Wv;
Object.defineProperty(ka, "__esModule", { value: !0 });
var Xv = qr, zv = L, Yv = N, Zv = function() {
  function r() {
  }
  return r.prototype.encode = function(e, t, n, a, i) {
    var o;
    switch (t) {
      case zv.default.QR_CODE:
        o = new Xv.default();
        break;
      default:
        throw new Yv.default("No encoder available for format " + t);
    }
    return o.encode(e, t, n, a, i);
  }, r;
}();
ka.default = Zv;
var Ua = {}, Kv = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Ua, "__esModule", { value: !0 });
var Dn = j, qv = $e, Qv = qe, $o = N, Jv = function(r) {
  Kv(e, r);
  function e(t, n, a, i, o, u, f, l) {
    var c = r.call(this, u, f) || this;
    if (c.yuvData = t, c.dataWidth = n, c.dataHeight = a, c.left = i, c.top = o, i + u > n || o + f > a)
      throw new $o.default("Crop rectangle does not fit within image data.");
    return l && c.reverseHorizontal(u, f), c;
  }
  return e.prototype.getRow = function(t, n) {
    if (t < 0 || t >= this.getHeight())
      throw new $o.default("Requested row is outside the image: " + t);
    var a = this.getWidth();
    (n == null || n.length < a) && (n = new Uint8ClampedArray(a));
    var i = (t + this.top) * this.dataWidth + this.left;
    return Dn.default.arraycopy(this.yuvData, i, n, 0, a), n;
  }, e.prototype.getMatrix = function() {
    var t = this.getWidth(), n = this.getHeight();
    if (t === this.dataWidth && n === this.dataHeight)
      return this.yuvData;
    var a = t * n, i = new Uint8ClampedArray(a), o = this.top * this.dataWidth + this.left;
    if (t === this.dataWidth)
      return Dn.default.arraycopy(this.yuvData, o, i, 0, a), i;
    for (var u = 0; u < n; u++) {
      var f = u * t;
      Dn.default.arraycopy(this.yuvData, o, i, f, t), o += this.dataWidth;
    }
    return i;
  }, e.prototype.isCropSupported = function() {
    return !0;
  }, e.prototype.crop = function(t, n, a, i) {
    return new e(this.yuvData, this.dataWidth, this.dataHeight, this.left + t, this.top + n, a, i, !1);
  }, e.prototype.renderThumbnail = function() {
    for (var t = this.getWidth() / e.THUMBNAIL_SCALE_FACTOR, n = this.getHeight() / e.THUMBNAIL_SCALE_FACTOR, a = new Int32Array(t * n), i = this.yuvData, o = this.top * this.dataWidth + this.left, u = 0; u < n; u++) {
      for (var f = u * t, l = 0; l < t; l++) {
        var c = i[o + l * e.THUMBNAIL_SCALE_FACTOR] & 255;
        a[f + l] = 4278190080 | c * 65793;
      }
      o += this.dataWidth * e.THUMBNAIL_SCALE_FACTOR;
    }
    return a;
  }, e.prototype.getThumbnailWidth = function() {
    return this.getWidth() / e.THUMBNAIL_SCALE_FACTOR;
  }, e.prototype.getThumbnailHeight = function() {
    return this.getHeight() / e.THUMBNAIL_SCALE_FACTOR;
  }, e.prototype.reverseHorizontal = function(t, n) {
    for (var a = this.yuvData, i = 0, o = this.top * this.dataWidth + this.left; i < n; i++, o += this.dataWidth)
      for (var u = o + t / 2, f = o, l = o + t - 1; f < u; f++, l--) {
        var c = a[f];
        a[f] = a[l], a[l] = c;
      }
  }, e.prototype.invert = function() {
    return new Qv.default(this);
  }, e.THUMBNAIL_SCALE_FACTOR = 2, e;
}(qv.default);
Ua.default = Jv;
var Ga = {}, eh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Ga, "__esModule", { value: !0 });
var th = qe, rh = $e, Tn = j, ko = N, nh = function(r) {
  eh(e, r);
  function e(t, n, a, i, o, u, f) {
    var l = r.call(this, n, a) || this;
    if (l.dataWidth = i, l.dataHeight = o, l.left = u, l.top = f, t.BYTES_PER_ELEMENT === 4) {
      for (var c = n * a, d = new Uint8ClampedArray(c), s = 0; s < c; s++) {
        var v = t[s], h = v >> 16 & 255, x = v >> 7 & 510, _ = v & 255;
        d[s] = (h + x + _) / 4 & 255;
      }
      l.luminances = d;
    } else
      l.luminances = t;
    if (i === void 0 && (l.dataWidth = n), o === void 0 && (l.dataHeight = a), u === void 0 && (l.left = 0), f === void 0 && (l.top = 0), l.left + n > l.dataWidth || l.top + a > l.dataHeight)
      throw new ko.default("Crop rectangle does not fit within image data.");
    return l;
  }
  return e.prototype.getRow = function(t, n) {
    if (t < 0 || t >= this.getHeight())
      throw new ko.default("Requested row is outside the image: " + t);
    var a = this.getWidth();
    (n == null || n.length < a) && (n = new Uint8ClampedArray(a));
    var i = (t + this.top) * this.dataWidth + this.left;
    return Tn.default.arraycopy(this.luminances, i, n, 0, a), n;
  }, e.prototype.getMatrix = function() {
    var t = this.getWidth(), n = this.getHeight();
    if (t === this.dataWidth && n === this.dataHeight)
      return this.luminances;
    var a = t * n, i = new Uint8ClampedArray(a), o = this.top * this.dataWidth + this.left;
    if (t === this.dataWidth)
      return Tn.default.arraycopy(this.luminances, o, i, 0, a), i;
    for (var u = 0; u < n; u++) {
      var f = u * t;
      Tn.default.arraycopy(this.luminances, o, i, f, t), o += this.dataWidth;
    }
    return i;
  }, e.prototype.isCropSupported = function() {
    return !0;
  }, e.prototype.crop = function(t, n, a, i) {
    return new e(this.luminances, a, i, this.dataWidth, this.dataHeight, this.left + t, this.top + n);
  }, e.prototype.invert = function() {
    return new th.default(this);
  }, e;
}(rh.default);
Ga.default = nh;
var Ha = {}, Va = {}, Qr = {}, ja = {}, Bt = {};
Object.defineProperty(Bt, "__esModule", { value: !0 });
var ah = function() {
  function r(e) {
    this.newPosition = e;
  }
  return r.prototype.getNewPosition = function() {
    return this.newPosition;
  }, r;
}();
Bt.default = ah;
var ih = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(ja, "__esModule", { value: !0 });
var oh = Bt, uh = function(r) {
  ih(e, r);
  function e(t, n) {
    var a = r.call(this, t) || this;
    return a.value = n, a;
  }
  return e.prototype.getValue = function() {
    return this.value;
  }, e.prototype.isFNC1 = function() {
    return this.value === e.FNC1;
  }, e.FNC1 = "$", e;
}(oh.default);
ja.default = uh;
var Wa = {}, fh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Wa, "__esModule", { value: !0 });
var lh = F, ch = Bt, dh = function(r) {
  fh(e, r);
  function e(t, n, a) {
    var i = r.call(this, t) || this;
    if (n < 0 || n > 10 || a < 0 || a > 10)
      throw new lh.default();
    return i.firstDigit = n, i.secondDigit = a, i;
  }
  return e.prototype.getFirstDigit = function() {
    return this.firstDigit;
  }, e.prototype.getSecondDigit = function() {
    return this.secondDigit;
  }, e.prototype.getValue = function() {
    return this.firstDigit * 10 + this.secondDigit;
  }, e.prototype.isFirstDigitFNC1 = function() {
    return this.firstDigit == e.FNC1;
  }, e.prototype.isSecondDigitFNC1 = function() {
    return this.secondDigit == e.FNC1;
  }, e.prototype.isAnyFNC1 = function() {
    return this.firstDigit === e.FNC1 || this.secondDigit === e.FNC1;
  }, e.FNC1 = 10, e;
}(ch.default);
Wa.default = dh;
var Xa = {}, sh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Xa, "__esModule", { value: !0 });
var vh = Bt, hh = function(r) {
  sh(e, r);
  function e(t, n, a) {
    var i = r.call(this, t) || this;
    return a ? (i.remaining = !0, i.remainingValue = i.remainingValue) : (i.remaining = !1, i.remainingValue = 0), i.newString = n, i;
  }
  return e.prototype.getNewString = function() {
    return this.newString;
  }, e.prototype.isRemaining = function() {
    return this.remaining;
  }, e.prototype.getRemainingValue = function() {
    return this.remainingValue;
  }, e;
}(vh.default);
Xa.default = hh;
var za = {}, gr = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(za, "__esModule", { value: !0 });
var ze = T, xh = function() {
  function r() {
  }
  return r.parseFieldsInGeneralPurpose = function(e) {
    var t, n, a, i, o, u, f, l;
    if (!e)
      return null;
    if (e.length < 2)
      throw new ze.default();
    var c = e.substring(0, 2);
    try {
      for (var d = gr(r.TWO_DIGIT_DATA_LENGTH), s = d.next(); !s.done; s = d.next()) {
        var v = s.value;
        if (v[0] === c)
          return v[1] === r.VARIABLE_LENGTH ? r.processVariableAI(2, v[2], e) : r.processFixedAI(2, v[1], e);
      }
    } catch (m) {
      t = { error: m };
    } finally {
      try {
        s && !s.done && (n = d.return) && n.call(d);
      } finally {
        if (t)
          throw t.error;
      }
    }
    if (e.length < 3)
      throw new ze.default();
    var h = e.substring(0, 3);
    try {
      for (var x = gr(r.THREE_DIGIT_DATA_LENGTH), _ = x.next(); !_.done; _ = x.next()) {
        var v = _.value;
        if (v[0] === h)
          return v[1] === r.VARIABLE_LENGTH ? r.processVariableAI(3, v[2], e) : r.processFixedAI(3, v[1], e);
      }
    } catch (m) {
      a = { error: m };
    } finally {
      try {
        _ && !_.done && (i = x.return) && i.call(x);
      } finally {
        if (a)
          throw a.error;
      }
    }
    try {
      for (var g = gr(r.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH), y = g.next(); !y.done; y = g.next()) {
        var v = y.value;
        if (v[0] === h)
          return v[1] === r.VARIABLE_LENGTH ? r.processVariableAI(4, v[2], e) : r.processFixedAI(4, v[1], e);
      }
    } catch (m) {
      o = { error: m };
    } finally {
      try {
        y && !y.done && (u = g.return) && u.call(g);
      } finally {
        if (o)
          throw o.error;
      }
    }
    if (e.length < 4)
      throw new ze.default();
    var A = e.substring(0, 4);
    try {
      for (var w = gr(r.FOUR_DIGIT_DATA_LENGTH), S = w.next(); !S.done; S = w.next()) {
        var v = S.value;
        if (v[0] === A)
          return v[1] === r.VARIABLE_LENGTH ? r.processVariableAI(4, v[2], e) : r.processFixedAI(4, v[1], e);
      }
    } catch (m) {
      f = { error: m };
    } finally {
      try {
        S && !S.done && (l = w.return) && l.call(w);
      } finally {
        if (f)
          throw f.error;
      }
    }
    throw new ze.default();
  }, r.processFixedAI = function(e, t, n) {
    if (n.length < e)
      throw new ze.default();
    var a = n.substring(0, e);
    if (n.length < e + t)
      throw new ze.default();
    var i = n.substring(e, e + t), o = n.substring(e + t), u = "(" + a + ")" + i, f = r.parseFieldsInGeneralPurpose(o);
    return f == null ? u : u + f;
  }, r.processVariableAI = function(e, t, n) {
    var a = n.substring(0, e), i;
    n.length < e + t ? i = n.length : i = e + t;
    var o = n.substring(e, i), u = n.substring(i), f = "(" + a + ")" + o, l = r.parseFieldsInGeneralPurpose(u);
    return l == null ? f : f + l;
  }, r.VARIABLE_LENGTH = [], r.TWO_DIGIT_DATA_LENGTH = [
    ["00", 18],
    ["01", 14],
    ["02", 14],
    ["10", r.VARIABLE_LENGTH, 20],
    ["11", 6],
    ["12", 6],
    ["13", 6],
    ["15", 6],
    ["17", 6],
    ["20", 2],
    ["21", r.VARIABLE_LENGTH, 20],
    ["22", r.VARIABLE_LENGTH, 29],
    ["30", r.VARIABLE_LENGTH, 8],
    ["37", r.VARIABLE_LENGTH, 8],
    ["90", r.VARIABLE_LENGTH, 30],
    ["91", r.VARIABLE_LENGTH, 30],
    ["92", r.VARIABLE_LENGTH, 30],
    ["93", r.VARIABLE_LENGTH, 30],
    ["94", r.VARIABLE_LENGTH, 30],
    ["95", r.VARIABLE_LENGTH, 30],
    ["96", r.VARIABLE_LENGTH, 30],
    ["97", r.VARIABLE_LENGTH, 3],
    ["98", r.VARIABLE_LENGTH, 30],
    ["99", r.VARIABLE_LENGTH, 30]
  ], r.THREE_DIGIT_DATA_LENGTH = [
    ["240", r.VARIABLE_LENGTH, 30],
    ["241", r.VARIABLE_LENGTH, 30],
    ["242", r.VARIABLE_LENGTH, 6],
    ["250", r.VARIABLE_LENGTH, 30],
    ["251", r.VARIABLE_LENGTH, 30],
    ["253", r.VARIABLE_LENGTH, 17],
    ["254", r.VARIABLE_LENGTH, 20],
    ["400", r.VARIABLE_LENGTH, 30],
    ["401", r.VARIABLE_LENGTH, 30],
    ["402", 17],
    ["403", r.VARIABLE_LENGTH, 30],
    ["410", 13],
    ["411", 13],
    ["412", 13],
    ["413", 13],
    ["414", 13],
    ["420", r.VARIABLE_LENGTH, 20],
    ["421", r.VARIABLE_LENGTH, 15],
    ["422", 3],
    ["423", r.VARIABLE_LENGTH, 15],
    ["424", 3],
    ["425", 3],
    ["426", 3]
  ], r.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH = [
    ["310", 6],
    ["311", 6],
    ["312", 6],
    ["313", 6],
    ["314", 6],
    ["315", 6],
    ["316", 6],
    ["320", 6],
    ["321", 6],
    ["322", 6],
    ["323", 6],
    ["324", 6],
    ["325", 6],
    ["326", 6],
    ["327", 6],
    ["328", 6],
    ["329", 6],
    ["330", 6],
    ["331", 6],
    ["332", 6],
    ["333", 6],
    ["334", 6],
    ["335", 6],
    ["336", 6],
    ["340", 6],
    ["341", 6],
    ["342", 6],
    ["343", 6],
    ["344", 6],
    ["345", 6],
    ["346", 6],
    ["347", 6],
    ["348", 6],
    ["349", 6],
    ["350", 6],
    ["351", 6],
    ["352", 6],
    ["353", 6],
    ["354", 6],
    ["355", 6],
    ["356", 6],
    ["357", 6],
    ["360", 6],
    ["361", 6],
    ["362", 6],
    ["363", 6],
    ["364", 6],
    ["365", 6],
    ["366", 6],
    ["367", 6],
    ["368", 6],
    ["369", 6],
    ["390", r.VARIABLE_LENGTH, 15],
    ["391", r.VARIABLE_LENGTH, 18],
    ["392", r.VARIABLE_LENGTH, 15],
    ["393", r.VARIABLE_LENGTH, 18],
    ["703", r.VARIABLE_LENGTH, 30]
  ], r.FOUR_DIGIT_DATA_LENGTH = [
    ["7001", 13],
    ["7002", r.VARIABLE_LENGTH, 30],
    ["7003", 10],
    ["8001", 14],
    ["8002", r.VARIABLE_LENGTH, 20],
    ["8003", r.VARIABLE_LENGTH, 30],
    ["8004", r.VARIABLE_LENGTH, 30],
    ["8005", 6],
    ["8006", 18],
    ["8007", r.VARIABLE_LENGTH, 30],
    ["8008", r.VARIABLE_LENGTH, 12],
    ["8018", 18],
    ["8020", r.VARIABLE_LENGTH, 25],
    ["8100", 6],
    ["8101", 10],
    ["8102", 2],
    ["8110", r.VARIABLE_LENGTH, 70],
    ["8200", r.VARIABLE_LENGTH, 70]
  ], r;
}();
za.default = xh;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
var ph = function() {
  function r(e, t) {
    t ? this.decodedInformation = null : (this.finished = e, this.decodedInformation = t);
  }
  return r.prototype.getDecodedInformation = function() {
    return this.decodedInformation;
  }, r.prototype.isFinished = function() {
    return this.finished;
  }, r;
}();
Ya.default = ph;
Object.defineProperty(Qr, "__esModule", { value: !0 });
var _h = F, gh = xe, yh = G, le = ja, Ye = Wa, Me = Xa, Eh = za, Be = Ya, Ah = function() {
  function r(e) {
    this.buffer = new yh.default(), this.information = e;
  }
  return r.prototype.decodeAllCodes = function(e, t) {
    var n = t, a = null;
    do {
      var i = this.decodeGeneralPurposeField(n, a), o = Eh.default.parseFieldsInGeneralPurpose(i.getNewString());
      if (o != null && e.append(o), i.isRemaining() ? a = "" + i.getRemainingValue() : a = null, n == i.getNewPosition())
        break;
      n = i.getNewPosition();
    } while (!0);
    return e.toString();
  }, r.prototype.isStillNumeric = function(e) {
    if (e + 7 > this.information.getSize())
      return e + 4 <= this.information.getSize();
    for (var t = e; t < e + 3; ++t)
      if (this.information.get(t))
        return !0;
    return this.information.get(e + 3);
  }, r.prototype.decodeNumeric = function(e) {
    if (e + 7 > this.information.getSize()) {
      var t = this.extractNumericValueFromBitArray(e, 4);
      return t == 0 ? new Ye.default(this.information.getSize(), Ye.default.FNC1, Ye.default.FNC1) : new Ye.default(this.information.getSize(), t - 1, Ye.default.FNC1);
    }
    var n = this.extractNumericValueFromBitArray(e, 7), a = (n - 8) / 11, i = (n - 8) % 11;
    return new Ye.default(e + 7, a, i);
  }, r.prototype.extractNumericValueFromBitArray = function(e, t) {
    return r.extractNumericValueFromBitArray(this.information, e, t);
  }, r.extractNumericValueFromBitArray = function(e, t, n) {
    for (var a = 0, i = 0; i < n; ++i)
      e.get(t + i) && (a |= 1 << n - i - 1);
    return a;
  }, r.prototype.decodeGeneralPurposeField = function(e, t) {
    this.buffer.setLengthToZero(), t != null && this.buffer.append(t), this.current.setPosition(e);
    var n = this.parseBlocks();
    return n != null && n.isRemaining() ? new Me.default(this.current.getPosition(), this.buffer.toString(), n.getRemainingValue()) : new Me.default(this.current.getPosition(), this.buffer.toString());
  }, r.prototype.parseBlocks = function() {
    var e, t;
    do {
      var n = this.current.getPosition();
      this.current.isAlpha() ? (t = this.parseAlphaBlock(), e = t.isFinished()) : this.current.isIsoIec646() ? (t = this.parseIsoIec646Block(), e = t.isFinished()) : (t = this.parseNumericBlock(), e = t.isFinished());
      var a = n != this.current.getPosition();
      if (!a && !e)
        break;
    } while (!e);
    return t.getDecodedInformation();
  }, r.prototype.parseNumericBlock = function() {
    for (; this.isStillNumeric(this.current.getPosition()); ) {
      var e = this.decodeNumeric(this.current.getPosition());
      if (this.current.setPosition(e.getNewPosition()), e.isFirstDigitFNC1()) {
        var t = void 0;
        return e.isSecondDigitFNC1() ? t = new Me.default(this.current.getPosition(), this.buffer.toString()) : t = new Me.default(this.current.getPosition(), this.buffer.toString(), e.getSecondDigit()), new Be.default(!0, t);
      }
      if (this.buffer.append(e.getFirstDigit()), e.isSecondDigitFNC1()) {
        var t = new Me.default(this.current.getPosition(), this.buffer.toString());
        return new Be.default(!0, t);
      }
      this.buffer.append(e.getSecondDigit());
    }
    return this.isNumericToAlphaNumericLatch(this.current.getPosition()) && (this.current.setAlpha(), this.current.incrementPosition(4)), new Be.default(!1);
  }, r.prototype.parseIsoIec646Block = function() {
    for (; this.isStillIsoIec646(this.current.getPosition()); ) {
      var e = this.decodeIsoIec646(this.current.getPosition());
      if (this.current.setPosition(e.getNewPosition()), e.isFNC1()) {
        var t = new Me.default(this.current.getPosition(), this.buffer.toString());
        return new Be.default(!0, t);
      }
      this.buffer.append(e.getValue());
    }
    return this.isAlphaOr646ToNumericLatch(this.current.getPosition()) ? (this.current.incrementPosition(3), this.current.setNumeric()) : this.isAlphaTo646ToAlphaLatch(this.current.getPosition()) && (this.current.getPosition() + 5 < this.information.getSize() ? this.current.incrementPosition(5) : this.current.setPosition(this.information.getSize()), this.current.setAlpha()), new Be.default(!1);
  }, r.prototype.parseAlphaBlock = function() {
    for (; this.isStillAlpha(this.current.getPosition()); ) {
      var e = this.decodeAlphanumeric(this.current.getPosition());
      if (this.current.setPosition(e.getNewPosition()), e.isFNC1()) {
        var t = new Me.default(this.current.getPosition(), this.buffer.toString());
        return new Be.default(!0, t);
      }
      this.buffer.append(e.getValue());
    }
    return this.isAlphaOr646ToNumericLatch(this.current.getPosition()) ? (this.current.incrementPosition(3), this.current.setNumeric()) : this.isAlphaTo646ToAlphaLatch(this.current.getPosition()) && (this.current.getPosition() + 5 < this.information.getSize() ? this.current.incrementPosition(5) : this.current.setPosition(this.information.getSize()), this.current.setIsoIec646()), new Be.default(!1);
  }, r.prototype.isStillIsoIec646 = function(e) {
    if (e + 5 > this.information.getSize())
      return !1;
    var t = this.extractNumericValueFromBitArray(e, 5);
    if (t >= 5 && t < 16)
      return !0;
    if (e + 7 > this.information.getSize())
      return !1;
    var n = this.extractNumericValueFromBitArray(e, 7);
    if (n >= 64 && n < 116)
      return !0;
    if (e + 8 > this.information.getSize())
      return !1;
    var a = this.extractNumericValueFromBitArray(e, 8);
    return a >= 232 && a < 253;
  }, r.prototype.decodeIsoIec646 = function(e) {
    var t = this.extractNumericValueFromBitArray(e, 5);
    if (t == 15)
      return new le.default(e + 5, le.default.FNC1);
    if (t >= 5 && t < 15)
      return new le.default(e + 5, "0" + (t - 5));
    var n = this.extractNumericValueFromBitArray(e, 7);
    if (n >= 64 && n < 90)
      return new le.default(e + 7, "" + (n + 1));
    if (n >= 90 && n < 116)
      return new le.default(e + 7, "" + (n + 7));
    var a = this.extractNumericValueFromBitArray(e, 8), i;
    switch (a) {
      case 232:
        i = "!";
        break;
      case 233:
        i = '"';
        break;
      case 234:
        i = "%";
        break;
      case 235:
        i = "&";
        break;
      case 236:
        i = "'";
        break;
      case 237:
        i = "(";
        break;
      case 238:
        i = ")";
        break;
      case 239:
        i = "*";
        break;
      case 240:
        i = "+";
        break;
      case 241:
        i = ",";
        break;
      case 242:
        i = "-";
        break;
      case 243:
        i = ".";
        break;
      case 244:
        i = "/";
        break;
      case 245:
        i = ":";
        break;
      case 246:
        i = ";";
        break;
      case 247:
        i = "<";
        break;
      case 248:
        i = "=";
        break;
      case 249:
        i = ">";
        break;
      case 250:
        i = "?";
        break;
      case 251:
        i = "_";
        break;
      case 252:
        i = " ";
        break;
      default:
        throw new _h.default();
    }
    return new le.default(e + 8, i);
  }, r.prototype.isStillAlpha = function(e) {
    if (e + 5 > this.information.getSize())
      return !1;
    var t = this.extractNumericValueFromBitArray(e, 5);
    if (t >= 5 && t < 16)
      return !0;
    if (e + 6 > this.information.getSize())
      return !1;
    var n = this.extractNumericValueFromBitArray(e, 6);
    return n >= 16 && n < 63;
  }, r.prototype.decodeAlphanumeric = function(e) {
    var t = this.extractNumericValueFromBitArray(e, 5);
    if (t == 15)
      return new le.default(e + 5, le.default.FNC1);
    if (t >= 5 && t < 15)
      return new le.default(e + 5, "0" + (t - 5));
    var n = this.extractNumericValueFromBitArray(e, 6);
    if (n >= 32 && n < 58)
      return new le.default(e + 6, "" + (n + 33));
    var a;
    switch (n) {
      case 58:
        a = "*";
        break;
      case 59:
        a = ",";
        break;
      case 60:
        a = "-";
        break;
      case 61:
        a = ".";
        break;
      case 62:
        a = "/";
        break;
      default:
        throw new gh.default("Decoding invalid alphanumeric value: " + n);
    }
    return new le.default(e + 6, a);
  }, r.prototype.isAlphaTo646ToAlphaLatch = function(e) {
    if (e + 1 > this.information.getSize())
      return !1;
    for (var t = 0; t < 5 && t + e < this.information.getSize(); ++t)
      if (t == 2) {
        if (!this.information.get(e + 2))
          return !1;
      } else if (this.information.get(e + t))
        return !1;
    return !0;
  }, r.prototype.isAlphaOr646ToNumericLatch = function(e) {
    if (e + 3 > this.information.getSize())
      return !1;
    for (var t = e; t < e + 3; ++t)
      if (this.information.get(t))
        return !1;
    return !0;
  }, r.prototype.isNumericToAlphaNumericLatch = function(e) {
    if (e + 1 > this.information.getSize())
      return !1;
    for (var t = 0; t < 4 && t + e < this.information.getSize(); ++t)
      if (this.information.get(e + t))
        return !1;
    return !0;
  }, r;
}();
Qr.default = Ah;
var Za = {}, nt = {}, Jr = {};
Object.defineProperty(Jr, "__esModule", { value: !0 });
var wh = Qr, Ch = function() {
  function r(e) {
    this.information = e, this.generalDecoder = new wh.default(e);
  }
  return r.prototype.getInformation = function() {
    return this.information;
  }, r.prototype.getGeneralDecoder = function() {
    return this.generalDecoder;
  }, r;
}();
Jr.default = Ch;
var Sh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(nt, "__esModule", { value: !0 });
var mh = Jr, Ih = function(r) {
  Sh(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.encodeCompressedGtin = function(t, n) {
    t.append("(01)");
    var a = t.length();
    t.append("9"), this.encodeCompressedGtinWithoutAI(t, n, a);
  }, e.prototype.encodeCompressedGtinWithoutAI = function(t, n, a) {
    for (var i = 0; i < 4; ++i) {
      var o = this.getGeneralDecoder().extractNumericValueFromBitArray(n + 10 * i, 10);
      o / 100 == 0 && t.append("0"), o / 10 == 0 && t.append("0"), t.append(o);
    }
    e.appendCheckDigit(t, a);
  }, e.appendCheckDigit = function(t, n) {
    for (var a = 0, i = 0; i < 13; i++) {
      var o = t.charAt(i + n).charCodeAt(0) - "0".charCodeAt(0);
      a += (i & 1) == 0 ? 3 * o : o;
    }
    a = 10 - a % 10, a == 10 && (a = 0), t.append(a);
  }, e.GTIN_SIZE = 40, e;
}(mh.default);
nt.default = Ih;
var Oh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Za, "__esModule", { value: !0 });
var Rh = nt, Dh = G, Th = function(r) {
  Oh(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.parseInformation = function() {
    var t = new Dh.default();
    t.append("(01)");
    var n = t.length(), a = this.getGeneralDecoder().extractNumericValueFromBitArray(e.HEADER_SIZE, 4);
    return t.append(a), this.encodeCompressedGtinWithoutAI(t, e.HEADER_SIZE + 4, n), this.getGeneralDecoder().decodeAllCodes(t, e.HEADER_SIZE + 44);
  }, e.HEADER_SIZE = 1 + 1 + 2, e;
}(Rh.default);
Za.default = Th;
var Ka = {}, Ph = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Ka, "__esModule", { value: !0 });
var bh = G, Nh = Jr, Mh = function(r) {
  Ph(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.parseInformation = function() {
    var t = new bh.default();
    return this.getGeneralDecoder().decodeAllCodes(t, e.HEADER_SIZE);
  }, e.HEADER_SIZE = 2 + 1 + 2, e;
}(Nh.default);
Ka.default = Mh;
var qa = {}, en = {}, tn = {}, Bh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(tn, "__esModule", { value: !0 });
var Fh = nt, Lh = function(r) {
  Bh(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.encodeCompressedWeight = function(t, n, a) {
    var i = this.getGeneralDecoder().extractNumericValueFromBitArray(n, a);
    this.addWeightCode(t, i);
    for (var o = this.checkWeight(i), u = 1e5, f = 0; f < 5; ++f)
      o / u == 0 && t.append("0"), u /= 10;
    t.append(o);
  }, e;
}(Fh.default);
tn.default = Lh;
var $h = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(en, "__esModule", { value: !0 });
var Pn = tn, kh = G, Uh = T, Gh = function(r) {
  $h(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.parseInformation = function() {
    if (this.getInformation().getSize() != e.HEADER_SIZE + Pn.default.GTIN_SIZE + e.WEIGHT_SIZE)
      throw new Uh.default();
    var t = new kh.default();
    return this.encodeCompressedGtin(t, e.HEADER_SIZE), this.encodeCompressedWeight(t, e.HEADER_SIZE + Pn.default.GTIN_SIZE, e.WEIGHT_SIZE), t.toString();
  }, e.HEADER_SIZE = 4 + 1, e.WEIGHT_SIZE = 15, e;
}(Pn.default);
en.default = Gh;
var Hh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(qa, "__esModule", { value: !0 });
var Vh = en, jh = function(r) {
  Hh(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.addWeightCode = function(t, n) {
    t.append("(3103)");
  }, e.prototype.checkWeight = function(t) {
    return t;
  }, e;
}(Vh.default);
qa.default = jh;
var Qa = {}, Wh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Qa, "__esModule", { value: !0 });
var Xh = en, zh = function(r) {
  Wh(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.addWeightCode = function(t, n) {
    n < 1e4 ? t.append("(3202)") : t.append("(3203)");
  }, e.prototype.checkWeight = function(t) {
    return t < 1e4 ? t : t - 1e4;
  }, e;
}(Xh.default);
Qa.default = zh;
var Ja = {}, Yh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Ja, "__esModule", { value: !0 });
var yr = nt, Zh = T, Kh = G, qh = function(r) {
  Yh(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.parseInformation = function() {
    if (this.getInformation().getSize() < e.HEADER_SIZE + yr.default.GTIN_SIZE)
      throw new Zh.default();
    var t = new Kh.default();
    this.encodeCompressedGtin(t, e.HEADER_SIZE);
    var n = this.getGeneralDecoder().extractNumericValueFromBitArray(e.HEADER_SIZE + yr.default.GTIN_SIZE, e.LAST_DIGIT_SIZE);
    t.append("(392"), t.append(n), t.append(")");
    var a = this.getGeneralDecoder().decodeGeneralPurposeField(e.HEADER_SIZE + yr.default.GTIN_SIZE + e.LAST_DIGIT_SIZE, null);
    return t.append(a.getNewString()), t.toString();
  }, e.HEADER_SIZE = 5 + 1 + 2, e.LAST_DIGIT_SIZE = 2, e;
}(yr.default);
Ja.default = qh;
var ei = {}, Qh = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(ei, "__esModule", { value: !0 });
var pt = nt, Jh = T, e2 = G, t2 = function(r) {
  Qh(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.parseInformation = function() {
    if (this.getInformation().getSize() < e.HEADER_SIZE + pt.default.GTIN_SIZE)
      throw new Jh.default();
    var t = new e2.default();
    this.encodeCompressedGtin(t, e.HEADER_SIZE);
    var n = this.getGeneralDecoder().extractNumericValueFromBitArray(e.HEADER_SIZE + pt.default.GTIN_SIZE, e.LAST_DIGIT_SIZE);
    t.append("(393"), t.append(n), t.append(")");
    var a = this.getGeneralDecoder().extractNumericValueFromBitArray(e.HEADER_SIZE + pt.default.GTIN_SIZE + e.LAST_DIGIT_SIZE, e.FIRST_THREE_DIGITS_SIZE);
    a / 100 == 0 && t.append("0"), a / 10 == 0 && t.append("0"), t.append(a);
    var i = this.getGeneralDecoder().decodeGeneralPurposeField(e.HEADER_SIZE + pt.default.GTIN_SIZE + e.LAST_DIGIT_SIZE + e.FIRST_THREE_DIGITS_SIZE, null);
    return t.append(i.getNewString()), t.toString();
  }, e.HEADER_SIZE = 5 + 1 + 2, e.LAST_DIGIT_SIZE = 2, e.FIRST_THREE_DIGITS_SIZE = 10, e;
}(pt.default);
ei.default = t2;
var ti = {}, r2 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(ti, "__esModule", { value: !0 });
var n2 = tn, a2 = T, i2 = G, o2 = function(r) {
  r2(e, r);
  function e(t, n, a) {
    var i = r.call(this, t) || this;
    return i.dateCode = a, i.firstAIdigits = n, i;
  }
  return e.prototype.parseInformation = function() {
    if (this.getInformation().getSize() != e.HEADER_SIZE + e.GTIN_SIZE + e.WEIGHT_SIZE + e.DATE_SIZE)
      throw new a2.default();
    var t = new i2.default();
    return this.encodeCompressedGtin(t, e.HEADER_SIZE), this.encodeCompressedWeight(t, e.HEADER_SIZE + e.GTIN_SIZE, e.WEIGHT_SIZE), this.encodeCompressedDate(t, e.HEADER_SIZE + e.GTIN_SIZE + e.WEIGHT_SIZE), t.toString();
  }, e.prototype.encodeCompressedDate = function(t, n) {
    var a = this.getGeneralDecoder().extractNumericValueFromBitArray(n, e.DATE_SIZE);
    if (a != 38400) {
      t.append("("), t.append(this.dateCode), t.append(")");
      var i = a % 32;
      a /= 32;
      var o = a % 12 + 1;
      a /= 12;
      var u = a;
      u / 10 == 0 && t.append("0"), t.append(u), o / 10 == 0 && t.append("0"), t.append(o), i / 10 == 0 && t.append("0"), t.append(i);
    }
  }, e.prototype.addWeightCode = function(t, n) {
    t.append("("), t.append(this.firstAIdigits), t.append(n / 1e5), t.append(")");
  }, e.prototype.checkWeight = function(t) {
    return t % 1e5;
  }, e.HEADER_SIZE = 7 + 1, e.WEIGHT_SIZE = 20, e.DATE_SIZE = 16, e;
}(n2.default);
ti.default = o2;
Object.defineProperty(Va, "__esModule", { value: !0 });
var u2 = xe, bn = Qr, f2 = Za, l2 = Ka, c2 = qa, d2 = Qa, s2 = Ja, v2 = ei, De = ti;
function h2(r) {
  try {
    if (r.get(1))
      return new f2.default(r);
    if (!r.get(2))
      return new l2.default(r);
    var e = bn.default.extractNumericValueFromBitArray(r, 1, 4);
    switch (e) {
      case 4:
        return new c2.default(r);
      case 5:
        return new d2.default(r);
    }
    var t = bn.default.extractNumericValueFromBitArray(r, 1, 5);
    switch (t) {
      case 12:
        return new s2.default(r);
      case 13:
        return new v2.default(r);
    }
    var n = bn.default.extractNumericValueFromBitArray(r, 1, 7);
    switch (n) {
      case 56:
        return new De.default(r, "310", "11");
      case 57:
        return new De.default(r, "320", "11");
      case 58:
        return new De.default(r, "310", "13");
      case 59:
        return new De.default(r, "320", "13");
      case 60:
        return new De.default(r, "310", "15");
      case 61:
        return new De.default(r, "320", "15");
      case 62:
        return new De.default(r, "310", "17");
      case 63:
        return new De.default(r, "320", "17");
    }
  } catch (a) {
    throw console.log(a), new u2.default("unknown decoder: " + r);
  }
}
Va.createDecoder = h2;
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
var x2 = function() {
  function r(e, t, n, a) {
    this.leftchar = e, this.rightchar = t, this.finderpattern = n, this.maybeLast = a;
  }
  return r.prototype.mayBeLast = function() {
    return this.maybeLast;
  }, r.prototype.getLeftChar = function() {
    return this.leftchar;
  }, r.prototype.getRightChar = function() {
    return this.rightchar;
  }, r.prototype.getFinderPattern = function() {
    return this.finderpattern;
  }, r.prototype.mustBeLast = function() {
    return this.rightchar == null;
  }, r.prototype.toString = function() {
    return "[ " + this.leftchar + ", " + this.rightchar + " : " + (this.finderpattern == null ? "null" : this.finderpattern.getValue()) + " ]";
  }, r.equals = function(e, t) {
    return e instanceof r ? r.equalsOrNull(e.leftchar, t.leftchar) && r.equalsOrNull(e.rightchar, t.rightchar) && r.equalsOrNull(e.finderpattern, t.finderpattern) : !1;
  }, r.equalsOrNull = function(e, t) {
    return e === null ? t === null : r.equals(e, t);
  }, r.prototype.hashCode = function() {
    var e = this.leftchar.getValue() ^ this.rightchar.getValue() ^ this.finderpattern.getValue();
    return e;
  }, r.hashNotNull = function(e) {
    return e === null ? 0 : e.hashCode();
  }, r;
}();
ri.default = x2;
var ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
var p2 = function() {
  function r(e, t, n) {
    this.pairs = e, this.rowNumber = t, this.wasReversed = n;
  }
  return r.prototype.getPairs = function() {
    return this.pairs;
  }, r.prototype.getRowNumber = function() {
    return this.rowNumber;
  }, r.prototype.isReversed = function() {
    return this.wasReversed;
  }, r.prototype.isEquivalent = function(e) {
    return this.checkEqualitity(this, e);
  }, r.prototype.toString = function() {
    return "{ " + this.pairs + " }";
  }, r.prototype.equals = function(e, t) {
    return e instanceof r ? this.checkEqualitity(e, t) && e.wasReversed === t.wasReversed : !1;
  }, r.prototype.checkEqualitity = function(e, t) {
    if (!(!e || !t)) {
      var n;
      return e.forEach(function(a, i) {
        t.forEach(function(o) {
          a.getLeftChar().getValue() === o.getLeftChar().getValue() && a.getRightChar().getValue() === o.getRightChar().getValue() && a.getFinderPatter().getValue() === o.getFinderPatter().getValue() && (n = !0);
        });
      }), n;
    }
  }, r;
}();
ni.default = p2;
var ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
var _2 = Ae, g2 = function() {
  function r() {
  }
  return r.buildBitArray = function(e) {
    var t = e.length * 2 - 1;
    e[e.length - 1].getRightChar() == null && (t -= 1);
    for (var n = 12 * t, a = new _2.default(n), i = 0, o = e[0], u = o.getRightChar().getValue(), f = 11; f >= 0; --f)
      (u & 1 << f) != 0 && a.set(i), i++;
    for (var f = 1; f < e.length; ++f) {
      for (var l = e[f], c = l.getLeftChar().getValue(), d = 11; d >= 0; --d)
        (c & 1 << d) != 0 && a.set(i), i++;
      if (l.getRightChar() != null)
        for (var s = l.getRightChar().getValue(), d = 11; d >= 0; --d)
          (s & 1 << d) != 0 && a.set(i), i++;
    }
    return a;
  }, r;
}();
ai.default = g2;
var y2 = E && E.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var i in a)
        a.hasOwnProperty(i) && (n[i] = a[i]);
    }, r(e, t);
  };
  return function(e, t) {
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Te = E && E.__values || function(r) {
  var e = typeof Symbol == "function" && r[Symbol.iterator], t = 0;
  return e ? e.call(r) : {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
};
Object.defineProperty(Ha, "__esModule", { value: !0 });
var E2 = L, X = T, A2 = J, Nn = ae, w2 = Br, C2 = St, S2 = Fr, Uo = Lr, m2 = Va, Go = ri, I2 = ni, O2 = ai, R2 = j, D2 = function(r) {
  y2(e, r);
  function e() {
    var t = r !== null && r.apply(this, arguments) || this;
    return t.pairs = new Array(e.MAX_PAIRS), t.rows = new Array(), t.startEnd = [2], t;
  }
  return e.prototype.decodeRow = function(t, n, a) {
    this.pairs.length = 0, this.startFromEven = !1;
    try {
      return e.constructResult(this.decodeRow2pairs(t, n));
    } catch (i) {
      console.log(i);
    }
    return this.pairs.length = 0, this.startFromEven = !0, e.constructResult(this.decodeRow2pairs(t, n));
  }, e.prototype.reset = function() {
    this.pairs.length = 0, this.rows.length = 0;
  }, e.prototype.decodeRow2pairs = function(t, n) {
    for (var a = !1; !a; )
      try {
        this.pairs.push(this.retrieveNextPair(n, this.pairs, t));
      } catch (u) {
        if (!this.pairs.length)
          throw new u();
        a = !0;
      }
    if (this.checkChecksum())
      return this.pairs;
    var i;
    if (this.rows.length ? i = !0 : i = !1, this.storeRow(t, !1), i) {
      var o = this.checkRowsBoolean(!1);
      if (o != null || (o = this.checkRowsBoolean(!0), o != null))
        return o;
    }
    throw new X.default();
  }, e.prototype.checkRowsBoolean = function(t) {
    if (this.rows.length > 25)
      return this.rows.length = 0, null;
    this.pairs.length = 0, t && (this.rows = this.rows.reverse());
    var n = null;
    try {
      n = this.checkRows(new Array(), 0);
    } catch (a) {
      console.log(a);
    }
    return t && (this.rows = this.rows.reverse()), n;
  }, e.prototype.checkRows = function(t, n) {
    for (var a, i, o = n; o < this.rows.length; o++) {
      var u = this.rows[o];
      this.pairs.length = 0;
      try {
        for (var f = Te(t), l = f.next(); !l.done; l = f.next()) {
          var c = l.value;
          this.pairs.push(c.getPairs());
        }
      } catch (s) {
        a = { error: s };
      } finally {
        try {
          l && !l.done && (i = f.return) && i.call(f);
        } finally {
          if (a)
            throw a.error;
        }
      }
      if (this.pairs.push(u.getPairs()), !!e.isValidSequence(this.pairs)) {
        if (this.checkChecksum())
          return this.pairs;
        var d = new Array(t);
        d.push(u);
        try {
          return this.checkRows(d, o + 1);
        } catch (s) {
          console.log(s);
        }
      }
    }
    throw new X.default();
  }, e.isValidSequence = function(t) {
    var n, a;
    try {
      for (var i = Te(e.FINDER_PATTERN_SEQUENCES), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        if (!(t.length > u.length)) {
          for (var f = !0, l = 0; l < t.length; l++)
            if (t[l].getFinderPattern().getValue() != u[l]) {
              f = !1;
              break;
            }
          if (f)
            return !0;
        }
      }
    } catch (c) {
      n = { error: c };
    } finally {
      try {
        o && !o.done && (a = i.return) && a.call(i);
      } finally {
        if (n)
          throw n.error;
      }
    }
    return !1;
  }, e.prototype.storeRow = function(t, n) {
    for (var a = 0, i = !1, o = !1; a < this.rows.length; ) {
      var u = this.rows[a];
      if (u.getRowNumber() > t) {
        o = u.isEquivalent(this.pairs);
        break;
      }
      i = u.isEquivalent(this.pairs), a++;
    }
    o || i || e.isPartialRow(this.pairs, this.rows) || (this.rows.push(a, new I2.default(this.pairs, t, n)), this.removePartialRows(this.pairs, this.rows));
  }, e.prototype.removePartialRows = function(t, n) {
    var a, i, o, u, f, l;
    try {
      for (var c = Te(n), d = c.next(); !d.done; d = c.next()) {
        var s = d.value;
        if (s.getPairs().length !== t.length) {
          var v = !0;
          try {
            for (var h = Te(s.getPairs()), x = h.next(); !x.done; x = h.next()) {
              var _ = x.value, g = !1;
              try {
                for (var y = Te(t), A = y.next(); !A.done; A = y.next()) {
                  var w = A.value;
                  if (Go.default.equals(_, w)) {
                    g = !0;
                    break;
                  }
                }
              } catch (S) {
                f = { error: S };
              } finally {
                try {
                  A && !A.done && (l = y.return) && l.call(y);
                } finally {
                  if (f)
                    throw f.error;
                }
              }
              g || (v = !1);
            }
          } catch (S) {
            o = { error: S };
          } finally {
            try {
              x && !x.done && (u = h.return) && u.call(h);
            } finally {
              if (o)
                throw o.error;
            }
          }
        }
      }
    } catch (S) {
      a = { error: S };
    } finally {
      try {
        d && !d.done && (i = c.return) && i.call(c);
      } finally {
        if (a)
          throw a.error;
      }
    }
  }, e.isPartialRow = function(t, n) {
    var a, i, o, u, f, l;
    try {
      for (var c = Te(n), d = c.next(); !d.done; d = c.next()) {
        var s = d.value, v = !0;
        try {
          for (var h = Te(t), x = h.next(); !x.done; x = h.next()) {
            var _ = x.value, g = !1;
            try {
              for (var y = Te(s.getPairs()), A = y.next(); !A.done; A = y.next()) {
                var w = A.value;
                if (_.equals(w)) {
                  g = !0;
                  break;
                }
              }
            } catch (S) {
              f = { error: S };
            } finally {
              try {
                A && !A.done && (l = y.return) && l.call(y);
              } finally {
                if (f)
                  throw f.error;
              }
            }
            if (!g) {
              v = !1;
              break;
            }
          }
        } catch (S) {
          o = { error: S };
        } finally {
          try {
            x && !x.done && (u = h.return) && u.call(h);
          } finally {
            if (o)
              throw o.error;
          }
        }
        if (v)
          return !0;
      }
    } catch (S) {
      a = { error: S };
    } finally {
      try {
        d && !d.done && (i = c.return) && i.call(c);
      } finally {
        if (a)
          throw a.error;
      }
    }
    return !1;
  }, e.prototype.getRows = function() {
    return this.rows;
  }, e.constructResult = function(t) {
    var n = O2.default.buildBitArray(t), a = m2.createDecoder(n), i = a.parseInformation(), o = t[0].getFinderPattern().getResultPoints(), u = t[t.length - 1].getFinderPattern().getResultPoints(), f = [o[0], o[1], u[0], u[1]];
    return new A2.default(i, null, null, f, E2.default.RSS_EXPANDED, null);
  }, e.prototype.checkChecksum = function() {
    var t = this.pairs.get(0), n = t.getLeftChar(), a = t.getRightChar();
    if (a == null)
      return !1;
    for (var i = a.getChecksumPortion(), o = 2, u = 1; u < this.pairs.size(); ++u) {
      var f = this.pairs.get(u);
      i += f.getLeftChar().getChecksumPortion(), o++;
      var l = f.getRightChar();
      l != null && (i += l.getChecksumPortion(), o++);
    }
    i %= 211;
    var c = 211 * (o - 4) + i;
    return c == n.getValue();
  }, e.getNextSecondBar = function(t, n) {
    var a;
    return t.get(n) ? (a = t.getNextUnset(n), a = t.getNextSet(a)) : (a = t.getNextSet(n), a = t.getNextUnset(a)), a;
  }, e.prototype.retrieveNextPair = function(t, n, a) {
    var i = n.length % 2 == 0;
    this.startFromEven && (i = !i);
    var o, u = !0, f = -1;
    do
      this.findNextPair(t, n, f), o = this.parseFoundFinderPattern(t, a, i), o == null ? f = e.getNextSecondBar(t, this.startEnd[0]) : u = !1;
    while (u);
    var l = this.decodeDataCharacter(t, o, i, !0);
    if (!this.isEmptyPair(n) && n[n.length - 1].mustBeLast())
      throw new X.default();
    var c;
    try {
      c = this.decodeDataCharacter(t, o, i, !1);
    } catch (d) {
      c = null, console.log(d);
    }
    return new Go.default(l, c, o, !0);
  }, e.prototype.isEmptyPair = function(t) {
    return t.length === 0;
  }, e.prototype.findNextPair = function(t, n, a) {
    var i = this.getDecodeFinderCounters();
    i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 0;
    var o = t.getSize(), u;
    if (a >= 0)
      u = a;
    else if (this.isEmptyPair(n))
      u = 0;
    else {
      var f = n[n.length - 1];
      u = f.getFinderPattern().getStartEnd()[1];
    }
    var l = n.length % 2 != 0;
    this.startFromEven && (l = !l);
    for (var c = !1; u < o && (c = !t.get(u), !!c); )
      u++;
    for (var d = 0, s = u, v = u; v < o; v++)
      if (t.get(v) != c)
        i[d]++;
      else {
        if (d == 3) {
          if (l && e.reverseCounters(i), e.isFinderPattern(i)) {
            this.startEnd[0] = s, this.startEnd[1] = v;
            return;
          }
          l && e.reverseCounters(i), s += i[0] + i[1], i[0] = i[2], i[1] = i[3], i[2] = 0, i[3] = 0, d--;
        } else
          d++;
        i[d] = 1, c = !c;
      }
    throw new X.default();
  }, e.reverseCounters = function(t) {
    for (var n = t.length, a = 0; a < n / 2; ++a) {
      var i = t[a];
      t[a] = t[n - a - 1], t[n - a - 1] = i;
    }
  }, e.prototype.parseFoundFinderPattern = function(t, n, a) {
    var i, o, u;
    if (a) {
      for (var f = this.startEnd[0] - 1; f >= 0 && !t.get(f); )
        f--;
      f++, i = this.startEnd[0] - f, o = f, u = this.startEnd[1];
    } else
      o = this.startEnd[0], u = t.getNextUnset(this.startEnd[1] + 1), i = u - this.startEnd[1];
    var l = this.getDecodeFinderCounters();
    R2.default.arraycopy(l, 0, l, 1, l.length - 1), l[0] = i;
    var c;
    try {
      c = this.parseFinderValue(l, e.FINDER_PATTERNS);
    } catch {
      return null;
    }
    return new S2.default(c, [o, u], o, u, n);
  }, e.prototype.decodeDataCharacter = function(t, n, a, i) {
    for (var o = this.getDataCharacterCounters(), u = 0; u < o.length; u++)
      o[u] = 0;
    if (i)
      e.recordPatternInReverse(t, n.getStartEnd()[0], o);
    else {
      e.recordPattern(t, n.getStartEnd()[1], o);
      for (var f = 0, l = o.length - 1; f < l; f++, l--) {
        var c = o[f];
        o[f] = o[l], o[l] = c;
      }
    }
    var d = 17, s = Nn.default.sum(new Int32Array(o)) / d, v = (n.getStartEnd()[1] - n.getStartEnd()[0]) / 15;
    if (Math.abs(s - v) / v > 0.3)
      throw new X.default();
    for (var h = this.getOddCounts(), x = this.getEvenCounts(), _ = this.getOddRoundingErrors(), g = this.getEvenRoundingErrors(), f = 0; f < o.length; f++) {
      var y = 1 * o[f] / s, A = y + 0.5;
      if (A < 1) {
        if (y < 0.3)
          throw new X.default();
        A = 1;
      } else if (A > 8) {
        if (y > 8.7)
          throw new X.default();
        A = 8;
      }
      var w = f / 2;
      (f & 1) == 0 ? (h[w] = A, _[w] = y - A) : (x[w] = A, g[w] = y - A);
    }
    this.adjustOddEvenCounts(d);
    for (var S = 4 * n.getValue() + (a ? 0 : 2) + (i ? 0 : 1) - 1, m = 0, I = 0, f = h.length - 1; f >= 0; f--) {
      if (e.isNotA1left(n, a, i)) {
        var O = e.WEIGHTS[S][2 * f];
        I += h[f] * O;
      }
      m += h[f];
    }
    for (var D = 0, f = x.length - 1; f >= 0; f--)
      if (e.isNotA1left(n, a, i)) {
        var O = e.WEIGHTS[S][2 * f + 1];
        D += x[f] * O;
      }
    var R = I + D;
    if ((m & 1) != 0 || m > 13 || m < 4)
      throw new X.default();
    var M = (13 - m) / 2, W = e.SYMBOL_WIDEST[M], H = 9 - W, ee = Uo.default.getRSSvalue(h, W, !0), ve = Uo.default.getRSSvalue(x, H, !1), at = e.EVEN_TOTAL_SUBSET[M], it = e.GSUM[M], ot = ee * at + ve + it;
    return new C2.default(ot, R);
  }, e.isNotA1left = function(t, n, a) {
    return !(t.getValue() == 0 && n && a);
  }, e.prototype.adjustOddEvenCounts = function(t) {
    var n = Nn.default.sum(new Int32Array(this.getOddCounts())), a = Nn.default.sum(new Int32Array(this.getEvenCounts())), i = !1, o = !1;
    n > 13 ? o = !0 : n < 4 && (i = !0);
    var u = !1, f = !1;
    a > 13 ? f = !0 : a < 4 && (u = !0);
    var l = n + a - t, c = (n & 1) == 1, d = (a & 1) == 0;
    if (l == 1)
      if (c) {
        if (d)
          throw new X.default();
        o = !0;
      } else {
        if (!d)
          throw new X.default();
        f = !0;
      }
    else if (l == -1)
      if (c) {
        if (d)
          throw new X.default();
        i = !0;
      } else {
        if (!d)
          throw new X.default();
        u = !0;
      }
    else if (l == 0) {
      if (c) {
        if (!d)
          throw new X.default();
        n < a ? (i = !0, f = !0) : (o = !0, u = !0);
      } else if (d)
        throw new X.default();
    } else
      throw new X.default();
    if (i) {
      if (o)
        throw new X.default();
      e.increment(this.getOddCounts(), this.getOddRoundingErrors());
    }
    if (o && e.decrement(this.getOddCounts(), this.getOddRoundingErrors()), u) {
      if (f)
        throw new X.default();
      e.increment(this.getEvenCounts(), this.getOddRoundingErrors());
    }
    f && e.decrement(this.getEvenCounts(), this.getEvenRoundingErrors());
  }, e.SYMBOL_WIDEST = [7, 5, 4, 3, 1], e.EVEN_TOTAL_SUBSET = [4, 20, 52, 104, 204], e.GSUM = [0, 348, 1388, 2948, 3988], e.FINDER_PATTERNS = [
    [1, 8, 4, 1],
    [3, 6, 4, 1],
    [3, 4, 6, 1],
    [3, 2, 8, 1],
    [2, 6, 5, 1],
    [2, 2, 9, 1]
  ], e.WEIGHTS = [
    [1, 3, 9, 27, 81, 32, 96, 77],
    [20, 60, 180, 118, 143, 7, 21, 63],
    [189, 145, 13, 39, 117, 140, 209, 205],
    [193, 157, 49, 147, 19, 57, 171, 91],
    [62, 186, 136, 197, 169, 85, 44, 132],
    [185, 133, 188, 142, 4, 12, 36, 108],
    [113, 128, 173, 97, 80, 29, 87, 50],
    [150, 28, 84, 41, 123, 158, 52, 156],
    [46, 138, 203, 187, 139, 206, 196, 166],
    [76, 17, 51, 153, 37, 111, 122, 155],
    [43, 129, 176, 106, 107, 110, 119, 146],
    [16, 48, 144, 10, 30, 90, 59, 177],
    [109, 116, 137, 200, 178, 112, 125, 164],
    [70, 210, 208, 202, 184, 130, 179, 115],
    [134, 191, 151, 31, 93, 68, 204, 190],
    [148, 22, 66, 198, 172, 94, 71, 2],
    [6, 18, 54, 162, 64, 192, 154, 40],
    [120, 149, 25, 75, 14, 42, 126, 167],
    [79, 26, 78, 23, 69, 207, 199, 175],
    [103, 98, 83, 38, 114, 131, 182, 124],
    [161, 61, 183, 127, 170, 88, 53, 159],
    [55, 165, 73, 8, 24, 72, 5, 15],
    [45, 135, 194, 160, 58, 174, 100, 89]
  ], e.FINDER_PAT_A = 0, e.FINDER_PAT_B = 1, e.FINDER_PAT_C = 2, e.FINDER_PAT_D = 3, e.FINDER_PAT_E = 4, e.FINDER_PAT_F = 5, e.FINDER_PATTERN_SEQUENCES = [
    [e.FINDER_PAT_A, e.FINDER_PAT_A],
    [e.FINDER_PAT_A, e.FINDER_PAT_B, e.FINDER_PAT_B],
    [e.FINDER_PAT_A, e.FINDER_PAT_C, e.FINDER_PAT_B, e.FINDER_PAT_D],
    [e.FINDER_PAT_A, e.FINDER_PAT_E, e.FINDER_PAT_B, e.FINDER_PAT_D, e.FINDER_PAT_C],
    [e.FINDER_PAT_A, e.FINDER_PAT_E, e.FINDER_PAT_B, e.FINDER_PAT_D, e.FINDER_PAT_D, e.FINDER_PAT_F],
    [e.FINDER_PAT_A, e.FINDER_PAT_E, e.FINDER_PAT_B, e.FINDER_PAT_D, e.FINDER_PAT_E, e.FINDER_PAT_F, e.FINDER_PAT_F],
    [e.FINDER_PAT_A, e.FINDER_PAT_A, e.FINDER_PAT_B, e.FINDER_PAT_B, e.FINDER_PAT_C, e.FINDER_PAT_C, e.FINDER_PAT_D, e.FINDER_PAT_D],
    [e.FINDER_PAT_A, e.FINDER_PAT_A, e.FINDER_PAT_B, e.FINDER_PAT_B, e.FINDER_PAT_C, e.FINDER_PAT_C, e.FINDER_PAT_D, e.FINDER_PAT_E, e.FINDER_PAT_E],
    [e.FINDER_PAT_A, e.FINDER_PAT_A, e.FINDER_PAT_B, e.FINDER_PAT_B, e.FINDER_PAT_C, e.FINDER_PAT_C, e.FINDER_PAT_D, e.FINDER_PAT_E, e.FINDER_PAT_F, e.FINDER_PAT_F],
    [e.FINDER_PAT_A, e.FINDER_PAT_A, e.FINDER_PAT_B, e.FINDER_PAT_B, e.FINDER_PAT_C, e.FINDER_PAT_D, e.FINDER_PAT_D, e.FINDER_PAT_E, e.FINDER_PAT_E, e.FINDER_PAT_F, e.FINDER_PAT_F]
  ], e.MAX_PAIRS = 11, e;
}(w2.default);
Ha.default = D2;
var Ho;
function Yo() {
  return Ho || (Ho = 1, function(r) {
    function e(ii) {
      for (var rn in ii)
        r.hasOwnProperty(rn) || (r[rn] = ii[rn]);
    }
    Object.defineProperty(r, "__esModule", { value: !0 }), e(Uv());
    var t = _t;
    r.ArgumentException = t.default;
    var n = Et;
    r.ArithmeticException = n.default;
    var a = ue;
    r.ChecksumException = a.default;
    var i = z;
    r.Exception = i.default;
    var o = F;
    r.FormatException = o.default;
    var u = N;
    r.IllegalArgumentException = u.default;
    var f = xe;
    r.IllegalStateException = f.default;
    var l = T;
    r.NotFoundException = l.default;
    var c = Yr;
    r.ReaderException = c.default;
    var d = Or;
    r.ReedSolomonException = d.default;
    var s = yt;
    r.UnsupportedOperationException = s.default;
    var v = Mt;
    r.WriterException = v.default;
    var h = L;
    r.BarcodeFormat = h.default;
    var x = Cr;
    r.Binarizer = x.default;
    var _ = Er;
    r.BinaryBitmap = _.default;
    var g = Y;
    r.DecodeHintType = g.default;
    var y = qe;
    r.InvertedLuminanceSource = y.default;
    var A = $e;
    r.LuminanceSource = A.default;
    var w = zo();
    r.MultiFormatReader = w.default;
    var S = ka;
    r.MultiFormatWriter = S.default;
    var m = Ua;
    r.PlanarYUVLuminanceSource = m.default;
    var I = J;
    r.Result = I.default;
    var O = de;
    r.ResultMetadataType = O.default;
    var D = Ga;
    r.RGBLuminanceSource = D.default;
    var R = Ae;
    r.BitArray = R.default;
    var M = fe;
    r.BitMatrix = M.default;
    var W = Ot;
    r.BitSource = W.default;
    var H = Fe;
    r.CharacterSetECI = H.default;
    var ee = ke;
    r.DecoderResult = ee.default;
    var ve = Tr;
    r.DefaultGridSampler = ve.default;
    var at = Je;
    r.DetectorResult = at.default;
    var it = rt;
    r.EncodeHintType = it.default;
    var ot = wr;
    r.GlobalHistogramBinarizer = ot.default;
    var qo = Pr;
    r.GridSampler = qo.default;
    var Qo = et;
    r.GridSamplerInstance = Qo.default;
    var Jo = Ar;
    r.HybridBinarizer = Jo.default;
    var e1 = wt;
    r.PerspectiveTransform = e1.default;
    var t1 = Ke;
    r.StringUtils = t1.default;
    var r1 = ae;
    r.MathUtils = r1.default;
    var n1 = At;
    r.WhiteRectangleDetector = n1.default;
    var a1 = Ce;
    r.GenericGF = a1.default;
    var i1 = Qe;
    r.GenericGFPoly = i1.default;
    var o1 = Ue;
    r.ReedSolomonDecoder = o1.default;
    var u1 = Zr;
    r.ReedSolomonEncoder = u1.default;
    var f1 = mt;
    r.DataMatrixReader = f1.default;
    var l1 = Rt;
    r.QRCodeReader = l1.default;
    var c1 = qr;
    r.QRCodeWriter = c1.default;
    var d1 = Tt;
    r.QRCodeDecoderErrorCorrectionLevel = d1.default;
    var s1 = bt;
    r.QRCodeEncoder = s1.default;
    var v1 = Nt;
    r.QRCodeEncoderQRCode = v1.default;
    var h1 = Hn();
    r.AztecCodeReader = h1.default;
    var x1 = se;
    r.OneDReader = x1.default;
    var p1 = kr;
    r.EAN13Reader = p1.default;
    var _1 = Nr;
    r.Code128Reader = _1.default;
    var g1 = $r;
    r.ITFReader = g1.default;
    var y1 = br;
    r.Code39Reader = y1.default;
    var E1 = Mr;
    r.RSS14Reader = E1.default;
    var A1 = Ha;
    r.RSSExpandedReader = A1.default;
    var w1 = Ct;
    r.MultiformatReader = w1.default;
  }(nn)), nn;
}
var Zo = { exports: {} };
(function(r, e) {
  (function(n, a) {
    r.exports = a(Vo);
  })(E, function(t) {
    return function(n) {
      var a = {};
      function i(o) {
        if (a[o])
          return a[o].exports;
        var u = a[o] = {
          i: o,
          l: !1,
          exports: {}
        };
        return n[o].call(u.exports, u, u.exports, i), u.l = !0, u.exports;
      }
      return i.m = n, i.c = a, i.d = function(o, u, f) {
        i.o(o, u) || Object.defineProperty(o, u, { enumerable: !0, get: f });
      }, i.r = function(o) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(o, "__esModule", { value: !0 });
      }, i.t = function(o, u) {
        if (u & 1 && (o = i(o)), u & 8 || u & 4 && typeof o == "object" && o && o.__esModule)
          return o;
        var f = /* @__PURE__ */ Object.create(null);
        if (i.r(f), Object.defineProperty(f, "default", { enumerable: !0, value: o }), u & 2 && typeof o != "string")
          for (var l in o)
            i.d(f, l, function(c) {
              return o[c];
            }.bind(null, l));
        return f;
      }, i.n = function(o) {
        var u = o && o.__esModule ? function() {
          return o.default;
        } : function() {
          return o;
        };
        return i.d(u, "a", u), u;
      }, i.o = function(o, u) {
        return Object.prototype.hasOwnProperty.call(o, u);
      }, i.p = "", i(i.s = "./src/react-webcam.tsx");
    }({
      "./src/react-webcam.tsx": function(n, a, i) {
        i.r(a);
        var o = i("react"), u = function() {
          var s = function(v, h) {
            return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(x, _) {
              x.__proto__ = _;
            } || function(x, _) {
              for (var g in _)
                _.hasOwnProperty(g) && (x[g] = _[g]);
            }, s(v, h);
          };
          return function(v, h) {
            s(v, h);
            function x() {
              this.constructor = v;
            }
            v.prototype = h === null ? Object.create(h) : (x.prototype = h.prototype, new x());
          };
        }(), f = function() {
          return f = Object.assign || function(s) {
            for (var v, h = 1, x = arguments.length; h < x; h++) {
              v = arguments[h];
              for (var _ in v)
                Object.prototype.hasOwnProperty.call(v, _) && (s[_] = v[_]);
            }
            return s;
          }, f.apply(this, arguments);
        }, l = function(s, v) {
          var h = {};
          for (var x in s)
            Object.prototype.hasOwnProperty.call(s, x) && v.indexOf(x) < 0 && (h[x] = s[x]);
          if (s != null && typeof Object.getOwnPropertySymbols == "function")
            for (var _ = 0, x = Object.getOwnPropertySymbols(s); _ < x.length; _++)
              v.indexOf(x[_]) < 0 && Object.prototype.propertyIsEnumerable.call(s, x[_]) && (h[x[_]] = s[x[_]]);
          return h;
        };
        (function() {
          typeof window > "u" || (navigator.mediaDevices === void 0 && (navigator.mediaDevices = {}), navigator.mediaDevices.getUserMedia === void 0 && (navigator.mediaDevices.getUserMedia = function(v) {
            var h = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            return h ? new Promise(function(x, _) {
              h.call(navigator, v, x, _);
            }) : Promise.reject(new Error("getUserMedia is not implemented in this browser"));
          }));
        })();
        function c() {
          return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        }
        var d = function(s) {
          u(v, s);
          function v(h) {
            var x = s.call(this, h) || this;
            return x.canvas = null, x.ctx = null, x.unmounted = !1, x.state = {
              hasUserMedia: !1
            }, x;
          }
          return v.prototype.componentDidMount = function() {
            var h = this, x = h.state, _ = h.props;
            if (!c()) {
              _.onUserMediaError("getUserMedia not supported");
              return;
            }
            x.hasUserMedia || this.requestUserMedia();
          }, v.prototype.componentDidUpdate = function(h) {
            var x = this.props;
            if (!c()) {
              x.onUserMediaError("getUserMedia not supported");
              return;
            }
            var _ = JSON.stringify(h.audioConstraints) !== JSON.stringify(x.audioConstraints), g = JSON.stringify(h.videoConstraints) !== JSON.stringify(x.videoConstraints), y = h.minScreenshotWidth !== x.minScreenshotWidth, A = h.minScreenshotHeight !== x.minScreenshotHeight;
            (g || y || A) && (this.canvas = null, this.ctx = null), (_ || g) && (this.stopAndCleanup(), this.requestUserMedia());
          }, v.prototype.componentWillUnmount = function() {
            this.unmounted = !0, this.stopAndCleanup();
          }, v.stopMediaStream = function(h) {
            h && (h.getVideoTracks && h.getAudioTracks ? (h.getVideoTracks().map(function(x) {
              h.removeTrack(x), x.stop();
            }), h.getAudioTracks().map(function(x) {
              h.removeTrack(x), x.stop();
            })) : h.stop());
          }, v.prototype.stopAndCleanup = function() {
            var h = this.state;
            h.hasUserMedia && (v.stopMediaStream(this.stream), h.src && window.URL.revokeObjectURL(h.src));
          }, v.prototype.getScreenshot = function(h) {
            var x = this, _ = x.state, g = x.props;
            if (!_.hasUserMedia)
              return null;
            var y = this.getCanvas(h);
            return y && y.toDataURL(g.screenshotFormat, g.screenshotQuality);
          }, v.prototype.getCanvas = function(h) {
            var x = this, _ = x.state, g = x.props;
            if (!this.video || !_.hasUserMedia || !this.video.videoHeight)
              return null;
            if (!this.ctx) {
              var y = this.video.videoWidth, A = this.video.videoHeight;
              if (!this.props.forceScreenshotSourceSize) {
                var w = y / A;
                y = g.minScreenshotWidth || this.video.clientWidth, A = y / w, g.minScreenshotHeight && A < g.minScreenshotHeight && (A = g.minScreenshotHeight, y = A * w);
              }
              this.canvas = document.createElement("canvas"), this.canvas.width = (h == null ? void 0 : h.width) || y, this.canvas.height = (h == null ? void 0 : h.height) || A, this.ctx = this.canvas.getContext("2d");
            }
            var S = this, m = S.ctx, I = S.canvas;
            return m && I && (g.mirrored && (m.translate(I.width, 0), m.scale(-1, 1)), m.imageSmoothingEnabled = g.imageSmoothing, m.drawImage(this.video, 0, 0, (h == null ? void 0 : h.width) || I.width, (h == null ? void 0 : h.height) || I.height), g.mirrored && (m.scale(-1, 1), m.translate(-I.width, 0))), I;
          }, v.prototype.requestUserMedia = function() {
            var h = this, x = this.props, _ = function(A, w) {
              var S = {
                video: typeof w < "u" ? w : !0
              };
              x.audio && (S.audio = typeof A < "u" ? A : !0), navigator.mediaDevices.getUserMedia(S).then(function(m) {
                h.unmounted ? v.stopMediaStream(m) : h.handleUserMedia(null, m);
              }).catch(function(m) {
                h.handleUserMedia(m);
              });
            };
            if ("mediaDevices" in navigator)
              _(x.audioConstraints, x.videoConstraints);
            else {
              var g = function(A) {
                return { optional: [{ sourceId: A }] };
              }, y = function(A) {
                var w = A.deviceId;
                return typeof w == "string" ? w : Array.isArray(w) && w.length > 0 ? w[0] : typeof w == "object" && w.ideal ? w.ideal : null;
              };
              MediaStreamTrack.getSources(function(A) {
                var w = null, S = null;
                A.forEach(function(O) {
                  O.kind === "audio" ? w = O.id : O.kind === "video" && (S = O.id);
                });
                var m = y(x.audioConstraints);
                m && (w = m);
                var I = y(x.videoConstraints);
                I && (S = I), _(g(w), g(S));
              });
            }
          }, v.prototype.handleUserMedia = function(h, x) {
            var _ = this.props;
            if (h || !x) {
              this.setState({ hasUserMedia: !1 }), _.onUserMediaError(h);
              return;
            }
            this.stream = x;
            try {
              this.video && (this.video.srcObject = x), this.setState({ hasUserMedia: !0 });
            } catch {
              this.setState({
                hasUserMedia: !0,
                src: window.URL.createObjectURL(x)
              });
            }
            _.onUserMedia(x);
          }, v.prototype.render = function() {
            var h = this, x = this, _ = x.state, g = x.props, y = g.audio;
            g.forceScreenshotSourceSize, g.onUserMedia, g.onUserMediaError, g.screenshotFormat, g.screenshotQuality, g.minScreenshotWidth, g.minScreenshotHeight, g.audioConstraints, g.videoConstraints, g.imageSmoothing;
            var A = g.mirrored, w = g.style, S = w === void 0 ? {} : w, m = l(g, ["audio", "forceScreenshotSourceSize", "onUserMedia", "onUserMediaError", "screenshotFormat", "screenshotQuality", "minScreenshotWidth", "minScreenshotHeight", "audioConstraints", "videoConstraints", "imageSmoothing", "mirrored", "style"]), I = A ? f(f({}, S), { transform: (S.transform || "") + " scaleX(-1)" }) : S;
            return o.createElement("video", f({ autoPlay: !0, src: _.src, muted: y, playsInline: !0, ref: function(O) {
              h.video = O;
            }, style: I }, m));
          }, v.defaultProps = {
            audio: !0,
            forceScreenshotSourceSize: !1,
            imageSmoothing: !0,
            mirrored: !1,
            onUserMedia: function() {
            },
            onUserMediaError: function() {
            },
            screenshotFormat: "image/webp",
            screenshotQuality: 0.92
          }, v;
        }(o.Component);
        a.default = d;
      },
      react: function(n, a) {
        n.exports = t;
      }
    }).default;
  });
})(Zo);
var Ko = E && E.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(kn, "__esModule", { value: !0 });
const Ze = Ko(Vo), T2 = Yo(), P2 = Ko(Zo.exports), b2 = ({ onUpdate: r, onError: e, width: t = "100%", height: n = "100%", facingMode: a = "environment", torch: i, delay: o = 500, videoConstraints: u, stopStream: f }) => {
  const l = Ze.default.useRef(null), c = Ze.default.useCallback(() => {
    var d;
    const s = new T2.BrowserMultiFormatReader(), v = (d = l == null ? void 0 : l.current) === null || d === void 0 ? void 0 : d.getScreenshot();
    v && s.decodeFromImage(void 0, v).then((h) => {
      r(null, h);
    }).catch((h) => {
      r(h);
    });
  }, [r]);
  return Ze.default.useEffect(() => {
    var d, s;
    if (typeof i == "boolean" && ((d = navigator == null ? void 0 : navigator.mediaDevices) === null || d === void 0 ? void 0 : d.getSupportedConstraints().torch)) {
      const v = (s = l == null ? void 0 : l.current) === null || s === void 0 ? void 0 : s.video.srcObject, h = v == null ? void 0 : v.getVideoTracks()[0];
      h && h.getCapabilities().torch && !h.getConstraints().torch && h.applyConstraints({
        advanced: [{ torch: i }]
      }).catch((x) => r(x));
    }
  }, [i, r]), Ze.default.useEffect(() => {
    var d;
    if (f) {
      let s = (d = l == null ? void 0 : l.current) === null || d === void 0 ? void 0 : d.video.srcObject;
      s && (s.getTracks().forEach((v) => {
        s.removeTrack(v), v.stop();
      }), s = null);
    }
  }, [f]), Ze.default.useEffect(() => {
    const d = setInterval(c, o);
    return () => {
      clearInterval(d);
    };
  }, []), Ze.default.createElement(P2.default, { width: t, height: n, ref: l, screenshotFormat: "image/jpeg", videoConstraints: u || {
    facingMode: a
  }, audio: !1, onUserMediaError: e });
};
kn.default = b2;
var N2 = E && E.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty($n, "__esModule", { value: !0 });
const M2 = N2(kn);
var B2 = $n.default = M2.default;
const $2 = /* @__PURE__ */ S1({
  __proto__: null,
  default: B2
}, [$n]);
export {
  $2 as i
};
