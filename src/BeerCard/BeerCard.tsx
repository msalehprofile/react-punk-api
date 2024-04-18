import "./BeerCard.scss";

export type beerData = {
    name: string;
    image_url: string;
    description: string;
    ph: number;
    first_brewed: string;
    abv: number;
}

const Beercard = ({name, image_url, description, ph, first_brewed,abv}: beerData) => {
  return (
    <div className="beercard">
        <img className="beercard__image" src={image_url} alt="beer breed" />
        <h2 className="beercard__name">{name}</h2>
        <p className="beercard__desc">{description}</p>
        <div className="beercard__data">
            <div>
                <h6 className="beercard__data--title">First brewed in:</h6>
                <p className="beercard__data--vals">{first_brewed}</p>
            </div>
            <div>
                <h6 className="beercard__data--title">pH:</h6>
                <p className="beercard__data--vals">{ph}</p>
            </div>
            <div>
                <h6 className="beercard__data--title">ABV:</h6>
                <p className="beercard__data--vals">{abv}</p>
            </div>
        </div>
    </div>
  )
}

export default Beercard