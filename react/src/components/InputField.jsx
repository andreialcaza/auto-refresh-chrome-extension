const InputField = ({
  intervalValue,
  setIntervalValue,
  currentTab,
  placeholder,
  refreshFrom,
  refreshTo,
}) => {
  return (
    <label>
      <input
        type="number"
        className={`outline-0 border p-1 w-full rounded border-gray-600 ${
          (intervalValue > 0 && currentTab && "!border-green-600") ||
          (!intervalValue && "!border-red-600") ||
          (intervalValue <= 0 && "!border-red-600") ||
          (refreshFrom >= refreshTo && "!border-red-600")
        }`}
        required
        min={1}
        placeholder={placeholder}
        value={intervalValue}
        onChange={(event) =>
          setIntervalValue(event.target.value && Number(event.target.value))
        }
      />
    </label>
  );
};

export default InputField;
