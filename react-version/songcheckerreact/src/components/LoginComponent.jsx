import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkToken from "../utils/checkToken";

function LoginComponent() {
  const navigate = useNavigate();
  const loginTxt = "Login now!";
  const descTxt = `Connectez vous à votre compte spotify afin de commencer l'expérience`;

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const verifyToken = async () => {
      const isValid = await checkToken(navigate);
      if (isValid) {
        navigate("/home");
      }
    };
    verifyToken();
  }, [navigate]);

  const spotifyHandling = () => {
    console.log("Redirecting to Spotify login...");
    window.location.href = "http://localhost:5000/api/login";
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
              <button onClick={spotifyHandling} className="btn btn-primary">
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
