import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkToken from "../utils/checkToken";

function LoginComponent() {
  const navigate = useNavigate();
  const loginTxt = "Login now!";
  const descTxt = `Connectez-vous à votre compte Spotify afin de commencer l'expérience`;

  useEffect(() => {
    const verifyToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const expiresIn = params.get("expires_in");

      if (accessToken && refreshToken) {
        const expiryTime = Date.now() + expiresIn * 1000;

        localStorage.setItem("spotifyToken", accessToken);
        localStorage.setItem("spotifyRefreshToken", refreshToken);
        localStorage.setItem("spotifyTokenExpiry", expiryTime);

        navigate("/home");
        return;
      }

      const isValid = await checkToken(navigate);
      if (isValid) {
        navigate("/home");
      }
    };

    verifyToken();
  }, [navigate]);

  const spotifyHandling = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${API_BASE_URL}/api/login`;
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{loginTxt}</h1>
          <p className="py-6">{descTxt}</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="form-control mt-6">
              <button
                onClick={spotifyHandling}
                className="btn btn-success text-white font-bold"
              >
                Login with Spotify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
