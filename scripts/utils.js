function waitForCondition(condition, callback) {
  const observer = new MutationObserver((mutationsList, observer) => {
    if (condition()) {
      observer.disconnect();
      callback();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  if (condition()) {
    observer.disconnect();
    callback();
  }
}

function isPaused() {
  if (document.querySelector(".stop-button")) {
    return document
      .querySelector(".stop-button")
      .classList.contains("disabled");
  }
  return false;
}

function isNotPaused() {
  return !isPaused();
}
