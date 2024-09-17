import React from "react";
import SearchByArtist from "./SearchByArtist";
import SearchBySong from "./SearchBySong";

function Separator() {
  return (
    <div className="flex w-full flex-col lg:flex-row gap-4 mt-12">
      <div className="card rounded-box grid h-96 w-1/3 flex-grow place-items-center">
        <SearchByArtist />
      </div>
      <div className="divider divider-success lg:divider-horizontal"></div>
      <div className="card  rounded-box grid h-96 w-1/3 flex-grow place-items-center">
        <SearchBySong />
      </div>
    </div>
  );
}

export default Separator;
