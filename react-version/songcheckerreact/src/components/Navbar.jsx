import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchByArtistModal from "./searchSection/SearchByArtistModal";

function Navbar({ userInfo }) {
  const appTitle = "Spotify Checker";
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("spotifyRefreshToken");
    localStorage.removeItem("spotifyToken");
    localStorage.removeItem("spotifyTokenExpiry");

    navigate("/");
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg p-4 z-50">
      <div className="flex-1 flex items-center">
        <h2 className="btn btn-ghost text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl neon-text">
          {appTitle}
        </h2>
        <h2 className="hidden sm:block mx-2 sm:mx-0 md:mx-6 lg:mx-10 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white truncate">
          {userInfo ? `Hey, ${userInfo.display_name}` : "Hey"}
        </h2>
      </div>
      <div className="flex-none gap-2 flex items-center">
        <button
          className="btn btn-outline text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl w-20 sm:w-28 md:w-36 lg:w-44 xl:w-48"
          onClick={() => setIsModalOpen(true)}
        >
          Search
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-6 sm:w-8 md:w-10 lg:w-12 xl:w-14 rounded-full">
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
            className="menu menu-sm dropdown-content bg-gray-600 rounded-box z-[1] mt-3 w-28 sm:w-36 md:w-44 lg:w-52 p-2 shadow"
          >
            <li>
              <a
                onClick={handleLogout}
                className="text-white text-xs sm:text-sm md:text-base hover:bg-cyan-600"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <SearchByArtistModal closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default Navbar;
