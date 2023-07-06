/*global chrome*/
import { useState, useEffect } from "react";
import Random from "./components/random";
import Fixed from "./components/fixed";

const App = () => {
  const [toggleUI, setToggleUI] = useState(true);

  const [currentRandomTabId, setCurrentRandomTabId] = useState(false);
  const [refreshFrom, setRefreshFrom] = useState(360);
  const [refreshTo, setRefreshTo] = useState(540);

  const [currentFixTabId, setCurrentFixTabId] = useState(false);
  const [intervalValue, setIntervalValue] = useState(420);

  const startRandomAutoRefresh = () => {
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
          };
          activeTabs.push(newObj);
          chrome.storage.local.set({ activeTabs });
        }
      });
    });
    setCurrentRandomTabId(true);
  };

  const startFixAutoRefresh = () => {
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
          };
          activeTabs.push(newObj);
          chrome.storage.local.set({ activeTabs });
        }
      });
    });
    setCurrentFixTabId(true);
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
          } else if (el.tabId === tabId && el.system === "random") {
            setCurrentRandomTabId(true);
            setCurrentFixTabId(false);
          } else {
            setCurrentRandomTabId(false);
            setCurrentFixTabId(false);
          }
        });
      });
    });
  }, []);

  return (
    <div className="p-5 w-72">
      <p className="text-lg font-semibold">Refresh within seconds:</p>
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
      <p
        className="text-right cursor-pointer font-light underline mt-5"
        onClick={() => setToggleUI(!toggleUI)}
      >
        {toggleUI ? "Fixed" : "Random"}
      </p>
    </div>
  );
};

export default App;
