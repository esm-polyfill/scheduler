var schedulerUnstable_mock_development = {};

/**
 * @license React
 * scheduler-unstable_mock.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var unstable_yieldValue_1;
var unstable_wrapCallback_1;
var unstable_shouldYield;
var unstable_setDisableYieldValue;
var unstable_scheduleCallback_1;
var unstable_runWithPriority_1;
var unstable_requestPaint;
var unstable_pauseExecution_1;
var unstable_now;
var unstable_next_1;
var unstable_getFirstCallbackNode_1;
var unstable_getCurrentPriorityLevel_1;
var unstable_forceFrameRate;
var unstable_flushUntilNextPaint_1;
var unstable_flushNumberOfYields_1;
var unstable_flushExpired_1;
var unstable_flushAllWithoutAsserting_1;
var unstable_flushAll_1;
var unstable_continueExecution_1;
var unstable_clearYields_1;
var unstable_cancelCallback_1;
var unstable_advanceTime_1;
var unstable_UserBlockingPriority;
var unstable_Profiling_1;
var unstable_NormalPriority;
var unstable_LowPriority;
var unstable_ImmediatePriority;
var unstable_IdlePriority;
var reset_1;

{
  (function() {

var enableSchedulerDebugging = false;
var enableProfiling = false;

function push(heap, node) {
  var index = heap.length;
  heap.push(node);
  siftUp(heap, node, index);
}
function peek(heap) {
  return heap.length === 0 ? null : heap[0];
}
function pop(heap) {
  if (heap.length === 0) {
    return null;
  }

  var first = heap[0];
  var last = heap.pop();

  if (last !== first) {
    heap[0] = last;
    siftDown(heap, last, 0);
  }

  return first;
}

function siftUp(heap, node, i) {
  var index = i;

  while (index > 0) {
    var parentIndex = index - 1 >>> 1;
    var parent = heap[parentIndex];

    if (compare(parent, node) > 0) {
      // The parent is larger. Swap positions.
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      // The parent is smaller. Exit.
      return;
    }
  }
}

function siftDown(heap, node, i) {
  var index = i;
  var length = heap.length;
  var halfLength = length >>> 1;

  while (index < halfLength) {
    var leftIndex = (index + 1) * 2 - 1;
    var left = heap[leftIndex];
    var rightIndex = leftIndex + 1;
    var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.

    if (compare(left, node) < 0) {
      if (rightIndex < length && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (rightIndex < length && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // Neither child is smaller. Exit.
      return;
    }
  }
}

function compare(a, b) {
  // Compare sort index first, then task id.
  var diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}

// TODO: Use symbols?
var ImmediatePriority = 1;
var UserBlockingPriority = 2;
var NormalPriority = 3;
var LowPriority = 4;
var IdlePriority = 5;

function markTaskErrored(task, ms) {
}

/* eslint-disable no-var */
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111

var maxSigned31BitInt = 1073741823; // Times out immediately

var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out

var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000; // Never times out

var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap

var taskQueue = [];
var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.

var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
var currentTask = null;
var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrance.

var isPerformingWork = false;
var isHostCallbackScheduled = false;
var isHostTimeoutScheduled = false;
var currentMockTime = 0;
var scheduledCallback = null;
var scheduledTimeout = null;
var timeoutTime = -1;
var yieldedValues = null;
var expectedNumberOfYields = -1;
var didStop = false;
var isFlushing = false;
var needsPaint = false;
var shouldYieldForPaint = false;
var disableYieldValue = false;

function setDisableYieldValue(newValue) {
  disableYieldValue = newValue;
}

function advanceTimers(currentTime) {
  // Check for tasks that are no longer delayed and add them to the queue.
  var timer = peek(timerQueue);

  while (timer !== null) {
    if (timer.callback === null) {
      // Timer was cancelled.
      pop(timerQueue);
    } else if (timer.startTime <= currentTime) {
      // Timer fired. Transfer to the task queue.
      pop(timerQueue);
      timer.sortIndex = timer.expirationTime;
      push(taskQueue, timer);
    } else {
      // Remaining timers are pending.
      return;
    }

    timer = peek(timerQueue);
  }
}

function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false;
  advanceTimers(currentTime);

  if (!isHostCallbackScheduled) {
    if (peek(taskQueue) !== null) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    } else {
      var firstTimer = peek(timerQueue);

      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
    }
  }
}

