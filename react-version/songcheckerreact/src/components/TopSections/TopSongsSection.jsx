import Skeleton from "../Skeleton";

function TopSongsSection({ topSongs, loading }) {
  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 mt-4 glass rounded-lg mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center text-white">
          Your Top Tracks
        </h1>
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
                <Skeleton className="w-1/2 h-3 sm:h-4 md:h-4 lg:h-5 mt-2" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (!topSongs || topSongs.length === 0) {
    return <p>No top songs found.</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 mt-4 glass rounded-lg mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center text-white">
        Your Top Tracks
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {topSongs.map((song, index) => (
          <div
            key={song.id}
            className="card bg-gray-900 hover:bg-gray-700 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4"
          >
            <div className="absolute top-2 left-2 text-white rounded-full px-2 text-xs sm:text-sm font-bold">
              #{index + 1}
            </div>
            <div className="avatar mb-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden">
                <img
                  src={song.album.images[0]?.url || "placeholder_image_url"}
                  alt={song.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <p className="text-center mt-2 text-xs sm:text-sm md:text-base text-white font-bold">
              {song.name}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-center font-bold mt-1 text-gray-400">
              by {song.artists[0]?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSongsSection;
