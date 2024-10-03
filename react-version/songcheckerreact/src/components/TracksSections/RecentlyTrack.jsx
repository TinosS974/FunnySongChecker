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
    <div className="w-full lg:w-2/3 mx-auto p-5 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center neon-text">
        Recently Played Tracks
      </h2>
      <div className="carousel space-x-4 p-4 rounded-box flex justify-center overflow-x-auto snap-x snap-mandatory">
        <div className="flex space-x-4">
          {tracks.length > 0 ? (
            tracks.map((track, index) => (
              <div
                key={track.id}
                id={`item${index}`}
                className="carousel-item snap-center flex-shrink-0 w-60"
              >
                <div className="card bg-gray-900 shadow-lg hover:scale-105 transition-transform duration-300 mx-2">
                  <figure>
                    <img
                      src={
                        track.album?.images[0]?.url || "placeholder_image_url"
                      }
                      alt={track.name}
                      className="w-full object-cover"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-white">{track.name}</h2>
                    <p className="text-lg text-gray-400">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </p>
                    <strong className="text-xs text-gray-400">
                      Played at:{" "}
                      {new Date(track.played_at).toLocaleString(
                        navigator.language,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </strong>
                    <div className="card-actions justify-end">
                      <button className="btn btn-cyan-600 btn-sm">
                        Listen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No recently played tracks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentlyTrack;
