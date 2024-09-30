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

        console.log("Top songs response:", response.data);

        if (response.data) {
          setTopSongs(response.data);
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
    <div className="w-full lg:w-1/3 p-5 bg-green-600 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Top Songs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {topSongs.length > 0 ? (
          topSongs.map((song) => (
            <div
              key={song.id}
              className="card glass bg-success-content shadow-md flex flex-col items-center p-4"
            >
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img
                    src={song.album.images[0]?.url}
                    alt={song.name}
                    className="rounded-full"
                  />
                </div>
              </div>
              <p className="text-center mt-4 text-white">{song.name}</p>
              <p className="text-sm text-center mt-1 text-white">
                by {song.artists[0]?.name}
              </p>
            </div>
          ))
        ) : (
          <p>No songs found.</p>
        )}
      </div>
    </div>
  );
}

export default TopSongsSection;
