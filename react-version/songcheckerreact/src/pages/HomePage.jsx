import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TopArtistsSection from "../components/TopSections/TopArtistsSection";
import TopSongsSection from "../components/TopSections/TopSongsSection";
import RecentlyTrack from "../components/TracksSections/RecentlyTrack";
import { useNavigate } from "react-router-dom";
import checkToken from "../utils/checkToken";

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
      const expiresIn = params.get("expires_in");
      const expiryTime = Date.now() + expiresIn * 1000;
      localStorage.setItem("spotifyToken", accessToken);
      localStorage.setItem("spotifyTokenExpiry", expiryTime);
      navigate("/home", { replace: true });
    }

    const checkAndFetchData = async () => {
      const isValid = await checkToken(navigate);

      if (isValid) {
        const token = localStorage.getItem("spotifyToken");

        try {
          const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
          setLoading(true);
          const [
            artistsResponse,
            songsResponse,
            recentlyPlayedResponse,
            userInfoResponse,
          ] = await Promise.all([
            axios.get(`${API_BASE_URL}/api/spotify/top-artists`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API_BASE_URL}/api/spotify/user-top-tracks`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API_BASE_URL}/api/spotify/recently-played`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${API_BASE_URL}/api/user`, {
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
      } else {
        setError("Invalid token, redirecting to login page...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };

    checkAndFetchData();
  }, [navigate]);

  if (error) {
    return (
      <div className="mt-20 flex flex-col items-center min-h-screen p-4">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="mt-20 flex flex-col items-center bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen p-4 sm:p-6 md:p-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="col-span-1">
            <TopArtistsSection topArtists={topArtists} loading={loading} />
          </div>
          <div className="col-span-1">
            <TopSongsSection topSongs={topSongs} loading={loading} />
          </div>
          <div className="col-span-1 lg:col-span-2">
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
