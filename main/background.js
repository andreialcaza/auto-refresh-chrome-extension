let refreshIntervals = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { tabId, interval } = sender;
  if (message === "startRefresh") {
    startRefresh(tabId, interval);
  } else if (message === "stopRefresh") {
    stopRefresh(tabId);
  }
});

function startRefresh(tabId, intervalValue) {
  if (!refreshIntervals[tabId]) {
    let count = intervalValue;
    refreshIntervals[tabId] = setInterval(() => {
      if (count > 0) {
        chrome.browserAction.setBadgeText({
          text: count.toString(),
          tabId: tabId,
        });
        chrome.browserAction.setBadgeBackgroundColor({
          color: "#047857",
          tabId: tabId,
        });
        count--;
      } else {
        chrome.tabs.reload(tabId, { bypassCache: true });
        chrome.browserAction.setBadgeText({ text: "", tabId: tabId });
        count = intervalValue;
      }
    }, 1000);
  }
}

function stopRefresh(tabId) {
  if (refreshIntervals[tabId]) {
    chrome.browserAction.setBadgeText({ text: "", tabId: tabId });
    clearInterval(refreshIntervals[tabId]);
    delete refreshIntervals[tabId];
  }
}
