import { useState } from "react";
import axios from "axios";
import ArtistTopTracks from "./ArtistTopTracks"; // Importer le composant enfant pour les top tracks

function SearchByArtist() {
  const inputPlaceholder = "Type an artist name";
  const cardTitle = "Artist Name Based Search";

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [cardImg, setCardImg] = useState(
    "https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg"
  ); // Image par défaut

  // Gérer l'input utilisateur et effectuer une recherche dynamique
  const handleQuery = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      // Appeler l'API de ton backend pour chercher les artistes
      const token = localStorage.getItem("spotifyToken");
      const response = await axios.get(
        `http://localhost:5000/api/spotify/search-artists?q=${encodeURIComponent(
          value
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Mettre à jour les suggestions avec les artistes
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setSuggestions([]);
    }
  };

  // Gérer la sélection de l'artiste
  const handleArtistSelect = (artist) => {
    setSelectedArtistId(artist.id); // Définir l'ID de l'artiste sélectionné
    setCardImg(
      artist.images[0]?.url ||
        "https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg"
    ); // Mettre à jour l'image de la carte
  };

  return (
    <div className="card rounded-box grid h-auto w-1/3 flex-grow place-items-center">
      <div className="card glass w-96">
        <figure className="h-56 w-full">
          <img
            src={cardImg}
            alt="Artist banner"
            className="object-contain h-full w-full"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title">{cardTitle}</h1>
          <div className="card-actions justify-end">
            <label className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder={inputPlaceholder}
                className="input input-bordered w-full max-w-xs"
                onChange={handleQuery}
                value={query}
              />
              {suggestions.length > 0 && (
                <ul className="menu bg-base-100 rounded-box shadow mt-2 max-h-48 overflow-y-scroll flex flex-col">
                  {suggestions.map((artist) => (
                    <li
                      key={artist.id}
                      className="p-2 hover:bg-base-200 cursor-pointer"
                      onClick={() => handleArtistSelect(artist)}
                    >
                      <div className="flex items-center">
                        <div className="avatar mr-4">
                          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                              src={artist.images[0]?.url}
                              alt={artist.name}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold">{artist.name}</p>
                          <span
                            className={`badge ${
                              artist.isFollowed ? "badge-success" : "badge-info"
                            }`}
                          >
                            {artist.isFollowed ? "Known" : "Discover"}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </label>
          </div>
          {/* Affichage des top tracks de l'artiste sélectionné */}
          {selectedArtistId && <ArtistTopTracks artistId={selectedArtistId} />}
        </div>
      </div>
    </div>
  );
}

export default SearchByArtist;
