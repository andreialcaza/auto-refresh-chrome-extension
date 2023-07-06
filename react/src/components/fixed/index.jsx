/*global chrome*/
import { useState, useEffect } from "react";
import QuickItems from "./QuickItems";
import InputField from "../InputField";
import SwitchButton from "../SwitchButton";

const Index = () => {
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
    <div>
      <div className="flex items-center gap-2 justify-between">
        <InputField
          intervalValue={intervalValue}
          setIntervalValue={setIntervalValue}
        />
        <SwitchButton
          currentTabId={currentTabId}
          startAutoRefresh={startAutoRefresh}
          stopAutoRefresh={stopAutoRefresh}
        />
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

export default Index;
