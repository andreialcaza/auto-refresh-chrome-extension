const QuickItems = ({ setIntervalValue, min }) => {
  return (
    <p
      className="border rounded w-14 text-center py-1 font-light hover:bg-green-600 hover:text-white cursor-pointer shadow-sm"
      onClick={() => setIntervalValue(min * 60)}
    >
      {min}min
    </p>
  );
};

export default QuickItems;
