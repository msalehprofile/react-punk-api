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

  const handleAbvBox = () => {
    setAbvCheck(!abvCheck);
  };
  const filteredArr = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm)
  );

  const handleRangeBox = () => {
    setRangeCheck(!rangeCheck);
  };
  const handleacidityBox = () => {
    setAcidityCheck(!acidityCheck);
  };
  console.log(abvCheck);
  console.log(rangeCheck);
  console.log(acidityCheck);

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
      <Maincopy searchTerm={searchTerm} />
    </div>
  );
};

export default App;
