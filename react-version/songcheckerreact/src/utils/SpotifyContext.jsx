import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

export const SpotifyContext = createContext();

const fetchSpotifyData = async (url, token) => {
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const SpotifyProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("spotifyToken") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        navigate("/");
        return;
      }

      try {
        await axios.get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("spotifyToken");
          setToken("");
          navigate("/");
        }
      }
    };

    checkToken();
  }, [token, navigate]);

  // Mettre à jour le token si l'utilisateur se connecte
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("spotifyToken", accessToken);
      setToken(accessToken);
      window.history.replaceState({}, document.title, "/home");
    }
  }, []);

  const { data: userInfo, isLoading: loadingUserInfo } = useQuery(
    ["userInfo", token],
    () => fetchSpotifyData("http://localhost:5000/api/user", token),
    { enabled: !!token }
  );

  const { data: topArtists = [], isLoading: loadingArtists } = useQuery(
    ["topArtists", token],
    () =>
      fetchSpotifyData("http://localhost:5000/api/spotify/top-artists", token),
    { enabled: !!token }
  );

  const { data: topSongs = [], isLoading: loadingSongs } = useQuery(
    ["topSongs", token],
    () =>
      fetchSpotifyData(
        "http://localhost:5000/api/spotify/user-top-tracks",
        token
      ),
    { enabled: !!token }
  );

  const { data: recentlyPlayedTracks = [], isLoading: loadingRecentlyPlayed } =
    useQuery(
      ["recentlyPlayedTracks", token],
      () =>
        fetchSpotifyData(
          "http://localhost:5000/api/spotify/recently-played",
          token
        ),
      { enabled: !!token }
    );

  const isLoading =
    loadingUserInfo || loadingArtists || loadingSongs || loadingRecentlyPlayed;

  return (
    <SpotifyContext.Provider
      value={{
        userInfo,
        topArtists,
        topSongs,
        recentlyPlayedTracks,
        isLoading,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};
