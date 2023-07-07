const InputField = ({ intervalValue, setIntervalValue, currentTab }) => {
  return (
    <label>
      <input
        type="number"
        className={`outline-0 border p-1 w-full rounded ${
          currentTab ? "border-green-600" : "border-gray-600"
        }`}
        value={intervalValue}
        onChange={(event) => setIntervalValue(event.target.value)}
      />
    </label>
  );
};

export default InputField;
