import Skeleton from "../Skeleton";

function RecentlyTrack({ recentlyPlayedTracks = [], loading }) {
  const handleRedirectToTrack = (trackId) => {
    const spotifyTrackUrl = `https://open.spotify.com/track/${trackId}`;
    window.open(spotifyTrackUrl, "_blank"); // Opens the track in a new tab
  };

  if (loading) {
    return (
      <div className="w-full lg:w-2/3 mx-auto p-5 bg-gradient-to-b from-gray-800 to-green-800 rounded-lg shadow-md mb-11">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Recently Played Tracks
        </h1>
        <div className="flex space-x-4">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="card bg-gray-900 shadow-lg transition-transform duration-300 mx-2"
              >
                <Skeleton className="w-60 h-60 rounded-lg mb-4" />
                <Skeleton className="w-3/4 h-6 mt-2 mx-auto" />
                <Skeleton className="w-1/2 h-4 mt-2 mx-auto" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (!recentlyPlayedTracks || recentlyPlayedTracks.length === 0) {
    return <p>No recently played tracks found.</p>;
  }

  return (
    <div className="w-full lg:w-2/3 mx-auto p-5 bg-gradient-to-b from-gray-800 to-green-800 rounded-lg shadow-md mb-11">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">
        Recently Played Tracks
      </h1>
      <div className="carousel space-x-4 p-4 rounded-box flex justify-center overflow-x-auto snap-x snap-mandatory">
        <div className="flex space-x-4">
          {recentlyPlayedTracks.map((item, index) => {
            const track = item.track;

            return (
              <div
                key={`${track.id}-${item.played_at}`}
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
                      {new Date(item.played_at).toLocaleString(
                        navigator.language,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </strong>
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => handleRedirectToTrack(track.id)}
                        className="btn btn-primary btn-sm"
                      >
                        Listen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RecentlyTrack;