function flushWork(hasTimeRemaining, initialTime) {


  isHostCallbackScheduled = false;

  if (isHostTimeoutScheduled) {
    // We scheduled a timeout but it's no longer needed. Cancel it.
    isHostTimeoutScheduled = false;
    cancelHostTimeout();
  }

  isPerformingWork = true;
  var previousPriorityLevel = currentPriorityLevel;

  try {
    var currentTime; if (enableProfiling) ; else {
      // No catch in prod code path.
      return workLoop(hasTimeRemaining, initialTime);
    }
  } finally {
    currentTask = null;
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;
  }
}

function workLoop(hasTimeRemaining, initialTime) {
  var currentTime = initialTime;
  advanceTimers(currentTime);
  currentTask = peek(taskQueue);

  while (currentTask !== null && !(enableSchedulerDebugging )) {
    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
      // This currentTask hasn't expired, and we've reached the deadline.
      break;
    }

    var callback = currentTask.callback;

    if (typeof callback === 'function') {
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel;
      var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;

      var continuationCallback = callback(didUserCallbackTimeout);
      currentTime = getCurrentTime();

      if (typeof continuationCallback === 'function') {
        currentTask.callback = continuationCallback;
      } else {

        if (currentTask === peek(taskQueue)) {
          pop(taskQueue);
        }
      }

      advanceTimers(currentTime);
    } else {
      pop(taskQueue);
    }

    currentTask = peek(taskQueue);
  } // Return whether there's additional work


  if (currentTask !== null) {
    return true;
  } else {
    var firstTimer = peek(timerQueue);

    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }

    return false;
  }
}

function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;

    default:
      priorityLevel = NormalPriority;
  }

  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}

function unstable_next(eventHandler) {
  var priorityLevel;

  switch (currentPriorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
      // Shift down to normal priority
      priorityLevel = NormalPriority;
      break;

    default:
      // Anything lower than normal priority should remain at the current level.
      priorityLevel = currentPriorityLevel;
      break;
  }

  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}

function unstable_wrapCallback(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function () {
    // This is a fork of runWithPriority, inlined for performance.
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;

    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
}

function unstable_scheduleCallback(priorityLevel, callback, options) {
  var currentTime = getCurrentTime();
  var startTime;

  if (typeof options === 'object' && options !== null) {
    var delay = options.delay;

    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }
  } else {
    startTime = currentTime;
  }

  var timeout;

  switch (priorityLevel) {
    case ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT;
      break;

    case UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
      break;

    case IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT;
      break;

    case LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT;
      break;

    case NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT;
      break;
  }

  var expirationTime = startTime + timeout;
  var newTask = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: startTime,
    expirationTime: expirationTime,
    sortIndex: -1
  };

  if (startTime > currentTime) {
    // This is a delayed task.
    newTask.sortIndex = startTime;
    push(timerQueue, newTask);

    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // All tasks are delayed, and this is the task with the earliest delay.
      if (isHostTimeoutScheduled) {
        // Cancel an existing timeout.
        cancelHostTimeout();
      } else {
        isHostTimeoutScheduled = true;
      } // Schedule a timeout.


      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);
    // wait until the next time we yield.


    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  return newTask;
}

function unstable_pauseExecution() {
}

function unstable_continueExecution() {

  if (!isHostCallbackScheduled && !isPerformingWork) {
    isHostCallbackScheduled = true;
    requestHostCallback(flushWork);
  }
}

function unstable_getFirstCallbackNode() {
  return peek(taskQueue);
}

function unstable_cancelCallback(task) {
  // remove from the queue because you can't remove arbitrary nodes from an
  // array based heap, only the first one.)


  task.callback = null;
}

function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel;
}

function requestHostCallback(callback) {
  scheduledCallback = callback;
}

function requestHostTimeout(callback, ms) {
  scheduledTimeout = callback;
  timeoutTime = currentMockTime + ms;
}

function cancelHostTimeout() {
  scheduledTimeout = null;
  timeoutTime = -1;
}

function shouldYieldToHost() {
  if (expectedNumberOfYields === 0 && yieldedValues === null || expectedNumberOfYields !== -1 && yieldedValues !== null && yieldedValues.length >= expectedNumberOfYields || shouldYieldForPaint && needsPaint) {
    // We yielded at least as many values as expected. Stop flushing.
    didStop = true;
    return true;
  }

  return false;
}

function getCurrentTime() {
  return currentMockTime;
}

function forceFrameRate() {// No-op
}

