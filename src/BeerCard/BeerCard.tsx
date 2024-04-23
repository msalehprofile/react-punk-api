import "./BeerCard.scss";

import { Beer } from "../Data/beertypes";

export type beerData = {
  beers: Beer[];
  name: string;
  image_url: string;
  id: number;
};

const Beercard = ({ name, image_url}: beerData) => {
  return (
    <div className="beercard">
      <img className="beercard__image" src={image_url} alt="beer breed" />
      <h2 className="beercard__name">{name.toUpperCase()}</h2>
    </div>
  );
};

export default Beercard;
