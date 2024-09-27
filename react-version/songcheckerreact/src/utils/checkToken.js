import axios from "axios";

const checkToken = async (navigate) => {
  const token = localStorage.getItem("spotifyToken");

  if (!token) {
    navigate("/");
    return false;
  }

  try {
    // Faire une requête test à l'API Spotify pour vérifier le token
    await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true; // Le token est valide
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token expiré, vider le localStorage et rediriger vers la page de login
      localStorage.setItem("spotifyToken", "");
      navigate("/");
    }
    return false;
  }
};

export default checkToken;