function reset() {
  if (isFlushing) {
    throw new Error('Cannot reset while already flushing work.');
  }

  currentMockTime = 0;
  scheduledCallback = null;
  scheduledTimeout = null;
  timeoutTime = -1;
  yieldedValues = null;
  expectedNumberOfYields = -1;
  didStop = false;
  isFlushing = false;
  needsPaint = false;
} // Should only be used via an assertion helper that inspects the yielded values.


function unstable_flushNumberOfYields(count) {
  if (isFlushing) {
    throw new Error('Already flushing work.');
  }

  if (scheduledCallback !== null) {
    var cb = scheduledCallback;
    expectedNumberOfYields = count;
    isFlushing = true;

    try {
      var hasMoreWork = true;

      do {
        hasMoreWork = cb(true, currentMockTime);
      } while (hasMoreWork && !didStop);

      if (!hasMoreWork) {
        scheduledCallback = null;
      }
    } finally {
      expectedNumberOfYields = -1;
      didStop = false;
      isFlushing = false;
    }
  }
}

function unstable_flushUntilNextPaint() {
  if (isFlushing) {
    throw new Error('Already flushing work.');
  }

  if (scheduledCallback !== null) {
    var cb = scheduledCallback;
    shouldYieldForPaint = true;
    needsPaint = false;
    isFlushing = true;

    try {
      var hasMoreWork = true;

      do {
        hasMoreWork = cb(true, currentMockTime);
      } while (hasMoreWork && !didStop);

      if (!hasMoreWork) {
        scheduledCallback = null;
      }
    } finally {
      shouldYieldForPaint = false;
      didStop = false;
      isFlushing = false;
    }
  }
}

function unstable_flushExpired() {
  if (isFlushing) {
    throw new Error('Already flushing work.');
  }

  if (scheduledCallback !== null) {
    isFlushing = true;

    try {
      var hasMoreWork = scheduledCallback(false, currentMockTime);

      if (!hasMoreWork) {
        scheduledCallback = null;
      }
    } finally {
      isFlushing = false;
    }
  }
}

function unstable_flushAllWithoutAsserting() {
  // Returns false if no work was flushed.
  if (isFlushing) {
    throw new Error('Already flushing work.');
  }

  if (scheduledCallback !== null) {
    var cb = scheduledCallback;
    isFlushing = true;

    try {
      var hasMoreWork = true;

      do {
        hasMoreWork = cb(true, currentMockTime);
      } while (hasMoreWork);

      if (!hasMoreWork) {
        scheduledCallback = null;
      }

      return true;
    } finally {
      isFlushing = false;
    }
  } else {
    return false;
  }
}

function unstable_clearYields() {
  if (yieldedValues === null) {
    return [];
  }

  var values = yieldedValues;
  yieldedValues = null;
  return values;
}

function unstable_flushAll() {
  if (yieldedValues !== null) {
    throw new Error('Log is not empty. Assert on the log of yielded values before ' + 'flushing additional work.');
  }

  unstable_flushAllWithoutAsserting();

  if (yieldedValues !== null) {
    throw new Error('While flushing work, something yielded a value. Use an ' + 'assertion helper to assert on the log of yielded values, e.g. ' + 'expect(Scheduler).toFlushAndYield([...])');
  }
}

function unstable_yieldValue(value) {
  // eslint-disable-next-line react-internal/no-production-logging
  if (console.log.name === 'disabledLog' || disableYieldValue) {
    // If console.log has been patched, we assume we're in render
    // replaying and we ignore any values yielding in the second pass.
    return;
  }

  if (yieldedValues === null) {
    yieldedValues = [value];
  } else {
    yieldedValues.push(value);
  }
}

function unstable_advanceTime(ms) {
  // eslint-disable-next-line react-internal/no-production-logging
  if (console.log.name === 'disabledLog' || disableYieldValue) {
    // If console.log has been patched, we assume we're in render
    // replaying and we ignore any time advancing in the second pass.
    return;
  }

  currentMockTime += ms;

  if (scheduledTimeout !== null && timeoutTime <= currentMockTime) {
    scheduledTimeout(currentMockTime);
    timeoutTime = -1;
    scheduledTimeout = null;
  }
}

function requestPaint() {
  needsPaint = true;
}
var unstable_Profiling =  null;

