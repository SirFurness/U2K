href = window.location.href;
chrome.runtime.sendMessage({"message": "u2k", "url": href});
