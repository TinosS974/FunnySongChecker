import Skeleton from "../Skeleton";
import TimeRangeSelector from "../TimeRangeSelector";

function TopArtistsSection({ topArtists, loading, timeRange, setTimeRange }) {
  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 mt-4 glass rounded-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mx-auto w-full mt-6">
            Your Top Artists
          </h1>
          <TimeRangeSelector
            selectedRange={timeRange}
            setSelectedRange={setTimeRange}
            className="ml-auto"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="card bg-gray-900 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4"
              >
                <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full mb-2" />
                <Skeleton className="w-3/4 h-4 sm:h-5 md:h-5 lg:h-6 mt-2" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (!topArtists || topArtists.length === 0) {
    return <p>No top artists found.</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 mt-4 glass rounded-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center flex-grow">
          Your Top Artists
        </h2>
        <TimeRangeSelector
          selectedRange={timeRange}
          setSelectedRange={setTimeRange}
          className="ml-4"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {topArtists.map((artist, index) => (
          <div
            key={artist.id}
            className="card bg-gray-900 hover:bg-gray-700 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4 relative"
          >
            <div className="absolute top-2 left-2 text-white rounded-full px-2 text-xs sm:text-sm font-bold">
              #{index + 1}
            </div>
            <div className="avatar mb-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden">
                <img
                  src={artist.images[0]?.url || "placeholder_image_url"}
                  alt={artist.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <p className="text-center mt-2 text-xs sm:text-sm md:text-base text-white font-bold">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArtistsSection;
