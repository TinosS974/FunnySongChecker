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

        setTopTracks(response.data); // Assurez-vous que la réponse contient un tableau de pistes
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
      <h2 className="text-lg font-bold">Top Tracks</h2>
      {topTracks.length > 0 ? (
        <ul className="list-disc pl-5">
          {topTracks.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      ) : (
        <p>No top tracks found.</p>
      )}
    </div>
  );
}

export default ArtistTopTracks;
