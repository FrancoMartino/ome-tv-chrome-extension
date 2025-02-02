const welcomeMessageInput = document.getElementById("welcomeMessageInput");

chrome.storage.sync.get(["welcomeMessage"], (result) => {
  if (result.welcomeMessage) {
    welcomeMessageInput.value = result.welcomeMessage;
  }
});

welcomeMessageInput.addEventListener("input", () => {
  chrome.storage.sync.set({ welcomeMessage: welcomeMessageInput.value });
});
