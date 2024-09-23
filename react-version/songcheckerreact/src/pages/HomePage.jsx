import Navbar from "../components/Navbar";
import Separator from "../components/Separator";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer le token depuis l'URL
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    console.log("Access token from URL:", accessToken); // Log pour vérifier le token

    if (accessToken) {
      // Stocker le token dans le localStorage
      localStorage.setItem("spotifyToken", accessToken);
      console.log(
        "Token stored in localStorage:",
        localStorage.getItem("spotifyToken")
      ); // Log de vérification

      // Nettoyer l'URL après avoir stocké le token
      window.history.replaceState({}, document.title, "/home");
    } else {
      // Si pas de token, rediriger vers la page de login
      const storedToken = localStorage.getItem("spotifyToken");
      console.log("Stored token:", storedToken); // Log de vérification
      if (!storedToken) {
        console.log("No token found, redirecting to login");
        navigate("/");
      }
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />
      <Separator />
    </>
  );
}

export default HomePage;
