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
      />
      <InputField
        intervalValue={refreshTo}
        setIntervalValue={setRefreshTo}
        currentTab={currentRandomTabId}
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
