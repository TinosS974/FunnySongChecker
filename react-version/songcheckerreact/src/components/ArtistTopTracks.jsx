import { useState, useEffect } from "react";
import axios from "axios";

function ArtistTopTracks({ artistId }) {
  const [topTracks, setTopTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const token = localStorage.getItem("spotifyToken");
        const response = await axios.get(
          `http://localhost:5000/api/spotify/artist-top-tracks/${artistId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTopTracks(response.data);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
        setError(error);
      }
    };

    if (artistId) {
      fetchTopTracks();
    }
  }, [artistId]);

  if (error) return <p>Error fetching top tracks: {error.message}</p>;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-4">Top Tracks</h2>
      {topTracks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topTracks.map((track) => (
            <div key={track.id} className="card bg-gray-900 shadow-md p-4">
              <div className="flex items-center mb-4">
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-white">{track.name}</p>
                  <p className="text-sm text-gray-400">{track.album.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No top tracks found.</p>
      )}
    </div>
  );
}

export default ArtistTopTracks;
