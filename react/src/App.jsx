/*global chrome*/
import { useState, useEffect } from "react";
import QuickItems from "./components/QuickItems";

const App = () => {
  const [currentTabId, setCurrentTabId] = useState(false);
  const [intervalValue, setIntervalValue] = useState(420);

  const startAutoRefresh = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;
      chrome.runtime.getBackgroundPage((backgroundPage) => {
        backgroundPage.startRefresh(tabId, intervalValue);
        chrome.storage.local.get({ activeTabs: [] }, (result) => {
          const activeTabs = result.activeTabs;
          if (!activeTabs.includes(tabId)) {
            activeTabs.push(tabId);
            chrome.storage.local.set({ activeTabs });
          }
        });
      });
    });
    setCurrentTabId(true);
  };

  const stopAutoRefresh = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;
      chrome.runtime.getBackgroundPage((backgroundPage) => {
        backgroundPage.stopRefresh(tabId);

        // Remove the tabId from the array in chrome.storage
        chrome.storage.local.get({ activeTabs: [] }, (result) => {
          const activeTabs = result.activeTabs.filter((id) => id !== tabId);
          chrome.storage.local.set({ activeTabs });
        });
      });
    });
    setCurrentTabId(false);
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;
      chrome.storage.local.get({ activeTabs: [] }, (result) => {
        const activeTabs = result.activeTabs;
        if (activeTabs.includes(tabId)) {
          setCurrentTabId(true);
        }
      });
    });
  }, []);

  return (
    <div className="p-5 w-72">
      <p className="text-lg font-semibold">Refresh within seconds:</p>
      <div className="flex items-center gap-2 justify-between">
        <label>
          <input
            type="number"
            className="outline-0 border border-green-600 p-1 w-full"
            value={intervalValue}
            onChange={(event) => setIntervalValue(event.target.value)}
          />
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={currentTabId}
            className="sr-only peer"
            onChange={(event) => {
              if (event.target.checked) {
                startAutoRefresh();
              } else {
                stopAutoRefresh();
              }
            }}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      </div>
      <div className="mt-5">
        <p className="font-normal">Quick start:</p>
        <div className="flex flex-wrap justify-between gap-1 mt-1">
          <QuickItems setIntervalValue={setIntervalValue} min={5} />
          <QuickItems setIntervalValue={setIntervalValue} min={10} />
          <QuickItems setIntervalValue={setIntervalValue} min={15} />
          <QuickItems setIntervalValue={setIntervalValue} min={20} />
          <QuickItems setIntervalValue={setIntervalValue} min={25} />
          <QuickItems setIntervalValue={setIntervalValue} min={30} />
          <QuickItems setIntervalValue={setIntervalValue} min={35} />
          <QuickItems setIntervalValue={setIntervalValue} min={35} />
        </div>
      </div>
    </div>
  );
};

export default App;
