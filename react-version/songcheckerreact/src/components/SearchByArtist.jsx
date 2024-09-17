import React from "react";

function SearchByArtist() {
  const inputPlaceHolder = "Type an artist name then press enter";
  const cardTitle = "Artist name based search";

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      console.log("Touche entrer pressée !");
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
            <input
              type="text"
              placeholder={inputPlaceHolder}
              className="input input-bordered w-full max-w-xs"
              onKeyDown={handleEnter}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SearchByArtist;
