var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/scheduler-0.23.2/cjs/scheduler-unstable_post_task.production.min.js
var require_scheduler_unstable_post_task_production_min = __commonJS({
  "node_modules/scheduler-0.23.2/cjs/scheduler-unstable_post_task.production.min.js"(exports) {
    "use strict";
    var a = window.performance;
    var g = window.setTimeout;
    var h = global.scheduler;
    var k = a.now.bind(a);
    var l = 0;
    var m = 3;
    function p(c, d, b, f) {
      l = k() + 5;
      try {
        m = c;
        var e = f(false);
        if ("function" === typeof e) {
          var n = new TaskController(), r = { priority: d, signal: n.signal };
          b._controller = n;
          h.postTask(p.bind(null, c, d, b, e), r).catch(q);
        }
      } catch (t) {
        g(function() {
          throw t;
        });
      } finally {
        m = 3;
      }
    }
    function q() {
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(c) {
      c._controller.abort();
    };
    exports.unstable_continueExecution = function() {
    };
    exports.unstable_forceFrameRate = function() {
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return m;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return null;
    };
    exports.unstable_next = function(c) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var d = 3;
          break;
        default:
          d = m;
      }
      var b = m;
      m = d;
      try {
        return c();
      } finally {
        m = b;
      }
    };
    exports.unstable_now = k;
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(c, d) {
      var b = m;
      m = c;
      try {
        return d();
      } finally {
        m = b;
      }
    };
    exports.unstable_scheduleCallback = function(c, d, b) {
      switch (c) {
        case 1:
        case 2:
          var f = "user-blocking";
          break;
        case 4:
        case 3:
          f = "user-visible";
          break;
        case 5:
          f = "background";
          break;
        default:
          f = "user-visible";
      }
      var e = new TaskController();
      b = { priority: f, delay: "object" === typeof b && null !== b ? b.delay : 0, signal: e.signal };
      e = { _controller: e };
      h.postTask(p.bind(null, c, f, e, d), b).catch(q);
      return e;
    };
    exports.unstable_shouldYield = function() {
      return k() >= l;
    };
    exports.unstable_wrapCallback = function(c) {
      var d = m;
      return function() {
        var b = m;
        m = d;
        try {
          return c();
        } finally {
          m = b;
        }
      };
    };
  }
});

// node_modules/scheduler-0.23.2/unstable_post_task.js
var require_unstable_post_task = __commonJS({
  "node_modules/scheduler-0.23.2/unstable_post_task.js"(exports, module) {
    if (true) {
      module.exports = require_scheduler_unstable_post_task_production_min();
    } else {
      module.exports = null;
    }
  }
});
export default require_unstable_post_task();
/*! Bundled license information:

scheduler-0.23.2/cjs/scheduler-unstable_post_task.production.min.js:
  (**
   * @license React
   * scheduler-unstable_post_task.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
