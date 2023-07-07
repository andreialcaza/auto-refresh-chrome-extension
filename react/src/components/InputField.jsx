const InputField = ({
  intervalValue,
  setIntervalValue,
  currentTab,
  placeholder,
}) => {
  return (
    <label>
      <input
        type="number"
        className={`outline-0 border p-1 w-full rounded ${
          currentTab ? "border-green-600" : "border-gray-600"
        }`}
        required
        placeholder={placeholder}
        value={intervalValue}
        onChange={(event) => setIntervalValue(event.target.value)}
      />
    </label>
  );
};

export default InputField;
