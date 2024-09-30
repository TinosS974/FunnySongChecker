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

    console.log("Recently played tracks response:", response.data);

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
    <div className="w-1/4 lg:w-1/3 p-5 bg-base-content rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-neutral-content text-center">
        Recently Played Tracks
      </h2>
      {tracks.length > 0 ? (
        tracks.map((track) => (
          <div
            key={track.id}
            className="card w-2/3 bg-base-100 shadow-md mb-4 flex flex-col lg:flex-row"
          >
            <figure>
              <img
                src={track.album?.images[0]?.url || "placeholder_image_url"}
                alt={track.name}
                className="w-24 h-24"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{track.name}</h2>
              <p>
                Artist: {track.artists.map((artist) => artist.name).join(", ")}
              </p>
              <p>
                Played at:{" "}
                {new Date(track.played_at).toLocaleString(navigator.language, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No recently played tracks found.</p>
      )}
    </div>
  );
}

export default RecentlyTrack;
