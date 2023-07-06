const InputField = ({ intervalValue, setIntervalValue }) => {
  return (
    <label>
      <input
        type="number"
        className="outline-0 border border-green-600 p-1 w-full"
        value={intervalValue}
        onChange={(event) => setIntervalValue(event.target.value)}
      />
    </label>
  );
};

export default InputField;
