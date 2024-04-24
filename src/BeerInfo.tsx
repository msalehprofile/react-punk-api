import { useParams } from "react-router-dom";
import { Beer } from "./Data/beertypes";

import "./BeerInfo.scss";

type BeerInfoProps = {
  beers: Beer[];
};

const BeerInfo = ({ beers }: BeerInfoProps) => {
  const { beerId } = useParams();

  const chooseBeer = beers.find((beer) => String(beer.id) == beerId);

  if (!chooseBeer) return <p>Couldn't find a beer with that id</p>;

  return (
    <div className="beer-profile">
      <img
        className="beer-profile__image"
        src={chooseBeer.image_url}
        alt="beer breed"
      />
      <h2 className="beer-profile__name">{chooseBeer.name}</h2>

      <p className="beer-profile__desc">{chooseBeer.description}</p>
      <div>
        <p className="beer-profile__data">
          <span className="beer-profile__data--heading">First brewed in:</span>{" "}
          {chooseBeer.first_brewed}
        </p>
        <p className="beer-profile__data">
          <span className="beer-profile__data--heading">pH:</span>{" "}
          {chooseBeer.ph}
        </p>
        <p className="beer-profile__data">
          <span className="beer-profile__data--heading">ABV:</span>{" "}
          {chooseBeer.abv}
        </p>
      </div>
      <div>
        <p className="beer-profile__food">Recommended food pairings:</p>
        <ul className="food__list">
          <li className="food__list--option"> {chooseBeer.food_pairing[0]} </li>
          <li className="food__list--option"> {chooseBeer.food_pairing[1]} </li>
          <li className="food__list--option"> {chooseBeer.food_pairing[2]} </li>
        </ul>
      </div>
    </div>
  );
};

export default BeerInfo;
