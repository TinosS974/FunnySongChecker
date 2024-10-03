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
    <div className="w-full p-8 bg-gray-800 rounded-lg mt-4 mb-12 shadow-custom shadow-black">
      <h2 className="text-2xl font-bold mb-8 text-center neon-text">
        I Guess you like this songs
      </h2>
      <div className="grid grid-cols-4 gap-x-10 gap-y-10">
        {topSongs.length > 0 ? (
          topSongs.map((song) => (
            <div
              key={song.id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4 w-52"
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
              <p className="text-center mt-2 text-white">{song.name}</p>
              <p className="text-sm text-center mt-1 text-gray-400">
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
