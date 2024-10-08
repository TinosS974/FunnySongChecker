import axios from "axios";

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("spotifyRefreshToken");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post("http://localhost:5000/api/refresh-token", {
      refresh_token: refreshToken,
    });

    const { accessToken, expiresIn } = response.data;

    const expiryTime = Date.now() + expiresIn * 1000;
    localStorage.setItem("spotifyToken", accessToken);
    localStorage.setItem("spotifyTokenExpiry", expiryTime);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
};

const checkToken = async () => {
  const token = localStorage.getItem("spotifyToken");
  const tokenExpiry = localStorage.getItem("spotifyTokenExpiry");

  if (!token || Date.now() >= tokenExpiry) {
    const newToken = await refreshAccessToken();
    return newToken;
  }

  return token;
};

export default checkToken;
