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
    <div className="flex flex-col items-center w-full lg:w-2/3 p-5 bg-base-content rounded-lg shadow-md justify-center">
      <h2 className="text-2xl font-bold mb-4 text-neutral-content text-center">
        Recently Played Tracks
      </h2>

      <div className="carousel carousel-center bg-neutral rounded-box w-full space-x-4 p-4">
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <div key={track.id} className="carousel-item">
              <div className="card w-56 bg-base-100 shadow-md">
                <figure>
                  <img
                    src={track.album?.images[0]?.url || "placeholder_image_url"}
                    alt={track.name}
                    className="w-full h-32 object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-sm">{track.name}</h2>
                  <p className="text-xs">
                    Artist:{" "}
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                  <p className="text-xs">
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
                    <button className="btn btn-primary btn-sm">Listen</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recently played tracks found.</p>
        )}
      </div>
    </div>
  );
}

export default RecentlyTrack;
