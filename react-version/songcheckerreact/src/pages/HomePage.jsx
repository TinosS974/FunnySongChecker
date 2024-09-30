import Navbar from "../components/Navbar";
import Separator from "../components/Separator";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // ou fetch si tu préfères
import TopArtistsSection from "../components/TopSections/TopArtistsSection";
import TopSongsSection from "../components/TopSections/TopSongsSection";
import RecentlyTrack from "../components/TracksSections/RecentlyTrack";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Récupérer le token depuis l'URL
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
      <Separator />
      <div className="flex flex-wrap justify-between gap-6 p-6">
        <TopArtistsSection />
        <TopSongsSection />
        <RecentlyTrack />
      </div>
    </>
  );
}

export default HomePage;
