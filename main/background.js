let refreshIntervals = {};

chrome.runtime.onMessage.addListener((message) => {
  const { action } = message;
  if (action === "startRefreshRandomly") {
    const { tabId, refreshFrom, refreshTo } = message;
    reloadHandler(tabId);
    startRefreshRandomly(tabId, refreshFrom, refreshTo);
  } else if (action === "startRefresh") {
    const { tabId, intervalValue } = message;
    reloadHandler(tabId);
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
        badgeHander(count, tabId);
        count--;
      } else {
        reloadHandler(tabId);
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
        badgeHander(count, tabId);
        count--;
      } else {
        reloadHandler(tabId);
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

// helpers
function badgeHander(count, tabId) {
  chrome.action.setBadgeText({
    text: count.toString(),
    tabId: tabId,
  });
  chrome.action.setBadgeBackgroundColor({
    color: "#047857",
    tabId: tabId,
  });
}

function reloadHandler(tabId) {
  chrome.tabs.reload(tabId, { bypassCache: false });
  chrome.action.setBadgeText({ text: "", tabId: tabId });
}

function randomNumber(min, max) {
  let result;
  result =
    Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) +
    parseInt(min);
  return result;
}
