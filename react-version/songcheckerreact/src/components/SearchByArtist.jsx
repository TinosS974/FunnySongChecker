import { useState } from "react";
import axios from "axios";

function SearchByArtist() {
  const inputPlaceholder = "Type an artist name";
  const cardTitle = "Artist Name Based Search";

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Gérer l'input utilisateur et effectuer une recherche dynamique
  const handleQuery = async (event) => {
    const value = event.target.value;
    console.log(value);
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      // Appeler l'API de ton backend pour chercher les artistes et leur statut de suivi
      const token = localStorage.getItem("spotifyToken");
      const response = await axios.get(
        `http://localhost:5000/api/spotify/search-artists?q=${encodeURIComponent(
          value
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Mettre à jour les suggestions avec les artistes et leur statut de suivi
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setSuggestions([]);
    }
  };

  return (
    <div className="card glass w-96">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="car!"
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title">{cardTitle}</h1>
        <div className="card-actions justify-end">
          <label className="form-control w-full max-w-xs">
            <div className="label"></div>
            <input
              type="text"
              placeholder={inputPlaceholder}
              className="input input-bordered w-full max-w-xs"
              onChange={handleQuery}
              value={query}
            />
            {suggestions.length > 0 && (
              <ul className="menu bg-base-100 rounded-box shadow mt-2">
                {suggestions.map((artist) => (
                  <li key={artist.id}>
                    <a>
                      {artist.name} -{" "}
                      <span
                        className={`badge ${
                          artist.isFollowed ? "badge-success" : "badge-info"
                        }`}
                      >
                        {artist.isFollowed ? "Known" : "Discover"}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}

export default SearchByArtist;
