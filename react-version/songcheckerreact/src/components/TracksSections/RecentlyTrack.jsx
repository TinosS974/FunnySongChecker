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
      // Extract the 'track' objects from the response data
      const fetchedTracks = response.data.map((item) => item.track);
      setTracks(fetchedTracks);
    } else {
      setTracks([]);
    }
  }, []);

  if (state.loading) return <p>Loading recently played tracks...</p>;
  if (state.error) return <p>Error fetching tracks: {state.error.message}</p>;

  return (
    <div>
      {tracks.length > 0 ? (
        tracks.map((track) => (
          <div
            key={track.id}
            className="card lg:card-side bg-base-100 shadow-xl mb-4"
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