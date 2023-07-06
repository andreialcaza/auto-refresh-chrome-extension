/*global chrome*/
import { useState, useEffect } from "react";
import InputField from "../InputField";
import SwitchButton from "../SwitchButton";

const Index = () => {
  const [currentTabId, setCurrentTabId] = useState(false);
  const [refreshFrom, setRefreshFrom] = useState(360);
  const [refreshTo, setRefreshTo] = useState(420);

  const startAutoRefresh = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;
      chrome.runtime.getBackgroundPage((backgroundPage) => {
        backgroundPage.startRefreshRandomly(tabId, refreshFrom, refreshTo);
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
    <div className="flex items-center gap-2 justify-between">
      <InputField
        intervalValue={refreshFrom}
        setIntervalValue={setRefreshFrom}
      />
      <InputField intervalValue={refreshTo} setIntervalValue={setRefreshTo} />
      <SwitchButton
        currentTabId={currentTabId}
        startAutoRefresh={startAutoRefresh}
        stopAutoRefresh={stopAutoRefresh}
      />
    </div>
  );
};

export default Index;
