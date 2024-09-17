import React, { useState } from "react";

function SearchBySong() {
  const inputPlaceHolder = "Type a song name then press enter";
  const cardTitle = "Song name based search";

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleQuery = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    //const results = await API.getSongs(value);
    //setSuggestions(results)
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
              placeholder={inputPlaceHolder}
              className="input input-bordered w-full max-w-xs"
              onChange={handleQuery}
              value={query}
              /*{suggestions.length > 0 && (
                <ul className="menu bg-base-100 rounded-box shadow mt-2">
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            <a>{suggestion}</a>
                        </li>
                    ))}
                </ul>
              )}*/
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SearchBySong;
