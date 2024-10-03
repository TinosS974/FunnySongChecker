import { useState } from "react";
import axios from "axios";
import ArtistTopTracks from "../ArtistTopTracks";
import { AiOutlineClose } from "react-icons/ai";

function SearchByArtistModal({ closeModal }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

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
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="bg-gray-800 rounded-lg p-8 max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-4 text-white">
          Search for an Artist
        </h2>
        <input
          type="text"
          placeholder="Type an artist name"
          className="input input-bordered w-2/3 mb-4 bg-slate-400 placeholder-black"
          onChange={handleQuery}
          value={query}
        />
        {suggestions.length > 0 && (
          <ul className="menu bg-gradient-to-b from-gray-800 to-green-800 rounded-box shadow mb-4 max-h-48 overflow-x-auto overflow-y-hidden">
            {suggestions.map((artist) => (
              <li
                key={artist.id}
                className="p-4 hover:scale-105 cursor-pointer flex flex-col items-center text-white font-bold"
                onClick={() => handleArtistSelect(artist)}
              >
                <div className="avatar">
                  <div className="w-20 h-20 rounded-full">
                    <img src={artist.images[0]?.url} alt={artist.name} />
                  </div>
                </div>
                <div className="text-xl mt-2 text-center">{artist.name}</div>
              </li>
            ))}
          </ul>
        )}
        {selectedArtist && (
          <div className="mt-4">
            <div className="flex items-center mb-4">
              <div className="avatar mr-4">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={selectedArtist.images[0]?.url}
                    alt={selectedArtist.name}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-white mr-2">
                  {selectedArtist.name}
                </h2>
                <span
                  className={`badge ${
                    selectedArtist.isFollowed ? "badge-success" : "badge-info"
                  } font-bold`}
                >
                  {selectedArtist.isFollowed ? "Following" : "Discover"}
                </span>
              </div>
            </div>
            <ArtistTopTracks artistId={selectedArtist.id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchByArtistModal;
