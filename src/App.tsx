import "./App.scss";
import Navbar from "./Navbar/Navbar";
import Maincopy from "./Maincopy/Maincopy";
import beers from "./Data/Data";
import { useState, FormEvent } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [abvCheck, setAbvCheck] = useState<boolean>(false);
  const [rangeCheck, setRangeCheck] = useState<boolean>(false);
  const [acidityCheck, setAcidityCheck] = useState<boolean>(false);

  const handleSearchInput = (event: FormEvent<HTMLInputElement>) => {
    const cleanedInput = event.currentTarget.value.toLowerCase();
    setSearchTerm(cleanedInput);
    console.log(cleanedInput);
  };

  const filteredByName = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm)
  );

  const handleAbvBox = () => {
    setAbvCheck(!abvCheck);
  };

  const handleRangeBox = () => {
    setRangeCheck(!rangeCheck);
  };

  const filteredByRange = beers.filter((beer) => beer.abv > 6);
  console.log(filteredByRange);

  const handleacidityBox = () => {
    setAcidityCheck(!acidityCheck);
  };

  const filteredByAcidity = beers.filter((beer) => beer.abv > 6);
  console.log(filteredByAcidity);

  const filterSelection = () => {
    if (searchTerm === "" && !abvCheck && !rangeCheck && !acidityCheck) {
      return beers;
    } else if (
      searchTerm != "" &&
      abvCheck == false &&
      rangeCheck == false &&
      acidityCheck == false
    ) {
      return beers.filter((beer) =>
        beer.name.toLowerCase().includes(searchTerm)
      );
    } else if (
      searchTerm === "" &&
      abvCheck == true &&
      rangeCheck == false &&
      acidityCheck == false
    ) {
      return beers.filter((beer) => beer.abv > 6);
    } else if (
      searchTerm === "" &&
      abvCheck == false &&
      rangeCheck == true &&
      acidityCheck == false
    ) {
      return beers.filter((beer) => Number(beer.first_brewed.slice(3)) < 2010);
    }
  };
  console.log(filterSelection());

  return (
    <div className="punkapi">
      <Navbar
        beers={beers}
        handleSearchTerm={handleSearchInput}
        searchTerm={searchTerm}
        handleAbvBox={handleAbvBox}
        handleacidityBox={handleacidityBox}
        handleRangeBox={handleRangeBox}
      />
      <Maincopy searchTerm={searchTerm} filteredByName={filteredByName} />
    </div>
  );
};

export default App;
