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
    searchTerm: string,
    acidityCheck: boolean
  ) => {
    for (let i=0; i <8; i++) {
    const url = `http://localhost:3333/v2/beers?page=${[i]}&per_page=50`;
    let updatedURL = url;

    }
    if (abvCheck && !rangeCheck && searchTerm === "") {
      updatedURL = url + `&abv_gt=6`;
    }
    console.log(abvCheck);
    console.log(rangeCheck);
    console.log(updatedURL);

    if (rangeCheck === true && abvCheck === false && searchTerm === "") {
      updatedURL = url + `&brewed_before=12/2009`;
    }
    console.log(updatedURL);
    if (searchTerm != "" && abvCheck === false && rangeCheck === false) {
      updatedURL = url + `&beer_name=${searchTerm}`;
    }
    console.log(updatedURL);
    console.log("search term", searchTerm);
    if (rangeCheck === true && abvCheck === true && searchTerm === "") {
      updatedURL = url + `/?brewed_before=12/2009&abv_gt=6`;
    }
    console.log(updatedURL);

    if (rangeCheck === true && abvCheck === false && searchTerm != "") {
      updatedURL += `/?brewed_before=12/2009&beer_name=${searchTerm}`;
    }

    if (rangeCheck === false && abvCheck === true && searchTerm != "") {
      updatedURL += `/?abv_gt=6&beer_name=${searchTerm}`;
    }

    if (rangeCheck === true && abvCheck === true && searchTerm != "") {
      updatedURL += `/?abv_gt=6&brewed_before=12/2009&beer_name=${searchTerm}`;
    }

    const response = await fetch(updatedURL);

    if (!response.ok) {
      console.log(`Unsuccessful fetch, error code was: ${response.status}`);
      return;
    }

    const data: Beer[] = await response.json();
    setBeers(data);

    if (acidityCheck === true) {
      const filteredAcidity = beers.filter((beer) => beer.ph < 4);
      setBeers(filteredAcidity);
    }
  };

  console.log(beers);

  useEffect(() => {
    getBeers(abvCheck, rangeCheck, searchTerm, acidityCheck);
  }, [abvCheck, rangeCheck, searchTerm, acidityCheck]);

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
