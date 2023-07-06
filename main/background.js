let refreshIntervals = {};

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message === "startRefreshRandomly") {
    const { tabId, refreshFrom, refreshTo } = sender;
    startRefreshRandomly(tabId, refreshFrom, refreshTo);
  } else if (message === "startRefresh") {
    const { tabId, intervalValue } = sender;
    startRefresh(tabId, intervalValue);
  } else if (message === "stopRefresh") {
    const { tabId } = sender;
    stopRefresh(tabId);
  }
});

function startRefreshRandomly(tabId, refreshFrom, refreshTo) {
  if (!refreshIntervals[tabId]) {
    let count = randomNumber(refreshFrom, refreshTo);
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
        count = randomNumber(refreshFrom, refreshTo);
      }
    }, 1000);
  }
}

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

function randomNumber(min, max) {
  let result;
  result =
    Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) +
    parseInt(min);
  return result;
}
