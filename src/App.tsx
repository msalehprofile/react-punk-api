import "./App.scss";
import Navbar from "./Navbar/Navbar";
import Maincopy from "./Maincopy/Maincopy";
import { useState, FormEvent, useEffect } from "react";
import { Beer } from "./Data/beertypes";

const App = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [abvCheck, setAbvCheck] = useState<boolean>(false);
  const [rangeCheck, setRangeCheck] = useState<boolean>(false);
  const [acidityCheck, setAcidityCheck] = useState<boolean>(false);

  const getBeers = async (
    abvCheck: boolean,
    rangeCheck: boolean,
    searchTerm: string
  ) => {
    const url = `http://localhost:3333/v2/beers`;
    let updatedURL = url;

    if (abvCheck && !rangeCheck && searchTerm === "") {
      updatedURL += `/?abv_gt=6`;
    }

    if (rangeCheck && !abvCheck && searchTerm === "") {
      updatedURL += `/?brewed_before=12/2009`;
    }

    if (searchTerm != "" && !abvCheck && !rangeCheck) {
      updatedURL += `/?beer_name=${searchTerm}`;
    }

    if (rangeCheck && abvCheck && searchTerm === "") {
      updatedURL += `/?brewed_before=12/2009&abv_gt=6`;
    }

    if (rangeCheck && !abvCheck && searchTerm != "") {
      updatedURL += `/?brewed_before=12/2009&beer_name=${searchTerm}`;
    }

    if (!rangeCheck && abvCheck && searchTerm != "") {
      updatedURL += `/?abv_gt=6&beer_name=${searchTerm}`;
    }

    if (rangeCheck && abvCheck && searchTerm != "") {
      updatedURL += `/?abv_gt=6&brewed_before=12/2009&beer_name=${searchTerm}`;
    }

    const response = await fetch(updatedURL);

    if (!response.ok) {
      console.log(`Unsuccessful fetch, error code was: ${response.status}`);
      return;
    }

    const data: Beer[] = await response.json();
    setBeers(data);
  };

  console.log(beers);

  useEffect(() => {
    getBeers(abvCheck, rangeCheck, searchTerm);
  }, [abvCheck, rangeCheck, searchTerm]);

  const handleSearchInput = (event: FormEvent<HTMLInputElement>) => {
    const cleanedInput = event.currentTarget.value.toLowerCase();
    setSearchTerm(cleanedInput);
  };

  const handleAbvBox = () => {
    setAbvCheck(!abvCheck);
  };

  const handleRangeBox = () => {
    setRangeCheck(!rangeCheck);
  };

  const handleacidityBox = () => {
    setAcidityCheck(!acidityCheck);
  };

  return (
    <div className="punkapi">
      <h1 className="punkapi__name">BREWDOG</h1>
      <Navbar
        beers={beers}
        handleSearchTerm={handleSearchInput}
        searchTerm={searchTerm}
        handleAbvBox={handleAbvBox}
        handleacidityBox={handleacidityBox}
        handleRangeBox={handleRangeBox}
      />
      <Maincopy searchTerm={searchTerm} beers={beers} />
    </div>
  );
};

export default App;
