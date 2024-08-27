"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/scheduler-0.23.2/cjs/scheduler-unstable_post_task.development.js
var require_scheduler_unstable_post_task_development = __commonJS({
  "node_modules/scheduler-0.23.2/cjs/scheduler-unstable_post_task.development.js"(exports2) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        var perf = window.performance;
        var setTimeout = window.setTimeout;
        var scheduler = global.scheduler;
        var getCurrentTime = perf.now.bind(perf);
        var unstable_now = getCurrentTime;
        var yieldInterval = 5;
        var deadline = 0;
        var currentPriorityLevel_DEPRECATED = NormalPriority;
        function unstable_shouldYield() {
          return getCurrentTime() >= deadline;
        }
        function unstable_requestPaint() {
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
          var postTaskPriority;
          switch (priorityLevel) {
            case ImmediatePriority:
            case UserBlockingPriority:
              postTaskPriority = "user-blocking";
              break;
            case LowPriority:
            case NormalPriority:
              postTaskPriority = "user-visible";
              break;
            case IdlePriority:
              postTaskPriority = "background";
              break;
            default:
              postTaskPriority = "user-visible";
              break;
          }
          var controller = new TaskController();
          var postTaskOptions = {
            priority: postTaskPriority,
            delay: typeof options === "object" && options !== null ? options.delay : 0,
            signal: controller.signal
          };
          var node = {
            _controller: controller
          };
          scheduler.postTask(runTask.bind(null, priorityLevel, postTaskPriority, node, callback), postTaskOptions).catch(handleAbortError);
          return node;
        }
        function runTask(priorityLevel, postTaskPriority, node, callback) {
          deadline = getCurrentTime() + yieldInterval;
          try {
            currentPriorityLevel_DEPRECATED = priorityLevel;
            var _didTimeout_DEPRECATED = false;
            var result = callback(_didTimeout_DEPRECATED);
            if (typeof result === "function") {
              var continuation = result;
              var continuationController = new TaskController();
              var continuationOptions = {
                priority: postTaskPriority,
                signal: continuationController.signal
              };
              node._controller = continuationController;
              scheduler.postTask(runTask.bind(null, priorityLevel, postTaskPriority, node, continuation), continuationOptions).catch(handleAbortError);
            }
          } catch (error) {
            setTimeout(function() {
              throw error;
            });
          } finally {
            currentPriorityLevel_DEPRECATED = NormalPriority;
          }
        }
        function handleAbortError(error) {
        }
        function unstable_cancelCallback(node) {
          var controller = node._controller;
          controller.abort();
        }
        function unstable_runWithPriority(priorityLevel, callback) {
          var previousPriorityLevel = currentPriorityLevel_DEPRECATED;
          currentPriorityLevel_DEPRECATED = priorityLevel;
          try {
            return callback();
          } finally {
            currentPriorityLevel_DEPRECATED = previousPriorityLevel;
          }
        }
        function unstable_getCurrentPriorityLevel() {
          return currentPriorityLevel_DEPRECATED;
        }
        function unstable_next(callback) {
          var priorityLevel;
          switch (currentPriorityLevel_DEPRECATED) {
            case ImmediatePriority:
            case UserBlockingPriority:
            case NormalPriority:
              priorityLevel = NormalPriority;
              break;
            default:
              priorityLevel = currentPriorityLevel_DEPRECATED;
              break;
          }
          var previousPriorityLevel = currentPriorityLevel_DEPRECATED;
          currentPriorityLevel_DEPRECATED = priorityLevel;
          try {
            return callback();
          } finally {
            currentPriorityLevel_DEPRECATED = previousPriorityLevel;
          }
        }
        function unstable_wrapCallback(callback) {
          var parentPriorityLevel = currentPriorityLevel_DEPRECATED;
          return function() {
            var previousPriorityLevel = currentPriorityLevel_DEPRECATED;
            currentPriorityLevel_DEPRECATED = parentPriorityLevel;
            try {
              return callback();
            } finally {
              currentPriorityLevel_DEPRECATED = previousPriorityLevel;
            }
          };
        }
        function unstable_forceFrameRate() {
        }
        function unstable_pauseExecution() {
        }
        function unstable_continueExecution() {
        }
        function unstable_getFirstCallbackNode() {
          return null;
        }
        var unstable_Profiling = null;
        exports2.unstable_IdlePriority = IdlePriority;
        exports2.unstable_ImmediatePriority = ImmediatePriority;
        exports2.unstable_LowPriority = LowPriority;
        exports2.unstable_NormalPriority = NormalPriority;
        exports2.unstable_Profiling = unstable_Profiling;
        exports2.unstable_UserBlockingPriority = UserBlockingPriority;
        exports2.unstable_cancelCallback = unstable_cancelCallback;
        exports2.unstable_continueExecution = unstable_continueExecution;
        exports2.unstable_forceFrameRate = unstable_forceFrameRate;
        exports2.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports2.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports2.unstable_next = unstable_next;
        exports2.unstable_now = unstable_now;
        exports2.unstable_pauseExecution = unstable_pauseExecution;
        exports2.unstable_requestPaint = unstable_requestPaint;
        exports2.unstable_runWithPriority = unstable_runWithPriority;
        exports2.unstable_scheduleCallback = unstable_scheduleCallback;
        exports2.unstable_shouldYield = unstable_shouldYield;
        exports2.unstable_wrapCallback = unstable_wrapCallback;
      })();
    }
  }
});

// node_modules/scheduler-0.23.2/unstable_post_task.js
if (false) {
  module.exports = null;
} else {
  module.exports = require_scheduler_unstable_post_task_development();
}
/*! Bundled license information:

scheduler-0.23.2/cjs/scheduler-unstable_post_task.development.js:
  (**
   * @license React
   * scheduler-unstable_post_task.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
