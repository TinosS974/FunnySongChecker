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

        console.log("Top artists response:", response.data);
        if (response.data) {
          setTopArtists(response.data);
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
    <div className="w-full lg:w-1/3 p-5 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Top Artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {topArtists.length > 0 ? (
          topArtists.map((artist) => (
            <div
              key={artist.id}
              className="card glass bg-base-100 shadow-md flex flex-col items-center p-4"
            >
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="rounded-full"
                  />
                </div>
              </div>
              <p className="text-center mt-4">{artist.name}</p>
            </div>
          ))
        ) : (
          <p>No artists found.</p>
        )}
      </div>
    </div>
  );
}

export default TopArtistsSection;
