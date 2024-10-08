import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkToken from "../utils/checkToken";

function ArtistTopTracks({ artistId }) {
  const [topTracks, setTopTracks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const isValid = await checkToken(navigate);
        if (!isValid) {
          console.error("Invalid or expired token.");
          return;
        }

        const token = localStorage.getItem("spotifyToken");
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        const response = await axios.get(
          `${API_BASE_URL}/api/spotify/artist-top-tracks/${artistId}`,
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
  }, [artistId, navigate]);

  if (error) return <p>Error fetching top tracks: {error.message}</p>;

  return (
    <div className="mt-4">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Top Tracks</h2>
      {topTracks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {topTracks.slice(0, 6).map((track) => (
            <div
              key={track.id}
              className="card bg-gray-900 shadow-md p-4 hover:bg-gray-700"
            >
              <div className="flex items-center mb-4">
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-sm sm:text-base text-white">
                    {track.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {track.album.name}
                  </p>
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
