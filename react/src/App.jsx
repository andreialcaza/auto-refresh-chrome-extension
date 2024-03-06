/*global chrome*/
import { useState, useEffect } from "react";
import Random from "./components/random";
import Fixed from "./components/fixed";
import Logo from "./assets/logo.png";
import Setting from "./assets/setting.svg";
import Arrow from "./assets/arrow.svg";

const App = () => {
  const [toggleUI, setToggleUI] = useState(true);

  const [currentRandomTabId, setCurrentRandomTabId] = useState(false);
  const [refreshFrom, setRefreshFrom] = useState(360);
  const [refreshTo, setRefreshTo] = useState(540);

  const [currentFixTabId, setCurrentFixTabId] = useState(false);
  const [intervalValue, setIntervalValue] = useState(600);

  const startRandomAutoRefresh = () => {
    if (refreshFrom > 0 && refreshTo > refreshFrom) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tabId = tabs[0].id;
        chrome.runtime.sendMessage({
          action: "startRefreshRandomly",
          tabId,
          refreshFrom,
          refreshTo,
        });
        chrome.storage.local.get({ activeTabs: [] }, (result) => {
          const activeTabs = result.activeTabs;
          if (!activeTabs.includes(tabId)) {
            const newObj = {
              tabId,
              system: "random",
              refreshFrom,
              refreshTo,
            };
            activeTabs.push(newObj);
            chrome.storage.local.set({ activeTabs });
          }
        });
      });
      setCurrentRandomTabId(true);
    }
  };

  const startFixAutoRefresh = () => {
    if (intervalValue > 0) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tabId = tabs[0].id;
        chrome.runtime.sendMessage({
          action: "startRefresh",
          tabId,
          intervalValue,
        });
        chrome.storage.local.get({ activeTabs: [] }, (result) => {
          const activeTabs = result.activeTabs;
          if (!activeTabs.includes(tabId)) {
            const newObj = {
              tabId,
              system: "fixed",
              intervalValue,
            };
            activeTabs.push(newObj);
            chrome.storage.local.set({ activeTabs });
          }
        });
      });
      setCurrentFixTabId(true);
    }
  };

  const stopAutoRefresh = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;
      chrome.runtime.sendMessage({ tabId, action: "stopRefresh" });
      chrome.storage.local.get({ activeTabs: [] }, (result) => {
        const activeTabs = result.activeTabs.filter((el) => el.tabId !== tabId);
        chrome.storage.local.set({ activeTabs });
      });
    });
    setCurrentRandomTabId(false);
    setCurrentFixTabId(false);
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;
      chrome.storage.local.get({ activeTabs: [] }, (result) => {
        const activeTabs = result.activeTabs;
        activeTabs.forEach((el) => {
          if (el.tabId === tabId && el.system === "fixed") {
            setCurrentRandomTabId(false);
            setCurrentFixTabId(true);
            setIntervalValue(el.intervalValue);
            setToggleUI(false);
          } else if (el.tabId === tabId && el.system === "random") {
            setCurrentRandomTabId(true);
            setCurrentFixTabId(false);
            setRefreshFrom(el.refreshFrom);
            setRefreshTo(el.refreshTo);
            setToggleUI(true);
          } else {
            setCurrentRandomTabId(false);
            setCurrentFixTabId(false);
          }
        });
      });
    });
  }, []);

  return (
    <div className="p-4 w-72">
      <div className="flex justify-between items-center border-b mb-5 pb-1">
        <div className="flex justify-between items-center gap-2">
          <img src={Logo} className="w-5" />
          <p className="text-lg font-medium">Easy Auto Refresh</p>
        </div>
        <img
          src={Arrow}
          className="w-5 cursor-pointer scale-down-button"
          onClick={() => setToggleUI(!toggleUI)}
        />
      </div>
      {toggleUI ? (
        <Random
          currentRandomTabId={currentRandomTabId}
          refreshFrom={refreshFrom}
          setRefreshFrom={setRefreshFrom}
          refreshTo={refreshTo}
          setRefreshTo={setRefreshTo}
          startRandomAutoRefresh={startRandomAutoRefresh}
          stopAutoRefresh={stopAutoRefresh}
        />
      ) : (
        <Fixed
          currentFixTabId={currentFixTabId}
          intervalValue={intervalValue}
          setIntervalValue={setIntervalValue}
          startFixAutoRefresh={startFixAutoRefresh}
          stopFixAutoRefresh={stopAutoRefresh}
        />
      )}
      <div className="mt-5 border-t pt-4">
        <img
          src={Setting}
          className="w-5 cursor-pointer scale-down-button ml-auto"
        />
        <p className="text-xs text-end">Features comming soon</p>
      </div>
    </div>
  );
};

export default App;
