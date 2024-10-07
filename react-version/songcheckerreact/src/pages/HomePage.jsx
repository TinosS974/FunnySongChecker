import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TopArtistsSection from "../components/TopSections/TopArtistsSection";
import TopSongsSection from "../components/TopSections/TopSongsSection";
import RecentlyTrack from "../components/TracksSections/RecentlyTrack";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [topArtists, setTopArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("spotifyToken", accessToken);
      navigate("/home", { replace: true });
    }

    const token = localStorage.getItem("spotifyToken");

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          artistsResponse,
          songsResponse,
          recentlyPlayedResponse,
          userInfoResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/spotify/top-artists", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/spotify/user-top-tracks", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/spotify/recently-played", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTopArtists(artistsResponse.data);
        setTopSongs(songsResponse.data);
        setRecentlyPlayedTracks(recentlyPlayedResponse.data);
        setUserInfo(userInfoResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="mt-20 flex flex-col items-center bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen p-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
          <div className="col-span-1">
            <TopArtistsSection topArtists={topArtists} loading={loading} />
          </div>
          <div className="col-span-1">
            <TopSongsSection topSongs={topSongs} loading={loading} />
          </div>
          <div className="col-span-2">
            <RecentlyTrack
              recentlyPlayedTracks={recentlyPlayedTracks || []}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
