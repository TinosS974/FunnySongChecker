import { useState } from "react";
import axios from "axios";
import ArtistTopTracks from "../ArtistTopTracks";

function SearchByArtistModal({ closeModal }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null); // Stocke l'artiste sélectionné

  const handleQuery = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const token = localStorage.getItem("spotifyToken");
      const response = await axios.get(
        `http://localhost:5000/api/spotify/search-artists?q=${encodeURIComponent(
          value
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setSuggestions([]);
    }
  };

  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist);
    setQuery(""); // Clear the search input
    setSuggestions([]); // Clear the suggestions
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture lors d'un clic à l'intérieur
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Search for an Artist</h2>
        <input
          type="text"
          placeholder="Type an artist name"
          className="input input-bordered w-full mb-4"
          onChange={handleQuery}
          value={query}
        />
        {suggestions.length > 0 && (
          <ul className="menu bg-base-100 rounded-box shadow mb-4 max-h-48 overflow-y-scroll">
            {suggestions.map((artist) => (
              <li
                key={artist.id}
                className="p-2 hover:bg-base-200 cursor-pointer flex items-center"
                onClick={() => handleArtistSelect(artist)}
              >
                <div className="avatar mr-4">
                  <div className="w-12 rounded-full">
                    <img src={artist.images[0]?.url} alt={artist.name} />
                  </div>
                </div>
                <div>{artist.name}</div>
              </li>
            ))}
          </ul>
        )}
        {selectedArtist && (
          <div className="mt-4">
            <div className="flex items-center mb-4">
              <div className="avatar mr-4">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={selectedArtist.images[0]?.url}
                    alt={selectedArtist.name}
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold">{selectedArtist.name}</h2>
            </div>
            <ArtistTopTracks artistId={selectedArtist.id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchByArtistModal;
