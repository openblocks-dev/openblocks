export function cancelIdleCallback(handle: number) {
  if (window.cancelIdleCallback) {
    return window.cancelIdleCallback(handle);
  }
  return window.clearTimeout(handle);
}

export function requestIdleCallback(handler: IdleRequestCallback, options?: IdleRequestOptions) {
  if (window.requestIdleCallback) {
    return window.requestIdleCallback(handler, options);
  }

  const startTime = performance.now();
  return window.setTimeout(function () {
    handler({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50.0 - (performance.now() - startTime));
      },
    });
  }, options?.timeout || 1);
}
