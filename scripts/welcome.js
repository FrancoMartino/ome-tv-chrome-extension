// This is for welcome messages

function sendMessage(message) {
  const input = document.querySelector("#chat-text");
  input.value = message;
  input.dispatchEvent(
    new KeyboardEvent("keydown", { key: "Enter", keyCode: 13, bubbles: true })
  );
}

function startSendingMessage() {
  waitForCondition(canSendMessage, () => {
    setTimeout(() => {
      chrome.storage.sync.get(["welcomeMessage"], (result) => {
        if (result.welcomeMessage) {
          sendMessage(result.welcomeMessage);
          waitForCondition(canNotSendMessage, () => {
            startSendingMessage();
          });
        }
      });
    }, 200);
  });
}

function canSendMessage() {
  return (
    !document.querySelector(".start-button").classList.contains("disabled") &&
    !document.querySelector(".stop-button").classList.contains("disabled")
  );
}

function canNotSendMessage() {
  return document.querySelector(".start-button").classList.contains("disabled");
}

waitForCondition(isNotPaused, () => {
  startSendingMessage();
});
