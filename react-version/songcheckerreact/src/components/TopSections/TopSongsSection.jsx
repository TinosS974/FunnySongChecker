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
          "http://localhost:5000/api/spotify/top-tracks",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Top songs response:", response.data); // Log pour vérifier la réponse

        if (response.data) {
          setTopSongs(response.data); // Assigne directement les données reçues
        } else {
          setTopSongs([]); // Si pas de données, on met un tableau vide
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
    <div className="w-1/3 p-5">
      <h2 className="text-2xl font-bold mb-4">Top Songs</h2>
      <div className="grid grid-cols-3 gap-4">
        {topSongs.length > 0 ? (
          topSongs.map((song) => (
            <div
              key={song.id}
              className="card bg-base-100 shadow-md flex flex-col items-center p-4"
            >
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img
                    src={song.album.images[0]?.url} // On utilise les images de l'album
                    alt={song.name}
                    className="rounded-full"
                  />
                </div>
              </div>
              <p className="text-center mt-4">{song.name}</p>
              <p className="text-sm text-center mt-1">
                by {song.artists[0]?.name}
              </p>{" "}
              {/* Affiche le nom de l'artiste */}
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
