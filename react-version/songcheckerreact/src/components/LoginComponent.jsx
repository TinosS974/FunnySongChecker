import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem("spotifyToken");
    console.log("Token in localStorage:", token); // Log pour vérifier le token
    if (token) {
      // Rediriger vers la HomePage si déjà connecté
      console.log("Redirecting to HomePage...");
      navigate("/home");
    }
  }, [navigate]);

  const spotifyHandling = () => {
    // Appeler ton backend pour démarrer l'authentification avec Spotify
    console.log("Redirecting to Spotify login...");
    window.location.href = "http://localhost:5000/api/login";
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
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
