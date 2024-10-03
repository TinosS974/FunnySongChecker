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
    <div className="p-8 mt-4 bg-gradient-to-b from-gray-800 to-green-800 rounded-lg mx-auto">
      <h2 className="text-5xl font-bold mb-8 text-center text-white">
        Your Top Artists
      </h2>
      <div className="grid grid-cols-4 gap-10">
        {topArtists.length > 0 ? (
          topArtists.map((artist) => (
            <div
              key={artist.id}
              className="card bg-gray-900 hover:bg-gray-700 transition-colors duration-300 shadow-md rounded-lg flex flex-col items-center p-4"
            >
              <div className="avatar mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <p className="text-center mt-2 text-white font-bold">
                {artist.name}
              </p>
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
