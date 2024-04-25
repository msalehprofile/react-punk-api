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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postPerPage = 50;

  const getBeers = async (
    abvCheck: boolean,
    rangeCheck: boolean,
    searchTerm: string,
    acidityCheck: boolean,
    postPerPage: number
  ) => {
    const url = `http://localhost:3333/v2/beers`;

    let currentPage = 1;
    let allBeers: Beer[] = [];

    while (true) {
      let updatedURL = `${url}/?per_page=${postPerPage}&page=${currentPage}`;

      if (abvCheck) {
        updatedURL +=  `&abv_gt=6`;
      }

      if (rangeCheck  ) {
        updatedURL += `&brewed_before=12/2009`;
      }

      const response = await fetch(updatedURL);

      if (!response.ok) {
        console.log(`Unsuccessful fetch, error code was: ${response.status}`);
        return;
      }

      const data: Beer[] = await response.json();
      allBeers = allBeers.concat(data);

      if (data.length < postPerPage) {
        break;
      }
      currentPage++;
    }

    setBeers(allBeers);

    if (acidityCheck === true) {
      const filteredAcidity = beers.filter((beer) => beer.ph < 4);
      setBeers(filteredAcidity);
    }

    if (searchTerm != "") {
      console.log(searchTerm)
      const filteredName = beers.filter((beer) => beer.name.toLowerCase().includes(searchTerm));
      setBeers(filteredName);
    }
  };

  // Getting beers per page
  const lastBeerIndex = currentPage * postPerPage;
  const firstBeerIndex = lastBeerIndex - postPerPage;
  const currentPost = beers.slice(firstBeerIndex, lastBeerIndex);

  
  useEffect(() => {
    getBeers(abvCheck, rangeCheck, searchTerm, acidityCheck, postPerPage);
  }, [abvCheck, rangeCheck, searchTerm, acidityCheck, postPerPage]);


  // handling the filters
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

  const handleFilterReset = () => {
    setAbvCheck(false)
    setAcidityCheck(false)
    setSearchTerm("")
  }

  return (
    <BrowserRouter>
      <div className="punkapi">
        <Link to="/">
          <h1 className="punkapi__name" onClick={handleFilterReset}>BREWDOG</h1>
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
                <Maincopy searchTerm={searchTerm} beers={currentPost} />
                <Pagination
                  setCurrentPage={setCurrentPage}
                  beers={beers}
                  postPerPage={postPerPage}

                />
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
