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
    <form className="flex items-center gap-2 justify-between">
      <InputField
        intervalValue={refreshFrom}
        setIntervalValue={setRefreshFrom}
        currentTab={currentRandomTabId}
        placeholder="Min"
        refreshFrom={refreshFrom}
        refreshTo={refreshTo}
      />
      <InputField
        intervalValue={refreshTo}
        setIntervalValue={setRefreshTo}
        currentTab={currentRandomTabId}
        placeholder="Max"
        refreshFrom={refreshFrom}
        refreshTo={refreshTo}
      />
      <SwitchButton
        currentTabId={currentRandomTabId}
        startAutoRefresh={startRandomAutoRefresh}
        stopAutoRefresh={stopAutoRefresh}
      />
    </form>
  );
};

export default Index;
