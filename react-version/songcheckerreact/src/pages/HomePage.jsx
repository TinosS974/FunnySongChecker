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
      // Stocker le token dans le localStorage
      localStorage.setItem("spotifyToken", accessToken);
      window.history.replaceState({}, document.title, "/home");
    }

    // Récupérer le token stocké dans le localStorage
    const storedToken = localStorage.getItem("spotifyToken");

    if (storedToken) {
      // Appeler l'API backend pour obtenir les infos de l'utilisateur
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
      // Si pas de token, rediriger vers la page de login
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <Separator />
      <div className="flex">
        <TopArtistsSection />
        <TopSongsSection />
        <RecentlyTrack />
      </div>
    </>
  );
}

export default HomePage;
