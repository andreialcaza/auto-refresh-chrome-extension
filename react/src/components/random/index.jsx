import InputField from "../InputField";
import SwitchButton from "../SwitchButton";

const Index = ({
  currentRandomTabId,
  refreshFrom,
  setRefreshFrom,
  refreshTo,
  setRefreshTo,
  startRandomAutoRefresh,
  stopAutoRefresh,
}) => {
  return (
    <div className="flex items-center gap-2 justify-between">
      <InputField
        intervalValue={refreshFrom}
        setIntervalValue={setRefreshFrom}
        currentTab={currentRandomTabId}
        placeholder="From"
      />
      <InputField
        intervalValue={refreshTo}
        setIntervalValue={setRefreshTo}
        currentTab={currentRandomTabId}
        placeholder="To"
      />
      <SwitchButton
        currentTabId={currentRandomTabId}
        startAutoRefresh={startRandomAutoRefresh}
        stopAutoRefresh={stopAutoRefresh}
      />
    </div>
  );
};

export default Index;
