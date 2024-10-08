import { useState } from "react";
import axios from "axios";
import ArtistTopTracks from "../ArtistTopTracks";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import checkToken from "../../utils/checkToken";

function SearchByArtistModal({ closeModal }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const navigate = useNavigate();

  const handleQuery = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const isValid = await checkToken(navigate);
      if (!isValid) {
        console.error("Invalid or expired token.");
        return;
      }

      const token = localStorage.getItem("spotifyToken");
      const response = await axios.get(
        `${
          process.env.API_BASE_URL
        }/api/spotify/search-artists?q=${encodeURIComponent(value)}`,
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
        className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 w-full sm:w-3/4 lg:max-w-2xl max-h-2/3 overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">
          Search for an Artist
        </h2>
        <input
          type="text"
          placeholder="Type an artist name"
          className="input input-bordered w-full mb-4 bg-slate-400 placeholder-black"
          onChange={handleQuery}
          value={query}
        />
        {suggestions.length > 0 && (
          <ul className="menu bg-gradient-to-b from-gray-800 to-green-800 rounded-box shadow mb-4 max-h-48 overflow-y-auto">
            {suggestions.map((artist) => (
              <li
                key={artist.id}
                className="p-4 hover:scale-105 cursor-pointer flex flex-col items-center text-white font-bold"
                onClick={() => handleArtistSelect(artist)}
              >
                <div className="avatar">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full">
                    <img src={artist.images[0]?.url} alt={artist.name} />
                  </div>
                </div>
                <div className="text-lg mt-2 text-center">{artist.name}</div>
              </li>
            ))}
          </ul>
        )}
        {selectedArtist && (
          <div className="mt-4">
            <div className="flex items-center mb-4">
              <div className="avatar mr-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={selectedArtist.images[0]?.url}
                    alt={selectedArtist.name}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <h2 className="text-lg sm:text-2xl font-bold text-white mr-2">
                  {selectedArtist.name}'s top tracks
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
