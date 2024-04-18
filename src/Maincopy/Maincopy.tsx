
import Beercard from "../BeerCard/BeerCard"
import './Maincopy.scss';
import beers from '../Data/Data';

type searching = {
    searchTerm: string;
}

const Maincopy = ({searchTerm}: searching) => {

 const filteredArr = beers.filter((beer) => beer.name.toLowerCase().includes(searchTerm))



  return (
    <div className="maincopy">
        <h1>PUNK API</h1>
        <div className="maincopy__beers">
        {filteredArr.map((beer) => <Beercard name={beer.name} image_url={beer.image_url} description={beer.description} abv={beer.abv} ph={beer.ph} first_brewed={beer.first_brewed} key={beer.name} />)}
        </div>
    </div>
  )
}

export default Maincopy