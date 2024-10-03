import { useState, useEffect } from "react";
import axios from "axios";

function TopSongsSection() {
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const token = localStorage.getItem("spotifyToken");
        const response = await axios.get(
          "http://localhost:5000/api/spotify/user-top-tracks",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          setTopSongs(response.data.slice(0, 12)); // Limiter à 12 chansons
        } else {
          setTopSongs([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSongs();
  }, []);

  if (loading) return <p>Loading top songs...</p>;
  if (error) return <p>Error fetching top songs: {error.message}</p>;

  return (
    <div className="p-8 mt-4 bg-gradient-to-b from-gray-800 to-green-800 rounded-lg mx-auto">
      <h1 className="text-5xl font-bold mb-8 text-center text-white">
        Your Top Tracks
      </h1>
      <div className="grid grid-cols-4 gap-10">
        {topSongs.length > 0 ? (
          topSongs.map((song) => (
            <div
              key={song.id}
              className="card bg-gray-900 hover:bg-gray-700 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4"
            >
              <div className="avatar mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={song.album.images[0]?.url}
                    alt={song.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <p className="text-center mt-2 text-white font-bold">
                {song.name}
              </p>
              <p className="text-sm text-center font-bold mt-1 text-gray-400">
                by {song.artists[0]?.name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white">No songs found.</p>
        )}
      </div>
    </div>
  );
}

export default TopSongsSection;