reset_1 = schedulerUnstable_mock_development.reset = reset;
unstable_IdlePriority = schedulerUnstable_mock_development.unstable_IdlePriority = IdlePriority;
unstable_ImmediatePriority = schedulerUnstable_mock_development.unstable_ImmediatePriority = ImmediatePriority;
unstable_LowPriority = schedulerUnstable_mock_development.unstable_LowPriority = LowPriority;
unstable_NormalPriority = schedulerUnstable_mock_development.unstable_NormalPriority = NormalPriority;
unstable_Profiling_1 = schedulerUnstable_mock_development.unstable_Profiling = unstable_Profiling;
unstable_UserBlockingPriority = schedulerUnstable_mock_development.unstable_UserBlockingPriority = UserBlockingPriority;
unstable_advanceTime_1 = schedulerUnstable_mock_development.unstable_advanceTime = unstable_advanceTime;
unstable_cancelCallback_1 = schedulerUnstable_mock_development.unstable_cancelCallback = unstable_cancelCallback;
unstable_clearYields_1 = schedulerUnstable_mock_development.unstable_clearYields = unstable_clearYields;
unstable_continueExecution_1 = schedulerUnstable_mock_development.unstable_continueExecution = unstable_continueExecution;
unstable_flushAll_1 = schedulerUnstable_mock_development.unstable_flushAll = unstable_flushAll;
unstable_flushAllWithoutAsserting_1 = schedulerUnstable_mock_development.unstable_flushAllWithoutAsserting = unstable_flushAllWithoutAsserting;
unstable_flushExpired_1 = schedulerUnstable_mock_development.unstable_flushExpired = unstable_flushExpired;
unstable_flushNumberOfYields_1 = schedulerUnstable_mock_development.unstable_flushNumberOfYields = unstable_flushNumberOfYields;
unstable_flushUntilNextPaint_1 = schedulerUnstable_mock_development.unstable_flushUntilNextPaint = unstable_flushUntilNextPaint;
unstable_forceFrameRate = schedulerUnstable_mock_development.unstable_forceFrameRate = forceFrameRate;
unstable_getCurrentPriorityLevel_1 = schedulerUnstable_mock_development.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
unstable_getFirstCallbackNode_1 = schedulerUnstable_mock_development.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
unstable_next_1 = schedulerUnstable_mock_development.unstable_next = unstable_next;
unstable_now = schedulerUnstable_mock_development.unstable_now = getCurrentTime;
unstable_pauseExecution_1 = schedulerUnstable_mock_development.unstable_pauseExecution = unstable_pauseExecution;
unstable_requestPaint = schedulerUnstable_mock_development.unstable_requestPaint = requestPaint;
unstable_runWithPriority_1 = schedulerUnstable_mock_development.unstable_runWithPriority = unstable_runWithPriority;
unstable_scheduleCallback_1 = schedulerUnstable_mock_development.unstable_scheduleCallback = unstable_scheduleCallback;
unstable_setDisableYieldValue = schedulerUnstable_mock_development.unstable_setDisableYieldValue = setDisableYieldValue;
unstable_shouldYield = schedulerUnstable_mock_development.unstable_shouldYield = shouldYieldToHost;
unstable_wrapCallback_1 = schedulerUnstable_mock_development.unstable_wrapCallback = unstable_wrapCallback;
unstable_yieldValue_1 = schedulerUnstable_mock_development.unstable_yieldValue = unstable_yieldValue;
  })();
}

export { schedulerUnstable_mock_development as default, reset_1 as reset, unstable_IdlePriority, unstable_ImmediatePriority, unstable_LowPriority, unstable_NormalPriority, unstable_Profiling_1 as unstable_Profiling, unstable_UserBlockingPriority, unstable_advanceTime_1 as unstable_advanceTime, unstable_cancelCallback_1 as unstable_cancelCallback, unstable_clearYields_1 as unstable_clearYields, unstable_continueExecution_1 as unstable_continueExecution, unstable_flushAll_1 as unstable_flushAll, unstable_flushAllWithoutAsserting_1 as unstable_flushAllWithoutAsserting, unstable_flushExpired_1 as unstable_flushExpired, unstable_flushNumberOfYields_1 as unstable_flushNumberOfYields, unstable_flushUntilNextPaint_1 as unstable_flushUntilNextPaint, unstable_forceFrameRate, unstable_getCurrentPriorityLevel_1 as unstable_getCurrentPriorityLevel, unstable_getFirstCallbackNode_1 as unstable_getFirstCallbackNode, unstable_next_1 as unstable_next, unstable_now, unstable_pauseExecution_1 as unstable_pauseExecution, unstable_requestPaint, unstable_runWithPriority_1 as unstable_runWithPriority, unstable_scheduleCallback_1 as unstable_scheduleCallback, unstable_setDisableYieldValue, unstable_shouldYield, unstable_wrapCallback_1 as unstable_wrapCallback, unstable_yieldValue_1 as unstable_yieldValue };
