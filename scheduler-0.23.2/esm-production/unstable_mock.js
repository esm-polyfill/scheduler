var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/scheduler-0.23.2/cjs/scheduler-unstable_mock.production.min.js
var require_scheduler_unstable_mock_production_min = __commonJS({
  "node_modules/scheduler-0.23.2/cjs/scheduler-unstable_mock.production.min.js"(exports) {
    "use strict";
    function f(a, b) {
      var c = a.length;
      a.push(b);
      a: for (; 0 < c; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
        else break a;
      }
    }
    function h(a) {
      return 0 === a.length ? null : a[0];
    }
    function k(a) {
      if (0 === a.length) return null;
      var b = a[0], c = a.pop();
      if (c !== b) {
        a[0] = c;
        a: for (var d = 0, e = a.length, D = e >>> 1; d < D; ) {
          var u = 2 * (d + 1) - 1, z = a[u], v = u + 1, E = a[v];
          if (0 > g(z, c)) v < e && 0 > g(E, z) ? (a[d] = E, a[v] = c, d = v) : (a[d] = z, a[u] = c, d = u);
          else if (v < e && 0 > g(E, c)) a[d] = E, a[v] = c, d = v;
          else break a;
        }
      }
      return b;
    }
    function g(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    var l = [];
    var m = [];
    var n = 1;
    var p = null;
    var q = 3;
    var r = false;
    var t = false;
    var w = false;
    var x = 0;
    var y = null;
    var A = null;
    var B = -1;
    var C = null;
    var F = -1;
    var G = false;
    var H = false;
    var I = false;
    var J = false;
    var K = false;
    function L(a) {
      for (var b = h(m); null !== b; ) {
        if (null === b.callback) k(m);
        else if (b.startTime <= a) k(m), b.sortIndex = b.expirationTime, f(l, b);
        else break;
        b = h(m);
      }
    }
    function M(a) {
      w = false;
      L(a);
      if (!t) if (null !== h(l)) t = true, y = N;
      else {
        var b = h(m);
        null !== b && (a = b.startTime - a, A = M, B = x + a);
      }
    }
    function N(a, b) {
      t = false;
      w && (w = false, A = null, B = -1);
      r = true;
      var c = q;
      try {
        L(b);
        for (p = h(l); null !== p && (!(p.expirationTime > b) || a && !O()); ) {
          var d = p.callback;
          if ("function" === typeof d) {
            p.callback = null;
            q = p.priorityLevel;
            var e = d(p.expirationTime <= b);
            b = x;
            "function" === typeof e ? p.callback = e : p === h(l) && k(l);
            L(b);
          } else k(l);
          p = h(l);
        }
        if (null !== p) var D = true;
        else {
          var u = h(m);
          if (null !== u) {
            var z = u.startTime - b;
            A = M;
            B = x + z;
          }
          D = false;
        }
        return D;
      } finally {
        p = null, q = c, r = false;
      }
    }
    function O() {
      return 0 === F && null === C || -1 !== F && null !== C && C.length >= F || J && I ? G = true : false;
    }
    function P() {
      if (H) throw Error("Already flushing work.");
      if (null !== y) {
        var a = y;
        H = true;
        try {
          var b = true;
          do
            b = a(true, x);
          while (b);
          b || (y = null);
          return true;
        } finally {
          H = false;
        }
      } else return false;
    }
    exports.reset = function() {
      if (H) throw Error("Cannot reset while already flushing work.");
      x = 0;
      A = y = null;
      B = -1;
      C = null;
      F = -1;
      I = H = G = false;
    };
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_advanceTime = function(a) {
      "disabledLog" === console.log.name || K || (x += a, null !== A && B <= x && (A(x), B = -1, A = null));
    };
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_clearYields = function() {
      if (null === C) return [];
      var a = C;
      C = null;
      return a;
    };
    exports.unstable_continueExecution = function() {
      t || r || (t = true, y = N);
    };
    exports.unstable_flushAll = function() {
      if (null !== C) throw Error("Log is not empty. Assert on the log of yielded values before flushing additional work.");
      P();
      if (null !== C) throw Error("While flushing work, something yielded a value. Use an assertion helper to assert on the log of yielded values, e.g. expect(Scheduler).toFlushAndYield([...])");
    };
    exports.unstable_flushAllWithoutAsserting = P;
    exports.unstable_flushExpired = function() {
      if (H) throw Error("Already flushing work.");
      if (null !== y) {
        H = true;
        try {
          y(false, x) || (y = null);
        } finally {
          H = false;
        }
      }
    };
    exports.unstable_flushNumberOfYields = function(a) {
      if (H) throw Error("Already flushing work.");
      if (null !== y) {
        var b = y;
        F = a;
        H = true;
        try {
          a = true;
          do
            a = b(true, x);
          while (a && !G);
          a || (y = null);
        } finally {
          F = -1, H = G = false;
        }
      }
    };
    exports.unstable_flushUntilNextPaint = function() {
      if (H) throw Error("Already flushing work.");
      if (null !== y) {
        var a = y;
        J = true;
        I = false;
        H = true;
        try {
          var b = true;
          do
            b = a(true, x);
          while (b && !G);
          b || (y = null);
        } finally {
          H = G = J = false;
        }
      }
    };
    exports.unstable_forceFrameRate = function() {
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return q;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h(l);
    };
    exports.unstable_next = function(a) {
      switch (q) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = q;
      }
      var c = q;
      q = b;
      try {
        return a();
      } finally {
        q = c;
      }
    };
    exports.unstable_now = function() {
      return x;
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
      I = true;
    };
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = q;
      q = a;
      try {
        return b();
      } finally {
        q = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = x;
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: n++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, f(m, a), null === h(l) && a === h(m) && (w ? (A = null, B = -1) : w = true, A = M, B = x + (c - d))) : (a.sortIndex = e, f(l, a), t || r || (t = true, y = N));
      return a;
    };
    exports.unstable_setDisableYieldValue = function(a) {
      K = a;
    };
    exports.unstable_shouldYield = O;
    exports.unstable_wrapCallback = function(a) {
      var b = q;
      return function() {
        var c = q;
        q = b;
        try {
          return a.apply(this, arguments);
        } finally {
          q = c;
        }
      };
    };
    exports.unstable_yieldValue = function(a) {
      "disabledLog" === console.log.name || K || (null === C ? C = [a] : C.push(a));
    };
  }
});

// node_modules/scheduler-0.23.2/unstable_mock.js
var require_unstable_mock = __commonJS({
  "node_modules/scheduler-0.23.2/unstable_mock.js"(exports, module) {
    if (true) {
      module.exports = require_scheduler_unstable_mock_production_min();
    } else {
      module.exports = null;
    }
  }
});
export default require_unstable_mock();
/*! Bundled license information:

scheduler-0.23.2/cjs/scheduler-unstable_mock.production.min.js:
  (**
   * @license React
   * scheduler-unstable_mock.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
