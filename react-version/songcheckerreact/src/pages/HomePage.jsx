import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TopArtistsSection from "../components/TopSections/TopArtistsSection";
import TopSongsSection from "../components/TopSections/TopSongsSection";
import RecentlyTrack from "../components/TracksSections/RecentlyTrack";
import SearchByArtist from "../components/SearchByArtist";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("spotifyToken", accessToken);
      window.history.replaceState({}, document.title, "/home");
    }

    const storedToken = localStorage.getItem("spotifyToken");

    if (storedToken) {
      axios
        .get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.log("Error fetching user info:", error);
        });
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="mt-20 flex flex-col items-center bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-10 w-full max-w-6xl">
          <div className="col-span-3 lg:col-span-1">
            <TopArtistsSection />
          </div>
          <div className="col-span-3 lg:col-span-2">
            <TopSongsSection />
          </div>
          <div className="col-span-3">
            <RecentlyTrack />
          </div>
          <div className="col-span-3">
            <SearchByArtist />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
