import SearchByArtist from "./SearchByArtist";

function Separator() {
  return (
    <div className="flex w-full flex-col lg:flex-row gap-4 mt-12">
      <div className="card rounded-box grid h-96 w-1/3 flex-grow place-items-center">
        <SearchByArtist />
      </div>
    </div>
  );
}

export default Separator;
