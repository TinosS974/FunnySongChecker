function TopSongsSection({ topSongs }) {
  if (!topSongs || topSongs.length === 0) {
    return <p>No top songs found.</p>;
  }

  return (
    <div className="p-8 mt-4 glass rounded-lg mx-auto">
      <h1 className="text-5xl font-bold mb-8 text-center text-white">
        Your Top Tracks
      </h1>
      <div className="grid grid-cols-4 gap-10">
        {topSongs.map((song, index) => (
          <div
            key={song.id}
            className="card bg-gray-900 hover:bg-gray-700 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4"
          >
            <div className="absolute top-2 left-2 text-white rounded-full px-3 py-1 text-md font-bold">
              #{index + 1}
            </div>
            <div className="avatar mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={song.album.images[0]?.url || "placeholder_image_url"}
                  alt={song.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <p className="text-center mt-2 text-white font-bold">{song.name}</p>
            <p className="text-sm text-center font-bold mt-1 text-gray-400">
              by {song.artists[0]?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSongsSection;
