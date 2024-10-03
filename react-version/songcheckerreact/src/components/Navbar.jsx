import { useNavigate } from "react-router-dom";

function Navbar({ userInfo }) {
  const appTitle = "Spotify Checker";
  const navigate = useNavigate(); // Obtenez la fonction navigate

  const handleLogout = () => {
    localStorage.setItem("spotifyToken", ""); // Supprime le token
    navigate("/"); // Redirige directement vers la page de login
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg p-4 z-50">
      <div className="flex-1">
        <h2 className="btn btn-ghost text-xl neon-text">{appTitle}</h2>
        <h2 className="mx-10 text-4xl text-white">
          {userInfo ? `Bonjour, ${userInfo.display_name}` : "Utilisateur"}
        </h2>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto bg-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profil utilisateur"
                src={
                  userInfo && userInfo.images && userInfo.images.length > 0
                    ? userInfo.images[0].url
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a
                onClick={handleLogout}
                className="text-white hover:bg-cyan-600"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
