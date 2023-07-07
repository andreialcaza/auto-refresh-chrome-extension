let refreshIntervals = {};

chrome.runtime.onMessage.addListener((message) => {
  const { action } = message;
  if (action === "startRefreshRandomly") {
    const { tabId, refreshFrom, refreshTo } = message;
    startRefreshRandomly(tabId, refreshFrom, refreshTo);
  } else if (action === "startRefresh") {
    const { tabId, intervalValue } = message;
    startRefresh(tabId, intervalValue);
  } else if (action === "stopRefresh") {
    const { tabId } = message;
    stopRefresh(tabId);
  }
});

function startRefreshRandomly(tabId, refreshFrom, refreshTo) {
  if (!refreshIntervals[tabId]) {
    let count = randomNumber(refreshFrom, refreshTo);
    refreshIntervals[tabId] = setInterval(() => {
      if (count > 0) {
        chrome.action.setBadgeText({
          text: count.toString(),
          tabId: tabId,
        });
        chrome.action.setBadgeBackgroundColor({
          color: "#047857",
          tabId: tabId,
        });
        count--;
      } else {
        chrome.tabs.reload(tabId, { bypassCache: false });
        chrome.action.setBadgeText({ text: "", tabId: tabId });
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
        chrome.action.setBadgeText({
          text: count.toString(),
          tabId: tabId,
        });
        chrome.action.setBadgeBackgroundColor({
          color: "#047857",
          tabId: tabId,
        });
        count--;
      } else {
        chrome.tabs.reload(tabId, { bypassCache: false });
        chrome.action.setBadgeText({ text: "", tabId: tabId });
        count = intervalValue;
      }
    }, 1000);
  }
}

function stopRefresh(tabId) {
  if (refreshIntervals[tabId]) {
    chrome.action.setBadgeText({ text: "", tabId: tabId });
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
