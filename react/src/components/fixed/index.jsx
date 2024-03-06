import QuickItems from "./QuickItems";
import InputField from "../InputField";
import SwitchButton from "../SwitchButton";

const quickItems = [5, 10, 15, 20, 25, 30, 35, 40];

const Index = ({
  currentFixTabId,
  intervalValue,
  setIntervalValue,
  startFixAutoRefresh,
  stopFixAutoRefresh,
}) => {
  return (
    <div>
      <form className="flex items-center gap-2 justify-between">
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
      </form>
      <div className="mt-5">
        <p className="font-normal">Quick start:</p>
        <div className="flex flex-wrap justify-between gap-1 mt-1">
          {quickItems.map((item) => (
            <QuickItems
              key={item}
              setIntervalValue={setIntervalValue}
              min={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
