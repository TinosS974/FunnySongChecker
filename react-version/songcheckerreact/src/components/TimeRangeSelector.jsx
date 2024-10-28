function TimeRangeSelector({ selectedRange, setSelectedRange }) {
  const ranges = [
    { label: "4w", value: "short_term" },
    { label: "6m", value: "medium_term" },
    { label: "1y", value: "long_term" },
  ];

  return (
    <div className="flex justify-center mb-4">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => setSelectedRange(range.value)}
          className={`mx-2 px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ${
            selectedRange === range.value
              ? "bg-blue-500 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}

export default TimeRangeSelector;
