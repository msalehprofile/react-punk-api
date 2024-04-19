
import Beercard from "../BeerCard/BeerCard"
import './Maincopy.scss';
import { Beer } from "../Data/beertypes";

type searching = {
    searchTerm: string;
    data: Beer[];
}

const Maincopy = ({data}: searching) => {
  console.log(data)
  return (
    <div className="maincopy">
        <h1>PUNK API</h1>
        <div className="maincopy__beers">
        {data.map((beer) => <Beercard name={beer.name} image_url={beer.image_url} description={beer.description} abv={beer.abv} ph={beer.ph} first_brewed={beer.first_brewed} key={beer.name} />)}
        </div>
    </div>
  )
}

export default Maincopy