import { useState } from "react";
import axios from "axios";
import { useAsync } from "react-use";

function RecentlyTrack() {
  const [tracks, setTracks] = useState([]);

  const state = useAsync(async () => {
    const token = localStorage.getItem("spotifyToken");
    const response = await axios.get(
      "http://localhost:5000/api/spotify/recently-played",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data) {
      const fetchedTracks = response.data.map((item) => ({
        ...item.track,
        played_at: item.played_at,
      }));
      setTracks(fetchedTracks);
    } else {
      setTracks([]);
    }
  }, []);

  if (state.loading) return <p>Loading recently played tracks...</p>;
  if (state.error) return <p>Error fetching tracks: {state.error.message}</p>;

  return (
    <div className="carousel carousel-center bg-gray-800 rounded-box w-full max-w-2xl p-4">
      {tracks.length > 0 ? (
        tracks.map((track) => (
          <div key={track.id} className="carousel-item">
            <div className="card w-56 bg-gray-900 shadow-lg hover:scale-105 transition-transform duration-300">
              <figure>
                <img
                  src={track.album?.images[0]?.url || "placeholder_image_url"}
                  alt={track.name}
                  className="w-full h-32 object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-sm text-white">{track.name}</h2>
                <p className="text-xs text-gray-400">
                  Artist:{" "}
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p className="text-xs text-gray-400">
                  Played at:{" "}
                  {new Date(track.played_at).toLocaleString(
                    navigator.language,
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-cyan-600 btn-sm">Listen</button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No recently played tracks found.</p>
      )}
    </div>
  );
}

export default RecentlyTrack;
