import { useState, useEffect } from "react";
import axios from "axios";

function TopArtistsSection() {
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const token = localStorage.getItem("spotifyToken");
        const response = await axios.get(
          "http://localhost:5000/api/spotify/top-artists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          setTopArtists(response.data.slice(0, 12)); // Limiter à 12 artistes
        } else {
          setTopArtists([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, []);

  if (loading) return <p>Loading top artists...</p>;
  if (error) return <p>Error fetching top artists: {error.message}</p>;

  return (
    <div className="w-full p-5 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-cyan-400">
        Top Artists
      </h2>
      <div className="grid grid-cols-4 gap-x-8 gap-y-8">
        {topArtists.length > 0 ? (
          topArtists.map((artist) => (
            <div
              key={artist.id}
              className="card bg-gray-900 hover:bg-gray-700 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4 w-44"
            >
              <div className="avatar">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <p className="text-center mt-2 text-white">{artist.name}</p>
            </div>
          ))
        ) : (
          <p className="text-white">No artists found.</p>
        )}
      </div>
    </div>
  );
}

export default TopArtistsSection;
