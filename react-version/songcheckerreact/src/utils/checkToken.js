import axios from "axios";

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("spotifyRefreshToken");

  if (!refreshToken) {
    return null;
  }

  try {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const response = await axios.post(`${API_BASE_URL}/api/refresh-token`, {
      refresh_token: refreshToken,
    });

    const { accessToken, expiresIn } = response.data;

    localStorage.setItem("spotifyToken", accessToken);
    localStorage.setItem("spotifyTokenExpiry", Date.now() + expiresIn * 1000);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
};

const checkToken = async (navigate) => {
  const token = localStorage.getItem("spotifyToken");
  const tokenExpiry = localStorage.getItem("spotifyTokenExpiry");

  if (!token || Date.now() >= tokenExpiry) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      navigate("/");
      return false;
    }
    return true;
  }

  try {
    await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const newToken = await refreshAccessToken();
      if (!newToken) {
        navigate("/");
        return false;
      }
    }
    return true;
  }
};

export default checkToken;
