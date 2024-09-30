import axios from "axios";

const checkToken = async (navigate) => {
  const token = localStorage.getItem("spotifyToken");

  if (!token) {
    navigate("/");
    return false;
  }

  try {
    await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.setItem("spotifyToken", "");
      navigate("/");
    }
    return false;
  }
};

export default checkToken;
