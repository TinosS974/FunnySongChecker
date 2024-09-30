function Navbar({ userInfo }) {
  const appTitle = "Song Checker";

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{appTitle}</a>
        <h2 className="mx-10 text-xl">
          {userInfo ? `Bonjour, ${userInfo.display_name}` : "Utilisateur"}
        </h2>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
