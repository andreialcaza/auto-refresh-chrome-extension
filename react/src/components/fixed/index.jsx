import QuickItems from "./QuickItems";
import InputField from "../InputField";
import SwitchButton from "../SwitchButton";

const Index = ({
  currentFixTabId,
  intervalValue,
  setIntervalValue,
  startFixAutoRefresh,
  stopFixAutoRefresh,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 justify-between">
        <InputField
          intervalValue={intervalValue}
          setIntervalValue={setIntervalValue}
          currentTab={currentFixTabId}
          placeholder="Intervals"
        />
        <SwitchButton
          currentTabId={currentFixTabId}
          startAutoRefresh={startFixAutoRefresh}
          stopAutoRefresh={stopFixAutoRefresh}
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
