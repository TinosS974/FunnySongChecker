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

        console.log("Top artists response:", response.data); // Log ici pour voir les données reçues

        // Modifie la façon de récupérer les artistes
        if (response.data) {
          setTopArtists(response.data); // Récupère directement response.data
        } else {
          setTopArtists([]); // Si pas de données, un tableau vide
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
    <div className="w-1/3 p-5">
      <h2 className="text-2xl font-bold mb-4">Top Artists</h2>
      <div className="grid grid-cols-3 gap-4">
        {topArtists.length > 0 ? (
          topArtists.map((artist) => (
            <div
              key={artist.id}
              className="card bg-base-100 shadow-md flex flex-col items-center p-4"
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
