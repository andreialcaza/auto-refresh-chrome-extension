const SwitchButton = ({ currentTabId, startAutoRefresh, stopAutoRefresh }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={currentTabId}
        className="sr-only peer"
        onChange={(event) => {
          if (event.target.checked) {
            stopAutoRefresh();
            startAutoRefresh();
          } else {
            stopAutoRefresh();
          }
        }}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
    </label>
  );
};

export default SwitchButton;
