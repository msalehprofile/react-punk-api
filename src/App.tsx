import "./App.scss";
import Navbar from "./Navbar/Navbar";
import Maincopy from "./Maincopy/Maincopy";
import { useState, FormEvent, useEffect } from "react";
import { Beer } from "./Data/beertypes";
import BeerInfo from "./containers/BeerInfo";
import Footer from "./Footer/Footer";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pagination from "./Pagination/Pagination";

const App = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [abvCheck, setAbvCheck] = useState<boolean>(false);
  const [rangeCheck, setRangeCheck] = useState<boolean>(false);
  const [acidityCheck, setAcidityCheck] = useState<boolean>(false);
  const [numberOfPages, setNumberOfPages] = useState<number[]>([]);
  const getBeers = async (
    abvCheck: boolean,
    rangeCheck: boolean,
    searchTerm: string,
    acidityCheck: boolean
  ) => {
    const url = `http://localhost:3333/v2/beers`;
    const beersPerPage = 50;
    let currentPage = 1;
    let pagesArr = [1];
    let allBeers: Beer[] = [];

    while (true) {
      let updatedURL = `${url}/?per_page=${beersPerPage}&page=${currentPage}`;

      if (abvCheck && !rangeCheck && searchTerm === "") {
        updatedURL = url + `/?abv_gt=6`;
      }

      if (rangeCheck === true && abvCheck === false && searchTerm === "") {
        updatedURL = url + `/?brewed_before=12/2009`;
      }

      if (searchTerm != "" && abvCheck === false && rangeCheck === false) {
        updatedURL = url + `/?beer_name=${searchTerm}`;
      }

      if (rangeCheck === true && abvCheck === true && searchTerm === "") {
        updatedURL = url + `/?brewed_before=12/2009&abv_gt=6`;
      }

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
      allBeers = allBeers.concat(data);

      if (data.length < beersPerPage) {
        break;
      }

      currentPage++;
      
      pagesArr.push(currentPage)
    
      setNumberOfPages(pagesArr);

    }

    setBeers(allBeers);

    if (acidityCheck === true) {
      const filteredAcidity = beers.filter((beer) => beer.ph < 4);
      setBeers(filteredAcidity);
    }
  };

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
    <BrowserRouter>
      <div className="punkapi">
        <Link to="/">
          <h1 className="punkapi__name">BREWDOG</h1>
        </Link>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar
                  beers={beers}
                  handleSearchTerm={handleSearchInput}
                  searchTerm={searchTerm}
                  handleAbvBox={handleAbvBox}
                  handleacidityBox={handleacidityBox}
                  handleRangeBox={handleRangeBox}
                />
                <Maincopy searchTerm={searchTerm} beers={beers} />
                <Pagination pages={numberOfPages} />
              </>
            }
          />

          <Route path="/:beerId" element={<BeerInfo beers={beers} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
