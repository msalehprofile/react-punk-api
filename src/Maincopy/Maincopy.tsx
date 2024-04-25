
import Beercard from "../BeerCard/BeerCard"
import './Maincopy.scss';
import { Beer } from "../Data/beertypes";
import { Link } from "react-router-dom";

type searching = {
    searchTerm: string;
    beers: Beer[];
}

const Maincopy = ({beers}: searching) => {
  
  if (beers.length === 0) return <p className="error-message">We have no beers matching those filters</p>;

  return (
    <div className="maincopy">
        <div className="maincopy__beers">
        {beers.map((beer) =>(<Link to={`/${beer.id}`}> <Beercard beers={beers} name={beer.name} image_url={beer.image_url} id={beer.id} key={beer.name} /> </Link>))}
        </div>
    </div>
  )
}

export default Maincopy