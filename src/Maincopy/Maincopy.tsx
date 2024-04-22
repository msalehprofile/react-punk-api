
import Beercard from "../BeerCard/BeerCard"
import './Maincopy.scss';
import { Beer } from "../Data/beertypes";

type searching = {
    searchTerm: string;
    beers: Beer[];
}

const Maincopy = ({beers}: searching) => {
  console.log(beers)
  return (
    <div className="maincopy">
        <div className="maincopy__beers">
        {beers.map((beer) => <Beercard name={beer.name} image_url={beer.image_url} description={beer.description} abv={beer.abv} ph={beer.ph} first_brewed={beer.first_brewed} key={beer.name} />)}
        </div>
    </div>
  )
}

export default Maincopy