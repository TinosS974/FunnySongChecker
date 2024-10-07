import Skeleton from "../Skeleton";

function TopArtistsSection({ topArtists, loading }) {
  if (loading) {
    return (
      <div className="p-8 mt-4 glass rounded-lg mx-auto">
        <h2 className="text-5xl font-bold mb-8 text-center text-white">
          Your Top Artists
        </h2>
        <div className="grid grid-cols-4 gap-10">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="card bg-gray-900 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4"
              >
                <Skeleton className="w-32 h-32 rounded-full mb-4" />
                <Skeleton className="w-3/4 h-6 mt-2" />
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
    <div className="p-8 mt-4 glass rounded-lg mx-auto">
      <h2 className="text-5xl font-bold mb-8 text-center text-white">
        Your Top Artists
      </h2>
      <div className="grid grid-cols-4 gap-10">
        {topArtists.map((artist, index) => (
          <div
            key={artist.id}
            className="card bg-gray-900 hover:bg-gray-700 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4 relative"
          >
            <div className="absolute top-2 left-2 text-white rounded-full px-3 py-1 text-md font-bold">
              #{index + 1}
            </div>
            <div className="avatar mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={artist.images[0]?.url || "placeholder_image_url"}
                  alt={artist.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <p className="text-center mt-2 text-white font-bold">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArtistsSection;
